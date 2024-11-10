import { useEffect, useState } from "react";
import Product from "./components/Product";
import { TiShoppingCart } from "react-icons/ti";
import { FaListCheck } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

function App() {
  const [products, setProducts] = useState([]);
  const [isCartActive, setIsCartActive] = useState(false);
  const [isWishListActive, setIsWishListActive] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishList, setWishList] = useState([]);

  function handleCartClick() {
    setIsCartActive((prev) => !prev);
  }
  function handleWishListClick() {
    setIsWishListActive((prev) => !prev);
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
  function handleClearWishList() {
    setWishList([]);
  }

  function handleQuantityIncrease(id) {
    setCart(prev => {
      const newCart = prev.map(item => {
        if (item.id === id) {
          return {...item, quantity: item.quantity+1}
        }

        return item;
      })

      return newCart;
    })
  }

  function handleQuantityDecrease(id) {
    setCart(prev => {
      const newCart = prev.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 > 0 ? item.quantity - 1 : 0}
        }

        return item;
      })

      return newCart;
    })
  }

  function handleCartRemove(id) {
    setCart(prev => {
      const newCart = prev.filter(item => item.id !== id)

      return newCart;
    })
  }

  function handleWishRemove(id) {
    setWishList(prev =>  {
      const newWishList = prev.filter(item => item.id !== id);
      return newWishList;
    })
  }

  useEffect(() => {
    fetchProduct(URL);
  }, []);

  return (
    <>
      <nav className="flex justify-between z-50 items-center px-10 h-14 border-b shadow fixed w-full bg-white">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <div className="flex items-center gap-6">
          <button onClick={handleWishListClick} className="flex items-center text-xl py-1 px-2 gap-1 rounded shadow border hover:shadow-red-500 hover:text-red-500 transition-all duration-150">
            <FaListCheck />
            <span className="text-base font-mono uppercase">WishList</span>
          </button>
          <button
            onClick={handleCartClick}
            className="flex items-center text-xl py-1 px-2 rounded shadow border hover:shadow-yellow-500 hover:text-yellow-500 transition-all duration-150"
          >
            <TiShoppingCart />
            <span className="text-base font-mono">CART</span>
          </button>
        </div>
      </nav>

      <div
        className={`fixed flex flex-col z-50 top-20 min-w-96 right-10 p-3 bg-white border transition-all duration-150 shadow-lg ${
          !isWishListActive && "hidden"
        }`}
      >
        <h1 className="text-lg pb-3 px-5 flex justify-between ">
          WishList{" "}
          <button
            onClick={handleWishListClick}
            className="text-xl hover:text-yellow-500"
          >
            &#10005;
          </button>
        </h1>
        <table className="table text-center">
          {wishList.length > 0 && (
            <thead>
              <tr>
                <th className="px-5">Product</th>
                <th className="px-5">Price</th>
              </tr>
            </thead>
          )}

          <tbody>
            {!wishList.length ? (
              <tr>
                <td>WishList is empty</td>
              </tr>
            ) : (
              wishList.map((item) => (
                <tr key={item.id}>
                  <td className="flex gap-5 items-center">
                    <img
                      src={item.thumbnail}
                      alt="cart item"
                      className="w-16 h-16"
                    />
                    {item.title}
                  </td>
                  <td>{item.price}</td>
                  <td><FaTrash className="hover:text-red-500 cursor-pointer" onClick={() => handleWishRemove(item.id)} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {wishList.length > 0 && (
          <button
            onClick={handleClearWishList}
            className="self-end mt-3 me-5 px-3 py-1 text-md rounded-md font-semibold capitalize bg-yellow-400 hover:text-white hover:bg-neutral-600"
          >
            clear wishList
          </button>
        )}
      </div>

      <div
        className={`fixed flex flex-col top-20 min-w-96 right-10 p-3 bg-white border transition-all duration-150 shadow-lg z-50 ${
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
            {!cart.length ? (
              <tr>
                <td>Cart is empty</td>
              </tr>
            ) : (
              cart.map((item) => (
                <tr key={item.id}>
                  <td className="flex gap-5 items-center">
                    <img
                      src={item.thumbnail}
                      alt="cart item"
                      className="w-16 h-16"
                    />
                    {item.title}
                  </td>
                  <td><button disabled={!item.quantity} className={`font-bold text-xl text-red-500 me-2 ${!item.quantity && 'cursor-not-allowed'}`} onClick={() => handleQuantityDecrease(item.id)}>-</button> {item.quantity} <button className="font-bold ms-2 text-xl text-emerald-500" onClick={() => handleQuantityIncrease(item.id)}>+</button></td>
                  <td>{(item.price * item.quantity).toFixed(2)}</td>
                  <td><FaTrash className="hover:text-red-500 cursor-pointer" onClick={() => handleCartRemove(item.id)} /></td>
                </tr>
              ))
            )}
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

        {cart.length > 0 && (
          <button
            onClick={handleClearCart}
            className="self-end mt-3 me-5 px-3 py-1 text-md rounded-md font-semibold capitalize bg-yellow-400 hover:text-white hover:bg-neutral-600"
          >
            clear cart
          </button>
        )}
      </div>

      <h1 className="pt-16 text-center text-3xl font-bold">Products</h1>
      <div className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-fit mx-auto gap-2 pt-3 px-4">
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            thumbnail={product.thumbnail}
            description={product.description}
            price={product.price}
            setCart={setCart}
            wishList={wishList}
            setWishList={setWishList}
          />
        ))}
      </div>

      <footer className="text-center p-5">by hussain</footer>
    </>
  );
}

export default App;
