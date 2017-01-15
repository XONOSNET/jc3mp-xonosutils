console.log('[Xonos][Utils] Loaded.');
/* NOTE: This is extremely alpha and there is some bad code in here. Use at your own discretion. - Xonos */
jcmp.events.AddRemoteCallable('xonos-teleport', (player,locid) => {

	const tpLocations = {
		'statue':  new Vector3f(3695.90, 1025.36, 1423.11),
		'boomisland': new Vector3f(-13330.90, 1026.59, 14827.60),
		'airfield': new Vector3f(-4902.63, 1175.48, -7670.74),
		'military': new Vector3f( 7845.71, 2957.11, -6442.56),
		'volcano': new Vector3f(-12753.68, 1855.55, -12215.02),
		'mountain': new Vector3f(10150.10, 4039.30, -6316.13),
		'city': new Vector3f(3477.08, 1044.25, 1057.48),
		'docks': new Vector3f(-5692.14, 1025.09, -8852.33)
	};
	console.log('[Xonos.Utils] Teleporting '+player.name+' (Current XYZ:'+player.position.x+', '+player.position.y+', '+player.position.z+') to '+locid);
	
	player.position = tpLocations[locid];
});

/* Dumps objects into human-readable format - for learning what is returned. 
   Example: dump(player.position); */
function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}