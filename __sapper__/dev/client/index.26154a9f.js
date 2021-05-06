import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, o as onMount, e as element, c as claim_element, a as children, b as detach_dev, f as attr_dev, g as add_location, h as insert_dev, j as append_dev, n as noop, t as text, k as space, l as claim_text, m as claim_space, p as create_component, q as claim_component, r as mount_component, u as transition_in, w as transition_out, x as destroy_component, T as TextAnimation, C as ContactModal, y as listen_dev, z as run_all, A as query_selector_all } from './client.20fbd6e2.js';
import { P as Projects, D as DiRepairsThumb, H as HalcyonThumb } from './halcyon-5-min.63af67be.js';

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
			attr_dev(img, "class", "svelte-17v7xva");
			add_location(img, file, 91, 8, 1820);
			attr_dev(div0, "class", "hero-image svelte-17v7xva");
			add_location(div0, file, 90, 4, 1786);
			attr_dev(div1, "class", "box svelte-17v7xva");
			add_location(div1, file, 89, 0, 1764);
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
			attr_dev(h1, "class", "svelte-5i77kw");
			add_location(h1, file$1, 85, 0, 1092);
			attr_dev(h2, "class", "svelte-5i77kw");
			add_location(h2, file$1, 86, 0, 1121);
			attr_dev(h3, "class", "svelte-5i77kw");
			add_location(h3, file$1, 87, 0, 1149);
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
			attr_dev(img, "class", "svelte-1l6ucc5");
			add_location(img, file$3, 184, 8, 3396);
			attr_dev(a0, "href", "javascript:void(0)");
			attr_dev(a0, "class", "image-container svelte-1l6ucc5");
			add_location(a0, file$3, 183, 4, 3313);
			attr_dev(h2, "class", "heading svelte-1l6ucc5");
			add_location(h2, file$3, 187, 8, 3499);
			attr_dev(h3, "class", "subheading svelte-1l6ucc5");
			add_location(h3, file$3, 188, 8, 3573);
			attr_dev(p, "class", "svelte-1l6ucc5");
			add_location(p, file$3, 189, 8, 3647);
			attr_dev(a1, "class", "button svelte-1l6ucc5");
			attr_dev(a1, "href", "javascript:void(0)");
			add_location(a1, file$3, 193, 8, 3982);
			attr_dev(div, "class", "text-content svelte-1l6ucc5");
			add_location(div, file$3, 186, 4, 3464);
			attr_dev(section, "class", "text-with-image-cta svelte-1l6ucc5");
			add_location(section, file$3, 182, 0, 3271);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguMjYxNTRhOWYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbWFnZXMvYWJvdXQtbWUtZGVza3RvcC1pbWcuanBnIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvaG9tZS1jb21wb25lbnRzL2hlcm8vSGVyb0ltZy5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvaW1hZ2VzL2Rlc2stcGhvdG8uanBnIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvaG9tZS1jb21wb25lbnRzL3RleHQtd2l0aC1pbWFnZS1jdGEvVGV4dFdpdGhJbWFnZUN0YS5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvcm91dGVzL2luZGV4LnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcIi9jbGllbnQvOTc4YjM3ODQ2NGE4N2U4Ni5qcGdcIiIsIjxzY3JpcHQ+XG5pbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJztcblxuLy8gaW1wb3J0IEhlcm9JbWFnZSBmcm9tICcuLi8uLi8uLi9pbWFnZXMvcHJvZmVzc2lvbmFsLWhlcm8tbWluLmpwZyc7XG4vLyBpbXBvcnQgSGVyb0ltYWdlU21hbGwgZnJvbSAnLi4vLi4vLi4vaW1hZ2VzL3Byb2Zlc3Npb25hbC1oZXJvLW1pbi1zbWFsbC5qcGcnO1xuXG5pbXBvcnQgSGVyb0ltYWdlIGZyb20gJy4uLy4uLy4uL2ltYWdlcy9hYm91dC1tZS1kZXNrdG9wLWltZy5qcGcnO1xuaW1wb3J0IEhlcm9JbWFnZVNtYWxsIGZyb20gJy4uLy4uLy4uL2ltYWdlcy9hYm91dC1tZS1kZXNrdG9wLWltZy5qcGcnO1xuXG4vLyBhYm91dC1tZS1kZXNrdG9wLWltZy5qcGdcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cbiAgICBAaW1wb3J0ICcuLi8uLi8uLi9zdHlsZXMvZ2xvYmFsLnZhcmlhYmxlcy5zY3NzJztcblxuICAgIC5oZXJvLWltYWdle1xuICAgICAgICB3aWR0aDogMjUwcHg7XG4gICAgICAgIGhlaWdodDogNDIwcHg7XG4gICAgICAgIC8vIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgICBib3gtc2hhZG93OiAzcHggM3B4IDNweCBjb2xvcihib3hTaGFkb3cpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHotaW5kZXg6IDI7XG4gICAgICAgIHRyYW5zaXRpb246IHRvcCAuMDFzIGVhc2UtaW47XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQoc20pKSB7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IC03MHB4O1xuICAgICAgICAgICAgd2lkdGg6IDIyMHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAzMjBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KG1kKSkge1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAtOTBweDtcbiAgICAgICAgICAgIHdpZHRoOiAzMjBweDtcbiAgICAgICAgICAgIGhlaWdodDogNTIwcHg7XG4gICAgICAgIH1cblxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChsZykpIHtcbiAgICAgICAgICAgIHdpZHRoOiA0MjBweDtcbiAgICAgICAgICAgIGhlaWdodDogNjIwcHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbWcge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICAgICAgb2JqZWN0LXBvc2l0aW9uOiA0NSUgMjUlO1xuXG4gICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KHNtKSkge1xuICAgICAgICAgICAgb2JqZWN0LXBvc2l0aW9uOiA0NSUgMTAlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQoc20pKSB7XG4gICAgICAgIC5ib3gge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICB6LWluZGV4OiAtMTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgICAgICAgIHdpZHRoOiAyMzdweDtcbiAgICAgICAgICAgIC8vIGJvcmRlcjogM3B4IHNvbGlkIGJsYWNrO1xuICAgICAgICAgICAgYm9yZGVyOiAzcHggc29saWQgY29sb3IoYWNjZW50KTtcbiAgICAgICAgICAgIC8vIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgIGhlaWdodDogNDExcHg7XG4gICAgICAgICAgICAvLyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGNvbG9yKGJveEJhY2tncm91bmQpO1xuXG4gICAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChtZCkpIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMzU1cHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MTZweDsgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KGxnKSkge1xuICAgICAgICAgICAgICAgIHdpZHRoOiA0OTdweDtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDg2Mi40cHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbjwvc3R5bGU+XG5cbjxkaXYgY2xhc3M9XCJib3hcIj5cbiAgICA8ZGl2IGNsYXNzPVwiaGVyby1pbWFnZVwiID5cbiAgICAgICAgPGltZyBzcmM9e0hlcm9JbWFnZX0gYWx0PXsnSm9zaHVhIFJvcGVyIC0gRnJvbnQgRW5kIERldmVsb3Blcid9PlxuICAgIDwvZGl2PlxuPC9kaXY+IiwiZXhwb3J0IGRlZmF1bHQgXCIvY2xpZW50L2I2YzhmMjkxMDQzOGI3ZWEuanBnXCIiLCI8c2NyaXB0PlxuaW1wb3J0IFRleHRBbmltYXRpb24gZnJvbSAnLi4vLi4vY29tbW9uLWNvbXBvbmVudHMvVGV4dEFuaW1hdGlvbi5zdmVsdGUnO1xuaW1wb3J0IENvbnRhY3RNb2RhbCBmcm9tICcuLi8uLi9jb21tb24tY29tcG9uZW50cy9tb2RhbHMvQ29udGFjdE1vZGFsLnN2ZWx0ZSc7XG5cbmltcG9ydCBEZXNrUGhvdG8gZnJvbSAnLi4vLi4vLi4vaW1hZ2VzL2Rlc2stcGhvdG8uanBnJztcblxuICAgIGxldCBzaG93TW9kYWw7XG5cbiAgICBmdW5jdGlvbiBvcGVuTW9kYWwoKXtcbiAgICAgICAgc2hvd01vZGFsID0gdHJ1ZTtcbiAgICB9XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XG4gICAgQGltcG9ydCAnLi4vLi4vLi4vc3R5bGVzL2dsb2JhbC52YXJpYWJsZXMuc2Nzcyc7XG5cbiAgICBzZWN0aW9uIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbi1yZXZlcnNlO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luOiAxMCUgYXV0byAxMCUgYXV0bztcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB6LWluZGV4OiAwO1xuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQoc20pKSB7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIG1hcmdpbjogMTIuNSUgYXV0byAxMi41JSBhdXRvO1xuICAgICAgICB9XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobGcpKSB7XG4gICAgICAgICAgICB3aWR0aDogODAlO1xuICAgICAgICAgICAgLy8gbWFyZ2luOiAxNSUgYXV0byAxNSUgYXV0bztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5pbWFnZS1jb250YWluZXIsIC50ZXh0LWNvbnRlbnQge1xuICAgICAgICB3aWR0aDogMTAwJTtcblxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChzbSkpIHtcbiAgICAgICAgICAgIHdpZHRoOiBjYWxjKDUwJSArIDI1cHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobWQpKSB7XG4gICAgICAgICAgICB3aWR0aDogY2FsYyg1MCUgKyA0MHB4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KGxnKSkge1xuICAgICAgICAgICAgd2lkdGg6IDUwJTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5pbWFnZS1jb250YWluZXIge1xuICAgICAgICBcbiAgICAgICAgYm94LXNoYWRvdzogM3B4IDNweCAzcHggY29sb3IoYm94U2hhZG93KTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDBweCk7XG4gICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgLjNzIGVhc2UsIHRyYW5zZm9ybSAuM3MgZWFzZTtcbiAgICAgICAgaGVpZ2h0OiAyMDBweDtcbiAgICAgICAgd2lkdGg6IDI1MHB4O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgLy8gd2lkdGg6IDgwMHB4O1xuICAgICAgICAvLyBtYXJnaW4tYm90dG9tOiAxMDBweDtcblxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChzbSkpIHtcbiAgICAgICAgICAgIHdpZHRoOiA0MCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDI3NXB4O1xuICAgICAgICB9XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobWQpKSB7XG4gICAgICAgICAgICBoZWlnaHQ6IDQwMHB4O1xuICAgICAgICB9XG4gICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC00cHgpO1xuICAgICAgICAgICAgYm94LXNoYWRvdzogNXB4IDVweCA1cHggY29sb3IoYm94U2hhZG93KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGltZyB7XG4gICAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgIH1cblxuICAgIC50ZXh0LWNvbnRlbnQge1xuICAgICAgICBcbiAgICAgICAgLy8gcGFkZGluZzogMjVyZW0gMzByZW07XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAxNXJlbTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgei1pbmRleDogLTE7XG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgICAgLy8gYm9yZGVyOiAxcHggc29saWQgIzc5Nzc3NztcblxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChzbSkpIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDI1cmVtIDMwcmVtO1xuICAgICAgICAgICAgYm94LXNoYWRvdzogM3B4IDNweCAzcHggM3B4IGNvbG9yKGJveFNoYWRvdyk7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBjb2xvcihsaWdodEJhY2tncm91bmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobWQpKSB7XG4gICAgICAgICAgICBwYWRkaW5nOiAzNXJlbSA0MHJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KGxnKSkge1xuICAgICAgICAgICAgcGFkZGluZzogNDVyZW0gNDByZW07XG4gICAgICAgICAgICB3aWR0aDogNTMwcHg7XG4gICAgICAgICAgICByaWdodDogLTQwcHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAuaGVhZGluZyB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTNyZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgIG1heC13aWR0aDogMjUwcHg7XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobWQpKSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDIzcmVtO1xuICAgICAgICAgICAgbWF4LXdpZHRoOiA0MDBweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5zdWJoZWFkaW5nIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZm9udC1zaXplOiAxMnJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgICBtYXJnaW4tdG9wOiAxMHJlbTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTByZW07XG4gICAgICAgIC8vIGNvbG9yOiBjb2xvcihib2R5VGV4dCk7XG4gICAgICAgIGNvbG9yOiBjb2xvcihhY2NlbnQpO1xuXG4gICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KG1kKSkge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNnJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgd2lkdGg6IDIwcHg7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwcmVtO1xuICAgICAgICAgICAgaGVpZ2h0OiAycHg7XG4gICAgICAgICAgICAvLyBiYWNrZ3JvdW5kOiBjb2xvcihib2R5VGV4dCk7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBjb2xvcihhY2NlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcCB7XG4gICAgICAgIHRleHQtaW5kZW50OiAxMHB4O1xuICAgIH1cblxuICAgIC5idXR0b24ge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBmb250LXdlaWdodDogMzAwO1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICBmb250LXNpemU6IDEycmVtO1xuICAgICAgICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gICAgICAgIG1hcmdpbi10b3A6IDEwcmVtO1xuICAgICAgICBjb2xvcjogY29sb3IoZXh0cmFMaWdodFRleHQpO1xuICAgICAgICBmb250LXdlaWdodDogMzAwO1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobWQpKSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDE0cmVtO1xuICAgICAgICB9XG4gICAgfVxuPC9zdHlsZT5cblxuPHNlY3Rpb24gY2xhc3M9XCJ0ZXh0LXdpdGgtaW1hZ2UtY3RhXCI+XG4gICAgPGEgb246Y2xpY2s9e29wZW5Nb2RhbH0gaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiaW1hZ2UtY29udGFpbmVyXCI+XG4gICAgICAgIDxpbWcgc3JjPVwie0Rlc2tQaG90b31cIiBhbHQ9XCJBIHByb2dyYW1taW5nIGRlc2sgc2V0dXBcIj5cbiAgICA8L2E+XG4gICAgPGRpdiBjbGFzcz1cInRleHQtY29udGVudFwiPlxuICAgICAgICA8aDIgY2xhc3M9XCJoZWFkaW5nXCI+TGV0J3MgQ3JlYXRlIFNvbWV0aGluZyBBd2Vzb21lIFRvZ2V0aGVyLjwvaDI+XG4gICAgICAgIDxoMyBjbGFzcz1cInN1YmhlYWRpbmdcIj5Gcm9udCBFbmQgRGV2ZWxvcGVyIHwgRGVzayBFbnRodXNpYXN0PC9oMz5cbiAgICAgICAgPHA+XG4gICAgICAgICAgICBJIGhhdmUgYSByZWFsIHBhc3Npb24gZm9yIGRldmVsb3BtZW50LCBhbmQgaW5ub3ZhdGlvbi4gSSBsb3ZlIHNlZWluZyBwcm9qZWN0cyBjb21lIHRvIGxpZmUgYXMgSSBsZXZlcmFnZSBteSBrbm93bGVkZ2Ugb2YgZGVzaWduIHBhdHRlcm5zIHRvIHJlbmRlciBhZXN0aGV0aWNhbGx5IHBsZWFzaW5nLCBhbmQgZXh0cmVtZWx5IHZpYWJsZSBkaWdpdGFsIGV4cGVyaWVuY2VzLiBJJ20gZHJpdmVuIGJ5IHNlZWluZyBzb2x1dGlvbnMgY29tZSB0b2dldGhlciBhY3Jvc3MgZGV2ZWxvcG1lbnQgJiBkZXNpZ24gcHJvY2Vzc2VzLlxuICAgICAgICA8L3A+XG5cbiAgICAgICAgPGEgY2xhc3M9XCJidXR0b25cIiBvbjpjbGljaz17b3Blbk1vZGFsfSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+XG4gICAgICAgICAgICA8VGV4dEFuaW1hdGlvbiB0ZXh0PXtgR2V0IEluIFRvdWNoYH0gLz5cbiAgICAgICAgPC9hPlxuICAgIDwvZGl2PlxuPC9zZWN0aW9uPlxuXG48Q29udGFjdE1vZGFsIG9uOmNsaWNrPXsoKSA9PiBzaG93TW9kYWwgPSBmYWxzZX0gc2hvd01vZGFsPXtzaG93TW9kYWx9Lz4iLCI8c2NyaXB0PlxuICAgIGltcG9ydCBIZXJvIGZyb20gJy4uL2NvbXBvbmVudHMvaG9tZS1jb21wb25lbnRzL2hlcm8vSGVyby5zdmVsdGUnO1xuICAgIGltcG9ydCBQcm9qZWN0cyBmcm9tICcuLi9jb21wb25lbnRzL2hvbWUtY29tcG9uZW50cy9wcm9qZWN0cy9Qcm9qZWN0cy5zdmVsdGUnO1xuICAgIGltcG9ydCBUZXh0V2l0aEltYWdlQ3RhIGZyb20gJy4uL2NvbXBvbmVudHMvaG9tZS1jb21wb25lbnRzL3RleHQtd2l0aC1pbWFnZS1jdGEvVGV4dFdpdGhJbWFnZUN0YS5zdmVsdGUnO1xuXG4gICAgaW1wb3J0IERpUmVwYWlyc1RodW1iIGZyb20gJy4uL2ltYWdlcy90aHVtYm5haWxzL2RpLXRodW1iLmpwZyc7XG4gICAgaW1wb3J0IEhhbGN5b25UaHVtYiBmcm9tICcuLi9pbWFnZXMvdGh1bWJuYWlscy9oYWxjeW9uLTUtbWluLmpwZyc7XG5cbiAgICBsZXQgcG9ydGZvbGlvQ2FyZHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJy9wcm9qZWN0cy9oYWxjeW9uJyxcbiAgICAgICAgICAgIGltZ1NyYzogSGFsY3lvblRodW1iLFxuICAgICAgICAgICAgYWx0OiAnVGh1bWJuYWlsIGZvciB0aGUgSGFsY3lvbiBtYWxsIHdlYnNpdGUgcmVidWlsZCcsXG4gICAgICAgICAgICBwcm9qZWN0TmFtZTogJ0hhbGN5b24nLFxuICAgICAgICAgICAgcHJvamVjdFllYXI6ICcyMDE5JyxcbiAgICAgICAgICAgIHByb2plY3RUZXh0OiBgSSB3YXMgb25lIG9mIHRoZSBGcm9udCBFbmQgRGV2ZWxvcGVycyBvbiB0aGUgcHJvamVjdCBwcmltYXJpbHkgdGFza2VkIHdpdGggY3JlYXRpbmcgdGhlIG1vdmllcyBwYWdlIGFuZCBldmVudHMgZGlyZWN0b3J5LiBBY3Jvc3MgdGhlIHByb2plY3QgSSB3b3JrZWQgd2l0aCA8c3Ryb25nPm11bHRpcGxlIEFQSeKAmXM8L3N0cm9uZz4sIDxzdHJvbmc+UmVhY3QgU3RhdGljPC9zdHJvbmc+LCBhbmQgZGV2ZWxvcGVkIDxzdHJvbmc+Y2xlYW4gY29kZTwvc3Ryb25nPiBmb3Igb3RoZXIgYWR2YW5jZWQgUmVhY3QgY29tcG9uZW50cy5gXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJy9wcm9qZWN0cy9kaS1yZXBhaXJzJyxcbiAgICAgICAgICAgIGltZ1NyYzogRGlSZXBhaXJzVGh1bWIsXG4gICAgICAgICAgICBhbHQ6ICdUaHVtYm5haWwgZm9yIHRoZSBESSByZXBhaXJzIGZyZWVsYW5jZSB3ZWJzaXRlIHByb2plY3QnLFxuICAgICAgICAgICAgcHJvamVjdE5hbWU6ICdESSBSZXBhaXJzJyxcbiAgICAgICAgICAgIHByb2plY3RZZWFyOiAnMjAyMCcsXG4gICAgICAgICAgICBwcm9qZWN0VGV4dDogYEFzIHRoZSA8c3Ryb25nPm9ubHkgZGV2ZWxvcGVyICYgZGVzaWduZXI8L3N0cm9uZz4gb24gdGhpcyBmcmVlbGFuY2UgcHJvamVjdC4gSSBjb21wbGV0ZWx5IHJlLWVudmlzaW9uZWQgdGhlIHNpdGUgZGVzaWduICYgYnVpbHQgdGhlIHByb2plY3QgZnJvbSB0aGUgZ3JvdW5kIHVwIGFzIGFuIGV4dHJlbWVseSBwZXJmb3JtYW50IDxzdHJvbmc+U1NHIHdlYnNpdGU8L3N0cm9uZz4uIEkgdXRpbGl6ZWQgZGV2ZWxvcG1lbnQgJiBkZXNpZ24gYmVzdCBwcmFjdGljZXMgd2l0aCBhIGZvY3VzIG9uIHRoZSA8c3Ryb25nPnVzZXIgZXhwZXJpZW5jZS48L3N0cm9uZz5gLFxuICAgICAgICB9LCAgICAgICAgXG4gICAgXVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuICAgIC5jb250YWluZXIge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIG1hcmdpbi10b3A6IDkwcHg7XG4gICAgfVxuXG48L3N0eWxlPlxuXG48c3ZlbHRlOmhlYWQ+XG5cdDx0aXRsZT5Ib21lIHwgRnJvbnQgRW5kIERldmVsb3BlciAtIEpvc2h1YSBSb3BlcjwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG48ZGl2IFxuICAgIGNsYXNzPVwiY29udGFpbmVyXCJcbj5cbiAgICA8SGVybyAvPlxuICAgIDxUZXh0V2l0aEltYWdlQ3RhIC8+XG4gICAgPFByb2plY3RzIHBvcnRmb2xpb0NhcmRzPXtwb3J0Zm9saW9DYXJkc30gdGl0bGU9eydTZWxlY3RlZCBXb3Jrcyd9IC8+XG48L2Rpdj4iXSwibmFtZXMiOlsiSGVyb0ltYWdlIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQkFBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQzJGR0EsY0FBUzt3Q0FBTyxvQ0FBb0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNGdEUsZ0JBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FDQ3VNNkMsR0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQ0FmbEQsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkNBRFgsR0FBUzsyQ0FVVSxHQUFTOzs7Ozs7OzsrRUFNZSxHQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWpNN0QsU0FBUzs7VUFFSixTQUFTO2tCQUNkLFNBQVMsR0FBRyxJQUFJOzs7Ozs7Ozs7NkNBOExNLFNBQVMsR0FBRyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VDQzFKakIsR0FBYztXQUFTLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FyQzdELGNBQWM7O0dBRVYsR0FBRyxFQUFFLG1CQUFtQjtHQUN4QixNQUFNLEVBQUUsWUFBWTtHQUNwQixHQUFHLEVBQUUsZ0RBQWdEO0dBQ3JELFdBQVcsRUFBRSxTQUFTO0dBQ3RCLFdBQVcsRUFBRSxNQUFNO0dBQ25CLFdBQVc7OztHQUdYLEdBQUcsRUFBRSxzQkFBc0I7R0FDM0IsTUFBTSxFQUFFLGNBQWM7R0FDdEIsR0FBRyxFQUFFLHdEQUF3RDtHQUM3RCxXQUFXLEVBQUUsWUFBWTtHQUN6QixXQUFXLEVBQUUsTUFBTTtHQUNuQixXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
