import{S as s,i as t,s as a,e,t as l,h as c,c as i,a as r,j as n,d as o,k as h,b as d,f as g,g as v,M as f,n as p}from"./client.f5cc31d0.js";function u(s){let t,a,u,P,w,E,m,j;return{c(){t=e("div"),a=e("div"),u=e("h1"),P=l(s[0]),w=c(),E=e("span"),m=l(s[0]),this.h()},l(e){t=i(e,"DIV",{class:!0});var l=r(t);a=i(l,"DIV",{class:!0});var c=r(a);u=i(c,"H1",{class:!0});var d=r(u);P=n(d,s[0]),d.forEach(o),w=h(c),E=i(c,"SPAN",{class:!0});var g=r(E);m=n(g,s[0]),g.forEach(o),c.forEach(o),l.forEach(o),this.h()},h(){d(u,"class","svelte-1wt3gtl"),d(E,"class","svelte-1wt3gtl"),d(a,"class",j="title-container "+s[1]+" svelte-1wt3gtl"),d(t,"class","page-header svelte-1wt3gtl")},m(s,e){g(s,t,e),v(t,a),v(a,u),v(u,P),v(a,w),v(a,E),v(E,m)},p(s,[t]){1&t&&f(P,s[0]),1&t&&f(m,s[0]),2&t&&j!==(j="title-container "+s[1]+" svelte-1wt3gtl")&&d(a,"class",j)},i:p,o:p,d(s){s&&o(t)}}}function P(s,t,a){let{title:e}=t,{sidePage:l}=t;return s.$$set=s=>{"title"in s&&a(0,e=s.title),"sidePage"in s&&a(1,l=s.sidePage)},[e,l]}class w extends s{constructor(s){super(),t(this,s,P,u,a,{title:0,sidePage:1})}}export{w as P};