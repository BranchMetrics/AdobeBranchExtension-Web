var autoOpen = {}

autoOpen.eventRowIndex = 0;

autoOpen.addRow = function (key, value) {
	let row = document.createElement("div");
	row.className = "link-data-row";
	row.id = "link-data-row-" + autoOpen.eventRowIndex++;
	autoOpen.append(row, autoOpen.getTextField(row.id, 'key', key));
	autoOpen.append(row, autoOpen.getSemiColon(row.id));
	autoOpen.append(row, autoOpen.getTextField(row.id, 'value', value));
	autoOpen.append(row, autoOpen.getDeleteRowLink(row.id))
	autoOpen.append(document.getElementsByClassName("link-data-rows-hook")[0], row);
}

autoOpen.append = function(element, child) {
	element && child ? element.appendChild(child) : '';
}

autoOpen.getElementId = function(id) {
	return id ? document.getElementById(id) : '';
}

autoOpen.getTextField = function (rowId, propertyType, textFieldValue) {
	let input = document.createElement("input");
	input.type = "text";
	input.id = rowId + "-" + propertyType;
	input.className = "link-data-input";
	input.value = !textFieldValue ? '' : textFieldValue ;
	return input;
}

autoOpen.getSemiColon = function(id) {
	let span = document.createElement("span");
	span.innerHTML = ":";
	span.className = "link-data-semi-colon-span";
	span.id = id + "-semi-colon";
	return span;
}

autoOpen.getDeleteRowLink = function(id) {
	let anchor = document.createElement("a");
	anchor.className = "link-data-delete";
	anchor.id = id + "-anchor";
	anchor.href = "#";
	anchor.innerHTML = '<i class="material-icons link-data-delete-icon">remove_circle</i>';
	anchor.onclick = function() {
		autoOpen.removeRow(anchor.id);
	};
	return anchor;
}

autoOpen.removeRow = function(id) {
	const child = autoOpen.getElementId(id.replace("-anchor", ""));
	const parent = child.parentNode;
	parent.removeChild(child);
}

autoOpen.getData = function() {
	const channel = autoOpen.getElementId("channel").value;
	const campaign = autoOpen.getElementId("campaign").value;
	console.log(channel);
	console.log(campaign);

	let tags = autoOpen.getElementId("tags").value.replace(/\s/g, '');
	tags = tags ? tags.split(",") : [];

	let link = {};
	link.tags = tags;
	link.channel = channel || '';
	link.campaign = campaign || '';
	link.data = {};
	let formLinkData = document.querySelectorAll(".link-data-row");
	if (formLinkData.length > 0) {
		for (var index = 0; index < formLinkData.length; index++) {
			var children = formLinkData[index].childNodes;
			const key = children[0].value;
			const val = children[2].value;
			if (key && val) {
				link.data[children[0].value] = children[2].value;
			}
		}
	}
	return link;
}

autoOpen.restoreData = function(linkData) {
	if (!linkData) {
		return;
	}
	autoOpen.eventRowIndex = 0;
	document.getElementsByClassName("link-data-rows-hook")[0].innerHTML = '';
	autoOpen.getElementId("channel").value = linkData.channel || '';
	autoOpen.getElementId("campaign").value = linkData.campaign || '';
	autoOpen.getElementId("tags").value = linkData.tags || '';

	for (var key in linkData.data) {
		autoOpen.addRow(key, linkData.data[key]);
	}
}

autoOpen.isLinkDataValidJSON = function(linkData) {
	const stringifiedLinkData = JSON.stringify(linkData);
	try {
		JSON.parse(stringifiedLinkData);
		return true;
	} catch(e) {
		return false;
	}
}
