import { Dispatch } from "react";
import { type Guitar } from "../types";
import { CartActions } from "../reducers/cart-reducer";

interface GuitarProps {
    guitar: Guitar;
    dispatch: Dispatch<CartActions>
}

export default function Guitar({ guitar, dispatch } : GuitarProps) {

    const { name, image, description, price } = guitar;

    return (
        <div className="col-12 col-md-6 col-lg-4 my-4">
            <div className="guitar-card row align-items-center g-3">

                <div className="col-4 text-center">
                    <img className="img-fluid" src={`/img/${image}.jpg`} alt={`guitarra ${name}`}/>
                </div>

                <div className="col-8 guitar-card-content">
                    <div className="guitar-card-info">
                        <h3>{name}</h3>
                        <p className="guitarra-descripcion">{description}</p>
                    </div>

                    <div className="guitar-card-action">
                        <p className="guitarra-precio">${price}</p>
                        <button
                            type="button"
                            className="btn-dark w-100"
                            onClick={() => dispatch({type: "add-to-cart", payload:{item: guitar}})}
                        >
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}