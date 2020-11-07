<script>

</script>

<style lang="scss">
    @import '../../../styles/global.variables.scss';

    h1 {
        color: color(primary);
        font-weight: 800;
        font-size: 23px;
    }
    h2 {
        color: color(primary);
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

    @media (min-width: breakpoint(sm)){
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

    @media (min-width: breakpoint(md)) {
        h1 {
            font-size: 38px;
        }
        h2 {
            font-size: 28px;
            margin-bottom: 9px;
            margin-top: -5px;
        }
        h3 {
            font-size: 18px;
        }
    }

    @media screen and (min-width: breakpoint(lg)){
        h1 {
            font-size: 45px;
        }
        h2 {
            font-size: 38px;
        }
        h3 {
            font-size: 23px;
        }
    }

</style>

<h1>Front End Developer</h1>
<h2>React, Svelte, ES6</h2>
<h3>Joshua Roper</h3>