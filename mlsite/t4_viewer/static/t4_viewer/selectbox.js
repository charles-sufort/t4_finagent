class SelectBox extends Panel{
	constructor(options,sel_func){
		super();
		this.options = options;
		this.sel_func = sel_func;
	}

	build(div_id){
		this.create_div(div_id)
		this.add_id("sel_elem");
		const sel_elem = document.createElement("select");
		sel_elem.setAttribute("id",this.id_dict["sel_elem"]);
		this.div.appendChild(sel_elem);
		this.addOption("","select");
		for (var i = 0; i<this.options.length; i++){
			this.addOption(this.options[i],this.options[i]);
		}
	}

	setFunc(sel_func){
		const sel_elem = document.getElementById(this.id_dict["sel_elem"]);
		sel_elem.setAttribute("onchange",sel_func);
	}

	addOption(value,text){
		const sel_elem = document.getElementById(this.id_dict["sel_elem"]);
		const opt = document.createElement("option");
		opt.setAttribute("value",value);
		opt.innerHTML = text;
		sel_elem.appendChild(opt)

	}

	removeOptions(){
		const sel_elem = document.getElementById(this.id_dict["sel_elem"]);
		sel_elem.innerHTML = "";
		this.addOption("","select");
	}
	
	getSelected(){
		const sel_elem = document.getElementById(this.id_dict["sel_elem"]);
		return sel_elem.options[sel_elem.selectedIndex].value;
	}
}
