class DataTree {
	constructor (div_id,name,client){
		this.div_id = div_id;
		this.name = name;
		this.client = client;
		this.id_dict = {};
		this.cls_dict = {};
		this.elem_count = 0;
	}

	build(){
		const div = document.getElementById(this.div_id);
		const div_load_cmp = document.createElement("div");

		this.elem_count = this.elem_count + 1;
		this.id_dict["load_cmp"] = this.div_id + "." + this.elem_count.toString();
		div_load_cmp.setAttribute("id",this.id_dict["load_cmp"]);
		div.appendChild(div_load_cmp);
		const load_func = this.name + ".load_company()";
		const load_cmp = new InputPanel(this.id_dict["load_cmp"],"Company:",load_func);
		this.cls_dict["load_cmp"] = load_cmp;
		div.append(div_load_cmp);
	}

	load_company(){
		const company = this.cls_dict["load_cmp"].get_input();
		const obj = this;
		const load_func = function (resp){
			const response = JSON.parse(resp);
			obj.save_tree(response);
		}
		this.client.get_datatree(company,load_func);

	}

	save_tree(response){
		const div1 = document.createElement("div");
		const div2 = document.createElement("div");
		const prod_box = document.createElement("select");
		const subprod_box = document.createElement("select");
		const issue_box = document.createElement("select");
		const subissue_box = document.createElement("select");
		prod_box.setAttribute("size",10);
		subprod_box.setAttribute("size",10);
		issue_box.setAttribute("size",10);
		subissue_box.setAttribute("size",10);
		this.elem_count = this.elem_count + 1;
		id_dict["product_box"] = this.div_id + "." + this.elem_count.to_string();
		this.elem_count = this.elem_count + 1;
		id_dict["subproduct_box"] = this.div_id + "." + this.elem_count.to_string();
		this.elem_count = this.elem_count + 1;
		id_dict["issue_box"] = this.div_id + "." + this.elem_count.to_string();
		this.elem_count = this.elem_count + 1;
		id_dict["subissue_box"] = this.div_id + "." + this.elem_count.to_string();
		prod_box.setAttribute("id",id_dict["product_box"]);
		subprod_box.setAttribute("id",id_dict["subproduct_box"]);
		issue_box.setAttribute("id",id_dict["issue_box"]);
		subissue_box.setAttribute("id",id_dict["subissue_box"]);

	}
}
