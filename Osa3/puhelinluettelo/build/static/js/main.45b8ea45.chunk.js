(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{21:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(0),o=t(1),r=t.n(o),u=t(15),a=t.n(u),i=(t(21),t(6)),s=t(3),l=function(e){var n=e.person,t=e.remove;return Object(c.jsxs)("li",{children:[n.name," ",n.number," ",Object(c.jsx)("button",{onClick:t,children:"Remove"})," "]})},d=function(e){return Object(c.jsx)("div",{children:Object(c.jsx)("ul",{children:e.personsToShow.map((function(n){return Object(c.jsx)(l,{person:n,remove:function(){return e.remove(n.id)}},n.name)}))})})},j=function(e){return Object(c.jsx)("div",{children:Object(c.jsxs)("form",{onSubmit:e.addPerson,children:[Object(c.jsxs)("div",{children:["name: ",Object(c.jsx)("input",{value:e.newName,onChange:e.handleAddName}),"number: ",Object(c.jsx)("input",{value:e.newNumber,onChange:e.handleAddNumber})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"add"})})]})})},b=function(e){var n=e.message;return null===n?null:Object(c.jsx)("div",{className:"notification",children:n})},f=t(4),m=t.n(f),h="/api/persons",O=function(){return m.a.get(h).then((function(e){return e.data}))},v=function(e){return m.a.post(h,e).then((function(e){return e.data}))},p=function(e){return m.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},x=function(e,n){return m.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},g=function(e){var n=e.message;return null===n?null:Object(c.jsx)("div",{className:"error",children:n})},w=function(){var e=Object(o.useState)([]),n=Object(s.a)(e,2),t=n[0],r=n[1],u=Object(o.useState)(""),a=Object(s.a)(u,2),l=a[0],f=a[1],m=Object(o.useState)(""),h=Object(s.a)(m,2),w=h[0],C=h[1],S=Object(o.useState)(""),N=Object(s.a)(S,2),T=N[0],L=N[1],k=Object(o.useState)(null),A=Object(s.a)(k,2),P=A[0],y=A[1],F=Object(o.useState)(null),R=Object(s.a)(F,2),B=R[0],D=R[1];Object(o.useEffect)((function(){O().then((function(e){r(e)}))}),[]),console.log("render",t.length,"persons");var E=0===T.length?t:t.filter((function(e){return e.name.toLowerCase().includes(T.toLowerCase())}));return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(b,{message:P}),Object(c.jsx)(g,{message:B}),"Search: ",Object(c.jsx)("input",{value:T,onChange:function(e){L(e.target.value)}}),Object(c.jsx)(j,{addPerson:function(e){if(e.preventDefault(),t.map((function(e){return e.name.toLowerCase()})).includes(l.toLowerCase())){if(window.confirm("".concat(l," is already included in the phonebook, update number?"))){var n=t.find((function(e){return e.name.toLowerCase()===l.toLowerCase()})),c=n.id,o=Object(i.a)(Object(i.a)({},n),{},{number:w});x(c,o).then((function(e){r(t.map((function(n){return n.id!==c?n:e})))})).catch((function(e){D("The information of ".concat(n.name," has been removed")),setTimeout((function(){D(null)}),5e3),r(t.filter((function(e){return e.id!==c})))})),f(""),C(""),y("Changed ".concat(l,"'s number to ").concat(w)),setTimeout((function(){y(null)}),5e3)}}else v({name:l,number:w}).then((function(e){r(t.concat(e))})),f(""),C(""),y("Added ".concat(l)),setTimeout((function(){y(null)}),5e3)},newName:l,handleAddName:function(e){f(e.target.value)},newNumber:w,handleAddNumber:function(e){C(e.target.value)}}),Object(c.jsx)("h2",{children:"Numbers"}),Object(c.jsx)(d,{personsToShow:E,remove:function(e){return function(e){var n=t.find((function(n){return n.id===e})).name;window.confirm("Really remove ".concat(n))&&p(e).then(r(t.filter((function(n){return n.id!==e})))),y("Removed ".concat(n)),setTimeout((function(){y(null)}),5e3)}(e)}})]})},C=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,40)).then((function(n){var t=n.getCLS,c=n.getFID,o=n.getFCP,r=n.getLCP,u=n.getTTFB;t(e),c(e),o(e),r(e),u(e)}))};a.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(w,{})}),document.getElementById("root")),C()}},[[39,1,2]]]);
//# sourceMappingURL=main.45b8ea45.chunk.js.map