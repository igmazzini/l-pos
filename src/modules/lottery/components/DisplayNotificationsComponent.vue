<template>
  <div class="display-notifications">
    <p class="title">{{ title }}</p>
    <p :class="getClass()">
       <ExclamationThick class="alert-icon" v-if="type === 'info'"/>
       <Alert class="alert-icon" v-if="type === 'error'"/>
       {{ notification }}
    </p>
  </div>
</template>

<script>
 
import { ExclamationThick, Alert } from 'mdue';
export default {
  name: "DisplayNotificationsComponent",
  props: {
   title: String,
   notification: String,
   type: String,
    
  },
  components:{
    ExclamationThick,
    Alert 
  },
  setup(props){
    return{
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
  font-size: 1.3rem;
}
.notification {
  font-size: 2rem;
  color: black;
  padding: 30px;
  border-radius: 15px;
  font-family: RobotoLight;
}

.notification--info{
  color: var(--info-color);
  background-color: var(--background-color);
 
}

.notification--error{
  color: var(--error-color);
  background-color: var(--background-error-color);
  
}

.alert-icon{
  font-size: 2.6rem;
}




</style>