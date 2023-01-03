<script src="./TresMonazos.js"></script>
<template>
 <Transition  >
    <TicketModal @on-accept="onPrintAccept" @on-cancel="onPrintCancel" :game="game.name" :logo="require('@/modules/lottery/assets/img/'+game.img)" :numbers="raffles" v-if="showPrintModal">
      <template v-slot:numbers-list>
        <TicketModalNumbers :numbers="raffles"/>
      </template>
      <template v-slot:print-ticket-numbers>
        <PrintTicketNumbers  :numbers="raffles"/>
      </template>

    </TicketModal>
  </Transition>  
   
  <div class="game-layout">
     <div class="game-layout-info">
       <img v-if="!mobile" :src="require('@/modules/lottery/assets/img/'+game.img)" :alt="game.name" class="info-image animate__animated animate__zoomIn animate__faster">  
       
       <div class="info-numbers-container">
         <DisplayInfo @on-delete="onDelete" :numbers="raffles"/>
       </div>
       <div v-if="!mobile"  class="divider"></div> 
       <div v-if="!mobile"  class="game-layout-info--totals">
         <p>{{t('ticketResumeLabel')}}</p>
         <p>{{t('ticketTotalAmountLabel')}}{{currency}}</p>
         <p>{{totalBet}}</p>
        
          <button class="btn clear-button" @click="onClear">{{t('clearLabelButton')}}</button>
       </div> 
       <div v-if="mobile" @click="onMobileDelete" class="game-layout-info--delete">
          <span class="delete-menu--icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
           </span>
       </div>
      
       <DeleteMobileMenu ref="deleteMobileMenu" @on-delete="onMobileMenuClear"  @on-close="onMobileMenuClose" v-if="mobile"/> 
      
     
    </div>
    <div class="game-layout-display">     
      <DisplayNumbers :numbers="[raffleNumber]" :logo="require('@/modules/lottery/assets/img/'+game.img)"/>
      <DisplayBet  :bet="bet.toString()" :betLabel="t('betAmountLabel')+currency"/>     
      <DisplayNotifications v-if="!mobile" :title="t('notificationsLabel')" :type="notificationType" :notification="notificationText"/>
      <SelectType v-if="!mobile"  @type-change="onBetTypeChange" :title="t('betTypeLabel')" :buttons="typeButtons"/>

     
    </div>
    <div class="game-layout-controls">
       
       <DisplayNotifications v-if="mobile" :title="t('notificationsLabel')" :type="notificationType" :notification="notificationText"/> 
       <SelectType v-if="mobile"  @type-change="onBetTypeChange" :title="t('betTypeLabel')" :buttons="typeButtons"/>
       <button class="btn blind-rooster" @click="onBlindRooster">{{t('blindRooster')}}</button>
       <SelectBet @bet-change="onBetChange" :buttons="betButtons" :title="t('betButtonsLabel')+currency"/> 

       <div v-if="mobile" @click="onMobileDates" class="game-layout-controls-dates--button">
          <span>
             <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
              <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
            </svg> 
          </span>  
       </div>
       
       <div v-if="!mobile" class="control-dates">
         <p class="cotrol-date-title">{{t('rafflesLabel')}}</p>
         <div class="control-select-dates">
           <SelectDate v-for="(date,index) of dates" :key="index" @date-change="onDateChange" @time-change="onTimeChange" :morningTime="morningTime" :nightTime="nightTime" :today="(index == 0) ? true : false"  :default="defaultDateIndex" :times="times" :date="date.date" :weekDay="date.weekday" :index="index"/>
         </div>         
         <div class="cotrol-times">
            <p>{{t('raffleMorningLabel')}} {{morningTime}}</p>  
            <p>{{t('raffleNightLabel')}} {{nightTime}}</p>  
         </div> 
       </div> 
                     
       <KeyBoard @keyboard-change="onKeyBoardChange" :buttons="keyBoardButtons" :printDisabled="emptyRaffles"/>
       <keep-alive>
        <DatesMobileMenu ref="mobileDateMenu" @on-accept="onMobileDatesAccept" @on-cancel="onMobileDatesCancel"  @on-close="onMobileDatesClose" v-if="mobile" :morningTime="morningTime" :nightTime="nightTime" :defaultDate="defaultDateIndex" :dates="dates" :times="times" @on-mobile-date-change="onDateChange" @on-mobile-time-change="onTimeChange" />
       </keep-alive>
       <div v-if="!mobile" class="control-footer">
         <div class="control-footer-logo">
           <p>{{t('poweredBy')}}</p>
           <img  src="@/assets/img/logo_footer.svg" alt="logo-footer">
         </div>
         
         <p>{{version}}</p>
       </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import "./tres-monazos.scss";
 
</style>