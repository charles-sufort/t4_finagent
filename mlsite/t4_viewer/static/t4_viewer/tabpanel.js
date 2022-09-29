class TabPanel extends Panel{
	constructor(div_id,name){
		this.div_id = div_id;
		this.tabs = 0;
		this.name = name;
		const div = document.getElementById(div_id);
		const div_tabs = document.createElement("div");
		const div_panel = document.createElement("div");
		this.id_dict["tabs"] = div_id + ".1";
		this.id_dict["panel"] = div_id + ".2";
		div_tabs.setAttribute("id",this.id_dict["tabs"]);
		div_panel.setAttribute("id",this.id_dict["panel"]);
		div.appendChild(div_tabs);
		div.appendChild(div_panel);
	}

	add_tab(div_id,name,panel_cls){
		const div_tabs = document.getElementById(this.id_dict["tabs"]);
		const div_cls = document.createElement(div_id);
		const tab = document.createElement("button");
		const tab_id = this.id_dict["tabs"] + "." + (this.tabs+1).toString();
		const tab_func = this.name + ".select_tab('"+name+"')";
		tab.setAttribute("onclick",tab_func);
		tab.innerHTML = name;
		this.tabs = this.tabs + 1;
		this.tabs_dict[name] = [div_id,panel_cls];
		div_tabs.appendChild(tab);
	}

	select_tab(name){
		const div_panel = document.getElementById(this.id_dict["panel"]);
		div_panel.innerHTML = "";
		const div_cls = document.createElement("div");
		div_cls.setAttribute("id",this.tabs_dict[name][0]);
		div_panel.appendChild(div_cls);
		console.log(this.tabs_dict[name][1]);
		this.tabs_dict[name][1].build();
	}
}
