import { CheckCircle, Calendar, Clock, Car, Mail, Phone, ArrowLeft } from "lucide-react";
import { vehicleSizeMultipliers } from "../data/services";

export default function ConfirmationPage({ booking, onReset }) {
  const multiplier = vehicleSizeMultipliers[booking.vehicleSize].multiplier;

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="conf-icon">
          <CheckCircle size={56} strokeWidth={1.5} />
        </div>
        <h1>You're All Set!</h1>
        <p className="conf-sub">
          Your booking has been confirmed. We'll send a reminder to <strong>{booking.email}</strong> before your appointment.
        </p>
        <div className="conf-number">
          Confirmation # <strong>{booking.confirmationNumber}</strong>
        </div>

        <div className="conf-details">
          <div className="conf-detail">
            <Calendar size={18} />
            <div>
              <label>Date & Time</label>
              <span>{booking.date} at {booking.time}</span>
            </div>
          </div>
          <div className="conf-detail">
            <Car size={18} />
            <div>
              <label>Vehicle</label>
              <span>{booking.year} {booking.make} {booking.model}</span>
            </div>
          </div>
          <div className="conf-detail">
            <Mail size={18} />
            <div>
              <label>Email</label>
              <span>{booking.email}</span>
            </div>
          </div>
          <div className="conf-detail">
            <Phone size={18} />
            <div>
              <label>Phone</label>
              <span>{booking.phone}</span>
            </div>
          </div>
        </div>

        <div className="conf-services">
          <h3>Services Booked</h3>
          {booking.services.map((s) => (
            <div key={s.id} className="conf-service-row">
              <span>{s.name}</span>
              <span>${Math.round(s.price * multiplier)}</span>
            </div>
          ))}
          <div className="conf-total">
            <span>Total</span>
            <strong>${booking.total}</strong>
          </div>
        </div>

        <div className="conf-note">
          <Clock size={15} />
          Please arrive 5 minutes early. We'll have everything ready for your vehicle.
        </div>

        <button className="btn-ghost" onClick={onReset}>
          <ArrowLeft size={16} /> Book Another Service
        </button>
      </div>
    </div>
  );
}
