import{S as t,i as e,s,x as r,e as l,c as a,a as A,d as c,y as i,f as n,z as o,p as m,q as g,A as h,B as f,l as p,m as u,o as B,r as E,D as $,E as d,F as S,b as Q,u as v,G as j,H as x,v as w,I as C,J as I,K as Y,n as D,L as V,g as M,T as b,t as N,h as T,j as G,k as Z,M as q,N as W,O as K}from"./client.f5cc31d0.js";const U=t=>({visible:2&t,hasBeenVisible:4&t}),R=t=>({visible:t[1],hasBeenVisible:t[2]});function k(t){let e,s;const h=t[4].default,f=r(h,t,t[3],R);return{c(){e=l("div"),f&&f.c(),this.h()},l(t){e=a(t,"DIV",{style:!0});var s=A(e);f&&f.l(s),s.forEach(c),this.h()},h(){i(e,"position","relative"),i(e,"width","100%"),i(e,"height","100%")},m(r,l){n(r,e,l),f&&f.m(e,null),t[5](e),s=!0},p(t,[e]){f&&f.p&&14&e&&o(f,h,t,t[3],e,U,R)},i(t){s||(m(f,t),s=!0)},o(t){g(f,t),s=!1},d(s){s&&c(e),f&&f.d(s),t[5](null)}}}function H(t,e,s){let{$$slots:r={},$$scope:l}=e,a=null,A=!1,c=!1,i=null;return h((()=>(s(6,i=new IntersectionObserver((t=>{s(1,A=t[0].isIntersecting),s(2,c=c||A)}),{rootMargin:"0px 0px 200px 0px"})),i.observe(a),()=>{c||i.unobserve(a)}))),t.$$set=t=>{"$$scope"in t&&s(3,l=t.$$scope)},t.$$.update=()=>{69&t.$$.dirty&&c&&i.unobserve(a)},[a,A,c,l,r,function(t){f[t?"unshift":"push"]((()=>{a=t,s(0,a)}))}]}class J extends t{constructor(t){super(),e(this,t,H,k,s,{})}}function X(t){let e,s,r,A,i,o;return{c(){e=l("img"),this.h()},l(t){e=a(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){e.src!==(s=t[1])&&Q(e,"src",s),Q(e,"alt",t[2]),Q(e,"class","svelte-14xi3gk")},m(s,r){n(s,e,r),A=!0,i||(o=[v(e,"outrostart",t[5]),v(e,"outroend",t[6])],i=!0)},p(t,r){(!A||2&r&&e.src!==(s=t[1]))&&Q(e,"src",s),(!A||4&r)&&Q(e,"alt",t[2])},i(t){A||(r&&r.end(1),A=!0)},o(t){r=j(e,x,{}),A=!1},d(t){t&&c(e),t&&r&&r.end(),i=!1,w(o)}}}function F(t){let e,s,r;return{c(){e=l("img"),this.h()},l(t){e=a(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){e.src!==(s=t[0])&&Q(e,"src",s),Q(e,"alt",t[2]),Q(e,"class","svelte-14xi3gk"),C(e,"isAbsolute",t[3]),C(e,"isStatic",t[4])},m(t,s){n(t,e,s)},p(t,r){1&r&&e.src!==(s=t[0])&&Q(e,"src",s),4&r&&Q(e,"alt",t[2]),8&r&&C(e,"isAbsolute",t[3]),16&r&&C(e,"isStatic",t[4])},i(t){r||I((()=>{r=Y(e,x,{}),r.start()}))},o:D,d(t){t&&c(e)}}}function O(t){let e,s,r,l;const a=[F,X],A=[];function i(t,e){return t[7]?0:1}return e=i(t),s=A[e]=a[e](t),{c(){s.c(),r=$()},l(t){s.l(t),r=$()},m(t,s){A[e].m(t,s),n(t,r,s),l=!0},p(t,l){let c=e;e=i(t),e===c?A[e].p(t,l):(d(),g(A[c],1,1,(()=>{A[c]=null})),S(),s=A[e],s?s.p(t,l):(s=A[e]=a[e](t),s.c()),m(s,1),s.m(r.parentNode,r))},i(t){l||(m(s),l=!0)},o(t){g(s),l=!1},d(t){A[e].d(t),t&&c(r)}}}function L(t){let e,s;return e=new J({props:{$$slots:{default:[O,({hasBeenVisible:t})=>({7:t}),({hasBeenVisible:t})=>t?128:0]},$$scope:{ctx:t}}}),{c(){p(e.$$.fragment)},l(t){u(e.$$.fragment,t)},m(t,r){B(e,t,r),s=!0},p(t,[s]){const r={};415&s&&(r.$$scope={dirty:s,ctx:t}),e.$set(r)},i(t){s||(m(e.$$.fragment,t),s=!0)},o(t){g(e.$$.fragment,t),s=!1},d(t){E(e,t)}}}function P(t,e,s){let{imgSrc:r="#"}=e,{imgSrcSmall:l=r}=e,{imgAlt:a="Image"}=e,A=!1,c=!1;return t.$$set=t=>{"imgSrc"in t&&s(0,r=t.imgSrc),"imgSrcSmall"in t&&s(1,l=t.imgSrcSmall),"imgAlt"in t&&s(2,a=t.imgAlt)},[r,l,a,A,c,function(){s(3,A=!0),s(4,c=!1)},function(){s(3,A=!1),s(4,c=!0)}]}class z extends t{constructor(t){super(),e(this,t,P,L,s,{imgSrc:0,imgSrcSmall:1,imgAlt:2})}}function y(t){let e,s,r,i,o;return r=new z({props:{imgSrc:t[0],imgSrcSmall:t[1],imgAlt:t[2]}}),{c(){e=l("a"),s=l("div"),p(r.$$.fragment),this.h()},l(t){e=a(t,"A",{rel:!0,class:!0,href:!0});var l=A(e);s=a(l,"DIV",{class:!0});var i=A(s);u(r.$$.fragment,i),i.forEach(c),l.forEach(c),this.h()},h(){Q(s,"class","img-container svelte-2zsp5j"),Q(e,"rel","prefetch"),Q(e,"class",i=V(t[4])+" svelte-2zsp5j"),Q(e,"href",t[3])},m(t,l){n(t,e,l),M(e,s),B(r,s,null),o=!0},p(t,[s]){const l={};1&s&&(l.imgSrc=t[0]),2&s&&(l.imgSrcSmall=t[1]),4&s&&(l.imgAlt=t[2]),r.$set(l),(!o||16&s&&i!==(i=V(t[4])+" svelte-2zsp5j"))&&Q(e,"class",i),(!o||8&s)&&Q(e,"href",t[3])},i(t){o||(m(r.$$.fragment,t),o=!0)},o(t){g(r.$$.fragment,t),o=!1},d(t){t&&c(e),E(r)}}}function _(t,e,s){let{imgSrc:r}=e,{imgSrcSmall:l}=e,{imgAlt:a}=e,{url:A}=e,{width:c}=e;return t.$$set=t=>{"imgSrc"in t&&s(0,r=t.imgSrc),"imgSrcSmall"in t&&s(1,l=t.imgSrcSmall),"imgAlt"in t&&s(2,a=t.imgAlt),"url"in t&&s(3,A=t.url),"width"in t&&s(4,c=t.width)},[r,l,a,A,c]}class tt extends t{constructor(t){super(),e(this,t,_,y,s,{imgSrc:0,imgSrcSmall:1,imgAlt:2,url:3,width:4})}}function et(t){let e,s,r,i,o,h,f,$,d,S,v,j,x;return j=new b({props:{text:"Project Details"}}),{c(){e=l("div"),s=l("h2"),r=N(t[0]),i=T(),o=l("p"),h=l("span"),f=N(t[3]),$=T(),S=T(),v=l("a"),p(j.$$.fragment),this.h()},l(l){e=a(l,"DIV",{class:!0});var n=A(e);s=a(n,"H2",{class:!0});var m=A(s);r=G(m,t[0]),m.forEach(c),i=Z(n),o=a(n,"P",{class:!0});var g=A(o);h=a(g,"SPAN",{class:!0});var p=A(h);f=G(p,t[3]),p.forEach(c),$=Z(g),g.forEach(c),S=Z(n),v=a(n,"A",{rel:!0,href:!0,class:!0});var B=A(v);u(j.$$.fragment,B),B.forEach(c),n.forEach(c),this.h()},h(){Q(s,"class","svelte-1boaiwt"),Q(h,"class","year svelte-1boaiwt"),d=new W(null),Q(o,"class","svelte-1boaiwt"),Q(v,"rel","prefetch"),Q(v,"href",t[1]),Q(v,"class","svelte-1boaiwt"),Q(e,"class","svelte-1boaiwt")},m(l,a){n(l,e,a),M(e,s),M(s,r),M(e,i),M(e,o),M(o,h),M(h,f),M(o,$),d.m(t[2],o),M(e,S),M(e,v),B(j,v,null),x=!0},p(t,[e]){(!x||1&e)&&q(r,t[0]),(!x||8&e)&&q(f,t[3]),(!x||4&e)&&d.p(t[2]),(!x||2&e)&&Q(v,"href",t[1])},i(t){x||(m(j.$$.fragment,t),x=!0)},o(t){g(j.$$.fragment,t),x=!1},d(t){t&&c(e),E(j)}}}function st(t,e,s){let{projectName:r}=e,{url:l}=e,{projectText:a}=e,{projectYear:A}=e;return t.$$set=t=>{"projectName"in t&&s(0,r=t.projectName),"url"in t&&s(1,l=t.url),"projectText"in t&&s(2,a=t.projectText),"projectYear"in t&&s(3,A=t.projectYear)},[r,l,a,A]}class rt extends t{constructor(t){super(),e(this,t,st,et,s,{projectName:0,url:1,projectText:2,projectYear:3})}}function lt(t,e,s){const r=t.slice();return r[2]=e[s],r[4]=s,r}function at(t){let e,s;return{c(){e=l("h2"),s=N(t[1]),this.h()},l(r){e=a(r,"H2",{class:!0});var l=A(e);s=G(l,t[1]),l.forEach(c),this.h()},h(){Q(e,"class","svelte-lfx3qe")},m(t,r){n(t,e,r),M(e,s)},p(t,e){2&e&&q(s,t[1])},d(t){t&&c(e)}}}function At(t){let e,s,r,i,o,h,f,$,d;return r=new tt({props:{imgSrc:t[2].imgSrc,imgSrcSmall:t[2].imgSrcSmall,url:t[2].url,imgAlt:t[2].alt}}),h=new rt({props:{projectName:t[2].projectName,url:t[2].url,projectText:t[2].projectText,projectYear:t[2].projectYear}}),{c(){e=l("div"),s=l("div"),p(r.$$.fragment),i=T(),o=l("div"),p(h.$$.fragment),f=T(),this.h()},l(t){e=a(t,"DIV",{class:!0,index:!0});var l=A(e);s=a(l,"DIV",{class:!0});var n=A(s);u(r.$$.fragment,n),n.forEach(c),i=Z(l),o=a(l,"DIV",{class:!0});var m=A(o);u(h.$$.fragment,m),m.forEach(c),f=Z(l),l.forEach(c),this.h()},h(){Q(s,"class","image-container svelte-lfx3qe"),Q(o,"class","text-container svelte-lfx3qe"),Q(e,"class","card-container svelte-lfx3qe"),Q(e,"index",$=t[4])},m(t,l){n(t,e,l),M(e,s),B(r,s,null),M(e,i),M(e,o),B(h,o,null),M(e,f),d=!0},p(t,e){const s={};1&e&&(s.imgSrc=t[2].imgSrc),1&e&&(s.imgSrcSmall=t[2].imgSrcSmall),1&e&&(s.url=t[2].url),1&e&&(s.imgAlt=t[2].alt),r.$set(s);const l={};1&e&&(l.projectName=t[2].projectName),1&e&&(l.url=t[2].url),1&e&&(l.projectText=t[2].projectText),1&e&&(l.projectYear=t[2].projectYear),h.$set(l)},i(t){d||(m(r.$$.fragment,t),m(h.$$.fragment,t),d=!0)},o(t){g(r.$$.fragment,t),g(h.$$.fragment,t),d=!1},d(t){t&&c(e),E(r),E(h)}}}function ct(t){let e,s,r,i,o=t[1]&&at(t),h=t[0],f=[];for(let e=0;e<h.length;e+=1)f[e]=At(lt(t,h,e));const p=t=>g(f[t],1,1,(()=>{f[t]=null}));return{c(){e=l("section"),o&&o.c(),s=T(),r=l("div");for(let t=0;t<f.length;t+=1)f[t].c();this.h()},l(t){e=a(t,"SECTION",{class:!0});var l=A(e);o&&o.l(l),s=Z(l),r=a(l,"DIV",{class:!0});var i=A(r);for(let t=0;t<f.length;t+=1)f[t].l(i);i.forEach(c),l.forEach(c),this.h()},h(){Q(r,"class","projects-container svelte-lfx3qe"),Q(e,"class","svelte-lfx3qe")},m(t,l){n(t,e,l),o&&o.m(e,null),M(e,s),M(e,r);for(let t=0;t<f.length;t+=1)f[t].m(r,null);i=!0},p(t,[l]){if(t[1]?o?o.p(t,l):(o=at(t),o.c(),o.m(e,s)):o&&(o.d(1),o=null),1&l){let e;for(h=t[0],e=0;e<h.length;e+=1){const s=lt(t,h,e);f[e]?(f[e].p(s,l),m(f[e],1)):(f[e]=At(s),f[e].c(),m(f[e],1),f[e].m(r,null))}for(d(),e=h.length;e<f.length;e+=1)p(e);S()}},i(t){if(!i){for(let t=0;t<h.length;t+=1)m(f[t]);i=!0}},o(t){f=f.filter(Boolean);for(let t=0;t<f.length;t+=1)g(f[t]);i=!1},d(t){t&&c(e),o&&o.d(),K(f,t)}}}function it(t,e,s){let{portfolioCards:r}=e,{title:l}=e;return t.$$set=t=>{"portfolioCards"in t&&s(0,r=t.portfolioCards),"title"in t&&s(1,l=t.title)},[r,l]}class nt extends t{constructor(t){super(),e(this,t,it,ct,s,{portfolioCards:0,title:1})}}var ot="/client/eee5d97c8602efe6.jpg",mt="/client/663e561b09a055ab.jpg",gt="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMqADAAQAAAABAAAAGAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgAGAAyAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQABP/aAAwDAQACEQMRAD8A/E7Tvhlr97g/Z2x9K9n8F/AzVdRnRZYCM+1fsB4f+CHhjiFIoz9AK9n8OfBbQdLInWFR+Ar0lRSZyvEXR+fPwx/ZtghmhmvYMAYPIr718J+AtL0m1jtLZVGBiup1mxs9Li8q0AUjjiuO8P3l8dWVXYlS1dDpcu5hGSmegS/D9ZV3hc1zOreFksYTlcV9JaYFaxQsOcVwfiu1WeNlUUqU2mOrSjY+Z2sIgxGO9N+wxeldo+hEux9zTf7BNdntWcHsYn//0Mv4W/FDWdX2TsCwr6Iv/i1LplpifIIFfFvwM/49I/oK9f8AG/8AqH+ley1ZXR5TlrYbqHxgvdU1YW0GWBb1r6J+H2najqkkNzIhGSD0r4E0X/kYk/3xX6Z/Cn/j2t/wqm29WdEKajsfRWl6PKLJUYHgVyviXSWijZiK9W0//j3WuM8Xf8e7VnHcqpHQ8Ca3O49OtJ9nPtV1/vt9TTa6Tg5Uf//Z";export{ot as D,mt as H,nt as P,gt as a};