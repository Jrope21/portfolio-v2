<script>
import ProjectDetailTemplate from '../../route-layouts/ProjectDetailTemplate.svelte';

import Image1 from '../../images/goosehead-insurance/1.png';
import Image2 from '../../images/goosehead-insurance/2.png';
import Image3 from '../../images/goosehead-insurance/3.png';
import Image4 from '../../images/goosehead-insurance/4.png';
import Image5 from '../../images/goosehead-insurance/5.png';

let STATE = {
    metaTitle: `Goosehead Insurance | Front End Developer - Joshua Roper`,
    title: `Goosehead Insurance`,
    url: 'https://www.goosehead.com/',
    description: `I was tasked with being the <strong>Lead Front End Developer</strong> on a <strong>complete website rebuild</strong> for a multi-billion dollar insurance company. I worked towards rebuilding a website that would prove to be modern, and provide a superior customer experience. While building the site I placed an <strong>emphasis</strong> on <strong>clean code</strong>, and <strong>modularity.</strong> The website includes multiple API’s, various forms, and other advanced modules.`,
    skills: ['JavaScript (ES8)', 'jQuery', 'API Integration', 'WebPack', 'AJAX / JSON', 'SASS / SCSS', 'PostCSS', 'Bootstrap', 'PurgeCSS', 'CSS', 'HTML (WCAG 2.1)', 'C#', 'Kentico', 'Adobe XD'],
    images: [
        {
            src: Image1,
            alt: `A call to action on the home page of the Halcyon Center Mall website`,
            visible: true,
            key: 0,
        },
        {
            src: Image2,
            alt: `The home page for Halcyon Center Mall website`,
            visible: false,
            key: 1,
        },
        {
            src: Image3,
            alt: `The dining directory page of the Halcyon Center Mall website`,
            visible: false,
            key: 2,
        },
        {
            src: Image4,
            alt: `The events directory page of the Halcyon Center Mall website`,
            visible: false,
            key: 3,
        },
        {
            src: Image5,
            alt: `A spotlight for businesses on the home page of the Halcyon Center Mall website`,
            visible: false,
            key: 4,
        }, 
    ]
}

</script>


<ProjectDetailTemplate STATE={STATE} />