import { S as SvelteComponentDev, i as init, s as safe_not_equal, o as create_slot, p as get_slot_changes, q as get_slot_context, r as transition_in, w as transition_out } from './index.d872f164.js';

/* src/routes/PageTransition.svelte generated by Svelte v3.9.1 */

function create_fragment(ctx) {
	var current;

	const default_slot_template = ctx.$$slots.default;
	const default_slot = create_slot(default_slot_template, ctx, null);

	return {
		c: function create() {
			if (default_slot) default_slot.c();
		},

		l: function claim(nodes) {
			if (default_slot) default_slot.l(nodes);
		},

		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
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
			current = true;
		},

		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},

		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnZVRyYW5zaXRpb24uNzkxNWFhMzMuanMiLCJzb3VyY2VzIjpbXSwic291cmNlc0NvbnRlbnQiOltdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
