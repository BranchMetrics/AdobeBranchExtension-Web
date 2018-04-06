'use strict';
module.exports = function(settings) {
	var v2EventName = settings['v2EventName'] || null;
	var v2EventData = settings['v2EventData'] || {};
	var customData = settings['customData'] || {};
	var v2EventAndCustomData = Object.assign(v2EventData, customData);
	if (v2EventName && v2EventAndCustomData) {
		branch.logEvent(
			v2EventName,
			v2EventAndCustomData
		);
	}
};
