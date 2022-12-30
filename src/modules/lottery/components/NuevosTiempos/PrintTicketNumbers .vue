<template>
       <div class="print-ticket-numbers">
            <div class="numbers-head">
                <p>#</p>
                <p>{{t('ticketGame')}}</p>
                <p>{{t('ticketNumber')}}</p>
                <p>{{t('ticketDate')}}</p>
                <p>{{t('ticketAmount')}}</p>
                <p>R</p>
            </div>

            
            <ul class="numbers-list">

                
                <li v-for="(number, index) of numbers" :key="number">
                    <span>{{ getIndex(index) }}</span>
                    <span>{{ number.type }}</span>
                    <span v-for="num of number.numbers" :key="num" >{{ num }}</span>
                    <span>{{ number.date }}</span>
                    <span>{{ formatAmount(number.bet) }}</span>
                    <span v-if="number.reventadoBet && number.reventadoBet != '' && number.reventadoBet != '-'" >{{ formatAmount(number.reventadoBet) }}</span> 
                    <span v-if="number.reventadoBet && number.reventadoBet == '' || number.reventadoBet == '-'" >--</span> 
                </li>
            </ul>           
        </div>
</template>

<script>
import { useUI } from '@/modules/shared/composables/useUI';
import { useI18n } from 'vue-i18n';
export default {
      name:'PrintTicketNumbers',
      props:{
            numbers:{
                  type:Array,
                  required:true
            }
      },
      setup(){
            const { getIndex, formatAmount } = useUI();
            const { t } = useI18n(); 

            return{
                  getIndex,
                  t,
                  formatAmount
            }
      }

}
</script>


<style lang="scss" scoped>

.print-ticket-numbers{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px dashed #ccc;

    p{
        margin: 0;
    }

    .numbers-head{
        display: grid;
        width: 100%;
        grid-template-columns: 6% 30% 15% 20% repeat(2,1fr);        
        justify-items: left;
        font-family: RobotoRegular;

        p:last-child{
            justify-self: end;
        }
        
    }

    .numbers-list{
        width: 100%;       
        list-style: none;
        padding: 0;

        li{
            display: grid;
            grid-template-columns: 6% 30% 15% 20% repeat(2,1fr);  
            justify-items: left;

             span:last-child{
                justify-self: end;
            }
        }
    }
    
   
}



</style>