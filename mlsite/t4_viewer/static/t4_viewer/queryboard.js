class QueryBoard {
	constructor(div_id,name,client) {
		this.div_id = div_id;
		this.response = null;
		this.name = name;
		const div = document.getElementById(div_id);
		
		const select_query = document.createElement("select");
		const select_dataform = document.createElement("select");
		const div_dataform = document.createElement("div");
		const ction_label = document.createElement("label");
		const ction_input = document.createElement("input");
		const ction_submit = document.createElement("button");
		const key_label = document.createElement("label");
		const key_input = document.createElement("input");
		const div_disp = document.createElement("div");
		const query_id = div_id + "query";
		const dataform_id = div_id + "dataform";
		const ction_id = div_id + "ction";
		const disp_id = div_id + "disp";
		const div_df_id = div_id + "div_df";
		const key_id = div_id + "key";
		this.client = client;
		div_dataform.setAttribute("id",div_df_id);
		select_query.setAttribute("id",query_id);
		select_dataform.setAttribute("id",dataform_id);
		ction_input.setAttribute("id",ction_id);
		key_input.setAttribute("id",key_id);
		div_disp.setAttribute("id",disp_id);
		const submit_fun = name + ".submit_query()";
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
		var obj = this;
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
		const sel_cls_id = this.div_id + "sel_cls";
		const div_disp = document.getElementById(disp_id);
		const div_results_id = disp_id + "results";
		const div_glossary_id = disp_id + "glossary";
		const div_results = document.createElement("div");

		const div_glossary = document.createElement("div");
		const list_dfs = document.createElement("select");
		const classes = Object.keys(response);
		const resp_cls_select = document.createElement("select");
		const default_opt = document.createElement("option");
		div_results.setAttribute("id",div_results_id);
		div_glossary.setAttribute("id",div_glossary_id);
		default_opt.setAttribute("value","");
		default_opt.innerHTML = "select class";
		const cls_fun = this.name + ".cls_select()";
		resp_cls_select.setAttribute("onchange",cls_fun);
		resp_cls_select.setAttribute("id",sel_cls_id);
		const def_opt = document.createElement("option");
		resp_cls_select.appendChild(def_opt);
		for (var i = 0; i < classes.length; i++){
			const cl_opt = document.createElement("option");
			cl_opt.setAttribute("value",classes[i]);
			cl_opt.innerHTML = classes[i];
			resp_cls_select.appendChild(cl_opt);
		}
		div_disp.appendChild(div_results);
		div_disp.appendChild(div_glossary);
		div_results.appendChild(resp_cls_select);
		const cls_list = document.createElement("select");
		const cls_list_id = this.div_id + "cl_list";
		cls_list.setAttribute('size',20);
		cls_list.setAttribute('id',cls_list_id);
		div_results.appendChild(cls_list);
	}

	cls_select(){
		console.log("cls_select");
		const cls_list_sel_id = this.div_id + "cl_list";
		const cls_list_sel = document.getElementById(cls_list_sel_id);
		const cls_sel_id = this.div_id + "sel_cls";
		const cls_sel = document.getElementById(cls_sel_id);
		const cls = cls_sel.options[cls_sel.selectedIndex].value;
		console.log(this.response);
		const cls_list = this.response[cls];
		cls_list.sort(col2sort)
		console.log(cls_list);
		cls_list_sel.innerHTML = "";
		for (var i = 0; i < cls_list.length; i++){
			const list_opt = document.createElement("option");
			list_opt.setAttribute("value",cls_list[i]);
			list_opt.innerHTML = cls_list[i];
			cls_list_sel.appendChild(list_opt);
		}
	}

}

