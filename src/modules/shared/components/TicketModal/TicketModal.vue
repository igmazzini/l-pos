<template>
  <div class="ticket-modal-container">
    <div class="ticket-modal animate__animated animate__zoomIn animate__faster">
        <div class="ticket-modal-title">
            <p>{{t('printModalTitle')}}</p>
        </div>
        <div class="ticket-modal-content ">

            <slot name="numbers-list"></slot>          
            
            <div class="ticket-modal-content-resume">
                <hr>
                <p>{{t('ticketResumeLabel')}}</p>
                <p>{{t('modalTicketTotalAmountLabel')}}{{ formatAmount(getTotal())}}</p>
            </div>

        </div>
        <div class="ticket-modal-actions">
            <button @click="onCancel" class="btn cta cta-cancel">{{t('cancelLabelButton')}}</button>
            <button @click="onAccept" class="btn cta cta-accept">{{t('acceptLabelButton')}}</button>
        </div>
    </div>
    <div class="ticket-container">    
        <div id="printTicket" class="print-ticket">
            <div class="print-ticket-logo">
                <img id="ticketImage" :src="logo" alt="" >
            </div>

            <slot name="print-ticket-numbers"></slot>
      
            <div class="print-ticket-totals">
                <div class="print-ticket-totals-row"><p>{{t('ticketTotalAmount')}}</p><p>{{formatAmount(getTotal())}}</p></div>
                <div class="print-ticket-totals-row"><p>{{t('ticketRafflesAmount')}}</p><p>{{numbers.length}}</p></div>
            </div>
            <div class="print-ticket-message">
                <p>{{t('ticketMessage')}}</p>

            </div>
            <div class="print-ticket-info">
                <div class="print-ticket-info-row"><p>{{t('ticketPlayDate')}}</p><p>{{getPrintDate()}}</p></div>
                <div class="print-ticket-info-row"><p>{{t('ticketTerminalLabel')}}</p><p>1208-001</p></div>
                <QRCodeVue3 class="ticket-qr"   :width="130" :height="130"  :value="qrValue" 
                :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
                :image="''"
                :imageOptions="{ hideBackgroundDots: false, imageSize: 0, margin: 0 }"
                :dotsOptions="{ type: 'classy', color: '#0d0c0d', gradient: null }"              
                :backgroundOptions="{  color: '#ffffff'}"
                :cornersSquareOptions="{  type: '', color: '#000000'}"
                :cornersDotOptions="{  type: '', color: '#000000'}"
                />
                <p class="ticket-qr-value">{{qrValue}}</p>
                <div class="print-ticket-info-row"><p>{{t('ticketPrintDate')}}</p><p>{{getPrintDate()}}</p></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

import { useI18n } from 'vue-i18n';
import QRCodeVue3 from "qrcode-vue3";
import { useUI } from '@/modules/shared/composables/useUI';
import { ref } from 'vue';
export default {
    name:'TicketModal',
    components:{
        QRCodeVue3
    },
    emits:[
        'on-accept',
        'on-cancel',
    ],
    props:{
        numbers:{
            type:Array,
            required:true
        },
        logo:{
            type:String,
            required:true
        },
        game:{
            type:String,
            required:true
        }
    },
    setup(props, context){

        const { t } = useI18n(); 
        const { getIndex, formatAmount, getPrintDate, printTicket } = useUI();
        const qrValue =  ref('129698-56469');

        
        const getTotal = () =>{
            let total = 0;
            props.numbers.forEach( number =>{
                total += Number(number.bet);

                if(number.reventadoBet && number.reventadoBet != '' && number.reventadoBet != '-'){
                    total += Number(number.reventadoBet);
                }
            });

            return total;
        }

        const onAccept = () =>{

            printTicket(document.getElementById('printTicket'),document.getElementById('ticketImage'),props.game,props.numbers.length,10);
            //context.emit('on-accept');
        }

        const onCancel = () =>{
            context.emit('on-accept');
        }

      

        return{
            t,           
            getIndex,            
            formatAmount,
            getPrintDate,
            qrValue,
            getTotal,
            onAccept,
            onCancel,
            
        }
    }

}
</script>

<style lang="scss" scoped>
@import "./ticket-modal.scss";
</style>