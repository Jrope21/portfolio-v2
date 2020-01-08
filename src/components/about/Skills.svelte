<script>

</script>

<style>

    div {
        display: flex;
        flex-direction: column;
    }
    
    @media screen and (min-width: 40em){
        div{
            flex-direction: row;
        }
    }

    h3 {
        width: fit-content;
        margin-bottom: 15rem;
        width: 100%;
        text-transform: uppercase;
        
    }

    @media screen and (min-width: 40em){
        h3 {
            width: 18%;
        }
    }

    @media screen and (min-width: 64em){
        h3 {
            font-size: 23rem;
            width: 20%;
        }
    }

    ul.skills{
        position: relative;
        top: 10rem;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    @media screen and (min-width: 40em){
        ul.skills{
            width: 60%;
        }
    }

    ul.skills::before {
        content: '';
        height: 100%;
        position: absolute;
        border-left: 3px solid #e6e7e8;
        opacity: .4;
    }

    li {
        width: 100%;
        font-weight: 300;
        font-size: 13rem;
        color: #58595b;
        margin: 0rem 0rem 25rem 0rem;
        padding: 0rem 0rem 0rem 0rem;
        display: flex;
        align-items: center;
        margin-left: -2px;
        height: 0;
        z-index: 2;
    }


    @media screen and (min-width: 64em){
        li {
            font-size: 18rem;
            margin: 0rem 0rem 35rem 0rem;
        }
    }

    ul li:last-child {
        margin-bottom: 0rem;
    }

    li::before {
        content: '';
        width: 7px;
        height: 7px;
        background: #58595b;
        margin-right: 10rem;
        border-radius: 100%
    }

</style>

<div>
    <h3>
        Skills
    </h3>
        <ul class="skills">
            <li>React</li>
            <li>Svelte 3</li>
            <li>Sapper</li>
            <li>JavaScript (ES6+)</li>
            <li>WebPack</li>
            <li>Git (Version Control)</li>
            <li>jQuery</li> 
            <li>SASS / SCSS</li>
            <li>CSS</li>
            <li>Foundation</li>
            <li>Bootstrap</li>
            <li>HTML (WCAG 2.1)</li>
            <li>HTML Emails</li>
            <li>GitHub / BitBucket</li>
            <li>WordPress / Kentico</li>
            <li>Adobe Suite</li>
            <li>SEO</li>
            <li>Usability Testing</li> 
        </ul>
</div>