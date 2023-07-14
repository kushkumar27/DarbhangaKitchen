import Menu from "../Menu.js";
import NewOrder from "../order.js";
import "./styles.css";
import {useState} from 'react';

export default function OrderSummary(){
	const [bill,setBill]=useState({});
	const [inputs, setInputs] = useState({}); 

	var orderedList={
		id:[],
		items:[],
		quantity:[],
		cost:[],
		total:0,
		date:new Date()
	};	
	var total=0;
	var arr=[];
	var index=0;
	for(var dish in Menu){
		let id=Menu[dish].id;
		//console.log(id);
		for(var i in NewOrder.order){
			if(i==id && NewOrder.order[i]>0){
				arr.push(index);
				index++;
				orderedList.id.push(i);
				orderedList.items.push(Menu[dish].name);
				orderedList.quantity.push(NewOrder.order[i]);
				orderedList.cost.push(Menu[dish].cost);
				total=total+(Menu[dish].cost)*(NewOrder.order[i]);
				break;
			}
		}
	}
	total = (total*116)/100;
	orderedList.total=total;

	const handleChange = (event) => {
	    const name = event.target.name;
	    const value = event.target.value;
	    setInputs(values => ({...values, [name]: value}))
	}
	const handleOrder = (event)=>{
		var orderData = {
		    "userName":inputs.name,
		    "userMail":inputs.email,
		    "userMobile":inputs.pnum,
		    "userAddress":inputs.add,
		    "orderItems" : {}
		}

		for(let i=0 ; i<orderedList.id.length;i++){
			orderData["orderItems"][orderedList.id[i]] = orderedList.quantity[i]
		}
		var flag = false;
		for(let f in orderData){
			if(orderData[f] == undefined){
				flag = true;
			}
		}
		if(orderData["orderItems"].length == 0) flag = true;

		console.log(orderData)
		if(flag){
			alert("Please order something or fill details");
		}else{
			makeOrder(orderData);
			alert("Order is initiated..");
		}
			
	}
	
	return(
		<div className="container orderSummary">
			<div><h1>Order Summary</h1>
			<div id="order-table">
				<table style={{"width":"100%"}}>
					<tr>
					    <th>Item</th>
					    <th>Quantity</th>
					    <th>Cost</th>
					    <th>Amount</th>
					</tr>
					 {
					 		arr.map((i)=>{
						    	return (<tr>
					    			<td>{orderedList.items[i]}</td>
					    			<td>{orderedList.quantity[i]}</td>
					    			<td>{orderedList.cost[i]}</td>
					    			<td>{orderedList.cost[i]*orderedList.quantity[i]}</td>
								</tr>);
					 		})
					 }
					 <tr>
					    <th>Tax</th>
					    <th></th>
					    <th></th>
					    <th>16%</th>
					</tr>
					 <tr>
					    <th>Total</th>
					    <th></th>
					    <th></th>
					    <th>{total}</th>
					</tr>
				</table>
			</div>
		</div>
		<div className="contact">
			<div className="contact-items"><label>Name </label><input type="letter" name="name" onChange={handleChange} required /></div>
			<div className="contact-items"><label>Phone No.</label><input type="number" name="pnum" onChange={handleChange} required/></div>
			<div className="contact-items"><label>Address  </label><textarea  name="add" onChange={handleChange} required /></div>
			<div className="contact-items"><label>Email  </label><input  type="letter" name="email" onChange={handleChange} required /></div>
		</div>
		<div id="orderNowButton"><button className="btn btn-primary" onClick={handleOrder}>Order Now</button></div>
		</div>
	);


	

	

}




function makeOrder(orderData){
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(orderData)
	};
			    
	fetch('http://localhost:5000/order/saveOrder', requestOptions)
	.then(response => response.json())
	.then(res =>{
		console.log(res);
	})
		
}

