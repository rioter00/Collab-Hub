

var myval=0;

outlets = 1;

if (jsarguments.length>1)
	myval = jsarguments[1];

function bang()
{
	outlets = 6;
	outlet(0,"myvalue","is",myval);
}

function msg_int(v)
{
	post("received int " + v + "\n");
	myval = v;
	bang();
}

function msg_float(v)
{
	post("received float " + v + "\n");
	myval = v;
	bang();
}

function list()
{
	var a = arrayfromargs(arguments);
	post("received list " + a.length + "\n");
	myval = a;
	bang();
}

function anything()
{
	
	a = arguments.length;
	//var a = arrayfromargs(messagename, arguments);
	post("received message " + a + "\n");
	myval = a;
	bang();
}