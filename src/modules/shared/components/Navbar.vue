<template>
  <nav class="top-bar">   
    
    <ViewDashboard class="top-bar-icon dash-icon" @click="goBack"/>
    
    <div class="top-bar-clock">
      <CalendarBlank class="top-bar-icon"/>
      <p>{{getToday()}}</p>
      <Clock class="top-bar-icon"/>
      <p>{{nowTime}}</p>
    </div>

    
     <EmoticonOutline class="top-bar-icon"/>
  </nav>
</template>

<script>

import { ViewDashboard, CalendarBlank, Clock, EmoticonOutline } from 'mdue';
import { useTime } from '../composables/useTime.js'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from '@vue/runtime-core';
import { ref } from 'vue';

export default {
  name: "Navbar",
  components:{
    ViewDashboard,
    CalendarBlank,
    Clock,
    EmoticonOutline,
  },
  setup(){  
    
    let intervalId                 = '';
    const router                   = useRouter();   
    const nowTime                  = ref('');
    const { getToday, getNowTime } = useTime();


    nowTime.value = getNowTime();

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
      getToday,    
      nowTime  
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
  justify-content: space-between;
  padding-left: 0.3%;
  padding-right: 0.3%;
  
}
.top-bar-icon{
  color: white;
  font-size: 2.2rem;
}

.dash-icon{
  cursor: pointer;
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


</style>