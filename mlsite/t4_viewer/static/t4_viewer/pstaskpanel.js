class PSTaskPanel extends PanelComponent {
	constructor(name,client){
		super();
		this.name = name;
		this.client = client;
		this.data = {}
	}

	build_inner(){
		this.add_panel("load_panel");
		const submit = document.createElement("button");
		const sel_func = this.name + ".select_dataclass()";
		this.panel_dict["load_panel"].add_component("sel_dataform", new SelectBox(["lemma","noun_chunks","ners"]));
		this.panel_dict["load_panel"].add_component("sel_dataclass", new SelectBox(["all","company","ction"]));
		this.panel_dict["load_panel"].cls_dict["sel_dataclass"].setFunc(sel_func);
		this.panel_dict["load_panel"].add_panel("dataclass_panel");
		const submit_func = this.name + ".submit_task()"
		submit.setAttribute("onclick",submit_func);
		submit.innerHTML = "Submit";
		this.panel_dict["load_panel"].div.appendChild(submit);
	}


	select_dataclass(){
		const dataclass = this.panel_dict["load_panel"].cls_dict["sel_dataclass"].getSelected();
		console.log(dataclass);
		this.panel_dict["load_panel"].panel_dict["dataclass_panel"].reset();
		if (dataclass == "all"){
			return;
		}
		else if (dataclass == "ction"){
			const label = document.createElement("label");
			label.innerHTML = "Ction:";
			const input = document.createElement("input");
			this.add_id("dataclass_name");
			input.setAttribute('id',this.id_dict["dataclass_name"]);
			this.panel_dict["load_panel"].panel_dict["dataclass_panel"].div.appendChild(label);
			this.panel_dict["load_panel"].panel_dict["dataclass_panel"].div.appendChild(input);
		}
		else if (dataclass == "company"){
			this.get_companies();
		}
	}

	get_companies(){
		const obj = this;
		const load_func = function (resp){
			const response = JSON.parse(resp);
			obj.display_companies(response);
		}
		client.get_companies(load_func);
	}

	display_companies(response){
		const load_panel = this.panel_dict["load_panel"];
		const companies = response["companies"];
		companies.sort();
		load_panel.panel_dict["dataclass_panel"].add_component("sel_company",new SelectPanel2("Companies:",companies));
	}

	
	submit_task(){
		const load_panel = this.panel_dict["load_panel"];
		const dataclass = load_panel.cls_dict["sel_dataclass"].getSelected();
		const dataform = load_panel.cls_dict["sel_dataform"].getSelected();
		console.log("submit_task");
		console.log(dataclass);
		const obj = this;
		const load_func = function (response){
			const resp = JSON.parse(response);
			obj.display_submit(resp);
		}
		switch(dataclass){
			case "all":
				alert("all");
			break;
			case "company":
				const dataclass_panel = load_panel.panel_dict["dataclass_panel"];
				const name = dataclass_panel.cls_dict["sel_company"].getSelected();
				this.data["dataclass"] = { "class":"company","name":name }
				this.data["dataform"] = dataform;
				this.client.process_company_dataform(name,dataform,load_func)
			break;
			case "ction":
			break;
		}
	}

	display_submit(response){
		const load_panel = this.panel_dict["load_panel"];
		load_panel.reset();
		load_panel.add_component("status",new LabelButton("Status:",response));
		load_panel.add_component("progress",new LabelButton("Progress:","NA"));
		const refresh_func = this.name + ".get_status()";
		load_panel.add_component("refresh",new Button("Refresh",refresh_func));
	}

	get_status(){
		const dataclass = this.data["dataclass"]["class"];
		const name = this.data["dataclass"]["name"];
		const dataform = this.data["dataform"];
		const obj = this;
		const load_func = function (response){
			const resp = JSON.parse(response);
			obj.display_status(resp);
		}
		switch(dataclass){
			case "all":
				alert("all");
			break;
			case "company":
				this.client.company_process_status(name,dataform,load_func);
			break;
			case "ction":
				this.client.ction_process_status(name,dataform,load_func);
			break;
		}

	}

	display_status(response){
		const load_panel = this.panel_dict["load_panel"];
		load_panel.cls_dict["status"].set_label(response);
		const dataclass = this.data["dataclass"]["class"];
		const dataform = this.data["dataform"];
		const name = this.data["dataclass"]["name"];
		const obj = this;
		const load_func = function (response){
			const resp = JSON.parse(response);
			obj.display_progress(resp);
		}
		switch(dataclass){
			case "all":
				alert("all");
			break;
			case "company":
				this.client.company_process_progress(name,dataform,load_func);
			break;
			case "ction":
				alert("ction");
			break;
		}
	}

	display_progress(response){
		const load_panel = this.panel_dict["load_panel"];

		const processed = response["processed"];
		const total = response["total"];
		const progress = `${processed} / ${total}`
		load_panel.cls_dict["progress"].set_label(progress);
	}
}
