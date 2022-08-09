
class Client {

	constructor() {
		this.name = "client1";
	}

	load_ction(elem_id,load_action) {
		console.log("load_ction");
		console.log(this.name);
		console.log(this.ction);
		name = document.getElementById(elem_id).value;
		const oReq = new XMLHttpRequest();
		oReq.addEventListener("load",load_action);
		oReq.open("POST","http://127.0.0.1:9000/ction/get/")
		const obj  = {"name":name};
		const blob = new Blob([JSON.stringify(obj,null,2)],{type:'application/json'});
		oReq.setRequestHeader("Content-Type","application/json");
		oReq.send(blob);
	}
	
	ction_listener(){
		console.log("ction listener");
		this.ction = JSON.parse(this.responseText);
		console.log(this.responseText);
		console.log(this.load_actions);
		if ("ction" in this.load_actions) {
			this.load_actions["ction"]();
		}
	}

	save_ction(elem_id,cdict) {
		var input = document.getElementById(elem_id);
		var xhr = new XMLHttpRequest();
		const oReq = new XMLHttpRequest();
		const obj = {'name': input.value, 'dictionary':cdict}
		const blob = new Blob([JSON.stringify(obj,null,2)],{type:'application/json'});
//		oReq.addEventListener("load", reqListener); 
		oReq.open("POST","http://127.0.0.1:9000/ction/add/");
		oReq.setRequestHeader("Content-Type","application/json");
		oReq.send(blob);
	}
/*
	load_list(div_id){
		name = document.getElementById("elem_id").value;
		oReq = new XMLHttpRequest();
		oReq.addEventListener("load",list_listener);
		oReq.open("POST","http://127.0.0.1:9000/ction/get/")
		obj  = {"name":name}
		blob = new Blob([JSON.stringify(obj,null,2)],{type:'application/json'});
		oReq.setRequestHeader("Content-Type","application/json");
		oReq.send(blob);
	}

	list_listener(){
		console.log(this.responseText);
		const obj = JSON.parse(this.responseText);
		elem = document.getElementById('c_select');
		console.log(obj);
		cdict = obj['ction'];
		console.log(cdict);
		keys = Object.keys(cdict);
		elem.innerHTML = "";
		for ( var i = 0; i<keys.length; i++){
			const option = document.createElement("option");
			option.setAttribute('id',keys[i]);
			option.innerHTML = keys[i];
			elem.appendChild(option);
		}

	}

	save_list(){
		var xhr = new XMLHttpRequest();
		const oReq = new XMLHttpRequest();
		name = document.getElementById("list_name").value;
		const obj = {'name': name, 'terms': terms};
		const blob = new Blob([JSON.stringify(obj,null,2)],{type:'application/json'}) 
		oReq.open("POST","http://127.0.0.1:9000/termlist/add/");
		oReq.setRequestHeader("Content-Type","application/json")
		oReq.send(blob);
	}
*/
}
