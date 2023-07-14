import React from 'react';
import SearchMenu from "../SearchMenu/SearchMenu.js";
import ViewThali from "../ViewThali/ViewThali.js";
import MenuItem from "../Menu/Menu.js";

import "./styles.css";
export default class Lunch extends React.Component{
	constructor(props){
		super(props);
		this.state={
			"type":"none",
			"search":"none"
		}
		this.changeState=this.changeState.bind(this);
	}
	changeState(type,search){
		this.setState((state,props)=>{
				return {"type":type,"search":search};
		});
	}
	render(){
		
		return(
			<div className="container">
				<SearchMenu tag="lunch" className="search-toogle" changeState={this.changeState}/>
				<MenuItem tag="lunch" type={this.state.type} search={this.state.search}/>
				<ViewThali/>
			</div>
		);
	}
}