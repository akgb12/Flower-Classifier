import Article from "./Article.jsx";

export default function DesignNotes() {
  return (
    <Article
      id="notes"
      step="09"
      eyebrow="Design Decisions"
      title="A few choices worth calling out."
      lede="Quick notes on the why behind the workflow, so the rest of the dashboard makes sense at a glance."
    >
      <h3>Why no deep learning</h3>
      <p>
        Deep learning was avoided on purpose. The dataset is small and tabular
        and a neural network would add complexity without improving the
        learning goal. Classical models train fast, are easier to compare, and
        are far more explainable on data this size.
      </p>

      <h3>Why no oversampling</h3>
      <p>
        The dataset already has 50 samples per species. Oversampling would
        duplicate rows without adding new signal and would make the workflow
        look less careful. Stratified splitting was used instead so both
        halves keep the original class balance.
      </p>

      <h3>Why cross validation</h3>
      <p>
        On 150 rows a single train and test split can be noisy. 5 fold
        stratified cross validation gives a more stable comparison by
        averaging accuracy across multiple folds, which keeps a lucky split
        from picking a fake winner.
      </p>

      <h3>Why SVM is the final model</h3>
      <p>
        SVM scored highest on mean cross validation accuracy among the four
        models. It is also a strong fit for small structured datasets where
        classes have clean margins, which fits the Iris feature space well.
        Inside the saved pipeline it is paired with StandardScaler so distances
        in feature space are not skewed by the larger sepal values.
      </p>

      <h3>Why Random Forest still shows up</h3>
      <p>
        Random Forest was not selected as the predictive model. It was trained
        purely to provide feature importance scores, since SVM does not give a
        clean per feature ranking. Having a separate interpretability model is
        a normal pattern. One model predicts. Another model explains.
      </p>

      <h3>Why JSON artifacts</h3>
      <p>
        Every chart and table on this page comes from a JSON file written by
        the notebook. The backend just hands those files to the frontend
        unchanged, and the saved joblib pipeline handles the live predictions.
        The React app does no math of its own. That separation keeps each
        layer focused and makes the analysis fully reproducible from the
        notebook out.
      </p>
    </Article>
  );
}
