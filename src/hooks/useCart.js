import { useEffect, useState, useMemo } from "react";
import { db } from "../data/db";

export default function useCart() {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data, setData] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    function addToCart(item) {
        const itemExist = cart.findIndex(guitar => guitar.id === item.id);

        if (itemExist >= 0) {
            const updatedCart = cart.map((guitar, index) =>
                index === itemExist ? { ...guitar, quantity: guitar.quantity + 1 } : guitar
            );
            setCart(updatedCart);
        } else {
            const newItem = { ...item, quantity: 1 }
            setCart([...cart, newItem]);
        }
    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map(guitar => guitar.id === id && guitar.quantity < MAX_ITEMS ? { ...guitar, quantity: guitar.quantity + 1 } : guitar);
        setCart(updatedCart);
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map(guitar => guitar.id === id && guitar.quantity > MIN_ITEMS ? { ...guitar, quantity: guitar.quantity - 1 } : guitar);
        setCart(updatedCart);
    }

    function cleanCart() {
        setCart([]);
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart]);

    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cleanCart,
        isEmpty,
        cartTotal
    }
}