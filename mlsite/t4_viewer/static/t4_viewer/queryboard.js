class QueryBoard {
	constructor(div_id,name,client) {
		this.div_id = div_id;
		this.clist = {};
		this.name = name;
	}

	build(){
		this.response = null;
		this.cls_list = null;

		this.mode = null;
		const div = document.getElementById(this.div_id);
		
		const select_query = document.createElement("select");
		const select_dataform = document.createElement("select");
		const div_dataform = document.createElement("div");
		const ction_label = document.createElement("label");
		const ction_input = document.createElement("input");
		const ction_submit = document.createElement("button");
		const key_label = document.createElement("label");
		const key_input = document.createElement("input");
		const div_disp = document.createElement("div");
		const div_clist = document.createElement("div");
		const query_id = this.div_id + "query";
		const dataform_id = this.div_id + "dataform";
		const ction_id = this.div_id + "ction";
		const disp_id = this.div_id + "disp";
		const div_df_id = this.div_id + "div_df";
		const key_id = this.div_id + "key";
		this.client = client;
		div_dataform.setAttribute("id",div_df_id);
		select_query.setAttribute("id",query_id);
		select_dataform.setAttribute("id",dataform_id);
		ction_input.setAttribute("id",ction_id);
		key_input.setAttribute("id",key_id);
		div_disp.setAttribute("id",disp_id);
		const submit_fun = this.name + ".submit_query()";
		ction_submit.setAttribute("onclick",submit_fun)
		ction_label.innerHTML = "Ction:";
		key_label.innerHTML = "Key:";
		ction_submit.innerHTML = "Submit";
		const dataforms = ["ners","lemma","noun_chunks"];
		const queries = ["FreqQueries"];
		const opt_query = document.createElement("option");
		opt_query.setAttribute("value","");
		opt_query.innerHTML = "select";
		select_query.appendChild(opt_query);
		const opt_df = document.createElement("option");
		opt_df.innerHTML = "select";
		opt_df.setAttribute("value","");
		select_dataform.appendChild(opt_df);
		for (var i = 0; i<queries.length; i++){
			const opt = document.createElement("option");
			opt.innerHTML = queries[i];
			opt.setAttribute("value",queries[i]);
			select_query.appendChild(opt);
		}
		for (var i = 0; i< dataforms.length; i++){
			const opt = document.createElement("option");
			opt.innerHTML = dataforms[i];
			opt.setAttribute("value",dataforms[i]);
			select_dataform.appendChild(opt);
		}
		div.appendChild(ction_label);
		div.appendChild(ction_input);
		div.appendChild(select_query);
		div.appendChild(select_dataform);
		div.appendChild(key_label);
		div.appendChild(key_input);
		div.appendChild(ction_submit);
		div.appendChild(div_disp);


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
		const disp_id = this.div_id + "disp";
		const div_disp = document.getElementById(disp_id);
		div_disp.innerHTML = "";
		const obj = this;
		const load_func = function (response) {
			console.log(response);
			const resp_obj = JSON.parse(response);
			obj.query_display(resp_obj);
		}
		const ction = this.get_input_variable("ction");
		console.log(ction);
		const key = this.get_input_variable("key");
		console.log(key);
		const dataform = this.get_select_variable("dataform");
		console.log(dataform);
		this.client.freq_query(ction,dataform,key,load_func);
	}

	query_display(response){
		this.response = response;
		const disp_id = this.div_id + "disp";
		const div_disp = document.getElementById(disp_id);
		const div_results_id = disp_id + "results";
		const div_glossary_id = disp_id + "termboard";
		const div_clist_id = disp_id + "clist";
		const sel_display_id = disp_id + "sel_display";
		const div_results = document.createElement("div");
		const div_glossary = document.createElement("div");
		const list_dfs = document.createElement("select");
		const div_clist = document.createElement("div");
		const clist_add = document.createElement("button");
		const default_opt = document.createElement("option");
		const sel_display = document.createElement("select");
		const displays = ["list","graph"];
		div_results.setAttribute("id",div_results_id);
		div_glossary.setAttribute("id",div_glossary_id);
		div_clist.setAttribute("id",div_clist_id);
		default_opt.setAttribute("value","");
		default_opt.innerHTML = "select class";
		clist_add.innerHTML = "add ControlList";
		sel_display.setAttribute("id",sel_display_id);
		sel_display.appendChild(default_opt);
		const addClistfun = this.name + ".add_clist_bar()";
		for (var i = 0; i<displays.length; i++){
			const disp_opt = document.createElement("option");		
			disp_opt.setAttribute("value",	displays[i]);
			disp_opt.innerHTML = displays[i];
			sel_display.appendChild(disp_opt);
		}
		const disp_mode_func = this.name + ".disp_mode()";
		sel_display.setAttribute("onchange",disp_mode_func);
		clist_add.setAttribute("onclick",addClistfun);
		div_clist.appendChild(clist_add);
		div_disp.appendChild(div_clist);
		div_disp.appendChild(sel_display);
		div_disp.appendChild(div_results);
		div_disp.appendChild(div_glossary);
		this.termboard = new TermBoard(disp_id+"termboard",this.name+".termboard", this.client);
	}


	cls_select(){
		console.log("cls_select");
		const dataform = document.getElementById(this.div_id+"dataform").value;
		const cls_sel_id = this.div_id + "sel_cls";
		const cls_sel = document.getElementById(cls_sel_id);
		const cls = cls_sel.options[cls_sel.selectedIndex].value;
		console.log(this.response);
		const cls_list = this.response[cls];
		cls_list.sort(col2sort);
		console.log(cls_list);
		this.cls_list.removeItems();
		for (var i = 0; i < cls_list.length; i++){
			this.cls_list.addItem(cls_list[i],0);
		}
		this.cls_list.apply_clist(this.clist["type"],this.clist["termlist"]);
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
		const dataform = document.getElementById(this.div_id+"dataform").value;
		const name = document.getElementById(this.div_id+"divclist"+"input").value;
		const obj = this;
		const load_func = function (resp){
			const response = JSON.parse(resp);
			obj.save_clist(response);
		}
		this.client.get_list(dataform,name,load_func);
	}
			

	save_clist(response){
		console.log("save_clist");
		console.log(response);
		const clist_opt = document.getElementById(this.div_id+"divclist"+"select_clist").value;
		this.clist["type"] = clist_opt;
		this.clist["termlist"] = new Set();
		const disp_id = this.div_id + "disp";
		const sel_type = document.getElementById(disp_id+"sel_display").value;
		console.log("save list");
		console.log(sel_type);
		console.log(response["termlist"]);
		console.log("for save");
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
		const div_clist = document.getElementById(this.div_id+"dispclist");
		const clear_btn = document.createElement("button");
		const clear_fun = this.name + ".clear_clist()";
		clear_btn.setAttribute("onclick",clear_fun);
		clear_btn.innerHTML = "Clear Clist";
		div_clist.appendChild(clear_btn);
	}

	clear_clist(){
		this.clist = {};
		this.disp_mode();
	}

	disp_mode(){
		const disp_id = this.div_id + "disp";
		const sel_disp = document.getElementById(disp_id+"sel_display");
		const mode = sel_disp.options[sel_disp.selectedIndex].value;
		const div_results = document.getElementById(disp_id + "results");
		div_results.innerHTML = "";
		if (mode == "list"){
			const div_list = document.createElement("div");
			const div_list_id = disp_id + "resultslist";
			div_list.setAttribute("id",div_list_id); 
			div_results.appendChild(div_list);
			const resp_cls_select = document.createElement("select");
			const cls_fun = this.name + ".cls_select()";
			const sel_cls_id = this.div_id + "sel_cls";
			resp_cls_select.setAttribute("onchange",cls_fun);
			resp_cls_select.setAttribute("id",sel_cls_id);
			const def_opt = document.createElement("option");
			resp_cls_select.appendChild(def_opt);
			const classes = Object.keys(this.response);
			for (var i = 0; i < classes.length; i++){
				const cl_opt = document.createElement("option");
				cl_opt.setAttribute("value",classes[i]);
				cl_opt.innerHTML = classes[i];
				resp_cls_select.appendChild(cl_opt);
			}
			div_list.appendChild(resp_cls_select);

			const obj = this.termboard;
			const add_func = function (lbox){
				console.log(lbox);
				console.log(lbox.box);
				const term = lbox.box.options[lbox.box.selectedIndex].value;
				obj.add_term2(term);
			}
			const dataform = document.getElementById(this.div_id+"dataform").value;
			var value_func = item => item[0];
			if (dataform == "lemma"){
				value_func = item => item[0];
			}

			this.cls_list = new ListBox(disp_id + "resultslist",20,this.client,value_func);
			this.cls_list.addEventFunc("a",add_func);
			this.mode = "list";
		}
		else if (mode == "graph"){
			this.mode = "graph";
			const div_graph = document.createElement("div");
			div_graph.setAttribute("id",disp_id+"resultsgraph");
			div_results.appendChild(div_graph);

			const data = this.graph_data();
			var layout = {width: 500,height:500}
			Plotly.newPlot(disp_id+"resultsgraph",data,layout);
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
