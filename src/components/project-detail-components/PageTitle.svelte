<script>
export let title, sidePage;
// sidePage should be set to 'side-page' to toggle class
</script>

<style lang="scss">
    @import '../../styles/global.variables.scss';

    @keyframes slideInRight {
        100% {
            transform: translateX(100%);
        }
    }

    @keyframes badSlideInRight {
        0% {
            left: -100%;
        }
        100% {
            left: 5px;
        }
    }

    div:not(.page-header) {
        display: flex;
        justify-content: flex-end;
        width: 65%;
        margin: -05px 0px 20px 0;
        font-size: 16rem;
        text-transform: uppercase;
        color: color(headerText);
        // color: color(secondary);
        max-width: 1320px;
    }

    div.side-page {
        font-size: 12rem;
        max-width: 1705px;
    }

    div.title-container:not(.side-page){
        position: relative;
        /* animation: .9s ease-out 0s 1 fadeIn forwards; */
        width: 100%;
    }

    @media screen and (min-width: breakpoint(sm)){
        div.title-container:not(.side-page){
            margin-bottom: 20px;
            width: 100%;
        }

        div:not(.page-header) {
            font-size: 28rem;
            width: 75%;
        }

        div.side-page {
            font-size: 24rem;
            width: 85%
        }
    }

    h1 {
        // color: color(primary);
        position: relative;
        width: 100%;
        top: 0;
        /* left: -100%; */
        right: 0px;
        display: flex;
        font-size: 32px;
        align-items: center;
        margin: 0px;
        /* animation: 1s ease-out 0s 1 slideInRight forwards; */
    }

    @media screen and (min-width: breakpoint(sm)){
        h1 {
            font-size: 55px;
        }
    }

    @media screen and (min-width: breakpoint(md)){
        h1 {
            font-size: 64px;
        }
    }

    div.page-header{
        margin-top: 100px;
        position: relative;
        width: 100%;
        /* height: 125px; */
        display: flex;
        justify-content: center;
        align-items: flex-end;
        box-sizing: border-box;
    }

    @media screen and (min-width: breakpoint(sm)){
        div.page-header {
            padding: 0;
            box-sizing: content-box;
            height: 120px;
        }
    }

    /* @media screen and (min-width: breakpoint(md)){
        div.page-header {
            height: 180px;
        }
    } */

    span{
        position: absolute;
        transform: scaleX(-1);
        transform: scaleX(-1) rotate(180deg) skew(-10deg, 0deg);
        opacity: .03;
        left: 3px;
        bottom: -25px;
        font-size: 32px;
    }

    @media screen and (min-width: breakpoint(sm)){
        span {
            left: 5px;
            bottom: -55px;
            font-size: 55px;
        }
    }

    @media screen and (min-width: breakpoint(md)){
        span {
            font-size: 64px;
        }
    }
    
</style>
<div class="page-header">
    <div class='title-container {sidePage}'>
        <h1>{title}</h1>
        <span>{title}</span>
    </div>
</div>