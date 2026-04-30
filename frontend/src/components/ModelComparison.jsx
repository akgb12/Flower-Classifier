import Article from "./Article.jsx";
import Figure from "./Figure.jsx";

export default function ModelComparison({ models, bestName }) {
  const safe = Array.isArray(models) ? models : [];
  const sorted = safe.slice().sort((a, b) => b.accuracy - a.accuracy);
  const top = sorted.length > 0 ? sorted[0].accuracy : 1;

  return (
    <Article
      id="comparison"
      step="04"
      eyebrow="Model Comparison"
      title="Four classifiers walk into a 5 fold."
      lede="The training split was scored with stratified 5 fold cross validation. The winner gets exported as the production model."
    >
      <p>
        I trained four classical scikit learn classifiers and compared them on
        the same folds. Logistic Regression as a simple linear baseline. KNN as
        a distance based method that often does well on small numeric datasets.
        SVM because it is strong on small structured data with clear margins.
        Random Forest for its tree based behavior and the bonus that it gives
        feature importance for free.
      </p>
      <p>
        Cross validation matters here because the dataset is tiny. A single
        train and test split can be noisy on 150 rows, and a model that wins
        once on a lucky split is not really a winner. Five fold cross
        validation gives a more honest mean accuracy.
      </p>
      <p>
        Where it helps, models were wrapped in a scikit learn pipeline with a
        StandardScaler step. Logistic Regression, KNN, and SVM all care about
        feature scale because they reason about distances or weights in raw
        feature space. Random Forest skips scaling because trees split on
        thresholds and do not care about magnitude.
      </p>

      <Figure caption="Mean cross validation accuracy across five folds.">
        <ul className="bar-list">
          {sorted.map((row) => {
            const isBest = row.model === bestName;
            const widthPct = (row.accuracy / top) * 100;
            return (
              <li key={row.model}>
                <div className="bar-row">
                  <div className="label">
                    <span>{row.model}</span>
                    {isBest && <span className="pill">Selected</span>}
                  </div>
                  <div className="bar-track">
                    <div
                      className={`bar-fill${isBest ? "" : " muted"}`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                  <div className="bar-value">{(row.accuracy * 100).toFixed(2)}%</div>
                </div>
              </li>
            );
          })}
        </ul>
      </Figure>

      <p>
        SVM came out on top with 96.67 percent mean accuracy. Logistic
        Regression and KNN were close behind around 95.83 percent. Random
        Forest landed at 95.00 percent. The gap between models is small, which
        is what you should expect on a clean benchmark dataset like Iris. The
        goal was not to make the dataset look harder than it is. The goal was
        to show a clean process for comparing reasonable models and picking
        one with a clear metric.
      </p>
    </Article>
  );
}
