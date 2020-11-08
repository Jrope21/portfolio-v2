<script>
import Hamburger from './Hamburger.svelte';
import ContactModal from '../../common-components/modals/ContactModal.svelte';
import Logo from './Logo.svelte';
import TextAnimation from '../../common-components/TextAnimation.svelte';

import { onMount } from 'svelte';

export let segment;

let showModal;

let windowY;
let hamburger;
let toggle = false;

let reduceNavSize = false;

let activeNavigation = {
    home: false,
    about: false,
    experience: false
}

$: headerClass = navSize(windowY);

function navSize(y){
    if(y > 75){
        reduceNavSize = true;
    } else {
        reduceNavSize = false;
    }
}

function togglerOff(){
    if(window.innerWidth < 1023){
        // toggle = true;
        document.getElementById('toggle').click();
        // hamburger ? hamburger.$$.ctx.hamburger.click() : null;
    }
}

function resetActiveNav() {
    let activeNavObj = Object.entries(activeNavigation);
    
    for(let [key, value] of activeNavObj){
        activeNavigation[key] = false;
    }
}

// TODO -- these functions need to be cleaned up - not using all of this anymore (using segment prop instead)

function setActiveNavOnClick() {
    
    let activeNavObj = Object.entries(activeNavigation);
    let elText = `${this.innerHTML.toLowerCase()}`;
    
    for(let [key, value] of activeNavObj){
        if(key === elText){
            activeNavigation[key] = true;
        } else {
            activeNavigation[key] = false;
        }
    }
    togglerOff();
}

function setActiveNav() {
    let path = window.location.pathname;

    if(path === '/') activeNavigation.home = true;
    else if (path === '/about') activeNavigation.about = true;
    else if (path === '/experience') activeNavigation.experience = true;
}

function openModal(){
    showModal = true;
}

onMount(() => {
    setActiveNav();
})

</script>

<style lang="scss">
    @import '../../../styles/global.variables.scss';

    header {
        border-bottom: 1px solid #d6d6d6;
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 50;
        background: white;
    }

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30rem 20rem;
        transition: padding .3s cubic-bezier(0.85, 0.08, 0.08, 0.99);

        @media (min-width: breakpoint(sm)) {
            padding: 35rem 40rem;
        }
    }

    nav.scrolled {
        padding: 20rem 20rem;

        @media (min-width: breakpoint(sm)) {
            padding: 20rem 40rem;
        }
    }

    .navigation {
        box-sizing: border-box;
        background: white;
        display: flex;
        justify-content: center;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        position: fixed;
        z-index: 2;
        min-width: 250px;
        width: 85%;
        max-width: 280px;
        right: 0;
        transform: translateX(100%);
        bottom: 0;
        height: 100%;
        padding: 35rem 20rem;
        transition: transform .45s $custom_animation;

        @media (min-width: breakpoint(sm)) {
            padding: 0rem 40rem;
        }

        @media (min-width: breakpoint(md)) {
            transition: none;
            transform: unset;   
            position: relative;
            max-width: unset;
            min-width: unset;
            // display: flex;
            // flex-direction: row;
            width: unset;
            padding: 0;
        }
    }

    :global(#toggle:checked ~ .navigation){
        display: flex;
        transform: translateX(0);
    }

    .navigation-list {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: flex-end;
        // padding: 0;

        @media (min-width: breakpoint(md)) {
            flex-direction: row;
        }
    }

    li {
        position: relative;
        text-align: right;
        margin: 5rem 0rem;
        width: auto;
        overflow-x: hidden;
        font-size: 14rem;

        @media (min-width: breakpoint(md)) {
            font-size: 16rem;
            margin: 0rem 20rem;
            padding: 2.5rem 0;

            &:last-of-type {
                margin-right: 0;
            }
        }
    }

    @media screen and (min-width: breakpoint(md)){       
        p{
            font-size: 18rem;
        }
    }

    li:not(.close-container)::after, .active::after {
        content: '';
        position: absolute;
        left: 0;
        transform: translateX(100%);
        bottom: 0;
        width: 100%;
        opacity: 1;
        border-bottom: 2px solid #3B3B3B;
        transition: transform .3s $custom_animation;
    }

    li:not(.close-container):hover::after, .active::after {
        transform: translateX(0);
    }

    .selected::after {
        transform: translateX(0) !important;
    }

    .modal-active .selected:not(.open-modal)::after {
        transform: translateX(100%) !important; 
    }

    .close-container {
        position: absolute;
        top: 50rem;
        right: 50rem;
        overflow: unset;
        cursor: pointer;

        @media (min-width: breakpoint(sm)) {
            right: 70rem;
        }

        @media (min-width: breakpoint(md)) {
            display: none;
        }
    }

    .close {
        width:32px;
        height:32px;
        position: relative;
        align-items: center;
        justify-content: center;
    }

    .close::before {
        content: '';
        display: block;
        position: absolute;
        border-bottom: 2px solid black;
        width: 32px;
        transform: rotate(45deg);
    }

    .close::after {
        content: '';
        display: block;
        position: absolute;
        border-bottom: 2px solid black;
        width: 32px;
        transform: rotate(-45deg);
    }

    a:not(.logo) {
        display: block;
        padding: 5rem 0rem;
        text-transform: uppercase;
    }

    p{
        font-weight: 700;
        font-style: italic;
    }
    .code {
        font-weight: 100;
        font-style: normal;
        opacity: .3;
    }

    .logo:hover .logo-hover {
        color: black;
    }

    .background {
      background: rgba(0, 0, 0, 0.319);
      opacity: 0;
      width: 100vw;
      height: 100vh;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1;
      transition: opacity .15s ease-in, visibility .15s linear;
      visibility: hidden;
    //   animation: .01s ease-in .35s 1 leaveScreen forwards;

      @media (min-width: breakpoint(md)) {
        display: none;
      }
    }

    :global(#toggle:checked ~ .background) {
      opacity: 1;
      animation: unset;
      transition: opacity .25s ease-in;
      visibility: visible;
    }

    .text-cta {
        text-align: end;
        margin-bottom: 10px
    }

    .text-cta a {
        font-size: 14rem;
        text-transform: none;
    }

    .text-cta .title {
        font-weight: 100;
        font-size: 12rem;
        text-transform: none;
    }

</style>

<svelte:window bind:scrollY={windowY}/>

<header>
    <nav class={reduceNavSize ? 'scrolled container' : 'container'}>
        <a href='/' on:click={() => {resetActiveNav(); activeNavigation.home = true;}} class="logo">
            <!-- <Logo /> -->
            <p>
                <span class="code">&lt;h1&gt;</span>Hi There<span class="logo-hover">!</span><span class="code">&lt;/h1&gt;</span>
            </p>
        </a>
        <Hamburger toggle={toggle} bind:this={hamburger} />
        <div class="background" on:click={togglerOff}></div>
        <div class="navigation">
            <div class="mobile-top">
                <div on:click={togglerOff} class="close-container">
                    <span class="close"></span>
                </div>
            </div>

            <ul class="navigation-list {showModal ? 'modal-active' : ''}">
                <!-- <li class="close-container" on:click={togglerOff} ><span class="close"></span></li> -->
                <li class="{segment === undefined ? 'selected' : ''}"><a on:click={setActiveNavOnClick} rel=prefetch href="/">Home</a></li>
                <li class="{segment === 'about' ? 'selected' : ''}"><a on:click={setActiveNavOnClick} rel=prefetch href="/about">About</a></li>
                <li class="{segment === 'experience' ? 'selected' : ''}"><a on:click={setActiveNavOnClick} rel=prefetch href="/experience">Experience</a></li>
                <li class="{segment === 'works' ? 'selected' : ''}"><a on:click={setActiveNavOnClick} rel=prefetch href="/works">Works</a></li>
                <li class="{showModal ? 'selected' : ''} open-modal"><a on:click={openModal} href="javascript:void(0)">Contact</a></li>
            </ul>

            <div class="mobile-bottom">
                <div class="text-cta">
                    <p class="title">
                        Get In Touch!
                    </p>
                    <a href="mailto:joshua.micah.roper@gmail.com">
                        Joshua.micah.roper@gmail.com
                        <!-- <TextAnimation text={`Joshua.micah.roper@gmail.com`} /> -->
                    </a>
                </div>
                <div class="text-cta">
                    <p class="title">
                        View Resume
                    </p>
                    <a href="./pdfs/resume-joshua-roper.pdf" download>
                        Download PDF
                        <!-- <TextAnimation text={`Download PDF`} /> -->
                    </a>
                </div>
            </div>
            
        </div>
        
    </nav>
</header>

<ContactModal on:click={() => showModal = false} showModal={showModal}/>