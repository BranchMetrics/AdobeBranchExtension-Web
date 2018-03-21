'use strict';
module.exports = function() {
	var extensionSettings = turbine.getExtensionSettings();
	var branchBase = require('../helpers/getBranchBase.js');
	var branchKey = extensionSettings['branchKey'] || '';
	if (branchKey) {
		branch.init(branchKey);
	}
};
