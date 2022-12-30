<template>
    <ul class="ticket-modal-content-numbers">
        <li v-for="(data, index) of numbers" :key="data" >
            <span class="index">{{ getIndex(index) }}</span>
            <span v-for="num of data.numbers" :key="num" :class="['info-number', (num.length > 2) ? 'info-number-big' : '']">{{ num }}</span>
            <span>{{ subString(data.type,(mobile) ? 3 : 20 ).toUpperCase()  }}</span>
            <span>{{ data.date }}</span>
            <span >
                <span v-if="data.reventadoBet != '' && data.reventadoBet != '-'" class="reventado-label">(R)</span>
                
                <span v-if="data.reventadoBet != '' && data.reventadoBet != '-'" >{{  formatAmount(data.reventadoBet) }}</span>                        
            </span>
            <span>{{ formatAmount(data.bet) }}</span>
            
        </li>
    </ul>
</template>

<script>
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
            const { mobile, getIndex, formatAmount, subString} = useUI();

            return{
                  mobile,
                  getIndex,
                  formatAmount,
                  subString
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
   
    grid-template-columns: 5% 10% 1fr 20% 20% 10%;
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

.without-busted {
    grid-template-columns: 5%  20% repeat(3,1fr);

    span:last-child{
        justify-self: flex-end;
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


.reventado-label {
    color: var(--primary-color);
    margin: 0 4px;
}


@media screen and (max-width:1100px) {
   

    .ticket-modal-content-numbers {
        padding: 5px;
    }  

    li{
           
        grid-template-columns: 5% 10% 1fr 20% 25% 20%;
       
    }


    .info-number {
        width: 28px;
        height: 28px;
    }


}

</style>