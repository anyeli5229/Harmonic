import { useState } from "react";
import { Cartitem } from "../types";

interface HeaderProps {
    cart: Cartitem[];
    removeFromCart: (id: Cartitem["id"]) => void;
    increaseQuantity: (id: Cartitem["id"]) => void;
    decreaseQuantity: (id: Cartitem["id"]) => void;
    cleanCart: () => void;
    isEmpty: boolean;
    cartTotal: number;
}

export default function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, cleanCart, isEmpty, cartTotal } : HeaderProps) {

    const [cartIsOpen, setCartIsOpen] = useState(false);
    
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
                                                                        onClick={() => decreaseQuantity(guitar.id)}
                                                                    >
                                                                        -
                                                                    </button>

                                                                    <span>{guitar.quantity}</span>

                                                                    <button
                                                                        type="button"
                                                                        className="btn-cantidad"
                                                                        onClick={() => increaseQuantity(guitar.id)}
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <button className="btn-danger-cart" type="button" onClick={() => removeFromCart(guitar.id)}>✕</button>
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
                                                onClick={cleanCart}
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
