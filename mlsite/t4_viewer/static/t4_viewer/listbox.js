class ListBox {
	constructor(div_id,size,item_func) {
		console.log(div_id);
		const div = document.getElementById(div_id);
		this.box = document.createElement("select");
		this.box.setAttribute("size",size);
		const box_id = div_id + "box";
		this.div_id = div_id;
		console.log(div);
		this.box.setAttribute("id",box_id);
		div.appendChild(this.box);
		this.addKeyBindings();
		this.items = new Set();
		this.items_dict = {}
		this.item_func = item_func;
	}

	addKeyBindings(){
		this.box.addEventListener('keypress',(event) => {
			if (event.key == 'j'){
				if (this.box.selectedIndex < this.box.length-1){
					this.box.selectedIndex = this.box.selectedIndex + 1;
				}

			}
			if (event.key == "k"){
				if (this.box.selectedIndex > 0){
					this.box.selectedIndex = this.box.selectedIndex - 1;
				}
			}
			if (event.key == "Enter"){
				console.log("here Enter");
			}
		})
	}

	addItem(item) {
		if (! this.items.has(this.item_func(item))){
			this.items.add(this.item_func(item));
			const opt = document.createElement("option");
			opt.setAttribute("value",this.item_func(item));
			this.items_dict[this.item_func(item)] = item;
			opt.innerHTML = item.toString();
			this.box.appendChild(opt);
		}
	}

	getItems(){
		return Array.from(this.items);
	}
	
	getSelected(){
		return this.box.options[this.box.selectedIndex].value;
	}

	removeItems(){
		this.box.innerHTML = "";
		this.items = new Set();
	}

	removeItem(item){
		if ( this.items.has(item)){
			const item_val = this.items_dict[item];
			this.items.delete(item);
			delete this.items_dict[item];
			for ( var i = 0; i<this.box.length; i++){

				if (this.box.options[i].value === item_val.toString()){
					this.box.remove(i);
				}
			}
		}
	}

	addEventFunc(key,func){
		const obj = this;
		this.box.addEventListener('keypress',(event) => {
			if (event.key == key){
				func(obj);
			}
		})
	}

	apply_clist(type,termset){
		if (type == "blacklist"){
			for (const item of termset){
				this.removeItem(item);
			}
		}
		if (type == "whitelist"){
			const items = this.items;
			const items_dict = this.items_dict;
			this.removeItems();
			for (const key of items){
				if (termset.has(key)){
					this.addItem(items_dict[key]);
				}
			}
		}
	}
}
