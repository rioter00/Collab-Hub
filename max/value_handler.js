

var myval=0;

outlets = 1;

if (jsarguments.length>1)
	myval = jsarguments[1];

function bang()
{
	outlets = 6;
	outlet(0, myval);
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

function dictionary(data)
{
	post(data + "\n");
	myval = data;
	bang();
}
