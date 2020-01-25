<script>
import ProjectDetailTemplate from '../../route-layouts/ProjectDetailTemplate.svelte';

let STATE = {
    metaTitle: `University Park | Front End Developer - Joshua Roper`,
    title: `University Park`,
    url: 'https://www.uptexas.org/',
    description: `I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.`,
    skills: ['JavaScript (ES6+)', 'jQuery', 'API Integration', 'AJAX / JSON', 'SASS / SCSS', 'CSS', 'Foundation', 'HTML (WCAG 2.1)', 'Adobe Illustrator', 'SEO', 'Kentico (CMS)', 'BitBucket'],
    images: [
        {
            src: 'images/university-park/home-min.png',
            alt: `The home page for the City of University Park website`,
            visible: true,
            key: 0,
        },
        
        {
            src: 'images/university-park/library-min.png',
            alt: `The library page for the City of University Park website`,
            visible: false,
            key: 1,
        },
        {
            src: 'images/university-park/home-video-min.png',
            alt: `The video modal on the City of University Park website`,
            visible: false,
            key: 2,
        },
        {
            src: 'images/university-park/form-min.png',
            alt: `The direct alarm monitoring form for the City of University Park website`,
            visible: false,
            key: 3,
        },
        {
            src: 'images/university-park/newsletter-min.png',
            alt: `The newsletter page for the City of University Park website`,
            visible: false,
            key: 4,
        },
    ]
}

</script>


<ProjectDetailTemplate STATE={STATE} />