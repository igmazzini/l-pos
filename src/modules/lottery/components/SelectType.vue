<template>
    <div class="select-type">
        <p v-if="!store.state.mobile">{{title}}</p>
        <div class="select-buttons">
            <button   v-for="(button,index) of buttons" :key="button" :class="getActive(index)" @click.stop="onSelect(index)">{{button.label}}</button>
        </div>
    </div> 
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {      
    props:{
        title:String,
        buttons: Array,
        defaultIndex:Number
    },
    emits: ['type-change'],
    setup(props,context){

        const store = useStore();
        let currentIndex = ref(0);
    
        watch(()=>props.defaultIndex,(val)=>{
           
            if(val != -1){               
                onSelect(val)
            }
        });

        const  onSelect =  (index) => {
           
            currentIndex.value = index;                          
            context.emit('type-change',props.buttons[index].value);
        };

       
        return{
            store,
            currentIndex,
            onSelect,
            getActive: (index) => {
               
                if(currentIndex.value === index){
                    return 'btn select-button select-button--active';
                }else{
                    return 'btn select-button';
                }
            }
        }
        
    }
    

}
</script>

<style lang="scss" scoped >

    .select-type{
        width: 100%;
    }

   .select-type p{
        display: block;
        width: 100%;
        text-align: left;
        text-transform: uppercase;
        color:black;
        margin: 0;
        font-size: 1rem;
       
       
    }    
    .select-buttons{
        width: 100%;       
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;       
    }

    .select-button{
        width: 23%;
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

    .select-button--active{
        background-color: var(--warning-color);
    }

    @media screen and (max-width:1300px){
         .select-button{
             width: 24%;
             height: 100%;
             font-size: 1rem;
             min-height: 35px;
         }
    }

</style>