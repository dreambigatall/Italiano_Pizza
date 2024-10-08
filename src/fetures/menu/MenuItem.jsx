import { useNavigation } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/deleteitem";
import UpdateitemQuantity from "../cart/UpdateitemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispacth=useDispatch();
  const currentQuantiy=useSelector(getCurrentQuantityById(id))
  const isIncart=currentQuantiy>0;
  function handelAddToCart(){
   const newItem={
            pizzaId:id,
            name,
            quantity:1,
            unitPrice,
            totalPrice:unitPrice*1
            
   }
    
   dispacth(addItem(newItem));


  }
  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24
      ${soldOut ? 'opacity-70 grayscale':""}`}/>
      <div className="flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex  items-center
        justify-between ">

          {!soldOut ? 
          <p className="text-sm">
            {formatCurrency(unitPrice)}
            </p> :
             <p className="text-sm uppercase font-medium text-stone-500">
              Sold out</p>}
              {isIncart &&(
                <div className="flex item-center gap-3 sm:gap-8">
                  <UpdateitemQuantity currentQuantity={currentQuantiy} pizzaId={id}/>
                <DeleteItem id={id}/>
                </div>)}

              {!soldOut && !isIncart && ( <Button type="small" onClick={handelAddToCart}>Add to cart</Button>)}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
