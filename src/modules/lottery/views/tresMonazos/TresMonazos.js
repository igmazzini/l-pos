import { defineComponent, ref, onMounted, watch } from 'vue';
import { useRipple } from "../../../shared/composables/useRipple";

import DisplayInfo            from '../../components/TresMonazos/DisplayInfo.vue';
import DisplayNumbers         from '../../components/DisplayNumbers.vue';
import DisplayBet             from '../../components/DisplayBet.vue';
import DisplayNotifications   from '../../components/DisplayNotifications.vue';
import SelectType             from '../../components/SelectType.vue';
import SelectBet              from '../../components/SelectBet.vue';
import SelectDate             from '../../components/SelectDate.vue';
import KeyBoard               from '../../components/KeyBoard.vue';
import DeleteMobileMenu       from '../../components/DeletMobileMenu.vue';
import DatesMobileMenu        from '../../components/DatesMobileMenu.vue';
import TicketModalNumbers     from '../../components/TresMonazos/TicketModalNumbers.vue';
import PrintTicketNumbers     from '../../components/TresMonazos/PrintTicketNumbers .vue';
import TicketModal            from '@/modules/shared/components/TicketModal/TicketModal.vue';
import { TrashCanOutline } from 'mdue';
import { CalendarArrowLeft  } from 'mdue';
import { useI18n } from 'vue-i18n';
import { useUI } from '@/modules/shared/composables/useUI';
import { useTime } from '@/modules/shared/composables/useTime';
import { useGame } from '@/modules/lottery/composables/useGame';

import {checkEqualsDigits, checkDuplicateBetNumber, getRandomInRange } from '../../../shared/utils/utils.js';

export default defineComponent( {
 name: "TresMonazos",
 components:{  
    DisplayInfo,
    DisplayNumbers,   
    DisplayBet,      
    DisplayNotifications,   
    SelectType, 
    SelectBet, 
    SelectDate, 
    KeyBoard, 
    DeleteMobileMenu,
    TrashCanOutline,
    CalendarArrowLeft,
    DatesMobileMenu,
    TicketModal,
    TicketModalNumbers,
    PrintTicketNumbers 
    
  },
  setup(){

    const SET_BET_STATE = 'SET_BET_STATE';   
    const SET_NUMBER_STATE = 'SET_NUMBER_STATE';

    const ORDER_BET_TYPE = 'order';
    const DISORDER_BET_TYPE = 'disorder';
    const ORD_DIS_BET_TYPE = 'ord/dis';
    const LAST_TWO_BET_TYPE = 'last';

    const ERROR_TYPE_NOTIFICATION = 'error';
    const INFO_TYPE_NOTIFICATION = 'info';
    
    const MAX_BET = 4000;
    const MIN_BET = 100;
    const MAX_NUMBER_LENGHT = 3;
    const MAX_RAFFLES = 10;
    const DEFAULT_BET = '100';


    const { t } = useI18n();
    const { getDates } = useTime();    
    const { mobile, version, currency } = useUI();
    const { game, setGame, state, setState, bet, setBet, totalBet, validateBet, betType, setBetType, setNumber, raffleNumber, raffles, setRaffles, notificationText, notificationType, setNotification,
    resetGame, deleteRaffle,emptyRaffles, dates, setDates,changeDate,selectedDates, setSelectedDates, times, setTimes, changeTime, morningTime, nightTime, setMorningTime, setNightTime } = useGame();
    const { createRipple } = useRipple(); 

    const mobileDateMenu = ref(null);
    const deleteMobileMenu = ref(null);
    const defaultBetTypeIndex = ref(-1);
    const defaultBetIndex = ref(-1);
   
    setGame({name:'TresMonazos',img:'tresMonazosLogo.png'});    

    setBet(DEFAULT_BET);
    
    setState(SET_NUMBER_STATE);

    setBetType(ORDER_BET_TYPE);

    setDates(getDates(t));  

    setTimes(['M','N']);

    setMorningTime('12:00');

    setNightTime('19:00');


    
    const typeButtons = ref([
      {label:t('orderBetTypeLabel'),value:ORDER_BET_TYPE},
      {label:t('disorderBetTypeLabel'),value:DISORDER_BET_TYPE},
      {label:t('orderDisorderBetTypeLabel'),value:ORD_DIS_BET_TYPE},
      {label:t('lastTwoBetTypeLabel'),value:LAST_TWO_BET_TYPE}
      ]);
    const betButtons = ref(['100','200','300','400','500','1000','2000','...']);
    const keyBoardButtons = ref([
      {label:'7',value:'7'},
      {label:'8',value:'8'},
      {label:'9',value:'9'},
      {label:t('printLabelButton'),value:'print'},
      {label:'4',value:'4'},
      {label:'5',value:'5'},
      {label:'6',value:'6'},
      {label:'1',value:'1'},
      {label:'2',value:'2'},
      {label:'3',value:'3'},
      {label:t('enterLabelButton'),value:'insert'},
      {label:'<',value:'<'},
      {label:'0',value:'0'},
      {label:t('deleteLabelButton'),value:'delete'},
      ]);
   
    
    
   
    const showPrintModal = ref(false); 

   
    let customBet = false;
    let blindRooster = false;     

    if(mobile.value){
      betButtons.value = ['100','...'];
      typeButtons.value[2] = {label:t('orderDisorderBetTypeLabelShort'),value:ORD_DIS_BET_TYPE};
      
    }


    watch(state,()=>{
      
      if(state.value == SET_BET_STATE){

          keyBoardButtons.value[10] = {label:t('confirmLabelButton'),value:'confirm'};
          

      }else if(state.value == SET_NUMBER_STATE){

          keyBoardButtons.value[10] = {label:t('enterLabelButton'),value:'insert'};

      }
    });
   

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
      if(keyBoardValue.toLowerCase() == 'confirm'){
        
        onConfirm();
        return;
      }         
     

      switch (state.value) {
        case SET_NUMBER_STATE:
           
            setNumberValue(keyBoardValue);
          break;
        case SET_BET_STATE:

            if(customBet){
              setBet(keyBoardValue, true);
            }
            
          break;                 
        default:
          break;
      }

       
    }

    const onConfirm = () =>{
     
      switch (state.value) {
        case SET_BET_STATE:

            if( validateBet(MAX_BET,MIN_BET) ){

              customBet = false;

              setState(SET_NUMBER_STATE);

              if(raffleNumber.value.length > 0){

                setNotification(INFO_TYPE_NOTIFICATION,t('infoEnterNotification'));
              
              }else{

                setInitialNotification();
              }
              
            }

            defaultBetIndex.value = -1;
           
          break;    
      
        default:
          break;
      }

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
      
      changeDate(data);     
     
    }

    const  onTimeChange = (data) => {
     
      changeTime(data);     
    }

    const onClear = () =>{

      createRipple(event);      

      resetGame()

      setBet(DEFAULT_BET);

      setInitialNotification();
    }

    const onBetTypeChange = (value) =>{      
     
      setBetType(value);

      setNumber(''); 

      setInitialNotification();     
       
    }

    const onBetChange = (index) => {
      
      
      if(betButtons.value[index] == '...'){          
              
            setBet('-'); 

            customBet = true; 

            setState(SET_BET_STATE);           
          
      }else{
            
            customBet = false;

            setBet(betButtons.value[index]);
            
      }

       
    };

    const onBlindRooster = () =>{

       createRipple(event);

       blindRooster = true;

       switch (betType.value) {
         case ORDER_BET_TYPE:
         case DISORDER_BET_TYPE:
         case ORD_DIS_BET_TYPE:
         case LAST_TWO_BET_TYPE:
          
           setNumber( getRandomInRange(100,1000).toString(), false ,MAX_NUMBER_LENGHT );

           break;       
       
         default:
           break;
       }
    }


    /* NOTIFICATIONS */


    const setInitialNotification = () => {

       
        switch ( betType.value ) {
          case ORDER_BET_TYPE:
          case DISORDER_BET_TYPE:
            
            
            setNotification(INFO_TYPE_NOTIFICATION,t('infoNumber3NotificationMultiples'));
            break;

          case ORD_DIS_BET_TYPE:
          case LAST_TWO_BET_TYPE:
            
            setNotification(INFO_TYPE_NOTIFICATION,t('infoNumber3NotificationMultiples'));
            break;
        
          default:
            break;
        }
    } 


    /* VALIDATE FUNCTIONS */


    const validateNumber = () => {


             
        switch (betType.value) {
          case ORDER_BET_TYPE:
          case DISORDER_BET_TYPE:          
          case ORD_DIS_BET_TYPE:     
          case LAST_TWO_BET_TYPE:

             if(raffleNumber.value.length == 0){
               setNotification(INFO_TYPE_NOTIFICATION,t('infoNumber3NotificationMultiples'));
               return false;
             }

             if(raffleNumber.value.length == 1){
               setNotification(INFO_TYPE_NOTIFICATION,t('infoNumber2NotificationMultiples'));
               return false;
             }
             if(raffleNumber.value.length == 2){
               setNotification(INFO_TYPE_NOTIFICATION,t('infoNumber1NotificationMultiples'));
               return false;
             }
            

             if(checkEqualsDigits(raffleNumber.value)){
               setNotification(INFO_TYPE_NOTIFICATION,t('errorNotificationEqualsNumbers'));
               return false;
             }

            break;
        
          default:
            break;
        }
       

        return true;
    }
    

    /* DATA FUNCTIONS */
    const createRaffles = () => {


      if(selectedDates.value.length == 0){
        setNotification(ERROR_TYPE_NOTIFICATION,t('infoEmptyDate'));
        return;
      }

      let duplicate = false;

      selectedDates.value.forEach(d => {

        let raffleNumberType = '';

        switch (betType.value) {
          case ORDER_BET_TYPE:
            raffleNumberType = t('orderBetTypeLabel');           
            break;
          case DISORDER_BET_TYPE:
            raffleNumberType = t('disorderBetTypeLabel');
            break;
          case ORD_DIS_BET_TYPE:
            raffleNumberType = t('orderDisorderBetTypeLabel');
            break;
          case LAST_TWO_BET_TYPE:
            raffleNumberType = t('lastTwoBetTypeLabel');
            break;
        
          default:
            break;
        }

        

        if(blindRooster){
          raffleNumberType += ` (${t('ticketTypeBlindRooster')})`;
        }

        const raffle = {
          numbers:[raffleNumber.value],
          type:raffleNumberType,
          bet:bet.value,         
          date: `${d.date} ${d.time}`
        }

        if(checkDuplicateBetNumber(raffle,raffles.value)){

          duplicate = true;           
         
        }else{
            
         

          if(raffles.value.length < MAX_RAFFLES){

            setRaffles([...raffles.value,raffle]);

          }else{

            setNotification(ERROR_TYPE_NOTIFICATION,t('errorNotificationExcessNumbers'));
          }

          

        }
        

      
      });

      if(duplicate){

        setNotification(ERROR_TYPE_NOTIFICATION,t('errorNotificationDuplicateBet'));

      }else{

        setNumber('');

        if(raffles.value.length < MAX_RAFFLES){

            setInitialNotification();

        }

       

      }

     
    }


    const setNumberValue = (val) => {
       switch (val.toLowerCase()) {
        case 'delete':

          setNumber(val,true,MAX_NUMBER_LENGHT);
          setNotification(INFO_TYPE_NOTIFICATION,t('infoNumber3NotificationMultiples'));

          break;

        case '<':               

          setNumber(val,true,MAX_NUMBER_LENGHT);

          if(raffleNumber.value.length == 0){
            setNotification(INFO_TYPE_NOTIFICATION,t('infoNumber3NotificationMultiples'));
          }

          break;

        default:
          if(raffleNumber.value.length < MAX_NUMBER_LENGHT){

             
              setNumber(val,true,MAX_NUMBER_LENGHT);  
            

             if(raffleNumber.value.length == 1){
               setNotification(INFO_TYPE_NOTIFICATION,t('infoNumber2NotificationMultiples'));
             }
             if(raffleNumber.value.length == 2){
               setNotification(INFO_TYPE_NOTIFICATION,t('infoNumber1NotificationMultiples'));
             }
             if(raffleNumber.value.length == 3){
               setNotification(INFO_TYPE_NOTIFICATION,t('infoEnterNotification'));
             }
          }         
          
          break;      
       
      }
    }

    const onDelete = ( index )=>{
      
      deleteRaffle( index );

    };
   

    onMounted( ()=>{


      defaultBetTypeIndex.value = 0;
      defaultBetIndex.value = 0;
     

      let date = dates.value[0];
      date.time = times.value[0];
      setSelectedDates([date]);


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
      raffleNumber,
      raffles,
      notificationType,
      notificationText,
      dates,
      times,     
      morningTime,
      nightTime, 
      emptyRaffles, 

      mobileDateMenu,
      deleteMobileMenu,
      defaultBetTypeIndex,
      defaultBetIndex,
     
      typeButtons,
      betButtons,
      keyBoardButtons,   
     
     
       
      showPrintModal,
      onPrintAccept,
      onPrintCancel,
      onKeyBoardChange,
      onDateChange,
      onTimeChange,
      onBetTypeChange,    
      onClear, 
      onBetChange,        
      onDelete,
      onBlindRooster,
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
});