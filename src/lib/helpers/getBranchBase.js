'use strict';
var branchBase;
var window = require('@adobe/reactor-window');
var loadScript = require('@adobe/reactor-load-script');

(function(root, doc, scriptStr, branchStr, createCallback, branchSdk, funcs, i) {
	if (!root[branchStr] || !root[branchStr]._q) {
		while (i < funcs.length) {
			createCallback(branchSdk, funcs[i++]);
		}
		loadScript('https://cdn.branch.io/build.min.js');
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
		'applyCode',
		'autoAppIndex',
		'banner',
		'closeBanner',
		'closeJourney',
		'creditHistory',
		'credits',
		'data',
		'deepview',
		'deepviewCta',
		'first',
		'getCode',
		'init',
		'link',
		'logout',
		'redeem',
		'referrals',
		'removeListener',
		'sendSMS',
		'setBranchViewData',
		'setIdentity',
		'track',
		'validateCode',
		'trackCommerceEvent',
		'logEvent'
	],
	0
);

module.exports = branchBase;