'use strict';
module.exports = function(settings) {
	var autoOpenLink = settings['autoOpenLink'] || null;
	var autoOpenOptions = settings['autoOpenOptions'] || null;
	if (autoOpenLink && autoOpenOptions) {
		if (autoOpenLink.data && !autoOpenLink.data.$uri_redirect_mode) {
			// set uri redirect mode to 1 if not present in link data
			autoOpenLink.data.$uri_redirect_mode = 1;
		}
		if (autoOpenLink && !autoOpenLink.channel) {
			autoOpenLink.channel = 'mobile_web_launch';
		}
		branch.deepview(
			Object.assign({}, autoOpenLink),
			Object.assign({}, autoOpenOptions)
		);
	}
};
