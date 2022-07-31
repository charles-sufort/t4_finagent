function input_panel(id,type,label_text,fun,elem_id) {
	label = document.createElement("label");
	input = document.createElement("input");
	submit = document.createElement("button");
	elem = document.getElementById(elem_id);
	elem.innerHTML = "";
	label.setAttribute("for",id);
	label.innerHTML = label_text;
	input.setAttribute("id",id);
	input.setAttribute("type",type);
	submit.setAttribute("onclick",fun);
	submit.innerHTML = "Submit";
	elem.appendChild(label);
	elem.appendChild(input);
	elem.appendChild(submit);
}
