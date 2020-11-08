import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, p as create_component, q as claim_component, r as mount_component, n as noop, u as transition_in, w as transition_out, x as destroy_component } from './client.a1fd0a9a.js';
import { P as ProjectDetailTemplate } from './ProjectDetailTemplate.7c48f243.js';

/* src/routes/projects/stallion.svelte generated by Svelte v3.29.4 */

function create_fragment(ctx) {
	let projectdetailtemplate;
	let current;

	projectdetailtemplate = new ProjectDetailTemplate({
			props: { STATE: /*STATE*/ ctx[0] },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(projectdetailtemplate.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(projectdetailtemplate.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(projectdetailtemplate, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(projectdetailtemplate.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(projectdetailtemplate.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(projectdetailtemplate, detaching);
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
	validate_slots("Stallion", slots, []);

	let STATE = {
		metaTitle: `Stallion | Front End Developer - Joshua Roper`,
		title: `Stallion`,
		url: "https://www.stallionoilfield.com/",
		description: `As the <strong>Lead Front End Developer</strong> on a <strong>complete website rebuild</strong>, I worked towards envisioning a website that would match their innovative Stallion attitude. The project was built with an <strong>emphasis</strong> on <strong>clean code</strong>, and <strong>modularity.</strong> The website includes multiple API’s, form verification, and other advanced modules.`,
		skills: [
			"JavaScript (ES6)",
			"jQuery",
			"API Integration",
			"WebPack",
			"AJAX / JSON",
			"SASS / SCSS",
			"PostCSS",
			"Foundation",
			"PurgeCSS",
			"CSS",
			"HTML (WCAG 2.1)",
			"PHP",
			"WordPress",
			"Adobe XD"
		],
		images: [
			{
				src: "images/stallion/stallion-4-min.png",
				alt: `A call to action on the home page of the Halcyon Center Mall website`,
				visible: true,
				key: 0
			},
			{
				src: "images/stallion/stallion-2-min.png",
				alt: `The home page for Halcyon Center Mall website`,
				visible: false,
				key: 1
			},
			{
				src: "images/stallion/stallion-6-min.png",
				alt: `The dining directory page of the Halcyon Center Mall website`,
				visible: false,
				key: 2
			},
			{
				src: "images/stallion/stallion-11-min.png",
				alt: `The events directory page of the Halcyon Center Mall website`,
				visible: false,
				key: 3
			},
			{
				src: "images/stallion/stallion-5-min.png",
				alt: `A spotlight for businesses on the home page of the Halcyon Center Mall website`,
				visible: false,
				key: 4
			}
		]
	};

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Stallion> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ ProjectDetailTemplate, STATE });

	$$self.$inject_state = $$props => {
		if ("STATE" in $$props) $$invalidate(0, STATE = $$props.STATE);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [STATE];
}

class Stallion extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Stallion",
			options,
			id: create_fragment.name
		});
	}
}

export default Stallion;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbGxpb24uNWVlMDY3NWIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvcHJvamVjdHMvc3RhbGxpb24uc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG5pbXBvcnQgUHJvamVjdERldGFpbFRlbXBsYXRlIGZyb20gJy4uLy4uL3JvdXRlLWxheW91dHMvUHJvamVjdERldGFpbFRlbXBsYXRlLnN2ZWx0ZSc7XG5cbmxldCBTVEFURSA9IHtcbiAgICBtZXRhVGl0bGU6IGBTdGFsbGlvbiB8IEZyb250IEVuZCBEZXZlbG9wZXIgLSBKb3NodWEgUm9wZXJgLFxuICAgIHRpdGxlOiBgU3RhbGxpb25gLFxuICAgIHVybDogJ2h0dHBzOi8vd3d3LnN0YWxsaW9ub2lsZmllbGQuY29tLycsXG4gICAgZGVzY3JpcHRpb246IGBBcyB0aGUgPHN0cm9uZz5MZWFkIEZyb250IEVuZCBEZXZlbG9wZXI8L3N0cm9uZz4gb24gYSA8c3Ryb25nPmNvbXBsZXRlIHdlYnNpdGUgcmVidWlsZDwvc3Ryb25nPiwgSSB3b3JrZWQgdG93YXJkcyBlbnZpc2lvbmluZyBhIHdlYnNpdGUgdGhhdCB3b3VsZCBtYXRjaCB0aGVpciBpbm5vdmF0aXZlIFN0YWxsaW9uIGF0dGl0dWRlLiBUaGUgcHJvamVjdCB3YXMgYnVpbHQgd2l0aCBhbiA8c3Ryb25nPmVtcGhhc2lzPC9zdHJvbmc+IG9uIDxzdHJvbmc+Y2xlYW4gY29kZTwvc3Ryb25nPiwgYW5kIDxzdHJvbmc+bW9kdWxhcml0eS48L3N0cm9uZz4gVGhlIHdlYnNpdGUgaW5jbHVkZXMgbXVsdGlwbGUgQVBJ4oCZcywgZm9ybSB2ZXJpZmljYXRpb24sIGFuZCBvdGhlciBhZHZhbmNlZCBtb2R1bGVzLmAsXG4gICAgc2tpbGxzOiBbJ0phdmFTY3JpcHQgKEVTNiknLCAnalF1ZXJ5JywgJ0FQSSBJbnRlZ3JhdGlvbicsICdXZWJQYWNrJywgJ0FKQVggLyBKU09OJywgJ1NBU1MgLyBTQ1NTJywgJ1Bvc3RDU1MnLCAnRm91bmRhdGlvbicsICdQdXJnZUNTUycsICdDU1MnLCAnSFRNTCAoV0NBRyAyLjEpJywgJ1BIUCcsICdXb3JkUHJlc3MnLCAnQWRvYmUgWEQnXSxcbiAgICBpbWFnZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL3N0YWxsaW9uL3N0YWxsaW9uLTQtbWluLnBuZycsXG4gICAgICAgICAgICBhbHQ6IGBBIGNhbGwgdG8gYWN0aW9uIG9uIHRoZSBob21lIHBhZ2Ugb2YgdGhlIEhhbGN5b24gQ2VudGVyIE1hbGwgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAga2V5OiAwLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvc3RhbGxpb24vc3RhbGxpb24tMi1taW4ucG5nJyxcbiAgICAgICAgICAgIGFsdDogYFRoZSBob21lIHBhZ2UgZm9yIEhhbGN5b24gQ2VudGVyIE1hbGwgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL3N0YWxsaW9uL3N0YWxsaW9uLTYtbWluLnBuZycsXG4gICAgICAgICAgICBhbHQ6IGBUaGUgZGluaW5nIGRpcmVjdG9yeSBwYWdlIG9mIHRoZSBIYWxjeW9uIENlbnRlciBNYWxsIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltYWdlcy9zdGFsbGlvbi9zdGFsbGlvbi0xMS1taW4ucG5nJyxcbiAgICAgICAgICAgIGFsdDogYFRoZSBldmVudHMgZGlyZWN0b3J5IHBhZ2Ugb2YgdGhlIEhhbGN5b24gQ2VudGVyIE1hbGwgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL3N0YWxsaW9uL3N0YWxsaW9uLTUtbWluLnBuZycsXG4gICAgICAgICAgICBhbHQ6IGBBIHNwb3RsaWdodCBmb3IgYnVzaW5lc3NlcyBvbiB0aGUgaG9tZSBwYWdlIG9mIHRoZSBIYWxjeW9uIENlbnRlciBNYWxsIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDQsXG4gICAgICAgIH0sIFxuICAgIF1cbn1cblxuPC9zY3JpcHQ+XG5cblxuPFByb2plY3REZXRhaWxUZW1wbGF0ZSBTVEFURT17U1RBVEV9IC8+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7NkJBOEM4QixHQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0EzQy9CLEtBQUs7RUFDTCxTQUFTO0VBQ1QsS0FBSztFQUNMLEdBQUcsRUFBRSxtQ0FBbUM7RUFDeEMsV0FBVztFQUNYLE1BQU07R0FBRyxrQkFBa0I7R0FBRSxRQUFRO0dBQUUsaUJBQWlCO0dBQUUsU0FBUztHQUFFLGFBQWE7R0FBRSxhQUFhO0dBQUUsU0FBUztHQUFFLFlBQVk7R0FBRSxVQUFVO0dBQUUsS0FBSztHQUFFLGlCQUFpQjtHQUFFLEtBQUs7R0FBRSxXQUFXO0dBQUUsVUFBVTs7RUFDaE0sTUFBTTs7SUFFRSxHQUFHLEVBQUUsb0NBQW9DO0lBQ3pDLEdBQUc7SUFDSCxPQUFPLEVBQUUsSUFBSTtJQUNiLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUsb0NBQW9DO0lBQ3pDLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUsb0NBQW9DO0lBQ3pDLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUscUNBQXFDO0lBQzFDLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUsb0NBQW9DO0lBQ3pDLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
