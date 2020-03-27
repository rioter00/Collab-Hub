// gets dictionary -- returns all headers

var header=0;

outlets = 2;

if (jsarguments.length>1)
	header = jsarguments[1];

function bang()
{
	var dict = new Dict("control");
	post(header + "\n");

	var controllength = dict.getsize("array") ;

	// outlet(0, 'clear', 'all');
	for(i = 0; i < controllength; i++){
		var element = dict.get("array["+i+"]");
		if(element.get("header") == header){
			outlet(0, element.get("values"));
		};
	}
}

function anything()
{
	var a = arrayfromargs(messagename, arguments);
	header = a[1];
	bang();
}


function noHeader(){
	outlet(1, '-err, no control header, yet');
}
