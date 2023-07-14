import './styles.css'
import {Link} from 'react-router-dom';
import {useState} from 'react';
export function NewsLetter(){
	const [mail,setMail]=useState("");
	const [message,setMessage]=useState("Suscribe");
	function suscribe(event){

		if(verifyMail(mail)==false)
			alert("please enter a valid mail address");
		else{

			const requestOptions = {
		        method: 'POST',
		        headers: { 'Content-Type': 'application/json' },
		        body: JSON.stringify({ email:mail }) 
		    };
		    console.log(requestOptions);

		    fetch('http://localhost:5000/newsletter/generateotp', requestOptions)
		        .then(response => response.json())
		        .then(data => console.log(data));

			document.getElementById("my-btn").disabled = true;
			alert("An otp has been sent to your Email... : "+mail);
			var otp=prompt("Enter your otp : ");
			console.log(otp);
			setMessage("Processing");
			try{
				const requestOptions = {
			        method: 'POST',
			        headers: { 'Content-Type': 'application/json' },
			        body: JSON.stringify({ email:mail,otp:otp})
			    };
			    
			    fetch('http://localhost:5000/newsletter/verifyotp', requestOptions)
			    .then(response => response.json())
			    .then(res =>{
			    	console.log("verifying user");
			       	console.log(res);
					if(res.status==="SUCCESSFULL"){
						alert("You have subscribed to our NewsLetter");
						setMessage("Suscribed..");
					}
					else{
						setMessage("Suscribe");
						alert("Failed to verify otp...try again sorry")
						document.getElementById("my-btn").disabled = false;
					}
				});
					
			}catch(err){
				console.log(err);
			}
			
		}
	}
	function verifyOtp(otp){
		return new Promise((resolve,reject)=>{

			const requestOptions = {
		        method: 'POST',
		        headers: { 'Content-Type': 'application/json' },
		        body: JSON.stringify({ mail:mail,otp:otp})
		    };
		    fetch('http://localhost:8000/verifyUser', requestOptions)
		        .then(response => response.json())
		        .then(data => {
		        	console.log(data);
		        	resolve("true")
		        });
		});
		
	}
	const changeHandler=(event)=>{
		let p=event.target.value;
		setMail(p);

	}
	const verifyMail=(mail)=>{
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(filter.test(mail))
		return true;

		return false;
	}

	return(
		<div id='newsletter-box'>
			<div id='newsletter-head'>Suscribe to our NewsLetter</div>
			<div id='newsletter-phone'>
				Enter your Email: <input type="text" length="30" onChange={(event)=>{changeHandler(event)}}/>
			</div>
			<div id='newsletter-button'>
				<button id="my-btn" className="btn btn-primary" onClick={(event)=>{suscribe(event)}}>{message}</button>
			</div>
		</div>
	);
}