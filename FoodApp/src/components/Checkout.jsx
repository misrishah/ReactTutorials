import { useContext ,useActionState } from "react";
import Modal from './UI/Modal.jsx';
import CartContext from '../store/CartContext';
import { currencyFormatter } from "../util/formatting.js";
import Input from './UI/Input.jsx';
import UserProgressContext from "../store/UserProgressContext.jsx";
import Button from "./UI/Button.jsx"; // Don't forget this if not already imported
import useHttp from "../hooks/useHttp.js";

const requestConfig = {
  method: 'POST',
  headers:{
    'Content-Type': 'application/json'
  }
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data, 
    isLoading: isSending, 
    error, 
    sendRequest,
    clearData
  } = useHttp('http://localhost:3000/orders', requestConfig );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish(){
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  async function checkoutAction(fm){
    const customerData = Object.fromEntries(fm.entries()); // {email:test@example.com}
    
   await sendRequest(
      JSON.stringify({
      order:{
        items: cartCtx.items,
        customer:customerData,
      },
    })
  );
  }

  const [formState, formAction, pending]= useActionState(checkoutAction, null);

  let actions = (
    <>
    <Button type="button" textOnly onClick={handleClose}>
        Close
    </Button>

    <Button>Submit Order</Button>
    </>
  );

  if(isSending) {
    actions= <span> Sending order data...</span>;
  }

  if(data && !error) {
    return (
    <Modal 
      open={userProgressCtx.progress === 'checkout'} 
      onClose={handleFinish}
    >
      <h2>SUCCESS!</h2>
      <p>Your order has been submitted sucessfully.</p>
      <p>
        We will get back to you more details via email soon.
      </p>
      <p className= "modal-actions"> 
        <Button onClick={handleFinish}>Okay</Button>
      </p>
    </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
      <form action= {checkoutAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name: " type="text" id="name" />
        <Input label="E-mail Address: " type="email" id="email" />
        <Input label="Street: " type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title= "Failed to submit order" message={error} />}

        <p className="modal-actions">{actions} </p>
          </form>
    </Modal>
  );
}
