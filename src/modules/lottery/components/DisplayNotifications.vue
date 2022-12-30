<template>
  <div class="display-notifications">
    <p v-if="!store.state.mobile" class="title">{{ title }}</p>
    <p :class="getClass()">
       <ExclamationThick class="alert-icon" v-if="type === 'info'"/>
       <Alert class="alert-icon" v-if="type === 'error'"/>
       {{ notification }}
    </p>
  </div>
</template>

<script>
 
import { ExclamationThick, Alert } from 'mdue';
import { useStore } from 'vuex';
export default {  
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

    const store = useStore();

    return{
      store,
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
  font-size: 1.8rem;
  color: black;
  padding: 30px;
  border-radius: 7px;
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
  font-size: 2rem;
}


@media screen and (max-width:1300px) {
  .notification {
    padding: 5px;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 1.3em;
  }
}





</style>