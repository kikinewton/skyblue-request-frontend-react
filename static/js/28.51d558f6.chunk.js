(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[28],{1456:function(e,t,s){"use strict";s.r(t);var c=s(1),a=s.n(c),n=s(67),r=s(306);s(24),s(5),s(21);var l=s(14);t.default=Object(n.b)((function(e){return{currentUser:e.auth.user}}),null)((function(e){return Object(l.jsx)(a.a.Fragment,{children:Object(l.jsx)(r.a,{})})}))},306:function(e,t,s){"use strict";var c=s(0),a=s(67),n=s(292),r=s(1),l=s.n(r),j=s(1434),i=s(315),p=s(954),o=s(955),b=s(333),d=(s(320),s(64)),O=s(1459),u=s(1460),h=s(1461),x=s(1462),m=s(1463),R=s(1464),g=s(1465),E=s(1466),f=s(1467),y=s(1468),_=s(1469),I=s(1470),C=s(1471),N=s(1472),L=s(1473),A=s(1458),q=s(25),M=s(114),F=s(54),U=s(133),v=s(13),P=s(14),S=function(e){var t=l.a.useState(!1),s=Object(n.a)(t,2),c=s[0],a=s[1],r=j.a.Header,S=j.a.Sider,T=j.a.Content,k=j.a.Footer,G=l.a.useState("home"),w=Object(n.a)(G,2),D=w[0],H=w[1],B=Object(q.h)(),K=e.currentUser,Q=(Object(q.j)().path,function(){a(!c)}),J=Object(P.jsx)(i.a,{onClick:function(){console.log("menu click")},children:Object(P.jsx)(i.a.Item,{icon:Object(P.jsx)(O.a,{}),onClick:function(){return d.c()},children:"Logout"},"1")});return l.a.useEffect((function(){console.log("pathname",B.pathname);var e=B.pathname;e.includes("/app/my-requests")?H("my-requests"):e.includes("/app/dashboard")?H("dashboard"):e.includes("/app/departments")?H("department"):e.includes("/app/employees")?H("employee"):e.includes("/app/settings")?H("setting"):e.includes("/app/request-items")?H("request"):e.includes("/app/petty-cash")?H("petty-cash"):e.includes("/app/float")?H("float"):e.includes("/app/suppliers")?H("/app/"):e.includes("/app/local-purchase-orders")?H("/app/local-purchase-orders"):e.includes("/app/procurement/create-quotation")?H("/app/procurement/create-quotation"):e.includes("/app/suppliers")?H("/app/suppliers"):e.includes("/app/quotations")?H("/app/quotations"):e.includes("/app/procurement/assign-suppliers")?H("assign-suppliers"):e.includes("/app/store")?H("/app/store"):e.includes("/app/grn")?H("/app/grn"):e.includes("/app/account/goods-receive-notes")?H("/app/account/goods-receive-notes"):e.includes("/app/account")?H("/app/account"):e.includes("/app/payments")?H("/app/payments"):H("home")}),[D]),Object(P.jsxs)(j.a,{className:"bs-layout",children:[Object(P.jsxs)(S,{trigger:null,collapsible:!0,collapsed:c,children:[Object(P.jsxs)("div",{style:{color:"#fff",padding:"10px 0px 10px 20px",marginBottom:10},children:[Object(P.jsx)("img",{width:"30",height:"40",src:"https://www.blueskies.com/wp-content/uploads/2017/10/logo-01.png",alt:"",loading:"eager"}),Object(P.jsx)("span",{children:"Blueskies"})]}),Object(P.jsxs)(i.a,{theme:"dark",style:{height:"100vh",overflowY:"auto"},mode:"inline",defaultSelectedKeys:["/app"],selectedKeys:[D],forceSubMenuRender:!0,onClick:function(e){return H(e)},defaultOpenKeys:["procurement"],onChange:function(e){H(e)},children:[Object(P.jsx)(i.a.Item,{children:Object(P.jsxs)(M.b,{to:"/app",children:[Object(P.jsx)(u.a,{}),Object(P.jsx)("span",{children:"Home"})]})},"home"),d.d(K.role,U.e.dashboardRoles)&&Object(P.jsx)(i.a.Item,{children:Object(P.jsxs)(M.b,{to:"/app/dashboard",children:[Object(P.jsx)(h.a,{}),Object(P.jsx)("span",{children:"Dashboard"})]})},"dashboard"),Object(P.jsx)(i.a.Item,{children:Object(P.jsxs)(M.b,{to:"/app/my-requests",children:[Object(P.jsx)(x.a,{}),Object(P.jsx)("span",{children:"My Requests"})]})},"my-requests"),d.d(K.role,[v.b.ROLE_HOD,v.b.ROLE_GENERAL_MANAGER])&&Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)(i.a.Item,{children:Object(P.jsxs)(M.b,{to:"/app/request-items",children:[Object(P.jsx)(m.a,{}),Object(P.jsx)("span",{children:"Item requests"})]})},"request"),Object(P.jsx)(i.a.Item,{children:Object(P.jsxs)(M.b,{to:"/app/float",children:[Object(P.jsx)(m.a,{}),Object(P.jsx)("span",{children:"Float requests"})]})},"float"),Object(P.jsx)(i.a.Item,{children:Object(P.jsxs)(M.b,{to:"/app/petty-cash",children:[Object(P.jsx)(m.a,{}),Object(P.jsx)("span",{children:"Petty cash requests"})]})},"petty-cash")]}),d.d(K.role,[v.b.ROLE_HOD,v.b.ROLE_CHIEF_ACCOUNT_OFFICER,v.b.ROLE_GENERAL_MANAGER,v.b.ROLE_ACCOUNT_OFFICER,v.b.ROLE_AUDITOR,v.b.ROLE_FINANCIAL_MANAGER])&&Object(P.jsx)(i.a.Item,{children:Object(P.jsxs)(M.b,{to:"/app/payments",children:[Object(P.jsx)(R.a,{}),Object(P.jsx)("span",{children:"Payments"})]})},"/app/payments"),d.d(K.role,[v.b.ROLE_HOD,v.b.ROLE_GENERAL_MANAGER,v.b.ROLE_STORE_OFFICER,v.b.ROLE_PROCUREMENT_MANAGER])&&Object(P.jsx)(i.a.Item,{children:Object(P.jsxs)(M.b,{to:"/app/grn",children:[Object(P.jsx)(g.a,{}),Object(P.jsx)("span",{children:"GRN Management"})]})},"/app/grn"),d.d(K.role,[v.b.ROLE_PROCUREMENT_OFFICER,v.b.ROLE_PROCUREMENT_MANAGER])&&Object(P.jsxs)(i.a.SubMenu,{icon:Object(P.jsx)(m.a,{}),title:"Procurement",children:[Object(P.jsx)(i.a.Item,{children:Object(P.jsx)(M.b,{to:"".concat(F.g,"/assign-suppliers"),children:"Assign Supplier"})},"assign-suppliers"),Object(P.jsx)(i.a.Item,{children:Object(P.jsx)(M.b,{to:"".concat(F.g,"/rfqs"),children:"RFQs"})},"".concat(F.g,"/rfqs")),Object(P.jsx)(i.a.Item,{children:Object(P.jsx)(M.b,{to:"".concat(F.g,"/create-quotation"),children:"Create Quotation"})},"/app/procurement/create-quotation"),Object(P.jsx)(i.a.Item,{children:Object(P.jsx)(M.b,{to:"".concat(F.g,"/add-local-purchase-order"),children:"Create LPO"})},"".concat(F.g,"/add-local-purchase-order")),Object(P.jsx)(i.a.Item,{children:Object(P.jsx)(M.b,{to:"".concat(F.g,"/request-categories"),children:"Request Categories"})},"".concat(F.g,"/request-categories"))]},"procurement"),d.d(K.role,[v.b.ROLE_PROCUREMENT_OFFICER,v.b.ROLE_PROCUREMENT_MANAGER])&&Object(P.jsx)(i.a.Item,{children:Object(P.jsxs)(M.b,{to:"/app/quotations",children:[Object(P.jsx)(E.a,{}),Object(P.jsx)("span",{children:"Supplier Quotes"})]})},"/app/quotations"),d.d(K.role,[v.b.ROLE_PROCUREMENT_OFFICER,v.b.ROLE_PROCUREMENT_MANAGER])&&Object(P.jsx)(i.a.Item,{children:Object(P.jsxs)(M.b,{to:"/app/local-purchase-orders",children:[Object(P.jsx)(f.a,{}),Object(P.jsx)("span",{children:"Local Purchase Orders"})]})},"/app/local-purchase-orders"),d.d(K.role,[v.b.ROLE_STORE_OFFICER])&&Object(P.jsx)(i.a.Item,{icon:Object(P.jsx)(g.a,{}),children:Object(P.jsx)(M.b,{to:"/app/store",children:"Store"})},"/app/store"),d.d(K.role,U.e.listDepartmentsRoles)&&Object(P.jsx)(i.a.Item,{children:Object(P.jsxs)(M.b,{to:"/app/departments",children:[Object(P.jsx)(y.a,{}),Object(P.jsx)("span",{children:"Departments"})]})},"department"),d.d(K.role,[v.b.ROLE_PROCUREMENT_OFFICER,v.b.ROLE_PROCUREMENT_MANAGER])&&Object(P.jsx)(i.a.Item,{children:Object(P.jsxs)(M.b,{to:"/app/suppliers",children:[Object(P.jsx)(_.a,{}),Object(P.jsx)("span",{children:"Supplier Management"})]})},"/app/suppliers"),d.d(K.role,U.e.listUserRoles)&&Object(P.jsx)(i.a.Item,{children:Object(P.jsxs)(M.b,{to:"/app/employees",children:[Object(P.jsx)(_.a,{}),Object(P.jsx)("span",{children:"User Management"})]})},"employee"),Object(P.jsx)(i.a.Item,{icon:Object(P.jsx)(I.a,{}),children:Object(P.jsx)(M.b,{to:"/app/settings",children:Object(P.jsx)("span",{children:"Settings"})})},"setting"),d.d(K.role,U.e.report)&&Object(P.jsx)(i.a.Item,{icon:Object(P.jsx)(C.a,{}),children:Object(P.jsx)(M.b,{to:"/app/reports",children:Object(P.jsx)("span",{children:"Reports"})})},"/app/reports"),Object(P.jsx)(i.a.Item,{icon:Object(P.jsx)(O.a,{}),danger:!0,onClick:function(){d.c()},children:"Logout"},"11")]})]}),Object(P.jsxs)(j.a,{className:"bs-site-layout",children:[Object(P.jsx)(r,{className:"bs-site-layout-background",style:{padding:0},children:Object(P.jsxs)(p.a,{children:[Object(P.jsx)(o.a,{span:2,children:c?Object(P.jsx)(N.a,{className:"bs-trigger",onClick:Q}):Object(P.jsx)(L.a,{onClick:Q,className:"bs-trigger"})}),Object(P.jsx)(o.a,{span:14,children:e.title&&Object(P.jsx)("span",{style:{fontSize:20,fontWeight:"lighter",color:"#6e7273"},children:e.title})}),Object(P.jsx)(o.a,{span:8,children:Object(P.jsx)("div",{style:{float:"right",marginRight:10,display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"center",cursor:"pointer",height:"100%"},children:Object(P.jsx)(b.a.Button,{overlay:J,placement:"bottomLeft",icon:Object(P.jsx)(A.a,{}),children:K.fullName})})})]})}),Object(P.jsxs)(T,{className:"bs-site-layout-content",style:{minHeight:380},children:[e.subNav&&Object(P.jsx)(p.a,{className:"bs-sub-nav-header",children:Object(P.jsx)(o.a,{span:24,children:e.subNav})}),Object(P.jsx)(p.a,{children:Object(P.jsx)(o.a,{span:24,style:{padding:10},children:e.children})})]}),Object(P.jsx)(k,{style:{textAlign:"center"},children:"Blueskies Procurement System \xa92021 Created by Tech-Bridge"})]})]})};t.a=Object(a.b)((function(e){return{currentUser:e.auth.user}}),null)((function(e){return Object(P.jsx)(S,Object(c.a)({},e))}))},320:function(e,t,s){}}]);
//# sourceMappingURL=28.51d558f6.chunk.js.map