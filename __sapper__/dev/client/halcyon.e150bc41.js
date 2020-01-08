import { S as SvelteComponentDev, i as init, s as safe_not_equal, a as space, e as element, f as claim_text, c as claim_element, b as children, d as detach, g as attr, h as add_location, j as insert, z as mount_component, u as transition_in, x as transition_out, A as destroy_component, t as text, k as append } from './index.86fc6f69.js';
import './index.60cd3d27.js';
import './TextAnimation.ed24c4c5.js';
import PageTransition from './PageTransition.edec49ed.js';
import { P as PageTitle, C as Carousel, D as Description, S as Skills } from './Skills.f9889215.js';

/* src/routes/projects/halcyon.svelte generated by Svelte v3.9.1 */

const file = "src/routes/projects/halcyon.svelte";

// (124:4) <PageTransition>
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
			attr(section0, "class", "project-description svelte-1uema8p");
			add_location(section0, file, 128, 16, 3208);
			attr(section1, "class", "skills-container svelte-1uema8p");
			add_location(section1, file, 131, 16, 3367);
			attr(a, "href", a_href_value = ctx.STATE.url);
			attr(a, "target", "_blank");
			attr(a, "class", "svelte-1uema8p");
			add_location(a, file, 135, 20, 3540);
			attr(section2, "class", "cta svelte-1uema8p");
			add_location(section2, file, 134, 16, 3498);
			attr(div0, "class", "inner-container svelte-1uema8p");
			add_location(div0, file, 126, 12, 3112);
			attr(div1, "class", "container");
			add_location(div1, file, 124, 8, 3030);
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
			attr(div, "class", "project-detail svelte-1uema8p");
			add_location(div, file, 122, 0, 2972);
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
    url: 'https://www.visithalcyon.com/',
    description: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`,
    skills: ['React', 'React Static', 'JavaScript (ES6)', 'WordPress REST API', 'iShowtimes API', `Google API's`, 'AJAX / JSON', 'Bootstrap (React Bootstrap)', 'SCSS / SCSS', 'PostCSS', 'JSX (HTML WCAG 2.1)', 'PHP', 'WordPress', 'Adobe XD'],
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

	return { STATE };
}

class Halcyon extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, []);
	}
}

export default Halcyon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFsY3lvbi5lMTUwYmM0MS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy9wcm9qZWN0cy9oYWxjeW9uLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuaW1wb3J0IFBhZ2VUcmFuc2l0aW9uIGZyb20gJy4uL1BhZ2VUcmFuc2l0aW9uLnN2ZWx0ZSc7XG5pbXBvcnQgUGFnZVRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvUGFnZVRpdGxlLnN2ZWx0ZSc7XG5pbXBvcnQgRGVzY3JpcHRpb24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wcm9qZWN0LWRldGFpbC9EZXNjcmlwdGlvbi5zdmVsdGUnO1xuaW1wb3J0IENhcm91c2VsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvQ2Fyb3VzZWwuc3ZlbHRlJztcbmltcG9ydCBTa2lsbHMgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wcm9qZWN0LWRldGFpbC9Ta2lsbHMuc3ZlbHRlJztcblxuXG5sZXQgU1RBVEUgPSB7XG4gICAgdGl0bGU6IGBIYWxjeW9uYCxcbiAgICB1cmw6ICdodHRwczovL3d3dy52aXNpdGhhbGN5b24uY29tLycsXG4gICAgZGVzY3JpcHRpb246IGBJIHdhcyBvbmUgb2YgdGhlIEZyb250IEVuZCBEZXZlbG9wZXJzIG9uIHRoZSBwcm9qZWN0IHByaW1hcmlseSB0YXNrZWQgd2l0aCBjcmVhdGluZyB0aGUgbW92aWVzIHBhZ2UgYW5kIGV2ZW50cyBkaXJlY3RvcnkuIEFjcm9zcyB0aGUgcHJvamVjdCBJIHdvcmtlZCB3aXRoIDxzdHJvbmc+bXVsdGlwbGUgQVBJ4oCZczwvc3Ryb25nPiwgPHN0cm9uZz5SZWFjdCBTdGF0aWM8L3N0cm9uZz4sIGFuZCBkZXZlbG9wZWQgPHN0cm9uZz5jbGVhbiBjb2RlPC9zdHJvbmc+IGZvciBvdGhlciBhZHZhbmNlZCBSZWFjdCBjb21wb25lbnRzLmAsXG4gICAgc2tpbGxzOiBbJ1JlYWN0JywgJ1JlYWN0IFN0YXRpYycsICdKYXZhU2NyaXB0IChFUzYpJywgJ1dvcmRQcmVzcyBSRVNUIEFQSScsICdpU2hvd3RpbWVzIEFQSScsIGBHb29nbGUgQVBJJ3NgLCAnQUpBWCAvIEpTT04nLCAnQm9vdHN0cmFwIChSZWFjdCBCb290c3RyYXApJywgJ1NDU1MgLyBTQ1NTJywgJ1Bvc3RDU1MnLCAnSlNYIChIVE1MIFdDQUcgMi4xKScsICdQSFAnLCAnV29yZFByZXNzJywgJ0Fkb2JlIFhEJ10sXG4gICAgaW1hZ2VzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltYWdlcy9oYWxjeW9uL2hvbWUtY3RhLnBuZycsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAga2V5OiAwLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvaGFsY3lvbi9ob21lLnBuZycsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2hhbGN5b24vZGluaW5nLnBuZycsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2hhbGN5b24vZXZlbnRzLnBuZycsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2hhbGN5b24vc3BvdGxpZ2h0LnBuZycsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogNCxcbiAgICAgICAgfSwgXG4gICAgXVxufVxuXG48L3NjcmlwdD5cblxuPHN0eWxlPlxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICAuaW5uZXItY29udGFpbmVyIHtcbiAgICAgICAgICAgIHdpZHRoOiA5MCU7XG4gICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICAucHJvamVjdC1kZXNjcmlwdGlvbiB7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDEyJTtcbiAgICAgICAgICAgIG1hcmdpbjogNTByZW0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA2NGVtKSB7XG4gICAgICAgIC5wcm9qZWN0LWRlc2NyaXB0aW9uIHtcbiAgICAgICAgICAgIG1hcmdpbjogNjByZW0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAuY3RhIHtcbiAgICAgICAgbWFyZ2luOiA2MHJlbSAwO1xuICAgIH1cblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA0MGVtKSB7XG4gICAgICAgIC5jdGEge1xuICAgICAgICAgICAgbWFyZ2luOiA3NXJlbSAwO1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDE1JTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA2NGVtKSB7XG4gICAgICAgIC5jdGEge1xuICAgICAgICAgICAgbWFyZ2luOiA4NXJlbSAwO1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDE3JTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5jdGEgYSB7XG4gICAgICAgIGNvbG9yOiAjNTg1OTViO1xuICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIC4zcyBlYXNlO1xuICAgIH1cblxuICAgIC5jdGEgYTpob3ZlciB7XG4gICAgICAgIG9wYWNpdHk6IC43NTtcbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNjRlbSkge1xuICAgICAgICAuY3RhIGEge1xuICAgICAgICAgICAgZm9udC1zaXplOiAyNnB4O1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICAuc2tpbGxzLWNvbnRhaW5lciB7XG4gICAgICAgIG1hcmdpbjogNDByZW0gMDtcbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNDBlbSkge1xuICAgICAgICBzZWN0aW9uIHtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMTIlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC5wcm9qZWN0LWRldGFpbCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDYwcHhcbiAgICB9XG48L3N0eWxlPlxuXG48c3ZlbHRlOmhlYWQ+XG5cdDx0aXRsZT5DcmVhdGl2ZSBSZXZvbHQgfCBGcm9udCBFbmQgRGV2ZWxvcGVyIC0gSm9zaHVhIFJvcGVyPC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cblxuPGRpdiBjbGFzcz1cInByb2plY3QtZGV0YWlsXCI+XG4gICAgPFBhZ2VUcmFuc2l0aW9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8UGFnZVRpdGxlIHRpdGxlPXtTVEFURS50aXRsZX0gLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8Q2Fyb3VzZWwgaW1hZ2VzPXtTVEFURS5pbWFnZXN9Lz5cbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInByb2plY3QtZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPERlc2NyaXB0aW9uIHRleHQ9e1NUQVRFLmRlc2NyaXB0aW9ufSB1cmw9e1NUQVRFLnVybH0gLz4gXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwic2tpbGxzLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8U2tpbGxzIHNraWxscz17U1RBVEUuc2tpbGxzfSAvPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImN0YVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXtTVEFURS51cmx9IHRhcmdldD1cIl9ibGFua1wiPkNoZWNrIFRoZSBTaXRlITwvYT5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9QYWdlVHJhbnNpdGlvbj5cbjwvZGl2PiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7c0JBNkg4QixLQUFLLENBQUMsS0FBSzs7Ozs7dUJBRVAsS0FBSyxDQUFDLE1BQU07Ozs7O3FCQUVQLEtBQUssQ0FBQyxXQUFXLFdBQU8sS0FBSyxDQUFDLEdBQUc7Ozs7O3VCQUdwQyxLQUFLLENBQUMsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FHbkIsS0FBSyxDQUFDLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvREFWUixLQUFLLENBQUMsS0FBSzs7OztvREFFUCxLQUFLLENBQUMsTUFBTTs7OztxREFFUCxLQUFLLENBQUMsV0FBVztvREFBTyxLQUFLLENBQUMsR0FBRzs7OztrREFHcEMsS0FBSyxDQUFDLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTVIaEQsSUFBSSxLQUFLLEdBQUc7SUFDUixLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDaEIsR0FBRyxFQUFFLCtCQUErQjtJQUNwQyxXQUFXLEVBQUUsQ0FBQyx5U0FBeVMsQ0FBQztJQUN4VCxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixFQUFFLGdCQUFnQixFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsYUFBYSxFQUFFLDZCQUE2QixFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUscUJBQXFCLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUM7SUFDNU8sTUFBTSxFQUFFO1FBQ0o7WUFDSSxHQUFHLEVBQUUsNkJBQTZCO1lBQ2xDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsR0FBRyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0ksR0FBRyxFQUFFLHlCQUF5QjtZQUM5QixPQUFPLEVBQUUsS0FBSztZQUNkLEdBQUcsRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNJLEdBQUcsRUFBRSwyQkFBMkI7WUFDaEMsT0FBTyxFQUFFLEtBQUs7WUFDZCxHQUFHLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDSSxHQUFHLEVBQUUsMkJBQTJCO1lBQ2hDLE9BQU8sRUFBRSxLQUFLO1lBQ2QsR0FBRyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0ksR0FBRyxFQUFFLDhCQUE4QjtZQUNuQyxPQUFPLEVBQUUsS0FBSztZQUNkLEdBQUcsRUFBRSxDQUFDO1NBQ1Q7S0FDSjtFQUNKOzs7Ozs7Ozs7Ozs7OzsifQ==
