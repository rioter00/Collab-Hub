

var myval=0;

var controlDict = new Dict("control");

// controlDict.name('control');

if (jsarguments.length>1)
	myval = jsarguments[1];

var header = '';

// function bang()
// {
// 	outlet(0,"myvalue","is",myval);
// }

// function list()
// {
// 	var a = arrayfromargs(arguments);
// 	post("received list " + a + "\n");
// 	myval = a;
// 	bang();
// }

function anything()
{

	var header = arrayfromargs(arguments);
	post(controlDict);
	outlet(0, controlDict);

	// post("received message " + a + "\n");
	// myval = a;
}
