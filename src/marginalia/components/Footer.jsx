import { SITE } from "../config.jsx";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const { footer, owner } = SITE;
  return (
    <footer className="r-footer" aria-label="Colophon">
      <div className="r-footer__container">
        <div className="r-footer__col">
          <span className="r-footer__sig" aria-hidden="true">{owner.initials}</span>
          <p className="r-footer__line">
            {owner.name} — {owner.role}.
            <br />
            {footer.line}
          </p>
        </div>

        <div className="r-footer__col r-footer__col--meta">
          <p className="r-footer__line">
            Set in {footer.typeCredit}, Inter, and Geist Mono.{" "}
            {footer.techCredit}
          </p>
          <p className="r-footer__line r-footer__line--mute">
            © {year} {owner.name}. All rights reserved · except where noted.
          </p>
        </div>

        <div className="r-footer__col r-footer__col--links">
          {footer.links.map((l) => (
            <a key={l.label} href={l.href}>{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
