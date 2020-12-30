import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, o as onMount, e as element, c as claim_element, a as children, b as detach_dev, f as attr_dev, g as add_location, h as insert_dev, j as append_dev, n as noop, t as text, k as space, l as claim_text, m as claim_space, p as create_component, q as claim_component, r as mount_component, u as transition_in, w as transition_out, x as destroy_component, T as TextAnimation, C as ContactModal, y as listen_dev, z as run_all, A as query_selector_all } from './client.7d4b32b5.js';
import { P as Projects, D as DiRepairsThumb, H as HalcyonThumb } from './halcyon-5-min.913ecbfb.js';

var HeroImageSmall = "/client/978b378464a87e86.jpg";

/* src/components/home-components/hero/HeroImg.svelte generated by Svelte v3.29.7 */
const file = "src/components/home-components/hero/HeroImg.svelte";

function create_fragment(ctx) {
	let div1;
	let div0;
	let img;
	let img_src_value;
	let img_alt_value;

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			img = element("img");
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			img = claim_element(div0_nodes, "IMG", { src: true, alt: true, class: true });
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			if (img.src !== (img_src_value = HeroImageSmall)) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", img_alt_value = "Joshua Roper - Front End Developer");
			attr_dev(img, "class", "svelte-j5hdv8");
			add_location(img, file, 92, 8, 1841);
			attr_dev(div0, "class", "hero-image svelte-j5hdv8");
			add_location(div0, file, 91, 4, 1807);
			attr_dev(div1, "class", "box svelte-j5hdv8");
			add_location(div1, file, 90, 0, 1785);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);
			append_dev(div0, img);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("HeroImg", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<HeroImg> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ onMount, HeroImage: HeroImageSmall, HeroImageSmall });
	return [];
}

class HeroImg extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "HeroImg",
			options,
			id: create_fragment.name
		});
	}
}

/* src/components/home-components/hero/HeroText.svelte generated by Svelte v3.29.7 */

const file$1 = "src/components/home-components/hero/HeroText.svelte";

function create_fragment$1(ctx) {
	let h1;
	let t0;
	let t1;
	let h2;
	let t2;
	let t3;
	let h3;
	let t4;

	const block = {
		c: function create() {
			h1 = element("h1");
			t0 = text("Front End Developer");
			t1 = space();
			h2 = element("h2");
			t2 = text("React, Svelte, ES6");
			t3 = space();
			h3 = element("h3");
			t4 = text("Joshua Roper");
			this.h();
		},
		l: function claim(nodes) {
			h1 = claim_element(nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			t0 = claim_text(h1_nodes, "Front End Developer");
			h1_nodes.forEach(detach_dev);
			t1 = claim_space(nodes);
			h2 = claim_element(nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t2 = claim_text(h2_nodes, "React, Svelte, ES6");
			h2_nodes.forEach(detach_dev);
			t3 = claim_space(nodes);
			h3 = claim_element(nodes, "H3", { class: true });
			var h3_nodes = children(h3);
			t4 = claim_text(h3_nodes, "Joshua Roper");
			h3_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h1, "class", "svelte-1tsafzc");
			add_location(h1, file$1, 85, 0, 1084);
			attr_dev(h2, "class", "svelte-1tsafzc");
			add_location(h2, file$1, 86, 0, 1113);
			attr_dev(h3, "class", "svelte-1tsafzc");
			add_location(h3, file$1, 87, 0, 1141);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h1, anchor);
			append_dev(h1, t0);
			insert_dev(target, t1, anchor);
			insert_dev(target, h2, anchor);
			append_dev(h2, t2);
			insert_dev(target, t3, anchor);
			insert_dev(target, h3, anchor);
			append_dev(h3, t4);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(h2);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(h3);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("HeroText", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<HeroText> was created with unknown prop '${key}'`);
	});

	return [];
}

class HeroText extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "HeroText",
			options,
			id: create_fragment$1.name
		});
	}
}

/* src/components/home-components/hero/Hero.svelte generated by Svelte v3.29.7 */
const file$2 = "src/components/home-components/hero/Hero.svelte";

function create_fragment$2(ctx) {
	let div2;
	let div0;
	let heroimg;
	let t;
	let div1;
	let herotext;
	let current;
	heroimg = new HeroImg({ $$inline: true });
	herotext = new HeroText({ $$inline: true });

	const block = {
		c: function create() {
			div2 = element("div");
			div0 = element("div");
			create_component(heroimg.$$.fragment);
			t = space();
			div1 = element("div");
			create_component(herotext.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div0 = claim_element(div2_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			claim_component(heroimg.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach_dev);
			t = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			claim_component(herotext.$$.fragment, div1_nodes);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "hero svelte-1gsume6");
			add_location(div0, file$2, 63, 4, 989);
			attr_dev(div1, "class", "text svelte-1gsume6");
			add_location(div1, file$2, 66, 4, 1043);
			attr_dev(div2, "class", "hero-container svelte-1gsume6");
			add_location(div2, file$2, 62, 0, 956);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div0);
			mount_component(heroimg, div0, null);
			append_dev(div2, t);
			append_dev(div2, div1);
			mount_component(herotext, div1, null);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(heroimg.$$.fragment, local);
			transition_in(herotext.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(heroimg.$$.fragment, local);
			transition_out(herotext.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			destroy_component(heroimg);
			destroy_component(herotext);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Hero", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Hero> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ onMount, HeroImg, HeroText });
	return [];
}

class Hero extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Hero",
			options,
			id: create_fragment$2.name
		});
	}
}

var DeskPhoto = "/client/b6c8f2910438b7ea.jpg";

/* src/components/home-components/text-with-image-cta/TextWithImageCta.svelte generated by Svelte v3.29.7 */
const file$3 = "src/components/home-components/text-with-image-cta/TextWithImageCta.svelte";

function create_fragment$3(ctx) {
	let section;
	let a0;
	let img;
	let img_src_value;
	let t0;
	let div;
	let h2;
	let t1;
	let t2;
	let h3;
	let t3;
	let t4;
	let p;
	let t5;
	let t6;
	let a1;
	let textanimation;
	let t7;
	let contactmodal;
	let current;
	let mounted;
	let dispose;

	textanimation = new TextAnimation({
			props: { text: `Get In Touch` },
			$$inline: true
		});

	contactmodal = new ContactModal({
			props: { showModal: /*showModal*/ ctx[0] },
			$$inline: true
		});

	contactmodal.$on("click", /*click_handler*/ ctx[2]);

	const block = {
		c: function create() {
			section = element("section");
			a0 = element("a");
			img = element("img");
			t0 = space();
			div = element("div");
			h2 = element("h2");
			t1 = text("Let's Create Something Awesome Together.");
			t2 = space();
			h3 = element("h3");
			t3 = text("Front End Developer | Desk Enthusiast");
			t4 = space();
			p = element("p");
			t5 = text("I have a real passion for development, and innovation. I love seeing projects come to life as I leverage my knowledge of design patterns to render aesthetically pleasing, and extremely viable digital experiences. I'm driven by seeing solutions come together across development & design processes.");
			t6 = space();
			a1 = element("a");
			create_component(textanimation.$$.fragment);
			t7 = space();
			create_component(contactmodal.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			section = claim_element(nodes, "SECTION", { class: true });
			var section_nodes = children(section);
			a0 = claim_element(section_nodes, "A", { href: true, class: true });
			var a0_nodes = children(a0);
			img = claim_element(a0_nodes, "IMG", { src: true, alt: true, class: true });
			a0_nodes.forEach(detach_dev);
			t0 = claim_space(section_nodes);
			div = claim_element(section_nodes, "DIV", { class: true });
			var div_nodes = children(div);
			h2 = claim_element(div_nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t1 = claim_text(h2_nodes, "Let's Create Something Awesome Together.");
			h2_nodes.forEach(detach_dev);
			t2 = claim_space(div_nodes);
			h3 = claim_element(div_nodes, "H3", { class: true });
			var h3_nodes = children(h3);
			t3 = claim_text(h3_nodes, "Front End Developer | Desk Enthusiast");
			h3_nodes.forEach(detach_dev);
			t4 = claim_space(div_nodes);
			p = claim_element(div_nodes, "P", { class: true });
			var p_nodes = children(p);
			t5 = claim_text(p_nodes, "I have a real passion for development, and innovation. I love seeing projects come to life as I leverage my knowledge of design patterns to render aesthetically pleasing, and extremely viable digital experiences. I'm driven by seeing solutions come together across development & design processes.");
			p_nodes.forEach(detach_dev);
			t6 = claim_space(div_nodes);
			a1 = claim_element(div_nodes, "A", { class: true, href: true });
			var a1_nodes = children(a1);
			claim_component(textanimation.$$.fragment, a1_nodes);
			a1_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			section_nodes.forEach(detach_dev);
			t7 = claim_space(nodes);
			claim_component(contactmodal.$$.fragment, nodes);
			this.h();
		},
		h: function hydrate() {
			if (img.src !== (img_src_value = DeskPhoto)) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "A programming desk setup");
			attr_dev(img, "class", "svelte-xci0un");
			add_location(img, file$3, 184, 8, 3394);
			attr_dev(a0, "href", "javascript:void(0)");
			attr_dev(a0, "class", "image-container svelte-xci0un");
			add_location(a0, file$3, 183, 4, 3311);
			attr_dev(h2, "class", "heading svelte-xci0un");
			add_location(h2, file$3, 187, 8, 3497);
			attr_dev(h3, "class", "subheading svelte-xci0un");
			add_location(h3, file$3, 188, 8, 3571);
			attr_dev(p, "class", "svelte-xci0un");
			add_location(p, file$3, 189, 8, 3645);
			attr_dev(a1, "class", "button svelte-xci0un");
			attr_dev(a1, "href", "javascript:void(0)");
			add_location(a1, file$3, 193, 8, 3980);
			attr_dev(div, "class", "text-content svelte-xci0un");
			add_location(div, file$3, 186, 4, 3462);
			attr_dev(section, "class", "text-with-image-cta svelte-xci0un");
			add_location(section, file$3, 182, 0, 3269);
		},
		m: function mount(target, anchor) {
			insert_dev(target, section, anchor);
			append_dev(section, a0);
			append_dev(a0, img);
			append_dev(section, t0);
			append_dev(section, div);
			append_dev(div, h2);
			append_dev(h2, t1);
			append_dev(div, t2);
			append_dev(div, h3);
			append_dev(h3, t3);
			append_dev(div, t4);
			append_dev(div, p);
			append_dev(p, t5);
			append_dev(div, t6);
			append_dev(div, a1);
			mount_component(textanimation, a1, null);
			insert_dev(target, t7, anchor);
			mount_component(contactmodal, target, anchor);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(a0, "click", /*openModal*/ ctx[1], false, false, false),
					listen_dev(a1, "click", /*openModal*/ ctx[1], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			const contactmodal_changes = {};
			if (dirty & /*showModal*/ 1) contactmodal_changes.showModal = /*showModal*/ ctx[0];
			contactmodal.$set(contactmodal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(textanimation.$$.fragment, local);
			transition_in(contactmodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(textanimation.$$.fragment, local);
			transition_out(contactmodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(section);
			destroy_component(textanimation);
			if (detaching) detach_dev(t7);
			destroy_component(contactmodal, detaching);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("TextWithImageCta", slots, []);
	let showModal;

	function openModal() {
		$$invalidate(0, showModal = true);
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TextWithImageCta> was created with unknown prop '${key}'`);
	});

	const click_handler = () => $$invalidate(0, showModal = false);

	$$self.$capture_state = () => ({
		TextAnimation,
		ContactModal,
		DeskPhoto,
		showModal,
		openModal
	});

	$$self.$inject_state = $$props => {
		if ("showModal" in $$props) $$invalidate(0, showModal = $$props.showModal);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [showModal, openModal, click_handler];
}

class TextWithImageCta extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TextWithImageCta",
			options,
			id: create_fragment$3.name
		});
	}
}

/* src/routes/index.svelte generated by Svelte v3.29.7 */
const file$4 = "src/routes/index.svelte";

function create_fragment$4(ctx) {
	let t0;
	let div;
	let hero;
	let t1;
	let textwithimagecta;
	let t2;
	let projects;
	let current;
	hero = new Hero({ $$inline: true });
	textwithimagecta = new TextWithImageCta({ $$inline: true });

	projects = new Projects({
			props: {
				portfolioCards: /*portfolioCards*/ ctx[0],
				title: "Selected Works"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			t0 = space();
			div = element("div");
			create_component(hero.$$.fragment);
			t1 = space();
			create_component(textwithimagecta.$$.fragment);
			t2 = space();
			create_component(projects.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1lmiyik\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(hero.$$.fragment, div_nodes);
			t1 = claim_space(div_nodes);
			claim_component(textwithimagecta.$$.fragment, div_nodes);
			t2 = claim_space(div_nodes);
			claim_component(projects.$$.fragment, div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document.title = "Home | Front End Developer - Joshua Roper";
			attr_dev(div, "class", "container svelte-1czpg9n");
			add_location(div, file$4, 40, 0, 2203);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, div, anchor);
			mount_component(hero, div, null);
			append_dev(div, t1);
			mount_component(textwithimagecta, div, null);
			append_dev(div, t2);
			mount_component(projects, div, null);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(hero.$$.fragment, local);
			transition_in(textwithimagecta.$$.fragment, local);
			transition_in(projects.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(hero.$$.fragment, local);
			transition_out(textwithimagecta.$$.fragment, local);
			transition_out(projects.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div);
			destroy_component(hero);
			destroy_component(textwithimagecta);
			destroy_component(projects);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Routes", slots, []);

	let portfolioCards = [
		{
			url: "/projects/halcyon",
			imgSrc: HalcyonThumb,
			alt: "Thumbnail for the Halcyon mall website rebuild",
			projectName: "Halcyon",
			projectYear: "2019",
			projectText: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`
		},
		{
			url: "/projects/di-repairs",
			imgSrc: DiRepairsThumb,
			alt: "Thumbnail for the DI repairs freelance website project",
			projectName: "DI Repairs",
			projectYear: "2020",
			projectText: `As the <strong>only developer & designer</strong> on this freelance project. I completely re-envisioned the site design & built the project from the ground up as an extremely performant <strong>SSG website</strong>. I utilized development & design best practices with a focus on the <strong>user experience.</strong>`
		}
	];

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Routes> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		Hero,
		Projects,
		TextWithImageCta,
		DiRepairsThumb,
		HalcyonThumb,
		portfolioCards
	});

	$$self.$inject_state = $$props => {
		if ("portfolioCards" in $$props) $$invalidate(0, portfolioCards = $$props.portfolioCards);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [portfolioCards];
}

class Routes extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Routes",
			options,
			id: create_fragment$4.name
		});
	}
}

export default Routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguNDY4NDU0YTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbWFnZXMvYWJvdXQtbWUtZGVza3RvcC1pbWcuanBnIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvaG9tZS1jb21wb25lbnRzL2hlcm8vSGVyb0ltZy5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvaW1hZ2VzL2Rlc2stcGhvdG8uanBnIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvaG9tZS1jb21wb25lbnRzL3RleHQtd2l0aC1pbWFnZS1jdGEvVGV4dFdpdGhJbWFnZUN0YS5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvcm91dGVzL2luZGV4LnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcIi9jbGllbnQvOTc4YjM3ODQ2NGE4N2U4Ni5qcGdcIiIsIjxzY3JpcHQ+XG5pbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJztcblxuLy8gaW1wb3J0IEhlcm9JbWFnZSBmcm9tICcuLi8uLi8uLi9pbWFnZXMvcHJvZmVzc2lvbmFsLWhlcm8tbWluLmpwZyc7XG4vLyBpbXBvcnQgSGVyb0ltYWdlU21hbGwgZnJvbSAnLi4vLi4vLi4vaW1hZ2VzL3Byb2Zlc3Npb25hbC1oZXJvLW1pbi1zbWFsbC5qcGcnO1xuXG5pbXBvcnQgSGVyb0ltYWdlIGZyb20gJy4uLy4uLy4uL2ltYWdlcy9hYm91dC1tZS1kZXNrdG9wLWltZy5qcGcnO1xuaW1wb3J0IEhlcm9JbWFnZVNtYWxsIGZyb20gJy4uLy4uLy4uL2ltYWdlcy9hYm91dC1tZS1kZXNrdG9wLWltZy5qcGcnO1xuXG4vLyBhYm91dC1tZS1kZXNrdG9wLWltZy5qcGdcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cbiAgICBAaW1wb3J0ICcuLi8uLi8uLi9zdHlsZXMvZ2xvYmFsLnZhcmlhYmxlcy5zY3NzJztcblxuICAgIC5oZXJvLWltYWdle1xuICAgICAgICB3aWR0aDogMjUwcHg7XG4gICAgICAgIGhlaWdodDogNDIwcHg7XG4gICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgICBib3gtc2hhZG93OiAzcHggM3B4IDNweCBjb2xvcihib3hTaGFkb3cpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHotaW5kZXg6IDI7XG4gICAgICAgIHRyYW5zaXRpb246IHRvcCAuMDFzIGVhc2UtaW47XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQoc20pKSB7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IC03MHB4O1xuICAgICAgICAgICAgd2lkdGg6IDIyMHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAzMjBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KG1kKSkge1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAtOTBweDtcbiAgICAgICAgICAgIHdpZHRoOiAzMjBweDtcbiAgICAgICAgICAgIGhlaWdodDogNTIwcHg7XG4gICAgICAgIH1cblxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChsZykpIHtcbiAgICAgICAgICAgIHdpZHRoOiA0MjBweDtcbiAgICAgICAgICAgIGhlaWdodDogNjIwcHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbWcge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICAgICAgb2JqZWN0LXBvc2l0aW9uOiA0NSUgMjUlO1xuXG4gICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KHNtKSkge1xuICAgICAgICAgICAgb2JqZWN0LXBvc2l0aW9uOiA0NSUgMTAlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQoc20pKSB7XG4gICAgICAgIC5ib3gge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICB6LWluZGV4OiAtMTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgICAgICAgIHdpZHRoOiAyMzdweDtcbiAgICAgICAgICAgIC8vIGJvcmRlcjogM3B4IHNvbGlkIGJsYWNrO1xuICAgICAgICAgICAgYm9yZGVyOiAzcHggc29saWQgY29sb3IoYWNjZW50KTtcbiAgICAgICAgICAgIC8vIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgIGhlaWdodDogNDExcHg7XG4gICAgICAgICAgICAvLyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGNvbG9yKGJveEJhY2tncm91bmQpO1xuXG4gICAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChtZCkpIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMzU1cHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MTZweDsgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KGxnKSkge1xuICAgICAgICAgICAgICAgIHdpZHRoOiA0OTdweDtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDg2Mi40cHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbjwvc3R5bGU+XG5cbjxkaXYgY2xhc3M9XCJib3hcIj5cbiAgICA8ZGl2IGNsYXNzPVwiaGVyby1pbWFnZVwiID5cbiAgICAgICAgPGltZyBzcmM9e0hlcm9JbWFnZX0gYWx0PXsnSm9zaHVhIFJvcGVyIC0gRnJvbnQgRW5kIERldmVsb3Blcid9PlxuICAgIDwvZGl2PlxuPC9kaXY+IiwiZXhwb3J0IGRlZmF1bHQgXCIvY2xpZW50L2I2YzhmMjkxMDQzOGI3ZWEuanBnXCIiLCI8c2NyaXB0PlxuaW1wb3J0IFRleHRBbmltYXRpb24gZnJvbSAnLi4vLi4vY29tbW9uLWNvbXBvbmVudHMvVGV4dEFuaW1hdGlvbi5zdmVsdGUnO1xuaW1wb3J0IENvbnRhY3RNb2RhbCBmcm9tICcuLi8uLi9jb21tb24tY29tcG9uZW50cy9tb2RhbHMvQ29udGFjdE1vZGFsLnN2ZWx0ZSc7XG5cbmltcG9ydCBEZXNrUGhvdG8gZnJvbSAnLi4vLi4vLi4vaW1hZ2VzL2Rlc2stcGhvdG8uanBnJztcblxuICAgIGxldCBzaG93TW9kYWw7XG5cbiAgICBmdW5jdGlvbiBvcGVuTW9kYWwoKXtcbiAgICAgICAgc2hvd01vZGFsID0gdHJ1ZTtcbiAgICB9XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XG4gICAgQGltcG9ydCAnLi4vLi4vLi4vc3R5bGVzL2dsb2JhbC52YXJpYWJsZXMuc2Nzcyc7XG5cbiAgICBzZWN0aW9uIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbi1yZXZlcnNlO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luOiAxMCUgYXV0byAxMCUgYXV0bztcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB6LWluZGV4OiAwO1xuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQoc20pKSB7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIG1hcmdpbjogMTIuNSUgYXV0byAxMi41JSBhdXRvO1xuICAgICAgICB9XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobGcpKSB7XG4gICAgICAgICAgICB3aWR0aDogODAlO1xuICAgICAgICAgICAgLy8gbWFyZ2luOiAxNSUgYXV0byAxNSUgYXV0bztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5pbWFnZS1jb250YWluZXIsIC50ZXh0LWNvbnRlbnQge1xuICAgICAgICB3aWR0aDogMTAwJTtcblxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChzbSkpIHtcbiAgICAgICAgICAgIHdpZHRoOiBjYWxjKDUwJSArIDI1cHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobWQpKSB7XG4gICAgICAgICAgICB3aWR0aDogY2FsYyg1MCUgKyA0MHB4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KGxnKSkge1xuICAgICAgICAgICAgd2lkdGg6IDUwJTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5pbWFnZS1jb250YWluZXIge1xuICAgICAgICBcbiAgICAgICAgYm94LXNoYWRvdzogM3B4IDNweCAzcHggY29sb3IoYm94U2hhZG93KTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDBweCk7XG4gICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgLjNzIGVhc2UsIHRyYW5zZm9ybSAuM3MgZWFzZTtcbiAgICAgICAgaGVpZ2h0OiAyMDBweDtcbiAgICAgICAgd2lkdGg6IDI1MHB4O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgLy8gd2lkdGg6IDgwMHB4O1xuICAgICAgICAvLyBtYXJnaW4tYm90dG9tOiAxMDBweDtcblxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChzbSkpIHtcbiAgICAgICAgICAgIHdpZHRoOiA0MCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDI3NXB4O1xuICAgICAgICB9XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobWQpKSB7XG4gICAgICAgICAgICBoZWlnaHQ6IDQwMHB4O1xuICAgICAgICB9XG4gICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC00cHgpO1xuICAgICAgICAgICAgYm94LXNoYWRvdzogNXB4IDVweCA1cHggY29sb3IoYm94U2hhZG93KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGltZyB7XG4gICAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgIH1cblxuICAgIC50ZXh0LWNvbnRlbnQge1xuICAgICAgICBcbiAgICAgICAgLy8gcGFkZGluZzogMjVyZW0gMzByZW07XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAxNXJlbTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgei1pbmRleDogLTE7XG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgICAgLy8gYm9yZGVyOiAxcHggc29saWQgIzc5Nzc3NztcblxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChzbSkpIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDI1cmVtIDMwcmVtO1xuICAgICAgICAgICAgYm94LXNoYWRvdzogM3B4IDNweCAzcHggM3B4IGNvbG9yKGJveFNoYWRvdyk7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBjb2xvcihsaWdodEJhY2tncm91bmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobWQpKSB7XG4gICAgICAgICAgICBwYWRkaW5nOiAzNXJlbSA0MHJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KGxnKSkge1xuICAgICAgICAgICAgcGFkZGluZzogNDVyZW0gNDByZW07XG4gICAgICAgICAgICB3aWR0aDogNTMwcHg7XG4gICAgICAgICAgICByaWdodDogLTQwcHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAuaGVhZGluZyB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTNyZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgIG1heC13aWR0aDogMjUwcHg7XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobWQpKSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDIzcmVtO1xuICAgICAgICAgICAgbWF4LXdpZHRoOiA0MDBweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5zdWJoZWFkaW5nIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZm9udC1zaXplOiAxMnJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgICBtYXJnaW4tdG9wOiAxMHJlbTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTByZW07XG4gICAgICAgIGNvbG9yOiBjb2xvcihib2R5VGV4dCk7XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobWQpKSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDE2cmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgJjo6YmVmb3JlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICB3aWR0aDogMjBweDtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMTByZW07XG4gICAgICAgICAgICBoZWlnaHQ6IDJweDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGNvbG9yKGJvZHlUZXh0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHAge1xuICAgICAgICB0ZXh0LWluZGVudDogMTBweDtcbiAgICB9XG5cbiAgICAuYnV0dG9uIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgZm9udC1zaXplOiAxMnJlbTtcbiAgICAgICAgd2lkdGg6IGZpdC1jb250ZW50O1xuICAgICAgICBtYXJnaW4tdG9wOiAxMHJlbTtcbiAgICAgICAgY29sb3I6IGNvbG9yKGV4dHJhTGlnaHRUZXh0KTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuXG4gICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KG1kKSkge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNHJlbTtcbiAgICAgICAgfVxuICAgIH1cbjwvc3R5bGU+XG5cbjxzZWN0aW9uIGNsYXNzPVwidGV4dC13aXRoLWltYWdlLWN0YVwiPlxuICAgIDxhIG9uOmNsaWNrPXtvcGVuTW9kYWx9IGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cImltYWdlLWNvbnRhaW5lclwiPlxuICAgICAgICA8aW1nIHNyYz1cIntEZXNrUGhvdG99XCIgYWx0PVwiQSBwcm9ncmFtbWluZyBkZXNrIHNldHVwXCI+XG4gICAgPC9hPlxuICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNvbnRlbnRcIj5cbiAgICAgICAgPGgyIGNsYXNzPVwiaGVhZGluZ1wiPkxldCdzIENyZWF0ZSBTb21ldGhpbmcgQXdlc29tZSBUb2dldGhlci48L2gyPlxuICAgICAgICA8aDMgY2xhc3M9XCJzdWJoZWFkaW5nXCI+RnJvbnQgRW5kIERldmVsb3BlciB8IERlc2sgRW50aHVzaWFzdDwvaDM+XG4gICAgICAgIDxwPlxuICAgICAgICAgICAgSSBoYXZlIGEgcmVhbCBwYXNzaW9uIGZvciBkZXZlbG9wbWVudCwgYW5kIGlubm92YXRpb24uIEkgbG92ZSBzZWVpbmcgcHJvamVjdHMgY29tZSB0byBsaWZlIGFzIEkgbGV2ZXJhZ2UgbXkga25vd2xlZGdlIG9mIGRlc2lnbiBwYXR0ZXJucyB0byByZW5kZXIgYWVzdGhldGljYWxseSBwbGVhc2luZywgYW5kIGV4dHJlbWVseSB2aWFibGUgZGlnaXRhbCBleHBlcmllbmNlcy4gSSdtIGRyaXZlbiBieSBzZWVpbmcgc29sdXRpb25zIGNvbWUgdG9nZXRoZXIgYWNyb3NzIGRldmVsb3BtZW50ICYgZGVzaWduIHByb2Nlc3Nlcy5cbiAgICAgICAgPC9wPlxuXG4gICAgICAgIDxhIGNsYXNzPVwiYnV0dG9uXCIgb246Y2xpY2s9e29wZW5Nb2RhbH0gaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPlxuICAgICAgICAgICAgPFRleHRBbmltYXRpb24gdGV4dD17YEdldCBJbiBUb3VjaGB9IC8+XG4gICAgICAgIDwvYT5cbiAgICA8L2Rpdj5cbjwvc2VjdGlvbj5cblxuPENvbnRhY3RNb2RhbCBvbjpjbGljaz17KCkgPT4gc2hvd01vZGFsID0gZmFsc2V9IHNob3dNb2RhbD17c2hvd01vZGFsfS8+IiwiPHNjcmlwdD5cbiAgICBpbXBvcnQgSGVybyBmcm9tICcuLi9jb21wb25lbnRzL2hvbWUtY29tcG9uZW50cy9oZXJvL0hlcm8uc3ZlbHRlJztcbiAgICBpbXBvcnQgUHJvamVjdHMgZnJvbSAnLi4vY29tcG9uZW50cy9ob21lLWNvbXBvbmVudHMvcHJvamVjdHMvUHJvamVjdHMuc3ZlbHRlJztcbiAgICBpbXBvcnQgVGV4dFdpdGhJbWFnZUN0YSBmcm9tICcuLi9jb21wb25lbnRzL2hvbWUtY29tcG9uZW50cy90ZXh0LXdpdGgtaW1hZ2UtY3RhL1RleHRXaXRoSW1hZ2VDdGEuc3ZlbHRlJztcblxuICAgIGltcG9ydCBEaVJlcGFpcnNUaHVtYiBmcm9tICcuLi9pbWFnZXMvdGh1bWJuYWlscy9kaS10aHVtYi5qcGcnO1xuICAgIGltcG9ydCBIYWxjeW9uVGh1bWIgZnJvbSAnLi4vaW1hZ2VzL3RodW1ibmFpbHMvaGFsY3lvbi01LW1pbi5qcGcnO1xuXG4gICAgbGV0IHBvcnRmb2xpb0NhcmRzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB1cmw6ICcvcHJvamVjdHMvaGFsY3lvbicsXG4gICAgICAgICAgICBpbWdTcmM6IEhhbGN5b25UaHVtYixcbiAgICAgICAgICAgIGFsdDogJ1RodW1ibmFpbCBmb3IgdGhlIEhhbGN5b24gbWFsbCB3ZWJzaXRlIHJlYnVpbGQnLFxuICAgICAgICAgICAgcHJvamVjdE5hbWU6ICdIYWxjeW9uJyxcbiAgICAgICAgICAgIHByb2plY3RZZWFyOiAnMjAxOScsXG4gICAgICAgICAgICBwcm9qZWN0VGV4dDogYEkgd2FzIG9uZSBvZiB0aGUgRnJvbnQgRW5kIERldmVsb3BlcnMgb24gdGhlIHByb2plY3QgcHJpbWFyaWx5IHRhc2tlZCB3aXRoIGNyZWF0aW5nIHRoZSBtb3ZpZXMgcGFnZSBhbmQgZXZlbnRzIGRpcmVjdG9yeS4gQWNyb3NzIHRoZSBwcm9qZWN0IEkgd29ya2VkIHdpdGggPHN0cm9uZz5tdWx0aXBsZSBBUEnigJlzPC9zdHJvbmc+LCA8c3Ryb25nPlJlYWN0IFN0YXRpYzwvc3Ryb25nPiwgYW5kIGRldmVsb3BlZCA8c3Ryb25nPmNsZWFuIGNvZGU8L3N0cm9uZz4gZm9yIG90aGVyIGFkdmFuY2VkIFJlYWN0IGNvbXBvbmVudHMuYFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB1cmw6ICcvcHJvamVjdHMvZGktcmVwYWlycycsXG4gICAgICAgICAgICBpbWdTcmM6IERpUmVwYWlyc1RodW1iLFxuICAgICAgICAgICAgYWx0OiAnVGh1bWJuYWlsIGZvciB0aGUgREkgcmVwYWlycyBmcmVlbGFuY2Ugd2Vic2l0ZSBwcm9qZWN0JyxcbiAgICAgICAgICAgIHByb2plY3ROYW1lOiAnREkgUmVwYWlycycsXG4gICAgICAgICAgICBwcm9qZWN0WWVhcjogJzIwMjAnLFxuICAgICAgICAgICAgcHJvamVjdFRleHQ6IGBBcyB0aGUgPHN0cm9uZz5vbmx5IGRldmVsb3BlciAmIGRlc2lnbmVyPC9zdHJvbmc+IG9uIHRoaXMgZnJlZWxhbmNlIHByb2plY3QuIEkgY29tcGxldGVseSByZS1lbnZpc2lvbmVkIHRoZSBzaXRlIGRlc2lnbiAmIGJ1aWx0IHRoZSBwcm9qZWN0IGZyb20gdGhlIGdyb3VuZCB1cCBhcyBhbiBleHRyZW1lbHkgcGVyZm9ybWFudCA8c3Ryb25nPlNTRyB3ZWJzaXRlPC9zdHJvbmc+LiBJIHV0aWxpemVkIGRldmVsb3BtZW50ICYgZGVzaWduIGJlc3QgcHJhY3RpY2VzIHdpdGggYSBmb2N1cyBvbiB0aGUgPHN0cm9uZz51c2VyIGV4cGVyaWVuY2UuPC9zdHJvbmc+YCxcbiAgICAgICAgfSwgICAgICAgIFxuICAgIF1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbiAgICAuY29udGFpbmVyIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBtYXJnaW4tdG9wOiA5MHB4O1xuICAgIH1cblxuPC9zdHlsZT5cblxuPHN2ZWx0ZTpoZWFkPlxuXHQ8dGl0bGU+SG9tZSB8IEZyb250IEVuZCBEZXZlbG9wZXIgLSBKb3NodWEgUm9wZXI8L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cblxuPGRpdiBcbiAgICBjbGFzcz1cImNvbnRhaW5lclwiXG4+XG4gICAgPEhlcm8gLz5cbiAgICA8VGV4dFdpdGhJbWFnZUN0YSAvPlxuICAgIDxQcm9qZWN0cyBwb3J0Zm9saW9DYXJkcz17cG9ydGZvbGlvQ2FyZHN9IHRpdGxlPXsnU2VsZWN0ZWQgV29ya3MnfSAvPlxuPC9kaXY+Il0sIm5hbWVzIjpbIkhlcm9JbWFnZSJdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUJBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQ0M0RkdBLGNBQVM7d0NBQU8sb0NBQW9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RnRFLGdCQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQ0N1TTZDLEdBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBZmxELFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJDQURYLEdBQVM7MkNBVVUsR0FBUzs7Ozs7Ozs7K0VBTWUsR0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FqTTdELFNBQVM7O1VBRUosU0FBUztrQkFDZCxTQUFTLEdBQUcsSUFBSTs7Ozs7Ozs7OzZDQThMTSxTQUFTLEdBQUcsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0MxSmpCLEdBQWM7V0FBUyxnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBckM3RCxjQUFjOztHQUVWLEdBQUcsRUFBRSxtQkFBbUI7R0FDeEIsTUFBTSxFQUFFLFlBQVk7R0FDcEIsR0FBRyxFQUFFLGdEQUFnRDtHQUNyRCxXQUFXLEVBQUUsU0FBUztHQUN0QixXQUFXLEVBQUUsTUFBTTtHQUNuQixXQUFXOzs7R0FHWCxHQUFHLEVBQUUsc0JBQXNCO0dBQzNCLE1BQU0sRUFBRSxjQUFjO0dBQ3RCLEdBQUcsRUFBRSx3REFBd0Q7R0FDN0QsV0FBVyxFQUFFLFlBQVk7R0FDekIsV0FBVyxFQUFFLE1BQU07R0FDbkIsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
