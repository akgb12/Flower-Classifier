import Article from "./Article.jsx";
import Figure from "./Figure.jsx";

function fmt(n) {
  if (n === null || n === undefined) return "—";
  if (Math.abs(n) >= 100) return n.toFixed(0);
  if (Math.abs(n) >= 10) return n.toFixed(1);
  return n.toFixed(2);
}

export default function DatasetSummary({ summary }) {
  const features = summary?.feature_summary || {};
  const classes = summary?.class_counts || {};
  const total = summary?.n_samples || 0;
  const featureKeys = Object.keys(features);
  const classKeys = Object.keys(classes);

  return (
    <Article
      id="dataset"
      step="02"
      eyebrow="Dataset Summary"
      title="Three species, fifty samples each."
      lede="The classes are perfectly balanced, which keeps things simple. No imputation, no resampling, just clean numeric features."
    >
      <Figure caption="The four numeric inputs. Every value is a length in centimeters.">
        <div className="stat-strip">
          <div className="stat-cell">
            <div className="stat-label">Samples</div>
            <div className="stat-value">{total || 150}</div>
            <div className="stat-sub">Across three species</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">Features</div>
            <div className="stat-value">{featureKeys.length || 4}</div>
            <div className="stat-sub">All numeric, all centimeters</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">Classes</div>
            <div className="stat-value">{classKeys.length || 3}</div>
            <div className="stat-sub">{classKeys.join(", ") || "setosa, versicolor, virginica"}</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">Balance</div>
            <div className="stat-value">Even</div>
            <div className="stat-sub">
              {classKeys.length > 0
                ? classKeys.map((k) => classes[k]).join(" / ") + " per class"
                : "50 per class"}
            </div>
          </div>
        </div>
      </Figure>

      <p>
        Each of the four input features is a physical measurement on the
        flower. Sepal length, sepal width, petal length, and petal width.
        Setosa, versicolor, and virginica each have exactly 50 samples in the
        full dataset, which is a really pleasant starting point because it
        means I never have to think about class imbalance.
      </p>
      <p>
        Because the classes are already balanced, oversampling would just
        duplicate rows without adding any signal. So I skipped it and used a
        stratified train and test split instead, which preserves the 50 / 50 /
        50 ratio inside both halves.
      </p>

      <h3>Feature Ranges</h3>
      <p>
        Petal measurements vary much more than sepal measurements. That spread
        is what makes them so useful for separating species, and it shows up
        again later in the feature importance scores.
      </p>

      {featureKeys.length > 0 && (
        <Figure caption="Per feature distribution from the notebook export.">
          <div className="feature-stats">
            {featureKeys.map((key) => {
              const f = features[key];
              return (
                <div key={key} className="feature-card">
                  <h4>{key.replace(/_/g, " ")}</h4>
                  <dl>
                    <dt>min</dt>
                    <dd>{fmt(f.min)}</dd>
                    <dt>mean</dt>
                    <dd>{fmt(f.mean)}</dd>
                    <dt>max</dt>
                    <dd>{fmt(f.max)}</dd>
                    <dt>std</dt>
                    <dd>{fmt(f.std)}</dd>
                  </dl>
                </div>
              );
            })}
          </div>
        </Figure>
      )}
    </Article>
  );
}
