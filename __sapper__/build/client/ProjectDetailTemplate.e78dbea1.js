import{S as e,i as s,s as t,e as l,t as a,a as r,c as i,b as n,f as c,d as o,g as h,h as g,j as f,I as v,n as u,M as T,y as m,r as E,w as p,z as d,A as S,l as A,u as $,O as k,F as b,B as x,C as I,N as P}from"./index.c479666d.js";import{f as w}from"./index.f4e27f23.js";import{T as y}from"./TextAnimation.7189b7ad.js";function j(e){var s,t,T,m,E,p,d,S;return{c(){s=l("div"),t=l("div"),T=l("h1"),m=a(e.title),E=r(),p=l("span"),d=a(e.title),this.h()},l(l){s=i(l,"DIV",{class:!0},!1);var a=n(s);t=i(a,"DIV",{class:!0},!1);var r=n(t);T=i(r,"H1",{class:!0},!1);var h=n(T);m=c(h,e.title),h.forEach(o),E=c(r,"\n        "),p=i(r,"SPAN",{class:!0},!1);var g=n(p);d=c(g,e.title),g.forEach(o),r.forEach(o),a.forEach(o),this.h()},h(){h(T,"class","svelte-11g5sro"),h(p,"class","svelte-11g5sro"),h(t,"class",S="title-container "+e.sidePage+" svelte-11g5sro"),h(s,"class","page-header svelte-11g5sro")},m(e,l){g(e,s,l),f(s,t),f(t,T),f(T,m),f(t,E),f(t,p),f(p,d)},p(e,s){e.title&&(v(m,s.title),v(d,s.title)),e.sidePage&&S!==(S="title-container "+s.sidePage+" svelte-11g5sro")&&h(t,"class",S)},i:u,o:u,d(e){e&&o(s)}}}function D(e,s,t){let{title:l,sidePage:a}=s;return e.$set=(e=>{"title"in e&&t("title",l=e.title),"sidePage"in e&&t("sidePage",a=e.sidePage)}),{title:l,sidePage:a}}class N extends e{constructor(e){super(),s(this,e,D,j,t,["title","sidePage"])}}function V(e){var s,t,v,u,S,A,$,k,b,x=new y({props:{text:"View Website"}});return{c(){s=l("div"),t=l("h3"),v=a("Details"),u=r(),S=l("p"),$=r(),k=l("a"),x.$$.fragment.c(),this.h()},l(e){s=i(e,"DIV",{class:!0},!1);var l=n(s);t=i(l,"H3",{class:!0},!1);var a=n(t);v=c(a,"Details"),a.forEach(o),u=c(l,"\n    "),S=i(l,"P",{class:!0},!1);var r=n(S);$=c(r,"\n        "),k=i(r,"A",{target:!0,rel:!0,href:!0,class:!0},!1);var h=n(k);x.$$.fragment.l(h),h.forEach(o),r.forEach(o),l.forEach(o),this.h()},h(){h(t,"class","svelte-1ypbvbo"),A=new T(e.text,$),h(k,"target","_blank"),h(k,"rel","noopener"),h(k,"href",e.url),h(k,"class","svelte-1ypbvbo"),h(S,"class","svelte-1ypbvbo"),h(s,"class","svelte-1ypbvbo")},m(e,l){g(e,s,l),f(s,t),f(t,v),f(s,u),f(s,S),A.m(S),f(S,$),f(S,k),m(x,k,null),b=!0},p(e,s){b&&!e.text||A.p(s.text),b&&!e.url||h(k,"href",s.url)},i(e){b||(E(x.$$.fragment,e),b=!0)},o(e){p(x.$$.fragment,e),b=!1},d(e){e&&o(s),d(x)}}}function _(e,s,t){let{text:l,url:a}=s;return e.$set=(e=>{"text"in e&&t("text",l=e.text),"url"in e&&t("url",a=e.url)}),{text:l,url:a}}class O extends e{constructor(e){super(),s(this,e,_,V,t,["text","url"])}}function C(e,s,t){const l=Object.create(e);return l.img=s[t],l.i=t,l}function B(e,s,t){const l=Object.create(e);return l.img=s[t],l}function H(e){var s,t,a,v,u,T,m,E,p,d,S,x,I;return{c(){s=l("div"),t=l("button"),a=l("span"),v=r(),u=l("img"),E=r(),p=l("button"),d=l("span"),this.h()},l(e){s=i(e,"DIV",{class:!0},!1);var l=n(s);t=i(l,"BUTTON",{"aria-label":!0,class:!0},!1);var r=n(t);a=i(r,"SPAN",{class:!0},!1),n(a).forEach(o),r.forEach(o),v=c(l,"\n                    "),u=i(l,"IMG",{src:!0,alt:!0,class:!0},!1),n(u).forEach(o),E=c(l,"\n                    "),p=i(l,"BUTTON",{"aria-label":!0,class:!0},!1);var h=n(p);d=i(h,"SPAN",{class:!0},!1),n(d).forEach(o),h.forEach(o),l.forEach(o),this.h()},h(){h(a,"class","arrow-left svelte-1mkpo63"),h(t,"aria-label","a button that shows the previous image in the carousel"),h(t,"class","back svelte-1mkpo63"),h(u,"src",T=e.img.src),h(u,"alt",m=e.img.alt),h(u,"class","svelte-1mkpo63"),h(d,"class","arrow-right svelte-1mkpo63"),h(p,"aria-label","a button that shows the next image in the carousel"),h(p,"class","next svelte-1mkpo63"),h(s,"class","slide svelte-1mkpo63"),I=[A(t,"click",e.click_handler),A(p,"click",e.click_handler_1)]},m(e,l){g(e,s,l),f(s,t),f(t,a),f(s,v),f(s,u),f(s,E),f(s,p),f(p,d),x=!0},p(e,s){x&&!e.STATE||T===(T=s.img.src)||h(u,"src",T),x&&!e.STATE||m===(m=s.img.alt)||h(u,"alt",m)},i(e){x||(e&&$(()=>{S||(S=k(s,w,{x:-40,duration:850},!0)),S.run(1)}),x=!0)},o(e){e&&(S||(S=k(s,w,{x:-40,duration:850},!1)),S.run(0)),x=!1},d(e){e&&(o(s),S&&S.end()),b(I)}}}function U(e){var s,t=e.img.visible&&H(e);return{c(){t&&t.c(),s=S()},l(e){t&&t.l(e),s=S()},m(e,l){t&&t.m(e,l),g(e,s,l)},p(e,l){l.img.visible?t?(t.p(e,l),E(t,1)):((t=H(l)).c(),E(t,1),t.m(s.parentNode,s)):t&&(x(),p(t,1,1,()=>{t=null}),I())},d(e){t&&t.d(e),e&&o(s)}}}function L(e){var s,t,a;function r(){return e.click_handler_2(e)}return{c(){s=l("span"),this.h()},l(e){s=i(e,"SPAN",{class:!0,"aria-label":!0},!1),n(s).forEach(o),this.h()},h(){h(s,"class",t="circle "+(e.img.visible?"active":"")+" svelte-1mkpo63"),h(s,"aria-label","a button to go to a specific image in the carousel"),a=A(s,"click",r)},m(e,t){g(e,s,t)},p(l,a){e=a,l.STATE&&t!==(t="circle "+(e.img.visible?"active":"")+" svelte-1mkpo63")&&h(s,"class",t)},d(e){e&&o(s),a()}}}function M(e){for(var s,t,a,v,T,m=e.STATE.images,E=[],p=0;p<m.length;p+=1)E[p]=U(B(e,m,p));var d=e.STATE.images,S=[];for(p=0;p<d.length;p+=1)S[p]=L(C(e,d,p));return{c(){s=l("div"),t=l("div"),a=r();for(var e=0;e<E.length;e+=1)E[e].c();v=r(),T=l("div");for(e=0;e<S.length;e+=1)S[e].c();this.h()},l(e){s=i(e,"DIV",{class:!0},!1);var l=n(s);t=i(l,"DIV",{class:!0},!1),n(t).forEach(o),a=c(l," \n        ");for(var r=0;r<E.length;r+=1)E[r].l(l);v=c(l,"\n    "),T=i(l,"DIV",{class:!0},!1);var h=n(T);for(r=0;r<S.length;r+=1)S[r].l(h);h.forEach(o),l.forEach(o),this.h()},h(){h(t,"class","box svelte-1mkpo63"),h(T,"class","circles-container svelte-1mkpo63"),h(s,"class","carousel-container svelte-1mkpo63")},m(e,l){g(e,s,l),f(s,t),f(s,a);for(var r=0;r<E.length;r+=1)E[r].m(s,null);f(s,v),f(s,T);for(r=0;r<S.length;r+=1)S[r].m(T,null)},p(e,t){if(e.STATE){m=t.STATE.images;for(var l=0;l<m.length;l+=1){const a=B(t,m,l);E[l]?E[l].p(e,a):(E[l]=U(a),E[l].c(),E[l].m(s,v))}for(;l<E.length;l+=1)E[l].d(1);E.length=m.length}if(e.STATE){d=t.STATE.images;for(l=0;l<d.length;l+=1){const s=C(t,d,l);S[l]?S[l].p(e,s):(S[l]=L(s),S[l].c(),S[l].m(T,null))}for(;l<S.length;l+=1)S[l].d(1);S.length=d.length}},i:u,o:u,d(e){e&&o(s),P(E,e),P(S,e)}}}function z(e,s,t){let{images:l}=s,a={images:l};function r(e){a.images.forEach(s=>{e===s.key?s.visible=!0:s.visible=!1}),t("STATE",a={...a})}function i(){let e=c(),s=null!==e?e+1:null;null!==s&&(a.images[e].visible=!1,t("STATE",a)),s<a.images.length?(a.images[s].visible=!0,t("STATE",a)):(a.images[0].visible=!0,t("STATE",a)),t("STATE",a={...a})}function n(){let e=c(),s=null!==e?e-1:null;null!==s&&(a.images[e].visible=!1,t("STATE",a)),s>-1?(a.images[s].visible=!0,t("STATE",a)):(a.images[a.images.length-1].visible=!0,t("STATE",a)),t("STATE",a={...a})}function c(){if(!a.images.length)return null;let e;return a.images.forEach((s,t)=>{s.visible&&(e=t)}),e}return e.$set=(e=>{"images"in e&&t("images",l=e.images)}),{images:l,STATE:a,switchSlides:r,viewNextSlide:i,viewPreviousSlide:n,click_handler:function(){return n()},click_handler_1:function(){return i()},click_handler_2:function({img:e}){r(e.key)}}}class F extends e{constructor(e){super(),s(this,e,z,M,t,["images"])}}function G(e,s,t){const l=Object.create(e);return l.skill=s[t],l}function W(e){var s,t,r=e.skill+"";return{c(){s=l("li"),t=a(r),this.h()},l(e){s=i(e,"LI",{class:!0},!1);var l=n(s);t=c(l,r),l.forEach(o),this.h()},h(){h(s,"class","svelte-jn1xgp")},m(e,l){g(e,s,l),f(s,t)},p(e,s){e.skills&&r!==(r=s.skill+"")&&v(t,r)},d(e){e&&o(s)}}}function q(e){for(var s,t,v,T,m,E=e.skills,p=[],d=0;d<E.length;d+=1)p[d]=W(G(e,E,d));return{c(){s=l("div"),t=l("h3"),v=a("The Tech"),T=r(),m=l("ul");for(var e=0;e<p.length;e+=1)p[e].c();this.h()},l(e){s=i(e,"DIV",{class:!0},!1);var l=n(s);t=i(l,"H3",{class:!0},!1);var a=n(t);v=c(a,"The Tech"),a.forEach(o),T=c(l,"\n        "),m=i(l,"UL",{class:!0},!1);for(var r=n(m),h=0;h<p.length;h+=1)p[h].l(r);r.forEach(o),l.forEach(o),this.h()},h(){h(t,"class","svelte-jn1xgp"),h(m,"class","skills svelte-jn1xgp"),h(s,"class","svelte-jn1xgp")},m(e,l){g(e,s,l),f(s,t),f(t,v),f(s,T),f(s,m);for(var a=0;a<p.length;a+=1)p[a].m(m,null)},p(e,s){if(e.skills){E=s.skills;for(var t=0;t<E.length;t+=1){const l=G(s,E,t);p[t]?p[t].p(e,l):(p[t]=W(l),p[t].c(),p[t].m(m,null))}for(;t<p.length;t+=1)p[t].d(1);p.length=E.length}},i:u,o:u,d(e){e&&o(s),P(p,e)}}}function J(e,s,t){let{skills:l}=s;return e.$set=(e=>{"skills"in e&&t("skills",l=e.skills)}),{skills:l}}class K extends e{constructor(e){super(),s(this,e,J,q,t,["skills"])}}function Q(e){var s,t,v,u,T,S,A,$,k,b,x,I,P,w,y,j;document.title=s=e.STATE.metaTitle;var D=new N({props:{title:e.STATE.title}}),V=new F({props:{images:e.STATE.images}}),_=new O({props:{text:e.STATE.description,url:e.STATE.url}}),C=new K({props:{skills:e.STATE.skills}});return{c(){t=r(),v=l("div"),u=l("div"),D.$$.fragment.c(),T=r(),S=l("div"),V.$$.fragment.c(),A=r(),$=l("section"),_.$$.fragment.c(),k=r(),b=l("section"),C.$$.fragment.c(),x=r(),I=l("section"),P=l("a"),w=a("Check The Site!"),this.h()},l(e){t=c(e,"\n\n\n"),v=i(e,"DIV",{class:!0},!1);var s=n(v);u=i(s,"DIV",{class:!0},!1);var l=n(u);D.$$.fragment.l(l),T=c(l,"\n        "),S=i(l,"DIV",{class:!0},!1);var a=n(S);V.$$.fragment.l(a),A=c(a,"\n            "),$=i(a,"SECTION",{class:!0},!1);var r=n($);_.$$.fragment.l(r),r.forEach(o),k=c(a,"\n            "),b=i(a,"SECTION",{class:!0},!1);var h=n(b);C.$$.fragment.l(h),h.forEach(o),x=c(a,"\n            "),I=i(a,"SECTION",{class:!0},!1);var g=n(I);P=i(g,"A",{href:!0,rel:!0,target:!0,class:!0},!1);var f=n(P);w=c(f,"Check The Site!"),f.forEach(o),g.forEach(o),a.forEach(o),l.forEach(o),s.forEach(o),this.h()},h(){h($,"class","project-description svelte-13eg6y1"),h(b,"class","skills-container svelte-13eg6y1"),h(P,"href",y=e.STATE.url),h(P,"rel","noopener"),h(P,"target","_blank"),h(P,"class","svelte-13eg6y1"),h(I,"class","cta svelte-13eg6y1"),h(S,"class","inner-container svelte-13eg6y1"),h(u,"class","container svelte-13eg6y1"),h(v,"class","project-detail svelte-13eg6y1")},m(e,s){g(e,t,s),g(e,v,s),f(v,u),m(D,u,null),f(u,T),f(u,S),m(V,S,null),f(S,A),f(S,$),m(_,$,null),f(S,k),f(S,b),m(C,b,null),f(S,x),f(S,I),f(I,P),f(P,w),j=!0},p(e,t){j&&!e.STATE||s===(s=t.STATE.metaTitle)||(document.title=s);var l={};e.STATE&&(l.title=t.STATE.title),D.$set(l);var a={};e.STATE&&(a.images=t.STATE.images),V.$set(a);var r={};e.STATE&&(r.text=t.STATE.description),e.STATE&&(r.url=t.STATE.url),_.$set(r);var i={};e.STATE&&(i.skills=t.STATE.skills),C.$set(i),j&&!e.STATE||y===(y=t.STATE.url)||h(P,"href",y)},i(e){j||(E(D.$$.fragment,e),E(V.$$.fragment,e),E(_.$$.fragment,e),E(C.$$.fragment,e),j=!0)},o(e){p(D.$$.fragment,e),p(V.$$.fragment,e),p(_.$$.fragment,e),p(C.$$.fragment,e),j=!1},d(e){e&&(o(t),o(v)),d(D),d(V),d(_),d(C)}}}function R(e,s,t){let{STATE:l}=s;return e.$set=(e=>{"STATE"in e&&t("STATE",l=e.STATE)}),{STATE:l}}class X extends e{constructor(e){super(),s(this,e,R,Q,t,["STATE"])}}export{X as P};
