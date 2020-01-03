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
	code: "section.svelte-1w3h4qb{display:flex;flex-direction:column;justify-content:center;padding:10% 0 10% 0;position:relative}@media screen and (min-width: 40em){section.svelte-1w3h4qb{padding:10% 0 10% 0}}div.card-container.svelte-1w3h4qb{display:flex;justify-content:flex-start;flex-direction:column;width:250px;margin-bottom:05%}div.image-container.svelte-1w3h4qb{display:flex;justify-content:center}@media screen and (min-width: 40em){div.card-container.svelte-1w3h4qb{flex-direction:row;justify-content:space-around;width:90%;margin-bottom:8%}div.card-container.svelte-1w3h4qb:nth-of-type(2n){flex-direction:row-reverse}div.text-container.svelte-1w3h4qb{width:35%}div.image-container.svelte-1w3h4qb{width:50%;justify-content:flex-start}div.card-container.svelte-1w3h4qb:nth-of-type(2n) div.image-container.svelte-1w3h4qb{justify-content:flex-end}}@media screen and (min-width: 64em){div.card-container.svelte-1w3h4qb{width:85%}}@media screen and (min-width: 1363px){div.card-container.svelte-1w3h4qb{width:80%}}div.projects-container.svelte-1w3h4qb{width:100%;display:flex;align-items:center;flex-direction:column}h2.svelte-1w3h4qb{display:flex;align-items:center;text-transform:uppercase;width:fit-content;margin-bottom:10%;color:#3B3B3B;font-weight:800}h2.svelte-1w3h4qb::after{content:'';display:block;margin-left:10px;width:30px;border-bottom:3px solid black}@media screen and (min-width: 64em){h2.svelte-1w3h4qb{font-size:23rem}}",
	map: "{\"version\":3,\"file\":\"Projects.svelte\",\"sources\":[\"Projects.svelte\"],\"sourcesContent\":[\"<script>\\n    import { onMount } from 'svelte';  \\n\\n    import Image from './Image.svelte';\\n    import Text from './Text.svelte';  \\n\\n    let portfolioCards = [\\n        {\\n            url: '/projects/halcyon',\\n            imgSrc: 'images/halcyon-5.jpg',\\n            alt: 'Thumbnail for the Halcyon mall website rebuild',\\n            projectName: 'Halcyon',\\n            projectYear: '2019',\\n            projectText: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`\\n        },\\n        {\\n            url: '/projects/university-park',\\n            imgSrc: 'images/uptexas-thumb.jpg',\\n            alt: 'Thumbnail for the City of University Park complete Front End website redesign',\\n            projectName: 'University Park',\\n            projectYear: '2019',\\n            projectText: `I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.`,\\n        },\\n        {\\n            url: '/projects/creative-revolt',\\n            imgSrc: 'images/Jorden-Background-Gray.jpg',\\n            alt: 'Thumbnail for the Creative Revolt redesigned website',\\n            projectName: 'Creative Revolt',\\n            projectYear: '2018',\\n            projectText: `This was a freelance project to <strong>rework the website layout</strong> and tailor the feel of the website to her personal writing style. I <strong>revamped the color palette</strong> to better match her personality, adjusted her website for <strong>SEO</strong>, and created the landing page as well as multiple pages across the platform.`,\\n        },\\n    ]\\n</script>\\n\\n<style>\\n    section {\\n        display: flex;\\n        flex-direction: column;\\n        justify-content: center;\\n        padding: 10% 0 10% 0;\\n        position: relative;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        section {\\n            padding: 10% 0 10% 0;\\n        }\\n    }\\n\\n    div.card-container {\\n        display: flex;\\n        justify-content: flex-start;\\n        flex-direction: column;\\n        width: 250px;\\n        margin-bottom: 05%;\\n    }\\n\\n    div.image-container {\\n       display: flex;\\n       justify-content: center;\\n    }\\n    @media screen and (min-width: 40em){\\n        div.card-container {\\n            flex-direction: row;\\n            justify-content: space-around;\\n            width: 90%;\\n            margin-bottom: 8%;\\n        }\\n        div.card-container:nth-of-type(2n){\\n           flex-direction: row-reverse;\\n         }\\n        div.text-container {\\n            width: 35%;\\n        }\\n        div.image-container {\\n            width: 50%;\\n            justify-content: flex-start;\\n        }\\n        div.card-container:nth-of-type(2n) div.image-container{\\n            justify-content: flex-end;\\n        }\\n\\n        \\n    }\\n\\n    @media screen and (min-width: 64em){\\n        div.card-container{\\n            width: 85%;\\n        }\\n    }\\n\\n    @media screen and (min-width: 1363px){\\n        div.card-container{\\n            width: 80%;\\n        }\\n    }\\n    div.projects-container {\\n        width: 100%;\\n        display:flex;\\n        align-items: center;\\n        flex-direction: column;\\n    }\\n\\n    h2 {\\n        display: flex;\\n        align-items: center;\\n        text-transform: uppercase;\\n        width: fit-content;\\n        margin-bottom: 10%;\\n        color: #3B3B3B;\\n        font-weight: 800;\\n    }\\n\\n    h2::after {\\n        content: '';\\n        display: block;\\n        margin-left: 10px;\\n        width: 30px;\\n        border-bottom: 3px solid black;\\n    }\\n\\n\\n    @media screen and (min-width: 64em){\\n        h2 {\\n            font-size: 23rem;\\n        }\\n    }\\n</style>\\n\\n<section>\\n    <h2>Selected Works</h2>\\n    <div class=\\\"projects-container\\\">\\n        {#each portfolioCards as card, index}\\n            <div class=\\\"card-container\\\" {index}>\\n                <div class=\\\"image-container\\\">\\n                    <Image imgSrc={card.imgSrc} url={card.url} alt={card.alt} />\\n                </div>\\n                <div class=\\\"text-container\\\">\\n                    <Text projectName={card.projectName} url={card.url} projectText={card.projectText} projectYear={card.projectYear} />\\n                </div>\\n            </div>\\n        {/each}\\n    </div>\\n</section>\"],\"names\":[],\"mappings\":\"AAmCI,OAAO,eAAC,CAAC,AACL,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,OAAO,CAAE,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACpB,QAAQ,CAAE,QAAQ,AACtB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,OAAO,eAAC,CAAC,AACL,OAAO,CAAE,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,AACxB,CAAC,AACL,CAAC,AAED,GAAG,eAAe,eAAC,CAAC,AAChB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,UAAU,CAC3B,cAAc,CAAE,MAAM,CACtB,KAAK,CAAE,KAAK,CACZ,aAAa,CAAE,GAAG,AACtB,CAAC,AAED,GAAG,gBAAgB,eAAC,CAAC,AAClB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,AAC1B,CAAC,AACD,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,GAAG,eAAe,eAAC,CAAC,AAChB,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,YAAY,CAC7B,KAAK,CAAE,GAAG,CACV,aAAa,CAAE,EAAE,AACrB,CAAC,AACD,GAAG,8BAAe,aAAa,EAAE,CAAC,CAAC,AAChC,cAAc,CAAE,WAAW,AAC7B,CAAC,AACF,GAAG,eAAe,eAAC,CAAC,AAChB,KAAK,CAAE,GAAG,AACd,CAAC,AACD,GAAG,gBAAgB,eAAC,CAAC,AACjB,KAAK,CAAE,GAAG,CACV,eAAe,CAAE,UAAU,AAC/B,CAAC,AACD,GAAG,8BAAe,aAAa,EAAE,CAAC,CAAC,GAAG,+BAAgB,CAAC,AACnD,eAAe,CAAE,QAAQ,AAC7B,CAAC,AAGL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,GAAG,8BAAe,CAAC,AACf,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,CAAC,AAClC,GAAG,8BAAe,CAAC,AACf,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AACD,GAAG,mBAAmB,eAAC,CAAC,AACpB,KAAK,CAAE,IAAI,CACX,QAAQ,IAAI,CACZ,WAAW,CAAE,MAAM,CACnB,cAAc,CAAE,MAAM,AAC1B,CAAC,AAED,EAAE,eAAC,CAAC,AACA,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,cAAc,CAAE,SAAS,CACzB,KAAK,CAAE,WAAW,CAClB,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,AACpB,CAAC,AAED,iBAAE,OAAO,AAAC,CAAC,AACP,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,CACd,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,AAClC,CAAC,AAGD,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,eAAC,CAAC,AACA,SAAS,CAAE,KAAK,AACpB,CAAC,AACL,CAAC\"}"
};

const Projects = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	  

    let portfolioCards = [
        {
            url: '/projects/halcyon',
            imgSrc: 'images/halcyon-5.jpg',
            alt: 'Thumbnail for the Halcyon mall website rebuild',
            projectName: 'Halcyon',
            projectYear: '2019',
            projectText: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`
        },
        {
            url: '/projects/university-park',
            imgSrc: 'images/uptexas-thumb.jpg',
            alt: 'Thumbnail for the City of University Park complete Front End website redesign',
            projectName: 'University Park',
            projectYear: '2019',
            projectText: `I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.`,
        },
        {
            url: '/projects/creative-revolt',
            imgSrc: 'images/Jorden-Background-Gray.jpg',
            alt: 'Thumbnail for the Creative Revolt redesigned website',
            projectName: 'Creative Revolt',
            projectYear: '2018',
            projectText: `This was a freelance project to <strong>rework the website layout</strong> and tailor the feel of the website to her personal writing style. I <strong>revamped the color palette</strong> to better match her personality, adjusted her website for <strong>SEO</strong>, and created the landing page as well as multiple pages across the platform.`,
        },
    ];

	$$result.css.add(css$6);

	return `<section class="svelte-1w3h4qb">
	    <h2 class="svelte-1w3h4qb">Selected Works</h2>
	    <div class="projects-container svelte-1w3h4qb">
	        ${each(portfolioCards, (card, index) => `<div class="card-container svelte-1w3h4qb"${add_attribute("index", index, 0)}>
	                <div class="image-container svelte-1w3h4qb">
	                    ${validate_component(Image, 'Image').$$render($$result, {
		imgSrc: card.imgSrc,
		url: card.url,
		alt: card.alt
	}, {}, {})}
	                </div>
	                <div class="text-container svelte-1w3h4qb">
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
	code: "section.titles.svelte-10fvdd9{margin-bottom:20rem}@media screen and (min-width: 40em){section.titles.svelte-10fvdd9{margin-bottom:60rem}}h1.svelte-10fvdd9{color:#3B3B3B;font-weight:800;font-size:23px}h2.svelte-10fvdd9{color:#3B3B3B;font-weight:800;font-size:18px;margin-bottom:5px;margin-top:-3px;opacity:.85}h3.svelte-10fvdd9{display:flex;align-items:center;font-size:14px;font-weight:400;opacity:.8;margin-bottom:15px}h3.svelte-10fvdd9::before{content:'';display:block;width:30px;border-bottom:3px solid black;margin-right:10px;opacity:.8}@media screen and (min-width: 40em) and (max-width: 64em){h1.svelte-10fvdd9{font-size:21px}h2.svelte-10fvdd9{font-size:16px;margin-bottom:7px}h3.svelte-10fvdd9{font-size:12px}}@media screen and (min-width: 64em){h1.svelte-10fvdd9{font-size:28px}h2.svelte-10fvdd9{font-size:22px;margin-bottom:7px}h3.svelte-10fvdd9{margin-bottom:0}}",
	map: "{\"version\":3,\"file\":\"LogoText.svelte\",\"sources\":[\"LogoText.svelte\"],\"sourcesContent\":[\"<script>\\nexport let addClass;\\n</script>\\n\\n<style>\\nsection.titles {\\n    margin-bottom: 20rem;\\n}\\n\\n@media screen and (min-width: 40em) {\\n    section.titles {\\n        margin-bottom: 60rem;\\n    }\\n}\\n\\nh1 {\\n    color:#3B3B3B;\\n    font-weight: 800;\\n    font-size: 23px;\\n}\\nh2 {\\n    color:#3B3B3B;\\n    font-weight: 800;\\n    font-size: 18px;\\n    margin-bottom: 5px;\\n    margin-top: -3px;\\n    opacity: .85;\\n}\\n\\nh3 {\\n    display: flex;\\n    align-items: center;\\n    font-size: 14px;\\n    font-weight: 400;\\n    opacity: .8;\\n    margin-bottom: 15px;\\n}\\n\\nh3::before {\\n    content: '';\\n    display: block;\\n    width: 30px;\\n    border-bottom: 3px solid black;\\n    margin-right: 10px;\\n    opacity: .8;\\n}\\n\\n @media screen and (min-width: 40em) and (max-width: 64em){\\n    h1 {\\n        font-size: 21px;\\n        \\n    }\\n    h2 {\\n        font-size: 16px;\\n        margin-bottom: 7px;\\n    }\\n    h3 {\\n        font-size: 12px;\\n    }\\n}\\n\\n@media screen and (min-width: 64em) {\\n    h1 {\\n        font-size: 28px;\\n    }\\n    h2 {\\n        font-size: 22px;\\n        margin-bottom: 7px;\\n    }\\n    h3 {\\n        margin-bottom: 0;\\n    }\\n}\\n\\n</style>\\n\\n<section class=\\\"titles {addClass}\\\">\\n    <h1>Front End Developer</h1>\\n    <h2>React, Svelte, ES6</h2>\\n    <h3>Joshua Roper</h3>\\n</section>\"],\"names\":[],\"mappings\":\"AAKA,OAAO,OAAO,eAAC,CAAC,AACZ,aAAa,CAAE,KAAK,AACxB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,OAAO,OAAO,eAAC,CAAC,AACZ,aAAa,CAAE,KAAK,AACxB,CAAC,AACL,CAAC,AAED,EAAE,eAAC,CAAC,AACA,MAAM,OAAO,CACb,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,AACnB,CAAC,AACD,EAAE,eAAC,CAAC,AACA,MAAM,OAAO,CACb,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,GAAG,AAChB,CAAC,AAED,EAAE,eAAC,CAAC,AACA,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,EAAE,CACX,aAAa,CAAE,IAAI,AACvB,CAAC,AAED,iBAAE,QAAQ,AAAC,CAAC,AACR,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAC9B,YAAY,CAAE,IAAI,CAClB,OAAO,CAAE,EAAE,AACf,CAAC,AAEA,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AACvD,EAAE,eAAC,CAAC,AACA,SAAS,CAAE,IAAI,AAEnB,CAAC,AACD,EAAE,eAAC,CAAC,AACA,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,GAAG,AACtB,CAAC,AACD,EAAE,eAAC,CAAC,AACA,SAAS,CAAE,IAAI,AACnB,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,EAAE,eAAC,CAAC,AACA,SAAS,CAAE,IAAI,AACnB,CAAC,AACD,EAAE,eAAC,CAAC,AACA,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,GAAG,AACtB,CAAC,AACD,EAAE,eAAC,CAAC,AACA,aAAa,CAAE,CAAC,AACpB,CAAC,AACL,CAAC\"}"
};

const LogoText = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { addClass } = $$props;

	if ($$props.addClass === void 0 && $$bindings.addClass && addClass !== void 0) $$bindings.addClass(addClass);

	$$result.css.add(css$8);

	return `<section class="titles ${escape(addClass)} svelte-10fvdd9">
	    <h1 class="svelte-10fvdd9">Front End Developer</h1>
	    <h2 class="svelte-10fvdd9">React, Svelte, ES6</h2>
	    <h3 class="svelte-10fvdd9">Joshua Roper</h3>
	</section>`;
});

/* src/components/experience/Skills.svelte generated by Svelte v3.9.1 */

const css$9 = {
	code: "ul.svelte-1sha42o{margin-left:10rem;font-size:12rem}li.svelte-1sha42o{display:flex;align-items:center;margin:5rem 0;font-size:14rem}li.svelte-1sha42o::before{content:'';display:inline-block;width:5px;height:5px;border-radius:100%;background:gray;margin-right:15rem}h3.svelte-1sha42o{font-size:16rem;text-transform:uppercase;font-weight:500;margin-bottom:8rem}@media screen and (min-width: 64em){h3.svelte-1sha42o{font-size:21rem}}.design-section.svelte-1sha42o h3.svelte-1sha42o{margin-top:12rem}",
	map: "{\"version\":3,\"file\":\"Skills.svelte\",\"sources\":[\"Skills.svelte\"],\"sourcesContent\":[\"<script>\\n\\n</script>\\n\\n<style lang=\\\"scss\\\">\\n ul {\\n    margin-left: 10rem;\\n    font-size: 12rem;    \\n}\\n\\nli {\\n    display: flex;\\n    align-items: center;\\n    margin: 5rem 0;\\n    font-size: 14rem;\\n}\\n\\nli::before {\\n    content: '';\\n    display: inline-block;\\n    width: 5px;\\n    height: 5px;\\n    border-radius: 100%;\\n    background: gray;\\n    margin-right: 15rem;\\n}\\nh3 {\\n    font-size: 16rem;\\n    text-transform: uppercase;\\n    font-weight: 500;\\n    margin-bottom: 8rem;\\n} \\n\\n@media screen and (min-width: 64em) {\\n    h3 {\\n        font-size: 21rem;\\n    }\\n}\\n\\n.design-section h3 {\\n    margin-top: 12rem;\\n}\\n\\n\\n\\n</style>\\n\\n<section class=\\\"skills\\\">\\n    <h2 class=\\\"headline alt\\\">Skills</h2>\\n    <div class=\\\"development-section\\\">\\n        <h3>Development</h3>\\n        <ul class=\\\"skills-list\\\">\\n            <li>React</li>\\n            <li>Svelte 3</li>\\n            <li>Sapper</li>\\n            <li>JavaScript (ES6+)</li>\\n            <li>WebPack</li>\\n            <li>Git (Version Control)</li>\\n            <li>jQuery</li> \\n            <li>SASS / SCSS</li>\\n            <li>CSS</li>\\n            <li>Foundation</li>\\n            <li>Bootstrap</li>\\n            <li>HTML (WCAG 2.1)</li>\\n            <li>HTML Emails</li>\\n            <li>GitHub / BitBucket</li>\\n            <li>WordPress / Kentico</li>\\n            <li>Adobe Suite</li>\\n            <li>SEO</li>\\n            <li>Usability Testing</li> \\n        </ul>\\n    </div>\\n    <div class=\\\"design-section\\\">\\n        <h3>Design</h3>\\n        <ul class=\\\"skills-list\\\">\\n            <li>Adobe InDesign</li>\\n            <li>Adobe Illustrator</li>\\n            <li>Adobe XD</li>\\n            <li>Adobe Premiere</li>\\n            <li>Wireframing</li>\\n            <li>Canva</li>\\n        </ul>\\n    </div>\\n</section>\"],\"names\":[],\"mappings\":\"AAKC,EAAE,eAAC,CAAC,AACD,WAAW,CAAE,KAAK,CAClB,SAAS,CAAE,KAAK,AACpB,CAAC,AAED,EAAE,eAAC,CAAC,AACA,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,IAAI,CAAC,CAAC,CACd,SAAS,CAAE,KAAK,AACpB,CAAC,AAED,iBAAE,QAAQ,AAAC,CAAC,AACR,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,YAAY,CACrB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IAAI,CAChB,YAAY,CAAE,KAAK,AACvB,CAAC,AACD,EAAE,eAAC,CAAC,AACA,SAAS,CAAE,KAAK,CAChB,cAAc,CAAE,SAAS,CACzB,WAAW,CAAE,GAAG,CAChB,aAAa,CAAE,IAAI,AACvB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,EAAE,eAAC,CAAC,AACA,SAAS,CAAE,KAAK,AACpB,CAAC,AACL,CAAC,AAED,8BAAe,CAAC,EAAE,eAAC,CAAC,AAChB,UAAU,CAAE,KAAK,AACrB,CAAC\"}"
};

const Skills = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$9);

	return `<section class="skills">
	    <h2 class="headline alt">Skills</h2>
	    <div class="development-section">
	        <h3 class="svelte-1sha42o">Development</h3>
	        <ul class="skills-list svelte-1sha42o">
	            <li class="svelte-1sha42o">React</li>
	            <li class="svelte-1sha42o">Svelte 3</li>
	            <li class="svelte-1sha42o">Sapper</li>
	            <li class="svelte-1sha42o">JavaScript (ES6+)</li>
	            <li class="svelte-1sha42o">WebPack</li>
	            <li class="svelte-1sha42o">Git (Version Control)</li>
	            <li class="svelte-1sha42o">jQuery</li> 
	            <li class="svelte-1sha42o">SASS / SCSS</li>
	            <li class="svelte-1sha42o">CSS</li>
	            <li class="svelte-1sha42o">Foundation</li>
	            <li class="svelte-1sha42o">Bootstrap</li>
	            <li class="svelte-1sha42o">HTML (WCAG 2.1)</li>
	            <li class="svelte-1sha42o">HTML Emails</li>
	            <li class="svelte-1sha42o">GitHub / BitBucket</li>
	            <li class="svelte-1sha42o">WordPress / Kentico</li>
	            <li class="svelte-1sha42o">Adobe Suite</li>
	            <li class="svelte-1sha42o">SEO</li>
	            <li class="svelte-1sha42o">Usability Testing</li> 
	        </ul>
	    </div>
	    <div class="design-section svelte-1sha42o">
	        <h3 class="svelte-1sha42o">Design</h3>
	        <ul class="skills-list svelte-1sha42o">
	            <li class="svelte-1sha42o">Adobe InDesign</li>
	            <li class="svelte-1sha42o">Adobe Illustrator</li>
	            <li class="svelte-1sha42o">Adobe XD</li>
	            <li class="svelte-1sha42o">Adobe Premiere</li>
	            <li class="svelte-1sha42o">Wireframing</li>
	            <li class="svelte-1sha42o">Canva</li>
	        </ul>
	    </div>
	</section>`;
});

/* src/components/experience/Contact.svelte generated by Svelte v3.9.1 */

const css$a = {
	code: "a.svelte-17jyt0r{display:block;font-size:14rem;margin:3rem 0;color:#58595b;text-transform:lowercase}@media screen and (min-width: 64em){a.svelte-17jyt0r{font-size:18rem}}",
	map: "{\"version\":3,\"file\":\"Contact.svelte\",\"sources\":[\"Contact.svelte\"],\"sourcesContent\":[\"<script>\\n\\n</script>\\n\\n<style>\\n    a {\\n        display: block;\\n        font-size: 14rem;\\n        margin: 3rem 0;\\n        color: #58595b;\\n        text-transform: lowercase;\\n    }\\n\\n    @media screen and (min-width: 64em) {\\n        a {\\n            font-size: 18rem;\\n        }\\n    }\\n</style>\\n\\n<section class=\\\"contact\\\">\\n    <h2 class=\\\"headline alt\\\">Contact</h2>\\n        <a href=\\\"https://www.linkedin.com/in/JR-dev\\\" aria-label=\\\"link to Joshua Roper's LinkedIn account\\\" target=\\\"blank\\\" >linkedin.com/in/JR-dev</a>\\n        <a href=\\\"mailto:joshua.micah.roper@gmail.com\\\" aria-label=\\\"link to send Joshua Roper an email\\\" target=\\\"blank\\\" >Joshua.Micah.Roper@gmail.com</a>\\n</section>\"],\"names\":[],\"mappings\":\"AAKI,CAAC,eAAC,CAAC,AACC,OAAO,CAAE,KAAK,CACd,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IAAI,CAAC,CAAC,CACd,KAAK,CAAE,OAAO,CACd,cAAc,CAAE,SAAS,AAC7B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,CAAC,eAAC,CAAC,AACC,SAAS,CAAE,KAAK,AACpB,CAAC,AACL,CAAC\"}"
};

const Contact = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$a);

	return `<section class="contact">
	    <h2 class="headline alt">Contact</h2>
	        <a href="https://www.linkedin.com/in/JR-dev" aria-label="link to Joshua Roper's LinkedIn account" target="blank" class="svelte-17jyt0r">linkedin.com/in/JR-dev</a>
	        <a href="mailto:joshua.micah.roper@gmail.com" aria-label="link to send Joshua Roper an email" target="blank" class="svelte-17jyt0r">Joshua.Micah.Roper@gmail.com</a>
	</section>`;
});

/* src/components/experience/SideBar.svelte generated by Svelte v3.9.1 */

const css$b = {
	code: "@media screen and (min-width: 40em){aside.svelte-7xv5ff{padding-top:165px}}@media(min-width: 64em){aside.svelte-7xv5ff{padding-top:165px}}@media(min-width: 1366px){aside.svelte-7xv5ff{padding-top:140px}}",
	map: "{\"version\":3,\"file\":\"SideBar.svelte\",\"sources\":[\"SideBar.svelte\"],\"sourcesContent\":[\"<script>\\nimport LogoText from './LogoText.svelte';\\nimport Skills from './Skills.svelte';\\nimport Contact from './Contact.svelte';\\n</script>\\n\\n<style>\\n@media screen and (min-width: 40em) {\\n    aside {\\n        padding-top: 165px;\\n    }\\n}\\n\\n@media (min-width: 64em) {\\n    aside {\\n        padding-top: 165px;\\n    }\\n}\\n\\n@media (min-width: 1366px) {\\n    aside {\\n        padding-top: 140px;\\n    }\\n}\\n</style>\\n\\n<aside>\\n    <LogoText addClass=\\\"show-for-small\\\" />\\n    <Skills />\\n    <Contact />\\n</aside>\"],\"names\":[],\"mappings\":\"AAOA,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,KAAK,cAAC,CAAC,AACH,WAAW,CAAE,KAAK,AACtB,CAAC,AACL,CAAC,AAED,MAAM,AAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACtB,KAAK,cAAC,CAAC,AACH,WAAW,CAAE,KAAK,AACtB,CAAC,AACL,CAAC,AAED,MAAM,AAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AACxB,KAAK,cAAC,CAAC,AACH,WAAW,CAAE,KAAK,AACtB,CAAC,AACL,CAAC\"}"
};

const SideBar = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$b);

	return `<aside class="svelte-7xv5ff">
	    ${validate_component(LogoText, 'LogoText').$$render($$result, { addClass: "show-for-small" }, {}, {})}
	    ${validate_component(Skills, 'Skills').$$render($$result, {}, {}, {})}
	    ${validate_component(Contact, 'Contact').$$render($$result, {}, {}, {})}
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

const css$c = {
	code: "div.job-listing.svelte-hdrflg{margin-bottom:20rem}li.svelte-hdrflg{margin:5rem 0}@media(min-width: 64em){li.svelte-hdrflg{margin:8rem 0}}li.svelte-hdrflg::before{content:'';position:absolute;display:inline-block;width:3px;height:3px;border-radius:100%;background:gray;top:7px;left:-10px}@media(min-width: 64em){li.svelte-hdrflg::before{top:10px}}li.detail.svelte-hdrflg{position:relative;margin-left:15rem}.detail-title.svelte-hdrflg{margin-bottom:0px}",
	map: "{\"version\":3,\"file\":\"JobExperience.svelte\",\"sources\":[\"JobExperience.svelte\"],\"sourcesContent\":[\"<script>\\n\\n</script>\\n\\n<style>\\n\\ndiv.job-listing {\\n    margin-bottom: 20rem;\\n}\\nli {\\n    margin: 5rem 0;\\n}\\n\\n@media (min-width: 64em) {\\n    li {\\n        margin: 8rem 0;\\n    }\\n}\\nli::before {\\n    content: '';\\n    position: absolute;\\n    display: inline-block;\\n    width: 3px;\\n    height: 3px;\\n    border-radius: 100%;\\n    background: gray;\\n    top: 7px;\\n    left: -10px;\\n}\\n\\n@media (min-width: 64em) {\\n    li::before {\\n        top: 10px;\\n    }\\n}\\n\\nli.detail {\\n    position: relative;\\n    margin-left: 15rem;\\n}\\n\\n.detail-title {\\n    margin-bottom: 0px;\\n}\\n</style>\\n\\n<section>\\n    <h2 class=\\\"headline\\\">Experience</h2>\\n    <div class=\\\"job-listing\\\">\\n        <p class=\\\"date-location detail-preface\\\">Dallas, Texas (2019 - current)</p>\\n        <h3 class=\\\"job-title detail-title\\\">Front End Developer at Imaginuity</h3>\\n        <ul class=\\\"job-details\\\">\\n            <li class=\\\"detail\\\">\\n                Developed the entire Front End for a high traffic, 99% up time website\\n                <div class=\\\"detail-web-links\\\">\\n                    <a href=\\\"https://www.uptexas.org\\\" target=\\\"blank\\\">uptexas.org</a> \\n                </div>\\n            </li>\\n            <li class=\\\"detail\\\">\\n                Made web enhancements and landing page’s for multiple businesses\\n                <div class=\\\"detail-web-links\\\">\\n                    <a href=\\\"https://www.webuyuglyhouses.com\\\" target=\\\"blank\\\">webuyuglyhouses.com</a>, \\n                    <a href=\\\"https://www.homevestors.com\\\" target=\\\"blank\\\">homevestors.com</a>, \\n                    <a href=\\\"https://www.advancial.org\\\" target=\\\"blank\\\">advancial.org</a>, etc....\\n                </div>\\n            </li>\\n            <li class=\\\"detail\\\">\\n                Maintained 10 React based themes responsible for over 50 established malls\\n                <div class=\\\"detail-web-links\\\">\\n                    <a href=\\\"https://www.visithalcyon.com\\\" target=\\\"blank\\\">visithalcyon.com</a>\\n                </div>\\n            </li>\\n            <li class=\\\"detail\\\">\\n                Designed and integrated page templates utilizing a CMS (WordPress / Kentico)\\n            </li>\\n        </ul>\\n    </div>\\n    <div class=\\\"job-listing\\\">\\n        <p class=\\\"date-location detail-preface\\\">Carrollton, Texas (2017 - 2018)</p>\\n        <h3 class=\\\"job-title detail-title\\\">Freelance Web Development and Marketing at Creative Revolt</h3>\\n        <div class=\\\"detail-web-links\\\">\\n            <a href=\\\"https://www.creativerevolt.com\\\" target=\\\"blank\\\">creativerevolt.com</a>\\n        </div>\\n        <ul class=\\\"job-details\\\">\\n            <li class=\\\"detail\\\">\\n                Revamped the design with a bolder color palette / layout\\n            </li>\\n            <li class=\\\"detail\\\">\\n                Created the landing page and multiple sections utilizing WordPress (DiviBuilder)\\n            </li>\\n            <li class=\\\"detail\\\">\\n                Performed website updates and executed content audits\\n            </li>\\n            <li class=\\\"detail\\\">\\n                Adjusted the website for SEO and created marketable advertisements (Canva / Google Analytics)\\n            </li>\\n        </ul>\\n    </div>\\n</section>\"],\"names\":[],\"mappings\":\"AAMA,GAAG,YAAY,cAAC,CAAC,AACb,aAAa,CAAE,KAAK,AACxB,CAAC,AACD,EAAE,cAAC,CAAC,AACA,MAAM,CAAE,IAAI,CAAC,CAAC,AAClB,CAAC,AAED,MAAM,AAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACtB,EAAE,cAAC,CAAC,AACA,MAAM,CAAE,IAAI,CAAC,CAAC,AAClB,CAAC,AACL,CAAC,AACD,gBAAE,QAAQ,AAAC,CAAC,AACR,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,YAAY,CACrB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IAAI,CAChB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,KAAK,AACf,CAAC,AAED,MAAM,AAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACtB,gBAAE,QAAQ,AAAC,CAAC,AACR,GAAG,CAAE,IAAI,AACb,CAAC,AACL,CAAC,AAED,EAAE,OAAO,cAAC,CAAC,AACP,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,KAAK,AACtB,CAAC,AAED,aAAa,cAAC,CAAC,AACX,aAAa,CAAE,GAAG,AACtB,CAAC\"}"
};

const JobExperience = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$c);

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

const css$d = {
	code: ".project-listing.svelte-1vtmb{margin-bottom:20rem}.detail-title.svelte-1vtmb{margin:0}.detail-web-links.svelte-1vtmb{margin:3rem 0}@media screen and (min-width: 40em){.projects-container.svelte-1vtmb{display:flex;flex-wrap:wrap}.project-listing.svelte-1vtmb{box-sizing:border-box;width:50%;padding-right:30rem}}",
	map: "{\"version\":3,\"file\":\"Projects.svelte\",\"sources\":[\"Projects.svelte\"],\"sourcesContent\":[\"<script>\\n\\n</script>\\n\\n<style>\\n\\n.project-listing {\\n    margin-bottom: 20rem;\\n}\\n.detail-title {\\n    margin: 0;\\n}\\n\\n.detail-web-links {\\n    margin: 3rem 0;\\n}\\n\\n\\n@media screen and (min-width: 40em){\\n    .projects-container {\\n        display: flex;\\n        flex-wrap: wrap;\\n    }\\n    .project-listing {\\n        box-sizing: border-box;\\n        width: 50%;\\n        padding-right: 30rem;\\n    }\\n}\\n\\n</style>\\n\\n<section>\\n    <h2 class=\\\"headline\\\">Projects</h2>\\n    <div class=\\\"projects-container\\\">\\n        <div class=\\\"project-listing\\\">\\n            <p class=\\\"detail-preface skills-listing\\\">Svelte, Sapper, JavaScript, Rollup, SASS, HTML</p>\\n            <h3 class=\\\"detail-title\\\">Personal Portfolio</h3>\\n            <div class=\\\"detail-web-links\\\">\\n                <a href=\\\"https://www.joshuaroper.com/\\\" target=\\\"blank\\\">joshuaroper.com</a>\\n            </div>\\n            <p>\\n                I created a personal portfolio website to showcase all of my recent works. I utilized advanced CSS animations, Svelte, and a static Sapper build.\\n            </p>\\n        </div>\\n        <div class=\\\"project-listing\\\">\\n            <p class=\\\"detail-preface skills-listing\\\">React, React Static, JavaScript, WebPack, SASS, JSX, WordPress</p>\\n            <h3 class=\\\"detail-title\\\">Halcyon</h3>\\n            <div class=\\\"detail-web-links\\\">\\n                <a href=\\\"https://www.visithalcyon.com/\\\" target=\\\"blank\\\">visithalcyon.com</a>\\n            </div>\\n            <p>\\n                As one of the Front End Developers on the project I was tasked with creating the movies, and events directory. I worked with multiple API’s, React Static, and developed clean code.\\n            </p>\\n        </div> \\n        <div class=\\\"project-listing\\\">\\n            <p class=\\\"detail-preface skills-listing\\\">JavaScript, jQuery, SASS, Foundation, HTML, Kentico (CMS)</p>\\n            <h3 class=\\\"detail-title\\\">University Park</h3>\\n            <div class=\\\"detail-web-links\\\">\\n                <a href=\\\"https://www.uptexas.org/\\\" target=\\\"blank\\\">uptexas.org</a>\\n            </div>\\n            <p>\\n                I was the sole Front End Developer on the project, I implemented a dynamically generated content slider, filtered search, form verification, and multiple third party integrations.\\n            </p>\\n        </div>\\n        <div class=\\\"project-listing\\\">\\n            <p class=\\\"detail-preface skills-listing\\\">HTML, CSS, JavaScript, Jquery, WordPress, DiviBuilder</p>\\n            <h3 class=\\\"detail-title\\\">Creative Revolt</h3>\\n            <div class=\\\"detail-web-links\\\">\\n                <a href=\\\"https://www.creativerevolt.com/\\\" target=\\\"blank\\\">creativerevolt.com</a>\\n            </div>\\n            <p>\\n                This was a freelance project to completely rework the website layout and tailor the feel of the website to her personal writing style.\\n            </p>\\n        </div>\\n    </div>\\n</section>\"],\"names\":[],\"mappings\":\"AAMA,gBAAgB,aAAC,CAAC,AACd,aAAa,CAAE,KAAK,AACxB,CAAC,AACD,aAAa,aAAC,CAAC,AACX,MAAM,CAAE,CAAC,AACb,CAAC,AAED,iBAAiB,aAAC,CAAC,AACf,MAAM,CAAE,IAAI,CAAC,CAAC,AAClB,CAAC,AAGD,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,mBAAmB,aAAC,CAAC,AACjB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,AACnB,CAAC,AACD,gBAAgB,aAAC,CAAC,AACd,UAAU,CAAE,UAAU,CACtB,KAAK,CAAE,GAAG,CACV,aAAa,CAAE,KAAK,AACxB,CAAC,AACL,CAAC\"}"
};

const Projects$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$d);

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

const css$e = {
	code: ".detail-title.svelte-i9dlu3{margin-bottom:3px}",
	map: "{\"version\":3,\"file\":\"Education.svelte\",\"sources\":[\"Education.svelte\"],\"sourcesContent\":[\"<script>\\n\\n</script>\\n\\n<style>\\n.detail-title {\\n    margin-bottom: 3px;\\n}\\n</style>\\n\\n<section>\\n    <h2 class=\\\"headline\\\">Education</h2>\\n    <div class=\\\"education-listing\\\">\\n        <p class=\\\"detail-preface\\\">Arlington, Texas (2015 - 2018)</p>\\n        <h3 class=\\\"detail-title\\\">University of Texas at Arlington</h3>\\n        <p>Bachelor of Communication Technology</p>\\n    </div>\\n</section>\"],\"names\":[],\"mappings\":\"AAKA,aAAa,cAAC,CAAC,AACX,aAAa,CAAE,GAAG,AACtB,CAAC\"}"
};

const Education = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$e);

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

const css$f = {
	code: "@media(min-width: 1366px){.resume-content.svelte-1l9xuqs{padding-right:200px;margin-left:-100px}}",
	map: "{\"version\":3,\"file\":\"ResumeContent.svelte\",\"sources\":[\"ResumeContent.svelte\"],\"sourcesContent\":[\"<script>\\nimport LogoText from './LogoText.svelte';\\nimport Summary from './Summary.svelte';\\nimport JobExperience from './JobExperience.svelte';\\nimport Projects from './Projects.svelte';\\nimport Education from './Education.svelte';\\n</script>\\n\\n<style>\\n@media (min-width: 1366px) {\\n    .resume-content {\\n        padding-right: 200px;\\n        margin-left: -100px;\\n    }\\n}\\n</style>\\n\\n<div class=\\\"resume-content\\\">\\n    <LogoText addClass=\\\"hide-for-small\\\" />\\n    <Summary />\\n    <JobExperience />\\n    <Projects />\\n    <Education />\\n</div>\"],\"names\":[],\"mappings\":\"AASA,MAAM,AAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AACxB,eAAe,eAAC,CAAC,AACb,aAAa,CAAE,KAAK,CACpB,WAAW,CAAE,MAAM,AACvB,CAAC,AACL,CAAC\"}"
};

const ResumeContent = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$f);

	return `<div class="resume-content svelte-1l9xuqs">
	    ${validate_component(LogoText, 'LogoText').$$render($$result, { addClass: "hide-for-small" }, {}, {})}
	    ${validate_component(Summary, 'Summary').$$render($$result, {}, {}, {})}
	    ${validate_component(JobExperience, 'JobExperience').$$render($$result, {}, {}, {})}
	    ${validate_component(Projects$1, 'Projects').$$render($$result, {}, {}, {})}
	    ${validate_component(Education, 'Education').$$render($$result, {}, {}, {})}
	</div>`;
});

/* src/routes/experience.svelte generated by Svelte v3.9.1 */

const css$g = {
	code: "@import '../components/experience/experience-fonts.styles.scss';.container.svelte-ot62ea{position:relative;margin-top:90px}.experience.svelte-ot62ea{display:flex;flex-direction:column-reverse}@media screen and (min-width: 40em){.experience.svelte-ot62ea{padding-top:50px;flex-direction:row}}.left.svelte-ot62ea{width:100%}@media screen and (min-width: 40em){.left.svelte-ot62ea{width:60%}}.right.svelte-ot62ea{width:100%;background:white}",
	map: "{\"version\":3,\"file\":\"experience.svelte\",\"sources\":[\"experience.svelte\"],\"sourcesContent\":[\"<script>\\nimport SideBar from '../components/experience/SideBar.svelte';\\nimport ResumeContent from '../components/experience/ResumeContent.svelte';\\n</script>\\n\\n<style type=\\\"text/scss\\\">\\n    @import '../components/experience/experience-fonts.styles.scss';\\n\\n    .container {\\n        position: relative;\\n        margin-top: 90px;\\n    }\\n\\n    .experience {\\n        display: flex;\\n        flex-direction: column-reverse;\\n    }\\n\\n    @media screen and (min-width: 40em) {\\n        .experience {\\n            padding-top: 50px;\\n            flex-direction: row;\\n        }\\n    }\\n\\n    .left {\\n        width: 100%;\\n    }\\n\\n    @media screen and (min-width: 40em) {\\n        .left {\\n            width: 60%;\\n        }\\n    }\\n\\n    .right {\\n        width: 100%;\\n        background: white;\\n    }\\n\\n</style>\\n\\n<svelte:head>\\n\\t<title>Experience | Front End Developer - Joshua Roper</title>\\n</svelte:head>\\n\\n<div class=\\\"experience container\\\">\\n    <div class=\\\"left\\\">\\n        <SideBar />\\n    </div>\\n    <div class=\\\"right\\\">\\n        <ResumeContent />\\n    </div>\\n</div>\"],\"names\":[],\"mappings\":\"AAMI,QAAQ,uDAAuD,CAAC,AAEhE,UAAU,cAAC,CAAC,AACR,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,IAAI,AACpB,CAAC,AAED,WAAW,cAAC,CAAC,AACT,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,cAAc,AAClC,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,WAAW,cAAC,CAAC,AACT,WAAW,CAAE,IAAI,CACjB,cAAc,CAAE,GAAG,AACvB,CAAC,AACL,CAAC,AAED,KAAK,cAAC,CAAC,AACH,KAAK,CAAE,IAAI,AACf,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,KAAK,cAAC,CAAC,AACH,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,MAAM,cAAC,CAAC,AACJ,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,KAAK,AACrB,CAAC\"}"
};

const Experience = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$g);

	return `${($$result.head += `<title>Experience | Front End Developer - Joshua Roper</title>`, "")}

	<div class="experience container svelte-ot62ea">
	    <div class="left svelte-ot62ea">
	        ${validate_component(SideBar, 'SideBar').$$render($$result, {}, {}, {})}
	    </div>
	    <div class="right svelte-ot62ea">
	        ${validate_component(ResumeContent, 'ResumeContent').$$render($$result, {}, {}, {})}
	    </div>
	</div>`;
});

/* src/components/project-detail/PageTitle.svelte generated by Svelte v3.9.1 */

const css$h = {
	code: "@keyframes svelte-a5em78-slideInRight{100%{transform:translateX(100%)}}@keyframes svelte-a5em78-badSlideInRight{0%{left:-100%}100%{left:5px}}div.svelte-a5em78:not(.page-header){display:flex;justify-content:flex-end;width:65%;margin:-05px 0px 20px 0;font-size:16rem;text-transform:uppercase;color:#58595b;max-width:1320px}div.side-page.svelte-a5em78{font-size:12rem;max-width:1705px}div.title-container.svelte-a5em78:not(.side-page){position:relative;width:100%}@media screen and (min-width: 40em){div.title-container.svelte-a5em78:not(.side-page){margin-bottom:20px;width:100%}div.svelte-a5em78:not(.page-header){font-size:28rem;width:75%}div.side-page.svelte-a5em78{font-size:24rem;width:85%\n        }}h1.svelte-a5em78{color:#3B3B3B;position:relative;width:100%;top:0;right:0px;display:flex;font-size:32px;align-items:center;margin:0px}@media screen and (min-width: 40em){h1.svelte-a5em78{font-size:55px}}@media screen and (min-width: 64em){h1.svelte-a5em78{font-size:64px}}div.page-header.svelte-a5em78{margin-top:90px;position:relative;width:100vw;height:125px;display:flex;justify-content:center;align-items:flex-end;box-sizing:border-box;padding-left:20rem}@media screen and (min-width: 40em){div.page-header.svelte-a5em78{padding:0;box-sizing:content-box;height:220px}}@media screen and (min-width: 64em){div.page-header.svelte-a5em78{height:250px}}span.svelte-a5em78{position:absolute;transform:scaleX(-1);transform:scaleX(-1) rotate(180deg) skew(-10deg, 0deg);opacity:.03;left:3px;bottom:-25px;font-size:32px}@media screen and (min-width: 40em){span.svelte-a5em78{left:5px;bottom:-55px;font-size:55px}}@media screen and (min-width: 64em){span.svelte-a5em78{font-size:64px}}",
	map: "{\"version\":3,\"file\":\"PageTitle.svelte\",\"sources\":[\"PageTitle.svelte\"],\"sourcesContent\":[\"<script>\\nexport let title, sidePage;\\n// sidePage should be set to 'side-page' to toggle class\\n</script>\\n\\n<style>\\n\\n    @keyframes slideInRight {\\n        100% {\\n            transform: translateX(100%);\\n        }\\n    }\\n\\n    @keyframes badSlideInRight {\\n        0% {\\n            left: -100%;\\n        }\\n        100% {\\n            left: 5px;\\n        }\\n    }\\n\\n    div:not(.page-header) {\\n        display: flex;\\n        justify-content: flex-end;\\n        width: 65%;\\n        margin: -05px 0px 20px 0;\\n        font-size: 16rem;\\n        text-transform: uppercase;\\n        color: #58595b;\\n        max-width: 1320px;\\n    }\\n\\n    div.side-page {\\n        font-size: 12rem;\\n        max-width: 1705px;\\n    }\\n\\n    div.title-container:not(.side-page){\\n        position: relative;\\n        /* animation: .9s ease-out 0s 1 fadeIn forwards; */\\n        width: 100%;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        div.title-container:not(.side-page){\\n            margin-bottom: 20px;\\n            width: 100%;\\n        }\\n\\n        div:not(.page-header) {\\n            font-size: 28rem;\\n            width: 75%;\\n        }\\n\\n        div.side-page {\\n            font-size: 24rem;\\n            width: 85%\\n        }\\n    }\\n\\n    h1 {\\n        color: #3B3B3B;\\n        position: relative;\\n        width: 100%;\\n        top: 0;\\n        /* left: -100%; */\\n        right: 0px;\\n        display: flex;\\n        font-size: 32px;\\n        align-items: center;\\n        margin: 0px;\\n        /* animation: 1s ease-out 0s 1 slideInRight forwards; */\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        h1 {\\n            font-size: 55px;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        h1 {\\n            font-size: 64px;\\n        }\\n    }\\n\\n    div.page-header{\\n        margin-top: 90px;\\n        position: relative;\\n        width: 100vw;\\n        height: 125px;\\n        display: flex;\\n        justify-content: center;\\n        align-items: flex-end;\\n        box-sizing: border-box;\\n        padding-left:20rem;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        div.page-header {\\n            padding: 0;\\n            box-sizing: content-box;\\n            height: 220px;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        div.page-header {\\n            height: 250px;\\n        }\\n    }\\n\\n    span{\\n        position: absolute;\\n        transform: scaleX(-1);\\n        transform: scaleX(-1) rotate(180deg) skew(-10deg, 0deg);\\n        opacity: .03;\\n        left: 3px;\\n        bottom: -25px;\\n        font-size: 32px;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        span {\\n            left: 5px;\\n            bottom: -55px;\\n            font-size: 55px;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        span {\\n            font-size: 64px;\\n        }\\n    }\\n    \\n</style>\\n<div class=\\\"page-header container\\\">\\n    <div class='title-container {sidePage}'>\\n        <h1>{title}</h1>\\n        <span>{title}</span>\\n    </div>\\n</div>\"],\"names\":[],\"mappings\":\"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\"}"
};

const PageTitle = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { title, sidePage } = $$props;
// sidePage should be set to 'side-page' to toggle class

	if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
	if ($$props.sidePage === void 0 && $$bindings.sidePage && sidePage !== void 0) $$bindings.sidePage(sidePage);

	$$result.css.add(css$h);

	return `<div class="page-header container svelte-a5em78">
	    <div class="title-container ${escape(sidePage)} svelte-a5em78">
	        <h1 class="svelte-a5em78">${escape(title)}</h1>
	        <span class="svelte-a5em78">${escape(title)}</span>
	    </div>
	</div>`;
});

/* src/components/project-detail/Image.svelte generated by Svelte v3.9.1 */

const css$i = {
	code: "a.svelte-1a9r6f8,div.svelte-1a9r6f8{max-width:100%}a.svelte-1a9r6f8{opacity:1}.img-container.svelte-1a9r6f8{position:relative;overflow:hidden;width:65vw;height:65vw;max-height:250px;box-shadow:3px 3px 3px lightgrey;transition:all .3s ease-in}@media screen and (min-width: 40em){.img-container.svelte-1a9r6f8{max-width:100%;width:25vw;height:25vw;max-width:350px;max-height:350px}.large.svelte-1a9r6f8 .img-container.svelte-1a9r6f8{width:30vw;height:30vw;max-width:450px;max-height:450px}}a.svelte-1a9r6f8:hover .img-container.svelte-1a9r6f8{position:relative;transform:translateY(-3px);box-shadow:5px 5px 5px lightgrey}img.svelte-1a9r6f8{object-fit:cover;transition:all .3s ease-in;width:100%;height:100%}",
	map: "{\"version\":3,\"file\":\"Image.svelte\",\"sources\":[\"Image.svelte\"],\"sourcesContent\":[\"<script>\\nexport let imgSrc, alt;\\nexport let projectName;\\nexport let url;\\nexport let width;\\n</script>\\n\\n<style>\\n    a, div{\\n        max-width: 100%;\\n    }\\n\\n    a {\\n        opacity: 1;\\n    }\\n\\n    .img-container{\\n        position: relative;\\n        overflow: hidden;\\n        width: 65vw;\\n        height: 65vw;\\n        max-height: 250px;\\n        box-shadow: 3px 3px 3px lightgrey;\\n        transition: all .3s ease-in;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        .img-container{\\n            max-width:100%; \\n            width: 25vw;\\n            height: 25vw;\\n            max-width: 350px;\\n            max-height: 350px;\\n        } \\n\\n        .large .img-container {\\n            width: 30vw;\\n            height: 30vw;\\n            max-width: 450px;\\n            max-height: 450px;\\n        }\\n\\n        /* .full-width {\\n            width: 100%;\\n        }\\n\\n        .full-width .img-container { \\n            width: calc(50% - 30vw + 60vw);\\n            height: 30vw;\\n            margin: 0 auto;\\n            max-width: 100%;\\n            max-height: 450px;\\n        } */\\n    }\\n\\n    a:hover .img-container {\\n        position: relative;\\n        transform: translateY(-3px);\\n        box-shadow: 5px 5px 5px lightgrey;\\n    }\\n\\n    img {\\n        object-fit: cover;\\n        transition: all .3s ease-in;\\n        width: 100%;\\n        height: 100%;\\n    }\\n   \\n</style>\\n\\n<a target=\\\"blank\\\" class=\\\"{width}\\\" href=\\\"{url}\\\">\\n    <div class=\\\"img-container\\\">\\n      <img src=\\\"{imgSrc}\\\" alt=\\\"{alt}\\\">\\n    </div>\\n</a>\"],\"names\":[],\"mappings\":\"AAQI,gBAAC,CAAE,kBAAG,CAAC,AACH,SAAS,CAAE,IAAI,AACnB,CAAC,AAED,CAAC,eAAC,CAAC,AACC,OAAO,CAAE,CAAC,AACd,CAAC,AAED,6BAAc,CAAC,AACX,QAAQ,CAAE,QAAQ,CAClB,QAAQ,CAAE,MAAM,CAChB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,CACjB,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,SAAS,CACjC,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,OAAO,AAC/B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,6BAAc,CAAC,AACX,UAAU,IAAI,CACd,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,KAAK,AACrB,CAAC,AAED,qBAAM,CAAC,cAAc,eAAC,CAAC,AACnB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,KAAK,AACrB,CAAC,AAaL,CAAC,AAED,gBAAC,MAAM,CAAC,cAAc,eAAC,CAAC,AACpB,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,SAAS,AACrC,CAAC,AAED,GAAG,eAAC,CAAC,AACD,UAAU,CAAE,KAAK,CACjB,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,OAAO,CAC3B,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AAChB,CAAC\"}"
};

const Image$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { imgSrc, alt, projectName, url, width } = $$props;

	if ($$props.imgSrc === void 0 && $$bindings.imgSrc && imgSrc !== void 0) $$bindings.imgSrc(imgSrc);
	if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0) $$bindings.alt(alt);
	if ($$props.projectName === void 0 && $$bindings.projectName && projectName !== void 0) $$bindings.projectName(projectName);
	if ($$props.url === void 0 && $$bindings.url && url !== void 0) $$bindings.url(url);
	if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);

	$$result.css.add(css$i);

	return `<a target="blank" class="${escape(null_to_empty(width))} svelte-1a9r6f8"${add_attribute("href", url, 0)}>
	    <div class="img-container svelte-1a9r6f8">
	      <img${add_attribute("src", imgSrc, 0)}${add_attribute("alt", alt, 0)} class="svelte-1a9r6f8">
	    </div>
	</a>`;
});

/* src/components/project-detail/TopBar.svelte generated by Svelte v3.9.1 */

const css$j = {
	code: "h2.svelte-1upr8r{position:relative;display:flex;align-items:center;margin:15rem 0rem 5rem 0rem;font-size:13rem;font-weight:900;text-transform:capitalize;transition:all .2s ease-in-out;color:#3B3B3B;z-index:2}p.svelte-1upr8r{position:relative;line-height:16px;font-weight:300;font-size:13rem;z-index:1;color:#58595b}@media screen and (min-width: 40em){h2.svelte-1upr8r{margin-top:0rem}}@media screen and (min-width: 64em){h2.svelte-1upr8r{font-size:23rem}p.svelte-1upr8r{font-size:18rem;line-height:21px}}",
	map: "{\"version\":3,\"file\":\"TopBar.svelte\",\"sources\":[\"TopBar.svelte\"],\"sourcesContent\":[\"<script>\\nimport TextAnimation from '../helper-components/TextAnimation.svelte';\\n\\nexport let projectName, url, projectText, projectYear;\\n</script>\\n\\n<style>\\n\\n    a{\\n        display: flex;\\n        align-items: center;\\n        font-weight: 300;\\n        text-transform: uppercase;\\n        font-size: 12rem;\\n        width: fit-content;\\n        margin-top: 10rem;\\n        color: #989898;\\n        font-weight: 300;\\n        font-style: italic;\\n    }\\n    h2 {\\n        position: relative;\\n        display: flex;\\n        align-items: center;\\n        margin: 15rem 0rem 5rem 0rem;\\n        font-size: 13rem;\\n        font-weight: 900;\\n        text-transform: capitalize;\\n        transition: all .2s ease-in-out;\\n        color: #3B3B3B;\\n        z-index: 2;\\n    }\\n\\n    p{\\n        position: relative;\\n        line-height: 16px;\\n        font-weight: 300;\\n        font-size: 13rem;\\n        z-index: 1;\\n        color: #58595b;\\n        /* text-indent: 10px; */\\n    }\\n\\n    @media screen and (min-width: 40em) {\\n        h2 {\\n            margin-top: 0rem;\\n        }\\n    }\\n\\n@media screen and (min-width: 64em){\\n    h2 {\\n        font-size: 23rem;\\n    }\\n    p{\\n        font-size: 18rem;\\n        line-height: 21px;\\n    }\\n    a{\\n        font-size: 14rem;\\n    }\\n}\\n\\n</style>\\n\\n<div class=\\\"grid-x\\\">\\n    <div class=\\\"gridx-50\\\">\\n        <h2>Project</h2>\\n        <p>\\n            Complete Front End Rebuild\\n        </p>\\n        <!-- <a target=\\\"blank\\\" href=\\\"{url}\\\">\\n            <TextAnimation text={`View Website`} />\\n        </a> -->\\n    </div>\\n    <div class=\\\"gridx-50\\\">\\n        <h2>Role</h2>\\n        <p>\\n            Front End Developer\\n        </p>\\n        <!-- <a target=\\\"blank\\\" href=\\\"{url}\\\">\\n            <TextAnimation text={`View Code`} />\\n        </a> -->\\n    </div>\\n</div>\"],\"names\":[],\"mappings\":\"AAoBI,EAAE,cAAC,CAAC,AACA,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAC5B,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,UAAU,CAC1B,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,WAAW,CAC/B,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,CAAC,AACd,CAAC,AAED,eAAC,CAAC,AACE,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,OAAO,AAElB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,EAAE,cAAC,CAAC,AACA,UAAU,CAAE,IAAI,AACpB,CAAC,AACL,CAAC,AAEL,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,cAAC,CAAC,AACA,SAAS,CAAE,KAAK,AACpB,CAAC,AACD,eAAC,CAAC,AACE,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,IAAI,AACrB,CAAC,AAIL,CAAC\"}"
};

const TopBar = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { projectName, url, projectText, projectYear } = $$props;

	if ($$props.projectName === void 0 && $$bindings.projectName && projectName !== void 0) $$bindings.projectName(projectName);
	if ($$props.url === void 0 && $$bindings.url && url !== void 0) $$bindings.url(url);
	if ($$props.projectText === void 0 && $$bindings.projectText && projectText !== void 0) $$bindings.projectText(projectText);
	if ($$props.projectYear === void 0 && $$bindings.projectYear && projectYear !== void 0) $$bindings.projectYear(projectYear);

	$$result.css.add(css$j);

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

const css$k = {
	code: "a.svelte-s2xmgv{display:flex;align-items:center;font-weight:300;text-transform:uppercase;font-size:12rem;width:fit-content;margin-top:10rem;color:#989898;font-weight:300;font-style:italic}h2.svelte-s2xmgv{position:relative;display:flex;align-items:center;margin:15rem 0rem 5rem 0rem;font-size:13rem;font-weight:900;text-transform:capitalize;transition:all .2s ease-in-out;color:#3B3B3B;z-index:2}p.svelte-s2xmgv{position:relative;line-height:16px;font-weight:300;font-size:13rem;z-index:1;color:#58595b;text-indent:10px}@media screen and (min-width: 40em){h2.svelte-s2xmgv{margin-top:0rem}}@media screen and (min-width: 64em){h2.svelte-s2xmgv{font-size:23rem}p.svelte-s2xmgv{font-size:18rem;line-height:21px}a.svelte-s2xmgv{font-size:14rem}}.text-container.svelte-s2xmgv{position:sticky;top:130px}",
	map: "{\"version\":3,\"file\":\"Description.svelte\",\"sources\":[\"Description.svelte\"],\"sourcesContent\":[\"<script>\\nimport TextAnimation from '../helper-components/TextAnimation.svelte';\\n\\n</script>\\n\\n<style>\\n  a{\\n        display: flex;\\n        align-items: center;\\n        font-weight: 300;\\n        text-transform: uppercase;\\n        font-size: 12rem;\\n        width: fit-content;\\n        margin-top: 10rem;\\n        color: #989898;\\n        font-weight: 300;\\n        font-style: italic;\\n    }\\n    h2 {\\n        position: relative;\\n        display: flex;\\n        align-items: center;\\n        margin: 15rem 0rem 5rem 0rem;\\n        font-size: 13rem;\\n        font-weight: 900;\\n        text-transform: capitalize;\\n        transition: all .2s ease-in-out;\\n        color: #3B3B3B;\\n        z-index: 2;\\n    }\\n\\n    p{\\n        position: relative;\\n        line-height: 16px;\\n        font-weight: 300;\\n        font-size: 13rem;\\n        z-index: 1;\\n        color: #58595b;\\n        text-indent: 10px;\\n    }\\n\\n    @media screen and (min-width: 40em) {\\n        h2 {\\n            margin-top: 0rem;\\n        }\\n    }\\n\\n@media screen and (min-width: 64em){\\n    h2 {\\n        font-size: 23rem;\\n    }\\n    p{\\n        font-size: 18rem;\\n        line-height: 21px;\\n    }\\n    a{\\n        font-size: 14rem;\\n    }\\n}\\n.text-container {\\n    position: sticky;\\n    top: 130px;\\n}\\n</style>\\n\\n<div class=\\\"text-container\\\">\\n    <h2>Project Details</h2>\\n    <p>I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.</p>\\n    <a target=\\\"blank\\\" href=\\\"\\\">\\n        <TextAnimation text={`View Website`} />\\n    </a>\\n</div>\"],\"names\":[],\"mappings\":\"AAME,eAAC,CAAC,AACI,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,SAAS,CACzB,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,WAAW,CAClB,UAAU,CAAE,KAAK,CACjB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,MAAM,AACtB,CAAC,AACD,EAAE,cAAC,CAAC,AACA,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAC5B,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,UAAU,CAC1B,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,WAAW,CAC/B,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,CAAC,AACd,CAAC,AAED,eAAC,CAAC,AACE,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,IAAI,AACrB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,EAAE,cAAC,CAAC,AACA,UAAU,CAAE,IAAI,AACpB,CAAC,AACL,CAAC,AAEL,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,cAAC,CAAC,AACA,SAAS,CAAE,KAAK,AACpB,CAAC,AACD,eAAC,CAAC,AACE,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,IAAI,AACrB,CAAC,AACD,eAAC,CAAC,AACE,SAAS,CAAE,KAAK,AACpB,CAAC,AACL,CAAC,AACD,eAAe,cAAC,CAAC,AACb,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,KAAK,AACd,CAAC\"}"
};

const Description = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$k);

	return `<div class="text-container svelte-s2xmgv">
	    <h2 class="svelte-s2xmgv">Project Details</h2>
	    <p class="svelte-s2xmgv">I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.</p>
	    <a target="blank" href="" class="svelte-s2xmgv">
	        ${validate_component(TextAnimation, 'TextAnimation').$$render($$result, { text: `View Website` }, {}, {})}
	    </a>
	</div>`;
});

/* src/components/project-detail/ImageGrid.svelte generated by Svelte v3.9.1 */

const css$l = {
	code: "@media screen and (min-width: 40em){.inner-container.svelte-y3hoac{width:90%;margin:0 auto}}.image-grid.svelte-y3hoac{display:flex;flex-wrap:wrap;flex-direction:column;align-items:center;padding-top:8%}@media screen and (min-width: 40em){.image-grid.svelte-y3hoac{box-sizing:border-box;flex-direction:row;align-items:unset;width:50%;margin:0 auto}.project-description.svelte-y3hoac{padding-top:8%;width:50%}}.grid-element-container.svelte-y3hoac{width:250px;display:flex;justify-content:center;align-items:center;margin-bottom:8%}@media screen and (min-width: 40em){.grid-element-container.svelte-y3hoac{width:50%}.grid-element-container.full-width.svelte-y3hoac{width:100%}}",
	map: "{\"version\":3,\"file\":\"ImageGrid.svelte\",\"sources\":[\"ImageGrid.svelte\"],\"sourcesContent\":[\"<script>\\nimport Image from './Image.svelte';\\nimport TopBar from './TopBar.svelte';\\nimport Description from './Description.svelte';\\n</script>\\n\\n<style>\\n@media screen and (min-width: 40em){\\n    .inner-container {\\n        width: 90%;\\n        margin: 0 auto;\\n    }\\n}\\n.image-grid {\\n    display: flex;\\n    flex-wrap: wrap;\\n    flex-direction: column;\\n    align-items: center;\\n    padding-top: 8%;\\n}\\n\\n@media screen and (min-width: 40em){\\n    .image-grid {\\n        box-sizing: border-box;\\n        flex-direction: row;\\n        align-items: unset;\\n        width: 50%;\\n        /* padding-left: 5%; */\\n        margin: 0 auto;\\n    }\\n    .project-description {\\n        padding-top: 8%;\\n        width: 50%;\\n    }\\n}\\n\\n.grid-element-container {\\n    width: 250px;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    margin-bottom: 8%;\\n}\\n\\n@media screen and (min-width: 40em){\\n    .grid-element-container {\\n        width: 50%;\\n    }\\n    .grid-element-container.full-width {\\n        width: 100%;\\n    }\\n    .grid-60 {\\n        width: 60%;\\n    }\\n    .grid-40 {\\n        width: 40%;\\n    }\\n}\\n</style>\\n\\n<div class=\\\"inner-container\\\">\\n    <TopBar />\\n    <div class=\\\"grid-x\\\">\\n        <div class=\\\"project-description\\\">\\n            <Description />\\n        </div>\\n        \\n        <div class=\\\"image-grid\\\">\\n            <div class=\\\"grid-element-container full-width\\\"> <!-- this should be a cool designer image (logo shiz) -->\\n                <Image width={'full-width'} imgSrc={'images/Jorden-Background-Gray.jpg'} url={''} alt={''} />\\n            </div>\\n            <div class=\\\"grid-element-container full-width\\\"> <!-- this should be a cool designer image (logo shiz) -->\\n                <Image width={'full-width'} imgSrc={'images/Jorden-Background-Gray.jpg'} url={''} alt={''} />\\n            </div>\\n            <div class=\\\"grid-element-container full-width\\\"> <!-- this should be a cool designer image (logo shiz) -->\\n                <Image width={'full-width'} imgSrc={'images/Jorden-Background-Gray.jpg'} url={''} alt={''} />\\n            </div>\\n        </div>\\n    </div>\\n</div>\"],\"names\":[],\"mappings\":\"AAOA,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,gBAAgB,cAAC,CAAC,AACd,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,CAAC,CAAC,IAAI,AAClB,CAAC,AACL,CAAC,AACD,WAAW,cAAC,CAAC,AACT,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,EAAE,AACnB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,WAAW,cAAC,CAAC,AACT,UAAU,CAAE,UAAU,CACtB,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,KAAK,CAClB,KAAK,CAAE,GAAG,CAEV,MAAM,CAAE,CAAC,CAAC,IAAI,AAClB,CAAC,AACD,oBAAoB,cAAC,CAAC,AAClB,WAAW,CAAE,EAAE,CACf,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,uBAAuB,cAAC,CAAC,AACrB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,aAAa,CAAE,EAAE,AACrB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,uBAAuB,cAAC,CAAC,AACrB,KAAK,CAAE,GAAG,AACd,CAAC,AACD,uBAAuB,WAAW,cAAC,CAAC,AAChC,KAAK,CAAE,IAAI,AACf,CAAC,AAOL,CAAC\"}"
};

const ImageGrid = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$l);

	return `<div class="inner-container svelte-y3hoac">
	    ${validate_component(TopBar, 'TopBar').$$render($$result, {}, {}, {})}
	    <div class="grid-x">
	        <div class="project-description svelte-y3hoac">
	            ${validate_component(Description, 'Description').$$render($$result, {}, {}, {})}
	        </div>
	        
	        <div class="image-grid svelte-y3hoac">
	            <div class="grid-element-container full-width svelte-y3hoac"> 
	                ${validate_component(Image$1, 'Image').$$render($$result, {
		width: 'full-width',
		imgSrc: 'images/Jorden-Background-Gray.jpg',
		url: '',
		alt: ''
	}, {}, {})}
	            </div>
	            <div class="grid-element-container full-width svelte-y3hoac"> 
	                ${validate_component(Image$1, 'Image').$$render($$result, {
		width: 'full-width',
		imgSrc: 'images/Jorden-Background-Gray.jpg',
		url: '',
		alt: ''
	}, {}, {})}
	            </div>
	            <div class="grid-element-container full-width svelte-y3hoac"> 
	                ${validate_component(Image$1, 'Image').$$render($$result, {
		width: 'full-width',
		imgSrc: 'images/Jorden-Background-Gray.jpg',
		url: '',
		alt: ''
	}, {}, {})}
	            </div>
	        </div>
	    </div>
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

const css$m = {
	code: "@keyframes svelte-10hn8pb-slideInRight{100%{transform:translateX(100%)}}@keyframes svelte-10hn8pb-badSlideInRight{0%{left:-100%}100%{left:5px}}div.svelte-10hn8pb:not(.page-header){display:flex;justify-content:flex-end;width:65%;margin:-05px 0px 20px 0;font-size:16rem;text-transform:uppercase;color:#58595b;max-width:900px}div.side-page.svelte-10hn8pb{font-size:12rem;max-width:1705px}div.title-container.svelte-10hn8pb:not(.side-page){position:relative;width:100%}@media screen and (min-width: 40em){div.title-container.svelte-10hn8pb:not(.side-page){margin-bottom:20px;width:75%}div.svelte-10hn8pb:not(.page-header){font-size:28rem;width:75%}div.side-page.svelte-10hn8pb{font-size:24rem;width:85%\n        }}h1.svelte-10hn8pb{color:#3B3B3B;position:relative;width:100%;top:0;right:0px;display:flex;font-size:32px;align-items:center;margin:0px}@media screen and (min-width: 40em){h1.svelte-10hn8pb{font-size:55px}}@media screen and (min-width: 64em){h1.svelte-10hn8pb{font-size:64px}}div.page-header.svelte-10hn8pb{margin-top:90px;position:relative;width:100vw;height:125px;display:flex;justify-content:center;align-items:flex-end;box-sizing:border-box;padding-left:20rem}@media screen and (min-width: 40em){div.page-header.svelte-10hn8pb{padding:0;box-sizing:content-box;height:220px}}@media screen and (min-width: 64em){div.page-header.svelte-10hn8pb{height:250px}}span.svelte-10hn8pb{position:absolute;transform:scaleX(-1);transform:scaleX(-1) rotate(180deg) skew(-10deg, 0deg);opacity:.03;left:3px;bottom:-25px;font-size:32px}@media screen and (min-width: 40em){span.svelte-10hn8pb{left:5px;bottom:-55px;font-size:55px}}@media screen and (min-width: 64em){span.svelte-10hn8pb{font-size:64px}}",
	map: "{\"version\":3,\"file\":\"PageTitle.svelte\",\"sources\":[\"PageTitle.svelte\"],\"sourcesContent\":[\"<script>\\nexport let title, sidePage;\\n// sidePage should be set to 'side-page' to toggle class\\n</script>\\n\\n<style>\\n\\n    @keyframes slideInRight {\\n        100% {\\n            transform: translateX(100%);\\n        }\\n    }\\n\\n    @keyframes badSlideInRight {\\n        0% {\\n            left: -100%;\\n        }\\n        100% {\\n            left: 5px;\\n        }\\n    }\\n\\n    div:not(.page-header) {\\n        display: flex;\\n        justify-content: flex-end;\\n        width: 65%;\\n        margin: -05px 0px 20px 0;\\n        font-size: 16rem;\\n        text-transform: uppercase;\\n        color: #58595b;\\n        max-width: 900px;\\n    }\\n\\n    div.side-page {\\n        font-size: 12rem;\\n        max-width: 1705px;\\n    }\\n\\n    div.title-container:not(.side-page){\\n        position: relative;\\n        /* animation: .9s ease-out 0s 1 fadeIn forwards; */\\n        width: 100%;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        div.title-container:not(.side-page){\\n            margin-bottom: 20px;\\n            width: 75%;\\n        }\\n\\n        div:not(.page-header) {\\n            font-size: 28rem;\\n            width: 75%;\\n        }\\n\\n        div.side-page {\\n            font-size: 24rem;\\n            width: 85%\\n        }\\n    }\\n\\n    h1 {\\n        color: #3B3B3B;\\n        position: relative;\\n        width: 100%;\\n        top: 0;\\n        /* left: -100%; */\\n        right: 0px;\\n        display: flex;\\n        font-size: 32px;\\n        align-items: center;\\n        margin: 0px;\\n        /* animation: 1s ease-out 0s 1 slideInRight forwards; */\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        h1 {\\n            font-size: 55px;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        h1 {\\n            font-size: 64px;\\n        }\\n    }\\n\\n    div.page-header{\\n        margin-top: 90px;\\n        position: relative;\\n        width: 100vw;\\n        height: 125px;\\n        display: flex;\\n        justify-content: center;\\n        align-items: flex-end;\\n        box-sizing: border-box;\\n        padding-left:20rem;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        div.page-header {\\n            padding: 0;\\n            box-sizing: content-box;\\n            height: 220px;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        div.page-header {\\n            height: 250px;\\n        }\\n    }\\n\\n    span{\\n        position: absolute;\\n        transform: scaleX(-1);\\n        transform: scaleX(-1) rotate(180deg) skew(-10deg, 0deg);\\n        opacity: .03;\\n        left: 3px;\\n        bottom: -25px;\\n        font-size: 32px;\\n         /* animation: 1s ease-out 0s 1 badSlideInRight; */\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        span {\\n            left: 5px;\\n            bottom: -55px;\\n            font-size: 55px;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        span {\\n            font-size: 64px;\\n        }\\n    }\\n    \\n</style>\\n<div class=\\\"page-header\\\">\\n    <div class='title-container {sidePage}'>\\n        <h1>{title}</h1>\\n        <span>{title}</span>\\n    </div>\\n</div>\"],\"names\":[],\"mappings\":\"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\"}"
};

const PageTitle$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { title, sidePage } = $$props;
// sidePage should be set to 'side-page' to toggle class

	if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
	if ($$props.sidePage === void 0 && $$bindings.sidePage && sidePage !== void 0) $$bindings.sidePage(sidePage);

	$$result.css.add(css$m);

	return `<div class="page-header svelte-10hn8pb">
	    <div class="title-container ${escape(sidePage)} svelte-10hn8pb">
	        <h1 class="svelte-10hn8pb">${escape(title)}</h1>
	        <span class="svelte-10hn8pb">${escape(title)}</span>
	    </div>
	</div>`;
});

/* src/components/about/AboutMe.svelte generated by Svelte v3.9.1 */

const css$n = {
	code: "div.svelte-1b7l8lk{display:flex;flex-direction:column}@media screen and (min-width: 40em){div.svelte-1b7l8lk{flex-direction:row}}p.svelte-1b7l8lk:nth-child(1){width:fit-content;margin-bottom:15rem;width:100%\n    }@media screen and (min-width: 40em){p.svelte-1b7l8lk:nth-child(1){width:20%}}h3.svelte-1b7l8lk{width:fit-content;margin-bottom:15rem;width:100%;text-transform:uppercase}@media screen and (min-width: 40em){h3.svelte-1b7l8lk{width:18%}}@media screen and (min-width: 64em){h3.svelte-1b7l8lk{font-size:23rem;width:20%}}p.svelte-1b7l8lk:nth-child(2){width:100%}@media screen and (min-width: 40em){p.svelte-1b7l8lk:nth-child(2){width:65%}}@media screen and (min-width: 64em){p.svelte-1b7l8lk:nth-child(2){width:50%}}p.svelte-1b7l8lk{font-weight:300;font-size:13rem;color:#58595b}@media screen and (min-width: 64em){p.svelte-1b7l8lk{font-size:18rem;line-height:23px}}",
	map: "{\"version\":3,\"file\":\"AboutMe.svelte\",\"sources\":[\"AboutMe.svelte\"],\"sourcesContent\":[\"<script>\\n\\n</script>\\n\\n<style>\\n\\n    div {\\n        display: flex;\\n        flex-direction: column;\\n    }\\n    \\n    @media screen and (min-width: 40em){\\n        div{\\n            flex-direction: row;\\n        }\\n    }\\n\\n    p:nth-child(1){\\n        width: fit-content;\\n        margin-bottom: 15rem;\\n        width: 100%\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        p:nth-child(1) {\\n            width: 20%;\\n        }\\n    }\\n\\n    h3{\\n        width: fit-content;\\n        margin-bottom: 15rem;\\n        width: 100%;\\n        text-transform: uppercase;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n       h3 {\\n            width: 18%;\\n        }\\n    }\\n    @media screen and (min-width: 64em){\\n        h3 {\\n            font-size: 23rem;\\n            width: 20%;\\n        }\\n    }\\n\\n    p:nth-child(2){\\n        width: 100%;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        p:nth-child(2) {\\n            width: 65%;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        p:nth-child(2) {\\n            width: 50%;\\n        }\\n    }\\n\\n    p {\\n        font-weight: 300;\\n        font-size: 13rem;\\n        color: #58595b;\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        p{\\n            font-size: 18rem;\\n            line-height: 23px;\\n        }\\n    }\\n\\n</style>\\n\\n<div>\\n    <h3>\\n        About Me\\n    </h3>\\n    <p>\\n        Hi There! I’m Josh, a Dallas-based <strong>Front End Developer</strong> with a knack for programing and design.\\n         My <strong>passion</strong> comes from being a part of a solution that brings each aspect of the customer journey \\n         together across both <strong>development and design</strong> processes.\\n        I focus on creating <strong>production ready applications</strong> with my knowledge of the user experience, \\n        and writing scalable <strong>clean code</strong>.\\n    </p>\\n</div>\"],\"names\":[],\"mappings\":\"AAMI,GAAG,eAAC,CAAC,AACD,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,AAC1B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,kBAAG,CAAC,AACA,cAAc,CAAE,GAAG,AACvB,CAAC,AACL,CAAC,AAED,gBAAC,WAAW,CAAC,CAAC,CAAC,AACX,KAAK,CAAE,UAAU,CAAC,CAClB,aAAa,CAAE,KAAK,CACpB,KAAK,CAAE,IAAI;IACf,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,gBAAC,WAAW,CAAC,CAAC,AAAC,CAAC,AACZ,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,iBAAE,CAAC,AACC,KAAK,CAAE,WAAW,CAClB,aAAa,CAAE,KAAK,CACpB,KAAK,CAAE,IAAI,CACX,cAAc,CAAE,SAAS,AAC7B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AACjC,EAAE,eAAC,CAAC,AACC,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AACD,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,eAAC,CAAC,AACA,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,gBAAC,WAAW,CAAC,CAAC,CAAC,AACX,KAAK,CAAE,IAAI,AACf,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,gBAAC,WAAW,CAAC,CAAC,AAAC,CAAC,AACZ,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,gBAAC,WAAW,CAAC,CAAC,AAAC,CAAC,AACZ,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,CAAC,eAAC,CAAC,AACC,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,OAAO,AAClB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,gBAAC,CAAC,AACE,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,IAAI,AACrB,CAAC,AACL,CAAC\"}"
};

const AboutMe = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$n);

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

const css$o = {
	code: "div.svelte-1yh9nhf{display:flex;flex-direction:column}@media screen and (min-width: 40em){div.svelte-1yh9nhf{flex-direction:row}}h3.svelte-1yh9nhf{width:fit-content;margin-bottom:15rem;width:100%;text-transform:uppercase}@media screen and (min-width: 40em){h3.svelte-1yh9nhf{width:18%}}@media screen and (min-width: 64em){h3.svelte-1yh9nhf{font-size:23rem;width:20%}}ul.skills.svelte-1yh9nhf{position:relative;top:10rem;width:100%;display:flex;flex-wrap:wrap}@media screen and (min-width: 40em){ul.skills.svelte-1yh9nhf{width:60%}}ul.skills.svelte-1yh9nhf::before{content:'';height:100%;position:absolute;border-left:3px solid #e6e7e8;opacity:.4}li.svelte-1yh9nhf{width:100%;font-weight:300;font-size:13rem;color:#58595b;margin:0rem 0rem 25rem 0rem;padding:0rem 0rem 0rem 0rem;display:flex;align-items:center;margin-left:-2px;height:0;z-index:2}@media screen and (min-width: 64em){li.svelte-1yh9nhf{font-size:18rem}}ul.svelte-1yh9nhf li.svelte-1yh9nhf:last-child{margin-bottom:0rem}li.svelte-1yh9nhf::before{content:'';width:7px;height:7px;background:#58595b;margin-right:10rem;border-radius:100%\n    }",
	map: "{\"version\":3,\"file\":\"Skills.svelte\",\"sources\":[\"Skills.svelte\"],\"sourcesContent\":[\"<script>\\n\\n</script>\\n\\n<style>\\n\\n    div {\\n        display: flex;\\n        flex-direction: column;\\n    }\\n    \\n    @media screen and (min-width: 40em){\\n        div{\\n            flex-direction: row;\\n        }\\n    }\\n\\n    h3 {\\n        width: fit-content;\\n        margin-bottom: 15rem;\\n        width: 100%;\\n        text-transform: uppercase;\\n        \\n    }\\n\\n    @media screen and (min-width: 40em){\\n        h3 {\\n            width: 18%;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        h3 {\\n            font-size: 23rem;\\n            width: 20%;\\n        }\\n    }\\n\\n    ul.skills{\\n        position: relative;\\n        top: 10rem;\\n        width: 100%;\\n        display: flex;\\n        flex-wrap: wrap;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        ul.skills{\\n            width: 60%;\\n        }\\n    }\\n\\n    ul.skills::before {\\n        content: '';\\n        height: 100%;\\n        position: absolute;\\n        border-left: 3px solid #e6e7e8;\\n        opacity: .4;\\n    }\\n\\n    p {\\n        font-weight: 300;\\n        font-size: 13rem;\\n        color: #58595b;\\n    }\\n\\n    \\n    li {\\n        width: 100%;\\n        font-weight: 300;\\n        font-size: 13rem;\\n        color: #58595b;\\n        margin: 0rem 0rem 25rem 0rem;\\n        padding: 0rem 0rem 0rem 0rem;\\n        display: flex;\\n        align-items: center;\\n        margin-left: -2px;\\n        height: 0;\\n        z-index: 2;\\n    }\\n\\n\\n    @media screen and (min-width: 64em){\\n        li {\\n            font-size: 18rem;\\n        }\\n    }\\n\\n    span {\\n        color: #414042;\\n        font-weight: 500;\\n    }\\n\\n    ul li:last-child {\\n        margin-bottom: 0rem;\\n    }\\n\\n    li::before {\\n        content: '';\\n        width: 7px;\\n        height: 7px;\\n        background: #58595b;\\n        margin-right: 10rem;\\n        border-radius: 100%\\n    }\\n\\n</style>\\n\\n<div>\\n    <h3>\\n        Skills\\n    </h3>\\n        <ul class=\\\"skills\\\">\\n            <li>React</li>\\n            <li>Svelte 3</li>\\n            <li>Sapper</li>\\n            <li>JavaScript (ES6+)</li>\\n            <li>WebPack</li>\\n            <li>Git (Version Control)</li>\\n            <li>jQuery</li> \\n            <li>SASS / SCSS</li>\\n            <li>CSS</li>\\n            <li>Foundation</li>\\n            <li>Bootstrap</li>\\n            <li>HTML (WCAG 2.1)</li>\\n            <li>HTML Emails</li>\\n            <li>GitHub / BitBucket</li>\\n            <li>WordPress / Kentico</li>\\n            <li>Adobe Suite</li>\\n            <li>SEO</li>\\n            <li>Usability Testing</li> \\n        </ul>\\n</div>\"],\"names\":[],\"mappings\":\"AAMI,GAAG,eAAC,CAAC,AACD,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,AAC1B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,kBAAG,CAAC,AACA,cAAc,CAAE,GAAG,AACvB,CAAC,AACL,CAAC,AAED,EAAE,eAAC,CAAC,AACA,KAAK,CAAE,WAAW,CAClB,aAAa,CAAE,KAAK,CACpB,KAAK,CAAE,IAAI,CACX,cAAc,CAAE,SAAS,AAE7B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,eAAC,CAAC,AACA,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,eAAC,CAAC,AACA,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,EAAE,sBAAO,CAAC,AACN,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,CACV,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,AACnB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,sBAAO,CAAC,AACN,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,EAAE,sBAAO,QAAQ,AAAC,CAAC,AACf,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAC9B,OAAO,CAAE,EAAE,AACf,CAAC,AASD,EAAE,eAAC,CAAC,AACA,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,IAAI,CAC5B,OAAO,CAAE,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAC5B,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACd,CAAC,AAGD,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,eAAC,CAAC,AACA,SAAS,CAAE,KAAK,AACpB,CAAC,AACL,CAAC,AAOD,iBAAE,CAAC,iBAAE,WAAW,AAAC,CAAC,AACd,aAAa,CAAE,IAAI,AACvB,CAAC,AAED,iBAAE,QAAQ,AAAC,CAAC,AACR,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,UAAU,CAAE,OAAO,CACnB,YAAY,CAAE,KAAK,CACnB,aAAa,CAAE,IAAI;IACvB,CAAC\"}"
};

const Skills$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$o);

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

const css$p = {
	code: "div.svelte-1cjafcw{display:flex;flex-direction:column}@media screen and (min-width: 40em){div.svelte-1cjafcw{flex-direction:row}}h3.svelte-1cjafcw{width:fit-content;margin-bottom:15rem;width:100%;text-transform:uppercase}@media screen and (min-width: 40em){h3.svelte-1cjafcw{width:18%}}@media screen and (min-width: 64em){h3.svelte-1cjafcw{font-size:23rem;width:20%}}.social-container.svelte-1cjafcw{width:70%;display:flex;flex-direction:column;justify-content:flex-start}i.svelte-1cjafcw{margin:05rem 0;color:gray;display:flex;align-items:center;transition:all .3s ease}i.svelte-1cjafcw>span.svelte-1cjafcw{margin-left:10rem;font-family:'Open Sans', sans-serif;font-weight:300;font-size:13rem;color:#58595b}@media screen and (min-width: 64em){i.svelte-1cjafcw>span.svelte-1cjafcw{font-size:18rem}}a.svelte-1cjafcw:hover i.svelte-1cjafcw{color:#3B3B3B}",
	map: "{\"version\":3,\"file\":\"Contact.svelte\",\"sources\":[\"Contact.svelte\"],\"sourcesContent\":[\"<script>\\n\\n</script>\\n\\n<style>\\n\\n    div {\\n        display: flex;\\n        flex-direction: column;\\n    }\\n    \\n    @media screen and (min-width: 40em){\\n        div{\\n            flex-direction: row;\\n        }\\n    }\\n\\n    h3{\\n        width: fit-content;\\n        margin-bottom: 15rem;\\n        width: 100%;\\n        text-transform: uppercase;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        h3 {\\n            width: 18%;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        h3 {\\n            font-size: 23rem;\\n            width: 20%;\\n        }\\n    }\\n\\n    P:nth-child(2)::before{\\n        content: '';\\n        display: block;\\n    }\\n    p {\\n        font-weight: 300;\\n        font-size: 13rem;\\n        color: #58595b;\\n    }\\n\\n    .social-container {\\n        width: 70%;\\n        display: flex;\\n        flex-direction: column;\\n        justify-content: flex-start;\\n    }\\n\\n    i {\\n        margin: 05rem 0;\\n        color: gray;\\n        display: flex;\\n        align-items: center;\\n        transition: all .3s ease;\\n    }\\n\\n    i > span {\\n        margin-left: 10rem;\\n        font-family: 'Open Sans', sans-serif;\\n        font-weight: 300;\\n        font-size: 13rem;\\n        color: #58595b;\\n    }\\n\\n    @media screen and (min-width: 64em){\\n        i > span{\\n            font-size: 18rem;\\n        }\\n    }\\n\\n    a:hover i {\\n        color: #3B3B3B;\\n    }\\n\\n\\n</style>\\n\\n<!-- <svelte:head>\\n    <script src=\\\"https://kit.fontawesome.com/1309990c29.js\\\"></script>\\n</svelte:head> this script is being added via the footer -->\\n\\n<div>\\n    <h3>\\n        Contact\\n    </h3>\\n    <div class=\\\"social-container\\\">\\n        <a href=\\\"https://www.github.com/Jrope21\\\" aria-label=\\\"link to Joshua Roper's GitHub account\\\" target=\\\"blank\\\" ><i class=\\\"fab fa-github\\\"><span>www.github.com/Jrope21</span></i></a>\\n        <a href=\\\"https://www.linkedin.com/in/JR-dev\\\" aria-label=\\\"link to Joshua Roper's LinkedIn account\\\" target=\\\"blank\\\" ><i class=\\\"fab fa-linkedin\\\"><span>www.linkedin.com/in/JR-dev</span></i></a>\\n        <a href=\\\"mailto:joshua.micah.roper@gmail.com\\\" aria-label=\\\"link to send Joshua Roper an email\\\" target=\\\"blank\\\" ><i class=\\\"fas fa-envelope\\\"><span>Joshua.Micah.Roper@gmail.com</span></i></a>\\n    </div>\\n</div>\"],\"names\":[],\"mappings\":\"AAMI,GAAG,eAAC,CAAC,AACD,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,AAC1B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,kBAAG,CAAC,AACA,cAAc,CAAE,GAAG,AACvB,CAAC,AACL,CAAC,AAED,iBAAE,CAAC,AACC,KAAK,CAAE,WAAW,CAClB,aAAa,CAAE,KAAK,CACpB,KAAK,CAAE,IAAI,CACX,cAAc,CAAE,SAAS,AAC7B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,eAAC,CAAC,AACA,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,EAAE,eAAC,CAAC,AACA,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,GAAG,AACd,CAAC,AACL,CAAC,AAYD,iBAAiB,eAAC,CAAC,AACf,KAAK,CAAE,GAAG,CACV,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,UAAU,AAC/B,CAAC,AAED,CAAC,eAAC,CAAC,AACC,MAAM,CAAE,KAAK,CAAC,CAAC,CACf,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,IAAI,AAC5B,CAAC,AAED,gBAAC,CAAG,IAAI,eAAC,CAAC,AACN,WAAW,CAAE,KAAK,CAClB,WAAW,CAAE,WAAW,CAAC,CAAC,UAAU,CACpC,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,OAAO,AAClB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,gBAAC,CAAG,mBAAI,CAAC,AACL,SAAS,CAAE,KAAK,AACpB,CAAC,AACL,CAAC,AAED,gBAAC,MAAM,CAAC,CAAC,eAAC,CAAC,AACP,KAAK,CAAE,OAAO,AAClB,CAAC\"}"
};

const Contact$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$p);

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

const css$q = {
	code: "section.svelte-haz9qt{display:flex;flex-direction:column;align-items:center;padding:5% 0 0% 0;position:relative;color:gray;margin-bottom:50px}section.svelte-haz9qt::before{content:'';width:100%;height:100%;position:absolute;top:0;z-index:-1}@media screen and (min-width: 40em){section.svelte-haz9qt{margin-bottom:80px}}@media screen and (min-width: 64em){section.svelte-haz9qt{flex:1}}.content-container.svelte-haz9qt{width:90%;margin-bottom:40rem;max-width:900px}@media screen and (min-width: 40em){.content-container.svelte-haz9qt{width:75%;margin-bottom:50rem;margin-left:100rem}}@media screen and (min-width: 64em){.content-container.svelte-haz9qt{width:100%}}",
	map: "{\"version\":3,\"file\":\"about.svelte\",\"sources\":[\"about.svelte\"],\"sourcesContent\":[\"<script>\\nimport { onMount } from 'svelte'\\nimport { fade, fly } from 'svelte/transition';\\n\\nimport PageTitle from '../components/about/PageTitle.svelte';\\n\\nimport AboutMe from '../components/about/AboutMe.svelte';\\nimport SkillsSection from '../components/about/Skills.svelte';\\nimport Contact from '../components/about/Contact.svelte';\\n\\n    // let x = .25;\\n    // let sections = [];\\n\\n    // onMount(()=>{\\n    //     for(let i = 0; i < sections.length; i++){\\n    //         let fadeInOrder = () => {\\n                \\n    //             sections[i].style.animation = `${'1'}s ease-in ${x}s 1 fadeInLeft forwards`;\\n    //             x += .35;\\n\\n    //         }\\n    //         fadeInOrder();\\n    //     }\\n    // })\\n</script>\\n\\n<style>\\n\\n section {\\n    display: flex;\\n    flex-direction: column;\\n    align-items: center;\\n    padding: 5% 0 0% 0;\\n    position: relative;\\n    color: gray;\\n    margin-bottom: 50px;\\n}\\n\\n\\tsection::before {\\n        content: '';\\n        width: 100%;\\n        height: 100%;\\n        position: absolute;\\n        top: 0;\\n        z-index: -1;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        section{\\n            margin-bottom: 80px;\\n        }\\n    }\\n\\n    @media screen and (min-width: 64em) {\\n        section{\\n            flex: 1;\\n        }\\n    }\\n\\n\\t.content-container {\\n        width: 90%;\\n        margin-bottom: 40rem;\\t\\t\\n        /* opacity: 0; */\\n        max-width: 900px;\\n    }\\n\\n    @media screen and (min-width: 40em){\\n        .content-container {\\n            width: 75%;\\n            margin-bottom: 50rem;\\n            margin-left: 100rem;\\n        }\\n    }\\n    @media screen and (min-width: 64em) {\\n        .content-container {\\n            width: 100%;\\n        }\\n    }\\n    \\n</style>\\n\\n<svelte:head>\\n\\t<title>About | Front End Developer - Joshua Roper</title>\\n</svelte:head>\\n\\n<div \\n    in:fly=\\\"{{ x: -80, duration: 500, delay: 200, }}\\\"\\n>\\n    <PageTitle title={'Joshua Roper'} />\\n</div>\\n\\n<section>\\n    <div class=\\\"container\\\">\\n        <div \\n            in:fly=\\\"{{ x: -40, duration: 500, delay: 450, }}\\\"\\n            class=\\\"content-container\\\"\\n         >\\n            <AboutMe />\\n        </div> \\n        <div \\n            in:fly=\\\"{{ x: -40, duration: 500, delay: 650, }}\\\"\\n            class=\\\"content-container\\\"\\n        >\\n            <SkillsSection />\\n        </div>\\n        <div \\n            in:fly=\\\"{{ x: -40, duration: 500, delay: 900, }}\\\"\\n            class=\\\"content-container\\\"\\n        >\\n            <Contact />\\n        </div>\\n    </div>\\n</section>\"],\"names\":[],\"mappings\":\"AA4BC,OAAO,cAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,EAAE,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAClB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,IAAI,AACvB,CAAC,AAEA,qBAAO,QAAQ,AAAC,CAAC,AACV,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,EAAE,AACf,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,qBAAO,CAAC,AACJ,aAAa,CAAE,IAAI,AACvB,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,qBAAO,CAAC,AACJ,IAAI,CAAE,CAAC,AACX,CAAC,AACL,CAAC,AAEJ,kBAAkB,cAAC,CAAC,AACb,KAAK,CAAE,GAAG,CACV,aAAa,CAAE,KAAK,CAEpB,SAAS,CAAE,KAAK,AACpB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AAChC,kBAAkB,cAAC,CAAC,AAChB,KAAK,CAAE,GAAG,CACV,aAAa,CAAE,KAAK,CACpB,WAAW,CAAE,MAAM,AACvB,CAAC,AACL,CAAC,AACD,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,AAAC,CAAC,AACjC,kBAAkB,cAAC,CAAC,AAChB,KAAK,CAAE,IAAI,AACf,CAAC,AACL,CAAC\"}"
};

const About = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$q);

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
	            ${validate_component(Skills$1, 'SkillsSection').$$render($$result, {}, {}, {})}
	        </div>
	        <div class="content-container svelte-haz9qt">
	            ${validate_component(Contact$1, 'Contact').$$render($$result, {}, {}, {})}
	        </div>
	    </div>
	</section>`;
});

/* src/routes/blog/index.svelte generated by Svelte v3.9.1 */

const css$r = {
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

	$$result.css.add(css$r);

	return `${($$result.head += `<title>Blog</title>`, "")}

	<h1>Recent posts</h1>

	<ul class="svelte-1frg2tf">
		${each(posts, (post) => `
			<li><a rel="prefetch" href="blog/${escape(post.slug)}">${escape(post.title)}</a></li>`)}
	</ul>`;
});

/* src/routes/blog/[slug].svelte generated by Svelte v3.9.1 */

const css$s = {
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

	$$result.css.add(css$s);

	return `${($$result.head += `<title>${escape(post.title)}</title>`, "")}

	<h1>${escape(post.title)}</h1>

	<div class="content svelte-gnxal1">
		${post.html}
	</div>`;
});

/* src/components/navigation/Hamburger.svelte generated by Svelte v3.9.1 */

const css$t = {
	code: "@keyframes svelte-1l6vpfi-leaveScreen{100%{transform:translateX(9999px)\n  }}#toggle.svelte-1l6vpfi{display:none}.hamburger.svelte-1l6vpfi{display:flex;flex-direction:column;justify-content:space-evenly;align-items:flex-end;border-bottom:2.2px solid black;cursor:pointer;width:24px;height:22px;transition:width .45s cubic-bezier(0.85, 0.08, 0.08, 0.99)}.hamburger.svelte-1l6vpfi::before{content:'';display:block;border-bottom:2.5px solid black;width:18px;transition:width .45s cubic-bezier(0.85, 0.08, 0.08, 0.99)}.hamburger.svelte-1l6vpfi::after{content:'';display:block;border-bottom:2.2px solid black;width:32px}.background.svelte-1l6vpfi{background:rgba(0, 0, 0, 0.319);opacity:0;width:100vw;height:100vh;position:fixed;bottom:0;left:0;z-index:1;transition:opacity .35s ease-in;animation:.01s ease-in .35s 1 svelte-1l6vpfi-leaveScreen forwards}#toggle:hover+.background+label.svelte-1l6vpfi>.hamburger.svelte-1l6vpfi{width:32px}#toggle:checked+.background+label.svelte-1l6vpfi>.hamburger.svelte-1l6vpfi{width:32px}#toggle:hover+.background+label.svelte-1l6vpfi>.hamburger.svelte-1l6vpfi::before{width:32px}#toggle:checked+.background+label.svelte-1l6vpfi>.hamburger.svelte-1l6vpfi::before{width:32px}#toggle:checked+.background.svelte-1l6vpfi{opacity:1;z-index:1;animation:unset}@media screen and (min-width: 64em){label.svelte-1l6vpfi{display:none}}.show-for-sr.svelte-1l6vpfi{border:0;clip:rect(1px, 1px, 1px, 1px);clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;word-wrap:normal !important}",
	map: "{\"version\":3,\"file\":\"Hamburger.svelte\",\"sources\":[\"Hamburger.svelte\"],\"sourcesContent\":[\"<script>\\nimport { onMount, afterUpdate, tick  } from 'svelte';\\n\\nexport let toggle;\\nexport let hamburger;\\n</script>\\n\\n<style>\\n\\n@keyframes leaveScreen {\\n  100%{\\n    transform: translateX(9999px)\\n  }\\n}\\n\\n#toggle {\\n  display: none;\\n}\\n\\n.hamburger {\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: space-evenly;\\n  align-items: flex-end;\\n  border-bottom: 2.2px solid black;\\n  cursor: pointer;\\n  width: 24px;\\n  height: 22px;\\n  transition: width .45s cubic-bezier(0.85, 0.08, 0.08, 0.99);\\n}\\n\\n.hamburger::before {\\n  content: '';\\n  display: block;\\n  border-bottom: 2.5px solid black;\\n  width: 18px;\\n  transition: width .45s cubic-bezier(0.85, 0.08, 0.08, 0.99);\\n}\\n\\n.hamburger::after {\\n  content: '';\\n  display: block;\\n  border-bottom: 2.2px solid black;\\n  width: 32px;\\n}\\n\\n.background {\\n  background: rgba(0, 0, 0, 0.319);\\n  opacity: 0;\\n  width: 100vw;\\n  height: 100vh;\\n  position: fixed;\\n  bottom: 0;\\n  left: 0;\\n  z-index: 1;\\n  transition: opacity .35s ease-in;\\n  animation: .01s ease-in .35s 1 leaveScreen forwards;\\n}\\n\\n#toggle:hover + .background + label > .hamburger {\\n  width: 32px;\\n}\\n\\n#toggle:checked + .background + label > .hamburger {\\n  width: 32px;\\n}\\n\\n#toggle:hover + .background + label > .hamburger::before {\\n  width: 32px;\\n}\\n\\n#toggle:checked + .background + label > .hamburger::before {\\n  width: 32px;\\n}\\n\\n#toggle:checked + .background {\\n  opacity: 1;\\n  z-index: 1;\\n  animation: unset;\\n}\\n\\n@media screen and (min-width: 64em){\\n  label {\\n    display: none;\\n  }\\n}\\n\\n.show-for-sr {\\n  border: 0;\\n  clip: rect(1px, 1px, 1px, 1px);\\n  clip-path: inset(50%);\\n  height: 1px;\\n  margin: -1px;\\n  overflow: hidden;\\n  padding: 0;\\n  position: absolute;\\n  width: 1px;\\n  word-wrap: normal !important;\\n}\\n\\n</style>\\n\\n<input id=\\\"toggle\\\" type=\\\"checkbox\\\" class=\\\"hide subnav-toggle hide-for-xlg\\\">\\n<div class=\\\"background\\\" on:click></div>\\n<label id=\\\"nav-label\\\" bind:this={hamburger} for=\\\"toggle\\\" class=\\\"hide-for-xlg\\\">\\n    <span class=\\\"show-for-sr\\\">Navigation</span>\\n    <span class=\\\"hamburger\\\" title=\\\"Navigation\\\"> </span>\\n</label>\"],\"names\":[],\"mappings\":\"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\"}"
};

const Hamburger = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { toggle, hamburger } = $$props;

	if ($$props.toggle === void 0 && $$bindings.toggle && toggle !== void 0) $$bindings.toggle(toggle);
	if ($$props.hamburger === void 0 && $$bindings.hamburger && hamburger !== void 0) $$bindings.hamburger(hamburger);

	$$result.css.add(css$t);

	return `<input id="toggle" type="checkbox" class="hide subnav-toggle hide-for-xlg svelte-1l6vpfi">
	<div class="background svelte-1l6vpfi"></div>
	<label id="nav-label" for="toggle" class="hide-for-xlg svelte-1l6vpfi"${add_attribute("this", hamburger, 1)}>
	    <span class="show-for-sr svelte-1l6vpfi">Navigation</span>
	    <span class="hamburger svelte-1l6vpfi" title="Navigation"> </span>
	</label>`;
});

/* src/components/modals/ModalTemplate.svelte generated by Svelte v3.9.1 */

const css$u = {
	code: ".modal-container.svelte-glpclt{position:fixed;top:0;left:0;width:100%;height:100%;z-index:50}.modal-background.svelte-glpclt{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;background:rgba(0,0,0,0.3)}.container.svelte-glpclt{width:100%;height:100%}.modal.svelte-glpclt{width:calc(100vw - 4em);width:80%;max-width:650px;max-height:90vh;overflow:auto;border-radius:10rem;background:white;z-index:50}@media screen and (min-width: 40em){.modal.svelte-glpclt{max-height:450px;max-width:600px;width:85%}}@media screen and (min-width: 64em){.modal.svelte-glpclt{width:70%;max-width:750px}}",
	map: "{\"version\":3,\"file\":\"ModalTemplate.svelte\",\"sources\":[\"ModalTemplate.svelte\"],\"sourcesContent\":[\"<script>\\n    import { createEventDispatcher } from 'svelte';\\n    import { fade, fly } from 'svelte/transition';\\n\\n    export let showModal\\n    \\n    const dispatch = createEventDispatcher();\\n    \\n</script>\\n\\n<style>\\n\\n    .modal-container{\\n        position: fixed;\\n\\t\\ttop: 0;\\n\\t\\tleft: 0;\\n\\t\\twidth: 100%;\\n        height: 100%;\\n        z-index: 50;\\n    }\\n\\t.modal-background {\\n\\t\\tposition: fixed;\\n\\t\\ttop: 0;\\n\\t\\tleft: 0;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\tz-index: -1;\\n        background: rgba(0,0,0,0.3);\\n\\t}\\n\\n\\t.container{\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t}\\n\\n\\t.modal {\\n        width: calc(100vw - 4em);\\n        width: 80%;\\n\\t\\tmax-width: 650px;\\n\\t\\tmax-height: 90vh;\\n\\t\\toverflow: auto;\\n\\t\\tborder-radius: 10rem;\\n        background: white;\\n        z-index: 50;\\n    }\\n    \\n\\t@media screen and (min-width: 40em){\\n\\t\\t.modal {\\n\\t\\t\\tmax-height: 450px;\\n\\t\\t\\tmax-width: 600px;\\n\\t\\t\\twidth: 85%;\\n\\t\\t}\\n    }\\n\\n\\t@media screen and (min-width: 64em){\\n\\t\\t.modal {\\n\\t\\t\\twidth: 70%;\\n\\t\\t\\tmax-width: 750px;\\n\\t\\t}\\n    }\\n    \\n\\tbutton {\\n\\t\\tdisplay: block;\\n    }   \\n    \\n</style>\\n\\n<div class='center-all modal-container {showModal ? 'show-modal' : ''}' in:fade out:fade >\\n    <div class=\\\"modal-background\\\" on:click></div>\\n\\t<div class='modal' in:fly=\\\"{{ y: -20, duration: 450, delay: 200, }}\\\" out:fly=\\\"{{ y: -20, duration: 450 }}\\\">\\n\\t\\t<slot name='header'></slot>\\n\\t\\t<slot></slot>\\n\\t</div>\\n</div>\"],\"names\":[],\"mappings\":\"AAYI,8BAAgB,CAAC,AACb,QAAQ,CAAE,KAAK,CACrB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,IAAI,CACL,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,EAAE,AACf,CAAC,AACJ,iBAAiB,cAAC,CAAC,AAClB,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,EAAE,CACL,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,AAClC,CAAC,AAED,wBAAU,CAAC,AACV,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACb,CAAC,AAED,MAAM,cAAC,CAAC,AACD,KAAK,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CACxB,KAAK,CAAE,GAAG,CAChB,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,IAAI,CAChB,QAAQ,CAAE,IAAI,CACd,aAAa,CAAE,KAAK,CACd,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,EAAE,AACf,CAAC,AAEJ,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AACnC,MAAM,cAAC,CAAC,AACP,UAAU,CAAE,KAAK,CACjB,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,GAAG,AACX,CAAC,AACC,CAAC,AAEJ,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,IAAI,CAAC,CAAC,AACnC,MAAM,cAAC,CAAC,AACP,KAAK,CAAE,GAAG,CACV,SAAS,CAAE,KAAK,AACjB,CAAC,AACC,CAAC\"}"
};

const ModalTemplate = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	

    let { showModal } = $$props;

	if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0) $$bindings.showModal(showModal);

	$$result.css.add(css$u);

	return `<div class="center-all modal-container ${escape(showModal ? 'show-modal' : '')} svelte-glpclt">
	    <div class="modal-background svelte-glpclt"></div>
		<div class="modal svelte-glpclt">
			${$$slots.header ? $$slots.header({}) : ``}
			${$$slots.default ? $$slots.default({}) : ``}
		</div>
	</div>`;
});

/* src/components/loaders/BoxLoader.svelte generated by Svelte v3.9.1 */

const css$v = {
	code: "#loader.svelte-12rrru0{position:absolute;top:50%;left:50%;margin-top:-2.7em;margin-left:-2.7em;width:5.4em;height:5.4em}#hill.svelte-12rrru0{position:absolute;width:7.1em;height:7.1em;top:1.7em;left:1.7em;background-color:transparent;border-left:.25em solid lightgray;transform:rotate(45deg)}#hill.svelte-12rrru0:after{content:'';position:absolute;width:7.1em;height:7.1em;left:0}#box.svelte-12rrru0{position:absolute;left:0;bottom:-.1em;width:1em;height:1em;background-color:transparent;border:.25em solid lightgray;border-radius:15%;transform:translate(0, -1em) rotate(-45deg);animation:svelte-12rrru0-push 2.5s cubic-bezier(.79, 0, .47, .97) infinite}@keyframes svelte-12rrru0-push{0%{transform:translate(0, -1em) rotate(-45deg)}5%{transform:translate(0, -1em) rotate(-50deg)}20%{transform:translate(1em, -2em) rotate(47deg)}25%{transform:translate(1em, -2em) rotate(45deg)}30%{transform:translate(1em, -2em) rotate(40deg)}45%{transform:translate(2em, -3em) rotate(137deg)}50%{transform:translate(2em, -3em) rotate(135deg)}55%{transform:translate(2em, -3em) rotate(130deg)}70%{transform:translate(3em, -4em) rotate(217deg)}75%{transform:translate(3em, -4em) rotate(220deg)}100%{transform:translate(0, -1em) rotate(-225deg)}}",
	map: "{\"version\":3,\"file\":\"BoxLoader.svelte\",\"sources\":[\"BoxLoader.svelte\"],\"sourcesContent\":[\"<script>\\nimport { fade, fly } from 'svelte/transition';\\n\\n</script>\\n\\n<style>\\n#loader {\\n  position: absolute;\\n  top: 50%;\\n  left: 50%;\\n  margin-top: -2.7em;\\n  margin-left: -2.7em;\\n  width: 5.4em;\\n  height: 5.4em;\\n}\\n\\n#hill {\\n  position: absolute;\\n  width: 7.1em;\\n  height: 7.1em;\\n  top: 1.7em;\\n  left: 1.7em;\\n  background-color: transparent;\\n  border-left: .25em solid lightgray;\\n  transform: rotate(45deg);\\n}\\n\\n#hill:after {\\n  content: '';\\n  position: absolute;\\n  width: 7.1em;\\n  height: 7.1em;\\n  left: 0;\\n}\\n\\n#box {\\n  position: absolute;\\n  left: 0;\\n  bottom: -.1em;\\n  width: 1em;\\n  height: 1em;\\n  background-color: transparent;\\n  border: .25em solid lightgray;\\n  border-radius: 15%;\\n  transform: translate(0, -1em) rotate(-45deg);\\n  animation: push 2.5s cubic-bezier(.79, 0, .47, .97) infinite;\\n}\\n\\n@keyframes push {\\n  0% {\\n    transform: translate(0, -1em) rotate(-45deg);\\n  }\\n  5% {\\n    transform: translate(0, -1em) rotate(-50deg);\\n  }\\n  20% {\\n    transform: translate(1em, -2em) rotate(47deg);\\n  }\\n  25% {\\n    transform: translate(1em, -2em) rotate(45deg);\\n  }\\n  30% {\\n    transform: translate(1em, -2em) rotate(40deg);\\n  }\\n  45% {\\n    transform: translate(2em, -3em) rotate(137deg);\\n  }\\n  50% {\\n    transform: translate(2em, -3em) rotate(135deg);\\n  }\\n  55% {\\n    transform: translate(2em, -3em) rotate(130deg);\\n  }\\n  70% {\\n    transform: translate(3em, -4em) rotate(217deg);\\n  }\\n  75% {\\n    transform: translate(3em, -4em) rotate(220deg);\\n  }\\n  100% {\\n    transform: translate(0, -1em) rotate(-225deg);\\n  }\\n}\\n</style>\\n\\n<div id=\\\"loader\\\" in:fade out:fade>\\n  <div id=\\\"box\\\"></div>\\n  <div id=\\\"hill\\\"></div>\\n</div>\"],\"names\":[],\"mappings\":\"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\"}"
};

const BoxLoader = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$v);

	return `<div id="loader" class="svelte-12rrru0">
	  <div id="box" class="svelte-12rrru0"></div>
	  <div id="hill" class="svelte-12rrru0"></div>
	</div>`;
});

/* src/components/modals/ContactModal.svelte generated by Svelte v3.9.1 */

const css$w = {
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

	$$result.css.add(css$w);

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

const css$x = {
	code: "header.svelte-1y64f7j{border-bottom:1px solid #d6d6d6;position:fixed;width:100%;top:0;z-index:50;background:white}nav.svelte-1y64f7j{display:flex;justify-content:space-between;align-items:center;padding:30rem 20rem;transition:all .45s cubic-bezier(0.85, 0.08, 0.08, 0.99)}nav.scrolled.svelte-1y64f7j{padding:20rem 20rem}@media screen and (min-width: 40em){nav.svelte-1y64f7j{padding:35rem 40rem}nav.scrolled.svelte-1y64f7j{padding:20rem 40rem}}ul.navigation.svelte-1y64f7j{box-sizing:border-box;background:white;display:flex;justify-content:center;flex-direction:column;justify-content:center;align-items:flex-end;position:fixed;z-index:2;width:250px;right:0;transform:translateX(100%);bottom:0;height:100%;padding:0rem 20rem;transition:transform 1s cubic-bezier(0.85, 0.08, 0.08, 0.99)}#toggle:checked~ul.navigation.svelte-1y64f7j{display:flex;transform:translateX(0)}@media screen and (min-width: 40em){ul.navigation.svelte-1y64f7j{padding:0rem 40rem}}@media screen and (min-width: 64em){ul.navigation.svelte-1y64f7j{transform:unset;position:relative;display:flex;flex-direction:row;width:unset;padding:0}}li.svelte-1y64f7j{position:relative;text-align:right;padding:5rem 0rem;width:auto;overflow-x:hidden;font-size:14rem}@media screen and (min-width: 64em){li.svelte-1y64f7j{font-size:16rem;margin:0rem 20rem;padding:2.5rem 0}p.svelte-1y64f7j{font-size:18rem}}li.svelte-1y64f7j:not(.close-container)::after{content:'';position:absolute;left:0;transform:translateX(100%);bottom:0;width:100%;opacity:1;border-bottom:2px solid #3B3B3B;transition:transform .45s cubic-bezier(0.85, 0.08, 0.08, 0.99)}li.svelte-1y64f7j:not(.close-container):hover::after{transform:translateX(0)}.close-container.svelte-1y64f7j{position:absolute;top:50rem;right:50rem;overflow:unset;cursor:pointer}@media screen and (min-width: 40em){.close-container.svelte-1y64f7j{right:70rem}}@media screen and (min-width: 64em){.close-container.svelte-1y64f7j{display:none}}.close.svelte-1y64f7j{width:32px;height:32px;position:relative;align-items:center;justify-content:center}.close.svelte-1y64f7j::before{content:'';display:block;position:absolute;border-bottom:2px solid black;width:32px;transform:rotate(45deg)}.close.svelte-1y64f7j::after{content:'';display:block;position:absolute;border-bottom:2px solid black;width:32px;transform:rotate(-45deg)}a.svelte-1y64f7j:not(.logo){display:block;padding:5rem 0rem;text-transform:uppercase}p.svelte-1y64f7j{font-weight:700;font-style:italic}.code.svelte-1y64f7j{font-weight:100;font-style:normal;opacity:.3}.logo-hover.svelte-1y64f7j{transition:all .3s ease-in}.logo.svelte-1y64f7j:hover .logo-hover.svelte-1y64f7j{color:black}",
	map: "{\"version\":3,\"file\":\"Navigation.svelte\",\"sources\":[\"Navigation.svelte\"],\"sourcesContent\":[\"<script>\\nimport Hamburger from './Hamburger.svelte';\\nimport ContactModal from '../modals/ContactModal.svelte';\\n\\nimport { onMount } from 'svelte';\\n\\nlet showModal;\\n\\nlet windowY;\\nlet hamburger;\\nlet toggle = false;\\n\\nlet reduceNavSize = false;\\n\\n$: headerClass = navSize(windowY);\\n\\nfunction navSize(y){\\n    if(y > 75){\\n        reduceNavSize = true;\\n    } else {\\n        reduceNavSize = false;\\n    }\\n}\\n\\nfunction togglerOff(){\\n    if(window.innerWidth < 1023){\\n        hamburger ? hamburger.$$.ctx.hamburger.click() : null;\\n    }\\n}\\n\\nfunction openModal(){\\n    showModal = true;\\n}\\n\\n</script>\\n\\n<style>\\n\\nheader {\\n    border-bottom: 1px solid #d6d6d6;\\n    position: fixed;\\n    width: 100%;\\n    top: 0;\\n    z-index: 50;\\n    background: white;\\n}\\n\\nnav {\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: center;\\n    padding: 30rem 20rem;\\n    transition: all .45s cubic-bezier(0.85, 0.08, 0.08, 0.99);\\n}\\n\\nnav.scrolled {\\n    padding: 20rem 20rem;\\n}\\n\\n@media screen and (min-width: 40em) {\\n    nav {\\n        padding: 35rem 40rem;\\n    }\\n    nav.scrolled {\\n        padding: 20rem 40rem;\\n    }\\n}\\n\\nul.navigation {\\n    box-sizing: border-box;\\n    background: white;\\n    display: flex;\\n    justify-content: center;\\n    flex-direction: column;\\n    justify-content: center;\\n    align-items: flex-end;\\n    position: fixed;\\n    z-index: 2;\\n    width: 250px;\\n    right: 0;\\n    transform: translateX(100%);\\n    bottom: 0;\\n    height: 100%;\\n    padding: 0rem 20rem;\\n    transition: transform 1s cubic-bezier(0.85, 0.08, 0.08, 0.99);\\n}\\n\\n#toggle:checked ~ ul.navigation{\\n    display: flex;\\n    transform: translateX(0);\\n}\\n\\n@media screen and (min-width: 40em) {\\n    ul.navigation {\\n        padding: 0rem 40rem;\\n    }\\n}\\n\\n@media screen and (min-width: 64em) {\\n    ul.navigation{\\n        transform: unset;   \\n        position: relative;\\n        display: flex;\\n        flex-direction: row;\\n        width: unset;\\n        padding: 0;\\n    }\\n}\\n\\nli {\\n    position: relative;\\n    text-align: right;\\n    padding: 5rem 0rem;\\n    width: auto;\\n    overflow-x: hidden;\\n    font-size: 14rem;\\n}\\n\\n@media screen and (min-width: 64em){\\n    li {\\n        font-size: 16rem;\\n        margin: 0rem 20rem;\\n        padding: 2.5rem 0;\\n    }\\n    p{\\n        font-size: 18rem;\\n    }\\n}\\n\\nli:not(.close-container)::after, .active::after {\\n    content: '';\\n    position: absolute;\\n    left: 0;\\n    transform: translateX(100%);\\n    bottom: 0;\\n    width: 100%;\\n    opacity: 1;\\n    border-bottom: 2px solid #3B3B3B;\\n    transition: transform .45s cubic-bezier(0.85, 0.08, 0.08, 0.99);\\n}\\n\\nli:not(.close-container):hover::after, .active::after {\\n    transform: translateX(0);\\n}\\n\\n.close-container {\\n    position: absolute;\\n    top: 50rem;\\n    right: 50rem;\\n    overflow: unset;\\n    cursor: pointer;\\n}\\n\\n@media screen and (min-width: 40em){\\n    .close-container {\\n        right: 70rem;\\n    }\\n}\\n\\n@media screen and (min-width: 64em){\\n    .close-container {\\n        display: none;\\n    }\\n}\\n\\n.close {\\n    width:32px;\\n    height:32px;\\n    position: relative;\\n    align-items: center;\\n    justify-content: center;\\n}\\n\\n.close::before {\\n  content: '';\\n  display: block;\\n  position: absolute;\\n  border-bottom: 2px solid black;\\n  width: 32px;\\n  transform: rotate(45deg);\\n}\\n\\n.close::after {\\n  content: '';\\n  display: block;\\n  position: absolute;\\n  border-bottom: 2px solid black;\\n  width: 32px;\\n  transform: rotate(-45deg);\\n}\\n\\na:not(.logo) {\\n    display: block;\\n    padding: 5rem 0rem;\\n    text-transform: uppercase;\\n}\\n\\np{\\n    font-weight: 700;\\n    font-style: italic;\\n}\\n.code {\\n    font-weight: 100;\\n    font-style: normal;\\n    opacity: .3;\\n}\\n\\n.logo-hover {\\n    transition: all .3s ease-in;\\n}\\n\\n.logo:hover .logo-hover {\\n    color: black;\\n    \\n}\\n\\n</style>\\n\\n<svelte:window bind:scrollY={windowY}/>\\n\\n<header>\\n    <nav class={reduceNavSize ? 'scrolled container' : 'container'}>\\n        <a href='/' class=\\\"logo\\\">\\n            <p>\\n                <span class=\\\"code\\\">&lt;h1&gt;</span>Hi There<span class=\\\"logo-hover\\\">!</span><span class=\\\"code\\\">&lt;/h1&gt;</span>\\n            </p>\\n        </a>\\n        <Hamburger on:click={togglerOff} toggle={toggle} bind:this={hamburger} />\\n        <ul class=\\\"navigation\\\">\\n            <li class=\\\"close-container\\\" on:click={togglerOff} ><span class=\\\"close\\\"></span></li>\\n            <li><a class=\\\"\\\" on:click={togglerOff} rel=prefetch href=\\\"/\\\">Home</a></li>\\n            <li><a on:click={togglerOff} rel=prefetch href=\\\"/about\\\">About</a></li>\\n            <li><a on:click={togglerOff} href=\\\"/experience\\\">Experience</a></li>\\n            <li><a on:click={openModal} href=\\\"javascript:void(0)\\\">Contact</a></li>\\n        </ul>\\n    </nav>\\n</header>\\n\\n<ContactModal on:click={() => showModal = false} showModal={showModal}/>\"],\"names\":[],\"mappings\":\"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\"}"
};

let toggle = false;

const Navigation = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	

let showModal;

let windowY;
let hamburger;

let reduceNavSize = false;

function navSize(y){
    if(y > 75){
        reduceNavSize = true;
    } else {
        reduceNavSize = false;
    }
}

	$$result.css.add(css$x);

	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		let headerClass = navSize(windowY);

		$$rendered = `

		<header class="svelte-1y64f7j">
		    <nav class="${escape(null_to_empty(reduceNavSize ? 'scrolled container' : 'container'))} svelte-1y64f7j">
		        <a href="/" class="logo svelte-1y64f7j">
		            <p class="svelte-1y64f7j">
		                <span class="code svelte-1y64f7j">&lt;h1&gt;</span>Hi There<span class="logo-hover svelte-1y64f7j">!</span><span class="code svelte-1y64f7j">&lt;/h1&gt;</span>
		            </p>
		        </a>
		        ${validate_component(Hamburger, 'Hamburger').$$render($$result, {
			toggle: toggle,
			this: hamburger
		}, {
			this: $$value => { hamburger = $$value; $$settled = false; }
		}, {})}
		        <ul class="navigation svelte-1y64f7j">
		            <li class="close-container svelte-1y64f7j"><span class="close svelte-1y64f7j"></span></li>
		            <li class="svelte-1y64f7j"><a class=" svelte-1y64f7j" rel="prefetch" href="/">Home</a></li>
		            <li class="svelte-1y64f7j"><a rel="prefetch" href="/about" class="svelte-1y64f7j">About</a></li>
		            <li class="svelte-1y64f7j"><a href="/experience" class="svelte-1y64f7j">Experience</a></li>
		            <li class="svelte-1y64f7j"><a href="javascript:void(0)" class="svelte-1y64f7j">Contact</a></li>
		        </ul>
		    </nav>
		</header>

		${validate_component(ContactModal, 'ContactModal').$$render($$result, { showModal: showModal }, {}, {})}`;
	} while (!$$settled);

	return $$rendered;
});

/* src/components/footer/Footer.svelte generated by Svelte v3.9.1 */

const css$y = {
	code: "footer.svelte-1a3fz2r{border-top:1px solid #d6d6d6;background:white;color:#3B3B3B}.footer-container.svelte-1a3fz2r{margin-top:40px;display:flex;flex-direction:column;padding-bottom:0}@media screen and (min-width: 40em){.footer-container.svelte-1a3fz2r{flex-direction:row}}.left.svelte-1a3fz2r,.right.svelte-1a3fz2r{margin-bottom:55rem}@media screen and (min-width: 40em){.left.svelte-1a3fz2r,.right.svelte-1a3fz2r{margin-bottom:60rem}.bottom-row.svelte-1a3fz2r{display:flex}.left.svelte-1a3fz2r,.copyright.svelte-1a3fz2r{padding-right:80rem;width:60%}.right.svelte-1a3fz2r{padding-top:20rem}}@media screen and (min-width: 64em){.left.svelte-1a3fz2r,.copyright.svelte-1a3fz2r{width:50%}.left.svelte-1a3fz2r,.right.svelte-1a3fz2r{margin-bottom:70rem}}.text-cta.svelte-1a3fz2r:first-of-type{margin-bottom:20rem}.headline.svelte-1a3fz2r{font-size:40px;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;line-height:45px;font-weight:700;max-width:420px}.headline.svelte-1a3fz2r a.svelte-1a3fz2r{color:#58595b;transition:all .45s ease-in-out;opacity:.75}.headline.svelte-1a3fz2r a.svelte-1a3fz2r:hover{color:black}.title.svelte-1a3fz2r{font-weight:100;font-size:12rem}.text-cta.svelte-1a3fz2r a.svelte-1a3fz2r{font-size:14rem}.bottom-row.svelte-1a3fz2r{padding-top:0}.copyright.svelte-1a3fz2r{font-size:12rem;font-style:italic;font-weight:300}.left.svelte-1a3fz2r p.svelte-1a3fz2r:last-child{color:#58595b;font-size:18px;font-weight:900;margin-top:25rem}div.social-icons.svelte-1a3fz2r{margin-top:8px;min-width:206px}i.svelte-1a3fz2r{font-size:14px;margin-right:8px;color:#808080;transition:all .3s ease}a.svelte-1a3fz2r:hover>i.svelte-1a3fz2r{transform:translateY(-3px);color:#58595b}@media screen and (min-width: 40em){div.social-icons.svelte-1a3fz2r{margin:0}i.svelte-1a3fz2r{font-size:18px;margin-right:10px}.left.svelte-1a3fz2r p.svelte-1a3fz2r:last-child{margin-top:60rem}}@media screen and (min-width: 64em){.title.svelte-1a3fz2r{font-size:16rem\n    }.text-cta.svelte-1a3fz2r a.svelte-1a3fz2r{font-size:18rem}.copyright.svelte-1a3fz2r{font-size:14rem}.headline.svelte-1a3fz2r{font-size:45px;max-width:440px}.left.svelte-1a3fz2r p.svelte-1a3fz2r:last-child{font-size:22px;margin-top:70rem}i.svelte-1a3fz2r{font-size:20px}}",
	map: "{\"version\":3,\"file\":\"Footer.svelte\",\"sources\":[\"Footer.svelte\"],\"sourcesContent\":[\"<script>\\nimport TextAnimation from '../helper-components/TextAnimation.svelte';\\n\\n</script>\\n\\n<style>\\nfooter {\\n    border-top: 1px solid #d6d6d6;\\n    background: white;\\n    color: #3B3B3B;\\n}\\n\\n.footer-container {\\n    margin-top: 40px;\\n    display: flex;\\n    flex-direction: column;\\n    padding-bottom: 0;\\n}\\n\\n@media screen and (min-width: 40em){\\n    .footer-container {\\n        flex-direction: row;\\n    }\\n}\\n\\n.left, .right {\\n    margin-bottom: 55rem;\\n}\\n\\n@media screen and (min-width: 40em){\\n    .left, .right {\\n        margin-bottom: 60rem;\\n    }\\n    .bottom-row {\\n        display: flex;\\n    }\\n    .left, .copyright{\\n        padding-right: 80rem;\\n        width: 60%;\\n    }\\n    .right {\\n        padding-top: 20rem;\\n    }\\n}\\n\\n@media screen and (min-width: 64em){\\n    .left, .copyright {\\n        width: 50%;\\n    }\\n    .left, .right {\\n        margin-bottom: 70rem;\\n    }\\n}\\n\\n.text-cta:first-of-type {\\n    margin-bottom: 20rem;\\n}\\n\\n.headline {\\n    font-size: 40px;\\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;\\n    line-height: 45px;\\n    font-weight: 700;\\n    max-width: 420px;\\n}\\n\\n.headline a {\\n    color: #58595b;\\n    transition: all .45s ease-in-out;\\n    opacity: .75;\\n}\\n\\n.headline a:hover {\\n    color: black;\\n}\\n\\n.title {\\n    font-weight: 100;\\n    font-size: 12rem;\\n}\\n\\n.text-cta a {\\n    font-size: 14rem;\\n}\\n\\n.bottom-row {\\n    padding-top: 0;\\n}\\n\\n.copyright {\\n    font-size: 12rem;\\n    font-style: italic;\\n    font-weight: 300;\\n}\\n\\n.left p:last-child {\\n    color: #58595b;\\n    font-size: 18px;\\n    font-weight: 900;\\n    margin-top: 25rem;\\n}\\n\\ndiv.social-icons {\\n    margin-top: 8px;\\n    min-width: 206px;\\n}\\n\\ni {\\n    font-size: 14px;\\n    margin-right: 8px;\\n    color: #808080;\\n    transition: all .3s ease;\\n}\\n\\na:hover > i {\\n    transform: translateY(-3px);\\n    color: #58595b;\\n}\\n\\n@media screen and (min-width: 40em) {\\n    div.social-icons {\\n        margin: 0;\\n    }\\n    i{\\n        font-size: 18px;\\n        margin-right: 10px;\\n    }\\n    .left p:last-child {\\n        margin-top: 60rem;\\n    }\\n\\n}\\n\\n@media screen and (min-width: 64em){\\n    .title{\\n        font-size: 16rem\\n    }\\n    .text-cta a {\\n        font-size: 18rem;\\n    }\\n    .copyright {\\n        font-size: 14rem;\\n    }\\n    .headline {\\n        font-size: 45px;\\n        max-width: 440px;\\n    }\\n    .left p:last-child {\\n        font-size: 22px;\\n        margin-top: 70rem;\\n    }\\n    i {\\n        font-size: 20px;\\n    }\\n}\\n\\n</style>\\n\\n<svelte:head>\\n    <script src=\\\"https://kit.fontawesome.com/1309990c29.js\\\"></script>\\n</svelte:head>\\n\\n<footer>\\n    <div class=\\\"container footer-container\\\">\\n        <div class=\\\"left\\\">\\n            <p class=\\\"headline\\\">\\n                Feel free to shoot me an <a href=\\\"mailto:joshua.micah.roper@gmail.com\\\">email</a> & connect through <a href=\\\"https://www.linkedin.com/in/jr-dev\\\" target=\\\"blank\\\">social.</a>\\n            </p>\\n            <p>Reach out!</p>\\n        </div>\\n        <div class=\\\"right\\\">\\n            <div class=\\\"text-cta\\\">\\n                <p class=\\\"title\\\">\\n                    Get In Touch!\\n                </p>\\n                <a href=\\\"mailto:joshua.micah.roper@gmail.com\\\">\\n                    <TextAnimation text={`Joshua.micah.roper@gmail.com`} />\\n                </a>\\n            </div>\\n            <div class=\\\"text-cta\\\">\\n                <p class=\\\"title\\\">\\n                    View Resume\\n                </p>\\n                <a href=\\\"./images/resume-joshua-roper.pdf\\\" download>\\n                    <TextAnimation text={`Download PDF`} />\\n                </a>\\n            </div>\\n        </div>\\n    </div>\\n    <div class=\\\"bottom-row container\\\">\\n        \\n        <p class=\\\"copyright\\\">@ 2019 Joshua Roper Development</p>\\n        <div class=\\\"social-icons\\\">\\n            <a href=\\\"https://www.github.com/Jrope21\\\" aria-label=\\\"link to Joshua Roper's GitHub account\\\" target=\\\"blank\\\" >\\n                <i class=\\\"fab fa-github\\\"></i>\\n            </a>\\n            <a href=\\\"https://www.linkedin.com/in/JR-dev\\\" aria-label=\\\"link to Joshua Roper's LinkedIn account\\\" target=\\\"blank\\\" >\\n                <i class=\\\"fab fa-linkedin\\\"></i>\\n            </a>\\n            <a href=\\\"mailto:joshua.micah.roper@gmail.com\\\" aria-label=\\\"link to send Joshua Roper an email\\\" target=\\\"blank\\\" >\\n                <i class=\\\"fas fa-envelope\\\"></i>\\n            </a>\\n        </div>\\n    </div>\\n</footer>\\n\\n\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

const Footer = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$y);

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

const css$z = {
	code: ".background.svelte-184cnv{background:url('../images/so-white.png');position:fixed;width:100vw;height:100vh;top:0;z-index:-1}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport Navigation from '../components/navigation/Navigation.svelte';\\n\\timport Footer from '../components/footer/Footer.svelte';\\n\\timport { onMount } from 'svelte'\\n</script>\\n\\n<style>\\n\\n\\t.background {\\n\\t\\tbackground: url('../images/so-white.png');\\n\\t\\tposition: fixed;\\n\\t\\twidth: 100vw;\\n\\t\\theight: 100vh;\\n\\t\\ttop: 0;\\n\\t\\tz-index: -1;\\n\\t}\\n\\n</style>\\n\\n<Navigation />\\n<div class=\\\"background\\\"></div>\\n<slot></slot>\\n\\n<Footer />\"],\"names\":[],\"mappings\":\"AAQC,WAAW,cAAC,CAAC,AACZ,UAAU,CAAE,IAAI,wBAAwB,CAAC,CACzC,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,EAAE,AACZ,CAAC\"}"
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$z);

	return `${validate_component(Navigation, 'Navigation').$$render($$result, {}, {}, {})}
	<div class="background svelte-184cnv"></div>
	${$$slots.default ? $$slots.default({}) : ``}

	${validate_component(Footer, 'Footer').$$render($$result, {}, {}, {})}`;
});

/* src/routes/_error.svelte generated by Svelte v3.9.1 */

const css$A = {
	code: "h1.svelte-8od9u6,p.svelte-8od9u6{margin:0 auto}h1.svelte-8od9u6{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-8od9u6{margin:1em auto}@media(min-width: 480px){h1.svelte-8od9u6{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let status;\\n\\texport let error;\\n\\n\\tconst dev = \\\"development\\\" === 'development';\\n</script>\\n\\n<style>\\n\\th1, p {\\n\\t\\tmargin: 0 auto;\\n\\t}\\n\\n\\th1 {\\n\\t\\tfont-size: 2.8em;\\n\\t\\tfont-weight: 700;\\n\\t\\tmargin: 0 0 0.5em 0;\\n\\t}\\n\\n\\tp {\\n\\t\\tmargin: 1em auto;\\n\\t}\\n\\n\\t@media (min-width: 480px) {\\n\\t\\th1 {\\n\\t\\t\\tfont-size: 4em;\\n\\t\\t}\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>{status}</title>\\n</svelte:head>\\n\\n<h1>{status}</h1>\\n\\n<p>{error.message}</p>\\n\\n{#if dev && error.stack}\\n\\t<pre>{error.stack}</pre>\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AAQC,gBAAE,CAAE,CAAC,cAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,cAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { status, error } = $$props;

	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);

	$$result.css.add(css$A);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2Jsb2cvX3Bvc3RzLmpzIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9ibG9nL2luZGV4Lmpzb24uanMiLCIuLi8uLi8uLi9zcmMvcm91dGVzL2Jsb2cvW3NsdWddLmpzb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlL2ludGVybmFsL2luZGV4Lm1qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3Byb2plY3RzL0ltYWdlLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2hlbHBlci1jb21wb25lbnRzL1RleHRBbmltYXRpb24uc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcHJvamVjdHMvVGV4dC5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0cy9Qcm9qZWN0cy5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9leHBlcmllbmNlL0xvZ29UZXh0LnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtZGV0YWlsL1BhZ2VUaXRsZS5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWRldGFpbC9JbWFnZS5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWRldGFpbC9Ub3BCYXIuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvRGVzY3JpcHRpb24uc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvSW1hZ2VHcmlkLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvcHJvamVjdHMvY3JlYXRpdmUtcmV2b2x0LnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Fib3V0L1BhZ2VUaXRsZS5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvcm91dGVzL2Fib3V0LnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvYmxvZy9pbmRleC5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvcm91dGVzL2Jsb2cvW3NsdWddLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL25hdmlnYXRpb24vSGFtYnVyZ2VyLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9Nb2RhbFRlbXBsYXRlLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9Db250YWN0TW9kYWwuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvbmF2aWdhdGlvbi9OYXZpZ2F0aW9uLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Zvb3Rlci9Gb290ZXIuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9fZXJyb3Iuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL25vZGVfbW9kdWxlcy9Ac2FwcGVyL2ludGVybmFsL21hbmlmZXN0LXNlcnZlci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3N0b3JlL2luZGV4Lm1qcyIsIi4uLy4uLy4uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9pbnRlcm5hbC9zaGFyZWQubWpzIiwiLi4vLi4vLi4vc3JjL25vZGVfbW9kdWxlcy9Ac2FwcGVyL2ludGVybmFsL0FwcC5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvbm9kZV9tb2R1bGVzL0BzYXBwZXIvc2VydmVyLm1qcyIsIi4uLy4uLy4uL3NyYy9zZXJ2ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gT3JkaW5hcmlseSwgeW91J2QgZ2VuZXJhdGUgdGhpcyBkYXRhIGZyb20gbWFya2Rvd24gZmlsZXMgaW4geW91clxuLy8gcmVwbywgb3IgZmV0Y2ggdGhlbSBmcm9tIGEgZGF0YWJhc2Ugb2Ygc29tZSBraW5kLiBCdXQgaW4gb3JkZXIgdG9cbi8vIGF2b2lkIHVubmVjZXNzYXJ5IGRlcGVuZGVuY2llcyBpbiB0aGUgc3RhcnRlciB0ZW1wbGF0ZSwgYW5kIGluIHRoZVxuLy8gc2VydmljZSBvZiBvYnZpb3VzbmVzcywgd2UncmUganVzdCBnb2luZyB0byBsZWF2ZSBpdCBoZXJlLlxuXG4vLyBUaGlzIGZpbGUgaXMgY2FsbGVkIGBfcG9zdHMuanNgIHJhdGhlciB0aGFuIGBwb3N0cy5qc2AsIGJlY2F1c2Vcbi8vIHdlIGRvbid0IHdhbnQgdG8gY3JlYXRlIGFuIGAvYmxvZy9wb3N0c2Agcm91dGUg4oCUIHRoZSBsZWFkaW5nXG4vLyB1bmRlcnNjb3JlIHRlbGxzIFNhcHBlciBub3QgdG8gZG8gdGhhdC5cblxuY29uc3QgcG9zdHMgPSBbXG5cdHtcblx0XHR0aXRsZTogJ1doYXQgaXMgU2FwcGVyPycsXG5cdFx0c2x1ZzogJ3doYXQtaXMtc2FwcGVyJyxcblx0XHRodG1sOiBgXG5cdFx0XHQ8cD5GaXJzdCwgeW91IGhhdmUgdG8ga25vdyB3aGF0IDxhIGhyZWY9J2h0dHBzOi8vc3ZlbHRlLmRldic+U3ZlbHRlPC9hPiBpcy4gU3ZlbHRlIGlzIGEgVUkgZnJhbWV3b3JrIHdpdGggYSBib2xkIG5ldyBpZGVhOiByYXRoZXIgdGhhbiBwcm92aWRpbmcgYSBsaWJyYXJ5IHRoYXQgeW91IHdyaXRlIGNvZGUgd2l0aCAobGlrZSBSZWFjdCBvciBWdWUsIGZvciBleGFtcGxlKSwgaXQncyBhIGNvbXBpbGVyIHRoYXQgdHVybnMgeW91ciBjb21wb25lbnRzIGludG8gaGlnaGx5IG9wdGltaXplZCB2YW5pbGxhIEphdmFTY3JpcHQuIElmIHlvdSBoYXZlbid0IGFscmVhZHkgcmVhZCB0aGUgPGEgaHJlZj0naHR0cHM6Ly9zdmVsdGUuZGV2L2Jsb2cvZnJhbWV3b3Jrcy13aXRob3V0LXRoZS1mcmFtZXdvcmsnPmludHJvZHVjdG9yeSBibG9nIHBvc3Q8L2E+LCB5b3Ugc2hvdWxkITwvcD5cblxuXHRcdFx0PHA+U2FwcGVyIGlzIGEgTmV4dC5qcy1zdHlsZSBmcmFtZXdvcmsgKDxhIGhyZWY9J2Jsb2cvaG93LWlzLXNhcHBlci1kaWZmZXJlbnQtZnJvbS1uZXh0Jz5tb3JlIG9uIHRoYXQgaGVyZTwvYT4pIGJ1aWx0IGFyb3VuZCBTdmVsdGUuIEl0IG1ha2VzIGl0IGVtYmFycmFzc2luZ2x5IGVhc3kgdG8gY3JlYXRlIGV4dHJlbWVseSBoaWdoIHBlcmZvcm1hbmNlIHdlYiBhcHBzLiBPdXQgb2YgdGhlIGJveCwgeW91IGdldDo8L3A+XG5cblx0XHRcdDx1bD5cblx0XHRcdFx0PGxpPkNvZGUtc3BsaXR0aW5nLCBkeW5hbWljIGltcG9ydHMgYW5kIGhvdCBtb2R1bGUgcmVwbGFjZW1lbnQsIHBvd2VyZWQgYnkgd2VicGFjazwvbGk+XG5cdFx0XHRcdDxsaT5TZXJ2ZXItc2lkZSByZW5kZXJpbmcgKFNTUikgd2l0aCBjbGllbnQtc2lkZSBoeWRyYXRpb248L2xpPlxuXHRcdFx0XHQ8bGk+U2VydmljZSB3b3JrZXIgZm9yIG9mZmxpbmUgc3VwcG9ydCwgYW5kIGFsbCB0aGUgUFdBIGJlbGxzIGFuZCB3aGlzdGxlczwvbGk+XG5cdFx0XHRcdDxsaT5UaGUgbmljZXN0IGRldmVsb3BtZW50IGV4cGVyaWVuY2UgeW91J3ZlIGV2ZXIgaGFkLCBvciB5b3VyIG1vbmV5IGJhY2s8L2xpPlxuXHRcdFx0PC91bD5cblxuXHRcdFx0PHA+SXQncyBpbXBsZW1lbnRlZCBhcyBFeHByZXNzIG1pZGRsZXdhcmUuIEV2ZXJ5dGhpbmcgaXMgc2V0IHVwIGFuZCB3YWl0aW5nIGZvciB5b3UgdG8gZ2V0IHN0YXJ0ZWQsIGJ1dCB5b3Uga2VlcCBjb21wbGV0ZSBjb250cm9sIG92ZXIgdGhlIHNlcnZlciwgc2VydmljZSB3b3JrZXIsIHdlYnBhY2sgY29uZmlnIGFuZCBldmVyeXRoaW5nIGVsc2UsIHNvIGl0J3MgYXMgZmxleGlibGUgYXMgeW91IG5lZWQgaXQgdG8gYmUuPC9wPlxuXHRcdGBcblx0fSxcblxuXHR7XG5cdFx0dGl0bGU6ICdIb3cgdG8gdXNlIFNhcHBlcicsXG5cdFx0c2x1ZzogJ2hvdy10by11c2Utc2FwcGVyJyxcblx0XHRodG1sOiBgXG5cdFx0XHQ8aDI+U3RlcCBvbmU8L2gyPlxuXHRcdFx0PHA+Q3JlYXRlIGEgbmV3IHByb2plY3QsIHVzaW5nIDxhIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9SaWNoLUhhcnJpcy9kZWdpdCc+ZGVnaXQ8L2E+OjwvcD5cblxuXHRcdFx0PHByZT48Y29kZT5ucHggZGVnaXQgXCJzdmVsdGVqcy9zYXBwZXItdGVtcGxhdGUjcm9sbHVwXCIgbXktYXBwXG5cdFx0XHRjZCBteS1hcHBcblx0XHRcdG5wbSBpbnN0YWxsICMgb3IgeWFybiFcblx0XHRcdG5wbSBydW4gZGV2XG5cdFx0XHQ8L2NvZGU+PC9wcmU+XG5cblx0XHRcdDxoMj5TdGVwIHR3bzwvaDI+XG5cdFx0XHQ8cD5HbyB0byA8YSBocmVmPSdodHRwOi8vbG9jYWxob3N0OjMwMDAnPmxvY2FsaG9zdDozMDAwPC9hPi4gT3BlbiA8Y29kZT5teS1hcHA8L2NvZGU+IGluIHlvdXIgZWRpdG9yLiBFZGl0IHRoZSBmaWxlcyBpbiB0aGUgPGNvZGU+c3JjL3JvdXRlczwvY29kZT4gZGlyZWN0b3J5IG9yIGFkZCBuZXcgb25lcy48L3A+XG5cblx0XHRcdDxoMj5TdGVwIHRocmVlPC9oMj5cblx0XHRcdDxwPi4uLjwvcD5cblxuXHRcdFx0PGgyPlN0ZXAgZm91cjwvaDI+XG5cdFx0XHQ8cD5SZXNpc3Qgb3ZlcmRvbmUgam9rZSBmb3JtYXRzLjwvcD5cblx0XHRgXG5cdH0sXG5cblx0e1xuXHRcdHRpdGxlOiAnV2h5IHRoZSBuYW1lPycsXG5cdFx0c2x1ZzogJ3doeS10aGUtbmFtZScsXG5cdFx0aHRtbDogYFxuXHRcdFx0PHA+SW4gd2FyLCB0aGUgc29sZGllcnMgd2hvIGJ1aWxkIGJyaWRnZXMsIHJlcGFpciByb2FkcywgY2xlYXIgbWluZWZpZWxkcyBhbmQgY29uZHVjdCBkZW1vbGl0aW9ucyDigJQgYWxsIHVuZGVyIGNvbWJhdCBjb25kaXRpb25zIOKAlCBhcmUga25vd24gYXMgPGVtPnNhcHBlcnM8L2VtPi48L3A+XG5cblx0XHRcdDxwPkZvciB3ZWIgZGV2ZWxvcGVycywgdGhlIHN0YWtlcyBhcmUgZ2VuZXJhbGx5IGxvd2VyIHRoYW4gdGhvc2UgZm9yIGNvbWJhdCBlbmdpbmVlcnMuIEJ1dCB3ZSBmYWNlIG91ciBvd24gaG9zdGlsZSBlbnZpcm9ubWVudDogdW5kZXJwb3dlcmVkIGRldmljZXMsIHBvb3IgbmV0d29yayBjb25uZWN0aW9ucywgYW5kIHRoZSBjb21wbGV4aXR5IGluaGVyZW50IGluIGZyb250LWVuZCBlbmdpbmVlcmluZy4gU2FwcGVyLCB3aGljaCBpcyBzaG9ydCBmb3IgPHN0cm9uZz5TPC9zdHJvbmc+dmVsdGUgPHN0cm9uZz5hcHA8L3N0cm9uZz4gbWFrPHN0cm9uZz5lcjwvc3Ryb25nPiwgaXMgeW91ciBjb3VyYWdlb3VzIGFuZCBkdXRpZnVsIGFsbHkuPC9wPlxuXHRcdGBcblx0fSxcblxuXHR7XG5cdFx0dGl0bGU6ICdIb3cgaXMgU2FwcGVyIGRpZmZlcmVudCBmcm9tIE5leHQuanM/Jyxcblx0XHRzbHVnOiAnaG93LWlzLXNhcHBlci1kaWZmZXJlbnQtZnJvbS1uZXh0Jyxcblx0XHRodG1sOiBgXG5cdFx0XHQ8cD48YSBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vemVpdC9uZXh0LmpzJz5OZXh0LmpzPC9hPiBpcyBhIFJlYWN0IGZyYW1ld29yayBmcm9tIDxhIGhyZWY9J2h0dHBzOi8vemVpdC5jbyc+WmVpdDwvYT4sIGFuZCBpcyB0aGUgaW5zcGlyYXRpb24gZm9yIFNhcHBlci4gVGhlcmUgYXJlIGEgZmV3IG5vdGFibGUgZGlmZmVyZW5jZXMsIGhvd2V2ZXI6PC9wPlxuXG5cdFx0XHQ8dWw+XG5cdFx0XHRcdDxsaT5JdCdzIHBvd2VyZWQgYnkgPGEgaHJlZj0naHR0cHM6Ly9zdmVsdGUuZGV2Jz5TdmVsdGU8L2E+IGluc3RlYWQgb2YgUmVhY3QsIHNvIGl0J3MgZmFzdGVyIGFuZCB5b3VyIGFwcHMgYXJlIHNtYWxsZXI8L2xpPlxuXHRcdFx0XHQ8bGk+SW5zdGVhZCBvZiByb3V0ZSBtYXNraW5nLCB3ZSBlbmNvZGUgcm91dGUgcGFyYW1ldGVycyBpbiBmaWxlbmFtZXMuIEZvciBleGFtcGxlLCB0aGUgcGFnZSB5b3UncmUgbG9va2luZyBhdCByaWdodCBub3cgaXMgPGNvZGU+c3JjL3JvdXRlcy9ibG9nL1tzbHVnXS5odG1sPC9jb2RlPjwvbGk+XG5cdFx0XHRcdDxsaT5BcyB3ZWxsIGFzIHBhZ2VzIChTdmVsdGUgY29tcG9uZW50cywgd2hpY2ggcmVuZGVyIG9uIHNlcnZlciBvciBjbGllbnQpLCB5b3UgY2FuIGNyZWF0ZSA8ZW0+c2VydmVyIHJvdXRlczwvZW0+IGluIHlvdXIgPGNvZGU+cm91dGVzPC9jb2RlPiBkaXJlY3RvcnkuIFRoZXNlIGFyZSBqdXN0IDxjb2RlPi5qczwvY29kZT4gZmlsZXMgdGhhdCBleHBvcnQgZnVuY3Rpb25zIGNvcnJlc3BvbmRpbmcgdG8gSFRUUCBtZXRob2RzLCBhbmQgcmVjZWl2ZSBFeHByZXNzIDxjb2RlPnJlcXVlc3Q8L2NvZGU+IGFuZCA8Y29kZT5yZXNwb25zZTwvY29kZT4gb2JqZWN0cyBhcyBhcmd1bWVudHMuIFRoaXMgbWFrZXMgaXQgdmVyeSBlYXN5IHRvLCBmb3IgZXhhbXBsZSwgYWRkIGEgSlNPTiBBUEkgc3VjaCBhcyB0aGUgb25lIDxhIGhyZWY9J2Jsb2cvaG93LWlzLXNhcHBlci1kaWZmZXJlbnQtZnJvbS1uZXh0Lmpzb24nPnBvd2VyaW5nIHRoaXMgdmVyeSBwYWdlPC9hPjwvbGk+XG5cdFx0XHRcdDxsaT5MaW5rcyBhcmUganVzdCA8Y29kZT4mbHQ7YSZndDs8L2NvZGU+IGVsZW1lbnRzLCByYXRoZXIgdGhhbiBmcmFtZXdvcmstc3BlY2lmaWMgPGNvZGU+Jmx0O0xpbmsmZ3Q7PC9jb2RlPiBjb21wb25lbnRzLiBUaGF0IG1lYW5zLCBmb3IgZXhhbXBsZSwgdGhhdCA8YSBocmVmPSdibG9nL2hvdy1jYW4taS1nZXQtaW52b2x2ZWQnPnRoaXMgbGluayByaWdodCBoZXJlPC9hPiwgZGVzcGl0ZSBiZWluZyBpbnNpZGUgYSBibG9iIG9mIEhUTUwsIHdvcmtzIHdpdGggdGhlIHJvdXRlciBhcyB5b3UnZCBleHBlY3QuPC9saT5cblx0XHRcdDwvdWw+XG5cdFx0YFxuXHR9LFxuXG5cdHtcblx0XHR0aXRsZTogJ0hvdyBjYW4gSSBnZXQgaW52b2x2ZWQ/Jyxcblx0XHRzbHVnOiAnaG93LWNhbi1pLWdldC1pbnZvbHZlZCcsXG5cdFx0aHRtbDogYFxuXHRcdFx0PHA+V2UncmUgc28gZ2xhZCB5b3UgYXNrZWQhIENvbWUgb24gb3ZlciB0byB0aGUgPGEgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL3N2ZWx0ZWpzL3N2ZWx0ZSc+U3ZlbHRlPC9hPiBhbmQgPGEgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL3N2ZWx0ZWpzL3NhcHBlcic+U2FwcGVyPC9hPiByZXBvcywgYW5kIGpvaW4gdXMgaW4gdGhlIDxhIGhyZWY9J2h0dHBzOi8vc3ZlbHRlLmRldi9jaGF0Jz5EaXNjb3JkIGNoYXRyb29tPC9hPi4gRXZlcnlvbmUgaXMgd2VsY29tZSwgZXNwZWNpYWxseSB5b3UhPC9wPlxuXHRcdGBcblx0fVxuXTtcblxucG9zdHMuZm9yRWFjaChwb3N0ID0+IHtcblx0cG9zdC5odG1sID0gcG9zdC5odG1sLnJlcGxhY2UoL15cXHR7M30vZ20sICcnKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBwb3N0cztcbiIsImltcG9ydCBwb3N0cyBmcm9tICcuL19wb3N0cy5qcyc7XG5cbmNvbnN0IGNvbnRlbnRzID0gSlNPTi5zdHJpbmdpZnkocG9zdHMubWFwKHBvc3QgPT4ge1xuXHRyZXR1cm4ge1xuXHRcdHRpdGxlOiBwb3N0LnRpdGxlLFxuXHRcdHNsdWc6IHBvc3Quc2x1Z1xuXHR9O1xufSkpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KHJlcSwgcmVzKSB7XG5cdHJlcy53cml0ZUhlYWQoMjAwLCB7XG5cdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuXHR9KTtcblxuXHRyZXMuZW5kKGNvbnRlbnRzKTtcbn0iLCJpbXBvcnQgcG9zdHMgZnJvbSAnLi9fcG9zdHMuanMnO1xuXG5jb25zdCBsb29rdXAgPSBuZXcgTWFwKCk7XG5wb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuXHRsb29rdXAuc2V0KHBvc3Quc2x1ZywgSlNPTi5zdHJpbmdpZnkocG9zdCkpO1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXQocmVxLCByZXMsIG5leHQpIHtcblx0Ly8gdGhlIGBzbHVnYCBwYXJhbWV0ZXIgaXMgYXZhaWxhYmxlIGJlY2F1c2Vcblx0Ly8gdGhpcyBmaWxlIGlzIGNhbGxlZCBbc2x1Z10uanNvbi5qc1xuXHRjb25zdCB7IHNsdWcgfSA9IHJlcS5wYXJhbXM7XG5cblx0aWYgKGxvb2t1cC5oYXMoc2x1ZykpIHtcblx0XHRyZXMud3JpdGVIZWFkKDIwMCwge1xuXHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuXHRcdH0pO1xuXG5cdFx0cmVzLmVuZChsb29rdXAuZ2V0KHNsdWcpKTtcblx0fSBlbHNlIHtcblx0XHRyZXMud3JpdGVIZWFkKDQwNCwge1xuXHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuXHRcdH0pO1xuXG5cdFx0cmVzLmVuZChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRtZXNzYWdlOiBgTm90IGZvdW5kYFxuXHRcdH0pKTtcblx0fVxufVxuIiwiZnVuY3Rpb24gbm9vcCgpIHsgfVxuY29uc3QgaWRlbnRpdHkgPSB4ID0+IHg7XG5mdW5jdGlvbiBhc3NpZ24odGFyLCBzcmMpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgZm9yIChjb25zdCBrIGluIHNyYylcbiAgICAgICAgdGFyW2tdID0gc3JjW2tdO1xuICAgIHJldHVybiB0YXI7XG59XG5mdW5jdGlvbiBpc19wcm9taXNlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBhZGRfbG9jYXRpb24oZWxlbWVudCwgZmlsZSwgbGluZSwgY29sdW1uLCBjaGFyKSB7XG4gICAgZWxlbWVudC5fX3N2ZWx0ZV9tZXRhID0ge1xuICAgICAgICBsb2M6IHsgZmlsZSwgbGluZSwgY29sdW1uLCBjaGFyIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gcnVuKGZuKSB7XG4gICAgcmV0dXJuIGZuKCk7XG59XG5mdW5jdGlvbiBibGFua19vYmplY3QoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUobnVsbCk7XG59XG5mdW5jdGlvbiBydW5fYWxsKGZucykge1xuICAgIGZucy5mb3JFYWNoKHJ1bik7XG59XG5mdW5jdGlvbiBpc19mdW5jdGlvbih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBzYWZlX25vdF9lcXVhbChhLCBiKSB7XG4gICAgcmV0dXJuIGEgIT0gYSA/IGIgPT0gYiA6IGEgIT09IGIgfHwgKChhICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JykgfHwgdHlwZW9mIGEgPT09ICdmdW5jdGlvbicpO1xufVxuZnVuY3Rpb24gbm90X2VxdWFsKGEsIGIpIHtcbiAgICByZXR1cm4gYSAhPSBhID8gYiA9PSBiIDogYSAhPT0gYjtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX3N0b3JlKHN0b3JlLCBuYW1lKSB7XG4gICAgaWYgKCFzdG9yZSB8fCB0eXBlb2Ygc3RvcmUuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJyR7bmFtZX0nIGlzIG5vdCBhIHN0b3JlIHdpdGggYSAnc3Vic2NyaWJlJyBtZXRob2RgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzdWJzY3JpYmUoc3RvcmUsIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgdW5zdWIgPSBzdG9yZS5zdWJzY3JpYmUoY2FsbGJhY2spO1xuICAgIHJldHVybiB1bnN1Yi51bnN1YnNjcmliZSA/ICgpID0+IHVuc3ViLnVuc3Vic2NyaWJlKCkgOiB1bnN1Yjtcbn1cbmZ1bmN0aW9uIGdldF9zdG9yZV92YWx1ZShzdG9yZSkge1xuICAgIGxldCB2YWx1ZTtcbiAgICBzdWJzY3JpYmUoc3RvcmUsIF8gPT4gdmFsdWUgPSBfKSgpO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGNvbXBvbmVudF9zdWJzY3JpYmUoY29tcG9uZW50LCBzdG9yZSwgY2FsbGJhY2spIHtcbiAgICBjb21wb25lbnQuJCQub25fZGVzdHJveS5wdXNoKHN1YnNjcmliZShzdG9yZSwgY2FsbGJhY2spKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9zbG90KGRlZmluaXRpb24sIGN0eCwgZm4pIHtcbiAgICBpZiAoZGVmaW5pdGlvbikge1xuICAgICAgICBjb25zdCBzbG90X2N0eCA9IGdldF9zbG90X2NvbnRleHQoZGVmaW5pdGlvbiwgY3R4LCBmbik7XG4gICAgICAgIHJldHVybiBkZWZpbml0aW9uWzBdKHNsb3RfY3R4KTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRfc2xvdF9jb250ZXh0KGRlZmluaXRpb24sIGN0eCwgZm4pIHtcbiAgICByZXR1cm4gZGVmaW5pdGlvblsxXVxuICAgICAgICA/IGFzc2lnbih7fSwgYXNzaWduKGN0eC4kJHNjb3BlLmN0eCwgZGVmaW5pdGlvblsxXShmbiA/IGZuKGN0eCkgOiB7fSkpKVxuICAgICAgICA6IGN0eC4kJHNjb3BlLmN0eDtcbn1cbmZ1bmN0aW9uIGdldF9zbG90X2NoYW5nZXMoZGVmaW5pdGlvbiwgY3R4LCBjaGFuZ2VkLCBmbikge1xuICAgIHJldHVybiBkZWZpbml0aW9uWzFdXG4gICAgICAgID8gYXNzaWduKHt9LCBhc3NpZ24oY3R4LiQkc2NvcGUuY2hhbmdlZCB8fCB7fSwgZGVmaW5pdGlvblsxXShmbiA/IGZuKGNoYW5nZWQpIDoge30pKSlcbiAgICAgICAgOiBjdHguJCRzY29wZS5jaGFuZ2VkIHx8IHt9O1xufVxuZnVuY3Rpb24gZXhjbHVkZV9pbnRlcm5hbF9wcm9wcyhwcm9wcykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3QgayBpbiBwcm9wcylcbiAgICAgICAgaWYgKGtbMF0gIT09ICckJylcbiAgICAgICAgICAgIHJlc3VsdFtrXSA9IHByb3BzW2tdO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBvbmNlKGZuKSB7XG4gICAgbGV0IHJhbiA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICBpZiAocmFuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICByYW4gPSB0cnVlO1xuICAgICAgICBmbi5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xuICAgIH07XG59XG5mdW5jdGlvbiBudWxsX3RvX2VtcHR5KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xufVxuXG5jb25zdCBpc19jbGllbnQgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbmxldCBub3cgPSBpc19jbGllbnRcbiAgICA/ICgpID0+IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKVxuICAgIDogKCkgPT4gRGF0ZS5ub3coKTtcbmxldCByYWYgPSBpc19jbGllbnQgPyBjYiA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpIDogbm9vcDtcbi8vIHVzZWQgaW50ZXJuYWxseSBmb3IgdGVzdGluZ1xuZnVuY3Rpb24gc2V0X25vdyhmbikge1xuICAgIG5vdyA9IGZuO1xufVxuZnVuY3Rpb24gc2V0X3JhZihmbikge1xuICAgIHJhZiA9IGZuO1xufVxuXG5jb25zdCB0YXNrcyA9IG5ldyBTZXQoKTtcbmxldCBydW5uaW5nID0gZmFsc2U7XG5mdW5jdGlvbiBydW5fdGFza3MoKSB7XG4gICAgdGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgaWYgKCF0YXNrWzBdKG5vdygpKSkge1xuICAgICAgICAgICAgdGFza3MuZGVsZXRlKHRhc2spO1xuICAgICAgICAgICAgdGFza1sxXSgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcnVubmluZyA9IHRhc2tzLnNpemUgPiAwO1xuICAgIGlmIChydW5uaW5nKVxuICAgICAgICByYWYocnVuX3Rhc2tzKTtcbn1cbmZ1bmN0aW9uIGNsZWFyX2xvb3BzKCkge1xuICAgIC8vIGZvciB0ZXN0aW5nLi4uXG4gICAgdGFza3MuZm9yRWFjaCh0YXNrID0+IHRhc2tzLmRlbGV0ZSh0YXNrKSk7XG4gICAgcnVubmluZyA9IGZhbHNlO1xufVxuZnVuY3Rpb24gbG9vcChmbikge1xuICAgIGxldCB0YXNrO1xuICAgIGlmICghcnVubmluZykge1xuICAgICAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgcmFmKHJ1bl90YXNrcyk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHByb21pc2U6IG5ldyBQcm9taXNlKGZ1bGZpbCA9PiB7XG4gICAgICAgICAgICB0YXNrcy5hZGQodGFzayA9IFtmbiwgZnVsZmlsXSk7XG4gICAgICAgIH0pLFxuICAgICAgICBhYm9ydCgpIHtcbiAgICAgICAgICAgIHRhc2tzLmRlbGV0ZSh0YXNrKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGFwcGVuZCh0YXJnZXQsIG5vZGUpIHtcbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQobm9kZSk7XG59XG5mdW5jdGlvbiBpbnNlcnQodGFyZ2V0LCBub2RlLCBhbmNob3IpIHtcbiAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKG5vZGUsIGFuY2hvciB8fCBudWxsKTtcbn1cbmZ1bmN0aW9uIGRldGFjaChub2RlKSB7XG4gICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xufVxuZnVuY3Rpb24gZGVzdHJveV9lYWNoKGl0ZXJhdGlvbnMsIGRldGFjaGluZykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlcmF0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoaXRlcmF0aW9uc1tpXSlcbiAgICAgICAgICAgIGl0ZXJhdGlvbnNbaV0uZChkZXRhY2hpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGVsZW1lbnQobmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpO1xufVxuZnVuY3Rpb24gZWxlbWVudF9pcyhuYW1lLCBpcykge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUsIHsgaXMgfSk7XG59XG5mdW5jdGlvbiBvYmplY3Rfd2l0aG91dF9wcm9wZXJ0aWVzKG9iaiwgZXhjbHVkZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tb2JqZWN0LWxpdGVyYWwtdHlwZS1hc3NlcnRpb25cbiAgICBjb25zdCB0YXJnZXQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGsgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrKVxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgJiYgZXhjbHVkZS5pbmRleE9mKGspID09PSAtMSkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGFyZ2V0W2tdID0gb2JqW2tdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBzdmdfZWxlbWVudChuYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBuYW1lKTtcbn1cbmZ1bmN0aW9uIHRleHQoZGF0YSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkYXRhKTtcbn1cbmZ1bmN0aW9uIHNwYWNlKCkge1xuICAgIHJldHVybiB0ZXh0KCcgJyk7XG59XG5mdW5jdGlvbiBlbXB0eSgpIHtcbiAgICByZXR1cm4gdGV4dCgnJyk7XG59XG5mdW5jdGlvbiBsaXN0ZW4obm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiAoKSA9PiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcHJldmVudF9kZWZhdWx0KGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gc3RvcF9wcm9wYWdhdGlvbihmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBzZWxmKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMpXG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgZWxzZVxuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUsIHZhbHVlKTtcbn1cbmZ1bmN0aW9uIHNldF9hdHRyaWJ1dGVzKG5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUuY3NzVGV4dCA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgaW4gbm9kZSkge1xuICAgICAgICAgICAgbm9kZVtrZXldID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXR0cihub2RlLCBrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBzZXRfY3VzdG9tX2VsZW1lbnRfZGF0YShub2RlLCBwcm9wLCB2YWx1ZSkge1xuICAgIGlmIChwcm9wIGluIG5vZGUpIHtcbiAgICAgICAgbm9kZVtwcm9wXSA9IHZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYXR0cihub2RlLCBwcm9wLCB2YWx1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24geGxpbmtfYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIGF0dHJpYnV0ZSwgdmFsdWUpO1xufVxuZnVuY3Rpb24gZ2V0X2JpbmRpbmdfZ3JvdXBfdmFsdWUoZ3JvdXApIHtcbiAgICBjb25zdCB2YWx1ZSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGdyb3VwW2ldLmNoZWNrZWQpXG4gICAgICAgICAgICB2YWx1ZS5wdXNoKGdyb3VwW2ldLl9fdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiB0b19udW1iZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09ICcnID8gdW5kZWZpbmVkIDogK3ZhbHVlO1xufVxuZnVuY3Rpb24gdGltZV9yYW5nZXNfdG9fYXJyYXkocmFuZ2VzKSB7XG4gICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBhcnJheS5wdXNoKHsgc3RhcnQ6IHJhbmdlcy5zdGFydChpKSwgZW5kOiByYW5nZXMuZW5kKGkpIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG59XG5mdW5jdGlvbiBjaGlsZHJlbihlbGVtZW50KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oZWxlbWVudC5jaGlsZE5vZGVzKTtcbn1cbmZ1bmN0aW9uIGNsYWltX2VsZW1lbnQobm9kZXMsIG5hbWUsIGF0dHJpYnV0ZXMsIHN2Zykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICBpZiAobm9kZS5ub2RlTmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBub2RlLmF0dHJpYnV0ZXNbal07XG4gICAgICAgICAgICAgICAgaWYgKCFhdHRyaWJ1dGVzW2F0dHJpYnV0ZS5uYW1lXSlcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5vZGVzLnNwbGljZShpLCAxKVswXTsgLy8gVE9ETyBzdHJpcCB1bndhbnRlZCBhdHRyaWJ1dGVzXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN2ZyA/IHN2Z19lbGVtZW50KG5hbWUpIDogZWxlbWVudChuYW1lKTtcbn1cbmZ1bmN0aW9uIGNsYWltX3RleHQobm9kZXMsIGRhdGEpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgIG5vZGUuZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICByZXR1cm4gbm9kZXMuc3BsaWNlKGksIDEpWzBdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0ZXh0KGRhdGEpO1xufVxuZnVuY3Rpb24gc2V0X2RhdGEodGV4dCwgZGF0YSkge1xuICAgIGRhdGEgPSAnJyArIGRhdGE7XG4gICAgaWYgKHRleHQuZGF0YSAhPT0gZGF0YSlcbiAgICAgICAgdGV4dC5kYXRhID0gZGF0YTtcbn1cbmZ1bmN0aW9uIHNldF9pbnB1dF92YWx1ZShpbnB1dCwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCB8fCBpbnB1dC52YWx1ZSkge1xuICAgICAgICBpbnB1dC52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9pbnB1dF90eXBlKGlucHV0LCB0eXBlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaW5wdXQudHlwZSA9IHR5cGU7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9XG59XG5mdW5jdGlvbiBzZXRfc3R5bGUobm9kZSwga2V5LCB2YWx1ZSwgaW1wb3J0YW50KSB7XG4gICAgbm9kZS5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlLCBpbXBvcnRhbnQgPyAnaW1wb3J0YW50JyA6ICcnKTtcbn1cbmZ1bmN0aW9uIHNlbGVjdF9vcHRpb24oc2VsZWN0LCB2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gc2VsZWN0Lm9wdGlvbnNbaV07XG4gICAgICAgIGlmIChvcHRpb24uX192YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBzZWxlY3Rfb3B0aW9ucyhzZWxlY3QsIHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tpXTtcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gfnZhbHVlLmluZGV4T2Yob3B0aW9uLl9fdmFsdWUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNlbGVjdF92YWx1ZShzZWxlY3QpIHtcbiAgICBjb25zdCBzZWxlY3RlZF9vcHRpb24gPSBzZWxlY3QucXVlcnlTZWxlY3RvcignOmNoZWNrZWQnKSB8fCBzZWxlY3Qub3B0aW9uc1swXTtcbiAgICByZXR1cm4gc2VsZWN0ZWRfb3B0aW9uICYmIHNlbGVjdGVkX29wdGlvbi5fX3ZhbHVlO1xufVxuZnVuY3Rpb24gc2VsZWN0X211bHRpcGxlX3ZhbHVlKHNlbGVjdCkge1xuICAgIHJldHVybiBbXS5tYXAuY2FsbChzZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnOmNoZWNrZWQnKSwgb3B0aW9uID0+IG9wdGlvbi5fX3ZhbHVlKTtcbn1cbmZ1bmN0aW9uIGFkZF9yZXNpemVfbGlzdGVuZXIoZWxlbWVudCwgZm4pIHtcbiAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5wb3NpdGlvbiA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgfVxuICAgIGNvbnN0IG9iamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29iamVjdCcpO1xuICAgIG9iamVjdC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6IGJsb2NrOyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgaGVpZ2h0OiAxMDAlOyB3aWR0aDogMTAwJTsgb3ZlcmZsb3c6IGhpZGRlbjsgcG9pbnRlci1ldmVudHM6IG5vbmU7IHotaW5kZXg6IC0xOycpO1xuICAgIG9iamVjdC50eXBlID0gJ3RleHQvaHRtbCc7XG4gICAgb2JqZWN0LnRhYkluZGV4ID0gLTE7XG4gICAgbGV0IHdpbjtcbiAgICBvYmplY3Qub25sb2FkID0gKCkgPT4ge1xuICAgICAgICB3aW4gPSBvYmplY3QuY29udGVudERvY3VtZW50LmRlZmF1bHRWaWV3O1xuICAgICAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZm4pO1xuICAgIH07XG4gICAgaWYgKC9UcmlkZW50Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQob2JqZWN0KTtcbiAgICAgICAgb2JqZWN0LmRhdGEgPSAnYWJvdXQ6YmxhbmsnO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgb2JqZWN0LmRhdGEgPSAnYWJvdXQ6YmxhbmsnO1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKG9iamVjdCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGNhbmNlbDogKCkgPT4ge1xuICAgICAgICAgICAgd2luICYmIHdpbi5yZW1vdmVFdmVudExpc3RlbmVyICYmIHdpbi5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmbik7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKG9iamVjdCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gdG9nZ2xlX2NsYXNzKGVsZW1lbnQsIG5hbWUsIHRvZ2dsZSkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0W3RvZ2dsZSA/ICdhZGQnIDogJ3JlbW92ZSddKG5hbWUpO1xufVxuZnVuY3Rpb24gY3VzdG9tX2V2ZW50KHR5cGUsIGRldGFpbCkge1xuICAgIGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICBlLmluaXRDdXN0b21FdmVudCh0eXBlLCBmYWxzZSwgZmFsc2UsIGRldGFpbCk7XG4gICAgcmV0dXJuIGU7XG59XG5jbGFzcyBIdG1sVGFnIHtcbiAgICBjb25zdHJ1Y3RvcihodG1sLCBhbmNob3IgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZSA9IGVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmEgPSBhbmNob3I7XG4gICAgICAgIHRoaXMudShodG1sKTtcbiAgICB9XG4gICAgbSh0YXJnZXQsIGFuY2hvciA9IG51bGwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm4ubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGluc2VydCh0YXJnZXQsIHRoaXMubltpXSwgYW5jaG9yKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnQgPSB0YXJnZXQ7XG4gICAgfVxuICAgIHUoaHRtbCkge1xuICAgICAgICB0aGlzLmUuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgdGhpcy5uID0gQXJyYXkuZnJvbSh0aGlzLmUuY2hpbGROb2Rlcyk7XG4gICAgfVxuICAgIHAoaHRtbCkge1xuICAgICAgICB0aGlzLmQoKTtcbiAgICAgICAgdGhpcy51KGh0bWwpO1xuICAgICAgICB0aGlzLm0odGhpcy50LCB0aGlzLmEpO1xuICAgIH1cbiAgICBkKCkge1xuICAgICAgICB0aGlzLm4uZm9yRWFjaChkZXRhY2gpO1xuICAgIH1cbn1cblxubGV0IHN0eWxlc2hlZXQ7XG5sZXQgYWN0aXZlID0gMDtcbmxldCBjdXJyZW50X3J1bGVzID0ge307XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZGFya3NreWFwcC9zdHJpbmctaGFzaC9ibG9iL21hc3Rlci9pbmRleC5qc1xuZnVuY3Rpb24gaGFzaChzdHIpIHtcbiAgICBsZXQgaGFzaCA9IDUzODE7XG4gICAgbGV0IGkgPSBzdHIubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pXG4gICAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSBeIHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBoYXNoID4+PiAwO1xufVxuZnVuY3Rpb24gY3JlYXRlX3J1bGUobm9kZSwgYSwgYiwgZHVyYXRpb24sIGRlbGF5LCBlYXNlLCBmbiwgdWlkID0gMCkge1xuICAgIGNvbnN0IHN0ZXAgPSAxNi42NjYgLyBkdXJhdGlvbjtcbiAgICBsZXQga2V5ZnJhbWVzID0gJ3tcXG4nO1xuICAgIGZvciAobGV0IHAgPSAwOyBwIDw9IDE7IHAgKz0gc3RlcCkge1xuICAgICAgICBjb25zdCB0ID0gYSArIChiIC0gYSkgKiBlYXNlKHApO1xuICAgICAgICBrZXlmcmFtZXMgKz0gcCAqIDEwMCArIGAleyR7Zm4odCwgMSAtIHQpfX1cXG5gO1xuICAgIH1cbiAgICBjb25zdCBydWxlID0ga2V5ZnJhbWVzICsgYDEwMCUgeyR7Zm4oYiwgMSAtIGIpfX1cXG59YDtcbiAgICBjb25zdCBuYW1lID0gYF9fc3ZlbHRlXyR7aGFzaChydWxlKX1fJHt1aWR9YDtcbiAgICBpZiAoIWN1cnJlbnRfcnVsZXNbbmFtZV0pIHtcbiAgICAgICAgaWYgKCFzdHlsZXNoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IGVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgICAgICAgIHN0eWxlc2hlZXQgPSBzdHlsZS5zaGVldDtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50X3J1bGVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgc3R5bGVzaGVldC5pbnNlcnRSdWxlKGBAa2V5ZnJhbWVzICR7bmFtZX0gJHtydWxlfWAsIHN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICB9XG4gICAgY29uc3QgYW5pbWF0aW9uID0gbm9kZS5zdHlsZS5hbmltYXRpb24gfHwgJyc7XG4gICAgbm9kZS5zdHlsZS5hbmltYXRpb24gPSBgJHthbmltYXRpb24gPyBgJHthbmltYXRpb259LCBgIDogYGB9JHtuYW1lfSAke2R1cmF0aW9ufW1zIGxpbmVhciAke2RlbGF5fW1zIDEgYm90aGA7XG4gICAgYWN0aXZlICs9IDE7XG4gICAgcmV0dXJuIG5hbWU7XG59XG5mdW5jdGlvbiBkZWxldGVfcnVsZShub2RlLCBuYW1lKSB7XG4gICAgbm9kZS5zdHlsZS5hbmltYXRpb24gPSAobm9kZS5zdHlsZS5hbmltYXRpb24gfHwgJycpXG4gICAgICAgIC5zcGxpdCgnLCAnKVxuICAgICAgICAuZmlsdGVyKG5hbWVcbiAgICAgICAgPyBhbmltID0+IGFuaW0uaW5kZXhPZihuYW1lKSA8IDAgLy8gcmVtb3ZlIHNwZWNpZmljIGFuaW1hdGlvblxuICAgICAgICA6IGFuaW0gPT4gYW5pbS5pbmRleE9mKCdfX3N2ZWx0ZScpID09PSAtMSAvLyByZW1vdmUgYWxsIFN2ZWx0ZSBhbmltYXRpb25zXG4gICAgKVxuICAgICAgICAuam9pbignLCAnKTtcbiAgICBpZiAobmFtZSAmJiAhLS1hY3RpdmUpXG4gICAgICAgIGNsZWFyX3J1bGVzKCk7XG59XG5mdW5jdGlvbiBjbGVhcl9ydWxlcygpIHtcbiAgICByYWYoKCkgPT4ge1xuICAgICAgICBpZiAoYWN0aXZlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsZXQgaSA9IHN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKVxuICAgICAgICAgICAgc3R5bGVzaGVldC5kZWxldGVSdWxlKGkpO1xuICAgICAgICBjdXJyZW50X3J1bGVzID0ge307XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZV9hbmltYXRpb24obm9kZSwgZnJvbSwgZm4sIHBhcmFtcykge1xuICAgIGlmICghZnJvbSlcbiAgICAgICAgcmV0dXJuIG5vb3A7XG4gICAgY29uc3QgdG8gPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmIChmcm9tLmxlZnQgPT09IHRvLmxlZnQgJiYgZnJvbS5yaWdodCA9PT0gdG8ucmlnaHQgJiYgZnJvbS50b3AgPT09IHRvLnRvcCAmJiBmcm9tLmJvdHRvbSA9PT0gdG8uYm90dG9tKVxuICAgICAgICByZXR1cm4gbm9vcDtcbiAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCBcbiAgICAvLyBAdHMtaWdub3JlIHRvZG86IHNob3VsZCB0aGlzIGJlIHNlcGFyYXRlZCBmcm9tIGRlc3RydWN0dXJpbmc/IE9yIHN0YXJ0L2VuZCBhZGRlZCB0byBwdWJsaWMgYXBpIGFuZCBkb2N1bWVudGF0aW9uP1xuICAgIHN0YXJ0OiBzdGFydF90aW1lID0gbm93KCkgKyBkZWxheSwgXG4gICAgLy8gQHRzLWlnbm9yZSB0b2RvOlxuICAgIGVuZCA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbiwgdGljayA9IG5vb3AsIGNzcyB9ID0gZm4obm9kZSwgeyBmcm9tLCB0byB9LCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gdHJ1ZTtcbiAgICBsZXQgc3RhcnRlZCA9IGZhbHNlO1xuICAgIGxldCBuYW1lO1xuICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICBpZiAoY3NzKSB7XG4gICAgICAgICAgICBuYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgMCwgMSwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkZWxheSkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgaWYgKGNzcylcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIG5hbWUpO1xuICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgaWYgKCFzdGFydGVkICYmIG5vdyA+PSBzdGFydF90aW1lKSB7XG4gICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRlZCAmJiBub3cgPj0gZW5kKSB7XG4gICAgICAgICAgICB0aWNrKDEsIDApO1xuICAgICAgICAgICAgc3RvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcnVubmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydGVkKSB7XG4gICAgICAgICAgICBjb25zdCBwID0gbm93IC0gc3RhcnRfdGltZTtcbiAgICAgICAgICAgIGNvbnN0IHQgPSAwICsgMSAqIGVhc2luZyhwIC8gZHVyYXRpb24pO1xuICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gICAgc3RhcnQoKTtcbiAgICB0aWNrKDAsIDEpO1xuICAgIHJldHVybiBzdG9wO1xufVxuZnVuY3Rpb24gZml4X3Bvc2l0aW9uKG5vZGUpIHtcbiAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgaWYgKHN0eWxlLnBvc2l0aW9uICE9PSAnYWJzb2x1dGUnICYmIHN0eWxlLnBvc2l0aW9uICE9PSAnZml4ZWQnKSB7XG4gICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gc3R5bGU7XG4gICAgICAgIGNvbnN0IGEgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBub2RlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgbm9kZS5zdHlsZS53aWR0aCA9IHdpZHRoO1xuICAgICAgICBub2RlLnN0eWxlLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgYWRkX3RyYW5zZm9ybShub2RlLCBhKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRfdHJhbnNmb3JtKG5vZGUsIGEpIHtcbiAgICBjb25zdCBiID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAoYS5sZWZ0ICE9PSBiLmxlZnQgfHwgYS50b3AgIT09IGIudG9wKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtID09PSAnbm9uZScgPyAnJyA6IHN0eWxlLnRyYW5zZm9ybTtcbiAgICAgICAgbm9kZS5zdHlsZS50cmFuc2Zvcm0gPSBgJHt0cmFuc2Zvcm19IHRyYW5zbGF0ZSgke2EubGVmdCAtIGIubGVmdH1weCwgJHthLnRvcCAtIGIudG9wfXB4KWA7XG4gICAgfVxufVxuXG5sZXQgY3VycmVudF9jb21wb25lbnQ7XG5mdW5jdGlvbiBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgY3VycmVudF9jb21wb25lbnQgPSBjb21wb25lbnQ7XG59XG5mdW5jdGlvbiBnZXRfY3VycmVudF9jb21wb25lbnQoKSB7XG4gICAgaWYgKCFjdXJyZW50X2NvbXBvbmVudClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGdW5jdGlvbiBjYWxsZWQgb3V0c2lkZSBjb21wb25lbnQgaW5pdGlhbGl6YXRpb25gKTtcbiAgICByZXR1cm4gY3VycmVudF9jb21wb25lbnQ7XG59XG5mdW5jdGlvbiBiZWZvcmVVcGRhdGUoZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5iZWZvcmVfdXBkYXRlLnB1c2goZm4pO1xufVxuZnVuY3Rpb24gb25Nb3VudChmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLm9uX21vdW50LnB1c2goZm4pO1xufVxuZnVuY3Rpb24gYWZ0ZXJVcGRhdGUoZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5hZnRlcl91cGRhdGUucHVzaChmbik7XG59XG5mdW5jdGlvbiBvbkRlc3Ryb3koZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5vbl9kZXN0cm95LnB1c2goZm4pO1xufVxuZnVuY3Rpb24gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCkge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IGN1cnJlbnRfY29tcG9uZW50O1xuICAgIHJldHVybiAodHlwZSwgZGV0YWlsKSA9PiB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IGNvbXBvbmVudC4kJC5jYWxsYmFja3NbdHlwZV07XG4gICAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgICAgIC8vIFRPRE8gYXJlIHRoZXJlIHNpdHVhdGlvbnMgd2hlcmUgZXZlbnRzIGNvdWxkIGJlIGRpc3BhdGNoZWRcbiAgICAgICAgICAgIC8vIGluIGEgc2VydmVyIChub24tRE9NKSBlbnZpcm9ubWVudD9cbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gY3VzdG9tX2V2ZW50KHR5cGUsIGRldGFpbCk7XG4gICAgICAgICAgICBjYWxsYmFja3Muc2xpY2UoKS5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgICAgICAgICBmbi5jYWxsKGNvbXBvbmVudCwgZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gc2V0Q29udGV4dChrZXksIGNvbnRleHQpIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5jb250ZXh0LnNldChrZXksIGNvbnRleHQpO1xufVxuZnVuY3Rpb24gZ2V0Q29udGV4dChrZXkpIHtcbiAgICByZXR1cm4gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuY29udGV4dC5nZXQoa2V5KTtcbn1cbi8vIFRPRE8gZmlndXJlIG91dCBpZiB3ZSBzdGlsbCB3YW50IHRvIHN1cHBvcnRcbi8vIHNob3J0aGFuZCBldmVudHMsIG9yIGlmIHdlIHdhbnQgdG8gaW1wbGVtZW50XG4vLyBhIHJlYWwgYnViYmxpbmcgbWVjaGFuaXNtXG5mdW5jdGlvbiBidWJibGUoY29tcG9uZW50LCBldmVudCkge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IGNvbXBvbmVudC4kJC5jYWxsYmFja3NbZXZlbnQudHlwZV07XG4gICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICBjYWxsYmFja3Muc2xpY2UoKS5mb3JFYWNoKGZuID0+IGZuKGV2ZW50KSk7XG4gICAgfVxufVxuXG5jb25zdCBkaXJ0eV9jb21wb25lbnRzID0gW107XG5jb25zdCBpbnRyb3MgPSB7IGVuYWJsZWQ6IGZhbHNlIH07XG5jb25zdCBiaW5kaW5nX2NhbGxiYWNrcyA9IFtdO1xuY29uc3QgcmVuZGVyX2NhbGxiYWNrcyA9IFtdO1xuY29uc3QgZmx1c2hfY2FsbGJhY2tzID0gW107XG5jb25zdCByZXNvbHZlZF9wcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5sZXQgdXBkYXRlX3NjaGVkdWxlZCA9IGZhbHNlO1xuZnVuY3Rpb24gc2NoZWR1bGVfdXBkYXRlKCkge1xuICAgIGlmICghdXBkYXRlX3NjaGVkdWxlZCkge1xuICAgICAgICB1cGRhdGVfc2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgICAgcmVzb2x2ZWRfcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICB9XG59XG5mdW5jdGlvbiB0aWNrKCkge1xuICAgIHNjaGVkdWxlX3VwZGF0ZSgpO1xuICAgIHJldHVybiByZXNvbHZlZF9wcm9taXNlO1xufVxuZnVuY3Rpb24gYWRkX3JlbmRlcl9jYWxsYmFjayhmbikge1xuICAgIHJlbmRlcl9jYWxsYmFja3MucHVzaChmbik7XG59XG5mdW5jdGlvbiBhZGRfZmx1c2hfY2FsbGJhY2soZm4pIHtcbiAgICBmbHVzaF9jYWxsYmFja3MucHVzaChmbik7XG59XG5mdW5jdGlvbiBmbHVzaCgpIHtcbiAgICBjb25zdCBzZWVuX2NhbGxiYWNrcyA9IG5ldyBTZXQoKTtcbiAgICBkbyB7XG4gICAgICAgIC8vIGZpcnN0LCBjYWxsIGJlZm9yZVVwZGF0ZSBmdW5jdGlvbnNcbiAgICAgICAgLy8gYW5kIHVwZGF0ZSBjb21wb25lbnRzXG4gICAgICAgIHdoaWxlIChkaXJ0eV9jb21wb25lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gZGlydHlfY29tcG9uZW50cy5zaGlmdCgpO1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoY29tcG9uZW50LiQkKTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoYmluZGluZ19jYWxsYmFja3MubGVuZ3RoKVxuICAgICAgICAgICAgYmluZGluZ19jYWxsYmFja3MucG9wKCkoKTtcbiAgICAgICAgLy8gdGhlbiwgb25jZSBjb21wb25lbnRzIGFyZSB1cGRhdGVkLCBjYWxsXG4gICAgICAgIC8vIGFmdGVyVXBkYXRlIGZ1bmN0aW9ucy4gVGhpcyBtYXkgY2F1c2VcbiAgICAgICAgLy8gc3Vic2VxdWVudCB1cGRhdGVzLi4uXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyX2NhbGxiYWNrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSByZW5kZXJfY2FsbGJhY2tzW2ldO1xuICAgICAgICAgICAgaWYgKCFzZWVuX2NhbGxiYWNrcy5oYXMoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAvLyAuLi5zbyBndWFyZCBhZ2FpbnN0IGluZmluaXRlIGxvb3BzXG4gICAgICAgICAgICAgICAgc2Vlbl9jYWxsYmFja3MuYWRkKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZW5kZXJfY2FsbGJhY2tzLmxlbmd0aCA9IDA7XG4gICAgfSB3aGlsZSAoZGlydHlfY29tcG9uZW50cy5sZW5ndGgpO1xuICAgIHdoaWxlIChmbHVzaF9jYWxsYmFja3MubGVuZ3RoKSB7XG4gICAgICAgIGZsdXNoX2NhbGxiYWNrcy5wb3AoKSgpO1xuICAgIH1cbiAgICB1cGRhdGVfc2NoZWR1bGVkID0gZmFsc2U7XG59XG5mdW5jdGlvbiB1cGRhdGUoJCQpIHtcbiAgICBpZiAoJCQuZnJhZ21lbnQpIHtcbiAgICAgICAgJCQudXBkYXRlKCQkLmRpcnR5KTtcbiAgICAgICAgcnVuX2FsbCgkJC5iZWZvcmVfdXBkYXRlKTtcbiAgICAgICAgJCQuZnJhZ21lbnQucCgkJC5kaXJ0eSwgJCQuY3R4KTtcbiAgICAgICAgJCQuZGlydHkgPSBudWxsO1xuICAgICAgICAkJC5hZnRlcl91cGRhdGUuZm9yRWFjaChhZGRfcmVuZGVyX2NhbGxiYWNrKTtcbiAgICB9XG59XG5cbmxldCBwcm9taXNlO1xuZnVuY3Rpb24gd2FpdCgpIHtcbiAgICBpZiAoIXByb21pc2UpIHtcbiAgICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICBwcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcHJvbWlzZSA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cbmZ1bmN0aW9uIGRpc3BhdGNoKG5vZGUsIGRpcmVjdGlvbiwga2luZCkge1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChjdXN0b21fZXZlbnQoYCR7ZGlyZWN0aW9uID8gJ2ludHJvJyA6ICdvdXRybyd9JHtraW5kfWApKTtcbn1cbmNvbnN0IG91dHJvaW5nID0gbmV3IFNldCgpO1xubGV0IG91dHJvcztcbmZ1bmN0aW9uIGdyb3VwX291dHJvcygpIHtcbiAgICBvdXRyb3MgPSB7XG4gICAgICAgIHI6IDAsXG4gICAgICAgIGM6IFtdLFxuICAgICAgICBwOiBvdXRyb3MgLy8gcGFyZW50IGdyb3VwXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNoZWNrX291dHJvcygpIHtcbiAgICBpZiAoIW91dHJvcy5yKSB7XG4gICAgICAgIHJ1bl9hbGwob3V0cm9zLmMpO1xuICAgIH1cbiAgICBvdXRyb3MgPSBvdXRyb3MucDtcbn1cbmZ1bmN0aW9uIHRyYW5zaXRpb25faW4oYmxvY2ssIGxvY2FsKSB7XG4gICAgaWYgKGJsb2NrICYmIGJsb2NrLmkpIHtcbiAgICAgICAgb3V0cm9pbmcuZGVsZXRlKGJsb2NrKTtcbiAgICAgICAgYmxvY2suaShsb2NhbCk7XG4gICAgfVxufVxuZnVuY3Rpb24gdHJhbnNpdGlvbl9vdXQoYmxvY2ssIGxvY2FsLCBkZXRhY2gsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGJsb2NrICYmIGJsb2NrLm8pIHtcbiAgICAgICAgaWYgKG91dHJvaW5nLmhhcyhibG9jaykpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIG91dHJvaW5nLmFkZChibG9jayk7XG4gICAgICAgIG91dHJvcy5jLnB1c2goKCkgPT4ge1xuICAgICAgICAgICAgb3V0cm9pbmcuZGVsZXRlKGJsb2NrKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGlmIChkZXRhY2gpXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrLmQoMSk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGJsb2NrLm8obG9jYWwpO1xuICAgIH1cbn1cbmNvbnN0IG51bGxfdHJhbnNpdGlvbiA9IHsgZHVyYXRpb246IDAgfTtcbmZ1bmN0aW9uIGNyZWF0ZV9pbl90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMpIHtcbiAgICBsZXQgY29uZmlnID0gZm4obm9kZSwgcGFyYW1zKTtcbiAgICBsZXQgcnVubmluZyA9IGZhbHNlO1xuICAgIGxldCBhbmltYXRpb25fbmFtZTtcbiAgICBsZXQgdGFzaztcbiAgICBsZXQgdWlkID0gMDtcbiAgICBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgICAgICBpZiAoYW5pbWF0aW9uX25hbWUpXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdvKCkge1xuICAgICAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCB0aWNrID0gbm9vcCwgY3NzIH0gPSBjb25maWcgfHwgbnVsbF90cmFuc2l0aW9uO1xuICAgICAgICBpZiAoY3NzKVxuICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCAwLCAxLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzLCB1aWQrKyk7XG4gICAgICAgIHRpY2soMCwgMSk7XG4gICAgICAgIGNvbnN0IHN0YXJ0X3RpbWUgPSBub3coKSArIGRlbGF5O1xuICAgICAgICBjb25zdCBlbmRfdGltZSA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbjtcbiAgICAgICAgaWYgKHRhc2spXG4gICAgICAgICAgICB0YXNrLmFib3J0KCk7XG4gICAgICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIHRydWUsICdzdGFydCcpKTtcbiAgICAgICAgdGFzayA9IGxvb3Aobm93ID0+IHtcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBlbmRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICB0aWNrKDEsIDApO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCB0cnVlLCAnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBzdGFydF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBlYXNpbmcoKG5vdyAtIHN0YXJ0X3RpbWUpIC8gZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aWNrKHQsIDEgLSB0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcnVubmluZztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxldCBzdGFydGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQoKSB7XG4gICAgICAgICAgICBpZiAoc3RhcnRlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlKTtcbiAgICAgICAgICAgIGlmIChpc19mdW5jdGlvbihjb25maWcpKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICAgICAgd2FpdCgpLnRoZW4oZ28pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ28oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaW52YWxpZGF0ZSgpIHtcbiAgICAgICAgICAgIHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW5kKCkge1xuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9vdXRfdHJhbnNpdGlvbihub2RlLCBmbiwgcGFyYW1zKSB7XG4gICAgbGV0IGNvbmZpZyA9IGZuKG5vZGUsIHBhcmFtcyk7XG4gICAgbGV0IHJ1bm5pbmcgPSB0cnVlO1xuICAgIGxldCBhbmltYXRpb25fbmFtZTtcbiAgICBjb25zdCBncm91cCA9IG91dHJvcztcbiAgICBncm91cC5yICs9IDE7XG4gICAgZnVuY3Rpb24gZ28oKSB7XG4gICAgICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIHRpY2sgPSBub29wLCBjc3MgfSA9IGNvbmZpZyB8fCBudWxsX3RyYW5zaXRpb247XG4gICAgICAgIGlmIChjc3MpXG4gICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDEsIDAsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MpO1xuICAgICAgICBjb25zdCBzdGFydF90aW1lID0gbm93KCkgKyBkZWxheTtcbiAgICAgICAgY29uc3QgZW5kX3RpbWUgPSBzdGFydF90aW1lICsgZHVyYXRpb247XG4gICAgICAgIGFkZF9yZW5kZXJfY2FsbGJhY2soKCkgPT4gZGlzcGF0Y2gobm9kZSwgZmFsc2UsICdzdGFydCcpKTtcbiAgICAgICAgbG9vcChub3cgPT4ge1xuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAobm93ID49IGVuZF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpY2soMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIGZhbHNlLCAnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghLS1ncm91cC5yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIHdpbGwgcmVzdWx0IGluIGBlbmQoKWAgYmVpbmcgY2FsbGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc28gd2UgZG9uJ3QgbmVlZCB0byBjbGVhbiB1cCBoZXJlXG4gICAgICAgICAgICAgICAgICAgICAgICBydW5fYWxsKGdyb3VwLmMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBzdGFydF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBlYXNpbmcoKG5vdyAtIHN0YXJ0X3RpbWUpIC8gZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aWNrKDEgLSB0LCB0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcnVubmluZztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChpc19mdW5jdGlvbihjb25maWcpKSB7XG4gICAgICAgIHdhaXQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZygpO1xuICAgICAgICAgICAgZ28oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnbygpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBlbmQocmVzZXQpIHtcbiAgICAgICAgICAgIGlmIChyZXNldCAmJiBjb25maWcudGljaykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy50aWNrKDEsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5pbWF0aW9uX25hbWUpXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIGFuaW1hdGlvbl9uYW1lKTtcbiAgICAgICAgICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlX2JpZGlyZWN0aW9uYWxfdHJhbnNpdGlvbihub2RlLCBmbiwgcGFyYW1zLCBpbnRybykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCB0ID0gaW50cm8gPyAwIDogMTtcbiAgICBsZXQgcnVubmluZ19wcm9ncmFtID0gbnVsbDtcbiAgICBsZXQgcGVuZGluZ19wcm9ncmFtID0gbnVsbDtcbiAgICBsZXQgYW5pbWF0aW9uX25hbWUgPSBudWxsO1xuICAgIGZ1bmN0aW9uIGNsZWFyX2FuaW1hdGlvbigpIHtcbiAgICAgICAgaWYgKGFuaW1hdGlvbl9uYW1lKVxuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgYW5pbWF0aW9uX25hbWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbml0KHByb2dyYW0sIGR1cmF0aW9uKSB7XG4gICAgICAgIGNvbnN0IGQgPSBwcm9ncmFtLmIgLSB0O1xuICAgICAgICBkdXJhdGlvbiAqPSBNYXRoLmFicyhkKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGE6IHQsXG4gICAgICAgICAgICBiOiBwcm9ncmFtLmIsXG4gICAgICAgICAgICBkLFxuICAgICAgICAgICAgZHVyYXRpb24sXG4gICAgICAgICAgICBzdGFydDogcHJvZ3JhbS5zdGFydCxcbiAgICAgICAgICAgIGVuZDogcHJvZ3JhbS5zdGFydCArIGR1cmF0aW9uLFxuICAgICAgICAgICAgZ3JvdXA6IHByb2dyYW0uZ3JvdXBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ28oYikge1xuICAgICAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCB0aWNrID0gbm9vcCwgY3NzIH0gPSBjb25maWcgfHwgbnVsbF90cmFuc2l0aW9uO1xuICAgICAgICBjb25zdCBwcm9ncmFtID0ge1xuICAgICAgICAgICAgc3RhcnQ6IG5vdygpICsgZGVsYXksXG4gICAgICAgICAgICBiXG4gICAgICAgIH07XG4gICAgICAgIGlmICghYikge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBpbXByb3ZlIHR5cGluZ3NcbiAgICAgICAgICAgIHByb2dyYW0uZ3JvdXAgPSBvdXRyb3M7XG4gICAgICAgICAgICBvdXRyb3MuciArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0pIHtcbiAgICAgICAgICAgIHBlbmRpbmdfcHJvZ3JhbSA9IHByb2dyYW07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiB0aGlzIGlzIGFuIGludHJvLCBhbmQgdGhlcmUncyBhIGRlbGF5LCB3ZSBuZWVkIHRvIGRvXG4gICAgICAgICAgICAvLyBhbiBpbml0aWFsIHRpY2sgYW5kL29yIGFwcGx5IENTUyBhbmltYXRpb24gaW1tZWRpYXRlbHlcbiAgICAgICAgICAgIGlmIChjc3MpIHtcbiAgICAgICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIHQsIGIsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGIpXG4gICAgICAgICAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgICAgIHJ1bm5pbmdfcHJvZ3JhbSA9IGluaXQocHJvZ3JhbSwgZHVyYXRpb24pO1xuICAgICAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiBkaXNwYXRjaChub2RlLCBiLCAnc3RhcnQnKSk7XG4gICAgICAgICAgICBsb29wKG5vdyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBlbmRpbmdfcHJvZ3JhbSAmJiBub3cgPiBwZW5kaW5nX3Byb2dyYW0uc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gaW5pdChwZW5kaW5nX3Byb2dyYW0sIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgcnVubmluZ19wcm9ncmFtLmIsICdzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3NzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgdCwgcnVubmluZ19wcm9ncmFtLmIsIHJ1bm5pbmdfcHJvZ3JhbS5kdXJhdGlvbiwgMCwgZWFzaW5nLCBjb25maWcuY3NzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocnVubmluZ19wcm9ncmFtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub3cgPj0gcnVubmluZ19wcm9ncmFtLmVuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGljayh0ID0gcnVubmluZ19wcm9ncmFtLmIsIDEgLSB0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIHJ1bm5pbmdfcHJvZ3JhbS5iLCAnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBlbmRpbmdfcHJvZ3JhbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlJ3JlIGRvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVubmluZ19wcm9ncmFtLmIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW50cm8g4oCUIHdlIGNhbiB0aWR5IHVwIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3V0cm8g4oCUIG5lZWRzIHRvIGJlIGNvb3JkaW5hdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghLS1ydW5uaW5nX3Byb2dyYW0uZ3JvdXAucilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bl9hbGwocnVubmluZ19wcm9ncmFtLmdyb3VwLmMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bm5pbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobm93ID49IHJ1bm5pbmdfcHJvZ3JhbS5zdGFydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcCA9IG5vdyAtIHJ1bm5pbmdfcHJvZ3JhbS5zdGFydDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQgPSBydW5uaW5nX3Byb2dyYW0uYSArIHJ1bm5pbmdfcHJvZ3JhbS5kICogZWFzaW5nKHAgLyBydW5uaW5nX3Byb2dyYW0uZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhKHJ1bm5pbmdfcHJvZ3JhbSB8fCBwZW5kaW5nX3Byb2dyYW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcnVuKGIpIHtcbiAgICAgICAgICAgIGlmIChpc19mdW5jdGlvbihjb25maWcpKSB7XG4gICAgICAgICAgICAgICAgd2FpdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZygpO1xuICAgICAgICAgICAgICAgICAgICBnbyhiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdvKGIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbmQoKSB7XG4gICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcbiAgICAgICAgICAgIHJ1bm5pbmdfcHJvZ3JhbSA9IHBlbmRpbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfcHJvbWlzZShwcm9taXNlLCBpbmZvKSB7XG4gICAgY29uc3QgdG9rZW4gPSBpbmZvLnRva2VuID0ge307XG4gICAgZnVuY3Rpb24gdXBkYXRlKHR5cGUsIGluZGV4LCBrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmIChpbmZvLnRva2VuICE9PSB0b2tlbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaW5mby5yZXNvbHZlZCA9IGtleSAmJiB7IFtrZXldOiB2YWx1ZSB9O1xuICAgICAgICBjb25zdCBjaGlsZF9jdHggPSBhc3NpZ24oYXNzaWduKHt9LCBpbmZvLmN0eCksIGluZm8ucmVzb2x2ZWQpO1xuICAgICAgICBjb25zdCBibG9jayA9IHR5cGUgJiYgKGluZm8uY3VycmVudCA9IHR5cGUpKGNoaWxkX2N0eCk7XG4gICAgICAgIGlmIChpbmZvLmJsb2NrKSB7XG4gICAgICAgICAgICBpZiAoaW5mby5ibG9ja3MpIHtcbiAgICAgICAgICAgICAgICBpbmZvLmJsb2Nrcy5mb3JFYWNoKChibG9jaywgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gaW5kZXggJiYgYmxvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwX291dHJvcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbl9vdXQoYmxvY2ssIDEsIDEsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvLmJsb2Nrc1tpXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrX291dHJvcygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbmZvLmJsb2NrLmQoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBibG9jay5jKCk7XG4gICAgICAgICAgICB0cmFuc2l0aW9uX2luKGJsb2NrLCAxKTtcbiAgICAgICAgICAgIGJsb2NrLm0oaW5mby5tb3VudCgpLCBpbmZvLmFuY2hvcik7XG4gICAgICAgICAgICBmbHVzaCgpO1xuICAgICAgICB9XG4gICAgICAgIGluZm8uYmxvY2sgPSBibG9jaztcbiAgICAgICAgaWYgKGluZm8uYmxvY2tzKVxuICAgICAgICAgICAgaW5mby5ibG9ja3NbaW5kZXhdID0gYmxvY2s7XG4gICAgfVxuICAgIGlmIChpc19wcm9taXNlKHByb21pc2UpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfY29tcG9uZW50ID0gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCk7XG4gICAgICAgIHByb21pc2UudGhlbih2YWx1ZSA9PiB7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY3VycmVudF9jb21wb25lbnQpO1xuICAgICAgICAgICAgdXBkYXRlKGluZm8udGhlbiwgMSwgaW5mby52YWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KG51bGwpO1xuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY3VycmVudF9jb21wb25lbnQpO1xuICAgICAgICAgICAgdXBkYXRlKGluZm8uY2F0Y2gsIDIsIGluZm8uZXJyb3IsIGVycm9yKTtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChudWxsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGlmIHdlIHByZXZpb3VzbHkgaGFkIGEgdGhlbi9jYXRjaCBibG9jaywgZGVzdHJveSBpdFxuICAgICAgICBpZiAoaW5mby5jdXJyZW50ICE9PSBpbmZvLnBlbmRpbmcpIHtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLnBlbmRpbmcsIDApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChpbmZvLmN1cnJlbnQgIT09IGluZm8udGhlbikge1xuICAgICAgICAgICAgdXBkYXRlKGluZm8udGhlbiwgMSwgaW5mby52YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpbmZvLnJlc29sdmVkID0geyBbaW5mby52YWx1ZV06IHByb21pc2UgfTtcbiAgICB9XG59XG5cbmNvbnN0IGdsb2JhbHMgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpO1xuXG5mdW5jdGlvbiBkZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICBibG9jay5kKDEpO1xuICAgIGxvb2t1cC5kZWxldGUoYmxvY2sua2V5KTtcbn1cbmZ1bmN0aW9uIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICB0cmFuc2l0aW9uX291dChibG9jaywgMSwgMSwgKCkgPT4ge1xuICAgICAgICBsb29rdXAuZGVsZXRlKGJsb2NrLmtleSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmaXhfYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIGJsb2NrLmYoKTtcbiAgICBkZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApO1xufVxuZnVuY3Rpb24gZml4X2FuZF9vdXRyb19hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgYmxvY2suZigpO1xuICAgIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApO1xufVxuZnVuY3Rpb24gdXBkYXRlX2tleWVkX2VhY2gob2xkX2Jsb2NrcywgY2hhbmdlZCwgZ2V0X2tleSwgZHluYW1pYywgY3R4LCBsaXN0LCBsb29rdXAsIG5vZGUsIGRlc3Ryb3ksIGNyZWF0ZV9lYWNoX2Jsb2NrLCBuZXh0LCBnZXRfY29udGV4dCkge1xuICAgIGxldCBvID0gb2xkX2Jsb2Nrcy5sZW5ndGg7XG4gICAgbGV0IG4gPSBsaXN0Lmxlbmd0aDtcbiAgICBsZXQgaSA9IG87XG4gICAgY29uc3Qgb2xkX2luZGV4ZXMgPSB7fTtcbiAgICB3aGlsZSAoaS0tKVxuICAgICAgICBvbGRfaW5kZXhlc1tvbGRfYmxvY2tzW2ldLmtleV0gPSBpO1xuICAgIGNvbnN0IG5ld19ibG9ja3MgPSBbXTtcbiAgICBjb25zdCBuZXdfbG9va3VwID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IGRlbHRhcyA9IG5ldyBNYXAoKTtcbiAgICBpID0gbjtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkX2N0eCA9IGdldF9jb250ZXh0KGN0eCwgbGlzdCwgaSk7XG4gICAgICAgIGNvbnN0IGtleSA9IGdldF9rZXkoY2hpbGRfY3R4KTtcbiAgICAgICAgbGV0IGJsb2NrID0gbG9va3VwLmdldChrZXkpO1xuICAgICAgICBpZiAoIWJsb2NrKSB7XG4gICAgICAgICAgICBibG9jayA9IGNyZWF0ZV9lYWNoX2Jsb2NrKGtleSwgY2hpbGRfY3R4KTtcbiAgICAgICAgICAgIGJsb2NrLmMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkeW5hbWljKSB7XG4gICAgICAgICAgICBibG9jay5wKGNoYW5nZWQsIGNoaWxkX2N0eCk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3X2xvb2t1cC5zZXQoa2V5LCBuZXdfYmxvY2tzW2ldID0gYmxvY2spO1xuICAgICAgICBpZiAoa2V5IGluIG9sZF9pbmRleGVzKVxuICAgICAgICAgICAgZGVsdGFzLnNldChrZXksIE1hdGguYWJzKGkgLSBvbGRfaW5kZXhlc1trZXldKSk7XG4gICAgfVxuICAgIGNvbnN0IHdpbGxfbW92ZSA9IG5ldyBTZXQoKTtcbiAgICBjb25zdCBkaWRfbW92ZSA9IG5ldyBTZXQoKTtcbiAgICBmdW5jdGlvbiBpbnNlcnQoYmxvY2spIHtcbiAgICAgICAgdHJhbnNpdGlvbl9pbihibG9jaywgMSk7XG4gICAgICAgIGJsb2NrLm0obm9kZSwgbmV4dCk7XG4gICAgICAgIGxvb2t1cC5zZXQoYmxvY2sua2V5LCBibG9jayk7XG4gICAgICAgIG5leHQgPSBibG9jay5maXJzdDtcbiAgICAgICAgbi0tO1xuICAgIH1cbiAgICB3aGlsZSAobyAmJiBuKSB7XG4gICAgICAgIGNvbnN0IG5ld19ibG9jayA9IG5ld19ibG9ja3NbbiAtIDFdO1xuICAgICAgICBjb25zdCBvbGRfYmxvY2sgPSBvbGRfYmxvY2tzW28gLSAxXTtcbiAgICAgICAgY29uc3QgbmV3X2tleSA9IG5ld19ibG9jay5rZXk7XG4gICAgICAgIGNvbnN0IG9sZF9rZXkgPSBvbGRfYmxvY2sua2V5O1xuICAgICAgICBpZiAobmV3X2Jsb2NrID09PSBvbGRfYmxvY2spIHtcbiAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgICAgIG5leHQgPSBuZXdfYmxvY2suZmlyc3Q7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgICAgICBuLS07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIW5ld19sb29rdXAuaGFzKG9sZF9rZXkpKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgb2xkIGJsb2NrXG4gICAgICAgICAgICBkZXN0cm95KG9sZF9ibG9jaywgbG9va3VwKTtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghbG9va3VwLmhhcyhuZXdfa2V5KSB8fCB3aWxsX21vdmUuaGFzKG5ld19rZXkpKSB7XG4gICAgICAgICAgICBpbnNlcnQobmV3X2Jsb2NrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkaWRfbW92ZS5oYXMob2xkX2tleSkpIHtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZWx0YXMuZ2V0KG5ld19rZXkpID4gZGVsdGFzLmdldChvbGRfa2V5KSkge1xuICAgICAgICAgICAgZGlkX21vdmUuYWRkKG5ld19rZXkpO1xuICAgICAgICAgICAgaW5zZXJ0KG5ld19ibG9jayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3aWxsX21vdmUuYWRkKG9sZF9rZXkpO1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgfVxuICAgIHdoaWxlIChvLS0pIHtcbiAgICAgICAgY29uc3Qgb2xkX2Jsb2NrID0gb2xkX2Jsb2Nrc1tvXTtcbiAgICAgICAgaWYgKCFuZXdfbG9va3VwLmhhcyhvbGRfYmxvY2sua2V5KSlcbiAgICAgICAgICAgIGRlc3Ryb3kob2xkX2Jsb2NrLCBsb29rdXApO1xuICAgIH1cbiAgICB3aGlsZSAobilcbiAgICAgICAgaW5zZXJ0KG5ld19ibG9ja3NbbiAtIDFdKTtcbiAgICByZXR1cm4gbmV3X2Jsb2Nrcztcbn1cbmZ1bmN0aW9uIG1lYXN1cmUoYmxvY2tzKSB7XG4gICAgY29uc3QgcmVjdHMgPSB7fTtcbiAgICBsZXQgaSA9IGJsb2Nrcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSlcbiAgICAgICAgcmVjdHNbYmxvY2tzW2ldLmtleV0gPSBibG9ja3NbaV0ubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gcmVjdHM7XG59XG5cbmZ1bmN0aW9uIGdldF9zcHJlYWRfdXBkYXRlKGxldmVscywgdXBkYXRlcykge1xuICAgIGNvbnN0IHVwZGF0ZSA9IHt9O1xuICAgIGNvbnN0IHRvX251bGxfb3V0ID0ge307XG4gICAgY29uc3QgYWNjb3VudGVkX2ZvciA9IHsgJCRzY29wZTogMSB9O1xuICAgIGxldCBpID0gbGV2ZWxzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGNvbnN0IG8gPSBsZXZlbHNbaV07XG4gICAgICAgIGNvbnN0IG4gPSB1cGRhdGVzW2ldO1xuICAgICAgICBpZiAobikge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbykge1xuICAgICAgICAgICAgICAgIGlmICghKGtleSBpbiBuKSlcbiAgICAgICAgICAgICAgICAgICAgdG9fbnVsbF9vdXRba2V5XSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBuKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhY2NvdW50ZWRfZm9yW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlW2tleV0gPSBuW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGFjY291bnRlZF9mb3Jba2V5XSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV2ZWxzW2ldID0gbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG8pIHtcbiAgICAgICAgICAgICAgICBhY2NvdW50ZWRfZm9yW2tleV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IGluIHRvX251bGxfb3V0KSB7XG4gICAgICAgIGlmICghKGtleSBpbiB1cGRhdGUpKVxuICAgICAgICAgICAgdXBkYXRlW2tleV0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiB1cGRhdGU7XG59XG5cbmNvbnN0IGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyID0gL1tcXHMnXCI+Lz1cXHV7RkREMH0tXFx1e0ZERUZ9XFx1e0ZGRkV9XFx1e0ZGRkZ9XFx1ezFGRkZFfVxcdXsxRkZGRn1cXHV7MkZGRkV9XFx1ezJGRkZGfVxcdXszRkZGRX1cXHV7M0ZGRkZ9XFx1ezRGRkZFfVxcdXs0RkZGRn1cXHV7NUZGRkV9XFx1ezVGRkZGfVxcdXs2RkZGRX1cXHV7NkZGRkZ9XFx1ezdGRkZFfVxcdXs3RkZGRn1cXHV7OEZGRkV9XFx1ezhGRkZGfVxcdXs5RkZGRX1cXHV7OUZGRkZ9XFx1e0FGRkZFfVxcdXtBRkZGRn1cXHV7QkZGRkV9XFx1e0JGRkZGfVxcdXtDRkZGRX1cXHV7Q0ZGRkZ9XFx1e0RGRkZFfVxcdXtERkZGRn1cXHV7RUZGRkV9XFx1e0VGRkZGfVxcdXtGRkZGRX1cXHV7RkZGRkZ9XFx1ezEwRkZGRX1cXHV7MTBGRkZGfV0vdTtcbi8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI2F0dHJpYnV0ZXMtMlxuLy8gaHR0cHM6Ly9pbmZyYS5zcGVjLndoYXR3Zy5vcmcvI25vbmNoYXJhY3RlclxuZnVuY3Rpb24gc3ByZWFkKGFyZ3MpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSwgLi4uYXJncyk7XG4gICAgbGV0IHN0ciA9ICcnO1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgIGlmIChpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3Rlci50ZXN0KG5hbWUpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZXNbbmFtZV07XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodmFsdWUgPT09IHRydWUpXG4gICAgICAgICAgICBzdHIgKz0gXCIgXCIgKyBuYW1lO1xuICAgICAgICBjb25zdCBlc2NhcGVkID0gU3RyaW5nKHZhbHVlKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1wiL2csICcmIzM0OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKTtcbiAgICAgICAgc3RyICs9IFwiIFwiICsgbmFtZSArIFwiPVwiICsgSlNPTi5zdHJpbmdpZnkoZXNjYXBlZCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0cjtcbn1cbmNvbnN0IGVzY2FwZWQgPSB7XG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgXCInXCI6ICcmIzM5OycsXG4gICAgJyYnOiAnJmFtcDsnLFxuICAgICc8JzogJyZsdDsnLFxuICAgICc+JzogJyZndDsnXG59O1xuZnVuY3Rpb24gZXNjYXBlKGh0bWwpIHtcbiAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoL1tcIicmPD5dL2csIG1hdGNoID0+IGVzY2FwZWRbbWF0Y2hdKTtcbn1cbmZ1bmN0aW9uIGVhY2goaXRlbXMsIGZuKSB7XG4gICAgbGV0IHN0ciA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgc3RyICs9IGZuKGl0ZW1zW2ldLCBpKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cbmNvbnN0IG1pc3NpbmdfY29tcG9uZW50ID0ge1xuICAgICQkcmVuZGVyOiAoKSA9PiAnJ1xufTtcbmZ1bmN0aW9uIHZhbGlkYXRlX2NvbXBvbmVudChjb21wb25lbnQsIG5hbWUpIHtcbiAgICBpZiAoIWNvbXBvbmVudCB8fCAhY29tcG9uZW50LiQkcmVuZGVyKSB7XG4gICAgICAgIGlmIChuYW1lID09PSAnc3ZlbHRlOmNvbXBvbmVudCcpXG4gICAgICAgICAgICBuYW1lICs9ICcgdGhpcz17Li4ufSc7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgPCR7bmFtZX0+IGlzIG5vdCBhIHZhbGlkIFNTUiBjb21wb25lbnQuIFlvdSBtYXkgbmVlZCB0byByZXZpZXcgeW91ciBidWlsZCBjb25maWcgdG8gZW5zdXJlIHRoYXQgZGVwZW5kZW5jaWVzIGFyZSBjb21waWxlZCwgcmF0aGVyIHRoYW4gaW1wb3J0ZWQgYXMgcHJlLWNvbXBpbGVkIG1vZHVsZXNgKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGRlYnVnKGZpbGUsIGxpbmUsIGNvbHVtbiwgdmFsdWVzKSB7XG4gICAgY29uc29sZS5sb2coYHtAZGVidWd9ICR7ZmlsZSA/IGZpbGUgKyAnICcgOiAnJ30oJHtsaW5lfToke2NvbHVtbn0pYCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKHZhbHVlcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIHJldHVybiAnJztcbn1cbmxldCBvbl9kZXN0cm95O1xuZnVuY3Rpb24gY3JlYXRlX3Nzcl9jb21wb25lbnQoZm4pIHtcbiAgICBmdW5jdGlvbiAkJHJlbmRlcihyZXN1bHQsIHByb3BzLCBiaW5kaW5ncywgc2xvdHMpIHtcbiAgICAgICAgY29uc3QgcGFyZW50X2NvbXBvbmVudCA9IGN1cnJlbnRfY29tcG9uZW50O1xuICAgICAgICBjb25zdCAkJCA9IHtcbiAgICAgICAgICAgIG9uX2Rlc3Ryb3ksXG4gICAgICAgICAgICBjb250ZXh0OiBuZXcgTWFwKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBbXSksXG4gICAgICAgICAgICAvLyB0aGVzZSB3aWxsIGJlIGltbWVkaWF0ZWx5IGRpc2NhcmRlZFxuICAgICAgICAgICAgb25fbW91bnQ6IFtdLFxuICAgICAgICAgICAgYmVmb3JlX3VwZGF0ZTogW10sXG4gICAgICAgICAgICBhZnRlcl91cGRhdGU6IFtdLFxuICAgICAgICAgICAgY2FsbGJhY2tzOiBibGFua19vYmplY3QoKVxuICAgICAgICB9O1xuICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoeyAkJCB9KTtcbiAgICAgICAgY29uc3QgaHRtbCA9IGZuKHJlc3VsdCwgcHJvcHMsIGJpbmRpbmdzLCBzbG90cyk7XG4gICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChwYXJlbnRfY29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJlbmRlcjogKHByb3BzID0ge30sIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgICAgICAgICAgb25fZGVzdHJveSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geyBoZWFkOiAnJywgY3NzOiBuZXcgU2V0KCkgfTtcbiAgICAgICAgICAgIGNvbnN0IGh0bWwgPSAkJHJlbmRlcihyZXN1bHQsIHByb3BzLCB7fSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBydW5fYWxsKG9uX2Rlc3Ryb3kpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBodG1sLFxuICAgICAgICAgICAgICAgIGNzczoge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBBcnJheS5mcm9tKHJlc3VsdC5jc3MpLm1hcChjc3MgPT4gY3NzLmNvZGUpLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICBtYXA6IG51bGwgLy8gVE9ET1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGVhZDogcmVzdWx0LmhlYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgICQkcmVuZGVyXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGFkZF9hdHRyaWJ1dGUobmFtZSwgdmFsdWUsIGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCAoYm9vbGVhbiAmJiAhdmFsdWUpKVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgcmV0dXJuIGAgJHtuYW1lfSR7dmFsdWUgPT09IHRydWUgPyAnJyA6IGA9JHt0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gSlNPTi5zdHJpbmdpZnkoZXNjYXBlKHZhbHVlKSkgOiBgXCIke3ZhbHVlfVwiYH1gfWA7XG59XG5mdW5jdGlvbiBhZGRfY2xhc3NlcyhjbGFzc2VzKSB7XG4gICAgcmV0dXJuIGNsYXNzZXMgPyBgIGNsYXNzPVwiJHtjbGFzc2VzfVwiYCA6IGBgO1xufVxuXG5mdW5jdGlvbiBiaW5kKGNvbXBvbmVudCwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICBpZiAoY29tcG9uZW50LiQkLnByb3BzLmluZGV4T2YobmFtZSkgPT09IC0xKVxuICAgICAgICByZXR1cm47XG4gICAgY29tcG9uZW50LiQkLmJvdW5kW25hbWVdID0gY2FsbGJhY2s7XG4gICAgY2FsbGJhY2soY29tcG9uZW50LiQkLmN0eFtuYW1lXSk7XG59XG5mdW5jdGlvbiBtb3VudF9jb21wb25lbnQoY29tcG9uZW50LCB0YXJnZXQsIGFuY2hvcikge1xuICAgIGNvbnN0IHsgZnJhZ21lbnQsIG9uX21vdW50LCBvbl9kZXN0cm95LCBhZnRlcl91cGRhdGUgfSA9IGNvbXBvbmVudC4kJDtcbiAgICBmcmFnbWVudC5tKHRhcmdldCwgYW5jaG9yKTtcbiAgICAvLyBvbk1vdW50IGhhcHBlbnMgYmVmb3JlIHRoZSBpbml0aWFsIGFmdGVyVXBkYXRlXG4gICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld19vbl9kZXN0cm95ID0gb25fbW91bnQubWFwKHJ1bikuZmlsdGVyKGlzX2Z1bmN0aW9uKTtcbiAgICAgICAgaWYgKG9uX2Rlc3Ryb3kpIHtcbiAgICAgICAgICAgIG9uX2Rlc3Ryb3kucHVzaCguLi5uZXdfb25fZGVzdHJveSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBFZGdlIGNhc2UgLSBjb21wb25lbnQgd2FzIGRlc3Ryb3llZCBpbW1lZGlhdGVseSxcbiAgICAgICAgICAgIC8vIG1vc3QgbGlrZWx5IGFzIGEgcmVzdWx0IG9mIGEgYmluZGluZyBpbml0aWFsaXNpbmdcbiAgICAgICAgICAgIHJ1bl9hbGwobmV3X29uX2Rlc3Ryb3kpO1xuICAgICAgICB9XG4gICAgICAgIGNvbXBvbmVudC4kJC5vbl9tb3VudCA9IFtdO1xuICAgIH0pO1xuICAgIGFmdGVyX3VwZGF0ZS5mb3JFYWNoKGFkZF9yZW5kZXJfY2FsbGJhY2spO1xufVxuZnVuY3Rpb24gZGVzdHJveV9jb21wb25lbnQoY29tcG9uZW50LCBkZXRhY2hpbmcpIHtcbiAgICBpZiAoY29tcG9uZW50LiQkLmZyYWdtZW50KSB7XG4gICAgICAgIHJ1bl9hbGwoY29tcG9uZW50LiQkLm9uX2Rlc3Ryb3kpO1xuICAgICAgICBjb21wb25lbnQuJCQuZnJhZ21lbnQuZChkZXRhY2hpbmcpO1xuICAgICAgICAvLyBUT0RPIG51bGwgb3V0IG90aGVyIHJlZnMsIGluY2x1ZGluZyBjb21wb25lbnQuJCQgKGJ1dCBuZWVkIHRvXG4gICAgICAgIC8vIHByZXNlcnZlIGZpbmFsIHN0YXRlPylcbiAgICAgICAgY29tcG9uZW50LiQkLm9uX2Rlc3Ryb3kgPSBjb21wb25lbnQuJCQuZnJhZ21lbnQgPSBudWxsO1xuICAgICAgICBjb21wb25lbnQuJCQuY3R4ID0ge307XG4gICAgfVxufVxuZnVuY3Rpb24gbWFrZV9kaXJ0eShjb21wb25lbnQsIGtleSkge1xuICAgIGlmICghY29tcG9uZW50LiQkLmRpcnR5KSB7XG4gICAgICAgIGRpcnR5X2NvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgICAgICBzY2hlZHVsZV91cGRhdGUoKTtcbiAgICAgICAgY29tcG9uZW50LiQkLmRpcnR5ID0gYmxhbmtfb2JqZWN0KCk7XG4gICAgfVxuICAgIGNvbXBvbmVudC4kJC5kaXJ0eVtrZXldID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGluaXQoY29tcG9uZW50LCBvcHRpb25zLCBpbnN0YW5jZSwgY3JlYXRlX2ZyYWdtZW50LCBub3RfZXF1YWwsIHByb3BfbmFtZXMpIHtcbiAgICBjb25zdCBwYXJlbnRfY29tcG9uZW50ID0gY3VycmVudF9jb21wb25lbnQ7XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgY29uc3QgcHJvcHMgPSBvcHRpb25zLnByb3BzIHx8IHt9O1xuICAgIGNvbnN0ICQkID0gY29tcG9uZW50LiQkID0ge1xuICAgICAgICBmcmFnbWVudDogbnVsbCxcbiAgICAgICAgY3R4OiBudWxsLFxuICAgICAgICAvLyBzdGF0ZVxuICAgICAgICBwcm9wczogcHJvcF9uYW1lcyxcbiAgICAgICAgdXBkYXRlOiBub29wLFxuICAgICAgICBub3RfZXF1YWwsXG4gICAgICAgIGJvdW5kOiBibGFua19vYmplY3QoKSxcbiAgICAgICAgLy8gbGlmZWN5Y2xlXG4gICAgICAgIG9uX21vdW50OiBbXSxcbiAgICAgICAgb25fZGVzdHJveTogW10sXG4gICAgICAgIGJlZm9yZV91cGRhdGU6IFtdLFxuICAgICAgICBhZnRlcl91cGRhdGU6IFtdLFxuICAgICAgICBjb250ZXh0OiBuZXcgTWFwKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBbXSksXG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgICBjYWxsYmFja3M6IGJsYW5rX29iamVjdCgpLFxuICAgICAgICBkaXJ0eTogbnVsbFxuICAgIH07XG4gICAgbGV0IHJlYWR5ID0gZmFsc2U7XG4gICAgJCQuY3R4ID0gaW5zdGFuY2VcbiAgICAgICAgPyBpbnN0YW5jZShjb21wb25lbnQsIHByb3BzLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCQkLmN0eCAmJiBub3RfZXF1YWwoJCQuY3R4W2tleV0sICQkLmN0eFtrZXldID0gdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQkLmJvdW5kW2tleV0pXG4gICAgICAgICAgICAgICAgICAgICQkLmJvdW5kW2tleV0odmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChyZWFkeSlcbiAgICAgICAgICAgICAgICAgICAgbWFrZV9kaXJ0eShjb21wb25lbnQsIGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIDogcHJvcHM7XG4gICAgJCQudXBkYXRlKCk7XG4gICAgcmVhZHkgPSB0cnVlO1xuICAgIHJ1bl9hbGwoJCQuYmVmb3JlX3VwZGF0ZSk7XG4gICAgJCQuZnJhZ21lbnQgPSBjcmVhdGVfZnJhZ21lbnQoJCQuY3R4KTtcbiAgICBpZiAob3B0aW9ucy50YXJnZXQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuaHlkcmF0ZSkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50LmwoY2hpbGRyZW4ob3B0aW9ucy50YXJnZXQpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgICAgICAkJC5mcmFnbWVudC5jKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuaW50cm8pXG4gICAgICAgICAgICB0cmFuc2l0aW9uX2luKGNvbXBvbmVudC4kJC5mcmFnbWVudCk7XG4gICAgICAgIG1vdW50X2NvbXBvbmVudChjb21wb25lbnQsIG9wdGlvbnMudGFyZ2V0LCBvcHRpb25zLmFuY2hvcik7XG4gICAgICAgIGZsdXNoKCk7XG4gICAgfVxuICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChwYXJlbnRfY29tcG9uZW50KTtcbn1cbmxldCBTdmVsdGVFbGVtZW50O1xuaWYgKHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBTdmVsdGVFbGVtZW50ID0gY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBpbXByb3ZlIHR5cGluZ3NcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuJCQuc2xvdHRlZCkge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLiQkLnNsb3R0ZWRba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHIsIF9vbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXNbYXR0cl0gPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICAkZGVzdHJveSgpIHtcbiAgICAgICAgICAgIGRlc3Ryb3lfY29tcG9uZW50KHRoaXMsIDEpO1xuICAgICAgICAgICAgdGhpcy4kZGVzdHJveSA9IG5vb3A7XG4gICAgICAgIH1cbiAgICAgICAgJG9uKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAvLyBUT0RPIHNob3VsZCB0aGlzIGRlbGVnYXRlIHRvIGFkZEV2ZW50TGlzdGVuZXI/XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFja3MgPSAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gfHwgKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdID0gW10pKTtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgICRzZXQoKSB7XG4gICAgICAgICAgICAvLyBvdmVycmlkZGVuIGJ5IGluc3RhbmNlLCBpZiBpdCBoYXMgcHJvcHNcbiAgICAgICAgfVxuICAgIH07XG59XG5jbGFzcyBTdmVsdGVDb21wb25lbnQge1xuICAgICRkZXN0cm95KCkge1xuICAgICAgICBkZXN0cm95X2NvbXBvbmVudCh0aGlzLCAxKTtcbiAgICAgICAgdGhpcy4kZGVzdHJveSA9IG5vb3A7XG4gICAgfVxuICAgICRvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBjYWxsYmFja3MgPSAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gfHwgKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdID0gW10pKTtcbiAgICAgICAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAkc2V0KCkge1xuICAgICAgICAvLyBvdmVycmlkZGVuIGJ5IGluc3RhbmNlLCBpZiBpdCBoYXMgcHJvcHNcbiAgICB9XG59XG5jbGFzcyBTdmVsdGVDb21wb25lbnREZXYgZXh0ZW5kcyBTdmVsdGVDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zIHx8ICghb3B0aW9ucy50YXJnZXQgJiYgIW9wdGlvbnMuJCRpbmxpbmUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCd0YXJnZXQnIGlzIGEgcmVxdWlyZWQgb3B0aW9uYCk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG4gICAgJGRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLiRkZXN0cm95KCk7XG4gICAgICAgIHRoaXMuJGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYENvbXBvbmVudCB3YXMgYWxyZWFkeSBkZXN0cm95ZWRgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgeyBIdG1sVGFnLCBTdmVsdGVDb21wb25lbnQsIFN2ZWx0ZUNvbXBvbmVudERldiwgU3ZlbHRlRWxlbWVudCwgYWRkX2F0dHJpYnV0ZSwgYWRkX2NsYXNzZXMsIGFkZF9mbHVzaF9jYWxsYmFjaywgYWRkX2xvY2F0aW9uLCBhZGRfcmVuZGVyX2NhbGxiYWNrLCBhZGRfcmVzaXplX2xpc3RlbmVyLCBhZGRfdHJhbnNmb3JtLCBhZnRlclVwZGF0ZSwgYXBwZW5kLCBhc3NpZ24sIGF0dHIsIGJlZm9yZVVwZGF0ZSwgYmluZCwgYmluZGluZ19jYWxsYmFja3MsIGJsYW5rX29iamVjdCwgYnViYmxlLCBjaGVja19vdXRyb3MsIGNoaWxkcmVuLCBjbGFpbV9lbGVtZW50LCBjbGFpbV90ZXh0LCBjbGVhcl9sb29wcywgY29tcG9uZW50X3N1YnNjcmliZSwgY3JlYXRlRXZlbnREaXNwYXRjaGVyLCBjcmVhdGVfYW5pbWF0aW9uLCBjcmVhdGVfYmlkaXJlY3Rpb25hbF90cmFuc2l0aW9uLCBjcmVhdGVfaW5fdHJhbnNpdGlvbiwgY3JlYXRlX291dF90cmFuc2l0aW9uLCBjcmVhdGVfc2xvdCwgY3JlYXRlX3Nzcl9jb21wb25lbnQsIGN1cnJlbnRfY29tcG9uZW50LCBjdXN0b21fZXZlbnQsIGRlYnVnLCBkZXN0cm95X2Jsb2NrLCBkZXN0cm95X2NvbXBvbmVudCwgZGVzdHJveV9lYWNoLCBkZXRhY2gsIGRpcnR5X2NvbXBvbmVudHMsIGVhY2gsIGVsZW1lbnQsIGVsZW1lbnRfaXMsIGVtcHR5LCBlc2NhcGUsIGVzY2FwZWQsIGV4Y2x1ZGVfaW50ZXJuYWxfcHJvcHMsIGZpeF9hbmRfZGVzdHJveV9ibG9jaywgZml4X2FuZF9vdXRyb19hbmRfZGVzdHJveV9ibG9jaywgZml4X3Bvc2l0aW9uLCBmbHVzaCwgZ2V0Q29udGV4dCwgZ2V0X2JpbmRpbmdfZ3JvdXBfdmFsdWUsIGdldF9jdXJyZW50X2NvbXBvbmVudCwgZ2V0X3Nsb3RfY2hhbmdlcywgZ2V0X3Nsb3RfY29udGV4dCwgZ2V0X3NwcmVhZF91cGRhdGUsIGdldF9zdG9yZV92YWx1ZSwgZ2xvYmFscywgZ3JvdXBfb3V0cm9zLCBoYW5kbGVfcHJvbWlzZSwgaWRlbnRpdHksIGluaXQsIGluc2VydCwgaW50cm9zLCBpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3RlciwgaXNfY2xpZW50LCBpc19mdW5jdGlvbiwgaXNfcHJvbWlzZSwgbGlzdGVuLCBsb29wLCBtZWFzdXJlLCBtaXNzaW5nX2NvbXBvbmVudCwgbW91bnRfY29tcG9uZW50LCBub29wLCBub3RfZXF1YWwsIG5vdywgbnVsbF90b19lbXB0eSwgb2JqZWN0X3dpdGhvdXRfcHJvcGVydGllcywgb25EZXN0cm95LCBvbk1vdW50LCBvbmNlLCBvdXRyb19hbmRfZGVzdHJveV9ibG9jaywgcHJldmVudF9kZWZhdWx0LCByYWYsIHJ1biwgcnVuX2FsbCwgc2FmZV9ub3RfZXF1YWwsIHNjaGVkdWxlX3VwZGF0ZSwgc2VsZWN0X211bHRpcGxlX3ZhbHVlLCBzZWxlY3Rfb3B0aW9uLCBzZWxlY3Rfb3B0aW9ucywgc2VsZWN0X3ZhbHVlLCBzZWxmLCBzZXRDb250ZXh0LCBzZXRfYXR0cmlidXRlcywgc2V0X2N1cnJlbnRfY29tcG9uZW50LCBzZXRfY3VzdG9tX2VsZW1lbnRfZGF0YSwgc2V0X2RhdGEsIHNldF9pbnB1dF90eXBlLCBzZXRfaW5wdXRfdmFsdWUsIHNldF9ub3csIHNldF9yYWYsIHNldF9zdHlsZSwgc3BhY2UsIHNwcmVhZCwgc3RvcF9wcm9wYWdhdGlvbiwgc3Vic2NyaWJlLCBzdmdfZWxlbWVudCwgdGV4dCwgdGljaywgdGltZV9yYW5nZXNfdG9fYXJyYXksIHRvX251bWJlciwgdG9nZ2xlX2NsYXNzLCB0cmFuc2l0aW9uX2luLCB0cmFuc2l0aW9uX291dCwgdXBkYXRlX2tleWVkX2VhY2gsIHZhbGlkYXRlX2NvbXBvbmVudCwgdmFsaWRhdGVfc3RvcmUsIHhsaW5rX2F0dHIgfTtcbiIsIjxzY3JpcHQ+XG5leHBvcnQgbGV0IGltZ1NyYywgYWx0O1xuZXhwb3J0IGxldCBwcm9qZWN0TmFtZTtcbmV4cG9ydCBsZXQgdXJsO1xuZXhwb3J0IGxldCB3aWR0aDtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gICAgYSwgZGl2e1xuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgfVxuXG4gICAgYSB7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuXG4gICAgLmltZy1jb250YWluZXJ7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgd2lkdGg6IDY1dnc7XG4gICAgICAgIGhlaWdodDogNjV2dztcbiAgICAgICAgbWF4LWhlaWdodDogMjUwcHg7XG4gICAgICAgIGJveC1zaGFkb3c6IDNweCAzcHggM3B4IGxpZ2h0Z3JleTtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIC4zcyBlYXNlLWluO1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICAuaW1nLWNvbnRhaW5lcntcbiAgICAgICAgICAgIG1heC13aWR0aDoxMDAlOyBcbiAgICAgICAgICAgIHdpZHRoOiAyNXZ3O1xuICAgICAgICAgICAgaGVpZ2h0OiAyNXZ3O1xuICAgICAgICAgICAgbWF4LXdpZHRoOiAzNTBweDtcbiAgICAgICAgICAgIG1heC1oZWlnaHQ6IDM1MHB4O1xuICAgICAgICB9IFxuXG4gICAgICAgIC5sYXJnZSAuaW1nLWNvbnRhaW5lciB7XG4gICAgICAgICAgICB3aWR0aDogMzB2dztcbiAgICAgICAgICAgIGhlaWdodDogMzB2dztcbiAgICAgICAgICAgIG1heC13aWR0aDogNDUwcHg7XG4gICAgICAgICAgICBtYXgtaGVpZ2h0OiA0NTBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5mdWxsLXdpZHRoIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG5cbiAgICAgICAgLmZ1bGwtd2lkdGggLmltZy1jb250YWluZXIgeyBcbiAgICAgICAgICAgIHdpZHRoOiBjYWxjKDUwJSAtIDMwdncgKyA2MHZ3KTtcbiAgICAgICAgICAgIGhlaWdodDogMzB2dztcbiAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICAgICAgLyogbWFyZ2luLWxlZnQ6IGF1dG87ICovXG4gICAgICAgICAgICBtYXgtd2lkdGg6IDEwMzlweDtcbiAgICAgICAgICAgIG1heC1oZWlnaHQ6IDQ1MHB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYTpob3ZlciAuaW1nLWNvbnRhaW5lciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xuICAgICAgICBib3gtc2hhZG93OiA1cHggNXB4IDVweCBsaWdodGdyZXk7XG4gICAgfVxuXG4gICAgaW1nIHtcbiAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAuM3MgZWFzZS1pbjtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICB9XG4gICBcbjwvc3R5bGU+XG5cbjxhIHRhcmdldD1cImJsYW5rXCIgY2xhc3M9XCJ7d2lkdGh9XCIgaHJlZj1cInt1cmx9XCI+XG4gICAgPGRpdiBjbGFzcz1cImltZy1jb250YWluZXJcIj5cbiAgICAgIDxpbWcgc3JjPVwie2ltZ1NyY31cIiBhbHQ9XCJ7YWx0fVwiPlxuICAgIDwvZGl2PlxuPC9hPiIsIjxzY3JpcHQ+XG5leHBvcnQgbGV0IHRleHQ7XG5cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbnNwYW4uaG92ZXItYW5pbWF0aW9uIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuc3Bhbi5ob3Zlci1hbmltYXRpb246OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkO1xuICAgIHdpZHRoOiAwcHg7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEwMCUpO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHRyYW5zaXRpb246IGFsbCAuNDVzIGN1YmljLWJlemllcigwLjg1LCAwLjA4LCAwLjA4LCAwLjk5KTtcbn1cblxuYTpob3ZlciA+IHNwYW4uaG92ZXItYW5pbWF0aW9uOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDApO1xuICAgIHdpZHRoOiAyMHB4O1xuICAgIG1hcmdpbi1yaWdodDogNXB4O1xufVxuXG48L3N0eWxlPlxuXG48c3BhbiBjbGFzcz1cImhvdmVyLWFuaW1hdGlvblwiPnt0ZXh0fTwvc3Bhbj4iLCI8c2NyaXB0PlxuaW1wb3J0IFRleHRBbmltYXRpb24gZnJvbSAnLi4vaGVscGVyLWNvbXBvbmVudHMvVGV4dEFuaW1hdGlvbi5zdmVsdGUnO1xuXG5leHBvcnQgbGV0IHByb2plY3ROYW1lLCB1cmwsIHByb2plY3RUZXh0LCBwcm9qZWN0WWVhcjtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbiAgICBhe1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBmb250LXdlaWdodDogMzAwO1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICBmb250LXNpemU6IDEycmVtO1xuICAgICAgICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gICAgICAgIG1hcmdpbi10b3A6IDEwcmVtO1xuICAgICAgICBjb2xvcjogIzk4OTg5ODtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgIH1cbiAgICBoMiB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luOiAxNXJlbSAwcmVtIDVyZW0gMHJlbTtcbiAgICAgICAgZm9udC1zaXplOiAxM3JlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDkwMDtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAuMnMgZWFzZS1pbi1vdXQ7XG4gICAgICAgIGNvbG9yOiAjM0IzQjNCO1xuICAgICAgICB6LWluZGV4OiAyO1xuICAgIH1cblxuICAgIHB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDE2cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMTNyZW07XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICAgIGNvbG9yOiAjNTg1OTViO1xuICAgICAgICB0ZXh0LWluZGVudDogMTBweDtcbiAgICB9XG5cbiAgICAueWVhcntcbiAgICAgICAgXG4gICAgICAgIGNvbnRlbnQ6ICcyMDE5JztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBmb250LXdlaWdodDogOTAwO1xuICAgICAgICBvcGFjaXR5OiAuNTtcbiAgICAgICAgei1pbmRleDogLTU7XG4gICAgICAgIGxlZnQ6IC02MHB4O1xuICAgICAgICB0b3A6IDMwcHg7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC05MGRlZyk7XG4gICAgICAgIGNvbG9yOiAjZTZlN2U4O1xuICAgICAgICBmb250LXNpemU6IDQ1cHg7XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSkge1xuICAgICAgICBoMiB7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAwcmVtO1xuICAgICAgICB9XG4gICAgfVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICBoMiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjNyZW07XG4gICAgfVxuICAgIHB7XG4gICAgICAgIGZvbnQtc2l6ZTogMThyZW07XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyM3B4O1xuICAgIH1cbiAgICBhe1xuICAgICAgICBmb250LXNpemU6IDE0cmVtO1xuICAgIH1cbn1cblxuPC9zdHlsZT5cbjxkaXY+XG4gICAgPGgyPntwcm9qZWN0TmFtZX08L2gyPlxuICAgIDxwPlxuICAgICAgICA8c3BhbiBjbGFzcz0neWVhcic+e3Byb2plY3RZZWFyfTwvc3Bhbj5cbiAgICAgICAge0BodG1sIHByb2plY3RUZXh0fVxuICAgIDwvcD5cbiAgICA8YSB0YXJnZXQ9XCJibGFua1wiIGhyZWY9XCJ7dXJsfVwiPlxuICAgICAgICA8VGV4dEFuaW1hdGlvbiB0ZXh0PXtgVmlldyBXZWJzaXRlYH0gLz5cbiAgICA8L2E+XG48L2Rpdj4iLCI8c2NyaXB0PlxuICAgIGltcG9ydCB7IG9uTW91bnQgfSBmcm9tICdzdmVsdGUnOyAgXG5cbiAgICBpbXBvcnQgSW1hZ2UgZnJvbSAnLi9JbWFnZS5zdmVsdGUnO1xuICAgIGltcG9ydCBUZXh0IGZyb20gJy4vVGV4dC5zdmVsdGUnOyAgXG5cbiAgICBsZXQgcG9ydGZvbGlvQ2FyZHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJy9wcm9qZWN0cy9oYWxjeW9uJyxcbiAgICAgICAgICAgIGltZ1NyYzogJ2ltYWdlcy9oYWxjeW9uLTUuanBnJyxcbiAgICAgICAgICAgIGFsdDogJ1RodW1ibmFpbCBmb3IgdGhlIEhhbGN5b24gbWFsbCB3ZWJzaXRlIHJlYnVpbGQnLFxuICAgICAgICAgICAgcHJvamVjdE5hbWU6ICdIYWxjeW9uJyxcbiAgICAgICAgICAgIHByb2plY3RZZWFyOiAnMjAxOScsXG4gICAgICAgICAgICBwcm9qZWN0VGV4dDogYEkgd2FzIG9uZSBvZiB0aGUgRnJvbnQgRW5kIERldmVsb3BlcnMgb24gdGhlIHByb2plY3QgcHJpbWFyaWx5IHRhc2tlZCB3aXRoIGNyZWF0aW5nIHRoZSBtb3ZpZXMgcGFnZSBhbmQgZXZlbnRzIGRpcmVjdG9yeS4gQWNyb3NzIHRoZSBwcm9qZWN0IEkgd29ya2VkIHdpdGggPHN0cm9uZz5tdWx0aXBsZSBBUEnigJlzPC9zdHJvbmc+LCA8c3Ryb25nPlJlYWN0IFN0YXRpYzwvc3Ryb25nPiwgYW5kIGRldmVsb3BlZCA8c3Ryb25nPmNsZWFuIGNvZGU8L3N0cm9uZz4gZm9yIG90aGVyIGFkdmFuY2VkIFJlYWN0IGNvbXBvbmVudHMuYFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB1cmw6ICcvcHJvamVjdHMvdW5pdmVyc2l0eS1wYXJrJyxcbiAgICAgICAgICAgIGltZ1NyYzogJ2ltYWdlcy91cHRleGFzLXRodW1iLmpwZycsXG4gICAgICAgICAgICBhbHQ6ICdUaHVtYm5haWwgZm9yIHRoZSBDaXR5IG9mIFVuaXZlcnNpdHkgUGFyayBjb21wbGV0ZSBGcm9udCBFbmQgd2Vic2l0ZSByZWRlc2lnbicsXG4gICAgICAgICAgICBwcm9qZWN0TmFtZTogJ1VuaXZlcnNpdHkgUGFyaycsXG4gICAgICAgICAgICBwcm9qZWN0WWVhcjogJzIwMTknLFxuICAgICAgICAgICAgcHJvamVjdFRleHQ6IGBJIHdhcyB0YXNrZWQgd2l0aCBiZWluZyB0aGUgPHN0cm9uZz5zb2xlIGRldmVsb3Blcjwvc3Ryb25nPiBvbiBhIDxzdHJvbmc+Y29tcGxldGUgRnJvbnQtRW5kIHJlZGVzaWduPC9zdHJvbmc+LiBLZWVwaW5nIHRoZWlyIGN1cnJlbnQgdXNlcnMgaW4gbWluZCwgdGhlIGdvYWwgd2FzIHRvIG1ha2UgdGhlIHdlYnNpdGUgZmVlbCBtb3JlIG1vZGVybiwgYW5kIG9mZmVyIGEgYmV0dGVyIHVzZXIgZXhwZXJpZW5jZSB3aGVuIG5hdmlnYXRpbmcgdG8gZWFjaCBpbmRpdmlkdWFsIHBhZ2UuIEFjcm9zcyB0aGUgZW50aXJlIHByb2plY3QgSSBpbXBsZW1lbnRlZCBzZXZlcmFsIGR5bmFtaWNhbGx5IGdlbmVyYXRlZCBjb250ZW50IHBhZ2VzIC8gc2xpZGVycywgPHN0cm9uZz5mb3JtIHZlcmlmaWNhdGlvbjwvc3Ryb25nPiwgYW5kIHNldmVyYWwgPHN0cm9uZz50aGlyZCBwYXJ0eSBpbnRlZ3JhdGlvbnM8L3N0cm9uZz4uYCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnL3Byb2plY3RzL2NyZWF0aXZlLXJldm9sdCcsXG4gICAgICAgICAgICBpbWdTcmM6ICdpbWFnZXMvSm9yZGVuLUJhY2tncm91bmQtR3JheS5qcGcnLFxuICAgICAgICAgICAgYWx0OiAnVGh1bWJuYWlsIGZvciB0aGUgQ3JlYXRpdmUgUmV2b2x0IHJlZGVzaWduZWQgd2Vic2l0ZScsXG4gICAgICAgICAgICBwcm9qZWN0TmFtZTogJ0NyZWF0aXZlIFJldm9sdCcsXG4gICAgICAgICAgICBwcm9qZWN0WWVhcjogJzIwMTgnLFxuICAgICAgICAgICAgcHJvamVjdFRleHQ6IGBUaGlzIHdhcyBhIGZyZWVsYW5jZSBwcm9qZWN0IHRvIDxzdHJvbmc+cmV3b3JrIHRoZSB3ZWJzaXRlIGxheW91dDwvc3Ryb25nPiBhbmQgdGFpbG9yIHRoZSBmZWVsIG9mIHRoZSB3ZWJzaXRlIHRvIGhlciBwZXJzb25hbCB3cml0aW5nIHN0eWxlLiBJIDxzdHJvbmc+cmV2YW1wZWQgdGhlIGNvbG9yIHBhbGV0dGU8L3N0cm9uZz4gdG8gYmV0dGVyIG1hdGNoIGhlciBwZXJzb25hbGl0eSwgYWRqdXN0ZWQgaGVyIHdlYnNpdGUgZm9yIDxzdHJvbmc+U0VPPC9zdHJvbmc+LCBhbmQgY3JlYXRlZCB0aGUgbGFuZGluZyBwYWdlIGFzIHdlbGwgYXMgbXVsdGlwbGUgcGFnZXMgYWNyb3NzIHRoZSBwbGF0Zm9ybS5gLFxuICAgICAgICB9LFxuICAgIF1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gICAgc2VjdGlvbiB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBwYWRkaW5nOiAxMCUgMCAxMCUgMDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICBzZWN0aW9uIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDEwJSAwIDEwJSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGl2LmNhcmQtY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICB3aWR0aDogMjUwcHg7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA1JTtcbiAgICB9XG5cbiAgICBkaXYuaW1hZ2UtY29udGFpbmVyIHtcbiAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIH1cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgZGl2LmNhcmQtY29udGFpbmVyIHtcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICAgICAgICAgIHdpZHRoOiA5MCU7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA4JTtcbiAgICAgICAgfVxuICAgICAgICBkaXYuY2FyZC1jb250YWluZXI6bnRoLW9mLXR5cGUoMm4pe1xuICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG4gICAgICAgICB9XG4gICAgICAgIGRpdi50ZXh0LWNvbnRhaW5lciB7XG4gICAgICAgICAgICB3aWR0aDogMzUlO1xuICAgICAgICB9XG4gICAgICAgIGRpdi5pbWFnZS1jb250YWluZXIge1xuICAgICAgICAgICAgd2lkdGg6IDUwJTtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICAgICAgfVxuICAgICAgICBkaXYuY2FyZC1jb250YWluZXI6bnRoLW9mLXR5cGUoMm4pIGRpdi5pbWFnZS1jb250YWluZXJ7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSl7XG4gICAgICAgIGRpdi5jYXJkLWNvbnRhaW5lcntcbiAgICAgICAgICAgIHdpZHRoOiA4NSU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMzYzcHgpe1xuICAgICAgICBkaXYuY2FyZC1jb250YWluZXJ7XG4gICAgICAgICAgICB3aWR0aDogODAlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRpdi5wcm9qZWN0cy1jb250YWluZXIge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIH1cblxuICAgIGgyIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgd2lkdGg6IGZpdC1jb250ZW50O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMCU7XG4gICAgICAgIGNvbG9yOiAjM0IzQjNCO1xuICAgICAgICBmb250LXdlaWdodDogODAwO1xuICAgIH1cblxuICAgIGgyOjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gICAgICAgIHdpZHRoOiAzMHB4O1xuICAgICAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgYmxhY2s7XG4gICAgfVxuXG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICAgICAgaDIge1xuICAgICAgICAgICAgZm9udC1zaXplOiAyM3JlbTtcbiAgICAgICAgfVxuICAgIH1cbjwvc3R5bGU+XG5cbjxzZWN0aW9uPlxuICAgIDxoMj5TZWxlY3RlZCBXb3JrczwvaDI+XG4gICAgPGRpdiBjbGFzcz1cInByb2plY3RzLWNvbnRhaW5lclwiPlxuICAgICAgICB7I2VhY2ggcG9ydGZvbGlvQ2FyZHMgYXMgY2FyZCwgaW5kZXh9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250YWluZXJcIiB7aW5kZXh9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPEltYWdlIGltZ1NyYz17Y2FyZC5pbWdTcmN9IHVybD17Y2FyZC51cmx9IGFsdD17Y2FyZC5hbHR9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IHByb2plY3ROYW1lPXtjYXJkLnByb2plY3ROYW1lfSB1cmw9e2NhcmQudXJsfSBwcm9qZWN0VGV4dD17Y2FyZC5wcm9qZWN0VGV4dH0gcHJvamVjdFllYXI9e2NhcmQucHJvamVjdFllYXJ9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgey9lYWNofVxuICAgIDwvZGl2PlxuPC9zZWN0aW9uPiIsIjxzY3JpcHQ+XG5leHBvcnQgbGV0IGFkZENsYXNzO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbnNlY3Rpb24udGl0bGVzIHtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHJlbTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSkge1xuICAgIHNlY3Rpb24udGl0bGVzIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNjByZW07XG4gICAgfVxufVxuXG5oMSB7XG4gICAgY29sb3I6IzNCM0IzQjtcbiAgICBmb250LXdlaWdodDogODAwO1xuICAgIGZvbnQtc2l6ZTogMjNweDtcbn1cbmgyIHtcbiAgICBjb2xvcjojM0IzQjNCO1xuICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDVweDtcbiAgICBtYXJnaW4tdG9wOiAtM3B4O1xuICAgIG9wYWNpdHk6IC44NTtcbn1cblxuaDMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICBvcGFjaXR5OiAuODtcbiAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xufVxuXG5oMzo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMzBweDtcbiAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgYmxhY2s7XG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICAgIG9wYWNpdHk6IC44O1xufVxuXG4gQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSkgYW5kIChtYXgtd2lkdGg6IDY0ZW0pe1xuICAgIGgxIHtcbiAgICAgICAgZm9udC1zaXplOiAyMXB4O1xuICAgICAgICBcbiAgICB9XG4gICAgaDIge1xuICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDdweDtcbiAgICB9XG4gICAgaDMge1xuICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgfVxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKSB7XG4gICAgaDEge1xuICAgICAgICBmb250LXNpemU6IDI4cHg7XG4gICAgfVxuICAgIGgyIHtcbiAgICAgICAgZm9udC1zaXplOiAyMnB4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiA3cHg7XG4gICAgfVxuICAgIGgzIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG59XG5cbjwvc3R5bGU+XG5cbjxzZWN0aW9uIGNsYXNzPVwidGl0bGVzIHthZGRDbGFzc31cIj5cbiAgICA8aDE+RnJvbnQgRW5kIERldmVsb3BlcjwvaDE+XG4gICAgPGgyPlJlYWN0LCBTdmVsdGUsIEVTNjwvaDI+XG4gICAgPGgzPkpvc2h1YSBSb3BlcjwvaDM+XG48L3NlY3Rpb24+IiwiPHNjcmlwdD5cbmV4cG9ydCBsZXQgdGl0bGUsIHNpZGVQYWdlO1xuLy8gc2lkZVBhZ2Ugc2hvdWxkIGJlIHNldCB0byAnc2lkZS1wYWdlJyB0byB0b2dnbGUgY2xhc3Ncbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbiAgICBAa2V5ZnJhbWVzIHNsaWRlSW5SaWdodCB7XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQGtleWZyYW1lcyBiYWRTbGlkZUluUmlnaHQge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgICBsZWZ0OiAtMTAwJTtcbiAgICAgICAgfVxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICAgIGxlZnQ6IDVweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpdjpub3QoLnBhZ2UtaGVhZGVyKSB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICAgIHdpZHRoOiA2NSU7XG4gICAgICAgIG1hcmdpbjogLTA1cHggMHB4IDIwcHggMDtcbiAgICAgICAgZm9udC1zaXplOiAxNnJlbTtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgY29sb3I6ICM1ODU5NWI7XG4gICAgICAgIG1heC13aWR0aDogMTMyMHB4O1xuICAgIH1cblxuICAgIGRpdi5zaWRlLXBhZ2Uge1xuICAgICAgICBmb250LXNpemU6IDEycmVtO1xuICAgICAgICBtYXgtd2lkdGg6IDE3MDVweDtcbiAgICB9XG5cbiAgICBkaXYudGl0bGUtY29udGFpbmVyOm5vdCguc2lkZS1wYWdlKXtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAvKiBhbmltYXRpb246IC45cyBlYXNlLW91dCAwcyAxIGZhZGVJbiBmb3J3YXJkczsgKi9cbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgICAgIGRpdi50aXRsZS1jb250YWluZXI6bm90KC5zaWRlLXBhZ2Upe1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG5cbiAgICAgICAgZGl2Om5vdCgucGFnZS1oZWFkZXIpIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjhyZW07XG4gICAgICAgICAgICB3aWR0aDogNzUlO1xuICAgICAgICB9XG5cbiAgICAgICAgZGl2LnNpZGUtcGFnZSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDI0cmVtO1xuICAgICAgICAgICAgd2lkdGg6IDg1JVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaDEge1xuICAgICAgICBjb2xvcjogIzNCM0IzQjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICAvKiBsZWZ0OiAtMTAwJTsgKi9cbiAgICAgICAgcmlnaHQ6IDBweDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZm9udC1zaXplOiAzMnB4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBtYXJnaW46IDBweDtcbiAgICAgICAgLyogYW5pbWF0aW9uOiAxcyBlYXNlLW91dCAwcyAxIHNsaWRlSW5SaWdodCBmb3J3YXJkczsgKi9cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgaDEge1xuICAgICAgICAgICAgZm9udC1zaXplOiA1NXB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSl7XG4gICAgICAgIGgxIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNjRweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpdi5wYWdlLWhlYWRlcntcbiAgICAgICAgbWFyZ2luLXRvcDogOTBweDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogMTAwdnc7XG4gICAgICAgIGhlaWdodDogMTI1cHg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIHBhZGRpbmctbGVmdDoyMHJlbTtcbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgZGl2LnBhZ2UtaGVhZGVyIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgICAgICAgICAgIGhlaWdodDogMjIwcHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICAgICAgZGl2LnBhZ2UtaGVhZGVyIHtcbiAgICAgICAgICAgIGhlaWdodDogMjUwcHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzcGFue1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGVYKC0xKTtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZVgoLTEpIHJvdGF0ZSgxODBkZWcpIHNrZXcoLTEwZGVnLCAwZGVnKTtcbiAgICAgICAgb3BhY2l0eTogLjAzO1xuICAgICAgICBsZWZ0OiAzcHg7XG4gICAgICAgIGJvdHRvbTogLTI1cHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMzJweDtcbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgc3BhbiB7XG4gICAgICAgICAgICBsZWZ0OiA1cHg7XG4gICAgICAgICAgICBib3R0b206IC01NXB4O1xuICAgICAgICAgICAgZm9udC1zaXplOiA1NXB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSl7XG4gICAgICAgIHNwYW4ge1xuICAgICAgICAgICAgZm9udC1zaXplOiA2NHB4O1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuPC9zdHlsZT5cbjxkaXYgY2xhc3M9XCJwYWdlLWhlYWRlciBjb250YWluZXJcIj5cbiAgICA8ZGl2IGNsYXNzPSd0aXRsZS1jb250YWluZXIge3NpZGVQYWdlfSc+XG4gICAgICAgIDxoMT57dGl0bGV9PC9oMT5cbiAgICAgICAgPHNwYW4+e3RpdGxlfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbjwvZGl2PiIsIjxzY3JpcHQ+XG5leHBvcnQgbGV0IGltZ1NyYywgYWx0O1xuZXhwb3J0IGxldCBwcm9qZWN0TmFtZTtcbmV4cG9ydCBsZXQgdXJsO1xuZXhwb3J0IGxldCB3aWR0aDtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gICAgYSwgZGl2e1xuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgfVxuXG4gICAgYSB7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuXG4gICAgLmltZy1jb250YWluZXJ7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgd2lkdGg6IDY1dnc7XG4gICAgICAgIGhlaWdodDogNjV2dztcbiAgICAgICAgbWF4LWhlaWdodDogMjUwcHg7XG4gICAgICAgIGJveC1zaGFkb3c6IDNweCAzcHggM3B4IGxpZ2h0Z3JleTtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIC4zcyBlYXNlLWluO1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICAuaW1nLWNvbnRhaW5lcntcbiAgICAgICAgICAgIG1heC13aWR0aDoxMDAlOyBcbiAgICAgICAgICAgIHdpZHRoOiAyNXZ3O1xuICAgICAgICAgICAgaGVpZ2h0OiAyNXZ3O1xuICAgICAgICAgICAgbWF4LXdpZHRoOiAzNTBweDtcbiAgICAgICAgICAgIG1heC1oZWlnaHQ6IDM1MHB4O1xuICAgICAgICB9IFxuXG4gICAgICAgIC5sYXJnZSAuaW1nLWNvbnRhaW5lciB7XG4gICAgICAgICAgICB3aWR0aDogMzB2dztcbiAgICAgICAgICAgIGhlaWdodDogMzB2dztcbiAgICAgICAgICAgIG1heC13aWR0aDogNDUwcHg7XG4gICAgICAgICAgICBtYXgtaGVpZ2h0OiA0NTBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIC5mdWxsLXdpZHRoIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG5cbiAgICAgICAgLmZ1bGwtd2lkdGggLmltZy1jb250YWluZXIgeyBcbiAgICAgICAgICAgIHdpZHRoOiBjYWxjKDUwJSAtIDMwdncgKyA2MHZ3KTtcbiAgICAgICAgICAgIGhlaWdodDogMzB2dztcbiAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgbWF4LWhlaWdodDogNDUwcHg7XG4gICAgICAgIH0gKi9cbiAgICB9XG5cbiAgICBhOmhvdmVyIC5pbWctY29udGFpbmVyIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XG4gICAgICAgIGJveC1zaGFkb3c6IDVweCA1cHggNXB4IGxpZ2h0Z3JleTtcbiAgICB9XG5cbiAgICBpbWcge1xuICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIC4zcyBlYXNlLWluO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgIH1cbiAgIFxuPC9zdHlsZT5cblxuPGEgdGFyZ2V0PVwiYmxhbmtcIiBjbGFzcz1cInt3aWR0aH1cIiBocmVmPVwie3VybH1cIj5cbiAgICA8ZGl2IGNsYXNzPVwiaW1nLWNvbnRhaW5lclwiPlxuICAgICAgPGltZyBzcmM9XCJ7aW1nU3JjfVwiIGFsdD1cInthbHR9XCI+XG4gICAgPC9kaXY+XG48L2E+IiwiPHNjcmlwdD5cbmltcG9ydCBUZXh0QW5pbWF0aW9uIGZyb20gJy4uL2hlbHBlci1jb21wb25lbnRzL1RleHRBbmltYXRpb24uc3ZlbHRlJztcblxuZXhwb3J0IGxldCBwcm9qZWN0TmFtZSwgdXJsLCBwcm9qZWN0VGV4dCwgcHJvamVjdFllYXI7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG4gICAgYXtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgZm9udC1zaXplOiAxMnJlbTtcbiAgICAgICAgd2lkdGg6IGZpdC1jb250ZW50O1xuICAgICAgICBtYXJnaW4tdG9wOiAxMHJlbTtcbiAgICAgICAgY29sb3I6ICM5ODk4OTg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICB9XG4gICAgaDIge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIG1hcmdpbjogMTVyZW0gMHJlbSA1cmVtIDByZW07XG4gICAgICAgIGZvbnQtc2l6ZTogMTNyZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA5MDA7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2UtaW4tb3V0O1xuICAgICAgICBjb2xvcjogIzNCM0IzQjtcbiAgICAgICAgei1pbmRleDogMjtcbiAgICB9XG5cbiAgICBwe1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxNnB4O1xuICAgICAgICBmb250LXdlaWdodDogMzAwO1xuICAgICAgICBmb250LXNpemU6IDEzcmVtO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICBjb2xvcjogIzU4NTk1YjtcbiAgICAgICAgLyogdGV4dC1pbmRlbnQ6IDEwcHg7ICovXG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSkge1xuICAgICAgICBoMiB7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAwcmVtO1xuICAgICAgICB9XG4gICAgfVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICBoMiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjNyZW07XG4gICAgfVxuICAgIHB7XG4gICAgICAgIGZvbnQtc2l6ZTogMThyZW07XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyMXB4O1xuICAgIH1cbiAgICBhe1xuICAgICAgICBmb250LXNpemU6IDE0cmVtO1xuICAgIH1cbn1cblxuPC9zdHlsZT5cblxuPGRpdiBjbGFzcz1cImdyaWQteFwiPlxuICAgIDxkaXYgY2xhc3M9XCJncmlkeC01MFwiPlxuICAgICAgICA8aDI+UHJvamVjdDwvaDI+XG4gICAgICAgIDxwPlxuICAgICAgICAgICAgQ29tcGxldGUgRnJvbnQgRW5kIFJlYnVpbGRcbiAgICAgICAgPC9wPlxuICAgICAgICA8IS0tIDxhIHRhcmdldD1cImJsYW5rXCIgaHJlZj1cInt1cmx9XCI+XG4gICAgICAgICAgICA8VGV4dEFuaW1hdGlvbiB0ZXh0PXtgVmlldyBXZWJzaXRlYH0gLz5cbiAgICAgICAgPC9hPiAtLT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZ3JpZHgtNTBcIj5cbiAgICAgICAgPGgyPlJvbGU8L2gyPlxuICAgICAgICA8cD5cbiAgICAgICAgICAgIEZyb250IEVuZCBEZXZlbG9wZXJcbiAgICAgICAgPC9wPlxuICAgICAgICA8IS0tIDxhIHRhcmdldD1cImJsYW5rXCIgaHJlZj1cInt1cmx9XCI+XG4gICAgICAgICAgICA8VGV4dEFuaW1hdGlvbiB0ZXh0PXtgVmlldyBDb2RlYH0gLz5cbiAgICAgICAgPC9hPiAtLT5cbiAgICA8L2Rpdj5cbjwvZGl2PiIsIjxzY3JpcHQ+XG5pbXBvcnQgVGV4dEFuaW1hdGlvbiBmcm9tICcuLi9oZWxwZXItY29tcG9uZW50cy9UZXh0QW5pbWF0aW9uLnN2ZWx0ZSc7XG5cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gIGF7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgIGZvbnQtc2l6ZTogMTJyZW07XG4gICAgICAgIHdpZHRoOiBmaXQtY29udGVudDtcbiAgICAgICAgbWFyZ2luLXRvcDogMTByZW07XG4gICAgICAgIGNvbG9yOiAjOTg5ODk4O1xuICAgICAgICBmb250LXdlaWdodDogMzAwO1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgfVxuICAgIGgyIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBtYXJnaW46IDE1cmVtIDByZW0gNXJlbSAwcmVtO1xuICAgICAgICBmb250LXNpemU6IDEzcmVtO1xuICAgICAgICBmb250LXdlaWdodDogOTAwO1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIC4ycyBlYXNlLWluLW91dDtcbiAgICAgICAgY29sb3I6ICMzQjNCM0I7XG4gICAgICAgIHotaW5kZXg6IDI7XG4gICAgfVxuXG4gICAgcHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBsaW5lLWhlaWdodDogMTZweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgZm9udC1zaXplOiAxM3JlbTtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgY29sb3I6ICM1ODU5NWI7XG4gICAgICAgIHRleHQtaW5kZW50OiAxMHB4O1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pIHtcbiAgICAgICAgaDIge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMHJlbTtcbiAgICAgICAgfVxuICAgIH1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSl7XG4gICAgaDIge1xuICAgICAgICBmb250LXNpemU6IDIzcmVtO1xuICAgIH1cbiAgICBwe1xuICAgICAgICBmb250LXNpemU6IDE4cmVtO1xuICAgICAgICBsaW5lLWhlaWdodDogMjFweDtcbiAgICB9XG4gICAgYXtcbiAgICAgICAgZm9udC1zaXplOiAxNHJlbTtcbiAgICB9XG59XG4udGV4dC1jb250YWluZXIge1xuICAgIHBvc2l0aW9uOiBzdGlja3k7XG4gICAgdG9wOiAxMzBweDtcbn1cbjwvc3R5bGU+XG5cbjxkaXYgY2xhc3M9XCJ0ZXh0LWNvbnRhaW5lclwiPlxuICAgIDxoMj5Qcm9qZWN0IERldGFpbHM8L2gyPlxuICAgIDxwPkkgd2FzIHRhc2tlZCB3aXRoIGJlaW5nIHRoZSA8c3Ryb25nPnNvbGUgZGV2ZWxvcGVyPC9zdHJvbmc+IG9uIGEgPHN0cm9uZz5jb21wbGV0ZSBGcm9udC1FbmQgcmVkZXNpZ248L3N0cm9uZz4uIEtlZXBpbmcgdGhlaXIgY3VycmVudCB1c2VycyBpbiBtaW5kLCB0aGUgZ29hbCB3YXMgdG8gbWFrZSB0aGUgd2Vic2l0ZSBmZWVsIG1vcmUgbW9kZXJuLCBhbmQgb2ZmZXIgYSBiZXR0ZXIgdXNlciBleHBlcmllbmNlIHdoZW4gbmF2aWdhdGluZyB0byBlYWNoIGluZGl2aWR1YWwgcGFnZS4gQWNyb3NzIHRoZSBlbnRpcmUgcHJvamVjdCBJIGltcGxlbWVudGVkIHNldmVyYWwgZHluYW1pY2FsbHkgZ2VuZXJhdGVkIGNvbnRlbnQgcGFnZXMgLyBzbGlkZXJzLCA8c3Ryb25nPmZvcm0gdmVyaWZpY2F0aW9uPC9zdHJvbmc+LCBhbmQgc2V2ZXJhbCA8c3Ryb25nPnRoaXJkIHBhcnR5IGludGVncmF0aW9uczwvc3Ryb25nPi48L3A+XG4gICAgPGEgdGFyZ2V0PVwiYmxhbmtcIiBocmVmPVwiXCI+XG4gICAgICAgIDxUZXh0QW5pbWF0aW9uIHRleHQ9e2BWaWV3IFdlYnNpdGVgfSAvPlxuICAgIDwvYT5cbjwvZGl2PiIsIjxzY3JpcHQ+XG5pbXBvcnQgSW1hZ2UgZnJvbSAnLi9JbWFnZS5zdmVsdGUnO1xuaW1wb3J0IFRvcEJhciBmcm9tICcuL1RvcEJhci5zdmVsdGUnO1xuaW1wb3J0IERlc2NyaXB0aW9uIGZyb20gJy4vRGVzY3JpcHRpb24uc3ZlbHRlJztcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAuaW5uZXItY29udGFpbmVyIHtcbiAgICAgICAgd2lkdGg6IDkwJTtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgfVxufVxuLmltYWdlLWdyaWQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBwYWRkaW5nLXRvcDogOCU7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgIC5pbWFnZS1ncmlkIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgYWxpZ24taXRlbXM6IHVuc2V0O1xuICAgICAgICB3aWR0aDogNTAlO1xuICAgICAgICAvKiBwYWRkaW5nLWxlZnQ6IDUlOyAqL1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICB9XG4gICAgLnByb2plY3QtZGVzY3JpcHRpb24ge1xuICAgICAgICBwYWRkaW5nLXRvcDogOCU7XG4gICAgICAgIHdpZHRoOiA1MCU7XG4gICAgfVxufVxuXG4uZ3JpZC1lbGVtZW50LWNvbnRhaW5lciB7XG4gICAgd2lkdGg6IDI1MHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiA4JTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgLmdyaWQtZWxlbWVudC1jb250YWluZXIge1xuICAgICAgICB3aWR0aDogNTAlO1xuICAgIH1cbiAgICAuZ3JpZC1lbGVtZW50LWNvbnRhaW5lci5mdWxsLXdpZHRoIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuICAgIC5ncmlkLTYwIHtcbiAgICAgICAgd2lkdGg6IDYwJTtcbiAgICB9XG4gICAgLmdyaWQtNDAge1xuICAgICAgICB3aWR0aDogNDAlO1xuICAgIH1cbn1cbjwvc3R5bGU+XG5cbjxkaXYgY2xhc3M9XCJpbm5lci1jb250YWluZXJcIj5cbiAgICA8VG9wQmFyIC8+XG4gICAgPGRpdiBjbGFzcz1cImdyaWQteFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvamVjdC1kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgPERlc2NyaXB0aW9uIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlLWdyaWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkLWVsZW1lbnQtY29udGFpbmVyIGZ1bGwtd2lkdGhcIj4gPCEtLSB0aGlzIHNob3VsZCBiZSBhIGNvb2wgZGVzaWduZXIgaW1hZ2UgKGxvZ28gc2hpeikgLS0+XG4gICAgICAgICAgICAgICAgPEltYWdlIHdpZHRoPXsnZnVsbC13aWR0aCd9IGltZ1NyYz17J2ltYWdlcy9Kb3JkZW4tQmFja2dyb3VuZC1HcmF5LmpwZyd9IHVybD17Jyd9IGFsdD17Jyd9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkLWVsZW1lbnQtY29udGFpbmVyIGZ1bGwtd2lkdGhcIj4gPCEtLSB0aGlzIHNob3VsZCBiZSBhIGNvb2wgZGVzaWduZXIgaW1hZ2UgKGxvZ28gc2hpeikgLS0+XG4gICAgICAgICAgICAgICAgPEltYWdlIHdpZHRoPXsnZnVsbC13aWR0aCd9IGltZ1NyYz17J2ltYWdlcy9Kb3JkZW4tQmFja2dyb3VuZC1HcmF5LmpwZyd9IHVybD17Jyd9IGFsdD17Jyd9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkLWVsZW1lbnQtY29udGFpbmVyIGZ1bGwtd2lkdGhcIj4gPCEtLSB0aGlzIHNob3VsZCBiZSBhIGNvb2wgZGVzaWduZXIgaW1hZ2UgKGxvZ28gc2hpeikgLS0+XG4gICAgICAgICAgICAgICAgPEltYWdlIHdpZHRoPXsnZnVsbC13aWR0aCd9IGltZ1NyYz17J2ltYWdlcy9Kb3JkZW4tQmFja2dyb3VuZC1HcmF5LmpwZyd9IHVybD17Jyd9IGFsdD17Jyd9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj4iLCI8c2NyaXB0PlxuaW1wb3J0IFBhZ2VUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3Byb2plY3QtZGV0YWlsL1BhZ2VUaXRsZS5zdmVsdGUnO1xuaW1wb3J0IEltYWdlR3JpZCBmcm9tICcuLi8uLi9jb21wb25lbnRzL3Byb2plY3QtZGV0YWlsL0ltYWdlR3JpZC5zdmVsdGUnO1xuaW1wb3J0IERlc2NyaXB0aW9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvRGVzY3JpcHRpb24uc3ZlbHRlJ1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuPC9zdHlsZT5cblxuPHN2ZWx0ZTpoZWFkPlxuXHQ8dGl0bGU+Q3JlYXRpdmUgUmV2b2x0IHwgRnJvbnQgRW5kIERldmVsb3BlciAtIEpvc2h1YSBSb3BlcjwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG48ZGl2IFxuICAgIGluOmZseT1cInt7IHg6IC04MCwgZHVyYXRpb246IDUwMCwgZGVsYXk6IDIwMCwgfX1cIlxuPlxuICAgIDxQYWdlVGl0bGUgdGl0bGU9eydDcmVhdGl2ZSBSZXZvbHQnfSAvPlxuPC9kaXY+XG5cbjxzZWN0aW9uIGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICA8IS0tIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgPERlc2NyaXB0aW9uIC8+XG4gICA8L2Rpdj4gIC0tPlxuICAgIDxJbWFnZUdyaWQgLz5cbjwvc2VjdGlvbj4iLCI8c2NyaXB0PlxuZXhwb3J0IGxldCB0aXRsZSwgc2lkZVBhZ2U7XG4vLyBzaWRlUGFnZSBzaG91bGQgYmUgc2V0IHRvICdzaWRlLXBhZ2UnIHRvIHRvZ2dsZSBjbGFzc1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuICAgIEBrZXlmcmFtZXMgc2xpZGVJblJpZ2h0IHtcbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAa2V5ZnJhbWVzIGJhZFNsaWRlSW5SaWdodCB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICAgIGxlZnQ6IC0xMDAlO1xuICAgICAgICB9XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgICAgbGVmdDogNXB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGl2Om5vdCgucGFnZS1oZWFkZXIpIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgICAgd2lkdGg6IDY1JTtcbiAgICAgICAgbWFyZ2luOiAtMDVweCAwcHggMjBweCAwO1xuICAgICAgICBmb250LXNpemU6IDE2cmVtO1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICBjb2xvcjogIzU4NTk1YjtcbiAgICAgICAgbWF4LXdpZHRoOiA5MDBweDtcbiAgICB9XG5cbiAgICBkaXYuc2lkZS1wYWdlIHtcbiAgICAgICAgZm9udC1zaXplOiAxMnJlbTtcbiAgICAgICAgbWF4LXdpZHRoOiAxNzA1cHg7XG4gICAgfVxuXG4gICAgZGl2LnRpdGxlLWNvbnRhaW5lcjpub3QoLnNpZGUtcGFnZSl7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgLyogYW5pbWF0aW9uOiAuOXMgZWFzZS1vdXQgMHMgMSBmYWRlSW4gZm9yd2FyZHM7ICovXG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICBkaXYudGl0bGUtY29udGFpbmVyOm5vdCguc2lkZS1wYWdlKXtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICAgICAgICB3aWR0aDogNzUlO1xuICAgICAgICB9XG5cbiAgICAgICAgZGl2Om5vdCgucGFnZS1oZWFkZXIpIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjhyZW07XG4gICAgICAgICAgICB3aWR0aDogNzUlO1xuICAgICAgICB9XG5cbiAgICAgICAgZGl2LnNpZGUtcGFnZSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDI0cmVtO1xuICAgICAgICAgICAgd2lkdGg6IDg1JVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaDEge1xuICAgICAgICBjb2xvcjogIzNCM0IzQjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICAvKiBsZWZ0OiAtMTAwJTsgKi9cbiAgICAgICAgcmlnaHQ6IDBweDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZm9udC1zaXplOiAzMnB4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBtYXJnaW46IDBweDtcbiAgICAgICAgLyogYW5pbWF0aW9uOiAxcyBlYXNlLW91dCAwcyAxIHNsaWRlSW5SaWdodCBmb3J3YXJkczsgKi9cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgaDEge1xuICAgICAgICAgICAgZm9udC1zaXplOiA1NXB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSl7XG4gICAgICAgIGgxIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNjRweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpdi5wYWdlLWhlYWRlcntcbiAgICAgICAgbWFyZ2luLXRvcDogOTBweDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogMTAwdnc7XG4gICAgICAgIGhlaWdodDogMTI1cHg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIHBhZGRpbmctbGVmdDoyMHJlbTtcbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgZGl2LnBhZ2UtaGVhZGVyIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgICAgICAgICAgIGhlaWdodDogMjIwcHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICAgICAgZGl2LnBhZ2UtaGVhZGVyIHtcbiAgICAgICAgICAgIGhlaWdodDogMjUwcHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzcGFue1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGVYKC0xKTtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZVgoLTEpIHJvdGF0ZSgxODBkZWcpIHNrZXcoLTEwZGVnLCAwZGVnKTtcbiAgICAgICAgb3BhY2l0eTogLjAzO1xuICAgICAgICBsZWZ0OiAzcHg7XG4gICAgICAgIGJvdHRvbTogLTI1cHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMzJweDtcbiAgICAgICAgIC8qIGFuaW1hdGlvbjogMXMgZWFzZS1vdXQgMHMgMSBiYWRTbGlkZUluUmlnaHQ7ICovXG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgICAgIHNwYW4ge1xuICAgICAgICAgICAgbGVmdDogNXB4O1xuICAgICAgICAgICAgYm90dG9tOiAtNTVweDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNTVweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0ZW0pe1xuICAgICAgICBzcGFuIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNjRweDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbjwvc3R5bGU+XG48ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXJcIj5cbiAgICA8ZGl2IGNsYXNzPSd0aXRsZS1jb250YWluZXIge3NpZGVQYWdlfSc+XG4gICAgICAgIDxoMT57dGl0bGV9PC9oMT5cbiAgICAgICAgPHNwYW4+e3RpdGxlfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbjwvZGl2PiIsIjxzY3JpcHQ+XG5pbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJ1xuaW1wb3J0IHsgZmFkZSwgZmx5IH0gZnJvbSAnc3ZlbHRlL3RyYW5zaXRpb24nO1xuXG5pbXBvcnQgUGFnZVRpdGxlIGZyb20gJy4uL2NvbXBvbmVudHMvYWJvdXQvUGFnZVRpdGxlLnN2ZWx0ZSc7XG5cbmltcG9ydCBBYm91dE1lIGZyb20gJy4uL2NvbXBvbmVudHMvYWJvdXQvQWJvdXRNZS5zdmVsdGUnO1xuaW1wb3J0IFNraWxsc1NlY3Rpb24gZnJvbSAnLi4vY29tcG9uZW50cy9hYm91dC9Ta2lsbHMuc3ZlbHRlJztcbmltcG9ydCBDb250YWN0IGZyb20gJy4uL2NvbXBvbmVudHMvYWJvdXQvQ29udGFjdC5zdmVsdGUnO1xuXG4gICAgLy8gbGV0IHggPSAuMjU7XG4gICAgLy8gbGV0IHNlY3Rpb25zID0gW107XG5cbiAgICAvLyBvbk1vdW50KCgpPT57XG4gICAgLy8gICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzZWN0aW9ucy5sZW5ndGg7IGkrKyl7XG4gICAgLy8gICAgICAgICBsZXQgZmFkZUluT3JkZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgLy8gICAgICAgICAgICAgc2VjdGlvbnNbaV0uc3R5bGUuYW5pbWF0aW9uID0gYCR7JzEnfXMgZWFzZS1pbiAke3h9cyAxIGZhZGVJbkxlZnQgZm9yd2FyZHNgO1xuICAgIC8vICAgICAgICAgICAgIHggKz0gLjM1O1xuXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgICBmYWRlSW5PcmRlcigpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfSlcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbiBzZWN0aW9uIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiA1JSAwIDAlIDA7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGNvbG9yOiBncmF5O1xuICAgIG1hcmdpbi1ib3R0b206IDUwcHg7XG59XG5cblx0c2VjdGlvbjo6YmVmb3JlIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB6LWluZGV4OiAtMTtcbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgc2VjdGlvbntcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDgwcHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKSB7XG4gICAgICAgIHNlY3Rpb257XG4gICAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICB9XG4gICAgfVxuXG5cdC5jb250ZW50LWNvbnRhaW5lciB7XG4gICAgICAgIHdpZHRoOiA5MCU7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDQwcmVtO1x0XHRcbiAgICAgICAgLyogb3BhY2l0eTogMDsgKi9cbiAgICAgICAgbWF4LXdpZHRoOiA5MDBweDtcbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgLmNvbnRlbnQtY29udGFpbmVyIHtcbiAgICAgICAgICAgIHdpZHRoOiA3NSU7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1MHJlbTtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxMDByZW07XG4gICAgICAgIH1cbiAgICB9XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSkge1xuICAgICAgICAuY29udGVudC1jb250YWluZXIge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG48L3N0eWxlPlxuXG48c3ZlbHRlOmhlYWQ+XG5cdDx0aXRsZT5BYm91dCB8IEZyb250IEVuZCBEZXZlbG9wZXIgLSBKb3NodWEgUm9wZXI8L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cblxuPGRpdiBcbiAgICBpbjpmbHk9XCJ7eyB4OiAtODAsIGR1cmF0aW9uOiA1MDAsIGRlbGF5OiAyMDAsIH19XCJcbj5cbiAgICA8UGFnZVRpdGxlIHRpdGxlPXsnSm9zaHVhIFJvcGVyJ30gLz5cbjwvZGl2PlxuXG48c2VjdGlvbj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgXG4gICAgICAgICAgICBpbjpmbHk9XCJ7eyB4OiAtNDAsIGR1cmF0aW9uOiA1MDAsIGRlbGF5OiA0NTAsIH19XCJcbiAgICAgICAgICAgIGNsYXNzPVwiY29udGVudC1jb250YWluZXJcIlxuICAgICAgICAgPlxuICAgICAgICAgICAgPEFib3V0TWUgLz5cbiAgICAgICAgPC9kaXY+IFxuICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgaW46Zmx5PVwie3sgeDogLTQwLCBkdXJhdGlvbjogNTAwLCBkZWxheTogNjUwLCB9fVwiXG4gICAgICAgICAgICBjbGFzcz1cImNvbnRlbnQtY29udGFpbmVyXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPFNraWxsc1NlY3Rpb24gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgXG4gICAgICAgICAgICBpbjpmbHk9XCJ7eyB4OiAtNDAsIGR1cmF0aW9uOiA1MDAsIGRlbGF5OiA5MDAsIH19XCJcbiAgICAgICAgICAgIGNsYXNzPVwiY29udGVudC1jb250YWluZXJcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8Q29udGFjdCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvc2VjdGlvbj4iLCI8c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIj5cblx0ZXhwb3J0IGZ1bmN0aW9uIHByZWxvYWQoeyBwYXJhbXMsIHF1ZXJ5IH0pIHtcblx0XHRyZXR1cm4gdGhpcy5mZXRjaChgYmxvZy5qc29uYCkudGhlbihyID0+IHIuanNvbigpKS50aGVuKHBvc3RzID0+IHtcblx0XHRcdHJldHVybiB7IHBvc3RzIH07XG5cdFx0fSk7XG5cdH1cbjwvc2NyaXB0PlxuXG48c2NyaXB0PlxuXHRleHBvcnQgbGV0IHBvc3RzO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblx0dWwge1xuXHRcdG1hcmdpbjogMCAwIDFlbSAwO1xuXHRcdGxpbmUtaGVpZ2h0OiAxLjU7XG5cdH1cbjwvc3R5bGU+XG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPkJsb2c8L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cblxuPGgxPlJlY2VudCBwb3N0czwvaDE+XG5cbjx1bD5cblx0eyNlYWNoIHBvc3RzIGFzIHBvc3R9XG5cdFx0PCEtLSB3ZSdyZSB1c2luZyB0aGUgbm9uLXN0YW5kYXJkIGByZWw9cHJlZmV0Y2hgIGF0dHJpYnV0ZSB0b1xuXHRcdFx0XHR0ZWxsIFNhcHBlciB0byBsb2FkIHRoZSBkYXRhIGZvciB0aGUgcGFnZSBhcyBzb29uIGFzXG5cdFx0XHRcdHRoZSB1c2VyIGhvdmVycyBvdmVyIHRoZSBsaW5rIG9yIHRhcHMgaXQsIGluc3RlYWQgb2Zcblx0XHRcdFx0d2FpdGluZyBmb3IgdGhlICdjbGljaycgZXZlbnQgLS0+XG5cdFx0PGxpPjxhIHJlbD0ncHJlZmV0Y2gnIGhyZWY9J2Jsb2cve3Bvc3Quc2x1Z30nPntwb3N0LnRpdGxlfTwvYT48L2xpPlxuXHR7L2VhY2h9XG48L3VsPiIsIjxzY3JpcHQgY29udGV4dD1cIm1vZHVsZVwiPlxuXHRleHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJlbG9hZCh7IHBhcmFtcywgcXVlcnkgfSkge1xuXHRcdC8vIHRoZSBgc2x1Z2AgcGFyYW1ldGVyIGlzIGF2YWlsYWJsZSBiZWNhdXNlXG5cdFx0Ly8gdGhpcyBmaWxlIGlzIGNhbGxlZCBbc2x1Z10uc3ZlbHRlXG5cdFx0Y29uc3QgcmVzID0gYXdhaXQgdGhpcy5mZXRjaChgYmxvZy8ke3BhcmFtcy5zbHVnfS5qc29uYCk7XG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG5cblx0XHRpZiAocmVzLnN0YXR1cyA9PT0gMjAwKSB7XG5cdFx0XHRyZXR1cm4geyBwb3N0OiBkYXRhIH07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZXJyb3IocmVzLnN0YXR1cywgZGF0YS5tZXNzYWdlKTtcblx0XHR9XG5cdH1cbjwvc2NyaXB0PlxuXG48c2NyaXB0PlxuXHRleHBvcnQgbGV0IHBvc3Q7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXHQvKlxuXHRcdEJ5IGRlZmF1bHQsIENTUyBpcyBsb2NhbGx5IHNjb3BlZCB0byB0aGUgY29tcG9uZW50LFxuXHRcdGFuZCBhbnkgdW51c2VkIHN0eWxlcyBhcmUgZGVhZC1jb2RlLWVsaW1pbmF0ZWQuXG5cdFx0SW4gdGhpcyBwYWdlLCBTdmVsdGUgY2FuJ3Qga25vdyB3aGljaCBlbGVtZW50cyBhcmVcblx0XHRnb2luZyB0byBhcHBlYXIgaW5zaWRlIHRoZSB7e3twb3N0Lmh0bWx9fX0gYmxvY2ssXG5cdFx0c28gd2UgaGF2ZSB0byB1c2UgdGhlIDpnbG9iYWwoLi4uKSBtb2RpZmllciB0byB0YXJnZXRcblx0XHRhbGwgZWxlbWVudHMgaW5zaWRlIC5jb250ZW50XG5cdCovXG5cdC5jb250ZW50IDpnbG9iYWwoaDIpIHtcblx0XHRmb250LXNpemU6IDEuNGVtO1xuXHRcdGZvbnQtd2VpZ2h0OiA1MDA7XG5cdH1cblxuXHQuY29udGVudCA6Z2xvYmFsKHByZSkge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XG5cdFx0Ym94LXNoYWRvdzogaW5zZXQgMXB4IDFweCA1cHggcmdiYSgwLDAsMCwwLjA1KTtcblx0XHRwYWRkaW5nOiAwLjVlbTtcblx0XHRib3JkZXItcmFkaXVzOiAycHg7XG5cdFx0b3ZlcmZsb3cteDogYXV0bztcblx0fVxuXG5cdC5jb250ZW50IDpnbG9iYWwocHJlKSA6Z2xvYmFsKGNvZGUpIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0XHRwYWRkaW5nOiAwO1xuXHR9XG5cblx0LmNvbnRlbnQgOmdsb2JhbCh1bCkge1xuXHRcdGxpbmUtaGVpZ2h0OiAxLjU7XG5cdH1cblxuXHQuY29udGVudCA6Z2xvYmFsKGxpKSB7XG5cdFx0bWFyZ2luOiAwIDAgMC41ZW0gMDtcblx0fVxuPC9zdHlsZT5cblxuPHN2ZWx0ZTpoZWFkPlxuXHQ8dGl0bGU+e3Bvc3QudGl0bGV9PC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cbjxoMT57cG9zdC50aXRsZX08L2gxPlxuXG48ZGl2IGNsYXNzPSdjb250ZW50Jz5cblx0e0BodG1sIHBvc3QuaHRtbH1cbjwvZGl2PlxuIiwiPHNjcmlwdD5cbmltcG9ydCB7IG9uTW91bnQsIGFmdGVyVXBkYXRlLCB0aWNrICB9IGZyb20gJ3N2ZWx0ZSc7XG5cbmV4cG9ydCBsZXQgdG9nZ2xlO1xuZXhwb3J0IGxldCBoYW1idXJnZXI7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG5Aa2V5ZnJhbWVzIGxlYXZlU2NyZWVuIHtcbiAgMTAwJXtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoOTk5OXB4KVxuICB9XG59XG5cbiN0b2dnbGUge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uaGFtYnVyZ2VyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgYm9yZGVyLWJvdHRvbTogMi4ycHggc29saWQgYmxhY2s7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgd2lkdGg6IDI0cHg7XG4gIGhlaWdodDogMjJweDtcbiAgdHJhbnNpdGlvbjogd2lkdGggLjQ1cyBjdWJpYy1iZXppZXIoMC44NSwgMC4wOCwgMC4wOCwgMC45OSk7XG59XG5cbi5oYW1idXJnZXI6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICcnO1xuICBkaXNwbGF5OiBibG9jaztcbiAgYm9yZGVyLWJvdHRvbTogMi41cHggc29saWQgYmxhY2s7XG4gIHdpZHRoOiAxOHB4O1xuICB0cmFuc2l0aW9uOiB3aWR0aCAuNDVzIGN1YmljLWJlemllcigwLjg1LCAwLjA4LCAwLjA4LCAwLjk5KTtcbn1cblxuLmhhbWJ1cmdlcjo6YWZ0ZXIge1xuICBjb250ZW50OiAnJztcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJvcmRlci1ib3R0b206IDIuMnB4IHNvbGlkIGJsYWNrO1xuICB3aWR0aDogMzJweDtcbn1cblxuLmJhY2tncm91bmQge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMzE5KTtcbiAgb3BhY2l0eTogMDtcbiAgd2lkdGg6IDEwMHZ3O1xuICBoZWlnaHQ6IDEwMHZoO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgei1pbmRleDogMTtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAuMzVzIGVhc2UtaW47XG4gIGFuaW1hdGlvbjogLjAxcyBlYXNlLWluIC4zNXMgMSBsZWF2ZVNjcmVlbiBmb3J3YXJkcztcbn1cblxuI3RvZ2dsZTpob3ZlciArIC5iYWNrZ3JvdW5kICsgbGFiZWwgPiAuaGFtYnVyZ2VyIHtcbiAgd2lkdGg6IDMycHg7XG59XG5cbiN0b2dnbGU6Y2hlY2tlZCArIC5iYWNrZ3JvdW5kICsgbGFiZWwgPiAuaGFtYnVyZ2VyIHtcbiAgd2lkdGg6IDMycHg7XG59XG5cbiN0b2dnbGU6aG92ZXIgKyAuYmFja2dyb3VuZCArIGxhYmVsID4gLmhhbWJ1cmdlcjo6YmVmb3JlIHtcbiAgd2lkdGg6IDMycHg7XG59XG5cbiN0b2dnbGU6Y2hlY2tlZCArIC5iYWNrZ3JvdW5kICsgbGFiZWwgPiAuaGFtYnVyZ2VyOjpiZWZvcmUge1xuICB3aWR0aDogMzJweDtcbn1cblxuI3RvZ2dsZTpjaGVja2VkICsgLmJhY2tncm91bmQge1xuICBvcGFjaXR5OiAxO1xuICB6LWluZGV4OiAxO1xuICBhbmltYXRpb246IHVuc2V0O1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgbGFiZWwge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cblxuLnNob3ctZm9yLXNyIHtcbiAgYm9yZGVyOiAwO1xuICBjbGlwOiByZWN0KDFweCwgMXB4LCAxcHgsIDFweCk7XG4gIGNsaXAtcGF0aDogaW5zZXQoNTAlKTtcbiAgaGVpZ2h0OiAxcHg7XG4gIG1hcmdpbjogLTFweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcGFkZGluZzogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMXB4O1xuICB3b3JkLXdyYXA6IG5vcm1hbCAhaW1wb3J0YW50O1xufVxuXG48L3N0eWxlPlxuXG48aW5wdXQgaWQ9XCJ0b2dnbGVcIiB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImhpZGUgc3VibmF2LXRvZ2dsZSBoaWRlLWZvci14bGdcIj5cbjxkaXYgY2xhc3M9XCJiYWNrZ3JvdW5kXCIgb246Y2xpY2s+PC9kaXY+XG48bGFiZWwgaWQ9XCJuYXYtbGFiZWxcIiBiaW5kOnRoaXM9e2hhbWJ1cmdlcn0gZm9yPVwidG9nZ2xlXCIgY2xhc3M9XCJoaWRlLWZvci14bGdcIj5cbiAgICA8c3BhbiBjbGFzcz1cInNob3ctZm9yLXNyXCI+TmF2aWdhdGlvbjwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cImhhbWJ1cmdlclwiIHRpdGxlPVwiTmF2aWdhdGlvblwiPiA8L3NwYW4+XG48L2xhYmVsPiIsIjxzY3JpcHQ+XG4gICAgaW1wb3J0IHsgY3JlYXRlRXZlbnREaXNwYXRjaGVyIH0gZnJvbSAnc3ZlbHRlJztcbiAgICBpbXBvcnQgeyBmYWRlLCBmbHkgfSBmcm9tICdzdmVsdGUvdHJhbnNpdGlvbic7XG5cbiAgICBleHBvcnQgbGV0IHNob3dNb2RhbFxuICAgIFxuICAgIGNvbnN0IGRpc3BhdGNoID0gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCk7XG4gICAgXG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG4gICAgLm1vZGFsLWNvbnRhaW5lcntcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuXHRcdHRvcDogMDtcblx0XHRsZWZ0OiAwO1xuXHRcdHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHotaW5kZXg6IDUwO1xuICAgIH1cblx0Lm1vZGFsLWJhY2tncm91bmQge1xuXHRcdHBvc2l0aW9uOiBmaXhlZDtcblx0XHR0b3A6IDA7XG5cdFx0bGVmdDogMDtcblx0XHR3aWR0aDogMTAwJTtcblx0XHRoZWlnaHQ6IDEwMCU7XG5cdFx0ei1pbmRleDogLTE7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC4zKTtcblx0fVxuXG5cdC5jb250YWluZXJ7XG5cdFx0d2lkdGg6IDEwMCU7XG5cdFx0aGVpZ2h0OiAxMDAlO1xuXHR9XG5cblx0Lm1vZGFsIHtcbiAgICAgICAgd2lkdGg6IGNhbGMoMTAwdncgLSA0ZW0pO1xuICAgICAgICB3aWR0aDogODAlO1xuXHRcdG1heC13aWR0aDogNjUwcHg7XG5cdFx0bWF4LWhlaWdodDogOTB2aDtcblx0XHRvdmVyZmxvdzogYXV0bztcblx0XHRib3JkZXItcmFkaXVzOiAxMHJlbTtcbiAgICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICAgIHotaW5kZXg6IDUwO1xuICAgIH1cbiAgICBcblx0QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG5cdFx0Lm1vZGFsIHtcblx0XHRcdG1heC1oZWlnaHQ6IDQ1MHB4O1xuXHRcdFx0bWF4LXdpZHRoOiA2MDBweDtcblx0XHRcdHdpZHRoOiA4NSU7XG5cdFx0fVxuICAgIH1cblxuXHRAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcblx0XHQubW9kYWwge1xuXHRcdFx0d2lkdGg6IDcwJTtcblx0XHRcdG1heC13aWR0aDogNzUwcHg7XG5cdFx0fVxuICAgIH1cbiAgICBcblx0YnV0dG9uIHtcblx0XHRkaXNwbGF5OiBibG9jaztcbiAgICB9ICAgXG4gICAgXG48L3N0eWxlPlxuXG48ZGl2IGNsYXNzPSdjZW50ZXItYWxsIG1vZGFsLWNvbnRhaW5lciB7c2hvd01vZGFsID8gJ3Nob3ctbW9kYWwnIDogJyd9JyBpbjpmYWRlIG91dDpmYWRlID5cbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYmFja2dyb3VuZFwiIG9uOmNsaWNrPjwvZGl2PlxuXHQ8ZGl2IGNsYXNzPSdtb2RhbCcgaW46Zmx5PVwie3sgeTogLTIwLCBkdXJhdGlvbjogNDUwLCBkZWxheTogMjAwLCB9fVwiIG91dDpmbHk9XCJ7eyB5OiAtMjAsIGR1cmF0aW9uOiA0NTAgfX1cIj5cblx0XHQ8c2xvdCBuYW1lPSdoZWFkZXInPjwvc2xvdD5cblx0XHQ8c2xvdD48L3Nsb3Q+XG5cdDwvZGl2PlxuPC9kaXY+IiwiPHNjcmlwdD5cbiAgICBpbXBvcnQgeyBmYWRlLCBmbHkgfSBmcm9tICdzdmVsdGUvdHJhbnNpdGlvbic7XG5cblx0aW1wb3J0IE1vZGFsVGVtcGxhdGUgZnJvbSAnLi9Nb2RhbFRlbXBsYXRlLnN2ZWx0ZSc7XG4gICAgaW1wb3J0IEJveExvYWRlciBmcm9tICcuLi9sb2FkZXJzL0JveExvYWRlci5zdmVsdGUnO1xuXG4gICAgZXhwb3J0IGxldCBzaG93TW9kYWw7XG5cbiAgICBsZXQgaGlkZU1vZGFsID0gZmFsc2U7XG4gICAgbGV0IGZpZWxkSW5wdXRzID0gW107XG5cbiAgICBsZXQgZm9ybVN0YXRlID0ge1xuICAgICAgICBzdWJtaXR0aW5nRm9ybTogZmFsc2UsXG4gICAgICAgIGZvcm1TdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZm9ybUVycm9yOiBmYWxzZSxcbiAgICAgICAgaGlkZUZpZWxkczogZmFsc2VcbiAgICB9XG5cbiAgICBsZXQgZGVmYXVsdEZvcm1TdGF0ZSA9IGZvcm1TdGF0ZTtcblxuICAgIGZ1bmN0aW9uIHJlc2V0Rm9ybSh3YWl0KXtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7ICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBzdGF0ZU9iaiA9IE9iamVjdC5lbnRyaWVzKGZvcm1TdGF0ZSk7XG5cbiAgICAgICAgICAgIGZvcihjb25zdCBbc3RhdGVLZXksIHN0YXRlVmFsdWVdIG9mIHN0YXRlT2JqKXtcbiAgICAgICAgICAgICAgICBmb3JtU3RhdGVbc3RhdGVLZXldID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpZWxkSW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIHdhaXQpXG4gICAgfVxuICAgIFxuICAgIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChlKXtcbiAgICAgICAgZm9ybVN0YXRlLnN1Ym1pdHRpbmdGb3JtID0gdHJ1ZTtcbiAgICAgICAgZm9ybVN0YXRlLmhpZGVGaWVsZHMgPSB0cnVlXG4gICAgICAgIGZvcm1TdGF0ZS5mb3JtU3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBmb3JtRmllbGROYW1lcyA9IFsnbmFtZScsICdlbWFpbCcsICdtZXNzYWdlJ107IC8vIFRPRE8gLSBnZW5lcmF0ZSBmaWVsZCBuYW1lcyBiYXNlZCBvbiBpbnB1dHNcbiAgICAgICAgY29uc3QgZm9ybVRleHRPYmogPSBidWlsZEZvcm1TdWJtaXNzaW9uVGV4dE9iaihlLnRhcmdldCwgZm9ybUZpZWxkTmFtZXMpO1xuXG4gICAgICAgIGNvbnN0IEFQSV9VUkwgPSBgaHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J5ZklSWEVlcW5MUFZxNHMyaEdfYjM1bG1jbTJGQ243NjhRV0M5V2ZnL2V4ZWNgO1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IHsgXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IGZvcm1UZXh0T2JqLFxuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goQVBJX1VSTCwgc2V0dGluZ3MpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIGZvcm1TdGF0ZS5zdWJtaXR0aW5nRm9ybSA9IGZhbHNlO1xuICAgICAgICAgICAgZm9ybVN0YXRlLmZvcm1TdWNjZXNzID0gdHJ1ZTtcblxuICAgICAgICAgICAgcmVzZXRGb3JtKDE2MDApOyAgICAgICBcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZm9ybVN0YXRlLnN1Ym1pdHRpbmdGb3JtID0gZmFsc2U7XG4gICAgICAgICAgICBmb3JtU3RhdGUuZm9ybUVycm9yID0gdHJ1ZTtcblxuICAgICAgICAgICAgcmVzZXRGb3JtKDE2MDApOyAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1aWxkRm9ybVN1Ym1pc3Npb25UZXh0T2JqKGZvcm1FdmVudFRhcmdldCwgZm9ybUZpZWxkTmFtZXMpe1xuICAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgIFxuICAgICAgICBmb3JtRmllbGROYW1lcy5mb3JFYWNoKGZpZWxkTmFtZSA9PiB7XG4gICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChgJHtmaWVsZE5hbWV9YCwgYCR7Zm9ybUV2ZW50VGFyZ2V0W2ZpZWxkTmFtZV0udmFsdWV9YCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIGZvcm1EYXRhXG4gICAgfVxuXG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG4gICAudGV4dC1jb250YWluZXIgaDJ7XG4gICAgICAgIGZvbnQtc2l6ZTogMzByZW07XG4gICAgICAgIGNvbG9yOiAjODA4MDgwO1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0ZW0pe1xuICAgICAgICAudGV4dC1jb250YWluZXIgaDJ7XG4gICAgICAgICAgICBmb250LXNpemU6IDM2cmVtOyAgIFxuICAgICAgICB9XG4gICAgfVxuICAgIC50ZXh0LWNvbnRhaW5lciBoMjo6YWZ0ZXJ7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgaGVpZ2h0OiA3cHg7XG4gICAgICAgIG1hcmdpbjogNXJlbSAwcHggMThyZW0gMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kOiBsaWdodGdyYXk7XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgICAgIGgyOjphZnRlciB7XG4gICAgICAgICAgICB3aWR0aDogMjUwcHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwe1xuICAgICAgICBtYXJnaW46IDZyZW0gMHJlbSAxMHJlbSAwcmVtO1xuICAgICAgICBmb250LWZhbWlseTogJ09wZW4gU2FucycsIHNhbnMtc2VyaWY7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMTNyZW07XG4gICAgICAgIGNvbG9yOiAjNTg1OTViXG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSl7XG4gICAgICAgIHAge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNnJlbVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGl2LmZvcm0tY29udGFpbmVye1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBjb2xvcjogZ3JheTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgcGFkZGluZzogMTVyZW0gMjByZW0gNDByZW0gMjByZW07XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XG4gICAgICAgIGJveC1zaGFkb3c6IDVweCA1cHggNXB4IGxpZ2h0Z3JheTtcbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgZGl2LmZvcm0tY29udGFpbmVyIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDMwcmVtIDIwcmVtIDQwcmVtIDIwcmVtO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSl7XG4gICAgICAgIGRpdi5mb3JtLWNvbnRhaW5lciB7XG4gICAgICAgICAgICBwYWRkaW5nOiA0MHJlbSAzMHJlbSA1MHJlbSAzMHJlbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpdi5mbGV4LWNvbnRhaW5lcntcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB9IFxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgICAgIGRpdi5mbGV4LWNvbnRhaW5lciB7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGl2LnRleHQtY29udGFpbmVyIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICBkaXYudGV4dC1jb250YWluZXIge1xuICAgICAgICAgICAgdG9wOiAtMjBweDtcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDMwcmVtO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGl2e1xuICAgICAgICBmbGV4OiA1NSU7XG4gICAgfVxuXG4gICAgZm9ybXtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgZmxleDogNTAlO1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IGF1dG87XG4gICAgfVxuICAgIGxhYmVse1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBtYXJnaW46IDRyZW0gMHB4O1xuICAgIH1cbiAgICBzcGFue1xuICAgICAgICBmb250LXNpemU6IDEzcmVtO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiA1cmVtO1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0ZW0pe1xuICAgICAgICBzcGFuIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRyZW07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dFt0eXBlPVwic3VibWl0XCJde1xuICAgICAgICB3aWR0aDogNTAlO1xuICAgICAgICBtaW4td2lkdGg6IDk2cHg7XG4gICAgICAgIG1hcmdpbi10b3A6IDEycmVtO1xuICAgICAgICBwYWRkaW5nOiA2cmVtO1xuICAgICAgICBmb250LXNpemU6IDEzcmVtO1xuICAgICAgICBib3gtc2hhZG93OiAxcHggMXB4IDNweCBsaWdodGdyZXk7XG4gICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICAgYmFja2dyb3VuZDogcmdiYSg4OCwgODksIDkxLCAwLjEpO1xuICAgICAgICBjb2xvcjogIzU4NTk1QjtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIC4zcyBlYXNlLWluO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuXG4gICAgaW5wdXRbdHlwZT1cInN1Ym1pdFwiXTpob3ZlciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xcHgpO1xuICAgICAgICBib3gtc2hhZG93OiAycHggMnB4IDNweCBsaWdodGdyZXk7XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgICAgIGlucHV0W3R5cGU9XCJzdWJtaXRcIl17XG4gICAgICAgICAgICBtYXgtd2lkdGg6IHVuc2V0O1xuICAgICAgICAgICAgcGFkZGluZzogN3JlbSAxNXJlbSA3cmVtIDE1cmVtO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSl7XG4gICAgICAgIGlucHV0W3R5cGU9XCJzdWJtaXRcIl17XG4gICAgICAgICAgICBmb250LXNpemU6IDEzcmVtO1xuICAgICAgICAgICAgYm94LXNoYWRvdzogMTtcbiAgICAgICAgICAgIHdpZHRoOiBmaXQtY29udGVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpdi5jb250YWN0LXJvd3tcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIH1cbiAgICBpbnB1dCwgdGV4dGFyZWF7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICBmb250LXNpemU6IDE2cmVtO1xuICAgICAgICBwYWRkaW5nOiAzcmVtO1xuICAgICAgICBib3gtc2hhZG93OiAuM3B4IC4zcHggLjNweCBncmF5O1xuICAgIH1cblxuICAgIC5zdWNjZXNzLW1lc3NhZ2Uge1xuICAgICAgICBmb250LXNpemU6IDUwcmVtO1xuICAgICAgICBjb2xvcjogIzU4NTk1YjtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gICAgICAgIGxlZnQ6IDUwJTtcbiAgICB9XG5cbiAgICAuZ2Zvcm0sIC50ZXh0LWNvbnRhaW5lciwgLnN1Y2Nlc3MtbWVzc2FnZSB7XG4gICAgICAgIHRyYW5zaXRpb246IC4zNXMgb3BhY2l0eSBlYXNlO1xuICAgIH1cbiAgICAuaGlkZS1jb250ZW50e1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbjwvc3R5bGU+XG5cbnsjaWYgc2hvd01vZGFsICYmIGhpZGVNb2RhbCA9PT0gZmFsc2V9XG5cdDxNb2RhbFRlbXBsYXRlIHNob3dNb2RhbD17c2hvd01vZGFsfSBvbjpjbGljaz5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY29udGFpbmVyIHtmb3JtU3RhdGUuaGlkZUZpZWxkcyA/ICdoaWRlLWNvbnRlbnQnIDogJyd9IHtmb3JtU3RhdGUuaGlkZUZpZWxkcyA/ICdoaWRlLWNvbnRlbnQnIDogJyd9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDI+R2V0IEluIFRvdWNoPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhpIFRoZXJlISBJ4oCZbSBKb3NoLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJIGJyaW5nIHByb2plY3RzIHRvIGxpZmUgYnkgaW5ub3ZhdGluZyBhY3Jvc3MgZXZlcnkgYXNwZWN0IG9mIHRoZSBjdXN0b21lciBqb3VybmV5LiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZW5kIG1lIGEgbWVzc2FnZSBpZiB5b3UgYXJlIGxvb2tpbmcgdG8gaGlyZSBhIGRldmVsb3BlciwgY29sbGFib3JhdGUgb24gYSBwcm9qZWN0LCBvciBoYXZlIGEgcG90ZW50aWFsIGJ1c2luZXNzIG9wcG9ydHVuaXR5LlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm0gXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImdmb3JtIHtmb3JtU3RhdGUuaGlkZUZpZWxkcyA/ICdoaWRlLWNvbnRlbnQnIDogJyd9XG4gICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybVN0YXRlLmZvcm1TdWNjZXNzID8gJ2hpZGUtY29udGVudCcgOiAnJ31cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb246c3VibWl0fHByZXZlbnREZWZhdWx0PXtoYW5kbGVTdWJtaXR9ICBcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPiA8c3Bhbj5OYW1lPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBiaW5kOnRoaXM9e2ZpZWxkSW5wdXRzWzBdfSBuYW1lPVwibmFtZVwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPiA8c3Bhbj5FbWFpbDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgYmluZDp0aGlzPXtmaWVsZElucHV0c1sxXX0gcmVxdWlyZWQgbmFtZT1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPiA8c3Bhbj5NZXNzYWdlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBiaW5kOnRoaXM9e2ZpZWxkSW5wdXRzWzJdfSBuYW1lPVwibWVzc2FnZVwiIHJvd3M9XCI2XCIgdHlwZT1cInRleHRhcmVhXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU2VuZCBNZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cblxuICAgICAgICAgICAgICAgIHsjaWYgZm9ybVN0YXRlLnN1Ym1pdHRpbmdGb3JtfVxuICAgICAgICAgICAgICAgICAgICA8Qm94TG9hZGVyIC8+XG4gICAgICAgICAgICAgICAgey9pZn1cbiAgICAgICAgICAgICAgICB7I2lmIGZvcm1TdGF0ZS5mb3JtU3VjY2Vzc31cbiAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwic3VjY2Vzcy1tZXNzYWdlXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICBpbjpmbHk9XCJ7eyB5OiAyMCwgZHVyYXRpb246IDUwMCwgZGVsYXk6IDIwMCwgfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0OmZseT1cInt7IHk6IC0yMCwgZHVyYXRpb246IDUwMCwgZGVsYXk6IDAsIH19XCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgU1VDQ0VTU1xuICAgICAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgICAgICAgICAgeyNpZiBmb3JtU3RhdGUuZm9ybUVycm9yfVxuICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJzdWNjZXNzLW1lc3NhZ2VcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIGluOmZseT1cInt7IHk6IDIwLCBkdXJhdGlvbjogNTAwLCBkZWxheTogMjAwLCB9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQ6Zmx5PVwie3sgeTogLTIwLCBkdXJhdGlvbjogNTAwLCBkZWxheTogMCwgfX1cIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBFUlJPUlxuICAgICAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cdDwvTW9kYWxUZW1wbGF0ZT5cbnsvaWZ9IiwiPHNjcmlwdD5cbmltcG9ydCBIYW1idXJnZXIgZnJvbSAnLi9IYW1idXJnZXIuc3ZlbHRlJztcbmltcG9ydCBDb250YWN0TW9kYWwgZnJvbSAnLi4vbW9kYWxzL0NvbnRhY3RNb2RhbC5zdmVsdGUnO1xuXG5pbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJztcblxubGV0IHNob3dNb2RhbDtcblxubGV0IHdpbmRvd1k7XG5sZXQgaGFtYnVyZ2VyO1xubGV0IHRvZ2dsZSA9IGZhbHNlO1xuXG5sZXQgcmVkdWNlTmF2U2l6ZSA9IGZhbHNlO1xuXG4kOiBoZWFkZXJDbGFzcyA9IG5hdlNpemUod2luZG93WSk7XG5cbmZ1bmN0aW9uIG5hdlNpemUoeSl7XG4gICAgaWYoeSA+IDc1KXtcbiAgICAgICAgcmVkdWNlTmF2U2l6ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVkdWNlTmF2U2l6ZSA9IGZhbHNlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdG9nZ2xlck9mZigpe1xuICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoIDwgMTAyMyl7XG4gICAgICAgIGhhbWJ1cmdlciA/IGhhbWJ1cmdlci4kJC5jdHguaGFtYnVyZ2VyLmNsaWNrKCkgOiBudWxsO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gb3Blbk1vZGFsKCl7XG4gICAgc2hvd01vZGFsID0gdHJ1ZTtcbn1cblxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuaGVhZGVyIHtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Q2ZDZkNjtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgdG9wOiAwO1xuICAgIHotaW5kZXg6IDUwO1xuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xufVxuXG5uYXYge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMzByZW0gMjByZW07XG4gICAgdHJhbnNpdGlvbjogYWxsIC40NXMgY3ViaWMtYmV6aWVyKDAuODUsIDAuMDgsIDAuMDgsIDAuOTkpO1xufVxuXG5uYXYuc2Nyb2xsZWQge1xuICAgIHBhZGRpbmc6IDIwcmVtIDIwcmVtO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKSB7XG4gICAgbmF2IHtcbiAgICAgICAgcGFkZGluZzogMzVyZW0gNDByZW07XG4gICAgfVxuICAgIG5hdi5zY3JvbGxlZCB7XG4gICAgICAgIHBhZGRpbmc6IDIwcmVtIDQwcmVtO1xuICAgIH1cbn1cblxudWwubmF2aWdhdGlvbiB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB6LWluZGV4OiAyO1xuICAgIHdpZHRoOiAyNTBweDtcbiAgICByaWdodDogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XG4gICAgYm90dG9tOiAwO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBwYWRkaW5nOiAwcmVtIDIwcmVtO1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcyBjdWJpYy1iZXppZXIoMC44NSwgMC4wOCwgMC4wOCwgMC45OSk7XG59XG5cbiN0b2dnbGU6Y2hlY2tlZCB+IHVsLm5hdmlnYXRpb257XG4gICAgZGlzcGxheTogZmxleDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pIHtcbiAgICB1bC5uYXZpZ2F0aW9uIHtcbiAgICAgICAgcGFkZGluZzogMHJlbSA0MHJlbTtcbiAgICB9XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0ZW0pIHtcbiAgICB1bC5uYXZpZ2F0aW9ue1xuICAgICAgICB0cmFuc2Zvcm06IHVuc2V0OyAgIFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIHdpZHRoOiB1bnNldDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICB9XG59XG5cbmxpIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgcGFkZGluZzogNXJlbSAwcmVtO1xuICAgIHdpZHRoOiBhdXRvO1xuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgICBmb250LXNpemU6IDE0cmVtO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICBsaSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTZyZW07XG4gICAgICAgIG1hcmdpbjogMHJlbSAyMHJlbTtcbiAgICAgICAgcGFkZGluZzogMi41cmVtIDA7XG4gICAgfVxuICAgIHB7XG4gICAgICAgIGZvbnQtc2l6ZTogMThyZW07XG4gICAgfVxufVxuXG5saTpub3QoLmNsb3NlLWNvbnRhaW5lcik6OmFmdGVyLCAuYWN0aXZlOjphZnRlciB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xuICAgIGJvdHRvbTogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBvcGFjaXR5OiAxO1xuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjM0IzQjNCO1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuNDVzIGN1YmljLWJlemllcigwLjg1LCAwLjA4LCAwLjA4LCAwLjk5KTtcbn1cblxubGk6bm90KC5jbG9zZS1jb250YWluZXIpOmhvdmVyOjphZnRlciwgLmFjdGl2ZTo6YWZ0ZXIge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcbn1cblxuLmNsb3NlLWNvbnRhaW5lciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNTByZW07XG4gICAgcmlnaHQ6IDUwcmVtO1xuICAgIG92ZXJmbG93OiB1bnNldDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgIC5jbG9zZS1jb250YWluZXIge1xuICAgICAgICByaWdodDogNzByZW07XG4gICAgfVxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICAuY2xvc2UtY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG59XG5cbi5jbG9zZSB7XG4gICAgd2lkdGg6MzJweDtcbiAgICBoZWlnaHQ6MzJweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLmNsb3NlOjpiZWZvcmUge1xuICBjb250ZW50OiAnJztcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIGJsYWNrO1xuICB3aWR0aDogMzJweDtcbiAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xufVxuXG4uY2xvc2U6OmFmdGVyIHtcbiAgY29udGVudDogJyc7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCBibGFjaztcbiAgd2lkdGg6IDMycHg7XG4gIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG59XG5cbmE6bm90KC5sb2dvKSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcGFkZGluZzogNXJlbSAwcmVtO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbnB7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG4uY29kZSB7XG4gICAgZm9udC13ZWlnaHQ6IDEwMDtcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgb3BhY2l0eTogLjM7XG59XG5cbi5sb2dvLWhvdmVyIHtcbiAgICB0cmFuc2l0aW9uOiBhbGwgLjNzIGVhc2UtaW47XG59XG5cbi5sb2dvOmhvdmVyIC5sb2dvLWhvdmVyIHtcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgXG59XG5cbjwvc3R5bGU+XG5cbjxzdmVsdGU6d2luZG93IGJpbmQ6c2Nyb2xsWT17d2luZG93WX0vPlxuXG48aGVhZGVyPlxuICAgIDxuYXYgY2xhc3M9e3JlZHVjZU5hdlNpemUgPyAnc2Nyb2xsZWQgY29udGFpbmVyJyA6ICdjb250YWluZXInfT5cbiAgICAgICAgPGEgaHJlZj0nLycgY2xhc3M9XCJsb2dvXCI+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvZGVcIj4mbHQ7aDEmZ3Q7PC9zcGFuPkhpIFRoZXJlPHNwYW4gY2xhc3M9XCJsb2dvLWhvdmVyXCI+ITwvc3Bhbj48c3BhbiBjbGFzcz1cImNvZGVcIj4mbHQ7L2gxJmd0Ozwvc3Bhbj5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9hPlxuICAgICAgICA8SGFtYnVyZ2VyIG9uOmNsaWNrPXt0b2dnbGVyT2ZmfSB0b2dnbGU9e3RvZ2dsZX0gYmluZDp0aGlzPXtoYW1idXJnZXJ9IC8+XG4gICAgICAgIDx1bCBjbGFzcz1cIm5hdmlnYXRpb25cIj5cbiAgICAgICAgICAgIDxsaSBjbGFzcz1cImNsb3NlLWNvbnRhaW5lclwiIG9uOmNsaWNrPXt0b2dnbGVyT2ZmfSA+PHNwYW4gY2xhc3M9XCJjbG9zZVwiPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgPGxpPjxhIGNsYXNzPVwiXCIgb246Y2xpY2s9e3RvZ2dsZXJPZmZ9IHJlbD1wcmVmZXRjaCBocmVmPVwiL1wiPkhvbWU8L2E+PC9saT5cbiAgICAgICAgICAgIDxsaT48YSBvbjpjbGljaz17dG9nZ2xlck9mZn0gcmVsPXByZWZldGNoIGhyZWY9XCIvYWJvdXRcIj5BYm91dDwvYT48L2xpPlxuICAgICAgICAgICAgPGxpPjxhIG9uOmNsaWNrPXt0b2dnbGVyT2ZmfSBocmVmPVwiL2V4cGVyaWVuY2VcIj5FeHBlcmllbmNlPC9hPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGEgb246Y2xpY2s9e29wZW5Nb2RhbH0gaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPkNvbnRhY3Q8L2E+PC9saT5cbiAgICAgICAgPC91bD5cbiAgICA8L25hdj5cbjwvaGVhZGVyPlxuXG48Q29udGFjdE1vZGFsIG9uOmNsaWNrPXsoKSA9PiBzaG93TW9kYWwgPSBmYWxzZX0gc2hvd01vZGFsPXtzaG93TW9kYWx9Lz4iLCI8c2NyaXB0PlxuaW1wb3J0IFRleHRBbmltYXRpb24gZnJvbSAnLi4vaGVscGVyLWNvbXBvbmVudHMvVGV4dEFuaW1hdGlvbi5zdmVsdGUnO1xuXG48L3NjcmlwdD5cblxuPHN0eWxlPlxuZm9vdGVyIHtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2Q2ZDZkNjtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICBjb2xvcjogIzNCM0IzQjtcbn1cblxuLmZvb3Rlci1jb250YWluZXIge1xuICAgIG1hcmdpbi10b3A6IDQwcHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHBhZGRpbmctYm90dG9tOiAwO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAuZm9vdGVyLWNvbnRhaW5lciB7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgfVxufVxuXG4ubGVmdCwgLnJpZ2h0IHtcbiAgICBtYXJnaW4tYm90dG9tOiA1NXJlbTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgLmxlZnQsIC5yaWdodCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDYwcmVtO1xuICAgIH1cbiAgICAuYm90dG9tLXJvdyB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgfVxuICAgIC5sZWZ0LCAuY29weXJpZ2h0e1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiA4MHJlbTtcbiAgICAgICAgd2lkdGg6IDYwJTtcbiAgICB9XG4gICAgLnJpZ2h0IHtcbiAgICAgICAgcGFkZGluZy10b3A6IDIwcmVtO1xuICAgIH1cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSl7XG4gICAgLmxlZnQsIC5jb3B5cmlnaHQge1xuICAgICAgICB3aWR0aDogNTAlO1xuICAgIH1cbiAgICAubGVmdCwgLnJpZ2h0IHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNzByZW07XG4gICAgfVxufVxuXG4udGV4dC1jdGE6Zmlyc3Qtb2YtdHlwZSB7XG4gICAgbWFyZ2luLWJvdHRvbTogMjByZW07XG59XG5cbi5oZWFkbGluZSB7XG4gICAgZm9udC1zaXplOiA0MHB4O1xuICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsICdSb2JvdG8nLCAnT3h5Z2VuJywgJ1VidW50dScsICdGaXJhIFNhbnMnLCAnRHJvaWQgU2FucycsICdIZWx2ZXRpY2EgTmV1ZScsIHNhbnMtc2VyaWY7XG4gICAgbGluZS1oZWlnaHQ6IDQ1cHg7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBtYXgtd2lkdGg6IDQyMHB4O1xufVxuXG4uaGVhZGxpbmUgYSB7XG4gICAgY29sb3I6ICM1ODU5NWI7XG4gICAgdHJhbnNpdGlvbjogYWxsIC40NXMgZWFzZS1pbi1vdXQ7XG4gICAgb3BhY2l0eTogLjc1O1xufVxuXG4uaGVhZGxpbmUgYTpob3ZlciB7XG4gICAgY29sb3I6IGJsYWNrO1xufVxuXG4udGl0bGUge1xuICAgIGZvbnQtd2VpZ2h0OiAxMDA7XG4gICAgZm9udC1zaXplOiAxMnJlbTtcbn1cblxuLnRleHQtY3RhIGEge1xuICAgIGZvbnQtc2l6ZTogMTRyZW07XG59XG5cbi5ib3R0b20tcm93IHtcbiAgICBwYWRkaW5nLXRvcDogMDtcbn1cblxuLmNvcHlyaWdodCB7XG4gICAgZm9udC1zaXplOiAxMnJlbTtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbn1cblxuLmxlZnQgcDpsYXN0LWNoaWxkIHtcbiAgICBjb2xvcjogIzU4NTk1YjtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgZm9udC13ZWlnaHQ6IDkwMDtcbiAgICBtYXJnaW4tdG9wOiAyNXJlbTtcbn1cblxuZGl2LnNvY2lhbC1pY29ucyB7XG4gICAgbWFyZ2luLXRvcDogOHB4O1xuICAgIG1pbi13aWR0aDogMjA2cHg7XG59XG5cbmkge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDhweDtcbiAgICBjb2xvcjogIzgwODA4MDtcbiAgICB0cmFuc2l0aW9uOiBhbGwgLjNzIGVhc2U7XG59XG5cbmE6aG92ZXIgPiBpIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XG4gICAgY29sb3I6ICM1ODU5NWI7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pIHtcbiAgICBkaXYuc29jaWFsLWljb25zIHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgIH1cbiAgICBpe1xuICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICB9XG4gICAgLmxlZnQgcDpsYXN0LWNoaWxkIHtcbiAgICAgICAgbWFyZ2luLXRvcDogNjByZW07XG4gICAgfVxuXG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0ZW0pe1xuICAgIC50aXRsZXtcbiAgICAgICAgZm9udC1zaXplOiAxNnJlbVxuICAgIH1cbiAgICAudGV4dC1jdGEgYSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMThyZW07XG4gICAgfVxuICAgIC5jb3B5cmlnaHQge1xuICAgICAgICBmb250LXNpemU6IDE0cmVtO1xuICAgIH1cbiAgICAuaGVhZGxpbmUge1xuICAgICAgICBmb250LXNpemU6IDQ1cHg7XG4gICAgICAgIG1heC13aWR0aDogNDQwcHg7XG4gICAgfVxuICAgIC5sZWZ0IHA6bGFzdC1jaGlsZCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICAgICAgbWFyZ2luLXRvcDogNzByZW07XG4gICAgfVxuICAgIGkge1xuICAgICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgfVxufVxuXG48L3N0eWxlPlxuXG48c3ZlbHRlOmhlYWQ+XG4gICAgPHNjcmlwdCBzcmM9XCJodHRwczovL2tpdC5mb250YXdlc29tZS5jb20vMTMwOTk5MGMyOS5qc1wiPjwvc2NyaXB0PlxuPC9zdmVsdGU6aGVhZD5cblxuPGZvb3Rlcj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGZvb3Rlci1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiaGVhZGxpbmVcIj5cbiAgICAgICAgICAgICAgICBGZWVsIGZyZWUgdG8gc2hvb3QgbWUgYW4gPGEgaHJlZj1cIm1haWx0bzpqb3NodWEubWljYWgucm9wZXJAZ21haWwuY29tXCI+ZW1haWw8L2E+ICYgY29ubmVjdCB0aHJvdWdoIDxhIGhyZWY9XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vanItZGV2XCIgdGFyZ2V0PVwiYmxhbmtcIj5zb2NpYWwuPC9hPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPHA+UmVhY2ggb3V0ITwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY3RhXCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICBHZXQgSW4gVG91Y2ghXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJtYWlsdG86am9zaHVhLm1pY2FoLnJvcGVyQGdtYWlsLmNvbVwiPlxuICAgICAgICAgICAgICAgICAgICA8VGV4dEFuaW1hdGlvbiB0ZXh0PXtgSm9zaHVhLm1pY2FoLnJvcGVyQGdtYWlsLmNvbWB9IC8+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jdGFcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIFZpZXcgUmVzdW1lXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIuL2ltYWdlcy9yZXN1bWUtam9zaHVhLXJvcGVyLnBkZlwiIGRvd25sb2FkPlxuICAgICAgICAgICAgICAgICAgICA8VGV4dEFuaW1hdGlvbiB0ZXh0PXtgRG93bmxvYWQgUERGYH0gLz5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImJvdHRvbS1yb3cgY29udGFpbmVyXCI+XG4gICAgICAgIFxuICAgICAgICA8cCBjbGFzcz1cImNvcHlyaWdodFwiPkAgMjAxOSBKb3NodWEgUm9wZXIgRGV2ZWxvcG1lbnQ8L3A+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzb2NpYWwtaWNvbnNcIj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL3d3dy5naXRodWIuY29tL0pyb3BlMjFcIiBhcmlhLWxhYmVsPVwibGluayB0byBKb3NodWEgUm9wZXIncyBHaXRIdWIgYWNjb3VudFwiIHRhcmdldD1cImJsYW5rXCIgPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFiIGZhLWdpdGh1YlwiPjwvaT5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vSlItZGV2XCIgYXJpYS1sYWJlbD1cImxpbmsgdG8gSm9zaHVhIFJvcGVyJ3MgTGlua2VkSW4gYWNjb3VudFwiIHRhcmdldD1cImJsYW5rXCIgPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFiIGZhLWxpbmtlZGluXCI+PC9pPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPGEgaHJlZj1cIm1haWx0bzpqb3NodWEubWljYWgucm9wZXJAZ21haWwuY29tXCIgYXJpYS1sYWJlbD1cImxpbmsgdG8gc2VuZCBKb3NodWEgUm9wZXIgYW4gZW1haWxcIiB0YXJnZXQ9XCJibGFua1wiID5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1lbnZlbG9wZVwiPjwvaT5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Zvb3Rlcj5cblxuXG4iLCI8c2NyaXB0PlxuXHRleHBvcnQgbGV0IHN0YXR1cztcblx0ZXhwb3J0IGxldCBlcnJvcjtcblxuXHRjb25zdCBkZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jztcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cdGgxLCBwIHtcblx0XHRtYXJnaW46IDAgYXV0bztcblx0fVxuXG5cdGgxIHtcblx0XHRmb250LXNpemU6IDIuOGVtO1xuXHRcdGZvbnQtd2VpZ2h0OiA3MDA7XG5cdFx0bWFyZ2luOiAwIDAgMC41ZW0gMDtcblx0fVxuXG5cdHAge1xuXHRcdG1hcmdpbjogMWVtIGF1dG87XG5cdH1cblxuXHRAbWVkaWEgKG1pbi13aWR0aDogNDgwcHgpIHtcblx0XHRoMSB7XG5cdFx0XHRmb250LXNpemU6IDRlbTtcblx0XHR9XG5cdH1cbjwvc3R5bGU+XG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPntzdGF0dXN9PC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cbjxoMT57c3RhdHVzfTwvaDE+XG5cbjxwPntlcnJvci5tZXNzYWdlfTwvcD5cblxueyNpZiBkZXYgJiYgZXJyb3Iuc3RhY2t9XG5cdDxwcmU+e2Vycm9yLnN0YWNrfTwvcHJlPlxuey9pZn1cbiIsIi8vIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgU2FwcGVyIOKAlCBkbyBub3QgZWRpdCBpdCFcbmltcG9ydCAqIGFzIHJvdXRlXzAgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9ibG9nL2luZGV4Lmpzb24uanNcIjtcbmltcG9ydCAqIGFzIHJvdXRlXzEgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9ibG9nL1tzbHVnXS5qc29uLmpzXCI7XG5pbXBvcnQgY29tcG9uZW50XzAgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9pbmRleC5zdmVsdGVcIjtcbmltcG9ydCBjb21wb25lbnRfMSBmcm9tIFwiLi4vLi4vLi4vcm91dGVzL2V4cGVyaWVuY2Uuc3ZlbHRlXCI7XG5pbXBvcnQgY29tcG9uZW50XzIgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9wcm9qZWN0cy9jcmVhdGl2ZS1yZXZvbHQuc3ZlbHRlXCI7XG5pbXBvcnQgY29tcG9uZW50XzMgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9wcm9qZWN0cy91bml2ZXJzaXR5LXBhcmsuc3ZlbHRlXCI7XG5pbXBvcnQgY29tcG9uZW50XzQgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9wcm9qZWN0cy9oYWxjeW9uLnN2ZWx0ZVwiO1xuaW1wb3J0IGNvbXBvbmVudF81IGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvYWJvdXQuc3ZlbHRlXCI7XG5pbXBvcnQgY29tcG9uZW50XzYsIHsgcHJlbG9hZCBhcyBwcmVsb2FkXzYgfSBmcm9tIFwiLi4vLi4vLi4vcm91dGVzL2Jsb2cvaW5kZXguc3ZlbHRlXCI7XG5pbXBvcnQgY29tcG9uZW50XzcsIHsgcHJlbG9hZCBhcyBwcmVsb2FkXzcgfSBmcm9tIFwiLi4vLi4vLi4vcm91dGVzL2Jsb2cvW3NsdWddLnN2ZWx0ZVwiO1xuaW1wb3J0IHJvb3QgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9fbGF5b3V0LnN2ZWx0ZVwiO1xuaW1wb3J0IGVycm9yIGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvX2Vycm9yLnN2ZWx0ZVwiO1xuXG5jb25zdCBkID0gZGVjb2RlVVJJQ29tcG9uZW50O1xuXG5leHBvcnQgY29uc3QgbWFuaWZlc3QgPSB7XG5cdHNlcnZlcl9yb3V0ZXM6IFtcblx0XHR7XG5cdFx0XHQvLyBibG9nL2luZGV4Lmpzb24uanNcblx0XHRcdHBhdHRlcm46IC9eXFwvYmxvZy5qc29uJC8sXG5cdFx0XHRoYW5kbGVyczogcm91dGVfMCxcblx0XHRcdHBhcmFtczogKCkgPT4gKHt9KVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHQvLyBibG9nL1tzbHVnXS5qc29uLmpzXG5cdFx0XHRwYXR0ZXJuOiAvXlxcL2Jsb2dcXC8oW15cXC9dKz8pLmpzb24kLyxcblx0XHRcdGhhbmRsZXJzOiByb3V0ZV8xLFxuXHRcdFx0cGFyYW1zOiBtYXRjaCA9PiAoeyBzbHVnOiBkKG1hdGNoWzFdKSB9KVxuXHRcdH1cblx0XSxcblxuXHRwYWdlczogW1xuXHRcdHtcblx0XHRcdC8vIGluZGV4LnN2ZWx0ZVxuXHRcdFx0cGF0dGVybjogL15cXC8kLyxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdHsgbmFtZTogXCJpbmRleFwiLCBmaWxlOiBcImluZGV4LnN2ZWx0ZVwiLCBjb21wb25lbnQ6IGNvbXBvbmVudF8wIH1cblx0XHRcdF1cblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0Ly8gZXhwZXJpZW5jZS5zdmVsdGVcblx0XHRcdHBhdHRlcm46IC9eXFwvZXhwZXJpZW5jZVxcLz8kLyxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdHsgbmFtZTogXCJleHBlcmllbmNlXCIsIGZpbGU6IFwiZXhwZXJpZW5jZS5zdmVsdGVcIiwgY29tcG9uZW50OiBjb21wb25lbnRfMSB9XG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdC8vIHByb2plY3RzL2NyZWF0aXZlLXJldm9sdC5zdmVsdGVcblx0XHRcdHBhdHRlcm46IC9eXFwvcHJvamVjdHNcXC9jcmVhdGl2ZS1yZXZvbHRcXC8/JC8sXG5cdFx0XHRwYXJ0czogW1xuXHRcdFx0XHRudWxsLFxuXHRcdFx0XHR7IG5hbWU6IFwicHJvamVjdHNfY3JlYXRpdmUkNDVyZXZvbHRcIiwgZmlsZTogXCJwcm9qZWN0cy9jcmVhdGl2ZS1yZXZvbHQuc3ZlbHRlXCIsIGNvbXBvbmVudDogY29tcG9uZW50XzIgfVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHQvLyBwcm9qZWN0cy91bml2ZXJzaXR5LXBhcmsuc3ZlbHRlXG5cdFx0XHRwYXR0ZXJuOiAvXlxcL3Byb2plY3RzXFwvdW5pdmVyc2l0eS1wYXJrXFwvPyQvLFxuXHRcdFx0cGFydHM6IFtcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0eyBuYW1lOiBcInByb2plY3RzX3VuaXZlcnNpdHkkNDVwYXJrXCIsIGZpbGU6IFwicHJvamVjdHMvdW5pdmVyc2l0eS1wYXJrLnN2ZWx0ZVwiLCBjb21wb25lbnQ6IGNvbXBvbmVudF8zIH1cblx0XHRcdF1cblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0Ly8gcHJvamVjdHMvaGFsY3lvbi5zdmVsdGVcblx0XHRcdHBhdHRlcm46IC9eXFwvcHJvamVjdHNcXC9oYWxjeW9uXFwvPyQvLFxuXHRcdFx0cGFydHM6IFtcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0eyBuYW1lOiBcInByb2plY3RzX2hhbGN5b25cIiwgZmlsZTogXCJwcm9qZWN0cy9oYWxjeW9uLnN2ZWx0ZVwiLCBjb21wb25lbnQ6IGNvbXBvbmVudF80IH1cblx0XHRcdF1cblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0Ly8gYWJvdXQuc3ZlbHRlXG5cdFx0XHRwYXR0ZXJuOiAvXlxcL2Fib3V0XFwvPyQvLFxuXHRcdFx0cGFydHM6IFtcblx0XHRcdFx0eyBuYW1lOiBcImFib3V0XCIsIGZpbGU6IFwiYWJvdXQuc3ZlbHRlXCIsIGNvbXBvbmVudDogY29tcG9uZW50XzUgfVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHQvLyBibG9nL2luZGV4LnN2ZWx0ZVxuXHRcdFx0cGF0dGVybjogL15cXC9ibG9nXFwvPyQvLFxuXHRcdFx0cGFydHM6IFtcblx0XHRcdFx0eyBuYW1lOiBcImJsb2dcIiwgZmlsZTogXCJibG9nL2luZGV4LnN2ZWx0ZVwiLCBjb21wb25lbnQ6IGNvbXBvbmVudF82LCBwcmVsb2FkOiBwcmVsb2FkXzYgfVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHQvLyBibG9nL1tzbHVnXS5zdmVsdGVcblx0XHRcdHBhdHRlcm46IC9eXFwvYmxvZ1xcLyhbXlxcL10rPylcXC8/JC8sXG5cdFx0XHRwYXJ0czogW1xuXHRcdFx0XHRudWxsLFxuXHRcdFx0XHR7IG5hbWU6IFwiYmxvZ18kc2x1Z1wiLCBmaWxlOiBcImJsb2cvW3NsdWddLnN2ZWx0ZVwiLCBjb21wb25lbnQ6IGNvbXBvbmVudF83LCBwcmVsb2FkOiBwcmVsb2FkXzcsIHBhcmFtczogbWF0Y2ggPT4gKHsgc2x1ZzogZChtYXRjaFsxXSkgfSkgfVxuXHRcdFx0XVxuXHRcdH1cblx0XSxcblxuXHRyb290LFxuXHRyb290X3ByZWxvYWQ6ICgpID0+IHt9LFxuXHRlcnJvclxufTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkX2RpciA9IFwiX19zYXBwZXJfXy9kZXZcIjtcblxuZXhwb3J0IGNvbnN0IHNyY19kaXIgPSBcInNyY1wiO1xuXG5leHBvcnQgY29uc3QgZGV2ID0gdHJ1ZTsiLCJpbXBvcnQgeyBzYWZlX25vdF9lcXVhbCwgbm9vcCwgcnVuX2FsbCwgaXNfZnVuY3Rpb24gfSBmcm9tICcuLi9pbnRlcm5hbCc7XG5leHBvcnQgeyBnZXRfc3RvcmVfdmFsdWUgYXMgZ2V0IH0gZnJvbSAnLi4vaW50ZXJuYWwnO1xuXG5jb25zdCBzdWJzY3JpYmVyX3F1ZXVlID0gW107XG4vKipcbiAqIENyZWF0ZXMgYSBgUmVhZGFibGVgIHN0b3JlIHRoYXQgYWxsb3dzIHJlYWRpbmcgYnkgc3Vic2NyaXB0aW9uLlxuICogQHBhcmFtIHZhbHVlIGluaXRpYWwgdmFsdWVcbiAqIEBwYXJhbSB7U3RhcnRTdG9wTm90aWZpZXJ9c3RhcnQgc3RhcnQgYW5kIHN0b3Agbm90aWZpY2F0aW9ucyBmb3Igc3Vic2NyaXB0aW9uc1xuICovXG5mdW5jdGlvbiByZWFkYWJsZSh2YWx1ZSwgc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdWJzY3JpYmU6IHdyaXRhYmxlKHZhbHVlLCBzdGFydCkuc3Vic2NyaWJlLFxuICAgIH07XG59XG4vKipcbiAqIENyZWF0ZSBhIGBXcml0YWJsZWAgc3RvcmUgdGhhdCBhbGxvd3MgYm90aCB1cGRhdGluZyBhbmQgcmVhZGluZyBieSBzdWJzY3JpcHRpb24uXG4gKiBAcGFyYW0geyo9fXZhbHVlIGluaXRpYWwgdmFsdWVcbiAqIEBwYXJhbSB7U3RhcnRTdG9wTm90aWZpZXI9fXN0YXJ0IHN0YXJ0IGFuZCBzdG9wIG5vdGlmaWNhdGlvbnMgZm9yIHN1YnNjcmlwdGlvbnNcbiAqL1xuZnVuY3Rpb24gd3JpdGFibGUodmFsdWUsIHN0YXJ0ID0gbm9vcCkge1xuICAgIGxldCBzdG9wO1xuICAgIGNvbnN0IHN1YnNjcmliZXJzID0gW107XG4gICAgZnVuY3Rpb24gc2V0KG5ld192YWx1ZSkge1xuICAgICAgICBpZiAoc2FmZV9ub3RfZXF1YWwodmFsdWUsIG5ld192YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbmV3X3ZhbHVlO1xuICAgICAgICAgICAgaWYgKHN0b3ApIHsgLy8gc3RvcmUgaXMgcmVhZHlcbiAgICAgICAgICAgICAgICBjb25zdCBydW5fcXVldWUgPSAhc3Vic2NyaWJlcl9xdWV1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzY3JpYmVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzID0gc3Vic2NyaWJlcnNbaV07XG4gICAgICAgICAgICAgICAgICAgIHNbMV0oKTtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlcl9xdWV1ZS5wdXNoKHMsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJ1bl9xdWV1ZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YnNjcmliZXJfcXVldWUubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJfcXVldWVbaV1bMF0oc3Vic2NyaWJlcl9xdWV1ZVtpICsgMV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJfcXVldWUubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlKGZuKSB7XG4gICAgICAgIHNldChmbih2YWx1ZSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdWJzY3JpYmUocnVuLCBpbnZhbGlkYXRlID0gbm9vcCkge1xuICAgICAgICBjb25zdCBzdWJzY3JpYmVyID0gW3J1biwgaW52YWxpZGF0ZV07XG4gICAgICAgIHN1YnNjcmliZXJzLnB1c2goc3Vic2NyaWJlcik7XG4gICAgICAgIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHN0b3AgPSBzdGFydChzZXQpIHx8IG5vb3A7XG4gICAgICAgIH1cbiAgICAgICAgcnVuKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3Vic2NyaWJlcnMuaW5kZXhPZihzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgICAgICAgICBzdG9wID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgc2V0LCB1cGRhdGUsIHN1YnNjcmliZSB9O1xufVxuLyoqXG4gKiBEZXJpdmVkIHZhbHVlIHN0b3JlIGJ5IHN5bmNocm9uaXppbmcgb25lIG9yIG1vcmUgcmVhZGFibGUgc3RvcmVzIGFuZFxuICogYXBwbHlpbmcgYW4gYWdncmVnYXRpb24gZnVuY3Rpb24gb3ZlciBpdHMgaW5wdXQgdmFsdWVzLlxuICogQHBhcmFtIHtTdG9yZXN9IHN0b3JlcyBpbnB1dCBzdG9yZXNcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oU3RvcmVzPSwgZnVuY3Rpb24oKik9KToqfWZuIGZ1bmN0aW9uIGNhbGxiYWNrIHRoYXQgYWdncmVnYXRlcyB0aGUgdmFsdWVzXG4gKiBAcGFyYW0geyo9fWluaXRpYWxfdmFsdWUgd2hlbiB1c2VkIGFzeW5jaHJvbm91c2x5XG4gKi9cbmZ1bmN0aW9uIGRlcml2ZWQoc3RvcmVzLCBmbiwgaW5pdGlhbF92YWx1ZSkge1xuICAgIGNvbnN0IHNpbmdsZSA9ICFBcnJheS5pc0FycmF5KHN0b3Jlcyk7XG4gICAgY29uc3Qgc3RvcmVzX2FycmF5ID0gc2luZ2xlXG4gICAgICAgID8gW3N0b3Jlc11cbiAgICAgICAgOiBzdG9yZXM7XG4gICAgY29uc3QgYXV0byA9IGZuLmxlbmd0aCA8IDI7XG4gICAgcmV0dXJuIHJlYWRhYmxlKGluaXRpYWxfdmFsdWUsIChzZXQpID0+IHtcbiAgICAgICAgbGV0IGluaXRlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICAgICAgbGV0IHBlbmRpbmcgPSAwO1xuICAgICAgICBsZXQgY2xlYW51cCA9IG5vb3A7XG4gICAgICAgIGNvbnN0IHN5bmMgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAocGVuZGluZykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZuKHNpbmdsZSA/IHZhbHVlc1swXSA6IHZhbHVlcywgc2V0KTtcbiAgICAgICAgICAgIGlmIChhdXRvKSB7XG4gICAgICAgICAgICAgICAgc2V0KHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbGVhbnVwID0gaXNfZnVuY3Rpb24ocmVzdWx0KSA/IHJlc3VsdCA6IG5vb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHVuc3Vic2NyaWJlcnMgPSBzdG9yZXNfYXJyYXkubWFwKChzdG9yZSwgaSkgPT4gc3RvcmUuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdmFsdWVzW2ldID0gdmFsdWU7XG4gICAgICAgICAgICBwZW5kaW5nICY9IH4oMSA8PCBpKTtcbiAgICAgICAgICAgIGlmIChpbml0ZWQpIHtcbiAgICAgICAgICAgICAgICBzeW5jKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHBlbmRpbmcgfD0gKDEgPDwgaSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgaW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgc3luYygpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgICAgIHJ1bl9hbGwodW5zdWJzY3JpYmVycyk7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgIH07XG4gICAgfSk7XG59XG5cbmV4cG9ydCB7IGRlcml2ZWQsIHJlYWRhYmxlLCB3cml0YWJsZSB9O1xuIiwiaW1wb3J0IHsgd3JpdGFibGUgfSBmcm9tICdzdmVsdGUvc3RvcmUnO1xuXG5leHBvcnQgY29uc3QgQ09OVEVYVF9LRVkgPSB7fTtcblxuZXhwb3J0IGNvbnN0IHByZWxvYWQgPSAoKSA9PiAoe30pOyIsIjwhLS0gVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSBTYXBwZXIg4oCUIGRvIG5vdCBlZGl0IGl0ISAtLT5cbjxzY3JpcHQ+XG5cdGltcG9ydCB7IHNldENvbnRleHQgfSBmcm9tICdzdmVsdGUnO1xuXHRpbXBvcnQgeyBDT05URVhUX0tFWSB9IGZyb20gJy4vc2hhcmVkJztcblx0aW1wb3J0IExheW91dCBmcm9tICcuLi8uLi8uLi9yb3V0ZXMvX2xheW91dC5zdmVsdGUnO1xuXHRpbXBvcnQgRXJyb3IgZnJvbSAnLi4vLi4vLi4vcm91dGVzL19lcnJvci5zdmVsdGUnO1xuXG5cdGV4cG9ydCBsZXQgc3RvcmVzO1xuXHRleHBvcnQgbGV0IGVycm9yO1xuXHRleHBvcnQgbGV0IHN0YXR1cztcblx0ZXhwb3J0IGxldCBzZWdtZW50cztcblx0ZXhwb3J0IGxldCBsZXZlbDA7XG5cdGV4cG9ydCBsZXQgbGV2ZWwxID0gbnVsbDtcblxuXHRzZXRDb250ZXh0KENPTlRFWFRfS0VZLCBzdG9yZXMpO1xuPC9zY3JpcHQ+XG5cbjxMYXlvdXQgc2VnbWVudD1cIntzZWdtZW50c1swXX1cIiB7Li4ubGV2ZWwwLnByb3BzfT5cblx0eyNpZiBlcnJvcn1cblx0XHQ8RXJyb3Ige2Vycm9yfSB7c3RhdHVzfS8+XG5cdHs6ZWxzZX1cblx0XHQ8c3ZlbHRlOmNvbXBvbmVudCB0aGlzPVwie2xldmVsMS5jb21wb25lbnR9XCIgey4uLmxldmVsMS5wcm9wc30vPlxuXHR7L2lmfVxuPC9MYXlvdXQ+IiwiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZGV2LCBidWlsZF9kaXIsIHNyY19kaXIsIG1hbmlmZXN0IH0gZnJvbSAnLi9pbnRlcm5hbC9tYW5pZmVzdC1zZXJ2ZXInO1xuaW1wb3J0IHsgd3JpdGFibGUgfSBmcm9tICdzdmVsdGUvc3RvcmUnO1xuaW1wb3J0IFN0cmVhbSBmcm9tICdzdHJlYW0nO1xuaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCc7XG5pbXBvcnQgVXJsIGZyb20gJ3VybCc7XG5pbXBvcnQgaHR0cHMgZnJvbSAnaHR0cHMnO1xuaW1wb3J0IHpsaWIgZnJvbSAnemxpYic7XG5pbXBvcnQgQXBwIGZyb20gJy4vaW50ZXJuYWwvQXBwLnN2ZWx0ZSc7XG5cbmZ1bmN0aW9uIGdldF9zZXJ2ZXJfcm91dGVfaGFuZGxlcihyb3V0ZXMpIHtcblx0YXN5bmMgZnVuY3Rpb24gaGFuZGxlX3JvdXRlKHJvdXRlLCByZXEsIHJlcywgbmV4dCkge1xuXHRcdHJlcS5wYXJhbXMgPSByb3V0ZS5wYXJhbXMocm91dGUucGF0dGVybi5leGVjKHJlcS5wYXRoKSk7XG5cblx0XHRjb25zdCBtZXRob2QgPSByZXEubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG5cdFx0Ly8gJ2RlbGV0ZScgY2Fubm90IGJlIGV4cG9ydGVkIGZyb20gYSBtb2R1bGUgYmVjYXVzZSBpdCBpcyBhIGtleXdvcmQsXG5cdFx0Ly8gc28gY2hlY2sgZm9yICdkZWwnIGluc3RlYWRcblx0XHRjb25zdCBtZXRob2RfZXhwb3J0ID0gbWV0aG9kID09PSAnZGVsZXRlJyA/ICdkZWwnIDogbWV0aG9kO1xuXHRcdGNvbnN0IGhhbmRsZV9tZXRob2QgPSByb3V0ZS5oYW5kbGVyc1ttZXRob2RfZXhwb3J0XTtcblx0XHRpZiAoaGFuZGxlX21ldGhvZCkge1xuXHRcdFx0aWYgKHByb2Nlc3MuZW52LlNBUFBFUl9FWFBPUlQpIHtcblx0XHRcdFx0Y29uc3QgeyB3cml0ZSwgZW5kLCBzZXRIZWFkZXIgfSA9IHJlcztcblx0XHRcdFx0Y29uc3QgY2h1bmtzID0gW107XG5cdFx0XHRcdGNvbnN0IGhlYWRlcnMgPSB7fTtcblxuXHRcdFx0XHQvLyBpbnRlcmNlcHQgZGF0YSBzbyB0aGF0IGl0IGNhbiBiZSBleHBvcnRlZFxuXHRcdFx0XHRyZXMud3JpdGUgPSBmdW5jdGlvbihjaHVuaykge1xuXHRcdFx0XHRcdGNodW5rcy5wdXNoKEJ1ZmZlci5mcm9tKGNodW5rKSk7XG5cdFx0XHRcdFx0d3JpdGUuYXBwbHkocmVzLCBhcmd1bWVudHMpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHJlcy5zZXRIZWFkZXIgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuXHRcdFx0XHRcdGhlYWRlcnNbbmFtZS50b0xvd2VyQ2FzZSgpXSA9IHZhbHVlO1xuXHRcdFx0XHRcdHNldEhlYWRlci5hcHBseShyZXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0cmVzLmVuZCA9IGZ1bmN0aW9uKGNodW5rKSB7XG5cdFx0XHRcdFx0aWYgKGNodW5rKSBjaHVua3MucHVzaChCdWZmZXIuZnJvbShjaHVuaykpO1xuXHRcdFx0XHRcdGVuZC5hcHBseShyZXMsIGFyZ3VtZW50cyk7XG5cblx0XHRcdFx0XHRwcm9jZXNzLnNlbmQoe1xuXHRcdFx0XHRcdFx0X19zYXBwZXJfXzogdHJ1ZSxcblx0XHRcdFx0XHRcdGV2ZW50OiAnZmlsZScsXG5cdFx0XHRcdFx0XHR1cmw6IHJlcS51cmwsXG5cdFx0XHRcdFx0XHRtZXRob2Q6IHJlcS5tZXRob2QsXG5cdFx0XHRcdFx0XHRzdGF0dXM6IHJlcy5zdGF0dXNDb2RlLFxuXHRcdFx0XHRcdFx0dHlwZTogaGVhZGVyc1snY29udGVudC10eXBlJ10sXG5cdFx0XHRcdFx0XHRib2R5OiBCdWZmZXIuY29uY2F0KGNodW5rcykudG9TdHJpbmcoKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBoYW5kbGVfbmV4dCA9IChlcnIpID0+IHtcblx0XHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRcdHJlcy5zdGF0dXNDb2RlID0gNTAwO1xuXHRcdFx0XHRcdHJlcy5lbmQoZXJyLm1lc3NhZ2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHByb2Nlc3MubmV4dFRpY2sobmV4dCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGF3YWl0IGhhbmRsZV9tZXRob2QocmVxLCByZXMsIGhhbmRsZV9uZXh0KTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0XHRcdGhhbmRsZV9uZXh0KGVycik7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIG5vIG1hdGNoaW5nIGhhbmRsZXIgZm9yIG1ldGhvZFxuXHRcdFx0cHJvY2Vzcy5uZXh0VGljayhuZXh0KTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZnVuY3Rpb24gZmluZF9yb3V0ZShyZXEsIHJlcywgbmV4dCkge1xuXHRcdGZvciAoY29uc3Qgcm91dGUgb2Ygcm91dGVzKSB7XG5cdFx0XHRpZiAocm91dGUucGF0dGVybi50ZXN0KHJlcS5wYXRoKSkge1xuXHRcdFx0XHRoYW5kbGVfcm91dGUocm91dGUsIHJlcSwgcmVzLCBuZXh0KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdG5leHQoKTtcblx0fTtcbn1cblxuLyohXG4gKiBjb29raWVcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgUm9tYW4gU2h0eWxtYW5cbiAqIENvcHlyaWdodChjKSAyMDE1IERvdWdsYXMgQ2hyaXN0b3BoZXIgV2lsc29uXG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICogQHB1YmxpY1xuICovXG5cbnZhciBwYXJzZV8xID0gcGFyc2U7XG52YXIgc2VyaWFsaXplXzEgPSBzZXJpYWxpemU7XG5cbi8qKlxuICogTW9kdWxlIHZhcmlhYmxlcy5cbiAqIEBwcml2YXRlXG4gKi9cblxudmFyIGRlY29kZSA9IGRlY29kZVVSSUNvbXBvbmVudDtcbnZhciBlbmNvZGUgPSBlbmNvZGVVUklDb21wb25lbnQ7XG52YXIgcGFpclNwbGl0UmVnRXhwID0gLzsgKi87XG5cbi8qKlxuICogUmVnRXhwIHRvIG1hdGNoIGZpZWxkLWNvbnRlbnQgaW4gUkZDIDcyMzAgc2VjIDMuMlxuICpcbiAqIGZpZWxkLWNvbnRlbnQgPSBmaWVsZC12Y2hhciBbIDEqKCBTUCAvIEhUQUIgKSBmaWVsZC12Y2hhciBdXG4gKiBmaWVsZC12Y2hhciAgID0gVkNIQVIgLyBvYnMtdGV4dFxuICogb2JzLXRleHQgICAgICA9ICV4ODAtRkZcbiAqL1xuXG52YXIgZmllbGRDb250ZW50UmVnRXhwID0gL15bXFx1MDAwOVxcdTAwMjAtXFx1MDA3ZVxcdTAwODAtXFx1MDBmZl0rJC87XG5cbi8qKlxuICogUGFyc2UgYSBjb29raWUgaGVhZGVyLlxuICpcbiAqIFBhcnNlIHRoZSBnaXZlbiBjb29raWUgaGVhZGVyIHN0cmluZyBpbnRvIGFuIG9iamVjdFxuICogVGhlIG9iamVjdCBoYXMgdGhlIHZhcmlvdXMgY29va2llcyBhcyBrZXlzKG5hbWVzKSA9PiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKiBAcHVibGljXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyLCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IHN0ciBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gIH1cblxuICB2YXIgb2JqID0ge307XG4gIHZhciBvcHQgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgcGFpcnMgPSBzdHIuc3BsaXQocGFpclNwbGl0UmVnRXhwKTtcbiAgdmFyIGRlYyA9IG9wdC5kZWNvZGUgfHwgZGVjb2RlO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcGFpciA9IHBhaXJzW2ldO1xuICAgIHZhciBlcV9pZHggPSBwYWlyLmluZGV4T2YoJz0nKTtcblxuICAgIC8vIHNraXAgdGhpbmdzIHRoYXQgZG9uJ3QgbG9vayBsaWtlIGtleT12YWx1ZVxuICAgIGlmIChlcV9pZHggPCAwKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIga2V5ID0gcGFpci5zdWJzdHIoMCwgZXFfaWR4KS50cmltKCk7XG4gICAgdmFyIHZhbCA9IHBhaXIuc3Vic3RyKCsrZXFfaWR4LCBwYWlyLmxlbmd0aCkudHJpbSgpO1xuXG4gICAgLy8gcXVvdGVkIHZhbHVlc1xuICAgIGlmICgnXCInID09IHZhbFswXSkge1xuICAgICAgdmFsID0gdmFsLnNsaWNlKDEsIC0xKTtcbiAgICB9XG5cbiAgICAvLyBvbmx5IGFzc2lnbiBvbmNlXG4gICAgaWYgKHVuZGVmaW5lZCA9PSBvYmpba2V5XSkge1xuICAgICAgb2JqW2tleV0gPSB0cnlEZWNvZGUodmFsLCBkZWMpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogU2VyaWFsaXplIGRhdGEgaW50byBhIGNvb2tpZSBoZWFkZXIuXG4gKlxuICogU2VyaWFsaXplIHRoZSBhIG5hbWUgdmFsdWUgcGFpciBpbnRvIGEgY29va2llIHN0cmluZyBzdWl0YWJsZSBmb3JcbiAqIGh0dHAgaGVhZGVycy4gQW4gb3B0aW9uYWwgb3B0aW9ucyBvYmplY3Qgc3BlY2lmaWVkIGNvb2tpZSBwYXJhbWV0ZXJzLlxuICpcbiAqIHNlcmlhbGl6ZSgnZm9vJywgJ2JhcicsIHsgaHR0cE9ubHk6IHRydWUgfSlcbiAqICAgPT4gXCJmb289YmFyOyBodHRwT25seVwiXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqIEBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBzZXJpYWxpemUobmFtZSwgdmFsLCBvcHRpb25zKSB7XG4gIHZhciBvcHQgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgZW5jID0gb3B0LmVuY29kZSB8fCBlbmNvZGU7XG5cbiAgaWYgKHR5cGVvZiBlbmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gZW5jb2RlIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIGlmICghZmllbGRDb250ZW50UmVnRXhwLnRlc3QobmFtZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBuYW1lIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHZhciB2YWx1ZSA9IGVuYyh2YWwpO1xuXG4gIGlmICh2YWx1ZSAmJiAhZmllbGRDb250ZW50UmVnRXhwLnRlc3QodmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgdmFsIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHZhciBzdHIgPSBuYW1lICsgJz0nICsgdmFsdWU7XG5cbiAgaWYgKG51bGwgIT0gb3B0Lm1heEFnZSkge1xuICAgIHZhciBtYXhBZ2UgPSBvcHQubWF4QWdlIC0gMDtcbiAgICBpZiAoaXNOYU4obWF4QWdlKSkgdGhyb3cgbmV3IEVycm9yKCdtYXhBZ2Ugc2hvdWxkIGJlIGEgTnVtYmVyJyk7XG4gICAgc3RyICs9ICc7IE1heC1BZ2U9JyArIE1hdGguZmxvb3IobWF4QWdlKTtcbiAgfVxuXG4gIGlmIChvcHQuZG9tYWluKSB7XG4gICAgaWYgKCFmaWVsZENvbnRlbnRSZWdFeHAudGVzdChvcHQuZG9tYWluKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIGRvbWFpbiBpcyBpbnZhbGlkJyk7XG4gICAgfVxuXG4gICAgc3RyICs9ICc7IERvbWFpbj0nICsgb3B0LmRvbWFpbjtcbiAgfVxuXG4gIGlmIChvcHQucGF0aCkge1xuICAgIGlmICghZmllbGRDb250ZW50UmVnRXhwLnRlc3Qob3B0LnBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gcGF0aCBpcyBpbnZhbGlkJyk7XG4gICAgfVxuXG4gICAgc3RyICs9ICc7IFBhdGg9JyArIG9wdC5wYXRoO1xuICB9XG5cbiAgaWYgKG9wdC5leHBpcmVzKSB7XG4gICAgaWYgKHR5cGVvZiBvcHQuZXhwaXJlcy50b1VUQ1N0cmluZyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIGV4cGlyZXMgaXMgaW52YWxpZCcpO1xuICAgIH1cblxuICAgIHN0ciArPSAnOyBFeHBpcmVzPScgKyBvcHQuZXhwaXJlcy50b1VUQ1N0cmluZygpO1xuICB9XG5cbiAgaWYgKG9wdC5odHRwT25seSkge1xuICAgIHN0ciArPSAnOyBIdHRwT25seSc7XG4gIH1cblxuICBpZiAob3B0LnNlY3VyZSkge1xuICAgIHN0ciArPSAnOyBTZWN1cmUnO1xuICB9XG5cbiAgaWYgKG9wdC5zYW1lU2l0ZSkge1xuICAgIHZhciBzYW1lU2l0ZSA9IHR5cGVvZiBvcHQuc2FtZVNpdGUgPT09ICdzdHJpbmcnXG4gICAgICA/IG9wdC5zYW1lU2l0ZS50b0xvd2VyQ2FzZSgpIDogb3B0LnNhbWVTaXRlO1xuXG4gICAgc3dpdGNoIChzYW1lU2l0ZSkge1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICBzdHIgKz0gJzsgU2FtZVNpdGU9U3RyaWN0JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsYXgnOlxuICAgICAgICBzdHIgKz0gJzsgU2FtZVNpdGU9TGF4JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzdHJpY3QnOlxuICAgICAgICBzdHIgKz0gJzsgU2FtZVNpdGU9U3RyaWN0JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdub25lJzpcbiAgICAgICAgc3RyICs9ICc7IFNhbWVTaXRlPU5vbmUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBzYW1lU2l0ZSBpcyBpbnZhbGlkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBUcnkgZGVjb2RpbmcgYSBzdHJpbmcgdXNpbmcgYSBkZWNvZGluZyBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBkZWNvZGVcbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gdHJ5RGVjb2RlKHN0ciwgZGVjb2RlKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlY29kZShzdHIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufVxuXG52YXIgY29va2llID0ge1xuXHRwYXJzZTogcGFyc2VfMSxcblx0c2VyaWFsaXplOiBzZXJpYWxpemVfMVxufTtcblxudmFyIGNoYXJzID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpfJCc7XG52YXIgdW5zYWZlQ2hhcnMgPSAvWzw+XFxiXFxmXFxuXFxyXFx0XFwwXFx1MjAyOFxcdTIwMjldL2c7XG52YXIgcmVzZXJ2ZWQgPSAvXig/OmRvfGlmfGlufGZvcnxpbnR8bGV0fG5ld3x0cnl8dmFyfGJ5dGV8Y2FzZXxjaGFyfGVsc2V8ZW51bXxnb3RvfGxvbmd8dGhpc3x2b2lkfHdpdGh8YXdhaXR8YnJlYWt8Y2F0Y2h8Y2xhc3N8Y29uc3R8ZmluYWx8ZmxvYXR8c2hvcnR8c3VwZXJ8dGhyb3d8d2hpbGV8eWllbGR8ZGVsZXRlfGRvdWJsZXxleHBvcnR8aW1wb3J0fG5hdGl2ZXxyZXR1cm58c3dpdGNofHRocm93c3x0eXBlb2Z8Ym9vbGVhbnxkZWZhdWx0fGV4dGVuZHN8ZmluYWxseXxwYWNrYWdlfHByaXZhdGV8YWJzdHJhY3R8Y29udGludWV8ZGVidWdnZXJ8ZnVuY3Rpb258dm9sYXRpbGV8aW50ZXJmYWNlfHByb3RlY3RlZHx0cmFuc2llbnR8aW1wbGVtZW50c3xpbnN0YW5jZW9mfHN5bmNocm9uaXplZCkkLztcbnZhciBlc2NhcGVkID0ge1xuICAgICc8JzogJ1xcXFx1MDAzQycsXG4gICAgJz4nOiAnXFxcXHUwMDNFJyxcbiAgICAnLyc6ICdcXFxcdTAwMkYnLFxuICAgICdcXFxcJzogJ1xcXFxcXFxcJyxcbiAgICAnXFxiJzogJ1xcXFxiJyxcbiAgICAnXFxmJzogJ1xcXFxmJyxcbiAgICAnXFxuJzogJ1xcXFxuJyxcbiAgICAnXFxyJzogJ1xcXFxyJyxcbiAgICAnXFx0JzogJ1xcXFx0JyxcbiAgICAnXFwwJzogJ1xcXFwwJyxcbiAgICAnXFx1MjAyOCc6ICdcXFxcdTIwMjgnLFxuICAgICdcXHUyMDI5JzogJ1xcXFx1MjAyOSdcbn07XG52YXIgb2JqZWN0UHJvdG9Pd25Qcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoT2JqZWN0LnByb3RvdHlwZSkuc29ydCgpLmpvaW4oJ1xcMCcpO1xuZnVuY3Rpb24gZGV2YWx1ZSh2YWx1ZSkge1xuICAgIHZhciBjb3VudHMgPSBuZXcgTWFwKCk7XG4gICAgZnVuY3Rpb24gd2Fsayh0aGluZykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgc3RyaW5naWZ5IGEgZnVuY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvdW50cy5oYXModGhpbmcpKSB7XG4gICAgICAgICAgICBjb3VudHMuc2V0KHRoaW5nLCBjb3VudHMuZ2V0KHRoaW5nKSArIDEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvdW50cy5zZXQodGhpbmcsIDEpO1xuICAgICAgICBpZiAoIWlzUHJpbWl0aXZlKHRoaW5nKSkge1xuICAgICAgICAgICAgdmFyIHR5cGUgPSBnZXRUeXBlKHRoaW5nKTtcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ051bWJlcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnU3RyaW5nJzpcbiAgICAgICAgICAgICAgICBjYXNlICdCb29sZWFuJzpcbiAgICAgICAgICAgICAgICBjYXNlICdEYXRlJzpcbiAgICAgICAgICAgICAgICBjYXNlICdSZWdFeHAnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyYXknOlxuICAgICAgICAgICAgICAgICAgICB0aGluZy5mb3JFYWNoKHdhbGspO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdTZXQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ01hcCc6XG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmZyb20odGhpbmcpLmZvckVhY2god2Fsayk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm90byAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdG8gIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3RvKS5zb3J0KCkuam9pbignXFwwJykgIT09IG9iamVjdFByb3RvT3duUHJvcGVydHlOYW1lcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHN0cmluZ2lmeSBhcmJpdHJhcnkgbm9uLVBPSk9zXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRoaW5nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgc3RyaW5naWZ5IFBPSk9zIHdpdGggc3ltYm9saWMga2V5c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0aGluZykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB3YWxrKHRoaW5nW2tleV0pOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB3YWxrKHZhbHVlKTtcbiAgICB2YXIgbmFtZXMgPSBuZXcgTWFwKCk7XG4gICAgQXJyYXkuZnJvbShjb3VudHMpXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGVudHJ5KSB7IHJldHVybiBlbnRyeVsxXSA+IDE7IH0pXG4gICAgICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBiWzFdIC0gYVsxXTsgfSlcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGVudHJ5LCBpKSB7XG4gICAgICAgIG5hbWVzLnNldChlbnRyeVswXSwgZ2V0TmFtZShpKSk7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5KHRoaW5nKSB7XG4gICAgICAgIGlmIChuYW1lcy5oYXModGhpbmcpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmFtZXMuZ2V0KHRoaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcmltaXRpdmUodGhpbmcpKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyaW5naWZ5UHJpbWl0aXZlKHRoaW5nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdHlwZSA9IGdldFR5cGUodGhpbmcpO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ051bWJlcic6XG4gICAgICAgICAgICBjYXNlICdTdHJpbmcnOlxuICAgICAgICAgICAgY2FzZSAnQm9vbGVhbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiT2JqZWN0KFwiICsgc3RyaW5naWZ5KHRoaW5nLnZhbHVlT2YoKSkgKyBcIilcIjtcbiAgICAgICAgICAgIGNhc2UgJ1JlZ0V4cCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaW5nLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBjYXNlICdEYXRlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJuZXcgRGF0ZShcIiArIHRoaW5nLmdldFRpbWUoKSArIFwiKVwiO1xuICAgICAgICAgICAgY2FzZSAnQXJyYXknOlxuICAgICAgICAgICAgICAgIHZhciBtZW1iZXJzID0gdGhpbmcubWFwKGZ1bmN0aW9uICh2LCBpKSB7IHJldHVybiBpIGluIHRoaW5nID8gc3RyaW5naWZ5KHYpIDogJyc7IH0pO1xuICAgICAgICAgICAgICAgIHZhciB0YWlsID0gdGhpbmcubGVuZ3RoID09PSAwIHx8ICh0aGluZy5sZW5ndGggLSAxIGluIHRoaW5nKSA/ICcnIDogJywnO1xuICAgICAgICAgICAgICAgIHJldHVybiBcIltcIiArIG1lbWJlcnMuam9pbignLCcpICsgdGFpbCArIFwiXVwiO1xuICAgICAgICAgICAgY2FzZSAnU2V0JzpcbiAgICAgICAgICAgIGNhc2UgJ01hcCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibmV3IFwiICsgdHlwZSArIFwiKFtcIiArIEFycmF5LmZyb20odGhpbmcpLm1hcChzdHJpbmdpZnkpLmpvaW4oJywnKSArIFwiXSlcIjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IFwie1wiICsgT2JqZWN0LmtleXModGhpbmcpLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBzYWZlS2V5KGtleSkgKyBcIjpcIiArIHN0cmluZ2lmeSh0aGluZ1trZXldKTsgfSkuam9pbignLCcpICsgXCJ9XCI7XG4gICAgICAgICAgICAgICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaW5nKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaW5nKS5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwiT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKG51bGwpLFwiICsgb2JqICsgXCIpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCJPYmplY3QuY3JlYXRlKG51bGwpXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIHN0ciA9IHN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgaWYgKG5hbWVzLnNpemUpIHtcbiAgICAgICAgdmFyIHBhcmFtc18xID0gW107XG4gICAgICAgIHZhciBzdGF0ZW1lbnRzXzEgPSBbXTtcbiAgICAgICAgdmFyIHZhbHVlc18xID0gW107XG4gICAgICAgIG5hbWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUsIHRoaW5nKSB7XG4gICAgICAgICAgICBwYXJhbXNfMS5wdXNoKG5hbWUpO1xuICAgICAgICAgICAgaWYgKGlzUHJpbWl0aXZlKHRoaW5nKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2goc3RyaW5naWZ5UHJpbWl0aXZlKHRoaW5nKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHR5cGUgPSBnZXRUeXBlKHRoaW5nKTtcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ051bWJlcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnU3RyaW5nJzpcbiAgICAgICAgICAgICAgICBjYXNlICdCb29sZWFuJzpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChcIk9iamVjdChcIiArIHN0cmluZ2lmeSh0aGluZy52YWx1ZU9mKCkpICsgXCIpXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdSZWdFeHAnOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKHRoaW5nLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdEYXRlJzpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChcIm5ldyBEYXRlKFwiICsgdGhpbmcuZ2V0VGltZSgpICsgXCIpXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJheSc6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2goXCJBcnJheShcIiArIHRoaW5nLmxlbmd0aCArIFwiKVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpbmcuZm9yRWFjaChmdW5jdGlvbiAodiwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50c18xLnB1c2gobmFtZSArIFwiW1wiICsgaSArIFwiXT1cIiArIHN0cmluZ2lmeSh2KSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdTZXQnOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKFwibmV3IFNldFwiKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50c18xLnB1c2gobmFtZSArIFwiLlwiICsgQXJyYXkuZnJvbSh0aGluZykubWFwKGZ1bmN0aW9uICh2KSB7IHJldHVybiBcImFkZChcIiArIHN0cmluZ2lmeSh2KSArIFwiKVwiOyB9KS5qb2luKCcuJykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdNYXAnOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKFwibmV3IE1hcFwiKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50c18xLnB1c2gobmFtZSArIFwiLlwiICsgQXJyYXkuZnJvbSh0aGluZykubWFwKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGsgPSBfYVswXSwgdiA9IF9hWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic2V0KFwiICsgc3RyaW5naWZ5KGspICsgXCIsIFwiICsgc3RyaW5naWZ5KHYpICsgXCIpXCI7XG4gICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oJy4nKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2goT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaW5nKSA9PT0gbnVsbCA/ICdPYmplY3QuY3JlYXRlKG51bGwpJyA6ICd7fScpO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0aGluZykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzXzEucHVzaChcIlwiICsgbmFtZSArIHNhZmVQcm9wKGtleSkgKyBcIj1cIiArIHN0cmluZ2lmeSh0aGluZ1trZXldKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc3RhdGVtZW50c18xLnB1c2goXCJyZXR1cm4gXCIgKyBzdHIpO1xuICAgICAgICByZXR1cm4gXCIoZnVuY3Rpb24oXCIgKyBwYXJhbXNfMS5qb2luKCcsJykgKyBcIil7XCIgKyBzdGF0ZW1lbnRzXzEuam9pbignOycpICsgXCJ9KFwiICsgdmFsdWVzXzEuam9pbignLCcpICsgXCIpKVwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXROYW1lKG51bSkge1xuICAgIHZhciBuYW1lID0gJyc7XG4gICAgZG8ge1xuICAgICAgICBuYW1lID0gY2hhcnNbbnVtICUgY2hhcnMubGVuZ3RoXSArIG5hbWU7XG4gICAgICAgIG51bSA9IH5+KG51bSAvIGNoYXJzLmxlbmd0aCkgLSAxO1xuICAgIH0gd2hpbGUgKG51bSA+PSAwKTtcbiAgICByZXR1cm4gcmVzZXJ2ZWQudGVzdChuYW1lKSA/IG5hbWUgKyBcIl9cIiA6IG5hbWU7XG59XG5mdW5jdGlvbiBpc1ByaW1pdGl2ZSh0aGluZykge1xuICAgIHJldHVybiBPYmplY3QodGhpbmcpICE9PSB0aGluZztcbn1cbmZ1bmN0aW9uIHN0cmluZ2lmeVByaW1pdGl2ZSh0aGluZykge1xuICAgIGlmICh0eXBlb2YgdGhpbmcgPT09ICdzdHJpbmcnKVxuICAgICAgICByZXR1cm4gc3RyaW5naWZ5U3RyaW5nKHRoaW5nKTtcbiAgICBpZiAodGhpbmcgPT09IHZvaWQgMClcbiAgICAgICAgcmV0dXJuICd2b2lkIDAnO1xuICAgIGlmICh0aGluZyA9PT0gMCAmJiAxIC8gdGhpbmcgPCAwKVxuICAgICAgICByZXR1cm4gJy0wJztcbiAgICB2YXIgc3RyID0gU3RyaW5nKHRoaW5nKTtcbiAgICBpZiAodHlwZW9mIHRoaW5nID09PSAnbnVtYmVyJylcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eKC0pPzBcXC4vLCAnJDEuJyk7XG4gICAgcmV0dXJuIHN0cjtcbn1cbmZ1bmN0aW9uIGdldFR5cGUodGhpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaW5nKS5zbGljZSg4LCAtMSk7XG59XG5mdW5jdGlvbiBlc2NhcGVVbnNhZmVDaGFyKGMpIHtcbiAgICByZXR1cm4gZXNjYXBlZFtjXSB8fCBjO1xufVxuZnVuY3Rpb24gZXNjYXBlVW5zYWZlQ2hhcnMoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKHVuc2FmZUNoYXJzLCBlc2NhcGVVbnNhZmVDaGFyKTtcbn1cbmZ1bmN0aW9uIHNhZmVLZXkoa2V5KSB7XG4gICAgcmV0dXJuIC9eW18kYS16QS1aXVtfJGEtekEtWjAtOV0qJC8udGVzdChrZXkpID8ga2V5IDogZXNjYXBlVW5zYWZlQ2hhcnMoSlNPTi5zdHJpbmdpZnkoa2V5KSk7XG59XG5mdW5jdGlvbiBzYWZlUHJvcChrZXkpIHtcbiAgICByZXR1cm4gL15bXyRhLXpBLVpdW18kYS16QS1aMC05XSokLy50ZXN0KGtleSkgPyBcIi5cIiArIGtleSA6IFwiW1wiICsgZXNjYXBlVW5zYWZlQ2hhcnMoSlNPTi5zdHJpbmdpZnkoa2V5KSkgKyBcIl1cIjtcbn1cbmZ1bmN0aW9uIHN0cmluZ2lmeVN0cmluZyhzdHIpIHtcbiAgICB2YXIgcmVzdWx0ID0gJ1wiJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB2YXIgY2hhciA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgIHZhciBjb2RlID0gY2hhci5jaGFyQ29kZUF0KDApO1xuICAgICAgICBpZiAoY2hhciA9PT0gJ1wiJykge1xuICAgICAgICAgICAgcmVzdWx0ICs9ICdcXFxcXCInO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNoYXIgaW4gZXNjYXBlZCkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IGVzY2FwZWRbY2hhcl07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29kZSA+PSAweGQ4MDAgJiYgY29kZSA8PSAweGRmZmYpIHtcbiAgICAgICAgICAgIHZhciBuZXh0ID0gc3RyLmNoYXJDb2RlQXQoaSArIDEpO1xuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgYmVnaW5uaW5nIG9mIGEgW2hpZ2gsIGxvd10gc3Vycm9nYXRlIHBhaXIsXG4gICAgICAgICAgICAvLyBhZGQgdGhlIG5leHQgdHdvIGNoYXJhY3RlcnMsIG90aGVyd2lzZSBlc2NhcGVcbiAgICAgICAgICAgIGlmIChjb2RlIDw9IDB4ZGJmZiAmJiAobmV4dCA+PSAweGRjMDAgJiYgbmV4dCA8PSAweGRmZmYpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGNoYXIgKyBzdHJbKytpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIlxcXFx1XCIgKyBjb2RlLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ICs9IGNoYXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0ICs9ICdcIic7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gQmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL3RtcHZhci9qc2RvbS9ibG9iL2FhODViMmFiZjA3NzY2ZmY3YmY1YzFmNmRhYWZiMzcyNmYyZjJkYjUvbGliL2pzZG9tL2xpdmluZy9ibG9iLmpzXG5cbi8vIGZpeCBmb3IgXCJSZWFkYWJsZVwiIGlzbid0IGEgbmFtZWQgZXhwb3J0IGlzc3VlXG5jb25zdCBSZWFkYWJsZSA9IFN0cmVhbS5SZWFkYWJsZTtcblxuY29uc3QgQlVGRkVSID0gU3ltYm9sKCdidWZmZXInKTtcbmNvbnN0IFRZUEUgPSBTeW1ib2woJ3R5cGUnKTtcblxuY2xhc3MgQmxvYiB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXNbVFlQRV0gPSAnJztcblxuXHRcdGNvbnN0IGJsb2JQYXJ0cyA9IGFyZ3VtZW50c1swXTtcblx0XHRjb25zdCBvcHRpb25zID0gYXJndW1lbnRzWzFdO1xuXG5cdFx0Y29uc3QgYnVmZmVycyA9IFtdO1xuXHRcdGxldCBzaXplID0gMDtcblxuXHRcdGlmIChibG9iUGFydHMpIHtcblx0XHRcdGNvbnN0IGEgPSBibG9iUGFydHM7XG5cdFx0XHRjb25zdCBsZW5ndGggPSBOdW1iZXIoYS5sZW5ndGgpO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb25zdCBlbGVtZW50ID0gYVtpXTtcblx0XHRcdFx0bGV0IGJ1ZmZlcjtcblx0XHRcdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCdWZmZXIpIHtcblx0XHRcdFx0XHRidWZmZXIgPSBlbGVtZW50O1xuXHRcdFx0XHR9IGVsc2UgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhlbGVtZW50KSkge1xuXHRcdFx0XHRcdGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGVsZW1lbnQuYnVmZmVyLCBlbGVtZW50LmJ5dGVPZmZzZXQsIGVsZW1lbnQuYnl0ZUxlbmd0aCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG5cdFx0XHRcdFx0YnVmZmVyID0gQnVmZmVyLmZyb20oZWxlbWVudCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEJsb2IpIHtcblx0XHRcdFx0XHRidWZmZXIgPSBlbGVtZW50W0JVRkZFUl07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YnVmZmVyID0gQnVmZmVyLmZyb20odHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnID8gZWxlbWVudCA6IFN0cmluZyhlbGVtZW50KSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0c2l6ZSArPSBidWZmZXIubGVuZ3RoO1xuXHRcdFx0XHRidWZmZXJzLnB1c2goYnVmZmVyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzW0JVRkZFUl0gPSBCdWZmZXIuY29uY2F0KGJ1ZmZlcnMpO1xuXG5cdFx0bGV0IHR5cGUgPSBvcHRpb25zICYmIG9wdGlvbnMudHlwZSAhPT0gdW5kZWZpbmVkICYmIFN0cmluZyhvcHRpb25zLnR5cGUpLnRvTG93ZXJDYXNlKCk7XG5cdFx0aWYgKHR5cGUgJiYgIS9bXlxcdTAwMjAtXFx1MDA3RV0vLnRlc3QodHlwZSkpIHtcblx0XHRcdHRoaXNbVFlQRV0gPSB0eXBlO1xuXHRcdH1cblx0fVxuXHRnZXQgc2l6ZSgpIHtcblx0XHRyZXR1cm4gdGhpc1tCVUZGRVJdLmxlbmd0aDtcblx0fVxuXHRnZXQgdHlwZSgpIHtcblx0XHRyZXR1cm4gdGhpc1tUWVBFXTtcblx0fVxuXHR0ZXh0KCkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpc1tCVUZGRVJdLnRvU3RyaW5nKCkpO1xuXHR9XG5cdGFycmF5QnVmZmVyKCkge1xuXHRcdGNvbnN0IGJ1ZiA9IHRoaXNbQlVGRkVSXTtcblx0XHRjb25zdCBhYiA9IGJ1Zi5idWZmZXIuc2xpY2UoYnVmLmJ5dGVPZmZzZXQsIGJ1Zi5ieXRlT2Zmc2V0ICsgYnVmLmJ5dGVMZW5ndGgpO1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoYWIpO1xuXHR9XG5cdHN0cmVhbSgpIHtcblx0XHRjb25zdCByZWFkYWJsZSA9IG5ldyBSZWFkYWJsZSgpO1xuXHRcdHJlYWRhYmxlLl9yZWFkID0gZnVuY3Rpb24gKCkge307XG5cdFx0cmVhZGFibGUucHVzaCh0aGlzW0JVRkZFUl0pO1xuXHRcdHJlYWRhYmxlLnB1c2gobnVsbCk7XG5cdFx0cmV0dXJuIHJlYWRhYmxlO1xuXHR9XG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiAnW29iamVjdCBCbG9iXSc7XG5cdH1cblx0c2xpY2UoKSB7XG5cdFx0Y29uc3Qgc2l6ZSA9IHRoaXMuc2l6ZTtcblxuXHRcdGNvbnN0IHN0YXJ0ID0gYXJndW1lbnRzWzBdO1xuXHRcdGNvbnN0IGVuZCA9IGFyZ3VtZW50c1sxXTtcblx0XHRsZXQgcmVsYXRpdmVTdGFydCwgcmVsYXRpdmVFbmQ7XG5cdFx0aWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJlbGF0aXZlU3RhcnQgPSAwO1xuXHRcdH0gZWxzZSBpZiAoc3RhcnQgPCAwKSB7XG5cdFx0XHRyZWxhdGl2ZVN0YXJ0ID0gTWF0aC5tYXgoc2l6ZSArIHN0YXJ0LCAwKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVsYXRpdmVTdGFydCA9IE1hdGgubWluKHN0YXJ0LCBzaXplKTtcblx0XHR9XG5cdFx0aWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZWxhdGl2ZUVuZCA9IHNpemU7XG5cdFx0fSBlbHNlIGlmIChlbmQgPCAwKSB7XG5cdFx0XHRyZWxhdGl2ZUVuZCA9IE1hdGgubWF4KHNpemUgKyBlbmQsIDApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZWxhdGl2ZUVuZCA9IE1hdGgubWluKGVuZCwgc2l6ZSk7XG5cdFx0fVxuXHRcdGNvbnN0IHNwYW4gPSBNYXRoLm1heChyZWxhdGl2ZUVuZCAtIHJlbGF0aXZlU3RhcnQsIDApO1xuXG5cdFx0Y29uc3QgYnVmZmVyID0gdGhpc1tCVUZGRVJdO1xuXHRcdGNvbnN0IHNsaWNlZEJ1ZmZlciA9IGJ1ZmZlci5zbGljZShyZWxhdGl2ZVN0YXJ0LCByZWxhdGl2ZVN0YXJ0ICsgc3Bhbik7XG5cdFx0Y29uc3QgYmxvYiA9IG5ldyBCbG9iKFtdLCB7IHR5cGU6IGFyZ3VtZW50c1syXSB9KTtcblx0XHRibG9iW0JVRkZFUl0gPSBzbGljZWRCdWZmZXI7XG5cdFx0cmV0dXJuIGJsb2I7XG5cdH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQmxvYi5wcm90b3R5cGUsIHtcblx0c2l6ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHR5cGU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRzbGljZTogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQmxvYi5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuXHR2YWx1ZTogJ0Jsb2InLFxuXHR3cml0YWJsZTogZmFsc2UsXG5cdGVudW1lcmFibGU6IGZhbHNlLFxuXHRjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG4vKipcbiAqIGZldGNoLWVycm9yLmpzXG4gKlxuICogRmV0Y2hFcnJvciBpbnRlcmZhY2UgZm9yIG9wZXJhdGlvbmFsIGVycm9yc1xuICovXG5cbi8qKlxuICogQ3JlYXRlIEZldGNoRXJyb3IgaW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0gICBTdHJpbmcgICAgICBtZXNzYWdlICAgICAgRXJyb3IgbWVzc2FnZSBmb3IgaHVtYW5cbiAqIEBwYXJhbSAgIFN0cmluZyAgICAgIHR5cGUgICAgICAgICBFcnJvciB0eXBlIGZvciBtYWNoaW5lXG4gKiBAcGFyYW0gICBTdHJpbmcgICAgICBzeXN0ZW1FcnJvciAgRm9yIE5vZGUuanMgc3lzdGVtIGVycm9yXG4gKiBAcmV0dXJuICBGZXRjaEVycm9yXG4gKi9cbmZ1bmN0aW9uIEZldGNoRXJyb3IobWVzc2FnZSwgdHlwZSwgc3lzdGVtRXJyb3IpIHtcbiAgRXJyb3IuY2FsbCh0aGlzLCBtZXNzYWdlKTtcblxuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gIC8vIHdoZW4gZXJyLnR5cGUgaXMgYHN5c3RlbWAsIGVyci5jb2RlIGNvbnRhaW5zIHN5c3RlbSBlcnJvciBjb2RlXG4gIGlmIChzeXN0ZW1FcnJvcikge1xuICAgIHRoaXMuY29kZSA9IHRoaXMuZXJybm8gPSBzeXN0ZW1FcnJvci5jb2RlO1xuICB9XG5cbiAgLy8gaGlkZSBjdXN0b20gZXJyb3IgaW1wbGVtZW50YXRpb24gZGV0YWlscyBmcm9tIGVuZC11c2Vyc1xuICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbn1cblxuRmV0Y2hFcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5GZXRjaEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEZldGNoRXJyb3I7XG5GZXRjaEVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0ZldGNoRXJyb3InO1xuXG5sZXQgY29udmVydDtcbnRyeSB7XG5cdGNvbnZlcnQgPSByZXF1aXJlKCdlbmNvZGluZycpLmNvbnZlcnQ7XG59IGNhdGNoIChlKSB7fVxuXG5jb25zdCBJTlRFUk5BTFMgPSBTeW1ib2woJ0JvZHkgaW50ZXJuYWxzJyk7XG5cbi8vIGZpeCBhbiBpc3N1ZSB3aGVyZSBcIlBhc3NUaHJvdWdoXCIgaXNuJ3QgYSBuYW1lZCBleHBvcnQgZm9yIG5vZGUgPDEwXG5jb25zdCBQYXNzVGhyb3VnaCA9IFN0cmVhbS5QYXNzVGhyb3VnaDtcblxuLyoqXG4gKiBCb2R5IG1peGluXG4gKlxuICogUmVmOiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jYm9keVxuICpcbiAqIEBwYXJhbSAgIFN0cmVhbSAgYm9keSAgUmVhZGFibGUgc3RyZWFtXG4gKiBAcGFyYW0gICBPYmplY3QgIG9wdHMgIFJlc3BvbnNlIG9wdGlvbnNcbiAqIEByZXR1cm4gIFZvaWRcbiAqL1xuZnVuY3Rpb24gQm9keShib2R5KSB7XG5cdHZhciBfdGhpcyA9IHRoaXM7XG5cblx0dmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9LFxuXHQgICAgX3JlZiRzaXplID0gX3JlZi5zaXplO1xuXG5cdGxldCBzaXplID0gX3JlZiRzaXplID09PSB1bmRlZmluZWQgPyAwIDogX3JlZiRzaXplO1xuXHR2YXIgX3JlZiR0aW1lb3V0ID0gX3JlZi50aW1lb3V0O1xuXHRsZXQgdGltZW91dCA9IF9yZWYkdGltZW91dCA9PT0gdW5kZWZpbmVkID8gMCA6IF9yZWYkdGltZW91dDtcblxuXHRpZiAoYm9keSA9PSBudWxsKSB7XG5cdFx0Ly8gYm9keSBpcyB1bmRlZmluZWQgb3IgbnVsbFxuXHRcdGJvZHkgPSBudWxsO1xuXHR9IGVsc2UgaWYgKGlzVVJMU2VhcmNoUGFyYW1zKGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBhIFVSTFNlYXJjaFBhcmFtc1xuXHRcdGJvZHkgPSBCdWZmZXIuZnJvbShib2R5LnRvU3RyaW5nKCkpO1xuXHR9IGVsc2UgaWYgKGlzQmxvYihib2R5KSkgOyBlbHNlIGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIDsgZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGJvZHkpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nKSB7XG5cdFx0Ly8gYm9keSBpcyBBcnJheUJ1ZmZlclxuXHRcdGJvZHkgPSBCdWZmZXIuZnJvbShib2R5KTtcblx0fSBlbHNlIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoYm9keSkpIHtcblx0XHQvLyBib2R5IGlzIEFycmF5QnVmZmVyVmlld1xuXHRcdGJvZHkgPSBCdWZmZXIuZnJvbShib2R5LmJ1ZmZlciwgYm9keS5ieXRlT2Zmc2V0LCBib2R5LmJ5dGVMZW5ndGgpO1xuXHR9IGVsc2UgaWYgKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0pIDsgZWxzZSB7XG5cdFx0Ly8gbm9uZSBvZiB0aGUgYWJvdmVcblx0XHQvLyBjb2VyY2UgdG8gc3RyaW5nIHRoZW4gYnVmZmVyXG5cdFx0Ym9keSA9IEJ1ZmZlci5mcm9tKFN0cmluZyhib2R5KSk7XG5cdH1cblx0dGhpc1tJTlRFUk5BTFNdID0ge1xuXHRcdGJvZHksXG5cdFx0ZGlzdHVyYmVkOiBmYWxzZSxcblx0XHRlcnJvcjogbnVsbFxuXHR9O1xuXHR0aGlzLnNpemUgPSBzaXplO1xuXHR0aGlzLnRpbWVvdXQgPSB0aW1lb3V0O1xuXG5cdGlmIChib2R5IGluc3RhbmNlb2YgU3RyZWFtKSB7XG5cdFx0Ym9keS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRjb25zdCBlcnJvciA9IGVyci5uYW1lID09PSAnQWJvcnRFcnJvcicgPyBlcnIgOiBuZXcgRmV0Y2hFcnJvcihgSW52YWxpZCByZXNwb25zZSBib2R5IHdoaWxlIHRyeWluZyB0byBmZXRjaCAke190aGlzLnVybH06ICR7ZXJyLm1lc3NhZ2V9YCwgJ3N5c3RlbScsIGVycik7XG5cdFx0XHRfdGhpc1tJTlRFUk5BTFNdLmVycm9yID0gZXJyb3I7XG5cdFx0fSk7XG5cdH1cbn1cblxuQm9keS5wcm90b3R5cGUgPSB7XG5cdGdldCBib2R5KCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uYm9keTtcblx0fSxcblxuXHRnZXQgYm9keVVzZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTXS5kaXN0dXJiZWQ7XG5cdH0sXG5cblx0LyoqXG4gICogRGVjb2RlIHJlc3BvbnNlIGFzIEFycmF5QnVmZmVyXG4gICpcbiAgKiBAcmV0dXJuICBQcm9taXNlXG4gICovXG5cdGFycmF5QnVmZmVyKCkge1xuXHRcdHJldHVybiBjb25zdW1lQm9keS5jYWxsKHRoaXMpLnRoZW4oZnVuY3Rpb24gKGJ1Zikge1xuXHRcdFx0cmV0dXJuIGJ1Zi5idWZmZXIuc2xpY2UoYnVmLmJ5dGVPZmZzZXQsIGJ1Zi5ieXRlT2Zmc2V0ICsgYnVmLmJ5dGVMZW5ndGgpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qKlxuICAqIFJldHVybiByYXcgcmVzcG9uc2UgYXMgQmxvYlxuICAqXG4gICogQHJldHVybiBQcm9taXNlXG4gICovXG5cdGJsb2IoKSB7XG5cdFx0bGV0IGN0ID0gdGhpcy5oZWFkZXJzICYmIHRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpIHx8ICcnO1xuXHRcdHJldHVybiBjb25zdW1lQm9keS5jYWxsKHRoaXMpLnRoZW4oZnVuY3Rpb24gKGJ1Zikge1xuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oXG5cdFx0XHQvLyBQcmV2ZW50IGNvcHlpbmdcblx0XHRcdG5ldyBCbG9iKFtdLCB7XG5cdFx0XHRcdHR5cGU6IGN0LnRvTG93ZXJDYXNlKClcblx0XHRcdH0pLCB7XG5cdFx0XHRcdFtCVUZGRVJdOiBidWZcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qKlxuICAqIERlY29kZSByZXNwb25zZSBhcyBqc29uXG4gICpcbiAgKiBAcmV0dXJuICBQcm9taXNlXG4gICovXG5cdGpzb24oKSB7XG5cdFx0dmFyIF90aGlzMiA9IHRoaXM7XG5cblx0XHRyZXR1cm4gY29uc3VtZUJvZHkuY2FsbCh0aGlzKS50aGVuKGZ1bmN0aW9uIChidWZmZXIpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJldHVybiBKU09OLnBhcnNlKGJ1ZmZlci50b1N0cmluZygpKTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRyZXR1cm4gQm9keS5Qcm9taXNlLnJlamVjdChuZXcgRmV0Y2hFcnJvcihgaW52YWxpZCBqc29uIHJlc3BvbnNlIGJvZHkgYXQgJHtfdGhpczIudXJsfSByZWFzb246ICR7ZXJyLm1lc3NhZ2V9YCwgJ2ludmFsaWQtanNvbicpKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHQvKipcbiAgKiBEZWNvZGUgcmVzcG9uc2UgYXMgdGV4dFxuICAqXG4gICogQHJldHVybiAgUHJvbWlzZVxuICAqL1xuXHR0ZXh0KCkge1xuXHRcdHJldHVybiBjb25zdW1lQm9keS5jYWxsKHRoaXMpLnRoZW4oZnVuY3Rpb24gKGJ1ZmZlcikge1xuXHRcdFx0cmV0dXJuIGJ1ZmZlci50b1N0cmluZygpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qKlxuICAqIERlY29kZSByZXNwb25zZSBhcyBidWZmZXIgKG5vbi1zcGVjIGFwaSlcbiAgKlxuICAqIEByZXR1cm4gIFByb21pc2VcbiAgKi9cblx0YnVmZmVyKCkge1xuXHRcdHJldHVybiBjb25zdW1lQm9keS5jYWxsKHRoaXMpO1xuXHR9LFxuXG5cdC8qKlxuICAqIERlY29kZSByZXNwb25zZSBhcyB0ZXh0LCB3aGlsZSBhdXRvbWF0aWNhbGx5IGRldGVjdGluZyB0aGUgZW5jb2RpbmcgYW5kXG4gICogdHJ5aW5nIHRvIGRlY29kZSB0byBVVEYtOCAobm9uLXNwZWMgYXBpKVxuICAqXG4gICogQHJldHVybiAgUHJvbWlzZVxuICAqL1xuXHR0ZXh0Q29udmVydGVkKCkge1xuXHRcdHZhciBfdGhpczMgPSB0aGlzO1xuXG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcykudGhlbihmdW5jdGlvbiAoYnVmZmVyKSB7XG5cdFx0XHRyZXR1cm4gY29udmVydEJvZHkoYnVmZmVyLCBfdGhpczMuaGVhZGVycyk7XG5cdFx0fSk7XG5cdH1cbn07XG5cbi8vIEluIGJyb3dzZXJzLCBhbGwgcHJvcGVydGllcyBhcmUgZW51bWVyYWJsZS5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEJvZHkucHJvdG90eXBlLCB7XG5cdGJvZHk6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRib2R5VXNlZDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGFycmF5QnVmZmVyOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0YmxvYjogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGpzb246IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHR0ZXh0OiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5cbkJvZHkubWl4SW4gPSBmdW5jdGlvbiAocHJvdG8pIHtcblx0Zm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKEJvZHkucHJvdG90eXBlKSkge1xuXHRcdC8vIGlzdGFuYnVsIGlnbm9yZSBlbHNlOiBmdXR1cmUgcHJvb2Zcblx0XHRpZiAoIShuYW1lIGluIHByb3RvKSkge1xuXHRcdFx0Y29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoQm9keS5wcm90b3R5cGUsIG5hbWUpO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCBuYW1lLCBkZXNjKTtcblx0XHR9XG5cdH1cbn07XG5cbi8qKlxuICogQ29uc3VtZSBhbmQgY29udmVydCBhbiBlbnRpcmUgQm9keSB0byBhIEJ1ZmZlci5cbiAqXG4gKiBSZWY6IGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNjb25jZXB0LWJvZHktY29uc3VtZS1ib2R5XG4gKlxuICogQHJldHVybiAgUHJvbWlzZVxuICovXG5mdW5jdGlvbiBjb25zdW1lQm9keSgpIHtcblx0dmFyIF90aGlzNCA9IHRoaXM7XG5cblx0aWYgKHRoaXNbSU5URVJOQUxTXS5kaXN0dXJiZWQpIHtcblx0XHRyZXR1cm4gQm9keS5Qcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKGBib2R5IHVzZWQgYWxyZWFkeSBmb3I6ICR7dGhpcy51cmx9YCkpO1xuXHR9XG5cblx0dGhpc1tJTlRFUk5BTFNdLmRpc3R1cmJlZCA9IHRydWU7XG5cblx0aWYgKHRoaXNbSU5URVJOQUxTXS5lcnJvcikge1xuXHRcdHJldHVybiBCb2R5LlByb21pc2UucmVqZWN0KHRoaXNbSU5URVJOQUxTXS5lcnJvcik7XG5cdH1cblxuXHRsZXQgYm9keSA9IHRoaXMuYm9keTtcblxuXHQvLyBib2R5IGlzIG51bGxcblx0aWYgKGJvZHkgPT09IG51bGwpIHtcblx0XHRyZXR1cm4gQm9keS5Qcm9taXNlLnJlc29sdmUoQnVmZmVyLmFsbG9jKDApKTtcblx0fVxuXG5cdC8vIGJvZHkgaXMgYmxvYlxuXHRpZiAoaXNCbG9iKGJvZHkpKSB7XG5cdFx0Ym9keSA9IGJvZHkuc3RyZWFtKCk7XG5cdH1cblxuXHQvLyBib2R5IGlzIGJ1ZmZlclxuXHRpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSB7XG5cdFx0cmV0dXJuIEJvZHkuUHJvbWlzZS5yZXNvbHZlKGJvZHkpO1xuXHR9XG5cblx0Ly8gaXN0YW5idWwgaWdub3JlIGlmOiBzaG91bGQgbmV2ZXIgaGFwcGVuXG5cdGlmICghKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0pKSB7XG5cdFx0cmV0dXJuIEJvZHkuUHJvbWlzZS5yZXNvbHZlKEJ1ZmZlci5hbGxvYygwKSk7XG5cdH1cblxuXHQvLyBib2R5IGlzIHN0cmVhbVxuXHQvLyBnZXQgcmVhZHkgdG8gYWN0dWFsbHkgY29uc3VtZSB0aGUgYm9keVxuXHRsZXQgYWNjdW0gPSBbXTtcblx0bGV0IGFjY3VtQnl0ZXMgPSAwO1xuXHRsZXQgYWJvcnQgPSBmYWxzZTtcblxuXHRyZXR1cm4gbmV3IEJvZHkuUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0bGV0IHJlc1RpbWVvdXQ7XG5cblx0XHQvLyBhbGxvdyB0aW1lb3V0IG9uIHNsb3cgcmVzcG9uc2UgYm9keVxuXHRcdGlmIChfdGhpczQudGltZW91dCkge1xuXHRcdFx0cmVzVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRhYm9ydCA9IHRydWU7XG5cdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgUmVzcG9uc2UgdGltZW91dCB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggJHtfdGhpczQudXJsfSAob3ZlciAke190aGlzNC50aW1lb3V0fW1zKWAsICdib2R5LXRpbWVvdXQnKSk7XG5cdFx0XHR9LCBfdGhpczQudGltZW91dCk7XG5cdFx0fVxuXG5cdFx0Ly8gaGFuZGxlIHN0cmVhbSBlcnJvcnNcblx0XHRib2R5Lm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdGlmIChlcnIubmFtZSA9PT0gJ0Fib3J0RXJyb3InKSB7XG5cdFx0XHRcdC8vIGlmIHRoZSByZXF1ZXN0IHdhcyBhYm9ydGVkLCByZWplY3Qgd2l0aCB0aGlzIEVycm9yXG5cdFx0XHRcdGFib3J0ID0gdHJ1ZTtcblx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBvdGhlciBlcnJvcnMsIHN1Y2ggYXMgaW5jb3JyZWN0IGNvbnRlbnQtZW5jb2Rpbmdcblx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBJbnZhbGlkIHJlc3BvbnNlIGJvZHkgd2hpbGUgdHJ5aW5nIHRvIGZldGNoICR7X3RoaXM0LnVybH06ICR7ZXJyLm1lc3NhZ2V9YCwgJ3N5c3RlbScsIGVycikpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ym9keS5vbignZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xuXHRcdFx0aWYgKGFib3J0IHx8IGNodW5rID09PSBudWxsKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKF90aGlzNC5zaXplICYmIGFjY3VtQnl0ZXMgKyBjaHVuay5sZW5ndGggPiBfdGhpczQuc2l6ZSkge1xuXHRcdFx0XHRhYm9ydCA9IHRydWU7XG5cdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgY29udGVudCBzaXplIGF0ICR7X3RoaXM0LnVybH0gb3ZlciBsaW1pdDogJHtfdGhpczQuc2l6ZX1gLCAnbWF4LXNpemUnKSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0YWNjdW1CeXRlcyArPSBjaHVuay5sZW5ndGg7XG5cdFx0XHRhY2N1bS5wdXNoKGNodW5rKTtcblx0XHR9KTtcblxuXHRcdGJvZHkub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChhYm9ydCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGNsZWFyVGltZW91dChyZXNUaW1lb3V0KTtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0cmVzb2x2ZShCdWZmZXIuY29uY2F0KGFjY3VtLCBhY2N1bUJ5dGVzKSk7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0Ly8gaGFuZGxlIHN0cmVhbXMgdGhhdCBoYXZlIGFjY3VtdWxhdGVkIHRvbyBtdWNoIGRhdGEgKGlzc3VlICM0MTQpXG5cdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgQ291bGQgbm90IGNyZWF0ZSBCdWZmZXIgZnJvbSByZXNwb25zZSBib2R5IGZvciAke190aGlzNC51cmx9OiAke2Vyci5tZXNzYWdlfWAsICdzeXN0ZW0nLCBlcnIpKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59XG5cbi8qKlxuICogRGV0ZWN0IGJ1ZmZlciBlbmNvZGluZyBhbmQgY29udmVydCB0byB0YXJnZXQgZW5jb2RpbmdcbiAqIHJlZjogaHR0cDovL3d3dy53My5vcmcvVFIvMjAxMS9XRC1odG1sNS0yMDExMDExMy9wYXJzaW5nLmh0bWwjZGV0ZXJtaW5pbmctdGhlLWNoYXJhY3Rlci1lbmNvZGluZ1xuICpcbiAqIEBwYXJhbSAgIEJ1ZmZlciAgYnVmZmVyICAgIEluY29taW5nIGJ1ZmZlclxuICogQHBhcmFtICAgU3RyaW5nICBlbmNvZGluZyAgVGFyZ2V0IGVuY29kaW5nXG4gKiBAcmV0dXJuICBTdHJpbmdcbiAqL1xuZnVuY3Rpb24gY29udmVydEJvZHkoYnVmZmVyLCBoZWFkZXJzKSB7XG5cdGlmICh0eXBlb2YgY29udmVydCAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHRocm93IG5ldyBFcnJvcignVGhlIHBhY2thZ2UgYGVuY29kaW5nYCBtdXN0IGJlIGluc3RhbGxlZCB0byB1c2UgdGhlIHRleHRDb252ZXJ0ZWQoKSBmdW5jdGlvbicpO1xuXHR9XG5cblx0Y29uc3QgY3QgPSBoZWFkZXJzLmdldCgnY29udGVudC10eXBlJyk7XG5cdGxldCBjaGFyc2V0ID0gJ3V0Zi04Jztcblx0bGV0IHJlcywgc3RyO1xuXG5cdC8vIGhlYWRlclxuXHRpZiAoY3QpIHtcblx0XHRyZXMgPSAvY2hhcnNldD0oW147XSopL2kuZXhlYyhjdCk7XG5cdH1cblxuXHQvLyBubyBjaGFyc2V0IGluIGNvbnRlbnQgdHlwZSwgcGVlayBhdCByZXNwb25zZSBib2R5IGZvciBhdCBtb3N0IDEwMjQgYnl0ZXNcblx0c3RyID0gYnVmZmVyLnNsaWNlKDAsIDEwMjQpLnRvU3RyaW5nKCk7XG5cblx0Ly8gaHRtbDVcblx0aWYgKCFyZXMgJiYgc3RyKSB7XG5cdFx0cmVzID0gLzxtZXRhLis/Y2hhcnNldD0oWydcIl0pKC4rPylcXDEvaS5leGVjKHN0cik7XG5cdH1cblxuXHQvLyBodG1sNFxuXHRpZiAoIXJlcyAmJiBzdHIpIHtcblx0XHRyZXMgPSAvPG1ldGFbXFxzXSs/aHR0cC1lcXVpdj0oWydcIl0pY29udGVudC10eXBlXFwxW1xcc10rP2NvbnRlbnQ9KFsnXCJdKSguKz8pXFwyL2kuZXhlYyhzdHIpO1xuXG5cdFx0aWYgKHJlcykge1xuXHRcdFx0cmVzID0gL2NoYXJzZXQ9KC4qKS9pLmV4ZWMocmVzLnBvcCgpKTtcblx0XHR9XG5cdH1cblxuXHQvLyB4bWxcblx0aWYgKCFyZXMgJiYgc3RyKSB7XG5cdFx0cmVzID0gLzxcXD94bWwuKz9lbmNvZGluZz0oWydcIl0pKC4rPylcXDEvaS5leGVjKHN0cik7XG5cdH1cblxuXHQvLyBmb3VuZCBjaGFyc2V0XG5cdGlmIChyZXMpIHtcblx0XHRjaGFyc2V0ID0gcmVzLnBvcCgpO1xuXG5cdFx0Ly8gcHJldmVudCBkZWNvZGUgaXNzdWVzIHdoZW4gc2l0ZXMgdXNlIGluY29ycmVjdCBlbmNvZGluZ1xuXHRcdC8vIHJlZjogaHR0cHM6Ly9oc2l2b25lbi5maS9lbmNvZGluZy1tZW51L1xuXHRcdGlmIChjaGFyc2V0ID09PSAnZ2IyMzEyJyB8fCBjaGFyc2V0ID09PSAnZ2JrJykge1xuXHRcdFx0Y2hhcnNldCA9ICdnYjE4MDMwJztcblx0XHR9XG5cdH1cblxuXHQvLyB0dXJuIHJhdyBidWZmZXJzIGludG8gYSBzaW5nbGUgdXRmLTggYnVmZmVyXG5cdHJldHVybiBjb252ZXJ0KGJ1ZmZlciwgJ1VURi04JywgY2hhcnNldCkudG9TdHJpbmcoKTtcbn1cblxuLyoqXG4gKiBEZXRlY3QgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKiByZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9iaXRpbm4vbm9kZS1mZXRjaC9pc3N1ZXMvMjk2I2lzc3VlY29tbWVudC0zMDc1OTgxNDNcbiAqXG4gKiBAcGFyYW0gICBPYmplY3QgIG9iaiAgICAgT2JqZWN0IHRvIGRldGVjdCBieSB0eXBlIG9yIGJyYW5kXG4gKiBAcmV0dXJuICBTdHJpbmdcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXMob2JqKSB7XG5cdC8vIER1Y2stdHlwaW5nIGFzIGEgbmVjZXNzYXJ5IGNvbmRpdGlvbi5cblx0aWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IHR5cGVvZiBvYmouYXBwZW5kICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvYmouZGVsZXRlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvYmouZ2V0ICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvYmouZ2V0QWxsICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvYmouaGFzICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvYmouc2V0ICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gQnJhbmQtY2hlY2tpbmcgYW5kIG1vcmUgZHVjay10eXBpbmcgYXMgb3B0aW9uYWwgY29uZGl0aW9uLlxuXHRyZXR1cm4gb2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdVUkxTZWFyY2hQYXJhbXMnIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBVUkxTZWFyY2hQYXJhbXNdJyB8fCB0eXBlb2Ygb2JqLnNvcnQgPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYSBXM0MgYEJsb2JgIG9iamVjdCAod2hpY2ggYEZpbGVgIGluaGVyaXRzIGZyb20pXG4gKiBAcGFyYW0gIHsqfSBvYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzQmxvYihvYmopIHtcblx0cmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmouYXJyYXlCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai50eXBlID09PSAnc3RyaW5nJyAmJiB0eXBlb2Ygb2JqLnN0cmVhbSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouY29uc3RydWN0b3IubmFtZSA9PT0gJ3N0cmluZycgJiYgL14oQmxvYnxGaWxlKSQvLnRlc3Qob2JqLmNvbnN0cnVjdG9yLm5hbWUpICYmIC9eKEJsb2J8RmlsZSkkLy50ZXN0KG9ialtTeW1ib2wudG9TdHJpbmdUYWddKTtcbn1cblxuLyoqXG4gKiBDbG9uZSBib2R5IGdpdmVuIFJlcy9SZXEgaW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0gICBNaXhlZCAgaW5zdGFuY2UgIFJlc3BvbnNlIG9yIFJlcXVlc3QgaW5zdGFuY2VcbiAqIEByZXR1cm4gIE1peGVkXG4gKi9cbmZ1bmN0aW9uIGNsb25lKGluc3RhbmNlKSB7XG5cdGxldCBwMSwgcDI7XG5cdGxldCBib2R5ID0gaW5zdGFuY2UuYm9keTtcblxuXHQvLyBkb24ndCBhbGxvdyBjbG9uaW5nIGEgdXNlZCBib2R5XG5cdGlmIChpbnN0YW5jZS5ib2R5VXNlZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignY2Fubm90IGNsb25lIGJvZHkgYWZ0ZXIgaXQgaXMgdXNlZCcpO1xuXHR9XG5cblx0Ly8gY2hlY2sgdGhhdCBib2R5IGlzIGEgc3RyZWFtIGFuZCBub3QgZm9ybS1kYXRhIG9iamVjdFxuXHQvLyBub3RlOiB3ZSBjYW4ndCBjbG9uZSB0aGUgZm9ybS1kYXRhIG9iamVjdCB3aXRob3V0IGhhdmluZyBpdCBhcyBhIGRlcGVuZGVuY3lcblx0aWYgKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0gJiYgdHlwZW9mIGJvZHkuZ2V0Qm91bmRhcnkgIT09ICdmdW5jdGlvbicpIHtcblx0XHQvLyB0ZWUgaW5zdGFuY2UgYm9keVxuXHRcdHAxID0gbmV3IFBhc3NUaHJvdWdoKCk7XG5cdFx0cDIgPSBuZXcgUGFzc1Rocm91Z2goKTtcblx0XHRib2R5LnBpcGUocDEpO1xuXHRcdGJvZHkucGlwZShwMik7XG5cdFx0Ly8gc2V0IGluc3RhbmNlIGJvZHkgdG8gdGVlZCBib2R5IGFuZCByZXR1cm4gdGhlIG90aGVyIHRlZWQgYm9keVxuXHRcdGluc3RhbmNlW0lOVEVSTkFMU10uYm9keSA9IHAxO1xuXHRcdGJvZHkgPSBwMjtcblx0fVxuXG5cdHJldHVybiBib2R5O1xufVxuXG4vKipcbiAqIFBlcmZvcm1zIHRoZSBvcGVyYXRpb24gXCJleHRyYWN0IGEgYENvbnRlbnQtVHlwZWAgdmFsdWUgZnJvbSB8b2JqZWN0fFwiIGFzXG4gKiBzcGVjaWZpZWQgaW4gdGhlIHNwZWNpZmljYXRpb246XG4gKiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jY29uY2VwdC1ib2R5aW5pdC1leHRyYWN0XG4gKlxuICogVGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgaW5zdGFuY2UuYm9keSBpcyBwcmVzZW50LlxuICpcbiAqIEBwYXJhbSAgIE1peGVkICBpbnN0YW5jZSAgQW55IG9wdGlvbnMuYm9keSBpbnB1dFxuICovXG5mdW5jdGlvbiBleHRyYWN0Q29udGVudFR5cGUoYm9keSkge1xuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdC8vIGJvZHkgaXMgbnVsbFxuXHRcdHJldHVybiBudWxsO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuXHRcdC8vIGJvZHkgaXMgc3RyaW5nXG5cdFx0cmV0dXJuICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnO1xuXHR9IGVsc2UgaWYgKGlzVVJMU2VhcmNoUGFyYW1zKGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBhIFVSTFNlYXJjaFBhcmFtc1xuXHRcdHJldHVybiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnO1xuXHR9IGVsc2UgaWYgKGlzQmxvYihib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgYmxvYlxuXHRcdHJldHVybiBib2R5LnR5cGUgfHwgbnVsbDtcblx0fSBlbHNlIGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcblx0XHQvLyBib2R5IGlzIGJ1ZmZlclxuXHRcdHJldHVybiBudWxsO1xuXHR9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChib2R5KSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJykge1xuXHRcdC8vIGJvZHkgaXMgQXJyYXlCdWZmZXJcblx0XHRyZXR1cm4gbnVsbDtcblx0fSBlbHNlIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoYm9keSkpIHtcblx0XHQvLyBib2R5IGlzIEFycmF5QnVmZmVyVmlld1xuXHRcdHJldHVybiBudWxsO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBib2R5LmdldEJvdW5kYXJ5ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0Ly8gZGV0ZWN0IGZvcm0gZGF0YSBpbnB1dCBmcm9tIGZvcm0tZGF0YSBtb2R1bGVcblx0XHRyZXR1cm4gYG11bHRpcGFydC9mb3JtLWRhdGE7Ym91bmRhcnk9JHtib2R5LmdldEJvdW5kYXJ5KCl9YDtcblx0fSBlbHNlIGlmIChib2R5IGluc3RhbmNlb2YgU3RyZWFtKSB7XG5cdFx0Ly8gYm9keSBpcyBzdHJlYW1cblx0XHQvLyBjYW4ndCByZWFsbHkgZG8gbXVjaCBhYm91dCB0aGlzXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gQm9keSBjb25zdHJ1Y3RvciBkZWZhdWx0cyBvdGhlciB0aGluZ3MgdG8gc3RyaW5nXG5cdFx0cmV0dXJuICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnO1xuXHR9XG59XG5cbi8qKlxuICogVGhlIEZldGNoIFN0YW5kYXJkIHRyZWF0cyB0aGlzIGFzIGlmIFwidG90YWwgYnl0ZXNcIiBpcyBhIHByb3BlcnR5IG9uIHRoZSBib2R5LlxuICogRm9yIHVzLCB3ZSBoYXZlIHRvIGV4cGxpY2l0bHkgZ2V0IGl0IHdpdGggYSBmdW5jdGlvbi5cbiAqXG4gKiByZWY6IGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNjb25jZXB0LWJvZHktdG90YWwtYnl0ZXNcbiAqXG4gKiBAcGFyYW0gICBCb2R5ICAgIGluc3RhbmNlICAgSW5zdGFuY2Ugb2YgQm9keVxuICogQHJldHVybiAgTnVtYmVyPyAgICAgICAgICAgIE51bWJlciBvZiBieXRlcywgb3IgbnVsbCBpZiBub3QgcG9zc2libGVcbiAqL1xuZnVuY3Rpb24gZ2V0VG90YWxCeXRlcyhpbnN0YW5jZSkge1xuXHRjb25zdCBib2R5ID0gaW5zdGFuY2UuYm9keTtcblxuXG5cdGlmIChib2R5ID09PSBudWxsKSB7XG5cdFx0Ly8gYm9keSBpcyBudWxsXG5cdFx0cmV0dXJuIDA7XG5cdH0gZWxzZSBpZiAoaXNCbG9iKGJvZHkpKSB7XG5cdFx0cmV0dXJuIGJvZHkuc2l6ZTtcblx0fSBlbHNlIGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcblx0XHQvLyBib2R5IGlzIGJ1ZmZlclxuXHRcdHJldHVybiBib2R5Lmxlbmd0aDtcblx0fSBlbHNlIGlmIChib2R5ICYmIHR5cGVvZiBib2R5LmdldExlbmd0aFN5bmMgPT09ICdmdW5jdGlvbicpIHtcblx0XHQvLyBkZXRlY3QgZm9ybSBkYXRhIGlucHV0IGZyb20gZm9ybS1kYXRhIG1vZHVsZVxuXHRcdGlmIChib2R5Ll9sZW5ndGhSZXRyaWV2ZXJzICYmIGJvZHkuX2xlbmd0aFJldHJpZXZlcnMubGVuZ3RoID09IDAgfHwgLy8gMS54XG5cdFx0Ym9keS5oYXNLbm93bkxlbmd0aCAmJiBib2R5Lmhhc0tub3duTGVuZ3RoKCkpIHtcblx0XHRcdC8vIDIueFxuXHRcdFx0cmV0dXJuIGJvZHkuZ2V0TGVuZ3RoU3luYygpO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fSBlbHNlIHtcblx0XHQvLyBib2R5IGlzIHN0cmVhbVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG59XG5cbi8qKlxuICogV3JpdGUgYSBCb2R5IHRvIGEgTm9kZS5qcyBXcml0YWJsZVN0cmVhbSAoZS5nLiBodHRwLlJlcXVlc3QpIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gICBCb2R5ICAgIGluc3RhbmNlICAgSW5zdGFuY2Ugb2YgQm9keVxuICogQHJldHVybiAgVm9pZFxuICovXG5mdW5jdGlvbiB3cml0ZVRvU3RyZWFtKGRlc3QsIGluc3RhbmNlKSB7XG5cdGNvbnN0IGJvZHkgPSBpbnN0YW5jZS5ib2R5O1xuXG5cblx0aWYgKGJvZHkgPT09IG51bGwpIHtcblx0XHQvLyBib2R5IGlzIG51bGxcblx0XHRkZXN0LmVuZCgpO1xuXHR9IGVsc2UgaWYgKGlzQmxvYihib2R5KSkge1xuXHRcdGJvZHkuc3RyZWFtKCkucGlwZShkZXN0KTtcblx0fSBlbHNlIGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcblx0XHQvLyBib2R5IGlzIGJ1ZmZlclxuXHRcdGRlc3Qud3JpdGUoYm9keSk7XG5cdFx0ZGVzdC5lbmQoKTtcblx0fSBlbHNlIHtcblx0XHQvLyBib2R5IGlzIHN0cmVhbVxuXHRcdGJvZHkucGlwZShkZXN0KTtcblx0fVxufVxuXG4vLyBleHBvc2UgUHJvbWlzZVxuQm9keS5Qcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG5cbi8qKlxuICogaGVhZGVycy5qc1xuICpcbiAqIEhlYWRlcnMgY2xhc3Mgb2ZmZXJzIGNvbnZlbmllbnQgaGVscGVyc1xuICovXG5cbmNvbnN0IGludmFsaWRUb2tlblJlZ2V4ID0gL1teXFxeX2BhLXpBLVpcXC0wLTkhIyQlJicqKy58fl0vO1xuY29uc3QgaW52YWxpZEhlYWRlckNoYXJSZWdleCA9IC9bXlxcdFxceDIwLVxceDdlXFx4ODAtXFx4ZmZdLztcblxuZnVuY3Rpb24gdmFsaWRhdGVOYW1lKG5hbWUpIHtcblx0bmFtZSA9IGAke25hbWV9YDtcblx0aWYgKGludmFsaWRUb2tlblJlZ2V4LnRlc3QobmFtZSkgfHwgbmFtZSA9PT0gJycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGAke25hbWV9IGlzIG5vdCBhIGxlZ2FsIEhUVFAgaGVhZGVyIG5hbWVgKTtcblx0fVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVZhbHVlKHZhbHVlKSB7XG5cdHZhbHVlID0gYCR7dmFsdWV9YDtcblx0aWYgKGludmFsaWRIZWFkZXJDaGFyUmVnZXgudGVzdCh2YWx1ZSkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGAke3ZhbHVlfSBpcyBub3QgYSBsZWdhbCBIVFRQIGhlYWRlciB2YWx1ZWApO1xuXHR9XG59XG5cbi8qKlxuICogRmluZCB0aGUga2V5IGluIHRoZSBtYXAgb2JqZWN0IGdpdmVuIGEgaGVhZGVyIG5hbWUuXG4gKlxuICogUmV0dXJucyB1bmRlZmluZWQgaWYgbm90IGZvdW5kLlxuICpcbiAqIEBwYXJhbSAgIFN0cmluZyAgbmFtZSAgSGVhZGVyIG5hbWVcbiAqIEByZXR1cm4gIFN0cmluZ3xVbmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gZmluZChtYXAsIG5hbWUpIHtcblx0bmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblx0Zm9yIChjb25zdCBrZXkgaW4gbWFwKSB7XG5cdFx0aWYgKGtleS50b0xvd2VyQ2FzZSgpID09PSBuYW1lKSB7XG5cdFx0XHRyZXR1cm4ga2V5O1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5jb25zdCBNQVAgPSBTeW1ib2woJ21hcCcpO1xuY2xhc3MgSGVhZGVycyB7XG5cdC8qKlxuICAqIEhlYWRlcnMgY2xhc3NcbiAgKlxuICAqIEBwYXJhbSAgIE9iamVjdCAgaGVhZGVycyAgUmVzcG9uc2UgaGVhZGVyc1xuICAqIEByZXR1cm4gIFZvaWRcbiAgKi9cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0bGV0IGluaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZDtcblxuXHRcdHRoaXNbTUFQXSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cblx0XHRpZiAoaW5pdCBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcblx0XHRcdGNvbnN0IHJhd0hlYWRlcnMgPSBpbml0LnJhdygpO1xuXHRcdFx0Y29uc3QgaGVhZGVyTmFtZXMgPSBPYmplY3Qua2V5cyhyYXdIZWFkZXJzKTtcblxuXHRcdFx0Zm9yIChjb25zdCBoZWFkZXJOYW1lIG9mIGhlYWRlck5hbWVzKSB7XG5cdFx0XHRcdGZvciAoY29uc3QgdmFsdWUgb2YgcmF3SGVhZGVyc1toZWFkZXJOYW1lXSkge1xuXHRcdFx0XHRcdHRoaXMuYXBwZW5kKGhlYWRlck5hbWUsIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gV2UgZG9uJ3Qgd29ycnkgYWJvdXQgY29udmVydGluZyBwcm9wIHRvIEJ5dGVTdHJpbmcgaGVyZSBhcyBhcHBlbmQoKVxuXHRcdC8vIHdpbGwgaGFuZGxlIGl0LlxuXHRcdGlmIChpbml0ID09IG51bGwpIDsgZWxzZSBpZiAodHlwZW9mIGluaXQgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRjb25zdCBtZXRob2QgPSBpbml0W1N5bWJvbC5pdGVyYXRvcl07XG5cdFx0XHRpZiAobWV0aG9kICE9IG51bGwpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBtZXRob2QgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdIZWFkZXIgcGFpcnMgbXVzdCBiZSBpdGVyYWJsZScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gc2VxdWVuY2U8c2VxdWVuY2U8Qnl0ZVN0cmluZz4+XG5cdFx0XHRcdC8vIE5vdGU6IHBlciBzcGVjIHdlIGhhdmUgdG8gZmlyc3QgZXhoYXVzdCB0aGUgbGlzdHMgdGhlbiBwcm9jZXNzIHRoZW1cblx0XHRcdFx0Y29uc3QgcGFpcnMgPSBbXTtcblx0XHRcdFx0Zm9yIChjb25zdCBwYWlyIG9mIGluaXQpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHBhaXIgIT09ICdvYmplY3QnIHx8IHR5cGVvZiBwYWlyW1N5bWJvbC5pdGVyYXRvcl0gIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0VhY2ggaGVhZGVyIHBhaXIgbXVzdCBiZSBpdGVyYWJsZScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwYWlycy5wdXNoKEFycmF5LmZyb20ocGFpcikpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yIChjb25zdCBwYWlyIG9mIHBhaXJzKSB7XG5cdFx0XHRcdFx0aWYgKHBhaXIubGVuZ3RoICE9PSAyKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFYWNoIGhlYWRlciBwYWlyIG11c3QgYmUgYSBuYW1lL3ZhbHVlIHR1cGxlJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kKHBhaXJbMF0sIHBhaXJbMV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyByZWNvcmQ8Qnl0ZVN0cmluZywgQnl0ZVN0cmluZz5cblx0XHRcdFx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoaW5pdCkpIHtcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IGluaXRba2V5XTtcblx0XHRcdFx0XHR0aGlzLmFwcGVuZChrZXksIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm92aWRlZCBpbml0aWFsaXplciBtdXN0IGJlIGFuIG9iamVjdCcpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuICAqIFJldHVybiBjb21iaW5lZCBoZWFkZXIgdmFsdWUgZ2l2ZW4gbmFtZVxuICAqXG4gICogQHBhcmFtICAgU3RyaW5nICBuYW1lICBIZWFkZXIgbmFtZVxuICAqIEByZXR1cm4gIE1peGVkXG4gICovXG5cdGdldChuYW1lKSB7XG5cdFx0bmFtZSA9IGAke25hbWV9YDtcblx0XHR2YWxpZGF0ZU5hbWUobmFtZSk7XG5cdFx0Y29uc3Qga2V5ID0gZmluZCh0aGlzW01BUF0sIG5hbWUpO1xuXHRcdGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXNbTUFQXVtrZXldLmpvaW4oJywgJyk7XG5cdH1cblxuXHQvKipcbiAgKiBJdGVyYXRlIG92ZXIgYWxsIGhlYWRlcnNcbiAgKlxuICAqIEBwYXJhbSAgIEZ1bmN0aW9uICBjYWxsYmFjayAgRXhlY3V0ZWQgZm9yIGVhY2ggaXRlbSB3aXRoIHBhcmFtZXRlcnMgKHZhbHVlLCBuYW1lLCB0aGlzQXJnKVxuICAqIEBwYXJhbSAgIEJvb2xlYW4gICB0aGlzQXJnICAgYHRoaXNgIGNvbnRleHQgZm9yIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICogQHJldHVybiAgVm9pZFxuICAqL1xuXHRmb3JFYWNoKGNhbGxiYWNrKSB7XG5cdFx0bGV0IHRoaXNBcmcgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcblxuXHRcdGxldCBwYWlycyA9IGdldEhlYWRlcnModGhpcyk7XG5cdFx0bGV0IGkgPSAwO1xuXHRcdHdoaWxlIChpIDwgcGFpcnMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgX3BhaXJzJGkgPSBwYWlyc1tpXTtcblx0XHRcdGNvbnN0IG5hbWUgPSBfcGFpcnMkaVswXSxcblx0XHRcdCAgICAgIHZhbHVlID0gX3BhaXJzJGlbMV07XG5cblx0XHRcdGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdmFsdWUsIG5hbWUsIHRoaXMpO1xuXHRcdFx0cGFpcnMgPSBnZXRIZWFkZXJzKHRoaXMpO1xuXHRcdFx0aSsrO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuICAqIE92ZXJ3cml0ZSBoZWFkZXIgdmFsdWVzIGdpdmVuIG5hbWVcbiAgKlxuICAqIEBwYXJhbSAgIFN0cmluZyAgbmFtZSAgIEhlYWRlciBuYW1lXG4gICogQHBhcmFtICAgU3RyaW5nICB2YWx1ZSAgSGVhZGVyIHZhbHVlXG4gICogQHJldHVybiAgVm9pZFxuICAqL1xuXHRzZXQobmFtZSwgdmFsdWUpIHtcblx0XHRuYW1lID0gYCR7bmFtZX1gO1xuXHRcdHZhbHVlID0gYCR7dmFsdWV9YDtcblx0XHR2YWxpZGF0ZU5hbWUobmFtZSk7XG5cdFx0dmFsaWRhdGVWYWx1ZSh2YWx1ZSk7XG5cdFx0Y29uc3Qga2V5ID0gZmluZCh0aGlzW01BUF0sIG5hbWUpO1xuXHRcdHRoaXNbTUFQXVtrZXkgIT09IHVuZGVmaW5lZCA/IGtleSA6IG5hbWVdID0gW3ZhbHVlXTtcblx0fVxuXG5cdC8qKlxuICAqIEFwcGVuZCBhIHZhbHVlIG9udG8gZXhpc3RpbmcgaGVhZGVyXG4gICpcbiAgKiBAcGFyYW0gICBTdHJpbmcgIG5hbWUgICBIZWFkZXIgbmFtZVxuICAqIEBwYXJhbSAgIFN0cmluZyAgdmFsdWUgIEhlYWRlciB2YWx1ZVxuICAqIEByZXR1cm4gIFZvaWRcbiAgKi9cblx0YXBwZW5kKG5hbWUsIHZhbHVlKSB7XG5cdFx0bmFtZSA9IGAke25hbWV9YDtcblx0XHR2YWx1ZSA9IGAke3ZhbHVlfWA7XG5cdFx0dmFsaWRhdGVOYW1lKG5hbWUpO1xuXHRcdHZhbGlkYXRlVmFsdWUodmFsdWUpO1xuXHRcdGNvbnN0IGtleSA9IGZpbmQodGhpc1tNQVBdLCBuYW1lKTtcblx0XHRpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXNbTUFQXVtrZXldLnB1c2godmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzW01BUF1bbmFtZV0gPSBbdmFsdWVdO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuICAqIENoZWNrIGZvciBoZWFkZXIgbmFtZSBleGlzdGVuY2VcbiAgKlxuICAqIEBwYXJhbSAgIFN0cmluZyAgIG5hbWUgIEhlYWRlciBuYW1lXG4gICogQHJldHVybiAgQm9vbGVhblxuICAqL1xuXHRoYXMobmFtZSkge1xuXHRcdG5hbWUgPSBgJHtuYW1lfWA7XG5cdFx0dmFsaWRhdGVOYW1lKG5hbWUpO1xuXHRcdHJldHVybiBmaW5kKHRoaXNbTUFQXSwgbmFtZSkgIT09IHVuZGVmaW5lZDtcblx0fVxuXG5cdC8qKlxuICAqIERlbGV0ZSBhbGwgaGVhZGVyIHZhbHVlcyBnaXZlbiBuYW1lXG4gICpcbiAgKiBAcGFyYW0gICBTdHJpbmcgIG5hbWUgIEhlYWRlciBuYW1lXG4gICogQHJldHVybiAgVm9pZFxuICAqL1xuXHRkZWxldGUobmFtZSkge1xuXHRcdG5hbWUgPSBgJHtuYW1lfWA7XG5cdFx0dmFsaWRhdGVOYW1lKG5hbWUpO1xuXHRcdGNvbnN0IGtleSA9IGZpbmQodGhpc1tNQVBdLCBuYW1lKTtcblx0XHRpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGRlbGV0ZSB0aGlzW01BUF1ba2V5XTtcblx0XHR9XG5cdH1cblxuXHQvKipcbiAgKiBSZXR1cm4gcmF3IGhlYWRlcnMgKG5vbi1zcGVjIGFwaSlcbiAgKlxuICAqIEByZXR1cm4gIE9iamVjdFxuICAqL1xuXHRyYXcoKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUFQXTtcblx0fVxuXG5cdC8qKlxuICAqIEdldCBhbiBpdGVyYXRvciBvbiBrZXlzLlxuICAqXG4gICogQHJldHVybiAgSXRlcmF0b3JcbiAgKi9cblx0a2V5cygpIHtcblx0XHRyZXR1cm4gY3JlYXRlSGVhZGVyc0l0ZXJhdG9yKHRoaXMsICdrZXknKTtcblx0fVxuXG5cdC8qKlxuICAqIEdldCBhbiBpdGVyYXRvciBvbiB2YWx1ZXMuXG4gICpcbiAgKiBAcmV0dXJuICBJdGVyYXRvclxuICAqL1xuXHR2YWx1ZXMoKSB7XG5cdFx0cmV0dXJuIGNyZWF0ZUhlYWRlcnNJdGVyYXRvcih0aGlzLCAndmFsdWUnKTtcblx0fVxuXG5cdC8qKlxuICAqIEdldCBhbiBpdGVyYXRvciBvbiBlbnRyaWVzLlxuICAqXG4gICogVGhpcyBpcyB0aGUgZGVmYXVsdCBpdGVyYXRvciBvZiB0aGUgSGVhZGVycyBvYmplY3QuXG4gICpcbiAgKiBAcmV0dXJuICBJdGVyYXRvclxuICAqL1xuXHRbU3ltYm9sLml0ZXJhdG9yXSgpIHtcblx0XHRyZXR1cm4gY3JlYXRlSGVhZGVyc0l0ZXJhdG9yKHRoaXMsICdrZXkrdmFsdWUnKTtcblx0fVxufVxuSGVhZGVycy5wcm90b3R5cGUuZW50cmllcyA9IEhlYWRlcnMucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShIZWFkZXJzLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG5cdHZhbHVlOiAnSGVhZGVycycsXG5cdHdyaXRhYmxlOiBmYWxzZSxcblx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEhlYWRlcnMucHJvdG90eXBlLCB7XG5cdGdldDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGZvckVhY2g6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRzZXQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRhcHBlbmQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRoYXM6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRkZWxldGU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRrZXlzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0dmFsdWVzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0ZW50cmllczogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuXG5mdW5jdGlvbiBnZXRIZWFkZXJzKGhlYWRlcnMpIHtcblx0bGV0IGtpbmQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICdrZXkrdmFsdWUnO1xuXG5cdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhoZWFkZXJzW01BUF0pLnNvcnQoKTtcblx0cmV0dXJuIGtleXMubWFwKGtpbmQgPT09ICdrZXknID8gZnVuY3Rpb24gKGspIHtcblx0XHRyZXR1cm4gay50b0xvd2VyQ2FzZSgpO1xuXHR9IDoga2luZCA9PT0gJ3ZhbHVlJyA/IGZ1bmN0aW9uIChrKSB7XG5cdFx0cmV0dXJuIGhlYWRlcnNbTUFQXVtrXS5qb2luKCcsICcpO1xuXHR9IDogZnVuY3Rpb24gKGspIHtcblx0XHRyZXR1cm4gW2sudG9Mb3dlckNhc2UoKSwgaGVhZGVyc1tNQVBdW2tdLmpvaW4oJywgJyldO1xuXHR9KTtcbn1cblxuY29uc3QgSU5URVJOQUwgPSBTeW1ib2woJ2ludGVybmFsJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlcnNJdGVyYXRvcih0YXJnZXQsIGtpbmQpIHtcblx0Y29uc3QgaXRlcmF0b3IgPSBPYmplY3QuY3JlYXRlKEhlYWRlcnNJdGVyYXRvclByb3RvdHlwZSk7XG5cdGl0ZXJhdG9yW0lOVEVSTkFMXSA9IHtcblx0XHR0YXJnZXQsXG5cdFx0a2luZCxcblx0XHRpbmRleDogMFxuXHR9O1xuXHRyZXR1cm4gaXRlcmF0b3I7XG59XG5cbmNvbnN0IEhlYWRlcnNJdGVyYXRvclByb3RvdHlwZSA9IE9iamVjdC5zZXRQcm90b3R5cGVPZih7XG5cdG5leHQoKSB7XG5cdFx0Ly8gaXN0YW5idWwgaWdub3JlIGlmXG5cdFx0aWYgKCF0aGlzIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKSAhPT0gSGVhZGVyc0l0ZXJhdG9yUHJvdG90eXBlKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBvZiBgdGhpc2AgaXMgbm90IGEgSGVhZGVyc0l0ZXJhdG9yJyk7XG5cdFx0fVxuXG5cdFx0dmFyIF9JTlRFUk5BTCA9IHRoaXNbSU5URVJOQUxdO1xuXHRcdGNvbnN0IHRhcmdldCA9IF9JTlRFUk5BTC50YXJnZXQsXG5cdFx0ICAgICAga2luZCA9IF9JTlRFUk5BTC5raW5kLFxuXHRcdCAgICAgIGluZGV4ID0gX0lOVEVSTkFMLmluZGV4O1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gZ2V0SGVhZGVycyh0YXJnZXQsIGtpbmQpO1xuXHRcdGNvbnN0IGxlbiA9IHZhbHVlcy5sZW5ndGg7XG5cdFx0aWYgKGluZGV4ID49IGxlbikge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dmFsdWU6IHVuZGVmaW5lZCxcblx0XHRcdFx0ZG9uZTogdHJ1ZVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHR0aGlzW0lOVEVSTkFMXS5pbmRleCA9IGluZGV4ICsgMTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZTogdmFsdWVzW2luZGV4XSxcblx0XHRcdGRvbmU6IGZhbHNlXG5cdFx0fTtcblx0fVxufSwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE9iamVjdC5nZXRQcm90b3R5cGVPZihbXVtTeW1ib2wuaXRlcmF0b3JdKCkpKSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShIZWFkZXJzSXRlcmF0b3JQcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuXHR2YWx1ZTogJ0hlYWRlcnNJdGVyYXRvcicsXG5cdHdyaXRhYmxlOiBmYWxzZSxcblx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG5cbi8qKlxuICogRXhwb3J0IHRoZSBIZWFkZXJzIG9iamVjdCBpbiBhIGZvcm0gdGhhdCBOb2RlLmpzIGNhbiBjb25zdW1lLlxuICpcbiAqIEBwYXJhbSAgIEhlYWRlcnMgIGhlYWRlcnNcbiAqIEByZXR1cm4gIE9iamVjdFxuICovXG5mdW5jdGlvbiBleHBvcnROb2RlQ29tcGF0aWJsZUhlYWRlcnMoaGVhZGVycykge1xuXHRjb25zdCBvYmogPSBPYmplY3QuYXNzaWduKHsgX19wcm90b19fOiBudWxsIH0sIGhlYWRlcnNbTUFQXSk7XG5cblx0Ly8gaHR0cC5yZXF1ZXN0KCkgb25seSBzdXBwb3J0cyBzdHJpbmcgYXMgSG9zdCBoZWFkZXIuIFRoaXMgaGFjayBtYWtlc1xuXHQvLyBzcGVjaWZ5aW5nIGN1c3RvbSBIb3N0IGhlYWRlciBwb3NzaWJsZS5cblx0Y29uc3QgaG9zdEhlYWRlcktleSA9IGZpbmQoaGVhZGVyc1tNQVBdLCAnSG9zdCcpO1xuXHRpZiAoaG9zdEhlYWRlcktleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0b2JqW2hvc3RIZWFkZXJLZXldID0gb2JqW2hvc3RIZWFkZXJLZXldWzBdO1xuXHR9XG5cblx0cmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBIZWFkZXJzIG9iamVjdCBmcm9tIGFuIG9iamVjdCBvZiBoZWFkZXJzLCBpZ25vcmluZyB0aG9zZSB0aGF0IGRvXG4gKiBub3QgY29uZm9ybSB0byBIVFRQIGdyYW1tYXIgcHJvZHVjdGlvbnMuXG4gKlxuICogQHBhcmFtICAgT2JqZWN0ICBvYmogIE9iamVjdCBvZiBoZWFkZXJzXG4gKiBAcmV0dXJuICBIZWFkZXJzXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlcnNMZW5pZW50KG9iaikge1xuXHRjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcblx0Zm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKG9iaikpIHtcblx0XHRpZiAoaW52YWxpZFRva2VuUmVnZXgudGVzdChuYW1lKSkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXHRcdGlmIChBcnJheS5pc0FycmF5KG9ialtuYW1lXSkpIHtcblx0XHRcdGZvciAoY29uc3QgdmFsIG9mIG9ialtuYW1lXSkge1xuXHRcdFx0XHRpZiAoaW52YWxpZEhlYWRlckNoYXJSZWdleC50ZXN0KHZhbCkpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoaGVhZGVyc1tNQVBdW25hbWVdID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRoZWFkZXJzW01BUF1bbmFtZV0gPSBbdmFsXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRoZWFkZXJzW01BUF1bbmFtZV0ucHVzaCh2YWwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICghaW52YWxpZEhlYWRlckNoYXJSZWdleC50ZXN0KG9ialtuYW1lXSkpIHtcblx0XHRcdGhlYWRlcnNbTUFQXVtuYW1lXSA9IFtvYmpbbmFtZV1dO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gaGVhZGVycztcbn1cblxuY29uc3QgSU5URVJOQUxTJDEgPSBTeW1ib2woJ1Jlc3BvbnNlIGludGVybmFscycpO1xuXG4vLyBmaXggYW4gaXNzdWUgd2hlcmUgXCJTVEFUVVNfQ09ERVNcIiBhcmVuJ3QgYSBuYW1lZCBleHBvcnQgZm9yIG5vZGUgPDEwXG5jb25zdCBTVEFUVVNfQ09ERVMgPSBodHRwLlNUQVRVU19DT0RFUztcblxuLyoqXG4gKiBSZXNwb25zZSBjbGFzc1xuICpcbiAqIEBwYXJhbSAgIFN0cmVhbSAgYm9keSAgUmVhZGFibGUgc3RyZWFtXG4gKiBAcGFyYW0gICBPYmplY3QgIG9wdHMgIFJlc3BvbnNlIG9wdGlvbnNcbiAqIEByZXR1cm4gIFZvaWRcbiAqL1xuY2xhc3MgUmVzcG9uc2Uge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRsZXQgYm9keSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogbnVsbDtcblx0XHRsZXQgb3B0cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cblx0XHRCb2R5LmNhbGwodGhpcywgYm9keSwgb3B0cyk7XG5cblx0XHRjb25zdCBzdGF0dXMgPSBvcHRzLnN0YXR1cyB8fCAyMDA7XG5cdFx0Y29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdHMuaGVhZGVycyk7XG5cblx0XHRpZiAoYm9keSAhPSBudWxsICYmICFoZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJykpIHtcblx0XHRcdGNvbnN0IGNvbnRlbnRUeXBlID0gZXh0cmFjdENvbnRlbnRUeXBlKGJvZHkpO1xuXHRcdFx0aWYgKGNvbnRlbnRUeXBlKSB7XG5cdFx0XHRcdGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCBjb250ZW50VHlwZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpc1tJTlRFUk5BTFMkMV0gPSB7XG5cdFx0XHR1cmw6IG9wdHMudXJsLFxuXHRcdFx0c3RhdHVzLFxuXHRcdFx0c3RhdHVzVGV4dDogb3B0cy5zdGF0dXNUZXh0IHx8IFNUQVRVU19DT0RFU1tzdGF0dXNdLFxuXHRcdFx0aGVhZGVycyxcblx0XHRcdGNvdW50ZXI6IG9wdHMuY291bnRlclxuXHRcdH07XG5cdH1cblxuXHRnZXQgdXJsKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS51cmwgfHwgJyc7XG5cdH1cblxuXHRnZXQgc3RhdHVzKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS5zdGF0dXM7XG5cdH1cblxuXHQvKipcbiAgKiBDb252ZW5pZW5jZSBwcm9wZXJ0eSByZXByZXNlbnRpbmcgaWYgdGhlIHJlcXVlc3QgZW5kZWQgbm9ybWFsbHlcbiAgKi9cblx0Z2V0IG9rKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS5zdGF0dXMgPj0gMjAwICYmIHRoaXNbSU5URVJOQUxTJDFdLnN0YXR1cyA8IDMwMDtcblx0fVxuXG5cdGdldCByZWRpcmVjdGVkKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS5jb3VudGVyID4gMDtcblx0fVxuXG5cdGdldCBzdGF0dXNUZXh0KCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS5zdGF0dXNUZXh0O1xuXHR9XG5cblx0Z2V0IGhlYWRlcnMoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDFdLmhlYWRlcnM7XG5cdH1cblxuXHQvKipcbiAgKiBDbG9uZSB0aGlzIHJlc3BvbnNlXG4gICpcbiAgKiBAcmV0dXJuICBSZXNwb25zZVxuICAqL1xuXHRjbG9uZSgpIHtcblx0XHRyZXR1cm4gbmV3IFJlc3BvbnNlKGNsb25lKHRoaXMpLCB7XG5cdFx0XHR1cmw6IHRoaXMudXJsLFxuXHRcdFx0c3RhdHVzOiB0aGlzLnN0YXR1cyxcblx0XHRcdHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcblx0XHRcdGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcblx0XHRcdG9rOiB0aGlzLm9rLFxuXHRcdFx0cmVkaXJlY3RlZDogdGhpcy5yZWRpcmVjdGVkXG5cdFx0fSk7XG5cdH1cbn1cblxuQm9keS5taXhJbihSZXNwb25zZS5wcm90b3R5cGUpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZXNwb25zZS5wcm90b3R5cGUsIHtcblx0dXJsOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0c3RhdHVzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0b2s6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRyZWRpcmVjdGVkOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0c3RhdHVzVGV4dDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGhlYWRlcnM6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRjbG9uZTogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUmVzcG9uc2UucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcblx0dmFsdWU6ICdSZXNwb25zZScsXG5cdHdyaXRhYmxlOiBmYWxzZSxcblx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG5cbmNvbnN0IElOVEVSTkFMUyQyID0gU3ltYm9sKCdSZXF1ZXN0IGludGVybmFscycpO1xuXG4vLyBmaXggYW4gaXNzdWUgd2hlcmUgXCJmb3JtYXRcIiwgXCJwYXJzZVwiIGFyZW4ndCBhIG5hbWVkIGV4cG9ydCBmb3Igbm9kZSA8MTBcbmNvbnN0IHBhcnNlX3VybCA9IFVybC5wYXJzZTtcbmNvbnN0IGZvcm1hdF91cmwgPSBVcmwuZm9ybWF0O1xuXG5jb25zdCBzdHJlYW1EZXN0cnVjdGlvblN1cHBvcnRlZCA9ICdkZXN0cm95JyBpbiBTdHJlYW0uUmVhZGFibGUucHJvdG90eXBlO1xuXG4vKipcbiAqIENoZWNrIGlmIGEgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgUmVxdWVzdC5cbiAqXG4gKiBAcGFyYW0gICBNaXhlZCAgIGlucHV0XG4gKiBAcmV0dXJuICBCb29sZWFuXG4gKi9cbmZ1bmN0aW9uIGlzUmVxdWVzdChpbnB1dCkge1xuXHRyZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgaW5wdXRbSU5URVJOQUxTJDJdID09PSAnb2JqZWN0Jztcbn1cblxuZnVuY3Rpb24gaXNBYm9ydFNpZ25hbChzaWduYWwpIHtcblx0Y29uc3QgcHJvdG8gPSBzaWduYWwgJiYgdHlwZW9mIHNpZ25hbCA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKHNpZ25hbCk7XG5cdHJldHVybiAhIShwcm90byAmJiBwcm90by5jb25zdHJ1Y3Rvci5uYW1lID09PSAnQWJvcnRTaWduYWwnKTtcbn1cblxuLyoqXG4gKiBSZXF1ZXN0IGNsYXNzXG4gKlxuICogQHBhcmFtICAgTWl4ZWQgICBpbnB1dCAgVXJsIG9yIFJlcXVlc3QgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIE9iamVjdCAgaW5pdCAgIEN1c3RvbSBvcHRpb25zXG4gKiBAcmV0dXJuICBWb2lkXG4gKi9cbmNsYXNzIFJlcXVlc3Qge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdGxldCBpbml0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuXHRcdGxldCBwYXJzZWRVUkw7XG5cblx0XHQvLyBub3JtYWxpemUgaW5wdXRcblx0XHRpZiAoIWlzUmVxdWVzdChpbnB1dCkpIHtcblx0XHRcdGlmIChpbnB1dCAmJiBpbnB1dC5ocmVmKSB7XG5cdFx0XHRcdC8vIGluIG9yZGVyIHRvIHN1cHBvcnQgTm9kZS5qcycgVXJsIG9iamVjdHM7IHRob3VnaCBXSEFUV0cncyBVUkwgb2JqZWN0c1xuXHRcdFx0XHQvLyB3aWxsIGZhbGwgaW50byB0aGlzIGJyYW5jaCBhbHNvIChzaW5jZSB0aGVpciBgdG9TdHJpbmcoKWAgd2lsbCByZXR1cm5cblx0XHRcdFx0Ly8gYGhyZWZgIHByb3BlcnR5IGFueXdheSlcblx0XHRcdFx0cGFyc2VkVVJMID0gcGFyc2VfdXJsKGlucHV0LmhyZWYpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gY29lcmNlIGlucHV0IHRvIGEgc3RyaW5nIGJlZm9yZSBhdHRlbXB0aW5nIHRvIHBhcnNlXG5cdFx0XHRcdHBhcnNlZFVSTCA9IHBhcnNlX3VybChgJHtpbnB1dH1gKTtcblx0XHRcdH1cblx0XHRcdGlucHV0ID0ge307XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhcnNlZFVSTCA9IHBhcnNlX3VybChpbnB1dC51cmwpO1xuXHRcdH1cblxuXHRcdGxldCBtZXRob2QgPSBpbml0Lm1ldGhvZCB8fCBpbnB1dC5tZXRob2QgfHwgJ0dFVCc7XG5cdFx0bWV0aG9kID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XG5cblx0XHRpZiAoKGluaXQuYm9keSAhPSBudWxsIHx8IGlzUmVxdWVzdChpbnB1dCkgJiYgaW5wdXQuYm9keSAhPT0gbnVsbCkgJiYgKG1ldGhvZCA9PT0gJ0dFVCcgfHwgbWV0aG9kID09PSAnSEVBRCcpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdSZXF1ZXN0IHdpdGggR0VUL0hFQUQgbWV0aG9kIGNhbm5vdCBoYXZlIGJvZHknKTtcblx0XHR9XG5cblx0XHRsZXQgaW5wdXRCb2R5ID0gaW5pdC5ib2R5ICE9IG51bGwgPyBpbml0LmJvZHkgOiBpc1JlcXVlc3QoaW5wdXQpICYmIGlucHV0LmJvZHkgIT09IG51bGwgPyBjbG9uZShpbnB1dCkgOiBudWxsO1xuXG5cdFx0Qm9keS5jYWxsKHRoaXMsIGlucHV0Qm9keSwge1xuXHRcdFx0dGltZW91dDogaW5pdC50aW1lb3V0IHx8IGlucHV0LnRpbWVvdXQgfHwgMCxcblx0XHRcdHNpemU6IGluaXQuc2l6ZSB8fCBpbnB1dC5zaXplIHx8IDBcblx0XHR9KTtcblxuXHRcdGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyhpbml0LmhlYWRlcnMgfHwgaW5wdXQuaGVhZGVycyB8fCB7fSk7XG5cblx0XHRpZiAoaW5wdXRCb2R5ICE9IG51bGwgJiYgIWhlYWRlcnMuaGFzKCdDb250ZW50LVR5cGUnKSkge1xuXHRcdFx0Y29uc3QgY29udGVudFR5cGUgPSBleHRyYWN0Q29udGVudFR5cGUoaW5wdXRCb2R5KTtcblx0XHRcdGlmIChjb250ZW50VHlwZSkge1xuXHRcdFx0XHRoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgY29udGVudFR5cGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxldCBzaWduYWwgPSBpc1JlcXVlc3QoaW5wdXQpID8gaW5wdXQuc2lnbmFsIDogbnVsbDtcblx0XHRpZiAoJ3NpZ25hbCcgaW4gaW5pdCkgc2lnbmFsID0gaW5pdC5zaWduYWw7XG5cblx0XHRpZiAoc2lnbmFsICE9IG51bGwgJiYgIWlzQWJvcnRTaWduYWwoc2lnbmFsKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgc2lnbmFsIHRvIGJlIGFuIGluc3RhbmNlb2YgQWJvcnRTaWduYWwnKTtcblx0XHR9XG5cblx0XHR0aGlzW0lOVEVSTkFMUyQyXSA9IHtcblx0XHRcdG1ldGhvZCxcblx0XHRcdHJlZGlyZWN0OiBpbml0LnJlZGlyZWN0IHx8IGlucHV0LnJlZGlyZWN0IHx8ICdmb2xsb3cnLFxuXHRcdFx0aGVhZGVycyxcblx0XHRcdHBhcnNlZFVSTCxcblx0XHRcdHNpZ25hbFxuXHRcdH07XG5cblx0XHQvLyBub2RlLWZldGNoLW9ubHkgb3B0aW9uc1xuXHRcdHRoaXMuZm9sbG93ID0gaW5pdC5mb2xsb3cgIT09IHVuZGVmaW5lZCA/IGluaXQuZm9sbG93IDogaW5wdXQuZm9sbG93ICE9PSB1bmRlZmluZWQgPyBpbnB1dC5mb2xsb3cgOiAyMDtcblx0XHR0aGlzLmNvbXByZXNzID0gaW5pdC5jb21wcmVzcyAhPT0gdW5kZWZpbmVkID8gaW5pdC5jb21wcmVzcyA6IGlucHV0LmNvbXByZXNzICE9PSB1bmRlZmluZWQgPyBpbnB1dC5jb21wcmVzcyA6IHRydWU7XG5cdFx0dGhpcy5jb3VudGVyID0gaW5pdC5jb3VudGVyIHx8IGlucHV0LmNvdW50ZXIgfHwgMDtcblx0XHR0aGlzLmFnZW50ID0gaW5pdC5hZ2VudCB8fCBpbnB1dC5hZ2VudDtcblx0fVxuXG5cdGdldCBtZXRob2QoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDJdLm1ldGhvZDtcblx0fVxuXG5cdGdldCB1cmwoKSB7XG5cdFx0cmV0dXJuIGZvcm1hdF91cmwodGhpc1tJTlRFUk5BTFMkMl0ucGFyc2VkVVJMKTtcblx0fVxuXG5cdGdldCBoZWFkZXJzKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQyXS5oZWFkZXJzO1xuXHR9XG5cblx0Z2V0IHJlZGlyZWN0KCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQyXS5yZWRpcmVjdDtcblx0fVxuXG5cdGdldCBzaWduYWwoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDJdLnNpZ25hbDtcblx0fVxuXG5cdC8qKlxuICAqIENsb25lIHRoaXMgcmVxdWVzdFxuICAqXG4gICogQHJldHVybiAgUmVxdWVzdFxuICAqL1xuXHRjbG9uZSgpIHtcblx0XHRyZXR1cm4gbmV3IFJlcXVlc3QodGhpcyk7XG5cdH1cbn1cblxuQm9keS5taXhJbihSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZXF1ZXN0LnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG5cdHZhbHVlOiAnUmVxdWVzdCcsXG5cdHdyaXRhYmxlOiBmYWxzZSxcblx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFJlcXVlc3QucHJvdG90eXBlLCB7XG5cdG1ldGhvZDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHVybDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGhlYWRlcnM6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRyZWRpcmVjdDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGNsb25lOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0c2lnbmFsOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5cbi8qKlxuICogQ29udmVydCBhIFJlcXVlc3QgdG8gTm9kZS5qcyBodHRwIHJlcXVlc3Qgb3B0aW9ucy5cbiAqXG4gKiBAcGFyYW0gICBSZXF1ZXN0ICBBIFJlcXVlc3QgaW5zdGFuY2VcbiAqIEByZXR1cm4gIE9iamVjdCAgIFRoZSBvcHRpb25zIG9iamVjdCB0byBiZSBwYXNzZWQgdG8gaHR0cC5yZXF1ZXN0XG4gKi9cbmZ1bmN0aW9uIGdldE5vZGVSZXF1ZXN0T3B0aW9ucyhyZXF1ZXN0KSB7XG5cdGNvbnN0IHBhcnNlZFVSTCA9IHJlcXVlc3RbSU5URVJOQUxTJDJdLnBhcnNlZFVSTDtcblx0Y29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHJlcXVlc3RbSU5URVJOQUxTJDJdLmhlYWRlcnMpO1xuXG5cdC8vIGZldGNoIHN0ZXAgMS4zXG5cdGlmICghaGVhZGVycy5oYXMoJ0FjY2VwdCcpKSB7XG5cdFx0aGVhZGVycy5zZXQoJ0FjY2VwdCcsICcqLyonKTtcblx0fVxuXG5cdC8vIEJhc2ljIGZldGNoXG5cdGlmICghcGFyc2VkVVJMLnByb3RvY29sIHx8ICFwYXJzZWRVUkwuaG9zdG5hbWUpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPbmx5IGFic29sdXRlIFVSTHMgYXJlIHN1cHBvcnRlZCcpO1xuXHR9XG5cblx0aWYgKCEvXmh0dHBzPzokLy50ZXN0KHBhcnNlZFVSTC5wcm90b2NvbCkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPbmx5IEhUVFAoUykgcHJvdG9jb2xzIGFyZSBzdXBwb3J0ZWQnKTtcblx0fVxuXG5cdGlmIChyZXF1ZXN0LnNpZ25hbCAmJiByZXF1ZXN0LmJvZHkgaW5zdGFuY2VvZiBTdHJlYW0uUmVhZGFibGUgJiYgIXN0cmVhbURlc3RydWN0aW9uU3VwcG9ydGVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdDYW5jZWxsYXRpb24gb2Ygc3RyZWFtZWQgcmVxdWVzdHMgd2l0aCBBYm9ydFNpZ25hbCBpcyBub3Qgc3VwcG9ydGVkIGluIG5vZGUgPCA4Jyk7XG5cdH1cblxuXHQvLyBIVFRQLW5ldHdvcmstb3ItY2FjaGUgZmV0Y2ggc3RlcHMgMi40LTIuN1xuXHRsZXQgY29udGVudExlbmd0aFZhbHVlID0gbnVsbDtcblx0aWYgKHJlcXVlc3QuYm9keSA9PSBudWxsICYmIC9eKFBPU1R8UFVUKSQvaS50ZXN0KHJlcXVlc3QubWV0aG9kKSkge1xuXHRcdGNvbnRlbnRMZW5ndGhWYWx1ZSA9ICcwJztcblx0fVxuXHRpZiAocmVxdWVzdC5ib2R5ICE9IG51bGwpIHtcblx0XHRjb25zdCB0b3RhbEJ5dGVzID0gZ2V0VG90YWxCeXRlcyhyZXF1ZXN0KTtcblx0XHRpZiAodHlwZW9mIHRvdGFsQnl0ZXMgPT09ICdudW1iZXInKSB7XG5cdFx0XHRjb250ZW50TGVuZ3RoVmFsdWUgPSBTdHJpbmcodG90YWxCeXRlcyk7XG5cdFx0fVxuXHR9XG5cdGlmIChjb250ZW50TGVuZ3RoVmFsdWUpIHtcblx0XHRoZWFkZXJzLnNldCgnQ29udGVudC1MZW5ndGgnLCBjb250ZW50TGVuZ3RoVmFsdWUpO1xuXHR9XG5cblx0Ly8gSFRUUC1uZXR3b3JrLW9yLWNhY2hlIGZldGNoIHN0ZXAgMi4xMVxuXHRpZiAoIWhlYWRlcnMuaGFzKCdVc2VyLUFnZW50JykpIHtcblx0XHRoZWFkZXJzLnNldCgnVXNlci1BZ2VudCcsICdub2RlLWZldGNoLzEuMCAoK2h0dHBzOi8vZ2l0aHViLmNvbS9iaXRpbm4vbm9kZS1mZXRjaCknKTtcblx0fVxuXG5cdC8vIEhUVFAtbmV0d29yay1vci1jYWNoZSBmZXRjaCBzdGVwIDIuMTVcblx0aWYgKHJlcXVlc3QuY29tcHJlc3MgJiYgIWhlYWRlcnMuaGFzKCdBY2NlcHQtRW5jb2RpbmcnKSkge1xuXHRcdGhlYWRlcnMuc2V0KCdBY2NlcHQtRW5jb2RpbmcnLCAnZ3ppcCxkZWZsYXRlJyk7XG5cdH1cblxuXHRsZXQgYWdlbnQgPSByZXF1ZXN0LmFnZW50O1xuXHRpZiAodHlwZW9mIGFnZW50ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0YWdlbnQgPSBhZ2VudChwYXJzZWRVUkwpO1xuXHR9XG5cblx0aWYgKCFoZWFkZXJzLmhhcygnQ29ubmVjdGlvbicpICYmICFhZ2VudCkge1xuXHRcdGhlYWRlcnMuc2V0KCdDb25uZWN0aW9uJywgJ2Nsb3NlJyk7XG5cdH1cblxuXHQvLyBIVFRQLW5ldHdvcmsgZmV0Y2ggc3RlcCA0LjJcblx0Ly8gY2h1bmtlZCBlbmNvZGluZyBpcyBoYW5kbGVkIGJ5IE5vZGUuanNcblxuXHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcGFyc2VkVVJMLCB7XG5cdFx0bWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcblx0XHRoZWFkZXJzOiBleHBvcnROb2RlQ29tcGF0aWJsZUhlYWRlcnMoaGVhZGVycyksXG5cdFx0YWdlbnRcblx0fSk7XG59XG5cbi8qKlxuICogYWJvcnQtZXJyb3IuanNcbiAqXG4gKiBBYm9ydEVycm9yIGludGVyZmFjZSBmb3IgY2FuY2VsbGVkIHJlcXVlc3RzXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgQWJvcnRFcnJvciBpbnN0YW5jZVxuICpcbiAqIEBwYXJhbSAgIFN0cmluZyAgICAgIG1lc3NhZ2UgICAgICBFcnJvciBtZXNzYWdlIGZvciBodW1hblxuICogQHJldHVybiAgQWJvcnRFcnJvclxuICovXG5mdW5jdGlvbiBBYm9ydEVycm9yKG1lc3NhZ2UpIHtcbiAgRXJyb3IuY2FsbCh0aGlzLCBtZXNzYWdlKTtcblxuICB0aGlzLnR5cGUgPSAnYWJvcnRlZCc7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cbiAgLy8gaGlkZSBjdXN0b20gZXJyb3IgaW1wbGVtZW50YXRpb24gZGV0YWlscyBmcm9tIGVuZC11c2Vyc1xuICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbn1cblxuQWJvcnRFcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5BYm9ydEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFib3J0RXJyb3I7XG5BYm9ydEVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0Fib3J0RXJyb3InO1xuXG4vLyBmaXggYW4gaXNzdWUgd2hlcmUgXCJQYXNzVGhyb3VnaFwiLCBcInJlc29sdmVcIiBhcmVuJ3QgYSBuYW1lZCBleHBvcnQgZm9yIG5vZGUgPDEwXG5jb25zdCBQYXNzVGhyb3VnaCQxID0gU3RyZWFtLlBhc3NUaHJvdWdoO1xuY29uc3QgcmVzb2x2ZV91cmwgPSBVcmwucmVzb2x2ZTtcblxuLyoqXG4gKiBGZXRjaCBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSAgIE1peGVkICAgIHVybCAgIEFic29sdXRlIHVybCBvciBSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcGFyYW0gICBPYmplY3QgICBvcHRzICBGZXRjaCBvcHRpb25zXG4gKiBAcmV0dXJuICBQcm9taXNlXG4gKi9cbmZ1bmN0aW9uIGZldGNoKHVybCwgb3B0cykge1xuXG5cdC8vIGFsbG93IGN1c3RvbSBwcm9taXNlXG5cdGlmICghZmV0Y2guUHJvbWlzZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignbmF0aXZlIHByb21pc2UgbWlzc2luZywgc2V0IGZldGNoLlByb21pc2UgdG8geW91ciBmYXZvcml0ZSBhbHRlcm5hdGl2ZScpO1xuXHR9XG5cblx0Qm9keS5Qcm9taXNlID0gZmV0Y2guUHJvbWlzZTtcblxuXHQvLyB3cmFwIGh0dHAucmVxdWVzdCBpbnRvIGZldGNoXG5cdHJldHVybiBuZXcgZmV0Y2guUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0Ly8gYnVpbGQgcmVxdWVzdCBvYmplY3Rcblx0XHRjb25zdCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCBvcHRzKTtcblx0XHRjb25zdCBvcHRpb25zID0gZ2V0Tm9kZVJlcXVlc3RPcHRpb25zKHJlcXVlc3QpO1xuXG5cdFx0Y29uc3Qgc2VuZCA9IChvcHRpb25zLnByb3RvY29sID09PSAnaHR0cHM6JyA/IGh0dHBzIDogaHR0cCkucmVxdWVzdDtcblx0XHRjb25zdCBzaWduYWwgPSByZXF1ZXN0LnNpZ25hbDtcblxuXHRcdGxldCByZXNwb25zZSA9IG51bGw7XG5cblx0XHRjb25zdCBhYm9ydCA9IGZ1bmN0aW9uIGFib3J0KCkge1xuXHRcdFx0bGV0IGVycm9yID0gbmV3IEFib3J0RXJyb3IoJ1RoZSB1c2VyIGFib3J0ZWQgYSByZXF1ZXN0LicpO1xuXHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdGlmIChyZXF1ZXN0LmJvZHkgJiYgcmVxdWVzdC5ib2R5IGluc3RhbmNlb2YgU3RyZWFtLlJlYWRhYmxlKSB7XG5cdFx0XHRcdHJlcXVlc3QuYm9keS5kZXN0cm95KGVycm9yKTtcblx0XHRcdH1cblx0XHRcdGlmICghcmVzcG9uc2UgfHwgIXJlc3BvbnNlLmJvZHkpIHJldHVybjtcblx0XHRcdHJlc3BvbnNlLmJvZHkuZW1pdCgnZXJyb3InLCBlcnJvcik7XG5cdFx0fTtcblxuXHRcdGlmIChzaWduYWwgJiYgc2lnbmFsLmFib3J0ZWQpIHtcblx0XHRcdGFib3J0KCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgYWJvcnRBbmRGaW5hbGl6ZSA9IGZ1bmN0aW9uIGFib3J0QW5kRmluYWxpemUoKSB7XG5cdFx0XHRhYm9ydCgpO1xuXHRcdFx0ZmluYWxpemUoKTtcblx0XHR9O1xuXG5cdFx0Ly8gc2VuZCByZXF1ZXN0XG5cdFx0Y29uc3QgcmVxID0gc2VuZChvcHRpb25zKTtcblx0XHRsZXQgcmVxVGltZW91dDtcblxuXHRcdGlmIChzaWduYWwpIHtcblx0XHRcdHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0QW5kRmluYWxpemUpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGZpbmFsaXplKCkge1xuXHRcdFx0cmVxLmFib3J0KCk7XG5cdFx0XHRpZiAoc2lnbmFsKSBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydEFuZEZpbmFsaXplKTtcblx0XHRcdGNsZWFyVGltZW91dChyZXFUaW1lb3V0KTtcblx0XHR9XG5cblx0XHRpZiAocmVxdWVzdC50aW1lb3V0KSB7XG5cdFx0XHRyZXEub25jZSgnc29ja2V0JywgZnVuY3Rpb24gKHNvY2tldCkge1xuXHRcdFx0XHRyZXFUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBuZXR3b3JrIHRpbWVvdXQgYXQ6ICR7cmVxdWVzdC51cmx9YCwgJ3JlcXVlc3QtdGltZW91dCcpKTtcblx0XHRcdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdFx0XHR9LCByZXF1ZXN0LnRpbWVvdXQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmVxLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgcmVxdWVzdCB0byAke3JlcXVlc3QudXJsfSBmYWlsZWQsIHJlYXNvbjogJHtlcnIubWVzc2FnZX1gLCAnc3lzdGVtJywgZXJyKSk7XG5cdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdH0pO1xuXG5cdFx0cmVxLm9uKCdyZXNwb25zZScsIGZ1bmN0aW9uIChyZXMpIHtcblx0XHRcdGNsZWFyVGltZW91dChyZXFUaW1lb3V0KTtcblxuXHRcdFx0Y29uc3QgaGVhZGVycyA9IGNyZWF0ZUhlYWRlcnNMZW5pZW50KHJlcy5oZWFkZXJzKTtcblxuXHRcdFx0Ly8gSFRUUCBmZXRjaCBzdGVwIDVcblx0XHRcdGlmIChmZXRjaC5pc1JlZGlyZWN0KHJlcy5zdGF0dXNDb2RlKSkge1xuXHRcdFx0XHQvLyBIVFRQIGZldGNoIHN0ZXAgNS4yXG5cdFx0XHRcdGNvbnN0IGxvY2F0aW9uID0gaGVhZGVycy5nZXQoJ0xvY2F0aW9uJyk7XG5cblx0XHRcdFx0Ly8gSFRUUCBmZXRjaCBzdGVwIDUuM1xuXHRcdFx0XHRjb25zdCBsb2NhdGlvblVSTCA9IGxvY2F0aW9uID09PSBudWxsID8gbnVsbCA6IHJlc29sdmVfdXJsKHJlcXVlc3QudXJsLCBsb2NhdGlvbik7XG5cblx0XHRcdFx0Ly8gSFRUUCBmZXRjaCBzdGVwIDUuNVxuXHRcdFx0XHRzd2l0Y2ggKHJlcXVlc3QucmVkaXJlY3QpIHtcblx0XHRcdFx0XHRjYXNlICdlcnJvcic6XG5cdFx0XHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYHJlZGlyZWN0IG1vZGUgaXMgc2V0IHRvIGVycm9yOiAke3JlcXVlc3QudXJsfWAsICduby1yZWRpcmVjdCcpKTtcblx0XHRcdFx0XHRcdGZpbmFsaXplKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0Y2FzZSAnbWFudWFsJzpcblx0XHRcdFx0XHRcdC8vIG5vZGUtZmV0Y2gtc3BlY2lmaWMgc3RlcDogbWFrZSBtYW51YWwgcmVkaXJlY3QgYSBiaXQgZWFzaWVyIHRvIHVzZSBieSBzZXR0aW5nIHRoZSBMb2NhdGlvbiBoZWFkZXIgdmFsdWUgdG8gdGhlIHJlc29sdmVkIFVSTC5cblx0XHRcdFx0XHRcdGlmIChsb2NhdGlvblVSTCAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHQvLyBoYW5kbGUgY29ycnVwdGVkIGhlYWRlclxuXHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdGhlYWRlcnMuc2V0KCdMb2NhdGlvbicsIGxvY2F0aW9uVVJMKTtcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gaXN0YW5idWwgaWdub3JlIG5leHQ6IG5vZGVqcyBzZXJ2ZXIgcHJldmVudCBpbnZhbGlkIHJlc3BvbnNlIGhlYWRlcnMsIHdlIGNhbid0IHRlc3QgdGhpcyB0aHJvdWdoIG5vcm1hbCByZXF1ZXN0XG5cdFx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2ZvbGxvdyc6XG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgMlxuXHRcdFx0XHRcdFx0aWYgKGxvY2F0aW9uVVJMID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgNVxuXHRcdFx0XHRcdFx0aWYgKHJlcXVlc3QuY291bnRlciA+PSByZXF1ZXN0LmZvbGxvdykge1xuXHRcdFx0XHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYG1heGltdW0gcmVkaXJlY3QgcmVhY2hlZCBhdDogJHtyZXF1ZXN0LnVybH1gLCAnbWF4LXJlZGlyZWN0JykpO1xuXHRcdFx0XHRcdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCA2IChjb3VudGVyIGluY3JlbWVudClcblx0XHRcdFx0XHRcdC8vIENyZWF0ZSBhIG5ldyBSZXF1ZXN0IG9iamVjdC5cblx0XHRcdFx0XHRcdGNvbnN0IHJlcXVlc3RPcHRzID0ge1xuXHRcdFx0XHRcdFx0XHRoZWFkZXJzOiBuZXcgSGVhZGVycyhyZXF1ZXN0LmhlYWRlcnMpLFxuXHRcdFx0XHRcdFx0XHRmb2xsb3c6IHJlcXVlc3QuZm9sbG93LFxuXHRcdFx0XHRcdFx0XHRjb3VudGVyOiByZXF1ZXN0LmNvdW50ZXIgKyAxLFxuXHRcdFx0XHRcdFx0XHRhZ2VudDogcmVxdWVzdC5hZ2VudCxcblx0XHRcdFx0XHRcdFx0Y29tcHJlc3M6IHJlcXVlc3QuY29tcHJlc3MsXG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogcmVxdWVzdC5tZXRob2QsXG5cdFx0XHRcdFx0XHRcdGJvZHk6IHJlcXVlc3QuYm9keSxcblx0XHRcdFx0XHRcdFx0c2lnbmFsOiByZXF1ZXN0LnNpZ25hbCxcblx0XHRcdFx0XHRcdFx0dGltZW91dDogcmVxdWVzdC50aW1lb3V0XG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgOVxuXHRcdFx0XHRcdFx0aWYgKHJlcy5zdGF0dXNDb2RlICE9PSAzMDMgJiYgcmVxdWVzdC5ib2R5ICYmIGdldFRvdGFsQnl0ZXMocmVxdWVzdCkgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKCdDYW5ub3QgZm9sbG93IHJlZGlyZWN0IHdpdGggYm9keSBiZWluZyBhIHJlYWRhYmxlIHN0cmVhbScsICd1bnN1cHBvcnRlZC1yZWRpcmVjdCcpKTtcblx0XHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgMTFcblx0XHRcdFx0XHRcdGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMzAzIHx8IChyZXMuc3RhdHVzQ29kZSA9PT0gMzAxIHx8IHJlcy5zdGF0dXNDb2RlID09PSAzMDIpICYmIHJlcXVlc3QubWV0aG9kID09PSAnUE9TVCcpIHtcblx0XHRcdFx0XHRcdFx0cmVxdWVzdE9wdHMubWV0aG9kID0gJ0dFVCc7XG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RPcHRzLmJvZHkgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RPcHRzLmhlYWRlcnMuZGVsZXRlKCdjb250ZW50LWxlbmd0aCcpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgMTVcblx0XHRcdFx0XHRcdHJlc29sdmUoZmV0Y2gobmV3IFJlcXVlc3QobG9jYXRpb25VUkwsIHJlcXVlc3RPcHRzKSkpO1xuXHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBwcmVwYXJlIHJlc3BvbnNlXG5cdFx0XHRyZXMub25jZSgnZW5kJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpZiAoc2lnbmFsKSBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydEFuZEZpbmFsaXplKTtcblx0XHRcdH0pO1xuXHRcdFx0bGV0IGJvZHkgPSByZXMucGlwZShuZXcgUGFzc1Rocm91Z2gkMSgpKTtcblxuXHRcdFx0Y29uc3QgcmVzcG9uc2Vfb3B0aW9ucyA9IHtcblx0XHRcdFx0dXJsOiByZXF1ZXN0LnVybCxcblx0XHRcdFx0c3RhdHVzOiByZXMuc3RhdHVzQ29kZSxcblx0XHRcdFx0c3RhdHVzVGV4dDogcmVzLnN0YXR1c01lc3NhZ2UsXG5cdFx0XHRcdGhlYWRlcnM6IGhlYWRlcnMsXG5cdFx0XHRcdHNpemU6IHJlcXVlc3Quc2l6ZSxcblx0XHRcdFx0dGltZW91dDogcmVxdWVzdC50aW1lb3V0LFxuXHRcdFx0XHRjb3VudGVyOiByZXF1ZXN0LmNvdW50ZXJcblx0XHRcdH07XG5cblx0XHRcdC8vIEhUVFAtbmV0d29yayBmZXRjaCBzdGVwIDEyLjEuMS4zXG5cdFx0XHRjb25zdCBjb2RpbmdzID0gaGVhZGVycy5nZXQoJ0NvbnRlbnQtRW5jb2RpbmcnKTtcblxuXHRcdFx0Ly8gSFRUUC1uZXR3b3JrIGZldGNoIHN0ZXAgMTIuMS4xLjQ6IGhhbmRsZSBjb250ZW50IGNvZGluZ3NcblxuXHRcdFx0Ly8gaW4gZm9sbG93aW5nIHNjZW5hcmlvcyB3ZSBpZ25vcmUgY29tcHJlc3Npb24gc3VwcG9ydFxuXHRcdFx0Ly8gMS4gY29tcHJlc3Npb24gc3VwcG9ydCBpcyBkaXNhYmxlZFxuXHRcdFx0Ly8gMi4gSEVBRCByZXF1ZXN0XG5cdFx0XHQvLyAzLiBubyBDb250ZW50LUVuY29kaW5nIGhlYWRlclxuXHRcdFx0Ly8gNC4gbm8gY29udGVudCByZXNwb25zZSAoMjA0KVxuXHRcdFx0Ly8gNS4gY29udGVudCBub3QgbW9kaWZpZWQgcmVzcG9uc2UgKDMwNClcblx0XHRcdGlmICghcmVxdWVzdC5jb21wcmVzcyB8fCByZXF1ZXN0Lm1ldGhvZCA9PT0gJ0hFQUQnIHx8IGNvZGluZ3MgPT09IG51bGwgfHwgcmVzLnN0YXR1c0NvZGUgPT09IDIwNCB8fCByZXMuc3RhdHVzQ29kZSA9PT0gMzA0KSB7XG5cdFx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlX29wdGlvbnMpO1xuXHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBGb3IgTm9kZSB2Nitcblx0XHRcdC8vIEJlIGxlc3Mgc3RyaWN0IHdoZW4gZGVjb2RpbmcgY29tcHJlc3NlZCByZXNwb25zZXMsIHNpbmNlIHNvbWV0aW1lc1xuXHRcdFx0Ly8gc2VydmVycyBzZW5kIHNsaWdodGx5IGludmFsaWQgcmVzcG9uc2VzIHRoYXQgYXJlIHN0aWxsIGFjY2VwdGVkXG5cdFx0XHQvLyBieSBjb21tb24gYnJvd3NlcnMuXG5cdFx0XHQvLyBBbHdheXMgdXNpbmcgWl9TWU5DX0ZMVVNIIGlzIHdoYXQgY1VSTCBkb2VzLlxuXHRcdFx0Y29uc3QgemxpYk9wdGlvbnMgPSB7XG5cdFx0XHRcdGZsdXNoOiB6bGliLlpfU1lOQ19GTFVTSCxcblx0XHRcdFx0ZmluaXNoRmx1c2g6IHpsaWIuWl9TWU5DX0ZMVVNIXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBmb3IgZ3ppcFxuXHRcdFx0aWYgKGNvZGluZ3MgPT0gJ2d6aXAnIHx8IGNvZGluZ3MgPT0gJ3gtZ3ppcCcpIHtcblx0XHRcdFx0Ym9keSA9IGJvZHkucGlwZSh6bGliLmNyZWF0ZUd1bnppcCh6bGliT3B0aW9ucykpO1xuXHRcdFx0XHRyZXNwb25zZSA9IG5ldyBSZXNwb25zZShib2R5LCByZXNwb25zZV9vcHRpb25zKTtcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZm9yIGRlZmxhdGVcblx0XHRcdGlmIChjb2RpbmdzID09ICdkZWZsYXRlJyB8fCBjb2RpbmdzID09ICd4LWRlZmxhdGUnKSB7XG5cdFx0XHRcdC8vIGhhbmRsZSB0aGUgaW5mYW1vdXMgcmF3IGRlZmxhdGUgcmVzcG9uc2UgZnJvbSBvbGQgc2VydmVyc1xuXHRcdFx0XHQvLyBhIGhhY2sgZm9yIG9sZCBJSVMgYW5kIEFwYWNoZSBzZXJ2ZXJzXG5cdFx0XHRcdGNvbnN0IHJhdyA9IHJlcy5waXBlKG5ldyBQYXNzVGhyb3VnaCQxKCkpO1xuXHRcdFx0XHRyYXcub25jZSgnZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xuXHRcdFx0XHRcdC8vIHNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM3NTE5ODI4XG5cdFx0XHRcdFx0aWYgKChjaHVua1swXSAmIDB4MEYpID09PSAweDA4KSB7XG5cdFx0XHRcdFx0XHRib2R5ID0gYm9keS5waXBlKHpsaWIuY3JlYXRlSW5mbGF0ZSgpKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ym9keSA9IGJvZHkucGlwZSh6bGliLmNyZWF0ZUluZmxhdGVSYXcoKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlX29wdGlvbnMpO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBmb3IgYnJcblx0XHRcdGlmIChjb2RpbmdzID09ICdicicgJiYgdHlwZW9mIHpsaWIuY3JlYXRlQnJvdGxpRGVjb21wcmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRib2R5ID0gYm9keS5waXBlKHpsaWIuY3JlYXRlQnJvdGxpRGVjb21wcmVzcygpKTtcblx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2Vfb3B0aW9ucyk7XG5cdFx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIG90aGVyd2lzZSwgdXNlIHJlc3BvbnNlIGFzLWlzXG5cdFx0XHRyZXNwb25zZSA9IG5ldyBSZXNwb25zZShib2R5LCByZXNwb25zZV9vcHRpb25zKTtcblx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xuXHRcdH0pO1xuXG5cdFx0d3JpdGVUb1N0cmVhbShyZXEsIHJlcXVlc3QpO1xuXHR9KTtcbn1cbi8qKlxuICogUmVkaXJlY3QgY29kZSBtYXRjaGluZ1xuICpcbiAqIEBwYXJhbSAgIE51bWJlciAgIGNvZGUgIFN0YXR1cyBjb2RlXG4gKiBAcmV0dXJuICBCb29sZWFuXG4gKi9cbmZldGNoLmlzUmVkaXJlY3QgPSBmdW5jdGlvbiAoY29kZSkge1xuXHRyZXR1cm4gY29kZSA9PT0gMzAxIHx8IGNvZGUgPT09IDMwMiB8fCBjb2RlID09PSAzMDMgfHwgY29kZSA9PT0gMzA3IHx8IGNvZGUgPT09IDMwODtcbn07XG5cbi8vIGV4cG9zZSBQcm9taXNlXG5mZXRjaC5Qcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG5cbmZ1bmN0aW9uIGdldF9wYWdlX2hhbmRsZXIoXG5cdG1hbmlmZXN0LFxuXHRzZXNzaW9uX2dldHRlclxuKSB7XG5cdGNvbnN0IGdldF9idWlsZF9pbmZvID0gZGV2XG5cdFx0PyAoKSA9PiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oYnVpbGRfZGlyLCAnYnVpbGQuanNvbicpLCAndXRmLTgnKSlcblx0XHQ6IChhc3NldHMgPT4gKCkgPT4gYXNzZXRzKShKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oYnVpbGRfZGlyLCAnYnVpbGQuanNvbicpLCAndXRmLTgnKSkpO1xuXG5cdGNvbnN0IHRlbXBsYXRlID0gZGV2XG5cdFx0PyAoKSA9PiByZWFkX3RlbXBsYXRlKHNyY19kaXIpXG5cdFx0OiAoc3RyID0+ICgpID0+IHN0cikocmVhZF90ZW1wbGF0ZShidWlsZF9kaXIpKTtcblxuXHRjb25zdCBoYXNfc2VydmljZV93b3JrZXIgPSBmcy5leGlzdHNTeW5jKHBhdGguam9pbihidWlsZF9kaXIsICdzZXJ2aWNlLXdvcmtlci5qcycpKTtcblxuXHRjb25zdCB7IHNlcnZlcl9yb3V0ZXMsIHBhZ2VzIH0gPSBtYW5pZmVzdDtcblx0Y29uc3QgZXJyb3Jfcm91dGUgPSBtYW5pZmVzdC5lcnJvcjtcblxuXHRmdW5jdGlvbiBiYWlsKHJlcSwgcmVzLCBlcnIpIHtcblx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cblx0XHRjb25zdCBtZXNzYWdlID0gZGV2ID8gZXNjYXBlX2h0bWwoZXJyLm1lc3NhZ2UpIDogJ0ludGVybmFsIHNlcnZlciBlcnJvcic7XG5cblx0XHRyZXMuc3RhdHVzQ29kZSA9IDUwMDtcblx0XHRyZXMuZW5kKGA8cHJlPiR7bWVzc2FnZX08L3ByZT5gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGhhbmRsZV9lcnJvcihyZXEsIHJlcywgc3RhdHVzQ29kZSwgZXJyb3IpIHtcblx0XHRoYW5kbGVfcGFnZSh7XG5cdFx0XHRwYXR0ZXJuOiBudWxsLFxuXHRcdFx0cGFydHM6IFtcblx0XHRcdFx0eyBuYW1lOiBudWxsLCBjb21wb25lbnQ6IGVycm9yX3JvdXRlIH1cblx0XHRcdF1cblx0XHR9LCByZXEsIHJlcywgc3RhdHVzQ29kZSwgZXJyb3IgfHwgbmV3IEVycm9yKCdVbmtub3duIGVycm9yIGluIHByZWxvYWQgZnVuY3Rpb24nKSk7XG5cdH1cblxuXHRhc3luYyBmdW5jdGlvbiBoYW5kbGVfcGFnZShwYWdlLCByZXEsIHJlcywgc3RhdHVzID0gMjAwLCBlcnJvciA9IG51bGwpIHtcblx0XHRjb25zdCBpc19zZXJ2aWNlX3dvcmtlcl9pbmRleCA9IHJlcS5wYXRoID09PSAnL3NlcnZpY2Utd29ya2VyLWluZGV4Lmh0bWwnO1xuXHRcdGNvbnN0IGJ1aWxkX2luZm9cblxuXG5cblxuID0gZ2V0X2J1aWxkX2luZm8oKTtcblxuXHRcdHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L2h0bWwnKTtcblx0XHRyZXMuc2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJywgZGV2ID8gJ25vLWNhY2hlJyA6ICdtYXgtYWdlPTYwMCcpO1xuXG5cdFx0Ly8gcHJlbG9hZCBtYWluLmpzIGFuZCBjdXJyZW50IHJvdXRlXG5cdFx0Ly8gVE9ETyBkZXRlY3Qgb3RoZXIgc3R1ZmYgd2UgY2FuIHByZWxvYWQ/IGltYWdlcywgQ1NTLCBmb250cz9cblx0XHRsZXQgcHJlbG9hZGVkX2NodW5rcyA9IEFycmF5LmlzQXJyYXkoYnVpbGRfaW5mby5hc3NldHMubWFpbikgPyBidWlsZF9pbmZvLmFzc2V0cy5tYWluIDogW2J1aWxkX2luZm8uYXNzZXRzLm1haW5dO1xuXHRcdGlmICghZXJyb3IgJiYgIWlzX3NlcnZpY2Vfd29ya2VyX2luZGV4KSB7XG5cdFx0XHRwYWdlLnBhcnRzLmZvckVhY2gocGFydCA9PiB7XG5cdFx0XHRcdGlmICghcGFydCkgcmV0dXJuO1xuXG5cdFx0XHRcdC8vIHVzaW5nIGNvbmNhdCBiZWNhdXNlIGl0IGNvdWxkIGJlIGEgc3RyaW5nIG9yIGFuIGFycmF5LiB0aGFua3Mgd2VicGFjayFcblx0XHRcdFx0cHJlbG9hZGVkX2NodW5rcyA9IHByZWxvYWRlZF9jaHVua3MuY29uY2F0KGJ1aWxkX2luZm8uYXNzZXRzW3BhcnQubmFtZV0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKGJ1aWxkX2luZm8uYnVuZGxlciA9PT0gJ3JvbGx1cCcpIHtcblx0XHRcdC8vIFRPRE8gYWRkIGRlcGVuZGVuY2llcyBhbmQgQ1NTXG5cdFx0XHRjb25zdCBsaW5rID0gcHJlbG9hZGVkX2NodW5rc1xuXHRcdFx0XHQuZmlsdGVyKGZpbGUgPT4gZmlsZSAmJiAhZmlsZS5tYXRjaCgvXFwubWFwJC8pKVxuXHRcdFx0XHQubWFwKGZpbGUgPT4gYDwke3JlcS5iYXNlVXJsfS9jbGllbnQvJHtmaWxlfT47cmVsPVwibW9kdWxlcHJlbG9hZFwiYClcblx0XHRcdFx0LmpvaW4oJywgJyk7XG5cblx0XHRcdHJlcy5zZXRIZWFkZXIoJ0xpbmsnLCBsaW5rKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgbGluayA9IHByZWxvYWRlZF9jaHVua3Ncblx0XHRcdFx0LmZpbHRlcihmaWxlID0+IGZpbGUgJiYgIWZpbGUubWF0Y2goL1xcLm1hcCQvKSlcblx0XHRcdFx0Lm1hcCgoZmlsZSkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGFzID0gL1xcLmNzcyQvLnRlc3QoZmlsZSkgPyAnc3R5bGUnIDogJ3NjcmlwdCc7XG5cdFx0XHRcdFx0cmV0dXJuIGA8JHtyZXEuYmFzZVVybH0vY2xpZW50LyR7ZmlsZX0+O3JlbD1cInByZWxvYWRcIjthcz1cIiR7YXN9XCJgO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuam9pbignLCAnKTtcblxuXHRcdFx0cmVzLnNldEhlYWRlcignTGluaycsIGxpbmspO1xuXHRcdH1cblxuXHRcdGNvbnN0IHNlc3Npb24gPSBzZXNzaW9uX2dldHRlcihyZXEsIHJlcyk7XG5cblx0XHRsZXQgcmVkaXJlY3Q7XG5cdFx0bGV0IHByZWxvYWRfZXJyb3I7XG5cblx0XHRjb25zdCBwcmVsb2FkX2NvbnRleHQgPSB7XG5cdFx0XHRyZWRpcmVjdDogKHN0YXR1c0NvZGUsIGxvY2F0aW9uKSA9PiB7XG5cdFx0XHRcdGlmIChyZWRpcmVjdCAmJiAocmVkaXJlY3Quc3RhdHVzQ29kZSAhPT0gc3RhdHVzQ29kZSB8fCByZWRpcmVjdC5sb2NhdGlvbiAhPT0gbG9jYXRpb24pKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDb25mbGljdGluZyByZWRpcmVjdHNgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsb2NhdGlvbiA9IGxvY2F0aW9uLnJlcGxhY2UoL15cXC8vZywgJycpOyAvLyBsZWFkaW5nIHNsYXNoIChvbmx5KVxuXHRcdFx0XHRyZWRpcmVjdCA9IHsgc3RhdHVzQ29kZSwgbG9jYXRpb24gfTtcblx0XHRcdH0sXG5cdFx0XHRlcnJvcjogKHN0YXR1c0NvZGUsIG1lc3NhZ2UpID0+IHtcblx0XHRcdFx0cHJlbG9hZF9lcnJvciA9IHsgc3RhdHVzQ29kZSwgbWVzc2FnZSB9O1xuXHRcdFx0fSxcblx0XHRcdGZldGNoOiAodXJsLCBvcHRzKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHBhcnNlZCA9IG5ldyBVcmwuVVJMKHVybCwgYGh0dHA6Ly8xMjcuMC4wLjE6JHtwcm9jZXNzLmVudi5QT1JUfSR7cmVxLmJhc2VVcmwgPyByZXEuYmFzZVVybCArICcvJyA6Jyd9YCk7XG5cblx0XHRcdFx0aWYgKG9wdHMpIHtcblx0XHRcdFx0XHRvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0cyk7XG5cblx0XHRcdFx0XHRjb25zdCBpbmNsdWRlX2Nvb2tpZXMgPSAoXG5cdFx0XHRcdFx0XHRvcHRzLmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScgfHxcblx0XHRcdFx0XHRcdG9wdHMuY3JlZGVudGlhbHMgPT09ICdzYW1lLW9yaWdpbicgJiYgcGFyc2VkLm9yaWdpbiA9PT0gYGh0dHA6Ly8xMjcuMC4wLjE6JHtwcm9jZXNzLmVudi5QT1JUfWBcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0aWYgKGluY2x1ZGVfY29va2llcykge1xuXHRcdFx0XHRcdFx0b3B0cy5oZWFkZXJzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0cy5oZWFkZXJzKTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgY29va2llcyA9IE9iamVjdC5hc3NpZ24oXG5cdFx0XHRcdFx0XHRcdHt9LFxuXHRcdFx0XHRcdFx0XHRjb29raWUucGFyc2UocmVxLmhlYWRlcnMuY29va2llIHx8ICcnKSxcblx0XHRcdFx0XHRcdFx0Y29va2llLnBhcnNlKG9wdHMuaGVhZGVycy5jb29raWUgfHwgJycpXG5cdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRjb25zdCBzZXRfY29va2llID0gcmVzLmdldEhlYWRlcignU2V0LUNvb2tpZScpO1xuXHRcdFx0XHRcdFx0KEFycmF5LmlzQXJyYXkoc2V0X2Nvb2tpZSkgPyBzZXRfY29va2llIDogW3NldF9jb29raWVdKS5mb3JFYWNoKHN0ciA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gLyhbXj1dKyk9KFteO10rKS8uZXhlYyhzdHIpO1xuXHRcdFx0XHRcdFx0XHRpZiAobWF0Y2gpIGNvb2tpZXNbbWF0Y2hbMV1dID0gbWF0Y2hbMl07XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0Y29uc3Qgc3RyID0gT2JqZWN0LmtleXMoY29va2llcylcblx0XHRcdFx0XHRcdFx0Lm1hcChrZXkgPT4gYCR7a2V5fT0ke2Nvb2tpZXNba2V5XX1gKVxuXHRcdFx0XHRcdFx0XHQuam9pbignOyAnKTtcblxuXHRcdFx0XHRcdFx0b3B0cy5oZWFkZXJzLmNvb2tpZSA9IHN0cjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmV0Y2gocGFyc2VkLmhyZWYsIG9wdHMpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRsZXQgcHJlbG9hZGVkO1xuXHRcdGxldCBtYXRjaDtcblx0XHRsZXQgcGFyYW1zO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJvb3RfcHJlbG9hZGVkID0gbWFuaWZlc3Qucm9vdF9wcmVsb2FkXG5cdFx0XHRcdD8gbWFuaWZlc3Qucm9vdF9wcmVsb2FkLmNhbGwocHJlbG9hZF9jb250ZXh0LCB7XG5cdFx0XHRcdFx0aG9zdDogcmVxLmhlYWRlcnMuaG9zdCxcblx0XHRcdFx0XHRwYXRoOiByZXEucGF0aCxcblx0XHRcdFx0XHRxdWVyeTogcmVxLnF1ZXJ5LFxuXHRcdFx0XHRcdHBhcmFtczoge31cblx0XHRcdFx0fSwgc2Vzc2lvbilcblx0XHRcdFx0OiB7fTtcblxuXHRcdFx0bWF0Y2ggPSBlcnJvciA/IG51bGwgOiBwYWdlLnBhdHRlcm4uZXhlYyhyZXEucGF0aCk7XG5cblxuXHRcdFx0bGV0IHRvUHJlbG9hZCA9IFtyb290X3ByZWxvYWRlZF07XG5cdFx0XHRpZiAoIWlzX3NlcnZpY2Vfd29ya2VyX2luZGV4KSB7XG5cdFx0XHRcdHRvUHJlbG9hZCA9IHRvUHJlbG9hZC5jb25jYXQocGFnZS5wYXJ0cy5tYXAocGFydCA9PiB7XG5cdFx0XHRcdFx0aWYgKCFwYXJ0KSByZXR1cm4gbnVsbDtcblxuXHRcdFx0XHRcdC8vIHRoZSBkZWVwZXN0IGxldmVsIGlzIHVzZWQgYmVsb3csIHRvIGluaXRpYWxpc2UgdGhlIHN0b3JlXG5cdFx0XHRcdFx0cGFyYW1zID0gcGFydC5wYXJhbXMgPyBwYXJ0LnBhcmFtcyhtYXRjaCkgOiB7fTtcblxuXHRcdFx0XHRcdHJldHVybiBwYXJ0LnByZWxvYWRcblx0XHRcdFx0XHRcdD8gcGFydC5wcmVsb2FkLmNhbGwocHJlbG9hZF9jb250ZXh0LCB7XG5cdFx0XHRcdFx0XHRcdGhvc3Q6IHJlcS5oZWFkZXJzLmhvc3QsXG5cdFx0XHRcdFx0XHRcdHBhdGg6IHJlcS5wYXRoLFxuXHRcdFx0XHRcdFx0XHRxdWVyeTogcmVxLnF1ZXJ5LFxuXHRcdFx0XHRcdFx0XHRwYXJhbXNcblx0XHRcdFx0XHRcdH0sIHNlc3Npb24pXG5cdFx0XHRcdFx0XHQ6IHt9O1xuXHRcdFx0XHR9KSk7XG5cdFx0XHR9XG5cblx0XHRcdHByZWxvYWRlZCA9IGF3YWl0IFByb21pc2UuYWxsKHRvUHJlbG9hZCk7XG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0cmV0dXJuIGJhaWwocmVxLCByZXMsIGVycilcblx0XHRcdH1cblxuXHRcdFx0cHJlbG9hZF9lcnJvciA9IHsgc3RhdHVzQ29kZTogNTAwLCBtZXNzYWdlOiBlcnIgfTtcblx0XHRcdHByZWxvYWRlZCA9IFtdOyAvLyBhcHBlYXNlIFR5cGVTY3JpcHRcblx0XHR9XG5cblx0XHR0cnkge1xuXHRcdFx0aWYgKHJlZGlyZWN0KSB7XG5cdFx0XHRcdGNvbnN0IGxvY2F0aW9uID0gVXJsLnJlc29sdmUoKHJlcS5iYXNlVXJsIHx8ICcnKSArICcvJywgcmVkaXJlY3QubG9jYXRpb24pO1xuXG5cdFx0XHRcdHJlcy5zdGF0dXNDb2RlID0gcmVkaXJlY3Quc3RhdHVzQ29kZTtcblx0XHRcdFx0cmVzLnNldEhlYWRlcignTG9jYXRpb24nLCBsb2NhdGlvbik7XG5cdFx0XHRcdHJlcy5lbmQoKTtcblxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChwcmVsb2FkX2Vycm9yKSB7XG5cdFx0XHRcdGhhbmRsZV9lcnJvcihyZXEsIHJlcywgcHJlbG9hZF9lcnJvci5zdGF0dXNDb2RlLCBwcmVsb2FkX2Vycm9yLm1lc3NhZ2UpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHNlZ21lbnRzID0gcmVxLnBhdGguc3BsaXQoJy8nKS5maWx0ZXIoQm9vbGVhbik7XG5cblx0XHRcdC8vIFRPRE8gbWFrZSB0aGlzIGxlc3MgY29uZnVzaW5nXG5cdFx0XHRjb25zdCBsYXlvdXRfc2VnbWVudHMgPSBbc2VnbWVudHNbMF1dO1xuXHRcdFx0bGV0IGwgPSAxO1xuXG5cdFx0XHRwYWdlLnBhcnRzLmZvckVhY2goKHBhcnQsIGkpID0+IHtcblx0XHRcdFx0bGF5b3V0X3NlZ21lbnRzW2xdID0gc2VnbWVudHNbaSArIDFdO1xuXHRcdFx0XHRpZiAoIXBhcnQpIHJldHVybiBudWxsO1xuXHRcdFx0XHRsKys7XG5cdFx0XHR9KTtcblxuXHRcdFx0Y29uc3QgcHJvcHMgPSB7XG5cdFx0XHRcdHN0b3Jlczoge1xuXHRcdFx0XHRcdHBhZ2U6IHtcblx0XHRcdFx0XHRcdHN1YnNjcmliZTogd3JpdGFibGUoe1xuXHRcdFx0XHRcdFx0XHRob3N0OiByZXEuaGVhZGVycy5ob3N0LFxuXHRcdFx0XHRcdFx0XHRwYXRoOiByZXEucGF0aCxcblx0XHRcdFx0XHRcdFx0cXVlcnk6IHJlcS5xdWVyeSxcblx0XHRcdFx0XHRcdFx0cGFyYW1zXG5cdFx0XHRcdFx0XHR9KS5zdWJzY3JpYmVcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHByZWxvYWRpbmc6IHtcblx0XHRcdFx0XHRcdHN1YnNjcmliZTogd3JpdGFibGUobnVsbCkuc3Vic2NyaWJlXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXNzaW9uOiB3cml0YWJsZShzZXNzaW9uKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZWdtZW50czogbGF5b3V0X3NlZ21lbnRzLFxuXHRcdFx0XHRzdGF0dXM6IGVycm9yID8gc3RhdHVzIDogMjAwLFxuXHRcdFx0XHRlcnJvcjogZXJyb3IgPyBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IgOiB7IG1lc3NhZ2U6IGVycm9yIH0gOiBudWxsLFxuXHRcdFx0XHRsZXZlbDA6IHtcblx0XHRcdFx0XHRwcm9wczogcHJlbG9hZGVkWzBdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGxldmVsMToge1xuXHRcdFx0XHRcdHNlZ21lbnQ6IHNlZ21lbnRzWzBdLFxuXHRcdFx0XHRcdHByb3BzOiB7fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAoIWlzX3NlcnZpY2Vfd29ya2VyX2luZGV4KSB7XG5cdFx0XHRcdGxldCBsID0gMTtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYWdlLnBhcnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFydCA9IHBhZ2UucGFydHNbaV07XG5cdFx0XHRcdFx0aWYgKCFwYXJ0KSBjb250aW51ZTtcblxuXHRcdFx0XHRcdHByb3BzW2BsZXZlbCR7bCsrfWBdID0ge1xuXHRcdFx0XHRcdFx0Y29tcG9uZW50OiBwYXJ0LmNvbXBvbmVudCxcblx0XHRcdFx0XHRcdHByb3BzOiBwcmVsb2FkZWRbaSArIDFdIHx8IHt9LFxuXHRcdFx0XHRcdFx0c2VnbWVudDogc2VnbWVudHNbaV1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHsgaHRtbCwgaGVhZCwgY3NzIH0gPSBBcHAucmVuZGVyKHByb3BzKTtcblxuXHRcdFx0Y29uc3Qgc2VyaWFsaXplZCA9IHtcblx0XHRcdFx0cHJlbG9hZGVkOiBgWyR7cHJlbG9hZGVkLm1hcChkYXRhID0+IHRyeV9zZXJpYWxpemUoZGF0YSkpLmpvaW4oJywnKX1dYCxcblx0XHRcdFx0c2Vzc2lvbjogc2Vzc2lvbiAmJiB0cnlfc2VyaWFsaXplKHNlc3Npb24sIGVyciA9PiB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gc2VyaWFsaXplIHNlc3Npb24gZGF0YTogJHtlcnIubWVzc2FnZX1gKTtcblx0XHRcdFx0fSksXG5cdFx0XHRcdGVycm9yOiBlcnJvciAmJiB0cnlfc2VyaWFsaXplKHByb3BzLmVycm9yKVxuXHRcdFx0fTtcblxuXHRcdFx0bGV0IHNjcmlwdCA9IGBfX1NBUFBFUl9fPXske1tcblx0XHRcdFx0ZXJyb3IgJiYgYGVycm9yOiR7c2VyaWFsaXplZC5lcnJvcn0sc3RhdHVzOiR7c3RhdHVzfWAsXG5cdFx0XHRcdGBiYXNlVXJsOlwiJHtyZXEuYmFzZVVybH1cImAsXG5cdFx0XHRcdHNlcmlhbGl6ZWQucHJlbG9hZGVkICYmIGBwcmVsb2FkZWQ6JHtzZXJpYWxpemVkLnByZWxvYWRlZH1gLFxuXHRcdFx0XHRzZXJpYWxpemVkLnNlc3Npb24gJiYgYHNlc3Npb246JHtzZXJpYWxpemVkLnNlc3Npb259YFxuXHRcdFx0XS5maWx0ZXIoQm9vbGVhbikuam9pbignLCcpfX07YDtcblxuXHRcdFx0aWYgKGhhc19zZXJ2aWNlX3dvcmtlcikge1xuXHRcdFx0XHRzY3JpcHQgKz0gYGlmKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoJyR7cmVxLmJhc2VVcmx9L3NlcnZpY2Utd29ya2VyLmpzJyk7YDtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZmlsZSA9IFtdLmNvbmNhdChidWlsZF9pbmZvLmFzc2V0cy5tYWluKS5maWx0ZXIoZmlsZSA9PiBmaWxlICYmIC9cXC5qcyQvLnRlc3QoZmlsZSkpWzBdO1xuXHRcdFx0Y29uc3QgbWFpbiA9IGAke3JlcS5iYXNlVXJsfS9jbGllbnQvJHtmaWxlfWA7XG5cblx0XHRcdGlmIChidWlsZF9pbmZvLmJ1bmRsZXIgPT09ICdyb2xsdXAnKSB7XG5cdFx0XHRcdGlmIChidWlsZF9pbmZvLmxlZ2FjeV9hc3NldHMpIHtcblx0XHRcdFx0XHRjb25zdCBsZWdhY3lfbWFpbiA9IGAke3JlcS5iYXNlVXJsfS9jbGllbnQvbGVnYWN5LyR7YnVpbGRfaW5mby5sZWdhY3lfYXNzZXRzLm1haW59YDtcblx0XHRcdFx0XHRzY3JpcHQgKz0gYChmdW5jdGlvbigpe3RyeXtldmFsKFwiYXN5bmMgZnVuY3Rpb24geCgpe31cIik7dmFyIG1haW49XCIke21haW59XCJ9Y2F0Y2goZSl7bWFpbj1cIiR7bGVnYWN5X21haW59XCJ9O3ZhciBzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7dHJ5e25ldyBGdW5jdGlvbihcImlmKDApaW1wb3J0KCcnKVwiKSgpO3Muc3JjPW1haW47cy50eXBlPVwibW9kdWxlXCI7cy5jcm9zc09yaWdpbj1cInVzZS1jcmVkZW50aWFsc1wiO31jYXRjaChlKXtzLnNyYz1cIiR7cmVxLmJhc2VVcmx9L2NsaWVudC9zaGltcG9ydEAke2J1aWxkX2luZm8uc2hpbXBvcnR9LmpzXCI7cy5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1haW5cIixtYWluKTt9ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKTt9KCkpO2A7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c2NyaXB0ICs9IGB2YXIgcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO3RyeXtuZXcgRnVuY3Rpb24oXCJpZigwKWltcG9ydCgnJylcIikoKTtzLnNyYz1cIiR7bWFpbn1cIjtzLnR5cGU9XCJtb2R1bGVcIjtzLmNyb3NzT3JpZ2luPVwidXNlLWNyZWRlbnRpYWxzXCI7fWNhdGNoKGUpe3Muc3JjPVwiJHtyZXEuYmFzZVVybH0vY2xpZW50L3NoaW1wb3J0QCR7YnVpbGRfaW5mby5zaGltcG9ydH0uanNcIjtzLnNldEF0dHJpYnV0ZShcImRhdGEtbWFpblwiLFwiJHttYWlufVwiKX1kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHMpYDtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2NyaXB0ICs9IGA8L3NjcmlwdD48c2NyaXB0IHNyYz1cIiR7bWFpbn1cIj5gO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgc3R5bGVzO1xuXG5cdFx0XHQvLyBUT0RPIG1ha2UgdGhpcyBjb25zaXN0ZW50IGFjcm9zcyBhcHBzXG5cdFx0XHQvLyBUT0RPIGVtYmVkIGJ1aWxkX2luZm8gaW4gcGxhY2Vob2xkZXIudHNcblx0XHRcdGlmIChidWlsZF9pbmZvLmNzcyAmJiBidWlsZF9pbmZvLmNzcy5tYWluKSB7XG5cdFx0XHRcdGNvbnN0IGNzc19jaHVua3MgPSBuZXcgU2V0KCk7XG5cdFx0XHRcdGlmIChidWlsZF9pbmZvLmNzcy5tYWluKSBjc3NfY2h1bmtzLmFkZChidWlsZF9pbmZvLmNzcy5tYWluKTtcblx0XHRcdFx0cGFnZS5wYXJ0cy5mb3JFYWNoKHBhcnQgPT4ge1xuXHRcdFx0XHRcdGlmICghcGFydCkgcmV0dXJuO1xuXHRcdFx0XHRcdGNvbnN0IGNzc19jaHVua3NfZm9yX3BhcnQgPSBidWlsZF9pbmZvLmNzcy5jaHVua3NbcGFydC5maWxlXTtcblxuXHRcdFx0XHRcdGlmIChjc3NfY2h1bmtzX2Zvcl9wYXJ0KSB7XG5cdFx0XHRcdFx0XHRjc3NfY2h1bmtzX2Zvcl9wYXJ0LmZvckVhY2goZmlsZSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNzc19jaHVua3MuYWRkKGZpbGUpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRzdHlsZXMgPSBBcnJheS5mcm9tKGNzc19jaHVua3MpXG5cdFx0XHRcdFx0Lm1hcChocmVmID0+IGA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImNsaWVudC8ke2hyZWZ9XCI+YClcblx0XHRcdFx0XHQuam9pbignJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzdHlsZXMgPSAoY3NzICYmIGNzcy5jb2RlID8gYDxzdHlsZT4ke2Nzcy5jb2RlfTwvc3R5bGU+YCA6ICcnKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gdXNlcnMgY2FuIHNldCBhIENTUCBub25jZSB1c2luZyByZXMubG9jYWxzLm5vbmNlXG5cdFx0XHRjb25zdCBub25jZV9hdHRyID0gKHJlcy5sb2NhbHMgJiYgcmVzLmxvY2Fscy5ub25jZSkgPyBgIG5vbmNlPVwiJHtyZXMubG9jYWxzLm5vbmNlfVwiYCA6ICcnO1xuXG5cdFx0XHRjb25zdCBib2R5ID0gdGVtcGxhdGUoKVxuXHRcdFx0XHQucmVwbGFjZSgnJXNhcHBlci5iYXNlJScsICgpID0+IGA8YmFzZSBocmVmPVwiJHtyZXEuYmFzZVVybH0vXCI+YClcblx0XHRcdFx0LnJlcGxhY2UoJyVzYXBwZXIuc2NyaXB0cyUnLCAoKSA9PiBgPHNjcmlwdCR7bm9uY2VfYXR0cn0+JHtzY3JpcHR9PC9zY3JpcHQ+YClcblx0XHRcdFx0LnJlcGxhY2UoJyVzYXBwZXIuaHRtbCUnLCAoKSA9PiBodG1sKVxuXHRcdFx0XHQucmVwbGFjZSgnJXNhcHBlci5oZWFkJScsICgpID0+IGA8bm9zY3JpcHQgaWQ9J3NhcHBlci1oZWFkLXN0YXJ0Jz48L25vc2NyaXB0PiR7aGVhZH08bm9zY3JpcHQgaWQ9J3NhcHBlci1oZWFkLWVuZCc+PC9ub3NjcmlwdD5gKVxuXHRcdFx0XHQucmVwbGFjZSgnJXNhcHBlci5zdHlsZXMlJywgKCkgPT4gc3R5bGVzKTtcblxuXHRcdFx0cmVzLnN0YXR1c0NvZGUgPSBzdGF0dXM7XG5cdFx0XHRyZXMuZW5kKGJvZHkpO1xuXHRcdH0gY2F0Y2goZXJyKSB7XG5cdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0YmFpbChyZXEsIHJlcywgZXJyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhhbmRsZV9lcnJvcihyZXEsIHJlcywgNTAwLCBlcnIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmdW5jdGlvbiBmaW5kX3JvdXRlKHJlcSwgcmVzLCBuZXh0KSB7XG5cdFx0aWYgKHJlcS5wYXRoID09PSAnL3NlcnZpY2Utd29ya2VyLWluZGV4Lmh0bWwnKSB7XG5cdFx0XHRjb25zdCBob21lUGFnZSA9IHBhZ2VzLmZpbmQocGFnZSA9PiBwYWdlLnBhdHRlcm4udGVzdCgnLycpKTtcblx0XHRcdGhhbmRsZV9wYWdlKGhvbWVQYWdlLCByZXEsIHJlcyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Zm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XG5cdFx0XHRpZiAocGFnZS5wYXR0ZXJuLnRlc3QocmVxLnBhdGgpKSB7XG5cdFx0XHRcdGhhbmRsZV9wYWdlKHBhZ2UsIHJlcSwgcmVzKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGhhbmRsZV9lcnJvcihyZXEsIHJlcywgNDA0LCAnTm90IGZvdW5kJyk7XG5cdH07XG59XG5cbmZ1bmN0aW9uIHJlYWRfdGVtcGxhdGUoZGlyID0gYnVpbGRfZGlyKSB7XG5cdHJldHVybiBmcy5yZWFkRmlsZVN5bmMoYCR7ZGlyfS90ZW1wbGF0ZS5odG1sYCwgJ3V0Zi04Jyk7XG59XG5cbmZ1bmN0aW9uIHRyeV9zZXJpYWxpemUoZGF0YSwgZmFpbCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBkZXZhbHVlKGRhdGEpO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHRpZiAoZmFpbCkgZmFpbChlcnIpO1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGVzY2FwZV9odG1sKGh0bWwpIHtcblx0Y29uc3QgY2hhcnMgPSB7XG5cdFx0J1wiJyA6ICdxdW90Jyxcblx0XHRcIidcIjogJyMzOScsXG5cdFx0JyYnOiAnYW1wJyxcblx0XHQnPCcgOiAnbHQnLFxuXHRcdCc+JyA6ICdndCdcblx0fTtcblxuXHRyZXR1cm4gaHRtbC5yZXBsYWNlKC9bXCInJjw+XS9nLCBjID0+IGAmJHtjaGFyc1tjXX07YCk7XG59XG5cbnZhciBtaW1lX3JhdyA9IFwiYXBwbGljYXRpb24vYW5kcmV3LWluc2V0XFx0XFx0XFx0ZXpcXG5hcHBsaWNhdGlvbi9hcHBsaXh3YXJlXFx0XFx0XFx0XFx0YXdcXG5hcHBsaWNhdGlvbi9hdG9tK3htbFxcdFxcdFxcdFxcdGF0b21cXG5hcHBsaWNhdGlvbi9hdG9tY2F0K3htbFxcdFxcdFxcdFxcdGF0b21jYXRcXG5hcHBsaWNhdGlvbi9hdG9tc3ZjK3htbFxcdFxcdFxcdFxcdGF0b21zdmNcXG5hcHBsaWNhdGlvbi9jY3htbCt4bWxcXHRcXHRcXHRcXHRjY3htbFxcbmFwcGxpY2F0aW9uL2NkbWktY2FwYWJpbGl0eVxcdFxcdFxcdGNkbWlhXFxuYXBwbGljYXRpb24vY2RtaS1jb250YWluZXJcXHRcXHRcXHRjZG1pY1xcbmFwcGxpY2F0aW9uL2NkbWktZG9tYWluXFx0XFx0XFx0XFx0Y2RtaWRcXG5hcHBsaWNhdGlvbi9jZG1pLW9iamVjdFxcdFxcdFxcdFxcdGNkbWlvXFxuYXBwbGljYXRpb24vY2RtaS1xdWV1ZVxcdFxcdFxcdFxcdGNkbWlxXFxuYXBwbGljYXRpb24vY3Utc2VlbWVcXHRcXHRcXHRcXHRjdVxcbmFwcGxpY2F0aW9uL2Rhdm1vdW50K3htbFxcdFxcdFxcdGRhdm1vdW50XFxuYXBwbGljYXRpb24vZG9jYm9vayt4bWxcXHRcXHRcXHRcXHRkYmtcXG5hcHBsaWNhdGlvbi9kc3NjK2RlclxcdFxcdFxcdFxcdGRzc2NcXG5hcHBsaWNhdGlvbi9kc3NjK3htbFxcdFxcdFxcdFxcdHhkc3NjXFxuYXBwbGljYXRpb24vZWNtYXNjcmlwdFxcdFxcdFxcdFxcdGVjbWFcXG5hcHBsaWNhdGlvbi9lbW1hK3htbFxcdFxcdFxcdFxcdGVtbWFcXG5hcHBsaWNhdGlvbi9lcHViK3ppcFxcdFxcdFxcdFxcdGVwdWJcXG5hcHBsaWNhdGlvbi9leGlcXHRcXHRcXHRcXHRcXHRleGlcXG5hcHBsaWNhdGlvbi9mb250LXRkcGZyXFx0XFx0XFx0XFx0cGZyXFxuYXBwbGljYXRpb24vZ21sK3htbFxcdFxcdFxcdFxcdGdtbFxcbmFwcGxpY2F0aW9uL2dweCt4bWxcXHRcXHRcXHRcXHRncHhcXG5hcHBsaWNhdGlvbi9neGZcXHRcXHRcXHRcXHRcXHRneGZcXG5hcHBsaWNhdGlvbi9oeXBlcnN0dWRpb1xcdFxcdFxcdFxcdHN0a1xcbmFwcGxpY2F0aW9uL2lua21sK3htbFxcdFxcdFxcdFxcdGluayBpbmttbFxcbmFwcGxpY2F0aW9uL2lwZml4XFx0XFx0XFx0XFx0aXBmaXhcXG5hcHBsaWNhdGlvbi9qYXZhLWFyY2hpdmVcXHRcXHRcXHRqYXJcXG5hcHBsaWNhdGlvbi9qYXZhLXNlcmlhbGl6ZWQtb2JqZWN0XFx0XFx0c2VyXFxuYXBwbGljYXRpb24vamF2YS12bVxcdFxcdFxcdFxcdGNsYXNzXFxuYXBwbGljYXRpb24vamF2YXNjcmlwdFxcdFxcdFxcdFxcdGpzXFxuYXBwbGljYXRpb24vanNvblxcdFxcdFxcdFxcdGpzb24gbWFwXFxuYXBwbGljYXRpb24vanNvbm1sK2pzb25cXHRcXHRcXHRcXHRqc29ubWxcXG5hcHBsaWNhdGlvbi9sb3N0K3htbFxcdFxcdFxcdFxcdGxvc3R4bWxcXG5hcHBsaWNhdGlvbi9tYWMtYmluaGV4NDBcXHRcXHRcXHRocXhcXG5hcHBsaWNhdGlvbi9tYWMtY29tcGFjdHByb1xcdFxcdFxcdGNwdFxcbmFwcGxpY2F0aW9uL21hZHMreG1sXFx0XFx0XFx0XFx0bWFkc1xcbmFwcGxpY2F0aW9uL21hcmNcXHRcXHRcXHRcXHRtcmNcXG5hcHBsaWNhdGlvbi9tYXJjeG1sK3htbFxcdFxcdFxcdFxcdG1yY3hcXG5hcHBsaWNhdGlvbi9tYXRoZW1hdGljYVxcdFxcdFxcdFxcdG1hIG5iIG1iXFxuYXBwbGljYXRpb24vbWF0aG1sK3htbFxcdFxcdFxcdFxcdG1hdGhtbFxcbmFwcGxpY2F0aW9uL21ib3hcXHRcXHRcXHRcXHRtYm94XFxuYXBwbGljYXRpb24vbWVkaWFzZXJ2ZXJjb250cm9sK3htbFxcdFxcdG1zY21sXFxuYXBwbGljYXRpb24vbWV0YWxpbmsreG1sXFx0XFx0XFx0bWV0YWxpbmtcXG5hcHBsaWNhdGlvbi9tZXRhbGluazQreG1sXFx0XFx0XFx0bWV0YTRcXG5hcHBsaWNhdGlvbi9tZXRzK3htbFxcdFxcdFxcdFxcdG1ldHNcXG5hcHBsaWNhdGlvbi9tb2RzK3htbFxcdFxcdFxcdFxcdG1vZHNcXG5hcHBsaWNhdGlvbi9tcDIxXFx0XFx0XFx0XFx0bTIxIG1wMjFcXG5hcHBsaWNhdGlvbi9tcDRcXHRcXHRcXHRcXHRcXHRtcDRzXFxuYXBwbGljYXRpb24vbXN3b3JkXFx0XFx0XFx0XFx0ZG9jIGRvdFxcbmFwcGxpY2F0aW9uL214ZlxcdFxcdFxcdFxcdFxcdG14ZlxcbmFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVxcdGJpbiBkbXMgbHJmIG1hciBzbyBkaXN0IGRpc3R6IHBrZyBicGsgZHVtcCBlbGMgZGVwbG95XFxuYXBwbGljYXRpb24vb2RhXFx0XFx0XFx0XFx0XFx0b2RhXFxuYXBwbGljYXRpb24vb2VicHMtcGFja2FnZSt4bWxcXHRcXHRcXHRvcGZcXG5hcHBsaWNhdGlvbi9vZ2dcXHRcXHRcXHRcXHRcXHRvZ3hcXG5hcHBsaWNhdGlvbi9vbWRvYyt4bWxcXHRcXHRcXHRcXHRvbWRvY1xcbmFwcGxpY2F0aW9uL29uZW5vdGVcXHRcXHRcXHRcXHRvbmV0b2Mgb25ldG9jMiBvbmV0bXAgb25lcGtnXFxuYXBwbGljYXRpb24vb3hwc1xcdFxcdFxcdFxcdG94cHNcXG5hcHBsaWNhdGlvbi9wYXRjaC1vcHMtZXJyb3IreG1sXFx0XFx0XFx0eGVyXFxuYXBwbGljYXRpb24vcGRmXFx0XFx0XFx0XFx0XFx0cGRmXFxuYXBwbGljYXRpb24vcGdwLWVuY3J5cHRlZFxcdFxcdFxcdHBncFxcbmFwcGxpY2F0aW9uL3BncC1zaWduYXR1cmVcXHRcXHRcXHRhc2Mgc2lnXFxuYXBwbGljYXRpb24vcGljcy1ydWxlc1xcdFxcdFxcdFxcdHByZlxcbmFwcGxpY2F0aW9uL3BrY3MxMFxcdFxcdFxcdFxcdHAxMFxcbmFwcGxpY2F0aW9uL3BrY3M3LW1pbWVcXHRcXHRcXHRcXHRwN20gcDdjXFxuYXBwbGljYXRpb24vcGtjczctc2lnbmF0dXJlXFx0XFx0XFx0cDdzXFxuYXBwbGljYXRpb24vcGtjczhcXHRcXHRcXHRcXHRwOFxcbmFwcGxpY2F0aW9uL3BraXgtYXR0ci1jZXJ0XFx0XFx0XFx0YWNcXG5hcHBsaWNhdGlvbi9wa2l4LWNlcnRcXHRcXHRcXHRcXHRjZXJcXG5hcHBsaWNhdGlvbi9wa2l4LWNybFxcdFxcdFxcdFxcdGNybFxcbmFwcGxpY2F0aW9uL3BraXgtcGtpcGF0aFxcdFxcdFxcdHBraXBhdGhcXG5hcHBsaWNhdGlvbi9wa2l4Y21wXFx0XFx0XFx0XFx0cGtpXFxuYXBwbGljYXRpb24vcGxzK3htbFxcdFxcdFxcdFxcdHBsc1xcbmFwcGxpY2F0aW9uL3Bvc3RzY3JpcHRcXHRcXHRcXHRcXHRhaSBlcHMgcHNcXG5hcHBsaWNhdGlvbi9wcnMuY3d3XFx0XFx0XFx0XFx0Y3d3XFxuYXBwbGljYXRpb24vcHNrYyt4bWxcXHRcXHRcXHRcXHRwc2tjeG1sXFxuYXBwbGljYXRpb24vcmRmK3htbFxcdFxcdFxcdFxcdHJkZlxcbmFwcGxpY2F0aW9uL3JlZ2luZm8reG1sXFx0XFx0XFx0XFx0cmlmXFxuYXBwbGljYXRpb24vcmVsYXgtbmctY29tcGFjdC1zeW50YXhcXHRcXHRybmNcXG5hcHBsaWNhdGlvbi9yZXNvdXJjZS1saXN0cyt4bWxcXHRcXHRcXHRybFxcbmFwcGxpY2F0aW9uL3Jlc291cmNlLWxpc3RzLWRpZmYreG1sXFx0XFx0cmxkXFxuYXBwbGljYXRpb24vcmxzLXNlcnZpY2VzK3htbFxcdFxcdFxcdHJzXFxuYXBwbGljYXRpb24vcnBraS1naG9zdGJ1c3RlcnNcXHRcXHRcXHRnYnJcXG5hcHBsaWNhdGlvbi9ycGtpLW1hbmlmZXN0XFx0XFx0XFx0bWZ0XFxuYXBwbGljYXRpb24vcnBraS1yb2FcXHRcXHRcXHRcXHRyb2FcXG5hcHBsaWNhdGlvbi9yc2QreG1sXFx0XFx0XFx0XFx0cnNkXFxuYXBwbGljYXRpb24vcnNzK3htbFxcdFxcdFxcdFxcdHJzc1xcbmFwcGxpY2F0aW9uL3J0ZlxcdFxcdFxcdFxcdFxcdHJ0ZlxcbmFwcGxpY2F0aW9uL3NibWwreG1sXFx0XFx0XFx0XFx0c2JtbFxcbmFwcGxpY2F0aW9uL3NjdnAtY3YtcmVxdWVzdFxcdFxcdFxcdHNjcVxcbmFwcGxpY2F0aW9uL3NjdnAtY3YtcmVzcG9uc2VcXHRcXHRcXHRzY3NcXG5hcHBsaWNhdGlvbi9zY3ZwLXZwLXJlcXVlc3RcXHRcXHRcXHRzcHFcXG5hcHBsaWNhdGlvbi9zY3ZwLXZwLXJlc3BvbnNlXFx0XFx0XFx0c3BwXFxuYXBwbGljYXRpb24vc2RwXFx0XFx0XFx0XFx0XFx0c2RwXFxuYXBwbGljYXRpb24vc2V0LXBheW1lbnQtaW5pdGlhdGlvblxcdFxcdHNldHBheVxcbmFwcGxpY2F0aW9uL3NldC1yZWdpc3RyYXRpb24taW5pdGlhdGlvblxcdFxcdHNldHJlZ1xcbmFwcGxpY2F0aW9uL3NoZit4bWxcXHRcXHRcXHRcXHRzaGZcXG5hcHBsaWNhdGlvbi9zbWlsK3htbFxcdFxcdFxcdFxcdHNtaSBzbWlsXFxuYXBwbGljYXRpb24vc3BhcnFsLXF1ZXJ5XFx0XFx0XFx0cnFcXG5hcHBsaWNhdGlvbi9zcGFycWwtcmVzdWx0cyt4bWxcXHRcXHRcXHRzcnhcXG5hcHBsaWNhdGlvbi9zcmdzXFx0XFx0XFx0XFx0Z3JhbVxcbmFwcGxpY2F0aW9uL3NyZ3MreG1sXFx0XFx0XFx0XFx0Z3J4bWxcXG5hcHBsaWNhdGlvbi9zcnUreG1sXFx0XFx0XFx0XFx0c3J1XFxuYXBwbGljYXRpb24vc3NkbCt4bWxcXHRcXHRcXHRcXHRzc2RsXFxuYXBwbGljYXRpb24vc3NtbCt4bWxcXHRcXHRcXHRcXHRzc21sXFxuYXBwbGljYXRpb24vdGVpK3htbFxcdFxcdFxcdFxcdHRlaSB0ZWljb3JwdXNcXG5hcHBsaWNhdGlvbi90aHJhdWQreG1sXFx0XFx0XFx0XFx0dGZpXFxuYXBwbGljYXRpb24vdGltZXN0YW1wZWQtZGF0YVxcdFxcdFxcdHRzZFxcbmFwcGxpY2F0aW9uL3ZuZC4zZ3BwLnBpYy1idy1sYXJnZVxcdFxcdHBsYlxcbmFwcGxpY2F0aW9uL3ZuZC4zZ3BwLnBpYy1idy1zbWFsbFxcdFxcdHBzYlxcbmFwcGxpY2F0aW9uL3ZuZC4zZ3BwLnBpYy1idy12YXJcXHRcXHRcXHRwdmJcXG5hcHBsaWNhdGlvbi92bmQuM2dwcDIudGNhcFxcdFxcdFxcdHRjYXBcXG5hcHBsaWNhdGlvbi92bmQuM20ucG9zdC1pdC1ub3Rlc1xcdFxcdHB3blxcbmFwcGxpY2F0aW9uL3ZuZC5hY2NwYWMuc2ltcGx5LmFzb1xcdFxcdGFzb1xcbmFwcGxpY2F0aW9uL3ZuZC5hY2NwYWMuc2ltcGx5LmltcFxcdFxcdGltcFxcbmFwcGxpY2F0aW9uL3ZuZC5hY3Vjb2JvbFxcdFxcdFxcdGFjdVxcbmFwcGxpY2F0aW9uL3ZuZC5hY3Vjb3JwXFx0XFx0XFx0XFx0YXRjIGFjdXRjXFxuYXBwbGljYXRpb24vdm5kLmFkb2JlLmFpci1hcHBsaWNhdGlvbi1pbnN0YWxsZXItcGFja2FnZSt6aXBcXHRhaXJcXG5hcHBsaWNhdGlvbi92bmQuYWRvYmUuZm9ybXNjZW50cmFsLmZjZHRcXHRcXHRmY2R0XFxuYXBwbGljYXRpb24vdm5kLmFkb2JlLmZ4cFxcdFxcdFxcdGZ4cCBmeHBsXFxuYXBwbGljYXRpb24vdm5kLmFkb2JlLnhkcCt4bWxcXHRcXHRcXHR4ZHBcXG5hcHBsaWNhdGlvbi92bmQuYWRvYmUueGZkZlxcdFxcdFxcdHhmZGZcXG5hcHBsaWNhdGlvbi92bmQuYWhlYWQuc3BhY2VcXHRcXHRcXHRhaGVhZFxcbmFwcGxpY2F0aW9uL3ZuZC5haXJ6aXAuZmlsZXNlY3VyZS5hemZcXHRcXHRhemZcXG5hcHBsaWNhdGlvbi92bmQuYWlyemlwLmZpbGVzZWN1cmUuYXpzXFx0XFx0YXpzXFxuYXBwbGljYXRpb24vdm5kLmFtYXpvbi5lYm9va1xcdFxcdFxcdGF6d1xcbmFwcGxpY2F0aW9uL3ZuZC5hbWVyaWNhbmR5bmFtaWNzLmFjY1xcdFxcdGFjY1xcbmFwcGxpY2F0aW9uL3ZuZC5hbWlnYS5hbWlcXHRcXHRcXHRhbWlcXG5hcHBsaWNhdGlvbi92bmQuYW5kcm9pZC5wYWNrYWdlLWFyY2hpdmVcXHRcXHRhcGtcXG5hcHBsaWNhdGlvbi92bmQuYW5zZXItd2ViLWNlcnRpZmljYXRlLWlzc3VlLWluaXRpYXRpb25cXHRjaWlcXG5hcHBsaWNhdGlvbi92bmQuYW5zZXItd2ViLWZ1bmRzLXRyYW5zZmVyLWluaXRpYXRpb25cXHRmdGlcXG5hcHBsaWNhdGlvbi92bmQuYW50aXguZ2FtZS1jb21wb25lbnRcXHRcXHRhdHhcXG5hcHBsaWNhdGlvbi92bmQuYXBwbGUuaW5zdGFsbGVyK3htbFxcdFxcdG1wa2dcXG5hcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybFxcdFxcdFxcdG0zdThcXG5hcHBsaWNhdGlvbi92bmQuYXJpc3RhbmV0d29ya3Muc3dpXFx0XFx0c3dpXFxuYXBwbGljYXRpb24vdm5kLmFzdHJhZWEtc29mdHdhcmUuaW90YVxcdFxcdGlvdGFcXG5hcHBsaWNhdGlvbi92bmQuYXVkaW9ncmFwaFxcdFxcdFxcdGFlcFxcbmFwcGxpY2F0aW9uL3ZuZC5ibHVlaWNlLm11bHRpcGFzc1xcdFxcdG1wbVxcbmFwcGxpY2F0aW9uL3ZuZC5ibWlcXHRcXHRcXHRcXHRibWlcXG5hcHBsaWNhdGlvbi92bmQuYnVzaW5lc3NvYmplY3RzXFx0XFx0XFx0cmVwXFxuYXBwbGljYXRpb24vdm5kLmNoZW1kcmF3K3htbFxcdFxcdFxcdGNkeG1sXFxuYXBwbGljYXRpb24vdm5kLmNoaXBudXRzLmthcmFva2UtbW1kXFx0XFx0bW1kXFxuYXBwbGljYXRpb24vdm5kLmNpbmRlcmVsbGFcXHRcXHRcXHRjZHlcXG5hcHBsaWNhdGlvbi92bmQuY2xheW1vcmVcXHRcXHRcXHRjbGFcXG5hcHBsaWNhdGlvbi92bmQuY2xvYW50by5ycDlcXHRcXHRcXHRycDlcXG5hcHBsaWNhdGlvbi92bmQuY2xvbmsuYzRncm91cFxcdFxcdFxcdGM0ZyBjNGQgYzRmIGM0cCBjNHVcXG5hcHBsaWNhdGlvbi92bmQuY2x1ZXRydXN0LmNhcnRvbW9iaWxlLWNvbmZpZ1xcdFxcdGMxMWFtY1xcbmFwcGxpY2F0aW9uL3ZuZC5jbHVldHJ1c3QuY2FydG9tb2JpbGUtY29uZmlnLXBrZ1xcdGMxMWFtelxcbmFwcGxpY2F0aW9uL3ZuZC5jb21tb25zcGFjZVxcdFxcdFxcdGNzcFxcbmFwcGxpY2F0aW9uL3ZuZC5jb250YWN0LmNtc2dcXHRcXHRcXHRjZGJjbXNnXFxuYXBwbGljYXRpb24vdm5kLmNvc21vY2FsbGVyXFx0XFx0XFx0Y21jXFxuYXBwbGljYXRpb24vdm5kLmNyaWNrLmNsaWNrZXJcXHRcXHRcXHRjbGt4XFxuYXBwbGljYXRpb24vdm5kLmNyaWNrLmNsaWNrZXIua2V5Ym9hcmRcXHRcXHRjbGtrXFxuYXBwbGljYXRpb24vdm5kLmNyaWNrLmNsaWNrZXIucGFsZXR0ZVxcdFxcdGNsa3BcXG5hcHBsaWNhdGlvbi92bmQuY3JpY2suY2xpY2tlci50ZW1wbGF0ZVxcdFxcdGNsa3RcXG5hcHBsaWNhdGlvbi92bmQuY3JpY2suY2xpY2tlci53b3JkYmFua1xcdFxcdGNsa3dcXG5hcHBsaWNhdGlvbi92bmQuY3JpdGljYWx0b29scy53YnMreG1sXFx0XFx0d2JzXFxuYXBwbGljYXRpb24vdm5kLmN0Yy1wb3NtbFxcdFxcdFxcdHBtbFxcbmFwcGxpY2F0aW9uL3ZuZC5jdXBzLXBwZFxcdFxcdFxcdHBwZFxcbmFwcGxpY2F0aW9uL3ZuZC5jdXJsLmNhclxcdFxcdFxcdGNhclxcbmFwcGxpY2F0aW9uL3ZuZC5jdXJsLnBjdXJsXFx0XFx0XFx0cGN1cmxcXG5hcHBsaWNhdGlvbi92bmQuZGFydFxcdFxcdFxcdFxcdGRhcnRcXG5hcHBsaWNhdGlvbi92bmQuZGF0YS12aXNpb24ucmR6XFx0XFx0XFx0cmR6XFxuYXBwbGljYXRpb24vdm5kLmRlY2UuZGF0YVxcdFxcdFxcdHV2ZiB1dnZmIHV2ZCB1dnZkXFxuYXBwbGljYXRpb24vdm5kLmRlY2UudHRtbCt4bWxcXHRcXHRcXHR1dnQgdXZ2dFxcbmFwcGxpY2F0aW9uL3ZuZC5kZWNlLnVuc3BlY2lmaWVkXFx0XFx0dXZ4IHV2dnhcXG5hcHBsaWNhdGlvbi92bmQuZGVjZS56aXBcXHRcXHRcXHR1dnogdXZ2elxcbmFwcGxpY2F0aW9uL3ZuZC5kZW5vdm8uZmNzZWxheW91dC1saW5rXFx0XFx0ZmVfbGF1bmNoXFxuYXBwbGljYXRpb24vdm5kLmRuYVxcdFxcdFxcdFxcdGRuYVxcbmFwcGxpY2F0aW9uL3ZuZC5kb2xieS5tbHBcXHRcXHRcXHRtbHBcXG5hcHBsaWNhdGlvbi92bmQuZHBncmFwaFxcdFxcdFxcdFxcdGRwZ1xcbmFwcGxpY2F0aW9uL3ZuZC5kcmVhbWZhY3RvcnlcXHRcXHRcXHRkZmFjXFxuYXBwbGljYXRpb24vdm5kLmRzLWtleXBvaW50XFx0XFx0XFx0a3B4eFxcbmFwcGxpY2F0aW9uL3ZuZC5kdmIuYWl0XFx0XFx0XFx0XFx0YWl0XFxuYXBwbGljYXRpb24vdm5kLmR2Yi5zZXJ2aWNlXFx0XFx0XFx0c3ZjXFxuYXBwbGljYXRpb24vdm5kLmR5bmFnZW9cXHRcXHRcXHRcXHRnZW9cXG5hcHBsaWNhdGlvbi92bmQuZWNvd2luLmNoYXJ0XFx0XFx0XFx0bWFnXFxuYXBwbGljYXRpb24vdm5kLmVubGl2ZW5cXHRcXHRcXHRcXHRubWxcXG5hcHBsaWNhdGlvbi92bmQuZXBzb24uZXNmXFx0XFx0XFx0ZXNmXFxuYXBwbGljYXRpb24vdm5kLmVwc29uLm1zZlxcdFxcdFxcdG1zZlxcbmFwcGxpY2F0aW9uL3ZuZC5lcHNvbi5xdWlja2FuaW1lXFx0XFx0cWFtXFxuYXBwbGljYXRpb24vdm5kLmVwc29uLnNhbHRcXHRcXHRcXHRzbHRcXG5hcHBsaWNhdGlvbi92bmQuZXBzb24uc3NmXFx0XFx0XFx0c3NmXFxuYXBwbGljYXRpb24vdm5kLmVzemlnbm8zK3htbFxcdFxcdFxcdGVzMyBldDNcXG5hcHBsaWNhdGlvbi92bmQuZXpwaXgtYWxidW1cXHRcXHRcXHRlejJcXG5hcHBsaWNhdGlvbi92bmQuZXpwaXgtcGFja2FnZVxcdFxcdFxcdGV6M1xcbmFwcGxpY2F0aW9uL3ZuZC5mZGZcXHRcXHRcXHRcXHRmZGZcXG5hcHBsaWNhdGlvbi92bmQuZmRzbi5tc2VlZFxcdFxcdFxcdG1zZWVkXFxuYXBwbGljYXRpb24vdm5kLmZkc24uc2VlZFxcdFxcdFxcdHNlZWQgZGF0YWxlc3NcXG5hcHBsaWNhdGlvbi92bmQuZmxvZ3JhcGhpdFxcdFxcdFxcdGdwaFxcbmFwcGxpY2F0aW9uL3ZuZC5mbHV4dGltZS5jbGlwXFx0XFx0XFx0ZnRjXFxuYXBwbGljYXRpb24vdm5kLmZyYW1lbWFrZXJcXHRcXHRcXHRmbSBmcmFtZSBtYWtlciBib29rXFxuYXBwbGljYXRpb24vdm5kLmZyb2dhbnMuZm5jXFx0XFx0XFx0Zm5jXFxuYXBwbGljYXRpb24vdm5kLmZyb2dhbnMubHRmXFx0XFx0XFx0bHRmXFxuYXBwbGljYXRpb24vdm5kLmZzYy53ZWJsYXVuY2hcXHRcXHRcXHRmc2NcXG5hcHBsaWNhdGlvbi92bmQuZnVqaXRzdS5vYXN5c1xcdFxcdFxcdG9hc1xcbmFwcGxpY2F0aW9uL3ZuZC5mdWppdHN1Lm9hc3lzMlxcdFxcdFxcdG9hMlxcbmFwcGxpY2F0aW9uL3ZuZC5mdWppdHN1Lm9hc3lzM1xcdFxcdFxcdG9hM1xcbmFwcGxpY2F0aW9uL3ZuZC5mdWppdHN1Lm9hc3lzZ3BcXHRcXHRcXHRmZzVcXG5hcHBsaWNhdGlvbi92bmQuZnVqaXRzdS5vYXN5c3Byc1xcdFxcdGJoMlxcbmFwcGxpY2F0aW9uL3ZuZC5mdWppeGVyb3guZGRkXFx0XFx0XFx0ZGRkXFxuYXBwbGljYXRpb24vdm5kLmZ1aml4ZXJveC5kb2N1d29ya3NcXHRcXHR4ZHdcXG5hcHBsaWNhdGlvbi92bmQuZnVqaXhlcm94LmRvY3V3b3Jrcy5iaW5kZXJcXHR4YmRcXG5hcHBsaWNhdGlvbi92bmQuZnV6enlzaGVldFxcdFxcdFxcdGZ6c1xcbmFwcGxpY2F0aW9uL3ZuZC5nZW5vbWF0aXgudHV4ZWRvXFx0XFx0dHhkXFxuYXBwbGljYXRpb24vdm5kLmdlb2dlYnJhLmZpbGVcXHRcXHRcXHRnZ2JcXG5hcHBsaWNhdGlvbi92bmQuZ2VvZ2VicmEudG9vbFxcdFxcdFxcdGdndFxcbmFwcGxpY2F0aW9uL3ZuZC5nZW9tZXRyeS1leHBsb3JlclxcdFxcdGdleCBncmVcXG5hcHBsaWNhdGlvbi92bmQuZ2VvbmV4dFxcdFxcdFxcdFxcdGd4dFxcbmFwcGxpY2F0aW9uL3ZuZC5nZW9wbGFuXFx0XFx0XFx0XFx0ZzJ3XFxuYXBwbGljYXRpb24vdm5kLmdlb3NwYWNlXFx0XFx0XFx0ZzN3XFxuYXBwbGljYXRpb24vdm5kLmdteFxcdFxcdFxcdFxcdGdteFxcbmFwcGxpY2F0aW9uL3ZuZC5nb29nbGUtZWFydGgua21sK3htbFxcdFxcdGttbFxcbmFwcGxpY2F0aW9uL3ZuZC5nb29nbGUtZWFydGgua216XFx0XFx0a216XFxuYXBwbGljYXRpb24vdm5kLmdyYWZlcVxcdFxcdFxcdFxcdGdxZiBncXNcXG5hcHBsaWNhdGlvbi92bmQuZ3Jvb3ZlLWFjY291bnRcXHRcXHRcXHRnYWNcXG5hcHBsaWNhdGlvbi92bmQuZ3Jvb3ZlLWhlbHBcXHRcXHRcXHRnaGZcXG5hcHBsaWNhdGlvbi92bmQuZ3Jvb3ZlLWlkZW50aXR5LW1lc3NhZ2VcXHRcXHRnaW1cXG5hcHBsaWNhdGlvbi92bmQuZ3Jvb3ZlLWluamVjdG9yXFx0XFx0XFx0Z3J2XFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS10b29sLW1lc3NhZ2VcXHRcXHRndG1cXG5hcHBsaWNhdGlvbi92bmQuZ3Jvb3ZlLXRvb2wtdGVtcGxhdGVcXHRcXHR0cGxcXG5hcHBsaWNhdGlvbi92bmQuZ3Jvb3ZlLXZjYXJkXFx0XFx0XFx0dmNnXFxuYXBwbGljYXRpb24vdm5kLmhhbCt4bWxcXHRcXHRcXHRcXHRoYWxcXG5hcHBsaWNhdGlvbi92bmQuaGFuZGhlbGQtZW50ZXJ0YWlubWVudCt4bWxcXHR6bW1cXG5hcHBsaWNhdGlvbi92bmQuaGJjaVxcdFxcdFxcdFxcdGhiY2lcXG5hcHBsaWNhdGlvbi92bmQuaGhlLmxlc3Nvbi1wbGF5ZXJcXHRcXHRsZXNcXG5hcHBsaWNhdGlvbi92bmQuaHAtaHBnbFxcdFxcdFxcdFxcdGhwZ2xcXG5hcHBsaWNhdGlvbi92bmQuaHAtaHBpZFxcdFxcdFxcdFxcdGhwaWRcXG5hcHBsaWNhdGlvbi92bmQuaHAtaHBzXFx0XFx0XFx0XFx0aHBzXFxuYXBwbGljYXRpb24vdm5kLmhwLWpseXRcXHRcXHRcXHRcXHRqbHRcXG5hcHBsaWNhdGlvbi92bmQuaHAtcGNsXFx0XFx0XFx0XFx0cGNsXFxuYXBwbGljYXRpb24vdm5kLmhwLXBjbHhsXFx0XFx0XFx0cGNseGxcXG5hcHBsaWNhdGlvbi92bmQuaHlkcm9zdGF0aXguc29mLWRhdGFcXHRcXHRzZmQtaGRzdHhcXG5hcHBsaWNhdGlvbi92bmQuaWJtLm1pbmlwYXlcXHRcXHRcXHRtcHlcXG5hcHBsaWNhdGlvbi92bmQuaWJtLm1vZGNhcFxcdFxcdFxcdGFmcCBsaXN0YWZwIGxpc3QzODIwXFxuYXBwbGljYXRpb24vdm5kLmlibS5yaWdodHMtbWFuYWdlbWVudFxcdFxcdGlybVxcbmFwcGxpY2F0aW9uL3ZuZC5pYm0uc2VjdXJlLWNvbnRhaW5lclxcdFxcdHNjXFxuYXBwbGljYXRpb24vdm5kLmljY3Byb2ZpbGVcXHRcXHRcXHRpY2MgaWNtXFxuYXBwbGljYXRpb24vdm5kLmlnbG9hZGVyXFx0XFx0XFx0aWdsXFxuYXBwbGljYXRpb24vdm5kLmltbWVydmlzaW9uLWl2cFxcdFxcdFxcdGl2cFxcbmFwcGxpY2F0aW9uL3ZuZC5pbW1lcnZpc2lvbi1pdnVcXHRcXHRcXHRpdnVcXG5hcHBsaWNhdGlvbi92bmQuaW5zb3JzLmlnbVxcdFxcdFxcdGlnbVxcbmFwcGxpY2F0aW9uL3ZuZC5pbnRlcmNvbi5mb3JtbmV0XFx0XFx0eHB3IHhweFxcbmFwcGxpY2F0aW9uL3ZuZC5pbnRlcmdlb1xcdFxcdFxcdGkyZ1xcbmFwcGxpY2F0aW9uL3ZuZC5pbnR1LnFib1xcdFxcdFxcdHFib1xcbmFwcGxpY2F0aW9uL3ZuZC5pbnR1LnFmeFxcdFxcdFxcdHFmeFxcbmFwcGxpY2F0aW9uL3ZuZC5pcHVucGx1Z2dlZC5yY3Byb2ZpbGVcXHRcXHRyY3Byb2ZpbGVcXG5hcHBsaWNhdGlvbi92bmQuaXJlcG9zaXRvcnkucGFja2FnZSt4bWxcXHRcXHRpcnBcXG5hcHBsaWNhdGlvbi92bmQuaXMteHByXFx0XFx0XFx0XFx0eHByXFxuYXBwbGljYXRpb24vdm5kLmlzYWMuZmNzXFx0XFx0XFx0ZmNzXFxuYXBwbGljYXRpb24vdm5kLmphbVxcdFxcdFxcdFxcdGphbVxcbmFwcGxpY2F0aW9uL3ZuZC5qY3AuamF2YW1lLm1pZGxldC1ybXNcXHRcXHRybXNcXG5hcHBsaWNhdGlvbi92bmQuamlzcFxcdFxcdFxcdFxcdGppc3BcXG5hcHBsaWNhdGlvbi92bmQuam9vc3Quam9kYS1hcmNoaXZlXFx0XFx0am9kYVxcbmFwcGxpY2F0aW9uL3ZuZC5rYWhvb3R6XFx0XFx0XFx0XFx0a3R6IGt0clxcbmFwcGxpY2F0aW9uL3ZuZC5rZGUua2FyYm9uXFx0XFx0XFx0a2FyYm9uXFxuYXBwbGljYXRpb24vdm5kLmtkZS5rY2hhcnRcXHRcXHRcXHRjaHJ0XFxuYXBwbGljYXRpb24vdm5kLmtkZS5rZm9ybXVsYVxcdFxcdFxcdGtmb1xcbmFwcGxpY2F0aW9uL3ZuZC5rZGUua2l2aW9cXHRcXHRcXHRmbHdcXG5hcHBsaWNhdGlvbi92bmQua2RlLmtvbnRvdXJcXHRcXHRcXHRrb25cXG5hcHBsaWNhdGlvbi92bmQua2RlLmtwcmVzZW50ZXJcXHRcXHRcXHRrcHIga3B0XFxuYXBwbGljYXRpb24vdm5kLmtkZS5rc3ByZWFkXFx0XFx0XFx0a3NwXFxuYXBwbGljYXRpb24vdm5kLmtkZS5rd29yZFxcdFxcdFxcdGt3ZCBrd3RcXG5hcHBsaWNhdGlvbi92bmQua2VuYW1lYWFwcFxcdFxcdFxcdGh0a2VcXG5hcHBsaWNhdGlvbi92bmQua2lkc3BpcmF0aW9uXFx0XFx0XFx0a2lhXFxuYXBwbGljYXRpb24vdm5kLmtpbmFyXFx0XFx0XFx0XFx0a25lIGtucFxcbmFwcGxpY2F0aW9uL3ZuZC5rb2FuXFx0XFx0XFx0XFx0c2twIHNrZCBza3Qgc2ttXFxuYXBwbGljYXRpb24vdm5kLmtvZGFrLWRlc2NyaXB0b3JcXHRcXHRzc2VcXG5hcHBsaWNhdGlvbi92bmQubGFzLmxhcyt4bWxcXHRcXHRcXHRsYXN4bWxcXG5hcHBsaWNhdGlvbi92bmQubGxhbWFncmFwaGljcy5saWZlLWJhbGFuY2UuZGVza3RvcFxcdGxiZFxcbmFwcGxpY2F0aW9uL3ZuZC5sbGFtYWdyYXBoaWNzLmxpZmUtYmFsYW5jZS5leGNoYW5nZSt4bWxcXHRsYmVcXG5hcHBsaWNhdGlvbi92bmQubG90dXMtMS0yLTNcXHRcXHRcXHQxMjNcXG5hcHBsaWNhdGlvbi92bmQubG90dXMtYXBwcm9hY2hcXHRcXHRcXHRhcHJcXG5hcHBsaWNhdGlvbi92bmQubG90dXMtZnJlZWxhbmNlXFx0XFx0XFx0cHJlXFxuYXBwbGljYXRpb24vdm5kLmxvdHVzLW5vdGVzXFx0XFx0XFx0bnNmXFxuYXBwbGljYXRpb24vdm5kLmxvdHVzLW9yZ2FuaXplclxcdFxcdFxcdG9yZ1xcbmFwcGxpY2F0aW9uL3ZuZC5sb3R1cy1zY3JlZW5jYW1cXHRcXHRcXHRzY21cXG5hcHBsaWNhdGlvbi92bmQubG90dXMtd29yZHByb1xcdFxcdFxcdGx3cFxcbmFwcGxpY2F0aW9uL3ZuZC5tYWNwb3J0cy5wb3J0cGtnXFx0XFx0cG9ydHBrZ1xcbmFwcGxpY2F0aW9uL3ZuZC5tY2RcXHRcXHRcXHRcXHRtY2RcXG5hcHBsaWNhdGlvbi92bmQubWVkY2FsY2RhdGFcXHRcXHRcXHRtYzFcXG5hcHBsaWNhdGlvbi92bmQubWVkaWFzdGF0aW9uLmNka2V5XFx0XFx0Y2RrZXlcXG5hcHBsaWNhdGlvbi92bmQubWZlclxcdFxcdFxcdFxcdG13ZlxcbmFwcGxpY2F0aW9uL3ZuZC5tZm1wXFx0XFx0XFx0XFx0bWZtXFxuYXBwbGljYXRpb24vdm5kLm1pY3JvZ3JhZnguZmxvXFx0XFx0XFx0ZmxvXFxuYXBwbGljYXRpb24vdm5kLm1pY3JvZ3JhZnguaWd4XFx0XFx0XFx0aWd4XFxuYXBwbGljYXRpb24vdm5kLm1pZlxcdFxcdFxcdFxcdG1pZlxcbmFwcGxpY2F0aW9uL3ZuZC5tb2JpdXMuZGFmXFx0XFx0XFx0ZGFmXFxuYXBwbGljYXRpb24vdm5kLm1vYml1cy5kaXNcXHRcXHRcXHRkaXNcXG5hcHBsaWNhdGlvbi92bmQubW9iaXVzLm1ia1xcdFxcdFxcdG1ia1xcbmFwcGxpY2F0aW9uL3ZuZC5tb2JpdXMubXF5XFx0XFx0XFx0bXF5XFxuYXBwbGljYXRpb24vdm5kLm1vYml1cy5tc2xcXHRcXHRcXHRtc2xcXG5hcHBsaWNhdGlvbi92bmQubW9iaXVzLnBsY1xcdFxcdFxcdHBsY1xcbmFwcGxpY2F0aW9uL3ZuZC5tb2JpdXMudHhmXFx0XFx0XFx0dHhmXFxuYXBwbGljYXRpb24vdm5kLm1vcGh1bi5hcHBsaWNhdGlvblxcdFxcdG1wblxcbmFwcGxpY2F0aW9uL3ZuZC5tb3BodW4uY2VydGlmaWNhdGVcXHRcXHRtcGNcXG5hcHBsaWNhdGlvbi92bmQubW96aWxsYS54dWwreG1sXFx0XFx0XFx0eHVsXFxuYXBwbGljYXRpb24vdm5kLm1zLWFydGdhbHJ5XFx0XFx0XFx0Y2lsXFxuYXBwbGljYXRpb24vdm5kLm1zLWNhYi1jb21wcmVzc2VkXFx0XFx0Y2FiXFxuYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsXFx0XFx0XFx0eGxzIHhsbSB4bGEgeGxjIHhsdCB4bHdcXG5hcHBsaWNhdGlvbi92bmQubXMtZXhjZWwuYWRkaW4ubWFjcm9lbmFibGVkLjEyXFx0XFx0eGxhbVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbC5zaGVldC5iaW5hcnkubWFjcm9lbmFibGVkLjEyXFx0eGxzYlxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbC5zaGVldC5tYWNyb2VuYWJsZWQuMTJcXHRcXHR4bHNtXFxuYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsLnRlbXBsYXRlLm1hY3JvZW5hYmxlZC4xMlxcdHhsdG1cXG5hcHBsaWNhdGlvbi92bmQubXMtZm9udG9iamVjdFxcdFxcdFxcdGVvdFxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1odG1saGVscFxcdFxcdFxcdGNobVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1pbXNcXHRcXHRcXHRcXHRpbXNcXG5hcHBsaWNhdGlvbi92bmQubXMtbHJtXFx0XFx0XFx0XFx0bHJtXFxuYXBwbGljYXRpb24vdm5kLm1zLW9mZmljZXRoZW1lXFx0XFx0XFx0dGhteFxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1wa2kuc2VjY2F0XFx0XFx0XFx0Y2F0XFxuYXBwbGljYXRpb24vdm5kLm1zLXBraS5zdGxcXHRcXHRcXHRzdGxcXG5hcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludFxcdFxcdFxcdHBwdCBwcHMgcG90XFxuYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQuYWRkaW4ubWFjcm9lbmFibGVkLjEyXFx0XFx0cHBhbVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50LnByZXNlbnRhdGlvbi5tYWNyb2VuYWJsZWQuMTJcXHRwcHRtXFxuYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQuc2xpZGUubWFjcm9lbmFibGVkLjEyXFx0XFx0c2xkbVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50LnNsaWRlc2hvdy5tYWNyb2VuYWJsZWQuMTJcXHRcXHRwcHNtXFxuYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQudGVtcGxhdGUubWFjcm9lbmFibGVkLjEyXFx0XFx0cG90bVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1wcm9qZWN0XFx0XFx0XFx0bXBwIG1wdFxcbmFwcGxpY2F0aW9uL3ZuZC5tcy13b3JkLmRvY3VtZW50Lm1hY3JvZW5hYmxlZC4xMlxcdGRvY21cXG5hcHBsaWNhdGlvbi92bmQubXMtd29yZC50ZW1wbGF0ZS5tYWNyb2VuYWJsZWQuMTJcXHRkb3RtXFxuYXBwbGljYXRpb24vdm5kLm1zLXdvcmtzXFx0XFx0XFx0d3BzIHdrcyB3Y20gd2RiXFxuYXBwbGljYXRpb24vdm5kLm1zLXdwbFxcdFxcdFxcdFxcdHdwbFxcbmFwcGxpY2F0aW9uL3ZuZC5tcy14cHNkb2N1bWVudFxcdFxcdFxcdHhwc1xcbmFwcGxpY2F0aW9uL3ZuZC5tc2VxXFx0XFx0XFx0XFx0bXNlcVxcbmFwcGxpY2F0aW9uL3ZuZC5tdXNpY2lhblxcdFxcdFxcdG11c1xcbmFwcGxpY2F0aW9uL3ZuZC5tdXZlZS5zdHlsZVxcdFxcdFxcdG1zdHlcXG5hcHBsaWNhdGlvbi92bmQubXluZmNcXHRcXHRcXHRcXHR0YWdsZXRcXG5hcHBsaWNhdGlvbi92bmQubmV1cm9sYW5ndWFnZS5ubHVcXHRcXHRubHVcXG5hcHBsaWNhdGlvbi92bmQubml0ZlxcdFxcdFxcdFxcdG50ZiBuaXRmXFxuYXBwbGljYXRpb24vdm5kLm5vYmxlbmV0LWRpcmVjdG9yeVxcdFxcdG5uZFxcbmFwcGxpY2F0aW9uL3ZuZC5ub2JsZW5ldC1zZWFsZXJcXHRcXHRcXHRubnNcXG5hcHBsaWNhdGlvbi92bmQubm9ibGVuZXQtd2ViXFx0XFx0XFx0bm53XFxuYXBwbGljYXRpb24vdm5kLm5va2lhLm4tZ2FnZS5kYXRhXFx0XFx0bmdkYXRcXG5hcHBsaWNhdGlvbi92bmQubm9raWEubi1nYWdlLnN5bWJpYW4uaW5zdGFsbFxcdG4tZ2FnZVxcbmFwcGxpY2F0aW9uL3ZuZC5ub2tpYS5yYWRpby1wcmVzZXRcXHRcXHRycHN0XFxuYXBwbGljYXRpb24vdm5kLm5va2lhLnJhZGlvLXByZXNldHNcXHRcXHRycHNzXFxuYXBwbGljYXRpb24vdm5kLm5vdmFkaWdtLmVkbVxcdFxcdFxcdGVkbVxcbmFwcGxpY2F0aW9uL3ZuZC5ub3ZhZGlnbS5lZHhcXHRcXHRcXHRlZHhcXG5hcHBsaWNhdGlvbi92bmQubm92YWRpZ20uZXh0XFx0XFx0XFx0ZXh0XFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5jaGFydFxcdFxcdG9kY1xcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuY2hhcnQtdGVtcGxhdGVcXHRvdGNcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LmRhdGFiYXNlXFx0XFx0b2RiXFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5mb3JtdWxhXFx0XFx0b2RmXFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5mb3JtdWxhLXRlbXBsYXRlXFx0b2RmdFxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuZ3JhcGhpY3NcXHRcXHRvZGdcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LmdyYXBoaWNzLXRlbXBsYXRlXFx0b3RnXFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5pbWFnZVxcdFxcdG9kaVxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuaW1hZ2UtdGVtcGxhdGVcXHRvdGlcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnByZXNlbnRhdGlvblxcdFxcdG9kcFxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQucHJlc2VudGF0aW9uLXRlbXBsYXRlXFx0b3RwXFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5zcHJlYWRzaGVldFxcdFxcdG9kc1xcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuc3ByZWFkc2hlZXQtdGVtcGxhdGVcXHRvdHNcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnRleHRcXHRcXHRcXHRvZHRcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnRleHQtbWFzdGVyXFx0XFx0b2RtXFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC50ZXh0LXRlbXBsYXRlXFx0b3R0XFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC50ZXh0LXdlYlxcdFxcdG90aFxcbmFwcGxpY2F0aW9uL3ZuZC5vbHBjLXN1Z2FyXFx0XFx0XFx0eG9cXG5hcHBsaWNhdGlvbi92bmQub21hLmRkMit4bWxcXHRcXHRcXHRkZDJcXG5hcHBsaWNhdGlvbi92bmQub3Blbm9mZmljZW9yZy5leHRlbnNpb25cXHRcXHRveHRcXG5hcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwucHJlc2VudGF0aW9uXFx0cHB0eFxcbmFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5wcmVzZW50YXRpb25tbC5zbGlkZVxcdHNsZHhcXG5hcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwuc2xpZGVzaG93XFx0cHBzeFxcbmFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5wcmVzZW50YXRpb25tbC50ZW1wbGF0ZVxcdHBvdHhcXG5hcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC5zaGVldFxcdHhsc3hcXG5hcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC50ZW1wbGF0ZVxcdHhsdHhcXG5hcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudFxcdGRvY3hcXG5hcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC50ZW1wbGF0ZVxcdGRvdHhcXG5hcHBsaWNhdGlvbi92bmQub3NnZW8ubWFwZ3VpZGUucGFja2FnZVxcdFxcdG1ncFxcbmFwcGxpY2F0aW9uL3ZuZC5vc2dpLmRwXFx0XFx0XFx0XFx0ZHBcXG5hcHBsaWNhdGlvbi92bmQub3NnaS5zdWJzeXN0ZW1cXHRcXHRcXHRlc2FcXG5hcHBsaWNhdGlvbi92bmQucGFsbVxcdFxcdFxcdFxcdHBkYiBwcWEgb3ByY1xcbmFwcGxpY2F0aW9uL3ZuZC5wYXdhYWZpbGVcXHRcXHRcXHRwYXdcXG5hcHBsaWNhdGlvbi92bmQucGcuZm9ybWF0XFx0XFx0XFx0c3RyXFxuYXBwbGljYXRpb24vdm5kLnBnLm9zYXNsaVxcdFxcdFxcdGVpNlxcbmFwcGxpY2F0aW9uL3ZuZC5waWNzZWxcXHRcXHRcXHRcXHRlZmlmXFxuYXBwbGljYXRpb24vdm5kLnBtaS53aWRnZXRcXHRcXHRcXHR3Z1xcbmFwcGxpY2F0aW9uL3ZuZC5wb2NrZXRsZWFyblxcdFxcdFxcdHBsZlxcbmFwcGxpY2F0aW9uL3ZuZC5wb3dlcmJ1aWxkZXI2XFx0XFx0XFx0cGJkXFxuYXBwbGljYXRpb24vdm5kLnByZXZpZXdzeXN0ZW1zLmJveFxcdFxcdGJveFxcbmFwcGxpY2F0aW9uL3ZuZC5wcm90ZXVzLm1hZ2F6aW5lXFx0XFx0bWd6XFxuYXBwbGljYXRpb24vdm5kLnB1Ymxpc2hhcmUtZGVsdGEtdHJlZVxcdFxcdHFwc1xcbmFwcGxpY2F0aW9uL3ZuZC5wdmkucHRpZDFcXHRcXHRcXHRwdGlkXFxuYXBwbGljYXRpb24vdm5kLnF1YXJrLnF1YXJreHByZXNzXFx0XFx0cXhkIHF4dCBxd2QgcXd0IHF4bCBxeGJcXG5hcHBsaWNhdGlvbi92bmQucmVhbHZuYy5iZWRcXHRcXHRcXHRiZWRcXG5hcHBsaWNhdGlvbi92bmQucmVjb3JkYXJlLm11c2ljeG1sXFx0XFx0bXhsXFxuYXBwbGljYXRpb24vdm5kLnJlY29yZGFyZS5tdXNpY3htbCt4bWxcXHRcXHRtdXNpY3htbFxcbmFwcGxpY2F0aW9uL3ZuZC5yaWcuY3J5cHRvbm90ZVxcdFxcdFxcdGNyeXB0b25vdGVcXG5hcHBsaWNhdGlvbi92bmQucmltLmNvZFxcdFxcdFxcdFxcdGNvZFxcbmFwcGxpY2F0aW9uL3ZuZC5ybi1yZWFsbWVkaWFcXHRcXHRcXHRybVxcbmFwcGxpY2F0aW9uL3ZuZC5ybi1yZWFsbWVkaWEtdmJyXFx0XFx0cm12YlxcbmFwcGxpY2F0aW9uL3ZuZC5yb3V0ZTY2Lmxpbms2Nit4bWxcXHRcXHRsaW5rNjZcXG5hcHBsaWNhdGlvbi92bmQuc2FpbGluZ3RyYWNrZXIudHJhY2tcXHRcXHRzdFxcbmFwcGxpY2F0aW9uL3ZuZC5zZWVtYWlsXFx0XFx0XFx0XFx0c2VlXFxuYXBwbGljYXRpb24vdm5kLnNlbWFcXHRcXHRcXHRcXHRzZW1hXFxuYXBwbGljYXRpb24vdm5kLnNlbWRcXHRcXHRcXHRcXHRzZW1kXFxuYXBwbGljYXRpb24vdm5kLnNlbWZcXHRcXHRcXHRcXHRzZW1mXFxuYXBwbGljYXRpb24vdm5kLnNoYW5hLmluZm9ybWVkLmZvcm1kYXRhXFx0XFx0aWZtXFxuYXBwbGljYXRpb24vdm5kLnNoYW5hLmluZm9ybWVkLmZvcm10ZW1wbGF0ZVxcdGl0cFxcbmFwcGxpY2F0aW9uL3ZuZC5zaGFuYS5pbmZvcm1lZC5pbnRlcmNoYW5nZVxcdGlpZlxcbmFwcGxpY2F0aW9uL3ZuZC5zaGFuYS5pbmZvcm1lZC5wYWNrYWdlXFx0XFx0aXBrXFxuYXBwbGljYXRpb24vdm5kLnNpbXRlY2gtbWluZG1hcHBlclxcdFxcdHR3ZCB0d2RzXFxuYXBwbGljYXRpb24vdm5kLnNtYWZcXHRcXHRcXHRcXHRtbWZcXG5hcHBsaWNhdGlvbi92bmQuc21hcnQudGVhY2hlclxcdFxcdFxcdHRlYWNoZXJcXG5hcHBsaWNhdGlvbi92bmQuc29sZW50LnNka20reG1sXFx0XFx0XFx0c2RrbSBzZGtkXFxuYXBwbGljYXRpb24vdm5kLnNwb3RmaXJlLmR4cFxcdFxcdFxcdGR4cFxcbmFwcGxpY2F0aW9uL3ZuZC5zcG90ZmlyZS5zZnNcXHRcXHRcXHRzZnNcXG5hcHBsaWNhdGlvbi92bmQuc3RhcmRpdmlzaW9uLmNhbGNcXHRcXHRzZGNcXG5hcHBsaWNhdGlvbi92bmQuc3RhcmRpdmlzaW9uLmRyYXdcXHRcXHRzZGFcXG5hcHBsaWNhdGlvbi92bmQuc3RhcmRpdmlzaW9uLmltcHJlc3NcXHRcXHRzZGRcXG5hcHBsaWNhdGlvbi92bmQuc3RhcmRpdmlzaW9uLm1hdGhcXHRcXHRzbWZcXG5hcHBsaWNhdGlvbi92bmQuc3RhcmRpdmlzaW9uLndyaXRlclxcdFxcdHNkdyB2b3JcXG5hcHBsaWNhdGlvbi92bmQuc3RhcmRpdmlzaW9uLndyaXRlci1nbG9iYWxcXHRzZ2xcXG5hcHBsaWNhdGlvbi92bmQuc3RlcG1hbmlhLnBhY2thZ2VcXHRcXHRzbXppcFxcbmFwcGxpY2F0aW9uL3ZuZC5zdGVwbWFuaWEuc3RlcGNoYXJ0XFx0XFx0c21cXG5hcHBsaWNhdGlvbi92bmQuc3VuLnhtbC5jYWxjXFx0XFx0XFx0c3hjXFxuYXBwbGljYXRpb24vdm5kLnN1bi54bWwuY2FsYy50ZW1wbGF0ZVxcdFxcdHN0Y1xcbmFwcGxpY2F0aW9uL3ZuZC5zdW4ueG1sLmRyYXdcXHRcXHRcXHRzeGRcXG5hcHBsaWNhdGlvbi92bmQuc3VuLnhtbC5kcmF3LnRlbXBsYXRlXFx0XFx0c3RkXFxuYXBwbGljYXRpb24vdm5kLnN1bi54bWwuaW1wcmVzc1xcdFxcdFxcdHN4aVxcbmFwcGxpY2F0aW9uL3ZuZC5zdW4ueG1sLmltcHJlc3MudGVtcGxhdGVcXHRzdGlcXG5hcHBsaWNhdGlvbi92bmQuc3VuLnhtbC5tYXRoXFx0XFx0XFx0c3htXFxuYXBwbGljYXRpb24vdm5kLnN1bi54bWwud3JpdGVyXFx0XFx0XFx0c3h3XFxuYXBwbGljYXRpb24vdm5kLnN1bi54bWwud3JpdGVyLmdsb2JhbFxcdFxcdHN4Z1xcbmFwcGxpY2F0aW9uL3ZuZC5zdW4ueG1sLndyaXRlci50ZW1wbGF0ZVxcdFxcdHN0d1xcbmFwcGxpY2F0aW9uL3ZuZC5zdXMtY2FsZW5kYXJcXHRcXHRcXHRzdXMgc3VzcFxcbmFwcGxpY2F0aW9uL3ZuZC5zdmRcXHRcXHRcXHRcXHRzdmRcXG5hcHBsaWNhdGlvbi92bmQuc3ltYmlhbi5pbnN0YWxsXFx0XFx0XFx0c2lzIHNpc3hcXG5hcHBsaWNhdGlvbi92bmQuc3luY21sK3htbFxcdFxcdFxcdHhzbVxcbmFwcGxpY2F0aW9uL3ZuZC5zeW5jbWwuZG0rd2J4bWxcXHRcXHRcXHRiZG1cXG5hcHBsaWNhdGlvbi92bmQuc3luY21sLmRtK3htbFxcdFxcdFxcdHhkbVxcbmFwcGxpY2F0aW9uL3ZuZC50YW8uaW50ZW50LW1vZHVsZS1hcmNoaXZlXFx0dGFvXFxuYXBwbGljYXRpb24vdm5kLnRjcGR1bXAucGNhcFxcdFxcdFxcdHBjYXAgY2FwIGRtcFxcbmFwcGxpY2F0aW9uL3ZuZC50bW9iaWxlLWxpdmV0dlxcdFxcdFxcdHRtb1xcbmFwcGxpY2F0aW9uL3ZuZC50cmlkLnRwdFxcdFxcdFxcdHRwdFxcbmFwcGxpY2F0aW9uL3ZuZC50cmlzY2FwZS5teHNcXHRcXHRcXHRteHNcXG5hcHBsaWNhdGlvbi92bmQudHJ1ZWFwcFxcdFxcdFxcdFxcdHRyYVxcbmFwcGxpY2F0aW9uL3ZuZC51ZmRsXFx0XFx0XFx0XFx0dWZkIHVmZGxcXG5hcHBsaWNhdGlvbi92bmQudWlxLnRoZW1lXFx0XFx0XFx0dXR6XFxuYXBwbGljYXRpb24vdm5kLnVtYWppblxcdFxcdFxcdFxcdHVtalxcbmFwcGxpY2F0aW9uL3ZuZC51bml0eVxcdFxcdFxcdFxcdHVuaXR5d2ViXFxuYXBwbGljYXRpb24vdm5kLnVvbWwreG1sXFx0XFx0XFx0dW9tbFxcbmFwcGxpY2F0aW9uL3ZuZC52Y3hcXHRcXHRcXHRcXHR2Y3hcXG5hcHBsaWNhdGlvbi92bmQudmlzaW9cXHRcXHRcXHRcXHR2c2QgdnN0IHZzcyB2c3dcXG5hcHBsaWNhdGlvbi92bmQudmlzaW9uYXJ5XFx0XFx0XFx0dmlzXFxuYXBwbGljYXRpb24vdm5kLnZzZlxcdFxcdFxcdFxcdHZzZlxcbmFwcGxpY2F0aW9uL3ZuZC53YXAud2J4bWxcXHRcXHRcXHR3YnhtbFxcbmFwcGxpY2F0aW9uL3ZuZC53YXAud21sY1xcdFxcdFxcdHdtbGNcXG5hcHBsaWNhdGlvbi92bmQud2FwLndtbHNjcmlwdGNcXHRcXHRcXHR3bWxzY1xcbmFwcGxpY2F0aW9uL3ZuZC53ZWJ0dXJib1xcdFxcdFxcdHd0YlxcbmFwcGxpY2F0aW9uL3ZuZC53b2xmcmFtLnBsYXllclxcdFxcdFxcdG5icFxcbmFwcGxpY2F0aW9uL3ZuZC53b3JkcGVyZmVjdFxcdFxcdFxcdHdwZFxcbmFwcGxpY2F0aW9uL3ZuZC53cWRcXHRcXHRcXHRcXHR3cWRcXG5hcHBsaWNhdGlvbi92bmQud3Quc3RmXFx0XFx0XFx0XFx0c3RmXFxuYXBwbGljYXRpb24vdm5kLnhhcmFcXHRcXHRcXHRcXHR4YXJcXG5hcHBsaWNhdGlvbi92bmQueGZkbFxcdFxcdFxcdFxcdHhmZGxcXG5hcHBsaWNhdGlvbi92bmQueWFtYWhhLmh2LWRpY1xcdFxcdFxcdGh2ZFxcbmFwcGxpY2F0aW9uL3ZuZC55YW1haGEuaHYtc2NyaXB0XFx0XFx0aHZzXFxuYXBwbGljYXRpb24vdm5kLnlhbWFoYS5odi12b2ljZVxcdFxcdFxcdGh2cFxcbmFwcGxpY2F0aW9uL3ZuZC55YW1haGEub3BlbnNjb3JlZm9ybWF0XFx0XFx0XFx0b3NmXFxuYXBwbGljYXRpb24vdm5kLnlhbWFoYS5vcGVuc2NvcmVmb3JtYXQub3NmcHZnK3htbFxcdG9zZnB2Z1xcbmFwcGxpY2F0aW9uL3ZuZC55YW1haGEuc21hZi1hdWRpb1xcdFxcdHNhZlxcbmFwcGxpY2F0aW9uL3ZuZC55YW1haGEuc21hZi1waHJhc2VcXHRcXHRzcGZcXG5hcHBsaWNhdGlvbi92bmQueWVsbG93cml2ZXItY3VzdG9tLW1lbnVcXHRcXHRjbXBcXG5hcHBsaWNhdGlvbi92bmQuenVsXFx0XFx0XFx0XFx0emlyIHppcnpcXG5hcHBsaWNhdGlvbi92bmQuenphenouZGVjayt4bWxcXHRcXHRcXHR6YXpcXG5hcHBsaWNhdGlvbi92b2ljZXhtbCt4bWxcXHRcXHRcXHR2eG1sXFxuYXBwbGljYXRpb24vd2FzbVxcdFxcdFxcdFxcdHdhc21cXG5hcHBsaWNhdGlvbi93aWRnZXRcXHRcXHRcXHRcXHR3Z3RcXG5hcHBsaWNhdGlvbi93aW5obHBcXHRcXHRcXHRcXHRobHBcXG5hcHBsaWNhdGlvbi93c2RsK3htbFxcdFxcdFxcdFxcdHdzZGxcXG5hcHBsaWNhdGlvbi93c3BvbGljeSt4bWxcXHRcXHRcXHR3c3BvbGljeVxcbmFwcGxpY2F0aW9uL3gtN3otY29tcHJlc3NlZFxcdFxcdFxcdDd6XFxuYXBwbGljYXRpb24veC1hYml3b3JkXFx0XFx0XFx0XFx0YWJ3XFxuYXBwbGljYXRpb24veC1hY2UtY29tcHJlc3NlZFxcdFxcdFxcdGFjZVxcbmFwcGxpY2F0aW9uL3gtYXBwbGUtZGlza2ltYWdlXFx0XFx0XFx0ZG1nXFxuYXBwbGljYXRpb24veC1hdXRob3J3YXJlLWJpblxcdFxcdFxcdGFhYiB4MzIgdTMyIHZveFxcbmFwcGxpY2F0aW9uL3gtYXV0aG9yd2FyZS1tYXBcXHRcXHRcXHRhYW1cXG5hcHBsaWNhdGlvbi94LWF1dGhvcndhcmUtc2VnXFx0XFx0XFx0YWFzXFxuYXBwbGljYXRpb24veC1iY3Bpb1xcdFxcdFxcdFxcdGJjcGlvXFxuYXBwbGljYXRpb24veC1iaXR0b3JyZW50XFx0XFx0XFx0dG9ycmVudFxcbmFwcGxpY2F0aW9uL3gtYmxvcmJcXHRcXHRcXHRcXHRibGIgYmxvcmJcXG5hcHBsaWNhdGlvbi94LWJ6aXBcXHRcXHRcXHRcXHRielxcbmFwcGxpY2F0aW9uL3gtYnppcDJcXHRcXHRcXHRcXHRiejIgYm96XFxuYXBwbGljYXRpb24veC1jYnJcXHRcXHRcXHRcXHRjYnIgY2JhIGNidCBjYnogY2I3XFxuYXBwbGljYXRpb24veC1jZGxpbmtcXHRcXHRcXHRcXHR2Y2RcXG5hcHBsaWNhdGlvbi94LWNmcy1jb21wcmVzc2VkXFx0XFx0XFx0Y2ZzXFxuYXBwbGljYXRpb24veC1jaGF0XFx0XFx0XFx0XFx0Y2hhdFxcbmFwcGxpY2F0aW9uL3gtY2hlc3MtcGduXFx0XFx0XFx0XFx0cGduXFxuYXBwbGljYXRpb24veC1jb25mZXJlbmNlXFx0XFx0XFx0bnNjXFxuYXBwbGljYXRpb24veC1jcGlvXFx0XFx0XFx0XFx0Y3Bpb1xcbmFwcGxpY2F0aW9uL3gtY3NoXFx0XFx0XFx0XFx0Y3NoXFxuYXBwbGljYXRpb24veC1kZWJpYW4tcGFja2FnZVxcdFxcdFxcdGRlYiB1ZGViXFxuYXBwbGljYXRpb24veC1kZ2MtY29tcHJlc3NlZFxcdFxcdFxcdGRnY1xcbmFwcGxpY2F0aW9uL3gtZGlyZWN0b3JcXHRcXHRcXHRkaXIgZGNyIGR4ciBjc3QgY2N0IGN4dCB3M2QgZmdkIHN3YVxcbmFwcGxpY2F0aW9uL3gtZG9vbVxcdFxcdFxcdFxcdHdhZFxcbmFwcGxpY2F0aW9uL3gtZHRibmN4K3htbFxcdFxcdFxcdG5jeFxcbmFwcGxpY2F0aW9uL3gtZHRib29rK3htbFxcdFxcdFxcdGR0YlxcbmFwcGxpY2F0aW9uL3gtZHRicmVzb3VyY2UreG1sXFx0XFx0XFx0cmVzXFxuYXBwbGljYXRpb24veC1kdmlcXHRcXHRcXHRcXHRkdmlcXG5hcHBsaWNhdGlvbi94LWVudm95XFx0XFx0XFx0XFx0ZXZ5XFxuYXBwbGljYXRpb24veC1ldmFcXHRcXHRcXHRcXHRldmFcXG5hcHBsaWNhdGlvbi94LWZvbnQtYmRmXFx0XFx0XFx0XFx0YmRmXFxuYXBwbGljYXRpb24veC1mb250LWdob3N0c2NyaXB0XFx0XFx0XFx0Z3NmXFxuYXBwbGljYXRpb24veC1mb250LWxpbnV4LXBzZlxcdFxcdFxcdHBzZlxcbmFwcGxpY2F0aW9uL3gtZm9udC1wY2ZcXHRcXHRcXHRcXHRwY2ZcXG5hcHBsaWNhdGlvbi94LWZvbnQtc25mXFx0XFx0XFx0XFx0c25mXFxuYXBwbGljYXRpb24veC1mb250LXR5cGUxXFx0XFx0XFx0cGZhIHBmYiBwZm0gYWZtXFxuYXBwbGljYXRpb24veC1mcmVlYXJjXFx0XFx0XFx0XFx0YXJjXFxuYXBwbGljYXRpb24veC1mdXR1cmVzcGxhc2hcXHRcXHRcXHRzcGxcXG5hcHBsaWNhdGlvbi94LWdjYS1jb21wcmVzc2VkXFx0XFx0XFx0Z2NhXFxuYXBwbGljYXRpb24veC1nbHVseFxcdFxcdFxcdFxcdHVseFxcbmFwcGxpY2F0aW9uL3gtZ251bWVyaWNcXHRcXHRcXHRcXHRnbnVtZXJpY1xcbmFwcGxpY2F0aW9uL3gtZ3JhbXBzLXhtbFxcdFxcdFxcdGdyYW1wc1xcbmFwcGxpY2F0aW9uL3gtZ3RhclxcdFxcdFxcdFxcdGd0YXJcXG5hcHBsaWNhdGlvbi94LWhkZlxcdFxcdFxcdFxcdGhkZlxcbmFwcGxpY2F0aW9uL3gtaW5zdGFsbC1pbnN0cnVjdGlvbnNcXHRcXHRpbnN0YWxsXFxuYXBwbGljYXRpb24veC1pc285NjYwLWltYWdlXFx0XFx0XFx0aXNvXFxuYXBwbGljYXRpb24veC1qYXZhLWpubHAtZmlsZVxcdFxcdFxcdGpubHBcXG5hcHBsaWNhdGlvbi94LWxhdGV4XFx0XFx0XFx0XFx0bGF0ZXhcXG5hcHBsaWNhdGlvbi94LWx6aC1jb21wcmVzc2VkXFx0XFx0XFx0bHpoIGxoYVxcbmFwcGxpY2F0aW9uL3gtbWllXFx0XFx0XFx0XFx0bWllXFxuYXBwbGljYXRpb24veC1tb2JpcG9ja2V0LWVib29rXFx0XFx0XFx0cHJjIG1vYmlcXG5hcHBsaWNhdGlvbi94LW1zLWFwcGxpY2F0aW9uXFx0XFx0XFx0YXBwbGljYXRpb25cXG5hcHBsaWNhdGlvbi94LW1zLXNob3J0Y3V0XFx0XFx0XFx0bG5rXFxuYXBwbGljYXRpb24veC1tcy13bWRcXHRcXHRcXHRcXHR3bWRcXG5hcHBsaWNhdGlvbi94LW1zLXdtelxcdFxcdFxcdFxcdHdtelxcbmFwcGxpY2F0aW9uL3gtbXMteGJhcFxcdFxcdFxcdFxcdHhiYXBcXG5hcHBsaWNhdGlvbi94LW1zYWNjZXNzXFx0XFx0XFx0XFx0bWRiXFxuYXBwbGljYXRpb24veC1tc2JpbmRlclxcdFxcdFxcdFxcdG9iZFxcbmFwcGxpY2F0aW9uL3gtbXNjYXJkZmlsZVxcdFxcdFxcdGNyZFxcbmFwcGxpY2F0aW9uL3gtbXNjbGlwXFx0XFx0XFx0XFx0Y2xwXFxuYXBwbGljYXRpb24veC1tc2Rvd25sb2FkXFx0XFx0XFx0ZXhlIGRsbCBjb20gYmF0IG1zaVxcbmFwcGxpY2F0aW9uL3gtbXNtZWRpYXZpZXdcXHRcXHRcXHRtdmIgbTEzIG0xNFxcbmFwcGxpY2F0aW9uL3gtbXNtZXRhZmlsZVxcdFxcdFxcdHdtZiB3bXogZW1mIGVtelxcbmFwcGxpY2F0aW9uL3gtbXNtb25leVxcdFxcdFxcdFxcdG1ueVxcbmFwcGxpY2F0aW9uL3gtbXNwdWJsaXNoZXJcXHRcXHRcXHRwdWJcXG5hcHBsaWNhdGlvbi94LW1zc2NoZWR1bGVcXHRcXHRcXHRzY2RcXG5hcHBsaWNhdGlvbi94LW1zdGVybWluYWxcXHRcXHRcXHR0cm1cXG5hcHBsaWNhdGlvbi94LW1zd3JpdGVcXHRcXHRcXHRcXHR3cmlcXG5hcHBsaWNhdGlvbi94LW5ldGNkZlxcdFxcdFxcdFxcdG5jIGNkZlxcbmFwcGxpY2F0aW9uL3gtbnpiXFx0XFx0XFx0XFx0bnpiXFxuYXBwbGljYXRpb24veC1wa2NzMTJcXHRcXHRcXHRcXHRwMTIgcGZ4XFxuYXBwbGljYXRpb24veC1wa2NzNy1jZXJ0aWZpY2F0ZXNcXHRcXHRwN2Igc3BjXFxuYXBwbGljYXRpb24veC1wa2NzNy1jZXJ0cmVxcmVzcFxcdFxcdFxcdHA3clxcbmFwcGxpY2F0aW9uL3gtcmFyLWNvbXByZXNzZWRcXHRcXHRcXHRyYXJcXG5hcHBsaWNhdGlvbi94LXJlc2VhcmNoLWluZm8tc3lzdGVtc1xcdFxcdHJpc1xcbmFwcGxpY2F0aW9uL3gtc2hcXHRcXHRcXHRcXHRzaFxcbmFwcGxpY2F0aW9uL3gtc2hhclxcdFxcdFxcdFxcdHNoYXJcXG5hcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFxcdFxcdFxcdHN3ZlxcbmFwcGxpY2F0aW9uL3gtc2lsdmVybGlnaHQtYXBwXFx0XFx0XFx0eGFwXFxuYXBwbGljYXRpb24veC1zcWxcXHRcXHRcXHRcXHRzcWxcXG5hcHBsaWNhdGlvbi94LXN0dWZmaXRcXHRcXHRcXHRcXHRzaXRcXG5hcHBsaWNhdGlvbi94LXN0dWZmaXR4XFx0XFx0XFx0XFx0c2l0eFxcbmFwcGxpY2F0aW9uL3gtc3VicmlwXFx0XFx0XFx0XFx0c3J0XFxuYXBwbGljYXRpb24veC1zdjRjcGlvXFx0XFx0XFx0XFx0c3Y0Y3Bpb1xcbmFwcGxpY2F0aW9uL3gtc3Y0Y3JjXFx0XFx0XFx0XFx0c3Y0Y3JjXFxuYXBwbGljYXRpb24veC10M3ZtLWltYWdlXFx0XFx0XFx0dDNcXG5hcHBsaWNhdGlvbi94LXRhZHNcXHRcXHRcXHRcXHRnYW1cXG5hcHBsaWNhdGlvbi94LXRhclxcdFxcdFxcdFxcdHRhclxcbmFwcGxpY2F0aW9uL3gtdGNsXFx0XFx0XFx0XFx0dGNsXFxuYXBwbGljYXRpb24veC10ZXhcXHRcXHRcXHRcXHR0ZXhcXG5hcHBsaWNhdGlvbi94LXRleC10Zm1cXHRcXHRcXHRcXHR0Zm1cXG5hcHBsaWNhdGlvbi94LXRleGluZm9cXHRcXHRcXHRcXHR0ZXhpbmZvIHRleGlcXG5hcHBsaWNhdGlvbi94LXRnaWZcXHRcXHRcXHRcXHRvYmpcXG5hcHBsaWNhdGlvbi94LXVzdGFyXFx0XFx0XFx0XFx0dXN0YXJcXG5hcHBsaWNhdGlvbi94LXdhaXMtc291cmNlXFx0XFx0XFx0c3JjXFxuYXBwbGljYXRpb24veC14NTA5LWNhLWNlcnRcXHRcXHRcXHRkZXIgY3J0XFxuYXBwbGljYXRpb24veC14ZmlnXFx0XFx0XFx0XFx0ZmlnXFxuYXBwbGljYXRpb24veC14bGlmZit4bWxcXHRcXHRcXHRcXHR4bGZcXG5hcHBsaWNhdGlvbi94LXhwaW5zdGFsbFxcdFxcdFxcdFxcdHhwaVxcbmFwcGxpY2F0aW9uL3gteHpcXHRcXHRcXHRcXHR4elxcbmFwcGxpY2F0aW9uL3gtem1hY2hpbmVcXHRcXHRcXHRcXHR6MSB6MiB6MyB6NCB6NSB6NiB6NyB6OFxcbmFwcGxpY2F0aW9uL3hhbWwreG1sXFx0XFx0XFx0XFx0eGFtbFxcbmFwcGxpY2F0aW9uL3hjYXAtZGlmZit4bWxcXHRcXHRcXHR4ZGZcXG5hcHBsaWNhdGlvbi94ZW5jK3htbFxcdFxcdFxcdFxcdHhlbmNcXG5hcHBsaWNhdGlvbi94aHRtbCt4bWxcXHRcXHRcXHRcXHR4aHRtbCB4aHRcXG5hcHBsaWNhdGlvbi94bWxcXHRcXHRcXHRcXHRcXHR4bWwgeHNsXFxuYXBwbGljYXRpb24veG1sLWR0ZFxcdFxcdFxcdFxcdGR0ZFxcbmFwcGxpY2F0aW9uL3hvcCt4bWxcXHRcXHRcXHRcXHR4b3BcXG5hcHBsaWNhdGlvbi94cHJvYyt4bWxcXHRcXHRcXHRcXHR4cGxcXG5hcHBsaWNhdGlvbi94c2x0K3htbFxcdFxcdFxcdFxcdHhzbHRcXG5hcHBsaWNhdGlvbi94c3BmK3htbFxcdFxcdFxcdFxcdHhzcGZcXG5hcHBsaWNhdGlvbi94dit4bWxcXHRcXHRcXHRcXHRteG1sIHhodm1sIHh2bWwgeHZtXFxuYXBwbGljYXRpb24veWFuZ1xcdFxcdFxcdFxcdHlhbmdcXG5hcHBsaWNhdGlvbi95aW4reG1sXFx0XFx0XFx0XFx0eWluXFxuYXBwbGljYXRpb24vemlwXFx0XFx0XFx0XFx0XFx0emlwXFxuYXVkaW8vYWRwY21cXHRcXHRcXHRcXHRcXHRhZHBcXG5hdWRpby9iYXNpY1xcdFxcdFxcdFxcdFxcdGF1IHNuZFxcbmF1ZGlvL21pZGlcXHRcXHRcXHRcXHRcXHRtaWQgbWlkaSBrYXIgcm1pXFxuYXVkaW8vbXA0XFx0XFx0XFx0XFx0XFx0bTRhIG1wNGFcXG5hdWRpby9tcGVnXFx0XFx0XFx0XFx0XFx0bXBnYSBtcDIgbXAyYSBtcDMgbTJhIG0zYVxcbmF1ZGlvL29nZ1xcdFxcdFxcdFxcdFxcdG9nYSBvZ2cgc3B4XFxuYXVkaW8vczNtXFx0XFx0XFx0XFx0XFx0czNtXFxuYXVkaW8vc2lsa1xcdFxcdFxcdFxcdFxcdHNpbFxcbmF1ZGlvL3ZuZC5kZWNlLmF1ZGlvXFx0XFx0XFx0XFx0dXZhIHV2dmFcXG5hdWRpby92bmQuZGlnaXRhbC13aW5kc1xcdFxcdFxcdFxcdGVvbFxcbmF1ZGlvL3ZuZC5kcmFcXHRcXHRcXHRcXHRcXHRkcmFcXG5hdWRpby92bmQuZHRzXFx0XFx0XFx0XFx0XFx0ZHRzXFxuYXVkaW8vdm5kLmR0cy5oZFxcdFxcdFxcdFxcdGR0c2hkXFxuYXVkaW8vdm5kLmx1Y2VudC52b2ljZVxcdFxcdFxcdFxcdGx2cFxcbmF1ZGlvL3ZuZC5tcy1wbGF5cmVhZHkubWVkaWEucHlhXFx0XFx0cHlhXFxuYXVkaW8vdm5kLm51ZXJhLmVjZWxwNDgwMFxcdFxcdFxcdGVjZWxwNDgwMFxcbmF1ZGlvL3ZuZC5udWVyYS5lY2VscDc0NzBcXHRcXHRcXHRlY2VscDc0NzBcXG5hdWRpby92bmQubnVlcmEuZWNlbHA5NjAwXFx0XFx0XFx0ZWNlbHA5NjAwXFxuYXVkaW8vdm5kLnJpcFxcdFxcdFxcdFxcdFxcdHJpcFxcbmF1ZGlvL3dlYm1cXHRcXHRcXHRcXHRcXHR3ZWJhXFxuYXVkaW8veC1hYWNcXHRcXHRcXHRcXHRcXHRhYWNcXG5hdWRpby94LWFpZmZcXHRcXHRcXHRcXHRcXHRhaWYgYWlmZiBhaWZjXFxuYXVkaW8veC1jYWZcXHRcXHRcXHRcXHRcXHRjYWZcXG5hdWRpby94LWZsYWNcXHRcXHRcXHRcXHRcXHRmbGFjXFxuYXVkaW8veC1tYXRyb3NrYVxcdFxcdFxcdFxcdG1rYVxcbmF1ZGlvL3gtbXBlZ3VybFxcdFxcdFxcdFxcdFxcdG0zdVxcbmF1ZGlvL3gtbXMtd2F4XFx0XFx0XFx0XFx0XFx0d2F4XFxuYXVkaW8veC1tcy13bWFcXHRcXHRcXHRcXHRcXHR3bWFcXG5hdWRpby94LXBuLXJlYWxhdWRpb1xcdFxcdFxcdFxcdHJhbSByYVxcbmF1ZGlvL3gtcG4tcmVhbGF1ZGlvLXBsdWdpblxcdFxcdFxcdHJtcFxcbmF1ZGlvL3gtd2F2XFx0XFx0XFx0XFx0XFx0d2F2XFxuYXVkaW8veG1cXHRcXHRcXHRcXHRcXHR4bVxcbmNoZW1pY2FsL3gtY2R4XFx0XFx0XFx0XFx0XFx0Y2R4XFxuY2hlbWljYWwveC1jaWZcXHRcXHRcXHRcXHRcXHRjaWZcXG5jaGVtaWNhbC94LWNtZGZcXHRcXHRcXHRcXHRcXHRjbWRmXFxuY2hlbWljYWwveC1jbWxcXHRcXHRcXHRcXHRcXHRjbWxcXG5jaGVtaWNhbC94LWNzbWxcXHRcXHRcXHRcXHRcXHRjc21sXFxuY2hlbWljYWwveC14eXpcXHRcXHRcXHRcXHRcXHR4eXpcXG5mb250L2NvbGxlY3Rpb25cXHRcXHRcXHRcXHRcXHR0dGNcXG5mb250L290ZlxcdFxcdFxcdFxcdFxcdG90ZlxcbmZvbnQvdHRmXFx0XFx0XFx0XFx0XFx0dHRmXFxuZm9udC93b2ZmXFx0XFx0XFx0XFx0XFx0d29mZlxcbmZvbnQvd29mZjJcXHRcXHRcXHRcXHRcXHR3b2ZmMlxcbmltYWdlL2JtcFxcdFxcdFxcdFxcdFxcdGJtcFxcbmltYWdlL2NnbVxcdFxcdFxcdFxcdFxcdGNnbVxcbmltYWdlL2czZmF4XFx0XFx0XFx0XFx0XFx0ZzNcXG5pbWFnZS9naWZcXHRcXHRcXHRcXHRcXHRnaWZcXG5pbWFnZS9pZWZcXHRcXHRcXHRcXHRcXHRpZWZcXG5pbWFnZS9qcGVnXFx0XFx0XFx0XFx0XFx0anBlZyBqcGcganBlXFxuaW1hZ2Uva3R4XFx0XFx0XFx0XFx0XFx0a3R4XFxuaW1hZ2UvcG5nXFx0XFx0XFx0XFx0XFx0cG5nXFxuaW1hZ2UvcHJzLmJ0aWZcXHRcXHRcXHRcXHRcXHRidGlmXFxuaW1hZ2Uvc2dpXFx0XFx0XFx0XFx0XFx0c2dpXFxuaW1hZ2Uvc3ZnK3htbFxcdFxcdFxcdFxcdFxcdHN2ZyBzdmd6XFxuaW1hZ2UvdGlmZlxcdFxcdFxcdFxcdFxcdHRpZmYgdGlmXFxuaW1hZ2Uvdm5kLmFkb2JlLnBob3Rvc2hvcFxcdFxcdFxcdHBzZFxcbmltYWdlL3ZuZC5kZWNlLmdyYXBoaWNcXHRcXHRcXHRcXHR1dmkgdXZ2aSB1dmcgdXZ2Z1xcbmltYWdlL3ZuZC5kanZ1XFx0XFx0XFx0XFx0XFx0ZGp2dSBkanZcXG5pbWFnZS92bmQuZHZiLnN1YnRpdGxlXFx0XFx0XFx0XFx0c3ViXFxuaW1hZ2Uvdm5kLmR3Z1xcdFxcdFxcdFxcdFxcdGR3Z1xcbmltYWdlL3ZuZC5keGZcXHRcXHRcXHRcXHRcXHRkeGZcXG5pbWFnZS92bmQuZmFzdGJpZHNoZWV0XFx0XFx0XFx0XFx0ZmJzXFxuaW1hZ2Uvdm5kLmZweFxcdFxcdFxcdFxcdFxcdGZweFxcbmltYWdlL3ZuZC5mc3RcXHRcXHRcXHRcXHRcXHRmc3RcXG5pbWFnZS92bmQuZnVqaXhlcm94LmVkbWljcy1tbXJcXHRcXHRcXHRtbXJcXG5pbWFnZS92bmQuZnVqaXhlcm94LmVkbWljcy1ybGNcXHRcXHRcXHRybGNcXG5pbWFnZS92bmQubXMtbW9kaVxcdFxcdFxcdFxcdG1kaVxcbmltYWdlL3ZuZC5tcy1waG90b1xcdFxcdFxcdFxcdHdkcFxcbmltYWdlL3ZuZC5uZXQtZnB4XFx0XFx0XFx0XFx0bnB4XFxuaW1hZ2Uvdm5kLndhcC53Ym1wXFx0XFx0XFx0XFx0d2JtcFxcbmltYWdlL3ZuZC54aWZmXFx0XFx0XFx0XFx0XFx0eGlmXFxuaW1hZ2Uvd2VicFxcdFxcdFxcdFxcdFxcdHdlYnBcXG5pbWFnZS94LTNkc1xcdFxcdFxcdFxcdFxcdDNkc1xcbmltYWdlL3gtY211LXJhc3RlclxcdFxcdFxcdFxcdHJhc1xcbmltYWdlL3gtY214XFx0XFx0XFx0XFx0XFx0Y214XFxuaW1hZ2UveC1mcmVlaGFuZFxcdFxcdFxcdFxcdGZoIGZoYyBmaDQgZmg1IGZoN1xcbmltYWdlL3gtaWNvblxcdFxcdFxcdFxcdFxcdGljb1xcbmltYWdlL3gtbXJzaWQtaW1hZ2VcXHRcXHRcXHRcXHRzaWRcXG5pbWFnZS94LXBjeFxcdFxcdFxcdFxcdFxcdHBjeFxcbmltYWdlL3gtcGljdFxcdFxcdFxcdFxcdFxcdHBpYyBwY3RcXG5pbWFnZS94LXBvcnRhYmxlLWFueW1hcFxcdFxcdFxcdFxcdHBubVxcbmltYWdlL3gtcG9ydGFibGUtYml0bWFwXFx0XFx0XFx0XFx0cGJtXFxuaW1hZ2UveC1wb3J0YWJsZS1ncmF5bWFwXFx0XFx0XFx0cGdtXFxuaW1hZ2UveC1wb3J0YWJsZS1waXhtYXBcXHRcXHRcXHRcXHRwcG1cXG5pbWFnZS94LXJnYlxcdFxcdFxcdFxcdFxcdHJnYlxcbmltYWdlL3gtdGdhXFx0XFx0XFx0XFx0XFx0dGdhXFxuaW1hZ2UveC14Yml0bWFwXFx0XFx0XFx0XFx0XFx0eGJtXFxuaW1hZ2UveC14cGl4bWFwXFx0XFx0XFx0XFx0XFx0eHBtXFxuaW1hZ2UveC14d2luZG93ZHVtcFxcdFxcdFxcdFxcdHh3ZFxcbm1lc3NhZ2UvcmZjODIyXFx0XFx0XFx0XFx0XFx0ZW1sIG1pbWVcXG5tb2RlbC9pZ2VzXFx0XFx0XFx0XFx0XFx0aWdzIGlnZXNcXG5tb2RlbC9tZXNoXFx0XFx0XFx0XFx0XFx0bXNoIG1lc2ggc2lsb1xcbm1vZGVsL3ZuZC5jb2xsYWRhK3htbFxcdFxcdFxcdFxcdGRhZVxcbm1vZGVsL3ZuZC5kd2ZcXHRcXHRcXHRcXHRcXHRkd2ZcXG5tb2RlbC92bmQuZ2RsXFx0XFx0XFx0XFx0XFx0Z2RsXFxubW9kZWwvdm5kLmd0d1xcdFxcdFxcdFxcdFxcdGd0d1xcbm1vZGVsL3ZuZC5tdHNcXHRcXHRcXHRcXHRcXHRtdHNcXG5tb2RlbC92bmQudnR1XFx0XFx0XFx0XFx0XFx0dnR1XFxubW9kZWwvdnJtbFxcdFxcdFxcdFxcdFxcdHdybCB2cm1sXFxubW9kZWwveDNkK2JpbmFyeVxcdFxcdFxcdFxcdHgzZGIgeDNkYnpcXG5tb2RlbC94M2QrdnJtbFxcdFxcdFxcdFxcdFxcdHgzZHYgeDNkdnpcXG5tb2RlbC94M2QreG1sXFx0XFx0XFx0XFx0XFx0eDNkIHgzZHpcXG50ZXh0L2NhY2hlLW1hbmlmZXN0XFx0XFx0XFx0XFx0YXBwY2FjaGVcXG50ZXh0L2NhbGVuZGFyXFx0XFx0XFx0XFx0XFx0aWNzIGlmYlxcbnRleHQvY3NzXFx0XFx0XFx0XFx0XFx0Y3NzXFxudGV4dC9jc3ZcXHRcXHRcXHRcXHRcXHRjc3ZcXG50ZXh0L2h0bWxcXHRcXHRcXHRcXHRcXHRodG1sIGh0bVxcbnRleHQvbjNcXHRcXHRcXHRcXHRcXHRcXHRuM1xcbnRleHQvcGxhaW5cXHRcXHRcXHRcXHRcXHR0eHQgdGV4dCBjb25mIGRlZiBsaXN0IGxvZyBpblxcbnRleHQvcHJzLmxpbmVzLnRhZ1xcdFxcdFxcdFxcdGRzY1xcbnRleHQvcmljaHRleHRcXHRcXHRcXHRcXHRcXHRydHhcXG50ZXh0L3NnbWxcXHRcXHRcXHRcXHRcXHRzZ21sIHNnbVxcbnRleHQvdGFiLXNlcGFyYXRlZC12YWx1ZXNcXHRcXHRcXHR0c3ZcXG50ZXh0L3Ryb2ZmXFx0XFx0XFx0XFx0XFx0dCB0ciByb2ZmIG1hbiBtZSBtc1xcbnRleHQvdHVydGxlXFx0XFx0XFx0XFx0XFx0dHRsXFxudGV4dC91cmktbGlzdFxcdFxcdFxcdFxcdFxcdHVyaSB1cmlzIHVybHNcXG50ZXh0L3ZjYXJkXFx0XFx0XFx0XFx0XFx0dmNhcmRcXG50ZXh0L3ZuZC5jdXJsXFx0XFx0XFx0XFx0XFx0Y3VybFxcbnRleHQvdm5kLmN1cmwuZGN1cmxcXHRcXHRcXHRcXHRkY3VybFxcbnRleHQvdm5kLmN1cmwubWN1cmxcXHRcXHRcXHRcXHRtY3VybFxcbnRleHQvdm5kLmN1cmwuc2N1cmxcXHRcXHRcXHRcXHRzY3VybFxcbnRleHQvdm5kLmR2Yi5zdWJ0aXRsZVxcdFxcdFxcdFxcdHN1YlxcbnRleHQvdm5kLmZseVxcdFxcdFxcdFxcdFxcdGZseVxcbnRleHQvdm5kLmZtaS5mbGV4c3RvclxcdFxcdFxcdFxcdGZseFxcbnRleHQvdm5kLmdyYXBodml6XFx0XFx0XFx0XFx0Z3ZcXG50ZXh0L3ZuZC5pbjNkLjNkbWxcXHRcXHRcXHRcXHQzZG1sXFxudGV4dC92bmQuaW4zZC5zcG90XFx0XFx0XFx0XFx0c3BvdFxcbnRleHQvdm5kLnN1bi5qMm1lLmFwcC1kZXNjcmlwdG9yXFx0XFx0amFkXFxudGV4dC92bmQud2FwLndtbFxcdFxcdFxcdFxcdHdtbFxcbnRleHQvdm5kLndhcC53bWxzY3JpcHRcXHRcXHRcXHRcXHR3bWxzXFxudGV4dC94LWFzbVxcdFxcdFxcdFxcdFxcdHMgYXNtXFxudGV4dC94LWNcXHRcXHRcXHRcXHRcXHRjIGNjIGN4eCBjcHAgaCBoaCBkaWNcXG50ZXh0L3gtZm9ydHJhblxcdFxcdFxcdFxcdFxcdGYgZm9yIGY3NyBmOTBcXG50ZXh0L3gtamF2YS1zb3VyY2VcXHRcXHRcXHRcXHRqYXZhXFxudGV4dC94LW5mb1xcdFxcdFxcdFxcdFxcdG5mb1xcbnRleHQveC1vcG1sXFx0XFx0XFx0XFx0XFx0b3BtbFxcbnRleHQveC1wYXNjYWxcXHRcXHRcXHRcXHRcXHRwIHBhc1xcbnRleHQveC1zZXRleHRcXHRcXHRcXHRcXHRcXHRldHhcXG50ZXh0L3gtc2Z2XFx0XFx0XFx0XFx0XFx0c2Z2XFxudGV4dC94LXV1ZW5jb2RlXFx0XFx0XFx0XFx0XFx0dXVcXG50ZXh0L3gtdmNhbGVuZGFyXFx0XFx0XFx0XFx0dmNzXFxudGV4dC94LXZjYXJkXFx0XFx0XFx0XFx0XFx0dmNmXFxudmlkZW8vM2dwcFxcdFxcdFxcdFxcdFxcdDNncFxcbnZpZGVvLzNncHAyXFx0XFx0XFx0XFx0XFx0M2cyXFxudmlkZW8vaDI2MVxcdFxcdFxcdFxcdFxcdGgyNjFcXG52aWRlby9oMjYzXFx0XFx0XFx0XFx0XFx0aDI2M1xcbnZpZGVvL2gyNjRcXHRcXHRcXHRcXHRcXHRoMjY0XFxudmlkZW8vanBlZ1xcdFxcdFxcdFxcdFxcdGpwZ3ZcXG52aWRlby9qcG1cXHRcXHRcXHRcXHRcXHRqcG0ganBnbVxcbnZpZGVvL21qMlxcdFxcdFxcdFxcdFxcdG1qMiBtanAyXFxudmlkZW8vbXA0XFx0XFx0XFx0XFx0XFx0bXA0IG1wNHYgbXBnNFxcbnZpZGVvL21wZWdcXHRcXHRcXHRcXHRcXHRtcGVnIG1wZyBtcGUgbTF2IG0ydlxcbnZpZGVvL29nZ1xcdFxcdFxcdFxcdFxcdG9ndlxcbnZpZGVvL3F1aWNrdGltZVxcdFxcdFxcdFxcdFxcdHF0IG1vdlxcbnZpZGVvL3ZuZC5kZWNlLmhkXFx0XFx0XFx0XFx0dXZoIHV2dmhcXG52aWRlby92bmQuZGVjZS5tb2JpbGVcXHRcXHRcXHRcXHR1dm0gdXZ2bVxcbnZpZGVvL3ZuZC5kZWNlLnBkXFx0XFx0XFx0XFx0dXZwIHV2dnBcXG52aWRlby92bmQuZGVjZS5zZFxcdFxcdFxcdFxcdHV2cyB1dnZzXFxudmlkZW8vdm5kLmRlY2UudmlkZW9cXHRcXHRcXHRcXHR1dnYgdXZ2dlxcbnZpZGVvL3ZuZC5kdmIuZmlsZVxcdFxcdFxcdFxcdGR2YlxcbnZpZGVvL3ZuZC5mdnRcXHRcXHRcXHRcXHRcXHRmdnRcXG52aWRlby92bmQubXBlZ3VybFxcdFxcdFxcdFxcdG14dSBtNHVcXG52aWRlby92bmQubXMtcGxheXJlYWR5Lm1lZGlhLnB5dlxcdFxcdHB5dlxcbnZpZGVvL3ZuZC51dnZ1Lm1wNFxcdFxcdFxcdFxcdHV2dSB1dnZ1XFxudmlkZW8vdm5kLnZpdm9cXHRcXHRcXHRcXHRcXHR2aXZcXG52aWRlby93ZWJtXFx0XFx0XFx0XFx0XFx0d2VibVxcbnZpZGVvL3gtZjR2XFx0XFx0XFx0XFx0XFx0ZjR2XFxudmlkZW8veC1mbGlcXHRcXHRcXHRcXHRcXHRmbGlcXG52aWRlby94LWZsdlxcdFxcdFxcdFxcdFxcdGZsdlxcbnZpZGVvL3gtbTR2XFx0XFx0XFx0XFx0XFx0bTR2XFxudmlkZW8veC1tYXRyb3NrYVxcdFxcdFxcdFxcdG1rdiBtazNkIG1rc1xcbnZpZGVvL3gtbW5nXFx0XFx0XFx0XFx0XFx0bW5nXFxudmlkZW8veC1tcy1hc2ZcXHRcXHRcXHRcXHRcXHRhc2YgYXN4XFxudmlkZW8veC1tcy12b2JcXHRcXHRcXHRcXHRcXHR2b2JcXG52aWRlby94LW1zLXdtXFx0XFx0XFx0XFx0XFx0d21cXG52aWRlby94LW1zLXdtdlxcdFxcdFxcdFxcdFxcdHdtdlxcbnZpZGVvL3gtbXMtd214XFx0XFx0XFx0XFx0XFx0d214XFxudmlkZW8veC1tcy13dnhcXHRcXHRcXHRcXHRcXHR3dnhcXG52aWRlby94LW1zdmlkZW9cXHRcXHRcXHRcXHRcXHRhdmlcXG52aWRlby94LXNnaS1tb3ZpZVxcdFxcdFxcdFxcdG1vdmllXFxudmlkZW8veC1zbXZcXHRcXHRcXHRcXHRcXHRzbXZcXG54LWNvbmZlcmVuY2UveC1jb29sdGFsa1xcdFxcdFxcdFxcdGljZVxcblwiO1xuXG5jb25zdCBtYXAgPSBuZXcgTWFwKCk7XG5cbm1pbWVfcmF3LnNwbGl0KCdcXG4nKS5mb3JFYWNoKChyb3cpID0+IHtcblx0Y29uc3QgbWF0Y2ggPSAvKC4rPylcXHQrKC4rKS8uZXhlYyhyb3cpO1xuXHRpZiAoIW1hdGNoKSByZXR1cm47XG5cblx0Y29uc3QgdHlwZSA9IG1hdGNoWzFdO1xuXHRjb25zdCBleHRlbnNpb25zID0gbWF0Y2hbMl0uc3BsaXQoJyAnKTtcblxuXHRleHRlbnNpb25zLmZvckVhY2goZXh0ID0+IHtcblx0XHRtYXAuc2V0KGV4dCwgdHlwZSk7XG5cdH0pO1xufSk7XG5cbmZ1bmN0aW9uIGxvb2t1cChmaWxlKSB7XG5cdGNvbnN0IG1hdGNoID0gL1xcLihbXlxcLl0rKSQvLmV4ZWMoZmlsZSk7XG5cdHJldHVybiBtYXRjaCAmJiBtYXAuZ2V0KG1hdGNoWzFdKTtcbn1cblxuZnVuY3Rpb24gbWlkZGxld2FyZShvcHRzXG5cblxuID0ge30pIHtcblx0Y29uc3QgeyBzZXNzaW9uLCBpZ25vcmUgfSA9IG9wdHM7XG5cblx0bGV0IGVtaXR0ZWRfYmFzZXBhdGggPSBmYWxzZTtcblxuXHRyZXR1cm4gY29tcG9zZV9oYW5kbGVycyhpZ25vcmUsIFtcblx0XHQocmVxLCByZXMsIG5leHQpID0+IHtcblx0XHRcdGlmIChyZXEuYmFzZVVybCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGxldCB7IG9yaWdpbmFsVXJsIH0gPSByZXE7XG5cdFx0XHRcdGlmIChyZXEudXJsID09PSAnLycgJiYgb3JpZ2luYWxVcmxbb3JpZ2luYWxVcmwubGVuZ3RoIC0gMV0gIT09ICcvJykge1xuXHRcdFx0XHRcdG9yaWdpbmFsVXJsICs9ICcvJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlcS5iYXNlVXJsID0gb3JpZ2luYWxVcmxcblx0XHRcdFx0XHQ/IG9yaWdpbmFsVXJsLnNsaWNlKDAsIC1yZXEudXJsLmxlbmd0aClcblx0XHRcdFx0XHQ6ICcnO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWVtaXR0ZWRfYmFzZXBhdGggJiYgcHJvY2Vzcy5zZW5kKSB7XG5cdFx0XHRcdHByb2Nlc3Muc2VuZCh7XG5cdFx0XHRcdFx0X19zYXBwZXJfXzogdHJ1ZSxcblx0XHRcdFx0XHRldmVudDogJ2Jhc2VwYXRoJyxcblx0XHRcdFx0XHRiYXNlcGF0aDogcmVxLmJhc2VVcmxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0ZW1pdHRlZF9iYXNlcGF0aCA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChyZXEucGF0aCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHJlcS5wYXRoID0gcmVxLnVybC5yZXBsYWNlKC9cXD8uKi8sICcnKTtcblx0XHRcdH1cblxuXHRcdFx0bmV4dCgpO1xuXHRcdH0sXG5cblx0XHRmcy5leGlzdHNTeW5jKHBhdGguam9pbihidWlsZF9kaXIsICdzZXJ2aWNlLXdvcmtlci5qcycpKSAmJiBzZXJ2ZSh7XG5cdFx0XHRwYXRobmFtZTogJy9zZXJ2aWNlLXdvcmtlci5qcycsXG5cdFx0XHRjYWNoZV9jb250cm9sOiAnbm8tY2FjaGUsIG5vLXN0b3JlLCBtdXN0LXJldmFsaWRhdGUnXG5cdFx0fSksXG5cblx0XHRmcy5leGlzdHNTeW5jKHBhdGguam9pbihidWlsZF9kaXIsICdzZXJ2aWNlLXdvcmtlci5qcy5tYXAnKSkgJiYgc2VydmUoe1xuXHRcdFx0cGF0aG5hbWU6ICcvc2VydmljZS13b3JrZXIuanMubWFwJyxcblx0XHRcdGNhY2hlX2NvbnRyb2w6ICduby1jYWNoZSwgbm8tc3RvcmUsIG11c3QtcmV2YWxpZGF0ZSdcblx0XHR9KSxcblxuXHRcdHNlcnZlKHtcblx0XHRcdHByZWZpeDogJy9jbGllbnQvJyxcblx0XHRcdGNhY2hlX2NvbnRyb2w6IGRldiA/ICduby1jYWNoZScgOiAnbWF4LWFnZT0zMTUzNjAwMCwgaW1tdXRhYmxlJ1xuXHRcdH0pLFxuXG5cdFx0Z2V0X3NlcnZlcl9yb3V0ZV9oYW5kbGVyKG1hbmlmZXN0LnNlcnZlcl9yb3V0ZXMpLFxuXG5cdFx0Z2V0X3BhZ2VfaGFuZGxlcihtYW5pZmVzdCwgc2Vzc2lvbiB8fCBub29wKVxuXHRdLmZpbHRlcihCb29sZWFuKSk7XG59XG5cbmZ1bmN0aW9uIGNvbXBvc2VfaGFuZGxlcnMoaWdub3JlLCBoYW5kbGVycykge1xuXHRjb25zdCB0b3RhbCA9IGhhbmRsZXJzLmxlbmd0aDtcblxuXHRmdW5jdGlvbiBudGhfaGFuZGxlcihuLCByZXEsIHJlcywgbmV4dCkge1xuXHRcdGlmIChuID49IHRvdGFsKSB7XG5cdFx0XHRyZXR1cm4gbmV4dCgpO1xuXHRcdH1cblxuXHRcdGhhbmRsZXJzW25dKHJlcSwgcmVzLCAoKSA9PiBudGhfaGFuZGxlcihuKzEsIHJlcSwgcmVzLCBuZXh0KSk7XG5cdH1cblxuXHRyZXR1cm4gIWlnbm9yZVxuXHRcdD8gKHJlcSwgcmVzLCBuZXh0KSA9PiBudGhfaGFuZGxlcigwLCByZXEsIHJlcywgbmV4dClcblx0XHQ6IChyZXEsIHJlcywgbmV4dCkgPT4ge1xuXHRcdFx0aWYgKHNob3VsZF9pZ25vcmUocmVxLnBhdGgsIGlnbm9yZSkpIHtcblx0XHRcdFx0bmV4dCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bnRoX2hhbmRsZXIoMCwgcmVxLCByZXMsIG5leHQpO1xuXHRcdFx0fVxuXHRcdH07XG59XG5cbmZ1bmN0aW9uIHNob3VsZF9pZ25vcmUodXJpLCB2YWwpIHtcblx0aWYgKEFycmF5LmlzQXJyYXkodmFsKSkgcmV0dXJuIHZhbC5zb21lKHggPT4gc2hvdWxkX2lnbm9yZSh1cmksIHgpKTtcblx0aWYgKHZhbCBpbnN0YW5jZW9mIFJlZ0V4cCkgcmV0dXJuIHZhbC50ZXN0KHVyaSk7XG5cdGlmICh0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsKHVyaSk7XG5cdHJldHVybiB1cmkuc3RhcnRzV2l0aCh2YWwuY2hhckNvZGVBdCgwKSA9PT0gNDcgPyB2YWwgOiBgLyR7dmFsfWApO1xufVxuXG5mdW5jdGlvbiBzZXJ2ZSh7IHByZWZpeCwgcGF0aG5hbWUsIGNhY2hlX2NvbnRyb2wgfVxuXG5cblxuKSB7XG5cdGNvbnN0IGZpbHRlciA9IHBhdGhuYW1lXG5cdFx0PyAocmVxKSA9PiByZXEucGF0aCA9PT0gcGF0aG5hbWVcblx0XHQ6IChyZXEpID0+IHJlcS5wYXRoLnN0YXJ0c1dpdGgocHJlZml4KTtcblxuXHRjb25zdCBjYWNoZSA9IG5ldyBNYXAoKTtcblxuXHRjb25zdCByZWFkID0gZGV2XG5cdFx0PyAoZmlsZSkgPT4gZnMucmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZShidWlsZF9kaXIsIGZpbGUpKVxuXHRcdDogKGZpbGUpID0+IChjYWNoZS5oYXMoZmlsZSkgPyBjYWNoZSA6IGNhY2hlLnNldChmaWxlLCBmcy5yZWFkRmlsZVN5bmMocGF0aC5yZXNvbHZlKGJ1aWxkX2RpciwgZmlsZSkpKSkuZ2V0KGZpbGUpO1xuXG5cdHJldHVybiAocmVxLCByZXMsIG5leHQpID0+IHtcblx0XHRpZiAoZmlsdGVyKHJlcSkpIHtcblx0XHRcdGNvbnN0IHR5cGUgPSBsb29rdXAocmVxLnBhdGgpO1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCBmaWxlID0gZGVjb2RlVVJJQ29tcG9uZW50KHJlcS5wYXRoLnNsaWNlKDEpKTtcblx0XHRcdFx0Y29uc3QgZGF0YSA9IHJlYWQoZmlsZSk7XG5cblx0XHRcdFx0cmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgdHlwZSk7XG5cdFx0XHRcdHJlcy5zZXRIZWFkZXIoJ0NhY2hlLUNvbnRyb2wnLCBjYWNoZV9jb250cm9sKTtcblx0XHRcdFx0cmVzLmVuZChkYXRhKTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRyZXMuc3RhdHVzQ29kZSA9IDQwNDtcblx0XHRcdFx0cmVzLmVuZCgnbm90IGZvdW5kJyk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5leHQoKTtcblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIG5vb3AoKXt9XG5cbmV4cG9ydCB7IG1pZGRsZXdhcmUgfTtcbiIsImltcG9ydCBzaXJ2IGZyb20gJ3NpcnYnO1xuaW1wb3J0IHBvbGthIGZyb20gJ3BvbGthJztcbmltcG9ydCBjb21wcmVzc2lvbiBmcm9tICdjb21wcmVzc2lvbic7XG5pbXBvcnQgKiBhcyBzYXBwZXIgZnJvbSAnQHNhcHBlci9zZXJ2ZXInO1xuXG5jb25zdCB7IFBPUlQsIE5PREVfRU5WIH0gPSBwcm9jZXNzLmVudjtcbmNvbnN0IGRldiA9IE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xuXG5wb2xrYSgpIC8vIFlvdSBjYW4gYWxzbyB1c2UgRXhwcmVzc1xuXHQudXNlKFxuXHRcdGNvbXByZXNzaW9uKHsgdGhyZXNob2xkOiAwIH0pLFxuXHRcdHNpcnYoJ3N0YXRpYycsIHsgZGV2IH0pLFxuXHRcdHNhcHBlci5taWRkbGV3YXJlKClcblx0KVxuXHQubGlzdGVuKFBPUlQsIGVyciA9PiB7XG5cdFx0aWYgKGVycikgY29uc29sZS5sb2coJ2Vycm9yJywgZXJyKTtcblx0fSk7XG4iXSwibmFtZXMiOlsiZ2V0IiwicHJlbG9hZCIsImNvbXBvbmVudF8wIiwiY29tcG9uZW50XzEiLCJjb21wb25lbnRfMiIsImNvbXBvbmVudF8zIiwiY29tcG9uZW50XzQiLCJjb21wb25lbnRfNSIsImNvbXBvbmVudF82IiwicHJlbG9hZF82IiwiY29tcG9uZW50XzciLCJwcmVsb2FkXzciLCJyb290IiwiZXJyb3IiLCJlc2NhcGVkIiwibG9va3VwIiwibm9vcCIsInNhcHBlci5taWRkbGV3YXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7O0FBU0EsTUFBTSxLQUFLLEdBQUc7Q0FDYjtFQUNDLEtBQUssRUFBRSxpQkFBaUI7RUFDeEIsSUFBSSxFQUFFLGdCQUFnQjtFQUN0QixJQUFJLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7OztFQWFQLENBQUM7RUFDRDs7Q0FFRDtFQUNDLEtBQUssRUFBRSxtQkFBbUI7RUFDMUIsSUFBSSxFQUFFLG1CQUFtQjtFQUN6QixJQUFJLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBa0JQLENBQUM7RUFDRDs7Q0FFRDtFQUNDLEtBQUssRUFBRSxlQUFlO0VBQ3RCLElBQUksRUFBRSxjQUFjO0VBQ3BCLElBQUksRUFBRSxDQUFDOzs7O0VBSVAsQ0FBQztFQUNEOztDQUVEO0VBQ0MsS0FBSyxFQUFFLHVDQUF1QztFQUM5QyxJQUFJLEVBQUUsbUNBQW1DO0VBQ3pDLElBQUksRUFBRSxDQUFDOzs7Ozs7Ozs7RUFTUCxDQUFDO0VBQ0Q7O0NBRUQ7RUFDQyxLQUFLLEVBQUUseUJBQXlCO0VBQ2hDLElBQUksRUFBRSx3QkFBd0I7RUFDOUIsSUFBSSxFQUFFLENBQUM7O0VBRVAsQ0FBQztFQUNEO0NBQ0QsQ0FBQzs7QUFFRixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSTtDQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztDQUM5QyxDQUFDLENBQUM7O0FDdkZILE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJ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QkFDUixRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUM3QyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTt3QkFDMUIsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQzNELENBQUMsQ0FBQztvQkFDSCxNQUFNO2dCQUNWLEtBQUssS0FBSztvQkFDTixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN6QixZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN0SCxNQUFNO2dCQUNWLEtBQUssS0FBSztvQkFDTixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN6QixZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUU7d0JBQy9ELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixPQUFPLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7cUJBQzVELENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENB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
