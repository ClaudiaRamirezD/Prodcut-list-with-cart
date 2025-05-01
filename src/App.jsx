import { useState } from 'react';
import products from "./data/data.json";
import './App.css';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import useCart from './hooks/useCart';
import OrderConfirmationModal from './components/OrderConfirmationModal';


function App() {
  const {
    cart,
    total,
    totalItems,
    addToCart,
    removeFromCart,
    clearCart
  } = useCart();

  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleReset = () => {
    clearCart();        
    setIsConfirmed(false); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  

  return (
    <main className="main-layout">
      <div className='products-wrapper'>
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
      </div>

      <div className='cart-wrapper'>
        <Cart
          cart={cart}
          total={total}
          totalItems={totalItems}
          onRemoveFromCart={removeFromCart}
          clearCart={clearCart}
          onConfirmOrder={handleConfirmOrder}
        />
      </div>
      {isModalOpen && (
        <OrderConfirmationModal
          cart={cart}
          total={total}
          onClose={handleCloseModal}
          onReset={handleReset}
        />
      )}
    </main>
  );
}

export default App