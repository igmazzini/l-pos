<template>
    <div class="select-bet">
        <p v-if="!store.state.mobile">{{title}}</p>
        <div class="bet-buttons">
            <button   v-for="(button,index) of buttons" :key="button" :class="getActive(index)" @click.stop="onSelect(index)">{{button}}</button>
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
    emits: ['bet-change'],
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
            context.emit('bet-change',currentIndex.value);
        };

        return{
            store,
            currentIndex,
            onSelect,
            getActive: (index) => {
                if(currentIndex.value === index){
                    return 'btn bet-button bet-button--active';
                }else{
                    return 'btn bet-button';
                }
            }
        }
        
    }
    

}
</script>

<style lang="scss" scoped >

    .select-bet{
        width: 100%;        
    }
    .select-bet p{
        display: block;
        width: 100%;
        text-align: left;
        text-transform: uppercase;
        color:black;
        margin: 0;        
        font-size: 1rem;
    }
    .bet-buttons{
        width: 100%;       
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;       
    }

    .bet-button{
        width: 12%;
        height: 100%;
        min-height: 50px;
        border-radius: 5px;
        color: white;
        font-size: 1.5rem;
        font-family: RobotoBlack;
        text-transform: uppercase;
        border: none;
        box-shadow: none;
        background-color: var(--secondary-color);
    }

    .bet-button--active{
        background-color: var(--warning-color);
    }


    @media screen and (max-width:1300px) {

        
        .bet-buttons{
            height: 100%;
            justify-content: space-between;
        }
        .bet-button{
            width: 47.5%;
            font-size: 2em;   
            min-height: 30px;        
            
        }
    }

</style>