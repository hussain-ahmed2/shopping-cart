function Product({ id, title, thumbnail, description, price, setCart }) {

  function descriptionMinimizer(description) {
    if (description.length > 50) {
      const newDescription = description.split('');
      description = '';
      for(let i=0; i<50; i++){
        description += newDescription[i];
      }
      description += '...';
    }
    return description;
  }

  function handleClick() {
    const product = {id: id, title: title, price: price, quantity: 1, thumbnail: thumbnail}
    let exists = false;
    setCart(prev => {
      const updatedCart = prev.map(item => {
        if (item.id === id) {
          exists = true;
          return { ...item, quantity: item.quantity + 1 }; 
        }
        return item;
      });
      
      return exists ? updatedCart : [...updatedCart, product]; 
    });
    
  }

  return (
    <div className="flex flex-col border shadow basis-[240px] hover:border-yellow-500 transition-all duration-100 rounded-md">
      <img
        className="w-full max-w-60 max-h-60"
        src={thumbnail}
        alt="Product image"
      />
      <div className="px-3 pb-3">
        <h2 className="text-xl font-bold text-yellow-500 flex justify-between">${price} <span><button onClick={handleClick} className="font-semibold capitalize text-sm px-2 py-1 rounded bg-yellow-500 hover:bg-lime-500 text-white transition-all duration-100">add to cart</button></span></h2>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm">{descriptionMinimizer(description)}</p>
      </div>
    </div>
  );
}

export default Product;