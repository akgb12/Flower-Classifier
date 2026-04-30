import Article from "./Article.jsx";
import Figure from "./Figure.jsx";

export default function FeatureImportance({ items }) {
  const safe = Array.isArray(items) ? items : [];
  const sorted = safe.slice().sort((a, b) => b.importance - a.importance);
  const top = sorted.length > 0 ? sorted[0].importance : 1;

  return (
    <Article
      id="importance"
      step="07"
      eyebrow="Feature Importance"
      title="Petal measurements do most of the work."
      lede="The final predictive model is SVM, but Random Forest was also trained to estimate which features carry the signal. It is an interpretability tool, not the prediction model."
    >
      <p>
        SVM does not give a clean per feature importance score the way a tree
        ensemble does. So a separate Random Forest was fit purely to rank the
        features. This is the kind of pairing you see often in practice. One
        model for prediction, another model for explainability.
      </p>

      <Figure caption="Random Forest feature importance scores from the notebook.">
        <ul className="bar-list">
          {sorted.map((row) => {
            const widthPct = (row.importance / top) * 100;
            return (
              <li key={row.feature}>
                <div className="bar-row">
                  <div className="label" style={{ textTransform: "capitalize" }}>
                    {row.feature.replace(/_/g, " ")}
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${widthPct}%` }} />
                  </div>
                  <div className="bar-value">
                    {(row.importance * 100).toFixed(1)}%
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Figure>

      <p>
        Petal length and petal width together carry roughly 87 percent of the
        importance. Sepal length adds a small amount. Sepal width is almost
        noise. That ranking matches what the exploratory plots and the PCA
        view suggested. The petals are the part of the flower that actually
        separates these species.
      </p>
    </Article>
  );
}
