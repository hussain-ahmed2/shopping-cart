import { useEffect, useState } from "react";
import Product from "./components/Product";

function App() {
  const [products, setProducts] = useState([]);
  const [isCartActive, setIsCartActive] = useState(false);
  const [cart, setCart] = useState([]);

  function handleCartClick() {
    setIsCartActive((prev) => !prev);
  }

  const URL = "https://dummyjson.com/products";
  const fetchProduct = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setProducts(data.products);
  };

  function handleClearCart() {
    setCart([]);
  }

  useEffect(() => {
    fetchProduct(URL);
  }, []);

  return (
    <>
      <nav className="flex justify-between items-center px-10 h-14 border-b shadow fixed w-full bg-white">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <button
          onClick={handleCartClick}
          className="font-semibold text-xl py-2 px-4 rounded-md text-white bg-yellow-500"
        >
          Cart
        </button>
      </nav>

      <div
        className={`fixed flex flex-col top-20 min-w-96 right-10 p-3 bg-white border transition-all duration-150 shadow-lg ${
          !isCartActive && "hidden"
        }`}
      >
        <h1 className="text-lg pb-3 px-5 flex justify-between ">
          Cart Items{" "}
          <button
            onClick={handleCartClick}
            className="text-xl hover:text-yellow-500"
          >
            &#10005;
          </button>
        </h1>
        <table className="table text-center">
          {cart.length > 0 && (
            <thead>
              <tr>
                <th className="px-5">Product</th>
                <th className="px-5">Quantity</th>
                <th className="px-5">Price</th>
              </tr>
            </thead>
          )}

          <tbody>
            {!cart.length
              ? "Cart is empty"
              : cart.map((item) => (
                  <tr key={item.id}>
                    <td className="flex gap-5 items-center">
                      <img
                        src={item.thumbnail}
                        alt="cart item"
                        className="w-16 h-16"
                      />
                      {item.title}
                    </td>
                    <td>{item.quantity}</td>
                    <td>{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
            {cart.length > 0 && (
              <tr>
                <td className="font-bold">Total</td>
                <td>-</td>
                <td className="font-bold">
                  {cart
                    .reduce(
                      (acc, item) => (acc += item.price * item.quantity),
                      0
                    )
                    .toFixed(2)}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {cart.length > 0 && <button onClick={handleClearCart} className="self-end mt-3 me-5 px-3 py-1 text-md rounded-md font-semibold capitalize bg-yellow-400 hover:text-white hover:bg-neutral-600">clear cart</button>}
      </div>

      <div className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-fit mx-auto gap-2 pt-16">
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            thumbnail={product.thumbnail}
            description={product.description}
            price={product.price}
            setCart={setCart}
          />
        ))}
      </div>
    </>
  );
}

export default App;
