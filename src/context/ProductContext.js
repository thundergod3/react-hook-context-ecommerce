import React, { createContext, useState, useEffect } from "react";
import { storeProducts, detailSingleProduct } from "../data";

const ProductContext = createContext();
// Provider
// Consumer

function ProductContextProvider(props) {
  const [products, setProducts] = useState([]);
  const [detailProduct, setDetailProduct] = useState(detailSingleProduct);
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(detailProduct);
  const [cartSubTotal, setCartSubToTal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const handleDetail = id => {
    const product = getItem(id);
    setDetailProduct(product);
  };

  const addItem = id => {
    let tempProducts = [...products];
    let tempCart = [...cart];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    tempCart = [...cart, product];
    setProducts(tempProducts);
    setCart(tempCart);
  };

  const getItem = id => {
    const product = products.find(item => item.id === id);
    return product;
  };

  const openModal = id => {
    const product = getItem(id);
    setModalProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    let tempProduct = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProduct = [...tempProduct, singleItem];
    });
    setProducts(tempProduct);
  }, []);

  useEffect(() => {
    console.log(cart);
    addTotals();
  });

  const increment = id => {
    let tempCart = [...cart];
    console.log(tempCart);
    const selectedProduct = tempCart.find(item => item.id === id);

    selectedProduct.count = selectedProduct.count + 1;
    selectedProduct.total = selectedProduct.count * selectedProduct.price;
    tempCart = [...tempCart];
    setCart(tempCart);
    addTotals();
  };

  const decrement = id => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find(item => item.id === id);

    selectedProduct.count = selectedProduct.count - 1;
    if (selectedProduct.count === 0) {
      removeItem(id);
    } else {
      selectedProduct.total = selectedProduct.count * selectedProduct.price;
      tempCart = [...tempCart];
      setCart(tempCart);
      addTotals();
    }
  };

  const removeItem = id => {
    let tempProducts = [...products];
    let tempCart = [...cart];

    tempCart = tempCart.filter(item => item.id !== id);

    const index = tempProducts.indexOf(getItem(id));
    let removeProduct = tempProducts[index];
    removeProduct.inCart = false;
    removeProduct.count = 0;
    removeProduct.total = 0;
    tempProducts = [...tempProducts];
    setProducts(tempProducts);
    setCart(tempCart);
    addTotals();
  };

  const clearCart = () => {
    setCart([]);
    setProducts(storeProducts);
    // addTotals();
  };

  const addTotals = () => {
    console.log(cart);
    let subTotal = 0;
    cart.map(item => {
      subTotal += item.total;
      console.log(subTotal);
    });
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    setCartSubToTal(subTotal);
    setCartTax(tax);
    setCartTotal(total);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        detailProduct,
        modalOpen,
        modalProduct,
        handleDetail,
        addItem,
        openModal,
        closeModal,
        cartSubTotal,
        cartTax,
        cartTotal,
        increment,
        decrement,
        removeItem,
        clearCart
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

export { ProductContextProvider, ProductContext };
