class Panel {
	constructor(){
		this.id_dict = {};
		this.cls_dict = {};
		this.panel_dict = {};
		this.elem_count = 0;
	}

	create_div(div_id){
		const div = document.getElementById(div_id);
		this.id = div_id + ".1";
		this.div = document.createElement("div");
		this.div.setAttribute("id",this.id);
		div.appendChild(this.div);
	}


	add_panel(name){
		console.log("Panel");
		console.log(this);
		this.add_id(name);
		const div = document.createElement("div");
		div.setAttribute("id",this.id_dict[name]);
		this.div.appendChild(div);
		this.panel_dict[name] = new Panel();
		this.panel_dict[name].create_div(this.id_dict[name]);
	}

	add_component(name,cls){
		this.cls_dict[name] = cls;
		this.add_panel(name);
		cls.build(this.panel_dict[name].id);
	}

	add_id(name){
		this.elem_count = this.elem_count + 1;
		this.id_dict[name] = this.id + "." + this.elem_count.toString();
	}

}

