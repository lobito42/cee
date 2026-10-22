(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Lo="186",nh=0,fl=1,ih=2,ms=1,rh=2,ur=3,jn=0,qt=1,bn=2,Un=0,dr=1,dl=2,pl=3,ml=4,sh=5,Fi=100,ah=101,oh=102,lh=103,ch=104,uh=200,hh=201,fh=202,dh=203,Wc=204,Xc=205,ph=206,mh=207,gh=208,vh=209,_h=210,xh=211,bh=212,Sh=213,Mh=214,La=0,Da=1,za=2,xr=3,Ia=4,Ua=5,Ms=6,Na=7,Do=0,yh=1,wh=2,cn=0,qc=1,Yc=2,$c=3,Zc=4,Kc=5,Jc=6,Qc=7,jc=300,gi=301,Ki=302,Hs=303,Ws=304,Us=306,ka=1e3,In=1001,Fa=1002,Lt=1003,Eh=1004,zr=1005,kt=1006,Xs=1007,ui=1008,Zt=1009,eu=1010,tu=1011,br=1012,zo=1013,En=1014,Mn=1015,Tn=1016,Io=1017,Uo=1018,Sr=1020,nu=35902,iu=35899,ru=1021,su=1022,ln=1023,Fn=1026,hi=1027,au=1028,No=1029,vi=1030,ko=1031,Fo=1033,gs=33776,vs=33777,_s=33778,xs=33779,Oa=35840,Ba=35841,Va=35842,Ga=35843,Ha=36196,Wa=37492,Xa=37496,qa=37488,Ya=37489,ys=37490,$a=37491,Za=37808,Ka=37809,Ja=37810,Qa=37811,ja=37812,eo=37813,to=37814,no=37815,io=37816,ro=37817,so=37818,ao=37819,oo=37820,lo=37821,co=36492,uo=36494,ho=36495,fo=36283,po=36284,ws=36285,mo=36286,Th=3200,go=0,Ah=1,Zn="",Qt="srgb",Es="srgb-linear",Ts="linear",ut="srgb",qs=7680,Rh=519,Ch=512,Ph=513,Lh=514,Oo=515,Dh=516,zh=517,Bo=518,Ih=519,ou=35044,gl="300 es",yn=2e3,Mr=2001;function Uh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function As(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Nh(){const i=As("canvas");return i.style.display="block",i}const vl={};function Rs(...i){const e="THREE."+i.shift();console.log(e,...i)}function lu(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function ke(...i){i=lu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function je(...i){i=lu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Xi(...i){const e=i.join(" ");e in vl||(vl[e]=!0,ke(...i))}function kh(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Fh={[La]:Da,[za]:Ms,[Ia]:Na,[xr]:Ua,[Da]:La,[Ms]:za,[Na]:Ia,[Ua]:xr};class bi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Ut=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let _l=1234567;const qi=Math.PI/180,yr=180/Math.PI;function wn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ut[i&255]+Ut[i>>8&255]+Ut[i>>16&255]+Ut[i>>24&255]+"-"+Ut[e&255]+Ut[e>>8&255]+"-"+Ut[e>>16&15|64]+Ut[e>>24&255]+"-"+Ut[t&63|128]+Ut[t>>8&255]+"-"+Ut[t>>16&255]+Ut[t>>24&255]+Ut[n&255]+Ut[n>>8&255]+Ut[n>>16&255]+Ut[n>>24&255]).toLowerCase()}function We(i,e,t){return Math.max(e,Math.min(t,i))}function Vo(i,e){return(i%e+e)%e}function Oh(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Bh(i,e,t){return i!==e?(t-i)/(e-i):0}function pr(i,e,t){return(1-t)*i+t*e}function Vh(i,e,t,n){return pr(i,e,1-Math.exp(-t*n))}function Gh(i,e=1){return e-Math.abs(Vo(i,e*2)-e)}function Hh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Wh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Xh(i,e){return i+Math.floor(Math.random()*(e-i+1))}function qh(i,e){return i+Math.random()*(e-i)}function Yh(i){return i*(.5-Math.random())}function $h(i){i!==void 0&&(_l=i);let e=_l+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Zh(i){return i*qi}function Kh(i){return i*yr}function Jh(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Qh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function jh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ef(i,e,t,n,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),f=s((e-n)/2),h=a((e-n)/2),d=s((n-e)/2),m=a((n-e)/2);switch(r){case"XYX":i.set(o*u,l*f,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*f,o*c);break;case"ZXZ":i.set(l*f,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*m,l*d,o*c);break;case"YXY":i.set(l*d,o*u,l*m,o*c);break;case"ZYZ":i.set(l*m,l*d,o*u,o*c);break;default:ke("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function on(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ht(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const tf={DEG2RAD:qi,RAD2DEG:yr,generateUUID:wn,clamp:We,euclideanModulo:Vo,mapLinear:Oh,inverseLerp:Bh,lerp:pr,damp:Vh,pingpong:Gh,smoothstep:Hh,smootherstep:Wh,randInt:Xh,randFloat:qh,randFloatSpread:Yh,seededRandom:$h,degToRad:Zh,radToDeg:Kh,isPowerOfTwo:Jh,ceilPowerOfTwo:Qh,floorPowerOfTwo:jh,setQuaternionFromProperEuler:ef,normalize:ht,denormalize:on};class fe{static{fe.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ji{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],f=n[r+3],h=s[a+0],d=s[a+1],m=s[a+2],x=s[a+3];if(f!==x||l!==h||c!==d||u!==m){let g=l*h+c*d+u*m+f*x;g<0&&(h=-h,d=-d,m=-m,x=-x,g=-g);let p=1-o;if(g<.9995){const T=Math.acos(g),R=Math.sin(T);p=Math.sin(p*T)/R,o=Math.sin(o*T)/R,l=l*p+h*o,c=c*p+d*o,u=u*p+m*o,f=f*p+x*o}else{l=l*p+h*o,c=c*p+d*o,u=u*p+m*o,f=f*p+x*o;const T=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=T,c*=T,u*=T,f*=T}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],f=s[a],h=s[a+1],d=s[a+2],m=s[a+3];return e[t]=o*m+u*f+l*d-c*h,e[t+1]=l*m+u*h+c*f-o*d,e[t+2]=c*m+u*d+o*h-l*f,e[t+3]=u*m-o*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),f=o(s/2),h=l(n/2),d=l(r/2),m=l(s/2);switch(a){case"XYZ":this._x=h*u*f+c*d*m,this._y=c*d*f-h*u*m,this._z=c*u*m+h*d*f,this._w=c*u*f-h*d*m;break;case"YXZ":this._x=h*u*f+c*d*m,this._y=c*d*f-h*u*m,this._z=c*u*m-h*d*f,this._w=c*u*f+h*d*m;break;case"ZXY":this._x=h*u*f-c*d*m,this._y=c*d*f+h*u*m,this._z=c*u*m+h*d*f,this._w=c*u*f-h*d*m;break;case"ZYX":this._x=h*u*f-c*d*m,this._y=c*d*f+h*u*m,this._z=c*u*m-h*d*f,this._w=c*u*f+h*d*m;break;case"YZX":this._x=h*u*f+c*d*m,this._y=c*d*f+h*u*m,this._z=c*u*m-h*d*f,this._w=c*u*f-h*d*m;break;case"XZY":this._x=h*u*f-c*d*m,this._y=c*d*f-h*u*m,this._z=c*u*m+h*d*f,this._w=c*u*f+h*d*m;break;default:ke("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=n+o+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(a-r)*d}else if(n>o&&n>f){const d=2*Math.sqrt(1+n-o-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+c)/d}else if(o>f){const d=2*Math.sqrt(1+o-n-f);this._w=(s-c)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-n-o);this._w=(a-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{static{C.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(xl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(xl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),f=2*(s*n-a*t);return this.x=t+l*c+a*f-o*u,this.y=n+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ys.copy(this).projectOnVector(e),this.sub(Ys)}reflect(e){return this.sub(Ys.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ys=new C,xl=new ji;class He{static{He.prototype.isMatrix3=!0}constructor(e,t,n,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],f=n[7],h=n[2],d=n[5],m=n[8],x=r[0],g=r[3],p=r[6],T=r[1],R=r[4],S=r[7],y=r[2],M=r[5],A=r[8];return s[0]=a*x+o*T+l*y,s[3]=a*g+o*R+l*M,s[6]=a*p+o*S+l*A,s[1]=c*x+u*T+f*y,s[4]=c*g+u*R+f*M,s[7]=c*p+u*S+f*A,s[2]=h*x+d*T+m*y,s[5]=h*g+d*R+m*M,s[8]=h*p+d*S+m*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,h=o*l-u*s,d=c*s-a*l,m=t*f+n*h+r*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return e[0]=f*x,e[1]=(r*c-u*n)*x,e[2]=(o*n-r*a)*x,e[3]=h*x,e[4]=(u*t-r*l)*x,e[5]=(r*s-o*t)*x,e[6]=d*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Xi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply($s.makeScale(e,t)),this}rotate(e){return Xi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply($s.makeRotation(-e)),this}translate(e,t){return Xi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply($s.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const $s=new He,bl=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Sl=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function nf(){const i={enabled:!0,workingColorSpace:Es,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ut&&(r.r=Nn(r.r),r.g=Nn(r.g),r.b=Nn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ut&&(r.r=Yi(r.r),r.g=Yi(r.g),r.b=Yi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Zn?Ts:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Xi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Xi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Es]:{primaries:e,whitePoint:n,transfer:Ts,toXYZ:bl,fromXYZ:Sl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Qt},outputColorSpaceConfig:{drawingBufferColorSpace:Qt}},[Qt]:{primaries:e,whitePoint:n,transfer:ut,toXYZ:bl,fromXYZ:Sl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Qt}}}),i}const Qe=nf();function Nn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Yi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let yi;class rf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{yi===void 0&&(yi=As("canvas")),yi.width=e.width,yi.height=e.height;const r=yi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=yi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=As("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Nn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Nn(t[n]/255)*255):t[n]=Nn(t[n]);return{data:t,width:e.width,height:e.height}}else return ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let sf=0;class Go{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=wn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Zs(r[a].image)):s.push(Zs(r[a]))}else s=Zs(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Zs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?rf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(ke("Texture: Unable to serialize Texture."),{})}let af=0;const Ks=new C;class Ht extends bi{constructor(e=Ht.DEFAULT_IMAGE,t=Ht.DEFAULT_MAPPING,n=In,r=In,s=kt,a=ui,o=ln,l=Zt,c=Ht.DEFAULT_ANISOTROPY,u=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:af++}),this.uuid=wn(),this.name="",this.source=new Go(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new fe(0,0),this.repeat=new fe(1,1),this.center=new fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ks).x}get height(){return this.source.getSize(Ks).y}get depth(){return this.source.getSize(Ks).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){ke(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==jc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ka:e.x=e.x-Math.floor(e.x);break;case In:e.x=e.x<0?0:1;break;case Fa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ka:e.y=e.y-Math.floor(e.y);break;case In:e.y=e.y<0?0:1;break;case Fa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ht.DEFAULT_IMAGE=null;Ht.DEFAULT_MAPPING=jc;Ht.DEFAULT_ANISOTROPY=1;class pt{static{pt.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const R=(c+1)/2,S=(d+1)/2,y=(p+1)/2,M=(u+h)/4,A=(f+x)/4,_=(m+g)/4;return R>S&&R>y?R<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(R),r=M/n,s=A/n):S>y?S<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),n=M/r,s=_/r):y<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(y),n=A/s,r=_/s),this.set(n,r,s,t),this}let T=Math.sqrt((g-m)*(g-m)+(f-x)*(f-x)+(h-u)*(h-u));return Math.abs(T)<.001&&(T=1),this.x=(g-m)/T,this.y=(f-x)/T,this.z=(h-u)/T,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this.w=We(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this.w=We(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class of extends bi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Ht(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Go(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class un extends of{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class cu extends Ht{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class lf extends Ht{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class lt{static{lt.prototype.isMatrix4=!0}constructor(e,t,n,r,s,a,o,l,c,u,f,h,d,m,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,f,h,d,m,x,g)}set(e,t,n,r,s,a,o,l,c,u,f,h,d,m,x,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new lt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/wi.setFromMatrixColumn(e,0).length(),s=1/wi.setFromMatrixColumn(e,1).length(),a=1/wi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=a*u,d=a*f,m=o*u,x=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+m*c,t[5]=h-x*c,t[9]=-o*l,t[2]=x-h*c,t[6]=m+d*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,d=l*f,m=c*u,x=c*f;t[0]=h+x*o,t[4]=m*o-d,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=d*o-m,t[6]=x+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,d=l*f,m=c*u,x=c*f;t[0]=h-x*o,t[4]=-a*f,t[8]=m+d*o,t[1]=d+m*o,t[5]=a*u,t[9]=x-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,d=a*f,m=o*u,x=o*f;t[0]=l*u,t[4]=m*c-d,t[8]=h*c+x,t[1]=l*f,t[5]=x*c+h,t[9]=d*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,d=a*c,m=o*l,x=o*c;t[0]=l*u,t[4]=x-h*f,t[8]=m*f+d,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=d*f+m,t[10]=h-x*f}else if(e.order==="XZY"){const h=a*l,d=a*c,m=o*l,x=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+x,t[5]=a*u,t[9]=d*f-m,t[2]=m*f-d,t[6]=o*u,t[10]=x*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cf,e,uf)}lookAt(e,t,n){const r=this.elements;return Yt.subVectors(e,t),Yt.lengthSq()===0&&(Yt.z=1),Yt.normalize(),Hn.crossVectors(n,Yt),Hn.lengthSq()===0&&(Math.abs(n.z)===1?Yt.x+=1e-4:Yt.z+=1e-4,Yt.normalize(),Hn.crossVectors(n,Yt)),Hn.normalize(),Ir.crossVectors(Yt,Hn),r[0]=Hn.x,r[4]=Ir.x,r[8]=Yt.x,r[1]=Hn.y,r[5]=Ir.y,r[9]=Yt.y,r[2]=Hn.z,r[6]=Ir.z,r[10]=Yt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],f=n[5],h=n[9],d=n[13],m=n[2],x=n[6],g=n[10],p=n[14],T=n[3],R=n[7],S=n[11],y=n[15],M=r[0],A=r[4],_=r[8],w=r[12],P=r[1],z=r[5],k=r[9],V=r[13],U=r[2],F=r[6],K=r[10],H=r[14],re=r[3],q=r[7],j=r[11],ne=r[15];return s[0]=a*M+o*P+l*U+c*re,s[4]=a*A+o*z+l*F+c*q,s[8]=a*_+o*k+l*K+c*j,s[12]=a*w+o*V+l*H+c*ne,s[1]=u*M+f*P+h*U+d*re,s[5]=u*A+f*z+h*F+d*q,s[9]=u*_+f*k+h*K+d*j,s[13]=u*w+f*V+h*H+d*ne,s[2]=m*M+x*P+g*U+p*re,s[6]=m*A+x*z+g*F+p*q,s[10]=m*_+x*k+g*K+p*j,s[14]=m*w+x*V+g*H+p*ne,s[3]=T*M+R*P+S*U+y*re,s[7]=T*A+R*z+S*F+y*q,s[11]=T*_+R*k+S*K+y*j,s[15]=T*w+R*V+S*H+y*ne,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],m=e[3],x=e[7],g=e[11],p=e[15],T=l*d-c*h,R=o*d-c*f,S=o*h-l*f,y=a*d-c*u,M=a*h-l*u,A=a*f-o*u;return t*(x*T-g*R+p*S)-n*(m*T-g*y+p*M)+r*(m*R-x*y+p*A)-s*(m*S-x*M+g*A)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-n*(s*u-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],m=e[12],x=e[13],g=e[14],p=e[15],T=t*o-n*a,R=t*l-r*a,S=t*c-s*a,y=n*l-r*o,M=n*c-s*o,A=r*c-s*l,_=u*x-f*m,w=u*g-h*m,P=u*p-d*m,z=f*g-h*x,k=f*p-d*x,V=h*p-d*g,U=T*V-R*k+S*z+y*P-M*w+A*_;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/U;return e[0]=(o*V-l*k+c*z)*F,e[1]=(r*k-n*V-s*z)*F,e[2]=(x*A-g*M+p*y)*F,e[3]=(h*M-f*A-d*y)*F,e[4]=(l*P-a*V-c*w)*F,e[5]=(t*V-r*P+s*w)*F,e[6]=(g*S-m*A-p*R)*F,e[7]=(u*A-h*S+d*R)*F,e[8]=(a*k-o*P+c*_)*F,e[9]=(n*P-t*k-s*_)*F,e[10]=(m*M-x*S+p*T)*F,e[11]=(f*S-u*M-d*T)*F,e[12]=(o*w-a*z-l*_)*F,e[13]=(t*z-n*w+r*_)*F,e[14]=(x*R-m*y-g*T)*F,e[15]=(u*y-f*R+h*T)*F,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,h=s*c,d=s*u,m=s*f,x=a*u,g=a*f,p=o*f,T=l*c,R=l*u,S=l*f,y=n.x,M=n.y,A=n.z;return r[0]=(1-(x+p))*y,r[1]=(d+S)*y,r[2]=(m-R)*y,r[3]=0,r[4]=(d-S)*M,r[5]=(1-(h+p))*M,r[6]=(g+T)*M,r[7]=0,r[8]=(m+R)*A,r[9]=(g-T)*A,r[10]=(1-(h+x))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=wi.set(r[0],r[1],r[2]).length();const o=wi.set(r[4],r[5],r[6]).length(),l=wi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),rn.copy(this);const c=1/a,u=1/o,f=1/l;return rn.elements[0]*=c,rn.elements[1]*=c,rn.elements[2]*=c,rn.elements[4]*=u,rn.elements[5]*=u,rn.elements[6]*=u,rn.elements[8]*=f,rn.elements[9]*=f,rn.elements[10]*=f,t.setFromRotationMatrix(rn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=yn,l=!1){const c=this.elements,u=2*s/(t-e),f=2*s/(n-r),h=(t+e)/(t-e),d=(n+r)/(n-r);let m,x;if(l)m=s/(a-s),x=a*s/(a-s);else if(o===yn)m=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===Mr)m=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=yn,l=!1){const c=this.elements,u=2/(t-e),f=2/(n-r),h=-(t+e)/(t-e),d=-(n+r)/(n-r);let m,x;if(l)m=1/(a-s),x=a/(a-s);else if(o===yn)m=-2/(a-s),x=-(a+s)/(a-s);else if(o===Mr)m=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const wi=new C,rn=new lt,cf=new C(0,0,0),uf=new C(1,1,1),Hn=new C,Ir=new C,Yt=new C,Ml=new lt,yl=new ji;class ei{constructor(e=0,t=0,n=0,r=ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-We(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(We(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-We(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(We(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ml.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ml,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return yl.setFromEuler(this),this.setFromQuaternion(yl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ei.DEFAULT_ORDER="XYZ";class Ho{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let hf=0;const wl=new C,Ei=new ji,Rn=new lt,Ur=new C,ir=new C,ff=new C,df=new ji,El=new C(1,0,0),Tl=new C(0,1,0),Al=new C(0,0,1),Rl={type:"added"},pf={type:"removed"},Ti={type:"childadded",child:null},Js={type:"childremoved",child:null};class zt extends bi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=wn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zt.DEFAULT_UP.clone();const e=new C,t=new ei,n=new ji,r=new C(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new lt},normalMatrix:{value:new He}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ho,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ei.setFromAxisAngle(e,t),this.quaternion.multiply(Ei),this}rotateOnWorldAxis(e,t){return Ei.setFromAxisAngle(e,t),this.quaternion.premultiply(Ei),this}rotateX(e){return this.rotateOnAxis(El,e)}rotateY(e){return this.rotateOnAxis(Tl,e)}rotateZ(e){return this.rotateOnAxis(Al,e)}translateOnAxis(e,t){return wl.copy(e).applyQuaternion(this.quaternion),this.position.add(wl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(El,e)}translateY(e){return this.translateOnAxis(Tl,e)}translateZ(e){return this.translateOnAxis(Al,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ur.copy(e):Ur.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(ir,Ur,this.up):Rn.lookAt(Ur,ir,this.up),this.quaternion.setFromRotationMatrix(Rn),r&&(Rn.extractRotation(r.matrixWorld),Ei.setFromRotationMatrix(Rn),this.quaternion.premultiply(Ei.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Rl),Ti.child=e,this.dispatchEvent(Ti),Ti.child=null):je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(pf),Js.child=e,this.dispatchEvent(Js),Js.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Rn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Rn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Rl),Ti.child=e,this.dispatchEvent(Ti),Ti.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,e,ff),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,df,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),d=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=r,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}zt.DEFAULT_UP=new C(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class fi extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const mf={type:"move"};class Qs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const g=t.getJointPose(x,n),p=this._getHandJoint(c,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,m=.005;c.inputState.pinching&&h>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(mf)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new fi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const uu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wn={h:0,s:0,l:0},Nr={h:0,s:0,l:0};function js(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Je{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Qe.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Qe.workingColorSpace){if(e=Vo(e,1),t=We(t,0,1),n=We(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=js(a,s,e+1/3),this.g=js(a,s,e),this.b=js(a,s,e-1/3)}return Qe.colorSpaceToWorking(this,r),this}setStyle(e,t=Qt){function n(s){s!==void 0&&parseFloat(s)<1&&ke("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:ke("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qt){const n=uu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Nn(e.r),this.g=Nn(e.g),this.b=Nn(e.b),this}copyLinearToSRGB(e){return this.r=Yi(e.r),this.g=Yi(e.g),this.b=Yi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qt){return Qe.workingToColorSpace(Nt.copy(this),e),Math.round(We(Nt.r*255,0,255))*65536+Math.round(We(Nt.g*255,0,255))*256+Math.round(We(Nt.b*255,0,255))}getHexString(e=Qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(Nt.copy(this),t);const n=Nt.r,r=Nt.g,s=Nt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case n:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-n)/f+2;break;case s:l=(n-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(Nt.copy(this),t),e.r=Nt.r,e.g=Nt.g,e.b=Nt.b,e}getStyle(e=Qt){Qe.workingToColorSpace(Nt.copy(this),e);const t=Nt.r,n=Nt.g,r=Nt.b;return e!==Qt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Wn),this.setHSL(Wn.h+e,Wn.s+t,Wn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Wn),e.getHSL(Nr);const n=pr(Wn.h,Nr.h,t),r=pr(Wn.s,Nr.s,t),s=pr(Wn.l,Nr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Nt=new Je;Je.NAMES=uu;class gf extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ei,this.environmentIntensity=1,this.environmentRotation=new ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const sn=new C,Cn=new C,ea=new C,Pn=new C,Ai=new C,Ri=new C,Cl=new C,ta=new C,na=new C,ia=new C,ra=new pt,sa=new pt,aa=new pt;class tn{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),sn.subVectors(e,t),r.cross(sn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){sn.subVectors(r,t),Cn.subVectors(n,t),ea.subVectors(e,t);const a=sn.dot(sn),o=sn.dot(Cn),l=sn.dot(ea),c=Cn.dot(Cn),u=Cn.dot(ea),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(c*l-o*u)*h,m=(a*u-o*l)*h;return s.set(1-d-m,m,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Pn)===null?!1:Pn.x>=0&&Pn.y>=0&&Pn.x+Pn.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,Pn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Pn.x),l.addScaledVector(a,Pn.y),l.addScaledVector(o,Pn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return ra.setScalar(0),sa.setScalar(0),aa.setScalar(0),ra.fromBufferAttribute(e,t),sa.fromBufferAttribute(e,n),aa.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ra,s.x),a.addScaledVector(sa,s.y),a.addScaledVector(aa,s.z),a}static isFrontFacing(e,t,n,r){return sn.subVectors(n,t),Cn.subVectors(e,t),sn.cross(Cn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return sn.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),sn.cross(Cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return tn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return tn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;Ai.subVectors(r,n),Ri.subVectors(s,n),ta.subVectors(e,n);const l=Ai.dot(ta),c=Ri.dot(ta);if(l<=0&&c<=0)return t.copy(n);na.subVectors(e,r);const u=Ai.dot(na),f=Ri.dot(na);if(u>=0&&f<=u)return t.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Ai,a);ia.subVectors(e,s);const d=Ai.dot(ia),m=Ri.dot(ia);if(m>=0&&d<=m)return t.copy(s);const x=d*c-l*m;if(x<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(Ri,o);const g=u*m-d*f;if(g<=0&&f-u>=0&&d-m>=0)return Cl.subVectors(s,r),o=(f-u)/(f-u+(d-m)),t.copy(r).addScaledVector(Cl,o);const p=1/(g+x+h);return a=x*p,o=h*p,t.copy(n).addScaledVector(Ai,a).addScaledVector(Ri,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class On{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(an.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(an.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=an.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,an):an.fromBufferAttribute(s,a),an.applyMatrix4(e.matrixWorld),this.expandByPoint(an);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),kr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),kr.copy(n.boundingBox)),kr.applyMatrix4(e.matrixWorld),this.union(kr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,an),an.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(rr),Fr.subVectors(this.max,rr),Ci.subVectors(e.a,rr),Pi.subVectors(e.b,rr),Li.subVectors(e.c,rr),Xn.subVectors(Pi,Ci),qn.subVectors(Li,Pi),ii.subVectors(Ci,Li);let t=[0,-Xn.z,Xn.y,0,-qn.z,qn.y,0,-ii.z,ii.y,Xn.z,0,-Xn.x,qn.z,0,-qn.x,ii.z,0,-ii.x,-Xn.y,Xn.x,0,-qn.y,qn.x,0,-ii.y,ii.x,0];return!oa(t,Ci,Pi,Li,Fr)||(t=[1,0,0,0,1,0,0,0,1],!oa(t,Ci,Pi,Li,Fr))?!1:(Or.crossVectors(Xn,qn),t=[Or.x,Or.y,Or.z],oa(t,Ci,Pi,Li,Fr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,an).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(an).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ln=[new C,new C,new C,new C,new C,new C,new C,new C],an=new C,kr=new On,Ci=new C,Pi=new C,Li=new C,Xn=new C,qn=new C,ii=new C,rr=new C,Fr=new C,Or=new C,ri=new C;function oa(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){ri.fromArray(i,s);const o=r.x*Math.abs(ri.x)+r.y*Math.abs(ri.y)+r.z*Math.abs(ri.z),l=e.dot(ri),c=t.dot(ri),u=n.dot(ri);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const yt=new C,Br=new fe;let vf=0;class hn extends bi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ou,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Br.fromBufferAttribute(this,t),Br.applyMatrix3(e),this.setXY(t,Br.x,Br.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=on(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ht(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=on(t,this.array)),t}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=on(t,this.array)),t}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=on(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=on(t,this.array)),t}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),r=ht(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),r=ht(r,this.array),s=ht(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class hu extends hn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class fu extends hn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class wt extends hn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const _f=new On,sr=new C,la=new C;class er{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):_f.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;sr.subVectors(e,this.center);const t=sr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(sr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(la.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(sr.copy(e.center).add(la)),this.expandByPoint(sr.copy(e.center).sub(la))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let xf=0;const Jt=new lt,ca=new zt,Di=new C,$t=new On,ar=new On,At=new C;class Ft extends bi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xf++}),this.uuid=wn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Uh(e)?fu:hu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new He().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Jt.makeRotationFromQuaternion(e),this.applyMatrix4(Jt),this}rotateX(e){return Jt.makeRotationX(e),this.applyMatrix4(Jt),this}rotateY(e){return Jt.makeRotationY(e),this.applyMatrix4(Jt),this}rotateZ(e){return Jt.makeRotationZ(e),this.applyMatrix4(Jt),this}translate(e,t,n){return Jt.makeTranslation(e,t,n),this.applyMatrix4(Jt),this}scale(e,t,n){return Jt.makeScale(e,t,n),this.applyMatrix4(Jt),this}lookAt(e){return ca.lookAt(e),ca.updateMatrix(),this.applyMatrix4(ca.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Di).negate(),this.translate(Di.x,Di.y,Di.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new wt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new On);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];$t.setFromBufferAttribute(s),this.morphTargetsRelative?(At.addVectors(this.boundingBox.min,$t.min),this.boundingBox.expandByPoint(At),At.addVectors(this.boundingBox.max,$t.max),this.boundingBox.expandByPoint(At)):(this.boundingBox.expandByPoint($t.min),this.boundingBox.expandByPoint($t.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new er);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if($t.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];ar.setFromBufferAttribute(o),this.morphTargetsRelative?(At.addVectors($t.min,ar.min),$t.expandByPoint(At),At.addVectors($t.max,ar.max),$t.expandByPoint(At)):($t.expandByPoint(ar.min),$t.expandByPoint(ar.max))}$t.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)At.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(At));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)At.fromBufferAttribute(o,c),l&&(Di.fromBufferAttribute(e,c),At.add(Di)),r=Math.max(r,n.distanceToSquared(At))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new hn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new C,l[_]=new C;const c=new C,u=new C,f=new C,h=new fe,d=new fe,m=new fe,x=new C,g=new C;function p(_,w,P){c.fromBufferAttribute(n,_),u.fromBufferAttribute(n,w),f.fromBufferAttribute(n,P),h.fromBufferAttribute(s,_),d.fromBufferAttribute(s,w),m.fromBufferAttribute(s,P),u.sub(c),f.sub(c),d.sub(h),m.sub(h);const z=1/(d.x*m.y-m.x*d.y);isFinite(z)&&(x.copy(u).multiplyScalar(m.y).addScaledVector(f,-d.y).multiplyScalar(z),g.copy(f).multiplyScalar(d.x).addScaledVector(u,-m.x).multiplyScalar(z),o[_].add(x),o[w].add(x),o[P].add(x),l[_].add(g),l[w].add(g),l[P].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let _=0,w=T.length;_<w;++_){const P=T[_],z=P.start,k=P.count;for(let V=z,U=z+k;V<U;V+=3)p(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const R=new C,S=new C,y=new C,M=new C;function A(_){y.fromBufferAttribute(r,_),M.copy(y);const w=o[_];R.copy(w),R.sub(y.multiplyScalar(y.dot(w))).normalize(),S.crossVectors(M,w);const z=S.dot(l[_])<0?-1:1;a.setXYZW(_,R.x,R.y,R.z,z)}for(let _=0,w=T.length;_<w;++_){const P=T[_],z=P.start,k=P.count;for(let V=z,U=z+k;V<U;V+=3)A(e.getX(V+0)),A(e.getX(V+1)),A(e.getX(V+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new hn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);const r=new C,s=new C,a=new C,o=new C,l=new C,c=new C,u=new C,f=new C;if(e)for(let h=0,d=e.count;h<d;h+=3){const m=e.getX(h+0),x=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)At.fromBufferAttribute(e,t),At.normalize(),e.setXYZ(t,At.x,At.y,At.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let d=0,m=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?d=l[x]*o.data.stride+o.offset:d=l[x]*u;for(let p=0;p<u;p++)h[m++]=c[d++]}return new hn(h,u,f)}if(this.index===null)return ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ft,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=e(h,n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class bf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ou,this.updateRanges=[],this.version=0,this.uuid=wn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}}const Bt=new C;class Jn{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=on(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ht(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=on(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=on(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=on(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=on(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),r=ht(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),r=ht(r,this.array),s=ht(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Rs("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new hn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Jn(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Rs("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const ua=new C,Sf=new C,Mf=new He;class zn{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=ua.subVectors(n,t).cross(Sf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(ua),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Mf.getNormalMatrix(e),r=this.coplanarPoint(ua).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let yf=0;class tr extends bi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yf++}),this.uuid=wn(),this.name="",this.type="Material",this.blending=dr,this.side=jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wc,this.blendDst=Xc,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=xr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Rh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qs,this.stencilZFail=qs,this.stencilZPass=qs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){ke(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Je().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new zn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new fe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new fe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Dn=new C,ha=new C,Vr=new C,Gr=new C;class Wo{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Dn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Dn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Dn.copy(this.origin).addScaledVector(this.direction,t),Dn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ha.copy(e).add(t).multiplyScalar(.5),Vr.copy(t).sub(e).normalize(),Gr.copy(this.origin).sub(ha);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Vr),o=Gr.dot(this.direction),l=-Gr.dot(Vr),c=Gr.lengthSq(),u=Math.abs(1-a*a);let f,h,d,m;if(u>0)if(f=a*l-o,h=a*o-l,m=s*u,f>=0)if(h>=-m)if(h<=m){const x=1/u;f*=x,h*=x,d=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h<=-m?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=m?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(ha).addScaledVector(Vr,h),d}intersectSphere(e,t){if(e.radius<0)return null;Dn.subVectors(e.center,this.origin);const n=Dn.dot(this.direction),r=Dn.dot(Dn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Dn)!==null}intersectTriangle(e,t,n,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,f=e.x-a.x,h=e.y-a.y,d=e.z-a.z,m=t.x-a.x,x=t.y-a.y,g=t.z-a.z,p=n.x-a.x,T=n.y-a.y,R=n.z-a.z,S=Math.abs(l),y=Math.abs(c),M=Math.abs(u);let A,_,w,P,z,k,V,U,F,K,H,re;if(S>=y&&S>=M?(w=l,k=f,F=m,re=p,l>=0?(A=c,_=u,P=h,z=d,V=x,U=g,K=T,H=R):(A=u,_=c,P=d,z=h,V=g,U=x,K=R,H=T)):y>=M?(w=c,k=h,F=x,re=T,c>=0?(A=u,_=l,P=d,z=f,V=g,U=m,K=R,H=p):(A=l,_=u,P=f,z=d,V=m,U=g,K=p,H=R)):(w=u,k=d,F=g,re=R,u>=0?(A=l,_=c,P=f,z=h,V=m,U=x,K=p,H=T):(A=c,_=l,P=h,z=f,V=x,U=m,K=T,H=p)),w===0)return null;const q=A/w,j=_/w,ne=1/w,Pe=P-q*k,Ee=z-j*k,it=V-q*F,$e=U-j*F,et=K-q*re,Z=H-j*re,ee=et*$e-Z*it,_e=Pe*Z-Ee*et,Fe=it*Ee-$e*Pe;if(r){if(ee<0||_e<0||Fe<0)return null}else if((ee<0||_e<0||Fe<0)&&(ee>0||_e>0||Fe>0))return null;const Me=ee+_e+Fe;if(Me===0)return null;const Oe=ne*(ee*k+_e*F+Fe*re);return(Me>0?Oe<0:Oe>0)?null:this.at(Oe/Me,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class du extends tr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=Do,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Pl=new lt,si=new Wo,Hr=new er,Ll=new C,Wr=new C,Xr=new C,qr=new C,fa=new C,Yr=new C,Dl=new C,$r=new C;class fn extends zt{constructor(e=new Ft,t=new du){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Yr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(fa.fromBufferAttribute(f,e),a?Yr.addScaledVector(fa,u):Yr.addScaledVector(fa.sub(t),u))}t.add(Yr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(s),si.copy(e.ray).recast(e.near),!(Hr.containsPoint(si.origin)===!1&&(si.intersectSphere(Hr,Ll)===null||si.origin.distanceToSquared(Ll)>(e.far-e.near)**2))&&(Pl.copy(s).invert(),si.copy(e.ray).applyMatrix4(Pl),!(n.boundingBox!==null&&si.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,si)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,x=h.length;m<x;m++){const g=h[m],p=a[g.materialIndex],T=Math.max(g.start,d.start),R=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let S=T,y=R;S<y;S+=3){const M=o.getX(S),A=o.getX(S+1),_=o.getX(S+2);r=Zr(this,p,e,n,c,u,f,M,A,_),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const m=Math.max(0,d.start),x=Math.min(o.count,d.start+d.count);for(let g=m,p=x;g<p;g+=3){const T=o.getX(g),R=o.getX(g+1),S=o.getX(g+2);r=Zr(this,a,e,n,c,u,f,T,R,S),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,x=h.length;m<x;m++){const g=h[m],p=a[g.materialIndex],T=Math.max(g.start,d.start),R=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let S=T,y=R;S<y;S+=3){const M=S,A=S+1,_=S+2;r=Zr(this,p,e,n,c,u,f,M,A,_),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const m=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let g=m,p=x;g<p;g+=3){const T=g,R=g+1,S=g+2;r=Zr(this,a,e,n,c,u,f,T,R,S),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function wf(i,e,t,n,r,s,a,o){let l;if(e.side===qt?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===jn,o),l===null)return null;$r.copy(o),$r.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo($r);return c<t.near||c>t.far?null:{distance:c,point:$r.clone(),object:i}}function Zr(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Wr),i.getVertexPosition(l,Xr),i.getVertexPosition(c,qr);const u=wf(i,e,t,n,Wr,Xr,qr,Dl);if(u){const f=new C;tn.getBarycoord(Dl,Wr,Xr,qr,f),r&&(u.uv=tn.getInterpolatedAttribute(r,o,l,c,f,new fe)),s&&(u.uv1=tn.getInterpolatedAttribute(s,o,l,c,f,new fe)),a&&(u.normal=tn.getInterpolatedAttribute(a,o,l,c,f,new C),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new C,materialIndex:0};tn.getNormal(Wr,Xr,qr,h.normal),u.face=h,u.barycoord=f}return u}class Ef extends Ht{constructor(e=null,t=1,n=1,r,s,a,o,l,c=Lt,u=Lt,f,h){super(null,a,o,l,c,u,r,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ai=new er,Tf=new fe(.5,.5),Kr=new C;class Xo{constructor(e=new zn,t=new zn,n=new zn,r=new zn,s=new zn,a=new zn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=yn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],f=s[5],h=s[6],d=s[7],m=s[8],x=s[9],g=s[10],p=s[11],T=s[12],R=s[13],S=s[14],y=s[15];if(r[0].setComponents(c-a,d-u,p-m,y-T).normalize(),r[1].setComponents(c+a,d+u,p+m,y+T).normalize(),r[2].setComponents(c+o,d+f,p+x,y+R).normalize(),r[3].setComponents(c-o,d-f,p-x,y-R).normalize(),n)r[4].setComponents(l,h,g,S).normalize(),r[5].setComponents(c-l,d-h,p-g,y-S).normalize();else if(r[4].setComponents(c-l,d-h,p-g,y-S).normalize(),t===yn)r[5].setComponents(c+l,d+h,p+g,y+S).normalize();else if(t===Mr)r[5].setComponents(l,h,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ai)}intersectsSprite(e){ai.center.set(0,0,0);const t=Tf.distanceTo(e.center);return ai.radius=.7071067811865476+t,ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(ai)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Kr.x=r.normal.x>0?e.max.x:e.min.x,Kr.y=r.normal.y>0?e.max.y:e.min.y,Kr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Kr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Gi extends tr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Cs=new C,Ps=new C,zl=new lt,or=new Wo,Jr=new er,da=new C,Il=new C;class pu extends zt{constructor(e=new Ft,t=new Gi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Cs.fromBufferAttribute(t,r-1),Ps.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Cs.distanceTo(Ps);e.setAttribute("lineDistance",new wt(n,1))}else ke("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jr.copy(n.boundingSphere),Jr.applyMatrix4(r),Jr.radius+=s,e.ray.intersectsSphere(Jr)===!1)return;zl.copy(r).invert(),or.copy(e.ray).applyMatrix4(zl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const d=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let x=d,g=m-1;x<g;x+=c){const p=u.getX(x),T=u.getX(x+1),R=Qr(this,e,or,l,p,T,x);R&&t.push(R)}if(this.isLineLoop){const x=u.getX(m-1),g=u.getX(d),p=Qr(this,e,or,l,x,g,m-1);p&&t.push(p)}}else{const d=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let x=d,g=m-1;x<g;x+=c){const p=Qr(this,e,or,l,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){const x=Qr(this,e,or,l,m-1,d,m-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Qr(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(Cs.fromBufferAttribute(o,r),Ps.fromBufferAttribute(o,s),t.distanceSqToSegment(Cs,Ps,da,Il)>n)return;da.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(da);if(!(c<e.near||c>e.far))return{distance:c,point:Il.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Ul=new C,Nl=new C;class jr extends pu{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Ul.fromBufferAttribute(t,r),Nl.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Ul.distanceTo(Nl);e.setAttribute("lineDistance",new wt(n,1))}else ke("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class mu extends Ht{constructor(e=[],t=gi,n,r,s,a,o,l,c,u){super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class wr extends Ht{constructor(e,t,n=En,r,s,a,o=Lt,l=Lt,c,u=Fn,f=1){if(u!==Fn&&u!==hi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Go(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Af extends wr{constructor(e,t=En,n=gi,r,s,a=Lt,o=Lt,l,c=Fn){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,n,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class gu extends Ht{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class _i extends Ft{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let h=0,d=0;m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,r,a,2),m("x","z","y",1,-1,e,n,-t,r,a,3),m("x","y","z",1,-1,e,t,n,r,s,4),m("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new wt(c,3)),this.setAttribute("normal",new wt(u,3)),this.setAttribute("uv",new wt(f,2));function m(x,g,p,T,R,S,y,M,A,_,w){const P=S/A,z=y/_,k=S/2,V=y/2,U=M/2,F=A+1,K=_+1;let H=0,re=0;const q=new C;for(let j=0;j<K;j++){const ne=j*z-V;for(let Pe=0;Pe<F;Pe++){const Ee=Pe*P-k;q[x]=Ee*T,q[g]=ne*R,q[p]=U,c.push(q.x,q.y,q.z),q[x]=0,q[g]=0,q[p]=M>0?1:-1,u.push(q.x,q.y,q.z),f.push(Pe/A),f.push(1-j/_),H+=1}}for(let j=0;j<_;j++)for(let ne=0;ne<A;ne++){const Pe=h+ne+F*j,Ee=h+ne+F*(j+1),it=h+(ne+1)+F*(j+1),$e=h+(ne+1)+F*j;l.push(Pe,Ee,$e),l.push(Ee,it,$e),re+=6}o.addGroup(d,re,w),d+=re,h+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class qo extends Ft{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],f=[],h=[],d=[];let m=0;const x=[],g=n/2;let p=0;T(),a===!1&&(e>0&&R(!0),t>0&&R(!1)),this.setIndex(u),this.setAttribute("position",new wt(f,3)),this.setAttribute("normal",new wt(h,3)),this.setAttribute("uv",new wt(d,2));function T(){const S=new C,y=new C;let M=0;const A=(t-e)/n;for(let _=0;_<=s;_++){const w=[],P=_/s,z=P*(t-e)+e;for(let k=0;k<=r;k++){const V=k/r,U=V*l+o,F=Math.sin(U),K=Math.cos(U);y.x=z*F,y.y=-P*n+g,y.z=z*K,f.push(y.x,y.y,y.z),S.set(F,A,K).normalize(),h.push(S.x,S.y,S.z),d.push(V,1-P),w.push(m++)}x.push(w)}for(let _=0;_<r;_++)for(let w=0;w<s;w++){const P=x[w][_],z=x[w+1][_],k=x[w+1][_+1],V=x[w][_+1];(e>0||w!==0)&&(u.push(P,z,V),M+=3),(t>0||w!==s-1)&&(u.push(z,k,V),M+=3)}c.addGroup(p,M,0),p+=M}function R(S){const y=m,M=new fe,A=new C;let _=0;const w=S===!0?e:t,P=S===!0?1:-1;for(let k=1;k<=r;k++)f.push(0,g*P,0),h.push(0,P,0),d.push(.5,.5),m++;const z=m;for(let k=0;k<=r;k++){const U=k/r*l+o,F=Math.cos(U),K=Math.sin(U);A.x=w*K,A.y=g*P,A.z=w*F,f.push(A.x,A.y,A.z),h.push(0,P,0),M.x=F*.5+.5,M.y=K*.5*P+.5,d.push(M.x,M.y),m++}for(let k=0;k<r;k++){const V=y+k,U=z+k;S===!0?u.push(U,U+1,V):u.push(U+1,U,V),_+=3}c.addGroup(p,_,S===!0?1:2),p+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qo(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const es=new C,ts=new C,pa=new C,ns=new tn;class Rf extends Ft{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(qi*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],f=new Array(3),h={},d=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);const{a:x,b:g,c:p}=ns;if(x.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),ns.getNormal(pa),f[0]=`${Math.round(x.x*r)},${Math.round(x.y*r)},${Math.round(x.z*r)}`,f[1]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,f[2]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let T=0;T<3;T++){const R=(T+1)%3,S=f[T],y=f[R],M=ns[u[T]],A=ns[u[R]],_=`${S}_${y}`,w=`${y}_${S}`;w in h&&h[w]?(pa.dot(h[w].normal)<=s&&(d.push(M.x,M.y,M.z),d.push(A.x,A.y,A.z)),h[w]=null):_ in h||(h[_]={index0:c[T],index1:c[R],normal:pa.clone()})}}for(const m in h)if(h[m]){const{index0:x,index1:g}=h[m];es.fromBufferAttribute(o,x),ts.fromBufferAttribute(o,g),d.push(es.x,es.y,es.z),d.push(ts.x,ts.y,ts.z)}this.setAttribute("position",new wt(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class An{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ke("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let r=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);const u=n[r],h=n[r+1]-u,d=(a-u)/h;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new fe:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new C,r=[],s=[],a=[],o=new C,l=new lt;for(let d=0;d<=e;d++){const m=d/e;r[d]=this.getTangentAt(m,new C)}s[0]=new C,a[0]=new C;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),f=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(r[d-1],r[d]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(We(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(o,m))}a[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(We(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],d*m)),a[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Yo extends An{constructor(e=0,t=0,n=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new fe){const n=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=l-this.aX,d=c-this.aY;l=h*u-d*f+this.aX,c=h*f+d*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Cf extends Yo{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function $o(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,f){let h=(a-s)/c-(o-s)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+f)+(l-o)/f;h*=u,d*=u,r(a,o,h,d)},calc:function(s){const a=s*s,o=a*s;return i+e*s+t*a+n*o}}}const kl=new C,Fl=new C,ma=new $o,ga=new $o,va=new $o;class Pf extends An{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new C){const n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(Fl.subVectors(r[0],r[1]).add(r[0]),c=Fl);const f=r[o%s],h=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(kl.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=kl),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(f),d),x=Math.pow(f.distanceToSquared(h),d),g=Math.pow(h.distanceToSquared(u),d);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),ma.initNonuniformCatmullRom(c.x,f.x,h.x,u.x,m,x,g),ga.initNonuniformCatmullRom(c.y,f.y,h.y,u.y,m,x,g),va.initNonuniformCatmullRom(c.z,f.z,h.z,u.z,m,x,g)}else this.curveType==="catmullrom"&&(ma.initCatmullRom(c.x,f.x,h.x,u.x,this.tension),ga.initCatmullRom(c.y,f.y,h.y,u.y,this.tension),va.initCatmullRom(c.z,f.z,h.z,u.z,this.tension));return n.set(ma.calc(l),ga.calc(l),va.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new C().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Ol(i,e,t,n,r){const s=(n-e)*.5,a=(r-t)*.5,o=i*i,l=i*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*i+t}function Lf(i,e){const t=1-i;return t*t*e}function Df(i,e){return 2*(1-i)*i*e}function zf(i,e){return i*i*e}function mr(i,e,t,n){return Lf(i,e)+Df(i,t)+zf(i,n)}function If(i,e){const t=1-i;return t*t*t*e}function Uf(i,e){const t=1-i;return 3*t*t*i*e}function Nf(i,e){return 3*(1-i)*i*i*e}function kf(i,e){return i*i*i*e}function gr(i,e,t,n,r){return If(i,e)+Uf(i,t)+Nf(i,n)+kf(i,r)}class vu extends An{constructor(e=new fe,t=new fe,n=new fe,r=new fe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new fe){const n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(gr(e,r.x,s.x,a.x,o.x),gr(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ff extends An{constructor(e=new C,t=new C,n=new C,r=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new C){const n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(gr(e,r.x,s.x,a.x,o.x),gr(e,r.y,s.y,a.y,o.y),gr(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class _u extends An{constructor(e=new fe,t=new fe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new fe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new fe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Of extends An{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class xu extends An{constructor(e=new fe,t=new fe,n=new fe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new fe){const n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(mr(e,r.x,s.x,a.x),mr(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Bf extends An{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){const n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(mr(e,r.x,s.x,a.x),mr(e,r.y,s.y,a.y),mr(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class bu extends An{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new fe){const n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],u=r[a>r.length-2?r.length-1:a+1],f=r[a>r.length-3?r.length-1:a+2];return n.set(Ol(o,l.x,c.x,u.x,f.x),Ol(o,l.y,c.y,u.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new fe().fromArray(r))}return this}}var vo=Object.freeze({__proto__:null,ArcCurve:Cf,CatmullRomCurve3:Pf,CubicBezierCurve:vu,CubicBezierCurve3:Ff,EllipseCurve:Yo,LineCurve:_u,LineCurve3:Of,QuadraticBezierCurve:xu,QuadraticBezierCurve3:Bf,SplineCurve:bu});class Vf extends An{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new vo[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const a=r[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(new vo[r.type]().fromJSON(r))}return this}}class Ls extends Vf{constructor(e){super(),this.type="Path",this.currentPoint=new fe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new _u(this.currentPoint.clone(),new fe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){const s=new xu(this.currentPoint.clone(),new fe(e,t),new fe(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){const o=new vu(this.currentPoint.clone(),new fe(e,t),new fe(n,r),new fe(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new bu(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,r,s,a,o,l),this}absellipse(e,t,n,r,s,a,o,l){const c=new Yo(e,t,n,r,s,a,o,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ds extends Ls{constructor(e){super(e),this.uuid=wn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(new Ls().fromJSON(r))}return this}}function Gf(i,e,t=2){const n=e&&e.length,r=n?e[0]*t:i.length;let s=Su(i,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=Yf(i,e,s,t)),i.length>80*t){o=i[0],l=i[1];let u=o,f=l;for(let h=t;h<r;h+=t){const d=i[h],m=i[h+1];d<o&&(o=d),m<l&&(l=m),d>u&&(u=d),m>f&&(f=m)}c=Math.max(u-o,f-l),c=c!==0?32767/c:0}return Er(s,a,t,o,l,c,0),a}function Su(i,e,t,n,r){let s;if(r===rd(i,e,t,n)>0)for(let a=e;a<t;a+=n)s=Bl(a/n|0,i[a],i[a+1],s);else for(let a=t-n;a>=e;a-=n)s=Bl(a/n|0,i[a],i[a+1],s);return s&&Ji(s,s.next)&&(Ar(s),s=s.next),s}function xi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Ji(t,t.next)||xt(t.prev,t,t.next)===0)){if(Ar(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Er(i,e,t,n,r,s,a){if(!i)return;!a&&s&&Qf(i,n,r,s);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(s?Wf(i,n,r,s):Hf(i)){e.push(l.i,i.i,c.i),Ar(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Xf(xi(i),e),Er(i,e,t,n,r,s,2)):a===2&&qf(i,e,t,n,r,s):Er(xi(i),e,t,n,r,s,1);break}}}function Hf(i){const e=i.prev,t=i,n=i.next;if(xt(e,t,n)>=0)return!1;const r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=Math.min(r,s,a),f=Math.min(o,l,c),h=Math.max(r,s,a),d=Math.max(o,l,c);let m=n.next;for(;m!==e;){if(m.x>=u&&m.x<=h&&m.y>=f&&m.y<=d&&hr(r,o,s,l,a,c,m.x,m.y)&&xt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Wf(i,e,t,n){const r=i.prev,s=i,a=i.next;if(xt(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,u=r.y,f=s.y,h=a.y,d=Math.min(o,l,c),m=Math.min(u,f,h),x=Math.max(o,l,c),g=Math.max(u,f,h),p=_o(d,m,e,t,n),T=_o(x,g,e,t,n);let R=i.prevZ,S=i.nextZ;for(;R&&R.z>=p&&S&&S.z<=T;){if(R.x>=d&&R.x<=x&&R.y>=m&&R.y<=g&&R!==r&&R!==a&&hr(o,u,l,f,c,h,R.x,R.y)&&xt(R.prev,R,R.next)>=0||(R=R.prevZ,S.x>=d&&S.x<=x&&S.y>=m&&S.y<=g&&S!==r&&S!==a&&hr(o,u,l,f,c,h,S.x,S.y)&&xt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;R&&R.z>=p;){if(R.x>=d&&R.x<=x&&R.y>=m&&R.y<=g&&R!==r&&R!==a&&hr(o,u,l,f,c,h,R.x,R.y)&&xt(R.prev,R,R.next)>=0)return!1;R=R.prevZ}for(;S&&S.z<=T;){if(S.x>=d&&S.x<=x&&S.y>=m&&S.y<=g&&S!==r&&S!==a&&hr(o,u,l,f,c,h,S.x,S.y)&&xt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function Xf(i,e){let t=i;do{const n=t.prev,r=t.next.next;!Ji(n,r)&&yu(n,t,t.next,r)&&Tr(n,r)&&Tr(r,n)&&(e.push(n.i,t.i,r.i),Ar(t),Ar(t.next),t=i=r),t=t.next}while(t!==i);return xi(t)}function qf(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&td(a,o)){let l=wu(a,o);a=xi(a,a.next),l=xi(l,l.next),Er(a,e,t,n,r,s,0),Er(l,e,t,n,r,s,0);return}o=o.next}a=a.next}while(a!==i)}function Yf(i,e,t,n){const r=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*n,l=s<a-1?e[s+1]*n:i.length,c=Su(i,o,l,n,!1);c===c.next&&(c.steiner=!0),r.push(ed(c))}r.sort($f);for(let s=0;s<r.length;s++)t=Zf(r[s],t);return t}function $f(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=n-r}return t}function Zf(i,e){const t=Kf(i,e);if(!t)return e;const n=wu(t,i);return xi(n,n.next),xi(t,t.next)}function Kf(i,e){let t=e;const n=i.x,r=i.y;let s=-1/0,a;if(Ji(i,t))return t;do{if(Ji(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const f=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=n&&f>s&&(s=f,a=t.x<t.next.x?t:t.next,f===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Mu(r<c?n:s,r,l,c,r<c?s:n,r,t.x,t.y)){const f=Math.abs(r-t.y)/(n-t.x);Tr(t,i)&&(f<u||f===u&&(t.x>a.x||t.x===a.x&&Jf(a,t)))&&(a=t,u=f)}t=t.next}while(t!==o);return a}function Jf(i,e){return xt(i.prev,i,e.prev)<0&&xt(e.next,i,i.next)<0}function Qf(i,e,t,n){let r=i;do r.z===0&&(r.z=_o(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,jf(r)}function jf(i){let e,t=1;do{let n=i,r;i=null;let s=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(r=n,n=n.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;n=a}s.nextZ=null,t*=2}while(e>1);return i}function _o(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function ed(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Mu(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function hr(i,e,t,n,r,s,a,o){return!(i===a&&e===o)&&Mu(i,e,t,n,r,s,a,o)}function td(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!nd(i,e)&&(Tr(i,e)&&Tr(e,i)&&id(i,e)&&(xt(i.prev,i,e.prev)||xt(i,e.prev,e))||Ji(i,e)&&xt(i.prev,i,i.next)>0&&xt(e.prev,e,e.next)>0)}function xt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Ji(i,e){return i.x===e.x&&i.y===e.y}function yu(i,e,t,n){const r=rs(xt(i,e,t)),s=rs(xt(i,e,n)),a=rs(xt(t,n,i)),o=rs(xt(t,n,e));return!!(r!==s&&a!==o||r===0&&is(i,t,e)||s===0&&is(i,n,e)||a===0&&is(t,i,n)||o===0&&is(t,e,n))}function is(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function rs(i){return i>0?1:i<0?-1:0}function nd(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&yu(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Tr(i,e){return xt(i.prev,i,i.next)<0?xt(i,e,i.next)>=0&&xt(i,i.prev,e)>=0:xt(i,e,i.prev)<0||xt(i,i.next,e)<0}function id(i,e){let t=i,n=!1;const r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function wu(i,e){const t=xo(i.i,i.x,i.y),n=xo(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Bl(i,e,t,n){const r=xo(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Ar(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function xo(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function rd(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}class sd{static triangulate(e,t,n=2){return Gf(e,t,n)}}class Hi{static area(e){const t=e.length;let n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return Hi.area(e)<0}static triangulateShape(e,t){const n=[],r=[],s=[];Vl(e),Gl(n,e);let a=e.length;t.forEach(Vl);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,Gl(n,t[l]);const o=sd.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function Vl(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Gl(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Rr extends Ft{constructor(e=new Ds([new fe(.5,.5),new fe(-.5,.5),new fe(-.5,-.5),new fe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new wt(r,3)),this.setAttribute("uv",new wt(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:d-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,T=t.UVGenerator!==void 0?t.UVGenerator:ad;let R,S=!1,y,M,A,_;if(p){R=p.getSpacedPoints(u),S=!0,h=!1;const te=p.isCatmullRomCurve3?p.closed:!1;y=p.computeFrenetFrames(u,te),M=new C,A=new C,_=new C}h||(g=0,d=0,m=0,x=0);const w=o.extractPoints(c);let P=w.shape;const z=w.holes;if(!Hi.isClockWise(P)){P=P.reverse();for(let te=0,se=z.length;te<se;te++){const ae=z[te];Hi.isClockWise(ae)&&(z[te]=ae.reverse())}}function V(te){const ae=10000000000000001e-36;let oe=te[0];for(let ue=1;ue<=te.length;ue++){const Ue=ue%te.length,Ie=te[Ue],Be=Ie.x-oe.x,Ge=Ie.y-oe.y,L=Be*Be+Ge*Ge,st=Math.max(Math.abs(Ie.x),Math.abs(Ie.y),Math.abs(oe.x),Math.abs(oe.y)),Ze=ae*st*st;if(L<=Ze){te.splice(Ue,1),ue--;continue}oe=Ie}}V(P),z.forEach(V);const U=z.length,F=P;for(let te=0;te<U;te++){const se=z[te];P=P.concat(se)}function K(te,se,ae){return se||je("ExtrudeGeometry: vec does not exist"),te.clone().addScaledVector(se,ae)}const H=P.length;function re(te,se,ae){let oe,ue,Ue;const Ie=te.x-se.x,Be=te.y-se.y,Ge=ae.x-te.x,L=ae.y-te.y,st=Ie*Ie+Be*Be,Ze=Ie*L-Be*Ge;if(Math.abs(Ze)>Number.EPSILON){const E=Math.sqrt(st),v=Math.sqrt(Ge*Ge+L*L),N=se.x-Be/E,G=se.y+Ie/E,Y=ae.x-L/v,le=ae.y+Ge/v,ce=((Y-N)*L-(le-G)*Ge)/(Ie*L-Be*Ge);oe=N+Ie*ce-te.x,ue=G+Be*ce-te.y;const $=oe*oe+ue*ue;if($<=2)return new fe(oe,ue);Ue=Math.sqrt($/2)}else{let E=!1;Ie>Number.EPSILON?Ge>Number.EPSILON&&(E=!0):Ie<-Number.EPSILON?Ge<-Number.EPSILON&&(E=!0):Math.sign(Be)===Math.sign(L)&&(E=!0),E?(oe=-Be,ue=Ie,Ue=Math.sqrt(st)):(oe=Ie,ue=Be,Ue=Math.sqrt(st/2))}return new fe(oe/Ue,ue/Ue)}const q=[];for(let te=0,se=F.length,ae=se-1,oe=te+1;te<se;te++,ae++,oe++)ae===se&&(ae=0),oe===se&&(oe=0),q[te]=re(F[te],F[ae],F[oe]);const j=[];let ne,Pe=q.concat();for(let te=0,se=U;te<se;te++){const ae=z[te];ne=[];for(let oe=0,ue=ae.length,Ue=ue-1,Ie=oe+1;oe<ue;oe++,Ue++,Ie++)Ue===ue&&(Ue=0),Ie===ue&&(Ie=0),ne[oe]=re(ae[oe],ae[Ue],ae[Ie]);j.push(ne),Pe=Pe.concat(ne)}let Ee;if(g===0)Ee=Hi.triangulateShape(F,z);else{const te=[],se=[];for(let ae=0;ae<g;ae++){const oe=ae/g,ue=d*Math.cos(oe*Math.PI/2),Ue=m*Math.sin(oe*Math.PI/2)+x;for(let Ie=0,Be=F.length;Ie<Be;Ie++){const Ge=K(F[Ie],q[Ie],Ue);_e(Ge.x,Ge.y,-ue),oe===0&&te.push(Ge)}for(let Ie=0,Be=U;Ie<Be;Ie++){const Ge=z[Ie];ne=j[Ie];const L=[];for(let st=0,Ze=Ge.length;st<Ze;st++){const E=K(Ge[st],ne[st],Ue);_e(E.x,E.y,-ue),oe===0&&L.push(E)}oe===0&&se.push(L)}}Ee=Hi.triangulateShape(te,se)}const it=Ee.length,$e=m+x;for(let te=0;te<H;te++){const se=h?K(P[te],Pe[te],$e):P[te];S?(A.copy(y.normals[0]).multiplyScalar(se.x),M.copy(y.binormals[0]).multiplyScalar(se.y),_.copy(R[0]).add(A).add(M),_e(_.x,_.y,_.z)):_e(se.x,se.y,0)}for(let te=1;te<=u;te++)for(let se=0;se<H;se++){const ae=h?K(P[se],Pe[se],$e):P[se];S?(A.copy(y.normals[te]).multiplyScalar(ae.x),M.copy(y.binormals[te]).multiplyScalar(ae.y),_.copy(R[te]).add(A).add(M),_e(_.x,_.y,_.z)):_e(ae.x,ae.y,f/u*te)}for(let te=g-1;te>=0;te--){const se=te/g,ae=d*Math.cos(se*Math.PI/2),oe=m*Math.sin(se*Math.PI/2)+x;for(let ue=0,Ue=F.length;ue<Ue;ue++){const Ie=K(F[ue],q[ue],oe);_e(Ie.x,Ie.y,f+ae)}for(let ue=0,Ue=z.length;ue<Ue;ue++){const Ie=z[ue];ne=j[ue];for(let Be=0,Ge=Ie.length;Be<Ge;Be++){const L=K(Ie[Be],ne[Be],oe);S?_e(L.x,L.y+R[u-1].y,R[u-1].x+ae):_e(L.x,L.y,f+ae)}}}et(),Z();function et(){const te=r.length/3;if(h){let se=0,ae=H*se;for(let oe=0;oe<it;oe++){const ue=Ee[oe];Fe(ue[2]+ae,ue[1]+ae,ue[0]+ae)}se=u+g*2,ae=H*se;for(let oe=0;oe<it;oe++){const ue=Ee[oe];Fe(ue[0]+ae,ue[1]+ae,ue[2]+ae)}}else{for(let se=0;se<it;se++){const ae=Ee[se];Fe(ae[2],ae[1],ae[0])}for(let se=0;se<it;se++){const ae=Ee[se];Fe(ae[0]+H*u,ae[1]+H*u,ae[2]+H*u)}}n.addGroup(te,r.length/3-te,0)}function Z(){const te=r.length/3;let se=0;ee(F,se),se+=F.length;for(let ae=0,oe=z.length;ae<oe;ae++){const ue=z[ae];ee(ue,se),se+=ue.length}n.addGroup(te,r.length/3-te,1)}function ee(te,se){let ae=te.length;for(;--ae>=0;){const oe=ae;let ue=ae-1;ue<0&&(ue=te.length-1);for(let Ue=0,Ie=u+g*2;Ue<Ie;Ue++){const Be=H*Ue,Ge=H*(Ue+1),L=se+oe+Be,st=se+ue+Be,Ze=se+ue+Ge,E=se+oe+Ge;Me(L,st,Ze,E)}}}function _e(te,se,ae){l.push(te),l.push(se),l.push(ae)}function Fe(te,se,ae){Oe(te),Oe(se),Oe(ae);const oe=r.length/3,ue=T.generateTopUV(n,r,oe-3,oe-2,oe-1);ct(ue[0]),ct(ue[1]),ct(ue[2])}function Me(te,se,ae,oe){Oe(te),Oe(se),Oe(oe),Oe(se),Oe(ae),Oe(oe);const ue=r.length/3,Ue=T.generateSideWallUV(n,r,ue-6,ue-3,ue-2,ue-1);ct(Ue[0]),ct(Ue[1]),ct(Ue[3]),ct(Ue[1]),ct(Ue[2]),ct(Ue[3])}function Oe(te){r.push(l[te*3+0]),r.push(l[te*3+1]),r.push(l[te*3+2])}function ct(te){s.push(te.x),s.push(te.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return od(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];n.push(o)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new vo[r.type]().fromJSON(r)),new Rr(n,e.options)}}const ad={generateTopUV:function(i,e,t,n,r){const s=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[r*3],u=e[r*3+1];return[new fe(s,a),new fe(o,l),new fe(c,u)]},generateSideWallUV:function(i,e,t,n,r,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],f=e[n*3+2],h=e[r*3],d=e[r*3+1],m=e[r*3+2],x=e[s*3],g=e[s*3+1],p=e[s*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new fe(a,1-l),new fe(c,1-f),new fe(h,1-m),new fe(x,1-p)]:[new fe(o,1-l),new fe(u,1-f),new fe(d,1-m),new fe(g,1-p)]}};function od(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){const s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Ns extends Ft{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,f=e/o,h=t/l,d=[],m=[],x=[],g=[];for(let p=0;p<u;p++){const T=p*h-a;for(let R=0;R<c;R++){const S=R*f-s;m.push(S,-T,0),x.push(0,0,1),g.push(R/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<o;T++){const R=T+c*p,S=T+c*(p+1),y=T+1+c*(p+1),M=T+1+c*p;d.push(R,S,M),d.push(S,y,M)}this.setIndex(d),this.setAttribute("position",new wt(m,3)),this.setAttribute("normal",new wt(x,3)),this.setAttribute("uv",new wt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ns(e.width,e.height,e.widthSegments,e.heightSegments)}}class ld extends Ft{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,r=new C,s=new C;if(e.index!==null){const a=e.attributes.position,o=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const f=l[c],h=f.start,d=f.count;for(let m=h,x=h+d;m<x;m+=3)for(let g=0;g<3;g++){const p=o.getX(m+g),T=o.getX(m+(g+1)%3);r.fromBufferAttribute(a,p),s.fromBufferAttribute(a,T),Hl(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}}else{const a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){const u=3*o+c,f=3*o+(c+1)%3;r.fromBufferAttribute(a,u),s.fromBufferAttribute(a,f),Hl(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new wt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function Hl(i,e,t){const n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)===!0||t.has(r)===!0?!1:(t.add(n),t.add(r),!0)}function Qi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(Wl(r))r.isRenderTargetTexture?(ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(Wl(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Vt(i){const e={};for(let t=0;t<i.length;t++){const n=Qi(i[t]);for(const r in n)e[r]=n[r]}return e}function Wl(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function cd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Eu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const Zo={clone:Qi,merge:Vt};var ud=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class dn extends tr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ud,this.fragmentShader=hd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qi(e.uniforms),this.uniformsGroups=cd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new Je().setHex(r.value);break;case"v2":this.uniforms[n].value=new fe().fromArray(r.value);break;case"v3":this.uniforms[n].value=new C().fromArray(r.value);break;case"v4":this.uniforms[n].value=new pt().fromArray(r.value);break;case"m3":this.uniforms[n].value=new He().fromArray(r.value);break;case"m4":this.uniforms[n].value=new lt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class fd extends dn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class dd extends tr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=go,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=Do,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class pd extends tr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Th,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class md extends tr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class gd extends Gi{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class Tu extends zt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const _a=new lt,Xl=new C,ql=new C;class vd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new fe(512,512),this.mapType=Zt,this.map=null,this.mapPass=null,this.matrix=new lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xo,this._frameExtents=new fe(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Xl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Xl),ql.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ql),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){_a.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(_a,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===Mr||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(_a)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ss=new C,as=new ji,gn=new C;class Au extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt,this.coordinateSystem=yn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ss,as,gn),gn.x===1&&gn.y===1&&gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ss,as,gn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ss,as,gn),gn.x===1&&gn.y===1&&gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ss,as,gn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Yn=new C,Yl=new fe,$l=new fe;class en extends Au{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=yr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(qi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return yr*2*Math.atan(Math.tan(qi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Yn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Yn.x,Yn.y).multiplyScalar(-e/Yn.z),Yn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yn.x,Yn.y).multiplyScalar(-e/Yn.z)}getViewSize(e,t){return this.getViewBounds(e,Yl,$l),t.subVectors($l,Yl)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(qi*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Ko extends Au{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class _d extends vd{constructor(){super(new Ko(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class xd extends Tu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.shadow=new _d}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class bd extends Tu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Sd extends Ft{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const zi=-90,Ii=1;class Md extends zt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new en(zi,Ii,e,t);r.layers=this.layers,this.add(r);const s=new en(zi,Ii,e,t);s.layers=this.layers,this.add(s);const a=new en(zi,Ii,e,t);a.layers=this.layers,this.add(a);const o=new en(zi,Ii,e,t);o.layers=this.layers,this.add(o);const l=new en(zi,Ii,e,t);l.layers=this.layers,this.add(l);const c=new en(zi,Ii,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===yn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Mr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class yd extends en{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class bo extends bf{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}const Zl=new lt;class wd{constructor(e,t,n=0,r=1/0){this.ray=new Wo(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Ho,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):je("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Zl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Zl),this}intersectObject(e,t=!0,n=[]){return So(e,this,n,t),n.sort(Kl),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)So(e[r],this,n,t);return n.sort(Kl),n}}function Kl(i,e){return i.distance-e.distance}function So(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)So(s[a],e,t,!0)}}class Ru{static{Ru.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}}const Jl=new C,os=new C,Ui=new C,Ni=new C,xa=new C,Ed=new C,Td=new C;class Ad{constructor(e=new C,t=new C){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Jl.subVectors(e,this.start),os.subVectors(this.end,this.start);const n=os.dot(os);if(n===0)return 0;let s=os.dot(Jl)/n;return t&&(s=We(s,0,1)),s}closestPointToPoint(e,t,n){const r=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(r).add(this.start)}distanceSqToLine3(e,t=Ed,n=Td){const r=10000000000000001e-32;let s,a;const o=this.start,l=e.start,c=this.end,u=e.end;Ui.subVectors(c,o),Ni.subVectors(u,l),xa.subVectors(o,l);const f=Ui.dot(Ui),h=Ni.dot(Ni),d=Ni.dot(xa);if(f<=r&&h<=r)return t.copy(o),n.copy(l),t.sub(n),t.dot(t);if(f<=r)s=0,a=d/h,a=We(a,0,1);else{const m=Ui.dot(xa);if(h<=r)a=0,s=We(-m/f,0,1);else{const x=Ui.dot(Ni),g=f*h-x*x;g!==0?s=We((x*d-m*h)/g,0,1):s=0,a=(x*s+d)/h,a<0?(a=0,s=We(-m/f,0,1)):a>1&&(a=1,s=We((x-m)/f,0,1))}}return t.copy(o).addScaledVector(Ui,s),n.copy(l).addScaledVector(Ni,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function Ql(i,e,t,n){const r=Rd(n);switch(t){case ru:return i*e;case au:return i*e/r.components*r.byteLength;case No:return i*e/r.components*r.byteLength;case vi:return i*e*2/r.components*r.byteLength;case ko:return i*e*2/r.components*r.byteLength;case su:return i*e*3/r.components*r.byteLength;case ln:return i*e*4/r.components*r.byteLength;case Fo:return i*e*4/r.components*r.byteLength;case gs:case vs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case _s:case xs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ba:case Ga:return Math.max(i,16)*Math.max(e,8)/4;case Oa:case Va:return Math.max(i,8)*Math.max(e,8)/2;case Ha:case Wa:case qa:case Ya:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Xa:case ys:case $a:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Za:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ka:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ja:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Qa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ja:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case eo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case to:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case no:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case io:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ro:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case so:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ao:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case oo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case lo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case co:case uo:case ho:return Math.ceil(i/4)*Math.ceil(e/4)*16;case fo:case po:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ws:case mo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Rd(i){switch(i){case Zt:case eu:return{byteLength:1,components:1};case br:case tu:case Tn:return{byteLength:2,components:1};case Io:case Uo:return{byteLength:2,components:4};case En:case zo:case Mn:return{byteLength:4,components:1};case nu:case iu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Lo}}));typeof window<"u"&&(window.__THREE__?ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Lo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Cu(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Cd(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){const u=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,u);else{f.sort((d,m)=>d.start-m.start);let h=0;for(let d=1;d<f.length;d++){const m=f[h],x=f[d];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++h,f[h]=x)}f.length=h+1;for(let d=0,m=f.length;d<m;d++){const x=f[d];i.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Pd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ld=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Dd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Id=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ud=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,kd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Fd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Od=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Gd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Hd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Wd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Xd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,qd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Yd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$d=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Kd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Jd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Qd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,jd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ep=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,tp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,np=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ip=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ap="gl_FragColor = linearToOutputTexel( gl_FragColor );",op=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,lp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,cp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,up=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,hp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,dp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,_p=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Mp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,yp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ep=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Tp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ap=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Rp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Cp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Pp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Lp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Dp=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,zp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ip=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Up=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Np=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Fp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Op=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Bp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Gp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Yp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$p=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Zp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Kp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,jp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,em=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,nm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,im=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,sm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,am=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,om=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,um=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,fm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,dm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,pm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,mm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,gm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,_m=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,bm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Sm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Mm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ym=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,wm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Em=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Tm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Cm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Pm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Lm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Um=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,km=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Fm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Om=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Vm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Hm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Wm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Xm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ym=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$m=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Zm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Km=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Jm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Qm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,tg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ng=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ig=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,sg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ag=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,og=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ye={alphahash_fragment:Pd,alphahash_pars_fragment:Ld,alphamap_fragment:Dd,alphamap_pars_fragment:zd,alphatest_fragment:Id,alphatest_pars_fragment:Ud,aomap_fragment:Nd,aomap_pars_fragment:kd,batching_pars_vertex:Fd,batching_vertex:Od,begin_vertex:Bd,beginnormal_vertex:Vd,bsdfs:Gd,iridescence_fragment:Hd,bumpmap_pars_fragment:Wd,clipping_planes_fragment:Xd,clipping_planes_pars_fragment:qd,clipping_planes_pars_vertex:Yd,clipping_planes_vertex:$d,color_fragment:Zd,color_pars_fragment:Kd,color_pars_vertex:Jd,color_vertex:Qd,common:jd,cube_uv_reflection_fragment:ep,defaultnormal_vertex:tp,displacementmap_pars_vertex:np,displacementmap_vertex:ip,emissivemap_fragment:rp,emissivemap_pars_fragment:sp,colorspace_fragment:ap,colorspace_pars_fragment:op,envmap_fragment:lp,envmap_common_pars_fragment:cp,envmap_pars_fragment:up,envmap_pars_vertex:hp,envmap_physical_pars_fragment:Mp,envmap_vertex:fp,fog_vertex:dp,fog_pars_vertex:pp,fog_fragment:mp,fog_pars_fragment:gp,gradientmap_pars_fragment:vp,lightmap_pars_fragment:_p,lights_lambert_fragment:xp,lights_lambert_pars_fragment:bp,lights_pars_begin:Sp,lights_toon_fragment:yp,lights_toon_pars_fragment:wp,lights_phong_fragment:Ep,lights_phong_pars_fragment:Tp,lights_physical_fragment:Ap,lights_physical_pars_fragment:Rp,lights_fragment_begin:Cp,lights_fragment_maps:Pp,lights_fragment_end:Lp,lightprobes_pars_fragment:Dp,logdepthbuf_fragment:zp,logdepthbuf_pars_fragment:Ip,logdepthbuf_pars_vertex:Up,logdepthbuf_vertex:Np,map_fragment:kp,map_pars_fragment:Fp,map_particle_fragment:Op,map_particle_pars_fragment:Bp,metalnessmap_fragment:Vp,metalnessmap_pars_fragment:Gp,morphinstance_vertex:Hp,morphcolor_vertex:Wp,morphnormal_vertex:Xp,morphtarget_pars_vertex:qp,morphtarget_vertex:Yp,normal_fragment_begin:$p,normal_fragment_maps:Zp,normal_pars_fragment:Kp,normal_pars_vertex:Jp,normal_vertex:Qp,normalmap_pars_fragment:jp,clearcoat_normal_fragment_begin:em,clearcoat_normal_fragment_maps:tm,clearcoat_pars_fragment:nm,iridescence_pars_fragment:im,opaque_fragment:rm,packing:sm,premultiplied_alpha_fragment:am,project_vertex:om,dithering_fragment:lm,dithering_pars_fragment:cm,roughnessmap_fragment:um,roughnessmap_pars_fragment:hm,shadowmap_pars_fragment:fm,shadowmap_pars_vertex:dm,shadowmap_vertex:pm,shadowmask_pars_fragment:mm,skinbase_vertex:gm,skinning_pars_vertex:vm,skinning_vertex:_m,skinnormal_vertex:xm,specularmap_fragment:bm,specularmap_pars_fragment:Sm,tonemapping_fragment:Mm,tonemapping_pars_fragment:ym,transmission_fragment:wm,transmission_pars_fragment:Em,uv_pars_fragment:Tm,uv_pars_vertex:Am,uv_vertex:Rm,worldpos_vertex:Cm,background_vert:Pm,background_frag:Lm,backgroundCube_vert:Dm,backgroundCube_frag:zm,cube_vert:Im,cube_frag:Um,depth_vert:Nm,depth_frag:km,distance_vert:Fm,distance_frag:Om,equirect_vert:Bm,equirect_frag:Vm,linedashed_vert:Gm,linedashed_frag:Hm,meshbasic_vert:Wm,meshbasic_frag:Xm,meshlambert_vert:qm,meshlambert_frag:Ym,meshmatcap_vert:$m,meshmatcap_frag:Zm,meshnormal_vert:Km,meshnormal_frag:Jm,meshphong_vert:Qm,meshphong_frag:jm,meshphysical_vert:eg,meshphysical_frag:tg,meshtoon_vert:ng,meshtoon_frag:ig,points_vert:rg,points_frag:sg,shadow_vert:ag,shadow_frag:og,sprite_vert:lg,sprite_frag:cg},he={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new C},probesMax:{value:new C},probesResolution:{value:new C}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Xt={basic:{uniforms:Vt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Ye.meshbasic_vert,fragmentShader:Ye.meshbasic_frag},lambert:{uniforms:Vt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Je(0)},envMapIntensity:{value:1}}]),vertexShader:Ye.meshlambert_vert,fragmentShader:Ye.meshlambert_frag},phong:{uniforms:Vt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphong_vert,fragmentShader:Ye.meshphong_frag},standard:{uniforms:Vt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag},toon:{uniforms:Vt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Je(0)}}]),vertexShader:Ye.meshtoon_vert,fragmentShader:Ye.meshtoon_frag},matcap:{uniforms:Vt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Ye.meshmatcap_vert,fragmentShader:Ye.meshmatcap_frag},points:{uniforms:Vt([he.points,he.fog]),vertexShader:Ye.points_vert,fragmentShader:Ye.points_frag},dashed:{uniforms:Vt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ye.linedashed_vert,fragmentShader:Ye.linedashed_frag},depth:{uniforms:Vt([he.common,he.displacementmap]),vertexShader:Ye.depth_vert,fragmentShader:Ye.depth_frag},normal:{uniforms:Vt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Ye.meshnormal_vert,fragmentShader:Ye.meshnormal_frag},sprite:{uniforms:Vt([he.sprite,he.fog]),vertexShader:Ye.sprite_vert,fragmentShader:Ye.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ye.background_vert,fragmentShader:Ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Ye.backgroundCube_vert,fragmentShader:Ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ye.cube_vert,fragmentShader:Ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ye.equirect_vert,fragmentShader:Ye.equirect_frag},distance:{uniforms:Vt([he.common,he.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ye.distance_vert,fragmentShader:Ye.distance_frag},shadow:{uniforms:Vt([he.lights,he.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:Ye.shadow_vert,fragmentShader:Ye.shadow_frag}};Xt.physical={uniforms:Vt([Xt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag};const ls={r:0,b:0,g:0},ug=new lt,Pu=new He;Pu.set(-1,0,0,0,1,0,0,0,1);function hg(i,e,t,n,r,s){const a=new Je(0);let o=r===!0?0:1,l,c,u=null,f=0,h=null;function d(T){let R=T.isScene===!0?T.background:null;if(R&&R.isTexture){const S=T.backgroundBlurriness>0;R=e.get(R,S)}return R}function m(T){let R=!1;const S=d(T);S===null?g(a,o):S&&S.isColor&&(g(S,1),R=!0);const y=i.xr.getEnvironmentBlendMode();y==="additive"?t.buffers.color.setClear(0,0,0,1,s):y==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||R)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(T,R){const S=d(R);S&&(S.isCubeTexture||S.mapping===Us)?(c===void 0&&(c=new fn(new _i(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:Qi(Xt.backgroundCube.uniforms),vertexShader:Xt.backgroundCube.vertexShader,fragmentShader:Xt.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,M,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(ug.makeRotationFromEuler(R.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Pu),c.material.toneMapped=Qe.getTransfer(S.colorSpace)!==ut,(u!==S||f!==S.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=S,f=S.version,h=i.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new fn(new Ns(2,2),new dn({name:"BackgroundMaterial",uniforms:Qi(Xt.background.uniforms),vertexShader:Xt.background.vertexShader,fragmentShader:Xt.background.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.toneMapped=Qe.getTransfer(S.colorSpace)!==ut,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||f!==S.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=S,f=S.version,h=i.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function g(T,R){T.getRGB(ls,Eu(i)),t.buffers.color.setClear(ls.r,ls.g,ls.b,R,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,R=1){a.set(T),o=R,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(T){o=T,g(a,o)},render:m,addToRenderList:x,dispose:p}}function fg(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null);let s=r,a=!1;function o(z,k,V,U,F){let K=!1;const H=f(z,U,V,k);s!==H&&(s=H,c(s.object)),K=d(z,U,V,F),K&&m(z,U,V,F),F!==null&&e.update(F,i.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,S(z,k,V,U),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return i.createVertexArray()}function c(z){return i.bindVertexArray(z)}function u(z){return i.deleteVertexArray(z)}function f(z,k,V,U){const F=U.wireframe===!0;let K=n[k.id];K===void 0&&(K={},n[k.id]=K);const H=z.isInstancedMesh===!0?z.id:0;let re=K[H];re===void 0&&(re={},K[H]=re);let q=re[V.id];q===void 0&&(q={},re[V.id]=q);let j=q[F];return j===void 0&&(j=h(l()),q[F]=j),j}function h(z){const k=[],V=[],U=[];for(let F=0;F<t;F++)k[F]=0,V[F]=0,U[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:V,attributeDivisors:U,object:z,attributes:{},index:null}}function d(z,k,V,U){const F=s.attributes,K=k.attributes;let H=0;const re=V.getAttributes();for(const q in re)if(re[q].location>=0){const ne=F[q];let Pe=K[q];if(Pe===void 0&&(q==="instanceMatrix"&&z.instanceMatrix&&(Pe=z.instanceMatrix),q==="instanceColor"&&z.instanceColor&&(Pe=z.instanceColor)),ne===void 0||ne.attribute!==Pe||Pe&&ne.data!==Pe.data)return!0;H++}return s.attributesNum!==H||s.index!==U}function m(z,k,V,U){const F={},K=k.attributes;let H=0;const re=V.getAttributes();for(const q in re)if(re[q].location>=0){let ne=K[q];ne===void 0&&(q==="instanceMatrix"&&z.instanceMatrix&&(ne=z.instanceMatrix),q==="instanceColor"&&z.instanceColor&&(ne=z.instanceColor));const Pe={};Pe.attribute=ne,ne&&ne.data&&(Pe.data=ne.data),F[q]=Pe,H++}s.attributes=F,s.attributesNum=H,s.index=U}function x(){const z=s.newAttributes;for(let k=0,V=z.length;k<V;k++)z[k]=0}function g(z){p(z,0)}function p(z,k){const V=s.newAttributes,U=s.enabledAttributes,F=s.attributeDivisors;V[z]=1,U[z]===0&&(i.enableVertexAttribArray(z),U[z]=1),F[z]!==k&&(i.vertexAttribDivisor(z,k),F[z]=k)}function T(){const z=s.newAttributes,k=s.enabledAttributes;for(let V=0,U=k.length;V<U;V++)k[V]!==z[V]&&(i.disableVertexAttribArray(V),k[V]=0)}function R(z,k,V,U,F,K,H){H===!0?i.vertexAttribIPointer(z,k,V,F,K):i.vertexAttribPointer(z,k,V,U,F,K)}function S(z,k,V,U){x();const F=U.attributes,K=V.getAttributes(),H=k.defaultAttributeValues;for(const re in K){const q=K[re];if(q.location>=0){let j=F[re];if(j===void 0&&(re==="instanceMatrix"&&z.instanceMatrix&&(j=z.instanceMatrix),re==="instanceColor"&&z.instanceColor&&(j=z.instanceColor)),j!==void 0){const ne=j.normalized,Pe=j.itemSize,Ee=e.get(j);if(Ee===void 0)continue;const it=Ee.buffer,$e=Ee.type,et=Ee.bytesPerElement,Z=$e===i.INT||$e===i.UNSIGNED_INT||j.gpuType===zo;if(j.isInterleavedBufferAttribute){const ee=j.data,_e=ee.stride,Fe=j.offset;if(ee.isInstancedInterleavedBuffer){for(let Me=0;Me<q.locationSize;Me++)p(q.location+Me,ee.meshPerAttribute);z.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Me=0;Me<q.locationSize;Me++)g(q.location+Me);i.bindBuffer(i.ARRAY_BUFFER,it);for(let Me=0;Me<q.locationSize;Me++)R(q.location+Me,Pe/q.locationSize,$e,ne,_e*et,(Fe+Pe/q.locationSize*Me)*et,Z)}else{if(j.isInstancedBufferAttribute){for(let ee=0;ee<q.locationSize;ee++)p(q.location+ee,j.meshPerAttribute);z.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ee=0;ee<q.locationSize;ee++)g(q.location+ee);i.bindBuffer(i.ARRAY_BUFFER,it);for(let ee=0;ee<q.locationSize;ee++)R(q.location+ee,Pe/q.locationSize,$e,ne,Pe*et,Pe/q.locationSize*ee*et,Z)}}else if(H!==void 0){const ne=H[re];if(ne!==void 0)switch(ne.length){case 2:i.vertexAttrib2fv(q.location,ne);break;case 3:i.vertexAttrib3fv(q.location,ne);break;case 4:i.vertexAttrib4fv(q.location,ne);break;default:i.vertexAttrib1fv(q.location,ne)}}}}T()}function y(){w();for(const z in n){const k=n[z];for(const V in k){const U=k[V];for(const F in U){const K=U[F];for(const H in K)u(K[H].object),delete K[H];delete U[F]}}delete n[z]}}function M(z){if(n[z.id]===void 0)return;const k=n[z.id];for(const V in k){const U=k[V];for(const F in U){const K=U[F];for(const H in K)u(K[H].object),delete K[H];delete U[F]}}delete n[z.id]}function A(z){for(const k in n){const V=n[k];for(const U in V){const F=V[U];if(F[z.id]===void 0)continue;const K=F[z.id];for(const H in K)u(K[H].object),delete K[H];delete F[z.id]}}}function _(z){for(const k in n){const V=n[k],U=z.isInstancedMesh===!0?z.id:0,F=V[U];if(F!==void 0){for(const K in F){const H=F[K];for(const re in H)u(H[re].object),delete H[re];delete F[K]}delete V[U],Object.keys(V).length===0&&delete n[k]}}}function w(){P(),a=!0,s!==r&&(s=r,c(s.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:w,resetDefaultState:P,dispose:y,releaseStatesOfGeometry:M,releaseStatesOfObject:_,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:g,disableUnusedAttributes:T}}function dg(i,e,t){let n;function r(l){n=l}function s(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let h=0;for(let d=0;d<u;d++)h+=c[d];t.update(h,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function pg(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==ln&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const _=A===Tn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Zt&&A!==Mn&&!_&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(ke("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),R=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=i.getParameter(i.MAX_SAMPLES),M=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:T,maxVaryings:R,maxFragmentUniforms:S,maxSamples:y,samples:M}}function mg(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new zn,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||n!==0||r;return r=h,n=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const m=f.clippingPlanes,x=f.clipIntersection,g=f.clipShadows,p=i.get(f);if(!r||m===null||m.length===0||s&&!g)s?u(null):c();else{const T=s?0:n,R=T*4;let S=p.clippingState||null;l.value=S,S=u(m,h,R,d);for(let y=0;y!==R;++y)S[y]=t[y];p.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,d,m){const x=f!==null?f.length:0;let g=null;if(x!==0){if(g=l.value,m!==!0||g===null){const p=d+x*4,T=h.matrixWorldInverse;o.getNormalMatrix(T),(g===null||g.length<p)&&(g=new Float32Array(p));for(let R=0,S=d;R!==x;++R,S+=4)a.copy(f[R]).applyMatrix4(T,o),a.normal.toArray(g,S),g[S+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}const Wi=4,gg=6,vg=20,_g=256,lr=new Ko,jl=new Je;let ba=null,Sa=0,Ma=0,ya=!1;const xg=new C,oi=new C;class ec{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=xg}=s;ba=this._renderer.getRenderTarget(),Sa=this._renderer.getActiveCubeFace(),Ma=this._renderer.getActiveMipmapLevel(),ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ic(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ba,Sa,Ma),this._renderer.xr.enabled=ya,e.scissorTest=!1,ki(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===gi||e.mapping===Ki?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ba=this._renderer.getRenderTarget(),Sa=this._renderer.getActiveCubeFace(),Ma=this._renderer.getActiveMipmapLevel(),ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:kt,minFilter:kt,generateMipmaps:!1,type:Tn,format:ln,colorSpace:Es,depthBuffer:!1},r=tc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tc(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=bg(s)),this._blurMaterial=Mg(s,e,t),this._ggxMaterial=Sg(s,e,t)}return r}_compileMaterial(e){const t=new fn(new Ft,e);this._renderer.compile(t,lr)}_sceneToCubeUV(e,t,n,r,s){const l=new en(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(jl),f.toneMapping=cn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new fn(new _i,new du({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let p=!1;const T=e.background;T?T.isColor&&(g.color.copy(T),e.background=null,p=!0):(g.color.copy(jl),p=!0);for(let R=0;R<6;R++){const S=R%3;S===0?(l.up.set(0,c[R],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[R],s.y,s.z)):S===1?(l.up.set(0,0,c[R]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[R],s.z)):(l.up.set(0,c[R],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[R]));const y=this._cubeSize;ki(r,S*y,R>2?y:0,y,y),f.setRenderTarget(r),p&&f.render(x,l),f.render(e,l)}f.toneMapping=d,f.autoClear=h,e.background=T}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===gi||e.mapping===Ki;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ic()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ki(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,lr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=c*1.25,d=f*h,{_lodMax:m}=this,x=this._sizeLods[n],g=3*x*(n>m-Wi?n-m+Wi:0),p=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=m-t,ki(s,g,p,3*x,2*x),r.setRenderTarget(s),r.render(o,lr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-n,ki(e,g,p,3*x,2*x),r.setRenderTarget(e),r.render(o,lr)}_blur(e,t,n,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-n;const u=this._sizeLods[r],f=3*u*(r>this._lodMax-Wi?r-this._lodMax+Wi:0),h=4*(this._cubeSize-u);ki(t,f,h,3*u,2*u),a.setRenderTarget(t),a.render(l,lr)}}function bg(i){const e=[],t=[];let n=i;const r=i-Wi+1+gg;for(let s=0;s<r;s++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,h=6,d=3,m=new Float32Array(d*h*f),x=new Float32Array(d*h*f);for(let p=0;p<f;p++){const T=p%3*2/3-1,R=p>2?0:-1,S=[T,R,0,T+2/3,R,0,T+2/3,R+1,0,T,R,0,T+2/3,R+1,0,T,R+1,0];m.set(S,d*h*p);for(let y=0;y<h;y++){const M=u[y*2]*2-1,A=u[y*2+1]*2-1;p===0?oi.set(1,A,M):p===1?oi.set(-M,1,-A):p===2?oi.set(-M,A,1):p===3?oi.set(-1,A,-M):p===4?oi.set(-M,-1,A):oi.set(M,A,-1),oi.toArray(x,(p*h+y)*d)}}const g=new Ft;g.setAttribute("position",new hn(m,d)),g.setAttribute("outputDirection",new hn(x,d)),t.push(new fn(g,null)),n>Wi&&n--}return{lodMeshes:t,sizeLods:e}}function tc(i,e,t){const n=new un(i,e,t);return n.texture.mapping=Us,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ki(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Sg(i,e,t){return new dn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:_g,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ks(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Mg(i,e,t){return new dn({name:"SphericalGaussianBlur",defines:{SAMPLES:vg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:ks(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function nc(){return new dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ks(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function ic(){return new dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ks(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function ks(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Lu extends un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new mu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new _i(5,5,5),s=new dn({name:"CubemapFromEquirect",uniforms:Qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qt,blending:Un});s.uniforms.tEquirect.value=t;const a=new fn(r,s),o=t.minFilter;return t.minFilter===ui&&(t.minFilter=kt),new Md(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function yg(i){let e=new WeakMap,t=new WeakMap,n=null;function r(h,d=!1){return h==null?null:d?a(h):s(h)}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===Hs||d===Ws)if(e.has(h)){const m=e.get(h).texture;return o(m,h.mapping)}else{const m=h.image;if(m&&m.height>0){const x=new Lu(m.height);return x.fromEquirectangularTexture(i,h),e.set(h,x),h.addEventListener("dispose",c),o(x.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const d=h.mapping,m=d===Hs||d===Ws,x=d===gi||d===Ki;if(m||x){let g=t.get(h);const p=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return n===null&&(n=new ec(i)),g=m?n.fromEquirectangular(h,g):n.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{const T=h.image;return m&&T&&T.height>0||x&&T&&l(T)?(n===null&&(n=new ec(i)),g=m?n.fromEquirectangular(h):n.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,d){return d===Hs?h.mapping=gi:d===Ws&&(h.mapping=Ki),h}function l(h){let d=0;const m=6;for(let x=0;x<m;x++)h[x]!==void 0&&d++;return d===m}function c(h){const d=h.target;d.removeEventListener("dispose",c);const m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function u(h){const d=h.target;d.removeEventListener("dispose",u);const m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:f}}function wg(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Xi("WebGLRenderer: "+n+" extension not supported."),r}}}function Eg(i,e,t,n){const r={},s=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const m in h.attributes)e.remove(h.attributes[m]);h.removeEventListener("dispose",a),delete r[h.id];const d=s.get(h);d&&(e.remove(d),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const d in h)e.update(h[d],i.ARRAY_BUFFER)}function c(f){const h=[],d=f.index,m=f.attributes.position;let x=0;if(m===void 0)return;if(d!==null){const T=d.array;x=d.version;for(let R=0,S=T.length;R<S;R+=3){const y=T[R+0],M=T[R+1],A=T[R+2];h.push(y,M,M,A,A,y)}}else{const T=m.array;x=m.version;for(let R=0,S=T.length/3-1;R<S;R+=3){const y=R+0,M=R+1,A=R+2;h.push(y,M,M,A,A,y)}}const g=new(m.count>=65535?fu:hu)(h,1);g.version=x;const p=s.get(f);p&&e.remove(p),s.set(f,g)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function Tg(i,e,t){let n;function r(f){n=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,h){i.drawElements(n,h,s,f*a),t.update(h,n,1)}function c(f,h,d){d!==0&&(i.drawElementsInstanced(n,h,s,f*a,d),t.update(h,n,d))}function u(f,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,f,0,d);let x=0;for(let g=0;g<d;g++)x+=h[g];t.update(x,n,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Ag(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:je("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Rg(i,e,t){const n=new WeakMap,r=new pt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==f){let P=function(){_.dispose(),n.delete(o),o.removeEventListener("dispose",P)};var d=P;h!==void 0&&h.texture.dispose();const m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],R=o.morphAttributes.color||[];let S=0;m===!0&&(S=1),x===!0&&(S=2),g===!0&&(S=3);let y=o.attributes.position.count*S,M=1;y>e.maxTextureSize&&(M=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const A=new Float32Array(y*M*4*f),_=new cu(A,y,M,f);_.type=Mn,_.needsUpdate=!0;const w=S*4;for(let z=0;z<f;z++){const k=p[z],V=T[z],U=R[z],F=y*M*4*z;for(let K=0;K<k.count;K++){const H=K*w;m===!0&&(r.fromBufferAttribute(k,K),A[F+H+0]=r.x,A[F+H+1]=r.y,A[F+H+2]=r.z,A[F+H+3]=0),x===!0&&(r.fromBufferAttribute(V,K),A[F+H+4]=r.x,A[F+H+5]=r.y,A[F+H+6]=r.z,A[F+H+7]=0),g===!0&&(r.fromBufferAttribute(U,K),A[F+H+8]=r.x,A[F+H+9]=r.y,A[F+H+10]=r.z,A[F+H+11]=U.itemSize===4?r.w:1)}}h={count:f,texture:_,size:new fe(y,M)},n.set(o,h),o.addEventListener("dispose",P)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const x=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function Cg(i,e,t,n,r){let s=new WeakMap;function a(c){const u=r.render.frame,f=c.geometry,h=e.get(c,f);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return h}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const Pg={[qc]:"LINEAR_TONE_MAPPING",[Yc]:"REINHARD_TONE_MAPPING",[$c]:"CINEON_TONE_MAPPING",[Zc]:"ACES_FILMIC_TONE_MAPPING",[Jc]:"AGX_TONE_MAPPING",[Qc]:"NEUTRAL_TONE_MAPPING",[Kc]:"CUSTOM_TONE_MAPPING"};function Lg(i,e,t,n,r,s){const a=new un(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new Ft;c.setAttribute("position",new wt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new wt([0,2,0,0,2,0],2));const u=new fd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new fn(c,u),h=new Ko(-1,1,1,-1,0,1);let d=null,m=null,x=!1,g,p=null,T=[],R=!1;this.setSize=function(S,y){a.setSize(S,y),o!==null&&o.setSize(S,y),l!==null&&l.setSize(S,y);for(let M=0;M<T.length;M++){const A=T[M];A.setSize&&A.setSize(S,y)}},this.setEffects=function(S){T=S,R=T.length>0&&T[0].isRenderPass===!0;const y=a.width,M=a.height;T.length>0&&o===null&&(o=new un(y,M,{type:Tn,depthBuffer:!1,stencilBuffer:!1}),l=new un(y,M,{type:Tn,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<T.length;A++){const _=T[A];_.setSize&&_.setSize(y,M)}},this.begin=function(S,y){if(x||S.toneMapping===cn&&T.length===0)return!1;if(p=y,y!==null){const M=y.width,A=y.height;(a.width!==M||a.height!==A)&&this.setSize(M,A)}return R===!1&&S.setRenderTarget(a),g=S.toneMapping,S.toneMapping=cn,!0},this.hasRenderPass=function(){return R},this.end=function(S,y){S.toneMapping=g,x=!0;let M=a,A=o;for(let _=0;_<T.length;_++){const w=T[_];w.enabled!==!1&&(w.render(S,A,M,y),w.needsSwap!==!1&&(M=A,A=A===o?l:o))}if(d!==S.outputColorSpace||m!==S.toneMapping){d=S.outputColorSpace,m=S.toneMapping,u.defines={},Qe.getTransfer(d)===ut&&(u.defines.SRGB_TRANSFER="");const _=Pg[m];_&&(u.defines[_]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=M.texture,S.setRenderTarget(p),S.render(f,h),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const Du=new Ht,Mo=new wr(1,1),zu=new cu,Iu=new lf,Uu=new mu,rc=[],sc=[],ac=new Float32Array(16),oc=new Float32Array(9),lc=new Float32Array(4);function nr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=rc[r];if(s===void 0&&(s=new Float32Array(r),rc[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Et(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Tt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Fs(i,e){let t=sc[e];t===void 0&&(t=new Int32Array(e),sc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Dg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function zg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2fv(this.addr,e),Tt(t,e)}}function Ig(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;i.uniform3fv(this.addr,e),Tt(t,e)}}function Ug(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4fv(this.addr,e),Tt(t,e)}}function Ng(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,n))return;lc.set(n),i.uniformMatrix2fv(this.addr,!1,lc),Tt(t,n)}}function kg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,n))return;oc.set(n),i.uniformMatrix3fv(this.addr,!1,oc),Tt(t,n)}}function Fg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,n))return;ac.set(n),i.uniformMatrix4fv(this.addr,!1,ac),Tt(t,n)}}function Og(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Bg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2iv(this.addr,e),Tt(t,e)}}function Vg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3iv(this.addr,e),Tt(t,e)}}function Gg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4iv(this.addr,e),Tt(t,e)}}function Hg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Wg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2uiv(this.addr,e),Tt(t,e)}}function Xg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3uiv(this.addr,e),Tt(t,e)}}function qg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4uiv(this.addr,e),Tt(t,e)}}function Yg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Mo.compareFunction=t.isReversedDepthBuffer()?Bo:Oo,s=Mo):s=Du,t.setTexture2D(e||s,r)}function $g(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Iu,r)}function Zg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Uu,r)}function Kg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||zu,r)}function Jg(i){switch(i){case 5126:return Dg;case 35664:return zg;case 35665:return Ig;case 35666:return Ug;case 35674:return Ng;case 35675:return kg;case 35676:return Fg;case 5124:case 35670:return Og;case 35667:case 35671:return Bg;case 35668:case 35672:return Vg;case 35669:case 35673:return Gg;case 5125:return Hg;case 36294:return Wg;case 36295:return Xg;case 36296:return qg;case 35678:case 36198:case 36298:case 36306:case 35682:return Yg;case 35679:case 36299:case 36307:return $g;case 35680:case 36300:case 36308:case 36293:return Zg;case 36289:case 36303:case 36311:case 36292:return Kg}}function Qg(i,e){i.uniform1fv(this.addr,e)}function jg(i,e){const t=nr(e,this.size,2);i.uniform2fv(this.addr,t)}function e0(i,e){const t=nr(e,this.size,3);i.uniform3fv(this.addr,t)}function t0(i,e){const t=nr(e,this.size,4);i.uniform4fv(this.addr,t)}function n0(i,e){const t=nr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function i0(i,e){const t=nr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function r0(i,e){const t=nr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function s0(i,e){i.uniform1iv(this.addr,e)}function a0(i,e){i.uniform2iv(this.addr,e)}function o0(i,e){i.uniform3iv(this.addr,e)}function l0(i,e){i.uniform4iv(this.addr,e)}function c0(i,e){i.uniform1uiv(this.addr,e)}function u0(i,e){i.uniform2uiv(this.addr,e)}function h0(i,e){i.uniform3uiv(this.addr,e)}function f0(i,e){i.uniform4uiv(this.addr,e)}function d0(i,e,t){const n=this.cache,r=e.length,s=Fs(t,r);Et(n,s)||(i.uniform1iv(this.addr,s),Tt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=Mo:a=Du;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function p0(i,e,t){const n=this.cache,r=e.length,s=Fs(t,r);Et(n,s)||(i.uniform1iv(this.addr,s),Tt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Iu,s[a])}function m0(i,e,t){const n=this.cache,r=e.length,s=Fs(t,r);Et(n,s)||(i.uniform1iv(this.addr,s),Tt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Uu,s[a])}function g0(i,e,t){const n=this.cache,r=e.length,s=Fs(t,r);Et(n,s)||(i.uniform1iv(this.addr,s),Tt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||zu,s[a])}function v0(i){switch(i){case 5126:return Qg;case 35664:return jg;case 35665:return e0;case 35666:return t0;case 35674:return n0;case 35675:return i0;case 35676:return r0;case 5124:case 35670:return s0;case 35667:case 35671:return a0;case 35668:case 35672:return o0;case 35669:case 35673:return l0;case 5125:return c0;case 36294:return u0;case 36295:return h0;case 36296:return f0;case 35678:case 36198:case 36298:case 36306:case 35682:return d0;case 35679:case 36299:case 36307:return p0;case 35680:case 36300:case 36308:case 36293:return m0;case 36289:case 36303:case 36311:case 36292:return g0}}class _0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Jg(t.type)}}class x0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=v0(t.type)}}class b0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const wa=/(\w+)(\])?(\[|\.)?/g;function cc(i,e){i.seq.push(e),i.map[e.id]=e}function S0(i,e,t){const n=i.name,r=n.length;for(wa.lastIndex=0;;){const s=wa.exec(n),a=wa.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){cc(t,c===void 0?new _0(o,i,e):new x0(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new b0(o),cc(t,f)),t=f}}}class bs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);S0(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function uc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const M0=37297;let y0=0;function w0(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const hc=new He;function E0(i){Qe._getMatrix(hc,Qe.workingColorSpace,i);const e=`mat3( ${hc.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(i)){case Ts:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return ke("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function fc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+w0(i.getShaderSource(e),o)}else return s}function T0(i,e){const t=E0(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const A0={[qc]:"Linear",[Yc]:"Reinhard",[$c]:"Cineon",[Zc]:"ACESFilmic",[Jc]:"AgX",[Qc]:"Neutral",[Kc]:"Custom"};function R0(i,e){const t=A0[e];return t===void 0?(ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const cs=new C;function C0(){Qe.getLuminanceCoefficients(cs);const i=cs.x.toFixed(4),e=cs.y.toFixed(4),t=cs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function P0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fr).join(`
`)}function L0(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function D0(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function fr(i){return i!==""}function dc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function pc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const z0=/^[ \t]*#include +<([\w\d./]+)>/gm;function yo(i){return i.replace(z0,U0)}const I0=new Map;function U0(i,e){let t=Ye[e];if(t===void 0){const n=I0.get(e);if(n!==void 0)t=Ye[n],ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return yo(t)}const N0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mc(i){return i.replace(N0,k0)}function k0(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function gc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const F0={[ms]:"SHADOWMAP_TYPE_PCF",[ur]:"SHADOWMAP_TYPE_VSM"};function O0(i){return F0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const B0={[gi]:"ENVMAP_TYPE_CUBE",[Ki]:"ENVMAP_TYPE_CUBE",[Us]:"ENVMAP_TYPE_CUBE_UV"};function V0(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":B0[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const G0={[Ki]:"ENVMAP_MODE_REFRACTION"};function H0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":G0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const W0={[Do]:"ENVMAP_BLENDING_MULTIPLY",[yh]:"ENVMAP_BLENDING_MIX",[wh]:"ENVMAP_BLENDING_ADD"};function X0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":W0[i.combine]||"ENVMAP_BLENDING_NONE"}function q0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Y0(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=O0(t),c=V0(t),u=H0(t),f=X0(t),h=q0(t),d=P0(t),m=L0(s),x=r.createProgram();let g,p,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(fr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(fr).join(`
`),p.length>0&&(p+=`
`)):(g=[gc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fr).join(`
`),p=[gc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==cn?"#define TONE_MAPPING":"",t.toneMapping!==cn?Ye.tonemapping_pars_fragment:"",t.toneMapping!==cn?R0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ye.colorspace_pars_fragment,T0("linearToOutputTexel",t.outputColorSpace),C0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fr).join(`
`)),a=yo(a),a=dc(a,t),a=pc(a,t),o=yo(o),o=dc(o,t),o=pc(o,t),a=mc(a),o=mc(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===gl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===gl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const R=T+g+a,S=T+p+o,y=uc(r,r.VERTEX_SHADER,R),M=uc(r,r.FRAGMENT_SHADER,S);r.attachShader(x,y),r.attachShader(x,M),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function A(z){if(i.debug.checkShaderErrors){const k=r.getProgramInfoLog(x)||"",V=r.getShaderInfoLog(y)||"",U=r.getShaderInfoLog(M)||"",F=k.trim(),K=V.trim(),H=U.trim();let re=!0,q=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(re=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,x,y,M);else{const j=fc(r,y,"vertex"),ne=fc(r,M,"fragment");je("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+z.name+`
Material Type: `+z.type+`

Program Info Log: `+F+`
`+j+`
`+ne)}else F!==""?ke("WebGLProgram: Program Info Log:",F):(K===""||H==="")&&(q=!1);q&&(z.diagnostics={runnable:re,programLog:F,vertexShader:{log:K,prefix:g},fragmentShader:{log:H,prefix:p}})}r.deleteShader(y),r.deleteShader(M),_=new bs(r,x),w=D0(r,x)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(x,M0)),P},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=y0++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=y,this.fragmentShader=M,this}let $0=0;class Z0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new K0(e),t.set(e,n)),n}}class K0{constructor(e){this.id=$0++,this.code=e,this.usedTimes=0}}function J0(i){return i===vi||i===ys||i===ws}function Q0(i,e,t,n,r,s){const a=new Ho,o=new Z0,l=new Set,c=[],u=new Map,f=n.logarithmicDepthBuffer;let h=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return l.add(_),_===0?"uv":`uv${_}`}function x(_,w,P,z,k,V){const U=z.fog,F=k.geometry,K=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?z.environment:null,H=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,re=e.get(_.envMap||K,H),q=re&&re.mapping===Us?re.image.height:null,j=d[_.type];_.precision!==null&&(h=n.getMaxPrecision(_.precision),h!==_.precision&&ke("WebGLProgram.getParameters:",_.precision,"not supported, using",h,"instead."));const ne=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Pe=ne!==void 0?ne.length:0;let Ee=0;F.morphAttributes.position!==void 0&&(Ee=1),F.morphAttributes.normal!==void 0&&(Ee=2),F.morphAttributes.color!==void 0&&(Ee=3);let it,$e,et,Z;if(j){const gt=Xt[j];it=gt.vertexShader,$e=gt.fragmentShader}else{it=_.vertexShader,$e=_.fragmentShader;const gt=o.getVertexShaderStage(_),at=o.getFragmentShaderStage(_);o.update(_,gt,at),et=gt.id,Z=at.id}const ee=i.getRenderTarget(),_e=i.state.buffers.depth.getReversed(),Fe=k.isInstancedMesh===!0,Me=k.isBatchedMesh===!0,Oe=!!_.map,ct=!!_.matcap,te=!!re,se=!!_.aoMap,ae=!!_.lightMap,oe=!!_.bumpMap&&_.wireframe===!1,ue=!!_.normalMap,Ue=!!_.displacementMap,Ie=!!_.emissiveMap,Be=!!_.metalnessMap,Ge=!!_.roughnessMap,L=_.anisotropy>0,st=_.clearcoat>0,Ze=_.dispersion>0,E=_.retroreflectivity>0,v=_.iridescence>0,N=_.sheen>0,G=_.transmission>0,Y=L&&!!_.anisotropyMap,le=st&&!!_.clearcoatMap,ce=st&&!!_.clearcoatNormalMap,$=st&&!!_.clearcoatRoughnessMap,Q=v&&!!_.iridescenceMap,de=v&&!!_.iridescenceThicknessMap,Le=N&&!!_.sheenColorMap,ve=N&&!!_.sheenRoughnessMap,pe=!!_.specularMap,De=!!_.specularColorMap,Ne=!!_.specularIntensityMap,Xe=G&&!!_.transmissionMap,I=G&&!!_.thicknessMap,me=!!_.gradientMap,J=!!_.alphaMap,ge=_.alphaTest>0,Se=!!_.alphaHash,ie=!!_.extensions;let ze=cn;_.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(ze=i.toneMapping);const Re={shaderID:j,shaderType:_.type,shaderName:_.name,vertexShader:it,fragmentShader:$e,defines:_.defines,customVertexShaderID:et,customFragmentShaderID:Z,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:h,batching:Me,batchingColor:Me&&k._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&k.instanceColor!==null,instancingMorph:Fe&&k.morphTexture!==null,outputColorSpace:ee===null?i.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Qe.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Oe,matcap:ct,envMap:te,envMapMode:te&&re.mapping,envMapCubeUVHeight:q,aoMap:se,lightMap:ae,bumpMap:oe,normalMap:ue,displacementMap:Ue,emissiveMap:Ie,normalMapObjectSpace:ue&&_.normalMapType===Ah,normalMapTangentSpace:ue&&_.normalMapType===go,packedNormalMap:ue&&_.normalMapType===go&&J0(_.normalMap.format),metalnessMap:Be,roughnessMap:Ge,anisotropy:L,anisotropyMap:Y,clearcoat:st,clearcoatMap:le,clearcoatNormalMap:ce,clearcoatRoughnessMap:$,dispersion:Ze,retroreflection:E,iridescence:v,iridescenceMap:Q,iridescenceThicknessMap:de,sheen:N,sheenColorMap:Le,sheenRoughnessMap:ve,specularMap:pe,specularColorMap:De,specularIntensityMap:Ne,transmission:G,transmissionMap:Xe,thicknessMap:I,gradientMap:me,opaque:_.transparent===!1&&_.blending===dr&&_.alphaToCoverage===!1,alphaMap:J,alphaTest:ge,alphaHash:Se,combine:_.combine,mapUv:Oe&&m(_.map.channel),aoMapUv:se&&m(_.aoMap.channel),lightMapUv:ae&&m(_.lightMap.channel),bumpMapUv:oe&&m(_.bumpMap.channel),normalMapUv:ue&&m(_.normalMap.channel),displacementMapUv:Ue&&m(_.displacementMap.channel),emissiveMapUv:Ie&&m(_.emissiveMap.channel),metalnessMapUv:Be&&m(_.metalnessMap.channel),roughnessMapUv:Ge&&m(_.roughnessMap.channel),anisotropyMapUv:Y&&m(_.anisotropyMap.channel),clearcoatMapUv:le&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:ce&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:de&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:ve&&m(_.sheenRoughnessMap.channel),specularMapUv:pe&&m(_.specularMap.channel),specularColorMapUv:De&&m(_.specularColorMap.channel),specularIntensityMapUv:Ne&&m(_.specularIntensityMap.channel),transmissionMapUv:Xe&&m(_.transmissionMap.channel),thicknessMapUv:I&&m(_.thicknessMap.channel),alphaMapUv:J&&m(_.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(ue||L),vertexNormals:!!F.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!F.attributes.uv&&(Oe||J),fog:!!U,useFog:_.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||F.attributes.normal===void 0&&ue===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:_e,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:Pe,morphTextureStride:Ee,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:ze,decodeVideoTexture:Oe&&_.map.isVideoTexture===!0&&Qe.getTransfer(_.map.colorSpace)===ut,decodeVideoTextureEmissive:Ie&&_.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(_.emissiveMap.colorSpace)===ut,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===bn,flipSided:_.side===qt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ie&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ie&&_.extensions.multiDraw===!0||Me)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Re.vertexUv1s=l.has(1),Re.vertexUv2s=l.has(2),Re.vertexUv3s=l.has(3),l.clear(),Re}function g(_){const w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(const P in _.defines)w.push(P),w.push(_.defines[P]);return _.isRawShaderMaterial===!1&&(p(w,_),T(w,_),w.push(i.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function p(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numSunLights),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numSunLightShadows),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function T(_,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function R(_){const w=d[_.type];let P;if(w){const z=Xt[w];P=Zo.clone(z.uniforms)}else P=_.uniforms;return P}function S(_,w){let P=u.get(w);return P!==void 0?++P.usedTimes:(P=new Y0(i,w,_,r),c.push(P),u.set(w,P)),P}function y(_){if(--_.usedTimes===0){const w=c.indexOf(_);c[w]=c[c.length-1],c.pop(),u.delete(_.cacheKey),_.destroy()}}function M(_){o.remove(_)}function A(){o.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:R,acquireProgram:S,releaseProgram:y,releaseShaderCache:M,programs:c,dispose:A}}function j0(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function ev(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function vc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function _c(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function o(h,d,m,x,g,p){let T=i[e];return T===void 0?(T={id:h.id,object:h,geometry:d,material:m,materialVariant:a(h),groupOrder:x,renderOrder:h.renderOrder,z:g,group:p},i[e]=T):(T.id=h.id,T.object=h,T.geometry=d,T.material=m,T.materialVariant=a(h),T.groupOrder=x,T.renderOrder=h.renderOrder,T.z=g,T.group=p),e++,T}function l(h,d,m,x,g,p,T){T.reversedDepth===!0&&(g=-g);const R=o(h,d,m,x,g,p);m.transmission>0?n.push(R):m.transparent===!0?r.push(R):t.push(R)}function c(h,d,m,x,g,p){const T=o(h,d,m,x,g,p);m.transmission>0?n.unshift(T):m.transparent===!0?r.unshift(T):t.unshift(T)}function u(h,d){t.length>1&&t.sort(h||ev),n.length>1&&n.sort(d||vc),r.length>1&&r.sort(d||vc)}function f(){for(let h=e,d=i.length;h<d;h++){const m=i[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:f,sort:u}}function tv(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new _c,i.set(n,[a])):r>=s.length?(a=new _c,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function nv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new C,color:new Je};break;case"SpotLight":t={position:new C,direction:new C,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function iv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let rv=0;function sv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function av(i){const e=new nv,t=iv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);const r=new C,s=new lt,a=new lt;function o(c){let u=0,f=0,h=0;for(let k=0;k<9;k++)n.probe[k].set(0,0,0);let d=0,m=0,x=0,g=0,p=0,T=0,R=0,S=0,y=0,M=0,A=0,_=0,w=0,P=0;c.sort(sv);for(let k=0,V=c.length;k<V;k++){const U=c[k],F=U.color,K=U.intensity,H=U.distance;let re=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===vi?re=U.shadow.map.texture:re=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)u+=F.r*K,f+=F.g*K,h+=F.b*K;else if(U.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(U.sh.coefficients[q],K);P++}else if(U.isSunLight){const q=e.get(U);if(q.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const j=U.shadow,ne=t.get(U);ne.shadowIntensity=j.intensity,ne.shadowBias=j.bias,ne.shadowNormalBias=j.normalBias,ne.shadowRadius=j.radius,ne.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[m]=ne,n.sunShadowMap[m]=re;const Pe=j.getViewportCount();for(let Ee=0;Ee<Pe;Ee++)n.sunShadowMatrix[x+Ee]=j.getMatrix(Ee),n.sunShadowCascade[x+Ee]=j._cascadeData[Ee];x+=Pe,m++}n.sun[d]=q,d++}else if(U.isDirectionalLight){const q=e.get(U);if(q.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const j=U.shadow,ne=t.get(U);ne.shadowIntensity=j.intensity,ne.shadowBias=j.bias,ne.shadowNormalBias=j.normalBias,ne.shadowRadius=j.radius,ne.shadowMapSize=j.mapSize,n.directionalShadow[g]=ne,n.directionalShadowMap[g]=re,n.directionalShadowMatrix[g]=U.shadow.matrix,y++}n.directional[g]=q,g++}else if(U.isSpotLight){const q=e.get(U);q.position.setFromMatrixPosition(U.matrixWorld),q.color.copy(F).multiplyScalar(K),q.distance=H,q.coneCos=Math.cos(U.angle),q.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),q.decay=U.decay,n.spot[T]=q;const j=U.shadow;if(U.map&&(n.spotLightMap[_]=U.map,_++,j.updateMatrices(U),U.castShadow&&w++),n.spotLightMatrix[T]=j.matrix,U.castShadow){const ne=t.get(U);ne.shadowIntensity=j.intensity,ne.shadowBias=j.bias,ne.shadowNormalBias=j.normalBias,ne.shadowRadius=j.radius,ne.shadowMapSize=j.mapSize,n.spotShadow[T]=ne,n.spotShadowMap[T]=re,A++}T++}else if(U.isRectAreaLight){const q=e.get(U);q.color.copy(F).multiplyScalar(K),q.halfWidth.set(U.width*.5,0,0),q.halfHeight.set(0,U.height*.5,0),n.rectArea[R]=q,R++}else if(U.isPointLight){const q=e.get(U);if(q.color.copy(U.color).multiplyScalar(U.intensity),q.distance=U.distance,q.decay=U.decay,U.castShadow){const j=U.shadow,ne=t.get(U);ne.shadowIntensity=j.intensity,ne.shadowBias=j.bias,ne.shadowNormalBias=j.normalBias,ne.shadowRadius=j.radius,ne.shadowMapSize=j.mapSize,ne.shadowCameraNear=j.camera.near,ne.shadowCameraFar=j.camera.far,n.pointShadow[p]=ne,n.pointShadowMap[p]=re,n.pointShadowMatrix[p]=U.shadow.matrix,M++}n.point[p]=q,p++}else if(U.isHemisphereLight){const q=e.get(U);q.skyColor.copy(U.color).multiplyScalar(K),q.groundColor.copy(U.groundColor).multiplyScalar(K),n.hemi[S]=q,S++}}R>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=he.LTC_FLOAT_1,n.rectAreaLTC2=he.LTC_FLOAT_2):(n.rectAreaLTC1=he.LTC_HALF_1,n.rectAreaLTC2=he.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;const z=n.hash;(z.sunLength!==d||z.directionalLength!==g||z.pointLength!==p||z.spotLength!==T||z.rectAreaLength!==R||z.hemiLength!==S||z.numSunShadows!==m||z.numDirectionalShadows!==y||z.numPointShadows!==M||z.numSpotShadows!==A||z.numSpotMaps!==_||z.numLightProbes!==P)&&(n.sun.length=d,n.directional.length=g,n.spot.length=T,n.rectArea.length=R,n.point.length=p,n.hemi.length=S,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.directionalShadowMatrix.length=y,n.pointShadow.length=M,n.pointShadowMap.length=M,n.pointShadowMatrix.length=M,n.spotShadow.length=A,n.spotShadowMap.length=A,n.spotLightMatrix.length=A+_-w,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=P,z.sunLength=d,z.directionalLength=g,z.pointLength=p,z.spotLength=T,z.rectAreaLength=R,z.hemiLength=S,z.numSunShadows=m,z.numDirectionalShadows=y,z.numPointShadows=M,z.numSpotShadows=A,z.numSpotMaps=_,z.numLightProbes=P,n.version=rv++)}function l(c,u){let f=0,h=0,d=0,m=0,x=0,g=0;const p=u.matrixWorldInverse;for(let T=0,R=c.length;T<R;T++){const S=c[T];if(S.isSunLight){const y=n.sun[f];y.direction.setFromMatrixPosition(S.matrixWorld),y.direction.transformDirection(p),f++}else if(S.isDirectionalLight){const y=n.directional[h];y.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(p),h++}else if(S.isSpotLight){const y=n.spot[m];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(p),m++}else if(S.isRectAreaLight){const y=n.rectArea[x];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(p),a.identity(),s.copy(S.matrixWorld),s.premultiply(p),a.extractRotation(s),y.halfWidth.set(S.width*.5,0,0),y.halfHeight.set(0,S.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),x++}else if(S.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(p),d++}else if(S.isHemisphereLight){const y=n.hemi[g];y.direction.setFromMatrixPosition(S.matrixWorld),y.direction.transformDirection(p),g++}}}return{setup:o,setupView:l,state:n}}function xc(i){const e=new av(i),t=[],n=[],r=[];function s(h){f.camera=h,t.length=0,n.length=0,r.length=0}function a(h){t.push(h)}function o(h){n.push(h)}function l(h){r.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function ov(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new xc(i),e.set(r,[o])):s>=a.length?(o=new xc(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const lv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,cv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,uv=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],hv=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],bc=new lt,cr=new C,Ea=new C;function fv(i,e,t){let n=new Xo;const r=new fe,s=new fe,a=new pt,o=new pd,l=new md,c={},u=t.maxTextureSize,f={[jn]:qt,[qt]:jn,[bn]:bn},h=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new fe},radius:{value:4}},vertexShader:lv,fragmentShader:cv}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const m=new Ft;m.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new fn(m,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ms;let p=this.type;this.render=function(M,A,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||M.length===0)return;this.type===rh&&(ke("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ms);const w=i.getRenderTarget(),P=i.getActiveCubeFace(),z=i.getActiveMipmapLevel(),k=i.state;k.setBlending(Un),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const V=p!==this.type;V&&A.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(F=>F.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,F=M.length;U<F;U++){const K=M[U],H=K.shadow;if(H===void 0){ke("WebGLShadowMap:",K,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const re=H.getFrameExtents();r.multiply(re),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/re.x),r.x=s.x*re.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/re.y),r.y=s.y*re.y,H.mapSize.y=s.y));const q=i.state.buffers.depth.getReversed();if(H.camera._reversedDepth=q,H.map===null||V===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===ur){if(K.isPointLight){ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new un(r.x,r.y,{format:vi,type:Tn,minFilter:kt,magFilter:kt,generateMipmaps:!1}),H.map.texture.name=K.name+".shadowMap",H.map.depthTexture=new wr(r.x,r.y,Mn),H.map.depthTexture.name=K.name+".shadowMapDepth",H.map.depthTexture.format=Fn,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Lt,H.map.depthTexture.magFilter=Lt}else K.isPointLight?(H.map=new Lu(r.x),H.map.depthTexture=new Af(r.x,En)):(H.map=new un(r.x,r.y),H.map.depthTexture=new wr(r.x,r.y,En)),H.map.depthTexture.name=K.name+".shadowMap",H.map.depthTexture.format=Fn,this.type===ms?(H.map.depthTexture.compareFunction=q?Bo:Oo,H.map.depthTexture.minFilter=kt,H.map.depthTexture.magFilter=kt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Lt,H.map.depthTexture.magFilter=Lt);H.camera.updateProjectionMatrix()}H.map.isWebGLCubeRenderTarget!==!0&&(H.map.width!==r.x||H.map.height!==r.y)&&H.map.setSize(r.x,r.y);const j=H.map.isWebGLCubeRenderTarget?6:H.getViewportCount();K.isPointLight!==!0&&H.updateMatrices(K,_);for(let ne=0;ne<j;ne++){const Pe=H.getCamera(ne);if(K.isPointLight){const Ee=H.camera,it=H.matrix,$e=K.distance||Ee.far;$e!==Ee.far&&(Ee.far=$e,Ee.updateProjectionMatrix()),cr.setFromMatrixPosition(K.matrixWorld),Ee.position.copy(cr),Ea.copy(Ee.position),Ea.add(uv[ne]),Ee.up.copy(hv[ne]),Ee.lookAt(Ea),Ee.updateMatrixWorld(),it.makeTranslation(-cr.x,-cr.y,-cr.z),bc.multiplyMatrices(Ee.projectionMatrix,Ee.matrixWorldInverse),H._frustum.setFromProjectionMatrix(bc,Ee.coordinateSystem,Ee.reversedDepth)}if(H.map.isWebGLCubeRenderTarget)i.setRenderTarget(H.map,ne),i.clear();else{ne===0&&(i.setRenderTarget(H.map),i.clear());const Ee=H.getViewport(ne);a.set(s.x*Ee.x,s.y*Ee.y,s.x*Ee.z,s.y*Ee.w),k.viewport(a)}n=H.getFrustum(ne),S(A,_,Pe,K,this.type)}H.isPointLightShadow!==!0&&this.type===ur&&T(H,_),H.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(w,P,z)};function T(M,A){const _=e.update(x);h.defines.VSM_SAMPLES!==M.blurSamples&&(h.defines.VSM_SAMPLES=M.blurSamples,d.defines.VSM_SAMPLES=M.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),M.mapPass===null?M.mapPass=new un(r.x,r.y,{format:vi,type:Tn}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),h.uniforms.shadow_pass.value=M.map.depthTexture,h.uniforms.resolution.value.set(M.map.width,M.map.height),h.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(A,null,_,h,x,null),d.uniforms.shadow_pass.value=M.mapPass.texture,d.uniforms.resolution.value.set(M.map.width,M.map.height),d.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(A,null,_,d,x,null)}function R(M,A,_,w){let P=null;const z=_.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(z!==void 0)P=z;else if(P=_.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const k=P.uuid,V=A.uuid;let U=c[k];U===void 0&&(U={},c[k]=U);let F=U[V];F===void 0&&(F=P.clone(),U[V]=F,A.addEventListener("dispose",y)),P=F}if(P.visible=A.visible,P.wireframe=A.wireframe,w===ur?P.side=A.shadowSide!==null?A.shadowSide:A.side:P.side=A.shadowSide!==null?A.shadowSide:f[A.side],P.alphaMap=A.alphaMap,P.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,P.map=A.map,P.clipShadows=A.clipShadows,P.clippingPlanes=A.clippingPlanes,P.clipIntersection=A.clipIntersection,P.displacementMap=A.displacementMap,P.displacementScale=A.displacementScale,P.displacementBias=A.displacementBias,P.wireframeLinewidth=A.wireframeLinewidth,P.linewidth=A.linewidth,_.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const k=i.properties.get(P);k.light=_}return P}function S(M,A,_,w,P){if(M.visible===!1)return;if(M.layers.test(A.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&P===ur)&&(!M.frustumCulled||M.intersectsFrustum(n))){M.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,M.matrixWorld);const V=e.update(M),U=M.material;if(Array.isArray(U)){const F=V.groups;for(let K=0,H=F.length;K<H;K++){const re=F[K],q=U[re.materialIndex];if(q&&q.visible){const j=R(M,q,w,P);M.onBeforeShadow(i,M,A,_,V,j,re),i.renderBufferDirect(_,null,V,j,M,re),M.onAfterShadow(i,M,A,_,V,j,re)}}}else if(U.visible){const F=R(M,U,w,P);M.onBeforeShadow(i,M,A,_,V,F,null),i.renderBufferDirect(_,null,V,F,M,null),M.onAfterShadow(i,M,A,_,V,F,null)}}const k=M.children;for(let V=0,U=k.length;V<U;V++)S(k[V],A,_,w,P)}function y(M){M.target.removeEventListener("dispose",y);for(const _ in c){const w=c[_],P=M.target.uuid;P in w&&(w[P].dispose(),delete w[P])}}}function dv(i,e){function t(){let I=!1;const me=new pt;let J=null;const ge=new pt(0,0,0,0);return{setMask:function(Se){J!==Se&&!I&&(i.colorMask(Se,Se,Se,Se),J=Se)},setLocked:function(Se){I=Se},setClear:function(Se,ie,ze,Re,gt){gt===!0&&(Se*=Re,ie*=Re,ze*=Re),me.set(Se,ie,ze,Re),ge.equals(me)===!1&&(i.clearColor(Se,ie,ze,Re),ge.copy(me))},reset:function(){I=!1,J=null,ge.set(-1,0,0,0)}}}function n(){let I=!1,me=!1,J=null,ge=null,Se=null;return{setReversed:function(ie){if(me!==ie){const ze=e.get("EXT_clip_control");ie?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT),me=ie;const Re=Se;Se=null,this.setClear(Re)}},getReversed:function(){return me},setTest:function(ie){ie?ee(i.DEPTH_TEST):_e(i.DEPTH_TEST)},setMask:function(ie){J!==ie&&!I&&(i.depthMask(ie),J=ie)},setFunc:function(ie){if(me&&(ie=Fh[ie]),ge!==ie){switch(ie){case La:i.depthFunc(i.NEVER);break;case Da:i.depthFunc(i.ALWAYS);break;case za:i.depthFunc(i.LESS);break;case xr:i.depthFunc(i.LEQUAL);break;case Ia:i.depthFunc(i.EQUAL);break;case Ua:i.depthFunc(i.GEQUAL);break;case Ms:i.depthFunc(i.GREATER);break;case Na:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ge=ie}},setLocked:function(ie){I=ie},setClear:function(ie){Se!==ie&&(Se=ie,me&&(ie=1-ie),i.clearDepth(ie))},reset:function(){I=!1,J=null,ge=null,Se=null,me=!1}}}function r(){let I=!1,me=null,J=null,ge=null,Se=null,ie=null,ze=null,Re=null,gt=null;return{setTest:function(at){I||(at?ee(i.STENCIL_TEST):_e(i.STENCIL_TEST))},setMask:function(at){me!==at&&!I&&(i.stencilMask(at),me=at)},setFunc:function(at,nn,pn){(J!==at||ge!==nn||Se!==pn)&&(i.stencilFunc(at,nn,pn),J=at,ge=nn,Se=pn)},setOp:function(at,nn,pn){(ie!==at||ze!==nn||Re!==pn)&&(i.stencilOp(at,nn,pn),ie=at,ze=nn,Re=pn)},setLocked:function(at){I=at},setClear:function(at){gt!==at&&(i.clearStencil(at),gt=at)},reset:function(){I=!1,me=null,J=null,ge=null,Se=null,ie=null,ze=null,Re=null,gt=null}}}const s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap;let u={},f={},h={},d=new WeakMap,m=[],x=null,g=!1,p=null,T=null,R=null,S=null,y=null,M=null,A=null,_=new Je(0,0,0),w=0,P=!1,z=null,k=null,V=null,U=null,F=null;const K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,re=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(q)[1]),H=re>=1):q.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),H=re>=2);let j=null,ne={};const Pe=i.getParameter(i.SCISSOR_BOX),Ee=i.getParameter(i.VIEWPORT),it=new pt().fromArray(Pe),$e=new pt().fromArray(Ee);function et(I,me,J,ge){const Se=new Uint8Array(4),ie=i.createTexture();i.bindTexture(I,ie),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ze=0;ze<J;ze++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(me,0,i.RGBA,1,1,ge,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(me+ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return ie}const Z={};Z[i.TEXTURE_2D]=et(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=et(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=et(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=et(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ee(i.DEPTH_TEST),a.setFunc(xr),oe(!1),ue(fl),ee(i.CULL_FACE),se(Un);function ee(I){u[I]!==!0&&(i.enable(I),u[I]=!0)}function _e(I){u[I]!==!1&&(i.disable(I),u[I]=!1)}function Fe(I,me){return h[I]!==me?(i.bindFramebuffer(I,me),h[I]=me,I===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=me),I===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=me),!0):!1}function Me(I,me){let J=m,ge=!1;if(I){J=d.get(me),J===void 0&&(J=[],d.set(me,J));const Se=I.textures;if(J.length!==Se.length||J[0]!==i.COLOR_ATTACHMENT0){for(let ie=0,ze=Se.length;ie<ze;ie++)J[ie]=i.COLOR_ATTACHMENT0+ie;J.length=Se.length,ge=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,ge=!0);ge&&i.drawBuffers(J)}function Oe(I){return x!==I?(i.useProgram(I),x=I,!0):!1}const ct={[Fi]:i.FUNC_ADD,[ah]:i.FUNC_SUBTRACT,[oh]:i.FUNC_REVERSE_SUBTRACT};ct[lh]=i.MIN,ct[ch]=i.MAX;const te={[uh]:i.ZERO,[hh]:i.ONE,[fh]:i.SRC_COLOR,[Wc]:i.SRC_ALPHA,[_h]:i.SRC_ALPHA_SATURATE,[gh]:i.DST_COLOR,[ph]:i.DST_ALPHA,[dh]:i.ONE_MINUS_SRC_COLOR,[Xc]:i.ONE_MINUS_SRC_ALPHA,[vh]:i.ONE_MINUS_DST_COLOR,[mh]:i.ONE_MINUS_DST_ALPHA,[xh]:i.CONSTANT_COLOR,[bh]:i.ONE_MINUS_CONSTANT_COLOR,[Sh]:i.CONSTANT_ALPHA,[Mh]:i.ONE_MINUS_CONSTANT_ALPHA};function se(I,me,J,ge,Se,ie,ze,Re,gt,at){if(I===Un){g===!0&&(_e(i.BLEND),g=!1);return}if(g===!1&&(ee(i.BLEND),g=!0),I!==sh){if(I!==p||at!==P){if((T!==Fi||y!==Fi)&&(i.blendEquation(i.FUNC_ADD),T=Fi,y=Fi),at)switch(I){case dr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case dl:i.blendFunc(i.ONE,i.ONE);break;case pl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ml:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:je("WebGLState: Invalid blending: ",I);break}else switch(I){case dr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case dl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case pl:je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ml:je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:je("WebGLState: Invalid blending: ",I);break}R=null,S=null,M=null,A=null,_.set(0,0,0),w=0,p=I,P=at}return}Se=Se||me,ie=ie||J,ze=ze||ge,(me!==T||Se!==y)&&(i.blendEquationSeparate(ct[me],ct[Se]),T=me,y=Se),(J!==R||ge!==S||ie!==M||ze!==A)&&(i.blendFuncSeparate(te[J],te[ge],te[ie],te[ze]),R=J,S=ge,M=ie,A=ze),(Re.equals(_)===!1||gt!==w)&&(i.blendColor(Re.r,Re.g,Re.b,gt),_.copy(Re),w=gt),p=I,P=!1}function ae(I,me){I.side===bn?_e(i.CULL_FACE):ee(i.CULL_FACE);let J=I.side===qt;me&&(J=!J),oe(J),I.blending===dr&&I.transparent===!1?se(Un):se(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),s.setMask(I.colorWrite);const ge=I.stencilWrite;o.setTest(ge),ge&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Ie(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ee(i.SAMPLE_ALPHA_TO_COVERAGE):_e(i.SAMPLE_ALPHA_TO_COVERAGE)}function oe(I){z!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),z=I)}function ue(I){I!==nh?(ee(i.CULL_FACE),I!==k&&(I===fl?i.cullFace(i.BACK):I===ih?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):_e(i.CULL_FACE),k=I}function Ue(I){I!==V&&(H&&i.lineWidth(I),V=I)}function Ie(I,me,J){I?(ee(i.POLYGON_OFFSET_FILL),(U!==me||F!==J)&&(U=me,F=J,a.getReversed()&&(me=-me),i.polygonOffset(me,J))):_e(i.POLYGON_OFFSET_FILL)}function Be(I){I?ee(i.SCISSOR_TEST):_e(i.SCISSOR_TEST)}function Ge(I){I===void 0&&(I=i.TEXTURE0+K-1),j!==I&&(i.activeTexture(I),j=I)}function L(I,me,J){J===void 0&&(j===null?J=i.TEXTURE0+K-1:J=j);let ge=ne[J];ge===void 0&&(ge={type:void 0,texture:void 0},ne[J]=ge),(ge.type!==I||ge.texture!==me)&&(j!==J&&(i.activeTexture(J),j=J),i.bindTexture(I,me||Z[I]),ge.type=I,ge.texture=me)}function st(){const I=ne[j];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function Ze(){try{i.compressedTexImage2D(...arguments)}catch(I){je("WebGLState:",I)}}function E(){try{i.compressedTexImage3D(...arguments)}catch(I){je("WebGLState:",I)}}function v(){try{i.texSubImage2D(...arguments)}catch(I){je("WebGLState:",I)}}function N(){try{i.texSubImage3D(...arguments)}catch(I){je("WebGLState:",I)}}function G(){try{i.compressedTexSubImage2D(...arguments)}catch(I){je("WebGLState:",I)}}function Y(){try{i.compressedTexSubImage3D(...arguments)}catch(I){je("WebGLState:",I)}}function le(){try{i.texStorage2D(...arguments)}catch(I){je("WebGLState:",I)}}function ce(){try{i.texStorage3D(...arguments)}catch(I){je("WebGLState:",I)}}function $(){try{i.texImage2D(...arguments)}catch(I){je("WebGLState:",I)}}function Q(){try{i.texImage3D(...arguments)}catch(I){je("WebGLState:",I)}}function de(I){return f[I]!==void 0?f[I]:i.getParameter(I)}function Le(I,me){f[I]!==me&&(i.pixelStorei(I,me),f[I]=me)}function ve(I){it.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),it.copy(I))}function pe(I){$e.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),$e.copy(I))}function De(I,me){let J=c.get(me);J===void 0&&(J=new WeakMap,c.set(me,J));let ge=J.get(I);ge===void 0&&(ge=i.getUniformBlockIndex(me,I.name),J.set(I,ge))}function Ne(I,me){const ge=c.get(me).get(I);l.get(me)!==ge&&(i.uniformBlockBinding(me,ge,I.__bindingPointIndex),l.set(me,ge))}function Xe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},j=null,ne={},h={},d=new WeakMap,m=[],x=null,g=!1,p=null,T=null,R=null,S=null,y=null,M=null,A=null,_=new Je(0,0,0),w=0,P=!1,z=null,k=null,V=null,U=null,F=null,it.set(0,0,i.canvas.width,i.canvas.height),$e.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ee,disable:_e,bindFramebuffer:Fe,drawBuffers:Me,useProgram:Oe,setBlending:se,setMaterial:ae,setFlipSided:oe,setCullFace:ue,setLineWidth:Ue,setPolygonOffset:Ie,setScissorTest:Be,activeTexture:Ge,bindTexture:L,unbindTexture:st,compressedTexImage2D:Ze,compressedTexImage3D:E,texImage2D:$,texImage3D:Q,pixelStorei:Le,getParameter:de,updateUBOMapping:De,uniformBlockBinding:Ne,texStorage2D:le,texStorage3D:ce,texSubImage2D:v,texSubImage3D:N,compressedTexSubImage2D:G,compressedTexSubImage3D:Y,scissor:ve,viewport:pe,reset:Xe}}function pv(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new fe,u=new WeakMap,f=new Set;let h;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(E,v){return m?new OffscreenCanvas(E,v):As("canvas")}function g(E,v,N){let G=1;const Y=Ze(E);if((Y.width>N||Y.height>N)&&(G=N/Math.max(Y.width,Y.height)),G<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const le=Math.floor(G*Y.width),ce=Math.floor(G*Y.height);h===void 0&&(h=x(le,ce));const $=v?x(le,ce):h;return $.width=le,$.height=ce,$.getContext("2d").drawImage(E,0,0,le,ce),ke("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+le+"x"+ce+")."),$}else return"data"in E&&ke("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),E;return E}function p(E){return E.generateMipmaps}function T(E){i.generateMipmap(E)}function R(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(E,v,N,G,Y,le=!1){if(E!==null){if(i[E]!==void 0)return i[E];ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let ce;G&&(ce=e.get("EXT_texture_norm16"),ce||ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=v;if(v===i.RED&&(N===i.FLOAT&&($=i.R32F),N===i.HALF_FLOAT&&($=i.R16F),N===i.UNSIGNED_BYTE&&($=i.R8),N===i.UNSIGNED_SHORT&&ce&&($=ce.R16_EXT),N===i.SHORT&&ce&&($=ce.R16_SNORM_EXT)),v===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&($=i.R8UI),N===i.UNSIGNED_SHORT&&($=i.R16UI),N===i.UNSIGNED_INT&&($=i.R32UI),N===i.BYTE&&($=i.R8I),N===i.SHORT&&($=i.R16I),N===i.INT&&($=i.R32I)),v===i.RG&&(N===i.FLOAT&&($=i.RG32F),N===i.HALF_FLOAT&&($=i.RG16F),N===i.UNSIGNED_BYTE&&($=i.RG8),N===i.UNSIGNED_SHORT&&ce&&($=ce.RG16_EXT),N===i.SHORT&&ce&&($=ce.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&($=i.RG8UI),N===i.UNSIGNED_SHORT&&($=i.RG16UI),N===i.UNSIGNED_INT&&($=i.RG32UI),N===i.BYTE&&($=i.RG8I),N===i.SHORT&&($=i.RG16I),N===i.INT&&($=i.RG32I)),v===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&($=i.RGB8UI),N===i.UNSIGNED_SHORT&&($=i.RGB16UI),N===i.UNSIGNED_INT&&($=i.RGB32UI),N===i.BYTE&&($=i.RGB8I),N===i.SHORT&&($=i.RGB16I),N===i.INT&&($=i.RGB32I)),v===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&($=i.RGBA8UI),N===i.UNSIGNED_SHORT&&($=i.RGBA16UI),N===i.UNSIGNED_INT&&($=i.RGBA32UI),N===i.BYTE&&($=i.RGBA8I),N===i.SHORT&&($=i.RGBA16I),N===i.INT&&($=i.RGBA32I)),v===i.RGB&&(N===i.UNSIGNED_SHORT&&ce&&($=ce.RGB16_EXT),N===i.SHORT&&ce&&($=ce.RGB16_SNORM_EXT),N===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),N===i.UNSIGNED_INT_10F_11F_11F_REV&&($=i.R11F_G11F_B10F)),v===i.RGBA){const Q=le?Ts:Qe.getTransfer(Y);N===i.FLOAT&&($=i.RGBA32F),N===i.HALF_FLOAT&&($=i.RGBA16F),N===i.UNSIGNED_BYTE&&($=Q===ut?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT&&ce&&($=ce.RGBA16_EXT),N===i.SHORT&&ce&&($=ce.RGBA16_SNORM_EXT),N===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function y(E,v){let N;return E?v===null||v===En||v===Sr?N=i.DEPTH24_STENCIL8:v===Mn?N=i.DEPTH32F_STENCIL8:v===br&&(N=i.DEPTH24_STENCIL8,ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===En||v===Sr?N=i.DEPTH_COMPONENT24:v===Mn?N=i.DEPTH_COMPONENT32F:v===br&&(N=i.DEPTH_COMPONENT16),N}function M(E,v){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==Lt&&E.minFilter!==kt?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function A(E){const v=E.target;v.removeEventListener("dispose",A),w(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&f.delete(v)}function _(E){const v=E.target;v.removeEventListener("dispose",_),z(v)}function w(E){const v=n.get(E);if(v.__webglInit===void 0)return;const N=E.source,G=d.get(N);if(G){const Y=G[v.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&P(E),Object.keys(G).length===0&&d.delete(N)}n.remove(E)}function P(E){const v=n.get(E);i.deleteTexture(v.__webglTexture);const N=E.source,G=d.get(N);delete G[v.__cacheKey],a.memory.textures--}function z(E){const v=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(v.__webglFramebuffer[G]))for(let Y=0;Y<v.__webglFramebuffer[G].length;Y++)i.deleteFramebuffer(v.__webglFramebuffer[G][Y]);else i.deleteFramebuffer(v.__webglFramebuffer[G]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[G])}else{if(Array.isArray(v.__webglFramebuffer))for(let G=0;G<v.__webglFramebuffer.length;G++)i.deleteFramebuffer(v.__webglFramebuffer[G]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let G=0;G<v.__webglColorRenderbuffer.length;G++)v.__webglColorRenderbuffer[G]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[G]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const N=E.textures;for(let G=0,Y=N.length;G<Y;G++){const le=n.get(N[G]);le.__webglTexture&&(i.deleteTexture(le.__webglTexture),a.memory.textures--),n.remove(N[G])}n.remove(E)}let k=0;function V(){k=0}function U(){return k}function F(E){k=E}function K(){const E=k;return E>=r.maxTextures&&ke("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+r.maxTextures),k+=1,E}function H(E){const v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function re(E,v){const N=n.get(E);if(E.isVideoTexture&&L(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&N.__version!==E.version){const G=E.image;if(G===null)ke("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)ke("WebGLRenderer: Texture marked for update but image is incomplete");else{_e(N,E,v);return}}else E.isExternalTexture&&(N.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+v)}function q(E,v){const N=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){_e(N,E,v);return}else E.isExternalTexture&&(N.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+v)}function j(E,v){const N=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){_e(N,E,v);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+v)}function ne(E,v){const N=n.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&N.__version!==E.version){Fe(N,E,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+v)}const Pe={[ka]:i.REPEAT,[In]:i.CLAMP_TO_EDGE,[Fa]:i.MIRRORED_REPEAT},Ee={[Lt]:i.NEAREST,[Eh]:i.NEAREST_MIPMAP_NEAREST,[zr]:i.NEAREST_MIPMAP_LINEAR,[kt]:i.LINEAR,[Xs]:i.LINEAR_MIPMAP_NEAREST,[ui]:i.LINEAR_MIPMAP_LINEAR},it={[Ch]:i.NEVER,[Ih]:i.ALWAYS,[Ph]:i.LESS,[Oo]:i.LEQUAL,[Lh]:i.EQUAL,[Bo]:i.GEQUAL,[Dh]:i.GREATER,[zh]:i.NOTEQUAL};function $e(E,v){if(v.type===Mn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===kt||v.magFilter===Xs||v.magFilter===zr||v.magFilter===ui||v.minFilter===kt||v.minFilter===Xs||v.minFilter===zr||v.minFilter===ui)&&ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,Pe[v.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,Pe[v.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,Pe[v.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,Ee[v.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,Ee[v.minFilter]),v.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,it[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Lt||v.minFilter!==zr&&v.minFilter!==ui||v.type===Mn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function et(E,v){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",A));const G=v.source;let Y=d.get(G);Y===void 0&&(Y={},d.set(G,Y));const le=H(v);if(le!==E.__cacheKey){Y[le]===void 0&&(Y[le]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),Y[le].usedTimes++;const ce=Y[E.__cacheKey];ce!==void 0&&(Y[E.__cacheKey].usedTimes--,ce.usedTimes===0&&P(v)),E.__cacheKey=le,E.__webglTexture=Y[le].texture}return N}function Z(E,v,N){return Math.floor(Math.floor(E/N)/v)}function ee(E,v,N,G){const le=E.updateRanges;if(le.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,N,G,v.data);else{le.sort((Le,ve)=>Le.start-ve.start);let ce=0;for(let Le=1;Le<le.length;Le++){const ve=le[ce],pe=le[Le],De=ve.start+ve.count,Ne=Z(pe.start,v.width,4),Xe=Z(ve.start,v.width,4);pe.start<=De+1&&Ne===Xe&&Z(pe.start+pe.count-1,v.width,4)===Ne?ve.count=Math.max(ve.count,pe.start+pe.count-ve.start):(++ce,le[ce]=pe)}le.length=ce+1;const $=t.getParameter(i.UNPACK_ROW_LENGTH),Q=t.getParameter(i.UNPACK_SKIP_PIXELS),de=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let Le=0,ve=le.length;Le<ve;Le++){const pe=le[Le],De=Math.floor(pe.start/4),Ne=Math.ceil(pe.count/4),Xe=De%v.width,I=Math.floor(De/v.width),me=Ne,J=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Xe),t.pixelStorei(i.UNPACK_SKIP_ROWS,I),t.texSubImage2D(i.TEXTURE_2D,0,Xe,I,me,J,N,G,v.data)}E.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,$),t.pixelStorei(i.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(i.UNPACK_SKIP_ROWS,de)}}function _e(E,v,N){let G=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(G=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(G=i.TEXTURE_3D);const Y=et(E,v),le=v.source;t.bindTexture(G,E.__webglTexture,i.TEXTURE0+N);const ce=n.get(le);if(le.version!==ce.__version||Y===!0){if(t.activeTexture(i.TEXTURE0+N),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const J=Qe.getPrimaries(Qe.workingColorSpace),ge=v.colorSpace===Zn?null:Qe.getPrimaries(v.colorSpace),Se=v.colorSpace===Zn||J===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let Q=g(v.image,!1,r.maxTextureSize);Q=st(v,Q);const de=s.convert(v.format,v.colorSpace),Le=s.convert(v.type);let ve=S(v.internalFormat,de,Le,v.normalized,v.colorSpace,v.isVideoTexture);$e(G,v);let pe;const De=v.mipmaps,Ne=v.isVideoTexture!==!0,Xe=ce.__version===void 0||Y===!0,I=le.dataReady,me=M(v,Q);if(v.isDepthTexture)ve=y(v.format===hi,v.type),Xe&&(Ne?t.texStorage2D(i.TEXTURE_2D,1,ve,Q.width,Q.height):t.texImage2D(i.TEXTURE_2D,0,ve,Q.width,Q.height,0,de,Le,null));else if(v.isDataTexture)if(De.length>0){Ne&&Xe&&t.texStorage2D(i.TEXTURE_2D,me,ve,De[0].width,De[0].height);for(let J=0,ge=De.length;J<ge;J++)pe=De[J],Ne?I&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,pe.width,pe.height,de,Le,pe.data):t.texImage2D(i.TEXTURE_2D,J,ve,pe.width,pe.height,0,de,Le,pe.data);v.generateMipmaps=!1}else Ne?(Xe&&t.texStorage2D(i.TEXTURE_2D,me,ve,Q.width,Q.height),I&&ee(v,Q,de,Le)):t.texImage2D(i.TEXTURE_2D,0,ve,Q.width,Q.height,0,de,Le,Q.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ne&&Xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,me,ve,De[0].width,De[0].height,Q.depth);for(let J=0,ge=De.length;J<ge;J++)if(pe=De[J],v.format!==ln)if(de!==null)if(Ne){if(I)if(v.layerUpdates.size>0){const Se=Ql(pe.width,pe.height,v.format,v.type);for(const ie of v.layerUpdates){const ze=pe.data.subarray(ie*Se/pe.data.BYTES_PER_ELEMENT,(ie+1)*Se/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,ie,pe.width,pe.height,1,de,ze)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,pe.width,pe.height,Q.depth,de,pe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,ve,pe.width,pe.height,Q.depth,0,pe.data,0,0);else ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,pe.width,pe.height,Q.depth,de,Le,pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,ve,pe.width,pe.height,Q.depth,0,de,Le,pe.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{Ne&&Xe&&t.texStorage2D(i.TEXTURE_2D,me,ve,De[0].width,De[0].height);for(let J=0,ge=De.length;J<ge;J++)pe=De[J],v.format!==ln?de!==null?Ne?I&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,pe.width,pe.height,de,pe.data):t.compressedTexImage2D(i.TEXTURE_2D,J,ve,pe.width,pe.height,0,pe.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?I&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,pe.width,pe.height,de,Le,pe.data):t.texImage2D(i.TEXTURE_2D,J,ve,pe.width,pe.height,0,de,Le,pe.data)}else if(v.isDataArrayTexture)if(Ne){if(Xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,me,ve,Q.width,Q.height,Q.depth),I)if(v.layerUpdates.size>0){const J=Ql(Q.width,Q.height,v.format,v.type);for(const ge of v.layerUpdates){const Se=Q.data.subarray(ge*J/Q.data.BYTES_PER_ELEMENT,(ge+1)*J/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ge,Q.width,Q.height,1,de,Le,Se)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,de,Le,Q.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ve,Q.width,Q.height,Q.depth,0,de,Le,Q.data);else if(v.isData3DTexture)Ne?(Xe&&t.texStorage3D(i.TEXTURE_3D,me,ve,Q.width,Q.height,Q.depth),I&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,de,Le,Q.data)):t.texImage3D(i.TEXTURE_3D,0,ve,Q.width,Q.height,Q.depth,0,de,Le,Q.data);else if(v.isFramebufferTexture){if(Xe)if(Ne)t.texStorage2D(i.TEXTURE_2D,me,ve,Q.width,Q.height);else{let J=Q.width,ge=Q.height;for(let Se=0;Se<me;Se++)t.texImage2D(i.TEXTURE_2D,Se,ve,J,ge,0,de,Le,null),J>>=1,ge>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){const J=i.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),Q.parentNode!==J){J.appendChild(Q),f.add(v),J.onpaint=ge=>{const Se=ge.changedElements;for(const ie of f)Se.includes(ie.image)&&(ie.needsUpdate=!0)},J.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Q);else{const Se=i.RGBA,ie=i.RGBA,ze=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Se,ie,ze,Q)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(De.length>0){if(Ne&&Xe){const J=Ze(De[0]);t.texStorage2D(i.TEXTURE_2D,me,ve,J.width,J.height)}for(let J=0,ge=De.length;J<ge;J++)pe=De[J],Ne?I&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,de,Le,pe):t.texImage2D(i.TEXTURE_2D,J,ve,de,Le,pe);v.generateMipmaps=!1}else if(Ne){if(Xe){const J=Ze(Q);t.texStorage2D(i.TEXTURE_2D,me,ve,J.width,J.height)}I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,de,Le,Q)}else t.texImage2D(i.TEXTURE_2D,0,ve,de,Le,Q);p(v)&&T(G),ce.__version=le.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function Fe(E,v,N){if(v.image.length!==6)return;const G=et(E,v),Y=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+N);const le=n.get(Y);if(Y.version!==le.__version||G===!0){t.activeTexture(i.TEXTURE0+N);const ce=Qe.getPrimaries(Qe.workingColorSpace),$=v.colorSpace===Zn?null:Qe.getPrimaries(v.colorSpace),Q=v.colorSpace===Zn||ce===$?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);const de=v.isCompressedTexture||v.image[0].isCompressedTexture,Le=v.image[0]&&v.image[0].isDataTexture,ve=[];for(let ie=0;ie<6;ie++)!de&&!Le?ve[ie]=g(v.image[ie],!0,r.maxCubemapSize):ve[ie]=Le?v.image[ie].image:v.image[ie],ve[ie]=st(v,ve[ie]);const pe=ve[0],De=s.convert(v.format,v.colorSpace),Ne=s.convert(v.type),Xe=S(v.internalFormat,De,Ne,v.normalized,v.colorSpace),I=v.isVideoTexture!==!0,me=le.__version===void 0||G===!0,J=Y.dataReady;let ge=M(v,pe);$e(i.TEXTURE_CUBE_MAP,v);let Se;if(de){I&&me&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,Xe,pe.width,pe.height);for(let ie=0;ie<6;ie++){Se=ve[ie].mipmaps;for(let ze=0;ze<Se.length;ze++){const Re=Se[ze];v.format!==ln?De!==null?I?J&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ze,0,0,Re.width,Re.height,De,Re.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ze,Xe,Re.width,Re.height,0,Re.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ze,0,0,Re.width,Re.height,De,Ne,Re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ze,Xe,Re.width,Re.height,0,De,Ne,Re.data)}}}else{if(Se=v.mipmaps,I&&me){Se.length>0&&ge++;const ie=Ze(ve[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,Xe,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(Le){I?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,ve[ie].width,ve[ie].height,De,Ne,ve[ie].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Xe,ve[ie].width,ve[ie].height,0,De,Ne,ve[ie].data);for(let ze=0;ze<Se.length;ze++){const gt=Se[ze].image[ie].image;I?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ze+1,0,0,gt.width,gt.height,De,Ne,gt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ze+1,Xe,gt.width,gt.height,0,De,Ne,gt.data)}}else{I?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,De,Ne,ve[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Xe,De,Ne,ve[ie]);for(let ze=0;ze<Se.length;ze++){const Re=Se[ze];I?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ze+1,0,0,De,Ne,Re.image[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ze+1,Xe,De,Ne,Re.image[ie])}}}p(v)&&T(i.TEXTURE_CUBE_MAP),le.__version=Y.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function Me(E,v,N,G,Y,le){const ce=s.convert(N.format,N.colorSpace),$=s.convert(N.type),Q=S(N.internalFormat,ce,$,N.normalized,N.colorSpace),de=n.get(v),Le=n.get(N);if(Le.__renderTarget=v,!de.__hasExternalTextures){const ve=Math.max(1,v.width>>le),pe=Math.max(1,v.height>>le);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?t.texImage3D(Y,le,Q,ve,pe,v.depth,0,ce,$,null):t.texImage2D(Y,le,Q,ve,pe,0,ce,$,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),Ge(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,G,Y,Le.__webglTexture,0,Be(v)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,G,Y,Le.__webglTexture,le),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Oe(E,v,N){if(i.bindRenderbuffer(i.RENDERBUFFER,E),v.depthBuffer){const G=v.depthTexture,Y=G&&G.isDepthTexture?G.type:null,le=y(v.stencilBuffer,Y),ce=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ge(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Be(v),le,v.width,v.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,Be(v),le,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,le,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,E)}else{const G=v.textures;for(let Y=0;Y<G.length;Y++){const le=G[Y],ce=s.convert(le.format,le.colorSpace),$=s.convert(le.type),Q=S(le.internalFormat,ce,$,le.normalized,le.colorSpace);Ge(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Be(v),Q,v.width,v.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,Be(v),Q,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Q,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ct(E,v,N){const G=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Y=n.get(v.depthTexture);if(Y.__renderTarget=v,(!Y.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),G){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,v.depthTexture.addEventListener("dispose",A)),Y.__webglTexture===void 0){Y.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),$e(i.TEXTURE_CUBE_MAP,v.depthTexture);const de=s.convert(v.depthTexture.format),Le=s.convert(v.depthTexture.type);let ve;v.depthTexture.format===Fn?ve=i.DEPTH_COMPONENT24:v.depthTexture.format===hi&&(ve=i.DEPTH24_STENCIL8);for(let pe=0;pe<6;pe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,ve,v.width,v.height,0,de,Le,null)}}else re(v.depthTexture,0);const le=Y.__webglTexture,ce=Be(v),$=G?i.TEXTURE_CUBE_MAP_POSITIVE_X+N:i.TEXTURE_2D,Q=v.depthTexture.format===hi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===Fn)Ge(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,$,le,0,ce):i.framebufferTexture2D(i.FRAMEBUFFER,Q,$,le,0);else if(v.depthTexture.format===hi)Ge(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,$,le,0,ce):i.framebufferTexture2D(i.FRAMEBUFFER,Q,$,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function te(E){const v=n.get(E),N=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){const G=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),G){const Y=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,G.removeEventListener("dispose",Y)};G.addEventListener("dispose",Y),v.__depthDisposeCallback=Y}v.__boundDepthTexture=G}if(E.depthTexture&&!v.__autoAllocateDepthBuffer)if(N)for(let G=0;G<6;G++)ct(v.__webglFramebuffer[G],E,G);else{const G=E.texture.mipmaps;G&&G.length>0?ct(v.__webglFramebuffer[0],E,0):ct(v.__webglFramebuffer,E,0)}else if(N){v.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[G]),v.__webglDepthbuffer[G]===void 0)v.__webglDepthbuffer[G]=i.createRenderbuffer(),Oe(v.__webglDepthbuffer[G],E,!1);else{const Y=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer[G];i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,le)}}else{const G=E.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Oe(v.__webglDepthbuffer,E,!1);else{const Y=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,le)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function se(E,v,N){const G=n.get(E);v!==void 0&&Me(G.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&te(E)}function ae(E){const v=E.texture,N=n.get(E),G=n.get(v);E.addEventListener("dispose",_);const Y=E.textures,le=E.isWebGLCubeRenderTarget===!0,ce=Y.length>1;if(ce||(G.__webglTexture===void 0&&(G.__webglTexture=i.createTexture()),G.__version=v.version,a.memory.textures++),le){N.__webglFramebuffer=[];for(let $=0;$<6;$++)if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer[$]=[];for(let Q=0;Q<v.mipmaps.length;Q++)N.__webglFramebuffer[$][Q]=i.createFramebuffer()}else N.__webglFramebuffer[$]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer=[];for(let $=0;$<v.mipmaps.length;$++)N.__webglFramebuffer[$]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(ce)for(let $=0,Q=Y.length;$<Q;$++){const de=n.get(Y[$]);de.__webglTexture===void 0&&(de.__webglTexture=i.createTexture(),a.memory.textures++)}if(E.samples>0&&Ge(E)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let $=0;$<Y.length;$++){const Q=Y[$];N.__webglColorRenderbuffer[$]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[$]);const de=s.convert(Q.format,Q.colorSpace),Le=s.convert(Q.type),ve=S(Q.internalFormat,de,Le,Q.normalized,Q.colorSpace,E.isXRRenderTarget===!0),pe=Be(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,pe,ve,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.RENDERBUFFER,N.__webglColorRenderbuffer[$])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),Oe(N.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(le){t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture),$e(i.TEXTURE_CUBE_MAP,v);for(let $=0;$<6;$++)if(v.mipmaps&&v.mipmaps.length>0)for(let Q=0;Q<v.mipmaps.length;Q++)Me(N.__webglFramebuffer[$][Q],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Q);else Me(N.__webglFramebuffer[$],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);p(v)&&T(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let $=0,Q=Y.length;$<Q;$++){const de=Y[$],Le=n.get(de);let ve=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ve=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ve,Le.__webglTexture),$e(ve,de),Me(N.__webglFramebuffer,E,de,i.COLOR_ATTACHMENT0+$,ve,0),p(de)&&T(ve)}t.unbindTexture()}else{let $=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&($=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture($,G.__webglTexture),$e($,v),v.mipmaps&&v.mipmaps.length>0)for(let Q=0;Q<v.mipmaps.length;Q++)Me(N.__webglFramebuffer[Q],E,v,i.COLOR_ATTACHMENT0,$,Q);else Me(N.__webglFramebuffer,E,v,i.COLOR_ATTACHMENT0,$,0);p(v)&&T($),t.unbindTexture()}E.depthBuffer&&te(E)}function oe(E){const v=E.textures;for(let N=0,G=v.length;N<G;N++){const Y=v[N];if(p(Y)){const le=R(E),ce=n.get(Y).__webglTexture;t.bindTexture(le,ce),T(le),t.unbindTexture()}}}const ue=[],Ue=[];function Ie(E){if(E.samples>0){if(Ge(E)===!1){const v=E.textures,N=E.width,G=E.height;let Y=i.COLOR_BUFFER_BIT;const le=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=n.get(E),$=v.length>1;if($)for(let de=0;de<v.length;de++)t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);const Q=E.texture.mipmaps;Q&&Q.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let de=0;de<v.length;de++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),$){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ce.__webglColorRenderbuffer[de]);const Le=n.get(v[de]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Le,0)}i.blitFramebuffer(0,0,N,G,0,0,N,G,Y,i.NEAREST),l===!0&&(ue.length=0,Ue.length=0,ue.push(i.COLOR_ATTACHMENT0+de),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&(ue.push(le),Ue.push(le),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ue)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ue))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),$)for(let de=0;de<v.length;de++){t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,ce.__webglColorRenderbuffer[de]);const Le=n.get(v[de]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,Le,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&l){const v=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function Be(E){return Math.min(r.maxSamples,E.samples)}function Ge(E){const v=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function L(E){const v=a.render.frame;u.get(E)!==v&&(u.set(E,v),E.update())}function st(E,v){const N=E.colorSpace,G=E.format,Y=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||N!==Es&&N!==Zn&&(Qe.getTransfer(N)===ut?(G!==ln||Y!==Zt)&&ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):je("WebGLTextures: Unsupported texture color space:",N)),v}function Ze(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=V,this.getTextureUnits=U,this.setTextureUnits=F,this.setTexture2D=re,this.setTexture2DArray=q,this.setTexture3D=j,this.setTextureCube=ne,this.rebindTextures=se,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=oe,this.updateMultisampleRenderTarget=Ie,this.setupDepthRenderbuffer=te,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=Ge,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function mv(i,e){function t(n,r=Zn){let s;const a=Qe.getTransfer(r);if(n===Zt)return i.UNSIGNED_BYTE;if(n===Io)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Uo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===nu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===iu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===eu)return i.BYTE;if(n===tu)return i.SHORT;if(n===br)return i.UNSIGNED_SHORT;if(n===zo)return i.INT;if(n===En)return i.UNSIGNED_INT;if(n===Mn)return i.FLOAT;if(n===Tn)return i.HALF_FLOAT;if(n===ru)return i.ALPHA;if(n===su)return i.RGB;if(n===ln)return i.RGBA;if(n===Fn)return i.DEPTH_COMPONENT;if(n===hi)return i.DEPTH_STENCIL;if(n===au)return i.RED;if(n===No)return i.RED_INTEGER;if(n===vi)return i.RG;if(n===ko)return i.RG_INTEGER;if(n===Fo)return i.RGBA_INTEGER;if(n===gs||n===vs||n===_s||n===xs)if(a===ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===gs)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===vs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===_s)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===xs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===gs)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===vs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===_s)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===xs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Oa||n===Ba||n===Va||n===Ga)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Oa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ba)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Va)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ga)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ha||n===Wa||n===Xa||n===qa||n===Ya||n===ys||n===$a)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ha||n===Wa)return a===ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Xa)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===qa)return s.COMPRESSED_R11_EAC;if(n===Ya)return s.COMPRESSED_SIGNED_R11_EAC;if(n===ys)return s.COMPRESSED_RG11_EAC;if(n===$a)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Za||n===Ka||n===Ja||n===Qa||n===ja||n===eo||n===to||n===no||n===io||n===ro||n===so||n===ao||n===oo||n===lo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Za)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ka)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ja)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Qa)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ja)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===eo)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===to)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===no)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===io)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ro)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===so)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ao)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===oo)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===lo)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===co||n===uo||n===ho)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===co)return a===ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===uo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ho)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===fo||n===po||n===ws||n===mo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===fo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===po)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ws)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===mo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Sr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const gv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,vv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class _v{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new gu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new dn({vertexShader:gv,fragmentShader:vv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new fn(new Ns(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class xv extends bi{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,m=null;const x=typeof XRWebGLBinding<"u",g=new _v,p={},T=t.getContextAttributes();let R=null,S=null;const y=[],M=[],A=new fe;let _=null,w=null;const P=new en;P.viewport=new pt;const z=new en;z.viewport=new pt;const k=[P,z],V=new yd;let U=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ee=y[Z];return ee===void 0&&(ee=new Qs,y[Z]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(Z){let ee=y[Z];return ee===void 0&&(ee=new Qs,y[Z]=ee),ee.getGripSpace()},this.getHand=function(Z){let ee=y[Z];return ee===void 0&&(ee=new Qs,y[Z]=ee),ee.getHandSpace()};function K(Z){const ee=M.indexOf(Z.inputSource);if(ee===-1)return;const _e=y[ee];_e!==void 0&&(_e.update(Z.inputSource,Z.frame,c||a),_e.dispatchEvent({type:Z.type,data:Z.inputSource}))}function H(){r.removeEventListener("select",K),r.removeEventListener("selectstart",K),r.removeEventListener("selectend",K),r.removeEventListener("squeeze",K),r.removeEventListener("squeezestart",K),r.removeEventListener("squeezeend",K),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",re);for(let Z=0;Z<y.length;Z++){const ee=M[Z];ee!==null&&(M[Z]=null,y[Z].disconnect(ee))}U=null,F=null,g.reset();for(const Z in p)delete p[Z];if(e.setRenderTarget(R),d=null,h=null,f=null,r=null,S=null,et.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(A.width,A.height,!1),w!==null){const Z=w.camera;Z.fov=w.fov,Z.zoom=w.zoom,Z.updateProjectionMatrix(),w=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,n.isPresenting===!0&&ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(Z){if(r=Z,r!==null){if(R=e.getRenderTarget(),r.addEventListener("select",K),r.addEventListener("selectstart",K),r.addEventListener("selectend",K),r.addEventListener("squeeze",K),r.addEventListener("squeezestart",K),r.addEventListener("squeezeend",K),r.addEventListener("end",H),r.addEventListener("inputsourceschange",re),T.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(A),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let _e=null,Fe=null,Me=null;T.depth&&(Me=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=T.stencil?hi:Fn,Fe=T.stencil?Sr:En);const Oe={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(Oe),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new un(h.textureWidth,h.textureHeight,{format:ln,type:Zt,depthTexture:new wr(h.textureWidth,h.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const _e={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,_e),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),S=new un(d.framebufferWidth,d.framebufferHeight,{format:ln,type:Zt,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),et.setContext(r),et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function re(Z){for(let ee=0;ee<Z.removed.length;ee++){const _e=Z.removed[ee],Fe=M.indexOf(_e);Fe>=0&&(M[Fe]=null,y[Fe].disconnect(_e))}for(let ee=0;ee<Z.added.length;ee++){const _e=Z.added[ee];let Fe=M.indexOf(_e);if(Fe===-1){for(let Oe=0;Oe<y.length;Oe++)if(Oe>=M.length){M.push(_e),Fe=Oe;break}else if(M[Oe]===null){M[Oe]=_e,Fe=Oe;break}if(Fe===-1)break}const Me=y[Fe];Me&&Me.connect(_e)}}const q=new C,j=new C;function ne(Z,ee,_e){q.setFromMatrixPosition(ee.matrixWorld),j.setFromMatrixPosition(_e.matrixWorld);const Fe=q.distanceTo(j),Me=ee.projectionMatrix.elements,Oe=_e.projectionMatrix.elements,ct=Me[14]/(Me[10]-1),te=Me[14]/(Me[10]+1),se=(Me[9]+1)/Me[5],ae=(Me[9]-1)/Me[5],oe=(Me[8]-1)/Me[0],ue=(Oe[8]+1)/Oe[0],Ue=ct*oe,Ie=ct*ue,Be=Fe/(-oe+ue),Ge=Be*-oe;if(ee.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ge),Z.translateZ(Be),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Me[10]===-1)Z.projectionMatrix.copy(ee.projectionMatrix),Z.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const L=ct+Be,st=te+Be,Ze=Ue-Ge,E=Ie+(Fe-Ge),v=se*te/st*L,N=ae*te/st*L;Z.projectionMatrix.makePerspective(Ze,E,v,N,L,st),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Pe(Z,ee){ee===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ee.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(r===null)return;let ee=Z.near,_e=Z.far;g.texture!==null&&(g.depthNear>0&&(ee=g.depthNear),g.depthFar>0&&(_e=g.depthFar)),V.near=z.near=P.near=ee,V.far=z.far=P.far=_e,(U!==V.near||F!==V.far)&&(r.updateRenderState({depthNear:V.near,depthFar:V.far}),U=V.near,F=V.far),V.layers.mask=Z.layers.mask|6,P.layers.mask=V.layers.mask&-5,z.layers.mask=V.layers.mask&-3;const Fe=Z.parent,Me=V.cameras;Pe(V,Fe);for(let Oe=0;Oe<Me.length;Oe++)Pe(Me[Oe],Fe);Me.length===2?ne(V,P,z):V.projectionMatrix.copy(P.projectionMatrix),w===null&&Z.isPerspectiveCamera&&(w={camera:Z,fov:Z.fov,zoom:Z.zoom}),Ee(Z,V,Fe)};function Ee(Z,ee,_e){_e===null?Z.matrix.copy(ee.matrixWorld):(Z.matrix.copy(_e.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ee.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ee.projectionMatrix),Z.projectionMatrixInverse.copy(ee.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=yr*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(Z){l=Z,h!==null&&(h.fixedFoveation=Z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(V)},this.getCameraTexture=function(Z){return p[Z]};let it=null;function $e(Z,ee){if(u=ee.getViewerPose(c||a),m=ee,u!==null){const _e=u.views;d!==null&&(e.setRenderTargetFramebuffer(S,d.framebuffer),e.setRenderTarget(S));let Fe=!1;_e.length!==V.cameras.length&&(V.cameras.length=0,Fe=!0);for(let te=0;te<_e.length;te++){const se=_e[te];let ae=null;if(d!==null)ae=d.getViewport(se);else{const ue=f.getViewSubImage(h,se);ae=ue.viewport,te===0&&(e.setRenderTargetTextures(S,ue.colorTexture,ue.depthStencilTexture),e.setRenderTarget(S))}let oe=k[te];oe===void 0&&(oe=new en,oe.layers.enable(te),oe.viewport=new pt,k[te]=oe),oe.matrix.fromArray(se.transform.matrix),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.projectionMatrix.fromArray(se.projectionMatrix),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert(),oe.viewport.set(ae.x,ae.y,ae.width,ae.height),te===0&&(V.matrix.copy(oe.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),Fe===!0&&V.cameras.push(oe)}const Me=r.enabledFeatures;if(Me&&Me.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){f=n.getBinding();const te=f.getDepthInformation(_e[0]);te&&te.isValid&&te.texture&&g.init(te,r.renderState)}if(Me&&Me.includes("camera-access")&&x){e.state.unbindTexture(),f=n.getBinding();for(let te=0;te<_e.length;te++){const se=_e[te].camera;if(se){let ae=p[se];ae||(ae=new gu,p[se]=ae);const oe=f.getCameraImage(se);ae.sourceTexture=oe}}}}for(let _e=0;_e<y.length;_e++){const Fe=M[_e],Me=y[_e];Fe!==null&&Me!==void 0&&Me.update(Fe,ee,c||a)}it&&it(Z,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),m=null}const et=new Cu;et.setAnimationLoop($e),this.setAnimationLoop=function(Z){it=Z},this.dispose=function(){}}}const bv=new lt,Nu=new He;Nu.set(-1,0,0,0,1,0,0,0,1);function Sv(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Eu(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,T,R,S){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(g,p):p.isMeshLambertMaterial?(s(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(g,p),f(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(g,p),h(g,p),p.isMeshPhysicalMaterial&&d(g,p,S)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),x(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,T,R):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===qt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===qt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const T=e.get(p),R=T.envMap,S=T.envMapRotation;R&&(g.envMap.value=R,g.envMapRotation.value.setFromMatrix4(bv.makeRotationFromEuler(S)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Nu),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,T,R){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*T,g.scale.value=R*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,T){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===qt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=T.texture,g.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){const T=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(T.matrixWorld),g.nearDistance.value=T.shadow.camera.near,g.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Mv(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,y){const M=y.program;n.uniformBlockBinding(S,M)}function c(S,y){let M=r[S.id];M===void 0&&(g(S),M=u(S),r[S.id]=M,S.addEventListener("dispose",T));const A=y.program;n.updateUBOMapping(S,A);const _=e.render.frame;s[S.id]!==_&&(h(S),s[S.id]=_)}function u(S){const y=f();S.__bindingPointIndex=y;const M=i.createBuffer(),A=S.__size,_=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,A,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,M),M}function f(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const y=r[S.id],M=S.uniforms,A=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let _=0,w=M.length;_<w;_++){const P=M[_];if(Array.isArray(P))for(let z=0,k=P.length;z<k;z++)d(P[z],_,z,A);else d(P,_,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(S,y,M,A){if(x(S,y,M,A)===!0){const _=S.__offset,w=S.value;if(Array.isArray(w)){let P=0;for(let z=0;z<w.length;z++){const k=w[z],V=p(k);m(k,S.__data,P),typeof k!="number"&&typeof k!="boolean"&&!k.isMatrix3&&!ArrayBuffer.isView(k)&&(P+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(w,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,S.__data)}}function m(S,y,M){typeof S=="number"||typeof S=="boolean"?y[0]=S:S.isMatrix3?(y[0]=S.elements[0],y[1]=S.elements[1],y[2]=S.elements[2],y[3]=0,y[4]=S.elements[3],y[5]=S.elements[4],y[6]=S.elements[5],y[7]=0,y[8]=S.elements[6],y[9]=S.elements[7],y[10]=S.elements[8],y[11]=0):ArrayBuffer.isView(S)?y.set(new S.constructor(S.buffer,S.byteOffset,y.length)):S.toArray(y,M)}function x(S,y,M,A){const _=S.value,w=y+"_"+M;if(A[w]===void 0)return typeof _=="number"||typeof _=="boolean"?A[w]=_:ArrayBuffer.isView(_)?A[w]=_.slice():A[w]=_.clone(),!0;{const P=A[w];if(typeof _=="number"||typeof _=="boolean"){if(P!==_)return A[w]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(P.equals(_)===!1)return P.copy(_),!0}}return!1}function g(S){const y=S.uniforms;let M=0;const A=16;for(let w=0,P=y.length;w<P;w++){const z=Array.isArray(y[w])?y[w]:[y[w]];for(let k=0,V=z.length;k<V;k++){const U=z[k],F=Array.isArray(U.value)?U.value:[U.value];for(let K=0,H=F.length;K<H;K++){const re=F[K],q=p(re),j=M%A,ne=j%q.boundary,Pe=j+ne;M+=ne,Pe!==0&&A-Pe<q.storage&&(M+=A-Pe),U.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=M,M+=q.storage}}}const _=M%A;return _>0&&(M+=A-_),S.__size=M,S.__cache={},this}function p(S){const y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(y.boundary=16,y.storage=S.byteLength):ke("WebGLRenderer: Unsupported uniform value type.",S),y}function T(S){const y=S.target;y.removeEventListener("dispose",T);const M=a.indexOf(y.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function R(){for(const S in r)i.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:l,update:c,dispose:R}}const yv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let vn=null;function wv(){return vn===null&&(vn=new Ef(yv,16,16,vi,Tn),vn.name="DFG_LUT",vn.minFilter=kt,vn.magFilter=kt,vn.wrapS=In,vn.wrapT=In,vn.generateMipmaps=!1,vn.needsUpdate=!0),vn}class Ev{constructor(e={}){const{canvas:t=Nh(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=Zt}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const x=d,g=new Set([Fo,ko,No]),p=new Set([Zt,En,br,Sr,Io,Uo]),T=new Uint32Array(4),R=new Int32Array(4),S=new C;let y=null,M=null;const A=[],_=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=cn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let z=!1,k=null,V=null,U=null,F=null;this._outputColorSpace=Qt;let K=0,H=0,re=null,q=-1,j=null;const ne=new pt,Pe=new pt;let Ee=null;const it=new Je(0);let $e=0,et=t.width,Z=t.height,ee=1,_e=null,Fe=null;const Me=new pt(0,0,et,Z),Oe=new pt(0,0,et,Z);let ct=!1;const te=new Xo;let se=!1,ae=!1;const oe=new lt,ue=new C,Ue=new pt,Ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Be=!1;function Ge(){return re===null?ee:1}let L=n;function st(b,D){return t.getContext(b,D)}let Ze,E,v,N,G,Y,le,ce,$,Q,de,Le,ve,pe,De,Ne,Xe,I,me,J,ge,Se,ie;try{const b={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Lo}`),t.addEventListener("webglcontextlost",gt,!1),t.addEventListener("webglcontextrestored",at,!1),t.addEventListener("webglcontextcreationerror",nn,!1),L===null){const D="webgl2";if(L=st(D,b),L===null)throw st(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ze()}catch(b){throw t.removeEventListener("webglcontextlost",gt,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",nn,!1),je("WebGLRenderer: "+b.message),b}function ze(){Ze=new wg(L),Ze.init(),ge=new mv(L,Ze),E=new pg(L,Ze,e,ge),v=new dv(L,Ze),E.reversedDepthBuffer&&h&&v.buffers.depth.setReversed(!0),V=L.createFramebuffer(),U=L.createFramebuffer(),F=L.createFramebuffer(),N=new Ag(L),G=new j0,Y=new pv(L,Ze,v,G,E,ge,N),le=new yg(P),ce=new Cd(L),Se=new fg(L,ce),$=new Eg(L,ce,N,Se),Q=new Cg(L,$,ce,Se,N),I=new Rg(L,E,Y),De=new mg(G),de=new Q0(P,le,Ze,E,Se,De),Le=new Sv(P,G),ve=new tv,pe=new ov(Ze),Xe=new hg(P,le,v,Q,m,l),Ne=new fv(P,Q,E),ie=new Mv(L,N,E,v),me=new dg(L,Ze,N),J=new Tg(L,Ze,N),N.programs=de.programs,P.capabilities=E,P.extensions=Ze,P.properties=G,P.renderLists=ve,P.shadowMap=Ne,P.state=v,P.info=N}x!==Zt&&(w=new Lg(x,t.width,t.height,o,r,s));const Re=new xv(P,L);this.xr=Re,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const b=Ze.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Ze.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(b){b!==void 0&&(ee=b,this.setSize(et,Z,!1))},this.getSize=function(b){return b.set(et,Z)},this.setSize=function(b,D,X=!0){if(Re.isPresenting){ke("WebGLRenderer: Can't change size while VR device is presenting.");return}et=b,Z=D,t.width=Math.floor(b*ee),t.height=Math.floor(D*ee),X===!0&&(t.style.width=b+"px",t.style.height=D+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,b,D)},this.getDrawingBufferSize=function(b){return b.set(et*ee,Z*ee).floor()},this.setDrawingBufferSize=function(b,D,X){et=b,Z=D,ee=X,t.width=Math.floor(b*X),t.height=Math.floor(D*X),this.setViewport(0,0,b,D)},this.setEffects=function(b){if(x===Zt){je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let D=0;D<b.length;D++)if(b[D].isOutputPass===!0){ke("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(ne)},this.getViewport=function(b){return b.copy(Me)},this.setViewport=function(b,D,X,O){b.isVector4?Me.set(b.x,b.y,b.z,b.w):Me.set(b,D,X,O),v.viewport(ne.copy(Me).multiplyScalar(ee).round())},this.getScissor=function(b){return b.copy(Oe)},this.setScissor=function(b,D,X,O){b.isVector4?Oe.set(b.x,b.y,b.z,b.w):Oe.set(b,D,X,O),v.scissor(Pe.copy(Oe).multiplyScalar(ee).round())},this.getScissorTest=function(){return ct},this.setScissorTest=function(b){v.setScissorTest(ct=b)},this.setOpaqueSort=function(b){_e=b},this.setTransparentSort=function(b){Fe=b},this.getClearColor=function(b){return b.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(b=!0,D=!0,X=!0){let O=0;if(b){let B=!1;if(re!==null){const be=re.texture.format;B=g.has(be)}if(B){const be=re.texture.type,we=p.has(be),xe=Xe.getClearColor(),Te=Xe.getClearAlpha(),Ce=xe.r,qe=xe.g,Ke=xe.b;we?(T[0]=Ce,T[1]=qe,T[2]=Ke,T[3]=Te,L.clearBufferuiv(L.COLOR,0,T)):(R[0]=Ce,R[1]=qe,R[2]=Ke,R[3]=Te,L.clearBufferiv(L.COLOR,0,R))}else O|=L.COLOR_BUFFER_BIT}D&&(O|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(O|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&L.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),k=b},this.dispose=function(){t.removeEventListener("webglcontextlost",gt,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",nn,!1),Xe.dispose(),ve.dispose(),pe.dispose(),G.dispose(),le.dispose(),Q.dispose(),Se.dispose(),ie.dispose(),de.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",il),Re.removeEventListener("sessionend",rl),ni.stop()};function gt(b){b.preventDefault(),Rs("WebGLRenderer: Context Lost."),z=!0}function at(){Rs("WebGLRenderer: Context Restored."),z=!1;const b=N.autoReset,D=Ne.enabled,X=Ne.autoUpdate,O=Ne.needsUpdate,B=Ne.type;ze(),N.autoReset=b,Ne.enabled=D,Ne.autoUpdate=X,Ne.needsUpdate=O,Ne.type=B}function nn(b){je("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function pn(b){const D=b.target;D.removeEventListener("dispose",pn),Zu(D)}function Zu(b){Ku(b),G.remove(b)}function Ku(b){const D=G.get(b).programs;D!==void 0&&(D.forEach(function(X){de.releaseProgram(X)}),b.isShaderMaterial&&de.releaseShaderCache(b))}this.renderBufferDirect=function(b,D,X,O,B,be){D===null&&(D=Ie);const we=B.isMesh&&B.matrixWorld.determinantAffine()<0,xe=ju(b,D,X,O,B);v.setMaterial(O,we);let Te=X.index,Ce=1;if(O.wireframe===!0){if(Te=$.getWireframeAttribute(X),Te===void 0)return;Ce=2}const qe=X.drawRange,Ke=X.attributes.position;let Ae=qe.start*Ce,ot=(qe.start+qe.count)*Ce;be!==null&&(Ae=Math.max(Ae,be.start*Ce),ot=Math.min(ot,(be.start+be.count)*Ce)),Te!==null?(Ae=Math.max(Ae,0),ot=Math.min(ot,Te.count)):Ke!=null&&(Ae=Math.max(Ae,0),ot=Math.min(ot,Ke.count));const Mt=ot-Ae;if(Mt<0||Mt===1/0)return;Se.setup(B,O,xe,X,Te);let _t,mt=me;if(Te!==null&&(_t=ce.get(Te),mt=J,mt.setIndex(_t)),B.isMesh)O.wireframe===!0?(v.setLineWidth(O.wireframeLinewidth*Ge()),mt.setMode(L.LINES)):mt.setMode(L.TRIANGLES);else if(B.isLine){let It=O.linewidth;It===void 0&&(It=1),v.setLineWidth(It*Ge()),B.isLineSegments?mt.setMode(L.LINES):B.isLineLoop?mt.setMode(L.LINE_LOOP):mt.setMode(L.LINE_STRIP)}else B.isPoints?mt.setMode(L.POINTS):B.isSprite&&mt.setMode(L.TRIANGLES);if(B.isBatchedMesh)if(Ze.get("WEBGL_multi_draw"))mt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const It=B._multiDrawStarts,ye=B._multiDrawCounts,Ot=B._multiDrawCount,tt=Te?ce.get(Te).bytesPerElement:1,Kt=G.get(O).currentProgram.getUniforms();for(let mn=0;mn<Ot;mn++)Kt.setValue(L,"_gl_DrawID",mn),mt.render(It[mn]/tt,ye[mn])}else if(B.isInstancedMesh)mt.renderInstances(Ae,Mt,B.count);else if(X.isInstancedBufferGeometry){const It=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,ye=Math.min(X.instanceCount,It);mt.renderInstances(Ae,Mt,ye)}else mt.render(Ae,Mt)};function nl(b,D,X,O){k!==null&&b.isNodeMaterial&&k.setObject(O,b),se===!0&&De.setState(b,X,!1),b.transparent===!0&&b.side===bn&&b.forceSinglePass===!1?(b.side=qt,b.needsUpdate=!0,Dr(b,D,O),b.side=jn,b.needsUpdate=!0,Dr(b,D,O),b.side=bn):Dr(b,D,O)}this.compile=function(b,D,X=null){X===null&&(X=b),k!==null&&k.renderStart(b,D,X),M=pe.get(X),M.init(D),_.push(M),X.traverseVisible(function(B){B.isLight&&B.layers.test(D.layers)&&(M.pushLight(B),B.castShadow&&M.pushShadow(B))}),b!==X&&b.traverseVisible(function(B){B.isLight&&B.layers.test(D.layers)&&(M.pushLight(B),B.castShadow&&M.pushShadow(B))}),M.setupLights(),k!==null&&k.updateLights(M.state.lightsArray),ae=this.localClippingEnabled,se=De.init(this.clippingPlanes,ae),se===!0&&De.setGlobalState(this.clippingPlanes,D),k!==null&&Ne.render(M.state.shadowsArray,X,D);const O=new Set;return b.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const be=B.material;if(be)if(Array.isArray(be))for(let we=0;we<be.length;we++){const xe=be[we];nl(xe,X,D,B),O.add(xe)}else nl(be,X,D,B),O.add(be)}),M=_.pop(),k!==null&&k.renderEnd(),O},this.compileAsync=function(b,D,X=null){const O=this.compile(b,D,X);return new Promise(B=>{function be(){if(O.forEach(function(we){const Te=G.get(we).currentProgram;(Te===void 0||Te.isReady())&&O.delete(we)}),O.size===0){B(b);return}setTimeout(be,10)}Ze.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let Vs=null;function Ju(b){Vs&&Vs(b)}function il(){ni.stop()}function rl(){ni.start()}const ni=new Cu;ni.setAnimationLoop(Ju),typeof self<"u"&&ni.setContext(self),this.setAnimationLoop=function(b){Vs=b,Re.setAnimationLoop(b),b===null?ni.stop():ni.start()},Re.addEventListener("sessionstart",il),Re.addEventListener("sessionend",rl),this.render=function(b,D){if(D!==void 0&&D.isCamera!==!0){je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(z===!0)return;k!==null&&k.renderStart(b,D);const X=Re.enabled===!0&&Re.isPresenting===!0,O=w!==null&&(re===null||X)&&w.begin(P,re);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(D),D=Re.getCamera()),b.isScene===!0&&b.onBeforeRender(P,b,D,re),M=pe.get(b,_.length),M.init(D),M.state.textureUnits=Y.getTextureUnits(),_.push(M),oe.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),te.setFromProjectionMatrix(oe,yn,D.reversedDepth),ae=this.localClippingEnabled,se=De.init(this.clippingPlanes,ae),y=ve.get(b,A.length),y.init(),A.push(y),Re.enabled===!0&&Re.isPresenting===!0){const we=P.xr.getDepthSensingMesh();we!==null&&Gs(we,D,-1/0,P.sortObjects)}Gs(b,D,0,P.sortObjects),y.finish(),k!==null&&k.updateLights(M.state.lightsArray),P.sortObjects===!0&&y.sort(_e,Fe),Be=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,Be&&Xe.addToRenderList(y,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),se===!0&&De.beginShadows();const B=M.state.shadowsArray;if(Ne.render(B,b,D),se===!0&&De.endShadows(),(O&&w.hasRenderPass())===!1){const we=y.opaque,xe=y.transmissive;if(M.setupLights(),D.isArrayCamera){const Te=D.cameras;if(xe.length>0)for(let Ce=0,qe=Te.length;Ce<qe;Ce++){const Ke=Te[Ce];al(we,xe,b,Ke)}Be&&Xe.render(b);for(let Ce=0,qe=Te.length;Ce<qe;Ce++){const Ke=Te[Ce];sl(y,b,Ke,Ke.viewport)}}else xe.length>0&&al(we,xe,b,D),Be&&Xe.render(b),sl(y,b,D)}re!==null&&H===0&&(Y.updateMultisampleRenderTarget(re),Y.updateRenderTargetMipmap(re)),O&&w.end(P),b.isScene===!0&&b.onAfterRender(P,b,D),Se.resetDefaultState(),q=-1,j=null,_.pop(),_.length>0?(M=_[_.length-1],Y.setTextureUnits(M.state.textureUnits),se===!0&&De.setGlobalState(P.clippingPlanes,M.state.camera)):M=null,A.pop(),A.length>0?y=A[A.length-1]:y=null,k!==null&&k.renderEnd()};function Gs(b,D,X,O){if(b.visible===!1)return;if(b.layers.test(D.layers)){if(b.isGroup)X=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(D);else if(b.isLightProbeGrid)M.pushLightProbeGrid(b);else if(b.isLight)M.pushLight(b),b.castShadow&&M.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(te)){O&&Ue.setFromMatrixPosition(b.matrixWorld).applyMatrix4(oe);const we=Q.update(b),xe=b.material;xe.visible&&y.push(b,we,xe,X,Ue.z,null,D)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(te))){const we=Q.update(b),xe=b.material;if(O&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ue.copy(b.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),Ue.copy(we.boundingSphere.center)),Ue.applyMatrix4(b.matrixWorld).applyMatrix4(oe)),Array.isArray(xe)){const Te=we.groups;for(let Ce=0,qe=Te.length;Ce<qe;Ce++){const Ke=Te[Ce],Ae=xe[Ke.materialIndex];Ae&&Ae.visible&&y.push(b,we,Ae,X,Ue.z,Ke,D)}}else xe.visible&&y.push(b,we,xe,X,Ue.z,null,D)}}const be=b.children;for(let we=0,xe=be.length;we<xe;we++)Gs(be[we],D,X,O)}function sl(b,D,X,O){const{opaque:B,transmissive:be,transparent:we}=b;M.setupLightsView(X),se===!0&&De.setGlobalState(P.clippingPlanes,X),O&&v.viewport(ne.copy(O)),B.length>0&&Lr(B,D,X),be.length>0&&Lr(be,D,X),we.length>0&&Lr(we,D,X),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function al(b,D,X,O){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[O.id]===void 0){const Ae=Ze.has("EXT_color_buffer_half_float")||Ze.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[O.id]=new un(1,1,{generateMipmaps:!0,type:Ae?Tn:Zt,minFilter:ui,samples:Math.max(4,E.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Qe.workingColorSpace})}const be=M.state.transmissionRenderTarget[O.id],we=O.viewport||ne;be.setSize(we.z*P.transmissionResolutionScale,we.w*P.transmissionResolutionScale);const xe=P.getRenderTarget(),Te=P.getActiveCubeFace(),Ce=P.getActiveMipmapLevel();P.setRenderTarget(be),P.getClearColor(it),$e=P.getClearAlpha(),$e<1&&P.setClearColor(16777215,.5),P.clear(),Be&&Xe.render(X);const qe=P.toneMapping;P.toneMapping=cn;const Ke=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),M.setupLightsView(O),se===!0&&De.setGlobalState(P.clippingPlanes,O),Lr(b,X,O),Y.updateMultisampleRenderTarget(be),Y.updateRenderTargetMipmap(be),Ze.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let ot=0,Mt=D.length;ot<Mt;ot++){const _t=D[ot],{object:mt,geometry:It,material:ye,group:Ot}=_t;if(ye.side===bn&&mt.layers.test(O.layers)){const tt=ye.side;ye.side=qt,ye.needsUpdate=!0,ol(mt,X,O,It,ye,Ot),ye.side=tt,ye.needsUpdate=!0,Ae=!0}}Ae===!0&&(Y.updateMultisampleRenderTarget(be),Y.updateRenderTargetMipmap(be))}P.setRenderTarget(xe,Te,Ce),P.setClearColor(it,$e),Ke!==void 0&&(O.viewport=Ke),P.toneMapping=qe}function Lr(b,D,X){const O=D.isScene===!0?D.overrideMaterial:null;for(let B=0,be=b.length;B<be;B++){const we=b[B],{object:xe,geometry:Te,group:Ce}=we;let qe=we.material;qe.allowOverride===!0&&O!==null&&(qe=O),xe.layers.test(X.layers)&&ol(xe,D,X,Te,qe,Ce)}}function ol(b,D,X,O,B,be){k!==null&&B.isNodeMaterial&&k.setObject(b,B),b.onBeforeRender(P,D,X,O,B,be),b.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),B.onBeforeRender(P,D,X,O,b,be),B.transparent===!0&&B.side===bn&&B.forceSinglePass===!1?(B.side=qt,B.needsUpdate=!0,P.renderBufferDirect(X,D,O,B,b,be),B.side=jn,B.needsUpdate=!0,P.renderBufferDirect(X,D,O,B,b,be),B.side=bn):P.renderBufferDirect(X,D,O,B,b,be),b.onAfterRender(P,D,X,O,B,be)}function Dr(b,D,X){D.isScene!==!0&&(D=Ie);const O=G.get(b),B=M.state.lights,be=M.state.shadowsArray,we=B.state.version,xe=de.getParameters(b,B.state,be,D,X,M.state.lightProbeGridArray),Te=de.getProgramCacheKey(xe);let Ce=O.programs;O.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?D.environment:null,O.fog=D.fog;const qe=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;O.envMap=le.get(b.envMap||O.environment,qe),O.envMapRotation=O.environment!==null&&b.envMap===null?D.environmentRotation:b.envMapRotation,Ce===void 0&&(b.addEventListener("dispose",pn),Ce=new Map,O.programs=Ce);let Ke=Ce.get(Te);if(Ke!==void 0){if(O.currentProgram===Ke&&O.lightsStateVersion===we)return cl(b,xe),Ke}else xe.uniforms=de.getUniforms(b),k!==null&&b.isNodeMaterial&&k.build(b,X,xe),b.onBeforeCompile(xe,P),Ke=de.acquireProgram(xe,Te),Ce.set(Te,Ke),O.uniforms=xe.uniforms;const Ae=O.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ae.clippingPlanes=De.uniform),cl(b,xe),O.needsLights=th(b),O.lightsStateVersion=we,O.needsLights&&(Ae.ambientLightColor.value=B.state.ambient,Ae.lightProbe.value=B.state.probe,Ae.sunLights.value=B.state.sun,Ae.sunLightShadows.value=B.state.sunShadow,Ae.directionalLights.value=B.state.directional,Ae.directionalLightShadows.value=B.state.directionalShadow,Ae.spotLights.value=B.state.spot,Ae.spotLightShadows.value=B.state.spotShadow,Ae.rectAreaLights.value=B.state.rectArea,Ae.ltc_1.value=B.state.rectAreaLTC1,Ae.ltc_2.value=B.state.rectAreaLTC2,Ae.pointLights.value=B.state.point,Ae.pointLightShadows.value=B.state.pointShadow,Ae.hemisphereLights.value=B.state.hemi,Ae.sunShadowMatrix.value=B.state.sunShadowMatrix,Ae.sunShadowCascade.value=B.state.sunShadowCascade,Ae.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ae.spotLightMatrix.value=B.state.spotLightMatrix,Ae.spotLightMap.value=B.state.spotLightMap,Ae.pointShadowMatrix.value=B.state.pointShadowMatrix),O.lightProbeGrid=M.state.lightProbeGridArray.length>0,O.currentProgram=Ke,O.uniformsList=null,Ke}function ll(b){if(b.uniformsList===null){const D=b.currentProgram.getUniforms();b.uniformsList=bs.seqWithValue(D.seq,b.uniforms)}return b.uniformsList}function cl(b,D){const X=G.get(b);X.outputColorSpace=D.outputColorSpace,X.batching=D.batching,X.batchingColor=D.batchingColor,X.instancing=D.instancing,X.instancingColor=D.instancingColor,X.instancingMorph=D.instancingMorph,X.skinning=D.skinning,X.morphTargets=D.morphTargets,X.morphNormals=D.morphNormals,X.morphColors=D.morphColors,X.morphTargetsCount=D.morphTargetsCount,X.numClippingPlanes=D.numClippingPlanes,X.numIntersection=D.numClipIntersection,X.vertexAlphas=D.vertexAlphas,X.vertexTangents=D.vertexTangents,X.toneMapping=D.toneMapping}function Qu(b,D){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;S.setFromMatrixPosition(D.matrixWorld);for(let X=0,O=b.length;X<O;X++){const B=b[X];if(B.texture!==null&&B.boundingBox.containsPoint(S))return B}return null}function ju(b,D,X,O,B){D.isScene!==!0&&(D=Ie),Y.resetTextureUnits();const be=D.fog,we=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?D.environment:null,xe=re===null?P.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:Qe.workingColorSpace,Te=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,Ce=le.get(O.envMap||we,Te),qe=O.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Ke=!!X.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Ae=!!X.morphAttributes.position,ot=!!X.morphAttributes.normal,Mt=!!X.morphAttributes.color;let _t=cn;O.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(_t=P.toneMapping);const mt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,It=mt!==void 0?mt.length:0,ye=G.get(O),Ot=M.state.lights;if(se===!0&&(ae===!0||b!==j)){const vt=b===j&&O.id===q;De.setState(O,b,vt)}let tt=!1;O.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==Ot.state.version||ye.outputColorSpace!==xe||B.isBatchedMesh&&ye.batching===!1||!B.isBatchedMesh&&ye.batching===!0||B.isBatchedMesh&&ye.batchingColor===!0&&B._colorsTexture===null||B.isBatchedMesh&&ye.batchingColor===!1&&B._colorsTexture!==null||B.isInstancedMesh&&ye.instancing===!1||!B.isInstancedMesh&&ye.instancing===!0||B.isSkinnedMesh&&ye.skinning===!1||!B.isSkinnedMesh&&ye.skinning===!0||B.isInstancedMesh&&ye.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&ye.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&ye.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&ye.instancingMorph===!1&&B.morphTexture!==null||ye.envMap!==Ce||O.fog===!0&&ye.fog!==be||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==De.numPlanes||ye.numIntersection!==De.numIntersection)||ye.vertexAlphas!==qe||ye.vertexTangents!==Ke||ye.morphTargets!==Ae||ye.morphNormals!==ot||ye.morphColors!==Mt||ye.toneMapping!==_t||ye.morphTargetsCount!==It||!!ye.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(tt=!0):(tt=!0,ye.__version=O.version);let Kt=ye.currentProgram;tt===!0&&(Kt=Dr(O,D,B),k&&O.isNodeMaterial&&k.onUpdateProgram(O,Kt,ye));let mn=!1,Bn=!1,Si=!1;const dt=Kt.getUniforms(),bt=ye.uniforms;if(v.useProgram(Kt.program)&&(mn=!0,Bn=!0,Si=!0),O.id!==q&&(q=O.id,Bn=!0),ye.needsLights){const vt=Qu(M.state.lightProbeGridArray,B);ye.lightProbeGrid!==vt&&(ye.lightProbeGrid=vt,Bn=!0)}if(mn||j!==b){v.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),dt.setValue(L,"projectionMatrix",b.projectionMatrix),dt.setValue(L,"viewMatrix",b.matrixWorldInverse);const Gn=dt.map.cameraPosition;Gn!==void 0&&Gn.setValue(L,ue.setFromMatrixPosition(b.matrixWorld)),E.logarithmicDepthBuffer&&dt.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&dt.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),j!==b&&(j=b,Bn=!0,Si=!0)}if(ye.needsLights&&(Ot.state.sunShadowMap.length>0&&dt.setValue(L,"sunShadowMap",Ot.state.sunShadowMap,Y),Ot.state.directionalShadowMap.length>0&&dt.setValue(L,"directionalShadowMap",Ot.state.directionalShadowMap,Y),Ot.state.spotShadowMap.length>0&&dt.setValue(L,"spotShadowMap",Ot.state.spotShadowMap,Y),Ot.state.pointShadowMap.length>0&&dt.setValue(L,"pointShadowMap",Ot.state.pointShadowMap,Y)),B.isSkinnedMesh){dt.setOptional(L,B,"bindMatrix"),dt.setOptional(L,B,"bindMatrixInverse");const vt=B.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),dt.setValue(L,"boneTexture",vt.boneTexture,Y))}B.isBatchedMesh&&(dt.setOptional(L,B,"batchingTexture"),dt.setValue(L,"batchingTexture",B._matricesTexture,Y),dt.setOptional(L,B,"batchingIdTexture"),dt.setValue(L,"batchingIdTexture",B._indirectTexture,Y),dt.setOptional(L,B,"batchingColorTexture"),B._colorsTexture!==null&&dt.setValue(L,"batchingColorTexture",B._colorsTexture,Y));const Vn=X.morphAttributes;if((Vn.position!==void 0||Vn.normal!==void 0||Vn.color!==void 0)&&I.update(B,X,Kt),(Bn||ye.receiveShadow!==B.receiveShadow)&&(ye.receiveShadow=B.receiveShadow,dt.setValue(L,"receiveShadow",B.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&D.environment!==null&&(bt.envMapIntensity.value=D.environmentIntensity),bt.dfgLUT!==void 0&&(bt.dfgLUT.value=wv()),Bn){if(dt.setValue(L,"toneMappingExposure",P.toneMappingExposure),ye.needsLights&&eh(bt,Si),be&&O.fog===!0&&Le.refreshFogUniforms(bt,be),Le.refreshMaterialUniforms(bt,O,ee,Z,M.state.transmissionRenderTarget[b.id]),ye.needsLights&&ye.lightProbeGrid){const vt=ye.lightProbeGrid;bt.probesSH.value=vt.texture,bt.probesMin.value.copy(vt.boundingBox.min),bt.probesMax.value.copy(vt.boundingBox.max),bt.probesResolution.value.copy(vt.resolution)}bs.upload(L,ll(ye),bt,Y)}if(O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(bs.upload(L,ll(ye),bt,Y),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&dt.setValue(L,"center",B.center),dt.setValue(L,"modelViewMatrix",B.modelViewMatrix),dt.setValue(L,"normalMatrix",B.normalMatrix),dt.setValue(L,"modelMatrix",B.matrixWorld),O.uniformsGroups!==void 0){const vt=O.uniformsGroups;for(let Gn=0,Mi=vt.length;Gn<Mi;Gn++){const hl=vt[Gn];ie.update(hl,Kt),ie.bind(hl,Kt)}}return Kt}function eh(b,D){b.ambientLightColor.needsUpdate=D,b.lightProbe.needsUpdate=D,b.sunLights.needsUpdate=D,b.sunLightShadows.needsUpdate=D,b.directionalLights.needsUpdate=D,b.directionalLightShadows.needsUpdate=D,b.pointLights.needsUpdate=D,b.pointLightShadows.needsUpdate=D,b.spotLights.needsUpdate=D,b.spotLightShadows.needsUpdate=D,b.rectAreaLights.needsUpdate=D,b.hemisphereLights.needsUpdate=D}function th(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return re},this.setRenderTargetTextures=function(b,D,X){const O=G.get(b);O.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),G.get(b.texture).__webglTexture=D,G.get(b.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:X,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,D){const X=G.get(b);X.__webglFramebuffer=D,X.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(b,D=0,X=0){re=b,K=D,H=X;let O=null,B=!1,be=!1;if(b){const xe=G.get(b);if(xe.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(L.FRAMEBUFFER,xe.__webglFramebuffer),ne.copy(b.viewport),Pe.copy(b.scissor),Ee=b.scissorTest,v.viewport(ne),v.scissor(Pe),v.setScissorTest(Ee),q=-1;return}else if(xe.__webglFramebuffer===void 0)Y.setupRenderTarget(b);else if(xe.__hasExternalTextures)Y.rebindTextures(b,G.get(b.texture).__webglTexture,G.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const qe=b.depthTexture;if(xe.__boundDepthTexture!==qe){if(qe!==null&&G.has(qe)&&(b.width!==qe.image.width||b.height!==qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(b)}}const Te=b.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(be=!0);const Ce=G.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ce[D])?O=Ce[D][X]:O=Ce[D],B=!0):b.samples>0&&Y.useMultisampledRTT(b)===!1?O=G.get(b).__webglMultisampledFramebuffer:Array.isArray(Ce)?O=Ce[X]:O=Ce,ne.copy(b.viewport),Pe.copy(b.scissor),Ee=b.scissorTest}else ne.copy(Me).multiplyScalar(ee).floor(),Pe.copy(Oe).multiplyScalar(ee).floor(),Ee=ct;if(X!==0&&(O=V),v.bindFramebuffer(L.FRAMEBUFFER,O)&&v.drawBuffers(b,O),v.viewport(ne),v.scissor(Pe),v.setScissorTest(Ee),B){const xe=G.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+D,xe.__webglTexture,X)}else if(be){const xe=D;for(let Te=0;Te<b.textures.length;Te++){const Ce=G.get(b.textures[Te]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Te,Ce.__webglTexture,X,xe)}}else if(b!==null&&X!==0){const xe=G.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,xe.__webglTexture,X)}q=-1};function ul(b){const D=G.get(b);return(D.__readFormat!==b.format||D.__readType!==b.type)&&(D.__readFormat=b.format,D.__readType=b.type,D.__formatReadable=E.textureFormatReadable(b.format),D.__typeReadable=E.textureTypeReadable(b.type)),D}this.readRenderTargetPixels=function(b,D,X,O,B,be,we,xe=0){if(!(b&&b.isWebGLRenderTarget)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=G.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&we!==void 0&&(Te=Te[we]),Te){v.bindFramebuffer(L.FRAMEBUFFER,Te);try{const Ce=b.textures[xe],qe=Ce.format,Ke=Ce.type;b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+xe);const Ae=ul(Ce);if(Ae.__formatReadable===!1){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ae.__typeReadable===!1){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=b.width-O&&X>=0&&X<=b.height-B&&L.readPixels(D,X,O,B,ge.convert(qe),ge.convert(Ke),be)}finally{const Ce=re!==null?G.get(re).__webglFramebuffer:null;v.bindFramebuffer(L.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(b,D,X,O,B,be,we,xe=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=G.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&we!==void 0&&(Te=Te[we]),Te)if(D>=0&&D<=b.width-O&&X>=0&&X<=b.height-B){v.bindFramebuffer(L.FRAMEBUFFER,Te);const Ce=b.textures[xe],qe=Ce.format,Ke=Ce.type;b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+xe);const Ae=ul(Ce);if(Ae.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ae.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ot=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,ot),L.bufferData(L.PIXEL_PACK_BUFFER,be.byteLength,L.STREAM_READ),L.readPixels(D,X,O,B,ge.convert(qe),ge.convert(Ke),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);const Mt=re!==null?G.get(re).__webglFramebuffer:null;v.bindFramebuffer(L.FRAMEBUFFER,Mt);const _t=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await kh(L,_t,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,ot),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,be),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(ot),L.deleteSync(_t),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,D=null,X=0){const O=Math.pow(2,-X),B=Math.floor(b.image.width*O),be=Math.floor(b.image.height*O),we=D!==null?D.x:0,xe=D!==null?D.y:0;Y.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,X,0,0,we,xe,B,be),v.unbindTexture()},this.copyTextureToTexture=function(b,D,X=null,O=null,B=0,be=0){let we,xe,Te,Ce,qe,Ke,Ae,ot,Mt;const _t=b.isCompressedTexture?b.mipmaps[be]:b.image;if(X!==null)we=X.max.x-X.min.x,xe=X.max.y-X.min.y,Te=X.isBox3?X.max.z-X.min.z:1,Ce=X.min.x,qe=X.min.y,Ke=X.isBox3?X.min.z:0;else{const bt=Math.pow(2,-B);we=Math.floor(_t.width*bt),xe=Math.floor(_t.height*bt),b.isDataArrayTexture?Te=_t.depth:b.isData3DTexture?Te=Math.floor(_t.depth*bt):Te=1,Ce=0,qe=0,Ke=0}O!==null?(Ae=O.x,ot=O.y,Mt=O.z):(Ae=0,ot=0,Mt=0);const mt=ge.convert(D.format),It=ge.convert(D.type);let ye;D.isData3DTexture?(Y.setTexture3D(D,0),ye=L.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Y.setTexture2DArray(D,0),ye=L.TEXTURE_2D_ARRAY):(Y.setTexture2D(D,0),ye=L.TEXTURE_2D),v.activeTexture(L.TEXTURE0),v.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,D.flipY),v.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),v.pixelStorei(L.UNPACK_ALIGNMENT,D.unpackAlignment);const Ot=v.getParameter(L.UNPACK_ROW_LENGTH),tt=v.getParameter(L.UNPACK_IMAGE_HEIGHT),Kt=v.getParameter(L.UNPACK_SKIP_PIXELS),mn=v.getParameter(L.UNPACK_SKIP_ROWS),Bn=v.getParameter(L.UNPACK_SKIP_IMAGES);v.pixelStorei(L.UNPACK_ROW_LENGTH,_t.width),v.pixelStorei(L.UNPACK_IMAGE_HEIGHT,_t.height),v.pixelStorei(L.UNPACK_SKIP_PIXELS,Ce),v.pixelStorei(L.UNPACK_SKIP_ROWS,qe),v.pixelStorei(L.UNPACK_SKIP_IMAGES,Ke);const Si=b.isDataArrayTexture||b.isData3DTexture,dt=D.isDataArrayTexture||D.isData3DTexture;if(b.isDepthTexture){const bt=G.get(b),Vn=G.get(D),vt=G.get(bt.__renderTarget),Gn=G.get(Vn.__renderTarget);v.bindFramebuffer(L.READ_FRAMEBUFFER,vt.__webglFramebuffer),v.bindFramebuffer(L.DRAW_FRAMEBUFFER,Gn.__webglFramebuffer);for(let Mi=0;Mi<Te;Mi++)Si&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,G.get(b).__webglTexture,B,Ke+Mi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,G.get(D).__webglTexture,be,Mt+Mi)),L.blitFramebuffer(Ce,qe,we,xe,Ae,ot,we,xe,L.DEPTH_BUFFER_BIT,L.NEAREST);v.bindFramebuffer(L.READ_FRAMEBUFFER,null),v.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(B!==0||b.isRenderTargetTexture||G.has(b)){const bt=G.get(b),Vn=G.get(D);v.bindFramebuffer(L.READ_FRAMEBUFFER,U),v.bindFramebuffer(L.DRAW_FRAMEBUFFER,F);for(let vt=0;vt<Te;vt++)Si?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,bt.__webglTexture,B,Ke+vt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,bt.__webglTexture,B),dt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Vn.__webglTexture,be,Mt+vt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Vn.__webglTexture,be),B!==0?L.blitFramebuffer(Ce,qe,we,xe,Ae,ot,we,xe,L.COLOR_BUFFER_BIT,L.NEAREST):dt?L.copyTexSubImage3D(ye,be,Ae,ot,Mt+vt,Ce,qe,we,xe):L.copyTexSubImage2D(ye,be,Ae,ot,Ce,qe,we,xe);v.bindFramebuffer(L.READ_FRAMEBUFFER,null),v.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else dt?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(ye,be,Ae,ot,Mt,we,xe,Te,mt,It,_t.data):D.isCompressedArrayTexture?L.compressedTexSubImage3D(ye,be,Ae,ot,Mt,we,xe,Te,mt,_t.data):L.texSubImage3D(ye,be,Ae,ot,Mt,we,xe,Te,mt,It,_t):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,be,Ae,ot,we,xe,mt,It,_t.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,be,Ae,ot,_t.width,_t.height,mt,_t.data):L.texSubImage2D(L.TEXTURE_2D,be,Ae,ot,we,xe,mt,It,_t);v.pixelStorei(L.UNPACK_ROW_LENGTH,Ot),v.pixelStorei(L.UNPACK_IMAGE_HEIGHT,tt),v.pixelStorei(L.UNPACK_SKIP_PIXELS,Kt),v.pixelStorei(L.UNPACK_SKIP_ROWS,mn),v.pixelStorei(L.UNPACK_SKIP_IMAGES,Bn),be===0&&D.generateMipmaps&&L.generateMipmap(ye),v.unbindTexture()},this.initRenderTarget=function(b){G.get(b).__webglFramebuffer===void 0&&Y.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Y.setTextureCube(b,0):b.isData3DTexture?Y.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Y.setTexture2DArray(b,0):Y.setTexture2D(b,0),v.unbindTexture()},this.resetState=function(){K=0,H=0,re=null,v.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}const Sc=new On,us=new C;class ku extends Sd{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new wt(e,3)),this.setAttribute("uv",new wt(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new bo(t,6,1);return this.setAttribute("instanceStart",new Jn(n,3,0)),this.setAttribute("instanceEnd",new Jn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new bo(t,6,1);return this.setAttribute("instanceColorStart",new Jn(n,3,0)),this.setAttribute("instanceColorEnd",new Jn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new ld(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new On);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Sc.setFromBufferAttribute(t),this.boundingBox.union(Sc))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new er),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)us.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(us)),us.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(us));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}he.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new fe},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Xt.line={uniforms:Zo.merge([he.common,he.fog,he.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class Fu extends dn{constructor(e){super({type:"LineMaterial",uniforms:Zo.clone(Xt.line.uniforms),vertexShader:Xt.line.vertexShader,fragmentShader:Xt.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Ta=new pt,Mc=new C,yc=new C,Rt=new pt,Ct=new pt,_n=new pt,Aa=new C,Ra=new lt,Pt=new Ad,wc=new C,hs=new On,fs=new er,xn=new pt;let Sn,di;function Ec(i,e,t){return xn.set(0,0,-e,1).applyMatrix4(i.projectionMatrix),xn.multiplyScalar(1/xn.w),xn.x=di/t.width,xn.y=di/t.height,xn.applyMatrix4(i.projectionMatrixInverse),xn.multiplyScalar(1/xn.w),Math.abs(Math.max(xn.x,xn.y))}function Tv(i,e){const t=i.matrixWorld,n=i.geometry,r=n.attributes.instanceStart,s=n.attributes.instanceEnd,a=Math.min(n.instanceCount,r.count);for(let o=0,l=a;o<l;o++){Pt.start.fromBufferAttribute(r,o),Pt.end.fromBufferAttribute(s,o),Pt.applyMatrix4(t);const c=new C,u=new C;Sn.distanceSqToSegment(Pt.start,Pt.end,u,c),u.distanceTo(c)<di*.5&&e.push({point:u,pointOnLine:c,distance:Sn.origin.distanceTo(u),object:i,face:null,faceIndex:o,uv:null,uv1:null})}}function Av(i,e,t){const n=e.projectionMatrix,s=i.material.resolution,a=i.matrixWorld,o=i.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,u=Math.min(o.instanceCount,l.count),f=-e.near;Sn.at(1,_n),_n.w=1,_n.applyMatrix4(e.matrixWorldInverse),_n.applyMatrix4(n),_n.multiplyScalar(1/_n.w),_n.x*=s.x/2,_n.y*=s.y/2,_n.z=0,Aa.copy(_n),Ra.multiplyMatrices(e.matrixWorldInverse,a);for(let h=0,d=u;h<d;h++){if(Rt.fromBufferAttribute(l,h),Ct.fromBufferAttribute(c,h),Rt.w=1,Ct.w=1,Rt.applyMatrix4(Ra),Ct.applyMatrix4(Ra),Rt.z>f&&Ct.z>f)continue;if(Rt.z>f){const R=Rt.z-Ct.z,S=(Rt.z-f)/R;Rt.lerp(Ct,S)}else if(Ct.z>f){const R=Ct.z-Rt.z,S=(Ct.z-f)/R;Ct.lerp(Rt,S)}Rt.applyMatrix4(n),Ct.applyMatrix4(n),Rt.multiplyScalar(1/Rt.w),Ct.multiplyScalar(1/Ct.w),Rt.x*=s.x/2,Rt.y*=s.y/2,Ct.x*=s.x/2,Ct.y*=s.y/2,Pt.start.copy(Rt),Pt.start.z=0,Pt.end.copy(Ct),Pt.end.z=0;const x=Pt.closestPointToPointParameter(Aa,!0);Pt.at(x,wc);const g=tf.lerp(Rt.z,Ct.z,x),p=g>=-1&&g<=1,T=Aa.distanceTo(wc)<di*.5;if(p&&T){Pt.start.fromBufferAttribute(l,h),Pt.end.fromBufferAttribute(c,h),Pt.start.applyMatrix4(a),Pt.end.applyMatrix4(a);const R=new C,S=new C;Sn.distanceSqToSegment(Pt.start,Pt.end,S,R),t.push({point:S,pointOnLine:R,distance:Sn.origin.distanceTo(S),object:i,face:null,faceIndex:h,uv:null,uv1:null})}}}class Rv extends fn{constructor(e=new ku,t=new Fu({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)Mc.fromBufferAttribute(t,a),yc.fromBufferAttribute(n,a),r[o]=o===0?0:r[o-1],r[o+1]=r[o]+Mc.distanceTo(yc);const s=new bo(r,2,1);return e.setAttribute("instanceDistanceStart",new Jn(s,1,0)),e.setAttribute("instanceDistanceEnd",new Jn(s,1,1)),this}raycast(e,t){const n=this.material.worldUnits,r=e.camera;if(r===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;Sn=e.ray;const a=this.matrixWorld,o=this.geometry,l=this.material;di=l.linewidth+s,o.boundingSphere===null&&o.computeBoundingSphere(),fs.copy(o.boundingSphere).applyMatrix4(a);let c;if(n)c=di*.5;else{const f=Math.max(r.near,fs.distanceToPoint(Sn.origin));c=Ec(r,f,l.resolution)}if(fs.radius+=c,Sn.intersectsSphere(fs)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),hs.copy(o.boundingBox).applyMatrix4(a);let u;if(n)u=di*.5;else{const f=Math.max(r.near,hs.distanceToPoint(Sn.origin));u=Ec(r,f,l.resolution)}hs.expandByScalar(u),Sn.intersectsBox(hs)!==!1&&(n?Tv(this,t):Av(this,r,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Ta),this.material.uniforms.resolution.value.set(Ta.z,Ta.w))}}const Cv={"farbe.hell.grund":"#F5F7F9","farbe.hell.flaeche":"#FDFDFE","farbe.hell.flaeche-2":"#EEF0F3","farbe.hell.linie":"#DDE0E3","farbe.hell.linie-stark":"#C8CBCE","farbe.hell.text":"#1B2025","farbe.hell.text-2":"#595E64","farbe.hell.text-3":"#82878C","farbe.hell.akzent":"#3A69AD","farbe.hell.akzent-flaeche":"#DFECFF","farbe.hell.auf-akzent":"#FFFFFF","farbe.hell.viewport":"#E6E8EA","farbe.hell.erfolg":"#227849","farbe.hell.erfolg-flaeche":"#DAF3E1","farbe.hell.warnung":"#CD9130","farbe.hell.warnung-text":"#7E5403","farbe.hell.warnung-flaeche":"#FAE9CE","farbe.hell.fehler":"#C13C36","farbe.hell.fehler-flaeche":"#FFE0DB","farbe.dunkel.grund":"#0D1012","farbe.dunkel.flaeche":"#15171A","farbe.dunkel.flaeche-2":"#1E2124","farbe.dunkel.linie":"#2B2E32","farbe.dunkel.linie-stark":"#3A3D41","farbe.dunkel.text":"#E6E8EA","farbe.dunkel.text-2":"#A1A5A9","farbe.dunkel.text-3":"#777B7F","farbe.dunkel.akzent":"#79A6E9","farbe.dunkel.akzent-flaeche":"#1E2E47","farbe.dunkel.auf-akzent":"#0D1012","farbe.dunkel.viewport":"#1B1D20","farbe.dunkel.erfolg":"#60BB83","farbe.dunkel.erfolg-flaeche":"#12301E","farbe.dunkel.warnung":"#EBB25F","farbe.dunkel.warnung-text":"#EBB25F","farbe.dunkel.warnung-flaeche":"#3C2A0E","farbe.dunkel.fehler":"#ED756A","farbe.dunkel.fehler-flaeche":"#3E1F1B","achse.x":"#DB423C","achse.y":"#3BA946","achse.z":"#2B7AD6","schrift.familie.ui":"Inter, system-ui, sans-serif","schrift.familie.mono":'"JetBrains Mono", ui-monospace, monospace',"schrift.merkmale":'"tnum" 1, "cv05" 1',"schrift.schnitt.normal":"400","schrift.schnitt.mittel":"500","schrift.schnitt.halbfett":"600","schrift.groesse.klein":"12px","schrift.groesse.basis":"13px","schrift.groesse.gross":"14px","schrift.groesse.titel":"16px","schrift.groesse.ueberschrift":"20px","schrift.groesse.anzeige":"24px","schrift.zeilenhoehe":"1.45","schrift.groesse-tablet.basis":"15px","abstand.1":"4px","abstand.2":"8px","abstand.3":"12px","abstand.4":"16px","abstand.5":"24px","abstand.6":"32px","radius.klein":"4px","radius.mittel":"6px","radius.gross":"8px","radius.karte":"12px","linie.breite":"1px","bedienflaeche.desktop":"28px","bedienflaeche.tablet":"44px","bewegung.kurz":"120ms","bewegung.mittel":"200ms","bewegung.kurve":"cubic-bezier(0.2, 0, 0, 1)","symbol.satz":"Lucide"},Pv=30,Tc=2,Lv="text";class Dv{constructor(e){this.zone=e,this.canvas=document.createElement("canvas"),this.canvas.dataset.modell="1",e.appendChild(this.canvas),this.renderer=new Ev({canvas:this.canvas,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.toneMapping=cn,this.renderer.setPixelRatio(1),this.scene.add(this.camera),this.scene.add(this.modell),this.scene.add(this.overlay),this.camera.add(this.licht.umgebung),this.camera.add(this.licht.gerichtet),this.camera.add(this.licht.gerichtet.target),this.licht.gerichtet.position.set(-20,100,30),this.licht.gerichtet.target.position.set(0,0,-100),this.setThema("hell"),new ResizeObserver(()=>this.groesseAnpassen()).observe(e),this.groesseAnpassen()}canvas;renderer;scene=new gf;camera=new en(30,1,1,6e3);licht={umgebung:new bd,gerichtet:new xd};modell=new fi;overlay=new fi;objekte=[];zeichnung=null;thema="hell";angefordert=!1;tween=null;konturBreite=3;auswahl=new Set;hover=null;konturen=[];kantenCache=null;raycaster=new wd;kamera={azimut:35,hoehe:28,abstand:260,ziel:new C(0,0,15)};zonenGroesse={breite:800,hoehe:600};aufRender=null;farbe(e){return new Je(Cv[`farbe.${this.thema}.${e}`])}lichter(){return[{art:"gerichtet",intensitaet:this.licht.gerichtet.intensity},{art:"umgebung",intensitaet:this.licht.umgebung.intensity}]}setThema(e){this.thema=e,this.renderer.setClearColor(this.farbe("viewport")),this.licht.umgebung.intensity=e==="hell"?.6:4,this.licht.gerichtet.intensity=e==="hell"?1.8:26,this.zeichnung&&this.zeichne(this.zeichnung),this.anfordern()}groesseAnpassen(){const e=this.zone.getBoundingClientRect(),t=Math.max(200,Math.round(e.width)),n=Math.max(200,Math.round(e.height));this.zonenGroesse={breite:t,hoehe:n},this.renderer.setSize(t,n,!1),this.canvas.style.width=`${t}px`,this.canvas.style.height=`${n}px`,this.camera.aspect=t/n,this.camera.updateProjectionMatrix();for(const r of this.konturen)r.material.resolution.set(t,n);this.anfordern()}kameraSetzen(){const e=this.kamera,t=e.hoehe*Math.PI/180,n=e.azimut*Math.PI/180;this.camera.position.set(e.ziel.x+e.abstand*Math.cos(t)*Math.sin(n),e.ziel.y-e.abstand*Math.cos(t)*Math.cos(n),e.ziel.z+e.abstand*Math.sin(t)),this.camera.up.set(0,0,1),this.camera.lookAt(e.ziel),this.camera.updateMatrixWorld(!0)}drehen(e,t){this.kamera.azimut+=e,this.kamera.hoehe=Math.max(-89.5,Math.min(89.5,this.kamera.hoehe+t)),this.anfordern()}schieben(e,t){this.kameraSetzen();const n=2*this.kamera.abstand*Math.tan(this.camera.fov*Math.PI/360)/this.zonenGroesse.hoehe,r=new C().setFromMatrixColumn(this.camera.matrixWorld,0),s=new C().setFromMatrixColumn(this.camera.matrixWorld,1);this.kamera.ziel.addScaledVector(r,-e*n).addScaledVector(s,t*n),this.anfordern()}zoomen(e,t,n){const r=this.kamera.abstand,s=Math.max(20,Math.min(2500,r*e));if(t!==void 0&&n!==void 0){this.kameraSetzen();const a=this.canvas.getBoundingClientRect(),o=(t-a.left)/a.width*2-1,l=-((n-a.top)/a.height*2-1),c=2*r*Math.tan(this.camera.fov*Math.PI/360)/this.zonenGroesse.hoehe,u=new C().setFromMatrixColumn(this.camera.matrixWorld,0),f=new C().setFromMatrixColumn(this.camera.matrixWorld,1),h=o*this.zonenGroesse.breite/2,d=l*this.zonenGroesse.hoehe/2,m=(r-s)/r;this.kamera.ziel.addScaledVector(u,h*c*m).addScaledVector(f,d*c*m)}this.kamera.abstand=s,this.anfordern()}nach(e,t){const n={...this.kamera,ziel:this.kamera.ziel.clone()},r={azimut:e.azimut??n.azimut,hoehe:e.hoehe??n.hoehe,abstand:e.abstand??n.abstand,ziel:e.ziel??n.ziel.clone()};if(t<=0){this.kameraUebernehmen(r);return}const s=performance.now();this.tween={start:s,ende:s+t,von:n,nach:r},this.anfordern()}kameraUebernehmen(e){this.kamera.azimut=e.azimut,this.kamera.hoehe=e.hoehe,this.kamera.abstand=e.abstand,this.kamera.ziel.copy(e.ziel),this.anfordern()}einpassen(){this.tween=null;const e=this.alleEckpunkte();if(!e.length)return;const t=new On().setFromPoints(e),n=t.getCenter(new C);this.kamera.ziel.copy(n);const r=t.getSize(new C).length();this.kamera.abstand=Math.max(60,r*2.2);const s=.75*Math.min(this.zonenGroesse.breite,this.zonenGroesse.hoehe);for(let a=0;a<8;a++){this.kameraSetzen();const o=this.pixelBox(e),l=Math.max(o.x1-o.x0,o.y1-o.y0);this.kamera.abstand=Math.max(30,this.kamera.abstand*l/s),this.kameraSetzen();const c=this.pixelBox(e),u=(c.x0+c.x1)/2-this.zonenGroesse.breite/2,f=(c.y0+c.y1)/2-this.zonenGroesse.hoehe/2,h=2*this.kamera.abstand*Math.tan(this.camera.fov*Math.PI/360)/this.zonenGroesse.hoehe,d=new C().setFromMatrixColumn(this.camera.matrixWorld,0),m=new C().setFromMatrixColumn(this.camera.matrixWorld,1);this.kamera.ziel.addScaledVector(d,u*h).addScaledVector(m,-f*h)}this.kameraSetzen(),this.anfordern()}alleEckpunkte(){const e=[];for(const t of this.objekte)if(!(!t.koerper.sichtbar||t.geist||t.gestrichelt))for(const n of t.flaechen){const r=n.geometry.getAttribute("position");for(let s=0;s<r.count;s+=1)e.push(new C().fromBufferAttribute(r,s).applyMatrix4(n.matrixWorld))}return e}pixelBox(e){let t=1/0,n=1/0,r=-1/0,s=-1/0;const a=new C;for(const o of e){a.copy(o).project(this.camera);const l=(a.x*.5+.5)*this.zonenGroesse.breite,c=(1-(a.y*.5+.5))*this.zonenGroesse.hoehe;t=Math.min(t,l),n=Math.min(n,c),r=Math.max(r,l),s=Math.max(s,c)}return{x0:t,y0:n,x1:r,y1:s}}zeichne(e){this.zeichnung=e;for(const a of this.objekte)a.gruppe.traverse(o=>{o.geometry?.dispose()}),this.modell.remove(a.gruppe);this.objekte=[],this.overlay.clear();const t=this.farbe("flaeche-2"),n=this.farbe(Lv),r=this.farbe("text-3"),s=[...e.koerper,...e.zusatz.map(a=>({...a,schritt:`${a.schritt}#geist`}))];for(const a of s){const l=a.schritt.endsWith("#geist")||e.geister.has(a.schritt),c=e.gestrichelt.has(a.schritt),u=this.bauen(a,l,c,e,t,n,r);this.objekte.push(u),this.modell.add(u.gruppe)}for(const a of e.skizzen)this.overlay.add(this.skizzenLinie(a));this.modell.updateMatrixWorld(!0),this.kantenCache=null,this.konturenAktualisieren(),this.anfordern()}skizzenLinie(e){const t=[],n=e.mitte.u-e.laenge/2,r=e.mitte.u+e.laenge/2,s=e.mitte.v-e.breite/2,a=e.mitte.v+e.breite/2,o=Math.min(e.eckradius,e.laenge/2,e.breite/2),l=(u,f,h)=>{for(let d=0;d<=8;d++){const m=h+Math.PI/2*d/8;t.push(new C(u+o*Math.cos(m),f+o*Math.sin(m),0))}};o>0?(l(r-o,a-o,0),l(n+o,a-o,Math.PI/2),l(n+o,s+o,Math.PI),l(r-o,s+o,3*Math.PI/2)):(t.push(new C(r,a,0),new C(n,a,0)),t.push(new C(n,s,0),new C(r,s,0))),t.push(t[0]);const c=new pu(new Ft().setFromPoints(t),new Gi({color:this.farbe("text")}));return c.applyMatrix4(wo(e.ebene,0)),c}bauen(e,t,n,r,s,a,o){const l=new fi,c=kv(e),u=[],f=[],h=r.darstellung==="durchsicht",d=r.darstellung==="kanten",m=e.sichtbar;for(const x of c){r.verlauf&&!t&&Fv(x,this.farbe("flaeche-2"),this.farbe("fehler"));const g=new Rf(x,Pv),p=g.getAttribute("position");for(let S=0;S<p.count;S++)f.push(p.getX(S),p.getY(S),p.getZ(S));const T=new dd({color:t?o:r.verlauf?new Je(1,1,1):s,vertexColors:r.verlauf&&!t,flatShading:!0,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1,side:e.art==="zylinder"?bn:jn,transparent:t||h,opacity:t?.35:h?.3:1,depthWrite:!(t||h),colorWrite:!d}),R=new fn(x,T);if(R.userData.schritt=e.schritt,R.visible=m&&!n,u.push(R),l.add(R),m)if(n){const S=new jr(g,new gd({color:this.farbe("text-3"),dashSize:Tc,gapSize:Tc}));S.computeLineDistances(),l.add(S)}else t?l.add(new jr(g,new Gi({color:o}))):(l.add(new jr(g,new Gi({color:a,depthTest:!h}))),d&&l.add(new jr(g,new Gi({color:a,transparent:!0,opacity:.35,depthFunc:Ms}))))}return l.updateMatrixWorld(!0),{koerper:e,gruppe:l,flaechen:u,segmente:f,geist:t,gestrichelt:n}}setAuswahl(e){this.auswahl=new Set(e),this.konturenAktualisieren()}setHover(e){this.hover!==e&&(this.hover=e,this.konturenAktualisieren())}konturenAktualisieren(){for(const o of this.konturen)this.scene.remove(o),o.geometry.dispose(),o.material.dispose();this.konturen=[];const e=[...this.auswahl],t=new Set,n=[];for(const o of e)if(o.includes("/k/"))for(const l of this.objekte){const c=l.koerper.kanten.find(u=>u.id===o);c&&n.push({von:c.von,bis:c.bis})}else t.add(o);const r=(o,l)=>{if(!o.length)return;const c=new ku;c.setPositions(o);const u=new Fu({color:this.farbe("akzent").getHex(),linewidth:l,worldUnits:!1});u.resolution.set(this.zonenGroesse.breite,this.zonenGroesse.hoehe);const f=new Rv(c,u);f.renderOrder=10,this.scene.add(f),this.konturen.push(f)},s=o=>{const l=[];for(const c of this.objekte)!o.has(c.koerper.schritt)||!c.koerper.sichtbar||c.geist||c.gestrichelt||l.push(...c.segmente);return l};r(s(t),this.konturBreite);const a=[];for(const o of n)a.push(...o.von,...o.bis);r(a,this.konturBreite),this.hover&&!t.has(this.hover)&&r(s(new Set([this.hover])),1.5),this.anfordern()}geometrie(){const e=new Map;for(const t of this.objekte)t.geist||e.set(t.koerper.schritt,t);return[...e.values()].map(t=>({schritt:t.koerper.schritt,sichtbar:t.koerper.sichtbar,flaechen:t.koerper.sichtbar&&!t.gestrichelt,gestrichelt:t.gestrichelt,hervorgehoben:this.hover===t.koerper.schritt,ausgewaehlt:this.auswahl.has(t.koerper.schritt)}))}anfordern(){this.angefordert||(this.angefordert=!0,requestAnimationFrame(()=>this.rendern()))}rendern(){if(this.angefordert=!1,this.tween){const e=this.tween,t=performance.now(),n=Math.min(1,(t-e.start)/(e.ende-e.start)),r=n<.5?2*n*n:1-(-2*n+2)**2/2;this.kamera.azimut=e.von.azimut+(e.nach.azimut-e.von.azimut)*r,this.kamera.hoehe=e.von.hoehe+(e.nach.hoehe-e.von.hoehe)*r,this.kamera.abstand=e.von.abstand+(e.nach.abstand-e.von.abstand)*r,this.kamera.ziel.lerpVectors(e.von.ziel,e.nach.ziel,r),n>=1?this.tween=null:this.anfordern()}this.kameraSetzen(),this.kantenCache=null,this.renderer.render(this.scene,this.camera),this.aufRender?.()}jetztRendern(){this.rendern()}bild(){return this.rendern(),this.canvas.toDataURL("image/png")}zuSeite(e){const t=this.canvas.getBoundingClientRect(),n=e.clone().project(this.camera);return{x:t.left+(n.x*.5+.5)*t.width,y:t.top+(1-(n.y*.5+.5))*t.height}}strahl(e,t){this.kameraSetzen();const n=this.canvas.getBoundingClientRect(),r=new fe((e-n.left)/n.width*2-1,-((t-n.top)/n.height*2-1));this.raycaster.setFromCamera(r,this.camera);const s=this.objekte.filter(o=>o.koerper.sichtbar&&!o.geist&&!o.gestrichelt).flatMap(o=>o.flaechen);return this.raycaster.intersectObjects(s,!1)[0]??null}flaecheBei(e,t){return this.strahl(e,t)?.object.userData.schritt??null}sichtbareKanten(){this.kameraSetzen();const e=`${this.kamera.azimut}|${this.kamera.hoehe}|${this.kamera.abstand}|${this.objekte.length}`;if(this.kantenCache?.schluessel===e)return this.kantenCache.sichtbar;const t=new Set;for(const n of this.objekte)if(!(!n.koerper.sichtbar||n.geist||n.gestrichelt))for(const r of n.koerper.kanten)this.sichtbarerAnteil(r.von,r.bis,[.25,.5,.75]).length&&t.add(r.id);return this.kantenCache={schluessel:e,sichtbar:t},t}sichtbarerAnteil(e,t,n){const r=this.objekte.filter(a=>a.koerper.sichtbar&&!a.geist&&!a.gestrichelt).flatMap(a=>a.flaechen),s=[];for(const a of n){const o=new C(e[0]+(t[0]-e[0])*a,e[1]+(t[1]-e[1])*a,e[2]+(t[2]-e[2])*a);this.punktSichtbar(o,r)&&s.push(a)}return s}punktSichtbar(e,t){const n=e.clone().sub(this.camera.position),r=n.length();this.raycaster.set(this.camera.position,n.normalize());const s=this.raycaster.intersectObjects(t,!1)[0];return!s||s.distance>=r-.4}kanteBei(e,t,n=8){const r=this.sichtbareKanten();let s=null;for(const a of this.objekte)if(!(!a.koerper.sichtbar||a.geist||a.gestrichelt))for(const o of a.koerper.kanten){if(!r.has(o.id))continue;const l=this.zuSeite(new C(...o.von)),c=this.zuSeite(new C(...o.bis)),u=Iv({x:e,y:t},l,c);u<=n&&(!s||u<s.d)&&(s={id:o.id,d:u})}return s?.id??null}projektion(e){this.kameraSetzen();const t=this.objekte.find(M=>M.koerper.schritt===e&&!M.geist);if(!t)return null;const n=[];for(const M of t.flaechen){const A=M.geometry.getAttribute("position");for(let _=0;_<A.count;_++)n.push(new C().fromBufferAttribute(A,_))}const r=n.map(M=>this.zuSeite(M)),s=Uv(r),a=Math.min(...r.map(M=>M.x)),o=Math.max(...r.map(M=>M.x)),l=Math.min(...r.map(M=>M.y)),c=Math.max(...r.map(M=>M.y)),u=t.koerper,f=[(u.min[0]+u.max[0])/2,(u.min[1]+u.max[1])/2,(u.min[2]+u.max[2])/2],h=this.objekte.filter(M=>M.koerper.sichtbar&&!M.geist&&!M.gestrichelt).flatMap(M=>M.flaechen),d=M=>{const A=new C(...M);return this.punktSichtbar(A,h)?this.zuSeite(A):null},m={oben:[f[0],f[1],u.max[2]],unten:[f[0],f[1],u.min[2]],vorn:[f[0],u.min[1],f[2]],hinten:[f[0],u.max[1],f[2]],links:[u.min[0],f[1],f[2]],rechts:[u.max[0],f[1],f[2]]},x={};for(const[M,A]of Object.entries(m))x[M]=d(A);const g=[];for(const M of u.kanten){const A=[.1,.2,.3,.4,.5,.6,.7,.8,.9],_=this.sichtbarerAnteil(M.von,M.bis,A);if(!_.length)continue;const w=_[Math.floor(_.length/2)],P=new C(M.von[0]+(M.bis[0]-M.von[0])*w,M.von[1]+(M.bis[1]-M.von[1])*w,M.von[2]+(M.bis[2]-M.von[2])*w),k=M.name.split("-").map(V=>x[V]).filter(V=>!!V);k.length&&g.push({id:M.id,name:M.name,mitte:this.zuSeite(P),flaechen:k})}const p=[],T=this.canvas.getBoundingClientRect();for(const M of t.flaechen){const A=M.geometry.getAttribute("position");for(let _=0;_+2<A.count;_+=3){const w=new C().fromBufferAttribute(A,_).add(new C().fromBufferAttribute(A,_+1)).add(new C().fromBufferAttribute(A,_+2)).multiplyScalar(.3333333333333333),P=this.zuSeite(w);P.x<T.left+5||P.x>T.right-5||P.y<T.top+5||P.y>T.bottom-5||this.flaecheBei(P.x,P.y)===e&&this.kanteBei(P.x,P.y,10)===null&&p.push(P)}}const R=new C(f[0],f[1],u.max[2]),S=this.zuSeite(R),y=this.zuSeite(R.clone().add(new C(0,0,10)));return{huellbox:{x:a,y:l,breite:o-a,hoehe:c-l},huelle:s,flaechen:{oben:x.oben??null,vorn:x.vorn??null,rechts:x.rechts??null},kanten:g,treffer:zv(p,12),oben:S,z_px_pro_mm:{x:(y.x-S.x)/10,y:(y.y-S.y)/10}}}huellbox(e){this.kameraSetzen();const t=this.objekte.find(l=>l.koerper.schritt===e&&!l.geist&&l.koerper.sichtbar);if(!t)return null;const n=[];for(const l of t.flaechen){const c=l.geometry.getAttribute("position");for(let u=0;u<c.count;u++)n.push(this.zuSeite(new C().fromBufferAttribute(c,u)))}if(!n.length)return null;const r=Math.min(...n.map(l=>l.x)),s=Math.max(...n.map(l=>l.x)),a=Math.min(...n.map(l=>l.y)),o=Math.max(...n.map(l=>l.y));return{x:r,y:a,breite:s-r,hoehe:o-a}}projiziere(e){return this.kameraSetzen(),this.zuSeite(new C(...e))}aufEbene(e,t,n){this.kameraSetzen();const r=this.canvas.getBoundingClientRect(),s=new fe((e-r.left)/r.width*2-1,-((t-r.top)/r.height*2-1));this.raycaster.setFromCamera(s,this.camera);const a=wo(n,0),o=new C(0,0,1).transformDirection(a),l=new zn(o,0),c=new C;if(!this.raycaster.ray.intersectPlane(l,c))return null;const u=c.applyMatrix4(a.clone().invert());return{u:u.x,v:u.y}}hatKoerper(){return this.objekte.some(e=>e.koerper.sichtbar&&!e.geist)}}function zv(i,e){if(i.length<=e)return i;const t=i.length/e;return Array.from({length:e},(n,r)=>i[Math.floor(r*t)])}function Iv(i,e,t){const n=t.x-e.x,r=t.y-e.y,s=n*n+r*r,a=s===0?0:Math.max(0,Math.min(1,((i.x-e.x)*n+(i.y-e.y)*r)/s));return Math.hypot(i.x-(e.x+a*n),i.y-(e.y+a*r))}function Uv(i){const e=[...i].sort((s,a)=>s.x-a.x||s.y-a.y);if(e.length<3)return e;const t=(s,a,o)=>(a.x-s.x)*(o.y-s.y)-(a.y-s.y)*(o.x-s.x),n=[];for(const s of e){for(;n.length>=2&&t(n[n.length-2],n[n.length-1],s)<=0;)n.pop();n.push(s)}const r=[];for(const s of[...e].reverse()){for(;r.length>=2&&t(r[r.length-2],r[r.length-1],s)<=0;)r.pop();r.push(s)}return n.pop(),r.pop(),[...n,...r]}function wo(i,e){const t=new lt;i==="XZ"?t.makeBasis(new C(1,0,0),new C(0,0,1),new C(0,-1,0)):i==="YZ"?t.makeBasis(new C(0,1,0),new C(0,0,1),new C(1,0,0)):t.identity();const n=new lt().makeTranslation(0,0,e);return t.multiply(n)}function Nv(i){const e=new Ds,t=i.mitte.u-i.laenge/2,n=i.mitte.u+i.laenge/2,r=i.mitte.v-i.breite/2,s=i.mitte.v+i.breite/2,a=Math.min(i.eckradius,i.laenge/2,i.breite/2);a>0?(e.moveTo(t+a,r),e.lineTo(n-a,r),e.absarc(n-a,r+a,a,-Math.PI/2,0,!1),e.lineTo(n,s-a),e.absarc(n-a,s-a,a,0,Math.PI/2,!1),e.lineTo(t+a,s),e.absarc(t+a,s-a,a,Math.PI/2,Math.PI,!1),e.lineTo(t,r+a),e.absarc(t+a,r+a,a,Math.PI,3*Math.PI/2,!1)):(e.moveTo(t,r),e.lineTo(n,r),e.lineTo(n,s),e.lineTo(t,s),e.lineTo(t,r));for(const l of i.loecher){const c=new Ls;c.absarc(l.x,l.y,i.lochDurchmesser/2,0,Math.PI*2,!0),e.holes.push(c)}const o=new Rr(e,{depth:i.dicke,bevelEnabled:!1,curveSegments:12});return o.applyMatrix4(wo(i.ebene,i.z0)),o}function kv(i){const e=new C(i.max[0]-i.min[0],i.max[1]-i.min[1],i.max[2]-i.min[2]),t=new C((i.min[0]+i.max[0])/2,(i.min[1]+i.max[1])/2,(i.min[2]+i.max[2])/2);if(i.art==="platte"&&i.platte)return[Nv(i.platte)];if(i.art==="zylinder"&&i.platte){const r=i.platte.lochDurchmesser/2-.02;return i.platte.loecher.map(s=>{const a=new qo(r,r,e.z,28,1,!0);return a.rotateX(Math.PI/2),a.translate(s.x,s.y,t.z),a})}if(i.art==="schale"){const r=i.wand??2,s=new _i(e.x,e.y,r).translate(t.x,t.y,i.min[2]+r/2),a=new Ds;a.moveTo(i.min[0],i.min[1]),a.lineTo(i.max[0],i.min[1]),a.lineTo(i.max[0],i.max[1]),a.lineTo(i.min[0],i.max[1]),a.lineTo(i.min[0],i.min[1]);const o=new Ls;o.moveTo(i.min[0]+r,i.min[1]+r),o.lineTo(i.min[0]+r,i.max[1]-r),o.lineTo(i.max[0]-r,i.max[1]-r),o.lineTo(i.max[0]-r,i.min[1]+r),o.lineTo(i.min[0]+r,i.min[1]+r),a.holes.push(o);const l=new Rr(a,{depth:e.z-r,bevelEnabled:!1}).translate(0,0,i.min[2]+r);return[s,l]}const n=i.rundung;if(n&&(n.vorn>0||n.hinten>0)){const[r,s,a,o]=[i.min[1],i.max[1],i.min[2],i.max[2]],l=n.vorn,c=n.hinten,u=new Ds;u.moveTo(r,a),u.lineTo(s,a),u.lineTo(s,o-c),c>0?u.absarc(s-c,o-c,c,0,Math.PI/2,!1):u.lineTo(s,o),u.lineTo(r+l,o),l>0?u.absarc(r+l,o-l,l,Math.PI/2,Math.PI,!1):u.lineTo(r,o),u.lineTo(r,a);const f=new Rr(u,{depth:e.x,bevelEnabled:!1,curveSegments:10}),h=new lt().makeBasis(new C(0,1,0),new C(0,0,1),new C(1,0,0));return f.applyMatrix4(h),f.translate(i.min[0],0,0),[f]}return[new _i(e.x,e.y,e.z).translate(t.x,t.y,t.z)]}function Fv(i,e,t){const n=i.getAttribute("position"),r=new Float32Array(n.count*3);for(let s=0;s<n.count;s++){const a=Math.min(1,Math.max(0,n.getZ(s)/48))**2,o=e.clone().lerp(t,a);r[s*3]=o.r,r[s*3+1]=o.g,r[s*3+2]=o.b}i.setAttribute("color",new hn(r,3))}const Ve=i=>({value:i,unit:"mm"}),Ov=i=>({value:i,unit:"N"});function ft(i,e,t,n={},r=[]){return{id:i,type:e,params:n,content:r,meta:{name:t}}}const Ss=i=>JSON.parse(JSON.stringify(i));function ti(i){return i.content.flatMap(e=>[e,...ti(e)])}const Dt=i=>i.params.skizze&&typeof i.params.skizze=="object"?i.params.skizze:void 0;function kn(i){return ti(i).flatMap(e=>{const t=Dt(e);return t?[e,t]:[e]})}function Os(i,e){return ti(i).find(t=>t.id===e)}function jt(i,e){return kn(i).find(t=>t.id===e)}function Kn(i,e){const t=Os(i,e);return t||ti(i).find(n=>Dt(n)?.id===e)}const Bv=(i,e)=>({x:Ve(i),y:Ve(e)}),Eo=(i,e,t,n,r={x:0,y:0},s)=>{const a={ebene:e,form:"rechteck",laenge:Ve(t),breite:Ve(n),mitte:Bv(r.x,r.y)};return s!==void 0&&(a.eckradius=Ve(s)),ft(i,"skizze","Skizze",a)},Ou=i=>ft(`${i}-ursprung`,"ursprung","Ursprung",{},["XY","XZ","YZ"].map(e=>ft(`${i}-ebene-${e.toLowerCase()}`,"ebene",e))),Vv=()=>ft("entwurf-0","entwurf","Platte 6 mm",{zustand:"verworfen",begruendung:"zu biegsam",aenderungen:{grundplatte:{dicke:Ve(6)}}});function Gt(){const i=ft("grundplatte","extrusion","Grundplatte",{dicke:Ve(8),skizze:Eo("grundplatte-skizze","XY",80,50,{x:0,y:0},3)}),e=ft("steg","extrusion","Steg",{hoehe:Ve(30),skizze:Eo("steg-skizze","oberseite",60,10,{x:0,y:20})}),t=ft("bohrungen","bohrung","Bohrungen",{durchmesser:Ve(6),durchgehend:!0,skizze:ft("bohrungen-skizze","skizze","Skizze",{ebene:"oberseite",form:"punkte",punkte:[{x:Ve(25),y:Ve(-7.5)},{x:Ve(-25),y:Ve(-7.5)}]})});return ft("projekt-halter","projekt","Halter",{entwuerfe:[Vv()]},[ft("halter","teil","Halter",{material:"PLA"},[Ou("halter"),i,e,t])])}function Jo(){return ft("projekt-leer","projekt","Teil 1",{entwuerfe:[]},[ft("teil-1","teil","Teil 1",{material:"PLA"},[Ou("teil-1")])])}const Ac=(i,e,t)=>ft(i,"konnektor",e,{position:{x:Ve(0),y:Ve(0),z:Ve(t)}});function Bu(){return ft("projekt-sensor","projekt","Sensorgehäuse",{entwuerfe:[]},[ft("gehaeuse","teil","Gehäuse",{form:"schale",laenge:Ve(80),breite:Ve(50),hoehe:Ve(30),wand:Ve(2),material:"PLA"},[Ac("gehaeuse-oberkante","Oberkante",30)]),ft("deckel","teil","Deckel",{form:"quader",laenge:Ve(80),breite:Ve(50),hoehe:Ve(4),material:"PLA"},[Ac("deckel-unterseite","Unterseite",0)])])}function Gv(){return[ft("sim-lager","lager","Lager",{ziel:"grundplatte",art:"fest"}),ft("sim-kraft","kraft","Kraft",{ziel:"steg",kraft:Ov(100),richtung:"-Y"}),ft("sim-ergebnis","ergebnis","Ergebnis",{simuliert:!0})]}function Hv(){const i=Gt();return i.content.push(Vu()),i}const Vu=()=>ft("simulation","studie","Simulation",{},Gv()),Gu=.00124,Rc=1-Math.PI/4,Wt=i=>i&&typeof i=="object"?i.value:0,$n=(i,e)=>i.meta[e]===!0;function Hu(i,e,t,n){const r=(o,l,c)=>[o==="links"?e[0]:t[0],l==="vorn"?e[1]:t[1],c==="unten"?e[2]:t[2]],s=[],a=(o,l,c)=>s.push({id:`${i}/k/${o}`,name:o,schritt:i,von:l,bis:c,laenge:Math.hypot(c[0]-l[0],c[1]-l[1],c[2]-l[2])});for(const o of["oben","unten"])a(`${o}-vorn`,r("links","vorn",o),r("rechts","vorn",o)),a(`${o}-hinten`,r("links","hinten",o),r("rechts","hinten",o)),a(`${o}-links`,r("links","vorn",o),r("links","hinten",o)),a(`${o}-rechts`,r("rechts","vorn",o),r("rechts","hinten",o));if(!n)for(const o of["links","rechts"])for(const l of["vorn","hinten"])a(`${l}-${o}`,r(o,l,"unten"),r(o,l,"oben"));return s}function Wv(i){const e=i.mitte.u-i.laenge/2,t=i.mitte.u+i.laenge/2,n=i.mitte.v-i.breite/2,r=i.mitte.v+i.breite/2;switch(i.ebene){case"XZ":return{min:[e,-i.z0-i.dicke,n],max:[t,-i.z0,r]};case"YZ":return{min:[i.z0,e,n],max:[i.z0+i.dicke,t,r]};default:return{min:[e,n,i.z0],max:[t,r,i.z0+i.dicke]}}}function Xv(i){const e=i.params.ebene;return e==="XZ"||e==="YZ"?e:"XY"}const qv=i=>Math.min(i.max[1]-i.min[1],i.max[0]-i.min[0])/2;function Qn(i){const e=[],t=[];let n=0,r=0,s=0;const a=i.content.filter(c=>c.type!=="ursprung");for(const c of a){const u=$n(c,"verworfen"),f=!u&&!$n(c,"ausgeblendet");if(c.type==="extrusion"){const h=Dt(c);if(!h)continue;const d=Xv(h),m=Wt(c.params.dicke??c.params.hoehe),x=h.params.ebene==="oberseite",g={ebene:d,mitte:{u:Wt(h.params.mitte?.x),v:Wt(h.params.mitte?.y)},laenge:Wt(h.params.laenge),breite:Wt(h.params.breite),eckradius:Wt(h.params.eckradius),dicke:m,z0:x?r:0,loecher:[],lochDurchmesser:0};!x&&!u&&e.every(S=>S.art!=="platte")&&(r=m,s=m);const p=Wv(g),T=!x,R={schritt:c.id,art:T?"platte":"quader",min:p.min,max:p.max,kanten:Hu(c.id,p.min,p.max,T&&g.eckradius>0),sichtbar:f};if(T?R.platte=g:R.rundung={vorn:0,hinten:0},e.push(R),!u){const S=g.laenge*g.breite-4*g.eckradius**2*Rc;n+=S*m}}}for(const c of a){if(c.type!=="bohrung")continue;const u=Dt(c),f=$n(c,"verworfen"),h=Wt(c.params.durchmesser),d=(u?.params.punkte??[]).map(p=>({x:Wt(p.x),y:Wt(p.y)})),m=e.find(p=>p.art==="platte"&&p.platte);if(!m?.platte)continue;m.platte.loecher=f?[]:d,m.platte.lochDurchmesser=h,f||(n-=d.length*Math.PI*(h/2)**2*s);const x=[Math.min(...d.map(p=>p.x))-h/2,Math.min(...d.map(p=>p.y))-h/2,m.min[2]],g=[Math.max(...d.map(p=>p.x))+h/2,Math.max(...d.map(p=>p.y))+h/2,m.max[2]];e.push({schritt:c.id,art:"zylinder",min:x,max:g,platte:{...m.platte,loecher:d,lochDurchmesser:h},kanten:[],sichtbar:!f&&!$n(c,"ausgeblendet")})}for(const c of a){if(c.type!=="verrundung"||$n(c,"verworfen"))continue;const u=e.find(x=>x.schritt===c.params.ziel);if(!u||u.art!=="quader"||!u.rundung)continue;const f=a.find(x=>x.id===u.schritt);if(!f||$n(f,"verworfen"))continue;const h=Wt(c.params.radius),d=qv(u),m=Math.min(h,d);h>d&&(t.push({schritt:c.id,radius:h,grenze:d}),u.fehlerhaft=!0);for(const x of c.params.kanten??[]){const g=u.kanten.find(p=>p.id===x);g&&(n-=m**2*Rc*g.laenge,g.name==="oben-vorn"&&(u.rundung.vorn=m),g.name==="oben-hinten"&&(u.rundung.hinten=m))}}const o=e.filter(c=>{const u=a.find(f=>f.id===c.schritt);return c.art!=="zylinder"&&u&&!$n(u,"verworfen")}),l=[0,0,0];if(o.length)for(let c=0;c<3;c++)l[c]=Math.max(...o.map(u=>u.max[c]))-Math.min(...o.map(u=>u.min[c]));return{koerper:e,volumen_mm3:n,masse_g:n*Gu,abmessungen_mm:l,befunde:t}}function Yv(i,e=[0,0,0]){const t=Wt(i.params.laenge),n=Wt(i.params.breite),r=Wt(i.params.hoehe),s=Wt(i.params.wand),a=[e[0]-t/2,e[1]-n/2,e[2]],o=[e[0]+t/2,e[1]+n/2,e[2]+r],l=i.params.form==="schale",c=l?t*n*r-(t-2*s)*(n-2*s)*(r-s):t*n*r;return{koerper:[{schritt:i.id,art:l?"schale":"quader",min:a,max:o,wand:l?s:void 0,rundung:l?void 0:{vorn:0,hinten:0},kanten:Hu(i.id,a,o,!1),sichtbar:!$n(i,"ausgeblendet")}],volumen_mm3:c,masse_g:c*Gu,abmessungen_mm:[t,n,r],befunde:[]}}function Cc(i){return i.content.filter(e=>e.type==="teil")}function Pc(i,e){return i.params.form?Yv(i,e):Qn(i)}const Wu={mm:1,cm:10,m:1e3},$v={n:1,kn:1e3},Zv=new Set(["kg","g"]),Lc=(i,e)=>i??e;class Kv{constructor(e,t){this.text=e,this.standardFaktor=t}pos=0;blank(){for(;this.text[this.pos]===" ";)this.pos+=1}naechstes(){return this.blank(),this.text[this.pos]??""}fertig(){return this.naechstes()===""}ausdruck(){let e=this.produkt();for(;;){const t=this.naechstes();if(t!=="+"&&t!=="-")return e;this.pos+=1;const n=this.produkt();if(e.dim!==null&&n.dim!==null&&e.dim!==n.dim)throw new Oi("wert.fehler.dimension");e={wert:t==="+"?e.wert+n.wert:e.wert-n.wert,dim:Lc(e.dim,n.dim)}}}produkt(){let e=this.faktor();for(;;){const t=this.naechstes();if(t!=="*"&&t!=="/")return e;this.pos+=1;const n=this.faktor();if(t==="/"){if(n.wert===0)throw new Oi("wert.fehler.teilung");e={wert:e.wert/n.wert,dim:e.dim}}else e={wert:e.wert*n.wert,dim:Lc(e.dim,n.dim)}}}faktor(){const e=this.naechstes();if(e==="-"){this.pos+=1;const t=this.faktor();return{wert:-t.wert,dim:t.dim}}if(e==="("){this.pos+=1;const t=this.ausdruck();if(this.naechstes()!==")")throw new Oi("wert.fehler.nicht-lesbar");return this.pos+=1,t}return this.zahl()}zahl(){this.blank();const e=this.text.slice(this.pos),t=/^(\d+(?:[.,]\d+)?|[.,]\d+)\s*([a-zA-Z]*)/.exec(e);if(!t||t[1]===void 0)throw new Oi("wert.fehler.nicht-lesbar");this.pos+=t[0].length;const n=Number(t[1].replace(",",".")),r=(t[2]??"").toLowerCase();if(r==="")return{wert:n*this.standardFaktor,dim:null};const s=Wu[r];if(s!==void 0)return{wert:n*s,dim:"laenge"};const a=$v[r];if(a!==void 0)return{wert:n*a,dim:"kraft"};if(Zv.has(r))return{wert:n*(r==="kg"?1e3:1),dim:"masse"};throw new Oi("wert.fehler.nicht-lesbar")}}class Oi extends Error{constructor(e){super(e),this.schluessel=e}}function zs(i,e="mm",t="laenge"){const n=new Kv(i.replace(/×/g,"*").replace(/−/g,"-").trim(),t==="kraft"?1:Wu[e]??1);try{const r=n.ausdruck();return n.fertig()?r.dim!==null&&r.dim!==t?{ok:!1,fehler:"wert.fehler.dimension"}:Number.isFinite(r.wert)?{ok:!0,groesse:{value:Math.round(r.wert*1e6)/1e6,unit:t==="kraft"?"N":"mm"}}:{ok:!1,fehler:"wert.fehler.nicht-lesbar"}:{ok:!1,fehler:"wert.fehler.nicht-lesbar"}}catch(r){if(r instanceof Oi)return{ok:!1,fehler:r.schluessel};throw r}}function St(i,e="de"){const t=String(Math.round(i.value*100)/100);return`${e==="de"?t.replace(".",","):t} ${i.unit}`}const li=i=>({value:i,unit:"mm"}),Jv=/(\d+(?:[.,]\d+)?)\s*(mm|cm|m)\b/i,Qv={mm:1,cm:10,m:1e3};function jv(i){const e=Jv.exec(i);return!e||e[1]===void 0||e[2]===void 0?null:Number(e[1].replace(",","."))*(Qv[e[2].toLowerCase()]??1)}function e_(i,e){const t=i.toLowerCase(),n=s=>Os(e.projekt,s);return/steg|\bweb\b|\brib\b/.test(t)?n("steg"):/grundplatte|platte|\bplate\b|\bbase\b/.test(t)?n("grundplatte"):e.auswahl.map(s=>n(s)).find(s=>s&&s.type==="extrusion")}function t_(i){const e=i.toLowerCase();return[[/länger|laenger|longer|lengthen/,{dimension:"laenge",vorzeichen:1}],[/kürzer|kuerzer|shorter/,{dimension:"laenge",vorzeichen:-1}],[/breiter|wider/,{dimension:"breite",vorzeichen:1}],[/schmaler|narrower/,{dimension:"breite",vorzeichen:-1}],[/dicker|höher|hoeher|thicker|taller|higher/,{dimension:"hoehe",vorzeichen:1}],[/dünner|duenner|niedriger|thinner|lower/,{dimension:"hoehe",vorzeichen:-1}]].find(([n])=>n.test(e))?.[1]??null}const Dc=i=>i.value;function Xu(i,e){const t=i.toLowerCase(),n=e_(i,e);if(!n)return null;const r=jv(i);if(/rund|abrund|verrund|round|fillet/.test(t)){if(n.id!=="steg")return null;const a=r??1,o=["oben-vorn","oben-hinten","oben-links","oben-rechts"].map(l=>`${n.id}/k/${l}`);return{titel:{schluessel:"ki.titel.verrundung",werte:{radius:St(li(a),"de")}},begruendung:"ki.begruendung.verrundung",befehle:[{id:"feature.verrunden",parameter:{ziel:n.id,radius:li(a),kanten:o}}],werte:[{feld:"radius",vorher:"–",nachher:St(li(a),"de")}],ziel:n.id}}const s=t_(i);if(s&&r!==null){const a=Dt(n);let o,l,c;if(s.dimension==="hoehe")o=n.params.hoehe?"hoehe":"dicke",l=Dc(n.params[o]),c=o==="hoehe"?"hoehe":"dicke";else{if(!a)return null;o=`skizze.${s.dimension}`,l=Dc(a.params[s.dimension]),c=s.dimension}const u=Math.max(1,l+s.vorzeichen*r);return{titel:{schluessel:"ki.titel.mass",werte:{schritt:n.meta.name,feld:c,nachher:St(li(u),"de")}},begruendung:"ki.begruendung.mass",befehle:[{id:"element.wert-setzen",parameter:{element:n.id,name:o,wert:li(u)}}],werte:[{feld:c,vorher:St(li(l),"de"),nachher:St(li(u),"de")}],ziel:n.id}}return null}const n_=i=>i.trim().split(/\s+/).length>3,Qo=i=>JSON.parse(JSON.stringify(i)),Pr=i=>i.params.entwuerfe??[],pi=i=>i.params.zustand;function $i(i){return Pr(i).find(e=>e.id===i.params.aktiverEntwurf)}const Bs=i=>i.params.aenderungen??{};function qu(i,e,t={}){return ft(i,"draft",e,{zustand:"offen",aenderungen:t})}function Yu(i,e){for(const[t,n]of Object.entries(e)){const r=Os(i,t);r&&Object.assign(r.params,Qo(n))}}function zc(i,e){const t=Qo(i);return t.params.entwuerfe=[],delete t.params.aktiverEntwurf,Yu(t,Bs(e)),t}function i_(i,e){const t={};for(const n of ti(e)){const r=Os(i,n.id);if(r)for(const[s,a]of Object.entries(n.params))JSON.stringify(a)!==JSON.stringify(r.params[s])&&((t[n.id]??={})[s]=Qo(a))}return t}function r_(i,e){const t=Bs(i);for(const[n,r]of Object.entries(e))t[n]={...t[n],...r};i.params.aenderungen=t}function Ca(i,e){return Pr(i).find(t=>t.id===(e??i.params.aktiverEntwurf))}function s_(i){i.registriere("entwurf.anlegen",(e,t)=>{const n=typeof t.name=="string"?t.name.trim():"";if(!n)return;const r=Pr(e),s=`entwurf-${r.length+1}`;e.params.entwuerfe=[...r,qu(s,n)],e.params.aktiverEntwurf=s}),i.registriere("entwurf.wechseln",(e,t)=>{const n=Ca(e,t.entwurf||void 0);t.entwurf&&n&&pi(n)==="offen"?e.params.aktiverEntwurf=n.id:t.entwurf||delete e.params.aktiverEntwurf}),i.registriere("entwurf.uebernehmen",(e,t)=>{const n=Ca(e,t.entwurf);!n||pi(n)!=="offen"||(Yu(e,Bs(n)),n.params.zustand="uebernommen",delete e.params.aktiverEntwurf)}),i.registriere("entwurf.verwerfen",(e,t)=>{const n=Ca(e,t.entwurf),r=typeof t.begruendung=="string"?t.begruendung.trim():"";!n||pi(n)!=="offen"||!r||(n.params.zustand="verworfen",n.params.begruendung=r,delete e.params.aktiverEntwurf)})}const Bi=i=>!!i&&typeof i=="object"&&"value"in i&&"unit"in i;function ds(i,e){const t=new Set(kn(i).map(r=>r.id));if(!t.has(e))return e;let n=2;for(;t.has(`${e}-${n}`);)n+=1;return`${e}-${n}`}function Pa(i,e){return kn(i).filter(t=>t.type===e).length+1}function Ic(i,e){return i.content.find(t=>t.id===e||ti(t).some(n=>n.id===e||Dt(n)?.id===e))}function To(i,e,t,n){const r=jt(i,e);if(!r||Bi(n)&&n.value<=0&&t!=="eckradius")return!1;if(t.startsWith("skizze.")){const s=Dt(r);if(!s)return!1;s.params[t.slice(7)]=n}else r.params[t]=n;return!0}function a_(i){s_(i),i.registriere("element.wert-setzen",(n,r)=>{To(n,String(r.element),String(r.name),r.wert)}),i.registriere("skizze.anlegen",(n,r)=>{if(!r.ebene)return;const s=n.content.find(l=>l.type==="teil"&&!l.params.form);if(!s)return;const a=Pa(n,"skizze"),o=ds(n,a===1?"skizze-1":`skizze-${a}`);s.content.push(ft(o,"skizze","Skizze",{ebene:String(r.ebene),form:"rechteck"}))}),i.registriere("skizze.rechteck",(n,r)=>{const s=jt(n,String(r.skizze));if(!s)return;const a=r.mitte;s.params.form="rechteck",s.params.laenge=Bi(r.laenge)?r.laenge:Ve(Number(r.laenge)),s.params.breite=Bi(r.breite)?r.breite:Ve(Number(r.breite)),s.params.mitte={x:Ve(a.u),y:Ve(a.v)}}),i.registriere("feature.extrudieren",(n,r)=>{const s=Ic(n,String(r.skizze));if(!s)return;const a=s.content.findIndex(u=>u.id===r.skizze),o=s.content[a];if(!o||o.type!=="skizze"||!o.params.laenge)return;const l=Pa(n,"extrusion"),c=Bi(r.dicke)?r.dicke:Ve(10);s.content[a]=ft(ds(n,`extrusion-${l}`),"extrusion",`Extrusion ${l}`,{dicke:c,skizze:o})}),i.registriere("feature.verrunden",(n,r)=>{const s=Ic(n,String(r.ziel));if(!s)return;const a=r.kanten??[];if(!a.length)return;const o=Pa(n,"verrundung"),l=Bi(r.radius)?r.radius:Ve(1);s.content.push(ft(ds(n,"verrundung"),"verrundung",o===1?"Verrundung":`Verrundung ${o}`,{ziel:String(r.ziel),radius:l,kanten:[...a]}))});const e=(n,r)=>(s,a)=>{const o=jt(s,String(a.schritt));o&&(r?o.meta[n]=!0:delete o.meta[n])};i.registriere("schritt.ausblenden",e("ausgeblendet",!0)),i.registriere("schritt.einblenden",e("ausgeblendet",!1)),i.registriere("schritt.verwerfen",e("verworfen",!0)),i.registriere("baugruppe.anlegen",(n,r)=>{const a=(r.teile??[]).map(l=>n.content.find(c=>c.id===l)).filter(l=>!!l);if(a.length<2||n.content.some(l=>l.type==="baugruppe"))return;const o=a.map((l,c)=>ft(`instanz-${l.id}`,"instanz",l.meta.name,{komponente:l.id,position:{x:Ve(100*c),y:Ve(0),z:Ve(0)}}));n.content.push(ft("baugruppe-1","baugruppe","Baugruppe 1",{},o))}),i.registriere("verbindung.anlegen",(n,r)=>{const s=n.content.find(m=>m.type==="baugruppe");if(!s||!r.von||!r.nach)return;const a=m=>{for(const x of s.content.filter(g=>g.type==="instanz")){const g=n.content.find(T=>T.id===x.params.komponente),p=g?.content.find(T=>T.id===m);if(p&&g)return{inst:x,konnektor:p}}},o=a(String(r.von)),l=a(String(r.nach));if(!o||!l)return;const c=s.content.find(m=>m.id===r.mover)??o.inst,u=c===o.inst?l:o,f=c===o.inst?o:l,h=m=>m.value,d=(m,x,g)=>h(m.params.position[g])+h(x.params.position[g]);for(const m of["x","y","z"]){const x=d(u.inst,u.konnektor,m);c.params.position[m]=Ve(x-h(f.konnektor.params.position[m]))}s.content.push(ft(ds(n,"verbindung"),"verbindung","Verbindung",{von:o.konnektor.meta.name,nach:l.konnektor.meta.name,vonId:String(r.von),nachId:String(r.nach),bewegt:c.id,art:String(r.art??"Fest")}))});const t=n=>{let r=n.content.find(s=>s.type==="studie");return r||(r=Vu(),n.content.push(r)),r};i.registriere("simulation.lager",n=>void t(n)),i.registriere("simulation.ergebnis",n=>void t(n)),i.registriere("simulation.kraft",(n,r)=>{const s=t(n).content.find(a=>a.type==="kraft");s&&Bi(r.kraft)&&(s.params.kraft=r.kraft)})}const o_=[{id:"suche.oeffnen",titel:"befehl.suche.oeffnen",kuerzel:"Mod+K"},{id:"bearbeiten.rueckgaengig",titel:"befehl.bearbeiten.rueckgaengig",kuerzel:"Mod+Z"},{id:"bearbeiten.wiederholen",titel:"befehl.bearbeiten.wiederholen",kuerzel:"Mod+Shift+Z"},{id:"auswahl.setzen",titel:"befehl.auswahl.setzen",parameter:{elemente:{typ:"referenz"}}},{id:"auswahl.aufheben",titel:"befehl.auswahl.aufheben"},{id:"ansicht.einpassen",titel:"befehl.ansicht.einpassen"},{id:"thema.umschalten",titel:"befehl.thema.umschalten"},{id:"arbeitsbereich.wechseln",titel:"befehl.arbeitsbereich.wechseln",parameter:{bereich:{typ:"wahl"}}},{id:"darstellung.wechseln",titel:"befehl.darstellung.wechseln",kuerzel:"W"},{id:"darstellung.koerper",titel:"befehl.darstellung.koerper"},{id:"darstellung.kanten",titel:"befehl.darstellung.kanten"},{id:"darstellung.durchsicht",titel:"befehl.darstellung.durchsicht"},{id:"ort.skizze-bearbeiten",titel:"befehl.ort.skizze-bearbeiten"},{id:"ort.fertig",titel:"befehl.ort.fertig",kuerzel:"Esc"},{id:"skizze.anlegen",titel:"befehl.skizze.anlegen",parameter:{ebene:{typ:"wahl"}}},{id:"skizze.rechteck",titel:"befehl.skizze.rechteck",parameter:{laenge:{dimension:"laenge",einheit:"mm"},breite:{dimension:"laenge",einheit:"mm"}}},{id:"element.wert-setzen",titel:"befehl.element.wert-setzen",parameter:{element:{typ:"referenz"},name:{typ:"text"},wert:{dimension:"laenge",einheit:"mm"}}},{id:"feature.extrudieren",titel:"befehl.feature.extrudieren",parameter:{dicke:{dimension:"laenge",einheit:"mm"}}},{id:"feature.verrunden",titel:"befehl.feature.verrunden",parameter:{radius:{dimension:"laenge",einheit:"mm"},kanten:{typ:"referenz"}}},{id:"schritt.ausblenden",titel:"befehl.schritt.ausblenden",parameter:{schritt:{typ:"referenz"}}},{id:"schritt.einblenden",titel:"befehl.schritt.einblenden",parameter:{schritt:{typ:"referenz"}}},{id:"schritt.verwerfen",titel:"befehl.schritt.verwerfen",parameter:{schritt:{typ:"referenz"}}},{id:"baugruppe.anlegen",titel:"befehl.baugruppe.anlegen"},{id:"verbindung.anlegen",titel:"befehl.verbindung.anlegen",parameter:{von:{typ:"referenz"},nach:{typ:"referenz"},art:{typ:"wahl"},versatz:{dimension:"laenge",einheit:"mm"}}},{id:"entwurf.anlegen",titel:"befehl.entwurf.anlegen",parameter:{name:{typ:"text"}}},{id:"entwurf.wechseln",titel:"befehl.entwurf.wechseln",parameter:{entwurf:{typ:"referenz"}}},{id:"entwurf.vergleichen",titel:"befehl.entwurf.vergleichen"},{id:"entwurf.uebernehmen",titel:"befehl.entwurf.uebernehmen"},{id:"entwurf.verwerfen",titel:"befehl.entwurf.verwerfen",parameter:{begruendung:{typ:"text"}}},{id:"ansicht.ergebnis",titel:"befehl.ansicht.ergebnis"},{id:"ansicht.alle-entwuerfe",titel:"befehl.ansicht.alle-entwuerfe"},{id:"ki.fragen",titel:"befehl.ki.fragen",parameter:{absicht:{typ:"text"}}},{id:"ki.anhalten",titel:"befehl.ki.anhalten"},{id:"vorschlag.uebernehmen",titel:"befehl.vorschlag.uebernehmen"},{id:"vorschlag.verwerfen",titel:"befehl.vorschlag.verwerfen"},{id:"gespraech.schliessen",titel:"befehl.gespraech.schliessen"},{id:"simulation.lager",titel:"befehl.simulation.lager"},{id:"simulation.kraft",titel:"befehl.simulation.kraft",parameter:{kraft:{dimension:"kraft",einheit:"N"}}},{id:"simulation.ergebnis",titel:"befehl.simulation.ergebnis"}],l_={befehle:o_},Cr=l_.befehle;class c_{stand;zurueck=[];vor=[];wirkungen=new Map;protokoll=[];constructor(e=Gt()){this.stand=e}modell(){return Ss(this.stand)}angezeigt(){const e=$i(this.stand);return e?zc(this.stand,e):this.modell()}setzen(e){this.stand=e,this.zurueck=[],this.vor=[]}registriere(e,t){if(!Cr.some(n=>n.id===e))throw new Error(`Unbekannter Befehl: ${e}`);this.wirkungen.set(e,t)}probe(e){const t=this.angezeigt();for(const n of e)this.wirkungen.get(n.id)?.(t,n.parameter);return t}kannRueckgaengig(){return this.zurueck.length>0}kannWiederholen(){return this.vor.length>0}ausfuehren(e,t={},n="mensch"){if(e==="bearbeiten.rueckgaengig")return this.rueckgaengig(t,n);if(e==="bearbeiten.wiederholen")return this.wiederholen(t,n);const r=this.wirkungen.get(e);if(this.protokoll.push({befehl:e,parameter:t,quelle:n}),!r)return!1;const s=Ss(this.stand),a=e==="element.wert-setzen"?$i(s):void 0;if(a){const o=zc(s,a),l=Ss(o);r(l,t),r_(a,i_(o,l))}else r(s,t);return JSON.stringify(s)===JSON.stringify(this.stand)?!1:(this.zurueck.push(this.stand),this.vor=[],this.stand=s,!0)}rueckgaengig(e,t){this.protokoll.push({befehl:"bearbeiten.rueckgaengig",parameter:e,quelle:t});const n=this.zurueck.pop();return n?(this.vor.push(this.stand),this.stand=n,!0):!1}wiederholen(e,t){this.protokoll.push({befehl:"bearbeiten.wiederholen",parameter:e,quelle:t});const n=this.vor.pop();return n?(this.zurueck.push(this.stand),this.stand=n,!0):!1}}const u_=()=>({auswahl:[],hover:null,ort:{art:"teil",schritt:null},darstellung:"koerper",bereich:"modell",thema:"hell",inspektor:"auswahl",live:null,ziehen:null,suche:{offen:!1,text:"",index:0,facette:"alle"},menue:null,ebenenWahl:!1,geist:null,verbinden:null,gespraech:null,entwurfAnsicht:"ergebnis",vergleich:!1,rueckmeldung:{schluessel:"app.bereit"},zeichnen:null,befundZustand:null,unbekannterZustand:!1}),h_=i=>JSON.parse(JSON.stringify(i)),nt=i=>i?.value??0;class f_{constructor(e,t,n,r){this.t=e,this.sprache=t,this.tempo=n,this.sitzung=new c_(r),a_(this.sitzung)}sitzung;ui=u_();szene;zonen=[];nachRender=[];geplant=!1;einpassenNach=!1;signatur="";kameraVorher=null;kiTimer=null;cache=null;vorschauKoerper=[];angezeigt(){if(this.cache)return this.cache.projekt;const e=this.sitzung.angezeigt(),t=this.ui.live;return t&&To(e,t.element,t.name,t.wert),this.cache={projekt:e,ergebnisse:new Map},e}modell(){const e=this.sitzung.modell();return this.ui.live&&!$i(e)&&To(e,this.ui.live.element,this.ui.live.name,this.ui.live.wert),e}ungueltig(){this.cache=null}ergebnisse(){const e=this.angezeigt(),t=this.cache;if(t.ergebnisse.size)return t.ergebnisse;const n=e.content.find(a=>a.type==="baugruppe"),r=Cc(e),s=r.filter(a=>a.params.form);if(n)for(const a of n.content.filter(o=>o.type==="instanz")){const o=r.find(u=>u.id===a.params.komponente);if(!o)continue;const l=a.params.position,c=Pc(o,[nt(l.x),nt(l.y),nt(l.z)]);for(const u of c.koerper)u.schritt=a.id;t.ergebnisse.set(a.id,c)}return r.forEach(a=>{if(n&&a.params.form)return;const o=s.indexOf(a),l=a.params.form?[o===0?-50:50*o,0,0]:[0,0,0];t.ergebnisse.set(a.id,Pc(a,l))}),t.ergebnisse}alleKoerper(){return[...this.ergebnisse().values()].flatMap(e=>e.koerper)}aktivesTeil(){const e=this.angezeigt(),t=Cc(e);for(const n of this.ui.auswahl){const r=n.split("/")[0],s=t.find(a=>a.id===r||ti(a).some(o=>o.id===r||Dt(o)?.id===r));if(s)return s}return t.find(n=>!n.params.form)??t[0]}ergebnisAktiv(){const e=this.aktivesTeil();if(e)return e.params.form?this.ergebnisse().get(e.id):this.ergebnisse().get(e.id)??Qn(e)}kantenIds(){return new Set(this.alleKoerper().flatMap(e=>e.kanten.map(t=>t.id)))}bereinigen(){const e=this.angezeigt(),t=new Set(kn(e).map(r=>r.id)),n=this.kantenIds();this.ui.auswahl=this.ui.auswahl.filter(r=>t.has(r)||n.has(r)),this.ui.ort.art==="skizze"&&!(this.ui.ort.schritt&&t.has(this.ui.ort.schritt))&&(this.ui.ort={art:"teil",schritt:null}),this.ui.geist&&!t.has(this.ui.geist)&&(this.ui.geist=null)}aktualisieren(){this.ungueltig(),!this.geplant&&(this.geplant=!0,queueMicrotask(()=>{this.geplant=!1,this.rendern()}))}rendern(){this.ungueltig(),this.bereinigen(),this.szeneFuettern(),this.einpassenNach&&(this.einpassenNach=!1,this.szene.einpassen());for(const e of this.zonen)e.rendern();for(const e of this.nachRender)e()}szeneFuettern(){const e=this.zeichnung(),t=JSON.stringify([e.koerper,[...e.gestrichelt],[...e.geister],e.zusatz,e.skizzen,e.darstellung,e.verlauf]);t!==this.signatur&&(this.signatur=t,this.szene.zeichne(e)),this.szene.setAuswahl(this.ui.auswahl),this.szene.setHover(this.ui.hover)}zeichnung(){const e=this.angezeigt(),t=new Set;if(this.ui.ort.art==="skizze"&&this.ui.ort.schritt){const s=e.content.find(a=>a.content.some(o=>o.id===this.ui.ort.schritt));if(s){const a=s.content.findIndex(o=>o.id===this.ui.ort.schritt);for(const o of s.content.slice(a+1))t.add(o.id)}}const n=[];for(const s of e.content.filter(a=>a.type==="teil"))for(const a of s.content)a.type!=="skizze"||!a.params.laenge||n.push(d_(a));if(this.ui.zeichnen){const s=this.ui.zeichnen,a=this.ui.ort.schritt?jt(e,this.ui.ort.schritt):void 0;n.push({ebene:mi(a),mitte:{u:(s.u0+s.u1)/2,v:(s.v0+s.v1)/2},laenge:Math.abs(s.u1-s.u0),breite:Math.abs(s.v1-s.v0),eckradius:0})}const r=[...this.vorschauKoerper];if(this.ui.vergleich){const a=this.sitzung.modell().content.find(o=>o.type==="teil"&&!o.params.form);a&&r.push(...Qn(a).koerper.filter(o=>o.art==="platte"))}return{koerper:this.alleKoerper(),darstellung:this.ui.darstellung,gestrichelt:t,geister:new Set(this.ui.geist?[this.ui.geist]:[]),zusatz:r,skizzen:n,verlauf:this.ui.bereich==="simulation"}}setHover(e){this.ui.hover!==e&&(this.ui.hover=e,this.szene.setHover(e),document.querySelectorAll('[data-zone="aufbau"] [data-schritt]').forEach(t=>{e!==null&&t.dataset.ziel===e?t.setAttribute("data-hervorgehoben",""):t.removeAttribute("data-hervorgehoben")}))}waehlen(e,t=!1){this.ausfuehren("auswahl.setzen",{elemente:e,erweitern:t})}gewaehlt(){if(this.ui.auswahl.length!==1)return;const e=this.ui.auswahl[0];if(!e.includes("/k/"))return jt(this.angezeigt(),e)}kantenAuswahl(){return this.ui.auswahl.filter(e=>e.includes("/k/"))}starte(e,t={},n="mensch"){const r=this.angezeigt(),s={...t},a=this.ui.auswahl,o=a[0];switch(e){case"schritt.ausblenden":case"schritt.einblenden":case"schritt.verwerfen":s.schritt??=o;break;case"feature.extrudieren":{const l=this.ui.ort.schritt&&jt(r,this.ui.ort.schritt);s.skizze??=o&&jt(r,o)?.type==="skizze"?o:l&&l.type==="skizze"?l.id:void 0;break}case"feature.verrunden":{let l=this.kantenAuswahl();!l.length&&o==="steg"&&(l=["oben-vorn","oben-hinten"].map(c=>`steg/k/${c}`)),s.kanten??=l,s.ziel??=(l[0]??"").split("/")[0];break}case"baugruppe.anlegen":s.teile??=a.filter(l=>r.content.some(c=>c.id===l));break;case"ort.skizze-bearbeiten":s.schritt??=o;break;case"ki.fragen":s.absicht??="";break}this.ausfuehren(e,s,n)}ausfuehren(e,t={},n="mensch"){e==="element.wert-setzen"&&(this.ui.live=null);const r=new Set(kn(this.sitzung.modell()).map(a=>a.id));this.ungueltig();const s=this.sitzung.ausfuehren(e,t,n);this.ungueltig(),this.uiWirkung(e,t,s,r),this.aktualisieren()}neueElemente(e){return kn(this.sitzung.modell()).filter(t=>!e.has(t.id))}meldung(e,t){this.ui.rueckmeldung={schluessel:e,werte:t}}uiWirkung(e,t,n,r){const s=this.ui;switch(e){case"suche.oeffnen":s.suche.offen=!0;break;case"auswahl.setzen":{const a=t.elemente??[];if(s.menue=null,t.erweitern){const l=new Set(s.auswahl);for(const c of a)l.has(c)?l.delete(c):l.add(c);s.auswahl=[...l]}else s.auswahl=a;s.inspektor!=="auswahl"&&!(s.gespraech&&s.gespraech.phase==="arbeitet")&&(s.inspektor="auswahl",s.gespraech=null,s.vergleich=!1);const o=a[0]?jt(this.angezeigt(),a[0]):void 0;o&&["lager","kraft","ergebnis"].includes(o.type)&&(s.bereich="simulation");break}case"auswahl.aufheben":s.auswahl=[],s.menue=null;break;case"ansicht.einpassen":this.szene.einpassen();break;case"thema.umschalten":s.thema=s.thema==="hell"?"dunkel":"hell",document.documentElement.dataset.thema=s.thema,this.szene.setThema(s.thema);break;case"arbeitsbereich.wechseln":s.bereich=typeof t.bereich=="string"?t.bereich:s.bereich==="modell"?"simulation":"modell";break;case"darstellung.wechseln":s.darstellung=s.darstellung==="koerper"?"kanten":s.darstellung==="kanten"?"durchsicht":"koerper";break;case"darstellung.koerper":s.darstellung="koerper";break;case"darstellung.kanten":s.darstellung="kanten";break;case"darstellung.durchsicht":s.darstellung="durchsicht";break;case"ort.skizze-bearbeiten":{const a=t.schritt?Kn(this.angezeigt(),String(t.schritt)):void 0;a&&(Dt(a)||a.type==="skizze")?this.ortBetreten(a.id):this.meldung("meldung.erst-schritt-waehlen");break}case"ort.fertig":s.ort.art==="skizze"&&this.ortVerlassen();break;case"skizze.anlegen":{if(!t.ebene){s.ebenenWahl=!s.ebenenWahl;break}s.ebenenWahl=!1;const a=this.neueElemente(r).find(o=>o.type==="skizze");a&&this.ortBetreten(a.id);break}case"skizze.rechteck":this.meldung("meldung.skizze-gezeichnet");break;case"feature.extrudieren":{const a=this.neueElemente(r).find(o=>o.type==="extrusion");if(!a){this.meldung("meldung.erst-skizze-waehlen");break}s.ort.art==="skizze"&&this.ortVerlassen(),s.auswahl=[a.id],s.geist=a.id;break}case"feature.verrunden":{const a=this.neueElemente(r).find(o=>o.type==="verrundung");a?s.auswahl=[a.id]:this.meldung("meldung.erst-kanten-waehlen");break}case"element.wert-setzen":s.geist&&(s.geist=null),n&&this.meldung("meldung.wert-gesetzt");break;case"schritt.verwerfen":s.auswahl=s.auswahl.filter(a=>a!==t.schritt),this.meldung("meldung.verworfen");break;case"baugruppe.anlegen":{const a=this.neueElemente(r).find(o=>o.type==="baugruppe");a?(s.auswahl=[a.id],this.einpassenNach=!0):this.meldung("meldung.erst-zwei-teile");break}case"verbindung.anlegen":{if(t.von&&t.nach){s.verbinden=null;const a=this.neueElemente(r).find(o=>o.type==="verbindung");a&&(s.auswahl=[a.id])}else s.auswahl.length&&this.gewaehlt()?.type==="instanz"?s.verbinden={phase:"von"}:this.meldung("meldung.erst-instanz-waehlen");break}case"entwurf.anlegen":case"entwurf.wechseln":s.inspektor="entwuerfe",s.vergleich=!1;break;case"entwurf.vergleichen":s.inspektor="entwuerfe",s.vergleich=!!$i(this.sitzung.modell());break;case"entwurf.uebernehmen":case"entwurf.verwerfen":s.vergleich=!1,s.inspektor="entwuerfe";break;case"ansicht.ergebnis":s.entwurfAnsicht="ergebnis",s.inspektor="entwuerfe";break;case"ansicht.alle-entwuerfe":s.entwurfAnsicht="alle",s.inspektor="entwuerfe";break;case"ki.fragen":this.kiStarten(String(t.absicht??""));break;case"ki.anhalten":s.gespraech?.phase==="arbeitet"&&(this.kiTimer!==null&&window.clearTimeout(this.kiTimer),this.kiTimer=null,s.gespraech.phase="angehalten");break;case"vorschlag.uebernehmen":{const a=s.gespraech?.vorschlag;if(!a)break;this.gespraechSchliessen();for(const o of a.befehle)this.ausfuehren(o.id,o.parameter,"ki");s.auswahl.length||(s.auswahl=[a.ziel]),this.meldung("meldung.vorschlag-uebernommen");break}case"vorschlag.verwerfen":case"gespraech.schliessen":this.gespraechSchliessen();break;case"simulation.lager":case"simulation.kraft":case"simulation.ergebnis":{s.bereich="simulation";const a=e.split(".")[1],l=this.sitzung.modell().content.find(c=>c.type==="studie")?.content.find(c=>c.type===a);l&&(s.auswahl=[l.id]);break}case"bearbeiten.rueckgaengig":case"bearbeiten.wiederholen":s.live=null;break}}skizzenAnsicht(e){const t=e.type==="skizze"?e:Dt(e),n=mi(t),r=nt(t?.params.laenge)||80,s=nt(t?.params.breite)||50,a=nt(t?.params.mitte?.x),o=nt(t?.params.mitte?.y),l=Math.max(200,Math.max(r,s)*3.4);if(n==="XZ")return{azimut:0,hoehe:0,abstand:l,ziel:[a,0,o]};if(n==="YZ")return{azimut:90,hoehe:0,abstand:l,ziel:[0,a,o]};const u=t?.params.ebene==="oberseite"?nt(jt(this.angezeigt(),"grundplatte")?.params.dicke):0;return{azimut:0,hoehe:89.5,abstand:l,ziel:[a,o,u]}}ortBetreten(e,t=!1){const n=this.angezeigt(),r=Kn(n,e)??jt(n,e);if(!r)return;if(this.ui.ort.art==="teil"){const a=this.szene.kamera;this.kameraVorher={azimut:a.azimut,hoehe:a.hoehe,abstand:a.abstand,ziel:[a.ziel.x,a.ziel.y,a.ziel.z]}}this.ui.ort={art:"skizze",schritt:r.id},this.ui.auswahl=[r.id],this.ui.inspektor="auswahl",this.ui.menue=null;const s=this.skizzenAnsicht(r);this.szene.nach({azimut:s.azimut,hoehe:s.hoehe,abstand:s.abstand,ziel:new C(...s.ziel)},t||this.tempo===0?0:200),this.meldung("meldung.skizze-offen")}ortVerlassen(){this.ui.ort={art:"teil",schritt:null},this.ui.zeichnen=null;const e=this.kameraVorher;this.kameraVorher=null,e?this.szene.nach({azimut:e.azimut,hoehe:e.hoehe,abstand:e.abstand,ziel:new C(...e.ziel)},this.tempo===0?0:200):this.szene.einpassen()}kiStarten(e){const t=this.ui;this.kiTimer!==null&&window.clearTimeout(this.kiTimer),t.inspektor="gespraech",t.gespraech={frage:e,phase:"arbeitet",vorschlag:null,plan:0},this.vorschauKoerper=[];const n=Xu(e,{projekt:this.angezeigt(),auswahl:t.auswahl}),r=()=>{this.kiTimer=null,t.gespraech&&(t.gespraech.plan=3,n?(t.gespraech.phase="karte",t.gespraech.vorschlag=n,this.vorschauErzeugen(n)):t.gespraech.phase="erklaerung",this.aktualisieren())};if(this.tempo===0){r();return}const s=a=>{!t.gespraech||t.gespraech.phase!=="arbeitet"||(t.gespraech.plan=a,this.aktualisieren(),this.kiTimer=window.setTimeout(()=>a>=2?r():s(a+1),500))};s(1)}vorschauErzeugen(e){const n=this.sitzung.probe(e.befehle).content.find(r=>r.type==="teil"&&!r.params.form);n&&(this.vorschauKoerper=Qn(n).koerper.filter(r=>r.schritt===e.ziel))}gespraechSchliessen(){this.kiTimer!==null&&window.clearTimeout(this.kiTimer),this.kiTimer=null,this.ui.gespraech=null,this.ui.inspektor="auswahl",this.vorschauKoerper=[]}name(e){return e.meta.name}zahl(e){return St(e,this.sprache==="en"?"en":"de")}entwurfsName(){const e=$i(this.sitzung.modell());return e?e.meta.name:this.t("stand.haupt")}offeneEntwuerfe(){return Pr(this.sitzung.modell()).filter(e=>pi(e)==="offen")}befehlsliste(){return Cr}kopieModell(){return h_(this.sitzung.modell())}}function mi(i){const e=i?.params.ebene;return e==="XZ"||e==="YZ"?e:"XY"}function d_(i){return{ebene:mi(i),mitte:{u:nt(i.params.mitte?.x),v:nt(i.params.mitte?.y)},laenge:nt(i.params.laenge),breite:nt(i.params.breite),eckradius:nt(i.params.eckradius)}}const p_={arbeitsbereich:"Modell",aufbau:"Aufbau",suche:"Suchen oder fragen",bereit:"Bereit"},m_={haupt:"Hauptstand"},g_={skizze:"Skizze"},v_={simulation:"Simulation"},__={einpassen:"Einpassen",darstellung:{koerper:"Körper",kanten:"Kanten",durchsicht:"Durchsicht"}},x_={text:"Noch nichts gebaut. Der nächste Schritt:"},b_={waehlen:"Ebene wählen"},S_={unbekannt:"Zustand unbekannt"},M_={suche:{oeffnen:"Suchen"},bearbeiten:{rueckgaengig:"Rückgängig",wiederholen:"Wiederholen"},auswahl:{setzen:"Auswählen",aufheben:"Auswahl aufheben"},ansicht:{einpassen:"Ansicht einpassen",ergebnis:"Ergebnis","alle-entwuerfe":"Alle Entwürfe"},thema:{umschalten:"Hell oder dunkel umschalten"},arbeitsbereich:{wechseln:"Arbeitsbereich wechseln"},darstellung:{wechseln:"Darstellung wechseln",koerper:"Körper",kanten:"Nur Kanten",durchsicht:"Durchsicht"},ort:{"skizze-bearbeiten":"Skizze bearbeiten",fertig:"Fertig"},skizze:{anlegen:"Skizze anlegen",rechteck:"Rechteck aufziehen"},element:{"wert-setzen":"Wert setzen"},feature:{extrudieren:"Extrudieren",verrunden:"Verrunden"},schritt:{ausblenden:"Schritt ausblenden",einblenden:"Schritt einblenden",verwerfen:"Schritt verwerfen"},baugruppe:{anlegen:"Baugruppe anlegen"},verbindung:{anlegen:"Verbinden"},entwurf:{anlegen:"Entwurf anlegen",wechseln:"Zu Entwurf wechseln",vergleichen:"Entwurf vergleichen",uebernehmen:"Entwurf übernehmen",verwerfen:"Entwurf verwerfen"},ki:{fragen:"KI fragen",anhalten:"Anhalten"},vorschlag:{uebernehmen:"Übernehmen",verwerfen:"Verwerfen"},gespraech:{schliessen:"Schließen"},simulation:{lager:"Lager",kraft:"Kraft",ergebnis:"Ergebnis anzeigen"}},y_={bearbeiten:{rueckgaengig:"zurück, zurücknehmen, undo, letzten schritt",wiederholen:"vor, redo, wiederherstellen"},ansicht:{einpassen:"zoom, alles zeigen, einpassen, fit",ergebnis:"entwürfe, stand"},thema:{umschalten:"dunkel, hell, dark, light, farbschema"},darstellung:{koerper:"solid, flächen",kanten:"drahtmodell, linien, wireframe",durchsicht:"transparent, röntgen"},ort:{"skizze-bearbeiten":"skizze öffnen, zeichnung",fertig:"zurück zum teil, verlassen, beenden"},skizze:{anlegen:"zeichnen, neue skizze, ebene",rechteck:"box, viereck"},element:{"wert-setzen":"maß ändern, zahl, ändern"},feature:{extrudieren:"aufdicken, ziehen, dicke",verrunden:"abrunden, runden, kanten, fillet, radius"},schritt:{ausblenden:"verstecken, hide",einblenden:"zeigen, show",verwerfen:"wegwerfen, entfernen"},baugruppe:{anlegen:"zusammenbau, assembly, teile verbinden"},verbindung:{anlegen:"fest, zusammenfügen, befestigen, aufsetzen"},entwurf:{anlegen:"ausprobieren, variante, kopie",vergleichen:"unterschiede",uebernehmen:"gilt, annehmen",verwerfen:"ablehnen"},simulation:{kraft:"last, belastung, newton",lager:"festhalten, einspannen",ergebnis:"verformung, auswertung"},ki:{fragen:"hilfe, assistent, frage"}},w_={"ki-fragen":"KI fragen:","keine-treffer":"Keine Treffer",gruppe:{befehle:"Befehle",elemente:"Elemente"},facette:{alle:"Alle",befehle:"Befehle",elemente:"Elemente"}},E_={teil:"Teil",teile:"Teile",masse:"Maße",skizze:"Aus der Skizze",position:"Position",verbindung:"Verbindung",baugruppe:"Baugruppe",lager:"Lager",kraft:"Kraft",ergebnis:"Ergebnis",kante:"Kante"},T_={laenge:"Länge",breite:"Breite",dicke:"Dicke",hoehe:"Höhe",eckradius:"Eckradius",radius:"Radius",durchmesser:"Durchmesser",kraft:"Kraft",material:"Material",abmessungen:"Abmessungen",volumen:"Volumen",masse:"Masse",anzahl:"Anzahl",kanten:"Kanten",art:"Art",von:"Von",nach:"Nach",schritt:"Schritt",richtung:"Richtung",instanzen:"Instanzen",hoechstwert:"Höchstwert",berechnet:"berechnet"},A_={kante:"Kante",kanten:"{n} Kanten",mehrere:"{n} Elemente","mehrere-hinweis":"Wähle ein einzelnes Element, um Werte zu ändern.","skizze-zeichnen":"Ziehe im Modell ein Rechteck auf."},R_={fehler:{"nicht-lesbar":"Das kann ich nicht lesen. Beispiel: 8 mm",dimension:"Hier gehört eine andere Größe hin.",teilung:"Teilung durch null geht nicht."}},C_={fehlerhaft:"Fehlerhaft"},P_={fehler:"✕",arbeitet:"…"},L_={radius:"Der Radius ist größer als die halbe Breite ({grenze}).","radius-korrektur":"Radius auf {wert} setzen"},D_={art:{fest:"Fest",gleitend:"Gleitend",drehbar:"Drehbar"}},z_={"plus-x":"+X","minus-x":"−X","plus-y":"+Y","minus-y":"−Y","plus-z":"+Z","minus-z":"−Z"},I_={titel:"Entwürfe",name:"Name",platzhalter:"Dickere Platte",begruendung:"Begründung","begruendung-beispiel":"Zu schwer","zum-hauptstand":"Zum Hauptstand",zustand:{offen:"In Arbeit",uebernommen:"Übernommen",verworfen:"Verworfen"}},U_={ueberschrift:"Frage an die KI",simuliert:"KI simuliert",arbeitet:"Arbeitet",angehalten:"Angehalten",plan:{1:"Auswahl prüfen",2:"Vorschlag berechnen",3:"Vorschau erzeugen"},satz:{verrunden:"Runde die oberen Kanten mit 2 mm ab"},unbekannt:"Das habe ich nicht verstanden. Probiere zum Beispiel:",beispiel:{1:"Mach die Platte 20 mm länger",2:"Runde die oberen Kanten mit 2 mm ab"},titel:{verrundung:"Verrundung {radius}",mass:"{schritt}: {feld} auf {nachher}"},begruendung:{verrundung:"Gerundete Kanten sind stabiler und liegen besser in der Hand.",mass:"Das Maß wird wie gewünscht geändert."},zeile:{verrunden:"feature.verrunden radius={radius} ziel={ziel} kanten={anzahl}",wert:"element.wert-setzen element={element} name={name} wert={wert}"}},N_={neu:"neu"},k_={simulation:{reiter:"Simulation","lager-fest":"Fest",legende:"Verformung",simuliert:"Simuliert – kein berechnetes Ergebnis"}},F_={"erst-schritt-waehlen":"Wähle zuerst einen Schritt mit Skizze.","skizze-gezeichnet":"Rechteck gezeichnet","erst-skizze-waehlen":"Wähle zuerst eine fertige Skizze.","erst-kanten-waehlen":"Wähle zuerst Kanten.","wert-gesetzt":"Wert gesetzt",verworfen:"Schritt verworfen, nichts ist gelöscht","erst-zwei-teile":"Wähle zuerst zwei Teile.","erst-instanz-waehlen":"Wähle zuerst das Teil, das sich bewegen soll.","vorschlag-uebernommen":"Vorschlag übernommen","skizze-offen":"Skizze geöffnet"},Is={app:p_,stand:m_,pfad:g_,aufbau:v_,modell:__,leer:x_,ebene:b_,zustand:S_,befehl:M_,synonym:y_,suche:w_,gruppe:E_,feld:T_,inspektor:A_,wert:R_,status:C_,symbol:P_,befund:L_,verbindung:D_,richtung:z_,entwurf:I_,ki:U_,karte:N_,paket:k_,meldung:F_},O_={arbeitsbereich:"Model",aufbau:"Build",suche:"Search or ask",bereit:"Ready"},B_={haupt:"Main version"},V_={skizze:"Sketch"},G_={simulation:"Simulation"},H_={einpassen:"Fit",darstellung:{koerper:"Solid",kanten:"Edges",durchsicht:"See-through"}},W_={text:"Nothing built yet. The next step:"},X_={waehlen:"Choose a plane"},q_={unbekannt:"Unknown state"},Y_={suche:{oeffnen:"Search"},bearbeiten:{rueckgaengig:"Undo",wiederholen:"Redo"},auswahl:{setzen:"Select",aufheben:"Clear selection"},ansicht:{einpassen:"Fit view",ergebnis:"Result","alle-entwuerfe":"All drafts"},thema:{umschalten:"Switch light or dark"},arbeitsbereich:{wechseln:"Switch workspace"},darstellung:{wechseln:"Switch display",koerper:"Solid",kanten:"Edges only",durchsicht:"See-through"},ort:{"skizze-bearbeiten":"Edit sketch",fertig:"Done"},skizze:{anlegen:"Create sketch",rechteck:"Draw rectangle"},element:{"wert-setzen":"Set value"},feature:{extrudieren:"Extrude",verrunden:"Round"},schritt:{ausblenden:"Hide step",einblenden:"Show step",verwerfen:"Discard step"},baugruppe:{anlegen:"Create assembly"},verbindung:{anlegen:"Connect"},entwurf:{anlegen:"Create draft",wechseln:"Switch to draft",vergleichen:"Compare draft",uebernehmen:"Adopt draft",verwerfen:"Discard draft"},ki:{fragen:"Ask AI",anhalten:"Stop"},vorschlag:{uebernehmen:"Accept",verwerfen:"Discard"},gespraech:{schliessen:"Close"},simulation:{lager:"Support",kraft:"Force",ergebnis:"Show result"}},$_={bearbeiten:{rueckgaengig:"back, undo, take back",wiederholen:"redo, forward"},ansicht:{einpassen:"zoom, show all, fit",ergebnis:"drafts, version"},thema:{umschalten:"dark, light, theme"},darstellung:{koerper:"solid, faces",kanten:"wireframe, lines",durchsicht:"transparent, x-ray"},ort:{"skizze-bearbeiten":"open sketch, drawing",fertig:"back to part, leave, finish"},skizze:{anlegen:"draw, new sketch, plane",rechteck:"box"},element:{"wert-setzen":"change dimension, number, change"},feature:{extrudieren:"pull, thickness",verrunden:"fillet, round off, edges, radius"},schritt:{ausblenden:"hide",einblenden:"show",verwerfen:"throw away, remove"},baugruppe:{anlegen:"assembly, join parts"},verbindung:{anlegen:"fixed, attach, join"},entwurf:{anlegen:"try out, variant, copy",vergleichen:"differences",uebernehmen:"apply, accept",verwerfen:"reject"},simulation:{kraft:"load, newton",lager:"clamp, fixed",ergebnis:"deformation, evaluation"},ki:{fragen:"help, assistant, question"}},Z_={"ki-fragen":"Ask AI:","keine-treffer":"No results",gruppe:{befehle:"Commands",elemente:"Elements"},facette:{alle:"All",befehle:"Commands",elemente:"Elements"}},K_={teil:"Part",teile:"Parts",masse:"Dimensions",skizze:"From the sketch",position:"Position",verbindung:"Connection",baugruppe:"Assembly",lager:"Support",kraft:"Force",ergebnis:"Result",kante:"Edge"},J_={laenge:"Length",breite:"Width",dicke:"Thickness",hoehe:"Height",eckradius:"Corner radius",radius:"Radius",durchmesser:"Diameter",kraft:"Force",material:"Material",abmessungen:"Dimensions",volumen:"Volume",masse:"Mass",anzahl:"Count",kanten:"Edges",art:"Type",von:"From",nach:"To",schritt:"Step",richtung:"Direction",instanzen:"Instances",hoechstwert:"Maximum",berechnet:"calculated"},Q_={kante:"Edge",kanten:"{n} edges",mehrere:"{n} elements","mehrere-hinweis":"Select a single element to change values.","skizze-zeichnen":"Drag a rectangle in the model."},j_={fehler:{"nicht-lesbar":"I cannot read that. Example: 8 mm",dimension:"A different kind of quantity belongs here.",teilung:"Division by zero is not possible."}},ex={fehlerhaft:"Faulty"},tx={fehler:"✕",arbeitet:"…"},nx={radius:"The radius is larger than half the width ({grenze}).","radius-korrektur":"Set radius to {wert}"},ix={art:{fest:"Fixed",gleitend:"Sliding",drehbar:"Rotating"}},rx={"plus-x":"+X","minus-x":"−X","plus-y":"+Y","minus-y":"−Y","plus-z":"+Z","minus-z":"−Z"},sx={titel:"Drafts",name:"Name",platzhalter:"Thicker plate",begruendung:"Reason","begruendung-beispiel":"Too heavy","zum-hauptstand":"Back to main version",zustand:{offen:"In progress",uebernommen:"Adopted",verworfen:"Discarded"}},ax={ueberschrift:"Question for the AI",simuliert:"AI simulated",arbeitet:"Working",angehalten:"Stopped",plan:{1:"Check the selection",2:"Calculate a suggestion",3:"Create the preview"},satz:{verrunden:"Round the top edges with 2 mm"},unbekannt:"I did not understand that. Try for example:",beispiel:{1:"Make the plate 20 mm longer",2:"Round the top edges with 2 mm"},titel:{verrundung:"Rounding {radius}",mass:"{schritt}: {feld} to {nachher}"},begruendung:{verrundung:"Rounded edges are stronger and feel better in the hand.",mass:"The dimension changes as requested."},zeile:{verrunden:"feature.verrunden radius={radius} ziel={ziel} kanten={anzahl}",wert:"element.wert-setzen element={element} name={name} wert={wert}"}},ox={neu:"new"},lx={simulation:{reiter:"Simulation","lager-fest":"Fixed",legende:"Deformation",simuliert:"Simulated – not a calculated result"}},cx={"erst-schritt-waehlen":"Select a step with a sketch first.","skizze-gezeichnet":"Rectangle drawn","erst-skizze-waehlen":"Select a finished sketch first.","erst-kanten-waehlen":"Select edges first.","wert-gesetzt":"Value set",verworfen:"Step discarded, nothing is deleted","erst-zwei-teile":"Select two parts first.","erst-instanz-waehlen":"Select the part that should move first.","vorschlag-uebernommen":"Suggestion accepted","skizze-offen":"Sketch opened"},Ao={app:O_,stand:B_,pfad:V_,aufbau:G_,modell:H_,leer:W_,ebene:X_,zustand:q_,befehl:Y_,synonym:$_,suche:Z_,gruppe:K_,feld:J_,inspektor:Q_,wert:j_,status:ex,symbol:tx,befund:nx,verbindung:ix,richtung:rx,entwurf:sx,ki:ax,karte:ox,paket:lx,meldung:cx};function ux(i){const e=new URLSearchParams(i).get("sprache");return e==="en"||e==="schluessel"?e:"de"}function hx(i,e){let t=i;for(const n of e.split(".")){if(typeof t!="object")return;t=t[n]}return typeof t=="string"?t:void 0}function fx(i){return(e,t)=>{if(i==="schluessel")return e;const r=hx(i==="en"?Ao:Is,e)??e;return t?r.replace(/\{(\w+)\}/g,(s,a)=>String(t[a]??"")):r}}function Uc(i,e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent),n=i.split("+"),r=n[n.length-1]??"",s=n.slice(0,-1);if(t){const o={Mod:"⌘",Shift:"⇧",Alt:"⌥"};return s.map(l=>o[l]??l).join("")+r}const a={Mod:e==="en"?"Ctrl":"Strg",Shift:e==="en"?"Shift":"Umschalt",Alt:"Alt"};return[...s.map(o=>a[o]??o),r].join(" ")}function W(i,e={},...t){const n=document.createElement(i);for(const[r,s]of Object.entries(e))s==null||s===!1||(typeof s=="function"?n.addEventListener(r.slice(2).toLowerCase(),s):r==="class"?n.className=String(s):r==="value"&&n instanceof HTMLInputElement?n.value=String(s):n.setAttribute(r,s===!0?"":String(s)));for(const r of t)r===null||r===!1||r===void 0||n.append(typeof r=="string"?document.createTextNode(r):r);return n}function Zi(i,e,t){return i.dataset.signatur===e?!1:(i.dataset.signatur=e,i.replaceChildren(...t().filter(n=>!!n)),!0)}const Nc="http://www.w3.org/2000/svg";function vr(i){const e=document.createElementNS(Nc,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","16"),e.setAttribute("height","16"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.setAttribute("aria-hidden","true");for(const t of i){const n=document.createElementNS(Nc,"path");n.setAttribute("d",t),e.append(n)}return e}const _r={pfeilHoch:["M12 19V5","M5 12l7-7 7 7"],einpassen:["M8 3H5a2 2 0 0 0-2 2v3","M21 8V5a2 2 0 0 0-2-2h-3","M3 16v3a2 2 0 0 0 2 2h3","M16 21h3a2 2 0 0 0 2-2v-3"],rueckgaengig:["M9 14 4 9l5-5","M4 9h10.5a5.5 5.5 0 0 1 0 11H11"],wiederholen:["m15 14 5-5-5-5","M20 9H9.5a5.5 5.5 0 0 0 0 11H13"],suche:["m21 21-4.3-4.3","M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16"]};function Ro(i){const e=i.angezeigt(),t=i.aktivesTeil(),n=[{text:i.entwurfsName(),befehl:"ansicht.ergebnis",parameter:{},aktuell:!1},{text:t?.meta.name??e.meta.name,befehl:i.ui.ort.art==="skizze"?"ort.fertig":"auswahl.aufheben",parameter:{},aktuell:i.ui.ort.art==="teil"}];if(i.ui.ort.art==="skizze"&&i.ui.ort.schritt){const r=kn(e).find(s=>s.id===i.ui.ort.schritt);r&&r.type!=="skizze"&&n.push({text:r.meta.name,befehl:"auswahl.setzen",parameter:{elemente:[r.id]},aktuell:!1}),n.push({text:i.t("pfad.skizze"),befehl:"auswahl.setzen",parameter:{elemente:r?[r.id]:[]},aktuell:!0})}return n}function ps(i,e){let t=i;for(const n of e.split(".")){if(typeof t!="object")return;t=t[n]}return typeof t=="string"?t:void 0}const kc=i=>i.toLowerCase().normalize("NFC");class dx{constructor(e,t){this.app=e,this.el=t;const n=e.t,r=a=>Uc(Cr.find(o=>o.id===a)?.kuerzel??"",e.sprache);this.eingabe=W("input",{type:"text",placeholder:n("app.suche"),"aria-label":n("app.suche"),"data-befehl":"suche.oeffnen",autocomplete:"off",spellcheck:!1}),this.eingabe.addEventListener("focus",()=>{e.ui.suche.offen||e.starte("suche.oeffnen")}),this.eingabe.addEventListener("input",()=>{e.ui.suche.text=this.eingabe.value,e.ui.suche.index=0,this.listeAktualisieren()}),this.eingabe.addEventListener("keydown",a=>this.taste(a)),this.rueckgaengig=W("button",{type:"button","data-befehl":"bearbeiten.rueckgaengig"},vr([..._r.rueckgaengig]),W("span",{},n("befehl.bearbeiten.rueckgaengig")),W("kbd",{},r("bearbeiten.rueckgaengig"))),this.wiederholen=W("button",{type:"button","data-befehl":"bearbeiten.wiederholen","aria-label":n("befehl.bearbeiten.wiederholen"),title:n("befehl.bearbeiten.wiederholen")},vr([..._r.wiederholen]),W("kbd",{},r("bearbeiten.wiederholen"))),this.rueckgaengig.addEventListener("click",()=>e.starte("bearbeiten.rueckgaengig")),this.wiederholen.addEventListener("click",()=>e.starte("bearbeiten.wiederholen"));const s=W("label",{class:"suche"},vr([..._r.suche]),this.eingabe,W("kbd",{},r("suche.oeffnen")));t.append(this.pfad,this.reiter,s,this.rueckgaengig,this.wiederholen,this.liste),this.liste.addEventListener("mousedown",a=>a.preventDefault()),document.addEventListener("mousedown",a=>{e.ui.suche.offen&&!t.contains(a.target)&&this.schliessen()}),this.liste.addEventListener("click",a=>{const o=a.target.closest("[data-facette]");if(o){e.ui.suche.facette=o.dataset.facette,this.listeAktualisieren();return}const l=a.target.closest('[role="option"]');l&&this.waehlen(Number(l.dataset.index))})}pfad=W("nav",{"data-muster-kandidat":"Pfad","aria-label":"Pfad"});reiter=W("div",{"data-muster":"Arbeitsbereiche",role:"tablist"});eingabe;liste=W("div",{"data-suche":"","data-overlay":"suchliste","data-muster":"Suche",hidden:!0});rueckgaengig;wiederholen;ergebnisse=[];zuletztOffen=!1;taste(e){const t=this.app.ui.suche;if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();const n=this.ergebnisse.length;n&&(t.index=(t.index+(e.key==="ArrowDown"?1:-1)+n)%n),this.listeAktualisieren()}else e.key==="Enter"?(e.preventDefault(),this.waehlen(t.index)):e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),this.schliessen())}schliessen(){const e=this.app.ui.suche;e.offen=!1,e.text="",e.index=0,this.eingabe.value="",this.eingabe.blur(),this.app.aktualisieren()}waehlen(e){const t=this.ergebnisse[e];if(!t)return;const n=this.app.ui.suche.text;this.schliessen(),t.art==="befehl"?this.app.starte(t.id):t.art==="element"?this.app.waehlen([t.id]):this.app.starte("ki.fragen",{absicht:n})}treffer(){const e=this.app,t=kc(e.ui.suche.text.trim()),n=l=>{let c=1/0;return l.forEach((u,f)=>{const h=kc(u);if(!h)return;const d=f===0?0:10;t?h===t?c=Math.min(c,d):h.startsWith(t)?c=Math.min(c,d+1):h.split(/[\s-]+/).some(m=>m.startsWith(t))?c=Math.min(c,d+2):h.includes(t)&&(c=Math.min(c,d+3)):c=Math.min(c,20)}),c},s=Cr.map((l,c)=>{const u=[ps(Is,l.titel)??"",ps(Ao,l.titel)??""],f=[ps(Is,`synonym.${l.id}`)??"",ps(Ao,`synonym.${l.id}`)??""].join(" ").split(/\s*,\s*/),h=n([u[0],u[1],...f,l.id]);return{b:l,i:c,punkte:h,titel:e.t(l.titel)}}).filter(l=>l.punkte<1/0).sort((l,c)=>l.punkte-c.punkte||l.i-c.i).slice(0,t?8:12).map(l=>({art:"befehl",id:l.b.id,text:l.titel,kuerzel:l.b.kuerzel?Uc(l.b.kuerzel,e.sprache):void 0})),a=t?kn(e.angezeigt()).filter(l=>!["ebene","skizze"].includes(l.type)).map(l=>({e:l,punkte:n([l.meta.name])})).filter(l=>l.punkte<1/0).sort((l,c)=>l.punkte-c.punkte).slice(0,8).map(l=>({art:"element",id:l.e.id,text:l.e.meta.name})):[],o=t&&!s.length&&n_(e.ui.suche.text)?{art:"ki",id:"ki.fragen",text:`${e.t("suche.ki-fragen")} ${e.ui.suche.text.trim()}`}:null;return{befehle:s,elemente:a,ki:o}}listeAktualisieren(){const e=this.app,t=e.ui.suche;if(this.liste.hidden=!t.offen,!t.offen)return;const n=this.treffer(),r=[];n.ki&&r.push(n.ki),t.facette!=="elemente"&&r.push(...n.befehle),t.facette!=="befehle"&&r.push(...n.elemente),this.ergebnisse=r,t.index>=r.length&&(t.index=Math.max(0,r.length-1));let s=0;const a=c=>{const u=s++;return W("button",{type:"button",role:"option",tabindex:-1,"data-index":u,"data-befehl":c.art==="element"?"auswahl.setzen":c.id,"data-element":c.art==="element"?c.id:null,"aria-selected":u===t.index?"true":"false"},W("span",{class:"titel"},c.text),c.kuerzel?W("kbd",{},c.kuerzel):null)},o=(c,u,f)=>f.length?W("div",{"data-gruppe":c},W("h4",{},e.t(u)),...f.map(a)):null,l=W("div",{class:"chips","data-muster":"Auswahlfeld"},...["alle","befehle","elemente"].map(c=>W("button",{type:"button","data-befehl":"suche.oeffnen","data-facette":c,"aria-pressed":t.facette===c?"true":"false"},e.t(`suche.facette.${c}`))));this.liste.replaceChildren(l,...[n.ki?W("div",{"data-gruppe":"ki"},a(n.ki)):null,t.facette!=="elemente"?o("befehle","suche.gruppe.befehle",n.befehle):null,t.facette!=="befehle"?o("elemente","suche.gruppe.elemente",n.elemente):null,r.length?null:W("p",{class:"leer"},e.t("suche.keine-treffer"))].filter(c=>!!c))}rendern(){const e=this.app,t=e.ui;Zi(this.pfad,JSON.stringify(Ro(e)),()=>Ro(e).map((r,s)=>{const a=W("button",{type:"button","data-befehl":r.befehl,"data-glied":s,"aria-current":r.aktuell?"page":null},r.text);return a.addEventListener("click",()=>{s===0&&t.inspektor==="entwuerfe"?(t.inspektor="auswahl",t.vergleich=!1,e.aktualisieren()):e.starte(r.befehl,r.parameter)}),a})),Zi(this.reiter,JSON.stringify([t.bereich,e.sprache]),()=>[["modell","app.arbeitsbereich"],["simulation","paket.simulation.reiter"]].map(([n,r])=>{const s=W("button",{type:"button",role:"tab","data-befehl":"arbeitsbereich.wechseln","data-bereich":n,"aria-selected":t.bereich===n?"true":"false"},e.t(r));return s.addEventListener("click",()=>e.starte("arbeitsbereich.wechseln",{bereich:n})),s})),this.rueckgaengig.disabled=!1,t.suche.offen&&!this.zuletztOffen&&(this.eingabe.focus(),this.eingabe.select()),this.zuletztOffen=t.suche.offen,this.eingabe.value!==t.suche.text&&document.activeElement!==this.eingabe&&(this.eingabe.value=t.suche.text),this.listeAktualisieren()}}function px(i){return!!Dt(i)||i.type==="skizze"}function mx(i){const e=i.ui,t=i.angezeigt(),n=[],r=(c,u,f={})=>({id:c.id,name:c.meta.name,ebene:u,art:"schritt",schritt:c.id,deaktiviert:!1,status:null,sketch:px(c),...f}),s=t.content.filter(c=>c.type==="teil"),a=s.length===1&&!s[0]?.params.form,o=new Set(e.auswahl),l=(c,u)=>{const f=Qn(c),h=new Map(f.befunde.map(m=>[m.schritt,m])),d=e.ort.art==="skizze"?c.content.findIndex(m=>m.id===e.ort.schritt):-1;c.content.forEach((m,x)=>{if(m.type==="ursprung"){if(n.push(r(m,u)),e.ebenenWahl||o.has(m.id))for(const R of m.content)n.push(r(R,u+1));return}const g=h.has(m.id)?{wort:"status.fehlerhaft",symbol:"symbol.fehler"}:null;n.push(r(m,u,{deaktiviert:d>=0&&x>d,status:g}));const p=Dt(m),T=o.has(m.id)||e.ort.schritt===m.id||p&&o.has(p.id);p&&T&&n.push(r(p,u+1,{schritt:m.id,deaktiviert:d>=0&&x>d}))})};if(a&&s[0])l(s[0],0);else for(const c of t.content)if(c.type==="teil")n.push(r(c,0));else if(c.type==="baugruppe"){n.push(r(c,0));for(const u of c.content)n.push(r(u,1))}if(e.bereich==="simulation"){n.push({id:"trenner-simulation",name:"aufbau.simulation",ebene:0,art:"trenner",schritt:"",deaktiviert:!1,status:null,sketch:!1});const c=t.content.find(u=>u.type==="studie");for(const u of c?.content??[])n.push(r(u,0))}return n}class gx{constructor(e,t){this.app=e,this.el=t,t.append(W("h2",{},e.t("app.aufbau")),this.liste),this.liste.addEventListener("click",n=>{const r=n.target.closest("[data-schritt]");!r||r.getAttribute("aria-disabled")==="true"||e.waehlen([r.dataset.schritt],n.shiftKey)}),this.liste.addEventListener("dblclick",n=>{const r=n.target.closest("[data-schritt]");!r||r.getAttribute("aria-disabled")==="true"||r.dataset.skizze!=="1"||e.starte("ort.skizze-bearbeiten",{schritt:r.dataset.schritt})}),this.liste.addEventListener("contextmenu",n=>{const r=n.target.closest("[data-schritt]");if(!r)return;n.preventDefault();const s=r.dataset.schritt;e.ui.auswahl.includes(s)||e.waehlen([s]),e.ui.menue={x:n.clientX,y:n.clientY},e.aktualisieren()}),this.liste.addEventListener("mouseover",n=>{const r=n.target.closest("[data-schritt]");e.setHover(r?.dataset.ziel??null)}),this.liste.addEventListener("mouseleave",()=>e.setHover(null))}liste=W("div",{role:"tree",class:"baum","aria-label":"Aufbau"});rendern(){const e=this.app,t=mx(e);Zi(this.liste,JSON.stringify(t),()=>t.map(a=>a.art==="trenner"?W("div",{role:"separator",class:"trenner"},e.t(a.name)):W("button",{type:"button",role:"treeitem",class:"zeile","data-schritt":a.id,"data-ziel":a.schritt,"data-ebene":a.ebene,"data-skizze":a.sketch?"1":null,"data-befehl":"auswahl.setzen"},W("span",{class:"name"},a.name),a.status?W("span",{class:"status status-fehler","data-muster":"Statusanzeige"},W("span",{class:"symbol"},e.t(a.status.symbol)),W("span",{class:"wort"},e.t(a.status.wort))):null)));const n=new Set(e.ui.auswahl),r=new Set(e.kantenAuswahl().map(a=>a.split("/")[0])),s=new Map(t.map(a=>[a.id,a]));for(const a of this.liste.querySelectorAll("[data-schritt]")){const o=a.dataset.schritt,l=s.get(o);a.setAttribute("aria-selected",n.has(o)?"true":"false"),l?.deaktiviert?a.setAttribute("aria-disabled","true"):a.removeAttribute("aria-disabled"),r.has(o)?a.setAttribute("data-zugehoerig",""):a.removeAttribute("data-zugehoerig"),e.ui.hover!==null&&e.ui.hover===a.dataset.ziel?a.setAttribute("data-hervorgehoben",""):a.removeAttribute("data-hervorgehoben")}}}const Vi=(i,e,t=2)=>{const n=String(Math.round(e*10**t)/10**t);return i.sprache==="en"?n:n.replace(".",",")};function Co(i,e){const t=i.ergebnisse().get(e.id)??Qn(e),[n,r,s]=t.abmessungen_mm;return[{name:i.t("gruppe.teil"),felder:[{name:i.t("feld.material"),art:"text",text:String(e.params.material??"PLA")},{name:i.t("feld.abmessungen"),art:"text",text:`${Vi(i,n)} × ${Vi(i,r)} × ${Vi(i,s)} mm`,berechnet:!0},{name:i.t("feld.volumen"),art:"text",text:`${Vi(i,t.volumen_mm3/1e3)} cm³`,berechnet:!0},{name:i.t("feld.masse"),art:"text",text:`${Vi(i,t.masse_g)} g`,berechnet:!0}]}]}const ci=(i,e,t,n,r,s="laenge")=>({name:e,art:"wert",dimension:s,wert:t,ziel:{element:n,name:r}});function vx(i,e){const t=i.t,n=i.ui.ort.art==="skizze",r=[],s=[];let a=null,o=null;const l=Dt(e),c=i.aktivesTeil(),u=c?i.ergebnisse().get(c.id):void 0,f=[],h=[],d=(x,g,p)=>{x.params.laenge&&h.push(ci(i,t("feld.laenge"),x.params.laenge,p,`${g}laenge`)),x.params.breite&&h.push(ci(i,t("feld.breite"),x.params.breite,p,`${g}breite`)),x.params.eckradius&&h.push(ci(i,t("feld.eckradius"),x.params.eckradius,p,`${g}eckradius`))};switch(e.type){case"extrusion":{const x=e.params.dicke?"dicke":"hoehe";f.push(ci(i,t(`feld.${x}`),e.params[x],e.id,x)),l&&d(l,"skizze.",e.id);break}case"bohrung":f.push(ci(i,t("feld.durchmesser"),e.params.durchmesser,e.id,"durchmesser")),h.push({name:t("feld.anzahl"),art:"text",text:String((l?.params.punkte??[]).length),berechnet:!0});break;case"skizze":e.params.laenge?d(e,"",e.id):o=t("inspektor.skizze-zeichnen");break;case"verrundung":{f.push(ci(i,t("feld.radius"),e.params.radius,e.id,"radius")),f.push({name:t("feld.kanten"),art:"text",text:String(e.params.kanten.length),berechnet:!0});const x=u?.befunde.find(g=>g.schritt===e.id);x&&(a={text:t("befund.radius",{grenze:St(Ve(x.grenze),i.sprache==="en"?"en":"de")}),korrektur:{befehl:"element.wert-setzen",text:t("befund.radius-korrektur",{wert:St(Ve(x.grenze),i.sprache==="en"?"en":"de")}),parameter:{element:e.id,name:"radius",wert:Ve(x.grenze)}}});break}case"instanz":{const x=e.params.position;r.push({name:t("gruppe.position"),felder:["x","y","z"].map(g=>({name:g.toUpperCase(),art:"text",text:St(x[g],i.sprache==="en"?"en":"de"),berechnet:!0}))});break}case"verbindung":r.push({name:t("gruppe.verbindung"),felder:[{name:t("feld.von"),art:"text",text:String(e.params.von)},{name:t("feld.nach"),art:"text",text:String(e.params.nach)},{name:t("feld.art"),art:"wahl",text:String(e.params.art),ziel:{element:e.id,name:"art"},optionen:["Fest","Gleitend","Drehbar"].map(x=>({wert:x,text:t(`verbindung.art.${x.toLowerCase()}`)}))}]});break;case"baugruppe":r.push({name:t("gruppe.baugruppe"),felder:[{name:t("feld.instanzen"),art:"text",text:String(e.content.filter(x=>x.type==="instanz").length),berechnet:!0}]});break;case"teil":return{titel:e.meta.name,gruppen:Co(i,e),knoepfe:s,befund:a,hinweis:o};case"lager":r.push({name:t("gruppe.lager"),felder:[{name:t("feld.art"),art:"text",text:t("paket.simulation.lager-fest")}]}),o=t("paket.simulation.simuliert");break;case"kraft":r.push({name:t("gruppe.kraft"),felder:[ci(i,t("feld.kraft"),e.params.kraft,e.id,"kraft","kraft"),{name:t("feld.richtung"),art:"wahl",text:String(e.params.richtung),ziel:{element:e.id,name:"richtung"},optionen:["+X","-X","+Y","-Y","+Z","-Z"].map(x=>({wert:x,text:t(`richtung.${x[0]==="+"?"plus":"minus"}-${x[1]?.toLowerCase()}`)}))}]}),o=t("paket.simulation.simuliert");break;case"ergebnis":{const g=i.angezeigt().content.find(T=>T.type==="studie")?.content.find(T=>T.type==="kraft"),p=nt(g?.params.kraft)*.02;r.push({name:t("gruppe.ergebnis"),felder:[{name:t("feld.hoechstwert"),art:"text",text:St(Ve(p),i.sprache==="en"?"en":"de"),berechnet:!0}]}),o=t("paket.simulation.simuliert");break}}const m=[];if(f.length&&m.push({name:t("gruppe.masse"),felder:f}),h.length&&m.push({name:t("gruppe.skizze"),felder:h}),m.push(...r),c&&["extrusion","bohrung","skizze","verrundung"].includes(e.type)){const x=Co(i,c)[0];x&&m.push({name:x.name,felder:x.felder.filter(g=>g.name!==t("feld.material"))})}return n&&(l||e.type==="skizze")?s.push({befehl:"ort.fertig",text:t("befehl.ort.fertig"),hauptaktion:!0}):(l||e.type==="skizze")&&s.push({befehl:"ort.skizze-bearbeiten",text:t("befehl.ort.skizze-bearbeiten"),parameter:{schritt:e.id}}),{titel:e.meta.name,gruppen:m,knoepfe:s,befund:a,hinweis:o}}function _x(i){const e=i.t,t=i.angezeigt(),n=i.ui.auswahl;if(!n.length){const a=i.aktivesTeil();if(!a)return{titel:t.meta.name,gruppen:[],knoepfe:[],befund:null,hinweis:null};const o=t.content.filter(l=>l.type==="teil");return o.length>1?{titel:t.meta.name,gruppen:[{name:e("gruppe.teile"),felder:o.map(l=>{const c=i.ergebnisse().get(l.id)??Qn(l);return{name:l.meta.name,art:"text",text:`${Vi(i,c.volumen_mm3/1e3)} cm³`,berechnet:!0}})}],knoepfe:[],befund:null,hinweis:null}:{titel:a.meta.name,gruppen:Co(i,a),knoepfe:[],befund:null,hinweis:null}}const r=i.kantenAuswahl();if(r.length===n.length){const a=i.alleKoerper().flatMap(c=>c.kanten),o=r.map(c=>a.find(u=>u.id===c)).filter(c=>!!c),l=jt(t,r[0].split("/")[0]);return{titel:r.length===1?e("inspektor.kante"):e("inspektor.kanten",{n:r.length}),gruppen:[{name:e("gruppe.kante"),felder:[{name:e("feld.laenge"),art:"text",text:o.length===1?St(Ve(o[0]?.laenge??0),i.sprache==="en"?"en":"de"):String(o.length),berechnet:!0},{name:e("feld.schritt"),art:"text",text:l?.meta.name??""}]}],knoepfe:[],befund:null,hinweis:null}}if(n.length>1)return{titel:e("inspektor.mehrere",{n:n.length}),gruppen:[],knoepfe:[],befund:null,hinweis:e("inspektor.mehrere-hinweis")};const s=jt(t,n[0]);return s?vx(i,s):{titel:t.meta.name,gruppen:[],knoepfe:[],befund:null,hinweis:null}}class xx{constructor(e,t){this.app=e,this.el=t,t.append(this.inhalt)}inhalt=W("div",{class:"inhalt"});feldFokussieren(e){const t=this.inhalt.querySelector(`input[data-name="${e}"]`);t&&(t.focus(),t.select())}rendern(){const t=this.app.ui,n=t.inspektor==="gespraech"&&!!t.gespraech;if(n?(this.el.setAttribute("data-muster-kandidat","Gespräch"),this.el.setAttribute("data-quelle","ki"),this.el.removeAttribute("data-muster")):(this.el.removeAttribute("data-muster-kandidat"),this.el.removeAttribute("data-quelle"),this.el.setAttribute("data-muster","Eigenschaften-Panel")),n&&t.gespraech){this.gespraech();return}if(t.inspektor==="entwuerfe"){this.entwuerfe();return}this.auswahl()}auswahl(){const e=this.app,t=_x(e),n=JSON.stringify({m:"auswahl",i:[t.titel,t.gruppen.map(s=>[s.name,s.felder.map(a=>[a.name,a.art,a.ziel,a.optionen?.map(o=>o.wert)])]),t.knoepfe,t.befund?.text,t.hinweis]});Zi(this.inhalt,n,()=>this.bauen(t))||this.patchen(t)}bauen(e){const t=this.app,n=[W("h2",{},e.titel)];for(const r of e.gruppen)n.push(W("section",{"data-gruppe":r.name},W("h3",{},r.name),...r.felder.map(s=>this.feld(s))));if(e.hinweis&&n.push(W("p",{class:"hinweis","data-hinweis":""},e.hinweis)),e.befund){const r=e.befund,s=W("button",{type:"button","data-befehl":r.korrektur.befehl},r.korrektur.text);s.addEventListener("click",()=>t.ausfuehren(r.korrektur.befehl,r.korrektur.parameter??{})),n.push(W("div",{"data-muster":"Befund",role:"alert"},W("p",{},r.text),s))}for(const r of e.knoepfe){const s=W("button",{type:"button",class:"knopf","data-befehl":r.befehl,"data-hauptaktion":r.hauptaktion??null},r.text);s.addEventListener("click",()=>t.starte(r.befehl,r.parameter??{})),n.push(s)}return n}feld(e){const t=this.app;if(e.art==="wert"&&e.ziel&&e.wert)return this.wertfeld(e);if(e.art==="wahl"&&e.ziel&&e.optionen){const n=e.ziel;return W("div",{class:"feld","data-feld":e.name,"data-muster":"Auswahlfeld"},W("span",{class:"label"},e.name),W("div",{role:"radiogroup",class:"segmente"},...e.optionen.map(r=>{const s=W("button",{type:"button",role:"radio","data-befehl":"element.wert-setzen","data-wert":r.wert,"aria-checked":e.text===r.wert?"true":"false"},r.text);return s.addEventListener("click",()=>t.ausfuehren("element.wert-setzen",{element:n.element,name:n.name,wert:r.wert})),s})))}return W("div",{class:"feld","data-feld":e.name},W("span",{class:"label"},e.name),W("span",{class:"zelle"},W("span",{class:"wert","data-wert-text":""},e.text??""),e.berechnet?W("span",{class:"berechnet","data-berechnet":""},t.t("feld.berechnet")):null))}wertfeld(e){const t=this.app,n=e.ziel,r=e.dimension??"laenge",s=St(e.wert,t.sprache==="en"?"en":"de"),a=`feld-${n.element}-${n.name}`.replace(/[^a-zA-Z0-9-]/g,"-"),o=W("span",{class:"fehler",role:"alert",hidden:!0}),l=W("input",{id:a,type:"text",inputmode:"decimal",value:s,autocomplete:"off",spellcheck:!1,"data-befehl":"element.wert-setzen","data-element":n.element,"data-name":n.name,"data-original":s}),c=()=>{l.value=l.dataset.original??"",o.hidden=!0,t.ui.live=null,t.aktualisieren()},u=()=>{if(l.value===l.dataset.original)return;const f=zs(l.value,"mm",r);if(!f.ok){c();return}o.hidden=!0;const h=St(f.groesse,t.sprache==="en"?"en":"de");l.value=h,l.dataset.original=h,t.ausfuehren("element.wert-setzen",{element:n.element,name:n.name,wert:f.groesse})};return l.addEventListener("input",()=>{const f=zs(l.value,"mm",r);f.ok?(o.hidden=!0,t.ui.live={element:n.element,name:n.name,wert:f.groesse},t.aktualisieren()):(o.textContent=t.t(f.fehler),o.hidden=!1)}),l.addEventListener("keydown",f=>{f.key==="Enter"?(f.preventDefault(),u()):f.key==="Escape"&&l.value!==l.dataset.original&&(f.preventDefault(),f.stopPropagation(),c())}),l.addEventListener("blur",()=>{l.value!==l.dataset.original&&u()}),W("div",{class:"feld","data-feld":e.name,"data-muster":"Wertfeld"},W("label",{for:a},e.name),l,o)}patchen(e){const t=this.app,n=e.gruppen.flatMap(r=>r.felder);for(const r of n)if(r.art==="wert"&&r.ziel&&r.wert){const s=this.inhalt.querySelector(`input[data-element="${r.ziel.element}"][data-name="${r.ziel.name}"]`);if(!s)continue;const a=St(r.wert,t.sprache==="en"?"en":"de"),o=s.value!==s.dataset.original;o||(s.value=a),s.dataset.original=o?s.dataset.original??a:a}else if(r.art==="wahl"&&r.ziel)this.inhalt.querySelectorAll(`[data-feld="${r.name}"] [role="radio"]`).forEach(s=>s.setAttribute("aria-checked",s.dataset.wert===r.text?"true":"false"));else{const a=Array.from(this.inhalt.querySelectorAll("[data-feld]")).find(o=>o.dataset.feld===r.name)?.querySelector("[data-wert-text]");a&&a.textContent!==(r.text??"")&&(a.textContent=r.text??"")}}gespraech(){const e=this.app,t=e.t,n=e.ui.gespraech;if(!n)return;const r=JSON.stringify(["gespraech",n.phase,n.plan,n.frage,n.vorschlag?.titel]);Zi(this.inhalt,r,()=>{const s=[W("h2",{},t("ki.ueberschrift")),W("p",{class:"kennzeichnung","data-kennzeichnung":"ki"},t("ki.simuliert")),W("p",{class:"frage"},n.frage)],a=W("button",{type:"button",class:"knopf","data-befehl":"gespraech.schliessen"},t("befehl.gespraech.schliessen"));if(a.addEventListener("click",()=>e.starte("gespraech.schliessen")),n.phase==="arbeitet"||n.phase==="angehalten"){if(s.push(W("div",{"data-muster":"Statusanzeige",class:"status"},W("span",{class:"symbol"},t("symbol.arbeitet")),W("span",{class:"wort"},t(n.phase==="arbeitet"?"ki.arbeitet":"ki.angehalten"))),W("ol",{class:"plan"},...[1,2,3].map(o=>W("li",{"data-erledigt":n.plan>=o?"1":"0"},t(`ki.plan.${o}`))))),n.phase==="arbeitet"){const o=W("button",{type:"button",class:"knopf","data-befehl":"ki.anhalten"},t("befehl.ki.anhalten"));o.addEventListener("click",()=>e.starte("ki.anhalten")),s.push(o)}}else n.phase==="erklaerung"?s.push(W("div",{"data-muster":"Befund"},W("p",{},t("ki.unbekannt"))),W("ul",{class:"beispiele"},W("li",{"data-beispiel":""},t("ki.beispiel.1")),W("li",{"data-beispiel":""},t("ki.beispiel.2")))):n.vorschlag&&s.push(this.karte(n.vorschlag));return s.push(a),s})}karte(e){const t=this.app,n=t.t,r=e.befehle.map(o=>o.id==="feature.verrunden"?n("ki.zeile.verrunden",{radius:St(o.parameter.radius,t.sprache==="en"?"en":"de"),ziel:String(o.parameter.ziel),anzahl:String(o.parameter.kanten.length)}):n("ki.zeile.wert",{element:String(o.parameter.element),name:String(o.parameter.name),wert:St(o.parameter.wert,t.sprache==="en"?"en":"de")})),s=W("button",{type:"button",class:"knopf","data-befehl":"vorschlag.uebernehmen","data-hauptaktion":""},n("befehl.vorschlag.uebernehmen")),a=W("button",{type:"button",class:"knopf ruhig","data-befehl":"vorschlag.verwerfen"},n("befehl.vorschlag.verwerfen"));return s.addEventListener("click",()=>t.starte("vorschlag.uebernehmen")),a.addEventListener("click",()=>t.starte("vorschlag.verwerfen")),W("section",{"data-muster":"Entscheidungskarte","data-quelle":"ki"},W("h3",{},n(e.titel.schluessel,e.titel.werte)),W("p",{class:"kennzeichnung"},n("ki.simuliert")),W("p",{},n(e.begruendung)),W("div",{class:"werte"},...e.werte.map(o=>W("div",{class:"feldzeile"},W("span",{},n(`feld.${o.feld}`)),W("span",{"data-feld":"vorher"},o.vorher==="–"?n("karte.neu"):o.vorher),W("span",{"data-feld":"nachher"},o.nachher)))),W("div",{class:"befehlszeilen"},...r.map(o=>W("code",{},o))),W("div",{class:"aktionen"},s,a))}entwuerfe(){const e=this.app,t=e.t,n=e.ui,r=e.sitzung.modell(),s=Pr(r),a=$i(r),o=JSON.stringify(["entwuerfe",n.entwurfAnsicht,n.vergleich,s.map(l=>[l.id,l.meta.name,pi(l),l.params.begruendung]),a?.id]);Zi(this.inhalt,o,()=>{const l=[W("h2",{},t("entwurf.titel"))],c=W("div",{class:"chips","data-muster":"Auswahlfeld"},...[["ansicht.ergebnis","ergebnis"],["ansicht.alle-entwuerfe","alle"]].map(([f,h])=>{const d=W("button",{type:"button","data-befehl":f,"aria-pressed":n.entwurfAnsicht===h?"true":"false"},t(`befehl.${f}`));return d.addEventListener("click",()=>e.starte(f)),d}));if(l.push(c),a){const f=W("button",{type:"button","data-befehl":"entwurf.wechseln","data-entwurf":""},t("entwurf.zum-hauptstand"));f.addEventListener("click",()=>e.starte("entwurf.wechseln",{entwurf:""})),l.push(f)}const u=s.filter(f=>n.entwurfAnsicht==="alle"||pi(f)!=="verworfen");if(l.push(W("ul",{class:"entwuerfe"},...u.map(f=>{const h=pi(f),d=W("li",{"data-entwurf-eintrag":f.id},W("span",{"data-feld":"name"},f.meta.name),W("span",{"data-feld":"zustand",class:"zustand"},t(`entwurf.zustand.${h}`)),h==="verworfen"?W("span",{"data-feld":"begruendung"},String(f.params.begruendung??"")):null);if(h==="offen"&&a?.id!==f.id){const m=W("button",{type:"button","data-befehl":"entwurf.wechseln"},t("befehl.entwurf.wechseln"));m.addEventListener("click",()=>e.starte("entwurf.wechseln",{entwurf:f.id})),d.append(m)}return d}))),a&&n.vergleich)l.push(this.vergleich(a));else{if(a){const m=W("button",{type:"button",class:"knopf","data-befehl":"entwurf.vergleichen"},t("befehl.entwurf.vergleichen"));m.addEventListener("click",()=>e.starte("entwurf.vergleichen")),l.push(m)}const f=W("input",{type:"text",placeholder:t("entwurf.platzhalter"),"aria-label":t("entwurf.name"),"data-befehl":"entwurf.anlegen",autocomplete:"off"}),h=W("button",{type:"button",class:"knopf","data-befehl":"entwurf.anlegen"},t("befehl.entwurf.anlegen")),d=()=>{f.value.trim()&&e.starte("entwurf.anlegen",{name:f.value.trim()})};f.addEventListener("keydown",m=>{m.key==="Enter"&&(m.preventDefault(),d())}),h.addEventListener("click",d),l.push(W("div",{class:"neu","data-muster":"Textfeld"},f,h))}return l})}vergleich(e){const t=this.app,n=t.t,r=t.sitzung.modell(),s=[],a=f=>St(f,t.sprache==="en"?"en":"de"),o=Bs(e);for(const[f,h]of Object.entries(o)){const d=ti(r).find(m=>m.id===f);if(d)for(const[m,x]of Object.entries(h)){const g=d.params[m];g&&typeof g=="object"&&"value"in g&&x&&typeof x=="object"&&"value"in x&&s.push({schritt:d.meta.name,feld:n(`feld.${m}`),vorher:a(g),nachher:a(x)})}}const l=W("input",{type:"text",placeholder:n("entwurf.begruendung-beispiel"),"aria-label":n("entwurf.begruendung"),"data-befehl":"entwurf.verwerfen",autocomplete:"off"}),c=W("button",{type:"button",class:"knopf ruhig","data-befehl":"entwurf.verwerfen",disabled:!0},n("befehl.entwurf.verwerfen")),u=W("button",{type:"button",class:"knopf","data-befehl":"entwurf.uebernehmen","data-hauptaktion":""},n("befehl.entwurf.uebernehmen"));return l.addEventListener("input",()=>{c.disabled=!l.value.trim()}),c.addEventListener("click",()=>{l.value.trim()&&t.starte("entwurf.verwerfen",{begruendung:l.value.trim()})}),u.addEventListener("click",()=>t.starte("entwurf.uebernehmen")),W("section",{"data-muster":"Vergleich","data-entwurfskarte":""},W("h3",{},e.meta.name),...s.map(f=>W("div",{class:"feldzeile","data-vergleich-zeile":""},W("span",{"data-schritt-name":""},f.schritt),W("span",{"data-feld-name":""},f.feld),W("span",{"data-vorher":""},f.vorher),W("span",{"data-nachher":""},f.nachher))),W("div",{class:"neu","data-muster":"Textfeld"},l),W("div",{class:"aktionen"},u,c))}}function jo(i){if(i.ui.ort.art==="skizze")return[];const e=i.gewaehlt();if(!e||e.type!=="extrusion")return[];const t=e.params.dicke?"dicke":"hoehe";return[{schritt:e.id,parameter:i.t(`feld.${t}`),name:t}]}function Fc(i){const t=i.ui.auswahl;if(!t.length)return[];const n=i.angezeigt(),r=i.kantenAuswahl();if(r.length){const l=r.every(f=>(f.split("/")[2]??"").startsWith("oben-")),c=new Set(r.map(f=>f.split("/")[0])),u=c.size===1?n.content.flatMap(f=>f.content).find(f=>f.id===[...c][0]):void 0;return l&&u&&u.type==="extrusion"&&u.params.hoehe?["feature.verrunden"]:[]}if(t.length>1)return n.content.filter(c=>t.includes(c.id)&&c.type==="teil").length===t.length&&!n.content.some(c=>c.type==="baugruppe")?["baugruppe.anlegen"]:[];const s=Kn(n,t[0])??n.content.find(l=>l.id===t[0]);if(!s)return[];const o=s.meta.ausgeblendet===!0?"schritt.einblenden":"schritt.ausblenden";switch(s.type){case"extrusion":case"bohrung":return["ort.skizze-bearbeiten",o,"schritt.verwerfen"];case"skizze":return s.params.laenge?["feature.extrudieren","ort.skizze-bearbeiten","schritt.verwerfen"]:["ort.skizze-bearbeiten","schritt.verwerfen"];case"verrundung":return[o,"schritt.verwerfen"];case"instanz":return["verbindung.anlegen"];default:return[]}}const bx=4;class Sx{constructor(e,t,n){this.app=e,this.el=t,this.fokus=n,this.massLinien.setAttribute("class","massLinien"),this.szene=new Dv(t),e.szene=this.szene,this.szene.aufRender=()=>this.positionieren(),e.nachRender.push(()=>this.positionieren());const r=W("button",{type:"button",class:"einpassen","data-befehl":"ansicht.einpassen"},vr([..._r.einpassen]),W("span",{},e.t("modell.einpassen")));r.addEventListener("click",()=>e.starte("ansicht.einpassen"));for(const[s,a]of[["koerper","modell.darstellung.koerper"],["kanten","modell.darstellung.kanten"],["durchsicht","modell.darstellung.durchsicht"]]){const o=W("button",{type:"button",role:"radio","data-befehl":`darstellung.${s}`,"data-darstellung":s},e.t(a));o.addEventListener("click",()=>e.starte(`darstellung.${s}`)),this.umschalter.append(o)}t.append(this.ebenenschicht,this.massLinien,this.masse,this.status,this.punkte,this.griffeSchicht,this.leiste,this.leer,this.unbekannt,this.legende,r,this.umschalter,this.zeiger),document.body.append(this.menue),this.maus()}szene;ebenenschicht=W("div",{class:"ebenenschicht"});griffeSchicht=W("div",{class:"griffeschicht"});leiste=W("div",{"data-muster":"Kontextaktionen","data-overlay":"kontextaktionen","data-ort":"leiste",role:"group",hidden:!0});menue=W("div",{"data-muster":"Kontextaktionen","data-overlay":"kontextaktionen","data-ort":"menue",role:"menu",class:"menue",hidden:!0});masse=W("div",{class:"masse"});massLinien=document.createElementNS("http://www.w3.org/2000/svg","svg");zeiger=W("div",{"data-overlay":"zahl-am-zeiger","data-muster":"Wertfeld",class:"zeiger",hidden:!0},W("span",{class:"zahl"}));legende=W("div",{"data-muster-kandidat":"Legende","data-overlay":"legende",class:"legende",hidden:!0});status=W("div",{class:"modellstatus"});punkte=W("div",{class:"verbindungspunkte"});leer=W("div",{"data-muster":"Leerer Zustand",class:"leer",hidden:!0});unbekannt=W("div",{"data-muster":"Befund",class:"unbekannt",hidden:!0});umschalter=W("div",{"data-muster":"Auswahlfeld",class:"umschalter",role:"radiogroup"});druck=null;sigs=new Map;maus(){const e=this.app,t=this.szene.canvas;t.addEventListener("contextmenu",n=>n.preventDefault()),t.addEventListener("pointerdown",n=>{if(e.ui.ziehen)return;const r=n.button===0&&this.skizzeZeichnen();if(this.druck={knopf:n.button,x0:n.clientX,y0:n.clientY,x:n.clientX,y:n.clientY,bewegt:!1,shift:n.shiftKey,zeichnen:r},n.button===1&&n.preventDefault(),r){const s=this.snap(n.clientX,n.clientY);s&&(e.ui.zeichnen={u0:s.u,v0:s.v,u1:s.u,v1:s.v})}this.menueSchliessen()}),window.addEventListener("pointermove",n=>{const r=this.druck;if(!r){n.target===t&&!e.ui.ziehen&&e.setHover(this.szene.flaecheBei(n.clientX,n.clientY));return}const s=n.clientX-r.x,a=n.clientY-r.y;if(r.x=n.clientX,r.y=n.clientY,!r.bewegt&&Math.hypot(n.clientX-r.x0,n.clientY-r.y0)>=bx&&(r.bewegt=!0),!!r.bewegt)if(r.zeichnen){const o=this.snap(n.clientX,n.clientY);o&&e.ui.zeichnen&&(e.ui.zeichnen.u1=o.u,e.ui.zeichnen.v1=o.v,e.aktualisieren())}else r.knopf===2&&!n.shiftKey?this.szene.drehen(-s*.3,a*.3):(r.knopf===1||r.knopf===2&&n.shiftKey)&&this.szene.schieben(s,a)}),window.addEventListener("pointerup",n=>{const r=this.druck;if(this.druck=null,!!r){if(r.zeichnen){this.zeichnenBeenden();return}r.bewegt||(r.knopf===0?this.klick(n):r.knopf===2&&this.rechtsklick(n))}}),t.addEventListener("dblclick",n=>{if(e.ui.ort.art!=="teil")return;const r=this.szene.flaecheBei(n.clientX,n.clientY);if(!r)return;const s=Kn(e.angezeigt(),r);s&&Dt(s)&&e.starte("ort.skizze-bearbeiten",{schritt:s.id})}),t.addEventListener("wheel",n=>{n.preventDefault(),this.szene.zoomen(Math.exp(n.deltaY*.001),n.clientX,n.clientY)},{passive:!1}),t.addEventListener("pointerleave",()=>{this.druck||e.setHover(null)}),document.addEventListener("mousedown",n=>{e.ui.menue&&!this.menue.contains(n.target)&&this.menueSchliessen()})}klick(e){const t=this.app;if(t.ui.ort.art==="skizze")return;const n=this.szene.kanteBei(e.clientX,e.clientY);if(n){t.waehlen([n],e.shiftKey);return}const r=this.szene.flaecheBei(e.clientX,e.clientY);r?t.waehlen([r],e.shiftKey):e.shiftKey||t.starte("auswahl.aufheben")}rechtsklick(e){const t=this.app,n=this.szene.flaecheBei(e.clientX,e.clientY);n&&(t.ui.auswahl.includes(n)||t.waehlen([n]),t.ui.menue={x:e.clientX,y:e.clientY},t.aktualisieren())}menueSchliessen(){this.app.ui.menue&&(this.app.ui.menue=null,this.app.aktualisieren())}skizzeZeichnen(){const e=this.app.ui;if(e.ort.art!=="skizze"||!e.ort.schritt)return!1;const t=this.app.gewaehlt();return!!t&&t.type==="skizze"}snap(e,t){const n=this.app.gewaehlt(),r=this.szene.aufEbene(e,t,mi(n));return r?{u:Math.round(r.u),v:Math.round(r.v)}:null}zeichnenBeenden(){const e=this.app,t=e.ui.zeichnen;e.ui.zeichnen=null;const n=e.gewaehlt();if(!t||!n){e.aktualisieren();return}const r=Math.abs(t.u1-t.u0),s=Math.abs(t.v1-t.v0);r>=1&&s>=1?e.starte("skizze.rechteck",{skizze:n.id,laenge:Ve(r),breite:Ve(s),mitte:{u:(t.u0+t.u1)/2,v:(t.v0+t.v1)/2}}):e.aktualisieren()}griffStart(e,t){const n=this.app,r=n.angezeigt(),s=Kn(r,e.schritt);if(!s)return;const a=n.alleKoerper().find(d=>d.schritt===e.schritt);if(!a)return;const o=[(a.min[0]+a.max[0])/2,(a.min[1]+a.max[1])/2,a.max[2]],l=this.szene.projiziere(o),c=this.szene.projiziere([o[0],o[1],o[2]+10]),u=nt(s.params[e.name]);t.preventDefault(),t.stopPropagation(),n.ui.ziehen={schritt:e.schritt,name:e.name,start:u,startPunkt:{x:t.clientX,y:t.clientY},richtung:{x:(c.x-l.x)/10,y:(c.y-l.y)/10},eingabe:"",zeiger:{x:t.clientX,y:t.clientY}},n.ui.live={element:e.schritt,name:e.name,wert:Ve(u)};const f=d=>{const m=n.ui.ziehen;if(m){if(m.zeiger={x:d.clientX,y:d.clientY},!m.eingabe){const x=m.richtung.x**2+m.richtung.y**2,g=((d.clientX-m.startPunkt.x)*m.richtung.x+(d.clientY-m.startPunkt.y)*m.richtung.y)/x;n.ui.live={element:m.schritt,name:m.name,wert:Ve(Math.max(1,m.start+Math.round(g)))}}n.aktualisieren()}},h=d=>{window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",h),n.ui.ziehen&&this.ziehenBeenden(!0)};window.addEventListener("pointermove",f),window.addEventListener("pointerup",h),n.aktualisieren()}ziehenBeenden(e){const t=this.app,n=t.ui.ziehen;if(!n)return;const r=t.ui.live;t.ui.ziehen=null,t.ui.live=null,e&&r&&r.wert.value!==n.start?t.ausfuehren("element.wert-setzen",{element:r.element,name:r.name,wert:r.wert}):t.aktualisieren()}ziehenTaste(e){const t=this.app,n=t.ui.ziehen;if(!n)return!1;if(e.key==="Escape")this.ziehenBeenden(!1);else if(e.key==="Enter")this.ziehenBeenden(!0);else if(/^[0-9.,]$/.test(e.key)){n.eingabe+=e.key;const r=zs(n.eingabe,"mm");r.ok&&(t.ui.live={element:n.schritt,name:n.name,wert:r.groesse}),t.aktualisieren()}else if(e.key==="Backspace"){n.eingabe=n.eingabe.slice(0,-1);const r=zs(n.eingabe||String(n.start),"mm");r.ok&&(t.ui.live={element:n.schritt,name:n.name,wert:r.groesse}),t.aktualisieren()}else return!1;return e.preventDefault(),!0}setzen(e,t,n){this.sigs.get(e)!==t&&(this.sigs.set(e,t),n())}rendern(){const e=this.app,t=e.ui,n=e.t,r=e.angezeigt();this.umschalter.querySelectorAll('[role="radio"]').forEach(M=>M.setAttribute("aria-checked",M.dataset.darstellung===t.darstellung?"true":"false"));const o=!r.content.filter(M=>M.type==="teil").some(M=>M.params.form||M.content.some(A=>A.type!=="ursprung"))&&t.ort.art==="teil"&&!t.ebenenWahl&&!t.unbekannterZustand;this.leer.hidden=!o,this.setzen("leer",String(o),()=>{const M=W("button",{type:"button",class:"knopf","data-befehl":"skizze.anlegen","data-hauptaktion":""},n("befehl.skizze.anlegen"));M.addEventListener("click",()=>e.starte("skizze.anlegen")),this.leer.replaceChildren(W("p",{},n("leer.text")),M)}),this.unbekannt.hidden=!t.unbekannterZustand,this.setzen("unbekannt",String(t.unbekannterZustand),()=>this.unbekannt.replaceChildren(W("p",{},n("zustand.unbekannt")))),this.setzen("ebenen",String(t.ebenenWahl),()=>{if(!t.ebenenWahl){this.ebenenschicht.replaceChildren();return}const M=W("div",{class:"ebenenwahl","data-muster":"Auswahlfeld"},W("p",{},n("ebene.waehlen")));for(const A of["XY","XZ","YZ"]){const _=W("button",{type:"button","data-befehl":"skizze.anlegen","data-ebene":A},A);_.addEventListener("click",()=>e.starte("skizze.anlegen",{ebene:A})),M.append(_)}this.ebenenschicht.replaceChildren(M)});const l=jo(e);this.setzen("griffe",JSON.stringify(l),()=>{this.griffeSchicht.replaceChildren(...l.map(M=>{const A=W("button",{type:"button",class:"griff","data-griff":M.parameter,"data-schritt":M.schritt,"data-befehl":"element.wert-setzen","aria-label":M.parameter},vr([..._r.pfeilHoch]));return A.addEventListener("pointerdown",_=>this.griffStart(M,_)),A}))});const c=t.ort.art==="teil"&&!t.ziehen?Fc(e):[],u=M=>c.map(A=>{const _=W("button",{type:"button",role:null,"data-befehl":A},n(`befehl.${A}`));return _.addEventListener("click",()=>{t.menue=null,e.starte(A)}),_});this.setzen("leiste",JSON.stringify(c),()=>this.leiste.replaceChildren(...u())),this.leiste.hidden=c.length===0;const f=t.menue?Fc(e):[];this.setzen("menue",JSON.stringify(f),()=>{const M=f.map(A=>{const _=W("button",{type:"button",role:"menuitem","data-befehl":A},n(`befehl.${A}`));return _.addEventListener("click",()=>{t.menue=null,e.starte(A)}),_});this.menue.replaceChildren(...M)}),this.menue.hidden=!t.menue||f.length===0,t.menue&&(this.menue.style.left=`${t.menue.x}px`,this.menue.style.top=`${t.menue.y}px`);const h=t.ort.art==="skizze"&&t.ort.schritt?Kn(r,t.ort.schritt):void 0,d=h?h.type==="skizze"?h:Dt(h):void 0,m=JSON.stringify([d?.params.laenge,d?.params.breite,d?.params.eckradius,h?.id]);this.setzen("masse",m,()=>{if(!h||!d||!d.params.laenge){this.masse.replaceChildren();return}const M=h.type==="skizze"?"":"skizze.",A=(_,w)=>{if(!w)return null;const P=W("button",{type:"button",class:"mass","data-mass":_,"data-befehl":"element.wert-setzen"},St(w,e.sprache==="en"?"en":"de"));return P.addEventListener("click",()=>this.fokus(`${M}${_}`)),P};this.masse.replaceChildren(...[A("laenge",d.params.laenge),A("breite",d.params.breite),A("eckradius",d.params.eckradius)].filter(_=>!!_))});const x=e.ergebnisAktiv()?.befunde??[];this.setzen("status",JSON.stringify(x),()=>{this.status.replaceChildren(...x.map(M=>W("div",{class:"status status-fehler","data-modell-status":"","data-schritt":M.schritt,"data-muster":"Statusanzeige"},W("span",{class:"symbol"},n("symbol.fehler")),W("span",{class:"wort"},n("status.fehlerhaft")))))});const g=t.verbinden?Bc(e):[];this.setzen("punkte",JSON.stringify([g.map(M=>M.id),t.verbinden]),()=>{this.punkte.replaceChildren(...g.map(M=>{const A=W("button",{type:"button",class:"punkt","data-verbindungspunkt":M.id,"data-befehl":"verbindung.anlegen"},M.name);return A.addEventListener("click",()=>{const _=t.verbinden;if(_)if(_.phase==="von")t.verbinden={phase:"nach",von:M.id},e.aktualisieren();else{const w=e.gewaehlt()?.type==="instanz"?e.gewaehlt()?.id:void 0;e.ausfuehren("verbindung.anlegen",{von:_.von,nach:M.id,art:"Fest",mover:w})}}),A}))});const T=r.content.find(M=>M.type==="studie")?.content.find(M=>M.type==="kraft"),R=nt(T?.params.kraft)*.02,S=t.bereich==="simulation";this.legende.hidden=!S,this.setzen("legende",JSON.stringify([S,R]),()=>{this.legende.replaceChildren(W("p",{class:"titel"},n("paket.simulation.legende")),W("div",{class:"skala"}),W("div",{class:"marken"},W("span",{},St(Ve(0),e.sprache==="en"?"en":"de")),W("span",{"data-legende-max":""},St(Ve(R),e.sprache==="en"?"en":"de"))),W("p",{class:"hinweis"},n("paket.simulation.simuliert")))});const y=t.ziehen;if(this.zeiger.hidden=!y,y){const M=t.live,A=y.eingabe?`${y.eingabe} mm`:M?St(M.wert,e.sprache==="en"?"en":"de"):"";this.zeiger.firstElementChild.textContent=A,this.zeiger.style.left=`${y.zeiger.x}px`,this.zeiger.style.top=`${y.zeiger.y-34}px`}this.positionieren()}zone(){return this.el.getBoundingClientRect()}auswahlBox(){const e=this.app,t=e.angezeigt(),n=[];for(const l of e.ui.auswahl){if(l.includes("/k/")){const f=e.alleKoerper().flatMap(h=>h.kanten).find(h=>h.id===l);f&&n.push(this.szene.projiziere(f.von),this.szene.projiziere(f.bis));continue}const c=Kn(t,l),u=this.szene.huellbox(c?.id??l)??this.szene.huellbox(l);if(u)n.push({x:u.x,y:u.y},{x:u.x+u.breite,y:u.y+u.hoehe});else if(c){const f=c.type==="skizze"?c:Dt(c);if(f?.params.laenge){const h=nt(f.params.mitte?.x),d=nt(f.params.mitte?.y),m=nt(f.params.laenge)/2,x=nt(f.params.breite)/2;for(const[g,p]of[[-m,-x],[m,x]])n.push(this.szene.projiziere(Oc(mi(f),h+g,d+p,0)))}}}if(!n.length)return null;const r=Math.min(...n.map(l=>l.x)),s=Math.max(...n.map(l=>l.x)),a=Math.min(...n.map(l=>l.y)),o=Math.max(...n.map(l=>l.y));return{x:r,y:a,breite:s-r,hoehe:o-a}}positionieren(){const e=this.app,t=e.ui,n=this.zone(),r=s=>({x:s.x-n.left,y:s.y-n.top});if(!this.leiste.hidden){const s=this.auswahlBox();if(s){const a=this.leiste.offsetWidth,o=this.leiste.offsetHeight;let l=s.x+s.breite/2-n.left-a/2;l=Math.max(8,Math.min(n.width-a-8,l));let c=s.y-n.top-8-o;c=Math.max(4,c),this.leiste.style.left=`${l}px`,this.leiste.style.top=`${c}px`}}for(const s of this.griffeSchicht.querySelectorAll(".griff")){const a=e.alleKoerper().find(m=>m.schritt===s.dataset.schritt);if(!a)continue;const o=[(a.min[0]+a.max[0])/2,(a.min[1]+a.max[1])/2,a.max[2]],l=this.szene.projiziere(o),c=this.szene.projiziere([o[0],o[1],o[2]+10]),u=c.x-l.x,f=c.y-l.y,h=Math.hypot(u,f)||1,d=r({x:l.x+u/h*28,y:l.y+f/h*28});s.style.left=`${d.x}px`,s.style.top=`${d.y}px`}if((t.ort.art!=="skizze"||!this.masse.childElementCount)&&this.massLinien.replaceChildren(),t.ort.art==="skizze"&&this.masse.childElementCount){const s=t.ort.schritt?Kn(e.angezeigt(),t.ort.schritt):void 0,a=s?s.type==="skizze"?s:Dt(s):void 0;if(a?.params.laenge){const o=mi(a),l=nt(a.params.mitte?.x),c=nt(a.params.mitte?.y),u=nt(a.params.laenge),f=nt(a.params.breite),h=a.params.ebene==="oberseite"?nt(e.angezeigt().content[0]?.content.find(y=>y.id==="grundplatte")?.params.dicke):0,d=(y,M)=>r(this.szene.projiziere(Oc(o,y,M,h))),m=(y,M)=>{const A=this.masse.querySelector(`[data-mass="${y}"]`);A&&(A.style.left=`${M.x}px`,A.style.top=`${M.y}px`)},x=d(l,c+f/2);m("laenge",{x:x.x,y:x.y-30});const g=d(l+u/2,c);m("breite",{x:g.x+56,y:g.y});const p=d(l+u/2,c+f/2);m("eckradius",{x:p.x+40,y:p.y-26});const T=d(l-u/2,c+f/2),R=d(l+u/2,c-f/2),S=(y,M,A,_)=>{const w=document.createElementNS("http://www.w3.org/2000/svg","line");return w.setAttribute("x1",String(y)),w.setAttribute("y1",String(M)),w.setAttribute("x2",String(A)),w.setAttribute("y2",String(_)),w};this.massLinien.replaceChildren(S(T.x,T.y-4,T.x,T.y-34),S(p.x,p.y-4,p.x,p.y-34),S(T.x,T.y-30,p.x,p.y-30),S(p.x+4,p.y,p.x+62,p.y),S(R.x+4,R.y,R.x+62,R.y),S(p.x+56,p.y,R.x+56,R.y))}else this.massLinien.replaceChildren()}for(const s of this.status.querySelectorAll("[data-modell-status]")){const a=e.angezeigt().content.flatMap(c=>c.content).find(c=>c.id===s.dataset.schritt),o=a?this.szene.huellbox(String(a.params.ziel)):null;if(!o)continue;const l=r({x:o.x+o.breite/2,y:o.y});s.style.left=`${l.x}px`,s.style.top=`${Math.max(4,l.y-34)}px`}for(const s of this.punkte.querySelectorAll("[data-verbindungspunkt]")){const a=Bc(e).find(l=>l.id===s.dataset.verbindungspunkt);if(!a)continue;const o=r(this.szene.projiziere(a.welt));s.style.left=`${o.x}px`,s.style.top=`${o.y}px`}}}function Oc(i,e,t,n){return i==="XZ"?[e,-n,t]:i==="YZ"?[n,e,t]:[e,t,n]}function Bc(i){const e=i.angezeigt(),t=e.content.find(r=>r.type==="baugruppe");if(!t)return[];const n=[];for(const r of t.content.filter(s=>s.type==="instanz")){const s=e.content.find(a=>a.id===r.params.komponente);for(const a of s?.content.filter(o=>o.type==="konnektor")??[])n.push({id:a.id,name:a.meta.name,welt:[nt(r.params.position.x)+nt(a.params.position.x),nt(r.params.position.y)+nt(a.params.position.y),nt(r.params.position.z)+nt(a.params.position.z)]})}return n}class Mx{constructor(e,t){this.app=e,this.el=t}rendern(){const e=this.app.ui.rueckmeldung,t=this.app.t(e.schluessel,e.werte);this.el.textContent!==t&&(this.el.textContent=t)}}function yx(i,e){const t=W("header",{"data-zone":"kopf",class:"kopfzeile"}),n=W("nav",{"data-zone":"aufbau","data-panel":"aufbau","aria-label":"Aufbau"}),r=W("main",{"data-zone":"modell",class:"flaeche3d"}),s=W("aside",{"data-zone":"inspektor","data-panel":"inspektor","aria-label":"Inspektor"}),a=W("footer",{"data-zone":"rueckmeldung","data-muster":"Rückmeldung",role:"status"});i.append(t,n,r,s,a);const o=new xx(e,s),l=new Sx(e,r,c=>o.feldFokussieren(c));return e.zonen=[new dx(e,t),new gx(e,n),l,o,new Mx(e,a)],{inspektor:o,modell:l}}function wx(i,e){window.addEventListener("keydown",t=>{if(e.ziehenTaste(t))return;const n=i.ui,r=t.ctrlKey||t.metaKey,s=t.target,a=s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement,o=t.key.toLowerCase();if(r&&o==="k"){t.preventDefault(),i.starte("suche.oeffnen");return}if(r&&o==="z"){t.preventDefault(),i.starte(t.shiftKey?"bearbeiten.wiederholen":"bearbeiten.rueckgaengig");return}if(t.key==="Escape"){n.menue?(n.menue=null,i.aktualisieren()):n.ebenenWahl?(n.ebenenWahl=!1,i.aktualisieren()):n.verbinden?(n.verbinden=null,i.aktualisieren()):n.gespraech?i.starte("gespraech.schliessen"):n.ort.art==="skizze"&&(a&&s.blur(),i.starte("ort.fertig"));return}!r&&!a&&o==="w"&&(t.preventDefault(),i.starte("darstellung.wechseln"))})}const $u=i=>i.content.find(e=>e.type==="teil")??i.content[0];function Vc(i,e,t){return $u(i).content.push(ft("verrundung","verrundung","Verrundung",{ziel:"steg",radius:Ve(e),kanten:t})),i}const Gc=(...i)=>i.map(e=>`steg/k/${e}`);function Hc(i,e){const t=i.params.entwuerfe??[],n=qu("entwurf-1","Dickere Platte",{grundplatte:{dicke:Ve(10)}});return i.params.entwuerfe=[...t,n],e&&(i.params.aktiverEntwurf=n.id),i}function Ex(){const i=Jo();return $u(i).content.push(ft("extrusion-1","extrusion","Extrusion 1",{dicke:Ve(10),skizze:Eo("skizze-1","XY",80,50)})),i}function Tx(i){const e=Bu();i.sitzung.setzen(e);const t=i.sitzung.probe([{id:"baugruppe.anlegen",parameter:{teile:["gehaeuse","deckel"]}}]);return i.sitzung.setzen(t),i.sitzung.probe([{id:"verbindung.anlegen",parameter:{von:"deckel-unterseite",nach:"gehaeuse-oberkante",art:"Fest",mover:"instanz-deckel"}}])}const Ax={leer:()=>({projekt:Jo()}),halter:()=>({projekt:Gt()}),schritt:i=>({projekt:Gt(),danach:()=>void(i.ui.auswahl=["grundplatte"])}),ziehen:i=>({projekt:Gt(),danach:()=>{i.ui.auswahl=["grundplatte"],i.rendern();const t=document.querySelector(".griff")?.getBoundingClientRect(),n=t?{x:t.left+t.width/2,y:t.top+t.height/2}:{x:700,y:300};i.ui.ziehen={schritt:"grundplatte",name:"dicke",start:8,startPunkt:n,richtung:{x:0,y:-5},eingabe:"",zeiger:n},i.ui.live={element:"grundplatte",name:"dicke",wert:Ve(12)}}}),skizze:i=>({projekt:Gt(),danach:()=>i.ortBetreten("grundplatte",!0)}),extrusion:i=>({projekt:Ex(),danach:()=>{i.ui.auswahl=["extrusion-1"],i.ui.geist="extrusion-1"}}),kanten:i=>({projekt:Gt(),danach:()=>void(i.ui.darstellung="kanten")}),durchsicht:i=>({projekt:Gt(),danach:()=>void(i.ui.darstellung="durchsicht")}),befund:i=>({projekt:Vc(Gt(),8,Gc("oben-vorn","oben-hinten")),danach:()=>void(i.ui.auswahl=["verrundung"])}),teile:()=>({projekt:Bu()}),verbindung:i=>({projekt:Tx(i),danach:()=>{const e=i.sitzung.modell().content.find(t=>t.type==="baugruppe")?.content.find(t=>t.type==="verbindung");i.ui.auswahl=e?[e.id]:[]}}),suche:i=>({projekt:Vc(Gt(),3,Gc("oben-vorn","oben-hinten")),danach:()=>void(i.ui.suche={offen:!0,text:"ver",index:0,facette:"alle"})}),entwuerfe:i=>({projekt:Hc(Gt(),!1),danach:()=>{i.ui.inspektor="entwuerfe",i.ui.entwurfAnsicht="alle"}}),vergleich:i=>({projekt:Hc(Gt(),!0),danach:()=>{i.ui.inspektor="entwuerfe",i.ui.vergleich=!0}}),"ki-gespraech":i=>({projekt:Gt(),danach:()=>{i.ui.auswahl=["steg"],i.ui.inspektor="gespraech",i.ui.gespraech={frage:i.t("ki.satz.verrunden"),phase:"arbeitet",vorschlag:null,plan:2}}}),"ki-vorschlag":i=>({projekt:Gt(),danach:()=>{i.ui.auswahl=["steg"],i.ui.inspektor="gespraech";const e=Is.ki.satz.verrunden,t=Xu(e,{projekt:i.angezeigt(),auswahl:["steg"]});i.ui.gespraech={frage:i.t("ki.satz.verrunden"),phase:"karte",vorschlag:t,plan:3},t&&i.vorschauErzeugen(t)}}),simulation:i=>({projekt:Hv(),danach:()=>{i.ui.bereich="simulation",i.ui.auswahl=["sim-kraft"]}})};function Rx(i,e){const t=Ax[i||"halter"];if(!t)return e.sitzung.setzen(Jo()),e.ui.unbekannterZustand=!0,{gezeigt:"leer"};const n=t(e);return e.sitzung.setzen(Ss(n.projekt)),{gezeigt:i||"halter",danach:n.danach}}const el=new URLSearchParams(window.location.search),tl=el.get("thema")==="dunkel"?"dunkel":"hell",Po=ux(window.location.search),Cx=el.get("tempo")==="0"?0:1500;document.documentElement.dataset.thema=tl;document.documentElement.lang=Po==="en"?"en":"de";const Px=document.getElementById("app"),rt=new f_(fx(Po),Po,Cx,Gt());rt.ui.thema=tl;const Lx=yx(Px,rt);wx(rt,Lx.modell);rt.szene.setThema(tl);const{gezeigt:Dx,danach:zx}=Rx(el.get("zustand")??"",rt);rt.rendern();rt.szene.groesseAnpassen();rt.szene.einpassen();zx?.(rt);rt.rendern();const Ix=()=>{const i=rt.ergebnisAktiv()??Qn(rt.aktivesTeil()??rt.angezeigt());return{abmessungen_mm:[...i.abmessungen_mm],volumen_mm3:i.volumen_mm3,masse_g:i.masse_g}},Ux=()=>{const i=rt.szene.kamera;return{darstellung:rt.ui.darstellung,ort:{art:rt.ui.ort.art,schritt:rt.ui.ort.schritt},pfad:Ro(rt).map(e=>e.text),kamera:{azimut_grad:i.azimut,hoehe_grad:i.hoehe,abstand_mm:i.abstand,ziel:{x:i.ziel.x,y:i.ziel.y,z:i.ziel.z}},lichter:rt.szene.lichter(),geometrie:rt.szene.geometrie(),griffe:jo(rt).map(e=>({schritt:e.schritt,parameter:e.parameter})),projektion:e=>rt.szene.projektion(e)}};Object.defineProperty(window,"__cee",{value:Object.freeze({bereit:!0,zustand:Dx,modell:()=>rt.modell(),auswahl:()=>[...rt.ui.auswahl],protokoll:()=>rt.sitzung.protokoll.map(i=>({...i})),befehle:()=>Cr.map(i=>({...i})),teil:Ix,ansicht:Ux,einstellung:()=>({navigationsprofil:"standard"}),griffe:()=>jo(rt).map(i=>({...i})),bild:()=>rt.szene.bild(),ebene:i=>mi(kn(rt.angezeigt()).find(e=>e.id===i)),wert:nt})});Object.defineProperty(window,"__ceeEingabe",{value:Object.freeze({ansicht:i=>{rt.szene.drehen(i.ry??0,i.rx??0),(i.tx||i.ty)&&rt.szene.schieben(i.tx??0,i.ty??0),i.tz&&rt.szene.zoomen(Math.exp((i.tz??0)*.01))}})});document.documentElement.dataset.bereit="1";
