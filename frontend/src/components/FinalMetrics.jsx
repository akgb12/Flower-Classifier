import Article from "./Article.jsx";
import Figure from "./Figure.jsx";

function pct(n) {
  if (n === null || n === undefined) return "—";
  return `${(n * 100).toFixed(2)}%`;
}

export default function FinalMetrics({ metrics, report }) {
  const m = metrics || {};
  const r = report || {};
  const classRows = Object.keys(r).filter(
    (k) => k !== "accuracy" && k !== "macro avg" && k !== "weighted avg"
  );

  return (
    <Article
      id="metrics"
      step="05"
      eyebrow="Final Model Performance"
      title="Held out test set, one shot."
      lede="After cross validation picked the SVM, it was retrained on the full training split and evaluated once on the 30 row test set."
    >
      <Figure caption="Macro averaged metrics on the held out test set.">
        <div className="stat-strip">
          <div className="stat-cell">
            <div className="stat-label">Accuracy</div>
            <div className="stat-value">{pct(m.accuracy)}</div>
            <div className="stat-sub">Overall correctness</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">Precision</div>
            <div className="stat-value">{pct(m.precision_macro)}</div>
            <div className="stat-sub">Macro averaged</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">Recall</div>
            <div className="stat-value">{pct(m.recall_macro)}</div>
            <div className="stat-sub">Macro averaged</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">F1 Score</div>
            <div className="stat-value">{pct(m.f1_macro)}</div>
            <div className="stat-sub">Macro averaged</div>
          </div>
        </div>
      </Figure>

      <p>
        29 out of 30 test examples were classified correctly. The macro
        averaged metrics treat each class equally rather than weighting by
        sample count, which is a fair default for a multiclass problem. Since
        the dataset is balanced, macro and weighted averages land in the same
        place, but using macro makes the intent clear.
      </p>

      <h3>Per Class Breakdown</h3>
      <p>
        Looking at the per class numbers tells you more than the headline
        accuracy. It shows which species the model handles cleanly and which
        one carries the lone error.
      </p>

      {classRows.length > 0 && (
        <Figure caption="Class level results from classification_report.json.">
          <table className="report-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>F1</th>
                <th>Support</th>
              </tr>
            </thead>
            <tbody>
              {classRows.map((cls) => (
                <tr key={cls}>
                  <td className="label">{cls}</td>
                  <td>{pct(r[cls].precision)}</td>
                  <td>{pct(r[cls].recall)}</td>
                  <td>{pct(r[cls]["f1-score"])}</td>
                  <td>{r[cls].support}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Figure>
      )}
    </Article>
  );
}
