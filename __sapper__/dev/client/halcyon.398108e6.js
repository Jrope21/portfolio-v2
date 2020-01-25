import { S as SvelteComponentDev, i as init, s as safe_not_equal, z as mount_component, u as transition_in, x as transition_out, A as destroy_component } from './index.86fc6f69.js';
import './index.60cd3d27.js';
import './TextAnimation.d7718a5d.js';
import { P as ProjectDetailTemplate } from './ProjectDetailTemplate.7e74f90e.js';

/* src/routes/projects/halcyon.svelte generated by Svelte v3.9.1 */

function create_fragment(ctx) {
	var current;

	var projectdetailtemplate = new ProjectDetailTemplate({
		props: { STATE: ctx.STATE },
		$$inline: true
	});

	return {
		c: function create() {
			projectdetailtemplate.$$.fragment.c();
		},

		l: function claim(nodes) {
			projectdetailtemplate.$$.fragment.l(nodes);
		},

		m: function mount(target, anchor) {
			mount_component(projectdetailtemplate, target, anchor);
			current = true;
		},

		p: function update(changed, ctx) {
			var projectdetailtemplate_changes = {};
			if (changed.STATE) projectdetailtemplate_changes.STATE = ctx.STATE;
			projectdetailtemplate.$set(projectdetailtemplate_changes);
		},

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
}

function instance($$self) {
	let STATE = {
    metaTitle: `Halcyon | Front End Developer - Joshua Roper`,
    title: `Halcyon`,
    url: 'https://www.visithalcyon.com/',
    description: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`,
    skills: ['React', 'React Static', 'JavaScript (ES6)', 'WordPress REST API', 'iShowtimes API', `Google API's`, 'AJAX / JSON', 'Bootstrap (React Bootstrap)', 'SCSS / SCSS', 'PostCSS', 'JSX (HTML WCAG 2.1)', 'PHP', 'WordPress', 'Adobe XD'],
    images: [
        {
            src: 'images/halcyon/home-cta.png',
            alt: `A call to action on the home page of the Halcyon Center Mall website`,
            visible: true,
            key: 0,
        },
        {
            src: 'images/halcyon/home.png',
            alt: `The home page for Halcyon Center Mall website`,
            visible: false,
            key: 1,
        },
        {
            src: 'images/halcyon/dining.png',
            alt: `The dining directory page of the Halcyon Center Mall website`,
            visible: false,
            key: 2,
        },
        {
            src: 'images/halcyon/events.png',
            alt: `The events directory page of the Halcyon Center Mall website`,
            visible: false,
            key: 3,
        },
        {
            src: 'images/halcyon/spotlight.png',
            alt: `A spotlight for businesses on the home page of the Halcyon Center Mall website`,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFsY3lvbi4zOTgxMDhlNi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy9wcm9qZWN0cy9oYWxjeW9uLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuaW1wb3J0IFByb2plY3REZXRhaWxUZW1wbGF0ZSBmcm9tICcuLi8uLi9yb3V0ZS1sYXlvdXRzL1Byb2plY3REZXRhaWxUZW1wbGF0ZS5zdmVsdGUnO1xuXG5sZXQgU1RBVEUgPSB7XG4gICAgbWV0YVRpdGxlOiBgSGFsY3lvbiB8IEZyb250IEVuZCBEZXZlbG9wZXIgLSBKb3NodWEgUm9wZXJgLFxuICAgIHRpdGxlOiBgSGFsY3lvbmAsXG4gICAgdXJsOiAnaHR0cHM6Ly93d3cudmlzaXRoYWxjeW9uLmNvbS8nLFxuICAgIGRlc2NyaXB0aW9uOiBgSSB3YXMgb25lIG9mIHRoZSBGcm9udCBFbmQgRGV2ZWxvcGVycyBvbiB0aGUgcHJvamVjdCBwcmltYXJpbHkgdGFza2VkIHdpdGggY3JlYXRpbmcgdGhlIG1vdmllcyBwYWdlIGFuZCBldmVudHMgZGlyZWN0b3J5LiBBY3Jvc3MgdGhlIHByb2plY3QgSSB3b3JrZWQgd2l0aCA8c3Ryb25nPm11bHRpcGxlIEFQSeKAmXM8L3N0cm9uZz4sIDxzdHJvbmc+UmVhY3QgU3RhdGljPC9zdHJvbmc+LCBhbmQgZGV2ZWxvcGVkIDxzdHJvbmc+Y2xlYW4gY29kZTwvc3Ryb25nPiBmb3Igb3RoZXIgYWR2YW5jZWQgUmVhY3QgY29tcG9uZW50cy5gLFxuICAgIHNraWxsczogWydSZWFjdCcsICdSZWFjdCBTdGF0aWMnLCAnSmF2YVNjcmlwdCAoRVM2KScsICdXb3JkUHJlc3MgUkVTVCBBUEknLCAnaVNob3d0aW1lcyBBUEknLCBgR29vZ2xlIEFQSSdzYCwgJ0FKQVggLyBKU09OJywgJ0Jvb3RzdHJhcCAoUmVhY3QgQm9vdHN0cmFwKScsICdTQ1NTIC8gU0NTUycsICdQb3N0Q1NTJywgJ0pTWCAoSFRNTCBXQ0FHIDIuMSknLCAnUEhQJywgJ1dvcmRQcmVzcycsICdBZG9iZSBYRCddLFxuICAgIGltYWdlczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvaGFsY3lvbi9ob21lLWN0YS5wbmcnLFxuICAgICAgICAgICAgYWx0OiBgQSBjYWxsIHRvIGFjdGlvbiBvbiB0aGUgaG9tZSBwYWdlIG9mIHRoZSBIYWxjeW9uIENlbnRlciBNYWxsIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGtleTogMCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2hhbGN5b24vaG9tZS5wbmcnLFxuICAgICAgICAgICAgYWx0OiBgVGhlIGhvbWUgcGFnZSBmb3IgSGFsY3lvbiBDZW50ZXIgTWFsbCB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAxLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvaGFsY3lvbi9kaW5pbmcucG5nJyxcbiAgICAgICAgICAgIGFsdDogYFRoZSBkaW5pbmcgZGlyZWN0b3J5IHBhZ2Ugb2YgdGhlIEhhbGN5b24gQ2VudGVyIE1hbGwgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2hhbGN5b24vZXZlbnRzLnBuZycsXG4gICAgICAgICAgICBhbHQ6IGBUaGUgZXZlbnRzIGRpcmVjdG9yeSBwYWdlIG9mIHRoZSBIYWxjeW9uIENlbnRlciBNYWxsIHdlYnNpdGVgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltYWdlcy9oYWxjeW9uL3Nwb3RsaWdodC5wbmcnLFxuICAgICAgICAgICAgYWx0OiBgQSBzcG90bGlnaHQgZm9yIGJ1c2luZXNzZXMgb24gdGhlIGhvbWUgcGFnZSBvZiB0aGUgSGFsY3lvbiBDZW50ZXIgTWFsbCB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiA0LFxuICAgICAgICB9LCBcbiAgICBdXG59XG5cbjwvc2NyaXB0PlxuXG5cbjxQcm9qZWN0RGV0YWlsVGVtcGxhdGUgU1RBVEU9e1NUQVRFfSAvPiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztzQkE4QzhCLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dFQUFMLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBM0NuQyxJQUFJLEtBQUssR0FBRztJQUNSLFNBQVMsRUFBRSxDQUFDLDRDQUE0QyxDQUFDO0lBQ3pELEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUNoQixHQUFHLEVBQUUsK0JBQStCO0lBQ3BDLFdBQVcsRUFBRSxDQUFDLHlTQUF5UyxDQUFDO0lBQ3hULE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxhQUFhLEVBQUUsNkJBQTZCLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxxQkFBcUIsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQztJQUM1TyxNQUFNLEVBQUU7UUFDSjtZQUNJLEdBQUcsRUFBRSw2QkFBNkI7WUFDbEMsR0FBRyxFQUFFLENBQUMsb0VBQW9FLENBQUM7WUFDM0UsT0FBTyxFQUFFLElBQUk7WUFDYixHQUFHLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDSSxHQUFHLEVBQUUseUJBQXlCO1lBQzlCLEdBQUcsRUFBRSxDQUFDLDZDQUE2QyxDQUFDO1lBQ3BELE9BQU8sRUFBRSxLQUFLO1lBQ2QsR0FBRyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0ksR0FBRyxFQUFFLDJCQUEyQjtZQUNoQyxHQUFHLEVBQUUsQ0FBQyw0REFBNEQsQ0FBQztZQUNuRSxPQUFPLEVBQUUsS0FBSztZQUNkLEdBQUcsRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNJLEdBQUcsRUFBRSwyQkFBMkI7WUFDaEMsR0FBRyxFQUFFLENBQUMsNERBQTRELENBQUM7WUFDbkUsT0FBTyxFQUFFLEtBQUs7WUFDZCxHQUFHLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDSSxHQUFHLEVBQUUsOEJBQThCO1lBQ25DLEdBQUcsRUFBRSxDQUFDLDhFQUE4RSxDQUFDO1lBQ3JGLE9BQU8sRUFBRSxLQUFLO1lBQ2QsR0FBRyxFQUFFLENBQUM7U0FDVDtLQUNKO0VBQ0o7Ozs7Ozs7Ozs7Ozs7OyJ9
