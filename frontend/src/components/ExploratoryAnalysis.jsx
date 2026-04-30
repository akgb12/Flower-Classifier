import { useMemo } from "react";
import Article from "./Article.jsx";
import Figure from "./Figure.jsx";

const COLORS = {
  setosa: "#16a34a",
  versicolor: "#2563eb",
  virginica: "#9333ea",
};

export default function ExploratoryAnalysis({ pcaPoints }) {
  const data = Array.isArray(pcaPoints) ? pcaPoints : [];

  const { width, height, plot } = useMemo(() => {
    const W = 720;
    const H = 380;
    const padding = 36;
    if (data.length === 0) {
      return { width: W, height: H, plot: [] };
    }
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const p of data) {
      if (p.pc1 < minX) minX = p.pc1;
      if (p.pc1 > maxX) maxX = p.pc1;
      if (p.pc2 < minY) minY = p.pc2;
      if (p.pc2 > maxY) maxY = p.pc2;
    }
    const sx = (x) =>
      padding + ((x - minX) / (maxX - minX || 1)) * (W - padding * 2);
    const sy = (y) =>
      H - padding - ((y - minY) / (maxY - minY || 1)) * (H - padding * 2);
    const placed = [];
    for (let i = 0; i < data.length; i++) {
      const p = data[i];
      placed.push({ cx: sx(p.pc1), cy: sy(p.pc2), species: p.species });
    }
    return { width: W, height: H, plot: placed };
  }, [data]);

  const speciesList = Object.keys(COLORS);

  return (
    <Article
      id="eda"
      step="03"
      eyebrow="Exploratory Analysis"
      title="Petals carry most of the signal."
      lede="Before training anything, a quick look at how the four measurements relate to the species and to each other."
    >
      <p>
        The first thing worth doing on any dataset is just looking at it.
        For Iris, the most useful exploratory chart is a scatter of petal
        length against petal width colored by species. Setosa lands cleanly in
        its own corner. Versicolor and virginica brush up against each other
        with a small overlap. Sepal measurements show much less separation
        across species, so they end up being a weaker signal.
      </p>

      <p>
        A correlation matrix on the four features tells the same story. Petal
        length and petal width are strongly tied to each other and to the
        target. Sepal width sits off on its own and barely moves with the
        species label.
      </p>

      <blockquote>
        The model is not just memorizing labels. The data itself has real
        structure, especially in the petal measurements. The harder boundary
        is between versicolor and virginica because their petal measurements
        live closer together.
      </blockquote>

      <h3>PCA Projection</h3>
      <p>
        PCA squashes the four feature space down to two principal components
        while preserving as much spread as possible. It is a visualization
        tool only. It was not used to train the final model. If the classes
        form clean blobs in this view, the dataset is easy to separate. Iris
        is one of those friendly datasets.
      </p>

      <Figure
        wide
        caption="Two component PCA. Setosa pulls away. Versicolor and virginica share a soft border."
      >
        <svg
          className="pca-svg"
          viewBox={`0 0 ${width} ${height}`}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="PCA projection scatter plot of all 150 Iris samples"
        >
          <line
            x1="36"
            y1={height - 36}
            x2={width - 36}
            y2={height - 36}
            stroke="rgba(24,24,27,0.18)"
            strokeWidth="1"
          />
          <line
            x1="36"
            y1="36"
            x2="36"
            y2={height - 36}
            stroke="rgba(24,24,27,0.18)"
            strokeWidth="1"
          />
          {plot.map((p, i) => (
            <circle
              key={i}
              cx={p.cx}
              cy={p.cy}
              r="4.5"
              fill={COLORS[p.species] || "#888"}
              fillOpacity="0.72"
              stroke="#fff"
              strokeWidth="0.8"
            />
          ))}
          <text x={width - 40} y={height - 14} fontSize="11" fill="#6b7280" textAnchor="end">
            PC1
          </text>
          <text x="14" y="22" fontSize="11" fill="#6b7280">
            PC2
          </text>
        </svg>
        <div className="pca-legend">
          {speciesList.map((s) => (
            <div className="pca-legend-item" key={s}>
              <span className="pca-dot" style={{ background: COLORS[s] }}></span>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </Figure>

      <p>
        This projection lines up exactly with what you will see later in the
        confusion matrix. The model never gets setosa wrong because there is
        nothing to confuse it with. The only error in the entire test set sits
        on that fuzzy border between versicolor and virginica.
      </p>
    </Article>
  );
}
