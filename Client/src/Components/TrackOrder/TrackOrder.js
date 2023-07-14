import "./styles.css"
import Menu from "../Menu.js";

import {useState,useRef} from 'react';
export default function TrackOrder(){
	const [tropt,setTropt]=useState("ord");
	const [orders,setOrders]=useState([]);
	const [searching,setSearching]=useState(0);
	return(
		<div class="container">
		
		<div class="TrackOrderMain">
			<TrackOptions changeTropt={setTropt}/>
			<SearchButton tropt={tropt} listOrder={setOrders} changeSearching={setSearching}/>
		</div>
		<div class="TrackOrderList">
			<ShowOrders orders={orders} searching={searching}/>
		</div>
		</div>
	);
}
function findOrder(trackId,trackType, listOrder){

	if(trackType=="ord"){
		trackType="order no";
		trackById(trackId, listOrder);
	}
	else if(trackType=="phn"){
		trackType="mobile";
		trackByMobile(trackId, listOrder);
	}

	// var res=orders.filter((elem)=>{
	// 	if(elem[trackType]==trackId) return true;
	// 	return false;

	// });
	// return res;
}

function trackById(id, listOrder){
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({"orderId":id})
	};
			    
	fetch('http://localhost:5000/order/trackOrder/id', requestOptions)
	.then(response => response.json())
	.then(res =>{
		var orders=[]
		for(var r in res){
			orders.push({
				"order no":res[r].Id,
				"address":res[r].UserAddress,
				"mobile":res[r].UserMobile,
				"date":res[r].OrderDate+" "+res[r].OrderTime,
				"summary":extractSummary(res[r].ItemsOrdered),
				"amount":res[r].TotalBill,
				"payment status":res[r].PaymentStatus,
				"status":res[r].OrderStatus
			})
		}
		listOrder(orders);
	})
}

function trackByMobile(mobile, listOrder){
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({"mobile":mobile})
	};
			    
	fetch('http://localhost:5000/order/trackOrder/mobile', requestOptions)
	.then(response => response.json())
	.then(res =>{
		var orders=[]
		for(var r in res){
			orders.push({
				"order no":res[r].Id,
				"address":res[r].UserAddress,
				"mobile":res[r].UserMobile,
				"date":res[r].OrderDate+" "+res[r].OrderTime,
				"summary":extractSummary(res[r].ItemsOrdered),
				"amount":res[r].TotalBill,
				"payment status":res[r].PaymentStatus,
				"status":res[r].OrderStatus
			})
		}
		listOrder(orders);
	})
}

function extractSummary(input){
 	var fields = input.split('#');
    for (let i = 0; i < fields.length; i++) {
      fields[i]=fields[i].split('_');
    }
    var obj = {};
         
    for(var i = 0; i < fields.length; i++){
        obj[fields[i][0]] = fields[i][1];
    }
    var ans = [];
    for(let o in obj){
    	ans.push([getItemName(o), obj[o]]);
    }
    console.log(ans)
    return ans;
}

function getItemName(input){
	for(let i=0; i<Menu.length; i++){
		if(Menu[i].id == input){
			return Menu[i].name;
		}
	}
}



function find(trackId,trackType,listOrder,changeSearching){
	changeSearching(1);
	setTimeout(()=>{
	changeSearching(0);
	},5000);
	findOrder(trackId,trackType, listOrder);
}

function TrackOptions({changeTropt}){
	return (
	<div>
		<select name="toptions" id="toptions" onChange={(e)=>{changeTropt(e.target.value)}}>
		  <option value="ord">Track By OrderNo.</option>
		  <option value="phn">Track By PhoneNo.</option>
		</select>
	</div>
	);
}
function SearchButton({tropt,listOrder,changeSearching}){
	var value="";
	let plhold="Enter "
	if(tropt=="ord") plhold+="Order No.";
	else if(tropt=="phn") plhold+="Phone No."
	return (
	<div>
		<div class="d-flex">
        <input onChange={(e)=>{value=e.target.value}} class="form-control me-2" type="search" placeholder={plhold} aria-label="Search"/>
        <button class="btn btn-outline-success"  onClick={()=>{find(value,tropt,listOrder,changeSearching)}}>Search</button>
      	</div>
	</div>
	);
}
function ShowOrders({orders,searching}){
	if(searching==1){
		return <div id="spinner">
		<div class="spinner-border" role="status">
		  <span class="visually-hidden">Loading...</span>
		</div>
		</div>
	}
	if(orders.length==0)
		return(
	<div>
	    <div id="message-of-no-order">No such order here.........</div>
	</div>
	);
	return(
	<div>
	{
		orders.map((order)=>{
			return <div>
		<h1>Order No : <span style={{"color":"red"}}>{order["order no"]}</span></h1>
		<h5>Date : <span style={{"color":"red"}}>{order.date}</span></h5>
		<h5>Address : <span style={{"color":"red"}}>{order.address}</span></h5>
		<h5>Mobile : <span style={{"color":"red"}}>{order.mobile}</span></h5>
		<h5 style={{"display":"grid","grid-template-columns":"15% 70%"}}><div>Summary :</div> <span style={{"color":"red"}}>
						<table>
						{
							order.summary.map((ord)=>(
								<tr> 
									<td>{ord[0]}</td>
									<td>{ord[1]}</td>
								</tr>
							))
							
						}
						</table>
					  </span></h5>
		<h5>Amount : <span style={{"color":"red"}}>{order.amount}</span></h5>
		<h5>Payment status : <span style={{"color":"red"}}>{order["payment status"]}</span></h5>
		<h5>Status : <span style={{"color":"green"}}>{order.status}...</span></h5>
		<hr/>
		</div>
		})
		
	}
	</div>
	);
}
