<script>
import NavItem from './NavItem.svelte';
import HamburgerIcon from './NavComponents/HamburgerIcon.svelte';
import ContactModal from './ContactModel.svelte';
import { onMount } from 'svelte';
export let segment;
let showPop;
let showModal;
//let showModal;
let navItems = [
    {
        name: 'about',
        url: 'about'
    },
    {
        name: 'portfolio',
        url: 'portfolio',
        rel: 'rel=prefetch'
    },
    {
        name: 'contact',
        // url: 'contact',
        modal: true,
    }
]
</script> 
<style>
aside {
    position: fixed;
    bottom: 0;
    right: 0;
    height: 100vh;
    display: flex;
    align-items: flex-end;
    z-index: 2;
}

nav {
    transform: rotate(90deg);
    height: 125px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin: 0rem 24px 0rem 0rem; 
}

@media screen and (min-width: 40em) {
    aside {
        position: absolute;
        top: 0;
        bottom: unset;
        height: 100px;
    }
    nav {
        transform: rotate(0deg);
    }
}

ul {
    position: absolute;
    display: flex;
    margin-top: 11px; 
}

ul li {
    position: relative;
    list-style-type: none;
    display: flex;
    align-items: center;
    opacity: 0;
    bottom: 15px;
    transition: all .7s ease;
}
 .hamburger-check:checked ~ ul li:nth-child(3) { transition-delay: .25s }
 .hamburger-check:checked ~ ul li:nth-child(3) span { transition-delay: .05s }
 .hamburger-check:checked ~ ul li:nth-child(2) { transition-delay: .5s }
 .hamburger-check:checked ~ ul li:nth-child(3) span { transition-delay: .3s }
 .hamburger-check:checked ~ ul li:nth-child(1) { transition-delay: .75s }
 .hamburger-check:checked ~ ul li:nth-child(1) span { transition-delay: .55s }

span.nav-seperator{
    display: inline-block;
    border-bottom: 1px solid gray;
    width: 20px;
    margin: 8px;
    opacity: 0;
}
.hamburger-check:checked ~ ul li {
    opacity: 1;
    bottom: 0px
}
.hamburger-check:checked ~ ul li span{
    opacity: 1;
}

li:hover {
    height: 150px;
}

@media screen and (min-width: 40em){
        span.nav-seperator {
            border: none;
        }
    }
</style>
<aside>
    <nav>
        <HamburgerIcon />
        <ul>
            {#each navItems as navItem}
                <li class="align-center" >
                     <NavItem 
                        on:click={() => {showModal = true}}
                        {segment} 
                        modal={navItem.modal} 
                        rel={navItem.rel}
                        name={navItem.name}
                        url={navItem.url}
                    />
                        <span class="nav-seperator"/>
                </li>
            {/each}
        </ul>
      
    </nav>
</aside>

<ContactModal on:click='{() => showModal = false}' showModal={showModal}/>