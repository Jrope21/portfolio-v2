import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, p as create_component, q as claim_component, r as mount_component, n as noop, u as transition_in, w as transition_out, x as destroy_component } from './client.27258e3d.js';
import './PageTitle.86903e52.js';
import { P as ProjectDetailTemplate } from './ProjectDetailTemplate.d209e9b4.js';

/* src/routes/projects/di-repairs.svelte generated by Svelte v3.29.7 */

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
	validate_slots("Di_repairs", slots, []);

	let STATE = {
		metaTitle: `DI Repairs | Front End Developer - Joshua Roper`,
		title: `DI Repairs`,
		url: "https://www.direpairs.com/",
		description: `As the <strong>only developer & designer</strong> on this freelance project. I completely re-envisioned the site design & built the project from the ground up as an extremely performant <strong>SSG website</strong>. I utilized development & design best practices with a focus on the <strong>user experience.</strong>`,
		skills: [
			"React",
			"Gatsby Js",
			"Node JS",
			"JavaScript (ES8)",
			"WordPress API",
			"Gravity Forms API",
			"AJAX / JSON",
			"SCSS / SCSS",
			"JSX (HTML WCAG compliant)",
			"PHP",
			"Figma"
		],
		images: [
			{
				src: "images/di-repairs/1.png",
				alt: `A call to action on the home page of the Halcyon Center Mall website`,
				visible: true,
				key: 0
			},
			{
				src: "images/di-repairs/2.png",
				alt: `The home page for Halcyon Center Mall website`,
				visible: false,
				key: 1
			},
			{
				src: "images/di-repairs/3.png",
				alt: `The dining directory page of the Halcyon Center Mall website`,
				visible: false,
				key: 2
			},
			{
				src: "images/di-repairs/4.png",
				alt: `The events directory page of the Halcyon Center Mall website`,
				visible: false,
				key: 3
			},
			{
				src: "images/di-repairs/5.png",
				alt: `A spotlight for businesses on the home page of the Halcyon Center Mall website`,
				visible: false,
				key: 4
			}
		]
	};

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Di_repairs> was created with unknown prop '${key}'`);
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

class Di_repairs extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Di_repairs",
			options,
			id: create_fragment.name
		});
	}
}

export default Di_repairs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGktcmVwYWlycy4zMTZlYTE3Zi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy9wcm9qZWN0cy9kaS1yZXBhaXJzLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuaW1wb3J0IFByb2plY3REZXRhaWxUZW1wbGF0ZSBmcm9tICcuLi8uLi9yb3V0ZS1sYXlvdXRzL1Byb2plY3REZXRhaWxUZW1wbGF0ZS5zdmVsdGUnO1xuXG5sZXQgU1RBVEUgPSB7XG4gICAgbWV0YVRpdGxlOiBgREkgUmVwYWlycyB8IEZyb250IEVuZCBEZXZlbG9wZXIgLSBKb3NodWEgUm9wZXJgLFxuICAgIHRpdGxlOiBgREkgUmVwYWlyc2AsXG4gICAgdXJsOiAnaHR0cHM6Ly93d3cuZGlyZXBhaXJzLmNvbS8nLFxuICAgIGRlc2NyaXB0aW9uOiBgQXMgdGhlIDxzdHJvbmc+b25seSBkZXZlbG9wZXIgJiBkZXNpZ25lcjwvc3Ryb25nPiBvbiB0aGlzIGZyZWVsYW5jZSBwcm9qZWN0LiBJIGNvbXBsZXRlbHkgcmUtZW52aXNpb25lZCB0aGUgc2l0ZSBkZXNpZ24gJiBidWlsdCB0aGUgcHJvamVjdCBmcm9tIHRoZSBncm91bmQgdXAgYXMgYW4gZXh0cmVtZWx5IHBlcmZvcm1hbnQgPHN0cm9uZz5TU0cgd2Vic2l0ZTwvc3Ryb25nPi4gSSB1dGlsaXplZCBkZXZlbG9wbWVudCAmIGRlc2lnbiBiZXN0IHByYWN0aWNlcyB3aXRoIGEgZm9jdXMgb24gdGhlIDxzdHJvbmc+dXNlciBleHBlcmllbmNlLjwvc3Ryb25nPmAsXG4gICAgc2tpbGxzOiBbJ1JlYWN0JywgJ0dhdHNieSBKcycsICdOb2RlIEpTJywgJ0phdmFTY3JpcHQgKEVTOCknLCAnV29yZFByZXNzIEFQSScsICdHcmF2aXR5IEZvcm1zIEFQSScsICdBSkFYIC8gSlNPTicsICdTQ1NTIC8gU0NTUycsICdKU1ggKEhUTUwgV0NBRyBjb21wbGlhbnQpJywgJ1BIUCcsICdGaWdtYSddLFxuICAgIGltYWdlczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvZGktcmVwYWlycy8xLnBuZycsXG4gICAgICAgICAgICBhbHQ6IGBBIGNhbGwgdG8gYWN0aW9uIG9uIHRoZSBob21lIHBhZ2Ugb2YgdGhlIEhhbGN5b24gQ2VudGVyIE1hbGwgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAga2V5OiAwLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvZGktcmVwYWlycy8yLnBuZycsXG4gICAgICAgICAgICBhbHQ6IGBUaGUgaG9tZSBwYWdlIGZvciBIYWxjeW9uIENlbnRlciBNYWxsIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDEsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltYWdlcy9kaS1yZXBhaXJzLzMucG5nJyxcbiAgICAgICAgICAgIGFsdDogYFRoZSBkaW5pbmcgZGlyZWN0b3J5IHBhZ2Ugb2YgdGhlIEhhbGN5b24gQ2VudGVyIE1hbGwgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2RpLXJlcGFpcnMvNC5wbmcnLFxuICAgICAgICAgICAgYWx0OiBgVGhlIGV2ZW50cyBkaXJlY3RvcnkgcGFnZSBvZiB0aGUgSGFsY3lvbiBDZW50ZXIgTWFsbCB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvZGktcmVwYWlycy81LnBuZycsXG4gICAgICAgICAgICBhbHQ6IGBBIHNwb3RsaWdodCBmb3IgYnVzaW5lc3NlcyBvbiB0aGUgaG9tZSBwYWdlIG9mIHRoZSBIYWxjeW9uIENlbnRlciBNYWxsIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDQsXG4gICAgICAgIH0sIFxuICAgIF1cbn1cblxuPC9zY3JpcHQ+XG5cblxuPFByb2plY3REZXRhaWxUZW1wbGF0ZSBTVEFURT17U1RBVEV9IC8+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OzZCQThDOEIsR0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBM0MvQixLQUFLO0VBQ0wsU0FBUztFQUNULEtBQUs7RUFDTCxHQUFHLEVBQUUsNEJBQTRCO0VBQ2pDLFdBQVc7RUFDWCxNQUFNO0dBQUcsT0FBTztHQUFFLFdBQVc7R0FBRSxTQUFTO0dBQUUsa0JBQWtCO0dBQUUsZUFBZTtHQUFFLG1CQUFtQjtHQUFFLGFBQWE7R0FBRSxhQUFhO0dBQUUsMkJBQTJCO0dBQUUsS0FBSztHQUFFLE9BQU87O0VBQzdLLE1BQU07O0lBRUUsR0FBRyxFQUFFLHlCQUF5QjtJQUM5QixHQUFHO0lBQ0gsT0FBTyxFQUFFLElBQUk7SUFDYixHQUFHLEVBQUUsQ0FBQzs7O0lBR04sR0FBRyxFQUFFLHlCQUF5QjtJQUM5QixHQUFHO0lBQ0gsT0FBTyxFQUFFLEtBQUs7SUFDZCxHQUFHLEVBQUUsQ0FBQzs7O0lBR04sR0FBRyxFQUFFLHlCQUF5QjtJQUM5QixHQUFHO0lBQ0gsT0FBTyxFQUFFLEtBQUs7SUFDZCxHQUFHLEVBQUUsQ0FBQzs7O0lBR04sR0FBRyxFQUFFLHlCQUF5QjtJQUM5QixHQUFHO0lBQ0gsT0FBTyxFQUFFLEtBQUs7SUFDZCxHQUFHLEVBQUUsQ0FBQzs7O0lBR04sR0FBRyxFQUFFLHlCQUF5QjtJQUM5QixHQUFHO0lBQ0gsT0FBTyxFQUFFLEtBQUs7SUFDZCxHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
