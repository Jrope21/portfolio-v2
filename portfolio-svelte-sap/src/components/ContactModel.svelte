<script>
	import Modal from './IconComponents/Modal.svelte';
    import ModalForm from './IconComponents/ModalForm.svelte';
	export let showModal;
</script>

<style>
    .container {
        display: flex;

    }
    h2{
        font-size: 30rem;
        color: #808080;
    }
    p{
        font-size: 12rem;
        margin: 6rem 0rem 10rem 0rem;
        color: lightgray;
    }
</style>

{#if showModal}
	<Modal on:click>
    <!-- <h2>Get In Touch</h2>
        <div class="container">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus explicabo similique quidem non minus.</p> -->
            <ModalForm />
        <!-- </div> -->
	</Modal>
{/if}