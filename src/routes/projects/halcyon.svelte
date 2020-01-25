<script>
import ProjectDetailTemplate from '../../route-layouts/ProjectDetailTemplate.svelte';

let STATE = {
    metaTitle: `Halcyon | Front End Developer - Joshua Roper`,
    title: `Halcyon`,
    url: 'https://www.visithalcyon.com/',
    description: `I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components.`,
    skills: ['React', 'React Static', 'JavaScript (ES6)', 'WordPress REST API', 'iShowtimes API', `Google API's`, 'AJAX / JSON', 'Bootstrap (React Bootstrap)', 'SCSS / SCSS', 'PostCSS', 'JSX (HTML WCAG 2.1)', 'PHP', 'WordPress', 'Adobe XD'],
    images: [
        {
            src: 'images/halcyon/home-cta-min.png',
            alt: `A call to action on the home page of the Halcyon Center Mall website`,
            visible: true,
            key: 0,
        },
        {
            src: 'images/halcyon/home-min.png',
            alt: `The home page for Halcyon Center Mall website`,
            visible: false,
            key: 1,
        },
        {
            src: 'images/halcyon/dining-min.png',
            alt: `The dining directory page of the Halcyon Center Mall website`,
            visible: false,
            key: 2,
        },
        {
            src: 'images/halcyon/events-min.png',
            alt: `The events directory page of the Halcyon Center Mall website`,
            visible: false,
            key: 3,
        },
        {
            src: 'images/halcyon/spotlight-min.png',
            alt: `A spotlight for businesses on the home page of the Halcyon Center Mall website`,
            visible: false,
            key: 4,
        }, 
    ]
}

</script>


<ProjectDetailTemplate STATE={STATE} />