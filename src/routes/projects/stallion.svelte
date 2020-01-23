<script>
import ProjectDetailTemplate from '../../route-layouts/ProjectDetailTemplate.svelte';

let STATE = {
    metaTitle: `Stallion | Front End Developer - Joshua Roper`,
    title: `Stallion`,
    url: 'https://www.stallionoilfield.com/',
    description: `As the <strong>Lead Front End Developer</strong> on a <strong>complete website rebuild</strong>, I worked towards envisioning a website that would match their innovative Stallion attitude. The project was built with an <strong>emphasis</strong> on <strong>clean code</strong>, and <strong>modularity.</strong> The website includes multiple API’s, form verification, and other advanced modules.`,
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
}

</script>


<ProjectDetailTemplate STATE={STATE} />