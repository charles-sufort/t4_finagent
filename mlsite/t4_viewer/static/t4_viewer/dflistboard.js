class TermBoard {
	constructor (div_id,name,client) {
		const div = document.getElementById(div_id);
		this.name = name;
		this.div_id = div_id;
		const select_df_id = div_id + "select_df";
		const select_df = document.createElement("select");
		const dataforms = ["ners","lemma","noun_chunks"];
		const dflist_label = document.createElement("label");
		const dflist_input = document.createElement("input");
		const dflist_load = document.createElement("button");
		const dflist_input_id = div_id + "input_list";
		dflist_label.innerHTML = "Name:";
		dflist_input.setAttribute("id",dflist_input_id);
		const load_func = this.name + ".load_list()";
		dflist_load.setAttribute("load",load_func);
		const div_list_id = this.div_id + "list_div";
		const div_list = document.createElement("div");
		div_list.getElementById(div_list_id);
	}


	load_list(){
		const obj = this;
		const load_func = function (response) {
			const resp_obj = JSON.parse(response);
			this.display_list(resp_obj);
		};
		client.get_list(dataform,list_name,load_func);
	}

	display_list(response){
		const div_list = document.getElementById(this.div_id+"list_div");
		const list_box = document.createElement("select");
		const list = []
		for (var i = 0; i< list.length; i++){
			const list_opt = document.createElement("opt");
			list_opt.setAttribute("value",list[i]);
			list_opt.innerHTML = list[i];
			list_box.appendChild(list_opt);
		}
		div_list.appendChild(list_box);
	}
}
