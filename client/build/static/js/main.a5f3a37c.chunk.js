(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{127:function(e,t,c){"use strict";c.r(t);var a=c(1),n=c(11),o=c.n(n),s=c(17),i=(c(93),c(94),Object(a.createContext)()),r=c(48),l=c(12),d=c(3);function j(){return Object(d.jsx)("div",{children:Object(d.jsx)("h1",{children:"Page Not Found"})})}var u=c(58),b=c(59),h=c(78),m=c(33);function x(e){var t=e.index,c=e.text,a=e.markascompleted,n=e.deleteTodo,o=e.checkTodo;return Object(d.jsxs)("div",{className:"todoCard",children:[Object(d.jsx)("div",{className:"d-flex flex-btn",children:!0===a?Object(d.jsx)("button",{className:"todoBtn markCompletedBtn",onClick:o,children:Object(d.jsx)("span",{children:Object(d.jsx)(m.b,{})})}):Object(d.jsx)("button",{className:"todoBtn markBtn",onClick:o,children:Object(d.jsx)("span",{children:Object(d.jsx)(m.c,{})})})}),Object(d.jsx)("div",{className:"d-flex flex-text",children:Object(d.jsx)("p",{className:a?"textdecorate":"",children:"".concat(t+1,". ").concat(c)})}),Object(d.jsx)("div",{className:"d-flex flex-btn",children:Object(d.jsx)("button",{className:"todoBtn deleteBtn",onClick:n,children:Object(d.jsx)("span",{children:Object(d.jsx)(m.c,{})})})})]})}var p=c(77),O=c.p+"static/media/LogoBg.f56e20a7.svg";function f(e){var t=e.profileName;return Object(d.jsx)("div",{className:"navBar",children:Object(d.jsxs)("div",{className:"content  col-sm-12 col-md-8 col-lg-7 m-0 p-0 m-auto",children:[Object(d.jsx)("img",{src:O,alt:"Logo",width:"150px"}),Object(d.jsxs)("p",{className:"welcome",children:["Hi ",Object(d.jsx)("span",{children:t})," !"]})]})})}var g=c(159),v=c(130),N=c(165),w=c(160),k=c(167),S=c(164),C=c(162),y=c(6),T=c(76),B=c.n(T),I=c.p+"static/media/todo.8fb98ab9.svg",U="https://particletodo.herokuapp.com/todo/api/auth",L="https://particletodo.herokuapp.com/todo/api",z=c(42),A=c.n(z),E=A.a.create({baseURL:L});if(localStorage.getItem("jwt")){var J=JSON.parse(localStorage.getItem("jwt"));E.defaults.headers.common.Authorization="Bearer ".concat(J.token)}E.defaults.headers.post["Content-Type"]="application/json";var F=E;var _=Object(y.a)((function(e){return{root:{margin:0,padding:e.spacing(2),backgroundColor:"#16234d",color:"#fff"},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]}}}))((function(e){var t=e.children,c=e.classes,a=e.onClose,n=Object(h.a)(e,["children","classes","onClose"]);return Object(d.jsxs)(g.a,Object(b.a)(Object(b.a)({disableTypography:!0,className:c.root},n),{},{children:[Object(d.jsx)(v.a,{variant:"h6",children:t}),a?Object(d.jsx)(N.a,{"aria-label":"close",className:c.closeButton,onClick:a,children:Object(d.jsx)(B.a,{})}):null]}))})),P=Object(y.a)((function(e){return{root:{padding:e.spacing(2),backgroundColor:"#16234d",color:"#fff"}}}))(w.a);function R(){var e,t=Object(a.useContext)(i),c=Object(a.useState)(""),n=Object(s.a)(c,2),o=n[0],r=n[1],j=Object(a.useState)(!1),b=Object(s.a)(j,2),h=b[0],m=(b[1],Object(a.useState)([])),O=Object(s.a)(m,2),g=O[0],v=O[1],N=Object(a.useState)(""),w=Object(s.a)(N,2),y=w[0],T=w[1],B=Object(a.useState)(!1),U=Object(s.a)(B,2),L=U[0],z=U[1],A=function(){z(!1)},E=function(){t.setUser(null),localStorage.removeItem("jwt")},J=function(){(function(e){return F.post("/profile/createTodo",{todo:e}).then((function(e){return e.data})).catch((function(e){throw e}))})(y).then((function(e){e.todo&&(g.push(e.todo),v(Object(u.a)(g)),T(""),z(!1))}))},R=function(){F.get("/profile").then((function(e){return e.data})).catch((function(e){throw e})).then((function(e){console.log("data: ",e),e.error?console.log("data: ",e):v(e.todos)}))},D=function(e){var t;(t=e,F.delete("/profile/removetodo/".concat(t)).then((function(e){return e.data})).catch((function(e){throw e}))).then((function(t){if(!t.error){var c=g.filter((function(t){return t._id!=e}));console.log("data: list",c),v(c)}}))},M=function(e){var t,c,a=g.findIndex((function(t){return t._id===e}));(t=e,c=!g[a].markascompleted,F.put("/profile/markascompleted/".concat(t,"/").concat(c)).then((function(e){return e.data})).catch((function(e){throw e}))).then((function(e){e.error||(g[a].markascompleted=!g[a].markascompleted,v(Object(u.a)(g)))}))};if(Object(a.useEffect)((function(){if(!localStorage.getItem("jwt"))return E(),console.log("Redirecting"),Object(d.jsx)(l.a,{to:"/"});var e;R();var c=JSON.parse(localStorage.getItem("jwt"));t.setUser({id:c.id,name:c.name,token:c.token}),r(null===(e=t.user)||void 0===e?void 0:e.name),console.log(g)}),[]),!(null===(e=t.user)||void 0===e?void 0:e.id))return Object(d.jsx)(l.a,{to:"/"});return Object(d.jsxs)("div",{children:[Object(d.jsx)(f,{profileName:o}),Object(d.jsx)("div",{className:"main",children:Object(d.jsxs)("div",{className:"content col-sm-12 col-md-8 col-lg-7 m-auto",children:[Object(d.jsxs)("div",{className:"info",children:[Object(d.jsxs)("p",{children:["All Tasks for today"," ",Object(d.jsx)("span",{children:Object(d.jsx)("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"far","data-icon":"smile",className:"svg-inline--fa fa-smile fa-w-16",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 496 512",children:Object(d.jsx)("path",{d:"M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"})})})]}),Object(d.jsx)("p",{children:h}),Object(d.jsx)("button",{onClick:E,children:"Logout"})]}),Object(d.jsx)("div",{className:"floatingBtn",children:Object(d.jsx)("button",{className:"addTodo",onClick:function(){z(!0)},children:Object(d.jsx)(p.a,{})})}),Object(d.jsxs)("div",{className:"todoSection px-4",children:[g.map((function(e,t){return Object(d.jsx)("div",{children:Object(d.jsx)(x,{index:t,text:e.todo,markascompleted:e.markascompleted,checkTodo:function(){M(e._id)},deleteTodo:function(){D(e._id)}})},e._id)})),g.length<=0&&Object(d.jsxs)("div",{className:"emptyTodo",children:[Object(d.jsx)("img",{src:I,alt:"todo"}),Object(d.jsx)("h3",{children:"Empty todo list!"}),Object(d.jsx)("p",{children:"Be productive! create your todo list now..."})]})]})]})}),Object(d.jsxs)(k.a,{onClose:A,"aria-labelledby":"customized-dialog-title",open:L,maxWidth:"sm",fullWidth:!0,children:[Object(d.jsx)(_,{id:"customized-dialog-title",onClose:A,children:"New Task"}),Object(d.jsxs)(P,{dividers:!0,children:[Object(d.jsx)(S.a,{children:Object(d.jsx)(C.a,{id:"outlined-multiline-static",placeholder:"Enter todo...",multiline:!0,rows:5,variant:"outlined",style:{width:"100%"},value:y,onChange:function(e){T(e.target.value)},color:"primary"})}),Object(d.jsxs)(S.a,{className:"dialogAction",children:[Object(d.jsx)(S.a,{children:Object(d.jsx)("button",{className:"cancelBtn",autoFocus:!0,onClick:A,color:"primary",children:"Cancel"})}),Object(d.jsx)(S.a,{children:Object(d.jsx)("button",{className:"createTodo",autoFocus:!0,onClick:J,color:"primary",children:"Add Todo"})})]})]})]})]})}var D=c.p+"static/media/logo.f6bc0ba4.svg";function M(){return Object(d.jsx)("div",{className:"col-sm-6 leftSection",children:Object(d.jsx)("img",{src:D,alt:"",className:"img-fluid"})})}function W(e){var t=e.icon,c=e.labelText,a=e.type,n=e.width,o=e.height,s=e.value,i=e.onChange;return Object(d.jsx)("div",{className:"",children:Object(d.jsxs)("div",{className:"inputbox",children:[Object(d.jsx)("input",{type:a,name:a,className:"authInput",value:s,onChange:i,required:!0}),Object(d.jsxs)("div",{className:"label",children:[Object(d.jsx)("img",{src:t,alt:"",width:n,height:o}),Object(d.jsx)("label",{htmlFor:a,children:c})]})]})})}var q=c.p+"static/media/passoword.ca569a16.png",H=c.p+"static/media/email.72835e54.png",G=c.p+"static/media/user-name.71cbdad5.png";function K(){var e=Object(a.useContext)(i),t=Object(a.useState)(!0),c=Object(s.a)(t,2),n=c[0],o=c[1],r=Object(a.useState)(""),l=Object(s.a)(r,2),j=l[0],u=l[1],b=Object(a.useState)(""),h=Object(s.a)(b,2),x=h[0],p=h[1],O=Object(a.useState)(""),f=Object(s.a)(O,2),g=f[0],v=f[1],N=Object(a.useState)(""),w=Object(s.a)(N,2),k=w[0],S=w[1],C=function(){return Object(d.jsx)("div",{className:"errorMessage",children:k})},y=function(){o(!n),S("")},T=function(){var t;(t={email:x,password:g},A.a.post("".concat(U,"/login"),{email:t.email,password:t.password}).then((function(e){return e.data})).catch((function(e){return e.response.data}))).then((function(t){console.log("data: ",t),t.error?S(t.msg):(e.setUser({id:t.id,name:t.name,token:t.token}),F.defaults.headers.common.Authorization="Bearer ".concat(t.token),F.defaults.headers.post["Content-Type"]="application/json",F.defaults.baseURL=L,console.log(e.user),localStorage.setItem("jwt",JSON.stringify(t)))})).catch((function(e){return console.log("Login Failed"+e)}))},B=function(e){e.preventDefault(),T()},I=function(t){var c;t.preventDefault(),(c={name:j,email:x,password:g},A.a.post("".concat(U,"/signup"),{name:c.name,email:c.email,password:c.password}).then((function(e){return e.data})).catch((function(e){return e.response.data}))).then((function(t){t.error?S(t.msg):(e.setUser({id:t.id,name:t.name,token:t.token}),F.defaults.headers.common.Authorization="Bearer ".concat(t.token),F.defaults.headers.post["Content-Type"]="application/json",F.defaults.baseURL=L,console.log(e.user),localStorage.setItem("jwt",JSON.stringify(t)))})).catch((function(e){return console.log("Login Failed"+e)}))};return Object(d.jsx)("div",{className:"col-sm-6 rightSection",children:!0===n?Object(d.jsxs)("form",{onSubmit:I,children:[Object(d.jsx)("h3",{className:"text-center",children:"Sign Up"}),Object(d.jsx)(W,{icon:G,labelText:"Name",type:"text",width:"20px",height:"15px",value:j,onChange:function(e){return u(e.target.value)}}),Object(d.jsx)(W,{icon:H,labelText:"Email",type:"email",width:"18px",height:"14px",value:x,onChange:function(e){return p(e.target.value)}}),Object(d.jsx)(W,{icon:q,labelText:"Password",type:"password",width:"16px",height:"18px",value:g,onChange:function(e){return v(e.target.value)}}),""!==k?C():"",Object(d.jsxs)("button",{type:"submit",className:"authBtn mb-3",children:["Sign Up ",Object(d.jsx)(m.a,{})]}),Object(d.jsx)("div",{className:"text-center",children:Object(d.jsxs)("span",{children:["Already have an account go to."," ",Object(d.jsx)("span",{className:"formSwitch",onClick:y,children:"Login"})]})})]}):Object(d.jsxs)("form",{onSubmit:B,children:[Object(d.jsx)("h3",{className:"text-center",children:"Login"}),Object(d.jsx)(W,{icon:H,labelText:"Email",type:"email",width:"18px",height:"14px",value:x,onChange:function(e){return p(e.target.value)}}),Object(d.jsx)(W,{icon:q,labelText:"Password",type:"password",width:"16px",height:"18px",value:g,onChange:function(e){return v(e.target.value)}}),""!==k?C():"",Object(d.jsxs)("button",{type:"submit",className:"authBtn mb-3",children:["Login ",Object(d.jsx)(m.a,{})]}),Object(d.jsx)("div",{className:"text-center",children:Object(d.jsxs)("span",{children:["Create a new account here..."," ",Object(d.jsx)("span",{className:"formSwitch",onClick:y,children:"Sign Up"})]})})]})})}function Q(){var e,t=Object(a.useContext)(i);return Object(a.useEffect)((function(){if(localStorage.getItem("jwt")){var e=JSON.parse(localStorage.getItem("jwt"));t.setUser({id:e.id,name:e.name})}}),[]),(null===(e=t.user)||void 0===e?void 0:e.id)?Object(d.jsx)(l.a,{to:"/home"}):Object(d.jsxs)("div",{className:"row m-0",children:[Object(d.jsx)(M,{}),Object(d.jsx)(K,{})]})}function V(){var e=Object(a.useState)(null),t=Object(s.a)(e,2),c=t[0],n=t[1];return Object(d.jsx)(r.a,{children:Object(d.jsx)(i.Provider,{value:{user:c,setUser:n},children:Object(d.jsxs)(l.d,{children:[Object(d.jsx)(l.b,{exact:!0,path:"/",component:Q}),Object(d.jsx)(l.b,{exact:!0,path:"/home",component:R}),Object(d.jsx)(l.b,{path:"*",component:j})]})})})}o.a.render(Object(d.jsx)(V,{}),document.getElementById("root"))},93:function(e,t,c){}},[[127,1,2]]]);
//# sourceMappingURL=main.a5f3a37c.chunk.js.map