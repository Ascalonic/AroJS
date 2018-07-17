# AroJS
AroJS is Javascript framework for building webapps with great flexibility and speed. Following are some of its features:

### Bridged gap between CSS and HTML
You can specify many of the CSS style values directly upon the element creation in HTML as attributes

```HTML
<!-- Opacity specified as a custom attribute -->
<p id="para" opacity="0.5">Hello</p>
```

```javascript
/* Create the Aro Object by specifying element ID
Upon this creation, Aro automatically sets the CSS opacity 
property using the attribute specified*/
let aro_para = new Aro("para");
```

You set these properties in Javascript:
```javascript
aro_para.setProp("20px", "top");
```

Aro also provide instant validation of these properties
```HTML
<!-- Opacity specified as a custom attribute -->
<p id="para" opacity="0.5">Hello</p>
```

will throw the exception:
```
Opacity Must be between 0.0 and 1.0 for para
```

### Easy and dynamic form Handling even without using HTML forms
```HTML
<p>Value of A:</p>
<input type="text" id="val_a"></input><br/>
<p>Value of B:</p>
<input type="text" id="val_b"></input><br/>	
<button id="sum_btn">Sum</button><br/>
<p id="ans"></p>
```

Which can be handled as:
```javascript
//Create AroForm object passing the placeholder names and corresponding IDs
let aro_inp = new AroForm({inp_a:"val_a", inp_b:"val_b"});

let aro_sum = new Aro("ans");
let aro_btn = new Aro("sum_btn");

//dynamically bind an event to Aro object
aro_btn.bindEventWithTargSrc(function(input, output) {
    //input.* to access the input from the corresponding field
    output.setText(parseInt(input.inp_a) + parseInt(input.inp_b));
}, aro_inp, aro_sum, 'click');
```
