<script>
import ProjectDetailTemplate from '../../route-layouts/ProjectDetailTemplate.svelte';

import Image1 from '../../images/trinity-consultants/1.png';
import Image2 from '../../images/trinity-consultants/2.png';
import Image3 from '../../images/trinity-consultants/3.png';
import Image4 from '../../images/trinity-consultants/4.png';
import Image5 from '../../images/trinity-consultants/5.png';

let STATE = {
    metaTitle: `Trinity Consultants | Front End Developer - Joshua Roper`,
    title: `Trinity Consultants`,
    url: 'https://www.trinityconsultants.com/',
    description: `As the <strong>Lead React Developer</strong> on the ecommerce project, I was tasked with creating a multitude of dynamic templates for over 10,000 pages of content. The project included <strong>collaboration across multiple teams</strong>, and working with <strong>various advanced API’s,</strong> React, Redux, Stripe, etc...`,
    skills: ['React', 'Redux', 'Node JS', 'JavaScript (ES8)', 'Ucommerece', 'Stripe', 'AJAX / JSON', 'Bootstrap (React Bootstrap)', 'SCSS / SCSS', 'PostCSS', 'JSX (HTML WCAG compliant)', 'Sitefinity', 'C#', 'Adobe XD'],
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