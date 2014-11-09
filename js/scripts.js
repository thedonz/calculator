/*

	HTML DOM Style Object
		The style object represents an individual style statement. 
		The style object is accessed from the document or from the elements to which that style is applied.
		It represents the in-line styles on a particular element.

		You can set the style properties of an existing element:
		document.getElementById("myH1").style.color = "blue";
		or
		var st = myH1.style;
		st.color = "blue";

	JavaScript Number() Function
		The Number() function converts the object argument to a number that represents the object's value.
		If the value cannot be converted to a legal number, NaN is returned.
		syntax = Number(object)
		ex. Number("123") = 123
		some other global javascript functions: String(), parseInt(), parseFloat(), isNaN(), isFinite(), eval()

*/

document.addEventListener('DOMContentLoaded', function() {

	var emptyall = document.getElementById("clear");
	var myhistory = document.getElementById("history");
	var equalto = document.getElementById("equals");

	var btnblues = document.getElementsByClassName("btn-blue");
	var btngrays = document.getElementsByClassName("btn-gray");

	// add mouseover and mouseleave effects for buttons
	for (i = 0; i < btnblues.length; i++) {
		btnblues[i].addEventListener('mouseover', function() {
			this.style.background = "LightSteelBlue";
		}, false);
	}

	for (i = 0; i < btnblues.length; i++) {
		btnblues[i].addEventListener('mouseleave', function() {
			this.style.background = "#67A7CD";
		}, false);
	}

	for (i = 0; i < btngrays.length; i++) {
		btngrays[i].addEventListener('mouseover', function() {
			this.style.background = "#999999";
		}, false);
	}

	for (i = 0; i < btngrays.length; i++) {
		btngrays[i].addEventListener('mouseleave', function() {
			this.style.background = "#777777";
		}, false);
	}

	for (i = 0; i < 10; i++) { // key events for the keys 0-9 (numpad too)
		(function( i ) {
            window.addEventListener('keypress', function(e) {
                if (e.keyCode === 48 + i || e.keycode === 96 + i) {
	        		operand(i);
	        	}
            }, false);
        })( i );
    }

	window.addEventListener("keydown", function(e){ // key events for all the operator keys
		switch(e.keyCode){
			case e.shiftKey && 187 || 107:
				operator('+');
				break;
			case 109: // the two "-" and "/" cases are currently separated, mysteriously not working with ||
				operator('-');
				break;
			case 189:
				operator('-');
				break;
			case e.shiftKey && 56 || 106:
				operator('*');
				break;
			case 111:
				operator('/');
				break;
			case 191:
				operator('/');
				break;
			case 13 || 187:
				equals(a, b, c);
				break;
		}
	}, false);

	var nums = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

	for (i = 0; i < 10; i++) { // click events for the number keys
		(function( i ) {
            document.getElementById(nums[i]).addEventListener('click', function() {
            	operand(i);
            }, false);
        })( i );
    }

    // click events for the operator keys
	document.getElementById("plus").addEventListener('click', function() {
		operator('+');
	}, false);

	document.getElementById("minus").addEventListener('click', function() {
		operator('-');
	}, false);

	document.getElementById("times").addEventListener('click', function() {
		operator('*');
	}, false);

	document.getElementById("divided").addEventListener('click', function() {
		operator('/');
	}, false);

	// click events for the rest of the keys
	document.getElementById("clear").addEventListener('click', empty, false);
	document.getElementById("history").addEventListener('click', history, false);
	document.getElementById("equals").addEventListener('click', equals, false);

}, false); // end dom content loaded


function operand(n) { // define the operand function, has one parameter, n

	if (a.innerHTML === "Operand") { // if a number has not yet been entered into the first input

		a.innerHTML = n; // the number clicked replaces the "Operand" text

	} else if (b.innerHTML === "Operator") {
	// if a number already exists in the first input, but an operator hasn't been clicked

		a.innerHTML += n; // the number clicked is added to the first operand

	}

	if (b.innerHTML !== "Operator" && c.innerHTML === "Operand") {
	// if an operator has been clicked, and the second operand still reads "Operand"

		c.innerHTML = n; // the number clicked replaces the "Operand" text (the second one)

	} else if (c.innerHTML !== "Operand") {
	// if the second operand is a number, not the starting "Operand" text

		c.innerHTML += n; // the number clicked is added to the second operand

	}
}

function operator(op) { // define the operator function, has one parameter, op

	if (a.innerHTML === "Operand") { // if the first operand has not yet been added

		window.alert("You need to enter the first operand!");

	} else { // if the first operand has already been added

		b.innerHTML = op; // the clicked operator replaces the "Operator" text

	}
}

function empty() {

	a.innerHTML = "Operand"; // reset all the inputs to their default text
	b.innerHTML = "Operator";
	c.innerHTML = "Operand";
}

function history() {

	var story = document.getElementById("story"); // local variable story, the history div

	if (story.style.display === 'block') { // if the history section is visible

		story.style.display = 'none'; // make it invisible
		
	} else {

		story.style.display = 'block'; // otherwise make it visible
	
	}
}

function equals() { // define the equals function, has three parameters, a, b, c

	var answer = "";
	var a = document.getElementById("a").innerHTML; // local variable a, a string, is the first operand
	var b = document.getElementById("b").innerHTML; // local variable b, a string, is the operator
	var c = document.getElementById("c").innerHTML; // local variable c, a string, is the second operand

	if (a !== "Operand" && b !== "Operator" && c !== "Operand") {
	// if all three required inputs for the operation have been entered
	// if a is not "Operand" and b is not "Operator" and c is not "Operand"

		switch (b) { // switch statement, will accept the user-clicked operator as one parameter, b
			case b = "+": // if the argument is the string "+"
				answer = Number(a) + Number(c);
				break;
			case b = "-": // if the argument is the string "-"
				answer = Number(a) - Number(c);
				break;
			case b = "*": // if the argument is the string "*"
				answer = Number(a) * Number(c);
				break;
			case b = "/": // if the argument is the string "/"
				answer = Number(a) / Number(c);
				break;
		}

		document.getElementById("a").innerHTML = answer; // the first operand is set to the answer from the operation
		document.getElementById("b").innerHTML = "Operator"; // the operator is set the the default value of "Operator"
		document.getElementById("c").innerHTML = "Operand"; // the second operand is set to the default value of "Operand"
		document.getElementById("story").innerHTML += "<h2>" + a + " " + b + " " + c + " " + "=" + " " + answer + "<h2>";
		// add an h2 to the history div, which is the last computed operation

	} else { // if all three required inputs for the operation have not been entered

			window.alert("Inputs are required for the operation..");

	}

}