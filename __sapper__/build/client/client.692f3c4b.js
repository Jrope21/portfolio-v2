import{s as e,n as t,S as s,i as a,e as r,a as o,t as n,c as l,b as c,d as i,f as u,g as f,l as h,h as d,j as p,k as m,m as g,o as v,p as $,q as b,r as E,u as w,v as S,w as y,x,y as _,z as P,A,B as I,C as R,D as M,E as N,F as k,G as L,H as j,I as D,J as T,K as C}from"./index.628c8320.js";import{f as O,a as V}from"./index.438f43b9.js";import{T as F}from"./TextAnimation.726056da.js";const U=[];function q(s,a=t){let r;const o=[];function n(t){if(e(s,t)&&(s=t,r)){const e=!U.length;for(let e=0;e<o.length;e+=1){const t=o[e];t[1](),U.push(t,s)}if(e){for(let e=0;e<U.length;e+=2)U[e][0](U[e+1]);U.length=0}}}return{set:n,update:function(e){n(e(s))},subscribe:function(e,l=t){const c=[e,l];return o.push(c),1===o.length&&(r=a(n)||t),e(s),()=>{const e=o.indexOf(c);-1!==e&&o.splice(e,1),0===o.length&&(r(),r=null)}}}}const H={},J=()=>({});function B(e){var s,a,m,g,v,$,b,E,w,S;return{c(){s=r("input"),a=o(),m=r("div"),g=o(),v=r("label"),$=r("span"),b=n("Navigation"),E=o(),w=r("span"),this.h()},l(e){s=l(e,"INPUT",{id:!0,type:!0,class:!0},!1),c(s).forEach(i),a=u(e,"\n"),m=l(e,"DIV",{class:!0},!1),c(m).forEach(i),g=u(e,"\n"),v=l(e,"LABEL",{id:!0,for:!0,class:!0},!1);var t=c(v);$=l(t,"SPAN",{class:!0},!1);var r=c($);b=u(r,"Navigation"),r.forEach(i),E=u(t,"\n    "),w=l(t,"SPAN",{class:!0,title:!0},!1),c(w).forEach(i),t.forEach(i),this.h()},h(){f(s,"id","toggle"),f(s,"type","checkbox"),f(s,"class","hide subnav-toggle hide-for-xlg svelte-9tyels"),f(m,"class","background svelte-9tyels"),f($,"class","show-for-sr svelte-9tyels"),f(w,"class","hamburger svelte-9tyels"),f(w,"title","Navigation"),f(v,"id","nav-label"),f(v,"for","toggle"),f(v,"class","hide-for-xlg svelte-9tyels"),S=h(m,"click",e.click_handler)},m(t,r){d(t,s,r),d(t,a,r),d(t,m,r),d(t,g,r),d(t,v,r),p(v,$),p($,b),p(v,E),p(v,w),e.label_binding(v)},p:t,i:t,o:t,d(t){t&&(i(s),i(a),i(m),i(g),i(v)),e.label_binding(null),S()}}}function Y(e,t,s){let{toggle:a,hamburger:r}=t;return e.$set=(e=>{"toggle"in e&&s("toggle",a=e.toggle),"hamburger"in e&&s("hamburger",r=e.hamburger)}),{toggle:a,hamburger:r,click_handler:function(t){m(e,t)},label_binding:function(e){g[e?"unshift":"push"](()=>{s("hamburger",r=e)})}}}class G extends s{constructor(t){super(),a(this,t,Y,B,e,["toggle","hamburger"])}}const z=()=>({}),K=()=>({});function W(e){var t,s,a,n,m,g,_,P,A,I,R,M;const N=e.$$slots.header,k=v(N,e,K),L=e.$$slots.default,j=v(L,e,null);return{c(){t=r("div"),s=r("div"),a=o(),n=r("div"),k&&k.c(),m=o(),j&&j.c(),this.h()},l(e){t=l(e,"DIV",{class:!0},!1);var r=c(t);s=l(r,"DIV",{class:!0},!1),c(s).forEach(i),a=u(r,"\n\t"),n=l(r,"DIV",{class:!0},!1);var o=c(n);k&&k.l(o),m=u(o,"\n\t\t"),j&&j.l(o),o.forEach(i),r.forEach(i),this.h()},h(){f(s,"class","modal-background svelte-iagl0a"),f(n,"class","modal svelte-iagl0a"),f(t,"class",P="center-all modal-container "+(e.showModal?"show-modal":"")+" svelte-iagl0a"),M=h(s,"click",e.click_handler)},m(e,r){d(e,t,r),p(t,s),p(t,a),p(t,n),k&&k.m(n,null),p(n,m),j&&j.m(n,null),R=!0},p(e,s){k&&k.p&&e.$$scope&&k.p($(N,s,e,z),b(N,s,K)),j&&j.p&&e.$$scope&&j.p($(L,s,e,null),b(L,s,null)),R&&!e.showModal||P===(P="center-all modal-container "+(s.showModal?"show-modal":"")+" svelte-iagl0a")||f(t,"class",P)},i(e){R||(E(k,e),E(j,e),w(()=>{_&&_.end(1),g||(g=S(n,O,{y:-20,duration:450,delay:200})),g.start()}),w(()=>{I&&I.end(1),A||(A=S(t,V,{})),A.start()}),R=!0)},o(e){y(k,e),y(j,e),g&&g.invalidate(),_=x(n,O,{y:-20,duration:450}),A&&A.invalidate(),I=x(t,V,{}),R=!1},d(e){e&&i(t),k&&k.d(e),j&&j.d(e),e&&(_&&_.end(),I&&I.end()),M()}}}function X(e,t,s){let{showModal:a}=t,{$$slots:r={},$$scope:o}=t;return e.$set=(e=>{"showModal"in e&&s("showModal",a=e.showModal),"$$scope"in e&&s("$$scope",o=e.$$scope)}),{showModal:a,click_handler:function(t){m(e,t)},$$slots:r,$$scope:o}}class Q extends s{constructor(t){super(),a(this,t,X,W,e,["showModal"])}}function Z(e){var s,a,n,h,m,g,v;return{c(){s=r("div"),a=r("div"),n=o(),h=r("div"),this.h()},l(e){s=l(e,"DIV",{id:!0,class:!0},!1);var t=c(s);a=l(t,"DIV",{id:!0,class:!0},!1),c(a).forEach(i),n=u(t,"\n  "),h=l(t,"DIV",{id:!0,class:!0},!1),c(h).forEach(i),t.forEach(i),this.h()},h(){f(a,"id","box"),f(a,"class","svelte-12rrru0"),f(h,"id","hill"),f(h,"class","svelte-12rrru0"),f(s,"id","loader"),f(s,"class","svelte-12rrru0")},m(e,t){d(e,s,t),p(s,a),p(s,n),p(s,h),v=!0},p:t,i(e){v||(w(()=>{g&&g.end(1),m||(m=S(s,V,{})),m.start()}),v=!0)},o(e){m&&m.invalidate(),g=x(s,V,{}),v=!1},d(e){e&&(i(s),g&&g.end())}}}class ee extends s{constructor(t){super(),a(this,t,null,Z,e,[])}}function te(e){var t,s=new Q({props:{showModal:e.showModal,$$slots:{default:[oe]},$$scope:{ctx:e}}});return s.$on("click",e.click_handler),{c(){s.$$.fragment.c()},l(e){s.$$.fragment.l(e)},m(e,a){_(s,e,a),t=!0},p(e,t){var a={};e.showModal&&(a.showModal=t.showModal),(e.$$scope||e.formState||e.fieldInputs)&&(a.$$scope={changed:e,ctx:t}),s.$set(a)},i(e){t||(E(s.$$.fragment,e),t=!0)},o(e){y(s.$$.fragment,e),t=!1},d(e){P(s,e)}}}function se(e){var t,s=new ee({});return{c(){s.$$.fragment.c()},l(e){s.$$.fragment.l(e)},m(e,a){_(s,e,a),t=!0},i(e){t||(E(s.$$.fragment,e),t=!0)},o(e){y(s.$$.fragment,e),t=!1},d(e){P(s,e)}}}function ae(e){var t,s,a,o,h;return{c(){t=r("h2"),s=n("SUCCESS"),this.h()},l(e){t=l(e,"H2",{class:!0},!1);var a=c(t);s=u(a,"SUCCESS"),a.forEach(i),this.h()},h(){f(t,"class","success-message svelte-1g2xpsi")},m(e,a){d(e,t,a),p(t,s),h=!0},i(e){h||(w(()=>{o&&o.end(1),a||(a=S(t,O,{y:20,duration:500,delay:200})),a.start()}),h=!0)},o(e){a&&a.invalidate(),o=x(t,O,{y:-20,duration:500,delay:0}),h=!1},d(e){e&&(i(t),o&&o.end())}}}function re(e){var t,s,a,o,h;return{c(){t=r("h2"),s=n("ERROR"),this.h()},l(e){t=l(e,"H2",{class:!0},!1);var a=c(t);s=u(a,"ERROR"),a.forEach(i),this.h()},h(){f(t,"class","success-message svelte-1g2xpsi")},m(e,a){d(e,t,a),p(t,s),h=!0},i(e){h||(w(()=>{o&&o.end(1),a||(a=S(t,O,{y:20,duration:500,delay:200})),a.start()}),h=!0)},o(e){a&&a.invalidate(),o=x(t,O,{y:-20,duration:500,delay:0}),h=!1},d(e){e&&(i(t),o&&o.end())}}}function oe(e){var t,s,a,m,g,v,$,b,w,S,x,_,P,A,N,k,L,j,D,T,C,O,V,F,U,q,H,J,B,Y,G,z,K,W,X,Q,Z=e.formState.submittingForm&&se(),ee=e.formState.formSuccess&&ae(),te=e.formState.formError&&re();return{c(){t=r("div"),s=r("div"),a=r("div"),m=r("h2"),g=n("Get In Touch"),v=o(),$=r("p"),b=n("Hi There! I’m Josh, \n                            I bring projects to life by innovating across every aspect of the customer journey. \n                            Send me a message if you are looking to hire a developer, collaborate on a project, or have a potential business opportunity."),S=o(),x=r("form"),_=r("label"),P=r("span"),A=n("Name"),N=o(),k=r("input"),L=o(),j=r("label"),D=r("span"),T=n("Email"),C=o(),O=r("input"),V=o(),F=r("label"),U=r("span"),q=n("Message"),H=o(),J=r("textarea"),B=o(),Y=r("input"),z=o(),Z&&Z.c(),K=o(),ee&&ee.c(),W=o(),te&&te.c(),this.h()},l(e){t=l(e,"DIV",{class:!0},!1);var r=c(t);s=l(r,"DIV",{class:!0},!1);var o=c(s);a=l(o,"DIV",{class:!0},!1);var n=c(a);m=l(n,"H2",{class:!0},!1);var f=c(m);g=u(f,"Get In Touch"),f.forEach(i),v=u(n,"\n                        "),$=l(n,"P",{class:!0},!1);var h=c($);b=u(h,"Hi There! I’m Josh, \n                            I bring projects to life by innovating across every aspect of the customer journey. \n                            Send me a message if you are looking to hire a developer, collaborate on a project, or have a potential business opportunity."),h.forEach(i),n.forEach(i),S=u(o,"\n                    "),x=l(o,"FORM",{class:!0},!1);var d=c(x);_=l(d,"LABEL",{class:!0},!1);var p=c(_);P=l(p,"SPAN",{class:!0},!1);var E=c(P);A=u(E,"Name"),E.forEach(i),N=u(p,"\n                            "),k=l(p,"INPUT",{name:!0,type:!0,class:!0},!1),c(k).forEach(i),p.forEach(i),L=u(d,"\n                        "),j=l(d,"LABEL",{class:!0},!1);var w=c(j);D=l(w,"SPAN",{class:!0},!1);var y=c(D);T=u(y,"Email"),y.forEach(i),C=u(w,"\n                            "),O=l(w,"INPUT",{required:!0,name:!0,type:!0,class:!0},!1),c(O).forEach(i),w.forEach(i),V=u(d,"\n                        "),F=l(d,"LABEL",{class:!0},!1);var I=c(F);U=l(I,"SPAN",{class:!0},!1);var R=c(U);q=u(R,"Message"),R.forEach(i),H=u(I,"\n                            "),J=l(I,"TEXTAREA",{name:!0,rows:!0,type:!0,class:!0},!1),c(J).forEach(i),I.forEach(i),B=u(d,"\n                        "),Y=l(d,"INPUT",{type:!0,value:!0,class:!0},!1),c(Y).forEach(i),d.forEach(i),z=u(o,"\n\n                "),Z&&Z.l(o),K=u(o,"\n                "),ee&&ee.l(o),W=u(o,"\n                "),te&&te.l(o),o.forEach(i),r.forEach(i),this.h()},h(){f(m,"class","svelte-1g2xpsi"),f($,"class","svelte-1g2xpsi"),f(a,"class",w="text-container "+(e.formState.hideFields?"hide-content":"")+" "+(e.formState.hideFields?"hide-content":"")+" svelte-1g2xpsi"),f(P,"class","svelte-1g2xpsi"),f(k,"name","name"),f(k,"type","text"),f(k,"class","svelte-1g2xpsi"),f(_,"class","svelte-1g2xpsi"),f(D,"class","svelte-1g2xpsi"),O.required=!0,f(O,"name","email"),f(O,"type","email"),f(O,"class","svelte-1g2xpsi"),f(j,"class","svelte-1g2xpsi"),f(U,"class","svelte-1g2xpsi"),f(J,"name","message"),f(J,"rows","6"),f(J,"type","textarea"),f(J,"class","svelte-1g2xpsi"),f(F,"class","svelte-1g2xpsi"),f(Y,"type","submit"),Y.value="Send Message",f(Y,"class","svelte-1g2xpsi"),f(x,"class",G="gform "+(e.formState.hideFields?"hide-content":"")+"\n                        "+(e.formState.formSuccess?"hide-content":"")+" svelte-1g2xpsi"),f(s,"class","flex-container svelte-1g2xpsi"),f(t,"class","form-container svelte-1g2xpsi"),Q=h(x,"submit",M(e.handleSubmit))},m(r,o){d(r,t,o),p(t,s),p(s,a),p(a,m),p(m,g),p(a,v),p(a,$),p($,b),p(s,S),p(s,x),p(x,_),p(_,P),p(P,A),p(_,N),p(_,k),e.input0_binding(k),p(x,L),p(x,j),p(j,D),p(D,T),p(j,C),p(j,O),e.input1_binding(O),p(x,V),p(x,F),p(F,U),p(U,q),p(F,H),p(F,J),e.textarea_binding(J),p(x,B),p(x,Y),p(s,z),Z&&Z.m(s,null),p(s,K),ee&&ee.m(s,null),p(s,W),te&&te.m(s,null),X=!0},p(e,t){X&&!e.formState||w===(w="text-container "+(t.formState.hideFields?"hide-content":"")+" "+(t.formState.hideFields?"hide-content":"")+" svelte-1g2xpsi")||f(a,"class",w),X&&!e.formState||G===(G="gform "+(t.formState.hideFields?"hide-content":"")+"\n                        "+(t.formState.formSuccess?"hide-content":"")+" svelte-1g2xpsi")||f(x,"class",G),t.formState.submittingForm?Z?E(Z,1):((Z=se()).c(),E(Z,1),Z.m(s,K)):Z&&(I(),y(Z,1,1,()=>{Z=null}),R()),t.formState.formSuccess?ee?E(ee,1):((ee=ae()).c(),E(ee,1),ee.m(s,W)):ee&&(I(),y(ee,1,1,()=>{ee=null}),R()),t.formState.formError?te?E(te,1):((te=re()).c(),E(te,1),te.m(s,null)):te&&(I(),y(te,1,1,()=>{te=null}),R())},i(e){X||(E(Z),E(ee),E(te),X=!0)},o(e){y(Z),y(ee),y(te),X=!1},d(s){s&&i(t),e.input0_binding(null),e.input1_binding(null),e.textarea_binding(null),Z&&Z.d(),ee&&ee.d(),te&&te.d(),Q()}}}function ne(e){var t,s,a=e.showModal&&!1===le&&te(e);return{c(){a&&a.c(),t=A()},l(e){a&&a.l(e),t=A()},m(e,r){a&&a.m(e,r),d(e,t,r),s=!0},p(e,s){s.showModal&&!1===le?a?(a.p(e,s),E(a,1)):((a=te(s)).c(),E(a,1),a.m(t.parentNode,t)):a&&(I(),y(a,1,1,()=>{a=null}),R())},i(e){s||(E(a),s=!0)},o(e){y(a),s=!1},d(e){a&&a.d(e),e&&i(t)}}}let le=!1;function ce(e,t,s){let{showModal:a}=t,r=[],o={submittingForm:!1,formSuccess:!1,formError:!1,hideFields:!1};function n(e){setTimeout(()=>{const e=Object.entries(o);for(const[t,a]of e)o[t]=!1,s("formState",o);r.forEach(e=>{e.value=""})},e)}return e.$set=(e=>{"showModal"in e&&s("showModal",a=e.showModal)}),{showModal:a,fieldInputs:r,formState:o,handleSubmit:async function(e){o.submittingForm=!0,s("formState",o),o.hideFields=!0,s("formState",o),o.formSuccess=!1,s("formState",o);const t={method:"POST",body:function(e,t){let s=new FormData;return t.forEach(t=>{s.append(`${t}`,`${e[t].value}`)}),s}(e.target,["name","email","message"])};try{const a=await fetch("https://script.google.com/macros/s/AKfycbyfIRXEeqnLPVq4s2hG_b35lmcm2FCn768QWC9Wfg/exec",t);await a.json(),o.submittingForm=!1,s("formState",o),o.formSuccess=!0,s("formState",o),n(1600)}catch(e){o.submittingForm=!1,s("formState",o),o.formError=!0,s("formState",o),n(1600)}},click_handler:function(t){m(e,t)},input0_binding:function(e){g[e?"unshift":"push"](()=>{r[0]=e,s("fieldInputs",r)})},input1_binding:function(e){g[e?"unshift":"push"](()=>{r[1]=e,s("fieldInputs",r)})},textarea_binding:function(e){g[e?"unshift":"push"](()=>{r[2]=e,s("fieldInputs",r)})}}}class ie extends s{constructor(t){super(),a(this,t,ce,ne,e,["showModal"])}}const{window:ue}=L;function fe(e){var t,s,a,m,g,v,$,b,S,x,A,I,R,M,L,j,D,T,C,O,V,F,U,q,H,J,B,Y,z,K,W,X,Q,Z=!1,ee=()=>{Z=!1};w(e.onwindowscroll);var te=new G({props:{toggle:he}});e.hamburger_1_binding(te),te.$on("click",e.togglerOff);var se=new ie({props:{showModal:e.showModal}});return se.$on("click",e.click_handler),{c(){s=r("header"),a=r("nav"),m=r("a"),g=r("p"),v=r("span"),$=n("<h1>"),b=n("Hi There"),S=r("span"),x=n("!"),A=r("span"),I=n("</h1>"),R=o(),te.$$.fragment.c(),M=o(),L=r("ul"),j=r("li"),D=r("span"),T=o(),C=r("li"),O=r("a"),V=n("Home"),F=o(),U=r("li"),q=r("a"),H=n("About"),J=o(),B=r("li"),Y=r("a"),z=n("Contact"),W=o(),se.$$.fragment.c(),this.h()},l(e){s=l(e,"HEADER",{class:!0},!1);var t=c(s);a=l(t,"NAV",{class:!0},!1);var r=c(a);m=l(r,"A",{href:!0,class:!0},!1);var o=c(m);g=l(o,"P",{class:!0},!1);var n=c(g);v=l(n,"SPAN",{class:!0},!1);var f=c(v);$=u(f,"<h1>"),f.forEach(i),b=u(n,"Hi There"),S=l(n,"SPAN",{class:!0},!1);var h=c(S);x=u(h,"!"),h.forEach(i),A=l(n,"SPAN",{class:!0},!1);var d=c(A);I=u(d,"</h1>"),d.forEach(i),n.forEach(i),o.forEach(i),R=u(r,"\n        "),te.$$.fragment.l(r),M=u(r,"\n        "),L=l(r,"UL",{class:!0},!1);var p=c(L);j=l(p,"LI",{class:!0},!1);var E=c(j);D=l(E,"SPAN",{class:!0},!1),c(D).forEach(i),E.forEach(i),T=u(p,"\n            "),C=l(p,"LI",{class:!0},!1);var w=c(C);O=l(w,"A",{class:!0,rel:!0,href:!0},!1);var y=c(O);V=u(y,"Home"),y.forEach(i),w.forEach(i),F=u(p,"\n            "),U=l(p,"LI",{class:!0},!1);var _=c(U);q=l(_,"A",{rel:!0,href:!0,class:!0},!1);var P=c(q);H=u(P,"About"),P.forEach(i),_.forEach(i),J=u(p,"\n            "),B=l(p,"LI",{class:!0},!1);var N=c(B);Y=l(N,"A",{href:!0,class:!0},!1);var k=c(Y);z=u(k,"Contact"),k.forEach(i),N.forEach(i),p.forEach(i),r.forEach(i),t.forEach(i),W=u(e,"\n\n"),se.$$.fragment.l(e),this.h()},h(){f(v,"class","code svelte-caousa"),f(S,"class","logo-hover svelte-caousa"),f(A,"class","code svelte-caousa"),f(g,"class","svelte-caousa"),f(m,"href","/"),f(m,"class","logo svelte-caousa"),f(D,"class","close svelte-caousa"),f(j,"class","close-container svelte-caousa"),f(O,"class"," svelte-caousa"),f(O,"rel","prefetch"),f(O,"href","/"),f(C,"class","svelte-caousa"),f(q,"rel","prefetch"),f(q,"href","/about"),f(q,"class","svelte-caousa"),f(U,"class","svelte-caousa"),f(Y,"href","javascript:void(0)"),f(Y,"class","svelte-caousa"),f(B,"class","svelte-caousa"),f(L,"class","navigation svelte-caousa"),f(a,"class",K=N(e.reduceNavSize?"scrolled container":"container")+" svelte-caousa"),f(s,"class","svelte-caousa"),Q=[h(ue,"scroll",()=>{Z=!0,clearTimeout(t),t=setTimeout(ee,100),e.onwindowscroll()}),h(j,"click",e.togglerOff),h(O,"click",e.togglerOff),h(q,"click",e.togglerOff),h(Y,"click",e.openModal)]},m(e,t){d(e,s,t),p(s,a),p(a,m),p(m,g),p(g,v),p(v,$),p(g,b),p(g,S),p(S,x),p(g,A),p(A,I),p(a,R),_(te,a,null),p(a,M),p(a,L),p(L,j),p(j,D),p(L,T),p(L,C),p(C,O),p(O,V),p(L,F),p(L,U),p(U,q),p(q,H),p(L,J),p(L,B),p(B,Y),p(Y,z),d(e,W,t),_(se,e,t),X=!0},p(e,s){e.windowY&&!Z&&(Z=!0,clearTimeout(t),scrollTo(ue.pageXOffset,s.windowY),t=setTimeout(ee,100));var r={};e.toggle&&(r.toggle=he),te.$set(r),X&&!e.reduceNavSize||K===(K=N(s.reduceNavSize?"scrolled container":"container")+" svelte-caousa")||f(a,"class",K);var o={};e.showModal&&(o.showModal=s.showModal),se.$set(o)},i(e){X||(E(te.$$.fragment,e),E(se.$$.fragment,e),X=!0)},o(e){y(te.$$.fragment,e),y(se.$$.fragment,e),X=!1},d(t){t&&i(s),e.hamburger_1_binding(null),P(te),t&&i(W),P(se,t),k(Q)}}}let he=!1;function de(e,t,s){let a,r,o,n,l=!1;return e.$$.update=((e={windowY:1})=>{e.windowY&&(n=function(e){s("reduceNavSize",l=e>75)}(r))}),{showModal:a,windowY:r,hamburger:o,reduceNavSize:l,togglerOff:function(){window.innerWidth<820&&o&&o.$$.ctx.hamburger.click()},openModal:function(){s("showModal",a=!0)},onwindowscroll:function(){r=ue.pageYOffset,s("windowY",r)},hamburger_1_binding:function(e){g[e?"unshift":"push"](()=>{s("hamburger",o=e)})},click_handler:function(){const e=a=!1;return s("showModal",a),e}}}class pe extends s{constructor(t){super(),a(this,t,de,fe,e,[])}}function me(e){var s,a,h,m,g,v,$,b,w,S,x,A,I,R,M,N,k,L,j,D,T,C,O,V,U,q,H,J=new F({props:{text:"Joshua.micah.roper@gmail.com"}}),B=new F({props:{text:"Download PDF"}});return{c(){s=r("footer"),a=r("div"),h=r("div"),m=r("p"),g=n("Feel free to shoot me an "),v=r("a"),$=n("email"),b=n(" & connect on "),w=r("a"),S=n("social"),x=o(),A=r("div"),I=r("div"),R=r("p"),M=n("Get In Touch!"),N=o(),k=r("a"),J.$$.fragment.c(),L=o(),j=r("div"),D=r("p"),T=n("View Resume"),C=o(),O=r("a"),B.$$.fragment.c(),V=o(),U=r("p"),q=n("@ 2019 Joshua Roper Development"),this.h()},l(e){s=l(e,"FOOTER",{class:!0},!1);var t=c(s);a=l(t,"DIV",{class:!0},!1);var r=c(a);h=l(r,"DIV",{class:!0},!1);var o=c(h);m=l(o,"P",{class:!0},!1);var n=c(m);g=u(n,"Feel free to shoot me an "),v=l(n,"A",{href:!0,class:!0},!1);var f=c(v);$=u(f,"email"),f.forEach(i),b=u(n," & connect on "),w=l(n,"A",{href:!0,target:!0,class:!0},!1);var d=c(w);S=u(d,"social"),d.forEach(i),n.forEach(i),o.forEach(i),x=u(r,"\n        "),A=l(r,"DIV",{class:!0},!1);var p=c(A);I=l(p,"DIV",{class:!0},!1);var E=c(I);R=l(E,"P",{class:!0},!1);var y=c(R);M=u(y,"Get In Touch!"),y.forEach(i),N=u(E,"\n                "),k=l(E,"A",{href:!0,class:!0},!1);var _=c(k);J.$$.fragment.l(_),_.forEach(i),E.forEach(i),L=u(p,"\n            "),j=l(p,"DIV",{class:!0},!1);var P=c(j);D=l(P,"P",{class:!0},!1);var F=c(D);T=u(F,"View Resume"),F.forEach(i),C=u(P,"\n                "),O=l(P,"A",{href:!0,download:!0,class:!0},!1);var H=c(O);B.$$.fragment.l(H),H.forEach(i),P.forEach(i),p.forEach(i),r.forEach(i),V=u(t,"\n    "),U=l(t,"P",{class:!0},!1);var Y=c(U);q=u(Y,"@ 2019 Joshua Roper Development"),Y.forEach(i),t.forEach(i),this.h()},h(){f(v,"href","mailto:joshua.micah.roper@gmail.com"),f(v,"class","svelte-ovb0i"),f(w,"href","https://www.linkedin.com/in/jr-dev"),f(w,"target","blank"),f(w,"class","svelte-ovb0i"),f(m,"class","headline svelte-ovb0i"),f(h,"class","left svelte-ovb0i"),f(R,"class","title svelte-ovb0i"),f(k,"href","mailto:joshua.micah.roper@gmail.com"),f(k,"class","svelte-ovb0i"),f(I,"class","text-cta svelte-ovb0i"),f(D,"class","title svelte-ovb0i"),f(O,"href","./images/resume-v2Design2.pdf"),f(O,"download",""),f(O,"class","svelte-ovb0i"),f(j,"class","text-cta svelte-ovb0i"),f(A,"class","right svelte-ovb0i"),f(a,"class","container footer-container svelte-ovb0i"),f(U,"class","copyright container svelte-ovb0i"),f(s,"class","svelte-ovb0i")},m(e,t){d(e,s,t),p(s,a),p(a,h),p(h,m),p(m,g),p(m,v),p(v,$),p(m,b),p(m,w),p(w,S),p(a,x),p(a,A),p(A,I),p(I,R),p(R,M),p(I,N),p(I,k),_(J,k,null),p(A,L),p(A,j),p(j,D),p(D,T),p(j,C),p(j,O),_(B,O,null),p(s,V),p(s,U),p(U,q),H=!0},p:t,i(e){H||(E(J.$$.fragment,e),E(B.$$.fragment,e),H=!0)},o(e){y(J.$$.fragment,e),y(B.$$.fragment,e),H=!1},d(e){e&&i(s),P(J),P(B)}}}class ge extends s{constructor(t){super(),a(this,t,null,me,e,[])}}function ve(e){var t,s,a,n,h,p=new pe({});const m=e.$$slots.default,g=v(m,e,null);var w=new ge({});return{c(){p.$$.fragment.c(),t=o(),s=r("div"),a=o(),g&&g.c(),n=o(),w.$$.fragment.c(),this.h()},l(e){p.$$.fragment.l(e),t=u(e,"\n"),s=l(e,"DIV",{class:!0},!1),c(s).forEach(i),a=u(e,"\n"),g&&g.l(e),n=u(e,"\n\n"),w.$$.fragment.l(e),this.h()},h(){f(s,"class","background svelte-wandjf")},m(e,r){_(p,e,r),d(e,t,r),d(e,s,r),d(e,a,r),g&&g.m(e,r),d(e,n,r),_(w,e,r),h=!0},p(e,t){g&&g.p&&e.$$scope&&g.p($(m,t,e,null),b(m,t,null))},i(e){h||(E(p.$$.fragment,e),E(g,e),E(w.$$.fragment,e),h=!0)},o(e){y(p.$$.fragment,e),y(g,e),y(w.$$.fragment,e),h=!1},d(e){P(p,e),e&&(i(t),i(s),i(a)),g&&g.d(e),e&&i(n),P(w,e)}}}function $e(e,t,s){let{$$slots:a={},$$scope:r}=t;return e.$set=(e=>{"$$scope"in e&&s("$$scope",r=e.$$scope)}),{$$slots:a,$$scope:r}}class be extends s{constructor(t){super(),a(this,t,$e,ve,e,[])}}function Ee(e){var t,s,a=e.error.stack+"";return{c(){t=r("pre"),s=n(a)},l(e){t=l(e,"PRE",{},!1);var r=c(t);s=u(r,a),r.forEach(i)},m(e,a){d(e,t,a),p(t,s)},p(e,t){e.error&&a!==(a=t.error.stack+"")&&j(s,a)},d(e){e&&i(t)}}}function we(e){var s,a,h,m,g,v,$,b,E,w=e.error.message+"";document.title=s=e.status;var S=e.dev&&e.error.stack&&Ee(e);return{c(){a=o(),h=r("h1"),m=n(e.status),g=o(),v=r("p"),$=n(w),b=o(),S&&S.c(),E=A(),this.h()},l(t){a=u(t,"\n\n"),h=l(t,"H1",{class:!0},!1);var s=c(h);m=u(s,e.status),s.forEach(i),g=u(t,"\n\n"),v=l(t,"P",{class:!0},!1);var r=c(v);$=u(r,w),r.forEach(i),b=u(t,"\n\n"),S&&S.l(t),E=A(),this.h()},h(){f(h,"class","svelte-8od9u6"),f(v,"class","svelte-8od9u6")},m(e,t){d(e,a,t),d(e,h,t),p(h,m),d(e,g,t),d(e,v,t),p(v,$),d(e,b,t),S&&S.m(e,t),d(e,E,t)},p(e,t){e.status&&s!==(s=t.status)&&(document.title=s),e.status&&j(m,t.status),e.error&&w!==(w=t.error.message+"")&&j($,w),t.dev&&t.error.stack?S?S.p(e,t):((S=Ee(t)).c(),S.m(E.parentNode,E)):S&&(S.d(1),S=null)},i:t,o:t,d(e){e&&(i(a),i(h),i(g),i(v),i(b)),S&&S.d(e),e&&i(E)}}}function Se(e,t,s){let{status:a,error:r}=t;return e.$set=(e=>{"status"in e&&s("status",a=e.status),"error"in e&&s("error",r=e.error)}),{status:a,error:r,dev:!1}}class ye extends s{constructor(t){super(),a(this,t,Se,we,e,["status","error"])}}function xe(e){var t,s,a=[e.level1.props],r=e.level1.component;function o(e){let t={};for(var s=0;s<a.length;s+=1)t=D(t,a[s]);return{props:t}}if(r)var n=new r(o());return{c(){n&&n.$$.fragment.c(),t=A()},l(e){n&&n.$$.fragment.l(e),t=A()},m(e,a){n&&_(n,e,a),d(e,t,a),s=!0},p(e,s){var l=e.level1?T(a,[s.level1.props]):{};if(r!==(r=s.level1.component)){if(n){I();const e=n;y(e.$$.fragment,1,0,()=>{P(e,1)}),R()}r?((n=new r(o())).$$.fragment.c(),E(n.$$.fragment,1),_(n,t.parentNode,t)):n=null}else r&&n.$set(l)},i(e){s||(n&&E(n.$$.fragment,e),s=!0)},o(e){n&&y(n.$$.fragment,e),s=!1},d(e){e&&i(t),n&&P(n,e)}}}function _e(e){var t,s=new ye({props:{error:e.error,status:e.status}});return{c(){s.$$.fragment.c()},l(e){s.$$.fragment.l(e)},m(e,a){_(s,e,a),t=!0},p(e,t){var a={};e.error&&(a.error=t.error),e.status&&(a.status=t.status),s.$set(a)},i(e){t||(E(s.$$.fragment,e),t=!0)},o(e){y(s.$$.fragment,e),t=!1},d(e){P(s,e)}}}function Pe(e){var t,s,a,r,o=[_e,xe],n=[];function l(e,t){return t.error?0:1}return t=l(0,e),s=n[t]=o[t](e),{c(){s.c(),a=A()},l(e){s.l(e),a=A()},m(e,s){n[t].m(e,s),d(e,a,s),r=!0},p(e,r){var c=t;(t=l(0,r))===c?n[t].p(e,r):(I(),y(n[c],1,1,()=>{n[c]=null}),R(),(s=n[t])||(s=n[t]=o[t](r)).c(),E(s,1),s.m(a.parentNode,a))},i(e){r||(E(s),r=!0)},o(e){y(s),r=!1},d(e){n[t].d(e),e&&i(a)}}}function Ae(e){var t,s=[{segment:e.segments[0]},e.level0.props];let a={$$slots:{default:[Pe]},$$scope:{ctx:e}};for(var r=0;r<s.length;r+=1)a=D(a,s[r]);var o=new be({props:a});return{c(){o.$$.fragment.c()},l(e){o.$$.fragment.l(e)},m(e,s){_(o,e,s),t=!0},p(e,t){var a=e.segments||e.level0?T(s,[e.segments&&{segment:t.segments[0]},e.level0&&t.level0.props]):{};(e.$$scope||e.error||e.status||e.level1)&&(a.$$scope={changed:e,ctx:t}),o.$set(a)},i(e){t||(E(o.$$.fragment,e),t=!0)},o(e){y(o.$$.fragment,e),t=!1},d(e){P(o,e)}}}function Ie(e,t,s){let{stores:a,error:r,status:o,segments:n,level0:l,level1:c=null}=t;return C(H,a),e.$set=(e=>{"stores"in e&&s("stores",a=e.stores),"error"in e&&s("error",r=e.error),"status"in e&&s("status",o=e.status),"segments"in e&&s("segments",n=e.segments),"level0"in e&&s("level0",l=e.level0),"level1"in e&&s("level1",c=e.level1)}),{stores:a,error:r,status:o,segments:n,level0:l,level1:c}}class Re extends s{constructor(t){super(),a(this,t,Ie,Ae,e,["stores","error","status","segments","level0","level1"])}}const Me=[/^\/blog.json$/,/^\/blog\/([^\/]+?).json$/],Ne=[{js:()=>import("./index.b0183634.js"),css:["index.b0183634.css","TextAnimation.726056da.css"]},{js:()=>import("./about.905dbd8b.js"),css:["about.905dbd8b.css"]},{js:()=>import("./index.15f68ffd.js"),css:["index.15f68ffd.css"]},{js:()=>import("./[slug].1a4b0b25.js"),css:["[slug].1a4b0b25.css"]}],ke=(e=>[{pattern:/^\/$/,parts:[{i:0}]},{pattern:/^\/about\/?$/,parts:[{i:1}]},{pattern:/^\/blog\/?$/,parts:[{i:2}]},{pattern:/^\/blog\/([^\/]+?)\/?$/,parts:[null,{i:3,params:t=>({slug:e(t[1])})}]}])(decodeURIComponent);const Le="undefined"!=typeof __SAPPER__&&__SAPPER__;let je,De,Te,Ce=!1,Oe=[],Ve="{}";const Fe={page:q({}),preloading:q(null),session:q(Le&&Le.session)};let Ue,qe;Fe.session.subscribe(async e=>{if(Ue=e,!Ce)return;qe=!0;const t=We(new URL(location.href)),s=De={},{redirect:a,props:r,branch:o}=await et(t);s===De&&await Ze(a,o,r,t.page)});let He,Je=null;let Be,Ye=1;const Ge="undefined"!=typeof history?history:{pushState:(e,t,s)=>{},replaceState:(e,t,s)=>{},scrollRestoration:""},ze={};function Ke(e){const t=Object.create(null);return e.length>0&&e.slice(1).split("&").forEach(e=>{let[,s,a=""]=/([^=]*)(?:=(.*))?/.exec(decodeURIComponent(e.replace(/\+/g," ")));"string"==typeof t[s]&&(t[s]=[t[s]]),"object"==typeof t[s]?t[s].push(a):t[s]=a}),t}function We(e){if(e.origin!==location.origin)return null;if(!e.pathname.startsWith(Le.baseUrl))return null;let t=e.pathname.slice(Le.baseUrl.length);if(""===t&&(t="/"),!Me.some(e=>e.test(t)))for(let s=0;s<ke.length;s+=1){const a=ke[s],r=a.pattern.exec(t);if(r){const s=Ke(e.search),o=a.parts[a.parts.length-1],n=o.params?o.params(r):{},l={host:location.host,path:t,query:s,params:n};return{href:e.href,route:a,match:r,page:l}}}}function Xe(){return{x:pageXOffset,y:pageYOffset}}async function Qe(e,t,s,a){if(t)Be=t;else{const e=Xe();ze[Be]=e,t=Be=++Ye,ze[Be]=s?e:{x:0,y:0}}Be=t,je&&Fe.preloading.set(!0);const r=Je&&Je.href===e.href?Je.promise:et(e);Je=null;const o=De={},{redirect:n,props:l,branch:c}=await r;if(o===De&&(await Ze(n,c,l,e.page),document.activeElement&&document.activeElement.blur(),!s)){let e=ze[t];if(a){const t=document.getElementById(a.slice(1));t&&(e={x:0,y:t.getBoundingClientRect().top})}ze[Be]=e,e&&scrollTo(e.x,e.y)}}async function Ze(e,t,s,a){if(e)return function(e,t={replaceState:!1}){const s=We(new URL(e,document.baseURI));return s?(Ge[t.replaceState?"replaceState":"pushState"]({id:Be},"",e),Qe(s,null).then(()=>{})):(location.href=e,new Promise(e=>{}))}(e.location,{replaceState:!0});if(Fe.page.set(a),Fe.preloading.set(!1),je)je.$set(s);else{s.stores={page:{subscribe:Fe.page.subscribe},preloading:{subscribe:Fe.preloading.subscribe},session:Fe.session},s.level0={props:await Te};const e=document.querySelector("#sapper-head-start"),t=document.querySelector("#sapper-head-end");if(e&&t){for(;e.nextSibling!==t;)st(e.nextSibling);st(e),st(t)}je=new Re({target:He,props:s,hydrate:!0})}Oe=t,Ve=JSON.stringify(a.query),Ce=!0,qe=!1}async function et(e){const{route:t,page:s}=e,a=s.path.split("/").filter(Boolean);let r=null;const o={error:null,status:200,segments:[a[0]]},n={fetch:(e,t)=>fetch(e,t),redirect:(e,t)=>{if(r&&(r.statusCode!==e||r.location!==t))throw new Error("Conflicting redirects");r={statusCode:e,location:t}},error:(e,t)=>{o.error="string"==typeof t?new Error(t):t,o.status=e}};let l;Te||(Te=Le.preloaded[0]||J.call(n,{host:s.host,path:s.path,query:s.query,params:{}},Ue));let c=1;try{const r=JSON.stringify(s.query),i=t.pattern.exec(s.path);let u=!1;l=await Promise.all(t.parts.map(async(t,l)=>{const f=a[l];if(function(e,t,s,a){if(a!==Ve)return!0;const r=Oe[e];return!!r&&(t!==r.segment||!(!r.match||JSON.stringify(r.match.slice(1,e+2))===JSON.stringify(s.slice(1,e+2)))||void 0)}(l,f,i,r)&&(u=!0),o.segments[c]=a[l+1],!t)return{segment:f};const h=c++;if(!qe&&!u&&Oe[l]&&Oe[l].part===t.i)return Oe[l];u=!1;const{default:d,preload:p}=await function(e){const t="string"==typeof e.css?[]:e.css.map(tt);return t.unshift(e.js()),Promise.all(t).then(e=>e[0])}(Ne[t.i]);let m;return m=Ce||!Le.preloaded[l+1]?p?await p.call(n,{host:s.host,path:s.path,query:s.query,params:t.params?t.params(e.match):{}},Ue):{}:Le.preloaded[l+1],o[`level${h}`]={component:d,props:m,segment:f,match:i,part:t.i}}))}catch(e){o.error=e,o.status=500,l=[]}return{redirect:r,props:o,branch:l}}function tt(e){const t=`client/${e}`;if(!document.querySelector(`link[href="${t}"]`))return new Promise((e,s)=>{const a=document.createElement("link");a.rel="stylesheet",a.href=t,a.onload=(()=>e()),a.onerror=s,document.head.appendChild(a)})}function st(e){e.parentNode.removeChild(e)}function at(e){const t=We(new URL(e,document.baseURI));if(t)return Je&&e===Je.href||function(e,t){Je={href:e,promise:t}}(e,et(t)),Je.promise}let rt;function ot(e){clearTimeout(rt),rt=setTimeout(()=>{nt(e)},20)}function nt(e){const t=ct(e.target);t&&"prefetch"===t.rel&&at(t.href)}function lt(e){if(1!==function(e){return null===e.which?e.button:e.which}(e))return;if(e.metaKey||e.ctrlKey||e.shiftKey)return;if(e.defaultPrevented)return;const t=ct(e.target);if(!t)return;if(!t.href)return;const s="object"==typeof t.href&&"SVGAnimatedString"===t.href.constructor.name,a=String(s?t.href.baseVal:t.href);if(a===location.href)return void(location.hash||e.preventDefault());if(t.hasAttribute("download")||"external"===t.getAttribute("rel"))return;if(s?t.target.baseVal:t.target)return;const r=new URL(a);if(r.pathname===location.pathname&&r.search===location.search)return;const o=We(r);if(o){Qe(o,null,t.hasAttribute("sapper-noscroll"),r.hash),e.preventDefault(),Ge.pushState({id:Be},"",r.href)}}function ct(e){for(;e&&"A"!==e.nodeName.toUpperCase();)e=e.parentNode;return e}function it(e){if(ze[Be]=Xe(),e.state){const t=We(new URL(location.href));t?Qe(t,e.state.id):location.href=location.href}else(function(e){Be=e})(Ye=Ye+1),Ge.replaceState({id:Be},"",location.href)}!function(e){var t;"scrollRestoration"in Ge&&(Ge.scrollRestoration="manual"),t=e.target,He=t,addEventListener("click",lt),addEventListener("popstate",it),addEventListener("touchstart",nt),addEventListener("mousemove",ot),Promise.resolve().then(()=>{const{hash:e,href:t}=location;Ge.replaceState({id:Ye},"",t);const s=new URL(location.href);if(Le.error)return function(e){const{host:t,pathname:s,search:a}=location,{session:r,preloaded:o,status:n,error:l}=Le;Te||(Te=o&&o[0]),Ze(null,[],{error:l,status:n,session:r,level0:{props:Te},level1:{props:{status:n,error:l},component:ye},segments:o},{host:t,path:s,query:Ke(a),params:{}})}();const a=We(s);return a?Qe(a,Ye,!0,e):void 0})}({target:document.querySelector("#sapper")});
