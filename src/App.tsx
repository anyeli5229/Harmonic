import { useEffect, useReducer } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { cartReducer, initialState } from "./reducers/cart-reducer";


function App() {

  const [ state, dispatch ] = useReducer(cartReducer, initialState);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart])

  return (
    <>
      <Header
        cart={state.cart}
        dispatch={dispatch}
      />

      <main className="container-xl">
        <h2 className="titulo-seccion">Nuestra Colección</h2>

        <div className="row g-5">
          {state.data.map(guitar => (
            <Guitar key={guitar.id} guitar={guitar} dispatch={dispatch} />
          ))}
        </div>
      </main>

      <footer>
        <div className="container-xl">
          <p className="text-center">Harmonic - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  );
}

export default App;