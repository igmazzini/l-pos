<template> 
  <div class="game-layout">
    <div class="game-layout-info">
      <DisplayInfoComponent @on-delete="onDelete" :numbers="infoNumbers"/>
      <DisplayNotificationsComponent :title="'notificaciones'" :type="'info'" :notification="'Ingrese un Nº de hasta 2 dígitos y presione INGRESAR'"/>
      </div>
    <div class="game-layout-display">     
      <DisplayNumbersComponent  :numbers="[655,75,86]"/>
      <DisplayBetComponent  :bet="600" :betLabel="'valor de apuesta en'"/>
      
      <SelectTypeComponent @type-change="onTypeChange" :buttons="typeButtons"/>
      <SelectDateComponent @date-change="onDateChange" @time-change="onTimeChange" :times="['M','N']" :date="'24/11'" :index="0"/>
    </div>
    <div class="game-layout-controls">
       <SelectBetComponent @bet-change="onBetChange" :buttons="betButtons"/>      
       <KeyBoardComponent @keyboard-change="onKeyBoardChange" :buttons="keyBoardButtons"/>
    </div>
  </div>
</template>

<script>

import { ref } from 'vue';
import DisplayInfoComponent           from '../components/DisplayInfoComponent .vue'
import DisplayNumbersComponent        from '../components/DisplayNumbersComponent.vue';
import DisplayBetComponent            from '../components/DisplayBetComponent.vue';
import DisplayNotificationsComponent  from '../components/DisplayNotificationsComponent.vue';
import SelectTypeComponent            from '../components/SelectTypeComponent.vue';
import SelectBetComponent             from '../components/SelectBetComponent.vue';
import SelectDateComponent            from '../components/SelectDateComponent.vue';
import KeyBoardComponent              from '../components/KeyBoardComponent.vue';

export default {
  name: "NuevosTiempos",
  components:{  
    DisplayInfoComponent,
    DisplayNumbersComponent,   
    DisplayBetComponent,   
    DisplayNotificationsComponent,   
    SelectTypeComponent, 
    SelectBetComponent, 
    SelectDateComponent, 
    KeyBoardComponent, 
    
  },
  setup(){

    const typeButtons = ref(['Exacto','Reversible','Primero','Terminación']);
    const betButtons = ref(['100','200','300','400','500','1000','2000','...']);
    const keyBoardButtons = ref(['7','8','9','Imprimir','4','5','6','1','2','3','Aceptar','<','0','Borrar']);
    const infoNumbers = ref([
      {numbers:['65'],type:'Terminacion (GT)',date:'24/11 N',bet:'$1000000',reventadoBet:'$1000000'},
      {numbers:['65'],type:'Exacto (GT)',date:'24/11 N',bet:'$1000000',reventadoBet:''},
      {numbers:['65'],type:'Revsersible (GT)',date:'24/11 N',bet:'$1000000',reventadoBet:'$1000000'},
      {numbers:['65'],type:'Primero (GT)',date:'24/11 N',bet:'$1000000',reventadoBet:'$1000000'},
      
      
      ]);

    return{
      typeButtons,
      betButtons,
      keyBoardButtons,
      infoNumbers,
      onTypeChange: (index)=>{
        console.log('onTypeChange '+typeButtons.value[index])
      },
      onBetChange: (index)=>{
        console.log('onBetChange '+index)
        console.log('onBetChange '+betButtons.value[index])
      },
      onDateChange: (data)=>{
        console.log('onDateChange '+data.on+' '+data.index)       
      },
      onTimeChange: (data)=>{
        console.log('onTimeChange '+data.time+' '+data.index)       
      },
      onKeyBoardChange: (index)=>{
        console.log('onKeyBoardChange '+index)
        console.log('onKeyBoardChange '+keyBoardButtons.value[index])
      },
      onDelete: (index)=>{
        console.log('onDelete '+index)
        infoNumbers.value.splice(index,1);
      }
    }
  }
  
};
</script>

<style lang='scss' scoped >
@import "../assets/css/nuevosTiempos.scss";
</style>