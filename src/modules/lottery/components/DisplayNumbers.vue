<template>
<div class="display-numbers">
    <div class="display-number" v-for="number of numbers" :key="number">
        {{number}}
    </div>
</div>
  
</template>

<script>
export default {   
    props:{
        numbers:Array
    }  

}
</script>

<style lang="scss" scoped>
    .display-numbers{          
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }
    .display-number{
        width: 11rem;
        height: 11rem;        
        border-radius: 50%;
        font-size: 6rem;
        font-family: RobotoLight;
        color:var(--info-color);
        background-image: radial-gradient(#fff,#cfcdcd);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        
    }

    @media screen and (max-width: 1300px) {
        .display-number{
            width: 8em;
            height: 1.8em;  
            font-size: 4em;
        }
    }

</style>