class Panel {
	constructor(){
		this.id_dict = {};
		this.cls_dict = {};
		this.elem_count = 0;
	}

	add_id(name){
		this.elem_count = this.elem_count + 1;
		this.id_dict[name] = this.div_id + this.elem_count.toString();
	}

}

