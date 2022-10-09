class CtionPanel extends PanelComponent{
	constructor(name,client) {
		super();
		this.name = name;
		this.client = client;
		this.ction = {};
}

	build_inner(){
		this.add_panel("options_panel");
		this.add_panel("load_panel");
		this.add_panel("cls_panel");
		const ids = ["clist","div_list","sel_cls","add_inp"];
		for (var i = 0; i<ids.length; i++){
			this.add_id(ids[i]+"1-1");
			this.add_id(ids[i]+"1-2");
			this.add_id(ids[i]+"2-2");
		}
		const options = ["1-list","2-list"];
		const sel_func = this.name + ".select_mode()";
		this.panel_dict["options_panel"].add_component("sel_mode",new SelectBox(options));
		this.panel_dict["options_panel"].cls_dict["sel_mode"].setFunc(sel_func);
	}

	build_load(){
		const load_func = this.name + ".load_ction()";
		this.panel_dict["load_panel"].add_component("input",new InputPanel("Load Ction:",load_func));
	}

	build_1list(){
		this.build_load();
		var cls_panel = this.panel_dict["cls_panel"];
		cls_panel.add_panel("clist1-1_panel");
		this.build_clist("1-1");
	}

	build_2list(){
		this.build_load();
		var cls_panel = this.panel_dict["cls_panel"];
		cls_panel.add_panel("clist1-2_panel");
		cls_panel.add_panel("clist2-2_panel");
		this.build_clist("1-2");
		this.build_clist("2-2");
	}

	build_clist(part_num){
		const clist_panel_id = "clist"+part_num+"_panel";
		const sel_cls_id = "sel_cls" + part_num;
		const list_box_id = "list_box" + part_num;
		var cls_panel = this.panel_dict["cls_panel"];
		var clist_panel = cls_panel.panel_dict[clist_panel_id];
		clist_panel.add_panel("add_panel");
		console.log(clist_panel);
		var add_panel = clist_panel.panel_dict["add_panel"];
		const add_input = document.createElement("input");
		const add_btn = document.createElement("button");
		const add_func = this.name + ".add_cls()";
		add_btn.setAttribute("onclick",add_func);
		add_btn.innerHTML = "Add";
		add_panel.div.appendChild(add_input);
		add_panel.div.appendChild(add_btn);
		clist_panel.add_component(sel_cls_id,new SelectBox([]));
		const sel_func = this.name + ".select_cls('"+part_num+"')";
		clist_panel.cls_dict[sel_cls_id].setFunc(sel_func)
		clist_panel.add_component(list_box_id,new ListBox(10,x => x));
	}


	build_save_panel(){
		var cls_panel = this.panel_dict["cls_panel"]
		const save_func = this.name + ".save_ction()";
		cls_panel.add_component("save_panel",new InputPanel("Save",save_func));
	}
	
	select_mode(){
		const mode = this.panel_dict["options_panel"].cls_dict["sel_mode"].getSelected();
		this.panel_dict["cls_panel"].reset();
		if (mode == "1-list"){
			this.build_1list();
		}
		else if (mode == "2-list"){
			this.build_2list();
		}
		this.build_save_panel();
	
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
		const mode = this.cls_dict["sel_mode"].getSelected();
		console.log(response);

		const classes = Object.keys(response["ction"]);
		for (var i = 0; i<classes.length; i++){
			const vec_list = response["ction"][classes[i]];
			this.ction[classes[i]] = new Set();
			for (var j = 0; j<vec_list.length; j++){
				const vec_str = vec_list[j].join("__");
				this.ction[classes[i]].add(vec_str);
			}
		}
		const sel_func = this.name + ".select_class()";
		if (mode == "1-list"){
			const sel_cls = this.cls_dict["sel_cls1-1"];
			sel_cls.removeOptions();
			const opt_def = document.createElement("option");
			opt_def.setAttribute("value","");
			for (var i = 0; i< classes.length; i++){
				sel_cls.addOption(classes[i],classes[i]);
			}
		}
		else if (mode == "2-list"){
			const sel_cls_1 = this.cls_dict["sel_cls1-2"];
			const sel_cls_2 = this.cls_dict["sel_cls2-2"];
			const list_box_1 = this.cls_dict["list_box1-2"];
			const list_box_2 = this.cls_dict["list_box2-2"];			
			const obj = this;
			sel_cls_1.removeOptions();
			sel_cls_2.removeOptions();
			const move_func_12 = function () {
				const cls1 = sel_cls_1.getSelected();
				const cls2 = sel_cls_2.getSelected();
				console.log(list_box_1);
				console.log(list_box_2);
				const value = list_box_1.getSelected();
				obj.ction[cls1].delete(value);
				obj.ction[cls2].add(value);
				list_box_1.removeItem(value);
				list_box_2.addItem(value);
			}

			const move_func_21 = function () {
				const cls1 = sel_cls_1.getSelected();
				const cls2 = sel_cls_2.getSelected();
				console.log(sel_cls_1);
				console.log(sel_cls_2);
				const value = list_box_2.getSelected();
				obj.ction[cls2].delete(value);
				obj.ction[cls1].add(value);
				list_box_2.removeItem(value);
				list_box_1.addItem(value);
			}

			list_box_1.addEventFunc("m",move_func_12);
			list_box_2.addEventFunc("m",move_func_21);
			for (var i = 0; i< classes.length; i++){
				sel_cls_1.addOption(classes[i],classes[i]);
			}
			for (var i = 0; i< classes.length; i++){
				sel_cls_2.addOption(classes[i],classes[i]);
			}
		}
	}

	load_ction1(){
	}

	load_ction2(){
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
		this.ction[cls] = new Set();
	}

	select_cls(part_num){
		const sel_id = "sel_cls" + part_num;
		const list_id = "list_box" + part_num;
		const cls = this.cls_dict[sel_id].getSelected();
		const vec_ls = Array.from(this.ction[cls]);
		this.cls_dict[list_id].removeItems();
		for (var i = 0; i<vec_ls.length; i++){
			this.cls_dict[list_id].addItem(vec_ls[i]);
		}
	}

	add_vec(vec){
		const mode = this.cls_dict["sel_mode"].getSelected();
		var part_num = null;

		if (mode == "1-list"){
			part_num = "1-1";
		}
		else if (mode == "2-list"){
			part_num = "1-2";
		}

		const sel_cls = this.cls_dict["sel_cls"+part_num];
		const cls = sel_cls.getSelected();
		const vec_str = vec.join("__");
		if (cls in this.ction){
			this.ction[cls].has(vec_str);
			this.cls_dict["list_box"+part_num].addItem(vec_str)

		}
		else{
			alert("no class selected");
		}
	}
}
