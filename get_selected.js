

var myval=0;

if (jsarguments.length>1)
	myval = jsarguments[1];

function bang()
{
	outlet(0,"myvalue","is",myval);
}

function msg_int(v)
{
	post("received int " + v + "\n");
	myval = v;
	bang();
}

function list()
{
	var l = arrayfromargs(arguments);

	post("received list " + l + "\n");

	for(i = 0; i < l.length; i++){
		var terms =[];
		terms.push(0);
		// post(l[i] + "\n");
		if(l[i] == 1){
			// selected.push(i);
			// send out individually
			// outlet to be connected to cellblock
			terms.push(i);
			outlet(0, terms);
		}
	}
	// send out list of selected
	// outlet(0, selected);
}
