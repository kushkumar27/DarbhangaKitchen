import './styles.css';
import {Link} from 'react-router-dom';
import React,{useState} from 'react';


var tag;

export default function SearchMenu(props){
	tag=props.tag;
	const [searchItem,setSearchItem]=useState("empty");
	const [type,setType]=useState({
		"veg":false,
		"non-veg":false
	});
	function checkboxHandler(event){
		type[event.target.name]=event.target.checked;
		setType(type);
		console.log(type);
		if(type["veg"]==type["non-veg"]){
			props.changeState("none","none");
		}else if(type["veg"]==true){
			props.changeState("veg","none");
		}else{
			props.changeState("non-veg","none");
		}
	}
	function searchHandler(event){
		
		let t=document.getElementById("searchBar").value;
		props.changeState("none",t);
	}
	return(
		
		<div id="searchmenu">
			<div id='toogle'>
  				<div id="veg-checkbox"><input  type="checkbox" name="veg" onClick={(event)=>{checkboxHandler(event);}}/> Veg</div><span/><span/>
				<div id="nonveg-checkbox"><input  type="checkbox" name="non-veg" onClick={(event)=>{checkboxHandler(event);}}/> Non-Veg</div>
			</div>
			<div id='search'>
				<form class="d-flex">
        		<input id="searchBar" class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        		<input class="btn btn-outline-success" onClick={(event)=>{searchHandler(event);}} value="Search"/>
      			</form>
			</div>
			<Navbar tag={tag}/>
		</div>
		
	);
}

function Navbar(props){
	
	return(
			<div>
			<nav aria-label="Page navigation example">
			  <ul class="pagination">
			  	<Link to="/home" id="home" class="page-item"><a class="page-link" href="#">Home</a></Link>
			    <Link to="/toppicks" id="toppicks" class="page-item"><a class="page-link" href="#">Top Picks</a></Link>
			    <Link to="/northindian" id="northindian" class="page-item"><a class="page-link" href="#">North Indian</a></Link>
			    <Link to="/southindian" id="southindian" class="page-item"><a class="page-link" href="#">South Indian</a></Link>
			    <Link to="/breakfast" id="breakfast" class="page-item"><a class="page-link" href="#">Breakfast</a></Link>
			    <Link to="/lunch" id="lunch" class="page-item"><a class="page-link" href="#">Lunch</a></Link>
			    <Link to="/dinner" id="dinner" class="page-item"><a class="page-link" href="#">Dinner</a></Link>
			  </ul>
			</nav>
			
			</div>
		);
}

