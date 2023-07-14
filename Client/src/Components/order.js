import Menu from './Menu.js';
import React from 'react';

class Order {
	constructor(){
		this.order={};
		for(let i=0;i<Menu.length;i++){
			this.order[Menu[i].id]=0;
		}
	}
	show(){
		console.log(this.order);
	}
}

var NewOrder=new Order();
export default NewOrder;