<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
        background: rgba(0,0,0,0.3);
		z-index: 50;
		animation: .5s ease-in 0s 1 fadeIn forwards;
	}

	.container{
		width: 100%;
		height: 100%;

	}

	.modal {
		position: fixed;
		/* left: 50%;
		top: 50%; */
        width: calc(100vw - 4em);
        width: 80%;
		max-width: 650px;
		max-height: 90vh;
		overflow: auto;
		transform: translate(-50%,-50%);
		/* padding: 1em; */
		border-radius: 10rem;
        background: white;
        z-index: 50;
		animation: .7s ease-in 0s 1 fadeInTop forwards; 
	}
	@media screen and (min-width: 40em){
		.modal {
			max-height: 450px;
			width: 70%;
		}
	}
	button {
		display: block;
	}
</style>
<!-- on:click='{() => dispatch("close")}' -->
<div class='modal-background center-all' on:click>
<!-- <div class="container "> -->
	<div class='modal'>
		<slot name='header'></slot>
		<slot></slot>
	</div>
<!-- </div> -->
</div>