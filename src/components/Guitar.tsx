import { type Guitar } from "../types";

interface GuitarProps {
    guitar: Guitar;
    addToCart: (item: Guitar) => void
}

export default function Guitar({ guitar, addToCart } : GuitarProps) {

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
                            onClick={() => addToCart(guitar)}
                        >
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}