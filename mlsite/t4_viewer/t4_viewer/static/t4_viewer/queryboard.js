class QueryBoard {
	constructor(termclassses,container_id){
		console.log(container_id);
		this.termclasses = termclasses;	
		this.container_id = container_id;
		this.query_select_id = "query_select_id";
		const container = document.getElementById(container_id);
		const select = document.createElement("select");
		select.setAttribute("id",this.query_select_id);
		const option = document.createElement("option");
		option.disabled = true;
		option.selected = true;
		option.innerHTML = " ";
		select.appendChild(option);

		for (var i = 0; i<this.termclasses.length; i++){
			const termclass = termclasses[i];
			const option = document.createElement("option");
			const option_id = termclass + "_id";

			option.setAttribute('id',option_id);
			option.setAttribute('value',termclass);
			option.innerHTML = termclass;
			select.appendChild(option);
		}
		container.appendChild(select);
	}

	query_select(){
		const select = document.getElementById(this.query_select_id);
		termclass = select.options[select.selectedIndex].value;
		const parameter_div = document.createElement('parameter_div');
		
	}

	lemma_paramters(container_id){
	}

	named_entity_paramters(container_id){
	}

	noun_chunk_paramters(container_id){
	}

	submit(){
	}

	ction_viewer(){
	}
}
