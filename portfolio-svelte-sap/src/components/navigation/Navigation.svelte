<script>
import Hamburger from './Hamburger.svelte';
import { onMount } from 'svelte';

let hamburger;
let toggle = false;

function togglerOff(){
    hamburger ? hamburger.$$.ctx.hamburger.click() : null;
}

</script>

<style>

header {
    border-bottom: 1px solid #d6d6d6;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40rem 20rem;
    background: white;
}

@media screen and (min-width: 40em) {
    nav {
        padding: 40rem 40rem;
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
    transition: transform 1s cubic-bezier(0.85, 0.08, 0.08, 0.99)
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
    padding: 5rem 0rem;
    width: auto;
    overflow-x: hidden;
}

@media screen and (min-width: 64em){
    li {
        margin: 0rem 15rem;
    }
}

li:not(.close-container)::after {
    content: '';
    position: absolute;
    left: 0;
    transform: translateX(100%);
    bottom: 0;
    width: 100%;
    border-bottom: 3px solid black;
    transition: transform .45s cubic-bezier(0.85, 0.08, 0.08, 0.99);
}

li:not(.close-container):hover::after {
    transform: translateX(0);
}

.close-container {
    position: absolute;
    top: 50rem;
    right: 50rem;
    overflow: unset;
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

a {
    display: block;
    padding: 5rem 0rem;
    text-transform: uppercase;
}

</style>

<header>
    <nav class="container">
        <div class="logo">
            <p>
                <span class="code">&lt;h1&gt;</span>Hi There!<span class="code">&lt;/h1&gt;</span>
            </p>
        </div>
        <Hamburger toggle={toggle} bind:this={hamburger} />
        <ul class="navigation">
            <li class="close-container" on:click={togglerOff} ><span class="close"></span></li>
            <li><a href="">Home</a></li>
            <li><a href="">About</a></li>
            <li><a href="">Contact</a></li>
        </ul>
    </nav>
</header>