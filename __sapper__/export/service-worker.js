!function(){"use strict";const e=1638904988477,t="cache"+e,n=["/client/client.cd23e932.js","/client/inject_styles.5607aec6.js","/client/index.41f8c325.js","/client/trinity-thumb.998df228.js","/client/experience.ab6482ee.js","/client/goosehead-insurance.9568597e.js","/client/ProjectDetailTemplate.d09a964b.js","/client/PageTitle.12abd4c9.js","/client/trinity-consultants.79ae3676.js","/client/creative-revolt.022d5fb0.js","/client/university-park.8518a7a1.js","/client/di-repairs.44355b3f.js","/client/stallion.5dac1efa.js","/client/halcyon.d81d565c.js","/client/projects.7eefb3f2.js","/client/about.da38af08.js"].concat(["/service-worker-index.html","/.DS_Store","/background-images/.DS_Store","/background-images/so-white.jpg","/favicon/android-chrome-192x192.png","/favicon/android-chrome-512x512.png","/favicon/apple-touch-icon.png","/favicon/favicon-16x16.png","/favicon/favicon-32x32.png","/favicon/favicon.ico","/favicon/site.webmanifest","/manifest.json","/pdfs/resume-joshua.pdf"]),c=new Set(n);self.addEventListener("install",(e=>{e.waitUntil(caches.open(t).then((e=>e.addAll(n))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const n of e)n!==t&&await caches.delete(n);self.clients.claim()})))})),self.addEventListener("fetch",(t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const n=new URL(t.request.url),a=n.protocol.startsWith("http"),i=n.hostname===self.location.hostname&&n.port!==self.location.port,s=n.host===self.location.host&&c.has(n.pathname),o="only-if-cached"===t.request.cache&&!s;!a||i||o||t.respondWith((async()=>s&&await caches.match(t.request)||async function(t){const n=await caches.open("offline"+e);try{const e=await fetch(t);return n.put(t,e.clone()),e}catch(e){const c=await n.match(t);if(c)return c;throw e}}(t.request))())}))}();
