class ListBox {
	constructor(div_id) {
		const div = document.getElementById(div_id);
		this.box = document.createElement("select");
		const box_id = div_id + "box";
		this.div_id = div_id;
		box.setAttribute("id",box_id);
		div.appendChild(box);
	}

	addItem(item) {
		const opt = document.createElement("option");
		opt.setAttribute("value",item);
		opt.innerHTML = item;
		this.box.appendChild(opt);
	}
	
	removeItems(){
		this.box.innerHTML = "";
	}

	addEventFunc(key,func){
		this.box.addEventListener('keypress',(event) => {
			if (event.key == key){
				func(this);
			}
		}
	}


}
