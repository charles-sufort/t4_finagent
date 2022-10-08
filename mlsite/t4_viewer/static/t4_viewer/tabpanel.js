class TabPanel extends Panel{
	constructor(name){
		super();
		this.tabs = 0;
		this.name = name;
		this.tabs_dict = {};
	}

	build(div_id){
		this.create_div(div_id);
		this.add_panel("tabs");
		this.add_panel("panel");
	}

	add_tab(div_id,name,panel_cls){
		const tab = document.createElement("button");
		const tab_func = this.name + ".select_tab('"+name+"')";
		tab.setAttribute("onclick",tab_func);
		tab.innerHTML = name;
		this.tabs = this.tabs + 1;
		this.tabs_dict[name] = [div_id,panel_cls];
		this.panel_dict["tabs"].div.appendChild(tab);
	}

	select_tab(name){
		this.panel_dict["panel"].div.innerHTML = "";
		this.tabs_dict[name][1].build(this.panel_dict["panel"].id);
	}
}
