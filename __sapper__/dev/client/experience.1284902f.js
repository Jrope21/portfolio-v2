import { S as SvelteComponentDev, i as init, s as safe_not_equal, a as space, e as element, f as claim_text, c as claim_element, b as children, d as detach, g as attr, h as add_location, j as insert, z as mount_component, k as append, n as noop, u as transition_in, x as transition_out, A as destroy_component } from './index.0199b3b0.js';
import './TextAnimation.0dd8326f.js';
import { H as Hero, P as Projects } from './Projects.7755e89d.js';

/* src/routes/experience.svelte generated by Svelte v3.9.1 */

const file = "src/routes/experience.svelte";

function create_fragment(ctx) {
	var t0, div, t1, current;

	var hero = new Hero({ $$inline: true });

	var projects = new Projects({ $$inline: true });

	return {
		c: function create() {
			t0 = space();
			div = element("div");
			hero.$$.fragment.c();
			t1 = space();
			projects.$$.fragment.c();
			this.h();
		},

		l: function claim(nodes) {
			t0 = claim_text(nodes, "\n\n");

			div = claim_element(nodes, "DIV", { class: true }, false);
			var div_nodes = children(div);

			hero.$$.fragment.l(div_nodes);
			t1 = claim_text(div_nodes, "\n    ");
			projects.$$.fragment.l(div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			document.title = "Home | Front End Developer - Joshua Roper";
			attr(div, "class", "container svelte-rig25y");
			add_location(div, file, 19, 0, 319);
		},

		m: function mount(target, anchor) {
			insert(target, t0, anchor);
			insert(target, div, anchor);
			mount_component(hero, div, null);
			append(div, t1);
			mount_component(projects, div, null);
			current = true;
		},

		p: noop,

		i: function intro(local) {
			if (current) return;
			transition_in(hero.$$.fragment, local);

			transition_in(projects.$$.fragment, local);

			current = true;
		},

		o: function outro(local) {
			transition_out(hero.$$.fragment, local);
			transition_out(projects.$$.fragment, local);
			current = false;
		},

		d: function destroy(detaching) {
			if (detaching) {
				detach(t0);
				detach(div);
			}

			destroy_component(hero);

			destroy_component(projects);
		}
	};
}

class Experience extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, null, create_fragment, safe_not_equal, []);
	}
}

export default Experience;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwZXJpZW5jZS4xMjg0OTAyZi5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9