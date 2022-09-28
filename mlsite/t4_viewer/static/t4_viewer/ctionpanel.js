class CtionPanel {
	constructor(div_id,name,client) {
		this.div_id = div_id;
		this.name = name;
		this.client = client;
		this.id_dict = {};
		this.cls_dict = {};
		this.elem_count = 0;
		this.ction = null;
	
}

	build(){
		const div = document.getElementById(this.div_id);
		const div_load = document.createElement("div");
		this.elem_count = this.elem_count + 1;
		this.id_dict["load_panel"] = this.div_id + "." + this.elem_count.to_string();
		div_load.setAttribute("id",this.id_dict["load_panel"]);
		div.appendChild(div_load);
		const load_func = this.name + ".load_ction()";
		this.elem_count = this.elem_count + 1;
		this.id_dict["sel_cls"] = this.div_id + "." + this.elem_count.to_string();
		const sel_cls = document.createElement("select");
		sel_cls.setAttribute("id",this.id_dict["sel_cls"]);
	}


	load_ction(){
		const name = this.cls_dict["load_panel"].get_input();
		const obj = this;
		const load_func = function (resp){
			const response = JSON.parse(resp);
			obj.handle_load(response);
		}
		client.load_ction(name,load_func);
	}

	handle_load(response){
		console.log(response);
		this.ction = response["ction"];
		const classes = Object.keys(this.ction);
		const sel_cls = document.getElementById(this.id_dict["sel_cls"]);
		for (var i = 0; i< classes.length; i++){
			const opt_cls = document.createElement("option");
			opt_cls.setAttribute("id",classes[i]);
			opt_cls.innerHTML = classes[i];
			sel_cls.appendChild(opt_cls);
		}
	}

	get_companies(){
		const obj = this;
		const load_func = function (resp){
			const response = JSON.parse(resp);
			obj.display_companies(response);
		}
		client.get_companies();
	}


	display_companies(response){
		const div_load = document.getElementById(thid.id_dict["load_panel"]);
		const label = document.createElement("label");
		const cmp_list = document.createElement("select");
		this.elem_count = this.elem_count + 1;
		id_dict["cmp_list"] = this.div_id + "." + this.elem_count.to_string();
		for (var i = 0; i<response["companies"]; i++){
			const opt_cmp = document.createElement("option");
			opt_cmp.setAttribute("id",response["companies"][i]);
			opt_cmp.innerHTML = response["companies"][i];
			cmp_list.appendChild(opt_cmp);
		}
	}
}
