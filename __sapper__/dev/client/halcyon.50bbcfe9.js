import { S as SvelteComponentDev, i as init, s as safe_not_equal, a as space, e as element, f as claim_text, c as claim_element, b as children, d as detach, g as attr, h as add_location, j as insert, z as mount_component, u as transition_in, x as transition_out, A as destroy_component, t as text, k as append } from './index.86fc6f69.js';
import './index.60cd3d27.js';
import './TextAnimation.11321dbd.js';
import PageTransition from './PageTransition.edec49ed.js';
import { P as PageTitle, C as Carousel, D as Description, S as Skills } from './Skills.76b801ea.js';

/* src/routes/projects/halcyon.svelte generated by Svelte v3.9.1 */

const file = "src/routes/projects/halcyon.svelte";

// (127:4) <PageTransition>
function create_default_slot(ctx) {
	var div1, t0, div0, t1, section0, t2, section1, t3, section2, a, t4, a_href_value, current;

	var pagetitle = new PageTitle({
		props: { title: ctx.STATE.title },
		$$inline: true
	});

	var carousel = new Carousel({
		props: { images: ctx.STATE.images },
		$$inline: true
	});

	var description = new Description({
		props: { text: ctx.STATE.description, url: ctx.STATE.url },
		$$inline: true
	});

	var skills = new Skills({
		props: { skills: ctx.STATE.skills },
		$$inline: true
	});

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
			a = element("a");
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

			a = claim_element(section2_nodes, "A", { href: true, target: true, class: true }, false);
			var a_nodes = children(a);

			t4 = claim_text(a_nodes, "Check The Site!");
			a_nodes.forEach(detach);
			section2_nodes.forEach(detach);
			div0_nodes.forEach(detach);
			div1_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			attr(section0, "class", "project-description svelte-1riw4zc");
			add_location(section0, file, 131, 16, 3415);
			attr(section1, "class", "skills-container svelte-1riw4zc");
			add_location(section1, file, 134, 16, 3574);
			attr(a, "href", a_href_value = ctx.STATE.url);
			attr(a, "target", "blank");
			attr(a, "class", "svelte-1riw4zc");
			add_location(a, file, 138, 20, 3747);
			attr(section2, "class", "cta svelte-1riw4zc");
			add_location(section2, file, 137, 16, 3705);
			attr(div0, "class", "inner-container svelte-1riw4zc");
			add_location(div0, file, 129, 12, 3319);
			attr(div1, "class", "container");
			add_location(div1, file, 127, 8, 3237);
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
			append(section2, a);
			append(a, t4);
			current = true;
		},

		p: function update(changed, ctx) {
			var pagetitle_changes = {};
			if (changed.STATE) pagetitle_changes.title = ctx.STATE.title;
			pagetitle.$set(pagetitle_changes);

			var carousel_changes = {};
			if (changed.STATE) carousel_changes.images = ctx.STATE.images;
			carousel.$set(carousel_changes);

			var description_changes = {};
			if (changed.STATE) description_changes.text = ctx.STATE.description;
			if (changed.STATE) description_changes.url = ctx.STATE.url;
			description.$set(description_changes);

			var skills_changes = {};
			if (changed.STATE) skills_changes.skills = ctx.STATE.skills;
			skills.$set(skills_changes);
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
			attr(div, "class", "project-detail svelte-1riw4zc");
			add_location(div, file, 125, 0, 3179);
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
	


let STATE = {
    title: `Halcyon`,
    url: 'https://www.visithalcyon.com',
    description: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`,
    skills: [],
    images: [
        {
            src: 'images/halcyon/home-cta.png',
            visible: true,
            key: 0,
        },
        {
            src: 'images/halcyon/home.png',
            visible: false,
            key: 1,
        },
        {
            src: 'images/halcyon/dining.png',
            visible: false,
            key: 2,
        },
        {
            src: 'images/halcyon/events.png',
            visible: false,
            key: 3,
        },
        {
            src: 'images/halcyon/spotlight.png',
            visible: false,
            key: 4,
        }, 
    ]
};


// {
//     url: 'https://www.visithalcyon.com',
//     imgSrc: 'images/halcyon-5.jpg',
//     alt: 'Thumbnail for the Halcyon mall website rebuild',
//     projectName: 'Halcyon',
//     projectYear: '2019',
//     projectText: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`
// },

	return { STATE };
}

class Halcyon extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, []);
	}
}

export default Halcyon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFsY3lvbi41MGJiY2ZlOS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy9wcm9qZWN0cy9oYWxjeW9uLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuaW1wb3J0IFBhZ2VUcmFuc2l0aW9uIGZyb20gJy4uL1BhZ2VUcmFuc2l0aW9uLnN2ZWx0ZSc7XG5pbXBvcnQgUGFnZVRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvUGFnZVRpdGxlLnN2ZWx0ZSc7XG5pbXBvcnQgRGVzY3JpcHRpb24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wcm9qZWN0LWRldGFpbC9EZXNjcmlwdGlvbi5zdmVsdGUnO1xuaW1wb3J0IENhcm91c2VsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvQ2Fyb3VzZWwuc3ZlbHRlJztcbmltcG9ydCBTa2lsbHMgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wcm9qZWN0LWRldGFpbC9Ta2lsbHMuc3ZlbHRlJztcblxuXG5sZXQgU1RBVEUgPSB7XG4gICAgdGl0bGU6IGBIYWxjeW9uYCxcbiAgICB1cmw6ICdodHRwczovL3d3dy52aXNpdGhhbGN5b24uY29tJyxcbiAgICBkZXNjcmlwdGlvbjogYEkgd2FzIG9uZSBvZiB0aGUgRnJvbnQgRW5kIERldmVsb3BlcnMgb24gdGhlIHByb2plY3QgcHJpbWFyaWx5IHRhc2tlZCB3aXRoIGNyZWF0aW5nIHRoZSBtb3ZpZXMgcGFnZSBhbmQgZXZlbnRzIGRpcmVjdG9yeS4gQWNyb3NzIHRoZSBwcm9qZWN0IEkgd29ya2VkIHdpdGggPHN0cm9uZz5tdWx0aXBsZSBBUEnigJlzPC9zdHJvbmc+LCA8c3Ryb25nPlJlYWN0IFN0YXRpYzwvc3Ryb25nPiwgYW5kIGRldmVsb3BlZCA8c3Ryb25nPmNsZWFuIGNvZGU8L3N0cm9uZz4gZm9yIG90aGVyIGFkdmFuY2VkIFJlYWN0IGNvbXBvbmVudHMuYCxcbiAgICBza2lsbHM6IFtdLFxuICAgIGltYWdlczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvaGFsY3lvbi9ob21lLWN0YS5wbmcnLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGtleTogMCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2hhbGN5b24vaG9tZS5wbmcnLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDEsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltYWdlcy9oYWxjeW9uL2RpbmluZy5wbmcnLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltYWdlcy9oYWxjeW9uL2V2ZW50cy5wbmcnLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltYWdlcy9oYWxjeW9uL3Nwb3RsaWdodC5wbmcnLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDQsXG4gICAgICAgIH0sIFxuICAgIF1cbn1cblxuXG4vLyB7XG4vLyAgICAgdXJsOiAnaHR0cHM6Ly93d3cudmlzaXRoYWxjeW9uLmNvbScsXG4vLyAgICAgaW1nU3JjOiAnaW1hZ2VzL2hhbGN5b24tNS5qcGcnLFxuLy8gICAgIGFsdDogJ1RodW1ibmFpbCBmb3IgdGhlIEhhbGN5b24gbWFsbCB3ZWJzaXRlIHJlYnVpbGQnLFxuLy8gICAgIHByb2plY3ROYW1lOiAnSGFsY3lvbicsXG4vLyAgICAgcHJvamVjdFllYXI6ICcyMDE5Jyxcbi8vICAgICBwcm9qZWN0VGV4dDogYEkgd2FzIG9uZSBvZiB0aGUgRnJvbnQgRW5kIERldmVsb3BlcnMgb24gdGhlIHByb2plY3QgcHJpbWFyaWx5IHRhc2tlZCB3aXRoIGNyZWF0aW5nIHRoZSBtb3ZpZXMgcGFnZSBhbmQgZXZlbnRzIGRpcmVjdG9yeS4gQWNyb3NzIHRoZSBwcm9qZWN0IEkgd29ya2VkIHdpdGggPHN0cm9uZz5tdWx0aXBsZSBBUEnigJlzPC9zdHJvbmc+LCA8c3Ryb25nPlJlYWN0IFN0YXRpYzwvc3Ryb25nPiwgYW5kIGRldmVsb3BlZCA8c3Ryb25nPmNsZWFuIGNvZGU8L3N0cm9uZz4gZm9yIG90aGVyIGFkdmFuY2VkIFJlYWN0IGNvbXBvbmVudHMuYFxuLy8gfSxcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgICAgIC5pbm5lci1jb250YWluZXIge1xuICAgICAgICAgICAgd2lkdGg6IDkwJTtcbiAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgICAgIC5wcm9qZWN0LWRlc2NyaXB0aW9uIHtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMTIlO1xuICAgICAgICAgICAgbWFyZ2luOiA1MHJlbSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDY0ZW0pIHtcbiAgICAgICAgLnByb2plY3QtZGVzY3JpcHRpb24ge1xuICAgICAgICAgICAgbWFyZ2luOiA2MHJlbSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIC5jdGEge1xuICAgICAgICBtYXJnaW46IDYwcmVtIDA7XG4gICAgfVxuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDQwZW0pIHtcbiAgICAgICAgLmN0YSB7XG4gICAgICAgICAgICBtYXJnaW46IDc1cmVtIDA7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMTUlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDY0ZW0pIHtcbiAgICAgICAgLmN0YSB7XG4gICAgICAgICAgICBtYXJnaW46IDg1cmVtIDA7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMTclO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLmN0YSBhIHtcbiAgICAgICAgY29sb3I6ICM1ODU5NWI7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgIH1cblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA2NGVtKSB7XG4gICAgICAgIC5jdGEgYSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDI2cHg7XG4gICAgICAgICAgICBmb250LXdlaWdodDogODAwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIC5za2lsbHMtY29udGFpbmVyIHtcbiAgICAgICAgbWFyZ2luOiA0MHJlbSAwO1xuICAgIH1cblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA0MGVtKSB7XG4gICAgICAgIHNlY3Rpb24ge1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAxMiU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLnByb2plY3QtZGV0YWlsIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNjBweFxuICAgIH1cbjwvc3R5bGU+XG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPkNyZWF0aXZlIFJldm9sdCB8IEZyb250IEVuZCBEZXZlbG9wZXIgLSBKb3NodWEgUm9wZXI8L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cblxuXG48ZGl2IGNsYXNzPVwicHJvamVjdC1kZXRhaWxcIj5cbiAgICA8UGFnZVRyYW5zaXRpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgIDxQYWdlVGl0bGUgdGl0bGU9e1NUQVRFLnRpdGxlfSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlubmVyLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxDYXJvdXNlbCBpbWFnZXM9e1NUQVRFLmltYWdlc30vPlxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwicHJvamVjdC1kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8RGVzY3JpcHRpb24gdGV4dD17U1RBVEUuZGVzY3JpcHRpb259IHVybD17U1RBVEUudXJsfSAvPiBcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJza2lsbHMtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTa2lsbHMgc2tpbGxzPXtTVEFURS5za2lsbHN9IC8+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY3RhXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9e1NUQVRFLnVybH0gdGFyZ2V0PVwiYmxhbmtcIj5DaGVjayBUaGUgU2l0ZSE8L2E+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvUGFnZVRyYW5zaXRpb24+XG48L2Rpdj4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O3NCQWdJOEIsS0FBSyxDQUFDLEtBQUs7Ozs7O3VCQUVQLEtBQUssQ0FBQyxNQUFNOzs7OztxQkFFUCxLQUFLLENBQUMsV0FBVyxXQUFPLEtBQUssQ0FBQyxHQUFHOzs7Ozt1QkFHcEMsS0FBSyxDQUFDLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBR25CLEtBQUssQ0FBQyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0RBVlIsS0FBSyxDQUFDLEtBQUs7Ozs7b0RBRVAsS0FBSyxDQUFDLE1BQU07Ozs7cURBRVAsS0FBSyxDQUFDLFdBQVc7b0RBQU8sS0FBSyxDQUFDLEdBQUc7Ozs7a0RBR3BDLEtBQUssQ0FBQyxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEvSGhELElBQUksS0FBSyxHQUFHO0lBQ1IsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ2hCLEdBQUcsRUFBRSw4QkFBOEI7SUFDbkMsV0FBVyxFQUFFLENBQUMseVNBQXlTLENBQUM7SUFDeFQsTUFBTSxFQUFFLEVBQUU7SUFDVixNQUFNLEVBQUU7UUFDSjtZQUNJLEdBQUcsRUFBRSw2QkFBNkI7WUFDbEMsT0FBTyxFQUFFLElBQUk7WUFDYixHQUFHLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDSSxHQUFHLEVBQUUseUJBQXlCO1lBQzlCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsR0FBRyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0ksR0FBRyxFQUFFLDJCQUEyQjtZQUNoQyxPQUFPLEVBQUUsS0FBSztZQUNkLEdBQUcsRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNJLEdBQUcsRUFBRSwyQkFBMkI7WUFDaEMsT0FBTyxFQUFFLEtBQUs7WUFDZCxHQUFHLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDSSxHQUFHLEVBQUUsOEJBQThCO1lBQ25DLE9BQU8sRUFBRSxLQUFLO1lBQ2QsR0FBRyxFQUFFLENBQUM7U0FDVDtLQUNKO0VBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
