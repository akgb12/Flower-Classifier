import Article from "./Article.jsx";

export default function ProjectOverview() {
  return (
    <Article
      id="overview"
      step="01"
      eyebrow="Project Overview"
      title="A small Iris study built end to end."
      lede="Train a few classifiers on the Iris dataset, pick the best one, and put the result behind a clean API so anyone can poke at it."
    >
      <p>
        This project is a lightweight machine learning workflow for classifying
        Iris flowers from sepal and petal measurements. Because the dataset is
        small, clean, and tabular, I used classical scikit learn models instead
        of deep learning. The focus was on building a reproducible pipeline,
        comparing multiple reasonable classifiers, exporting dashboard ready
        results, and serving the final model through a full stack application.
      </p>
      <p>
        The whole thing is split into three layers. A notebook does the
        exploration and training. The notebook then exports a saved model
        artifact and a handful of JSON files. A FastAPI backend loads those
        artifacts and exposes them through clean endpoints. This React frontend
        sits on top, presenting the results as a study and offering a live
        prediction page.
      </p>
      <p>
        Nothing is recomputed at runtime. The artifacts are the source of
        truth. That keeps the API fast, keeps the UI focused on display, and
        keeps the analysis honest because anyone can rerun the notebook and
        regenerate every number you see on this page.
      </p>
    </Article>
  );
}
