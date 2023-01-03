<template>
  <nav class="top-bar">   
    
  
    <span class="top-bar-icon dash-icon" @click="goBack">
     <svg xmlns="http://www.w3.org/2000/svg" :width="!mobile ? 26 : 23" :height="!mobile ? 26 : 23" fill="currentColor" class="bi bi-grid-1x2-fill" viewBox="0 0 16 16">
      <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5z"/>
     </svg>
    </span>
    
    <div class="top-bar-clock">
      
      <span class="top-bar-icon">
        <svg xmlns="http://www.w3.org/2000/svg" :width="!mobile ? 26 : 23" :height="!mobile ? 26 : 23" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
        </svg>
      </span>
      <p>{{getToday()}}</p>
      <span class="top-bar-icon">
        <svg xmlns="http://www.w3.org/2000/svg" :width="!mobile ? 26 : 23" :height="!mobile ? 26 : 23" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
        </svg>
      </span>    
      <p>{{nowTime}}</p>
    </div>
    
     <Select :options="languages" @on-select="onLanguageChange"/>
    
     <span class="top-bar-icon">
      <svg xmlns="http://www.w3.org/2000/svg" :width="!mobile ? 26 : 23" :height="!mobile ? 26 : 23" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
      </svg>
     </span>
  </nav>
</template>

<script>

import { useTime } from '../composables/useTime.js'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from '@vue/runtime-core';
import Select from '@/modules/shared/components/Select/Select.vue';
import { useUI } from '@/modules/shared/composables/useUI';
import { ref } from 'vue';

export default {
  name: "Navbar",
  components:{
     Select,
  },
  setup(){  
    
    let intervalId                 = '';
    const router                   = useRouter();   
    const nowTime                  = ref('');
    const { getToday, getNowTime } = useTime();
    const { setLanguage, mobile } = useUI();
    const languages = ref([]);


    languages.value = [
      {label:'ENG',value:'ENG_US'},
      {label:'ESP',value:'ESP_AR'},
      ];


    nowTime.value = getNowTime();


    const onLanguageChange = ( option ) =>{
      setLanguage(option.value);
    }

    onMounted( ()=>{
      intervalId = setInterval(()=>{
          nowTime.value = getNowTime();
      },1000)
    });

    onUnmounted( ()=>{
     clearInterval(intervalId)
    });

    return{
      goBack:()=>{
        router.go(-1);
      },
      mobile,
      getToday,    
      nowTime,
      languages,
      onLanguageChange
    }
  }
};
</script>

<style lang='scss' scoped>




.top-bar{
  width: 100%;
  height: var(--top-bar-height);
  background-color: var(--info-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.5%;
  padding-right: 0.5%;
  
}

 .select-container{
    width: 42px;
    height: 30px;
    margin-right: 20px;
    margin-left: auto;
    
 } 

.select-container:deep() .select-value{
    background-color: transparent;
    color: var(--light-color);
    font-family: RobotoMedium;
    font-size: 1.2em;
    padding-bottom: 0;
    border-bottom: 1px solid whitesmoke;
}

.select-container:deep() .select-options{
  
  border-top: none;
  background-color: var(--info-color);
 

  .select-option{
     color: var(--light-color);
     font-family: RobotoMedium;
  }
}
.top-bar-icon{
  color: white;
  
  svg{
    vertical-align: center;
  }
 
}

.dash-icon{
  cursor: pointer;
  margin-right: auto;
}

.top-bar-clock{
  display: flex;
  align-items: center;
  justify-content: center;
 
}

.top-bar-clock p {
  margin: 0 15px;
  padding: 0;
  color: white; 
  font-size: 1.5rem;
  font-family: RobotoMedium;
}


@media screen and  (max-width:1300px){

  .top-bar{
    padding-left: 1.5%;
    padding-right: 1.5%;
  }

  .select-container{
    height: 20px;
    width: 30px;
    margin-right: 10px;

    
  }

  .select-container:deep() .select-options{
      top: 19px;
  }
  
}


</style>