import { S as SvelteComponentDev, i as init, s as safe_not_equal, a as space, e as element, f as claim_text, c as claim_element, b as children, d as detach, g as attr, h as add_location, j as insert, y as mount_component, r as transition_in, w as transition_out, z as destroy_component, t as text, k as append } from './index.d872f164.js';
import './index.0fc8d7c2.js';
import './TextAnimation.439d5202.js';
import PageTransition from './PageTransition.7915aa33.js';
import { P as PageTitle, C as Carousel, D as Description, S as Skills } from './Skills.cbc7645f.js';

/* src/routes/projects/university-park.svelte generated by Svelte v3.9.1 */

const file = "src/routes/projects/university-park.svelte";

// (132:4) <PageTransition>
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
			add_location(section0, file, 136, 16, 4109);
			attr(section1, "class", "skills-container svelte-1uema8p");
			add_location(section1, file, 139, 16, 4271);
			attr(a, "href", a_href_value = ctx.STATE.url);
			attr(a, "target", "blank");
			attr(a, "class", "svelte-1uema8p");
			add_location(a, file, 143, 20, 4443);
			attr(section2, "class", "cta svelte-1uema8p");
			add_location(section2, file, 142, 16, 4401);
			attr(div0, "class", "inner-container svelte-1uema8p");
			add_location(div0, file, 134, 12, 4013);
			attr(div1, "class", "container");
			add_location(div1, file, 132, 8, 3931);
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
			add_location(div, file, 130, 0, 3873);
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
    url: 'https://www.uptexas.org',
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

// {
//     url: 'https://www.uptexas.org',
//     imgSrc: 'images/uptexas-thumb.jpg',
//     alt: 'Thumbnail for the City of University Park complete Front End website redesign',
//     projectName: 'University Park',
//     projectYear: '2019',
//     projectText: `I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.`,
// },

	return { STATE };
}

class University_park extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, []);
	}
}

export default University_park;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdmVyc2l0eS1wYXJrLmJjMDQyZDllLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL3Byb2plY3RzL3VuaXZlcnNpdHktcGFyay5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbmltcG9ydCBQYWdlVHJhbnNpdGlvbiBmcm9tICcuLi9QYWdlVHJhbnNpdGlvbi5zdmVsdGUnO1xuaW1wb3J0IFBhZ2VUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3Byb2plY3QtZGV0YWlsL1BhZ2VUaXRsZS5zdmVsdGUnO1xuaW1wb3J0IERlc2NyaXB0aW9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvRGVzY3JpcHRpb24uc3ZlbHRlJztcbmltcG9ydCBDYXJvdXNlbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL3Byb2plY3QtZGV0YWlsL0Nhcm91c2VsLnN2ZWx0ZSc7XG5pbXBvcnQgU2tpbGxzIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJvamVjdC1kZXRhaWwvU2tpbGxzLnN2ZWx0ZSc7XG5cbmxldCBTVEFURSA9IHtcbiAgICB0aXRsZTogYFVuaXZlcnNpdHkgUGFya2AsXG4gICAgdXJsOiAnaHR0cHM6Ly93d3cudXB0ZXhhcy5vcmcnLFxuICAgIGRlc2NyaXB0aW9uOiBgSSB3YXMgdGFza2VkIHdpdGggYmVpbmcgdGhlIDxzdHJvbmc+c29sZSBkZXZlbG9wZXI8L3N0cm9uZz4gb24gYSA8c3Ryb25nPmNvbXBsZXRlIEZyb250LUVuZCByZWRlc2lnbjwvc3Ryb25nPi4gS2VlcGluZyB0aGVpciBjdXJyZW50IHVzZXJzIGluIG1pbmQsIHRoZSBnb2FsIHdhcyB0byBtYWtlIHRoZSB3ZWJzaXRlIGZlZWwgbW9yZSBtb2Rlcm4sIGFuZCBvZmZlciBhIGJldHRlciB1c2VyIGV4cGVyaWVuY2Ugd2hlbiBuYXZpZ2F0aW5nIHRvIGVhY2ggaW5kaXZpZHVhbCBwYWdlLiBBY3Jvc3MgdGhlIGVudGlyZSBwcm9qZWN0IEkgaW1wbGVtZW50ZWQgc2V2ZXJhbCBkeW5hbWljYWxseSBnZW5lcmF0ZWQgY29udGVudCBwYWdlcyAvIHNsaWRlcnMsIDxzdHJvbmc+Zm9ybSB2ZXJpZmljYXRpb248L3N0cm9uZz4sIGFuZCBzZXZlcmFsIDxzdHJvbmc+dGhpcmQgcGFydHkgaW50ZWdyYXRpb25zPC9zdHJvbmc+LmAsXG4gICAgc2tpbGxzOiBbJ0phdmFTY3JpcHQgKEVTNispJywgJ2pRdWVyeScsICdBUEkgSW50ZWdyYXRpb24nLCAnQUpBWCAvIEpTT04nLCAnU0FTUyAvIFNDU1MnLCAnQ1NTJywgJ0ZvdW5kYXRpb24nLCAnSFRNTCAoV0NBRyAyLjEpJywgJ0Fkb2JlIElsbHVzdHJhdG9yJywgJ1NFTycsICdLZW50aWNvIChDTVMpJywgJ0JpdEJ1Y2tldCddLFxuICAgIGltYWdlczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvdW5pdmVyc2l0eS1wYXJrL2hvbWUucG5nJyxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICBrZXk6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvdW5pdmVyc2l0eS1wYXJrL2xpYnJhcnkucG5nJyxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAxLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvdW5pdmVyc2l0eS1wYXJrL2hvbWUtdmlkZW8ucG5nJyxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAyLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvdW5pdmVyc2l0eS1wYXJrL2Zvcm0ucG5nJyxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvdW5pdmVyc2l0eS1wYXJrL25ld3NsZXR0ZXIucG5nJyxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiA0LFxuICAgICAgICB9LFxuICAgIF1cbn1cblxuLy8ge1xuLy8gICAgIHVybDogJ2h0dHBzOi8vd3d3LnVwdGV4YXMub3JnJyxcbi8vICAgICBpbWdTcmM6ICdpbWFnZXMvdXB0ZXhhcy10aHVtYi5qcGcnLFxuLy8gICAgIGFsdDogJ1RodW1ibmFpbCBmb3IgdGhlIENpdHkgb2YgVW5pdmVyc2l0eSBQYXJrIGNvbXBsZXRlIEZyb250IEVuZCB3ZWJzaXRlIHJlZGVzaWduJyxcbi8vICAgICBwcm9qZWN0TmFtZTogJ1VuaXZlcnNpdHkgUGFyaycsXG4vLyAgICAgcHJvamVjdFllYXI6ICcyMDE5Jyxcbi8vICAgICBwcm9qZWN0VGV4dDogYEkgd2FzIHRhc2tlZCB3aXRoIGJlaW5nIHRoZSA8c3Ryb25nPnNvbGUgZGV2ZWxvcGVyPC9zdHJvbmc+IG9uIGEgPHN0cm9uZz5jb21wbGV0ZSBGcm9udC1FbmQgcmVkZXNpZ248L3N0cm9uZz4uIEtlZXBpbmcgdGhlaXIgY3VycmVudCB1c2VycyBpbiBtaW5kLCB0aGUgZ29hbCB3YXMgdG8gbWFrZSB0aGUgd2Vic2l0ZSBmZWVsIG1vcmUgbW9kZXJuLCBhbmQgb2ZmZXIgYSBiZXR0ZXIgdXNlciBleHBlcmllbmNlIHdoZW4gbmF2aWdhdGluZyB0byBlYWNoIGluZGl2aWR1YWwgcGFnZS4gQWNyb3NzIHRoZSBlbnRpcmUgcHJvamVjdCBJIGltcGxlbWVudGVkIHNldmVyYWwgZHluYW1pY2FsbHkgZ2VuZXJhdGVkIGNvbnRlbnQgcGFnZXMgLyBzbGlkZXJzLCA8c3Ryb25nPmZvcm0gdmVyaWZpY2F0aW9uPC9zdHJvbmc+LCBhbmQgc2V2ZXJhbCA8c3Ryb25nPnRoaXJkIHBhcnR5IGludGVncmF0aW9uczwvc3Ryb25nPi5gLFxuLy8gfSxcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgICAgIC5pbm5lci1jb250YWluZXIge1xuICAgICAgICAgICAgd2lkdGg6IDkwJTtcbiAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgICAgIC5wcm9qZWN0LWRlc2NyaXB0aW9uIHtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMTIlO1xuICAgICAgICAgICAgbWFyZ2luOiA1MHJlbSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDY0ZW0pIHtcbiAgICAgICAgLnByb2plY3QtZGVzY3JpcHRpb24ge1xuICAgICAgICAgICAgbWFyZ2luOiA2MHJlbSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIC5jdGEge1xuICAgICAgICBtYXJnaW46IDYwcmVtIDA7XG4gICAgfVxuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDQwZW0pIHtcbiAgICAgICAgLmN0YSB7XG4gICAgICAgICAgICBtYXJnaW46IDc1cmVtIDA7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMTUlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDY0ZW0pIHtcbiAgICAgICAgLmN0YSB7XG4gICAgICAgICAgICBtYXJnaW46IDg1cmVtIDA7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMTclO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLmN0YSBhIHtcbiAgICAgICAgY29sb3I6ICM1ODU5NWI7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgLjNzIGVhc2U7XG4gICAgfVxuXG4gICAgLmN0YSBhOmhvdmVyIHtcbiAgICAgICAgb3BhY2l0eTogLjc1O1xuICAgIH1cblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA2NGVtKSB7XG4gICAgICAgIC5jdGEgYSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDI2cHg7XG4gICAgICAgICAgICBmb250LXdlaWdodDogODAwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIC5za2lsbHMtY29udGFpbmVyIHtcbiAgICAgICAgbWFyZ2luOiA0MHJlbSAwO1xuICAgIH1cblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA0MGVtKSB7XG4gICAgICAgIHNlY3Rpb24ge1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAxMiU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLnByb2plY3QtZGV0YWlsIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNjBweFxuICAgIH1cbjwvc3R5bGU+XG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPkNyZWF0aXZlIFJldm9sdCB8IEZyb250IEVuZCBEZXZlbG9wZXIgLSBKb3NodWEgUm9wZXI8L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cblxuXG48ZGl2IGNsYXNzPVwicHJvamVjdC1kZXRhaWxcIj5cbiAgICA8UGFnZVRyYW5zaXRpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgIDxQYWdlVGl0bGUgdGl0bGU9e1NUQVRFLnRpdGxlfSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlubmVyLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxDYXJvdXNlbCBpbWFnZXM9e1NUQVRFLmltYWdlc30vPlxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwicHJvamVjdC1kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8RGVzY3JpcHRpb24gdGV4dD17U1RBVEUuZGVzY3JpcHRpb259IHVybD17U1RBVEUudXJsfSAvPiAgICBcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJza2lsbHMtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTa2lsbHMgc2tpbGxzPXtTVEFURS5za2lsbHN9Lz5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjdGFcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17U1RBVEUudXJsfSB0YXJnZXQ9XCJibGFua1wiPkNoZWNrIFRoZSBTaXRlITwvYT5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9QYWdlVHJhbnNpdGlvbj5cbjwvZGl2PiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7c0JBcUk4QixLQUFLLENBQUMsS0FBSzs7Ozs7dUJBRVAsS0FBSyxDQUFDLE1BQU07Ozs7O3FCQUVQLEtBQUssQ0FBQyxXQUFXLFdBQU8sS0FBSyxDQUFDLEdBQUc7Ozs7O3VCQUdwQyxLQUFLLENBQUMsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FHbkIsS0FBSyxDQUFDLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvREFWUixLQUFLLENBQUMsS0FBSzs7OztvREFFUCxLQUFLLENBQUMsTUFBTTs7OztxREFFUCxLQUFLLENBQUMsV0FBVztvREFBTyxLQUFLLENBQUMsR0FBRzs7OztrREFHcEMsS0FBSyxDQUFDLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBckloRCxJQUFJLEtBQUssR0FBRztJQUNSLEtBQUssRUFBRSxDQUFDLGVBQWUsQ0FBQztJQUN4QixHQUFHLEVBQUUseUJBQXlCO0lBQzlCLFdBQVcsRUFBRSxDQUFDLDRjQUE0YyxDQUFDO0lBQzNkLE1BQU0sRUFBRSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxXQUFXLENBQUM7SUFDMUwsTUFBTSxFQUFFO1FBQ0o7WUFDSSxHQUFHLEVBQUUsaUNBQWlDO1lBQ3RDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsR0FBRyxFQUFFLENBQUM7U0FDVDs7UUFFRDtZQUNJLEdBQUcsRUFBRSxvQ0FBb0M7WUFDekMsT0FBTyxFQUFFLEtBQUs7WUFDZCxHQUFHLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDSSxHQUFHLEVBQUUsdUNBQXVDO1lBQzVDLE9BQU8sRUFBRSxLQUFLO1lBQ2QsR0FBRyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0ksR0FBRyxFQUFFLGlDQUFpQztZQUN0QyxPQUFPLEVBQUUsS0FBSztZQUNkLEdBQUcsRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNJLEdBQUcsRUFBRSx1Q0FBdUM7WUFDNUMsT0FBTyxFQUFFLEtBQUs7WUFDZCxHQUFHLEVBQUUsQ0FBQztTQUNUO0tBQ0o7RUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
