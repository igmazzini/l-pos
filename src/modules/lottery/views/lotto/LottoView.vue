<template>
   <div class="game-layout">
     <div class="game-layout-info">
       <img v-if="!store.state.mobile" :src="require('@/modules/lottery/assets/img/'+game.img)" :alt="game.name" class="info-image">  
       <div class="info-numbers-container">
         <DisplayInfo @on-delete="onDelete" :numbers="infoNumbers"/>
       </div>
       <div v-if="!store.state.mobile"  class="divider"></div> 
       <div v-if="!store.state.mobile"  class="game-layout-info--totals">
         <p>{{t('ticketResumeLabel')}}</p>
         <p>{{t('ticketTotalAmountLabel')}}{{currency}}</p>
         <p>{{totals}}</p>
        
          <button class="btn clear-button" @click="onBlindRooster">{{t('clearLabelButton')}}</button>
       </div> 
       <div v-if="store.state.mobile" @click="onMobileDelete" class="game-layout-info--delete">
          <TrashCanOutline/>
       </div>
      
       <DeleteMobileMenu @on-delete="onMobileMenuClear"  @on-close="onMobileMenuClose" v-if="store.state.mobile && showDeleteMenu"/> 
      
     
    </div>
    <div class="game-layout-display">     
      <DisplayNumbers :numbers="[22,36,26,27,14]"/>
      <DisplayBet  :bet="600" :betLabel="t('betAmountLabel')+currency"/>     
      <DisplayNotifications v-if="!store.state.mobile" :title="t('notificationsLabel')" :type="'info'" :notification="'Ingrese un Nº de hasta 2 dígitos y presione INGRESAR'"/>
      

     
    </div>
    <div class="game-layout-controls">
       
       <DisplayNotifications v-if="store.state.mobile" :title="t('notificationsLabel')" :type="'info'" :notification="'Ingrese un Nº de hasta 2 dígitos y presione INGRESAR'"/> 
       <SelectTime @date-change="onDateChange" @time-change="onTimeChange" :times="[t('day2'),t('day5')]" />
       <SelectType   @type-change="onTypeChange" :title="''" :buttons="typeButtons"/>
       <button class="btn blind-rooster" @click="onBlindRooster">{{t('blindRooster')}}</button>           
      
                     
       <KeyBoard @keyboard-change="onKeyBoardChange" :buttons="keyBoardButtons" :printDisabled="printDisabled"/>
       
       <div v-if="!store.state.mobile" class="control-footer">
         <div class="control-footer-logo">
           <p>{{t('poweredBy')}}</p>
           <img  src="@/assets/img/logo_footer.svg" alt="logo-footer">
         </div>
         
         <p>{{store.state.version}}</p>
       </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRipple } from "../../../shared/composables/useRipple";
import DisplayInfo            from '../../components/Lotto/DisplayInfo.vue'
import DisplayNumbers         from '../../components/DisplayNumbers.vue';
import DisplayBet             from '../../components/DisplayBet.vue';
import DisplayNotifications   from '../../components/DisplayNotifications.vue';
import SelectType             from '../../components/SelectType.vue';
import SelectTime             from '../../components/SelectTime.vue';
import KeyBoard               from '../../components/KeyBoard.vue';
import DeleteMobileMenu       from '../../components/DeletMobileMenu.vue';
import { TrashCanOutline } from 'mdue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

export default {
  name: "Lotto",
  components:{  
    DisplayInfo,
    DisplayNumbers,   
    DisplayBet,      
    DisplayNotifications,   
    SelectType,    
    SelectTime, 
    KeyBoard, 
    DeleteMobileMenu,
    TrashCanOutline,       
    
  },
   setup(){

    const REVENGE_BET_TYPE = 'revenge'; 

    const { t } = useI18n(); 
    const store = useStore();

    const { createRipple } = useRipple();
    const game = ref({name:'Lotto',img:'lottoLogo.png'});
    const typeButtons = ref([{label:t('revengeBetTypeLabel'),value:REVENGE_BET_TYPE}]); 
    const keyBoardButtons = ref(['7','8','9',t('printLabelButton'),'4','5','6','1','2','3',t('enterLabelButton'),'<','0',t('deleteLabelButton')]);
    const infoNumbers = ref([
      {numbers:['12','14','36','21','23'],type:'',date:'24/11 N',bet:'$10000',},
      {numbers:['12','14','36','21','23'],type:'',date:'24/11 N',bet:'$10000',},
      {numbers:['12','14','36','21','23'],type:'',date:'24/11 N',bet:'$10000',},
      {numbers:['12','14','36','21','23'],type:'',date:'24/11 N',bet:'$10000',},
      {numbers:['12','14','36','21','23'],type:'',date:'24/11 N',bet:'$10000',},
      {numbers:['12','14','36','21','23'],type:'',date:'24/11 N',bet:'$10000',},
      {numbers:['12','14','36','21','23'],type:'',date:'24/11 N',bet:'$10000',},
      {numbers:['12','14','36','21','23'],type:'',date:'24/11 N',bet:'$10000',},
      {numbers:['12','14','36','21','23'],type:'',date:'24/11 N',bet:'$10000',},
      
     
      
      
      ]);
    const days = ref([1,2,3,4,5,6,7,8,9]) 
   
    const lblMorning = ref(' 12:00');
    const lblNight = ref(' 19:00');
    const currency =   ref('₡');
    const printDisabled =   ref(true);
    const totals =   ref(100);
    const showDeleteMenu = ref(false);
    const showDatesMenu = ref(false);       

     if(store.state.mobile){
      keyBoardButtons.value = [
      {label:'7',value:'7'},
      {label:'8',value:'8'},
      {label:'9',value:'9'},
      {label:'4',value:'4'},
      {label:'5',value:'5'},
      {label:'6',value:'6'},
      {label:'1',value:'1'},
      {label:'2',value:'2'},
      {label:'3',value:'3'},
      {label:'<',value:'<'},     
      {label:'0',value:'0'},  
      {label:t('deleteLabelButton'),value:'delete'},
      {label:t('printLabelButton'),value:'print'},
      {label:t('enterLabelButton'),value:'insert'},   
    ];
   
    }else{

   
      keyBoardButtons.value = [
        {label:'00',value:'00'},
        {label:'01',value:'01'},
        {label:'02',value:'02'},
        {label:'03',value:'03'},
        {label:'04',value:'04'},
        {label:'05',value:'05'},
        {label:'06',value:'06'},
        {label:'07',value:'07'},
        {label:'08',value:'08'},
        {label:'09',value:'09'},
        {label:'10',value:'10'},
        {label:t('printLabelButton'),value:'print'},     
        {label:'11',value:'11'},   
        {label:'12',value:'12'},
        {label:'13',value:'13'},
        {label:'14',value:'14'},
        {label:'15',value:'15'},
        {label:'16',value:'16'},
        {label:'17',value:'17'},
        {label:'18',value:'18'},
        {label:'19',value:'19'},
        {label:'20',value:'20'},
        {label:'21',value:'21'},
        {label:'22',value:'22'},
        {label:'23',value:'23'},
        {label:'24',value:'24'},
        {label:'25',value:'25'},
        {label:'26',value:'26'},
        {label:'27',value:'27'},
        {label:'28',value:'28'},
        {label:'29',value:'29'},
        {label:'30',value:'30'},
        {label:'31',value:'31'},
        {label:'32',value:'32'},
        {label:t('enterLabelButton'),value:'insert'}, 
        {label:'<',value:'<'},   
        {label:'33',value:'33'},
        {label:'34',value:'34'},
        {label:'35',value:'35'},       
        {label:'36',value:'36'},
        {label:'37',value:'37'},
        {label:'38',value:'38'},
        {label:'39',value:'39'},
        {label:'40',value:'40'},
        {label:t('deleteLabelButton'),value:'delete'},
      ];
     }


    return{
      t,
      store,
      game,
      typeButtons,     
      keyBoardButtons,
      infoNumbers,
      days,      
      lblMorning,
      lblNight,     
      currency,
      printDisabled,
      totals,
      showDeleteMenu,
      showDatesMenu,
      onTypeChange: (index)=>{
        console.log('onTypeChange '+typeButtons.value[index])
      },     
      onDateChange: (data)=>{
        console.log('onDateChange '+data.on+' '+data.index)       
      },
      onTimeChange: (data)=>{
        console.log('onTimeChange '+data.time+' '+data.index)       
      },
      onKeyBoardChange: (index)=>{
        console.log('onKeyBoardChange '+index)
        console.log('onKeyBoardChange '+keyBoardButtons.value[index])
      },
      onDelete: (index)=>{
        console.log('onDelete '+index)
        infoNumbers.value.splice(index,1);
      },
      onBlindRooster(){
        createRipple(event);
      },
      onMobileDelete(){
        showDeleteMenu.value = true;
      },
      onMobileMenuClose(){
        showDeleteMenu.value = false;
      },
      onMobileMenuClear(){
        showDeleteMenu.value = false;
      },
      onMobileDates(){
        showDatesMenu.value = true;
      },
      onMobileDatesClose(){
        showDatesMenu.value = false;
      },
      onMobileDatesCancel(){
        showDatesMenu.value = false;
      },
      onMobileDatesAccept(){
        showDatesMenu.value = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./lotto.scss";
</style>