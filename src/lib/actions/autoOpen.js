'use strict';
module.exports = function(settings) {
	var autoOpenLink = settings['autoOpenLink'] || null;
	if (autoOpenLink) {
		if (autoOpenLink.data && !autoOpenLink.data.$uri_redirect_mode) {
			// set uri redirect mode to 1 if not present in link data
			autoOpenLink.data.$uri_redirect_mode = 1;
		}
		branch.deepview(
			Object.assign({}, autoOpenLink)
		);
	}
};
