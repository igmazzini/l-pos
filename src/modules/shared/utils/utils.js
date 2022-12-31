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
export const checkDuplicateBetNumber = (betNumber,betNumbers,multiplesNumbers = false)=>{

    console.log(multiplesNumbers)

    const checkNumbers = (checkNumbers, numbers,multiplesNumbers = false)=>{
       

        let out = false;

        if(multiplesNumbers){         

            if(JSON.stringify(checkNumbers) === JSON.stringify(numbers)){ 

                out = true;
            }   
        }else{
            checkNumbers.forEach(n => {
                if(numbers.indexOf(n) > -1){
                    out = true;               
                }   
            });
        }

      


        return out;
       
    }

    let duplicate = false;

    betNumbers.forEach(bet => {     

       if(betNumber.type == bet.type &&
          betNumber.date == bet.date &&                             
          betNumber.bet == bet.bet   &&
          checkNumbers(betNumber.numbers, bet.numbers,multiplesNumbers) ){

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

export const getRandomIntExcludingExistingNumbers = (min, max, excludeArrayNumbers) => {

    let randomNumber;

    if(!Array.isArray(excludeArrayNumbers)) {
      randomNumber = getRandomInRange(min, max);
      return randomNumber;
    }

    do {
      randomNumber =  getRandomInRange(min, max);
    } while ((excludeArrayNumbers || []).includes(randomNumber));

    return randomNumber;
  }

export const hasDuplicates = (arry ) => {

    const duplicates = arry.filter((item, index) => arry.indexOf(item) !== index);

    return (duplicates.length > 0) ? true : false;
};