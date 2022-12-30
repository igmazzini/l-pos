<template>
  <div class="delete-menu-container">
    <div class="delete-menu">
        <div @click="onBackClick" class="delete-menu--background"></div>
        <div @click="onActionClick" class="delete-menu--action">
             <TrashCanOutline class="delete-menu--icon"/>
             <p class="delete-menu--text">Limpiar</p>
        </div>
    </div>
  </div>
</template>

<script>
import { TrashCanOutline } from 'mdue';
export default {
    name:'DeleteMobileMenu',
    components:{
    TrashCanOutline,
    },
    emits: ["on-delete", "on-close"],
    setup(props,context){


        const showMenu = () =>{
            document.querySelector('.delete-menu--background').classList.add('show-background');
            document.querySelector('.delete-menu--action').classList.add('show-menu');
            document.querySelector('.delete-menu--background').classList.remove('hide-background');
            document.querySelector('.delete-menu--action').classList.remove('hide-menu');
        }
        const hideMenu = () =>{
          
            document.querySelector('.delete-menu--background').classList.add('hide-background');
            document.querySelector('.delete-menu--action').classList.add('hide-menu');
            document.querySelector('.delete-menu--background').classList.remove('show-background');
            document.querySelector('.delete-menu--action').classList.remove('show-menu');
        }    

        const onBackClick = () => {
            context.emit("on-close");
        }
        const onActionClick = () => {
            context.emit("on-delete");
        }

        return{
            onBackClick,
            onActionClick,
            showMenu,
            hideMenu
        }
    }

}
</script>

<style lang='scss' scoped >

.delete-menu-container{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    pointer-events: none;

    .delete-menu{
        width: 100%;
        height: 100%;
        display: grid;
        position: relative;    
      
       

        .delete-menu--background{
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.300);
            transition: all;
            opacity: 0;
            pointer-events: none;
        
        }

        .show-background{
            animation: showBackground;       
            animation-duration: 280ms;           
            animation-fill-mode: forwards;
            animation-iteration-count: 1;           
            pointer-events: all;
        }
        .hide-background{
            animation: hideBackground;       
            animation-duration: 280ms;          
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

        .delete-menu--action{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 35%;
            background-color: var(--error-color);   
            transition: all;
            position: absolute;
            top: 0;   
            right: -100%;   
            pointer-events: none;

            .delete-menu--text{
                color: whitesmoke;
                font-family: RobotoRegular;
                font-size: 2.3em;
                margin: 0;
                padding: 0;
            }
            
            .delete-menu--icon{
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
            pointer-events: none;
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