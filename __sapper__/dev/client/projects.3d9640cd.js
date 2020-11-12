import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, u as space, e as element, c as create_component, A as query_selector_all, g as detach_dev, x as claim_space, a as claim_element, b as children, f as claim_component, h as attr_dev, j as add_location, k as insert_dev, m as mount_component, l as append_dev, n as noop, t as transition_in, p as transition_out, q as destroy_component } from './client.bbbbaab6.js';
import { P as Projects, D as DiRepairsThumb, a as DiRepairsThumbSmall, H as HalcyonThumb, b as HalcyonThumbSmall } from './halcyon-5-small.7483434e.js';
import { P as PageTitle } from './PageTitle.e41fbeed.js';

var StallionThumb = "/client/e8b7060e9e4ada65.jpg";

var StallionThumbSmall = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMqADAAQAAAABAAAAMgAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgAMgAyAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQABP/aAAwDAQACEQMRAD8AXZRsq75dHl1vY4yl5ftQIielXfLrQsrZGOWosBj/AGSXGccVG0RXrXZzGEIUCiubukwxxUjsZ+yjZVnaaXYaqwj/0Oh8k+lKLct2rZtYBKcEVqnT1HSug4zlRbDoakETIcLWlcWxjlA7VeSGMRhjzQBmG1LR7u9ZEsB3YIrtI1jZcYrOuLQZJApIDmfs4pfs4ra8g+lHkH0pgf/R9fi08xHgVcMEijNegf2OM/dp50ZSORXQcPMeUS2kssmcVZFg5TBFektoijoKeujjHSgfMeaLYOvQU82THqK9IOjD+7Tf7HHpQHMebf2cfSj+zj6V6T/Y49KP7HHpQHMf/9L7bwPSlwKKK6DzxMD0owPSlooATA9KMDPSlo70AJgelGB6UtFAH//Z";

var UniversityParkThumb = "/client/e1490abbd75dc150.jpg";

var UniversityParkThumbSmall = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMqADAAQAAAABAAAAJgAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgAJgAyAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQABP/aAAwDAQACEQMRAD8A/SWVJYGDS5Dd66HS7P7dGCzdOa5LU9btb6ZnibCispvHtnoiuGkHyiiVdblKJ7poB/s25C7u+a6jxD4j8myJP92viST492aassfmgLXq6/FDQta04B5lBK+tZrEKWiIZwXjfxR9okkRj8pzXzL4l0rStXLMwVnNek+Ptd0tpGEEoJb0NfPGp6tLbS+bG24E18zik/aMlsafBEGThBik/4QiH+4KgHi24wPl/Sl/4S24/ufpXPyDuf//Q9gtPiH5sRMUu4tXN63f6jq0cjxsfmGK810OAWG0XEgxXtukGwks9y4PevK9jJvU35o2PGrDwjqF7dmR3IPvUOvf8JH4dUGF3KD0NetzXHlXW219a66TRLLV9M2XoBYjvXbCjZaHLKSbPibW/GOo+T50ztuUetVfC3iqfXLpLZwW5xXvmu/BJdT3/AGQZBz0rO8KfBxvDd8J5lPB71hXwV/eFBx5jei0CIxITGclR29qk/wCEfh/55n8q9XS3hVQu3oAKd5MP92uL2XkenyU+5//R+c4fGt/exRtyua+qvhY8+rWASV8ZFfD+k/6iL6CvuH4Kf8eifSuKL9456Lvue5aN4HE93vaUH8/8K6PXvDzWFoxjkHyit/w//r6teLv+PN/oa7pSdjRwVzx7wvrk6ag1tINwBxXaauvnsCoAzXl/h3/kNN/vV6nfdV/GuPFVZKF0y8PBOWpy5tnyen+fwo+zP7f5/Crx6mkryPbz7nqexj2P/9k=";

var CreativeRevoltThumb = "/client/95475a9f0f24a4e8.jpg";

var CreativeRevoltThumbSmall = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMqADAAQAAAABAAAAMgAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgAMgAyAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQABP/aAAwDAQACEQMRAD8A/cSkZgoyegpa57xLqA07TJZ842g0DiruxheIvHel6FlZpAD9ab4c8b2mvn9wwINfnH8SPHV9qnic2aSnZvx1r6n+DMZjs4ZGYsxxmsJ1bOx7bytKnzM+tAcjNLUFu26IGp63R4jVnYKKKKBH/9D9xK82+JMhGiTKrY+U1ueL/Etv4a02S9nYKEBNfAfjf9pG11S7m0uCTI5HWnyu2h04NJ1Yo+ePFbPbeKmkJz8/9a+3Pg9rtvHYw+c4XAFfDur3cep3RvzzzmrNr8VZdDQWsDFStctTDyk1Y+/xFCMUovqfsrpmpWlzAvlSA/jWx16V+Tvgr9pK+s9Qit7uX5GIHNfox4A8cWnivTY7iJwxYDvXZKm47nwWNoOnUcWelUUUVByH/9H7e/a08fjQ/D09tG+1ipHWvxp0jxLJe6zLcPITlj3r7v8A24PEcTebbrJyM8V+UWia2bW95bq1ehRguU4/rThVUkfeOl6m8tkT14rzPW76U3x2Ick1J4Y8X2MOnAzsOnrWqmq+Hr1jMdhIPc1pNpPQ+szfOlKlDkepXtIpTEl190qQa/Rf9lrxY77bKaXO3HU1+bl/4nsYont4NuPY161+zt8R3s/F0VqJMB3Ax+NY1VdHzmIx7qyUmfvCkqsoOeoFO8xfWvNbTxGHtYX3feRT+Yqx/wAJEPWuKxVz/9Ljv21pH/tmcbjjJ71+aUBP2pee9fpX+2t/yGrj6mvzTg/4+l+tenR+E8av8Z6tDJINOGGI/Go9Pmmy3zt19TTov+QcKh0/q31pl1Nkbls7Fjkk16l8CGb/AITy15P+tH868stfvGvUvgR/yPlr/wBdR/OonsTR6H7s6eT9gtv+uSf+girmTVPT/wDjwtv+uSf+girdcR6h/9k=";

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
			add_location(div, file, 80, 0, 5105);
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
			imgSrcSmall: HalcyonThumbSmall,
			alt: "Thumbnail for the Halcyon mall website rebuild",
			projectName: "Halcyon",
			projectYear: "2019",
			projectText: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`
		},
		{
			url: "/projects/di-repairs",
			imgSrc: DiRepairsThumb,
			imgSrcSmall: DiRepairsThumbSmall,
			alt: "Thumbnail for the City of University Park complete Front End website redesign",
			projectName: "DI Repairs",
			projectYear: "2020",
			projectText: `As the <strong>only developer & designer</strong> on this freelance project. I completely re-envisioned the site design & built the project from the ground up as an extremely performant <strong>SSG website</strong>. I utilized development & design best practices with a focus on the <strong>user experience.</strong>`
		},
		{
			url: "projects/stallion",
			imgSrc: StallionThumb,
			imgSrcSmall: StallionThumbSmall,
			alt: "Thumbnail for the Stallion complete website rebuild",
			projectName: "Stallion",
			projectYear: "2019",
			projectText: `As the <strong>Lead Front End Developer</strong> on a <strong>complete website rebuild</strong>, I worked towards envisioning a website that would match their innovative Stallion attitude. The project was built with an <strong>emphasis</strong> on <strong>clean code</strong>, and <strong>modularity.</strong> The website includes multiple API’s, form verification, and other advanced modules.`
		},
		{
			url: "/projects/university-park",
			imgSrc: UniversityParkThumb,
			imgSrcSmall: UniversityParkThumbSmall,
			lazy: true,
			alt: "Thumbnail for the City of University Park complete Front End website redesign",
			projectName: "University Park",
			projectYear: "2019",
			projectText: `I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.`
		},
		{
			url: "projects/creative-revolt",
			imgSrc: CreativeRevoltThumb,
			imgSrcSmall: CreativeRevoltThumbSmall,
			lazy: true,
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
		DiRepairsThumbSmall,
		HalcyonThumb,
		HalcyonThumbSmall,
		StallionThumb,
		StallionThumbSmall,
		UniversityParkThumb,
		UniversityParkThumbSmall,
		CreativeRevoltThumb,
		CreativeRevoltThumbSmall,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMuM2Q5NjQwY2QuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbWFnZXMvdGh1bWJuYWlscy9zdGFsbGlvbi10aHVtYi1hLW1pbi5qcGciLCIuLi8uLi8uLi9zcmMvaW1hZ2VzL3RodW1ibmFpbHMvc3RhbGxpb24tdGh1bWItYS1taW4tc21hbGwuanBnIiwiLi4vLi4vLi4vc3JjL2ltYWdlcy90aHVtYm5haWxzL3VwdGV4YXMtdGh1bWItbWluLmpwZyIsIi4uLy4uLy4uL3NyYy9pbWFnZXMvdGh1bWJuYWlscy91cHRleGFzLXRodW1iLW1pbi1zbWFsbC5qcGciLCIuLi8uLi8uLi9zcmMvaW1hZ2VzL3RodW1ibmFpbHMvSm9yZGVuLUJhY2tncm91bmQtR3JheS1taW4uanBnIiwiLi4vLi4vLi4vc3JjL2ltYWdlcy90aHVtYm5haWxzL0pvcmRlbi1CYWNrZ3JvdW5kLUdyYXktbWluLXNtYWxsLmpwZyIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvcHJvamVjdHMuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IFwiL2NsaWVudC9lOGI3MDYwZTllNGFkYTY1LmpwZ1wiIiwiZXhwb3J0IGRlZmF1bHQgXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LC85ai80QUFRU2taSlJnQUJBUUFBU0FCSUFBRC80UUJNUlhocFpnQUFUVTBBS2dBQUFBZ0FBWWRwQUFRQUFBQUJBQUFBR2dBQUFBQUFBNkFCQUFNQUFBQUJBQUVBQUtBQ0FBUUFBQUFCQUFBQU1xQURBQVFBQUFBQkFBQUFNZ0FBQUFELzdRQTRVR2h2ZEc5emFHOXdJRE11TUFBNFFrbE5CQVFBQUFBQUFBQTRRa2xOQkNVQUFBQUFBQkRVSFl6Wmp3Q3lCT21BQ1pqcytFSisvOEFBRVFnQU1nQXlBd0VpQUFJUkFRTVJBZi9FQUI4QUFBRUZBUUVCQVFFQkFBQUFBQUFBQUFBQkFnTUVCUVlIQ0FrS0MvL0VBTFVRQUFJQkF3TUNCQU1GQlFRRUFBQUJmUUVDQXdBRUVRVVNJVEZCQmhOUllRY2ljUlF5Z1pHaENDTkNzY0VWVXRId0pETmljb0lKQ2hZWEdCa2FKU1luS0NrcU5EVTJOemc1T2tORVJVWkhTRWxLVTFSVlZsZFlXVnBqWkdWbVoyaHBhbk4wZFhaM2VIbDZnNFNGaG9lSWlZcVNrNVNWbHBlWW1acWlvNlNscHFlb3FhcXlzN1MxdHJlNHVickN3OFRGeHNmSXljclMwOVRWMXRmWTJkcmg0dVBrNWVibjZPbnE4Zkx6OVBYMjkvajUrdi9FQUI4QkFBTUJBUUVCQVFFQkFRRUFBQUFBQUFBQkFnTUVCUVlIQ0FrS0MvL0VBTFVSQUFJQkFnUUVBd1FIQlFRRUFBRUNkd0FCQWdNUkJBVWhNUVlTUVZFSFlYRVRJaktCQ0JSQ2thR3h3UWtqTTFMd0ZXSnkwUW9XSkRUaEpmRVhHQmthSmljb0tTbzFOamM0T1RwRFJFVkdSMGhKU2xOVVZWWlhXRmxhWTJSbFptZG9hV3B6ZEhWMmQzaDVlb0tEaElXR2g0aUppcEtUbEpXV2w1aVptcUtqcEtXbXA2aXBxckt6dExXMnQ3aTV1c0xEeE1YR3g4akp5dExUMU5YVzE5aloydUxqNU9YbTUranA2dkx6OVBYMjkvajUrdi9iQUVNQUFnSUNBZ0lDQXdJQ0F3VURBd01GQmdVRkJRVUdDQVlHQmdZR0NBb0lDQWdJQ0FnS0Nnb0tDZ29LQ2d3TURBd01EQTRPRGc0T0R3OFBEdzhQRHc4UEQvL2JBRU1CQWdJQ0JBUUVCd1FFQnhBTENRc1FFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRVAvZEFBUUFCUC9hQUF3REFRQUNFUU1SQUQ4QVhaUnNxNzVkSGwxdlk0eWw1ZnRRSWllbFhmTHJRc3JaR09Xb3NCai9BR1NYR2NjVkcwUlhyWFp6R0VJVUNpdWJ1a3d4eFVqc1oreWpaVm5hYVhZYXF3ai8wT2g4aytsS0xjdDJyWnRZQktjRVZxblQxSFN1ZzR6bFJiRG9ha0VUSWNMV2xjV3hqbEE3VmVTR01SaGp6UUJtRzFMUjd1OVpFc0IzWUlydEkxalpjWXJPdUxRWkpBcElEbWZzNHBmczRyYThnK2xIa0gwcGdmL1I5ZmkwOHhIZ1ZjTUVpak5lZ2YyT00vZHA1MFpTT1JYUWNQTWVVUzJrc3NtY1ZaRmc1VEJGZWt0b2lqb0tldWpqSFNnZk1lYUxZT3ZRVTgyVEhxSzlJT2pEKzdUZjdISHBRSE1lYmYyY2ZTait6ajZWNlQvWTQ5S1A3SEhwUUhNZi85TDdid1BTbHdLS0s2RHp4TUQwb3dQU2xvb0FUQTlLTURQU2xvNzBBSmdlbEdCNlV0RkFILy9aXCIiLCJleHBvcnQgZGVmYXVsdCBcIi9jbGllbnQvZTE0OTBhYmJkNzVkYzE1MC5qcGdcIiIsImV4cG9ydCBkZWZhdWx0IFwiZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwvOWovNEFBUVNrWkpSZ0FCQVFBQVNBQklBQUQvNFFCTVJYaHBaZ0FBVFUwQUtnQUFBQWdBQVlkcEFBUUFBQUFCQUFBQUdnQUFBQUFBQTZBQkFBTUFBQUFCQUFFQUFLQUNBQVFBQUFBQkFBQUFNcUFEQUFRQUFBQUJBQUFBSmdBQUFBRC83UUE0VUdodmRHOXphRzl3SURNdU1BQTRRa2xOQkFRQUFBQUFBQUE0UWtsTkJDVUFBQUFBQUJEVUhZelpqd0N5Qk9tQUNaanMrRUorLzhBQUVRZ0FKZ0F5QXdFaUFBSVJBUU1SQWYvRUFCOEFBQUVGQVFFQkFRRUJBQUFBQUFBQUFBQUJBZ01FQlFZSENBa0tDLy9FQUxVUUFBSUJBd01DQkFNRkJRUUVBQUFCZlFFQ0F3QUVFUVVTSVRGQkJoTlJZUWNpY1JReWdaR2hDQ05Dc2NFVlV0SHdKRE5pY29JSkNoWVhHQmthSlNZbktDa3FORFUyTnpnNU9rTkVSVVpIU0VsS1UxUlZWbGRZV1ZwalpHVm1aMmhwYW5OMGRYWjNlSGw2ZzRTRmhvZUlpWXFTazVTVmxwZVltWnFpbzZTbHBxZW9xYXF5czdTMXRyZTR1YnJDdzhURnhzZkl5Y3JTMDlUVjF0ZlkyZHJoNHVQazVlYm42T25xOGZMejlQWDI5L2o1K3YvRUFCOEJBQU1CQVFFQkFRRUJBUUVBQUFBQUFBQUJBZ01FQlFZSENBa0tDLy9FQUxVUkFBSUJBZ1FFQXdRSEJRUUVBQUVDZHdBQkFnTVJCQVVoTVFZU1FWRUhZWEVUSWpLQkNCUkNrYUd4d1Frak0xTHdGV0p5MFFvV0pEVGhKZkVYR0JrYUppY29LU28xTmpjNE9UcERSRVZHUjBoSlNsTlVWVlpYV0ZsYVkyUmxabWRvYVdwemRIVjJkM2g1ZW9LRGhJV0doNGlKaXBLVGxKV1dsNWlabXFLanBLV21wNmlwcXJLenRMVzJ0N2k1dXNMRHhNWEd4OGpKeXRMVDFOWFcxOWpaMnVMajVPWG01K2pwNnZMejlQWDI5L2o1K3YvYkFFTUFBZ0lDQWdJQ0F3SUNBd1VEQXdNRkJnVUZCUVVHQ0FZR0JnWUdDQW9JQ0FnSUNBZ0tDZ29LQ2dvS0Nnd01EQXdNREE0T0RnNE9EdzhQRHc4UER3OFBELy9iQUVNQkFnSUNCQVFFQndRRUJ4QUxDUXNRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVQL2RBQVFBQlAvYUFBd0RBUUFDRVFNUkFEOEEvU1dWSllHRFM1RGQ2NkhTN1A3ZEdDemRPYTVMVTlidGI2Wm5pYkNpc3B2SHRub2l1R2tIeWlpVmRibEtKN3BvQi9zMjVDN3UrYTZqeEQ0ajhteUpQOTJ2aVNUNDkyYWFzc2ZtZ0xYcTYvRkRRdGEwNEI1bEJLK3RackVLV2lJWndYamZ4Ujlva2tSajhwelh6TDRsMHJTdFhMTXdWbk5laytQdGQwdHBHRUVvSmIwTmZQR3A2dExiUytiRzI0RTE4emlrL2FNbHNhZkJFR1RoQmlrLzRRaUgrNEtnSGkyNHdQbC9TbC80UzI0L3VmcFhQeUR1Zi8vUTlndFBpSDVzUk1VdTR0WE42M2Y2anEwY2p4c2ZtR0s4MTBPQVdHMFhFZ3hYdHVrR3drczl5NFBldks5akp2VTM1bzJQR3JEd2pxRjdkbVIzSVB2VU92ZjhKSDRkVUdGM0tEME5ldHpYSGxYVzIxOWE2NlRSTExWOU0yWG9CWWp2WGJDalphSExLU2JQaWJXL0dPbytUNTB6dHVVZXRWZkMzaXFmWExwTFp3VzV4WHZtdS9CSmRUMy9BR1FaQnowck84S2ZCeHZEZDhKNWxQQjcxaFh3Vi9lRkJ4NWplaTBDSXhJVEdjbFIyOXFrL3dDRWZoLzU1bjhxOVhTM2hWUXUzb0FLZDVNUDkydUwyWGtlbnlVKzUvL1IrYzRmR3QvZXhSdHl1YStxdmhZOCtyV0FTVjhaRmZEK2svNmlMNkN2dUg0S2Y4ZWlmU3VLTDk0NTZMdnVlNWFONEhFOTN2YVVIOC84SzZQWHZEeldGb3hqa0h5aXQvdy8vcjZ0ZUx2K1BOL29hN3BTZGpSd1Z6eDd3dnJrNmFnMXRJTndCeFhhYXV2bnNDb0F6WGwvaDMva05OL3ZWNm5mZFYvR3VQRlZaS0YweThQQk9XcHk1dG55ZW4rZndvK3pQN2Y1L0NyeDZta3J5UGJ6N25xZXhqMlAvOWs9XCIiLCJleHBvcnQgZGVmYXVsdCBcIi9jbGllbnQvOTU0NzVhOWYwZjI0YTRlOC5qcGdcIiIsImV4cG9ydCBkZWZhdWx0IFwiZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwvOWovNEFBUVNrWkpSZ0FCQVFBQVNBQklBQUQvNFFCTVJYaHBaZ0FBVFUwQUtnQUFBQWdBQVlkcEFBUUFBQUFCQUFBQUdnQUFBQUFBQTZBQkFBTUFBQUFCQUFFQUFLQUNBQVFBQUFBQkFBQUFNcUFEQUFRQUFBQUJBQUFBTWdBQUFBRC83UUE0VUdodmRHOXphRzl3SURNdU1BQTRRa2xOQkFRQUFBQUFBQUE0UWtsTkJDVUFBQUFBQUJEVUhZelpqd0N5Qk9tQUNaanMrRUorLzhBQUVRZ0FNZ0F5QXdFaUFBSVJBUU1SQWYvRUFCOEFBQUVGQVFFQkFRRUJBQUFBQUFBQUFBQUJBZ01FQlFZSENBa0tDLy9FQUxVUUFBSUJBd01DQkFNRkJRUUVBQUFCZlFFQ0F3QUVFUVVTSVRGQkJoTlJZUWNpY1JReWdaR2hDQ05Dc2NFVlV0SHdKRE5pY29JSkNoWVhHQmthSlNZbktDa3FORFUyTnpnNU9rTkVSVVpIU0VsS1UxUlZWbGRZV1ZwalpHVm1aMmhwYW5OMGRYWjNlSGw2ZzRTRmhvZUlpWXFTazVTVmxwZVltWnFpbzZTbHBxZW9xYXF5czdTMXRyZTR1YnJDdzhURnhzZkl5Y3JTMDlUVjF0ZlkyZHJoNHVQazVlYm42T25xOGZMejlQWDI5L2o1K3YvRUFCOEJBQU1CQVFFQkFRRUJBUUVBQUFBQUFBQUJBZ01FQlFZSENBa0tDLy9FQUxVUkFBSUJBZ1FFQXdRSEJRUUVBQUVDZHdBQkFnTVJCQVVoTVFZU1FWRUhZWEVUSWpLQkNCUkNrYUd4d1Frak0xTHdGV0p5MFFvV0pEVGhKZkVYR0JrYUppY29LU28xTmpjNE9UcERSRVZHUjBoSlNsTlVWVlpYV0ZsYVkyUmxabWRvYVdwemRIVjJkM2g1ZW9LRGhJV0doNGlKaXBLVGxKV1dsNWlabXFLanBLV21wNmlwcXJLenRMVzJ0N2k1dXNMRHhNWEd4OGpKeXRMVDFOWFcxOWpaMnVMajVPWG01K2pwNnZMejlQWDI5L2o1K3YvYkFFTUFBZ0lDQWdJQ0F3SUNBd1VEQXdNRkJnVUZCUVVHQ0FZR0JnWUdDQW9JQ0FnSUNBZ0tDZ29LQ2dvS0Nnd01EQXdNREE0T0RnNE9EdzhQRHc4UER3OFBELy9iQUVNQkFnSUNCQVFFQndRRUJ4QUxDUXNRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVQL2RBQVFBQlAvYUFBd0RBUUFDRVFNUkFEOEEvY1NrWmdveWVncGE1N3hMcUEwN1RKWjg0MmcwRGlydXhoZUl2SGVsNkZsWnBBRDlhYjRjOGIybXZuOXd3SU5mbkg4U1BIVjlxbmljMmFTblp2eDFyNm4rRE1aanM0WkdZc3h4bXNKMWJPeDdieXRLbnpNK3RBY2pOTFVGdTI2SUdwNjNSNGpWbllLS0tLQkgvOUQ5eEs4MitKTWhHaVRLclkrVTF1ZUwvRXR2NGEwMlM5bllLRUJOZkFmamY5cEcxMVM3bTB1Q1RJNUhXbnl1MmgwNE5KMVlvK2VQRmJQYmVLbWtKejgvOWErM1BnOXJ0dkhZdytjNFhBRmZEdXIzY2VwM1J2enp6bXJOcjhWWmREUVdzREZTdGN0VER5azFZKy94RkNNVW92cWZzcnBtcFdsekF2bFNBL2pXeDE2VitUdmdyOXBLK3M5UWl0N3VYNUdJSE5mb3g0QThjV25pdlRZN2lKd3hZRHZYWkttNDdud1dOb09uVWNXZWxVVVVWQnlILzlIN2UvYTA4ZmpRL0QwOXRHKzFpcEhXdnhwMGp4TEplNnpMY1BJVGxqM3I3djhBMjRQRWNUZWJickp5TThWK1VXaWEyYlc5NWJxMWVoUmd1VTQvclRoVlVrZmVPbDZtOHRrVDE0cnpQVzc2VTN4MkljazFKNFk4WDJNT25BenNPbnJXcW1xK0hyMWpNZGhJUGMxcE5wUFErc3pmT2xLbERrZXBYdElwVEVsMTkwcVFhL1JmOWxyeFk3N2JLYVhPM0hVMStibC80bnNZb250NE51UFkxNjErenQ4UjNzL0YwVnFKTUIzQXgrTlkxVmRIem1JeDdxeVVtZnZDa3Fzb09lb0ZPOHhmV3ZOYlR4R0h0WVgzZmVSVCtZcXgvd0FKRVBXdUt4VnovOUxqdjIxcEgvdG1jYmpqSjcxK2FVQlAycGVlOWZwWCsydC95R3JqNm12elRnLzQrbCt0ZW5SK0U4YXY4WjZ0REpJTk9HR0kvR285UG1teTN6dDE5VFRvditRY0toMC9xMzFwbDFOa2JsczdGamtrMTZsOENHYi9BSVR5MTVQK3RIODY4c3Rmdkd2VXZnUi95UGxyL3dCZFIvT29uc1RSNkg3czZlVDlndHYrdVNmK2dpcm1UVlBUL3dEand0dit1U2YrZ2lyZGNSNmgvOWs9XCIiLCI8c2NyaXB0PlxuICAgIGltcG9ydCBQcm9qZWN0cyBmcm9tICcuLi9jb21wb25lbnRzL2hvbWUtY29tcG9uZW50cy9wcm9qZWN0cy9Qcm9qZWN0cy5zdmVsdGUnO1xuICAgIGltcG9ydCBQYWdlVGl0bGUgZnJvbSAnLi4vY29tcG9uZW50cy9wcm9qZWN0LWRldGFpbC1jb21wb25lbnRzL1BhZ2VUaXRsZS5zdmVsdGUnO1xuXG4gICAgaW1wb3J0IERpUmVwYWlyc1RodW1iIGZyb20gJy4uL2ltYWdlcy90aHVtYm5haWxzL2RpLXRodW1iLmpwZyc7XG4gICAgaW1wb3J0IERpUmVwYWlyc1RodW1iU21hbGwgZnJvbSAnLi4vaW1hZ2VzL3RodW1ibmFpbHMvZGktdGh1bWItc21hbGwuanBnJztcbiAgICBpbXBvcnQgSGFsY3lvblRodW1iIGZyb20gJy4uL2ltYWdlcy90aHVtYm5haWxzL2hhbGN5b24tNS1taW4uanBnJztcbiAgICBpbXBvcnQgSGFsY3lvblRodW1iU21hbGwgZnJvbSAnLi4vaW1hZ2VzL3RodW1ibmFpbHMvaGFsY3lvbi01LXNtYWxsLmpwZyc7XG4gICAgaW1wb3J0IFN0YWxsaW9uVGh1bWIgZnJvbSAnLi4vaW1hZ2VzL3RodW1ibmFpbHMvc3RhbGxpb24tdGh1bWItYS1taW4uanBnJztcbiAgICBpbXBvcnQgU3RhbGxpb25UaHVtYlNtYWxsIGZyb20gJy4uL2ltYWdlcy90aHVtYm5haWxzL3N0YWxsaW9uLXRodW1iLWEtbWluLXNtYWxsLmpwZyc7XG4gICAgaW1wb3J0IFVuaXZlcnNpdHlQYXJrVGh1bWIgZnJvbSAnLi4vaW1hZ2VzL3RodW1ibmFpbHMvdXB0ZXhhcy10aHVtYi1taW4uanBnJztcbiAgICBpbXBvcnQgVW5pdmVyc2l0eVBhcmtUaHVtYlNtYWxsIGZyb20gJy4uL2ltYWdlcy90aHVtYm5haWxzL3VwdGV4YXMtdGh1bWItbWluLXNtYWxsLmpwZyc7XG4gICAgaW1wb3J0IENyZWF0aXZlUmV2b2x0VGh1bWIgZnJvbSAnLi4vaW1hZ2VzL3RodW1ibmFpbHMvSm9yZGVuLUJhY2tncm91bmQtR3JheS1taW4uanBnJztcbiAgICBpbXBvcnQgQ3JlYXRpdmVSZXZvbHRUaHVtYlNtYWxsIGZyb20gJy4uL2ltYWdlcy90aHVtYm5haWxzL0pvcmRlbi1CYWNrZ3JvdW5kLUdyYXktbWluLXNtYWxsLmpwZyc7XG5cbiAgICBsZXQgcG9ydGZvbGlvQ2FyZHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJy9wcm9qZWN0cy9oYWxjeW9uJyxcbiAgICAgICAgICAgIGltZ1NyYzogSGFsY3lvblRodW1iLFxuICAgICAgICAgICAgaW1nU3JjU21hbGw6IEhhbGN5b25UaHVtYlNtYWxsLFxuICAgICAgICAgICAgYWx0OiAnVGh1bWJuYWlsIGZvciB0aGUgSGFsY3lvbiBtYWxsIHdlYnNpdGUgcmVidWlsZCcsXG4gICAgICAgICAgICBwcm9qZWN0TmFtZTogJ0hhbGN5b24nLFxuICAgICAgICAgICAgcHJvamVjdFllYXI6ICcyMDE5JyxcbiAgICAgICAgICAgIHByb2plY3RUZXh0OiBgSSB3YXMgb25lIG9mIHRoZSBGcm9udCBFbmQgRGV2ZWxvcGVycyBvbiB0aGUgcHJvamVjdCBwcmltYXJpbHkgdGFza2VkIHdpdGggY3JlYXRpbmcgdGhlIG1vdmllcyBwYWdlIGFuZCBldmVudHMgZGlyZWN0b3J5LiBBY3Jvc3MgdGhlIHByb2plY3QgSSB3b3JrZWQgd2l0aCA8c3Ryb25nPm11bHRpcGxlIEFQSeKAmXM8L3N0cm9uZz4sIDxzdHJvbmc+UmVhY3QgU3RhdGljPC9zdHJvbmc+LCBhbmQgZGV2ZWxvcGVkIDxzdHJvbmc+Y2xlYW4gY29kZTwvc3Ryb25nPiBmb3Igb3RoZXIgYWR2YW5jZWQgUmVhY3QgY29tcG9uZW50cy5gXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJy9wcm9qZWN0cy9kaS1yZXBhaXJzJyxcbiAgICAgICAgICAgIGltZ1NyYzogRGlSZXBhaXJzVGh1bWIsXG4gICAgICAgICAgICBpbWdTcmNTbWFsbDogRGlSZXBhaXJzVGh1bWJTbWFsbCxcbiAgICAgICAgICAgIGFsdDogJ1RodW1ibmFpbCBmb3IgdGhlIENpdHkgb2YgVW5pdmVyc2l0eSBQYXJrIGNvbXBsZXRlIEZyb250IEVuZCB3ZWJzaXRlIHJlZGVzaWduJyxcbiAgICAgICAgICAgIHByb2plY3ROYW1lOiAnREkgUmVwYWlycycsXG4gICAgICAgICAgICBwcm9qZWN0WWVhcjogJzIwMjAnLFxuICAgICAgICAgICAgcHJvamVjdFRleHQ6IGBBcyB0aGUgPHN0cm9uZz5vbmx5IGRldmVsb3BlciAmIGRlc2lnbmVyPC9zdHJvbmc+IG9uIHRoaXMgZnJlZWxhbmNlIHByb2plY3QuIEkgY29tcGxldGVseSByZS1lbnZpc2lvbmVkIHRoZSBzaXRlIGRlc2lnbiAmIGJ1aWx0IHRoZSBwcm9qZWN0IGZyb20gdGhlIGdyb3VuZCB1cCBhcyBhbiBleHRyZW1lbHkgcGVyZm9ybWFudCA8c3Ryb25nPlNTRyB3ZWJzaXRlPC9zdHJvbmc+LiBJIHV0aWxpemVkIGRldmVsb3BtZW50ICYgZGVzaWduIGJlc3QgcHJhY3RpY2VzIHdpdGggYSBmb2N1cyBvbiB0aGUgPHN0cm9uZz51c2VyIGV4cGVyaWVuY2UuPC9zdHJvbmc+YCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAncHJvamVjdHMvc3RhbGxpb24nLFxuICAgICAgICAgICAgaW1nU3JjOiBTdGFsbGlvblRodW1iLFxuICAgICAgICAgICAgaW1nU3JjU21hbGw6IFN0YWxsaW9uVGh1bWJTbWFsbCxcbiAgICAgICAgICAgIGFsdDogJ1RodW1ibmFpbCBmb3IgdGhlIFN0YWxsaW9uIGNvbXBsZXRlIHdlYnNpdGUgcmVidWlsZCcsXG4gICAgICAgICAgICBwcm9qZWN0TmFtZTogJ1N0YWxsaW9uJyxcbiAgICAgICAgICAgIHByb2plY3RZZWFyOiAnMjAxOScsXG4gICAgICAgICAgICBwcm9qZWN0VGV4dDogYEFzIHRoZSA8c3Ryb25nPkxlYWQgRnJvbnQgRW5kIERldmVsb3Blcjwvc3Ryb25nPiBvbiBhIDxzdHJvbmc+Y29tcGxldGUgd2Vic2l0ZSByZWJ1aWxkPC9zdHJvbmc+LCBJIHdvcmtlZCB0b3dhcmRzIGVudmlzaW9uaW5nIGEgd2Vic2l0ZSB0aGF0IHdvdWxkIG1hdGNoIHRoZWlyIGlubm92YXRpdmUgU3RhbGxpb24gYXR0aXR1ZGUuIFRoZSBwcm9qZWN0IHdhcyBidWlsdCB3aXRoIGFuIDxzdHJvbmc+ZW1waGFzaXM8L3N0cm9uZz4gb24gPHN0cm9uZz5jbGVhbiBjb2RlPC9zdHJvbmc+LCBhbmQgPHN0cm9uZz5tb2R1bGFyaXR5Ljwvc3Ryb25nPiBUaGUgd2Vic2l0ZSBpbmNsdWRlcyBtdWx0aXBsZSBBUEnigJlzLCBmb3JtIHZlcmlmaWNhdGlvbiwgYW5kIG90aGVyIGFkdmFuY2VkIG1vZHVsZXMuYCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnL3Byb2plY3RzL3VuaXZlcnNpdHktcGFyaycsXG4gICAgICAgICAgICBpbWdTcmM6IFVuaXZlcnNpdHlQYXJrVGh1bWIsXG4gICAgICAgICAgICBpbWdTcmNTbWFsbDogVW5pdmVyc2l0eVBhcmtUaHVtYlNtYWxsLFxuICAgICAgICAgICAgbGF6eTogdHJ1ZSxcbiAgICAgICAgICAgIGFsdDogJ1RodW1ibmFpbCBmb3IgdGhlIENpdHkgb2YgVW5pdmVyc2l0eSBQYXJrIGNvbXBsZXRlIEZyb250IEVuZCB3ZWJzaXRlIHJlZGVzaWduJyxcbiAgICAgICAgICAgIHByb2plY3ROYW1lOiAnVW5pdmVyc2l0eSBQYXJrJyxcbiAgICAgICAgICAgIHByb2plY3RZZWFyOiAnMjAxOScsXG4gICAgICAgICAgICBwcm9qZWN0VGV4dDogYEkgd2FzIHRhc2tlZCB3aXRoIGJlaW5nIHRoZSA8c3Ryb25nPnNvbGUgZGV2ZWxvcGVyPC9zdHJvbmc+IG9uIGEgPHN0cm9uZz5jb21wbGV0ZSBGcm9udC1FbmQgcmVkZXNpZ248L3N0cm9uZz4uIEtlZXBpbmcgdGhlaXIgY3VycmVudCB1c2VycyBpbiBtaW5kLCB0aGUgZ29hbCB3YXMgdG8gbWFrZSB0aGUgd2Vic2l0ZSBmZWVsIG1vcmUgbW9kZXJuLCBhbmQgb2ZmZXIgYSBiZXR0ZXIgdXNlciBleHBlcmllbmNlIHdoZW4gbmF2aWdhdGluZyB0byBlYWNoIGluZGl2aWR1YWwgcGFnZS4gQWNyb3NzIHRoZSBlbnRpcmUgcHJvamVjdCBJIGltcGxlbWVudGVkIHNldmVyYWwgZHluYW1pY2FsbHkgZ2VuZXJhdGVkIGNvbnRlbnQgcGFnZXMgLyBzbGlkZXJzLCA8c3Ryb25nPmZvcm0gdmVyaWZpY2F0aW9uPC9zdHJvbmc+LCBhbmQgc2V2ZXJhbCA8c3Ryb25nPnRoaXJkIHBhcnR5IGludGVncmF0aW9uczwvc3Ryb25nPi5gLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB1cmw6ICdwcm9qZWN0cy9jcmVhdGl2ZS1yZXZvbHQnLFxuICAgICAgICAgICAgaW1nU3JjOiBDcmVhdGl2ZVJldm9sdFRodW1iLFxuICAgICAgICAgICAgaW1nU3JjU21hbGw6IENyZWF0aXZlUmV2b2x0VGh1bWJTbWFsbCxcbiAgICAgICAgICAgIGxhenk6IHRydWUsXG4gICAgICAgICAgICBhbHQ6ICdUaHVtYm5haWwgZm9yIHRoZSBDcmVhdGl2ZSBSZXZvbHQgcmVkZXNpZ25lZCB3ZWJzaXRlJyxcbiAgICAgICAgICAgIHByb2plY3ROYW1lOiAnQ3JlYXRpdmUgUmV2b2x0JyxcbiAgICAgICAgICAgIHByb2plY3RZZWFyOiAnMjAxOCcsXG4gICAgICAgICAgICBwcm9qZWN0VGV4dDogYFRoaXMgd2FzIGEgZnJlZWxhbmNlIHByb2plY3QgdG8gPHN0cm9uZz5yZXdvcmsgdGhlIHdlYnNpdGUgbGF5b3V0PC9zdHJvbmc+IGFuZCB0YWlsb3IgdGhlIGZlZWwgb2YgdGhlIHdlYnNpdGUgdG8gaGVyIHBlcnNvbmFsIHdyaXRpbmcgc3R5bGUuIEkgPHN0cm9uZz5yZXZhbXBlZCB0aGUgY29sb3IgcGFsZXR0ZTwvc3Ryb25nPiB0byBiZXR0ZXIgbWF0Y2ggaGVyIHBlcnNvbmFsaXR5LCBhZGp1c3RlZCBoZXIgd2Vic2l0ZSBmb3IgPHN0cm9uZz5TRU88L3N0cm9uZz4sIGFuZCBjcmVhdGVkIHRoZSBsYW5kaW5nIHBhZ2UgYXMgd2VsbCBhcyBtdWx0aXBsZSBwYWdlcyBhY3Jvc3MgdGhlIHBsYXRmb3JtLmAsXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgIF1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbiAgICAuY29udGFpbmVyIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cblxuPC9zdHlsZT5cblxuPHN2ZWx0ZTpoZWFkPlxuXHQ8dGl0bGU+UHJvamVjdHMgfCBGcm9udCBFbmQgRGV2ZWxvcGVyIC0gSm9zaHVhIFJvcGVyPC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cblxuXG48ZGl2IFxuICAgIGNsYXNzPVwiY29udGFpbmVyXCIgXG4+XG4gICAgPFBhZ2VUaXRsZSB0aXRsZT17J1Byb2plY3RzJ30gLz5cbiAgICA8UHJvamVjdHMgcG9ydGZvbGlvQ2FyZHM9e3BvcnRmb2xpb0NhcmRzfSAvPlxuPC9kaXY+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxvQkFBZTs7QUNBZix5QkFBZTs7QUNBZiwwQkFBZTs7QUNBZiwrQkFBZTs7QUNBZiwwQkFBZTs7QUNBZiwrQkFBZTs7Ozs7Ozs7Ozs7Ozs7bUJDbUZPLFVBQVU7Ozs7Ozt1Q0FDRixHQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXJFcEMsY0FBYzs7R0FFVixHQUFHLEVBQUUsbUJBQW1CO0dBQ3hCLE1BQU0sRUFBRSxZQUFZO0dBQ3BCLFdBQVcsRUFBRSxpQkFBaUI7R0FDOUIsR0FBRyxFQUFFLGdEQUFnRDtHQUNyRCxXQUFXLEVBQUUsU0FBUztHQUN0QixXQUFXLEVBQUUsTUFBTTtHQUNuQixXQUFXOzs7R0FHWCxHQUFHLEVBQUUsc0JBQXNCO0dBQzNCLE1BQU0sRUFBRSxjQUFjO0dBQ3RCLFdBQVcsRUFBRSxtQkFBbUI7R0FDaEMsR0FBRyxFQUFFLCtFQUErRTtHQUNwRixXQUFXLEVBQUUsWUFBWTtHQUN6QixXQUFXLEVBQUUsTUFBTTtHQUNuQixXQUFXOzs7R0FHWCxHQUFHLEVBQUUsbUJBQW1CO0dBQ3hCLE1BQU0sRUFBRSxhQUFhO0dBQ3JCLFdBQVcsRUFBRSxrQkFBa0I7R0FDL0IsR0FBRyxFQUFFLHFEQUFxRDtHQUMxRCxXQUFXLEVBQUUsVUFBVTtHQUN2QixXQUFXLEVBQUUsTUFBTTtHQUNuQixXQUFXOzs7R0FHWCxHQUFHLEVBQUUsMkJBQTJCO0dBQ2hDLE1BQU0sRUFBRSxtQkFBbUI7R0FDM0IsV0FBVyxFQUFFLHdCQUF3QjtHQUNyQyxJQUFJLEVBQUUsSUFBSTtHQUNWLEdBQUcsRUFBRSwrRUFBK0U7R0FDcEYsV0FBVyxFQUFFLGlCQUFpQjtHQUM5QixXQUFXLEVBQUUsTUFBTTtHQUNuQixXQUFXOzs7R0FHWCxHQUFHLEVBQUUsMEJBQTBCO0dBQy9CLE1BQU0sRUFBRSxtQkFBbUI7R0FDM0IsV0FBVyxFQUFFLHdCQUF3QjtHQUNyQyxJQUFJLEVBQUUsSUFBSTtHQUNWLEdBQUcsRUFBRSxzREFBc0Q7R0FDM0QsV0FBVyxFQUFFLGlCQUFpQjtHQUM5QixXQUFXLEVBQUUsTUFBTTtHQUNuQixXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
