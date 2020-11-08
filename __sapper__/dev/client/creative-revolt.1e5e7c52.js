import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, p as create_component, q as claim_component, r as mount_component, n as noop, u as transition_in, w as transition_out, x as destroy_component } from './client.9892d258.js';
import { P as ProjectDetailTemplate } from './ProjectDetailTemplate.940e399f.js';

/* src/routes/projects/creative-revolt.svelte generated by Svelte v3.29.4 */

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
	validate_slots("Creative_revolt", slots, []);

	let STATE = {
		metaTitle: `Creative Revolt | Front End Developer - Joshua Roper`,
		title: `Creative Revolt`,
		url: "https://www.creativerevolt.com/",
		description: `This was a freelance project to <strong>rework the website layout</strong> and tailor the feel of the website to her personal writing style. I <strong>revamped the color palette</strong> to better match her personality, adjusted her website for <strong>SEO</strong>, and created the landing page as well as multiple pages across the platform.`,
		skills: [
			"JavaScript",
			"CSS",
			"HTML",
			"PHP",
			"DiviBuilder",
			"WordPress",
			"SEO",
			"Googe Analytics",
			"Canva",
			"Adobe XD",
			"MailChimp"
		],
		images: [
			{
				src: "images/creative-revolt/home-min.png",
				alt: `The landing page for Creative Revolt`,
				visible: true,
				key: 0
			},
			{
				src: "images/creative-revolt/home-ctas-min.png",
				alt: `A call to action setup for Creative Revolt`,
				visible: false,
				key: 1
			},
			{
				src: "images/creative-revolt/about-min.png",
				alt: `The about page for Creative Revolt`,
				visible: false,
				key: 2
			},
			{
				src: "images/creative-revolt/about-cta-min.png",
				alt: `A call to action exculusively design for Creative Revolt`,
				visible: false,
				key: 3
			},
			{
				src: "images/creative-revolt/writing-class-min.png",
				alt: `A page from creative revolt that introduces customers to her their courses`,
				visible: false,
				key: 4
			}
		]
	};

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Creative_revolt> was created with unknown prop '${key}'`);
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

class Creative_revolt extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Creative_revolt",
			options,
			id: create_fragment.name
		});
	}
}

export default Creative_revolt;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRpdmUtcmV2b2x0LjFlNWU3YzUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL3Byb2plY3RzL2NyZWF0aXZlLXJldm9sdC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbmltcG9ydCBQcm9qZWN0RGV0YWlsVGVtcGxhdGUgZnJvbSAnLi4vLi4vcm91dGUtbGF5b3V0cy9Qcm9qZWN0RGV0YWlsVGVtcGxhdGUuc3ZlbHRlJztcblxubGV0IFNUQVRFID0ge1xuICAgIG1ldGFUaXRsZTogYENyZWF0aXZlIFJldm9sdCB8IEZyb250IEVuZCBEZXZlbG9wZXIgLSBKb3NodWEgUm9wZXJgLFxuICAgIHRpdGxlOiBgQ3JlYXRpdmUgUmV2b2x0YCxcbiAgICB1cmw6ICdodHRwczovL3d3dy5jcmVhdGl2ZXJldm9sdC5jb20vJyxcbiAgICBkZXNjcmlwdGlvbjogYFRoaXMgd2FzIGEgZnJlZWxhbmNlIHByb2plY3QgdG8gPHN0cm9uZz5yZXdvcmsgdGhlIHdlYnNpdGUgbGF5b3V0PC9zdHJvbmc+IGFuZCB0YWlsb3IgdGhlIGZlZWwgb2YgdGhlIHdlYnNpdGUgdG8gaGVyIHBlcnNvbmFsIHdyaXRpbmcgc3R5bGUuIEkgPHN0cm9uZz5yZXZhbXBlZCB0aGUgY29sb3IgcGFsZXR0ZTwvc3Ryb25nPiB0byBiZXR0ZXIgbWF0Y2ggaGVyIHBlcnNvbmFsaXR5LCBhZGp1c3RlZCBoZXIgd2Vic2l0ZSBmb3IgPHN0cm9uZz5TRU88L3N0cm9uZz4sIGFuZCBjcmVhdGVkIHRoZSBsYW5kaW5nIHBhZ2UgYXMgd2VsbCBhcyBtdWx0aXBsZSBwYWdlcyBhY3Jvc3MgdGhlIHBsYXRmb3JtLmAsXG4gICAgc2tpbGxzOiBbJ0phdmFTY3JpcHQnLCAnQ1NTJywgJ0hUTUwnLCAnUEhQJywgJ0RpdmlCdWlsZGVyJywgJ1dvcmRQcmVzcycsICdTRU8nLCAnR29vZ2UgQW5hbHl0aWNzJywgJ0NhbnZhJywgJ0Fkb2JlIFhEJywgJ01haWxDaGltcCddLFxuICAgIGltYWdlczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvY3JlYXRpdmUtcmV2b2x0L2hvbWUtbWluLnBuZycsXG4gICAgICAgICAgICBhbHQ6IGBUaGUgbGFuZGluZyBwYWdlIGZvciBDcmVhdGl2ZSBSZXZvbHRgLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGtleTogMCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2NyZWF0aXZlLXJldm9sdC9ob21lLWN0YXMtbWluLnBuZycsXG4gICAgICAgICAgICBhbHQ6IGBBIGNhbGwgdG8gYWN0aW9uIHNldHVwIGZvciBDcmVhdGl2ZSBSZXZvbHRgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDEsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltYWdlcy9jcmVhdGl2ZS1yZXZvbHQvYWJvdXQtbWluLnBuZycsXG4gICAgICAgICAgICBhbHQ6IGBUaGUgYWJvdXQgcGFnZSBmb3IgQ3JlYXRpdmUgUmV2b2x0YCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAyLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvY3JlYXRpdmUtcmV2b2x0L2Fib3V0LWN0YS1taW4ucG5nJyxcbiAgICAgICAgICAgIGFsdDogYEEgY2FsbCB0byBhY3Rpb24gZXhjdWx1c2l2ZWx5IGRlc2lnbiBmb3IgQ3JlYXRpdmUgUmV2b2x0YCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvY3JlYXRpdmUtcmV2b2x0L3dyaXRpbmctY2xhc3MtbWluLnBuZycsXG4gICAgICAgICAgICBhbHQ6IGBBIHBhZ2UgZnJvbSBjcmVhdGl2ZSByZXZvbHQgdGhhdCBpbnRyb2R1Y2VzIGN1c3RvbWVycyB0byBoZXIgdGhlaXIgY291cnNlc2AsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogNCxcbiAgICAgICAgfSxcbiAgICBdXG59XG5cbjwvc2NyaXB0PlxuXG5cbjxQcm9qZWN0RGV0YWlsVGVtcGxhdGUgU1RBVEU9e1NUQVRFfSAvPiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzZCQThDOEIsR0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBM0MvQixLQUFLO0VBQ0wsU0FBUztFQUNULEtBQUs7RUFDTCxHQUFHLEVBQUUsaUNBQWlDO0VBQ3RDLFdBQVc7RUFDWCxNQUFNO0dBQUcsWUFBWTtHQUFFLEtBQUs7R0FBRSxNQUFNO0dBQUUsS0FBSztHQUFFLGFBQWE7R0FBRSxXQUFXO0dBQUUsS0FBSztHQUFFLGlCQUFpQjtHQUFFLE9BQU87R0FBRSxVQUFVO0dBQUUsV0FBVzs7RUFDbkksTUFBTTs7SUFFRSxHQUFHLEVBQUUscUNBQXFDO0lBQzFDLEdBQUc7SUFDSCxPQUFPLEVBQUUsSUFBSTtJQUNiLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUsMENBQTBDO0lBQy9DLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUsc0NBQXNDO0lBQzNDLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUsMENBQTBDO0lBQy9DLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUsOENBQThDO0lBQ25ELEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
