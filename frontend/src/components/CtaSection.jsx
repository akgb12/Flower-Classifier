import { Link } from "react-router-dom";

export default function CtaSection() {
  return (
    <section className="cta-section">
      <div className="eyebrow">
        <span className="dash" />
        <span>Try it yourself</span>
      </div>
      <h2>
        Run a <span className="accent">prediction</span>.
      </h2>
      <p>
        Pop in four flower measurements and the SVM model will send back a
        species, a confidence score, and the full probability split across all
        three classes.
      </p>
      <Link to="/predict" className="cta">
        Open the predict page →
      </Link>
    </section>
  );
}
