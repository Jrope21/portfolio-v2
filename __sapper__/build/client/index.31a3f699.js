import{S as e,i as r,s as t,e as a,a as s,c as o,b as n,d as c,f as l,g as i,h as p,j as h,n as f,t as d,y as g,r as m,w as u,z as v,L as j,H as $,B as w,C as x,M as E}from"./index.628c8320.js";import{T as b}from"./TextAnimation.18996c4b.js";import{I as y}from"./Image.87905635.js";function T(e){var r,t,d,g;return{c(){r=a("img"),t=s(),d=a("div"),g=a("div"),this.h()},l(e){r=o(e,"IMG",{width:!0,height:!0,src:!0,alt:!0,class:!0},!1),n(r).forEach(c),t=l(e,"\n"),d=o(e,"DIV",{class:!0},!1);var a=n(d);g=o(a,"DIV",{class:!0},!1),n(g).forEach(c),a.forEach(c),this.h()},h(){i(r,"width","1px"),i(r,"height","1px"),i(r,"src","images/hero-doe.png"),i(r,"alt","A picture of Joshua Roper leaning against a wall."),i(r,"class","svelte-rziffi"),i(g,"class","hero-image svelte-rziffi"),i(d,"class","box svelte-rziffi")},m(e,a){p(e,r,a),p(e,t,a),p(e,d,a),h(d,g)},p:f,i:f,o:f,d(e){e&&(c(r),c(t),c(d))}}}function I(e){return{}}class N extends e{constructor(e){super(),r(this,e,I,T,t,[])}}function S(e){var r,t,g,m,u,v,j,$;return{c(){r=a("h1"),t=d("Front End Developer"),g=s(),m=a("h2"),u=d("React, Svelte, ES6"),v=s(),j=a("h3"),$=d("Joshua Roper"),this.h()},l(e){r=o(e,"H1",{class:!0},!1);var a=n(r);t=l(a,"Front End Developer"),a.forEach(c),g=l(e,"\n"),m=o(e,"H2",{class:!0},!1);var s=n(m);u=l(s,"React, Svelte, ES6"),s.forEach(c),v=l(e,"\n"),j=o(e,"H3",{class:!0},!1);var i=n(j);$=l(i,"Joshua Roper"),i.forEach(c),this.h()},h(){i(r,"class","svelte-q1dgpq"),i(m,"class","svelte-q1dgpq"),i(j,"class","svelte-q1dgpq")},m(e,a){p(e,r,a),h(r,t),p(e,g,a),p(e,m,a),h(m,u),p(e,v,a),p(e,j,a),h(j,$)},p:f,i:f,o:f,d(e){e&&(c(r),c(g),c(m),c(v),c(j))}}}class Y extends e{constructor(e){super(),r(this,e,null,S,t,[])}}function k(e){var r,t,d,j,$,w=new N({}),x=new Y({});return{c(){r=a("div"),t=a("div"),w.$$.fragment.c(),d=s(),j=a("div"),x.$$.fragment.c(),this.h()},l(e){r=o(e,"DIV",{class:!0},!1);var a=n(r);t=o(a,"DIV",{class:!0},!1);var s=n(t);w.$$.fragment.l(s),s.forEach(c),d=l(a,"\n    "),j=o(a,"DIV",{class:!0},!1);var i=n(j);x.$$.fragment.l(i),i.forEach(c),a.forEach(c),this.h()},h(){i(t,"class","hero svelte-gyswp7"),i(j,"class","text svelte-gyswp7"),i(r,"class","hero-container svelte-gyswp7")},m(e,a){p(e,r,a),h(r,t),g(w,t,null),h(r,d),h(r,j),g(x,j,null),$=!0},p:f,i(e){$||(m(w.$$.fragment,e),m(x.$$.fragment,e),$=!0)},o(e){u(w.$$.fragment,e),u(x.$$.fragment,e),$=!1},d(e){e&&c(r),v(w),v(x)}}}class C extends e{constructor(e){super(),r(this,e,null,k,t,[])}}function D(e){var r,t,f,w,x,E,y,T,I,N,S,Y,k=new b({props:{text:"View Website"}});return{c(){r=a("div"),t=a("h2"),f=d(e.projectName),w=s(),x=a("p"),E=a("span"),y=d(e.projectYear),T=s(),N=s(),S=a("a"),k.$$.fragment.c(),this.h()},l(a){r=o(a,"DIV",{},!1);var s=n(r);t=o(s,"H2",{class:!0},!1);var i=n(t);f=l(i,e.projectName),i.forEach(c),w=l(s,"\n    "),x=o(s,"P",{class:!0},!1);var p=n(x);E=o(p,"SPAN",{class:!0},!1);var h=n(E);y=l(h,e.projectYear),h.forEach(c),T=l(p,"\n        "),p.forEach(c),N=l(s,"\n    "),S=o(s,"A",{target:!0,href:!0,class:!0},!1);var d=n(S);k.$$.fragment.l(d),d.forEach(c),s.forEach(c),this.h()},h(){i(t,"class","svelte-1jek2ir"),i(E,"class","year svelte-1jek2ir"),I=new j(e.projectText,null),i(x,"class","svelte-1jek2ir"),i(S,"target","blank"),i(S,"href",e.url),i(S,"class","svelte-1jek2ir")},m(e,a){p(e,r,a),h(r,t),h(t,f),h(r,w),h(r,x),h(x,E),h(E,y),h(x,T),I.m(x),h(r,N),h(r,S),g(k,S,null),Y=!0},p(e,r){Y&&!e.projectName||$(f,r.projectName),Y&&!e.projectYear||$(y,r.projectYear),Y&&!e.projectText||I.p(r.projectText),Y&&!e.url||i(S,"href",r.url)},i(e){Y||(m(k.$$.fragment,e),Y=!0)},o(e){u(k.$$.fragment,e),Y=!1},d(e){e&&c(r),v(k)}}}function q(e,r,t){let{projectName:a,url:s,projectText:o,projectYear:n}=r;return e.$set=(e=>{"projectName"in e&&t("projectName",a=e.projectName),"url"in e&&t("url",s=e.url),"projectText"in e&&t("projectText",o=e.projectText),"projectYear"in e&&t("projectYear",n=e.projectYear)}),{projectName:a,url:s,projectText:o,projectYear:n}}class V extends e{constructor(e){super(),r(this,e,q,D,t,["projectName","url","projectText","projectYear"])}}function R(e,r,t){const a=Object.create(e);return a.card=r[t],a.index=t,a}function H(e){var r,t,f,d,j,$,w=new y({props:{imgSrc:e.card.imgSrc,url:e.card.url,alt:e.card.alt}}),x=new V({props:{projectName:e.card.projectName,url:e.card.url,projectText:e.card.projectText,projectYear:e.card.projectYear}});return{c(){r=a("div"),t=a("div"),w.$$.fragment.c(),f=s(),d=a("div"),x.$$.fragment.c(),j=s(),this.h()},l(e){r=o(e,"DIV",{class:!0,index:!0},!1);var a=n(r);t=o(a,"DIV",{class:!0},!1);var s=n(t);w.$$.fragment.l(s),s.forEach(c),f=l(a,"\n                "),d=o(a,"DIV",{class:!0},!1);var i=n(d);x.$$.fragment.l(i),i.forEach(c),j=l(a,"\n            "),a.forEach(c),this.h()},h(){i(t,"class","image-container svelte-1w3h4qb"),i(d,"class","text-container svelte-1w3h4qb"),i(r,"class","card-container svelte-1w3h4qb"),i(r,"index",e.index)},m(e,a){p(e,r,a),h(r,t),g(w,t,null),h(r,f),h(r,d),g(x,d,null),h(r,j),$=!0},p(e,r){var t={};e.portfolioCards&&(t.imgSrc=r.card.imgSrc),e.portfolioCards&&(t.url=r.card.url),e.portfolioCards&&(t.alt=r.card.alt),w.$set(t);var a={};e.portfolioCards&&(a.projectName=r.card.projectName),e.portfolioCards&&(a.url=r.card.url),e.portfolioCards&&(a.projectText=r.card.projectText),e.portfolioCards&&(a.projectYear=r.card.projectYear),x.$set(a)},i(e){$||(m(w.$$.fragment,e),m(x.$$.fragment,e),$=!0)},o(e){u(w.$$.fragment,e),u(x.$$.fragment,e),$=!1},d(e){e&&c(r),v(w),v(x)}}}function A(e){for(var r,t,f,g,v,j,$=e.portfolioCards,b=[],y=0;y<$.length;y+=1)b[y]=H(R(e,$,y));const T=e=>u(b[e],1,1,()=>{b[e]=null});return{c(){r=a("section"),t=a("h2"),f=d("Selected Works"),g=s(),v=a("div");for(var e=0;e<b.length;e+=1)b[e].c();this.h()},l(e){r=o(e,"SECTION",{class:!0},!1);var a=n(r);t=o(a,"H2",{class:!0},!1);var s=n(t);f=l(s,"Selected Works"),s.forEach(c),g=l(a,"\n    "),v=o(a,"DIV",{class:!0},!1);for(var i=n(v),p=0;p<b.length;p+=1)b[p].l(i);i.forEach(c),a.forEach(c),this.h()},h(){i(t,"class","svelte-1w3h4qb"),i(v,"class","projects-container svelte-1w3h4qb"),i(r,"class","svelte-1w3h4qb")},m(e,a){p(e,r,a),h(r,t),h(t,f),h(r,g),h(r,v);for(var s=0;s<b.length;s+=1)b[s].m(v,null);j=!0},p(e,r){if(e.portfolioCards){$=r.portfolioCards;for(var t=0;t<$.length;t+=1){const a=R(r,$,t);b[t]?(b[t].p(e,a),m(b[t],1)):(b[t]=H(a),b[t].c(),m(b[t],1),b[t].m(v,null))}for(w(),t=$.length;t<b.length;t+=1)T(t);x()}},i(e){if(!j){for(var r=0;r<$.length;r+=1)m(b[r]);j=!0}},o(e){b=b.filter(Boolean);for(let e=0;e<b.length;e+=1)u(b[e]);j=!1},d(e){e&&c(r),E(b,e)}}}function F(e){return{portfolioCards:[{url:"/projects/halcyon",imgSrc:"images/halcyon-5.jpg",alt:"Thumbnail for the Halcyon mall website rebuild",projectName:"Halcyon",projectYear:"2019",projectText:"I was one of the Front End Developers on the project primarily tasked with creating the movies page and events directory. Across the project I worked with <strong>multiple API’s</strong>, <strong>React Static</strong>, and developed <strong>clean code</strong> for other advanced React components."},{url:"/projects/university-park",imgSrc:"images/uptexas-thumb.jpg",alt:"Thumbnail for the City of University Park complete Front End website redesign",projectName:"University Park",projectYear:"2019",projectText:"I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>."},{url:"/projects/creative-revolt",imgSrc:"images/Jorden-Background-Gray.jpg",alt:"Thumbnail for the Creative Revolt redesigned website",projectName:"Creative Revolt",projectYear:"2018",projectText:"This was a freelance project to <strong>rework the website layout</strong> and tailor the feel of the website to her personal writing style. I <strong>revamped the color palette</strong> to better match her personality, adjusted her website for <strong>SEO</strong>, and created the landing page as well as multiple pages across the platform."}]}}class J extends e{constructor(e){super(),r(this,e,F,A,t,[])}}function P(e){var r,t,d,j,$=new C({}),w=new J({});return{c(){r=s(),t=a("div"),$.$$.fragment.c(),d=s(),w.$$.fragment.c(),this.h()},l(e){r=l(e,"\n\n"),t=o(e,"DIV",{class:!0},!1);var a=n(t);$.$$.fragment.l(a),d=l(a,"\n    "),w.$$.fragment.l(a),a.forEach(c),this.h()},h(){document.title="Home | Front End Developer - Joshua Roper",i(t,"class","container svelte-rig25y")},m(e,a){p(e,r,a),p(e,t,a),g($,t,null),h(t,d),g(w,t,null),j=!0},p:f,i(e){j||(m($.$$.fragment,e),m(w.$$.fragment,e),j=!0)},o(e){u($.$$.fragment,e),u(w.$$.fragment,e),j=!1},d(e){e&&(c(r),c(t)),v($),v(w)}}}export default class extends e{constructor(e){super(),r(this,e,null,P,t,[])}}