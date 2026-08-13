import { useEffect, useState } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";

function App() {

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
  },[cart])

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
    const updatedCart = cart.map(guitar => guitar.id === id && guitar.quantity < MAX_ITEMS ? {...guitar, quantity: guitar.quantity + 1} : guitar);
    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map(guitar => guitar.id === id && guitar.quantity > MIN_ITEMS ? {...guitar, quantity: guitar.quantity - 1} : guitar);
    setCart(updatedCart);
  }

  function cleanCart() {
    setCart([]);
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleanCart={cleanCart}
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