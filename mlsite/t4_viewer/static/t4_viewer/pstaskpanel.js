class PSTaskPanel extends PanelComponent {
	constructor(name,client){
		super();
		this.name = name;
		this.client = client;
		console.log("here1");
	}

	build_inner(){
		this.add_panel("load_panel");
		const submit = document.createElement("button");
		const sel_func = this.name + ".select_dataclass()";
		this.panel_dict["load_panel"].add_component("sel_dataform", new SelectBox(["lemma","noun_chunks","ners"]));
		this.panel_dict["load_panel"].add_component("sel_dataclass", new SelectBox(["all","company","ction"]));
		this.panel_dict["load_panel"].cls_dict["sel_dataclass"].setFunc(sel_func);

		this.panel_dict["load_panel"].add_panel("div_dataclass");
		const submit_func = this.name + ".submit_task()"
		submit.setAttribute("id",submit_func);
		submit.innerHTML = "Submit";
		this.panel_dict["load_panel"].div.appendChild(submit);
	}

	select_dataclass(){
		const dataclass = this.panel_dict["load_panel"].cls_dict["sel_dataclass"].getSelected();
		console.log(dataclass);
		if (dataclass == "all"){
			return;
		}
		const label = document.createElement("label");
		label.innerHTML = "Name:";
		const input = document.createElement("input");
		this.add_id("dataclass_name");
		input.setAttribute('id',this.id_dict["dataclass_name"]);
		this.panel_dict["load_panel"].panel_dict["div_dataclass"].div.appendChild(label);
		this.panel_dict["load_panel"].panel_dict["div_dataclass"].div.appendChild(input);
	}
	
	submit_task(){
		const dataclass = this.cls_dict["sel_dataclass"].getSelected();
		const dataform = this.cls_dict["sel_dataform"].getSelected();
		const obj = this;
		const load_func = function (response,task_num){
		}
/*
		switch(dataclass){
			case "all":
				alert("all");
			break;
			case "company":
				const name = document.getElementById(this.id_dict["dataclass_name"]).value;
				this.client.process_company_dataform(name,dataform,
			break;
			case "ction":
			break;
		}
		*/
	}



}
