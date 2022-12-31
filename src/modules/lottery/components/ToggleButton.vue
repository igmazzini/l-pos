<template>
  <button @click="onClick" :class="['toggle-button', (on) ? 'activate' : '']">{{label}}</button>
</template>

<script>
import { ref } from 'vue';
export default {
    name:'ToggleButton',
    props:{
        label:{
            type:String,
            required:true
        }
    },
    emits:[
        'on-change'
    ],
    setup(props, context){

        const on = ref(false)


        const onClick = () =>{
            
            on.value = !on.value;

            context.emit('on-change',on.value);
        }

        return{
            on,
            onClick
        }

    }

}
</script>

<style lang="scss" scoped >

.toggle-button {
    width: 100%;
    min-height: 60px;
    color: white;
    font-size: 1.5rem;
    font-family: RobotoBlack;
    text-transform: uppercase;
    border: none;
    box-shadow: none;
    border-radius: 5px;
    background-color: var(--secondary-color);
    display: flex;
    align-items: center;
    justify-content: center;
}

.activate {
    background-color: var(--warning-color);
}

</style>