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
		const options = ["1-list","2-list"];
		const sel_func = this.name + ".select_mode()";
		this.panel_dict["options_panel"].add_component("sel_mode",new SelectBox(options));
		this.panel_dict["options_panel"].cls_dict["sel_mode"].setFunc(sel_func);
	}

	build_load(){
		const load_func = this.name + ".load_ction()";
		this.panel_dict["load_panel"].reset();
		this.panel_dict["load_panel"].add_component("input",new InputPanel("Load Ction:",load_func));
	}

	build_1list(){
		this.build_load();
		var cls_panel = this.panel_dict["cls_panel"];
		cls_panel.add_panel("clist_panel");
		var clist_panel = cls_panel.panel_dict["clist_panel"];

		clist_panel.add_panel("clist1-1_panel");
		this.build_clist("1-1");
	}

	build_2list(){
		this.build_load();
		var cls_panel = this.panel_dict["cls_panel"];
		cls_panel.add_panel("clist_panel");
		var clist_panel = cls_panel.panel_dict["clist_panel"];
		clist_panel.div.setAttribute("style","display:flex");
		clist_panel.add_panel("clist1-2_panel");
		clist_panel.add_panel("clist2-2_panel");
		this.build_clist("1-2");
		this.build_clist("2-2");
	}

	build_clist(part_num){
		const clist_panel_id = "clist"+part_num+"_panel";
		const sel_cls_id = "sel_cls" + part_num;
		const list_box_id = "list_box" + part_num;
		var cls_panel = this.panel_dict["cls_panel"];
		var clist_panel = cls_panel.panel_dict["clist_panel"];

		var clistX_panel = clist_panel.panel_dict[clist_panel_id];
		clistX_panel.add_component(sel_cls_id,new SelectBox([]));
		const sel_func = this.name + ".select_cls('"+part_num+"')";
		clistX_panel.cls_dict[sel_cls_id].setFunc(sel_func)
		clistX_panel.add_component(list_box_id,new ListBox(10,x => x));
	}


	build_save_panel(){
		var cls_panel = this.panel_dict["cls_panel"]
		const save_func = this.name + ".save_ction()";
		cls_panel.add_component("save_panel",new InputPanel("Save",save_func));
	}
	
	select_mode(){
		const mode = this.panel_dict["options_panel"].cls_dict["sel_mode"].getSelected();
		this.panel_dict["cls_panel"].reset();
		const cls_panel = this.panel_dict["cls_panel"];
		cls_panel.add_panel("add_panel");
		var add_panel = cls_panel.panel_dict["add_panel"];
		const add_func = this.name + ".add_cls()";

		add_panel.add_component("add_cls",new InputPanel2("add",add_func));

		if (mode == "1-list"){
			this.build_1list();
		}
		else if (mode == "2-list"){
			this.build_2list();
		}
		this.build_save_panel();
	
	}

	load_ction(){
		const name = this.panel_dict["load_panel"].cls_dict["input"].getInput();
		console.log(`load_ction: ${name} `);
		const obj = this;
		const load_func = function (resp){
			console.log(resp);
			const response = JSON.parse(resp);
			obj.handle_load(response);
		}
		this.client.load_ction(name,load_func);
	}

	handle_load(response){
		const options_panel = this.panel_dict["options_panel"];
		const mode = options_panel.cls_dict["sel_mode"].getSelected();

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
			const cls_panel = this.panel_dict["cls_panel"];

			var clist_panel = cls_panel.panel_dict["clist_panel"];
			const clist_id = 'clist1-1_panel';
			const clistX_panel = clist_panel.panel_dict[clist_id];
			const sel_cls = clistX_panel.cls_dict["sel_cls1-1"];
			sel_cls.removeOptions();
			sel_cls.addOption("","select");
			for (var i = 0; i< classes.length; i++){
				sel_cls.addOption(classes[i],classes[i]);
			}
		}
		else if (mode == "2-list"){
			const cls_panel = this.panel_dict["cls_panel"];
			var clist_panel = cls_panel.panel_dict["clist_panel"];

			const clist1_id = 'clist1-2_panel';
			const clist1_panel = clist_panel.panel_dict[clist1_id];
			const sel_cls_1 = clist1_panel.cls_dict["sel_cls1-2"];

			const list_box_1 = clist1_panel.cls_dict["list_box1-2"];
			const clist2_id = 'clist2-2_panel';
			const clist2_panel = clist_panel.panel_dict[clist2_id];
			const sel_cls_2 = clist2_panel.cls_dict["sel_cls2-2"];
			const list_box_2 = clist2_panel.cls_dict["list_box2-2"];

			const obj = this;
			sel_cls_1.removeOptions();
			sel_cls_2.removeOptions();
			sel_cls_1.addOption("","select");
			sel_cls_2.addOption("","select");
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
		const cls_panel = this.panel_dict["cls_panel"];
		const name = cls_panel.cls_dict["save_panel"].getInput();
		const obj = this;
		const load_func = function (response){
			const resp = JSON.parse(response);
			obj.handle_save(resp);
		}
		var ction = {};
		const classes = Object.keys(this.ction);
		for (var i = 0; i<classes.length; i++){
			const cls_vec_strs = Array.from(this.ction[classes[i]])
			ction[classes[i]] = [];
			for (var j = 0; j<cls_vec_strs.length; j++){
				ction[classes[i]][ction[classes[i]].length] = cls_vec_strs[j].split('__');
			}
		}
		client.save_ction(name,ction,load_func);
	}

	handle_save(response){
		alert(response);
	}

	add_cls(){
		const cls_panel = this.panel_dict["cls_panel"];
		const add_panel = cls_panel.panel_dict["add_panel"];
		const options_panel = this.panel_dict["options_panel"];
		const mode = options_panel.cls_dict["sel_mode"].getSelected();
		const cls = add_panel.cls_dict["add_cls"].getInput();
		var clist_panel = cls_panel.panel_dict["clist_panel"];

		this.ction[cls] = new Set();
		if (mode == "1-list"){
			const clistX_panel = clist_panel.panel_dict["clist1-1_panel"];
			const sel_cls = clist_panel.cls_dict["sel_cls1-1"];
			

			sel_cls.addOption(cls,cls);
		}
		else if (mode == "2-list"){
			const clist1_panel = clist_panel.panel_dict["clist1-2_panel"];
			const sel1_cls = clist1_panel.cls_dict["sel_cls1-2"];
			const clist2_panel = clist_panel.panel_dict["clist2-2_panel"];
			const sel2_cls = clist2_panel.cls_dict["sel_cls2-2"];
			sel1_cls.addOption(cls,cls);
			sel2_cls.addOption(cls,cls);


		}
	}

	select_cls(part_num){
		const cls_panel = this.panel_dict["cls_panel"];
		const clist_id = "clist"+part_num+"_panel";

		var clist_panel = cls_panel.panel_dict["clist_panel"];

		const clistX_panel = clist_panel.panel_dict[clist_id];
		const sel_id = "sel_cls" + part_num;
		const list_id = "list_box" + part_num;
		const cls = clistX_panel.cls_dict[sel_id].getSelected();
		const vec_ls = Array.from(this.ction[cls]);
		clistX_panel.cls_dict[list_id].removeItems();
		for (var i = 0; i<vec_ls.length; i++){
			clistX_panel.cls_dict[list_id].addItem(vec_ls[i]);
		}
	}

	add_vec(vec){
		const options_panel = this.panel_dict["options_panel"];
		const mode = options_panel.cls_dict["sel_mode"].getSelected();
		var part_num = null;

		if (mode == "1-list"){
			part_num = "1-1";
		}
		else if (mode == "2-list"){
			part_num = "1-2";
		}
		const clist_id = "clist"+part_num+"_panel";
		const cls_panel = this.panel_dict["cls_panel"];
		var clist_panel = cls_panel.panel_dict["clist_panel"];
		const clistX_panel = clist_panel.panel_dict[clist_id];

		const sel_cls = clistX_panel.cls_dict["sel_cls"+part_num];
		const cls = sel_cls.getSelected();
		const vec_str = vec.join("__");
		if (cls in this.ction){
			if (!this.ction[cls].has(vec_str)){
				clistX_panel.cls_dict["list_box"+part_num].addItem(vec_str)
			}
		}
		else{
			alert("no class selected");
		}
	}
}
