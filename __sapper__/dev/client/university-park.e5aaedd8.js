import { S as SvelteComponentDev, i as init, s as safe_not_equal, a as space, e as element, f as claim_text, c as claim_element, b as children, d as detach, g as attr, h as add_location, j as insert, z as mount_component, u as transition_in, x as transition_out, A as destroy_component, t as text, k as append } from './index.86fc6f69.js';
import './index.60cd3d27.js';
import './TextAnimation.b994bc5b.js';
import PageTransition from './PageTransition.edec49ed.js';
import { P as PageTitle, C as Carousel, D as Description, S as Skills } from './Skills.3f662e68.js';

/* src/routes/projects/university-park.svelte generated by Svelte v3.9.1 */

const file = "src/routes/projects/university-park.svelte";

// (125:4) <PageTransition>
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
			add_location(section0, file, 129, 16, 3374);
			attr(section1, "class", "skills-container svelte-1uema8p");
			add_location(section1, file, 132, 16, 3536);
			attr(a, "href", a_href_value = ctx.STATE.url);
			attr(a, "target", "_blank");
			attr(a, "class", "svelte-1uema8p");
			add_location(a, file, 136, 20, 3708);
			attr(section2, "class", "cta svelte-1uema8p");
			add_location(section2, file, 135, 16, 3666);
			attr(div0, "class", "inner-container svelte-1uema8p");
			add_location(div0, file, 127, 12, 3278);
			attr(div1, "class", "container");
			add_location(div1, file, 125, 8, 3196);
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
			add_location(div, file, 123, 0, 3138);
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
    title: `University Park`,
    url: 'https://www.uptexas.org/',
    description: `I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.`,
    skills: ['JavaScript (ES6+)', 'jQuery', 'API Integration', 'AJAX / JSON', 'SASS / SCSS', 'CSS', 'Foundation', 'HTML (WCAG 2.1)', 'Adobe Illustrator', 'SEO', 'Kentico (CMS)', 'BitBucket'],
    images: [
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
    ]
};

	return { STATE };
}

class University_park extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, []);
	}
}

export default University_park;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdmVyc2l0eS1wYXJrLmU1YWFlZGQ4LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL3Byb2plY3RzL3VuaXZlcnNpdHktcGFyay5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbmltcG9ydCBQYWdlVHJhbnNpdGlvbiBmcm9tICcuLi9QYWdlVHJhbnNpdGlvbi5zdmVsdGUnO1xuaW1wb3J0IFBhZ2VUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3Byb2plY3QtZGV0YWlsL1BhZ2VUaXRsZS5zdmVsdGUnO1xuaW1wb3J0IERlc2NyaXB0aW9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvRGVzY3JpcHRpb24uc3ZlbHRlJztcbmltcG9ydCBDYXJvdXNlbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL3Byb2plY3QtZGV0YWlsL0Nhcm91c2VsLnN2ZWx0ZSc7XG5pbXBvcnQgU2tpbGxzIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvU2tpbGxzLnN2ZWx0ZSc7XG5cblxubGV0IFNUQVRFID0ge1xuICAgIHRpdGxlOiBgVW5pdmVyc2l0eSBQYXJrYCxcbiAgICB1cmw6ICdodHRwczovL3d3dy51cHRleGFzLm9yZy8nLFxuICAgIGRlc2NyaXB0aW9uOiBgSSB3YXMgdGFza2VkIHdpdGggYmVpbmcgdGhlIDxzdHJvbmc+c29sZSBkZXZlbG9wZXI8L3N0cm9uZz4gb24gYSA8c3Ryb25nPmNvbXBsZXRlIEZyb250LUVuZCByZWRlc2lnbjwvc3Ryb25nPi4gS2VlcGluZyB0aGVpciBjdXJyZW50IHVzZXJzIGluIG1pbmQsIHRoZSBnb2FsIHdhcyB0byBtYWtlIHRoZSB3ZWJzaXRlIGZlZWwgbW9yZSBtb2Rlcm4sIGFuZCBvZmZlciBhIGJldHRlciB1c2VyIGV4cGVyaWVuY2Ugd2hlbiBuYXZpZ2F0aW5nIHRvIGVhY2ggaW5kaXZpZHVhbCBwYWdlLiBBY3Jvc3MgdGhlIGVudGlyZSBwcm9qZWN0IEkgaW1wbGVtZW50ZWQgc2V2ZXJhbCBkeW5hbWljYWxseSBnZW5lcmF0ZWQgY29udGVudCBwYWdlcyAvIHNsaWRlcnMsIDxzdHJvbmc+Zm9ybSB2ZXJpZmljYXRpb248L3N0cm9uZz4sIGFuZCBzZXZlcmFsIDxzdHJvbmc+dGhpcmQgcGFydHkgaW50ZWdyYXRpb25zPC9zdHJvbmc+LmAsXG4gICAgc2tpbGxzOiBbJ0phdmFTY3JpcHQgKEVTNispJywgJ2pRdWVyeScsICdBUEkgSW50ZWdyYXRpb24nLCAnQUpBWCAvIEpTT04nLCAnU0FTUyAvIFNDU1MnLCAnQ1NTJywgJ0ZvdW5kYXRpb24nLCAnSFRNTCAoV0NBRyAyLjEpJywgJ0Fkb2JlIElsbHVzdHJhdG9yJywgJ1NFTycsICdLZW50aWNvIChDTVMpJywgJ0JpdEJ1Y2tldCddLFxuICAgIGltYWdlczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvdW5pdmVyc2l0eS1wYXJrL2hvbWUucG5nJyxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICBrZXk6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvdW5pdmVyc2l0eS1wYXJrL2xpYnJhcnkucG5nJyxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAxLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvdW5pdmVyc2l0eS1wYXJrL2hvbWUtdmlkZW8ucG5nJyxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAyLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvdW5pdmVyc2l0eS1wYXJrL2Zvcm0ucG5nJyxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvdW5pdmVyc2l0eS1wYXJrL25ld3NsZXR0ZXIucG5nJyxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiA0LFxuICAgICAgICB9LFxuICAgIF1cbn1cblxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgLmlubmVyLWNvbnRhaW5lciB7XG4gICAgICAgICAgICB3aWR0aDogOTAlO1xuICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MGVtKXtcbiAgICAgICAgLnByb2plY3QtZGVzY3JpcHRpb24ge1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAxMiU7XG4gICAgICAgICAgICBtYXJnaW46IDUwcmVtIDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNjRlbSkge1xuICAgICAgICAucHJvamVjdC1kZXNjcmlwdGlvbiB7XG4gICAgICAgICAgICBtYXJnaW46IDYwcmVtIDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLmN0YSB7XG4gICAgICAgIG1hcmdpbjogNjByZW0gMDtcbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNDBlbSkge1xuICAgICAgICAuY3RhIHtcbiAgICAgICAgICAgIG1hcmdpbjogNzVyZW0gMDtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxNSU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNjRlbSkge1xuICAgICAgICAuY3RhIHtcbiAgICAgICAgICAgIG1hcmdpbjogODVyZW0gMDtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxNyU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAuY3RhIGEge1xuICAgICAgICBjb2xvcjogIzU4NTk1YjtcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAuM3MgZWFzZTtcbiAgICB9XG5cbiAgICAuY3RhIGE6aG92ZXIge1xuICAgICAgICBvcGFjaXR5OiAuNzU7XG4gICAgfVxuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDY0ZW0pIHtcbiAgICAgICAgLmN0YSBhIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjZweDtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgLnNraWxscy1jb250YWluZXIge1xuICAgICAgICBtYXJnaW46IDQwcmVtIDA7XG4gICAgfVxuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDQwZW0pIHtcbiAgICAgICAgc2VjdGlvbiB7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDEyJTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAucHJvamVjdC1kZXRhaWwge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiA2MHB4XG4gICAgfVxuPC9zdHlsZT5cblxuPHN2ZWx0ZTpoZWFkPlxuXHQ8dGl0bGU+Q3JlYXRpdmUgUmV2b2x0IHwgRnJvbnQgRW5kIERldmVsb3BlciAtIEpvc2h1YSBSb3BlcjwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG5cbjxkaXYgY2xhc3M9XCJwcm9qZWN0LWRldGFpbFwiPlxuICAgIDxQYWdlVHJhbnNpdGlvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPFBhZ2VUaXRsZSB0aXRsZT17U1RBVEUudGl0bGV9IC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPENhcm91c2VsIGltYWdlcz17U1RBVEUuaW1hZ2VzfS8+XG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJwcm9qZWN0LWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxEZXNjcmlwdGlvbiB0ZXh0PXtTVEFURS5kZXNjcmlwdGlvbn0gdXJsPXtTVEFURS51cmx9IC8+ICAgIFxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInNraWxscy1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPFNraWxscyBza2lsbHM9e1NUQVRFLnNraWxsc30vPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImN0YVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXtTVEFURS51cmx9IHRhcmdldD1cIl9ibGFua1wiPkNoZWNrIFRoZSBTaXRlITwvYT5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9QYWdlVHJhbnNpdGlvbj5cbjwvZGl2PiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7c0JBOEg4QixLQUFLLENBQUMsS0FBSzs7Ozs7dUJBRVAsS0FBSyxDQUFDLE1BQU07Ozs7O3FCQUVQLEtBQUssQ0FBQyxXQUFXLFdBQU8sS0FBSyxDQUFDLEdBQUc7Ozs7O3VCQUdwQyxLQUFLLENBQUMsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FHbkIsS0FBSyxDQUFDLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvREFWUixLQUFLLENBQUMsS0FBSzs7OztvREFFUCxLQUFLLENBQUMsTUFBTTs7OztxREFFUCxLQUFLLENBQUMsV0FBVztvREFBTyxLQUFLLENBQUMsR0FBRzs7OztrREFHcEMsS0FBSyxDQUFDLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTdIaEQsSUFBSSxLQUFLLEdBQUc7SUFDUixLQUFLLEVBQUUsQ0FBQyxlQUFlLENBQUM7SUFDeEIsR0FBRyxFQUFFLDBCQUEwQjtJQUMvQixXQUFXLEVBQUUsQ0FBQyw0Y0FBNGMsQ0FBQztJQUMzZCxNQUFNLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsV0FBVyxDQUFDO0lBQzFMLE1BQU0sRUFBRTtRQUNKO1lBQ0ksR0FBRyxFQUFFLGlDQUFpQztZQUN0QyxPQUFPLEVBQUUsSUFBSTtZQUNiLEdBQUcsRUFBRSxDQUFDO1NBQ1Q7O1FBRUQ7WUFDSSxHQUFHLEVBQUUsb0NBQW9DO1lBQ3pDLE9BQU8sRUFBRSxLQUFLO1lBQ2QsR0FBRyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0ksR0FBRyxFQUFFLHVDQUF1QztZQUM1QyxPQUFPLEVBQUUsS0FBSztZQUNkLEdBQUcsRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNJLEdBQUcsRUFBRSxpQ0FBaUM7WUFDdEMsT0FBTyxFQUFFLEtBQUs7WUFDZCxHQUFHLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDSSxHQUFHLEVBQUUsdUNBQXVDO1lBQzVDLE9BQU8sRUFBRSxLQUFLO1lBQ2QsR0FBRyxFQUFFLENBQUM7U0FDVDtLQUNKO0VBQ0o7Ozs7Ozs7Ozs7Ozs7OyJ9
