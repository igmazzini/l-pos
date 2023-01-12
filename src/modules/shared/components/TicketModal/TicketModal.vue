<template>
  <div class="ticket-modal-container">
    <div class="ticket-modal animate__animated animate__zoomIn animate__faster">
        <div v-if="printing" class="printing-message animate__animated animate__fadeIn animate__faster">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" :width="!mobile ? 170 : 100" :height="!mobile ? 170 : 100" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
                <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/>
                <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
                </svg>
            </span>
            <p>{{t('modalPrinting')}}...</p>
        </div>
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
        const { mobile, getIndex, formatAmount, getPrintDate, printTicket, setPrinting, printing } = useUI();
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

        const onAccept = async () =>{

           setPrinting(true);  

           await printTicket(document.getElementById('printTicket'),document.getElementById('ticketImage'),props.game,props.numbers.length,10);
           

            setTimeout(() => {
                setPrinting(false);
                context.emit('on-accept');
            }, 1000);

            
        }

        const onCancel = () =>{
            context.emit('on-cancel');
        }

      

        return{
            t,           
            getIndex,            
            formatAmount,
            getPrintDate,
            qrValue,
            mobile,
            printing,
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