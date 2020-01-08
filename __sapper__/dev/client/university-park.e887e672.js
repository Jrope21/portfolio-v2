import { S as SvelteComponentDev, i as init, s as safe_not_equal, a as space, e as element, f as claim_text, c as claim_element, b as children, d as detach, g as attr, h as add_location, j as insert, z as mount_component, u as transition_in, x as transition_out, A as destroy_component, t as text, k as append } from './index.86fc6f69.js';
import './index.60cd3d27.js';
import './TextAnimation.11321dbd.js';
import PageTransition from './PageTransition.edec49ed.js';
import { P as PageTitle, C as Carousel, D as Description, S as Skills } from './Skills.b5ff3215.js';

/* src/routes/projects/university-park.svelte generated by Svelte v3.9.1 */

const file = "src/routes/projects/university-park.svelte";

// (119:4) <PageTransition>
function create_default_slot(ctx) {
	var div1, t0, div0, t1, section0, t2, section1, t3, section2, p, t4, current;

	var pagetitle = new PageTitle({
		props: { title: 'Creative Revolt' },
		$$inline: true
	});

	var carousel = new Carousel({
		props: { images: ctx.images },
		$$inline: true
	});

	var description = new Description({ $$inline: true });

	var skills = new Skills({ $$inline: true });

	return {
		c: function create() {
			div1 = element("div");
			pagetitle.$$.fragment.c();
			t0 = space();
			div0 = element("div");
			carousel.$$.fragment.c();
			t1 = space();
			section0 = element("section");
			description.$$.fragment.c();
			t2 = space();
			section1 = element("section");
			skills.$$.fragment.c();
			t3 = space();
			section2 = element("section");
			p = element("p");
			t4 = text("Check The Site!");
			this.h();
		},

		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true }, false);
			var div1_nodes = children(div1);

			pagetitle.$$.fragment.l(div1_nodes);
			t0 = claim_text(div1_nodes, "\n            ");

			div0 = claim_element(div1_nodes, "DIV", { class: true }, false);
			var div0_nodes = children(div0);

			carousel.$$.fragment.l(div0_nodes);
			t1 = claim_text(div0_nodes, "\n                ");

			section0 = claim_element(div0_nodes, "SECTION", { class: true }, false);
			var section0_nodes = children(section0);

			description.$$.fragment.l(section0_nodes);
			section0_nodes.forEach(detach);
			t2 = claim_text(div0_nodes, "\n                ");

			section1 = claim_element(div0_nodes, "SECTION", { class: true }, false);
			var section1_nodes = children(section1);

			skills.$$.fragment.l(section1_nodes);
			section1_nodes.forEach(detach);
			t3 = claim_text(div0_nodes, "\n                ");

			section2 = claim_element(div0_nodes, "SECTION", { class: true }, false);
			var section2_nodes = children(section2);

			p = claim_element(section2_nodes, "P", { class: true }, false);
			var p_nodes = children(p);

			t4 = claim_text(p_nodes, "Check The Site!");
			p_nodes.forEach(detach);
			section2_nodes.forEach(detach);
			div0_nodes.forEach(detach);
			div1_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			attr(section0, "class", "project-description svelte-mu6yvw");
			add_location(section0, file, 123, 16, 3145);
			attr(section1, "class", "skills-container svelte-mu6yvw");
			add_location(section1, file, 126, 16, 3266);
			attr(p, "class", "svelte-mu6yvw");
			add_location(p, file, 130, 20, 3417);
			attr(section2, "class", "cta svelte-mu6yvw");
			add_location(section2, file, 129, 16, 3375);
			attr(div0, "class", "inner-container svelte-mu6yvw");
			add_location(div0, file, 121, 12, 3055);
			attr(div1, "class", "container");
			add_location(div1, file, 119, 8, 2967);
		},

		m: function mount(target, anchor) {
			insert(target, div1, anchor);
			mount_component(pagetitle, div1, null);
			append(div1, t0);
			append(div1, div0);
			mount_component(carousel, div0, null);
			append(div0, t1);
			append(div0, section0);
			mount_component(description, section0, null);
			append(div0, t2);
			append(div0, section1);
			mount_component(skills, section1, null);
			append(div0, t3);
			append(div0, section2);
			append(section2, p);
			append(p, t4);
			current = true;
		},

		p: function update(changed, ctx) {
			var carousel_changes = {};
			if (changed.images) carousel_changes.images = ctx.images;
			carousel.$set(carousel_changes);
		},

		i: function intro(local) {
			if (current) return;
			transition_in(pagetitle.$$.fragment, local);

			transition_in(carousel.$$.fragment, local);

			transition_in(description.$$.fragment, local);

			transition_in(skills.$$.fragment, local);

			current = true;
		},

		o: function outro(local) {
			transition_out(pagetitle.$$.fragment, local);
			transition_out(carousel.$$.fragment, local);
			transition_out(description.$$.fragment, local);
			transition_out(skills.$$.fragment, local);
			current = false;
		},

		d: function destroy(detaching) {
			if (detaching) {
				detach(div1);
			}

			destroy_component(pagetitle);

			destroy_component(carousel);

			destroy_component(description);

			destroy_component(skills);
		}
	};
}

function create_fragment(ctx) {
	var t, div, current;

	var pagetransition = new PageTransition({
		props: {
		$$slots: { default: [create_default_slot] },
		$$scope: { ctx }
	},
		$$inline: true
	});

	return {
		c: function create() {
			t = space();
			div = element("div");
			pagetransition.$$.fragment.c();
			this.h();
		},

		l: function claim(nodes) {
			t = claim_text(nodes, "\n\n\n");

			div = claim_element(nodes, "DIV", { class: true }, false);
			var div_nodes = children(div);

			pagetransition.$$.fragment.l(div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			document.title = "Creative Revolt | Front End Developer - Joshua Roper";
			attr(div, "class", "project-detail svelte-mu6yvw");
			add_location(div, file, 117, 0, 2909);
		},

		m: function mount(target, anchor) {
			insert(target, t, anchor);
			insert(target, div, anchor);
			mount_component(pagetransition, div, null);
			current = true;
		},

		p: function update(changed, ctx) {
			var pagetransition_changes = {};
			if (changed.$$scope) pagetransition_changes.$$scope = { changed, ctx };
			pagetransition.$set(pagetransition_changes);
		},

		i: function intro(local) {
			if (current) return;
			transition_in(pagetransition.$$.fragment, local);

			current = true;
		},

		o: function outro(local) {
			transition_out(pagetransition.$$.fragment, local);
			current = false;
		},

		d: function destroy(detaching) {
			if (detaching) {
				detach(t);
				detach(div);
			}

			destroy_component(pagetransition);
		}
	};
}

function instance($$self) {
	

let images = [
    {
        src: 'images/creative-revolt/home.png',
        visible: true,
        key: 0,
    },
    {
        src: 'images/creative-revolt/home-ctas.png',
        visible: false,
        key: 1,
    },
    {
        src: 'images/creative-revolt/about.png',
        visible: false,
        key: 2,
    },
    {
        src: 'images/creative-revolt/about-cta.png',
        visible: false,
        key: 3,
    },
    {
        src: 'images/creative-revolt/writing-class.png',
        visible: false,
        key: 4,
    },
];

// {
//     url: 'https://www.uptexas.org',
//     imgSrc: 'images/uptexas-thumb.jpg',
//     alt: 'Thumbnail for the City of University Park complete Front End website redesign',
//     projectName: 'University Park',
//     projectYear: '2019',
//     projectText: `I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.`,
// },

	return { images };
}

class University_park extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, []);
	}
}

export default University_park;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdmVyc2l0eS1wYXJrLmU4ODdlNjcyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL3Byb2plY3RzL3VuaXZlcnNpdHktcGFyay5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbmltcG9ydCBQYWdlVHJhbnNpdGlvbiBmcm9tICcuLi9QYWdlVHJhbnNpdGlvbi5zdmVsdGUnO1xuaW1wb3J0IFBhZ2VUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3Byb2plY3QtZGV0YWlsL1BhZ2VUaXRsZS5zdmVsdGUnO1xuaW1wb3J0IERlc2NyaXB0aW9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvRGVzY3JpcHRpb24uc3ZlbHRlJztcbmltcG9ydCBDYXJvdXNlbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL3Byb2plY3QtZGV0YWlsL0Nhcm91c2VsLnN2ZWx0ZSc7XG5pbXBvcnQgU2tpbGxzIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvU2tpbGxzLnN2ZWx0ZSc7XG5cbmxldCBpbWFnZXMgPSBbXG4gICAge1xuICAgICAgICBzcmM6ICdpbWFnZXMvY3JlYXRpdmUtcmV2b2x0L2hvbWUucG5nJyxcbiAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAga2V5OiAwLFxuICAgIH0sXG4gICAge1xuICAgICAgICBzcmM6ICdpbWFnZXMvY3JlYXRpdmUtcmV2b2x0L2hvbWUtY3Rhcy5wbmcnLFxuICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAga2V5OiAxLFxuICAgIH0sXG4gICAge1xuICAgICAgICBzcmM6ICdpbWFnZXMvY3JlYXRpdmUtcmV2b2x0L2Fib3V0LnBuZycsXG4gICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICBrZXk6IDIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHNyYzogJ2ltYWdlcy9jcmVhdGl2ZS1yZXZvbHQvYWJvdXQtY3RhLnBuZycsXG4gICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICBrZXk6IDMsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHNyYzogJ2ltYWdlcy9jcmVhdGl2ZS1yZXZvbHQvd3JpdGluZy1jbGFzcy5wbmcnLFxuICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAga2V5OiA0LFxuICAgIH0sXG5dXG5cbi8vIHtcbi8vICAgICB1cmw6ICdodHRwczovL3d3dy51cHRleGFzLm9yZycsXG4vLyAgICAgaW1nU3JjOiAnaW1hZ2VzL3VwdGV4YXMtdGh1bWIuanBnJyxcbi8vICAgICBhbHQ6ICdUaHVtYm5haWwgZm9yIHRoZSBDaXR5IG9mIFVuaXZlcnNpdHkgUGFyayBjb21wbGV0ZSBGcm9udCBFbmQgd2Vic2l0ZSByZWRlc2lnbicsXG4vLyAgICAgcHJvamVjdE5hbWU6ICdVbml2ZXJzaXR5IFBhcmsnLFxuLy8gICAgIHByb2plY3RZZWFyOiAnMjAxOScsXG4vLyAgICAgcHJvamVjdFRleHQ6IGBJIHdhcyB0YXNrZWQgd2l0aCBiZWluZyB0aGUgPHN0cm9uZz5zb2xlIGRldmVsb3Blcjwvc3Ryb25nPiBvbiBhIDxzdHJvbmc+Y29tcGxldGUgRnJvbnQtRW5kIHJlZGVzaWduPC9zdHJvbmc+LiBLZWVwaW5nIHRoZWlyIGN1cnJlbnQgdXNlcnMgaW4gbWluZCwgdGhlIGdvYWwgd2FzIHRvIG1ha2UgdGhlIHdlYnNpdGUgZmVlbCBtb3JlIG1vZGVybiwgYW5kIG9mZmVyIGEgYmV0dGVyIHVzZXIgZXhwZXJpZW5jZSB3aGVuIG5hdmlnYXRpbmcgdG8gZWFjaCBpbmRpdmlkdWFsIHBhZ2UuIEFjcm9zcyB0aGUgZW50aXJlIHByb2plY3QgSSBpbXBsZW1lbnRlZCBzZXZlcmFsIGR5bmFtaWNhbGx5IGdlbmVyYXRlZCBjb250ZW50IHBhZ2VzIC8gc2xpZGVycywgPHN0cm9uZz5mb3JtIHZlcmlmaWNhdGlvbjwvc3Ryb25nPiwgYW5kIHNldmVyYWwgPHN0cm9uZz50aGlyZCBwYXJ0eSBpbnRlZ3JhdGlvbnM8L3N0cm9uZz4uYCxcbi8vIH0sXG48L3NjcmlwdD5cblxuPHN0eWxlPlxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICAuaW5uZXItY29udGFpbmVyIHtcbiAgICAgICAgICAgIHdpZHRoOiA5MCU7XG4gICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICAucHJvamVjdC1kZXNjcmlwdGlvbiB7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDEyJTtcbiAgICAgICAgICAgIG1hcmdpbjogNTByZW0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA2NGVtKSB7XG4gICAgICAgIC5wcm9qZWN0LWRlc2NyaXB0aW9uIHtcbiAgICAgICAgICAgIG1hcmdpbjogNjByZW0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAuY3RhIHtcbiAgICAgICAgbWFyZ2luOiA2MHJlbSAwO1xuICAgIH1cblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA0MGVtKSB7XG4gICAgICAgIC5jdGEge1xuICAgICAgICAgICAgbWFyZ2luOiA3NXJlbSAwO1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDE1JTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA2NGVtKSB7XG4gICAgICAgIC5jdGEge1xuICAgICAgICAgICAgbWFyZ2luOiA4NXJlbSAwO1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDE3JTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5jdGEgcCB7XG4gICAgICAgIGNvbG9yOiAjNTg1OTViO1xuICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNjRlbSkge1xuICAgICAgICAuY3RhIHAge1xuICAgICAgICAgICAgZm9udC1zaXplOiAyNnB4O1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICAuc2tpbGxzLWNvbnRhaW5lciB7XG4gICAgICAgIG1hcmdpbjogNDByZW0gMDtcbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNDBlbSkge1xuICAgICAgICBzZWN0aW9uIHtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMTIlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC5wcm9qZWN0LWRldGFpbCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDYwcHhcbiAgICB9XG48L3N0eWxlPlxuXG48c3ZlbHRlOmhlYWQ+XG5cdDx0aXRsZT5DcmVhdGl2ZSBSZXZvbHQgfCBGcm9udCBFbmQgRGV2ZWxvcGVyIC0gSm9zaHVhIFJvcGVyPC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cblxuPGRpdiBjbGFzcz1cInByb2plY3QtZGV0YWlsXCI+XG4gICAgPFBhZ2VUcmFuc2l0aW9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8UGFnZVRpdGxlIHRpdGxlPXsnQ3JlYXRpdmUgUmV2b2x0J30gLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8Q2Fyb3VzZWwgaW1hZ2VzPXtpbWFnZXN9Lz5cbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInByb2plY3QtZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPERlc2NyaXB0aW9uIC8+ICAgIFxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInNraWxscy1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPFNraWxscyAvPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImN0YVwiPlxuICAgICAgICAgICAgICAgICAgICA8cD5DaGVjayBUaGUgU2l0ZSE8L3A+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvUGFnZVRyYW5zaXRpb24+XG48L2Rpdj4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O2tCQXdIOEIsaUJBQWlCOzs7Ozt1QkFFYixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cURBQU4sTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFuSHhDLElBQUksTUFBTSxHQUFHO0lBQ1Q7UUFDSSxHQUFHLEVBQUUsaUNBQWlDO1FBQ3RDLE9BQU8sRUFBRSxJQUFJO1FBQ2IsR0FBRyxFQUFFLENBQUM7S0FDVDtJQUNEO1FBQ0ksR0FBRyxFQUFFLHNDQUFzQztRQUMzQyxPQUFPLEVBQUUsS0FBSztRQUNkLEdBQUcsRUFBRSxDQUFDO0tBQ1Q7SUFDRDtRQUNJLEdBQUcsRUFBRSxrQ0FBa0M7UUFDdkMsT0FBTyxFQUFFLEtBQUs7UUFDZCxHQUFHLEVBQUUsQ0FBQztLQUNUO0lBQ0Q7UUFDSSxHQUFHLEVBQUUsc0NBQXNDO1FBQzNDLE9BQU8sRUFBRSxLQUFLO1FBQ2QsR0FBRyxFQUFFLENBQUM7S0FDVDtJQUNEO1FBQ0ksR0FBRyxFQUFFLDBDQUEwQztRQUMvQyxPQUFPLEVBQUUsS0FBSztRQUNkLEdBQUcsRUFBRSxDQUFDO0tBQ1Q7RUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
