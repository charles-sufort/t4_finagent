class DataTree extends Panel{
	constructor (div_id,name,client){
		super();
		this.div_id = div_id;
		this.name = name;
		this.client = client;
		this.tree = null;
		this.company = null;
	}

	build(){
		const div = document.getElementById(this.div_id);
		const div_load_cmp = document.createElement("div");
		const company_lbl = document.createElement("label");
		this.elem_count = this.elem_count + 1;
		this.id_dict["load_panel"] = this.div_id + "." + this.elem_count.toString();
		div_load_cmp.setAttribute("id",this.id_dict["load_panel"]);
		div.appendChild(div_load_cmp);
		this.get_companies();
		const div_ction = document.createElement("div");
		this.add_id("treepanel");
		const div_tree = document.createElement("div");
		div_tree.setAttribute("id",this.id_dict["treepane"]);
		div.appendChild(div_tree);
		this.add_id("ctionpanel");
		div_ction.setAttribute("id",this.id_dict["ctionpanel"]);
		name = this.name + ".cls_dict['ctionpanel']";
		div.appendChild(div_ction);
		this.cls_dict["ctionpanel"] = new CtionPanel(this.id_dict["ctionpanel"],name,this.client);
		this.cls_dict["ctionpanel"].build();
	}


	get_companies(){
		const obj = this;
		const load_func = function (resp){
			const response = JSON.parse(resp);
			obj.display_companies(response);
		}
		client.get_companies(load_func);
	}

	display_companies(response){
		const div_load = document.getElementById(this.id_dict["load_panel"]);
		const label = document.createElement("label");
		const cmp_list = document.createElement("select");
		const load_func = this.name + ".load_company()";
		const load_btn = document.createElement("button");
		this.elem_count = this.elem_count + 1;
		this.id_dict["cmp_list"] = this.div_id + "." + this.elem_count.toString();
		cmp_list.setAttribute("id",this.id_dict["cmp_list"]);
		load_btn.setAttribute('onclick',load_func);
		div_load.appendChild(label);
		div_load.appendChild(cmp_list);
		div_load.appendChild(load_btn);
		load_btn.innerHTML = "load";
		const companies = response["companies"];
		companies.sort();
		const opt_def = document.createElement("option");
		opt_def.setAttribute("value","");
		opt_def.innerHTML = "Select Company";
		cmp_list.appendChild(opt_def);
		for (var i = 0; i<companies.length; i++){
			const opt_cmp = document.createElement("option");
			opt_cmp.setAttribute("value",companies[i]);
			opt_cmp.innerHTML = companies[i];
			cmp_list.appendChild(opt_cmp);
		}
	}


	load_company(){
		const cmp_list = document.getElementById(this.id_dict["cmp_list"]);
		 this.company = cmp_list.options[cmp_list.selectedIndex].value;
		const obj = this;
		const load_func = function (resp){
			const response = JSON.parse(resp);
			obj.save_tree(response);
		}
		this.client.get_datatree(this.company,load_func);

	}

	save_tree(response){
		const div = document.getElementById(this.id_dict["datatree"]);
		const div1 = document.createElement("div");
		const div2 = document.createElement("div");
		const prod_div = document.createElement("div");
		const subprod_div = document.createElement("div");
		const issue_div = document.createElement("div");
		const subissue_div = document.createElement("div");
		this.tree = response["datatree"];
		this.elem_count = this.elem_count + 1;
		this.id_dict["product_div"] = this.div_id + "." + this.elem_count.toString();
		this.elem_count = this.elem_count + 1;
		this.id_dict["issue_div"] = this.div_id + "." + this.elem_count.toString();
		div1.setAttribute("id",this.id_dict["product_div"]);
		div2.setAttribute("id",this.id_dict["issue_div"]);
		div.appendChild(div1);
		div.appendChild(div2);
		const item_func = x => x[0];
		this.cls_dict["product_box"] = new ListBox(this.id_dict["product_div"],10,item_func);
		this.cls_dict["subproduct_box"] = new ListBox(this.id_dict["product_div"],10,item_func);
		this.cls_dict["issue_box"] = new ListBox(this.id_dict["issue_div"],10,item_func);
		this.cls_dict["subissue_box"] = new ListBox(this.id_dict["issue_div"],10,item_func);
		console.log(this.company);
		const obj = this;
		const prod_func = function (lbox) {
			obj.subproduct_list();
		}
		const subprod_func = function (lbox) {
			obj.issue_list();
		}
		const issue_func = function (lbox) {
			obj.subissue_list();
		}
		this.cls_dict["product_box"].addEventFunc("Enter",prod_func);
		this.cls_dict["subproduct_box"].addEventFunc("Enter",subprod_func);
		this.cls_dict["issue_box"].addEventFunc("Enter",issue_func);
		this.product_list();
		const boxes = ["product_box","subproduct_box","issue_box","subissue_box"];
		for (var i = 0; i< boxes.length; i++){
			console.log(i);
			console.log(boxes[i]);
			const ind = i;
			this.cls_dict[boxes[i]].addEventFunc("a",function(){
				console.log(boxes);
				console.log(boxes[ind]);
				console.log(ind);
				const val = [obj.company,"NA","NA","NA","NA"];
				for (var j = 0; j <= ind; j++){
					console.log(j);
					console.log(val);
					val[j+1] = obj.cls_dict[boxes[j]].getSelected();
				}
				obj.cls_dict["ctionpanel"].add_vec(val);
			});
		}
	}

	product_list(){
		this.cls_dict["product_box"].removeItems()
		this.cls_dict["subproduct_box"].removeItems()
		this.cls_dict["issue_box"].removeItems()
		this.cls_dict["subissue_box"].removeItems()
		const products = Object.keys(this.tree["nodes"]);
		const product_data = [];
		for (var i = 0; i< products.length; i++){
			this.cls_dict["product_box"].addItem([products[i],this.tree["nodes"][products[i]]["count"]]);
		}
		console.log(product_data);
		}

	subproduct_list(){
		this.cls_dict["subproduct_box"].removeItems()
		this.cls_dict["issue_box"].removeItems()
		this.cls_dict["subissue_box"].removeItems()
		const product = this.cls_dict["product_box"].getSelected();
		const subproducts = Object.keys(this.tree["nodes"][product]["nodes"]);
		const subproduct_data = [];
		for (var i = 0; i<subproducts.length; i++){
			this.cls_dict["subproduct_box"].addItem([subproducts[i],this.tree["nodes"][product]["nodes"][subproducts[i]]["count"]]);
		}
	}

	issue_list(){

		this.cls_dict["issue_box"].removeItems()
		this.cls_dict["subissue_box"].removeItems()
		const product = this.cls_dict["product_box"].getSelected();
		const subproduct = this.cls_dict["subproduct_box"].getSelected();

		const issues = Object.keys(this.tree["nodes"][product]["nodes"][subproduct]["nodes"]);
		const issue_data = [];
		for (var i = 0; i<issues.length; i++){
			this.cls_dict["issue_box"].addItem([issues[i],this.tree["nodes"][product]["nodes"][subproduct]["nodes"][issues[i]]["count"]]);
		}
	}

	subissue_list(){
		this.cls_dict["subissue_box"].removeItems()
		const product = this.cls_dict["product_box"].getSelected();
		const subproduct = this.cls_dict["subproduct_box"].getSelected();

		const issue = this.cls_dict["issue_box"].getSelected();
		const subissues = Object.keys(this.tree["nodes"][product]["nodes"][subproduct]["nodes"][issue]["nodes"]);
		const subissue_data = [];
		for (var i = 0; i<subissues.length; i++){
			this.cls_dict["subissue_box"].addItem([subissues[i],this.tree["nodes"][product]["nodes"][subproduct]["nodes"][issue]["count"]]);
		}
	}
}
