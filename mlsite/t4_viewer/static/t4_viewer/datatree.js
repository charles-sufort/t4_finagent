class DataTree extends PanelComponent{
	constructor (name,client){
		super();
		this.name = name;
		this.client = client;
		this.tree = null;
		this.company = null;
	}

	build_inner(){
		this.add_panel("load_panel");
		this.get_companies();
		this.add_panel("datatree_panel");
		const ction_name = this.name + ".cls_dict['ctionpanel']";
		this.add_component("ctionpanel", new CtionPanel(ction_name,this.client));
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
		const load_panel = this.panel_dict["load_panel"];
		const companies = response["companies"];
		companies.sort();
		const load_func = this.name + ".load_company()";
		load_panel.add_component("select_company",new SelectPanel("Companies:",companies,load_func));
	}


	load_company(){
		const load_panel = this.panel_dict["load_panel"];

		this.company = load_panel.cls_dict["select_company"].getSelected();
		const obj = this;
		const load_func = function (resp){
			const response = JSON.parse(resp);
			obj.save_tree(response);
		}
		this.client.get_datatree(this.company,load_func);

	}

	save_tree(response){
		const datatree_panel = this.panel_dict["datatree_panel"];
		datatree_panel.reset();
		datatree_panel.add_panel("products_panel");
		datatree_panel.add_panel("issues_panel");

		const p_panel = datatree_panel.panel_dict["products_panel"];
		const i_panel = datatree_panel.panel_dict["issues_panel"];
		i_panel.div.setAttribute("style","display: flex");
		p_panel.div.setAttribute("style","display: flex");
		p_panel.add_panel("product_panel");
		p_panel.add_panel("subproduct_panel");
		i_panel.add_panel("issue_panel");
		i_panel.add_panel("subissue_panel");
		this.tree = response["datatree"];
		const item_func = x => x[0];
		p_panel.add_component("product_box", new ListBox(10,item_func));
		p_panel.add_component("subproduct_box", new ListBox(10,item_func));
		i_panel.add_component("issue_box", new ListBox(10,item_func));
		i_panel.add_component("subissue_box", new ListBox(10,item_func));

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
		p_panel.cls_dict["product_box"].addEventFunc("Enter",prod_func);
		p_panel.cls_dict["subproduct_box"].addEventFunc("Enter",subprod_func);
		i_panel.cls_dict["issue_box"].addEventFunc("Enter",issue_func);
		this.product_list();
		const boxes = [p_panel.cls_dict["product_box"],p_panel.cls_dict["subproduct_box"],i_panel.cls_dict["issue_box"],i_panel.cls_dict["subissue_box"]];
		for (var i = 0; i< boxes.length; i++){
			console.log(i);
			console.log(boxes[i]);
			const ind = i;
			boxes[i].addEventFunc("a",function(){
				console.log(boxes);
				console.log(boxes[ind]);
				console.log(ind);
				const val = [obj.company,"NA","NA","NA","NA"];
				for (var j = 0; j <= ind; j++){
					console.log(j);
					console.log(val);
					val[j+1] = boxes[j].getSelected();
				}
				obj.cls_dict["ctionpanel"].add_vec(val);
			});
		}
	}

	product_list(){
		const datatree_panel = this.panel_dict["datatree_panel"];

		const p_panel = datatree_panel.panel_dict["products_panel"];
		const i_panel = datatree_panel.panel_dict["issues_panel"];
		p_panel.cls_dict["product_box"].removeItems();
		p_panel.cls_dict["subproduct_box"].removeItems();
		i_panel.cls_dict["issue_box"].removeItems();
		i_panel.cls_dict["subissue_box"].removeItems();
		const products = Object.keys(this.tree["nodes"]);
		const product_data = [];
		for (var i = 0; i< products.length; i++){
			p_panel.cls_dict["product_box"].addItem([products[i],this.tree["nodes"][products[i]]["count"]]);
		}
		console.log(product_data);
		}

	subproduct_list(){
		const datatree_panel = this.panel_dict["datatree_panel"];
		const p_panel = datatree_panel.panel_dict["products_panel"];
		const i_panel = datatree_panel.panel_dict["issues_panel"];
		p_panel.cls_dict["subproduct_box"].removeItems();
		i_panel.cls_dict["issue_box"].removeItems();
		i_panel.cls_dict["subissue_box"].removeItems();
		const product = p_panel.cls_dict["product_box"].getSelected();
		const subproducts = Object.keys(this.tree["nodes"][product]["nodes"]);
		const subproduct_data = [];
		for (var i = 0; i<subproducts.length; i++){
			p_panel.cls_dict["subproduct_box"].addItem([subproducts[i],this.tree["nodes"][product]["nodes"][subproducts[i]]["count"]]);
		}
	}

	issue_list(){
		const datatree_panel = this.panel_dict["datatree_panel"];
		const p_panel = datatree_panel.panel_dict["products_panel"];
		const i_panel = datatree_panel.panel_dict["issues_panel"];
		i_panel.cls_dict["issue_box"].removeItems();
		i_panel.cls_dict["subissue_box"].removeItems();
		const product = p_panel.cls_dict["product_box"].getSelected();
		const subproduct = p_panel.cls_dict["subproduct_box"].getSelected();
		const issues = Object.keys(this.tree["nodes"][product]["nodes"][subproduct]["nodes"]);
		const issue_data = [];
		for (var i = 0; i<issues.length; i++){
			i_panel.cls_dict["issue_box"].addItem([issues[i],this.tree["nodes"][product]["nodes"][subproduct]["nodes"][issues[i]]["count"]]);
		}
	}

	subissue_list(){
		const datatree_panel = this.panel_dict["datatree_panel"];
		const p_panel = datatree_panel.panel_dict["products_panel"];
		const i_panel = datatree_panel.panel_dict["issues_panel"];
		i_panel.cls_dict["subissue_box"].removeItems();
		const product = p_panel.cls_dict["product_box"].getSelected();
		const subproduct = p_panel.cls_dict["subproduct_box"].getSelected();
		const issue = i_panel.cls_dict["issue_box"].getSelected();
		const subissues = Object.keys(this.tree["nodes"][product]["nodes"][subproduct]["nodes"][issue]["nodes"]);
		const subissue_data = [];
		for (var i = 0; i<subissues.length; i++){
			i_panel.cls_dict["subissue_box"].addItem([subissues[i],this.tree["nodes"][product]["nodes"][subproduct]["nodes"][issue]["nodes"][subissues[i]]["count"]]);
		}
	}
}
