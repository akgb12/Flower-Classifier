import { Link, NavLink } from "react-router-dom";

export default function TopBar() {
  return (
    <header className="top-bar">
      <Link to="/" className="brand">
        Iris <span className="brand-accent">Insight</span>
      </Link>
      <nav className="top-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
        >
          Study
        </NavLink>
        <NavLink
          to="/predict"
          className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
        >
          Predict
        </NavLink>
      </nav>
    </header>
  );
}
