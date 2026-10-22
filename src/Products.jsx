import { useCallback, useState } from "react";
import "./App.css";
import whiteSneakers from "./assets/white.avif";
import blueSneakers from "./assets/hite.avif";
import iphone from "./assets/iphone-15-pro.avif";
import speakers from "./assets/spk.avif";
import cargoTrousers from "./assets/trouser.webp";
import tripod from "./assets/tripod stand.jpg";
import streetJeans from "./assets/street jean.webp";
import iphonePurple from "./assets/OIP.webp";
import iphoneBlue from "./assets/O.webp";
import iphoneOrange from "./assets/ff.webp";
import formalTrousers from "./assets/black trouser.webp";
import baggyJeans from "./assets/baggy jean.webp";
import appleCollection from "./assets/Apple.jpg";
import braceletSet from "./assets/racelet.webp";
import diamondRings from "./assets/jewelry-ring-with-diamonds-and-precious-stones.jpg";
import goldBraceletSet from "./assets/gold Bracelet.webp";
import goldRings from "./assets/finger ring.jpg";
import LoadingSpinner from "./LoadingSpinner.jsx";

const products = [
  { id: 1, name: "Classic White Sneakers", category: "Fashion", price: "$89.99", image: whiteSneakers },
  { id: 2, name: "Blue Street Sneakers", category: "Fashion", price: "$79.99", image: blueSneakers },
  { id: 3, name: "Premium Headphones", category: "Electronics", price: "$199.99", image: speakers },
  { id: 4, name: "iPhone 15 Pro", category: "Electronics", price: "$999.99", image: iphone },
  { id: 5, name: "Cargo Trousers", category: "Fashion", price: "$59.99", image: cargoTrousers },
  { id: 6, name: "Phone Tripod Stand", category: "Electronics", price: "$34.99", image: tripod },
  { id: 7, name: "Street Jeans", category: "Fashion", price: "$64.99", image: streetJeans },
  { id: 8, name: "Purple iPhone", category: "Electronics", price: "$799.99", image: iphonePurple },
  { id: 9, name: "Blue iPhone", category: "Electronics", price: "$799.99", image: iphoneBlue },
  { id: 10, name: "Orange iPhone", category: "Electronics", price: "$799.99", image: iphoneOrange },
  { id: 11, name: "Formal Trousers", category: "Fashion", price: "$54.99", image: formalTrousers },
  { id: 12, name: "Baggy Jeans", category: "Fashion", price: "$69.99", image: baggyJeans },
  { id: 13, name: "Apple Collection", category: "Electronics", price: "$899.99", image: appleCollection },
  { id: 14, name: "Bracelet Set", category: "Accessories", price: "$39.99", image: braceletSet },
  { id: 15, name: "Diamond Rings", category: "Accessories", price: "$129.99", image: diamondRings },
  { id: 16, name: "Gold Bracelet Set", category: "Accessories", price: "$49.99", image: goldBraceletSet },
  { id: 17, name: "Gold Rings", category: "Accessories", price: "$89.99", image: goldRings },
];

export default function Products({ onAddToCart }) {
  const [loadedImages, setLoadedImages] = useState({});

  const markLoaded = useCallback((id) => {
    setLoadedImages((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  }, []);

  // Cached images can finish decoding before React attaches onLoad,
  // so check `complete` on mount as well.
  const attachImage = useCallback(
    (id) => (node) => {
      if (node && node.complete) markLoaded(id);
    },
    [markLoaded]
  );

  return (
    <section className="shop-section" id="shop">
      <div className="section-heading shop-heading">
        <div>
          <span className="eyebrow">HANDPICKED FOR YOU</span>
          <h2>The good stuff<span className="heading-dot">.</span></h2>
          <p className="section-description">Good quality, great design, and prices that make sense.</p>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image">
              {!loadedImages[product.id] && (
                <LoadingSpinner variant="skeleton" label={`Loading ${product.name}`} />
              )}
              <img
                ref={attachImage(product.id)}
                src={product.image}
                alt={product.name}
                loading="lazy"
                onLoad={() => markLoaded(product.id)}
                onError={() => markLoaded(product.id)}
                className={loadedImages[product.id] ? "is-loaded" : "is-loading"}
              />
            </div>
            <div className="product-info">
              <div className="product-meta"><span>{product.category}</span><span className="rating">★ 4.8</span></div>
              <h3>{product.name}</h3>
              <div className="price-row"><strong>{product.price}</strong></div>
              <button className="quick-add" onClick={() => onAddToCart(product)}>
                <span className="quick-add-icon" aria-hidden="true">+</span>
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}