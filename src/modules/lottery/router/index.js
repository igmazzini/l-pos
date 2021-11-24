export default{
    name:'lottery',
    component: ()=> import(/* webpackChunkName: "Lottery" */'@/modules/lottery/layout/LotteryLayout'),   
    children:[
      {
        path: 'selector',
        name:'selector',
        component: ()=> import(/* webpackChunkName: "Selector" */'@/modules/lottery/views/Selector')
      },
      {
        path: 'nuevosTiempos',
        name:'nuevosTiempos',
        component: ()=> import(/* webpackChunkName: "NuevosTiempos" */'@/modules/lottery/views/NuevosTiempos')
      },
      {
        path: 'tresMonazos',
        name:'tresMonazos',
        component: ()=> import(/* webpackChunkName: "TresMonazos" */'@/modules/lottery/views/TresMonazos')
      },
      {
        path: 'lotto',
        name:'lotto',
        component: ()=> import(/* webpackChunkName: "Lotto" */'@/modules/lottery/views/Lotto')
      },
      { 
        path: '',
        redirect:{name:'selector'}
       
      },
      
    ]
}