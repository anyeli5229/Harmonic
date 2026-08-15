import { Dispatch, useMemo, useState } from "react";
import { Cartitem } from "../types";
import { CartActions } from "../reducers/cart-reducer";

interface HeaderProps {
    cart: Cartitem[];
    dispatch: Dispatch<CartActions>;
}

export default function Header({ cart, dispatch } : HeaderProps) {

    const [cartIsOpen, setCartIsOpen] = useState(false);

        const isEmpty = useMemo(() => cart.length === 0, [cart]);
        const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);
    
    return (
        <header className="header">
            <div className="container-xl">
                <div className="row justify-content-between align-items-center">
                    <div className="col-6 col-md-3">
                        <a href="index.html" className="d-inline-block text-decoration-none">
                            <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0" y="2" width="24" height="3" fill="#dc3545" rx="1.5" />
                                <text x="0" y="28" fontFamily="'Outfit', sans-serif" fontSize="24" fontWeight="900" fill="#ffffff" letterSpacing="1.5">
                                    HARMONIC
                                </text>
                            </svg>
                        </a>
                    </div>
                    <nav className="col-6 col-md-3 d-flex justify-content-end">

                        <div
                            className="carrito"
                            onMouseEnter={() => setCartIsOpen(true)}
                            onMouseLeave={() => setCartIsOpen(false)}
                        >
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            {cartIsOpen && (
                                <div id="carrito">
                                    {isEmpty ? (
                                        <p className="carrito-titulo text-center">El carrito esta vacío</p>

                                    ) : (

                                        <>
                                            <div className="carrito-titulo text-center">Resumen de Compra</div>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: '18%' }}>Item</th>
                                                        <th style={{ width: '28%' }}>Nombre</th>
                                                        <th style={{ width: '20%' }}>Precio</th>
                                                        <th style={{ width: '22%' }}>Cant.</th>
                                                        <th style={{ width: '12%' }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cart.map(guitar => (
                                                        <tr key={guitar.id}>
                                                            <td>
                                                                <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                                            </td>
                                                            <td className="fw-bold">{guitar.name}</td>
                                                            <td className="fw-bold">${guitar.price}</td>
                                                            <td>
                                                                <div className="cant-control">
                                                                    <button
                                                                        type="button"
                                                                        className="btn-cantidad"
                                                                        onClick={() => dispatch({type: "decrease-quantity", payload: {id: guitar.id}})}
                                                                    >
                                                                        -
                                                                    </button>

                                                                    <span>{guitar.quantity}</span>

                                                                    <button
                                                                        type="button"
                                                                        className="btn-cantidad"
                                                                        onClick={() => dispatch({type: "increase-quantity", payload: {id: guitar.id}})}
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <button className="btn-danger-cart" type="button" onClick={() => dispatch({type: "remove-from-cart", payload: {id: guitar.id}})}>✕</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            <div className="total-pagar">
                                                <span>Total a pagar:</span>
                                                <span>${cartTotal}</span>
                                            </div>

                                            <button
                                                className="btn-dark w-100"
                                                onClick={() => dispatch({type: "clean-cart"})}
                                            >
                                                Vaciar Carrito
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}
