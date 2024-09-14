//import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../service/apiRestaurant";
import Button from "../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store"
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
   const [withPriority, setWithPriority] = useState(false);
  const username=useSelector(state=>state.user.userName)
  const dispach=useDispatch()
  const cart = useSelector(getCart)
  const totalPrice=useSelector(getTotalCartPrice)
  const priorityPrice=withPriority?totalPrice * 0.2 : 0;
  const total=totalPrice + priorityPrice
  const submission=useNavigation();
  const isSubmmiting=submission.state==="submitting"
  const formError=useActionData();
  if(!cart.length) return <EmptyCart/>
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Lets go!</h2>

      {/*<Form method="POST" action="order/new">*/}
      <button onClick={()=>dispach(fetchAddress())}>get Position</button>
      <Form method="POST">
        <div className="mb-5  flex gap-2 flex-col sm:flex-row sm:items-center ">
          <label className="sm:basis-40">First Name</label>
          <input className="input w-full" type="text" name="customer" required defaultValue={username}  />
        </div>

        <div className="mb-5  flex gap-2 flex-col sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
          
          {formError?.phone && <p className="text-xs mt-2 text-red-600 bg-red-200 rounded-md">{formError.phone}</p>}
          </div>
        </div>

        <div className="mb-5  flex gap-2 flex-col sm:flex-row sm:items-center " >
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full" type="text" name="address" required />
          </div>
        </div>

        <div  className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
             value={withPriority}
             onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400
            focus:outline-none focus:ring focus:ring-yellow-300 focus::ring-offset-2"
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
      <Button disabled={isSubmmiting} 
      type="primary">{isSubmmiting?"Placing your order":`Order now ${formatCurrency(total)}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}){
   const formData=await request.formData();
   const data=Object.fromEntries(formData)
   
   const order={
    ...data,
    cart:JSON.parse(data.cart),
    priority:data.priority==="true"
   }
   
   const errors={};
   if(!isValidPhone(order.phone))
    errors.phone=
  "please give the correct phone number please"
  if(Object.keys(errors).length>0) return errors;
   
  //if everything is ok return the new order object
  const newOrder=await createOrder(order)
  console.log(newOrder)
  store.dispatch(clearCart())
   return redirect(`/order/${newOrder.id}`);
}  

export default CreateOrder;
