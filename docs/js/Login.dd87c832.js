(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Login"],{"180d":function(e,t,n){"use strict";n("675f")},6608:function(e,t,n){e.exports=n.p+"img/end2end_logo.3c2b4d8e.png"},"675f":function(e,t,n){},c34a:function(e,t,n){"use strict";n.r(t);var o=n("7a23"),r=n("6608"),a=n.n(r),c=function(e){return Object(o["pushScopeId"])("data-v-114a529a"),e=e(),Object(o["popScopeId"])(),e},l={class:"login"},s={class:"card login-card"},i=c((function(){return Object(o["createElementVNode"])("img",{src:a.a,class:"login-img",alt:"Logo"},null,-1)})),u={for:"inputName",class:"form-label"},d={for:"inputPassword",class:"form-label mt-3"},m={class:"password-row"},p=["type"],b=c((function(){return Object(o["createElementVNode"])("svg",{xmlns:"http://www.w3.org/2000/svg",width:"22",height:"22",fill:"currentColor",class:"bi bi-eye",viewBox:"0 0 16 16"},[Object(o["createElementVNode"])("path",{d:"M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"}),Object(o["createElementVNode"])("path",{d:"M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"})],-1)})),j=[b],O=c((function(){return Object(o["createElementVNode"])("svg",{xmlns:"http://www.w3.org/2000/svg",width:"22",height:"22",fill:"currentColor",class:"bi bi-eye-slash",viewBox:"0 0 16 16"},[Object(o["createElementVNode"])("path",{d:"M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"}),Object(o["createElementVNode"])("path",{d:"M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"}),Object(o["createElementVNode"])("path",{d:"M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"})],-1)})),w=[O],g={class:"login-buttons"};function f(e,t,n,r,a,c){return Object(o["openBlock"])(),Object(o["createElementBlock"])("section",l,[Object(o["createElementVNode"])("div",s,[i,Object(o["createElementVNode"])("form",null,[Object(o["createElementVNode"])("label",u,Object(o["toDisplayString"])(r.t("loginName")),1),Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{type:"text",class:Object(o["normalizeClass"])(["form-control","login-input",r.emptyName?"empty-input":""]),id:"inputName","onUpdate:modelValue":t[0]||(t[0]=function(e){return r.userName=e}),required:""},null,2),[[o["vModelText"],r.userName]]),Object(o["createElementVNode"])("p",{class:Object(o["normalizeClass"])(["empty-field",r.emptyName?"show-empty":""])},Object(o["toDisplayString"])(r.t("loginName"))+" "+Object(o["toDisplayString"])(r.t("loginError")),3),Object(o["createElementVNode"])("label",d,Object(o["toDisplayString"])(r.t("loginPassword")),1),Object(o["createElementVNode"])("div",m,[Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{type:r.showPassword?"text":"password",class:Object(o["normalizeClass"])(["form-control","login-input",r.emptyPassword?"empty-input":""]),id:"inputPassword",required:"","onUpdate:modelValue":t[1]||(t[1]=function(e){return r.password=e})},null,10,p),[[o["vModelDynamic"],r.password]]),r.showPassword?(Object(o["openBlock"])(),Object(o["createElementBlock"])("span",{key:0,class:"show-password",onClick:t[2]||(t[2]=function(e){return r.showPassword=!1})},j)):Object(o["createCommentVNode"])("",!0),r.showPassword?Object(o["createCommentVNode"])("",!0):(Object(o["openBlock"])(),Object(o["createElementBlock"])("span",{key:1,class:"hide-password",onClick:t[3]||(t[3]=function(e){return r.showPassword=!0})},w))]),Object(o["createElementVNode"])("p",{class:Object(o["normalizeClass"])(["empty-field",r.emptyPassword?"show-empty":""])},Object(o["toDisplayString"])(r.t("loginPassword"))+" "+Object(o["toDisplayString"])(r.t("loginError")),3)]),Object(o["createElementVNode"])("div",g,[Object(o["createElementVNode"])("span",{class:Object(o["normalizeClass"])(["login-error",""!=r.loginError?"show-empty":""])},Object(o["toDisplayString"])(r.loginError),3),Object(o["createElementVNode"])("button",{onClick:t[4]||(t[4]=function(){return r.onLogin&&r.onLogin.apply(r,arguments)}),class:"btn btn-primary login-button"},Object(o["toDisplayString"])(r.t("loginButton")),1)])])])}var h=n("1da1"),v=(n("96cf"),n("5502")),y=function(){var e=Object(v["b"])(),t=Object(o["computed"])((function(){return e.getters["authStore/isAuthenticated"]})),n=function(){var n=Object(h["a"])(regeneratorRuntime.mark((function n(o,r){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=!1,"demo"==o&&"demoE2E"==r&&(a=!0),e.commit("authStore/setIsAuthenticated",a),localStorage.setItem("authorized",a),n.abrupt("return",t);case 5:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}(),r=function(){localStorage.removeItem("authorized"),e.commit("authStore/setIsAuthenticated",!1)};return{isAuthenticated:t,login:n,logout:r}},N=n("b63b"),E=n("6c02"),V=n("47e2"),C={name:"Login",setup:function(){var e=Object(V["b"])(),t=e.t,n=Object(N["a"])(),r=n.setTitle,a=y(),c=a.login,l=a.isAuthenticated,s=a.logout,i=Object(E["c"])(),u=Object(o["ref"])(""),d=Object(o["ref"])(""),m=Object(o["ref"])(!1),p=Object(o["ref"])(""),b=Object(o["ref"])(!1),j=Object(o["ref"])(!1),O=Object(o["ref"])(!0);r(t("loginTitle")),Object(o["watchEffect"])((function(){O.value||(""==u.value?b.value=!0:b.value=!1,""==d.value?j.value=!0:j.value=!1)})),s();var w=function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(""==u.value||""==d.value){e.next=6;break}return e.next=3,c(u.value,d.value);case 3:l.value?(p.value="",i.push({name:"selector"})):p.value=t("invalidCredentials"),e.next=9;break;case 6:""==u.value&&(b.value=!0),""==d.value&&(j.value=!0),O.value=!1;case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return{t:t,router:i,userName:u,password:d,loginError:p,onLogin:w,showPassword:m,emptyName:b,emptyPassword:j}}},k=(n("180d"),n("6b0d")),S=n.n(k);const z=S()(C,[["render",f],["__scopeId","data-v-114a529a"]]);t["default"]=z}}]);
//# sourceMappingURL=Login.dd87c832.js.map