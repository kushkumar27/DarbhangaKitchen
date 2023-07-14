const niceInvoice=require("nice-invoice")
const sqlConnector = require("../database/databaseConnector")
const nodemailer = require('nodemailer')

function generateInvoice(orderId, res){

  sqlConnector.query("select * from OrderTable where Id = "+orderId, (err, results)=>{
     const order = results[0];
     const itemsOrdered = splitItems(order.ItemsOrdered)

     var itemIds = [];
     for(var i in itemsOrdered){
        itemIds.push(i);
     }
     var itemList = {};
     const query = "SELECT * FROM Items WHERE Id in ("+itemIds.toString()+")";
     sqlConnector.query(query, (err, results)=>{
         generateInvoiceDetails(order, results, itemsOrdered)
         res.send("Succeeded");
     })
     
  })
  
}

function generateInvoiceDetails(order, items, itemsOrdered){
  
  const itemsInInvoice = myFunc(itemsOrdered, items)
  const invoiceDetail = {
      shipping: {
        name: order.UserName,
        address: order.UserAddress,
        country: "INDIA",
      },
      items: itemsInInvoice,
      subtotal: order.TotalBill,
      total: order.TotalBill,
      order_number: order.Id,
      header:{
          company_name: "Darbhanga Kitchen",
          company_logo: "kohli.png",
          company_address: "Bengali Tola"
      },
      footer:{
        text: "Copyright"
      },
      currency_symbol:"Rs",
      date: {
        billing_date: order.orderDate,
      }
    };

    niceInvoice(invoiceDetail,"your_invoice.pdf");
    sendInvoice(order.UserMail);
}

function splitItems(input){
  var fields = input.split('#');
    for (let i = 0; i < fields.length; i++) {
      fields[i]=fields[i].split('_');
    }
    var obj = {};
         
    for(var i = 0; i < fields.length; i++){
        obj[fields[i][0]] = parseInt(fields[i][1]);
    }
    return obj;
}

function sendInvoice(email) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "devnotabhi24@gmail.com",
            pass: "ndqwxvtyiiyilegk"
        }
    })
    var mailOptions = {
        from: 'devnotabhi24@gmail.com',
        to: email,
        subject: "Darbhanga Kitchen: Invoice",
        attachments: [
        {
          filename: "your_invoice.pdf",
          contentType: "application/pdf",
          path: "your_invoice.pdf"
        }]
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log("Successfully sent invoice to user")
    })

}



function myFunc(order,items){
    res=[]
    for (const ord in order) {
        id=ord;
        quan=order[ord];
        for(let i=0;i<items.length;i++){
           
            if(items[i].Id==id){
                obj={};
                obj["item"]=items[i].Name;
                obj["quantity"]=quan;
                obj["price"]=items[i].Cost;
                obj["tax"]="16%";
                res.push(obj);
            }
        }
    }
    return(res);
}
module.exports = generateInvoice;