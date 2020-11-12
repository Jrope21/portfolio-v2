import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, c as create_component, f as claim_component, m as mount_component, n as noop, t as transition_in, p as transition_out, q as destroy_component } from './client.6c13edbd.js';
import './PageTitle.4d8767b0.js';
import { P as ProjectDetailTemplate } from './ProjectDetailTemplate.9c904ce2.js';

var Image1 = "/client/c36d417e73041b35.png";

var Image2 = "/client/7eef38ec5e1550c7.png";

var Image3 = "/client/4bfd856339d3a051.png";

var Image4 = "/client/458ca59359de210b.png";

var Image5 = "/client/5f954973dc82b589.png";

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
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Halcyon> was created with unknown prop '${key}'`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFsY3lvbi5iMThlNjZmNC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ltYWdlcy9oYWxjeW9uL2hvbWUtY3RhLW1pbi5wbmciLCIuLi8uLi8uLi9zcmMvaW1hZ2VzL2hhbGN5b24vaG9tZS1taW4ucG5nIiwiLi4vLi4vLi4vc3JjL2ltYWdlcy9oYWxjeW9uL2RpbmluZy1taW4ucG5nIiwiLi4vLi4vLi4vc3JjL2ltYWdlcy9oYWxjeW9uL2V2ZW50cy1taW4ucG5nIiwiLi4vLi4vLi4vc3JjL2ltYWdlcy9oYWxjeW9uL3Nwb3RsaWdodC1taW4ucG5nIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9wcm9qZWN0cy9oYWxjeW9uLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcIi9jbGllbnQvYzM2ZDQxN2U3MzA0MWIzNS5wbmdcIiIsImV4cG9ydCBkZWZhdWx0IFwiL2NsaWVudC83ZWVmMzhlYzVlMTU1MGM3LnBuZ1wiIiwiZXhwb3J0IGRlZmF1bHQgXCIvY2xpZW50LzRiZmQ4NTYzMzlkM2EwNTEucG5nXCIiLCJleHBvcnQgZGVmYXVsdCBcIi9jbGllbnQvNDU4Y2E1OTM1OWRlMjEwYi5wbmdcIiIsImV4cG9ydCBkZWZhdWx0IFwiL2NsaWVudC81Zjk1NDk3M2RjODJiNTg5LnBuZ1wiIiwiPHNjcmlwdD5cbmltcG9ydCBQcm9qZWN0RGV0YWlsVGVtcGxhdGUgZnJvbSAnLi4vLi4vcm91dGUtbGF5b3V0cy9Qcm9qZWN0RGV0YWlsVGVtcGxhdGUuc3ZlbHRlJztcblxuaW1wb3J0IEltYWdlMSBmcm9tICcuLi8uLi9pbWFnZXMvaGFsY3lvbi9ob21lLWN0YS1taW4ucG5nJztcbmltcG9ydCBJbWFnZTIgZnJvbSAnLi4vLi4vaW1hZ2VzL2hhbGN5b24vaG9tZS1taW4ucG5nJztcbmltcG9ydCBJbWFnZTMgZnJvbSAnLi4vLi4vaW1hZ2VzL2hhbGN5b24vZGluaW5nLW1pbi5wbmcnO1xuaW1wb3J0IEltYWdlNCBmcm9tICcuLi8uLi9pbWFnZXMvaGFsY3lvbi9ldmVudHMtbWluLnBuZyc7XG5pbXBvcnQgSW1hZ2U1IGZyb20gJy4uLy4uL2ltYWdlcy9oYWxjeW9uL3Nwb3RsaWdodC1taW4ucG5nJztcblxubGV0IFNUQVRFID0ge1xuICAgIG1ldGFUaXRsZTogYEhhbGN5b24gfCBGcm9udCBFbmQgRGV2ZWxvcGVyIC0gSm9zaHVhIFJvcGVyYCxcbiAgICB0aXRsZTogYEhhbGN5b25gLFxuICAgIHVybDogJ2h0dHBzOi8vd3d3LnZpc2l0aGFsY3lvbi5jb20vJyxcbiAgICBkZXNjcmlwdGlvbjogYEkgd2FzIG9uZSBvZiB0aGUgRnJvbnQgRW5kIERldmVsb3BlcnMgb24gdGhlIHByb2plY3QgcHJpbWFyaWx5IHRhc2tlZCB3aXRoIGNyZWF0aW5nIHRoZSBtb3ZpZXMgcGFnZSBhbmQgZXZlbnRzIGRpcmVjdG9yeS4gQWNyb3NzIHRoZSBwcm9qZWN0IEkgd29ya2VkIHdpdGggPHN0cm9uZz5tdWx0aXBsZSBBUEnigJlzPC9zdHJvbmc+LCA8c3Ryb25nPlJlYWN0IFN0YXRpYzwvc3Ryb25nPiwgYW5kIGRldmVsb3BlZCA8c3Ryb25nPmNsZWFuIGNvZGU8L3N0cm9uZz4gZm9yIG90aGVyIGFkdmFuY2VkIFJlYWN0IGNvbXBvbmVudHMuYCxcbiAgICBza2lsbHM6IFsnUmVhY3QnLCAnUmVhY3QgU3RhdGljJywgJ0phdmFTY3JpcHQgKEVTNiknLCAnV29yZFByZXNzIFJFU1QgQVBJJywgJ2lTaG93dGltZXMgQVBJJywgYEdvb2dsZSBBUEknc2AsICdBSkFYIC8gSlNPTicsICdCb290c3RyYXAgKFJlYWN0IEJvb3RzdHJhcCknLCAnU0NTUyAvIFNDU1MnLCAnUG9zdENTUycsICdKU1ggKEhUTUwgV0NBRyAyLjEpJywgJ1BIUCcsICdXb3JkUHJlc3MnLCAnQWRvYmUgWEQnXSxcbiAgICBpbWFnZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBJbWFnZTEsXG4gICAgICAgICAgICBhbHQ6IGBBIGNhbGwgdG8gYWN0aW9uIG9uIHRoZSBob21lIHBhZ2Ugb2YgdGhlIEhhbGN5b24gQ2VudGVyIE1hbGwgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAga2V5OiAwLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IEltYWdlMixcbiAgICAgICAgICAgIGFsdDogYFRoZSBob21lIHBhZ2UgZm9yIEhhbGN5b24gQ2VudGVyIE1hbGwgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBJbWFnZTMsXG4gICAgICAgICAgICBhbHQ6IGBUaGUgZGluaW5nIGRpcmVjdG9yeSBwYWdlIG9mIHRoZSBIYWxjeW9uIENlbnRlciBNYWxsIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogSW1hZ2U0LFxuICAgICAgICAgICAgYWx0OiBgVGhlIGV2ZW50cyBkaXJlY3RvcnkgcGFnZSBvZiB0aGUgSGFsY3lvbiBDZW50ZXIgTWFsbCB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IEltYWdlNSxcbiAgICAgICAgICAgIGFsdDogYEEgc3BvdGxpZ2h0IGZvciBidXNpbmVzc2VzIG9uIHRoZSBob21lIHBhZ2Ugb2YgdGhlIEhhbGN5b24gQ2VudGVyIE1hbGwgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogNCxcbiAgICAgICAgfSwgXG4gICAgXVxufVxuXG48L3NjcmlwdD5cblxuXG48UHJvamVjdERldGFpbFRlbXBsYXRlIFNUQVRFPXtTVEFURX0gLz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLGFBQWU7O0FDQWYsYUFBZTs7QUNBZixhQUFlOztBQ0FmLGFBQWU7O0FDQWYsYUFBZTs7Ozs7Ozs7OzZCQ29EZSxHQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0EzQy9CLEtBQUs7RUFDTCxTQUFTO0VBQ1QsS0FBSztFQUNMLEdBQUcsRUFBRSwrQkFBK0I7RUFDcEMsV0FBVztFQUNYLE1BQU07R0FBRyxPQUFPO0dBQUUsY0FBYztHQUFFLGtCQUFrQjtHQUFFLG9CQUFvQjtHQUFFLGdCQUFnQjs7R0FBa0IsYUFBYTtHQUFFLDZCQUE2QjtHQUFFLGFBQWE7R0FBRSxTQUFTO0dBQUUscUJBQXFCO0dBQUUsS0FBSztHQUFFLFdBQVc7R0FBRSxVQUFVOztFQUMzTyxNQUFNOztJQUVFLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRztJQUNILE9BQU8sRUFBRSxJQUFJO0lBQ2IsR0FBRyxFQUFFLENBQUM7OztJQUdOLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRztJQUNILE9BQU8sRUFBRSxLQUFLO0lBQ2QsR0FBRyxFQUFFLENBQUM7OztJQUdOLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRztJQUNILE9BQU8sRUFBRSxLQUFLO0lBQ2QsR0FBRyxFQUFFLENBQUM7OztJQUdOLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRztJQUNILE9BQU8sRUFBRSxLQUFLO0lBQ2QsR0FBRyxFQUFFLENBQUM7OztJQUdOLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRztJQUNILE9BQU8sRUFBRSxLQUFLO0lBQ2QsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
