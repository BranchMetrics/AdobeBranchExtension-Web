var linkCreator = {}

linkCreator.eventRowIndex = 0;

linkCreator.addRow = function (key, value) {
	var row = document.createElement("div");
	row.className = "link-data-row";
	row.id = "link-data-row-" + linkCreator.eventRowIndex++;
	linkCreator.append(row, linkCreator.getTextField(row.id, 'key', key));
	linkCreator.append(row, linkCreator.getSemiColon(row.id));
	linkCreator.append(row, linkCreator.getTextField(row.id, 'value', value));
	linkCreator.append(row, linkCreator.getDeleteRowLink(row.id))
	linkCreator.append(document.getElementsByClassName("link-data-rows-hook")[0], row);
}

linkCreator.append = function(element, child) {
	element && child ? element.appendChild(child) : '';
}

linkCreator.getElementId = function(id) {
	return id ? document.getElementById(id) : '';
}

linkCreator.getTextField = function (rowId, propertyType, textFieldValue) {
	var input = document.createElement("input");
	input.type = "text";
	input.id = rowId + "-" + propertyType;
	input.className = "link-data-input";
	input.value = !textFieldValue ? '' : textFieldValue ;
	input.placeholder = propertyType === 'key' ? "key" : "value";
	return input;
}

linkCreator.getSemiColon = function(id) {
	var span = document.createElement("span");
	span.innerHTML = ":";
	span.className = "link-data-semi-colon-span";
	span.id = id + "-semi-colon";
	return span;
}

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
}

linkCreator.removeRow = function(id) {
	var child = linkCreator.getElementId(id.replace("-anchor", ""));
	var parent = child.parentNode;
	parent.removeChild(child);
}

linkCreator.getData = function() {
	var channel = linkCreator.getElementId("channel").value;
	var campaign = linkCreator.getElementId("campaign").value;

	var tags = linkCreator.getElementId("tags").value.replace(/\s/g, '');
	tags = tags ? tags.split(",") : [];

	var link = {};
	link.tags = tags;
	link.channel = channel || '';
	link.campaign = campaign || '';
	link.data = {};
	var formLinkData = document.querySelectorAll(".link-data-row");
	if (formLinkData.length > 0) {
		for (var index = 0; index < formLinkData.length; index++) {
			var children = formLinkData[index].childNodes;
			var key = children[0].value;
			var val = children[2].value;
			if (key && val) {
				link.data[children[0].value] = children[2].value;
			}
		}
	}
	return link;
}

linkCreator.restoreData = function(linkData) {
	if (!linkData) {
		return;
	}
	linkCreator.eventRowIndex = 0;
	document.getElementsByClassName("link-data-rows-hook")[0].innerHTML = '';
	linkCreator.getElementId("channel").value = linkData.channel || '';
	linkCreator.getElementId("campaign").value = linkData.campaign || '';
	linkCreator.getElementId("tags").value = linkData.tags || '';

	for (var key in linkData.data) {
		linkCreator.addRow(key, linkData.data[key]);
	}
}

linkCreator.isLinkDataValidJSON = function(linkData) {
	var stringifiedLinkData = JSON.stringify(linkData);
	try {
		JSON.parse(stringifiedLinkData);
		return true;
	} catch(e) {
		return false;
	}
}
