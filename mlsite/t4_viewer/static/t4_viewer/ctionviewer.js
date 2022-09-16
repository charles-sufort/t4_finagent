class CtionViewer {
	constructor(div_id,name,client){
		this.client = client;
		this.input_id = div_id + "ction";
		this.div_id = div_id;
		this.name = name;
		console.log("here");
		console.log(this.div_id);
		const div = document.getElementById(div_id);
		const ction_label = document.createElement("label");
		const ction_input = document.createElement("input");
		const submit = document.createElement("button");
		this.cdict = {}

		ction_label.innerHTML = "Ction:";
				this.load_fun = function () {
			const response = this.response;
			console.log("inner fun");
			display_fun(response,display_fun);
		}
		const submit_func = name + ".load_ction()";
		submit.setAttribute("onclick",submit_func);
		ction_input.setAttribute("id",this.input_id);
		submit.innerHTML = "load";
		div.appendChild(ction_label);
		div.appendChild(ction_input);
		div.appendChild(submit);
	}
	
	load_ction(load_fun){
		var obj = this;
		console.log("load_ction");
		console.log(this);
		client.load_ction(this.input_id,function () {
			const response = this.response;
			console.log(obj)
			obj.load_display(response);
		}
		);
	}

	load_display(response,display_fun){
		console.log("this display");
		console.log(response);
		const div = document.getElementById(this.div_id);
		const div_cls = document.createElement("div");
		const div_vec = document.createElement("div");
		const select_cls = document.createElement("select");
		const cls_fun = this.name + ".change_class('this.selectedIndex')";
		this.cdict = JSON.parse(response);
		console.log(this.cdict["ction"]);
		const classes = Object.keys(this.cdict["ction"]);
		select_cls.setAttribute('onchange',cls_fun);
		const cls_id = this.div_id + "select_cls";
		const vec_id = this.div_id + "select_vec";
		select_cls.setAttribute('id',cls_id);
		const select_vecs = document.createElement("select");
		const opt_default = document.createElement("option");
		opt_default.setAttribute('selected',true);
		opt_default.setAttribute('value',"");
		select_vecs.setAttribute('size',20);
		select_vecs.setAttribute('id',vec_id);
		opt_default.innerHTML = "Select option";
		for(var i= 0; i< classes.length; i++){
			const opt_cl = document.createElement("option");
			opt_cl.setAttribute('value',classes[i]);
			opt_cl.innerHTML = classes[i];
			select_cls.appendChild(opt_cl);
		}
		div.appendChild(div_cls);
		div.appendChild(div_vec);
		div_cls.appendChild(select_cls);
		div_vec.appendChild(select_vecs);
	}

	change_class(index){
		const cl_id = this.div_id + "select_cls";
		const vec_id = this.div_id + "select_vec";
		const select_cl = document.getElementById(cl_id);
		const select_vecs = document.getElementById(vec_id);
		const cls = select_cl.options[select_cl.selectedIndex].value;
		const cls_vecs = this.cdict["ction"][cls];
		select_vecs.innerHTML = "";
		console.log(cls_vecs);
		for(var i = 0; i< cls_vecs.length; i++){
			const vec_cl = document.createElement("option");
			vec_cl.setAttribute('value',cls_vecs[i]);
			vec_cl.innerHTML = cls_vecs[i];
			select_vecs.appendChild(vec_cl);
		}
		
	}

}
