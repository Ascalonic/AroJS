class Aro {

	constructor(elem) {
		this.elem = elem;
		console.log("Element by id " + elem);
	}

	//Set innerHTML of a DOM element
	setText(text) {
		var e = document.getElementById(this.elem);
		e.innerHTML = text;
	}

	//Bind an onclick event to the element
	bindClick(ev) {
		var e = document.getElementById(this.elem);
		var obj = {
			owner : this,
			handleEvent : ev
		}
		e.addEventListener('click', obj, false);
	}

	//Bind an onclick event with a 'target' object
	bindClickWithTarg(ev, targ) {
		var e = document.getElementById(this.elem);
		var obj = {
			owner : this,
			target : targ,
			handleEvent : ev
		}
		e.addEventListener('click', obj, false);
	}

	//Bind an onclick event with a 'target' and 'input' objects
	bindEventWithTargSrc(ev, inp, targ, ev_name) {
		var e = document.getElementById(this.elem);

		inp.inp_pairs.owner = this;
		inp.inp_pairs.target = targ;

		inp.inp_pairs.handleEvent = function() {
			inp.setInputs();
			console.log(inp.inp_pairs.target);
			ev(inp.inp_pairs, inp.inp_pairs.target);
		}

		e.addEventListener('click', inp.inp_pairs, false);
	}

	//Set visibility of the element (true : visible)
	setVisible(visible) {
		var e = document.getElementById(this.elem);

		if(visible) {
			e.style.display = "block";
		}
		else {
			e.style.display = "none";
		}
	}

	//Toggle visibility of the element
	toggleVisible() {
		var e = document.getElementById(this.elem);

		if(e.style.display == "block") {
			e.style.display = "none";
		}
		else {
			e.style.display = "block";
		}
	}	
}


class AroForm {

	constructor(inp) {
		this.inp = inp;
		this.inp_pairs = new Object();
		console.log("Initialized form");
	}

	setInputs() {
		var _this = this;
		Object.keys(this.inp).forEach(function(key) {
			_this.inp_pairs[key] = document.getElementById(_this.inp[key]).value;
		});
	}

}