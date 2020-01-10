<script>
export let skills;
</script>

<style lang="scss">
    @import '../../styles/global.variables.scss';

    div {
        display: flex;
        flex-direction: column;
    }
    
    @media screen and (min-width: breakpoint(sm)){
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

    @media screen and (min-width: breakpoint(sm)){
        h3 {
            width: 18%;
        }
    }

    @media screen and (min-width: breakpoint(md)){
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

    @media screen and (min-width: breakpoint(sm)){
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

    p {
        font-weight: 300;
        font-size: 13rem;
        color: #58595b;
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


    @media screen and (min-width: breakpoint(md)){
        li {
            font-size: 18rem;
            margin: 0rem 0rem 35rem 0rem;
        }
    }

    span {
        color: #414042;
        font-weight: 500;
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
        The Tech
    </h3>
        <ul class="skills">
            {#each skills as skill}
                <li>{skill}</li>
            {/each}
        </ul>
</div>