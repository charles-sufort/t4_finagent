class ListPanel extends PanelComponent{
	constructor(name,client,list_type) {
		super();
		this.name = name;
		this.client = client;
		this.list_type = list_type;
}

	build_inner(){
		this.add_panel("options_panel");
		this.add_panel("list_panel");
		const options = ["1-list","2-list"];
		const sel_func = this.name + ".select_mode()";
		this.panel_dict["options_panel"].add_component("sel_mode",new SelectBox(options));
		this.panel_dict["options_panel"].cls_dict["sel_mode"].setFunc(sel_func);
	}

	build_1list(){
		var list_panel = this.panel_dict["list_panel"];
		list_panel.add_panel("lists_panel");
		var lists_panel = list_panel.panel_dict["lists_panel"];
		lists_panel.add_panel("list1-1_panel");
		this.build_load("1-1");
		this.build_list("1-1");
		this.build_save("1-1");
	}

	build_2list(){
		this.build_load();
		var list_panel = this.panel_dict["list_panel"];
		list_panel.add_panel("lists_panel");
		var lists_panel = list_panel.panel_dict["lists_panel"];
		lists_panel.div.setAttribute("style","display:flex");
		lists_panel.add_panel("list1-2_panel");
		lists_panel.add_panel("list2-2_panel");
		this.build_load("1-2");
		this.build_list("1-2");
		this.build_save("1-2");
		this.build_load("2-2");
		this.build_list("2-2");
		this.build_save("2-2");
	}

	build_list(part_num){
		const list_panel_id = "list"+part_num+"_panel";
		var listX_panel = this.get_listX(part_num);
		listX_panel.add_component("listbox",new ListBox(10,x => x));
		const add_func = this.name + ".add_item('"+part_num+"')";
		listX_panel.add_component("add_panel",new InputPanel2("Add",add_func));
	}

	build_load(part_num){
		const list_panel_id = "list"+part_num+"_panel"; 
		var listX_panel = this.get_listX(part_num);
		const load_func = this.name + ".load_list('"+part_num+"')";
		const dataforms = ["ners","lemma","noun_chunks"];
		listX_panel.add_component("load_df",new SelectBox(dataforms));
		listX_panel.add_component("input",new InputPanel("Load:",load_func));
	}

	build_save(part_num){
		const list_panel_id = "list"+part_num+"_panel"; 
		var listX_panel = this.get_listX(part_num);
		const save_func = this.name + ".save_list('"+part_num+"')";

		const dataforms = ["ners","lemma","noun_chunks"];
		listX_panel.add_component("save_df",new SelectBox(dataforms));
		listX_panel.add_component("save_panel",new InputPanel("Save",save_func));
	}
	
	select_mode(){
		const mode = this.panel_dict["options_panel"].cls_dict["sel_mode"].getSelected();
		this.panel_dict["list_panel"].reset();

		if (mode == "1-list"){
			this.build_1list();
		}
		else if (mode == "2-list"){
			this.build_2list();
		}
	}

	load_list(part_num){
		const listX_panel = this.get_listX(part_num);

		const name = listX_panel.cls_dict["input"].getInput();
		const dataform = listX_panel.cls_dict["load_df"].getSelected();
		const obj = this;
		const load_func = function (resp){
			console.log(resp);
			const response = JSON.parse(resp);
			obj.handle_load(response,part_num);
		}
		this.client.get_list(dataform,name,load_func);
	}

	handle_load(response,part_num){
		const options_panel = this.panel_dict["options_panel"];
		const mode = options_panel.cls_dict["sel_mode"].getSelected();
		const listX_panel = this.get_listX(part_num);
		const term_list = listX_panel.cls_dict["listbox"];
		const list = response["termlist"];
		for (var i = 0; i< list.length; i++){
			term_list.addItem(list[i]);
		}
	}
	
	save_list(part_num){
		const listX = this.get_listX(part_num);
		const dataform = listX.cls_dict["save_df"].getSelected();
		const name = listX.cls_dict["save_panel"].getInput();
		const list = listX.cls_dict["listbox"].getItems();
		const obj = this;
		const load_func = function (response){
			const resp = JSON.parse(response);
			obj.handle_save(resp);
		}
		client.save_list(dataform,name,list,load_func);
	}


	add_item(part_num){
		const listX = this.get_listX(part_num);
		const item = listX.cls_dict["add_panel"].getInput();
		listX.cls_dict["listbox"].addItem(item);
	}

	handle_save(response){
		alert(response);
	}
	
	get_listX(part_num){
		const list_panel_id = "list"+part_num+"_panel"; 
		var list_panel = this.panel_dict["list_panel"];
		var lists_panel = list_panel.panel_dict["lists_panel"];
		return lists_panel.panel_dict[list_panel_id];
	}


}
