import { useState } from 'react';

const images = import.meta.glob('../assets/images/*.{jpg,jpeg,png}', {
    eager: true,
    import: 'default',
});

function getImage(path) {
  return images[`../assets/images/${path}`];
}

function ProductCard({ product, onAddToCart, onRemoveFromCart, quantity }) {

    const handleAdd = () => {
        onAddToCart(product);
    };
    
    const handleRemove = () => {
        onRemoveFromCart(product.id);
    };

    return (
        <div className="product-card">
            <picture>
                <source media="(min-width: 1024px)" srcSet={getImage(product.image.desktop)} />
                <source media="(min-width: 768px)" srcSet={getImage(product.image.tablet)} />
                <img
                    src={getImage(product.image.mobile)}
                    alt={product.name}
                    className={`product-image ${quantity > 0 ? 'product-in-cart' : ''}`}
                />


                {quantity === 0 ? (
                    <button className="btn-add" onClick={handleAdd}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clipPath="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
                        <p>Add to Cart</p>
                    </button>
                    
                ) : (
                    <div className="btn-quantity">
                        <button className="btn-circle" onClick={handleRemove}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="currentColor" d="M0 .375h10v1.25H0V.375Z" />
                            </svg> 
                        </button>
                        <span>{quantity}</span>
                        <button className="btn-circle" onClick={handleAdd}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="currentColor" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                        </button>
                    </div>    
                )}


            </picture>

            <div className="product-info">
                <p className="product-category">{product.category}</p>
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">${product.price.toFixed(2)}</p>
            </div>         
        </div>
    );
}

export default ProductCard;