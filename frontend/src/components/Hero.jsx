import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-eyebrow">A small ML study</div>
      <h1 className="hero-title">
        Iris <span className="accent">Insight</span>
      </h1>
      <p className="hero-lede">
        Four flower measurements come in, a trained model figures out the
        species. The pages below walk through how the data looks, which model
        won, and where it still trips up.
      </p>
      <div className="hero-cta">
        <p className="hero-cta-text">
          Want to skip ahead and test the model yourself?
        </p>
        <Link to="/predict" className="hero-predict-btn">
          Try a prediction
        </Link>
        <span className="scroll-hint">
          or read the study <span className="arrow">↓</span>
        </span>
      </div>
    </section>
  );
}
