class TaskBoard extends PanelComponent{
	constructor (name,client,task_fun,status_fun) {
		super();
		this.client = client;
		this.name = name;
		this.task_count = 0;
		this.task_fun = task_fun;
		this.status_fun = status_fun;
	}

	build_inner(){
		this.add_panel("task_panel");
		this.add_panel("add_div");
		const add_btn = document.createElement("button");
		const add_func = this.name + ".add_task()";
		add_btn.setAttribute("onclick",add_func);
		add_btn.innerHTML = "add task";
		this.panel_dict["add_div"].div.appendChild(add_btn);
	}

	add_task(){
		this.task_count = this.task_count + 1;
		const task_name = "taskpanel_" + this.task_count.toString();
		name = this.name+".panel_dict['task_panel'].cls_dict['"+task_name+"']";
		this.panel_dict["task_panel"].add_component(task_name, new PSTaskPanel(name,client,this.task_count));
	}

}
