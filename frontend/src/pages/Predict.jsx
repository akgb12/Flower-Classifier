import { useState } from "react";
import { postPredict } from "../api.js";

const DEFAULTS = {
  sepal_length: "",
  sepal_width: "",
  petal_length: "",
  petal_width: "",
};

const SAMPLE = {
  sepal_length: "6.7",
  sepal_width: "3.1",
  petal_length: "5.6",
  petal_width: "2.4",
};

const FIELD_META = [
  { key: "sepal_length", label: "Sepal Length", placeholder: "5.1" },
  { key: "sepal_width", label: "Sepal Width", placeholder: "3.5" },
  { key: "petal_length", label: "Petal Length", placeholder: "1.4" },
  { key: "petal_width", label: "Petal Width", placeholder: "0.2" },
];

export default function Predict() {
  const [form, setForm] = useState(DEFAULTS);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setResult(null);
    const payload = {};
    for (const f of FIELD_META) {
      const num = parseFloat(form[f.key]);
      if (Number.isNaN(num)) {
        setError("Please enter a number for every measurement.");
        return;
      }
      payload[f.key] = num;
    }
    setSubmitting(true);
    try {
      const res = await postPredict(payload);
      setResult(res);
    } catch (err) {
      setError(err.message || "Prediction failed");
    } finally {
      setSubmitting(false);
    }
  }

  function loadSample() {
    setForm(SAMPLE);
    setError(null);
  }

  function clearAll() {
    setForm(DEFAULTS);
    setResult(null);
    setError(null);
  }

  return (
    <div className="predict-page">
      <header className="predict-header">
        <div className="hero-eyebrow">Try The Model</div>
        <h1>
          Predict an <span className="accent">Iris</span>.
        </h1>
        <p>
          Drop in four flower measurements in centimeters. The saved SVM
          pipeline will return a species, a confidence score, and the full
          probability split across all three classes.
        </p>
      </header>

      <div className="predict-grid">
        <form className="predict-form" onSubmit={onSubmit}>
          <div className="row">
            {FIELD_META.slice(0, 2).map((f) => (
              <div className="field" key={f.key}>
                <label htmlFor={f.key}>
                  {f.label}
                  <span className="unit">cm</span>
                </label>
                <input
                  id={f.key}
                  name={f.key}
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="10"
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="row">
            {FIELD_META.slice(2).map((f) => (
              <div className="field" key={f.key}>
                <label htmlFor={f.key}>
                  {f.label}
                  <span className="unit">cm</span>
                </label>
                <input
                  id={f.key}
                  name={f.key}
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="10"
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                />
              </div>
            ))}
          </div>

          {error && <div className="predict-error">{error}</div>}

          <div className="predict-actions">
            <button type="submit" className="submit" disabled={submitting}>
              {submitting ? "Predicting…" : "Predict species"}
            </button>
            <button type="button" className="ghost" onClick={loadSample}>
              Load sample
            </button>
            <button type="button" className="ghost" onClick={clearAll}>
              Clear
            </button>
          </div>
        </form>

        <div className="result-col">
          {!result && !submitting && (
            <div className="result-empty">
              Submit measurements on the left and the prediction will appear here.
            </div>
          )}

          {submitting && !result && (
            <div className="result-empty">Asking the model…</div>
          )}

          {result && <ResultCard result={result} />}
        </div>
      </div>
    </div>
  );
}

function ResultCard({ result }) {
  const probs = result.probabilities || {};
  const probKeys = Object.keys(probs);
  const confidencePct = ((result.confidence || 0) * 100).toFixed(2);
  const inp = result.input || {};

  return (
    <div className="result-card">
      <div className="result-card-img-col">
        <img
          key={result.prediction}
          src={`/placeholders/${result.prediction}.png`}
          alt={`Iris ${result.prediction}`}
          className="result-species-img"
        />
      </div>

      <div className="result-card-data-col">
        <div className="result-headline">
          <div className="label-eyebrow">Predicted Species</div>
          <div className="result-species">{result.prediction}</div>
        </div>

        <div className="result-confidence">
          Confidence <strong>{confidencePct}%</strong>
        </div>

        <div className="prob-list">
          {probKeys.map((k) => {
            const v = probs[k] || 0;
            const widthPct = (v * 100).toFixed(1);
            return (
              <div className="prob-row" key={k}>
                <span className="name">{k}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${widthPct}%` }} />
                </div>
                <span className="value">{widthPct}%</span>
              </div>
            );
          })}
        </div>

        <div className="echo-block">
          <span><strong>Sepal length</strong> {inp.sepal_length} cm</span>
          <span><strong>Sepal width</strong> {inp.sepal_width} cm</span>
          <span><strong>Petal length</strong> {inp.petal_length} cm</span>
          <span><strong>Petal width</strong> {inp.petal_width} cm</span>
        </div>
      </div>
    </div>
  );
}
