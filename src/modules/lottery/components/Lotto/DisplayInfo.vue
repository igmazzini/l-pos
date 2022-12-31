<template>
    <ul class="info-numbers">
        <li v-for="(data, index) of numbers" :key="data">
            <span class="index">{{ getIndex(index) }}</span>
            <div class="numbers-container"><span v-for="num of data.numbers" :key="num" class="info-number">{{ num }}</span></div>             
            <span>{{ data.date }}</span>           
            <span><span class="special-label" v-if="data.type == 'revenge'">(RE)</span><span class="special-label" v-if="data.blindRooster != ''">({{data.blindRooster}})</span>{{ formatAmount(data.bet) }}</span>
            <Close @click="onDelete(index)" class="option-icon" />
        </li>
    </ul>
 
</template>

<script>
import { Close } from "mdue";
import { useStore } from 'vuex';
import { useUI } from '@/modules/shared/composables/useUI';

export default { 
  props: {
    numbers: Array,
  },
  components: {
    Close,
  },
  emits: ["on-delete"],
  setup(props, context) {

    const store = useStore();
    const { getIndex, currency, subString, mobile, formatAmount } = useUI();

    return {
      store,
      getIndex,
      formatAmount,
      mobile,
      currency,
      subString,
      onDelete: (index) => {
        context.emit("on-delete", index);
      },
     
    };
  },
};
</script>

<style lang="scss" scoped>


.info-numbers {
    width: 100%;
    font-size: 1.4em;   
    list-style: none;
    padding: 5px;
    height: 100%;
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
}

.info-numbers::-webkit-scrollbar {
    width: 5px;
    height: 5px;           
}
.info-numbers::-webkit-scrollbar-track {
    background-color: var(--background-color);
    border-bottom-right-radius: inherit;
    
}
.info-numbers::-webkit-scrollbar-thumb {
   background-color: var(--info-color);
}
.info-numbers:-webkit-scrollbar-thumb:hover {
   background-color: var(--info-color);
} 




li{
    display: grid;   
    grid-template-columns: 5% 1fr repeat(2,1fr) 5%;
    align-items: center;
    justify-items: start;
    margin: 5px 0;
    padding: 0;

   

    span{
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
    }

    span:nth-child(3){
        justify-self: center;
    }
    span:nth-child(4){
        justify-self: end;
        padding-right: 10px;
    }   

    .numbers-container{
      display: flex;
      span{
        padding-left: 0;
        padding-right: 0;
      }
    }
}


.index {
    color: var(--primary-color);
    margin-right: 5px;
}

.special-label{
   color: var(--primary-color);  
   margin-right: 4px;
   font-size: 0.8em;
   
}

.info-number {
    width: 43px;
    height: 43px;
    font-size: 0.9em;
    border-radius: 50%;
    background-image: radial-gradient(#fff, #cfcdcd);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;    
    margin: 0 2px;
    padding-top: 2px;
}


.option-icon {
  font-size: 1.9rem;
  border-radius: 50%;
  border: 1px solid #ccc;
  cursor: pointer;
}
@media screen and (max-width: 1300px) {

    .info-numbers{
      font-size: 1.2em;
    }

    .ticket-modal-content-numbers {
        padding: 5px;
    }  


    li{   

      grid-template-columns: 3% 1fr 23% 1fr 5%;     

       span:nth-child(4){
        justify-self: end;
        padding-right: 4px;
       }   

      .numbers-container{
      
        span{
         font-size: 1em;
        }
      }
    }
    


    .index {
        
        margin-right: 2px;
    }

    .info-number {
        width: 20px;
        height: 20px;
    }
  }
</style>