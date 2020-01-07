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
			attr(span0, "class", "arrow-left svelte-1rp7nzd");
			add_location(span0, file, 434, 24, 8666);
			attr(button0, "class", "back svelte-1rp7nzd");
			add_location(button0, file, 433, 20, 8583);
			attr(img, "src", img_src_value = ctx.img.src);
			attr(img, "alt", "wassup");
			attr(img, "class", "svelte-1rp7nzd");
			add_location(img, file, 436, 20, 8749);
			attr(span1, "class", "arrow-right svelte-1rp7nzd");
			add_location(span1, file, 438, 24, 8883);
			attr(button1, "class", "next svelte-1rp7nzd");
			add_location(button1, file, 437, 20, 8804);
			attr(div, "class", "slide svelte-1rp7nzd");
			add_location(div, file, 432, 16, 8492);

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
			attr(span, "class", span_class_value = "circle " + (ctx.img.visible ? 'active' : '') + " svelte-1rp7nzd");
			add_location(span, file, 445, 12, 9091);
			dispose = listen(span, "click", click_handler_2);
		},

		m: function mount(target, anchor) {
			insert(target, span, anchor);
		},

		p: function update(changed, new_ctx) {
			ctx = new_ctx;
			if ((changed.STATE) && span_class_value !== (span_class_value = "circle " + (ctx.img.visible ? 'active' : '') + " svelte-1rp7nzd")) {
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
			attr(div0, "class", "box svelte-1rp7nzd");
			add_location(div0, file, 428, 4, 8237);
			attr(div1, "class", "circles-container svelte-1rp7nzd");
			add_location(div1, file, 443, 4, 9008);
			attr(div2, "class", "carousel-container svelte-1rp7nzd");
			add_location(div2, file, 426, 0, 8148);
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

// (46:4) <PageTransition>
function create_default_slot(ctx) {
	var h1, t0, t1, section, current;

	var imagegrid = new ImageGrid({ $$inline: true });

	return {
		c: function create() {
			h1 = element("h1");
			t0 = text("Creative Revolt");
			t1 = space();
			section = element("section");
			imagegrid.$$.fragment.c();
			this.h();
		},

		l: function claim(nodes) {
			h1 = claim_element(nodes, "H1", { class: true }, false);
			var h1_nodes = children(h1);

			t0 = claim_text(h1_nodes, "Creative Revolt");
			h1_nodes.forEach(detach);
			t1 = claim_text(nodes, "\n\n\n        ");

			section = claim_element(nodes, "SECTION", { class: true }, false);
			var section_nodes = children(section);

			imagegrid.$$.fragment.l(section_nodes);
			section_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			attr(h1, "class", "svelte-1wqu0ee");
			add_location(h1, file$2, 47, 8, 1116);
			attr(section, "class", "container");
			add_location(section, file$2, 50, 8, 1151);
		},

		m: function mount(target, anchor) {
			insert(target, h1, anchor);
			append(h1, t0);
			insert(target, t1, anchor);
			insert(target, section, anchor);
			mount_component(imagegrid, section, null);
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
				detach(h1);
				detach(t1);
				detach(section);
			}

			destroy_component(imagegrid);
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
			add_location(div, file$2, 44, 0, 1001);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRpdmUtcmV2b2x0LmU1MmZjNjc2LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWRldGFpbC9DYXJvdXNlbC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbmltcG9ydCB7IGZhZGUsIGZseSB9IGZyb20gJ3N2ZWx0ZS90cmFuc2l0aW9uJ1xuXG5sZXQgU1RBVEUgPSB7XG4gICAgaW1hZ2VzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltYWdlcy9jcmVhdGl2ZS1yZXZvbHQvaG9tZS5wbmcnLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGtleTogMCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2NyZWF0aXZlLXJldm9sdC9ob21lLWN0YXMucG5nJyxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAxLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvY3JlYXRpdmUtcmV2b2x0L2Fib3V0LnBuZycsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2NyZWF0aXZlLXJldm9sdC9hYm91dC1jdGEucG5nJyxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvY3JlYXRpdmUtcmV2b2x0L3dyaXRpbmctY2xhc3MucG5nJyxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiA0LFxuICAgICAgICB9LFxuICAgIF1cbn1cblxuZnVuY3Rpb24gc3dpdGNoU2xpZGVzKGtleSkge1xuICAgIFxuICAgIFNUQVRFLmltYWdlcy5mb3JFYWNoKGltZyA9PiB7XG4gICAgICAgIGlmKGtleSA9PT0gaW1nLmtleSkge1xuICAgICAgICAgICAgaW1nLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbWcudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIFNUQVRFID0gey4uLlNUQVRFfTtcbn1cblxuZnVuY3Rpb24gdmlld05leHRTbGlkZSgpIHtcbiAgICBsZXQgY3VycmVudFNsaWRlID0gZmluZEN1cnJlbnRTbGlkZSgpO1xuICAgIGxldCBuZXh0U2xpZGUgPSBjdXJyZW50U2xpZGUgIT09IG51bGwgPyBjdXJyZW50U2xpZGUgKyAxIDogbnVsbDtcbiAgICBcbiAgICBpZihuZXh0U2xpZGUgIT09IG51bGwpIFNUQVRFLmltYWdlc1tjdXJyZW50U2xpZGVdLnZpc2libGUgPSBmYWxzZTtcblxuICAgIGlmKG5leHRTbGlkZSA8IFNUQVRFLmltYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgU1RBVEUuaW1hZ2VzW25leHRTbGlkZV0udmlzaWJsZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgU1RBVEUuaW1hZ2VzWzBdLnZpc2libGUgPSB0cnVlO1xuICAgIH1cblxuICAgIFNUQVRFID0gey4uLlNUQVRFfTtcbn1cblxuZnVuY3Rpb24gdmlld1ByZXZpb3VzU2xpZGUoKSB7XG4gICAgbGV0IGN1cnJlbnRTbGlkZSA9IGZpbmRDdXJyZW50U2xpZGUoKTtcbiAgICBsZXQgcHJldlNsaWRlID0gY3VycmVudFNsaWRlICE9PSBudWxsID8gY3VycmVudFNsaWRlIC0gMSA6IG51bGw7XG4gICAgXG4gICAgaWYocHJldlNsaWRlICE9PSBudWxsKSBTVEFURS5pbWFnZXNbY3VycmVudFNsaWRlXS52aXNpYmxlID0gZmFsc2U7XG5cbiAgICBpZihwcmV2U2xpZGUgPiAtMSkge1xuICAgICAgICBTVEFURS5pbWFnZXNbcHJldlNsaWRlXS52aXNpYmxlID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBTVEFURS5pbWFnZXNbU1RBVEUuaW1hZ2VzLmxlbmd0aCAtIDFdLnZpc2libGUgPSB0cnVlO1xuICAgIH1cblxuICAgIFNUQVRFID0gey4uLlNUQVRFfTtcbn1cblxuZnVuY3Rpb24gZmluZEN1cnJlbnRTbGlkZSgpIHtcbiAgICBpZighU1RBVEUuaW1hZ2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG5cbiAgICBsZXQgY3VycmVudFNsaWRlSW5kZXg7XG5cbiAgICBTVEFURS5pbWFnZXMuZm9yRWFjaCgoaW1nLCBpKSA9PiB7XG4gICAgICAgIGlmKGltZy52aXNpYmxlKSBjdXJyZW50U2xpZGVJbmRleCA9IGk7XG4gICAgfSlcbiAgICBcbiAgICByZXR1cm4gY3VycmVudFNsaWRlSW5kZXg7XG59XG5cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4uY2Fyb3VzZWwtY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgbWFyZ2luOiA0MHJlbSAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1pbi1oZWlnaHQ6IDI1MHB4O1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNDBlbSkge1xuICAgIC5jYXJvdXNlbC1jb250YWluZXIge1xuICAgICAgICB3aWR0aDogYXV0bztcbiAgICB9XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgIC5ib3gge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgei1pbmRleDogLTE7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICAgIHdpZHRoOiAzMDBweDtcbiAgICAgICAgYm9yZGVyOiAzcHggc29saWQgYmxhY2s7XG4gICAgICAgIC8qIGJvcmRlci1yaWdodDogbm9uZTsgKi9cbiAgICAgICAgaGVpZ2h0OiAzODBweDtcbiAgICAgICAgLyogb3BhY2l0eTogMDsgKi9cbiAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgfVxuXG4gICAgLmJveDo6YWZ0ZXIge1xuICAgICAgICAvKiBjb250ZW50OiAnJzsgKi9cbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBiYWNrZ3JvdW5kOiB1cmwoJy4uL2ltYWdlcy9zby13aGl0ZS5wbmcnKTtcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbi14OiAxJTtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCBibGFjaztcbiAgICAgICAgaGVpZ2h0OiA5JTtcbiAgICAgICAgd2lkdGg6IDEyMHB4O1xuICAgICAgICByaWdodDogLTVweDtcbiAgICAgICAgYm90dG9tOiAtM3B4O1xuICAgIH1cblxuICAgIC5ib3g6OmJlZm9yZSB7XG4gICAgICAgIC8qIGNvbnRlbnQ6ICcnOyAqL1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGJvcmRlci1yaWdodDogM3B4IHNvbGlkIGJsYWNrO1xuICAgICAgICBoZWlnaHQ6IDklO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgdG9wOiAtM3B4O1xuICAgIH1cbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDY0ZW0pIHtcbiAgICAuYm94IHtcbiAgICAgICAgd2lkdGg6IDQwMHB4O1xuICAgICAgICBoZWlnaHQ6IDUxNnB4O1xuICAgIH1cbiAgICAuYm94OjphZnRlciB7XG4gICAgICAgIHdpZHRoOiAxNTBweDtcbiAgICB9XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiAxMzY2cHgpIHtcbiAgICAuYm94IHtcbiAgICAgICAgd2lkdGg6IDUwMHB4O1xuICAgICAgICBoZWlnaHQ6IDYxNnB4O1xuICAgIH1cbn1cblxuLnRpdGxlIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgY29sb3I6ICM1ODU5NWI7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcbiAgICBtYXJnaW4tcmlnaHQ6IC0xNXB4O1xuICAgIHRvcDogNTAlO1xuICAgIGxlZnQ6IC0yMCU7XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA0MGVtKSB7XG4gICAgLnRpdGxlIHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lO1xuICAgICAgICBsZWZ0OiAtMjUlXG4gICAgfVxufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNjRlbSkge1xuICAgIC50aXRsZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogNTVweDtcbiAgICB9XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiAxMzY2cHgpIHtcbiAgICAudGl0bGUge1xuICAgICAgICBmb250LXNpemU6IDY3cHg7XG4gICAgfVxufVxuXG5cbi5zbGlkZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG4gICAgd2lkdGg6IDQ1MHB4O1xuICAgIG1heC13aWR0aDogODV2dztcbiAgICBoZWlnaHQ6IDI1MHB4O1xuICAgIGJveC1zaGFkb3c6IDNweCAzcHggM3B4IGxpZ2h0Z3JleTtcbiAgICBtYXJnaW46IDAgYXV0bztcbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDQwZW0pe1xuICAgIC5zbGlkZSB7XG4gICAgICAgIGxlZnQ6IGF1dG87XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDg4JTtcbiAgICAgICAgaGVpZ2h0OiA4MiU7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgfVxufVxuXG4uc2xpZGUgaW1nIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgb2JqZWN0LXBvc2l0aW9uOiB0b3A7ICBcbn1cblxuZGl2LmNpcmNsZXMtY29udGFpbmVyIHtcbiAgICB3aWR0aDogNDUwcHg7XG4gICAgLyogaGVpZ2h0OiAyNTBweDsgKi9cbiAgICBib3R0b206IC0zMHB4O1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIG1heC13aWR0aDogODV2dztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAvKiBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyAqL1xuICAgIC8qIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC4zKTsgKi9cbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDQwZW0pIHtcbiAgICBkaXYuY2lyY2xlcy1jb250YWluZXIge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHJpZ2h0OjA7XG4gICAgICAgIGhlaWdodDogYXV0bztcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICAgIC8qIHBvc2l0aW9uOiBzdGF0aWM7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtMTBweDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDsgKi9cbiAgICAgICAgdHJhbnNmb3JtOiBub25lO1xuICAgICAgICBsZWZ0OiAxMiU7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgLyogdG9wOiA5JTsgKi9cbiAgICAgICAgLyoganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0OyAqL1xuICAgICAgICAvKiBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyAqL1xuICAgICAgICBcbiAgICB9XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA2NGVtKSB7XG5cbiAgICBkaXYuY2lyY2xlcy1jb250YWluZXIge1xuICAgICAgICAvKiBtYXJnaW4tbGVmdDogLTMwcHg7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7ICovXG4gICAgICAgIFxuICAgIH1cbn1cblxuc3Bhbi5jaXJjbGUge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMTJweDtcbiAgICBoZWlnaHQ6IDEycHg7XG4gICAgYm9yZGVyOiAycHggc29saWQgIzNCM0IzQjtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgbWFyZ2luOiAwcHggMjBweCAwIDBweDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDQwZW0pIHtcbiAgICBzcGFuLmNpcmNsZSB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDE1cHg7XG4gICAgICAgIC8qIGJvcmRlcjogMXB4IHNvbGlkICMzQjNCM0I7ICovXG4gICAgfVxufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNjRlbSkge1xuICAgIHNwYW4uY2lyY2xlIHtcbiAgICAgICAgd2lkdGg6IDE1cHg7XG4gICAgICAgIGhlaWdodDogMTVweDtcbiAgICB9XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiAxMzY2cHgpIHtcbiAgICBzcGFuLmNpcmNsZSB7XG4gICAgICAgIHdpZHRoOiAxOHB4O1xuICAgICAgICBoZWlnaHQ6IDE4cHg7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcbiAgICB9XG59XG5cbnNwYW4uY2lyY2xlOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIHRvcDogMDtcbiAgICB3aWR0aDogMTEwJTtcbiAgICBoZWlnaHQ6IDExMCU7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJhY2tncm91bmQ6ICMzQjNCM0I7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4zcyBlYXNlO1xufVxuXG5zcGFuLmNpcmNsZS5hY3RpdmU6OmJlZm9yZSB7XG4gICAgb3BhY2l0eTogMTtcbn1cblxuYnV0dG9uLm5leHQsIGJ1dHRvbi5iYWNrIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDMwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgb3BhY2l0eTogLjM7XG4gICAgdHJhbnNpdGlvbjogYWxsIC4zcyBlYXNlLW91dDtcbn1cblxuYnV0dG9uLm5leHQge1xuICAgIHJpZ2h0OiAwO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBsZWZ0LHJnYmEoMCwwLDAsLjY1KSAwLHJnYmEoMCwwLDAsMCkgMTAwJSkgcmdiYSgwLDAsMCwwKTtcbn1cblxuYnV0dG9uLmJhY2sge1xuICAgIGxlZnQ6IDA7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LHJnYmEoMCwwLDAsLjY1KSAwLHJnYmEoMCwwLDAsMCkgMTAwJSkgcmdiYSgwLDAsMCwwKVxufVxuXG5idXR0b24ubmV4dDpob3ZlciwgYnV0dG9uLmJhY2s6aG92ZXIge1xuICAgIG9wYWNpdHk6IDE7XG59XG5cbi5hcnJvdy1sZWZ0LCAuYXJyb3ctcmlnaHQge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgd2lkdGg6IDIwcHg7XG4gICAgdG9wOiBjYWxjKDUwJSAtIDEwcHgpO1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogLXdlYmtpdC10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0O1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTogLjJzO1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuMnMgZWFzZS1vdXQgLjJzO1xufVxuXG4uYXJyb3ctbGVmdCB7XG4gICAgbGVmdDogMzBweDtcbn1cblxuLmFycm93LXJpZ2h0IHtcbiAgICByaWdodDogMzBweDtcbn1cblxuLmFycm93LWxlZnQ6OmJlZm9yZSwgLmFycm93LXJpZ2h0OjpiZWZvcmUsIC5hcnJvdy1sZWZ0OjphZnRlciwgLmFycm93LXJpZ2h0OjphZnRlciB7XG4gICAgY29udGVudDogXCIgXCI7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAwO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB3aWR0aDogMnB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIG9wYWNpdHk6IC43O1xuICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogNTAlIDEwMCUgMDtcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiA1MCUgMTAwJSAwO1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogLXdlYmtpdC10cmFuc2Zvcm0gLjE1cyBlYXNlLW91dDtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjE1cyBlYXNlLW91dDtcbn1cblxuLmFycm93LWxlZnQ6OmJlZm9yZSwgLmFycm93LWxlZnQ6OmFmdGVyIHtcbiAgICByaWdodDogYXV0bztcbiAgICBsZWZ0OiAwO1xufVxuXG5cbi5hcnJvdy1sZWZ0OjpiZWZvcmUge1xuICAgIHRvcDogLTUwJTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG59XG5cbi5iYWNrOmhvdmVyIC5hcnJvdy1sZWZ0OjpiZWZvcmUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDMwZGVnKVxufVxuXG4uYXJyb3ctbGVmdDo6YWZ0ZXIge1xuICAgIHRvcDogY2FsYygtNTAlICsgLTFweCk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDEzNWRlZyk7XG59XG5cbi5iYWNrOmhvdmVyIC5hcnJvdy1sZWZ0OjphZnRlciB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTUwZGVnKVxufVxuXG5cbi5hcnJvdy1yaWdodDo6YmVmb3JlIHtcbiAgICB0b3A6IC01MCU7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xuICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG59XG5cbi5uZXh0OmhvdmVyIC5hcnJvdy1yaWdodDo6YmVmb3JlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMzBkZWcpO1xufVxuXG4uYXJyb3ctcmlnaHQ6OmFmdGVyIHtcbiAgICB0b3A6IGNhbGMoLTUwJSArIC0xcHgpO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTEzNWRlZyk7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTEzNWRlZyk7XG59XG5cbi5uZXh0OmhvdmVyIC5hcnJvdy1yaWdodDo6YWZ0ZXIge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKC0xNTBkZWcpO1xufVxuPC9zdHlsZT5cblxuPCEtLSBub3RlcyB0byBjb21lIGJhY2sgdG8gLS0+XG48IS0tIFRPRE8gLSAgLS0+XG48ZGl2IGNsYXNzPVwiY2Fyb3VzZWwtY29udGFpbmVyXCI+XG48IS0tIDxzcGFuIGNsYXNzPVwidGl0bGVcIj5DUkVBVElWRSBSRVZPTFQ8L3NwYW4+IC0tPlxuICAgIDxkaXYgY2xhc3M9XCJib3hcIj48L2Rpdj4gPCEtLSA8c3BhbiBjbGFzcz1cInRpdGxlXCI+Q1JFQVRJVkUgUkVWT0xUPC9zcGFuPiBUT0RPIHN0eWxlIHRleHQgdG8gYXBwZWFyIG5pY2Ugb24gZmFkZSBvdXQtLT5cbiAgICA8IS0tIFRPRE8gLSBtYWtlIHRvcCBvZiBib3ggbG9uZ2VyIHRoZW4gYm90dG9tIC0tPlxuICAgICAgICB7I2VhY2ggU1RBVEUuaW1hZ2VzIGFzIGltZ31cbiAgICAgICAgICAgIHsjaWYgaW1nLnZpc2libGV9XG4gICAgICAgICAgICAgICAgPGRpdiB0cmFuc2l0aW9uOmZseXxsb2NhbD1cInt7IHg6IC00MCwgZHVyYXRpb246IDg1MCB9fVwiIGNsYXNzPVwic2xpZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbjpjbGljaz17KCkgPT4gdmlld1ByZXZpb3VzU2xpZGUoKX0gY2xhc3M9XCJiYWNrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93LWxlZnRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIntpbWcuc3JjfVwiIGFsdD1cIndhc3N1cFwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uOmNsaWNrPXsoKSA9PiB2aWV3TmV4dFNsaWRlKCl9IGNsYXNzPVwibmV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvdy1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7L2lmfVxuICAgICAgICB7L2VhY2h9XG4gICAgPGRpdiBjbGFzcz1cImNpcmNsZXMtY29udGFpbmVyXCI+XG4gICAgICAgIHsjZWFjaCBTVEFURS5pbWFnZXMgYXMgaW1nLCBpfVxuICAgICAgICAgICAgPHNwYW4gXG4gICAgICAgICAgICAgICAgb246Y2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoU2xpZGVzKGltZy5rZXkpXG4gICAgICAgICAgICAgICAgfX0gXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjaXJjbGUge2ltZy52aXNpYmxlID8gJ2FjdGl2ZScgOiAnJ31cIlxuICAgICAgICAgICAgPjwvc3Bhbj5cbiAgICAgICAgey9lYWNofVxuICAgIDwvZGl2PlxuPC9kaXY+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0NBb2IrQixHQUFHLENBQUMsR0FBRzs7Ozs7Ozs7Ozs7OzZCQUhBOzZCQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs2RUFEUCxHQUFHLENBQUMsR0FBRzs7Ozs7Ozs7O3FGQUpNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUU7Ozs7Ozs7Ozs7b0ZBQXpCLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBRHBELEdBQUcsQ0FBQyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBQVgsR0FBRyxDQUFDLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkRBa0JHLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxHQUFHLEVBQUU7O21DQUhoQzs7Ozs7Ozs7O29GQUdLLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxHQUFHLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3QkFuQjNDLEtBQUssQ0FBQyxNQUFNOzs7O2tDQUFqQjs7OztzQkFjSyxLQUFLLENBQUMsTUFBTTs7OztnQ0FBakI7Ozs7Ozs7Ozs7cUNBZEE7Ozs7Ozs7bUNBY0E7Ozs7Ozs7Ozs7Ozs7Ozs7cUNBZEE7Ozs7Ozs7OzttQ0FjQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUNBZEE7Ozs7Ozs7bUNBY0E7Ozs7Ozs7dUJBZEssS0FBSyxDQUFDLE1BQU07O3FDQUFqQjs7Ozs7Ozs7Ozs7OzZCQUFBOzs7a0JBQUEsc0JBQUE7Ozs7cUJBY0ssS0FBSyxDQUFDLE1BQU07O21DQUFqQjs7Ozs7Ozs7Ozs7OzJCQUFBOzs7Z0JBQUEsb0JBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBemJWLElBQUksS0FBSyxHQUFHO0lBQ1IsTUFBTSxFQUFFO1FBQ0o7WUFDSSxHQUFHLEVBQUUsaUNBQWlDO1lBQ3RDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsR0FBRyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0ksR0FBRyxFQUFFLHNDQUFzQztZQUMzQyxPQUFPLEVBQUUsS0FBSztZQUNkLEdBQUcsRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNJLEdBQUcsRUFBRSxrQ0FBa0M7WUFDdkMsT0FBTyxFQUFFLEtBQUs7WUFDZCxHQUFHLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDSSxHQUFHLEVBQUUsc0NBQXNDO1lBQzNDLE9BQU8sRUFBRSxLQUFLO1lBQ2QsR0FBRyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0ksR0FBRyxFQUFFLDBDQUEwQztZQUMvQyxPQUFPLEVBQUUsS0FBSztZQUNkLEdBQUcsRUFBRSxDQUFDO1NBQ1Q7S0FDSjtFQUNKOztBQUVELFNBQVMsWUFBWSxDQUFDLEdBQUcsRUFBRTs7SUFFdkIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJO1FBQ3hCLEdBQUcsR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDaEIsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7O1NBRXRCLE1BQU07WUFDSCxHQUFHLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN2QjtLQUNKLEVBQUM7OzBCQUVGLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFDLENBQUM7Q0FDdEI7O0FBRUQsU0FBUyxhQUFhLEdBQUc7SUFDckIsSUFBSSxZQUFZLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztJQUN0QyxJQUFJLFNBQVMsR0FBRyxZQUFZLEtBQUssSUFBSSxHQUFHLFlBQVksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDOztJQUVoRSxHQUFHLFNBQVMsS0FBSyxJQUFJLElBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxpQ0FBQzs7SUFFbEUsR0FBRyxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFDaEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSwrQkFBQztLQUMxQyxNQUFNO1FBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSwrQkFBQztLQUNsQzs7MEJBRUQsS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLEVBQUMsQ0FBQztDQUN0Qjs7QUFFRCxTQUFTLGlCQUFpQixHQUFHO0lBQ3pCLElBQUksWUFBWSxHQUFHLGdCQUFnQixFQUFFLENBQUM7SUFDdEMsSUFBSSxTQUFTLEdBQUcsWUFBWSxLQUFLLElBQUksR0FBRyxZQUFZLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQzs7SUFFaEUsR0FBRyxTQUFTLEtBQUssSUFBSSxJQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssaUNBQUM7O0lBRWxFLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ2YsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSwrQkFBQztLQUMxQyxNQUFNO1FBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSwrQkFBQztLQUN4RDs7MEJBRUQsS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLEVBQUMsQ0FBQztDQUN0Qjs7QUFFRCxTQUFTLGdCQUFnQixHQUFHO0lBQ3hCLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLElBQUksQ0FBQzs7SUFFckMsSUFBSSxpQkFBaUIsQ0FBQzs7SUFFdEIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLO1FBQzdCLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7S0FDekMsRUFBQzs7SUFFRixPQUFPLGlCQUFpQixDQUFDO0NBQzVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
