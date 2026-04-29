import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { vehicleSizeMultipliers } from "../data/services";

export default function BookingCart({ cart, vehicleSize, onRemove, onClose, onCheckout }) {
  const multiplier = vehicleSizeMultipliers[vehicleSize].multiplier;
  const total = cart.reduce((sum, s) => sum + Math.round(s.price * multiplier), 0);
  const totalDuration = cart.reduce((sum, s) => sum + s.duration, 0);
  const hours = Math.floor(totalDuration / 60);
  const mins = totalDuration % 60;

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <aside className="cart-panel">
        <div className="cart-header">
          <h2><ShoppingBag size={20} /> Your Booking</h2>
          <button className="icon-btn" onClick={onClose}><X size={22} /></button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={48} strokeWidth={1} />
            <p>No services selected yet.</p>
            <button className="btn-primary" onClick={onClose}>Browse Services</button>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {cart.map((service) => {
                const price = Math.round(service.price * multiplier);
                return (
                  <li key={service.id} className="cart-item">
                    <div className="cart-item-info">
                      <span className="cart-item-name">{service.name}</span>
                      <span className="cart-item-price">${price}</span>
                    </div>
                    <button className="icon-btn icon-btn--danger" onClick={() => onRemove(service.id)}>
                      <Trash2 size={15} />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Est. Time</span>
                <span>{hours > 0 ? `${hours}h ` : ""}{mins > 0 ? `${mins}m` : ""}</span>
              </div>
              <div className="cart-summary-row cart-total">
                <span>Total</span>
                <span>${total}</span>
              </div>
              <p className="cart-note">
                Vehicle: {vehicleSizeMultipliers[vehicleSize].label}
              </p>
            </div>

            <button className="btn-primary btn-checkout" onClick={onCheckout}>
              Book Appointment <ArrowRight size={18} />
            </button>
          </>
        )}
      </aside>
    </>
  );
}
