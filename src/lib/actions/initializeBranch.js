'use strict';
var logger = turbine.logger;
var window = require('@adobe/reactor-window');
module.exports = function() {
	var extensionSettings = turbine.getExtensionSettings();
	var branch = require('../helpers/getBranchBase.js');
	var branchKey = extensionSettings['branchKey'] || '';
	var branchAPIUrl = extensionSettings['branchAPIURL'] || '';
	if (branchKey) {
		if (branchAPIUrl) {
			if(window.branch){
				branch.setAPIUrl(branchAPIUrl);
			}
		}
		if(window.branch){
			branch.init(branchKey, function(err,data) {
				if (err) {
					logger.error("Error initializing Branch::" + err);
				} else {
					logger.debug("Branch initialized successfully");
				}
			});

		}
	}
	else {
		logger.error("Branch Key not found");
	}
};
