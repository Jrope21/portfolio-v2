import"./index.1876c042.js";function t(t){const n=t-1;return n*n*n+1}function n(t,{delay:n=0,duration:a=400}){const o=+getComputedStyle(t).opacity;return{delay:n,duration:a,css:t=>`opacity: ${t*o}`}}function a(n,{delay:a=0,duration:o=400,easing:e=t,x:r=0,y:i=0,opacity:s=0}){const c=getComputedStyle(n),u=+c.opacity,y="none"===c.transform?"":c.transform,d=u*(1-s);return{delay:a,duration:o,easing:e,css:(t,n)=>`\n\t\t\ttransform: ${y} translate(${(1-t)*r}px, ${(1-t)*i}px);\n\t\t\topacity: ${u-d*n}`}}export{n as a,a as f};