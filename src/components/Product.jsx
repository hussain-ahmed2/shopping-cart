import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import proptypes from 'prop-types'

function Product({
  id,
  title,
  thumbnail,
  description,
  price,
  setCart,
  wishList,
  setWishList,
}) {
  const [wished, setWished] = useState(false);
  const [addToCartPopup, setAddToCartPopup] = useState(false);

  function descriptionMinimizer(description) {
    if (description.length > 50) {
      const newDescription = description.split("");
      description = "";
      for (let i = 0; i < 50; i++) {
        description += newDescription[i];
      }
      description += "...";
    }
    return description;
  }

  function handleClick() {
    const product = {
      id: id,
      title: title,
      price: price,
      quantity: 1,
      thumbnail: thumbnail,
    };
    let exists = false;
    setCart((prev) => {
      const updatedCart = prev.map((item) => {
        if (item.id === id) {
          exists = true;
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      return exists ? updatedCart : [...updatedCart, product];
    });

    setAddToCartPopup(true);
    setTimeout(() => setAddToCartPopup(false), 2000);
  }

  function handleWishClick() {
    if (!wished) {
      const product = {
        id: id,
        title: title,
        price: price,
        thumbnail: thumbnail,
      };
      let exists = false;
      setWishList((prev) => {
        const updatedCart = prev.map((item) => {
          if (item.id === id) {
            exists = true;
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });

        return exists ? updatedCart : [...updatedCart, product];
      });
    } else {
      setWishList(prev => prev.filter(item => item.id != id));
    }
    setWished(prev => !prev);
  }

  useEffect(() => {
    let found = false;
    for (let item of wishList) {
      if (item.id == id) {
        found = true;
        break;
      }
    }
    if (found) setWished(true);
    else setWished(false);
  }, [wished, wishList]);

  return (
    <div className="flex flex-col border shadow basis-[240px] hover:border-yellow-500 transition-all duration-100 rounded-md relative">
      <img
        className="w-full max-w-60 max-h-60"
        src={thumbnail}
        alt="Product image"
      />
      <div className="px-3 pb-3">
        <h2 className="text-xl font-bold text-yellow-500 flex justify-between items-center">
          ${price}{" "}
          <span className="text-black cursor-pointer transition-all duration-100 ease-linear" onClick={handleWishClick}>
            <FaHeart fill={wished ? "red" : "#333"} />
          </span>{" "}
          <span>
            <button
              onClick={handleClick}
              className="font-semibold capitalize text-sm px-2 py-1 rounded bg-yellow-500 hover:bg-lime-500 text-white transition-all duration-100"
            >
              add to cart
            </button>
          </span>
        </h2>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm">{descriptionMinimizer(description)}</p>
      </div>
      {
        addToCartPopup && <span className="absolute top-10 right-5 z-10 bg-green-200 bg-opacity-65 rounded px-3 py-1 transition-all duration-200 shadow-sm">Product Added</span>
      }
    </div>
  );
}

export default Product;


Product.propTypes = {
  id: proptypes.any.isRequired,
  title: proptypes.string.isRequired,
  thumbnail: proptypes.string.isRequired,
  description: proptypes.string.isRequired,
  price: proptypes.number.isRequired,
  setCart: proptypes.func.isRequired,
  wishList: proptypes.array.isRequired,
  setWishList: proptypes.func.isRequired,
}