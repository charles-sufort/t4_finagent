class TaskBoard {
	constructor (div_id,name,client,task_fun,status_fun) {
		this.div_id = div_id;
		this.client = client;
		this.name = name;
		this.task_count = 0;
		this.task_fun = task_fun;
		this.status_fun = status_fun;
	}

	build(){
		this.task_ids = []
		this.new_task_id = this.div_id + "new_task";
		this.new_task = document.createElement('button');
		this.new_task.setAttribute("onclick",this.name+".add_task()");
		this.new_task.innerHTML = "add Task";
		const div = document.getElementById(this.div_id);
		div.appendChild(this.new_task);
		console.log("constructed");
	}
	
	add_task(){
		/* System for deletion 8*/
		this.task_count = this.task_count + 1;
		const task_id = this.div_id + "task" + this.task_count.toString();
		const task = document.createElement("div");
		this.task_ids[this.task_count-1] = task_id;
		task.setAttribute('id',task_id);
		const dataform_id = task_id + "dataform";
		console.log(this.dataform_id);
		const unit_id = task_id + "unit";
		const submit_id = task_id + "submit";
		const input_id = task_id + "input";
		const sel_dataform = document.createElement('select');
		const sel_unit = document.createElement('select');
		const sel_submit = document.createElement('button');
		const sel_input = document.createElement('input');
		const opt_dfs = ["lemmas","ners","noun_chunks"];
		const opt_units = ["company","ction"];
		sel_dataform.setAttribute("id",dataform_id);
		sel_unit.setAttribute("id",unit_id);
		sel_input.setAttribute("id",input_id);
		sel_submit.setAttribute("id",submit_id);
		for ( var i =0; i<opt_dfs.length  ;i++){
			const opt_df = document.createElement("option");
			opt_df.innerHTML = opt_dfs[i];
			opt_df.setAttribute("value",opt_dfs[i]);
			sel_dataform.appendChild(opt_df);
		}
		for ( var i =0; i<opt_units.length  ;i++){
			const opt_unit = document.createElement("option");
			opt_unit.innerHTML = opt_units[i];
			opt_unit.setAttribute("value",opt_units[i]);
			sel_unit.appendChild(opt_unit);
		}
		sel_submit.innerHTML = "submit";
		const submit_fun = this.name + ".submit_task('"+task_id +"')";
		sel_submit.setAttribute("onclick",submit_fun);
		task.appendChild(sel_dataform);
		task.appendChild(sel_unit);
		task.appendChild(sel_input);
		task.appendChild(sel_submit);
		const div = document.getElementById(this.div_id);
		div.appendChild(task)
		console.log("add task");
	}

	submit_task(task_id){
		console.log(task_id);
		const dataform_id = task_id + "dataform";
		const unit_id = task_id + "unit";
		const input_id = task_id + "input";
		const sel_df = document.getElementById(dataform_id);
		const sel_unit = document.getElementById(unit_id);
		const sel_input = document.getElementById(input_id);
		console.log(sel_unit);
		console.log("here");
		const unit = sel_unit.options[sel_unit.selectedIndex].value;
		const dataform = sel_df.options[sel_df.selectedIndex].value;
		if (unit == "company"){
			const company = sel_input.value;
			this.client.process_company_dataform(company,dataform,this.task_fun,task_id);

			this.task_bar(task_id,company,dataform);
		}
	}

	task_bar(task_id,company,dataform){
		const task_div = document.getElementById(task_id);
		task_div.innerHTML = "";
		const company_btn = document.createElement("button");
		company_btn.innerHTML = company;
		const dataform_btn = document.createElement("button");
		dataform_btn.innerHTML = dataform;
		const status_btn = document.createElement("button");
		const status_id = task_id + "status";
		const check_btn = document.createElement("button");
		const btn_fun = this.name + ".get_task_status('"+task_id+"','"+dataform+"','"+company+"')";
		check_btn.setAttribute('onclick',btn_fun);
		status_btn.setAttribute('id',status_id) ;
		status_btn.innerHTML = "NA";
		check_btn.innerHTML = "check";
		task_div.appendChild(company_btn);
		task_div.appendChild(dataform_btn);
		task_div.appendChild(status_btn);
		task_div.appendChild(check_btn);
	}	

	set_status(task_id,response){
		const status_id = task_id + "status";
		const status_btn = document.getElementById(status_id);
		console.log(task_id);
		console.log("response");
		console.log(response);
		status_btn.innerHTML = response;
	}

	get_task_status(task_id,dataform,company){
		this.client.company_process_status(company,dataform,  this.status_fun,task_id);
	}

}
