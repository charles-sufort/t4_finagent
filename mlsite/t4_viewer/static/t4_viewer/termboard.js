class TermBoard {
	constructor (div_id,name,client) {
		this.name = name;
		this.div_id = div_id;
		this.client = client;
	}

	build(){
		const div = document.getElementById(this.div_id);
		const term_list_id = this.div_id + "term_list";
		const select_df_id = this.div_id + "select_df";
		const select_df = document.createElement("select");
		const dataforms = ["ners","lemma","noun_chunks"];
		const div_add = document.createElement("div");
		const div_add_id = this.div_id + "add_div";
		const div_save = document.createElement("div");
		const div_save_id = this.div_id + "save_div";
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
		const dflist_input_id = this.div_id + "input_list";
		const add_input = document.createElement("input");
		const add_button = document.createElement("button");
		const add_input_id = this.div_id + "add_input";
		const add_func = this.name + ".add_term1()";
		const save_label = document.createElement("label");
		const save_input = document.createElement("input");
		const save_button = document.createElement("button");
		const save_status = document.createElement("button");
		const save_input_id = this.div_id + "save_input";
		const save_func = this.name + ".save_termlist()";
		const save_status_id = this.div_id + "save_status";
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
		console.log(div_list_id);
		div.appendChild(select_df);
		div.appendChild(dflist_label);
		div.appendChild(dflist_input);
		div.appendChild(dflist_load);
		div_add.appendChild(add_input);
		div_add.appendChild(add_button);
		div_save.appendChild(save_label);
		div_save.appendChild(save_input);
		div_save.appendChild(save_button);
		div_save.appendChild(save_status);
		div.appendChild(div_list);
		div.appendChild(div_add);
		div.appendChild(div_save);
		const obj = this;
		const item_func = x => x;
		this.term_list = new ListBox(div_list_id,10,this.client,item_func);

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
		const term = document.getElementById(this.div_id+"add_input").value;
		this.term_list.addItem(term);
	}

	add_term2(term){
		this.term_list.addItem(term);
	}

	remove_terms(){
		this.term_list.removeItems();
	}

	save_termlist(){
		const dataform = document.getElementById(this.div_id+"select_df").value;
		const name = document.getElementById(this.div_id+"save_input").value;
		const obj = this;
		const terms = this.term_list.getItems();
		console.log(terms);
		const save_func = function (response) {
			const resp_obj = JSON.parse(response);
			obj.display_status(resp_obj);
		}
		console.log("save termlist");
		console.log(dataform);
		console.log(name);
		console.log(terms);
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
		this.term_list.innerHTML = "";
		const list = response["termlist"];
		console.log(list);
		for (var i = 0; i< list.length; i++){
			this.term_list.addItem(list[i]);
		}
	}

}
