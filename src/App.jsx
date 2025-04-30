import { useState } from 'react';
import products from "./data/data.json";
import './App.css';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import useCart from './hooks/useCart';


function App() {
  const {
      cart,
      groupedCart,
      total,
      totalItems,
      addToCart,
      removeFromCart
    } = useCart();

  return (
    <main>
      <h1>Desserts</h1>
      <section className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={(cart.find(item => item.id === product.id)?.quantity) || 0}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
            />
        ))}
      </section>

      <Cart
        cart={groupedCart}
        total={total}
        totalItems={totalItems}
        onRemoveFromCart={removeFromCart}
      />
    </main>
  );
}

export default App