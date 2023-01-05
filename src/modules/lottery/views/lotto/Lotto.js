import { defineComponent, ref, onMounted, watch, watchEffect } from 'vue';


import { DisplayNumbers, SelectDay, DisplayBet, DisplayNotifications,
KeyBoard, DeleteMobileMenu, ToggleButton}  from '@/modules/lottery/components';

import TicketModalNumbers     from '../../components/Lotto/TicketModalNumbers.vue';
import PrintTicketNumbers     from '../../components/Lotto/PrintTicketNumbers .vue';
import DisplayInfo            from '../../components/Lotto/DisplayInfo.vue'
import TicketModal            from '@/modules/shared/components/TicketModal/TicketModal.vue';

import { useI18n } from 'vue-i18n';
import { useTime, useRipple, useUI } from '@/modules/shared/composables';
import { useGame, useGameUI } from '@/modules/lottery/composables';
import { checkDuplicateBetNumber, getRandomIntExcludingExistingNumbers, hasDuplicates } from '@/modules/shared/utils/utils.js';

export default  defineComponent({
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
    const MAX_NUMBER = 40;
    const MAX_NUMBER_LENGHT = 2;
    const MAX_RAFFLES = 8;
    const DEFAULT_BET = 600;
    const REVENGE_BET = 400;

    const { t } = useI18n();
    const { getDates } = useTime();    
    const { mobile, version, currency, lang } = useUI();
    const { game, setGame, state, setState, bet, setBet, totalBet, validateBet, betType, setBetType, raffles, setRaffles, notificationText, notificationType, setNotification,
    resetGame, deleteRaffle,emptyRaffles, times, setTimes, changeTime, morningTime, nightTime, setMorningTime, setNightTime } = useGame();
    
    const {deleteMobileMenu, mobileDateMenu, printModal,  blindRooster, setBlindRoosterMode , showDeleteMenu, hideDeleteMenu, showPrintModal, hidePrintModal, showDatesMenu, hideDatesMenu } = useGameUI();  
   
    const { createRipple } = useRipple();
    const raffleDays = ref([]);
    const raffleDay = ref('');   

    const raffleNumbers = ref(['','','','','']);


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

         

    setGame({name:'Lotto',img:'lottoLogo.png'});    

    setBet(DEFAULT_BET);
    
    setState(FIRST_NUMBER_STATE);

    setBetType(COMMON_BET_TYPE);     

    setTimes(['M','N']);

    setMorningTime('12:00');

    setNightTime('19:00');     
   
    watch(mobile,()=>{

      setButtonsLabels();
      
    });  
    

    watch(lang,()=>{

      setButtonsLabels();

      setRaffleDays();

      setInitialNotification();
      
    });  

    watchEffect(()=>{      

      if(mobile.value && !blindRooster.value && raffleNumbers.value[0].length > 0){
          keyBoardButtons.value[13] = {label:t('nextLabelButton'),value:'confirm'};
      }

      if(mobile.value && raffleNumbers.value[4].length > 0){
          keyBoardButtons.value[13] = {label:t('enterLabelButton'),value:'insert'};
      }

    });

   


     /* UI FUNCTIONS  */


    const setButtonsLabels = () =>{


       
        

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
    };

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
        return
      }         
     

      setNumberValue(keyBoardValue);
       
    };


    const onInsert = () =>{
       
        if(!validateBet(MAX_BET,MIN_BET)) return;       
        if(!validateNumber()) return;

        createRaffles();
        
    };

    const onConfirm = () =>{

      if(raffleNumbers.value[0].length > 0){

        if(Number(raffleNumbers.value[0]) > MAX_NUMBER){

          setNotification(ERROR_TYPE_NOTIFICATION,`${t('errorMaxNumber')} ${MAX_NUMBER}`);

        }else{

          setNotification(INFO_TYPE_NOTIFICATION,t('infoNumber5NotificationByStep'));

          setState(SECOND_NUMBER_STATE);
        }

        
      }

      if(raffleNumbers.value[1].length > 0){

        
        if(Number(raffleNumbers.value[1]) > MAX_NUMBER){

          setNotification(ERROR_TYPE_NOTIFICATION,`${t('errorMaxNumber')} ${MAX_NUMBER}`);

        }else{

          setNotification(INFO_TYPE_NOTIFICATION,t('infoNumber5NotificationByStep'));

          setState(THIRD_NUMBER_STATE);
        }
      }

      if(raffleNumbers.value[2].length > 0){

        
        if(Number(raffleNumbers.value[2]) > MAX_NUMBER){

          setNotification(ERROR_TYPE_NOTIFICATION,`${t('errorMaxNumber')} ${MAX_NUMBER}`);
          

        }else{

          setNotification(INFO_TYPE_NOTIFICATION,t('infoNumber5NotificationByStep'));

          setState(FOURTH_NUMBER_STATE);

        }
      }

      if(raffleNumbers.value[3].length > 0){

        
        if(Number(raffleNumbers.value[3]) > MAX_NUMBER){

          setNotification(ERROR_TYPE_NOTIFICATION,`${t('errorMaxNumber')} ${MAX_NUMBER}`);

        }else{

          setNotification(INFO_TYPE_NOTIFICATION,t('infoNumber5NotificationByStep'));

          setState(FIFTH_NUMBER_STATE);

        }
      }
     
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

    const  onDateChange = (data) => {
      
     
      raffleDay.value = data;
     
    }

    const  onTimeChange = (data) => {
     
      changeTime(data);     
    }

    const onClear = () =>{

      createRipple(event);        
      
      deleteNumbers();

      resetGame()

      setState(FIRST_NUMBER_STATE);

      setInitialNotification();
    }

    const onBetTypeChange = (value) =>{        
     

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

       setBlindRoosterMode( true );

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

       setNotification(INFO_TYPE_NOTIFICATION,t('infoEnterNotification'));
       
    }

    /* NOTIFICATIONS */


    const setInitialNotification = () => {

       
        setNotification(INFO_TYPE_NOTIFICATION,t('infoNumber5Notification'));
    } 


     /* VALIDATE FUNCTIONS */


    const validateNumber = () => {

        if(state.value != COMPLETED_NUMBERS_STATE){
            setNotification(ERROR_TYPE_NOTIFICATION,t('infoEmptyDate'));
            return false;
        }


        if( hasDuplicates(raffleNumbers.value) ) {

          setNotification(ERROR_TYPE_NOTIFICATION,t('errorNotificationRepeatNumbers'));

          return false;

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
        
        const numbers = raffleNumbers.value.map( number =>{
          if(number.length == 1){
            number = `0${number}`
          }
          return number;
        })
       

        const raffle = {
          numbers,
          type:betType.value,
          bet:bet.value,  
          blindRooster: (blindRooster.value) ?   t('ticketTypeBlindRooster') : '',    
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

        setBlindRoosterMode( false );

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
          
          setNotification(INFO_TYPE_NOTIFICATION,t('infoNumber5NotificationByStep'));

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

            } 
            
            break;
          case SECOND_NUMBER_STATE:

            if(raffleNumbers.value[1].length < MAX_NUMBER_LENGHT){

              raffleNumbers.value[1] += val;

            }

            break;
          case THIRD_NUMBER_STATE:


            if(raffleNumbers.value[2].length < MAX_NUMBER_LENGHT){

              raffleNumbers.value[2] += val;

            }

            break;
          case FOURTH_NUMBER_STATE:

            if(raffleNumbers.value[3].length < MAX_NUMBER_LENGHT){

              raffleNumbers.value[3] += val;

            }

            break;
          case FIFTH_NUMBER_STATE:

            if(raffleNumbers.value[4].length < MAX_NUMBER_LENGHT){

              raffleNumbers.value[4] += val;

              setState(COMPLETED_NUMBERS_STATE);

              setNotification(INFO_TYPE_NOTIFICATION,t('infoEnterNotification'));

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
      
      if(mobile.value ){
        switch (state.value) {
          case FIRST_NUMBER_STATE:          
          

            raffleNumbers.value[0] = '';
           
            break;
          case SECOND_NUMBER_STATE:     
          
            if(raffleNumbers.value[1].length == 0){

              raffleNumbers.value[0] = '';
              setState(FIRST_NUMBER_STATE);

            }else{

              raffleNumbers.value[1] = '';

            }   
           
            

            break;
          case THIRD_NUMBER_STATE:

            if(raffleNumbers.value[2].length == 0){

              raffleNumbers.value[1] = ''; 
              setState(SECOND_NUMBER_STATE);

            }else{

              raffleNumbers.value[2] = '';
              
            }   

            break;
          case FOURTH_NUMBER_STATE:

            if(raffleNumbers.value[3].length == 0){

               raffleNumbers.value[2] = ''; 
              setState(THIRD_NUMBER_STATE);

            }else{

              raffleNumbers.value[3] = '';
              
            } 

            break;
          case FIFTH_NUMBER_STATE:

            if(raffleNumbers.value[4].length == 0){

              raffleNumbers.value[3] = ''; 
              setState(FOURTH_NUMBER_STATE);

            }else{

              raffleNumbers.value[4] = '';
              
            } 

            break;
          case COMPLETED_NUMBERS_STATE:

            raffleNumbers.value[4] = '';

            setState(FIFTH_NUMBER_STATE);

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

      raffleNumbers.value = ['','','','',''];

      setState(FIRST_NUMBER_STATE);
        
      setNotification(INFO_TYPE_NOTIFICATION,t('infoNumber5Notification'));
        

          
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
      printModal,
      mobileDateMenu,
      deleteMobileMenu,       
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

      onMobileDelete,
      onMobileMenuClose,
      onMobileMenuClear,
      onMobileDates,
      onMobileDatesClose,
      onMobileDatesCancel,
      onMobileDatesAccept
    }
  }
});