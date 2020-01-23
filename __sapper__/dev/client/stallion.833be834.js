import { S as SvelteComponentDev, i as init, s as safe_not_equal, z as mount_component, u as transition_in, x as transition_out, A as destroy_component } from './index.86fc6f69.js';
import './index.60cd3d27.js';
import './TextAnimation.d7718a5d.js';
import { P as ProjectDetailTemplate } from './ProjectDetailTemplate.a0b03e83.js';

/* src/routes/projects/stallion.svelte generated by Svelte v3.9.1 */

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
    url: 'https://www.stallionoilfield.com/',
    description: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`,
    skills: ['JavaScript (ES6)', 'jQuery', 'API Integration', 'WebPack', 'AJAX / JSON', 'SASS / SCSS', 'PostCSS', 'Foundation', 'PurgeCSS', 'CSS', 'HTML (WCAG 2.1)', 'PHP', 'WordPress', 'Adobe XD'],
    images: [
        {
            src: 'images/stallion/stallion-4.png',
            alt: `A call to action on the home page of the Halcyon Center Mall website`,
            visible: true,
            key: 0,
        },
        {
            src: 'images/stallion/stallion-2.png',
            alt: `The home page for Halcyon Center Mall website`,
            visible: false,
            key: 1,
        },
        {
            src: 'images/stallion/stallion-6.png',
            alt: `The dining directory page of the Halcyon Center Mall website`,
            visible: false,
            key: 2,
        },
        {
            src: 'images/stallion/stallion-11.png',
            alt: `The events directory page of the Halcyon Center Mall website`,
            visible: false,
            key: 3,
        },
        {
            src: 'images/stallion/stallion-5.png',
            alt: `A spotlight for businesses on the home page of the Halcyon Center Mall website`,
            visible: false,
            key: 4,
        }, 
    ]
};

	return { STATE };
}

class Stallion extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, []);
	}
}

export default Stallion;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbGxpb24uODMzYmU4MzQuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvcHJvamVjdHMvc3RhbGxpb24uc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG5pbXBvcnQgUHJvamVjdERldGFpbFRlbXBsYXRlIGZyb20gJy4uLy4uL3JvdXRlLWxheW91dHMvUHJvamVjdERldGFpbFRlbXBsYXRlLnN2ZWx0ZSc7XG5cbmxldCBTVEFURSA9IHtcbiAgICBtZXRhVGl0bGU6IGBIYWxjeW9uIHwgRnJvbnQgRW5kIERldmVsb3BlciAtIEpvc2h1YSBSb3BlcmAsXG4gICAgdGl0bGU6IGBIYWxjeW9uYCxcbiAgICB1cmw6ICdodHRwczovL3d3dy5zdGFsbGlvbm9pbGZpZWxkLmNvbS8nLFxuICAgIGRlc2NyaXB0aW9uOiBgSSB3YXMgb25lIG9mIHRoZSBGcm9udCBFbmQgRGV2ZWxvcGVycyBvbiB0aGUgcHJvamVjdCBwcmltYXJpbHkgdGFza2VkIHdpdGggY3JlYXRpbmcgdGhlIG1vdmllcyBwYWdlIGFuZCBldmVudHMgZGlyZWN0b3J5LiBBY3Jvc3MgdGhlIHByb2plY3QgSSB3b3JrZWQgd2l0aCA8c3Ryb25nPm11bHRpcGxlIEFQSeKAmXM8L3N0cm9uZz4sIDxzdHJvbmc+UmVhY3QgU3RhdGljPC9zdHJvbmc+LCBhbmQgZGV2ZWxvcGVkIDxzdHJvbmc+Y2xlYW4gY29kZTwvc3Ryb25nPiBmb3Igb3RoZXIgYWR2YW5jZWQgUmVhY3QgY29tcG9uZW50cy5gLFxuICAgIHNraWxsczogWydKYXZhU2NyaXB0IChFUzYpJywgJ2pRdWVyeScsICdBUEkgSW50ZWdyYXRpb24nLCAnV2ViUGFjaycsICdBSkFYIC8gSlNPTicsICdTQVNTIC8gU0NTUycsICdQb3N0Q1NTJywgJ0ZvdW5kYXRpb24nLCAnUHVyZ2VDU1MnLCAnQ1NTJywgJ0hUTUwgKFdDQUcgMi4xKScsICdQSFAnLCAnV29yZFByZXNzJywgJ0Fkb2JlIFhEJ10sXG4gICAgaW1hZ2VzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltYWdlcy9zdGFsbGlvbi9zdGFsbGlvbi00LnBuZycsXG4gICAgICAgICAgICBhbHQ6IGBBIGNhbGwgdG8gYWN0aW9uIG9uIHRoZSBob21lIHBhZ2Ugb2YgdGhlIEhhbGN5b24gQ2VudGVyIE1hbGwgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAga2V5OiAwLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvc3RhbGxpb24vc3RhbGxpb24tMi5wbmcnLFxuICAgICAgICAgICAgYWx0OiBgVGhlIGhvbWUgcGFnZSBmb3IgSGFsY3lvbiBDZW50ZXIgTWFsbCB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAxLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvc3RhbGxpb24vc3RhbGxpb24tNi5wbmcnLFxuICAgICAgICAgICAgYWx0OiBgVGhlIGRpbmluZyBkaXJlY3RvcnkgcGFnZSBvZiB0aGUgSGFsY3lvbiBDZW50ZXIgTWFsbCB3ZWJzaXRlYCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAyLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvc3RhbGxpb24vc3RhbGxpb24tMTEucG5nJyxcbiAgICAgICAgICAgIGFsdDogYFRoZSBldmVudHMgZGlyZWN0b3J5IHBhZ2Ugb2YgdGhlIEhhbGN5b24gQ2VudGVyIE1hbGwgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogMyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL3N0YWxsaW9uL3N0YWxsaW9uLTUucG5nJyxcbiAgICAgICAgICAgIGFsdDogYEEgc3BvdGxpZ2h0IGZvciBidXNpbmVzc2VzIG9uIHRoZSBob21lIHBhZ2Ugb2YgdGhlIEhhbGN5b24gQ2VudGVyIE1hbGwgd2Vic2l0ZWAsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogNCxcbiAgICAgICAgfSwgXG4gICAgXVxufVxuXG48L3NjcmlwdD5cblxuXG48UHJvamVjdERldGFpbFRlbXBsYXRlIFNUQVRFPXtTVEFURX0gLz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7c0JBOEM4QixLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnRUFBTCxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTNDbkMsSUFBSSxLQUFLLEdBQUc7SUFDUixTQUFTLEVBQUUsQ0FBQyw0Q0FBNEMsQ0FBQztJQUN6RCxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDaEIsR0FBRyxFQUFFLG1DQUFtQztJQUN4QyxXQUFXLEVBQUUsQ0FBQyx5U0FBeVMsQ0FBQztJQUN4VCxNQUFNLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDO0lBQ2pNLE1BQU0sRUFBRTtRQUNKO1lBQ0ksR0FBRyxFQUFFLGdDQUFnQztZQUNyQyxHQUFHLEVBQUUsQ0FBQyxvRUFBb0UsQ0FBQztZQUMzRSxPQUFPLEVBQUUsSUFBSTtZQUNiLEdBQUcsRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNJLEdBQUcsRUFBRSxnQ0FBZ0M7WUFDckMsR0FBRyxFQUFFLENBQUMsNkNBQTZDLENBQUM7WUFDcEQsT0FBTyxFQUFFLEtBQUs7WUFDZCxHQUFHLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDSSxHQUFHLEVBQUUsZ0NBQWdDO1lBQ3JDLEdBQUcsRUFBRSxDQUFDLDREQUE0RCxDQUFDO1lBQ25FLE9BQU8sRUFBRSxLQUFLO1lBQ2QsR0FBRyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0ksR0FBRyxFQUFFLGlDQUFpQztZQUN0QyxHQUFHLEVBQUUsQ0FBQyw0REFBNEQsQ0FBQztZQUNuRSxPQUFPLEVBQUUsS0FBSztZQUNkLEdBQUcsRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNJLEdBQUcsRUFBRSxnQ0FBZ0M7WUFDckMsR0FBRyxFQUFFLENBQUMsOEVBQThFLENBQUM7WUFDckYsT0FBTyxFQUFFLEtBQUs7WUFDZCxHQUFHLEVBQUUsQ0FBQztTQUNUO0tBQ0o7RUFDSjs7Ozs7Ozs7Ozs7Ozs7In0=
