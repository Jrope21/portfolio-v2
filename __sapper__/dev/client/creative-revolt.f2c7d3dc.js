import { S as SvelteComponentDev, i as init, s as safe_not_equal, e as element, t as text, a as space, c as claim_element, b as children, f as claim_text, d as detach, g as attr, h as add_location, j as insert, k as append, I as set_data, n as noop, G as null_to_empty, z as mount_component, u as transition_in, x as transition_out, A as destroy_component, v as add_render_callback, w as create_in_transition } from './index.0199b3b0.js';
import { T as TextAnimation } from './TextAnimation.0dd8326f.js';

/* src/components/project-detail/PageTitle.svelte generated by Svelte v3.9.1 */

const file = "src/components/project-detail/PageTitle.svelte";

function create_fragment(ctx) {
	var div1, div0, h1, t0, t1, span, t2, div0_class_value;

	return {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			h1 = element("h1");
			t0 = text(ctx.title);
			t1 = space();
			span = element("span");
			t2 = text(ctx.title);
			this.h();
		},

		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true }, false);
			var div1_nodes = children(div1);

			div0 = claim_element(div1_nodes, "DIV", { class: true }, false);
			var div0_nodes = children(div0);

			h1 = claim_element(div0_nodes, "H1", { class: true }, false);
			var h1_nodes = children(h1);

			t0 = claim_text(h1_nodes, ctx.title);
			h1_nodes.forEach(detach);
			t1 = claim_text(div0_nodes, "\n        ");

			span = claim_element(div0_nodes, "SPAN", { class: true }, false);
			var span_nodes = children(span);

			t2 = claim_text(span_nodes, ctx.title);
			span_nodes.forEach(detach);
			div0_nodes.forEach(detach);
			div1_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			attr(h1, "class", "svelte-a5em78");
			add_location(h1, file, 140, 8, 2853);
			attr(span, "class", "svelte-a5em78");
			add_location(span, file, 141, 8, 2878);
			attr(div0, "class", div0_class_value = "title-container " + ctx.sidePage + " svelte-a5em78");
			add_location(div0, file, 139, 4, 2804);
			attr(div1, "class", "page-header container svelte-a5em78");
			add_location(div1, file, 138, 0, 2764);
		},

		m: function mount(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div0, h1);
			append(h1, t0);
			append(div0, t1);
			append(div0, span);
			append(span, t2);
		},

		p: function update(changed, ctx) {
			if (changed.title) {
				set_data(t0, ctx.title);
				set_data(t2, ctx.title);
			}

			if ((changed.sidePage) && div0_class_value !== (div0_class_value = "title-container " + ctx.sidePage + " svelte-a5em78")) {
				attr(div0, "class", div0_class_value);
			}
		},

		i: noop,
		o: noop,

		d: function destroy(detaching) {
			if (detaching) {
				detach(div1);
			}
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { title, sidePage } = $$props;
// sidePage should be set to 'side-page' to toggle class

	const writable_props = ['title', 'sidePage'];
	Object.keys($$props).forEach(key => {
		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<PageTitle> was created with unknown prop '${key}'`);
	});

	$$self.$set = $$props => {
		if ('title' in $$props) $$invalidate('title', title = $$props.title);
		if ('sidePage' in $$props) $$invalidate('sidePage', sidePage = $$props.sidePage);
	};

	return { title, sidePage };
}

class PageTitle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, ["title", "sidePage"]);

		const { ctx } = this.$$;
		const props = options.props || {};
		if (ctx.title === undefined && !('title' in props)) {
			console.warn("<PageTitle> was created without expected prop 'title'");
		}
		if (ctx.sidePage === undefined && !('sidePage' in props)) {
			console.warn("<PageTitle> was created without expected prop 'sidePage'");
		}
	}

	get title() {
		throw new Error("<PageTitle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<PageTitle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get sidePage() {
		throw new Error("<PageTitle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set sidePage(value) {
		throw new Error("<PageTitle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/project-detail/Image.svelte generated by Svelte v3.9.1 */

const file$1 = "src/components/project-detail/Image.svelte";

function create_fragment$1(ctx) {
	var a, div, img;

	return {
		c: function create() {
			a = element("a");
			div = element("div");
			img = element("img");
			this.h();
		},

		l: function claim(nodes) {
			a = claim_element(nodes, "A", { target: true, class: true, href: true }, false);
			var a_nodes = children(a);

			div = claim_element(a_nodes, "DIV", { class: true }, false);
			var div_nodes = children(div);

			img = claim_element(div_nodes, "IMG", { src: true, alt: true, class: true }, false);
			var img_nodes = children(img);

			img_nodes.forEach(detach);
			div_nodes.forEach(detach);
			a_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			attr(img, "src", ctx.imgSrc);
			attr(img, "alt", ctx.alt);
			attr(img, "class", "svelte-1yqbubs");
			add_location(img, file$1, 73, 6, 1468);
			attr(div, "class", "img-container svelte-1yqbubs");
			add_location(div, file$1, 72, 4, 1434);
			attr(a, "target", "blank");
			attr(a, "class", "" + null_to_empty(ctx.width) + " svelte-1yqbubs");
			attr(a, "href", ctx.url);
			add_location(a, file$1, 71, 0, 1382);
		},

		m: function mount(target, anchor) {
			insert(target, a, anchor);
			append(a, div);
			append(div, img);
		},

		p: function update(changed, ctx) {
			if (changed.imgSrc) {
				attr(img, "src", ctx.imgSrc);
			}

			if (changed.alt) {
				attr(img, "alt", ctx.alt);
			}

			if (changed.width) {
				attr(a, "class", "" + null_to_empty(ctx.width) + " svelte-1yqbubs");
			}

			if (changed.url) {
				attr(a, "href", ctx.url);
			}
		},

		i: noop,
		o: noop,

		d: function destroy(detaching) {
			if (detaching) {
				detach(a);
			}
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	let { imgSrc, alt, projectName, url, width } = $$props;

	const writable_props = ['imgSrc', 'alt', 'projectName', 'url', 'width'];
	Object.keys($$props).forEach(key => {
		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<Image> was created with unknown prop '${key}'`);
	});

	$$self.$set = $$props => {
		if ('imgSrc' in $$props) $$invalidate('imgSrc', imgSrc = $$props.imgSrc);
		if ('alt' in $$props) $$invalidate('alt', alt = $$props.alt);
		if ('projectName' in $$props) $$invalidate('projectName', projectName = $$props.projectName);
		if ('url' in $$props) $$invalidate('url', url = $$props.url);
		if ('width' in $$props) $$invalidate('width', width = $$props.width);
	};

	return { imgSrc, alt, projectName, url, width };
}

class Image extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, ["imgSrc", "alt", "projectName", "url", "width"]);

		const { ctx } = this.$$;
		const props = options.props || {};
		if (ctx.imgSrc === undefined && !('imgSrc' in props)) {
			console.warn("<Image> was created without expected prop 'imgSrc'");
		}
		if (ctx.alt === undefined && !('alt' in props)) {
			console.warn("<Image> was created without expected prop 'alt'");
		}
		if (ctx.projectName === undefined && !('projectName' in props)) {
			console.warn("<Image> was created without expected prop 'projectName'");
		}
		if (ctx.url === undefined && !('url' in props)) {
			console.warn("<Image> was created without expected prop 'url'");
		}
		if (ctx.width === undefined && !('width' in props)) {
			console.warn("<Image> was created without expected prop 'width'");
		}
	}

	get imgSrc() {
		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set imgSrc(value) {
		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get alt() {
		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set alt(value) {
		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get projectName() {
		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set projectName(value) {
		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get url() {
		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set url(value) {
		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get width() {
		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set width(value) {
		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/project-detail/Description.svelte generated by Svelte v3.9.1 */

const file$2 = "src/components/project-detail/Description.svelte";

function create_fragment$2(ctx) {
	var h2, t0, t1, p, t2, strong0, t3, t4, strong1, t5, t6, strong2, t7, t8, strong3, t9, t10, t11, a, current;

	var textanimation = new TextAnimation({
		props: { text: `View Website` },
		$$inline: true
	});

	return {
		c: function create() {
			h2 = element("h2");
			t0 = text("Project Details");
			t1 = space();
			p = element("p");
			t2 = text("I was tasked with being the ");
			strong0 = element("strong");
			t3 = text("sole developer");
			t4 = text(" on a ");
			strong1 = element("strong");
			t5 = text("complete Front-End redesign");
			t6 = text(". Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, ");
			strong2 = element("strong");
			t7 = text("form verification");
			t8 = text(", and several ");
			strong3 = element("strong");
			t9 = text("third party integrations");
			t10 = text(".");
			t11 = space();
			a = element("a");
			textanimation.$$.fragment.c();
			this.h();
		},

		l: function claim(nodes) {
			h2 = claim_element(nodes, "H2", { class: true }, false);
			var h2_nodes = children(h2);

			t0 = claim_text(h2_nodes, "Project Details");
			h2_nodes.forEach(detach);
			t1 = claim_text(nodes, "\n");

			p = claim_element(nodes, "P", { class: true }, false);
			var p_nodes = children(p);

			t2 = claim_text(p_nodes, "I was tasked with being the ");

			strong0 = claim_element(p_nodes, "STRONG", {}, false);
			var strong0_nodes = children(strong0);

			t3 = claim_text(strong0_nodes, "sole developer");
			strong0_nodes.forEach(detach);
			t4 = claim_text(p_nodes, " on a ");

			strong1 = claim_element(p_nodes, "STRONG", {}, false);
			var strong1_nodes = children(strong1);

			t5 = claim_text(strong1_nodes, "complete Front-End redesign");
			strong1_nodes.forEach(detach);
			t6 = claim_text(p_nodes, ". Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, ");

			strong2 = claim_element(p_nodes, "STRONG", {}, false);
			var strong2_nodes = children(strong2);

			t7 = claim_text(strong2_nodes, "form verification");
			strong2_nodes.forEach(detach);
			t8 = claim_text(p_nodes, ", and several ");

			strong3 = claim_element(p_nodes, "STRONG", {}, false);
			var strong3_nodes = children(strong3);

			t9 = claim_text(strong3_nodes, "third party integrations");
			strong3_nodes.forEach(detach);
			t10 = claim_text(p_nodes, ".");
			p_nodes.forEach(detach);
			t11 = claim_text(nodes, "\n");

			a = claim_element(nodes, "A", { target: true, href: true, class: true }, false);
			var a_nodes = children(a);

			textanimation.$$.fragment.l(a_nodes);
			a_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			attr(h2, "class", "svelte-15fylu9");
			add_location(h2, file$2, 61, 0, 1179);
			add_location(strong0, file$2, 62, 31, 1235);
			add_location(strong1, file$2, 62, 68, 1272);
			add_location(strong2, file$2, 62, 373, 1577);
			add_location(strong3, file$2, 62, 421, 1625);
			attr(p, "class", "svelte-15fylu9");
			add_location(p, file$2, 62, 0, 1204);
			attr(a, "target", "blank");
			attr(a, "href", "");
			attr(a, "class", "svelte-15fylu9");
			add_location(a, file$2, 63, 0, 1672);
		},

		m: function mount(target, anchor) {
			insert(target, h2, anchor);
			append(h2, t0);
			insert(target, t1, anchor);
			insert(target, p, anchor);
			append(p, t2);
			append(p, strong0);
			append(strong0, t3);
			append(p, t4);
			append(p, strong1);
			append(strong1, t5);
			append(p, t6);
			append(p, strong2);
			append(strong2, t7);
			append(p, t8);
			append(p, strong3);
			append(strong3, t9);
			append(p, t10);
			insert(target, t11, anchor);
			insert(target, a, anchor);
			mount_component(textanimation, a, null);
			current = true;
		},

		p: noop,

		i: function intro(local) {
			if (current) return;
			transition_in(textanimation.$$.fragment, local);

			current = true;
		},

		o: function outro(local) {
			transition_out(textanimation.$$.fragment, local);
			current = false;
		},

		d: function destroy(detaching) {
			if (detaching) {
				detach(h2);
				detach(t1);
				detach(p);
				detach(t11);
				detach(a);
			}

			destroy_component(textanimation);
		}
	};
}

class Description extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, null, create_fragment$2, safe_not_equal, []);
	}
}

/* src/components/project-detail/ImageGrid.svelte generated by Svelte v3.9.1 */

const file$3 = "src/components/project-detail/ImageGrid.svelte";

function create_fragment$3(ctx) {
	var div6, div5, div0, t0, div4, div1, t1, div2, t2, div3, current;

	var description = new Description({ $$inline: true });

	var image0 = new Image({
		props: {
		width: 'full-width',
		imgSrc: 'images/Jorden-Background-Gray.jpg',
		url: '',
		alt: ''
	},
		$$inline: true
	});

	var image1 = new Image({
		props: {
		width: 'full-width',
		imgSrc: 'images/Jorden-Background-Gray.jpg',
		url: '',
		alt: ''
	},
		$$inline: true
	});

	var image2 = new Image({
		props: {
		width: 'full-width',
		imgSrc: 'images/Jorden-Background-Gray.jpg',
		url: '',
		alt: ''
	},
		$$inline: true
	});

	return {
		c: function create() {
			div6 = element("div");
			div5 = element("div");
			div0 = element("div");
			description.$$.fragment.c();
			t0 = space();
			div4 = element("div");
			div1 = element("div");
			image0.$$.fragment.c();
			t1 = space();
			div2 = element("div");
			image1.$$.fragment.c();
			t2 = space();
			div3 = element("div");
			image2.$$.fragment.c();
			this.h();
		},

		l: function claim(nodes) {
			div6 = claim_element(nodes, "DIV", { class: true }, false);
			var div6_nodes = children(div6);

			div5 = claim_element(div6_nodes, "DIV", { class: true }, false);
			var div5_nodes = children(div5);

			div0 = claim_element(div5_nodes, "DIV", { class: true }, false);
			var div0_nodes = children(div0);

			description.$$.fragment.l(div0_nodes);
			div0_nodes.forEach(detach);
			t0 = claim_text(div5_nodes, "\n        \n        ");

			div4 = claim_element(div5_nodes, "DIV", { class: true }, false);
			var div4_nodes = children(div4);

			div1 = claim_element(div4_nodes, "DIV", { class: true }, false);
			var div1_nodes = children(div1);

			image0.$$.fragment.l(div1_nodes);
			div1_nodes.forEach(detach);
			t1 = claim_text(div4_nodes, "\n            ");

			div2 = claim_element(div4_nodes, "DIV", { class: true }, false);
			var div2_nodes = children(div2);

			image1.$$.fragment.l(div2_nodes);
			div2_nodes.forEach(detach);
			t2 = claim_text(div4_nodes, "\n            ");

			div3 = claim_element(div4_nodes, "DIV", { class: true }, false);
			var div3_nodes = children(div3);

			image2.$$.fragment.l(div3_nodes);
			div3_nodes.forEach(detach);
			div4_nodes.forEach(detach);
			div5_nodes.forEach(detach);
			div6_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			attr(div0, "class", "project-description svelte-zpf6ry");
			add_location(div0, file$3, 63, 8, 1179);
			attr(div1, "class", "grid-element-container full-width svelte-zpf6ry");
			add_location(div1, file$3, 68, 12, 1310);
			attr(div2, "class", "grid-element-container full-width svelte-zpf6ry");
			add_location(div2, file$3, 71, 12, 1557);
			attr(div3, "class", "grid-element-container full-width svelte-zpf6ry");
			add_location(div3, file$3, 74, 12, 1804);
			attr(div4, "class", "image-grid svelte-zpf6ry");
			add_location(div4, file$3, 67, 8, 1273);
			attr(div5, "class", "grid-x");
			add_location(div5, file$3, 62, 4, 1150);
			attr(div6, "class", "inner-container svelte-zpf6ry");
			add_location(div6, file$3, 60, 0, 1092);
		},

		m: function mount(target, anchor) {
			insert(target, div6, anchor);
			append(div6, div5);
			append(div5, div0);
			mount_component(description, div0, null);
			append(div5, t0);
			append(div5, div4);
			append(div4, div1);
			mount_component(image0, div1, null);
			append(div4, t1);
			append(div4, div2);
			mount_component(image1, div2, null);
			append(div4, t2);
			append(div4, div3);
			mount_component(image2, div3, null);
			current = true;
		},

		p: noop,

		i: function intro(local) {
			if (current) return;
			transition_in(description.$$.fragment, local);

			transition_in(image0.$$.fragment, local);

			transition_in(image1.$$.fragment, local);

			transition_in(image2.$$.fragment, local);

			current = true;
		},

		o: function outro(local) {
			transition_out(description.$$.fragment, local);
			transition_out(image0.$$.fragment, local);
			transition_out(image1.$$.fragment, local);
			transition_out(image2.$$.fragment, local);
			current = false;
		},

		d: function destroy(detaching) {
			if (detaching) {
				detach(div6);
			}

			destroy_component(description);

			destroy_component(image0);

			destroy_component(image1);

			destroy_component(image2);
		}
	};
}

class ImageGrid extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, null, create_fragment$3, safe_not_equal, []);
	}
}

/* src/routes/projects/creative-revolt.svelte generated by Svelte v3.9.1 */

const file$4 = "src/routes/projects/creative-revolt.svelte";

function create_fragment$4(ctx) {
	var t0, div, div_intro, t1, section, current;

	var pagetitle = new PageTitle({
		props: { title: 'Creative Revolt' },
		$$inline: true
	});

	var imagegrid = new ImageGrid({ $$inline: true });

	return {
		c: function create() {
			t0 = space();
			div = element("div");
			pagetitle.$$.fragment.c();
			t1 = space();
			section = element("section");
			imagegrid.$$.fragment.c();
			this.h();
		},

		l: function claim(nodes) {
			t0 = claim_text(nodes, "\n\n");

			div = claim_element(nodes, "DIV", {}, false);
			var div_nodes = children(div);

			pagetitle.$$.fragment.l(div_nodes);
			div_nodes.forEach(detach);
			t1 = claim_text(nodes, "\n\n");

			section = claim_element(nodes, "SECTION", { class: true }, false);
			var section_nodes = children(section);

			imagegrid.$$.fragment.l(section_nodes);
			section_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			document.title = "Creative Revolt | Front End Developer - Joshua Roper";
			add_location(div, file$4, 14, 0, 363);
			attr(section, "class", "container");
			add_location(section, file$4, 20, 0, 477);
		},

		m: function mount(target, anchor) {
			insert(target, t0, anchor);
			insert(target, div, anchor);
			mount_component(pagetitle, div, null);
			insert(target, t1, anchor);
			insert(target, section, anchor);
			mount_component(imagegrid, section, null);
			current = true;
		},

		p: noop,

		i: function intro(local) {
			if (current) return;
			transition_in(pagetitle.$$.fragment, local);

			if (!div_intro) {
				add_render_callback(() => {
					div_intro = create_in_transition(div, fly, { x: -80, duration: 500, delay: 200, });
					div_intro.start();
				});
			}

			transition_in(imagegrid.$$.fragment, local);

			current = true;
		},

		o: function outro(local) {
			transition_out(pagetitle.$$.fragment, local);
			transition_out(imagegrid.$$.fragment, local);
			current = false;
		},

		d: function destroy(detaching) {
			if (detaching) {
				detach(t0);
				detach(div);
			}

			destroy_component(pagetitle);

			if (detaching) {
				detach(t1);
				detach(section);
			}

			destroy_component(imagegrid);
		}
	};
}

class Creative_revolt extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, null, create_fragment$4, safe_not_equal, []);
	}
}

export default Creative_revolt;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRpdmUtcmV2b2x0LmYyYzdkM2RjLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWRldGFpbC9QYWdlVGl0bGUuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvSW1hZ2Uuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvRGVzY3JpcHRpb24uc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvSW1hZ2VHcmlkLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvcHJvamVjdHMvY3JlYXRpdmUtcmV2b2x0LnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuZXhwb3J0IGxldCB0aXRsZSwgc2lkZVBhZ2U7XG4vLyBzaWRlUGFnZSBzaG91bGQgYmUgc2V0IHRvICdzaWRlLXBhZ2UnIHRvIHRvZ2dsZSBjbGFzc1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuICAgIEBrZXlmcmFtZXMgc2xpZGVJblJpZ2h0IHtcbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAa2V5ZnJhbWVzIGJhZFNsaWRlSW5SaWdodCB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICAgIGxlZnQ6IC0xMDAlO1xuICAgICAgICB9XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgICAgbGVmdDogNXB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGl2Om5vdCgucGFnZS1oZWFkZXIpIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgICAgd2lkdGg6IDY1JTtcbiAgICAgICAgbWFyZ2luOiAtMDVweCAwcHggMjBweCAwO1xuICAgICAgICBmb250LXNpemU6IDE2cmVtO1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICBjb2xvcjogIzU4NTk1YjtcbiAgICAgICAgbWF4LXdpZHRoOiAxMzIwcHg7XG4gICAgfVxuXG4gICAgZGl2LnNpZGUtcGFnZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTJyZW07XG4gICAgICAgIG1heC13aWR0aDogMTcwNXB4O1xuICAgIH1cblxuICAgIGRpdi50aXRsZS1jb250YWluZXI6bm90KC5zaWRlLXBhZ2Upe1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIC8qIGFuaW1hdGlvbjogLjlzIGVhc2Utb3V0IDBzIDEgZmFkZUluIGZvcndhcmRzOyAqL1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgZGl2LnRpdGxlLWNvbnRhaW5lcjpub3QoLnNpZGUtcGFnZSl7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICBkaXY6bm90KC5wYWdlLWhlYWRlcikge1xuICAgICAgICAgICAgZm9udC1zaXplOiAyOHJlbTtcbiAgICAgICAgICAgIHdpZHRoOiA3NSU7XG4gICAgICAgIH1cblxuICAgICAgICBkaXYuc2lkZS1wYWdlIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjRyZW07XG4gICAgICAgICAgICB3aWR0aDogODUlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoMSB7XG4gICAgICAgIGNvbG9yOiAjM0IzQjNCO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIC8qIGxlZnQ6IC0xMDAlOyAqL1xuICAgICAgICByaWdodDogMHB4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmb250LXNpemU6IDMycHg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIG1hcmdpbjogMHB4O1xuICAgICAgICAvKiBhbmltYXRpb246IDFzIGVhc2Utb3V0IDBzIDEgc2xpZGVJblJpZ2h0IGZvcndhcmRzOyAqL1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICBoMSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDU1cHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICAgICAgaDEge1xuICAgICAgICAgICAgZm9udC1zaXplOiA2NHB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGl2LnBhZ2UtaGVhZGVye1xuICAgICAgICBtYXJnaW4tdG9wOiA5MHB4O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgICAgaGVpZ2h0OiAxMjVweDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgcGFkZGluZy1sZWZ0OjIwcmVtO1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICBkaXYucGFnZS1oZWFkZXIge1xuICAgICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICAgICAgICAgICAgaGVpZ2h0OiAyMjBweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0ZW0pe1xuICAgICAgICBkaXYucGFnZS1oZWFkZXIge1xuICAgICAgICAgICAgaGVpZ2h0OiAyNTBweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNwYW57XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZVgoLTEpO1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlWCgtMSkgcm90YXRlKDE4MGRlZykgc2tldygtMTBkZWcsIDBkZWcpO1xuICAgICAgICBvcGFjaXR5OiAuMDM7XG4gICAgICAgIGxlZnQ6IDNweDtcbiAgICAgICAgYm90dG9tOiAtMjVweDtcbiAgICAgICAgZm9udC1zaXplOiAzMnB4O1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICBzcGFuIHtcbiAgICAgICAgICAgIGxlZnQ6IDVweDtcbiAgICAgICAgICAgIGJvdHRvbTogLTU1cHg7XG4gICAgICAgICAgICBmb250LXNpemU6IDU1cHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICAgICAgc3BhbiB7XG4gICAgICAgICAgICBmb250LXNpemU6IDY0cHg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG48L3N0eWxlPlxuPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyIGNvbnRhaW5lclwiPlxuICAgIDxkaXYgY2xhc3M9J3RpdGxlLWNvbnRhaW5lciB7c2lkZVBhZ2V9Jz5cbiAgICAgICAgPGgxPnt0aXRsZX08L2gxPlxuICAgICAgICA8c3Bhbj57dGl0bGV9PC9zcGFuPlxuICAgIDwvZGl2PlxuPC9kaXY+IiwiPHNjcmlwdD5cbmV4cG9ydCBsZXQgaW1nU3JjLCBhbHQ7XG5leHBvcnQgbGV0IHByb2plY3ROYW1lO1xuZXhwb3J0IGxldCB1cmw7XG5leHBvcnQgbGV0IHdpZHRoO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgICBhLCBkaXZ7XG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICB9XG5cbiAgICBhIHtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG5cbiAgICAuaW1nLWNvbnRhaW5lcntcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB3aWR0aDogNjV2dztcbiAgICAgICAgaGVpZ2h0OiA2NXZ3O1xuICAgICAgICBtYXgtaGVpZ2h0OiAyNTBweDtcbiAgICAgICAgYm94LXNoYWRvdzogM3B4IDNweCAzcHggbGlnaHRncmV5O1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgLjNzIGVhc2UtaW47XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgICAgIC5pbWctY29udGFpbmVye1xuICAgICAgICAgICAgbWF4LXdpZHRoOjEwMCU7IFxuICAgICAgICAgICAgd2lkdGg6IDI1dnc7XG4gICAgICAgICAgICBoZWlnaHQ6IDI1dnc7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDM1MHB4O1xuICAgICAgICAgICAgbWF4LWhlaWdodDogMzUwcHg7XG4gICAgICAgIH0gXG5cbiAgICAgICAgLmxhcmdlIC5pbWctY29udGFpbmVyIHtcbiAgICAgICAgICAgIHdpZHRoOiAzMHZ3O1xuICAgICAgICAgICAgaGVpZ2h0OiAzMHZ3O1xuICAgICAgICAgICAgbWF4LXdpZHRoOiA0NTBweDtcbiAgICAgICAgICAgIG1heC1oZWlnaHQ6IDQ1MHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmZ1bGwtd2lkdGgge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICAuZnVsbC13aWR0aCAuaW1nLWNvbnRhaW5lciB7IFxuICAgICAgICAgICAgd2lkdGg6IGNhbGMoNTAlIC0gMzB2dyArIDYwdncpO1xuICAgICAgICAgICAgaGVpZ2h0OiAzMHZ3O1xuICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgICAvKiBtYXJnaW4tbGVmdDogYXV0bzsgKi9cbiAgICAgICAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgICAgICAgIG1heC1oZWlnaHQ6IDQ1MHB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYTpob3ZlciAuaW1nLWNvbnRhaW5lciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xuICAgICAgICBib3gtc2hhZG93OiA1cHggNXB4IDVweCBsaWdodGdyZXk7XG4gICAgfVxuXG4gICAgaW1nIHtcbiAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAuM3MgZWFzZS1pbjtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICB9XG4gICBcbjwvc3R5bGU+XG5cbjxhIHRhcmdldD1cImJsYW5rXCIgY2xhc3M9XCJ7d2lkdGh9XCIgaHJlZj1cInt1cmx9XCI+XG4gICAgPGRpdiBjbGFzcz1cImltZy1jb250YWluZXJcIj5cbiAgICAgIDxpbWcgc3JjPVwie2ltZ1NyY31cIiBhbHQ9XCJ7YWx0fVwiPlxuICAgIDwvZGl2PlxuPC9hPiIsIjxzY3JpcHQ+XG5pbXBvcnQgVGV4dEFuaW1hdGlvbiBmcm9tICcuLi9oZWxwZXItY29tcG9uZW50cy9UZXh0QW5pbWF0aW9uLnN2ZWx0ZSc7XG5cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gIGF7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgIGZvbnQtc2l6ZTogMTJyZW07XG4gICAgICAgIHdpZHRoOiBmaXQtY29udGVudDtcbiAgICAgICAgbWFyZ2luLXRvcDogMTByZW07XG4gICAgICAgIGNvbG9yOiAjOTg5ODk4O1xuICAgICAgICBmb250LXdlaWdodDogMzAwO1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgfVxuICAgIGgyIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBtYXJnaW46IDE1cmVtIDByZW0gNXJlbSAwcmVtO1xuICAgICAgICBmb250LXNpemU6IDEzcmVtO1xuICAgICAgICBmb250LXdlaWdodDogOTAwO1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIC4ycyBlYXNlLWluLW91dDtcbiAgICAgICAgY29sb3I6ICMzQjNCM0I7XG4gICAgICAgIHotaW5kZXg6IDI7XG4gICAgfVxuXG4gICAgcHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBsaW5lLWhlaWdodDogMTZweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgZm9udC1zaXplOiAxM3JlbTtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgY29sb3I6ICM1ODU5NWI7XG4gICAgICAgIHRleHQtaW5kZW50OiAxMHB4O1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pIHtcbiAgICAgICAgaDIge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMHJlbTtcbiAgICAgICAgfVxuICAgIH1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSl7XG4gICAgaDIge1xuICAgICAgICBmb250LXNpemU6IDIzcmVtO1xuICAgIH1cbiAgICBwe1xuICAgICAgICBmb250LXNpemU6IDE4cmVtO1xuICAgICAgICBsaW5lLWhlaWdodDogMjFweDtcbiAgICB9XG4gICAgYXtcbiAgICAgICAgZm9udC1zaXplOiAxNHJlbTtcbiAgICB9XG59XG48L3N0eWxlPlxuXG48aDI+UHJvamVjdCBEZXRhaWxzPC9oMj5cbjxwPkkgd2FzIHRhc2tlZCB3aXRoIGJlaW5nIHRoZSA8c3Ryb25nPnNvbGUgZGV2ZWxvcGVyPC9zdHJvbmc+IG9uIGEgPHN0cm9uZz5jb21wbGV0ZSBGcm9udC1FbmQgcmVkZXNpZ248L3N0cm9uZz4uIEtlZXBpbmcgdGhlaXIgY3VycmVudCB1c2VycyBpbiBtaW5kLCB0aGUgZ29hbCB3YXMgdG8gbWFrZSB0aGUgd2Vic2l0ZSBmZWVsIG1vcmUgbW9kZXJuLCBhbmQgb2ZmZXIgYSBiZXR0ZXIgdXNlciBleHBlcmllbmNlIHdoZW4gbmF2aWdhdGluZyB0byBlYWNoIGluZGl2aWR1YWwgcGFnZS4gQWNyb3NzIHRoZSBlbnRpcmUgcHJvamVjdCBJIGltcGxlbWVudGVkIHNldmVyYWwgZHluYW1pY2FsbHkgZ2VuZXJhdGVkIGNvbnRlbnQgcGFnZXMgLyBzbGlkZXJzLCA8c3Ryb25nPmZvcm0gdmVyaWZpY2F0aW9uPC9zdHJvbmc+LCBhbmQgc2V2ZXJhbCA8c3Ryb25nPnRoaXJkIHBhcnR5IGludGVncmF0aW9uczwvc3Ryb25nPi48L3A+XG48YSB0YXJnZXQ9XCJibGFua1wiIGhyZWY9XCJcIj5cbiAgICA8VGV4dEFuaW1hdGlvbiB0ZXh0PXtgVmlldyBXZWJzaXRlYH0gLz5cbjwvYT4iLCI8c2NyaXB0PlxuaW1wb3J0IEltYWdlIGZyb20gJy4vSW1hZ2Uuc3ZlbHRlJztcbmltcG9ydCBUb3BCYXIgZnJvbSAnLi9Ub3BCYXIuc3ZlbHRlJztcbmltcG9ydCBEZXNjcmlwdGlvbiBmcm9tICcuL0Rlc2NyaXB0aW9uLnN2ZWx0ZSc7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgLmlubmVyLWNvbnRhaW5lciB7XG4gICAgICAgIHdpZHRoOiA5MCU7XG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIH1cbn1cbi5pbWFnZS1ncmlkIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcGFkZGluZy10b3A6IDUlO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAuaW1hZ2UtZ3JpZCB7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGFsaWduLWl0ZW1zOiB1bnNldDtcbiAgICAgICAgd2lkdGg6IDcwJTtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiA1JTtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgfVxuICAgIC5wcm9qZWN0LWRlc2NyaXB0aW9uIHtcbiAgICAgICAgcGFkZGluZy10b3A6IDUlO1xuICAgICAgICB3aWR0aDogMzAlO1xuICAgIH1cbn1cblxuLmdyaWQtZWxlbWVudC1jb250YWluZXIge1xuICAgIHdpZHRoOiAyNTBweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWFyZ2luLWJvdHRvbTogOCU7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgIC5ncmlkLWVsZW1lbnQtY29udGFpbmVyIHtcbiAgICAgICAgd2lkdGg6IDUwJTtcbiAgICB9XG4gICAgLmdyaWQtZWxlbWVudC1jb250YWluZXIuZnVsbC13aWR0aCB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbiAgICAuZ3JpZC02MCB7XG4gICAgICAgIHdpZHRoOiA2MCU7XG4gICAgfVxuICAgIC5ncmlkLTQwIHtcbiAgICAgICAgd2lkdGg6IDQwJTtcbiAgICB9XG59XG48L3N0eWxlPlxuXG48ZGl2IGNsYXNzPVwiaW5uZXItY29udGFpbmVyXCI+XG4gICAgPCEtLSA8VG9wQmFyIC8+IC0tPlxuICAgIDxkaXYgY2xhc3M9XCJncmlkLXhcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2plY3QtZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgIDxEZXNjcmlwdGlvbiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZS1ncmlkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1lbGVtZW50LWNvbnRhaW5lciBmdWxsLXdpZHRoXCI+IDwhLS0gdGhpcyBzaG91bGQgYmUgYSBjb29sIGRlc2lnbmVyIGltYWdlIChsb2dvIHNoaXopIC0tPlxuICAgICAgICAgICAgICAgIDxJbWFnZSB3aWR0aD17J2Z1bGwtd2lkdGgnfSBpbWdTcmM9eydpbWFnZXMvSm9yZGVuLUJhY2tncm91bmQtR3JheS5qcGcnfSB1cmw9eycnfSBhbHQ9eycnfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1lbGVtZW50LWNvbnRhaW5lciBmdWxsLXdpZHRoXCI+IDwhLS0gdGhpcyBzaG91bGQgYmUgYSBjb29sIGRlc2lnbmVyIGltYWdlIChsb2dvIHNoaXopIC0tPlxuICAgICAgICAgICAgICAgIDxJbWFnZSB3aWR0aD17J2Z1bGwtd2lkdGgnfSBpbWdTcmM9eydpbWFnZXMvSm9yZGVuLUJhY2tncm91bmQtR3JheS5qcGcnfSB1cmw9eycnfSBhbHQ9eycnfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1lbGVtZW50LWNvbnRhaW5lciBmdWxsLXdpZHRoXCI+IDwhLS0gdGhpcyBzaG91bGQgYmUgYSBjb29sIGRlc2lnbmVyIGltYWdlIChsb2dvIHNoaXopIC0tPlxuICAgICAgICAgICAgICAgIDxJbWFnZSB3aWR0aD17J2Z1bGwtd2lkdGgnfSBpbWdTcmM9eydpbWFnZXMvSm9yZGVuLUJhY2tncm91bmQtR3JheS5qcGcnfSB1cmw9eycnfSBhbHQ9eycnfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+IiwiPHNjcmlwdD5cbmltcG9ydCBQYWdlVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wcm9qZWN0LWRldGFpbC9QYWdlVGl0bGUuc3ZlbHRlJztcbmltcG9ydCBJbWFnZUdyaWQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wcm9qZWN0LWRldGFpbC9JbWFnZUdyaWQuc3ZlbHRlJztcbmltcG9ydCBEZXNjcmlwdGlvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL3Byb2plY3QtZGV0YWlsL0Rlc2NyaXB0aW9uLnN2ZWx0ZSdcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbjwvc3R5bGU+XG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPkNyZWF0aXZlIFJldm9sdCB8IEZyb250IEVuZCBEZXZlbG9wZXIgLSBKb3NodWEgUm9wZXI8L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cblxuPGRpdiBcbiAgICBpbjpmbHk9XCJ7eyB4OiAtODAsIGR1cmF0aW9uOiA1MDAsIGRlbGF5OiAyMDAsIH19XCJcbj5cbiAgICA8UGFnZVRpdGxlIHRpdGxlPXsnQ3JlYXRpdmUgUmV2b2x0J30gLz5cbjwvZGl2PlxuXG48c2VjdGlvbiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgPCEtLSA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxEZXNjcmlwdGlvbiAvPlxuICAgPC9kaXY+ICAtLT5cbiAgICA8SW1hZ2VHcmlkIC8+XG48L3NlY3Rpb24+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztpQkE0SWEsS0FBSzs7O2lCQUNILEtBQUs7Ozs7Ozs7Ozs7Ozs7O2lDQURQLEtBQUs7Ozs7Ozs7bUNBQ0gsS0FBSzs7Ozs7Ozs7Ozs7O21FQUZhLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkFDNUIsS0FBSztxQkFDSCxLQUFLOzs7K0ZBRmEsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0ExSWxDLE1BQUksS0FBSyxFQUFFLG9CQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dCQ3dFVixNQUFNO3dCQUFTLEdBQUc7Ozs7OzsyQ0FGVCxLQUFLO3VCQUFVLEdBQUc7Ozs7Ozs7Ozs7Ozt5QkFFM0IsTUFBTTs7Ozt5QkFBUyxHQUFHOzs7OzRDQUZULEtBQUs7Ozs7d0JBQVUsR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztDQXRFckMsTUFBSSxNQUFNLEVBQUUsR0FBRyxFQUNYLFdBQVcsRUFDWCxHQUFHLEVBQ0gsaUJBQUssQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkM0RFEsQ0FBQyxZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQ0tULFlBQVk7VUFBVSxtQ0FBbUM7T0FBTyxFQUFFO09BQU8sRUFBRTs7Ozs7OztTQUczRSxZQUFZO1VBQVUsbUNBQW1DO09BQU8sRUFBRTtPQUFPLEVBQUU7Ozs7Ozs7U0FHM0UsWUFBWTtVQUFVLG1DQUFtQztPQUFPLEVBQUU7T0FBTyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkMxRG5GLGlCQUFpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dEQUYxQixFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=