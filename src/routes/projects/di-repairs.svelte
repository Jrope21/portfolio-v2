<script>
import ProjectDetailTemplate from '../../route-layouts/ProjectDetailTemplate.svelte';

let STATE = {
    metaTitle: `DI Repairs | Front End Developer - Joshua Roper`,
    title: `DI Repairs`,
    url: 'https://www.direpairs.com/',
    description: `As the <strong>only developer & designer</strong> on this freelance project. I completely re-envisioned the site design & built the project from the ground up as an extremely performant <strong>SSG website</strong>. I utilized development & design best practices with a focus on the <strong>user experience.</strong>`,
    skills: ['React', 'Gatsby Js', 'Node JS', 'JavaScript (ES8)', 'WordPress API', 'Gravity Forms API', 'AJAX / JSON', 'SCSS / SCSS', 'JSX (HTML WCAG compliant)', 'PHP', 'Figma'],
    images: [
        {
            src: 'images/di-repairs/1.png',
            alt: `A call to action on the home page of the Halcyon Center Mall website`,
            visible: true,
            key: 0,
        },
        {
            src: 'images/di-repairs/2.png',
            alt: `The home page for Halcyon Center Mall website`,
            visible: false,
            key: 1,
        },
        {
            src: 'images/di-repairs/3.png',
            alt: `The dining directory page of the Halcyon Center Mall website`,
            visible: false,
            key: 2,
        },
        {
            src: 'images/di-repairs/4.png',
            alt: `The events directory page of the Halcyon Center Mall website`,
            visible: false,
            key: 3,
        },
        {
            src: 'images/di-repairs/5.png',
            alt: `A spotlight for businesses on the home page of the Halcyon Center Mall website`,
            visible: false,
            key: 4,
        }, 
    ]
}

</script>


<ProjectDetailTemplate STATE={STATE} />