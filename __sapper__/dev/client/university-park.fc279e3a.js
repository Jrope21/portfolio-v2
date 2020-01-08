import { S as SvelteComponentDev, i as init, s as safe_not_equal, a as space, e as element, f as claim_text, c as claim_element, b as children, d as detach, g as attr, h as add_location, j as insert, z as mount_component, u as transition_in, x as transition_out, A as destroy_component, t as text, k as append } from './index.86fc6f69.js';
import './index.60cd3d27.js';
import './TextAnimation.11321dbd.js';
import PageTransition from './PageTransition.edec49ed.js';
import { P as PageTitle, C as Carousel, D as Description, S as Skills } from './Skills.b5ff3215.js';

/* src/routes/projects/university-park.svelte generated by Svelte v3.9.1 */

const file = "src/routes/projects/university-park.svelte";

// (120:4) <PageTransition>
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
			add_location(section0, file, 124, 16, 3145);
			attr(section1, "class", "skills-container svelte-mu6yvw");
			add_location(section1, file, 127, 16, 3266);
			attr(p, "class", "svelte-mu6yvw");
			add_location(p, file, 131, 20, 3417);
			attr(section2, "class", "cta svelte-mu6yvw");
			add_location(section2, file, 130, 16, 3375);
			attr(div0, "class", "inner-container svelte-mu6yvw");
			add_location(div0, file, 122, 12, 3055);
			attr(div1, "class", "container");
			add_location(div1, file, 120, 8, 2967);
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
			add_location(div, file, 118, 0, 2909);
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
        src: 'images/university-park/home.png',
        visible: true,
        key: 0,
    },
    
    {
        src: 'images/university-park/library.png',
        visible: false,
        key: 1,
    },
    {
        src: 'images/university-park/home-video.png',
        visible: false,
        key: 2,
    },
    {
        src: 'images/university-park/form.png',
        visible: false,
        key: 3,
    },
    {
        src: 'images/university-park/newsletter.png',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdmVyc2l0eS1wYXJrLmZjMjc5ZTNhLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL3Byb2plY3RzL3VuaXZlcnNpdHktcGFyay5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbmltcG9ydCBQYWdlVHJhbnNpdGlvbiBmcm9tICcuLi9QYWdlVHJhbnNpdGlvbi5zdmVsdGUnO1xuaW1wb3J0IFBhZ2VUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3Byb2plY3QtZGV0YWlsL1BhZ2VUaXRsZS5zdmVsdGUnO1xuaW1wb3J0IERlc2NyaXB0aW9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvRGVzY3JpcHRpb24uc3ZlbHRlJztcbmltcG9ydCBDYXJvdXNlbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL3Byb2plY3QtZGV0YWlsL0Nhcm91c2VsLnN2ZWx0ZSc7XG5pbXBvcnQgU2tpbGxzIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvU2tpbGxzLnN2ZWx0ZSc7XG5cbmxldCBpbWFnZXMgPSBbXG4gICAge1xuICAgICAgICBzcmM6ICdpbWFnZXMvdW5pdmVyc2l0eS1wYXJrL2hvbWUucG5nJyxcbiAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAga2V5OiAwLFxuICAgIH0sXG4gICAgXG4gICAge1xuICAgICAgICBzcmM6ICdpbWFnZXMvdW5pdmVyc2l0eS1wYXJrL2xpYnJhcnkucG5nJyxcbiAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgIGtleTogMSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgc3JjOiAnaW1hZ2VzL3VuaXZlcnNpdHktcGFyay9ob21lLXZpZGVvLnBuZycsXG4gICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICBrZXk6IDIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHNyYzogJ2ltYWdlcy91bml2ZXJzaXR5LXBhcmsvZm9ybS5wbmcnLFxuICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAga2V5OiAzLFxuICAgIH0sXG4gICAge1xuICAgICAgICBzcmM6ICdpbWFnZXMvdW5pdmVyc2l0eS1wYXJrL25ld3NsZXR0ZXIucG5nJyxcbiAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgIGtleTogNCxcbiAgICB9LFxuXVxuXG4vLyB7XG4vLyAgICAgdXJsOiAnaHR0cHM6Ly93d3cudXB0ZXhhcy5vcmcnLFxuLy8gICAgIGltZ1NyYzogJ2ltYWdlcy91cHRleGFzLXRodW1iLmpwZycsXG4vLyAgICAgYWx0OiAnVGh1bWJuYWlsIGZvciB0aGUgQ2l0eSBvZiBVbml2ZXJzaXR5IFBhcmsgY29tcGxldGUgRnJvbnQgRW5kIHdlYnNpdGUgcmVkZXNpZ24nLFxuLy8gICAgIHByb2plY3ROYW1lOiAnVW5pdmVyc2l0eSBQYXJrJyxcbi8vICAgICBwcm9qZWN0WWVhcjogJzIwMTknLFxuLy8gICAgIHByb2plY3RUZXh0OiBgSSB3YXMgdGFza2VkIHdpdGggYmVpbmcgdGhlIDxzdHJvbmc+c29sZSBkZXZlbG9wZXI8L3N0cm9uZz4gb24gYSA8c3Ryb25nPmNvbXBsZXRlIEZyb250LUVuZCByZWRlc2lnbjwvc3Ryb25nPi4gS2VlcGluZyB0aGVpciBjdXJyZW50IHVzZXJzIGluIG1pbmQsIHRoZSBnb2FsIHdhcyB0byBtYWtlIHRoZSB3ZWJzaXRlIGZlZWwgbW9yZSBtb2Rlcm4sIGFuZCBvZmZlciBhIGJldHRlciB1c2VyIGV4cGVyaWVuY2Ugd2hlbiBuYXZpZ2F0aW5nIHRvIGVhY2ggaW5kaXZpZHVhbCBwYWdlLiBBY3Jvc3MgdGhlIGVudGlyZSBwcm9qZWN0IEkgaW1wbGVtZW50ZWQgc2V2ZXJhbCBkeW5hbWljYWxseSBnZW5lcmF0ZWQgY29udGVudCBwYWdlcyAvIHNsaWRlcnMsIDxzdHJvbmc+Zm9ybSB2ZXJpZmljYXRpb248L3N0cm9uZz4sIGFuZCBzZXZlcmFsIDxzdHJvbmc+dGhpcmQgcGFydHkgaW50ZWdyYXRpb25zPC9zdHJvbmc+LmAsXG4vLyB9LFxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgLmlubmVyLWNvbnRhaW5lciB7XG4gICAgICAgICAgICB3aWR0aDogOTAlO1xuICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgLnByb2plY3QtZGVzY3JpcHRpb24ge1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAxMiU7XG4gICAgICAgICAgICBtYXJnaW46IDUwcmVtIDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNjRlbSkge1xuICAgICAgICAucHJvamVjdC1kZXNjcmlwdGlvbiB7XG4gICAgICAgICAgICBtYXJnaW46IDYwcmVtIDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLmN0YSB7XG4gICAgICAgIG1hcmdpbjogNjByZW0gMDtcbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNDBlbSkge1xuICAgICAgICAuY3RhIHtcbiAgICAgICAgICAgIG1hcmdpbjogNzVyZW0gMDtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxNSU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNjRlbSkge1xuICAgICAgICAuY3RhIHtcbiAgICAgICAgICAgIG1hcmdpbjogODVyZW0gMDtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxNyU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAuY3RhIHAge1xuICAgICAgICBjb2xvcjogIzU4NTk1YjtcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgfVxuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDY0ZW0pIHtcbiAgICAgICAgLmN0YSBwIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjZweDtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgLnNraWxscy1jb250YWluZXIge1xuICAgICAgICBtYXJnaW46IDQwcmVtIDA7XG4gICAgfVxuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDQwZW0pIHtcbiAgICAgICAgc2VjdGlvbiB7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDEyJTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAucHJvamVjdC1kZXRhaWwge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiA2MHB4XG4gICAgfVxuPC9zdHlsZT5cblxuPHN2ZWx0ZTpoZWFkPlxuXHQ8dGl0bGU+Q3JlYXRpdmUgUmV2b2x0IHwgRnJvbnQgRW5kIERldmVsb3BlciAtIEpvc2h1YSBSb3BlcjwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG5cbjxkaXYgY2xhc3M9XCJwcm9qZWN0LWRldGFpbFwiPlxuICAgIDxQYWdlVHJhbnNpdGlvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPFBhZ2VUaXRsZSB0aXRsZT17J0NyZWF0aXZlIFJldm9sdCd9IC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPENhcm91c2VsIGltYWdlcz17aW1hZ2VzfS8+XG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJwcm9qZWN0LWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxEZXNjcmlwdGlvbiAvPiAgICBcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJza2lsbHMtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTa2lsbHMgLz5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjdGFcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+Q2hlY2sgVGhlIFNpdGUhPC9wPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L1BhZ2VUcmFuc2l0aW9uPlxuPC9kaXY+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztrQkF5SDhCLGlCQUFpQjs7Ozs7dUJBRWIsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FEQUFOLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcEh4QyxJQUFJLE1BQU0sR0FBRztJQUNUO1FBQ0ksR0FBRyxFQUFFLGlDQUFpQztRQUN0QyxPQUFPLEVBQUUsSUFBSTtRQUNiLEdBQUcsRUFBRSxDQUFDO0tBQ1Q7O0lBRUQ7UUFDSSxHQUFHLEVBQUUsb0NBQW9DO1FBQ3pDLE9BQU8sRUFBRSxLQUFLO1FBQ2QsR0FBRyxFQUFFLENBQUM7S0FDVDtJQUNEO1FBQ0ksR0FBRyxFQUFFLHVDQUF1QztRQUM1QyxPQUFPLEVBQUUsS0FBSztRQUNkLEdBQUcsRUFBRSxDQUFDO0tBQ1Q7SUFDRDtRQUNJLEdBQUcsRUFBRSxpQ0FBaUM7UUFDdEMsT0FBTyxFQUFFLEtBQUs7UUFDZCxHQUFHLEVBQUUsQ0FBQztLQUNUO0lBQ0Q7UUFDSSxHQUFHLEVBQUUsdUNBQXVDO1FBQzVDLE9BQU8sRUFBRSxLQUFLO1FBQ2QsR0FBRyxFQUFFLENBQUM7S0FDVDtFQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
