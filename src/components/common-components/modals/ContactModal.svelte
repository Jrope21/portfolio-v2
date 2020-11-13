<script>
    import { fade, fly } from 'svelte/transition';

	import ModalTemplate from './ModalTemplate.svelte';
    import BoxLoader from '../loaders/BoxLoader.svelte';

    export let showModal;

    let hideModal = false;
    let fieldInputs = [];

    let formState = {
        submittingForm: false,
        formSuccess: false,
        formError: false,
        hideFields: false
    }

    let defaultFormState = formState;

    function resetForm(wait){
        setTimeout(() => {            
            const stateObj = Object.entries(formState);

            for(const [stateKey, stateValue] of stateObj){
                formState[stateKey] = false;
            }

            fieldInputs.forEach((input) => {
                input.value = '';
            })
        }, wait)
    }
    
    async function handleSubmit(e){
        formState.submittingForm = true;
        formState.hideFields = true
        formState.formSuccess = false;
        const formFieldNames = ['name', 'email', 'message']; // TODO - generate field names based on inputs
        const formTextObj = buildFormSubmissionTextObj(e.target, formFieldNames);
        const API_URL = `https://script.google.com/macros/s/AKfycbydbaWHTARcBeJS1auLdnBSNhDZ0yO-SYbGH0AllA/exec`;
        const settings = { 
            method: 'POST',
            body: formTextObj,
        }

        try {
            const response = await fetch(API_URL, settings);
            const data = await response.json();
            formState.submittingForm = false;
            formState.formSuccess = true;

            resetForm(1600);       
        } catch (e) {
            formState.submittingForm = false;
            formState.formError = true;
            console.log('error submitting form', e)
            resetForm(1600);       
        }
    }

    function buildFormSubmissionTextObj(formEventTarget, formFieldNames){
       let formData = new FormData();
       
        formFieldNames.forEach(fieldName => {
           formData.append(`${fieldName}`, `${formEventTarget[fieldName].value}`);
        })

        return formData
    }

</script>

<style lang="scss">
    @import '../../../styles/global.variables.scss';

   .text-container h2{
        font-size: 30rem;
        color: #808080;
    }

    @media screen and (min-width: 64em){
        .text-container h2{
            font-size: 36rem;   
        }
    }
    .text-container h2::after{
        content: '';
        display: block;
        height: 7px;
        margin: 5rem 0px 18rem 0px;
        background: lightgray;
    }

    @media screen and (min-width: 40em){
        h2::after {
            width: 250px;
        }
    }

    p{
        margin: 6rem 0rem 10rem 0rem;
        // font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        font-size: 13rem;
        // color: color(secondary)
    }

    @media screen and (min-width: 64em){
        p {
            font-size: 16rem
        }
    }

    div.form-container{
        box-sizing: border-box;
        color: gray;
        width: 100%;
        border-radius: 4px;
        padding: 15rem 20rem 40rem 20rem;
        /* border: 1px solid gray; */
        box-shadow: 5px 5px 5px color(boxShadow);
    }

    @media screen and (min-width: 40em){
        div.form-container {
            padding: 30rem 20rem 40rem 20rem;
        }
    }

    @media screen and (min-width: 64em){
        div.form-container {
            padding: 40rem 30rem 50rem 30rem;
        }
    }

    div.flex-container{
        display: flex;
        flex-direction: column;
    } 

    @media screen and (min-width: 40em){
        div.flex-container {
            flex-direction: row;
        }
    }

    div.text-container {
        position: relative;

        @media (min-width: breakpoint(sm)) {
            top: -20px;
            padding-right: 30rem;
        }
    }

    div{
        flex: 55%;
    }

    form{
        display: flex;
        flex-direction: column;
        flex: 50%;
        padding-left: auto;
    }
    label{
        display: flex;
        flex-direction: column;
        margin: 4rem 0px;
    }
    span{
        font-size: 13rem;
        margin-bottom: 5rem;
        font-weight: 500;

        @media (min-width: breakpoint(lg)) {
            font-size: 14px;
        }
    }

    input[type="submit"]{
        width: 50%;
        min-width: 96px;
        margin-top: 12rem;
        padding: 6rem;
        font-size: 13rem;
        box-shadow: 1px 1px 3px color(boxShadow);
        font-style: italic;
        background: rgba(88, 89, 91, 0.1);
        // background: color(lightBackground);
        color: color(bodyText);
        font-weight: 700;
        transition: all .3s ease-in;
        cursor: pointer;

        @media (min-width: breakpoint(sm)) {
            max-width: unset;
            padding: 7rem 15rem 7rem 15rem;
        }

        @media (min-width: breakpoint(md)) {
            font-size: 13rem;
            box-shadow: 1;
            width: fit-content;
        }
    }

    input[type="submit"]:hover {
        position: relative;
        transform: translateY(-1px);
        box-shadow: 2px 2px 3px color(boxShadow);
    }

    input, textarea{
        // border: 1px solid lightgray;
        border: 1px solid color(accent);
        border-radius: 2px;
        font-size: 16rem;
        padding: 3rem;
        box-shadow: .3px .3px .3px color(boxShadow);
    }

    .success-message {
        font-size: 50rem;
        color: color(bodyText);
        text-transform: uppercase;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        left: 50%;
    }

    .gform, .text-container, .success-message {
        transition: .35s opacity ease;
    }
    .hide-content{
        opacity: 0;
    }
    
</style>

{#if showModal && hideModal === false}
	<ModalTemplate showModal={showModal} on:click>
        <div class="form-container">
            <div class="flex-container">
                    <div class="text-container {formState.hideFields ? 'hide-content' : ''} {formState.hideFields ? 'hide-content' : ''}">
                        <h2>Get In Touch</h2>
                        <p>
                            Hi there! I’m Josh, 
                            I bring projects to life by innovating across each aspect of the customer journey. 
                            Send me a message if you are looking to hire a developer, collaborate on a project, or have a potential business opportunity.
                        </p>
                    </div>
                    <form 
                        class="gform {formState.hideFields ? 'hide-content' : ''}
                        {formState.formSuccess ? 'hide-content' : ''}"
                        on:submit|preventDefault={handleSubmit}  
                    >
                        <label> <span>Name</span>
                            <input bind:this={fieldInputs[0]} name="name" type="text">
                        </label>
                        <label> <span>Email</span>
                            <input bind:this={fieldInputs[1]} required name="email" type="email">
                        </label>
                        <label> <span>Message</span>
                            <textarea bind:this={fieldInputs[2]} name="message" rows="6" type="textarea"></textarea>
                        </label>
                        <input type="submit" value="Send Message">
                    </form>

                {#if formState.submittingForm}
                    <BoxLoader />
                {/if}
                {#if formState.formSuccess}
                    <h2 class="success-message" 
                        in:fly="{{ y: 20, duration: 500, delay: 200, }}"
                        out:fly="{{ y: -20, duration: 500, delay: 0, }}"
                    >
                        SUCCESS
                    </h2>
                {/if}
                {#if formState.formError}
                    <h2 class="success-message" 
                        in:fly="{{ y: 20, duration: 500, delay: 200, }}"
                        out:fly="{{ y: -20, duration: 500, delay: 0, }}"
                    >
                        ERROR
                    </h2>
                {/if}
            </div>
        </div>
	</ModalTemplate>
{/if}