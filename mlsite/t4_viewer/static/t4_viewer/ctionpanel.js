class CtionPanel extends Panel{
	constructor(div_id,name,client) {
		super(div_id);
		this.div_id = div_id;
		this.name = name;
		this.client = client;
		this.ction = {};
}

	build(){
		const div = document.getElementById(this.div_id);
		const div_load = document.createElement("div");
		const div_cls_panel = document.createElement("div");
		const div_opt_panel = document.createElement("div");
		this.add_id("load_panel");
		this.add_id("options_panel");
		this.add_id("cls_panel");
		div.appendChild(div_opt_panel);
		div.appendChild(div_load);
		div.appendChild(div_cls_panel);
		div_cls_panel.setAttribute('id',this.id_dict["cls_panel"]);
		div_opt_panel.setAttribute('id',this.id_dict["options_panel"]);
		div_load.setAttribute("id",this.id_dict["load_panel"]);
		const ids = ["div_clist","div_list","sel_cls","add_inp"];
		for (var i = 0; i<ids.length; i++){
			this.add_id(ids[i]+"1-1");
			this.add_id(ids[i]+"1-2");
			this.add_id(ids[i]+"2-2");
		}
		const options = ["1-list","2-list"];
		const sel_func = this.name + ".select_mode()";
		this.cls_dict["sel_mode"] = new SelectBox(this.id_dict["options_panel"],options,sel_func);
		this.cls_dict["sel_mode"].setFunc(sel_func);
		this.cls_dict["sel_mode"].build();
	}

	build_load(){
		const div = document.getElementById(this.id_dict["load_panel"]);
		div.innerHTML = "";
		const load_func = this.name + ".load_ction()";
		this.cls_dict["load_panel"] = new InputPanel(this.id_dict["load_panel"],"Load Ction:",load_func);
	}

	build_1list(){
		this.build_load();
		const div = document.getElementById(this.id_dict["cls_panel"]);
		const div_sel = document.createElement("div");
		div_sel.setAttribute("id",this.id_dict["sel_cls1-1"]);
		div.innerHTML = "";
		div.setAttribute("style","");
		const div_clist = document.createElement("div");
		div_clist.setAttribute("id",this.id_dict["div_clist1-1"]);
		div_clist.appendChild(div_sel);
		div.appendChild(div_clist);
		this.build_clist("1-1");
	}

	build_2list(){
		this.build_load();
		const div = document.getElementById(this.id_dict["cls_panel"]);
		div.innerHTML = "";
		div.setAttribute("style","display: flex");
		const div_sel_1 = document.createElement("div");
		div_sel_1.setAttribute("id",this.id_dict["sel_cls1-2"]);
		const div_sel_2 = document.createElement("div");
		div_sel_2.setAttribute("id",this.id_dict["sel_cls2-2"]);
		const div_clist1 = document.createElement("div");
		div_clist1.setAttribute("id",this.id_dict["div_clist1-2"]);
		div_clist1.setAttribute("style","display: inline:block");
		div_clist1.appendChild(div_sel_1);
		div.appendChild(div_clist1);
		this.build_clist("1-2");
		const div_clist2 = document.createElement("div");
		div_clist2.setAttribute("id",this.id_dict["div_clist2-2"]);
		div_clist2.setAttribute("style","display: inline:block");
		div_clist2.appendChild(div_sel_2);
		div.appendChild(div_clist2);
		this.build_clist("2-2");
	}

	build_clist(part_num){
		const div_cls_id = "div_clist" + part_num;
		const div_sel_id = "sel_cls" + part_num;
		const div_ls_id = "div_list" + part_num;
		const add_inp_id = "add_inp" + part_num;
		const list_box_id = "list_box" + part_num;

		const div_add = document.createElement("div");
		const div_list = document.createElement("div");
		const add_input = document.createElement("input");
		const sel_func = this.name + ".select_cls('"+part_num+"')";
		this.cls_dict[div_sel_id] = new SelectBox(this.id_dict[div_sel_id],[],sel_func);
		this.cls_dict[div_sel_id].build();
		const add_btn = document.createElement("button");
		const div_clist = document.getElementById(this.id_dict[div_cls_id]);
		const add_func = this.name + ".add_cls()";
		add_input.setAttribute("id",this.id_dict[div_cls_id]);
		add_input.setAttribute("id",this.id_dict[add_inp_id]);
		div_list.setAttribute("id",this.id_dict[div_ls_id]);
		add_btn.setAttribute("onclick",add_func);
		add_btn.innerHTML = "Add";
		div_clist.appendChild(div_add);
		div_add.appendChild(add_btn);
		div_add.appendChild(add_input);
		div_clist.appendChild(div_list);
		this.cls_dict[list_box_id] = new ListBox(this.id_dict[div_ls_id],10,x => x);
	}


	build_save_panel(){
		const save_func = this.name + ".save_ction()";
		this.add_id('save_panel');
		const div_save = document.createElement("div");
		div_save.setAttribute("id",this.id_dict["save_panel"]);
		div.appendChild(div_save);
		this.cls_dict["save_panel"] = new InputPanel(this.id_dict["save_panel"],"Save",save_func);
	}
	
	select_mode(){
		const div = document.getElementById(this.id_dict["cls_panel"]);
		div.innerHTML = ""
		const mode = this.cls_dict["sel_mode"].getSelected();
		console.log(mode);
		if (mode == "1-list"){
			this.build_1list();
		}
		else if (mode == "2-list"){
			this.build_2list();
		}
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
