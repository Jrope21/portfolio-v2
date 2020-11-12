<script>
import ProjectDetailTemplate from '../../route-layouts/ProjectDetailTemplate.svelte';

import Image1 from '../../images/di-repairs/1.png';
import Image2 from '../../images/di-repairs/2.png';
import Image3 from '../../images/di-repairs/3.png';
import Image4 from '../../images/di-repairs/4.png';
import Image5 from '../../images/di-repairs/5.png';

let STATE = {
    metaTitle: `DI Repairs | Front End Developer - Joshua Roper`,
    title: `DI Repairs`,
    url: 'https://www.direpairs.com/',
    description: `As the <strong>only developer & designer</strong> on this freelance project. I completely re-envisioned the site design & built the project from the ground up as an extremely performant <strong>SSG website</strong>. I utilized development & design best practices with a focus on the <strong>user experience.</strong>`,
    skills: ['React', 'Gatsby Js', 'Node JS', 'JavaScript (ES8)', 'WordPress API', 'Gravity Forms API', 'AJAX / JSON', 'SCSS / SCSS', 'JSX (HTML WCAG compliant)', 'PHP', 'Figma'],
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