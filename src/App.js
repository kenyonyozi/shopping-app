import React,{ useState, useEffect, Fragment} from 'react';
import  { Products, Navbar, Cart , Checkout}  from './components/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { commerce } from './lib/commerce';

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
  const handleAddToCart = async (productid, quantity) => {
    const { cart }= await commerce.cart.add(productid, quantity);
    //cart after item is added
    setCart(cart);
  };

  const handleUpdateCartQty = async (productid, quantity) =>{
    const { cart } = await commerce.cart.update(productid,{quantity});
    setCart(cart);
  };

  const handleRemoveFromCart = async (productid) =>{
    const { cart } = await commerce.cart.update(productid);
    setCart(cart);
  };

  const handleEmptyCart = async () =>{
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);


  return (
    <Router>
      <Fragment>
        <Navbar totalItems={cart.total_items}/>
        <Routes>
          <Route exact path='/' element={<Products products={products} onAddToCart={handleAddToCart} />}/>
          <Route exact path='/cart' element={<Cart cart= {cart} handleUpdateCartQty={handleUpdateCartQty } handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart}  />}/>
          <Route exact path='/checkout' element={<Checkout/>}/>
        </Routes>
      </Fragment>
    </Router>
  )
}

export default App