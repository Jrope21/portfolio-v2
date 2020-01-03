<script>
import Hamburger from './Hamburger.svelte';
import ContactModal from '../modals/ContactModal.svelte';

import { onMount } from 'svelte';

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
        hamburger ? hamburger.$$.ctx.hamburger.click() : null;
    }
}

function resetActiveNav() {
    let activeNavObj = Object.entries(activeNavigation);
    
    for(let [key, value] of activeNavObj){
        activeNavigation[key] = false;
    }
}

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

<style>

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
    transition: all .45s cubic-bezier(0.85, 0.08, 0.08, 0.99);
}

nav.scrolled {
    padding: 20rem 20rem;
}

@media screen and (min-width: 40em) {
    nav {
        padding: 35rem 40rem;
    }
    nav.scrolled {
        padding: 20rem 40rem;
    }
}

ul.navigation {
    box-sizing: border-box;
    background: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    position: fixed;
    z-index: 2;
    width: 250px;
    right: 0;
    transform: translateX(100%);
    bottom: 0;
    height: 100%;
    padding: 0rem 20rem;
    transition: transform 1s cubic-bezier(0.85, 0.08, 0.08, 0.99);
}

#toggle:checked ~ ul.navigation{
    display: flex;
    transform: translateX(0);
}

@media screen and (min-width: 40em) {
    ul.navigation {
        padding: 0rem 40rem;
    }
}

@media screen and (min-width: 64em) {
    ul.navigation{
        transform: unset;   
        position: relative;
        display: flex;
        flex-direction: row;
        width: unset;
        padding: 0;
    }
}

li {
    position: relative;
    text-align: right;
    margin: 5rem 0rem;
    width: auto;
    overflow-x: hidden;
    font-size: 14rem;
}

@media screen and (min-width: 64em){
    li {
        font-size: 16rem;
        margin: 0rem 20rem;
        padding: 2.5rem 0;
    }
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
    transition: transform .45s cubic-bezier(0.85, 0.08, 0.08, 0.99);
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
}

@media screen and (min-width: 40em){
    .close-container {
        right: 70rem;
    }
}

@media screen and (min-width: 64em){
    .close-container {
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

.logo-hover {
    transition: all .3s ease-in;
}

.logo:hover .logo-hover {
    color: black;
}

</style>

<svelte:window bind:scrollY={windowY}/>

<header>
    <nav class={reduceNavSize ? 'scrolled container' : 'container'}>
        <a href='/' on:click={() => {resetActiveNav(); activeNavigation.home = true;}} class="logo">
            <p>
                <span class="code">&lt;h1&gt;</span>Hi There<span class="logo-hover">!</span><span class="code">&lt;/h1&gt;</span>
            </p>
        </a>
        <Hamburger on:click={togglerOff} toggle={toggle} bind:this={hamburger} />
        <ul class="navigation {showModal ? 'modal-active' : ''}">
            <li class="close-container" on:click={togglerOff} ><span class="close"></span></li>
            <li class="{activeNavigation.home ? 'selected' : ''}"><a on:click={setActiveNavOnClick} rel=prefetch href="/">Home</a></li>
            <li class="{activeNavigation.about ? 'selected' : ''}"><a on:click={setActiveNavOnClick} rel=prefetch href="/about">About</a></li>
            <li class="{activeNavigation.experience ? 'selected' : ''}"><a on:click={setActiveNavOnClick} href="/experience">Experience</a></li>
            <li class="{showModal ? 'selected' : ''} open-modal"><a on:click={openModal} href="javascript:void(0)">Contact</a></li>
        </ul>
    </nav>
</header>

<ContactModal on:click={() => showModal = false} showModal={showModal}/>