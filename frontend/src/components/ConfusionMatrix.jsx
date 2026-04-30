import Article from "./Article.jsx";
import Figure from "./Figure.jsx";

export default function ConfusionMatrix({ data }) {
  const labels = data?.labels || [];
  const matrix = data?.matrix || [];

  return (
    <Article
      id="confusion"
      step="06"
      eyebrow="Confusion Matrix"
      title="Where the model gets it right, and where it slips."
      lede="The diagonal is correct. Anything off the diagonal is a miss. Reading rows tells you the true class. Reading columns tells you what the model said."
    >
      <Figure caption="Confusion matrix on the 30 row test set.">
        <table className="cm-table">
          <thead>
            <tr>
              <th className="cm-corner"></th>
              <th colSpan={labels.length}>Predicted</th>
            </tr>
            <tr>
              <th></th>
              {labels.map((l) => (
                <th key={l}>{l}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                <th>{labels[i]}</th>
                {row.map((val, j) => {
                  const isDiag = i === j;
                  const isMiss = !isDiag && val > 0;
                  return (
                    <td
                      key={j}
                      className={`cm-cell${isDiag ? " diag" : ""}${isMiss ? " miss" : ""}`}
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Figure>

      <p>
        Setosa is classified perfectly, all 10 of 10. That tracks with the
        exploratory plots, where setosa was clearly its own cluster. Virginica
        also lands every one of its true examples, giving it a recall of 1.00.
      </p>
      <p>
        The single error is one versicolor flower predicted as virginica.
        That dings versicolor recall down to 0.90 and virginica precision down
        to about 0.91 because that misprediction shows up as a false positive
        on the virginica side. This is the same boundary you can see by eye in
        the PCA scatter, which is a nice check that the model is learning the
        actual structure of the data and not some accidental signal.
      </p>
    </Article>
  );
}
