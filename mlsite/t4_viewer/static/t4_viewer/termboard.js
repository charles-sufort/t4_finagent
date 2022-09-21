class TermBoard {
	constructor (div_id,name,client) {
		const div = document.getElementById(div_id);
		this.name = name;
		this.div_id = div_id;
		this.client = client;
		const term_list = document.createElement("select");
		const term_list_id = this.div_id + "term_list";
		const select_df_id = div_id + "select_df";
		const select_df = document.createElement("select");
		const dataforms = ["ners","lemma","noun_chunks"];
		const div_add = document.createElement("div");
		const div_add_id = this.div_id + "add_div";
		const div_save = document.createElement("div");
		const div_save_id = this.div_id + "save_div";
		term_list.setAttribute("id",term_list_id);
		term_list.setAttribute("size",10);
		select_df.setAttribute("id",select_df_id);
		for (var i = 0; i< dataforms.length; i++){
			const df_opt = document.createElement("option");			
			df_opt.setAttribute("value",dataforms[i]);
			df_opt.innerHTML = dataforms[i];
			select_df.appendChild(df_opt);
		}
		const dflist_label = document.createElement("label");
		const dflist_input = document.createElement("input");
		const dflist_load = document.createElement("button");
		const dflist_input_id = div_id + "input_list";
		const add_input = document.createElement("input");
		const add_button = document.createElement("button");
		const add_input_id = div_id + "add_input";
		const add_func = this.name + ".add_term1()";
		const save_label = document.createElement("label");
		const save_input = document.createElement("input");
		const save_button = document.createElement("button");
		const save_status = document.createElement("button");
		const save_input_id = div_id + "save_input";
		const save_func = this.name + ".save_termlist()";
		const save_status_id = div_id + "save_status";
		save_label.innerHTML = "Name:";
		save_button.innerHTML = "Save";
		add_button.innerHTML = "Add";
		add_input.setAttribute("id",add_input_id);
		add_button.setAttribute("onclick",add_func);
		save_input.setAttribute("id",save_input_id);
		save_button.setAttribute("onclick",save_func);
		save_status.setAttribute("id",save_status_id);
		dflist_load.innerHTML = "load";
		dflist_label.innerHTML = "Name:";
		dflist_input.setAttribute("id",dflist_input_id);
		const load_func = this.name + ".load_list()";
		dflist_load.setAttribute("onclick",load_func);
		const div_list_id = this.div_id + "list_div";
		const div_list = document.createElement("div");
		div_list.setAttribute("id",div_list_id);
		div.appendChild(select_df)
		div.appendChild(dflist_label);
		div.appendChild(dflist_input);
		div.appendChild(dflist_load);
		div_list.appendChild(term_list);
		div_add.appendChild(add_input);
		div_add.appendChild(add_button);
		div_save.appendChild(save_label);
		div_save.appendChild(save_input);
		div_save.appendChild(save_button);
		div_save.appendChild(save_status);
		div.appendChild(div_list);
		div.appendChild(div_add);
		div.appendChild(div_save);
	}


	load_list(){
		const obj = this;
		const sel_df = document.getElementById(this.div_id+"select_df");
		const dataform = sel_df.options[sel_df.selectedIndex].value;
		const input_name = document.getElementById(this.div_id+"input_list");
		const list_name = input_name.value;
		const load_func = function (response) {
			const resp_obj = JSON.parse(response);
			obj.display_list(resp_obj);
		};
		this.client.get_list(dataform,list_name,load_func);
	}

	add_term1(){
		const term_list = document.getElementById(this.div_id+"term_list");
		const term = document.getElementById(this.div_id+"add_input").value;
		const term_opt = document.createElement("option");
		term_opt.setAttribute("value",term);
		term_opt.innerHTML = term;
		term_list.appendChild(term_opt);
	}

	save_termlist(){
		const dataform = document.getElementById(this.div_id+"select_df").value;
		const name = document.getElementById(this.div_id+"save_input").value;
		const term_list = document.getElementById(this.div_id+"term_list");
		const obj = this;
		const terms = [];
		for (var i = 0; i< term_list.length; i++){
			terms[i] = term_list.options[i].value;
		}
		console.log(terms);
		const save_func = function (response) {
			const resp_obj = JSON.parse(response);
			obj.display_status(resp_obj);
		}
		this.client.save_list(dataform,name,terms,save_func);
	}
	
	display_status(response){
		const status_button = document.getElementById(this.div_id+"save_status")
		console.log(response);
		status_button.innerHTML = response["message"];

	}


	display_list(response){
		console.log(response);
		const div_list = document.getElementById(this.div_id+"list_div");
		const list_box = document.getElementById(this.div_id+"term_list");
		list_box.innerHTML = "";
		const list = response["termlist"];
		console.log(list)
		for (var i = 0; i< list.length; i++){
			const list_opt = document.createElement("option");
			list_opt.setAttribute("value",list[i]);
			list_opt.innerHTML = list[i];
			list_box.appendChild(list_opt);
		}
	}
}
