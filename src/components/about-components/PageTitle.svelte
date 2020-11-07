<script>
export let title;
</script>

<style lang="scss">
    @import '../../styles/global.variables.scss';

    div:not(.page-header) {
        display: flex;
        justify-content: flex-end;
        width: 65%;
        margin: -05px 0px 20px 0;
        font-size: 16rem;
        text-transform: uppercase;
        color: color(secondary);
        max-width: 900px;

        @media (min-width: breakpoint(sm)) {
            font-size: 28rem;
            width: 75%; 
        }
    }

    div.title-container{
        position: relative;
        width: 100%;

        @media (min-width: breakpoint(sm)) {
            margin-bottom: 20px;
            width: 75%; 
        }
    }

    h1 {
        color: color(primary);
        position: relative;
        width: 100%;
        top: 0;
        right: 0px;
        display: flex;
        font-size: 32px;
        align-items: center;
        margin: 0px;

        @media (min-width: breakpoint(sm)) {
            font-size: 55px;
        }

        @media (min-width: breakpoint(md)) {
            font-size: 64px;
        }
    }

    div.page-header{
        margin-top: 90px;
        position: relative;
        width: 100vw;
        height: 125px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        box-sizing: border-box;
        padding-left: 20rem;

        @media (min-width: breakpoint(sm)) {
            padding: 0;
            box-sizing: content-box;
            height: 220px;
        }

        @media (min-width: breakpoint(md)) {
            height: 250px;
        }
    }

    span{
        position: absolute;
        transform: scaleX(-1) rotate(180deg) skew(-10deg, 0deg);
        opacity: .03;
        left: 3px;
        bottom: -25px;
        font-size: 32px;

        @media (min-width: breakpoint(sm)) {
            left: 5px;
            bottom: -55px;
            font-size: 55px;
        }

        @media (min-width: breakpoint(md)) {
            font-size: 64px;
        }
    }
    
</style>
<div class="page-header">
    <div class='title-container'>
        <h1>{title}</h1>
        <span>{title}</span>
    </div>
</div>