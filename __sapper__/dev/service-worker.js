(function () {
	'use strict';

	// This file is generated by Sapper — do not edit it!
	const timestamp = 1585699131181;

	const files = [
		"service-worker-index.html",
		".DS_Store",
		"background-images/so-white.png",
		"favicon/android-chrome-192x192.png",
		"favicon/android-chrome-512x512.png",
		"favicon/apple-touch-icon.png",
		"favicon/favicon-16x16.png",
		"favicon/favicon-32x32.png",
		"favicon/favicon.ico",
		"favicon/site.webmanifest",
		"favicon.png",
		"global.css.BAK",
		"images/.DS_Store",
		"images/creative-revolt/about-cta-min.png",
		"images/creative-revolt/about-min.png",
		"images/creative-revolt/home-ctas-min.png",
		"images/creative-revolt/home-min.png",
		"images/creative-revolt/writing-class-min.png",
		"images/halcyon/.DS_Store",
		"images/halcyon/dining-min.png",
		"images/halcyon/events-min.png",
		"images/halcyon/home-cta-min.png",
		"images/halcyon/home-min.png",
		"images/halcyon/spotlight-min.png",
		"images/stallion/.DS_Store",
		"images/stallion/stallion-11-min.png",
		"images/stallion/stallion-2-min.png",
		"images/stallion/stallion-4-min.png",
		"images/stallion/stallion-5-min.png",
		"images/stallion/stallion-6-min.png",
		"images/university-park/.DS_Store",
		"images/university-park/form-min.png",
		"images/university-park/home-min.png",
		"images/university-park/home-video-min.png",
		"images/university-park/library-min.png",
		"images/university-park/newsletter-min.png",
		"manifest.json",
		"pdfs/resume-joshua-roper.pdf",
		"thumbnails/Jorden-Background-Gray-min.jpg",
		"thumbnails/halcyon-5-min.jpg",
		"thumbnails/professional-hero-min.jpg",
		"thumbnails/stallion-thumb-a-min.jpg",
		"thumbnails/uptexas-thumb-min.jpg"
	];

	const shell = [
		"client/index.86fc6f69.js",
		"client/client.9189a7b5.js",
		"client/index.60cd3d27.js",
		"client/TextAnimation.d7718a5d.js",
		"client/index.6caf3671.js",
		"client/experience.c727a63c.js",
		"client/ProjectDetailTemplate.b616ae15.js",
		"client/creative-revolt.cea5fd35.js",
		"client/university-park.7590aa1c.js",
		"client/stallion.7a39111c.js",
		"client/halcyon.a08163c0.js",
		"client/about.baece2b0.js",
		"client/sapper-dev-client.66640646.js"
	];

	const ASSETS = `cache${timestamp}`;

	// `shell` is an array of all the files generated by the bundler,
	// `files` is an array of everything in the `static` directory
	const to_cache = shell.concat(files);
	const cached = new Set(to_cache);

	self.addEventListener('install', event => {
		event.waitUntil(
			caches
				.open(ASSETS)
				.then(cache => cache.addAll(to_cache))
				.then(() => {
					self.skipWaiting();
				})
		);
	});

	self.addEventListener('activate', event => {
		event.waitUntil(
			caches.keys().then(async keys => {
				// delete old caches
				for (const key of keys) {
					if (key !== ASSETS) await caches.delete(key);
				}

				self.clients.claim();
			})
		);
	});

	self.addEventListener('fetch', event => {
		if (event.request.method !== 'GET' || event.request.headers.has('range')) return;

		const url = new URL(event.request.url);

		// don't try to handle e.g. data: URIs
		if (!url.protocol.startsWith('http')) return;

		// ignore dev server requests
		if (url.hostname === self.location.hostname && url.port !== self.location.port) return;

		// always serve static files and bundler-generated assets from cache
		if (url.host === self.location.host && cached.has(url.pathname)) {
			event.respondWith(caches.match(event.request));
			return;
		}

		// for pages, you might want to serve a shell `service-worker-index.html` file,
		// which Sapper has generated for you. It's not right for every
		// app, but if it's right for yours then uncomment this section
		/*
		if (url.origin === self.origin && routes.find(route => route.pattern.test(url.pathname))) {
			event.respondWith(caches.match('/service-worker-index.html'));
			return;
		}
		*/

		if (event.request.cache === 'only-if-cached') return;

		// for everything else, try the network first, falling back to
		// cache if the user is offline. (If the pages never change, you
		// might prefer a cache-first approach to a network-first one.)
		event.respondWith(
			caches
				.open(`offline${timestamp}`)
				.then(async cache => {
					try {
						const response = await fetch(event.request);
						cache.put(event.request, response.clone());
						return response;
					} catch(err) {
						const response = await cache.match(event.request);
						if (response) return response;

						throw err;
					}
				})
		);
	});

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS13b3JrZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9zZXJ2aWNlLXdvcmtlci5qcyIsIi4uLy4uL3NyYy9zZXJ2aWNlLXdvcmtlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IFNhcHBlciDigJQgZG8gbm90IGVkaXQgaXQhXG5leHBvcnQgY29uc3QgdGltZXN0YW1wID0gMTU4NTY5OTEzMTE4MTtcblxuZXhwb3J0IGNvbnN0IGZpbGVzID0gW1xuXHRcInNlcnZpY2Utd29ya2VyLWluZGV4Lmh0bWxcIixcblx0XCIuRFNfU3RvcmVcIixcblx0XCJiYWNrZ3JvdW5kLWltYWdlcy9zby13aGl0ZS5wbmdcIixcblx0XCJmYXZpY29uL2FuZHJvaWQtY2hyb21lLTE5MngxOTIucG5nXCIsXG5cdFwiZmF2aWNvbi9hbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZ1wiLFxuXHRcImZhdmljb24vYXBwbGUtdG91Y2gtaWNvbi5wbmdcIixcblx0XCJmYXZpY29uL2Zhdmljb24tMTZ4MTYucG5nXCIsXG5cdFwiZmF2aWNvbi9mYXZpY29uLTMyeDMyLnBuZ1wiLFxuXHRcImZhdmljb24vZmF2aWNvbi5pY29cIixcblx0XCJmYXZpY29uL3NpdGUud2VibWFuaWZlc3RcIixcblx0XCJmYXZpY29uLnBuZ1wiLFxuXHRcImdsb2JhbC5jc3MuQkFLXCIsXG5cdFwiaW1hZ2VzLy5EU19TdG9yZVwiLFxuXHRcImltYWdlcy9jcmVhdGl2ZS1yZXZvbHQvYWJvdXQtY3RhLW1pbi5wbmdcIixcblx0XCJpbWFnZXMvY3JlYXRpdmUtcmV2b2x0L2Fib3V0LW1pbi5wbmdcIixcblx0XCJpbWFnZXMvY3JlYXRpdmUtcmV2b2x0L2hvbWUtY3Rhcy1taW4ucG5nXCIsXG5cdFwiaW1hZ2VzL2NyZWF0aXZlLXJldm9sdC9ob21lLW1pbi5wbmdcIixcblx0XCJpbWFnZXMvY3JlYXRpdmUtcmV2b2x0L3dyaXRpbmctY2xhc3MtbWluLnBuZ1wiLFxuXHRcImltYWdlcy9oYWxjeW9uLy5EU19TdG9yZVwiLFxuXHRcImltYWdlcy9oYWxjeW9uL2RpbmluZy1taW4ucG5nXCIsXG5cdFwiaW1hZ2VzL2hhbGN5b24vZXZlbnRzLW1pbi5wbmdcIixcblx0XCJpbWFnZXMvaGFsY3lvbi9ob21lLWN0YS1taW4ucG5nXCIsXG5cdFwiaW1hZ2VzL2hhbGN5b24vaG9tZS1taW4ucG5nXCIsXG5cdFwiaW1hZ2VzL2hhbGN5b24vc3BvdGxpZ2h0LW1pbi5wbmdcIixcblx0XCJpbWFnZXMvc3RhbGxpb24vLkRTX1N0b3JlXCIsXG5cdFwiaW1hZ2VzL3N0YWxsaW9uL3N0YWxsaW9uLTExLW1pbi5wbmdcIixcblx0XCJpbWFnZXMvc3RhbGxpb24vc3RhbGxpb24tMi1taW4ucG5nXCIsXG5cdFwiaW1hZ2VzL3N0YWxsaW9uL3N0YWxsaW9uLTQtbWluLnBuZ1wiLFxuXHRcImltYWdlcy9zdGFsbGlvbi9zdGFsbGlvbi01LW1pbi5wbmdcIixcblx0XCJpbWFnZXMvc3RhbGxpb24vc3RhbGxpb24tNi1taW4ucG5nXCIsXG5cdFwiaW1hZ2VzL3VuaXZlcnNpdHktcGFyay8uRFNfU3RvcmVcIixcblx0XCJpbWFnZXMvdW5pdmVyc2l0eS1wYXJrL2Zvcm0tbWluLnBuZ1wiLFxuXHRcImltYWdlcy91bml2ZXJzaXR5LXBhcmsvaG9tZS1taW4ucG5nXCIsXG5cdFwiaW1hZ2VzL3VuaXZlcnNpdHktcGFyay9ob21lLXZpZGVvLW1pbi5wbmdcIixcblx0XCJpbWFnZXMvdW5pdmVyc2l0eS1wYXJrL2xpYnJhcnktbWluLnBuZ1wiLFxuXHRcImltYWdlcy91bml2ZXJzaXR5LXBhcmsvbmV3c2xldHRlci1taW4ucG5nXCIsXG5cdFwibWFuaWZlc3QuanNvblwiLFxuXHRcInBkZnMvcmVzdW1lLWpvc2h1YS1yb3Blci5wZGZcIixcblx0XCJ0aHVtYm5haWxzL0pvcmRlbi1CYWNrZ3JvdW5kLUdyYXktbWluLmpwZ1wiLFxuXHRcInRodW1ibmFpbHMvaGFsY3lvbi01LW1pbi5qcGdcIixcblx0XCJ0aHVtYm5haWxzL3Byb2Zlc3Npb25hbC1oZXJvLW1pbi5qcGdcIixcblx0XCJ0aHVtYm5haWxzL3N0YWxsaW9uLXRodW1iLWEtbWluLmpwZ1wiLFxuXHRcInRodW1ibmFpbHMvdXB0ZXhhcy10aHVtYi1taW4uanBnXCJcbl07XG5leHBvcnQgeyBmaWxlcyBhcyBhc3NldHMgfTsgLy8gbGVnYWN5XG5cbmV4cG9ydCBjb25zdCBzaGVsbCA9IFtcblx0XCJjbGllbnQvaW5kZXguODZmYzZmNjkuanNcIixcblx0XCJjbGllbnQvY2xpZW50LjkxODlhN2I1LmpzXCIsXG5cdFwiY2xpZW50L2luZGV4LjYwY2QzZDI3LmpzXCIsXG5cdFwiY2xpZW50L1RleHRBbmltYXRpb24uZDc3MThhNWQuanNcIixcblx0XCJjbGllbnQvaW5kZXguNmNhZjM2NzEuanNcIixcblx0XCJjbGllbnQvZXhwZXJpZW5jZS5jNzI3YTYzYy5qc1wiLFxuXHRcImNsaWVudC9Qcm9qZWN0RGV0YWlsVGVtcGxhdGUuYjYxNmFlMTUuanNcIixcblx0XCJjbGllbnQvY3JlYXRpdmUtcmV2b2x0LmNlYTVmZDM1LmpzXCIsXG5cdFwiY2xpZW50L3VuaXZlcnNpdHktcGFyay43NTkwYWExYy5qc1wiLFxuXHRcImNsaWVudC9zdGFsbGlvbi43YTM5MTExYy5qc1wiLFxuXHRcImNsaWVudC9oYWxjeW9uLmEwODE2M2MwLmpzXCIsXG5cdFwiY2xpZW50L2Fib3V0LmJhZWNlMmIwLmpzXCIsXG5cdFwiY2xpZW50L3NhcHBlci1kZXYtY2xpZW50LjY2NjQwNjQ2LmpzXCJcbl07XG5cbmV4cG9ydCBjb25zdCByb3V0ZXMgPSBbXG5cdHsgcGF0dGVybjogL15cXC8kLyB9LFxuXHR7IHBhdHRlcm46IC9eXFwvZXhwZXJpZW5jZVxcLz8kLyB9LFxuXHR7IHBhdHRlcm46IC9eXFwvcHJvamVjdHNcXC9jcmVhdGl2ZS1yZXZvbHRcXC8/JC8gfSxcblx0eyBwYXR0ZXJuOiAvXlxcL3Byb2plY3RzXFwvdW5pdmVyc2l0eS1wYXJrXFwvPyQvIH0sXG5cdHsgcGF0dGVybjogL15cXC9wcm9qZWN0c1xcL3N0YWxsaW9uXFwvPyQvIH0sXG5cdHsgcGF0dGVybjogL15cXC9wcm9qZWN0c1xcL2hhbGN5b25cXC8/JC8gfSxcblx0eyBwYXR0ZXJuOiAvXlxcL2Fib3V0XFwvPyQvIH1cbl07IiwiaW1wb3J0IHsgdGltZXN0YW1wLCBmaWxlcywgc2hlbGwsIHJvdXRlcyB9IGZyb20gJ0BzYXBwZXIvc2VydmljZS13b3JrZXInO1xuXG5jb25zdCBBU1NFVFMgPSBgY2FjaGUke3RpbWVzdGFtcH1gO1xuXG4vLyBgc2hlbGxgIGlzIGFuIGFycmF5IG9mIGFsbCB0aGUgZmlsZXMgZ2VuZXJhdGVkIGJ5IHRoZSBidW5kbGVyLFxuLy8gYGZpbGVzYCBpcyBhbiBhcnJheSBvZiBldmVyeXRoaW5nIGluIHRoZSBgc3RhdGljYCBkaXJlY3RvcnlcbmNvbnN0IHRvX2NhY2hlID0gc2hlbGwuY29uY2F0KGZpbGVzKTtcbmNvbnN0IGNhY2hlZCA9IG5ldyBTZXQodG9fY2FjaGUpO1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2luc3RhbGwnLCBldmVudCA9PiB7XG5cdGV2ZW50LndhaXRVbnRpbChcblx0XHRjYWNoZXNcblx0XHRcdC5vcGVuKEFTU0VUUylcblx0XHRcdC50aGVuKGNhY2hlID0+IGNhY2hlLmFkZEFsbCh0b19jYWNoZSkpXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdHNlbGYuc2tpcFdhaXRpbmcoKTtcblx0XHRcdH0pXG5cdCk7XG59KTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdhY3RpdmF0ZScsIGV2ZW50ID0+IHtcblx0ZXZlbnQud2FpdFVudGlsKFxuXHRcdGNhY2hlcy5rZXlzKCkudGhlbihhc3luYyBrZXlzID0+IHtcblx0XHRcdC8vIGRlbGV0ZSBvbGQgY2FjaGVzXG5cdFx0XHRmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG5cdFx0XHRcdGlmIChrZXkgIT09IEFTU0VUUykgYXdhaXQgY2FjaGVzLmRlbGV0ZShrZXkpO1xuXHRcdFx0fVxuXG5cdFx0XHRzZWxmLmNsaWVudHMuY2xhaW0oKTtcblx0XHR9KVxuXHQpO1xufSk7XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignZmV0Y2gnLCBldmVudCA9PiB7XG5cdGlmIChldmVudC5yZXF1ZXN0Lm1ldGhvZCAhPT0gJ0dFVCcgfHwgZXZlbnQucmVxdWVzdC5oZWFkZXJzLmhhcygncmFuZ2UnKSkgcmV0dXJuO1xuXG5cdGNvbnN0IHVybCA9IG5ldyBVUkwoZXZlbnQucmVxdWVzdC51cmwpO1xuXG5cdC8vIGRvbid0IHRyeSB0byBoYW5kbGUgZS5nLiBkYXRhOiBVUklzXG5cdGlmICghdXJsLnByb3RvY29sLnN0YXJ0c1dpdGgoJ2h0dHAnKSkgcmV0dXJuO1xuXG5cdC8vIGlnbm9yZSBkZXYgc2VydmVyIHJlcXVlc3RzXG5cdGlmICh1cmwuaG9zdG5hbWUgPT09IHNlbGYubG9jYXRpb24uaG9zdG5hbWUgJiYgdXJsLnBvcnQgIT09IHNlbGYubG9jYXRpb24ucG9ydCkgcmV0dXJuO1xuXG5cdC8vIGFsd2F5cyBzZXJ2ZSBzdGF0aWMgZmlsZXMgYW5kIGJ1bmRsZXItZ2VuZXJhdGVkIGFzc2V0cyBmcm9tIGNhY2hlXG5cdGlmICh1cmwuaG9zdCA9PT0gc2VsZi5sb2NhdGlvbi5ob3N0ICYmIGNhY2hlZC5oYXModXJsLnBhdGhuYW1lKSkge1xuXHRcdGV2ZW50LnJlc3BvbmRXaXRoKGNhY2hlcy5tYXRjaChldmVudC5yZXF1ZXN0KSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gZm9yIHBhZ2VzLCB5b3UgbWlnaHQgd2FudCB0byBzZXJ2ZSBhIHNoZWxsIGBzZXJ2aWNlLXdvcmtlci1pbmRleC5odG1sYCBmaWxlLFxuXHQvLyB3aGljaCBTYXBwZXIgaGFzIGdlbmVyYXRlZCBmb3IgeW91LiBJdCdzIG5vdCByaWdodCBmb3IgZXZlcnlcblx0Ly8gYXBwLCBidXQgaWYgaXQncyByaWdodCBmb3IgeW91cnMgdGhlbiB1bmNvbW1lbnQgdGhpcyBzZWN0aW9uXG5cdC8qXG5cdGlmICh1cmwub3JpZ2luID09PSBzZWxmLm9yaWdpbiAmJiByb3V0ZXMuZmluZChyb3V0ZSA9PiByb3V0ZS5wYXR0ZXJuLnRlc3QodXJsLnBhdGhuYW1lKSkpIHtcblx0XHRldmVudC5yZXNwb25kV2l0aChjYWNoZXMubWF0Y2goJy9zZXJ2aWNlLXdvcmtlci1pbmRleC5odG1sJykpO1xuXHRcdHJldHVybjtcblx0fVxuXHQqL1xuXG5cdGlmIChldmVudC5yZXF1ZXN0LmNhY2hlID09PSAnb25seS1pZi1jYWNoZWQnKSByZXR1cm47XG5cblx0Ly8gZm9yIGV2ZXJ5dGhpbmcgZWxzZSwgdHJ5IHRoZSBuZXR3b3JrIGZpcnN0LCBmYWxsaW5nIGJhY2sgdG9cblx0Ly8gY2FjaGUgaWYgdGhlIHVzZXIgaXMgb2ZmbGluZS4gKElmIHRoZSBwYWdlcyBuZXZlciBjaGFuZ2UsIHlvdVxuXHQvLyBtaWdodCBwcmVmZXIgYSBjYWNoZS1maXJzdCBhcHByb2FjaCB0byBhIG5ldHdvcmstZmlyc3Qgb25lLilcblx0ZXZlbnQucmVzcG9uZFdpdGgoXG5cdFx0Y2FjaGVzXG5cdFx0XHQub3Blbihgb2ZmbGluZSR7dGltZXN0YW1wfWApXG5cdFx0XHQudGhlbihhc3luYyBjYWNoZSA9PiB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChldmVudC5yZXF1ZXN0KTtcblx0XHRcdFx0XHRjYWNoZS5wdXQoZXZlbnQucmVxdWVzdCwgcmVzcG9uc2UuY2xvbmUoKSk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHRcdFx0XHR9IGNhdGNoKGVycikge1xuXHRcdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FjaGUubWF0Y2goZXZlbnQucmVxdWVzdCk7XG5cdFx0XHRcdFx0aWYgKHJlc3BvbnNlKSByZXR1cm4gcmVzcG9uc2U7XG5cblx0XHRcdFx0XHR0aHJvdyBlcnI7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdCk7XG59KTtcbiJd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
