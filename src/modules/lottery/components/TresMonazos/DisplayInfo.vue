<template>
    <ul class="info-numbers">
        <li v-for="(data, index) of numbers" :key="data">
            <span class="index">{{ getIndex(index) }}</span>
            <span v-for="num of data.numbers" :key="num" class="info-number">{{ num }}</span>
            <span>{{ subString(data.type,(mobile) ? 3 : 20 ).toUpperCase() }}</span>
            <span>{{ data.date }}</span>           
            <span>{{formatAmount(data.bet) }}</span>
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
    grid-template-columns: 5% 10% 1fr 20% 20% 5%;
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
    line-height: 1;
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
      grid-template-columns: 5% 15% 1fr 25% 25% 10%;
    }

    .info-number {
        width: 30px;
        height: 30px;
        
    }
  }
</style>