<script>

</script>

<style>
    div.form-container::before {
        content: '';
        position:absolute;
        top: 0;
        height: 100%;
        width: 100%;
        background: rgba(34, 34, 34, .1);
        z-index: -1;
    }
    h2, p {
        /* text-align: center; */
    }
    div.form-container{
        box-sizing: border-box;
        color: gray;
        width: 65%;
        max-width: 350px;
        border-radius: 4px;
        padding: 40rem 20rem 60rem 20rem;
        border: 1px solid gray;
        box-shadow: 5px 5px 5px lightgray;
    }
    form{
        display: flex;
        flex-direction: column;
    }
    label{
        display: flex;
        flex-direction: column;
        margin: 7rem 0px;
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
        margin-top: 12rem;
        padding: 8rem;
        box-shadow: .5px 1px 1px gray;
    }

    h2{
        font-size: 30rem;
    }
    p{
        font-size: 12rem;
        margin: 6rem 0rem 10rem 0rem;
        color: lightgray;
    }
    div.contact-row{
        display: flex;
        justify-content: space-between;
    }
</style>
<div class="form-container">
    <h2>Get In Touch</h2>
    <!-- <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, dignissimos. Consectetur adipisicing elit. Distinctio, dignissimos.</p> -->
    <form action="mailto:joshua.micah.roper@gmail.com" method="post">
        <div class="contact-row">
            <label> <span>First Name</span>
                <input type="text">
            </label>
            <label> <span>Last Name</span>
                <input type="text">
            </label>
        </div>
        <label> <span>Phone Number</span>
            <input type="text">
        </label>
        <label> <span>Email</span>
            <input type="text">
        </label>
        <label> <span>Subject</span>
            <input type="text">
        </label>
        <input type="submit" value="Send Message">
    </form>
</div>