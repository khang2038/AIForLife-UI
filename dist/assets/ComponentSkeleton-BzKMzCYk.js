import{a as U,g as M,ad as k,s as y,_ as h,ae as A,af as f,r as x,u as B,e as F,j as t,h as L,k as W,a0 as R,a1 as c,T as l,a2 as r,$ as X,a5 as E}from"./index-CnrKXPxV.js";function N(a){return String(a).match(/[\d.\-+]*\s*(.*)/)[1]||""}function P(a){return parseFloat(a)}function K(a){return U("MuiSkeleton",a)}M("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const G=["animation","className","component","height","style","variant","width"];let p=a=>a,v,w,C,b;const O=a=>{const{classes:i,variant:n,animation:s,hasChildren:o,width:u,height:d}=a;return W({root:["root",n,s,o&&"withChildren",o&&!u&&"fitContent",o&&!d&&"heightAuto"]},K,i)},V=k(v||(v=p`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),q=k(w||(w=p`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),z=y("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(a,i)=>{const{ownerState:n}=a;return[i.root,i[n.variant],n.animation!==!1&&i[n.animation],n.hasChildren&&i.withChildren,n.hasChildren&&!n.width&&i.fitContent,n.hasChildren&&!n.height&&i.heightAuto]}})(({theme:a,ownerState:i})=>{const n=N(a.shape.borderRadius)||"px",s=P(a.shape.borderRadius);return h({display:"block",backgroundColor:a.vars?a.vars.palette.Skeleton.bg:A(a.palette.text.primary,a.palette.mode==="light"?.11:.13),height:"1.2em"},i.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${s}${n}/${Math.round(s/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}},i.variant==="circular"&&{borderRadius:"50%"},i.variant==="rounded"&&{borderRadius:(a.vars||a).shape.borderRadius},i.hasChildren&&{"& > *":{visibility:"hidden"}},i.hasChildren&&!i.width&&{maxWidth:"fit-content"},i.hasChildren&&!i.height&&{height:"auto"})},({ownerState:a})=>a.animation==="pulse"&&f(C||(C=p`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),V),({ownerState:a,theme:i})=>a.animation==="wave"&&f(b||(b=p`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),q,(i.vars||i).palette.action.hover)),e=x.forwardRef(function(i,n){const s=B({props:i,name:"MuiSkeleton"}),{animation:o="pulse",className:u,component:d="span",height:g,style:_,variant:S="text",width:$}=s,m=F(s,G),j=h({},s,{animation:o,component:d,variant:S,hasChildren:!!m.children}),T=O(j);return t.jsx(z,h({as:d,ref:n,className:L(T.root,u),ownerState:j},m,{style:h({width:$,height:g},_)}))}),D=y(R)(({theme:a})=>({paddingLeft:a.spacing(3),paddingTop:a.spacing(3),marginBottom:a.spacing(3),[a.breakpoints.down("md")]:{padding:a.spacing(2)},[a.breakpoints.down("sm")]:{padding:a.spacing(1.5)}})),H=D;function I({children:a}){const[i,n]=x.useState(!0);x.useEffect(()=>{n(!1)},[]);const s=t.jsx(X,{title:t.jsx(e,{sx:{width:{xs:120,md:180}}}),secondary:t.jsx(e,{animation:"wave",variant:"circular",width:24,height:24}),children:t.jsxs(c,{spacing:1,children:[t.jsx(e,{}),t.jsx(e,{sx:{height:64},animation:"wave",variant:"rectangular"}),t.jsx(e,{}),t.jsx(e,{})]})});return t.jsxs(t.Fragment,{children:[i&&t.jsxs(t.Fragment,{children:[t.jsxs(R,{sx:{pl:2.5},children:[t.jsxs(c,{spacing:1.25,children:[t.jsx(l,{variant:"h2",children:t.jsx(e,{})}),t.jsx(l,{variant:"h6",color:"text.secondary",children:t.jsx(e,{})})]}),t.jsxs(r,{container:!0,spacing:.75,sx:{mt:1.75},children:[t.jsx(r,{item:!0,xs:12,children:t.jsx(l,{variant:"caption",color:"text.secondary",children:t.jsxs(c,{direction:"row",spacing:1,children:[t.jsx(e,{animation:"wave",variant:"circular",width:16,height:16}),t.jsx(e,{sx:{width:{xs:250,md:450}}})]})})}),t.jsx(r,{item:!0,xs:12,children:t.jsx(l,{variant:"caption",color:"text.secondary",children:t.jsxs(c,{direction:"row",spacing:1,children:[t.jsx(e,{animation:"wave",variant:"circular",width:16,height:16}),t.jsx(e,{sx:{width:{xs:250,md:450}}})]})})})]})]}),t.jsx(H,{children:t.jsxs(r,{container:!0,spacing:3,children:[t.jsx(r,{item:!0,xs:12,md:6,children:s}),t.jsx(r,{item:!0,xs:12,md:6,children:s}),t.jsx(r,{item:!0,xs:12,md:6,children:s}),t.jsx(r,{item:!0,xs:12,md:6,children:s})]})})]}),!i&&a]})}I.propTypes={children:E.node};export{I as C,H as a};
