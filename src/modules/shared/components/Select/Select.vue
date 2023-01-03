<template>
    <div class="select-container">
        <input ref="inputValue" class="select-value" @click="openOptions" readonly type="text" >
        <ul class="select-options" v-if="showOptions">
            <li class="select-option" v-for="option of options" :key="option" @click="onSelect(option)">{{option?.label}}</li>
        </ul>
    </div>
  
</template>

<script>
import { onMounted, ref } from 'vue';
export default {
    name:'Select',
    props:{
        options:{
            type:Array,
            required:true
        },
        selectedOption:{
            type:Number,
        }
    },
    emits:[
        'on-select'
    ],
    setup(props, contex ){

        const inputValue = ref(null);
        const showOptions = ref(false);

        const onSelect = ( option ) =>{

            contex.emit('on-select', option);
            inputValue.value.value = option.label;

            setTimeout(() => {
                 showOptions.value = false;
            }, 100);
           
        }

        const openOptions = () =>{
            showOptions.value = true;
        }

        onMounted(()=>{
            if(props.selectedOption){
                inputValue.value.value = props.options[props.selectedOption].label;
            }else{
                 inputValue.value.value = props.options[0].label;
            }
        });

        return{
            inputValue,
            showOptions,
            openOptions,
            onSelect,
        }
    }
}
</script>

<style lang='scss' scoped>

.select-container{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    z-index: 1000;
}

.select-value{
    width: 100%;
    font-family: RobotoLight;
    font-size: 1em;   
    height: 100%;
    margin: 0;
    padding: 0;
    cursor: pointer;
    outline: none;
    color: var(--info-color);
    padding: 3px;
    border: none;
}

.select-options{
    list-style: none;
    position: absolute;
    top: 30px;
    left: 0px;
    width: 100%;
    
    padding: 0;
    background-color: whitesmoke;
    z-index: 100;
    border: 1px solid var(--info-color);
}

.select-option{
    font-family: RobotoLight;
    font-size: 1em;
    color: var(--info-color);
    padding: 3px;
    cursor: pointer;
}

.select-option:hover{
    background-color: #2ca6df60;
}

</style>