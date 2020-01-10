<script>
    import { createEventDispatcher } from 'svelte';
    import { fade, fly } from 'svelte/transition';

    export let showModal
    
    const dispatch = createEventDispatcher();
    
</script>

<style lang="scss">
    @import '../../styles/global.variables.scss';

    .modal-container{
        position: fixed;
		top: 0;
		left: 0;
		width: 100%;
        height: 100%;
        z-index: 50;
    }
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
        background: rgba(0,0,0,0.3);
	}

	.container{
		width: 100%;
		height: 100%;
	}

	.modal {
        width: calc(100vw - 4em);
        width: 80%;
		max-width: 650px;
		max-height: 90vh;
		overflow: auto;
		border-radius: 10rem;
        background: white;
		z-index: 50;
		
		@media (min-width: breakpoint(sm)) {
			max-height: 450px;
			max-width: 600px;
			width: 85%;
		}

		@media (min-width: breakpoint(md)) {
			width: 70%;
			max-width: 750px;
		}
    }
    
	button {
		display: block;
    }   
    
</style>

<div class='center-all modal-container {showModal ? 'show-modal' : ''}' in:fade out:fade >
    <div class="modal-background" on:click></div>
	<div class='modal' in:fly="{{ y: -20, duration: 450, delay: 200, }}" out:fly="{{ y: -20, duration: 450 }}">
		<slot name='header'></slot>
		<slot></slot>
	</div>
</div>