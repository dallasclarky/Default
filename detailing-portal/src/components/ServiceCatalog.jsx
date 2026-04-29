import { useState } from "react";
import { Car, Sofa, Sparkles, Shield, Wrench, CheckCircle, PlusCircle, Clock } from "lucide-react";
import { services, serviceCategories, vehicleSizeMultipliers } from "../data/services";

const categoryIcons = { car: Car, sofa: Sofa, sparkles: Sparkles, shield: Shield, wrench: Wrench };

function formatDuration(mins) {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export default function ServiceCatalog({ cart, vehicleSize, onVehicleSizeChange, onAddToCart, onRemoveFromCart }) {
  const [activeCategory, setActiveCategory] = useState("exterior");
  const multiplier = vehicleSizeMultipliers[vehicleSize].multiplier;

  const filtered = services.filter((s) => s.category === activeCategory);

  const inCart = (id) => cart.some((s) => s.id === id);

  return (
    <section id="services" className="catalog">
      <div className="catalog-inner">
        <div className="catalog-header">
          <h2 className="catalog-title">Our Services</h2>
          <p className="catalog-sub">Transparent, market-rate pricing. No hidden fees.</p>
        </div>

        {/* Vehicle size selector */}
        <div className="vehicle-selector">
          <span className="vehicle-label">Vehicle Size:</span>
          <div className="vehicle-options">
            {Object.entries(vehicleSizeMultipliers).map(([key, { label }]) => (
              <button
                key={key}
                className={`vehicle-btn ${vehicleSize === key ? "active" : ""}`}
                onClick={() => onVehicleSizeChange(key)}
              >
                {label}
              </button>
            ))}
          </div>
          {vehicleSize !== "sedan" && (
            <span className="vehicle-note">
              +{Math.round((vehicleSizeMultipliers[vehicleSize].multiplier - 1) * 100)}% size adjustment applied
            </span>
          )}
        </div>

        {/* Category tabs */}
        <div className="category-tabs">
          {serviceCategories.map((cat) => {
            const Icon = categoryIcons[cat.icon];
            return (
              <button
                key={cat.id}
                className={`cat-tab ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <Icon size={16} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Service cards */}
        <div className="service-grid">
          {filtered.map((service) => {
            const price = Math.round(service.price * multiplier);
            const added = inCart(service.id);
            return (
              <div key={service.id} className={`service-card ${added ? "service-card--added" : ""}`}>
                {service.badge && <div className="service-badge">{service.badge}</div>}
                {service.popular && !service.badge && <div className="service-badge service-badge--popular">Popular</div>}
                <div className="service-card-body">
                  <h3 className="service-name">{service.name}</h3>
                  <p className="service-desc">{service.description}</p>
                  <div className="service-meta">
                    <span className="service-duration">
                      <Clock size={13} />
                      {formatDuration(service.duration)}
                    </span>
                  </div>
                </div>
                <div className="service-card-footer">
                  <span className="service-price">${price}</span>
                  <button
                    className={`add-btn ${added ? "add-btn--added" : ""}`}
                    onClick={() => added ? onRemoveFromCart(service.id) : onAddToCart(service)}
                  >
                    {added ? (
                      <><CheckCircle size={16} /> Added</>
                    ) : (
                      <><PlusCircle size={16} /> Add</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
