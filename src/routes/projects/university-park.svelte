<script>
import ProjectDetailTemplate from '../../route-layouts/ProjectDetailTemplate.svelte';

import Image1 from '../../images/university-park/1.jpg';
import Image2 from '../../images/university-park/2.jpg';
import Image3 from '../../images/university-park/3.jpg';
import Image4 from '../../images/university-park/4.jpg';
import Image5 from '../../images/university-park/5.jpg';

let STATE = {
    metaTitle: `University Park | Front End Developer - Joshua Roper`,
    title: `University Park`,
    url: 'https://www.uptexas.org/',
    description: `I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.`,
    skills: ['JavaScript (ES6+)', 'jQuery', 'API Integration', 'AJAX / JSON', 'SASS / SCSS', 'CSS', 'Foundation', 'HTML (WCAG 2.1)', 'Adobe Illustrator', 'SEO', 'Kentico (CMS)', 'BitBucket'],
    images: [
        {
            src: Image1,
            alt: `The home page for the City of University Park website`,
            visible: true,
            key: 0,
        },
        
        {
            src: Image2,
            alt: `The library page for the City of University Park website`,
            visible: false,
            key: 1,
        },
        {
            src: Image3,
            alt: `The video modal on the City of University Park website`,
            visible: false,
            key: 2,
        },
        {
            src: Image4,
            alt: `The direct alarm monitoring form for the City of University Park website`,
            visible: false,
            key: 3,
        },
        {
            src: Image5,
            alt: `The newsletter page for the City of University Park website`,
            visible: false,
            key: 4,
        },
    ]
}

</script>


<ProjectDetailTemplate STATE={STATE} />