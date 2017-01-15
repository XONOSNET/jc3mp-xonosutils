"use strict";
const ui = new WebUIWindow('xonos_tp_ui', 'package://xonos-utils/ui/index.html', new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
ui.autoResize = true;

var locid;

jcmp.ui.AddEvent('xonos-teleport', (locid) => {
	jcmp.events.CallRemote('xonos-teleport', locid);
});