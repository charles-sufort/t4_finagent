class QueryBoard extends PanelComponent{
	constructor(name,client) {
		super();
		this.clist = {};
		this.name = name;
		this.client = client;
		this.query_data = null;
	}

	build_inner(){
		this.response = null;
		this.cls_list = null;

		this.mode = null;
		this.add_panel("query_panel");
		this.add_panel("display_panel");
		const query_panel = this.panel_dict["query_panel"]
		const query_opts = ["FreqQueries"];
		const dataforms = ["ners","lemma","noun_chunks"];

		query_panel.add_component("sel_query",new SelectBox(query_opts));
		query_panel.add_component("sel_df",new SelectBox(dataforms));
		query_panel.add_component("key_inp",new InputPanel3("Key:"));
		query_panel.add_component("ction_inp",new InputPanel3("Ction:"));
		const submit = document.createElement("button");
		const submit_fun = this.name + ".submit_query()";
		submit.setAttribute("onclick",submit_fun)
		submit.innerHTML = "Submit";
		query_panel.div.appendChild(submit);
	}


	get_select_variable(handle){
		const select_id = this.div_id + handle;
		const select = document.getElementById(select_id);
		return select.options[select.selectedIndex].value;
	}

	get_input_variable(handle){
		const input_id = this.div_id + handle;
		const input = document.getElementById(input_id);
		return input.value;
	}

	submit_query() {
		const query_panel = this.panel_dict["query_panel"];
		const obj = this;
		const load_func = function (response) {
			console.log(response);
			const resp_obj = JSON.parse(response);
			obj.query_display(resp_obj);
		}
		const ction = query_panel.cls_dict["ction_inp"].getInput();
		const key = query_panel.cls_dict["key_inp"].getInput();
		const dataform = query_panel.cls_dict["sel_df"].getSelected();
		const query = query_panel.cls_dict["sel_query"].getSelected();
		this.client.freq_query(ction,dataform,key,load_func);
	}

	query_display(response){
		this.response = response;
		const display_panel = this.panel_dict["display_panel"];
		display_panel.reset();
		display_panel.add_panel("clist_panel");
		display_panel.add_panel("results_panel");
		display_panel.add_panel("glossary_panel");
		const modes = ["graph","list"];
		const dataforms = ["ners","lemma","noun_chunks"];
		display_panel.add_component("sel_mode",new SelectBox(modes));
		display_panel.add_component("sel_df",new SelectBox(dataforms));
		const disp_mode_func = this.name + ".disp_mode()";
		display_panel.cls_dict["sel_mode"].setFunc(disp_mode_func);
		const clist_panel = display_panel.panel_dict["clist_panel"];
		const result_panel = display_panel.panel_dict["results_panel"];
		const clists = ["whitelist","blacklist"];
		const load_func = this.name + ".save_clist()";
		clist_panel.add_component("sel_clist",new SelectBox(clists));
		clist_panel.add_component("clist_inp", new InputPanel("Clist:",load_func));
	}


	cls_select(){
		console.log("cls_select");
		const display_panel = this.panel_dict["display_panel"];
		const results_panel = this.panel_dict["results_panel"];
		const cls = results_panel.cls_dict["sel_cls"].getSelected();
		const cls_list = this.response[cls];
		cls_list.sort(col2sort);
		const listbox = results_panel.panel_dict["listbox"]
		listbox.removeItems();
		for (var i = 0; i < cls_list.length; i++){
			listbox.addItem(cls_list[i],0);
		}
		listbox.apply_clist(this.clist["type"],this.clist["termlist"]);
	}

	add_clist_bar(){
		console.log("add_clist_bar");
		const div_clist = document.getElementById(this.div_id+"dispclist");
		div_clist.innerHTML = "";
		const sel_clist = document.createElement("select");
		const clist_opts = ["whitelist","blacklist"];
		for (var i = 0; i<clist_opts.length; i++){
			const opt = document.createElement("option");
			opt.setAttribute("value",clist_opts[i]);
			opt.innerHTML = clist_opts[i];
			sel_clist.appendChild(opt);
		}
		const label = document.createElement("label");
		const input = document.createElement("input");
		const submit = document.createElement("button");
		const input_id = this.div_id + "divclist" + "input";
		const sel_clist_id = this.div_id + "divclist" + "select_clist";
		input.setAttribute("id",input_id);
		sel_clist.setAttribute("id",sel_clist_id);
		const load_clist = this.name + ".load_clist()";
		submit.setAttribute("onclick",load_clist);
		submit.innerHTML = "load";
		div_clist.appendChild(sel_clist);
		div_clist.appendChild(label);
		div_clist.appendChild(input);
		div_clist.appendChild(submit);
	}

	load_clist(){
		const display_panel = this.panel_dict["display_panel"];
		const clist_panel = display_panel.panel_dict["clist_panel"];
		const query_panel = this.panel_dict["query_panel"];
		const dataform = query_panel.cls_dict["sel_df"].getSelected();
		const name = clist_panel.cls_dict["clist_inp"].getInput();
		const obj = this;
		const load_func = function (resp){
			const response = JSON.parse(resp);
			obj.save_clist(response);
		}
		this.client.get_list(dataform,name,load_func);
	}
			

	save_clist(response){
		const display_panel = this.panel_dict["display_panel"];
		const clist_panel = display_panel.panel_dict["clist_panel"];
		const clist_type = clist_panel.cls_dict["sel_clist"].getSelected();
		this.clist["type"] = clist_opt;
		this.clist["termlist"] = new Set();
		for (var i = 0;  i<response["termlist"].length; i++){
			const term = response["termlist"][i];
			console.log(term);
			this.clist["termlist"].add(term);
		}
		if (sel_type == "list"){
			console.log(this.clist);
			this.cls_list.apply_clist(clist_opt,this.clist["termlist"]);
		}
		else if (sel_type == "graph"){
			const div_graph = document.getElementById(disp_id+"resultsgraph");
			div_graph.innerHTML = "";
			const data = this.graph_data();
			console.log(data);
			var layout = {width: 500,height:500};
			Plotly.newPlot(disp_id+"resultsgraph",data,layout);
		}
		const clear_fun = this.name + ".clear_clist()";
		clist_panel.add_component("Clear",new Button("Clear Clist",clear_fun));
	}

	clear_clist(){
		this.clist = {};
		this.disp_mode();
	}

	disp_mode(){
		const results_panel = this.panel_dict["results_panel"];
		const mode = results_panel.cls_dict["sel_mode"].getSelected();
		results_panel.reset();
		if (mode == "list"){
			const cls_fun = this.name + ".cls_select()";
			const classes = Object.keys(this.response);
			results_panel.add_component("sel_cls",SelectBox(classes));
			results_panel.cls_dict["sel_cls"].setFunc(cls_fun);
			const obj = this;
			const add_func = function (lbox){
				console.log(lbox);
				console.log(lbox.box);
				const term = lbox.box.options[lbox.box.selectedIndex].value;
				obj.add_term2(term);
			}
			var value_func = item => item[0];
			if (dataform == "lemma"){
				value_func = item => item[0];
			}
			results_panel.add_component("listbox",new ListBox(20,value_func));
			results_panel.panel_dict["listbox"].addEventFunc("a",add_func);
			this.mode = "list";
		}
		else if (mode == "graph"){
			this.mode = "graph";
			const data = this.graph_data();
			var layout = {width: 500,height:500}
			Plotly.newPlot(results_panel.id,data,layout);
		}
	}
	
	graph_data(){
		const classes = Object.keys(this.response);
		const words = new Set();
		console.log("graph_data");
		console.log(this.clist);

		for (var i = 0; i<classes.length; i++){
			const cls_list = this.response[classes[i]];
			console.log(cls_list);
			for (var j = 0; j<cls_list.length; j++){
				words.add(cls_list[j][0]);
			}
		}
		console.log(words);
		const words1 = Array.from(words);
		var words2 = null;
		var words2_dict = {};
		if (Object.keys(this.clist).length == 0){
			console.log("clist");
			words2 = [...words1];
			words2_dict = {};
		}
		else {
			console.log("clist non-empty");
			const type = this.clist["type"];
			const terms = this.clist["termlist"];
			words2 = [];
			if (type == "blacklist"){
				for (var i = 0; i<words1.length; i++){
					if (! this.clist["termlist"].has(words1[i])){
						words2[words2.length] = words1[i];
					}
				}
			}
			else if (type == "whitelist"){
				for (var i = 0; i<words1.length; i++){
					if (this.clist["termlist"].has(words1[i])){
						words2[words2.length] = words1[i];
					}
				}
			}
		}
		console.log(words2);
		for (var i = 0; i<words2.length; i++){
			words2_dict[words2[i]] = i;
		}
		data = []
		for (var i = 0; i<classes.length; i++){
			const cls_list = this.response[classes[i]];
			var y_cls = Array(words2.length).fill(0);
			for (var j = 0; j<cls_list.length; j++){
				if (cls_list[j][0] in words2_dict){
					y_cls[words2_dict[cls_list[j][0]]] = cls_list[j][1];
				}
			}
			var cls_data = {x:[...words2],y:[...y_cls],type:"scatter"};
			data[data.length] = cls_data;
		}
		return data;
	}
}
