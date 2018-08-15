'use strict';

module.exports = function(settings) {

	function convertToJSON(stringifiedObject) {
		try {
			return stringifiedObject ? JSON.parse(stringifiedObject) : null;
		} catch (e) {
			return null;
		}
	}

	function extractHasAppValue(branchSession) {
		return branchSession && branchSession.hasOwnProperty('has_app') ? branchSession.has_app : null;
	}

	function checkSessionStorageForHasAppValue() {
		if (typeof sessionStorage != 'undefined') {
			var branchSession = sessionStorage.getItem('branch_session');
			branchSession = convertToJSON(branchSession);
			return extractHasAppValue(branchSession);
		}
	}

	var extensionSettings = turbine.getExtensionSettings();
	var subscriptionStatus = extensionSettings['subscriptionStatus'] || false;

	var hasApp = checkSessionStorageForHasAppValue();
	var smsPhoneNumber = settings['smsPhoneNumber'] || null;
	var smsLink = settings['smsLink'] || null;

	if (subscriptionStatus && smsPhoneNumber && smsLink && hasApp === false) {
		branch.sendSMS(
			smsPhoneNumber,
			Object.assign({}, smsLink)
		);
	}
};
