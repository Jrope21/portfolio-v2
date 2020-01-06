import { S as SvelteComponentDev, i as init, s as safe_not_equal, e as element, c as claim_element, b as children, d as detach, g as attr, h as add_location, j as insert, q as get_slot_changes, r as get_slot_context, u as transition_in, x as transition_out, y as create_out_transition, B as empty, p as create_slot, v as add_render_callback, w as create_in_transition } from './index.86fc6f69.js';
import { f as fly } from './index.60cd3d27.js';

/* src/routes/PageTransition.svelte generated by Svelte v3.9.1 */

const file = "src/routes/PageTransition.svelte";

// (35:0) {#if show}
function create_if_block(ctx) {
	var main, main_intro, main_outro, current;

	const default_slot_template = ctx.$$slots.default;
	const default_slot = create_slot(default_slot_template, ctx, null);

	return {
		c: function create() {
			main = element("main");

			if (default_slot) default_slot.c();
			this.h();
		},

		l: function claim(nodes) {
			main = claim_element(nodes, "MAIN", { class: true }, false);
			var main_nodes = children(main);

			if (default_slot) default_slot.l(main_nodes);
			main_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			attr(main, "class", "svelte-1n6sdsm");
			add_location(main, file, 35, 4, 825);
		},

		m: function mount(target, anchor) {
			insert(target, main, anchor);

			if (default_slot) {
				default_slot.m(main, null);
			}

			current = true;
		},

		p: function update(changed, ctx) {
			if (default_slot && default_slot.p && changed.$$scope) {
				default_slot.p(
					get_slot_changes(default_slot_template, ctx, changed, null),
					get_slot_context(default_slot_template, ctx, null)
				);
			}
		},

		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);

			add_render_callback(() => {
				if (main_outro) main_outro.end(1);
				if (!main_intro) main_intro = create_in_transition(main, fly, { x: -10, duration: 400, delay: 400, });
				main_intro.start();
			});

			current = true;
		},

		o: function outro(local) {
			transition_out(default_slot, local);
			if (main_intro) main_intro.invalidate();

			main_outro = create_out_transition(main, fadeOut, {});

			current = false;
		},

		d: function destroy(detaching) {
			if (detaching) {
				detach(main);
			}

			if (default_slot) default_slot.d(detaching);

			if (detaching) {
				if (main_outro) main_outro.end();
			}
		}
	};
}

function create_fragment(ctx) {
	var if_block_anchor, current;

	var if_block =  create_if_block(ctx);

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
			current = true;
		},

		p: function update(changed, ctx) {
			{
				if (if_block) {
					if_block.p(changed, ctx);
					transition_in(if_block, 1);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},

		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},

		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},

		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);

			if (detaching) {
				detach(if_block_anchor);
			}
		}
	};
}

function fadeOut(node, { delay = 0, duration = 400, offset=window.scrollY }) {
    const o = +getComputedStyle(node).opacity;
    return {
        delay,
        duration,
        offset,
        css: t => `opacity: ${t * o}; transfrom: translateX(100px); margin-top: -${offset}px`
    };
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots = {}, $$scope } = $$props;

	$$self.$set = $$props => {
		if ('$$scope' in $$props) $$invalidate('$$scope', $$scope = $$props.$$scope);
	};

	return { $$slots, $$scope };
}

class PageTransition extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, []);
	}
}

export default PageTransition;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnZVRyYW5zaXRpb24uN2M4ZWUwYWYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvUGFnZVRyYW5zaXRpb24uc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG4gICAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSc7XG4gICAgaW1wb3J0IHtmbHl9IGZyb20gJ3N2ZWx0ZS90cmFuc2l0aW9uJztcblxuICAgIGZ1bmN0aW9uIGZhZGUobm9kZSwgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gODAwLCBvZmZzZXQ9d2luZG93LnNjcm9sbFkgfSkge1xuICAgICAgICBjb25zdCBvID0gK2dldENvbXB1dGVkU3R5bGUobm9kZSkub3BhY2l0eTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRlbGF5LFxuICAgICAgICAgICAgZHVyYXRpb24sXG4gICAgICAgICAgICBvZmZzZXQsXG4gICAgICAgICAgICBjc3M6IHQgPT4gYG9wYWNpdHk6ICR7dCAqIG99OyBtYXJnaW4tdG9wOiAtJHtvZmZzZXR9cHhgXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmFkZU91dChub2RlLCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSA0MDAsIG9mZnNldD13aW5kb3cuc2Nyb2xsWSB9KSB7XG4gICAgICAgIGNvbnN0IG8gPSArZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS5vcGFjaXR5O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGVsYXksXG4gICAgICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICAgIGNzczogdCA9PiBgb3BhY2l0eTogJHt0ICogb307IHRyYW5zZnJvbTogdHJhbnNsYXRlWCgxMDBweCk7IG1hcmdpbi10b3A6IC0ke29mZnNldH1weGBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBsZXQgc2hvdyA9IHRydWU7XG5cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gICAgbWFpbiB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG48L3N0eWxlPlxuXG57I2lmIHNob3d9XG4gICAgPG1haW4gaW46Zmx5PVwie3sgeDogLTEwLCBkdXJhdGlvbjogNDAwLCBkZWxheTogNDAwLCB9fVwiIG91dDpmYWRlT3V0PlxuICAgICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgPC9tYWluPlxuey9pZn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrRUFtQ21CLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBckJyRCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLFFBQVEsR0FBRyxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtJQUN6RSxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUMxQyxPQUFPO1FBQ0gsS0FBSztRQUNMLFFBQVE7UUFDUixNQUFNO1FBQ04sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLDZDQUE2QyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7S0FDeEYsQ0FBQztDQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
