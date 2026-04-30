export default function Article({ id, eyebrow, step, title, lede, children }) {
  return (
    <article className="article" id={id}>
      <div className="eyebrow">
        {step && <span className="step">{step}</span>}
        <span className="dash" />
        <span>{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {lede && <p className="lede">{lede}</p>}
      {children}
    </article>
  );
}
