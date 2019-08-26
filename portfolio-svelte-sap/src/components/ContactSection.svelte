<script>

</script>

<style>
    h2, p {
        text-align: center;
    }
    div{
        color: gray;
        width: 60%;
    }
    form{
        display: flex;
        flex-direction: column;
    }
    label{
        display: flex;
        flex-direction: column;
        margin: 5rem 0px;
    }
    span{
        font-size: 10rem;
        margin-bottom: 5rem;
    }
    input, textarea{
        border: 1px solid gray;
        border-radius: 5px;
        font-size: 10rem;
        padding: 5rem;
    }
    h2{
        font-size: 20rem;
    }
    p{
        font-size: 10rem;
        color: lightgray;
    }
</style>
<div>
    <h2>Get In Touch</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, dignissimos.</p>
    <form action="mailto:joshua.micah.roper@gmail.com" method="post">
        <label> <span>Name</span>
            <input type="text">
        </label>
        <label> <span>Email</span>
            <input type="text">
        </label>
        <label> <span>Message</span>
            <textarea rows="6" type="textarea"> </textarea>
        </label>
    </form>
</div>