<template>
  <div class="display-notifications">
    <p v-if="!mobile" class="title">{{ title }}</p>
    <div :class="getClass()" >
       <span class="alert-icon"  v-if="type === 'error'">
          <svg xmlns="http://www.w3.org/2000/svg" :width=" !mobile ? 58 : 22" :height=" !mobile ? 58 : 22" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
       </span>
       <span class="alert-icon"  v-if="type === 'info'">
          <svg xmlns="http://www.w3.org/2000/svg" :width=" !mobile ? 58 : 22" :height=" !mobile ? 58 : 22" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
            <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
       </span>
      <p >{{ notification }} </p>

    </div>
    
  </div>
</template>

<script>
 


import { useUI } from '@/modules/shared/composables/useUI';
export default {  
  props: {
   title: String,
   notification: String,
   type: String,
    
  },

  setup(props){

   
    const { mobile } = useUI();

    return{
      mobile,
      getClass:() => {

        let outClass = 'notification';

        if( props.type === 'info' ){

          outClass += ' notification--info';

        }else if ( props.type === 'error' ){

          outClass += ' notification--error';
        }
        

       

        return outClass;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.display-notifications {
   width: 100%;
   
}
.title {
  margin: 0;
  padding: 0;
  font-family: RobotoRegular;
  text-transform: uppercase;
  text-align: left;
  color: black;
  font-size: 1.1rem;
}
.notification {
 
  color: black;
  padding: 30px; 
  width: 100%;
  height: 100%;
  border-radius: 7px;
  font-family: RobotoLight;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;

  p{
     font-size: 1.7rem;
     margin: 0;
     padding: 0;
     margin-left: 12%;
  }
}

.notification--info{
  color: var(--info-color);
  background-color: var(--background-color);
 
}

.notification--error{
  color: var(--error-color);
  background-color: var(--background-error-color);
  
}

.esp_font{
      p{
        font-size: 1.2em !important;
      }
    }

.alert-icon{ 
  margin-right: 10px;
  position: absolute;
  transform: translateY(-50%);
  top:50%;
  left:5px
}


@media screen and (max-width:1300px) {
  .notification {
    padding: 5px;
    height: 100%;
    display: flex;
    align-items: center;
    

    p{
     font-size: 1.4em;
     margin-left: 9%;
    }

    
  }
}





</style>