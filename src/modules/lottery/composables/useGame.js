import { computed, ref } from "vue";
import { useI18n } from 'vue-i18n';
import { useTime } from '@/modules/shared/composables/useTime';

export const useGame = ()=>{

    const ERROR_TYPE_NOTIFICATION = 'error';
    const INFO_TYPE_NOTIFICATION = 'info';

    const { t } = useI18n();
    const { checkLimitTime } = useTime();  

    const currentGame = ref({});
    const currentNumber = ref('');
    const currentBet = ref('');
    const currentBetType = ref('');
    const gameState = ref(''); 
    const gameSelectedDates = ref([]); 
    const gameDates = ref([]); 
    const gametimes = ref([]); 
    const gameMorningTime = ref(''); 
    const gameNightTime = ref(''); 
    const raffleNumbers = ref([]);
    const currentNotificationType = ref('');
    const currentNotificationText = ref('');  


    const game = computed( () =>  currentGame.value);    
    const raffleNumber = computed( () =>  currentNumber.value);
    const bet = computed( () =>  currentBet.value);
    const betType = computed( () =>  currentBetType.value);
    const state = computed( () =>  gameState.value);
    const dates = computed( () =>  gameDates.value);
    const selectedDates = computed( () =>  gameSelectedDates.value);
    const times = computed( () =>  gametimes.value);
    const morningTime = computed( () =>  gameMorningTime.value);
    const nightTime = computed( () =>  gameNightTime.value);
    const raffles = computed( () =>  raffleNumbers.value);
    const notificationText = computed( () =>  currentNotificationText.value);
    const notificationType = computed( () =>  currentNotificationType.value);
    const totalBet = computed( () =>  {

        let total = 0;
        raffleNumbers.value.forEach( raffle =>{
            total += Number(raffle.bet);
            if(raffle.reventadoBet && raffle.reventadoBet != '' && raffle.reventadoBet != '-'){
                total += Number(raffle.reventadoBet)
            }
        });

        return total;
    });

    const emptyRaffles = computed( ()=>{
        return (raffleNumbers.value.length > 0) ? false : true;
    });
   
    
    const setGame = ( val ) =>{
        currentGame.value = val;
    };

    const setBet = ( val, keyboard = false ) =>{

        if(!keyboard){

            currentBet.value = val;

        }else{

            switch (val.toLowerCase()) {
                case 'delete':
        
                  currentBet.value = '';
        
                  break;
        
                case '<':  
        
                currentBet.value = String(currentBet.value).slice(0, -1);
        
                  break;
        
                default:
        
                  if(currentBet.value == '-'){
                    currentBet.value = ''; 
                  }
        
                  currentBet.value += val;
                  
                  break;      
               
              }
        }
        
    };

    const setBetType = ( val ) =>{
        currentBetType.value = val;
    };

    const setState = ( val ) =>{
        gameState.value = val;
    };

    const setDates = ( val ) =>{
        gameDates.value = val;
    };

    const setSelectedDates = ( val ) =>{
        gameSelectedDates.value = val;
    };

    const setTimes = ( val ) =>{
        gametimes.value = val;
    };

    const setMorningTime = ( val ) =>{
        gameMorningTime.value = val;
    } 
    const setNightTime = ( val ) =>{
        gameNightTime.value = val;
    } 

    const setNumber = ( val, keyboard = false, maxNumberLenght = 2 ) =>{

        if(!keyboard){
            currentNumber.value = val;
        }else{

            switch (val.toLowerCase()) {
                case 'delete':
        
                currentNumber.value = '';
        
                  break;
        
                case '<':  
        
                currentNumber.value = String(currentNumber.value).slice(0, -1);
        
                  break;
        
                default:
                  if(currentNumber.value.length < maxNumberLenght){
                    currentNumber.value += val;
                  }         
                  
                break;      
               
            }

        }
        
        
    };

    const setRaffles = ( val ) =>{

        raffleNumbers.value = val;
    };

    const validateBet = (maxBet, minBet) =>{     

        if(bet.value.length == 0){
  
          setNotification(ERROR_TYPE_NOTIFICATION,t('errorNotificationBetZero'));
  
          return false;
          
        }
        if(bet.value == '-'){
          
          setNotification(INFO_TYPE_NOTIFICATION,t('infoBetAmount'));
  
          return false;
        }
        if(bet.value == '0'){
         
          setNotification(ERROR_TYPE_NOTIFICATION,t('errorNotificationBetZero'));
  
          return false;
        }
        if(Number(bet.value) > maxBet){
         
          setNotification(ERROR_TYPE_NOTIFICATION,t('infoBetAmountMaximum')+maxBet);
          
          return false;
        }
        if(Number(bet.value) < minBet){
          
          setNotification(ERROR_TYPE_NOTIFICATION,t('infoBetAmountMinimum')+minBet);
          return false;
        }
       
  
        return true;
    };

    const setNotification = (alertType,alertText) =>{
        currentNotificationType.value = alertType;
        currentNotificationText.value = alertText;
    };

    const resetGame  = () =>{

        currentNumber.value = '';
        raffleNumbers.value = [];
    }

    const deleteRaffle = ( index ) => {      

        raffleNumbers.value.splice(index,1);       
    }

    const  changeDate = (data) => {
      
        if(data.on){
  
          let date = dates.value[data.index];
  
          date.time = times.value[data.time];

          selectedDates.value.push(date);         
         
  
        }else{
  
          selectedDates.value.splice(dates.value[data.index],1)
  
        } 
        
       
    };

    const  changeTime = (data) => {
     
        if(data.on){
  
          let date = selectedDates.value.find((d) => d.date == dates.value[data.index].date);
          
          date.time = times.value[data.time];            
         
        }
        
    };


    const setDefaultDate = () =>{


      let defaultDateIndex = 0;
           
      const dateChecked = checkLimitTime(gameMorningTime.value, gameNightTime.value);

      let date = null;
     
      if(dateChecked.enableDate){

        date = dates.value[0];
        defaultDateIndex = 0;

        if(dateChecked.enableTime == 'M'){

          date.time = times.value[0];
          
        }else{
  
          date.time = times.value[1];
        }
       

      }else{

        date = dates.value[1];
        date.time = times.value[0];
        defaultDateIndex = 1;
      

      }          

      setSelectedDates([date]);


      return defaultDateIndex;
    }

   

    return{
        game,
        raffleNumber,
        bet,
        betType,
        state,
        dates,
        selectedDates,
        times,
        morningTime,
        nightTime,
        raffles,
        totalBet,
        notificationText,
        notificationType,
        emptyRaffles,
        setGame,
        setBet,
        setBetType,
        setState,
        setDates,
        setSelectedDates,
        setTimes,
        setMorningTime,
        setNightTime,
        setRaffles,
        deleteRaffle,
        setNumber,
        validateBet,
        setNotification,
        resetGame,
        changeDate,
        changeTime,
        setDefaultDate

    }
};