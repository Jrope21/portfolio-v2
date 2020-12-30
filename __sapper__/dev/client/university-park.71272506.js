import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, p as create_component, q as claim_component, r as mount_component, n as noop, u as transition_in, w as transition_out, x as destroy_component } from './client.e9d4b0c5.js';
import './PageTitle.4e591aa2.js';
import { P as ProjectDetailTemplate } from './ProjectDetailTemplate.1bad8646.js';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdmVyc2l0eS1wYXJrLjcxMjcyNTA2LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW1hZ2VzL3VuaXZlcnNpdHktcGFyay9ob21lLW1pbi5qcGciLCIuLi8uLi8uLi9zcmMvaW1hZ2VzL3VuaXZlcnNpdHktcGFyay9saWJyYXJ5LW1pbi5qcGciLCIuLi8uLi8uLi9zcmMvaW1hZ2VzL3VuaXZlcnNpdHktcGFyay9ob21lLXZpZGVvLW1pbi5qcGciLCIuLi8uLi8uLi9zcmMvaW1hZ2VzL3VuaXZlcnNpdHktcGFyay9mb3JtLW1pbi5qcGciLCIuLi8uLi8uLi9zcmMvaW1hZ2VzL3VuaXZlcnNpdHktcGFyay9uZXdzbGV0dGVyLW1pbi5qcGciLCIuLi8uLi8uLi9zcmMvcm91dGVzL3Byb2plY3RzL3VuaXZlcnNpdHktcGFyay5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCIvY2xpZW50LzVhNzI2ODQxOTdlMWZiN2UuanBnXCIiLCJleHBvcnQgZGVmYXVsdCBcIi9jbGllbnQvMzg4ODdiMWI1NjU4ZTU4Zi5qcGdcIiIsImV4cG9ydCBkZWZhdWx0IFwiL2NsaWVudC8wZjdmMTQ4ODhiMjM1Mjg0LmpwZ1wiIiwiZXhwb3J0IGRlZmF1bHQgXCIvY2xpZW50LzMzYmE3Y2UyM2ZlNjUxNmEuanBnXCIiLCJleHBvcnQgZGVmYXVsdCBcIi9jbGllbnQvNmMyNGQ5Yjc3MWE3YmZlYy5qcGdcIiIsIjxzY3JpcHQ+XG5pbXBvcnQgUHJvamVjdERldGFpbFRlbXBsYXRlIGZyb20gJy4uLy4uL3JvdXRlLWxheW91dHMvUHJvamVjdERldGFpbFRlbXBsYXRlLnN2ZWx0ZSc7XG5cbmltcG9ydCBJbWFnZTEgZnJvbSAnLi4vLi4vaW1hZ2VzL3VuaXZlcnNpdHktcGFyay9ob21lLW1pbi5qcGcnO1xuaW1wb3J0IEltYWdlMiBmcm9tICcuLi8uLi9pbWFnZXMvdW5pdmVyc2l0eS1wYXJrL2xpYnJhcnktbWluLmpwZyc7XG5pbXBvcnQgSW1hZ2UzIGZyb20gJy4uLy4uL2ltYWdlcy91bml2ZXJzaXR5LXBhcmsvaG9tZS12aWRlby1taW4uanBnJztcbmltcG9ydCBJbWFnZTQgZnJvbSAnLi4vLi4vaW1hZ2VzL3VuaXZlcnNpdHktcGFyay9mb3JtLW1pbi5qcGcnO1xuaW1wb3J0IEltYWdlNSBmcm9tICcuLi8uLi9pbWFnZXMvdW5pdmVyc2l0eS1wYXJrL25ld3NsZXR0ZXItbWluLmpwZyc7XG5cbmxldCBTVEFURSA9IHtcbiAgICBtZXRhVGl0bGU6IGBVbml2ZXJzaXR5IFBhcmsgfCBGcm9udCBFbmQgRGV2ZWxvcGVyIC0gSm9zaHVhIFJvcGVyYCxcbiAgICB0aXRsZTogYFVuaXZlcnNpdHkgUGFya2AsXG4gICAgdXJsOiAnaHR0cHM6Ly93d3cudXB0ZXhhcy5vcmcvJyxcbiAgICBkZXNjcmlwdGlvbjogYEkgd2FzIHRhc2tlZCB3aXRoIGJlaW5nIHRoZSA8c3Ryb25nPnNvbGUgZGV2ZWxvcGVyPC9zdHJvbmc+IG9uIGEgPHN0cm9uZz5jb21wbGV0ZSBGcm9udC1FbmQgcmVkZXNpZ248L3N0cm9uZz4uIEtlZXBpbmcgdGhlaXIgY3VycmVudCB1c2VycyBpbiBtaW5kLCB0aGUgZ29hbCB3YXMgdG8gbWFrZSB0aGUgd2Vic2l0ZSBmZWVsIG1vcmUgbW9kZXJuLCBhbmQgb2ZmZXIgYSBiZXR0ZXIgdXNlciBleHBlcmllbmNlIHdoZW4gbmF2aWdhdGluZyB0byBlYWNoIGluZGl2aWR1YWwgcGFnZS4gQWNyb3NzIHRoZSBlbnRpcmUgcHJvamVjdCBJIGltcGxlbWVudGVkIHNldmVyYWwgZHluYW1pY2FsbHkgZ2VuZXJhdGVkIGNvbnRlbnQgcGFnZXMgLyBzbGlkZXJzLCA8c3Ryb25nPmZvcm0gdmVyaWZpY2F0aW9uPC9zdHJvbmc+LCBhbmQgc2V2ZXJhbCA8c3Ryb25nPnRoaXJkIHBhcnR5IGludGVncmF0aW9uczwvc3Ryb25nPi5gLFxuICAgIHNraWxsczogWydKYXZhU2NyaXB0IChFUzYrKScsICdqUXVlcnknLCAnQVBJIEludGVncmF0aW9uJywgJ0FKQVggLyBKU09OJywgJ1NBU1MgLyBTQ1NTJywgJ0NTUycsICdGb3VuZGF0aW9uJywgJ0hUTUwgKFdDQUcgMi4xKScsICdBZG9iZSBJbGx1c3RyYXRvcicsICdTRU8nLCAnS2VudGljbyAoQ01TKScsICdCaXRCdWNrZXQnXSxcbiAgICBpbWFnZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBJbWFnZTEsXG4gICAgICAgICAgICBhbHQ6IGBUaGUgaG9tZSBwYWdlIGZvciB0aGUgQ2l0eSBvZiBVbml2ZXJzaXR5IFBhcmsgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAga2V5OiAwLFxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBJbWFnZTIsXG4gICAgICAgICAgICBhbHQ6IGBUaGUgbGlicmFyeSBwYWdlIGZvciB0aGUgQ2l0eSBvZiBVbml2ZXJzaXR5IFBhcmsgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBJbWFnZTMsXG4gICAgICAgICAgICBhbHQ6IGBUaGUgdmlkZW8gbW9kYWwgb24gdGhlIENpdHkgb2YgVW5pdmVyc2l0eSBQYXJrIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogSW1hZ2U0LFxuICAgICAgICAgICAgYWx0OiBgVGhlIGRpcmVjdCBhbGFybSBtb25pdG9yaW5nIGZvcm0gZm9yIHRoZSBDaXR5IG9mIFVuaXZlcnNpdHkgUGFyayB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IEltYWdlNSxcbiAgICAgICAgICAgIGFsdDogYFRoZSBuZXdzbGV0dGVyIHBhZ2UgZm9yIHRoZSBDaXR5IG9mIFVuaXZlcnNpdHkgUGFyayB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiA0LFxuICAgICAgICB9LFxuICAgIF1cbn1cblxuPC9zY3JpcHQ+XG5cblxuPFByb2plY3REZXRhaWxUZW1wbGF0ZSBTVEFURT17U1RBVEV9IC8+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxhQUFlOztBQ0FmLGFBQWU7O0FDQWYsYUFBZTs7QUNBZixhQUFlOztBQ0FmLGFBQWU7Ozs7Ozs7Ozs2QkNxRGUsR0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBNUMvQixLQUFLO0VBQ0wsU0FBUztFQUNULEtBQUs7RUFDTCxHQUFHLEVBQUUsMEJBQTBCO0VBQy9CLFdBQVc7RUFDWCxNQUFNO0dBQUcsbUJBQW1CO0dBQUUsUUFBUTtHQUFFLGlCQUFpQjtHQUFFLGFBQWE7R0FBRSxhQUFhO0dBQUUsS0FBSztHQUFFLFlBQVk7R0FBRSxpQkFBaUI7R0FBRSxtQkFBbUI7R0FBRSxLQUFLO0dBQUUsZUFBZTtHQUFFLFdBQVc7O0VBQ3pMLE1BQU07O0lBRUUsR0FBRyxFQUFFLE1BQU07SUFDWCxHQUFHO0lBQ0gsT0FBTyxFQUFFLElBQUk7SUFDYixHQUFHLEVBQUUsQ0FBQzs7O0lBSU4sR0FBRyxFQUFFLE1BQU07SUFDWCxHQUFHO0lBQ0gsT0FBTyxFQUFFLEtBQUs7SUFDZCxHQUFHLEVBQUUsQ0FBQzs7O0lBR04sR0FBRyxFQUFFLE1BQU07SUFDWCxHQUFHO0lBQ0gsT0FBTyxFQUFFLEtBQUs7SUFDZCxHQUFHLEVBQUUsQ0FBQzs7O0lBR04sR0FBRyxFQUFFLE1BQU07SUFDWCxHQUFHO0lBQ0gsT0FBTyxFQUFFLEtBQUs7SUFDZCxHQUFHLEVBQUUsQ0FBQzs7O0lBR04sR0FBRyxFQUFFLE1BQU07SUFDWCxHQUFHO0lBQ0gsT0FBTyxFQUFFLEtBQUs7SUFDZCxHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
