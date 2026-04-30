export default function Figure({ wide, caption, children }) {
  return (
    <figure className={`figure${wide ? " wide" : ""}`}>
      <div className="figure-frame">{children}</div>
      {caption && <figcaption className="figure-caption">{caption}</figcaption>}
    </figure>
  );
}
