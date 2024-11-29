import{r as j,j as e,a2 as i,a1 as o,X as d,aw as S,a7 as B,Y as A,a0 as I,T as x,a4 as y,ax as g,ay as k,a8 as W}from"./index-CnrKXPxV.js";import{F as q,c as C,a as u,E as R,b as D,A as L}from"./EyeInvisibleOutlined-D6sfxkec.js";import{I as p,F as l}from"./InputLabel-CtAXy3CR.js";const N=s=>new RegExp(/[0-9]/).test(s),M=s=>new RegExp(/[a-z]/).test(s)&&new RegExp(/[A-Z]/).test(s),T=s=>new RegExp(/[!#@$%^&*)(+=._-]/).test(s),$=s=>s<2?{label:"Poor",color:"error.main"}:s<3?{label:"Weak",color:"warning.main"}:s<4?{label:"Normal",color:"warning.dark"}:s<5?{label:"Good",color:"success.main"}:s<6?{label:"Strong",color:"success.dark"}:{label:"Poor",color:"error.main"},z=s=>{let r=0;return s.length>5&&(r+=1),s.length>7&&(r+=1),N(s)&&(r+=1),T(s)&&(r+=1),M(s)&&(r+=1),r};function O(){const[s,r]=j.useState(),[h,b]=j.useState(!1),v=()=>{b(!h)},P=a=>{a.preventDefault()},f=a=>{const t=z(a);r($(t))};return j.useEffect(()=>{f("")},[]),e.jsx(e.Fragment,{children:e.jsx(q,{initialValues:{firstname:"",lastname:"",email:"",company:"",password:"",submit:null},validationSchema:C().shape({firstname:u().max(255).required("First Name is required"),lastname:u().max(255).required("Last Name is required"),email:u().email("Must be a valid email").max(255).required("Email is required"),password:u().max(255).required("Password is required")}),children:({errors:a,handleBlur:t,handleChange:m,handleSubmit:E,isSubmitting:F,touched:n,values:c})=>e.jsx("form",{noValidate:!0,onSubmit:E,children:e.jsxs(i,{container:!0,spacing:3,children:[e.jsxs(i,{item:!0,xs:12,md:6,children:[e.jsxs(o,{spacing:1,children:[e.jsx(p,{htmlFor:"firstname-signup",children:"First Name*"}),e.jsx(d,{id:"firstname-login",type:"firstname",value:c.firstname,name:"firstname",onBlur:t,onChange:m,placeholder:"John",fullWidth:!0,error:!!(n.firstname&&a.firstname)})]}),n.firstname&&a.firstname&&e.jsx(l,{error:!0,id:"helper-text-firstname-signup",children:a.firstname})]}),e.jsxs(i,{item:!0,xs:12,md:6,children:[e.jsxs(o,{spacing:1,children:[e.jsx(p,{htmlFor:"lastname-signup",children:"Last Name*"}),e.jsx(d,{fullWidth:!0,error:!!(n.lastname&&a.lastname),id:"lastname-signup",type:"lastname",value:c.lastname,name:"lastname",onBlur:t,onChange:m,placeholder:"Doe",inputProps:{}})]}),n.lastname&&a.lastname&&e.jsx(l,{error:!0,id:"helper-text-lastname-signup",children:a.lastname})]}),e.jsxs(i,{item:!0,xs:12,children:[e.jsxs(o,{spacing:1,children:[e.jsx(p,{htmlFor:"company-signup",children:"Company"}),e.jsx(d,{fullWidth:!0,error:!!(n.company&&a.company),id:"company-signup",value:c.company,name:"company",onBlur:t,onChange:m,placeholder:"Demo Inc.",inputProps:{}})]}),n.company&&a.company&&e.jsx(l,{error:!0,id:"helper-text-company-signup",children:a.company})]}),e.jsxs(i,{item:!0,xs:12,children:[e.jsxs(o,{spacing:1,children:[e.jsx(p,{htmlFor:"email-signup",children:"Email Address*"}),e.jsx(d,{fullWidth:!0,error:!!(n.email&&a.email),id:"email-login",type:"email",value:c.email,name:"email",onBlur:t,onChange:m,placeholder:"demo@company.com",inputProps:{}})]}),n.email&&a.email&&e.jsx(l,{error:!0,id:"helper-text-email-signup",children:a.email})]}),e.jsxs(i,{item:!0,xs:12,children:[e.jsxs(o,{spacing:1,children:[e.jsx(p,{htmlFor:"password-signup",children:"Password"}),e.jsx(d,{fullWidth:!0,error:!!(n.password&&a.password),id:"password-signup",type:h?"text":"password",value:c.password,name:"password",onBlur:t,onChange:w=>{m(w),f(w.target.value)},endAdornment:e.jsx(S,{position:"end",children:e.jsx(B,{"aria-label":"toggle password visibility",onClick:v,onMouseDown:P,edge:"end",color:"secondary",children:h?e.jsx(R,{}):e.jsx(D,{})})}),placeholder:"******",inputProps:{}})]}),n.password&&a.password&&e.jsx(l,{error:!0,id:"helper-text-password-signup",children:a.password}),e.jsx(A,{fullWidth:!0,sx:{mt:2},children:e.jsxs(i,{container:!0,spacing:2,alignItems:"center",children:[e.jsx(i,{item:!0,children:e.jsx(I,{sx:{bgcolor:s==null?void 0:s.color,width:85,height:8,borderRadius:"7px"}})}),e.jsx(i,{item:!0,children:e.jsx(x,{variant:"subtitle1",fontSize:"0.75rem",children:s==null?void 0:s.label})})]})})]}),e.jsx(i,{item:!0,xs:12,children:e.jsxs(x,{variant:"body2",children:["By Signing up, you agree to our  ",e.jsx(y,{variant:"subtitle2",component:g,to:"#",children:"Terms of Service"}),"  and  ",e.jsx(y,{variant:"subtitle2",component:g,to:"#",children:"Privacy Policy"})]})}),a.submit&&e.jsx(i,{item:!0,xs:12,children:e.jsx(l,{error:!0,children:a.submit})}),e.jsx(i,{item:!0,xs:12,children:e.jsx(k,{children:e.jsx(W,{disableElevation:!0,disabled:F,fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"primary",children:"Create Account"})})})]})})})})}function J(){return e.jsx(L,{children:e.jsxs(i,{container:!0,spacing:3,children:[e.jsx(i,{item:!0,xs:12,children:e.jsxs(o,{direction:"row",justifyContent:"space-between",alignItems:"baseline",sx:{mb:{xs:-.5,sm:.5}},children:[e.jsx(x,{variant:"h3",children:"Sign up"}),e.jsx(x,{component:g,to:"/login",variant:"body1",sx:{textDecoration:"none"},color:"primary",children:"Already have an account?"})]})}),e.jsx(i,{item:!0,xs:12,children:e.jsx(O,{})})]})})}export{J as default};
