<script>
import { onMount } from 'svelte';

    let hamburgerCheck;
    onMount(()=>{
        if(window.innerWidth > 640)
        hamburgerCheck.checked = true
    })
</script>
<style>
input {
    display: none;
}

label {
     position: absolute;
     left: 10px;
     bottom: 33px;
     transform: rotate(45deg);
     border: 1px solid #00E2FF;
     border-radius: 2px;
     height: 25px;
     width: 25px;
     display: flex;
     align-items: center;
     justify-content: center;
     transition: all .9s ease;
}

.hamburger-check:checked ~ label {
     transform: rotate(135deg)
}

span.hamburger-lines{
    display: absolute;
    height: 15px;
    border-right: 1px solid #00E2FF;
    transition: all 1s ease-in-out;
    -webkit-transition: all 1s ease;
    transform: rotate(0deg);
    /* background: #00E2FF; */
}

span.hamburger-lines::before{
    content: '';
    border-right: 1px solid #00E2FF;
    position: absolute;
    height: 15px;
    right: 5px;
    -webkit-transition: all 1s ease;
}
span.hamburger-lines::after{
    content: '';
    border-right: 1px solid #00E2FF;
    position: absolute;
    height: 15px;
    left: 6px;
    -webkit-transition: all 1s ease;
}

.hamburger-check:checked ~ label span.hamburger-lines{
    transform: rotate(45deg);
    /* border: none; */
}
.hamburger-check:checked ~ label span.hamburger-lines::before {
    transform: rotate(25deg);
    height: 0px;
    /* right: 0px; */
}
.hamburger-check:checked ~ label span.hamburger-lines::after {
    transform: rotate(-25deg);
    height: 0px;
 /* left: 0px; */
}
</style>

<input class="hide-for-medium hamburger-check" id="hamburger" name="hamburger" type="checkbox" bind:this={hamburgerCheck}>
<label class="hide-for-medium center-all" for="hamburger">
    <span class="hamburger-lines"/>
</label>