class InputPanel extends PanelComponent{
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
		this.div.appendChild(label);
		this.div.appendChild(input);
		this.div.appendChild(submit);

	}

	getInput(){
		return document.getElementById(this.id_dict["input"]).value;
	}
}
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
		submit.innerHTML = this.lbl;
		this.div.appendChild(input);
		this.div.appendChild(submit);

	}

	getInput(){
		const val = document.getElementById(this.id_dict["input"]).value
		return val;
	}


}

class SelectPanel extends PanelComponent{
	constructor(lbl,options,func){
		super();
		this.func = func;
		this.lbl = lbl;
		this.options = options;
	}

	build_inner(){
		const label = document.createElement("label");
		this.add_id("select");
		const select = document.createElement("select");
		const submit = document.createElement("button");
		select.setAttribute("id",this.id_dict["select"]);
		submit.setAttribute("onclick",this.func);
		label.innerHTML = this.lbl;
		submit.innerHTML = "Submit";
		this.div.appendChild(label);
		this.div.appendChild(select);
		for (var i = 0; i<this.options.length; i++){
			const option = document.createElement("option");
			option.setAttribute("value",this.options[i]);
			option.innerHTML = this.options[i];
			select.appendChild(option);
		}
		this.div.appendChild(submit);
	}


	getSelected(){
		const sel_elem = document.getElementById(this.id_dict["select"]);
		return sel_elem.options[sel_elem.selectedIndex].value;
	}

}

class SelectPanel2 extends PanelComponent{
	constructor(lbl,options){
		super();
		this.lbl = lbl;
		this.options = options;
	}

	build_inner(){
		const label = document.createElement("label");
		this.add_id("select");
		const select = document.createElement("select");
		select.setAttribute("id",this.id_dict["select"]);
		label.innerHTML = this.lbl;
		this.div.appendChild(label);
		this.div.appendChild(select);
		for (var i = 0; i<this.options.length; i++){
			const option = document.createElement("option");
			option.setAttribute("value",this.options[i]);
			option.innerHTML = this.options[i];
			select.appendChild(option);
		}
	}


	getSelected(){
		const sel_elem = document.getElementById(this.id_dict["select"]);
		return sel_elem.options[sel_elem.selectedIndex].value;
	}

}



class InputPanel3 extends PanelComponent{
	constructor(lbl) {
		super();
		this.lbl = lbl;
	}

	build_inner(){
		const label = document.createElement("label");
		const input = document.createElement("input");
		this.add_id("input");
		input.setAttribute("id",this.id_dict["input"]);
		label.innerHTML = this.lbl;
		this.div.appendChild(label);
		this.div.appendChild(input);

	}

	getInput(){
		return document.getElementById(this.id_dict["input"]).value;
	}

	addSubmit(func){
		const submit = document.createElement("button");
		submit.setAttribute("onclick",func);
		this.div.appendChild(submit);
	}
}

class Button extends PanelComponent{
	constructor(lbl,func){
		super();
		this.lbl = lbl;
		this.func = func;
	}

	build_inner(){
		const button = document.createElement("button");
		button.setAttribute("onclick", this.func);
		button.innerHTML = this.lbl;
		this.div.appendChild(button);
	}

}

class LabelButton extends PanelComponent{
	constructor(lbl1,lbl2){
		super();
		this.lbl1 = lbl1;
		this.lbl2 = lbl2;
	}

	build_inner(){
		const label = document.createElement("label");
		label.innerHTML = this.lbl1;
		const button = document.createElement("button");
		button.innerHTML = this.lbl2;
		this.add_id("button");
		button.setAttribute("id",this.id_dict["button"]);
		this.div.appendChild(label);
		this.div.appendChild(button);
	}

	set_label(lbl){
		const button = document.getElementById(this.id_dict["button"]);
		button.innerHTML = lbl;
	}

}
