<template>
    <ul class="info-numbers">
        <li v-for="(data, index) of numbers" :key="data">
            <span class="index">{{ getIndex(index) }}</span>
            <span v-for="num of data.numbers" :key="num" class="info-number">{{ num }}</span>
            <span>{{ subString(data.type,(mobile) ? 3 : 20 ).toUpperCase() }}</span>
            <span>{{ data.date }}</span>
            <span >
                <span v-if="data.reventadoBet && data.reventadoBet != '' && data.reventadoBet != '-'" class="reventado-label">(R)</span>                
                <span v-if="data.reventadoBet && data.reventadoBet != '' && data.reventadoBet != '-'" >{{ formatAmount(data.reventadoBet) }}</span>                        
            </span>
            <span>{{formatAmount(data.bet) }}</span>
            <span @click="onDelete(index)" class="option-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </span>
            
        </li>
    </ul>
 
</template>

<script>

import { useStore } from 'vuex';
import { useUI } from '@/modules/shared/composables/useUI';

export default { 
  props: {
    numbers: Array,
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
    font-size: 1.2em;   
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
    grid-template-columns: 4% 8% 1fr 17% 17% 17% 5%;
    align-items: center;
    justify-items: start;
    margin: 5px 0;
    padding: 0;

    span{
        margin: 0;
        padding: 0;
        display: flex;
    }

    span:nth-child(3){
        padding-left: 5px;
    }
}

.index {
    color: var(--primary-color);
    margin-right: 5px;
}

.info-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-image: radial-gradient(#fff, #cfcdcd);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    font-size: 1em;
    margin: 0 2px;
    padding-top: 2px;
}
.info-number-big{

   width: 43px;
   height: 43px;
   font-size: 0.9em;
}


.reventado-label {
    color: var(--primary-color);
    margin: 0 4px;
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
      grid-template-columns: 5% 10% 20% 20% 25% 15% 6%;
    }

    .info-number {
        width: 28px;
        height: 28px;
    }
  }
</style>