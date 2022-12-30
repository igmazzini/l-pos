export const checkEqualsDigits = (number)=>{

    let digits = String(number).split('');
    let equals_digit = [digits[0]];

    digits.forEach(d => {
        if (equals_digit.indexOf(d) == -1) {
            equals_digit.push(d);
        } 
    });
   
    if (digits.length > 1 && equals_digit.length == 1) {
       return true;
    }else{
       return false;
    }
}
export const checkDuplicateBetNumber = (betNumber,betNumbers)=>{



    const checkNumbers = (checkNumbers, numbers)=>{

        let out = false;

        checkNumbers.forEach(n => {
            if(numbers.indexOf(n) > -1){
                out = true;               
            }   
        });


        return out;
       
    }

    let duplicate = false;

    betNumbers.forEach(bet => {     

       if(betNumber.type == bet.type &&
          betNumber.date == bet.date &&                             
          betNumber.bet == bet.bet   &&
          checkNumbers(betNumber.numbers, bet.numbers) ){

            duplicate =  true;            

       }
        
    });


    return duplicate;

   
}

export const getRandomInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }