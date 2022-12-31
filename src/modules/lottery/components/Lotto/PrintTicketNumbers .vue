<template>
       <div class="print-ticket-numbers">
                <div class="numbers-head">
                    <p>#</p>                   
                    <p>{{t('ticketNumbers')}}</p>
                    <p>{{t('ticketDate')}}</p>
                    <p>{{t('ticketAmount')}}</p>
                  
                </div>

               
                <ul class="numbers-list">
                    
                    <li v-for="(number, index) of numbers" :key="number">
                        <span>{{ getIndex(index) }}</span>                       
                        <div class="numbers-container"><span v-for="num of number.numbers" :key="num" >{{ num }}</span></div>
                        <span>{{ number.date }}</span>                       
                        <span><span class="special-label" v-if="number.type == 'revenge'">(RE)</span><span class="special-label" v-if="number.blindRooster != ''">({{number.blindRooster}})</span>{{ formatAmount(number.bet) }}</span>                     
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
        grid-template-columns: 5% repeat(3,1fr);        
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
            grid-template-columns: 5% repeat(3,1fr); 
            justify-items: left;

            span{
                margin: 0;
                padding: 0;
                display: flex;
                align-items: center;
            }

            span:last-child{
                justify-self: end;
            }



            .numbers-container{
                display: flex;
                span{
                    padding-left: 0;
                    padding-right: 0;
                    margin: 0 5px;
                }
            }

            .special-label{
           
                margin-right: 4px;
                font-size: 0.8em;
               
            
            }
        }
    }
    
   
}

</style>