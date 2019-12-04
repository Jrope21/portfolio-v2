<script>

	import ModalTemplate from './ModalTemplate.svelte';

    export let showModal;
    
    async function handleSubmit(e){
        const formFieldNames = ['name', 'email', 'message']; // TODO - generate field names based on inputs
        const formTextObj = buildFormSubmissionTextObj(e.target, formFieldNames);

        const API_URL = `https://script.google.com/macros/s/AKfycbyfIRXEeqnLPVq4s2hG_b35lmcm2FCn768QWC9Wfg/exec`;
        const settings = { 
            method: 'POST',
            body: formTextObj,
        }

        try {
            const response = await fetch(API_URL, settings);
            const data = await response.json();
        } catch (e) {
            console.log('error in subission', e)
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

<style>

   h2{
        font-size: 30rem;
        color: #808080;
        
    }
    h2::after{
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
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        font-size: 13rem;
        color: #58595b
    }

    div.form-container{
        box-sizing: border-box;
        color: gray;
        width: 100%;
        border-radius: 4px;
        padding: 15rem 20rem 40rem 20rem;
        border: 1px solid gray;
        box-shadow: 5px 5px 5px lightgray;
    }

    @media screen and (min-width: 40em){
        div.form-container {
            padding: 30rem 20rem 40rem 20rem;
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
    }

    @media screen and (min-width: 40em){
        div.text-container {
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
        font-size: 11rem;
        margin-bottom: 5rem;
    }
    input, textarea{
        border: 1px solid gray;
        border-radius: 2px;
        font-size: 10rem;
        padding: 7rem;
        box-shadow: .3px .3px .3px gray;
    }

    input[type="submit"]{
        width: 50%;
        margin-top: 12rem;
        padding: 6rem;
        box-shadow: .5px 1px 1px gray;
        color: #d3d3d3;
        background: #58595b;
        min-width: fit-content;
    }

    @media screen and (min-width: 40em){
        input[type="submit"]{
            width: 35%;
        }
    }

    div.contact-row{
        display: flex;
        justify-content: space-between;
    }
    input, textarea{
        border: 1px solid lightgray;
        border-radius: 2px;
        font-size: 10rem;
        padding: 3rem;
        box-shadow: .3px .3px .3px gray;
       
    }
</style>

{#if showModal}
	<ModalTemplate showModal={showModal} on:click>
        <div class="form-container">
            <div class="flex-container">
                <div class="text-container">
                    <h2>Get In Touch</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    Necessitatibus suscipit quibusdam eligendi alias a, cum sit autem quas.
                    Quibusdam minima architecto quam voluptatem. Necessitatibus, quisquam?</p>
                </div>
                <form class="gform" on:submit|preventDefault={handleSubmit}>
                        <label> <span>Name</span>
                            <input name="name" type="text">
                        </label>
                    <label> <span>Email</span>
                        <input name="email" type="text">
                    </label>
                    <label> <span>Message</span>
                        <textarea name="message" rows="6" type="textarea"> </textarea>
                    </label>
                    <input type="submit" value="Send Message">
                </form>
            </div>
        </div>
	</ModalTemplate>
{/if}