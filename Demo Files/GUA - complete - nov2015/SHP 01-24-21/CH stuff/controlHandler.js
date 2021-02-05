outlets = 1;
var senderFlag = 0;

function dictionary(data) {
	var newDict = new Dict(data);
	var controlDict = newDict.get("array")[1];
	var header = controlDict.get("Header");
	var values = controlDict.get("Values");
	if(senderFlag > 0) {
		var sender = controlDict.get("From");
		outlet(0, sender, header, values);
	} else outlet(0, header, values);
}

function sender(input) {
	senderFlag = input;
}