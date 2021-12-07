import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, p as create_component, q as claim_component, r as mount_component, n as noop, u as transition_in, w as transition_out, x as destroy_component } from './client.7af93f95.js';
import './PageTitle.f1dad10f.js';
import { P as ProjectDetailTemplate } from './ProjectDetailTemplate.7980b25e.js';

var Image1 = "/client/023ccf337887e0b0.png";

var Image2 = "/client/704a1e30302f86d6.png";

var Image3 = "/client/06b1ebdd01e916a1.png";

var Image4 = "/client/a3ccae433264fb23.png";

var Image5 = "/client/d97dd79a9581276f.png";

/* src/routes/projects/trinity-consultants.svelte generated by Svelte v3.29.7 */

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
	validate_slots("Trinity_consultants", slots, []);

	let STATE = {
		metaTitle: `Trinity Consultants | Front End Developer - Joshua Roper`,
		title: `Trinity Consultants`,
		url: "https://www.trinityconsultants.com/",
		description: `As the <strong>Lead React Developer</strong> on the ecommerce project, I was tasked with creating a multitude of dynamic templates for over 10,000 pages of content. The project included <strong>collaboration across multiple teams</strong>, and working with <strong>various advanced API’s,</strong> React, Redux, Stripe, etc...`,
		skills: [
			"React",
			"Redux",
			"Node JS",
			"JavaScript (ES8)",
			"Ucommerece",
			"Stripe",
			"AJAX / JSON",
			"Bootstrap (React Bootstrap)",
			"SCSS / SCSS",
			"PostCSS",
			"JSX (HTML WCAG compliant)",
			"Sitefinity",
			"C#",
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
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Trinity_consultants> was created with unknown prop '${key}'`);
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

class Trinity_consultants extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Trinity_consultants",
			options,
			id: create_fragment.name
		});
	}
}

export default Trinity_consultants;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpbml0eS1jb25zdWx0YW50cy4wNmNiNzA4Zi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ltYWdlcy90cmluaXR5LWNvbnN1bHRhbnRzLzEucG5nIiwiLi4vLi4vLi4vc3JjL2ltYWdlcy90cmluaXR5LWNvbnN1bHRhbnRzLzIucG5nIiwiLi4vLi4vLi4vc3JjL2ltYWdlcy90cmluaXR5LWNvbnN1bHRhbnRzLzMucG5nIiwiLi4vLi4vLi4vc3JjL2ltYWdlcy90cmluaXR5LWNvbnN1bHRhbnRzLzQucG5nIiwiLi4vLi4vLi4vc3JjL2ltYWdlcy90cmluaXR5LWNvbnN1bHRhbnRzLzUucG5nIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9wcm9qZWN0cy90cmluaXR5LWNvbnN1bHRhbnRzLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcIi9jbGllbnQvMDIzY2NmMzM3ODg3ZTBiMC5wbmdcIiIsImV4cG9ydCBkZWZhdWx0IFwiL2NsaWVudC83MDRhMWUzMDMwMmY4NmQ2LnBuZ1wiIiwiZXhwb3J0IGRlZmF1bHQgXCIvY2xpZW50LzA2YjFlYmRkMDFlOTE2YTEucG5nXCIiLCJleHBvcnQgZGVmYXVsdCBcIi9jbGllbnQvYTNjY2FlNDMzMjY0ZmIyMy5wbmdcIiIsImV4cG9ydCBkZWZhdWx0IFwiL2NsaWVudC9kOTdkZDc5YTk1ODEyNzZmLnBuZ1wiIiwiPHNjcmlwdD5cbmltcG9ydCBQcm9qZWN0RGV0YWlsVGVtcGxhdGUgZnJvbSAnLi4vLi4vcm91dGUtbGF5b3V0cy9Qcm9qZWN0RGV0YWlsVGVtcGxhdGUuc3ZlbHRlJztcblxuaW1wb3J0IEltYWdlMSBmcm9tICcuLi8uLi9pbWFnZXMvdHJpbml0eS1jb25zdWx0YW50cy8xLnBuZyc7XG5pbXBvcnQgSW1hZ2UyIGZyb20gJy4uLy4uL2ltYWdlcy90cmluaXR5LWNvbnN1bHRhbnRzLzIucG5nJztcbmltcG9ydCBJbWFnZTMgZnJvbSAnLi4vLi4vaW1hZ2VzL3RyaW5pdHktY29uc3VsdGFudHMvMy5wbmcnO1xuaW1wb3J0IEltYWdlNCBmcm9tICcuLi8uLi9pbWFnZXMvdHJpbml0eS1jb25zdWx0YW50cy80LnBuZyc7XG5pbXBvcnQgSW1hZ2U1IGZyb20gJy4uLy4uL2ltYWdlcy90cmluaXR5LWNvbnN1bHRhbnRzLzUucG5nJztcblxubGV0IFNUQVRFID0ge1xuICAgIG1ldGFUaXRsZTogYFRyaW5pdHkgQ29uc3VsdGFudHMgfCBGcm9udCBFbmQgRGV2ZWxvcGVyIC0gSm9zaHVhIFJvcGVyYCxcbiAgICB0aXRsZTogYFRyaW5pdHkgQ29uc3VsdGFudHNgLFxuICAgIHVybDogJ2h0dHBzOi8vd3d3LnRyaW5pdHljb25zdWx0YW50cy5jb20vJyxcbiAgICBkZXNjcmlwdGlvbjogYEFzIHRoZSA8c3Ryb25nPkxlYWQgUmVhY3QgRGV2ZWxvcGVyPC9zdHJvbmc+IG9uIHRoZSBlY29tbWVyY2UgcHJvamVjdCwgSSB3YXMgdGFza2VkIHdpdGggY3JlYXRpbmcgYSBtdWx0aXR1ZGUgb2YgZHluYW1pYyB0ZW1wbGF0ZXMgZm9yIG92ZXIgMTAsMDAwIHBhZ2VzIG9mIGNvbnRlbnQuIFRoZSBwcm9qZWN0IGluY2x1ZGVkIDxzdHJvbmc+Y29sbGFib3JhdGlvbiBhY3Jvc3MgbXVsdGlwbGUgdGVhbXM8L3N0cm9uZz4sIGFuZCB3b3JraW5nIHdpdGggPHN0cm9uZz52YXJpb3VzIGFkdmFuY2VkIEFQSeKAmXMsPC9zdHJvbmc+IFJlYWN0LCBSZWR1eCwgU3RyaXBlLCBldGMuLi5gLFxuICAgIHNraWxsczogWydSZWFjdCcsICdSZWR1eCcsICdOb2RlIEpTJywgJ0phdmFTY3JpcHQgKEVTOCknLCAnVWNvbW1lcmVjZScsICdTdHJpcGUnLCAnQUpBWCAvIEpTT04nLCAnQm9vdHN0cmFwIChSZWFjdCBCb290c3RyYXApJywgJ1NDU1MgLyBTQ1NTJywgJ1Bvc3RDU1MnLCAnSlNYIChIVE1MIFdDQUcgY29tcGxpYW50KScsICdTaXRlZmluaXR5JywgJ0MjJywgJ0Fkb2JlIFhEJ10sXG4gICAgaW1hZ2VzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogSW1hZ2UxLFxuICAgICAgICAgICAgYWx0OiBgQSBjYWxsIHRvIGFjdGlvbiBvbiB0aGUgaG9tZSBwYWdlIG9mIHRoZSBIYWxjeW9uIENlbnRlciBNYWxsIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGtleTogMCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBJbWFnZTIsXG4gICAgICAgICAgICBhbHQ6IGBUaGUgaG9tZSBwYWdlIGZvciBIYWxjeW9uIENlbnRlciBNYWxsIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDEsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogSW1hZ2UzLFxuICAgICAgICAgICAgYWx0OiBgVGhlIGRpbmluZyBkaXJlY3RvcnkgcGFnZSBvZiB0aGUgSGFsY3lvbiBDZW50ZXIgTWFsbCB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAyLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IEltYWdlNCxcbiAgICAgICAgICAgIGFsdDogYFRoZSBldmVudHMgZGlyZWN0b3J5IHBhZ2Ugb2YgdGhlIEhhbGN5b24gQ2VudGVyIE1hbGwgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBJbWFnZTUsXG4gICAgICAgICAgICBhbHQ6IGBBIHNwb3RsaWdodCBmb3IgYnVzaW5lc3NlcyBvbiB0aGUgaG9tZSBwYWdlIG9mIHRoZSBIYWxjeW9uIENlbnRlciBNYWxsIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDQsXG4gICAgICAgIH0sIFxuICAgIF1cbn1cblxuPC9zY3JpcHQ+XG5cblxuPFByb2plY3REZXRhaWxUZW1wbGF0ZSBTVEFURT17U1RBVEV9IC8+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxhQUFlOztBQ0FmLGFBQWU7O0FDQWYsYUFBZTs7QUNBZixhQUFlOztBQ0FmLGFBQWU7Ozs7Ozs7Ozs2QkNvRGUsR0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBM0MvQixLQUFLO0VBQ0wsU0FBUztFQUNULEtBQUs7RUFDTCxHQUFHLEVBQUUscUNBQXFDO0VBQzFDLFdBQVc7RUFDWCxNQUFNO0dBQUcsT0FBTztHQUFFLE9BQU87R0FBRSxTQUFTO0dBQUUsa0JBQWtCO0dBQUUsWUFBWTtHQUFFLFFBQVE7R0FBRSxhQUFhO0dBQUUsNkJBQTZCO0dBQUUsYUFBYTtHQUFFLFNBQVM7R0FBRSwyQkFBMkI7R0FBRSxZQUFZO0dBQUUsSUFBSTtHQUFFLFVBQVU7O0VBQ3JOLE1BQU07O0lBRUUsR0FBRyxFQUFFLE1BQU07SUFDWCxHQUFHO0lBQ0gsT0FBTyxFQUFFLElBQUk7SUFDYixHQUFHLEVBQUUsQ0FBQzs7O0lBR04sR0FBRyxFQUFFLE1BQU07SUFDWCxHQUFHO0lBQ0gsT0FBTyxFQUFFLEtBQUs7SUFDZCxHQUFHLEVBQUUsQ0FBQzs7O0lBR04sR0FBRyxFQUFFLE1BQU07SUFDWCxHQUFHO0lBQ0gsT0FBTyxFQUFFLEtBQUs7SUFDZCxHQUFHLEVBQUUsQ0FBQzs7O0lBR04sR0FBRyxFQUFFLE1BQU07SUFDWCxHQUFHO0lBQ0gsT0FBTyxFQUFFLEtBQUs7SUFDZCxHQUFHLEVBQUUsQ0FBQzs7O0lBR04sR0FBRyxFQUFFLE1BQU07SUFDWCxHQUFHO0lBQ0gsT0FBTyxFQUFFLEtBQUs7SUFDZCxHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
