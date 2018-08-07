var errorMessages = {
	"BRANCH_KEY_ERROR": 'Incorrect Branch Key Detected: Please copy your Branch Key from <a href="https://dashboard.branch.io/account-settings/app" target="_blank">here</a>',
	"SUBSCRIPTION_ERROR_TITLE": 'Journeys & Web To App features won\'t work<br/><br/>',
	"SUBSCRIPTION_ERROR_DESCRIPTION": 'It looks like your account hasn\'t enabled Journeys. Learn more about Journeys and our web to app tools <a href="https://branch.io/journeys/" target="_blank">here</a>. Enable Journeys & web to app functionality <a href="https://branch.dashboard.branch.io/web/journeys/landing" target="_blank">here</a>.',
	"SUBSCRIPTION_RE_SYNC": 'If you\'ve already enabled Journeys click <a href="#" onclick="validateField(\'branch-key\')">here</a> to re-sync your key.'
};

var displaySubscriptionError = function() {
	var html = '<div class="branch-form-title subscription-error-title">' + errorMessages['SUBSCRIPTION_ERROR_TITLE'] + '</div>';
	html += '<div class="branch-form-description">' + errorMessages['SUBSCRIPTION_ERROR_DESCRIPTION'] + '</div>';
	document.getElementsByClassName("branch-form")[0].innerHTML = html;
};