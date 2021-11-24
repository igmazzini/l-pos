<template>
<div class="display-numbers">
    <div class="display-number" v-for="number of numbers" :key="number">
        {{number}}
    </div>
</div>
  
</template>

<script>
export default {
    name:'DisplayNumberComponent',
    props:{
        numbers:Array
    }  

}
</script>

<style lang="scss" scoped>
    .display-numbers{          
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .display-number{
        width: 10.5rem;
        height: 10.5rem;
        margin-left: 10px;
        border-radius: 50%;
        font-size: 4.9rem;
        font-family: RobotoLight;
        color:var(--info-color);
        background-image: radial-gradient(#fff,#cfcdcd);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        
    }

</style>