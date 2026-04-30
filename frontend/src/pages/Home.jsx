import Hero from "../components/Hero.jsx";
import Divider from "../components/Divider.jsx";
import ProjectOverview from "../components/ProjectOverview.jsx";
import DatasetSummary from "../components/DatasetSummary.jsx";
import ExploratoryAnalysis from "../components/ExploratoryAnalysis.jsx";
import ModelComparison from "../components/ModelComparison.jsx";
import FinalMetrics from "../components/FinalMetrics.jsx";
import ConfusionMatrix from "../components/ConfusionMatrix.jsx";
import FeatureImportance from "../components/FeatureImportance.jsx";
import SamplePredictions from "../components/SamplePredictions.jsx";
import DesignNotes from "../components/DesignNotes.jsx";
import useArtifacts from "../useArtifacts.js";

export default function Home() {
  const { data, error, loading } = useArtifacts();

  return (
    <>
      <Hero />

      <ProjectOverview />
      <Divider />

      {loading && (
        <div className="page-status">Loading research artifacts from the API…</div>
      )}

      {error && (
        <div className="page-status error">
          Could not reach the backend. Make sure FastAPI is running on{" "}
          <code>http://127.0.0.1:8000</code>. {error}
        </div>
      )}

      {data && (
        <>
          <DatasetSummary summary={data.datasetSummary} />
          <Divider />

          <ExploratoryAnalysis pcaPoints={data.pcaProjection} />
          <Divider />

          <ModelComparison
            models={data.modelComparison}
            bestName={data.metrics?.best_model}
          />
          <Divider />

          <FinalMetrics
            metrics={data.metrics}
            report={data.classificationReport}
          />
          <Divider />

          <ConfusionMatrix data={data.confusionMatrix} />
          <Divider />

          <FeatureImportance items={data.featureImportance} />
          <Divider />

          <SamplePredictions items={data.samplePredictions} />
          <Divider />
        </>
      )}

      <DesignNotes />
    </>
  );
}
