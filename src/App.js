import React, { useState, useEffect} from 'react';
import { commerce } from './lib/commerce';
import  { Products, Navbar, Cart}  from './components';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
//add items to cart
  const handleAddToCart = async (productid, quanitity) => {
    const item = await commerce.cart.add(productid, quanitity);
    //cart after item is added
    setCart(item.cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

console.log(cart);

  return (
    <div>
    <Navbar totalItems={cart.total_items} />
    {/* <Products products={products} onAddToCart={handleAddToCart} /> */}
    <Cart cart= {cart}/>
    </div>
  )
}

export default App