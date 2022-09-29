class CtionPanel extends Panel{
	constructor(div_id,name,client) {
		super();
		this.div_id = div_id;
		this.name = name;
		this.client = client;
		this.ction = null;
}

	build(){
		const div = document.getElementById(this.div_id);
		const div_load = document.createElement("div");
		this.add_id("load_panel");
		div_load.setAttribute("id",this.id_dict["load_panel"]);
		div.appendChild(div_load);
		const load_func = this.name + ".load_ction()";
		this.cls_dict["load_panel"] = new InputPanel(this.id_dict["load_panel"],"Load Ction:",load_func);
		const div_add = document.createElement("div");
		const add_input = document.createElement("input");
		const add_func = this.name + ".add_cls()";
		this.add_id("add_input");
		add_input.setAttribute("id",this.id_dict["add_input"]);
		const add_btn = document.createElement("button");
		add_btn.innerHTML = "Add";
		add_btn.setAttribute("onclick",add_func);
		div_add.appendChild(add_btn);
		div_add.appendChild(add_input);
		div.appendChild(div_add);
		this.add_id("sel_cls");
		const sel_cls = document.createElement("select");
		const sel_func = this.name + ".select_cls()";
		sel_cls.setAttribute("id",this.id_dict["sel_cls"]);
		sel_cls.setAttribute("onchange",sel_func);
		div.appendChild(sel_cls);
		this.add_id("div_list");
		const div_list = document.createElement("div");
		div_list.setAttribute("id",this.id_dict["div_list"]);
		div.appendChild(div_list);
		this.cls_dict["list_box"] = new ListBox(this.id_dict["div_list"],10,x => x);
		const save_func = this.name + ".save_ction()";
		this.add_id('save_panel');
		const div_save = document.createElement("div");
		div_save.setAttribute("id",this.id_dict["save_panel"]);
		div.appendChild(div_save);
		this.cls_dict["save_panel"] = new InputPanel(this.id_dict["save_panel"],"Save",save_func);
	}

	load_ction(){
		const name = this.cls_dict["load_panel"].getInput();
		const obj = this;
		const load_func = function (resp){
			console.log(resp);
			const response = JSON.parse(resp);
			obj.handle_load(response);
		}
		this.client.load_ction(name,load_func);
	}

	handle_load(response){
		console.log(response);
		this.ction = response["ction"];
		const classes = Object.keys(this.ction);
		const sel_func = this.name + ".select_class()";
		const sel_cls = document.getElementById(this.id_dict["sel_cls"]);
		const opt_def = document.createElement("option");
		opt_def.setAttribute("value","");
		opt_def.innerHTML = "select class";
		sel_cls.appendChild(opt_def);
		for (var i = 0; i< classes.length; i++){
			const opt_cls = document.createElement("option");
			opt_cls.setAttribute("value",classes[i]);
			opt_cls.innerHTML = classes[i];
			sel_cls.appendChild(opt_cls);
		}
	}
	
	save_ction(){
		const name = this.cls_dict["save_panel"].getInput()
		const obj = this;
		const load_func = function (response){
			const resp = JSON.parse(response);
			obj.handle_save(resp);
		}
		client.save_ction(name,this.ction,load_func);
	}

	handle_save(response){
		alert(response);
	}

	add_cls(){
		console.log("here");
		const sel_cls = document.getElementById(this.id_dict["sel_cls"]);
		const cls = document.getElementById(this.id_dict["add_input"]).value;
		const opt = document.createElement("option");
		opt.setAttribute("value",cls);
		opt.innerHTML = cls;
		sel_cls.appendChild(opt);
		this.ction[cls] = [];
	}

	select_cls(){
		const sel_cls = document.getElementById(this.id_dict["sel_cls"]);
		const cls = sel_cls.options[sel_cls.selectedIndex].value;
		const vec_ls = this.ction[cls];
		this.cls_dict["list_box"].removeItems();
		for (var i = 0; i<vec_ls.length; i++){
			this.cls_dict["list_box"].addItem(vec_ls[i]);
		}
	}
}
