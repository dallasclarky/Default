import { ChevronDown, Star } from "lucide-react";

export default function Hero({ onExplore }) {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-badge">
          <Star size={14} fill="currentColor" />
          <span>Rated #1 in the area — 500+ happy customers</span>
        </div>
        <h1 className="hero-title">
          Your Car Deserves<br />
          <span className="hero-accent">the Best</span>
        </h1>
        <p className="hero-sub">
          Professional detailing services, transparent pricing, easy online booking.
          Choose your services and book in minutes.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onExplore}>
            Book Now
          </button>
          <a href="tel:+15551234567" className="btn-ghost">
            Call to Schedule
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat"><strong>500+</strong><span>Cars Detailed</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>4.9★</strong><span>Average Rating</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>5yr</strong><span>In Business</span></div>
        </div>
      </div>
      <button className="hero-scroll" onClick={onExplore} aria-label="Scroll to services">
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
