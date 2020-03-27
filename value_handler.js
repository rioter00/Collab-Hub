

var myval=0;

outlets = 2;

if (jsarguments.length>1)
	myval = jsarguments[1];

function bang()
{
	outlet(0, myval);
}

function msg_int(v)
{
	// post("received int " + v + "\n");
	myval = v;
	bang();
}

function msg_float(v)
{
	// post("received float " + v + "\n");
	myval = v;
	bang();
}

function list()
{
	var a = arrayfromargs(arguments);
	// post("received list " + a.length + "\n");
	myval = a;
	bang();
}

function dictionary(data)
{
	// set incoming data as dict
	var newDict = new Dict(data);
	// if chat, parse for id and chat message
	if(newDict.contains("chat")){
		outlet(0, 'id', newDict.get('id'));
		outlet(0, 'chat', newDict.get('chat'));
	}
}

function noHeader(){
	outlet(1, '-err, no control header, yet');
}
