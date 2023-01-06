import { onMounted, ref, watch, defineComponent } from 'vue';



import {DatesMobileMenu, DisplayNumbers, DisplayBet, DisplayReventadosBet, DisplayNotifications,
SelectType, SelectBet, SelectDate, KeyBoard, DeleteMobileMenu}  from '@/modules/lottery/components';

import TicketModal            from '@/modules/shared/components/TicketModal/TicketModal.vue';
import TicketModalNumbers     from '../../components/NuevosTiempos/TicketModalNumbers.vue';
import PrintTicketNumbers     from '../../components/NuevosTiempos/PrintTicketNumbers .vue';
import DisplayInfo            from '../../components/NuevosTiempos/DisplayInfo.vue'

import { useI18n } from 'vue-i18n';
import {checkEqualsDigits, checkDuplicateBetNumber , getRandomInRange} from '@/modules/shared/utils/utils.js';
import { useTime, useRipple, useUI } from '@/modules/shared/composables';
import { useGame, useGameUI } from '@/modules/lottery/composables';




export default defineComponent({
  name: "NuevosTiempos",
  components:{  
    DisplayInfo,
    DisplayNumbers,   
    DisplayBet,   
    DisplayReventadosBet,   
    DisplayNotifications,   
    SelectType, 
    SelectBet, 
    SelectDate, 
    KeyBoard, 
    DeleteMobileMenu,      
    DatesMobileMenu,
    TicketModal,
    TicketModalNumbers,
    PrintTicketNumbers 
    
  },
  setup(){


    const SET_BET_STATE = 'SET_BET_STATE';
    const SET_BUSTED_BET_STATE = 'SET_BUSTED_BET_STATE';
    const SET_NUMBER_STATE = 'SET_NUMBER_STATE';
    const ERROR_TYPE_NOTIFICATION = 'error';
    const INFO_TYPE_NOTIFICATION = 'info';
    const MAX_BET = 4000;
    const MIN_BET = 100;
    const DEFAULT_BET = 100;
    const MAX_RAFFLES = 10;
    const MAX_NUMBER_LENGHT = 2;
    const EXACT_BET_TYPE = 'exact';
    const REVERSIBLE_BET_TYPE = 'reversible';
    const FIRST_BET_TYPE = 'first';
    const TERMINATION_BET_TYPE = 'termination';


    const { t } = useI18n();
    const { getDates } = useTime();    
    const { mobile, version, currency, lang } = useUI();
    const { game, setGame, state, setState, bet, setBet, totalBet, validateBet, betType, setBetType, setNumber, raffleNumber, raffles, setRaffles, notificationText, notificationType, setNotification,
    resetGame, deleteRaffle,emptyRaffles, dates, setDates,changeDate,selectedDates, setDefaultDate, times, setTimes, changeTime, morningTime, nightTime, setMorningTime, setNightTime } = useGame();
    const {deleteMobileMenu, mobileDateMenu, printModal, defaultBetTypeIndex, setDefaultBetTypeIndex, defaultBetIndex, setDefaultBetIndex, defaultDateIndex, setDefaultDateIndex,
     blindRooster, setBlindRoosterMode , customBet , setCustomBetMode, showDeleteMenu, hideDeleteMenu, showPrintModal, hidePrintModal, showDatesMenu, hideDatesMenu } = useGameUI();  
    const { createRipple } = useRipple(); 

      
    const displayReventadosBet = ref(null);  
    const bustedBetValue = ref('-');      
    const bustedEnabled = ref(true);
    let bustedOn = false;

    const typeButtons = ref([
      {label:t('exactBetTypeLabel'),value:EXACT_BET_TYPE},
      {label:t('reversibleBetTypeLabel'),value:REVERSIBLE_BET_TYPE},
      {label:t('firstBetTypeLabel'),value:FIRST_BET_TYPE},
      {label:t('terminationBetTypeLabel'),value:TERMINATION_BET_TYPE}
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

    if(mobile.value){
      betButtons.value = ['100','...'];
    }  


    setGame({name:'NuevosTiempos',img:'nuevosTiemposLogo.png'});    
    
    setState(SET_NUMBER_STATE);

    setBetType(EXACT_BET_TYPE);

    setDates(getDates(t));  

    setTimes(['M','N']);

    setMorningTime('12:00');

    setNightTime('19:00');

    setDefaultDateIndex( setDefaultDate() );  
    
    
    watch(lang, ()=>{
      
      setDates(getDates(t));  

      setButtonsLabels();

      setInitialNotification();
      

    });

    watch(mobile, ()=>{        

      setButtonsLabels();         

    });
    

    watch(state,()=>{
      
      if(state.value == SET_BET_STATE || state.value == SET_BUSTED_BET_STATE){

          keyBoardButtons.value[10] = {label:t('confirmLabelButton'),value:'confirm'};
          

      }else if(state.value == SET_NUMBER_STATE){

          keyBoardButtons.value[10] = {label:t('enterLabelButton'),value:'insert'};

      }
    });
      

    watch(raffleNumber,(val)=>{        
       

        if(val.length == 0 && blindRooster){
          setBlindRoosterMode(false);
        }
      
    });


    /* UI FUNCTIONS */


    const setButtonsLabels = () =>{

     keyBoardButtons.value  = [
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
        ];  


       typeButtons.value = [
          {label:t('exactBetTypeLabel'),value:EXACT_BET_TYPE},
          {label:t('reversibleBetTypeLabel'),value:REVERSIBLE_BET_TYPE},
          {label:t('firstBetTypeLabel'),value:FIRST_BET_TYPE},
          {label:t('terminationBetTypeLabel'),value:TERMINATION_BET_TYPE}
          ];
        
        if(mobile.value){
          betButtons.value = ['100','...'];
        }else{
          betButtons.value = ['100','200','300','400','500','1000','2000','...']; 
        }

          
    }    

    const onKeyBoardChange = (keyBoardValue) => {
     
      hideDeleteMenu();
      
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
            setNumber(keyBoardValue, true,  MAX_NUMBER_LENGHT);
          break;
        case SET_BET_STATE:

            if(customBet.value){

              setBet(keyBoardValue,true);

            }
            
          break;
        case SET_BUSTED_BET_STATE:

            if(customBet.value){
              setBustedBetValue(keyBoardValue);
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

              setCustomBetMode(false)
             
              setState(SET_NUMBER_STATE);

              if(raffleNumber.value.length > 0){

                setNotification(INFO_TYPE_NOTIFICATION,t('infoEnterNotification'));

              }else{

                setInitialNotification();
              }
              
            }

            
            setDefaultBetIndex(-1);
           
          break;
        case SET_BUSTED_BET_STATE:
            
            if( validateBustedBet()){ 

              setCustomBetMode(false)
             
              setState(SET_NUMBER_STATE);

              if(raffleNumber.value.length > 0){

                setNotification(INFO_TYPE_NOTIFICATION,t('infoEnterNotification'));

              }else{

                setInitialNotification();

              }
            }

            setDefaultBetIndex(-1);

          break;
      
        default:
          break;
      }

    }

    const onInsert = () =>{
       
        if(!validateBet(MAX_BET,MIN_BET)) return;
        if(bustedOn && !validateBustedBet()) return;
        if(!validateNumber()) return;

        createRaffles();
        
    }       
   
    const onClear = () =>{

      createRipple(event);      

      resetGame()

      setBet(DEFAULT_BET);

      setInitialNotification();
    }

    const onBlindRooster = () =>{

       createRipple(event);

       hideDeleteMenu();

       setBlindRoosterMode(true);

       switch (betType.value) {
         case EXACT_BET_TYPE:
         case REVERSIBLE_BET_TYPE:
          
           setNumber( getRandomInRange(0,99).toString(), false ,MAX_NUMBER_LENGHT );

           break;
         case FIRST_BET_TYPE:
         case TERMINATION_BET_TYPE:
          
           setNumber( getRandomInRange(0,9).toString(), false, MAX_NUMBER_LENGHT );

           break;
       
         default:
           break;
       }
    }

    const onBetChange = (index) => {

      
      
       if(bustedOn && state.value == SET_BUSTED_BET_STATE){
         if(betButtons.value[index] == '...'){
          
            bustedBetValue.value = '-';   

            setCustomBetMode(true);

            
          }else{   

            setCustomBetMode(false);  

            bustedBetValue.value = betButtons.value[index];           
          }

       }else{

          if(betButtons.value[index] == '...'){          
              
            setBet('-'); 

            setCustomBetMode(true); 

            setState(SET_BET_STATE);
           
          
          }else{
            
            setCustomBetMode(false);

            setBet(betButtons.value[index]);
            
          }

       } 

       
    }

    const onBetTypeChange = (value) =>{      
     
     
      setBetType(value);

      setNumber('');     


      if(betType.value != EXACT_BET_TYPE){        

        if(bustedOn){
          
          setState(SET_NUMBER_STATE);

          displayReventadosBet.value.bustedOff();         
        }
        
        bustedOn = false;
        bustedBetValue.value = '-';
        bustedEnabled.value = false;

      }else{

         bustedEnabled.value = true;

      }  


      setInitialNotification();

      
       
    }

    const onBetTap = () => {

      setBet('-'); 

      setCustomBetMode(true);        

      setState(SET_BET_STATE);

      if(mobile){

        setDefaultBetIndex(1);

      }else{

        setDefaultBetIndex(7)

      } 
     
    }

    const onBustedChange = (val) => {

      bustedOn = val;
      
      if(bustedOn){

        bustedBetValue.value = DEFAULT_BET.toString();
        
        setState(SET_BUSTED_BET_STATE);

      }else{

        bustedBetValue.value = '-';  

        setState(SET_NUMBER_STATE);
        
      }       
      
    }

    const onBustedBetTap = () => {

      if(bustedOn){
       
        bustedBetValue.value = '-';  
       
        setState(SET_BUSTED_BET_STATE);  

        setCustomBetMode(true);   

        if(mobile){

          setDefaultBetIndex(1);

        }else{

          setDefaultBetIndex(7);
        } 
      }
    }   

    const onDelete = (index)=>{      
        
        deleteRaffle( index );
        
    };

    const onDateChange = ( data ) =>{
        
        changeDate(data);
    };

    const onTimeChange = ( data ) =>{
        
        changeTime(data);
    };

    const onPrint = () =>{
        showPrintModal();
    };

    const onPrintAccept = () =>{
      onClear();
      hidePrintModal();
    }  
    
    const onPrintCancel = () =>{
      hidePrintModal();
    };

    const onMobileDelete = () =>{
      showDeleteMenu()
    };

    const onMobileMenuClear = () =>{

      onClear();       
      hideDeleteMenu();

    };   

    const  onMobileMenuClose = () =>{
        hideDeleteMenu();
    }; 
    
    const onMobileDates = () =>{
        showDatesMenu();
    };
   
      
    const onMobileDatesAccept = () =>{
        hideDatesMenu()
    };

    const  onMobileDatesCancel = () =>{
      hideDatesMenu();
    };
    
    
    const onMobileDatesClose = () =>{
        hideDatesMenu();
    };

    

  


    /* END UI FUNCTIONS */

    const validateBustedBet = () =>{
      

      if(bustedBetValue.value.length == 0){

         setNotification(ERROR_TYPE_NOTIFICATION,t('infoReventadoAmount'));
         return false;
      }
      if(bustedBetValue.value == '-'){

         setNotification(ERROR_TYPE_NOTIFICATION,t('infoReventadoAmount'));
         return false;
      }
      if(bustedBetValue.value == '0'){

         setNotification(ERROR_TYPE_NOTIFICATION,t('errorReventadoBetZero'));
         return false;
      }
      if(Number(bustedBetValue.value) > Number(bet.value)){

         setNotification(ERROR_TYPE_NOTIFICATION,t('errorReventadoAmountBiggerBet'));
         return false;
      }
      if((Number(bustedBetValue.value) + Number(bet.value)) > MAX_BET){
        
        setNotification(ERROR_TYPE_NOTIFICATION,t('infoBetAmountMaximum')+MAX_BET);
        return false;
      }

      

      return true;
    }

    const validateNumber = () => {


             
        switch (betType.value) {
          case EXACT_BET_TYPE:

             if(raffleNumber.value.length == 0){

               setNotification(INFO_TYPE_NOTIFICATION,t('infoInitNotification1'));

               return false;

             }

            
            break;
          case REVERSIBLE_BET_TYPE:

             if(raffleNumber.value.length == 0){

               setNotification(INFO_TYPE_NOTIFICATION,t('infoInitNotification1'));

               return false;
             }            
            
            
             if(checkEqualsDigits(raffleNumber.value)){

               setNotification(INFO_TYPE_NOTIFICATION,t('errorNotificationEqualsNumbers'));

               return false;
             }
            
            break;
          case FIRST_BET_TYPE:

             if(raffleNumber.value.length == 0){

               setNotification(INFO_TYPE_NOTIFICATION,t('infoInitNotification2'));

               return false;
             }

             if(Number(raffleNumber.value) > 9){

               setNotification(INFO_TYPE_NOTIFICATION,t('errorNotificationInvalidNumber2'));

               return false;
             }
            
            break;
          case TERMINATION_BET_TYPE:

            if(raffleNumber.value.length == 0){

              setNotification(ERROR_TYPE_NOTIFICATION,t('infoInitNotification2'));

              return false;
            }

            if(Number(raffleNumber.value) > 9){

              setNotification(ERROR_TYPE_NOTIFICATION,t('errorNotificationInvalidNumber2'));

              return false;
            }
            
            break;
        
          default:
            break;
        }
       

        return true;
    }


    /*  {numbers:['65'],type:'Terminacion (GT)',date:'24/11 N',bet:'1000000',reventadoBet:'1000000'} */
    const createRaffles = () => {     


      if(selectedDates.value.length == 0){
        setNotification(ERROR_TYPE_NOTIFICATION,t('infoEmptyDate'));
        return;
      }

      let duplicate = false;

      selectedDates.value.forEach(d => {

        let raffleNumberType = '';

        switch (betType.value) {
          case EXACT_BET_TYPE:
            raffleNumberType = t('exactBetTypeLabel');           
            break;
          case REVERSIBLE_BET_TYPE:
            raffleNumberType = t('reversibleBetTypeLabel');
            break;
          case FIRST_BET_TYPE:
            raffleNumberType = t('firstBetTypeLabel');
            break;
          case TERMINATION_BET_TYPE:
            raffleNumberType = t('terminationBetTypeLabel');
            break;
        
          default:
            break;
        }

        //raffleNumberType = raffleNumberType[0].toUpperCase() + raffleNumberType.substr(1,raffleNumberType.length);

        if(blindRooster.value){
            raffleNumberType += ` (${t('ticketTypeBlindRooster')})`;
        }

        const raffle = {
          numbers:[raffleNumber.value],
          type:raffleNumberType,
          bet:bet.value,
          reventadoBet:bustedBetValue.value,
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

    const setBustedBetValue = (val) => {
       switch (val.toLowerCase()) {
        case 'delete':

          bustedBetValue.value = '';

          break;

        case '<':  

          bustedBetValue.value = String(bustedBetValue.value).slice(0, -1);

          break;

        default:

          if(bustedBetValue.value == '-'){

            bustedBetValue.value = ''; 
            
          }

          bustedBetValue.value += val;
          
          break;      
       
      }
    }

   
    const setInitialNotification = () => {

        switch ( betType.value ) {
          case EXACT_BET_TYPE:
          case REVERSIBLE_BET_TYPE:
            
            setNotification(INFO_TYPE_NOTIFICATION,t('infoInitNotification1'));
            break;

          case FIRST_BET_TYPE:
          case TERMINATION_BET_TYPE:
            
            setNotification(INFO_TYPE_NOTIFICATION,t('infoInitNotification2'));
            break;
        
          default:
            break;
        }
    }



   

    /* LIFE CYCLE */

    onMounted(()=>{

      setDefaultBetTypeIndex(0);
      setDefaultBetIndex(0);    

      setInitialNotification();
     
    });


    /* END LIFE CYCLE */

   
    

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

      
      typeButtons,
      betButtons,
      keyBoardButtons,     
     
       
       
      bustedBetValue,     
      mobileDateMenu,     
      bustedEnabled,
      deleteMobileMenu,
      displayReventadosBet,
      defaultBetTypeIndex,
      defaultBetIndex,     
      defaultDateIndex,
      printModal,
      onClear,
      onKeyBoardChange,
      onBetChange,
      onBetTap,
      onBustedChange,
      onBustedBetTap,
      onBetTypeChange,  
      onBlindRooster,        
      onDateChange,
      onTimeChange,     
      onPrintAccept, 
      onPrintCancel, 
      onDelete,        
      onMobileDelete,
      onMobileMenuClose,
      onMobileMenuClear,
      onMobileDatesAccept,
      onMobileDates,
      onMobileDatesClose,
      onMobileDatesCancel,
     
    }
  }
  
});