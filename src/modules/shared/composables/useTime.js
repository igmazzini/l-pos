

export const useTime = () => {
   
   
    const getToday = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        return dd + "/" + mm;
    }

    const  getZeroPad = (n) => {
        return (parseInt(n, 10) >= 10 ? "" : "0") + n;
    }

    const getNowTime = () => {
       
        let now = new Date();
        let hours = now.getHours();
        let minutes = getZeroPad(now.getMinutes());      
        
        return hours + ":" + minutes
    }

    const getDates = (t) => {

        let days = [];

        let weekDays = [
          t('day6'),
          t('day0'),
          t('day1'),
          t('day2'),
          t('day3'),
          t('day4'),
          t('day5')
           ];
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth()).padStart(2, "0"); //January is 0!
        let yyyy = today.getFullYear();
  
        days = [
          {
            weekday: t('todayLabel'),
            date: dd + "/" + String(Number(mm)+1),
          },
        ];
  
        for (let i = 0; i < 8; i++) {
          //new Date(1995,11,17);
          let weekDay = new Date(yyyy, mm, Number(dd) + i + 1);
          let date =  String(weekDay.getDate()).padStart(2, "0") +"/" +String(weekDay.getMonth() + 1).padStart(2, "0"); //January is 0!
  
          const day = {
            weekday: weekDays[weekDay.getDay()],
            date: date,
            time:'-'
          };
  
          days.push(day);
          
        }

        return days;
       
      }

   

    return{
        getToday,
        getDates,
        getNowTime     
    }
}

