(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{47:function(e,t,n){},49:function(e,t,n){},72:function(e,t,n){"use strict";n.r(t);var c=n(2),r=n(0),s=n.n(r),a=n(17),o=n.n(a),i=(n(47),n(48),n(9)),j=(n(49),n(13)),u=n.n(j),b=n(11),l=n(7),d=n(74),O=n(21),h=n(22),x=n.p+"static/media/bg-photo.0216d7e3.jpg";function p(){var e=Object(O.a)(["\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  z-index: -2;\n  background-image: url(",");\n  background-repeat: no-repeat;\n  background-attachment: fixed; \n  background-size: cover;\n  &:before {\n    content: '';\n    z-index: -1;\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    background-image: linear-gradient(to bottom right,#002f4b,#dc4225);\n    opacity: .5; \n  }\n"]);return p=function(){return e},e}var m=h.a.div(p(),x),f=function(){return Object(c.jsx)(m,{})},g=n(23),v=n.n(g),S=function(e){var t=e.content,n=(e._id,e.author),r=e.createdAt;e.post;return Object(c.jsxs)(d.a,{fluid:!0,className:"pl-4",children:[Object(c.jsxs)("span",{children:["by ",n.email]}),Object(c.jsxs)("span",{children:["\xa0 ",v()(r).fromNow()]}),Object(c.jsx)("p",{children:t})]})},N=n(20),y=n(82),U=function(e){var t=e.currentUser,n=e._id,s=e.author,a=e.title,o=e.content,j=e.createdAt,b=Object(r.useState)(!1),l=Object(i.a)(b,2),O=l[0],h=l[1],x=Object(r.useState)([]),p=Object(i.a)(x,2),m=p[0],f=p[1],g=Object(r.useState)(!1),U=Object(i.a)(g,2),w=U[0],C=U[1];return Object(r.useEffect)((function(){h(!0),u.a.get("/posts/".concat(n,"/comments")).then((function(e){f(e.data),h(!1)})).catch((function(e){return console.log(e)}))}),[]),Object(c.jsxs)(d.a,{className:"mb-3 border p-2",style:{borderRadius:"4px"},children:[O&&Object(c.jsx)(L,{}),Object(c.jsxs)("span",{children:["by ",s.email]}),Object(c.jsxs)("span",{children:["\xa0 ",v()(j).fromNow()]}),Object(c.jsx)("h3",{children:a}),Object(c.jsx)("p",{children:o}),Object(c.jsxs)("p",{onClick:function(){return C(!w)},style:{userSelect:"none",cursor:"pointer"},className:"pb-0 mb-0",children:["Comments(",m.length,")"]}),Object(c.jsx)(y.a,{in:w,timeout:300,classNames:"fade",unmountOnExit:!0,children:Object(c.jsxs)("div",{children:[Object(c.jsx)("hr",{className:"mt-1"}),!t&&Object(c.jsx)(P,{info:" to post comments!"}),t&&Object(c.jsx)(F,{setComments:f,comments:m,currentUser:t,post_id:n}),m.map((function(e){return Object(c.jsx)(S,Object(N.a)({},e),e._id)}))]})})]})},w=n(75);function C(){var e=Object(O.a)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-image: linear-gradient(to bottom right,#002f4b,#dc4225);\n  opacity: .5; \n"]);return C=function(){return e},e}var k=h.a.div(C()),L=function(){return Object(c.jsx)(k,{children:Object(c.jsx)(w.a,{color:"primary"})})},E=n(76),I=function(e){var t=e.currentUser;return Object(c.jsxs)(E.a,{style:{height:"50px"},className:"px-4 justify-content-between align-items-center",children:[Object(c.jsx)(b.b,{className:"pb-0",to:"/",children:Object(c.jsx)("h3",{className:"pb-0",children:"Home"})}),!t&&Object(c.jsxs)("div",{className:"d-flex align-items-center",children:[Object(c.jsx)(b.b,{className:"pb-0",to:"/login",children:Object(c.jsx)("h3",{className:"pb-0",children:"Login"})}),Object(c.jsx)(b.b,{className:"pb-0 ml-2",to:"/sign-up",children:Object(c.jsx)("h3",{className:"pb-0",children:"Sign Up"})})]}),t&&Object(c.jsx)(b.b,{to:"/logout",children:Object(c.jsx)("h3",{className:"pb-0",children:"Logout"})})]})},P=function(e){var t=e.info;return Object(c.jsx)(d.a,{className:"d-flex align-items-center p-2 border",style:{borderRadius:"4px"},children:Object(c.jsxs)("h4",{children:[Object(c.jsx)(b.b,{to:"/login",children:"Login"}),"\xa0or\xa0",Object(c.jsx)(b.b,{to:"/sign-up",children:"Sign Up"}),t]})})},_=n(77),J=n(78),q=n(79),z=n(80),D=n(81),F=function(e){var t=e.comments,n=e.setComments,s=e.currentUser,a=e.post_id,o=Object(r.useState)(""),j=Object(i.a)(o,2),b=j[0],l=j[1];return Object(c.jsx)(d.a,{children:Object(c.jsxs)(_.a,{onSubmit:function(e){return function(e){e.preventDefault(),u.a.post("/posts/".concat(a,"/comments"),{content:b,author:s._id,post:a},{headers:{Authorization:"bearer ".concat(JSON.parse(localStorage.getItem("user")).token)}}).then((function(e){console.log(e.data),n([e.data,t])}))}(e)},children:[Object(c.jsxs)(J.a,{children:[Object(c.jsx)(q.a,{for:"content",children:"Content"}),Object(c.jsx)(z.a,{placeholder:"What are you thinking about..?",onChange:function(e){return l(e.target.value)},type:"textarea",name:"content"})]}),Object(c.jsx)(J.a,{children:Object(c.jsx)(D.a,{color:"primary",children:"Comment"})})]})})},A=function(e){var t=e.posts,n=e.currentUser;e.setPosts;return Object(c.jsx)("div",{children:t.map((function(e){return Object(c.jsx)(U,Object(N.a)(Object(N.a)({},e),{},{currentUser:n}))}))})},R=function(e){var t=e.setUser,n=Object(l.e)(),s=Object(r.useState)(""),a=Object(i.a)(s,2),o=a[0],j=a[1],b=Object(r.useState)(""),O=Object(i.a)(b,2),h=O[0],x=O[1];return Object(c.jsxs)(d.a,{children:[Object(c.jsx)("h3",{className:"text-center",children:"Login"}),Object(c.jsxs)(_.a,{onSubmit:function(e){return function(e){e.preventDefault(),u.a.post("/users/login",{email:o,password:h}).then((function(e){console.log(e.data),localStorage.setItem("user",JSON.stringify(e.data)),t(e.data.user),n.push("/")}))}(e)},children:[Object(c.jsxs)(J.a,{children:[Object(c.jsx)(q.a,{for:"email",children:"Email"}),Object(c.jsx)(z.a,{onChange:function(e){return j(e.target.value)},type:"email",name:"email",required:!0})]}),Object(c.jsxs)(J.a,{children:[Object(c.jsx)(q.a,{for:"password",children:"Password"}),Object(c.jsx)(z.a,{onChange:function(e){return x(e.target.value)},type:"password",name:"password",required:!0})]}),Object(c.jsx)(J.a,{className:"text-center",children:Object(c.jsx)(D.a,{color:"primary",children:"Login"})})]})]})},B=function(){var e=Object(l.e)(),t=Object(r.useState)(""),n=Object(i.a)(t,2),s=n[0],a=n[1],o=Object(r.useState)(""),j=Object(i.a)(o,2),b=j[0],O=j[1];return Object(c.jsxs)(d.a,{children:[Object(c.jsx)("h3",{className:"text-center",children:"Sign Up"}),Object(c.jsxs)(_.a,{onSubmit:function(t){return function(t){t.preventDefault(),u.a.post("/users/sign-up",{email:s,password:b}).then((function(t){e.push("/users/login")})).catch((function(e){return console.log(e)}))}(t)},children:[Object(c.jsxs)(J.a,{children:[Object(c.jsx)(q.a,{for:"email",children:"Email"}),Object(c.jsx)(z.a,{onChange:function(e){return a(e.target.value)},type:"email",name:"email",required:!0})]}),Object(c.jsxs)(J.a,{children:[Object(c.jsx)(q.a,{for:"password",required:!0,children:"Password"}),Object(c.jsx)(z.a,{onChange:function(e){return O(e.target.value)},type:"password",name:"password"})]}),Object(c.jsx)(J.a,{className:"text-center",children:Object(c.jsx)(D.a,{type:"submit",color:"primary",children:"Sign Up"})})]})]})},T=function(e){var t=e.setUser,n=Object(l.e)();return Object(r.useEffect)((function(){localStorage.removeItem("user"),t(void 0),n.push("/")}),[]),Object(c.jsx)(L,{})};var H=function(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),n=t[0],s=t[1],a=Object(r.useState)(!1),o=Object(i.a)(a,2),j=o[0],O=o[1],h=Object(r.useState)(void 0),x=Object(i.a)(h,2),p=x[0],m=x[1];return Object(r.useEffect)((function(){var e=JSON.parse(localStorage.getItem("user"));e&&m(e.user),O(!0),u.a.get("/posts").then((function(e){s(e.data),O(!1)}))}),[]),Object(c.jsx)(d.a,{className:"p-relative",fluid:!0,children:Object(c.jsxs)(b.a,{children:[j&&Object(c.jsx)(L,{}),Object(c.jsx)(f,{}),Object(c.jsx)(I,{currentUser:p}),Object(c.jsx)(l.a,{exact:!0,path:"/",render:function(){return Object(c.jsx)(A,{currentUser:p,setPosts:s,posts:n})}}),Object(c.jsx)(l.a,{exact:!0,path:"/login",render:function(){return Object(c.jsx)(R,{setUser:m})}}),Object(c.jsx)(l.a,{exact:!0,path:"/sign-up",render:function(){return Object(c.jsx)(B,{})}}),Object(c.jsx)(l.a,{exact:!0,path:"/logout",render:function(){return Object(c.jsx)(T,{setUser:m})}})]})})},M=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,83)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),s(e),a(e)}))};u.a.defaults.baseURL="https://nodejsblog-api.herokuapp.com/api",o.a.render(Object(c.jsx)(s.a.StrictMode,{children:Object(c.jsx)(H,{})}),document.getElementById("root")),M()}},[[72,1,2]]]);
//# sourceMappingURL=main.288c37e3.chunk.js.map