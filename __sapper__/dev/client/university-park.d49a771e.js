import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, p as create_component, q as claim_component, r as mount_component, n as noop, u as transition_in, w as transition_out, x as destroy_component } from './client.e1ed4cb6.js';
import './PageTitle.ed659640.js';
import { P as ProjectDetailTemplate } from './ProjectDetailTemplate.22b6898f.js';

var Image1 = "/client/5a72684197e1fb7e.jpg";

var Image2 = "/client/38887b1b5658e58f.jpg";

var Image3 = "/client/0f7f14888b235284.jpg";

var Image4 = "/client/33ba7ce23fe6516a.jpg";

var Image5 = "/client/6c24d9b771a7bfec.jpg";

/* src/routes/projects/university-park.svelte generated by Svelte v3.29.7 */

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
	validate_slots("University_park", slots, []);

	let STATE = {
		metaTitle: `University Park | Front End Developer - Joshua Roper`,
		title: `University Park`,
		url: "https://www.uptexas.org/",
		description: `I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.`,
		skills: [
			"JavaScript (ES6+)",
			"jQuery",
			"API Integration",
			"AJAX / JSON",
			"SASS / SCSS",
			"CSS",
			"Foundation",
			"HTML (WCAG 2.1)",
			"Adobe Illustrator",
			"SEO",
			"Kentico (CMS)",
			"BitBucket"
		],
		images: [
			{
				src: Image1,
				alt: `The home page for the City of University Park website`,
				visible: true,
				key: 0
			},
			{
				src: Image2,
				alt: `The library page for the City of University Park website`,
				visible: false,
				key: 1
			},
			{
				src: Image3,
				alt: `The video modal on the City of University Park website`,
				visible: false,
				key: 2
			},
			{
				src: Image4,
				alt: `The direct alarm monitoring form for the City of University Park website`,
				visible: false,
				key: 3
			},
			{
				src: Image5,
				alt: `The newsletter page for the City of University Park website`,
				visible: false,
				key: 4
			}
		]
	};

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<University_park> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		ProjectDetailTemplate,
		Image1,
		Image2,
		Image3,
		Image4,
		Image5,
		STATE
	});

	$$self.$inject_state = $$props => {
		if ("STATE" in $$props) $$invalidate(0, STATE = $$props.STATE);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [STATE];
}

class University_park extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "University_park",
			options,
			id: create_fragment.name
		});
	}
}

export default University_park;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdmVyc2l0eS1wYXJrLmQ0OWE3NzFlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW1hZ2VzL3VuaXZlcnNpdHktcGFyay8xLmpwZyIsIi4uLy4uLy4uL3NyYy9pbWFnZXMvdW5pdmVyc2l0eS1wYXJrLzIuanBnIiwiLi4vLi4vLi4vc3JjL2ltYWdlcy91bml2ZXJzaXR5LXBhcmsvMy5qcGciLCIuLi8uLi8uLi9zcmMvaW1hZ2VzL3VuaXZlcnNpdHktcGFyay80LmpwZyIsIi4uLy4uLy4uL3NyYy9pbWFnZXMvdW5pdmVyc2l0eS1wYXJrLzUuanBnIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9wcm9qZWN0cy91bml2ZXJzaXR5LXBhcmsuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IFwiL2NsaWVudC81YTcyNjg0MTk3ZTFmYjdlLmpwZ1wiIiwiZXhwb3J0IGRlZmF1bHQgXCIvY2xpZW50LzM4ODg3YjFiNTY1OGU1OGYuanBnXCIiLCJleHBvcnQgZGVmYXVsdCBcIi9jbGllbnQvMGY3ZjE0ODg4YjIzNTI4NC5qcGdcIiIsImV4cG9ydCBkZWZhdWx0IFwiL2NsaWVudC8zM2JhN2NlMjNmZTY1MTZhLmpwZ1wiIiwiZXhwb3J0IGRlZmF1bHQgXCIvY2xpZW50LzZjMjRkOWI3NzFhN2JmZWMuanBnXCIiLCI8c2NyaXB0PlxuaW1wb3J0IFByb2plY3REZXRhaWxUZW1wbGF0ZSBmcm9tICcuLi8uLi9yb3V0ZS1sYXlvdXRzL1Byb2plY3REZXRhaWxUZW1wbGF0ZS5zdmVsdGUnO1xuXG5pbXBvcnQgSW1hZ2UxIGZyb20gJy4uLy4uL2ltYWdlcy91bml2ZXJzaXR5LXBhcmsvMS5qcGcnO1xuaW1wb3J0IEltYWdlMiBmcm9tICcuLi8uLi9pbWFnZXMvdW5pdmVyc2l0eS1wYXJrLzIuanBnJztcbmltcG9ydCBJbWFnZTMgZnJvbSAnLi4vLi4vaW1hZ2VzL3VuaXZlcnNpdHktcGFyay8zLmpwZyc7XG5pbXBvcnQgSW1hZ2U0IGZyb20gJy4uLy4uL2ltYWdlcy91bml2ZXJzaXR5LXBhcmsvNC5qcGcnO1xuaW1wb3J0IEltYWdlNSBmcm9tICcuLi8uLi9pbWFnZXMvdW5pdmVyc2l0eS1wYXJrLzUuanBnJztcblxubGV0IFNUQVRFID0ge1xuICAgIG1ldGFUaXRsZTogYFVuaXZlcnNpdHkgUGFyayB8IEZyb250IEVuZCBEZXZlbG9wZXIgLSBKb3NodWEgUm9wZXJgLFxuICAgIHRpdGxlOiBgVW5pdmVyc2l0eSBQYXJrYCxcbiAgICB1cmw6ICdodHRwczovL3d3dy51cHRleGFzLm9yZy8nLFxuICAgIGRlc2NyaXB0aW9uOiBgSSB3YXMgdGFza2VkIHdpdGggYmVpbmcgdGhlIDxzdHJvbmc+c29sZSBkZXZlbG9wZXI8L3N0cm9uZz4gb24gYSA8c3Ryb25nPmNvbXBsZXRlIEZyb250LUVuZCByZWRlc2lnbjwvc3Ryb25nPi4gS2VlcGluZyB0aGVpciBjdXJyZW50IHVzZXJzIGluIG1pbmQsIHRoZSBnb2FsIHdhcyB0byBtYWtlIHRoZSB3ZWJzaXRlIGZlZWwgbW9yZSBtb2Rlcm4sIGFuZCBvZmZlciBhIGJldHRlciB1c2VyIGV4cGVyaWVuY2Ugd2hlbiBuYXZpZ2F0aW5nIHRvIGVhY2ggaW5kaXZpZHVhbCBwYWdlLiBBY3Jvc3MgdGhlIGVudGlyZSBwcm9qZWN0IEkgaW1wbGVtZW50ZWQgc2V2ZXJhbCBkeW5hbWljYWxseSBnZW5lcmF0ZWQgY29udGVudCBwYWdlcyAvIHNsaWRlcnMsIDxzdHJvbmc+Zm9ybSB2ZXJpZmljYXRpb248L3N0cm9uZz4sIGFuZCBzZXZlcmFsIDxzdHJvbmc+dGhpcmQgcGFydHkgaW50ZWdyYXRpb25zPC9zdHJvbmc+LmAsXG4gICAgc2tpbGxzOiBbJ0phdmFTY3JpcHQgKEVTNispJywgJ2pRdWVyeScsICdBUEkgSW50ZWdyYXRpb24nLCAnQUpBWCAvIEpTT04nLCAnU0FTUyAvIFNDU1MnLCAnQ1NTJywgJ0ZvdW5kYXRpb24nLCAnSFRNTCAoV0NBRyAyLjEpJywgJ0Fkb2JlIElsbHVzdHJhdG9yJywgJ1NFTycsICdLZW50aWNvIChDTVMpJywgJ0JpdEJ1Y2tldCddLFxuICAgIGltYWdlczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IEltYWdlMSxcbiAgICAgICAgICAgIGFsdDogYFRoZSBob21lIHBhZ2UgZm9yIHRoZSBDaXR5IG9mIFVuaXZlcnNpdHkgUGFyayB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICBrZXk6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IEltYWdlMixcbiAgICAgICAgICAgIGFsdDogYFRoZSBsaWJyYXJ5IHBhZ2UgZm9yIHRoZSBDaXR5IG9mIFVuaXZlcnNpdHkgUGFyayB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAxLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IEltYWdlMyxcbiAgICAgICAgICAgIGFsdDogYFRoZSB2aWRlbyBtb2RhbCBvbiB0aGUgQ2l0eSBvZiBVbml2ZXJzaXR5IFBhcmsgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBJbWFnZTQsXG4gICAgICAgICAgICBhbHQ6IGBUaGUgZGlyZWN0IGFsYXJtIG1vbml0b3JpbmcgZm9ybSBmb3IgdGhlIENpdHkgb2YgVW5pdmVyc2l0eSBQYXJrIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogSW1hZ2U1LFxuICAgICAgICAgICAgYWx0OiBgVGhlIG5ld3NsZXR0ZXIgcGFnZSBmb3IgdGhlIENpdHkgb2YgVW5pdmVyc2l0eSBQYXJrIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDQsXG4gICAgICAgIH0sXG4gICAgXVxufVxuXG48L3NjcmlwdD5cblxuXG48UHJvamVjdERldGFpbFRlbXBsYXRlIFNUQVRFPXtTVEFURX0gLz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLGFBQWU7O0FDQWYsYUFBZTs7QUNBZixhQUFlOztBQ0FmLGFBQWU7O0FDQWYsYUFBZTs7Ozs7Ozs7OzZCQ3FEZSxHQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0E1Qy9CLEtBQUs7RUFDTCxTQUFTO0VBQ1QsS0FBSztFQUNMLEdBQUcsRUFBRSwwQkFBMEI7RUFDL0IsV0FBVztFQUNYLE1BQU07R0FBRyxtQkFBbUI7R0FBRSxRQUFRO0dBQUUsaUJBQWlCO0dBQUUsYUFBYTtHQUFFLGFBQWE7R0FBRSxLQUFLO0dBQUUsWUFBWTtHQUFFLGlCQUFpQjtHQUFFLG1CQUFtQjtHQUFFLEtBQUs7R0FBRSxlQUFlO0dBQUUsV0FBVzs7RUFDekwsTUFBTTs7SUFFRSxHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUc7SUFDSCxPQUFPLEVBQUUsSUFBSTtJQUNiLEdBQUcsRUFBRSxDQUFDOzs7SUFJTixHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
