

var myval=0;

outlets = 2;

if (jsarguments.length>1)
	myval = jsarguments[1];

function bang()
{
	outlet(0, myval);
}

function dictionary(data)
{
	var oldDict = new Dict(data);
	var controllength = oldDict.get("array").length;
	outlet(1, controllength);
	outlet(0, "clear");
	for(i = 0; i < controllength; i++){
		var s = [];
		// why doesn't max's js allow for modern concatentating and for loops??
		// var newArray = oldDict.get("array["+i+"]");
		var element = oldDict.get("array["+i+"]");
		// post(element.get("header"));
		// a.append(element.get("header"));
		// s.push(element.get("header"));
		s.push('set');
		s.push(0);
		s.push(i);
		s.push(element.get("header"));
		var z = arrayfromargs(s);
		outlet(0, s);
	}
}

function noHeader(){
	outlet(1, '-err, no control header, yet');
}
