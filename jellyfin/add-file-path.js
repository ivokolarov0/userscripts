// ==UserScript==
// @name         JellyFin File Path input
// @namespace    http://tampermonkey.net/
// @version      2025-11-08
// @description  try to take over the world!
// @author       You
// @match        http://localhost:8096/web/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.localhost
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	async function fetchVideo() {
		const token = window.ApiClient._serverInfo.AccessToken;
		const deviceId = window.ApiClient._serverInfo.DeviceId;
		const userId = window.ApiClient._serverInfo.UserId;
		const getSearch = window.location.hash.split('?')[1];
		const search = new URLSearchParams(`?${getSearch}`);
		const id = search.get('id');
		const appVersion = window.ApiClient._appVersion;
		const appName = window.ApiClient._appName;
		const device = window.ApiClient._deviceName;

		return fetch(`/Users/${userId}/Items/${id}`,{
			"headers": {
				"Authorization": `MediaBrowser Client="${appName}", Device="${device}", DeviceId="${deviceId}", Version="${appVersion}", Token="${token}"`,
				"Accept": "application/json",
				"Accept-Language": "en-US,en;q=0.5",
			}
		}).then(response => response.json()).then(data => data).catch(error => console.error('Error fetching data:', error));
	}

	const init = async () => {
		const video = await fetchVideo();
		document.querySelector('.detailPageContent').insertAdjacentHTML('afterbegin', `
			<div style="margin: 0 0 10px;">
				<h4>File Path:</h4>
				<input
					style="width:100%; border-color: #fff; background-color: #000; padding: 8px; color: #fff;"
					type="text"
					value="${video.Path}"
					readonly
				/>
			</div>
		`);
	};

	const targetNode = document.body;
	const config = { childList: true, subtree: true };
	const observer = new MutationObserver(() => {
		if (document.querySelector('.detailPageContent')) {
			init();
			observer.disconnect();
		}
	});
	observer.observe(targetNode, config);
})();