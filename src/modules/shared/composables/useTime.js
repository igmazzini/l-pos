

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

   

    return{
        getToday,
        getNowTime     
    }
}

