import { S as SvelteComponentDev, i as init, s as safe_not_equal, a as space, e as element, f as claim_text, c as claim_element, b as children, d as detach, g as attr, h as add_location, j as insert, z as mount_component, u as transition_in, x as transition_out, A as destroy_component, t as text, k as append } from './index.86fc6f69.js';
import './index.60cd3d27.js';
import './TextAnimation.11321dbd.js';
import PageTransition from './PageTransition.edec49ed.js';
import { P as PageTitle, C as Carousel, D as Description, S as Skills } from './Skills.b5ff3215.js';

/* src/routes/projects/halcyon.svelte generated by Svelte v3.9.1 */

const file = "src/routes/projects/halcyon.svelte";

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
			add_location(section0, file, 124, 16, 2913);
			attr(section1, "class", "skills-container svelte-mu6yvw");
			add_location(section1, file, 127, 16, 3034);
			attr(p, "class", "svelte-mu6yvw");
			add_location(p, file, 131, 20, 3185);
			attr(section2, "class", "cta svelte-mu6yvw");
			add_location(section2, file, 130, 16, 3143);
			attr(div0, "class", "inner-container svelte-mu6yvw");
			add_location(div0, file, 122, 12, 2823);
			attr(div1, "class", "container");
			add_location(div1, file, 120, 8, 2735);
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
			add_location(div, file, 118, 0, 2677);
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
        src: 'images/halcyon/home.png',
        visible: true,
        key: 0,
    },
    {
        src: 'images/halcyon/home-cta.png',
        visible: false,
        key: 1,
    },
    {
        src: 'images/halcyon/dining.png',
        visible: false,
        key: 2,
    },
    {
        src: 'images/creative-revolt/dining.png',
        visible: false,
        key: 3,
    },
    {
        src: 'images/creative-revolt/spotlight.png',
        visible: false,
        key: 4,
    },
];


// {
//     url: 'https://www.visithalcyon.com',
//     imgSrc: 'images/halcyon-5.jpg',
//     alt: 'Thumbnail for the Halcyon mall website rebuild',
//     projectName: 'Halcyon',
//     projectYear: '2019',
//     projectText: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`
// },

	return { images };
}

class Halcyon extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, []);
	}
}

export default Halcyon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFsY3lvbi40YjJlODYxNS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy9wcm9qZWN0cy9oYWxjeW9uLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuaW1wb3J0IFBhZ2VUcmFuc2l0aW9uIGZyb20gJy4uL1BhZ2VUcmFuc2l0aW9uLnN2ZWx0ZSc7XG5pbXBvcnQgUGFnZVRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvUGFnZVRpdGxlLnN2ZWx0ZSc7XG5pbXBvcnQgRGVzY3JpcHRpb24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wcm9qZWN0LWRldGFpbC9EZXNjcmlwdGlvbi5zdmVsdGUnO1xuaW1wb3J0IENhcm91c2VsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvQ2Fyb3VzZWwuc3ZlbHRlJztcbmltcG9ydCBTa2lsbHMgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wcm9qZWN0LWRldGFpbC9Ta2lsbHMuc3ZlbHRlJztcblxubGV0IGltYWdlcyA9IFtcbiAgICB7XG4gICAgICAgIHNyYzogJ2ltYWdlcy9oYWxjeW9uL2hvbWUucG5nJyxcbiAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAga2V5OiAwLFxuICAgIH0sXG4gICAge1xuICAgICAgICBzcmM6ICdpbWFnZXMvaGFsY3lvbi9ob21lLWN0YS5wbmcnLFxuICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAga2V5OiAxLFxuICAgIH0sXG4gICAge1xuICAgICAgICBzcmM6ICdpbWFnZXMvaGFsY3lvbi9kaW5pbmcucG5nJyxcbiAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgIGtleTogMixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgc3JjOiAnaW1hZ2VzL2NyZWF0aXZlLXJldm9sdC9kaW5pbmcucG5nJyxcbiAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgIGtleTogMyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgc3JjOiAnaW1hZ2VzL2NyZWF0aXZlLXJldm9sdC9zcG90bGlnaHQucG5nJyxcbiAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgIGtleTogNCxcbiAgICB9LFxuXVxuXG5cbi8vIHtcbi8vICAgICB1cmw6ICdodHRwczovL3d3dy52aXNpdGhhbGN5b24uY29tJyxcbi8vICAgICBpbWdTcmM6ICdpbWFnZXMvaGFsY3lvbi01LmpwZycsXG4vLyAgICAgYWx0OiAnVGh1bWJuYWlsIGZvciB0aGUgSGFsY3lvbiBtYWxsIHdlYnNpdGUgcmVidWlsZCcsXG4vLyAgICAgcHJvamVjdE5hbWU6ICdIYWxjeW9uJyxcbi8vICAgICBwcm9qZWN0WWVhcjogJzIwMTknLFxuLy8gICAgIHByb2plY3RUZXh0OiBgSSB3YXMgb25lIG9mIHRoZSBGcm9udCBFbmQgRGV2ZWxvcGVycyBvbiB0aGUgcHJvamVjdCBwcmltYXJpbHkgdGFza2VkIHdpdGggY3JlYXRpbmcgdGhlIG1vdmllcyBwYWdlIGFuZCBldmVudHMgZGlyZWN0b3J5LiBBY3Jvc3MgdGhlIHByb2plY3QgSSB3b3JrZWQgd2l0aCA8c3Ryb25nPm11bHRpcGxlIEFQSeKAmXM8L3N0cm9uZz4sIDxzdHJvbmc+UmVhY3QgU3RhdGljPC9zdHJvbmc+LCBhbmQgZGV2ZWxvcGVkIDxzdHJvbmc+Y2xlYW4gY29kZTwvc3Ryb25nPiBmb3Igb3RoZXIgYWR2YW5jZWQgUmVhY3QgY29tcG9uZW50cy5gXG4vLyB9LFxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgLmlubmVyLWNvbnRhaW5lciB7XG4gICAgICAgICAgICB3aWR0aDogOTAlO1xuICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgLnByb2plY3QtZGVzY3JpcHRpb24ge1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAxMiU7XG4gICAgICAgICAgICBtYXJnaW46IDUwcmVtIDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNjRlbSkge1xuICAgICAgICAucHJvamVjdC1kZXNjcmlwdGlvbiB7XG4gICAgICAgICAgICBtYXJnaW46IDYwcmVtIDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLmN0YSB7XG4gICAgICAgIG1hcmdpbjogNjByZW0gMDtcbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNDBlbSkge1xuICAgICAgICAuY3RhIHtcbiAgICAgICAgICAgIG1hcmdpbjogNzVyZW0gMDtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxNSU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNjRlbSkge1xuICAgICAgICAuY3RhIHtcbiAgICAgICAgICAgIG1hcmdpbjogODVyZW0gMDtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxNyU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAuY3RhIHAge1xuICAgICAgICBjb2xvcjogIzU4NTk1YjtcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgfVxuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDY0ZW0pIHtcbiAgICAgICAgLmN0YSBwIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjZweDtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgLnNraWxscy1jb250YWluZXIge1xuICAgICAgICBtYXJnaW46IDQwcmVtIDA7XG4gICAgfVxuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDQwZW0pIHtcbiAgICAgICAgc2VjdGlvbiB7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDEyJTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAucHJvamVjdC1kZXRhaWwge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiA2MHB4XG4gICAgfVxuPC9zdHlsZT5cblxuPHN2ZWx0ZTpoZWFkPlxuXHQ8dGl0bGU+Q3JlYXRpdmUgUmV2b2x0IHwgRnJvbnQgRW5kIERldmVsb3BlciAtIEpvc2h1YSBSb3BlcjwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG5cbjxkaXYgY2xhc3M9XCJwcm9qZWN0LWRldGFpbFwiPlxuICAgIDxQYWdlVHJhbnNpdGlvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPFBhZ2VUaXRsZSB0aXRsZT17J0NyZWF0aXZlIFJldm9sdCd9IC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPENhcm91c2VsIGltYWdlcz17aW1hZ2VzfS8+XG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJwcm9qZWN0LWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxEZXNjcmlwdGlvbiAvPiAgICBcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJza2lsbHMtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTa2lsbHMgLz5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjdGFcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+Q2hlY2sgVGhlIFNpdGUhPC9wPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L1BhZ2VUcmFuc2l0aW9uPlxuPC9kaXY+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztrQkF5SDhCLGlCQUFpQjs7Ozs7dUJBRWIsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FEQUFOLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcEh4QyxJQUFJLE1BQU0sR0FBRztJQUNUO1FBQ0ksR0FBRyxFQUFFLHlCQUF5QjtRQUM5QixPQUFPLEVBQUUsSUFBSTtRQUNiLEdBQUcsRUFBRSxDQUFDO0tBQ1Q7SUFDRDtRQUNJLEdBQUcsRUFBRSw2QkFBNkI7UUFDbEMsT0FBTyxFQUFFLEtBQUs7UUFDZCxHQUFHLEVBQUUsQ0FBQztLQUNUO0lBQ0Q7UUFDSSxHQUFHLEVBQUUsMkJBQTJCO1FBQ2hDLE9BQU8sRUFBRSxLQUFLO1FBQ2QsR0FBRyxFQUFFLENBQUM7S0FDVDtJQUNEO1FBQ0ksR0FBRyxFQUFFLG1DQUFtQztRQUN4QyxPQUFPLEVBQUUsS0FBSztRQUNkLEdBQUcsRUFBRSxDQUFDO0tBQ1Q7SUFDRDtRQUNJLEdBQUcsRUFBRSxzQ0FBc0M7UUFDM0MsT0FBTyxFQUFFLEtBQUs7UUFDZCxHQUFHLEVBQUUsQ0FBQztLQUNUO0VBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
