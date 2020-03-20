import React, { useContext } from "react";
import TitleProduct from "../TitleProduct";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductContext } from "../../context/ProductContext";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

function Cart() {
  const { cart } = useContext(ProductContext);
  console.log(cart);

  return (
    <section>
      {cart.length > 0 ? (
        <React.Fragment>
          <TitleProduct name="your" title="cart" />
          <CartColumns />
          <CartList cart={cart} />
          <CartTotals cart={cart} />
        </React.Fragment>
      ) : (
        <EmptyCart />
      )}
    </section>
  );
}

export default Cart;
