'use strict';
module.exports = function() {
	const extensionSettings = turbine.getExtensionSettings();
	const branchBase = require('../helpers/getBranchBase.js');
	const branchKey = extensionSettings['branchkey'] || '';
	if (branchKey) {
		branch.init(branchKey);
	}
};
