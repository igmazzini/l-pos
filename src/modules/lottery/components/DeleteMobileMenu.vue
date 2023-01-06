<template>
  <div class="delete-menu-container">
    <div class="delete-menu">
        <div @click="onBackClick" class="delete-menu--background"></div>
        <div @click="onActionClick" class="delete-menu--action">
             
             <span class="delete-menu--icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
             </span>
             <p class="delete-menu--text">Limpiar</p>
        </div>
    </div>
  </div>
</template>

<script>

export default {
    name:'DeleteMobileMenu',   
    emits: ["on-delete", "on-close"],
    setup(props,context){
        
        let open = false;

        const showMenu = () =>{

            if(!open){

                document.querySelector('.delete-menu--background').classList.add('show-background');
                document.querySelector('.delete-menu--action').classList.add('show-menu');
                document.querySelector('.delete-menu--background').classList.remove('hide-background');
                document.querySelector('.delete-menu--action').classList.remove('hide-menu');    

                open = true;
            }
            
        }
        const hideMenu = () =>{

            if(open){

                document.querySelector('.delete-menu--background').classList.add('hide-background');
                document.querySelector('.delete-menu--action').classList.add('hide-menu');
                document.querySelector('.delete-menu--background').classList.remove('show-background');
                document.querySelector('.delete-menu--action').classList.remove('show-menu');

                open = false;
            }
          
            
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