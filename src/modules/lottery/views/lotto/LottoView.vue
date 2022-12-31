<template>

  <Transition  >
    <TicketModal @on-accept="onPrintAccept" @on-cancel="onPrintCancel" :game="game.name" :logo="require('@/modules/lottery/assets/img/'+game.img)" :numbers="raffles" v-if="showPrintModal">
      <template v-slot:numbers-list>
        <TicketModalNumbers :numbers="raffles"/>
      </template>
      <template v-slot:print-ticket-numbers>
        <PrintTicketNumbers  :numbers="raffles"/>
      </template>

    </TicketModal>
  </Transition>  
   <div class="game-layout">
     <div class="game-layout-info">
       <img v-if="!mobile" :src="require('@/modules/lottery/assets/img/'+game.img)" :alt="game.name" class="info-image">  
       <div class="info-numbers-container">
         <DisplayInfo @on-delete="onDelete" :numbers="raffles"/>
       </div>
       <div v-if="!mobile"  class="divider"></div> 
       <div v-if="!mobile"  class="game-layout-info--totals">
         <p>{{t('ticketResumeLabel')}}</p>
         <p>{{t('ticketTotalAmountLabel')}}{{currency}}</p>
         <p>{{totalBet}}</p>
        
          <button class="btn clear-button" @click="onClear">{{t('clearLabelButton')}}</button>
       </div> 
       <div v-if="mobile" @click="onMobileDelete" class="game-layout-info--delete">
          <TrashCanOutline/>
       </div>
      
       <DeleteMobileMenu @on-delete="onMobileMenuClear"  @on-close="onMobileMenuClose" v-if="mobile"/> 
      
     
    </div>
    <div class="game-layout-display">     
      <DisplayNumbers :numbers="raffleNumbers"/>
      <DisplayBet  :bet="bet.toString()" :betLabel="t('betAmountLabel')+currency"/>     
      <DisplayNotifications v-if="!mobile" :title="t('notificationsLabel')" :type="notificationType" :notification="notificationText"/>
      

     
    </div>
    <div class="game-layout-controls">
       
       <DisplayNotifications v-if="mobile" :title="t('notificationsLabel')" :type="notificationType" :notification="notificationText"/> 
       <SelectDay  @day-change="onDateChange" :days="raffleDays" />       
       <ToggleButton :label="t('revengeBetTypeLabel')" @on-change="onBetTypeChange"/>
       <button class="btn blind-rooster" @click="onBlindRooster">{{t('blindRooster')}}</button>           
      
                     
       <KeyBoard @keyboard-change="onKeyBoardChange" :buttons="keyBoardButtons" :printDisabled="emptyRaffles"/>
       
       <div v-if="!mobile" class="control-footer">
         <div class="control-footer-logo">
           <p>{{t('poweredBy')}}</p>
           <img  src="@/assets/img/logo_footer.svg" alt="logo-footer">
         </div>
         
         <p>{{version}}</p>
       </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRipple } from "../../../shared/composables/useRipple";
import DisplayInfo            from '../../components/Lotto/DisplayInfo.vue'
import DisplayNumbers         from '../../components/DisplayNumbers.vue';
import DisplayBet             from '../../components/DisplayBet.vue';
import DisplayNotifications   from '../../components/DisplayNotifications.vue';
import ToggleButton           from '../../components/ToggleButton.vue';
import SelectDay              from '../../components/SelectDay.vue';
import KeyBoard               from '../../components/KeyBoard.vue';
import DeleteMobileMenu       from '../../components/DeletMobileMenu.vue';
import TicketModalNumbers     from '../../components/Lotto/TicketModalNumbers.vue';
import PrintTicketNumbers     from '../../components/Lotto/PrintTicketNumbers .vue';
import TicketModal            from '@/modules/shared/components/TicketModal/TicketModal.vue';
import { TrashCanOutline } from 'mdue';
import { useI18n } from 'vue-i18n';
import { useGame } from '@/modules/lottery/composables/useGame';
import { useUI } from '@/modules/shared/composables/useUI';
import { useTime } from '@/modules/shared/composables/useTime';
import { checkDuplicateBetNumber, getRandomIntExcludingExistingNumbers, hasDuplicates } from '../../../shared/utils/utils.js';

export default {
  name: "Lotto",
  components:{  
    DisplayInfo,
    DisplayNumbers,   
    DisplayBet,      
    DisplayNotifications,         
    SelectDay, 
    ToggleButton,
    TicketModal,
    TicketModalNumbers,
    PrintTicketNumbers,
    KeyBoard, 
    DeleteMobileMenu,
    TrashCanOutline,       
    
  },
   setup(){

    const COMMON_BET_TYPE = 'common'; 
    const REVENGE_BET_TYPE = 'revenge'; 

    const FIRST_NUMBER_STATE        =   'FIRST_NUMBER_STATE';
    const SECOND_NUMBER_STATE       =   'SECOND_NUMBER_STATE';
    const THIRD_NUMBER_STATE        =   'THIRD_NUMBER_STATE';
    const FOURTH_NUMBER_STATE       =   'FOURTH_NUMBER_STATE';
    const FIFTH_NUMBER_STATE        =   'FIFTH_NUMBER_STATE';
    const COMPLETED_NUMBERS_STATE   =   'COMPLETED_NUMBERS_STATE';

    const ERROR_TYPE_NOTIFICATION = 'error';
    const INFO_TYPE_NOTIFICATION = 'info';
    
    const MAX_BET = 4000;
    const MIN_BET = 100;
    const MAX_NUMBER_LENGHT = 2;
    const MAX_RAFFLES = 8;
    const DEFAULT_BET = 600;
    const REVENGE_BET = 400;

    const { t } = useI18n();
    const { getDates } = useTime();    
    const { mobile, version, currency } = useUI();
    const { game, setGame, state, setState, bet, setBet, totalBet, validateBet, betType, setBetType, raffles, setRaffles, notificationText, notificationType, setNotification,
    resetGame, deleteRaffle,emptyRaffles, times, setTimes, changeTime, morningTime, nightTime, setMorningTime, setNightTime } = useGame();
    const { createRipple } = useRipple();
    const raffleDays = ref([]);
    const raffleDay = ref('');


    const mobileDateMenu = ref(null);
    const deleteMobileMenu = ref(null);
    const showPrintModal = ref(false);

    const raffleNumbers = ref(['','','','','']);

    let blindRooster = false;    

    setGame({name:'Lotto',img:'lottoLogo.png'});    

    setBet(DEFAULT_BET);
    
    setState(FIRST_NUMBER_STATE);

    setBetType(COMMON_BET_TYPE);     

    setTimes(['M','N']);

    setMorningTime('12:00');

    setNightTime('19:00');   

   
   
    const typeButtons = ref([{label:t('revengeBetTypeLabel'),value:REVENGE_BET_TYPE}]); 
    const keyBoardButtons = ref(['7','8','9',t('printLabelButton'),'4','5','6','1','2','3',t('enterLabelButton'),'<','0',t('deleteLabelButton')]);
     
   

    

     if(mobile.value){
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



     /* UI FUNCTIONS  */

     const onKeyBoardChange = (keyBoardValue) => {
     
     
      if(keyBoardValue.toLowerCase() == 'print'){
        
        onPrint();
        return;
      }
      if(keyBoardValue.toLowerCase() == 'insert'){
        
        onInsert();
        return
      }         
     

      setNumberValue(keyBoardValue);
       
    }


    const onInsert = () =>{
       
        if(!validateBet(MAX_BET,MIN_BET)) return;       
        if(!validateNumber()) return;

        createRaffles();
        
    }

    const onPrint = () =>{
      
        createRipple(event);        
        showPrintModal.value = true;
    }

    const onPrintAccept = () =>{
      showPrintModal.value = false;
    }

    const onPrintCancel = () =>{
      showPrintModal.value = false;
    }

    const  onDateChange = (data) => {
      
     
      raffleDay.value = data;
     
    }

    const  onTimeChange = (data) => {
     
      changeTime(data);     
    }

    const onClear = () =>{

      createRipple(event);      

      resetGame()

      setState(FIRST_NUMBER_STATE);

      setInitialNotification();
    }

    const onBetTypeChange = (value) =>{    
      
      
      console.log(value);

      if(value){

        setBetType(REVENGE_BET_TYPE);

        setBet( DEFAULT_BET + REVENGE_BET );

      }else{

        setBetType( COMMON_BET_TYPE );
        setBet( DEFAULT_BET )
      }  

     
       
    }


    const onBlindRooster = () =>{

       createRipple(event);

       blindRooster = true;

       let formatNumbers = ['','','','',''];

       formatNumbers[0] =  getRandomIntExcludingExistingNumbers(0,40,formatNumbers);      
       formatNumbers[1] =  getRandomIntExcludingExistingNumbers(0,40,formatNumbers);
       formatNumbers[2] =  getRandomIntExcludingExistingNumbers(0,40,formatNumbers);
       formatNumbers[3] =  getRandomIntExcludingExistingNumbers(0,40,formatNumbers);
       formatNumbers[4] =  getRandomIntExcludingExistingNumbers(0,40,formatNumbers);

       raffleNumbers.value = formatNumbers.map( number =>{
       
        if(String(number).length == 1){
          number = '0'+number;
        }
         return number;
       });

      
      
       setState(COMPLETED_NUMBERS_STATE);
       
    }

    /* NOTIFICATIONS */


    const setInitialNotification = () => {

       
        setNotification(INFO_TYPE_NOTIFICATION,t('infoNumber5Notification'));
    } 


     /* VALIDATE FUNCTIONS */


    const validateNumber = () => {

        if(mobile.value){
          console.log('Mobile validate')
        }else{

           if(state.value != COMPLETED_NUMBERS_STATE){
              setNotification(ERROR_TYPE_NOTIFICATION,t('infoEmptyDate'));
              return false;
            }


          if( hasDuplicates(raffleNumbers.value) ) {

            setNotification(ERROR_TYPE_NOTIFICATION,t('errorNotificationRepeatNumbers'));

            return false;

          }
        }
             
        
        return true;
    }

    /* DATA FUNCTIONS */

    const setRaffleDays = () =>{

      raffleDays.value = ['',''];

      getDates(t).forEach( (date) => {

        if(date.weekday.toLowerCase() == t('day2').toLowerCase() && raffleDays.value[0] == ''){
           raffleDays.value[0] = date;
        }

        if(date.weekday.toLowerCase() == t('day5').toLowerCase()  && raffleDays.value[1] == ''){
          
          raffleDays.value[1] = date;
        }

      });

      raffleDay.value = raffleDays.value[0];
     
    }

    /* {numbers:['12','14','36','21','23'],type:'',date:'24/11 N',bet:'$10000',} */
    const createRaffles = () => {

      
     
        let duplicate = false;    
       

        const raffle = {
          numbers:raffleNumbers.value,
          type:betType.value,
          bet:bet.value,  
          blindRooster: (blindRooster) ?   t('ticketTypeBlindRooster') : '',    
          date: `${raffleDay.value.weekday} ${raffleDay.value.date}`
        }

        if(checkDuplicateBetNumber(raffle,raffles.value, true)){

          duplicate = true;           
         
        }else{
            
         

          if(raffles.value.length < MAX_RAFFLES){

            setRaffles([...raffles.value,raffle]);

          }else{

            setNotification(ERROR_TYPE_NOTIFICATION,t('errorNotificationExcessNumbers'));
          }

          

        }

      if(duplicate){

        setNotification(ERROR_TYPE_NOTIFICATION,t('errorNotificationDuplicateBet'));

      }else{

        raffleNumbers.value = ['','','','',''];

        blindRooster = false;

        setState(FIRST_NUMBER_STATE);

        if(raffles.value.length < MAX_RAFFLES){

            setInitialNotification();

        }

       

      }

     
    }

    const setNumberValue = (val) => {
       switch (val.toLowerCase()) {
        case 'delete':
          
          deleteNumbers();           

          break;

        case '<':               

          deleteNumber();         

          break;

        default:
           

         setNumber(val);  
        
          
          break;      
       
      }
    }

    const setNumber = ( val ) =>{
     
       if(mobile.value){
        switch (state.value) {
          case FIRST_NUMBER_STATE: 
            
            if(raffleNumbers.value[0].length < MAX_NUMBER_LENGHT){

              raffleNumbers.value[0] += val;

            }else{

              setState(SECOND_NUMBER_STATE);

            }  
            
            break;
          case SECOND_NUMBER_STATE:

            if(raffleNumbers.value[1].length < MAX_NUMBER_LENGHT){

              raffleNumbers.value[1] += val;

            }else{

              setState(THIRD_NUMBER_STATE);
              
            }  
            break;
          case THIRD_NUMBER_STATE:


            if(raffleNumbers.value[2].length < MAX_NUMBER_LENGHT){

              raffleNumbers.value[2] += val;

            }else{

              setState(FOURTH_NUMBER_STATE);
              
            }

            break;
          case FOURTH_NUMBER_STATE:

            if(raffleNumbers.value[3].length < MAX_NUMBER_LENGHT){

              raffleNumbers.value[3] += val;

            }else{

              setState(FIFTH_NUMBER_STATE);
              
            }

            break;
          case FIFTH_NUMBER_STATE:

            if(raffleNumbers.value[4].length < MAX_NUMBER_LENGHT){

              raffleNumbers.value[4] += val;

            }else{

              setState(COMPLETED_NUMBERS_STATE);
              
            }

            break;
        
          default:
            break;
        }
      }else{

        switch (state.value) {

          case FIRST_NUMBER_STATE: 

            raffleNumbers.value[0] = val;

            setState(SECOND_NUMBER_STATE);

            break;
          case SECOND_NUMBER_STATE:

            raffleNumbers.value[1] = val;

            setState(THIRD_NUMBER_STATE);

            break;
          case THIRD_NUMBER_STATE:

            raffleNumbers.value[2] = val;

            setState(FOURTH_NUMBER_STATE);

            break;
          case FOURTH_NUMBER_STATE:

            raffleNumbers.value[3] = val;

            setState(FIFTH_NUMBER_STATE);

            break;
          case FIFTH_NUMBER_STATE:

            raffleNumbers.value[4] = val;

            setState(COMPLETED_NUMBERS_STATE);

            break;
        
          default:
            break;
        }
       
      }            
    }

    const deleteNumber = () =>{
     
      if(mobile.value){
        switch (state.value) {
          case FIRST_NUMBER_STATE: 

            raffleNumbers.value[0] = String(raffleNumbers.value[0]).slice(0, -1);

            break;
          case SECOND_NUMBER_STATE:

            raffleNumbers.value[0] = String(raffleNumbers.value[0]).slice(0, -1);

            if(raffleNumbers.value[0].length == 0){
              setState(FIRST_NUMBER_STATE);
            }

            break;
          case THIRD_NUMBER_STATE:

            raffleNumbers.value[1] = String(raffleNumbers.value[1]).slice(0, -1);

            if(raffleNumbers.value[1].length == 0){
              setState(SECOND_NUMBER_STATE);
            }

            break;
          case FOURTH_NUMBER_STATE:

            raffleNumbers.value[2] = String(raffleNumbers.value[2]).slice(0, -1);

            if(raffleNumbers.value[2].length == 0){
              setState(THIRD_NUMBER_STATE);
            }

            break;
          case FIFTH_NUMBER_STATE:

            raffleNumbers.value[3] = String(raffleNumbers.value[3]).slice(0, -1);

            if(raffleNumbers.value[3].length == 0){
              setState(FOURTH_NUMBER_STATE);
            }
            
            break;
          case COMPLETED_NUMBERS_STATE:

            raffleNumbers.value[4] = String(raffleNumbers.value[4]).slice(0, -1);

            if(raffleNumbers.value[4].length == 0){
              setState(FIFTH_NUMBER_STATE);
            }
            
            break;
        
          default:
            break;
        }
      }else{

        switch (state.value) {

          case FIRST_NUMBER_STATE:    

            raffleNumbers.value[0] = '';
           
            break;
          case SECOND_NUMBER_STATE:

            raffleNumbers.value[0] = '';

            setState(FIRST_NUMBER_STATE);
           
            break;
          case THIRD_NUMBER_STATE:

            raffleNumbers.value[1] = '';

            setState(SECOND_NUMBER_STATE);
            
            break;
          case FOURTH_NUMBER_STATE:

            raffleNumbers.value[2] = '';

            setState(THIRD_NUMBER_STATE);

            break;
          case FIFTH_NUMBER_STATE:

            raffleNumbers.value[3] = '';

            setState(FOURTH_NUMBER_STATE);

            break;
          case COMPLETED_NUMBERS_STATE:

            raffleNumbers.value[4] = '';

            setState(FIFTH_NUMBER_STATE);
            
            break;  
        
          default:
            break;
        }
       
      }
    }

    const deleteNumbers = () =>{

      if(mobile.value){
        switch (state.value) {
            case FIRST_NUMBER_STATE:              
              raffleNumbers.value[0] = '';
              break;
            case SECOND_NUMBER_STATE:
              raffleNumbers.value[1] = '';
              break;
            case THIRD_NUMBER_STATE:
              raffleNumbers.value[2] = '';
              break;
            case FOURTH_NUMBER_STATE:
              raffleNumbers.value[3] = '';
              break;
            case FIFTH_NUMBER_STATE:
              raffleNumbers.value[4] = '';
              break;
          
            default:
              break;
          }
      }else{

        raffleNumbers.value = ['','','','',''];

        setState(FIRST_NUMBER_STATE);
        
        setNotification(INFO_TYPE_NOTIFICATION,t('infoNumber5Notification'));
      }
        

          
    };


    const onDelete = ( index )=>{
      
      deleteRaffle( index );

      if(emptyRaffles.value){
        setState(FIRST_NUMBER_STATE)
      }

    };


    


    onMounted( ()=>{         
      
      
      setRaffleDays();


      setInitialNotification();


    });



    return{
      t,    
      mobile,
      currency,
      version,
      game,
      bet,
      totalBet,
      raffleNumbers,
      raffles,
      notificationType,
      notificationText,     
      times,    
      raffleDays, 
      morningTime,
      nightTime, 
      emptyRaffles, 
      showPrintModal,
      mobileDateMenu,
      deleteMobileMenu,
      typeButtons,     
      keyBoardButtons, 



      onKeyBoardChange,    
      onBetTypeChange,     
      onDateChange,
      onTimeChange,     
      onDelete,
      onBlindRooster,
      onClear,
      onPrintCancel,
      onPrintAccept,

      onMobileDelete(){
        deleteMobileMenu.value.showMenu();
      },
      onMobileMenuClose(){
        deleteMobileMenu.value.hideMenu();
      },
      onMobileMenuClear(){
        deleteMobileMenu.value.hideMenu();
      },
      onMobileDates(){
        mobileDateMenu.value.showMenu();
      },
      onMobileDatesClose(){
        mobileDateMenu.value.hideMenu();
      },
      onMobileDatesCancel(){
        mobileDateMenu.value.hideMenu();
      },
      onMobileDatesAccept(){
        mobileDateMenu.value.hideMenu();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./lotto.scss";
</style>