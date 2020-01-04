<script>
export let addClass;
</script>

<style>
section.titles {
    margin-bottom: 40rem;
    top: 180px;
}

@media screen and (min-width: 40em) {
    section.titles {
        margin-bottom: 60rem;
        position: -webkit-sticky;
        position: sticky;
    }
}

@media (min-width: 64em) {
    section.titles {
        top: 250px;
    }
}

h1 {
    color:#3B3B3B;
    font-weight: 800;
    font-size: 23px;
}
h2 {
    color:#3B3B3B;
    font-weight: 800;
    font-size: 18px;
    margin-bottom: 5px;
    margin-top: -3px;
    opacity: .85;
}

h3 {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    opacity: .8;
    margin-bottom: 15px;
}

h3::before {
    content: '';
    display: block;
    width: 30px;
    border-bottom: 3px solid black;
    margin-right: 10px;
    opacity: .8;
}

 @media screen and (min-width: 40em) and (max-width: 64em){
    h1 {
        font-size: 21px;
        
    }
    h2 {
        font-size: 16px;
        margin-bottom: 7px;
    }
    h3 {
        font-size: 12px;
    }
}

@media screen and (min-width: 64em) {
    h1 {
        font-size: 28px;
    }
    h2 {
        font-size: 22px;
        margin-bottom: 7px;
    }
    h3 {
        margin-bottom: 0;
    }
}

</style>

<section class="titles {addClass}">
    <h1>Front End Developer</h1>
    <h2>React, Svelte, ES6</h2>
    <h3>Joshua Roper</h3>
</section>