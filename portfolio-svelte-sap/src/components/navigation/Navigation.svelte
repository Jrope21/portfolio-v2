<script>
import Hamburger from './Hamburger.svelte';
import { onMount } from 'svelte';


let toggle;

function togglerOff(){
    toggle = true;
    console.log(toggle)
}

onMount(()=>{
    
    
    // ;
    
})

</script>

<style>

header {
    border-bottom: 1px solid #d6d6d6;
    position: fixed;
    width: 100%;
    top: 0;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rem 20rem;
}

ul.navigation {
    box-sizing: border-box;
    background: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
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

@media screen and (min-width: 75em) {
    ul.navigation{
        display: flex;
    }
}

li{
    text-align: right;
    padding: 5rem 0rem;
}

.close-container {
    position: absolute;
    top: 50rem;
    right: 50rem;
}

.close {
    /* display: flex; */
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
                <span class="code">&lt;h1&gt;</span> <span class="code">&lt;/h1&gt;</span>
            </p>
        </div>
        <Hamburger toggle={toggle} />
        <ul class="navigation">
            <li class="close-container" on:click={togglerOff} ><span class="close"></span></li>
            <li><a href="">Home</a></li>
            <li><a href="">About</a></li>
            <li><a href="">Contact</a></li>
        </ul>
    </nav>
</header>