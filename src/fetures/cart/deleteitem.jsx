import { useDispatch } from "react-redux";
import Button from "../../UI/Button";
import { deleteItem } from "./cartSlice";

export default function DeleteItem({id}){
    const dispach=useDispatch();
    return(
        <Button type="small" onClick={()=>dispach(deleteItem(id))}>Delete</Button>
    )
}