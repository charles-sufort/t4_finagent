class PanelComponent extends Panel {
	constructor(){
		super();
	}

	build(div_id){
		this.create_div(div_id);
		this.build_inner();
	}

	build_inner(){
	}
}
