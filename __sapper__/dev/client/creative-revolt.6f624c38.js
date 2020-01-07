import { S as SvelteComponentDev, i as init, s as safe_not_equal, B as empty, j as insert, u as transition_in, e as element, a as space, c as claim_element, b as children, d as detach, f as claim_text, g as attr, h as add_location, l as listen, k as append, v as add_render_callback, P as create_bidirectional_transition, H as run_all, C as group_outros, x as transition_out, D as check_outros, n as noop, O as destroy_each, z as mount_component, A as destroy_component, t as text } from './index.86fc6f69.js';
import { f as fly } from './index.60cd3d27.js';
import './TextAnimation.11321dbd.js';
import PageTransition from './PageTransition.edec49ed.js';

/* src/components/project-detail/Carousel.svelte generated by Svelte v3.9.1 */

const file = "src/components/project-detail/Carousel.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = Object.create(ctx);
	child_ctx.img = list[i];
	child_ctx.i = i;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = Object.create(ctx);
	child_ctx.img = list[i];
	return child_ctx;
}

// (432:12) {#if img.visible}
function create_if_block(ctx) {
	var div, button0, span0, t0, img, img_src_value, t1, button1, span1, div_transition, current, dispose;

	return {
		c: function create() {
			div = element("div");
			button0 = element("button");
			span0 = element("span");
			t0 = space();
			img = element("img");
			t1 = space();
			button1 = element("button");
			span1 = element("span");
			this.h();
		},

		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true }, false);
			var div_nodes = children(div);

			button0 = claim_element(div_nodes, "BUTTON", { class: true }, false);
			var button0_nodes = children(button0);

			span0 = claim_element(button0_nodes, "SPAN", { class: true }, false);
			var span0_nodes = children(span0);

			span0_nodes.forEach(detach);
			button0_nodes.forEach(detach);
			t0 = claim_text(div_nodes, "\n                    ");

			img = claim_element(div_nodes, "IMG", { src: true, alt: true, class: true }, false);
			var img_nodes = children(img);

			img_nodes.forEach(detach);
			t1 = claim_text(div_nodes, "\n                    ");

			button1 = claim_element(div_nodes, "BUTTON", { class: true }, false);
			var button1_nodes = children(button1);

			span1 = claim_element(button1_nodes, "SPAN", { class: true }, false);
			var span1_nodes = children(span1);

			span1_nodes.forEach(detach);
			button1_nodes.forEach(detach);
			div_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			attr(span0, "class", "arrow-left svelte-ax8fbx");
			add_location(span0, file, 434, 24, 8671);
			attr(button0, "class", "back svelte-ax8fbx");
			add_location(button0, file, 433, 20, 8588);
			attr(img, "src", img_src_value = ctx.img.src);
			attr(img, "alt", "wassup");
			attr(img, "class", "svelte-ax8fbx");
			add_location(img, file, 436, 20, 8754);
			attr(span1, "class", "arrow-right svelte-ax8fbx");
			add_location(span1, file, 438, 24, 8888);
			attr(button1, "class", "next svelte-ax8fbx");
			add_location(button1, file, 437, 20, 8809);
			attr(div, "class", "slide svelte-ax8fbx");
			add_location(div, file, 432, 16, 8497);

			dispose = [
				listen(button0, "click", ctx.click_handler),
				listen(button1, "click", ctx.click_handler_1)
			];
		},

		m: function mount(target, anchor) {
			insert(target, div, anchor);
			append(div, button0);
			append(button0, span0);
			append(div, t0);
			append(div, img);
			append(div, t1);
			append(div, button1);
			append(button1, span1);
			current = true;
		},

		p: function update(changed, ctx) {
			if ((!current || changed.STATE) && img_src_value !== (img_src_value = ctx.img.src)) {
				attr(img, "src", img_src_value);
			}
		},

		i: function intro(local) {
			if (current) return;
			if (local) {
				add_render_callback(() => {
					if (!div_transition) div_transition = create_bidirectional_transition(div, fly, { x: -40, duration: 850 }, true);
					div_transition.run(1);
				});
			}

			current = true;
		},

		o: function outro(local) {
			if (local) {
				if (!div_transition) div_transition = create_bidirectional_transition(div, fly, { x: -40, duration: 850 }, false);
				div_transition.run(0);
			}

			current = false;
		},

		d: function destroy(detaching) {
			if (detaching) {
				detach(div);
				if (div_transition) div_transition.end();
			}

			run_all(dispose);
		}
	};
}

// (431:8) {#each STATE.images as img}
function create_each_block_1(ctx) {
	var if_block_anchor;

	var if_block = (ctx.img.visible) && create_if_block(ctx);

	return {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},

		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},

		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},

		p: function update(changed, ctx) {
			if (ctx.img.visible) {
				if (if_block) {
					if_block.p(changed, ctx);
					transition_in(if_block, 1);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();
				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});
				check_outros();
			}
		},

		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);

			if (detaching) {
				detach(if_block_anchor);
			}
		}
	};
}

// (445:8) {#each STATE.images as img, i}
function create_each_block(ctx) {
	var span, span_class_value, dispose;

	function click_handler_2() {
		return ctx.click_handler_2(ctx);
	}

	return {
		c: function create() {
			span = element("span");
			this.h();
		},

		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true }, false);
			var span_nodes = children(span);

			span_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			attr(span, "class", span_class_value = "circle " + (ctx.img.visible ? 'active' : '') + " svelte-ax8fbx");
			add_location(span, file, 445, 12, 9096);
			dispose = listen(span, "click", click_handler_2);
		},

		m: function mount(target, anchor) {
			insert(target, span, anchor);
		},

		p: function update(changed, new_ctx) {
			ctx = new_ctx;
			if ((changed.STATE) && span_class_value !== (span_class_value = "circle " + (ctx.img.visible ? 'active' : '') + " svelte-ax8fbx")) {
				attr(span, "class", span_class_value);
			}
		},

		d: function destroy(detaching) {
			if (detaching) {
				detach(span);
			}

			dispose();
		}
	};
}

function create_fragment(ctx) {
	var div2, div0, t0, t1, div1;

	var each_value_1 = ctx.STATE.images;

	var each_blocks_1 = [];

	for (var i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	var each_value = ctx.STATE.images;

	var each_blocks = [];

	for (var i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c: function create() {
			div2 = element("div");
			div0 = element("div");
			t0 = space();

			for (var i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t1 = space();
			div1 = element("div");

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}
			this.h();
		},

		l: function claim(nodes) {
			div2 = claim_element(nodes, "DIV", { class: true }, false);
			var div2_nodes = children(div2);

			div0 = claim_element(div2_nodes, "DIV", { class: true }, false);
			var div0_nodes = children(div0);

			div0_nodes.forEach(detach);
			t0 = claim_text(div2_nodes, " \n    \n        ");

			for (var i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].l(div2_nodes);
			}

			t1 = claim_text(div2_nodes, "\n    ");

			div1 = claim_element(div2_nodes, "DIV", { class: true }, false);
			var div1_nodes = children(div1);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div1_nodes);
			}

			div1_nodes.forEach(detach);
			div2_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			attr(div0, "class", "box svelte-ax8fbx");
			add_location(div0, file, 428, 4, 8242);
			attr(div1, "class", "circles-container svelte-ax8fbx");
			add_location(div1, file, 443, 4, 9013);
			attr(div2, "class", "carousel-container svelte-ax8fbx");
			add_location(div2, file, 426, 0, 8153);
		},

		m: function mount(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div0);
			append(div2, t0);

			for (var i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(div2, null);
			}

			append(div2, t1);
			append(div2, div1);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}
		},

		p: function update(changed, ctx) {
			if (changed.STATE) {
				each_value_1 = ctx.STATE.images;

				for (var i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(changed, child_ctx);
					} else {
						each_blocks_1[i] = create_each_block_1(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(div2, t1);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}
				each_blocks_1.length = each_value_1.length;
			}

			if (changed.STATE) {
				each_value = ctx.STATE.images;

				for (var i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(changed, child_ctx);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div1, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}
				each_blocks.length = each_value.length;
			}
		},

		i: noop,
		o: noop,

		d: function destroy(detaching) {
			if (detaching) {
				detach(div2);
			}

			destroy_each(each_blocks_1, detaching);

			destroy_each(each_blocks, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let STATE = {
    images: [
        {
            src: 'images/creative-revolt/home.png',
            visible: true,
            key: 0,
        },
        {
            src: 'images/creative-revolt/home-ctas.png',
            visible: false,
            key: 1,
        },
        {
            src: 'images/creative-revolt/about.png',
            visible: false,
            key: 2,
        },
        {
            src: 'images/creative-revolt/about-cta.png',
            visible: false,
            key: 3,
        },
        {
            src: 'images/creative-revolt/writing-class.png',
            visible: false,
            key: 4,
        },
    ]
};

function switchSlides(key) {
    
    STATE.images.forEach(img => {
        if(key === img.key) {
            img.visible = true;
            
        } else {
            img.visible = false;
        }
    });

    $$invalidate('STATE', STATE = {...STATE});
}

function viewNextSlide() {
    let currentSlide = findCurrentSlide();
    let nextSlide = currentSlide !== null ? currentSlide + 1 : null;
    
    if(nextSlide !== null) { STATE.images[currentSlide].visible = false; $$invalidate('STATE', STATE); }

    if(nextSlide < STATE.images.length) {
        STATE.images[nextSlide].visible = true; $$invalidate('STATE', STATE);
    } else {
        STATE.images[0].visible = true; $$invalidate('STATE', STATE);
    }

    $$invalidate('STATE', STATE = {...STATE});
}

function viewPreviousSlide() {
    let currentSlide = findCurrentSlide();
    let prevSlide = currentSlide !== null ? currentSlide - 1 : null;
    
    if(prevSlide !== null) { STATE.images[currentSlide].visible = false; $$invalidate('STATE', STATE); }

    if(prevSlide > -1) {
        STATE.images[prevSlide].visible = true; $$invalidate('STATE', STATE);
    } else {
        STATE.images[STATE.images.length - 1].visible = true; $$invalidate('STATE', STATE);
    }

    $$invalidate('STATE', STATE = {...STATE});
}

function findCurrentSlide() {
    if(!STATE.images.length) return null;

    let currentSlideIndex;

    STATE.images.forEach((img, i) => {
        if(img.visible) currentSlideIndex = i;
    });
    
    return currentSlideIndex;
}

	function click_handler() {
		return viewPreviousSlide();
	}

	function click_handler_1() {
		return viewNextSlide();
	}

	function click_handler_2({ img }) {
	                    switchSlides(img.key);
	                }

	return {
		STATE,
		switchSlides,
		viewNextSlide,
		viewPreviousSlide,
		click_handler,
		click_handler_1,
		click_handler_2
	};
}

class Carousel extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, []);
	}
}

/* src/components/project-detail/ImageGrid.svelte generated by Svelte v3.9.1 */

const file$1 = "src/components/project-detail/ImageGrid.svelte";

function create_fragment$1(ctx) {
	var div, current;

	var carousel = new Carousel({ $$inline: true });

	return {
		c: function create() {
			div = element("div");
			carousel.$$.fragment.c();
			this.h();
		},

		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true }, false);
			var div_nodes = children(div);

			carousel.$$.fragment.l(div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			attr(div, "class", "inner-container svelte-y3hoac");
			add_location(div, file$1, 62, 0, 1183);
		},

		m: function mount(target, anchor) {
			insert(target, div, anchor);
			mount_component(carousel, div, null);
			current = true;
		},

		p: noop,

		i: function intro(local) {
			if (current) return;
			transition_in(carousel.$$.fragment, local);

			current = true;
		},

		o: function outro(local) {
			transition_out(carousel.$$.fragment, local);
			current = false;
		},

		d: function destroy(detaching) {
			if (detaching) {
				detach(div);
			}

			destroy_component(carousel);
		}
	};
}

class ImageGrid extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, null, create_fragment$1, safe_not_equal, []);
	}
}

/* src/routes/projects/creative-revolt.svelte generated by Svelte v3.9.1 */

const file$2 = "src/routes/projects/creative-revolt.svelte";

// (57:4) <PageTransition>
function create_default_slot(ctx) {
	var div, h10, t0, t1, section0, t2, section1, h11, t3, current;

	var imagegrid = new ImageGrid({ $$inline: true });

	return {
		c: function create() {
			div = element("div");
			h10 = element("h1");
			t0 = text("Creative Revolt");
			t1 = space();
			section0 = element("section");
			imagegrid.$$.fragment.c();
			t2 = space();
			section1 = element("section");
			h11 = element("h1");
			t3 = text("Summary");
			this.h();
		},

		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true }, false);
			var div_nodes = children(div);

			h10 = claim_element(div_nodes, "H1", { class: true }, false);
			var h10_nodes = children(h10);

			t0 = claim_text(h10_nodes, "Creative Revolt");
			h10_nodes.forEach(detach);
			div_nodes.forEach(detach);
			t1 = claim_text(nodes, "\n\n\n        ");

			section0 = claim_element(nodes, "SECTION", { class: true }, false);
			var section0_nodes = children(section0);

			imagegrid.$$.fragment.l(section0_nodes);
			section0_nodes.forEach(detach);
			t2 = claim_text(nodes, "\n        ");

			section1 = claim_element(nodes, "SECTION", { class: true }, false);
			var section1_nodes = children(section1);

			h11 = claim_element(section1_nodes, "H1", { class: true }, false);
			var h11_nodes = children(h11);

			t3 = claim_text(h11_nodes, "Summary");
			h11_nodes.forEach(detach);
			section1_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			attr(h10, "class", " svelte-1jl9n00");
			add_location(h10, file$2, 59, 12, 1447);
			attr(div, "class", "container title-container svelte-1jl9n00");
			add_location(div, file$2, 58, 8, 1395);
			attr(section0, "class", "container");
			add_location(section0, file$2, 63, 8, 1506);
			attr(h11, "class", "svelte-1jl9n00");
			add_location(h11, file$2, 67, 12, 1633);
			attr(section1, "class", "inner-container");
			add_location(section1, file$2, 66, 8, 1587);
		},

		m: function mount(target, anchor) {
			insert(target, div, anchor);
			append(div, h10);
			append(h10, t0);
			insert(target, t1, anchor);
			insert(target, section0, anchor);
			mount_component(imagegrid, section0, null);
			insert(target, t2, anchor);
			insert(target, section1, anchor);
			append(section1, h11);
			append(h11, t3);
			current = true;
		},

		i: function intro(local) {
			if (current) return;
			transition_in(imagegrid.$$.fragment, local);

			current = true;
		},

		o: function outro(local) {
			transition_out(imagegrid.$$.fragment, local);
			current = false;
		},

		d: function destroy(detaching) {
			if (detaching) {
				detach(div);
				detach(t1);
				detach(section0);
			}

			destroy_component(imagegrid);

			if (detaching) {
				detach(t2);
				detach(section1);
			}
		}
	};
}

function create_fragment$2(ctx) {
	var t, div, current;

	var pagetransition = new PageTransition({
		props: {
		$$slots: { default: [create_default_slot] },
		$$scope: { ctx }
	},
		$$inline: true
	});

	return {
		c: function create() {
			t = space();
			div = element("div");
			pagetransition.$$.fragment.c();
			this.h();
		},

		l: function claim(nodes) {
			t = claim_text(nodes, "\n\n\n");

			div = claim_element(nodes, "DIV", { class: true }, false);
			var div_nodes = children(div);

			pagetransition.$$.fragment.l(div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			document.title = "Creative Revolt | Front End Developer - Joshua Roper";
			attr(div, "class", "project-detail");
			add_location(div, file$2, 55, 0, 1280);
		},

		m: function mount(target, anchor) {
			insert(target, t, anchor);
			insert(target, div, anchor);
			mount_component(pagetransition, div, null);
			current = true;
		},

		p: function update(changed, ctx) {
			var pagetransition_changes = {};
			if (changed.$$scope) pagetransition_changes.$$scope = { changed, ctx };
			pagetransition.$set(pagetransition_changes);
		},

		i: function intro(local) {
			if (current) return;
			transition_in(pagetransition.$$.fragment, local);

			current = true;
		},

		o: function outro(local) {
			transition_out(pagetransition.$$.fragment, local);
			current = false;
		},

		d: function destroy(detaching) {
			if (detaching) {
				detach(t);
				detach(div);
			}

			destroy_component(pagetransition);
		}
	};
}

class Creative_revolt extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, null, create_fragment$2, safe_not_equal, []);
	}
}

export default Creative_revolt;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRpdmUtcmV2b2x0LjZmNjI0YzM4LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWRldGFpbC9DYXJvdXNlbC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbmltcG9ydCB7IGZhZGUsIGZseSB9IGZyb20gJ3N2ZWx0ZS90cmFuc2l0aW9uJ1xuXG5sZXQgU1RBVEUgPSB7XG4gICAgaW1hZ2VzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltYWdlcy9jcmVhdGl2ZS1yZXZvbHQvaG9tZS5wbmcnLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGtleTogMCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2NyZWF0aXZlLXJldm9sdC9ob21lLWN0YXMucG5nJyxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAxLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvY3JlYXRpdmUtcmV2b2x0L2Fib3V0LnBuZycsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2NyZWF0aXZlLXJldm9sdC9hYm91dC1jdGEucG5nJyxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvY3JlYXRpdmUtcmV2b2x0L3dyaXRpbmctY2xhc3MucG5nJyxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiA0LFxuICAgICAgICB9LFxuICAgIF1cbn1cblxuZnVuY3Rpb24gc3dpdGNoU2xpZGVzKGtleSkge1xuICAgIFxuICAgIFNUQVRFLmltYWdlcy5mb3JFYWNoKGltZyA9PiB7XG4gICAgICAgIGlmKGtleSA9PT0gaW1nLmtleSkge1xuICAgICAgICAgICAgaW1nLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbWcudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIFNUQVRFID0gey4uLlNUQVRFfTtcbn1cblxuZnVuY3Rpb24gdmlld05leHRTbGlkZSgpIHtcbiAgICBsZXQgY3VycmVudFNsaWRlID0gZmluZEN1cnJlbnRTbGlkZSgpO1xuICAgIGxldCBuZXh0U2xpZGUgPSBjdXJyZW50U2xpZGUgIT09IG51bGwgPyBjdXJyZW50U2xpZGUgKyAxIDogbnVsbDtcbiAgICBcbiAgICBpZihuZXh0U2xpZGUgIT09IG51bGwpIFNUQVRFLmltYWdlc1tjdXJyZW50U2xpZGVdLnZpc2libGUgPSBmYWxzZTtcblxuICAgIGlmKG5leHRTbGlkZSA8IFNUQVRFLmltYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgU1RBVEUuaW1hZ2VzW25leHRTbGlkZV0udmlzaWJsZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgU1RBVEUuaW1hZ2VzWzBdLnZpc2libGUgPSB0cnVlO1xuICAgIH1cblxuICAgIFNUQVRFID0gey4uLlNUQVRFfTtcbn1cblxuZnVuY3Rpb24gdmlld1ByZXZpb3VzU2xpZGUoKSB7XG4gICAgbGV0IGN1cnJlbnRTbGlkZSA9IGZpbmRDdXJyZW50U2xpZGUoKTtcbiAgICBsZXQgcHJldlNsaWRlID0gY3VycmVudFNsaWRlICE9PSBudWxsID8gY3VycmVudFNsaWRlIC0gMSA6IG51bGw7XG4gICAgXG4gICAgaWYocHJldlNsaWRlICE9PSBudWxsKSBTVEFURS5pbWFnZXNbY3VycmVudFNsaWRlXS52aXNpYmxlID0gZmFsc2U7XG5cbiAgICBpZihwcmV2U2xpZGUgPiAtMSkge1xuICAgICAgICBTVEFURS5pbWFnZXNbcHJldlNsaWRlXS52aXNpYmxlID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBTVEFURS5pbWFnZXNbU1RBVEUuaW1hZ2VzLmxlbmd0aCAtIDFdLnZpc2libGUgPSB0cnVlO1xuICAgIH1cblxuICAgIFNUQVRFID0gey4uLlNUQVRFfTtcbn1cblxuZnVuY3Rpb24gZmluZEN1cnJlbnRTbGlkZSgpIHtcbiAgICBpZighU1RBVEUuaW1hZ2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG5cbiAgICBsZXQgY3VycmVudFNsaWRlSW5kZXg7XG5cbiAgICBTVEFURS5pbWFnZXMuZm9yRWFjaCgoaW1nLCBpKSA9PiB7XG4gICAgICAgIGlmKGltZy52aXNpYmxlKSBjdXJyZW50U2xpZGVJbmRleCA9IGk7XG4gICAgfSlcbiAgICBcbiAgICByZXR1cm4gY3VycmVudFNsaWRlSW5kZXg7XG59XG5cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4uY2Fyb3VzZWwtY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgbWFyZ2luLWJvdHRvbTogNDByZW07XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWluLWhlaWdodDogMjUwcHg7XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA0MGVtKSB7XG4gICAgLmNhcm91c2VsLWNvbnRhaW5lciB7XG4gICAgICAgIHdpZHRoOiBhdXRvO1xuICAgIH1cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgLmJveCB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICB6LWluZGV4OiAtMTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgICAgd2lkdGg6IDMwMHB4O1xuICAgICAgICBib3JkZXI6IDNweCBzb2xpZCBibGFjaztcbiAgICAgICAgLyogYm9yZGVyLXJpZ2h0OiBub25lOyAqL1xuICAgICAgICBoZWlnaHQ6IDM4MHB4O1xuICAgICAgICAvKiBvcGFjaXR5OiAwOyAqL1xuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICB9XG5cbiAgICAuYm94OjphZnRlciB7XG4gICAgICAgIC8qIGNvbnRlbnQ6ICcnOyAqL1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGJhY2tncm91bmQ6IHVybCgnLi4vaW1hZ2VzL3NvLXdoaXRlLnBuZycpO1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IDElO1xuICAgICAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkIGJsYWNrO1xuICAgICAgICBoZWlnaHQ6IDklO1xuICAgICAgICB3aWR0aDogMTIwcHg7XG4gICAgICAgIHJpZ2h0OiAtNXB4O1xuICAgICAgICBib3R0b206IC0zcHg7XG4gICAgfVxuXG4gICAgLmJveDo6YmVmb3JlIHtcbiAgICAgICAgLyogY29udGVudDogJyc7ICovXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAzcHggc29saWQgYmxhY2s7XG4gICAgICAgIGhlaWdodDogOSU7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICB0b3A6IC0zcHg7XG4gICAgfVxufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNjRlbSkge1xuICAgIC5ib3gge1xuICAgICAgICB3aWR0aDogNDAwcHg7XG4gICAgICAgIGhlaWdodDogNTE2cHg7XG4gICAgfVxuICAgIC5ib3g6OmFmdGVyIHtcbiAgICAgICAgd2lkdGg6IDE1MHB4O1xuICAgIH1cbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDEzNjZweCkge1xuICAgIC5ib3gge1xuICAgICAgICB3aWR0aDogNTAwcHg7XG4gICAgICAgIGhlaWdodDogNjE2cHg7XG4gICAgfVxufVxuXG4udGl0bGUge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgZm9udC1zaXplOiA0MHB4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBjb2xvcjogIzU4NTk1YjtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xuICAgIG1hcmdpbi1yaWdodDogLTE1cHg7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogLTIwJTtcbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDQwZW0pIHtcbiAgICAudGl0bGUge1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmU7XG4gICAgICAgIGxlZnQ6IC0yNSVcbiAgICB9XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA2NGVtKSB7XG4gICAgLnRpdGxlIHtcbiAgICAgICAgZm9udC1zaXplOiA1NXB4O1xuICAgIH1cbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDEzNjZweCkge1xuICAgIC50aXRsZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogNjdweDtcbiAgICB9XG59XG5cblxuLnNsaWRlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgICB3aWR0aDogNDUwcHg7XG4gICAgbWF4LXdpZHRoOiA4NXZ3O1xuICAgIGhlaWdodDogMjUwcHg7XG4gICAgYm94LXNoYWRvdzogM3B4IDNweCAzcHggbGlnaHRncmV5O1xuICAgIG1hcmdpbjogMCBhdXRvO1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgLnNsaWRlIHtcbiAgICAgICAgbGVmdDogYXV0bztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogODglO1xuICAgICAgICBoZWlnaHQ6IDgyJTtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICB9XG59XG5cbi5zbGlkZSBpbWcge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBvYmplY3QtcG9zaXRpb246IHRvcDsgIFxufVxuXG5kaXYuY2lyY2xlcy1jb250YWluZXIge1xuICAgIHdpZHRoOiA0NTBweDtcbiAgICAvKiBoZWlnaHQ6IDI1MHB4OyAqL1xuICAgIGJvdHRvbTogLTMwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgbWF4LXdpZHRoOiA4NXZ3O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIC8qIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47ICovXG4gICAgLyogYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjMpOyAqL1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNDBlbSkge1xuICAgIGRpdi5jaXJjbGVzLWNvbnRhaW5lciB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgcmlnaHQ6MDtcbiAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgICB3aWR0aDogYXV0bztcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgICAgLyogcG9zaXRpb246IHN0YXRpYztcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC0xMHB4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4OyAqL1xuICAgICAgICB0cmFuc2Zvcm06IG5vbmU7XG4gICAgICAgIGxlZnQ6IDEyJTtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICAvKiB0b3A6IDklOyAqL1xuICAgICAgICAvKiBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7ICovXG4gICAgICAgIC8qIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47ICovXG4gICAgICAgIFxuICAgIH1cbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDY0ZW0pIHtcblxuICAgIGRpdi5jaXJjbGVzLWNvbnRhaW5lciB7XG4gICAgICAgIC8qIG1hcmdpbi1sZWZ0OiAtMzBweDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDsgKi9cbiAgICAgICAgXG4gICAgfVxufVxuXG5zcGFuLmNpcmNsZSB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMnB4O1xuICAgIGhlaWdodDogMTJweDtcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjM0IzQjNCO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBtYXJnaW46IDBweCAyMHB4IDAgMHB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNDBlbSkge1xuICAgIHNwYW4uY2lyY2xlIHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBtYXJnaW4tbGVmdDogMTVweDtcbiAgICAgICAgLyogYm9yZGVyOiAxcHggc29saWQgIzNCM0IzQjsgKi9cbiAgICB9XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA2NGVtKSB7XG4gICAgc3Bhbi5jaXJjbGUge1xuICAgICAgICB3aWR0aDogMTVweDtcbiAgICAgICAgaGVpZ2h0OiAxNXB4O1xuICAgIH1cbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDEzNjZweCkge1xuICAgIHNwYW4uY2lyY2xlIHtcbiAgICAgICAgd2lkdGg6IDE4cHg7XG4gICAgICAgIGhlaWdodDogMThweDtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICAgIH1cbn1cblxuc3Bhbi5jaXJjbGU6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDA7XG4gICAgdG9wOiAwO1xuICAgIHdpZHRoOiAxMTAlO1xuICAgIGhlaWdodDogMTEwJTtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYmFja2dyb3VuZDogIzNCM0IzQjtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgLjNzIGVhc2U7XG59XG5cbnNwYW4uY2lyY2xlLmFjdGl2ZTo6YmVmb3JlIHtcbiAgICBvcGFjaXR5OiAxO1xufVxuXG5idXR0b24ubmV4dCwgYnV0dG9uLmJhY2sge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMzAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBvcGFjaXR5OiAuMztcbiAgICB0cmFuc2l0aW9uOiBhbGwgLjNzIGVhc2Utb3V0O1xufVxuXG5idXR0b24ubmV4dCB7XG4gICAgcmlnaHQ6IDA7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGxlZnQscmdiYSgwLDAsMCwuNjUpIDAscmdiYSgwLDAsMCwwKSAxMDAlKSByZ2JhKDAsMCwwLDApO1xufVxuXG5idXR0b24uYmFjayB7XG4gICAgbGVmdDogMDtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQscmdiYSgwLDAsMCwuNjUpIDAscmdiYSgwLDAsMCwwKSAxMDAlKSByZ2JhKDAsMCwwLDApXG59XG5cbmJ1dHRvbi5uZXh0OmhvdmVyLCBidXR0b24uYmFjazpob3ZlciB7XG4gICAgb3BhY2l0eTogMTtcbn1cblxuLmFycm93LWxlZnQsIC5hcnJvdy1yaWdodCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGhlaWdodDogMjBweDtcbiAgICB3aWR0aDogMjBweDtcbiAgICB0b3A6IGNhbGMoNTAlIC0gMTBweCk7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAuMnMgZWFzZS1vdXQ7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OiAuMnM7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC4ycyBlYXNlLW91dCAuMnM7XG59XG5cbi5hcnJvdy1sZWZ0IHtcbiAgICBsZWZ0OiAzMHB4O1xufVxuXG4uYXJyb3ctcmlnaHQge1xuICAgIHJpZ2h0OiAzMHB4O1xufVxuXG4uYXJyb3ctbGVmdDo6YmVmb3JlLCAuYXJyb3ctcmlnaHQ6OmJlZm9yZSwgLmFycm93LWxlZnQ6OmFmdGVyLCAuYXJyb3ctcmlnaHQ6OmFmdGVyIHtcbiAgICBjb250ZW50OiBcIiBcIjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IDA7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAycHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgb3BhY2l0eTogLjc7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiA1MCUgMTAwJSAwO1xuICAgIHRyYW5zZm9ybS1vcmlnaW46IDUwJSAxMDAlIDA7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAuMTVzIGVhc2Utb3V0O1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuMTVzIGVhc2Utb3V0O1xufVxuXG4uYXJyb3ctbGVmdDo6YmVmb3JlLCAuYXJyb3ctbGVmdDo6YWZ0ZXIge1xuICAgIHJpZ2h0OiBhdXRvO1xuICAgIGxlZnQ6IDA7XG59XG5cblxuLmFycm93LWxlZnQ6OmJlZm9yZSB7XG4gICAgdG9wOiAtNTAlO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbn1cblxuLmJhY2s6aG92ZXIgLmFycm93LWxlZnQ6OmJlZm9yZSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzBkZWcpXG59XG5cbi5hcnJvdy1sZWZ0OjphZnRlciB7XG4gICAgdG9wOiBjYWxjKC01MCUgKyAtMXB4KTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDEzNWRlZyk7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTM1ZGVnKTtcbn1cblxuLmJhY2s6aG92ZXIgLmFycm93LWxlZnQ6OmFmdGVyIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxNTBkZWcpXG59XG5cblxuLmFycm93LXJpZ2h0OjpiZWZvcmUge1xuICAgIHRvcDogLTUwJTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbn1cblxuLm5leHQ6aG92ZXIgLmFycm93LXJpZ2h0OjpiZWZvcmUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKC0zMGRlZyk7XG59XG5cbi5hcnJvdy1yaWdodDo6YWZ0ZXIge1xuICAgIHRvcDogY2FsYygtNTAlICsgLTFweCk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtMTM1ZGVnKTtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMTM1ZGVnKTtcbn1cblxuLm5leHQ6aG92ZXIgLmFycm93LXJpZ2h0OjphZnRlciB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTE1MGRlZyk7XG59XG48L3N0eWxlPlxuXG48IS0tIG5vdGVzIHRvIGNvbWUgYmFjayB0byAtLT5cbjwhLS0gVE9ETyAtICAtLT5cbjxkaXYgY2xhc3M9XCJjYXJvdXNlbC1jb250YWluZXJcIj5cbjwhLS0gPHNwYW4gY2xhc3M9XCJ0aXRsZVwiPkNSRUFUSVZFIFJFVk9MVDwvc3Bhbj4gLS0+XG4gICAgPGRpdiBjbGFzcz1cImJveFwiPjwvZGl2PiA8IS0tIDxzcGFuIGNsYXNzPVwidGl0bGVcIj5DUkVBVElWRSBSRVZPTFQ8L3NwYW4+IFRPRE8gc3R5bGUgdGV4dCB0byBhcHBlYXIgbmljZSBvbiBmYWRlIG91dC0tPlxuICAgIDwhLS0gVE9ETyAtIG1ha2UgdG9wIG9mIGJveCBsb25nZXIgdGhlbiBib3R0b20gLS0+XG4gICAgICAgIHsjZWFjaCBTVEFURS5pbWFnZXMgYXMgaW1nfVxuICAgICAgICAgICAgeyNpZiBpbWcudmlzaWJsZX1cbiAgICAgICAgICAgICAgICA8ZGl2IHRyYW5zaXRpb246Zmx5fGxvY2FsPVwie3sgeDogLTQwLCBkdXJhdGlvbjogODUwIH19XCIgY2xhc3M9XCJzbGlkZVwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uOmNsaWNrPXsoKSA9PiB2aWV3UHJldmlvdXNTbGlkZSgpfSBjbGFzcz1cImJhY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3ctbGVmdFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwie2ltZy5zcmN9XCIgYWx0PVwid2Fzc3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb246Y2xpY2s9eygpID0+IHZpZXdOZXh0U2xpZGUoKX0gY2xhc3M9XCJuZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93LXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgIHsvZWFjaH1cbiAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlcy1jb250YWluZXJcIj5cbiAgICAgICAgeyNlYWNoIFNUQVRFLmltYWdlcyBhcyBpbWcsIGl9XG4gICAgICAgICAgICA8c3BhbiBcbiAgICAgICAgICAgICAgICBvbjpjbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2hTbGlkZXMoaW1nLmtleSlcbiAgICAgICAgICAgICAgICB9fSBcbiAgICAgICAgICAgICAgICBjbGFzcz1cImNpcmNsZSB7aW1nLnZpc2libGUgPyAnYWN0aXZlJyA6ICcnfVwiXG4gICAgICAgICAgICA+PC9zcGFuPlxuICAgICAgICB7L2VhY2h9XG4gICAgPC9kaXY+XG48L2Rpdj4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3Q0FvYitCLEdBQUcsQ0FBQyxHQUFHOzs7Ozs7Ozs7Ozs7NkJBSEE7NkJBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7OzZFQURQLEdBQUcsQ0FBQyxHQUFHOzs7Ozs7Ozs7cUZBSk0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTs7Ozs7Ozs7OztvRkFBekIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkFEcEQsR0FBRyxDQUFDLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FBWCxHQUFHLENBQUMsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyREFrQkcsR0FBRyxDQUFDLE9BQU8sR0FBRyxRQUFRLEdBQUcsRUFBRTs7bUNBSGhDOzs7Ozs7Ozs7b0ZBR0ssR0FBRyxDQUFDLE9BQU8sR0FBRyxRQUFRLEdBQUcsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dCQW5CM0MsS0FBSyxDQUFDLE1BQU07Ozs7a0NBQWpCOzs7O3NCQWNLLEtBQUssQ0FBQyxNQUFNOzs7O2dDQUFqQjs7Ozs7Ozs7OztxQ0FkQTs7Ozs7OzttQ0FjQTs7Ozs7Ozs7Ozs7Ozs7OztxQ0FkQTs7Ozs7Ozs7O21DQWNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQ0FkQTs7Ozs7OzttQ0FjQTs7Ozs7Ozt1QkFkSyxLQUFLLENBQUMsTUFBTTs7cUNBQWpCOzs7Ozs7Ozs7Ozs7NkJBQUE7OztrQkFBQSxzQkFBQTs7OztxQkFjSyxLQUFLLENBQUMsTUFBTTs7bUNBQWpCOzs7Ozs7Ozs7Ozs7MkJBQUE7OztnQkFBQSxvQkFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F6YlYsSUFBSSxLQUFLLEdBQUc7SUFDUixNQUFNLEVBQUU7UUFDSjtZQUNJLEdBQUcsRUFBRSxpQ0FBaUM7WUFDdEMsT0FBTyxFQUFFLElBQUk7WUFDYixHQUFHLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDSSxHQUFHLEVBQUUsc0NBQXNDO1lBQzNDLE9BQU8sRUFBRSxLQUFLO1lBQ2QsR0FBRyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0ksR0FBRyxFQUFFLGtDQUFrQztZQUN2QyxPQUFPLEVBQUUsS0FBSztZQUNkLEdBQUcsRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNJLEdBQUcsRUFBRSxzQ0FBc0M7WUFDM0MsT0FBTyxFQUFFLEtBQUs7WUFDZCxHQUFHLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDSSxHQUFHLEVBQUUsMENBQTBDO1lBQy9DLE9BQU8sRUFBRSxLQUFLO1lBQ2QsR0FBRyxFQUFFLENBQUM7U0FDVDtLQUNKO0VBQ0o7O0FBRUQsU0FBUyxZQUFZLENBQUMsR0FBRyxFQUFFOztJQUV2QixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUk7UUFDeEIsR0FBRyxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUNoQixHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzs7U0FFdEIsTUFBTTtZQUNILEdBQUcsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCO0tBQ0osRUFBQzs7MEJBRUYsS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLEVBQUMsQ0FBQztDQUN0Qjs7QUFFRCxTQUFTLGFBQWEsR0FBRztJQUNyQixJQUFJLFlBQVksR0FBRyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3RDLElBQUksU0FBUyxHQUFHLFlBQVksS0FBSyxJQUFJLEdBQUcsWUFBWSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7O0lBRWhFLEdBQUcsU0FBUyxLQUFLLElBQUksSUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLGlDQUFDOztJQUVsRSxHQUFHLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUNoQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLCtCQUFDO0tBQzFDLE1BQU07UUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLCtCQUFDO0tBQ2xDOzswQkFFRCxLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUssRUFBQyxDQUFDO0NBQ3RCOztBQUVELFNBQVMsaUJBQWlCLEdBQUc7SUFDekIsSUFBSSxZQUFZLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztJQUN0QyxJQUFJLFNBQVMsR0FBRyxZQUFZLEtBQUssSUFBSSxHQUFHLFlBQVksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDOztJQUVoRSxHQUFHLFNBQVMsS0FBSyxJQUFJLElBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxpQ0FBQzs7SUFFbEUsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDZixLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLCtCQUFDO0tBQzFDLE1BQU07UUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLCtCQUFDO0tBQ3hEOzswQkFFRCxLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUssRUFBQyxDQUFDO0NBQ3RCOztBQUVELFNBQVMsZ0JBQWdCLEdBQUc7SUFDeEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sSUFBSSxDQUFDOztJQUVyQyxJQUFJLGlCQUFpQixDQUFDOztJQUV0QixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUs7UUFDN0IsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLGlCQUFpQixHQUFHLENBQUMsQ0FBQztLQUN6QyxFQUFDOztJQUVGLE9BQU8saUJBQWlCLENBQUM7Q0FDNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
