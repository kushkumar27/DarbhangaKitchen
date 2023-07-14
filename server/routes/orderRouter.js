const express = require('express');
const router = express.Router()
const sqlConnector = require("../utils/database/databaseConnector")
const generateInvoice = require("../utils/invoice/invoiceGenerator")

const TAX = 16;

router.post("/saveOrder", (req, res, next)=>{

	try{
		var orderData = req.body;

		var {userName, userMail, userMobile, userAddress, orderItems} = orderData;

		const date = new Date();
		const id = date.getTime();
		const orderDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
		const orderTime = date.getHours()+":"+date.getMinutes();
		const paymentStatus = "NOT_PAID";
		const orderStatus = "Initiated";

		var itemsOrdered = "";
		for(var itemId in orderItems){
			itemsOrdered += itemId+"_"+(orderItems[itemId])+'#';
		}

		itemsOrdered = itemsOrdered.slice(0, -1);
		var dataItem = {
			id, orderTime, orderDate, paymentStatus, orderStatus, userName, userMail, userMobile, userAddress, itemsOrdered
		}
		queryCost(orderItems, dataItem, res)
	}catch(excep){
		res.send("Failed")
	}

})

router.post("/updateOrder", (req, res, next)=>{
	const orderId = req.body.orderId;
	const status = req.body.status;

	sqlConnector.query("update OrderTable set OrderStatus = '"+status+"' where Id = "+orderId, (err, results)=>{
		if(err){
			console.log(err);
			return err;
		} 
		if(status == "Delievered"){
			generateInvoice(orderId, res)
		}else{
			res.send("Succeeded")
		}
	})
})

router.post("/trackOrder/id", (req, res, next)=>{
	const orderId = req.body.orderId;

	sqlConnector.query("select * from OrderTable where Id = "+orderId, (err, results)=>{
		if(err){
			console.log(err);
			return err;
		} 
		res.header("Access-Control-Allow-Origin", "*");
		res.json(results);
	})
})

router.post("/trackOrder/mobile", (req, res, next)=>{
	const mobile = req.body.mobile;

	sqlConnector.query("select * from OrderTable where userMobile = "+mobile, (err, results)=>{
		if(err){
			console.log(err);
			return err;
		} 
		res.header("Access-Control-Allow-Origin", "*");
		res.json(results);
	})
})

function queryCost(orderItems, dataItem, res){
	var ids = []
	for (var orderId in orderItems){
		ids.push(orderId)
	}
	const query = "SELECT Cost,Id FROM Items WHERE Id in ("+ids.toString()+")";
	console.log(query)
	var totalCost = 0;
	sqlConnector.query(query, (err, results)=>{
		if(err) res.send("Failed : "+err)

		var costList = {}
		for(var i=0; i<results.length; i++){

			costList[results[i].Id] = results[i].Cost
		}

		for (var orderId in orderItems){
			totalCost += costList[orderId]*orderItems[orderId]
		}
		const totalBill = totalCost*(100+TAX)/100;

		const query2 = "insert into OrderTable values ('"+dataItem.id+"','"+
			dataItem.userAddress+"','"+dataItem.userName+"','"+dataItem.userMail
			+"','"+dataItem.userMobile+"','"+dataItem.orderDate+"','"+dataItem.orderTime
			+"','"+dataItem.itemsOrdered+"','"+dataItem.paymentStatus+"','"+dataItem.orderStatus
			+"','"+TAX+"','"+totalBill+"')"


		sqlConnector.query(query2, (err, results)=>{
			if(err) res.send("Failed : "+err);
			console.log("Order saved")
			generateInvoice(dataItem.id, res)
			//res.send("Succeeded")

		})	
	})
}




module.exports = router;