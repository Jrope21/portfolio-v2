import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, p as create_component, q as claim_component, r as mount_component, n as noop, u as transition_in, w as transition_out, x as destroy_component } from './client.f1c43860.js';
import './PageTitle.9417cbc4.js';
import { P as ProjectDetailTemplate } from './ProjectDetailTemplate.1da2d839.js';

var Image1 = "/client/2286c80b2548b4f1.jpg";

var Image2 = "/client/8b308574c002984d.jpg";

var Image3 = "/client/b2c8b6df40bc2704.jpg";

var Image4 = "/client/4bc6ce4da6b933c3.jpg";

var Image5 = "/client/997e0e32b40aaba3.jpg";

/* src/routes/projects/creative-revolt.svelte generated by Svelte v3.29.7 */

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
				src: Image1,
				alt: `The landing page for Creative Revolt`,
				visible: true,
				key: 0
			},
			{
				src: Image2,
				alt: `A call to action setup for Creative Revolt`,
				visible: false,
				key: 1
			},
			{
				src: Image3,
				alt: `The about page for Creative Revolt`,
				visible: false,
				key: 2
			},
			{
				src: Image4,
				alt: `A call to action exculusively design for Creative Revolt`,
				visible: false,
				key: 3
			},
			{
				src: Image5,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRpdmUtcmV2b2x0LjY3MmI5ZmRlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW1hZ2VzL2NyZWF0aXZlLXJldm9sdC8xLmpwZyIsIi4uLy4uLy4uL3NyYy9pbWFnZXMvY3JlYXRpdmUtcmV2b2x0LzIuanBnIiwiLi4vLi4vLi4vc3JjL2ltYWdlcy9jcmVhdGl2ZS1yZXZvbHQvMy5qcGciLCIuLi8uLi8uLi9zcmMvaW1hZ2VzL2NyZWF0aXZlLXJldm9sdC80LmpwZyIsIi4uLy4uLy4uL3NyYy9pbWFnZXMvY3JlYXRpdmUtcmV2b2x0LzUuanBnIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9wcm9qZWN0cy9jcmVhdGl2ZS1yZXZvbHQuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IFwiL2NsaWVudC8yMjg2YzgwYjI1NDhiNGYxLmpwZ1wiIiwiZXhwb3J0IGRlZmF1bHQgXCIvY2xpZW50LzhiMzA4NTc0YzAwMjk4NGQuanBnXCIiLCJleHBvcnQgZGVmYXVsdCBcIi9jbGllbnQvYjJjOGI2ZGY0MGJjMjcwNC5qcGdcIiIsImV4cG9ydCBkZWZhdWx0IFwiL2NsaWVudC80YmM2Y2U0ZGE2YjkzM2MzLmpwZ1wiIiwiZXhwb3J0IGRlZmF1bHQgXCIvY2xpZW50Lzk5N2UwZTMyYjQwYWFiYTMuanBnXCIiLCI8c2NyaXB0PlxuaW1wb3J0IFByb2plY3REZXRhaWxUZW1wbGF0ZSBmcm9tICcuLi8uLi9yb3V0ZS1sYXlvdXRzL1Byb2plY3REZXRhaWxUZW1wbGF0ZS5zdmVsdGUnO1xuXG5pbXBvcnQgSW1hZ2UxIGZyb20gJy4uLy4uL2ltYWdlcy9jcmVhdGl2ZS1yZXZvbHQvMS5qcGcnO1xuaW1wb3J0IEltYWdlMiBmcm9tICcuLi8uLi9pbWFnZXMvY3JlYXRpdmUtcmV2b2x0LzIuanBnJztcbmltcG9ydCBJbWFnZTMgZnJvbSAnLi4vLi4vaW1hZ2VzL2NyZWF0aXZlLXJldm9sdC8zLmpwZyc7XG5pbXBvcnQgSW1hZ2U0IGZyb20gJy4uLy4uL2ltYWdlcy9jcmVhdGl2ZS1yZXZvbHQvNC5qcGcnO1xuaW1wb3J0IEltYWdlNSBmcm9tICcuLi8uLi9pbWFnZXMvY3JlYXRpdmUtcmV2b2x0LzUuanBnJztcblxubGV0IFNUQVRFID0ge1xuICAgIG1ldGFUaXRsZTogYENyZWF0aXZlIFJldm9sdCB8IEZyb250IEVuZCBEZXZlbG9wZXIgLSBKb3NodWEgUm9wZXJgLFxuICAgIHRpdGxlOiBgQ3JlYXRpdmUgUmV2b2x0YCxcbiAgICB1cmw6ICdodHRwczovL3d3dy5jcmVhdGl2ZXJldm9sdC5jb20vJyxcbiAgICBkZXNjcmlwdGlvbjogYFRoaXMgd2FzIGEgZnJlZWxhbmNlIHByb2plY3QgdG8gPHN0cm9uZz5yZXdvcmsgdGhlIHdlYnNpdGUgbGF5b3V0PC9zdHJvbmc+IGFuZCB0YWlsb3IgdGhlIGZlZWwgb2YgdGhlIHdlYnNpdGUgdG8gaGVyIHBlcnNvbmFsIHdyaXRpbmcgc3R5bGUuIEkgPHN0cm9uZz5yZXZhbXBlZCB0aGUgY29sb3IgcGFsZXR0ZTwvc3Ryb25nPiB0byBiZXR0ZXIgbWF0Y2ggaGVyIHBlcnNvbmFsaXR5LCBhZGp1c3RlZCBoZXIgd2Vic2l0ZSBmb3IgPHN0cm9uZz5TRU88L3N0cm9uZz4sIGFuZCBjcmVhdGVkIHRoZSBsYW5kaW5nIHBhZ2UgYXMgd2VsbCBhcyBtdWx0aXBsZSBwYWdlcyBhY3Jvc3MgdGhlIHBsYXRmb3JtLmAsXG4gICAgc2tpbGxzOiBbJ0phdmFTY3JpcHQnLCAnQ1NTJywgJ0hUTUwnLCAnUEhQJywgJ0RpdmlCdWlsZGVyJywgJ1dvcmRQcmVzcycsICdTRU8nLCAnR29vZ2UgQW5hbHl0aWNzJywgJ0NhbnZhJywgJ0Fkb2JlIFhEJywgJ01haWxDaGltcCddLFxuICAgIGltYWdlczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IEltYWdlMSxcbiAgICAgICAgICAgIGFsdDogYFRoZSBsYW5kaW5nIHBhZ2UgZm9yIENyZWF0aXZlIFJldm9sdGAsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAga2V5OiAwLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IEltYWdlMixcbiAgICAgICAgICAgIGFsdDogYEEgY2FsbCB0byBhY3Rpb24gc2V0dXAgZm9yIENyZWF0aXZlIFJldm9sdGAsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBJbWFnZTMsXG4gICAgICAgICAgICBhbHQ6IGBUaGUgYWJvdXQgcGFnZSBmb3IgQ3JlYXRpdmUgUmV2b2x0YCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAyLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IEltYWdlNCxcbiAgICAgICAgICAgIGFsdDogYEEgY2FsbCB0byBhY3Rpb24gZXhjdWx1c2l2ZWx5IGRlc2lnbiBmb3IgQ3JlYXRpdmUgUmV2b2x0YCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IEltYWdlNSxcbiAgICAgICAgICAgIGFsdDogYEEgcGFnZSBmcm9tIGNyZWF0aXZlIHJldm9sdCB0aGF0IGludHJvZHVjZXMgY3VzdG9tZXJzIHRvIGhlciB0aGVpciBjb3Vyc2VzYCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiA0LFxuICAgICAgICB9LFxuICAgIF1cbn1cblxuPC9zY3JpcHQ+XG5cblxuPFByb2plY3REZXRhaWxUZW1wbGF0ZSBTVEFURT17U1RBVEV9IC8+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxhQUFlOztBQ0FmLGFBQWU7O0FDQWYsYUFBZTs7QUNBZixhQUFlOztBQ0FmLGFBQWU7Ozs7Ozs7Ozs2QkNvRGUsR0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBM0MvQixLQUFLO0VBQ0wsU0FBUztFQUNULEtBQUs7RUFDTCxHQUFHLEVBQUUsaUNBQWlDO0VBQ3RDLFdBQVc7RUFDWCxNQUFNO0dBQUcsWUFBWTtHQUFFLEtBQUs7R0FBRSxNQUFNO0dBQUUsS0FBSztHQUFFLGFBQWE7R0FBRSxXQUFXO0dBQUUsS0FBSztHQUFFLGlCQUFpQjtHQUFFLE9BQU87R0FBRSxVQUFVO0dBQUUsV0FBVzs7RUFDbkksTUFBTTs7SUFFRSxHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUc7SUFDSCxPQUFPLEVBQUUsSUFBSTtJQUNiLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7SUFHTixHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUc7SUFDSCxPQUFPLEVBQUUsS0FBSztJQUNkLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
