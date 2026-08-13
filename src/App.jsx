import Guitar from "./components/Guitar";
import Header from "./components/Header";
import useCart from "./hooks/useCart";

function App() {

  const { data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, cleanCart, isEmpty, cartTotal } = useCart();

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleanCart={cleanCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <main className="container-xl">
        <h2 className="titulo-seccion">Nuestra Colección</h2>

        <div className="row g-5">
          {data.map(guitar => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
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