import { S as SvelteComponentDev, i as init, s as safe_not_equal, z as mount_component, u as transition_in, x as transition_out, A as destroy_component } from './index.86fc6f69.js';
import './index.60cd3d27.js';
import './TextAnimation.ed24c4c5.js';
import { P as ProjectDetailTemplate } from './ProjectDetailTemplate.2330ea3b.js';

/* src/routes/projects/creative-revolt.svelte generated by Svelte v3.9.1 */

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
    metaTitle: `Creative Revolt | Front End Developer - Joshua Roper`,
    title: `Creative Revolt`,
    url: 'https://www.creativerevolt.com/',
    description: `This was a freelance project to <strong>rework the website layout</strong> and tailor the feel of the website to her personal writing style. I <strong>revamped the color palette</strong> to better match her personality, adjusted her website for <strong>SEO</strong>, and created the landing page as well as multiple pages across the platform.`,
    skills: ['JavaScript', 'CSS', 'HTML', 'PHP', 'DiviBuilder', 'WordPress', 'SEO', 'Googe Analytics', 'Canva', 'Adobe XD', 'MailChimp'],
    images: [
        {
            src: 'images/creative-revolt/home.png',
            alt: `The landing page for Creative Revolt`,
            visible: true,
            key: 0,
        },
        {
            src: 'images/creative-revolt/home-ctas.png',
            alt: `A call to action setup for Creative Revolt`,
            visible: false,
            key: 1,
        },
        {
            src: 'images/creative-revolt/about.png',
            alt: `The about page for Creative Revolt`,
            visible: false,
            key: 2,
        },
        {
            src: 'images/creative-revolt/about-cta.png',
            alt: `A call to action exculusively design for Creative Revolt`,
            visible: false,
            key: 3,
        },
        {
            src: 'images/creative-revolt/writing-class.png',
            alt: `A page from creative revolt that introduces customers to her their courses`,
            visible: false,
            key: 4,
        },
    ]
};

	return { STATE };
}

class Creative_revolt extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, []);
	}
}

export default Creative_revolt;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRpdmUtcmV2b2x0LjE3ZDk3ODNlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL3Byb2plY3RzL2NyZWF0aXZlLXJldm9sdC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbmltcG9ydCBQcm9qZWN0RGV0YWlsVGVtcGxhdGUgZnJvbSAnLi4vLi4vcm91dGUtbGF5b3V0cy9Qcm9qZWN0RGV0YWlsVGVtcGxhdGUuc3ZlbHRlJztcblxubGV0IFNUQVRFID0ge1xuICAgIG1ldGFUaXRsZTogYENyZWF0aXZlIFJldm9sdCB8IEZyb250IEVuZCBEZXZlbG9wZXIgLSBKb3NodWEgUm9wZXJgLFxuICAgIHRpdGxlOiBgQ3JlYXRpdmUgUmV2b2x0YCxcbiAgICB1cmw6ICdodHRwczovL3d3dy5jcmVhdGl2ZXJldm9sdC5jb20vJyxcbiAgICBkZXNjcmlwdGlvbjogYFRoaXMgd2FzIGEgZnJlZWxhbmNlIHByb2plY3QgdG8gPHN0cm9uZz5yZXdvcmsgdGhlIHdlYnNpdGUgbGF5b3V0PC9zdHJvbmc+IGFuZCB0YWlsb3IgdGhlIGZlZWwgb2YgdGhlIHdlYnNpdGUgdG8gaGVyIHBlcnNvbmFsIHdyaXRpbmcgc3R5bGUuIEkgPHN0cm9uZz5yZXZhbXBlZCB0aGUgY29sb3IgcGFsZXR0ZTwvc3Ryb25nPiB0byBiZXR0ZXIgbWF0Y2ggaGVyIHBlcnNvbmFsaXR5LCBhZGp1c3RlZCBoZXIgd2Vic2l0ZSBmb3IgPHN0cm9uZz5TRU88L3N0cm9uZz4sIGFuZCBjcmVhdGVkIHRoZSBsYW5kaW5nIHBhZ2UgYXMgd2VsbCBhcyBtdWx0aXBsZSBwYWdlcyBhY3Jvc3MgdGhlIHBsYXRmb3JtLmAsXG4gICAgc2tpbGxzOiBbJ0phdmFTY3JpcHQnLCAnQ1NTJywgJ0hUTUwnLCAnUEhQJywgJ0RpdmlCdWlsZGVyJywgJ1dvcmRQcmVzcycsICdTRU8nLCAnR29vZ2UgQW5hbHl0aWNzJywgJ0NhbnZhJywgJ0Fkb2JlIFhEJywgJ01haWxDaGltcCddLFxuICAgIGltYWdlczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvY3JlYXRpdmUtcmV2b2x0L2hvbWUucG5nJyxcbiAgICAgICAgICAgIGFsdDogYFRoZSBsYW5kaW5nIHBhZ2UgZm9yIENyZWF0aXZlIFJldm9sdGAsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAga2V5OiAwLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvY3JlYXRpdmUtcmV2b2x0L2hvbWUtY3Rhcy5wbmcnLFxuICAgICAgICAgICAgYWx0OiBgQSBjYWxsIHRvIGFjdGlvbiBzZXR1cCBmb3IgQ3JlYXRpdmUgUmV2b2x0YCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAxLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvY3JlYXRpdmUtcmV2b2x0L2Fib3V0LnBuZycsXG4gICAgICAgICAgICBhbHQ6IGBUaGUgYWJvdXQgcGFnZSBmb3IgQ3JlYXRpdmUgUmV2b2x0YCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAyLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvY3JlYXRpdmUtcmV2b2x0L2Fib3V0LWN0YS5wbmcnLFxuICAgICAgICAgICAgYWx0OiBgQSBjYWxsIHRvIGFjdGlvbiBleGN1bHVzaXZlbHkgZGVzaWduIGZvciBDcmVhdGl2ZSBSZXZvbHRgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltYWdlcy9jcmVhdGl2ZS1yZXZvbHQvd3JpdGluZy1jbGFzcy5wbmcnLFxuICAgICAgICAgICAgYWx0OiBgQSBwYWdlIGZyb20gY3JlYXRpdmUgcmV2b2x0IHRoYXQgaW50cm9kdWNlcyBjdXN0b21lcnMgdG8gaGVyIHRoZWlyIGNvdXJzZXNgLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6IDQsXG4gICAgICAgIH0sXG4gICAgXVxufVxuXG48L3NjcmlwdD5cblxuXG48UHJvamVjdERldGFpbFRlbXBsYXRlIFNUQVRFPXtTVEFURX0gLz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7c0JBOEM4QixLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnRUFBTCxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTNDbkMsSUFBSSxLQUFLLEdBQUc7SUFDUixTQUFTLEVBQUUsQ0FBQyxvREFBb0QsQ0FBQztJQUNqRSxLQUFLLEVBQUUsQ0FBQyxlQUFlLENBQUM7SUFDeEIsR0FBRyxFQUFFLGlDQUFpQztJQUN0QyxXQUFXLEVBQUUsQ0FBQyxzVkFBc1YsQ0FBQztJQUNyVyxNQUFNLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUM7SUFDcEksTUFBTSxFQUFFO1FBQ0o7WUFDSSxHQUFHLEVBQUUsaUNBQWlDO1lBQ3RDLEdBQUcsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO1lBQzNDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsR0FBRyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0ksR0FBRyxFQUFFLHNDQUFzQztZQUMzQyxHQUFHLEVBQUUsQ0FBQywwQ0FBMEMsQ0FBQztZQUNqRCxPQUFPLEVBQUUsS0FBSztZQUNkLEdBQUcsRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNJLEdBQUcsRUFBRSxrQ0FBa0M7WUFDdkMsR0FBRyxFQUFFLENBQUMsa0NBQWtDLENBQUM7WUFDekMsT0FBTyxFQUFFLEtBQUs7WUFDZCxHQUFHLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDSSxHQUFHLEVBQUUsc0NBQXNDO1lBQzNDLEdBQUcsRUFBRSxDQUFDLHdEQUF3RCxDQUFDO1lBQy9ELE9BQU8sRUFBRSxLQUFLO1lBQ2QsR0FBRyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0ksR0FBRyxFQUFFLDBDQUEwQztZQUMvQyxHQUFHLEVBQUUsQ0FBQywwRUFBMEUsQ0FBQztZQUNqRixPQUFPLEVBQUUsS0FBSztZQUNkLEdBQUcsRUFBRSxDQUFDO1NBQ1Q7S0FDSjtFQUNKOzs7Ozs7Ozs7Ozs7OzsifQ==
