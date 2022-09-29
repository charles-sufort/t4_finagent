class InputPanel extends Panel{
	constructor(div_id,lbl,func) {
		super();
		const div  = document.getElementById(div_id);
		const label = document.createElement("label");
		const input = document.createElement("input");
		const submit = document.createElement("button");
		this.add_id("input");
		input.setAttribute("id",this.id_dict["input"]);
		submit.setAttribute("onclick",func);
		label.innerHTML = lbl;
		submit.innerHTML = "submit";
		div.appendChild(label);
		div.appendChild(input);
		div.appendChild(submit);
	}

	getInput(){
		return document.getElementById(this.id_dict["input"]).value;
	}





}
