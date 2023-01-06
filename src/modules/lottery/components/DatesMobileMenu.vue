<template>
  <div class="dates-menu-container">
    <div class="dates-menu">
        <div @click="onBackClick" :class="['dates-menu--background']"></div>
        <div :class="['dates-menu--action']">            
            <div class="action--dates">
                 <SelectDate v-for="(date,index) of dates" :key="index" @date-change="onDateChange" @time-change="onTimeChange" :morningTime="morningTime" :nightTime="nightTime" :times="times" :default="defaultDate" :today="(index == 0) ? true : false" :date="date.date" :weekDay="date.weekday" :index="index"/>
            </div>
            <div class="action--times">
                <p>{{t('raffleMorningLabel')}} {{morningTime}}</p>  
                <p>{{t('raffleNightLabel')}} {{nightTime}}</p>  
            </div>
            <div class="action--controls">
                <button @click="onCancel" class="btn  action--controls---cancel">{{t('cancelLabelButton')}}</button>
                <button @click="onAccept" class="btn  action--controls---accept">{{t('acceptLabelButton')}}</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

import { useI18n } from 'vue-i18n';
import SelectDate  from '../components/SelectDate.vue';
export default {
    name:'DatesMobileMenu', 
    components:{
        SelectDate
    }, 
    props:[
        'dates',
        'times',
        'morningTime',
        'nightTime',
        'show',
        'defaultDate'
    ],
    emits: ["on-accept","on-cancel", "on-close","on-mobile-date-change","on-mobile-time-change"],
    setup(props,context){


        const { t } = useI18n();    

        const showMenu = () =>{
            document.querySelector('.dates-menu--background').classList.add('show-background');
            document.querySelector('.dates-menu--action').classList.add('show-menu');
            document.querySelector('.dates-menu--background').classList.remove('hide-background');
            document.querySelector('.dates-menu--action').classList.remove('hide-menu');
        }
        const hideMenu = () =>{
          
            document.querySelector('.dates-menu--background').classList.add('hide-background');
            document.querySelector('.dates-menu--action').classList.add('hide-menu');
            document.querySelector('.dates-menu--background').classList.remove('show-background');
            document.querySelector('.dates-menu--action').classList.remove('show-menu');
        }

        const onBackClick = () => {
            context.emit("on-close");
        }
        const onCancel = () => {
            context.emit("on-cancel");
        }
        const onAccept = () => {        
            context.emit("on-accept");
            
        }
        const onDateChange = ( data ) => {
            context.emit("on-mobile-date-change",data);
        }
        const onTimeChange = ( data ) => {
            context.emit("on-mobile-time-change",data);
        }
        
       
      



        return{
            t,            
            onBackClick,           
            onCancel,
            onAccept,
            onDateChange,
            onTimeChange,
            showMenu,
            hideMenu
        }
    }

}
</script>

<style lang='scss' scoped >

.dates-menu-container{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    z-index: 100;
    pointer-events: none;


    .dates-menu{
        width: 100%;
        height: 100%;
        display: grid;
        position: relative;    
      
       

        .dates-menu--background{
            position: absolute;
            opacity: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.200);
            transition: all;
           
            
        
        }

        .show-background{
            animation: showBackground;       
            animation-duration: 300ms;
            animation-fill-mode: forwards;
            animation-iteration-count: 1;
            pointer-events: all;
        }
        .hide-background{
            animation: hideBackground;       
            animation-duration: 300ms;
            animation-fill-mode: forwards;
            animation-iteration-count: 1;
            pointer-events: none;
        }

        @keyframes showBackground {
            0%{
            opacity: 0;
            }
            100%{
            opacity: 1;
            }
        }
        @keyframes hideBackground {
            0%{
            opacity: 1;
            }
            100%{
            opacity: 0;
            }
        }

        .dates-menu--action{
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 10% 20%;           
            height: 100%;
            width: 90%;
            background-color: var(--info-color);   
            transition: all ;
            position: absolute;
            top: 0;   
            right: -100%;   
            pointer-events: none;     
          
           
            .action--dates{
               
                display: grid;  
                height: 100%;   
                width: 100%;              
                column-gap: 10px;
                row-gap: 12px;
                grid-template-columns: repeat(3,1fr);
                grid-template-rows: repeat(3,1fr);
                padding: 10px;
            }
            .action--times{
                          
                width: 100%;
                display: grid;
                grid-template-columns: repeat(2,1fr); 
                justify-items: center;
                align-items: center;
                padding: 15px;
                               
                p{
                    font-size: 1.5em;
                    color: whitesmoke;
                    text-transform: uppercase;
                    margin: 0;
                }

              
            }
            .action--controls{
               
                width: 100%;
                display: grid;
                grid-template-columns: repeat(2,1fr); 
                justify-items: center;
                align-items: center;

                .action--controls---cancel,
                .action--controls---accept{
                     width: 90%;
                     height: 65%;
                     border-radius: 5px;
                     color: whitesmoke;
                     font-size: 1.8em;
                     text-transform: uppercase;
                     font-family: RobotoBlack;
                }

                .action--controls---cancel{
                   
                    background-color: var(--error-color);
                }
                .action--controls---accept{
                  
                    background-color: var(--success-color);
                }
                
            }

            .date-menu--text{
                color: whitesmoke;
                font-family: RobotoRegular;
                font-size: 2.3em;
                margin: 0;
                padding: 0;
            }
            
            .date-menu--icon{
                color: whitesmoke;
                font-size: 4em;
            }
        }

        .show-menu{
            animation: showAction ease-in-out;    
            animation-duration: 280ms; 
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
            pointer-events:all;  
        }
        .hide-menu{
            animation: hideAction ease-in-out;   
            animation-duration: 280ms;  
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
        }

        @keyframes showAction {
            0%{
               right: -100%;
            }
            100%{
               right: 0;
            }
        }
        @keyframes hideAction {
            0%{
               right: 0;
            }
            100%{
               right: -100%;
            }
        }
    }
}



</style>