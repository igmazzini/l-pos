<template>
<div class="display-numbers">
    <div class="display-number" v-for="(number,index) of numbers" :key="index">
       <p v-if="number != ''">{{getFormatNumber(number)}}</p>
       <img class="animate__animated animate__zoomIn animate__faster" v-if="mobile && number == '' && logo != ''" :src="logo" alt="" >
    </div>
</div>
  
</template>

<script>
import { useUI } from '@/modules/shared/composables/useUI';

export default {   
    name:'DisplayNumbers',
    props:{
        numbers:{
            type:Array,
            required:true
        },
        logo:{
            type:String, 
            default:''
        },
        zeroFormat:{
            type:Boolean,
            default:false
        }
    },
    setup(props){

        const { mobile } = useUI();

        const getFormatNumber = ( number ) =>{
            if(props.zeroFormat){

                if(String(number).length == 1){

                    return `0${number}`;

                }else{

                    return number;
                }
                
            }else{

                return number
            }
            
        }

        return {
            mobile,
            getFormatNumber
        }
    }  

}
</script>

<style lang="scss" scoped>
    .display-numbers{          
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }
    .display-number{
        width: 11rem;
        height: 11rem;        
        border-radius: 50%;
        font-size: 6rem;
        font-family: RobotoLight;
        color:var(--info-color);
        background-image: radial-gradient(#fff,#cfcdcd);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;

        p{
            margin: 0;
            padding: 0;
            font-family: inherit;
            font-size: inherit;
            color: inherit;
        }

        img{
            width: 90%;
            height: auto;
            -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
            filter: grayscale(100%);
        }
        
    }

    @media screen and (max-width: 1300px) {
        .display-number{
            width: 80px;
            height: 80px;  
            font-size: 4em;
        }
    }

</style>