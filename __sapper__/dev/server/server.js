'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sirv = _interopDefault(require('sirv'));
var polka = _interopDefault(require('polka'));
var compression = _interopDefault(require('compression'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var Stream = _interopDefault(require('stream'));
var http = _interopDefault(require('http'));
var Url = _interopDefault(require('url'));
var https = _interopDefault(require('https'));
var zlib = _interopDefault(require('zlib'));

// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
	{
		title: 'What is Sapper?',
		slug: 'what-is-sapper',
		html: `
			<p>First, you have to know what <a href='https://svelte.dev'>Svelte</a> is. Svelte is a UI framework with a bold new idea: rather than providing a library that you write code with (like React or Vue, for example), it's a compiler that turns your components into highly optimized vanilla JavaScript. If you haven't already read the <a href='https://svelte.dev/blog/frameworks-without-the-framework'>introductory blog post</a>, you should!</p>

			<p>Sapper is a Next.js-style framework (<a href='blog/how-is-sapper-different-from-next'>more on that here</a>) built around Svelte. It makes it embarrassingly easy to create extremely high performance web apps. Out of the box, you get:</p>

			<ul>
				<li>Code-splitting, dynamic imports and hot module replacement, powered by webpack</li>
				<li>Server-side rendering (SSR) with client-side hydration</li>
				<li>Service worker for offline support, and all the PWA bells and whistles</li>
				<li>The nicest development experience you've ever had, or your money back</li>
			</ul>

			<p>It's implemented as Express middleware. Everything is set up and waiting for you to get started, but you keep complete control over the server, service worker, webpack config and everything else, so it's as flexible as you need it to be.</p>
		`
	},

	{
		title: 'How to use Sapper',
		slug: 'how-to-use-sapper',
		html: `
			<h2>Step one</h2>
			<p>Create a new project, using <a href='https://github.com/Rich-Harris/degit'>degit</a>:</p>

			<pre><code>npx degit "sveltejs/sapper-template#rollup" my-app
			cd my-app
			npm install # or yarn!
			npm run dev
			</code></pre>

			<h2>Step two</h2>
			<p>Go to <a href='http://localhost:3000'>localhost:3000</a>. Open <code>my-app</code> in your editor. Edit the files in the <code>src/routes</code> directory or add new ones.</p>

			<h2>Step three</h2>
			<p>...</p>

			<h2>Step four</h2>
			<p>Resist overdone joke formats.</p>
		`
	},

	{
		title: 'Why the name?',
		slug: 'why-the-name',
		html: `
			<p>In war, the soldiers who build bridges, repair roads, clear minefields and conduct demolitions — all under combat conditions — are known as <em>sappers</em>.</p>

			<p>For web developers, the stakes are generally lower than those for combat engineers. But we face our own hostile environment: underpowered devices, poor network connections, and the complexity inherent in front-end engineering. Sapper, which is short for <strong>S</strong>velte <strong>app</strong> mak<strong>er</strong>, is your courageous and dutiful ally.</p>
		`
	},

	{
		title: 'How is Sapper different from Next.js?',
		slug: 'how-is-sapper-different-from-next',
		html: `
			<p><a href='https://github.com/zeit/next.js'>Next.js</a> is a React framework from <a href='https://zeit.co'>Zeit</a>, and is the inspiration for Sapper. There are a few notable differences, however:</p>

			<ul>
				<li>It's powered by <a href='https://svelte.dev'>Svelte</a> instead of React, so it's faster and your apps are smaller</li>
				<li>Instead of route masking, we encode route parameters in filenames. For example, the page you're looking at right now is <code>src/routes/blog/[slug].html</code></li>
				<li>As well as pages (Svelte components, which render on server or client), you can create <em>server routes</em> in your <code>routes</code> directory. These are just <code>.js</code> files that export functions corresponding to HTTP methods, and receive Express <code>request</code> and <code>response</code> objects as arguments. This makes it very easy to, for example, add a JSON API such as the one <a href='blog/how-is-sapper-different-from-next.json'>powering this very page</a></li>
				<li>Links are just <code>&lt;a&gt;</code> elements, rather than framework-specific <code>&lt;Link&gt;</code> components. That means, for example, that <a href='blog/how-can-i-get-involved'>this link right here</a>, despite being inside a blob of HTML, works with the router as you'd expect.</li>
			</ul>
		`
	},

	{
		title: 'How can I get involved?',
		slug: 'how-can-i-get-involved',
		html: `
			<p>We're so glad you asked! Come on over to the <a href='https://github.com/sveltejs/svelte'>Svelte</a> and <a href='https://github.com/sveltejs/sapper'>Sapper</a> repos, and join us in the <a href='https://svelte.dev/chat'>Discord chatroom</a>. Everyone is welcome, especially you!</p>
		`
	}
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		slug: post.slug
	};
}));

function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}

var route_0 = /*#__PURE__*/Object.freeze({
	get: get
});

const lookup = new Map();
posts.forEach(post => {
	lookup.set(post.slug, JSON.stringify(post));
});

function get$1(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

var route_1 = /*#__PURE__*/Object.freeze({
	get: get$1
});

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function null_to_empty(value) {
    return value == null ? '' : value;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error(`Function called outside component initialization`);
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

/* src/components/hero/HeroImg.svelte generated by Svelte v3.9.1 */

const css = {
	code: ".hero-image.svelte-rziffi{width:250px;height:420px;background-image:url(\"../images/hero-doe.png\");background-size:cover;-o-background-size:cover;-moz-background-size:cover;-webkit-background-size:cover;background-position:45% 65%;box-shadow:3px 3px 3px lightgrey;position:relative;z-index:2;transition:top .01s ease-in}@media screen and (min-width: 40em){.hero-image.svelte-rziffi{margin-right:-70px;width:220px;background-position:45% 25%;height:320px}}@media screen and (min-width: 64em){.hero-image.svelte-rziffi{margin-right:-90px;width:320px;height:520px}}@media screen and (min-width: 1366px){.hero-image.svelte-rziffi{width:420px;height:620px}}@media screen and (min-width: 40em){.box.svelte-rziffi{display:inline-block;background:url(\"../images/drawing.jpg\");z-index:-1;display:flex;align-items:center;justify-content:flex-end;width:237px;border:3px solid black;height:411px;background:transparent}}@media screen and (min-width: 64em){.box.svelte-rziffi{width:355px;height:616px}}@media screen and (min-width: 1366px){.box.svelte-rziffi{width:497px;height:862.4px}}img.svelte-rziffi{display:none}",
	map: "{\"version\":3,\"file\":\"HeroImg.svelte\",\"sources\":[\"HeroImg.svelte\"],\"sourcesContent\":[\"<script>\\nimport { onMount } from 'svelte';\\nlet heroImg;\\n</script>\\n\\n<style>\\n\\n    .hero-image{\\n        width: 250px;\\n        height: 420px;\\n        background-image: url(\\\"../images/hero-doe.png\\\");\\n        background-size: cover;\\n         -o-background-size: cover;\\n        -moz-background-size: cover;\\n        -webkit-background-size: cover;\\n        background-position: 45% 65%;\\n        box-shadow: 3px 3px 3px lightgrey;\\n        position: relative;\\n        z-index: 2;\\n        transition: top .01s ease-in;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        .hero-image {\\n            margin-right: -70px;\\n            width: 220px;\\n            background-position: 45% 25%;\\n            height: 320px;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        .hero-image {\\n            margin-right: -90px;\\n            width: 320px;\\n            height: 520px;\\n        }\\n    }\\n\\n    @media screen and (min-width: 1366px){\\n        .hero-image {\\n            width: 420px;\\n            height: 620px;\\n        }\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        .box {\\n            display: inline-block;\\n            background: url(\\\"../images/drawing.jpg\\\");\\n            z-index: -1;\\n            display: flex;\\n            align-items: center;\\n            justify-content: flex-end;\\n            width: 237px;\\n            border: 3px solid black;\\n            height: 411px;\\n            background: transparent;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em) {\\n        .box {\\n            width: 355px;\\n            height: 616px;\\n        }\\n    }\\n\\n    @media screen and (min-width: 1366px){\\n        .box {\\n            width: 497px;\\n            height: 862.4px;\\n        }\\n    }\\n\\n    img {\\n        display: none;\\n    }\\n\\n</style>\\n\\n<img width=\\\"1px\\\" height=\\\"1px\\\" src=\\\"images/hero-doe.png\\\" alt=\\\"A picture of Joshua Roper leaning against a wall.\\\" >\\n<div class=\\\"box\\\">\\n    <div class=\\\"hero-image\\\" ></div>\\n</div>\"],\"names\":[],\"mappings\":\"AAOI,yBAAW,CAAC,AACR,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,gBAAgB,CAAE,IAAI,wBAAwB,CAAC,CAC/C,eAAe,CAAE,KAAK,CACrB,kBAAkB,CAAE,KAAK,CAC1B,oBAAoB,CAAE,KAAK,CAC3B,uBAAuB,CAAE,KAAK,CAC9B,mBAAmB,CAAE,GAAG,CAAC,GAAG,CAC5B,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,SAAS,CACjC,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,OAAO,AAChC,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,WAAW,cAAC,CAAC,AACT,YAAY,CAAE,KAAK,CACnB,KAAK,CAAE,KAAK,CACZ,mBAAmB,CAAE,GAAG,CAAC,GAAG,CAC5B,MAAM,CAAE,KAAK,AACjB,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,WAAW,cAAC,CAAC,AACT,YAAY,CAAE,KAAK,CACnB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,AACjB,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,CAAC,AAClC,WAAW,cAAC,CAAC,AACT,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,AACjB,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,IAAI,cAAC,CAAC,AACF,OAAO,CAAE,YAAY,CACrB,UAAU,CAAE,IAAI,uBAAuB,CAAC,CACxC,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,QAAQ,CACzB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CACvB,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,WAAW,AAC3B,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,IAAI,cAAC,CAAC,AACF,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,AACjB,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,CAAC,AAClC,IAAI,cAAC,CAAC,AACF,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,OAAO,AACnB,CAAC,AACL,CAAC,AAED,GAAG,cAAC,CAAC,AACD,OAAO,CAAE,IAAI,AACjB,CAAC\"}"
};

const HeroImg = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {

	$$result.css.add(css);

	return `<img width="1px" height="1px" src="images/hero-doe.png" alt="A picture of Joshua Roper leaning against a wall." class="svelte-rziffi">
	<div class="box svelte-rziffi">
	    <div class="hero-image svelte-rziffi"></div>
	</div>`;
});

/* src/components/hero/HeroText.svelte generated by Svelte v3.9.1 */

const css$1 = {
	code: "h1.svelte-q1dgpq{color:#3B3B3B;font-weight:800;font-size:23px}h2.svelte-q1dgpq{color:#3B3B3B;font-weight:800;font-size:18px;margin-bottom:5px;margin-top:-3px;opacity:.85}h3.svelte-q1dgpq{display:flex;align-items:center;font-size:14px;font-weight:400;opacity:.8;margin-bottom:15px}h3.svelte-q1dgpq::before{content:'';display:block;width:30px;border-bottom:3px solid black;margin-right:10px;opacity:.8}@media screen and (min-width: 40em){h1.svelte-q1dgpq{font-size:28px}h2.svelte-q1dgpq{font-size:22px;margin-bottom:7px}h3.svelte-q1dgpq{margin-bottom:0}}@media screen and (min-width: 64em){h1.svelte-q1dgpq{font-size:38px}h2.svelte-q1dgpq{font-size:28px;margin-bottom:9px;margin-top:-5px}h3.svelte-q1dgpq{font-size:18px}}@media screen and (min-width: 1366px){h1.svelte-q1dgpq{font-size:45px}h2.svelte-q1dgpq{font-size:38px}h3.svelte-q1dgpq{font-size:23px}}",
	map: "{\"version\":3,\"file\":\"HeroText.svelte\",\"sources\":[\"HeroText.svelte\"],\"sourcesContent\":[\"<script>\\n\\n</script>\\n\\n<style>\\nh1 {\\n    color:#3B3B3B;\\n    font-weight: 800;\\n    /* margin-bottom: 5px; */\\n    /* margin-top: -3px; */\\n    font-size: 23px;\\n}\\nh2 {\\n    color:#3B3B3B;\\n    font-weight: 800;\\n    font-size: 18px;\\n    margin-bottom: 5px;\\n    margin-top: -3px;\\n    opacity: .85;\\n}\\n\\nh3 {\\n    display: flex;\\n    align-items: center;\\n    font-size: 14px;\\n    font-weight: 400;\\n    opacity: .8;\\n    margin-bottom: 15px;\\n}\\n\\nh3::before {\\n    content: '';\\n    display: block;\\n    width: 30px;\\n    border-bottom: 3px solid black;\\n    margin-right: 10px;\\n    opacity: .8;\\n}\\n\\n@media screen and (min-width: 40em){\\n    h1 {\\n        font-size: 28px;\\n    }\\n    h2 {\\n        font-size: 22px;\\n        margin-bottom: 7px;\\n    }\\n    h3 {\\n        margin-bottom: 0;\\n    }\\n}\\n\\n@media screen and (min-width: 64em) {\\n    h1 {\\n        font-size: 38px;\\n    }\\n    h2 {\\n        font-size: 28px;\\n        margin-bottom: 9px;\\n        margin-top: -5px;\\n    }\\n    h3 {\\n        font-size: 18px;\\n    }\\n}\\n\\n @media screen and (min-width: 1366px){\\n      h1 {\\n        font-size: 45px;\\n    }\\n    h2 {\\n        font-size: 38px;\\n    }\\n    h3 {\\n        font-size: 23px;\\n    }\\n }\\n</style>\\n\\n<h1>Front End Developer</h1>\\n<h2>React, Svelte, ES6</h2>\\n<h3>Joshua Roper</h3>\"],\"names\":[],\"mappings\":\"AAKA,EAAE,cAAC,CAAC,AACA,MAAM,OAAO,CACb,WAAW,CAAE,GAAG,CAGhB,SAAS,CAAE,IAAI,AACnB,CAAC,AACD,EAAE,cAAC,CAAC,AACA,MAAM,OAAO,CACb,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,GAAG,AAChB,CAAC,AAED,EAAE,cAAC,CAAC,AACA,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,EAAE,CACX,aAAa,CAAE,IAAI,AACvB,CAAC,AAED,gBAAE,QAAQ,AAAC,CAAC,AACR,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAC9B,YAAY,CAAE,IAAI,CAClB,OAAO,CAAE,EAAE,AACf,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,cAAC,CAAC,AACA,SAAS,CAAE,IAAI,AACnB,CAAC,AACD,EAAE,cAAC,CAAC,AACA,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,GAAG,AACtB,CAAC,AACD,EAAE,cAAC,CAAC,AACA,aAAa,CAAE,CAAC,AACpB,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,EAAE,cAAC,CAAC,AACA,SAAS,CAAE,IAAI,AACnB,CAAC,AACD,EAAE,cAAC,CAAC,AACA,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,AACpB,CAAC,AACD,EAAE,cAAC,CAAC,AACA,SAAS,CAAE,IAAI,AACnB,CAAC,AACL,CAAC,AAEA,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,CAAC,AACjC,EAAE,cAAC,CAAC,AACF,SAAS,CAAE,IAAI,AACnB,CAAC,AACD,EAAE,cAAC,CAAC,AACA,SAAS,CAAE,IAAI,AACnB,CAAC,AACD,EAAE,cAAC,CAAC,AACA,SAAS,CAAE,IAAI,AACnB,CAAC,AACJ,CAAC\"}"
};

const HeroText = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$1);

	return `<h1 class="svelte-q1dgpq">Front End Developer</h1>
	<h2 class="svelte-q1dgpq">React, Svelte, ES6</h2>
	<h3 class="svelte-q1dgpq">Joshua Roper</h3>`;
});

/* src/components/hero/Hero.svelte generated by Svelte v3.9.1 */

const css$2 = {
	code: ".hero-container.svelte-gyswp7{width:100%;display:flex;z-index:1;flex-direction:column-reverse;align-items:center;position:relative\n }@media screen and (min-width: 40em){.hero-container.svelte-gyswp7{flex-direction:row}}.hero.svelte-gyswp7{width:auto;display:flex;align-items:center;width:auto;justify-content:flex-start}@media screen and (min-width: 40em){.hero.svelte-gyswp7{width:100%}}.text.svelte-gyswp7{width:100%}@media screen and (min-width: 40em){.text.svelte-gyswp7{padding-left:10rem}}@media screen and (min-width: 64em){.text.svelte-gyswp7{padding-left:40rem}}@media screen and (min-width: 75em){.text.svelte-gyswp7{padding-left:70rem}}",
	map: "{\"version\":3,\"file\":\"Hero.svelte\",\"sources\":[\"Hero.svelte\"],\"sourcesContent\":[\"<script>\\nimport { onMount } from 'svelte'\\n\\nimport HeroImg from './HeroImg.svelte';\\nimport HeroText from './HeroText.svelte';\\n\\n    \\n</script>\\n\\n<style>\\n .hero-container{\\n     width: 100%;\\n     display: flex;\\n     z-index: 1;\\n     flex-direction: column-reverse;\\n     align-items: center;\\n     position: relative\\n }\\n\\n@media screen and (min-width: 40em) {\\n    .hero-container {\\n        flex-direction: row;\\n    }\\n}\\n\\n .hero {\\n     width: auto;\\n     display: flex;\\n    align-items: center;\\n    width: auto;\\n    justify-content: flex-start;\\n }\\n\\n@media screen and (min-width: 40em) {\\n    .hero {\\n        width: 100%;\\n    }\\n}\\n\\n.text {\\n    width: 100%;\\n}\\n\\n@media screen and (min-width: 40em) {\\n    .text {\\n        padding-left: 10rem;\\n    }\\n}\\n\\n@media screen and (min-width: 64em){\\n    .text {\\n        padding-left: 40rem;\\n    }   \\n}\\n\\n@media screen and (min-width: 75em){\\n    .text {\\n        padding-left: 70rem;\\n    }\\n}\\n\\n</style>\\n\\n<div class=\\\"hero-container\\\">\\n    <div class=\\\"hero\\\">\\n        <HeroImg />\\n    </div>\\n    <div class=\\\"text\\\">\\n        <HeroText />\\n    </div>\\n</div>\"],\"names\":[],\"mappings\":\"AAUC,6BAAe,CAAC,AACZ,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,CAAC,CACV,cAAc,CAAE,cAAc,CAC9B,WAAW,CAAE,MAAM,CACnB,QAAQ,CAAE,QAAQ;CACtB,CAAC,AAEF,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,eAAe,cAAC,CAAC,AACb,cAAc,CAAE,GAAG,AACvB,CAAC,AACL,CAAC,AAEA,KAAK,cAAC,CAAC,AACH,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACd,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IAAI,CACX,eAAe,CAAE,UAAU,AAC9B,CAAC,AAEF,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,KAAK,cAAC,CAAC,AACH,KAAK,CAAE,IAAI,AACf,CAAC,AACL,CAAC,AAED,KAAK,cAAC,CAAC,AACH,KAAK,CAAE,IAAI,AACf,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,KAAK,cAAC,CAAC,AACH,YAAY,CAAE,KAAK,AACvB,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,KAAK,cAAC,CAAC,AACH,YAAY,CAAE,KAAK,AACvB,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,KAAK,cAAC,CAAC,AACH,YAAY,CAAE,KAAK,AACvB,CAAC,AACL,CAAC\"}"
};

const Hero = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$2);

	return `<div class="hero-container svelte-gyswp7">
	    <div class="hero svelte-gyswp7">
	        ${validate_component(HeroImg, 'HeroImg').$$render($$result, {}, {}, {})}
	    </div>
	    <div class="text svelte-gyswp7">
	        ${validate_component(HeroText, 'HeroText').$$render($$result, {}, {}, {})}
	    </div>
	</div>`;
});

/* src/components/projects/Image.svelte generated by Svelte v3.9.1 */

const css$3 = {
	code: "a.svelte-1l7rekn,div.svelte-1l7rekn{max-width:100%}a.svelte-1l7rekn{opacity:1}.img-container.svelte-1l7rekn{position:relative;overflow:hidden;width:65vw;height:65vw;max-height:250px;box-shadow:3px 3px 3px lightgrey;transition:all .3s ease-in}@media screen and (min-width: 40em){.img-container.svelte-1l7rekn{max-width:100%;width:25vw;height:25vw;max-width:350px;max-height:350px}.large.svelte-1l7rekn .img-container.svelte-1l7rekn{width:30vw;height:30vw;max-width:450px;max-height:450px}.full-width.svelte-1l7rekn{width:100%}.full-width.svelte-1l7rekn .img-container.svelte-1l7rekn{width:calc(50% - 30vw + 60vw);height:30vw;margin:0 auto;max-width:1039px;max-height:450px}}a.svelte-1l7rekn:hover .img-container.svelte-1l7rekn{position:relative;transform:translateY(-3px);box-shadow:5px 5px 5px lightgrey}img.svelte-1l7rekn{object-fit:cover;transition:all .3s ease-in;width:100%;height:100%}",
	map: "{\"version\":3,\"file\":\"Image.svelte\",\"sources\":[\"Image.svelte\"],\"sourcesContent\":[\"<script>\\nexport let imgSrc, alt;\\nexport let projectName;\\nexport let url;\\nexport let width;\\n</script>\\n\\n<style>\\n    a, div{\\n        max-width: 100%;\\n    }\\n\\n    a {\\n        opacity: 1;\\n    }\\n\\n    .img-container{\\n        position: relative;\\n        overflow: hidden;\\n        width: 65vw;\\n        height: 65vw;\\n        max-height: 250px;\\n        box-shadow: 3px 3px 3px lightgrey;\\n        transition: all .3s ease-in;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        .img-container{\\n            max-width:100%; \\n            width: 25vw;\\n            height: 25vw;\\n            max-width: 350px;\\n            max-height: 350px;\\n        } \\n\\n        .large .img-container {\\n            width: 30vw;\\n            height: 30vw;\\n            max-width: 450px;\\n            max-height: 450px;\\n        }\\n\\n        .full-width {\\n            width: 100%;\\n        }\\n\\n        .full-width .img-container { \\n            width: calc(50% - 30vw + 60vw);\\n            height: 30vw;\\n            margin: 0 auto;\\n            /* margin-left: auto; */\\n            max-width: 1039px;\\n            max-height: 450px;\\n        }\\n    }\\n\\n    a:hover .img-container {\\n        position: relative;\\n        transform: translateY(-3px);\\n        box-shadow: 5px 5px 5px lightgrey;\\n    }\\n\\n    img {\\n        object-fit: cover;\\n        transition: all .3s ease-in;\\n        width: 100%;\\n        height: 100%;\\n    }\\n   \\n</style>\\n\\n<a target=\\\"blank\\\" class=\\\"{width}\\\" href=\\\"{url}\\\">\\n    <div class=\\\"img-container\\\">\\n      <img src=\\\"{imgSrc}\\\" alt=\\\"{alt}\\\">\\n    </div>\\n</a>\"],\"names\":[],\"mappings\":\"AAQI,gBAAC,CAAE,kBAAG,CAAC,AACH,SAAS,CAAE,IAAI,AACnB,CAAC,AAED,CAAC,eAAC,CAAC,AACC,OAAO,CAAE,CAAC,AACd,CAAC,AAED,6BAAc,CAAC,AACX,QAAQ,CAAE,QAAQ,CAClB,QAAQ,CAAE,MAAM,CAChB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,CACjB,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,SAAS,CACjC,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,OAAO,AAC/B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,6BAAc,CAAC,AACX,UAAU,IAAI,CACd,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,KAAK,AACrB,CAAC,AAED,qBAAM,CAAC,cAAc,eAAC,CAAC,AACnB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,KAAK,AACrB,CAAC,AAED,WAAW,eAAC,CAAC,AACT,KAAK,CAAE,IAAI,AACf,CAAC,AAED,0BAAW,CAAC,cAAc,eAAC,CAAC,AACxB,KAAK,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CAC9B,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,CAAC,CAAC,IAAI,CAEd,SAAS,CAAE,MAAM,CACjB,UAAU,CAAE,KAAK,AACrB,CAAC,AACL,CAAC,AAED,gBAAC,MAAM,CAAC,cAAc,eAAC,CAAC,AACpB,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,SAAS,AACrC,CAAC,AAED,GAAG,eAAC,CAAC,AACD,UAAU,CAAE,KAAK,CACjB,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,OAAO,CAC3B,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AAChB,CAAC\"}"
};

const Image = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { imgSrc, alt, projectName, url, width } = $$props;

	if ($$props.imgSrc === void 0 && $$bindings.imgSrc && imgSrc !== void 0) $$bindings.imgSrc(imgSrc);
	if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0) $$bindings.alt(alt);
	if ($$props.projectName === void 0 && $$bindings.projectName && projectName !== void 0) $$bindings.projectName(projectName);
	if ($$props.url === void 0 && $$bindings.url && url !== void 0) $$bindings.url(url);
	if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);

	$$result.css.add(css$3);

	return `<a target="blank" class="${escape(null_to_empty(width))} svelte-1l7rekn"${add_attribute("href", url, 0)}>
	    <div class="img-container svelte-1l7rekn">
	      <img${add_attribute("src", imgSrc, 0)}${add_attribute("alt", alt, 0)} class="svelte-1l7rekn">
	    </div>
	</a>`;
});

/* src/components/helper-components/TextAnimation.svelte generated by Svelte v3.9.1 */

const css$4 = {
	code: "span.hover-animation.svelte-1qap1g0{display:flex;align-items:center;overflow:hidden}span.hover-animation.svelte-1qap1g0::before{content:'';border-bottom:3px solid;width:0px;transform:translate(-100%);display:block;transition:all .45s cubic-bezier(0.85, 0.08, 0.08, 0.99)}a:hover>span.hover-animation.svelte-1qap1g0::before{content:'';transform:translate(0);width:20px;margin-right:5px}",
	map: "{\"version\":3,\"file\":\"TextAnimation.svelte\",\"sources\":[\"TextAnimation.svelte\"],\"sourcesContent\":[\"<script>\\nexport let text;\\n\\n</script>\\n\\n<style>\\n\\nspan.hover-animation {\\n    display: flex;\\n    align-items: center;\\n    overflow: hidden;\\n}\\n\\nspan.hover-animation::before {\\n    content: '';\\n    border-bottom: 3px solid;\\n    width: 0px;\\n    transform: translate(-100%);\\n    display: block;\\n    transition: all .45s cubic-bezier(0.85, 0.08, 0.08, 0.99);\\n}\\n\\na:hover > span.hover-animation::before {\\n    content: '';\\n    transform: translate(0);\\n    width: 20px;\\n    margin-right: 5px;\\n}\\n\\n</style>\\n\\n<span class=\\\"hover-animation\\\">{text}</span>\"],\"names\":[],\"mappings\":\"AAOA,IAAI,gBAAgB,eAAC,CAAC,AAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,QAAQ,CAAE,MAAM,AACpB,CAAC,AAED,IAAI,+BAAgB,QAAQ,AAAC,CAAC,AAC1B,OAAO,CAAE,EAAE,CACX,aAAa,CAAE,GAAG,CAAC,KAAK,CACxB,KAAK,CAAE,GAAG,CACV,SAAS,CAAE,UAAU,KAAK,CAAC,CAC3B,OAAO,CAAE,KAAK,CACd,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,aAAa,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,AAC7D,CAAC,AAED,CAAC,MAAM,CAAG,IAAI,+BAAgB,QAAQ,AAAC,CAAC,AACpC,OAAO,CAAE,EAAE,CACX,SAAS,CAAE,UAAU,CAAC,CAAC,CACvB,KAAK,CAAE,IAAI,CACX,YAAY,CAAE,GAAG,AACrB,CAAC\"}"
};

const TextAnimation = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { text } = $$props;

	if ($$props.text === void 0 && $$bindings.text && text !== void 0) $$bindings.text(text);

	$$result.css.add(css$4);

	return `<span class="hover-animation svelte-1qap1g0">${escape(text)}</span>`;
});

/* src/components/projects/Text.svelte generated by Svelte v3.9.1 */

const css$5 = {
	code: "a.svelte-t3xz29{display:flex;align-items:center;font-weight:300;text-transform:uppercase;font-size:12rem;width:fit-content;margin-top:10rem;color:#989898;font-weight:300;font-style:italic}h2.svelte-t3xz29{position:relative;display:flex;align-items:center;margin:15rem 0rem 5rem 0rem;font-size:13rem;font-weight:900;text-transform:capitalize;transition:all .2s ease-in-out;color:#3B3B3B;z-index:2}p.svelte-t3xz29{position:relative;line-height:16px;font-weight:300;font-size:13rem;z-index:1;color:#58595b;text-indent:10px}.year.svelte-t3xz29{content:'2019';position:absolute;font-weight:900;opacity:.5;z-index:-5;left:-60px;top:30px;transform:rotate(-90deg);color:#e6e7e8;font-size:45px}@media screen and (min-width: 40em){h2.svelte-t3xz29{margin-top:0rem}}@media screen and (min-width: 64em){h2.svelte-t3xz29{font-size:23rem}p.svelte-t3xz29{font-size:18rem;line-height:23px}a.svelte-t3xz29{font-size:14rem}}",
	map: "{\"version\":3,\"file\":\"Text.svelte\",\"sources\":[\"Text.svelte\"],\"sourcesContent\":[\"<script>\\nimport TextAnimation from '../helper-components/TextAnimation.svelte';\\n\\nexport let projectName, url, projectText, projectYear;\\n</script>\\n\\n<style>\\n\\n    a{\\n        display: flex;\\n        align-items: center;\\n        font-weight: 300;\\n        text-transform: uppercase;\\n        font-size: 12rem;\\n        width: fit-content;\\n        margin-top: 10rem;\\n        color: #989898;\\n        font-weight: 300;\\n        font-style: italic;\\n    }\\n    h2 {\\n        position: relative;\\n        display: flex;\\n        align-items: center;\\n        margin: 15rem 0rem 5rem 0rem;\\n        font-size: 13rem;\\n        font-weight: 900;\\n        text-transform: capitalize;\\n        transition: all .2s ease-in-out;\\n        color: #3B3B3B;\\n        z-index: 2;\\n    }\\n\\n    p{\\n        position: relative;\\n        line-height: 16px;\\n        font-weight: 300;\\n        font-size: 13rem;\\n        z-index: 1;\\n        color: #58595b;\\n        text-indent: 10px;\\n    }\\n\\n    .year{\\n        \\n        content: '2019';\\n        position: absolute;\\n        font-weight: 900;\\n        opacity: .5;\\n        z-index: -5;\\n        left: -60px;\\n        top: 30px;\\n        transform: rotate(-90deg);\\n        color: #e6e7e8;\\n        font-size: 45px;\\n    }\\n\\n    @media screen and (min-width: 40em) {\\n        h2 {\\n            margin-top: 0rem;\\n        }\\n    }\\n\\n@media screen and (min-width: 64em){\\n    h2 {\\n        font-size: 23rem;\\n    }\\n    p{\\n        font-size: 18rem;\\n        line-height: 23px;\\n    }\\n    a{\\n        font-size: 14rem;\\n    }\\n}\\n\\n</style>\\n<div>\\n    <h2>{projectName}</h2>\\n    <p>\\n        <span class='year'>{projectYear}</span>\\n        {@html projectText}\\n    </p>\\n    <a target=\\\"blank\\\" href=\\\"{url}\\\">\\n        <TextAnimation text={`View Website`} />\\n    </a>\\n</div>\"],\"names\":[],\"mappings\":\"AAQI,eAAC,CAAC,AACE,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,SAAS,CACzB,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,WAAW,CAClB,UAAU,CAAE,KAAK,CACjB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,MAAM,AACtB,CAAC,AACD,EAAE,cAAC,CAAC,AACA,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAC5B,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,UAAU,CAC1B,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,WAAW,CAC/B,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,CAAC,AACd,CAAC,AAED,eAAC,CAAC,AACE,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,IAAI,AACrB,CAAC,AAED,mBAAK,CAAC,AAEF,OAAO,CAAE,MAAM,CACf,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,EAAE,CACX,IAAI,CAAE,KAAK,CACX,GAAG,CAAE,IAAI,CACT,SAAS,CAAE,OAAO,MAAM,CAAC,CACzB,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,IAAI,AACnB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,EAAE,cAAC,CAAC,AACA,UAAU,CAAE,IAAI,AACpB,CAAC,AACL,CAAC,AAEL,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,cAAC,CAAC,AACA,SAAS,CAAE,KAAK,AACpB,CAAC,AACD,eAAC,CAAC,AACE,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,IAAI,AACrB,CAAC,AACD,eAAC,CAAC,AACE,SAAS,CAAE,KAAK,AACpB,CAAC,AACL,CAAC\"}"
};

const Text = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { projectName, url, projectText, projectYear } = $$props;

	if ($$props.projectName === void 0 && $$bindings.projectName && projectName !== void 0) $$bindings.projectName(projectName);
	if ($$props.url === void 0 && $$bindings.url && url !== void 0) $$bindings.url(url);
	if ($$props.projectText === void 0 && $$bindings.projectText && projectText !== void 0) $$bindings.projectText(projectText);
	if ($$props.projectYear === void 0 && $$bindings.projectYear && projectYear !== void 0) $$bindings.projectYear(projectYear);

	$$result.css.add(css$5);

	return `<div>
	    <h2 class="svelte-t3xz29">${escape(projectName)}</h2>
	    <p class="svelte-t3xz29">
	        <span class="year svelte-t3xz29">${escape(projectYear)}</span>
	        ${projectText}
	    </p>
	    <a target="blank"${add_attribute("href", url, 0)} class="svelte-t3xz29">
	        ${validate_component(TextAnimation, 'TextAnimation').$$render($$result, { text: `View Website` }, {}, {})}
	    </a>
	</div>`;
});

/* src/components/projects/Projects.svelte generated by Svelte v3.9.1 */

const css$6 = {
	code: "section.svelte-gcbgmn{display:flex;flex-direction:column;justify-content:center;padding:10% 0 10% 0;position:relative}@media screen and (min-width: 40em){section.svelte-gcbgmn{padding:10% 0 10% 0}}div.card-container.svelte-gcbgmn{display:flex;justify-content:flex-start;flex-direction:column;width:250px;margin-bottom:05%}div.image-container.svelte-gcbgmn{display:flex;justify-content:center}@media screen and (min-width: 40em){div.card-container.svelte-gcbgmn{flex-direction:row;justify-content:space-around;width:90%;margin-bottom:8%}div.card-container.svelte-gcbgmn:nth-of-type(2n){flex-direction:row-reverse}div.text-container.svelte-gcbgmn{width:35%}div.image-container.svelte-gcbgmn{width:50%;justify-content:flex-start}div.card-container.svelte-gcbgmn:nth-of-type(2n) div.image-container.svelte-gcbgmn{justify-content:flex-end}}@media screen and (min-width: 64em){div.card-container.svelte-gcbgmn{width:85%}}@media screen and (min-width: 1363px){div.card-container.svelte-gcbgmn{width:80%}}div.projects-container.svelte-gcbgmn{width:100%;display:flex;align-items:center;flex-direction:column}h2.svelte-gcbgmn{display:flex;align-items:center;text-transform:uppercase;width:fit-content;margin-bottom:10%;color:#3B3B3B;font-weight:800}h2.svelte-gcbgmn::after{content:'';display:block;margin-left:10px;width:30px;border-bottom:3px solid black}@media screen and (min-width: 64em){h2.svelte-gcbgmn{font-size:23rem}}",
	map: "{\"version\":3,\"file\":\"Projects.svelte\",\"sources\":[\"Projects.svelte\"],\"sourcesContent\":[\"<script>\\n    import { onMount } from 'svelte';  \\n\\n    import Image from './Image.svelte';\\n    import Text from './Text.svelte';  \\n\\n    let portfolioCards = [\\n        {\\n            url: 'https://www.visithalcyon.com',\\n            imgSrc: 'images/halcyon-5.jpg',\\n            alt: 'Thumbnail for the Halcyon mall website rebuild',\\n            projectName: 'Halcyon',\\n            projectYear: '2019',\\n            projectText: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`\\n        },\\n        {\\n            url: 'https://www.uptexas.org',\\n            imgSrc: 'images/uptexas-thumb.jpg',\\n            alt: 'Thumbnail for the City of University Park complete Front End website redesign',\\n            projectName: 'University Park',\\n            projectYear: '2019',\\n            projectText: `I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.`,\\n        },\\n        {\\n            url: 'projects/creative-revolt',\\n            imgSrc: 'images/Jorden-Background-Gray.jpg',\\n            alt: 'Thumbnail for the Creative Revolt redesigned website',\\n            projectName: 'Creative Revolt',\\n            projectYear: '2018',\\n            projectText: `This was a freelance project to <strong>rework the website layout</strong> and tailor the feel of the website to her personal writing style. I <strong>revamped the color palette</strong> to better match her personality, adjusted her website for <strong>SEO</strong>, and created the landing page as well as multiple pages across the platform.`,\\n        },\\n    ]\\n</script>\\n\\n<style>\\n    section {\\n        display: flex;\\n        flex-direction: column;\\n        justify-content: center;\\n        padding: 10% 0 10% 0;\\n        position: relative;\\n    }\\n\\n    @media screen and (min-width: 40em){ \\n        section {\\n            padding: 10% 0 10% 0;\\n        }\\n    }\\n\\n    div.card-container {\\n        display: flex;\\n        justify-content: flex-start;\\n        flex-direction: column;\\n        width: 250px;\\n        margin-bottom: 05%;\\n    }\\n\\n    div.image-container {\\n       display: flex;\\n       justify-content: center;\\n    }\\n    @media screen and (min-width: 40em){\\n        div.card-container {\\n            flex-direction: row;\\n            justify-content: space-around;\\n            width: 90%;\\n            margin-bottom: 8%;\\n        }\\n        div.card-container:nth-of-type(2n){\\n           flex-direction: row-reverse;\\n         }\\n        div.text-container {\\n            width: 35%;\\n        }\\n        div.image-container {\\n            width: 50%;\\n            justify-content: flex-start;\\n        }\\n        div.card-container:nth-of-type(2n) div.image-container{\\n            justify-content: flex-end;\\n        }\\n\\n        \\n    }\\n\\n    @media screen and (min-width: 64em){\\n        div.card-container{\\n            width: 85%;\\n        }\\n    }\\n\\n    @media screen and (min-width: 1363px){\\n        div.card-container{\\n            width: 80%;\\n        }\\n    }\\n    div.projects-container {\\n        width: 100%;\\n        display:flex;\\n        align-items: center;\\n        flex-direction: column;\\n    }\\n\\n    h2 {\\n        display: flex;\\n        align-items: center;\\n        text-transform: uppercase;\\n        width: fit-content;\\n        margin-bottom: 10%;\\n        color: #3B3B3B;\\n        font-weight: 800;\\n    }\\n\\n    h2::after {\\n        content: '';\\n        display: block;\\n        margin-left: 10px;\\n        width: 30px;\\n        border-bottom: 3px solid black;\\n    }\\n\\n\\n    @media screen and (min-width: 64em){\\n        h2 {\\n            font-size: 23rem;\\n        }\\n    }\\n</style>\\n\\n<section>\\n    <h2>Selected Works</h2>\\n    <div class=\\\"projects-container\\\">\\n        {#each portfolioCards as card, index}\\n            <div class=\\\"card-container\\\" {index}>\\n                <div class=\\\"image-container\\\">\\n                    <Image imgSrc={card.imgSrc} url={card.url} alt={card.alt} />\\n                </div>\\n                <div class=\\\"text-container\\\">\\n                    <Text projectName={card.projectName} url={card.url} projectText={card.projectText} projectYear={card.projectYear} />\\n                </div>\\n            </div>\\n        {/each}\\n    </div>\\n</section>\"],\"names\":[],\"mappings\":\"AAmCI,OAAO,cAAC,CAAC,AACL,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,OAAO,CAAE,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACpB,QAAQ,CAAE,QAAQ,AACtB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,OAAO,cAAC,CAAC,AACL,OAAO,CAAE,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,AACxB,CAAC,AACL,CAAC,AAED,GAAG,eAAe,cAAC,CAAC,AAChB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,UAAU,CAC3B,cAAc,CAAE,MAAM,CACtB,KAAK,CAAE,KAAK,CACZ,aAAa,CAAE,GAAG,AACtB,CAAC,AAED,GAAG,gBAAgB,cAAC,CAAC,AAClB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,AAC1B,CAAC,AACD,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,GAAG,eAAe,cAAC,CAAC,AAChB,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,YAAY,CAC7B,KAAK,CAAE,GAAG,CACV,aAAa,CAAE,EAAE,AACrB,CAAC,AACD,GAAG,6BAAe,aAAa,EAAE,CAAC,CAAC,AAChC,cAAc,CAAE,WAAW,AAC7B,CAAC,AACF,GAAG,eAAe,cAAC,CAAC,AAChB,KAAK,CAAE,GAAG,AACd,CAAC,AACD,GAAG,gBAAgB,cAAC,CAAC,AACjB,KAAK,CAAE,GAAG,CACV,eAAe,CAAE,UAAU,AAC/B,CAAC,AACD,GAAG,6BAAe,aAAa,EAAE,CAAC,CAAC,GAAG,8BAAgB,CAAC,AACnD,eAAe,CAAE,QAAQ,AAC7B,CAAC,AAGL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,GAAG,6BAAe,CAAC,AACf,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,CAAC,AAClC,GAAG,6BAAe,CAAC,AACf,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AACD,GAAG,mBAAmB,cAAC,CAAC,AACpB,KAAK,CAAE,IAAI,CACX,QAAQ,IAAI,CACZ,WAAW,CAAE,MAAM,CACnB,cAAc,CAAE,MAAM,AAC1B,CAAC,AAED,EAAE,cAAC,CAAC,AACA,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,cAAc,CAAE,SAAS,CACzB,KAAK,CAAE,WAAW,CAClB,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,AACpB,CAAC,AAED,gBAAE,OAAO,AAAC,CAAC,AACP,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,CACd,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,AAClC,CAAC,AAGD,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,cAAC,CAAC,AACA,SAAS,CAAE,KAAK,AACpB,CAAC,AACL,CAAC\"}"
};

const Projects = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	  

    let portfolioCards = [
        {
            url: 'https://www.visithalcyon.com',
            imgSrc: 'images/halcyon-5.jpg',
            alt: 'Thumbnail for the Halcyon mall website rebuild',
            projectName: 'Halcyon',
            projectYear: '2019',
            projectText: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`
        },
        {
            url: 'https://www.uptexas.org',
            imgSrc: 'images/uptexas-thumb.jpg',
            alt: 'Thumbnail for the City of University Park complete Front End website redesign',
            projectName: 'University Park',
            projectYear: '2019',
            projectText: `I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.`,
        },
        {
            url: 'projects/creative-revolt',
            imgSrc: 'images/Jorden-Background-Gray.jpg',
            alt: 'Thumbnail for the Creative Revolt redesigned website',
            projectName: 'Creative Revolt',
            projectYear: '2018',
            projectText: `This was a freelance project to <strong>rework the website layout</strong> and tailor the feel of the website to her personal writing style. I <strong>revamped the color palette</strong> to better match her personality, adjusted her website for <strong>SEO</strong>, and created the landing page as well as multiple pages across the platform.`,
        },
    ];

	$$result.css.add(css$6);

	return `<section class="svelte-gcbgmn">
	    <h2 class="svelte-gcbgmn">Selected Works</h2>
	    <div class="projects-container svelte-gcbgmn">
	        ${each(portfolioCards, (card, index) => `<div class="card-container svelte-gcbgmn"${add_attribute("index", index, 0)}>
	                <div class="image-container svelte-gcbgmn">
	                    ${validate_component(Image, 'Image').$$render($$result, {
		imgSrc: card.imgSrc,
		url: card.url,
		alt: card.alt
	}, {}, {})}
	                </div>
	                <div class="text-container svelte-gcbgmn">
	                    ${validate_component(Text, 'Text').$$render($$result, {
		projectName: card.projectName,
		url: card.url,
		projectText: card.projectText,
		projectYear: card.projectYear
	}, {}, {})}
	                </div>
	            </div>`)}
	    </div>
	</section>`;
});

/* src/routes/index.svelte generated by Svelte v3.9.1 */

const css$7 = {
	code: ".container.svelte-rig25y{position:relative;margin-top:90px}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script>\\nimport Hero from '../components/hero/Hero.svelte';\\nimport Projects from '../components/projects/Projects.svelte'\\n\\n</script>\\n\\n<style>\\n\\n    .container {\\n        position: relative;\\n        margin-top: 90px;\\n    }\\n\\n</style>\\n\\n<svelte:head>\\n\\t<title>Home | Front End Developer - Joshua Roper</title>\\n</svelte:head>\\n\\n<div class=\\\"container\\\">\\n    <Hero />\\n    <Projects />\\n</div>\"],\"names\":[],\"mappings\":\"AAQI,UAAU,cAAC,CAAC,AACR,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,IAAI,AACpB,CAAC\"}"
};

const Index = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$7);

	return `${($$result.head += `<title>Home | Front End Developer - Joshua Roper</title>`, "")}

	<div class="container svelte-rig25y">
	    ${validate_component(Hero, 'Hero').$$render($$result, {}, {}, {})}
	    ${validate_component(Projects, 'Projects').$$render($$result, {}, {}, {})}
	</div>`;
});

/* src/components/experience/LogoText.svelte generated by Svelte v3.9.1 */

const css$8 = {
	code: "section.titles.svelte-7s53gv{margin-bottom:40rem;top:180px}@media screen and (min-width: 40em){section.titles.svelte-7s53gv{margin-bottom:60rem;position:-webkit-sticky;position:sticky}}@media(min-width: 64em){section.titles.svelte-7s53gv{top:250px}}h1.svelte-7s53gv{color:#3B3B3B;font-weight:800;font-size:23px}h2.svelte-7s53gv{color:#3B3B3B;font-weight:800;font-size:18px;margin-bottom:5px;margin-top:-3px;opacity:.85}h3.svelte-7s53gv{display:flex;align-items:center;font-size:14px;font-weight:400;opacity:.8;margin-bottom:15px}h3.svelte-7s53gv::before{content:'';display:block;width:30px;border-bottom:3px solid black;margin-right:10px;opacity:.8}@media screen and (min-width: 40em) and (max-width: 64em){h1.svelte-7s53gv{font-size:21px}h2.svelte-7s53gv{font-size:16px;margin-bottom:7px}h3.svelte-7s53gv{font-size:12px}}@media screen and (min-width: 64em){h1.svelte-7s53gv{font-size:28px}h2.svelte-7s53gv{font-size:22px;margin-bottom:7px}h3.svelte-7s53gv{margin-bottom:0}}",
	map: "{\"version\":3,\"file\":\"LogoText.svelte\",\"sources\":[\"LogoText.svelte\"],\"sourcesContent\":[\"<script>\\nexport let addClass;\\n</script>\\n\\n<style>\\nsection.titles {\\n    margin-bottom: 40rem;\\n    top: 180px;\\n}\\n\\n@media screen and (min-width: 40em) {\\n    section.titles {\\n        margin-bottom: 60rem;\\n        position: -webkit-sticky;\\n        position: sticky;\\n    }\\n}\\n\\n@media (min-width: 64em) {\\n    section.titles {\\n        top: 250px;\\n    }\\n}\\n\\nh1 {\\n    color:#3B3B3B;\\n    font-weight: 800;\\n    font-size: 23px;\\n}\\nh2 {\\n    color:#3B3B3B;\\n    font-weight: 800;\\n    font-size: 18px;\\n    margin-bottom: 5px;\\n    margin-top: -3px;\\n    opacity: .85;\\n}\\n\\nh3 {\\n    display: flex;\\n    align-items: center;\\n    font-size: 14px;\\n    font-weight: 400;\\n    opacity: .8;\\n    margin-bottom: 15px;\\n}\\n\\nh3::before {\\n    content: '';\\n    display: block;\\n    width: 30px;\\n    border-bottom: 3px solid black;\\n    margin-right: 10px;\\n    opacity: .8;\\n}\\n\\n @media screen and (min-width: 40em) and (max-width: 64em){\\n    h1 {\\n        font-size: 21px;\\n        \\n    }\\n    h2 {\\n        font-size: 16px;\\n        margin-bottom: 7px;\\n    }\\n    h3 {\\n        font-size: 12px;\\n    }\\n}\\n\\n@media screen and (min-width: 64em) {\\n    h1 {\\n        font-size: 28px;\\n    }\\n    h2 {\\n        font-size: 22px;\\n        margin-bottom: 7px;\\n    }\\n    h3 {\\n        margin-bottom: 0;\\n    }\\n}\\n\\n</style>\\n\\n<section class=\\\"titles {addClass}\\\">\\n    <h1>Front End Developer</h1>\\n    <h2>React, Svelte, ES6</h2>\\n    <h3>Joshua Roper</h3>\\n</section>\"],\"names\":[],\"mappings\":\"AAKA,OAAO,OAAO,cAAC,CAAC,AACZ,aAAa,CAAE,KAAK,CACpB,GAAG,CAAE,KAAK,AACd,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,OAAO,OAAO,cAAC,CAAC,AACZ,aAAa,CAAE,KAAK,CACpB,QAAQ,CAAE,cAAc,CACxB,QAAQ,CAAE,MAAM,AACpB,CAAC,AACL,CAAC,AAED,MAAM,AAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACtB,OAAO,OAAO,cAAC,CAAC,AACZ,GAAG,CAAE,KAAK,AACd,CAAC,AACL,CAAC,AAED,EAAE,cAAC,CAAC,AACA,MAAM,OAAO,CACb,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,AACnB,CAAC,AACD,EAAE,cAAC,CAAC,AACA,MAAM,OAAO,CACb,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,GAAG,AAChB,CAAC,AAED,EAAE,cAAC,CAAC,AACA,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,EAAE,CACX,aAAa,CAAE,IAAI,AACvB,CAAC,AAED,gBAAE,QAAQ,AAAC,CAAC,AACR,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAC9B,YAAY,CAAE,IAAI,CAClB,OAAO,CAAE,EAAE,AACf,CAAC,AAEA,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AACvD,EAAE,cAAC,CAAC,AACA,SAAS,CAAE,IAAI,AAEnB,CAAC,AACD,EAAE,cAAC,CAAC,AACA,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,GAAG,AACtB,CAAC,AACD,EAAE,cAAC,CAAC,AACA,SAAS,CAAE,IAAI,AACnB,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,EAAE,cAAC,CAAC,AACA,SAAS,CAAE,IAAI,AACnB,CAAC,AACD,EAAE,cAAC,CAAC,AACA,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,GAAG,AACtB,CAAC,AACD,EAAE,cAAC,CAAC,AACA,aAAa,CAAE,CAAC,AACpB,CAAC,AACL,CAAC\"}"
};

const LogoText = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { addClass } = $$props;

	if ($$props.addClass === void 0 && $$bindings.addClass && addClass !== void 0) $$bindings.addClass(addClass);

	$$result.css.add(css$8);

	return `<section class="titles ${escape(addClass)} svelte-7s53gv">
	    <h1 class="svelte-7s53gv">Front End Developer</h1>
	    <h2 class="svelte-7s53gv">React, Svelte, ES6</h2>
	    <h3 class="svelte-7s53gv">Joshua Roper</h3>
	</section>`;
});

/* src/components/experience/SideBar.svelte generated by Svelte v3.9.1 */

const css$9 = {
	code: "aside.svelte-8tgsu0{height:78%}@media screen and (min-width: 40em){aside.svelte-8tgsu0{padding-top:165px}}@media(min-width: 64em){aside.svelte-8tgsu0{padding-top:165px;height:80%}}@media(min-width: 1366px){aside.svelte-8tgsu0{padding-top:140px}}",
	map: "{\"version\":3,\"file\":\"SideBar.svelte\",\"sources\":[\"SideBar.svelte\"],\"sourcesContent\":[\"<script>\\nimport LogoText from './LogoText.svelte';\\nimport Skills from './Skills.svelte';\\nimport Contact from './Contact.svelte';\\n</script>\\n\\n<style>\\naside {\\n    height: 78%;\\n}\\n\\n@media screen and (min-width: 40em) {\\n    aside {\\n        padding-top: 165px;\\n    }\\n}\\n\\n@media (min-width: 64em) {\\n    aside {\\n        padding-top: 165px;\\n        height: 80%;\\n    }\\n}\\n\\n@media (min-width: 1366px) {\\n    aside {\\n        padding-top: 140px;\\n    }\\n}\\n</style>\\n\\n<aside>\\n    <LogoText addClass=\\\"show-for-small\\\" />\\n    <!-- <Skills />\\n    <Contact /> -->\\n</aside>\"],\"names\":[],\"mappings\":\"AAOA,KAAK,cAAC,CAAC,AACH,MAAM,CAAE,GAAG,AACf,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,KAAK,cAAC,CAAC,AACH,WAAW,CAAE,KAAK,AACtB,CAAC,AACL,CAAC,AAED,MAAM,AAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACtB,KAAK,cAAC,CAAC,AACH,WAAW,CAAE,KAAK,CAClB,MAAM,CAAE,GAAG,AACf,CAAC,AACL,CAAC,AAED,MAAM,AAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AACxB,KAAK,cAAC,CAAC,AACH,WAAW,CAAE,KAAK,AACtB,CAAC,AACL,CAAC\"}"
};

const SideBar = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$9);

	return `<aside class="svelte-8tgsu0">
	    ${validate_component(LogoText, 'LogoText').$$render($$result, { addClass: "show-for-small" }, {}, {})}
	    
	</aside>`;
});

/* src/components/experience/Summary.svelte generated by Svelte v3.9.1 */

const Summary = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<section>
	    <h2 class="headline">Summary</h2>
	    <p>Hi There! I’m Josh, a Dallas-based Front End Developer with a knack for programing and design. My passion comes from bringing together each aspect of the customer journey across both development and design processes. I focus on creating production ready applications utilizing UX principals with scalable clean code.</p>
	</section>`;
});

/* src/components/experience/JobExperience.svelte generated by Svelte v3.9.1 */

const css$a = {
	code: "div.job-listing.svelte-hdrflg{margin-bottom:20rem}li.svelte-hdrflg{margin:5rem 0}@media(min-width: 64em){li.svelte-hdrflg{margin:8rem 0}}li.svelte-hdrflg::before{content:'';position:absolute;display:inline-block;width:3px;height:3px;border-radius:100%;background:gray;top:7px;left:-10px}@media(min-width: 64em){li.svelte-hdrflg::before{top:10px}}li.detail.svelte-hdrflg{position:relative;margin-left:15rem}.detail-title.svelte-hdrflg{margin-bottom:0px}",
	map: "{\"version\":3,\"file\":\"JobExperience.svelte\",\"sources\":[\"JobExperience.svelte\"],\"sourcesContent\":[\"<script>\\n\\n</script>\\n\\n<style>\\n\\ndiv.job-listing {\\n    margin-bottom: 20rem;\\n}\\nli {\\n    margin: 5rem 0;\\n}\\n\\n@media (min-width: 64em) {\\n    li {\\n        margin: 8rem 0;\\n    }\\n}\\nli::before {\\n    content: '';\\n    position: absolute;\\n    display: inline-block;\\n    width: 3px;\\n    height: 3px;\\n    border-radius: 100%;\\n    background: gray;\\n    top: 7px;\\n    left: -10px;\\n}\\n\\n@media (min-width: 64em) {\\n    li::before {\\n        top: 10px;\\n    }\\n}\\n\\nli.detail {\\n    position: relative;\\n    margin-left: 15rem;\\n}\\n\\n.detail-title {\\n    margin-bottom: 0px;\\n}\\n</style>\\n\\n<section>\\n    <h2 class=\\\"headline\\\">Experience</h2>\\n    <div class=\\\"job-listing\\\">\\n        <p class=\\\"date-location detail-preface\\\">Dallas, Texas (2019 - current)</p>\\n        <h3 class=\\\"job-title detail-title\\\">Front End Developer at Imaginuity</h3>\\n        <ul class=\\\"job-details\\\">\\n            <li class=\\\"detail\\\">\\n                Developed the entire Front End for a high traffic, 99% up time website\\n                <div class=\\\"detail-web-links\\\">\\n                    <a href=\\\"https://www.uptexas.org\\\" target=\\\"blank\\\">uptexas.org</a> \\n                </div>\\n            </li>\\n            <li class=\\\"detail\\\">\\n                Made web enhancements and landing page’s for multiple businesses\\n                <div class=\\\"detail-web-links\\\">\\n                    <a href=\\\"https://www.webuyuglyhouses.com\\\" target=\\\"blank\\\">webuyuglyhouses.com</a>, \\n                    <a href=\\\"https://www.homevestors.com\\\" target=\\\"blank\\\">homevestors.com</a>, \\n                    <a href=\\\"https://www.advancial.org\\\" target=\\\"blank\\\">advancial.org</a>, etc....\\n                </div>\\n            </li>\\n            <li class=\\\"detail\\\">\\n                Maintained 10 React based themes responsible for over 50 established malls\\n                <div class=\\\"detail-web-links\\\">\\n                    <a href=\\\"https://www.visithalcyon.com\\\" target=\\\"blank\\\">visithalcyon.com</a>\\n                </div>\\n            </li>\\n            <li class=\\\"detail\\\">\\n                Designed and integrated page templates utilizing a CMS (WordPress / Kentico)\\n            </li>\\n        </ul>\\n    </div>\\n    <div class=\\\"job-listing\\\">\\n        <p class=\\\"date-location detail-preface\\\">Carrollton, Texas (2017 - 2018)</p>\\n        <h3 class=\\\"job-title detail-title\\\">Freelance Web Development and Marketing at Creative Revolt</h3>\\n        <div class=\\\"detail-web-links\\\">\\n            <a href=\\\"https://www.creativerevolt.com\\\" target=\\\"blank\\\">creativerevolt.com</a>\\n        </div>\\n        <ul class=\\\"job-details\\\">\\n            <li class=\\\"detail\\\">\\n                Revamped the design with a bolder color palette / layout\\n            </li>\\n            <li class=\\\"detail\\\">\\n                Created the landing page and multiple sections utilizing WordPress (DiviBuilder)\\n            </li>\\n            <li class=\\\"detail\\\">\\n                Performed website updates and executed content audits\\n            </li>\\n            <li class=\\\"detail\\\">\\n                Adjusted the website for SEO and created marketable advertisements (Canva / Google Analytics)\\n            </li>\\n        </ul>\\n    </div>\\n</section>\"],\"names\":[],\"mappings\":\"AAMA,GAAG,YAAY,cAAC,CAAC,AACb,aAAa,CAAE,KAAK,AACxB,CAAC,AACD,EAAE,cAAC,CAAC,AACA,MAAM,CAAE,IAAI,CAAC,CAAC,AAClB,CAAC,AAED,MAAM,AAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACtB,EAAE,cAAC,CAAC,AACA,MAAM,CAAE,IAAI,CAAC,CAAC,AAClB,CAAC,AACL,CAAC,AACD,gBAAE,QAAQ,AAAC,CAAC,AACR,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,YAAY,CACrB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IAAI,CAChB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,KAAK,AACf,CAAC,AAED,MAAM,AAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACtB,gBAAE,QAAQ,AAAC,CAAC,AACR,GAAG,CAAE,IAAI,AACb,CAAC,AACL,CAAC,AAED,EAAE,OAAO,cAAC,CAAC,AACP,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,KAAK,AACtB,CAAC,AAED,aAAa,cAAC,CAAC,AACX,aAAa,CAAE,GAAG,AACtB,CAAC\"}"
};

const JobExperience = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$a);

	return `<section>
	    <h2 class="headline">Experience</h2>
	    <div class="job-listing svelte-hdrflg">
	        <p class="date-location detail-preface">Dallas, Texas (2019 - current)</p>
	        <h3 class="job-title detail-title svelte-hdrflg">Front End Developer at Imaginuity</h3>
	        <ul class="job-details">
	            <li class="detail svelte-hdrflg">
	                Developed the entire Front End for a high traffic, 99% up time website
	                <div class="detail-web-links">
	                    <a href="https://www.uptexas.org" target="blank">uptexas.org</a> 
	                </div>
	            </li>
	            <li class="detail svelte-hdrflg">
	                Made web enhancements and landing page’s for multiple businesses
	                <div class="detail-web-links">
	                    <a href="https://www.webuyuglyhouses.com" target="blank">webuyuglyhouses.com</a>, 
	                    <a href="https://www.homevestors.com" target="blank">homevestors.com</a>, 
	                    <a href="https://www.advancial.org" target="blank">advancial.org</a>, etc....
	                </div>
	            </li>
	            <li class="detail svelte-hdrflg">
	                Maintained 10 React based themes responsible for over 50 established malls
	                <div class="detail-web-links">
	                    <a href="https://www.visithalcyon.com" target="blank">visithalcyon.com</a>
	                </div>
	            </li>
	            <li class="detail svelte-hdrflg">
	                Designed and integrated page templates utilizing a CMS (WordPress / Kentico)
	            </li>
	        </ul>
	    </div>
	    <div class="job-listing svelte-hdrflg">
	        <p class="date-location detail-preface">Carrollton, Texas (2017 - 2018)</p>
	        <h3 class="job-title detail-title svelte-hdrflg">Freelance Web Development and Marketing at Creative Revolt</h3>
	        <div class="detail-web-links">
	            <a href="https://www.creativerevolt.com" target="blank">creativerevolt.com</a>
	        </div>
	        <ul class="job-details">
	            <li class="detail svelte-hdrflg">
	                Revamped the design with a bolder color palette / layout
	            </li>
	            <li class="detail svelte-hdrflg">
	                Created the landing page and multiple sections utilizing WordPress (DiviBuilder)
	            </li>
	            <li class="detail svelte-hdrflg">
	                Performed website updates and executed content audits
	            </li>
	            <li class="detail svelte-hdrflg">
	                Adjusted the website for SEO and created marketable advertisements (Canva / Google Analytics)
	            </li>
	        </ul>
	    </div>
	</section>`;
});

/* src/components/experience/Projects.svelte generated by Svelte v3.9.1 */

const css$b = {
	code: ".project-listing.svelte-1vtmb{margin-bottom:20rem}.detail-title.svelte-1vtmb{margin:0}.detail-web-links.svelte-1vtmb{margin:3rem 0}@media screen and (min-width: 40em){.projects-container.svelte-1vtmb{display:flex;flex-wrap:wrap}.project-listing.svelte-1vtmb{box-sizing:border-box;width:50%;padding-right:30rem}}",
	map: "{\"version\":3,\"file\":\"Projects.svelte\",\"sources\":[\"Projects.svelte\"],\"sourcesContent\":[\"<script>\\n\\n</script>\\n\\n<style>\\n\\n.project-listing {\\n    margin-bottom: 20rem;\\n}\\n.detail-title {\\n    margin: 0;\\n}\\n\\n.detail-web-links {\\n    margin: 3rem 0;\\n}\\n\\n\\n@media screen and (min-width: 40em){\\n    .projects-container {\\n        display: flex;\\n        flex-wrap: wrap;\\n    }\\n    .project-listing {\\n        box-sizing: border-box;\\n        width: 50%;\\n        padding-right: 30rem;\\n    }\\n}\\n\\n</style>\\n\\n<section>\\n    <h2 class=\\\"headline\\\">Projects</h2>\\n    <div class=\\\"projects-container\\\">\\n        <div class=\\\"project-listing\\\">\\n            <p class=\\\"detail-preface skills-listing\\\">Svelte, Sapper, JavaScript, Rollup, SASS, HTML</p>\\n            <h3 class=\\\"detail-title\\\">Personal Portfolio</h3>\\n            <div class=\\\"detail-web-links\\\">\\n                <a href=\\\"https://www.joshuaroper.com/\\\" target=\\\"blank\\\">joshuaroper.com</a>\\n            </div>\\n            <p>\\n                I created a personal portfolio website to showcase all of my recent works. I utilized advanced CSS animations, Svelte, and a static Sapper build.\\n            </p>\\n        </div>\\n        <div class=\\\"project-listing\\\">\\n            <p class=\\\"detail-preface skills-listing\\\">React, React Static, JavaScript, WebPack, SASS, JSX, WordPress</p>\\n            <h3 class=\\\"detail-title\\\">Halcyon</h3>\\n            <div class=\\\"detail-web-links\\\">\\n                <a href=\\\"https://www.visithalcyon.com/\\\" target=\\\"blank\\\">visithalcyon.com</a>\\n            </div>\\n            <p>\\n                As one of the Front End Developers on the project I was tasked with creating the movies, and events directory. I worked with multiple API’s, React Static, and developed clean code.\\n            </p>\\n        </div> \\n        <div class=\\\"project-listing\\\">\\n            <p class=\\\"detail-preface skills-listing\\\">JavaScript, jQuery, SASS, Foundation, HTML, Kentico (CMS)</p>\\n            <h3 class=\\\"detail-title\\\">University Park</h3>\\n            <div class=\\\"detail-web-links\\\">\\n                <a href=\\\"https://www.uptexas.org/\\\" target=\\\"blank\\\">uptexas.org</a>\\n            </div>\\n            <p>\\n                I was the sole Front End Developer on the project, I implemented a dynamically generated content slider, filtered search, form verification, and multiple third party integrations.\\n            </p>\\n        </div>\\n        <div class=\\\"project-listing\\\">\\n            <p class=\\\"detail-preface skills-listing\\\">HTML, CSS, JavaScript, Jquery, WordPress, DiviBuilder</p>\\n            <h3 class=\\\"detail-title\\\">Creative Revolt</h3>\\n            <div class=\\\"detail-web-links\\\">\\n                <a href=\\\"https://www.creativerevolt.com/\\\" target=\\\"blank\\\">creativerevolt.com</a>\\n            </div>\\n            <p>\\n                This was a freelance project to completely rework the website layout and tailor the feel of the website to her personal writing style.\\n            </p>\\n        </div>\\n    </div>\\n</section>\"],\"names\":[],\"mappings\":\"AAMA,gBAAgB,aAAC,CAAC,AACd,aAAa,CAAE,KAAK,AACxB,CAAC,AACD,aAAa,aAAC,CAAC,AACX,MAAM,CAAE,CAAC,AACb,CAAC,AAED,iBAAiB,aAAC,CAAC,AACf,MAAM,CAAE,IAAI,CAAC,CAAC,AAClB,CAAC,AAGD,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,mBAAmB,aAAC,CAAC,AACjB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,AACnB,CAAC,AACD,gBAAgB,aAAC,CAAC,AACd,UAAU,CAAE,UAAU,CACtB,KAAK,CAAE,GAAG,CACV,aAAa,CAAE,KAAK,AACxB,CAAC,AACL,CAAC\"}"
};

const Projects$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$b);

	return `<section>
	    <h2 class="headline">Projects</h2>
	    <div class="projects-container svelte-1vtmb">
	        <div class="project-listing svelte-1vtmb">
	            <p class="detail-preface skills-listing">Svelte, Sapper, JavaScript, Rollup, SASS, HTML</p>
	            <h3 class="detail-title svelte-1vtmb">Personal Portfolio</h3>
	            <div class="detail-web-links svelte-1vtmb">
	                <a href="https://www.joshuaroper.com/" target="blank">joshuaroper.com</a>
	            </div>
	            <p>
	                I created a personal portfolio website to showcase all of my recent works. I utilized advanced CSS animations, Svelte, and a static Sapper build.
	            </p>
	        </div>
	        <div class="project-listing svelte-1vtmb">
	            <p class="detail-preface skills-listing">React, React Static, JavaScript, WebPack, SASS, JSX, WordPress</p>
	            <h3 class="detail-title svelte-1vtmb">Halcyon</h3>
	            <div class="detail-web-links svelte-1vtmb">
	                <a href="https://www.visithalcyon.com/" target="blank">visithalcyon.com</a>
	            </div>
	            <p>
	                As one of the Front End Developers on the project I was tasked with creating the movies, and events directory. I worked with multiple API’s, React Static, and developed clean code.
	            </p>
	        </div> 
	        <div class="project-listing svelte-1vtmb">
	            <p class="detail-preface skills-listing">JavaScript, jQuery, SASS, Foundation, HTML, Kentico (CMS)</p>
	            <h3 class="detail-title svelte-1vtmb">University Park</h3>
	            <div class="detail-web-links svelte-1vtmb">
	                <a href="https://www.uptexas.org/" target="blank">uptexas.org</a>
	            </div>
	            <p>
	                I was the sole Front End Developer on the project, I implemented a dynamically generated content slider, filtered search, form verification, and multiple third party integrations.
	            </p>
	        </div>
	        <div class="project-listing svelte-1vtmb">
	            <p class="detail-preface skills-listing">HTML, CSS, JavaScript, Jquery, WordPress, DiviBuilder</p>
	            <h3 class="detail-title svelte-1vtmb">Creative Revolt</h3>
	            <div class="detail-web-links svelte-1vtmb">
	                <a href="https://www.creativerevolt.com/" target="blank">creativerevolt.com</a>
	            </div>
	            <p>
	                This was a freelance project to completely rework the website layout and tailor the feel of the website to her personal writing style.
	            </p>
	        </div>
	    </div>
	</section>`;
});

/* src/components/experience/Education.svelte generated by Svelte v3.9.1 */

const css$c = {
	code: ".detail-title.svelte-i9dlu3{margin-bottom:3px}",
	map: "{\"version\":3,\"file\":\"Education.svelte\",\"sources\":[\"Education.svelte\"],\"sourcesContent\":[\"<script>\\n\\n</script>\\n\\n<style>\\n.detail-title {\\n    margin-bottom: 3px;\\n}\\n</style>\\n\\n<section>\\n    <h2 class=\\\"headline\\\">Education</h2>\\n    <div class=\\\"education-listing\\\">\\n        <p class=\\\"detail-preface\\\">Arlington, Texas (2015 - 2018)</p>\\n        <h3 class=\\\"detail-title\\\">University of Texas at Arlington</h3>\\n        <p>Bachelor of Communication Technology</p>\\n    </div>\\n</section>\"],\"names\":[],\"mappings\":\"AAKA,aAAa,cAAC,CAAC,AACX,aAAa,CAAE,GAAG,AACtB,CAAC\"}"
};

const Education = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$c);

	return `<section>
	    <h2 class="headline">Education</h2>
	    <div class="education-listing">
	        <p class="detail-preface">Arlington, Texas (2015 - 2018)</p>
	        <h3 class="detail-title svelte-i9dlu3">University of Texas at Arlington</h3>
	        <p>Bachelor of Communication Technology</p>
	    </div>
	</section>`;
});

/* src/components/experience/ResumeContent.svelte generated by Svelte v3.9.1 */

const css$d = {
	code: "@media(min-width: 1366px){.resume-content.svelte-1l9xuqs{padding-right:200px;margin-left:-100px}}",
	map: "{\"version\":3,\"file\":\"ResumeContent.svelte\",\"sources\":[\"ResumeContent.svelte\"],\"sourcesContent\":[\"<script>\\nimport LogoText from './LogoText.svelte';\\nimport Summary from './Summary.svelte';\\nimport JobExperience from './JobExperience.svelte';\\nimport Projects from './Projects.svelte';\\nimport Education from './Education.svelte';\\n</script>\\n\\n<style>\\n@media (min-width: 1366px) {\\n    .resume-content {\\n        padding-right: 200px;\\n        margin-left: -100px;\\n    }\\n}\\n</style>\\n\\n<div class=\\\"resume-content\\\">\\n    <LogoText addClass=\\\"hide-for-small\\\" />\\n    <Summary />\\n    <JobExperience />\\n    <Projects />\\n    <Education />\\n</div>\"],\"names\":[],\"mappings\":\"AASA,MAAM,AAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AACxB,eAAe,eAAC,CAAC,AACb,aAAa,CAAE,KAAK,CACpB,WAAW,CAAE,MAAM,AACvB,CAAC,AACL,CAAC\"}"
};

const ResumeContent = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$d);

	return `<div class="resume-content svelte-1l9xuqs">
	    ${validate_component(LogoText, 'LogoText').$$render($$result, { addClass: "hide-for-small" }, {}, {})}
	    ${validate_component(Summary, 'Summary').$$render($$result, {}, {}, {})}
	    ${validate_component(JobExperience, 'JobExperience').$$render($$result, {}, {}, {})}
	    ${validate_component(Projects$1, 'Projects').$$render($$result, {}, {}, {})}
	    ${validate_component(Education, 'Education').$$render($$result, {}, {}, {})}
	</div>`;
});

/* src/routes/experience.svelte generated by Svelte v3.9.1 */

const css$e = {
	code: "@import '../components/experience/experience-fonts.styles.scss';.container.svelte-1eeuh14{position:relative;margin-top:90px}.experience.svelte-1eeuh14{display:flex;flex-direction:column-reverse}@media screen and (min-width: 40em){.experience.svelte-1eeuh14{padding-top:50px;flex-direction:row}}@media(min-width: 64em){.experience.svelte-1eeuh14{padding-top:80px}}.left.svelte-1eeuh14{width:100%}@media screen and (min-width: 40em){.left.svelte-1eeuh14{width:60%}}.right.svelte-1eeuh14{width:100%;background:white}",
	map: "{\"version\":3,\"file\":\"experience.svelte\",\"sources\":[\"experience.svelte\"],\"sourcesContent\":[\"<script>\\nimport SideBar from '../components/experience/SideBar.svelte';\\nimport ResumeContent from '../components/experience/ResumeContent.svelte';\\n</script>\\n\\n<style type=\\\"text/scss\\\">\\n    @import '../components/experience/experience-fonts.styles.scss';\\n\\n    .container {\\n        position: relative;\\n        margin-top: 90px;\\n    }\\n\\n    .experience {\\n        display: flex;\\n        flex-direction: column-reverse;\\n    }\\n\\n    @media screen and (min-width: 40em) {\\n        .experience {\\n            padding-top: 50px;\\n            flex-direction: row;\\n        }\\n    }\\n\\n    @media (min-width: 64em) {\\n        .experience {\\n            padding-top: 80px;\\n        }\\n    }\\n\\n    .left {\\n        width: 100%;\\n    }\\n\\n    @media screen and (min-width: 40em) {\\n        .left {\\n            width: 60%;\\n        }\\n    }\\n\\n    .right {\\n        width: 100%;\\n        background: white;\\n    }\\n\\n</style>\\n\\n<svelte:head>\\n\\t<title>Experience | Front End Developer - Joshua Roper</title>\\n</svelte:head>\\n\\n<div class=\\\"experience container\\\">\\n    <div class=\\\"left\\\">\\n        <SideBar />\\n    </div>\\n    <div class=\\\"right\\\">\\n        <ResumeContent />\\n    </div>\\n</div>\"],\"names\":[],\"mappings\":\"AAMI,QAAQ,uDAAuD,CAAC,AAEhE,UAAU,eAAC,CAAC,AACR,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,IAAI,AACpB,CAAC,AAED,WAAW,eAAC,CAAC,AACT,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,cAAc,AAClC,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,WAAW,eAAC,CAAC,AACT,WAAW,CAAE,IAAI,CACjB,cAAc,CAAE,GAAG,AACvB,CAAC,AACL,CAAC,AAED,MAAM,AAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACtB,WAAW,eAAC,CAAC,AACT,WAAW,CAAE,IAAI,AACrB,CAAC,AACL,CAAC,AAED,KAAK,eAAC,CAAC,AACH,KAAK,CAAE,IAAI,AACf,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,KAAK,eAAC,CAAC,AACH,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,MAAM,eAAC,CAAC,AACJ,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,KAAK,AACrB,CAAC\"}"
};

const Experience = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$e);

	return `${($$result.head += `<title>Experience | Front End Developer - Joshua Roper</title>`, "")}

	<div class="experience container svelte-1eeuh14">
	    <div class="left svelte-1eeuh14">
	        ${validate_component(SideBar, 'SideBar').$$render($$result, {}, {}, {})}
	    </div>
	    <div class="right svelte-1eeuh14">
	        ${validate_component(ResumeContent, 'ResumeContent').$$render($$result, {}, {}, {})}
	    </div>
	</div>`;
});

/* src/components/project-detail/PageTitle.svelte generated by Svelte v3.9.1 */

const css$f = {
	code: "@keyframes svelte-a5em78-slideInRight{100%{transform:translateX(100%)}}@keyframes svelte-a5em78-badSlideInRight{0%{left:-100%}100%{left:5px}}div.svelte-a5em78:not(.page-header){display:flex;justify-content:flex-end;width:65%;margin:-05px 0px 20px 0;font-size:16rem;text-transform:uppercase;color:#58595b;max-width:1320px}div.side-page.svelte-a5em78{font-size:12rem;max-width:1705px}div.title-container.svelte-a5em78:not(.side-page){position:relative;width:100%}@media screen and (min-width: 40em){div.title-container.svelte-a5em78:not(.side-page){margin-bottom:20px;width:100%}div.svelte-a5em78:not(.page-header){font-size:28rem;width:75%}div.side-page.svelte-a5em78{font-size:24rem;width:85%\n        }}h1.svelte-a5em78{color:#3B3B3B;position:relative;width:100%;top:0;right:0px;display:flex;font-size:32px;align-items:center;margin:0px}@media screen and (min-width: 40em){h1.svelte-a5em78{font-size:55px}}@media screen and (min-width: 64em){h1.svelte-a5em78{font-size:64px}}div.page-header.svelte-a5em78{margin-top:90px;position:relative;width:100vw;height:125px;display:flex;justify-content:center;align-items:flex-end;box-sizing:border-box;padding-left:20rem}@media screen and (min-width: 40em){div.page-header.svelte-a5em78{padding:0;box-sizing:content-box;height:220px}}@media screen and (min-width: 64em){div.page-header.svelte-a5em78{height:250px}}span.svelte-a5em78{position:absolute;transform:scaleX(-1);transform:scaleX(-1) rotate(180deg) skew(-10deg, 0deg);opacity:.03;left:3px;bottom:-25px;font-size:32px}@media screen and (min-width: 40em){span.svelte-a5em78{left:5px;bottom:-55px;font-size:55px}}@media screen and (min-width: 64em){span.svelte-a5em78{font-size:64px}}",
	map: "{\"version\":3,\"file\":\"PageTitle.svelte\",\"sources\":[\"PageTitle.svelte\"],\"sourcesContent\":[\"<script>\\nexport let title, sidePage;\\n// sidePage should be set to 'side-page' to toggle class\\n</script>\\n\\n<style>\\n\\n    @keyframes slideInRight {\\n        100% {\\n            transform: translateX(100%);\\n        }\\n    }\\n\\n    @keyframes badSlideInRight {\\n        0% {\\n            left: -100%;\\n        }\\n        100% {\\n            left: 5px;\\n        }\\n    }\\n\\n    div:not(.page-header) {\\n        display: flex;\\n        justify-content: flex-end;\\n        width: 65%;\\n        margin: -05px 0px 20px 0;\\n        font-size: 16rem;\\n        text-transform: uppercase;\\n        color: #58595b;\\n        max-width: 1320px;\\n    }\\n\\n    div.side-page {\\n        font-size: 12rem;\\n        max-width: 1705px;\\n    }\\n\\n    div.title-container:not(.side-page){\\n        position: relative;\\n        /* animation: .9s ease-out 0s 1 fadeIn forwards; */\\n        width: 100%;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        div.title-container:not(.side-page){\\n            margin-bottom: 20px;\\n            width: 100%;\\n        }\\n\\n        div:not(.page-header) {\\n            font-size: 28rem;\\n            width: 75%;\\n        }\\n\\n        div.side-page {\\n            font-size: 24rem;\\n            width: 85%\\n        }\\n    }\\n\\n    h1 {\\n        color: #3B3B3B;\\n        position: relative;\\n        width: 100%;\\n        top: 0;\\n        /* left: -100%; */\\n        right: 0px;\\n        display: flex;\\n        font-size: 32px;\\n        align-items: center;\\n        margin: 0px;\\n        /* animation: 1s ease-out 0s 1 slideInRight forwards; */\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        h1 {\\n            font-size: 55px;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        h1 {\\n            font-size: 64px;\\n        }\\n    }\\n\\n    div.page-header{\\n        margin-top: 90px;\\n        position: relative;\\n        width: 100vw;\\n        height: 125px;\\n        display: flex;\\n        justify-content: center;\\n        align-items: flex-end;\\n        box-sizing: border-box;\\n        padding-left:20rem;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        div.page-header {\\n            padding: 0;\\n            box-sizing: content-box;\\n            height: 220px;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        div.page-header {\\n            height: 250px;\\n        }\\n    }\\n\\n    span{\\n        position: absolute;\\n        transform: scaleX(-1);\\n        transform: scaleX(-1) rotate(180deg) skew(-10deg, 0deg);\\n        opacity: .03;\\n        left: 3px;\\n        bottom: -25px;\\n        font-size: 32px;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        span {\\n            left: 5px;\\n            bottom: -55px;\\n            font-size: 55px;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        span {\\n            font-size: 64px;\\n        }\\n    }\\n    \\n</style>\\n<div class=\\\"page-header container\\\">\\n    <div class='title-container {sidePage}'>\\n        <h1>{title}</h1>\\n        <span>{title}</span>\\n    </div>\\n</div>\"],\"names\":[],\"mappings\":\"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\"}"
};

const PageTitle = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { title, sidePage } = $$props;
// sidePage should be set to 'side-page' to toggle class

	if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
	if ($$props.sidePage === void 0 && $$bindings.sidePage && sidePage !== void 0) $$bindings.sidePage(sidePage);

	$$result.css.add(css$f);

	return `<div class="page-header container svelte-a5em78">
	    <div class="title-container ${escape(sidePage)} svelte-a5em78">
	        <h1 class="svelte-a5em78">${escape(title)}</h1>
	        <span class="svelte-a5em78">${escape(title)}</span>
	    </div>
	</div>`;
});

/* src/components/project-detail/TopBar.svelte generated by Svelte v3.9.1 */

const css$g = {
	code: "h2.svelte-1upr8r{position:relative;display:flex;align-items:center;margin:15rem 0rem 5rem 0rem;font-size:13rem;font-weight:900;text-transform:capitalize;transition:all .2s ease-in-out;color:#3B3B3B;z-index:2}p.svelte-1upr8r{position:relative;line-height:16px;font-weight:300;font-size:13rem;z-index:1;color:#58595b}@media screen and (min-width: 40em){h2.svelte-1upr8r{margin-top:0rem}}@media screen and (min-width: 64em){h2.svelte-1upr8r{font-size:23rem}p.svelte-1upr8r{font-size:18rem;line-height:21px}}",
	map: "{\"version\":3,\"file\":\"TopBar.svelte\",\"sources\":[\"TopBar.svelte\"],\"sourcesContent\":[\"<script>\\nimport TextAnimation from '../helper-components/TextAnimation.svelte';\\n\\nexport let projectName, url, projectText, projectYear;\\n</script>\\n\\n<style>\\n\\n    a{\\n        display: flex;\\n        align-items: center;\\n        font-weight: 300;\\n        text-transform: uppercase;\\n        font-size: 12rem;\\n        width: fit-content;\\n        margin-top: 10rem;\\n        color: #989898;\\n        font-weight: 300;\\n        font-style: italic;\\n    }\\n    h2 {\\n        position: relative;\\n        display: flex;\\n        align-items: center;\\n        margin: 15rem 0rem 5rem 0rem;\\n        font-size: 13rem;\\n        font-weight: 900;\\n        text-transform: capitalize;\\n        transition: all .2s ease-in-out;\\n        color: #3B3B3B;\\n        z-index: 2;\\n    }\\n\\n    p{\\n        position: relative;\\n        line-height: 16px;\\n        font-weight: 300;\\n        font-size: 13rem;\\n        z-index: 1;\\n        color: #58595b;\\n        /* text-indent: 10px; */\\n    }\\n\\n    @media screen and (min-width: 40em) {\\n        h2 {\\n            margin-top: 0rem;\\n        }\\n    }\\n\\n@media screen and (min-width: 64em){\\n    h2 {\\n        font-size: 23rem;\\n    }\\n    p{\\n        font-size: 18rem;\\n        line-height: 21px;\\n    }\\n    a{\\n        font-size: 14rem;\\n    }\\n}\\n\\n</style>\\n\\n<div class=\\\"grid-x\\\">\\n    <div class=\\\"gridx-50\\\">\\n        <h2>Project</h2>\\n        <p>\\n            Complete Front End Rebuild\\n        </p>\\n        <!-- <a target=\\\"blank\\\" href=\\\"{url}\\\">\\n            <TextAnimation text={`View Website`} />\\n        </a> -->\\n    </div>\\n    <div class=\\\"gridx-50\\\">\\n        <h2>Role</h2>\\n        <p>\\n            Front End Developer\\n        </p>\\n        <!-- <a target=\\\"blank\\\" href=\\\"{url}\\\">\\n            <TextAnimation text={`View Code`} />\\n        </a> -->\\n    </div>\\n</div>\"],\"names\":[],\"mappings\":\"AAoBI,EAAE,cAAC,CAAC,AACA,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAC5B,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,UAAU,CAC1B,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,WAAW,CAC/B,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,CAAC,AACd,CAAC,AAED,eAAC,CAAC,AACE,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,OAAO,AAElB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,EAAE,cAAC,CAAC,AACA,UAAU,CAAE,IAAI,AACpB,CAAC,AACL,CAAC,AAEL,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,cAAC,CAAC,AACA,SAAS,CAAE,KAAK,AACpB,CAAC,AACD,eAAC,CAAC,AACE,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,IAAI,AACrB,CAAC,AAIL,CAAC\"}"
};

const TopBar = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { projectName, url, projectText, projectYear } = $$props;

	if ($$props.projectName === void 0 && $$bindings.projectName && projectName !== void 0) $$bindings.projectName(projectName);
	if ($$props.url === void 0 && $$bindings.url && url !== void 0) $$bindings.url(url);
	if ($$props.projectText === void 0 && $$bindings.projectText && projectText !== void 0) $$bindings.projectText(projectText);
	if ($$props.projectYear === void 0 && $$bindings.projectYear && projectYear !== void 0) $$bindings.projectYear(projectYear);

	$$result.css.add(css$g);

	return `<div class="grid-x">
	    <div class="gridx-50">
	        <h2 class="svelte-1upr8r">Project</h2>
	        <p class="svelte-1upr8r">
	            Complete Front End Rebuild
	        </p>
	        
	    </div>
	    <div class="gridx-50">
	        <h2 class="svelte-1upr8r">Role</h2>
	        <p class="svelte-1upr8r">
	            Front End Developer
	        </p>
	        
	    </div>
	</div>`;
});

/* src/components/project-detail/Description.svelte generated by Svelte v3.9.1 */

const css$h = {
	code: "a.svelte-s2xmgv{display:flex;align-items:center;font-weight:300;text-transform:uppercase;font-size:12rem;width:fit-content;margin-top:10rem;color:#989898;font-weight:300;font-style:italic}h2.svelte-s2xmgv{position:relative;display:flex;align-items:center;margin:15rem 0rem 5rem 0rem;font-size:13rem;font-weight:900;text-transform:capitalize;transition:all .2s ease-in-out;color:#3B3B3B;z-index:2}p.svelte-s2xmgv{position:relative;line-height:16px;font-weight:300;font-size:13rem;z-index:1;color:#58595b;text-indent:10px}@media screen and (min-width: 40em){h2.svelte-s2xmgv{margin-top:0rem}}@media screen and (min-width: 64em){h2.svelte-s2xmgv{font-size:23rem}p.svelte-s2xmgv{font-size:18rem;line-height:21px}a.svelte-s2xmgv{font-size:14rem}}.text-container.svelte-s2xmgv{position:sticky;top:130px}",
	map: "{\"version\":3,\"file\":\"Description.svelte\",\"sources\":[\"Description.svelte\"],\"sourcesContent\":[\"<script>\\nimport TextAnimation from '../helper-components/TextAnimation.svelte';\\n\\n</script>\\n\\n<style>\\n  a{\\n        display: flex;\\n        align-items: center;\\n        font-weight: 300;\\n        text-transform: uppercase;\\n        font-size: 12rem;\\n        width: fit-content;\\n        margin-top: 10rem;\\n        color: #989898;\\n        font-weight: 300;\\n        font-style: italic;\\n    }\\n    h2 {\\n        position: relative;\\n        display: flex;\\n        align-items: center;\\n        margin: 15rem 0rem 5rem 0rem;\\n        font-size: 13rem;\\n        font-weight: 900;\\n        text-transform: capitalize;\\n        transition: all .2s ease-in-out;\\n        color: #3B3B3B;\\n        z-index: 2;\\n    }\\n\\n    p{\\n        position: relative;\\n        line-height: 16px;\\n        font-weight: 300;\\n        font-size: 13rem;\\n        z-index: 1;\\n        color: #58595b;\\n        text-indent: 10px;\\n    }\\n\\n    @media screen and (min-width: 40em) {\\n        h2 {\\n            margin-top: 0rem;\\n        }\\n    }\\n\\n@media screen and (min-width: 64em){\\n    h2 {\\n        font-size: 23rem;\\n    }\\n    p{\\n        font-size: 18rem;\\n        line-height: 21px;\\n    }\\n    a{\\n        font-size: 14rem;\\n    }\\n}\\n.text-container {\\n    position: sticky;\\n    top: 130px;\\n}\\n</style>\\n\\n<div class=\\\"text-container\\\">\\n    <h2>Project Details</h2>\\n    <p>I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.</p>\\n    <a target=\\\"blank\\\" href=\\\"\\\">\\n        <TextAnimation text={`View Website`} />\\n    </a>\\n</div>\"],\"names\":[],\"mappings\":\"AAME,eAAC,CAAC,AACI,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,SAAS,CACzB,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,WAAW,CAClB,UAAU,CAAE,KAAK,CACjB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,MAAM,AACtB,CAAC,AACD,EAAE,cAAC,CAAC,AACA,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAC5B,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,UAAU,CAC1B,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,WAAW,CAC/B,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,CAAC,AACd,CAAC,AAED,eAAC,CAAC,AACE,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,IAAI,AACrB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,EAAE,cAAC,CAAC,AACA,UAAU,CAAE,IAAI,AACpB,CAAC,AACL,CAAC,AAEL,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,cAAC,CAAC,AACA,SAAS,CAAE,KAAK,AACpB,CAAC,AACD,eAAC,CAAC,AACE,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,IAAI,AACrB,CAAC,AACD,eAAC,CAAC,AACE,SAAS,CAAE,KAAK,AACpB,CAAC,AACL,CAAC,AACD,eAAe,cAAC,CAAC,AACb,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,KAAK,AACd,CAAC\"}"
};

const Description = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$h);

	return `<div class="text-container svelte-s2xmgv">
	    <h2 class="svelte-s2xmgv">Project Details</h2>
	    <p class="svelte-s2xmgv">I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.</p>
	    <a target="blank" href="" class="svelte-s2xmgv">
	        ${validate_component(TextAnimation, 'TextAnimation').$$render($$result, { text: `View Website` }, {}, {})}
	    </a>
	</div>`;
});

/* src/components/project-detail/Carousel.svelte generated by Svelte v3.9.1 */

const css$i = {
	code: ".carousel-container.svelte-1rkoq0s{position:relative;display:flex;align-items:flex-end}@media screen and (min-width: 40em){.box.svelte-1rkoq0s{display:inline-block;background:url(\"../images/drawing.jpg\");z-index:-1;display:flex;align-items:center;justify-content:flex-end;width:237px;border:3px solid black;height:411px;background:transparent}}@media screen and (min-width: 64em){.box.svelte-1rkoq0s{width:355px;height:616px}}.slide.svelte-1rkoq0s{position:absolute;width:95%;height:80%;right:0;top:50%;transform:translateY(-50%)}img.svelte-1rkoq0s{width:100%;height:100%;object-fit:cover}",
	map: "{\"version\":3,\"file\":\"Carousel.svelte\",\"sources\":[\"Carousel.svelte\"],\"sourcesContent\":[\"<script>\\nlet STATE = {\\n    images: [\\n        {\\n            src: 'images/halcyon-5.jpg',\\n            visible: true,\\n            key: 0,\\n        },\\n        {\\n            src: 'images/uptexas-thumb.jpg',\\n            visible: false,\\n            key: 0,\\n        },\\n        {\\n            src: 'images/Jorden-Background-Gray.jpg',\\n            visible: false,\\n            key: 0,\\n        },\\n    ]\\n}\\n\\n</script>\\n\\n<style>\\n.carousel-container {\\n    position: relative;\\n    display: flex;\\n    align-items: flex-end;\\n    /* height: 700px; */\\n}\\n\\n@media screen and (min-width: 40em){\\n    .box {\\n        /* position: absolute;\\n        top: 0;\\n        left: 0; */\\n        display: inline-block;\\n        background: url(\\\"../images/drawing.jpg\\\");\\n        z-index: -1;\\n        display: flex;\\n        align-items: center;\\n        justify-content: flex-end;\\n        width: 237px;\\n        border: 3px solid black;\\n        height: 411px;\\n        background: transparent;\\n    }\\n}\\n\\n@media screen and (min-width: 64em) {\\n    .box {\\n        width: 355px;\\n        height: 616px;\\n    }\\n}\\n\\n/* @media screen and (min-width: 1366px){\\n    .box {\\n        width: 497px;\\n        height: 862.4px;\\n    }\\n} */\\n\\n.slide {\\n    position: absolute;\\n    width: 95%;\\n    height: 80%;\\n    right: 0;\\n    top: 50%;\\n    transform: translateY(-50%);\\n}\\n\\nimg {\\n    width: 100%;\\n    height: 100%;\\n    object-fit: cover;  \\n}\\n\\n</style>\\n\\n<div class=\\\"carousel-container\\\">\\n    <div class=\\\"box\\\"></div>\\n        {#each STATE.images as img}\\n            {#if img.visible}\\n                <div class=\\\"slide\\\">\\n                    <img src=\\\"{img.src}\\\" alt=\\\"wassup\\\">\\n                </div>\\n            {/if}\\n        {/each}\\n        <!-- <div class=\\\"slide\\\">\\n            <img src=\\\"images/Jorden-Background-Gray.jpg\\\" alt=\\\"wassup\\\">\\n        </div> -->\\n    <div class=\\\"circles\\\">\\n        {#each STATE.images as img, i}\\n            <span class=\\\"circle\\\">circle {i}</span>\\n        {/each}\\n    </div>\\n</div>\"],\"names\":[],\"mappings\":\"AAwBA,mBAAmB,eAAC,CAAC,AACjB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,QAAQ,AAEzB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,IAAI,eAAC,CAAC,AAIF,OAAO,CAAE,YAAY,CACrB,UAAU,CAAE,IAAI,uBAAuB,CAAC,CACxC,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,QAAQ,CACzB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CACvB,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,WAAW,AAC3B,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,IAAI,eAAC,CAAC,AACF,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,AACjB,CAAC,AACL,CAAC,AASD,MAAM,eAAC,CAAC,AACJ,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,CAAC,CACR,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,WAAW,IAAI,CAAC,AAC/B,CAAC,AAED,GAAG,eAAC,CAAC,AACD,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,AACrB,CAAC\"}"
};

const Carousel = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let STATE = {
    images: [
        {
            src: 'images/halcyon-5.jpg',
            visible: true,
            key: 0,
        },
        {
            src: 'images/uptexas-thumb.jpg',
            visible: false,
            key: 0,
        },
        {
            src: 'images/Jorden-Background-Gray.jpg',
            visible: false,
            key: 0,
        },
    ]
};

	$$result.css.add(css$i);

	return `<div class="carousel-container svelte-1rkoq0s">
	    <div class="box svelte-1rkoq0s"></div>
	        ${each(STATE.images, (img) => `${ img.visible ? `<div class="slide svelte-1rkoq0s">
	                    <img${add_attribute("src", img.src, 0)} alt="wassup" class="svelte-1rkoq0s">
	                </div>` : `` }`)}
	        
	    <div class="circles">
	        ${each(STATE.images, (img, i) => `<span class="circle">circle ${escape(i)}</span>`)}
	    </div>
	</div>`;
});

/* src/components/project-detail/ImageGrid.svelte generated by Svelte v3.9.1 */

const css$j = {
	code: "@media screen and (min-width: 40em){.inner-container.svelte-y3hoac{width:90%;margin:0 auto}}@media screen and (min-width: 40em){.project-description.svelte-y3hoac{padding-top:8%;width:50%}}@media screen and (min-width: 40em){}",
	map: "{\"version\":3,\"file\":\"ImageGrid.svelte\",\"sources\":[\"ImageGrid.svelte\"],\"sourcesContent\":[\"<script>\\nimport Image from './Image.svelte';\\nimport TopBar from './TopBar.svelte';\\nimport Description from './Description.svelte';\\nimport Carousel from './Carousel.svelte';\\n</script>\\n\\n<style>\\n@media screen and (min-width: 40em){\\n    .inner-container {\\n        width: 90%;\\n        margin: 0 auto;\\n    }\\n}\\n.image-grid {\\n    display: flex;\\n    flex-wrap: wrap;\\n    flex-direction: column;\\n    align-items: center;\\n    padding-top: 8%;\\n}\\n\\n@media screen and (min-width: 40em){\\n    .image-grid {\\n        box-sizing: border-box;\\n        flex-direction: row;\\n        align-items: unset;\\n        width: 50%;\\n        /* padding-left: 5%; */\\n        margin: 0 auto;\\n    }\\n    .project-description {\\n        padding-top: 8%;\\n        width: 50%;\\n    }\\n}\\n\\n.grid-element-container {\\n    width: 250px;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    margin-bottom: 8%;\\n}\\n\\n@media screen and (min-width: 40em){\\n    .grid-element-container {\\n        width: 50%;\\n    }\\n    .grid-element-container.full-width {\\n        width: 100%;\\n    }\\n    .grid-60 {\\n        width: 60%;\\n    }\\n    .grid-40 {\\n        width: 40%;\\n    }\\n}\\n</style>\\n\\n<div class=\\\"inner-container\\\">\\n    <TopBar />\\n    <!-- <div class=\\\"grid-x\\\"> -->\\n        <div class=\\\"project-description\\\">\\n            <Description />\\n        </div>\\n        \\n        <Carousel />\\n    <!-- </div> -->\\n</div>\"],\"names\":[],\"mappings\":\"AAQA,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,gBAAgB,cAAC,CAAC,AACd,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,CAAC,CAAC,IAAI,AAClB,CAAC,AACL,CAAC,AASD,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAShC,oBAAoB,cAAC,CAAC,AAClB,WAAW,CAAE,EAAE,CACf,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAUD,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAapC,CAAC\"}"
};

const ImageGrid = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$j);

	return `<div class="inner-container svelte-y3hoac">
	    ${validate_component(TopBar, 'TopBar').$$render($$result, {}, {}, {})}
	    
	        <div class="project-description svelte-y3hoac">
	            ${validate_component(Description, 'Description').$$render($$result, {}, {}, {})}
	        </div>
	        
	        ${validate_component(Carousel, 'Carousel').$$render($$result, {}, {}, {})}
	    
	</div>`;
});

/* src/routes/projects/creative-revolt.svelte generated by Svelte v3.9.1 */

const Creative_revolt = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `${($$result.head += `<title>Creative Revolt | Front End Developer - Joshua Roper</title>`, "")}

	<div>
	    ${validate_component(PageTitle, 'PageTitle').$$render($$result, { title: 'Creative Revolt' }, {}, {})}
	</div>

	<section class="container">
	   
	    ${validate_component(ImageGrid, 'ImageGrid').$$render($$result, {}, {}, {})}
	</section>`;
});

/* src/routes/projects/university-park.svelte generated by Svelte v3.9.1 */

const University_park = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return ``;
});

/* src/routes/projects/halcyon.svelte generated by Svelte v3.9.1 */

const Halcyon = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return ``;
});

/* src/components/about/PageTitle.svelte generated by Svelte v3.9.1 */

const css$k = {
	code: "@keyframes svelte-10hn8pb-slideInRight{100%{transform:translateX(100%)}}@keyframes svelte-10hn8pb-badSlideInRight{0%{left:-100%}100%{left:5px}}div.svelte-10hn8pb:not(.page-header){display:flex;justify-content:flex-end;width:65%;margin:-05px 0px 20px 0;font-size:16rem;text-transform:uppercase;color:#58595b;max-width:900px}div.side-page.svelte-10hn8pb{font-size:12rem;max-width:1705px}div.title-container.svelte-10hn8pb:not(.side-page){position:relative;width:100%}@media screen and (min-width: 40em){div.title-container.svelte-10hn8pb:not(.side-page){margin-bottom:20px;width:75%}div.svelte-10hn8pb:not(.page-header){font-size:28rem;width:75%}div.side-page.svelte-10hn8pb{font-size:24rem;width:85%\n        }}h1.svelte-10hn8pb{color:#3B3B3B;position:relative;width:100%;top:0;right:0px;display:flex;font-size:32px;align-items:center;margin:0px}@media screen and (min-width: 40em){h1.svelte-10hn8pb{font-size:55px}}@media screen and (min-width: 64em){h1.svelte-10hn8pb{font-size:64px}}div.page-header.svelte-10hn8pb{margin-top:90px;position:relative;width:100vw;height:125px;display:flex;justify-content:center;align-items:flex-end;box-sizing:border-box;padding-left:20rem}@media screen and (min-width: 40em){div.page-header.svelte-10hn8pb{padding:0;box-sizing:content-box;height:220px}}@media screen and (min-width: 64em){div.page-header.svelte-10hn8pb{height:250px}}span.svelte-10hn8pb{position:absolute;transform:scaleX(-1);transform:scaleX(-1) rotate(180deg) skew(-10deg, 0deg);opacity:.03;left:3px;bottom:-25px;font-size:32px}@media screen and (min-width: 40em){span.svelte-10hn8pb{left:5px;bottom:-55px;font-size:55px}}@media screen and (min-width: 64em){span.svelte-10hn8pb{font-size:64px}}",
	map: "{\"version\":3,\"file\":\"PageTitle.svelte\",\"sources\":[\"PageTitle.svelte\"],\"sourcesContent\":[\"<script>\\nexport let title, sidePage;\\n// sidePage should be set to 'side-page' to toggle class\\n</script>\\n\\n<style>\\n\\n    @keyframes slideInRight {\\n        100% {\\n            transform: translateX(100%);\\n        }\\n    }\\n\\n    @keyframes badSlideInRight {\\n        0% {\\n            left: -100%;\\n        }\\n        100% {\\n            left: 5px;\\n        }\\n    }\\n\\n    div:not(.page-header) {\\n        display: flex;\\n        justify-content: flex-end;\\n        width: 65%;\\n        margin: -05px 0px 20px 0;\\n        font-size: 16rem;\\n        text-transform: uppercase;\\n        color: #58595b;\\n        max-width: 900px;\\n    }\\n\\n    div.side-page {\\n        font-size: 12rem;\\n        max-width: 1705px;\\n    }\\n\\n    div.title-container:not(.side-page){\\n        position: relative;\\n        /* animation: .9s ease-out 0s 1 fadeIn forwards; */\\n        width: 100%;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        div.title-container:not(.side-page){\\n            margin-bottom: 20px;\\n            width: 75%;\\n        }\\n\\n        div:not(.page-header) {\\n            font-size: 28rem;\\n            width: 75%;\\n        }\\n\\n        div.side-page {\\n            font-size: 24rem;\\n            width: 85%\\n        }\\n    }\\n\\n    h1 {\\n        color: #3B3B3B;\\n        position: relative;\\n        width: 100%;\\n        top: 0;\\n        /* left: -100%; */\\n        right: 0px;\\n        display: flex;\\n        font-size: 32px;\\n        align-items: center;\\n        margin: 0px;\\n        /* animation: 1s ease-out 0s 1 slideInRight forwards; */\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        h1 {\\n            font-size: 55px;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        h1 {\\n            font-size: 64px;\\n        }\\n    }\\n\\n    div.page-header{\\n        margin-top: 90px;\\n        position: relative;\\n        width: 100vw;\\n        height: 125px;\\n        display: flex;\\n        justify-content: center;\\n        align-items: flex-end;\\n        box-sizing: border-box;\\n        padding-left:20rem;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        div.page-header {\\n            padding: 0;\\n            box-sizing: content-box;\\n            height: 220px;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        div.page-header {\\n            height: 250px;\\n        }\\n    }\\n\\n    span{\\n        position: absolute;\\n        transform: scaleX(-1);\\n        transform: scaleX(-1) rotate(180deg) skew(-10deg, 0deg);\\n        opacity: .03;\\n        left: 3px;\\n        bottom: -25px;\\n        font-size: 32px;\\n         /* animation: 1s ease-out 0s 1 badSlideInRight; */\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        span {\\n            left: 5px;\\n            bottom: -55px;\\n            font-size: 55px;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        span {\\n            font-size: 64px;\\n        }\\n    }\\n    \\n</style>\\n<div class=\\\"page-header\\\">\\n    <div class='title-container {sidePage}'>\\n        <h1>{title}</h1>\\n        <span>{title}</span>\\n    </div>\\n</div>\"],\"names\":[],\"mappings\":\"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\"}"
};

const PageTitle$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { title, sidePage } = $$props;
// sidePage should be set to 'side-page' to toggle class

	if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
	if ($$props.sidePage === void 0 && $$bindings.sidePage && sidePage !== void 0) $$bindings.sidePage(sidePage);

	$$result.css.add(css$k);

	return `<div class="page-header svelte-10hn8pb">
	    <div class="title-container ${escape(sidePage)} svelte-10hn8pb">
	        <h1 class="svelte-10hn8pb">${escape(title)}</h1>
	        <span class="svelte-10hn8pb">${escape(title)}</span>
	    </div>
	</div>`;
});

/* src/components/about/AboutMe.svelte generated by Svelte v3.9.1 */

const css$l = {
	code: "div.svelte-1b7l8lk{display:flex;flex-direction:column}@media screen and (min-width: 40em){div.svelte-1b7l8lk{flex-direction:row}}p.svelte-1b7l8lk:nth-child(1){width:fit-content;margin-bottom:15rem;width:100%\n    }@media screen and (min-width: 40em){p.svelte-1b7l8lk:nth-child(1){width:20%}}h3.svelte-1b7l8lk{width:fit-content;margin-bottom:15rem;width:100%;text-transform:uppercase}@media screen and (min-width: 40em){h3.svelte-1b7l8lk{width:18%}}@media screen and (min-width: 64em){h3.svelte-1b7l8lk{font-size:23rem;width:20%}}p.svelte-1b7l8lk:nth-child(2){width:100%}@media screen and (min-width: 40em){p.svelte-1b7l8lk:nth-child(2){width:65%}}@media screen and (min-width: 64em){p.svelte-1b7l8lk:nth-child(2){width:50%}}p.svelte-1b7l8lk{font-weight:300;font-size:13rem;color:#58595b}@media screen and (min-width: 64em){p.svelte-1b7l8lk{font-size:18rem;line-height:23px}}",
	map: "{\"version\":3,\"file\":\"AboutMe.svelte\",\"sources\":[\"AboutMe.svelte\"],\"sourcesContent\":[\"<script>\\n\\n</script>\\n\\n<style>\\n\\n    div {\\n        display: flex;\\n        flex-direction: column;\\n    }\\n    \\n    @media screen and (min-width: 40em){\\n        div{\\n            flex-direction: row;\\n        }\\n    }\\n\\n    p:nth-child(1){\\n        width: fit-content;\\n        margin-bottom: 15rem;\\n        width: 100%\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        p:nth-child(1) {\\n            width: 20%;\\n        }\\n    }\\n\\n    h3{\\n        width: fit-content;\\n        margin-bottom: 15rem;\\n        width: 100%;\\n        text-transform: uppercase;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n       h3 {\\n            width: 18%;\\n        }\\n    }\\n    @media screen and (min-width: 64em){\\n        h3 {\\n            font-size: 23rem;\\n            width: 20%;\\n        }\\n    }\\n\\n    p:nth-child(2){\\n        width: 100%;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        p:nth-child(2) {\\n            width: 65%;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        p:nth-child(2) {\\n            width: 50%;\\n        }\\n    }\\n\\n    p {\\n        font-weight: 300;\\n        font-size: 13rem;\\n        color: #58595b;\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        p{\\n            font-size: 18rem;\\n            line-height: 23px;\\n        }\\n    }\\n\\n</style>\\n\\n<div>\\n    <h3>\\n        About Me\\n    </h3>\\n    <p>\\n        Hi There! I’m Josh, a Dallas-based <strong>Front End Developer</strong> with a knack for programing and design.\\n         My <strong>passion</strong> comes from being a part of a solution that brings each aspect of the customer journey \\n         together across both <strong>development and design</strong> processes.\\n        I focus on creating <strong>production ready applications</strong> with my knowledge of the user experience, \\n        and writing scalable <strong>clean code</strong>.\\n    </p>\\n</div>\"],\"names\":[],\"mappings\":\"AAMI,GAAG,eAAC,CAAC,AACD,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,AAC1B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,kBAAG,CAAC,AACA,cAAc,CAAE,GAAG,AACvB,CAAC,AACL,CAAC,AAED,gBAAC,WAAW,CAAC,CAAC,CAAC,AACX,KAAK,CAAE,UAAU,CAAC,CAClB,aAAa,CAAE,KAAK,CACpB,KAAK,CAAE,IAAI;IACf,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,gBAAC,WAAW,CAAC,CAAC,AAAC,CAAC,AACZ,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,iBAAE,CAAC,AACC,KAAK,CAAE,WAAW,CAClB,aAAa,CAAE,KAAK,CACpB,KAAK,CAAE,IAAI,CACX,cAAc,CAAE,SAAS,AAC7B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AACjC,EAAE,eAAC,CAAC,AACC,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AACD,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,eAAC,CAAC,AACA,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,gBAAC,WAAW,CAAC,CAAC,CAAC,AACX,KAAK,CAAE,IAAI,AACf,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,gBAAC,WAAW,CAAC,CAAC,AAAC,CAAC,AACZ,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,gBAAC,WAAW,CAAC,CAAC,AAAC,CAAC,AACZ,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,CAAC,eAAC,CAAC,AACC,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,OAAO,AAClB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,gBAAC,CAAC,AACE,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,IAAI,AACrB,CAAC,AACL,CAAC\"}"
};

const AboutMe = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$l);

	return `<div class="svelte-1b7l8lk">
	    <h3 class="svelte-1b7l8lk">
	        About Me
	    </h3>
	    <p class="svelte-1b7l8lk">
	        Hi There! I’m Josh, a Dallas-based <strong>Front End Developer</strong> with a knack for programing and design.
	         My <strong>passion</strong> comes from being a part of a solution that brings each aspect of the customer journey 
	         together across both <strong>development and design</strong> processes.
	        I focus on creating <strong>production ready applications</strong> with my knowledge of the user experience, 
	        and writing scalable <strong>clean code</strong>.
	    </p>
	</div>`;
});

/* src/components/about/Skills.svelte generated by Svelte v3.9.1 */

const css$m = {
	code: "div.svelte-1yh9nhf{display:flex;flex-direction:column}@media screen and (min-width: 40em){div.svelte-1yh9nhf{flex-direction:row}}h3.svelte-1yh9nhf{width:fit-content;margin-bottom:15rem;width:100%;text-transform:uppercase}@media screen and (min-width: 40em){h3.svelte-1yh9nhf{width:18%}}@media screen and (min-width: 64em){h3.svelte-1yh9nhf{font-size:23rem;width:20%}}ul.skills.svelte-1yh9nhf{position:relative;top:10rem;width:100%;display:flex;flex-wrap:wrap}@media screen and (min-width: 40em){ul.skills.svelte-1yh9nhf{width:60%}}ul.skills.svelte-1yh9nhf::before{content:'';height:100%;position:absolute;border-left:3px solid #e6e7e8;opacity:.4}li.svelte-1yh9nhf{width:100%;font-weight:300;font-size:13rem;color:#58595b;margin:0rem 0rem 25rem 0rem;padding:0rem 0rem 0rem 0rem;display:flex;align-items:center;margin-left:-2px;height:0;z-index:2}@media screen and (min-width: 64em){li.svelte-1yh9nhf{font-size:18rem}}ul.svelte-1yh9nhf li.svelte-1yh9nhf:last-child{margin-bottom:0rem}li.svelte-1yh9nhf::before{content:'';width:7px;height:7px;background:#58595b;margin-right:10rem;border-radius:100%\n    }",
	map: "{\"version\":3,\"file\":\"Skills.svelte\",\"sources\":[\"Skills.svelte\"],\"sourcesContent\":[\"<script>\\n\\n</script>\\n\\n<style>\\n\\n    div {\\n        display: flex;\\n        flex-direction: column;\\n    }\\n    \\n    @media screen and (min-width: 40em){\\n        div{\\n            flex-direction: row;\\n        }\\n    }\\n\\n    h3 {\\n        width: fit-content;\\n        margin-bottom: 15rem;\\n        width: 100%;\\n        text-transform: uppercase;\\n        \\n    }\\n\\n    @media screen and (min-width: 40em){\\n        h3 {\\n            width: 18%;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        h3 {\\n            font-size: 23rem;\\n            width: 20%;\\n        }\\n    }\\n\\n    ul.skills{\\n        position: relative;\\n        top: 10rem;\\n        width: 100%;\\n        display: flex;\\n        flex-wrap: wrap;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        ul.skills{\\n            width: 60%;\\n        }\\n    }\\n\\n    ul.skills::before {\\n        content: '';\\n        height: 100%;\\n        position: absolute;\\n        border-left: 3px solid #e6e7e8;\\n        opacity: .4;\\n    }\\n\\n    p {\\n        font-weight: 300;\\n        font-size: 13rem;\\n        color: #58595b;\\n    }\\n\\n    \\n    li {\\n        width: 100%;\\n        font-weight: 300;\\n        font-size: 13rem;\\n        color: #58595b;\\n        margin: 0rem 0rem 25rem 0rem;\\n        padding: 0rem 0rem 0rem 0rem;\\n        display: flex;\\n        align-items: center;\\n        margin-left: -2px;\\n        height: 0;\\n        z-index: 2;\\n    }\\n\\n\\n    @media screen and (min-width: 64em){\\n        li {\\n            font-size: 18rem;\\n        }\\n    }\\n\\n    span {\\n        color: #414042;\\n        font-weight: 500;\\n    }\\n\\n    ul li:last-child {\\n        margin-bottom: 0rem;\\n    }\\n\\n    li::before {\\n        content: '';\\n        width: 7px;\\n        height: 7px;\\n        background: #58595b;\\n        margin-right: 10rem;\\n        border-radius: 100%\\n    }\\n\\n</style>\\n\\n<div>\\n    <h3>\\n        Skills\\n    </h3>\\n        <ul class=\\\"skills\\\">\\n            <li>React</li>\\n            <li>Svelte 3</li>\\n            <li>Sapper</li>\\n            <li>JavaScript (ES6+)</li>\\n            <li>WebPack</li>\\n            <li>Git (Version Control)</li>\\n            <li>jQuery</li> \\n            <li>SASS / SCSS</li>\\n            <li>CSS</li>\\n            <li>Foundation</li>\\n            <li>Bootstrap</li>\\n            <li>HTML (WCAG 2.1)</li>\\n            <li>HTML Emails</li>\\n            <li>GitHub / BitBucket</li>\\n            <li>WordPress / Kentico</li>\\n            <li>Adobe Suite</li>\\n            <li>SEO</li>\\n            <li>Usability Testing</li> \\n        </ul>\\n</div>\"],\"names\":[],\"mappings\":\"AAMI,GAAG,eAAC,CAAC,AACD,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,AAC1B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,kBAAG,CAAC,AACA,cAAc,CAAE,GAAG,AACvB,CAAC,AACL,CAAC,AAED,EAAE,eAAC,CAAC,AACA,KAAK,CAAE,WAAW,CAClB,aAAa,CAAE,KAAK,CACpB,KAAK,CAAE,IAAI,CACX,cAAc,CAAE,SAAS,AAE7B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,eAAC,CAAC,AACA,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,eAAC,CAAC,AACA,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,EAAE,sBAAO,CAAC,AACN,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,CACV,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,AACnB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,sBAAO,CAAC,AACN,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,EAAE,sBAAO,QAAQ,AAAC,CAAC,AACf,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAC9B,OAAO,CAAE,EAAE,AACf,CAAC,AASD,EAAE,eAAC,CAAC,AACA,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,IAAI,CAC5B,OAAO,CAAE,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAC5B,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACd,CAAC,AAGD,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,eAAC,CAAC,AACA,SAAS,CAAE,KAAK,AACpB,CAAC,AACL,CAAC,AAOD,iBAAE,CAAC,iBAAE,WAAW,AAAC,CAAC,AACd,aAAa,CAAE,IAAI,AACvB,CAAC,AAED,iBAAE,QAAQ,AAAC,CAAC,AACR,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,UAAU,CAAE,OAAO,CACnB,YAAY,CAAE,KAAK,CACnB,aAAa,CAAE,IAAI;IACvB,CAAC\"}"
};

const Skills = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$m);

	return `<div class="svelte-1yh9nhf">
	    <h3 class="svelte-1yh9nhf">
	        Skills
	    </h3>
	        <ul class="skills svelte-1yh9nhf">
	            <li class="svelte-1yh9nhf">React</li>
	            <li class="svelte-1yh9nhf">Svelte 3</li>
	            <li class="svelte-1yh9nhf">Sapper</li>
	            <li class="svelte-1yh9nhf">JavaScript (ES6+)</li>
	            <li class="svelte-1yh9nhf">WebPack</li>
	            <li class="svelte-1yh9nhf">Git (Version Control)</li>
	            <li class="svelte-1yh9nhf">jQuery</li> 
	            <li class="svelte-1yh9nhf">SASS / SCSS</li>
	            <li class="svelte-1yh9nhf">CSS</li>
	            <li class="svelte-1yh9nhf">Foundation</li>
	            <li class="svelte-1yh9nhf">Bootstrap</li>
	            <li class="svelte-1yh9nhf">HTML (WCAG 2.1)</li>
	            <li class="svelte-1yh9nhf">HTML Emails</li>
	            <li class="svelte-1yh9nhf">GitHub / BitBucket</li>
	            <li class="svelte-1yh9nhf">WordPress / Kentico</li>
	            <li class="svelte-1yh9nhf">Adobe Suite</li>
	            <li class="svelte-1yh9nhf">SEO</li>
	            <li class="svelte-1yh9nhf">Usability Testing</li> 
	        </ul>
	</div>`;
});

/* src/components/about/Contact.svelte generated by Svelte v3.9.1 */

const css$n = {
	code: "div.svelte-1cjafcw{display:flex;flex-direction:column}@media screen and (min-width: 40em){div.svelte-1cjafcw{flex-direction:row}}h3.svelte-1cjafcw{width:fit-content;margin-bottom:15rem;width:100%;text-transform:uppercase}@media screen and (min-width: 40em){h3.svelte-1cjafcw{width:18%}}@media screen and (min-width: 64em){h3.svelte-1cjafcw{font-size:23rem;width:20%}}.social-container.svelte-1cjafcw{width:70%;display:flex;flex-direction:column;justify-content:flex-start}i.svelte-1cjafcw{margin:05rem 0;color:gray;display:flex;align-items:center;transition:all .3s ease}i.svelte-1cjafcw>span.svelte-1cjafcw{margin-left:10rem;font-family:'Open Sans', sans-serif;font-weight:300;font-size:13rem;color:#58595b}@media screen and (min-width: 64em){i.svelte-1cjafcw>span.svelte-1cjafcw{font-size:18rem}}a.svelte-1cjafcw:hover i.svelte-1cjafcw{color:#3B3B3B}",
	map: "{\"version\":3,\"file\":\"Contact.svelte\",\"sources\":[\"Contact.svelte\"],\"sourcesContent\":[\"<script>\\n\\n</script>\\n\\n<style>\\n\\n    div {\\n        display: flex;\\n        flex-direction: column;\\n    }\\n    \\n    @media screen and (min-width: 40em){\\n        div{\\n            flex-direction: row;\\n        }\\n    }\\n\\n    h3{\\n        width: fit-content;\\n        margin-bottom: 15rem;\\n        width: 100%;\\n        text-transform: uppercase;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        h3 {\\n            width: 18%;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        h3 {\\n            font-size: 23rem;\\n            width: 20%;\\n        }\\n    }\\n\\n    P:nth-child(2)::before{\\n        content: '';\\n        display: block;\\n    }\\n    p {\\n        font-weight: 300;\\n        font-size: 13rem;\\n        color: #58595b;\\n    }\\n\\n    .social-container {\\n        width: 70%;\\n        display: flex;\\n        flex-direction: column;\\n        justify-content: flex-start;\\n    }\\n\\n    i {\\n        margin: 05rem 0;\\n        color: gray;\\n        display: flex;\\n        align-items: center;\\n        transition: all .3s ease;\\n    }\\n\\n    i > span {\\n        margin-left: 10rem;\\n        font-family: 'Open Sans', sans-serif;\\n        font-weight: 300;\\n        font-size: 13rem;\\n        color: #58595b;\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        i > span{\\n            font-size: 18rem;\\n        }\\n    }\\n\\n    a:hover i {\\n        color: #3B3B3B;\\n    }\\n\\n\\n</style>\\n\\n<!-- <svelte:head>\\n    <script src=\\\"https://kit.fontawesome.com/1309990c29.js\\\"></script>\\n</svelte:head> this script is being added via the footer -->\\n\\n<div>\\n    <h3>\\n        Contact\\n    </h3>\\n    <div class=\\\"social-container\\\">\\n        <a href=\\\"https://www.github.com/Jrope21\\\" aria-label=\\\"link to Joshua Roper's GitHub account\\\" target=\\\"blank\\\" ><i class=\\\"fab fa-github\\\"><span>www.github.com/Jrope21</span></i></a>\\n        <a href=\\\"https://www.linkedin.com/in/JR-dev\\\" aria-label=\\\"link to Joshua Roper's LinkedIn account\\\" target=\\\"blank\\\" ><i class=\\\"fab fa-linkedin\\\"><span>www.linkedin.com/in/JR-dev</span></i></a>\\n        <a href=\\\"mailto:joshua.micah.roper@gmail.com\\\" aria-label=\\\"link to send Joshua Roper an email\\\" target=\\\"blank\\\" ><i class=\\\"fas fa-envelope\\\"><span>Joshua.Micah.Roper@gmail.com</span></i></a>\\n    </div>\\n</div>\"],\"names\":[],\"mappings\":\"AAMI,GAAG,eAAC,CAAC,AACD,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,AAC1B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,kBAAG,CAAC,AACA,cAAc,CAAE,GAAG,AACvB,CAAC,AACL,CAAC,AAED,iBAAE,CAAC,AACC,KAAK,CAAE,WAAW,CAClB,aAAa,CAAE,KAAK,CACpB,KAAK,CAAE,IAAI,CACX,cAAc,CAAE,SAAS,AAC7B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,eAAC,CAAC,AACA,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,eAAC,CAAC,AACA,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAYD,iBAAiB,eAAC,CAAC,AACf,KAAK,CAAE,GAAG,CACV,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,UAAU,AAC/B,CAAC,AAED,CAAC,eAAC,CAAC,AACC,MAAM,CAAE,KAAK,CAAC,CAAC,CACf,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,IAAI,AAC5B,CAAC,AAED,gBAAC,CAAG,IAAI,eAAC,CAAC,AACN,WAAW,CAAE,KAAK,CAClB,WAAW,CAAE,WAAW,CAAC,CAAC,UAAU,CACpC,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,OAAO,AAClB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,gBAAC,CAAG,mBAAI,CAAC,AACL,SAAS,CAAE,KAAK,AACpB,CAAC,AACL,CAAC,AAED,gBAAC,MAAM,CAAC,CAAC,eAAC,CAAC,AACP,KAAK,CAAE,OAAO,AAClB,CAAC\"}"
};

const Contact = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$n);

	return `

	<div class="svelte-1cjafcw">
	    <h3 class="svelte-1cjafcw">
	        Contact
	    </h3>
	    <div class="social-container svelte-1cjafcw">
	        <a href="https://www.github.com/Jrope21" aria-label="link to Joshua Roper's GitHub account" target="blank" class="svelte-1cjafcw"><i class="fab fa-github svelte-1cjafcw"><span class="svelte-1cjafcw">www.github.com/Jrope21</span></i></a>
	        <a href="https://www.linkedin.com/in/JR-dev" aria-label="link to Joshua Roper's LinkedIn account" target="blank" class="svelte-1cjafcw"><i class="fab fa-linkedin svelte-1cjafcw"><span class="svelte-1cjafcw">www.linkedin.com/in/JR-dev</span></i></a>
	        <a href="mailto:joshua.micah.roper@gmail.com" aria-label="link to send Joshua Roper an email" target="blank" class="svelte-1cjafcw"><i class="fas fa-envelope svelte-1cjafcw"><span class="svelte-1cjafcw">Joshua.Micah.Roper@gmail.com</span></i></a>
	    </div>
	</div>`;
});

/* src/routes/about.svelte generated by Svelte v3.9.1 */

const css$o = {
	code: "section.svelte-haz9qt{display:flex;flex-direction:column;align-items:center;padding:5% 0 0% 0;position:relative;color:gray;margin-bottom:50px}section.svelte-haz9qt::before{content:'';width:100%;height:100%;position:absolute;top:0;z-index:-1}@media screen and (min-width: 40em){section.svelte-haz9qt{margin-bottom:80px}}@media screen and (min-width: 64em){section.svelte-haz9qt{flex:1}}.content-container.svelte-haz9qt{width:90%;margin-bottom:40rem;max-width:900px}@media screen and (min-width: 40em){.content-container.svelte-haz9qt{width:75%;margin-bottom:50rem;margin-left:100rem}}@media screen and (min-width: 64em){.content-container.svelte-haz9qt{width:100%}}",
	map: "{\"version\":3,\"file\":\"about.svelte\",\"sources\":[\"about.svelte\"],\"sourcesContent\":[\"<script>\\nimport { onMount } from 'svelte'\\nimport { fade, fly } from 'svelte/transition';\\n\\nimport PageTitle from '../components/about/PageTitle.svelte';\\n\\nimport AboutMe from '../components/about/AboutMe.svelte';\\nimport SkillsSection from '../components/about/Skills.svelte';\\nimport Contact from '../components/about/Contact.svelte';\\n\\n    // let x = .25;\\n    // let sections = [];\\n\\n    // onMount(()=>{\\n    //     for(let i = 0; i < sections.length; i++){\\n    //         let fadeInOrder = () => {\\n                \\n    //             sections[i].style.animation = `${'1'}s ease-in ${x}s 1 fadeInLeft forwards`;\\n    //             x += .35;\\n\\n    //         }\\n    //         fadeInOrder();\\n    //     }\\n    // })\\n</script>\\n\\n<style>\\n\\n section {\\n    display: flex;\\n    flex-direction: column;\\n    align-items: center;\\n    padding: 5% 0 0% 0;\\n    position: relative;\\n    color: gray;\\n    margin-bottom: 50px;\\n}\\n\\n\\tsection::before {\\n        content: '';\\n        width: 100%;\\n        height: 100%;\\n        position: absolute;\\n        top: 0;\\n        z-index: -1;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        section{\\n            margin-bottom: 80px;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em) {\\n        section{\\n            flex: 1;\\n        }\\n    }\\n\\n\\t.content-container {\\n        width: 90%;\\n        margin-bottom: 40rem;\\t\\t\\n        /* opacity: 0; */\\n        max-width: 900px;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        .content-container {\\n            width: 75%;\\n            margin-bottom: 50rem;\\n            margin-left: 100rem;\\n        }\\n    }\\n    @media screen and (min-width: 64em) {\\n        .content-container {\\n            width: 100%;\\n        }\\n    }\\n    \\n</style>\\n\\n<svelte:head>\\n\\t<title>About | Front End Developer - Joshua Roper</title>\\n</svelte:head>\\n\\n<div \\n    in:fly=\\\"{{ x: -80, duration: 500, delay: 200, }}\\\"\\n>\\n    <PageTitle title={'Joshua Roper'} />\\n</div>\\n\\n<section>\\n    <div class=\\\"container\\\">\\n        <div \\n            in:fly=\\\"{{ x: -40, duration: 500, delay: 450, }}\\\"\\n            class=\\\"content-container\\\"\\n         >\\n            <AboutMe />\\n        </div> \\n        <div \\n            in:fly=\\\"{{ x: -40, duration: 500, delay: 650, }}\\\"\\n            class=\\\"content-container\\\"\\n        >\\n            <SkillsSection />\\n        </div>\\n        <div \\n            in:fly=\\\"{{ x: -40, duration: 500, delay: 900, }}\\\"\\n            class=\\\"content-container\\\"\\n        >\\n            <Contact />\\n        </div>\\n    </div>\\n</section>\"],\"names\":[],\"mappings\":\"AA4BC,OAAO,cAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,EAAE,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAClB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,IAAI,AACvB,CAAC,AAEA,qBAAO,QAAQ,AAAC,CAAC,AACV,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,EAAE,AACf,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,qBAAO,CAAC,AACJ,aAAa,CAAE,IAAI,AACvB,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,qBAAO,CAAC,AACJ,IAAI,CAAE,CAAC,AACX,CAAC,AACL,CAAC,AAEJ,kBAAkB,cAAC,CAAC,AACb,KAAK,CAAE,GAAG,CACV,aAAa,CAAE,KAAK,CAEpB,SAAS,CAAE,KAAK,AACpB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,kBAAkB,cAAC,CAAC,AAChB,KAAK,CAAE,GAAG,CACV,aAAa,CAAE,KAAK,CACpB,WAAW,CAAE,MAAM,AACvB,CAAC,AACL,CAAC,AACD,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,kBAAkB,cAAC,CAAC,AAChB,KAAK,CAAE,IAAI,AACf,CAAC,AACL,CAAC\"}"
};

const About = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$o);

	return `${($$result.head += `<title>About | Front End Developer - Joshua Roper</title>`, "")}

	<div>
	    ${validate_component(PageTitle$1, 'PageTitle').$$render($$result, { title: 'Joshua Roper' }, {}, {})}
	</div>

	<section class="svelte-haz9qt">
	    <div class="container">
	        <div class="content-container svelte-haz9qt">
	            ${validate_component(AboutMe, 'AboutMe').$$render($$result, {}, {}, {})}
	        </div> 
	        <div class="content-container svelte-haz9qt">
	            ${validate_component(Skills, 'SkillsSection').$$render($$result, {}, {}, {})}
	        </div>
	        <div class="content-container svelte-haz9qt">
	            ${validate_component(Contact, 'Contact').$$render($$result, {}, {}, {})}
	        </div>
	    </div>
	</section>`;
});

/* src/routes/blog/index.svelte generated by Svelte v3.9.1 */

const css$p = {
	code: "ul.svelte-1frg2tf{margin:0 0 1em 0;line-height:1.5}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n\\texport function preload({ params, query }) {\\n\\t\\treturn this.fetch(`blog.json`).then(r => r.json()).then(posts => {\\n\\t\\t\\treturn { posts };\\n\\t\\t});\\n\\t}\\n</script>\\n\\n<script>\\n\\texport let posts;\\n</script>\\n\\n<style>\\n\\tul {\\n\\t\\tmargin: 0 0 1em 0;\\n\\t\\tline-height: 1.5;\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>Blog</title>\\n</svelte:head>\\n\\n<h1>Recent posts</h1>\\n\\n<ul>\\n\\t{#each posts as post}\\n\\t\\t<!-- we're using the non-standard `rel=prefetch` attribute to\\n\\t\\t\\t\\ttell Sapper to load the data for the page as soon as\\n\\t\\t\\t\\tthe user hovers over the link or taps it, instead of\\n\\t\\t\\t\\twaiting for the 'click' event -->\\n\\t\\t<li><a rel='prefetch' href='blog/{post.slug}'>{post.title}</a></li>\\n\\t{/each}\\n</ul>\"],\"names\":[],\"mappings\":\"AAaC,EAAE,eAAC,CAAC,AACH,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACjB,WAAW,CAAE,GAAG,AACjB,CAAC\"}"
};

function preload({ params, query }) {
	return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
		return { posts };
	});
}

const Index$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { posts } = $$props;

	if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0) $$bindings.posts(posts);

	$$result.css.add(css$p);

	return `${($$result.head += `<title>Blog</title>`, "")}

	<h1>Recent posts</h1>

	<ul class="svelte-1frg2tf">
		${each(posts, (post) => `
			<li><a rel="prefetch" href="blog/${escape(post.slug)}">${escape(post.title)}</a></li>`)}
	</ul>`;
});

/* src/routes/blog/[slug].svelte generated by Svelte v3.9.1 */

const css$q = {
	code: ".content.svelte-gnxal1 h2{font-size:1.4em;font-weight:500}.content.svelte-gnxal1 pre{background-color:#f9f9f9;box-shadow:inset 1px 1px 5px rgba(0,0,0,0.05);padding:0.5em;border-radius:2px;overflow-x:auto}.content.svelte-gnxal1 pre code{background-color:transparent;padding:0}.content.svelte-gnxal1 ul{line-height:1.5}.content.svelte-gnxal1 li{margin:0 0 0.5em 0}",
	map: "{\"version\":3,\"file\":\"[slug].svelte\",\"sources\":[\"[slug].svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n\\texport async function preload({ params, query }) {\\n\\t\\t// the `slug` parameter is available because\\n\\t\\t// this file is called [slug].svelte\\n\\t\\tconst res = await this.fetch(`blog/${params.slug}.json`);\\n\\t\\tconst data = await res.json();\\n\\n\\t\\tif (res.status === 200) {\\n\\t\\t\\treturn { post: data };\\n\\t\\t} else {\\n\\t\\t\\tthis.error(res.status, data.message);\\n\\t\\t}\\n\\t}\\n</script>\\n\\n<script>\\n\\texport let post;\\n</script>\\n\\n<style>\\n\\t/*\\n\\t\\tBy default, CSS is locally scoped to the component,\\n\\t\\tand any unused styles are dead-code-eliminated.\\n\\t\\tIn this page, Svelte can't know which elements are\\n\\t\\tgoing to appear inside the {{{post.html}}} block,\\n\\t\\tso we have to use the :global(...) modifier to target\\n\\t\\tall elements inside .content\\n\\t*/\\n\\t.content :global(h2) {\\n\\t\\tfont-size: 1.4em;\\n\\t\\tfont-weight: 500;\\n\\t}\\n\\n\\t.content :global(pre) {\\n\\t\\tbackground-color: #f9f9f9;\\n\\t\\tbox-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);\\n\\t\\tpadding: 0.5em;\\n\\t\\tborder-radius: 2px;\\n\\t\\toverflow-x: auto;\\n\\t}\\n\\n\\t.content :global(pre) :global(code) {\\n\\t\\tbackground-color: transparent;\\n\\t\\tpadding: 0;\\n\\t}\\n\\n\\t.content :global(ul) {\\n\\t\\tline-height: 1.5;\\n\\t}\\n\\n\\t.content :global(li) {\\n\\t\\tmargin: 0 0 0.5em 0;\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>{post.title}</title>\\n</svelte:head>\\n\\n<h1>{post.title}</h1>\\n\\n<div class='content'>\\n\\t{@html post.html}\\n</div>\\n\"],\"names\":[],\"mappings\":\"AA4BC,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,GAAG,AAAE,CAAC,AACtB,gBAAgB,CAAE,OAAO,CACzB,UAAU,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAC9C,OAAO,CAAE,KAAK,CACd,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,GAAG,AAAC,CAAC,AAAQ,IAAI,AAAE,CAAC,AACpC,gBAAgB,CAAE,WAAW,CAC7B,OAAO,CAAE,CAAC,AACX,CAAC,AAED,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC\"}"
};

async function preload$1({ params, query }) {
	// the `slug` parameter is available because
	// this file is called [slug].svelte
	const res = await this.fetch(`blog/${params.slug}.json`);
	const data = await res.json();

	if (res.status === 200) {
		return { post: data };
	} else {
		this.error(res.status, data.message);
	}
}

const Slug = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { post } = $$props;

	if ($$props.post === void 0 && $$bindings.post && post !== void 0) $$bindings.post(post);

	$$result.css.add(css$q);

	return `${($$result.head += `<title>${escape(post.title)}</title>`, "")}

	<h1>${escape(post.title)}</h1>

	<div class="content svelte-gnxal1">
		${post.html}
	</div>`;
});

/* src/components/navigation/Hamburger.svelte generated by Svelte v3.9.1 */

const css$r = {
	code: "@keyframes svelte-1l6vpfi-leaveScreen{100%{transform:translateX(9999px)\n  }}#toggle.svelte-1l6vpfi{display:none}.hamburger.svelte-1l6vpfi{display:flex;flex-direction:column;justify-content:space-evenly;align-items:flex-end;border-bottom:2.2px solid black;cursor:pointer;width:24px;height:22px;transition:width .45s cubic-bezier(0.85, 0.08, 0.08, 0.99)}.hamburger.svelte-1l6vpfi::before{content:'';display:block;border-bottom:2.5px solid black;width:18px;transition:width .45s cubic-bezier(0.85, 0.08, 0.08, 0.99)}.hamburger.svelte-1l6vpfi::after{content:'';display:block;border-bottom:2.2px solid black;width:32px}.background.svelte-1l6vpfi{background:rgba(0, 0, 0, 0.319);opacity:0;width:100vw;height:100vh;position:fixed;bottom:0;left:0;z-index:1;transition:opacity .35s ease-in;animation:.01s ease-in .35s 1 svelte-1l6vpfi-leaveScreen forwards}#toggle:hover+.background+label.svelte-1l6vpfi>.hamburger.svelte-1l6vpfi{width:32px}#toggle:checked+.background+label.svelte-1l6vpfi>.hamburger.svelte-1l6vpfi{width:32px}#toggle:hover+.background+label.svelte-1l6vpfi>.hamburger.svelte-1l6vpfi::before{width:32px}#toggle:checked+.background+label.svelte-1l6vpfi>.hamburger.svelte-1l6vpfi::before{width:32px}#toggle:checked+.background.svelte-1l6vpfi{opacity:1;z-index:1;animation:unset}@media screen and (min-width: 64em){label.svelte-1l6vpfi{display:none}}.show-for-sr.svelte-1l6vpfi{border:0;clip:rect(1px, 1px, 1px, 1px);clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;word-wrap:normal !important}",
	map: "{\"version\":3,\"file\":\"Hamburger.svelte\",\"sources\":[\"Hamburger.svelte\"],\"sourcesContent\":[\"<script>\\nimport { onMount, afterUpdate, tick  } from 'svelte';\\n\\nexport let toggle;\\nexport let hamburger;\\n</script>\\n\\n<style>\\n\\n@keyframes leaveScreen {\\n  100%{\\n    transform: translateX(9999px)\\n  }\\n}\\n\\n#toggle {\\n  display: none;\\n}\\n\\n.hamburger {\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: space-evenly;\\n  align-items: flex-end;\\n  border-bottom: 2.2px solid black;\\n  cursor: pointer;\\n  width: 24px;\\n  height: 22px;\\n  transition: width .45s cubic-bezier(0.85, 0.08, 0.08, 0.99);\\n}\\n\\n.hamburger::before {\\n  content: '';\\n  display: block;\\n  border-bottom: 2.5px solid black;\\n  width: 18px;\\n  transition: width .45s cubic-bezier(0.85, 0.08, 0.08, 0.99);\\n}\\n\\n.hamburger::after {\\n  content: '';\\n  display: block;\\n  border-bottom: 2.2px solid black;\\n  width: 32px;\\n}\\n\\n.background {\\n  background: rgba(0, 0, 0, 0.319);\\n  opacity: 0;\\n  width: 100vw;\\n  height: 100vh;\\n  position: fixed;\\n  bottom: 0;\\n  left: 0;\\n  z-index: 1;\\n  transition: opacity .35s ease-in;\\n  animation: .01s ease-in .35s 1 leaveScreen forwards;\\n}\\n\\n#toggle:hover + .background + label > .hamburger {\\n  width: 32px;\\n}\\n\\n#toggle:checked + .background + label > .hamburger {\\n  width: 32px;\\n}\\n\\n#toggle:hover + .background + label > .hamburger::before {\\n  width: 32px;\\n}\\n\\n#toggle:checked + .background + label > .hamburger::before {\\n  width: 32px;\\n}\\n\\n#toggle:checked + .background {\\n  opacity: 1;\\n  z-index: 1;\\n  animation: unset;\\n}\\n\\n@media screen and (min-width: 64em){\\n  label {\\n    display: none;\\n  }\\n}\\n\\n.show-for-sr {\\n  border: 0;\\n  clip: rect(1px, 1px, 1px, 1px);\\n  clip-path: inset(50%);\\n  height: 1px;\\n  margin: -1px;\\n  overflow: hidden;\\n  padding: 0;\\n  position: absolute;\\n  width: 1px;\\n  word-wrap: normal !important;\\n}\\n\\n</style>\\n\\n<input id=\\\"toggle\\\" type=\\\"checkbox\\\" class=\\\"hide subnav-toggle hide-for-xlg\\\">\\n<div class=\\\"background\\\" on:click></div>\\n<label id=\\\"nav-label\\\" bind:this={hamburger} for=\\\"toggle\\\" class=\\\"hide-for-xlg\\\">\\n    <span class=\\\"show-for-sr\\\">Navigation</span>\\n    <span class=\\\"hamburger\\\" title=\\\"Navigation\\\"> </span>\\n</label>\"],\"names\":[],\"mappings\":\"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\"}"
};

const Hamburger = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { toggle, hamburger } = $$props;

	if ($$props.toggle === void 0 && $$bindings.toggle && toggle !== void 0) $$bindings.toggle(toggle);
	if ($$props.hamburger === void 0 && $$bindings.hamburger && hamburger !== void 0) $$bindings.hamburger(hamburger);

	$$result.css.add(css$r);

	return `<input id="toggle" type="checkbox" class="hide subnav-toggle hide-for-xlg svelte-1l6vpfi">
	<div class="background svelte-1l6vpfi"></div>
	<label id="nav-label" for="toggle" class="hide-for-xlg svelte-1l6vpfi"${add_attribute("this", hamburger, 1)}>
	    <span class="show-for-sr svelte-1l6vpfi">Navigation</span>
	    <span class="hamburger svelte-1l6vpfi" title="Navigation"> </span>
	</label>`;
});

/* src/components/modals/ModalTemplate.svelte generated by Svelte v3.9.1 */

const css$s = {
	code: ".modal-container.svelte-glpclt{position:fixed;top:0;left:0;width:100%;height:100%;z-index:50}.modal-background.svelte-glpclt{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;background:rgba(0,0,0,0.3)}.container.svelte-glpclt{width:100%;height:100%}.modal.svelte-glpclt{width:calc(100vw - 4em);width:80%;max-width:650px;max-height:90vh;overflow:auto;border-radius:10rem;background:white;z-index:50}@media screen and (min-width: 40em){.modal.svelte-glpclt{max-height:450px;max-width:600px;width:85%}}@media screen and (min-width: 64em){.modal.svelte-glpclt{width:70%;max-width:750px}}",
	map: "{\"version\":3,\"file\":\"ModalTemplate.svelte\",\"sources\":[\"ModalTemplate.svelte\"],\"sourcesContent\":[\"<script>\\n    import { createEventDispatcher } from 'svelte';\\n    import { fade, fly } from 'svelte/transition';\\n\\n    export let showModal\\n    \\n    const dispatch = createEventDispatcher();\\n    \\n</script>\\n\\n<style>\\n\\n    .modal-container{\\n        position: fixed;\\n\\t\\ttop: 0;\\n\\t\\tleft: 0;\\n\\t\\twidth: 100%;\\n        height: 100%;\\n        z-index: 50;\\n    }\\n\\t.modal-background {\\n\\t\\tposition: fixed;\\n\\t\\ttop: 0;\\n\\t\\tleft: 0;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\tz-index: -1;\\n        background: rgba(0,0,0,0.3);\\n\\t}\\n\\n\\t.container{\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t}\\n\\n\\t.modal {\\n        width: calc(100vw - 4em);\\n        width: 80%;\\n\\t\\tmax-width: 650px;\\n\\t\\tmax-height: 90vh;\\n\\t\\toverflow: auto;\\n\\t\\tborder-radius: 10rem;\\n        background: white;\\n        z-index: 50;\\n    }\\n    \\n\\t@media screen and (min-width: 40em){\\n\\t\\t.modal {\\n\\t\\t\\tmax-height: 450px;\\n\\t\\t\\tmax-width: 600px;\\n\\t\\t\\twidth: 85%;\\n\\t\\t}\\n    }\\n\\n\\t@media screen and (min-width: 64em){\\n\\t\\t.modal {\\n\\t\\t\\twidth: 70%;\\n\\t\\t\\tmax-width: 750px;\\n\\t\\t}\\n    }\\n    \\n\\tbutton {\\n\\t\\tdisplay: block;\\n    }   \\n    \\n</style>\\n\\n<div class='center-all modal-container {showModal ? 'show-modal' : ''}' in:fade out:fade >\\n    <div class=\\\"modal-background\\\" on:click></div>\\n\\t<div class='modal' in:fly=\\\"{{ y: -20, duration: 450, delay: 200, }}\\\" out:fly=\\\"{{ y: -20, duration: 450 }}\\\">\\n\\t\\t<slot name='header'></slot>\\n\\t\\t<slot></slot>\\n\\t</div>\\n</div>\"],\"names\":[],\"mappings\":\"AAYI,8BAAgB,CAAC,AACb,QAAQ,CAAE,KAAK,CACrB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,IAAI,CACL,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,EAAE,AACf,CAAC,AACJ,iBAAiB,cAAC,CAAC,AAClB,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,EAAE,CACL,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,AAClC,CAAC,AAED,wBAAU,CAAC,AACV,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACb,CAAC,AAED,MAAM,cAAC,CAAC,AACD,KAAK,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CACxB,KAAK,CAAE,GAAG,CAChB,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,IAAI,CAChB,QAAQ,CAAE,IAAI,CACd,aAAa,CAAE,KAAK,CACd,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,EAAE,AACf,CAAC,AAEJ,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AACnC,MAAM,cAAC,CAAC,AACP,UAAU,CAAE,KAAK,CACjB,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,GAAG,AACX,CAAC,AACC,CAAC,AAEJ,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AACnC,MAAM,cAAC,CAAC,AACP,KAAK,CAAE,GAAG,CACV,SAAS,CAAE,KAAK,AACjB,CAAC,AACC,CAAC\"}"
};

const ModalTemplate = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	

    let { showModal } = $$props;

	if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0) $$bindings.showModal(showModal);

	$$result.css.add(css$s);

	return `<div class="center-all modal-container ${escape(showModal ? 'show-modal' : '')} svelte-glpclt">
	    <div class="modal-background svelte-glpclt"></div>
		<div class="modal svelte-glpclt">
			${$$slots.header ? $$slots.header({}) : ``}
			${$$slots.default ? $$slots.default({}) : ``}
		</div>
	</div>`;
});

/* src/components/loaders/BoxLoader.svelte generated by Svelte v3.9.1 */

const css$t = {
	code: "#loader.svelte-12rrru0{position:absolute;top:50%;left:50%;margin-top:-2.7em;margin-left:-2.7em;width:5.4em;height:5.4em}#hill.svelte-12rrru0{position:absolute;width:7.1em;height:7.1em;top:1.7em;left:1.7em;background-color:transparent;border-left:.25em solid lightgray;transform:rotate(45deg)}#hill.svelte-12rrru0:after{content:'';position:absolute;width:7.1em;height:7.1em;left:0}#box.svelte-12rrru0{position:absolute;left:0;bottom:-.1em;width:1em;height:1em;background-color:transparent;border:.25em solid lightgray;border-radius:15%;transform:translate(0, -1em) rotate(-45deg);animation:svelte-12rrru0-push 2.5s cubic-bezier(.79, 0, .47, .97) infinite}@keyframes svelte-12rrru0-push{0%{transform:translate(0, -1em) rotate(-45deg)}5%{transform:translate(0, -1em) rotate(-50deg)}20%{transform:translate(1em, -2em) rotate(47deg)}25%{transform:translate(1em, -2em) rotate(45deg)}30%{transform:translate(1em, -2em) rotate(40deg)}45%{transform:translate(2em, -3em) rotate(137deg)}50%{transform:translate(2em, -3em) rotate(135deg)}55%{transform:translate(2em, -3em) rotate(130deg)}70%{transform:translate(3em, -4em) rotate(217deg)}75%{transform:translate(3em, -4em) rotate(220deg)}100%{transform:translate(0, -1em) rotate(-225deg)}}",
	map: "{\"version\":3,\"file\":\"BoxLoader.svelte\",\"sources\":[\"BoxLoader.svelte\"],\"sourcesContent\":[\"<script>\\nimport { fade, fly } from 'svelte/transition';\\n\\n</script>\\n\\n<style>\\n#loader {\\n  position: absolute;\\n  top: 50%;\\n  left: 50%;\\n  margin-top: -2.7em;\\n  margin-left: -2.7em;\\n  width: 5.4em;\\n  height: 5.4em;\\n}\\n\\n#hill {\\n  position: absolute;\\n  width: 7.1em;\\n  height: 7.1em;\\n  top: 1.7em;\\n  left: 1.7em;\\n  background-color: transparent;\\n  border-left: .25em solid lightgray;\\n  transform: rotate(45deg);\\n}\\n\\n#hill:after {\\n  content: '';\\n  position: absolute;\\n  width: 7.1em;\\n  height: 7.1em;\\n  left: 0;\\n}\\n\\n#box {\\n  position: absolute;\\n  left: 0;\\n  bottom: -.1em;\\n  width: 1em;\\n  height: 1em;\\n  background-color: transparent;\\n  border: .25em solid lightgray;\\n  border-radius: 15%;\\n  transform: translate(0, -1em) rotate(-45deg);\\n  animation: push 2.5s cubic-bezier(.79, 0, .47, .97) infinite;\\n}\\n\\n@keyframes push {\\n  0% {\\n    transform: translate(0, -1em) rotate(-45deg);\\n  }\\n  5% {\\n    transform: translate(0, -1em) rotate(-50deg);\\n  }\\n  20% {\\n    transform: translate(1em, -2em) rotate(47deg);\\n  }\\n  25% {\\n    transform: translate(1em, -2em) rotate(45deg);\\n  }\\n  30% {\\n    transform: translate(1em, -2em) rotate(40deg);\\n  }\\n  45% {\\n    transform: translate(2em, -3em) rotate(137deg);\\n  }\\n  50% {\\n    transform: translate(2em, -3em) rotate(135deg);\\n  }\\n  55% {\\n    transform: translate(2em, -3em) rotate(130deg);\\n  }\\n  70% {\\n    transform: translate(3em, -4em) rotate(217deg);\\n  }\\n  75% {\\n    transform: translate(3em, -4em) rotate(220deg);\\n  }\\n  100% {\\n    transform: translate(0, -1em) rotate(-225deg);\\n  }\\n}\\n</style>\\n\\n<div id=\\\"loader\\\" in:fade out:fade>\\n  <div id=\\\"box\\\"></div>\\n  <div id=\\\"hill\\\"></div>\\n</div>\"],\"names\":[],\"mappings\":\"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\"}"
};

const BoxLoader = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$t);

	return `<div id="loader" class="svelte-12rrru0">
	  <div id="box" class="svelte-12rrru0"></div>
	  <div id="hill" class="svelte-12rrru0"></div>
	</div>`;
});

/* src/components/modals/ContactModal.svelte generated by Svelte v3.9.1 */

const css$u = {
	code: ".text-container.svelte-7h4bgy h2.svelte-7h4bgy{font-size:30rem;color:#808080}@media screen and (min-width: 64em){.text-container.svelte-7h4bgy h2.svelte-7h4bgy{font-size:36rem}}.text-container.svelte-7h4bgy h2.svelte-7h4bgy::after{content:'';display:block;height:7px;margin:5rem 0px 18rem 0px;background:lightgray}@media screen and (min-width: 40em){h2.svelte-7h4bgy::after{width:250px}}p.svelte-7h4bgy{margin:6rem 0rem 10rem 0rem;font-family:'Open Sans', sans-serif;font-weight:300;font-size:13rem;color:#58595b\n    }@media screen and (min-width: 64em){p.svelte-7h4bgy{font-size:16rem\n        }}div.form-container.svelte-7h4bgy{box-sizing:border-box;color:gray;width:100%;border-radius:4px;padding:15rem 20rem 40rem 20rem;border:1px solid gray;box-shadow:5px 5px 5px lightgray}@media screen and (min-width: 40em){div.form-container.svelte-7h4bgy{padding:30rem 20rem 40rem 20rem}}@media screen and (min-width: 64em){div.form-container.svelte-7h4bgy{padding:40rem 30rem 50rem 30rem}}div.flex-container.svelte-7h4bgy{display:flex;flex-direction:column}@media screen and (min-width: 40em){div.flex-container.svelte-7h4bgy{flex-direction:row}}div.text-container.svelte-7h4bgy{position:relative}@media screen and (min-width: 40em){div.text-container.svelte-7h4bgy{top:-20px;padding-right:30rem}}div.svelte-7h4bgy{flex:55%}form.svelte-7h4bgy{display:flex;flex-direction:column;flex:50%;padding-left:auto}label.svelte-7h4bgy{display:flex;flex-direction:column;margin:4rem 0px}span.svelte-7h4bgy{font-size:13rem;margin-bottom:5rem;font-weight:500}@media screen and (min-width: 64em){span.svelte-7h4bgy{font-size:14rem}}input[type=\"submit\"].svelte-7h4bgy{width:50%;min-width:96px;margin-top:12rem;padding:6rem;font-size:13rem;box-shadow:1px 1px 3px lightgrey;font-style:italic;background:rgba(88, 89, 91, 0.1);color:#58595B;font-weight:700;transition:all .3s ease-in;cursor:pointer}input[type=\"submit\"].svelte-7h4bgy:hover{position:relative;transform:translateY(-1px);box-shadow:2px 2px 3px lightgrey}@media screen and (min-width: 40em){input[type=\"submit\"].svelte-7h4bgy{max-width:unset;padding:7rem 15rem 7rem 15rem}}@media screen and (min-width: 64em){input[type=\"submit\"].svelte-7h4bgy{font-size:13rem;box-shadow:1;width:fit-content}}div.contact-row.svelte-7h4bgy{display:flex;justify-content:space-between}input.svelte-7h4bgy,textarea.svelte-7h4bgy{border:1px solid lightgray;border-radius:2px;font-size:16rem;padding:3rem;box-shadow:.3px .3px .3px gray}.success-message.svelte-7h4bgy{font-size:50rem;color:#58595b;text-transform:uppercase;position:absolute;top:50%;transform:translate(-50%, -50%);left:50%}.gform.svelte-7h4bgy,.text-container.svelte-7h4bgy,.success-message.svelte-7h4bgy{transition:.35s opacity ease}.hide-content.svelte-7h4bgy{opacity:0}",
	map: "{\"version\":3,\"file\":\"ContactModal.svelte\",\"sources\":[\"ContactModal.svelte\"],\"sourcesContent\":[\"<script>\\n    import { fade, fly } from 'svelte/transition';\\n\\n\\timport ModalTemplate from './ModalTemplate.svelte';\\n    import BoxLoader from '../loaders/BoxLoader.svelte';\\n\\n    export let showModal;\\n\\n    let hideModal = false;\\n    let fieldInputs = [];\\n\\n    let formState = {\\n        submittingForm: false,\\n        formSuccess: false,\\n        formError: false,\\n        hideFields: false\\n    }\\n\\n    let defaultFormState = formState;\\n\\n    function resetForm(wait){\\n        setTimeout(() => {            \\n            const stateObj = Object.entries(formState);\\n\\n            for(const [stateKey, stateValue] of stateObj){\\n                formState[stateKey] = false;\\n            }\\n\\n            fieldInputs.forEach((input) => {\\n                input.value = '';\\n            })\\n        }, wait)\\n    }\\n    \\n    async function handleSubmit(e){\\n        formState.submittingForm = true;\\n        formState.hideFields = true\\n        formState.formSuccess = false;\\n        const formFieldNames = ['name', 'email', 'message']; // TODO - generate field names based on inputs\\n        const formTextObj = buildFormSubmissionTextObj(e.target, formFieldNames);\\n\\n        const API_URL = `https://script.google.com/macros/s/AKfycbyfIRXEeqnLPVq4s2hG_b35lmcm2FCn768QWC9Wfg/exec`;\\n        const settings = { \\n            method: 'POST',\\n            body: formTextObj,\\n        }\\n\\n        try {\\n            const response = await fetch(API_URL, settings);\\n            const data = await response.json();\\n            formState.submittingForm = false;\\n            formState.formSuccess = true;\\n\\n            resetForm(1600);       \\n        } catch (e) {\\n            formState.submittingForm = false;\\n            formState.formError = true;\\n\\n            resetForm(1600);       \\n        }\\n    }\\n\\n    function buildFormSubmissionTextObj(formEventTarget, formFieldNames){\\n       let formData = new FormData();\\n       \\n        formFieldNames.forEach(fieldName => {\\n           formData.append(`${fieldName}`, `${formEventTarget[fieldName].value}`);\\n        })\\n\\n        return formData\\n    }\\n\\n</script>\\n\\n<style>\\n\\n   .text-container h2{\\n        font-size: 30rem;\\n        color: #808080;\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        .text-container h2{\\n            font-size: 36rem;   \\n        }\\n    }\\n    .text-container h2::after{\\n        content: '';\\n        display: block;\\n        height: 7px;\\n        margin: 5rem 0px 18rem 0px;\\n        background: lightgray;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        h2::after {\\n            width: 250px;\\n        }\\n    }\\n\\n    p{\\n        margin: 6rem 0rem 10rem 0rem;\\n        font-family: 'Open Sans', sans-serif;\\n        font-weight: 300;\\n        font-size: 13rem;\\n        color: #58595b\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        p {\\n            font-size: 16rem\\n        }\\n    }\\n\\n    div.form-container{\\n        box-sizing: border-box;\\n        color: gray;\\n        width: 100%;\\n        border-radius: 4px;\\n        padding: 15rem 20rem 40rem 20rem;\\n        border: 1px solid gray;\\n        box-shadow: 5px 5px 5px lightgray;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        div.form-container {\\n            padding: 30rem 20rem 40rem 20rem;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        div.form-container {\\n            padding: 40rem 30rem 50rem 30rem;\\n        }\\n    }\\n\\n    div.flex-container{\\n        display: flex;\\n        flex-direction: column;\\n    } \\n\\n    @media screen and (min-width: 40em){\\n        div.flex-container {\\n            flex-direction: row;\\n        }\\n    }\\n\\n    div.text-container {\\n        position: relative;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        div.text-container {\\n            top: -20px;\\n            padding-right: 30rem;\\n        }\\n    }\\n\\n    div{\\n        flex: 55%;\\n    }\\n\\n    form{\\n        display: flex;\\n        flex-direction: column;\\n        flex: 50%;\\n        padding-left: auto;\\n    }\\n    label{\\n        display: flex;\\n        flex-direction: column;\\n        margin: 4rem 0px;\\n    }\\n    span{\\n        font-size: 13rem;\\n        margin-bottom: 5rem;\\n        font-weight: 500;\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        span {\\n            font-size: 14rem;\\n        }\\n    }\\n\\n    input[type=\\\"submit\\\"]{\\n        width: 50%;\\n        min-width: 96px;\\n        margin-top: 12rem;\\n        padding: 6rem;\\n        font-size: 13rem;\\n        box-shadow: 1px 1px 3px lightgrey;\\n        font-style: italic;\\n        background: rgba(88, 89, 91, 0.1);\\n        color: #58595B;\\n        font-weight: 700;\\n        transition: all .3s ease-in;\\n        cursor: pointer;\\n    }\\n\\n    input[type=\\\"submit\\\"]:hover {\\n        position: relative;\\n        transform: translateY(-1px);\\n        box-shadow: 2px 2px 3px lightgrey;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        input[type=\\\"submit\\\"]{\\n            max-width: unset;\\n            padding: 7rem 15rem 7rem 15rem;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        input[type=\\\"submit\\\"]{\\n            font-size: 13rem;\\n            box-shadow: 1;\\n            width: fit-content;\\n        }\\n    }\\n\\n    div.contact-row{\\n        display: flex;\\n        justify-content: space-between;\\n    }\\n    input, textarea{\\n        border: 1px solid lightgray;\\n        border-radius: 2px;\\n        font-size: 16rem;\\n        padding: 3rem;\\n        box-shadow: .3px .3px .3px gray;\\n    }\\n\\n    .success-message {\\n        font-size: 50rem;\\n        color: #58595b;\\n        text-transform: uppercase;\\n        position: absolute;\\n        top: 50%;\\n        transform: translate(-50%, -50%);\\n        left: 50%;\\n    }\\n\\n    .gform, .text-container, .success-message {\\n        transition: .35s opacity ease;\\n    }\\n    .hide-content{\\n        opacity: 0;\\n    }\\n</style>\\n\\n{#if showModal && hideModal === false}\\n\\t<ModalTemplate showModal={showModal} on:click>\\n        <div class=\\\"form-container\\\">\\n            <div class=\\\"flex-container\\\">\\n                    <div class=\\\"text-container {formState.hideFields ? 'hide-content' : ''} {formState.hideFields ? 'hide-content' : ''}\\\">\\n                        <h2>Get In Touch</h2>\\n                        <p>\\n                            Hi There! I’m Josh, \\n                            I bring projects to life by innovating across every aspect of the customer journey. \\n                            Send me a message if you are looking to hire a developer, collaborate on a project, or have a potential business opportunity.\\n                        </p>\\n                    </div>\\n                    <form \\n                        class=\\\"gform {formState.hideFields ? 'hide-content' : ''}\\n                        {formState.formSuccess ? 'hide-content' : ''}\\\"\\n                        on:submit|preventDefault={handleSubmit}  \\n                    >\\n                        <label> <span>Name</span>\\n                            <input bind:this={fieldInputs[0]} name=\\\"name\\\" type=\\\"text\\\">\\n                        </label>\\n                        <label> <span>Email</span>\\n                            <input bind:this={fieldInputs[1]} required name=\\\"email\\\" type=\\\"email\\\">\\n                        </label>\\n                        <label> <span>Message</span>\\n                            <textarea bind:this={fieldInputs[2]} name=\\\"message\\\" rows=\\\"6\\\" type=\\\"textarea\\\"></textarea>\\n                        </label>\\n                        <input type=\\\"submit\\\" value=\\\"Send Message\\\">\\n                    </form>\\n\\n                {#if formState.submittingForm}\\n                    <BoxLoader />\\n                {/if}\\n                {#if formState.formSuccess}\\n                    <h2 class=\\\"success-message\\\" \\n                        in:fly=\\\"{{ y: 20, duration: 500, delay: 200, }}\\\"\\n                        out:fly=\\\"{{ y: -20, duration: 500, delay: 0, }}\\\"\\n                    >\\n                        SUCCESS\\n                    </h2>\\n                {/if}\\n                {#if formState.formError}\\n                    <h2 class=\\\"success-message\\\" \\n                        in:fly=\\\"{{ y: 20, duration: 500, delay: 200, }}\\\"\\n                        out:fly=\\\"{{ y: -20, duration: 500, delay: 0, }}\\\"\\n                    >\\n                        ERROR\\n                    </h2>\\n                {/if}\\n            </div>\\n        </div>\\n\\t</ModalTemplate>\\n{/if}\"],\"names\":[],\"mappings\":\"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\"}"
};

let hideModal = false;

const ContactModal = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	

    let { showModal } = $$props;
    let fieldInputs = [];

    let formState = {
        submittingForm: false,
        formSuccess: false,
        formError: false,
        hideFields: false
    };

	if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0) $$bindings.showModal(showModal);

	$$result.css.add(css$u);

	return `${ showModal && hideModal === false ? `${validate_component(ModalTemplate, 'ModalTemplate').$$render($$result, { showModal: showModal }, {}, {
		default: () => `
	        <div class="form-container svelte-7h4bgy">
	            <div class="flex-container svelte-7h4bgy">
	                    <div class="text-container ${escape(formState.hideFields ? 'hide-content' : '')} ${escape(formState.hideFields ? 'hide-content' : '')} svelte-7h4bgy">
	                        <h2 class="svelte-7h4bgy">Get In Touch</h2>
	                        <p class="svelte-7h4bgy">
	                            Hi There! I’m Josh, 
	                            I bring projects to life by innovating across every aspect of the customer journey. 
	                            Send me a message if you are looking to hire a developer, collaborate on a project, or have a potential business opportunity.
	                        </p>
	                    </div>
	                    <form class="gform ${escape(formState.hideFields ? 'hide-content' : '')}
	                        ${escape(formState.formSuccess ? 'hide-content' : '')} svelte-7h4bgy">
	                        <label class="svelte-7h4bgy"> <span class="svelte-7h4bgy">Name</span>
	                            <input name="name" type="text" class="svelte-7h4bgy"${add_attribute("this", fieldInputs[0], 1)}>
	                        </label>
	                        <label class="svelte-7h4bgy"> <span class="svelte-7h4bgy">Email</span>
	                            <input required name="email" type="email" class="svelte-7h4bgy"${add_attribute("this", fieldInputs[1], 1)}>
	                        </label>
	                        <label class="svelte-7h4bgy"> <span class="svelte-7h4bgy">Message</span>
	                            <textarea name="message" rows="6" type="textarea" class="svelte-7h4bgy"${add_attribute("this", fieldInputs[2], 1)}></textarea>
	                        </label>
	                        <input type="submit" value="Send Message" class="svelte-7h4bgy">
	                    </form>

	                ${ formState.submittingForm ? `${validate_component(BoxLoader, 'BoxLoader').$$render($$result, {}, {}, {})}` : `` }
	                ${ formState.formSuccess ? `<h2 class="success-message svelte-7h4bgy">
	                        SUCCESS
	                    </h2>` : `` }
	                ${ formState.formError ? `<h2 class="success-message svelte-7h4bgy">
	                        ERROR
	                    </h2>` : `` }
	            </div>
	        </div>
		`
	})}` : `` }`;
});

/* src/components/navigation/Navigation.svelte generated by Svelte v3.9.1 */

const css$v = {
	code: "header.svelte-1nyacoe{border-bottom:1px solid #d6d6d6;position:fixed;width:100%;top:0;z-index:50;background:white}nav.svelte-1nyacoe{display:flex;justify-content:space-between;align-items:center;padding:30rem 20rem;transition:all .45s cubic-bezier(0.85, 0.08, 0.08, 0.99)}nav.scrolled.svelte-1nyacoe{padding:20rem 20rem}@media screen and (min-width: 40em){nav.svelte-1nyacoe{padding:35rem 40rem}nav.scrolled.svelte-1nyacoe{padding:20rem 40rem}}ul.navigation.svelte-1nyacoe{box-sizing:border-box;background:white;display:flex;justify-content:center;flex-direction:column;justify-content:center;align-items:flex-end;position:fixed;z-index:2;width:250px;right:0;transform:translateX(100%);bottom:0;height:100%;padding:0rem 20rem;transition:transform 1s cubic-bezier(0.85, 0.08, 0.08, 0.99)}#toggle:checked~ul.navigation.svelte-1nyacoe{display:flex;transform:translateX(0)}@media screen and (min-width: 40em){ul.navigation.svelte-1nyacoe{padding:0rem 40rem}}@media screen and (min-width: 64em){ul.navigation.svelte-1nyacoe{transform:unset;position:relative;display:flex;flex-direction:row;width:unset;padding:0}}li.svelte-1nyacoe{position:relative;text-align:right;margin:5rem 0rem;width:auto;overflow-x:hidden;font-size:14rem}@media screen and (min-width: 64em){li.svelte-1nyacoe{font-size:16rem;margin:0rem 20rem;padding:2.5rem 0}p.svelte-1nyacoe{font-size:18rem}}li.svelte-1nyacoe:not(.close-container)::after,.active.svelte-1nyacoe::after{content:'';position:absolute;left:0;transform:translateX(100%);bottom:0;width:100%;opacity:1;border-bottom:2px solid #3B3B3B;transition:transform .45s cubic-bezier(0.85, 0.08, 0.08, 0.99)}li.svelte-1nyacoe:not(.close-container):hover::after,.active.svelte-1nyacoe::after{transform:translateX(0)}.selected.svelte-1nyacoe::after{transform:translateX(0) !important}.modal-active.svelte-1nyacoe .selected.svelte-1nyacoe:not(.open-modal)::after{transform:translateX(100%) !important}.close-container.svelte-1nyacoe{position:absolute;top:50rem;right:50rem;overflow:unset;cursor:pointer}@media screen and (min-width: 40em){.close-container.svelte-1nyacoe{right:70rem}}@media screen and (min-width: 64em){.close-container.svelte-1nyacoe{display:none}}.close.svelte-1nyacoe{width:32px;height:32px;position:relative;align-items:center;justify-content:center}.close.svelte-1nyacoe::before{content:'';display:block;position:absolute;border-bottom:2px solid black;width:32px;transform:rotate(45deg)}.close.svelte-1nyacoe::after{content:'';display:block;position:absolute;border-bottom:2px solid black;width:32px;transform:rotate(-45deg)}a.svelte-1nyacoe:not(.logo){display:block;padding:5rem 0rem;text-transform:uppercase}p.svelte-1nyacoe{font-weight:700;font-style:italic}.code.svelte-1nyacoe{font-weight:100;font-style:normal;opacity:.3}.logo-hover.svelte-1nyacoe{transition:all .3s ease-in}.logo.svelte-1nyacoe:hover .logo-hover.svelte-1nyacoe{color:black}",
	map: "{\"version\":3,\"file\":\"Navigation.svelte\",\"sources\":[\"Navigation.svelte\"],\"sourcesContent\":[\"<script>\\nimport Hamburger from './Hamburger.svelte';\\nimport ContactModal from '../modals/ContactModal.svelte';\\n\\nimport { onMount } from 'svelte';\\n\\nlet showModal;\\n\\nlet windowY;\\nlet hamburger;\\nlet toggle = false;\\n\\nlet reduceNavSize = false;\\n\\nlet activeNavigation = {\\n    home: false,\\n    about: false,\\n    experience: false\\n}\\n\\n$: headerClass = navSize(windowY);\\n\\nfunction navSize(y){\\n    if(y > 75){\\n        reduceNavSize = true;\\n    } else {\\n        reduceNavSize = false;\\n    }\\n}\\n\\nfunction togglerOff(){\\n    if(window.innerWidth < 1023){\\n        hamburger ? hamburger.$$.ctx.hamburger.click() : null;\\n    }\\n}\\n\\nfunction resetActiveNav() {\\n    let activeNavObj = Object.entries(activeNavigation);\\n    \\n    for(let [key, value] of activeNavObj){\\n        activeNavigation[key] = false;\\n    }\\n}\\n\\nfunction setActiveNavOnClick() {\\n    \\n    let activeNavObj = Object.entries(activeNavigation);\\n    let elText = `${this.innerHTML.toLowerCase()}`;\\n    \\n    for(let [key, value] of activeNavObj){\\n        if(key === elText){\\n            activeNavigation[key] = true;\\n        } else {\\n            activeNavigation[key] = false;\\n        }\\n    }\\n    togglerOff();\\n}\\n\\nfunction setActiveNav() {\\n    let path = window.location.pathname;\\n\\n    if(path === '/') activeNavigation.home = true;\\n    else if (path === '/about') activeNavigation.about = true;\\n    else if (path === '/experience') activeNavigation.experience = true;\\n}\\n\\nfunction openModal(){\\n    showModal = true;\\n}\\n\\nonMount(() => {\\n    setActiveNav();\\n})\\n\\n</script>\\n\\n<style>\\n\\nheader {\\n    border-bottom: 1px solid #d6d6d6;\\n    position: fixed;\\n    width: 100%;\\n    top: 0;\\n    z-index: 50;\\n    background: white;\\n}\\n\\nnav {\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: center;\\n    padding: 30rem 20rem;\\n    transition: all .45s cubic-bezier(0.85, 0.08, 0.08, 0.99);\\n}\\n\\nnav.scrolled {\\n    padding: 20rem 20rem;\\n}\\n\\n@media screen and (min-width: 40em) {\\n    nav {\\n        padding: 35rem 40rem;\\n    }\\n    nav.scrolled {\\n        padding: 20rem 40rem;\\n    }\\n}\\n\\nul.navigation {\\n    box-sizing: border-box;\\n    background: white;\\n    display: flex;\\n    justify-content: center;\\n    flex-direction: column;\\n    justify-content: center;\\n    align-items: flex-end;\\n    position: fixed;\\n    z-index: 2;\\n    width: 250px;\\n    right: 0;\\n    transform: translateX(100%);\\n    bottom: 0;\\n    height: 100%;\\n    padding: 0rem 20rem;\\n    transition: transform 1s cubic-bezier(0.85, 0.08, 0.08, 0.99);\\n}\\n\\n#toggle:checked ~ ul.navigation{\\n    display: flex;\\n    transform: translateX(0);\\n}\\n\\n@media screen and (min-width: 40em) {\\n    ul.navigation {\\n        padding: 0rem 40rem;\\n    }\\n}\\n\\n@media screen and (min-width: 64em) {\\n    ul.navigation{\\n        transform: unset;   \\n        position: relative;\\n        display: flex;\\n        flex-direction: row;\\n        width: unset;\\n        padding: 0;\\n    }\\n}\\n\\nli {\\n    position: relative;\\n    text-align: right;\\n    margin: 5rem 0rem;\\n    width: auto;\\n    overflow-x: hidden;\\n    font-size: 14rem;\\n}\\n\\n@media screen and (min-width: 64em){\\n    li {\\n        font-size: 16rem;\\n        margin: 0rem 20rem;\\n        padding: 2.5rem 0;\\n    }\\n    p{\\n        font-size: 18rem;\\n    }\\n}\\n\\nli:not(.close-container)::after, .active::after {\\n    content: '';\\n    position: absolute;\\n    left: 0;\\n    transform: translateX(100%);\\n    bottom: 0;\\n    width: 100%;\\n    opacity: 1;\\n    border-bottom: 2px solid #3B3B3B;\\n    transition: transform .45s cubic-bezier(0.85, 0.08, 0.08, 0.99);\\n}\\n\\nli:not(.close-container):hover::after, .active::after {\\n    transform: translateX(0);\\n}\\n\\n.selected::after {\\n   transform: translateX(0) !important;\\n}\\n\\n.modal-active .selected:not(.open-modal)::after {\\n   transform: translateX(100%) !important; \\n}\\n\\n.close-container {\\n    position: absolute;\\n    top: 50rem;\\n    right: 50rem;\\n    overflow: unset;\\n    cursor: pointer;\\n}\\n\\n@media screen and (min-width: 40em){\\n    .close-container {\\n        right: 70rem;\\n    }\\n}\\n\\n@media screen and (min-width: 64em){\\n    .close-container {\\n        display: none;\\n    }\\n}\\n\\n.close {\\n    width:32px;\\n    height:32px;\\n    position: relative;\\n    align-items: center;\\n    justify-content: center;\\n}\\n\\n.close::before {\\n  content: '';\\n  display: block;\\n  position: absolute;\\n  border-bottom: 2px solid black;\\n  width: 32px;\\n  transform: rotate(45deg);\\n}\\n\\n.close::after {\\n  content: '';\\n  display: block;\\n  position: absolute;\\n  border-bottom: 2px solid black;\\n  width: 32px;\\n  transform: rotate(-45deg);\\n}\\n\\na:not(.logo) {\\n    display: block;\\n    padding: 5rem 0rem;\\n    text-transform: uppercase;\\n}\\n\\np{\\n    font-weight: 700;\\n    font-style: italic;\\n}\\n.code {\\n    font-weight: 100;\\n    font-style: normal;\\n    opacity: .3;\\n}\\n\\n.logo-hover {\\n    transition: all .3s ease-in;\\n}\\n\\n.logo:hover .logo-hover {\\n    color: black;\\n}\\n\\n</style>\\n\\n<svelte:window bind:scrollY={windowY}/>\\n\\n<header>\\n    <nav class={reduceNavSize ? 'scrolled container' : 'container'}>\\n        <a href='/' on:click={() => {resetActiveNav(); activeNavigation.home = true;}} class=\\\"logo\\\">\\n            <p>\\n                <span class=\\\"code\\\">&lt;h1&gt;</span>Hi There<span class=\\\"logo-hover\\\">!</span><span class=\\\"code\\\">&lt;/h1&gt;</span>\\n            </p>\\n        </a>\\n        <Hamburger on:click={togglerOff} toggle={toggle} bind:this={hamburger} />\\n        <ul class=\\\"navigation {showModal ? 'modal-active' : ''}\\\">\\n            <li class=\\\"close-container\\\" on:click={togglerOff} ><span class=\\\"close\\\"></span></li>\\n            <li class=\\\"{activeNavigation.home ? 'selected' : ''}\\\"><a on:click={setActiveNavOnClick} rel=prefetch href=\\\"/\\\">Home</a></li>\\n            <li class=\\\"{activeNavigation.about ? 'selected' : ''}\\\"><a on:click={setActiveNavOnClick} rel=prefetch href=\\\"/about\\\">About</a></li>\\n            <li class=\\\"{activeNavigation.experience ? 'selected' : ''}\\\"><a on:click={setActiveNavOnClick} href=\\\"/experience\\\">Experience</a></li>\\n            <li class=\\\"{showModal ? 'selected' : ''} open-modal\\\"><a on:click={openModal} href=\\\"javascript:void(0)\\\">Contact</a></li>\\n        </ul>\\n    </nav>\\n</header>\\n\\n<ContactModal on:click={() => showModal = false} showModal={showModal}/>\"],\"names\":[],\"mappings\":\"AA+EA,MAAM,eAAC,CAAC,AACJ,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAChC,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,EAAE,CACX,UAAU,CAAE,KAAK,AACrB,CAAC,AAED,GAAG,eAAC,CAAC,AACD,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,KAAK,CAAC,KAAK,CACpB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,aAAa,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,AAC7D,CAAC,AAED,GAAG,SAAS,eAAC,CAAC,AACV,OAAO,CAAE,KAAK,CAAC,KAAK,AACxB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,GAAG,eAAC,CAAC,AACD,OAAO,CAAE,KAAK,CAAC,KAAK,AACxB,CAAC,AACD,GAAG,SAAS,eAAC,CAAC,AACV,OAAO,CAAE,KAAK,CAAC,KAAK,AACxB,CAAC,AACL,CAAC,AAED,EAAE,WAAW,eAAC,CAAC,AACX,UAAU,CAAE,UAAU,CACtB,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,QAAQ,CACrB,QAAQ,CAAE,KAAK,CACf,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,KAAK,CACZ,KAAK,CAAE,CAAC,CACR,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CAAC,KAAK,CACnB,UAAU,CAAE,SAAS,CAAC,EAAE,CAAC,aAAa,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,AACjE,CAAC,AAED,OAAO,QAAQ,CAAG,EAAE,0BAAW,CAAC,AAC5B,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,WAAW,CAAC,CAAC,AAC5B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,EAAE,WAAW,eAAC,CAAC,AACX,OAAO,CAAE,IAAI,CAAC,KAAK,AACvB,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,EAAE,0BAAW,CAAC,AACV,SAAS,CAAE,KAAK,CAChB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,CAAC,AACd,CAAC,AACL,CAAC,AAED,EAAE,eAAC,CAAC,AACA,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,KAAK,CACjB,MAAM,CAAE,IAAI,CAAC,IAAI,CACjB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,KAAK,AACpB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,eAAC,CAAC,AACA,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IAAI,CAAC,KAAK,CAClB,OAAO,CAAE,MAAM,CAAC,CAAC,AACrB,CAAC,AACD,gBAAC,CAAC,AACE,SAAS,CAAE,KAAK,AACpB,CAAC,AACL,CAAC,AAED,iBAAE,KAAK,gBAAgB,CAAC,OAAO,CAAE,sBAAO,OAAO,AAAC,CAAC,AAC7C,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,CAAC,CACV,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAChC,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,aAAa,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,AACnE,CAAC,AAED,iBAAE,KAAK,gBAAgB,CAAC,MAAM,OAAO,CAAE,sBAAO,OAAO,AAAC,CAAC,AACnD,SAAS,CAAE,WAAW,CAAC,CAAC,AAC5B,CAAC,AAED,wBAAS,OAAO,AAAC,CAAC,AACf,SAAS,CAAE,WAAW,CAAC,CAAC,CAAC,UAAU,AACtC,CAAC,AAED,4BAAa,CAAC,wBAAS,KAAK,WAAW,CAAC,OAAO,AAAC,CAAC,AAC9C,SAAS,CAAE,WAAW,IAAI,CAAC,CAAC,UAAU,AACzC,CAAC,AAED,gBAAgB,eAAC,CAAC,AACd,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,CACV,KAAK,CAAE,KAAK,CACZ,QAAQ,CAAE,KAAK,CACf,MAAM,CAAE,OAAO,AACnB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,gBAAgB,eAAC,CAAC,AACd,KAAK,CAAE,KAAK,AAChB,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,gBAAgB,eAAC,CAAC,AACd,OAAO,CAAE,IAAI,AACjB,CAAC,AACL,CAAC,AAED,MAAM,eAAC,CAAC,AACJ,MAAM,IAAI,CACV,OAAO,IAAI,CACX,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,AAC3B,CAAC,AAED,qBAAM,QAAQ,AAAC,CAAC,AACd,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAC9B,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,OAAO,KAAK,CAAC,AAC1B,CAAC,AAED,qBAAM,OAAO,AAAC,CAAC,AACb,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAC9B,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,OAAO,MAAM,CAAC,AAC3B,CAAC,AAED,gBAAC,KAAK,KAAK,CAAC,AAAC,CAAC,AACV,OAAO,CAAE,KAAK,CACd,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,cAAc,CAAE,SAAS,AAC7B,CAAC,AAED,gBAAC,CAAC,AACE,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,MAAM,AACtB,CAAC,AACD,KAAK,eAAC,CAAC,AACH,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,EAAE,AACf,CAAC,AAED,WAAW,eAAC,CAAC,AACT,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,OAAO,AAC/B,CAAC,AAED,oBAAK,MAAM,CAAC,WAAW,eAAC,CAAC,AACrB,KAAK,CAAE,KAAK,AAChB,CAAC\"}"
};

let toggle = false;

const Navigation = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	

let showModal;

let windowY;
let hamburger;

let reduceNavSize = false;

let activeNavigation = {
    home: false,
    about: false,
    experience: false
};

function navSize(y){
    if(y > 75){
        reduceNavSize = true;
    } else {
        reduceNavSize = false;
    }
}

function setActiveNav() {
    let path = window.location.pathname;

    if(path === '/') activeNavigation.home = true;
    else if (path === '/about') activeNavigation.about = true;
    else if (path === '/experience') activeNavigation.experience = true;
}

onMount(() => {
    setActiveNav();
});

	$$result.css.add(css$v);

	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		let headerClass = navSize(windowY);

		$$rendered = `

		<header class="svelte-1nyacoe">
		    <nav class="${escape(null_to_empty(reduceNavSize ? 'scrolled container' : 'container'))} svelte-1nyacoe">
		        <a href="/" class="logo svelte-1nyacoe">
		            <p class="svelte-1nyacoe">
		                <span class="code svelte-1nyacoe">&lt;h1&gt;</span>Hi There<span class="logo-hover svelte-1nyacoe">!</span><span class="code svelte-1nyacoe">&lt;/h1&gt;</span>
		            </p>
		        </a>
		        ${validate_component(Hamburger, 'Hamburger').$$render($$result, {
			toggle: toggle,
			this: hamburger
		}, {
			this: $$value => { hamburger = $$value; $$settled = false; }
		}, {})}
		        <ul class="navigation ${escape(showModal ? 'modal-active' : '')} svelte-1nyacoe">
		            <li class="close-container svelte-1nyacoe"><span class="close svelte-1nyacoe"></span></li>
		            <li class="${escape(null_to_empty(activeNavigation.home ? 'selected' : ''))} svelte-1nyacoe"><a rel="prefetch" href="/" class="svelte-1nyacoe">Home</a></li>
		            <li class="${escape(null_to_empty(activeNavigation.about ? 'selected' : ''))} svelte-1nyacoe"><a rel="prefetch" href="/about" class="svelte-1nyacoe">About</a></li>
		            <li class="${escape(null_to_empty(activeNavigation.experience ? 'selected' : ''))} svelte-1nyacoe"><a href="/experience" class="svelte-1nyacoe">Experience</a></li>
		            <li class="${escape(showModal ? 'selected' : '')} open-modal svelte-1nyacoe"><a href="javascript:void(0)" class="svelte-1nyacoe">Contact</a></li>
		        </ul>
		    </nav>
		</header>

		${validate_component(ContactModal, 'ContactModal').$$render($$result, { showModal: showModal }, {}, {})}`;
	} while (!$$settled);

	return $$rendered;
});

/* src/components/footer/Footer.svelte generated by Svelte v3.9.1 */

const css$w = {
	code: "footer.svelte-1a3fz2r{border-top:1px solid #d6d6d6;background:white;color:#3B3B3B}.footer-container.svelte-1a3fz2r{margin-top:40px;display:flex;flex-direction:column;padding-bottom:0}@media screen and (min-width: 40em){.footer-container.svelte-1a3fz2r{flex-direction:row}}.left.svelte-1a3fz2r,.right.svelte-1a3fz2r{margin-bottom:55rem}@media screen and (min-width: 40em){.left.svelte-1a3fz2r,.right.svelte-1a3fz2r{margin-bottom:60rem}.bottom-row.svelte-1a3fz2r{display:flex}.left.svelte-1a3fz2r,.copyright.svelte-1a3fz2r{padding-right:80rem;width:60%}.right.svelte-1a3fz2r{padding-top:20rem}}@media screen and (min-width: 64em){.left.svelte-1a3fz2r,.copyright.svelte-1a3fz2r{width:50%}.left.svelte-1a3fz2r,.right.svelte-1a3fz2r{margin-bottom:70rem}}.text-cta.svelte-1a3fz2r:first-of-type{margin-bottom:20rem}.headline.svelte-1a3fz2r{font-size:40px;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;line-height:45px;font-weight:700;max-width:420px}.headline.svelte-1a3fz2r a.svelte-1a3fz2r{color:#58595b;transition:all .45s ease-in-out;opacity:.75}.headline.svelte-1a3fz2r a.svelte-1a3fz2r:hover{color:black}.title.svelte-1a3fz2r{font-weight:100;font-size:12rem}.text-cta.svelte-1a3fz2r a.svelte-1a3fz2r{font-size:14rem}.bottom-row.svelte-1a3fz2r{padding-top:0}.copyright.svelte-1a3fz2r{font-size:12rem;font-style:italic;font-weight:300}.left.svelte-1a3fz2r p.svelte-1a3fz2r:last-child{color:#58595b;font-size:18px;font-weight:900;margin-top:25rem}div.social-icons.svelte-1a3fz2r{margin-top:8px;min-width:206px}i.svelte-1a3fz2r{font-size:14px;margin-right:8px;color:#808080;transition:all .3s ease}a.svelte-1a3fz2r:hover>i.svelte-1a3fz2r{transform:translateY(-3px);color:#58595b}@media screen and (min-width: 40em){div.social-icons.svelte-1a3fz2r{margin:0}i.svelte-1a3fz2r{font-size:18px;margin-right:10px}.left.svelte-1a3fz2r p.svelte-1a3fz2r:last-child{margin-top:60rem}}@media screen and (min-width: 64em){.title.svelte-1a3fz2r{font-size:16rem\n    }.text-cta.svelte-1a3fz2r a.svelte-1a3fz2r{font-size:18rem}.copyright.svelte-1a3fz2r{font-size:14rem}.headline.svelte-1a3fz2r{font-size:45px;max-width:440px}.left.svelte-1a3fz2r p.svelte-1a3fz2r:last-child{font-size:22px;margin-top:70rem}i.svelte-1a3fz2r{font-size:20px}}",
	map: "{\"version\":3,\"file\":\"Footer.svelte\",\"sources\":[\"Footer.svelte\"],\"sourcesContent\":[\"<script>\\nimport TextAnimation from '../helper-components/TextAnimation.svelte';\\n\\n</script>\\n\\n<style>\\nfooter {\\n    border-top: 1px solid #d6d6d6;\\n    background: white;\\n    color: #3B3B3B;\\n}\\n\\n.footer-container {\\n    margin-top: 40px;\\n    display: flex;\\n    flex-direction: column;\\n    padding-bottom: 0;\\n}\\n\\n@media screen and (min-width: 40em){\\n    .footer-container {\\n        flex-direction: row;\\n    }\\n}\\n\\n.left, .right {\\n    margin-bottom: 55rem;\\n}\\n\\n@media screen and (min-width: 40em){\\n    .left, .right {\\n        margin-bottom: 60rem;\\n    }\\n    .bottom-row {\\n        display: flex;\\n    }\\n    .left, .copyright{\\n        padding-right: 80rem;\\n        width: 60%;\\n    }\\n    .right {\\n        padding-top: 20rem;\\n    }\\n}\\n\\n@media screen and (min-width: 64em){\\n    .left, .copyright {\\n        width: 50%;\\n    }\\n    .left, .right {\\n        margin-bottom: 70rem;\\n    }\\n}\\n\\n.text-cta:first-of-type {\\n    margin-bottom: 20rem;\\n}\\n\\n.headline {\\n    font-size: 40px;\\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;\\n    line-height: 45px;\\n    font-weight: 700;\\n    max-width: 420px;\\n}\\n\\n.headline a {\\n    color: #58595b;\\n    transition: all .45s ease-in-out;\\n    opacity: .75;\\n}\\n\\n.headline a:hover {\\n    color: black;\\n}\\n\\n.title {\\n    font-weight: 100;\\n    font-size: 12rem;\\n}\\n\\n.text-cta a {\\n    font-size: 14rem;\\n}\\n\\n.bottom-row {\\n    padding-top: 0;\\n}\\n\\n.copyright {\\n    font-size: 12rem;\\n    font-style: italic;\\n    font-weight: 300;\\n}\\n\\n.left p:last-child {\\n    color: #58595b;\\n    font-size: 18px;\\n    font-weight: 900;\\n    margin-top: 25rem;\\n}\\n\\ndiv.social-icons {\\n    margin-top: 8px;\\n    min-width: 206px;\\n}\\n\\ni {\\n    font-size: 14px;\\n    margin-right: 8px;\\n    color: #808080;\\n    transition: all .3s ease;\\n}\\n\\na:hover > i {\\n    transform: translateY(-3px);\\n    color: #58595b;\\n}\\n\\n@media screen and (min-width: 40em) {\\n    div.social-icons {\\n        margin: 0;\\n    }\\n    i{\\n        font-size: 18px;\\n        margin-right: 10px;\\n    }\\n    .left p:last-child {\\n        margin-top: 60rem;\\n    }\\n\\n}\\n\\n@media screen and (min-width: 64em){\\n    .title{\\n        font-size: 16rem\\n    }\\n    .text-cta a {\\n        font-size: 18rem;\\n    }\\n    .copyright {\\n        font-size: 14rem;\\n    }\\n    .headline {\\n        font-size: 45px;\\n        max-width: 440px;\\n    }\\n    .left p:last-child {\\n        font-size: 22px;\\n        margin-top: 70rem;\\n    }\\n    i {\\n        font-size: 20px;\\n    }\\n}\\n\\n</style>\\n\\n<svelte:head>\\n    <script src=\\\"https://kit.fontawesome.com/1309990c29.js\\\"></script>\\n</svelte:head>\\n\\n<footer>\\n    <div class=\\\"container footer-container\\\">\\n        <div class=\\\"left\\\">\\n            <p class=\\\"headline\\\">\\n                Feel free to shoot me an <a href=\\\"mailto:joshua.micah.roper@gmail.com\\\">email</a> & connect through <a href=\\\"https://www.linkedin.com/in/jr-dev\\\" target=\\\"blank\\\">social.</a>\\n            </p>\\n            <p>Reach out!</p>\\n        </div>\\n        <div class=\\\"right\\\">\\n            <div class=\\\"text-cta\\\">\\n                <p class=\\\"title\\\">\\n                    Get In Touch!\\n                </p>\\n                <a href=\\\"mailto:joshua.micah.roper@gmail.com\\\">\\n                    <TextAnimation text={`Joshua.micah.roper@gmail.com`} />\\n                </a>\\n            </div>\\n            <div class=\\\"text-cta\\\">\\n                <p class=\\\"title\\\">\\n                    View Resume\\n                </p>\\n                <a href=\\\"./images/resume-joshua-roper.pdf\\\" download>\\n                    <TextAnimation text={`Download PDF`} />\\n                </a>\\n            </div>\\n        </div>\\n    </div>\\n    <div class=\\\"bottom-row container\\\">\\n        \\n        <p class=\\\"copyright\\\">@ 2019 Joshua Roper Development</p>\\n        <div class=\\\"social-icons\\\">\\n            <a href=\\\"https://www.github.com/Jrope21\\\" aria-label=\\\"link to Joshua Roper's GitHub account\\\" target=\\\"blank\\\" >\\n                <i class=\\\"fab fa-github\\\"></i>\\n            </a>\\n            <a href=\\\"https://www.linkedin.com/in/JR-dev\\\" aria-label=\\\"link to Joshua Roper's LinkedIn account\\\" target=\\\"blank\\\" >\\n                <i class=\\\"fab fa-linkedin\\\"></i>\\n            </a>\\n            <a href=\\\"mailto:joshua.micah.roper@gmail.com\\\" aria-label=\\\"link to send Joshua Roper an email\\\" target=\\\"blank\\\" >\\n                <i class=\\\"fas fa-envelope\\\"></i>\\n            </a>\\n        </div>\\n    </div>\\n</footer>\\n\\n\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

const Footer = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$w);

	return `${($$result.head += `<script src="https://kit.fontawesome.com/1309990c29.js"></script>`, "")}

	<footer class="svelte-1a3fz2r">
	    <div class="container footer-container svelte-1a3fz2r">
	        <div class="left svelte-1a3fz2r">
	            <p class="headline svelte-1a3fz2r">
	                Feel free to shoot me an <a href="mailto:joshua.micah.roper@gmail.com" class="svelte-1a3fz2r">email</a> &amp; connect through <a href="https://www.linkedin.com/in/jr-dev" target="blank" class="svelte-1a3fz2r">social.</a>
	            </p>
	            <p class="svelte-1a3fz2r">Reach out!</p>
	        </div>
	        <div class="right svelte-1a3fz2r">
	            <div class="text-cta svelte-1a3fz2r">
	                <p class="title svelte-1a3fz2r">
	                    Get In Touch!
	                </p>
	                <a href="mailto:joshua.micah.roper@gmail.com" class="svelte-1a3fz2r">
	                    ${validate_component(TextAnimation, 'TextAnimation').$$render($$result, { text: `Joshua.micah.roper@gmail.com` }, {}, {})}
	                </a>
	            </div>
	            <div class="text-cta svelte-1a3fz2r">
	                <p class="title svelte-1a3fz2r">
	                    View Resume
	                </p>
	                <a href="./images/resume-joshua-roper.pdf" download class="svelte-1a3fz2r">
	                    ${validate_component(TextAnimation, 'TextAnimation').$$render($$result, { text: `Download PDF` }, {}, {})}
	                </a>
	            </div>
	        </div>
	    </div>
	    <div class="bottom-row container svelte-1a3fz2r">
	        
	        <p class="copyright svelte-1a3fz2r">@ 2019 Joshua Roper Development</p>
	        <div class="social-icons svelte-1a3fz2r">
	            <a href="https://www.github.com/Jrope21" aria-label="link to Joshua Roper's GitHub account" target="blank" class="svelte-1a3fz2r">
	                <i class="fab fa-github svelte-1a3fz2r"></i>
	            </a>
	            <a href="https://www.linkedin.com/in/JR-dev" aria-label="link to Joshua Roper's LinkedIn account" target="blank" class="svelte-1a3fz2r">
	                <i class="fab fa-linkedin svelte-1a3fz2r"></i>
	            </a>
	            <a href="mailto:joshua.micah.roper@gmail.com" aria-label="link to send Joshua Roper an email" target="blank" class="svelte-1a3fz2r">
	                <i class="fas fa-envelope svelte-1a3fz2r"></i>
	            </a>
	        </div>
	    </div>
	</footer>`;
});

/* src/routes/_layout.svelte generated by Svelte v3.9.1 */

const css$x = {
	code: ".background.svelte-184cnv{background:url('../images/so-white.png');position:fixed;width:100vw;height:100vh;top:0;z-index:-1}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport Navigation from '../components/navigation/Navigation.svelte';\\n\\timport Footer from '../components/footer/Footer.svelte';\\n\\timport { onMount } from 'svelte'\\n</script>\\n\\n<style>\\n\\n\\t.background {\\n\\t\\tbackground: url('../images/so-white.png');\\n\\t\\tposition: fixed;\\n\\t\\twidth: 100vw;\\n\\t\\theight: 100vh;\\n\\t\\ttop: 0;\\n\\t\\tz-index: -1;\\n\\t}\\n\\n</style>\\n\\n<Navigation />\\n<div class=\\\"background\\\"></div>\\n<slot></slot>\\n\\n<Footer />\"],\"names\":[],\"mappings\":\"AAQC,WAAW,cAAC,CAAC,AACZ,UAAU,CAAE,IAAI,wBAAwB,CAAC,CACzC,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,EAAE,AACZ,CAAC\"}"
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$x);

	return `${validate_component(Navigation, 'Navigation').$$render($$result, {}, {}, {})}
	<div class="background svelte-184cnv"></div>
	${$$slots.default ? $$slots.default({}) : ``}

	${validate_component(Footer, 'Footer').$$render($$result, {}, {}, {})}`;
});

/* src/routes/_error.svelte generated by Svelte v3.9.1 */

const css$y = {
	code: "h1.svelte-8od9u6,p.svelte-8od9u6{margin:0 auto}h1.svelte-8od9u6{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-8od9u6{margin:1em auto}@media(min-width: 480px){h1.svelte-8od9u6{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let status;\\n\\texport let error;\\n\\n\\tconst dev = \\\"development\\\" === 'development';\\n</script>\\n\\n<style>\\n\\th1, p {\\n\\t\\tmargin: 0 auto;\\n\\t}\\n\\n\\th1 {\\n\\t\\tfont-size: 2.8em;\\n\\t\\tfont-weight: 700;\\n\\t\\tmargin: 0 0 0.5em 0;\\n\\t}\\n\\n\\tp {\\n\\t\\tmargin: 1em auto;\\n\\t}\\n\\n\\t@media (min-width: 480px) {\\n\\t\\th1 {\\n\\t\\t\\tfont-size: 4em;\\n\\t\\t}\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>{status}</title>\\n</svelte:head>\\n\\n<h1>{status}</h1>\\n\\n<p>{error.message}</p>\\n\\n{#if dev && error.stack}\\n\\t<pre>{error.stack}</pre>\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AAQC,gBAAE,CAAE,CAAC,cAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,cAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { status, error } = $$props;

	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);

	$$result.css.add(css$y);

	return `${($$result.head += `<title>${escape(status)}</title>`, "")}

	<h1 class="svelte-8od9u6">${escape(status)}</h1>

	<p class="svelte-8od9u6">${escape(error.message)}</p>

	${  error.stack ? `<pre>${escape(error.stack)}</pre>` : `` }`;
});

// This file is generated by Sapper — do not edit it!

const d = decodeURIComponent;

const manifest = {
	server_routes: [
		{
			// blog/index.json.js
			pattern: /^\/blog.json$/,
			handlers: route_0,
			params: () => ({})
		},

		{
			// blog/[slug].json.js
			pattern: /^\/blog\/([^\/]+?).json$/,
			handlers: route_1,
			params: match => ({ slug: d(match[1]) })
		}
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: Index }
			]
		},

		{
			// experience.svelte
			pattern: /^\/experience\/?$/,
			parts: [
				{ name: "experience", file: "experience.svelte", component: Experience }
			]
		},

		{
			// projects/creative-revolt.svelte
			pattern: /^\/projects\/creative-revolt\/?$/,
			parts: [
				null,
				{ name: "projects_creative$45revolt", file: "projects/creative-revolt.svelte", component: Creative_revolt }
			]
		},

		{
			// projects/university-park.svelte
			pattern: /^\/projects\/university-park\/?$/,
			parts: [
				null,
				{ name: "projects_university$45park", file: "projects/university-park.svelte", component: University_park }
			]
		},

		{
			// projects/halcyon.svelte
			pattern: /^\/projects\/halcyon\/?$/,
			parts: [
				null,
				{ name: "projects_halcyon", file: "projects/halcyon.svelte", component: Halcyon }
			]
		},

		{
			// about.svelte
			pattern: /^\/about\/?$/,
			parts: [
				{ name: "about", file: "about.svelte", component: About }
			]
		},

		{
			// blog/index.svelte
			pattern: /^\/blog\/?$/,
			parts: [
				{ name: "blog", file: "blog/index.svelte", component: Index$1, preload: preload }
			]
		},

		{
			// blog/[slug].svelte
			pattern: /^\/blog\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "blog_$slug", file: "blog/[slug].svelte", component: Slug, preload: preload$1, params: match => ({ slug: d(match[1]) }) }
			]
		}
	],

	root: Layout,
	root_preload: () => {},
	error: Error$1
};

const build_dir = "__sapper__/dev";

const src_dir = "src";

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const CONTEXT_KEY = {};

/* src/node_modules/@sapper/internal/App.svelte generated by Svelte v3.9.1 */

const App = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	

	let { stores, error, status, segments, level0, level1 = null } = $$props;

	setContext(CONTEXT_KEY, stores);

	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.segments === void 0 && $$bindings.segments && segments !== void 0) $$bindings.segments(segments);
	if ($$props.level0 === void 0 && $$bindings.level0 && level0 !== void 0) $$bindings.level0(level0);
	if ($$props.level1 === void 0 && $$bindings.level1 && level1 !== void 0) $$bindings.level1(level1);

	return `


	${validate_component(Layout, 'Layout').$$render($$result, Object.assign({ segment: segments[0] }, level0.props), {}, {
		default: () => `
		${ error ? `${validate_component(Error$1, 'Error').$$render($$result, { error: error, status: status }, {}, {})}` : `${validate_component(((level1.component) || missing_component), 'svelte:component').$$render($$result, Object.assign(level1.props), {}, {})}` }
	`
	})}`;
});

function get_server_route_handler(routes) {
	async function handle_route(route, req, res, next) {
		req.params = route.params(route.pattern.exec(req.path));

		const method = req.method.toLowerCase();
		// 'delete' cannot be exported from a module because it is a keyword,
		// so check for 'del' instead
		const method_export = method === 'delete' ? 'del' : method;
		const handle_method = route.handlers[method_export];
		if (handle_method) {
			if (process.env.SAPPER_EXPORT) {
				const { write, end, setHeader } = res;
				const chunks = [];
				const headers = {};

				// intercept data so that it can be exported
				res.write = function(chunk) {
					chunks.push(Buffer.from(chunk));
					write.apply(res, arguments);
				};

				res.setHeader = function(name, value) {
					headers[name.toLowerCase()] = value;
					setHeader.apply(res, arguments);
				};

				res.end = function(chunk) {
					if (chunk) chunks.push(Buffer.from(chunk));
					end.apply(res, arguments);

					process.send({
						__sapper__: true,
						event: 'file',
						url: req.url,
						method: req.method,
						status: res.statusCode,
						type: headers['content-type'],
						body: Buffer.concat(chunks).toString()
					});
				};
			}

			const handle_next = (err) => {
				if (err) {
					res.statusCode = 500;
					res.end(err.message);
				} else {
					process.nextTick(next);
				}
			};

			try {
				await handle_method(req, res, handle_next);
			} catch (err) {
				console.error(err);
				handle_next(err);
			}
		} else {
			// no matching handler for method
			process.nextTick(next);
		}
	}

	return function find_route(req, res, next) {
		for (const route of routes) {
			if (route.pattern.test(req.path)) {
				handle_route(route, req, res, next);
				return;
			}
		}

		next();
	};
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse;
var serialize_1 = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var cookie = {
	parse: parse_1,
	serialize: serialize_1
};

var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return thing.toString();
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars[num % chars.length] + name;
        num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return stringifyString(thing);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
    return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
        var char = str.charAt(i);
        var code = char.charCodeAt(0);
        if (char === '"') {
            result += '\\"';
        }
        else if (char in escaped$1) {
            result += escaped$1[char];
        }
        else if (code >= 0xd800 && code <= 0xdfff) {
            var next = str.charCodeAt(i + 1);
            // If this is the beginning of a [high, low] surrogate pair,
            // add the next two characters, otherwise escape
            if (code <= 0xdbff && (next >= 0xdc00 && next <= 0xdfff)) {
                result += char + str[++i];
            }
            else {
                result += "\\u" + code.toString(16).toUpperCase();
            }
        }
        else {
            result += char;
        }
    }
    result += '"';
    return result;
}

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;
const resolve_url = Url.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

function get_page_handler(
	manifest,
	session_getter
) {
	const get_build_info =  () => JSON.parse(fs.readFileSync(path.join(build_dir, 'build.json'), 'utf-8'))
		;

	const template =  () => read_template(src_dir)
		;

	const has_service_worker = fs.existsSync(path.join(build_dir, 'service-worker.js'));

	const { server_routes, pages } = manifest;
	const error_route = manifest.error;

	function bail(req, res, err) {
		console.error(err);

		const message =  escape_html(err.message) ;

		res.statusCode = 500;
		res.end(`<pre>${message}</pre>`);
	}

	function handle_error(req, res, statusCode, error) {
		handle_page({
			pattern: null,
			parts: [
				{ name: null, component: error_route }
			]
		}, req, res, statusCode, error || new Error('Unknown error in preload function'));
	}

	async function handle_page(page, req, res, status = 200, error = null) {
		const is_service_worker_index = req.path === '/service-worker-index.html';
		const build_info




 = get_build_info();

		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Cache-Control',  'no-cache' );

		// preload main.js and current route
		// TODO detect other stuff we can preload? images, CSS, fonts?
		let preloaded_chunks = Array.isArray(build_info.assets.main) ? build_info.assets.main : [build_info.assets.main];
		if (!error && !is_service_worker_index) {
			page.parts.forEach(part => {
				if (!part) return;

				// using concat because it could be a string or an array. thanks webpack!
				preloaded_chunks = preloaded_chunks.concat(build_info.assets[part.name]);
			});
		}

		if (build_info.bundler === 'rollup') {
			// TODO add dependencies and CSS
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map(file => `<${req.baseUrl}/client/${file}>;rel="modulepreload"`)
				.join(', ');

			res.setHeader('Link', link);
		} else {
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map((file) => {
					const as = /\.css$/.test(file) ? 'style' : 'script';
					return `<${req.baseUrl}/client/${file}>;rel="preload";as="${as}"`;
				})
				.join(', ');

			res.setHeader('Link', link);
		}

		const session = session_getter(req, res);

		let redirect;
		let preload_error;

		const preload_context = {
			redirect: (statusCode, location) => {
				if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
					throw new Error(`Conflicting redirects`);
				}
				location = location.replace(/^\//g, ''); // leading slash (only)
				redirect = { statusCode, location };
			},
			error: (statusCode, message) => {
				preload_error = { statusCode, message };
			},
			fetch: (url, opts) => {
				const parsed = new Url.URL(url, `http://127.0.0.1:${process.env.PORT}${req.baseUrl ? req.baseUrl + '/' :''}`);

				if (opts) {
					opts = Object.assign({}, opts);

					const include_cookies = (
						opts.credentials === 'include' ||
						opts.credentials === 'same-origin' && parsed.origin === `http://127.0.0.1:${process.env.PORT}`
					);

					if (include_cookies) {
						opts.headers = Object.assign({}, opts.headers);

						const cookies = Object.assign(
							{},
							cookie.parse(req.headers.cookie || ''),
							cookie.parse(opts.headers.cookie || '')
						);

						const set_cookie = res.getHeader('Set-Cookie');
						(Array.isArray(set_cookie) ? set_cookie : [set_cookie]).forEach(str => {
							const match = /([^=]+)=([^;]+)/.exec(str);
							if (match) cookies[match[1]] = match[2];
						});

						const str = Object.keys(cookies)
							.map(key => `${key}=${cookies[key]}`)
							.join('; ');

						opts.headers.cookie = str;
					}
				}

				return fetch(parsed.href, opts);
			}
		};

		let preloaded;
		let match;
		let params;

		try {
			const root_preloaded = manifest.root_preload
				? manifest.root_preload.call(preload_context, {
					host: req.headers.host,
					path: req.path,
					query: req.query,
					params: {}
				}, session)
				: {};

			match = error ? null : page.pattern.exec(req.path);


			let toPreload = [root_preloaded];
			if (!is_service_worker_index) {
				toPreload = toPreload.concat(page.parts.map(part => {
					if (!part) return null;

					// the deepest level is used below, to initialise the store
					params = part.params ? part.params(match) : {};

					return part.preload
						? part.preload.call(preload_context, {
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}, session)
						: {};
				}));
			}

			preloaded = await Promise.all(toPreload);
		} catch (err) {
			if (error) {
				return bail(req, res, err)
			}

			preload_error = { statusCode: 500, message: err };
			preloaded = []; // appease TypeScript
		}

		try {
			if (redirect) {
				const location = Url.resolve((req.baseUrl || '') + '/', redirect.location);

				res.statusCode = redirect.statusCode;
				res.setHeader('Location', location);
				res.end();

				return;
			}

			if (preload_error) {
				handle_error(req, res, preload_error.statusCode, preload_error.message);
				return;
			}

			const segments = req.path.split('/').filter(Boolean);

			// TODO make this less confusing
			const layout_segments = [segments[0]];
			let l = 1;

			page.parts.forEach((part, i) => {
				layout_segments[l] = segments[i + 1];
				if (!part) return null;
				l++;
			});

			const props = {
				stores: {
					page: {
						subscribe: writable({
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}).subscribe
					},
					preloading: {
						subscribe: writable(null).subscribe
					},
					session: writable(session)
				},
				segments: layout_segments,
				status: error ? status : 200,
				error: error ? error instanceof Error ? error : { message: error } : null,
				level0: {
					props: preloaded[0]
				},
				level1: {
					segment: segments[0],
					props: {}
				}
			};

			if (!is_service_worker_index) {
				let l = 1;
				for (let i = 0; i < page.parts.length; i += 1) {
					const part = page.parts[i];
					if (!part) continue;

					props[`level${l++}`] = {
						component: part.component,
						props: preloaded[i + 1] || {},
						segment: segments[i]
					};
				}
			}

			const { html, head, css } = App.render(props);

			const serialized = {
				preloaded: `[${preloaded.map(data => try_serialize(data)).join(',')}]`,
				session: session && try_serialize(session, err => {
					throw new Error(`Failed to serialize session data: ${err.message}`);
				}),
				error: error && try_serialize(props.error)
			};

			let script = `__SAPPER__={${[
				error && `error:${serialized.error},status:${status}`,
				`baseUrl:"${req.baseUrl}"`,
				serialized.preloaded && `preloaded:${serialized.preloaded}`,
				serialized.session && `session:${serialized.session}`
			].filter(Boolean).join(',')}};`;

			if (has_service_worker) {
				script += `if('serviceWorker' in navigator)navigator.serviceWorker.register('${req.baseUrl}/service-worker.js');`;
			}

			const file = [].concat(build_info.assets.main).filter(file => file && /\.js$/.test(file))[0];
			const main = `${req.baseUrl}/client/${file}`;

			if (build_info.bundler === 'rollup') {
				if (build_info.legacy_assets) {
					const legacy_main = `${req.baseUrl}/client/legacy/${build_info.legacy_assets.main}`;
					script += `(function(){try{eval("async function x(){}");var main="${main}"}catch(e){main="${legacy_main}"};var s=document.createElement("script");try{new Function("if(0)import('')")();s.src=main;s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main",main);}document.head.appendChild(s);}());`;
				} else {
					script += `var s=document.createElement("script");try{new Function("if(0)import('')")();s.src="${main}";s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main","${main}")}document.head.appendChild(s)`;
				}
			} else {
				script += `</script><script src="${main}">`;
			}

			let styles;

			// TODO make this consistent across apps
			// TODO embed build_info in placeholder.ts
			if (build_info.css && build_info.css.main) {
				const css_chunks = new Set();
				if (build_info.css.main) css_chunks.add(build_info.css.main);
				page.parts.forEach(part => {
					if (!part) return;
					const css_chunks_for_part = build_info.css.chunks[part.file];

					if (css_chunks_for_part) {
						css_chunks_for_part.forEach(file => {
							css_chunks.add(file);
						});
					}
				});

				styles = Array.from(css_chunks)
					.map(href => `<link rel="stylesheet" href="client/${href}">`)
					.join('');
			} else {
				styles = (css && css.code ? `<style>${css.code}</style>` : '');
			}

			// users can set a CSP nonce using res.locals.nonce
			const nonce_attr = (res.locals && res.locals.nonce) ? ` nonce="${res.locals.nonce}"` : '';

			const body = template()
				.replace('%sapper.base%', () => `<base href="${req.baseUrl}/">`)
				.replace('%sapper.scripts%', () => `<script${nonce_attr}>${script}</script>`)
				.replace('%sapper.html%', () => html)
				.replace('%sapper.head%', () => `<noscript id='sapper-head-start'></noscript>${head}<noscript id='sapper-head-end'></noscript>`)
				.replace('%sapper.styles%', () => styles);

			res.statusCode = status;
			res.end(body);
		} catch(err) {
			if (error) {
				bail(req, res, err);
			} else {
				handle_error(req, res, 500, err);
			}
		}
	}

	return function find_route(req, res, next) {
		if (req.path === '/service-worker-index.html') {
			const homePage = pages.find(page => page.pattern.test('/'));
			handle_page(homePage, req, res);
			return;
		}

		for (const page of pages) {
			if (page.pattern.test(req.path)) {
				handle_page(page, req, res);
				return;
			}
		}

		handle_error(req, res, 404, 'Not found');
	};
}

function read_template(dir = build_dir) {
	return fs.readFileSync(`${dir}/template.html`, 'utf-8');
}

function try_serialize(data, fail) {
	try {
		return devalue(data);
	} catch (err) {
		if (fail) fail(err);
		return null;
	}
}

function escape_html(html) {
	const chars = {
		'"' : 'quot',
		"'": '#39',
		'&': 'amp',
		'<' : 'lt',
		'>' : 'gt'
	};

	return html.replace(/["'&<>]/g, c => `&${chars[c]};`);
}

var mime_raw = "application/andrew-inset\t\t\tez\napplication/applixware\t\t\t\taw\napplication/atom+xml\t\t\t\tatom\napplication/atomcat+xml\t\t\t\tatomcat\napplication/atomsvc+xml\t\t\t\tatomsvc\napplication/ccxml+xml\t\t\t\tccxml\napplication/cdmi-capability\t\t\tcdmia\napplication/cdmi-container\t\t\tcdmic\napplication/cdmi-domain\t\t\t\tcdmid\napplication/cdmi-object\t\t\t\tcdmio\napplication/cdmi-queue\t\t\t\tcdmiq\napplication/cu-seeme\t\t\t\tcu\napplication/davmount+xml\t\t\tdavmount\napplication/docbook+xml\t\t\t\tdbk\napplication/dssc+der\t\t\t\tdssc\napplication/dssc+xml\t\t\t\txdssc\napplication/ecmascript\t\t\t\tecma\napplication/emma+xml\t\t\t\temma\napplication/epub+zip\t\t\t\tepub\napplication/exi\t\t\t\t\texi\napplication/font-tdpfr\t\t\t\tpfr\napplication/gml+xml\t\t\t\tgml\napplication/gpx+xml\t\t\t\tgpx\napplication/gxf\t\t\t\t\tgxf\napplication/hyperstudio\t\t\t\tstk\napplication/inkml+xml\t\t\t\tink inkml\napplication/ipfix\t\t\t\tipfix\napplication/java-archive\t\t\tjar\napplication/java-serialized-object\t\tser\napplication/java-vm\t\t\t\tclass\napplication/javascript\t\t\t\tjs\napplication/json\t\t\t\tjson map\napplication/jsonml+json\t\t\t\tjsonml\napplication/lost+xml\t\t\t\tlostxml\napplication/mac-binhex40\t\t\thqx\napplication/mac-compactpro\t\t\tcpt\napplication/mads+xml\t\t\t\tmads\napplication/marc\t\t\t\tmrc\napplication/marcxml+xml\t\t\t\tmrcx\napplication/mathematica\t\t\t\tma nb mb\napplication/mathml+xml\t\t\t\tmathml\napplication/mbox\t\t\t\tmbox\napplication/mediaservercontrol+xml\t\tmscml\napplication/metalink+xml\t\t\tmetalink\napplication/metalink4+xml\t\t\tmeta4\napplication/mets+xml\t\t\t\tmets\napplication/mods+xml\t\t\t\tmods\napplication/mp21\t\t\t\tm21 mp21\napplication/mp4\t\t\t\t\tmp4s\napplication/msword\t\t\t\tdoc dot\napplication/mxf\t\t\t\t\tmxf\napplication/octet-stream\tbin dms lrf mar so dist distz pkg bpk dump elc deploy\napplication/oda\t\t\t\t\toda\napplication/oebps-package+xml\t\t\topf\napplication/ogg\t\t\t\t\togx\napplication/omdoc+xml\t\t\t\tomdoc\napplication/onenote\t\t\t\tonetoc onetoc2 onetmp onepkg\napplication/oxps\t\t\t\toxps\napplication/patch-ops-error+xml\t\t\txer\napplication/pdf\t\t\t\t\tpdf\napplication/pgp-encrypted\t\t\tpgp\napplication/pgp-signature\t\t\tasc sig\napplication/pics-rules\t\t\t\tprf\napplication/pkcs10\t\t\t\tp10\napplication/pkcs7-mime\t\t\t\tp7m p7c\napplication/pkcs7-signature\t\t\tp7s\napplication/pkcs8\t\t\t\tp8\napplication/pkix-attr-cert\t\t\tac\napplication/pkix-cert\t\t\t\tcer\napplication/pkix-crl\t\t\t\tcrl\napplication/pkix-pkipath\t\t\tpkipath\napplication/pkixcmp\t\t\t\tpki\napplication/pls+xml\t\t\t\tpls\napplication/postscript\t\t\t\tai eps ps\napplication/prs.cww\t\t\t\tcww\napplication/pskc+xml\t\t\t\tpskcxml\napplication/rdf+xml\t\t\t\trdf\napplication/reginfo+xml\t\t\t\trif\napplication/relax-ng-compact-syntax\t\trnc\napplication/resource-lists+xml\t\t\trl\napplication/resource-lists-diff+xml\t\trld\napplication/rls-services+xml\t\t\trs\napplication/rpki-ghostbusters\t\t\tgbr\napplication/rpki-manifest\t\t\tmft\napplication/rpki-roa\t\t\t\troa\napplication/rsd+xml\t\t\t\trsd\napplication/rss+xml\t\t\t\trss\napplication/rtf\t\t\t\t\trtf\napplication/sbml+xml\t\t\t\tsbml\napplication/scvp-cv-request\t\t\tscq\napplication/scvp-cv-response\t\t\tscs\napplication/scvp-vp-request\t\t\tspq\napplication/scvp-vp-response\t\t\tspp\napplication/sdp\t\t\t\t\tsdp\napplication/set-payment-initiation\t\tsetpay\napplication/set-registration-initiation\t\tsetreg\napplication/shf+xml\t\t\t\tshf\napplication/smil+xml\t\t\t\tsmi smil\napplication/sparql-query\t\t\trq\napplication/sparql-results+xml\t\t\tsrx\napplication/srgs\t\t\t\tgram\napplication/srgs+xml\t\t\t\tgrxml\napplication/sru+xml\t\t\t\tsru\napplication/ssdl+xml\t\t\t\tssdl\napplication/ssml+xml\t\t\t\tssml\napplication/tei+xml\t\t\t\ttei teicorpus\napplication/thraud+xml\t\t\t\ttfi\napplication/timestamped-data\t\t\ttsd\napplication/vnd.3gpp.pic-bw-large\t\tplb\napplication/vnd.3gpp.pic-bw-small\t\tpsb\napplication/vnd.3gpp.pic-bw-var\t\t\tpvb\napplication/vnd.3gpp2.tcap\t\t\ttcap\napplication/vnd.3m.post-it-notes\t\tpwn\napplication/vnd.accpac.simply.aso\t\taso\napplication/vnd.accpac.simply.imp\t\timp\napplication/vnd.acucobol\t\t\tacu\napplication/vnd.acucorp\t\t\t\tatc acutc\napplication/vnd.adobe.air-application-installer-package+zip\tair\napplication/vnd.adobe.formscentral.fcdt\t\tfcdt\napplication/vnd.adobe.fxp\t\t\tfxp fxpl\napplication/vnd.adobe.xdp+xml\t\t\txdp\napplication/vnd.adobe.xfdf\t\t\txfdf\napplication/vnd.ahead.space\t\t\tahead\napplication/vnd.airzip.filesecure.azf\t\tazf\napplication/vnd.airzip.filesecure.azs\t\tazs\napplication/vnd.amazon.ebook\t\t\tazw\napplication/vnd.americandynamics.acc\t\tacc\napplication/vnd.amiga.ami\t\t\tami\napplication/vnd.android.package-archive\t\tapk\napplication/vnd.anser-web-certificate-issue-initiation\tcii\napplication/vnd.anser-web-funds-transfer-initiation\tfti\napplication/vnd.antix.game-component\t\tatx\napplication/vnd.apple.installer+xml\t\tmpkg\napplication/vnd.apple.mpegurl\t\t\tm3u8\napplication/vnd.aristanetworks.swi\t\tswi\napplication/vnd.astraea-software.iota\t\tiota\napplication/vnd.audiograph\t\t\taep\napplication/vnd.blueice.multipass\t\tmpm\napplication/vnd.bmi\t\t\t\tbmi\napplication/vnd.businessobjects\t\t\trep\napplication/vnd.chemdraw+xml\t\t\tcdxml\napplication/vnd.chipnuts.karaoke-mmd\t\tmmd\napplication/vnd.cinderella\t\t\tcdy\napplication/vnd.claymore\t\t\tcla\napplication/vnd.cloanto.rp9\t\t\trp9\napplication/vnd.clonk.c4group\t\t\tc4g c4d c4f c4p c4u\napplication/vnd.cluetrust.cartomobile-config\t\tc11amc\napplication/vnd.cluetrust.cartomobile-config-pkg\tc11amz\napplication/vnd.commonspace\t\t\tcsp\napplication/vnd.contact.cmsg\t\t\tcdbcmsg\napplication/vnd.cosmocaller\t\t\tcmc\napplication/vnd.crick.clicker\t\t\tclkx\napplication/vnd.crick.clicker.keyboard\t\tclkk\napplication/vnd.crick.clicker.palette\t\tclkp\napplication/vnd.crick.clicker.template\t\tclkt\napplication/vnd.crick.clicker.wordbank\t\tclkw\napplication/vnd.criticaltools.wbs+xml\t\twbs\napplication/vnd.ctc-posml\t\t\tpml\napplication/vnd.cups-ppd\t\t\tppd\napplication/vnd.curl.car\t\t\tcar\napplication/vnd.curl.pcurl\t\t\tpcurl\napplication/vnd.dart\t\t\t\tdart\napplication/vnd.data-vision.rdz\t\t\trdz\napplication/vnd.dece.data\t\t\tuvf uvvf uvd uvvd\napplication/vnd.dece.ttml+xml\t\t\tuvt uvvt\napplication/vnd.dece.unspecified\t\tuvx uvvx\napplication/vnd.dece.zip\t\t\tuvz uvvz\napplication/vnd.denovo.fcselayout-link\t\tfe_launch\napplication/vnd.dna\t\t\t\tdna\napplication/vnd.dolby.mlp\t\t\tmlp\napplication/vnd.dpgraph\t\t\t\tdpg\napplication/vnd.dreamfactory\t\t\tdfac\napplication/vnd.ds-keypoint\t\t\tkpxx\napplication/vnd.dvb.ait\t\t\t\tait\napplication/vnd.dvb.service\t\t\tsvc\napplication/vnd.dynageo\t\t\t\tgeo\napplication/vnd.ecowin.chart\t\t\tmag\napplication/vnd.enliven\t\t\t\tnml\napplication/vnd.epson.esf\t\t\tesf\napplication/vnd.epson.msf\t\t\tmsf\napplication/vnd.epson.quickanime\t\tqam\napplication/vnd.epson.salt\t\t\tslt\napplication/vnd.epson.ssf\t\t\tssf\napplication/vnd.eszigno3+xml\t\t\tes3 et3\napplication/vnd.ezpix-album\t\t\tez2\napplication/vnd.ezpix-package\t\t\tez3\napplication/vnd.fdf\t\t\t\tfdf\napplication/vnd.fdsn.mseed\t\t\tmseed\napplication/vnd.fdsn.seed\t\t\tseed dataless\napplication/vnd.flographit\t\t\tgph\napplication/vnd.fluxtime.clip\t\t\tftc\napplication/vnd.framemaker\t\t\tfm frame maker book\napplication/vnd.frogans.fnc\t\t\tfnc\napplication/vnd.frogans.ltf\t\t\tltf\napplication/vnd.fsc.weblaunch\t\t\tfsc\napplication/vnd.fujitsu.oasys\t\t\toas\napplication/vnd.fujitsu.oasys2\t\t\toa2\napplication/vnd.fujitsu.oasys3\t\t\toa3\napplication/vnd.fujitsu.oasysgp\t\t\tfg5\napplication/vnd.fujitsu.oasysprs\t\tbh2\napplication/vnd.fujixerox.ddd\t\t\tddd\napplication/vnd.fujixerox.docuworks\t\txdw\napplication/vnd.fujixerox.docuworks.binder\txbd\napplication/vnd.fuzzysheet\t\t\tfzs\napplication/vnd.genomatix.tuxedo\t\ttxd\napplication/vnd.geogebra.file\t\t\tggb\napplication/vnd.geogebra.tool\t\t\tggt\napplication/vnd.geometry-explorer\t\tgex gre\napplication/vnd.geonext\t\t\t\tgxt\napplication/vnd.geoplan\t\t\t\tg2w\napplication/vnd.geospace\t\t\tg3w\napplication/vnd.gmx\t\t\t\tgmx\napplication/vnd.google-earth.kml+xml\t\tkml\napplication/vnd.google-earth.kmz\t\tkmz\napplication/vnd.grafeq\t\t\t\tgqf gqs\napplication/vnd.groove-account\t\t\tgac\napplication/vnd.groove-help\t\t\tghf\napplication/vnd.groove-identity-message\t\tgim\napplication/vnd.groove-injector\t\t\tgrv\napplication/vnd.groove-tool-message\t\tgtm\napplication/vnd.groove-tool-template\t\ttpl\napplication/vnd.groove-vcard\t\t\tvcg\napplication/vnd.hal+xml\t\t\t\thal\napplication/vnd.handheld-entertainment+xml\tzmm\napplication/vnd.hbci\t\t\t\thbci\napplication/vnd.hhe.lesson-player\t\tles\napplication/vnd.hp-hpgl\t\t\t\thpgl\napplication/vnd.hp-hpid\t\t\t\thpid\napplication/vnd.hp-hps\t\t\t\thps\napplication/vnd.hp-jlyt\t\t\t\tjlt\napplication/vnd.hp-pcl\t\t\t\tpcl\napplication/vnd.hp-pclxl\t\t\tpclxl\napplication/vnd.hydrostatix.sof-data\t\tsfd-hdstx\napplication/vnd.ibm.minipay\t\t\tmpy\napplication/vnd.ibm.modcap\t\t\tafp listafp list3820\napplication/vnd.ibm.rights-management\t\tirm\napplication/vnd.ibm.secure-container\t\tsc\napplication/vnd.iccprofile\t\t\ticc icm\napplication/vnd.igloader\t\t\tigl\napplication/vnd.immervision-ivp\t\t\tivp\napplication/vnd.immervision-ivu\t\t\tivu\napplication/vnd.insors.igm\t\t\tigm\napplication/vnd.intercon.formnet\t\txpw xpx\napplication/vnd.intergeo\t\t\ti2g\napplication/vnd.intu.qbo\t\t\tqbo\napplication/vnd.intu.qfx\t\t\tqfx\napplication/vnd.ipunplugged.rcprofile\t\trcprofile\napplication/vnd.irepository.package+xml\t\tirp\napplication/vnd.is-xpr\t\t\t\txpr\napplication/vnd.isac.fcs\t\t\tfcs\napplication/vnd.jam\t\t\t\tjam\napplication/vnd.jcp.javame.midlet-rms\t\trms\napplication/vnd.jisp\t\t\t\tjisp\napplication/vnd.joost.joda-archive\t\tjoda\napplication/vnd.kahootz\t\t\t\tktz ktr\napplication/vnd.kde.karbon\t\t\tkarbon\napplication/vnd.kde.kchart\t\t\tchrt\napplication/vnd.kde.kformula\t\t\tkfo\napplication/vnd.kde.kivio\t\t\tflw\napplication/vnd.kde.kontour\t\t\tkon\napplication/vnd.kde.kpresenter\t\t\tkpr kpt\napplication/vnd.kde.kspread\t\t\tksp\napplication/vnd.kde.kword\t\t\tkwd kwt\napplication/vnd.kenameaapp\t\t\thtke\napplication/vnd.kidspiration\t\t\tkia\napplication/vnd.kinar\t\t\t\tkne knp\napplication/vnd.koan\t\t\t\tskp skd skt skm\napplication/vnd.kodak-descriptor\t\tsse\napplication/vnd.las.las+xml\t\t\tlasxml\napplication/vnd.llamagraphics.life-balance.desktop\tlbd\napplication/vnd.llamagraphics.life-balance.exchange+xml\tlbe\napplication/vnd.lotus-1-2-3\t\t\t123\napplication/vnd.lotus-approach\t\t\tapr\napplication/vnd.lotus-freelance\t\t\tpre\napplication/vnd.lotus-notes\t\t\tnsf\napplication/vnd.lotus-organizer\t\t\torg\napplication/vnd.lotus-screencam\t\t\tscm\napplication/vnd.lotus-wordpro\t\t\tlwp\napplication/vnd.macports.portpkg\t\tportpkg\napplication/vnd.mcd\t\t\t\tmcd\napplication/vnd.medcalcdata\t\t\tmc1\napplication/vnd.mediastation.cdkey\t\tcdkey\napplication/vnd.mfer\t\t\t\tmwf\napplication/vnd.mfmp\t\t\t\tmfm\napplication/vnd.micrografx.flo\t\t\tflo\napplication/vnd.micrografx.igx\t\t\tigx\napplication/vnd.mif\t\t\t\tmif\napplication/vnd.mobius.daf\t\t\tdaf\napplication/vnd.mobius.dis\t\t\tdis\napplication/vnd.mobius.mbk\t\t\tmbk\napplication/vnd.mobius.mqy\t\t\tmqy\napplication/vnd.mobius.msl\t\t\tmsl\napplication/vnd.mobius.plc\t\t\tplc\napplication/vnd.mobius.txf\t\t\ttxf\napplication/vnd.mophun.application\t\tmpn\napplication/vnd.mophun.certificate\t\tmpc\napplication/vnd.mozilla.xul+xml\t\t\txul\napplication/vnd.ms-artgalry\t\t\tcil\napplication/vnd.ms-cab-compressed\t\tcab\napplication/vnd.ms-excel\t\t\txls xlm xla xlc xlt xlw\napplication/vnd.ms-excel.addin.macroenabled.12\t\txlam\napplication/vnd.ms-excel.sheet.binary.macroenabled.12\txlsb\napplication/vnd.ms-excel.sheet.macroenabled.12\t\txlsm\napplication/vnd.ms-excel.template.macroenabled.12\txltm\napplication/vnd.ms-fontobject\t\t\teot\napplication/vnd.ms-htmlhelp\t\t\tchm\napplication/vnd.ms-ims\t\t\t\tims\napplication/vnd.ms-lrm\t\t\t\tlrm\napplication/vnd.ms-officetheme\t\t\tthmx\napplication/vnd.ms-pki.seccat\t\t\tcat\napplication/vnd.ms-pki.stl\t\t\tstl\napplication/vnd.ms-powerpoint\t\t\tppt pps pot\napplication/vnd.ms-powerpoint.addin.macroenabled.12\t\tppam\napplication/vnd.ms-powerpoint.presentation.macroenabled.12\tpptm\napplication/vnd.ms-powerpoint.slide.macroenabled.12\t\tsldm\napplication/vnd.ms-powerpoint.slideshow.macroenabled.12\t\tppsm\napplication/vnd.ms-powerpoint.template.macroenabled.12\t\tpotm\napplication/vnd.ms-project\t\t\tmpp mpt\napplication/vnd.ms-word.document.macroenabled.12\tdocm\napplication/vnd.ms-word.template.macroenabled.12\tdotm\napplication/vnd.ms-works\t\t\twps wks wcm wdb\napplication/vnd.ms-wpl\t\t\t\twpl\napplication/vnd.ms-xpsdocument\t\t\txps\napplication/vnd.mseq\t\t\t\tmseq\napplication/vnd.musician\t\t\tmus\napplication/vnd.muvee.style\t\t\tmsty\napplication/vnd.mynfc\t\t\t\ttaglet\napplication/vnd.neurolanguage.nlu\t\tnlu\napplication/vnd.nitf\t\t\t\tntf nitf\napplication/vnd.noblenet-directory\t\tnnd\napplication/vnd.noblenet-sealer\t\t\tnns\napplication/vnd.noblenet-web\t\t\tnnw\napplication/vnd.nokia.n-gage.data\t\tngdat\napplication/vnd.nokia.n-gage.symbian.install\tn-gage\napplication/vnd.nokia.radio-preset\t\trpst\napplication/vnd.nokia.radio-presets\t\trpss\napplication/vnd.novadigm.edm\t\t\tedm\napplication/vnd.novadigm.edx\t\t\tedx\napplication/vnd.novadigm.ext\t\t\text\napplication/vnd.oasis.opendocument.chart\t\todc\napplication/vnd.oasis.opendocument.chart-template\totc\napplication/vnd.oasis.opendocument.database\t\todb\napplication/vnd.oasis.opendocument.formula\t\todf\napplication/vnd.oasis.opendocument.formula-template\todft\napplication/vnd.oasis.opendocument.graphics\t\todg\napplication/vnd.oasis.opendocument.graphics-template\totg\napplication/vnd.oasis.opendocument.image\t\todi\napplication/vnd.oasis.opendocument.image-template\toti\napplication/vnd.oasis.opendocument.presentation\t\todp\napplication/vnd.oasis.opendocument.presentation-template\totp\napplication/vnd.oasis.opendocument.spreadsheet\t\tods\napplication/vnd.oasis.opendocument.spreadsheet-template\tots\napplication/vnd.oasis.opendocument.text\t\t\todt\napplication/vnd.oasis.opendocument.text-master\t\todm\napplication/vnd.oasis.opendocument.text-template\tott\napplication/vnd.oasis.opendocument.text-web\t\toth\napplication/vnd.olpc-sugar\t\t\txo\napplication/vnd.oma.dd2+xml\t\t\tdd2\napplication/vnd.openofficeorg.extension\t\toxt\napplication/vnd.openxmlformats-officedocument.presentationml.presentation\tpptx\napplication/vnd.openxmlformats-officedocument.presentationml.slide\tsldx\napplication/vnd.openxmlformats-officedocument.presentationml.slideshow\tppsx\napplication/vnd.openxmlformats-officedocument.presentationml.template\tpotx\napplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet\txlsx\napplication/vnd.openxmlformats-officedocument.spreadsheetml.template\txltx\napplication/vnd.openxmlformats-officedocument.wordprocessingml.document\tdocx\napplication/vnd.openxmlformats-officedocument.wordprocessingml.template\tdotx\napplication/vnd.osgeo.mapguide.package\t\tmgp\napplication/vnd.osgi.dp\t\t\t\tdp\napplication/vnd.osgi.subsystem\t\t\tesa\napplication/vnd.palm\t\t\t\tpdb pqa oprc\napplication/vnd.pawaafile\t\t\tpaw\napplication/vnd.pg.format\t\t\tstr\napplication/vnd.pg.osasli\t\t\tei6\napplication/vnd.picsel\t\t\t\tefif\napplication/vnd.pmi.widget\t\t\twg\napplication/vnd.pocketlearn\t\t\tplf\napplication/vnd.powerbuilder6\t\t\tpbd\napplication/vnd.previewsystems.box\t\tbox\napplication/vnd.proteus.magazine\t\tmgz\napplication/vnd.publishare-delta-tree\t\tqps\napplication/vnd.pvi.ptid1\t\t\tptid\napplication/vnd.quark.quarkxpress\t\tqxd qxt qwd qwt qxl qxb\napplication/vnd.realvnc.bed\t\t\tbed\napplication/vnd.recordare.musicxml\t\tmxl\napplication/vnd.recordare.musicxml+xml\t\tmusicxml\napplication/vnd.rig.cryptonote\t\t\tcryptonote\napplication/vnd.rim.cod\t\t\t\tcod\napplication/vnd.rn-realmedia\t\t\trm\napplication/vnd.rn-realmedia-vbr\t\trmvb\napplication/vnd.route66.link66+xml\t\tlink66\napplication/vnd.sailingtracker.track\t\tst\napplication/vnd.seemail\t\t\t\tsee\napplication/vnd.sema\t\t\t\tsema\napplication/vnd.semd\t\t\t\tsemd\napplication/vnd.semf\t\t\t\tsemf\napplication/vnd.shana.informed.formdata\t\tifm\napplication/vnd.shana.informed.formtemplate\titp\napplication/vnd.shana.informed.interchange\tiif\napplication/vnd.shana.informed.package\t\tipk\napplication/vnd.simtech-mindmapper\t\ttwd twds\napplication/vnd.smaf\t\t\t\tmmf\napplication/vnd.smart.teacher\t\t\tteacher\napplication/vnd.solent.sdkm+xml\t\t\tsdkm sdkd\napplication/vnd.spotfire.dxp\t\t\tdxp\napplication/vnd.spotfire.sfs\t\t\tsfs\napplication/vnd.stardivision.calc\t\tsdc\napplication/vnd.stardivision.draw\t\tsda\napplication/vnd.stardivision.impress\t\tsdd\napplication/vnd.stardivision.math\t\tsmf\napplication/vnd.stardivision.writer\t\tsdw vor\napplication/vnd.stardivision.writer-global\tsgl\napplication/vnd.stepmania.package\t\tsmzip\napplication/vnd.stepmania.stepchart\t\tsm\napplication/vnd.sun.xml.calc\t\t\tsxc\napplication/vnd.sun.xml.calc.template\t\tstc\napplication/vnd.sun.xml.draw\t\t\tsxd\napplication/vnd.sun.xml.draw.template\t\tstd\napplication/vnd.sun.xml.impress\t\t\tsxi\napplication/vnd.sun.xml.impress.template\tsti\napplication/vnd.sun.xml.math\t\t\tsxm\napplication/vnd.sun.xml.writer\t\t\tsxw\napplication/vnd.sun.xml.writer.global\t\tsxg\napplication/vnd.sun.xml.writer.template\t\tstw\napplication/vnd.sus-calendar\t\t\tsus susp\napplication/vnd.svd\t\t\t\tsvd\napplication/vnd.symbian.install\t\t\tsis sisx\napplication/vnd.syncml+xml\t\t\txsm\napplication/vnd.syncml.dm+wbxml\t\t\tbdm\napplication/vnd.syncml.dm+xml\t\t\txdm\napplication/vnd.tao.intent-module-archive\ttao\napplication/vnd.tcpdump.pcap\t\t\tpcap cap dmp\napplication/vnd.tmobile-livetv\t\t\ttmo\napplication/vnd.trid.tpt\t\t\ttpt\napplication/vnd.triscape.mxs\t\t\tmxs\napplication/vnd.trueapp\t\t\t\ttra\napplication/vnd.ufdl\t\t\t\tufd ufdl\napplication/vnd.uiq.theme\t\t\tutz\napplication/vnd.umajin\t\t\t\tumj\napplication/vnd.unity\t\t\t\tunityweb\napplication/vnd.uoml+xml\t\t\tuoml\napplication/vnd.vcx\t\t\t\tvcx\napplication/vnd.visio\t\t\t\tvsd vst vss vsw\napplication/vnd.visionary\t\t\tvis\napplication/vnd.vsf\t\t\t\tvsf\napplication/vnd.wap.wbxml\t\t\twbxml\napplication/vnd.wap.wmlc\t\t\twmlc\napplication/vnd.wap.wmlscriptc\t\t\twmlsc\napplication/vnd.webturbo\t\t\twtb\napplication/vnd.wolfram.player\t\t\tnbp\napplication/vnd.wordperfect\t\t\twpd\napplication/vnd.wqd\t\t\t\twqd\napplication/vnd.wt.stf\t\t\t\tstf\napplication/vnd.xara\t\t\t\txar\napplication/vnd.xfdl\t\t\t\txfdl\napplication/vnd.yamaha.hv-dic\t\t\thvd\napplication/vnd.yamaha.hv-script\t\thvs\napplication/vnd.yamaha.hv-voice\t\t\thvp\napplication/vnd.yamaha.openscoreformat\t\t\tosf\napplication/vnd.yamaha.openscoreformat.osfpvg+xml\tosfpvg\napplication/vnd.yamaha.smaf-audio\t\tsaf\napplication/vnd.yamaha.smaf-phrase\t\tspf\napplication/vnd.yellowriver-custom-menu\t\tcmp\napplication/vnd.zul\t\t\t\tzir zirz\napplication/vnd.zzazz.deck+xml\t\t\tzaz\napplication/voicexml+xml\t\t\tvxml\napplication/wasm\t\t\t\twasm\napplication/widget\t\t\t\twgt\napplication/winhlp\t\t\t\thlp\napplication/wsdl+xml\t\t\t\twsdl\napplication/wspolicy+xml\t\t\twspolicy\napplication/x-7z-compressed\t\t\t7z\napplication/x-abiword\t\t\t\tabw\napplication/x-ace-compressed\t\t\tace\napplication/x-apple-diskimage\t\t\tdmg\napplication/x-authorware-bin\t\t\taab x32 u32 vox\napplication/x-authorware-map\t\t\taam\napplication/x-authorware-seg\t\t\taas\napplication/x-bcpio\t\t\t\tbcpio\napplication/x-bittorrent\t\t\ttorrent\napplication/x-blorb\t\t\t\tblb blorb\napplication/x-bzip\t\t\t\tbz\napplication/x-bzip2\t\t\t\tbz2 boz\napplication/x-cbr\t\t\t\tcbr cba cbt cbz cb7\napplication/x-cdlink\t\t\t\tvcd\napplication/x-cfs-compressed\t\t\tcfs\napplication/x-chat\t\t\t\tchat\napplication/x-chess-pgn\t\t\t\tpgn\napplication/x-conference\t\t\tnsc\napplication/x-cpio\t\t\t\tcpio\napplication/x-csh\t\t\t\tcsh\napplication/x-debian-package\t\t\tdeb udeb\napplication/x-dgc-compressed\t\t\tdgc\napplication/x-director\t\t\tdir dcr dxr cst cct cxt w3d fgd swa\napplication/x-doom\t\t\t\twad\napplication/x-dtbncx+xml\t\t\tncx\napplication/x-dtbook+xml\t\t\tdtb\napplication/x-dtbresource+xml\t\t\tres\napplication/x-dvi\t\t\t\tdvi\napplication/x-envoy\t\t\t\tevy\napplication/x-eva\t\t\t\teva\napplication/x-font-bdf\t\t\t\tbdf\napplication/x-font-ghostscript\t\t\tgsf\napplication/x-font-linux-psf\t\t\tpsf\napplication/x-font-pcf\t\t\t\tpcf\napplication/x-font-snf\t\t\t\tsnf\napplication/x-font-type1\t\t\tpfa pfb pfm afm\napplication/x-freearc\t\t\t\tarc\napplication/x-futuresplash\t\t\tspl\napplication/x-gca-compressed\t\t\tgca\napplication/x-glulx\t\t\t\tulx\napplication/x-gnumeric\t\t\t\tgnumeric\napplication/x-gramps-xml\t\t\tgramps\napplication/x-gtar\t\t\t\tgtar\napplication/x-hdf\t\t\t\thdf\napplication/x-install-instructions\t\tinstall\napplication/x-iso9660-image\t\t\tiso\napplication/x-java-jnlp-file\t\t\tjnlp\napplication/x-latex\t\t\t\tlatex\napplication/x-lzh-compressed\t\t\tlzh lha\napplication/x-mie\t\t\t\tmie\napplication/x-mobipocket-ebook\t\t\tprc mobi\napplication/x-ms-application\t\t\tapplication\napplication/x-ms-shortcut\t\t\tlnk\napplication/x-ms-wmd\t\t\t\twmd\napplication/x-ms-wmz\t\t\t\twmz\napplication/x-ms-xbap\t\t\t\txbap\napplication/x-msaccess\t\t\t\tmdb\napplication/x-msbinder\t\t\t\tobd\napplication/x-mscardfile\t\t\tcrd\napplication/x-msclip\t\t\t\tclp\napplication/x-msdownload\t\t\texe dll com bat msi\napplication/x-msmediaview\t\t\tmvb m13 m14\napplication/x-msmetafile\t\t\twmf wmz emf emz\napplication/x-msmoney\t\t\t\tmny\napplication/x-mspublisher\t\t\tpub\napplication/x-msschedule\t\t\tscd\napplication/x-msterminal\t\t\ttrm\napplication/x-mswrite\t\t\t\twri\napplication/x-netcdf\t\t\t\tnc cdf\napplication/x-nzb\t\t\t\tnzb\napplication/x-pkcs12\t\t\t\tp12 pfx\napplication/x-pkcs7-certificates\t\tp7b spc\napplication/x-pkcs7-certreqresp\t\t\tp7r\napplication/x-rar-compressed\t\t\trar\napplication/x-research-info-systems\t\tris\napplication/x-sh\t\t\t\tsh\napplication/x-shar\t\t\t\tshar\napplication/x-shockwave-flash\t\t\tswf\napplication/x-silverlight-app\t\t\txap\napplication/x-sql\t\t\t\tsql\napplication/x-stuffit\t\t\t\tsit\napplication/x-stuffitx\t\t\t\tsitx\napplication/x-subrip\t\t\t\tsrt\napplication/x-sv4cpio\t\t\t\tsv4cpio\napplication/x-sv4crc\t\t\t\tsv4crc\napplication/x-t3vm-image\t\t\tt3\napplication/x-tads\t\t\t\tgam\napplication/x-tar\t\t\t\ttar\napplication/x-tcl\t\t\t\ttcl\napplication/x-tex\t\t\t\ttex\napplication/x-tex-tfm\t\t\t\ttfm\napplication/x-texinfo\t\t\t\ttexinfo texi\napplication/x-tgif\t\t\t\tobj\napplication/x-ustar\t\t\t\tustar\napplication/x-wais-source\t\t\tsrc\napplication/x-x509-ca-cert\t\t\tder crt\napplication/x-xfig\t\t\t\tfig\napplication/x-xliff+xml\t\t\t\txlf\napplication/x-xpinstall\t\t\t\txpi\napplication/x-xz\t\t\t\txz\napplication/x-zmachine\t\t\t\tz1 z2 z3 z4 z5 z6 z7 z8\napplication/xaml+xml\t\t\t\txaml\napplication/xcap-diff+xml\t\t\txdf\napplication/xenc+xml\t\t\t\txenc\napplication/xhtml+xml\t\t\t\txhtml xht\napplication/xml\t\t\t\t\txml xsl\napplication/xml-dtd\t\t\t\tdtd\napplication/xop+xml\t\t\t\txop\napplication/xproc+xml\t\t\t\txpl\napplication/xslt+xml\t\t\t\txslt\napplication/xspf+xml\t\t\t\txspf\napplication/xv+xml\t\t\t\tmxml xhvml xvml xvm\napplication/yang\t\t\t\tyang\napplication/yin+xml\t\t\t\tyin\napplication/zip\t\t\t\t\tzip\naudio/adpcm\t\t\t\t\tadp\naudio/basic\t\t\t\t\tau snd\naudio/midi\t\t\t\t\tmid midi kar rmi\naudio/mp4\t\t\t\t\tm4a mp4a\naudio/mpeg\t\t\t\t\tmpga mp2 mp2a mp3 m2a m3a\naudio/ogg\t\t\t\t\toga ogg spx\naudio/s3m\t\t\t\t\ts3m\naudio/silk\t\t\t\t\tsil\naudio/vnd.dece.audio\t\t\t\tuva uvva\naudio/vnd.digital-winds\t\t\t\teol\naudio/vnd.dra\t\t\t\t\tdra\naudio/vnd.dts\t\t\t\t\tdts\naudio/vnd.dts.hd\t\t\t\tdtshd\naudio/vnd.lucent.voice\t\t\t\tlvp\naudio/vnd.ms-playready.media.pya\t\tpya\naudio/vnd.nuera.ecelp4800\t\t\tecelp4800\naudio/vnd.nuera.ecelp7470\t\t\tecelp7470\naudio/vnd.nuera.ecelp9600\t\t\tecelp9600\naudio/vnd.rip\t\t\t\t\trip\naudio/webm\t\t\t\t\tweba\naudio/x-aac\t\t\t\t\taac\naudio/x-aiff\t\t\t\t\taif aiff aifc\naudio/x-caf\t\t\t\t\tcaf\naudio/x-flac\t\t\t\t\tflac\naudio/x-matroska\t\t\t\tmka\naudio/x-mpegurl\t\t\t\t\tm3u\naudio/x-ms-wax\t\t\t\t\twax\naudio/x-ms-wma\t\t\t\t\twma\naudio/x-pn-realaudio\t\t\t\tram ra\naudio/x-pn-realaudio-plugin\t\t\trmp\naudio/x-wav\t\t\t\t\twav\naudio/xm\t\t\t\t\txm\nchemical/x-cdx\t\t\t\t\tcdx\nchemical/x-cif\t\t\t\t\tcif\nchemical/x-cmdf\t\t\t\t\tcmdf\nchemical/x-cml\t\t\t\t\tcml\nchemical/x-csml\t\t\t\t\tcsml\nchemical/x-xyz\t\t\t\t\txyz\nfont/collection\t\t\t\t\tttc\nfont/otf\t\t\t\t\totf\nfont/ttf\t\t\t\t\tttf\nfont/woff\t\t\t\t\twoff\nfont/woff2\t\t\t\t\twoff2\nimage/bmp\t\t\t\t\tbmp\nimage/cgm\t\t\t\t\tcgm\nimage/g3fax\t\t\t\t\tg3\nimage/gif\t\t\t\t\tgif\nimage/ief\t\t\t\t\tief\nimage/jpeg\t\t\t\t\tjpeg jpg jpe\nimage/ktx\t\t\t\t\tktx\nimage/png\t\t\t\t\tpng\nimage/prs.btif\t\t\t\t\tbtif\nimage/sgi\t\t\t\t\tsgi\nimage/svg+xml\t\t\t\t\tsvg svgz\nimage/tiff\t\t\t\t\ttiff tif\nimage/vnd.adobe.photoshop\t\t\tpsd\nimage/vnd.dece.graphic\t\t\t\tuvi uvvi uvg uvvg\nimage/vnd.djvu\t\t\t\t\tdjvu djv\nimage/vnd.dvb.subtitle\t\t\t\tsub\nimage/vnd.dwg\t\t\t\t\tdwg\nimage/vnd.dxf\t\t\t\t\tdxf\nimage/vnd.fastbidsheet\t\t\t\tfbs\nimage/vnd.fpx\t\t\t\t\tfpx\nimage/vnd.fst\t\t\t\t\tfst\nimage/vnd.fujixerox.edmics-mmr\t\t\tmmr\nimage/vnd.fujixerox.edmics-rlc\t\t\trlc\nimage/vnd.ms-modi\t\t\t\tmdi\nimage/vnd.ms-photo\t\t\t\twdp\nimage/vnd.net-fpx\t\t\t\tnpx\nimage/vnd.wap.wbmp\t\t\t\twbmp\nimage/vnd.xiff\t\t\t\t\txif\nimage/webp\t\t\t\t\twebp\nimage/x-3ds\t\t\t\t\t3ds\nimage/x-cmu-raster\t\t\t\tras\nimage/x-cmx\t\t\t\t\tcmx\nimage/x-freehand\t\t\t\tfh fhc fh4 fh5 fh7\nimage/x-icon\t\t\t\t\tico\nimage/x-mrsid-image\t\t\t\tsid\nimage/x-pcx\t\t\t\t\tpcx\nimage/x-pict\t\t\t\t\tpic pct\nimage/x-portable-anymap\t\t\t\tpnm\nimage/x-portable-bitmap\t\t\t\tpbm\nimage/x-portable-graymap\t\t\tpgm\nimage/x-portable-pixmap\t\t\t\tppm\nimage/x-rgb\t\t\t\t\trgb\nimage/x-tga\t\t\t\t\ttga\nimage/x-xbitmap\t\t\t\t\txbm\nimage/x-xpixmap\t\t\t\t\txpm\nimage/x-xwindowdump\t\t\t\txwd\nmessage/rfc822\t\t\t\t\teml mime\nmodel/iges\t\t\t\t\tigs iges\nmodel/mesh\t\t\t\t\tmsh mesh silo\nmodel/vnd.collada+xml\t\t\t\tdae\nmodel/vnd.dwf\t\t\t\t\tdwf\nmodel/vnd.gdl\t\t\t\t\tgdl\nmodel/vnd.gtw\t\t\t\t\tgtw\nmodel/vnd.mts\t\t\t\t\tmts\nmodel/vnd.vtu\t\t\t\t\tvtu\nmodel/vrml\t\t\t\t\twrl vrml\nmodel/x3d+binary\t\t\t\tx3db x3dbz\nmodel/x3d+vrml\t\t\t\t\tx3dv x3dvz\nmodel/x3d+xml\t\t\t\t\tx3d x3dz\ntext/cache-manifest\t\t\t\tappcache\ntext/calendar\t\t\t\t\tics ifb\ntext/css\t\t\t\t\tcss\ntext/csv\t\t\t\t\tcsv\ntext/html\t\t\t\t\thtml htm\ntext/n3\t\t\t\t\t\tn3\ntext/plain\t\t\t\t\ttxt text conf def list log in\ntext/prs.lines.tag\t\t\t\tdsc\ntext/richtext\t\t\t\t\trtx\ntext/sgml\t\t\t\t\tsgml sgm\ntext/tab-separated-values\t\t\ttsv\ntext/troff\t\t\t\t\tt tr roff man me ms\ntext/turtle\t\t\t\t\tttl\ntext/uri-list\t\t\t\t\turi uris urls\ntext/vcard\t\t\t\t\tvcard\ntext/vnd.curl\t\t\t\t\tcurl\ntext/vnd.curl.dcurl\t\t\t\tdcurl\ntext/vnd.curl.mcurl\t\t\t\tmcurl\ntext/vnd.curl.scurl\t\t\t\tscurl\ntext/vnd.dvb.subtitle\t\t\t\tsub\ntext/vnd.fly\t\t\t\t\tfly\ntext/vnd.fmi.flexstor\t\t\t\tflx\ntext/vnd.graphviz\t\t\t\tgv\ntext/vnd.in3d.3dml\t\t\t\t3dml\ntext/vnd.in3d.spot\t\t\t\tspot\ntext/vnd.sun.j2me.app-descriptor\t\tjad\ntext/vnd.wap.wml\t\t\t\twml\ntext/vnd.wap.wmlscript\t\t\t\twmls\ntext/x-asm\t\t\t\t\ts asm\ntext/x-c\t\t\t\t\tc cc cxx cpp h hh dic\ntext/x-fortran\t\t\t\t\tf for f77 f90\ntext/x-java-source\t\t\t\tjava\ntext/x-nfo\t\t\t\t\tnfo\ntext/x-opml\t\t\t\t\topml\ntext/x-pascal\t\t\t\t\tp pas\ntext/x-setext\t\t\t\t\tetx\ntext/x-sfv\t\t\t\t\tsfv\ntext/x-uuencode\t\t\t\t\tuu\ntext/x-vcalendar\t\t\t\tvcs\ntext/x-vcard\t\t\t\t\tvcf\nvideo/3gpp\t\t\t\t\t3gp\nvideo/3gpp2\t\t\t\t\t3g2\nvideo/h261\t\t\t\t\th261\nvideo/h263\t\t\t\t\th263\nvideo/h264\t\t\t\t\th264\nvideo/jpeg\t\t\t\t\tjpgv\nvideo/jpm\t\t\t\t\tjpm jpgm\nvideo/mj2\t\t\t\t\tmj2 mjp2\nvideo/mp4\t\t\t\t\tmp4 mp4v mpg4\nvideo/mpeg\t\t\t\t\tmpeg mpg mpe m1v m2v\nvideo/ogg\t\t\t\t\togv\nvideo/quicktime\t\t\t\t\tqt mov\nvideo/vnd.dece.hd\t\t\t\tuvh uvvh\nvideo/vnd.dece.mobile\t\t\t\tuvm uvvm\nvideo/vnd.dece.pd\t\t\t\tuvp uvvp\nvideo/vnd.dece.sd\t\t\t\tuvs uvvs\nvideo/vnd.dece.video\t\t\t\tuvv uvvv\nvideo/vnd.dvb.file\t\t\t\tdvb\nvideo/vnd.fvt\t\t\t\t\tfvt\nvideo/vnd.mpegurl\t\t\t\tmxu m4u\nvideo/vnd.ms-playready.media.pyv\t\tpyv\nvideo/vnd.uvvu.mp4\t\t\t\tuvu uvvu\nvideo/vnd.vivo\t\t\t\t\tviv\nvideo/webm\t\t\t\t\twebm\nvideo/x-f4v\t\t\t\t\tf4v\nvideo/x-fli\t\t\t\t\tfli\nvideo/x-flv\t\t\t\t\tflv\nvideo/x-m4v\t\t\t\t\tm4v\nvideo/x-matroska\t\t\t\tmkv mk3d mks\nvideo/x-mng\t\t\t\t\tmng\nvideo/x-ms-asf\t\t\t\t\tasf asx\nvideo/x-ms-vob\t\t\t\t\tvob\nvideo/x-ms-wm\t\t\t\t\twm\nvideo/x-ms-wmv\t\t\t\t\twmv\nvideo/x-ms-wmx\t\t\t\t\twmx\nvideo/x-ms-wvx\t\t\t\t\twvx\nvideo/x-msvideo\t\t\t\t\tavi\nvideo/x-sgi-movie\t\t\t\tmovie\nvideo/x-smv\t\t\t\t\tsmv\nx-conference/x-cooltalk\t\t\t\tice\n";

const map = new Map();

mime_raw.split('\n').forEach((row) => {
	const match = /(.+?)\t+(.+)/.exec(row);
	if (!match) return;

	const type = match[1];
	const extensions = match[2].split(' ');

	extensions.forEach(ext => {
		map.set(ext, type);
	});
});

function lookup$1(file) {
	const match = /\.([^\.]+)$/.exec(file);
	return match && map.get(match[1]);
}

function middleware(opts


 = {}) {
	const { session, ignore } = opts;

	let emitted_basepath = false;

	return compose_handlers(ignore, [
		(req, res, next) => {
			if (req.baseUrl === undefined) {
				let { originalUrl } = req;
				if (req.url === '/' && originalUrl[originalUrl.length - 1] !== '/') {
					originalUrl += '/';
				}

				req.baseUrl = originalUrl
					? originalUrl.slice(0, -req.url.length)
					: '';
			}

			if (!emitted_basepath && process.send) {
				process.send({
					__sapper__: true,
					event: 'basepath',
					basepath: req.baseUrl
				});

				emitted_basepath = true;
			}

			if (req.path === undefined) {
				req.path = req.url.replace(/\?.*/, '');
			}

			next();
		},

		fs.existsSync(path.join(build_dir, 'service-worker.js')) && serve({
			pathname: '/service-worker.js',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		fs.existsSync(path.join(build_dir, 'service-worker.js.map')) && serve({
			pathname: '/service-worker.js.map',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		serve({
			prefix: '/client/',
			cache_control:  'no-cache' 
		}),

		get_server_route_handler(manifest.server_routes),

		get_page_handler(manifest, session || noop$1)
	].filter(Boolean));
}

function compose_handlers(ignore, handlers) {
	const total = handlers.length;

	function nth_handler(n, req, res, next) {
		if (n >= total) {
			return next();
		}

		handlers[n](req, res, () => nth_handler(n+1, req, res, next));
	}

	return !ignore
		? (req, res, next) => nth_handler(0, req, res, next)
		: (req, res, next) => {
			if (should_ignore(req.path, ignore)) {
				next();
			} else {
				nth_handler(0, req, res, next);
			}
		};
}

function should_ignore(uri, val) {
	if (Array.isArray(val)) return val.some(x => should_ignore(uri, x));
	if (val instanceof RegExp) return val.test(uri);
	if (typeof val === 'function') return val(uri);
	return uri.startsWith(val.charCodeAt(0) === 47 ? val : `/${val}`);
}

function serve({ prefix, pathname, cache_control }



) {
	const filter = pathname
		? (req) => req.path === pathname
		: (req) => req.path.startsWith(prefix);

	const read =  (file) => fs.readFileSync(path.resolve(build_dir, file))
		;

	return (req, res, next) => {
		if (filter(req)) {
			const type = lookup$1(req.path);

			try {
				const file = decodeURIComponent(req.path.slice(1));
				const data = read(file);

				res.setHeader('Content-Type', type);
				res.setHeader('Cache-Control', cache_control);
				res.end(data);
			} catch (err) {
				res.statusCode = 404;
				res.end('not found');
			}
		} else {
			next();
		}
	};
}

function noop$1(){}

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2Jsb2cvX3Bvc3RzLmpzIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9ibG9nL2luZGV4Lmpzb24uanMiLCIuLi8uLi8uLi9zcmMvcm91dGVzL2Jsb2cvW3NsdWddLmpzb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlL2ludGVybmFsL2luZGV4Lm1qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3Byb2plY3RzL0ltYWdlLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2hlbHBlci1jb21wb25lbnRzL1RleHRBbmltYXRpb24uc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcHJvamVjdHMvVGV4dC5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0cy9Qcm9qZWN0cy5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9leHBlcmllbmNlL0xvZ29UZXh0LnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtZGV0YWlsL1BhZ2VUaXRsZS5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWRldGFpbC9Ub3BCYXIuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvRGVzY3JpcHRpb24uc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvQ2Fyb3VzZWwuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9wcm9qZWN0cy9jcmVhdGl2ZS1yZXZvbHQuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYWJvdXQvUGFnZVRpdGxlLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvYWJvdXQuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9ibG9nL2luZGV4LnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvYmxvZy9bc2x1Z10uc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvbmF2aWdhdGlvbi9IYW1idXJnZXIuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvbW9kYWxzL01vZGFsVGVtcGxhdGUuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvbW9kYWxzL0NvbnRhY3RNb2RhbC5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9uYXZpZ2F0aW9uL05hdmlnYXRpb24uc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZm9vdGVyL0Zvb3Rlci5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvcm91dGVzL19lcnJvci5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvbm9kZV9tb2R1bGVzL0BzYXBwZXIvaW50ZXJuYWwvbWFuaWZlc3Qtc2VydmVyLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3RvcmUvaW5kZXgubWpzIiwiLi4vLi4vLi4vc3JjL25vZGVfbW9kdWxlcy9Ac2FwcGVyL2ludGVybmFsL3NoYXJlZC5tanMiLCIuLi8uLi8uLi9zcmMvbm9kZV9tb2R1bGVzL0BzYXBwZXIvaW50ZXJuYWwvQXBwLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9zZXJ2ZXIubWpzIiwiLi4vLi4vLi4vc3JjL3NlcnZlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBPcmRpbmFyaWx5LCB5b3UnZCBnZW5lcmF0ZSB0aGlzIGRhdGEgZnJvbSBtYXJrZG93biBmaWxlcyBpbiB5b3VyXG4vLyByZXBvLCBvciBmZXRjaCB0aGVtIGZyb20gYSBkYXRhYmFzZSBvZiBzb21lIGtpbmQuIEJ1dCBpbiBvcmRlciB0b1xuLy8gYXZvaWQgdW5uZWNlc3NhcnkgZGVwZW5kZW5jaWVzIGluIHRoZSBzdGFydGVyIHRlbXBsYXRlLCBhbmQgaW4gdGhlXG4vLyBzZXJ2aWNlIG9mIG9idmlvdXNuZXNzLCB3ZSdyZSBqdXN0IGdvaW5nIHRvIGxlYXZlIGl0IGhlcmUuXG5cbi8vIFRoaXMgZmlsZSBpcyBjYWxsZWQgYF9wb3N0cy5qc2AgcmF0aGVyIHRoYW4gYHBvc3RzLmpzYCwgYmVjYXVzZVxuLy8gd2UgZG9uJ3Qgd2FudCB0byBjcmVhdGUgYW4gYC9ibG9nL3Bvc3RzYCByb3V0ZSDigJQgdGhlIGxlYWRpbmdcbi8vIHVuZGVyc2NvcmUgdGVsbHMgU2FwcGVyIG5vdCB0byBkbyB0aGF0LlxuXG5jb25zdCBwb3N0cyA9IFtcblx0e1xuXHRcdHRpdGxlOiAnV2hhdCBpcyBTYXBwZXI/Jyxcblx0XHRzbHVnOiAnd2hhdC1pcy1zYXBwZXInLFxuXHRcdGh0bWw6IGBcblx0XHRcdDxwPkZpcnN0LCB5b3UgaGF2ZSB0byBrbm93IHdoYXQgPGEgaHJlZj0naHR0cHM6Ly9zdmVsdGUuZGV2Jz5TdmVsdGU8L2E+IGlzLiBTdmVsdGUgaXMgYSBVSSBmcmFtZXdvcmsgd2l0aCBhIGJvbGQgbmV3IGlkZWE6IHJhdGhlciB0aGFuIHByb3ZpZGluZyBhIGxpYnJhcnkgdGhhdCB5b3Ugd3JpdGUgY29kZSB3aXRoIChsaWtlIFJlYWN0IG9yIFZ1ZSwgZm9yIGV4YW1wbGUpLCBpdCdzIGEgY29tcGlsZXIgdGhhdCB0dXJucyB5b3VyIGNvbXBvbmVudHMgaW50byBoaWdobHkgb3B0aW1pemVkIHZhbmlsbGEgSmF2YVNjcmlwdC4gSWYgeW91IGhhdmVuJ3QgYWxyZWFkeSByZWFkIHRoZSA8YSBocmVmPSdodHRwczovL3N2ZWx0ZS5kZXYvYmxvZy9mcmFtZXdvcmtzLXdpdGhvdXQtdGhlLWZyYW1ld29yayc+aW50cm9kdWN0b3J5IGJsb2cgcG9zdDwvYT4sIHlvdSBzaG91bGQhPC9wPlxuXG5cdFx0XHQ8cD5TYXBwZXIgaXMgYSBOZXh0LmpzLXN0eWxlIGZyYW1ld29yayAoPGEgaHJlZj0nYmxvZy9ob3ctaXMtc2FwcGVyLWRpZmZlcmVudC1mcm9tLW5leHQnPm1vcmUgb24gdGhhdCBoZXJlPC9hPikgYnVpbHQgYXJvdW5kIFN2ZWx0ZS4gSXQgbWFrZXMgaXQgZW1iYXJyYXNzaW5nbHkgZWFzeSB0byBjcmVhdGUgZXh0cmVtZWx5IGhpZ2ggcGVyZm9ybWFuY2Ugd2ViIGFwcHMuIE91dCBvZiB0aGUgYm94LCB5b3UgZ2V0OjwvcD5cblxuXHRcdFx0PHVsPlxuXHRcdFx0XHQ8bGk+Q29kZS1zcGxpdHRpbmcsIGR5bmFtaWMgaW1wb3J0cyBhbmQgaG90IG1vZHVsZSByZXBsYWNlbWVudCwgcG93ZXJlZCBieSB3ZWJwYWNrPC9saT5cblx0XHRcdFx0PGxpPlNlcnZlci1zaWRlIHJlbmRlcmluZyAoU1NSKSB3aXRoIGNsaWVudC1zaWRlIGh5ZHJhdGlvbjwvbGk+XG5cdFx0XHRcdDxsaT5TZXJ2aWNlIHdvcmtlciBmb3Igb2ZmbGluZSBzdXBwb3J0LCBhbmQgYWxsIHRoZSBQV0EgYmVsbHMgYW5kIHdoaXN0bGVzPC9saT5cblx0XHRcdFx0PGxpPlRoZSBuaWNlc3QgZGV2ZWxvcG1lbnQgZXhwZXJpZW5jZSB5b3UndmUgZXZlciBoYWQsIG9yIHlvdXIgbW9uZXkgYmFjazwvbGk+XG5cdFx0XHQ8L3VsPlxuXG5cdFx0XHQ8cD5JdCdzIGltcGxlbWVudGVkIGFzIEV4cHJlc3MgbWlkZGxld2FyZS4gRXZlcnl0aGluZyBpcyBzZXQgdXAgYW5kIHdhaXRpbmcgZm9yIHlvdSB0byBnZXQgc3RhcnRlZCwgYnV0IHlvdSBrZWVwIGNvbXBsZXRlIGNvbnRyb2wgb3ZlciB0aGUgc2VydmVyLCBzZXJ2aWNlIHdvcmtlciwgd2VicGFjayBjb25maWcgYW5kIGV2ZXJ5dGhpbmcgZWxzZSwgc28gaXQncyBhcyBmbGV4aWJsZSBhcyB5b3UgbmVlZCBpdCB0byBiZS48L3A+XG5cdFx0YFxuXHR9LFxuXG5cdHtcblx0XHR0aXRsZTogJ0hvdyB0byB1c2UgU2FwcGVyJyxcblx0XHRzbHVnOiAnaG93LXRvLXVzZS1zYXBwZXInLFxuXHRcdGh0bWw6IGBcblx0XHRcdDxoMj5TdGVwIG9uZTwvaDI+XG5cdFx0XHQ8cD5DcmVhdGUgYSBuZXcgcHJvamVjdCwgdXNpbmcgPGEgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL1JpY2gtSGFycmlzL2RlZ2l0Jz5kZWdpdDwvYT46PC9wPlxuXG5cdFx0XHQ8cHJlPjxjb2RlPm5weCBkZWdpdCBcInN2ZWx0ZWpzL3NhcHBlci10ZW1wbGF0ZSNyb2xsdXBcIiBteS1hcHBcblx0XHRcdGNkIG15LWFwcFxuXHRcdFx0bnBtIGluc3RhbGwgIyBvciB5YXJuIVxuXHRcdFx0bnBtIHJ1biBkZXZcblx0XHRcdDwvY29kZT48L3ByZT5cblxuXHRcdFx0PGgyPlN0ZXAgdHdvPC9oMj5cblx0XHRcdDxwPkdvIHRvIDxhIGhyZWY9J2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCc+bG9jYWxob3N0OjMwMDA8L2E+LiBPcGVuIDxjb2RlPm15LWFwcDwvY29kZT4gaW4geW91ciBlZGl0b3IuIEVkaXQgdGhlIGZpbGVzIGluIHRoZSA8Y29kZT5zcmMvcm91dGVzPC9jb2RlPiBkaXJlY3Rvcnkgb3IgYWRkIG5ldyBvbmVzLjwvcD5cblxuXHRcdFx0PGgyPlN0ZXAgdGhyZWU8L2gyPlxuXHRcdFx0PHA+Li4uPC9wPlxuXG5cdFx0XHQ8aDI+U3RlcCBmb3VyPC9oMj5cblx0XHRcdDxwPlJlc2lzdCBvdmVyZG9uZSBqb2tlIGZvcm1hdHMuPC9wPlxuXHRcdGBcblx0fSxcblxuXHR7XG5cdFx0dGl0bGU6ICdXaHkgdGhlIG5hbWU/Jyxcblx0XHRzbHVnOiAnd2h5LXRoZS1uYW1lJyxcblx0XHRodG1sOiBgXG5cdFx0XHQ8cD5JbiB3YXIsIHRoZSBzb2xkaWVycyB3aG8gYnVpbGQgYnJpZGdlcywgcmVwYWlyIHJvYWRzLCBjbGVhciBtaW5lZmllbGRzIGFuZCBjb25kdWN0IGRlbW9saXRpb25zIOKAlCBhbGwgdW5kZXIgY29tYmF0IGNvbmRpdGlvbnMg4oCUIGFyZSBrbm93biBhcyA8ZW0+c2FwcGVyczwvZW0+LjwvcD5cblxuXHRcdFx0PHA+Rm9yIHdlYiBkZXZlbG9wZXJzLCB0aGUgc3Rha2VzIGFyZSBnZW5lcmFsbHkgbG93ZXIgdGhhbiB0aG9zZSBmb3IgY29tYmF0IGVuZ2luZWVycy4gQnV0IHdlIGZhY2Ugb3VyIG93biBob3N0aWxlIGVudmlyb25tZW50OiB1bmRlcnBvd2VyZWQgZGV2aWNlcywgcG9vciBuZXR3b3JrIGNvbm5lY3Rpb25zLCBhbmQgdGhlIGNvbXBsZXhpdHkgaW5oZXJlbnQgaW4gZnJvbnQtZW5kIGVuZ2luZWVyaW5nLiBTYXBwZXIsIHdoaWNoIGlzIHNob3J0IGZvciA8c3Ryb25nPlM8L3N0cm9uZz52ZWx0ZSA8c3Ryb25nPmFwcDwvc3Ryb25nPiBtYWs8c3Ryb25nPmVyPC9zdHJvbmc+LCBpcyB5b3VyIGNvdXJhZ2VvdXMgYW5kIGR1dGlmdWwgYWxseS48L3A+XG5cdFx0YFxuXHR9LFxuXG5cdHtcblx0XHR0aXRsZTogJ0hvdyBpcyBTYXBwZXIgZGlmZmVyZW50IGZyb20gTmV4dC5qcz8nLFxuXHRcdHNsdWc6ICdob3ctaXMtc2FwcGVyLWRpZmZlcmVudC1mcm9tLW5leHQnLFxuXHRcdGh0bWw6IGBcblx0XHRcdDxwPjxhIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS96ZWl0L25leHQuanMnPk5leHQuanM8L2E+IGlzIGEgUmVhY3QgZnJhbWV3b3JrIGZyb20gPGEgaHJlZj0naHR0cHM6Ly96ZWl0LmNvJz5aZWl0PC9hPiwgYW5kIGlzIHRoZSBpbnNwaXJhdGlvbiBmb3IgU2FwcGVyLiBUaGVyZSBhcmUgYSBmZXcgbm90YWJsZSBkaWZmZXJlbmNlcywgaG93ZXZlcjo8L3A+XG5cblx0XHRcdDx1bD5cblx0XHRcdFx0PGxpPkl0J3MgcG93ZXJlZCBieSA8YSBocmVmPSdodHRwczovL3N2ZWx0ZS5kZXYnPlN2ZWx0ZTwvYT4gaW5zdGVhZCBvZiBSZWFjdCwgc28gaXQncyBmYXN0ZXIgYW5kIHlvdXIgYXBwcyBhcmUgc21hbGxlcjwvbGk+XG5cdFx0XHRcdDxsaT5JbnN0ZWFkIG9mIHJvdXRlIG1hc2tpbmcsIHdlIGVuY29kZSByb3V0ZSBwYXJhbWV0ZXJzIGluIGZpbGVuYW1lcy4gRm9yIGV4YW1wbGUsIHRoZSBwYWdlIHlvdSdyZSBsb29raW5nIGF0IHJpZ2h0IG5vdyBpcyA8Y29kZT5zcmMvcm91dGVzL2Jsb2cvW3NsdWddLmh0bWw8L2NvZGU+PC9saT5cblx0XHRcdFx0PGxpPkFzIHdlbGwgYXMgcGFnZXMgKFN2ZWx0ZSBjb21wb25lbnRzLCB3aGljaCByZW5kZXIgb24gc2VydmVyIG9yIGNsaWVudCksIHlvdSBjYW4gY3JlYXRlIDxlbT5zZXJ2ZXIgcm91dGVzPC9lbT4gaW4geW91ciA8Y29kZT5yb3V0ZXM8L2NvZGU+IGRpcmVjdG9yeS4gVGhlc2UgYXJlIGp1c3QgPGNvZGU+LmpzPC9jb2RlPiBmaWxlcyB0aGF0IGV4cG9ydCBmdW5jdGlvbnMgY29ycmVzcG9uZGluZyB0byBIVFRQIG1ldGhvZHMsIGFuZCByZWNlaXZlIEV4cHJlc3MgPGNvZGU+cmVxdWVzdDwvY29kZT4gYW5kIDxjb2RlPnJlc3BvbnNlPC9jb2RlPiBvYmplY3RzIGFzIGFyZ3VtZW50cy4gVGhpcyBtYWtlcyBpdCB2ZXJ5IGVhc3kgdG8sIGZvciBleGFtcGxlLCBhZGQgYSBKU09OIEFQSSBzdWNoIGFzIHRoZSBvbmUgPGEgaHJlZj0nYmxvZy9ob3ctaXMtc2FwcGVyLWRpZmZlcmVudC1mcm9tLW5leHQuanNvbic+cG93ZXJpbmcgdGhpcyB2ZXJ5IHBhZ2U8L2E+PC9saT5cblx0XHRcdFx0PGxpPkxpbmtzIGFyZSBqdXN0IDxjb2RlPiZsdDthJmd0OzwvY29kZT4gZWxlbWVudHMsIHJhdGhlciB0aGFuIGZyYW1ld29yay1zcGVjaWZpYyA8Y29kZT4mbHQ7TGluayZndDs8L2NvZGU+IGNvbXBvbmVudHMuIFRoYXQgbWVhbnMsIGZvciBleGFtcGxlLCB0aGF0IDxhIGhyZWY9J2Jsb2cvaG93LWNhbi1pLWdldC1pbnZvbHZlZCc+dGhpcyBsaW5rIHJpZ2h0IGhlcmU8L2E+LCBkZXNwaXRlIGJlaW5nIGluc2lkZSBhIGJsb2Igb2YgSFRNTCwgd29ya3Mgd2l0aCB0aGUgcm91dGVyIGFzIHlvdSdkIGV4cGVjdC48L2xpPlxuXHRcdFx0PC91bD5cblx0XHRgXG5cdH0sXG5cblx0e1xuXHRcdHRpdGxlOiAnSG93IGNhbiBJIGdldCBpbnZvbHZlZD8nLFxuXHRcdHNsdWc6ICdob3ctY2FuLWktZ2V0LWludm9sdmVkJyxcblx0XHRodG1sOiBgXG5cdFx0XHQ8cD5XZSdyZSBzbyBnbGFkIHlvdSBhc2tlZCEgQ29tZSBvbiBvdmVyIHRvIHRoZSA8YSBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMvc3ZlbHRlJz5TdmVsdGU8L2E+IGFuZCA8YSBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMvc2FwcGVyJz5TYXBwZXI8L2E+IHJlcG9zLCBhbmQgam9pbiB1cyBpbiB0aGUgPGEgaHJlZj0naHR0cHM6Ly9zdmVsdGUuZGV2L2NoYXQnPkRpc2NvcmQgY2hhdHJvb208L2E+LiBFdmVyeW9uZSBpcyB3ZWxjb21lLCBlc3BlY2lhbGx5IHlvdSE8L3A+XG5cdFx0YFxuXHR9XG5dO1xuXG5wb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuXHRwb3N0Lmh0bWwgPSBwb3N0Lmh0bWwucmVwbGFjZSgvXlxcdHszfS9nbSwgJycpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHBvc3RzO1xuIiwiaW1wb3J0IHBvc3RzIGZyb20gJy4vX3Bvc3RzLmpzJztcblxuY29uc3QgY29udGVudHMgPSBKU09OLnN0cmluZ2lmeShwb3N0cy5tYXAocG9zdCA9PiB7XG5cdHJldHVybiB7XG5cdFx0dGl0bGU6IHBvc3QudGl0bGUsXG5cdFx0c2x1ZzogcG9zdC5zbHVnXG5cdH07XG59KSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXQocmVxLCByZXMpIHtcblx0cmVzLndyaXRlSGVhZCgyMDAsIHtcblx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdH0pO1xuXG5cdHJlcy5lbmQoY29udGVudHMpO1xufSIsImltcG9ydCBwb3N0cyBmcm9tICcuL19wb3N0cy5qcyc7XG5cbmNvbnN0IGxvb2t1cCA9IG5ldyBNYXAoKTtcbnBvc3RzLmZvckVhY2gocG9zdCA9PiB7XG5cdGxvb2t1cC5zZXQocG9zdC5zbHVnLCBKU09OLnN0cmluZ2lmeShwb3N0KSk7XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldChyZXEsIHJlcywgbmV4dCkge1xuXHQvLyB0aGUgYHNsdWdgIHBhcmFtZXRlciBpcyBhdmFpbGFibGUgYmVjYXVzZVxuXHQvLyB0aGlzIGZpbGUgaXMgY2FsbGVkIFtzbHVnXS5qc29uLmpzXG5cdGNvbnN0IHsgc2x1ZyB9ID0gcmVxLnBhcmFtcztcblxuXHRpZiAobG9va3VwLmhhcyhzbHVnKSkge1xuXHRcdHJlcy53cml0ZUhlYWQoMjAwLCB7XG5cdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0fSk7XG5cblx0XHRyZXMuZW5kKGxvb2t1cC5nZXQoc2x1ZykpO1xuXHR9IGVsc2Uge1xuXHRcdHJlcy53cml0ZUhlYWQoNDA0LCB7XG5cdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0fSk7XG5cblx0XHRyZXMuZW5kKEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdG1lc3NhZ2U6IGBOb3QgZm91bmRgXG5cdFx0fSkpO1xuXHR9XG59XG4iLCJmdW5jdGlvbiBub29wKCkgeyB9XG5jb25zdCBpZGVudGl0eSA9IHggPT4geDtcbmZ1bmN0aW9uIGFzc2lnbih0YXIsIHNyYykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBmb3IgKGNvbnN0IGsgaW4gc3JjKVxuICAgICAgICB0YXJba10gPSBzcmNba107XG4gICAgcmV0dXJuIHRhcjtcbn1cbmZ1bmN0aW9uIGlzX3Byb21pc2UodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIGFkZF9sb2NhdGlvbihlbGVtZW50LCBmaWxlLCBsaW5lLCBjb2x1bW4sIGNoYXIpIHtcbiAgICBlbGVtZW50Ll9fc3ZlbHRlX21ldGEgPSB7XG4gICAgICAgIGxvYzogeyBmaWxlLCBsaW5lLCBjb2x1bW4sIGNoYXIgfVxuICAgIH07XG59XG5mdW5jdGlvbiBydW4oZm4pIHtcbiAgICByZXR1cm4gZm4oKTtcbn1cbmZ1bmN0aW9uIGJsYW5rX29iamVjdCgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsKTtcbn1cbmZ1bmN0aW9uIHJ1bl9hbGwoZm5zKSB7XG4gICAgZm5zLmZvckVhY2gocnVuKTtcbn1cbmZ1bmN0aW9uIGlzX2Z1bmN0aW9uKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIHNhZmVfbm90X2VxdWFsKGEsIGIpIHtcbiAgICByZXR1cm4gYSAhPSBhID8gYiA9PSBiIDogYSAhPT0gYiB8fCAoKGEgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnKSB8fCB0eXBlb2YgYSA9PT0gJ2Z1bmN0aW9uJyk7XG59XG5mdW5jdGlvbiBub3RfZXF1YWwoYSwgYikge1xuICAgIHJldHVybiBhICE9IGEgPyBiID09IGIgOiBhICE9PSBiO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVfc3RvcmUoc3RvcmUsIG5hbWUpIHtcbiAgICBpZiAoIXN0b3JlIHx8IHR5cGVvZiBzdG9yZS5zdWJzY3JpYmUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAnJHtuYW1lfScgaXMgbm90IGEgc3RvcmUgd2l0aCBhICdzdWJzY3JpYmUnIG1ldGhvZGApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHN1YnNjcmliZShzdG9yZSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCB1bnN1YiA9IHN0b3JlLnN1YnNjcmliZShjYWxsYmFjayk7XG4gICAgcmV0dXJuIHVuc3ViLnVuc3Vic2NyaWJlID8gKCkgPT4gdW5zdWIudW5zdWJzY3JpYmUoKSA6IHVuc3ViO1xufVxuZnVuY3Rpb24gZ2V0X3N0b3JlX3ZhbHVlKHN0b3JlKSB7XG4gICAgbGV0IHZhbHVlO1xuICAgIHN1YnNjcmliZShzdG9yZSwgXyA9PiB2YWx1ZSA9IF8pKCk7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gY29tcG9uZW50X3N1YnNjcmliZShjb21wb25lbnQsIHN0b3JlLCBjYWxsYmFjaykge1xuICAgIGNvbXBvbmVudC4kJC5vbl9kZXN0cm95LnB1c2goc3Vic2NyaWJlKHN0b3JlLCBjYWxsYmFjaykpO1xufVxuZnVuY3Rpb24gY3JlYXRlX3Nsb3QoZGVmaW5pdGlvbiwgY3R4LCBmbikge1xuICAgIGlmIChkZWZpbml0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNsb3RfY3R4ID0gZ2V0X3Nsb3RfY29udGV4dChkZWZpbml0aW9uLCBjdHgsIGZuKTtcbiAgICAgICAgcmV0dXJuIGRlZmluaXRpb25bMF0oc2xvdF9jdHgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldF9zbG90X2NvbnRleHQoZGVmaW5pdGlvbiwgY3R4LCBmbikge1xuICAgIHJldHVybiBkZWZpbml0aW9uWzFdXG4gICAgICAgID8gYXNzaWduKHt9LCBhc3NpZ24oY3R4LiQkc2NvcGUuY3R4LCBkZWZpbml0aW9uWzFdKGZuID8gZm4oY3R4KSA6IHt9KSkpXG4gICAgICAgIDogY3R4LiQkc2NvcGUuY3R4O1xufVxuZnVuY3Rpb24gZ2V0X3Nsb3RfY2hhbmdlcyhkZWZpbml0aW9uLCBjdHgsIGNoYW5nZWQsIGZuKSB7XG4gICAgcmV0dXJuIGRlZmluaXRpb25bMV1cbiAgICAgICAgPyBhc3NpZ24oe30sIGFzc2lnbihjdHguJCRzY29wZS5jaGFuZ2VkIHx8IHt9LCBkZWZpbml0aW9uWzFdKGZuID8gZm4oY2hhbmdlZCkgOiB7fSkpKVxuICAgICAgICA6IGN0eC4kJHNjb3BlLmNoYW5nZWQgfHwge307XG59XG5mdW5jdGlvbiBleGNsdWRlX2ludGVybmFsX3Byb3BzKHByb3BzKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZm9yIChjb25zdCBrIGluIHByb3BzKVxuICAgICAgICBpZiAoa1swXSAhPT0gJyQnKVxuICAgICAgICAgICAgcmVzdWx0W2tdID0gcHJvcHNba107XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG9uY2UoZm4pIHtcbiAgICBsZXQgcmFuID0gZmFsc2U7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgIGlmIChyYW4pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHJhbiA9IHRydWU7XG4gICAgICAgIGZuLmNhbGwodGhpcywgLi4uYXJncyk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIG51bGxfdG9fZW1wdHkodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG59XG5cbmNvbnN0IGlzX2NsaWVudCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xubGV0IG5vdyA9IGlzX2NsaWVudFxuICAgID8gKCkgPT4gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpXG4gICAgOiAoKSA9PiBEYXRlLm5vdygpO1xubGV0IHJhZiA9IGlzX2NsaWVudCA/IGNiID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZShjYikgOiBub29wO1xuLy8gdXNlZCBpbnRlcm5hbGx5IGZvciB0ZXN0aW5nXG5mdW5jdGlvbiBzZXRfbm93KGZuKSB7XG4gICAgbm93ID0gZm47XG59XG5mdW5jdGlvbiBzZXRfcmFmKGZuKSB7XG4gICAgcmFmID0gZm47XG59XG5cbmNvbnN0IHRhc2tzID0gbmV3IFNldCgpO1xubGV0IHJ1bm5pbmcgPSBmYWxzZTtcbmZ1bmN0aW9uIHJ1bl90YXNrcygpIHtcbiAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBpZiAoIXRhc2tbMF0obm93KCkpKSB7XG4gICAgICAgICAgICB0YXNrcy5kZWxldGUodGFzayk7XG4gICAgICAgICAgICB0YXNrWzFdKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBydW5uaW5nID0gdGFza3Muc2l6ZSA+IDA7XG4gICAgaWYgKHJ1bm5pbmcpXG4gICAgICAgIHJhZihydW5fdGFza3MpO1xufVxuZnVuY3Rpb24gY2xlYXJfbG9vcHMoKSB7XG4gICAgLy8gZm9yIHRlc3RpbmcuLi5cbiAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4gdGFza3MuZGVsZXRlKHRhc2spKTtcbiAgICBydW5uaW5nID0gZmFsc2U7XG59XG5mdW5jdGlvbiBsb29wKGZuKSB7XG4gICAgbGV0IHRhc2s7XG4gICAgaWYgKCFydW5uaW5nKSB7XG4gICAgICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICByYWYocnVuX3Rhc2tzKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvbWlzZTogbmV3IFByb21pc2UoZnVsZmlsID0+IHtcbiAgICAgICAgICAgIHRhc2tzLmFkZCh0YXNrID0gW2ZuLCBmdWxmaWxdKTtcbiAgICAgICAgfSksXG4gICAgICAgIGFib3J0KCkge1xuICAgICAgICAgICAgdGFza3MuZGVsZXRlKHRhc2spO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kKHRhcmdldCwgbm9kZSkge1xuICAgIHRhcmdldC5hcHBlbmRDaGlsZChub2RlKTtcbn1cbmZ1bmN0aW9uIGluc2VydCh0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuICAgIHRhcmdldC5pbnNlcnRCZWZvcmUobm9kZSwgYW5jaG9yIHx8IG51bGwpO1xufVxuZnVuY3Rpb24gZGV0YWNoKG5vZGUpIHtcbiAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG59XG5mdW5jdGlvbiBkZXN0cm95X2VhY2goaXRlcmF0aW9ucywgZGV0YWNoaW5nKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChpdGVyYXRpb25zW2ldKVxuICAgICAgICAgICAgaXRlcmF0aW9uc1tpXS5kKGRldGFjaGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZWxlbWVudChuYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG59XG5mdW5jdGlvbiBlbGVtZW50X2lzKG5hbWUsIGlzKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSwgeyBpcyB9KTtcbn1cbmZ1bmN0aW9uIG9iamVjdF93aXRob3V0X3Byb3BlcnRpZXMob2JqLCBleGNsdWRlKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1vYmplY3QtbGl0ZXJhbC10eXBlLWFzc2VydGlvblxuICAgIGNvbnN0IHRhcmdldCA9IHt9O1xuICAgIGZvciAoY29uc3QgayBpbiBvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGspXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAmJiBleGNsdWRlLmluZGV4T2YoaykgPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB0YXJnZXRba10gPSBvYmpba107XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbmZ1bmN0aW9uIHN2Z19lbGVtZW50KG5hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIG5hbWUpO1xufVxuZnVuY3Rpb24gdGV4dChkYXRhKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRhdGEpO1xufVxuZnVuY3Rpb24gc3BhY2UoKSB7XG4gICAgcmV0dXJuIHRleHQoJyAnKTtcbn1cbmZ1bmN0aW9uIGVtcHR5KCkge1xuICAgIHJldHVybiB0ZXh0KCcnKTtcbn1cbmZ1bmN0aW9uIGxpc3Rlbihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucykge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgcmV0dXJuICgpID0+IG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG59XG5mdW5jdGlvbiBwcmV2ZW50X2RlZmF1bHQoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBzdG9wX3Byb3BhZ2F0aW9uKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHNlbGYoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcylcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBhdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICBlbHNlXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xufVxuZnVuY3Rpb24gc2V0X2F0dHJpYnV0ZXMobm9kZSwgYXR0cmlidXRlcykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5jc3NUZXh0ID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSBpbiBub2RlKSB7XG4gICAgICAgICAgICBub2RlW2tleV0gPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhdHRyKG5vZGUsIGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9jdXN0b21fZWxlbWVudF9kYXRhKG5vZGUsIHByb3AsIHZhbHVlKSB7XG4gICAgaWYgKHByb3AgaW4gbm9kZSkge1xuICAgICAgICBub2RlW3Byb3BdID0gdmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhdHRyKG5vZGUsIHByb3AsIHZhbHVlKTtcbiAgICB9XG59XG5mdW5jdGlvbiB4bGlua19hdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBub2RlLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgYXR0cmlidXRlLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBnZXRfYmluZGluZ19ncm91cF92YWx1ZShncm91cCkge1xuICAgIGNvbnN0IHZhbHVlID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncm91cC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoZ3JvdXBbaV0uY2hlY2tlZClcbiAgICAgICAgICAgIHZhbHVlLnB1c2goZ3JvdXBbaV0uX192YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIHRvX251bWJlcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gJycgPyB1bmRlZmluZWQgOiArdmFsdWU7XG59XG5mdW5jdGlvbiB0aW1lX3Jhbmdlc190b19hcnJheShyYW5nZXMpIHtcbiAgICBjb25zdCBhcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGFycmF5LnB1c2goeyBzdGFydDogcmFuZ2VzLnN0YXJ0KGkpLCBlbmQ6IHJhbmdlcy5lbmQoaSkgfSk7XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbn1cbmZ1bmN0aW9uIGNoaWxkcmVuKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpO1xufVxuZnVuY3Rpb24gY2xhaW1fZWxlbWVudChub2RlcywgbmFtZSwgYXR0cmlidXRlcywgc3ZnKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgIGlmIChub2RlLm5vZGVOYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG5vZGUuYXR0cmlidXRlcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG5vZGUuYXR0cmlidXRlc1tqXTtcbiAgICAgICAgICAgICAgICBpZiAoIWF0dHJpYnV0ZXNbYXR0cmlidXRlLm5hbWVdKVxuICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZXMuc3BsaWNlKGksIDEpWzBdOyAvLyBUT0RPIHN0cmlwIHVud2FudGVkIGF0dHJpYnV0ZXNcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3ZnID8gc3ZnX2VsZW1lbnQobmFtZSkgOiBlbGVtZW50KG5hbWUpO1xufVxuZnVuY3Rpb24gY2xhaW1fdGV4dChub2RlcywgZGF0YSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgICAgbm9kZS5kYXRhID0gZGF0YTtcbiAgICAgICAgICAgIHJldHVybiBub2Rlcy5zcGxpY2UoaSwgMSlbMF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRleHQoZGF0YSk7XG59XG5mdW5jdGlvbiBzZXRfZGF0YSh0ZXh0LCBkYXRhKSB7XG4gICAgZGF0YSA9ICcnICsgZGF0YTtcbiAgICBpZiAodGV4dC5kYXRhICE9PSBkYXRhKVxuICAgICAgICB0ZXh0LmRhdGEgPSBkYXRhO1xufVxuZnVuY3Rpb24gc2V0X2lucHV0X3ZhbHVlKGlucHV0LCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAhPSBudWxsIHx8IGlucHV0LnZhbHVlKSB7XG4gICAgICAgIGlucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0X2lucHV0X3R5cGUoaW5wdXQsIHR5cGUpIHtcbiAgICB0cnkge1xuICAgICAgICBpbnB1dC50eXBlID0gdHlwZTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9zdHlsZShub2RlLCBrZXksIHZhbHVlLCBpbXBvcnRhbnQpIHtcbiAgICBub2RlLnN0eWxlLnNldFByb3BlcnR5KGtleSwgdmFsdWUsIGltcG9ydGFudCA/ICdpbXBvcnRhbnQnIDogJycpO1xufVxuZnVuY3Rpb24gc2VsZWN0X29wdGlvbihzZWxlY3QsIHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tpXTtcbiAgICAgICAgaWYgKG9wdGlvbi5fX3ZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHNlbGVjdF9vcHRpb25zKHNlbGVjdCwgdmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdC5vcHRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHNlbGVjdC5vcHRpb25zW2ldO1xuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB+dmFsdWUuaW5kZXhPZihvcHRpb24uX192YWx1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2VsZWN0X3ZhbHVlKHNlbGVjdCkge1xuICAgIGNvbnN0IHNlbGVjdGVkX29wdGlvbiA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCc6Y2hlY2tlZCcpIHx8IHNlbGVjdC5vcHRpb25zWzBdO1xuICAgIHJldHVybiBzZWxlY3RlZF9vcHRpb24gJiYgc2VsZWN0ZWRfb3B0aW9uLl9fdmFsdWU7XG59XG5mdW5jdGlvbiBzZWxlY3RfbXVsdGlwbGVfdmFsdWUoc2VsZWN0KSB7XG4gICAgcmV0dXJuIFtdLm1hcC5jYWxsKHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCc6Y2hlY2tlZCcpLCBvcHRpb24gPT4gb3B0aW9uLl9fdmFsdWUpO1xufVxuZnVuY3Rpb24gYWRkX3Jlc2l6ZV9saXN0ZW5lcihlbGVtZW50LCBmbikge1xuICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICB9XG4gICAgY29uc3Qgb2JqZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2JqZWN0Jyk7XG4gICAgb2JqZWN0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTogYmxvY2s7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOyBoZWlnaHQ6IDEwMCU7IHdpZHRoOiAxMDAlOyBvdmVyZmxvdzogaGlkZGVuOyBwb2ludGVyLWV2ZW50czogbm9uZTsgei1pbmRleDogLTE7Jyk7XG4gICAgb2JqZWN0LnR5cGUgPSAndGV4dC9odG1sJztcbiAgICBvYmplY3QudGFiSW5kZXggPSAtMTtcbiAgICBsZXQgd2luO1xuICAgIG9iamVjdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIHdpbiA9IG9iamVjdC5jb250ZW50RG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gICAgICAgIHdpbi5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmbik7XG4gICAgfTtcbiAgICBpZiAoL1RyaWRlbnQvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChvYmplY3QpO1xuICAgICAgICBvYmplY3QuZGF0YSA9ICdhYm91dDpibGFuayc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBvYmplY3QuZGF0YSA9ICdhYm91dDpibGFuayc7XG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQob2JqZWN0KTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2FuY2VsOiAoKSA9PiB7XG4gICAgICAgICAgICB3aW4gJiYgd2luLnJlbW92ZUV2ZW50TGlzdGVuZXIgJiYgd2luLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZuKTtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQob2JqZWN0KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiB0b2dnbGVfY2xhc3MoZWxlbWVudCwgbmFtZSwgdG9nZ2xlKSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3RbdG9nZ2xlID8gJ2FkZCcgOiAncmVtb3ZlJ10obmFtZSk7XG59XG5mdW5jdGlvbiBjdXN0b21fZXZlbnQodHlwZSwgZGV0YWlsKSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSwgZGV0YWlsKTtcbiAgICByZXR1cm4gZTtcbn1cbmNsYXNzIEh0bWxUYWcge1xuICAgIGNvbnN0cnVjdG9yKGh0bWwsIGFuY2hvciA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5lID0gZWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuYSA9IGFuY2hvcjtcbiAgICAgICAgdGhpcy51KGh0bWwpO1xuICAgIH1cbiAgICBtKHRhcmdldCwgYW5jaG9yID0gbnVsbCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubi5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaW5zZXJ0KHRhcmdldCwgdGhpcy5uW2ldLCBhbmNob3IpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudCA9IHRhcmdldDtcbiAgICB9XG4gICAgdShodG1sKSB7XG4gICAgICAgIHRoaXMuZS5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICB0aGlzLm4gPSBBcnJheS5mcm9tKHRoaXMuZS5jaGlsZE5vZGVzKTtcbiAgICB9XG4gICAgcChodG1sKSB7XG4gICAgICAgIHRoaXMuZCgpO1xuICAgICAgICB0aGlzLnUoaHRtbCk7XG4gICAgICAgIHRoaXMubSh0aGlzLnQsIHRoaXMuYSk7XG4gICAgfVxuICAgIGQoKSB7XG4gICAgICAgIHRoaXMubi5mb3JFYWNoKGRldGFjaCk7XG4gICAgfVxufVxuXG5sZXQgc3R5bGVzaGVldDtcbmxldCBhY3RpdmUgPSAwO1xubGV0IGN1cnJlbnRfcnVsZXMgPSB7fTtcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXJrc2t5YXBwL3N0cmluZy1oYXNoL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG5mdW5jdGlvbiBoYXNoKHN0cikge1xuICAgIGxldCBoYXNoID0gNTM4MTtcbiAgICBsZXQgaSA9IHN0ci5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSlcbiAgICAgICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpIF4gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGhhc2ggPj4+IDA7XG59XG5mdW5jdGlvbiBjcmVhdGVfcnVsZShub2RlLCBhLCBiLCBkdXJhdGlvbiwgZGVsYXksIGVhc2UsIGZuLCB1aWQgPSAwKSB7XG4gICAgY29uc3Qgc3RlcCA9IDE2LjY2NiAvIGR1cmF0aW9uO1xuICAgIGxldCBrZXlmcmFtZXMgPSAne1xcbic7XG4gICAgZm9yIChsZXQgcCA9IDA7IHAgPD0gMTsgcCArPSBzdGVwKSB7XG4gICAgICAgIGNvbnN0IHQgPSBhICsgKGIgLSBhKSAqIGVhc2UocCk7XG4gICAgICAgIGtleWZyYW1lcyArPSBwICogMTAwICsgYCV7JHtmbih0LCAxIC0gdCl9fVxcbmA7XG4gICAgfVxuICAgIGNvbnN0IHJ1bGUgPSBrZXlmcmFtZXMgKyBgMTAwJSB7JHtmbihiLCAxIC0gYil9fVxcbn1gO1xuICAgIGNvbnN0IG5hbWUgPSBgX19zdmVsdGVfJHtoYXNoKHJ1bGUpfV8ke3VpZH1gO1xuICAgIGlmICghY3VycmVudF9ydWxlc1tuYW1lXSkge1xuICAgICAgICBpZiAoIXN0eWxlc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gZWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgICAgICAgICAgc3R5bGVzaGVldCA9IHN0eWxlLnNoZWV0O1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRfcnVsZXNbbmFtZV0gPSB0cnVlO1xuICAgICAgICBzdHlsZXNoZWV0Lmluc2VydFJ1bGUoYEBrZXlmcmFtZXMgJHtuYW1lfSAke3J1bGV9YCwgc3R5bGVzaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xuICAgIH1cbiAgICBjb25zdCBhbmltYXRpb24gPSBub2RlLnN0eWxlLmFuaW1hdGlvbiB8fCAnJztcbiAgICBub2RlLnN0eWxlLmFuaW1hdGlvbiA9IGAke2FuaW1hdGlvbiA/IGAke2FuaW1hdGlvbn0sIGAgOiBgYH0ke25hbWV9ICR7ZHVyYXRpb259bXMgbGluZWFyICR7ZGVsYXl9bXMgMSBib3RoYDtcbiAgICBhY3RpdmUgKz0gMTtcbiAgICByZXR1cm4gbmFtZTtcbn1cbmZ1bmN0aW9uIGRlbGV0ZV9ydWxlKG5vZGUsIG5hbWUpIHtcbiAgICBub2RlLnN0eWxlLmFuaW1hdGlvbiA9IChub2RlLnN0eWxlLmFuaW1hdGlvbiB8fCAnJylcbiAgICAgICAgLnNwbGl0KCcsICcpXG4gICAgICAgIC5maWx0ZXIobmFtZVxuICAgICAgICA/IGFuaW0gPT4gYW5pbS5pbmRleE9mKG5hbWUpIDwgMCAvLyByZW1vdmUgc3BlY2lmaWMgYW5pbWF0aW9uXG4gICAgICAgIDogYW5pbSA9PiBhbmltLmluZGV4T2YoJ19fc3ZlbHRlJykgPT09IC0xIC8vIHJlbW92ZSBhbGwgU3ZlbHRlIGFuaW1hdGlvbnNcbiAgICApXG4gICAgICAgIC5qb2luKCcsICcpO1xuICAgIGlmIChuYW1lICYmICEtLWFjdGl2ZSlcbiAgICAgICAgY2xlYXJfcnVsZXMoKTtcbn1cbmZ1bmN0aW9uIGNsZWFyX3J1bGVzKCkge1xuICAgIHJhZigoKSA9PiB7XG4gICAgICAgIGlmIChhY3RpdmUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGxldCBpID0gc3R5bGVzaGVldC5jc3NSdWxlcy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pXG4gICAgICAgICAgICBzdHlsZXNoZWV0LmRlbGV0ZVJ1bGUoaSk7XG4gICAgICAgIGN1cnJlbnRfcnVsZXMgPSB7fTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlX2FuaW1hdGlvbihub2RlLCBmcm9tLCBmbiwgcGFyYW1zKSB7XG4gICAgaWYgKCFmcm9tKVxuICAgICAgICByZXR1cm4gbm9vcDtcbiAgICBjb25zdCB0byA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKGZyb20ubGVmdCA9PT0gdG8ubGVmdCAmJiBmcm9tLnJpZ2h0ID09PSB0by5yaWdodCAmJiBmcm9tLnRvcCA9PT0gdG8udG9wICYmIGZyb20uYm90dG9tID09PSB0by5ib3R0b20pXG4gICAgICAgIHJldHVybiBub29wO1xuICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIFxuICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogc2hvdWxkIHRoaXMgYmUgc2VwYXJhdGVkIGZyb20gZGVzdHJ1Y3R1cmluZz8gT3Igc3RhcnQvZW5kIGFkZGVkIHRvIHB1YmxpYyBhcGkgYW5kIGRvY3VtZW50YXRpb24/XG4gICAgc3RhcnQ6IHN0YXJ0X3RpbWUgPSBub3coKSArIGRlbGF5LCBcbiAgICAvLyBAdHMtaWdub3JlIHRvZG86XG4gICAgZW5kID0gc3RhcnRfdGltZSArIGR1cmF0aW9uLCB0aWNrID0gbm9vcCwgY3NzIH0gPSBmbihub2RlLCB7IGZyb20sIHRvIH0sIHBhcmFtcyk7XG4gICAgbGV0IHJ1bm5pbmcgPSB0cnVlO1xuICAgIGxldCBzdGFydGVkID0gZmFsc2U7XG4gICAgbGV0IG5hbWU7XG4gICAgZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgIGlmIChjc3MpIHtcbiAgICAgICAgICAgIG5hbWUgPSBjcmVhdGVfcnVsZShub2RlLCAwLCAxLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRlbGF5KSB7XG4gICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICBpZiAoY3NzKVxuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgbmFtZSk7XG4gICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgbG9vcChub3cgPT4ge1xuICAgICAgICBpZiAoIXN0YXJ0ZWQgJiYgbm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydGVkICYmIG5vdyA+PSBlbmQpIHtcbiAgICAgICAgICAgIHRpY2soMSwgMCk7XG4gICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFydW5uaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSBub3cgLSBzdGFydF90aW1lO1xuICAgICAgICAgICAgY29uc3QgdCA9IDAgKyAxICogZWFzaW5nKHAgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICB0aWNrKHQsIDEgLSB0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgICBzdGFydCgpO1xuICAgIHRpY2soMCwgMSk7XG4gICAgcmV0dXJuIHN0b3A7XG59XG5mdW5jdGlvbiBmaXhfcG9zaXRpb24obm9kZSkge1xuICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICBpZiAoc3R5bGUucG9zaXRpb24gIT09ICdhYnNvbHV0ZScgJiYgc3R5bGUucG9zaXRpb24gIT09ICdmaXhlZCcpIHtcbiAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBzdHlsZTtcbiAgICAgICAgY29uc3QgYSA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIG5vZGUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBub2RlLnN0eWxlLndpZHRoID0gd2lkdGg7XG4gICAgICAgIG5vZGUuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBhZGRfdHJhbnNmb3JtKG5vZGUsIGEpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFkZF90cmFuc2Zvcm0obm9kZSwgYSkge1xuICAgIGNvbnN0IGIgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmIChhLmxlZnQgIT09IGIubGVmdCB8fCBhLnRvcCAhPT0gYi50b3ApIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBzdHlsZS50cmFuc2Zvcm0gPT09ICdub25lJyA/ICcnIDogc3R5bGUudHJhbnNmb3JtO1xuICAgICAgICBub2RlLnN0eWxlLnRyYW5zZm9ybSA9IGAke3RyYW5zZm9ybX0gdHJhbnNsYXRlKCR7YS5sZWZ0IC0gYi5sZWZ0fXB4LCAke2EudG9wIC0gYi50b3B9cHgpYDtcbiAgICB9XG59XG5cbmxldCBjdXJyZW50X2NvbXBvbmVudDtcbmZ1bmN0aW9uIHNldF9jdXJyZW50X2NvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICBjdXJyZW50X2NvbXBvbmVudCA9IGNvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGdldF9jdXJyZW50X2NvbXBvbmVudCgpIHtcbiAgICBpZiAoIWN1cnJlbnRfY29tcG9uZW50KVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZ1bmN0aW9uIGNhbGxlZCBvdXRzaWRlIGNvbXBvbmVudCBpbml0aWFsaXphdGlvbmApO1xuICAgIHJldHVybiBjdXJyZW50X2NvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGJlZm9yZVVwZGF0ZShmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmJlZm9yZV91cGRhdGUucHVzaChmbik7XG59XG5mdW5jdGlvbiBvbk1vdW50KGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQub25fbW91bnQucHVzaChmbik7XG59XG5mdW5jdGlvbiBhZnRlclVwZGF0ZShmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmFmdGVyX3VwZGF0ZS5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIG9uRGVzdHJveShmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLm9uX2Rlc3Ryb3kucHVzaChmbik7XG59XG5mdW5jdGlvbiBjcmVhdGVFdmVudERpc3BhdGNoZXIoKSB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gY3VycmVudF9jb21wb25lbnQ7XG4gICAgcmV0dXJuICh0eXBlLCBkZXRhaWwpID0+IHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gY29tcG9uZW50LiQkLmNhbGxiYWNrc1t0eXBlXTtcbiAgICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICAgICAgLy8gVE9ETyBhcmUgdGhlcmUgc2l0dWF0aW9ucyB3aGVyZSBldmVudHMgY291bGQgYmUgZGlzcGF0Y2hlZFxuICAgICAgICAgICAgLy8gaW4gYSBzZXJ2ZXIgKG5vbi1ET00pIGVudmlyb25tZW50P1xuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBjdXN0b21fZXZlbnQodHlwZSwgZGV0YWlsKTtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5zbGljZSgpLmZvckVhY2goZm4gPT4ge1xuICAgICAgICAgICAgICAgIGZuLmNhbGwoY29tcG9uZW50LCBldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBzZXRDb250ZXh0KGtleSwgY29udGV4dCkge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuc2V0KGtleSwgY29udGV4dCk7XG59XG5mdW5jdGlvbiBnZXRDb250ZXh0KGtleSkge1xuICAgIHJldHVybiBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5jb250ZXh0LmdldChrZXkpO1xufVxuLy8gVE9ETyBmaWd1cmUgb3V0IGlmIHdlIHN0aWxsIHdhbnQgdG8gc3VwcG9ydFxuLy8gc2hvcnRoYW5kIGV2ZW50cywgb3IgaWYgd2Ugd2FudCB0byBpbXBsZW1lbnRcbi8vIGEgcmVhbCBidWJibGluZyBtZWNoYW5pc21cbmZ1bmN0aW9uIGJ1YmJsZShjb21wb25lbnQsIGV2ZW50KSB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gY29tcG9uZW50LiQkLmNhbGxiYWNrc1tldmVudC50eXBlXTtcbiAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgIGNhbGxiYWNrcy5zbGljZSgpLmZvckVhY2goZm4gPT4gZm4oZXZlbnQpKTtcbiAgICB9XG59XG5cbmNvbnN0IGRpcnR5X2NvbXBvbmVudHMgPSBbXTtcbmNvbnN0IGludHJvcyA9IHsgZW5hYmxlZDogZmFsc2UgfTtcbmNvbnN0IGJpbmRpbmdfY2FsbGJhY2tzID0gW107XG5jb25zdCByZW5kZXJfY2FsbGJhY2tzID0gW107XG5jb25zdCBmbHVzaF9jYWxsYmFja3MgPSBbXTtcbmNvbnN0IHJlc29sdmVkX3Byb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbmxldCB1cGRhdGVfc2NoZWR1bGVkID0gZmFsc2U7XG5mdW5jdGlvbiBzY2hlZHVsZV91cGRhdGUoKSB7XG4gICAgaWYgKCF1cGRhdGVfc2NoZWR1bGVkKSB7XG4gICAgICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICByZXNvbHZlZF9wcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHRpY2soKSB7XG4gICAgc2NoZWR1bGVfdXBkYXRlKCk7XG4gICAgcmV0dXJuIHJlc29sdmVkX3Byb21pc2U7XG59XG5mdW5jdGlvbiBhZGRfcmVuZGVyX2NhbGxiYWNrKGZuKSB7XG4gICAgcmVuZGVyX2NhbGxiYWNrcy5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGFkZF9mbHVzaF9jYWxsYmFjayhmbikge1xuICAgIGZsdXNoX2NhbGxiYWNrcy5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIGNvbnN0IHNlZW5fY2FsbGJhY2tzID0gbmV3IFNldCgpO1xuICAgIGRvIHtcbiAgICAgICAgLy8gZmlyc3QsIGNhbGwgYmVmb3JlVXBkYXRlIGZ1bmN0aW9uc1xuICAgICAgICAvLyBhbmQgdXBkYXRlIGNvbXBvbmVudHNcbiAgICAgICAgd2hpbGUgKGRpcnR5X2NvbXBvbmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBkaXJ0eV9jb21wb25lbnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIHVwZGF0ZShjb21wb25lbnQuJCQpO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChiaW5kaW5nX2NhbGxiYWNrcy5sZW5ndGgpXG4gICAgICAgICAgICBiaW5kaW5nX2NhbGxiYWNrcy5wb3AoKSgpO1xuICAgICAgICAvLyB0aGVuLCBvbmNlIGNvbXBvbmVudHMgYXJlIHVwZGF0ZWQsIGNhbGxcbiAgICAgICAgLy8gYWZ0ZXJVcGRhdGUgZnVuY3Rpb25zLiBUaGlzIG1heSBjYXVzZVxuICAgICAgICAvLyBzdWJzZXF1ZW50IHVwZGF0ZXMuLi5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJfY2FsbGJhY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IHJlbmRlcl9jYWxsYmFja3NbaV07XG4gICAgICAgICAgICBpZiAoIXNlZW5fY2FsbGJhY2tzLmhhcyhjYWxsYmFjaykpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIC8vIC4uLnNvIGd1YXJkIGFnYWluc3QgaW5maW5pdGUgbG9vcHNcbiAgICAgICAgICAgICAgICBzZWVuX2NhbGxiYWNrcy5hZGQoY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlbmRlcl9jYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgICB9IHdoaWxlIChkaXJ0eV9jb21wb25lbnRzLmxlbmd0aCk7XG4gICAgd2hpbGUgKGZsdXNoX2NhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgZmx1c2hfY2FsbGJhY2tzLnBvcCgpKCk7XG4gICAgfVxuICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZSgkJCkge1xuICAgIGlmICgkJC5mcmFnbWVudCkge1xuICAgICAgICAkJC51cGRhdGUoJCQuZGlydHkpO1xuICAgICAgICBydW5fYWxsKCQkLmJlZm9yZV91cGRhdGUpO1xuICAgICAgICAkJC5mcmFnbWVudC5wKCQkLmRpcnR5LCAkJC5jdHgpO1xuICAgICAgICAkJC5kaXJ0eSA9IG51bGw7XG4gICAgICAgICQkLmFmdGVyX3VwZGF0ZS5mb3JFYWNoKGFkZF9yZW5kZXJfY2FsbGJhY2spO1xuICAgIH1cbn1cblxubGV0IHByb21pc2U7XG5mdW5jdGlvbiB3YWl0KCkge1xuICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIHByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBwcm9taXNlID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwcm9taXNlO1xufVxuZnVuY3Rpb24gZGlzcGF0Y2gobm9kZSwgZGlyZWN0aW9uLCBraW5kKSB7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGN1c3RvbV9ldmVudChgJHtkaXJlY3Rpb24gPyAnaW50cm8nIDogJ291dHJvJ30ke2tpbmR9YCkpO1xufVxuY29uc3Qgb3V0cm9pbmcgPSBuZXcgU2V0KCk7XG5sZXQgb3V0cm9zO1xuZnVuY3Rpb24gZ3JvdXBfb3V0cm9zKCkge1xuICAgIG91dHJvcyA9IHtcbiAgICAgICAgcjogMCxcbiAgICAgICAgYzogW10sXG4gICAgICAgIHA6IG91dHJvcyAvLyBwYXJlbnQgZ3JvdXBcbiAgICB9O1xufVxuZnVuY3Rpb24gY2hlY2tfb3V0cm9zKCkge1xuICAgIGlmICghb3V0cm9zLnIpIHtcbiAgICAgICAgcnVuX2FsbChvdXRyb3MuYyk7XG4gICAgfVxuICAgIG91dHJvcyA9IG91dHJvcy5wO1xufVxuZnVuY3Rpb24gdHJhbnNpdGlvbl9pbihibG9jaywgbG9jYWwpIHtcbiAgICBpZiAoYmxvY2sgJiYgYmxvY2suaSkge1xuICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xuICAgICAgICBibG9jay5pKGxvY2FsKTtcbiAgICB9XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uX291dChibG9jaywgbG9jYWwsIGRldGFjaCwgY2FsbGJhY2spIHtcbiAgICBpZiAoYmxvY2sgJiYgYmxvY2subykge1xuICAgICAgICBpZiAob3V0cm9pbmcuaGFzKGJsb2NrKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgb3V0cm9pbmcuYWRkKGJsb2NrKTtcbiAgICAgICAgb3V0cm9zLmMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRldGFjaClcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suZCgxKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYmxvY2subyhsb2NhbCk7XG4gICAgfVxufVxuY29uc3QgbnVsbF90cmFuc2l0aW9uID0geyBkdXJhdGlvbjogMCB9O1xuZnVuY3Rpb24gY3JlYXRlX2luX3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gZmFsc2U7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lO1xuICAgIGxldCB0YXNrO1xuICAgIGxldCB1aWQgPSAwO1xuICAgIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIGFuaW1hdGlvbl9uYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ28oKSB7XG4gICAgICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIHRpY2sgPSBub29wLCBjc3MgfSA9IGNvbmZpZyB8fCBudWxsX3RyYW5zaXRpb247XG4gICAgICAgIGlmIChjc3MpXG4gICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDAsIDEsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MsIHVpZCsrKTtcbiAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgY29uc3Qgc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXk7XG4gICAgICAgIGNvbnN0IGVuZF90aW1lID0gc3RhcnRfdGltZSArIGR1cmF0aW9uO1xuICAgICAgICBpZiAodGFzaylcbiAgICAgICAgICAgIHRhc2suYWJvcnQoKTtcbiAgICAgICAgcnVubmluZyA9IHRydWU7XG4gICAgICAgIGFkZF9yZW5kZXJfY2FsbGJhY2soKCkgPT4gZGlzcGF0Y2gobm9kZSwgdHJ1ZSwgJ3N0YXJ0JykpO1xuICAgICAgICB0YXNrID0gbG9vcChub3cgPT4ge1xuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAobm93ID49IGVuZF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpY2soMSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIHRydWUsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGVhc2luZygobm93IC0gc3RhcnRfdGltZSkgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRpY2sodCwgMSAtIHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBydW5uaW5nO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbGV0IHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydCgpIHtcbiAgICAgICAgICAgIGlmIChzdGFydGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUpO1xuICAgICAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgICBjb25maWcgPSBjb25maWcoKTtcbiAgICAgICAgICAgICAgICB3YWl0KCkudGhlbihnbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpbnZhbGlkYXRlKCkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBlbmQoKSB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlX291dF90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMpIHtcbiAgICBsZXQgY29uZmlnID0gZm4obm9kZSwgcGFyYW1zKTtcbiAgICBsZXQgcnVubmluZyA9IHRydWU7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lO1xuICAgIGNvbnN0IGdyb3VwID0gb3V0cm9zO1xuICAgIGdyb3VwLnIgKz0gMTtcbiAgICBmdW5jdGlvbiBnbygpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcbiAgICAgICAgaWYgKGNzcylcbiAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgMSwgMCwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgIGNvbnN0IHN0YXJ0X3RpbWUgPSBub3coKSArIGRlbGF5O1xuICAgICAgICBjb25zdCBlbmRfdGltZSA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbjtcbiAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiBkaXNwYXRjaChub2RlLCBmYWxzZSwgJ3N0YXJ0JykpO1xuICAgICAgICBsb29wKG5vdyA9PiB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gZW5kX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgZmFsc2UsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEtLWdyb3VwLnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgd2lsbCByZXN1bHQgaW4gYGVuZCgpYCBiZWluZyBjYWxsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzbyB3ZSBkb24ndCBuZWVkIHRvIGNsZWFuIHVwIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bl9hbGwoZ3JvdXAuYyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGVhc2luZygobm93IC0gc3RhcnRfdGltZSkgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRpY2soMSAtIHQsIHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBydW5uaW5nO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgd2FpdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICBnbygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdvKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGVuZChyZXNldCkge1xuICAgICAgICAgICAgaWYgKHJlc2V0ICYmIGNvbmZpZy50aWNrKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLnRpY2soMSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgYW5pbWF0aW9uX25hbWUpO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVfYmlkaXJlY3Rpb25hbF90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMsIGludHJvKSB7XG4gICAgbGV0IGNvbmZpZyA9IGZuKG5vZGUsIHBhcmFtcyk7XG4gICAgbGV0IHQgPSBpbnRybyA/IDAgOiAxO1xuICAgIGxldCBydW5uaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgIGxldCBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgIGxldCBhbmltYXRpb25fbmFtZSA9IG51bGw7XG4gICAgZnVuY3Rpb24gY2xlYXJfYW5pbWF0aW9uKCkge1xuICAgICAgICBpZiAoYW5pbWF0aW9uX25hbWUpXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluaXQocHJvZ3JhbSwgZHVyYXRpb24pIHtcbiAgICAgICAgY29uc3QgZCA9IHByb2dyYW0uYiAtIHQ7XG4gICAgICAgIGR1cmF0aW9uICo9IE1hdGguYWJzKGQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYTogdCxcbiAgICAgICAgICAgIGI6IHByb2dyYW0uYixcbiAgICAgICAgICAgIGQsXG4gICAgICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgICAgIHN0YXJ0OiBwcm9ncmFtLnN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBwcm9ncmFtLnN0YXJ0ICsgZHVyYXRpb24sXG4gICAgICAgICAgICBncm91cDogcHJvZ3JhbS5ncm91cFxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBnbyhiKSB7XG4gICAgICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIHRpY2sgPSBub29wLCBjc3MgfSA9IGNvbmZpZyB8fCBudWxsX3RyYW5zaXRpb247XG4gICAgICAgIGNvbnN0IHByb2dyYW0gPSB7XG4gICAgICAgICAgICBzdGFydDogbm93KCkgKyBkZWxheSxcbiAgICAgICAgICAgIGJcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFiKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xuICAgICAgICAgICAgcHJvZ3JhbS5ncm91cCA9IG91dHJvcztcbiAgICAgICAgICAgIG91dHJvcy5yICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJ1bm5pbmdfcHJvZ3JhbSkge1xuICAgICAgICAgICAgcGVuZGluZ19wcm9ncmFtID0gcHJvZ3JhbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYW4gaW50cm8sIGFuZCB0aGVyZSdzIGEgZGVsYXksIHdlIG5lZWQgdG8gZG9cbiAgICAgICAgICAgIC8vIGFuIGluaXRpYWwgdGljayBhbmQvb3IgYXBwbHkgQ1NTIGFuaW1hdGlvbiBpbW1lZGlhdGVseVxuICAgICAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgdCwgYiwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYilcbiAgICAgICAgICAgICAgICB0aWNrKDAsIDEpO1xuICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gaW5pdChwcm9ncmFtLCBkdXJhdGlvbik7XG4gICAgICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIGIsICdzdGFydCcpKTtcbiAgICAgICAgICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGVuZGluZ19wcm9ncmFtICYmIG5vdyA+IHBlbmRpbmdfcHJvZ3JhbS5zdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBpbml0KHBlbmRpbmdfcHJvZ3JhbSwgZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBydW5uaW5nX3Byb2dyYW0uYiwgJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCB0LCBydW5uaW5nX3Byb2dyYW0uYiwgcnVubmluZ19wcm9ncmFtLmR1cmF0aW9uLCAwLCBlYXNpbmcsIGNvbmZpZy5jc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBydW5uaW5nX3Byb2dyYW0uZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrKHQgPSBydW5uaW5nX3Byb2dyYW0uYiwgMSAtIHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgcnVubmluZ19wcm9ncmFtLmIsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGVuZGluZ19wcm9ncmFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UncmUgZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0uYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnRybyDigJQgd2UgY2FuIHRpZHkgdXAgaW1tZWRpYXRlbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvdXRybyDigJQgbmVlZHMgdG8gYmUgY29vcmRpbmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEtLXJ1bm5pbmdfcHJvZ3JhbS5ncm91cC5yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuX2FsbChydW5uaW5nX3Byb2dyYW0uZ3JvdXAuYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChub3cgPj0gcnVubmluZ19wcm9ncmFtLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwID0gbm93IC0gcnVubmluZ19wcm9ncmFtLnN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdCA9IHJ1bm5pbmdfcHJvZ3JhbS5hICsgcnVubmluZ19wcm9ncmFtLmQgKiBlYXNpbmcocCAvIHJ1bm5pbmdfcHJvZ3JhbS5kdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrKHQsIDEgLSB0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gISEocnVubmluZ19wcm9ncmFtIHx8IHBlbmRpbmdfcHJvZ3JhbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBydW4oYikge1xuICAgICAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgICB3YWl0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICAgICAgICAgIGdvKGIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ28oYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVuZCgpIHtcbiAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gcGVuZGluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9wcm9taXNlKHByb21pc2UsIGluZm8pIHtcbiAgICBjb25zdCB0b2tlbiA9IGluZm8udG9rZW4gPSB7fTtcbiAgICBmdW5jdGlvbiB1cGRhdGUodHlwZSwgaW5kZXgsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGluZm8udG9rZW4gIT09IHRva2VuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpbmZvLnJlc29sdmVkID0ga2V5ICYmIHsgW2tleV06IHZhbHVlIH07XG4gICAgICAgIGNvbnN0IGNoaWxkX2N0eCA9IGFzc2lnbihhc3NpZ24oe30sIGluZm8uY3R4KSwgaW5mby5yZXNvbHZlZCk7XG4gICAgICAgIGNvbnN0IGJsb2NrID0gdHlwZSAmJiAoaW5mby5jdXJyZW50ID0gdHlwZSkoY2hpbGRfY3R4KTtcbiAgICAgICAgaWYgKGluZm8uYmxvY2spIHtcbiAgICAgICAgICAgIGlmIChpbmZvLmJsb2Nrcykge1xuICAgICAgICAgICAgICAgIGluZm8uYmxvY2tzLmZvckVhY2goKGJsb2NrLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSBpbmRleCAmJiBibG9jaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBfb3V0cm9zKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uX291dChibG9jaywgMSwgMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uYmxvY2tzW2ldID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tfb3V0cm9zKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluZm8uYmxvY2suZCgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJsb2NrLmMoKTtcbiAgICAgICAgICAgIHRyYW5zaXRpb25faW4oYmxvY2ssIDEpO1xuICAgICAgICAgICAgYmxvY2subShpbmZvLm1vdW50KCksIGluZm8uYW5jaG9yKTtcbiAgICAgICAgICAgIGZsdXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgaW5mby5ibG9jayA9IGJsb2NrO1xuICAgICAgICBpZiAoaW5mby5ibG9ja3MpXG4gICAgICAgICAgICBpbmZvLmJsb2Nrc1tpbmRleF0gPSBibG9jaztcbiAgICB9XG4gICAgaWYgKGlzX3Byb21pc2UocHJvbWlzZSkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudF9jb21wb25lbnQgPSBnZXRfY3VycmVudF9jb21wb25lbnQoKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjdXJyZW50X2NvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby50aGVuLCAxLCBpbmZvLnZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQobnVsbCk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjdXJyZW50X2NvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby5jYXRjaCwgMiwgaW5mby5lcnJvciwgZXJyb3IpO1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gaWYgd2UgcHJldmlvdXNseSBoYWQgYSB0aGVuL2NhdGNoIGJsb2NrLCBkZXN0cm95IGl0XG4gICAgICAgIGlmIChpbmZvLmN1cnJlbnQgIT09IGluZm8ucGVuZGluZykge1xuICAgICAgICAgICAgdXBkYXRlKGluZm8ucGVuZGluZywgMCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKGluZm8uY3VycmVudCAhPT0gaW5mby50aGVuKSB7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby50aGVuLCAxLCBpbmZvLnZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGluZm8ucmVzb2x2ZWQgPSB7IFtpbmZvLnZhbHVlXTogcHJvbWlzZSB9O1xuICAgIH1cbn1cblxuY29uc3QgZ2xvYmFscyA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbCk7XG5cbmZ1bmN0aW9uIGRlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIGJsb2NrLmQoMSk7XG4gICAgbG9va3VwLmRlbGV0ZShibG9jay5rZXkpO1xufVxuZnVuY3Rpb24gb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIHRyYW5zaXRpb25fb3V0KGJsb2NrLCAxLCAxLCAoKSA9PiB7XG4gICAgICAgIGxvb2t1cC5kZWxldGUoYmxvY2sua2V5KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGZpeF9hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgYmxvY2suZigpO1xuICAgIGRlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCk7XG59XG5mdW5jdGlvbiBmaXhfYW5kX291dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICBibG9jay5mKCk7XG4gICAgb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCk7XG59XG5mdW5jdGlvbiB1cGRhdGVfa2V5ZWRfZWFjaChvbGRfYmxvY2tzLCBjaGFuZ2VkLCBnZXRfa2V5LCBkeW5hbWljLCBjdHgsIGxpc3QsIGxvb2t1cCwgbm9kZSwgZGVzdHJveSwgY3JlYXRlX2VhY2hfYmxvY2ssIG5leHQsIGdldF9jb250ZXh0KSB7XG4gICAgbGV0IG8gPSBvbGRfYmxvY2tzLmxlbmd0aDtcbiAgICBsZXQgbiA9IGxpc3QubGVuZ3RoO1xuICAgIGxldCBpID0gbztcbiAgICBjb25zdCBvbGRfaW5kZXhlcyA9IHt9O1xuICAgIHdoaWxlIChpLS0pXG4gICAgICAgIG9sZF9pbmRleGVzW29sZF9ibG9ja3NbaV0ua2V5XSA9IGk7XG4gICAgY29uc3QgbmV3X2Jsb2NrcyA9IFtdO1xuICAgIGNvbnN0IG5ld19sb29rdXAgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgZGVsdGFzID0gbmV3IE1hcCgpO1xuICAgIGkgPSBuO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY29uc3QgY2hpbGRfY3R4ID0gZ2V0X2NvbnRleHQoY3R4LCBsaXN0LCBpKTtcbiAgICAgICAgY29uc3Qga2V5ID0gZ2V0X2tleShjaGlsZF9jdHgpO1xuICAgICAgICBsZXQgYmxvY2sgPSBsb29rdXAuZ2V0KGtleSk7XG4gICAgICAgIGlmICghYmxvY2spIHtcbiAgICAgICAgICAgIGJsb2NrID0gY3JlYXRlX2VhY2hfYmxvY2soa2V5LCBjaGlsZF9jdHgpO1xuICAgICAgICAgICAgYmxvY2suYygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGR5bmFtaWMpIHtcbiAgICAgICAgICAgIGJsb2NrLnAoY2hhbmdlZCwgY2hpbGRfY3R4KTtcbiAgICAgICAgfVxuICAgICAgICBuZXdfbG9va3VwLnNldChrZXksIG5ld19ibG9ja3NbaV0gPSBibG9jayk7XG4gICAgICAgIGlmIChrZXkgaW4gb2xkX2luZGV4ZXMpXG4gICAgICAgICAgICBkZWx0YXMuc2V0KGtleSwgTWF0aC5hYnMoaSAtIG9sZF9pbmRleGVzW2tleV0pKTtcbiAgICB9XG4gICAgY29uc3Qgd2lsbF9tb3ZlID0gbmV3IFNldCgpO1xuICAgIGNvbnN0IGRpZF9tb3ZlID0gbmV3IFNldCgpO1xuICAgIGZ1bmN0aW9uIGluc2VydChibG9jaykge1xuICAgICAgICB0cmFuc2l0aW9uX2luKGJsb2NrLCAxKTtcbiAgICAgICAgYmxvY2subShub2RlLCBuZXh0KTtcbiAgICAgICAgbG9va3VwLnNldChibG9jay5rZXksIGJsb2NrKTtcbiAgICAgICAgbmV4dCA9IGJsb2NrLmZpcnN0O1xuICAgICAgICBuLS07XG4gICAgfVxuICAgIHdoaWxlIChvICYmIG4pIHtcbiAgICAgICAgY29uc3QgbmV3X2Jsb2NrID0gbmV3X2Jsb2Nrc1tuIC0gMV07XG4gICAgICAgIGNvbnN0IG9sZF9ibG9jayA9IG9sZF9ibG9ja3NbbyAtIDFdO1xuICAgICAgICBjb25zdCBuZXdfa2V5ID0gbmV3X2Jsb2NrLmtleTtcbiAgICAgICAgY29uc3Qgb2xkX2tleSA9IG9sZF9ibG9jay5rZXk7XG4gICAgICAgIGlmIChuZXdfYmxvY2sgPT09IG9sZF9ibG9jaykge1xuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgICAgbmV4dCA9IG5ld19ibG9jay5maXJzdDtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgICAgIG4tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghbmV3X2xvb2t1cC5oYXMob2xkX2tleSkpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBvbGQgYmxvY2tcbiAgICAgICAgICAgIGRlc3Ryb3kob2xkX2Jsb2NrLCBsb29rdXApO1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFsb29rdXAuaGFzKG5ld19rZXkpIHx8IHdpbGxfbW92ZS5oYXMobmV3X2tleSkpIHtcbiAgICAgICAgICAgIGluc2VydChuZXdfYmxvY2spO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRpZF9tb3ZlLmhhcyhvbGRfa2V5KSkge1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlbHRhcy5nZXQobmV3X2tleSkgPiBkZWx0YXMuZ2V0KG9sZF9rZXkpKSB7XG4gICAgICAgICAgICBkaWRfbW92ZS5hZGQobmV3X2tleSk7XG4gICAgICAgICAgICBpbnNlcnQobmV3X2Jsb2NrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdpbGxfbW92ZS5hZGQob2xkX2tleSk7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKG8tLSkge1xuICAgICAgICBjb25zdCBvbGRfYmxvY2sgPSBvbGRfYmxvY2tzW29dO1xuICAgICAgICBpZiAoIW5ld19sb29rdXAuaGFzKG9sZF9ibG9jay5rZXkpKVxuICAgICAgICAgICAgZGVzdHJveShvbGRfYmxvY2ssIGxvb2t1cCk7XG4gICAgfVxuICAgIHdoaWxlIChuKVxuICAgICAgICBpbnNlcnQobmV3X2Jsb2Nrc1tuIC0gMV0pO1xuICAgIHJldHVybiBuZXdfYmxvY2tzO1xufVxuZnVuY3Rpb24gbWVhc3VyZShibG9ja3MpIHtcbiAgICBjb25zdCByZWN0cyA9IHt9O1xuICAgIGxldCBpID0gYmxvY2tzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKVxuICAgICAgICByZWN0c1tibG9ja3NbaV0ua2V5XSA9IGJsb2Nrc1tpXS5ub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiByZWN0cztcbn1cblxuZnVuY3Rpb24gZ2V0X3NwcmVhZF91cGRhdGUobGV2ZWxzLCB1cGRhdGVzKSB7XG4gICAgY29uc3QgdXBkYXRlID0ge307XG4gICAgY29uc3QgdG9fbnVsbF9vdXQgPSB7fTtcbiAgICBjb25zdCBhY2NvdW50ZWRfZm9yID0geyAkJHNjb3BlOiAxIH07XG4gICAgbGV0IGkgPSBsZXZlbHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY29uc3QgbyA9IGxldmVsc1tpXTtcbiAgICAgICAgY29uc3QgbiA9IHVwZGF0ZXNbaV07XG4gICAgICAgIGlmIChuKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoa2V5IGluIG4pKVxuICAgICAgICAgICAgICAgICAgICB0b19udWxsX291dFtrZXldID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFjY291bnRlZF9mb3Jba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVba2V5XSA9IG5ba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudGVkX2ZvcltrZXldID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXZlbHNbaV0gPSBuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbykge1xuICAgICAgICAgICAgICAgIGFjY291bnRlZF9mb3Jba2V5XSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdG9fbnVsbF9vdXQpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIHVwZGF0ZSkpXG4gICAgICAgICAgICB1cGRhdGVba2V5XSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHVwZGF0ZTtcbn1cblxuY29uc3QgaW52YWxpZF9hdHRyaWJ1dGVfbmFtZV9jaGFyYWN0ZXIgPSAvW1xccydcIj4vPVxcdXtGREQwfS1cXHV7RkRFRn1cXHV7RkZGRX1cXHV7RkZGRn1cXHV7MUZGRkV9XFx1ezFGRkZGfVxcdXsyRkZGRX1cXHV7MkZGRkZ9XFx1ezNGRkZFfVxcdXszRkZGRn1cXHV7NEZGRkV9XFx1ezRGRkZGfVxcdXs1RkZGRX1cXHV7NUZGRkZ9XFx1ezZGRkZFfVxcdXs2RkZGRn1cXHV7N0ZGRkV9XFx1ezdGRkZGfVxcdXs4RkZGRX1cXHV7OEZGRkZ9XFx1ezlGRkZFfVxcdXs5RkZGRn1cXHV7QUZGRkV9XFx1e0FGRkZGfVxcdXtCRkZGRX1cXHV7QkZGRkZ9XFx1e0NGRkZFfVxcdXtDRkZGRn1cXHV7REZGRkV9XFx1e0RGRkZGfVxcdXtFRkZGRX1cXHV7RUZGRkZ9XFx1e0ZGRkZFfVxcdXtGRkZGRn1cXHV7MTBGRkZFfVxcdXsxMEZGRkZ9XS91O1xuLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjYXR0cmlidXRlcy0yXG4vLyBodHRwczovL2luZnJhLnNwZWMud2hhdHdnLm9yZy8jbm9uY2hhcmFjdGVyXG5mdW5jdGlvbiBzcHJlYWQoYXJncykge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCAuLi5hcmdzKTtcbiAgICBsZXQgc3RyID0gJyc7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgaWYgKGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyLnRlc3QobmFtZSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXR0cmlidXRlc1tuYW1lXTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHN0ciArPSBcIiBcIiArIG5hbWU7XG4gICAgICAgIGNvbnN0IGVzY2FwZWQgPSBTdHJpbmcodmFsdWUpXG4gICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgJyYjMzQ7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csICcmIzM5OycpO1xuICAgICAgICBzdHIgKz0gXCIgXCIgKyBuYW1lICsgXCI9XCIgKyBKU09OLnN0cmluZ2lmeShlc2NhcGVkKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc3RyO1xufVxuY29uc3QgZXNjYXBlZCA9IHtcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjMzk7JyxcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0Oydcbn07XG5mdW5jdGlvbiBlc2NhcGUoaHRtbCkge1xuICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvW1wiJyY8Pl0vZywgbWF0Y2ggPT4gZXNjYXBlZFttYXRjaF0pO1xufVxuZnVuY3Rpb24gZWFjaChpdGVtcywgZm4pIHtcbiAgICBsZXQgc3RyID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBzdHIgKz0gZm4oaXRlbXNbaV0sIGkpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuY29uc3QgbWlzc2luZ19jb21wb25lbnQgPSB7XG4gICAgJCRyZW5kZXI6ICgpID0+ICcnXG59O1xuZnVuY3Rpb24gdmFsaWRhdGVfY29tcG9uZW50KGNvbXBvbmVudCwgbmFtZSkge1xuICAgIGlmICghY29tcG9uZW50IHx8ICFjb21wb25lbnQuJCRyZW5kZXIpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09ICdzdmVsdGU6Y29tcG9uZW50JylcbiAgICAgICAgICAgIG5hbWUgKz0gJyB0aGlzPXsuLi59JztcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGA8JHtuYW1lfT4gaXMgbm90IGEgdmFsaWQgU1NSIGNvbXBvbmVudC4gWW91IG1heSBuZWVkIHRvIHJldmlldyB5b3VyIGJ1aWxkIGNvbmZpZyB0byBlbnN1cmUgdGhhdCBkZXBlbmRlbmNpZXMgYXJlIGNvbXBpbGVkLCByYXRoZXIgdGhhbiBpbXBvcnRlZCBhcyBwcmUtY29tcGlsZWQgbW9kdWxlc2ApO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50O1xufVxuZnVuY3Rpb24gZGVidWcoZmlsZSwgbGluZSwgY29sdW1uLCB2YWx1ZXMpIHtcbiAgICBjb25zb2xlLmxvZyhge0BkZWJ1Z30gJHtmaWxlID8gZmlsZSArICcgJyA6ICcnfSgke2xpbmV9OiR7Y29sdW1ufSlgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS5sb2codmFsdWVzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgcmV0dXJuICcnO1xufVxubGV0IG9uX2Rlc3Ryb3k7XG5mdW5jdGlvbiBjcmVhdGVfc3NyX2NvbXBvbmVudChmbikge1xuICAgIGZ1bmN0aW9uICQkcmVuZGVyKHJlc3VsdCwgcHJvcHMsIGJpbmRpbmdzLCBzbG90cykge1xuICAgICAgICBjb25zdCBwYXJlbnRfY29tcG9uZW50ID0gY3VycmVudF9jb21wb25lbnQ7XG4gICAgICAgIGNvbnN0ICQkID0ge1xuICAgICAgICAgICAgb25fZGVzdHJveSxcbiAgICAgICAgICAgIGNvbnRleHQ6IG5ldyBNYXAocGFyZW50X2NvbXBvbmVudCA/IHBhcmVudF9jb21wb25lbnQuJCQuY29udGV4dCA6IFtdKSxcbiAgICAgICAgICAgIC8vIHRoZXNlIHdpbGwgYmUgaW1tZWRpYXRlbHkgZGlzY2FyZGVkXG4gICAgICAgICAgICBvbl9tb3VudDogW10sXG4gICAgICAgICAgICBiZWZvcmVfdXBkYXRlOiBbXSxcbiAgICAgICAgICAgIGFmdGVyX3VwZGF0ZTogW10sXG4gICAgICAgICAgICBjYWxsYmFja3M6IGJsYW5rX29iamVjdCgpXG4gICAgICAgIH07XG4gICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudCh7ICQkIH0pO1xuICAgICAgICBjb25zdCBodG1sID0gZm4ocmVzdWx0LCBwcm9wcywgYmluZGluZ3MsIHNsb3RzKTtcbiAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHBhcmVudF9jb21wb25lbnQpO1xuICAgICAgICByZXR1cm4gaHRtbDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVuZGVyOiAocHJvcHMgPSB7fSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgICAgICAgICBvbl9kZXN0cm95ID0gW107XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7IGhlYWQ6ICcnLCBjc3M6IG5ldyBTZXQoKSB9O1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9ICQkcmVuZGVyKHJlc3VsdCwgcHJvcHMsIHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgIHJ1bl9hbGwob25fZGVzdHJveSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGh0bWwsXG4gICAgICAgICAgICAgICAgY3NzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IEFycmF5LmZyb20ocmVzdWx0LmNzcykubWFwKGNzcyA9PiBjc3MuY29kZSkuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIG1hcDogbnVsbCAvLyBUT0RPXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoZWFkOiByZXN1bHQuaGVhZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgJCRyZW5kZXJcbiAgICB9O1xufVxuZnVuY3Rpb24gYWRkX2F0dHJpYnV0ZShuYW1lLCB2YWx1ZSwgYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IChib29sZWFuICYmICF2YWx1ZSkpXG4gICAgICAgIHJldHVybiAnJztcbiAgICByZXR1cm4gYCAke25hbWV9JHt2YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogYD0ke3R5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBKU09OLnN0cmluZ2lmeShlc2NhcGUodmFsdWUpKSA6IGBcIiR7dmFsdWV9XCJgfWB9YDtcbn1cbmZ1bmN0aW9uIGFkZF9jbGFzc2VzKGNsYXNzZXMpIHtcbiAgICByZXR1cm4gY2xhc3NlcyA/IGAgY2xhc3M9XCIke2NsYXNzZXN9XCJgIDogYGA7XG59XG5cbmZ1bmN0aW9uIGJpbmQoY29tcG9uZW50LCBuYW1lLCBjYWxsYmFjaykge1xuICAgIGlmIChjb21wb25lbnQuJCQucHJvcHMuaW5kZXhPZihuYW1lKSA9PT0gLTEpXG4gICAgICAgIHJldHVybjtcbiAgICBjb21wb25lbnQuJCQuYm91bmRbbmFtZV0gPSBjYWxsYmFjaztcbiAgICBjYWxsYmFjayhjb21wb25lbnQuJCQuY3R4W25hbWVdKTtcbn1cbmZ1bmN0aW9uIG1vdW50X2NvbXBvbmVudChjb21wb25lbnQsIHRhcmdldCwgYW5jaG9yKSB7XG4gICAgY29uc3QgeyBmcmFnbWVudCwgb25fbW91bnQsIG9uX2Rlc3Ryb3ksIGFmdGVyX3VwZGF0ZSB9ID0gY29tcG9uZW50LiQkO1xuICAgIGZyYWdtZW50Lm0odGFyZ2V0LCBhbmNob3IpO1xuICAgIC8vIG9uTW91bnQgaGFwcGVucyBiZWZvcmUgdGhlIGluaXRpYWwgYWZ0ZXJVcGRhdGVcbiAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3X29uX2Rlc3Ryb3kgPSBvbl9tb3VudC5tYXAocnVuKS5maWx0ZXIoaXNfZnVuY3Rpb24pO1xuICAgICAgICBpZiAob25fZGVzdHJveSkge1xuICAgICAgICAgICAgb25fZGVzdHJveS5wdXNoKC4uLm5ld19vbl9kZXN0cm95KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIEVkZ2UgY2FzZSAtIGNvbXBvbmVudCB3YXMgZGVzdHJveWVkIGltbWVkaWF0ZWx5LFxuICAgICAgICAgICAgLy8gbW9zdCBsaWtlbHkgYXMgYSByZXN1bHQgb2YgYSBiaW5kaW5nIGluaXRpYWxpc2luZ1xuICAgICAgICAgICAgcnVuX2FsbChuZXdfb25fZGVzdHJveSk7XG4gICAgICAgIH1cbiAgICAgICAgY29tcG9uZW50LiQkLm9uX21vdW50ID0gW107XG4gICAgfSk7XG4gICAgYWZ0ZXJfdXBkYXRlLmZvckVhY2goYWRkX3JlbmRlcl9jYWxsYmFjayk7XG59XG5mdW5jdGlvbiBkZXN0cm95X2NvbXBvbmVudChjb21wb25lbnQsIGRldGFjaGluZykge1xuICAgIGlmIChjb21wb25lbnQuJCQuZnJhZ21lbnQpIHtcbiAgICAgICAgcnVuX2FsbChjb21wb25lbnQuJCQub25fZGVzdHJveSk7XG4gICAgICAgIGNvbXBvbmVudC4kJC5mcmFnbWVudC5kKGRldGFjaGluZyk7XG4gICAgICAgIC8vIFRPRE8gbnVsbCBvdXQgb3RoZXIgcmVmcywgaW5jbHVkaW5nIGNvbXBvbmVudC4kJCAoYnV0IG5lZWQgdG9cbiAgICAgICAgLy8gcHJlc2VydmUgZmluYWwgc3RhdGU/KVxuICAgICAgICBjb21wb25lbnQuJCQub25fZGVzdHJveSA9IGNvbXBvbmVudC4kJC5mcmFnbWVudCA9IG51bGw7XG4gICAgICAgIGNvbXBvbmVudC4kJC5jdHggPSB7fTtcbiAgICB9XG59XG5mdW5jdGlvbiBtYWtlX2RpcnR5KGNvbXBvbmVudCwga2V5KSB7XG4gICAgaWYgKCFjb21wb25lbnQuJCQuZGlydHkpIHtcbiAgICAgICAgZGlydHlfY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG4gICAgICAgIHNjaGVkdWxlX3VwZGF0ZSgpO1xuICAgICAgICBjb21wb25lbnQuJCQuZGlydHkgPSBibGFua19vYmplY3QoKTtcbiAgICB9XG4gICAgY29tcG9uZW50LiQkLmRpcnR5W2tleV0gPSB0cnVlO1xufVxuZnVuY3Rpb24gaW5pdChjb21wb25lbnQsIG9wdGlvbnMsIGluc3RhbmNlLCBjcmVhdGVfZnJhZ21lbnQsIG5vdF9lcXVhbCwgcHJvcF9uYW1lcykge1xuICAgIGNvbnN0IHBhcmVudF9jb21wb25lbnQgPSBjdXJyZW50X2NvbXBvbmVudDtcbiAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KTtcbiAgICBjb25zdCBwcm9wcyA9IG9wdGlvbnMucHJvcHMgfHwge307XG4gICAgY29uc3QgJCQgPSBjb21wb25lbnQuJCQgPSB7XG4gICAgICAgIGZyYWdtZW50OiBudWxsLFxuICAgICAgICBjdHg6IG51bGwsXG4gICAgICAgIC8vIHN0YXRlXG4gICAgICAgIHByb3BzOiBwcm9wX25hbWVzLFxuICAgICAgICB1cGRhdGU6IG5vb3AsXG4gICAgICAgIG5vdF9lcXVhbCxcbiAgICAgICAgYm91bmQ6IGJsYW5rX29iamVjdCgpLFxuICAgICAgICAvLyBsaWZlY3ljbGVcbiAgICAgICAgb25fbW91bnQ6IFtdLFxuICAgICAgICBvbl9kZXN0cm95OiBbXSxcbiAgICAgICAgYmVmb3JlX3VwZGF0ZTogW10sXG4gICAgICAgIGFmdGVyX3VwZGF0ZTogW10sXG4gICAgICAgIGNvbnRleHQ6IG5ldyBNYXAocGFyZW50X2NvbXBvbmVudCA/IHBhcmVudF9jb21wb25lbnQuJCQuY29udGV4dCA6IFtdKSxcbiAgICAgICAgLy8gZXZlcnl0aGluZyBlbHNlXG4gICAgICAgIGNhbGxiYWNrczogYmxhbmtfb2JqZWN0KCksXG4gICAgICAgIGRpcnR5OiBudWxsXG4gICAgfTtcbiAgICBsZXQgcmVhZHkgPSBmYWxzZTtcbiAgICAkJC5jdHggPSBpbnN0YW5jZVxuICAgICAgICA/IGluc3RhbmNlKGNvbXBvbmVudCwgcHJvcHMsIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoJCQuY3R4ICYmIG5vdF9lcXVhbCgkJC5jdHhba2V5XSwgJCQuY3R4W2tleV0gPSB2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCQuYm91bmRba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgJCQuYm91bmRba2V5XSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlYWR5KVxuICAgICAgICAgICAgICAgICAgICBtYWtlX2RpcnR5KGNvbXBvbmVudCwga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgOiBwcm9wcztcbiAgICAkJC51cGRhdGUoKTtcbiAgICByZWFkeSA9IHRydWU7XG4gICAgcnVuX2FsbCgkJC5iZWZvcmVfdXBkYXRlKTtcbiAgICAkJC5mcmFnbWVudCA9IGNyZWF0ZV9mcmFnbWVudCgkJC5jdHgpO1xuICAgIGlmIChvcHRpb25zLnRhcmdldCkge1xuICAgICAgICBpZiAob3B0aW9ucy5oeWRyYXRlKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgJCQuZnJhZ21lbnQubChjaGlsZHJlbihvcHRpb25zLnRhcmdldCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50LmMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5pbnRybylcbiAgICAgICAgICAgIHRyYW5zaXRpb25faW4oY29tcG9uZW50LiQkLmZyYWdtZW50KTtcbiAgICAgICAgbW91bnRfY29tcG9uZW50KGNvbXBvbmVudCwgb3B0aW9ucy50YXJnZXQsIG9wdGlvbnMuYW5jaG9yKTtcbiAgICAgICAgZmx1c2goKTtcbiAgICB9XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHBhcmVudF9jb21wb25lbnQpO1xufVxubGV0IFN2ZWx0ZUVsZW1lbnQ7XG5pZiAodHlwZW9mIEhUTUxFbGVtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIFN2ZWx0ZUVsZW1lbnQgPSBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy4kJC5zbG90dGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBpbXByb3ZlIHR5cGluZ3NcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMuJCQuc2xvdHRlZFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0ciwgX29sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpc1thdHRyXSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgICRkZXN0cm95KCkge1xuICAgICAgICAgICAgZGVzdHJveV9jb21wb25lbnQodGhpcywgMSk7XG4gICAgICAgICAgICB0aGlzLiRkZXN0cm95ID0gbm9vcDtcbiAgICAgICAgfVxuICAgICAgICAkb24odHlwZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIC8vIFRPRE8gc2hvdWxkIHRoaXMgZGVsZWdhdGUgdG8gYWRkRXZlbnRMaXN0ZW5lcj9cbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSB8fCAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gPSBbXSkpO1xuICAgICAgICAgICAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgJHNldCgpIHtcbiAgICAgICAgICAgIC8vIG92ZXJyaWRkZW4gYnkgaW5zdGFuY2UsIGlmIGl0IGhhcyBwcm9wc1xuICAgICAgICB9XG4gICAgfTtcbn1cbmNsYXNzIFN2ZWx0ZUNvbXBvbmVudCB7XG4gICAgJGRlc3Ryb3koKSB7XG4gICAgICAgIGRlc3Ryb3lfY29tcG9uZW50KHRoaXMsIDEpO1xuICAgICAgICB0aGlzLiRkZXN0cm95ID0gbm9vcDtcbiAgICB9XG4gICAgJG9uKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSB8fCAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gPSBbXSkpO1xuICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgICRzZXQoKSB7XG4gICAgICAgIC8vIG92ZXJyaWRkZW4gYnkgaW5zdGFuY2UsIGlmIGl0IGhhcyBwcm9wc1xuICAgIH1cbn1cbmNsYXNzIFN2ZWx0ZUNvbXBvbmVudERldiBleHRlbmRzIFN2ZWx0ZUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMgfHwgKCFvcHRpb25zLnRhcmdldCAmJiAhb3B0aW9ucy4kJGlubGluZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJ3RhcmdldCcgaXMgYSByZXF1aXJlZCBvcHRpb25gKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlcigpO1xuICAgIH1cbiAgICAkZGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIuJGRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy4kZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ29tcG9uZW50IHdhcyBhbHJlYWR5IGRlc3Ryb3llZGApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IEh0bWxUYWcsIFN2ZWx0ZUNvbXBvbmVudCwgU3ZlbHRlQ29tcG9uZW50RGV2LCBTdmVsdGVFbGVtZW50LCBhZGRfYXR0cmlidXRlLCBhZGRfY2xhc3NlcywgYWRkX2ZsdXNoX2NhbGxiYWNrLCBhZGRfbG9jYXRpb24sIGFkZF9yZW5kZXJfY2FsbGJhY2ssIGFkZF9yZXNpemVfbGlzdGVuZXIsIGFkZF90cmFuc2Zvcm0sIGFmdGVyVXBkYXRlLCBhcHBlbmQsIGFzc2lnbiwgYXR0ciwgYmVmb3JlVXBkYXRlLCBiaW5kLCBiaW5kaW5nX2NhbGxiYWNrcywgYmxhbmtfb2JqZWN0LCBidWJibGUsIGNoZWNrX291dHJvcywgY2hpbGRyZW4sIGNsYWltX2VsZW1lbnQsIGNsYWltX3RleHQsIGNsZWFyX2xvb3BzLCBjb21wb25lbnRfc3Vic2NyaWJlLCBjcmVhdGVFdmVudERpc3BhdGNoZXIsIGNyZWF0ZV9hbmltYXRpb24sIGNyZWF0ZV9iaWRpcmVjdGlvbmFsX3RyYW5zaXRpb24sIGNyZWF0ZV9pbl90cmFuc2l0aW9uLCBjcmVhdGVfb3V0X3RyYW5zaXRpb24sIGNyZWF0ZV9zbG90LCBjcmVhdGVfc3NyX2NvbXBvbmVudCwgY3VycmVudF9jb21wb25lbnQsIGN1c3RvbV9ldmVudCwgZGVidWcsIGRlc3Ryb3lfYmxvY2ssIGRlc3Ryb3lfY29tcG9uZW50LCBkZXN0cm95X2VhY2gsIGRldGFjaCwgZGlydHlfY29tcG9uZW50cywgZWFjaCwgZWxlbWVudCwgZWxlbWVudF9pcywgZW1wdHksIGVzY2FwZSwgZXNjYXBlZCwgZXhjbHVkZV9pbnRlcm5hbF9wcm9wcywgZml4X2FuZF9kZXN0cm95X2Jsb2NrLCBmaXhfYW5kX291dHJvX2FuZF9kZXN0cm95X2Jsb2NrLCBmaXhfcG9zaXRpb24sIGZsdXNoLCBnZXRDb250ZXh0LCBnZXRfYmluZGluZ19ncm91cF92YWx1ZSwgZ2V0X2N1cnJlbnRfY29tcG9uZW50LCBnZXRfc2xvdF9jaGFuZ2VzLCBnZXRfc2xvdF9jb250ZXh0LCBnZXRfc3ByZWFkX3VwZGF0ZSwgZ2V0X3N0b3JlX3ZhbHVlLCBnbG9iYWxzLCBncm91cF9vdXRyb3MsIGhhbmRsZV9wcm9taXNlLCBpZGVudGl0eSwgaW5pdCwgaW5zZXJ0LCBpbnRyb3MsIGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyLCBpc19jbGllbnQsIGlzX2Z1bmN0aW9uLCBpc19wcm9taXNlLCBsaXN0ZW4sIGxvb3AsIG1lYXN1cmUsIG1pc3NpbmdfY29tcG9uZW50LCBtb3VudF9jb21wb25lbnQsIG5vb3AsIG5vdF9lcXVhbCwgbm93LCBudWxsX3RvX2VtcHR5LCBvYmplY3Rfd2l0aG91dF9wcm9wZXJ0aWVzLCBvbkRlc3Ryb3ksIG9uTW91bnQsIG9uY2UsIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrLCBwcmV2ZW50X2RlZmF1bHQsIHJhZiwgcnVuLCBydW5fYWxsLCBzYWZlX25vdF9lcXVhbCwgc2NoZWR1bGVfdXBkYXRlLCBzZWxlY3RfbXVsdGlwbGVfdmFsdWUsIHNlbGVjdF9vcHRpb24sIHNlbGVjdF9vcHRpb25zLCBzZWxlY3RfdmFsdWUsIHNlbGYsIHNldENvbnRleHQsIHNldF9hdHRyaWJ1dGVzLCBzZXRfY3VycmVudF9jb21wb25lbnQsIHNldF9jdXN0b21fZWxlbWVudF9kYXRhLCBzZXRfZGF0YSwgc2V0X2lucHV0X3R5cGUsIHNldF9pbnB1dF92YWx1ZSwgc2V0X25vdywgc2V0X3JhZiwgc2V0X3N0eWxlLCBzcGFjZSwgc3ByZWFkLCBzdG9wX3Byb3BhZ2F0aW9uLCBzdWJzY3JpYmUsIHN2Z19lbGVtZW50LCB0ZXh0LCB0aWNrLCB0aW1lX3Jhbmdlc190b19hcnJheSwgdG9fbnVtYmVyLCB0b2dnbGVfY2xhc3MsIHRyYW5zaXRpb25faW4sIHRyYW5zaXRpb25fb3V0LCB1cGRhdGVfa2V5ZWRfZWFjaCwgdmFsaWRhdGVfY29tcG9uZW50LCB2YWxpZGF0ZV9zdG9yZSwgeGxpbmtfYXR0ciB9O1xuIiwiPHNjcmlwdD5cbmV4cG9ydCBsZXQgaW1nU3JjLCBhbHQ7XG5leHBvcnQgbGV0IHByb2plY3ROYW1lO1xuZXhwb3J0IGxldCB1cmw7XG5leHBvcnQgbGV0IHdpZHRoO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgICBhLCBkaXZ7XG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICB9XG5cbiAgICBhIHtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG5cbiAgICAuaW1nLWNvbnRhaW5lcntcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB3aWR0aDogNjV2dztcbiAgICAgICAgaGVpZ2h0OiA2NXZ3O1xuICAgICAgICBtYXgtaGVpZ2h0OiAyNTBweDtcbiAgICAgICAgYm94LXNoYWRvdzogM3B4IDNweCAzcHggbGlnaHRncmV5O1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgLjNzIGVhc2UtaW47XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgICAgIC5pbWctY29udGFpbmVye1xuICAgICAgICAgICAgbWF4LXdpZHRoOjEwMCU7IFxuICAgICAgICAgICAgd2lkdGg6IDI1dnc7XG4gICAgICAgICAgICBoZWlnaHQ6IDI1dnc7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDM1MHB4O1xuICAgICAgICAgICAgbWF4LWhlaWdodDogMzUwcHg7XG4gICAgICAgIH0gXG5cbiAgICAgICAgLmxhcmdlIC5pbWctY29udGFpbmVyIHtcbiAgICAgICAgICAgIHdpZHRoOiAzMHZ3O1xuICAgICAgICAgICAgaGVpZ2h0OiAzMHZ3O1xuICAgICAgICAgICAgbWF4LXdpZHRoOiA0NTBweDtcbiAgICAgICAgICAgIG1heC1oZWlnaHQ6IDQ1MHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmZ1bGwtd2lkdGgge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICAuZnVsbC13aWR0aCAuaW1nLWNvbnRhaW5lciB7IFxuICAgICAgICAgICAgd2lkdGg6IGNhbGMoNTAlIC0gMzB2dyArIDYwdncpO1xuICAgICAgICAgICAgaGVpZ2h0OiAzMHZ3O1xuICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgICAvKiBtYXJnaW4tbGVmdDogYXV0bzsgKi9cbiAgICAgICAgICAgIG1heC13aWR0aDogMTAzOXB4O1xuICAgICAgICAgICAgbWF4LWhlaWdodDogNDUwcHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhOmhvdmVyIC5pbWctY29udGFpbmVyIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XG4gICAgICAgIGJveC1zaGFkb3c6IDVweCA1cHggNXB4IGxpZ2h0Z3JleTtcbiAgICB9XG5cbiAgICBpbWcge1xuICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIC4zcyBlYXNlLWluO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgIH1cbiAgIFxuPC9zdHlsZT5cblxuPGEgdGFyZ2V0PVwiYmxhbmtcIiBjbGFzcz1cInt3aWR0aH1cIiBocmVmPVwie3VybH1cIj5cbiAgICA8ZGl2IGNsYXNzPVwiaW1nLWNvbnRhaW5lclwiPlxuICAgICAgPGltZyBzcmM9XCJ7aW1nU3JjfVwiIGFsdD1cInthbHR9XCI+XG4gICAgPC9kaXY+XG48L2E+IiwiPHNjcmlwdD5cbmV4cG9ydCBsZXQgdGV4dDtcblxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuc3Bhbi5ob3Zlci1hbmltYXRpb24ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG5zcGFuLmhvdmVyLWFuaW1hdGlvbjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQ7XG4gICAgd2lkdGg6IDBweDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTAwJSk7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgdHJhbnNpdGlvbjogYWxsIC40NXMgY3ViaWMtYmV6aWVyKDAuODUsIDAuMDgsIDAuMDgsIDAuOTkpO1xufVxuXG5hOmhvdmVyID4gc3Bhbi5ob3Zlci1hbmltYXRpb246OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCk7XG4gICAgd2lkdGg6IDIwcHg7XG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG59XG5cbjwvc3R5bGU+XG5cbjxzcGFuIGNsYXNzPVwiaG92ZXItYW5pbWF0aW9uXCI+e3RleHR9PC9zcGFuPiIsIjxzY3JpcHQ+XG5pbXBvcnQgVGV4dEFuaW1hdGlvbiBmcm9tICcuLi9oZWxwZXItY29tcG9uZW50cy9UZXh0QW5pbWF0aW9uLnN2ZWx0ZSc7XG5cbmV4cG9ydCBsZXQgcHJvamVjdE5hbWUsIHVybCwgcHJvamVjdFRleHQsIHByb2plY3RZZWFyO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuICAgIGF7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgIGZvbnQtc2l6ZTogMTJyZW07XG4gICAgICAgIHdpZHRoOiBmaXQtY29udGVudDtcbiAgICAgICAgbWFyZ2luLXRvcDogMTByZW07XG4gICAgICAgIGNvbG9yOiAjOTg5ODk4O1xuICAgICAgICBmb250LXdlaWdodDogMzAwO1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgfVxuICAgIGgyIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBtYXJnaW46IDE1cmVtIDByZW0gNXJlbSAwcmVtO1xuICAgICAgICBmb250LXNpemU6IDEzcmVtO1xuICAgICAgICBmb250LXdlaWdodDogOTAwO1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIC4ycyBlYXNlLWluLW91dDtcbiAgICAgICAgY29sb3I6ICMzQjNCM0I7XG4gICAgICAgIHotaW5kZXg6IDI7XG4gICAgfVxuXG4gICAgcHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBsaW5lLWhlaWdodDogMTZweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgZm9udC1zaXplOiAxM3JlbTtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgY29sb3I6ICM1ODU5NWI7XG4gICAgICAgIHRleHQtaW5kZW50OiAxMHB4O1xuICAgIH1cblxuICAgIC55ZWFye1xuICAgICAgICBcbiAgICAgICAgY29udGVudDogJzIwMTknO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA5MDA7XG4gICAgICAgIG9wYWNpdHk6IC41O1xuICAgICAgICB6LWluZGV4OiAtNTtcbiAgICAgICAgbGVmdDogLTYwcHg7XG4gICAgICAgIHRvcDogMzBweDtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcbiAgICAgICAgY29sb3I6ICNlNmU3ZTg7XG4gICAgICAgIGZvbnQtc2l6ZTogNDVweDtcbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKSB7XG4gICAgICAgIGgyIHtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDByZW07XG4gICAgICAgIH1cbiAgICB9XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0ZW0pe1xuICAgIGgyIHtcbiAgICAgICAgZm9udC1zaXplOiAyM3JlbTtcbiAgICB9XG4gICAgcHtcbiAgICAgICAgZm9udC1zaXplOiAxOHJlbTtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDIzcHg7XG4gICAgfVxuICAgIGF7XG4gICAgICAgIGZvbnQtc2l6ZTogMTRyZW07XG4gICAgfVxufVxuXG48L3N0eWxlPlxuPGRpdj5cbiAgICA8aDI+e3Byb2plY3ROYW1lfTwvaDI+XG4gICAgPHA+XG4gICAgICAgIDxzcGFuIGNsYXNzPSd5ZWFyJz57cHJvamVjdFllYXJ9PC9zcGFuPlxuICAgICAgICB7QGh0bWwgcHJvamVjdFRleHR9XG4gICAgPC9wPlxuICAgIDxhIHRhcmdldD1cImJsYW5rXCIgaHJlZj1cInt1cmx9XCI+XG4gICAgICAgIDxUZXh0QW5pbWF0aW9uIHRleHQ9e2BWaWV3IFdlYnNpdGVgfSAvPlxuICAgIDwvYT5cbjwvZGl2PiIsIjxzY3JpcHQ+XG4gICAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSc7ICBcblxuICAgIGltcG9ydCBJbWFnZSBmcm9tICcuL0ltYWdlLnN2ZWx0ZSc7XG4gICAgaW1wb3J0IFRleHQgZnJvbSAnLi9UZXh0LnN2ZWx0ZSc7ICBcblxuICAgIGxldCBwb3J0Zm9saW9DYXJkcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cudmlzaXRoYWxjeW9uLmNvbScsXG4gICAgICAgICAgICBpbWdTcmM6ICdpbWFnZXMvaGFsY3lvbi01LmpwZycsXG4gICAgICAgICAgICBhbHQ6ICdUaHVtYm5haWwgZm9yIHRoZSBIYWxjeW9uIG1hbGwgd2Vic2l0ZSByZWJ1aWxkJyxcbiAgICAgICAgICAgIHByb2plY3ROYW1lOiAnSGFsY3lvbicsXG4gICAgICAgICAgICBwcm9qZWN0WWVhcjogJzIwMTknLFxuICAgICAgICAgICAgcHJvamVjdFRleHQ6IGBJIHdhcyBvbmUgb2YgdGhlIEZyb250IEVuZCBEZXZlbG9wZXJzIG9uIHRoZSBwcm9qZWN0IHByaW1hcmlseSB0YXNrZWQgd2l0aCBjcmVhdGluZyB0aGUgbW92aWVzIHBhZ2UgYW5kIGV2ZW50cyBkaXJlY3RvcnkuIEFjcm9zcyB0aGUgcHJvamVjdCBJIHdvcmtlZCB3aXRoIDxzdHJvbmc+bXVsdGlwbGUgQVBJ4oCZczwvc3Ryb25nPiwgPHN0cm9uZz5SZWFjdCBTdGF0aWM8L3N0cm9uZz4sIGFuZCBkZXZlbG9wZWQgPHN0cm9uZz5jbGVhbiBjb2RlPC9zdHJvbmc+IGZvciBvdGhlciBhZHZhbmNlZCBSZWFjdCBjb21wb25lbnRzLmBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cudXB0ZXhhcy5vcmcnLFxuICAgICAgICAgICAgaW1nU3JjOiAnaW1hZ2VzL3VwdGV4YXMtdGh1bWIuanBnJyxcbiAgICAgICAgICAgIGFsdDogJ1RodW1ibmFpbCBmb3IgdGhlIENpdHkgb2YgVW5pdmVyc2l0eSBQYXJrIGNvbXBsZXRlIEZyb250IEVuZCB3ZWJzaXRlIHJlZGVzaWduJyxcbiAgICAgICAgICAgIHByb2plY3ROYW1lOiAnVW5pdmVyc2l0eSBQYXJrJyxcbiAgICAgICAgICAgIHByb2plY3RZZWFyOiAnMjAxOScsXG4gICAgICAgICAgICBwcm9qZWN0VGV4dDogYEkgd2FzIHRhc2tlZCB3aXRoIGJlaW5nIHRoZSA8c3Ryb25nPnNvbGUgZGV2ZWxvcGVyPC9zdHJvbmc+IG9uIGEgPHN0cm9uZz5jb21wbGV0ZSBGcm9udC1FbmQgcmVkZXNpZ248L3N0cm9uZz4uIEtlZXBpbmcgdGhlaXIgY3VycmVudCB1c2VycyBpbiBtaW5kLCB0aGUgZ29hbCB3YXMgdG8gbWFrZSB0aGUgd2Vic2l0ZSBmZWVsIG1vcmUgbW9kZXJuLCBhbmQgb2ZmZXIgYSBiZXR0ZXIgdXNlciBleHBlcmllbmNlIHdoZW4gbmF2aWdhdGluZyB0byBlYWNoIGluZGl2aWR1YWwgcGFnZS4gQWNyb3NzIHRoZSBlbnRpcmUgcHJvamVjdCBJIGltcGxlbWVudGVkIHNldmVyYWwgZHluYW1pY2FsbHkgZ2VuZXJhdGVkIGNvbnRlbnQgcGFnZXMgLyBzbGlkZXJzLCA8c3Ryb25nPmZvcm0gdmVyaWZpY2F0aW9uPC9zdHJvbmc+LCBhbmQgc2V2ZXJhbCA8c3Ryb25nPnRoaXJkIHBhcnR5IGludGVncmF0aW9uczwvc3Ryb25nPi5gLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB1cmw6ICdwcm9qZWN0cy9jcmVhdGl2ZS1yZXZvbHQnLFxuICAgICAgICAgICAgaW1nU3JjOiAnaW1hZ2VzL0pvcmRlbi1CYWNrZ3JvdW5kLUdyYXkuanBnJyxcbiAgICAgICAgICAgIGFsdDogJ1RodW1ibmFpbCBmb3IgdGhlIENyZWF0aXZlIFJldm9sdCByZWRlc2lnbmVkIHdlYnNpdGUnLFxuICAgICAgICAgICAgcHJvamVjdE5hbWU6ICdDcmVhdGl2ZSBSZXZvbHQnLFxuICAgICAgICAgICAgcHJvamVjdFllYXI6ICcyMDE4JyxcbiAgICAgICAgICAgIHByb2plY3RUZXh0OiBgVGhpcyB3YXMgYSBmcmVlbGFuY2UgcHJvamVjdCB0byA8c3Ryb25nPnJld29yayB0aGUgd2Vic2l0ZSBsYXlvdXQ8L3N0cm9uZz4gYW5kIHRhaWxvciB0aGUgZmVlbCBvZiB0aGUgd2Vic2l0ZSB0byBoZXIgcGVyc29uYWwgd3JpdGluZyBzdHlsZS4gSSA8c3Ryb25nPnJldmFtcGVkIHRoZSBjb2xvciBwYWxldHRlPC9zdHJvbmc+IHRvIGJldHRlciBtYXRjaCBoZXIgcGVyc29uYWxpdHksIGFkanVzdGVkIGhlciB3ZWJzaXRlIGZvciA8c3Ryb25nPlNFTzwvc3Ryb25nPiwgYW5kIGNyZWF0ZWQgdGhlIGxhbmRpbmcgcGFnZSBhcyB3ZWxsIGFzIG11bHRpcGxlIHBhZ2VzIGFjcm9zcyB0aGUgcGxhdGZvcm0uYCxcbiAgICAgICAgfSxcbiAgICBdXG48L3NjcmlwdD5cblxuPHN0eWxlPlxuICAgIHNlY3Rpb24ge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgcGFkZGluZzogMTAlIDAgMTAlIDA7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXsgXG4gICAgICAgIHNlY3Rpb24ge1xuICAgICAgICAgICAgcGFkZGluZzogMTAlIDAgMTAlIDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXYuY2FyZC1jb250YWluZXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIHdpZHRoOiAyNTBweDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMDUlO1xuICAgIH1cblxuICAgIGRpdi5pbWFnZS1jb250YWluZXIge1xuICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgfVxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICBkaXYuY2FyZC1jb250YWluZXIge1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgICAgICAgICAgd2lkdGg6IDkwJTtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDglO1xuICAgICAgICB9XG4gICAgICAgIGRpdi5jYXJkLWNvbnRhaW5lcjpudGgtb2YtdHlwZSgybil7XG4gICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcbiAgICAgICAgIH1cbiAgICAgICAgZGl2LnRleHQtY29udGFpbmVyIHtcbiAgICAgICAgICAgIHdpZHRoOiAzNSU7XG4gICAgICAgIH1cbiAgICAgICAgZGl2LmltYWdlLWNvbnRhaW5lciB7XG4gICAgICAgICAgICB3aWR0aDogNTAlO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIGRpdi5jYXJkLWNvbnRhaW5lcjpudGgtb2YtdHlwZSgybikgZGl2LmltYWdlLWNvbnRhaW5lcntcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICAgICAgZGl2LmNhcmQtY29udGFpbmVye1xuICAgICAgICAgICAgd2lkdGg6IDg1JTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEzNjNweCl7XG4gICAgICAgIGRpdi5jYXJkLWNvbnRhaW5lcntcbiAgICAgICAgICAgIHdpZHRoOiA4MCU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGl2LnByb2plY3RzLWNvbnRhaW5lciB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgfVxuXG4gICAgaDIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwJTtcbiAgICAgICAgY29sb3I6ICMzQjNCM0I7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgfVxuXG4gICAgaDI6OmFmdGVyIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgICAgICAgd2lkdGg6IDMwcHg7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCBibGFjaztcbiAgICB9XG5cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0ZW0pe1xuICAgICAgICBoMiB7XG4gICAgICAgICAgICBmb250LXNpemU6IDIzcmVtO1xuICAgICAgICB9XG4gICAgfVxuPC9zdHlsZT5cblxuPHNlY3Rpb24+XG4gICAgPGgyPlNlbGVjdGVkIFdvcmtzPC9oMj5cbiAgICA8ZGl2IGNsYXNzPVwicHJvamVjdHMtY29udGFpbmVyXCI+XG4gICAgICAgIHsjZWFjaCBwb3J0Zm9saW9DYXJkcyBhcyBjYXJkLCBpbmRleH1cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRhaW5lclwiIHtpbmRleH0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8SW1hZ2UgaW1nU3JjPXtjYXJkLmltZ1NyY30gdXJsPXtjYXJkLnVybH0gYWx0PXtjYXJkLmFsdH0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPFRleHQgcHJvamVjdE5hbWU9e2NhcmQucHJvamVjdE5hbWV9IHVybD17Y2FyZC51cmx9IHByb2plY3RUZXh0PXtjYXJkLnByb2plY3RUZXh0fSBwcm9qZWN0WWVhcj17Y2FyZC5wcm9qZWN0WWVhcn0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICB7L2VhY2h9XG4gICAgPC9kaXY+XG48L3NlY3Rpb24+IiwiPHNjcmlwdD5cbmV4cG9ydCBsZXQgYWRkQ2xhc3M7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuc2VjdGlvbi50aXRsZXMge1xuICAgIG1hcmdpbi1ib3R0b206IDQwcmVtO1xuICAgIHRvcDogMTgwcHg7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pIHtcbiAgICBzZWN0aW9uLnRpdGxlcyB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDYwcmVtO1xuICAgICAgICBwb3NpdGlvbjogLXdlYmtpdC1zdGlja3k7XG4gICAgICAgIHBvc2l0aW9uOiBzdGlja3k7XG4gICAgfVxufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNjRlbSkge1xuICAgIHNlY3Rpb24udGl0bGVzIHtcbiAgICAgICAgdG9wOiAyNTBweDtcbiAgICB9XG59XG5cbmgxIHtcbiAgICBjb2xvcjojM0IzQjNCO1xuICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgZm9udC1zaXplOiAyM3B4O1xufVxuaDIge1xuICAgIGNvbG9yOiMzQjNCM0I7XG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICAgIG1hcmdpbi10b3A6IC0zcHg7XG4gICAgb3BhY2l0eTogLjg1O1xufVxuXG5oMyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICAgIG9wYWNpdHk6IC44O1xuICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XG59XG5cbmgzOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAzMHB4O1xuICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCBibGFjaztcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gICAgb3BhY2l0eTogLjg7XG59XG5cbiBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKSBhbmQgKG1heC13aWR0aDogNjRlbSl7XG4gICAgaDEge1xuICAgICAgICBmb250LXNpemU6IDIxcHg7XG4gICAgICAgIFxuICAgIH1cbiAgICBoMiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogN3B4O1xuICAgIH1cbiAgICBoMyB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICB9XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0ZW0pIHtcbiAgICBoMSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgICB9XG4gICAgaDIge1xuICAgICAgICBmb250LXNpemU6IDIycHg7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDdweDtcbiAgICB9XG4gICAgaDMge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIH1cbn1cblxuPC9zdHlsZT5cblxuPHNlY3Rpb24gY2xhc3M9XCJ0aXRsZXMge2FkZENsYXNzfVwiPlxuICAgIDxoMT5Gcm9udCBFbmQgRGV2ZWxvcGVyPC9oMT5cbiAgICA8aDI+UmVhY3QsIFN2ZWx0ZSwgRVM2PC9oMj5cbiAgICA8aDM+Sm9zaHVhIFJvcGVyPC9oMz5cbjwvc2VjdGlvbj4iLCI8c2NyaXB0PlxuZXhwb3J0IGxldCB0aXRsZSwgc2lkZVBhZ2U7XG4vLyBzaWRlUGFnZSBzaG91bGQgYmUgc2V0IHRvICdzaWRlLXBhZ2UnIHRvIHRvZ2dsZSBjbGFzc1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuICAgIEBrZXlmcmFtZXMgc2xpZGVJblJpZ2h0IHtcbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAa2V5ZnJhbWVzIGJhZFNsaWRlSW5SaWdodCB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICAgIGxlZnQ6IC0xMDAlO1xuICAgICAgICB9XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgICAgbGVmdDogNXB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGl2Om5vdCgucGFnZS1oZWFkZXIpIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgICAgd2lkdGg6IDY1JTtcbiAgICAgICAgbWFyZ2luOiAtMDVweCAwcHggMjBweCAwO1xuICAgICAgICBmb250LXNpemU6IDE2cmVtO1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICBjb2xvcjogIzU4NTk1YjtcbiAgICAgICAgbWF4LXdpZHRoOiAxMzIwcHg7XG4gICAgfVxuXG4gICAgZGl2LnNpZGUtcGFnZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTJyZW07XG4gICAgICAgIG1heC13aWR0aDogMTcwNXB4O1xuICAgIH1cblxuICAgIGRpdi50aXRsZS1jb250YWluZXI6bm90KC5zaWRlLXBhZ2Upe1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIC8qIGFuaW1hdGlvbjogLjlzIGVhc2Utb3V0IDBzIDEgZmFkZUluIGZvcndhcmRzOyAqL1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgZGl2LnRpdGxlLWNvbnRhaW5lcjpub3QoLnNpZGUtcGFnZSl7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICBkaXY6bm90KC5wYWdlLWhlYWRlcikge1xuICAgICAgICAgICAgZm9udC1zaXplOiAyOHJlbTtcbiAgICAgICAgICAgIHdpZHRoOiA3NSU7XG4gICAgICAgIH1cblxuICAgICAgICBkaXYuc2lkZS1wYWdlIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjRyZW07XG4gICAgICAgICAgICB3aWR0aDogODUlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoMSB7XG4gICAgICAgIGNvbG9yOiAjM0IzQjNCO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIC8qIGxlZnQ6IC0xMDAlOyAqL1xuICAgICAgICByaWdodDogMHB4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmb250LXNpemU6IDMycHg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIG1hcmdpbjogMHB4O1xuICAgICAgICAvKiBhbmltYXRpb246IDFzIGVhc2Utb3V0IDBzIDEgc2xpZGVJblJpZ2h0IGZvcndhcmRzOyAqL1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICBoMSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDU1cHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICAgICAgaDEge1xuICAgICAgICAgICAgZm9udC1zaXplOiA2NHB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGl2LnBhZ2UtaGVhZGVye1xuICAgICAgICBtYXJnaW4tdG9wOiA5MHB4O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgICAgaGVpZ2h0OiAxMjVweDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgcGFkZGluZy1sZWZ0OjIwcmVtO1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICBkaXYucGFnZS1oZWFkZXIge1xuICAgICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICAgICAgICAgICAgaGVpZ2h0OiAyMjBweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0ZW0pe1xuICAgICAgICBkaXYucGFnZS1oZWFkZXIge1xuICAgICAgICAgICAgaGVpZ2h0OiAyNTBweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNwYW57XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZVgoLTEpO1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlWCgtMSkgcm90YXRlKDE4MGRlZykgc2tldygtMTBkZWcsIDBkZWcpO1xuICAgICAgICBvcGFjaXR5OiAuMDM7XG4gICAgICAgIGxlZnQ6IDNweDtcbiAgICAgICAgYm90dG9tOiAtMjVweDtcbiAgICAgICAgZm9udC1zaXplOiAzMnB4O1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICBzcGFuIHtcbiAgICAgICAgICAgIGxlZnQ6IDVweDtcbiAgICAgICAgICAgIGJvdHRvbTogLTU1cHg7XG4gICAgICAgICAgICBmb250LXNpemU6IDU1cHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICAgICAgc3BhbiB7XG4gICAgICAgICAgICBmb250LXNpemU6IDY0cHg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG48L3N0eWxlPlxuPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyIGNvbnRhaW5lclwiPlxuICAgIDxkaXYgY2xhc3M9J3RpdGxlLWNvbnRhaW5lciB7c2lkZVBhZ2V9Jz5cbiAgICAgICAgPGgxPnt0aXRsZX08L2gxPlxuICAgICAgICA8c3Bhbj57dGl0bGV9PC9zcGFuPlxuICAgIDwvZGl2PlxuPC9kaXY+IiwiPHNjcmlwdD5cbmltcG9ydCBUZXh0QW5pbWF0aW9uIGZyb20gJy4uL2hlbHBlci1jb21wb25lbnRzL1RleHRBbmltYXRpb24uc3ZlbHRlJztcblxuZXhwb3J0IGxldCBwcm9qZWN0TmFtZSwgdXJsLCBwcm9qZWN0VGV4dCwgcHJvamVjdFllYXI7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG4gICAgYXtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgZm9udC1zaXplOiAxMnJlbTtcbiAgICAgICAgd2lkdGg6IGZpdC1jb250ZW50O1xuICAgICAgICBtYXJnaW4tdG9wOiAxMHJlbTtcbiAgICAgICAgY29sb3I6ICM5ODk4OTg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICB9XG4gICAgaDIge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIG1hcmdpbjogMTVyZW0gMHJlbSA1cmVtIDByZW07XG4gICAgICAgIGZvbnQtc2l6ZTogMTNyZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA5MDA7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2UtaW4tb3V0O1xuICAgICAgICBjb2xvcjogIzNCM0IzQjtcbiAgICAgICAgei1pbmRleDogMjtcbiAgICB9XG5cbiAgICBwe1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxNnB4O1xuICAgICAgICBmb250LXdlaWdodDogMzAwO1xuICAgICAgICBmb250LXNpemU6IDEzcmVtO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICBjb2xvcjogIzU4NTk1YjtcbiAgICAgICAgLyogdGV4dC1pbmRlbnQ6IDEwcHg7ICovXG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSkge1xuICAgICAgICBoMiB7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAwcmVtO1xuICAgICAgICB9XG4gICAgfVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICBoMiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjNyZW07XG4gICAgfVxuICAgIHB7XG4gICAgICAgIGZvbnQtc2l6ZTogMThyZW07XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyMXB4O1xuICAgIH1cbiAgICBhe1xuICAgICAgICBmb250LXNpemU6IDE0cmVtO1xuICAgIH1cbn1cblxuPC9zdHlsZT5cblxuPGRpdiBjbGFzcz1cImdyaWQteFwiPlxuICAgIDxkaXYgY2xhc3M9XCJncmlkeC01MFwiPlxuICAgICAgICA8aDI+UHJvamVjdDwvaDI+XG4gICAgICAgIDxwPlxuICAgICAgICAgICAgQ29tcGxldGUgRnJvbnQgRW5kIFJlYnVpbGRcbiAgICAgICAgPC9wPlxuICAgICAgICA8IS0tIDxhIHRhcmdldD1cImJsYW5rXCIgaHJlZj1cInt1cmx9XCI+XG4gICAgICAgICAgICA8VGV4dEFuaW1hdGlvbiB0ZXh0PXtgVmlldyBXZWJzaXRlYH0gLz5cbiAgICAgICAgPC9hPiAtLT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZ3JpZHgtNTBcIj5cbiAgICAgICAgPGgyPlJvbGU8L2gyPlxuICAgICAgICA8cD5cbiAgICAgICAgICAgIEZyb250IEVuZCBEZXZlbG9wZXJcbiAgICAgICAgPC9wPlxuICAgICAgICA8IS0tIDxhIHRhcmdldD1cImJsYW5rXCIgaHJlZj1cInt1cmx9XCI+XG4gICAgICAgICAgICA8VGV4dEFuaW1hdGlvbiB0ZXh0PXtgVmlldyBDb2RlYH0gLz5cbiAgICAgICAgPC9hPiAtLT5cbiAgICA8L2Rpdj5cbjwvZGl2PiIsIjxzY3JpcHQ+XG5pbXBvcnQgVGV4dEFuaW1hdGlvbiBmcm9tICcuLi9oZWxwZXItY29tcG9uZW50cy9UZXh0QW5pbWF0aW9uLnN2ZWx0ZSc7XG5cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gIGF7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgIGZvbnQtc2l6ZTogMTJyZW07XG4gICAgICAgIHdpZHRoOiBmaXQtY29udGVudDtcbiAgICAgICAgbWFyZ2luLXRvcDogMTByZW07XG4gICAgICAgIGNvbG9yOiAjOTg5ODk4O1xuICAgICAgICBmb250LXdlaWdodDogMzAwO1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgfVxuICAgIGgyIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBtYXJnaW46IDE1cmVtIDByZW0gNXJlbSAwcmVtO1xuICAgICAgICBmb250LXNpemU6IDEzcmVtO1xuICAgICAgICBmb250LXdlaWdodDogOTAwO1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIC4ycyBlYXNlLWluLW91dDtcbiAgICAgICAgY29sb3I6ICMzQjNCM0I7XG4gICAgICAgIHotaW5kZXg6IDI7XG4gICAgfVxuXG4gICAgcHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBsaW5lLWhlaWdodDogMTZweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgZm9udC1zaXplOiAxM3JlbTtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgY29sb3I6ICM1ODU5NWI7XG4gICAgICAgIHRleHQtaW5kZW50OiAxMHB4O1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pIHtcbiAgICAgICAgaDIge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMHJlbTtcbiAgICAgICAgfVxuICAgIH1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSl7XG4gICAgaDIge1xuICAgICAgICBmb250LXNpemU6IDIzcmVtO1xuICAgIH1cbiAgICBwe1xuICAgICAgICBmb250LXNpemU6IDE4cmVtO1xuICAgICAgICBsaW5lLWhlaWdodDogMjFweDtcbiAgICB9XG4gICAgYXtcbiAgICAgICAgZm9udC1zaXplOiAxNHJlbTtcbiAgICB9XG59XG4udGV4dC1jb250YWluZXIge1xuICAgIHBvc2l0aW9uOiBzdGlja3k7XG4gICAgdG9wOiAxMzBweDtcbn1cbjwvc3R5bGU+XG5cbjxkaXYgY2xhc3M9XCJ0ZXh0LWNvbnRhaW5lclwiPlxuICAgIDxoMj5Qcm9qZWN0IERldGFpbHM8L2gyPlxuICAgIDxwPkkgd2FzIHRhc2tlZCB3aXRoIGJlaW5nIHRoZSA8c3Ryb25nPnNvbGUgZGV2ZWxvcGVyPC9zdHJvbmc+IG9uIGEgPHN0cm9uZz5jb21wbGV0ZSBGcm9udC1FbmQgcmVkZXNpZ248L3N0cm9uZz4uIEtlZXBpbmcgdGhlaXIgY3VycmVudCB1c2VycyBpbiBtaW5kLCB0aGUgZ29hbCB3YXMgdG8gbWFrZSB0aGUgd2Vic2l0ZSBmZWVsIG1vcmUgbW9kZXJuLCBhbmQgb2ZmZXIgYSBiZXR0ZXIgdXNlciBleHBlcmllbmNlIHdoZW4gbmF2aWdhdGluZyB0byBlYWNoIGluZGl2aWR1YWwgcGFnZS4gQWNyb3NzIHRoZSBlbnRpcmUgcHJvamVjdCBJIGltcGxlbWVudGVkIHNldmVyYWwgZHluYW1pY2FsbHkgZ2VuZXJhdGVkIGNvbnRlbnQgcGFnZXMgLyBzbGlkZXJzLCA8c3Ryb25nPmZvcm0gdmVyaWZpY2F0aW9uPC9zdHJvbmc+LCBhbmQgc2V2ZXJhbCA8c3Ryb25nPnRoaXJkIHBhcnR5IGludGVncmF0aW9uczwvc3Ryb25nPi48L3A+XG4gICAgPGEgdGFyZ2V0PVwiYmxhbmtcIiBocmVmPVwiXCI+XG4gICAgICAgIDxUZXh0QW5pbWF0aW9uIHRleHQ9e2BWaWV3IFdlYnNpdGVgfSAvPlxuICAgIDwvYT5cbjwvZGl2PiIsIjxzY3JpcHQ+XG5sZXQgU1RBVEUgPSB7XG4gICAgaW1hZ2VzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltYWdlcy9oYWxjeW9uLTUuanBnJyxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICBrZXk6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltYWdlcy91cHRleGFzLXRodW1iLmpwZycsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL0pvcmRlbi1CYWNrZ3JvdW5kLUdyYXkuanBnJyxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAwLFxuICAgICAgICB9LFxuICAgIF1cbn1cblxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbi5jYXJvdXNlbC1jb250YWluZXIge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgICAvKiBoZWlnaHQ6IDcwMHB4OyAqL1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAuYm94IHtcbiAgICAgICAgLyogcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7ICovXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgYmFja2dyb3VuZDogdXJsKFwiLi4vaW1hZ2VzL2RyYXdpbmcuanBnXCIpO1xuICAgICAgICB6LWluZGV4OiAtMTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgICAgd2lkdGg6IDIzN3B4O1xuICAgICAgICBib3JkZXI6IDNweCBzb2xpZCBibGFjaztcbiAgICAgICAgaGVpZ2h0OiA0MTFweDtcbiAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgfVxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKSB7XG4gICAgLmJveCB7XG4gICAgICAgIHdpZHRoOiAzNTVweDtcbiAgICAgICAgaGVpZ2h0OiA2MTZweDtcbiAgICB9XG59XG5cbi8qIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEzNjZweCl7XG4gICAgLmJveCB7XG4gICAgICAgIHdpZHRoOiA0OTdweDtcbiAgICAgICAgaGVpZ2h0OiA4NjIuNHB4O1xuICAgIH1cbn0gKi9cblxuLnNsaWRlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDk1JTtcbiAgICBoZWlnaHQ6IDgwJTtcbiAgICByaWdodDogMDtcbiAgICB0b3A6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG59XG5cbmltZyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG9iamVjdC1maXQ6IGNvdmVyOyAgXG59XG5cbjwvc3R5bGU+XG5cbjxkaXYgY2xhc3M9XCJjYXJvdXNlbC1jb250YWluZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwiYm94XCI+PC9kaXY+XG4gICAgICAgIHsjZWFjaCBTVEFURS5pbWFnZXMgYXMgaW1nfVxuICAgICAgICAgICAgeyNpZiBpbWcudmlzaWJsZX1cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2xpZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJ7aW1nLnNyY31cIiBhbHQ9XCJ3YXNzdXBcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgIHsvZWFjaH1cbiAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwic2xpZGVcIj5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiaW1hZ2VzL0pvcmRlbi1CYWNrZ3JvdW5kLUdyYXkuanBnXCIgYWx0PVwid2Fzc3VwXCI+XG4gICAgICAgIDwvZGl2PiAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlc1wiPlxuICAgICAgICB7I2VhY2ggU1RBVEUuaW1hZ2VzIGFzIGltZywgaX1cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+Y2lyY2xlIHtpfTwvc3Bhbj5cbiAgICAgICAgey9lYWNofVxuICAgIDwvZGl2PlxuPC9kaXY+IiwiPHNjcmlwdD5cbmltcG9ydCBQYWdlVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wcm9qZWN0LWRldGFpbC9QYWdlVGl0bGUuc3ZlbHRlJztcbmltcG9ydCBJbWFnZUdyaWQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wcm9qZWN0LWRldGFpbC9JbWFnZUdyaWQuc3ZlbHRlJztcbmltcG9ydCBEZXNjcmlwdGlvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL3Byb2plY3QtZGV0YWlsL0Rlc2NyaXB0aW9uLnN2ZWx0ZSdcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbjwvc3R5bGU+XG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPkNyZWF0aXZlIFJldm9sdCB8IEZyb250IEVuZCBEZXZlbG9wZXIgLSBKb3NodWEgUm9wZXI8L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cblxuPGRpdiBcbiAgICBpbjpmbHk9XCJ7eyB4OiAtODAsIGR1cmF0aW9uOiA1MDAsIGRlbGF5OiAyMDAsIH19XCJcbj5cbiAgICA8UGFnZVRpdGxlIHRpdGxlPXsnQ3JlYXRpdmUgUmV2b2x0J30gLz5cbjwvZGl2PlxuXG48c2VjdGlvbiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgPCEtLSA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxEZXNjcmlwdGlvbiAvPlxuICAgPC9kaXY+ICAtLT5cbiAgICA8SW1hZ2VHcmlkIC8+XG48L3NlY3Rpb24+IiwiPHNjcmlwdD5cbmV4cG9ydCBsZXQgdGl0bGUsIHNpZGVQYWdlO1xuLy8gc2lkZVBhZ2Ugc2hvdWxkIGJlIHNldCB0byAnc2lkZS1wYWdlJyB0byB0b2dnbGUgY2xhc3Ncbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbiAgICBAa2V5ZnJhbWVzIHNsaWRlSW5SaWdodCB7XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQGtleWZyYW1lcyBiYWRTbGlkZUluUmlnaHQge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgICBsZWZ0OiAtMTAwJTtcbiAgICAgICAgfVxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICAgIGxlZnQ6IDVweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpdjpub3QoLnBhZ2UtaGVhZGVyKSB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICAgIHdpZHRoOiA2NSU7XG4gICAgICAgIG1hcmdpbjogLTA1cHggMHB4IDIwcHggMDtcbiAgICAgICAgZm9udC1zaXplOiAxNnJlbTtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgY29sb3I6ICM1ODU5NWI7XG4gICAgICAgIG1heC13aWR0aDogOTAwcHg7XG4gICAgfVxuXG4gICAgZGl2LnNpZGUtcGFnZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTJyZW07XG4gICAgICAgIG1heC13aWR0aDogMTcwNXB4O1xuICAgIH1cblxuICAgIGRpdi50aXRsZS1jb250YWluZXI6bm90KC5zaWRlLXBhZ2Upe1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIC8qIGFuaW1hdGlvbjogLjlzIGVhc2Utb3V0IDBzIDEgZmFkZUluIGZvcndhcmRzOyAqL1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgZGl2LnRpdGxlLWNvbnRhaW5lcjpub3QoLnNpZGUtcGFnZSl7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgICAgICAgd2lkdGg6IDc1JTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRpdjpub3QoLnBhZ2UtaGVhZGVyKSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDI4cmVtO1xuICAgICAgICAgICAgd2lkdGg6IDc1JTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRpdi5zaWRlLXBhZ2Uge1xuICAgICAgICAgICAgZm9udC1zaXplOiAyNHJlbTtcbiAgICAgICAgICAgIHdpZHRoOiA4NSVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGgxIHtcbiAgICAgICAgY29sb3I6ICMzQjNCM0I7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgLyogbGVmdDogLTEwMCU7ICovXG4gICAgICAgIHJpZ2h0OiAwcHg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZvbnQtc2l6ZTogMzJweDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luOiAwcHg7XG4gICAgICAgIC8qIGFuaW1hdGlvbjogMXMgZWFzZS1vdXQgMHMgMSBzbGlkZUluUmlnaHQgZm9yd2FyZHM7ICovXG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgICAgIGgxIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNTVweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0ZW0pe1xuICAgICAgICBoMSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDY0cHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXYucGFnZS1oZWFkZXJ7XG4gICAgICAgIG1hcmdpbi10b3A6IDkwcHg7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgICAgICBoZWlnaHQ6IDEyNXB4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBwYWRkaW5nLWxlZnQ6MjByZW07XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgICAgIGRpdi5wYWdlLWhlYWRlciB7XG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgICAgYm94LXNpemluZzogY29udGVudC1ib3g7XG4gICAgICAgICAgICBoZWlnaHQ6IDIyMHB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSl7XG4gICAgICAgIGRpdi5wYWdlLWhlYWRlciB7XG4gICAgICAgICAgICBoZWlnaHQ6IDI1MHB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3BhbntcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlWCgtMSk7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGVYKC0xKSByb3RhdGUoMTgwZGVnKSBza2V3KC0xMGRlZywgMGRlZyk7XG4gICAgICAgIG9wYWNpdHk6IC4wMztcbiAgICAgICAgbGVmdDogM3B4O1xuICAgICAgICBib3R0b206IC0yNXB4O1xuICAgICAgICBmb250LXNpemU6IDMycHg7XG4gICAgICAgICAvKiBhbmltYXRpb246IDFzIGVhc2Utb3V0IDBzIDEgYmFkU2xpZGVJblJpZ2h0OyAqL1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICBzcGFuIHtcbiAgICAgICAgICAgIGxlZnQ6IDVweDtcbiAgICAgICAgICAgIGJvdHRvbTogLTU1cHg7XG4gICAgICAgICAgICBmb250LXNpemU6IDU1cHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICAgICAgc3BhbiB7XG4gICAgICAgICAgICBmb250LXNpemU6IDY0cHg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG48L3N0eWxlPlxuPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyXCI+XG4gICAgPGRpdiBjbGFzcz0ndGl0bGUtY29udGFpbmVyIHtzaWRlUGFnZX0nPlxuICAgICAgICA8aDE+e3RpdGxlfTwvaDE+XG4gICAgICAgIDxzcGFuPnt0aXRsZX08L3NwYW4+XG4gICAgPC9kaXY+XG48L2Rpdj4iLCI8c2NyaXB0PlxuaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSdcbmltcG9ydCB7IGZhZGUsIGZseSB9IGZyb20gJ3N2ZWx0ZS90cmFuc2l0aW9uJztcblxuaW1wb3J0IFBhZ2VUaXRsZSBmcm9tICcuLi9jb21wb25lbnRzL2Fib3V0L1BhZ2VUaXRsZS5zdmVsdGUnO1xuXG5pbXBvcnQgQWJvdXRNZSBmcm9tICcuLi9jb21wb25lbnRzL2Fib3V0L0Fib3V0TWUuc3ZlbHRlJztcbmltcG9ydCBTa2lsbHNTZWN0aW9uIGZyb20gJy4uL2NvbXBvbmVudHMvYWJvdXQvU2tpbGxzLnN2ZWx0ZSc7XG5pbXBvcnQgQ29udGFjdCBmcm9tICcuLi9jb21wb25lbnRzL2Fib3V0L0NvbnRhY3Quc3ZlbHRlJztcblxuICAgIC8vIGxldCB4ID0gLjI1O1xuICAgIC8vIGxldCBzZWN0aW9ucyA9IFtdO1xuXG4gICAgLy8gb25Nb3VudCgoKT0+e1xuICAgIC8vICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VjdGlvbnMubGVuZ3RoOyBpKyspe1xuICAgIC8vICAgICAgICAgbGV0IGZhZGVJbk9yZGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgIC8vICAgICAgICAgICAgIHNlY3Rpb25zW2ldLnN0eWxlLmFuaW1hdGlvbiA9IGAkeycxJ31zIGVhc2UtaW4gJHt4fXMgMSBmYWRlSW5MZWZ0IGZvcndhcmRzYDtcbiAgICAvLyAgICAgICAgICAgICB4ICs9IC4zNTtcblxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgZmFkZUluT3JkZXIoKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pXG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG4gc2VjdGlvbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcGFkZGluZzogNSUgMCAwJSAwO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBjb2xvcjogZ3JheTtcbiAgICBtYXJnaW4tYm90dG9tOiA1MHB4O1xufVxuXG5cdHNlY3Rpb246OmJlZm9yZSB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgei1pbmRleDogLTE7XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgICAgIHNlY3Rpb257XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA4MHB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSkge1xuICAgICAgICBzZWN0aW9ue1xuICAgICAgICAgICAgZmxleDogMTtcbiAgICAgICAgfVxuICAgIH1cblxuXHQuY29udGVudC1jb250YWluZXIge1xuICAgICAgICB3aWR0aDogOTAlO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiA0MHJlbTtcdFx0XG4gICAgICAgIC8qIG9wYWNpdHk6IDA7ICovXG4gICAgICAgIG1heC13aWR0aDogOTAwcHg7XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgICAgIC5jb250ZW50LWNvbnRhaW5lciB7XG4gICAgICAgICAgICB3aWR0aDogNzUlO1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogNTByZW07XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMTAwcmVtO1xuICAgICAgICB9XG4gICAgfVxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0ZW0pIHtcbiAgICAgICAgLmNvbnRlbnQtY29udGFpbmVyIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuPC9zdHlsZT5cblxuPHN2ZWx0ZTpoZWFkPlxuXHQ8dGl0bGU+QWJvdXQgfCBGcm9udCBFbmQgRGV2ZWxvcGVyIC0gSm9zaHVhIFJvcGVyPC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cbjxkaXYgXG4gICAgaW46Zmx5PVwie3sgeDogLTgwLCBkdXJhdGlvbjogNTAwLCBkZWxheTogMjAwLCB9fVwiXG4+XG4gICAgPFBhZ2VUaXRsZSB0aXRsZT17J0pvc2h1YSBSb3Blcid9IC8+XG48L2Rpdj5cblxuPHNlY3Rpb24+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgaW46Zmx5PVwie3sgeDogLTQwLCBkdXJhdGlvbjogNTAwLCBkZWxheTogNDUwLCB9fVwiXG4gICAgICAgICAgICBjbGFzcz1cImNvbnRlbnQtY29udGFpbmVyXCJcbiAgICAgICAgID5cbiAgICAgICAgICAgIDxBYm91dE1lIC8+XG4gICAgICAgIDwvZGl2PiBcbiAgICAgICAgPGRpdiBcbiAgICAgICAgICAgIGluOmZseT1cInt7IHg6IC00MCwgZHVyYXRpb246IDUwMCwgZGVsYXk6IDY1MCwgfX1cIlxuICAgICAgICAgICAgY2xhc3M9XCJjb250ZW50LWNvbnRhaW5lclwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxTa2lsbHNTZWN0aW9uIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgaW46Zmx5PVwie3sgeDogLTQwLCBkdXJhdGlvbjogNTAwLCBkZWxheTogOTAwLCB9fVwiXG4gICAgICAgICAgICBjbGFzcz1cImNvbnRlbnQtY29udGFpbmVyXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPENvbnRhY3QgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3NlY3Rpb24+IiwiPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XG5cdGV4cG9ydCBmdW5jdGlvbiBwcmVsb2FkKHsgcGFyYW1zLCBxdWVyeSB9KSB7XG5cdFx0cmV0dXJuIHRoaXMuZmV0Y2goYGJsb2cuanNvbmApLnRoZW4ociA9PiByLmpzb24oKSkudGhlbihwb3N0cyA9PiB7XG5cdFx0XHRyZXR1cm4geyBwb3N0cyB9O1xuXHRcdH0pO1xuXHR9XG48L3NjcmlwdD5cblxuPHNjcmlwdD5cblx0ZXhwb3J0IGxldCBwb3N0cztcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cdHVsIHtcblx0XHRtYXJnaW46IDAgMCAxZW0gMDtcblx0XHRsaW5lLWhlaWdodDogMS41O1xuXHR9XG48L3N0eWxlPlxuXG48c3ZlbHRlOmhlYWQ+XG5cdDx0aXRsZT5CbG9nPC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cbjxoMT5SZWNlbnQgcG9zdHM8L2gxPlxuXG48dWw+XG5cdHsjZWFjaCBwb3N0cyBhcyBwb3N0fVxuXHRcdDwhLS0gd2UncmUgdXNpbmcgdGhlIG5vbi1zdGFuZGFyZCBgcmVsPXByZWZldGNoYCBhdHRyaWJ1dGUgdG9cblx0XHRcdFx0dGVsbCBTYXBwZXIgdG8gbG9hZCB0aGUgZGF0YSBmb3IgdGhlIHBhZ2UgYXMgc29vbiBhc1xuXHRcdFx0XHR0aGUgdXNlciBob3ZlcnMgb3ZlciB0aGUgbGluayBvciB0YXBzIGl0LCBpbnN0ZWFkIG9mXG5cdFx0XHRcdHdhaXRpbmcgZm9yIHRoZSAnY2xpY2snIGV2ZW50IC0tPlxuXHRcdDxsaT48YSByZWw9J3ByZWZldGNoJyBocmVmPSdibG9nL3twb3N0LnNsdWd9Jz57cG9zdC50aXRsZX08L2E+PC9saT5cblx0ey9lYWNofVxuPC91bD4iLCI8c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIj5cblx0ZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByZWxvYWQoeyBwYXJhbXMsIHF1ZXJ5IH0pIHtcblx0XHQvLyB0aGUgYHNsdWdgIHBhcmFtZXRlciBpcyBhdmFpbGFibGUgYmVjYXVzZVxuXHRcdC8vIHRoaXMgZmlsZSBpcyBjYWxsZWQgW3NsdWddLnN2ZWx0ZVxuXHRcdGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuZmV0Y2goYGJsb2cvJHtwYXJhbXMuc2x1Z30uanNvbmApO1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuXG5cdFx0aWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuXHRcdFx0cmV0dXJuIHsgcG9zdDogZGF0YSB9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmVycm9yKHJlcy5zdGF0dXMsIGRhdGEubWVzc2FnZSk7XG5cdFx0fVxuXHR9XG48L3NjcmlwdD5cblxuPHNjcmlwdD5cblx0ZXhwb3J0IGxldCBwb3N0O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblx0Lypcblx0XHRCeSBkZWZhdWx0LCBDU1MgaXMgbG9jYWxseSBzY29wZWQgdG8gdGhlIGNvbXBvbmVudCxcblx0XHRhbmQgYW55IHVudXNlZCBzdHlsZXMgYXJlIGRlYWQtY29kZS1lbGltaW5hdGVkLlxuXHRcdEluIHRoaXMgcGFnZSwgU3ZlbHRlIGNhbid0IGtub3cgd2hpY2ggZWxlbWVudHMgYXJlXG5cdFx0Z29pbmcgdG8gYXBwZWFyIGluc2lkZSB0aGUge3t7cG9zdC5odG1sfX19IGJsb2NrLFxuXHRcdHNvIHdlIGhhdmUgdG8gdXNlIHRoZSA6Z2xvYmFsKC4uLikgbW9kaWZpZXIgdG8gdGFyZ2V0XG5cdFx0YWxsIGVsZW1lbnRzIGluc2lkZSAuY29udGVudFxuXHQqL1xuXHQuY29udGVudCA6Z2xvYmFsKGgyKSB7XG5cdFx0Zm9udC1zaXplOiAxLjRlbTtcblx0XHRmb250LXdlaWdodDogNTAwO1xuXHR9XG5cblx0LmNvbnRlbnQgOmdsb2JhbChwcmUpIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xuXHRcdGJveC1zaGFkb3c6IGluc2V0IDFweCAxcHggNXB4IHJnYmEoMCwwLDAsMC4wNSk7XG5cdFx0cGFkZGluZzogMC41ZW07XG5cdFx0Ym9yZGVyLXJhZGl1czogMnB4O1xuXHRcdG92ZXJmbG93LXg6IGF1dG87XG5cdH1cblxuXHQuY29udGVudCA6Z2xvYmFsKHByZSkgOmdsb2JhbChjb2RlKSB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cdFx0cGFkZGluZzogMDtcblx0fVxuXG5cdC5jb250ZW50IDpnbG9iYWwodWwpIHtcblx0XHRsaW5lLWhlaWdodDogMS41O1xuXHR9XG5cblx0LmNvbnRlbnQgOmdsb2JhbChsaSkge1xuXHRcdG1hcmdpbjogMCAwIDAuNWVtIDA7XG5cdH1cbjwvc3R5bGU+XG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPntwb3N0LnRpdGxlfTwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG48aDE+e3Bvc3QudGl0bGV9PC9oMT5cblxuPGRpdiBjbGFzcz0nY29udGVudCc+XG5cdHtAaHRtbCBwb3N0Lmh0bWx9XG48L2Rpdj5cbiIsIjxzY3JpcHQ+XG5pbXBvcnQgeyBvbk1vdW50LCBhZnRlclVwZGF0ZSwgdGljayAgfSBmcm9tICdzdmVsdGUnO1xuXG5leHBvcnQgbGV0IHRvZ2dsZTtcbmV4cG9ydCBsZXQgaGFtYnVyZ2VyO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuQGtleWZyYW1lcyBsZWF2ZVNjcmVlbiB7XG4gIDEwMCV7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDk5OTlweClcbiAgfVxufVxuXG4jdG9nZ2xlIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLmhhbWJ1cmdlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gIGJvcmRlci1ib3R0b206IDIuMnB4IHNvbGlkIGJsYWNrO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHdpZHRoOiAyNHB4O1xuICBoZWlnaHQ6IDIycHg7XG4gIHRyYW5zaXRpb246IHdpZHRoIC40NXMgY3ViaWMtYmV6aWVyKDAuODUsIDAuMDgsIDAuMDgsIDAuOTkpO1xufVxuXG4uaGFtYnVyZ2VyOjpiZWZvcmUge1xuICBjb250ZW50OiAnJztcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJvcmRlci1ib3R0b206IDIuNXB4IHNvbGlkIGJsYWNrO1xuICB3aWR0aDogMThweDtcbiAgdHJhbnNpdGlvbjogd2lkdGggLjQ1cyBjdWJpYy1iZXppZXIoMC44NSwgMC4wOCwgMC4wOCwgMC45OSk7XG59XG5cbi5oYW1idXJnZXI6OmFmdGVyIHtcbiAgY29udGVudDogJyc7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBib3JkZXItYm90dG9tOiAyLjJweCBzb2xpZCBibGFjaztcbiAgd2lkdGg6IDMycHg7XG59XG5cbi5iYWNrZ3JvdW5kIHtcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjMxOSk7XG4gIG9wYWNpdHk6IDA7XG4gIHdpZHRoOiAxMDB2dztcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6IDE7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgLjM1cyBlYXNlLWluO1xuICBhbmltYXRpb246IC4wMXMgZWFzZS1pbiAuMzVzIDEgbGVhdmVTY3JlZW4gZm9yd2FyZHM7XG59XG5cbiN0b2dnbGU6aG92ZXIgKyAuYmFja2dyb3VuZCArIGxhYmVsID4gLmhhbWJ1cmdlciB7XG4gIHdpZHRoOiAzMnB4O1xufVxuXG4jdG9nZ2xlOmNoZWNrZWQgKyAuYmFja2dyb3VuZCArIGxhYmVsID4gLmhhbWJ1cmdlciB7XG4gIHdpZHRoOiAzMnB4O1xufVxuXG4jdG9nZ2xlOmhvdmVyICsgLmJhY2tncm91bmQgKyBsYWJlbCA+IC5oYW1idXJnZXI6OmJlZm9yZSB7XG4gIHdpZHRoOiAzMnB4O1xufVxuXG4jdG9nZ2xlOmNoZWNrZWQgKyAuYmFja2dyb3VuZCArIGxhYmVsID4gLmhhbWJ1cmdlcjo6YmVmb3JlIHtcbiAgd2lkdGg6IDMycHg7XG59XG5cbiN0b2dnbGU6Y2hlY2tlZCArIC5iYWNrZ3JvdW5kIHtcbiAgb3BhY2l0eTogMTtcbiAgei1pbmRleDogMTtcbiAgYW5pbWF0aW9uOiB1bnNldDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSl7XG4gIGxhYmVsIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG59XG5cbi5zaG93LWZvci1zciB7XG4gIGJvcmRlcjogMDtcbiAgY2xpcDogcmVjdCgxcHgsIDFweCwgMXB4LCAxcHgpO1xuICBjbGlwLXBhdGg6IGluc2V0KDUwJSk7XG4gIGhlaWdodDogMXB4O1xuICBtYXJnaW46IC0xcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBhZGRpbmc6IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDFweDtcbiAgd29yZC13cmFwOiBub3JtYWwgIWltcG9ydGFudDtcbn1cblxuPC9zdHlsZT5cblxuPGlucHV0IGlkPVwidG9nZ2xlXCIgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJoaWRlIHN1Ym5hdi10b2dnbGUgaGlkZS1mb3IteGxnXCI+XG48ZGl2IGNsYXNzPVwiYmFja2dyb3VuZFwiIG9uOmNsaWNrPjwvZGl2PlxuPGxhYmVsIGlkPVwibmF2LWxhYmVsXCIgYmluZDp0aGlzPXtoYW1idXJnZXJ9IGZvcj1cInRvZ2dsZVwiIGNsYXNzPVwiaGlkZS1mb3IteGxnXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJzaG93LWZvci1zclwiPk5hdmlnYXRpb248L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJoYW1idXJnZXJcIiB0aXRsZT1cIk5hdmlnYXRpb25cIj4gPC9zcGFuPlxuPC9sYWJlbD4iLCI8c2NyaXB0PlxuICAgIGltcG9ydCB7IGNyZWF0ZUV2ZW50RGlzcGF0Y2hlciB9IGZyb20gJ3N2ZWx0ZSc7XG4gICAgaW1wb3J0IHsgZmFkZSwgZmx5IH0gZnJvbSAnc3ZlbHRlL3RyYW5zaXRpb24nO1xuXG4gICAgZXhwb3J0IGxldCBzaG93TW9kYWxcbiAgICBcbiAgICBjb25zdCBkaXNwYXRjaCA9IGNyZWF0ZUV2ZW50RGlzcGF0Y2hlcigpO1xuICAgIFxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuICAgIC5tb2RhbC1jb250YWluZXJ7XG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcblx0XHR0b3A6IDA7XG5cdFx0bGVmdDogMDtcblx0XHR3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB6LWluZGV4OiA1MDtcbiAgICB9XG5cdC5tb2RhbC1iYWNrZ3JvdW5kIHtcblx0XHRwb3NpdGlvbjogZml4ZWQ7XG5cdFx0dG9wOiAwO1xuXHRcdGxlZnQ6IDA7XG5cdFx0d2lkdGg6IDEwMCU7XG5cdFx0aGVpZ2h0OiAxMDAlO1xuXHRcdHotaW5kZXg6IC0xO1xuICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuMyk7XG5cdH1cblxuXHQuY29udGFpbmVye1xuXHRcdHdpZHRoOiAxMDAlO1xuXHRcdGhlaWdodDogMTAwJTtcblx0fVxuXG5cdC5tb2RhbCB7XG4gICAgICAgIHdpZHRoOiBjYWxjKDEwMHZ3IC0gNGVtKTtcbiAgICAgICAgd2lkdGg6IDgwJTtcblx0XHRtYXgtd2lkdGg6IDY1MHB4O1xuXHRcdG1heC1oZWlnaHQ6IDkwdmg7XG5cdFx0b3ZlcmZsb3c6IGF1dG87XG5cdFx0Ym9yZGVyLXJhZGl1czogMTByZW07XG4gICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgICB6LWluZGV4OiA1MDtcbiAgICB9XG4gICAgXG5cdEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuXHRcdC5tb2RhbCB7XG5cdFx0XHRtYXgtaGVpZ2h0OiA0NTBweDtcblx0XHRcdG1heC13aWR0aDogNjAwcHg7XG5cdFx0XHR3aWR0aDogODUlO1xuXHRcdH1cbiAgICB9XG5cblx0QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSl7XG5cdFx0Lm1vZGFsIHtcblx0XHRcdHdpZHRoOiA3MCU7XG5cdFx0XHRtYXgtd2lkdGg6IDc1MHB4O1xuXHRcdH1cbiAgICB9XG4gICAgXG5cdGJ1dHRvbiB7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG4gICAgfSAgIFxuICAgIFxuPC9zdHlsZT5cblxuPGRpdiBjbGFzcz0nY2VudGVyLWFsbCBtb2RhbC1jb250YWluZXIge3Nob3dNb2RhbCA/ICdzaG93LW1vZGFsJyA6ICcnfScgaW46ZmFkZSBvdXQ6ZmFkZSA+XG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJhY2tncm91bmRcIiBvbjpjbGljaz48L2Rpdj5cblx0PGRpdiBjbGFzcz0nbW9kYWwnIGluOmZseT1cInt7IHk6IC0yMCwgZHVyYXRpb246IDQ1MCwgZGVsYXk6IDIwMCwgfX1cIiBvdXQ6Zmx5PVwie3sgeTogLTIwLCBkdXJhdGlvbjogNDUwIH19XCI+XG5cdFx0PHNsb3QgbmFtZT0naGVhZGVyJz48L3Nsb3Q+XG5cdFx0PHNsb3Q+PC9zbG90PlxuXHQ8L2Rpdj5cbjwvZGl2PiIsIjxzY3JpcHQ+XG4gICAgaW1wb3J0IHsgZmFkZSwgZmx5IH0gZnJvbSAnc3ZlbHRlL3RyYW5zaXRpb24nO1xuXG5cdGltcG9ydCBNb2RhbFRlbXBsYXRlIGZyb20gJy4vTW9kYWxUZW1wbGF0ZS5zdmVsdGUnO1xuICAgIGltcG9ydCBCb3hMb2FkZXIgZnJvbSAnLi4vbG9hZGVycy9Cb3hMb2FkZXIuc3ZlbHRlJztcblxuICAgIGV4cG9ydCBsZXQgc2hvd01vZGFsO1xuXG4gICAgbGV0IGhpZGVNb2RhbCA9IGZhbHNlO1xuICAgIGxldCBmaWVsZElucHV0cyA9IFtdO1xuXG4gICAgbGV0IGZvcm1TdGF0ZSA9IHtcbiAgICAgICAgc3VibWl0dGluZ0Zvcm06IGZhbHNlLFxuICAgICAgICBmb3JtU3VjY2VzczogZmFsc2UsXG4gICAgICAgIGZvcm1FcnJvcjogZmFsc2UsXG4gICAgICAgIGhpZGVGaWVsZHM6IGZhbHNlXG4gICAgfVxuXG4gICAgbGV0IGRlZmF1bHRGb3JtU3RhdGUgPSBmb3JtU3RhdGU7XG5cbiAgICBmdW5jdGlvbiByZXNldEZvcm0od2FpdCl7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3Qgc3RhdGVPYmogPSBPYmplY3QuZW50cmllcyhmb3JtU3RhdGUpO1xuXG4gICAgICAgICAgICBmb3IoY29uc3QgW3N0YXRlS2V5LCBzdGF0ZVZhbHVlXSBvZiBzdGF0ZU9iail7XG4gICAgICAgICAgICAgICAgZm9ybVN0YXRlW3N0YXRlS2V5XSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmaWVsZElucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCB3YWl0KVxuICAgIH1cbiAgICBcbiAgICBhc3luYyBmdW5jdGlvbiBoYW5kbGVTdWJtaXQoZSl7XG4gICAgICAgIGZvcm1TdGF0ZS5zdWJtaXR0aW5nRm9ybSA9IHRydWU7XG4gICAgICAgIGZvcm1TdGF0ZS5oaWRlRmllbGRzID0gdHJ1ZVxuICAgICAgICBmb3JtU3RhdGUuZm9ybVN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgZm9ybUZpZWxkTmFtZXMgPSBbJ25hbWUnLCAnZW1haWwnLCAnbWVzc2FnZSddOyAvLyBUT0RPIC0gZ2VuZXJhdGUgZmllbGQgbmFtZXMgYmFzZWQgb24gaW5wdXRzXG4gICAgICAgIGNvbnN0IGZvcm1UZXh0T2JqID0gYnVpbGRGb3JtU3VibWlzc2lvblRleHRPYmooZS50YXJnZXQsIGZvcm1GaWVsZE5hbWVzKTtcblxuICAgICAgICBjb25zdCBBUElfVVJMID0gYGh0dHBzOi8vc2NyaXB0Lmdvb2dsZS5jb20vbWFjcm9zL3MvQUtmeWNieWZJUlhFZXFuTFBWcTRzMmhHX2IzNWxtY20yRkNuNzY4UVdDOVdmZy9leGVjYDtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB7IFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBmb3JtVGV4dE9iaixcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKEFQSV9VUkwsIHNldHRpbmdzKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBmb3JtU3RhdGUuc3VibWl0dGluZ0Zvcm0gPSBmYWxzZTtcbiAgICAgICAgICAgIGZvcm1TdGF0ZS5mb3JtU3VjY2VzcyA9IHRydWU7XG5cbiAgICAgICAgICAgIHJlc2V0Rm9ybSgxNjAwKTsgICAgICAgXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGZvcm1TdGF0ZS5zdWJtaXR0aW5nRm9ybSA9IGZhbHNlO1xuICAgICAgICAgICAgZm9ybVN0YXRlLmZvcm1FcnJvciA9IHRydWU7XG5cbiAgICAgICAgICAgIHJlc2V0Rm9ybSgxNjAwKTsgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBidWlsZEZvcm1TdWJtaXNzaW9uVGV4dE9iaihmb3JtRXZlbnRUYXJnZXQsIGZvcm1GaWVsZE5hbWVzKXtcbiAgICAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICBcbiAgICAgICAgZm9ybUZpZWxkTmFtZXMuZm9yRWFjaChmaWVsZE5hbWUgPT4ge1xuICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoYCR7ZmllbGROYW1lfWAsIGAke2Zvcm1FdmVudFRhcmdldFtmaWVsZE5hbWVdLnZhbHVlfWApO1xuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBmb3JtRGF0YVxuICAgIH1cblxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuICAgLnRleHQtY29udGFpbmVyIGgye1xuICAgICAgICBmb250LXNpemU6IDMwcmVtO1xuICAgICAgICBjb2xvcjogIzgwODA4MDtcbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICAgICAgLnRleHQtY29udGFpbmVyIGgye1xuICAgICAgICAgICAgZm9udC1zaXplOiAzNnJlbTsgICBcbiAgICAgICAgfVxuICAgIH1cbiAgICAudGV4dC1jb250YWluZXIgaDI6OmFmdGVye1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGhlaWdodDogN3B4O1xuICAgICAgICBtYXJnaW46IDVyZW0gMHB4IDE4cmVtIDBweDtcbiAgICAgICAgYmFja2dyb3VuZDogbGlnaHRncmF5O1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICBoMjo6YWZ0ZXIge1xuICAgICAgICAgICAgd2lkdGg6IDI1MHB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHtcbiAgICAgICAgbWFyZ2luOiA2cmVtIDByZW0gMTByZW0gMHJlbTtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBzYW5zLXNlcmlmO1xuICAgICAgICBmb250LXdlaWdodDogMzAwO1xuICAgICAgICBmb250LXNpemU6IDEzcmVtO1xuICAgICAgICBjb2xvcjogIzU4NTk1YlxuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0ZW0pe1xuICAgICAgICBwIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTZyZW1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpdi5mb3JtLWNvbnRhaW5lcntcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgY29sb3I6IGdyYXk7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgIHBhZGRpbmc6IDE1cmVtIDIwcmVtIDQwcmVtIDIwcmVtO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xuICAgICAgICBib3gtc2hhZG93OiA1cHggNXB4IDVweCBsaWdodGdyYXk7XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgICAgIGRpdi5mb3JtLWNvbnRhaW5lciB7XG4gICAgICAgICAgICBwYWRkaW5nOiAzMHJlbSAyMHJlbSA0MHJlbSAyMHJlbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0ZW0pe1xuICAgICAgICBkaXYuZm9ybS1jb250YWluZXIge1xuICAgICAgICAgICAgcGFkZGluZzogNDByZW0gMzByZW0gNTByZW0gMzByZW07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXYuZmxleC1jb250YWluZXJ7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgfSBcblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICBkaXYuZmxleC1jb250YWluZXIge1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpdi50ZXh0LWNvbnRhaW5lciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgZGl2LnRleHQtY29udGFpbmVyIHtcbiAgICAgICAgICAgIHRvcDogLTIwcHg7XG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAzMHJlbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpdntcbiAgICAgICAgZmxleDogNTUlO1xuICAgIH1cblxuICAgIGZvcm17XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGZsZXg6IDUwJTtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiBhdXRvO1xuICAgIH1cbiAgICBsYWJlbHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgbWFyZ2luOiA0cmVtIDBweDtcbiAgICB9XG4gICAgc3BhbntcbiAgICAgICAgZm9udC1zaXplOiAxM3JlbTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICAgICAgc3BhbiB7XG4gICAgICAgICAgICBmb250LXNpemU6IDE0cmVtO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5wdXRbdHlwZT1cInN1Ym1pdFwiXXtcbiAgICAgICAgd2lkdGg6IDUwJTtcbiAgICAgICAgbWluLXdpZHRoOiA5NnB4O1xuICAgICAgICBtYXJnaW4tdG9wOiAxMnJlbTtcbiAgICAgICAgcGFkZGluZzogNnJlbTtcbiAgICAgICAgZm9udC1zaXplOiAxM3JlbTtcbiAgICAgICAgYm94LXNoYWRvdzogMXB4IDFweCAzcHggbGlnaHRncmV5O1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEoODgsIDg5LCA5MSwgMC4xKTtcbiAgICAgICAgY29sb3I6ICM1ODU5NUI7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAuM3MgZWFzZS1pbjtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIH1cblxuICAgIGlucHV0W3R5cGU9XCJzdWJtaXRcIl06aG92ZXIge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMXB4KTtcbiAgICAgICAgYm94LXNoYWRvdzogMnB4IDJweCAzcHggbGlnaHRncmV5O1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICBpbnB1dFt0eXBlPVwic3VibWl0XCJde1xuICAgICAgICAgICAgbWF4LXdpZHRoOiB1bnNldDtcbiAgICAgICAgICAgIHBhZGRpbmc6IDdyZW0gMTVyZW0gN3JlbSAxNXJlbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0ZW0pe1xuICAgICAgICBpbnB1dFt0eXBlPVwic3VibWl0XCJde1xuICAgICAgICAgICAgZm9udC1zaXplOiAxM3JlbTtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDE7XG4gICAgICAgICAgICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXYuY29udGFjdC1yb3d7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICB9XG4gICAgaW5wdXQsIHRleHRhcmVhe1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgZm9udC1zaXplOiAxNnJlbTtcbiAgICAgICAgcGFkZGluZzogM3JlbTtcbiAgICAgICAgYm94LXNoYWRvdzogLjNweCAuM3B4IC4zcHggZ3JheTtcbiAgICB9XG5cbiAgICAuc3VjY2Vzcy1tZXNzYWdlIHtcbiAgICAgICAgZm9udC1zaXplOiA1MHJlbTtcbiAgICAgICAgY29sb3I6ICM1ODU5NWI7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgfVxuXG4gICAgLmdmb3JtLCAudGV4dC1jb250YWluZXIsIC5zdWNjZXNzLW1lc3NhZ2Uge1xuICAgICAgICB0cmFuc2l0aW9uOiAuMzVzIG9wYWNpdHkgZWFzZTtcbiAgICB9XG4gICAgLmhpZGUtY29udGVudHtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG48L3N0eWxlPlxuXG57I2lmIHNob3dNb2RhbCAmJiBoaWRlTW9kYWwgPT09IGZhbHNlfVxuXHQ8TW9kYWxUZW1wbGF0ZSBzaG93TW9kYWw9e3Nob3dNb2RhbH0gb246Y2xpY2s+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNvbnRhaW5lciB7Zm9ybVN0YXRlLmhpZGVGaWVsZHMgPyAnaGlkZS1jb250ZW50JyA6ICcnfSB7Zm9ybVN0YXRlLmhpZGVGaWVsZHMgPyAnaGlkZS1jb250ZW50JyA6ICcnfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPkdldCBJbiBUb3VjaDwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIaSBUaGVyZSEgSeKAmW0gSm9zaCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSSBicmluZyBwcm9qZWN0cyB0byBsaWZlIGJ5IGlubm92YXRpbmcgYWNyb3NzIGV2ZXJ5IGFzcGVjdCBvZiB0aGUgY3VzdG9tZXIgam91cm5leS4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VuZCBtZSBhIG1lc3NhZ2UgaWYgeW91IGFyZSBsb29raW5nIHRvIGhpcmUgYSBkZXZlbG9wZXIsIGNvbGxhYm9yYXRlIG9uIGEgcHJvamVjdCwgb3IgaGF2ZSBhIHBvdGVudGlhbCBidXNpbmVzcyBvcHBvcnR1bml0eS5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJnZm9ybSB7Zm9ybVN0YXRlLmhpZGVGaWVsZHMgPyAnaGlkZS1jb250ZW50JyA6ICcnfVxuICAgICAgICAgICAgICAgICAgICAgICAge2Zvcm1TdGF0ZS5mb3JtU3VjY2VzcyA/ICdoaWRlLWNvbnRlbnQnIDogJyd9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOnN1Ym1pdHxwcmV2ZW50RGVmYXVsdD17aGFuZGxlU3VibWl0fSAgXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD4gPHNwYW4+TmFtZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgYmluZDp0aGlzPXtmaWVsZElucHV0c1swXX0gbmFtZT1cIm5hbWVcIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD4gPHNwYW4+RW1haWw8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGJpbmQ6dGhpcz17ZmllbGRJbnB1dHNbMV19IHJlcXVpcmVkIG5hbWU9XCJlbWFpbFwiIHR5cGU9XCJlbWFpbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD4gPHNwYW4+TWVzc2FnZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgYmluZDp0aGlzPXtmaWVsZElucHV0c1syXX0gbmFtZT1cIm1lc3NhZ2VcIiByb3dzPVwiNlwiIHR5cGU9XCJ0ZXh0YXJlYVwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlNlbmQgTWVzc2FnZVwiPlxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG5cbiAgICAgICAgICAgICAgICB7I2lmIGZvcm1TdGF0ZS5zdWJtaXR0aW5nRm9ybX1cbiAgICAgICAgICAgICAgICAgICAgPEJveExvYWRlciAvPlxuICAgICAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgICAgICAgICAgeyNpZiBmb3JtU3RhdGUuZm9ybVN1Y2Nlc3N9XG4gICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cInN1Y2Nlc3MtbWVzc2FnZVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgaW46Zmx5PVwie3sgeTogMjAsIGR1cmF0aW9uOiA1MDAsIGRlbGF5OiAyMDAsIH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dDpmbHk9XCJ7eyB5OiAtMjAsIGR1cmF0aW9uOiA1MDAsIGRlbGF5OiAwLCB9fVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNVQ0NFU1NcbiAgICAgICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICB7L2lmfVxuICAgICAgICAgICAgICAgIHsjaWYgZm9ybVN0YXRlLmZvcm1FcnJvcn1cbiAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwic3VjY2Vzcy1tZXNzYWdlXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICBpbjpmbHk9XCJ7eyB5OiAyMCwgZHVyYXRpb246IDUwMCwgZGVsYXk6IDIwMCwgfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0OmZseT1cInt7IHk6IC0yMCwgZHVyYXRpb246IDUwMCwgZGVsYXk6IDAsIH19XCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgRVJST1JcbiAgICAgICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICB7L2lmfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXHQ8L01vZGFsVGVtcGxhdGU+XG57L2lmfSIsIjxzY3JpcHQ+XG5pbXBvcnQgSGFtYnVyZ2VyIGZyb20gJy4vSGFtYnVyZ2VyLnN2ZWx0ZSc7XG5pbXBvcnQgQ29udGFjdE1vZGFsIGZyb20gJy4uL21vZGFscy9Db250YWN0TW9kYWwuc3ZlbHRlJztcblxuaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSc7XG5cbmxldCBzaG93TW9kYWw7XG5cbmxldCB3aW5kb3dZO1xubGV0IGhhbWJ1cmdlcjtcbmxldCB0b2dnbGUgPSBmYWxzZTtcblxubGV0IHJlZHVjZU5hdlNpemUgPSBmYWxzZTtcblxubGV0IGFjdGl2ZU5hdmlnYXRpb24gPSB7XG4gICAgaG9tZTogZmFsc2UsXG4gICAgYWJvdXQ6IGZhbHNlLFxuICAgIGV4cGVyaWVuY2U6IGZhbHNlXG59XG5cbiQ6IGhlYWRlckNsYXNzID0gbmF2U2l6ZSh3aW5kb3dZKTtcblxuZnVuY3Rpb24gbmF2U2l6ZSh5KXtcbiAgICBpZih5ID4gNzUpe1xuICAgICAgICByZWR1Y2VOYXZTaXplID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZWR1Y2VOYXZTaXplID0gZmFsc2U7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB0b2dnbGVyT2ZmKCl7XG4gICAgaWYod2luZG93LmlubmVyV2lkdGggPCAxMDIzKXtcbiAgICAgICAgaGFtYnVyZ2VyID8gaGFtYnVyZ2VyLiQkLmN0eC5oYW1idXJnZXIuY2xpY2soKSA6IG51bGw7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZXNldEFjdGl2ZU5hdigpIHtcbiAgICBsZXQgYWN0aXZlTmF2T2JqID0gT2JqZWN0LmVudHJpZXMoYWN0aXZlTmF2aWdhdGlvbik7XG4gICAgXG4gICAgZm9yKGxldCBba2V5LCB2YWx1ZV0gb2YgYWN0aXZlTmF2T2JqKXtcbiAgICAgICAgYWN0aXZlTmF2aWdhdGlvbltrZXldID0gZmFsc2U7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRBY3RpdmVOYXZPbkNsaWNrKCkge1xuICAgIFxuICAgIGxldCBhY3RpdmVOYXZPYmogPSBPYmplY3QuZW50cmllcyhhY3RpdmVOYXZpZ2F0aW9uKTtcbiAgICBsZXQgZWxUZXh0ID0gYCR7dGhpcy5pbm5lckhUTUwudG9Mb3dlckNhc2UoKX1gO1xuICAgIFxuICAgIGZvcihsZXQgW2tleSwgdmFsdWVdIG9mIGFjdGl2ZU5hdk9iail7XG4gICAgICAgIGlmKGtleSA9PT0gZWxUZXh0KXtcbiAgICAgICAgICAgIGFjdGl2ZU5hdmlnYXRpb25ba2V5XSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY3RpdmVOYXZpZ2F0aW9uW2tleV0gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b2dnbGVyT2ZmKCk7XG59XG5cbmZ1bmN0aW9uIHNldEFjdGl2ZU5hdigpIHtcbiAgICBsZXQgcGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblxuICAgIGlmKHBhdGggPT09ICcvJykgYWN0aXZlTmF2aWdhdGlvbi5ob21lID0gdHJ1ZTtcbiAgICBlbHNlIGlmIChwYXRoID09PSAnL2Fib3V0JykgYWN0aXZlTmF2aWdhdGlvbi5hYm91dCA9IHRydWU7XG4gICAgZWxzZSBpZiAocGF0aCA9PT0gJy9leHBlcmllbmNlJykgYWN0aXZlTmF2aWdhdGlvbi5leHBlcmllbmNlID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gb3Blbk1vZGFsKCl7XG4gICAgc2hvd01vZGFsID0gdHJ1ZTtcbn1cblxub25Nb3VudCgoKSA9PiB7XG4gICAgc2V0QWN0aXZlTmF2KCk7XG59KVxuXG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG5oZWFkZXIge1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZDZkNmQ2O1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0b3A6IDA7XG4gICAgei1pbmRleDogNTA7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG59XG5cbm5hdiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAzMHJlbSAyMHJlbTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgLjQ1cyBjdWJpYy1iZXppZXIoMC44NSwgMC4wOCwgMC4wOCwgMC45OSk7XG59XG5cbm5hdi5zY3JvbGxlZCB7XG4gICAgcGFkZGluZzogMjByZW0gMjByZW07XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pIHtcbiAgICBuYXYge1xuICAgICAgICBwYWRkaW5nOiAzNXJlbSA0MHJlbTtcbiAgICB9XG4gICAgbmF2LnNjcm9sbGVkIHtcbiAgICAgICAgcGFkZGluZzogMjByZW0gNDByZW07XG4gICAgfVxufVxuXG51bC5uYXZpZ2F0aW9uIHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHotaW5kZXg6IDI7XG4gICAgd2lkdGg6IDI1MHB4O1xuICAgIHJpZ2h0OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgICBib3R0b206IDA7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHBhZGRpbmc6IDByZW0gMjByZW07XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzIGN1YmljLWJlemllcigwLjg1LCAwLjA4LCAwLjA4LCAwLjk5KTtcbn1cblxuI3RvZ2dsZTpjaGVja2VkIH4gdWwubmF2aWdhdGlvbntcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSkge1xuICAgIHVsLm5hdmlnYXRpb24ge1xuICAgICAgICBwYWRkaW5nOiAwcmVtIDQwcmVtO1xuICAgIH1cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSkge1xuICAgIHVsLm5hdmlnYXRpb257XG4gICAgICAgIHRyYW5zZm9ybTogdW5zZXQ7ICAgXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgd2lkdGg6IHVuc2V0O1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgIH1cbn1cblxubGkge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICBtYXJnaW46IDVyZW0gMHJlbTtcbiAgICB3aWR0aDogYXV0bztcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XG4gICAgZm9udC1zaXplOiAxNHJlbTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSl7XG4gICAgbGkge1xuICAgICAgICBmb250LXNpemU6IDE2cmVtO1xuICAgICAgICBtYXJnaW46IDByZW0gMjByZW07XG4gICAgICAgIHBhZGRpbmc6IDIuNXJlbSAwO1xuICAgIH1cbiAgICBwe1xuICAgICAgICBmb250LXNpemU6IDE4cmVtO1xuICAgIH1cbn1cblxubGk6bm90KC5jbG9zZS1jb250YWluZXIpOjphZnRlciwgLmFjdGl2ZTo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgICBib3R0b206IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgb3BhY2l0eTogMTtcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzNCM0IzQjtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjQ1cyBjdWJpYy1iZXppZXIoMC44NSwgMC4wOCwgMC4wOCwgMC45OSk7XG59XG5cbmxpOm5vdCguY2xvc2UtY29udGFpbmVyKTpob3Zlcjo6YWZ0ZXIsIC5hY3RpdmU6OmFmdGVyIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG59XG5cbi5zZWxlY3RlZDo6YWZ0ZXIge1xuICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApICFpbXBvcnRhbnQ7XG59XG5cbi5tb2RhbC1hY3RpdmUgLnNlbGVjdGVkOm5vdCgub3Blbi1tb2RhbCk6OmFmdGVyIHtcbiAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKSAhaW1wb3J0YW50OyBcbn1cblxuLmNsb3NlLWNvbnRhaW5lciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNTByZW07XG4gICAgcmlnaHQ6IDUwcmVtO1xuICAgIG92ZXJmbG93OiB1bnNldDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgIC5jbG9zZS1jb250YWluZXIge1xuICAgICAgICByaWdodDogNzByZW07XG4gICAgfVxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICAuY2xvc2UtY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG59XG5cbi5jbG9zZSB7XG4gICAgd2lkdGg6MzJweDtcbiAgICBoZWlnaHQ6MzJweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLmNsb3NlOjpiZWZvcmUge1xuICBjb250ZW50OiAnJztcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIGJsYWNrO1xuICB3aWR0aDogMzJweDtcbiAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xufVxuXG4uY2xvc2U6OmFmdGVyIHtcbiAgY29udGVudDogJyc7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCBibGFjaztcbiAgd2lkdGg6IDMycHg7XG4gIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG59XG5cbmE6bm90KC5sb2dvKSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcGFkZGluZzogNXJlbSAwcmVtO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbnB7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG4uY29kZSB7XG4gICAgZm9udC13ZWlnaHQ6IDEwMDtcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgb3BhY2l0eTogLjM7XG59XG5cbi5sb2dvLWhvdmVyIHtcbiAgICB0cmFuc2l0aW9uOiBhbGwgLjNzIGVhc2UtaW47XG59XG5cbi5sb2dvOmhvdmVyIC5sb2dvLWhvdmVyIHtcbiAgICBjb2xvcjogYmxhY2s7XG59XG5cbjwvc3R5bGU+XG5cbjxzdmVsdGU6d2luZG93IGJpbmQ6c2Nyb2xsWT17d2luZG93WX0vPlxuXG48aGVhZGVyPlxuICAgIDxuYXYgY2xhc3M9e3JlZHVjZU5hdlNpemUgPyAnc2Nyb2xsZWQgY29udGFpbmVyJyA6ICdjb250YWluZXInfT5cbiAgICAgICAgPGEgaHJlZj0nLycgb246Y2xpY2s9eygpID0+IHtyZXNldEFjdGl2ZU5hdigpOyBhY3RpdmVOYXZpZ2F0aW9uLmhvbWUgPSB0cnVlO319IGNsYXNzPVwibG9nb1wiPlxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb2RlXCI+Jmx0O2gxJmd0Ozwvc3Bhbj5IaSBUaGVyZTxzcGFuIGNsYXNzPVwibG9nby1ob3ZlclwiPiE8L3NwYW4+PHNwYW4gY2xhc3M9XCJjb2RlXCI+Jmx0Oy9oMSZndDs8L3NwYW4+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgIDwvYT5cbiAgICAgICAgPEhhbWJ1cmdlciBvbjpjbGljaz17dG9nZ2xlck9mZn0gdG9nZ2xlPXt0b2dnbGV9IGJpbmQ6dGhpcz17aGFtYnVyZ2VyfSAvPlxuICAgICAgICA8dWwgY2xhc3M9XCJuYXZpZ2F0aW9uIHtzaG93TW9kYWwgPyAnbW9kYWwtYWN0aXZlJyA6ICcnfVwiPlxuICAgICAgICAgICAgPGxpIGNsYXNzPVwiY2xvc2UtY29udGFpbmVyXCIgb246Y2xpY2s9e3RvZ2dsZXJPZmZ9ID48c3BhbiBjbGFzcz1cImNsb3NlXCI+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJ7YWN0aXZlTmF2aWdhdGlvbi5ob21lID8gJ3NlbGVjdGVkJyA6ICcnfVwiPjxhIG9uOmNsaWNrPXtzZXRBY3RpdmVOYXZPbkNsaWNrfSByZWw9cHJlZmV0Y2ggaHJlZj1cIi9cIj5Ib21lPC9hPjwvbGk+XG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJ7YWN0aXZlTmF2aWdhdGlvbi5hYm91dCA/ICdzZWxlY3RlZCcgOiAnJ31cIj48YSBvbjpjbGljaz17c2V0QWN0aXZlTmF2T25DbGlja30gcmVsPXByZWZldGNoIGhyZWY9XCIvYWJvdXRcIj5BYm91dDwvYT48L2xpPlxuICAgICAgICAgICAgPGxpIGNsYXNzPVwie2FjdGl2ZU5hdmlnYXRpb24uZXhwZXJpZW5jZSA/ICdzZWxlY3RlZCcgOiAnJ31cIj48YSBvbjpjbGljaz17c2V0QWN0aXZlTmF2T25DbGlja30gaHJlZj1cIi9leHBlcmllbmNlXCI+RXhwZXJpZW5jZTwvYT48L2xpPlxuICAgICAgICAgICAgPGxpIGNsYXNzPVwie3Nob3dNb2RhbCA/ICdzZWxlY3RlZCcgOiAnJ30gb3Blbi1tb2RhbFwiPjxhIG9uOmNsaWNrPXtvcGVuTW9kYWx9IGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj5Db250YWN0PC9hPjwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgPC9uYXY+XG48L2hlYWRlcj5cblxuPENvbnRhY3RNb2RhbCBvbjpjbGljaz17KCkgPT4gc2hvd01vZGFsID0gZmFsc2V9IHNob3dNb2RhbD17c2hvd01vZGFsfS8+IiwiPHNjcmlwdD5cbmltcG9ydCBUZXh0QW5pbWF0aW9uIGZyb20gJy4uL2hlbHBlci1jb21wb25lbnRzL1RleHRBbmltYXRpb24uc3ZlbHRlJztcblxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbmZvb3RlciB7XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkNmQ2ZDY7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgY29sb3I6ICMzQjNCM0I7XG59XG5cbi5mb290ZXItY29udGFpbmVyIHtcbiAgICBtYXJnaW4tdG9wOiA0MHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBwYWRkaW5nLWJvdHRvbTogMDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgLmZvb3Rlci1jb250YWluZXIge1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIH1cbn1cblxuLmxlZnQsIC5yaWdodCB7XG4gICAgbWFyZ2luLWJvdHRvbTogNTVyZW07XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgIC5sZWZ0LCAucmlnaHQge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiA2MHJlbTtcbiAgICB9XG4gICAgLmJvdHRvbS1yb3cge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgIH1cbiAgICAubGVmdCwgLmNvcHlyaWdodHtcbiAgICAgICAgcGFkZGluZy1yaWdodDogODByZW07XG4gICAgICAgIHdpZHRoOiA2MCU7XG4gICAgfVxuICAgIC5yaWdodCB7XG4gICAgICAgIHBhZGRpbmctdG9wOiAyMHJlbTtcbiAgICB9XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0ZW0pe1xuICAgIC5sZWZ0LCAuY29weXJpZ2h0IHtcbiAgICAgICAgd2lkdGg6IDUwJTtcbiAgICB9XG4gICAgLmxlZnQsIC5yaWdodCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDcwcmVtO1xuICAgIH1cbn1cblxuLnRleHQtY3RhOmZpcnN0LW9mLXR5cGUge1xuICAgIG1hcmdpbi1ib3R0b206IDIwcmVtO1xufVxuXG4uaGVhZGxpbmUge1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCAnUm9ib3RvJywgJ094eWdlbicsICdVYnVudHUnLCAnRmlyYSBTYW5zJywgJ0Ryb2lkIFNhbnMnLCAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmO1xuICAgIGxpbmUtaGVpZ2h0OiA0NXB4O1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgbWF4LXdpZHRoOiA0MjBweDtcbn1cblxuLmhlYWRsaW5lIGEge1xuICAgIGNvbG9yOiAjNTg1OTViO1xuICAgIHRyYW5zaXRpb246IGFsbCAuNDVzIGVhc2UtaW4tb3V0O1xuICAgIG9wYWNpdHk6IC43NTtcbn1cblxuLmhlYWRsaW5lIGE6aG92ZXIge1xuICAgIGNvbG9yOiBibGFjaztcbn1cblxuLnRpdGxlIHtcbiAgICBmb250LXdlaWdodDogMTAwO1xuICAgIGZvbnQtc2l6ZTogMTJyZW07XG59XG5cbi50ZXh0LWN0YSBhIHtcbiAgICBmb250LXNpemU6IDE0cmVtO1xufVxuXG4uYm90dG9tLXJvdyB7XG4gICAgcGFkZGluZy10b3A6IDA7XG59XG5cbi5jb3B5cmlnaHQge1xuICAgIGZvbnQtc2l6ZTogMTJyZW07XG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG59XG5cbi5sZWZ0IHA6bGFzdC1jaGlsZCB7XG4gICAgY29sb3I6ICM1ODU5NWI7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA5MDA7XG4gICAgbWFyZ2luLXRvcDogMjVyZW07XG59XG5cbmRpdi5zb2NpYWwtaWNvbnMge1xuICAgIG1hcmdpbi10b3A6IDhweDtcbiAgICBtaW4td2lkdGg6IDIwNnB4O1xufVxuXG5pIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gICAgY29sb3I6ICM4MDgwODA7XG4gICAgdHJhbnNpdGlvbjogYWxsIC4zcyBlYXNlO1xufVxuXG5hOmhvdmVyID4gaSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xuICAgIGNvbG9yOiAjNTg1OTViO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKSB7XG4gICAgZGl2LnNvY2lhbC1pY29ucyB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICB9XG4gICAgaXtcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gICAgfVxuICAgIC5sZWZ0IHA6bGFzdC1jaGlsZCB7XG4gICAgICAgIG1hcmdpbi10b3A6IDYwcmVtO1xuICAgIH1cblxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICAudGl0bGV7XG4gICAgICAgIGZvbnQtc2l6ZTogMTZyZW1cbiAgICB9XG4gICAgLnRleHQtY3RhIGEge1xuICAgICAgICBmb250LXNpemU6IDE4cmVtO1xuICAgIH1cbiAgICAuY29weXJpZ2h0IHtcbiAgICAgICAgZm9udC1zaXplOiAxNHJlbTtcbiAgICB9XG4gICAgLmhlYWRsaW5lIHtcbiAgICAgICAgZm9udC1zaXplOiA0NXB4O1xuICAgICAgICBtYXgtd2lkdGg6IDQ0MHB4O1xuICAgIH1cbiAgICAubGVmdCBwOmxhc3QtY2hpbGQge1xuICAgICAgICBmb250LXNpemU6IDIycHg7XG4gICAgICAgIG1hcmdpbi10b3A6IDcwcmVtO1xuICAgIH1cbiAgICBpIHtcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgIH1cbn1cblxuPC9zdHlsZT5cblxuPHN2ZWx0ZTpoZWFkPlxuICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9raXQuZm9udGF3ZXNvbWUuY29tLzEzMDk5OTBjMjkuanNcIj48L3NjcmlwdD5cbjwvc3ZlbHRlOmhlYWQ+XG5cbjxmb290ZXI+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBmb290ZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0XCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImhlYWRsaW5lXCI+XG4gICAgICAgICAgICAgICAgRmVlbCBmcmVlIHRvIHNob290IG1lIGFuIDxhIGhyZWY9XCJtYWlsdG86am9zaHVhLm1pY2FoLnJvcGVyQGdtYWlsLmNvbVwiPmVtYWlsPC9hPiAmIGNvbm5lY3QgdGhyb3VnaCA8YSBocmVmPVwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2pyLWRldlwiIHRhcmdldD1cImJsYW5rXCI+c29jaWFsLjwvYT5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxwPlJlYWNoIG91dCE8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmlnaHRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWN0YVwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgR2V0IEluIFRvdWNoIVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwibWFpbHRvOmpvc2h1YS5taWNhaC5yb3BlckBnbWFpbC5jb21cIj5cbiAgICAgICAgICAgICAgICAgICAgPFRleHRBbmltYXRpb24gdGV4dD17YEpvc2h1YS5taWNhaC5yb3BlckBnbWFpbC5jb21gfSAvPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY3RhXCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICBWaWV3IFJlc3VtZVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiLi9pbWFnZXMvcmVzdW1lLWpvc2h1YS1yb3Blci5wZGZcIiBkb3dubG9hZD5cbiAgICAgICAgICAgICAgICAgICAgPFRleHRBbmltYXRpb24gdGV4dD17YERvd25sb2FkIFBERmB9IC8+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJib3R0b20tcm93IGNvbnRhaW5lclwiPlxuICAgICAgICBcbiAgICAgICAgPHAgY2xhc3M9XCJjb3B5cmlnaHRcIj5AIDIwMTkgSm9zaHVhIFJvcGVyIERldmVsb3BtZW50PC9wPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic29jaWFsLWljb25zXCI+XG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly93d3cuZ2l0aHViLmNvbS9Kcm9wZTIxXCIgYXJpYS1sYWJlbD1cImxpbmsgdG8gSm9zaHVhIFJvcGVyJ3MgR2l0SHViIGFjY291bnRcIiB0YXJnZXQ9XCJibGFua1wiID5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhYiBmYS1naXRodWJcIj48L2k+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL0pSLWRldlwiIGFyaWEtbGFiZWw9XCJsaW5rIHRvIEpvc2h1YSBSb3BlcidzIExpbmtlZEluIGFjY291bnRcIiB0YXJnZXQ9XCJibGFua1wiID5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhYiBmYS1saW5rZWRpblwiPjwvaT5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxhIGhyZWY9XCJtYWlsdG86am9zaHVhLm1pY2FoLnJvcGVyQGdtYWlsLmNvbVwiIGFyaWEtbGFiZWw9XCJsaW5rIHRvIHNlbmQgSm9zaHVhIFJvcGVyIGFuIGVtYWlsXCIgdGFyZ2V0PVwiYmxhbmtcIiA+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZW52ZWxvcGVcIj48L2k+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9mb290ZXI+XG5cblxuIiwiPHNjcmlwdD5cblx0ZXhwb3J0IGxldCBzdGF0dXM7XG5cdGV4cG9ydCBsZXQgZXJyb3I7XG5cblx0Y29uc3QgZGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCc7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXHRoMSwgcCB7XG5cdFx0bWFyZ2luOiAwIGF1dG87XG5cdH1cblxuXHRoMSB7XG5cdFx0Zm9udC1zaXplOiAyLjhlbTtcblx0XHRmb250LXdlaWdodDogNzAwO1xuXHRcdG1hcmdpbjogMCAwIDAuNWVtIDA7XG5cdH1cblxuXHRwIHtcblx0XHRtYXJnaW46IDFlbSBhdXRvO1xuXHR9XG5cblx0QG1lZGlhIChtaW4td2lkdGg6IDQ4MHB4KSB7XG5cdFx0aDEge1xuXHRcdFx0Zm9udC1zaXplOiA0ZW07XG5cdFx0fVxuXHR9XG48L3N0eWxlPlxuXG48c3ZlbHRlOmhlYWQ+XG5cdDx0aXRsZT57c3RhdHVzfTwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG48aDE+e3N0YXR1c308L2gxPlxuXG48cD57ZXJyb3IubWVzc2FnZX08L3A+XG5cbnsjaWYgZGV2ICYmIGVycm9yLnN0YWNrfVxuXHQ8cHJlPntlcnJvci5zdGFja308L3ByZT5cbnsvaWZ9XG4iLCIvLyBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IFNhcHBlciDigJQgZG8gbm90IGVkaXQgaXQhXG5pbXBvcnQgKiBhcyByb3V0ZV8wIGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvYmxvZy9pbmRleC5qc29uLmpzXCI7XG5pbXBvcnQgKiBhcyByb3V0ZV8xIGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvYmxvZy9bc2x1Z10uanNvbi5qc1wiO1xuaW1wb3J0IGNvbXBvbmVudF8wIGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvaW5kZXguc3ZlbHRlXCI7XG5pbXBvcnQgY29tcG9uZW50XzEgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9leHBlcmllbmNlLnN2ZWx0ZVwiO1xuaW1wb3J0IGNvbXBvbmVudF8yIGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvcHJvamVjdHMvY3JlYXRpdmUtcmV2b2x0LnN2ZWx0ZVwiO1xuaW1wb3J0IGNvbXBvbmVudF8zIGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvcHJvamVjdHMvdW5pdmVyc2l0eS1wYXJrLnN2ZWx0ZVwiO1xuaW1wb3J0IGNvbXBvbmVudF80IGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvcHJvamVjdHMvaGFsY3lvbi5zdmVsdGVcIjtcbmltcG9ydCBjb21wb25lbnRfNSBmcm9tIFwiLi4vLi4vLi4vcm91dGVzL2Fib3V0LnN2ZWx0ZVwiO1xuaW1wb3J0IGNvbXBvbmVudF82LCB7IHByZWxvYWQgYXMgcHJlbG9hZF82IH0gZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9ibG9nL2luZGV4LnN2ZWx0ZVwiO1xuaW1wb3J0IGNvbXBvbmVudF83LCB7IHByZWxvYWQgYXMgcHJlbG9hZF83IH0gZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9ibG9nL1tzbHVnXS5zdmVsdGVcIjtcbmltcG9ydCByb290IGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvX2xheW91dC5zdmVsdGVcIjtcbmltcG9ydCBlcnJvciBmcm9tIFwiLi4vLi4vLi4vcm91dGVzL19lcnJvci5zdmVsdGVcIjtcblxuY29uc3QgZCA9IGRlY29kZVVSSUNvbXBvbmVudDtcblxuZXhwb3J0IGNvbnN0IG1hbmlmZXN0ID0ge1xuXHRzZXJ2ZXJfcm91dGVzOiBbXG5cdFx0e1xuXHRcdFx0Ly8gYmxvZy9pbmRleC5qc29uLmpzXG5cdFx0XHRwYXR0ZXJuOiAvXlxcL2Jsb2cuanNvbiQvLFxuXHRcdFx0aGFuZGxlcnM6IHJvdXRlXzAsXG5cdFx0XHRwYXJhbXM6ICgpID0+ICh7fSlcblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0Ly8gYmxvZy9bc2x1Z10uanNvbi5qc1xuXHRcdFx0cGF0dGVybjogL15cXC9ibG9nXFwvKFteXFwvXSs/KS5qc29uJC8sXG5cdFx0XHRoYW5kbGVyczogcm91dGVfMSxcblx0XHRcdHBhcmFtczogbWF0Y2ggPT4gKHsgc2x1ZzogZChtYXRjaFsxXSkgfSlcblx0XHR9XG5cdF0sXG5cblx0cGFnZXM6IFtcblx0XHR7XG5cdFx0XHQvLyBpbmRleC5zdmVsdGVcblx0XHRcdHBhdHRlcm46IC9eXFwvJC8sXG5cdFx0XHRwYXJ0czogW1xuXHRcdFx0XHR7IG5hbWU6IFwiaW5kZXhcIiwgZmlsZTogXCJpbmRleC5zdmVsdGVcIiwgY29tcG9uZW50OiBjb21wb25lbnRfMCB9XG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdC8vIGV4cGVyaWVuY2Uuc3ZlbHRlXG5cdFx0XHRwYXR0ZXJuOiAvXlxcL2V4cGVyaWVuY2VcXC8/JC8sXG5cdFx0XHRwYXJ0czogW1xuXHRcdFx0XHR7IG5hbWU6IFwiZXhwZXJpZW5jZVwiLCBmaWxlOiBcImV4cGVyaWVuY2Uuc3ZlbHRlXCIsIGNvbXBvbmVudDogY29tcG9uZW50XzEgfVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHQvLyBwcm9qZWN0cy9jcmVhdGl2ZS1yZXZvbHQuc3ZlbHRlXG5cdFx0XHRwYXR0ZXJuOiAvXlxcL3Byb2plY3RzXFwvY3JlYXRpdmUtcmV2b2x0XFwvPyQvLFxuXHRcdFx0cGFydHM6IFtcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0eyBuYW1lOiBcInByb2plY3RzX2NyZWF0aXZlJDQ1cmV2b2x0XCIsIGZpbGU6IFwicHJvamVjdHMvY3JlYXRpdmUtcmV2b2x0LnN2ZWx0ZVwiLCBjb21wb25lbnQ6IGNvbXBvbmVudF8yIH1cblx0XHRcdF1cblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0Ly8gcHJvamVjdHMvdW5pdmVyc2l0eS1wYXJrLnN2ZWx0ZVxuXHRcdFx0cGF0dGVybjogL15cXC9wcm9qZWN0c1xcL3VuaXZlcnNpdHktcGFya1xcLz8kLyxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdG51bGwsXG5cdFx0XHRcdHsgbmFtZTogXCJwcm9qZWN0c191bml2ZXJzaXR5JDQ1cGFya1wiLCBmaWxlOiBcInByb2plY3RzL3VuaXZlcnNpdHktcGFyay5zdmVsdGVcIiwgY29tcG9uZW50OiBjb21wb25lbnRfMyB9XG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdC8vIHByb2plY3RzL2hhbGN5b24uc3ZlbHRlXG5cdFx0XHRwYXR0ZXJuOiAvXlxcL3Byb2plY3RzXFwvaGFsY3lvblxcLz8kLyxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdG51bGwsXG5cdFx0XHRcdHsgbmFtZTogXCJwcm9qZWN0c19oYWxjeW9uXCIsIGZpbGU6IFwicHJvamVjdHMvaGFsY3lvbi5zdmVsdGVcIiwgY29tcG9uZW50OiBjb21wb25lbnRfNCB9XG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdC8vIGFib3V0LnN2ZWx0ZVxuXHRcdFx0cGF0dGVybjogL15cXC9hYm91dFxcLz8kLyxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdHsgbmFtZTogXCJhYm91dFwiLCBmaWxlOiBcImFib3V0LnN2ZWx0ZVwiLCBjb21wb25lbnQ6IGNvbXBvbmVudF81IH1cblx0XHRcdF1cblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0Ly8gYmxvZy9pbmRleC5zdmVsdGVcblx0XHRcdHBhdHRlcm46IC9eXFwvYmxvZ1xcLz8kLyxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdHsgbmFtZTogXCJibG9nXCIsIGZpbGU6IFwiYmxvZy9pbmRleC5zdmVsdGVcIiwgY29tcG9uZW50OiBjb21wb25lbnRfNiwgcHJlbG9hZDogcHJlbG9hZF82IH1cblx0XHRcdF1cblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0Ly8gYmxvZy9bc2x1Z10uc3ZlbHRlXG5cdFx0XHRwYXR0ZXJuOiAvXlxcL2Jsb2dcXC8oW15cXC9dKz8pXFwvPyQvLFxuXHRcdFx0cGFydHM6IFtcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0eyBuYW1lOiBcImJsb2dfJHNsdWdcIiwgZmlsZTogXCJibG9nL1tzbHVnXS5zdmVsdGVcIiwgY29tcG9uZW50OiBjb21wb25lbnRfNywgcHJlbG9hZDogcHJlbG9hZF83LCBwYXJhbXM6IG1hdGNoID0+ICh7IHNsdWc6IGQobWF0Y2hbMV0pIH0pIH1cblx0XHRcdF1cblx0XHR9XG5cdF0sXG5cblx0cm9vdCxcblx0cm9vdF9wcmVsb2FkOiAoKSA9PiB7fSxcblx0ZXJyb3Jcbn07XG5cbmV4cG9ydCBjb25zdCBidWlsZF9kaXIgPSBcIl9fc2FwcGVyX18vZGV2XCI7XG5cbmV4cG9ydCBjb25zdCBzcmNfZGlyID0gXCJzcmNcIjtcblxuZXhwb3J0IGNvbnN0IGRldiA9IHRydWU7IiwiaW1wb3J0IHsgc2FmZV9ub3RfZXF1YWwsIG5vb3AsIHJ1bl9hbGwsIGlzX2Z1bmN0aW9uIH0gZnJvbSAnLi4vaW50ZXJuYWwnO1xuZXhwb3J0IHsgZ2V0X3N0b3JlX3ZhbHVlIGFzIGdldCB9IGZyb20gJy4uL2ludGVybmFsJztcblxuY29uc3Qgc3Vic2NyaWJlcl9xdWV1ZSA9IFtdO1xuLyoqXG4gKiBDcmVhdGVzIGEgYFJlYWRhYmxlYCBzdG9yZSB0aGF0IGFsbG93cyByZWFkaW5nIGJ5IHN1YnNjcmlwdGlvbi5cbiAqIEBwYXJhbSB2YWx1ZSBpbml0aWFsIHZhbHVlXG4gKiBAcGFyYW0ge1N0YXJ0U3RvcE5vdGlmaWVyfXN0YXJ0IHN0YXJ0IGFuZCBzdG9wIG5vdGlmaWNhdGlvbnMgZm9yIHN1YnNjcmlwdGlvbnNcbiAqL1xuZnVuY3Rpb24gcmVhZGFibGUodmFsdWUsIHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3Vic2NyaWJlOiB3cml0YWJsZSh2YWx1ZSwgc3RhcnQpLnN1YnNjcmliZSxcbiAgICB9O1xufVxuLyoqXG4gKiBDcmVhdGUgYSBgV3JpdGFibGVgIHN0b3JlIHRoYXQgYWxsb3dzIGJvdGggdXBkYXRpbmcgYW5kIHJlYWRpbmcgYnkgc3Vic2NyaXB0aW9uLlxuICogQHBhcmFtIHsqPX12YWx1ZSBpbml0aWFsIHZhbHVlXG4gKiBAcGFyYW0ge1N0YXJ0U3RvcE5vdGlmaWVyPX1zdGFydCBzdGFydCBhbmQgc3RvcCBub3RpZmljYXRpb25zIGZvciBzdWJzY3JpcHRpb25zXG4gKi9cbmZ1bmN0aW9uIHdyaXRhYmxlKHZhbHVlLCBzdGFydCA9IG5vb3ApIHtcbiAgICBsZXQgc3RvcDtcbiAgICBjb25zdCBzdWJzY3JpYmVycyA9IFtdO1xuICAgIGZ1bmN0aW9uIHNldChuZXdfdmFsdWUpIHtcbiAgICAgICAgaWYgKHNhZmVfbm90X2VxdWFsKHZhbHVlLCBuZXdfdmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG5ld192YWx1ZTtcbiAgICAgICAgICAgIGlmIChzdG9wKSB7IC8vIHN0b3JlIGlzIHJlYWR5XG4gICAgICAgICAgICAgICAgY29uc3QgcnVuX3F1ZXVlID0gIXN1YnNjcmliZXJfcXVldWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcyA9IHN1YnNjcmliZXJzW2ldO1xuICAgICAgICAgICAgICAgICAgICBzWzFdKCk7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJfcXVldWUucHVzaChzLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChydW5fcXVldWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzY3JpYmVyX3F1ZXVlLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyX3F1ZXVlW2ldWzBdKHN1YnNjcmliZXJfcXVldWVbaSArIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyX3F1ZXVlLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZShmbikge1xuICAgICAgICBzZXQoZm4odmFsdWUpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3Vic2NyaWJlKHJ1biwgaW52YWxpZGF0ZSA9IG5vb3ApIHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaWJlciA9IFtydW4sIGludmFsaWRhdGVdO1xuICAgICAgICBzdWJzY3JpYmVycy5wdXNoKHN1YnNjcmliZXIpO1xuICAgICAgICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBzdG9wID0gc3RhcnQoc2V0KSB8fCBub29wO1xuICAgICAgICB9XG4gICAgICAgIHJ1bih2YWx1ZSk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHN1YnNjcmliZXJzLmluZGV4T2Yoc3Vic2NyaWJlcik7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgICAgICAgICAgc3RvcCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7IHNldCwgdXBkYXRlLCBzdWJzY3JpYmUgfTtcbn1cbi8qKlxuICogRGVyaXZlZCB2YWx1ZSBzdG9yZSBieSBzeW5jaHJvbml6aW5nIG9uZSBvciBtb3JlIHJlYWRhYmxlIHN0b3JlcyBhbmRcbiAqIGFwcGx5aW5nIGFuIGFnZ3JlZ2F0aW9uIGZ1bmN0aW9uIG92ZXIgaXRzIGlucHV0IHZhbHVlcy5cbiAqIEBwYXJhbSB7U3RvcmVzfSBzdG9yZXMgaW5wdXQgc3RvcmVzXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKFN0b3Jlcz0sIGZ1bmN0aW9uKCopPSk6Kn1mbiBmdW5jdGlvbiBjYWxsYmFjayB0aGF0IGFnZ3JlZ2F0ZXMgdGhlIHZhbHVlc1xuICogQHBhcmFtIHsqPX1pbml0aWFsX3ZhbHVlIHdoZW4gdXNlZCBhc3luY2hyb25vdXNseVxuICovXG5mdW5jdGlvbiBkZXJpdmVkKHN0b3JlcywgZm4sIGluaXRpYWxfdmFsdWUpIHtcbiAgICBjb25zdCBzaW5nbGUgPSAhQXJyYXkuaXNBcnJheShzdG9yZXMpO1xuICAgIGNvbnN0IHN0b3Jlc19hcnJheSA9IHNpbmdsZVxuICAgICAgICA/IFtzdG9yZXNdXG4gICAgICAgIDogc3RvcmVzO1xuICAgIGNvbnN0IGF1dG8gPSBmbi5sZW5ndGggPCAyO1xuICAgIHJldHVybiByZWFkYWJsZShpbml0aWFsX3ZhbHVlLCAoc2V0KSA9PiB7XG4gICAgICAgIGxldCBpbml0ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgICAgIGxldCBwZW5kaW5nID0gMDtcbiAgICAgICAgbGV0IGNsZWFudXAgPSBub29wO1xuICAgICAgICBjb25zdCBzeW5jID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmbihzaW5nbGUgPyB2YWx1ZXNbMF0gOiB2YWx1ZXMsIHNldCk7XG4gICAgICAgICAgICBpZiAoYXV0bykge1xuICAgICAgICAgICAgICAgIHNldChyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xlYW51cCA9IGlzX2Z1bmN0aW9uKHJlc3VsdCkgPyByZXN1bHQgOiBub29wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB1bnN1YnNjcmliZXJzID0gc3RvcmVzX2FycmF5Lm1hcCgoc3RvcmUsIGkpID0+IHN0b3JlLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZhbHVlc1tpXSA9IHZhbHVlO1xuICAgICAgICAgICAgcGVuZGluZyAmPSB+KDEgPDwgaSk7XG4gICAgICAgICAgICBpZiAoaW5pdGVkKSB7XG4gICAgICAgICAgICAgICAgc3luYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBwZW5kaW5nIHw9ICgxIDw8IGkpO1xuICAgICAgICB9KSk7XG4gICAgICAgIGluaXRlZCA9IHRydWU7XG4gICAgICAgIHN5bmMoKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgICAgICBydW5fYWxsKHVuc3Vic2NyaWJlcnMpO1xuICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICB9O1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBkZXJpdmVkLCByZWFkYWJsZSwgd3JpdGFibGUgfTtcbiIsImltcG9ydCB7IHdyaXRhYmxlIH0gZnJvbSAnc3ZlbHRlL3N0b3JlJztcblxuZXhwb3J0IGNvbnN0IENPTlRFWFRfS0VZID0ge307XG5cbmV4cG9ydCBjb25zdCBwcmVsb2FkID0gKCkgPT4gKHt9KTsiLCI8IS0tIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgU2FwcGVyIOKAlCBkbyBub3QgZWRpdCBpdCEgLS0+XG48c2NyaXB0PlxuXHRpbXBvcnQgeyBzZXRDb250ZXh0IH0gZnJvbSAnc3ZlbHRlJztcblx0aW1wb3J0IHsgQ09OVEVYVF9LRVkgfSBmcm9tICcuL3NoYXJlZCc7XG5cdGltcG9ydCBMYXlvdXQgZnJvbSAnLi4vLi4vLi4vcm91dGVzL19sYXlvdXQuc3ZlbHRlJztcblx0aW1wb3J0IEVycm9yIGZyb20gJy4uLy4uLy4uL3JvdXRlcy9fZXJyb3Iuc3ZlbHRlJztcblxuXHRleHBvcnQgbGV0IHN0b3Jlcztcblx0ZXhwb3J0IGxldCBlcnJvcjtcblx0ZXhwb3J0IGxldCBzdGF0dXM7XG5cdGV4cG9ydCBsZXQgc2VnbWVudHM7XG5cdGV4cG9ydCBsZXQgbGV2ZWwwO1xuXHRleHBvcnQgbGV0IGxldmVsMSA9IG51bGw7XG5cblx0c2V0Q29udGV4dChDT05URVhUX0tFWSwgc3RvcmVzKTtcbjwvc2NyaXB0PlxuXG48TGF5b3V0IHNlZ21lbnQ9XCJ7c2VnbWVudHNbMF19XCIgey4uLmxldmVsMC5wcm9wc30+XG5cdHsjaWYgZXJyb3J9XG5cdFx0PEVycm9yIHtlcnJvcn0ge3N0YXR1c30vPlxuXHR7OmVsc2V9XG5cdFx0PHN2ZWx0ZTpjb21wb25lbnQgdGhpcz1cIntsZXZlbDEuY29tcG9uZW50fVwiIHsuLi5sZXZlbDEucHJvcHN9Lz5cblx0ey9pZn1cbjwvTGF5b3V0PiIsImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGRldiwgYnVpbGRfZGlyLCBzcmNfZGlyLCBtYW5pZmVzdCB9IGZyb20gJy4vaW50ZXJuYWwvbWFuaWZlc3Qtc2VydmVyJztcbmltcG9ydCB7IHdyaXRhYmxlIH0gZnJvbSAnc3ZlbHRlL3N0b3JlJztcbmltcG9ydCBTdHJlYW0gZnJvbSAnc3RyZWFtJztcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IFVybCBmcm9tICd1cmwnO1xuaW1wb3J0IGh0dHBzIGZyb20gJ2h0dHBzJztcbmltcG9ydCB6bGliIGZyb20gJ3psaWInO1xuaW1wb3J0IEFwcCBmcm9tICcuL2ludGVybmFsL0FwcC5zdmVsdGUnO1xuXG5mdW5jdGlvbiBnZXRfc2VydmVyX3JvdXRlX2hhbmRsZXIocm91dGVzKSB7XG5cdGFzeW5jIGZ1bmN0aW9uIGhhbmRsZV9yb3V0ZShyb3V0ZSwgcmVxLCByZXMsIG5leHQpIHtcblx0XHRyZXEucGFyYW1zID0gcm91dGUucGFyYW1zKHJvdXRlLnBhdHRlcm4uZXhlYyhyZXEucGF0aCkpO1xuXG5cdFx0Y29uc3QgbWV0aG9kID0gcmVxLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuXHRcdC8vICdkZWxldGUnIGNhbm5vdCBiZSBleHBvcnRlZCBmcm9tIGEgbW9kdWxlIGJlY2F1c2UgaXQgaXMgYSBrZXl3b3JkLFxuXHRcdC8vIHNvIGNoZWNrIGZvciAnZGVsJyBpbnN0ZWFkXG5cdFx0Y29uc3QgbWV0aG9kX2V4cG9ydCA9IG1ldGhvZCA9PT0gJ2RlbGV0ZScgPyAnZGVsJyA6IG1ldGhvZDtcblx0XHRjb25zdCBoYW5kbGVfbWV0aG9kID0gcm91dGUuaGFuZGxlcnNbbWV0aG9kX2V4cG9ydF07XG5cdFx0aWYgKGhhbmRsZV9tZXRob2QpIHtcblx0XHRcdGlmIChwcm9jZXNzLmVudi5TQVBQRVJfRVhQT1JUKSB7XG5cdFx0XHRcdGNvbnN0IHsgd3JpdGUsIGVuZCwgc2V0SGVhZGVyIH0gPSByZXM7XG5cdFx0XHRcdGNvbnN0IGNodW5rcyA9IFtdO1xuXHRcdFx0XHRjb25zdCBoZWFkZXJzID0ge307XG5cblx0XHRcdFx0Ly8gaW50ZXJjZXB0IGRhdGEgc28gdGhhdCBpdCBjYW4gYmUgZXhwb3J0ZWRcblx0XHRcdFx0cmVzLndyaXRlID0gZnVuY3Rpb24oY2h1bmspIHtcblx0XHRcdFx0XHRjaHVua3MucHVzaChCdWZmZXIuZnJvbShjaHVuaykpO1xuXHRcdFx0XHRcdHdyaXRlLmFwcGx5KHJlcywgYXJndW1lbnRzKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRyZXMuc2V0SGVhZGVyID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcblx0XHRcdFx0XHRoZWFkZXJzW25hbWUudG9Mb3dlckNhc2UoKV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRzZXRIZWFkZXIuYXBwbHkocmVzLCBhcmd1bWVudHMpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHJlcy5lbmQgPSBmdW5jdGlvbihjaHVuaykge1xuXHRcdFx0XHRcdGlmIChjaHVuaykgY2h1bmtzLnB1c2goQnVmZmVyLmZyb20oY2h1bmspKTtcblx0XHRcdFx0XHRlbmQuYXBwbHkocmVzLCBhcmd1bWVudHMpO1xuXG5cdFx0XHRcdFx0cHJvY2Vzcy5zZW5kKHtcblx0XHRcdFx0XHRcdF9fc2FwcGVyX186IHRydWUsXG5cdFx0XHRcdFx0XHRldmVudDogJ2ZpbGUnLFxuXHRcdFx0XHRcdFx0dXJsOiByZXEudXJsLFxuXHRcdFx0XHRcdFx0bWV0aG9kOiByZXEubWV0aG9kLFxuXHRcdFx0XHRcdFx0c3RhdHVzOiByZXMuc3RhdHVzQ29kZSxcblx0XHRcdFx0XHRcdHR5cGU6IGhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddLFxuXHRcdFx0XHRcdFx0Ym9keTogQnVmZmVyLmNvbmNhdChjaHVua3MpLnRvU3RyaW5nKClcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgaGFuZGxlX25leHQgPSAoZXJyKSA9PiB7XG5cdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRyZXMuc3RhdHVzQ29kZSA9IDUwMDtcblx0XHRcdFx0XHRyZXMuZW5kKGVyci5tZXNzYWdlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRwcm9jZXNzLm5leHRUaWNrKG5leHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRhd2FpdCBoYW5kbGVfbWV0aG9kKHJlcSwgcmVzLCBoYW5kbGVfbmV4dCk7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXHRcdFx0XHRoYW5kbGVfbmV4dChlcnIpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBubyBtYXRjaGluZyBoYW5kbGVyIGZvciBtZXRob2Rcblx0XHRcdHByb2Nlc3MubmV4dFRpY2sobmV4dCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZ1bmN0aW9uIGZpbmRfcm91dGUocmVxLCByZXMsIG5leHQpIHtcblx0XHRmb3IgKGNvbnN0IHJvdXRlIG9mIHJvdXRlcykge1xuXHRcdFx0aWYgKHJvdXRlLnBhdHRlcm4udGVzdChyZXEucGF0aCkpIHtcblx0XHRcdFx0aGFuZGxlX3JvdXRlKHJvdXRlLCByZXEsIHJlcywgbmV4dCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRuZXh0KCk7XG5cdH07XG59XG5cbi8qIVxuICogY29va2llXG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IFJvbWFuIFNodHlsbWFuXG4gKiBDb3B5cmlnaHQoYykgMjAxNSBEb3VnbGFzIENocmlzdG9waGVyIFdpbHNvblxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqIEBwdWJsaWNcbiAqL1xuXG52YXIgcGFyc2VfMSA9IHBhcnNlO1xudmFyIHNlcmlhbGl6ZV8xID0gc2VyaWFsaXplO1xuXG4vKipcbiAqIE1vZHVsZSB2YXJpYWJsZXMuXG4gKiBAcHJpdmF0ZVxuICovXG5cbnZhciBkZWNvZGUgPSBkZWNvZGVVUklDb21wb25lbnQ7XG52YXIgZW5jb2RlID0gZW5jb2RlVVJJQ29tcG9uZW50O1xudmFyIHBhaXJTcGxpdFJlZ0V4cCA9IC87ICovO1xuXG4vKipcbiAqIFJlZ0V4cCB0byBtYXRjaCBmaWVsZC1jb250ZW50IGluIFJGQyA3MjMwIHNlYyAzLjJcbiAqXG4gKiBmaWVsZC1jb250ZW50ID0gZmllbGQtdmNoYXIgWyAxKiggU1AgLyBIVEFCICkgZmllbGQtdmNoYXIgXVxuICogZmllbGQtdmNoYXIgICA9IFZDSEFSIC8gb2JzLXRleHRcbiAqIG9icy10ZXh0ICAgICAgPSAleDgwLUZGXG4gKi9cblxudmFyIGZpZWxkQ29udGVudFJlZ0V4cCA9IC9eW1xcdTAwMDlcXHUwMDIwLVxcdTAwN2VcXHUwMDgwLVxcdTAwZmZdKyQvO1xuXG4vKipcbiAqIFBhcnNlIGEgY29va2llIGhlYWRlci5cbiAqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gY29va2llIGhlYWRlciBzdHJpbmcgaW50byBhbiBvYmplY3RcbiAqIFRoZSBvYmplY3QgaGFzIHRoZSB2YXJpb3VzIGNvb2tpZXMgYXMga2V5cyhuYW1lcykgPT4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICogQHJldHVybiB7b2JqZWN0fVxuICogQHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0ciwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBzdHIgbXVzdCBiZSBhIHN0cmluZycpO1xuICB9XG5cbiAgdmFyIG9iaiA9IHt9O1xuICB2YXIgb3B0ID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHBhaXJzID0gc3RyLnNwbGl0KHBhaXJTcGxpdFJlZ0V4cCk7XG4gIHZhciBkZWMgPSBvcHQuZGVjb2RlIHx8IGRlY29kZTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHBhaXIgPSBwYWlyc1tpXTtcbiAgICB2YXIgZXFfaWR4ID0gcGFpci5pbmRleE9mKCc9Jyk7XG5cbiAgICAvLyBza2lwIHRoaW5ncyB0aGF0IGRvbid0IGxvb2sgbGlrZSBrZXk9dmFsdWVcbiAgICBpZiAoZXFfaWR4IDwgMCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGtleSA9IHBhaXIuc3Vic3RyKDAsIGVxX2lkeCkudHJpbSgpO1xuICAgIHZhciB2YWwgPSBwYWlyLnN1YnN0cigrK2VxX2lkeCwgcGFpci5sZW5ndGgpLnRyaW0oKTtcblxuICAgIC8vIHF1b3RlZCB2YWx1ZXNcbiAgICBpZiAoJ1wiJyA9PSB2YWxbMF0pIHtcbiAgICAgIHZhbCA9IHZhbC5zbGljZSgxLCAtMSk7XG4gICAgfVxuXG4gICAgLy8gb25seSBhc3NpZ24gb25jZVxuICAgIGlmICh1bmRlZmluZWQgPT0gb2JqW2tleV0pIHtcbiAgICAgIG9ialtrZXldID0gdHJ5RGVjb2RlKHZhbCwgZGVjKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIFNlcmlhbGl6ZSBkYXRhIGludG8gYSBjb29raWUgaGVhZGVyLlxuICpcbiAqIFNlcmlhbGl6ZSB0aGUgYSBuYW1lIHZhbHVlIHBhaXIgaW50byBhIGNvb2tpZSBzdHJpbmcgc3VpdGFibGUgZm9yXG4gKiBodHRwIGhlYWRlcnMuIEFuIG9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0IHNwZWNpZmllZCBjb29raWUgcGFyYW1ldGVycy5cbiAqXG4gKiBzZXJpYWxpemUoJ2ZvbycsICdiYXInLCB7IGh0dHBPbmx5OiB0cnVlIH0pXG4gKiAgID0+IFwiZm9vPWJhcjsgaHR0cE9ubHlcIlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAcHVibGljXG4gKi9cblxuZnVuY3Rpb24gc2VyaWFsaXplKG5hbWUsIHZhbCwgb3B0aW9ucykge1xuICB2YXIgb3B0ID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIGVuYyA9IG9wdC5lbmNvZGUgfHwgZW5jb2RlO1xuXG4gIGlmICh0eXBlb2YgZW5jICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIGVuY29kZSBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICBpZiAoIWZpZWxkQ29udGVudFJlZ0V4cC50ZXN0KG5hbWUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgbmFtZSBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICB2YXIgdmFsdWUgPSBlbmModmFsKTtcblxuICBpZiAodmFsdWUgJiYgIWZpZWxkQ29udGVudFJlZ0V4cC50ZXN0KHZhbHVlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IHZhbCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICB2YXIgc3RyID0gbmFtZSArICc9JyArIHZhbHVlO1xuXG4gIGlmIChudWxsICE9IG9wdC5tYXhBZ2UpIHtcbiAgICB2YXIgbWF4QWdlID0gb3B0Lm1heEFnZSAtIDA7XG4gICAgaWYgKGlzTmFOKG1heEFnZSkpIHRocm93IG5ldyBFcnJvcignbWF4QWdlIHNob3VsZCBiZSBhIE51bWJlcicpO1xuICAgIHN0ciArPSAnOyBNYXgtQWdlPScgKyBNYXRoLmZsb29yKG1heEFnZSk7XG4gIH1cblxuICBpZiAob3B0LmRvbWFpbikge1xuICAgIGlmICghZmllbGRDb250ZW50UmVnRXhwLnRlc3Qob3B0LmRvbWFpbikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBkb21haW4gaXMgaW52YWxpZCcpO1xuICAgIH1cblxuICAgIHN0ciArPSAnOyBEb21haW49JyArIG9wdC5kb21haW47XG4gIH1cblxuICBpZiAob3B0LnBhdGgpIHtcbiAgICBpZiAoIWZpZWxkQ29udGVudFJlZ0V4cC50ZXN0KG9wdC5wYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIHBhdGggaXMgaW52YWxpZCcpO1xuICAgIH1cblxuICAgIHN0ciArPSAnOyBQYXRoPScgKyBvcHQucGF0aDtcbiAgfVxuXG4gIGlmIChvcHQuZXhwaXJlcykge1xuICAgIGlmICh0eXBlb2Ygb3B0LmV4cGlyZXMudG9VVENTdHJpbmcgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBleHBpcmVzIGlzIGludmFsaWQnKTtcbiAgICB9XG5cbiAgICBzdHIgKz0gJzsgRXhwaXJlcz0nICsgb3B0LmV4cGlyZXMudG9VVENTdHJpbmcoKTtcbiAgfVxuXG4gIGlmIChvcHQuaHR0cE9ubHkpIHtcbiAgICBzdHIgKz0gJzsgSHR0cE9ubHknO1xuICB9XG5cbiAgaWYgKG9wdC5zZWN1cmUpIHtcbiAgICBzdHIgKz0gJzsgU2VjdXJlJztcbiAgfVxuXG4gIGlmIChvcHQuc2FtZVNpdGUpIHtcbiAgICB2YXIgc2FtZVNpdGUgPSB0eXBlb2Ygb3B0LnNhbWVTaXRlID09PSAnc3RyaW5nJ1xuICAgICAgPyBvcHQuc2FtZVNpdGUudG9Mb3dlckNhc2UoKSA6IG9wdC5zYW1lU2l0ZTtcblxuICAgIHN3aXRjaCAoc2FtZVNpdGUpIHtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgc3RyICs9ICc7IFNhbWVTaXRlPVN0cmljdCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGF4JzpcbiAgICAgICAgc3RyICs9ICc7IFNhbWVTaXRlPUxheCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3RyaWN0JzpcbiAgICAgICAgc3RyICs9ICc7IFNhbWVTaXRlPVN0cmljdCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgIHN0ciArPSAnOyBTYW1lU2l0ZT1Ob25lJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gc2FtZVNpdGUgaXMgaW52YWxpZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHI7XG59XG5cbi8qKlxuICogVHJ5IGRlY29kaW5nIGEgc3RyaW5nIHVzaW5nIGEgZGVjb2RpbmcgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHBhcmFtIHtmdW5jdGlvbn0gZGVjb2RlXG4gKiBAcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHRyeURlY29kZShzdHIsIGRlY29kZSkge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGUoc3RyKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxudmFyIGNvb2tpZSA9IHtcblx0cGFyc2U6IHBhcnNlXzEsXG5cdHNlcmlhbGl6ZTogc2VyaWFsaXplXzFcbn07XG5cbnZhciBjaGFycyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXyQnO1xudmFyIHVuc2FmZUNoYXJzID0gL1s8PlxcYlxcZlxcblxcclxcdFxcMFxcdTIwMjhcXHUyMDI5XS9nO1xudmFyIHJlc2VydmVkID0gL14oPzpkb3xpZnxpbnxmb3J8aW50fGxldHxuZXd8dHJ5fHZhcnxieXRlfGNhc2V8Y2hhcnxlbHNlfGVudW18Z290b3xsb25nfHRoaXN8dm9pZHx3aXRofGF3YWl0fGJyZWFrfGNhdGNofGNsYXNzfGNvbnN0fGZpbmFsfGZsb2F0fHNob3J0fHN1cGVyfHRocm93fHdoaWxlfHlpZWxkfGRlbGV0ZXxkb3VibGV8ZXhwb3J0fGltcG9ydHxuYXRpdmV8cmV0dXJufHN3aXRjaHx0aHJvd3N8dHlwZW9mfGJvb2xlYW58ZGVmYXVsdHxleHRlbmRzfGZpbmFsbHl8cGFja2FnZXxwcml2YXRlfGFic3RyYWN0fGNvbnRpbnVlfGRlYnVnZ2VyfGZ1bmN0aW9ufHZvbGF0aWxlfGludGVyZmFjZXxwcm90ZWN0ZWR8dHJhbnNpZW50fGltcGxlbWVudHN8aW5zdGFuY2VvZnxzeW5jaHJvbml6ZWQpJC87XG52YXIgZXNjYXBlZCA9IHtcbiAgICAnPCc6ICdcXFxcdTAwM0MnLFxuICAgICc+JzogJ1xcXFx1MDAzRScsXG4gICAgJy8nOiAnXFxcXHUwMDJGJyxcbiAgICAnXFxcXCc6ICdcXFxcXFxcXCcsXG4gICAgJ1xcYic6ICdcXFxcYicsXG4gICAgJ1xcZic6ICdcXFxcZicsXG4gICAgJ1xcbic6ICdcXFxcbicsXG4gICAgJ1xccic6ICdcXFxccicsXG4gICAgJ1xcdCc6ICdcXFxcdCcsXG4gICAgJ1xcMCc6ICdcXFxcMCcsXG4gICAgJ1xcdTIwMjgnOiAnXFxcXHUyMDI4JyxcbiAgICAnXFx1MjAyOSc6ICdcXFxcdTIwMjknXG59O1xudmFyIG9iamVjdFByb3RvT3duUHJvcGVydHlOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE9iamVjdC5wcm90b3R5cGUpLnNvcnQoKS5qb2luKCdcXDAnKTtcbmZ1bmN0aW9uIGRldmFsdWUodmFsdWUpIHtcbiAgICB2YXIgY291bnRzID0gbmV3IE1hcCgpO1xuICAgIGZ1bmN0aW9uIHdhbGsodGhpbmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHN0cmluZ2lmeSBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudHMuaGFzKHRoaW5nKSkge1xuICAgICAgICAgICAgY291bnRzLnNldCh0aGluZywgY291bnRzLmdldCh0aGluZykgKyAxKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb3VudHMuc2V0KHRoaW5nLCAxKTtcbiAgICAgICAgaWYgKCFpc1ByaW1pdGl2ZSh0aGluZykpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gZ2V0VHlwZSh0aGluZyk7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdOdW1iZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1N0cmluZyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnQm9vbGVhbic6XG4gICAgICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnUmVnRXhwJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0FycmF5JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpbmcuZm9yRWFjaCh3YWxrKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnU2V0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdNYXAnOlxuICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHRoaW5nKS5mb3JFYWNoKHdhbGspO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpbmcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvdG8gIT09IE9iamVjdC5wcm90b3R5cGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3RvICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90bykuc29ydCgpLmpvaW4oJ1xcMCcpICE9PSBvYmplY3RQcm90b093blByb3BlcnR5TmFtZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBzdHJpbmdpZnkgYXJiaXRyYXJ5IG5vbi1QT0pPc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0aGluZykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHN0cmluZ2lmeSBQT0pPcyB3aXRoIHN5bWJvbGljIGtleXNcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGhpbmcpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gd2Fsayh0aGluZ1trZXldKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2Fsayh2YWx1ZSk7XG4gICAgdmFyIG5hbWVzID0gbmV3IE1hcCgpO1xuICAgIEFycmF5LmZyb20oY291bnRzKVxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChlbnRyeSkgeyByZXR1cm4gZW50cnlbMV0gPiAxOyB9KVxuICAgICAgICAuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYlsxXSAtIGFbMV07IH0pXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSwgaSkge1xuICAgICAgICBuYW1lcy5zZXQoZW50cnlbMF0sIGdldE5hbWUoaSkpO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeSh0aGluZykge1xuICAgICAgICBpZiAobmFtZXMuaGFzKHRoaW5nKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWVzLmdldCh0aGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJpbWl0aXZlKHRoaW5nKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ2lmeVByaW1pdGl2ZSh0aGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHR5cGUgPSBnZXRUeXBlKHRoaW5nKTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdOdW1iZXInOlxuICAgICAgICAgICAgY2FzZSAnU3RyaW5nJzpcbiAgICAgICAgICAgIGNhc2UgJ0Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIk9iamVjdChcIiArIHN0cmluZ2lmeSh0aGluZy52YWx1ZU9mKCkpICsgXCIpXCI7XG4gICAgICAgICAgICBjYXNlICdSZWdFeHAnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGluZy50b1N0cmluZygpO1xuICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibmV3IERhdGUoXCIgKyB0aGluZy5nZXRUaW1lKCkgKyBcIilcIjtcbiAgICAgICAgICAgIGNhc2UgJ0FycmF5JzpcbiAgICAgICAgICAgICAgICB2YXIgbWVtYmVycyA9IHRoaW5nLm1hcChmdW5jdGlvbiAodiwgaSkgeyByZXR1cm4gaSBpbiB0aGluZyA/IHN0cmluZ2lmeSh2KSA6ICcnOyB9KTtcbiAgICAgICAgICAgICAgICB2YXIgdGFpbCA9IHRoaW5nLmxlbmd0aCA9PT0gMCB8fCAodGhpbmcubGVuZ3RoIC0gMSBpbiB0aGluZykgPyAnJyA6ICcsJztcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJbXCIgKyBtZW1iZXJzLmpvaW4oJywnKSArIHRhaWwgKyBcIl1cIjtcbiAgICAgICAgICAgIGNhc2UgJ1NldCc6XG4gICAgICAgICAgICBjYXNlICdNYXAnOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIm5ldyBcIiArIHR5cGUgKyBcIihbXCIgKyBBcnJheS5mcm9tKHRoaW5nKS5tYXAoc3RyaW5naWZ5KS5qb2luKCcsJykgKyBcIl0pXCI7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHZhciBvYmogPSBcIntcIiArIE9iamVjdC5rZXlzKHRoaW5nKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gc2FmZUtleShrZXkpICsgXCI6XCIgKyBzdHJpbmdpZnkodGhpbmdba2V5XSk7IH0pLmpvaW4oJywnKSArIFwifVwiO1xuICAgICAgICAgICAgICAgIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGluZyk7XG4gICAgICAgICAgICAgICAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGluZykubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcIk9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShudWxsKSxcIiArIG9iaiArIFwiKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiT2JqZWN0LmNyZWF0ZShudWxsKVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBzdHIgPSBzdHJpbmdpZnkodmFsdWUpO1xuICAgIGlmIChuYW1lcy5zaXplKSB7XG4gICAgICAgIHZhciBwYXJhbXNfMSA9IFtdO1xuICAgICAgICB2YXIgc3RhdGVtZW50c18xID0gW107XG4gICAgICAgIHZhciB2YWx1ZXNfMSA9IFtdO1xuICAgICAgICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lLCB0aGluZykge1xuICAgICAgICAgICAgcGFyYW1zXzEucHVzaChuYW1lKTtcbiAgICAgICAgICAgIGlmIChpc1ByaW1pdGl2ZSh0aGluZykpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKHN0cmluZ2lmeVByaW1pdGl2ZSh0aGluZykpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0eXBlID0gZ2V0VHlwZSh0aGluZyk7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdOdW1iZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1N0cmluZyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnQm9vbGVhbic6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2goXCJPYmplY3QoXCIgKyBzdHJpbmdpZnkodGhpbmcudmFsdWVPZigpKSArIFwiKVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUmVnRXhwJzpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaCh0aGluZy50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2goXCJuZXcgRGF0ZShcIiArIHRoaW5nLmdldFRpbWUoKSArIFwiKVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyYXknOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKFwiQXJyYXkoXCIgKyB0aGluZy5sZW5ndGggKyBcIilcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaW5nLmZvckVhY2goZnVuY3Rpb24gKHYsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKG5hbWUgKyBcIltcIiArIGkgKyBcIl09XCIgKyBzdHJpbmdpZnkodikpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnU2V0JzpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChcIm5ldyBTZXRcIik7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKG5hbWUgKyBcIi5cIiArIEFycmF5LmZyb20odGhpbmcpLm1hcChmdW5jdGlvbiAodikgeyByZXR1cm4gXCJhZGQoXCIgKyBzdHJpbmdpZnkodikgKyBcIilcIjsgfSkuam9pbignLicpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnTWFwJzpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChcIm5ldyBNYXBcIik7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKG5hbWUgKyBcIi5cIiArIEFycmF5LmZyb20odGhpbmcpLm1hcChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrID0gX2FbMF0sIHYgPSBfYVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInNldChcIiArIHN0cmluZ2lmeShrKSArIFwiLCBcIiArIHN0cmluZ2lmeSh2KSArIFwiKVwiO1xuICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcuJykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGluZykgPT09IG51bGwgPyAnT2JqZWN0LmNyZWF0ZShudWxsKScgOiAne30nKTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGhpbmcpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50c18xLnB1c2goXCJcIiArIG5hbWUgKyBzYWZlUHJvcChrZXkpICsgXCI9XCIgKyBzdHJpbmdpZnkodGhpbmdba2V5XSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKFwicmV0dXJuIFwiICsgc3RyKTtcbiAgICAgICAgcmV0dXJuIFwiKGZ1bmN0aW9uKFwiICsgcGFyYW1zXzEuam9pbignLCcpICsgXCIpe1wiICsgc3RhdGVtZW50c18xLmpvaW4oJzsnKSArIFwifShcIiArIHZhbHVlc18xLmpvaW4oJywnKSArIFwiKSlcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0TmFtZShudW0pIHtcbiAgICB2YXIgbmFtZSA9ICcnO1xuICAgIGRvIHtcbiAgICAgICAgbmFtZSA9IGNoYXJzW251bSAlIGNoYXJzLmxlbmd0aF0gKyBuYW1lO1xuICAgICAgICBudW0gPSB+fihudW0gLyBjaGFycy5sZW5ndGgpIC0gMTtcbiAgICB9IHdoaWxlIChudW0gPj0gMCk7XG4gICAgcmV0dXJuIHJlc2VydmVkLnRlc3QobmFtZSkgPyBuYW1lICsgXCJfXCIgOiBuYW1lO1xufVxuZnVuY3Rpb24gaXNQcmltaXRpdmUodGhpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0KHRoaW5nKSAhPT0gdGhpbmc7XG59XG5mdW5jdGlvbiBzdHJpbmdpZnlQcmltaXRpdmUodGhpbmcpIHtcbiAgICBpZiAodHlwZW9mIHRoaW5nID09PSAnc3RyaW5nJylcbiAgICAgICAgcmV0dXJuIHN0cmluZ2lmeVN0cmluZyh0aGluZyk7XG4gICAgaWYgKHRoaW5nID09PSB2b2lkIDApXG4gICAgICAgIHJldHVybiAndm9pZCAwJztcbiAgICBpZiAodGhpbmcgPT09IDAgJiYgMSAvIHRoaW5nIDwgMClcbiAgICAgICAgcmV0dXJuICctMCc7XG4gICAgdmFyIHN0ciA9IFN0cmluZyh0aGluZyk7XG4gICAgaWYgKHR5cGVvZiB0aGluZyA9PT0gJ251bWJlcicpXG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXigtKT8wXFwuLywgJyQxLicpO1xuICAgIHJldHVybiBzdHI7XG59XG5mdW5jdGlvbiBnZXRUeXBlKHRoaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGluZykuc2xpY2UoOCwgLTEpO1xufVxuZnVuY3Rpb24gZXNjYXBlVW5zYWZlQ2hhcihjKSB7XG4gICAgcmV0dXJuIGVzY2FwZWRbY10gfHwgYztcbn1cbmZ1bmN0aW9uIGVzY2FwZVVuc2FmZUNoYXJzKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSh1bnNhZmVDaGFycywgZXNjYXBlVW5zYWZlQ2hhcik7XG59XG5mdW5jdGlvbiBzYWZlS2V5KGtleSkge1xuICAgIHJldHVybiAvXltfJGEtekEtWl1bXyRhLXpBLVowLTldKiQvLnRlc3Qoa2V5KSA/IGtleSA6IGVzY2FwZVVuc2FmZUNoYXJzKEpTT04uc3RyaW5naWZ5KGtleSkpO1xufVxuZnVuY3Rpb24gc2FmZVByb3Aoa2V5KSB7XG4gICAgcmV0dXJuIC9eW18kYS16QS1aXVtfJGEtekEtWjAtOV0qJC8udGVzdChrZXkpID8gXCIuXCIgKyBrZXkgOiBcIltcIiArIGVzY2FwZVVuc2FmZUNoYXJzKEpTT04uc3RyaW5naWZ5KGtleSkpICsgXCJdXCI7XG59XG5mdW5jdGlvbiBzdHJpbmdpZnlTdHJpbmcoc3RyKSB7XG4gICAgdmFyIHJlc3VsdCA9ICdcIic7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdmFyIGNoYXIgPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICB2YXIgY29kZSA9IGNoYXIuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgaWYgKGNoYXIgPT09ICdcIicpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAnXFxcXFwiJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjaGFyIGluIGVzY2FwZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBlc2NhcGVkW2NoYXJdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPj0gMHhkODAwICYmIGNvZGUgPD0gMHhkZmZmKSB7XG4gICAgICAgICAgICB2YXIgbmV4dCA9IHN0ci5jaGFyQ29kZUF0KGkgKyAxKTtcbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgdGhlIGJlZ2lubmluZyBvZiBhIFtoaWdoLCBsb3ddIHN1cnJvZ2F0ZSBwYWlyLFxuICAgICAgICAgICAgLy8gYWRkIHRoZSBuZXh0IHR3byBjaGFyYWN0ZXJzLCBvdGhlcndpc2UgZXNjYXBlXG4gICAgICAgICAgICBpZiAoY29kZSA8PSAweGRiZmYgJiYgKG5leHQgPj0gMHhkYzAwICYmIG5leHQgPD0gMHhkZmZmKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBjaGFyICsgc3RyWysraV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCJcXFxcdVwiICsgY29kZS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBjaGFyO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc3VsdCArPSAnXCInO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIEJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS90bXB2YXIvanNkb20vYmxvYi9hYTg1YjJhYmYwNzc2NmZmN2JmNWMxZjZkYWFmYjM3MjZmMmYyZGI1L2xpYi9qc2RvbS9saXZpbmcvYmxvYi5qc1xuXG4vLyBmaXggZm9yIFwiUmVhZGFibGVcIiBpc24ndCBhIG5hbWVkIGV4cG9ydCBpc3N1ZVxuY29uc3QgUmVhZGFibGUgPSBTdHJlYW0uUmVhZGFibGU7XG5cbmNvbnN0IEJVRkZFUiA9IFN5bWJvbCgnYnVmZmVyJyk7XG5jb25zdCBUWVBFID0gU3ltYm9sKCd0eXBlJyk7XG5cbmNsYXNzIEJsb2Ige1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzW1RZUEVdID0gJyc7XG5cblx0XHRjb25zdCBibG9iUGFydHMgPSBhcmd1bWVudHNbMF07XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IGFyZ3VtZW50c1sxXTtcblxuXHRcdGNvbnN0IGJ1ZmZlcnMgPSBbXTtcblx0XHRsZXQgc2l6ZSA9IDA7XG5cblx0XHRpZiAoYmxvYlBhcnRzKSB7XG5cdFx0XHRjb25zdCBhID0gYmxvYlBhcnRzO1xuXHRcdFx0Y29uc3QgbGVuZ3RoID0gTnVtYmVyKGEubGVuZ3RoKTtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29uc3QgZWxlbWVudCA9IGFbaV07XG5cdFx0XHRcdGxldCBidWZmZXI7XG5cdFx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQnVmZmVyKSB7XG5cdFx0XHRcdFx0YnVmZmVyID0gZWxlbWVudDtcblx0XHRcdFx0fSBlbHNlIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoZWxlbWVudCkpIHtcblx0XHRcdFx0XHRidWZmZXIgPSBCdWZmZXIuZnJvbShlbGVtZW50LmJ1ZmZlciwgZWxlbWVudC5ieXRlT2Zmc2V0LCBlbGVtZW50LmJ5dGVMZW5ndGgpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuXHRcdFx0XHRcdGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGVsZW1lbnQpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCbG9iKSB7XG5cdFx0XHRcdFx0YnVmZmVyID0gZWxlbWVudFtCVUZGRVJdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyA/IGVsZW1lbnQgOiBTdHJpbmcoZWxlbWVudCkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHNpemUgKz0gYnVmZmVyLmxlbmd0aDtcblx0XHRcdFx0YnVmZmVycy5wdXNoKGJ1ZmZlcik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpc1tCVUZGRVJdID0gQnVmZmVyLmNvbmNhdChidWZmZXJzKTtcblxuXHRcdGxldCB0eXBlID0gb3B0aW9ucyAmJiBvcHRpb25zLnR5cGUgIT09IHVuZGVmaW5lZCAmJiBTdHJpbmcob3B0aW9ucy50eXBlKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGlmICh0eXBlICYmICEvW15cXHUwMDIwLVxcdTAwN0VdLy50ZXN0KHR5cGUpKSB7XG5cdFx0XHR0aGlzW1RZUEVdID0gdHlwZTtcblx0XHR9XG5cdH1cblx0Z2V0IHNpemUoKSB7XG5cdFx0cmV0dXJuIHRoaXNbQlVGRkVSXS5sZW5ndGg7XG5cdH1cblx0Z2V0IHR5cGUoKSB7XG5cdFx0cmV0dXJuIHRoaXNbVFlQRV07XG5cdH1cblx0dGV4dCgpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXNbQlVGRkVSXS50b1N0cmluZygpKTtcblx0fVxuXHRhcnJheUJ1ZmZlcigpIHtcblx0XHRjb25zdCBidWYgPSB0aGlzW0JVRkZFUl07XG5cdFx0Y29uc3QgYWIgPSBidWYuYnVmZmVyLnNsaWNlKGJ1Zi5ieXRlT2Zmc2V0LCBidWYuYnl0ZU9mZnNldCArIGJ1Zi5ieXRlTGVuZ3RoKTtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFiKTtcblx0fVxuXHRzdHJlYW0oKSB7XG5cdFx0Y29uc3QgcmVhZGFibGUgPSBuZXcgUmVhZGFibGUoKTtcblx0XHRyZWFkYWJsZS5fcmVhZCA9IGZ1bmN0aW9uICgpIHt9O1xuXHRcdHJlYWRhYmxlLnB1c2godGhpc1tCVUZGRVJdKTtcblx0XHRyZWFkYWJsZS5wdXNoKG51bGwpO1xuXHRcdHJldHVybiByZWFkYWJsZTtcblx0fVxuXHR0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gJ1tvYmplY3QgQmxvYl0nO1xuXHR9XG5cdHNsaWNlKCkge1xuXHRcdGNvbnN0IHNpemUgPSB0aGlzLnNpemU7XG5cblx0XHRjb25zdCBzdGFydCA9IGFyZ3VtZW50c1swXTtcblx0XHRjb25zdCBlbmQgPSBhcmd1bWVudHNbMV07XG5cdFx0bGV0IHJlbGF0aXZlU3RhcnQsIHJlbGF0aXZlRW5kO1xuXHRcdGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZWxhdGl2ZVN0YXJ0ID0gMDtcblx0XHR9IGVsc2UgaWYgKHN0YXJ0IDwgMCkge1xuXHRcdFx0cmVsYXRpdmVTdGFydCA9IE1hdGgubWF4KHNpemUgKyBzdGFydCwgMCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbGF0aXZlU3RhcnQgPSBNYXRoLm1pbihzdGFydCwgc2l6ZSk7XG5cdFx0fVxuXHRcdGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmVsYXRpdmVFbmQgPSBzaXplO1xuXHRcdH0gZWxzZSBpZiAoZW5kIDwgMCkge1xuXHRcdFx0cmVsYXRpdmVFbmQgPSBNYXRoLm1heChzaXplICsgZW5kLCAwKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVsYXRpdmVFbmQgPSBNYXRoLm1pbihlbmQsIHNpemUpO1xuXHRcdH1cblx0XHRjb25zdCBzcGFuID0gTWF0aC5tYXgocmVsYXRpdmVFbmQgLSByZWxhdGl2ZVN0YXJ0LCAwKTtcblxuXHRcdGNvbnN0IGJ1ZmZlciA9IHRoaXNbQlVGRkVSXTtcblx0XHRjb25zdCBzbGljZWRCdWZmZXIgPSBidWZmZXIuc2xpY2UocmVsYXRpdmVTdGFydCwgcmVsYXRpdmVTdGFydCArIHNwYW4pO1xuXHRcdGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbXSwgeyB0eXBlOiBhcmd1bWVudHNbMl0gfSk7XG5cdFx0YmxvYltCVUZGRVJdID0gc2xpY2VkQnVmZmVyO1xuXHRcdHJldHVybiBibG9iO1xuXHR9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEJsb2IucHJvdG90eXBlLCB7XG5cdHNpemU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHR0eXBlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0c2xpY2U6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEJsb2IucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcblx0dmFsdWU6ICdCbG9iJyxcblx0d3JpdGFibGU6IGZhbHNlLFxuXHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0Y29uZmlndXJhYmxlOiB0cnVlXG59KTtcblxuLyoqXG4gKiBmZXRjaC1lcnJvci5qc1xuICpcbiAqIEZldGNoRXJyb3IgaW50ZXJmYWNlIGZvciBvcGVyYXRpb25hbCBlcnJvcnNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBGZXRjaEVycm9yIGluc3RhbmNlXG4gKlxuICogQHBhcmFtICAgU3RyaW5nICAgICAgbWVzc2FnZSAgICAgIEVycm9yIG1lc3NhZ2UgZm9yIGh1bWFuXG4gKiBAcGFyYW0gICBTdHJpbmcgICAgICB0eXBlICAgICAgICAgRXJyb3IgdHlwZSBmb3IgbWFjaGluZVxuICogQHBhcmFtICAgU3RyaW5nICAgICAgc3lzdGVtRXJyb3IgIEZvciBOb2RlLmpzIHN5c3RlbSBlcnJvclxuICogQHJldHVybiAgRmV0Y2hFcnJvclxuICovXG5mdW5jdGlvbiBGZXRjaEVycm9yKG1lc3NhZ2UsIHR5cGUsIHN5c3RlbUVycm9yKSB7XG4gIEVycm9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy50eXBlID0gdHlwZTtcblxuICAvLyB3aGVuIGVyci50eXBlIGlzIGBzeXN0ZW1gLCBlcnIuY29kZSBjb250YWlucyBzeXN0ZW0gZXJyb3IgY29kZVxuICBpZiAoc3lzdGVtRXJyb3IpIHtcbiAgICB0aGlzLmNvZGUgPSB0aGlzLmVycm5vID0gc3lzdGVtRXJyb3IuY29kZTtcbiAgfVxuXG4gIC8vIGhpZGUgY3VzdG9tIGVycm9yIGltcGxlbWVudGF0aW9uIGRldGFpbHMgZnJvbSBlbmQtdXNlcnNcbiAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG59XG5cbkZldGNoRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuRmV0Y2hFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGZXRjaEVycm9yO1xuRmV0Y2hFcnJvci5wcm90b3R5cGUubmFtZSA9ICdGZXRjaEVycm9yJztcblxubGV0IGNvbnZlcnQ7XG50cnkge1xuXHRjb252ZXJ0ID0gcmVxdWlyZSgnZW5jb2RpbmcnKS5jb252ZXJ0O1xufSBjYXRjaCAoZSkge31cblxuY29uc3QgSU5URVJOQUxTID0gU3ltYm9sKCdCb2R5IGludGVybmFscycpO1xuXG4vLyBmaXggYW4gaXNzdWUgd2hlcmUgXCJQYXNzVGhyb3VnaFwiIGlzbid0IGEgbmFtZWQgZXhwb3J0IGZvciBub2RlIDwxMFxuY29uc3QgUGFzc1Rocm91Z2ggPSBTdHJlYW0uUGFzc1Rocm91Z2g7XG5cbi8qKlxuICogQm9keSBtaXhpblxuICpcbiAqIFJlZjogaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2JvZHlcbiAqXG4gKiBAcGFyYW0gICBTdHJlYW0gIGJvZHkgIFJlYWRhYmxlIHN0cmVhbVxuICogQHBhcmFtICAgT2JqZWN0ICBvcHRzICBSZXNwb25zZSBvcHRpb25zXG4gKiBAcmV0dXJuICBWb2lkXG4gKi9cbmZ1bmN0aW9uIEJvZHkoYm9keSkge1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fSxcblx0ICAgIF9yZWYkc2l6ZSA9IF9yZWYuc2l6ZTtcblxuXHRsZXQgc2l6ZSA9IF9yZWYkc2l6ZSA9PT0gdW5kZWZpbmVkID8gMCA6IF9yZWYkc2l6ZTtcblx0dmFyIF9yZWYkdGltZW91dCA9IF9yZWYudGltZW91dDtcblx0bGV0IHRpbWVvdXQgPSBfcmVmJHRpbWVvdXQgPT09IHVuZGVmaW5lZCA/IDAgOiBfcmVmJHRpbWVvdXQ7XG5cblx0aWYgKGJvZHkgPT0gbnVsbCkge1xuXHRcdC8vIGJvZHkgaXMgdW5kZWZpbmVkIG9yIG51bGxcblx0XHRib2R5ID0gbnVsbDtcblx0fSBlbHNlIGlmIChpc1VSTFNlYXJjaFBhcmFtcyhib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgYSBVUkxTZWFyY2hQYXJhbXNcblx0XHRib2R5ID0gQnVmZmVyLmZyb20oYm9keS50b1N0cmluZygpKTtcblx0fSBlbHNlIGlmIChpc0Jsb2IoYm9keSkpIDsgZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSA7IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChib2R5KSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJykge1xuXHRcdC8vIGJvZHkgaXMgQXJyYXlCdWZmZXJcblx0XHRib2R5ID0gQnVmZmVyLmZyb20oYm9keSk7XG5cdH0gZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBBcnJheUJ1ZmZlclZpZXdcblx0XHRib2R5ID0gQnVmZmVyLmZyb20oYm9keS5idWZmZXIsIGJvZHkuYnl0ZU9mZnNldCwgYm9keS5ieXRlTGVuZ3RoKTtcblx0fSBlbHNlIGlmIChib2R5IGluc3RhbmNlb2YgU3RyZWFtKSA7IGVsc2Uge1xuXHRcdC8vIG5vbmUgb2YgdGhlIGFib3ZlXG5cdFx0Ly8gY29lcmNlIHRvIHN0cmluZyB0aGVuIGJ1ZmZlclxuXHRcdGJvZHkgPSBCdWZmZXIuZnJvbShTdHJpbmcoYm9keSkpO1xuXHR9XG5cdHRoaXNbSU5URVJOQUxTXSA9IHtcblx0XHRib2R5LFxuXHRcdGRpc3R1cmJlZDogZmFsc2UsXG5cdFx0ZXJyb3I6IG51bGxcblx0fTtcblx0dGhpcy5zaXplID0gc2l6ZTtcblx0dGhpcy50aW1lb3V0ID0gdGltZW91dDtcblxuXHRpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkge1xuXHRcdGJvZHkub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuXHRcdFx0Y29uc3QgZXJyb3IgPSBlcnIubmFtZSA9PT0gJ0Fib3J0RXJyb3InID8gZXJyIDogbmV3IEZldGNoRXJyb3IoYEludmFsaWQgcmVzcG9uc2UgYm9keSB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggJHtfdGhpcy51cmx9OiAke2Vyci5tZXNzYWdlfWAsICdzeXN0ZW0nLCBlcnIpO1xuXHRcdFx0X3RoaXNbSU5URVJOQUxTXS5lcnJvciA9IGVycm9yO1xuXHRcdH0pO1xuXHR9XG59XG5cbkJvZHkucHJvdG90eXBlID0ge1xuXHRnZXQgYm9keSgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFNdLmJvZHk7XG5cdH0sXG5cblx0Z2V0IGJvZHlVc2VkKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uZGlzdHVyYmVkO1xuXHR9LFxuXG5cdC8qKlxuICAqIERlY29kZSByZXNwb25zZSBhcyBBcnJheUJ1ZmZlclxuICAqXG4gICogQHJldHVybiAgUHJvbWlzZVxuICAqL1xuXHRhcnJheUJ1ZmZlcigpIHtcblx0XHRyZXR1cm4gY29uc3VtZUJvZHkuY2FsbCh0aGlzKS50aGVuKGZ1bmN0aW9uIChidWYpIHtcblx0XHRcdHJldHVybiBidWYuYnVmZmVyLnNsaWNlKGJ1Zi5ieXRlT2Zmc2V0LCBidWYuYnl0ZU9mZnNldCArIGJ1Zi5ieXRlTGVuZ3RoKTtcblx0XHR9KTtcblx0fSxcblxuXHQvKipcbiAgKiBSZXR1cm4gcmF3IHJlc3BvbnNlIGFzIEJsb2JcbiAgKlxuICAqIEByZXR1cm4gUHJvbWlzZVxuICAqL1xuXHRibG9iKCkge1xuXHRcdGxldCBjdCA9IHRoaXMuaGVhZGVycyAmJiB0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSB8fCAnJztcblx0XHRyZXR1cm4gY29uc3VtZUJvZHkuY2FsbCh0aGlzKS50aGVuKGZ1bmN0aW9uIChidWYpIHtcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKFxuXHRcdFx0Ly8gUHJldmVudCBjb3B5aW5nXG5cdFx0XHRuZXcgQmxvYihbXSwge1xuXHRcdFx0XHR0eXBlOiBjdC50b0xvd2VyQ2FzZSgpXG5cdFx0XHR9KSwge1xuXHRcdFx0XHRbQlVGRkVSXTogYnVmXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSxcblxuXHQvKipcbiAgKiBEZWNvZGUgcmVzcG9uc2UgYXMganNvblxuICAqXG4gICogQHJldHVybiAgUHJvbWlzZVxuICAqL1xuXHRqc29uKCkge1xuXHRcdHZhciBfdGhpczIgPSB0aGlzO1xuXG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcykudGhlbihmdW5jdGlvbiAoYnVmZmVyKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXR1cm4gSlNPTi5wYXJzZShidWZmZXIudG9TdHJpbmcoKSk7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0cmV0dXJuIEJvZHkuUHJvbWlzZS5yZWplY3QobmV3IEZldGNoRXJyb3IoYGludmFsaWQganNvbiByZXNwb25zZSBib2R5IGF0ICR7X3RoaXMyLnVybH0gcmVhc29uOiAke2Vyci5tZXNzYWdlfWAsICdpbnZhbGlkLWpzb24nKSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqXG4gICogRGVjb2RlIHJlc3BvbnNlIGFzIHRleHRcbiAgKlxuICAqIEByZXR1cm4gIFByb21pc2VcbiAgKi9cblx0dGV4dCgpIHtcblx0XHRyZXR1cm4gY29uc3VtZUJvZHkuY2FsbCh0aGlzKS50aGVuKGZ1bmN0aW9uIChidWZmZXIpIHtcblx0XHRcdHJldHVybiBidWZmZXIudG9TdHJpbmcoKTtcblx0XHR9KTtcblx0fSxcblxuXHQvKipcbiAgKiBEZWNvZGUgcmVzcG9uc2UgYXMgYnVmZmVyIChub24tc3BlYyBhcGkpXG4gICpcbiAgKiBAcmV0dXJuICBQcm9taXNlXG4gICovXG5cdGJ1ZmZlcigpIHtcblx0XHRyZXR1cm4gY29uc3VtZUJvZHkuY2FsbCh0aGlzKTtcblx0fSxcblxuXHQvKipcbiAgKiBEZWNvZGUgcmVzcG9uc2UgYXMgdGV4dCwgd2hpbGUgYXV0b21hdGljYWxseSBkZXRlY3RpbmcgdGhlIGVuY29kaW5nIGFuZFxuICAqIHRyeWluZyB0byBkZWNvZGUgdG8gVVRGLTggKG5vbi1zcGVjIGFwaSlcbiAgKlxuICAqIEByZXR1cm4gIFByb21pc2VcbiAgKi9cblx0dGV4dENvbnZlcnRlZCgpIHtcblx0XHR2YXIgX3RoaXMzID0gdGhpcztcblxuXHRcdHJldHVybiBjb25zdW1lQm9keS5jYWxsKHRoaXMpLnRoZW4oZnVuY3Rpb24gKGJ1ZmZlcikge1xuXHRcdFx0cmV0dXJuIGNvbnZlcnRCb2R5KGJ1ZmZlciwgX3RoaXMzLmhlYWRlcnMpO1xuXHRcdH0pO1xuXHR9XG59O1xuXG4vLyBJbiBicm93c2VycywgYWxsIHByb3BlcnRpZXMgYXJlIGVudW1lcmFibGUuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhCb2R5LnByb3RvdHlwZSwge1xuXHRib2R5OiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0Ym9keVVzZWQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRhcnJheUJ1ZmZlcjogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGJsb2I6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRqc29uOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0dGV4dDogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuXG5Cb2R5Lm1peEluID0gZnVuY3Rpb24gKHByb3RvKSB7XG5cdGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhCb2R5LnByb3RvdHlwZSkpIHtcblx0XHQvLyBpc3RhbmJ1bCBpZ25vcmUgZWxzZTogZnV0dXJlIHByb29mXG5cdFx0aWYgKCEobmFtZSBpbiBwcm90bykpIHtcblx0XHRcdGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEJvZHkucHJvdG90eXBlLCBuYW1lKTtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgbmFtZSwgZGVzYyk7XG5cdFx0fVxuXHR9XG59O1xuXG4vKipcbiAqIENvbnN1bWUgYW5kIGNvbnZlcnQgYW4gZW50aXJlIEJvZHkgdG8gYSBCdWZmZXIuXG4gKlxuICogUmVmOiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jY29uY2VwdC1ib2R5LWNvbnN1bWUtYm9keVxuICpcbiAqIEByZXR1cm4gIFByb21pc2VcbiAqL1xuZnVuY3Rpb24gY29uc3VtZUJvZHkoKSB7XG5cdHZhciBfdGhpczQgPSB0aGlzO1xuXG5cdGlmICh0aGlzW0lOVEVSTkFMU10uZGlzdHVyYmVkKSB7XG5cdFx0cmV0dXJuIEJvZHkuUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcihgYm9keSB1c2VkIGFscmVhZHkgZm9yOiAke3RoaXMudXJsfWApKTtcblx0fVxuXG5cdHRoaXNbSU5URVJOQUxTXS5kaXN0dXJiZWQgPSB0cnVlO1xuXG5cdGlmICh0aGlzW0lOVEVSTkFMU10uZXJyb3IpIHtcblx0XHRyZXR1cm4gQm9keS5Qcm9taXNlLnJlamVjdCh0aGlzW0lOVEVSTkFMU10uZXJyb3IpO1xuXHR9XG5cblx0bGV0IGJvZHkgPSB0aGlzLmJvZHk7XG5cblx0Ly8gYm9keSBpcyBudWxsXG5cdGlmIChib2R5ID09PSBudWxsKSB7XG5cdFx0cmV0dXJuIEJvZHkuUHJvbWlzZS5yZXNvbHZlKEJ1ZmZlci5hbGxvYygwKSk7XG5cdH1cblxuXHQvLyBib2R5IGlzIGJsb2Jcblx0aWYgKGlzQmxvYihib2R5KSkge1xuXHRcdGJvZHkgPSBib2R5LnN0cmVhbSgpO1xuXHR9XG5cblx0Ly8gYm9keSBpcyBidWZmZXJcblx0aWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkge1xuXHRcdHJldHVybiBCb2R5LlByb21pc2UucmVzb2x2ZShib2R5KTtcblx0fVxuXG5cdC8vIGlzdGFuYnVsIGlnbm9yZSBpZjogc2hvdWxkIG5ldmVyIGhhcHBlblxuXHRpZiAoIShib2R5IGluc3RhbmNlb2YgU3RyZWFtKSkge1xuXHRcdHJldHVybiBCb2R5LlByb21pc2UucmVzb2x2ZShCdWZmZXIuYWxsb2MoMCkpO1xuXHR9XG5cblx0Ly8gYm9keSBpcyBzdHJlYW1cblx0Ly8gZ2V0IHJlYWR5IHRvIGFjdHVhbGx5IGNvbnN1bWUgdGhlIGJvZHlcblx0bGV0IGFjY3VtID0gW107XG5cdGxldCBhY2N1bUJ5dGVzID0gMDtcblx0bGV0IGFib3J0ID0gZmFsc2U7XG5cblx0cmV0dXJuIG5ldyBCb2R5LlByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdGxldCByZXNUaW1lb3V0O1xuXG5cdFx0Ly8gYWxsb3cgdGltZW91dCBvbiBzbG93IHJlc3BvbnNlIGJvZHlcblx0XHRpZiAoX3RoaXM0LnRpbWVvdXQpIHtcblx0XHRcdHJlc1RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0YWJvcnQgPSB0cnVlO1xuXHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYFJlc3BvbnNlIHRpbWVvdXQgd2hpbGUgdHJ5aW5nIHRvIGZldGNoICR7X3RoaXM0LnVybH0gKG92ZXIgJHtfdGhpczQudGltZW91dH1tcylgLCAnYm9keS10aW1lb3V0JykpO1xuXHRcdFx0fSwgX3RoaXM0LnRpbWVvdXQpO1xuXHRcdH1cblxuXHRcdC8vIGhhbmRsZSBzdHJlYW0gZXJyb3JzXG5cdFx0Ym9keS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRpZiAoZXJyLm5hbWUgPT09ICdBYm9ydEVycm9yJykge1xuXHRcdFx0XHQvLyBpZiB0aGUgcmVxdWVzdCB3YXMgYWJvcnRlZCwgcmVqZWN0IHdpdGggdGhpcyBFcnJvclxuXHRcdFx0XHRhYm9ydCA9IHRydWU7XG5cdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gb3RoZXIgZXJyb3JzLCBzdWNoIGFzIGluY29ycmVjdCBjb250ZW50LWVuY29kaW5nXG5cdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgSW52YWxpZCByZXNwb25zZSBib2R5IHdoaWxlIHRyeWluZyB0byBmZXRjaCAke190aGlzNC51cmx9OiAke2Vyci5tZXNzYWdlfWAsICdzeXN0ZW0nLCBlcnIpKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGJvZHkub24oJ2RhdGEnLCBmdW5jdGlvbiAoY2h1bmspIHtcblx0XHRcdGlmIChhYm9ydCB8fCBjaHVuayA9PT0gbnVsbCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChfdGhpczQuc2l6ZSAmJiBhY2N1bUJ5dGVzICsgY2h1bmsubGVuZ3RoID4gX3RoaXM0LnNpemUpIHtcblx0XHRcdFx0YWJvcnQgPSB0cnVlO1xuXHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYGNvbnRlbnQgc2l6ZSBhdCAke190aGlzNC51cmx9IG92ZXIgbGltaXQ6ICR7X3RoaXM0LnNpemV9YCwgJ21heC1zaXplJykpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGFjY3VtQnl0ZXMgKz0gY2h1bmsubGVuZ3RoO1xuXHRcdFx0YWNjdW0ucHVzaChjaHVuayk7XG5cdFx0fSk7XG5cblx0XHRib2R5Lm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoYWJvcnQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjbGVhclRpbWVvdXQocmVzVGltZW91dCk7XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJlc29sdmUoQnVmZmVyLmNvbmNhdChhY2N1bSwgYWNjdW1CeXRlcykpO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdC8vIGhhbmRsZSBzdHJlYW1zIHRoYXQgaGF2ZSBhY2N1bXVsYXRlZCB0b28gbXVjaCBkYXRhIChpc3N1ZSAjNDE0KVxuXHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYENvdWxkIG5vdCBjcmVhdGUgQnVmZmVyIGZyb20gcmVzcG9uc2UgYm9keSBmb3IgJHtfdGhpczQudXJsfTogJHtlcnIubWVzc2FnZX1gLCAnc3lzdGVtJywgZXJyKSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xufVxuXG4vKipcbiAqIERldGVjdCBidWZmZXIgZW5jb2RpbmcgYW5kIGNvbnZlcnQgdG8gdGFyZ2V0IGVuY29kaW5nXG4gKiByZWY6IGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvV0QtaHRtbDUtMjAxMTAxMTMvcGFyc2luZy5odG1sI2RldGVybWluaW5nLXRoZS1jaGFyYWN0ZXItZW5jb2RpbmdcbiAqXG4gKiBAcGFyYW0gICBCdWZmZXIgIGJ1ZmZlciAgICBJbmNvbWluZyBidWZmZXJcbiAqIEBwYXJhbSAgIFN0cmluZyAgZW5jb2RpbmcgIFRhcmdldCBlbmNvZGluZ1xuICogQHJldHVybiAgU3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRCb2R5KGJ1ZmZlciwgaGVhZGVycykge1xuXHRpZiAodHlwZW9mIGNvbnZlcnQgIT09ICdmdW5jdGlvbicpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBwYWNrYWdlIGBlbmNvZGluZ2AgbXVzdCBiZSBpbnN0YWxsZWQgdG8gdXNlIHRoZSB0ZXh0Q29udmVydGVkKCkgZnVuY3Rpb24nKTtcblx0fVxuXG5cdGNvbnN0IGN0ID0gaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpO1xuXHRsZXQgY2hhcnNldCA9ICd1dGYtOCc7XG5cdGxldCByZXMsIHN0cjtcblxuXHQvLyBoZWFkZXJcblx0aWYgKGN0KSB7XG5cdFx0cmVzID0gL2NoYXJzZXQ9KFteO10qKS9pLmV4ZWMoY3QpO1xuXHR9XG5cblx0Ly8gbm8gY2hhcnNldCBpbiBjb250ZW50IHR5cGUsIHBlZWsgYXQgcmVzcG9uc2UgYm9keSBmb3IgYXQgbW9zdCAxMDI0IGJ5dGVzXG5cdHN0ciA9IGJ1ZmZlci5zbGljZSgwLCAxMDI0KS50b1N0cmluZygpO1xuXG5cdC8vIGh0bWw1XG5cdGlmICghcmVzICYmIHN0cikge1xuXHRcdHJlcyA9IC88bWV0YS4rP2NoYXJzZXQ9KFsnXCJdKSguKz8pXFwxL2kuZXhlYyhzdHIpO1xuXHR9XG5cblx0Ly8gaHRtbDRcblx0aWYgKCFyZXMgJiYgc3RyKSB7XG5cdFx0cmVzID0gLzxtZXRhW1xcc10rP2h0dHAtZXF1aXY9KFsnXCJdKWNvbnRlbnQtdHlwZVxcMVtcXHNdKz9jb250ZW50PShbJ1wiXSkoLis/KVxcMi9pLmV4ZWMoc3RyKTtcblxuXHRcdGlmIChyZXMpIHtcblx0XHRcdHJlcyA9IC9jaGFyc2V0PSguKikvaS5leGVjKHJlcy5wb3AoKSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8geG1sXG5cdGlmICghcmVzICYmIHN0cikge1xuXHRcdHJlcyA9IC88XFw/eG1sLis/ZW5jb2Rpbmc9KFsnXCJdKSguKz8pXFwxL2kuZXhlYyhzdHIpO1xuXHR9XG5cblx0Ly8gZm91bmQgY2hhcnNldFxuXHRpZiAocmVzKSB7XG5cdFx0Y2hhcnNldCA9IHJlcy5wb3AoKTtcblxuXHRcdC8vIHByZXZlbnQgZGVjb2RlIGlzc3VlcyB3aGVuIHNpdGVzIHVzZSBpbmNvcnJlY3QgZW5jb2Rpbmdcblx0XHQvLyByZWY6IGh0dHBzOi8vaHNpdm9uZW4uZmkvZW5jb2RpbmctbWVudS9cblx0XHRpZiAoY2hhcnNldCA9PT0gJ2diMjMxMicgfHwgY2hhcnNldCA9PT0gJ2diaycpIHtcblx0XHRcdGNoYXJzZXQgPSAnZ2IxODAzMCc7XG5cdFx0fVxuXHR9XG5cblx0Ly8gdHVybiByYXcgYnVmZmVycyBpbnRvIGEgc2luZ2xlIHV0Zi04IGJ1ZmZlclxuXHRyZXR1cm4gY29udmVydChidWZmZXIsICdVVEYtOCcsIGNoYXJzZXQpLnRvU3RyaW5nKCk7XG59XG5cbi8qKlxuICogRGV0ZWN0IGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICogcmVmOiBodHRwczovL2dpdGh1Yi5jb20vYml0aW5uL25vZGUtZmV0Y2gvaXNzdWVzLzI5NiNpc3N1ZWNvbW1lbnQtMzA3NTk4MTQzXG4gKlxuICogQHBhcmFtICAgT2JqZWN0ICBvYmogICAgIE9iamVjdCB0byBkZXRlY3QgYnkgdHlwZSBvciBicmFuZFxuICogQHJldHVybiAgU3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKG9iaikge1xuXHQvLyBEdWNrLXR5cGluZyBhcyBhIG5lY2Vzc2FyeSBjb25kaXRpb24uXG5cdGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqLmFwcGVuZCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygb2JqLmRlbGV0ZSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygb2JqLmdldCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygb2JqLmdldEFsbCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygb2JqLmhhcyAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygb2JqLnNldCAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIEJyYW5kLWNoZWNraW5nIGFuZCBtb3JlIGR1Y2stdHlwaW5nIGFzIG9wdGlvbmFsIGNvbmRpdGlvbi5cblx0cmV0dXJuIG9iai5jb25zdHJ1Y3Rvci5uYW1lID09PSAnVVJMU2VhcmNoUGFyYW1zJyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgVVJMU2VhcmNoUGFyYW1zXScgfHwgdHlwZW9mIG9iai5zb3J0ID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGEgVzNDIGBCbG9iYCBvYmplY3QgKHdoaWNoIGBGaWxlYCBpbmhlcml0cyBmcm9tKVxuICogQHBhcmFtICB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0Jsb2Iob2JqKSB7XG5cdHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqLmFycmF5QnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmoudHlwZSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIG9iai5zdHJlYW0gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdzdHJpbmcnICYmIC9eKEJsb2J8RmlsZSkkLy50ZXN0KG9iai5jb25zdHJ1Y3Rvci5uYW1lKSAmJiAvXihCbG9ifEZpbGUpJC8udGVzdChvYmpbU3ltYm9sLnRvU3RyaW5nVGFnXSk7XG59XG5cbi8qKlxuICogQ2xvbmUgYm9keSBnaXZlbiBSZXMvUmVxIGluc3RhbmNlXG4gKlxuICogQHBhcmFtICAgTWl4ZWQgIGluc3RhbmNlICBSZXNwb25zZSBvciBSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcmV0dXJuICBNaXhlZFxuICovXG5mdW5jdGlvbiBjbG9uZShpbnN0YW5jZSkge1xuXHRsZXQgcDEsIHAyO1xuXHRsZXQgYm9keSA9IGluc3RhbmNlLmJvZHk7XG5cblx0Ly8gZG9uJ3QgYWxsb3cgY2xvbmluZyBhIHVzZWQgYm9keVxuXHRpZiAoaW5zdGFuY2UuYm9keVVzZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBjbG9uZSBib2R5IGFmdGVyIGl0IGlzIHVzZWQnKTtcblx0fVxuXG5cdC8vIGNoZWNrIHRoYXQgYm9keSBpcyBhIHN0cmVhbSBhbmQgbm90IGZvcm0tZGF0YSBvYmplY3Rcblx0Ly8gbm90ZTogd2UgY2FuJ3QgY2xvbmUgdGhlIGZvcm0tZGF0YSBvYmplY3Qgd2l0aG91dCBoYXZpbmcgaXQgYXMgYSBkZXBlbmRlbmN5XG5cdGlmIChib2R5IGluc3RhbmNlb2YgU3RyZWFtICYmIHR5cGVvZiBib2R5LmdldEJvdW5kYXJ5ICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0Ly8gdGVlIGluc3RhbmNlIGJvZHlcblx0XHRwMSA9IG5ldyBQYXNzVGhyb3VnaCgpO1xuXHRcdHAyID0gbmV3IFBhc3NUaHJvdWdoKCk7XG5cdFx0Ym9keS5waXBlKHAxKTtcblx0XHRib2R5LnBpcGUocDIpO1xuXHRcdC8vIHNldCBpbnN0YW5jZSBib2R5IHRvIHRlZWQgYm9keSBhbmQgcmV0dXJuIHRoZSBvdGhlciB0ZWVkIGJvZHlcblx0XHRpbnN0YW5jZVtJTlRFUk5BTFNdLmJvZHkgPSBwMTtcblx0XHRib2R5ID0gcDI7XG5cdH1cblxuXHRyZXR1cm4gYm9keTtcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyB0aGUgb3BlcmF0aW9uIFwiZXh0cmFjdCBhIGBDb250ZW50LVR5cGVgIHZhbHVlIGZyb20gfG9iamVjdHxcIiBhc1xuICogc3BlY2lmaWVkIGluIHRoZSBzcGVjaWZpY2F0aW9uOlxuICogaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2NvbmNlcHQtYm9keWluaXQtZXh0cmFjdFxuICpcbiAqIFRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGluc3RhbmNlLmJvZHkgaXMgcHJlc2VudC5cbiAqXG4gKiBAcGFyYW0gICBNaXhlZCAgaW5zdGFuY2UgIEFueSBvcHRpb25zLmJvZHkgaW5wdXRcbiAqL1xuZnVuY3Rpb24gZXh0cmFjdENvbnRlbnRUeXBlKGJvZHkpIHtcblx0aWYgKGJvZHkgPT09IG51bGwpIHtcblx0XHQvLyBib2R5IGlzIG51bGxcblx0XHRyZXR1cm4gbnVsbDtcblx0fSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcblx0XHQvLyBib2R5IGlzIHN0cmluZ1xuXHRcdHJldHVybiAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jztcblx0fSBlbHNlIGlmIChpc1VSTFNlYXJjaFBhcmFtcyhib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgYSBVUkxTZWFyY2hQYXJhbXNcblx0XHRyZXR1cm4gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04Jztcblx0fSBlbHNlIGlmIChpc0Jsb2IoYm9keSkpIHtcblx0XHQvLyBib2R5IGlzIGJsb2Jcblx0XHRyZXR1cm4gYm9keS50eXBlIHx8IG51bGw7XG5cdH0gZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBidWZmZXJcblx0XHRyZXR1cm4gbnVsbDtcblx0fSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYm9keSkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXScpIHtcblx0XHQvLyBib2R5IGlzIEFycmF5QnVmZmVyXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0gZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBBcnJheUJ1ZmZlclZpZXdcblx0XHRyZXR1cm4gbnVsbDtcblx0fSBlbHNlIGlmICh0eXBlb2YgYm9keS5nZXRCb3VuZGFyeSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdC8vIGRldGVjdCBmb3JtIGRhdGEgaW5wdXQgZnJvbSBmb3JtLWRhdGEgbW9kdWxlXG5cdFx0cmV0dXJuIGBtdWx0aXBhcnQvZm9ybS1kYXRhO2JvdW5kYXJ5PSR7Ym9keS5nZXRCb3VuZGFyeSgpfWA7XG5cdH0gZWxzZSBpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkge1xuXHRcdC8vIGJvZHkgaXMgc3RyZWFtXG5cdFx0Ly8gY2FuJ3QgcmVhbGx5IGRvIG11Y2ggYWJvdXQgdGhpc1xuXHRcdHJldHVybiBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdC8vIEJvZHkgY29uc3RydWN0b3IgZGVmYXVsdHMgb3RoZXIgdGhpbmdzIHRvIHN0cmluZ1xuXHRcdHJldHVybiAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jztcblx0fVxufVxuXG4vKipcbiAqIFRoZSBGZXRjaCBTdGFuZGFyZCB0cmVhdHMgdGhpcyBhcyBpZiBcInRvdGFsIGJ5dGVzXCIgaXMgYSBwcm9wZXJ0eSBvbiB0aGUgYm9keS5cbiAqIEZvciB1cywgd2UgaGF2ZSB0byBleHBsaWNpdGx5IGdldCBpdCB3aXRoIGEgZnVuY3Rpb24uXG4gKlxuICogcmVmOiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jY29uY2VwdC1ib2R5LXRvdGFsLWJ5dGVzXG4gKlxuICogQHBhcmFtICAgQm9keSAgICBpbnN0YW5jZSAgIEluc3RhbmNlIG9mIEJvZHlcbiAqIEByZXR1cm4gIE51bWJlcj8gICAgICAgICAgICBOdW1iZXIgb2YgYnl0ZXMsIG9yIG51bGwgaWYgbm90IHBvc3NpYmxlXG4gKi9cbmZ1bmN0aW9uIGdldFRvdGFsQnl0ZXMoaW5zdGFuY2UpIHtcblx0Y29uc3QgYm9keSA9IGluc3RhbmNlLmJvZHk7XG5cblxuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdC8vIGJvZHkgaXMgbnVsbFxuXHRcdHJldHVybiAwO1xuXHR9IGVsc2UgaWYgKGlzQmxvYihib2R5KSkge1xuXHRcdHJldHVybiBib2R5LnNpemU7XG5cdH0gZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBidWZmZXJcblx0XHRyZXR1cm4gYm9keS5sZW5ndGg7XG5cdH0gZWxzZSBpZiAoYm9keSAmJiB0eXBlb2YgYm9keS5nZXRMZW5ndGhTeW5jID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0Ly8gZGV0ZWN0IGZvcm0gZGF0YSBpbnB1dCBmcm9tIGZvcm0tZGF0YSBtb2R1bGVcblx0XHRpZiAoYm9keS5fbGVuZ3RoUmV0cmlldmVycyAmJiBib2R5Ll9sZW5ndGhSZXRyaWV2ZXJzLmxlbmd0aCA9PSAwIHx8IC8vIDEueFxuXHRcdGJvZHkuaGFzS25vd25MZW5ndGggJiYgYm9keS5oYXNLbm93bkxlbmd0aCgpKSB7XG5cdFx0XHQvLyAyLnhcblx0XHRcdHJldHVybiBib2R5LmdldExlbmd0aFN5bmMoKTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gYm9keSBpcyBzdHJlYW1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG4vKipcbiAqIFdyaXRlIGEgQm9keSB0byBhIE5vZGUuanMgV3JpdGFibGVTdHJlYW0gKGUuZy4gaHR0cC5SZXF1ZXN0KSBvYmplY3QuXG4gKlxuICogQHBhcmFtICAgQm9keSAgICBpbnN0YW5jZSAgIEluc3RhbmNlIG9mIEJvZHlcbiAqIEByZXR1cm4gIFZvaWRcbiAqL1xuZnVuY3Rpb24gd3JpdGVUb1N0cmVhbShkZXN0LCBpbnN0YW5jZSkge1xuXHRjb25zdCBib2R5ID0gaW5zdGFuY2UuYm9keTtcblxuXG5cdGlmIChib2R5ID09PSBudWxsKSB7XG5cdFx0Ly8gYm9keSBpcyBudWxsXG5cdFx0ZGVzdC5lbmQoKTtcblx0fSBlbHNlIGlmIChpc0Jsb2IoYm9keSkpIHtcblx0XHRib2R5LnN0cmVhbSgpLnBpcGUoZGVzdCk7XG5cdH0gZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBidWZmZXJcblx0XHRkZXN0LndyaXRlKGJvZHkpO1xuXHRcdGRlc3QuZW5kKCk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gYm9keSBpcyBzdHJlYW1cblx0XHRib2R5LnBpcGUoZGVzdCk7XG5cdH1cbn1cblxuLy8gZXhwb3NlIFByb21pc2VcbkJvZHkuUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xuXG4vKipcbiAqIGhlYWRlcnMuanNcbiAqXG4gKiBIZWFkZXJzIGNsYXNzIG9mZmVycyBjb252ZW5pZW50IGhlbHBlcnNcbiAqL1xuXG5jb25zdCBpbnZhbGlkVG9rZW5SZWdleCA9IC9bXlxcXl9gYS16QS1aXFwtMC05ISMkJSYnKisufH5dLztcbmNvbnN0IGludmFsaWRIZWFkZXJDaGFyUmVnZXggPSAvW15cXHRcXHgyMC1cXHg3ZVxceDgwLVxceGZmXS87XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTmFtZShuYW1lKSB7XG5cdG5hbWUgPSBgJHtuYW1lfWA7XG5cdGlmIChpbnZhbGlkVG9rZW5SZWdleC50ZXN0KG5hbWUpIHx8IG5hbWUgPT09ICcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgJHtuYW1lfSBpcyBub3QgYSBsZWdhbCBIVFRQIGhlYWRlciBuYW1lYCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVWYWx1ZSh2YWx1ZSkge1xuXHR2YWx1ZSA9IGAke3ZhbHVlfWA7XG5cdGlmIChpbnZhbGlkSGVhZGVyQ2hhclJlZ2V4LnRlc3QodmFsdWUpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgJHt2YWx1ZX0gaXMgbm90IGEgbGVnYWwgSFRUUCBoZWFkZXIgdmFsdWVgKTtcblx0fVxufVxuXG4vKipcbiAqIEZpbmQgdGhlIGtleSBpbiB0aGUgbWFwIG9iamVjdCBnaXZlbiBhIGhlYWRlciBuYW1lLlxuICpcbiAqIFJldHVybnMgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZC5cbiAqXG4gKiBAcGFyYW0gICBTdHJpbmcgIG5hbWUgIEhlYWRlciBuYW1lXG4gKiBAcmV0dXJuICBTdHJpbmd8VW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGZpbmQobWFwLCBuYW1lKSB7XG5cdG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cdGZvciAoY29uc3Qga2V5IGluIG1hcCkge1xuXHRcdGlmIChrZXkudG9Mb3dlckNhc2UoKSA9PT0gbmFtZSkge1xuXHRcdFx0cmV0dXJuIGtleTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuY29uc3QgTUFQID0gU3ltYm9sKCdtYXAnKTtcbmNsYXNzIEhlYWRlcnMge1xuXHQvKipcbiAgKiBIZWFkZXJzIGNsYXNzXG4gICpcbiAgKiBAcGFyYW0gICBPYmplY3QgIGhlYWRlcnMgIFJlc3BvbnNlIGhlYWRlcnNcbiAgKiBAcmV0dXJuICBWb2lkXG4gICovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGxldCBpbml0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQ7XG5cblx0XHR0aGlzW01BUF0gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5cdFx0aWYgKGluaXQgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG5cdFx0XHRjb25zdCByYXdIZWFkZXJzID0gaW5pdC5yYXcoKTtcblx0XHRcdGNvbnN0IGhlYWRlck5hbWVzID0gT2JqZWN0LmtleXMocmF3SGVhZGVycyk7XG5cblx0XHRcdGZvciAoY29uc3QgaGVhZGVyTmFtZSBvZiBoZWFkZXJOYW1lcykge1xuXHRcdFx0XHRmb3IgKGNvbnN0IHZhbHVlIG9mIHJhd0hlYWRlcnNbaGVhZGVyTmFtZV0pIHtcblx0XHRcdFx0XHR0aGlzLmFwcGVuZChoZWFkZXJOYW1lLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFdlIGRvbid0IHdvcnJ5IGFib3V0IGNvbnZlcnRpbmcgcHJvcCB0byBCeXRlU3RyaW5nIGhlcmUgYXMgYXBwZW5kKClcblx0XHQvLyB3aWxsIGhhbmRsZSBpdC5cblx0XHRpZiAoaW5pdCA9PSBudWxsKSA7IGVsc2UgaWYgKHR5cGVvZiBpbml0ID09PSAnb2JqZWN0Jykge1xuXHRcdFx0Y29uc3QgbWV0aG9kID0gaW5pdFtTeW1ib2wuaXRlcmF0b3JdO1xuXHRcdFx0aWYgKG1ldGhvZCAhPSBudWxsKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgbWV0aG9kICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignSGVhZGVyIHBhaXJzIG11c3QgYmUgaXRlcmFibGUnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHNlcXVlbmNlPHNlcXVlbmNlPEJ5dGVTdHJpbmc+PlxuXHRcdFx0XHQvLyBOb3RlOiBwZXIgc3BlYyB3ZSBoYXZlIHRvIGZpcnN0IGV4aGF1c3QgdGhlIGxpc3RzIHRoZW4gcHJvY2VzcyB0aGVtXG5cdFx0XHRcdGNvbnN0IHBhaXJzID0gW107XG5cdFx0XHRcdGZvciAoY29uc3QgcGFpciBvZiBpbml0KSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBwYWlyICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgcGFpcltTeW1ib2wuaXRlcmF0b3JdICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFYWNoIGhlYWRlciBwYWlyIG11c3QgYmUgaXRlcmFibGUnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cGFpcnMucHVzaChBcnJheS5mcm9tKHBhaXIpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAoY29uc3QgcGFpciBvZiBwYWlycykge1xuXHRcdFx0XHRcdGlmIChwYWlyLmxlbmd0aCAhPT0gMikge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRWFjaCBoZWFkZXIgcGFpciBtdXN0IGJlIGEgbmFtZS92YWx1ZSB0dXBsZScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLmFwcGVuZChwYWlyWzBdLCBwYWlyWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gcmVjb3JkPEJ5dGVTdHJpbmcsIEJ5dGVTdHJpbmc+XG5cdFx0XHRcdGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGluaXQpKSB7XG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSBpbml0W2tleV07XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignUHJvdmlkZWQgaW5pdGlhbGl6ZXIgbXVzdCBiZSBhbiBvYmplY3QnKTtcblx0XHR9XG5cdH1cblxuXHQvKipcbiAgKiBSZXR1cm4gY29tYmluZWQgaGVhZGVyIHZhbHVlIGdpdmVuIG5hbWVcbiAgKlxuICAqIEBwYXJhbSAgIFN0cmluZyAgbmFtZSAgSGVhZGVyIG5hbWVcbiAgKiBAcmV0dXJuICBNaXhlZFxuICAqL1xuXHRnZXQobmFtZSkge1xuXHRcdG5hbWUgPSBgJHtuYW1lfWA7XG5cdFx0dmFsaWRhdGVOYW1lKG5hbWUpO1xuXHRcdGNvbnN0IGtleSA9IGZpbmQodGhpc1tNQVBdLCBuYW1lKTtcblx0XHRpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzW01BUF1ba2V5XS5qb2luKCcsICcpO1xuXHR9XG5cblx0LyoqXG4gICogSXRlcmF0ZSBvdmVyIGFsbCBoZWFkZXJzXG4gICpcbiAgKiBAcGFyYW0gICBGdW5jdGlvbiAgY2FsbGJhY2sgIEV4ZWN1dGVkIGZvciBlYWNoIGl0ZW0gd2l0aCBwYXJhbWV0ZXJzICh2YWx1ZSwgbmFtZSwgdGhpc0FyZylcbiAgKiBAcGFyYW0gICBCb29sZWFuICAgdGhpc0FyZyAgIGB0aGlzYCBjb250ZXh0IGZvciBjYWxsYmFjayBmdW5jdGlvblxuICAqIEByZXR1cm4gIFZvaWRcbiAgKi9cblx0Zm9yRWFjaChjYWxsYmFjaykge1xuXHRcdGxldCB0aGlzQXJnID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG5cblx0XHRsZXQgcGFpcnMgPSBnZXRIZWFkZXJzKHRoaXMpO1xuXHRcdGxldCBpID0gMDtcblx0XHR3aGlsZSAoaSA8IHBhaXJzLmxlbmd0aCkge1xuXHRcdFx0dmFyIF9wYWlycyRpID0gcGFpcnNbaV07XG5cdFx0XHRjb25zdCBuYW1lID0gX3BhaXJzJGlbMF0sXG5cdFx0XHQgICAgICB2YWx1ZSA9IF9wYWlycyRpWzFdO1xuXG5cdFx0XHRjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHZhbHVlLCBuYW1lLCB0aGlzKTtcblx0XHRcdHBhaXJzID0gZ2V0SGVhZGVycyh0aGlzKTtcblx0XHRcdGkrKztcblx0XHR9XG5cdH1cblxuXHQvKipcbiAgKiBPdmVyd3JpdGUgaGVhZGVyIHZhbHVlcyBnaXZlbiBuYW1lXG4gICpcbiAgKiBAcGFyYW0gICBTdHJpbmcgIG5hbWUgICBIZWFkZXIgbmFtZVxuICAqIEBwYXJhbSAgIFN0cmluZyAgdmFsdWUgIEhlYWRlciB2YWx1ZVxuICAqIEByZXR1cm4gIFZvaWRcbiAgKi9cblx0c2V0KG5hbWUsIHZhbHVlKSB7XG5cdFx0bmFtZSA9IGAke25hbWV9YDtcblx0XHR2YWx1ZSA9IGAke3ZhbHVlfWA7XG5cdFx0dmFsaWRhdGVOYW1lKG5hbWUpO1xuXHRcdHZhbGlkYXRlVmFsdWUodmFsdWUpO1xuXHRcdGNvbnN0IGtleSA9IGZpbmQodGhpc1tNQVBdLCBuYW1lKTtcblx0XHR0aGlzW01BUF1ba2V5ICE9PSB1bmRlZmluZWQgPyBrZXkgOiBuYW1lXSA9IFt2YWx1ZV07XG5cdH1cblxuXHQvKipcbiAgKiBBcHBlbmQgYSB2YWx1ZSBvbnRvIGV4aXN0aW5nIGhlYWRlclxuICAqXG4gICogQHBhcmFtICAgU3RyaW5nICBuYW1lICAgSGVhZGVyIG5hbWVcbiAgKiBAcGFyYW0gICBTdHJpbmcgIHZhbHVlICBIZWFkZXIgdmFsdWVcbiAgKiBAcmV0dXJuICBWb2lkXG4gICovXG5cdGFwcGVuZChuYW1lLCB2YWx1ZSkge1xuXHRcdG5hbWUgPSBgJHtuYW1lfWA7XG5cdFx0dmFsdWUgPSBgJHt2YWx1ZX1gO1xuXHRcdHZhbGlkYXRlTmFtZShuYW1lKTtcblx0XHR2YWxpZGF0ZVZhbHVlKHZhbHVlKTtcblx0XHRjb25zdCBrZXkgPSBmaW5kKHRoaXNbTUFQXSwgbmFtZSk7XG5cdFx0aWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzW01BUF1ba2V5XS5wdXNoKHZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpc1tNQVBdW25hbWVdID0gW3ZhbHVlXTtcblx0XHR9XG5cdH1cblxuXHQvKipcbiAgKiBDaGVjayBmb3IgaGVhZGVyIG5hbWUgZXhpc3RlbmNlXG4gICpcbiAgKiBAcGFyYW0gICBTdHJpbmcgICBuYW1lICBIZWFkZXIgbmFtZVxuICAqIEByZXR1cm4gIEJvb2xlYW5cbiAgKi9cblx0aGFzKG5hbWUpIHtcblx0XHRuYW1lID0gYCR7bmFtZX1gO1xuXHRcdHZhbGlkYXRlTmFtZShuYW1lKTtcblx0XHRyZXR1cm4gZmluZCh0aGlzW01BUF0sIG5hbWUpICE9PSB1bmRlZmluZWQ7XG5cdH1cblxuXHQvKipcbiAgKiBEZWxldGUgYWxsIGhlYWRlciB2YWx1ZXMgZ2l2ZW4gbmFtZVxuICAqXG4gICogQHBhcmFtICAgU3RyaW5nICBuYW1lICBIZWFkZXIgbmFtZVxuICAqIEByZXR1cm4gIFZvaWRcbiAgKi9cblx0ZGVsZXRlKG5hbWUpIHtcblx0XHRuYW1lID0gYCR7bmFtZX1gO1xuXHRcdHZhbGlkYXRlTmFtZShuYW1lKTtcblx0XHRjb25zdCBrZXkgPSBmaW5kKHRoaXNbTUFQXSwgbmFtZSk7XG5cdFx0aWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRkZWxldGUgdGhpc1tNQVBdW2tleV07XG5cdFx0fVxuXHR9XG5cblx0LyoqXG4gICogUmV0dXJuIHJhdyBoZWFkZXJzIChub24tc3BlYyBhcGkpXG4gICpcbiAgKiBAcmV0dXJuICBPYmplY3RcbiAgKi9cblx0cmF3KCkge1xuXHRcdHJldHVybiB0aGlzW01BUF07XG5cdH1cblxuXHQvKipcbiAgKiBHZXQgYW4gaXRlcmF0b3Igb24ga2V5cy5cbiAgKlxuICAqIEByZXR1cm4gIEl0ZXJhdG9yXG4gICovXG5cdGtleXMoKSB7XG5cdFx0cmV0dXJuIGNyZWF0ZUhlYWRlcnNJdGVyYXRvcih0aGlzLCAna2V5Jyk7XG5cdH1cblxuXHQvKipcbiAgKiBHZXQgYW4gaXRlcmF0b3Igb24gdmFsdWVzLlxuICAqXG4gICogQHJldHVybiAgSXRlcmF0b3JcbiAgKi9cblx0dmFsdWVzKCkge1xuXHRcdHJldHVybiBjcmVhdGVIZWFkZXJzSXRlcmF0b3IodGhpcywgJ3ZhbHVlJyk7XG5cdH1cblxuXHQvKipcbiAgKiBHZXQgYW4gaXRlcmF0b3Igb24gZW50cmllcy5cbiAgKlxuICAqIFRoaXMgaXMgdGhlIGRlZmF1bHQgaXRlcmF0b3Igb2YgdGhlIEhlYWRlcnMgb2JqZWN0LlxuICAqXG4gICogQHJldHVybiAgSXRlcmF0b3JcbiAgKi9cblx0W1N5bWJvbC5pdGVyYXRvcl0oKSB7XG5cdFx0cmV0dXJuIGNyZWF0ZUhlYWRlcnNJdGVyYXRvcih0aGlzLCAna2V5K3ZhbHVlJyk7XG5cdH1cbn1cbkhlYWRlcnMucHJvdG90eXBlLmVudHJpZXMgPSBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoSGVhZGVycy5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuXHR2YWx1ZTogJ0hlYWRlcnMnLFxuXHR3cml0YWJsZTogZmFsc2UsXG5cdGVudW1lcmFibGU6IGZhbHNlLFxuXHRjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhIZWFkZXJzLnByb3RvdHlwZSwge1xuXHRnZXQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRmb3JFYWNoOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0c2V0OiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0YXBwZW5kOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0aGFzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0ZGVsZXRlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0a2V5czogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHZhbHVlczogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGVudHJpZXM6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcblxuZnVuY3Rpb24gZ2V0SGVhZGVycyhoZWFkZXJzKSB7XG5cdGxldCBraW5kID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAna2V5K3ZhbHVlJztcblxuXHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoaGVhZGVyc1tNQVBdKS5zb3J0KCk7XG5cdHJldHVybiBrZXlzLm1hcChraW5kID09PSAna2V5JyA/IGZ1bmN0aW9uIChrKSB7XG5cdFx0cmV0dXJuIGsudG9Mb3dlckNhc2UoKTtcblx0fSA6IGtpbmQgPT09ICd2YWx1ZScgPyBmdW5jdGlvbiAoaykge1xuXHRcdHJldHVybiBoZWFkZXJzW01BUF1ba10uam9pbignLCAnKTtcblx0fSA6IGZ1bmN0aW9uIChrKSB7XG5cdFx0cmV0dXJuIFtrLnRvTG93ZXJDYXNlKCksIGhlYWRlcnNbTUFQXVtrXS5qb2luKCcsICcpXTtcblx0fSk7XG59XG5cbmNvbnN0IElOVEVSTkFMID0gU3ltYm9sKCdpbnRlcm5hbCcpO1xuXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXJzSXRlcmF0b3IodGFyZ2V0LCBraW5kKSB7XG5cdGNvbnN0IGl0ZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShIZWFkZXJzSXRlcmF0b3JQcm90b3R5cGUpO1xuXHRpdGVyYXRvcltJTlRFUk5BTF0gPSB7XG5cdFx0dGFyZ2V0LFxuXHRcdGtpbmQsXG5cdFx0aW5kZXg6IDBcblx0fTtcblx0cmV0dXJuIGl0ZXJhdG9yO1xufVxuXG5jb25zdCBIZWFkZXJzSXRlcmF0b3JQcm90b3R5cGUgPSBPYmplY3Quc2V0UHJvdG90eXBlT2Yoe1xuXHRuZXh0KCkge1xuXHRcdC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuXHRcdGlmICghdGhpcyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykgIT09IEhlYWRlcnNJdGVyYXRvclByb3RvdHlwZSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgb2YgYHRoaXNgIGlzIG5vdCBhIEhlYWRlcnNJdGVyYXRvcicpO1xuXHRcdH1cblxuXHRcdHZhciBfSU5URVJOQUwgPSB0aGlzW0lOVEVSTkFMXTtcblx0XHRjb25zdCB0YXJnZXQgPSBfSU5URVJOQUwudGFyZ2V0LFxuXHRcdCAgICAgIGtpbmQgPSBfSU5URVJOQUwua2luZCxcblx0XHQgICAgICBpbmRleCA9IF9JTlRFUk5BTC5pbmRleDtcblxuXHRcdGNvbnN0IHZhbHVlcyA9IGdldEhlYWRlcnModGFyZ2V0LCBraW5kKTtcblx0XHRjb25zdCBsZW4gPSB2YWx1ZXMubGVuZ3RoO1xuXHRcdGlmIChpbmRleCA+PSBsZW4pIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHZhbHVlOiB1bmRlZmluZWQsXG5cdFx0XHRcdGRvbmU6IHRydWVcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0dGhpc1tJTlRFUk5BTF0uaW5kZXggPSBpbmRleCArIDE7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWU6IHZhbHVlc1tpbmRleF0sXG5cdFx0XHRkb25lOiBmYWxzZVxuXHRcdH07XG5cdH1cbn0sIE9iamVjdC5nZXRQcm90b3R5cGVPZihPYmplY3QuZ2V0UHJvdG90eXBlT2YoW11bU3ltYm9sLml0ZXJhdG9yXSgpKSkpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoSGVhZGVyc0l0ZXJhdG9yUHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcblx0dmFsdWU6ICdIZWFkZXJzSXRlcmF0b3InLFxuXHR3cml0YWJsZTogZmFsc2UsXG5cdGVudW1lcmFibGU6IGZhbHNlLFxuXHRjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG4vKipcbiAqIEV4cG9ydCB0aGUgSGVhZGVycyBvYmplY3QgaW4gYSBmb3JtIHRoYXQgTm9kZS5qcyBjYW4gY29uc3VtZS5cbiAqXG4gKiBAcGFyYW0gICBIZWFkZXJzICBoZWFkZXJzXG4gKiBAcmV0dXJuICBPYmplY3RcbiAqL1xuZnVuY3Rpb24gZXhwb3J0Tm9kZUNvbXBhdGlibGVIZWFkZXJzKGhlYWRlcnMpIHtcblx0Y29uc3Qgb2JqID0gT2JqZWN0LmFzc2lnbih7IF9fcHJvdG9fXzogbnVsbCB9LCBoZWFkZXJzW01BUF0pO1xuXG5cdC8vIGh0dHAucmVxdWVzdCgpIG9ubHkgc3VwcG9ydHMgc3RyaW5nIGFzIEhvc3QgaGVhZGVyLiBUaGlzIGhhY2sgbWFrZXNcblx0Ly8gc3BlY2lmeWluZyBjdXN0b20gSG9zdCBoZWFkZXIgcG9zc2libGUuXG5cdGNvbnN0IGhvc3RIZWFkZXJLZXkgPSBmaW5kKGhlYWRlcnNbTUFQXSwgJ0hvc3QnKTtcblx0aWYgKGhvc3RIZWFkZXJLZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdG9ialtob3N0SGVhZGVyS2V5XSA9IG9ialtob3N0SGVhZGVyS2V5XVswXTtcblx0fVxuXG5cdHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgSGVhZGVycyBvYmplY3QgZnJvbSBhbiBvYmplY3Qgb2YgaGVhZGVycywgaWdub3JpbmcgdGhvc2UgdGhhdCBkb1xuICogbm90IGNvbmZvcm0gdG8gSFRUUCBncmFtbWFyIHByb2R1Y3Rpb25zLlxuICpcbiAqIEBwYXJhbSAgIE9iamVjdCAgb2JqICBPYmplY3Qgb2YgaGVhZGVyc1xuICogQHJldHVybiAgSGVhZGVyc1xuICovXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXJzTGVuaWVudChvYmopIHtcblx0Y29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG5cdGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3Qua2V5cyhvYmopKSB7XG5cdFx0aWYgKGludmFsaWRUb2tlblJlZ2V4LnRlc3QobmFtZSkpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblx0XHRpZiAoQXJyYXkuaXNBcnJheShvYmpbbmFtZV0pKSB7XG5cdFx0XHRmb3IgKGNvbnN0IHZhbCBvZiBvYmpbbmFtZV0pIHtcblx0XHRcdFx0aWYgKGludmFsaWRIZWFkZXJDaGFyUmVnZXgudGVzdCh2YWwpKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGhlYWRlcnNbTUFQXVtuYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0aGVhZGVyc1tNQVBdW25hbWVdID0gW3ZhbF07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aGVhZGVyc1tNQVBdW25hbWVdLnB1c2godmFsKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoIWludmFsaWRIZWFkZXJDaGFyUmVnZXgudGVzdChvYmpbbmFtZV0pKSB7XG5cdFx0XHRoZWFkZXJzW01BUF1bbmFtZV0gPSBbb2JqW25hbWVdXTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGhlYWRlcnM7XG59XG5cbmNvbnN0IElOVEVSTkFMUyQxID0gU3ltYm9sKCdSZXNwb25zZSBpbnRlcm5hbHMnKTtcblxuLy8gZml4IGFuIGlzc3VlIHdoZXJlIFwiU1RBVFVTX0NPREVTXCIgYXJlbid0IGEgbmFtZWQgZXhwb3J0IGZvciBub2RlIDwxMFxuY29uc3QgU1RBVFVTX0NPREVTID0gaHR0cC5TVEFUVVNfQ09ERVM7XG5cbi8qKlxuICogUmVzcG9uc2UgY2xhc3NcbiAqXG4gKiBAcGFyYW0gICBTdHJlYW0gIGJvZHkgIFJlYWRhYmxlIHN0cmVhbVxuICogQHBhcmFtICAgT2JqZWN0ICBvcHRzICBSZXNwb25zZSBvcHRpb25zXG4gKiBAcmV0dXJuICBWb2lkXG4gKi9cbmNsYXNzIFJlc3BvbnNlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0bGV0IGJvZHkgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IG51bGw7XG5cdFx0bGV0IG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG5cdFx0Qm9keS5jYWxsKHRoaXMsIGJvZHksIG9wdHMpO1xuXG5cdFx0Y29uc3Qgc3RhdHVzID0gb3B0cy5zdGF0dXMgfHwgMjAwO1xuXHRcdGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRzLmhlYWRlcnMpO1xuXG5cdFx0aWYgKGJvZHkgIT0gbnVsbCAmJiAhaGVhZGVycy5oYXMoJ0NvbnRlbnQtVHlwZScpKSB7XG5cdFx0XHRjb25zdCBjb250ZW50VHlwZSA9IGV4dHJhY3RDb250ZW50VHlwZShib2R5KTtcblx0XHRcdGlmIChjb250ZW50VHlwZSkge1xuXHRcdFx0XHRoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgY29udGVudFR5cGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXNbSU5URVJOQUxTJDFdID0ge1xuXHRcdFx0dXJsOiBvcHRzLnVybCxcblx0XHRcdHN0YXR1cyxcblx0XHRcdHN0YXR1c1RleHQ6IG9wdHMuc3RhdHVzVGV4dCB8fCBTVEFUVVNfQ09ERVNbc3RhdHVzXSxcblx0XHRcdGhlYWRlcnMsXG5cdFx0XHRjb3VudGVyOiBvcHRzLmNvdW50ZXJcblx0XHR9O1xuXHR9XG5cblx0Z2V0IHVybCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0udXJsIHx8ICcnO1xuXHR9XG5cblx0Z2V0IHN0YXR1cygpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uc3RhdHVzO1xuXHR9XG5cblx0LyoqXG4gICogQ29udmVuaWVuY2UgcHJvcGVydHkgcmVwcmVzZW50aW5nIGlmIHRoZSByZXF1ZXN0IGVuZGVkIG5vcm1hbGx5XG4gICovXG5cdGdldCBvaygpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uc3RhdHVzID49IDIwMCAmJiB0aGlzW0lOVEVSTkFMUyQxXS5zdGF0dXMgPCAzMDA7XG5cdH1cblxuXHRnZXQgcmVkaXJlY3RlZCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uY291bnRlciA+IDA7XG5cdH1cblxuXHRnZXQgc3RhdHVzVGV4dCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uc3RhdHVzVGV4dDtcblx0fVxuXG5cdGdldCBoZWFkZXJzKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS5oZWFkZXJzO1xuXHR9XG5cblx0LyoqXG4gICogQ2xvbmUgdGhpcyByZXNwb25zZVxuICAqXG4gICogQHJldHVybiAgUmVzcG9uc2VcbiAgKi9cblx0Y2xvbmUoKSB7XG5cdFx0cmV0dXJuIG5ldyBSZXNwb25zZShjbG9uZSh0aGlzKSwge1xuXHRcdFx0dXJsOiB0aGlzLnVybCxcblx0XHRcdHN0YXR1czogdGhpcy5zdGF0dXMsXG5cdFx0XHRzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG5cdFx0XHRoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG5cdFx0XHRvazogdGhpcy5vayxcblx0XHRcdHJlZGlyZWN0ZWQ6IHRoaXMucmVkaXJlY3RlZFxuXHRcdH0pO1xuXHR9XG59XG5cbkJvZHkubWl4SW4oUmVzcG9uc2UucHJvdG90eXBlKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUmVzcG9uc2UucHJvdG90eXBlLCB7XG5cdHVybDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHN0YXR1czogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdG9rOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0cmVkaXJlY3RlZDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHN0YXR1c1RleHQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRoZWFkZXJzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0Y2xvbmU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlc3BvbnNlLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG5cdHZhbHVlOiAnUmVzcG9uc2UnLFxuXHR3cml0YWJsZTogZmFsc2UsXG5cdGVudW1lcmFibGU6IGZhbHNlLFxuXHRjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG5jb25zdCBJTlRFUk5BTFMkMiA9IFN5bWJvbCgnUmVxdWVzdCBpbnRlcm5hbHMnKTtcblxuLy8gZml4IGFuIGlzc3VlIHdoZXJlIFwiZm9ybWF0XCIsIFwicGFyc2VcIiBhcmVuJ3QgYSBuYW1lZCBleHBvcnQgZm9yIG5vZGUgPDEwXG5jb25zdCBwYXJzZV91cmwgPSBVcmwucGFyc2U7XG5jb25zdCBmb3JtYXRfdXJsID0gVXJsLmZvcm1hdDtcblxuY29uc3Qgc3RyZWFtRGVzdHJ1Y3Rpb25TdXBwb3J0ZWQgPSAnZGVzdHJveScgaW4gU3RyZWFtLlJlYWRhYmxlLnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVjayBpZiBhIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIFJlcXVlc3QuXG4gKlxuICogQHBhcmFtICAgTWl4ZWQgICBpbnB1dFxuICogQHJldHVybiAgQm9vbGVhblxuICovXG5mdW5jdGlvbiBpc1JlcXVlc3QoaW5wdXQpIHtcblx0cmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGlucHV0W0lOVEVSTkFMUyQyXSA9PT0gJ29iamVjdCc7XG59XG5cbmZ1bmN0aW9uIGlzQWJvcnRTaWduYWwoc2lnbmFsKSB7XG5cdGNvbnN0IHByb3RvID0gc2lnbmFsICYmIHR5cGVvZiBzaWduYWwgPT09ICdvYmplY3QnICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihzaWduYWwpO1xuXHRyZXR1cm4gISEocHJvdG8gJiYgcHJvdG8uY29uc3RydWN0b3IubmFtZSA9PT0gJ0Fib3J0U2lnbmFsJyk7XG59XG5cbi8qKlxuICogUmVxdWVzdCBjbGFzc1xuICpcbiAqIEBwYXJhbSAgIE1peGVkICAgaW5wdXQgIFVybCBvciBSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcGFyYW0gICBPYmplY3QgIGluaXQgICBDdXN0b20gb3B0aW9uc1xuICogQHJldHVybiAgVm9pZFxuICovXG5jbGFzcyBSZXF1ZXN0IHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRsZXQgaW5pdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cblx0XHRsZXQgcGFyc2VkVVJMO1xuXG5cdFx0Ly8gbm9ybWFsaXplIGlucHV0XG5cdFx0aWYgKCFpc1JlcXVlc3QoaW5wdXQpKSB7XG5cdFx0XHRpZiAoaW5wdXQgJiYgaW5wdXQuaHJlZikge1xuXHRcdFx0XHQvLyBpbiBvcmRlciB0byBzdXBwb3J0IE5vZGUuanMnIFVybCBvYmplY3RzOyB0aG91Z2ggV0hBVFdHJ3MgVVJMIG9iamVjdHNcblx0XHRcdFx0Ly8gd2lsbCBmYWxsIGludG8gdGhpcyBicmFuY2ggYWxzbyAoc2luY2UgdGhlaXIgYHRvU3RyaW5nKClgIHdpbGwgcmV0dXJuXG5cdFx0XHRcdC8vIGBocmVmYCBwcm9wZXJ0eSBhbnl3YXkpXG5cdFx0XHRcdHBhcnNlZFVSTCA9IHBhcnNlX3VybChpbnB1dC5ocmVmKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGNvZXJjZSBpbnB1dCB0byBhIHN0cmluZyBiZWZvcmUgYXR0ZW1wdGluZyB0byBwYXJzZVxuXHRcdFx0XHRwYXJzZWRVUkwgPSBwYXJzZV91cmwoYCR7aW5wdXR9YCk7XG5cdFx0XHR9XG5cdFx0XHRpbnB1dCA9IHt9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXJzZWRVUkwgPSBwYXJzZV91cmwoaW5wdXQudXJsKTtcblx0XHR9XG5cblx0XHRsZXQgbWV0aG9kID0gaW5pdC5tZXRob2QgfHwgaW5wdXQubWV0aG9kIHx8ICdHRVQnO1xuXHRcdG1ldGhvZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpO1xuXG5cdFx0aWYgKChpbml0LmJvZHkgIT0gbnVsbCB8fCBpc1JlcXVlc3QoaW5wdXQpICYmIGlucHV0LmJvZHkgIT09IG51bGwpICYmIChtZXRob2QgPT09ICdHRVQnIHx8IG1ldGhvZCA9PT0gJ0hFQUQnKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignUmVxdWVzdCB3aXRoIEdFVC9IRUFEIG1ldGhvZCBjYW5ub3QgaGF2ZSBib2R5Jyk7XG5cdFx0fVxuXG5cdFx0bGV0IGlucHV0Qm9keSA9IGluaXQuYm9keSAhPSBudWxsID8gaW5pdC5ib2R5IDogaXNSZXF1ZXN0KGlucHV0KSAmJiBpbnB1dC5ib2R5ICE9PSBudWxsID8gY2xvbmUoaW5wdXQpIDogbnVsbDtcblxuXHRcdEJvZHkuY2FsbCh0aGlzLCBpbnB1dEJvZHksIHtcblx0XHRcdHRpbWVvdXQ6IGluaXQudGltZW91dCB8fCBpbnB1dC50aW1lb3V0IHx8IDAsXG5cdFx0XHRzaXplOiBpbml0LnNpemUgfHwgaW5wdXQuc2l6ZSB8fCAwXG5cdFx0fSk7XG5cblx0XHRjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5pdC5oZWFkZXJzIHx8IGlucHV0LmhlYWRlcnMgfHwge30pO1xuXG5cdFx0aWYgKGlucHV0Qm9keSAhPSBudWxsICYmICFoZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJykpIHtcblx0XHRcdGNvbnN0IGNvbnRlbnRUeXBlID0gZXh0cmFjdENvbnRlbnRUeXBlKGlucHV0Qm9keSk7XG5cdFx0XHRpZiAoY29udGVudFR5cGUpIHtcblx0XHRcdFx0aGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsIGNvbnRlbnRUeXBlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRsZXQgc2lnbmFsID0gaXNSZXF1ZXN0KGlucHV0KSA/IGlucHV0LnNpZ25hbCA6IG51bGw7XG5cdFx0aWYgKCdzaWduYWwnIGluIGluaXQpIHNpZ25hbCA9IGluaXQuc2lnbmFsO1xuXG5cdFx0aWYgKHNpZ25hbCAhPSBudWxsICYmICFpc0Fib3J0U2lnbmFsKHNpZ25hbCkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHNpZ25hbCB0byBiZSBhbiBpbnN0YW5jZW9mIEFib3J0U2lnbmFsJyk7XG5cdFx0fVxuXG5cdFx0dGhpc1tJTlRFUk5BTFMkMl0gPSB7XG5cdFx0XHRtZXRob2QsXG5cdFx0XHRyZWRpcmVjdDogaW5pdC5yZWRpcmVjdCB8fCBpbnB1dC5yZWRpcmVjdCB8fCAnZm9sbG93Jyxcblx0XHRcdGhlYWRlcnMsXG5cdFx0XHRwYXJzZWRVUkwsXG5cdFx0XHRzaWduYWxcblx0XHR9O1xuXG5cdFx0Ly8gbm9kZS1mZXRjaC1vbmx5IG9wdGlvbnNcblx0XHR0aGlzLmZvbGxvdyA9IGluaXQuZm9sbG93ICE9PSB1bmRlZmluZWQgPyBpbml0LmZvbGxvdyA6IGlucHV0LmZvbGxvdyAhPT0gdW5kZWZpbmVkID8gaW5wdXQuZm9sbG93IDogMjA7XG5cdFx0dGhpcy5jb21wcmVzcyA9IGluaXQuY29tcHJlc3MgIT09IHVuZGVmaW5lZCA/IGluaXQuY29tcHJlc3MgOiBpbnB1dC5jb21wcmVzcyAhPT0gdW5kZWZpbmVkID8gaW5wdXQuY29tcHJlc3MgOiB0cnVlO1xuXHRcdHRoaXMuY291bnRlciA9IGluaXQuY291bnRlciB8fCBpbnB1dC5jb3VudGVyIHx8IDA7XG5cdFx0dGhpcy5hZ2VudCA9IGluaXQuYWdlbnQgfHwgaW5wdXQuYWdlbnQ7XG5cdH1cblxuXHRnZXQgbWV0aG9kKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQyXS5tZXRob2Q7XG5cdH1cblxuXHRnZXQgdXJsKCkge1xuXHRcdHJldHVybiBmb3JtYXRfdXJsKHRoaXNbSU5URVJOQUxTJDJdLnBhcnNlZFVSTCk7XG5cdH1cblxuXHRnZXQgaGVhZGVycygpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMl0uaGVhZGVycztcblx0fVxuXG5cdGdldCByZWRpcmVjdCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMl0ucmVkaXJlY3Q7XG5cdH1cblxuXHRnZXQgc2lnbmFsKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQyXS5zaWduYWw7XG5cdH1cblxuXHQvKipcbiAgKiBDbG9uZSB0aGlzIHJlcXVlc3RcbiAgKlxuICAqIEByZXR1cm4gIFJlcXVlc3RcbiAgKi9cblx0Y2xvbmUoKSB7XG5cdFx0cmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMpO1xuXHR9XG59XG5cbkJvZHkubWl4SW4oUmVxdWVzdC5wcm90b3R5cGUpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUmVxdWVzdC5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuXHR2YWx1ZTogJ1JlcXVlc3QnLFxuXHR3cml0YWJsZTogZmFsc2UsXG5cdGVudW1lcmFibGU6IGZhbHNlLFxuXHRjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZXF1ZXN0LnByb3RvdHlwZSwge1xuXHRtZXRob2Q6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHR1cmw6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRoZWFkZXJzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0cmVkaXJlY3Q6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRjbG9uZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHNpZ25hbDogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBSZXF1ZXN0IHRvIE5vZGUuanMgaHR0cCByZXF1ZXN0IG9wdGlvbnMuXG4gKlxuICogQHBhcmFtICAgUmVxdWVzdCAgQSBSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcmV0dXJuICBPYmplY3QgICBUaGUgb3B0aW9ucyBvYmplY3QgdG8gYmUgcGFzc2VkIHRvIGh0dHAucmVxdWVzdFxuICovXG5mdW5jdGlvbiBnZXROb2RlUmVxdWVzdE9wdGlvbnMocmVxdWVzdCkge1xuXHRjb25zdCBwYXJzZWRVUkwgPSByZXF1ZXN0W0lOVEVSTkFMUyQyXS5wYXJzZWRVUkw7XG5cdGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyhyZXF1ZXN0W0lOVEVSTkFMUyQyXS5oZWFkZXJzKTtcblxuXHQvLyBmZXRjaCBzdGVwIDEuM1xuXHRpZiAoIWhlYWRlcnMuaGFzKCdBY2NlcHQnKSkge1xuXHRcdGhlYWRlcnMuc2V0KCdBY2NlcHQnLCAnKi8qJyk7XG5cdH1cblxuXHQvLyBCYXNpYyBmZXRjaFxuXHRpZiAoIXBhcnNlZFVSTC5wcm90b2NvbCB8fCAhcGFyc2VkVVJMLmhvc3RuYW1lKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT25seSBhYnNvbHV0ZSBVUkxzIGFyZSBzdXBwb3J0ZWQnKTtcblx0fVxuXG5cdGlmICghL15odHRwcz86JC8udGVzdChwYXJzZWRVUkwucHJvdG9jb2wpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT25seSBIVFRQKFMpIHByb3RvY29scyBhcmUgc3VwcG9ydGVkJyk7XG5cdH1cblxuXHRpZiAocmVxdWVzdC5zaWduYWwgJiYgcmVxdWVzdC5ib2R5IGluc3RhbmNlb2YgU3RyZWFtLlJlYWRhYmxlICYmICFzdHJlYW1EZXN0cnVjdGlvblN1cHBvcnRlZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignQ2FuY2VsbGF0aW9uIG9mIHN0cmVhbWVkIHJlcXVlc3RzIHdpdGggQWJvcnRTaWduYWwgaXMgbm90IHN1cHBvcnRlZCBpbiBub2RlIDwgOCcpO1xuXHR9XG5cblx0Ly8gSFRUUC1uZXR3b3JrLW9yLWNhY2hlIGZldGNoIHN0ZXBzIDIuNC0yLjdcblx0bGV0IGNvbnRlbnRMZW5ndGhWYWx1ZSA9IG51bGw7XG5cdGlmIChyZXF1ZXN0LmJvZHkgPT0gbnVsbCAmJiAvXihQT1NUfFBVVCkkL2kudGVzdChyZXF1ZXN0Lm1ldGhvZCkpIHtcblx0XHRjb250ZW50TGVuZ3RoVmFsdWUgPSAnMCc7XG5cdH1cblx0aWYgKHJlcXVlc3QuYm9keSAhPSBudWxsKSB7XG5cdFx0Y29uc3QgdG90YWxCeXRlcyA9IGdldFRvdGFsQnl0ZXMocmVxdWVzdCk7XG5cdFx0aWYgKHR5cGVvZiB0b3RhbEJ5dGVzID09PSAnbnVtYmVyJykge1xuXHRcdFx0Y29udGVudExlbmd0aFZhbHVlID0gU3RyaW5nKHRvdGFsQnl0ZXMpO1xuXHRcdH1cblx0fVxuXHRpZiAoY29udGVudExlbmd0aFZhbHVlKSB7XG5cdFx0aGVhZGVycy5zZXQoJ0NvbnRlbnQtTGVuZ3RoJywgY29udGVudExlbmd0aFZhbHVlKTtcblx0fVxuXG5cdC8vIEhUVFAtbmV0d29yay1vci1jYWNoZSBmZXRjaCBzdGVwIDIuMTFcblx0aWYgKCFoZWFkZXJzLmhhcygnVXNlci1BZ2VudCcpKSB7XG5cdFx0aGVhZGVycy5zZXQoJ1VzZXItQWdlbnQnLCAnbm9kZS1mZXRjaC8xLjAgKCtodHRwczovL2dpdGh1Yi5jb20vYml0aW5uL25vZGUtZmV0Y2gpJyk7XG5cdH1cblxuXHQvLyBIVFRQLW5ldHdvcmstb3ItY2FjaGUgZmV0Y2ggc3RlcCAyLjE1XG5cdGlmIChyZXF1ZXN0LmNvbXByZXNzICYmICFoZWFkZXJzLmhhcygnQWNjZXB0LUVuY29kaW5nJykpIHtcblx0XHRoZWFkZXJzLnNldCgnQWNjZXB0LUVuY29kaW5nJywgJ2d6aXAsZGVmbGF0ZScpO1xuXHR9XG5cblx0bGV0IGFnZW50ID0gcmVxdWVzdC5hZ2VudDtcblx0aWYgKHR5cGVvZiBhZ2VudCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGFnZW50ID0gYWdlbnQocGFyc2VkVVJMKTtcblx0fVxuXG5cdGlmICghaGVhZGVycy5oYXMoJ0Nvbm5lY3Rpb24nKSAmJiAhYWdlbnQpIHtcblx0XHRoZWFkZXJzLnNldCgnQ29ubmVjdGlvbicsICdjbG9zZScpO1xuXHR9XG5cblx0Ly8gSFRUUC1uZXR3b3JrIGZldGNoIHN0ZXAgNC4yXG5cdC8vIGNodW5rZWQgZW5jb2RpbmcgaXMgaGFuZGxlZCBieSBOb2RlLmpzXG5cblx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHBhcnNlZFVSTCwge1xuXHRcdG1ldGhvZDogcmVxdWVzdC5tZXRob2QsXG5cdFx0aGVhZGVyczogZXhwb3J0Tm9kZUNvbXBhdGlibGVIZWFkZXJzKGhlYWRlcnMpLFxuXHRcdGFnZW50XG5cdH0pO1xufVxuXG4vKipcbiAqIGFib3J0LWVycm9yLmpzXG4gKlxuICogQWJvcnRFcnJvciBpbnRlcmZhY2UgZm9yIGNhbmNlbGxlZCByZXF1ZXN0c1xuICovXG5cbi8qKlxuICogQ3JlYXRlIEFib3J0RXJyb3IgaW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0gICBTdHJpbmcgICAgICBtZXNzYWdlICAgICAgRXJyb3IgbWVzc2FnZSBmb3IgaHVtYW5cbiAqIEByZXR1cm4gIEFib3J0RXJyb3JcbiAqL1xuZnVuY3Rpb24gQWJvcnRFcnJvcihtZXNzYWdlKSB7XG4gIEVycm9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgdGhpcy50eXBlID0gJ2Fib3J0ZWQnO1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXG4gIC8vIGhpZGUgY3VzdG9tIGVycm9yIGltcGxlbWVudGF0aW9uIGRldGFpbHMgZnJvbSBlbmQtdXNlcnNcbiAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG59XG5cbkFib3J0RXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuQWJvcnRFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBYm9ydEVycm9yO1xuQWJvcnRFcnJvci5wcm90b3R5cGUubmFtZSA9ICdBYm9ydEVycm9yJztcblxuLy8gZml4IGFuIGlzc3VlIHdoZXJlIFwiUGFzc1Rocm91Z2hcIiwgXCJyZXNvbHZlXCIgYXJlbid0IGEgbmFtZWQgZXhwb3J0IGZvciBub2RlIDwxMFxuY29uc3QgUGFzc1Rocm91Z2gkMSA9IFN0cmVhbS5QYXNzVGhyb3VnaDtcbmNvbnN0IHJlc29sdmVfdXJsID0gVXJsLnJlc29sdmU7XG5cbi8qKlxuICogRmV0Y2ggZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0gICBNaXhlZCAgICB1cmwgICBBYnNvbHV0ZSB1cmwgb3IgUmVxdWVzdCBpbnN0YW5jZVxuICogQHBhcmFtICAgT2JqZWN0ICAgb3B0cyAgRmV0Y2ggb3B0aW9uc1xuICogQHJldHVybiAgUHJvbWlzZVxuICovXG5mdW5jdGlvbiBmZXRjaCh1cmwsIG9wdHMpIHtcblxuXHQvLyBhbGxvdyBjdXN0b20gcHJvbWlzZVxuXHRpZiAoIWZldGNoLlByb21pc2UpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ25hdGl2ZSBwcm9taXNlIG1pc3NpbmcsIHNldCBmZXRjaC5Qcm9taXNlIHRvIHlvdXIgZmF2b3JpdGUgYWx0ZXJuYXRpdmUnKTtcblx0fVxuXG5cdEJvZHkuUHJvbWlzZSA9IGZldGNoLlByb21pc2U7XG5cblx0Ly8gd3JhcCBodHRwLnJlcXVlc3QgaW50byBmZXRjaFxuXHRyZXR1cm4gbmV3IGZldGNoLlByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdC8vIGJ1aWxkIHJlcXVlc3Qgb2JqZWN0XG5cdFx0Y29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwgb3B0cyk7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IGdldE5vZGVSZXF1ZXN0T3B0aW9ucyhyZXF1ZXN0KTtcblxuXHRcdGNvbnN0IHNlbmQgPSAob3B0aW9ucy5wcm90b2NvbCA9PT0gJ2h0dHBzOicgPyBodHRwcyA6IGh0dHApLnJlcXVlc3Q7XG5cdFx0Y29uc3Qgc2lnbmFsID0gcmVxdWVzdC5zaWduYWw7XG5cblx0XHRsZXQgcmVzcG9uc2UgPSBudWxsO1xuXG5cdFx0Y29uc3QgYWJvcnQgPSBmdW5jdGlvbiBhYm9ydCgpIHtcblx0XHRcdGxldCBlcnJvciA9IG5ldyBBYm9ydEVycm9yKCdUaGUgdXNlciBhYm9ydGVkIGEgcmVxdWVzdC4nKTtcblx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRpZiAocmVxdWVzdC5ib2R5ICYmIHJlcXVlc3QuYm9keSBpbnN0YW5jZW9mIFN0cmVhbS5SZWFkYWJsZSkge1xuXHRcdFx0XHRyZXF1ZXN0LmJvZHkuZGVzdHJveShlcnJvcik7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXJlc3BvbnNlIHx8ICFyZXNwb25zZS5ib2R5KSByZXR1cm47XG5cdFx0XHRyZXNwb25zZS5ib2R5LmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuXHRcdH07XG5cblx0XHRpZiAoc2lnbmFsICYmIHNpZ25hbC5hYm9ydGVkKSB7XG5cdFx0XHRhYm9ydCgpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGFib3J0QW5kRmluYWxpemUgPSBmdW5jdGlvbiBhYm9ydEFuZEZpbmFsaXplKCkge1xuXHRcdFx0YWJvcnQoKTtcblx0XHRcdGZpbmFsaXplKCk7XG5cdFx0fTtcblxuXHRcdC8vIHNlbmQgcmVxdWVzdFxuXHRcdGNvbnN0IHJlcSA9IHNlbmQob3B0aW9ucyk7XG5cdFx0bGV0IHJlcVRpbWVvdXQ7XG5cblx0XHRpZiAoc2lnbmFsKSB7XG5cdFx0XHRzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydEFuZEZpbmFsaXplKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBmaW5hbGl6ZSgpIHtcblx0XHRcdHJlcS5hYm9ydCgpO1xuXHRcdFx0aWYgKHNpZ25hbCkgc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbmRGaW5hbGl6ZSk7XG5cdFx0XHRjbGVhclRpbWVvdXQocmVxVGltZW91dCk7XG5cdFx0fVxuXG5cdFx0aWYgKHJlcXVlc3QudGltZW91dCkge1xuXHRcdFx0cmVxLm9uY2UoJ3NvY2tldCcsIGZ1bmN0aW9uIChzb2NrZXQpIHtcblx0XHRcdFx0cmVxVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgbmV0d29yayB0aW1lb3V0IGF0OiAke3JlcXVlc3QudXJsfWAsICdyZXF1ZXN0LXRpbWVvdXQnKSk7XG5cdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0fSwgcmVxdWVzdC50aW1lb3V0KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJlcS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYHJlcXVlc3QgdG8gJHtyZXF1ZXN0LnVybH0gZmFpbGVkLCByZWFzb246ICR7ZXJyLm1lc3NhZ2V9YCwgJ3N5c3RlbScsIGVycikpO1xuXHRcdFx0ZmluYWxpemUoKTtcblx0XHR9KTtcblxuXHRcdHJlcS5vbigncmVzcG9uc2UnLCBmdW5jdGlvbiAocmVzKSB7XG5cdFx0XHRjbGVhclRpbWVvdXQocmVxVGltZW91dCk7XG5cblx0XHRcdGNvbnN0IGhlYWRlcnMgPSBjcmVhdGVIZWFkZXJzTGVuaWVudChyZXMuaGVhZGVycyk7XG5cblx0XHRcdC8vIEhUVFAgZmV0Y2ggc3RlcCA1XG5cdFx0XHRpZiAoZmV0Y2guaXNSZWRpcmVjdChyZXMuc3RhdHVzQ29kZSkpIHtcblx0XHRcdFx0Ly8gSFRUUCBmZXRjaCBzdGVwIDUuMlxuXHRcdFx0XHRjb25zdCBsb2NhdGlvbiA9IGhlYWRlcnMuZ2V0KCdMb2NhdGlvbicpO1xuXG5cdFx0XHRcdC8vIEhUVFAgZmV0Y2ggc3RlcCA1LjNcblx0XHRcdFx0Y29uc3QgbG9jYXRpb25VUkwgPSBsb2NhdGlvbiA9PT0gbnVsbCA/IG51bGwgOiByZXNvbHZlX3VybChyZXF1ZXN0LnVybCwgbG9jYXRpb24pO1xuXG5cdFx0XHRcdC8vIEhUVFAgZmV0Y2ggc3RlcCA1LjVcblx0XHRcdFx0c3dpdGNoIChyZXF1ZXN0LnJlZGlyZWN0KSB7XG5cdFx0XHRcdFx0Y2FzZSAnZXJyb3InOlxuXHRcdFx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGByZWRpcmVjdCBtb2RlIGlzIHNldCB0byBlcnJvcjogJHtyZXF1ZXN0LnVybH1gLCAnbm8tcmVkaXJlY3QnKSk7XG5cdFx0XHRcdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdGNhc2UgJ21hbnVhbCc6XG5cdFx0XHRcdFx0XHQvLyBub2RlLWZldGNoLXNwZWNpZmljIHN0ZXA6IG1ha2UgbWFudWFsIHJlZGlyZWN0IGEgYml0IGVhc2llciB0byB1c2UgYnkgc2V0dGluZyB0aGUgTG9jYXRpb24gaGVhZGVyIHZhbHVlIHRvIHRoZSByZXNvbHZlZCBVUkwuXG5cdFx0XHRcdFx0XHRpZiAobG9jYXRpb25VUkwgIT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0Ly8gaGFuZGxlIGNvcnJ1cHRlZCBoZWFkZXJcblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRoZWFkZXJzLnNldCgnTG9jYXRpb24nLCBsb2NhdGlvblVSTCk7XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBub2RlanMgc2VydmVyIHByZXZlbnQgaW52YWxpZCByZXNwb25zZSBoZWFkZXJzLCB3ZSBjYW4ndCB0ZXN0IHRoaXMgdGhyb3VnaCBub3JtYWwgcmVxdWVzdFxuXHRcdFx0XHRcdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdmb2xsb3cnOlxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDJcblx0XHRcdFx0XHRcdGlmIChsb2NhdGlvblVSTCA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDVcblx0XHRcdFx0XHRcdGlmIChyZXF1ZXN0LmNvdW50ZXIgPj0gcmVxdWVzdC5mb2xsb3cpIHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBtYXhpbXVtIHJlZGlyZWN0IHJlYWNoZWQgYXQ6ICR7cmVxdWVzdC51cmx9YCwgJ21heC1yZWRpcmVjdCcpKTtcblx0XHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgNiAoY291bnRlciBpbmNyZW1lbnQpXG5cdFx0XHRcdFx0XHQvLyBDcmVhdGUgYSBuZXcgUmVxdWVzdCBvYmplY3QuXG5cdFx0XHRcdFx0XHRjb25zdCByZXF1ZXN0T3B0cyA9IHtcblx0XHRcdFx0XHRcdFx0aGVhZGVyczogbmV3IEhlYWRlcnMocmVxdWVzdC5oZWFkZXJzKSxcblx0XHRcdFx0XHRcdFx0Zm9sbG93OiByZXF1ZXN0LmZvbGxvdyxcblx0XHRcdFx0XHRcdFx0Y291bnRlcjogcmVxdWVzdC5jb3VudGVyICsgMSxcblx0XHRcdFx0XHRcdFx0YWdlbnQ6IHJlcXVlc3QuYWdlbnQsXG5cdFx0XHRcdFx0XHRcdGNvbXByZXNzOiByZXF1ZXN0LmNvbXByZXNzLFxuXHRcdFx0XHRcdFx0XHRtZXRob2Q6IHJlcXVlc3QubWV0aG9kLFxuXHRcdFx0XHRcdFx0XHRib2R5OiByZXF1ZXN0LmJvZHksXG5cdFx0XHRcdFx0XHRcdHNpZ25hbDogcmVxdWVzdC5zaWduYWwsXG5cdFx0XHRcdFx0XHRcdHRpbWVvdXQ6IHJlcXVlc3QudGltZW91dFxuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDlcblx0XHRcdFx0XHRcdGlmIChyZXMuc3RhdHVzQ29kZSAhPT0gMzAzICYmIHJlcXVlc3QuYm9keSAmJiBnZXRUb3RhbEJ5dGVzKHJlcXVlc3QpID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcignQ2Fubm90IGZvbGxvdyByZWRpcmVjdCB3aXRoIGJvZHkgYmVpbmcgYSByZWFkYWJsZSBzdHJlYW0nLCAndW5zdXBwb3J0ZWQtcmVkaXJlY3QnKSk7XG5cdFx0XHRcdFx0XHRcdGZpbmFsaXplKCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDExXG5cdFx0XHRcdFx0XHRpZiAocmVzLnN0YXR1c0NvZGUgPT09IDMwMyB8fCAocmVzLnN0YXR1c0NvZGUgPT09IDMwMSB8fCByZXMuc3RhdHVzQ29kZSA9PT0gMzAyKSAmJiByZXF1ZXN0Lm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RPcHRzLm1ldGhvZCA9ICdHRVQnO1xuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0T3B0cy5ib2R5ID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0T3B0cy5oZWFkZXJzLmRlbGV0ZSgnY29udGVudC1sZW5ndGgnKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDE1XG5cdFx0XHRcdFx0XHRyZXNvbHZlKGZldGNoKG5ldyBSZXF1ZXN0KGxvY2F0aW9uVVJMLCByZXF1ZXN0T3B0cykpKTtcblx0XHRcdFx0XHRcdGZpbmFsaXplKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gcHJlcGFyZSByZXNwb25zZVxuXHRcdFx0cmVzLm9uY2UoJ2VuZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKHNpZ25hbCkgc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbmRGaW5hbGl6ZSk7XG5cdFx0XHR9KTtcblx0XHRcdGxldCBib2R5ID0gcmVzLnBpcGUobmV3IFBhc3NUaHJvdWdoJDEoKSk7XG5cblx0XHRcdGNvbnN0IHJlc3BvbnNlX29wdGlvbnMgPSB7XG5cdFx0XHRcdHVybDogcmVxdWVzdC51cmwsXG5cdFx0XHRcdHN0YXR1czogcmVzLnN0YXR1c0NvZGUsXG5cdFx0XHRcdHN0YXR1c1RleHQ6IHJlcy5zdGF0dXNNZXNzYWdlLFxuXHRcdFx0XHRoZWFkZXJzOiBoZWFkZXJzLFxuXHRcdFx0XHRzaXplOiByZXF1ZXN0LnNpemUsXG5cdFx0XHRcdHRpbWVvdXQ6IHJlcXVlc3QudGltZW91dCxcblx0XHRcdFx0Y291bnRlcjogcmVxdWVzdC5jb3VudGVyXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBIVFRQLW5ldHdvcmsgZmV0Y2ggc3RlcCAxMi4xLjEuM1xuXHRcdFx0Y29uc3QgY29kaW5ncyA9IGhlYWRlcnMuZ2V0KCdDb250ZW50LUVuY29kaW5nJyk7XG5cblx0XHRcdC8vIEhUVFAtbmV0d29yayBmZXRjaCBzdGVwIDEyLjEuMS40OiBoYW5kbGUgY29udGVudCBjb2RpbmdzXG5cblx0XHRcdC8vIGluIGZvbGxvd2luZyBzY2VuYXJpb3Mgd2UgaWdub3JlIGNvbXByZXNzaW9uIHN1cHBvcnRcblx0XHRcdC8vIDEuIGNvbXByZXNzaW9uIHN1cHBvcnQgaXMgZGlzYWJsZWRcblx0XHRcdC8vIDIuIEhFQUQgcmVxdWVzdFxuXHRcdFx0Ly8gMy4gbm8gQ29udGVudC1FbmNvZGluZyBoZWFkZXJcblx0XHRcdC8vIDQuIG5vIGNvbnRlbnQgcmVzcG9uc2UgKDIwNClcblx0XHRcdC8vIDUuIGNvbnRlbnQgbm90IG1vZGlmaWVkIHJlc3BvbnNlICgzMDQpXG5cdFx0XHRpZiAoIXJlcXVlc3QuY29tcHJlc3MgfHwgcmVxdWVzdC5tZXRob2QgPT09ICdIRUFEJyB8fCBjb2RpbmdzID09PSBudWxsIHx8IHJlcy5zdGF0dXNDb2RlID09PSAyMDQgfHwgcmVzLnN0YXR1c0NvZGUgPT09IDMwNCkge1xuXHRcdFx0XHRyZXNwb25zZSA9IG5ldyBSZXNwb25zZShib2R5LCByZXNwb25zZV9vcHRpb25zKTtcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRm9yIE5vZGUgdjYrXG5cdFx0XHQvLyBCZSBsZXNzIHN0cmljdCB3aGVuIGRlY29kaW5nIGNvbXByZXNzZWQgcmVzcG9uc2VzLCBzaW5jZSBzb21ldGltZXNcblx0XHRcdC8vIHNlcnZlcnMgc2VuZCBzbGlnaHRseSBpbnZhbGlkIHJlc3BvbnNlcyB0aGF0IGFyZSBzdGlsbCBhY2NlcHRlZFxuXHRcdFx0Ly8gYnkgY29tbW9uIGJyb3dzZXJzLlxuXHRcdFx0Ly8gQWx3YXlzIHVzaW5nIFpfU1lOQ19GTFVTSCBpcyB3aGF0IGNVUkwgZG9lcy5cblx0XHRcdGNvbnN0IHpsaWJPcHRpb25zID0ge1xuXHRcdFx0XHRmbHVzaDogemxpYi5aX1NZTkNfRkxVU0gsXG5cdFx0XHRcdGZpbmlzaEZsdXNoOiB6bGliLlpfU1lOQ19GTFVTSFxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gZm9yIGd6aXBcblx0XHRcdGlmIChjb2RpbmdzID09ICdnemlwJyB8fCBjb2RpbmdzID09ICd4LWd6aXAnKSB7XG5cdFx0XHRcdGJvZHkgPSBib2R5LnBpcGUoemxpYi5jcmVhdGVHdW56aXAoemxpYk9wdGlvbnMpKTtcblx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2Vfb3B0aW9ucyk7XG5cdFx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIGZvciBkZWZsYXRlXG5cdFx0XHRpZiAoY29kaW5ncyA9PSAnZGVmbGF0ZScgfHwgY29kaW5ncyA9PSAneC1kZWZsYXRlJykge1xuXHRcdFx0XHQvLyBoYW5kbGUgdGhlIGluZmFtb3VzIHJhdyBkZWZsYXRlIHJlc3BvbnNlIGZyb20gb2xkIHNlcnZlcnNcblx0XHRcdFx0Ly8gYSBoYWNrIGZvciBvbGQgSUlTIGFuZCBBcGFjaGUgc2VydmVyc1xuXHRcdFx0XHRjb25zdCByYXcgPSByZXMucGlwZShuZXcgUGFzc1Rocm91Z2gkMSgpKTtcblx0XHRcdFx0cmF3Lm9uY2UoJ2RhdGEnLCBmdW5jdGlvbiAoY2h1bmspIHtcblx0XHRcdFx0XHQvLyBzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNzUxOTgyOFxuXHRcdFx0XHRcdGlmICgoY2h1bmtbMF0gJiAweDBGKSA9PT0gMHgwOCkge1xuXHRcdFx0XHRcdFx0Ym9keSA9IGJvZHkucGlwZSh6bGliLmNyZWF0ZUluZmxhdGUoKSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGJvZHkgPSBib2R5LnBpcGUoemxpYi5jcmVhdGVJbmZsYXRlUmF3KCkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXNwb25zZSA9IG5ldyBSZXNwb25zZShib2R5LCByZXNwb25zZV9vcHRpb25zKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZm9yIGJyXG5cdFx0XHRpZiAoY29kaW5ncyA9PSAnYnInICYmIHR5cGVvZiB6bGliLmNyZWF0ZUJyb3RsaURlY29tcHJlc3MgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0Ym9keSA9IGJvZHkucGlwZSh6bGliLmNyZWF0ZUJyb3RsaURlY29tcHJlc3MoKSk7XG5cdFx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlX29wdGlvbnMpO1xuXHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBvdGhlcndpc2UsIHVzZSByZXNwb25zZSBhcy1pc1xuXHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2Vfb3B0aW9ucyk7XG5cdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHR9KTtcblxuXHRcdHdyaXRlVG9TdHJlYW0ocmVxLCByZXF1ZXN0KTtcblx0fSk7XG59XG4vKipcbiAqIFJlZGlyZWN0IGNvZGUgbWF0Y2hpbmdcbiAqXG4gKiBAcGFyYW0gICBOdW1iZXIgICBjb2RlICBTdGF0dXMgY29kZVxuICogQHJldHVybiAgQm9vbGVhblxuICovXG5mZXRjaC5pc1JlZGlyZWN0ID0gZnVuY3Rpb24gKGNvZGUpIHtcblx0cmV0dXJuIGNvZGUgPT09IDMwMSB8fCBjb2RlID09PSAzMDIgfHwgY29kZSA9PT0gMzAzIHx8IGNvZGUgPT09IDMwNyB8fCBjb2RlID09PSAzMDg7XG59O1xuXG4vLyBleHBvc2UgUHJvbWlzZVxuZmV0Y2guUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xuXG5mdW5jdGlvbiBnZXRfcGFnZV9oYW5kbGVyKFxuXHRtYW5pZmVzdCxcblx0c2Vzc2lvbl9nZXR0ZXJcbikge1xuXHRjb25zdCBnZXRfYnVpbGRfaW5mbyA9IGRldlxuXHRcdD8gKCkgPT4gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgJ2J1aWxkLmpzb24nKSwgJ3V0Zi04JykpXG5cdFx0OiAoYXNzZXRzID0+ICgpID0+IGFzc2V0cykoSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgJ2J1aWxkLmpzb24nKSwgJ3V0Zi04JykpKTtcblxuXHRjb25zdCB0ZW1wbGF0ZSA9IGRldlxuXHRcdD8gKCkgPT4gcmVhZF90ZW1wbGF0ZShzcmNfZGlyKVxuXHRcdDogKHN0ciA9PiAoKSA9PiBzdHIpKHJlYWRfdGVtcGxhdGUoYnVpbGRfZGlyKSk7XG5cblx0Y29uc3QgaGFzX3NlcnZpY2Vfd29ya2VyID0gZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oYnVpbGRfZGlyLCAnc2VydmljZS13b3JrZXIuanMnKSk7XG5cblx0Y29uc3QgeyBzZXJ2ZXJfcm91dGVzLCBwYWdlcyB9ID0gbWFuaWZlc3Q7XG5cdGNvbnN0IGVycm9yX3JvdXRlID0gbWFuaWZlc3QuZXJyb3I7XG5cblx0ZnVuY3Rpb24gYmFpbChyZXEsIHJlcywgZXJyKSB7XG5cdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXG5cdFx0Y29uc3QgbWVzc2FnZSA9IGRldiA/IGVzY2FwZV9odG1sKGVyci5tZXNzYWdlKSA6ICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InO1xuXG5cdFx0cmVzLnN0YXR1c0NvZGUgPSA1MDA7XG5cdFx0cmVzLmVuZChgPHByZT4ke21lc3NhZ2V9PC9wcmU+YCk7XG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVfZXJyb3IocmVxLCByZXMsIHN0YXR1c0NvZGUsIGVycm9yKSB7XG5cdFx0aGFuZGxlX3BhZ2Uoe1xuXHRcdFx0cGF0dGVybjogbnVsbCxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdHsgbmFtZTogbnVsbCwgY29tcG9uZW50OiBlcnJvcl9yb3V0ZSB9XG5cdFx0XHRdXG5cdFx0fSwgcmVxLCByZXMsIHN0YXR1c0NvZGUsIGVycm9yIHx8IG5ldyBFcnJvcignVW5rbm93biBlcnJvciBpbiBwcmVsb2FkIGZ1bmN0aW9uJykpO1xuXHR9XG5cblx0YXN5bmMgZnVuY3Rpb24gaGFuZGxlX3BhZ2UocGFnZSwgcmVxLCByZXMsIHN0YXR1cyA9IDIwMCwgZXJyb3IgPSBudWxsKSB7XG5cdFx0Y29uc3QgaXNfc2VydmljZV93b3JrZXJfaW5kZXggPSByZXEucGF0aCA9PT0gJy9zZXJ2aWNlLXdvcmtlci1pbmRleC5odG1sJztcblx0XHRjb25zdCBidWlsZF9pbmZvXG5cblxuXG5cbiA9IGdldF9idWlsZF9pbmZvKCk7XG5cblx0XHRyZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC9odG1sJyk7XG5cdFx0cmVzLnNldEhlYWRlcignQ2FjaGUtQ29udHJvbCcsIGRldiA/ICduby1jYWNoZScgOiAnbWF4LWFnZT02MDAnKTtcblxuXHRcdC8vIHByZWxvYWQgbWFpbi5qcyBhbmQgY3VycmVudCByb3V0ZVxuXHRcdC8vIFRPRE8gZGV0ZWN0IG90aGVyIHN0dWZmIHdlIGNhbiBwcmVsb2FkPyBpbWFnZXMsIENTUywgZm9udHM/XG5cdFx0bGV0IHByZWxvYWRlZF9jaHVua3MgPSBBcnJheS5pc0FycmF5KGJ1aWxkX2luZm8uYXNzZXRzLm1haW4pID8gYnVpbGRfaW5mby5hc3NldHMubWFpbiA6IFtidWlsZF9pbmZvLmFzc2V0cy5tYWluXTtcblx0XHRpZiAoIWVycm9yICYmICFpc19zZXJ2aWNlX3dvcmtlcl9pbmRleCkge1xuXHRcdFx0cGFnZS5wYXJ0cy5mb3JFYWNoKHBhcnQgPT4ge1xuXHRcdFx0XHRpZiAoIXBhcnQpIHJldHVybjtcblxuXHRcdFx0XHQvLyB1c2luZyBjb25jYXQgYmVjYXVzZSBpdCBjb3VsZCBiZSBhIHN0cmluZyBvciBhbiBhcnJheS4gdGhhbmtzIHdlYnBhY2shXG5cdFx0XHRcdHByZWxvYWRlZF9jaHVua3MgPSBwcmVsb2FkZWRfY2h1bmtzLmNvbmNhdChidWlsZF9pbmZvLmFzc2V0c1twYXJ0Lm5hbWVdKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmIChidWlsZF9pbmZvLmJ1bmRsZXIgPT09ICdyb2xsdXAnKSB7XG5cdFx0XHQvLyBUT0RPIGFkZCBkZXBlbmRlbmNpZXMgYW5kIENTU1xuXHRcdFx0Y29uc3QgbGluayA9IHByZWxvYWRlZF9jaHVua3Ncblx0XHRcdFx0LmZpbHRlcihmaWxlID0+IGZpbGUgJiYgIWZpbGUubWF0Y2goL1xcLm1hcCQvKSlcblx0XHRcdFx0Lm1hcChmaWxlID0+IGA8JHtyZXEuYmFzZVVybH0vY2xpZW50LyR7ZmlsZX0+O3JlbD1cIm1vZHVsZXByZWxvYWRcImApXG5cdFx0XHRcdC5qb2luKCcsICcpO1xuXG5cdFx0XHRyZXMuc2V0SGVhZGVyKCdMaW5rJywgbGluayk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGxpbmsgPSBwcmVsb2FkZWRfY2h1bmtzXG5cdFx0XHRcdC5maWx0ZXIoZmlsZSA9PiBmaWxlICYmICFmaWxlLm1hdGNoKC9cXC5tYXAkLykpXG5cdFx0XHRcdC5tYXAoKGZpbGUpID0+IHtcblx0XHRcdFx0XHRjb25zdCBhcyA9IC9cXC5jc3MkLy50ZXN0KGZpbGUpID8gJ3N0eWxlJyA6ICdzY3JpcHQnO1xuXHRcdFx0XHRcdHJldHVybiBgPCR7cmVxLmJhc2VVcmx9L2NsaWVudC8ke2ZpbGV9PjtyZWw9XCJwcmVsb2FkXCI7YXM9XCIke2FzfVwiYDtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmpvaW4oJywgJyk7XG5cblx0XHRcdHJlcy5zZXRIZWFkZXIoJ0xpbmsnLCBsaW5rKTtcblx0XHR9XG5cblx0XHRjb25zdCBzZXNzaW9uID0gc2Vzc2lvbl9nZXR0ZXIocmVxLCByZXMpO1xuXG5cdFx0bGV0IHJlZGlyZWN0O1xuXHRcdGxldCBwcmVsb2FkX2Vycm9yO1xuXG5cdFx0Y29uc3QgcHJlbG9hZF9jb250ZXh0ID0ge1xuXHRcdFx0cmVkaXJlY3Q6IChzdGF0dXNDb2RlLCBsb2NhdGlvbikgPT4ge1xuXHRcdFx0XHRpZiAocmVkaXJlY3QgJiYgKHJlZGlyZWN0LnN0YXR1c0NvZGUgIT09IHN0YXR1c0NvZGUgfHwgcmVkaXJlY3QubG9jYXRpb24gIT09IGxvY2F0aW9uKSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihgQ29uZmxpY3RpbmcgcmVkaXJlY3RzYCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bG9jYXRpb24gPSBsb2NhdGlvbi5yZXBsYWNlKC9eXFwvL2csICcnKTsgLy8gbGVhZGluZyBzbGFzaCAob25seSlcblx0XHRcdFx0cmVkaXJlY3QgPSB7IHN0YXR1c0NvZGUsIGxvY2F0aW9uIH07XG5cdFx0XHR9LFxuXHRcdFx0ZXJyb3I6IChzdGF0dXNDb2RlLCBtZXNzYWdlKSA9PiB7XG5cdFx0XHRcdHByZWxvYWRfZXJyb3IgPSB7IHN0YXR1c0NvZGUsIG1lc3NhZ2UgfTtcblx0XHRcdH0sXG5cdFx0XHRmZXRjaDogKHVybCwgb3B0cykgPT4ge1xuXHRcdFx0XHRjb25zdCBwYXJzZWQgPSBuZXcgVXJsLlVSTCh1cmwsIGBodHRwOi8vMTI3LjAuMC4xOiR7cHJvY2Vzcy5lbnYuUE9SVH0ke3JlcS5iYXNlVXJsID8gcmVxLmJhc2VVcmwgKyAnLycgOicnfWApO1xuXG5cdFx0XHRcdGlmIChvcHRzKSB7XG5cdFx0XHRcdFx0b3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpO1xuXG5cdFx0XHRcdFx0Y29uc3QgaW5jbHVkZV9jb29raWVzID0gKFxuXHRcdFx0XHRcdFx0b3B0cy5jcmVkZW50aWFscyA9PT0gJ2luY2x1ZGUnIHx8XG5cdFx0XHRcdFx0XHRvcHRzLmNyZWRlbnRpYWxzID09PSAnc2FtZS1vcmlnaW4nICYmIHBhcnNlZC5vcmlnaW4gPT09IGBodHRwOi8vMTI3LjAuMC4xOiR7cHJvY2Vzcy5lbnYuUE9SVH1gXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdGlmIChpbmNsdWRlX2Nvb2tpZXMpIHtcblx0XHRcdFx0XHRcdG9wdHMuaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdHMuaGVhZGVycyk7XG5cblx0XHRcdFx0XHRcdGNvbnN0IGNvb2tpZXMgPSBPYmplY3QuYXNzaWduKFxuXHRcdFx0XHRcdFx0XHR7fSxcblx0XHRcdFx0XHRcdFx0Y29va2llLnBhcnNlKHJlcS5oZWFkZXJzLmNvb2tpZSB8fCAnJyksXG5cdFx0XHRcdFx0XHRcdGNvb2tpZS5wYXJzZShvcHRzLmhlYWRlcnMuY29va2llIHx8ICcnKVxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0Y29uc3Qgc2V0X2Nvb2tpZSA9IHJlcy5nZXRIZWFkZXIoJ1NldC1Db29raWUnKTtcblx0XHRcdFx0XHRcdChBcnJheS5pc0FycmF5KHNldF9jb29raWUpID8gc2V0X2Nvb2tpZSA6IFtzZXRfY29va2llXSkuZm9yRWFjaChzdHIgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IC8oW149XSspPShbXjtdKykvLmV4ZWMoc3RyKTtcblx0XHRcdFx0XHRcdFx0aWYgKG1hdGNoKSBjb29raWVzW21hdGNoWzFdXSA9IG1hdGNoWzJdO1xuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdGNvbnN0IHN0ciA9IE9iamVjdC5rZXlzKGNvb2tpZXMpXG5cdFx0XHRcdFx0XHRcdC5tYXAoa2V5ID0+IGAke2tleX09JHtjb29raWVzW2tleV19YClcblx0XHRcdFx0XHRcdFx0LmpvaW4oJzsgJyk7XG5cblx0XHRcdFx0XHRcdG9wdHMuaGVhZGVycy5jb29raWUgPSBzdHI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGZldGNoKHBhcnNlZC5ocmVmLCBvcHRzKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0bGV0IHByZWxvYWRlZDtcblx0XHRsZXQgbWF0Y2g7XG5cdFx0bGV0IHBhcmFtcztcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByb290X3ByZWxvYWRlZCA9IG1hbmlmZXN0LnJvb3RfcHJlbG9hZFxuXHRcdFx0XHQ/IG1hbmlmZXN0LnJvb3RfcHJlbG9hZC5jYWxsKHByZWxvYWRfY29udGV4dCwge1xuXHRcdFx0XHRcdGhvc3Q6IHJlcS5oZWFkZXJzLmhvc3QsXG5cdFx0XHRcdFx0cGF0aDogcmVxLnBhdGgsXG5cdFx0XHRcdFx0cXVlcnk6IHJlcS5xdWVyeSxcblx0XHRcdFx0XHRwYXJhbXM6IHt9XG5cdFx0XHRcdH0sIHNlc3Npb24pXG5cdFx0XHRcdDoge307XG5cblx0XHRcdG1hdGNoID0gZXJyb3IgPyBudWxsIDogcGFnZS5wYXR0ZXJuLmV4ZWMocmVxLnBhdGgpO1xuXG5cblx0XHRcdGxldCB0b1ByZWxvYWQgPSBbcm9vdF9wcmVsb2FkZWRdO1xuXHRcdFx0aWYgKCFpc19zZXJ2aWNlX3dvcmtlcl9pbmRleCkge1xuXHRcdFx0XHR0b1ByZWxvYWQgPSB0b1ByZWxvYWQuY29uY2F0KHBhZ2UucGFydHMubWFwKHBhcnQgPT4ge1xuXHRcdFx0XHRcdGlmICghcGFydCkgcmV0dXJuIG51bGw7XG5cblx0XHRcdFx0XHQvLyB0aGUgZGVlcGVzdCBsZXZlbCBpcyB1c2VkIGJlbG93LCB0byBpbml0aWFsaXNlIHRoZSBzdG9yZVxuXHRcdFx0XHRcdHBhcmFtcyA9IHBhcnQucGFyYW1zID8gcGFydC5wYXJhbXMobWF0Y2gpIDoge307XG5cblx0XHRcdFx0XHRyZXR1cm4gcGFydC5wcmVsb2FkXG5cdFx0XHRcdFx0XHQ/IHBhcnQucHJlbG9hZC5jYWxsKHByZWxvYWRfY29udGV4dCwge1xuXHRcdFx0XHRcdFx0XHRob3N0OiByZXEuaGVhZGVycy5ob3N0LFxuXHRcdFx0XHRcdFx0XHRwYXRoOiByZXEucGF0aCxcblx0XHRcdFx0XHRcdFx0cXVlcnk6IHJlcS5xdWVyeSxcblx0XHRcdFx0XHRcdFx0cGFyYW1zXG5cdFx0XHRcdFx0XHR9LCBzZXNzaW9uKVxuXHRcdFx0XHRcdFx0OiB7fTtcblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXG5cdFx0XHRwcmVsb2FkZWQgPSBhd2FpdCBQcm9taXNlLmFsbCh0b1ByZWxvYWQpO1xuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdHJldHVybiBiYWlsKHJlcSwgcmVzLCBlcnIpXG5cdFx0XHR9XG5cblx0XHRcdHByZWxvYWRfZXJyb3IgPSB7IHN0YXR1c0NvZGU6IDUwMCwgbWVzc2FnZTogZXJyIH07XG5cdFx0XHRwcmVsb2FkZWQgPSBbXTsgLy8gYXBwZWFzZSBUeXBlU2NyaXB0XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdGlmIChyZWRpcmVjdCkge1xuXHRcdFx0XHRjb25zdCBsb2NhdGlvbiA9IFVybC5yZXNvbHZlKChyZXEuYmFzZVVybCB8fCAnJykgKyAnLycsIHJlZGlyZWN0LmxvY2F0aW9uKTtcblxuXHRcdFx0XHRyZXMuc3RhdHVzQ29kZSA9IHJlZGlyZWN0LnN0YXR1c0NvZGU7XG5cdFx0XHRcdHJlcy5zZXRIZWFkZXIoJ0xvY2F0aW9uJywgbG9jYXRpb24pO1xuXHRcdFx0XHRyZXMuZW5kKCk7XG5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocHJlbG9hZF9lcnJvcikge1xuXHRcdFx0XHRoYW5kbGVfZXJyb3IocmVxLCByZXMsIHByZWxvYWRfZXJyb3Iuc3RhdHVzQ29kZSwgcHJlbG9hZF9lcnJvci5tZXNzYWdlKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBzZWdtZW50cyA9IHJlcS5wYXRoLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pO1xuXG5cdFx0XHQvLyBUT0RPIG1ha2UgdGhpcyBsZXNzIGNvbmZ1c2luZ1xuXHRcdFx0Y29uc3QgbGF5b3V0X3NlZ21lbnRzID0gW3NlZ21lbnRzWzBdXTtcblx0XHRcdGxldCBsID0gMTtcblxuXHRcdFx0cGFnZS5wYXJ0cy5mb3JFYWNoKChwYXJ0LCBpKSA9PiB7XG5cdFx0XHRcdGxheW91dF9zZWdtZW50c1tsXSA9IHNlZ21lbnRzW2kgKyAxXTtcblx0XHRcdFx0aWYgKCFwYXJ0KSByZXR1cm4gbnVsbDtcblx0XHRcdFx0bCsrO1xuXHRcdFx0fSk7XG5cblx0XHRcdGNvbnN0IHByb3BzID0ge1xuXHRcdFx0XHRzdG9yZXM6IHtcblx0XHRcdFx0XHRwYWdlOiB7XG5cdFx0XHRcdFx0XHRzdWJzY3JpYmU6IHdyaXRhYmxlKHtcblx0XHRcdFx0XHRcdFx0aG9zdDogcmVxLmhlYWRlcnMuaG9zdCxcblx0XHRcdFx0XHRcdFx0cGF0aDogcmVxLnBhdGgsXG5cdFx0XHRcdFx0XHRcdHF1ZXJ5OiByZXEucXVlcnksXG5cdFx0XHRcdFx0XHRcdHBhcmFtc1xuXHRcdFx0XHRcdFx0fSkuc3Vic2NyaWJlXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwcmVsb2FkaW5nOiB7XG5cdFx0XHRcdFx0XHRzdWJzY3JpYmU6IHdyaXRhYmxlKG51bGwpLnN1YnNjcmliZVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2Vzc2lvbjogd3JpdGFibGUoc2Vzc2lvbilcblx0XHRcdFx0fSxcblx0XHRcdFx0c2VnbWVudHM6IGxheW91dF9zZWdtZW50cyxcblx0XHRcdFx0c3RhdHVzOiBlcnJvciA/IHN0YXR1cyA6IDIwMCxcblx0XHRcdFx0ZXJyb3I6IGVycm9yID8gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yIDogeyBtZXNzYWdlOiBlcnJvciB9IDogbnVsbCxcblx0XHRcdFx0bGV2ZWwwOiB7XG5cdFx0XHRcdFx0cHJvcHM6IHByZWxvYWRlZFswXVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRsZXZlbDE6IHtcblx0XHRcdFx0XHRzZWdtZW50OiBzZWdtZW50c1swXSxcblx0XHRcdFx0XHRwcm9wczoge31cblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0aWYgKCFpc19zZXJ2aWNlX3dvcmtlcl9pbmRleCkge1xuXHRcdFx0XHRsZXQgbCA9IDE7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZS5wYXJ0cy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRcdGNvbnN0IHBhcnQgPSBwYWdlLnBhcnRzW2ldO1xuXHRcdFx0XHRcdGlmICghcGFydCkgY29udGludWU7XG5cblx0XHRcdFx0XHRwcm9wc1tgbGV2ZWwke2wrK31gXSA9IHtcblx0XHRcdFx0XHRcdGNvbXBvbmVudDogcGFydC5jb21wb25lbnQsXG5cdFx0XHRcdFx0XHRwcm9wczogcHJlbG9hZGVkW2kgKyAxXSB8fCB7fSxcblx0XHRcdFx0XHRcdHNlZ21lbnQ6IHNlZ21lbnRzW2ldXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCB7IGh0bWwsIGhlYWQsIGNzcyB9ID0gQXBwLnJlbmRlcihwcm9wcyk7XG5cblx0XHRcdGNvbnN0IHNlcmlhbGl6ZWQgPSB7XG5cdFx0XHRcdHByZWxvYWRlZDogYFske3ByZWxvYWRlZC5tYXAoZGF0YSA9PiB0cnlfc2VyaWFsaXplKGRhdGEpKS5qb2luKCcsJyl9XWAsXG5cdFx0XHRcdHNlc3Npb246IHNlc3Npb24gJiYgdHJ5X3NlcmlhbGl6ZShzZXNzaW9uLCBlcnIgPT4ge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIHNlcmlhbGl6ZSBzZXNzaW9uIGRhdGE6ICR7ZXJyLm1lc3NhZ2V9YCk7XG5cdFx0XHRcdH0pLFxuXHRcdFx0XHRlcnJvcjogZXJyb3IgJiYgdHJ5X3NlcmlhbGl6ZShwcm9wcy5lcnJvcilcblx0XHRcdH07XG5cblx0XHRcdGxldCBzY3JpcHQgPSBgX19TQVBQRVJfXz17JHtbXG5cdFx0XHRcdGVycm9yICYmIGBlcnJvcjoke3NlcmlhbGl6ZWQuZXJyb3J9LHN0YXR1czoke3N0YXR1c31gLFxuXHRcdFx0XHRgYmFzZVVybDpcIiR7cmVxLmJhc2VVcmx9XCJgLFxuXHRcdFx0XHRzZXJpYWxpemVkLnByZWxvYWRlZCAmJiBgcHJlbG9hZGVkOiR7c2VyaWFsaXplZC5wcmVsb2FkZWR9YCxcblx0XHRcdFx0c2VyaWFsaXplZC5zZXNzaW9uICYmIGBzZXNzaW9uOiR7c2VyaWFsaXplZC5zZXNzaW9ufWBcblx0XHRcdF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJywnKX19O2A7XG5cblx0XHRcdGlmIChoYXNfc2VydmljZV93b3JrZXIpIHtcblx0XHRcdFx0c2NyaXB0ICs9IGBpZignc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKW5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcke3JlcS5iYXNlVXJsfS9zZXJ2aWNlLXdvcmtlci5qcycpO2A7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGZpbGUgPSBbXS5jb25jYXQoYnVpbGRfaW5mby5hc3NldHMubWFpbikuZmlsdGVyKGZpbGUgPT4gZmlsZSAmJiAvXFwuanMkLy50ZXN0KGZpbGUpKVswXTtcblx0XHRcdGNvbnN0IG1haW4gPSBgJHtyZXEuYmFzZVVybH0vY2xpZW50LyR7ZmlsZX1gO1xuXG5cdFx0XHRpZiAoYnVpbGRfaW5mby5idW5kbGVyID09PSAncm9sbHVwJykge1xuXHRcdFx0XHRpZiAoYnVpbGRfaW5mby5sZWdhY3lfYXNzZXRzKSB7XG5cdFx0XHRcdFx0Y29uc3QgbGVnYWN5X21haW4gPSBgJHtyZXEuYmFzZVVybH0vY2xpZW50L2xlZ2FjeS8ke2J1aWxkX2luZm8ubGVnYWN5X2Fzc2V0cy5tYWlufWA7XG5cdFx0XHRcdFx0c2NyaXB0ICs9IGAoZnVuY3Rpb24oKXt0cnl7ZXZhbChcImFzeW5jIGZ1bmN0aW9uIHgoKXt9XCIpO3ZhciBtYWluPVwiJHttYWlufVwifWNhdGNoKGUpe21haW49XCIke2xlZ2FjeV9tYWlufVwifTt2YXIgcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO3RyeXtuZXcgRnVuY3Rpb24oXCJpZigwKWltcG9ydCgnJylcIikoKTtzLnNyYz1tYWluO3MudHlwZT1cIm1vZHVsZVwiO3MuY3Jvc3NPcmlnaW49XCJ1c2UtY3JlZGVudGlhbHNcIjt9Y2F0Y2goZSl7cy5zcmM9XCIke3JlcS5iYXNlVXJsfS9jbGllbnQvc2hpbXBvcnRAJHtidWlsZF9pbmZvLnNoaW1wb3J0fS5qc1wiO3Muc2V0QXR0cmlidXRlKFwiZGF0YS1tYWluXCIsbWFpbik7fWRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocyk7fSgpKTtgO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNjcmlwdCArPSBgdmFyIHM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTt0cnl7bmV3IEZ1bmN0aW9uKFwiaWYoMClpbXBvcnQoJycpXCIpKCk7cy5zcmM9XCIke21haW59XCI7cy50eXBlPVwibW9kdWxlXCI7cy5jcm9zc09yaWdpbj1cInVzZS1jcmVkZW50aWFsc1wiO31jYXRjaChlKXtzLnNyYz1cIiR7cmVxLmJhc2VVcmx9L2NsaWVudC9zaGltcG9ydEAke2J1aWxkX2luZm8uc2hpbXBvcnR9LmpzXCI7cy5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1haW5cIixcIiR7bWFpbn1cIil9ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKWA7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNjcmlwdCArPSBgPC9zY3JpcHQ+PHNjcmlwdCBzcmM9XCIke21haW59XCI+YDtcblx0XHRcdH1cblxuXHRcdFx0bGV0IHN0eWxlcztcblxuXHRcdFx0Ly8gVE9ETyBtYWtlIHRoaXMgY29uc2lzdGVudCBhY3Jvc3MgYXBwc1xuXHRcdFx0Ly8gVE9ETyBlbWJlZCBidWlsZF9pbmZvIGluIHBsYWNlaG9sZGVyLnRzXG5cdFx0XHRpZiAoYnVpbGRfaW5mby5jc3MgJiYgYnVpbGRfaW5mby5jc3MubWFpbikge1xuXHRcdFx0XHRjb25zdCBjc3NfY2h1bmtzID0gbmV3IFNldCgpO1xuXHRcdFx0XHRpZiAoYnVpbGRfaW5mby5jc3MubWFpbikgY3NzX2NodW5rcy5hZGQoYnVpbGRfaW5mby5jc3MubWFpbik7XG5cdFx0XHRcdHBhZ2UucGFydHMuZm9yRWFjaChwYXJ0ID0+IHtcblx0XHRcdFx0XHRpZiAoIXBhcnQpIHJldHVybjtcblx0XHRcdFx0XHRjb25zdCBjc3NfY2h1bmtzX2Zvcl9wYXJ0ID0gYnVpbGRfaW5mby5jc3MuY2h1bmtzW3BhcnQuZmlsZV07XG5cblx0XHRcdFx0XHRpZiAoY3NzX2NodW5rc19mb3JfcGFydCkge1xuXHRcdFx0XHRcdFx0Y3NzX2NodW5rc19mb3JfcGFydC5mb3JFYWNoKGZpbGUgPT4ge1xuXHRcdFx0XHRcdFx0XHRjc3NfY2h1bmtzLmFkZChmaWxlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0c3R5bGVzID0gQXJyYXkuZnJvbShjc3NfY2h1bmtzKVxuXHRcdFx0XHRcdC5tYXAoaHJlZiA9PiBgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJjbGllbnQvJHtocmVmfVwiPmApXG5cdFx0XHRcdFx0LmpvaW4oJycpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c3R5bGVzID0gKGNzcyAmJiBjc3MuY29kZSA/IGA8c3R5bGU+JHtjc3MuY29kZX08L3N0eWxlPmAgOiAnJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHVzZXJzIGNhbiBzZXQgYSBDU1Agbm9uY2UgdXNpbmcgcmVzLmxvY2Fscy5ub25jZVxuXHRcdFx0Y29uc3Qgbm9uY2VfYXR0ciA9IChyZXMubG9jYWxzICYmIHJlcy5sb2NhbHMubm9uY2UpID8gYCBub25jZT1cIiR7cmVzLmxvY2Fscy5ub25jZX1cImAgOiAnJztcblxuXHRcdFx0Y29uc3QgYm9keSA9IHRlbXBsYXRlKClcblx0XHRcdFx0LnJlcGxhY2UoJyVzYXBwZXIuYmFzZSUnLCAoKSA9PiBgPGJhc2UgaHJlZj1cIiR7cmVxLmJhc2VVcmx9L1wiPmApXG5cdFx0XHRcdC5yZXBsYWNlKCclc2FwcGVyLnNjcmlwdHMlJywgKCkgPT4gYDxzY3JpcHQke25vbmNlX2F0dHJ9PiR7c2NyaXB0fTwvc2NyaXB0PmApXG5cdFx0XHRcdC5yZXBsYWNlKCclc2FwcGVyLmh0bWwlJywgKCkgPT4gaHRtbClcblx0XHRcdFx0LnJlcGxhY2UoJyVzYXBwZXIuaGVhZCUnLCAoKSA9PiBgPG5vc2NyaXB0IGlkPSdzYXBwZXItaGVhZC1zdGFydCc+PC9ub3NjcmlwdD4ke2hlYWR9PG5vc2NyaXB0IGlkPSdzYXBwZXItaGVhZC1lbmQnPjwvbm9zY3JpcHQ+YClcblx0XHRcdFx0LnJlcGxhY2UoJyVzYXBwZXIuc3R5bGVzJScsICgpID0+IHN0eWxlcyk7XG5cblx0XHRcdHJlcy5zdGF0dXNDb2RlID0gc3RhdHVzO1xuXHRcdFx0cmVzLmVuZChib2R5KTtcblx0XHR9IGNhdGNoKGVycikge1xuXHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdGJhaWwocmVxLCByZXMsIGVycik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRoYW5kbGVfZXJyb3IocmVxLCByZXMsIDUwMCwgZXJyKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZnVuY3Rpb24gZmluZF9yb3V0ZShyZXEsIHJlcywgbmV4dCkge1xuXHRcdGlmIChyZXEucGF0aCA9PT0gJy9zZXJ2aWNlLXdvcmtlci1pbmRleC5odG1sJykge1xuXHRcdFx0Y29uc3QgaG9tZVBhZ2UgPSBwYWdlcy5maW5kKHBhZ2UgPT4gcGFnZS5wYXR0ZXJuLnRlc3QoJy8nKSk7XG5cdFx0XHRoYW5kbGVfcGFnZShob21lUGFnZSwgcmVxLCByZXMpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xuXHRcdFx0aWYgKHBhZ2UucGF0dGVybi50ZXN0KHJlcS5wYXRoKSkge1xuXHRcdFx0XHRoYW5kbGVfcGFnZShwYWdlLCByZXEsIHJlcyk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRoYW5kbGVfZXJyb3IocmVxLCByZXMsIDQwNCwgJ05vdCBmb3VuZCcpO1xuXHR9O1xufVxuXG5mdW5jdGlvbiByZWFkX3RlbXBsYXRlKGRpciA9IGJ1aWxkX2Rpcikge1xuXHRyZXR1cm4gZnMucmVhZEZpbGVTeW5jKGAke2Rpcn0vdGVtcGxhdGUuaHRtbGAsICd1dGYtOCcpO1xufVxuXG5mdW5jdGlvbiB0cnlfc2VyaWFsaXplKGRhdGEsIGZhaWwpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gZGV2YWx1ZShkYXRhKTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0aWYgKGZhaWwpIGZhaWwoZXJyKTtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG5mdW5jdGlvbiBlc2NhcGVfaHRtbChodG1sKSB7XG5cdGNvbnN0IGNoYXJzID0ge1xuXHRcdCdcIicgOiAncXVvdCcsXG5cdFx0XCInXCI6ICcjMzknLFxuXHRcdCcmJzogJ2FtcCcsXG5cdFx0JzwnIDogJ2x0Jyxcblx0XHQnPicgOiAnZ3QnXG5cdH07XG5cblx0cmV0dXJuIGh0bWwucmVwbGFjZSgvW1wiJyY8Pl0vZywgYyA9PiBgJiR7Y2hhcnNbY119O2ApO1xufVxuXG52YXIgbWltZV9yYXcgPSBcImFwcGxpY2F0aW9uL2FuZHJldy1pbnNldFxcdFxcdFxcdGV6XFxuYXBwbGljYXRpb24vYXBwbGl4d2FyZVxcdFxcdFxcdFxcdGF3XFxuYXBwbGljYXRpb24vYXRvbSt4bWxcXHRcXHRcXHRcXHRhdG9tXFxuYXBwbGljYXRpb24vYXRvbWNhdCt4bWxcXHRcXHRcXHRcXHRhdG9tY2F0XFxuYXBwbGljYXRpb24vYXRvbXN2Yyt4bWxcXHRcXHRcXHRcXHRhdG9tc3ZjXFxuYXBwbGljYXRpb24vY2N4bWwreG1sXFx0XFx0XFx0XFx0Y2N4bWxcXG5hcHBsaWNhdGlvbi9jZG1pLWNhcGFiaWxpdHlcXHRcXHRcXHRjZG1pYVxcbmFwcGxpY2F0aW9uL2NkbWktY29udGFpbmVyXFx0XFx0XFx0Y2RtaWNcXG5hcHBsaWNhdGlvbi9jZG1pLWRvbWFpblxcdFxcdFxcdFxcdGNkbWlkXFxuYXBwbGljYXRpb24vY2RtaS1vYmplY3RcXHRcXHRcXHRcXHRjZG1pb1xcbmFwcGxpY2F0aW9uL2NkbWktcXVldWVcXHRcXHRcXHRcXHRjZG1pcVxcbmFwcGxpY2F0aW9uL2N1LXNlZW1lXFx0XFx0XFx0XFx0Y3VcXG5hcHBsaWNhdGlvbi9kYXZtb3VudCt4bWxcXHRcXHRcXHRkYXZtb3VudFxcbmFwcGxpY2F0aW9uL2RvY2Jvb2sreG1sXFx0XFx0XFx0XFx0ZGJrXFxuYXBwbGljYXRpb24vZHNzYytkZXJcXHRcXHRcXHRcXHRkc3NjXFxuYXBwbGljYXRpb24vZHNzYyt4bWxcXHRcXHRcXHRcXHR4ZHNzY1xcbmFwcGxpY2F0aW9uL2VjbWFzY3JpcHRcXHRcXHRcXHRcXHRlY21hXFxuYXBwbGljYXRpb24vZW1tYSt4bWxcXHRcXHRcXHRcXHRlbW1hXFxuYXBwbGljYXRpb24vZXB1Yit6aXBcXHRcXHRcXHRcXHRlcHViXFxuYXBwbGljYXRpb24vZXhpXFx0XFx0XFx0XFx0XFx0ZXhpXFxuYXBwbGljYXRpb24vZm9udC10ZHBmclxcdFxcdFxcdFxcdHBmclxcbmFwcGxpY2F0aW9uL2dtbCt4bWxcXHRcXHRcXHRcXHRnbWxcXG5hcHBsaWNhdGlvbi9ncHgreG1sXFx0XFx0XFx0XFx0Z3B4XFxuYXBwbGljYXRpb24vZ3hmXFx0XFx0XFx0XFx0XFx0Z3hmXFxuYXBwbGljYXRpb24vaHlwZXJzdHVkaW9cXHRcXHRcXHRcXHRzdGtcXG5hcHBsaWNhdGlvbi9pbmttbCt4bWxcXHRcXHRcXHRcXHRpbmsgaW5rbWxcXG5hcHBsaWNhdGlvbi9pcGZpeFxcdFxcdFxcdFxcdGlwZml4XFxuYXBwbGljYXRpb24vamF2YS1hcmNoaXZlXFx0XFx0XFx0amFyXFxuYXBwbGljYXRpb24vamF2YS1zZXJpYWxpemVkLW9iamVjdFxcdFxcdHNlclxcbmFwcGxpY2F0aW9uL2phdmEtdm1cXHRcXHRcXHRcXHRjbGFzc1xcbmFwcGxpY2F0aW9uL2phdmFzY3JpcHRcXHRcXHRcXHRcXHRqc1xcbmFwcGxpY2F0aW9uL2pzb25cXHRcXHRcXHRcXHRqc29uIG1hcFxcbmFwcGxpY2F0aW9uL2pzb25tbCtqc29uXFx0XFx0XFx0XFx0anNvbm1sXFxuYXBwbGljYXRpb24vbG9zdCt4bWxcXHRcXHRcXHRcXHRsb3N0eG1sXFxuYXBwbGljYXRpb24vbWFjLWJpbmhleDQwXFx0XFx0XFx0aHF4XFxuYXBwbGljYXRpb24vbWFjLWNvbXBhY3Rwcm9cXHRcXHRcXHRjcHRcXG5hcHBsaWNhdGlvbi9tYWRzK3htbFxcdFxcdFxcdFxcdG1hZHNcXG5hcHBsaWNhdGlvbi9tYXJjXFx0XFx0XFx0XFx0bXJjXFxuYXBwbGljYXRpb24vbWFyY3htbCt4bWxcXHRcXHRcXHRcXHRtcmN4XFxuYXBwbGljYXRpb24vbWF0aGVtYXRpY2FcXHRcXHRcXHRcXHRtYSBuYiBtYlxcbmFwcGxpY2F0aW9uL21hdGhtbCt4bWxcXHRcXHRcXHRcXHRtYXRobWxcXG5hcHBsaWNhdGlvbi9tYm94XFx0XFx0XFx0XFx0bWJveFxcbmFwcGxpY2F0aW9uL21lZGlhc2VydmVyY29udHJvbCt4bWxcXHRcXHRtc2NtbFxcbmFwcGxpY2F0aW9uL21ldGFsaW5rK3htbFxcdFxcdFxcdG1ldGFsaW5rXFxuYXBwbGljYXRpb24vbWV0YWxpbms0K3htbFxcdFxcdFxcdG1ldGE0XFxuYXBwbGljYXRpb24vbWV0cyt4bWxcXHRcXHRcXHRcXHRtZXRzXFxuYXBwbGljYXRpb24vbW9kcyt4bWxcXHRcXHRcXHRcXHRtb2RzXFxuYXBwbGljYXRpb24vbXAyMVxcdFxcdFxcdFxcdG0yMSBtcDIxXFxuYXBwbGljYXRpb24vbXA0XFx0XFx0XFx0XFx0XFx0bXA0c1xcbmFwcGxpY2F0aW9uL21zd29yZFxcdFxcdFxcdFxcdGRvYyBkb3RcXG5hcHBsaWNhdGlvbi9teGZcXHRcXHRcXHRcXHRcXHRteGZcXG5hcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cXHRiaW4gZG1zIGxyZiBtYXIgc28gZGlzdCBkaXN0eiBwa2cgYnBrIGR1bXAgZWxjIGRlcGxveVxcbmFwcGxpY2F0aW9uL29kYVxcdFxcdFxcdFxcdFxcdG9kYVxcbmFwcGxpY2F0aW9uL29lYnBzLXBhY2thZ2UreG1sXFx0XFx0XFx0b3BmXFxuYXBwbGljYXRpb24vb2dnXFx0XFx0XFx0XFx0XFx0b2d4XFxuYXBwbGljYXRpb24vb21kb2MreG1sXFx0XFx0XFx0XFx0b21kb2NcXG5hcHBsaWNhdGlvbi9vbmVub3RlXFx0XFx0XFx0XFx0b25ldG9jIG9uZXRvYzIgb25ldG1wIG9uZXBrZ1xcbmFwcGxpY2F0aW9uL294cHNcXHRcXHRcXHRcXHRveHBzXFxuYXBwbGljYXRpb24vcGF0Y2gtb3BzLWVycm9yK3htbFxcdFxcdFxcdHhlclxcbmFwcGxpY2F0aW9uL3BkZlxcdFxcdFxcdFxcdFxcdHBkZlxcbmFwcGxpY2F0aW9uL3BncC1lbmNyeXB0ZWRcXHRcXHRcXHRwZ3BcXG5hcHBsaWNhdGlvbi9wZ3Atc2lnbmF0dXJlXFx0XFx0XFx0YXNjIHNpZ1xcbmFwcGxpY2F0aW9uL3BpY3MtcnVsZXNcXHRcXHRcXHRcXHRwcmZcXG5hcHBsaWNhdGlvbi9wa2NzMTBcXHRcXHRcXHRcXHRwMTBcXG5hcHBsaWNhdGlvbi9wa2NzNy1taW1lXFx0XFx0XFx0XFx0cDdtIHA3Y1xcbmFwcGxpY2F0aW9uL3BrY3M3LXNpZ25hdHVyZVxcdFxcdFxcdHA3c1xcbmFwcGxpY2F0aW9uL3BrY3M4XFx0XFx0XFx0XFx0cDhcXG5hcHBsaWNhdGlvbi9wa2l4LWF0dHItY2VydFxcdFxcdFxcdGFjXFxuYXBwbGljYXRpb24vcGtpeC1jZXJ0XFx0XFx0XFx0XFx0Y2VyXFxuYXBwbGljYXRpb24vcGtpeC1jcmxcXHRcXHRcXHRcXHRjcmxcXG5hcHBsaWNhdGlvbi9wa2l4LXBraXBhdGhcXHRcXHRcXHRwa2lwYXRoXFxuYXBwbGljYXRpb24vcGtpeGNtcFxcdFxcdFxcdFxcdHBraVxcbmFwcGxpY2F0aW9uL3Bscyt4bWxcXHRcXHRcXHRcXHRwbHNcXG5hcHBsaWNhdGlvbi9wb3N0c2NyaXB0XFx0XFx0XFx0XFx0YWkgZXBzIHBzXFxuYXBwbGljYXRpb24vcHJzLmN3d1xcdFxcdFxcdFxcdGN3d1xcbmFwcGxpY2F0aW9uL3Bza2MreG1sXFx0XFx0XFx0XFx0cHNrY3htbFxcbmFwcGxpY2F0aW9uL3JkZit4bWxcXHRcXHRcXHRcXHRyZGZcXG5hcHBsaWNhdGlvbi9yZWdpbmZvK3htbFxcdFxcdFxcdFxcdHJpZlxcbmFwcGxpY2F0aW9uL3JlbGF4LW5nLWNvbXBhY3Qtc3ludGF4XFx0XFx0cm5jXFxuYXBwbGljYXRpb24vcmVzb3VyY2UtbGlzdHMreG1sXFx0XFx0XFx0cmxcXG5hcHBsaWNhdGlvbi9yZXNvdXJjZS1saXN0cy1kaWZmK3htbFxcdFxcdHJsZFxcbmFwcGxpY2F0aW9uL3Jscy1zZXJ2aWNlcyt4bWxcXHRcXHRcXHRyc1xcbmFwcGxpY2F0aW9uL3Jwa2ktZ2hvc3RidXN0ZXJzXFx0XFx0XFx0Z2JyXFxuYXBwbGljYXRpb24vcnBraS1tYW5pZmVzdFxcdFxcdFxcdG1mdFxcbmFwcGxpY2F0aW9uL3Jwa2ktcm9hXFx0XFx0XFx0XFx0cm9hXFxuYXBwbGljYXRpb24vcnNkK3htbFxcdFxcdFxcdFxcdHJzZFxcbmFwcGxpY2F0aW9uL3Jzcyt4bWxcXHRcXHRcXHRcXHRyc3NcXG5hcHBsaWNhdGlvbi9ydGZcXHRcXHRcXHRcXHRcXHRydGZcXG5hcHBsaWNhdGlvbi9zYm1sK3htbFxcdFxcdFxcdFxcdHNibWxcXG5hcHBsaWNhdGlvbi9zY3ZwLWN2LXJlcXVlc3RcXHRcXHRcXHRzY3FcXG5hcHBsaWNhdGlvbi9zY3ZwLWN2LXJlc3BvbnNlXFx0XFx0XFx0c2NzXFxuYXBwbGljYXRpb24vc2N2cC12cC1yZXF1ZXN0XFx0XFx0XFx0c3BxXFxuYXBwbGljYXRpb24vc2N2cC12cC1yZXNwb25zZVxcdFxcdFxcdHNwcFxcbmFwcGxpY2F0aW9uL3NkcFxcdFxcdFxcdFxcdFxcdHNkcFxcbmFwcGxpY2F0aW9uL3NldC1wYXltZW50LWluaXRpYXRpb25cXHRcXHRzZXRwYXlcXG5hcHBsaWNhdGlvbi9zZXQtcmVnaXN0cmF0aW9uLWluaXRpYXRpb25cXHRcXHRzZXRyZWdcXG5hcHBsaWNhdGlvbi9zaGYreG1sXFx0XFx0XFx0XFx0c2hmXFxuYXBwbGljYXRpb24vc21pbCt4bWxcXHRcXHRcXHRcXHRzbWkgc21pbFxcbmFwcGxpY2F0aW9uL3NwYXJxbC1xdWVyeVxcdFxcdFxcdHJxXFxuYXBwbGljYXRpb24vc3BhcnFsLXJlc3VsdHMreG1sXFx0XFx0XFx0c3J4XFxuYXBwbGljYXRpb24vc3Jnc1xcdFxcdFxcdFxcdGdyYW1cXG5hcHBsaWNhdGlvbi9zcmdzK3htbFxcdFxcdFxcdFxcdGdyeG1sXFxuYXBwbGljYXRpb24vc3J1K3htbFxcdFxcdFxcdFxcdHNydVxcbmFwcGxpY2F0aW9uL3NzZGwreG1sXFx0XFx0XFx0XFx0c3NkbFxcbmFwcGxpY2F0aW9uL3NzbWwreG1sXFx0XFx0XFx0XFx0c3NtbFxcbmFwcGxpY2F0aW9uL3RlaSt4bWxcXHRcXHRcXHRcXHR0ZWkgdGVpY29ycHVzXFxuYXBwbGljYXRpb24vdGhyYXVkK3htbFxcdFxcdFxcdFxcdHRmaVxcbmFwcGxpY2F0aW9uL3RpbWVzdGFtcGVkLWRhdGFcXHRcXHRcXHR0c2RcXG5hcHBsaWNhdGlvbi92bmQuM2dwcC5waWMtYnctbGFyZ2VcXHRcXHRwbGJcXG5hcHBsaWNhdGlvbi92bmQuM2dwcC5waWMtYnctc21hbGxcXHRcXHRwc2JcXG5hcHBsaWNhdGlvbi92bmQuM2dwcC5waWMtYnctdmFyXFx0XFx0XFx0cHZiXFxuYXBwbGljYXRpb24vdm5kLjNncHAyLnRjYXBcXHRcXHRcXHR0Y2FwXFxuYXBwbGljYXRpb24vdm5kLjNtLnBvc3QtaXQtbm90ZXNcXHRcXHRwd25cXG5hcHBsaWNhdGlvbi92bmQuYWNjcGFjLnNpbXBseS5hc29cXHRcXHRhc29cXG5hcHBsaWNhdGlvbi92bmQuYWNjcGFjLnNpbXBseS5pbXBcXHRcXHRpbXBcXG5hcHBsaWNhdGlvbi92bmQuYWN1Y29ib2xcXHRcXHRcXHRhY3VcXG5hcHBsaWNhdGlvbi92bmQuYWN1Y29ycFxcdFxcdFxcdFxcdGF0YyBhY3V0Y1xcbmFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5haXItYXBwbGljYXRpb24taW5zdGFsbGVyLXBhY2thZ2UremlwXFx0YWlyXFxuYXBwbGljYXRpb24vdm5kLmFkb2JlLmZvcm1zY2VudHJhbC5mY2R0XFx0XFx0ZmNkdFxcbmFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5meHBcXHRcXHRcXHRmeHAgZnhwbFxcbmFwcGxpY2F0aW9uL3ZuZC5hZG9iZS54ZHAreG1sXFx0XFx0XFx0eGRwXFxuYXBwbGljYXRpb24vdm5kLmFkb2JlLnhmZGZcXHRcXHRcXHR4ZmRmXFxuYXBwbGljYXRpb24vdm5kLmFoZWFkLnNwYWNlXFx0XFx0XFx0YWhlYWRcXG5hcHBsaWNhdGlvbi92bmQuYWlyemlwLmZpbGVzZWN1cmUuYXpmXFx0XFx0YXpmXFxuYXBwbGljYXRpb24vdm5kLmFpcnppcC5maWxlc2VjdXJlLmF6c1xcdFxcdGF6c1xcbmFwcGxpY2F0aW9uL3ZuZC5hbWF6b24uZWJvb2tcXHRcXHRcXHRhendcXG5hcHBsaWNhdGlvbi92bmQuYW1lcmljYW5keW5hbWljcy5hY2NcXHRcXHRhY2NcXG5hcHBsaWNhdGlvbi92bmQuYW1pZ2EuYW1pXFx0XFx0XFx0YW1pXFxuYXBwbGljYXRpb24vdm5kLmFuZHJvaWQucGFja2FnZS1hcmNoaXZlXFx0XFx0YXBrXFxuYXBwbGljYXRpb24vdm5kLmFuc2VyLXdlYi1jZXJ0aWZpY2F0ZS1pc3N1ZS1pbml0aWF0aW9uXFx0Y2lpXFxuYXBwbGljYXRpb24vdm5kLmFuc2VyLXdlYi1mdW5kcy10cmFuc2Zlci1pbml0aWF0aW9uXFx0ZnRpXFxuYXBwbGljYXRpb24vdm5kLmFudGl4LmdhbWUtY29tcG9uZW50XFx0XFx0YXR4XFxuYXBwbGljYXRpb24vdm5kLmFwcGxlLmluc3RhbGxlcit4bWxcXHRcXHRtcGtnXFxuYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmxcXHRcXHRcXHRtM3U4XFxuYXBwbGljYXRpb24vdm5kLmFyaXN0YW5ldHdvcmtzLnN3aVxcdFxcdHN3aVxcbmFwcGxpY2F0aW9uL3ZuZC5hc3RyYWVhLXNvZnR3YXJlLmlvdGFcXHRcXHRpb3RhXFxuYXBwbGljYXRpb24vdm5kLmF1ZGlvZ3JhcGhcXHRcXHRcXHRhZXBcXG5hcHBsaWNhdGlvbi92bmQuYmx1ZWljZS5tdWx0aXBhc3NcXHRcXHRtcG1cXG5hcHBsaWNhdGlvbi92bmQuYm1pXFx0XFx0XFx0XFx0Ym1pXFxuYXBwbGljYXRpb24vdm5kLmJ1c2luZXNzb2JqZWN0c1xcdFxcdFxcdHJlcFxcbmFwcGxpY2F0aW9uL3ZuZC5jaGVtZHJhdyt4bWxcXHRcXHRcXHRjZHhtbFxcbmFwcGxpY2F0aW9uL3ZuZC5jaGlwbnV0cy5rYXJhb2tlLW1tZFxcdFxcdG1tZFxcbmFwcGxpY2F0aW9uL3ZuZC5jaW5kZXJlbGxhXFx0XFx0XFx0Y2R5XFxuYXBwbGljYXRpb24vdm5kLmNsYXltb3JlXFx0XFx0XFx0Y2xhXFxuYXBwbGljYXRpb24vdm5kLmNsb2FudG8ucnA5XFx0XFx0XFx0cnA5XFxuYXBwbGljYXRpb24vdm5kLmNsb25rLmM0Z3JvdXBcXHRcXHRcXHRjNGcgYzRkIGM0ZiBjNHAgYzR1XFxuYXBwbGljYXRpb24vdm5kLmNsdWV0cnVzdC5jYXJ0b21vYmlsZS1jb25maWdcXHRcXHRjMTFhbWNcXG5hcHBsaWNhdGlvbi92bmQuY2x1ZXRydXN0LmNhcnRvbW9iaWxlLWNvbmZpZy1wa2dcXHRjMTFhbXpcXG5hcHBsaWNhdGlvbi92bmQuY29tbW9uc3BhY2VcXHRcXHRcXHRjc3BcXG5hcHBsaWNhdGlvbi92bmQuY29udGFjdC5jbXNnXFx0XFx0XFx0Y2RiY21zZ1xcbmFwcGxpY2F0aW9uL3ZuZC5jb3Ntb2NhbGxlclxcdFxcdFxcdGNtY1xcbmFwcGxpY2F0aW9uL3ZuZC5jcmljay5jbGlja2VyXFx0XFx0XFx0Y2xreFxcbmFwcGxpY2F0aW9uL3ZuZC5jcmljay5jbGlja2VyLmtleWJvYXJkXFx0XFx0Y2xra1xcbmFwcGxpY2F0aW9uL3ZuZC5jcmljay5jbGlja2VyLnBhbGV0dGVcXHRcXHRjbGtwXFxuYXBwbGljYXRpb24vdm5kLmNyaWNrLmNsaWNrZXIudGVtcGxhdGVcXHRcXHRjbGt0XFxuYXBwbGljYXRpb24vdm5kLmNyaWNrLmNsaWNrZXIud29yZGJhbmtcXHRcXHRjbGt3XFxuYXBwbGljYXRpb24vdm5kLmNyaXRpY2FsdG9vbHMud2JzK3htbFxcdFxcdHdic1xcbmFwcGxpY2F0aW9uL3ZuZC5jdGMtcG9zbWxcXHRcXHRcXHRwbWxcXG5hcHBsaWNhdGlvbi92bmQuY3Vwcy1wcGRcXHRcXHRcXHRwcGRcXG5hcHBsaWNhdGlvbi92bmQuY3VybC5jYXJcXHRcXHRcXHRjYXJcXG5hcHBsaWNhdGlvbi92bmQuY3VybC5wY3VybFxcdFxcdFxcdHBjdXJsXFxuYXBwbGljYXRpb24vdm5kLmRhcnRcXHRcXHRcXHRcXHRkYXJ0XFxuYXBwbGljYXRpb24vdm5kLmRhdGEtdmlzaW9uLnJkelxcdFxcdFxcdHJkelxcbmFwcGxpY2F0aW9uL3ZuZC5kZWNlLmRhdGFcXHRcXHRcXHR1dmYgdXZ2ZiB1dmQgdXZ2ZFxcbmFwcGxpY2F0aW9uL3ZuZC5kZWNlLnR0bWwreG1sXFx0XFx0XFx0dXZ0IHV2dnRcXG5hcHBsaWNhdGlvbi92bmQuZGVjZS51bnNwZWNpZmllZFxcdFxcdHV2eCB1dnZ4XFxuYXBwbGljYXRpb24vdm5kLmRlY2UuemlwXFx0XFx0XFx0dXZ6IHV2dnpcXG5hcHBsaWNhdGlvbi92bmQuZGVub3ZvLmZjc2VsYXlvdXQtbGlua1xcdFxcdGZlX2xhdW5jaFxcbmFwcGxpY2F0aW9uL3ZuZC5kbmFcXHRcXHRcXHRcXHRkbmFcXG5hcHBsaWNhdGlvbi92bmQuZG9sYnkubWxwXFx0XFx0XFx0bWxwXFxuYXBwbGljYXRpb24vdm5kLmRwZ3JhcGhcXHRcXHRcXHRcXHRkcGdcXG5hcHBsaWNhdGlvbi92bmQuZHJlYW1mYWN0b3J5XFx0XFx0XFx0ZGZhY1xcbmFwcGxpY2F0aW9uL3ZuZC5kcy1rZXlwb2ludFxcdFxcdFxcdGtweHhcXG5hcHBsaWNhdGlvbi92bmQuZHZiLmFpdFxcdFxcdFxcdFxcdGFpdFxcbmFwcGxpY2F0aW9uL3ZuZC5kdmIuc2VydmljZVxcdFxcdFxcdHN2Y1xcbmFwcGxpY2F0aW9uL3ZuZC5keW5hZ2VvXFx0XFx0XFx0XFx0Z2VvXFxuYXBwbGljYXRpb24vdm5kLmVjb3dpbi5jaGFydFxcdFxcdFxcdG1hZ1xcbmFwcGxpY2F0aW9uL3ZuZC5lbmxpdmVuXFx0XFx0XFx0XFx0bm1sXFxuYXBwbGljYXRpb24vdm5kLmVwc29uLmVzZlxcdFxcdFxcdGVzZlxcbmFwcGxpY2F0aW9uL3ZuZC5lcHNvbi5tc2ZcXHRcXHRcXHRtc2ZcXG5hcHBsaWNhdGlvbi92bmQuZXBzb24ucXVpY2thbmltZVxcdFxcdHFhbVxcbmFwcGxpY2F0aW9uL3ZuZC5lcHNvbi5zYWx0XFx0XFx0XFx0c2x0XFxuYXBwbGljYXRpb24vdm5kLmVwc29uLnNzZlxcdFxcdFxcdHNzZlxcbmFwcGxpY2F0aW9uL3ZuZC5lc3ppZ25vMyt4bWxcXHRcXHRcXHRlczMgZXQzXFxuYXBwbGljYXRpb24vdm5kLmV6cGl4LWFsYnVtXFx0XFx0XFx0ZXoyXFxuYXBwbGljYXRpb24vdm5kLmV6cGl4LXBhY2thZ2VcXHRcXHRcXHRlejNcXG5hcHBsaWNhdGlvbi92bmQuZmRmXFx0XFx0XFx0XFx0ZmRmXFxuYXBwbGljYXRpb24vdm5kLmZkc24ubXNlZWRcXHRcXHRcXHRtc2VlZFxcbmFwcGxpY2F0aW9uL3ZuZC5mZHNuLnNlZWRcXHRcXHRcXHRzZWVkIGRhdGFsZXNzXFxuYXBwbGljYXRpb24vdm5kLmZsb2dyYXBoaXRcXHRcXHRcXHRncGhcXG5hcHBsaWNhdGlvbi92bmQuZmx1eHRpbWUuY2xpcFxcdFxcdFxcdGZ0Y1xcbmFwcGxpY2F0aW9uL3ZuZC5mcmFtZW1ha2VyXFx0XFx0XFx0Zm0gZnJhbWUgbWFrZXIgYm9va1xcbmFwcGxpY2F0aW9uL3ZuZC5mcm9nYW5zLmZuY1xcdFxcdFxcdGZuY1xcbmFwcGxpY2F0aW9uL3ZuZC5mcm9nYW5zLmx0ZlxcdFxcdFxcdGx0ZlxcbmFwcGxpY2F0aW9uL3ZuZC5mc2Mud2VibGF1bmNoXFx0XFx0XFx0ZnNjXFxuYXBwbGljYXRpb24vdm5kLmZ1aml0c3Uub2FzeXNcXHRcXHRcXHRvYXNcXG5hcHBsaWNhdGlvbi92bmQuZnVqaXRzdS5vYXN5czJcXHRcXHRcXHRvYTJcXG5hcHBsaWNhdGlvbi92bmQuZnVqaXRzdS5vYXN5czNcXHRcXHRcXHRvYTNcXG5hcHBsaWNhdGlvbi92bmQuZnVqaXRzdS5vYXN5c2dwXFx0XFx0XFx0Zmc1XFxuYXBwbGljYXRpb24vdm5kLmZ1aml0c3Uub2FzeXNwcnNcXHRcXHRiaDJcXG5hcHBsaWNhdGlvbi92bmQuZnVqaXhlcm94LmRkZFxcdFxcdFxcdGRkZFxcbmFwcGxpY2F0aW9uL3ZuZC5mdWppeGVyb3guZG9jdXdvcmtzXFx0XFx0eGR3XFxuYXBwbGljYXRpb24vdm5kLmZ1aml4ZXJveC5kb2N1d29ya3MuYmluZGVyXFx0eGJkXFxuYXBwbGljYXRpb24vdm5kLmZ1enp5c2hlZXRcXHRcXHRcXHRmenNcXG5hcHBsaWNhdGlvbi92bmQuZ2Vub21hdGl4LnR1eGVkb1xcdFxcdHR4ZFxcbmFwcGxpY2F0aW9uL3ZuZC5nZW9nZWJyYS5maWxlXFx0XFx0XFx0Z2diXFxuYXBwbGljYXRpb24vdm5kLmdlb2dlYnJhLnRvb2xcXHRcXHRcXHRnZ3RcXG5hcHBsaWNhdGlvbi92bmQuZ2VvbWV0cnktZXhwbG9yZXJcXHRcXHRnZXggZ3JlXFxuYXBwbGljYXRpb24vdm5kLmdlb25leHRcXHRcXHRcXHRcXHRneHRcXG5hcHBsaWNhdGlvbi92bmQuZ2VvcGxhblxcdFxcdFxcdFxcdGcyd1xcbmFwcGxpY2F0aW9uL3ZuZC5nZW9zcGFjZVxcdFxcdFxcdGczd1xcbmFwcGxpY2F0aW9uL3ZuZC5nbXhcXHRcXHRcXHRcXHRnbXhcXG5hcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWVhcnRoLmttbCt4bWxcXHRcXHRrbWxcXG5hcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWVhcnRoLmttelxcdFxcdGttelxcbmFwcGxpY2F0aW9uL3ZuZC5ncmFmZXFcXHRcXHRcXHRcXHRncWYgZ3FzXFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS1hY2NvdW50XFx0XFx0XFx0Z2FjXFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS1oZWxwXFx0XFx0XFx0Z2hmXFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS1pZGVudGl0eS1tZXNzYWdlXFx0XFx0Z2ltXFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS1pbmplY3RvclxcdFxcdFxcdGdydlxcbmFwcGxpY2F0aW9uL3ZuZC5ncm9vdmUtdG9vbC1tZXNzYWdlXFx0XFx0Z3RtXFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS10b29sLXRlbXBsYXRlXFx0XFx0dHBsXFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS12Y2FyZFxcdFxcdFxcdHZjZ1xcbmFwcGxpY2F0aW9uL3ZuZC5oYWwreG1sXFx0XFx0XFx0XFx0aGFsXFxuYXBwbGljYXRpb24vdm5kLmhhbmRoZWxkLWVudGVydGFpbm1lbnQreG1sXFx0em1tXFxuYXBwbGljYXRpb24vdm5kLmhiY2lcXHRcXHRcXHRcXHRoYmNpXFxuYXBwbGljYXRpb24vdm5kLmhoZS5sZXNzb24tcGxheWVyXFx0XFx0bGVzXFxuYXBwbGljYXRpb24vdm5kLmhwLWhwZ2xcXHRcXHRcXHRcXHRocGdsXFxuYXBwbGljYXRpb24vdm5kLmhwLWhwaWRcXHRcXHRcXHRcXHRocGlkXFxuYXBwbGljYXRpb24vdm5kLmhwLWhwc1xcdFxcdFxcdFxcdGhwc1xcbmFwcGxpY2F0aW9uL3ZuZC5ocC1qbHl0XFx0XFx0XFx0XFx0amx0XFxuYXBwbGljYXRpb24vdm5kLmhwLXBjbFxcdFxcdFxcdFxcdHBjbFxcbmFwcGxpY2F0aW9uL3ZuZC5ocC1wY2x4bFxcdFxcdFxcdHBjbHhsXFxuYXBwbGljYXRpb24vdm5kLmh5ZHJvc3RhdGl4LnNvZi1kYXRhXFx0XFx0c2ZkLWhkc3R4XFxuYXBwbGljYXRpb24vdm5kLmlibS5taW5pcGF5XFx0XFx0XFx0bXB5XFxuYXBwbGljYXRpb24vdm5kLmlibS5tb2RjYXBcXHRcXHRcXHRhZnAgbGlzdGFmcCBsaXN0MzgyMFxcbmFwcGxpY2F0aW9uL3ZuZC5pYm0ucmlnaHRzLW1hbmFnZW1lbnRcXHRcXHRpcm1cXG5hcHBsaWNhdGlvbi92bmQuaWJtLnNlY3VyZS1jb250YWluZXJcXHRcXHRzY1xcbmFwcGxpY2F0aW9uL3ZuZC5pY2Nwcm9maWxlXFx0XFx0XFx0aWNjIGljbVxcbmFwcGxpY2F0aW9uL3ZuZC5pZ2xvYWRlclxcdFxcdFxcdGlnbFxcbmFwcGxpY2F0aW9uL3ZuZC5pbW1lcnZpc2lvbi1pdnBcXHRcXHRcXHRpdnBcXG5hcHBsaWNhdGlvbi92bmQuaW1tZXJ2aXNpb24taXZ1XFx0XFx0XFx0aXZ1XFxuYXBwbGljYXRpb24vdm5kLmluc29ycy5pZ21cXHRcXHRcXHRpZ21cXG5hcHBsaWNhdGlvbi92bmQuaW50ZXJjb24uZm9ybW5ldFxcdFxcdHhwdyB4cHhcXG5hcHBsaWNhdGlvbi92bmQuaW50ZXJnZW9cXHRcXHRcXHRpMmdcXG5hcHBsaWNhdGlvbi92bmQuaW50dS5xYm9cXHRcXHRcXHRxYm9cXG5hcHBsaWNhdGlvbi92bmQuaW50dS5xZnhcXHRcXHRcXHRxZnhcXG5hcHBsaWNhdGlvbi92bmQuaXB1bnBsdWdnZWQucmNwcm9maWxlXFx0XFx0cmNwcm9maWxlXFxuYXBwbGljYXRpb24vdm5kLmlyZXBvc2l0b3J5LnBhY2thZ2UreG1sXFx0XFx0aXJwXFxuYXBwbGljYXRpb24vdm5kLmlzLXhwclxcdFxcdFxcdFxcdHhwclxcbmFwcGxpY2F0aW9uL3ZuZC5pc2FjLmZjc1xcdFxcdFxcdGZjc1xcbmFwcGxpY2F0aW9uL3ZuZC5qYW1cXHRcXHRcXHRcXHRqYW1cXG5hcHBsaWNhdGlvbi92bmQuamNwLmphdmFtZS5taWRsZXQtcm1zXFx0XFx0cm1zXFxuYXBwbGljYXRpb24vdm5kLmppc3BcXHRcXHRcXHRcXHRqaXNwXFxuYXBwbGljYXRpb24vdm5kLmpvb3N0LmpvZGEtYXJjaGl2ZVxcdFxcdGpvZGFcXG5hcHBsaWNhdGlvbi92bmQua2Fob290elxcdFxcdFxcdFxcdGt0eiBrdHJcXG5hcHBsaWNhdGlvbi92bmQua2RlLmthcmJvblxcdFxcdFxcdGthcmJvblxcbmFwcGxpY2F0aW9uL3ZuZC5rZGUua2NoYXJ0XFx0XFx0XFx0Y2hydFxcbmFwcGxpY2F0aW9uL3ZuZC5rZGUua2Zvcm11bGFcXHRcXHRcXHRrZm9cXG5hcHBsaWNhdGlvbi92bmQua2RlLmtpdmlvXFx0XFx0XFx0Zmx3XFxuYXBwbGljYXRpb24vdm5kLmtkZS5rb250b3VyXFx0XFx0XFx0a29uXFxuYXBwbGljYXRpb24vdm5kLmtkZS5rcHJlc2VudGVyXFx0XFx0XFx0a3ByIGtwdFxcbmFwcGxpY2F0aW9uL3ZuZC5rZGUua3NwcmVhZFxcdFxcdFxcdGtzcFxcbmFwcGxpY2F0aW9uL3ZuZC5rZGUua3dvcmRcXHRcXHRcXHRrd2Qga3d0XFxuYXBwbGljYXRpb24vdm5kLmtlbmFtZWFhcHBcXHRcXHRcXHRodGtlXFxuYXBwbGljYXRpb24vdm5kLmtpZHNwaXJhdGlvblxcdFxcdFxcdGtpYVxcbmFwcGxpY2F0aW9uL3ZuZC5raW5hclxcdFxcdFxcdFxcdGtuZSBrbnBcXG5hcHBsaWNhdGlvbi92bmQua29hblxcdFxcdFxcdFxcdHNrcCBza2Qgc2t0IHNrbVxcbmFwcGxpY2F0aW9uL3ZuZC5rb2Rhay1kZXNjcmlwdG9yXFx0XFx0c3NlXFxuYXBwbGljYXRpb24vdm5kLmxhcy5sYXMreG1sXFx0XFx0XFx0bGFzeG1sXFxuYXBwbGljYXRpb24vdm5kLmxsYW1hZ3JhcGhpY3MubGlmZS1iYWxhbmNlLmRlc2t0b3BcXHRsYmRcXG5hcHBsaWNhdGlvbi92bmQubGxhbWFncmFwaGljcy5saWZlLWJhbGFuY2UuZXhjaGFuZ2UreG1sXFx0bGJlXFxuYXBwbGljYXRpb24vdm5kLmxvdHVzLTEtMi0zXFx0XFx0XFx0MTIzXFxuYXBwbGljYXRpb24vdm5kLmxvdHVzLWFwcHJvYWNoXFx0XFx0XFx0YXByXFxuYXBwbGljYXRpb24vdm5kLmxvdHVzLWZyZWVsYW5jZVxcdFxcdFxcdHByZVxcbmFwcGxpY2F0aW9uL3ZuZC5sb3R1cy1ub3Rlc1xcdFxcdFxcdG5zZlxcbmFwcGxpY2F0aW9uL3ZuZC5sb3R1cy1vcmdhbml6ZXJcXHRcXHRcXHRvcmdcXG5hcHBsaWNhdGlvbi92bmQubG90dXMtc2NyZWVuY2FtXFx0XFx0XFx0c2NtXFxuYXBwbGljYXRpb24vdm5kLmxvdHVzLXdvcmRwcm9cXHRcXHRcXHRsd3BcXG5hcHBsaWNhdGlvbi92bmQubWFjcG9ydHMucG9ydHBrZ1xcdFxcdHBvcnRwa2dcXG5hcHBsaWNhdGlvbi92bmQubWNkXFx0XFx0XFx0XFx0bWNkXFxuYXBwbGljYXRpb24vdm5kLm1lZGNhbGNkYXRhXFx0XFx0XFx0bWMxXFxuYXBwbGljYXRpb24vdm5kLm1lZGlhc3RhdGlvbi5jZGtleVxcdFxcdGNka2V5XFxuYXBwbGljYXRpb24vdm5kLm1mZXJcXHRcXHRcXHRcXHRtd2ZcXG5hcHBsaWNhdGlvbi92bmQubWZtcFxcdFxcdFxcdFxcdG1mbVxcbmFwcGxpY2F0aW9uL3ZuZC5taWNyb2dyYWZ4LmZsb1xcdFxcdFxcdGZsb1xcbmFwcGxpY2F0aW9uL3ZuZC5taWNyb2dyYWZ4LmlneFxcdFxcdFxcdGlneFxcbmFwcGxpY2F0aW9uL3ZuZC5taWZcXHRcXHRcXHRcXHRtaWZcXG5hcHBsaWNhdGlvbi92bmQubW9iaXVzLmRhZlxcdFxcdFxcdGRhZlxcbmFwcGxpY2F0aW9uL3ZuZC5tb2JpdXMuZGlzXFx0XFx0XFx0ZGlzXFxuYXBwbGljYXRpb24vdm5kLm1vYml1cy5tYmtcXHRcXHRcXHRtYmtcXG5hcHBsaWNhdGlvbi92bmQubW9iaXVzLm1xeVxcdFxcdFxcdG1xeVxcbmFwcGxpY2F0aW9uL3ZuZC5tb2JpdXMubXNsXFx0XFx0XFx0bXNsXFxuYXBwbGljYXRpb24vdm5kLm1vYml1cy5wbGNcXHRcXHRcXHRwbGNcXG5hcHBsaWNhdGlvbi92bmQubW9iaXVzLnR4ZlxcdFxcdFxcdHR4ZlxcbmFwcGxpY2F0aW9uL3ZuZC5tb3BodW4uYXBwbGljYXRpb25cXHRcXHRtcG5cXG5hcHBsaWNhdGlvbi92bmQubW9waHVuLmNlcnRpZmljYXRlXFx0XFx0bXBjXFxuYXBwbGljYXRpb24vdm5kLm1vemlsbGEueHVsK3htbFxcdFxcdFxcdHh1bFxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1hcnRnYWxyeVxcdFxcdFxcdGNpbFxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1jYWItY29tcHJlc3NlZFxcdFxcdGNhYlxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbFxcdFxcdFxcdHhscyB4bG0geGxhIHhsYyB4bHQgeGx3XFxuYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsLmFkZGluLm1hY3JvZW5hYmxlZC4xMlxcdFxcdHhsYW1cXG5hcHBsaWNhdGlvbi92bmQubXMtZXhjZWwuc2hlZXQuYmluYXJ5Lm1hY3JvZW5hYmxlZC4xMlxcdHhsc2JcXG5hcHBsaWNhdGlvbi92bmQubXMtZXhjZWwuc2hlZXQubWFjcm9lbmFibGVkLjEyXFx0XFx0eGxzbVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbC50ZW1wbGF0ZS5tYWNyb2VuYWJsZWQuMTJcXHR4bHRtXFxuYXBwbGljYXRpb24vdm5kLm1zLWZvbnRvYmplY3RcXHRcXHRcXHRlb3RcXG5hcHBsaWNhdGlvbi92bmQubXMtaHRtbGhlbHBcXHRcXHRcXHRjaG1cXG5hcHBsaWNhdGlvbi92bmQubXMtaW1zXFx0XFx0XFx0XFx0aW1zXFxuYXBwbGljYXRpb24vdm5kLm1zLWxybVxcdFxcdFxcdFxcdGxybVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1vZmZpY2V0aGVtZVxcdFxcdFxcdHRobXhcXG5hcHBsaWNhdGlvbi92bmQubXMtcGtpLnNlY2NhdFxcdFxcdFxcdGNhdFxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1wa2kuc3RsXFx0XFx0XFx0c3RsXFxuYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnRcXHRcXHRcXHRwcHQgcHBzIHBvdFxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50LmFkZGluLm1hY3JvZW5hYmxlZC4xMlxcdFxcdHBwYW1cXG5hcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludC5wcmVzZW50YXRpb24ubWFjcm9lbmFibGVkLjEyXFx0cHB0bVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50LnNsaWRlLm1hY3JvZW5hYmxlZC4xMlxcdFxcdHNsZG1cXG5hcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludC5zbGlkZXNob3cubWFjcm9lbmFibGVkLjEyXFx0XFx0cHBzbVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50LnRlbXBsYXRlLm1hY3JvZW5hYmxlZC4xMlxcdFxcdHBvdG1cXG5hcHBsaWNhdGlvbi92bmQubXMtcHJvamVjdFxcdFxcdFxcdG1wcCBtcHRcXG5hcHBsaWNhdGlvbi92bmQubXMtd29yZC5kb2N1bWVudC5tYWNyb2VuYWJsZWQuMTJcXHRkb2NtXFxuYXBwbGljYXRpb24vdm5kLm1zLXdvcmQudGVtcGxhdGUubWFjcm9lbmFibGVkLjEyXFx0ZG90bVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy13b3Jrc1xcdFxcdFxcdHdwcyB3a3Mgd2NtIHdkYlxcbmFwcGxpY2F0aW9uL3ZuZC5tcy13cGxcXHRcXHRcXHRcXHR3cGxcXG5hcHBsaWNhdGlvbi92bmQubXMteHBzZG9jdW1lbnRcXHRcXHRcXHR4cHNcXG5hcHBsaWNhdGlvbi92bmQubXNlcVxcdFxcdFxcdFxcdG1zZXFcXG5hcHBsaWNhdGlvbi92bmQubXVzaWNpYW5cXHRcXHRcXHRtdXNcXG5hcHBsaWNhdGlvbi92bmQubXV2ZWUuc3R5bGVcXHRcXHRcXHRtc3R5XFxuYXBwbGljYXRpb24vdm5kLm15bmZjXFx0XFx0XFx0XFx0dGFnbGV0XFxuYXBwbGljYXRpb24vdm5kLm5ldXJvbGFuZ3VhZ2Uubmx1XFx0XFx0bmx1XFxuYXBwbGljYXRpb24vdm5kLm5pdGZcXHRcXHRcXHRcXHRudGYgbml0ZlxcbmFwcGxpY2F0aW9uL3ZuZC5ub2JsZW5ldC1kaXJlY3RvcnlcXHRcXHRubmRcXG5hcHBsaWNhdGlvbi92bmQubm9ibGVuZXQtc2VhbGVyXFx0XFx0XFx0bm5zXFxuYXBwbGljYXRpb24vdm5kLm5vYmxlbmV0LXdlYlxcdFxcdFxcdG5ud1xcbmFwcGxpY2F0aW9uL3ZuZC5ub2tpYS5uLWdhZ2UuZGF0YVxcdFxcdG5nZGF0XFxuYXBwbGljYXRpb24vdm5kLm5va2lhLm4tZ2FnZS5zeW1iaWFuLmluc3RhbGxcXHRuLWdhZ2VcXG5hcHBsaWNhdGlvbi92bmQubm9raWEucmFkaW8tcHJlc2V0XFx0XFx0cnBzdFxcbmFwcGxpY2F0aW9uL3ZuZC5ub2tpYS5yYWRpby1wcmVzZXRzXFx0XFx0cnBzc1xcbmFwcGxpY2F0aW9uL3ZuZC5ub3ZhZGlnbS5lZG1cXHRcXHRcXHRlZG1cXG5hcHBsaWNhdGlvbi92bmQubm92YWRpZ20uZWR4XFx0XFx0XFx0ZWR4XFxuYXBwbGljYXRpb24vdm5kLm5vdmFkaWdtLmV4dFxcdFxcdFxcdGV4dFxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuY2hhcnRcXHRcXHRvZGNcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LmNoYXJ0LXRlbXBsYXRlXFx0b3RjXFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5kYXRhYmFzZVxcdFxcdG9kYlxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuZm9ybXVsYVxcdFxcdG9kZlxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuZm9ybXVsYS10ZW1wbGF0ZVxcdG9kZnRcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LmdyYXBoaWNzXFx0XFx0b2RnXFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5ncmFwaGljcy10ZW1wbGF0ZVxcdG90Z1xcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuaW1hZ2VcXHRcXHRvZGlcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LmltYWdlLXRlbXBsYXRlXFx0b3RpXFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5wcmVzZW50YXRpb25cXHRcXHRvZHBcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnByZXNlbnRhdGlvbi10ZW1wbGF0ZVxcdG90cFxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuc3ByZWFkc2hlZXRcXHRcXHRvZHNcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnNwcmVhZHNoZWV0LXRlbXBsYXRlXFx0b3RzXFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC50ZXh0XFx0XFx0XFx0b2R0XFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC50ZXh0LW1hc3RlclxcdFxcdG9kbVxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQudGV4dC10ZW1wbGF0ZVxcdG90dFxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQudGV4dC13ZWJcXHRcXHRvdGhcXG5hcHBsaWNhdGlvbi92bmQub2xwYy1zdWdhclxcdFxcdFxcdHhvXFxuYXBwbGljYXRpb24vdm5kLm9tYS5kZDIreG1sXFx0XFx0XFx0ZGQyXFxuYXBwbGljYXRpb24vdm5kLm9wZW5vZmZpY2VvcmcuZXh0ZW5zaW9uXFx0XFx0b3h0XFxuYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnByZXNlbnRhdGlvblxcdHBwdHhcXG5hcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwuc2xpZGVcXHRzbGR4XFxuYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnNsaWRlc2hvd1xcdHBwc3hcXG5hcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwudGVtcGxhdGVcXHRwb3R4XFxuYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXRcXHR4bHN4XFxuYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwudGVtcGxhdGVcXHR4bHR4XFxuYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwuZG9jdW1lbnRcXHRkb2N4XFxuYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwudGVtcGxhdGVcXHRkb3R4XFxuYXBwbGljYXRpb24vdm5kLm9zZ2VvLm1hcGd1aWRlLnBhY2thZ2VcXHRcXHRtZ3BcXG5hcHBsaWNhdGlvbi92bmQub3NnaS5kcFxcdFxcdFxcdFxcdGRwXFxuYXBwbGljYXRpb24vdm5kLm9zZ2kuc3Vic3lzdGVtXFx0XFx0XFx0ZXNhXFxuYXBwbGljYXRpb24vdm5kLnBhbG1cXHRcXHRcXHRcXHRwZGIgcHFhIG9wcmNcXG5hcHBsaWNhdGlvbi92bmQucGF3YWFmaWxlXFx0XFx0XFx0cGF3XFxuYXBwbGljYXRpb24vdm5kLnBnLmZvcm1hdFxcdFxcdFxcdHN0clxcbmFwcGxpY2F0aW9uL3ZuZC5wZy5vc2FzbGlcXHRcXHRcXHRlaTZcXG5hcHBsaWNhdGlvbi92bmQucGljc2VsXFx0XFx0XFx0XFx0ZWZpZlxcbmFwcGxpY2F0aW9uL3ZuZC5wbWkud2lkZ2V0XFx0XFx0XFx0d2dcXG5hcHBsaWNhdGlvbi92bmQucG9ja2V0bGVhcm5cXHRcXHRcXHRwbGZcXG5hcHBsaWNhdGlvbi92bmQucG93ZXJidWlsZGVyNlxcdFxcdFxcdHBiZFxcbmFwcGxpY2F0aW9uL3ZuZC5wcmV2aWV3c3lzdGVtcy5ib3hcXHRcXHRib3hcXG5hcHBsaWNhdGlvbi92bmQucHJvdGV1cy5tYWdhemluZVxcdFxcdG1nelxcbmFwcGxpY2F0aW9uL3ZuZC5wdWJsaXNoYXJlLWRlbHRhLXRyZWVcXHRcXHRxcHNcXG5hcHBsaWNhdGlvbi92bmQucHZpLnB0aWQxXFx0XFx0XFx0cHRpZFxcbmFwcGxpY2F0aW9uL3ZuZC5xdWFyay5xdWFya3hwcmVzc1xcdFxcdHF4ZCBxeHQgcXdkIHF3dCBxeGwgcXhiXFxuYXBwbGljYXRpb24vdm5kLnJlYWx2bmMuYmVkXFx0XFx0XFx0YmVkXFxuYXBwbGljYXRpb24vdm5kLnJlY29yZGFyZS5tdXNpY3htbFxcdFxcdG14bFxcbmFwcGxpY2F0aW9uL3ZuZC5yZWNvcmRhcmUubXVzaWN4bWwreG1sXFx0XFx0bXVzaWN4bWxcXG5hcHBsaWNhdGlvbi92bmQucmlnLmNyeXB0b25vdGVcXHRcXHRcXHRjcnlwdG9ub3RlXFxuYXBwbGljYXRpb24vdm5kLnJpbS5jb2RcXHRcXHRcXHRcXHRjb2RcXG5hcHBsaWNhdGlvbi92bmQucm4tcmVhbG1lZGlhXFx0XFx0XFx0cm1cXG5hcHBsaWNhdGlvbi92bmQucm4tcmVhbG1lZGlhLXZiclxcdFxcdHJtdmJcXG5hcHBsaWNhdGlvbi92bmQucm91dGU2Ni5saW5rNjYreG1sXFx0XFx0bGluazY2XFxuYXBwbGljYXRpb24vdm5kLnNhaWxpbmd0cmFja2VyLnRyYWNrXFx0XFx0c3RcXG5hcHBsaWNhdGlvbi92bmQuc2VlbWFpbFxcdFxcdFxcdFxcdHNlZVxcbmFwcGxpY2F0aW9uL3ZuZC5zZW1hXFx0XFx0XFx0XFx0c2VtYVxcbmFwcGxpY2F0aW9uL3ZuZC5zZW1kXFx0XFx0XFx0XFx0c2VtZFxcbmFwcGxpY2F0aW9uL3ZuZC5zZW1mXFx0XFx0XFx0XFx0c2VtZlxcbmFwcGxpY2F0aW9uL3ZuZC5zaGFuYS5pbmZvcm1lZC5mb3JtZGF0YVxcdFxcdGlmbVxcbmFwcGxpY2F0aW9uL3ZuZC5zaGFuYS5pbmZvcm1lZC5mb3JtdGVtcGxhdGVcXHRpdHBcXG5hcHBsaWNhdGlvbi92bmQuc2hhbmEuaW5mb3JtZWQuaW50ZXJjaGFuZ2VcXHRpaWZcXG5hcHBsaWNhdGlvbi92bmQuc2hhbmEuaW5mb3JtZWQucGFja2FnZVxcdFxcdGlwa1xcbmFwcGxpY2F0aW9uL3ZuZC5zaW10ZWNoLW1pbmRtYXBwZXJcXHRcXHR0d2QgdHdkc1xcbmFwcGxpY2F0aW9uL3ZuZC5zbWFmXFx0XFx0XFx0XFx0bW1mXFxuYXBwbGljYXRpb24vdm5kLnNtYXJ0LnRlYWNoZXJcXHRcXHRcXHR0ZWFjaGVyXFxuYXBwbGljYXRpb24vdm5kLnNvbGVudC5zZGttK3htbFxcdFxcdFxcdHNka20gc2RrZFxcbmFwcGxpY2F0aW9uL3ZuZC5zcG90ZmlyZS5keHBcXHRcXHRcXHRkeHBcXG5hcHBsaWNhdGlvbi92bmQuc3BvdGZpcmUuc2ZzXFx0XFx0XFx0c2ZzXFxuYXBwbGljYXRpb24vdm5kLnN0YXJkaXZpc2lvbi5jYWxjXFx0XFx0c2RjXFxuYXBwbGljYXRpb24vdm5kLnN0YXJkaXZpc2lvbi5kcmF3XFx0XFx0c2RhXFxuYXBwbGljYXRpb24vdm5kLnN0YXJkaXZpc2lvbi5pbXByZXNzXFx0XFx0c2RkXFxuYXBwbGljYXRpb24vdm5kLnN0YXJkaXZpc2lvbi5tYXRoXFx0XFx0c21mXFxuYXBwbGljYXRpb24vdm5kLnN0YXJkaXZpc2lvbi53cml0ZXJcXHRcXHRzZHcgdm9yXFxuYXBwbGljYXRpb24vdm5kLnN0YXJkaXZpc2lvbi53cml0ZXItZ2xvYmFsXFx0c2dsXFxuYXBwbGljYXRpb24vdm5kLnN0ZXBtYW5pYS5wYWNrYWdlXFx0XFx0c216aXBcXG5hcHBsaWNhdGlvbi92bmQuc3RlcG1hbmlhLnN0ZXBjaGFydFxcdFxcdHNtXFxuYXBwbGljYXRpb24vdm5kLnN1bi54bWwuY2FsY1xcdFxcdFxcdHN4Y1xcbmFwcGxpY2F0aW9uL3ZuZC5zdW4ueG1sLmNhbGMudGVtcGxhdGVcXHRcXHRzdGNcXG5hcHBsaWNhdGlvbi92bmQuc3VuLnhtbC5kcmF3XFx0XFx0XFx0c3hkXFxuYXBwbGljYXRpb24vdm5kLnN1bi54bWwuZHJhdy50ZW1wbGF0ZVxcdFxcdHN0ZFxcbmFwcGxpY2F0aW9uL3ZuZC5zdW4ueG1sLmltcHJlc3NcXHRcXHRcXHRzeGlcXG5hcHBsaWNhdGlvbi92bmQuc3VuLnhtbC5pbXByZXNzLnRlbXBsYXRlXFx0c3RpXFxuYXBwbGljYXRpb24vdm5kLnN1bi54bWwubWF0aFxcdFxcdFxcdHN4bVxcbmFwcGxpY2F0aW9uL3ZuZC5zdW4ueG1sLndyaXRlclxcdFxcdFxcdHN4d1xcbmFwcGxpY2F0aW9uL3ZuZC5zdW4ueG1sLndyaXRlci5nbG9iYWxcXHRcXHRzeGdcXG5hcHBsaWNhdGlvbi92bmQuc3VuLnhtbC53cml0ZXIudGVtcGxhdGVcXHRcXHRzdHdcXG5hcHBsaWNhdGlvbi92bmQuc3VzLWNhbGVuZGFyXFx0XFx0XFx0c3VzIHN1c3BcXG5hcHBsaWNhdGlvbi92bmQuc3ZkXFx0XFx0XFx0XFx0c3ZkXFxuYXBwbGljYXRpb24vdm5kLnN5bWJpYW4uaW5zdGFsbFxcdFxcdFxcdHNpcyBzaXN4XFxuYXBwbGljYXRpb24vdm5kLnN5bmNtbCt4bWxcXHRcXHRcXHR4c21cXG5hcHBsaWNhdGlvbi92bmQuc3luY21sLmRtK3dieG1sXFx0XFx0XFx0YmRtXFxuYXBwbGljYXRpb24vdm5kLnN5bmNtbC5kbSt4bWxcXHRcXHRcXHR4ZG1cXG5hcHBsaWNhdGlvbi92bmQudGFvLmludGVudC1tb2R1bGUtYXJjaGl2ZVxcdHRhb1xcbmFwcGxpY2F0aW9uL3ZuZC50Y3BkdW1wLnBjYXBcXHRcXHRcXHRwY2FwIGNhcCBkbXBcXG5hcHBsaWNhdGlvbi92bmQudG1vYmlsZS1saXZldHZcXHRcXHRcXHR0bW9cXG5hcHBsaWNhdGlvbi92bmQudHJpZC50cHRcXHRcXHRcXHR0cHRcXG5hcHBsaWNhdGlvbi92bmQudHJpc2NhcGUubXhzXFx0XFx0XFx0bXhzXFxuYXBwbGljYXRpb24vdm5kLnRydWVhcHBcXHRcXHRcXHRcXHR0cmFcXG5hcHBsaWNhdGlvbi92bmQudWZkbFxcdFxcdFxcdFxcdHVmZCB1ZmRsXFxuYXBwbGljYXRpb24vdm5kLnVpcS50aGVtZVxcdFxcdFxcdHV0elxcbmFwcGxpY2F0aW9uL3ZuZC51bWFqaW5cXHRcXHRcXHRcXHR1bWpcXG5hcHBsaWNhdGlvbi92bmQudW5pdHlcXHRcXHRcXHRcXHR1bml0eXdlYlxcbmFwcGxpY2F0aW9uL3ZuZC51b21sK3htbFxcdFxcdFxcdHVvbWxcXG5hcHBsaWNhdGlvbi92bmQudmN4XFx0XFx0XFx0XFx0dmN4XFxuYXBwbGljYXRpb24vdm5kLnZpc2lvXFx0XFx0XFx0XFx0dnNkIHZzdCB2c3MgdnN3XFxuYXBwbGljYXRpb24vdm5kLnZpc2lvbmFyeVxcdFxcdFxcdHZpc1xcbmFwcGxpY2F0aW9uL3ZuZC52c2ZcXHRcXHRcXHRcXHR2c2ZcXG5hcHBsaWNhdGlvbi92bmQud2FwLndieG1sXFx0XFx0XFx0d2J4bWxcXG5hcHBsaWNhdGlvbi92bmQud2FwLndtbGNcXHRcXHRcXHR3bWxjXFxuYXBwbGljYXRpb24vdm5kLndhcC53bWxzY3JpcHRjXFx0XFx0XFx0d21sc2NcXG5hcHBsaWNhdGlvbi92bmQud2VidHVyYm9cXHRcXHRcXHR3dGJcXG5hcHBsaWNhdGlvbi92bmQud29sZnJhbS5wbGF5ZXJcXHRcXHRcXHRuYnBcXG5hcHBsaWNhdGlvbi92bmQud29yZHBlcmZlY3RcXHRcXHRcXHR3cGRcXG5hcHBsaWNhdGlvbi92bmQud3FkXFx0XFx0XFx0XFx0d3FkXFxuYXBwbGljYXRpb24vdm5kLnd0LnN0ZlxcdFxcdFxcdFxcdHN0ZlxcbmFwcGxpY2F0aW9uL3ZuZC54YXJhXFx0XFx0XFx0XFx0eGFyXFxuYXBwbGljYXRpb24vdm5kLnhmZGxcXHRcXHRcXHRcXHR4ZmRsXFxuYXBwbGljYXRpb24vdm5kLnlhbWFoYS5odi1kaWNcXHRcXHRcXHRodmRcXG5hcHBsaWNhdGlvbi92bmQueWFtYWhhLmh2LXNjcmlwdFxcdFxcdGh2c1xcbmFwcGxpY2F0aW9uL3ZuZC55YW1haGEuaHYtdm9pY2VcXHRcXHRcXHRodnBcXG5hcHBsaWNhdGlvbi92bmQueWFtYWhhLm9wZW5zY29yZWZvcm1hdFxcdFxcdFxcdG9zZlxcbmFwcGxpY2F0aW9uL3ZuZC55YW1haGEub3BlbnNjb3JlZm9ybWF0Lm9zZnB2Zyt4bWxcXHRvc2ZwdmdcXG5hcHBsaWNhdGlvbi92bmQueWFtYWhhLnNtYWYtYXVkaW9cXHRcXHRzYWZcXG5hcHBsaWNhdGlvbi92bmQueWFtYWhhLnNtYWYtcGhyYXNlXFx0XFx0c3BmXFxuYXBwbGljYXRpb24vdm5kLnllbGxvd3JpdmVyLWN1c3RvbS1tZW51XFx0XFx0Y21wXFxuYXBwbGljYXRpb24vdm5kLnp1bFxcdFxcdFxcdFxcdHppciB6aXJ6XFxuYXBwbGljYXRpb24vdm5kLnp6YXp6LmRlY2sreG1sXFx0XFx0XFx0emF6XFxuYXBwbGljYXRpb24vdm9pY2V4bWwreG1sXFx0XFx0XFx0dnhtbFxcbmFwcGxpY2F0aW9uL3dhc21cXHRcXHRcXHRcXHR3YXNtXFxuYXBwbGljYXRpb24vd2lkZ2V0XFx0XFx0XFx0XFx0d2d0XFxuYXBwbGljYXRpb24vd2luaGxwXFx0XFx0XFx0XFx0aGxwXFxuYXBwbGljYXRpb24vd3NkbCt4bWxcXHRcXHRcXHRcXHR3c2RsXFxuYXBwbGljYXRpb24vd3Nwb2xpY3kreG1sXFx0XFx0XFx0d3Nwb2xpY3lcXG5hcHBsaWNhdGlvbi94LTd6LWNvbXByZXNzZWRcXHRcXHRcXHQ3elxcbmFwcGxpY2F0aW9uL3gtYWJpd29yZFxcdFxcdFxcdFxcdGFid1xcbmFwcGxpY2F0aW9uL3gtYWNlLWNvbXByZXNzZWRcXHRcXHRcXHRhY2VcXG5hcHBsaWNhdGlvbi94LWFwcGxlLWRpc2tpbWFnZVxcdFxcdFxcdGRtZ1xcbmFwcGxpY2F0aW9uL3gtYXV0aG9yd2FyZS1iaW5cXHRcXHRcXHRhYWIgeDMyIHUzMiB2b3hcXG5hcHBsaWNhdGlvbi94LWF1dGhvcndhcmUtbWFwXFx0XFx0XFx0YWFtXFxuYXBwbGljYXRpb24veC1hdXRob3J3YXJlLXNlZ1xcdFxcdFxcdGFhc1xcbmFwcGxpY2F0aW9uL3gtYmNwaW9cXHRcXHRcXHRcXHRiY3Bpb1xcbmFwcGxpY2F0aW9uL3gtYml0dG9ycmVudFxcdFxcdFxcdHRvcnJlbnRcXG5hcHBsaWNhdGlvbi94LWJsb3JiXFx0XFx0XFx0XFx0YmxiIGJsb3JiXFxuYXBwbGljYXRpb24veC1iemlwXFx0XFx0XFx0XFx0YnpcXG5hcHBsaWNhdGlvbi94LWJ6aXAyXFx0XFx0XFx0XFx0YnoyIGJvelxcbmFwcGxpY2F0aW9uL3gtY2JyXFx0XFx0XFx0XFx0Y2JyIGNiYSBjYnQgY2J6IGNiN1xcbmFwcGxpY2F0aW9uL3gtY2RsaW5rXFx0XFx0XFx0XFx0dmNkXFxuYXBwbGljYXRpb24veC1jZnMtY29tcHJlc3NlZFxcdFxcdFxcdGNmc1xcbmFwcGxpY2F0aW9uL3gtY2hhdFxcdFxcdFxcdFxcdGNoYXRcXG5hcHBsaWNhdGlvbi94LWNoZXNzLXBnblxcdFxcdFxcdFxcdHBnblxcbmFwcGxpY2F0aW9uL3gtY29uZmVyZW5jZVxcdFxcdFxcdG5zY1xcbmFwcGxpY2F0aW9uL3gtY3Bpb1xcdFxcdFxcdFxcdGNwaW9cXG5hcHBsaWNhdGlvbi94LWNzaFxcdFxcdFxcdFxcdGNzaFxcbmFwcGxpY2F0aW9uL3gtZGViaWFuLXBhY2thZ2VcXHRcXHRcXHRkZWIgdWRlYlxcbmFwcGxpY2F0aW9uL3gtZGdjLWNvbXByZXNzZWRcXHRcXHRcXHRkZ2NcXG5hcHBsaWNhdGlvbi94LWRpcmVjdG9yXFx0XFx0XFx0ZGlyIGRjciBkeHIgY3N0IGNjdCBjeHQgdzNkIGZnZCBzd2FcXG5hcHBsaWNhdGlvbi94LWRvb21cXHRcXHRcXHRcXHR3YWRcXG5hcHBsaWNhdGlvbi94LWR0Ym5jeCt4bWxcXHRcXHRcXHRuY3hcXG5hcHBsaWNhdGlvbi94LWR0Ym9vayt4bWxcXHRcXHRcXHRkdGJcXG5hcHBsaWNhdGlvbi94LWR0YnJlc291cmNlK3htbFxcdFxcdFxcdHJlc1xcbmFwcGxpY2F0aW9uL3gtZHZpXFx0XFx0XFx0XFx0ZHZpXFxuYXBwbGljYXRpb24veC1lbnZveVxcdFxcdFxcdFxcdGV2eVxcbmFwcGxpY2F0aW9uL3gtZXZhXFx0XFx0XFx0XFx0ZXZhXFxuYXBwbGljYXRpb24veC1mb250LWJkZlxcdFxcdFxcdFxcdGJkZlxcbmFwcGxpY2F0aW9uL3gtZm9udC1naG9zdHNjcmlwdFxcdFxcdFxcdGdzZlxcbmFwcGxpY2F0aW9uL3gtZm9udC1saW51eC1wc2ZcXHRcXHRcXHRwc2ZcXG5hcHBsaWNhdGlvbi94LWZvbnQtcGNmXFx0XFx0XFx0XFx0cGNmXFxuYXBwbGljYXRpb24veC1mb250LXNuZlxcdFxcdFxcdFxcdHNuZlxcbmFwcGxpY2F0aW9uL3gtZm9udC10eXBlMVxcdFxcdFxcdHBmYSBwZmIgcGZtIGFmbVxcbmFwcGxpY2F0aW9uL3gtZnJlZWFyY1xcdFxcdFxcdFxcdGFyY1xcbmFwcGxpY2F0aW9uL3gtZnV0dXJlc3BsYXNoXFx0XFx0XFx0c3BsXFxuYXBwbGljYXRpb24veC1nY2EtY29tcHJlc3NlZFxcdFxcdFxcdGdjYVxcbmFwcGxpY2F0aW9uL3gtZ2x1bHhcXHRcXHRcXHRcXHR1bHhcXG5hcHBsaWNhdGlvbi94LWdudW1lcmljXFx0XFx0XFx0XFx0Z251bWVyaWNcXG5hcHBsaWNhdGlvbi94LWdyYW1wcy14bWxcXHRcXHRcXHRncmFtcHNcXG5hcHBsaWNhdGlvbi94LWd0YXJcXHRcXHRcXHRcXHRndGFyXFxuYXBwbGljYXRpb24veC1oZGZcXHRcXHRcXHRcXHRoZGZcXG5hcHBsaWNhdGlvbi94LWluc3RhbGwtaW5zdHJ1Y3Rpb25zXFx0XFx0aW5zdGFsbFxcbmFwcGxpY2F0aW9uL3gtaXNvOTY2MC1pbWFnZVxcdFxcdFxcdGlzb1xcbmFwcGxpY2F0aW9uL3gtamF2YS1qbmxwLWZpbGVcXHRcXHRcXHRqbmxwXFxuYXBwbGljYXRpb24veC1sYXRleFxcdFxcdFxcdFxcdGxhdGV4XFxuYXBwbGljYXRpb24veC1semgtY29tcHJlc3NlZFxcdFxcdFxcdGx6aCBsaGFcXG5hcHBsaWNhdGlvbi94LW1pZVxcdFxcdFxcdFxcdG1pZVxcbmFwcGxpY2F0aW9uL3gtbW9iaXBvY2tldC1lYm9va1xcdFxcdFxcdHByYyBtb2JpXFxuYXBwbGljYXRpb24veC1tcy1hcHBsaWNhdGlvblxcdFxcdFxcdGFwcGxpY2F0aW9uXFxuYXBwbGljYXRpb24veC1tcy1zaG9ydGN1dFxcdFxcdFxcdGxua1xcbmFwcGxpY2F0aW9uL3gtbXMtd21kXFx0XFx0XFx0XFx0d21kXFxuYXBwbGljYXRpb24veC1tcy13bXpcXHRcXHRcXHRcXHR3bXpcXG5hcHBsaWNhdGlvbi94LW1zLXhiYXBcXHRcXHRcXHRcXHR4YmFwXFxuYXBwbGljYXRpb24veC1tc2FjY2Vzc1xcdFxcdFxcdFxcdG1kYlxcbmFwcGxpY2F0aW9uL3gtbXNiaW5kZXJcXHRcXHRcXHRcXHRvYmRcXG5hcHBsaWNhdGlvbi94LW1zY2FyZGZpbGVcXHRcXHRcXHRjcmRcXG5hcHBsaWNhdGlvbi94LW1zY2xpcFxcdFxcdFxcdFxcdGNscFxcbmFwcGxpY2F0aW9uL3gtbXNkb3dubG9hZFxcdFxcdFxcdGV4ZSBkbGwgY29tIGJhdCBtc2lcXG5hcHBsaWNhdGlvbi94LW1zbWVkaWF2aWV3XFx0XFx0XFx0bXZiIG0xMyBtMTRcXG5hcHBsaWNhdGlvbi94LW1zbWV0YWZpbGVcXHRcXHRcXHR3bWYgd216IGVtZiBlbXpcXG5hcHBsaWNhdGlvbi94LW1zbW9uZXlcXHRcXHRcXHRcXHRtbnlcXG5hcHBsaWNhdGlvbi94LW1zcHVibGlzaGVyXFx0XFx0XFx0cHViXFxuYXBwbGljYXRpb24veC1tc3NjaGVkdWxlXFx0XFx0XFx0c2NkXFxuYXBwbGljYXRpb24veC1tc3Rlcm1pbmFsXFx0XFx0XFx0dHJtXFxuYXBwbGljYXRpb24veC1tc3dyaXRlXFx0XFx0XFx0XFx0d3JpXFxuYXBwbGljYXRpb24veC1uZXRjZGZcXHRcXHRcXHRcXHRuYyBjZGZcXG5hcHBsaWNhdGlvbi94LW56YlxcdFxcdFxcdFxcdG56YlxcbmFwcGxpY2F0aW9uL3gtcGtjczEyXFx0XFx0XFx0XFx0cDEyIHBmeFxcbmFwcGxpY2F0aW9uL3gtcGtjczctY2VydGlmaWNhdGVzXFx0XFx0cDdiIHNwY1xcbmFwcGxpY2F0aW9uL3gtcGtjczctY2VydHJlcXJlc3BcXHRcXHRcXHRwN3JcXG5hcHBsaWNhdGlvbi94LXJhci1jb21wcmVzc2VkXFx0XFx0XFx0cmFyXFxuYXBwbGljYXRpb24veC1yZXNlYXJjaC1pbmZvLXN5c3RlbXNcXHRcXHRyaXNcXG5hcHBsaWNhdGlvbi94LXNoXFx0XFx0XFx0XFx0c2hcXG5hcHBsaWNhdGlvbi94LXNoYXJcXHRcXHRcXHRcXHRzaGFyXFxuYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcXHRcXHRcXHRzd2ZcXG5hcHBsaWNhdGlvbi94LXNpbHZlcmxpZ2h0LWFwcFxcdFxcdFxcdHhhcFxcbmFwcGxpY2F0aW9uL3gtc3FsXFx0XFx0XFx0XFx0c3FsXFxuYXBwbGljYXRpb24veC1zdHVmZml0XFx0XFx0XFx0XFx0c2l0XFxuYXBwbGljYXRpb24veC1zdHVmZml0eFxcdFxcdFxcdFxcdHNpdHhcXG5hcHBsaWNhdGlvbi94LXN1YnJpcFxcdFxcdFxcdFxcdHNydFxcbmFwcGxpY2F0aW9uL3gtc3Y0Y3Bpb1xcdFxcdFxcdFxcdHN2NGNwaW9cXG5hcHBsaWNhdGlvbi94LXN2NGNyY1xcdFxcdFxcdFxcdHN2NGNyY1xcbmFwcGxpY2F0aW9uL3gtdDN2bS1pbWFnZVxcdFxcdFxcdHQzXFxuYXBwbGljYXRpb24veC10YWRzXFx0XFx0XFx0XFx0Z2FtXFxuYXBwbGljYXRpb24veC10YXJcXHRcXHRcXHRcXHR0YXJcXG5hcHBsaWNhdGlvbi94LXRjbFxcdFxcdFxcdFxcdHRjbFxcbmFwcGxpY2F0aW9uL3gtdGV4XFx0XFx0XFx0XFx0dGV4XFxuYXBwbGljYXRpb24veC10ZXgtdGZtXFx0XFx0XFx0XFx0dGZtXFxuYXBwbGljYXRpb24veC10ZXhpbmZvXFx0XFx0XFx0XFx0dGV4aW5mbyB0ZXhpXFxuYXBwbGljYXRpb24veC10Z2lmXFx0XFx0XFx0XFx0b2JqXFxuYXBwbGljYXRpb24veC11c3RhclxcdFxcdFxcdFxcdHVzdGFyXFxuYXBwbGljYXRpb24veC13YWlzLXNvdXJjZVxcdFxcdFxcdHNyY1xcbmFwcGxpY2F0aW9uL3gteDUwOS1jYS1jZXJ0XFx0XFx0XFx0ZGVyIGNydFxcbmFwcGxpY2F0aW9uL3gteGZpZ1xcdFxcdFxcdFxcdGZpZ1xcbmFwcGxpY2F0aW9uL3gteGxpZmYreG1sXFx0XFx0XFx0XFx0eGxmXFxuYXBwbGljYXRpb24veC14cGluc3RhbGxcXHRcXHRcXHRcXHR4cGlcXG5hcHBsaWNhdGlvbi94LXh6XFx0XFx0XFx0XFx0eHpcXG5hcHBsaWNhdGlvbi94LXptYWNoaW5lXFx0XFx0XFx0XFx0ejEgejIgejMgejQgejUgejYgejcgejhcXG5hcHBsaWNhdGlvbi94YW1sK3htbFxcdFxcdFxcdFxcdHhhbWxcXG5hcHBsaWNhdGlvbi94Y2FwLWRpZmYreG1sXFx0XFx0XFx0eGRmXFxuYXBwbGljYXRpb24veGVuYyt4bWxcXHRcXHRcXHRcXHR4ZW5jXFxuYXBwbGljYXRpb24veGh0bWwreG1sXFx0XFx0XFx0XFx0eGh0bWwgeGh0XFxuYXBwbGljYXRpb24veG1sXFx0XFx0XFx0XFx0XFx0eG1sIHhzbFxcbmFwcGxpY2F0aW9uL3htbC1kdGRcXHRcXHRcXHRcXHRkdGRcXG5hcHBsaWNhdGlvbi94b3AreG1sXFx0XFx0XFx0XFx0eG9wXFxuYXBwbGljYXRpb24veHByb2MreG1sXFx0XFx0XFx0XFx0eHBsXFxuYXBwbGljYXRpb24veHNsdCt4bWxcXHRcXHRcXHRcXHR4c2x0XFxuYXBwbGljYXRpb24veHNwZit4bWxcXHRcXHRcXHRcXHR4c3BmXFxuYXBwbGljYXRpb24veHYreG1sXFx0XFx0XFx0XFx0bXhtbCB4aHZtbCB4dm1sIHh2bVxcbmFwcGxpY2F0aW9uL3lhbmdcXHRcXHRcXHRcXHR5YW5nXFxuYXBwbGljYXRpb24veWluK3htbFxcdFxcdFxcdFxcdHlpblxcbmFwcGxpY2F0aW9uL3ppcFxcdFxcdFxcdFxcdFxcdHppcFxcbmF1ZGlvL2FkcGNtXFx0XFx0XFx0XFx0XFx0YWRwXFxuYXVkaW8vYmFzaWNcXHRcXHRcXHRcXHRcXHRhdSBzbmRcXG5hdWRpby9taWRpXFx0XFx0XFx0XFx0XFx0bWlkIG1pZGkga2FyIHJtaVxcbmF1ZGlvL21wNFxcdFxcdFxcdFxcdFxcdG00YSBtcDRhXFxuYXVkaW8vbXBlZ1xcdFxcdFxcdFxcdFxcdG1wZ2EgbXAyIG1wMmEgbXAzIG0yYSBtM2FcXG5hdWRpby9vZ2dcXHRcXHRcXHRcXHRcXHRvZ2Egb2dnIHNweFxcbmF1ZGlvL3MzbVxcdFxcdFxcdFxcdFxcdHMzbVxcbmF1ZGlvL3NpbGtcXHRcXHRcXHRcXHRcXHRzaWxcXG5hdWRpby92bmQuZGVjZS5hdWRpb1xcdFxcdFxcdFxcdHV2YSB1dnZhXFxuYXVkaW8vdm5kLmRpZ2l0YWwtd2luZHNcXHRcXHRcXHRcXHRlb2xcXG5hdWRpby92bmQuZHJhXFx0XFx0XFx0XFx0XFx0ZHJhXFxuYXVkaW8vdm5kLmR0c1xcdFxcdFxcdFxcdFxcdGR0c1xcbmF1ZGlvL3ZuZC5kdHMuaGRcXHRcXHRcXHRcXHRkdHNoZFxcbmF1ZGlvL3ZuZC5sdWNlbnQudm9pY2VcXHRcXHRcXHRcXHRsdnBcXG5hdWRpby92bmQubXMtcGxheXJlYWR5Lm1lZGlhLnB5YVxcdFxcdHB5YVxcbmF1ZGlvL3ZuZC5udWVyYS5lY2VscDQ4MDBcXHRcXHRcXHRlY2VscDQ4MDBcXG5hdWRpby92bmQubnVlcmEuZWNlbHA3NDcwXFx0XFx0XFx0ZWNlbHA3NDcwXFxuYXVkaW8vdm5kLm51ZXJhLmVjZWxwOTYwMFxcdFxcdFxcdGVjZWxwOTYwMFxcbmF1ZGlvL3ZuZC5yaXBcXHRcXHRcXHRcXHRcXHRyaXBcXG5hdWRpby93ZWJtXFx0XFx0XFx0XFx0XFx0d2ViYVxcbmF1ZGlvL3gtYWFjXFx0XFx0XFx0XFx0XFx0YWFjXFxuYXVkaW8veC1haWZmXFx0XFx0XFx0XFx0XFx0YWlmIGFpZmYgYWlmY1xcbmF1ZGlvL3gtY2FmXFx0XFx0XFx0XFx0XFx0Y2FmXFxuYXVkaW8veC1mbGFjXFx0XFx0XFx0XFx0XFx0ZmxhY1xcbmF1ZGlvL3gtbWF0cm9za2FcXHRcXHRcXHRcXHRta2FcXG5hdWRpby94LW1wZWd1cmxcXHRcXHRcXHRcXHRcXHRtM3VcXG5hdWRpby94LW1zLXdheFxcdFxcdFxcdFxcdFxcdHdheFxcbmF1ZGlvL3gtbXMtd21hXFx0XFx0XFx0XFx0XFx0d21hXFxuYXVkaW8veC1wbi1yZWFsYXVkaW9cXHRcXHRcXHRcXHRyYW0gcmFcXG5hdWRpby94LXBuLXJlYWxhdWRpby1wbHVnaW5cXHRcXHRcXHRybXBcXG5hdWRpby94LXdhdlxcdFxcdFxcdFxcdFxcdHdhdlxcbmF1ZGlvL3htXFx0XFx0XFx0XFx0XFx0eG1cXG5jaGVtaWNhbC94LWNkeFxcdFxcdFxcdFxcdFxcdGNkeFxcbmNoZW1pY2FsL3gtY2lmXFx0XFx0XFx0XFx0XFx0Y2lmXFxuY2hlbWljYWwveC1jbWRmXFx0XFx0XFx0XFx0XFx0Y21kZlxcbmNoZW1pY2FsL3gtY21sXFx0XFx0XFx0XFx0XFx0Y21sXFxuY2hlbWljYWwveC1jc21sXFx0XFx0XFx0XFx0XFx0Y3NtbFxcbmNoZW1pY2FsL3gteHl6XFx0XFx0XFx0XFx0XFx0eHl6XFxuZm9udC9jb2xsZWN0aW9uXFx0XFx0XFx0XFx0XFx0dHRjXFxuZm9udC9vdGZcXHRcXHRcXHRcXHRcXHRvdGZcXG5mb250L3R0ZlxcdFxcdFxcdFxcdFxcdHR0ZlxcbmZvbnQvd29mZlxcdFxcdFxcdFxcdFxcdHdvZmZcXG5mb250L3dvZmYyXFx0XFx0XFx0XFx0XFx0d29mZjJcXG5pbWFnZS9ibXBcXHRcXHRcXHRcXHRcXHRibXBcXG5pbWFnZS9jZ21cXHRcXHRcXHRcXHRcXHRjZ21cXG5pbWFnZS9nM2ZheFxcdFxcdFxcdFxcdFxcdGczXFxuaW1hZ2UvZ2lmXFx0XFx0XFx0XFx0XFx0Z2lmXFxuaW1hZ2UvaWVmXFx0XFx0XFx0XFx0XFx0aWVmXFxuaW1hZ2UvanBlZ1xcdFxcdFxcdFxcdFxcdGpwZWcganBnIGpwZVxcbmltYWdlL2t0eFxcdFxcdFxcdFxcdFxcdGt0eFxcbmltYWdlL3BuZ1xcdFxcdFxcdFxcdFxcdHBuZ1xcbmltYWdlL3Bycy5idGlmXFx0XFx0XFx0XFx0XFx0YnRpZlxcbmltYWdlL3NnaVxcdFxcdFxcdFxcdFxcdHNnaVxcbmltYWdlL3N2Zyt4bWxcXHRcXHRcXHRcXHRcXHRzdmcgc3ZnelxcbmltYWdlL3RpZmZcXHRcXHRcXHRcXHRcXHR0aWZmIHRpZlxcbmltYWdlL3ZuZC5hZG9iZS5waG90b3Nob3BcXHRcXHRcXHRwc2RcXG5pbWFnZS92bmQuZGVjZS5ncmFwaGljXFx0XFx0XFx0XFx0dXZpIHV2dmkgdXZnIHV2dmdcXG5pbWFnZS92bmQuZGp2dVxcdFxcdFxcdFxcdFxcdGRqdnUgZGp2XFxuaW1hZ2Uvdm5kLmR2Yi5zdWJ0aXRsZVxcdFxcdFxcdFxcdHN1YlxcbmltYWdlL3ZuZC5kd2dcXHRcXHRcXHRcXHRcXHRkd2dcXG5pbWFnZS92bmQuZHhmXFx0XFx0XFx0XFx0XFx0ZHhmXFxuaW1hZ2Uvdm5kLmZhc3RiaWRzaGVldFxcdFxcdFxcdFxcdGZic1xcbmltYWdlL3ZuZC5mcHhcXHRcXHRcXHRcXHRcXHRmcHhcXG5pbWFnZS92bmQuZnN0XFx0XFx0XFx0XFx0XFx0ZnN0XFxuaW1hZ2Uvdm5kLmZ1aml4ZXJveC5lZG1pY3MtbW1yXFx0XFx0XFx0bW1yXFxuaW1hZ2Uvdm5kLmZ1aml4ZXJveC5lZG1pY3MtcmxjXFx0XFx0XFx0cmxjXFxuaW1hZ2Uvdm5kLm1zLW1vZGlcXHRcXHRcXHRcXHRtZGlcXG5pbWFnZS92bmQubXMtcGhvdG9cXHRcXHRcXHRcXHR3ZHBcXG5pbWFnZS92bmQubmV0LWZweFxcdFxcdFxcdFxcdG5weFxcbmltYWdlL3ZuZC53YXAud2JtcFxcdFxcdFxcdFxcdHdibXBcXG5pbWFnZS92bmQueGlmZlxcdFxcdFxcdFxcdFxcdHhpZlxcbmltYWdlL3dlYnBcXHRcXHRcXHRcXHRcXHR3ZWJwXFxuaW1hZ2UveC0zZHNcXHRcXHRcXHRcXHRcXHQzZHNcXG5pbWFnZS94LWNtdS1yYXN0ZXJcXHRcXHRcXHRcXHRyYXNcXG5pbWFnZS94LWNteFxcdFxcdFxcdFxcdFxcdGNteFxcbmltYWdlL3gtZnJlZWhhbmRcXHRcXHRcXHRcXHRmaCBmaGMgZmg0IGZoNSBmaDdcXG5pbWFnZS94LWljb25cXHRcXHRcXHRcXHRcXHRpY29cXG5pbWFnZS94LW1yc2lkLWltYWdlXFx0XFx0XFx0XFx0c2lkXFxuaW1hZ2UveC1wY3hcXHRcXHRcXHRcXHRcXHRwY3hcXG5pbWFnZS94LXBpY3RcXHRcXHRcXHRcXHRcXHRwaWMgcGN0XFxuaW1hZ2UveC1wb3J0YWJsZS1hbnltYXBcXHRcXHRcXHRcXHRwbm1cXG5pbWFnZS94LXBvcnRhYmxlLWJpdG1hcFxcdFxcdFxcdFxcdHBibVxcbmltYWdlL3gtcG9ydGFibGUtZ3JheW1hcFxcdFxcdFxcdHBnbVxcbmltYWdlL3gtcG9ydGFibGUtcGl4bWFwXFx0XFx0XFx0XFx0cHBtXFxuaW1hZ2UveC1yZ2JcXHRcXHRcXHRcXHRcXHRyZ2JcXG5pbWFnZS94LXRnYVxcdFxcdFxcdFxcdFxcdHRnYVxcbmltYWdlL3gteGJpdG1hcFxcdFxcdFxcdFxcdFxcdHhibVxcbmltYWdlL3gteHBpeG1hcFxcdFxcdFxcdFxcdFxcdHhwbVxcbmltYWdlL3gteHdpbmRvd2R1bXBcXHRcXHRcXHRcXHR4d2RcXG5tZXNzYWdlL3JmYzgyMlxcdFxcdFxcdFxcdFxcdGVtbCBtaW1lXFxubW9kZWwvaWdlc1xcdFxcdFxcdFxcdFxcdGlncyBpZ2VzXFxubW9kZWwvbWVzaFxcdFxcdFxcdFxcdFxcdG1zaCBtZXNoIHNpbG9cXG5tb2RlbC92bmQuY29sbGFkYSt4bWxcXHRcXHRcXHRcXHRkYWVcXG5tb2RlbC92bmQuZHdmXFx0XFx0XFx0XFx0XFx0ZHdmXFxubW9kZWwvdm5kLmdkbFxcdFxcdFxcdFxcdFxcdGdkbFxcbm1vZGVsL3ZuZC5ndHdcXHRcXHRcXHRcXHRcXHRndHdcXG5tb2RlbC92bmQubXRzXFx0XFx0XFx0XFx0XFx0bXRzXFxubW9kZWwvdm5kLnZ0dVxcdFxcdFxcdFxcdFxcdHZ0dVxcbm1vZGVsL3ZybWxcXHRcXHRcXHRcXHRcXHR3cmwgdnJtbFxcbm1vZGVsL3gzZCtiaW5hcnlcXHRcXHRcXHRcXHR4M2RiIHgzZGJ6XFxubW9kZWwveDNkK3ZybWxcXHRcXHRcXHRcXHRcXHR4M2R2IHgzZHZ6XFxubW9kZWwveDNkK3htbFxcdFxcdFxcdFxcdFxcdHgzZCB4M2R6XFxudGV4dC9jYWNoZS1tYW5pZmVzdFxcdFxcdFxcdFxcdGFwcGNhY2hlXFxudGV4dC9jYWxlbmRhclxcdFxcdFxcdFxcdFxcdGljcyBpZmJcXG50ZXh0L2Nzc1xcdFxcdFxcdFxcdFxcdGNzc1xcbnRleHQvY3N2XFx0XFx0XFx0XFx0XFx0Y3N2XFxudGV4dC9odG1sXFx0XFx0XFx0XFx0XFx0aHRtbCBodG1cXG50ZXh0L24zXFx0XFx0XFx0XFx0XFx0XFx0bjNcXG50ZXh0L3BsYWluXFx0XFx0XFx0XFx0XFx0dHh0IHRleHQgY29uZiBkZWYgbGlzdCBsb2cgaW5cXG50ZXh0L3Bycy5saW5lcy50YWdcXHRcXHRcXHRcXHRkc2NcXG50ZXh0L3JpY2h0ZXh0XFx0XFx0XFx0XFx0XFx0cnR4XFxudGV4dC9zZ21sXFx0XFx0XFx0XFx0XFx0c2dtbCBzZ21cXG50ZXh0L3RhYi1zZXBhcmF0ZWQtdmFsdWVzXFx0XFx0XFx0dHN2XFxudGV4dC90cm9mZlxcdFxcdFxcdFxcdFxcdHQgdHIgcm9mZiBtYW4gbWUgbXNcXG50ZXh0L3R1cnRsZVxcdFxcdFxcdFxcdFxcdHR0bFxcbnRleHQvdXJpLWxpc3RcXHRcXHRcXHRcXHRcXHR1cmkgdXJpcyB1cmxzXFxudGV4dC92Y2FyZFxcdFxcdFxcdFxcdFxcdHZjYXJkXFxudGV4dC92bmQuY3VybFxcdFxcdFxcdFxcdFxcdGN1cmxcXG50ZXh0L3ZuZC5jdXJsLmRjdXJsXFx0XFx0XFx0XFx0ZGN1cmxcXG50ZXh0L3ZuZC5jdXJsLm1jdXJsXFx0XFx0XFx0XFx0bWN1cmxcXG50ZXh0L3ZuZC5jdXJsLnNjdXJsXFx0XFx0XFx0XFx0c2N1cmxcXG50ZXh0L3ZuZC5kdmIuc3VidGl0bGVcXHRcXHRcXHRcXHRzdWJcXG50ZXh0L3ZuZC5mbHlcXHRcXHRcXHRcXHRcXHRmbHlcXG50ZXh0L3ZuZC5mbWkuZmxleHN0b3JcXHRcXHRcXHRcXHRmbHhcXG50ZXh0L3ZuZC5ncmFwaHZpelxcdFxcdFxcdFxcdGd2XFxudGV4dC92bmQuaW4zZC4zZG1sXFx0XFx0XFx0XFx0M2RtbFxcbnRleHQvdm5kLmluM2Quc3BvdFxcdFxcdFxcdFxcdHNwb3RcXG50ZXh0L3ZuZC5zdW4uajJtZS5hcHAtZGVzY3JpcHRvclxcdFxcdGphZFxcbnRleHQvdm5kLndhcC53bWxcXHRcXHRcXHRcXHR3bWxcXG50ZXh0L3ZuZC53YXAud21sc2NyaXB0XFx0XFx0XFx0XFx0d21sc1xcbnRleHQveC1hc21cXHRcXHRcXHRcXHRcXHRzIGFzbVxcbnRleHQveC1jXFx0XFx0XFx0XFx0XFx0YyBjYyBjeHggY3BwIGggaGggZGljXFxudGV4dC94LWZvcnRyYW5cXHRcXHRcXHRcXHRcXHRmIGZvciBmNzcgZjkwXFxudGV4dC94LWphdmEtc291cmNlXFx0XFx0XFx0XFx0amF2YVxcbnRleHQveC1uZm9cXHRcXHRcXHRcXHRcXHRuZm9cXG50ZXh0L3gtb3BtbFxcdFxcdFxcdFxcdFxcdG9wbWxcXG50ZXh0L3gtcGFzY2FsXFx0XFx0XFx0XFx0XFx0cCBwYXNcXG50ZXh0L3gtc2V0ZXh0XFx0XFx0XFx0XFx0XFx0ZXR4XFxudGV4dC94LXNmdlxcdFxcdFxcdFxcdFxcdHNmdlxcbnRleHQveC11dWVuY29kZVxcdFxcdFxcdFxcdFxcdHV1XFxudGV4dC94LXZjYWxlbmRhclxcdFxcdFxcdFxcdHZjc1xcbnRleHQveC12Y2FyZFxcdFxcdFxcdFxcdFxcdHZjZlxcbnZpZGVvLzNncHBcXHRcXHRcXHRcXHRcXHQzZ3BcXG52aWRlby8zZ3BwMlxcdFxcdFxcdFxcdFxcdDNnMlxcbnZpZGVvL2gyNjFcXHRcXHRcXHRcXHRcXHRoMjYxXFxudmlkZW8vaDI2M1xcdFxcdFxcdFxcdFxcdGgyNjNcXG52aWRlby9oMjY0XFx0XFx0XFx0XFx0XFx0aDI2NFxcbnZpZGVvL2pwZWdcXHRcXHRcXHRcXHRcXHRqcGd2XFxudmlkZW8vanBtXFx0XFx0XFx0XFx0XFx0anBtIGpwZ21cXG52aWRlby9tajJcXHRcXHRcXHRcXHRcXHRtajIgbWpwMlxcbnZpZGVvL21wNFxcdFxcdFxcdFxcdFxcdG1wNCBtcDR2IG1wZzRcXG52aWRlby9tcGVnXFx0XFx0XFx0XFx0XFx0bXBlZyBtcGcgbXBlIG0xdiBtMnZcXG52aWRlby9vZ2dcXHRcXHRcXHRcXHRcXHRvZ3ZcXG52aWRlby9xdWlja3RpbWVcXHRcXHRcXHRcXHRcXHRxdCBtb3ZcXG52aWRlby92bmQuZGVjZS5oZFxcdFxcdFxcdFxcdHV2aCB1dnZoXFxudmlkZW8vdm5kLmRlY2UubW9iaWxlXFx0XFx0XFx0XFx0dXZtIHV2dm1cXG52aWRlby92bmQuZGVjZS5wZFxcdFxcdFxcdFxcdHV2cCB1dnZwXFxudmlkZW8vdm5kLmRlY2Uuc2RcXHRcXHRcXHRcXHR1dnMgdXZ2c1xcbnZpZGVvL3ZuZC5kZWNlLnZpZGVvXFx0XFx0XFx0XFx0dXZ2IHV2dnZcXG52aWRlby92bmQuZHZiLmZpbGVcXHRcXHRcXHRcXHRkdmJcXG52aWRlby92bmQuZnZ0XFx0XFx0XFx0XFx0XFx0ZnZ0XFxudmlkZW8vdm5kLm1wZWd1cmxcXHRcXHRcXHRcXHRteHUgbTR1XFxudmlkZW8vdm5kLm1zLXBsYXlyZWFkeS5tZWRpYS5weXZcXHRcXHRweXZcXG52aWRlby92bmQudXZ2dS5tcDRcXHRcXHRcXHRcXHR1dnUgdXZ2dVxcbnZpZGVvL3ZuZC52aXZvXFx0XFx0XFx0XFx0XFx0dml2XFxudmlkZW8vd2VibVxcdFxcdFxcdFxcdFxcdHdlYm1cXG52aWRlby94LWY0dlxcdFxcdFxcdFxcdFxcdGY0dlxcbnZpZGVvL3gtZmxpXFx0XFx0XFx0XFx0XFx0ZmxpXFxudmlkZW8veC1mbHZcXHRcXHRcXHRcXHRcXHRmbHZcXG52aWRlby94LW00dlxcdFxcdFxcdFxcdFxcdG00dlxcbnZpZGVvL3gtbWF0cm9za2FcXHRcXHRcXHRcXHRta3YgbWszZCBta3NcXG52aWRlby94LW1uZ1xcdFxcdFxcdFxcdFxcdG1uZ1xcbnZpZGVvL3gtbXMtYXNmXFx0XFx0XFx0XFx0XFx0YXNmIGFzeFxcbnZpZGVvL3gtbXMtdm9iXFx0XFx0XFx0XFx0XFx0dm9iXFxudmlkZW8veC1tcy13bVxcdFxcdFxcdFxcdFxcdHdtXFxudmlkZW8veC1tcy13bXZcXHRcXHRcXHRcXHRcXHR3bXZcXG52aWRlby94LW1zLXdteFxcdFxcdFxcdFxcdFxcdHdteFxcbnZpZGVvL3gtbXMtd3Z4XFx0XFx0XFx0XFx0XFx0d3Z4XFxudmlkZW8veC1tc3ZpZGVvXFx0XFx0XFx0XFx0XFx0YXZpXFxudmlkZW8veC1zZ2ktbW92aWVcXHRcXHRcXHRcXHRtb3ZpZVxcbnZpZGVvL3gtc212XFx0XFx0XFx0XFx0XFx0c212XFxueC1jb25mZXJlbmNlL3gtY29vbHRhbGtcXHRcXHRcXHRcXHRpY2VcXG5cIjtcblxuY29uc3QgbWFwID0gbmV3IE1hcCgpO1xuXG5taW1lX3Jhdy5zcGxpdCgnXFxuJykuZm9yRWFjaCgocm93KSA9PiB7XG5cdGNvbnN0IG1hdGNoID0gLyguKz8pXFx0KyguKykvLmV4ZWMocm93KTtcblx0aWYgKCFtYXRjaCkgcmV0dXJuO1xuXG5cdGNvbnN0IHR5cGUgPSBtYXRjaFsxXTtcblx0Y29uc3QgZXh0ZW5zaW9ucyA9IG1hdGNoWzJdLnNwbGl0KCcgJyk7XG5cblx0ZXh0ZW5zaW9ucy5mb3JFYWNoKGV4dCA9PiB7XG5cdFx0bWFwLnNldChleHQsIHR5cGUpO1xuXHR9KTtcbn0pO1xuXG5mdW5jdGlvbiBsb29rdXAoZmlsZSkge1xuXHRjb25zdCBtYXRjaCA9IC9cXC4oW15cXC5dKykkLy5leGVjKGZpbGUpO1xuXHRyZXR1cm4gbWF0Y2ggJiYgbWFwLmdldChtYXRjaFsxXSk7XG59XG5cbmZ1bmN0aW9uIG1pZGRsZXdhcmUob3B0c1xuXG5cbiA9IHt9KSB7XG5cdGNvbnN0IHsgc2Vzc2lvbiwgaWdub3JlIH0gPSBvcHRzO1xuXG5cdGxldCBlbWl0dGVkX2Jhc2VwYXRoID0gZmFsc2U7XG5cblx0cmV0dXJuIGNvbXBvc2VfaGFuZGxlcnMoaWdub3JlLCBbXG5cdFx0KHJlcSwgcmVzLCBuZXh0KSA9PiB7XG5cdFx0XHRpZiAocmVxLmJhc2VVcmwgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRsZXQgeyBvcmlnaW5hbFVybCB9ID0gcmVxO1xuXHRcdFx0XHRpZiAocmVxLnVybCA9PT0gJy8nICYmIG9yaWdpbmFsVXJsW29yaWdpbmFsVXJsLmxlbmd0aCAtIDFdICE9PSAnLycpIHtcblx0XHRcdFx0XHRvcmlnaW5hbFVybCArPSAnLyc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXEuYmFzZVVybCA9IG9yaWdpbmFsVXJsXG5cdFx0XHRcdFx0PyBvcmlnaW5hbFVybC5zbGljZSgwLCAtcmVxLnVybC5sZW5ndGgpXG5cdFx0XHRcdFx0OiAnJztcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFlbWl0dGVkX2Jhc2VwYXRoICYmIHByb2Nlc3Muc2VuZCkge1xuXHRcdFx0XHRwcm9jZXNzLnNlbmQoe1xuXHRcdFx0XHRcdF9fc2FwcGVyX186IHRydWUsXG5cdFx0XHRcdFx0ZXZlbnQ6ICdiYXNlcGF0aCcsXG5cdFx0XHRcdFx0YmFzZXBhdGg6IHJlcS5iYXNlVXJsXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGVtaXR0ZWRfYmFzZXBhdGggPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocmVxLnBhdGggPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRyZXEucGF0aCA9IHJlcS51cmwucmVwbGFjZSgvXFw/LiovLCAnJyk7XG5cdFx0XHR9XG5cblx0XHRcdG5leHQoKTtcblx0XHR9LFxuXG5cdFx0ZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oYnVpbGRfZGlyLCAnc2VydmljZS13b3JrZXIuanMnKSkgJiYgc2VydmUoe1xuXHRcdFx0cGF0aG5hbWU6ICcvc2VydmljZS13b3JrZXIuanMnLFxuXHRcdFx0Y2FjaGVfY29udHJvbDogJ25vLWNhY2hlLCBuby1zdG9yZSwgbXVzdC1yZXZhbGlkYXRlJ1xuXHRcdH0pLFxuXG5cdFx0ZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oYnVpbGRfZGlyLCAnc2VydmljZS13b3JrZXIuanMubWFwJykpICYmIHNlcnZlKHtcblx0XHRcdHBhdGhuYW1lOiAnL3NlcnZpY2Utd29ya2VyLmpzLm1hcCcsXG5cdFx0XHRjYWNoZV9jb250cm9sOiAnbm8tY2FjaGUsIG5vLXN0b3JlLCBtdXN0LXJldmFsaWRhdGUnXG5cdFx0fSksXG5cblx0XHRzZXJ2ZSh7XG5cdFx0XHRwcmVmaXg6ICcvY2xpZW50LycsXG5cdFx0XHRjYWNoZV9jb250cm9sOiBkZXYgPyAnbm8tY2FjaGUnIDogJ21heC1hZ2U9MzE1MzYwMDAsIGltbXV0YWJsZSdcblx0XHR9KSxcblxuXHRcdGdldF9zZXJ2ZXJfcm91dGVfaGFuZGxlcihtYW5pZmVzdC5zZXJ2ZXJfcm91dGVzKSxcblxuXHRcdGdldF9wYWdlX2hhbmRsZXIobWFuaWZlc3QsIHNlc3Npb24gfHwgbm9vcClcblx0XS5maWx0ZXIoQm9vbGVhbikpO1xufVxuXG5mdW5jdGlvbiBjb21wb3NlX2hhbmRsZXJzKGlnbm9yZSwgaGFuZGxlcnMpIHtcblx0Y29uc3QgdG90YWwgPSBoYW5kbGVycy5sZW5ndGg7XG5cblx0ZnVuY3Rpb24gbnRoX2hhbmRsZXIobiwgcmVxLCByZXMsIG5leHQpIHtcblx0XHRpZiAobiA+PSB0b3RhbCkge1xuXHRcdFx0cmV0dXJuIG5leHQoKTtcblx0XHR9XG5cblx0XHRoYW5kbGVyc1tuXShyZXEsIHJlcywgKCkgPT4gbnRoX2hhbmRsZXIobisxLCByZXEsIHJlcywgbmV4dCkpO1xuXHR9XG5cblx0cmV0dXJuICFpZ25vcmVcblx0XHQ/IChyZXEsIHJlcywgbmV4dCkgPT4gbnRoX2hhbmRsZXIoMCwgcmVxLCByZXMsIG5leHQpXG5cdFx0OiAocmVxLCByZXMsIG5leHQpID0+IHtcblx0XHRcdGlmIChzaG91bGRfaWdub3JlKHJlcS5wYXRoLCBpZ25vcmUpKSB7XG5cdFx0XHRcdG5leHQoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG50aF9oYW5kbGVyKDAsIHJlcSwgcmVzLCBuZXh0KTtcblx0XHRcdH1cblx0XHR9O1xufVxuXG5mdW5jdGlvbiBzaG91bGRfaWdub3JlKHVyaSwgdmFsKSB7XG5cdGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHJldHVybiB2YWwuc29tZSh4ID0+IHNob3VsZF9pZ25vcmUodXJpLCB4KSk7XG5cdGlmICh2YWwgaW5zdGFuY2VvZiBSZWdFeHApIHJldHVybiB2YWwudGVzdCh1cmkpO1xuXHRpZiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbCh1cmkpO1xuXHRyZXR1cm4gdXJpLnN0YXJ0c1dpdGgodmFsLmNoYXJDb2RlQXQoMCkgPT09IDQ3ID8gdmFsIDogYC8ke3ZhbH1gKTtcbn1cblxuZnVuY3Rpb24gc2VydmUoeyBwcmVmaXgsIHBhdGhuYW1lLCBjYWNoZV9jb250cm9sIH1cblxuXG5cbikge1xuXHRjb25zdCBmaWx0ZXIgPSBwYXRobmFtZVxuXHRcdD8gKHJlcSkgPT4gcmVxLnBhdGggPT09IHBhdGhuYW1lXG5cdFx0OiAocmVxKSA9PiByZXEucGF0aC5zdGFydHNXaXRoKHByZWZpeCk7XG5cblx0Y29uc3QgY2FjaGUgPSBuZXcgTWFwKCk7XG5cblx0Y29uc3QgcmVhZCA9IGRldlxuXHRcdD8gKGZpbGUpID0+IGZzLnJlYWRGaWxlU3luYyhwYXRoLnJlc29sdmUoYnVpbGRfZGlyLCBmaWxlKSlcblx0XHQ6IChmaWxlKSA9PiAoY2FjaGUuaGFzKGZpbGUpID8gY2FjaGUgOiBjYWNoZS5zZXQoZmlsZSwgZnMucmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZShidWlsZF9kaXIsIGZpbGUpKSkpLmdldChmaWxlKTtcblxuXHRyZXR1cm4gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG5cdFx0aWYgKGZpbHRlcihyZXEpKSB7XG5cdFx0XHRjb25zdCB0eXBlID0gbG9va3VwKHJlcS5wYXRoKTtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgZmlsZSA9IGRlY29kZVVSSUNvbXBvbmVudChyZXEucGF0aC5zbGljZSgxKSk7XG5cdFx0XHRcdGNvbnN0IGRhdGEgPSByZWFkKGZpbGUpO1xuXG5cdFx0XHRcdHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIHR5cGUpO1xuXHRcdFx0XHRyZXMuc2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJywgY2FjaGVfY29udHJvbCk7XG5cdFx0XHRcdHJlcy5lbmQoZGF0YSk7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0cmVzLnN0YXR1c0NvZGUgPSA0MDQ7XG5cdFx0XHRcdHJlcy5lbmQoJ25vdCBmb3VuZCcpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRuZXh0KCk7XG5cdFx0fVxuXHR9O1xufVxuXG5mdW5jdGlvbiBub29wKCl7fVxuXG5leHBvcnQgeyBtaWRkbGV3YXJlIH07XG4iLCJpbXBvcnQgc2lydiBmcm9tICdzaXJ2JztcbmltcG9ydCBwb2xrYSBmcm9tICdwb2xrYSc7XG5pbXBvcnQgY29tcHJlc3Npb24gZnJvbSAnY29tcHJlc3Npb24nO1xuaW1wb3J0ICogYXMgc2FwcGVyIGZyb20gJ0BzYXBwZXIvc2VydmVyJztcblxuY29uc3QgeyBQT1JULCBOT0RFX0VOViB9ID0gcHJvY2Vzcy5lbnY7XG5jb25zdCBkZXYgPSBOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JztcblxucG9sa2EoKSAvLyBZb3UgY2FuIGFsc28gdXNlIEV4cHJlc3Ncblx0LnVzZShcblx0XHRjb21wcmVzc2lvbih7IHRocmVzaG9sZDogMCB9KSxcblx0XHRzaXJ2KCdzdGF0aWMnLCB7IGRldiB9KSxcblx0XHRzYXBwZXIubWlkZGxld2FyZSgpXG5cdClcblx0Lmxpc3RlbihQT1JULCBlcnIgPT4ge1xuXHRcdGlmIChlcnIpIGNvbnNvbGUubG9nKCdlcnJvcicsIGVycik7XG5cdH0pO1xuIl0sIm5hbWVzIjpbImdldCIsInByZWxvYWQiLCJjb21wb25lbnRfMCIsImNvbXBvbmVudF8xIiwiY29tcG9uZW50XzIiLCJjb21wb25lbnRfMyIsImNvbXBvbmVudF80IiwiY29tcG9uZW50XzUiLCJjb21wb25lbnRfNiIsInByZWxvYWRfNiIsImNvbXBvbmVudF83IiwicHJlbG9hZF83Iiwicm9vdCIsImVycm9yIiwiZXNj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QU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7Q0FDNUIsSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtDQUMxQixNQUFNLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO0NBQzVCLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7Q0FDN0IsQ0FBQyxDQUFDOztBQUVILFNBQVMsVUFBVSxDQUFDLE9BQU8sRUFBRTtDQUM1QixJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7O0NBRTNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Q0FDOUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxLQUFLLEdBQUcsVUFBVSxDQUFDLEVBQUU7RUFDN0MsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7RUFDdkIsR0FBRyxJQUFJLEtBQUssT0FBTyxHQUFHLFVBQVUsQ0FBQyxFQUFFO0VBQ25DLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNsQyxHQUFHLFVBQVUsQ0FBQyxFQUFFO0VBQ2hCLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ3JELENBQUMsQ0FBQztDQUNIOztBQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFcEMsU0FBUyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFO0NBQzVDLE1BQU0sUUFBUSxH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
