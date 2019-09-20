<script>

</script>

<style>
    /* div.form-container::before {
        content: '';
        position:absolute;
        top: 0;
        height: 100%;
        width: 100%;
        background: rgba(34, 34, 34, .1);
        z-index: -1;
    } */
   h2{
        font-size: 30rem;
        color: #808080;
        
    }
    h2::after{
        content: '';
        display: block;
        /* width: 250px; */
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
        /* max-width: 350px; */
        border-radius: 4px;
        padding: 15rem 20rem 40rem 20rem;
        border: 1px solid gray;
        box-shadow: 5px 5px 5px lightgray;
        /* display: flex; */
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
        /* align-items: center; */
    }
    label{
        display: flex;
        flex-direction: column;
        margin: 4rem 0px;
         /* width: 80%; */
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

<div class="form-container">
    
    <div class="flex-container">
        <div class="text-container">
        <h2>Get In Touch</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Necessitatibus suscipit quibusdam eligendi alias a, cum sit autem quas.
         Quibusdam minima architecto quam voluptatem. Necessitatibus, quisquam?</p>
        </div>
        <form action="mailto:joshua.micah.roper@gmail.com" method="post">
            <!-- <div class="contact-row"> -->
                <label> <span>Name</span>
                    <input type="text">
                </label>
                <!-- <label> <span>Last Name</span>
                    <input type="text">
                </label> -->
            <!-- </div> -->
            <label> <span>Email</span>
                <input type="text">
            </label>
            <label> <span>Message</span>
                <textarea rows="6" type="textarea"> </textarea>
            </label>
            <input type="submit" value="Send Message">
        </form>
    </div>
</div>