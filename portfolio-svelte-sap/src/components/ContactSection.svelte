<script>

</script>

<style>
    h2, p {
        text-align: center;
    }
    div.form-container{
        color: gray;
        width: 65%;
        max-width: 350px;
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
        width: 100%;
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
</style>
<div class="form-container">
    <h2>Contact Me</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, dignissimos. Consectetur adipisicing elit. Distinctio, dignissimos.</p>
    <form action="mailto:joshua.micah.roper@gmail.com" method="post">
    <div>
        <label> <span>Name</span>
            <input type="text">
        </label>
        <label> <span>Email</span>
            <input type="text">
        </label>
        <label> <span>Message</span>
            <textarea rows="10" type="textarea"> </textarea>
        </label>
        <input type="submit" value="Send Message">
    </form>
</div>