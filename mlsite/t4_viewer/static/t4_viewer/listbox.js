class ListBox {
	constructor(div_id,size,add_func) {
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

	addItem(item,value_func) {
		const opt = document.createElement("option");
		opt.setAttribute("value",item[0]);
		opt.innerHTML = item;
		this.box.appendChild(opt);
	}

	getItems(){
		const items = [];
		for( var i = 0; i<this.box.selectedIndex; i++){
			items[i] = this.box.options[i];
		}
		return items;

	}
	
	removeItems(){
		this.box.innerHTML = "";
	}

	

	addEventFunc(key,func){
		const obj = this;
		this.box.addEventListener('keypress',(event) => {
			if (event.key == key){
				func(obj);
			}
		})
	}


}
