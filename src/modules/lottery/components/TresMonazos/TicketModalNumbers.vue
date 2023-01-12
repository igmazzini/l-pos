<template>
     <ul class="ticket-modal-content-numbers">
            <li v-for="(data, index) of numbers" :key="data" >
                  <span class="index">{{ getIndex(index) }}</span>
                  <span v-for="num of data.numbers" :key="num" :class="['info-number', (num.length > 2) ? 'info-number-big' : '']">{{ num }}</span>
                  <span>{{ subString(data.type,(mobile && data.type != t('orderDisorderBetTypeLabelShort') && data.type != `${t('orderDisorderBetTypeLabelShort')} (R)` && data.type != `${t('orderDisorderBetTypeLabelShort')} (GT)`) ? 3 : 20 ).toUpperCase() }}</span>
                  <span>{{ data.date }}</span>
                  <span>{{ formatAmount(data.bet) }}</span>
                  
            </li>
      </ul>
</template>

<script>

import { useI18n } from 'vue-i18n';
import { useUI } from '@/modules/shared/composables/useUI';
export default {
      name:'TicketModalNumbers',
      props:{
            numbers:{
                  type:Array,
                  required:true
            }
      },
      setup(){

            const { t } = useI18n();
            const { getIndex, formatAmount, mobile, subString } = useUI();

            return{
                  t,
                  mobile,
                  getIndex,
                  subString,
                  formatAmount
            }
      }

}
</script>


<style lang="scss" scoped>

.ticket-modal-content-numbers {
    width: 100%;
    font-size: 1.4em;   
    list-style: none;
    padding: 15px;
    height: 100%;
    max-height: 310px;
    overflow-y: auto;
}

.ticket-modal-content-numbers::-webkit-scrollbar {
    width: 5px;
    height: 5px;           
}
.ticket-modal-content-numbers::-webkit-scrollbar-track {
    background-color: var(--background-color);
    border-bottom-right-radius: inherit;
    
}
.ticket-modal-content-numbers::-webkit-scrollbar-thumb {
   background-color: var(--info-color);
}
.ticket-modal-content-numbers:-webkit-scrollbar-thumb:hover {
   background-color: var(--info-color);
} 


li{
    display: grid;
   
    grid-template-columns: 5% 5% 1fr 20% 15%;
    align-items: center;
    justify-items: start;
    margin: 5px 0;
    padding: 0;

    span{
        margin: 0;
        padding: 0;
        display: flex;
        justify-self: end;
    }

    span:first-child{
      justify-self: start;
    }

    span:nth-child(3){
        justify-self: start;
        padding-left: 7%;
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
}

.info-number-big{

    width: 43px;
    height: 43px;
    font-size: 0.9em;
 }

 @media screen and (max-width:1100px) {
   

    .ticket-modal-content-numbers {
        padding: 5px;
    }  

    li{
           
        grid-template-columns: 5% 15% repeat(3,1fr);

    }


    .info-number-big{
        width: 34px;
        height: 34px;
    }


}

</style>