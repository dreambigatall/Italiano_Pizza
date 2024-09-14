import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../service/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menusPizza=useLoaderData();
  console.log(menusPizza)
  return (
    <ul className="divide-y divide-stone-200 px-2 ">
      {menusPizza.map((pizza)=>(
        <MenuItem pizza={pizza} key={pizza.id}/>
      ))}
    </ul>
  )
}

export async function loader(){
  const menu=await getMenu();
  return menu;
}

export default Menu;
