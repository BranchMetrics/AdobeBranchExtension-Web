var linkCreator = {}

linkCreator.customDataRowIndex = 0;

linkCreator.addCustomDataRow = function (key, value) {
	var row = document.createElement("div");
	row.className = "link-data-row";
	row.id = "link-data-row-" + linkCreator.customDataRowIndex++;
	linkCreator.append(row, linkCreator.getTextField(row.id, 'key', key));
	linkCreator.append(row, linkCreator.getSemiColon(row.id));
	linkCreator.append(row, linkCreator.getTextField(row.id, 'value', value));
	linkCreator.append(row, linkCreator.getDeleteRowLink(row.id))
	linkCreator.append(document.getElementsByClassName("link-data-rows-hook")[0], row);
};
linkCreator.append = function(element, child) {
	element && child ? element.appendChild(child) : '';
};
linkCreator.getElementId = function(id) {
	return id ? document.getElementById(id) : '';
};
/* functions to build a custom data row */
linkCreator.getTextField = function (rowId, propertyType, textFieldValue) {
	var input = document.createElement("input");
	input.type = "text";
	input.id = rowId + "-" + propertyType;
	input.className = "link-data-input";
	input.value = !textFieldValue ? '' : textFieldValue ;
	input.placeholder = propertyType === 'key' ? "key" : "value";
	return input;
};
linkCreator.getSemiColon = function(id) {
	var span = document.createElement("span");
	span.innerHTML = ":";
	span.className = "link-data-semi-colon-span";
	span.id = id + "-semi-colon";
	return span;
};
linkCreator.getDeleteRowLink = function(id) {
	var anchor = document.createElement("a");
	anchor.className = "link-data-delete";
	anchor.id = id + "-anchor";
	anchor.href = "#";
	anchor.innerHTML = '<i class="material-icons link-data-delete-icon">remove_circle</i>';
	anchor.onclick = function() {
		linkCreator.removeRow(anchor.id);
	};
	return anchor;
};
linkCreator.removeRow = function(id) {
	var child = linkCreator.getElementId(id.replace("-anchor", ""));
	var parent = child.parentNode;
	parent.removeChild(child);
};
linkCreator.blackListedCustomDataKeysPattern = function() {
	var blackListedKeys = ["\\$ios_url", "\\$android_url", "\\$fallback_url"];
	return new RegExp(blackListedKeys.join('|'), 'i')
};
linkCreator.addPropertyIfNotNull = function(obj, key, value) {
	if (value) {
		if (typeof value === "object" && Object.keys(value).length === 0) {
			return obj;
		}
		obj[key] = value;
	}
	return obj;
};
linkCreator.getCustomData = function() {
	var customData = {};
	var formLinkData = document.querySelectorAll(".link-data-row");
	var blackListedKeysPattern = linkCreator.blackListedCustomDataKeysPattern();
	if (formLinkData.length > 0) {
		for (var index = 0; index < formLinkData.length; index++) {
			var children = formLinkData[index].childNodes;
			var key = children[0].value;
			var val = children[2].value;
			if (key && val && !blackListedKeysPattern.test(key)) {
				customData[children[0].value.trim()] = children[2].value.trim();
			}
		}
	}
	return customData;
}
linkCreator.getLinkTemplate = function() {
	var tags = linkCreator.getElementId("tags").value.replace(/\s/g, '');
	tags = tags === '' ? null : tags.split(',');

	var link = {};
	link = linkCreator.addPropertyIfNotNull(link, "tags", tags);
	link = linkCreator.addPropertyIfNotNull(link, "channel", linkCreator.getElementId("channel").value.trim());
	link = linkCreator.addPropertyIfNotNull(link, "campaign", linkCreator.getElementId("campaign").value.trim());
	link.data = linkCreator.getCustomData();
	return link;
};
linkCreator.restoreCustomData = function(data) {
	if (!data) {
		return;
	}
	document.getElementsByClassName("link-data-rows-hook")[0].innerHTML = '';
	for (var key in data) {
		linkCreator.addCustomDataRow(key, data[key]);
	}
};
linkCreator.restoreLinkData = function(linkData) {
	if (!linkData || Object.keys(linkData).length === 0) {
		return;
	}
	linkCreator.customDataRowIndex = 0;
	linkCreator.getElementId("channel").value = linkData.channel || '';
	linkCreator.getElementId("campaign").value = linkData.campaign || '';
	linkCreator.getElementId("tags").value = linkData.tags || '';
	linkCreator.restoreCustomData(linkData.data);
};
linkCreator.restoreOptions = function(options) {
	if (!options || Object.keys(options).length === 0) {
		return;
	}
	linkCreator.getElementId('makeNewLink').checked = options.make_new_link || false;
};
linkCreator.isLinkDataValidJSON = function(linkData) {
	var stringifiedLinkData = JSON.stringify(linkData);
	try {
		JSON.parse(stringifiedLinkData);
		return true;
	} catch(e) {
		return false;
	}
};
// make sure that phone number field has a value in it
linkCreator.isPhoneNumberFieldNotEmpty = function() {
	var phoneNumberField = linkCreator.getElementId("phoneNumber");
	var phoneNumberValue = phoneNumberField.value.trim();
	var phoneNumberLabel = document.querySelectorAll("[for='phoneNumber']")[0];
	console.log(phoneNumberValue);
	console.log(phoneNumberLabel);
	if (phoneNumberValue === "") {
		phoneNumberField.className = 'branch-form-input branch-form-input-error';
		phoneNumberLabel.innerHTML = 'Phone Number Data Element' + ' -- ' + 'is required';
		phoneNumberLabel.className = 'branch-form-input-error-text';
		return false;
	}
	phoneNumberField.className = 'branch-form-input';
	phoneNumberLabel.className = '';
	phoneNumberLabel.innerHTML = 'Phone Number Data Element';
	return true;
};
/* log event functions */
linkCreator.getV2EventNames = function() {
	return {
		commerce: ["ADD_TO_CART", "ADD_TO_WISHLIST", "VIEW_CART", "INITIATE_PURCHASE", "ADD_PAYMENT_INFO", "PURCHASE", "SPEND_CREDITS"],
		content: ["SEARCH", "VIEW_ITEM", "VIEW_ITEMS", "RATE", "SHARE"],
		user_lifecycle: ["COMPLETE_REGISTRATION", "COMPLETE_TUTORIAL", "ACHIEVE_LEVEL", "UNLOCK_ACHIEVEMENT"],
		custom: ["CUSTOM_EVENT"]
	}
};
linkCreator.getFieldsForV2EventCategory = function(eventType) {
	if (!eventType) {
		return;
	}
	var fields = {
		commerce: {
			transaction_id: "string",
			revenue: "double",
			currency: "currency_code",
			shipping: "double",
			tax: "double",
			coupon: "string",
			affiliation: "string",
			description: "string"
		},
		content: {
			search_query: "string",
			description: "string"
		},
		user_lifecycle: {
			description: "string"
		},
		custom: {
			event_name: "string"
		}

	};
	return fields[eventType] || null;
};
linkCreator.renderV2EventDropDown = function() {
	var chooserDiv = document.getElementsByClassName("log-event-chooser-hook")[0];
	var select = document.createElement("select");
	select.id = "log-event-chooser";
	select.onchange = linkCreator.renderFieldsForV2Event;
	for (key in linkCreator.getV2EventNames()) {
		var eventNames = linkCreator.getV2EventNames()[key];
		for (var index = 0; index < eventNames.length; index++) {
			var option = document.createElement("option");
			option.value = eventNames[index];
			option.dataset.type = key;
			option.innerHTML = eventNames[index].replace(/_/g, " ");
			linkCreator.append(select, option);
		}
	}
	linkCreator.append(chooserDiv, select);
};
linkCreator.isValidCurrencyCode = function(value) {
	var currencies = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SPL', 'SRD', 'STN', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TVD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VEF', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XDR', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'ZWD'];
	return currencies.indexOf(value) > -1;
}
linkCreator.getV2EventName = function() {
	if (linkCreator.getV2EventCategory() === "custom") {
		return linkCreator.getElementId("event_name").value;
	}
	var chooser = linkCreator.getElementId("log-event-chooser");
	return chooser.options[chooser.selectedIndex].value;
};
linkCreator.getV2EventCategory = function() {
	var chooser = linkCreator.getElementId("log-event-chooser");
	return chooser.options[chooser.selectedIndex].dataset.type;
};
linkCreator.renderFieldsForV2Event = function(eventData) {
	var eventDataDiv = document.getElementsByClassName("log-event-data-hook")[0];
	eventDataDiv.innerHTML = "";
	var selectedCategory = linkCreator.getV2EventCategory();
	var fields = linkCreator.getFieldsForV2EventCategory(selectedCategory);
	for (var key in fields) {
		var label = document.createElement("label");
		label.for = key;
		label.innerHTML = key.replace(/_/g, " ");
		var input = document.createElement("input");
		input.id = key;
		input.dataset.rowType = 'event-data-row';
		input.dataset.type = fields[key];
		input.className = "branch-form-input";
		if (eventData && eventData[key]) { // restores previous event data
			input.value = eventData[key];
		}
		linkCreator.append(eventDataDiv, label);
		linkCreator.append(eventDataDiv, input);
	}
};
linkCreator.isDataElement = function(userInput) {
	return /%.*%/g.test(userInput);
}
linkCreator.getV2EventData = function() {
	var logEventData = document.querySelectorAll("[data-row-type^=event-data-row]");
	var eventData = {};
	if (linkCreator.getV2EventCategory() === "custom") {
		return eventData; // we don't want to add the custom event name to event data
	}
	if (logEventData.length > 0) {
		for (var index = 0; index < logEventData.length; index++) {
			var userInput = logEventData[index].value;
			var fieldName = logEventData[index].id;
			var dataType = logEventData[index].dataset.type;
			if (userInput && dataType === "double" && !isNaN(userInput)) {
				eventData[fieldName] = Number(userInput);
			}
			else if (userInput && dataType === "currency_code" && linkCreator.isValidCurrencyCode(userInput)) {
				eventData[fieldName] = userInput;
			}
			else if (userInput && dataType === "string" || linkCreator.isDataElement(userInput)) {
				eventData[fieldName] = userInput;
			}
		}
	}
	return eventData;
};
linkCreator.validateV2EventData = function() {
	var assignErrorClassAndMessage = function(element, fieldName, message) {
		element.className = "branch-form-input branch-form-input-error";
		element.previousSibling.innerHTML = fieldName.replace('_', ' ') + ' -- ' + message;
		element.previousSibling.className = "branch-form-input-error-text";
	};
	var logEventData = document.querySelectorAll("[data-row-type^=event-data-row]");
	var noErrors = true;
	if (logEventData.length > 0) {
		for (var index = 0; index < logEventData.length; index++) {
			var userInput = logEventData[index].value;
			var fieldName = logEventData[index].id;
			var dataType = logEventData[index].dataset.type;
			if (userInput && dataType === "double" && !linkCreator.isDataElement(userInput) && isNaN(userInput)) {
				assignErrorClassAndMessage(logEventData[index], fieldName, "should be a number");
				noErrors = false;
			}
			else if (userInput && dataType === "currency_code" && !linkCreator.isDataElement(userInput) && !linkCreator.isValidCurrencyCode(userInput)) {
				assignErrorClassAndMessage(logEventData[index], fieldName, 'should be a valid 3 character <a href="https://www.xe.com/iso4217.php" target="_blank"> ISO-4217 currency code </a>');
				noErrors = false;
			}
			else if (linkCreator.getV2EventCategory() === "custom" && userInput === "") {
				assignErrorClassAndMessage(logEventData[index], fieldName, 'is required');
				noErrors = false;
			}
			else {
				logEventData[index].className = "branch-form-input";
				logEventData[index].previousSibling.className = "";
				logEventData[index].previousSibling.innerHTML = logEventData[index].previousSibling.innerHTML.split("--")[0];
			}
		}
	}
	return noErrors;
};
/* v2 event restoration functions */
linkCreator.restoreV2EventName = function(eventName, category) {
	if (!eventName) {
		return;
	}
	var chooser = linkCreator.getElementId("log-event-chooser");
	if (chooser) {
		if (category === "custom") {
			chooser.value = "CUSTOM_EVENT";
		}
		else {
			chooser.value = eventName;
		}
	}
};
linkCreator.restoreV2EventData = function(eventData) {
	if (!eventData) {
		return;
	}
	linkCreator.renderFieldsForV2Event(eventData);
};
