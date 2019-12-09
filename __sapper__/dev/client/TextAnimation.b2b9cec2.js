import { S as SvelteComponentDev, i as init, s as safe_not_equal, e as element, t as text, c as claim_element, b as children, f as claim_text, d as detach, g as attr, h as add_location, j as insert, k as append, I as set_data, n as noop } from './index.0199b3b0.js';

/* src/components/helperComponents/TextAnimation.svelte generated by Svelte v3.9.1 */

const file = "src/components/helperComponents/TextAnimation.svelte";

function create_fragment(ctx) {
	var span, t;

	return {
		c: function create() {
			span = element("span");
			t = text(ctx.text);
			this.h();
		},

		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true }, false);
			var span_nodes = children(span);

			t = claim_text(span_nodes, ctx.text);
			span_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			attr(span, "class", "hover-animation svelte-1qap1g0");
			add_location(span, file, 31, 0, 492);
		},

		m: function mount(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},

		p: function update(changed, ctx) {
			if (changed.text) {
				set_data(t, ctx.text);
			}
		},

		i: noop,
		o: noop,

		d: function destroy(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { text } = $$props;

	const writable_props = ['text'];
	Object.keys($$props).forEach(key => {
		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<TextAnimation> was created with unknown prop '${key}'`);
	});

	$$self.$set = $$props => {
		if ('text' in $$props) $$invalidate('text', text = $$props.text);
	};

	return { text };
}

class TextAnimation extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, ["text"]);

		const { ctx } = this.$$;
		const props = options.props || {};
		if (ctx.text === undefined && !('text' in props)) {
			console.warn("<TextAnimation> was created without expected prop 'text'");
		}
	}

	get text() {
		throw new Error("<TextAnimation>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set text(value) {
		throw new Error("<TextAnimation>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export { TextAnimation as T };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dEFuaW1hdGlvbi5iMmI5Y2VjMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvaGVscGVyQ29tcG9uZW50cy9UZXh0QW5pbWF0aW9uLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuZXhwb3J0IGxldCB0ZXh0O1xuXG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG5zcGFuLmhvdmVyLWFuaW1hdGlvbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbnNwYW4uaG92ZXItYW5pbWF0aW9uOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZDtcbiAgICB3aWR0aDogMHB4O1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xMDAlKTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB0cmFuc2l0aW9uOiBhbGwgLjQ1cyBjdWJpYy1iZXppZXIoMC44NSwgMC4wOCwgMC4wOCwgMC45OSk7XG59XG5cbmE6aG92ZXIgPiBzcGFuLmhvdmVyLWFuaW1hdGlvbjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwKTtcbiAgICB3aWR0aDogMjBweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDVweDtcbn1cblxuPC9zdHlsZT5cblxuPHNwYW4gY2xhc3M9XCJob3Zlci1hbmltYXRpb25cIj57dGV4dH08L3NwYW4+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztnQkErQitCLElBQUk7Ozs7Ozs7O2tDQUFKLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUFKLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Q0E5QjVCLE1BQUksZ0JBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
