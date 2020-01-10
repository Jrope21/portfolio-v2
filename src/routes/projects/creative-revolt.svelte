<script>
import ProjectDetailTemplate from '../../route-layouts/ProjectDetailTemplate.svelte';

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
}

</script>


<ProjectDetailTemplate STATE={STATE} />