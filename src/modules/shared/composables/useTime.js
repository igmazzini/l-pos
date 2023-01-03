

export const useTime = () => {


  const getToday = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    return dd + "/" + mm;
  }

  const getZeroPad = (n) => {
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
        date: dd + "/" + String(Number(mm) + 1),
      },
    ];

    for (let i = 0; i < 8; i++) {
      //new Date(1995,11,17);
      let weekDay = new Date(yyyy, mm, Number(dd) + i + 1);
      let date = String(weekDay.getDate()).padStart(2, "0") + "/" + String(weekDay.getMonth() + 1).padStart(2, "0"); //January is 0!

      const day = {
        weekday: weekDays[weekDay.getDay()],
        date: date,
        time: '-'
      };

      days.push(day);

    }

    return days;

  }

  const checkLimitTime = (morningTime, nightTime) => {

    console.log(morningTime)
    console.log(nightTime)

    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    let nowTime = hours + ':' + minutes + ':' + seconds;
    let limitMorningTime = morningTime+':00';
    let limitNightTime = nightTime+':00';

    let nowDate = new Date(currentDate.getTime());
    nowDate.setHours(nowTime.split(":")[0]);
    nowDate.setMinutes(nowTime.split(":")[1]);
    nowDate.setSeconds(nowTime.split(":")[2]);

    let limitMorningDate = new Date(currentDate.getTime());
    limitMorningDate.setHours(limitMorningTime.split(":")[0]);
    limitMorningDate.setMinutes(limitMorningTime.split(":")[1]);
    limitMorningDate.setSeconds(limitMorningTime.split(":")[2]);

    let limitNightDate = new Date(currentDate.getTime());
    limitNightDate.setHours(limitNightTime.split(":")[0]);
    limitNightDate.setMinutes(limitNightTime.split(":")[1]);
    limitNightDate.setSeconds(limitNightTime.split(":")[2]);


    console.log('limitMorningDate',limitMorningDate);
    console.log('limitNightDate',limitNightDate);

    let outData = {
      enableDate:false,
      enableTime:''

    }

    if(nowDate > limitMorningDate){
                  
    
      outData.enableTime = 'N';

    }else{

      outData.enableTime = 'M';
    }



    if (nowDate > limitNightDate) {
      outData.enableDate = false;
     

    } else {

      outData.enableDate = true;
      
    }

    return outData;

  }

  return {
    getToday,
    getDates,
    getNowTime,
    checkLimitTime
  }
}

