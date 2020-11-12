import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, p as create_component, q as claim_component, r as mount_component, n as noop, u as transition_in, w as transition_out, x as destroy_component } from './client.fdd8f153.js';
import './PageTitle.28edda76.js';
import { P as ProjectDetailTemplate } from './ProjectDetailTemplate.31d99400.js';

var Image1 = "/client/f42a805cca5f895d.png";

var Image2 = "/client/91118045dccecd4d.png";

var Image3 = "/client/9046969321388ae7.png";

var Image4 = "/client/0ffbe93b426eec5a.png";

var Image5 = "/client/19475245532930e6.png";

/* src/routes/projects/stallion.svelte generated by Svelte v3.29.7 */

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
				src: Image1,
				alt: `A call to action on the home page of the Halcyon Center Mall website`,
				visible: true,
				key: 0
			},
			{
				src: Image2,
				alt: `The home page for Halcyon Center Mall website`,
				visible: false,
				key: 1
			},
			{
				src: Image3,
				alt: `The dining directory page of the Halcyon Center Mall website`,
				visible: false,
				key: 2
			},
			{
				src: Image4,
				alt: `The events directory page of the Halcyon Center Mall website`,
				visible: false,
				key: 3
			},
			{
				src: Image5,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbGxpb24uNjM3Nzc1NDUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbWFnZXMvc3RhbGxpb24vc3RhbGxpb24tNC1taW4ucG5nIiwiLi4vLi4vLi4vc3JjL2ltYWdlcy9zdGFsbGlvbi9zdGFsbGlvbi0yLW1pbi5wbmciLCIuLi8uLi8uLi9zcmMvaW1hZ2VzL3N0YWxsaW9uL3N0YWxsaW9uLTYtbWluLnBuZyIsIi4uLy4uLy4uL3NyYy9pbWFnZXMvc3RhbGxpb24vc3RhbGxpb24tMTEtbWluLnBuZyIsIi4uLy4uLy4uL3NyYy9pbWFnZXMvc3RhbGxpb24vc3RhbGxpb24tNS1taW4ucG5nIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9wcm9qZWN0cy9zdGFsbGlvbi5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCIvY2xpZW50L2Y0MmE4MDVjY2E1Zjg5NWQucG5nXCIiLCJleHBvcnQgZGVmYXVsdCBcIi9jbGllbnQvOTExMTgwNDVkY2NlY2Q0ZC5wbmdcIiIsImV4cG9ydCBkZWZhdWx0IFwiL2NsaWVudC85MDQ2OTY5MzIxMzg4YWU3LnBuZ1wiIiwiZXhwb3J0IGRlZmF1bHQgXCIvY2xpZW50LzBmZmJlOTNiNDI2ZWVjNWEucG5nXCIiLCJleHBvcnQgZGVmYXVsdCBcIi9jbGllbnQvMTk0NzUyNDU1MzI5MzBlNi5wbmdcIiIsIjxzY3JpcHQ+XG5pbXBvcnQgUHJvamVjdERldGFpbFRlbXBsYXRlIGZyb20gJy4uLy4uL3JvdXRlLWxheW91dHMvUHJvamVjdERldGFpbFRlbXBsYXRlLnN2ZWx0ZSc7XG5cbmltcG9ydCBJbWFnZTEgZnJvbSAnLi4vLi4vaW1hZ2VzL3N0YWxsaW9uL3N0YWxsaW9uLTQtbWluLnBuZyc7XG5pbXBvcnQgSW1hZ2UyIGZyb20gJy4uLy4uL2ltYWdlcy9zdGFsbGlvbi9zdGFsbGlvbi0yLW1pbi5wbmcnO1xuaW1wb3J0IEltYWdlMyBmcm9tICcuLi8uLi9pbWFnZXMvc3RhbGxpb24vc3RhbGxpb24tNi1taW4ucG5nJztcbmltcG9ydCBJbWFnZTQgZnJvbSAnLi4vLi4vaW1hZ2VzL3N0YWxsaW9uL3N0YWxsaW9uLTExLW1pbi5wbmcnO1xuaW1wb3J0IEltYWdlNSBmcm9tICcuLi8uLi9pbWFnZXMvc3RhbGxpb24vc3RhbGxpb24tNS1taW4ucG5nJztcblxubGV0IFNUQVRFID0ge1xuICAgIG1ldGFUaXRsZTogYFN0YWxsaW9uIHwgRnJvbnQgRW5kIERldmVsb3BlciAtIEpvc2h1YSBSb3BlcmAsXG4gICAgdGl0bGU6IGBTdGFsbGlvbmAsXG4gICAgdXJsOiAnaHR0cHM6Ly93d3cuc3RhbGxpb25vaWxmaWVsZC5jb20vJyxcbiAgICBkZXNjcmlwdGlvbjogYEFzIHRoZSA8c3Ryb25nPkxlYWQgRnJvbnQgRW5kIERldmVsb3Blcjwvc3Ryb25nPiBvbiBhIDxzdHJvbmc+Y29tcGxldGUgd2Vic2l0ZSByZWJ1aWxkPC9zdHJvbmc+LCBJIHdvcmtlZCB0b3dhcmRzIGVudmlzaW9uaW5nIGEgd2Vic2l0ZSB0aGF0IHdvdWxkIG1hdGNoIHRoZWlyIGlubm92YXRpdmUgU3RhbGxpb24gYXR0aXR1ZGUuIFRoZSBwcm9qZWN0IHdhcyBidWlsdCB3aXRoIGFuIDxzdHJvbmc+ZW1waGFzaXM8L3N0cm9uZz4gb24gPHN0cm9uZz5jbGVhbiBjb2RlPC9zdHJvbmc+LCBhbmQgPHN0cm9uZz5tb2R1bGFyaXR5Ljwvc3Ryb25nPiBUaGUgd2Vic2l0ZSBpbmNsdWRlcyBtdWx0aXBsZSBBUEnigJlzLCBmb3JtIHZlcmlmaWNhdGlvbiwgYW5kIG90aGVyIGFkdmFuY2VkIG1vZHVsZXMuYCxcbiAgICBza2lsbHM6IFsnSmF2YVNjcmlwdCAoRVM2KScsICdqUXVlcnknLCAnQVBJIEludGVncmF0aW9uJywgJ1dlYlBhY2snLCAnQUpBWCAvIEpTT04nLCAnU0FTUyAvIFNDU1MnLCAnUG9zdENTUycsICdGb3VuZGF0aW9uJywgJ1B1cmdlQ1NTJywgJ0NTUycsICdIVE1MIChXQ0FHIDIuMSknLCAnUEhQJywgJ1dvcmRQcmVzcycsICdBZG9iZSBYRCddLFxuICAgIGltYWdlczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IEltYWdlMSxcbiAgICAgICAgICAgIGFsdDogYEEgY2FsbCB0byBhY3Rpb24gb24gdGhlIGhvbWUgcGFnZSBvZiB0aGUgSGFsY3lvbiBDZW50ZXIgTWFsbCB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICBrZXk6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogSW1hZ2UyLFxuICAgICAgICAgICAgYWx0OiBgVGhlIGhvbWUgcGFnZSBmb3IgSGFsY3lvbiBDZW50ZXIgTWFsbCB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAxLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IEltYWdlMyxcbiAgICAgICAgICAgIGFsdDogYFRoZSBkaW5pbmcgZGlyZWN0b3J5IHBhZ2Ugb2YgdGhlIEhhbGN5b24gQ2VudGVyIE1hbGwgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBJbWFnZTQsXG4gICAgICAgICAgICBhbHQ6IGBUaGUgZXZlbnRzIGRpcmVjdG9yeSBwYWdlIG9mIHRoZSBIYWxjeW9uIENlbnRlciBNYWxsIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogSW1hZ2U1LFxuICAgICAgICAgICAgYWx0OiBgQSBzcG90bGlnaHQgZm9yIGJ1c2luZXNzZXMgb24gdGhlIGhvbWUgcGFnZSBvZiB0aGUgSGFsY3lvbiBDZW50ZXIgTWFsbCB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiA0LFxuICAgICAgICB9LCBcbiAgICBdXG59XG5cbjwvc2NyaXB0PlxuXG5cbjxQcm9qZWN0RGV0YWlsVGVtcGxhdGUgU1RBVEU9e1NUQVRFfSAvPiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsYUFBZTs7QUNBZixhQUFlOztBQ0FmLGFBQWU7O0FDQWYsYUFBZTs7QUNBZixhQUFlOzs7Ozs7Ozs7NkJDb0RlLEdBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTNDL0IsS0FBSztFQUNMLFNBQVM7RUFDVCxLQUFLO0VBQ0wsR0FBRyxFQUFFLG1DQUFtQztFQUN4QyxXQUFXO0VBQ1gsTUFBTTtHQUFHLGtCQUFrQjtHQUFFLFFBQVE7R0FBRSxpQkFBaUI7R0FBRSxTQUFTO0dBQUUsYUFBYTtHQUFFLGFBQWE7R0FBRSxTQUFTO0dBQUUsWUFBWTtHQUFFLFVBQVU7R0FBRSxLQUFLO0dBQUUsaUJBQWlCO0dBQUUsS0FBSztHQUFFLFdBQVc7R0FBRSxVQUFVOztFQUNoTSxNQUFNOztJQUVFLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRztJQUNILE9BQU8sRUFBRSxJQUFJO0lBQ2IsR0FBRyxFQUFFLENBQUM7OztJQUdOLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRztJQUNILE9BQU8sRUFBRSxLQUFLO0lBQ2QsR0FBRyxFQUFFLENBQUM7OztJQUdOLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRztJQUNILE9BQU8sRUFBRSxLQUFLO0lBQ2QsR0FBRyxFQUFFLENBQUM7OztJQUdOLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRztJQUNILE9BQU8sRUFBRSxLQUFLO0lBQ2QsR0FBRyxFQUFFLENBQUM7OztJQUdOLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRztJQUNILE9BQU8sRUFBRSxLQUFLO0lBQ2QsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
