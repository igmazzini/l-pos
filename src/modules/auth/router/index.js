export default{
    name:'login',
    component: ()=> import(/* webpackChunkName: "LoginLayout" */'@/modules/auth/layout/LoginLayout'),  
    children:[
        {
          path: '',
          name:'login-page',
          component: ()=> import(/* webpackChunkName: "Login" */'@/modules/auth/views/LoginView')
        },
        
      ]
}