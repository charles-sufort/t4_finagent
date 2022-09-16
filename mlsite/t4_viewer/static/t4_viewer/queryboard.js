class QueryBoard {
	constructor(div_id,name,client) {
		this.div_id = div_id;
		const div = document.getElementById(div_id);
		const select_query = document.createElement("select");
		const select_dataform = document.createElement("select");
		const ction_label = document.createElement("label");
		const ction_input = document.createElement("input");
		const ction_submit = document.createElement("button");
		const div_disp = document.createElement("div");
		const query_id = div_id + "query";
		const dataform_id = div_id + "dataform";
		const input_id = div_id + "input";
		const disp_id = div_id + "disp";
		this.client = client;
		select_query.setAttribute("id",query_id);
		select_dataform.setAttribute("id",dataform_id);
		ction_input.setAttribute("id",input_id);
		div_disp.setAttribute("id",disp_id);
		const submit_fun = name + ".submit_query()";
		ction_submit.setAttribute("onclick",submit_fun)
		ction_label.innerHTML = "Ction:";
		ction_submit.innerHTML = "Submit";
		const dataforms = ["ners","lemmas","noun_chunks"];
		const queries = ["FreqQueries"];
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
			select_query.appendChild(opt);
		}
		div.appendChild(select_query);
		div.appendChild(select_dataform);
		div.appendChild(ction_label);
		div.appendChild(ction_input);
		div.appendChild(ction_submit);
		div.appendChild(div_disp);
	}

	submit_query() {
		var obj = this;
		const load_func = function () {
			const response = this.response;
			obj.query_display(response);
		}


	}

	query_display(response){
		const disp_id = this.div_id + "disp";
		const div_disp = document.getElementById(disp_id);

	}




}

