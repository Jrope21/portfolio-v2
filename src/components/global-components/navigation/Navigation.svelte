<script>
import Hamburger from './Hamburger.svelte';
import ContactModal from '../../common-components/modals/ContactModal.svelte';
import Logo from './Logo.svelte';
import TextAnimation from '../../common-components/TextAnimation.svelte';

import { onMount } from 'svelte';

import { draw, fade, blur, slide, scale, fly } from 'svelte/transition';
import { quintOut, quartInOut } from 'svelte/easing';

export let segment, loadComponents;

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
        // padding: 30rem 20rem;
        padding: 13.5rem 20rem;
        transition: padding .3s cubic-bezier(0.85, 0.08, 0.08, 0.99);

        @media (min-width: breakpoint(sm)) {
            padding: 35rem 40rem;
        }
    }

    nav.scrolled {
        // padding: 20rem 20rem;
        padding: 3.5rem 20rem;

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
        max-width: 300px;
        right: 0;
        transform: translateX(100%);
        bottom: 0;
        min-height: 500px;
        overflow-y: scroll;
        height: 100%;
        padding: 45rem 30rem;
        transition: transform .45s $custom_animation;

        @media (min-width: breakpoint(sm)) {
            padding: 80rem 40rem;
        }

        @media (min-width: breakpoint(md)) {
            // overflow-y: auto;
            min-height: unset;
            transition: none;
            transform: unset;   
            position: relative;
            max-width: unset;
            min-width: unset;
            width: unset;
            padding: 0;
            overflow-y: visible;
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
        padding: 5rem 6rem;
        width: auto;
        overflow-x: hidden;
        font-size: 16rem;
        font-weight: 700;

        @media (min-width: breakpoint(md)) {
            font-size: 16rem;
            margin: 0rem 14rem;
            padding: 10rem 6rem;
            font-weight: 500;
            // vo

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

    .nav-item::after, .selected .nav-item::after {
        content: '';
        position: absolute;
        left: 0;
        transform: translate(100%, -50%);
        top: 50%;
        width: calc(100% + 12px);
        margin-left: -10%;
        opacity: 1;
        height: 8px;
        background: #c0bdbd;
        z-index: -1;
        opacity: .5;
        transition: transform .45s $custom_animation;

        @media (min-width: breakpoint(md)) {
            background: #797777;
            top: 90%;
            height: 6px;
        }
    }

    li:hover .nav-item::after, .selected .nav-item::after {
        transform: translate(0, -50%);
    }

    .modal-active .selected:not(.open-modal) .nav-item::after {
        transform: translate(100%, -50%) !important; 
    }

    .close-container {
        cursor: pointer;
        width: 32px;
        height: 32px;

        @media (min-width: breakpoint(md)) {
            display: none;
        }
    }

    .close {
        display: block;
        width:32px;
        height:32px;
        position: relative;
    }

    .close::before {
        content: '';
        display: block;
        position: absolute;
        border-bottom: 1px solid black;
        width: 26px;
        top: 16px;
        right: 0;
        transform: rotate(45deg);
    }

    .close::after {
        content: '';
        display: block;
        position: absolute;
        border-bottom: 1px solid black;
        width: 26px;
        top: 16px;
        right: 0;
        transform: rotate(-45deg);
    }

    .nav-item {
        // position: relative;
        display: inline;
        // padding: 5rem 0rem;
        padding: 0;
        text-transform: uppercase;
    }

    .logo-text {
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
        margin-bottom: 15px;
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

    

    .mobile-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .mobile-top, .mobile-bottom {

        @media (min-width: breakpoint(md)) {
            display: none;
        }
    }

    .social-icons {
        display: flex;
        justify-content: flex-end
    }

    i {
        font-size: 16px;
        margin-right:12px;
        color: #5A5A5A;
        transition: all .3s ease;
    }

    .social-icon:last-of-type i {
        margin-right: 0;
    }

    .social-icon:hover > i {
        transform: translateY(-3px);
    }

</style>

<svelte:window bind:scrollY={windowY}/>

<header>
    <nav class={reduceNavSize ? 'scrolled container' : 'container'}>
        {#if loadComponents}
            <a href='/' on:click={() => {resetActiveNav(); activeNavigation.home = true;}} class="logo">
                <!-- <Logo 
                    isBoxVisible={reduceNavSize ? true : false}
                /> -->
                <Logo />
                <!-- <img width="25" src="images/logo.svg" alt=""> -->
                
                <!-- <p class="logo-text">
                    <span class="code">&lt;h1&gt;</span>Hi There<span class="logo-hover">!</span><span class="code">&lt;/h1&gt;</span>
                </p> -->
            </a>
            <Hamburger toggle={toggle} bind:this={hamburger} />
            <div class="background" on:click={togglerOff}></div>
            <div class="navigation">
                <div class="mobile-top">
                    <Logo 
                        isBoxVisible={true}
                    />
                    <div on:click={togglerOff} class="close-container">
                        <span class="close"></span>
                    </div>
                </div>
                
                <ul class="navigation-list {showModal ? 'modal-active' : ''}">
                    <li 
                        in:fly="{{ y: -15, duration: 500, delay: 100, }}"
                        class="{segment === undefined ? 'selected' : ''}"
                    >
                        <a class="nav-item" on:click={setActiveNavOnClick} rel=prefetch href="/">Home</a>
                    </li>
                    <li 
                        in:fly="{{ y: -15, duration: 500, delay: 200, }}"
                        class="{segment === 'about' ? 'selected' : ''}"
                    >
                        <a class="nav-item" on:click={setActiveNavOnClick} rel=prefetch href="/about">About</a>
                    </li>
                    <li 
                        in:fly="{{ y: -15, duration: 500, delay: 300, }}"
                        class="{segment === 'projects' ? 'selected' : ''}"
                    >
                        <a class="nav-item" on:click={setActiveNavOnClick} rel=prefetch href="/projects">Projects</a>
                    </li>
                    <li 
                        in:fly="{{ y: -15, duration: 500, delay: 400, }}"
                        class="{segment === 'experience' ? 'selected' : ''}"
                    >
                        <a class="nav-item" on:click={setActiveNavOnClick} rel=prefetch href="/experience">Experience</a>
                    </li>
                    <li 
                        in:fly="{{ y: -15, duration: 500, delay: 500, }}"
                        class="{showModal ? 'selected' : ''} open-modal"
                    >
                        <a class="nav-item" on:click={openModal} href="javascript:void(0)">Contact</a>
                    </li>
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

                    <div class="social-icons">
                        <a class="social-icon" href="https://www.github.com/Jrope21" aria-label="link to Joshua Roper's GitHub account" target="_blank" rel="noopener" >
                            <i class="fab fa-github"></i>
                        </a>
                        <a class="social-icon" href="https://www.linkedin.com/in/JR-dev" aria-label="link to Joshua Roper's LinkedIn account" target="_blank" rel="noopener" >
                            <i class="fab fa-linkedin"></i>
                        </a>
                        <a class="social-icon" href="mailto:joshua.micah.roper@gmail.com" aria-label="link to send Joshua Roper an email" >
                            <i class="fas fa-envelope"></i>
                        </a>
                    </div>
                </div>
                
            </div>
          {/if}
    </nav>
</header>

<ContactModal on:click={() => showModal = false} showModal={showModal}/>