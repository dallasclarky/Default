import { ShoppingCart, Sparkles, Phone } from "lucide-react";

export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <Sparkles size={22} />
          <span className="logo-name">PureShine</span>
          <span className="logo-tag">Detailing</span>
        </div>
        <nav className="nav">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="tel:+15551234567" className="nav-phone">
            <Phone size={15} />
            (555) 123-4567
          </a>
        </nav>
        <button className="cart-btn" onClick={onCartClick} aria-label="Open cart">
          <ShoppingCart size={20} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          {cartCount > 0 && <span className="cart-label">View Cart</span>}
        </button>
      </div>
    </header>
  );
}
