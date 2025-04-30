import { useState, useMemo } from 'react';

export default function useCart() {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prevCart => {
        const found = prevCart.find(item => item.id === product.id);
        if (found) {
            return prevCart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            return [...prevCart, { ...product, quantity: 1 }];
        }
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => {
        const found = prevCart.find(item => item.id === productId);
        if (!found) return prevCart;

        if (found.quantity > 1) {
            return prevCart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            );
        } else {
            return prevCart.filter(item => item.id !== productId);
        }
        });
    };

    const groupedCart = cart;

    const total = useMemo(() => {
        return cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    }, [cart]);

    const totalItems = useMemo(() => {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    }, [cart]);

    return {
        cart,
        groupedCart,
        total,
        totalItems,
        addToCart,
        removeFromCart
    };
}
