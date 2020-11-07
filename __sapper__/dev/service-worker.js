(function () {
	'use strict';

	// This file is generated by Sapper — do not edit it!
	const timestamp = 1604776275108;

	const files = [
		"service-worker-index.html",
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
		"images/creative-revolt/about-cta-min.png",
		"images/creative-revolt/about-min.png",
		"images/creative-revolt/home-ctas-min.png",
		"images/creative-revolt/home-min.png",
		"images/creative-revolt/writing-class-min.png",
		"images/halcyon/dining-min.png",
		"images/halcyon/events-min.png",
		"images/halcyon/home-cta-min.png",
		"images/halcyon/home-min.png",
		"images/halcyon/spotlight-min.png",
		"images/stallion/stallion-11-min.png",
		"images/stallion/stallion-2-min.png",
		"images/stallion/stallion-4-min.png",
		"images/stallion/stallion-5-min.png",
		"images/stallion/stallion-6-min.png",
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
		"client/client.0c9b2e48.js",
		"client/index.139fb991.js",
		"client/experience.c3d9220b.js",
		"client/ProjectDetailTemplate.a899b211.js",
		"client/creative-revolt.5c20bbe1.js",
		"client/university-park.b1a3240d.js",
		"client/stallion.06ce5858.js",
		"client/halcyon.b0affd9a.js",
		"client/about.14aaa479.js",
		"client/sapper-dev-client.1e7a4a5e.js",
		"client/client.59b61ccf.js"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS13b3JrZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9zZXJ2aWNlLXdvcmtlci5qcyIsIi4uLy4uL3NyYy9zZXJ2aWNlLXdvcmtlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IFNhcHBlciDigJQgZG8gbm90IGVkaXQgaXQhXG5leHBvcnQgY29uc3QgdGltZXN0YW1wID0gMTYwNDc3NjI3NTEwODtcblxuZXhwb3J0IGNvbnN0IGZpbGVzID0gW1xuXHRcInNlcnZpY2Utd29ya2VyLWluZGV4Lmh0bWxcIixcblx0XCJiYWNrZ3JvdW5kLWltYWdlcy9zby13aGl0ZS5wbmdcIixcblx0XCJmYXZpY29uL2FuZHJvaWQtY2hyb21lLTE5MngxOTIucG5nXCIsXG5cdFwiZmF2aWNvbi9hbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZ1wiLFxuXHRcImZhdmljb24vYXBwbGUtdG91Y2gtaWNvbi5wbmdcIixcblx0XCJmYXZpY29uL2Zhdmljb24tMTZ4MTYucG5nXCIsXG5cdFwiZmF2aWNvbi9mYXZpY29uLTMyeDMyLnBuZ1wiLFxuXHRcImZhdmljb24vZmF2aWNvbi5pY29cIixcblx0XCJmYXZpY29uL3NpdGUud2VibWFuaWZlc3RcIixcblx0XCJmYXZpY29uLnBuZ1wiLFxuXHRcImdsb2JhbC5jc3MuQkFLXCIsXG5cdFwiaW1hZ2VzL2NyZWF0aXZlLXJldm9sdC9hYm91dC1jdGEtbWluLnBuZ1wiLFxuXHRcImltYWdlcy9jcmVhdGl2ZS1yZXZvbHQvYWJvdXQtbWluLnBuZ1wiLFxuXHRcImltYWdlcy9jcmVhdGl2ZS1yZXZvbHQvaG9tZS1jdGFzLW1pbi5wbmdcIixcblx0XCJpbWFnZXMvY3JlYXRpdmUtcmV2b2x0L2hvbWUtbWluLnBuZ1wiLFxuXHRcImltYWdlcy9jcmVhdGl2ZS1yZXZvbHQvd3JpdGluZy1jbGFzcy1taW4ucG5nXCIsXG5cdFwiaW1hZ2VzL2hhbGN5b24vZGluaW5nLW1pbi5wbmdcIixcblx0XCJpbWFnZXMvaGFsY3lvbi9ldmVudHMtbWluLnBuZ1wiLFxuXHRcImltYWdlcy9oYWxjeW9uL2hvbWUtY3RhLW1pbi5wbmdcIixcblx0XCJpbWFnZXMvaGFsY3lvbi9ob21lLW1pbi5wbmdcIixcblx0XCJpbWFnZXMvaGFsY3lvbi9zcG90bGlnaHQtbWluLnBuZ1wiLFxuXHRcImltYWdlcy9zdGFsbGlvbi9zdGFsbGlvbi0xMS1taW4ucG5nXCIsXG5cdFwiaW1hZ2VzL3N0YWxsaW9uL3N0YWxsaW9uLTItbWluLnBuZ1wiLFxuXHRcImltYWdlcy9zdGFsbGlvbi9zdGFsbGlvbi00LW1pbi5wbmdcIixcblx0XCJpbWFnZXMvc3RhbGxpb24vc3RhbGxpb24tNS1taW4ucG5nXCIsXG5cdFwiaW1hZ2VzL3N0YWxsaW9uL3N0YWxsaW9uLTYtbWluLnBuZ1wiLFxuXHRcImltYWdlcy91bml2ZXJzaXR5LXBhcmsvZm9ybS1taW4ucG5nXCIsXG5cdFwiaW1hZ2VzL3VuaXZlcnNpdHktcGFyay9ob21lLW1pbi5wbmdcIixcblx0XCJpbWFnZXMvdW5pdmVyc2l0eS1wYXJrL2hvbWUtdmlkZW8tbWluLnBuZ1wiLFxuXHRcImltYWdlcy91bml2ZXJzaXR5LXBhcmsvbGlicmFyeS1taW4ucG5nXCIsXG5cdFwiaW1hZ2VzL3VuaXZlcnNpdHktcGFyay9uZXdzbGV0dGVyLW1pbi5wbmdcIixcblx0XCJtYW5pZmVzdC5qc29uXCIsXG5cdFwicGRmcy9yZXN1bWUtam9zaHVhLXJvcGVyLnBkZlwiLFxuXHRcInRodW1ibmFpbHMvSm9yZGVuLUJhY2tncm91bmQtR3JheS1taW4uanBnXCIsXG5cdFwidGh1bWJuYWlscy9oYWxjeW9uLTUtbWluLmpwZ1wiLFxuXHRcInRodW1ibmFpbHMvcHJvZmVzc2lvbmFsLWhlcm8tbWluLmpwZ1wiLFxuXHRcInRodW1ibmFpbHMvc3RhbGxpb24tdGh1bWItYS1taW4uanBnXCIsXG5cdFwidGh1bWJuYWlscy91cHRleGFzLXRodW1iLW1pbi5qcGdcIlxuXTtcbmV4cG9ydCB7IGZpbGVzIGFzIGFzc2V0cyB9OyAvLyBsZWdhY3lcblxuZXhwb3J0IGNvbnN0IHNoZWxsID0gW1xuXHRcImNsaWVudC9jbGllbnQuMGM5YjJlNDguanNcIixcblx0XCJjbGllbnQvaW5kZXguMTM5ZmI5OTEuanNcIixcblx0XCJjbGllbnQvZXhwZXJpZW5jZS5jM2Q5MjIwYi5qc1wiLFxuXHRcImNsaWVudC9Qcm9qZWN0RGV0YWlsVGVtcGxhdGUuYTg5OWIyMTEuanNcIixcblx0XCJjbGllbnQvY3JlYXRpdmUtcmV2b2x0LjVjMjBiYmUxLmpzXCIsXG5cdFwiY2xpZW50L3VuaXZlcnNpdHktcGFyay5iMWEzMjQwZC5qc1wiLFxuXHRcImNsaWVudC9zdGFsbGlvbi4wNmNlNTg1OC5qc1wiLFxuXHRcImNsaWVudC9oYWxjeW9uLmIwYWZmZDlhLmpzXCIsXG5cdFwiY2xpZW50L2Fib3V0LjE0YWFhNDc5LmpzXCIsXG5cdFwiY2xpZW50L3NhcHBlci1kZXYtY2xpZW50LjFlN2E0YTVlLmpzXCIsXG5cdFwiY2xpZW50L2NsaWVudC41OWI2MWNjZi5qc1wiXG5dO1xuXG5leHBvcnQgY29uc3Qgcm91dGVzID0gW1xuXHR7IHBhdHRlcm46IC9eXFwvJC8gfSxcblx0eyBwYXR0ZXJuOiAvXlxcL2V4cGVyaWVuY2VcXC8/JC8gfSxcblx0eyBwYXR0ZXJuOiAvXlxcL3Byb2plY3RzXFwvY3JlYXRpdmUtcmV2b2x0XFwvPyQvIH0sXG5cdHsgcGF0dGVybjogL15cXC9wcm9qZWN0c1xcL3VuaXZlcnNpdHktcGFya1xcLz8kLyB9LFxuXHR7IHBhdHRlcm46IC9eXFwvcHJvamVjdHNcXC9zdGFsbGlvblxcLz8kLyB9LFxuXHR7IHBhdHRlcm46IC9eXFwvcHJvamVjdHNcXC9oYWxjeW9uXFwvPyQvIH0sXG5cdHsgcGF0dGVybjogL15cXC9hYm91dFxcLz8kLyB9XG5dOyIsImltcG9ydCB7IHRpbWVzdGFtcCwgZmlsZXMsIHNoZWxsLCByb3V0ZXMgfSBmcm9tICdAc2FwcGVyL3NlcnZpY2Utd29ya2VyJztcblxuY29uc3QgQVNTRVRTID0gYGNhY2hlJHt0aW1lc3RhbXB9YDtcblxuLy8gYHNoZWxsYCBpcyBhbiBhcnJheSBvZiBhbGwgdGhlIGZpbGVzIGdlbmVyYXRlZCBieSB0aGUgYnVuZGxlcixcbi8vIGBmaWxlc2AgaXMgYW4gYXJyYXkgb2YgZXZlcnl0aGluZyBpbiB0aGUgYHN0YXRpY2AgZGlyZWN0b3J5XG5jb25zdCB0b19jYWNoZSA9IHNoZWxsLmNvbmNhdChmaWxlcyk7XG5jb25zdCBjYWNoZWQgPSBuZXcgU2V0KHRvX2NhY2hlKTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgZXZlbnQgPT4ge1xuXHRldmVudC53YWl0VW50aWwoXG5cdFx0Y2FjaGVzXG5cdFx0XHQub3BlbihBU1NFVFMpXG5cdFx0XHQudGhlbihjYWNoZSA9PiBjYWNoZS5hZGRBbGwodG9fY2FjaGUpKVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRzZWxmLnNraXBXYWl0aW5nKCk7XG5cdFx0XHR9KVxuXHQpO1xufSk7XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignYWN0aXZhdGUnLCBldmVudCA9PiB7XG5cdGV2ZW50LndhaXRVbnRpbChcblx0XHRjYWNoZXMua2V5cygpLnRoZW4oYXN5bmMga2V5cyA9PiB7XG5cdFx0XHQvLyBkZWxldGUgb2xkIGNhY2hlc1xuXHRcdFx0Zm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuXHRcdFx0XHRpZiAoa2V5ICE9PSBBU1NFVFMpIGF3YWl0IGNhY2hlcy5kZWxldGUoa2V5KTtcblx0XHRcdH1cblxuXHRcdFx0c2VsZi5jbGllbnRzLmNsYWltKCk7XG5cdFx0fSlcblx0KTtcbn0pO1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgZXZlbnQgPT4ge1xuXHRpZiAoZXZlbnQucmVxdWVzdC5tZXRob2QgIT09ICdHRVQnIHx8IGV2ZW50LnJlcXVlc3QuaGVhZGVycy5oYXMoJ3JhbmdlJykpIHJldHVybjtcblxuXHRjb25zdCB1cmwgPSBuZXcgVVJMKGV2ZW50LnJlcXVlc3QudXJsKTtcblxuXHQvLyBkb24ndCB0cnkgdG8gaGFuZGxlIGUuZy4gZGF0YTogVVJJc1xuXHRpZiAoIXVybC5wcm90b2NvbC5zdGFydHNXaXRoKCdodHRwJykpIHJldHVybjtcblxuXHQvLyBpZ25vcmUgZGV2IHNlcnZlciByZXF1ZXN0c1xuXHRpZiAodXJsLmhvc3RuYW1lID09PSBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lICYmIHVybC5wb3J0ICE9PSBzZWxmLmxvY2F0aW9uLnBvcnQpIHJldHVybjtcblxuXHQvLyBhbHdheXMgc2VydmUgc3RhdGljIGZpbGVzIGFuZCBidW5kbGVyLWdlbmVyYXRlZCBhc3NldHMgZnJvbSBjYWNoZVxuXHRpZiAodXJsLmhvc3QgPT09IHNlbGYubG9jYXRpb24uaG9zdCAmJiBjYWNoZWQuaGFzKHVybC5wYXRobmFtZSkpIHtcblx0XHRldmVudC5yZXNwb25kV2l0aChjYWNoZXMubWF0Y2goZXZlbnQucmVxdWVzdCkpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIGZvciBwYWdlcywgeW91IG1pZ2h0IHdhbnQgdG8gc2VydmUgYSBzaGVsbCBgc2VydmljZS13b3JrZXItaW5kZXguaHRtbGAgZmlsZSxcblx0Ly8gd2hpY2ggU2FwcGVyIGhhcyBnZW5lcmF0ZWQgZm9yIHlvdS4gSXQncyBub3QgcmlnaHQgZm9yIGV2ZXJ5XG5cdC8vIGFwcCwgYnV0IGlmIGl0J3MgcmlnaHQgZm9yIHlvdXJzIHRoZW4gdW5jb21tZW50IHRoaXMgc2VjdGlvblxuXHQvKlxuXHRpZiAodXJsLm9yaWdpbiA9PT0gc2VsZi5vcmlnaW4gJiYgcm91dGVzLmZpbmQocm91dGUgPT4gcm91dGUucGF0dGVybi50ZXN0KHVybC5wYXRobmFtZSkpKSB7XG5cdFx0ZXZlbnQucmVzcG9uZFdpdGgoY2FjaGVzLm1hdGNoKCcvc2VydmljZS13b3JrZXItaW5kZXguaHRtbCcpKTtcblx0XHRyZXR1cm47XG5cdH1cblx0Ki9cblxuXHRpZiAoZXZlbnQucmVxdWVzdC5jYWNoZSA9PT0gJ29ubHktaWYtY2FjaGVkJykgcmV0dXJuO1xuXG5cdC8vIGZvciBldmVyeXRoaW5nIGVsc2UsIHRyeSB0aGUgbmV0d29yayBmaXJzdCwgZmFsbGluZyBiYWNrIHRvXG5cdC8vIGNhY2hlIGlmIHRoZSB1c2VyIGlzIG9mZmxpbmUuIChJZiB0aGUgcGFnZXMgbmV2ZXIgY2hhbmdlLCB5b3Vcblx0Ly8gbWlnaHQgcHJlZmVyIGEgY2FjaGUtZmlyc3QgYXBwcm9hY2ggdG8gYSBuZXR3b3JrLWZpcnN0IG9uZS4pXG5cdGV2ZW50LnJlc3BvbmRXaXRoKFxuXHRcdGNhY2hlc1xuXHRcdFx0Lm9wZW4oYG9mZmxpbmUke3RpbWVzdGFtcH1gKVxuXHRcdFx0LnRoZW4oYXN5bmMgY2FjaGUgPT4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZXZlbnQucmVxdWVzdCk7XG5cdFx0XHRcdFx0Y2FjaGUucHV0KGV2ZW50LnJlcXVlc3QsIHJlc3BvbnNlLmNsb25lKCkpO1xuXHRcdFx0XHRcdHJldHVybiByZXNwb25zZTtcblx0XHRcdFx0fSBjYXRjaChlcnIpIHtcblx0XHRcdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhY2hlLm1hdGNoKGV2ZW50LnJlcXVlc3QpO1xuXHRcdFx0XHRcdGlmIChyZXNwb25zZSkgcmV0dXJuIHJlc3BvbnNlO1xuXG5cdFx0XHRcdFx0dGhyb3cgZXJyO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHQpO1xufSk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0NBQUE7Q0FDTyxNQUFNLFNBQVMsR0FBRyxhQUFhLENBQUM7QUFDdkM7Q0FDTyxNQUFNLEtBQUssR0FBRztDQUNyQixDQUFDLDJCQUEyQjtDQUM1QixDQUFDLGdDQUFnQztDQUNqQyxDQUFDLG9DQUFvQztDQUNyQyxDQUFDLG9DQUFvQztDQUNyQyxDQUFDLDhCQUE4QjtDQUMvQixDQUFDLDJCQUEyQjtDQUM1QixDQUFDLDJCQUEyQjtDQUM1QixDQUFD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
