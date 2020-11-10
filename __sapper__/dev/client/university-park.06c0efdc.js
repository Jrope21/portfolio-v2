import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, p as create_component, q as claim_component, r as mount_component, n as noop, u as transition_in, w as transition_out, x as destroy_component } from './client.0b8c1e22.js';
import './PageTitle.d0cb41ec.js';
import { P as ProjectDetailTemplate } from './ProjectDetailTemplate.1bc4032c.js';

/* src/routes/projects/university-park.svelte generated by Svelte v3.29.4 */

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
				src: "images/university-park/home-min.png",
				alt: `The home page for the City of University Park website`,
				visible: true,
				key: 0
			},
			{
				src: "images/university-park/library-min.png",
				alt: `The library page for the City of University Park website`,
				visible: false,
				key: 1
			},
			{
				src: "images/university-park/home-video-min.png",
				alt: `The video modal on the City of University Park website`,
				visible: false,
				key: 2
			},
			{
				src: "images/university-park/form-min.png",
				alt: `The direct alarm monitoring form for the City of University Park website`,
				visible: false,
				key: 3
			},
			{
				src: "images/university-park/newsletter-min.png",
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

	$$self.$capture_state = () => ({ ProjectDetailTemplate, STATE });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdmVyc2l0eS1wYXJrLjA2YzBlZmRjLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL3Byb2plY3RzL3VuaXZlcnNpdHktcGFyay5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbmltcG9ydCBQcm9qZWN0RGV0YWlsVGVtcGxhdGUgZnJvbSAnLi4vLi4vcm91dGUtbGF5b3V0cy9Qcm9qZWN0RGV0YWlsVGVtcGxhdGUuc3ZlbHRlJztcblxubGV0IFNUQVRFID0ge1xuICAgIG1ldGFUaXRsZTogYFVuaXZlcnNpdHkgUGFyayB8IEZyb250IEVuZCBEZXZlbG9wZXIgLSBKb3NodWEgUm9wZXJgLFxuICAgIHRpdGxlOiBgVW5pdmVyc2l0eSBQYXJrYCxcbiAgICB1cmw6ICdodHRwczovL3d3dy51cHRleGFzLm9yZy8nLFxuICAgIGRlc2NyaXB0aW9uOiBgSSB3YXMgdGFza2VkIHdpdGggYmVpbmcgdGhlIDxzdHJvbmc+c29sZSBkZXZlbG9wZXI8L3N0cm9uZz4gb24gYSA8c3Ryb25nPmNvbXBsZXRlIEZyb250LUVuZCByZWRlc2lnbjwvc3Ryb25nPi4gS2VlcGluZyB0aGVpciBjdXJyZW50IHVzZXJzIGluIG1pbmQsIHRoZSBnb2FsIHdhcyB0byBtYWtlIHRoZSB3ZWJzaXRlIGZlZWwgbW9yZSBtb2Rlcm4sIGFuZCBvZmZlciBhIGJldHRlciB1c2VyIGV4cGVyaWVuY2Ugd2hlbiBuYXZpZ2F0aW5nIHRvIGVhY2ggaW5kaXZpZHVhbCBwYWdlLiBBY3Jvc3MgdGhlIGVudGlyZSBwcm9qZWN0IEkgaW1wbGVtZW50ZWQgc2V2ZXJhbCBkeW5hbWljYWxseSBnZW5lcmF0ZWQgY29udGVudCBwYWdlcyAvIHNsaWRlcnMsIDxzdHJvbmc+Zm9ybSB2ZXJpZmljYXRpb248L3N0cm9uZz4sIGFuZCBzZXZlcmFsIDxzdHJvbmc+dGhpcmQgcGFydHkgaW50ZWdyYXRpb25zPC9zdHJvbmc+LmAsXG4gICAgc2tpbGxzOiBbJ0phdmFTY3JpcHQgKEVTNispJywgJ2pRdWVyeScsICdBUEkgSW50ZWdyYXRpb24nLCAnQUpBWCAvIEpTT04nLCAnU0FTUyAvIFNDU1MnLCAnQ1NTJywgJ0ZvdW5kYXRpb24nLCAnSFRNTCAoV0NBRyAyLjEpJywgJ0Fkb2JlIElsbHVzdHJhdG9yJywgJ1NFTycsICdLZW50aWNvIChDTVMpJywgJ0JpdEJ1Y2tldCddLFxuICAgIGltYWdlczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvdW5pdmVyc2l0eS1wYXJrL2hvbWUtbWluLnBuZycsXG4gICAgICAgICAgICBhbHQ6IGBUaGUgaG9tZSBwYWdlIGZvciB0aGUgQ2l0eSBvZiBVbml2ZXJzaXR5IFBhcmsgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAga2V5OiAwLFxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL3VuaXZlcnNpdHktcGFyay9saWJyYXJ5LW1pbi5wbmcnLFxuICAgICAgICAgICAgYWx0OiBgVGhlIGxpYnJhcnkgcGFnZSBmb3IgdGhlIENpdHkgb2YgVW5pdmVyc2l0eSBQYXJrIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDEsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltYWdlcy91bml2ZXJzaXR5LXBhcmsvaG9tZS12aWRlby1taW4ucG5nJyxcbiAgICAgICAgICAgIGFsdDogYFRoZSB2aWRlbyBtb2RhbCBvbiB0aGUgQ2l0eSBvZiBVbml2ZXJzaXR5IFBhcmsgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL3VuaXZlcnNpdHktcGFyay9mb3JtLW1pbi5wbmcnLFxuICAgICAgICAgICAgYWx0OiBgVGhlIGRpcmVjdCBhbGFybSBtb25pdG9yaW5nIGZvcm0gZm9yIHRoZSBDaXR5IG9mIFVuaXZlcnNpdHkgUGFyayB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvdW5pdmVyc2l0eS1wYXJrL25ld3NsZXR0ZXItbWluLnBuZycsXG4gICAgICAgICAgICBhbHQ6IGBUaGUgbmV3c2xldHRlciBwYWdlIGZvciB0aGUgQ2l0eSBvZiBVbml2ZXJzaXR5IFBhcmsgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogNCxcbiAgICAgICAgfSxcbiAgICBdXG59XG5cbjwvc2NyaXB0PlxuXG5cbjxQcm9qZWN0RGV0YWlsVGVtcGxhdGUgU1RBVEU9e1NUQVRFfSAvPiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs2QkErQzhCLEdBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTVDL0IsS0FBSztFQUNMLFNBQVM7RUFDVCxLQUFLO0VBQ0wsR0FBRyxFQUFFLDBCQUEwQjtFQUMvQixXQUFXO0VBQ1gsTUFBTTtHQUFHLG1CQUFtQjtHQUFFLFFBQVE7R0FBRSxpQkFBaUI7R0FBRSxhQUFhO0dBQUUsYUFBYTtHQUFFLEtBQUs7R0FBRSxZQUFZO0dBQUUsaUJBQWlCO0dBQUUsbUJBQW1CO0dBQUUsS0FBSztHQUFFLGVBQWU7R0FBRSxXQUFXOztFQUN6TCxNQUFNOztJQUVFLEdBQUcsRUFBRSxxQ0FBcUM7SUFDMUMsR0FBRztJQUNILE9BQU8sRUFBRSxJQUFJO0lBQ2IsR0FBRyxFQUFFLENBQUM7OztJQUlOLEdBQUcsRUFBRSx3Q0FBd0M7SUFDN0MsR0FBRztJQUNILE9BQU8sRUFBRSxLQUFLO0lBQ2QsR0FBRyxFQUFFLENBQUM7OztJQUdOLEdBQUcsRUFBRSwyQ0FBMkM7SUFDaEQsR0FBRztJQUNILE9BQU8sRUFBRSxLQUFLO0lBQ2QsR0FBRyxFQUFFLENBQUM7OztJQUdOLEdBQUcsRUFBRSxxQ0FBcUM7SUFDMUMsR0FBRztJQUNILE9BQU8sRUFBRSxLQUFLO0lBQ2QsR0FBRyxFQUFFLENBQUM7OztJQUdOLEdBQUcsRUFBRSwyQ0FBMkM7SUFDaEQsR0FBRztJQUNILE9BQU8sRUFBRSxLQUFLO0lBQ2QsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
