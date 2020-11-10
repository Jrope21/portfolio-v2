import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, p as create_component, q as claim_component, r as mount_component, n as noop, u as transition_in, w as transition_out, x as destroy_component } from './client.70ea3bc9.js';
import './PageTitle.1cb74a6c.js';
import { P as ProjectDetailTemplate } from './ProjectDetailTemplate.5e583ffe.js';

/* src/routes/projects/di-repairs.svelte generated by Svelte v3.29.4 */

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
		description: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGktcmVwYWlycy44NDg0MTViOC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy9wcm9qZWN0cy9kaS1yZXBhaXJzLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuaW1wb3J0IFByb2plY3REZXRhaWxUZW1wbGF0ZSBmcm9tICcuLi8uLi9yb3V0ZS1sYXlvdXRzL1Byb2plY3REZXRhaWxUZW1wbGF0ZS5zdmVsdGUnO1xuXG5sZXQgU1RBVEUgPSB7XG4gICAgbWV0YVRpdGxlOiBgREkgUmVwYWlycyB8IEZyb250IEVuZCBEZXZlbG9wZXIgLSBKb3NodWEgUm9wZXJgLFxuICAgIHRpdGxlOiBgREkgUmVwYWlyc2AsXG4gICAgdXJsOiAnaHR0cHM6Ly93d3cuZGlyZXBhaXJzLmNvbS8nLFxuICAgIGRlc2NyaXB0aW9uOiBgSSB3YXMgb25lIG9mIHRoZSBGcm9udCBFbmQgRGV2ZWxvcGVycyBvbiB0aGUgcHJvamVjdCBwcmltYXJpbHkgdGFza2VkIHdpdGggY3JlYXRpbmcgdGhlIG1vdmllcyBwYWdlIGFuZCBldmVudHMgZGlyZWN0b3J5LiBBY3Jvc3MgdGhlIHByb2plY3QgSSB3b3JrZWQgd2l0aCA8c3Ryb25nPm11bHRpcGxlIEFQSeKAmXM8L3N0cm9uZz4sIDxzdHJvbmc+UmVhY3QgU3RhdGljPC9zdHJvbmc+LCBhbmQgZGV2ZWxvcGVkIDxzdHJvbmc+Y2xlYW4gY29kZTwvc3Ryb25nPiBmb3Igb3RoZXIgYWR2YW5jZWQgUmVhY3QgY29tcG9uZW50cy5gLFxuICAgIHNraWxsczogWydSZWFjdCcsICdHYXRzYnkgSnMnLCAnTm9kZSBKUycsICdKYXZhU2NyaXB0IChFUzgpJywgJ1dvcmRQcmVzcyBBUEknLCAnR3Jhdml0eSBGb3JtcyBBUEknLCAnQUpBWCAvIEpTT04nLCAnU0NTUyAvIFNDU1MnLCAnSlNYIChIVE1MIFdDQUcgY29tcGxpYW50KScsICdQSFAnLCAnRmlnbWEnXSxcbiAgICBpbWFnZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2RpLXJlcGFpcnMvMS5wbmcnLFxuICAgICAgICAgICAgYWx0OiBgQSBjYWxsIHRvIGFjdGlvbiBvbiB0aGUgaG9tZSBwYWdlIG9mIHRoZSBIYWxjeW9uIENlbnRlciBNYWxsIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGtleTogMCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2RpLXJlcGFpcnMvMi5wbmcnLFxuICAgICAgICAgICAgYWx0OiBgVGhlIGhvbWUgcGFnZSBmb3IgSGFsY3lvbiBDZW50ZXIgTWFsbCB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAxLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvZGktcmVwYWlycy8zLnBuZycsXG4gICAgICAgICAgICBhbHQ6IGBUaGUgZGluaW5nIGRpcmVjdG9yeSBwYWdlIG9mIHRoZSBIYWxjeW9uIENlbnRlciBNYWxsIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltYWdlcy9kaS1yZXBhaXJzLzQucG5nJyxcbiAgICAgICAgICAgIGFsdDogYFRoZSBldmVudHMgZGlyZWN0b3J5IHBhZ2Ugb2YgdGhlIEhhbGN5b24gQ2VudGVyIE1hbGwgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2RpLXJlcGFpcnMvNS5wbmcnLFxuICAgICAgICAgICAgYWx0OiBgQSBzcG90bGlnaHQgZm9yIGJ1c2luZXNzZXMgb24gdGhlIGhvbWUgcGFnZSBvZiB0aGUgSGFsY3lvbiBDZW50ZXIgTWFsbCB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiA0LFxuICAgICAgICB9LCBcbiAgICBdXG59XG5cbjwvc2NyaXB0PlxuXG5cbjxQcm9qZWN0RGV0YWlsVGVtcGxhdGUgU1RBVEU9e1NUQVRFfSAvPiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs2QkE4QzhCLEdBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTNDL0IsS0FBSztFQUNMLFNBQVM7RUFDVCxLQUFLO0VBQ0wsR0FBRyxFQUFFLDRCQUE0QjtFQUNqQyxXQUFXO0VBQ1gsTUFBTTtHQUFHLE9BQU87R0FBRSxXQUFXO0dBQUUsU0FBUztHQUFFLGtCQUFrQjtHQUFFLGVBQWU7R0FBRSxtQkFBbUI7R0FBRSxhQUFhO0dBQUUsYUFBYTtHQUFFLDJCQUEyQjtHQUFFLEtBQUs7R0FBRSxPQUFPOztFQUM3SyxNQUFNOztJQUVFLEdBQUcsRUFBRSx5QkFBeUI7SUFDOUIsR0FBRztJQUNILE9BQU8sRUFBRSxJQUFJO0lBQ2IsR0FBRyxFQUFFLENBQUM7OztJQUdOLEdBQUcsRUFBRSx5QkFBeUI7SUFDOUIsR0FBRztJQUNILE9BQU8sRUFBRSxLQUFLO0lBQ2QsR0FBRyxFQUFFLENBQUM7OztJQUdOLEdBQUcsRUFBRSx5QkFBeUI7SUFDOUIsR0FBRztJQUNILE9BQU8sRUFBRSxLQUFLO0lBQ2QsR0FBRyxFQUFFLENBQUM7OztJQUdOLEdBQUcsRUFBRSx5QkFBeUI7SUFDOUIsR0FBRztJQUNILE9BQU8sRUFBRSxLQUFLO0lBQ2QsR0FBRyxFQUFFLENBQUM7OztJQUdOLEdBQUcsRUFBRSx5QkFBeUI7SUFDOUIsR0FBRztJQUNILE9BQU8sRUFBRSxLQUFLO0lBQ2QsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
