import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ServiceCatalog from "./components/ServiceCatalog";
import BookingCart from "./components/BookingCart";
import BookingModal from "./components/BookingModal";
import ConfirmationPage from "./components/ConfirmationPage";
import "./App.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [vehicleSize, setVehicleSize] = useState("sedan");

  const addToCart = (service) => {
    setCart((prev) => {
      if (prev.find((s) => s.id === service.id)) return prev;
      return [...prev, service];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((s) => s.id !== id));

  const handleBookingComplete = (bookingData) => {
    setConfirmation(bookingData);
    setCart([]);
    setBookingOpen(false);
    setCartOpen(false);
  };

  if (confirmation) {
    return <ConfirmationPage booking={confirmation} onReset={() => setConfirmation(null)} />;
  }

  return (
    <div className="app">
      <Header cartCount={cart.length} onCartClick={() => setCartOpen(true)} />
      <Hero onExplore={() => document.getElementById("services").scrollIntoView({ behavior: "smooth" })} />
      <ServiceCatalog
        cart={cart}
        vehicleSize={vehicleSize}
        onVehicleSizeChange={setVehicleSize}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
      />
      {cartOpen && (
        <BookingCart
          cart={cart}
          vehicleSize={vehicleSize}
          onRemove={removeFromCart}
          onClose={() => setCartOpen(false)}
          onCheckout={() => { setCartOpen(false); setBookingOpen(true); }}
        />
      )}
      {bookingOpen && (
        <BookingModal
          cart={cart}
          vehicleSize={vehicleSize}
          onClose={() => setBookingOpen(false)}
          onComplete={handleBookingComplete}
        />
      )}
    </div>
  );
}
