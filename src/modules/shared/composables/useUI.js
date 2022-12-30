import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from 'vue-i18n';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";

export const useUI = () => {

    const store = useStore();
    const { t } = useI18n(); 

   const subString = (text, characters = 15) =>{
      return String(text).substring(0,characters);
   }

    const getIndex = (index) => {
        const alphabet = [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ];
        return alphabet[index];
      }

      const formatAmount = (amount) =>{
        return `${store.state.currency} ${amount}`;
      }

      const getPrintDate = () =>{
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');       
        const month = now.getMonth();
        const yyyy = now.getFullYear();
        const hour = now.getHours();
        const minute = now.getMinutes();

        return `${t(`day${now.getDay()}`)} ${dd} ${t(`month${month}`)} ${yyyy} ${hour}:${minute}`;
      }


      const printTicket = (ticket,ticketImage, gameName,  numbersAmount, maxNumbers) =>{

       
        const minDocHeight = 80;
        const maxDocHeight = 110;
        let docWidth = 55; 
        let docHeight = maxDocHeight; 

       

        if(numbersAmount < maxNumbers){
          docHeight = minDocHeight + (numbersAmount  * 3);
        }

        let doc = new jsPDF('p', 'mm', [docHeight, docWidth]); //310mm high 55mm wide        
        let scaleCanvas = null;    
         

        if(!store.state.mobile){
          scaleCanvas = 1.5;
        }     

        html2canvas(ticket,{scale:scaleCanvas, width: ticket.offsetWidth,
        height: ticket.offsetHeight}).then(function(canvas) {

            const imgData = canvas.toDataURL('image/png');      
            
            const fileName = `${gameName}-${getPrintDate().replaceAll(' ','-')}.pdf`;        

            doc.addImage(imgData, 'PNG', 0, 0,doc.internal.pageSize.getWidth(),doc.internal.pageSize.getHeight());

            doc.save(fileName);          
          
        }
        
        )
        .catch( (error) => {
          console.log('Print error');
          console.log(error);
        } );
      }

      return{
        currency: computed( () => store.state.currency),
        mobile: computed( () => store.state.mobile),
        version: computed( () => store.state.version),
        getIndex,
        subString,
        formatAmount,
        getPrintDate,
        printTicket
      }
};
