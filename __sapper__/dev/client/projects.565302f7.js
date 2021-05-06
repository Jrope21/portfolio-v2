import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, k as space, e as element, p as create_component, A as query_selector_all, b as detach_dev, m as claim_space, c as claim_element, a as children, q as claim_component, f as attr_dev, g as add_location, h as insert_dev, r as mount_component, j as append_dev, n as noop, u as transition_in, w as transition_out, x as destroy_component } from './client.f1c43860.js';
import { P as Projects, D as DiRepairsThumb, H as HalcyonThumb } from './halcyon-5-min.7be10814.js';
import { P as PageTitle } from './PageTitle.9417cbc4.js';

var StallionThumb = "/client/e8b7060e9e4ada65.jpg";

var UniversityParkThumb = "/client/a6d2101604b031b6.jpg";

var CreativeRevoltThumb = "/client/95475a9f0f24a4e8.jpg";

/* src/routes/projects.svelte generated by Svelte v3.29.7 */
const file = "src/routes/projects.svelte";

function create_fragment(ctx) {
	let t0;
	let div;
	let pagetitle;
	let t1;
	let projects;
	let current;

	pagetitle = new PageTitle({
			props: { title: "Projects" },
			$$inline: true
		});

	projects = new Projects({
			props: {
				portfolioCards: /*portfolioCards*/ ctx[0]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			t0 = space();
			div = element("div");
			create_component(pagetitle.$$.fragment);
			t1 = space();
			create_component(projects.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-15vlb29\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(pagetitle.$$.fragment, div_nodes);
			t1 = claim_space(div_nodes);
			claim_component(projects.$$.fragment, div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document.title = "Projects | Front End Developer - Joshua Roper";
			attr_dev(div, "class", "container svelte-1yp3bd9");
			add_location(div, file, 68, 0, 4355);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, div, anchor);
			mount_component(pagetitle, div, null);
			append_dev(div, t1);
			mount_component(projects, div, null);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(pagetitle.$$.fragment, local);
			transition_in(projects.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(pagetitle.$$.fragment, local);
			transition_out(projects.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div);
			destroy_component(pagetitle);
			destroy_component(projects);
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
	validate_slots("Projects", slots, []);

	let portfolioCards = [
		{
			url: "/projects/halcyon",
			imgSrc: HalcyonThumb,
			alt: "Thumbnail for the Halcyon mall website rebuild",
			projectName: "Halcyon",
			projectYear: "2019",
			projectText: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`
		},
		{
			url: "/projects/di-repairs",
			imgSrc: DiRepairsThumb,
			alt: "Thumbnail for the DI repairs freelance website project",
			projectName: "DI Repairs",
			projectYear: "2020",
			projectText: `As the <strong>only developer & designer</strong> on this freelance project. I completely re-envisioned the site design & built the project from the ground up as an extremely performant <strong>SSG website</strong>. I utilized development & design best practices with a focus on the <strong>user experience.</strong>`
		},
		{
			url: "projects/stallion",
			imgSrc: StallionThumb,
			alt: "Thumbnail for the Stallion complete website rebuild",
			projectName: "Stallion",
			projectYear: "2019",
			projectText: `As the <strong>Lead Front End Developer</strong> on a <strong>complete website rebuild</strong>, I worked towards envisioning a website that would match their innovative Stallion attitude. The project was built with an <strong>emphasis</strong> on <strong>clean code</strong>, and <strong>modularity.</strong> The website includes multiple API’s, form verification, and other advanced modules.`
		},
		{
			url: "/projects/university-park",
			imgSrc: UniversityParkThumb,
			alt: "Thumbnail for the City of University Park complete Front End website redesign",
			projectName: "University Park",
			projectYear: "2019",
			projectText: `I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.`
		},
		{
			url: "projects/creative-revolt",
			imgSrc: CreativeRevoltThumb,
			alt: "Thumbnail for the Creative Revolt redesigned website",
			projectName: "Creative Revolt",
			projectYear: "2018",
			projectText: `This was a freelance project to <strong>rework the website layout</strong> and tailor the feel of the website to her personal writing style. I <strong>revamped the color palette</strong> to better match her personality, adjusted her website for <strong>SEO</strong>, and created the landing page as well as multiple pages across the platform.`
		}
	];

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Projects> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		Projects,
		PageTitle,
		DiRepairsThumb,
		HalcyonThumb,
		StallionThumb,
		UniversityParkThumb,
		CreativeRevoltThumb,
		portfolioCards
	});

	$$self.$inject_state = $$props => {
		if ("portfolioCards" in $$props) $$invalidate(0, portfolioCards = $$props.portfolioCards);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [portfolioCards];
}

class Projects_1 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Projects_1",
			options,
			id: create_fragment.name
		});
	}
}

export default Projects_1;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMuNTY1MzAyZjcuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbWFnZXMvdGh1bWJuYWlscy9zdGFsbGlvbi10aHVtYi1hLW1pbi5qcGciLCIuLi8uLi8uLi9zcmMvaW1hZ2VzL3RodW1ibmFpbHMvdXB0ZXhhcy10aHVtYi1taW4uanBnIiwiLi4vLi4vLi4vc3JjL2ltYWdlcy90aHVtYm5haWxzL0pvcmRlbi1CYWNrZ3JvdW5kLUdyYXktbWluLmpwZyIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvcHJvamVjdHMuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IFwiL2NsaWVudC9lOGI3MDYwZTllNGFkYTY1LmpwZ1wiIiwiZXhwb3J0IGRlZmF1bHQgXCIvY2xpZW50L2E2ZDIxMDE2MDRiMDMxYjYuanBnXCIiLCJleHBvcnQgZGVmYXVsdCBcIi9jbGllbnQvOTU0NzVhOWYwZjI0YTRlOC5qcGdcIiIsIjxzY3JpcHQ+XG4gICAgaW1wb3J0IFByb2plY3RzIGZyb20gJy4uL2NvbXBvbmVudHMvaG9tZS1jb21wb25lbnRzL3Byb2plY3RzL1Byb2plY3RzLnN2ZWx0ZSc7XG4gICAgaW1wb3J0IFBhZ2VUaXRsZSBmcm9tICcuLi9jb21wb25lbnRzL3Byb2plY3QtZGV0YWlsLWNvbXBvbmVudHMvUGFnZVRpdGxlLnN2ZWx0ZSc7XG5cbiAgICBpbXBvcnQgRGlSZXBhaXJzVGh1bWIgZnJvbSAnLi4vaW1hZ2VzL3RodW1ibmFpbHMvZGktdGh1bWIuanBnJztcbiAgICBpbXBvcnQgSGFsY3lvblRodW1iIGZyb20gJy4uL2ltYWdlcy90aHVtYm5haWxzL2hhbGN5b24tNS1taW4uanBnJztcbiAgICBpbXBvcnQgU3RhbGxpb25UaHVtYiBmcm9tICcuLi9pbWFnZXMvdGh1bWJuYWlscy9zdGFsbGlvbi10aHVtYi1hLW1pbi5qcGcnO1xuICAgIGltcG9ydCBVbml2ZXJzaXR5UGFya1RodW1iIGZyb20gJy4uL2ltYWdlcy90aHVtYm5haWxzL3VwdGV4YXMtdGh1bWItbWluLmpwZyc7XG4gICAgaW1wb3J0IENyZWF0aXZlUmV2b2x0VGh1bWIgZnJvbSAnLi4vaW1hZ2VzL3RodW1ibmFpbHMvSm9yZGVuLUJhY2tncm91bmQtR3JheS1taW4uanBnJztcblxuICAgIGxldCBwb3J0Zm9saW9DYXJkcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnL3Byb2plY3RzL2hhbGN5b24nLFxuICAgICAgICAgICAgaW1nU3JjOiBIYWxjeW9uVGh1bWIsXG4gICAgICAgICAgICBhbHQ6ICdUaHVtYm5haWwgZm9yIHRoZSBIYWxjeW9uIG1hbGwgd2Vic2l0ZSByZWJ1aWxkJyxcbiAgICAgICAgICAgIHByb2plY3ROYW1lOiAnSGFsY3lvbicsXG4gICAgICAgICAgICBwcm9qZWN0WWVhcjogJzIwMTknLFxuICAgICAgICAgICAgcHJvamVjdFRleHQ6IGBJIHdhcyBvbmUgb2YgdGhlIEZyb250IEVuZCBEZXZlbG9wZXJzIG9uIHRoZSBwcm9qZWN0IHByaW1hcmlseSB0YXNrZWQgd2l0aCBjcmVhdGluZyB0aGUgbW92aWVzIHBhZ2UgYW5kIGV2ZW50cyBkaXJlY3RvcnkuIEFjcm9zcyB0aGUgcHJvamVjdCBJIHdvcmtlZCB3aXRoIDxzdHJvbmc+bXVsdGlwbGUgQVBJ4oCZczwvc3Ryb25nPiwgPHN0cm9uZz5SZWFjdCBTdGF0aWM8L3N0cm9uZz4sIGFuZCBkZXZlbG9wZWQgPHN0cm9uZz5jbGVhbiBjb2RlPC9zdHJvbmc+IGZvciBvdGhlciBhZHZhbmNlZCBSZWFjdCBjb21wb25lbnRzLmBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnL3Byb2plY3RzL2RpLXJlcGFpcnMnLFxuICAgICAgICAgICAgaW1nU3JjOiBEaVJlcGFpcnNUaHVtYixcbiAgICAgICAgICAgIGFsdDogJ1RodW1ibmFpbCBmb3IgdGhlIERJIHJlcGFpcnMgZnJlZWxhbmNlIHdlYnNpdGUgcHJvamVjdCcsXG4gICAgICAgICAgICBwcm9qZWN0TmFtZTogJ0RJIFJlcGFpcnMnLFxuICAgICAgICAgICAgcHJvamVjdFllYXI6ICcyMDIwJyxcbiAgICAgICAgICAgIHByb2plY3RUZXh0OiBgQXMgdGhlIDxzdHJvbmc+b25seSBkZXZlbG9wZXIgJiBkZXNpZ25lcjwvc3Ryb25nPiBvbiB0aGlzIGZyZWVsYW5jZSBwcm9qZWN0LiBJIGNvbXBsZXRlbHkgcmUtZW52aXNpb25lZCB0aGUgc2l0ZSBkZXNpZ24gJiBidWlsdCB0aGUgcHJvamVjdCBmcm9tIHRoZSBncm91bmQgdXAgYXMgYW4gZXh0cmVtZWx5IHBlcmZvcm1hbnQgPHN0cm9uZz5TU0cgd2Vic2l0ZTwvc3Ryb25nPi4gSSB1dGlsaXplZCBkZXZlbG9wbWVudCAmIGRlc2lnbiBiZXN0IHByYWN0aWNlcyB3aXRoIGEgZm9jdXMgb24gdGhlIDxzdHJvbmc+dXNlciBleHBlcmllbmNlLjwvc3Ryb25nPmAsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJ3Byb2plY3RzL3N0YWxsaW9uJyxcbiAgICAgICAgICAgIGltZ1NyYzogU3RhbGxpb25UaHVtYixcbiAgICAgICAgICAgIGFsdDogJ1RodW1ibmFpbCBmb3IgdGhlIFN0YWxsaW9uIGNvbXBsZXRlIHdlYnNpdGUgcmVidWlsZCcsXG4gICAgICAgICAgICBwcm9qZWN0TmFtZTogJ1N0YWxsaW9uJyxcbiAgICAgICAgICAgIHByb2plY3RZZWFyOiAnMjAxOScsXG4gICAgICAgICAgICBwcm9qZWN0VGV4dDogYEFzIHRoZSA8c3Ryb25nPkxlYWQgRnJvbnQgRW5kIERldmVsb3Blcjwvc3Ryb25nPiBvbiBhIDxzdHJvbmc+Y29tcGxldGUgd2Vic2l0ZSByZWJ1aWxkPC9zdHJvbmc+LCBJIHdvcmtlZCB0b3dhcmRzIGVudmlzaW9uaW5nIGEgd2Vic2l0ZSB0aGF0IHdvdWxkIG1hdGNoIHRoZWlyIGlubm92YXRpdmUgU3RhbGxpb24gYXR0aXR1ZGUuIFRoZSBwcm9qZWN0IHdhcyBidWlsdCB3aXRoIGFuIDxzdHJvbmc+ZW1waGFzaXM8L3N0cm9uZz4gb24gPHN0cm9uZz5jbGVhbiBjb2RlPC9zdHJvbmc+LCBhbmQgPHN0cm9uZz5tb2R1bGFyaXR5Ljwvc3Ryb25nPiBUaGUgd2Vic2l0ZSBpbmNsdWRlcyBtdWx0aXBsZSBBUEnigJlzLCBmb3JtIHZlcmlmaWNhdGlvbiwgYW5kIG90aGVyIGFkdmFuY2VkIG1vZHVsZXMuYCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnL3Byb2plY3RzL3VuaXZlcnNpdHktcGFyaycsXG4gICAgICAgICAgICBpbWdTcmM6IFVuaXZlcnNpdHlQYXJrVGh1bWIsXG4gICAgICAgICAgICBhbHQ6ICdUaHVtYm5haWwgZm9yIHRoZSBDaXR5IG9mIFVuaXZlcnNpdHkgUGFyayBjb21wbGV0ZSBGcm9udCBFbmQgd2Vic2l0ZSByZWRlc2lnbicsXG4gICAgICAgICAgICBwcm9qZWN0TmFtZTogJ1VuaXZlcnNpdHkgUGFyaycsXG4gICAgICAgICAgICBwcm9qZWN0WWVhcjogJzIwMTknLFxuICAgICAgICAgICAgcHJvamVjdFRleHQ6IGBJIHdhcyB0YXNrZWQgd2l0aCBiZWluZyB0aGUgPHN0cm9uZz5zb2xlIGRldmVsb3Blcjwvc3Ryb25nPiBvbiBhIDxzdHJvbmc+Y29tcGxldGUgRnJvbnQtRW5kIHJlZGVzaWduPC9zdHJvbmc+LiBLZWVwaW5nIHRoZWlyIGN1cnJlbnQgdXNlcnMgaW4gbWluZCwgdGhlIGdvYWwgd2FzIHRvIG1ha2UgdGhlIHdlYnNpdGUgZmVlbCBtb3JlIG1vZGVybiwgYW5kIG9mZmVyIGEgYmV0dGVyIHVzZXIgZXhwZXJpZW5jZSB3aGVuIG5hdmlnYXRpbmcgdG8gZWFjaCBpbmRpdmlkdWFsIHBhZ2UuIEFjcm9zcyB0aGUgZW50aXJlIHByb2plY3QgSSBpbXBsZW1lbnRlZCBzZXZlcmFsIGR5bmFtaWNhbGx5IGdlbmVyYXRlZCBjb250ZW50IHBhZ2VzIC8gc2xpZGVycywgPHN0cm9uZz5mb3JtIHZlcmlmaWNhdGlvbjwvc3Ryb25nPiwgYW5kIHNldmVyYWwgPHN0cm9uZz50aGlyZCBwYXJ0eSBpbnRlZ3JhdGlvbnM8L3N0cm9uZz4uYCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAncHJvamVjdHMvY3JlYXRpdmUtcmV2b2x0JyxcbiAgICAgICAgICAgIGltZ1NyYzogQ3JlYXRpdmVSZXZvbHRUaHVtYixcbiAgICAgICAgICAgIGFsdDogJ1RodW1ibmFpbCBmb3IgdGhlIENyZWF0aXZlIFJldm9sdCByZWRlc2lnbmVkIHdlYnNpdGUnLFxuICAgICAgICAgICAgcHJvamVjdE5hbWU6ICdDcmVhdGl2ZSBSZXZvbHQnLFxuICAgICAgICAgICAgcHJvamVjdFllYXI6ICcyMDE4JyxcbiAgICAgICAgICAgIHByb2plY3RUZXh0OiBgVGhpcyB3YXMgYSBmcmVlbGFuY2UgcHJvamVjdCB0byA8c3Ryb25nPnJld29yayB0aGUgd2Vic2l0ZSBsYXlvdXQ8L3N0cm9uZz4gYW5kIHRhaWxvciB0aGUgZmVlbCBvZiB0aGUgd2Vic2l0ZSB0byBoZXIgcGVyc29uYWwgd3JpdGluZyBzdHlsZS4gSSA8c3Ryb25nPnJldmFtcGVkIHRoZSBjb2xvciBwYWxldHRlPC9zdHJvbmc+IHRvIGJldHRlciBtYXRjaCBoZXIgcGVyc29uYWxpdHksIGFkanVzdGVkIGhlciB3ZWJzaXRlIGZvciA8c3Ryb25nPlNFTzwvc3Ryb25nPiwgYW5kIGNyZWF0ZWQgdGhlIGxhbmRpbmcgcGFnZSBhcyB3ZWxsIGFzIG11bHRpcGxlIHBhZ2VzIGFjcm9zcyB0aGUgcGxhdGZvcm0uYCxcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgXVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuICAgIC5jb250YWluZXIge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuXG48L3N0eWxlPlxuXG48c3ZlbHRlOmhlYWQ+XG5cdDx0aXRsZT5Qcm9qZWN0cyB8IEZyb250IEVuZCBEZXZlbG9wZXIgLSBKb3NodWEgUm9wZXI8L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cblxuXG5cbjxkaXYgXG4gICAgY2xhc3M9XCJjb250YWluZXJcIiBcbj5cbiAgICA8UGFnZVRpdGxlIHRpdGxlPXsnUHJvamVjdHMnfSAvPlxuICAgIDxQcm9qZWN0cyBwb3J0Zm9saW9DYXJkcz17cG9ydGZvbGlvQ2FyZHN9IC8+XG48L2Rpdj4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLG9CQUFlOztBQ0FmLDBCQUFlOztBQ0FmLDBCQUFlOzs7Ozs7Ozs7Ozs7OzttQkN1RU8sVUFBVTs7Ozs7O3VDQUNGLEdBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBOURwQyxjQUFjOztHQUVWLEdBQUcsRUFBRSxtQkFBbUI7R0FDeEIsTUFBTSxFQUFFLFlBQVk7R0FDcEIsR0FBRyxFQUFFLGdEQUFnRDtHQUNyRCxXQUFXLEVBQUUsU0FBUztHQUN0QixXQUFXLEVBQUUsTUFBTTtHQUNuQixXQUFXOzs7R0FHWCxHQUFHLEVBQUUsc0JBQXNCO0dBQzNCLE1BQU0sRUFBRSxjQUFjO0dBQ3RCLEdBQUcsRUFBRSx3REFBd0Q7R0FDN0QsV0FBVyxFQUFFLFlBQVk7R0FDekIsV0FBVyxFQUFFLE1BQU07R0FDbkIsV0FBVzs7O0dBR1gsR0FBRyxFQUFFLG1CQUFtQjtHQUN4QixNQUFNLEVBQUUsYUFBYTtHQUNyQixHQUFHLEVBQUUscURBQXFEO0dBQzFELFdBQVcsRUFBRSxVQUFVO0dBQ3ZCLFdBQVcsRUFBRSxNQUFNO0dBQ25CLFdBQVc7OztHQUdYLEdBQUcsRUFBRSwyQkFBMkI7R0FDaEMsTUFBTSxFQUFFLG1CQUFtQjtHQUMzQixHQUFHLEVBQUUsK0VBQStFO0dBQ3BGLFdBQVcsRUFBRSxpQkFBaUI7R0FDOUIsV0FBVyxFQUFFLE1BQU07R0FDbkIsV0FBVzs7O0dBR1gsR0FBRyxFQUFFLDBCQUEwQjtHQUMvQixNQUFNLEVBQUUsbUJBQW1CO0dBQzNCLEdBQUcsRUFBRSxzREFBc0Q7R0FDM0QsV0FBVyxFQUFFLGlCQUFpQjtHQUM5QixXQUFXLEVBQUUsTUFBTTtHQUNuQixXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
