// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../service/apiRestaurant";
import { formatCurrency, formatDate, calcMinutesLeft } from "../../utils/helpers";
//import SearchOrder from "./SearchOrder";
import OrderItem from "./OrderItem";



function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order=useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  
  const deliveryIn = calcMinutesLeft(order.estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">
      
      <div className="flex items-center justify-between flex- wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && <span className="bg-green-500 rounded-full py-1 px-3 text-sm font-semibold text-red-50">Priority</span>}
          <span className="bg-red-500 rounded-full py-1 px-3 text-sm font-semibold text-green-50">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
<ul className="divide-stone-200 divide-y border-b border-t">
  {cart.map((item)=><OrderItem item={item} key={item.id}/>)}
</ul>
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-200">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-200">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="text-sm font-bold text-stone-200">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export async function loader({params}){
  
  const order=await getOrder(params.orderId);
  
  return order;
}

export default Order;
