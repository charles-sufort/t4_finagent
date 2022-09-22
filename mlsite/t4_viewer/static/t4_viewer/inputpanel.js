class InputPanel{
	constructor(div_id,lbl,func) {
		const div  = document.getElementById(div_id);
		const label = document.createElement("label");
		const input = document.createElement("input");
		const submit = document.createElement("button");
		const input_id = div_id + "input";
		input.setAttribute("id",input_id);
		submit.setAttribute("onclick",func);
		label.innerHTML = lbl;
		div.appendChild(label);
		div.appendChild(input);
		div.appendChild(submit);
	}

	get_input(){
		return document.getElementById(div_id+"input").value;
	}





}
