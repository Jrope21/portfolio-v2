<script>
    import Skills from './Skills.svelte';

    let skills = [
        {
            name: 'HTML5'
        },
        {
            name: 'CSS3'
        },
        {
            name: 'SASS'
        },
        {
            name: 'Foundation'
        },
        {
            name: 'JavaScript'
        },
        {
            name: 'jQuery'
        },
        {
            name: 'Kentico CMS'
        },
    ]
</script>

<style>

    div {
        display: flex;
    }

    p:nth-child(1){
        width: 20%;
    }
    ul.skills{
        width: 60%;
        display: flex;
        flex-wrap: wrap;
    }

    p {
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        font-size: 13rem;
        color: #58595b;
    }
    li {
        width: 23%;
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        font-size: 13rem;
        color: #58595b;
        margin: 0rem 0rem 20rem 0rem;
        padding: 0rem 0rem 15rem 0rem
    }
</style>

<div>
    <p>
        Skills
    </p>
    <!-- <div class="skills"> -->
        <ul class="skills">
            <li>HTML (WCAG 2.1)</li>
            <li>HTML Emails</li>
            <li>CSS (SASS / SCSS)</li>
            <li>Foundation</li>
            <li>Bootstrap</li>
            <li>JavaScript</li>
            <li>jQuery</li>
            <li>Svelte 3</li>
            <li>Sapper</li>
            <li>Gulp</li>
            <li>Git (Version Control)</li>
            <li>GitHub / BitBucket</li>
            <li>WordPress / Kentico</li>
            <li>Adobe Suite</li>
            <li>SEO</li>
            <li>Usability Testing</li>
            <!-- <li>VScode / PhpStorm</li> -->
        </ul>
    <!-- </div> -->
</div>