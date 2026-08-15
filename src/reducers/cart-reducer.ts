import { db } from "../data/db";
import { Cartitem, Guitar } from "../types";

export type CartActions =
    { type: "add-to-cart", payload: { item: Guitar } } |
    { type: "remove-from-cart", payload: { id: Cartitem["id"] } } |
    { type: "increase-quantity", payload: { id: Cartitem["id"] } } |
    { type: "decrease-quantity", payload: { id: Cartitem["id"] } } |
    { type: "clean-cart" }

export type CartState = {
    data: Guitar[],
    cart: Cartitem[]
}

function initialCart(): Cartitem[] {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

export const initialState: CartState = {
    data: db,
    cart: initialCart()
}

const MIN_ITEMS = 1
const MAX_ITEMS = 5

export function cartReducer(state: CartState = initialState, action: CartActions) {

    if (action.type === "add-to-cart") {
        const itemExist = state.cart.find(guitar => guitar.id === action.payload.item.id);

        let updatedCart: Cartitem[] = [];

        if (itemExist) {
            updatedCart = state.cart.map(item => item.id === action.payload.item.id && item.quantity < MAX_ITEMS ? {...item, quantity: item.quantity + 1} : item)
        } else {
            const newItem: Cartitem = { ...action.payload.item, quantity: 1 };
            updatedCart = [...state.cart, newItem];
        }

        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === "remove-from-cart") {
        return {
            ...state,
            cart: state.cart.filter(guitar => guitar.id !== action.payload.id)
        }
    }

    if (action.type === "increase-quantity") {
        const updatedCart = state.cart.map(guitar => guitar.id === action.payload.id && guitar.quantity < MAX_ITEMS ? { ...guitar, quantity: guitar.quantity + 1 } : guitar);

        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === "decrease-quantity") {
        const updatedCart = state.cart.map(guitar => guitar.id === action.payload.id && guitar.quantity > MIN_ITEMS ? { ...guitar, quantity: guitar.quantity - 1 } : guitar);

        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === "clean-cart") {

        return {
            ...state,
            cart: []
        }
    }

    return state;
}