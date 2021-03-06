display_possible = ['block', 'compact', 'flex', 'inline', 'inline-block', 'inline-flex',
			'inline-table', 'list-item', 'marker', 'none', 'run-in', 'table',
			'table-caption', 'table-cell', 'table-column', 'table-column-group',
			'table-footer-group', 'table-header-group', 'table-row', 'table-row-group',
			'initial', 'inherit'];

position_possible = ['static', 'absolute', 'fixed', 'relative', 'sticky', 'initial',
			'inherit'];


class Aro {

	constructor(elem) {
		this.elem = elem;
		console.log("Element by id " + elem);
		this.ch_count = 0;
		this.linked_objs = new Object();

		var e = document.getElementById(this.elem);
		

		var att = e.attributes;
		for(var i=0; i<att.length; i++) {
			this.setCustomProps(e, att[i].nodeValue, att[i].nodeName);
		}
	}

	//Set innerHTML of a DOM element
	setText(text) {
		var e = document.getElementById(this.elem);
		e.innerHTML = text;
	}

	//Set value of a DOM element
	setValue(text) {
		var e = document.getElementById(this.elem);
		e.value = text;
	}

	//Bind an event to the element
	bindEvent(ev, ev_name) {
		var e = document.getElementById(this.elem);
		var obj = {
			owner : this,
			handleEvent : ev
		}
		e.addEventListener(ev_name, obj, false);
	}

	//Bind an onclick event with a 'target' object
	bindEventWithTarg(ev, targ, ev_name) {
		var e = document.getElementById(this.elem);
		var obj = {
			owner : this,
			target : targ,
			handleEvent : ev
		}
		e.addEventListener(ev_name, obj, false);
	}

	//Bind an onclick event with a 'target' and 'input' objects
	bindEventWithTargSrc(ev, inp, targ, event_name) {
		var e = document.getElementById(this.elem);

		inp.inp_pairs.owner = this;
		inp.inp_pairs.target = targ;

		inp.inp_pairs.handleEvent = function() {
			inp.setInputs();
			console.log(inp.inp_pairs.target);
			ev(inp.inp_pairs, inp.inp_pairs.target);
		}

		e.addEventListener(event_name, inp.inp_pairs, false);
	}

	//Bind an onclick event with a 'target' and 'input' objects
	bindEventWithObj(ev, targ_obj, ev_name) {

		var e = document.getElementById(this.elem);
		var obj = {
			owner : this,
			handleEvent : ev
		}

		var _this = this;
		Object.keys(targ_obj).forEach(function(key) {
			obj[key] = targ_obj[key];
		});
		
		e.addEventListener(ev_name, obj, false);
	}

	unbindEvents() {
		var e = document.getElementById(this.elem);
		var new_element = e.cloneNode(true);
		e.parentNode.replaceChild(new_element, e);
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

	//If any custom properties are assigned to the element, set them
	setCustomProps(e, value, prop_name) {
		if(prop_name == 'opacity')
		{
			if(value >= 0.0 && value <= 1.0)
				e.style.opacity = value;
			else
				throw "Opacity Must be between 0.0 and 1.0 for " + this.elem;
		}
		else if(prop_name == 'display')
		{
			if(display_possible.indexOf(value) != -1)
				e.style.display = value;
			else
				throw "Invalid display property for " + this.elem;
		}
		else if(prop_name == 'x')
		{
			e.style.left = value;
		}
		else if(prop_name == 'y')
		{
			e.style.top = value;
		}
		else if(prop_name == 'left')
		{
			e.style.left = value;
		}
		else if(prop_name == 'top')
		{
			e.style.top = value;
		}
		else if(prop_name == 'bottom')
		{
			e.style.bottom = value;
		}
		else if(prop_name == 'right')
		{
			e.style.right = value;
		}
		else if(prop_name == 'position')
		{
			if(position_possible.indexOf(value) != -1)
				e.style.position = value;
			else
				throw "Invalid position property for " + this.elem;
		}
		else if(prop_name == 'color')
		{
			e.style.color = value;
		}
		else if(typeof this.def_template !== 'undefined'){
			e.innerHTML = e.innerHTML.replace("$" + prop_name + "$", value);
		}
	}

	//Set value of a custom/legacy attribute
	setProp(value, prop_name) {
		var e = document.getElementById(this.elem);
		e.setAttribute(prop_name, value);

		e.innerHTML = this.def_template;
		var att = e.attributes;
		for(var i=0; i<att.length; i++) {
			this.setCustomProps(e, att[i].nodeValue, att[i].nodeName);
		}
	}

	getValue() {
		var e = document.getElementById(this.elem);
		return(e.value);
	}

	getProp(prop_name) {
		var e = document.getElementById(this.elem);
		return(e.getAttribute(prop_name));
	}

	//return the clone of the corresponding DOM element
	getClonedDOM() {
		var e = document.getElementById(this.elem);
		return(e.cloneNode(true));
	}

	//Append children to the element based on the passed array of objects
	append(values, child) {

		var e = document.getElementById(this.elem);

		for(var i = 0; i<values.length; i++) {
			var child_clone = child.getClonedDOM();
			child_clone.id = this.elem + "_child" + this.ch_count;
			this.ch_count++;
			child_clone.style.display = "list-item";
			e.appendChild(child_clone);

			var child_clone_aro = new Aro(child_clone.id);
			
			//store the template for future updates
			child_clone_aro.def_template = child_clone.innerHTML;

			Object.keys(values[i]).forEach(function(key) {
				console.log('replacing ' + key);

				var phvalue = child_clone.innerHTML;
				child_clone.innerHTML = phvalue.replace("$" + key + "$", values[i][key]);
				
				if(key == 'onclick')
				{
					child_clone_aro.bindEventWithObj(values[i][key], 
						child_clone_aro.linked_objs, 'click');
				}
				else if(key.startsWith("$"))
				{
					child_clone_aro.linked_objs[key] = values[i][key];
				}
				else
				{
					child_clone_aro.setProp(values[i][key], key);
				}
				
			});	
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
