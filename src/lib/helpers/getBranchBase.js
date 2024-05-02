'use strict';
var window = require('@adobe/reactor-window');
var loadScript = require('@adobe/reactor-load-script');

(function(root, doc, scriptStr, branchStr, createCallback, branchSdk, funcs, i) {
	if (!root[branchStr] || !root[branchStr]._q) {
		while (i < funcs.length) {
			createCallback(branchSdk, funcs[i++]);
		}
		loadScript('https://cdn.branch.io/branch-latest.min.js').then(
			function () {
			  turbine.logger.log('Branch sdk was successfully loaded.');
			},
			function () {
			  turbine.logger.error('Branch sdk could not be loaded.');
			}
		  );
		root[branchStr] = branchSdk;
	}
})(
	window, document, 'script', 'branch', function(branch, name) {
		branch[name] = function() {
			branch._q.push([ name, arguments ]);
		};
	},
	{
		_q: [], // _q: the "queue" of calls
		_v: 1 // _v: the "version" of the embed script
	},
	[
		'addListener',
		'banner',
		'closeBanner',
		'closeJourney',
		'data',
		'deepview',
		'deepviewCta',
		'first',
		'init',
		'link',
		'logout',
		'removeListener',
		'setBranchViewData',
		'setIdentity',
		'track',
		'trackCommerceEvent',
		'logEvent',
		'disableTracking',
		'getBrowserFingerprintId',
		'crossPlatformIds',
		'lastAttributedTouchData',
		'setAPIResponseCallback',
		'qrCode',
		'setRequestMetaData',
		'setDMAParamsForEEA',
		'setAPIUrl',
		'getAPIUrl'
	],
	0
);

module.exports = window.branch;