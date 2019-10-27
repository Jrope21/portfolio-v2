<script>

</script>

<style>

    div {
        display: flex;
        flex-direction: column;
    }
    
    @media screen and (min-width: 40em){
        div{
            flex-direction: row;
        }
    }

    p:nth-child(1){
        width: fit-content;
        margin-bottom: 15rem;
        width: 100%
    }

    @media screen and (min-width: 40em){
        p:nth-child(1) {
            width: 20%;
        }
    }

    h3{
        width: fit-content;
        margin-bottom: 15rem;
        width: 100%;
        text-transform: uppercase;
    }

    @media screen and (min-width: 40em){
       h3 {
            width: 15%;
        }
    }

    p:nth-child(2){
        width: 100%;
    }

    @media screen and (min-width: 40em){
        p:nth-child(2) {
            width: 50%;
        }
    }

    p {
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        font-size: 13rem;
        color: #58595b;
    }

</style>

<div>
    <h3>
        About Me
    </h3>
    <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
         Ex molestias aut vero rerum fuga fugiat veritatis quibusdam,
          cupiditate laborum? Velit.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
           a nemo perferendis sit nulla optio recusandae earum laudantium 
           commodi architecto!
    </p>
</div>