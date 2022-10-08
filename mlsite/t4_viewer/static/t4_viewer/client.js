class Client {
	constructor() {
		this.name = "client1";
	}

	load_ction(name,load_action) {
		const oReq = new XMLHttpRequest();
		oReq.addEventListener("load",function () {
			const resp = this.responseText;
			load_action(resp);
		}
		);
		oReq.open("POST","http://127.0.0.1:9000/ction/get/");
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

	save_ction(name,cdict,load_func) {
		var xhr = new XMLHttpRequest();
		const oReq = new XMLHttpRequest();
		const obj = {'name': name, 'dictionary':cdict}
		const blob = new Blob([JSON.stringify(obj,null,2)],{type:'application/json'});
		oReq.addEventListener("load", function (){
			const response = this.responseText;
			load_func(response);
		}
		); 
		oReq.open("POST","http://127.0.0.1:9000/ction/add/");
		oReq.setRequestHeader("Content-Type","application/json");
		oReq.send(blob);
	}

	get_company_metadata(elem_id,elem_fun){
		const oReq = new XMLHttpRequest();
		const obj = {'company': "BANK OF AMERICA, NATIONAL ASSOCIATION"}
		const blob = new Blob([JSON.stringify(obj,null,2)],{type:'application/json'});
		oReq.addEventListener("load", elem_fun); 
		oReq.open("POST","http://127.0.0.1:9000/data/company_md");
		oReq.setRequestHeader("Content-Type","application/json");
		oReq.send(blob);
	}
	
	process_company_dataform(company,dataform,task_fun,task_id){
		const oReq = new XMLHttpRequest();
		const obj = {'company':company,'dataform':dataform};
		console.log("proccess dataform");
		console.log(task_id);
		oReq.addEventListener("load",function () {
			console.log("fun");
			console.log(task_id);
			const response = this.responseText;
			console.log(response);
			task_fun(response,task_id);
		},false);
		const blob = new Blob([JSON.stringify(obj,null,2)],{type:'application/json'})
		oReq.open("POST","http://127.0.0.1:9000/data/company/dataform/process")
		oReq.setRequestHeader("Content-Type","application/json");
		oReq.send(blob);

	}
	
	company_process_status(company,dataform,status_fun,task_id){
		const oReq = new XMLHttpRequest();
		const obj = {'company':company,'dataform':dataform};

		oReq.addEventListener("load",function () {
			status_fun(this.responseText,task_id);
		},false);
		const blob = new Blob([JSON.stringify(obj,null,2)],{type:'application/json'})
		oReq.open("POST","http://127.0.0.1:9000/data/company/dataform/process/get")
		oReq.setRequestHeader("Content-Type","application/json");
		oReq.send(blob);
	}

	freq_query(ction,dataform,key,query_fun){
		const oReq = new XMLHttpRequest();
		const obj = {"ction":ction,"dataform":dataform,"key":key};
		oReq.addEventListener("load",function () { 
			const response = this.responseText;
			query_fun(response);
		},false);
		const blob = new Blob([JSON.stringify(obj,null,2)],{type:'application/json'})
		oReq.open("POST","http://127.0.0.1:9000/data/ction/dataform/freq/query2")
		oReq.setRequestHeader("Content-Type","application/json");
		oReq.send(blob);
	}

	save_list(dataform,name,terms,load_func){
		var xhr = new XMLHttpRequest();
		const oReq = new XMLHttpRequest();
		const obj = {'dataform': dataform,'name': name, 'terms': terms};
		oReq.addEventListener("load",function () {
			const response = this.responseText;
			load_func(response);
		},false);
		const blob = new Blob([JSON.stringify(obj,null,2)],{type:'application/json'}) ;
		console.log(obj);
		oReq.open("POST","http://127.0.0.1:9000/termlist/add/");
		oReq.setRequestHeader("Content-Type","application/json")
		oReq.send(blob);
	}

	get_list(dataform,name,load_func){
		var xhr = new XMLHttpRequest();
		const oReq = new XMLHttpRequest();
		const obj = {'dataform': dataform, "name": name};
		console.log(obj);
		oReq.addEventListener("load",function () {
			const response = this.responseText;
			load_func(response);
		},false);
		const blob = new Blob([JSON.stringify(obj,null,2)],{type:'application/json'});
		oReq.open("POST","http://127.0.0.1:9000/termlist/get/");
		oReq.setRequestHeader("Content-Type","application/json")
		oReq.send(blob);
	}

	get_datatree(company,load_func){
		var xhr = new XMLHttpRequest();
		const oReq = new XMLHttpRequest();
		const obj = {'name': company};
		oReq.addEventListener("load",function () {
			const response = this.responseText;
			load_func(response);
		},false);
		const blob = new Blob([JSON.stringify(obj,null,2)],{type:'application/json'});
		oReq.open("POST","http://127.0.0.1:9000/data/company/tree");
		oReq.setRequestHeader("Content-Type","application/json")
		oReq.send(blob);
	}

	get_companies(load_func){
		var xhr = new XMLHttpRequest();
		const oReq = new XMLHttpRequest();
		oReq.addEventListener("load",function () {
			const response = this.responseText;
			load_func(response);
		},false);
		oReq.open("GET","http://127.0.0.1:9000/data/company/get_all");
		oReq.setRequestHeader("Content-Type","application/json")
		oReq.send();

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

*/
}
