class InputPanel2 extends PanelComponent{
	constructor(lbl,func) {
		super();
		this.func = func;
		this.lbl = lbl;
	}

	build_inner(){
		const label = document.createElement("label");
		const input = document.createElement("input");
		const submit = document.createElement("button");
		this.add_id("input");
		input.setAttribute("id",this.id_dict["input"]);
		submit.setAttribute("onclick",this.func);
		label.innerHTML = this.lbl;
		submit.innerHTML = "submit";
		this.div.appendChild(input);
		this.div.appendChild(label);
		this.div.appendChild(submit);

	}

	getInput(){
		return document.getElementById(this.id_dict["input"]).value;
	}





}
