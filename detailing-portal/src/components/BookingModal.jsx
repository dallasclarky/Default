import { useState } from "react";
import { X, ChevronLeft, Calendar, User, Car } from "lucide-react";
import { vehicleSizeMultipliers, timeSlots } from "../data/services";

function getNext14Days() {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) {
      days.push(d);
    }
  }
  return days;
}

const days = getNext14Days();

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function BookingModal({ cart, vehicleSize, onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "", make: "", model: "", year: "" });
  const [errors, setErrors] = useState({});

  const multiplier = vehicleSizeMultipliers[vehicleSize].multiplier;
  const total = cart.reduce((sum, s) => sum + Math.round(s.price * multiplier), 0);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.make.trim()) e.make = "Vehicle make is required";
    if (!form.model.trim()) e.model = "Vehicle model is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onComplete({
      ...form,
      services: cart,
      vehicleSize,
      date: selectedDay,
      time: selectedTime,
      total,
      confirmationNumber: `PS-${Date.now().toString(36).toUpperCase().slice(-6)}`,
    });
  };

  return (
    <>
      <div className="overlay overlay--dark" onClick={onClose} />
      <div className="modal">
        <div className="modal-header">
          <div className="modal-steps">
            {[1, 2, 3].map((n) => (
              <div key={n} className={`modal-step ${step >= n ? "active" : ""} ${step > n ? "done" : ""}`}>
                <span>{n}</span>
                <label>{n === 1 ? "Date & Time" : n === 2 ? "Your Details" : "Review"}</label>
              </div>
            ))}
          </div>
          <button className="icon-btn" onClick={onClose}><X size={22} /></button>
        </div>

        <div className="modal-body">
          {/* Step 1: Date & Time */}
          {step === 1 && (
            <div className="step-content">
              <h3><Calendar size={18} /> Select a Date</h3>
              <div className="date-grid">
                {days.map((d, i) => (
                  <button
                    key={i}
                    className={`date-btn ${selectedDay === d.toDateString() ? "active" : ""}`}
                    onClick={() => setSelectedDay(d.toDateString())}
                  >
                    <span className="date-day">{dayNames[d.getDay()]}</span>
                    <span className="date-num">{d.getDate()}</span>
                    <span className="date-month">{monthNames[d.getMonth()]}</span>
                  </button>
                ))}
              </div>
              {selectedDay && (
                <>
                  <h3 style={{ marginTop: "1.5rem" }}>Select a Time</h3>
                  <div className="time-grid">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        className={`time-btn ${selectedTime === t ? "active" : ""}`}
                        onClick={() => setSelectedTime(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </>
              )}
              <div className="modal-footer">
                <span />
                <button
                  className="btn-primary"
                  disabled={!selectedDay || !selectedTime}
                  onClick={() => setStep(2)}
                >
                  Next: Your Details
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="step-content">
              <h3><User size={18} /> Contact Information</h3>
              <div className="form-grid">
                <div className="form-field">
                  <label>Full Name *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Smith" className={errors.name ? "error" : ""} />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className="form-field">
                  <label>Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com" className={errors.email ? "error" : ""} />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
                <div className="form-field">
                  <label>Phone *</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(555) 000-0000" className={errors.phone ? "error" : ""} />
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>
              </div>
              <h3 style={{ marginTop: "1.5rem" }}><Car size={18} /> Vehicle Information</h3>
              <div className="form-grid form-grid--3">
                <div className="form-field">
                  <label>Year</label>
                  <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}
                    placeholder="2022" />
                </div>
                <div className="form-field">
                  <label>Make *</label>
                  <input value={form.make} onChange={(e) => setForm({ ...form, make: e.target.value })}
                    placeholder="Toyota" className={errors.make ? "error" : ""} />
                  {errors.make && <span className="field-error">{errors.make}</span>}
                </div>
                <div className="form-field">
                  <label>Model *</label>
                  <input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })}
                    placeholder="Camry" className={errors.model ? "error" : ""} />
                  {errors.model && <span className="field-error">{errors.model}</span>}
                </div>
              </div>
              <div className="form-field" style={{ marginTop: "1rem" }}>
                <label>Special Requests / Notes</label>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Anything we should know? Pet hair, heavy stains, etc." rows={3} />
              </div>
              <div className="modal-footer">
                <button className="btn-ghost" onClick={() => setStep(1)}><ChevronLeft size={16} /> Back</button>
                <button className="btn-primary" onClick={() => { const e = validate(); if (Object.keys(e).length) { setErrors(e); } else { setStep(3); } }}>
                  Review Booking
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="step-content">
              <h3>Review Your Booking</h3>
              <div className="review-section">
                <div className="review-row"><span>Date</span><strong>{selectedDay}</strong></div>
                <div className="review-row"><span>Time</span><strong>{selectedTime}</strong></div>
                <div className="review-row"><span>Vehicle</span>
                  <strong>{form.year} {form.make} {form.model} ({vehicleSizeMultipliers[vehicleSize].label})</strong>
                </div>
                <div className="review-row"><span>Name</span><strong>{form.name}</strong></div>
                <div className="review-row"><span>Email</span><strong>{form.email}</strong></div>
                <div className="review-row"><span>Phone</span><strong>{form.phone}</strong></div>
              </div>
              <div className="review-services">
                <h4>Services</h4>
                {cart.map((s) => (
                  <div key={s.id} className="review-service-row">
                    <span>{s.name}</span>
                    <span>${Math.round(s.price * multiplier)}</span>
                  </div>
                ))}
                <div className="review-total">
                  <span>Total</span>
                  <strong>${total}</strong>
                </div>
              </div>
              {form.notes && (
                <div className="review-notes">
                  <strong>Notes:</strong> {form.notes}
                </div>
              )}
              <div className="modal-footer">
                <button className="btn-ghost" onClick={() => setStep(2)}><ChevronLeft size={16} /> Back</button>
                <button className="btn-primary btn-confirm" onClick={handleSubmit}>
                  Confirm Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
