import NewOrder from "../order.js"
import "./styles.css";
import {Link} from 'react-router-dom';

export default function ViewThali(){

	function viewthali(){
		console.log(NewOrder);
	}
	return(
		<div class="order">
			<Link to="/ordersummary" class="btn btn-primary" onClick={(event)=>{viewthali();}}>View your thali</Link>
		</div>
	);
}