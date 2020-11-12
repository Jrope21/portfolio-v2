import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, p as create_component, q as claim_component, r as mount_component, n as noop, u as transition_in, w as transition_out, x as destroy_component } from './client.70edd259.js';
import './PageTitle.e33713d6.js';
import { P as ProjectDetailTemplate } from './ProjectDetailTemplate.a87e88c1.js';

/* src/routes/projects/halcyon.svelte generated by Svelte v3.29.7 */

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
	validate_slots("Halcyon", slots, []);

	let STATE = {
		metaTitle: `Halcyon | Front End Developer - Joshua Roper`,
		title: `Halcyon`,
		url: "https://www.visithalcyon.com/",
		description: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`,
		skills: [
			"React",
			"React Static",
			"JavaScript (ES6)",
			"WordPress REST API",
			"iShowtimes API",
			`Google API's`,
			"AJAX / JSON",
			"Bootstrap (React Bootstrap)",
			"SCSS / SCSS",
			"PostCSS",
			"JSX (HTML WCAG 2.1)",
			"PHP",
			"WordPress",
			"Adobe XD"
		],
		images: [
			{
				src: "images/halcyon/home-cta-min.png",
				alt: `A call to action on the home page of the Halcyon Center Mall website`,
				visible: true,
				key: 0
			},
			{
				src: "images/halcyon/home-min.png",
				alt: `The home page for Halcyon Center Mall website`,
				visible: false,
				key: 1
			},
			{
				src: "images/halcyon/dining-min.png",
				alt: `The dining directory page of the Halcyon Center Mall website`,
				visible: false,
				key: 2
			},
			{
				src: "images/halcyon/events-min.png",
				alt: `The events directory page of the Halcyon Center Mall website`,
				visible: false,
				key: 3
			},
			{
				src: "images/halcyon/spotlight-min.png",
				alt: `A spotlight for businesses on the home page of the Halcyon Center Mall website`,
				visible: false,
				key: 4
			}
		]
	};

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Halcyon> was created with unknown prop '${key}'`);
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

class Halcyon extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Halcyon",
			options,
			id: create_fragment.name
		});
	}
}

export default Halcyon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFsY3lvbi5lZTRmZmM5NS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy9wcm9qZWN0cy9oYWxjeW9uLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuaW1wb3J0IFByb2plY3REZXRhaWxUZW1wbGF0ZSBmcm9tICcuLi8uLi9yb3V0ZS1sYXlvdXRzL1Byb2plY3REZXRhaWxUZW1wbGF0ZS5zdmVsdGUnO1xuXG5sZXQgU1RBVEUgPSB7XG4gICAgbWV0YVRpdGxlOiBgSGFsY3lvbiB8IEZyb250IEVuZCBEZXZlbG9wZXIgLSBKb3NodWEgUm9wZXJgLFxuICAgIHRpdGxlOiBgSGFsY3lvbmAsXG4gICAgdXJsOiAnaHR0cHM6Ly93d3cudmlzaXRoYWxjeW9uLmNvbS8nLFxuICAgIGRlc2NyaXB0aW9uOiBgSSB3YXMgb25lIG9mIHRoZSBGcm9udCBFbmQgRGV2ZWxvcGVycyBvbiB0aGUgcHJvamVjdCBwcmltYXJpbHkgdGFza2VkIHdpdGggY3JlYXRpbmcgdGhlIG1vdmllcyBwYWdlIGFuZCBldmVudHMgZGlyZWN0b3J5LiBBY3Jvc3MgdGhlIHByb2plY3QgSSB3b3JrZWQgd2l0aCA8c3Ryb25nPm11bHRpcGxlIEFQSeKAmXM8L3N0cm9uZz4sIDxzdHJvbmc+UmVhY3QgU3RhdGljPC9zdHJvbmc+LCBhbmQgZGV2ZWxvcGVkIDxzdHJvbmc+Y2xlYW4gY29kZTwvc3Ryb25nPiBmb3Igb3RoZXIgYWR2YW5jZWQgUmVhY3QgY29tcG9uZW50cy5gLFxuICAgIHNraWxsczogWydSZWFjdCcsICdSZWFjdCBTdGF0aWMnLCAnSmF2YVNjcmlwdCAoRVM2KScsICdXb3JkUHJlc3MgUkVTVCBBUEknLCAnaVNob3d0aW1lcyBBUEknLCBgR29vZ2xlIEFQSSdzYCwgJ0FKQVggLyBKU09OJywgJ0Jvb3RzdHJhcCAoUmVhY3QgQm9vdHN0cmFwKScsICdTQ1NTIC8gU0NTUycsICdQb3N0Q1NTJywgJ0pTWCAoSFRNTCBXQ0FHIDIuMSknLCAnUEhQJywgJ1dvcmRQcmVzcycsICdBZG9iZSBYRCddLFxuICAgIGltYWdlczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvaGFsY3lvbi9ob21lLWN0YS1taW4ucG5nJyxcbiAgICAgICAgICAgIGFsdDogYEEgY2FsbCB0byBhY3Rpb24gb24gdGhlIGhvbWUgcGFnZSBvZiB0aGUgSGFsY3lvbiBDZW50ZXIgTWFsbCB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICBrZXk6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltYWdlcy9oYWxjeW9uL2hvbWUtbWluLnBuZycsXG4gICAgICAgICAgICBhbHQ6IGBUaGUgaG9tZSBwYWdlIGZvciBIYWxjeW9uIENlbnRlciBNYWxsIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDEsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltYWdlcy9oYWxjeW9uL2RpbmluZy1taW4ucG5nJyxcbiAgICAgICAgICAgIGFsdDogYFRoZSBkaW5pbmcgZGlyZWN0b3J5IHBhZ2Ugb2YgdGhlIEhhbGN5b24gQ2VudGVyIE1hbGwgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2hhbGN5b24vZXZlbnRzLW1pbi5wbmcnLFxuICAgICAgICAgICAgYWx0OiBgVGhlIGV2ZW50cyBkaXJlY3RvcnkgcGFnZSBvZiB0aGUgSGFsY3lvbiBDZW50ZXIgTWFsbCB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvaGFsY3lvbi9zcG90bGlnaHQtbWluLnBuZycsXG4gICAgICAgICAgICBhbHQ6IGBBIHNwb3RsaWdodCBmb3IgYnVzaW5lc3NlcyBvbiB0aGUgaG9tZSBwYWdlIG9mIHRoZSBIYWxjeW9uIENlbnRlciBNYWxsIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDQsXG4gICAgICAgIH0sIFxuICAgIF1cbn1cblxuPC9zY3JpcHQ+XG5cblxuPFByb2plY3REZXRhaWxUZW1wbGF0ZSBTVEFURT17U1RBVEV9IC8+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OzZCQThDOEIsR0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBM0MvQixLQUFLO0VBQ0wsU0FBUztFQUNULEtBQUs7RUFDTCxHQUFHLEVBQUUsK0JBQStCO0VBQ3BDLFdBQVc7RUFDWCxNQUFNO0dBQUcsT0FBTztHQUFFLGNBQWM7R0FBRSxrQkFBa0I7R0FBRSxvQkFBb0I7R0FBRSxnQkFBZ0I7O0dBQWtCLGFBQWE7R0FBRSw2QkFBNkI7R0FBRSxhQUFhO0dBQUUsU0FBUztHQUFFLHFCQUFxQjtHQUFFLEtBQUs7R0FBRSxXQUFXO0dBQUUsVUFBVTs7RUFDM08sTUFBTTs7SUFFRSxHQUFHLEVBQUUsaUNBQWlDO0lBQ3RDLEdBQUc7SUFDSCxPQUFPLEVBQUUsSUFBSTtJQUNiLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUsNkJBQTZCO0lBQ2xDLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUsK0JBQStCO0lBQ3BDLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUsK0JBQStCO0lBQ3BDLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUsa0NBQWtDO0lBQ3ZDLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
