import { useState } from "react";
import Article from "./Article.jsx";
import Figure from "./Figure.jsx";

export default function SamplePredictions({ items }) {
  const all = Array.isArray(items) ? items : [];
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? all : all.slice(0, 6);

  return (
    <Article
      id="samples"
      step="08"
      eyebrow="Sample Predictions"
      title="Held out flowers, model verdicts."
      lede="A handful of predictions on test rows the model never saw during training. Cards in red are the rare cases where it got the species wrong."
    >
      <p>
        Showing concrete predictions is more honest than just reporting
        accuracy. You can see the actual measurements that went in, the model
        verdict, and where the lone error sits.
      </p>

      <Figure caption="Sampled predictions from the held out test set.">
        <div className="sample-list">
          {visible.map((row, i) => {
            const wrong = row.predicted !== row.actual;
            const inp = row.input || {};
            return (
              <div className={`sample-card${wrong ? " miss" : ""}`} key={i}>
                <div className="sample-row" style={{ marginBottom: 10 }}>
                  <span className={`sample-tag${wrong ? " miss" : ""}`}>
                    {row.predicted}
                  </span>
                  <span className="sample-label">actual {row.actual}</span>
                </div>
                <div className="sample-row">
                  <span className="sample-label">sepal</span>
                  <span className="sample-value">
                    {inp.sepal_length} × {inp.sepal_width}
                  </span>
                </div>
                <div className="sample-row">
                  <span className="sample-label">petal</span>
                  <span className="sample-value">
                    {inp.petal_length} × {inp.petal_width}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {all.length > 6 && (
          <button
            type="button"
            className="show-all-btn"
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? "Show fewer" : `Show all ${all.length}`}
          </button>
        )}
      </Figure>

      <p>
        These cards also hint at why the prediction page is interesting. The
        model returns a full probability across all three classes, so even
        when it lands on a confident answer you can see where the doubt lives.
      </p>
    </Article>
  );
}
