class InputPanel{
	constructor(div_id,lbl,func) {
		const div  = document.getElementById(div_id);
		const label = document.createElement("label");
		const input = document.createElement("input");
		const submit = document.createElement("button");
		this.id_dict = {}
		this.div_id = div_id;
		this.id_dict["input"] = this.div_id + ".1";
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
