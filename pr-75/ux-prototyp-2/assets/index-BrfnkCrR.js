(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const vo="186",Bu=0,Zo=1,Vu=2,Xr=1,Hu=2,Yi=3,Bn=0,Ft=1,en=2,En=0,Ji=1,Ko=2,Jo=3,Qo=4,Gu=5,Si=100,Wu=101,Xu=102,qu=103,Yu=104,$u=200,Zu=201,Ku=202,Ju=203,_c=204,xc=205,Qu=206,ju=207,eh=208,th=209,nh=210,ih=211,rh=212,sh=213,ah=214,_a=0,xa=1,ba=2,nr=3,Sa=4,Ma=5,ya=6,wa=7,_o=0,oh=1,lh=2,fn=0,bc=1,Sc=2,Mc=3,yc=4,wc=5,Ec=6,Ac=7,Tc=300,ei=301,Ri=302,Ts=303,Rs=304,_s=306,Ea=1e3,wn=1001,Aa=1002,Tt=1003,ch=1004,gr=1005,Dt=1006,Cs=1007,Kn=1008,Wt=1009,Rc=1010,Cc=1011,ir=1012,xo=1013,pn=1014,hn=1015,mn=1016,bo=1017,So=1018,rr=1020,Pc=35902,kc=35899,Lc=1021,Dc=1022,tn=1023,Rn=1026,Jn=1027,Ic=1028,Mo=1029,ti=1030,yo=1031,wo=1033,qr=33776,Yr=33777,$r=33778,Zr=33779,Ta=35840,Ra=35841,Ca=35842,Pa=35843,ka=36196,La=37492,Da=37496,Ia=37488,Na=37489,ss=37490,za=37491,Ua=37808,Fa=37809,Oa=37810,Ba=37811,Va=37812,Ha=37813,Ga=37814,Wa=37815,Xa=37816,qa=37817,Ya=37818,$a=37819,Za=37820,Ka=37821,Ja=36492,Qa=36494,ja=36495,eo=36283,to=36284,as=36285,no=36286,uh=3200,io=0,hh=1,Un="",Yt="srgb",os="srgb-linear",ls="linear",lt="srgb",Ps=7680,dh=519,fh=512,ph=513,mh=514,Eo=515,gh=516,vh=517,Ao=518,_h=519,xh=35044,jo="300 es",dn=2e3,sr=2001;function bh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function cs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Sh(){const n=cs("canvas");return n.style.display="block",n}const el={};function tl(...n){const e="THREE."+n.shift();console.log(e,...n)}function Nc(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Fe(...n){n=Nc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function je(...n){n=Nc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Ai(...n){const e=n.join(" ");e in el||(el[e]=!0,Fe(...n))}function Mh(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const yh={[_a]:xa,[ba]:ya,[Sa]:wa,[nr]:Ma,[xa]:_a,[ya]:ba,[wa]:Sa,[Ma]:nr};class ri{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Kr=Math.PI/180,ro=180/Math.PI;function Ii(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[i&255]+kt[i>>8&255]+kt[i>>16&255]+kt[i>>24&255]).toLowerCase()}function Je(n,e,t){return Math.max(e,Math.min(t,n))}function wh(n,e){return(n%e+e)%e}function ks(n,e,t){return(1-t)*n+t*e}function Oi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ut(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class de{static{de.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ni{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3],d=s[a+0],f=s[a+1],m=s[a+2],x=s[a+3];if(h!==x||l!==d||c!==f||u!==m){let g=l*d+c*f+u*m+h*x;g<0&&(d=-d,f=-f,m=-m,x=-x,g=-g);let p=1-o;if(g<.9995){const R=Math.acos(g),C=Math.sin(R);p=Math.sin(p*R)/C,o=Math.sin(o*R)/C,l=l*p+d*o,c=c*p+f*o,u=u*p+m*o,h=h*p+x*o}else{l=l*p+d*o,c=c*p+f*o,u=u*p+m*o,h=h*p+x*o;const R=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=R,c*=R,u*=R,h*=R}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[a],d=s[a+1],f=s[a+2],m=s[a+3];return e[t]=o*m+u*h+l*f-c*d,e[t+1]=l*m+u*d+c*h-o*f,e[t+2]=c*m+u*f+o*d-l*h,e[t+3]=u*m-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),h=o(s/2),d=l(i/2),f=l(r/2),m=l(s/2);switch(a){case"XYZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"YZX":this._x=d*u*h+c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h-d*f*m;break;case"XZY":this._x=d*u*h-c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h+d*f*m;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=i+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-r)*f}else if(i>o&&i>h){const f=2*Math.sqrt(1+i-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-i-h);this._w=(s-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-i-o);this._w=(a-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{static{D.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(nl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(nl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+l*c+a*h-o*u,this.y=i+l*u+o*c-s*h,this.z=r+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ls.copy(this).projectOnVector(e),this.sub(Ls)}reflect(e){return this.sub(Ls.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ls=new D,nl=new Ni;class He{static{He.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],d=i[2],f=i[5],m=i[8],x=r[0],g=r[3],p=r[6],R=r[1],C=r[4],S=r[7],w=r[2],E=r[5],P=r[8];return s[0]=a*x+o*R+l*w,s[3]=a*g+o*C+l*E,s[6]=a*p+o*S+l*P,s[1]=c*x+u*R+h*w,s[4]=c*g+u*C+h*E,s[7]=c*p+u*S+h*P,s[2]=d*x+f*R+m*w,s[5]=d*g+f*C+m*E,s[8]=d*p+f*S+m*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*s,f=c*s-a*l,m=t*h+i*d+r*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return e[0]=h*x,e[1]=(r*c-u*i)*x,e[2]=(o*i-r*a)*x,e[3]=d*x,e[4]=(u*t-r*l)*x,e[5]=(r*s-o*t)*x,e[6]=f*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Ai("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ds.makeScale(e,t)),this}rotate(e){return Ai("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ds.makeRotation(-e)),this}translate(e,t){return Ai("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ds.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ds=new He,il=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rl=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Eh(){const n={enabled:!0,workingColorSpace:os,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===lt&&(r.r=An(r.r),r.g=An(r.g),r.b=An(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===lt&&(r.r=Ti(r.r),r.g=Ti(r.g),r.b=Ti(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Un?ls:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ai("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ai("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[os]:{primaries:e,whitePoint:i,transfer:ls,toXYZ:il,fromXYZ:rl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Yt},outputColorSpaceConfig:{drawingBufferColorSpace:Yt}},[Yt]:{primaries:e,whitePoint:i,transfer:lt,toXYZ:il,fromXYZ:rl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Yt}}}),n}const Qe=Eh();function An(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ti(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let oi;class Ah{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{oi===void 0&&(oi=cs("canvas")),oi.width=e.width,oi.height=e.height;const r=oi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=oi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=cs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=An(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(An(t[i]/255)*255):t[i]=An(t[i]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Th=0;class To{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Th++}),this.uuid=Ii(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Is(r[a].image)):s.push(Is(r[a]))}else s=Is(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Is(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ah.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let Rh=0;const Ns=new D;class zt extends ri{constructor(e=zt.DEFAULT_IMAGE,t=zt.DEFAULT_MAPPING,i=wn,r=wn,s=Dt,a=Kn,o=tn,l=Wt,c=zt.DEFAULT_ANISOTROPY,u=Un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rh++}),this.uuid=Ii(),this.name="",this.source=new To(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ns).x}get height(){return this.source.getSize(Ns).y}get depth(){return this.source.getSize(Ns).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Tc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ea:e.x=e.x-Math.floor(e.x);break;case wn:e.x=e.x<0?0:1;break;case Aa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ea:e.y=e.y-Math.floor(e.y);break;case wn:e.y=e.y<0?0:1;break;case Aa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}zt.DEFAULT_IMAGE=null;zt.DEFAULT_MAPPING=Tc;zt.DEFAULT_ANISOTROPY=1;class gt{static{gt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const C=(c+1)/2,S=(f+1)/2,w=(p+1)/2,E=(u+d)/4,P=(h+x)/4,_=(m+g)/4;return C>S&&C>w?C<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(C),r=E/i,s=P/i):S>w?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=E/r,s=_/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=P/s,r=_/s),this.set(i,r,s,t),this}let R=Math.sqrt((g-m)*(g-m)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(R)<.001&&(R=1),this.x=(g-m)/R,this.y=(h-x)/R,this.z=(d-u)/R,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ch extends ri{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new zt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Dt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new To(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class nn extends Ch{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class zc extends zt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ph extends zt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class pt{static{pt.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,l,c,u,h,d,f,m,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,h,d,f,m,x,g)}set(e,t,i,r,s,a,o,l,c,u,h,d,f,m,x,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/li.setFromMatrixColumn(e,0).length(),s=1/li.setFromMatrixColumn(e,1).length(),a=1/li.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*u,f=a*h,m=o*u,x=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+m*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,m=c*u,x=c*h;t[0]=d+x*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-m,t[6]=x+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,m=c*u,x=c*h;t[0]=d-x*o,t[4]=-a*h,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*u,t[9]=x-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,f=a*h,m=o*u,x=o*h;t[0]=l*u,t[4]=m*c-f,t[8]=d*c+x,t[1]=l*h,t[5]=x*c+d,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,m=o*l,x=o*c;t[0]=l*u,t[4]=x-d*h,t[8]=m*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+m,t[10]=d-x*h}else if(e.order==="XZY"){const d=a*l,f=a*c,m=o*l,x=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+x,t[5]=a*u,t[9]=f*h-m,t[2]=m*h-f,t[6]=o*u,t[10]=x*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kh,e,Lh)}lookAt(e,t,i){const r=this.elements;return Bt.subVectors(e,t),Bt.lengthSq()===0&&(Bt.z=1),Bt.normalize(),Ln.crossVectors(i,Bt),Ln.lengthSq()===0&&(Math.abs(i.z)===1?Bt.x+=1e-4:Bt.z+=1e-4,Bt.normalize(),Ln.crossVectors(i,Bt)),Ln.normalize(),vr.crossVectors(Bt,Ln),r[0]=Ln.x,r[4]=vr.x,r[8]=Bt.x,r[1]=Ln.y,r[5]=vr.y,r[9]=Bt.y,r[2]=Ln.z,r[6]=vr.z,r[10]=Bt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],d=i[9],f=i[13],m=i[2],x=i[6],g=i[10],p=i[14],R=i[3],C=i[7],S=i[11],w=i[15],E=r[0],P=r[4],_=r[8],T=r[12],k=r[1],I=r[5],B=r[9],q=r[13],F=r[2],H=r[6],M=r[10],y=r[14],G=r[3],O=r[7],$=r[11],K=r[15];return s[0]=a*E+o*k+l*F+c*G,s[4]=a*P+o*I+l*H+c*O,s[8]=a*_+o*B+l*M+c*$,s[12]=a*T+o*q+l*y+c*K,s[1]=u*E+h*k+d*F+f*G,s[5]=u*P+h*I+d*H+f*O,s[9]=u*_+h*B+d*M+f*$,s[13]=u*T+h*q+d*y+f*K,s[2]=m*E+x*k+g*F+p*G,s[6]=m*P+x*I+g*H+p*O,s[10]=m*_+x*B+g*M+p*$,s[14]=m*T+x*q+g*y+p*K,s[3]=R*E+C*k+S*F+w*G,s[7]=R*P+C*I+S*H+w*O,s[11]=R*_+C*B+S*M+w*$,s[15]=R*T+C*q+S*y+w*K,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],m=e[3],x=e[7],g=e[11],p=e[15],R=l*f-c*d,C=o*f-c*h,S=o*d-l*h,w=a*f-c*u,E=a*d-l*u,P=a*h-o*u;return t*(x*R-g*C+p*S)-i*(m*R-g*w+p*E)+r*(m*C-x*w+p*P)-s*(m*S-x*E+g*P)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(s*u-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],m=e[12],x=e[13],g=e[14],p=e[15],R=t*o-i*a,C=t*l-r*a,S=t*c-s*a,w=i*l-r*o,E=i*c-s*o,P=r*c-s*l,_=u*x-h*m,T=u*g-d*m,k=u*p-f*m,I=h*g-d*x,B=h*p-f*x,q=d*p-f*g,F=R*q-C*B+S*I+w*k-E*T+P*_;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/F;return e[0]=(o*q-l*B+c*I)*H,e[1]=(r*B-i*q-s*I)*H,e[2]=(x*P-g*E+p*w)*H,e[3]=(d*E-h*P-f*w)*H,e[4]=(l*k-a*q-c*T)*H,e[5]=(t*q-r*k+s*T)*H,e[6]=(g*S-m*P-p*C)*H,e[7]=(u*P-d*S+f*C)*H,e[8]=(a*B-o*k+c*_)*H,e[9]=(i*k-t*B-s*_)*H,e[10]=(m*E-x*S+p*R)*H,e[11]=(h*S-u*E-f*R)*H,e[12]=(o*T-a*I-l*_)*H,e[13]=(t*I-i*T+r*_)*H,e[14]=(x*C-m*w-g*R)*H,e[15]=(u*w-h*C+d*R)*H,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,d=s*c,f=s*u,m=s*h,x=a*u,g=a*h,p=o*h,R=l*c,C=l*u,S=l*h,w=i.x,E=i.y,P=i.z;return r[0]=(1-(x+p))*w,r[1]=(f+S)*w,r[2]=(m-C)*w,r[3]=0,r[4]=(f-S)*E,r[5]=(1-(d+p))*E,r[6]=(g+R)*E,r[7]=0,r[8]=(m+C)*P,r[9]=(g-R)*P,r[10]=(1-(d+x))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=li.set(r[0],r[1],r[2]).length();const o=li.set(r[4],r[5],r[6]).length(),l=li.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Jt.copy(this);const c=1/a,u=1/o,h=1/l;return Jt.elements[0]*=c,Jt.elements[1]*=c,Jt.elements[2]*=c,Jt.elements[4]*=u,Jt.elements[5]*=u,Jt.elements[6]*=u,Jt.elements[8]*=h,Jt.elements[9]*=h,Jt.elements[10]*=h,t.setFromRotationMatrix(Jt),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=dn,l=!1){const c=this.elements,u=2*s/(t-e),h=2*s/(i-r),d=(t+e)/(t-e),f=(i+r)/(i-r);let m,x;if(l)m=s/(a-s),x=a*s/(a-s);else if(o===dn)m=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===sr)m=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=dn,l=!1){const c=this.elements,u=2/(t-e),h=2/(i-r),d=-(t+e)/(t-e),f=-(i+r)/(i-r);let m,x;if(l)m=1/(a-s),x=a/(a-s);else if(o===dn)m=-2/(a-s),x=-(a+s)/(a-s);else if(o===sr)m=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const li=new D,Jt=new pt,kh=new D(0,0,0),Lh=new D(1,1,1),Ln=new D,vr=new D,Bt=new D,sl=new pt,al=new Ni;class Vn{constructor(e=0,t=0,i=0,r=Vn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Je(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return sl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return al.setFromEuler(this),this.setFromQuaternion(al,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vn.DEFAULT_ORDER="XYZ";let Ro=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Dh=0;const ol=new D,ci=new Ni,_n=new pt,_r=new D,Bi=new D,Ih=new D,Nh=new Ni,ll=new D(1,0,0),cl=new D(0,1,0),ul=new D(0,0,1),hl={type:"added"},zh={type:"removed"},ui={type:"childadded",child:null},zs={type:"childremoved",child:null};class Rt extends ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Dh++}),this.uuid=Ii(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rt.DEFAULT_UP.clone();const e=new D,t=new Vn,i=new Ni,r=new D(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new pt},normalMatrix:{value:new He}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=Rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ro,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ci.setFromAxisAngle(e,t),this.quaternion.multiply(ci),this}rotateOnWorldAxis(e,t){return ci.setFromAxisAngle(e,t),this.quaternion.premultiply(ci),this}rotateX(e){return this.rotateOnAxis(ll,e)}rotateY(e){return this.rotateOnAxis(cl,e)}rotateZ(e){return this.rotateOnAxis(ul,e)}translateOnAxis(e,t){return ol.copy(e).applyQuaternion(this.quaternion),this.position.add(ol.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ll,e)}translateY(e){return this.translateOnAxis(cl,e)}translateZ(e){return this.translateOnAxis(ul,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_n.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?_r.copy(e):_r.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Bi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_n.lookAt(Bi,_r,this.up):_n.lookAt(_r,Bi,this.up),this.quaternion.setFromRotationMatrix(_n),r&&(_n.extractRotation(r.matrixWorld),ci.setFromRotationMatrix(_n),this.quaternion.premultiply(ci.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(hl),ui.child=e,this.dispatchEvent(ui),ui.child=null):je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(zh),zs.child=e,this.dispatchEvent(zs),zs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_n.multiply(e.parent.matrixWorld)),e.applyMatrix4(_n),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(hl),ui.child=e,this.dispatchEvent(ui),ui.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,e,Ih),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,Nh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Rt.DEFAULT_UP=new D(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Qn extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Uh={type:"move"};class Us{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const g=t.getJointPose(x,i),p=this._getHandJoint(c,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Uh)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Qn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Uc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Dn={h:0,s:0,l:0},xr={h:0,s:0,l:0};function Fs(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ye{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Qe.workingColorSpace){if(e=wh(e,1),t=Je(t,0,1),i=Je(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Fs(a,s,e+1/3),this.g=Fs(a,s,e),this.b=Fs(a,s,e-1/3)}return Qe.colorSpaceToWorking(this,r),this}setStyle(e,t=Yt){function i(s){s!==void 0&&parseFloat(s)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Yt){const i=Uc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=An(e.r),this.g=An(e.g),this.b=An(e.b),this}copyLinearToSRGB(e){return this.r=Ti(e.r),this.g=Ti(e.g),this.b=Ti(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yt){return Qe.workingToColorSpace(Lt.copy(this),e),Math.round(Je(Lt.r*255,0,255))*65536+Math.round(Je(Lt.g*255,0,255))*256+Math.round(Je(Lt.b*255,0,255))}getHexString(e=Yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(Lt.copy(this),t);const i=Lt.r,r=Lt.g,s=Lt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(Lt.copy(this),t),e.r=Lt.r,e.g=Lt.g,e.b=Lt.b,e}getStyle(e=Yt){Qe.workingToColorSpace(Lt.copy(this),e);const t=Lt.r,i=Lt.g,r=Lt.b;return e!==Yt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Dn),this.setHSL(Dn.h+e,Dn.s+t,Dn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Dn),e.getHSL(xr);const i=ks(Dn.h,xr.h,t),r=ks(Dn.s,xr.s,t),s=ks(Dn.l,xr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Lt=new Ye;Ye.NAMES=Uc;class Fh extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vn,this.environmentIntensity=1,this.environmentRotation=new Vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Qt=new D,xn=new D,Os=new D,bn=new D,hi=new D,di=new D,dl=new D,Bs=new D,Vs=new D,Hs=new D,Gs=new gt,Ws=new gt,Xs=new gt;class Zt{constructor(e=new D,t=new D,i=new D){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Qt.subVectors(e,t),r.cross(Qt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Qt.subVectors(r,t),xn.subVectors(i,t),Os.subVectors(e,t);const a=Qt.dot(Qt),o=Qt.dot(xn),l=Qt.dot(Os),c=xn.dot(xn),u=xn.dot(Os),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,f=(c*l-o*u)*d,m=(a*u-o*l)*d;return s.set(1-f-m,m,f)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,bn.x),l.addScaledVector(a,bn.y),l.addScaledVector(o,bn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Gs.setScalar(0),Ws.setScalar(0),Xs.setScalar(0),Gs.fromBufferAttribute(e,t),Ws.fromBufferAttribute(e,i),Xs.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Gs,s.x),a.addScaledVector(Ws,s.y),a.addScaledVector(Xs,s.z),a}static isFrontFacing(e,t,i,r){return Qt.subVectors(i,t),xn.subVectors(e,t),Qt.cross(xn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qt.subVectors(this.c,this.b),xn.subVectors(this.a,this.b),Qt.cross(xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Zt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Zt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Zt.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Zt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Zt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;hi.subVectors(r,i),di.subVectors(s,i),Bs.subVectors(e,i);const l=hi.dot(Bs),c=di.dot(Bs);if(l<=0&&c<=0)return t.copy(i);Vs.subVectors(e,r);const u=hi.dot(Vs),h=di.dot(Vs);if(u>=0&&h<=u)return t.copy(r);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(hi,a);Hs.subVectors(e,s);const f=hi.dot(Hs),m=di.dot(Hs);if(m>=0&&f<=m)return t.copy(s);const x=f*c-l*m;if(x<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(di,o);const g=u*m-f*h;if(g<=0&&h-u>=0&&f-m>=0)return dl.subVectors(s,r),o=(h-u)/(h-u+(f-m)),t.copy(r).addScaledVector(dl,o);const p=1/(g+x+d);return a=x*p,o=d*p,t.copy(i).addScaledVector(hi,a).addScaledVector(di,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class fr{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,jt):jt.fromBufferAttribute(s,a),jt.applyMatrix4(e.matrixWorld),this.expandByPoint(jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),br.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),br.copy(i.boundingBox)),br.applyMatrix4(e.matrixWorld),this.union(br)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jt),jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vi),Sr.subVectors(this.max,Vi),fi.subVectors(e.a,Vi),pi.subVectors(e.b,Vi),mi.subVectors(e.c,Vi),In.subVectors(pi,fi),Nn.subVectors(mi,pi),Gn.subVectors(fi,mi);let t=[0,-In.z,In.y,0,-Nn.z,Nn.y,0,-Gn.z,Gn.y,In.z,0,-In.x,Nn.z,0,-Nn.x,Gn.z,0,-Gn.x,-In.y,In.x,0,-Nn.y,Nn.x,0,-Gn.y,Gn.x,0];return!qs(t,fi,pi,mi,Sr)||(t=[1,0,0,0,1,0,0,0,1],!qs(t,fi,pi,mi,Sr))?!1:(Mr.crossVectors(In,Nn),t=[Mr.x,Mr.y,Mr.z],qs(t,fi,pi,mi,Sr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Sn=[new D,new D,new D,new D,new D,new D,new D,new D],jt=new D,br=new fr,fi=new D,pi=new D,mi=new D,In=new D,Nn=new D,Gn=new D,Vi=new D,Sr=new D,Mr=new D,Wn=new D;function qs(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Wn.fromArray(n,s);const o=r.x*Math.abs(Wn.x)+r.y*Math.abs(Wn.y)+r.z*Math.abs(Wn.z),l=e.dot(Wn),c=t.dot(Wn),u=i.dot(Wn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Mt=new D,yr=new de;let Oh=0;class Tn extends ri{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Oh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=xh,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)yr.fromBufferAttribute(this,t),yr.applyMatrix3(e),this.setXY(t,yr.x,yr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Oi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ut(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Oi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Oi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Oi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Oi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),i=Ut(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),i=Ut(i,this.array),r=Ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),i=Ut(i,this.array),r=Ut(r,this.array),s=Ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Fc extends Tn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Oc extends Tn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ct extends Tn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Bh=new fr,Hi=new D,Ys=new D;class xs{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Bh.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Hi.subVectors(e,this.center);const t=Hi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Hi,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ys.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Hi.copy(e.center).add(Ys)),this.expandByPoint(Hi.copy(e.center).sub(Ys))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Vh=0;const qt=new pt,$s=new Rt,gi=new D,Vt=new fr,Gi=new fr,Et=new D;class Ot extends ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vh++}),this.uuid=Ii(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(bh(e)?Oc:Fc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new He().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return qt.makeRotationFromQuaternion(e),this.applyMatrix4(qt),this}rotateX(e){return qt.makeRotationX(e),this.applyMatrix4(qt),this}rotateY(e){return qt.makeRotationY(e),this.applyMatrix4(qt),this}rotateZ(e){return qt.makeRotationZ(e),this.applyMatrix4(qt),this}translate(e,t,i){return qt.makeTranslation(e,t,i),this.applyMatrix4(qt),this}scale(e,t,i){return qt.makeScale(e,t,i),this.applyMatrix4(qt),this}lookAt(e){return $s.lookAt(e),$s.updateMatrix(),this.applyMatrix4($s.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gi).negate(),this.translate(gi.x,gi.y,gi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ct(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Vt.setFromBufferAttribute(s),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Vt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Vt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Vt.min),this.boundingBox.expandByPoint(Vt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const i=this.boundingSphere.center;if(Vt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Gi.setFromBufferAttribute(o),this.morphTargetsRelative?(Et.addVectors(Vt.min,Gi.min),Vt.expandByPoint(Et),Et.addVectors(Vt.max,Gi.max),Vt.expandByPoint(Et)):(Vt.expandByPoint(Gi.min),Vt.expandByPoint(Gi.max))}Vt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Et.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Et));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Et.fromBufferAttribute(o,c),l&&(gi.fromBufferAttribute(e,c),Et.add(gi)),r=Math.max(r,i.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Tn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<i.count;_++)o[_]=new D,l[_]=new D;const c=new D,u=new D,h=new D,d=new de,f=new de,m=new de,x=new D,g=new D;function p(_,T,k){c.fromBufferAttribute(i,_),u.fromBufferAttribute(i,T),h.fromBufferAttribute(i,k),d.fromBufferAttribute(s,_),f.fromBufferAttribute(s,T),m.fromBufferAttribute(s,k),u.sub(c),h.sub(c),f.sub(d),m.sub(d);const I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(x.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(I),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(I),o[_].add(x),o[T].add(x),o[k].add(x),l[_].add(g),l[T].add(g),l[k].add(g))}let R=this.groups;R.length===0&&(R=[{start:0,count:e.count}]);for(let _=0,T=R.length;_<T;++_){const k=R[_],I=k.start,B=k.count;for(let q=I,F=I+B;q<F;q+=3)p(e.getX(q+0),e.getX(q+1),e.getX(q+2))}const C=new D,S=new D,w=new D,E=new D;function P(_){w.fromBufferAttribute(r,_),E.copy(w);const T=o[_];C.copy(T),C.sub(w.multiplyScalar(w.dot(T))).normalize(),S.crossVectors(E,T);const I=S.dot(l[_])<0?-1:1;a.setXYZW(_,C.x,C.y,C.z,I)}for(let _=0,T=R.length;_<T;++_){const k=R[_],I=k.start,B=k.count;for(let q=I,F=I+B;q<F;q+=3)P(e.getX(q+0)),P(e.getX(q+1)),P(e.getX(q+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Tn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const r=new D,s=new D,a=new D,o=new D,l=new D,c=new D,u=new D,h=new D;if(e)for(let d=0,f=e.count;d<f;d+=3){const m=e.getX(d+0),x=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),o.add(u),l.add(u),c.add(u),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let f=0,m=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*u;for(let p=0;p<u;p++)d[m++]=c[f++]}return new Tn(d,u,h)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ot,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Zs=new D,Hh=new D,Gh=new He;class yn{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Zs.subVectors(i,t).cross(Hh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(Zs),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Gh.getNormalMatrix(e),r=this.coplanarPoint(Zs).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Wh=0;class zi extends ri{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=Ii(),this.name="",this.type="Material",this.blending=Ji,this.side=Bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_c,this.blendDst=xc,this.blendEquation=Si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=nr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=dh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ps,this.stencilZFail=Ps,this.stencilZPass=Ps,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ye().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new yn().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new de().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new de().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Mn=new D,Ks=new D,wr=new D,Er=new D;class Co{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Mn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mn.copy(this.origin).addScaledVector(this.direction,t),Mn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Ks.copy(e).add(t).multiplyScalar(.5),wr.copy(t).sub(e).normalize(),Er.copy(this.origin).sub(Ks);const s=e.distanceTo(t)*.5,a=-this.direction.dot(wr),o=Er.dot(this.direction),l=-Er.dot(wr),c=Er.lengthSq(),u=Math.abs(1-a*a);let h,d,f,m;if(u>0)if(h=a*l-o,d=a*o-l,m=s*u,h>=0)if(d>=-m)if(d<=m){const x=1/u;h*=x,d*=x,f=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-m?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c):d<=m?(h=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Ks).addScaledVector(wr,d),f}intersectSphere(e,t){if(e.radius<0)return null;Mn.subVectors(e.center,this.origin);const i=Mn.dot(this.direction),r=Mn.dot(Mn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Mn)!==null}intersectTriangle(e,t,i,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,h=e.x-a.x,d=e.y-a.y,f=e.z-a.z,m=t.x-a.x,x=t.y-a.y,g=t.z-a.z,p=i.x-a.x,R=i.y-a.y,C=i.z-a.z,S=Math.abs(l),w=Math.abs(c),E=Math.abs(u);let P,_,T,k,I,B,q,F,H,M,y,G;if(S>=w&&S>=E?(T=l,B=h,H=m,G=p,l>=0?(P=c,_=u,k=d,I=f,q=x,F=g,M=R,y=C):(P=u,_=c,k=f,I=d,q=g,F=x,M=C,y=R)):w>=E?(T=c,B=d,H=x,G=R,c>=0?(P=u,_=l,k=f,I=h,q=g,F=m,M=C,y=p):(P=l,_=u,k=h,I=f,q=m,F=g,M=p,y=C)):(T=u,B=f,H=g,G=C,u>=0?(P=l,_=c,k=h,I=d,q=m,F=x,M=p,y=R):(P=c,_=l,k=d,I=h,q=x,F=m,M=R,y=p)),T===0)return null;const O=P/T,$=_/T,K=1/T,ye=k-O*B,he=I-$*B,nt=q-O*H,$e=F-$*H,et=M-O*G,j=y-$*G,ne=et*$e-j*nt,xe=ye*j-he*et,Ue=nt*he-$e*ye;if(r){if(ne<0||xe<0||Ue<0)return null}else if((ne<0||xe<0||Ue<0)&&(ne>0||xe>0||Ue>0))return null;const we=ne+xe+Ue;if(we===0)return null;const Oe=K*(ne*B+xe*H+Ue*G);return(we>0?Oe<0:Oe>0)?null:this.at(Oe/we,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Po extends zi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=_o,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const fl=new pt,Xn=new Co,Ar=new xs,pl=new D,Tr=new D,Rr=new D,Cr=new D,Js=new D,Pr=new D,ml=new D,kr=new D;class rn extends Rt{constructor(e=new Ot,t=new Po){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Pr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(Js.fromBufferAttribute(h,e),a?Pr.addScaledVector(Js,u):Pr.addScaledVector(Js.sub(t),u))}t.add(Pr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ar.copy(i.boundingSphere),Ar.applyMatrix4(s),Xn.copy(e.ray).recast(e.near),!(Ar.containsPoint(Xn.origin)===!1&&(Xn.intersectSphere(Ar,pl)===null||Xn.origin.distanceToSquared(pl)>(e.far-e.near)**2))&&(fl.copy(s).invert(),Xn.copy(e.ray).applyMatrix4(fl),!(i.boundingBox!==null&&Xn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Xn)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,x=d.length;m<x;m++){const g=d[m],p=a[g.materialIndex],R=Math.max(g.start,f.start),C=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let S=R,w=C;S<w;S+=3){const E=o.getX(S),P=o.getX(S+1),_=o.getX(S+2);r=Lr(this,p,e,i,c,u,h,E,P,_),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const m=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){const R=o.getX(g),C=o.getX(g+1),S=o.getX(g+2);r=Lr(this,a,e,i,c,u,h,R,C,S),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,x=d.length;m<x;m++){const g=d[m],p=a[g.materialIndex],R=Math.max(g.start,f.start),C=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let S=R,w=C;S<w;S+=3){const E=S,P=S+1,_=S+2;r=Lr(this,p,e,i,c,u,h,E,P,_),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const m=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){const R=g,C=g+1,S=g+2;r=Lr(this,a,e,i,c,u,h,R,C,S),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function Xh(n,e,t,i,r,s,a,o){let l;if(e.side===Ft?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Bn,o),l===null)return null;kr.copy(o),kr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(kr);return c<t.near||c>t.far?null:{distance:c,point:kr.clone(),object:n}}function Lr(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,Tr),n.getVertexPosition(l,Rr),n.getVertexPosition(c,Cr);const u=Xh(n,e,t,i,Tr,Rr,Cr,ml);if(u){const h=new D;Zt.getBarycoord(ml,Tr,Rr,Cr,h),r&&(u.uv=Zt.getInterpolatedAttribute(r,o,l,c,h,new de)),s&&(u.uv1=Zt.getInterpolatedAttribute(s,o,l,c,h,new de)),a&&(u.normal=Zt.getInterpolatedAttribute(a,o,l,c,h,new D),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new D,materialIndex:0};Zt.getNormal(Tr,Rr,Cr,d.normal),u.face=d,u.barycoord=h}return u}class qh extends zt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Tt,u=Tt,h,d){super(null,a,o,l,c,u,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const qn=new xs,Yh=new de(.5,.5),Dr=new D;class ko{constructor(e=new yn,t=new yn,i=new yn,r=new yn,s=new yn,a=new yn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=dn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],h=s[5],d=s[6],f=s[7],m=s[8],x=s[9],g=s[10],p=s[11],R=s[12],C=s[13],S=s[14],w=s[15];if(r[0].setComponents(c-a,f-u,p-m,w-R).normalize(),r[1].setComponents(c+a,f+u,p+m,w+R).normalize(),r[2].setComponents(c+o,f+h,p+x,w+C).normalize(),r[3].setComponents(c-o,f-h,p-x,w-C).normalize(),i)r[4].setComponents(l,d,g,S).normalize(),r[5].setComponents(c-l,f-d,p-g,w-S).normalize();else if(r[4].setComponents(c-l,f-d,p-g,w-S).normalize(),t===dn)r[5].setComponents(c+l,f+d,p+g,w+S).normalize();else if(t===sr)r[5].setComponents(l,d,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),qn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qn)}intersectsSprite(e){qn.center.set(0,0,0);const t=Yh.distanceTo(e.center);return qn.radius=.7071067811865476+t,qn.applyMatrix4(e.matrixWorld),this.intersectsSphere(qn)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Dr.x=r.normal.x>0?e.max.x:e.min.x,Dr.y=r.normal.y>0?e.max.y:e.min.y,Dr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Dr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class so extends zi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const us=new D,hs=new D,gl=new pt,Wi=new Co,Ir=new xs,Qs=new D,vl=new D;class Bc extends Rt{constructor(e=new Ot,t=new so){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)us.fromBufferAttribute(t,r-1),hs.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=us.distanceTo(hs);e.setAttribute("lineDistance",new Ct(i,1))}else Fe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ir.copy(i.boundingSphere),Ir.applyMatrix4(r),Ir.radius+=s,e.ray.intersectsSphere(Ir)===!1)return;gl.copy(r).invert(),Wi.copy(e.ray).applyMatrix4(gl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,d=i.attributes.position;if(u!==null){const f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let x=f,g=m-1;x<g;x+=c){const p=u.getX(x),R=u.getX(x+1),C=Nr(this,e,Wi,l,p,R,x);C&&t.push(C)}if(this.isLineLoop){const x=u.getX(m-1),g=u.getX(f),p=Nr(this,e,Wi,l,x,g,m-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let x=f,g=m-1;x<g;x+=c){const p=Nr(this,e,Wi,l,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){const x=Nr(this,e,Wi,l,m-1,f,m-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Nr(n,e,t,i,r,s,a){const o=n.geometry.attributes.position;if(us.fromBufferAttribute(o,r),hs.fromBufferAttribute(o,s),t.distanceSqToSegment(us,hs,Qs,vl)>i)return;Qs.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Qs);if(!(c<e.near||c>e.far))return{distance:c,point:vl.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const _l=new D,xl=new D;class $h extends Bc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)_l.fromBufferAttribute(t,r),xl.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+_l.distanceTo(xl);e.setAttribute("lineDistance",new Ct(i,1))}else Fe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Vc extends zt{constructor(e=[],t=ei,i,r,s,a,o,l,c,u){super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ar extends zt{constructor(e,t,i=pn,r,s,a,o=Tt,l=Tt,c,u=Rn,h=1){if(u!==Rn&&u!==Jn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new To(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Zh extends ar{constructor(e,t=pn,i=ei,r,s,a=Tt,o=Tt,l,c=Rn){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Hc extends zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ni extends Ot{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,f=0;m("z","y","x",-1,-1,i,t,e,a,s,0),m("z","y","x",1,-1,i,t,-e,a,s,1),m("x","z","y",1,1,e,i,t,r,a,2),m("x","z","y",1,-1,e,i,-t,r,a,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Ct(c,3)),this.setAttribute("normal",new Ct(u,3)),this.setAttribute("uv",new Ct(h,2));function m(x,g,p,R,C,S,w,E,P,_,T){const k=S/P,I=w/_,B=S/2,q=w/2,F=E/2,H=P+1,M=_+1;let y=0,G=0;const O=new D;for(let $=0;$<M;$++){const K=$*I-q;for(let ye=0;ye<H;ye++){const he=ye*k-B;O[x]=he*R,O[g]=K*C,O[p]=F,c.push(O.x,O.y,O.z),O[x]=0,O[g]=0,O[p]=E>0?1:-1,u.push(O.x,O.y,O.z),h.push(ye/P),h.push(1-$/_),y+=1}}for(let $=0;$<_;$++)for(let K=0;K<P;K++){const ye=d+K+H*$,he=d+K+H*($+1),nt=d+(K+1)+H*($+1),$e=d+(K+1)+H*$;l.push(ye,he,$e),l.push(he,nt,$e),G+=6}o.addGroup(f,G,T),f+=G,d+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ni(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Lo extends Ot{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],d=[],f=[];let m=0;const x=[],g=i/2;let p=0;R(),a===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(u),this.setAttribute("position",new Ct(h,3)),this.setAttribute("normal",new Ct(d,3)),this.setAttribute("uv",new Ct(f,2));function R(){const S=new D,w=new D;let E=0;const P=(t-e)/i;for(let _=0;_<=s;_++){const T=[],k=_/s,I=k*(t-e)+e;for(let B=0;B<=r;B++){const q=B/r,F=q*l+o,H=Math.sin(F),M=Math.cos(F);w.x=I*H,w.y=-k*i+g,w.z=I*M,h.push(w.x,w.y,w.z),S.set(H,P,M).normalize(),d.push(S.x,S.y,S.z),f.push(q,1-k),T.push(m++)}x.push(T)}for(let _=0;_<r;_++)for(let T=0;T<s;T++){const k=x[T][_],I=x[T+1][_],B=x[T+1][_+1],q=x[T][_+1];(e>0||T!==0)&&(u.push(k,I,q),E+=3),(t>0||T!==s-1)&&(u.push(I,B,q),E+=3)}c.addGroup(p,E,0),p+=E}function C(S){const w=m,E=new de,P=new D;let _=0;const T=S===!0?e:t,k=S===!0?1:-1;for(let B=1;B<=r;B++)h.push(0,g*k,0),d.push(0,k,0),f.push(.5,.5),m++;const I=m;for(let B=0;B<=r;B++){const F=B/r*l+o,H=Math.cos(F),M=Math.sin(F);P.x=T*M,P.y=g*k,P.z=T*H,h.push(P.x,P.y,P.z),d.push(0,k,0),E.x=H*.5+.5,E.y=M*.5*k+.5,f.push(E.x,E.y),m++}for(let B=0;B<r;B++){const q=w+B,F=I+B;S===!0?u.push(F,F+1,q):u.push(F+1,F,q),_+=3}c.addGroup(p,_,S===!0?1:2),p+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lo(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const zr=new D,Ur=new D,js=new D,Fr=new Zt;class Kh extends Ot{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(Kr*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),d={},f=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);const{a:x,b:g,c:p}=Fr;if(x.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),Fr.getNormal(js),h[0]=`${Math.round(x.x*r)},${Math.round(x.y*r)},${Math.round(x.z*r)}`,h[1]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,h[2]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let R=0;R<3;R++){const C=(R+1)%3,S=h[R],w=h[C],E=Fr[u[R]],P=Fr[u[C]],_=`${S}_${w}`,T=`${w}_${S}`;T in d&&d[T]?(js.dot(d[T].normal)<=s&&(f.push(E.x,E.y,E.z),f.push(P.x,P.y,P.z)),d[T]=null):_ in d||(d[_]={index0:c[R],index1:c[C],normal:js.clone()})}}for(const m in d)if(d[m]){const{index0:x,index1:g}=d[m];zr.fromBufferAttribute(o,x),Ur.fromBufferAttribute(o,g),f.push(zr.x,zr.y,zr.z),f.push(Ur.x,Ur.y,Ur.z)}this.setAttribute("position",new Ct(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class vn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Fe("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const s=i.length;let a;t?a=t:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const u=i[r],d=i[r+1]-u,f=(a-u)/d;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new de:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new D,r=[],s=[],a=[],o=new D,l=new pt;for(let f=0;f<=e;f++){const m=f/e;r[f]=this.getTangentAt(m,new D)}s[0]=new D,a[0]=new D;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),d=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(Je(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(Je(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],f*m)),a[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Do extends vn{constructor(e=0,t=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new de){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Jh extends Do{constructor(e,t,i,r,s,a){super(e,t,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Io(){let n=0,e=0,t=0,i=0;function r(s,a,o,l){n=s,e=o,t=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,h){let d=(a-s)/c-(o-s)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+h)+(l-o)/h;d*=u,f*=u,r(a,o,d,f)},calc:function(s){const a=s*s,o=a*s;return n+e*s+t*a+i*o}}}const bl=new D,Sl=new D,ea=new Io,ta=new Io,na=new Io;class Qh extends vn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new D){const i=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(Sl.subVectors(r[0],r[1]).add(r[0]),c=Sl);const h=r[o%s],d=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(bl.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=bl),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(h),f),x=Math.pow(h.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(u),f);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),ea.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,m,x,g),ta.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,m,x,g),na.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,m,x,g)}else this.curveType==="catmullrom"&&(ea.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),ta.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),na.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return i.set(ea.calc(l),ta.calc(l),na.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new D().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Ml(n,e,t,i,r){const s=(i-e)*.5,a=(r-t)*.5,o=n*n,l=n*o;return(2*t-2*i+s+a)*l+(-3*t+3*i-2*s-a)*o+s*n+t}function jh(n,e){const t=1-n;return t*t*e}function ed(n,e){return 2*(1-n)*n*e}function td(n,e){return n*n*e}function Qi(n,e,t,i){return jh(n,e)+ed(n,t)+td(n,i)}function nd(n,e){const t=1-n;return t*t*t*e}function id(n,e){const t=1-n;return 3*t*t*n*e}function rd(n,e){return 3*(1-n)*n*n*e}function sd(n,e){return n*n*n*e}function ji(n,e,t,i,r){return nd(n,e)+id(n,t)+rd(n,i)+sd(n,r)}class Gc extends vn{constructor(e=new de,t=new de,i=new de,r=new de){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new de){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(ji(e,r.x,s.x,a.x,o.x),ji(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ad extends vn{constructor(e=new D,t=new D,i=new D,r=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new D){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(ji(e,r.x,s.x,a.x,o.x),ji(e,r.y,s.y,a.y,o.y),ji(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Wc extends vn{constructor(e=new de,t=new de){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new de){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new de){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class od extends vn{constructor(e=new D,t=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new D){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new D){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Xc extends vn{constructor(e=new de,t=new de,i=new de){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new de){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(Qi(e,r.x,s.x,a.x),Qi(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ld extends vn{constructor(e=new D,t=new D,i=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new D){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(Qi(e,r.x,s.x,a.x),Qi(e,r.y,s.y,a.y),Qi(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class qc extends vn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new de){const i=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],u=r[a>r.length-2?r.length-1:a+1],h=r[a>r.length-3?r.length-1:a+2];return i.set(Ml(o,l.x,c.x,u.x,h.x),Ml(o,l.y,c.y,u.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new de().fromArray(r))}return this}}var ao=Object.freeze({__proto__:null,ArcCurve:Jh,CatmullRomCurve3:Qh,CubicBezierCurve:Gc,CubicBezierCurve3:ad,EllipseCurve:Do,LineCurve:Wc,LineCurve3:od,QuadraticBezierCurve:Xc,QuadraticBezierCurve3:ld,SplineCurve:qc});class cd extends vn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ao[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new ao[r.type]().fromJSON(r))}return this}}class ds extends cd{constructor(e){super(),this.type="Path",this.currentPoint=new de,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Wc(this.currentPoint.clone(),new de(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new Xc(this.currentPoint.clone(),new de(e,t),new de(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,a){const o=new Gc(this.currentPoint.clone(),new de(e,t),new de(i,r),new de(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new qc(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,r,s,a),this}absarc(e,t,i,r,s,a){return this.absellipse(e,t,i,i,r,s,a),this}ellipse(e,t,i,r,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,r,s,a,o,l),this}absellipse(e,t,i,r,s,a,o,l){const c=new Do(e,t,i,r,s,a,o,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Yc extends ds{constructor(e){super(e),this.uuid=Ii(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(new ds().fromJSON(r))}return this}}function ud(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=$c(n,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(i&&(s=md(n,e,s,t)),n.length>80*t){o=n[0],l=n[1];let u=o,h=l;for(let d=t;d<r;d+=t){const f=n[d],m=n[d+1];f<o&&(o=f),m<l&&(l=m),f>u&&(u=f),m>h&&(h=m)}c=Math.max(u-o,h-l),c=c!==0?32767/c:0}return or(s,a,t,o,l,c,0),a}function $c(n,e,t,i,r){let s;if(r===Ad(n,e,t,i)>0)for(let a=e;a<t;a+=i)s=yl(a/i|0,n[a],n[a+1],s);else for(let a=t-i;a>=e;a-=i)s=yl(a/i|0,n[a],n[a+1],s);return s&&Ci(s,s.next)&&(cr(s),s=s.next),s}function ii(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Ci(t,t.next)||vt(t.prev,t,t.next)===0)){if(cr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function or(n,e,t,i,r,s,a){if(!n)return;!a&&s&&bd(n,i,r,s);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?dd(n,i,r,s):hd(n)){e.push(l.i,n.i,c.i),cr(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=fd(ii(n),e),or(n,e,t,i,r,s,2)):a===2&&pd(n,e,t,i,r,s):or(ii(n),e,t,i,r,s,1);break}}}function hd(n){const e=n.prev,t=n,i=n.next;if(vt(e,t,i)>=0)return!1;const r=e.x,s=t.x,a=i.x,o=e.y,l=t.y,c=i.y,u=Math.min(r,s,a),h=Math.min(o,l,c),d=Math.max(r,s,a),f=Math.max(o,l,c);let m=i.next;for(;m!==e;){if(m.x>=u&&m.x<=d&&m.y>=h&&m.y<=f&&$i(r,o,s,l,a,c,m.x,m.y)&&vt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function dd(n,e,t,i){const r=n.prev,s=n,a=n.next;if(vt(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,u=r.y,h=s.y,d=a.y,f=Math.min(o,l,c),m=Math.min(u,h,d),x=Math.max(o,l,c),g=Math.max(u,h,d),p=oo(f,m,e,t,i),R=oo(x,g,e,t,i);let C=n.prevZ,S=n.nextZ;for(;C&&C.z>=p&&S&&S.z<=R;){if(C.x>=f&&C.x<=x&&C.y>=m&&C.y<=g&&C!==r&&C!==a&&$i(o,u,l,h,c,d,C.x,C.y)&&vt(C.prev,C,C.next)>=0||(C=C.prevZ,S.x>=f&&S.x<=x&&S.y>=m&&S.y<=g&&S!==r&&S!==a&&$i(o,u,l,h,c,d,S.x,S.y)&&vt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;C&&C.z>=p;){if(C.x>=f&&C.x<=x&&C.y>=m&&C.y<=g&&C!==r&&C!==a&&$i(o,u,l,h,c,d,C.x,C.y)&&vt(C.prev,C,C.next)>=0)return!1;C=C.prevZ}for(;S&&S.z<=R;){if(S.x>=f&&S.x<=x&&S.y>=m&&S.y<=g&&S!==r&&S!==a&&$i(o,u,l,h,c,d,S.x,S.y)&&vt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function fd(n,e){let t=n;do{const i=t.prev,r=t.next.next;!Ci(i,r)&&Kc(i,t,t.next,r)&&lr(i,r)&&lr(r,i)&&(e.push(i.i,t.i,r.i),cr(t),cr(t.next),t=n=r),t=t.next}while(t!==n);return ii(t)}function pd(n,e,t,i,r,s){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&yd(a,o)){let l=Jc(a,o);a=ii(a,a.next),l=ii(l,l.next),or(a,e,t,i,r,s,0),or(l,e,t,i,r,s,0);return}o=o.next}a=a.next}while(a!==n)}function md(n,e,t,i){const r=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*i,l=s<a-1?e[s+1]*i:n.length,c=$c(n,o,l,i,!1);c===c.next&&(c.steiner=!0),r.push(Md(c))}r.sort(gd);for(let s=0;s<r.length;s++)t=vd(r[s],t);return t}function gd(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function vd(n,e){const t=_d(n,e);if(!t)return e;const i=Jc(t,n);return ii(i,i.next),ii(t,t.next)}function _d(n,e){let t=e;const i=n.x,r=n.y;let s=-1/0,a;if(Ci(n,t))return t;do{if(Ci(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const h=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=i&&h>s&&(s=h,a=t.x<t.next.x?t:t.next,h===i))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(i>=t.x&&t.x>=l&&i!==t.x&&Zc(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){const h=Math.abs(r-t.y)/(i-t.x);lr(t,n)&&(h<u||h===u&&(t.x>a.x||t.x===a.x&&xd(a,t)))&&(a=t,u=h)}t=t.next}while(t!==o);return a}function xd(n,e){return vt(n.prev,n,e.prev)<0&&vt(e.next,n,n.next)<0}function bd(n,e,t,i){let r=n;do r.z===0&&(r.z=oo(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,Sd(r)}function Sd(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let a=i,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(r=i,i=i.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=a}s.nextZ=null,t*=2}while(e>1);return n}function oo(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Md(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Zc(n,e,t,i,r,s,a,o){return(r-a)*(e-o)>=(n-a)*(s-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(i-o)}function $i(n,e,t,i,r,s,a,o){return!(n===a&&e===o)&&Zc(n,e,t,i,r,s,a,o)}function yd(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!wd(n,e)&&(lr(n,e)&&lr(e,n)&&Ed(n,e)&&(vt(n.prev,n,e.prev)||vt(n,e.prev,e))||Ci(n,e)&&vt(n.prev,n,n.next)>0&&vt(e.prev,e,e.next)>0)}function vt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Ci(n,e){return n.x===e.x&&n.y===e.y}function Kc(n,e,t,i){const r=Br(vt(n,e,t)),s=Br(vt(n,e,i)),a=Br(vt(t,i,n)),o=Br(vt(t,i,e));return!!(r!==s&&a!==o||r===0&&Or(n,t,e)||s===0&&Or(n,i,e)||a===0&&Or(t,n,i)||o===0&&Or(t,e,i))}function Or(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Br(n){return n>0?1:n<0?-1:0}function wd(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&Kc(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function lr(n,e){return vt(n.prev,n,n.next)<0?vt(n,e,n.next)>=0&&vt(n,n.prev,e)>=0:vt(n,e,n.prev)<0||vt(n,n.next,e)<0}function Ed(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Jc(n,e){const t=lo(n.i,n.x,n.y),i=lo(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function yl(n,e,t,i){const r=lo(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function cr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function lo(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Ad(n,e,t,i){let r=0;for(let s=e,a=t-i;s<t;s+=i)r+=(n[a]-n[s])*(n[s+1]+n[a+1]),a=s;return r}class Td{static triangulate(e,t,i=2){return ud(e,t,i)}}class yi{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return yi.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];wl(e),El(i,e);let a=e.length;t.forEach(wl);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,El(i,t[l]);const o=Td.triangulate(i,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function wl(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function El(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class fs extends Ot{constructor(e=new Yc([new de(.5,.5),new de(-.5,.5),new de(-.5,-.5),new de(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new Ct(r,3)),this.setAttribute("uv",new Ct(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,R=t.UVGenerator!==void 0?t.UVGenerator:Rd;let C,S=!1,w,E,P,_;if(p){C=p.getSpacedPoints(u),S=!0,d=!1;const ie=p.isCatmullRomCurve3?p.closed:!1;w=p.computeFrenetFrames(u,ie),E=new D,P=new D,_=new D}d||(g=0,f=0,m=0,x=0);const T=o.extractPoints(c);let k=T.shape;const I=T.holes;if(!yi.isClockWise(k)){k=k.reverse();for(let ie=0,se=I.length;ie<se;ie++){const ae=I[ie];yi.isClockWise(ae)&&(I[ie]=ae.reverse())}}function q(ie){const ae=10000000000000001e-36;let oe=ie[0];for(let ue=1;ue<=ie.length;ue++){const Ne=ue%ie.length,Ie=ie[Ne],Be=Ie.x-oe.x,Ve=Ie.y-oe.y,L=Be*Be+Ve*Ve,rt=Math.max(Math.abs(Ie.x),Math.abs(Ie.y),Math.abs(oe.x),Math.abs(oe.y)),Ze=ae*rt*rt;if(L<=Ze){ie.splice(Ne,1),ue--;continue}oe=Ie}}q(k),I.forEach(q);const F=I.length,H=k;for(let ie=0;ie<F;ie++){const se=I[ie];k=k.concat(se)}function M(ie,se,ae){return se||je("ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector(se,ae)}const y=k.length;function G(ie,se,ae){let oe,ue,Ne;const Ie=ie.x-se.x,Be=ie.y-se.y,Ve=ae.x-ie.x,L=ae.y-ie.y,rt=Ie*Ie+Be*Be,Ze=Ie*L-Be*Ve;if(Math.abs(Ze)>Number.EPSILON){const A=Math.sqrt(rt),v=Math.sqrt(Ve*Ve+L*L),V=se.x-Be/A,Y=se.y+Ie/A,J=ae.x-L/v,le=ae.y+Ve/v,ce=((J-V)*L-(le-Y)*Ve)/(Ie*L-Be*Ve);oe=V+Ie*ce-ie.x,ue=Y+Be*ce-ie.y;const Q=oe*oe+ue*ue;if(Q<=2)return new de(oe,ue);Ne=Math.sqrt(Q/2)}else{let A=!1;Ie>Number.EPSILON?Ve>Number.EPSILON&&(A=!0):Ie<-Number.EPSILON?Ve<-Number.EPSILON&&(A=!0):Math.sign(Be)===Math.sign(L)&&(A=!0),A?(oe=-Be,ue=Ie,Ne=Math.sqrt(rt)):(oe=Ie,ue=Be,Ne=Math.sqrt(rt/2))}return new de(oe/Ne,ue/Ne)}const O=[];for(let ie=0,se=H.length,ae=se-1,oe=ie+1;ie<se;ie++,ae++,oe++)ae===se&&(ae=0),oe===se&&(oe=0),O[ie]=G(H[ie],H[ae],H[oe]);const $=[];let K,ye=O.concat();for(let ie=0,se=F;ie<se;ie++){const ae=I[ie];K=[];for(let oe=0,ue=ae.length,Ne=ue-1,Ie=oe+1;oe<ue;oe++,Ne++,Ie++)Ne===ue&&(Ne=0),Ie===ue&&(Ie=0),K[oe]=G(ae[oe],ae[Ne],ae[Ie]);$.push(K),ye=ye.concat(K)}let he;if(g===0)he=yi.triangulateShape(H,I);else{const ie=[],se=[];for(let ae=0;ae<g;ae++){const oe=ae/g,ue=f*Math.cos(oe*Math.PI/2),Ne=m*Math.sin(oe*Math.PI/2)+x;for(let Ie=0,Be=H.length;Ie<Be;Ie++){const Ve=M(H[Ie],O[Ie],Ne);xe(Ve.x,Ve.y,-ue),oe===0&&ie.push(Ve)}for(let Ie=0,Be=F;Ie<Be;Ie++){const Ve=I[Ie];K=$[Ie];const L=[];for(let rt=0,Ze=Ve.length;rt<Ze;rt++){const A=M(Ve[rt],K[rt],Ne);xe(A.x,A.y,-ue),oe===0&&L.push(A)}oe===0&&se.push(L)}}he=yi.triangulateShape(ie,se)}const nt=he.length,$e=m+x;for(let ie=0;ie<y;ie++){const se=d?M(k[ie],ye[ie],$e):k[ie];S?(P.copy(w.normals[0]).multiplyScalar(se.x),E.copy(w.binormals[0]).multiplyScalar(se.y),_.copy(C[0]).add(P).add(E),xe(_.x,_.y,_.z)):xe(se.x,se.y,0)}for(let ie=1;ie<=u;ie++)for(let se=0;se<y;se++){const ae=d?M(k[se],ye[se],$e):k[se];S?(P.copy(w.normals[ie]).multiplyScalar(ae.x),E.copy(w.binormals[ie]).multiplyScalar(ae.y),_.copy(C[ie]).add(P).add(E),xe(_.x,_.y,_.z)):xe(ae.x,ae.y,h/u*ie)}for(let ie=g-1;ie>=0;ie--){const se=ie/g,ae=f*Math.cos(se*Math.PI/2),oe=m*Math.sin(se*Math.PI/2)+x;for(let ue=0,Ne=H.length;ue<Ne;ue++){const Ie=M(H[ue],O[ue],oe);xe(Ie.x,Ie.y,h+ae)}for(let ue=0,Ne=I.length;ue<Ne;ue++){const Ie=I[ue];K=$[ue];for(let Be=0,Ve=Ie.length;Be<Ve;Be++){const L=M(Ie[Be],K[Be],oe);S?xe(L.x,L.y+C[u-1].y,C[u-1].x+ae):xe(L.x,L.y,h+ae)}}}et(),j();function et(){const ie=r.length/3;if(d){let se=0,ae=y*se;for(let oe=0;oe<nt;oe++){const ue=he[oe];Ue(ue[2]+ae,ue[1]+ae,ue[0]+ae)}se=u+g*2,ae=y*se;for(let oe=0;oe<nt;oe++){const ue=he[oe];Ue(ue[0]+ae,ue[1]+ae,ue[2]+ae)}}else{for(let se=0;se<nt;se++){const ae=he[se];Ue(ae[2],ae[1],ae[0])}for(let se=0;se<nt;se++){const ae=he[se];Ue(ae[0]+y*u,ae[1]+y*u,ae[2]+y*u)}}i.addGroup(ie,r.length/3-ie,0)}function j(){const ie=r.length/3;let se=0;ne(H,se),se+=H.length;for(let ae=0,oe=I.length;ae<oe;ae++){const ue=I[ae];ne(ue,se),se+=ue.length}i.addGroup(ie,r.length/3-ie,1)}function ne(ie,se){let ae=ie.length;for(;--ae>=0;){const oe=ae;let ue=ae-1;ue<0&&(ue=ie.length-1);for(let Ne=0,Ie=u+g*2;Ne<Ie;Ne++){const Be=y*Ne,Ve=y*(Ne+1),L=se+oe+Be,rt=se+ue+Be,Ze=se+ue+Ve,A=se+oe+Ve;we(L,rt,Ze,A)}}}function xe(ie,se,ae){l.push(ie),l.push(se),l.push(ae)}function Ue(ie,se,ae){Oe(ie),Oe(se),Oe(ae);const oe=r.length/3,ue=R.generateTopUV(i,r,oe-3,oe-2,oe-1);ot(ue[0]),ot(ue[1]),ot(ue[2])}function we(ie,se,ae,oe){Oe(ie),Oe(se),Oe(oe),Oe(se),Oe(ae),Oe(oe);const ue=r.length/3,Ne=R.generateSideWallUV(i,r,ue-6,ue-3,ue-2,ue-1);ot(Ne[0]),ot(Ne[1]),ot(Ne[3]),ot(Ne[1]),ot(Ne[2]),ot(Ne[3])}function Oe(ie){r.push(l[ie*3+0]),r.push(l[ie*3+1]),r.push(l[ie*3+2])}function ot(ie){s.push(ie.x),s.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return Cd(t,i,e)}static fromJSON(e,t){const i=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];i.push(o)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new ao[r.type]().fromJSON(r)),new fs(i,e.options)}}const Rd={generateTopUV:function(n,e,t,i,r){const s=e[t*3],a=e[t*3+1],o=e[i*3],l=e[i*3+1],c=e[r*3],u=e[r*3+1];return[new de(s,a),new de(o,l),new de(c,u)]},generateSideWallUV:function(n,e,t,i,r,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[i*3],u=e[i*3+1],h=e[i*3+2],d=e[r*3],f=e[r*3+1],m=e[r*3+2],x=e[s*3],g=e[s*3+1],p=e[s*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new de(a,1-l),new de(c,1-h),new de(d,1-m),new de(x,1-p)]:[new de(o,1-l),new de(u,1-h),new de(f,1-m),new de(g,1-p)]}};function Cd(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){const s=n[i];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class bs extends Ot{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,h=e/o,d=t/l,f=[],m=[],x=[],g=[];for(let p=0;p<u;p++){const R=p*d-a;for(let C=0;C<c;C++){const S=C*h-s;m.push(S,-R,0),x.push(0,0,1),g.push(C/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let R=0;R<o;R++){const C=R+c*p,S=R+c*(p+1),w=R+1+c*(p+1),E=R+1+c*p;f.push(C,S,E),f.push(S,w,E)}this.setIndex(f),this.setAttribute("position",new Ct(m,3)),this.setAttribute("normal",new Ct(x,3)),this.setAttribute("uv",new Ct(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bs(e.width,e.height,e.widthSegments,e.heightSegments)}}function Pi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(Al(r))r.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Al(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Nt(n){const e={};for(let t=0;t<n.length;t++){const i=Pi(n[t]);for(const r in i)e[r]=i[r]}return e}function Al(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Pd(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Qc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const kd={clone:Pi,merge:Nt};var Ld=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Dd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class gn extends zi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ld,this.fragmentShader=Dd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Pi(e.uniforms),this.uniformsGroups=Pd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Ye().setHex(r.value);break;case"v2":this.uniforms[i].value=new de().fromArray(r.value);break;case"v3":this.uniforms[i].value=new D().fromArray(r.value);break;case"v4":this.uniforms[i].value=new gt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new He().fromArray(r.value);break;case"m4":this.uniforms[i].value=new pt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Id extends gn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Nd extends zi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=io,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=_o,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class zd extends zi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=uh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ud extends zi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class jc extends Rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const ia=new pt,Tl=new D,Rl=new D;class Fd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.mapType=Wt,this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ko,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Tl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Tl),Rl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Rl),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){ia.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(ia,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===sr||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(ia)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Vr=new D,Hr=new Ni,on=new D;class eu extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Vr,Hr,on),on.x===1&&on.y===1&&on.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vr,Hr,on.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Vr,Hr,on),on.x===1&&on.y===1&&on.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vr,Hr,on.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const zn=new D,Cl=new de,Pl=new de;class $t extends eu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ro*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Kr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ro*2*Math.atan(Math.tan(Kr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(zn.x,zn.y).multiplyScalar(-e/zn.z),zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(zn.x,zn.y).multiplyScalar(-e/zn.z)}getViewSize(e,t){return this.getViewBounds(e,Cl,Pl),t.subVectors(Pl,Cl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Kr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Ss extends eu{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Od extends Fd{constructor(){super(new Ss(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class kl extends jc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new Od}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Bd extends jc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const vi=-90,_i=1;class Vd extends Rt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new $t(vi,_i,e,t);r.layers=this.layers,this.add(r);const s=new $t(vi,_i,e,t);s.layers=this.layers,this.add(s);const a=new $t(vi,_i,e,t);a.layers=this.layers,this.add(a);const o=new $t(vi,_i,e,t);o.layers=this.layers,this.add(o);const l=new $t(vi,_i,e,t);l.layers=this.layers,this.add(l);const c=new $t(vi,_i,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===dn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===sr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class Hd extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Ll=new pt;class Dl{constructor(e,t,i=0,r=1/0){this.ray=new Co(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Ro,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):je("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ll.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ll),this}intersectObject(e,t=!0,i=[]){return co(e,this,i,t),i.sort(Il),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)co(e[r],this,i,t);return i.sort(Il),i}}function Il(n,e){return n.distance-e.distance}function co(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)co(s[a],e,t,!0)}}class tu{static{tu.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}function Nl(n,e,t,i){const r=Gd(i);switch(t){case Lc:return n*e;case Ic:return n*e/r.components*r.byteLength;case Mo:return n*e/r.components*r.byteLength;case ti:return n*e*2/r.components*r.byteLength;case yo:return n*e*2/r.components*r.byteLength;case Dc:return n*e*3/r.components*r.byteLength;case tn:return n*e*4/r.components*r.byteLength;case wo:return n*e*4/r.components*r.byteLength;case qr:case Yr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case $r:case Zr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ra:case Pa:return Math.max(n,16)*Math.max(e,8)/4;case Ta:case Ca:return Math.max(n,8)*Math.max(e,8)/2;case ka:case La:case Ia:case Na:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Da:case ss:case za:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ua:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Fa:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Oa:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ba:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Va:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ha:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ga:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Wa:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Xa:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case qa:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ya:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case $a:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Za:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ka:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ja:case Qa:case ja:return Math.ceil(n/4)*Math.ceil(e/4)*16;case eo:case to:return Math.ceil(n/4)*Math.ceil(e/4)*8;case as:case no:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Gd(n){switch(n){case Wt:case Rc:return{byteLength:1,components:1};case ir:case Cc:case mn:return{byteLength:2,components:1};case bo:case So:return{byteLength:2,components:4};case pn:case xo:case hn:return{byteLength:4,components:1};case Pc:case kc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:vo}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=vo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function nu(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Wd(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,o),h.length===0)n.bufferSubData(c,0,u);else{h.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<h.length;f++){const m=h[d],x=h[f];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++d,h[d]=x)}h.length=d+1;for(let f=0,m=h.length;f<m;f++){const x=h[f];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Xd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,qd=`#ifdef USE_ALPHAHASH
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
#endif`,Yd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$d=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Kd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jd=`#ifdef USE_AOMAP
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
#endif`,Qd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jd=`#ifdef USE_BATCHING
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
#endif`,ef=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,sf=`#ifdef USE_IRIDESCENCE
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
#endif`,af=`#ifdef USE_BUMPMAP
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
#endif`,of=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,lf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,cf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,uf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,df=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ff=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,pf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,mf=`#define PI 3.141592653589793
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
} // validated`,gf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,vf=`vec3 transformedNormal = objectNormal;
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
#endif`,_f=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Mf="gl_FragColor = linearToOutputTexel( gl_FragColor );",yf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wf=`#ifdef USE_ENVMAP
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
#endif`,Ef=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Af=`#ifdef USE_ENVMAP
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
#endif`,Tf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Rf=`#ifdef USE_ENVMAP
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
#endif`,Cf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Pf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Lf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Df=`#ifdef USE_GRADIENTMAP
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
}`,If=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Nf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Uf=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Ff=`#ifdef USE_ENVMAP
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
#endif`,Of=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Bf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Vf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Gf=`PhysicalMaterial material;
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
#endif`,Wf=`uniform sampler2D dfgLUT;
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
}`,Xf=`
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
#endif`,qf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Yf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$f=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Zf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Kf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,jf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ep=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,np=`#if defined( USE_POINTS_UV )
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
#endif`,ip=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ap=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,op=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lp=`#ifdef USE_MORPHTARGETS
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
#endif`,cp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,up=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,hp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,dp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,mp=`#ifdef USE_NORMALMAP
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
#endif`,gp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_p=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,bp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Mp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ep=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ap=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Tp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Cp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Pp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,kp=`float getShadowMask() {
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
}`,Lp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dp=`#ifdef USE_SKINNING
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
#endif`,Ip=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Np=`#ifdef USE_SKINNING
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
#endif`,zp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Up=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Fp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Op=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Bp=`#ifdef USE_TRANSMISSION
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
#endif`,Vp=`#ifdef USE_TRANSMISSION
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
#endif`,Hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Yp=`uniform sampler2D t2D;
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
}`,$p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Kp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qp=`#include <common>
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
}`,jp=`#if DEPTH_PACKING == 3200
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
}`,em=`#define DISTANCE
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
}`,tm=`#define DISTANCE
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
}`,nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,im=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rm=`uniform float scale;
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
}`,sm=`uniform vec3 diffuse;
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
}`,am=`#include <common>
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
}`,om=`uniform vec3 diffuse;
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
}`,lm=`#define LAMBERT
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
}`,cm=`#define LAMBERT
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
}`,um=`#define MATCAP
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
}`,hm=`#define MATCAP
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
}`,dm=`#define NORMAL
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
}`,fm=`#define NORMAL
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
}`,pm=`#define PHONG
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
}`,mm=`#define PHONG
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
}`,gm=`#define STANDARD
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
}`,vm=`#define STANDARD
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
}`,_m=`#define TOON
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
}`,xm=`#define TOON
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
}`,bm=`uniform float size;
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
}`,Sm=`uniform vec3 diffuse;
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
}`,Mm=`#include <common>
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
}`,ym=`uniform vec3 color;
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
}`,wm=`uniform float rotation;
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
}`,Em=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:Xd,alphahash_pars_fragment:qd,alphamap_fragment:Yd,alphamap_pars_fragment:$d,alphatest_fragment:Zd,alphatest_pars_fragment:Kd,aomap_fragment:Jd,aomap_pars_fragment:Qd,batching_pars_vertex:jd,batching_vertex:ef,begin_vertex:tf,beginnormal_vertex:nf,bsdfs:rf,iridescence_fragment:sf,bumpmap_pars_fragment:af,clipping_planes_fragment:of,clipping_planes_pars_fragment:lf,clipping_planes_pars_vertex:cf,clipping_planes_vertex:uf,color_fragment:hf,color_pars_fragment:df,color_pars_vertex:ff,color_vertex:pf,common:mf,cube_uv_reflection_fragment:gf,defaultnormal_vertex:vf,displacementmap_pars_vertex:_f,displacementmap_vertex:xf,emissivemap_fragment:bf,emissivemap_pars_fragment:Sf,colorspace_fragment:Mf,colorspace_pars_fragment:yf,envmap_fragment:wf,envmap_common_pars_fragment:Ef,envmap_pars_fragment:Af,envmap_pars_vertex:Tf,envmap_physical_pars_fragment:Ff,envmap_vertex:Rf,fog_vertex:Cf,fog_pars_vertex:Pf,fog_fragment:kf,fog_pars_fragment:Lf,gradientmap_pars_fragment:Df,lightmap_pars_fragment:If,lights_lambert_fragment:Nf,lights_lambert_pars_fragment:zf,lights_pars_begin:Uf,lights_toon_fragment:Of,lights_toon_pars_fragment:Bf,lights_phong_fragment:Vf,lights_phong_pars_fragment:Hf,lights_physical_fragment:Gf,lights_physical_pars_fragment:Wf,lights_fragment_begin:Xf,lights_fragment_maps:qf,lights_fragment_end:Yf,lightprobes_pars_fragment:$f,logdepthbuf_fragment:Zf,logdepthbuf_pars_fragment:Kf,logdepthbuf_pars_vertex:Jf,logdepthbuf_vertex:Qf,map_fragment:jf,map_pars_fragment:ep,map_particle_fragment:tp,map_particle_pars_fragment:np,metalnessmap_fragment:ip,metalnessmap_pars_fragment:rp,morphinstance_vertex:sp,morphcolor_vertex:ap,morphnormal_vertex:op,morphtarget_pars_vertex:lp,morphtarget_vertex:cp,normal_fragment_begin:up,normal_fragment_maps:hp,normal_pars_fragment:dp,normal_pars_vertex:fp,normal_vertex:pp,normalmap_pars_fragment:mp,clearcoat_normal_fragment_begin:gp,clearcoat_normal_fragment_maps:vp,clearcoat_pars_fragment:_p,iridescence_pars_fragment:xp,opaque_fragment:bp,packing:Sp,premultiplied_alpha_fragment:Mp,project_vertex:yp,dithering_fragment:wp,dithering_pars_fragment:Ep,roughnessmap_fragment:Ap,roughnessmap_pars_fragment:Tp,shadowmap_pars_fragment:Rp,shadowmap_pars_vertex:Cp,shadowmap_vertex:Pp,shadowmask_pars_fragment:kp,skinbase_vertex:Lp,skinning_pars_vertex:Dp,skinning_vertex:Ip,skinnormal_vertex:Np,specularmap_fragment:zp,specularmap_pars_fragment:Up,tonemapping_fragment:Fp,tonemapping_pars_fragment:Op,transmission_fragment:Bp,transmission_pars_fragment:Vp,uv_pars_fragment:Hp,uv_pars_vertex:Gp,uv_vertex:Wp,worldpos_vertex:Xp,background_vert:qp,background_frag:Yp,backgroundCube_vert:$p,backgroundCube_frag:Zp,cube_vert:Kp,cube_frag:Jp,depth_vert:Qp,depth_frag:jp,distance_vert:em,distance_frag:tm,equirect_vert:nm,equirect_frag:im,linedashed_vert:rm,linedashed_frag:sm,meshbasic_vert:am,meshbasic_frag:om,meshlambert_vert:lm,meshlambert_frag:cm,meshmatcap_vert:um,meshmatcap_frag:hm,meshnormal_vert:dm,meshnormal_frag:fm,meshphong_vert:pm,meshphong_frag:mm,meshphysical_vert:gm,meshphysical_frag:vm,meshtoon_vert:_m,meshtoon_frag:xm,points_vert:bm,points_frag:Sm,shadow_vert:Mm,shadow_frag:ym,sprite_vert:wm,sprite_frag:Em},_e={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new D},probesMax:{value:new D},probesResolution:{value:new D}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},un={basic:{uniforms:Nt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Nt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Ye(0)},envMapIntensity:{value:1}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Nt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Nt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Nt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Nt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Nt([_e.points,_e.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Nt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Nt([_e.common,_e.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Nt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Nt([_e.sprite,_e.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distance:{uniforms:Nt([_e.common,_e.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distance_vert,fragmentShader:Xe.distance_frag},shadow:{uniforms:Nt([_e.lights,_e.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};un.physical={uniforms:Nt([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Gr={r:0,b:0,g:0},Am=new pt,iu=new He;iu.set(-1,0,0,0,1,0,0,0,1);function Tm(n,e,t,i,r,s){const a=new Ye(0);let o=r===!0?0:1,l,c,u=null,h=0,d=null;function f(R){let C=R.isScene===!0?R.background:null;if(C&&C.isTexture){const S=R.backgroundBlurriness>0;C=e.get(C,S)}return C}function m(R){let C=!1;const S=f(R);S===null?g(a,o):S&&S.isColor&&(g(S,1),C=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(R,C){const S=f(C);S&&(S.isCubeTexture||S.mapping===_s)?(c===void 0&&(c=new rn(new ni(1,1,1),new gn({name:"BackgroundCubeMaterial",uniforms:Pi(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Ft,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Am.makeRotationFromEuler(C.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(iu),c.material.toneMapped=Qe.getTransfer(S.colorSpace)!==lt,(u!==S||h!==S.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=S,h=S.version,d=n.toneMapping),c.layers.enableAll(),R.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new rn(new bs(2,2),new gn({name:"BackgroundMaterial",uniforms:Pi(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:Bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=Qe.getTransfer(S.colorSpace)!==lt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||h!==S.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,h=S.version,d=n.toneMapping),l.layers.enableAll(),R.unshift(l,l.geometry,l.material,0,0,null))}function g(R,C){R.getRGB(Gr,Qc(n)),t.buffers.color.setClear(Gr.r,Gr.g,Gr.b,C,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(R,C=1){a.set(R),o=C,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(R){o=R,g(a,o)},render:m,addToRenderList:x,dispose:p}}function Rm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(I,B,q,F,H){let M=!1;const y=h(I,F,q,B);s!==y&&(s=y,c(s.object)),M=f(I,F,q,H),M&&m(I,F,q,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(M||a)&&(a=!1,S(I,B,q,F),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return n.createVertexArray()}function c(I){return n.bindVertexArray(I)}function u(I){return n.deleteVertexArray(I)}function h(I,B,q,F){const H=F.wireframe===!0;let M=i[B.id];M===void 0&&(M={},i[B.id]=M);const y=I.isInstancedMesh===!0?I.id:0;let G=M[y];G===void 0&&(G={},M[y]=G);let O=G[q.id];O===void 0&&(O={},G[q.id]=O);let $=O[H];return $===void 0&&($=d(l()),O[H]=$),$}function d(I){const B=[],q=[],F=[];for(let H=0;H<t;H++)B[H]=0,q[H]=0,F[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:q,attributeDivisors:F,object:I,attributes:{},index:null}}function f(I,B,q,F){const H=s.attributes,M=B.attributes;let y=0;const G=q.getAttributes();for(const O in G)if(G[O].location>=0){const K=H[O];let ye=M[O];if(ye===void 0&&(O==="instanceMatrix"&&I.instanceMatrix&&(ye=I.instanceMatrix),O==="instanceColor"&&I.instanceColor&&(ye=I.instanceColor)),K===void 0||K.attribute!==ye||ye&&K.data!==ye.data)return!0;y++}return s.attributesNum!==y||s.index!==F}function m(I,B,q,F){const H={},M=B.attributes;let y=0;const G=q.getAttributes();for(const O in G)if(G[O].location>=0){let K=M[O];K===void 0&&(O==="instanceMatrix"&&I.instanceMatrix&&(K=I.instanceMatrix),O==="instanceColor"&&I.instanceColor&&(K=I.instanceColor));const ye={};ye.attribute=K,K&&K.data&&(ye.data=K.data),H[O]=ye,y++}s.attributes=H,s.attributesNum=y,s.index=F}function x(){const I=s.newAttributes;for(let B=0,q=I.length;B<q;B++)I[B]=0}function g(I){p(I,0)}function p(I,B){const q=s.newAttributes,F=s.enabledAttributes,H=s.attributeDivisors;q[I]=1,F[I]===0&&(n.enableVertexAttribArray(I),F[I]=1),H[I]!==B&&(n.vertexAttribDivisor(I,B),H[I]=B)}function R(){const I=s.newAttributes,B=s.enabledAttributes;for(let q=0,F=B.length;q<F;q++)B[q]!==I[q]&&(n.disableVertexAttribArray(q),B[q]=0)}function C(I,B,q,F,H,M,y){y===!0?n.vertexAttribIPointer(I,B,q,H,M):n.vertexAttribPointer(I,B,q,F,H,M)}function S(I,B,q,F){x();const H=F.attributes,M=q.getAttributes(),y=B.defaultAttributeValues;for(const G in M){const O=M[G];if(O.location>=0){let $=H[G];if($===void 0&&(G==="instanceMatrix"&&I.instanceMatrix&&($=I.instanceMatrix),G==="instanceColor"&&I.instanceColor&&($=I.instanceColor)),$!==void 0){const K=$.normalized,ye=$.itemSize,he=e.get($);if(he===void 0)continue;const nt=he.buffer,$e=he.type,et=he.bytesPerElement,j=$e===n.INT||$e===n.UNSIGNED_INT||$.gpuType===xo;if($.isInterleavedBufferAttribute){const ne=$.data,xe=ne.stride,Ue=$.offset;if(ne.isInstancedInterleavedBuffer){for(let we=0;we<O.locationSize;we++)p(O.location+we,ne.meshPerAttribute);I.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let we=0;we<O.locationSize;we++)g(O.location+we);n.bindBuffer(n.ARRAY_BUFFER,nt);for(let we=0;we<O.locationSize;we++)C(O.location+we,ye/O.locationSize,$e,K,xe*et,(Ue+ye/O.locationSize*we)*et,j)}else{if($.isInstancedBufferAttribute){for(let ne=0;ne<O.locationSize;ne++)p(O.location+ne,$.meshPerAttribute);I.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let ne=0;ne<O.locationSize;ne++)g(O.location+ne);n.bindBuffer(n.ARRAY_BUFFER,nt);for(let ne=0;ne<O.locationSize;ne++)C(O.location+ne,ye/O.locationSize,$e,K,ye*et,ye/O.locationSize*ne*et,j)}}else if(y!==void 0){const K=y[G];if(K!==void 0)switch(K.length){case 2:n.vertexAttrib2fv(O.location,K);break;case 3:n.vertexAttrib3fv(O.location,K);break;case 4:n.vertexAttrib4fv(O.location,K);break;default:n.vertexAttrib1fv(O.location,K)}}}}R()}function w(){T();for(const I in i){const B=i[I];for(const q in B){const F=B[q];for(const H in F){const M=F[H];for(const y in M)u(M[y].object),delete M[y];delete F[H]}}delete i[I]}}function E(I){if(i[I.id]===void 0)return;const B=i[I.id];for(const q in B){const F=B[q];for(const H in F){const M=F[H];for(const y in M)u(M[y].object),delete M[y];delete F[H]}}delete i[I.id]}function P(I){for(const B in i){const q=i[B];for(const F in q){const H=q[F];if(H[I.id]===void 0)continue;const M=H[I.id];for(const y in M)u(M[y].object),delete M[y];delete H[I.id]}}}function _(I){for(const B in i){const q=i[B],F=I.isInstancedMesh===!0?I.id:0,H=q[F];if(H!==void 0){for(const M in H){const y=H[M];for(const G in y)u(y[G].object),delete y[G];delete H[M]}delete q[F],Object.keys(q).length===0&&delete i[B]}}}function T(){k(),a=!0,s!==r&&(s=r,c(s.object))}function k(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:T,resetDefaultState:k,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:_,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:g,disableUnusedAttributes:R}}function Cm(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let d=0;for(let f=0;f<u;f++)d+=c[f];t.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Pm(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==tn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const _=P===mn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Wt&&P!==hn&&!_&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Fe("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),R=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),C=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:R,maxVaryings:C,maxFragmentUniforms:S,maxSamples:w,samples:E}}function km(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new yn,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||i!==0||r;return r=d,i=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const m=h.clippingPlanes,x=h.clipIntersection,g=h.clipShadows,p=n.get(h);if(!r||m===null||m.length===0||s&&!g)s?u(null):c();else{const R=s?0:i,C=R*4;let S=p.clippingState||null;l.value=S,S=u(m,d,C,f);for(let w=0;w!==C;++w)S[w]=t[w];p.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=R}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,d,f,m){const x=h!==null?h.length:0;let g=null;if(x!==0){if(g=l.value,m!==!0||g===null){const p=f+x*4,R=d.matrixWorldInverse;o.getNormalMatrix(R),(g===null||g.length<p)&&(g=new Float32Array(p));for(let C=0,S=f;C!==x;++C,S+=4)a.copy(h[C]).applyMatrix4(R,o),a.normal.toArray(g,S),g[S+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}const wi=4,Lm=6,Dm=20,Im=256,Xi=new Ss,zl=new Ye;let ra=null,sa=0,aa=0,oa=!1;const Nm=new D,Yn=new D;class Ul{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=Nm}=s;ra=this._renderer.getRenderTarget(),sa=this._renderer.getActiveCubeFace(),aa=this._renderer.getActiveMipmapLevel(),oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ol(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ra,sa,aa),this._renderer.xr.enabled=oa,e.scissorTest=!1,xi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ei||e.mapping===Ri?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ra=this._renderer.getRenderTarget(),sa=this._renderer.getActiveCubeFace(),aa=this._renderer.getActiveMipmapLevel(),oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:mn,format:tn,colorSpace:os,depthBuffer:!1},r=Fl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fl(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=zm(s)),this._blurMaterial=Fm(s,e,t),this._ggxMaterial=Um(s,e,t)}return r}_compileMaterial(e){const t=new rn(new Ot,e);this._renderer.compile(t,Xi)}_sceneToCubeUV(e,t,i,r,s){const l=new $t(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(zl),h.toneMapping=fn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new rn(new ni,new Po({name:"PMREM.Background",side:Ft,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let p=!1;const R=e.background;R?R.isColor&&(g.color.copy(R),e.background=null,p=!0):(g.color.copy(zl),p=!0);for(let C=0;C<6;C++){const S=C%3;S===0?(l.up.set(0,c[C],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[C],s.y,s.z)):S===1?(l.up.set(0,0,c[C]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[C],s.z)):(l.up.set(0,c[C],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[C]));const w=this._cubeSize;xi(r,S*w,C>2?w:0,w,w),h.setRenderTarget(r),p&&h.render(x,l),h.render(e,l)}h.toneMapping=f,h.autoClear=d,e.background=R}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===ei||e.mapping===Ri;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ol());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;xi(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Xi)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),d=c*1.25,f=h*d,{_lodMax:m}=this,x=this._sizeLods[i],g=3*x*(i>m-wi?i-m+wi:0),p=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,xi(s,g,p,3*x,2*x),r.setRenderTarget(s),r.render(o,Xi),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-i,xi(e,g,p,3*x,2*x),r.setRenderTarget(e),r.render(o,Xi)}_blur(e,t,i,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,t,i,r,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;const u=this._sizeLods[r],h=3*u*(r>this._lodMax-wi?r-this._lodMax+wi:0),d=4*(this._cubeSize-u);xi(t,h,d,3*u,2*u),a.setRenderTarget(t),a.render(l,Xi)}}function zm(n){const e=[],t=[];let i=n;const r=n-wi+1+Lm;for(let s=0;s<r;s++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],h=6,d=6,f=3,m=new Float32Array(f*d*h),x=new Float32Array(f*d*h);for(let p=0;p<h;p++){const R=p%3*2/3-1,C=p>2?0:-1,S=[R,C,0,R+2/3,C,0,R+2/3,C+1,0,R,C,0,R+2/3,C+1,0,R,C+1,0];m.set(S,f*d*p);for(let w=0;w<d;w++){const E=u[w*2]*2-1,P=u[w*2+1]*2-1;p===0?Yn.set(1,P,E):p===1?Yn.set(-E,1,-P):p===2?Yn.set(-E,P,1):p===3?Yn.set(-1,P,-E):p===4?Yn.set(-E,-1,P):Yn.set(E,P,-1),Yn.toArray(x,(p*d+w)*f)}}const g=new Ot;g.setAttribute("position",new Tn(m,f)),g.setAttribute("outputDirection",new Tn(x,f)),t.push(new rn(g,null)),i>wi&&i--}return{lodMeshes:t,sizeLods:e}}function Fl(n,e,t){const i=new nn(n,e,t);return i.texture.mapping=_s,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function xi(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Um(n,e,t){return new gn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Im,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ms(),fragmentShader:`

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
		`,blending:En,depthTest:!1,depthWrite:!1})}function Fm(n,e,t){return new gn({name:"SphericalGaussianBlur",defines:{SAMPLES:Dm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ms(),fragmentShader:`

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
		`,blending:En,depthTest:!1,depthWrite:!1})}function Ol(){return new gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ms(),fragmentShader:`

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
		`,blending:En,depthTest:!1,depthWrite:!1})}function Bl(){return new gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ms(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function Ms(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class ru extends nn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Vc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ni(5,5,5),s=new gn({name:"CubemapFromEquirect",uniforms:Pi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ft,blending:En});s.uniforms.tEquirect.value=t;const a=new rn(r,s),o=t.minFilter;return t.minFilter===Kn&&(t.minFilter=Dt),new Vd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function Om(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,f=!1){return d==null?null:f?a(d):s(d)}function s(d){if(d&&d.isTexture){const f=d.mapping;if(f===Ts||f===Rs)if(e.has(d)){const m=e.get(d).texture;return o(m,d.mapping)}else{const m=d.image;if(m&&m.height>0){const x=new ru(m.height);return x.fromEquirectangularTexture(n,d),e.set(d,x),d.addEventListener("dispose",c),o(x.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const f=d.mapping,m=f===Ts||f===Rs,x=f===ei||f===Ri;if(m||x){let g=t.get(d);const p=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return i===null&&(i=new Ul(n)),g=m?i.fromEquirectangular(d,g):i.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{const R=d.image;return m&&R&&R.height>0||x&&R&&l(R)?(i===null&&(i=new Ul(n)),g=m?i.fromEquirectangular(d):i.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",u),g.texture):null}}}return d}function o(d,f){return f===Ts?d.mapping=ei:f===Rs&&(d.mapping=Ri),d}function l(d){let f=0;const m=6;for(let x=0;x<m;x++)d[x]!==void 0&&f++;return f===m}function c(d){const f=d.target;f.removeEventListener("dispose",c);const m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function u(d){const f=d.target;f.removeEventListener("dispose",u);const m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function Bm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Ai("WebGLRenderer: "+i+" extension not supported."),r}}}function Vm(n,e,t,i){const r={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete r[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)e.update(d[f],n.ARRAY_BUFFER)}function c(h){const d=[],f=h.index,m=h.attributes.position;let x=0;if(m===void 0)return;if(f!==null){const R=f.array;x=f.version;for(let C=0,S=R.length;C<S;C+=3){const w=R[C+0],E=R[C+1],P=R[C+2];d.push(w,E,E,P,P,w)}}else{const R=m.array;x=m.version;for(let C=0,S=R.length/3-1;C<S;C+=3){const w=C+0,E=C+1,P=C+2;d.push(w,E,E,P,P,w)}}const g=new(m.count>=65535?Oc:Fc)(d,1);g.version=x;const p=s.get(h);p&&e.remove(p),s.set(h,g)}function u(h){const d=s.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Hm(n,e,t){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,d){n.drawElements(i,d,s,h*a),t.update(d,i,1)}function c(h,d,f){f!==0&&(n.drawElementsInstanced(i,d,s,h*a,f),t.update(d,i,f))}function u(h,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,h,0,f);let x=0;for(let g=0;g<f;g++)x+=d[g];t.update(x,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Gm(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:je("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Wm(n,e,t){const i=new WeakMap,r=new gt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=i.get(o);if(d===void 0||d.count!==h){let k=function(){_.dispose(),i.delete(o),o.removeEventListener("dispose",k)};var f=k;d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],R=o.morphAttributes.normal||[],C=o.morphAttributes.color||[];let S=0;m===!0&&(S=1),x===!0&&(S=2),g===!0&&(S=3);let w=o.attributes.position.count*S,E=1;w>e.maxTextureSize&&(E=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const P=new Float32Array(w*E*4*h),_=new zc(P,w,E,h);_.type=hn,_.needsUpdate=!0;const T=S*4;for(let I=0;I<h;I++){const B=p[I],q=R[I],F=C[I],H=w*E*4*I;for(let M=0;M<B.count;M++){const y=M*T;m===!0&&(r.fromBufferAttribute(B,M),P[H+y+0]=r.x,P[H+y+1]=r.y,P[H+y+2]=r.z,P[H+y+3]=0),x===!0&&(r.fromBufferAttribute(q,M),P[H+y+4]=r.x,P[H+y+5]=r.y,P[H+y+6]=r.z,P[H+y+7]=0),g===!0&&(r.fromBufferAttribute(F,M),P[H+y+8]=r.x,P[H+y+9]=r.y,P[H+y+10]=r.z,P[H+y+11]=F.itemSize===4?r.w:1)}}d={count:h,texture:_,size:new de(w,E)},i.set(o,d),o.addEventListener("dispose",k)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const x=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function Xm(n,e,t,i,r){let s=new WeakMap;function a(c){const u=r.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==u&&(f.update(),s.set(f,u))}return d}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const qm={[bc]:"LINEAR_TONE_MAPPING",[Sc]:"REINHARD_TONE_MAPPING",[Mc]:"CINEON_TONE_MAPPING",[yc]:"ACES_FILMIC_TONE_MAPPING",[Ec]:"AGX_TONE_MAPPING",[Ac]:"NEUTRAL_TONE_MAPPING",[wc]:"CUSTOM_TONE_MAPPING"};function Ym(n,e,t,i,r,s){const a=new nn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new Ot;c.setAttribute("position",new Ct([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ct([0,2,0,0,2,0],2));const u=new Id({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new rn(c,u),d=new Ss(-1,1,1,-1,0,1);let f=null,m=null,x=!1,g,p=null,R=[],C=!1;this.setSize=function(S,w){a.setSize(S,w),o!==null&&o.setSize(S,w),l!==null&&l.setSize(S,w);for(let E=0;E<R.length;E++){const P=R[E];P.setSize&&P.setSize(S,w)}},this.setEffects=function(S){R=S,C=R.length>0&&R[0].isRenderPass===!0;const w=a.width,E=a.height;R.length>0&&o===null&&(o=new nn(w,E,{type:mn,depthBuffer:!1,stencilBuffer:!1}),l=new nn(w,E,{type:mn,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<R.length;P++){const _=R[P];_.setSize&&_.setSize(w,E)}},this.begin=function(S,w){if(x||S.toneMapping===fn&&R.length===0)return!1;if(p=w,w!==null){const E=w.width,P=w.height;(a.width!==E||a.height!==P)&&this.setSize(E,P)}return C===!1&&S.setRenderTarget(a),g=S.toneMapping,S.toneMapping=fn,!0},this.hasRenderPass=function(){return C},this.end=function(S,w){S.toneMapping=g,x=!0;let E=a,P=o;for(let _=0;_<R.length;_++){const T=R[_];T.enabled!==!1&&(T.render(S,P,E,w),T.needsSwap!==!1&&(E=P,P=P===o?l:o))}if(f!==S.outputColorSpace||m!==S.toneMapping){f=S.outputColorSpace,m=S.toneMapping,u.defines={},Qe.getTransfer(f)===lt&&(u.defines.SRGB_TRANSFER="");const _=qm[m];_&&(u.defines[_]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=E.texture,S.setRenderTarget(p),S.render(h,d),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const su=new zt,uo=new ar(1,1),au=new zc,ou=new Ph,lu=new Vc,Vl=[],Hl=[],Gl=new Float32Array(16),Wl=new Float32Array(9),Xl=new Float32Array(4);function Ui(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Vl[r];if(s===void 0&&(s=new Float32Array(r),Vl[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function yt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function wt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ys(n,e){let t=Hl[e];t===void 0&&(t=new Int32Array(e),Hl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function $m(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Zm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2fv(this.addr,e),wt(t,e)}}function Km(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(yt(t,e))return;n.uniform3fv(this.addr,e),wt(t,e)}}function Jm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4fv(this.addr,e),wt(t,e)}}function Qm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),wt(t,e)}else{if(yt(t,i))return;Xl.set(i),n.uniformMatrix2fv(this.addr,!1,Xl),wt(t,i)}}function jm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),wt(t,e)}else{if(yt(t,i))return;Wl.set(i),n.uniformMatrix3fv(this.addr,!1,Wl),wt(t,i)}}function eg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),wt(t,e)}else{if(yt(t,i))return;Gl.set(i),n.uniformMatrix4fv(this.addr,!1,Gl),wt(t,i)}}function tg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function ng(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2iv(this.addr,e),wt(t,e)}}function ig(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;n.uniform3iv(this.addr,e),wt(t,e)}}function rg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4iv(this.addr,e),wt(t,e)}}function sg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function ag(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2uiv(this.addr,e),wt(t,e)}}function og(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;n.uniform3uiv(this.addr,e),wt(t,e)}}function lg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4uiv(this.addr,e),wt(t,e)}}function cg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(uo.compareFunction=t.isReversedDepthBuffer()?Ao:Eo,s=uo):s=su,t.setTexture2D(e||s,r)}function ug(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||ou,r)}function hg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||lu,r)}function dg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||au,r)}function fg(n){switch(n){case 5126:return $m;case 35664:return Zm;case 35665:return Km;case 35666:return Jm;case 35674:return Qm;case 35675:return jm;case 35676:return eg;case 5124:case 35670:return tg;case 35667:case 35671:return ng;case 35668:case 35672:return ig;case 35669:case 35673:return rg;case 5125:return sg;case 36294:return ag;case 36295:return og;case 36296:return lg;case 35678:case 36198:case 36298:case 36306:case 35682:return cg;case 35679:case 36299:case 36307:return ug;case 35680:case 36300:case 36308:case 36293:return hg;case 36289:case 36303:case 36311:case 36292:return dg}}function pg(n,e){n.uniform1fv(this.addr,e)}function mg(n,e){const t=Ui(e,this.size,2);n.uniform2fv(this.addr,t)}function gg(n,e){const t=Ui(e,this.size,3);n.uniform3fv(this.addr,t)}function vg(n,e){const t=Ui(e,this.size,4);n.uniform4fv(this.addr,t)}function _g(n,e){const t=Ui(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function xg(n,e){const t=Ui(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function bg(n,e){const t=Ui(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Sg(n,e){n.uniform1iv(this.addr,e)}function Mg(n,e){n.uniform2iv(this.addr,e)}function yg(n,e){n.uniform3iv(this.addr,e)}function wg(n,e){n.uniform4iv(this.addr,e)}function Eg(n,e){n.uniform1uiv(this.addr,e)}function Ag(n,e){n.uniform2uiv(this.addr,e)}function Tg(n,e){n.uniform3uiv(this.addr,e)}function Rg(n,e){n.uniform4uiv(this.addr,e)}function Cg(n,e,t){const i=this.cache,r=e.length,s=ys(t,r);yt(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=uo:a=su;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Pg(n,e,t){const i=this.cache,r=e.length,s=ys(t,r);yt(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||ou,s[a])}function kg(n,e,t){const i=this.cache,r=e.length,s=ys(t,r);yt(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||lu,s[a])}function Lg(n,e,t){const i=this.cache,r=e.length,s=ys(t,r);yt(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||au,s[a])}function Dg(n){switch(n){case 5126:return pg;case 35664:return mg;case 35665:return gg;case 35666:return vg;case 35674:return _g;case 35675:return xg;case 35676:return bg;case 5124:case 35670:return Sg;case 35667:case 35671:return Mg;case 35668:case 35672:return yg;case 35669:case 35673:return wg;case 5125:return Eg;case 36294:return Ag;case 36295:return Tg;case 36296:return Rg;case 35678:case 36198:case 36298:case 36306:case 35682:return Cg;case 35679:case 36299:case 36307:return Pg;case 35680:case 36300:case 36308:case 36293:return kg;case 36289:case 36303:case 36311:case 36292:return Lg}}class Ig{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=fg(t.type)}}class Ng{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Dg(t.type)}}class zg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const la=/(\w+)(\])?(\[|\.)?/g;function ql(n,e){n.seq.push(e),n.map[e.id]=e}function Ug(n,e,t){const i=n.name,r=i.length;for(la.lastIndex=0;;){const s=la.exec(i),a=la.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){ql(t,c===void 0?new Ig(o,n,e):new Ng(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new zg(o),ql(t,h)),t=h}}}class Jr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Ug(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Yl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Fg=37297;let Og=0;function Bg(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const $l=new He;function Vg(n){Qe._getMatrix($l,Qe.workingColorSpace,n);const e=`mat3( ${$l.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(n)){case ls:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Zl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Bg(n.getShaderSource(e),o)}else return s}function Hg(n,e){const t=Vg(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Gg={[bc]:"Linear",[Sc]:"Reinhard",[Mc]:"Cineon",[yc]:"ACESFilmic",[Ec]:"AgX",[Ac]:"Neutral",[wc]:"Custom"};function Wg(n,e){const t=Gg[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Wr=new D;function Xg(){Qe.getLuminanceCoefficients(Wr);const n=Wr.x.toFixed(4),e=Wr.y.toFixed(4),t=Wr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zi).join(`
`)}function Yg(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function $g(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Zi(n){return n!==""}function Kl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Jl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Zg=/^[ \t]*#include +<([\w\d./]+)>/gm;function ho(n){return n.replace(Zg,Jg)}const Kg=new Map;function Jg(n,e){let t=Xe[e];if(t===void 0){const i=Kg.get(e);if(i!==void 0)t=Xe[i],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return ho(t)}const Qg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ql(n){return n.replace(Qg,jg)}function jg(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function jl(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const e0={[Xr]:"SHADOWMAP_TYPE_PCF",[Yi]:"SHADOWMAP_TYPE_VSM"};function t0(n){return e0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const n0={[ei]:"ENVMAP_TYPE_CUBE",[Ri]:"ENVMAP_TYPE_CUBE",[_s]:"ENVMAP_TYPE_CUBE_UV"};function i0(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":n0[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const r0={[Ri]:"ENVMAP_MODE_REFRACTION"};function s0(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":r0[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const a0={[_o]:"ENVMAP_BLENDING_MULTIPLY",[oh]:"ENVMAP_BLENDING_MIX",[lh]:"ENVMAP_BLENDING_ADD"};function o0(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":a0[n.combine]||"ENVMAP_BLENDING_NONE"}function l0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function c0(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=t0(t),c=i0(t),u=s0(t),h=o0(t),d=l0(t),f=qg(t),m=Yg(s),x=r.createProgram();let g,p,R=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Zi).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Zi).join(`
`),p.length>0&&(p+=`
`)):(g=[jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zi).join(`
`),p=[jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==fn?"#define TONE_MAPPING":"",t.toneMapping!==fn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==fn?Wg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,Hg("linearToOutputTexel",t.outputColorSpace),Xg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zi).join(`
`)),a=ho(a),a=Kl(a,t),a=Jl(a,t),o=ho(o),o=Kl(o,t),o=Jl(o,t),a=Ql(a),o=Ql(o),t.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===jo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===jo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const C=R+g+a,S=R+p+o,w=Yl(r,r.VERTEX_SHADER,C),E=Yl(r,r.FRAGMENT_SHADER,S);r.attachShader(x,w),r.attachShader(x,E),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function P(I){if(n.debug.checkShaderErrors){const B=r.getProgramInfoLog(x)||"",q=r.getShaderInfoLog(w)||"",F=r.getShaderInfoLog(E)||"",H=B.trim(),M=q.trim(),y=F.trim();let G=!0,O=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(G=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,w,E);else{const $=Zl(r,w,"vertex"),K=Zl(r,E,"fragment");je("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+H+`
`+$+`
`+K)}else H!==""?Fe("WebGLProgram: Program Info Log:",H):(M===""||y==="")&&(O=!1);O&&(I.diagnostics={runnable:G,programLog:H,vertexShader:{log:M,prefix:g},fragmentShader:{log:y,prefix:p}})}r.deleteShader(w),r.deleteShader(E),_=new Jr(r,x),T=$g(r,x)}let _;this.getUniforms=function(){return _===void 0&&P(this),_};let T;this.getAttributes=function(){return T===void 0&&P(this),T};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=r.getProgramParameter(x,Fg)),k},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Og++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=E,this}let u0=0;class h0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new d0(e),t.set(e,i)),i}}class d0{constructor(e){this.id=u0++,this.code=e,this.usedTimes=0}}function f0(n){return n===ti||n===ss||n===as}function p0(n,e,t,i,r,s){const a=new Ro,o=new h0,l=new Set,c=[],u=new Map,h=i.logarithmicDepthBuffer;let d=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return l.add(_),_===0?"uv":`uv${_}`}function x(_,T,k,I,B,q){const F=I.fog,H=B.geometry,M=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?I.environment:null,y=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,G=e.get(_.envMap||M,y),O=G&&G.mapping===_s?G.image.height:null,$=f[_.type];_.precision!==null&&(d=i.getMaxPrecision(_.precision),d!==_.precision&&Fe("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));const K=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ye=K!==void 0?K.length:0;let he=0;H.morphAttributes.position!==void 0&&(he=1),H.morphAttributes.normal!==void 0&&(he=2),H.morphAttributes.color!==void 0&&(he=3);let nt,$e,et,j;if($){const dt=un[$];nt=dt.vertexShader,$e=dt.fragmentShader}else{nt=_.vertexShader,$e=_.fragmentShader;const dt=o.getVertexShaderStage(_),st=o.getFragmentShaderStage(_);o.update(_,dt,st),et=dt.id,j=st.id}const ne=n.getRenderTarget(),xe=n.state.buffers.depth.getReversed(),Ue=B.isInstancedMesh===!0,we=B.isBatchedMesh===!0,Oe=!!_.map,ot=!!_.matcap,ie=!!G,se=!!_.aoMap,ae=!!_.lightMap,oe=!!_.bumpMap&&_.wireframe===!1,ue=!!_.normalMap,Ne=!!_.displacementMap,Ie=!!_.emissiveMap,Be=!!_.metalnessMap,Ve=!!_.roughnessMap,L=_.anisotropy>0,rt=_.clearcoat>0,Ze=_.dispersion>0,A=_.retroreflectivity>0,v=_.iridescence>0,V=_.sheen>0,Y=_.transmission>0,J=L&&!!_.anisotropyMap,le=rt&&!!_.clearcoatMap,ce=rt&&!!_.clearcoatNormalMap,Q=rt&&!!_.clearcoatRoughnessMap,te=v&&!!_.iridescenceMap,fe=v&&!!_.iridescenceThicknessMap,ke=V&&!!_.sheenColorMap,ve=V&&!!_.sheenRoughnessMap,pe=!!_.specularMap,Le=!!_.specularColorMap,ze=!!_.specularIntensityMap,Ge=Y&&!!_.transmissionMap,U=Y&&!!_.thicknessMap,me=!!_.gradientMap,ee=!!_.alphaMap,ge=_.alphaTest>0,Me=!!_.alphaHash,re=!!_.extensions;let De=fn;_.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(De=n.toneMapping);const Ce={shaderID:$,shaderType:_.type,shaderName:_.name,vertexShader:nt,fragmentShader:$e,defines:_.defines,customVertexShaderID:et,customFragmentShaderID:j,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:we,batchingColor:we&&B._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&B.instanceColor!==null,instancingMorph:Ue&&B.morphTexture!==null,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Qe.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Oe,matcap:ot,envMap:ie,envMapMode:ie&&G.mapping,envMapCubeUVHeight:O,aoMap:se,lightMap:ae,bumpMap:oe,normalMap:ue,displacementMap:Ne,emissiveMap:Ie,normalMapObjectSpace:ue&&_.normalMapType===hh,normalMapTangentSpace:ue&&_.normalMapType===io,packedNormalMap:ue&&_.normalMapType===io&&f0(_.normalMap.format),metalnessMap:Be,roughnessMap:Ve,anisotropy:L,anisotropyMap:J,clearcoat:rt,clearcoatMap:le,clearcoatNormalMap:ce,clearcoatRoughnessMap:Q,dispersion:Ze,retroreflection:A,iridescence:v,iridescenceMap:te,iridescenceThicknessMap:fe,sheen:V,sheenColorMap:ke,sheenRoughnessMap:ve,specularMap:pe,specularColorMap:Le,specularIntensityMap:ze,transmission:Y,transmissionMap:Ge,thicknessMap:U,gradientMap:me,opaque:_.transparent===!1&&_.blending===Ji&&_.alphaToCoverage===!1,alphaMap:ee,alphaTest:ge,alphaHash:Me,combine:_.combine,mapUv:Oe&&m(_.map.channel),aoMapUv:se&&m(_.aoMap.channel),lightMapUv:ae&&m(_.lightMap.channel),bumpMapUv:oe&&m(_.bumpMap.channel),normalMapUv:ue&&m(_.normalMap.channel),displacementMapUv:Ne&&m(_.displacementMap.channel),emissiveMapUv:Ie&&m(_.emissiveMap.channel),metalnessMapUv:Be&&m(_.metalnessMap.channel),roughnessMapUv:Ve&&m(_.roughnessMap.channel),anisotropyMapUv:J&&m(_.anisotropyMap.channel),clearcoatMapUv:le&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:ce&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:ve&&m(_.sheenRoughnessMap.channel),specularMapUv:pe&&m(_.specularMap.channel),specularColorMapUv:Le&&m(_.specularColorMap.channel),specularIntensityMapUv:ze&&m(_.specularIntensityMap.channel),transmissionMapUv:Ge&&m(_.transmissionMap.channel),thicknessMapUv:U&&m(_.thicknessMap.channel),alphaMapUv:ee&&m(_.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(ue||L),vertexNormals:!!H.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!H.attributes.uv&&(Oe||ee),fog:!!F,useFog:_.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||H.attributes.normal===void 0&&ue===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:xe,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:he,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:q.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&k.length>0,shadowMapType:n.shadowMap.type,toneMapping:De,decodeVideoTexture:Oe&&_.map.isVideoTexture===!0&&Qe.getTransfer(_.map.colorSpace)===lt,decodeVideoTextureEmissive:Ie&&_.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(_.emissiveMap.colorSpace)===lt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===en,flipSided:_.side===Ft,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:re&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&_.extensions.multiDraw===!0||we)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ce.vertexUv1s=l.has(1),Ce.vertexUv2s=l.has(2),Ce.vertexUv3s=l.has(3),l.clear(),Ce}function g(_){const T=[];if(_.shaderID?T.push(_.shaderID):(T.push(_.customVertexShaderID),T.push(_.customFragmentShaderID)),_.defines!==void 0)for(const k in _.defines)T.push(k),T.push(_.defines[k]);return _.isRawShaderMaterial===!1&&(p(T,_),R(T,_),T.push(n.outputColorSpace)),T.push(_.customProgramCacheKey),T.join()}function p(_,T){_.push(T.precision),_.push(T.outputColorSpace),_.push(T.envMapMode),_.push(T.envMapCubeUVHeight),_.push(T.mapUv),_.push(T.alphaMapUv),_.push(T.lightMapUv),_.push(T.aoMapUv),_.push(T.bumpMapUv),_.push(T.normalMapUv),_.push(T.displacementMapUv),_.push(T.emissiveMapUv),_.push(T.metalnessMapUv),_.push(T.roughnessMapUv),_.push(T.anisotropyMapUv),_.push(T.clearcoatMapUv),_.push(T.clearcoatNormalMapUv),_.push(T.clearcoatRoughnessMapUv),_.push(T.iridescenceMapUv),_.push(T.iridescenceThicknessMapUv),_.push(T.sheenColorMapUv),_.push(T.sheenRoughnessMapUv),_.push(T.specularMapUv),_.push(T.specularColorMapUv),_.push(T.specularIntensityMapUv),_.push(T.transmissionMapUv),_.push(T.thicknessMapUv),_.push(T.combine),_.push(T.fogExp2),_.push(T.sizeAttenuation),_.push(T.morphTargetsCount),_.push(T.morphAttributeCount),_.push(T.numSunLights),_.push(T.numDirLights),_.push(T.numPointLights),_.push(T.numSpotLights),_.push(T.numSpotLightMaps),_.push(T.numHemiLights),_.push(T.numRectAreaLights),_.push(T.numSunLightShadows),_.push(T.numDirLightShadows),_.push(T.numPointLightShadows),_.push(T.numSpotLightShadows),_.push(T.numSpotLightShadowsWithMaps),_.push(T.numLightProbes),_.push(T.shadowMapType),_.push(T.toneMapping),_.push(T.numClippingPlanes),_.push(T.numClipIntersection),_.push(T.depthPacking)}function R(_,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function C(_){const T=f[_.type];let k;if(T){const I=un[T];k=kd.clone(I.uniforms)}else k=_.uniforms;return k}function S(_,T){let k=u.get(T);return k!==void 0?++k.usedTimes:(k=new c0(n,T,_,r),c.push(k),u.set(T,k)),k}function w(_){if(--_.usedTimes===0){const T=c.indexOf(_);c[T]=c[c.length-1],c.pop(),u.delete(_.cacheKey),_.destroy()}}function E(_){o.remove(_)}function P(){o.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:C,acquireProgram:S,releaseProgram:w,releaseShaderCache:E,programs:c,dispose:P}}function m0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function g0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function ec(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function tc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,m,x,g,p){let R=n[e];return R===void 0?(R={id:d.id,object:d,geometry:f,material:m,materialVariant:a(d),groupOrder:x,renderOrder:d.renderOrder,z:g,group:p},n[e]=R):(R.id=d.id,R.object=d,R.geometry=f,R.material=m,R.materialVariant=a(d),R.groupOrder=x,R.renderOrder=d.renderOrder,R.z=g,R.group=p),e++,R}function l(d,f,m,x,g,p,R){R.reversedDepth===!0&&(g=-g);const C=o(d,f,m,x,g,p);m.transmission>0?i.push(C):m.transparent===!0?r.push(C):t.push(C)}function c(d,f,m,x,g,p){const R=o(d,f,m,x,g,p);m.transmission>0?i.unshift(R):m.transparent===!0?r.unshift(R):t.unshift(R)}function u(d,f){t.length>1&&t.sort(d||g0),i.length>1&&i.sort(f||ec),r.length>1&&r.sort(f||ec)}function h(){for(let d=e,f=n.length;d<f;d++){const m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:h,sort:u}}function v0(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new tc,n.set(i,[a])):r>=s.length?(a=new tc,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function _0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new D,color:new Ye};break;case"SpotLight":t={position:new D,direction:new D,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new D,halfWidth:new D,halfHeight:new D};break}return n[e.id]=t,t}}}function x0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let b0=0;function S0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function M0(n){const e=new _0,t=x0(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new D);const r=new D,s=new pt,a=new pt;function o(c){let u=0,h=0,d=0;for(let B=0;B<9;B++)i.probe[B].set(0,0,0);let f=0,m=0,x=0,g=0,p=0,R=0,C=0,S=0,w=0,E=0,P=0,_=0,T=0,k=0;c.sort(S0);for(let B=0,q=c.length;B<q;B++){const F=c[B],H=F.color,M=F.intensity,y=F.distance;let G=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===ti?G=F.shadow.map.texture:G=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)u+=H.r*M,h+=H.g*M,d+=H.b*M;else if(F.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(F.sh.coefficients[O],M);k++}else if(F.isSunLight){const O=e.get(F);if(O.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const $=F.shadow,K=t.get(F);K.shadowIntensity=$.intensity,K.shadowBias=$.bias,K.shadowNormalBias=$.normalBias,K.shadowRadius=$.radius,K.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),i.sunShadow[m]=K,i.sunShadowMap[m]=G;const ye=$.getViewportCount();for(let he=0;he<ye;he++)i.sunShadowMatrix[x+he]=$.getMatrix(he),i.sunShadowCascade[x+he]=$._cascadeData[he];x+=ye,m++}i.sun[f]=O,f++}else if(F.isDirectionalLight){const O=e.get(F);if(O.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const $=F.shadow,K=t.get(F);K.shadowIntensity=$.intensity,K.shadowBias=$.bias,K.shadowNormalBias=$.normalBias,K.shadowRadius=$.radius,K.shadowMapSize=$.mapSize,i.directionalShadow[g]=K,i.directionalShadowMap[g]=G,i.directionalShadowMatrix[g]=F.shadow.matrix,w++}i.directional[g]=O,g++}else if(F.isSpotLight){const O=e.get(F);O.position.setFromMatrixPosition(F.matrixWorld),O.color.copy(H).multiplyScalar(M),O.distance=y,O.coneCos=Math.cos(F.angle),O.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),O.decay=F.decay,i.spot[R]=O;const $=F.shadow;if(F.map&&(i.spotLightMap[_]=F.map,_++,$.updateMatrices(F),F.castShadow&&T++),i.spotLightMatrix[R]=$.matrix,F.castShadow){const K=t.get(F);K.shadowIntensity=$.intensity,K.shadowBias=$.bias,K.shadowNormalBias=$.normalBias,K.shadowRadius=$.radius,K.shadowMapSize=$.mapSize,i.spotShadow[R]=K,i.spotShadowMap[R]=G,P++}R++}else if(F.isRectAreaLight){const O=e.get(F);O.color.copy(H).multiplyScalar(M),O.halfWidth.set(F.width*.5,0,0),O.halfHeight.set(0,F.height*.5,0),i.rectArea[C]=O,C++}else if(F.isPointLight){const O=e.get(F);if(O.color.copy(F.color).multiplyScalar(F.intensity),O.distance=F.distance,O.decay=F.decay,F.castShadow){const $=F.shadow,K=t.get(F);K.shadowIntensity=$.intensity,K.shadowBias=$.bias,K.shadowNormalBias=$.normalBias,K.shadowRadius=$.radius,K.shadowMapSize=$.mapSize,K.shadowCameraNear=$.camera.near,K.shadowCameraFar=$.camera.far,i.pointShadow[p]=K,i.pointShadowMap[p]=G,i.pointShadowMatrix[p]=F.shadow.matrix,E++}i.point[p]=O,p++}else if(F.isHemisphereLight){const O=e.get(F);O.skyColor.copy(F.color).multiplyScalar(M),O.groundColor.copy(F.groundColor).multiplyScalar(M),i.hemi[S]=O,S++}}C>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_e.LTC_FLOAT_1,i.rectAreaLTC2=_e.LTC_FLOAT_2):(i.rectAreaLTC1=_e.LTC_HALF_1,i.rectAreaLTC2=_e.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=d;const I=i.hash;(I.sunLength!==f||I.directionalLength!==g||I.pointLength!==p||I.spotLength!==R||I.rectAreaLength!==C||I.hemiLength!==S||I.numSunShadows!==m||I.numDirectionalShadows!==w||I.numPointShadows!==E||I.numSpotShadows!==P||I.numSpotMaps!==_||I.numLightProbes!==k)&&(i.sun.length=f,i.directional.length=g,i.spot.length=R,i.rectArea.length=C,i.point.length=p,i.hemi.length=S,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=E,i.pointShadowMap.length=E,i.pointShadowMatrix.length=E,i.spotShadow.length=P,i.spotShadowMap.length=P,i.spotLightMatrix.length=P+_-T,i.spotLightMap.length=_,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=k,I.sunLength=f,I.directionalLength=g,I.pointLength=p,I.spotLength=R,I.rectAreaLength=C,I.hemiLength=S,I.numSunShadows=m,I.numDirectionalShadows=w,I.numPointShadows=E,I.numSpotShadows=P,I.numSpotMaps=_,I.numLightProbes=k,i.version=b0++)}function l(c,u){let h=0,d=0,f=0,m=0,x=0,g=0;const p=u.matrixWorldInverse;for(let R=0,C=c.length;R<C;R++){const S=c[R];if(S.isSunLight){const w=i.sun[h];w.direction.setFromMatrixPosition(S.matrixWorld),w.direction.transformDirection(p),h++}else if(S.isDirectionalLight){const w=i.directional[d];w.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(p),d++}else if(S.isSpotLight){const w=i.spot[m];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(p),w.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(p),m++}else if(S.isRectAreaLight){const w=i.rectArea[x];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(p),a.identity(),s.copy(S.matrixWorld),s.premultiply(p),a.extractRotation(s),w.halfWidth.set(S.width*.5,0,0),w.halfHeight.set(0,S.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),x++}else if(S.isPointLight){const w=i.point[f];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(p),f++}else if(S.isHemisphereLight){const w=i.hemi[g];w.direction.setFromMatrixPosition(S.matrixWorld),w.direction.transformDirection(p),g++}}}return{setup:o,setupView:l,state:i}}function nc(n){const e=new M0(n),t=[],i=[],r=[];function s(d){h.camera=d,t.length=0,i.length=0,r.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function l(d){r.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function y0(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new nc(n),e.set(r,[o])):s>=a.length?(o=new nc(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const w0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,E0=`uniform sampler2D shadow_pass;
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
}`,A0=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],T0=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],ic=new pt,qi=new D,ca=new D;function R0(n,e,t){let i=new ko;const r=new de,s=new de,a=new gt,o=new zd,l=new Ud,c={},u=t.maxTextureSize,h={[Bn]:Ft,[Ft]:Bn,[en]:en},d=new gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:w0,fragmentShader:E0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new Ot;m.setAttribute("position",new Tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new rn(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xr;let p=this.type;this.render=function(E,P,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;this.type===Hu&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Xr);const T=n.getRenderTarget(),k=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),B=n.state;B.setBlending(En),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const q=p!==this.type;q&&P.traverse(function(F){F.material&&(Array.isArray(F.material)?F.material.forEach(H=>H.needsUpdate=!0):F.material.needsUpdate=!0)});for(let F=0,H=E.length;F<H;F++){const M=E[F],y=M.shadow;if(y===void 0){Fe("WebGLShadowMap:",M,"has no shadow.");continue}if(y.autoUpdate===!1&&y.needsUpdate===!1)continue;r.copy(y.mapSize);const G=y.getFrameExtents();r.multiply(G),s.copy(y.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/G.x),r.x=s.x*G.x,y.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/G.y),r.y=s.y*G.y,y.mapSize.y=s.y));const O=n.state.buffers.depth.getReversed();if(y.camera._reversedDepth=O,y.map===null||q===!0){if(y.map!==null&&(y.map.depthTexture!==null&&(y.map.depthTexture.dispose(),y.map.depthTexture=null),y.map.dispose()),this.type===Yi){if(M.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}y.map=new nn(r.x,r.y,{format:ti,type:mn,minFilter:Dt,magFilter:Dt,generateMipmaps:!1}),y.map.texture.name=M.name+".shadowMap",y.map.depthTexture=new ar(r.x,r.y,hn),y.map.depthTexture.name=M.name+".shadowMapDepth",y.map.depthTexture.format=Rn,y.map.depthTexture.compareFunction=null,y.map.depthTexture.minFilter=Tt,y.map.depthTexture.magFilter=Tt}else M.isPointLight?(y.map=new ru(r.x),y.map.depthTexture=new Zh(r.x,pn)):(y.map=new nn(r.x,r.y),y.map.depthTexture=new ar(r.x,r.y,pn)),y.map.depthTexture.name=M.name+".shadowMap",y.map.depthTexture.format=Rn,this.type===Xr?(y.map.depthTexture.compareFunction=O?Ao:Eo,y.map.depthTexture.minFilter=Dt,y.map.depthTexture.magFilter=Dt):(y.map.depthTexture.compareFunction=null,y.map.depthTexture.minFilter=Tt,y.map.depthTexture.magFilter=Tt);y.camera.updateProjectionMatrix()}y.map.isWebGLCubeRenderTarget!==!0&&(y.map.width!==r.x||y.map.height!==r.y)&&y.map.setSize(r.x,r.y);const $=y.map.isWebGLCubeRenderTarget?6:y.getViewportCount();M.isPointLight!==!0&&y.updateMatrices(M,_);for(let K=0;K<$;K++){const ye=y.getCamera(K);if(M.isPointLight){const he=y.camera,nt=y.matrix,$e=M.distance||he.far;$e!==he.far&&(he.far=$e,he.updateProjectionMatrix()),qi.setFromMatrixPosition(M.matrixWorld),he.position.copy(qi),ca.copy(he.position),ca.add(A0[K]),he.up.copy(T0[K]),he.lookAt(ca),he.updateMatrixWorld(),nt.makeTranslation(-qi.x,-qi.y,-qi.z),ic.multiplyMatrices(he.projectionMatrix,he.matrixWorldInverse),y._frustum.setFromProjectionMatrix(ic,he.coordinateSystem,he.reversedDepth)}if(y.map.isWebGLCubeRenderTarget)n.setRenderTarget(y.map,K),n.clear();else{K===0&&(n.setRenderTarget(y.map),n.clear());const he=y.getViewport(K);a.set(s.x*he.x,s.y*he.y,s.x*he.z,s.y*he.w),B.viewport(a)}i=y.getFrustum(K),S(P,_,ye,M,this.type)}y.isPointLightShadow!==!0&&this.type===Yi&&R(y,_),y.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(T,k,I)};function R(E,P){const _=e.update(x);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null?E.mapPass=new nn(r.x,r.y,{format:ti,type:mn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(P,null,_,d,x,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(P,null,_,f,x,null)}function C(E,P,_,T){let k=null;const I=_.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)k=I;else if(k=_.isPointLight===!0?l:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const B=k.uuid,q=P.uuid;let F=c[B];F===void 0&&(F={},c[B]=F);let H=F[q];H===void 0&&(H=k.clone(),F[q]=H,P.addEventListener("dispose",w)),k=H}if(k.visible=P.visible,k.wireframe=P.wireframe,T===Yi?k.side=P.shadowSide!==null?P.shadowSide:P.side:k.side=P.shadowSide!==null?P.shadowSide:h[P.side],k.alphaMap=P.alphaMap,k.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,k.map=P.map,k.clipShadows=P.clipShadows,k.clippingPlanes=P.clippingPlanes,k.clipIntersection=P.clipIntersection,k.displacementMap=P.displacementMap,k.displacementScale=P.displacementScale,k.displacementBias=P.displacementBias,k.wireframeLinewidth=P.wireframeLinewidth,k.linewidth=P.linewidth,_.isPointLight===!0&&k.isMeshDistanceMaterial===!0){const B=n.properties.get(k);B.light=_}return k}function S(E,P,_,T,k){if(E.visible===!1)return;if(E.layers.test(P.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&k===Yi)&&(!E.frustumCulled||E.intersectsFrustum(i))){E.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,E.matrixWorld);const q=e.update(E),F=E.material;if(Array.isArray(F)){const H=q.groups;for(let M=0,y=H.length;M<y;M++){const G=H[M],O=F[G.materialIndex];if(O&&O.visible){const $=C(E,O,T,k);E.onBeforeShadow(n,E,P,_,q,$,G),n.renderBufferDirect(_,null,q,$,E,G),E.onAfterShadow(n,E,P,_,q,$,G)}}}else if(F.visible){const H=C(E,F,T,k);E.onBeforeShadow(n,E,P,_,q,H,null),n.renderBufferDirect(_,null,q,H,E,null),E.onAfterShadow(n,E,P,_,q,H,null)}}const B=E.children;for(let q=0,F=B.length;q<F;q++)S(B[q],P,_,T,k)}function w(E){E.target.removeEventListener("dispose",w);for(const _ in c){const T=c[_],k=E.target.uuid;k in T&&(T[k].dispose(),delete T[k])}}}function C0(n,e){function t(){let U=!1;const me=new gt;let ee=null;const ge=new gt(0,0,0,0);return{setMask:function(Me){ee!==Me&&!U&&(n.colorMask(Me,Me,Me,Me),ee=Me)},setLocked:function(Me){U=Me},setClear:function(Me,re,De,Ce,dt){dt===!0&&(Me*=Ce,re*=Ce,De*=Ce),me.set(Me,re,De,Ce),ge.equals(me)===!1&&(n.clearColor(Me,re,De,Ce),ge.copy(me))},reset:function(){U=!1,ee=null,ge.set(-1,0,0,0)}}}function i(){let U=!1,me=!1,ee=null,ge=null,Me=null;return{setReversed:function(re){if(me!==re){const De=e.get("EXT_clip_control");re?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),me=re;const Ce=Me;Me=null,this.setClear(Ce)}},getReversed:function(){return me},setTest:function(re){re?ne(n.DEPTH_TEST):xe(n.DEPTH_TEST)},setMask:function(re){ee!==re&&!U&&(n.depthMask(re),ee=re)},setFunc:function(re){if(me&&(re=yh[re]),ge!==re){switch(re){case _a:n.depthFunc(n.NEVER);break;case xa:n.depthFunc(n.ALWAYS);break;case ba:n.depthFunc(n.LESS);break;case nr:n.depthFunc(n.LEQUAL);break;case Sa:n.depthFunc(n.EQUAL);break;case Ma:n.depthFunc(n.GEQUAL);break;case ya:n.depthFunc(n.GREATER);break;case wa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ge=re}},setLocked:function(re){U=re},setClear:function(re){Me!==re&&(Me=re,me&&(re=1-re),n.clearDepth(re))},reset:function(){U=!1,ee=null,ge=null,Me=null,me=!1}}}function r(){let U=!1,me=null,ee=null,ge=null,Me=null,re=null,De=null,Ce=null,dt=null;return{setTest:function(st){U||(st?ne(n.STENCIL_TEST):xe(n.STENCIL_TEST))},setMask:function(st){me!==st&&!U&&(n.stencilMask(st),me=st)},setFunc:function(st,Kt,sn){(ee!==st||ge!==Kt||Me!==sn)&&(n.stencilFunc(st,Kt,sn),ee=st,ge=Kt,Me=sn)},setOp:function(st,Kt,sn){(re!==st||De!==Kt||Ce!==sn)&&(n.stencilOp(st,Kt,sn),re=st,De=Kt,Ce=sn)},setLocked:function(st){U=st},setClear:function(st){dt!==st&&(n.clearStencil(st),dt=st)},reset:function(){U=!1,me=null,ee=null,ge=null,Me=null,re=null,De=null,Ce=null,dt=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},h={},d={},f=new WeakMap,m=[],x=null,g=!1,p=null,R=null,C=null,S=null,w=null,E=null,P=null,_=new Ye(0,0,0),T=0,k=!1,I=null,B=null,q=null,F=null,H=null;const M=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let y=!1,G=0;const O=n.getParameter(n.VERSION);O.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(O)[1]),y=G>=1):O.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),y=G>=2);let $=null,K={};const ye=n.getParameter(n.SCISSOR_BOX),he=n.getParameter(n.VIEWPORT),nt=new gt().fromArray(ye),$e=new gt().fromArray(he);function et(U,me,ee,ge){const Me=new Uint8Array(4),re=n.createTexture();n.bindTexture(U,re),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let De=0;De<ee;De++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(me,0,n.RGBA,1,1,ge,0,n.RGBA,n.UNSIGNED_BYTE,Me):n.texImage2D(me+De,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Me);return re}const j={};j[n.TEXTURE_2D]=et(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=et(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=et(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=et(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(n.DEPTH_TEST),a.setFunc(nr),oe(!1),ue(Zo),ne(n.CULL_FACE),se(En);function ne(U){u[U]!==!0&&(n.enable(U),u[U]=!0)}function xe(U){u[U]!==!1&&(n.disable(U),u[U]=!1)}function Ue(U,me){return d[U]!==me?(n.bindFramebuffer(U,me),d[U]=me,U===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=me),U===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=me),!0):!1}function we(U,me){let ee=m,ge=!1;if(U){ee=f.get(me),ee===void 0&&(ee=[],f.set(me,ee));const Me=U.textures;if(ee.length!==Me.length||ee[0]!==n.COLOR_ATTACHMENT0){for(let re=0,De=Me.length;re<De;re++)ee[re]=n.COLOR_ATTACHMENT0+re;ee.length=Me.length,ge=!0}}else ee[0]!==n.BACK&&(ee[0]=n.BACK,ge=!0);ge&&n.drawBuffers(ee)}function Oe(U){return x!==U?(n.useProgram(U),x=U,!0):!1}const ot={[Si]:n.FUNC_ADD,[Wu]:n.FUNC_SUBTRACT,[Xu]:n.FUNC_REVERSE_SUBTRACT};ot[qu]=n.MIN,ot[Yu]=n.MAX;const ie={[$u]:n.ZERO,[Zu]:n.ONE,[Ku]:n.SRC_COLOR,[_c]:n.SRC_ALPHA,[nh]:n.SRC_ALPHA_SATURATE,[eh]:n.DST_COLOR,[Qu]:n.DST_ALPHA,[Ju]:n.ONE_MINUS_SRC_COLOR,[xc]:n.ONE_MINUS_SRC_ALPHA,[th]:n.ONE_MINUS_DST_COLOR,[ju]:n.ONE_MINUS_DST_ALPHA,[ih]:n.CONSTANT_COLOR,[rh]:n.ONE_MINUS_CONSTANT_COLOR,[sh]:n.CONSTANT_ALPHA,[ah]:n.ONE_MINUS_CONSTANT_ALPHA};function se(U,me,ee,ge,Me,re,De,Ce,dt,st){if(U===En){g===!0&&(xe(n.BLEND),g=!1);return}if(g===!1&&(ne(n.BLEND),g=!0),U!==Gu){if(U!==p||st!==k){if((R!==Si||w!==Si)&&(n.blendEquation(n.FUNC_ADD),R=Si,w=Si),st)switch(U){case Ji:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ko:n.blendFunc(n.ONE,n.ONE);break;case Jo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Qo:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:je("WebGLState: Invalid blending: ",U);break}else switch(U){case Ji:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ko:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Jo:je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Qo:je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:je("WebGLState: Invalid blending: ",U);break}C=null,S=null,E=null,P=null,_.set(0,0,0),T=0,p=U,k=st}return}Me=Me||me,re=re||ee,De=De||ge,(me!==R||Me!==w)&&(n.blendEquationSeparate(ot[me],ot[Me]),R=me,w=Me),(ee!==C||ge!==S||re!==E||De!==P)&&(n.blendFuncSeparate(ie[ee],ie[ge],ie[re],ie[De]),C=ee,S=ge,E=re,P=De),(Ce.equals(_)===!1||dt!==T)&&(n.blendColor(Ce.r,Ce.g,Ce.b,dt),_.copy(Ce),T=dt),p=U,k=!1}function ae(U,me){U.side===en?xe(n.CULL_FACE):ne(n.CULL_FACE);let ee=U.side===Ft;me&&(ee=!ee),oe(ee),U.blending===Ji&&U.transparent===!1?se(En):se(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),s.setMask(U.colorWrite);const ge=U.stencilWrite;o.setTest(ge),ge&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ie(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):xe(n.SAMPLE_ALPHA_TO_COVERAGE)}function oe(U){I!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),I=U)}function ue(U){U!==Bu?(ne(n.CULL_FACE),U!==B&&(U===Zo?n.cullFace(n.BACK):U===Vu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):xe(n.CULL_FACE),B=U}function Ne(U){U!==q&&(y&&n.lineWidth(U),q=U)}function Ie(U,me,ee){U?(ne(n.POLYGON_OFFSET_FILL),(F!==me||H!==ee)&&(F=me,H=ee,a.getReversed()&&(me=-me),n.polygonOffset(me,ee))):xe(n.POLYGON_OFFSET_FILL)}function Be(U){U?ne(n.SCISSOR_TEST):xe(n.SCISSOR_TEST)}function Ve(U){U===void 0&&(U=n.TEXTURE0+M-1),$!==U&&(n.activeTexture(U),$=U)}function L(U,me,ee){ee===void 0&&($===null?ee=n.TEXTURE0+M-1:ee=$);let ge=K[ee];ge===void 0&&(ge={type:void 0,texture:void 0},K[ee]=ge),(ge.type!==U||ge.texture!==me)&&($!==ee&&(n.activeTexture(ee),$=ee),n.bindTexture(U,me||j[U]),ge.type=U,ge.texture=me)}function rt(){const U=K[$];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Ze(){try{n.compressedTexImage2D(...arguments)}catch(U){je("WebGLState:",U)}}function A(){try{n.compressedTexImage3D(...arguments)}catch(U){je("WebGLState:",U)}}function v(){try{n.texSubImage2D(...arguments)}catch(U){je("WebGLState:",U)}}function V(){try{n.texSubImage3D(...arguments)}catch(U){je("WebGLState:",U)}}function Y(){try{n.compressedTexSubImage2D(...arguments)}catch(U){je("WebGLState:",U)}}function J(){try{n.compressedTexSubImage3D(...arguments)}catch(U){je("WebGLState:",U)}}function le(){try{n.texStorage2D(...arguments)}catch(U){je("WebGLState:",U)}}function ce(){try{n.texStorage3D(...arguments)}catch(U){je("WebGLState:",U)}}function Q(){try{n.texImage2D(...arguments)}catch(U){je("WebGLState:",U)}}function te(){try{n.texImage3D(...arguments)}catch(U){je("WebGLState:",U)}}function fe(U){return h[U]!==void 0?h[U]:n.getParameter(U)}function ke(U,me){h[U]!==me&&(n.pixelStorei(U,me),h[U]=me)}function ve(U){nt.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),nt.copy(U))}function pe(U){$e.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),$e.copy(U))}function Le(U,me){let ee=c.get(me);ee===void 0&&(ee=new WeakMap,c.set(me,ee));let ge=ee.get(U);ge===void 0&&(ge=n.getUniformBlockIndex(me,U.name),ee.set(U,ge))}function ze(U,me){const ge=c.get(me).get(U);l.get(me)!==ge&&(n.uniformBlockBinding(me,ge,U.__bindingPointIndex),l.set(me,ge))}function Ge(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},h={},$=null,K={},d={},f=new WeakMap,m=[],x=null,g=!1,p=null,R=null,C=null,S=null,w=null,E=null,P=null,_=new Ye(0,0,0),T=0,k=!1,I=null,B=null,q=null,F=null,H=null,nt.set(0,0,n.canvas.width,n.canvas.height),$e.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ne,disable:xe,bindFramebuffer:Ue,drawBuffers:we,useProgram:Oe,setBlending:se,setMaterial:ae,setFlipSided:oe,setCullFace:ue,setLineWidth:Ne,setPolygonOffset:Ie,setScissorTest:Be,activeTexture:Ve,bindTexture:L,unbindTexture:rt,compressedTexImage2D:Ze,compressedTexImage3D:A,texImage2D:Q,texImage3D:te,pixelStorei:ke,getParameter:fe,updateUBOMapping:Le,uniformBlockBinding:ze,texStorage2D:le,texStorage3D:ce,texSubImage2D:v,texSubImage3D:V,compressedTexSubImage2D:Y,compressedTexSubImage3D:J,scissor:ve,viewport:pe,reset:Ge}}function P0(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new de,u=new WeakMap,h=new Set;let d;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,v){return m?new OffscreenCanvas(A,v):cs("canvas")}function g(A,v,V){let Y=1;const J=Ze(A);if((J.width>V||J.height>V)&&(Y=V/Math.max(J.width,J.height)),Y<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const le=Math.floor(Y*J.width),ce=Math.floor(Y*J.height);d===void 0&&(d=x(le,ce));const Q=v?x(le,ce):d;return Q.width=le,Q.height=ce,Q.getContext("2d").drawImage(A,0,0,le,ce),Fe("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+le+"x"+ce+")."),Q}else return"data"in A&&Fe("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),A;return A}function p(A){return A.generateMipmaps}function R(A){n.generateMipmap(A)}function C(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(A,v,V,Y,J,le=!1){if(A!==null){if(n[A]!==void 0)return n[A];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ce;Y&&(ce=e.get("EXT_texture_norm16"),ce||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=v;if(v===n.RED&&(V===n.FLOAT&&(Q=n.R32F),V===n.HALF_FLOAT&&(Q=n.R16F),V===n.UNSIGNED_BYTE&&(Q=n.R8),V===n.UNSIGNED_SHORT&&ce&&(Q=ce.R16_EXT),V===n.SHORT&&ce&&(Q=ce.R16_SNORM_EXT)),v===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.R8UI),V===n.UNSIGNED_SHORT&&(Q=n.R16UI),V===n.UNSIGNED_INT&&(Q=n.R32UI),V===n.BYTE&&(Q=n.R8I),V===n.SHORT&&(Q=n.R16I),V===n.INT&&(Q=n.R32I)),v===n.RG&&(V===n.FLOAT&&(Q=n.RG32F),V===n.HALF_FLOAT&&(Q=n.RG16F),V===n.UNSIGNED_BYTE&&(Q=n.RG8),V===n.UNSIGNED_SHORT&&ce&&(Q=ce.RG16_EXT),V===n.SHORT&&ce&&(Q=ce.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.RG8UI),V===n.UNSIGNED_SHORT&&(Q=n.RG16UI),V===n.UNSIGNED_INT&&(Q=n.RG32UI),V===n.BYTE&&(Q=n.RG8I),V===n.SHORT&&(Q=n.RG16I),V===n.INT&&(Q=n.RG32I)),v===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),V===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),V===n.UNSIGNED_INT&&(Q=n.RGB32UI),V===n.BYTE&&(Q=n.RGB8I),V===n.SHORT&&(Q=n.RGB16I),V===n.INT&&(Q=n.RGB32I)),v===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),V===n.UNSIGNED_INT&&(Q=n.RGBA32UI),V===n.BYTE&&(Q=n.RGBA8I),V===n.SHORT&&(Q=n.RGBA16I),V===n.INT&&(Q=n.RGBA32I)),v===n.RGB&&(V===n.UNSIGNED_SHORT&&ce&&(Q=ce.RGB16_EXT),V===n.SHORT&&ce&&(Q=ce.RGB16_SNORM_EXT),V===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),V===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),v===n.RGBA){const te=le?ls:Qe.getTransfer(J);V===n.FLOAT&&(Q=n.RGBA32F),V===n.HALF_FLOAT&&(Q=n.RGBA16F),V===n.UNSIGNED_BYTE&&(Q=te===lt?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT&&ce&&(Q=ce.RGBA16_EXT),V===n.SHORT&&ce&&(Q=ce.RGBA16_SNORM_EXT),V===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function w(A,v){let V;return A?v===null||v===pn||v===rr?V=n.DEPTH24_STENCIL8:v===hn?V=n.DEPTH32F_STENCIL8:v===ir&&(V=n.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===pn||v===rr?V=n.DEPTH_COMPONENT24:v===hn?V=n.DEPTH_COMPONENT32F:v===ir&&(V=n.DEPTH_COMPONENT16),V}function E(A,v){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Tt&&A.minFilter!==Dt?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function P(A){const v=A.target;v.removeEventListener("dispose",P),T(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&h.delete(v)}function _(A){const v=A.target;v.removeEventListener("dispose",_),I(v)}function T(A){const v=i.get(A);if(v.__webglInit===void 0)return;const V=A.source,Y=f.get(V);if(Y){const J=Y[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&k(A),Object.keys(Y).length===0&&f.delete(V)}i.remove(A)}function k(A){const v=i.get(A);n.deleteTexture(v.__webglTexture);const V=A.source,Y=f.get(V);delete Y[v.__cacheKey],a.memory.textures--}function I(A){const v=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(v.__webglFramebuffer[Y]))for(let J=0;J<v.__webglFramebuffer[Y].length;J++)n.deleteFramebuffer(v.__webglFramebuffer[Y][J]);else n.deleteFramebuffer(v.__webglFramebuffer[Y]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[Y])}else{if(Array.isArray(v.__webglFramebuffer))for(let Y=0;Y<v.__webglFramebuffer.length;Y++)n.deleteFramebuffer(v.__webglFramebuffer[Y]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Y=0;Y<v.__webglColorRenderbuffer.length;Y++)v.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[Y]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const V=A.textures;for(let Y=0,J=V.length;Y<J;Y++){const le=i.get(V[Y]);le.__webglTexture&&(n.deleteTexture(le.__webglTexture),a.memory.textures--),i.remove(V[Y])}i.remove(A)}let B=0;function q(){B=0}function F(){return B}function H(A){B=A}function M(){const A=B;return A>=r.maxTextures&&Fe("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+r.maxTextures),B+=1,A}function y(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function G(A,v){const V=i.get(A);if(A.isVideoTexture&&L(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&V.__version!==A.version){const Y=A.image;if(Y===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{xe(V,A,v);return}}else A.isExternalTexture&&(V.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+v)}function O(A,v){const V=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){xe(V,A,v);return}else A.isExternalTexture&&(V.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+v)}function $(A,v){const V=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){xe(V,A,v);return}t.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+v)}function K(A,v){const V=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&V.__version!==A.version){Ue(V,A,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+v)}const ye={[Ea]:n.REPEAT,[wn]:n.CLAMP_TO_EDGE,[Aa]:n.MIRRORED_REPEAT},he={[Tt]:n.NEAREST,[ch]:n.NEAREST_MIPMAP_NEAREST,[gr]:n.NEAREST_MIPMAP_LINEAR,[Dt]:n.LINEAR,[Cs]:n.LINEAR_MIPMAP_NEAREST,[Kn]:n.LINEAR_MIPMAP_LINEAR},nt={[fh]:n.NEVER,[_h]:n.ALWAYS,[ph]:n.LESS,[Eo]:n.LEQUAL,[mh]:n.EQUAL,[Ao]:n.GEQUAL,[gh]:n.GREATER,[vh]:n.NOTEQUAL};function $e(A,v){if(v.type===hn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Dt||v.magFilter===Cs||v.magFilter===gr||v.magFilter===Kn||v.minFilter===Dt||v.minFilter===Cs||v.minFilter===gr||v.minFilter===Kn)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,ye[v.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,ye[v.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,ye[v.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,he[v.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,he[v.minFilter]),v.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,nt[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Tt||v.minFilter!==gr&&v.minFilter!==Kn||v.type===hn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function et(A,v){let V=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",P));const Y=v.source;let J=f.get(Y);J===void 0&&(J={},f.set(Y,J));const le=y(v);if(le!==A.__cacheKey){J[le]===void 0&&(J[le]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,V=!0),J[le].usedTimes++;const ce=J[A.__cacheKey];ce!==void 0&&(J[A.__cacheKey].usedTimes--,ce.usedTimes===0&&k(v)),A.__cacheKey=le,A.__webglTexture=J[le].texture}return V}function j(A,v,V){return Math.floor(Math.floor(A/V)/v)}function ne(A,v,V,Y){const le=A.updateRanges;if(le.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,V,Y,v.data);else{le.sort((ke,ve)=>ke.start-ve.start);let ce=0;for(let ke=1;ke<le.length;ke++){const ve=le[ce],pe=le[ke],Le=ve.start+ve.count,ze=j(pe.start,v.width,4),Ge=j(ve.start,v.width,4);pe.start<=Le+1&&ze===Ge&&j(pe.start+pe.count-1,v.width,4)===ze?ve.count=Math.max(ve.count,pe.start+pe.count-ve.start):(++ce,le[ce]=pe)}le.length=ce+1;const Q=t.getParameter(n.UNPACK_ROW_LENGTH),te=t.getParameter(n.UNPACK_SKIP_PIXELS),fe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let ke=0,ve=le.length;ke<ve;ke++){const pe=le[ke],Le=Math.floor(pe.start/4),ze=Math.ceil(pe.count/4),Ge=Le%v.width,U=Math.floor(Le/v.width),me=ze,ee=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ge),t.pixelStorei(n.UNPACK_SKIP_ROWS,U),t.texSubImage2D(n.TEXTURE_2D,0,Ge,U,me,ee,V,Y,v.data)}A.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Q),t.pixelStorei(n.UNPACK_SKIP_PIXELS,te),t.pixelStorei(n.UNPACK_SKIP_ROWS,fe)}}function xe(A,v,V){let Y=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Y=n.TEXTURE_3D);const J=et(A,v),le=v.source;t.bindTexture(Y,A.__webglTexture,n.TEXTURE0+V);const ce=i.get(le);if(le.version!==ce.__version||J===!0){if(t.activeTexture(n.TEXTURE0+V),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const ee=Qe.getPrimaries(Qe.workingColorSpace),ge=v.colorSpace===Un?null:Qe.getPrimaries(v.colorSpace),Me=v.colorSpace===Un||ee===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let te=g(v.image,!1,r.maxTextureSize);te=rt(v,te);const fe=s.convert(v.format,v.colorSpace),ke=s.convert(v.type);let ve=S(v.internalFormat,fe,ke,v.normalized,v.colorSpace,v.isVideoTexture);$e(Y,v);let pe;const Le=v.mipmaps,ze=v.isVideoTexture!==!0,Ge=ce.__version===void 0||J===!0,U=le.dataReady,me=E(v,te);if(v.isDepthTexture)ve=w(v.format===Jn,v.type),Ge&&(ze?t.texStorage2D(n.TEXTURE_2D,1,ve,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,ve,te.width,te.height,0,fe,ke,null));else if(v.isDataTexture)if(Le.length>0){ze&&Ge&&t.texStorage2D(n.TEXTURE_2D,me,ve,Le[0].width,Le[0].height);for(let ee=0,ge=Le.length;ee<ge;ee++)pe=Le[ee],ze?U&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,pe.width,pe.height,fe,ke,pe.data):t.texImage2D(n.TEXTURE_2D,ee,ve,pe.width,pe.height,0,fe,ke,pe.data);v.generateMipmaps=!1}else ze?(Ge&&t.texStorage2D(n.TEXTURE_2D,me,ve,te.width,te.height),U&&ne(v,te,fe,ke)):t.texImage2D(n.TEXTURE_2D,0,ve,te.width,te.height,0,fe,ke,te.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){ze&&Ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,ve,Le[0].width,Le[0].height,te.depth);for(let ee=0,ge=Le.length;ee<ge;ee++)if(pe=Le[ee],v.format!==tn)if(fe!==null)if(ze){if(U)if(v.layerUpdates.size>0){const Me=Nl(pe.width,pe.height,v.format,v.type);for(const re of v.layerUpdates){const De=pe.data.subarray(re*Me/pe.data.BYTES_PER_ELEMENT,(re+1)*Me/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,re,pe.width,pe.height,1,fe,De)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,pe.width,pe.height,te.depth,fe,pe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,ve,pe.width,pe.height,te.depth,0,pe.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ze?U&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,pe.width,pe.height,te.depth,fe,ke,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,ve,pe.width,pe.height,te.depth,0,fe,ke,pe.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{ze&&Ge&&t.texStorage2D(n.TEXTURE_2D,me,ve,Le[0].width,Le[0].height);for(let ee=0,ge=Le.length;ee<ge;ee++)pe=Le[ee],v.format!==tn?fe!==null?ze?U&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,pe.width,pe.height,fe,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,ve,pe.width,pe.height,0,pe.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?U&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,pe.width,pe.height,fe,ke,pe.data):t.texImage2D(n.TEXTURE_2D,ee,ve,pe.width,pe.height,0,fe,ke,pe.data)}else if(v.isDataArrayTexture)if(ze){if(Ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,ve,te.width,te.height,te.depth),U)if(v.layerUpdates.size>0){const ee=Nl(te.width,te.height,v.format,v.type);for(const ge of v.layerUpdates){const Me=te.data.subarray(ge*ee/te.data.BYTES_PER_ELEMENT,(ge+1)*ee/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ge,te.width,te.height,1,fe,ke,Me)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,fe,ke,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ve,te.width,te.height,te.depth,0,fe,ke,te.data);else if(v.isData3DTexture)ze?(Ge&&t.texStorage3D(n.TEXTURE_3D,me,ve,te.width,te.height,te.depth),U&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,fe,ke,te.data)):t.texImage3D(n.TEXTURE_3D,0,ve,te.width,te.height,te.depth,0,fe,ke,te.data);else if(v.isFramebufferTexture){if(Ge)if(ze)t.texStorage2D(n.TEXTURE_2D,me,ve,te.width,te.height);else{let ee=te.width,ge=te.height;for(let Me=0;Me<me;Me++)t.texImage2D(n.TEXTURE_2D,Me,ve,ee,ge,0,fe,ke,null),ee>>=1,ge>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const ee=n.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),te.parentNode!==ee){ee.appendChild(te),h.add(v),ee.onpaint=ge=>{const Me=ge.changedElements;for(const re of h)Me.includes(re.image)&&(re.needsUpdate=!0)},ee.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,te);else{const Me=n.RGBA,re=n.RGBA,De=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Me,re,De,te)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Le.length>0){if(ze&&Ge){const ee=Ze(Le[0]);t.texStorage2D(n.TEXTURE_2D,me,ve,ee.width,ee.height)}for(let ee=0,ge=Le.length;ee<ge;ee++)pe=Le[ee],ze?U&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,fe,ke,pe):t.texImage2D(n.TEXTURE_2D,ee,ve,fe,ke,pe);v.generateMipmaps=!1}else if(ze){if(Ge){const ee=Ze(te);t.texStorage2D(n.TEXTURE_2D,me,ve,ee.width,ee.height)}U&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe,ke,te)}else t.texImage2D(n.TEXTURE_2D,0,ve,fe,ke,te);p(v)&&R(Y),ce.__version=le.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function Ue(A,v,V){if(v.image.length!==6)return;const Y=et(A,v),J=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+V);const le=i.get(J);if(J.version!==le.__version||Y===!0){t.activeTexture(n.TEXTURE0+V);const ce=Qe.getPrimaries(Qe.workingColorSpace),Q=v.colorSpace===Un?null:Qe.getPrimaries(v.colorSpace),te=v.colorSpace===Un||ce===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const fe=v.isCompressedTexture||v.image[0].isCompressedTexture,ke=v.image[0]&&v.image[0].isDataTexture,ve=[];for(let re=0;re<6;re++)!fe&&!ke?ve[re]=g(v.image[re],!0,r.maxCubemapSize):ve[re]=ke?v.image[re].image:v.image[re],ve[re]=rt(v,ve[re]);const pe=ve[0],Le=s.convert(v.format,v.colorSpace),ze=s.convert(v.type),Ge=S(v.internalFormat,Le,ze,v.normalized,v.colorSpace),U=v.isVideoTexture!==!0,me=le.__version===void 0||Y===!0,ee=J.dataReady;let ge=E(v,pe);$e(n.TEXTURE_CUBE_MAP,v);let Me;if(fe){U&&me&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,Ge,pe.width,pe.height);for(let re=0;re<6;re++){Me=ve[re].mipmaps;for(let De=0;De<Me.length;De++){const Ce=Me[De];v.format!==tn?Le!==null?U?ee&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De,0,0,Ce.width,Ce.height,Le,Ce.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De,Ge,Ce.width,Ce.height,0,Ce.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De,0,0,Ce.width,Ce.height,Le,ze,Ce.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De,Ge,Ce.width,Ce.height,0,Le,ze,Ce.data)}}}else{if(Me=v.mipmaps,U&&me){Me.length>0&&ge++;const re=Ze(ve[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,Ge,re.width,re.height)}for(let re=0;re<6;re++)if(ke){U?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,ve[re].width,ve[re].height,Le,ze,ve[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ge,ve[re].width,ve[re].height,0,Le,ze,ve[re].data);for(let De=0;De<Me.length;De++){const dt=Me[De].image[re].image;U?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De+1,0,0,dt.width,dt.height,Le,ze,dt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De+1,Ge,dt.width,dt.height,0,Le,ze,dt.data)}}else{U?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Le,ze,ve[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ge,Le,ze,ve[re]);for(let De=0;De<Me.length;De++){const Ce=Me[De];U?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De+1,0,0,Le,ze,Ce.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De+1,Ge,Le,ze,Ce.image[re])}}}p(v)&&R(n.TEXTURE_CUBE_MAP),le.__version=J.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function we(A,v,V,Y,J,le){const ce=s.convert(V.format,V.colorSpace),Q=s.convert(V.type),te=S(V.internalFormat,ce,Q,V.normalized,V.colorSpace),fe=i.get(v),ke=i.get(V);if(ke.__renderTarget=v,!fe.__hasExternalTextures){const ve=Math.max(1,v.width>>le),pe=Math.max(1,v.height>>le);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,le,te,ve,pe,v.depth,0,ce,Q,null):t.texImage2D(J,le,te,ve,pe,0,ce,Q,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),Ve(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,J,ke.__webglTexture,0,Be(v)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,J,ke.__webglTexture,le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Oe(A,v,V){if(n.bindRenderbuffer(n.RENDERBUFFER,A),v.depthBuffer){const Y=v.depthTexture,J=Y&&Y.isDepthTexture?Y.type:null,le=w(v.stencilBuffer,J),ce=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ve(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Be(v),le,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,Be(v),le,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,le,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ce,n.RENDERBUFFER,A)}else{const Y=v.textures;for(let J=0;J<Y.length;J++){const le=Y[J],ce=s.convert(le.format,le.colorSpace),Q=s.convert(le.type),te=S(le.internalFormat,ce,Q,le.normalized,le.colorSpace);Ve(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Be(v),te,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,Be(v),te,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,te,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ot(A,v,V){const Y=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const J=i.get(v.depthTexture);if(J.__renderTarget=v,(!J.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Y){if(J.__webglInit===void 0&&(J.__webglInit=!0,v.depthTexture.addEventListener("dispose",P)),J.__webglTexture===void 0){J.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),$e(n.TEXTURE_CUBE_MAP,v.depthTexture);const fe=s.convert(v.depthTexture.format),ke=s.convert(v.depthTexture.type);let ve;v.depthTexture.format===Rn?ve=n.DEPTH_COMPONENT24:v.depthTexture.format===Jn&&(ve=n.DEPTH24_STENCIL8);for(let pe=0;pe<6;pe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,ve,v.width,v.height,0,fe,ke,null)}}else G(v.depthTexture,0);const le=J.__webglTexture,ce=Be(v),Q=Y?n.TEXTURE_CUBE_MAP_POSITIVE_X+V:n.TEXTURE_2D,te=v.depthTexture.format===Jn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===Rn)Ve(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,Q,le,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,te,Q,le,0);else if(v.depthTexture.format===Jn)Ve(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,Q,le,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,te,Q,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ie(A){const v=i.get(A),V=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const Y=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Y){const J=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Y.removeEventListener("dispose",J)};Y.addEventListener("dispose",J),v.__depthDisposeCallback=J}v.__boundDepthTexture=Y}if(A.depthTexture&&!v.__autoAllocateDepthBuffer)if(V)for(let Y=0;Y<6;Y++)ot(v.__webglFramebuffer[Y],A,Y);else{const Y=A.texture.mipmaps;Y&&Y.length>0?ot(v.__webglFramebuffer[0],A,0):ot(v.__webglFramebuffer,A,0)}else if(V){v.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[Y]),v.__webglDepthbuffer[Y]===void 0)v.__webglDepthbuffer[Y]=n.createRenderbuffer(),Oe(v.__webglDepthbuffer[Y],A,!1);else{const J=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,le)}}else{const Y=A.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Oe(v.__webglDepthbuffer,A,!1);else{const J=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,le)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function se(A,v,V){const Y=i.get(A);v!==void 0&&we(Y.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&ie(A)}function ae(A){const v=A.texture,V=i.get(A),Y=i.get(v);A.addEventListener("dispose",_);const J=A.textures,le=A.isWebGLCubeRenderTarget===!0,ce=J.length>1;if(ce||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=v.version,a.memory.textures++),le){V.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer[Q]=[];for(let te=0;te<v.mipmaps.length;te++)V.__webglFramebuffer[Q][te]=n.createFramebuffer()}else V.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer=[];for(let Q=0;Q<v.mipmaps.length;Q++)V.__webglFramebuffer[Q]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(ce)for(let Q=0,te=J.length;Q<te;Q++){const fe=i.get(J[Q]);fe.__webglTexture===void 0&&(fe.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&Ve(A)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let Q=0;Q<J.length;Q++){const te=J[Q];V.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[Q]);const fe=s.convert(te.format,te.colorSpace),ke=s.convert(te.type),ve=S(te.internalFormat,fe,ke,te.normalized,te.colorSpace,A.isXRRenderTarget===!0),pe=Be(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,pe,ve,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,V.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),Oe(V.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(le){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),$e(n.TEXTURE_CUBE_MAP,v);for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)we(V.__webglFramebuffer[Q][te],A,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,te);else we(V.__webglFramebuffer[Q],A,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);p(v)&&R(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let Q=0,te=J.length;Q<te;Q++){const fe=J[Q],ke=i.get(fe);let ve=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ve=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ve,ke.__webglTexture),$e(ve,fe),we(V.__webglFramebuffer,A,fe,n.COLOR_ATTACHMENT0+Q,ve,0),p(fe)&&R(ve)}t.unbindTexture()}else{let Q=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Q=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Q,Y.__webglTexture),$e(Q,v),v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)we(V.__webglFramebuffer[te],A,v,n.COLOR_ATTACHMENT0,Q,te);else we(V.__webglFramebuffer,A,v,n.COLOR_ATTACHMENT0,Q,0);p(v)&&R(Q),t.unbindTexture()}A.depthBuffer&&ie(A)}function oe(A){const v=A.textures;for(let V=0,Y=v.length;V<Y;V++){const J=v[V];if(p(J)){const le=C(A),ce=i.get(J).__webglTexture;t.bindTexture(le,ce),R(le),t.unbindTexture()}}}const ue=[],Ne=[];function Ie(A){if(A.samples>0){if(Ve(A)===!1){const v=A.textures,V=A.width,Y=A.height;let J=n.COLOR_BUFFER_BIT;const le=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=i.get(A),Q=v.length>1;if(Q)for(let fe=0;fe<v.length;fe++)t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);const te=A.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let fe=0;fe<v.length;fe++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ce.__webglColorRenderbuffer[fe]);const ke=i.get(v[fe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ke,0)}n.blitFramebuffer(0,0,V,Y,0,0,V,Y,J,n.NEAREST),l===!0&&(ue.length=0,Ne.length=0,ue.push(n.COLOR_ATTACHMENT0+fe),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(ue.push(le),Ne.push(le),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ne)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ue))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let fe=0;fe<v.length;fe++){t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,ce.__webglColorRenderbuffer[fe]);const ke=i.get(v[fe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,ke,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){const v=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function Be(A){return Math.min(r.maxSamples,A.samples)}function Ve(A){const v=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function L(A){const v=a.render.frame;u.get(A)!==v&&(u.set(A,v),A.update())}function rt(A,v){const V=A.colorSpace,Y=A.format,J=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||V!==os&&V!==Un&&(Qe.getTransfer(V)===lt?(Y!==tn||J!==Wt)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):je("WebGLTextures: Unsupported texture color space:",V)),v}function Ze(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=M,this.resetTextureUnits=q,this.getTextureUnits=F,this.setTextureUnits=H,this.setTexture2D=G,this.setTexture2DArray=O,this.setTexture3D=$,this.setTextureCube=K,this.rebindTextures=se,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=oe,this.updateMultisampleRenderTarget=Ie,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=we,this.useMultisampledRTT=Ve,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function k0(n,e){function t(i,r=Un){let s;const a=Qe.getTransfer(r);if(i===Wt)return n.UNSIGNED_BYTE;if(i===bo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===So)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Pc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===kc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Rc)return n.BYTE;if(i===Cc)return n.SHORT;if(i===ir)return n.UNSIGNED_SHORT;if(i===xo)return n.INT;if(i===pn)return n.UNSIGNED_INT;if(i===hn)return n.FLOAT;if(i===mn)return n.HALF_FLOAT;if(i===Lc)return n.ALPHA;if(i===Dc)return n.RGB;if(i===tn)return n.RGBA;if(i===Rn)return n.DEPTH_COMPONENT;if(i===Jn)return n.DEPTH_STENCIL;if(i===Ic)return n.RED;if(i===Mo)return n.RED_INTEGER;if(i===ti)return n.RG;if(i===yo)return n.RG_INTEGER;if(i===wo)return n.RGBA_INTEGER;if(i===qr||i===Yr||i===$r||i===Zr)if(a===lt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===qr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Yr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===$r)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Zr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===qr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Yr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===$r)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Zr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ta||i===Ra||i===Ca||i===Pa)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ta)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ra)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ca)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Pa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ka||i===La||i===Da||i===Ia||i===Na||i===ss||i===za)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ka||i===La)return a===lt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Da)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ia)return s.COMPRESSED_R11_EAC;if(i===Na)return s.COMPRESSED_SIGNED_R11_EAC;if(i===ss)return s.COMPRESSED_RG11_EAC;if(i===za)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ua||i===Fa||i===Oa||i===Ba||i===Va||i===Ha||i===Ga||i===Wa||i===Xa||i===qa||i===Ya||i===$a||i===Za||i===Ka)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ua)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Fa)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Oa)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ba)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Va)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ha)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ga)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Wa)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Xa)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===qa)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ya)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===$a)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Za)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ka)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ja||i===Qa||i===ja)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ja)return a===lt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Qa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ja)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===eo||i===to||i===as||i===no)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===eo)return s.COMPRESSED_RED_RGTC1_EXT;if(i===to)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===as)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===no)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===rr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const L0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,D0=`
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

}`;class I0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Hc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new gn({vertexShader:L0,fragmentShader:D0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new rn(new bs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class N0 extends ri{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,m=null;const x=typeof XRWebGLBinding<"u",g=new I0,p={},R=t.getContextAttributes();let C=null,S=null;const w=[],E=[],P=new de;let _=null,T=null;const k=new $t;k.viewport=new gt;const I=new $t;I.viewport=new gt;const B=[k,I],q=new Hd;let F=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ne=w[j];return ne===void 0&&(ne=new Us,w[j]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(j){let ne=w[j];return ne===void 0&&(ne=new Us,w[j]=ne),ne.getGripSpace()},this.getHand=function(j){let ne=w[j];return ne===void 0&&(ne=new Us,w[j]=ne),ne.getHandSpace()};function M(j){const ne=E.indexOf(j.inputSource);if(ne===-1)return;const xe=w[ne];xe!==void 0&&(xe.update(j.inputSource,j.frame,c||a),xe.dispatchEvent({type:j.type,data:j.inputSource}))}function y(){r.removeEventListener("select",M),r.removeEventListener("selectstart",M),r.removeEventListener("selectend",M),r.removeEventListener("squeeze",M),r.removeEventListener("squeezestart",M),r.removeEventListener("squeezeend",M),r.removeEventListener("end",y),r.removeEventListener("inputsourceschange",G);for(let j=0;j<w.length;j++){const ne=E[j];ne!==null&&(E[j]=null,w[j].disconnect(ne))}F=null,H=null,g.reset();for(const j in p)delete p[j];if(e.setRenderTarget(C),f=null,d=null,h=null,r=null,S=null,et.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(P.width,P.height,!1),T!==null){const j=T.camera;j.fov=T.fov,j.zoom=T.zoom,j.updateProjectionMatrix(),T=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&x&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(C=e.getRenderTarget(),r.addEventListener("select",M),r.addEventListener("selectstart",M),r.addEventListener("selectend",M),r.addEventListener("squeeze",M),r.addEventListener("squeezestart",M),r.addEventListener("squeezeend",M),r.addEventListener("end",y),r.addEventListener("inputsourceschange",G),R.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let xe=null,Ue=null,we=null;R.depth&&(we=R.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,xe=R.stencil?Jn:Rn,Ue=R.stencil?rr:pn);const Oe={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(Oe),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new nn(d.textureWidth,d.textureHeight,{format:tn,type:Wt,depthTexture:new ar(d.textureWidth,d.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:R.stencil,colorSpace:e.outputColorSpace,samples:R.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const xe={antialias:R.antialias,alpha:!0,depth:R.depth,stencil:R.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,xe),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new nn(f.framebufferWidth,f.framebufferHeight,{format:tn,type:Wt,colorSpace:e.outputColorSpace,stencilBuffer:R.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),et.setContext(r),et.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function G(j){for(let ne=0;ne<j.removed.length;ne++){const xe=j.removed[ne],Ue=E.indexOf(xe);Ue>=0&&(E[Ue]=null,w[Ue].disconnect(xe))}for(let ne=0;ne<j.added.length;ne++){const xe=j.added[ne];let Ue=E.indexOf(xe);if(Ue===-1){for(let Oe=0;Oe<w.length;Oe++)if(Oe>=E.length){E.push(xe),Ue=Oe;break}else if(E[Oe]===null){E[Oe]=xe,Ue=Oe;break}if(Ue===-1)break}const we=w[Ue];we&&we.connect(xe)}}const O=new D,$=new D;function K(j,ne,xe){O.setFromMatrixPosition(ne.matrixWorld),$.setFromMatrixPosition(xe.matrixWorld);const Ue=O.distanceTo($),we=ne.projectionMatrix.elements,Oe=xe.projectionMatrix.elements,ot=we[14]/(we[10]-1),ie=we[14]/(we[10]+1),se=(we[9]+1)/we[5],ae=(we[9]-1)/we[5],oe=(we[8]-1)/we[0],ue=(Oe[8]+1)/Oe[0],Ne=ot*oe,Ie=ot*ue,Be=Ue/(-oe+ue),Ve=Be*-oe;if(ne.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Ve),j.translateZ(Be),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),we[10]===-1)j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const L=ot+Be,rt=ie+Be,Ze=Ne-Ve,A=Ie+(Ue-Ve),v=se*ie/rt*L,V=ae*ie/rt*L;j.projectionMatrix.makePerspective(Ze,A,v,V,L,rt),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ye(j,ne){ne===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ne.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let ne=j.near,xe=j.far;g.texture!==null&&(g.depthNear>0&&(ne=g.depthNear),g.depthFar>0&&(xe=g.depthFar)),q.near=I.near=k.near=ne,q.far=I.far=k.far=xe,(F!==q.near||H!==q.far)&&(r.updateRenderState({depthNear:q.near,depthFar:q.far}),F=q.near,H=q.far),q.layers.mask=j.layers.mask|6,k.layers.mask=q.layers.mask&-5,I.layers.mask=q.layers.mask&-3;const Ue=j.parent,we=q.cameras;ye(q,Ue);for(let Oe=0;Oe<we.length;Oe++)ye(we[Oe],Ue);we.length===2?K(q,k,I):q.projectionMatrix.copy(k.projectionMatrix),T===null&&j.isPerspectiveCamera&&(T={camera:j,fov:j.fov,zoom:j.zoom}),he(j,q,Ue)};function he(j,ne,xe){xe===null?j.matrix.copy(ne.matrixWorld):(j.matrix.copy(xe.matrixWorld),j.matrix.invert(),j.matrix.multiply(ne.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=ro*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return q},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(j){l=j,d!==null&&(d.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(q)},this.getCameraTexture=function(j){return p[j]};let nt=null;function $e(j,ne){if(u=ne.getViewerPose(c||a),m=ne,u!==null){const xe=u.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let Ue=!1;xe.length!==q.cameras.length&&(q.cameras.length=0,Ue=!0);for(let ie=0;ie<xe.length;ie++){const se=xe[ie];let ae=null;if(f!==null)ae=f.getViewport(se);else{const ue=h.getViewSubImage(d,se);ae=ue.viewport,ie===0&&(e.setRenderTargetTextures(S,ue.colorTexture,ue.depthStencilTexture),e.setRenderTarget(S))}let oe=B[ie];oe===void 0&&(oe=new $t,oe.layers.enable(ie),oe.viewport=new gt,B[ie]=oe),oe.matrix.fromArray(se.transform.matrix),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.projectionMatrix.fromArray(se.projectionMatrix),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert(),oe.viewport.set(ae.x,ae.y,ae.width,ae.height),ie===0&&(q.matrix.copy(oe.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale)),Ue===!0&&q.cameras.push(oe)}const we=r.enabledFeatures;if(we&&we.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){h=i.getBinding();const ie=h.getDepthInformation(xe[0]);ie&&ie.isValid&&ie.texture&&g.init(ie,r.renderState)}if(we&&we.includes("camera-access")&&x){e.state.unbindTexture(),h=i.getBinding();for(let ie=0;ie<xe.length;ie++){const se=xe[ie].camera;if(se){let ae=p[se];ae||(ae=new Hc,p[se]=ae);const oe=h.getCameraImage(se);ae.sourceTexture=oe}}}}for(let xe=0;xe<w.length;xe++){const Ue=E[xe],we=w[xe];Ue!==null&&we!==void 0&&we.update(Ue,ne,c||a)}nt&&nt(j,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),m=null}const et=new nu;et.setAnimationLoop($e),this.setAnimationLoop=function(j){nt=j},this.dispose=function(){}}}const z0=new pt,cu=new He;cu.set(-1,0,0,0,1,0,0,0,1);function U0(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,Qc(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,R,C,S){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(g,p):p.isMeshLambertMaterial?(s(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(g,p),h(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,S)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),x(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,R,C):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Ft&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Ft&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const R=e.get(p),C=R.envMap,S=R.envMapRotation;C&&(g.envMap.value=C,g.envMapRotation.value.setFromMatrix4(z0.makeRotationFromEuler(S)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(cu),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,R,C){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*R,g.scale.value=C*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,R){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ft&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=R.texture,g.transmissionSamplerSize.value.set(R.width,R.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){const R=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(R.matrixWorld),g.nearDistance.value=R.shadow.camera.near,g.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function F0(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,w){const E=w.program;i.uniformBlockBinding(S,E)}function c(S,w){let E=r[S.id];E===void 0&&(g(S),E=u(S),r[S.id]=E,S.addEventListener("dispose",R));const P=w.program;i.updateUBOMapping(S,P);const _=e.render.frame;s[S.id]!==_&&(d(S),s[S.id]=_)}function u(S){const w=h();S.__bindingPointIndex=w;const E=n.createBuffer(),P=S.__size,_=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,P,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,E),E}function h(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const w=r[S.id],E=S.uniforms,P=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let _=0,T=E.length;_<T;_++){const k=E[_];if(Array.isArray(k))for(let I=0,B=k.length;I<B;I++)f(k[I],_,I,P);else f(k,_,0,P)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(S,w,E,P){if(x(S,w,E,P)===!0){const _=S.__offset,T=S.value;if(Array.isArray(T)){let k=0;for(let I=0;I<T.length;I++){const B=T[I],q=p(B);m(B,S.__data,k),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(k+=q.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(T,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,S.__data)}}function m(S,w,E){typeof S=="number"||typeof S=="boolean"?w[0]=S:S.isMatrix3?(w[0]=S.elements[0],w[1]=S.elements[1],w[2]=S.elements[2],w[3]=0,w[4]=S.elements[3],w[5]=S.elements[4],w[6]=S.elements[5],w[7]=0,w[8]=S.elements[6],w[9]=S.elements[7],w[10]=S.elements[8],w[11]=0):ArrayBuffer.isView(S)?w.set(new S.constructor(S.buffer,S.byteOffset,w.length)):S.toArray(w,E)}function x(S,w,E,P){const _=S.value,T=w+"_"+E;if(P[T]===void 0)return typeof _=="number"||typeof _=="boolean"?P[T]=_:ArrayBuffer.isView(_)?P[T]=_.slice():P[T]=_.clone(),!0;{const k=P[T];if(typeof _=="number"||typeof _=="boolean"){if(k!==_)return P[T]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(k.equals(_)===!1)return k.copy(_),!0}}return!1}function g(S){const w=S.uniforms;let E=0;const P=16;for(let T=0,k=w.length;T<k;T++){const I=Array.isArray(w[T])?w[T]:[w[T]];for(let B=0,q=I.length;B<q;B++){const F=I[B],H=Array.isArray(F.value)?F.value:[F.value];for(let M=0,y=H.length;M<y;M++){const G=H[M],O=p(G),$=E%P,K=$%O.boundary,ye=$+K;E+=K,ye!==0&&P-ye<O.storage&&(E+=P-ye),F.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=E,E+=O.storage}}}const _=E%P;return _>0&&(E+=P-_),S.__size=E,S.__cache={},this}function p(S){const w={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(w.boundary=4,w.storage=4):S.isVector2?(w.boundary=8,w.storage=8):S.isVector3||S.isColor?(w.boundary=16,w.storage=12):S.isVector4?(w.boundary=16,w.storage=16):S.isMatrix3?(w.boundary=48,w.storage=48):S.isMatrix4?(w.boundary=64,w.storage=64):S.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(w.boundary=16,w.storage=S.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",S),w}function R(S){const w=S.target;w.removeEventListener("dispose",R);const E=a.indexOf(w.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function C(){for(const S in r)n.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:l,update:c,dispose:C}}const O0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ln=null;function B0(){return ln===null&&(ln=new qh(O0,16,16,ti,mn),ln.name="DFG_LUT",ln.minFilter=Dt,ln.magFilter=Dt,ln.wrapS=wn,ln.wrapT=wn,ln.generateMipmaps=!1,ln.needsUpdate=!0),ln}class V0{constructor(e={}){const{canvas:t=Sh(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Wt}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const x=f,g=new Set([wo,yo,Mo]),p=new Set([Wt,pn,ir,rr,bo,So]),R=new Uint32Array(4),C=new Int32Array(4),S=new D;let w=null,E=null;const P=[],_=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=fn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const k=this;let I=!1,B=null,q=null,F=null,H=null;this._outputColorSpace=Yt;let M=0,y=0,G=null,O=-1,$=null;const K=new gt,ye=new gt;let he=null;const nt=new Ye(0);let $e=0,et=t.width,j=t.height,ne=1,xe=null,Ue=null;const we=new gt(0,0,et,j),Oe=new gt(0,0,et,j);let ot=!1;const ie=new ko;let se=!1,ae=!1;const oe=new pt,ue=new D,Ne=new gt,Ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Be=!1;function Ve(){return G===null?ne:1}let L=i;function rt(b,N){return t.getContext(b,N)}let Ze,A,v,V,Y,J,le,ce,Q,te,fe,ke,ve,pe,Le,ze,Ge,U,me,ee,ge,Me,re;try{const b={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${vo}`),t.addEventListener("webglcontextlost",dt,!1),t.addEventListener("webglcontextrestored",st,!1),t.addEventListener("webglcontextcreationerror",Kt,!1),L===null){const N="webgl2";if(L=rt(N,b),L===null)throw rt(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}De()}catch(b){throw t.removeEventListener("webglcontextlost",dt,!1),t.removeEventListener("webglcontextrestored",st,!1),t.removeEventListener("webglcontextcreationerror",Kt,!1),je("WebGLRenderer: "+b.message),b}function De(){Ze=new Bm(L),Ze.init(),ge=new k0(L,Ze),A=new Pm(L,Ze,e,ge),v=new C0(L,Ze),A.reversedDepthBuffer&&d&&v.buffers.depth.setReversed(!0),q=L.createFramebuffer(),F=L.createFramebuffer(),H=L.createFramebuffer(),V=new Gm(L),Y=new m0,J=new P0(L,Ze,v,Y,A,ge,V),le=new Om(k),ce=new Wd(L),Me=new Rm(L,ce),Q=new Vm(L,ce,V,Me),te=new Xm(L,Q,ce,Me,V),U=new Wm(L,A,J),Le=new km(Y),fe=new p0(k,le,Ze,A,Me,Le),ke=new U0(k,Y),ve=new v0,pe=new y0(Ze),Ge=new Tm(k,le,v,te,m,l),ze=new R0(k,te,A),re=new F0(L,V,A,v),me=new Cm(L,Ze,V),ee=new Hm(L,Ze,V),V.programs=fe.programs,k.capabilities=A,k.extensions=Ze,k.properties=Y,k.renderLists=ve,k.shadowMap=ze,k.state=v,k.info=V}x!==Wt&&(T=new Ym(x,t.width,t.height,o,r,s));const Ce=new N0(k,L);this.xr=Ce,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const b=Ze.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Ze.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(b){b!==void 0&&(ne=b,this.setSize(et,j,!1))},this.getSize=function(b){return b.set(et,j)},this.setSize=function(b,N,Z=!0){if(Ce.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}et=b,j=N,t.width=Math.floor(b*ne),t.height=Math.floor(N*ne),Z===!0&&(t.style.width=b+"px",t.style.height=N+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,b,N)},this.getDrawingBufferSize=function(b){return b.set(et*ne,j*ne).floor()},this.setDrawingBufferSize=function(b,N,Z){et=b,j=N,ne=Z,t.width=Math.floor(b*Z),t.height=Math.floor(N*Z),this.setViewport(0,0,b,N)},this.setEffects=function(b){if(x===Wt){je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let N=0;N<b.length;N++)if(b[N].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(K)},this.getViewport=function(b){return b.copy(we)},this.setViewport=function(b,N,Z,W){b.isVector4?we.set(b.x,b.y,b.z,b.w):we.set(b,N,Z,W),v.viewport(K.copy(we).multiplyScalar(ne).round())},this.getScissor=function(b){return b.copy(Oe)},this.setScissor=function(b,N,Z,W){b.isVector4?Oe.set(b.x,b.y,b.z,b.w):Oe.set(b,N,Z,W),v.scissor(ye.copy(Oe).multiplyScalar(ne).round())},this.getScissorTest=function(){return ot},this.setScissorTest=function(b){v.setScissorTest(ot=b)},this.setOpaqueSort=function(b){xe=b},this.setTransparentSort=function(b){Ue=b},this.getClearColor=function(b){return b.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor(...arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha(...arguments)},this.clear=function(b=!0,N=!0,Z=!0){let W=0;if(b){let X=!1;if(G!==null){const Se=G.texture.format;X=g.has(Se)}if(X){const Se=G.texture.type,Ae=p.has(Se),be=Ge.getClearColor(),Te=Ge.getClearAlpha(),Pe=be.r,We=be.g,Ke=be.b;Ae?(R[0]=Pe,R[1]=We,R[2]=Ke,R[3]=Te,L.clearBufferuiv(L.COLOR,0,R)):(C[0]=Pe,C[1]=We,C[2]=Ke,C[3]=Te,L.clearBufferiv(L.COLOR,0,C))}else W|=L.COLOR_BUFFER_BIT}N&&(W|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(W|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&L.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),B=b},this.dispose=function(){t.removeEventListener("webglcontextlost",dt,!1),t.removeEventListener("webglcontextrestored",st,!1),t.removeEventListener("webglcontextcreationerror",Kt,!1),Ge.dispose(),ve.dispose(),pe.dispose(),Y.dispose(),le.dispose(),te.dispose(),Me.dispose(),re.dispose(),fe.dispose(),Ce.dispose(),Ce.removeEventListener("sessionstart",Bo),Ce.removeEventListener("sessionend",Vo),Hn.stop()};function dt(b){b.preventDefault(),tl("WebGLRenderer: Context Lost."),I=!0}function st(){tl("WebGLRenderer: Context Restored."),I=!1;const b=V.autoReset,N=ze.enabled,Z=ze.autoUpdate,W=ze.needsUpdate,X=ze.type;De(),V.autoReset=b,ze.enabled=N,ze.autoUpdate=Z,ze.needsUpdate=W,ze.type=X}function Kt(b){je("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function sn(b){const N=b.target;N.removeEventListener("dispose",sn),Du(N)}function Du(b){Iu(b),Y.remove(b)}function Iu(b){const N=Y.get(b).programs;N!==void 0&&(N.forEach(function(Z){fe.releaseProgram(Z)}),b.isShaderMaterial&&fe.releaseShaderCache(b))}this.renderBufferDirect=function(b,N,Z,W,X,Se){N===null&&(N=Ie);const Ae=X.isMesh&&X.matrixWorld.determinantAffine()<0,be=Uu(b,N,Z,W,X);v.setMaterial(W,Ae);let Te=Z.index,Pe=1;if(W.wireframe===!0){if(Te=Q.getWireframeAttribute(Z),Te===void 0)return;Pe=2}const We=Z.drawRange,Ke=Z.attributes.position;let Re=We.start*Pe,at=(We.start+We.count)*Pe;Se!==null&&(Re=Math.max(Re,Se.start*Pe),at=Math.min(at,(Se.start+Se.count)*Pe)),Te!==null?(Re=Math.max(Re,0),at=Math.min(at,Te.count)):Ke!=null&&(Re=Math.max(Re,0),at=Math.min(at,Ke.count));const St=at-Re;if(St<0||St===1/0)return;Me.setup(X,W,be,Z,Te);let mt,ht=me;if(Te!==null&&(mt=ce.get(Te),ht=ee,ht.setIndex(mt)),X.isMesh)W.wireframe===!0?(v.setLineWidth(W.wireframeLinewidth*Ve()),ht.setMode(L.LINES)):ht.setMode(L.TRIANGLES);else if(X.isLine){let Pt=W.linewidth;Pt===void 0&&(Pt=1),v.setLineWidth(Pt*Ve()),X.isLineSegments?ht.setMode(L.LINES):X.isLineLoop?ht.setMode(L.LINE_LOOP):ht.setMode(L.LINE_STRIP)}else X.isPoints?ht.setMode(L.POINTS):X.isSprite&&ht.setMode(L.TRIANGLES);if(X.isBatchedMesh)if(Ze.get("WEBGL_multi_draw"))ht.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Pt=X._multiDrawStarts,Ee=X._multiDrawCounts,It=X._multiDrawCount,tt=Te?ce.get(Te).bytesPerElement:1,Xt=Y.get(W).currentProgram.getUniforms();for(let an=0;an<It;an++)Xt.setValue(L,"_gl_DrawID",an),ht.render(Pt[an]/tt,Ee[an])}else if(X.isInstancedMesh)ht.renderInstances(Re,St,X.count);else if(Z.isInstancedBufferGeometry){const Pt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Ee=Math.min(Z.instanceCount,Pt);ht.renderInstances(Re,St,Ee)}else ht.render(Re,St)};function Oo(b,N,Z,W){B!==null&&b.isNodeMaterial&&B.setObject(W,b),se===!0&&Le.setState(b,Z,!1),b.transparent===!0&&b.side===en&&b.forceSinglePass===!1?(b.side=Ft,b.needsUpdate=!0,mr(b,N,W),b.side=Bn,b.needsUpdate=!0,mr(b,N,W),b.side=en):mr(b,N,W)}this.compile=function(b,N,Z=null){Z===null&&(Z=b),B!==null&&B.renderStart(b,N,Z),E=pe.get(Z),E.init(N),_.push(E),Z.traverseVisible(function(X){X.isLight&&X.layers.test(N.layers)&&(E.pushLight(X),X.castShadow&&E.pushShadow(X))}),b!==Z&&b.traverseVisible(function(X){X.isLight&&X.layers.test(N.layers)&&(E.pushLight(X),X.castShadow&&E.pushShadow(X))}),E.setupLights(),B!==null&&B.updateLights(E.state.lightsArray),ae=this.localClippingEnabled,se=Le.init(this.clippingPlanes,ae),se===!0&&Le.setGlobalState(this.clippingPlanes,N),B!==null&&ze.render(E.state.shadowsArray,Z,N);const W=new Set;return b.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const Se=X.material;if(Se)if(Array.isArray(Se))for(let Ae=0;Ae<Se.length;Ae++){const be=Se[Ae];Oo(be,Z,N,X),W.add(be)}else Oo(Se,Z,N,X),W.add(Se)}),E=_.pop(),B!==null&&B.renderEnd(),W},this.compileAsync=function(b,N,Z=null){const W=this.compile(b,N,Z);return new Promise(X=>{function Se(){if(W.forEach(function(Ae){const Te=Y.get(Ae).currentProgram;(Te===void 0||Te.isReady())&&W.delete(Ae)}),W.size===0){X(b);return}setTimeout(Se,10)}Ze.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let Es=null;function Nu(b){Es&&Es(b)}function Bo(){Hn.stop()}function Vo(){Hn.start()}const Hn=new nu;Hn.setAnimationLoop(Nu),typeof self<"u"&&Hn.setContext(self),this.setAnimationLoop=function(b){Es=b,Ce.setAnimationLoop(b),b===null?Hn.stop():Hn.start()},Ce.addEventListener("sessionstart",Bo),Ce.addEventListener("sessionend",Vo),this.render=function(b,N){if(N!==void 0&&N.isCamera!==!0){je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;B!==null&&B.renderStart(b,N);const Z=Ce.enabled===!0&&Ce.isPresenting===!0,W=T!==null&&(G===null||Z)&&T.begin(k,G);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Ce.enabled===!0&&Ce.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Ce.cameraAutoUpdate===!0&&Ce.updateCamera(N),N=Ce.getCamera()),b.isScene===!0&&b.onBeforeRender(k,b,N,G),E=pe.get(b,_.length),E.init(N),E.state.textureUnits=J.getTextureUnits(),_.push(E),oe.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),ie.setFromProjectionMatrix(oe,dn,N.reversedDepth),ae=this.localClippingEnabled,se=Le.init(this.clippingPlanes,ae),w=ve.get(b,P.length),w.init(),P.push(w),Ce.enabled===!0&&Ce.isPresenting===!0){const Ae=k.xr.getDepthSensingMesh();Ae!==null&&As(Ae,N,-1/0,k.sortObjects)}As(b,N,0,k.sortObjects),w.finish(),B!==null&&B.updateLights(E.state.lightsArray),k.sortObjects===!0&&w.sort(xe,Ue),Be=Ce.enabled===!1||Ce.isPresenting===!1||Ce.hasDepthSensing()===!1,Be&&Ge.addToRenderList(w,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),se===!0&&Le.beginShadows();const X=E.state.shadowsArray;if(ze.render(X,b,N),se===!0&&Le.endShadows(),(W&&T.hasRenderPass())===!1){const Ae=w.opaque,be=w.transmissive;if(E.setupLights(),N.isArrayCamera){const Te=N.cameras;if(be.length>0)for(let Pe=0,We=Te.length;Pe<We;Pe++){const Ke=Te[Pe];Go(Ae,be,b,Ke)}Be&&Ge.render(b);for(let Pe=0,We=Te.length;Pe<We;Pe++){const Ke=Te[Pe];Ho(w,b,Ke,Ke.viewport)}}else be.length>0&&Go(Ae,be,b,N),Be&&Ge.render(b),Ho(w,b,N)}G!==null&&y===0&&(J.updateMultisampleRenderTarget(G),J.updateRenderTargetMipmap(G)),W&&T.end(k),b.isScene===!0&&b.onAfterRender(k,b,N),Me.resetDefaultState(),O=-1,$=null,_.pop(),_.length>0?(E=_[_.length-1],J.setTextureUnits(E.state.textureUnits),se===!0&&Le.setGlobalState(k.clippingPlanes,E.state.camera)):E=null,P.pop(),P.length>0?w=P[P.length-1]:w=null,B!==null&&B.renderEnd()};function As(b,N,Z,W){if(b.visible===!1)return;if(b.layers.test(N.layers)){if(b.isGroup)Z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(N);else if(b.isLightProbeGrid)E.pushLightProbeGrid(b);else if(b.isLight)E.pushLight(b),b.castShadow&&E.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(ie)){W&&Ne.setFromMatrixPosition(b.matrixWorld).applyMatrix4(oe);const Ae=te.update(b),be=b.material;be.visible&&w.push(b,Ae,be,Z,Ne.z,null,N)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(ie))){const Ae=te.update(b),be=b.material;if(W&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ne.copy(b.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Ne.copy(Ae.boundingSphere.center)),Ne.applyMatrix4(b.matrixWorld).applyMatrix4(oe)),Array.isArray(be)){const Te=Ae.groups;for(let Pe=0,We=Te.length;Pe<We;Pe++){const Ke=Te[Pe],Re=be[Ke.materialIndex];Re&&Re.visible&&w.push(b,Ae,Re,Z,Ne.z,Ke,N)}}else be.visible&&w.push(b,Ae,be,Z,Ne.z,null,N)}}const Se=b.children;for(let Ae=0,be=Se.length;Ae<be;Ae++)As(Se[Ae],N,Z,W)}function Ho(b,N,Z,W){const{opaque:X,transmissive:Se,transparent:Ae}=b;E.setupLightsView(Z),se===!0&&Le.setGlobalState(k.clippingPlanes,Z),W&&v.viewport(K.copy(W)),X.length>0&&pr(X,N,Z),Se.length>0&&pr(Se,N,Z),Ae.length>0&&pr(Ae,N,Z),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Go(b,N,Z,W){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[W.id]===void 0){const Re=Ze.has("EXT_color_buffer_half_float")||Ze.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[W.id]=new nn(1,1,{generateMipmaps:!0,type:Re?mn:Wt,minFilter:Kn,samples:Math.max(4,A.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Qe.workingColorSpace})}const Se=E.state.transmissionRenderTarget[W.id],Ae=W.viewport||K;Se.setSize(Ae.z*k.transmissionResolutionScale,Ae.w*k.transmissionResolutionScale);const be=k.getRenderTarget(),Te=k.getActiveCubeFace(),Pe=k.getActiveMipmapLevel();k.setRenderTarget(Se),k.getClearColor(nt),$e=k.getClearAlpha(),$e<1&&k.setClearColor(16777215,.5),k.clear(),Be&&Ge.render(Z);const We=k.toneMapping;k.toneMapping=fn;const Ke=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),E.setupLightsView(W),se===!0&&Le.setGlobalState(k.clippingPlanes,W),pr(b,Z,W),J.updateMultisampleRenderTarget(Se),J.updateRenderTargetMipmap(Se),Ze.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let at=0,St=N.length;at<St;at++){const mt=N[at],{object:ht,geometry:Pt,material:Ee,group:It}=mt;if(Ee.side===en&&ht.layers.test(W.layers)){const tt=Ee.side;Ee.side=Ft,Ee.needsUpdate=!0,Wo(ht,Z,W,Pt,Ee,It),Ee.side=tt,Ee.needsUpdate=!0,Re=!0}}Re===!0&&(J.updateMultisampleRenderTarget(Se),J.updateRenderTargetMipmap(Se))}k.setRenderTarget(be,Te,Pe),k.setClearColor(nt,$e),Ke!==void 0&&(W.viewport=Ke),k.toneMapping=We}function pr(b,N,Z){const W=N.isScene===!0?N.overrideMaterial:null;for(let X=0,Se=b.length;X<Se;X++){const Ae=b[X],{object:be,geometry:Te,group:Pe}=Ae;let We=Ae.material;We.allowOverride===!0&&W!==null&&(We=W),be.layers.test(Z.layers)&&Wo(be,N,Z,Te,We,Pe)}}function Wo(b,N,Z,W,X,Se){B!==null&&X.isNodeMaterial&&B.setObject(b,X),b.onBeforeRender(k,N,Z,W,X,Se),b.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),X.onBeforeRender(k,N,Z,W,b,Se),X.transparent===!0&&X.side===en&&X.forceSinglePass===!1?(X.side=Ft,X.needsUpdate=!0,k.renderBufferDirect(Z,N,W,X,b,Se),X.side=Bn,X.needsUpdate=!0,k.renderBufferDirect(Z,N,W,X,b,Se),X.side=en):k.renderBufferDirect(Z,N,W,X,b,Se),b.onAfterRender(k,N,Z,W,X,Se)}function mr(b,N,Z){N.isScene!==!0&&(N=Ie);const W=Y.get(b),X=E.state.lights,Se=E.state.shadowsArray,Ae=X.state.version,be=fe.getParameters(b,X.state,Se,N,Z,E.state.lightProbeGridArray),Te=fe.getProgramCacheKey(be);let Pe=W.programs;W.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?N.environment:null,W.fog=N.fog;const We=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;W.envMap=le.get(b.envMap||W.environment,We),W.envMapRotation=W.environment!==null&&b.envMap===null?N.environmentRotation:b.envMapRotation,Pe===void 0&&(b.addEventListener("dispose",sn),Pe=new Map,W.programs=Pe);let Ke=Pe.get(Te);if(Ke!==void 0){if(W.currentProgram===Ke&&W.lightsStateVersion===Ae)return qo(b,be),Ke}else be.uniforms=fe.getUniforms(b),B!==null&&b.isNodeMaterial&&B.build(b,Z,be),b.onBeforeCompile(be,k),Ke=fe.acquireProgram(be,Te),Pe.set(Te,Ke),W.uniforms=be.uniforms;const Re=W.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Re.clippingPlanes=Le.uniform),qo(b,be),W.needsLights=Ou(b),W.lightsStateVersion=Ae,W.needsLights&&(Re.ambientLightColor.value=X.state.ambient,Re.lightProbe.value=X.state.probe,Re.sunLights.value=X.state.sun,Re.sunLightShadows.value=X.state.sunShadow,Re.directionalLights.value=X.state.directional,Re.directionalLightShadows.value=X.state.directionalShadow,Re.spotLights.value=X.state.spot,Re.spotLightShadows.value=X.state.spotShadow,Re.rectAreaLights.value=X.state.rectArea,Re.ltc_1.value=X.state.rectAreaLTC1,Re.ltc_2.value=X.state.rectAreaLTC2,Re.pointLights.value=X.state.point,Re.pointLightShadows.value=X.state.pointShadow,Re.hemisphereLights.value=X.state.hemi,Re.sunShadowMatrix.value=X.state.sunShadowMatrix,Re.sunShadowCascade.value=X.state.sunShadowCascade,Re.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Re.spotLightMatrix.value=X.state.spotLightMatrix,Re.spotLightMap.value=X.state.spotLightMap,Re.pointShadowMatrix.value=X.state.pointShadowMatrix),W.lightProbeGrid=E.state.lightProbeGridArray.length>0,W.currentProgram=Ke,W.uniformsList=null,Ke}function Xo(b){if(b.uniformsList===null){const N=b.currentProgram.getUniforms();b.uniformsList=Jr.seqWithValue(N.seq,b.uniforms)}return b.uniformsList}function qo(b,N){const Z=Y.get(b);Z.outputColorSpace=N.outputColorSpace,Z.batching=N.batching,Z.batchingColor=N.batchingColor,Z.instancing=N.instancing,Z.instancingColor=N.instancingColor,Z.instancingMorph=N.instancingMorph,Z.skinning=N.skinning,Z.morphTargets=N.morphTargets,Z.morphNormals=N.morphNormals,Z.morphColors=N.morphColors,Z.morphTargetsCount=N.morphTargetsCount,Z.numClippingPlanes=N.numClippingPlanes,Z.numIntersection=N.numClipIntersection,Z.vertexAlphas=N.vertexAlphas,Z.vertexTangents=N.vertexTangents,Z.toneMapping=N.toneMapping}function zu(b,N){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;S.setFromMatrixPosition(N.matrixWorld);for(let Z=0,W=b.length;Z<W;Z++){const X=b[Z];if(X.texture!==null&&X.boundingBox.containsPoint(S))return X}return null}function Uu(b,N,Z,W,X){N.isScene!==!0&&(N=Ie),J.resetTextureUnits();const Se=N.fog,Ae=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?N.environment:null,be=G===null?k.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:Qe.workingColorSpace,Te=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Pe=le.get(W.envMap||Ae,Te),We=W.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Ke=!!Z.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Re=!!Z.morphAttributes.position,at=!!Z.morphAttributes.normal,St=!!Z.morphAttributes.color;let mt=fn;W.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(mt=k.toneMapping);const ht=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Pt=ht!==void 0?ht.length:0,Ee=Y.get(W),It=E.state.lights;if(se===!0&&(ae===!0||b!==$)){const ft=b===$&&W.id===O;Le.setState(W,b,ft)}let tt=!1;W.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==It.state.version||Ee.outputColorSpace!==be||X.isBatchedMesh&&Ee.batching===!1||!X.isBatchedMesh&&Ee.batching===!0||X.isBatchedMesh&&Ee.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&Ee.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&Ee.instancing===!1||!X.isInstancedMesh&&Ee.instancing===!0||X.isSkinnedMesh&&Ee.skinning===!1||!X.isSkinnedMesh&&Ee.skinning===!0||X.isInstancedMesh&&Ee.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ee.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ee.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ee.instancingMorph===!1&&X.morphTexture!==null||Ee.envMap!==Pe||W.fog===!0&&Ee.fog!==Se||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==Le.numPlanes||Ee.numIntersection!==Le.numIntersection)||Ee.vertexAlphas!==We||Ee.vertexTangents!==Ke||Ee.morphTargets!==Re||Ee.morphNormals!==at||Ee.morphColors!==St||Ee.toneMapping!==mt||Ee.morphTargetsCount!==Pt||!!Ee.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(tt=!0):(tt=!0,Ee.__version=W.version);let Xt=Ee.currentProgram;tt===!0&&(Xt=mr(W,N,X),B&&W.isNodeMaterial&&B.onUpdateProgram(W,Xt,Ee));let an=!1,Cn=!1,si=!1;const ut=Xt.getUniforms(),xt=Ee.uniforms;if(v.useProgram(Xt.program)&&(an=!0,Cn=!0,si=!0),W.id!==O&&(O=W.id,Cn=!0),Ee.needsLights){const ft=zu(E.state.lightProbeGridArray,X);Ee.lightProbeGrid!==ft&&(Ee.lightProbeGrid=ft,Cn=!0)}if(an||$!==b){v.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ut.setValue(L,"projectionMatrix",b.projectionMatrix),ut.setValue(L,"viewMatrix",b.matrixWorldInverse);const kn=ut.map.cameraPosition;kn!==void 0&&kn.setValue(L,ue.setFromMatrixPosition(b.matrixWorld)),A.logarithmicDepthBuffer&&ut.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ut.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),$!==b&&($=b,Cn=!0,si=!0)}if(Ee.needsLights&&(It.state.sunShadowMap.length>0&&ut.setValue(L,"sunShadowMap",It.state.sunShadowMap,J),It.state.directionalShadowMap.length>0&&ut.setValue(L,"directionalShadowMap",It.state.directionalShadowMap,J),It.state.spotShadowMap.length>0&&ut.setValue(L,"spotShadowMap",It.state.spotShadowMap,J),It.state.pointShadowMap.length>0&&ut.setValue(L,"pointShadowMap",It.state.pointShadowMap,J)),X.isSkinnedMesh){ut.setOptional(L,X,"bindMatrix"),ut.setOptional(L,X,"bindMatrixInverse");const ft=X.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),ut.setValue(L,"boneTexture",ft.boneTexture,J))}X.isBatchedMesh&&(ut.setOptional(L,X,"batchingTexture"),ut.setValue(L,"batchingTexture",X._matricesTexture,J),ut.setOptional(L,X,"batchingIdTexture"),ut.setValue(L,"batchingIdTexture",X._indirectTexture,J),ut.setOptional(L,X,"batchingColorTexture"),X._colorsTexture!==null&&ut.setValue(L,"batchingColorTexture",X._colorsTexture,J));const Pn=Z.morphAttributes;if((Pn.position!==void 0||Pn.normal!==void 0||Pn.color!==void 0)&&U.update(X,Z,Xt),(Cn||Ee.receiveShadow!==X.receiveShadow)&&(Ee.receiveShadow=X.receiveShadow,ut.setValue(L,"receiveShadow",X.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&N.environment!==null&&(xt.envMapIntensity.value=N.environmentIntensity),xt.dfgLUT!==void 0&&(xt.dfgLUT.value=B0()),Cn){if(ut.setValue(L,"toneMappingExposure",k.toneMappingExposure),Ee.needsLights&&Fu(xt,si),Se&&W.fog===!0&&ke.refreshFogUniforms(xt,Se),ke.refreshMaterialUniforms(xt,W,ne,j,E.state.transmissionRenderTarget[b.id]),Ee.needsLights&&Ee.lightProbeGrid){const ft=Ee.lightProbeGrid;xt.probesSH.value=ft.texture,xt.probesMin.value.copy(ft.boundingBox.min),xt.probesMax.value.copy(ft.boundingBox.max),xt.probesResolution.value.copy(ft.resolution)}Jr.upload(L,Xo(Ee),xt,J)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Jr.upload(L,Xo(Ee),xt,J),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ut.setValue(L,"center",X.center),ut.setValue(L,"modelViewMatrix",X.modelViewMatrix),ut.setValue(L,"normalMatrix",X.normalMatrix),ut.setValue(L,"modelMatrix",X.matrixWorld),W.uniformsGroups!==void 0){const ft=W.uniformsGroups;for(let kn=0,ai=ft.length;kn<ai;kn++){const $o=ft[kn];re.update($o,Xt),re.bind($o,Xt)}}return Xt}function Fu(b,N){b.ambientLightColor.needsUpdate=N,b.lightProbe.needsUpdate=N,b.sunLights.needsUpdate=N,b.sunLightShadows.needsUpdate=N,b.directionalLights.needsUpdate=N,b.directionalLightShadows.needsUpdate=N,b.pointLights.needsUpdate=N,b.pointLightShadows.needsUpdate=N,b.spotLights.needsUpdate=N,b.spotLightShadows.needsUpdate=N,b.rectAreaLights.needsUpdate=N,b.hemisphereLights.needsUpdate=N}function Ou(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return G},this.setRenderTargetTextures=function(b,N,Z){const W=Y.get(b);W.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),Y.get(b.texture).__webglTexture=N,Y.get(b.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:Z,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,N){const Z=Y.get(b);Z.__webglFramebuffer=N,Z.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(b,N=0,Z=0){G=b,M=N,y=Z;let W=null,X=!1,Se=!1;if(b){const be=Y.get(b);if(be.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(L.FRAMEBUFFER,be.__webglFramebuffer),K.copy(b.viewport),ye.copy(b.scissor),he=b.scissorTest,v.viewport(K),v.scissor(ye),v.setScissorTest(he),O=-1;return}else if(be.__webglFramebuffer===void 0)J.setupRenderTarget(b);else if(be.__hasExternalTextures)J.rebindTextures(b,Y.get(b.texture).__webglTexture,Y.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const We=b.depthTexture;if(be.__boundDepthTexture!==We){if(We!==null&&Y.has(We)&&(b.width!==We.image.width||b.height!==We.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(b)}}const Te=b.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(Se=!0);const Pe=Y.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Pe[N])?W=Pe[N][Z]:W=Pe[N],X=!0):b.samples>0&&J.useMultisampledRTT(b)===!1?W=Y.get(b).__webglMultisampledFramebuffer:Array.isArray(Pe)?W=Pe[Z]:W=Pe,K.copy(b.viewport),ye.copy(b.scissor),he=b.scissorTest}else K.copy(we).multiplyScalar(ne).floor(),ye.copy(Oe).multiplyScalar(ne).floor(),he=ot;if(Z!==0&&(W=q),v.bindFramebuffer(L.FRAMEBUFFER,W)&&v.drawBuffers(b,W),v.viewport(K),v.scissor(ye),v.setScissorTest(he),X){const be=Y.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+N,be.__webglTexture,Z)}else if(Se){const be=N;for(let Te=0;Te<b.textures.length;Te++){const Pe=Y.get(b.textures[Te]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Te,Pe.__webglTexture,Z,be)}}else if(b!==null&&Z!==0){const be=Y.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,be.__webglTexture,Z)}O=-1};function Yo(b){const N=Y.get(b);return(N.__readFormat!==b.format||N.__readType!==b.type)&&(N.__readFormat=b.format,N.__readType=b.type,N.__formatReadable=A.textureFormatReadable(b.format),N.__typeReadable=A.textureTypeReadable(b.type)),N}this.readRenderTargetPixels=function(b,N,Z,W,X,Se,Ae,be=0){if(!(b&&b.isWebGLRenderTarget)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=Y.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ae!==void 0&&(Te=Te[Ae]),Te){v.bindFramebuffer(L.FRAMEBUFFER,Te);try{const Pe=b.textures[be],We=Pe.format,Ke=Pe.type;b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+be);const Re=Yo(Pe);if(Re.__formatReadable===!1){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Re.__typeReadable===!1){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=b.width-W&&Z>=0&&Z<=b.height-X&&L.readPixels(N,Z,W,X,ge.convert(We),ge.convert(Ke),Se)}finally{const Pe=G!==null?Y.get(G).__webglFramebuffer:null;v.bindFramebuffer(L.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(b,N,Z,W,X,Se,Ae,be=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=Y.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ae!==void 0&&(Te=Te[Ae]),Te)if(N>=0&&N<=b.width-W&&Z>=0&&Z<=b.height-X){v.bindFramebuffer(L.FRAMEBUFFER,Te);const Pe=b.textures[be],We=Pe.format,Ke=Pe.type;b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+be);const Re=Yo(Pe);if(Re.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Re.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const at=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,at),L.bufferData(L.PIXEL_PACK_BUFFER,Se.byteLength,L.STREAM_READ),L.readPixels(N,Z,W,X,ge.convert(We),ge.convert(Ke),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);const St=G!==null?Y.get(G).__webglFramebuffer:null;v.bindFramebuffer(L.FRAMEBUFFER,St);const mt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Mh(L,mt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,at),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,Se),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(at),L.deleteSync(mt),Se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,N=null,Z=0){const W=Math.pow(2,-Z),X=Math.floor(b.image.width*W),Se=Math.floor(b.image.height*W),Ae=N!==null?N.x:0,be=N!==null?N.y:0;J.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,Z,0,0,Ae,be,X,Se),v.unbindTexture()},this.copyTextureToTexture=function(b,N,Z=null,W=null,X=0,Se=0){let Ae,be,Te,Pe,We,Ke,Re,at,St;const mt=b.isCompressedTexture?b.mipmaps[Se]:b.image;if(Z!==null)Ae=Z.max.x-Z.min.x,be=Z.max.y-Z.min.y,Te=Z.isBox3?Z.max.z-Z.min.z:1,Pe=Z.min.x,We=Z.min.y,Ke=Z.isBox3?Z.min.z:0;else{const xt=Math.pow(2,-X);Ae=Math.floor(mt.width*xt),be=Math.floor(mt.height*xt),b.isDataArrayTexture?Te=mt.depth:b.isData3DTexture?Te=Math.floor(mt.depth*xt):Te=1,Pe=0,We=0,Ke=0}W!==null?(Re=W.x,at=W.y,St=W.z):(Re=0,at=0,St=0);const ht=ge.convert(N.format),Pt=ge.convert(N.type);let Ee;N.isData3DTexture?(J.setTexture3D(N,0),Ee=L.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(J.setTexture2DArray(N,0),Ee=L.TEXTURE_2D_ARRAY):(J.setTexture2D(N,0),Ee=L.TEXTURE_2D),v.activeTexture(L.TEXTURE0),v.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,N.flipY),v.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),v.pixelStorei(L.UNPACK_ALIGNMENT,N.unpackAlignment);const It=v.getParameter(L.UNPACK_ROW_LENGTH),tt=v.getParameter(L.UNPACK_IMAGE_HEIGHT),Xt=v.getParameter(L.UNPACK_SKIP_PIXELS),an=v.getParameter(L.UNPACK_SKIP_ROWS),Cn=v.getParameter(L.UNPACK_SKIP_IMAGES);v.pixelStorei(L.UNPACK_ROW_LENGTH,mt.width),v.pixelStorei(L.UNPACK_IMAGE_HEIGHT,mt.height),v.pixelStorei(L.UNPACK_SKIP_PIXELS,Pe),v.pixelStorei(L.UNPACK_SKIP_ROWS,We),v.pixelStorei(L.UNPACK_SKIP_IMAGES,Ke);const si=b.isDataArrayTexture||b.isData3DTexture,ut=N.isDataArrayTexture||N.isData3DTexture;if(b.isDepthTexture){const xt=Y.get(b),Pn=Y.get(N),ft=Y.get(xt.__renderTarget),kn=Y.get(Pn.__renderTarget);v.bindFramebuffer(L.READ_FRAMEBUFFER,ft.__webglFramebuffer),v.bindFramebuffer(L.DRAW_FRAMEBUFFER,kn.__webglFramebuffer);for(let ai=0;ai<Te;ai++)si&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Y.get(b).__webglTexture,X,Ke+ai),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Y.get(N).__webglTexture,Se,St+ai)),L.blitFramebuffer(Pe,We,Ae,be,Re,at,Ae,be,L.DEPTH_BUFFER_BIT,L.NEAREST);v.bindFramebuffer(L.READ_FRAMEBUFFER,null),v.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(X!==0||b.isRenderTargetTexture||Y.has(b)){const xt=Y.get(b),Pn=Y.get(N);v.bindFramebuffer(L.READ_FRAMEBUFFER,F),v.bindFramebuffer(L.DRAW_FRAMEBUFFER,H);for(let ft=0;ft<Te;ft++)si?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,xt.__webglTexture,X,Ke+ft):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,xt.__webglTexture,X),ut?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Pn.__webglTexture,Se,St+ft):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Pn.__webglTexture,Se),X!==0?L.blitFramebuffer(Pe,We,Ae,be,Re,at,Ae,be,L.COLOR_BUFFER_BIT,L.NEAREST):ut?L.copyTexSubImage3D(Ee,Se,Re,at,St+ft,Pe,We,Ae,be):L.copyTexSubImage2D(Ee,Se,Re,at,Pe,We,Ae,be);v.bindFramebuffer(L.READ_FRAMEBUFFER,null),v.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else ut?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(Ee,Se,Re,at,St,Ae,be,Te,ht,Pt,mt.data):N.isCompressedArrayTexture?L.compressedTexSubImage3D(Ee,Se,Re,at,St,Ae,be,Te,ht,mt.data):L.texSubImage3D(Ee,Se,Re,at,St,Ae,be,Te,ht,Pt,mt):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,Se,Re,at,Ae,be,ht,Pt,mt.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,Se,Re,at,mt.width,mt.height,ht,mt.data):L.texSubImage2D(L.TEXTURE_2D,Se,Re,at,Ae,be,ht,Pt,mt);v.pixelStorei(L.UNPACK_ROW_LENGTH,It),v.pixelStorei(L.UNPACK_IMAGE_HEIGHT,tt),v.pixelStorei(L.UNPACK_SKIP_PIXELS,Xt),v.pixelStorei(L.UNPACK_SKIP_ROWS,an),v.pixelStorei(L.UNPACK_SKIP_IMAGES,Cn),Se===0&&N.generateMipmaps&&L.generateMipmap(Ee),v.unbindTexture()},this.initRenderTarget=function(b){Y.get(b).__webglFramebuffer===void 0&&J.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?J.setTextureCube(b,0):b.isData3DTexture?J.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?J.setTexture2DArray(b,0):J.setTexture2D(b,0),v.unbindTexture()},this.resetState=function(){M=0,y=0,G=null,v.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}const ct=n=>({value:n,unit:"mm"});function Gt(n,e,t,i={},r=[]){return{id:n,type:e,params:i,content:r,meta:{name:t}}}const cn=n=>JSON.parse(JSON.stringify(n));function ki(n){return n.content.flatMap(e=>[e,...ki(e)])}const At=n=>[n,...ki(n)];function bt(n,e){return At(n).find(t=>t.id===e)}function ps(n,e){return At(n).find(t=>t.content.some(i=>i.id===e))}function Fn(n,e){if(n.id===e)return[n];for(const t of n.content){const i=Fn(t,e);if(i.length)return[n,...i]}return[]}const Ht=n=>n.meta.verworfen===!0,qe=n=>n&&typeof n=="object"?n.value:0;function uu(n,e){const t=new Set(At(n).map(r=>r.id));if(!t.has(e))return e;let i=2;for(;t.has(`${e}-${i}`);)i+=1;return`${e}-${i}`}const hu={bohrungen:{durchmesser:6},steg:{hoehe:30}};function H0(){return Gt("halter","teil","Halter",{material:"PLA"},[Gt("skizze","skizze","Skizze",{ebene:"XY",laenge:ct(80),breite:ct(50),eckradius:ct(3)}),Gt("grundplatte","extrusion","Grundplatte",{laenge:ct(80),breite:ct(50),dicke:ct(8),eckradius:ct(3)}),Gt("steg","extrusion","Steg",{laenge:ct(60),breite:ct(10),hoehe:ct(30),lage_y:ct(20)}),Gt("bohrungen","bohrung","Bohrungen",{durchmesser:ct(6),abstand_x:ct(25),lage_y:ct(-7.5)})])}function G0(){return Gt("sensorgehaeuse","baugruppe","Sensorgehäuse",{},[Gt("baugruppe-1","baugruppe","Baugruppe 1",{},[Gt("gehaeuse","teil","Gehäuse",{material:"PLA",lage_x:ct(0)},[Gt("schale","schale","Schale",{laenge:ct(80),breite:ct(50),hoehe:ct(30),wand:ct(2)})])]),Gt("deckel","teil","Deckel",{material:"PLA",lage_x:ct(100)},[Gt("platte","extrusion","Platte",{laenge:ct(80),breite:ct(50),hoehe:ct(4)})])])}const W0=()=>Gt("teil-1","teil","Teil 1",{material:"PLA"},[]),du=n=>Gt("projekt","projekt","Projekt",{},n),ws=()=>du([H0(),G0()]),rc=()=>du([W0()]),X0=.00124,q0=1-Math.PI/4,sc=50,ac=n=>!!n&&!Ht(n);function ms(n){const e=[];for(const t of At(n))Ht(t)||(t.type==="bohrung"&&qe(t.params.durchmesser)>=sc&&e.push({elementId:t.id,schluessel:"befund.bohrung-zu-gross",parameter:"durchmesser",wert:qe(t.params.durchmesser),grenze:sc}),t.id==="steg"&&qe(t.params.hoehe)<=0&&e.push({elementId:t.id,schluessel:"befund.steg-ohne-hoehe",parameter:"hoehe",wert:qe(t.params.hoehe),grenze:0}));return e}function oc(n,e,t){return t.has(n.id)?hu[n.id]?.[e]??qe(n.params[e]):qe(n.params[e])}function Y0(n,e,t,i){const r=qe(n.params.laenge),s=qe(n.params.breite),a=qe(n.params.lage_y);return{min:[e[0]-r/2,e[1]+a-s/2,e[2]+t],max:[e[0]+r/2,e[1]+a+s/2,e[2]+t+i]}}function On(n){const e=new Set(ms(n).map(u=>u.elementId)),t=[];let i=0;const r=u=>[qe(u.params.lage_x),qe(u.params.lage_y),0];function s(u,h){const d=u.content.filter(m=>ac(m));let f=0;for(const m of d)if(m.type==="skizze"){const x=qe(m.params.laenge),g=qe(m.params.breite);t.push({elementId:m.id,art:"skizze",min:[h[0]-x/2,h[1]-g/2,0],max:[h[0]+x/2,h[1]+g/2,0],platte:{laenge:x,breite:g,dicke:0,eckradius:qe(m.params.eckradius),loecher:[],lochD:0}})}for(const m of d)if(m.type==="extrusion"&&m.params.dicke!==void 0){const x=m.id==="grundplatte",g=qe(m.params.dicke),p=qe(m.params.laenge),R=qe(m.params.breite),C=qe(m.params.eckradius),S=h[1]+qe(m.params.lage_y);x&&(f=g);const w=x?d.find(k=>k.type==="bohrung"):void 0,E=w?oc(w,"durchmesser",e):0,P=w?qe(w.params.abstand_x):0,_=w?qe(w.params.lage_y):0,T=w?[{x:h[0]+P,y:S+_},{x:h[0]-P,y:S+_}]:[];if(t.push({elementId:m.id,art:"platte",min:[h[0]-p/2,S-R/2,h[2]],max:[h[0]+p/2,S+R/2,h[2]+g],platte:{laenge:p,breite:R,dicke:g,eckradius:C,loecher:T,lochD:E}}),i+=(p*R-4*C*C*q0)*g,w){i-=T.length*Math.PI*(E/2)**2*g;for(const k of T)t.push({elementId:w.id,art:"rohr",min:[k.x-E/2,k.y-E/2,h[2]],max:[k.x+E/2,k.y+E/2,h[2]+g],rohr:{x:k.x,y:k.y,d:E}})}}for(const m of d)if(m.type==="extrusion"&&m.params.dicke===void 0){const x=m.params.hoehe!==void 0?oc(m,"hoehe",e):0,g=Y0(m,h,f,x);t.push({elementId:m.id,art:"quader",min:g.min,max:g.max}),i+=qe(m.params.laenge)*qe(m.params.breite)*x}else if(m.type==="schale"){const x=qe(m.params.laenge),g=qe(m.params.breite),p=qe(m.params.hoehe),R=qe(m.params.wand);t.push({elementId:m.id,art:"schale",min:[h[0]-x/2,h[1]-g/2,h[2]],max:[h[0]+x/2,h[1]+g/2,h[2]+p],wand:R}),i+=x*g*p-(x-2*R)*(g-2*R)*(p-R)}}const a=At(n).filter(u=>u.type==="teil"&&ac(u)),o=new Set;for(const u of a)$0(n,u)||(o.add(u.id),s(u,r(u)));const l=[0,0,0],c=t.filter(u=>u.art!=="skizze"&&u.art!=="rohr");if(c.length)for(let u=0;u<3;u++)l[u]=Math.max(...c.map(h=>h.max[u]))-Math.min(...c.map(h=>h.min[u]));return{koerper:t,volumen_mm3:i,masse_g:i*X0,abmessungen_mm:l,befunde:ms(n)}}function $0(n,e){for(const t of At(n))if(Ht(t)&&ki(t).some(i=>i.id===e.id))return!0;return!1}function lc(n,e){const t=new Set([n.id,...ki(n).map(o=>o.id)]),i=e.filter(o=>t.has(o.elementId)&&o.art!=="skizze"),r=i.length?i:e.filter(o=>t.has(o.elementId));if(!r.length)return null;const s=[1/0,1/0,1/0],a=[-1/0,-1/0,-1/0];for(const o of r)for(let l=0;l<3;l++)s[l]=Math.min(s[l],o.min[l]),a[l]=Math.max(a[l],o.max[l]);return{min:s,max:a}}const Z0=JSON.parse('[{"id":"element.anlegen","familie":"Datei","titel":"befehl.element.anlegen","parameter":{"typ":{"typ":"wahl"}},"bezug":"keine","rang":101,"wesentlich":true,"untergruppe":"Neu","kontext":true},{"id":"dokument.oeffnen","familie":"Datei","titel":"befehl.dokument.oeffnen","parameter":{},"bezug":"keine","rang":102,"wesentlich":true,"untergruppe":"Öffnen","folgt":true},{"id":"wurzel.setzen","familie":"Datei","titel":"befehl.wurzel.setzen","parameter":{},"bezug":"element","rang":103,"wesentlich":true,"untergruppe":"Öffnen","folgt":true},{"id":"einstellungen.oeffnen","familie":"Datei","titel":"befehl.einstellungen.oeffnen","parameter":{},"bezug":"keine","rang":104,"wesentlich":true,"untergruppe":"Projekt","folgt":true},{"id":"dokument.schliessen","familie":"Datei","titel":"befehl.dokument.schliessen","parameter":{},"bezug":"keine","rang":105,"wesentlich":false,"untergruppe":"Öffnen","folgt":true},{"id":"projekt.teilen","familie":"Datei","titel":"befehl.projekt.teilen","parameter":{},"bezug":"keine","rang":106,"wesentlich":false,"untergruppe":"Projekt","folgt":true},{"id":"projekt.einladen","familie":"Datei","titel":"befehl.projekt.einladen","parameter":{},"bezug":"keine","rang":107,"wesentlich":false,"untergruppe":"Projekt","folgt":true},{"id":"bearbeiten.rueckgaengig","familie":"Bearbeiten","titel":"befehl.bearbeiten.rueckgaengig","parameter":{},"bezug":"keine","rang":108,"wesentlich":true,"untergruppe":"Verlauf","kuerzel":"Mod+Z","kontext":true},{"id":"bearbeiten.wiederholen","familie":"Bearbeiten","titel":"befehl.bearbeiten.wiederholen","parameter":{},"bezug":"keine","rang":109,"wesentlich":true,"untergruppe":"Verlauf","kuerzel":"Mod+Umschalt+Z","kontext":true},{"id":"element.duplizieren","familie":"Bearbeiten","titel":"befehl.element.duplizieren","parameter":{},"bezug":"element","rang":1,"wesentlich":true,"untergruppe":"Element","kuerzel":"Mod+D"},{"id":"element.umbenennen","familie":"Bearbeiten","titel":"befehl.element.umbenennen","parameter":{"name":{"typ":"text"}},"bezug":"element","rang":2,"wesentlich":true,"untergruppe":"Element","kuerzel":"F2"},{"id":"element.verwerfen","familie":"Bearbeiten","titel":"befehl.element.verwerfen","parameter":{},"bezug":"element","rang":3,"wesentlich":true,"untergruppe":"Element","kuerzel":"Entf"},{"id":"auswahl.duplizieren","familie":"Bearbeiten","titel":"befehl.auswahl.duplizieren","parameter":{},"bezug":"mehrfach","rang":12,"wesentlich":true,"untergruppe":"Element"},{"id":"auswahl.verwerfen","familie":"Bearbeiten","titel":"befehl.auswahl.verwerfen","parameter":{},"bezug":"mehrfach","rang":13,"wesentlich":true,"untergruppe":"Element"},{"id":"element.zurueckholen","familie":"Bearbeiten","titel":"befehl.element.zurueckholen","parameter":{},"bezug":"verworfen","rang":7,"wesentlich":true,"untergruppe":"Element"},{"id":"element.wert-setzen","familie":"Bearbeiten","titel":"befehl.element.wert-setzen","parameter":{"element":{"typ":"referenz"},"name":{"typ":"text"},"wert":{"dimension":"laenge","einheit":"mm"}},"bezug":"element","rang":11,"wesentlich":true,"untergruppe":"Werte"},{"id":"element.parameter-anlegen","familie":"Bearbeiten","titel":"befehl.element.parameter-anlegen","parameter":{},"bezug":"element","rang":117,"wesentlich":false,"untergruppe":"Werte","folgt":true},{"id":"bearbeiten.einfuegen","familie":"Bearbeiten","titel":"befehl.bearbeiten.einfuegen","parameter":{},"bezug":"keine","rang":118,"wesentlich":false,"untergruppe":"Element","folgt":true},{"id":"element.pausieren","familie":"Bearbeiten","titel":"befehl.element.pausieren","parameter":{},"bezug":"element","rang":119,"wesentlich":false,"untergruppe":"Berechnung"},{"id":"element.fortsetzen","familie":"Bearbeiten","titel":"befehl.element.fortsetzen","parameter":{},"bezug":"element","rang":120,"wesentlich":false,"untergruppe":"Berechnung"},{"id":"auswahl.alles","familie":"Auswahl","titel":"befehl.auswahl.alles","parameter":{},"bezug":"keine","rang":121,"wesentlich":true,"untergruppe":"Auswahl","kuerzel":"Mod+A","kontext":true},{"id":"auswahl.aufheben","familie":"Auswahl","titel":"befehl.auswahl.aufheben","parameter":{},"bezug":"mehrfach","rang":122,"wesentlich":true,"untergruppe":"Auswahl"},{"id":"auswahl.umkehren","familie":"Auswahl","titel":"befehl.auswahl.umkehren","parameter":{},"bezug":"keine","rang":123,"wesentlich":false,"untergruppe":"Auswahl","kontext":true},{"id":"auswahl.setzen","familie":"Auswahl","titel":"befehl.auswahl.setzen","parameter":{"elemente":{"typ":"referenz"}},"bezug":"keine","rang":124,"wesentlich":false,"untergruppe":"Befehle","folgt":true},{"id":"auswahl.hinzufuegen","familie":"Auswahl","titel":"befehl.auswahl.hinzufuegen","parameter":{"elemente":{"typ":"referenz"}},"bezug":"keine","rang":125,"wesentlich":false,"untergruppe":"Befehle","folgt":true},{"id":"auswahl.umschalten","familie":"Auswahl","titel":"befehl.auswahl.umschalten","parameter":{"elemente":{"typ":"referenz"}},"bezug":"keine","rang":126,"wesentlich":false,"untergruppe":"Befehle","folgt":true},{"id":"auswahl.aehnliche","familie":"Auswahl","titel":"befehl.auswahl.aehnliche","parameter":{},"bezug":"element","rang":127,"wesentlich":false,"untergruppe":"Regeln","folgt":true},{"id":"auswahl.kantenschleife","familie":"Auswahl","titel":"befehl.auswahl.kantenschleife","parameter":{},"bezug":"kante","rang":128,"wesentlich":false,"untergruppe":"Regeln","folgt":true},{"id":"ansicht.einpassen","familie":"Ansicht","titel":"befehl.ansicht.einpassen","parameter":{},"bezug":"keine","rang":129,"wesentlich":true,"untergruppe":"Blick","kontext":true},{"id":"ansicht.auf-auswahl","familie":"Ansicht","titel":"befehl.ansicht.auf-auswahl","parameter":{},"bezug":"keine","rang":5,"wesentlich":true,"untergruppe":"Blick","kuerzel":"F","kontext":true},{"id":"ansicht.projektion","familie":"Ansicht","titel":"befehl.ansicht.projektion","parameter":{},"bezug":"keine","rang":131,"wesentlich":true,"untergruppe":"Blick","kontext":true},{"id":"ansicht.vorne","familie":"Ansicht","titel":"befehl.ansicht.vorne","parameter":{},"bezug":"keine","rang":132,"wesentlich":false,"untergruppe":"Blick"},{"id":"ansicht.oben","familie":"Ansicht","titel":"befehl.ansicht.oben","parameter":{},"bezug":"keine","rang":133,"wesentlich":false,"untergruppe":"Blick"},{"id":"ansicht.isometrisch","familie":"Ansicht","titel":"befehl.ansicht.isometrisch","parameter":{},"bezug":"keine","rang":134,"wesentlich":false,"untergruppe":"Blick"},{"id":"ansicht.schnitt","familie":"Ansicht","titel":"befehl.ansicht.schnitt","parameter":{},"bezug":"keine","rang":135,"wesentlich":false,"untergruppe":"Blick","folgt":true},{"id":"darstellung.wechseln","familie":"Ansicht","titel":"befehl.darstellung.wechseln","parameter":{},"bezug":"keine","rang":136,"wesentlich":true,"untergruppe":"Darstellung","kuerzel":"W","kontext":true},{"id":"ansicht.isolieren","familie":"Ansicht","titel":"befehl.ansicht.isolieren","parameter":{},"bezug":"keine","rang":137,"wesentlich":true,"untergruppe":"Darstellung","kontext":true},{"id":"ansicht.alles-einblenden","familie":"Ansicht","titel":"befehl.ansicht.alles-einblenden","parameter":{},"bezug":"keine","rang":138,"wesentlich":true,"untergruppe":"Darstellung","kuerzel":"Alt+H","kontext":true},{"id":"ansicht.verworfenes","familie":"Ansicht","titel":"befehl.ansicht.verworfenes","parameter":{},"bezug":"keine","rang":139,"wesentlich":false,"untergruppe":"Darstellung"},{"id":"ansicht.ergebnis","familie":"Ansicht","titel":"befehl.ansicht.ergebnis","parameter":{},"bezug":"keine","rang":140,"wesentlich":false,"untergruppe":"Stand","folgt":true},{"id":"ansicht.alle-entwuerfe","familie":"Ansicht","titel":"befehl.ansicht.alle-entwuerfe","parameter":{},"bezug":"keine","rang":141,"wesentlich":false,"untergruppe":"Stand","folgt":true},{"id":"element.ausblenden","familie":"Sichtbarkeit","titel":"befehl.element.ausblenden","parameter":{},"bezug":"element","rang":4,"wesentlich":true,"untergruppe":"Sichtbarkeit","kuerzel":"H"},{"id":"element.einblenden","familie":"Sichtbarkeit","titel":"befehl.element.einblenden","parameter":{},"bezug":"element","rang":8,"wesentlich":true,"untergruppe":"Sichtbarkeit"},{"id":"auswahl.ausblenden","familie":"Sichtbarkeit","titel":"befehl.auswahl.ausblenden","parameter":{},"bezug":"mehrfach","rang":14,"wesentlich":true,"untergruppe":"Sichtbarkeit"},{"id":"sichtbarkeit.nur-dieses","familie":"Sichtbarkeit","titel":"befehl.sichtbarkeit.nur-dieses","parameter":{},"bezug":"element","rang":145,"wesentlich":false,"untergruppe":"Sichtbarkeit","folgt":true},{"id":"sichtbarkeit.farbe-setzen","familie":"Sichtbarkeit","titel":"befehl.sichtbarkeit.farbe-setzen","parameter":{},"bezug":"element","rang":146,"wesentlich":false,"untergruppe":"Sichtbarkeit","folgt":true},{"id":"ansicht.speichern","familie":"Ansicht speichern","titel":"befehl.ansicht.speichern","parameter":{"name":{"typ":"text"}},"bezug":"keine","rang":147,"wesentlich":false,"untergruppe":"Gespeichert","kontext":true},{"id":"ansicht.anwenden","familie":"Ansicht speichern","titel":"befehl.ansicht.anwenden","parameter":{},"bezug":"ansicht","rang":9,"wesentlich":true,"untergruppe":"Gespeichert"},{"id":"fenster.struktur","familie":"Fenster","titel":"befehl.fenster.struktur","parameter":{},"bezug":"keine","rang":149,"wesentlich":true,"untergruppe":"Zonen","kuerzel":"Mod+B"},{"id":"fenster.panel","familie":"Fenster","titel":"befehl.fenster.panel","parameter":{},"bezug":"keine","rang":150,"wesentlich":true,"untergruppe":"Zonen","kuerzel":"Mod+J"},{"id":"fenster.rechts","familie":"Fenster","titel":"befehl.fenster.rechts","parameter":{},"bezug":"keine","rang":151,"wesentlich":true,"untergruppe":"Zonen","kuerzel":"Mod+Alt+B"},{"id":"fenster.naechste-zone","familie":"Fenster","titel":"befehl.fenster.naechste-zone","parameter":{},"bezug":"keine","rang":152,"wesentlich":false,"untergruppe":"Zonen","kuerzel":"F6"},{"id":"suche.oeffnen","familie":"Fenster","titel":"befehl.suche.oeffnen","parameter":{},"bezug":"keine","rang":153,"wesentlich":true,"untergruppe":"Suche","kuerzel":"Mod+K"},{"id":"fenster.teilen","familie":"Fenster","titel":"befehl.fenster.teilen","parameter":{},"bezug":"keine","rang":154,"wesentlich":false,"untergruppe":"Fenster","folgt":true},{"id":"thema.umschalten","familie":"Fenster","titel":"befehl.thema.umschalten","parameter":{},"bezug":"keine","rang":155,"wesentlich":false,"untergruppe":"Einstellungen"},{"id":"einstellung.navigationsprofil","familie":"Fenster","titel":"befehl.einstellung.navigationsprofil","parameter":{"profil":{"typ":"wahl"}},"bezug":"keine","rang":156,"wesentlich":false,"untergruppe":"Einstellungen"},{"id":"katalog.oeffnen","familie":"Hilfe","titel":"befehl.katalog.oeffnen","parameter":{},"bezug":"keine","rang":157,"wesentlich":false,"untergruppe":"Hilfe"},{"id":"hilfe.befehle-zeigen","familie":"Hilfe","titel":"befehl.hilfe.befehle-zeigen","parameter":{},"bezug":"keine","rang":158,"wesentlich":false,"untergruppe":"Hilfe"},{"id":"hilfe.einfuehrung","familie":"Hilfe","titel":"befehl.hilfe.einfuehrung","parameter":{},"bezug":"keine","rang":159,"wesentlich":false,"untergruppe":"Hilfe","folgt":true},{"id":"element.umhaengen","familie":"Baugruppe","titel":"befehl.element.umhaengen","parameter":{"ziel":{"typ":"referenz"}},"bezug":"teil","rang":10,"wesentlich":true,"untergruppe":"Hierarchie"},{"id":"element.aktivieren","familie":"Baugruppe","titel":"befehl.element.aktivieren","parameter":{},"bezug":"teil","rang":6,"wesentlich":true,"untergruppe":"Hierarchie"},{"id":"element.verlassen","familie":"Baugruppe","titel":"befehl.element.verlassen","parameter":{},"bezug":"keine","rang":162,"wesentlich":true,"untergruppe":"Hierarchie","kontext":true},{"id":"baugruppe.anlegen","familie":"Baugruppe","titel":"befehl.baugruppe.anlegen","parameter":{},"bezug":"keine","rang":163,"wesentlich":false,"untergruppe":"Hierarchie","kontext":true},{"id":"baugruppe.instanz-anlegen","familie":"Baugruppe","titel":"befehl.baugruppe.instanz-anlegen","parameter":{},"bezug":"baugruppe","rang":164,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"baugruppe.variante-waehlen","familie":"Baugruppe","titel":"befehl.baugruppe.variante-waehlen","parameter":{},"bezug":"baugruppe","rang":165,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"verbindung.anlegen","familie":"Baugruppe","titel":"befehl.verbindung.anlegen","parameter":{},"bezug":"baugruppe","rang":166,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"verbindung.verbindungspunkt-setzen","familie":"Baugruppe","titel":"befehl.verbindung.verbindungspunkt-setzen","parameter":{},"bezug":"baugruppe","rang":167,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"verbindung.bewegen","familie":"Baugruppe","titel":"befehl.verbindung.bewegen","parameter":{},"bezug":"baugruppe","rang":168,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"baugruppe.kollision-pruefen","familie":"Baugruppe","titel":"befehl.baugruppe.kollision-pruefen","parameter":{},"bezug":"baugruppe","rang":169,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"baugruppe.fixieren","familie":"Baugruppe","titel":"befehl.baugruppe.fixieren","parameter":{},"bezug":"teil","rang":170,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"baugruppe.komponente-anlegen","familie":"Baugruppe","titel":"befehl.baugruppe.komponente-anlegen","parameter":{},"bezug":"teil","rang":171,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"simulation.lager","familie":"Simulation","titel":"befehl.simulation.lager","parameter":{},"bezug":"keine","rang":172,"wesentlich":true,"untergruppe":"Studie","folgt":true},{"id":"simulation.kraft","familie":"Simulation","titel":"befehl.simulation.kraft","parameter":{},"bezug":"keine","rang":173,"wesentlich":true,"untergruppe":"Studie","folgt":true},{"id":"simulation.ergebnis","familie":"Simulation","titel":"befehl.simulation.ergebnis","parameter":{},"bezug":"keine","rang":174,"wesentlich":true,"untergruppe":"Studie","folgt":true},{"id":"chat.senden","familie":"Chat","titel":"befehl.chat.senden","parameter":{},"bezug":"keine","rang":175,"wesentlich":true,"untergruppe":"Chat"},{"id":"chat.uebernehmen","familie":"Chat","titel":"befehl.chat.uebernehmen","parameter":{},"bezug":"keine","rang":176,"wesentlich":true,"untergruppe":"Chat"},{"id":"chat.verwerfen","familie":"Chat","titel":"befehl.chat.verwerfen","parameter":{},"bezug":"keine","rang":177,"wesentlich":true,"untergruppe":"Chat"},{"id":"task.wechseln","familie":"Fenster","titel":"befehl.task.wechseln","parameter":{},"bezug":"keine","rang":178,"wesentlich":false,"untergruppe":"Zonen"},{"id":"dokument.wechseln","familie":"Fenster","titel":"befehl.dokument.wechseln","parameter":{},"bezug":"keine","rang":179,"wesentlich":false,"untergruppe":"Zonen"}]'),K0={befehle:Z0},Qr=12,J0=["Bearbeiten","Auswahl","Baugruppe","Sichtbarkeit","Ansicht","Ansicht speichern","Datei","Fenster","Hilfe","Simulation","Chat"],Li=K0.befehle;function Q0(n){return(Array.isArray(n)?n:n.befehle??[]).map((t,i)=>({id:String(t.id),familie:t.familie??"Hilfe",titel:t.titel??String(t.id),parameter:t.parameter??{},bezug:t.bezug??"keine",rang:t.rang??1e3+i,wesentlich:t.wesentlich??!1,kuerzel:t.kuerzel,untergruppe:t.untergruppe,kontext:t.kontext,folgt:t.folgt}))}const j0={keine:new Set(["keine"]),schritt:new Set(["keine","element"]),teil:new Set(["keine","element","teil"]),baugruppe:new Set(["keine","element","baugruppe"]),kante:new Set(["keine","kante"]),mehrfach:new Set(["keine","mehrfach"]),verworfen:new Set(["keine","element","verworfen"]),ansicht:new Set(["keine","element","ansicht"])};function ev(n,e){const t=new Map;for(const r of n.filter(s=>s.familie===e)){const s=r.untergruppe??"Weitere";t.set(s,[...t.get(s)??[],r])}const i=[];for(const[r,s]of t)for(let a=0;a<s.length;a+=Qr)i.push({name:a===0?r:`${r} ${Math.floor(a/Qr)+1}`,eintraege:s.slice(a,a+Qr)});return i}function ur(n,e,t=()=>!0){const i=n.filter(a=>j0[e].has(a.bezug)&&(a.bezug!=="keine"||a.kontext)&&t(a)),r=[...new Set([...J0,...i.map(a=>a.familie)])],s=[];for(const a of r){const o=i.filter(u=>u.familie===a).sort((u,h)=>u.rang-h.rang).slice(0,Qr);if(!o.length)continue;const l=o.filter(u=>u.wesentlich),c=o.filter(u=>!u.wesentlich);s.push({familie:a,eintraege:[...l.map(u=>({befehl:u,mehr:!1})),...c.map(u=>({befehl:u,mehr:!0}))]})}return s}function tv(n){return n.flatMap(e=>e.eintraege.map(t=>t.befehl)).sort((e,t)=>e.rang-t.rang)}const nv=5;function fo(n){return tv(n).slice(0,nv)}const iv={titel:"profil.standard",maus:{drehen:[{taste:2}],verschieben:[{taste:1},{taste:2,umschalt:!0}],zoomen:[{rad:!0}]},trackpad:{drehen:[{wischen:!0}],verschieben:[{wischen:!0,umschalt:!0}],zoomen:[{spreizen:!0}]},touch:{drehen:[{finger:1}],verschieben:[{finger:2,ziehen:!0}],zoomen:[{finger:2,spreizen:!0}]}},rv={titel:"profil.solidworks",maus:{drehen:[{taste:1}],verschieben:[{taste:1,strg:!0}],zoomen:[{rad:!0}]},trackpad:{drehen:[{wischen:!0}],verschieben:[{wischen:!0,umschalt:!0}],zoomen:[{spreizen:!0}]},touch:{drehen:[{finger:1}],verschieben:[{finger:2,ziehen:!0}],zoomen:[{finger:2,spreizen:!0}]}},fu={standard:iv,solidworks:rv},sv={menueleiste:"Menüleiste",taskleiste:"Taskleiste",struktur:"Struktur",modell:"Modell",eigenschaften:"Eigenschaften",chat:"Chat",panel:"Panel",rueckmeldung:"Rückmeldung"},av={start:"Start",folgt:"folgt",mehr:"Mehr …"},ov={modellieren:"Modellieren",simulation:"Simulation (simuliert)",shop:"Shop (folgt)"},lv="simuliert",cv={platzhalter:"Befehle und Inhalte suchen",befehle:"Befehle",inhalte:"Inhalte",nichts:"Nichts gefunden"},uv={Datei:"Datei",Bearbeiten:"Bearbeiten",Auswahl:"Auswahl",Ansicht:"Ansicht",Sichtbarkeit:"Sichtbarkeit","Ansicht speichern":"Gespeicherte Ansichten",Fenster:"Fenster",Hilfe:"Hilfe",Baugruppe:"Baugruppe",Simulation:"Simulation",Chat:"Chat"},hv={Neu:"Neu",Öffnen:"Öffnen",Projekt:"Projekt",Verlauf:"Verlauf",Element:"Element",Werte:"Werte",Berechnung:"Berechnung",Auswahl:"Auswahl",Befehle:"Auswahl setzen",Regeln:"Nach Regel",Zonen:"Zonen",Suche:"Suche",Fenster:"Fenster",Einstellungen:"Einstellungen",Hierarchie:"Hierarchie",Verbinden:"Verbinden",Studie:"Studie",Blick:"Blick",Darstellung:"Darstellung",Stand:"Stand",Sichtbarkeit:"Sichtbarkeit",Gespeichert:"Gespeichert",Hilfe:"Hilfe",Chat:"Chat",Weitere:"Weitere"},dv={titel:"Struktur",wurzel:"Wurzel",leer:"Noch nichts da. Lege dein erstes Teil an.","leer-simulation":"Noch keine Studie. Die Simulation ist ein Platzhalter und simuliert.",verworfen:"verworfen"},fv={leer:"Das Modell ist leer."},pv={fertig:"Fertig"},mv={titel:"Pfad"},gv={titel:"Ansicht",mehr:"Mehr Ansichten"},vv={person:"Testperson B",kuerzel:"B"},_v={"zustand-unbekannt":"Zustand unbekannt",korrektur:"Letzten gültigen Wert setzen","bohrung-zu-gross":"Der Durchmesser {wert} ist zu groß; unter {grenze} ist die Bohrung gültig.","steg-ohne-hoehe":"Der Steg braucht eine Höhe über {grenze}."},xv={fehlerhaft:"fehlerhaft",pausiert:"pausiert",rechnet:"rechnet"},bv={befunde:"Befunde","keine-befunde":"Keine Befunde. Alles ist aktuell."},Sv={fehler:{"nicht-lesbar":"Wert nicht lesbar. Beispiel: 12 mm",dimension:"Falsche Einheit für dieses Feld",teilung:"Teilen durch null geht nicht"}},Mv={gemischt:"gemischt","n-elemente":"{n} Elemente","umbenennen-hinweis":"Doppelklick zum Umbenennen"},yv={masse:"Maße",material:"Material",ergebnis:"Ergebnis",ansicht:"Ansicht"},wv={laenge:"Länge",breite:"Breite",dicke:"Dicke",hoehe:"Höhe",eckradius:"Eckradius",durchmesser:"Durchmesser",wand:"Wand",material:"Material",dichte:"Dichte",abmessungen:"Abmessungen",volumen:"Volumen","masse-wert":"Masse",projektion:"Projektion",darstellung:"Darstellung"},Ev={orthogonal:"orthogonal",perspektivisch:"perspektivisch"},Av={koerper:"Körper",kanten:"Kanten",durchsicht:"Durchsicht"},Tv={standard:"Standard",solidworks:"wie Onshape/SolidWorks"},Rv={kopie:"Kopie",ansicht:"Ansicht",schnitt:"Schnitt"},Cv={titel:"Chat",zu:"zu:","n-elemente":"{n} Elemente",platzhalter:"Frage oder Auftrag …",hinweis:"Zum Beispiel: Steg 40 mm hoch",uebernehmen:"Übernehmen",verwerfen:"Verwerfen",beispiel:{frage:"Der Steg soll 40 mm hoch werden."},antwort:{vorschlag:"Ich schlage diese Änderung vor. Schau dir die Vorschau an.",unklar:"Das habe ich nicht verstanden. Versuche: Steg 40 mm hoch, Kopie vom Steg oder Steg verwerfen.",erledigt:"Erledigt. Du kannst es mit Rückgängig zurücknehmen.",verworfen:"Der Vorschlag ist verworfen."},vorschlag:{wert:"{element}: {feld} auf {nachher}",duplizieren:"{element} duplizieren",verwerfen:"{element} verwerfen",anlegen:"Neues Element anlegen",begruendung:"Simulierter Vorschlag; erst nach dem Übernehmen gilt er."}},Pv={folgt:"{befehl} folgt in einer späteren Stufe.",angelegt:"{name} angelegt",dupliziert:"{name} angelegt",umbenannt:"Umbenannt in {name}",verworfen:"{name} verworfen; mit Rückgängig oder Zurückholen wieder da",zurueckgeholt:"{name} zurückgeholt","wert-gesetzt":"Wert an {name} geändert",umgehaengt:"{name} liegt jetzt in {ziel}","ansicht-gespeichert":"{name} gespeichert",rueckgaengig:"Letzten Schritt zurückgenommen",wiederholt:"Schritt wiederhergestellt",befund:"Befund bei {name}; die anderen Elemente bleiben bedienbar","ziel-waehlen":"Wähle in der Struktur das Ziel.","auswahl-ziel":"Wähle Elemente im Modell oder in der Struktur.","isolieren-ziel":"Wähle zuerst, was du isolieren willst."},kv={"kein-ziel":"Hier kann nichts abgelegt werden.","nur-teile":"Nur Teile und Baugruppen lassen sich umhängen, Schritte bleiben in ihrem Teil.","eigener-nachfahre":"Ein Element kann nicht in sich selbst oder in sein eigenes Teil.","kein-behaelter":"Ein Teil nimmt keine anderen Elemente auf; wähle eine Baugruppe.","schon-darin":"Das Element liegt schon dort."},Lv={titel:"Bausteinkatalog",einleitung:"Jeder Baustein ist hier so zu sehen, wie er im Prototyp wirklich gebaut ist. Wer eine neue Oberfläche baut, nimmt diese Seiten als Maßstab.",zurueck:"Zur Übersicht",ueberschrift:{regel:"Regel",bezug:"Bezug",befehle:"Befehle",tokens:"Tokens"},hell:"Hell",dunkel:"Dunkel",bezug:{muster:"Muster „{name}“ aus dem Musterkatalog.",kandidat:"Kandidat „{name}“, noch kein Muster."},baustein:{zustaende:"Elementzustände",auswahl:"Auswahl","struktur-zeile":"Struktur-Zeile",auge:"Auge",kontextmenue:"Kontextmenü",kontextaktionen:"Kontextaktionen",dropdown:"Dropdown",suche:"Suche",wertfeld:"Wertfeld",griff:"Griff","ziehen-ablegen":"Ziehen und Ablegen",statusanzeige:"Statusanzeige",befund:"Befund",rueckmeldung:"Rückmeldung",entscheidungskarte:"Entscheidungskarte",pfad:"Pfad","dokument-reiter":"Dokument-Reiter",ansichtsleiste:"Ansichtsleiste","fokus-tastatur":"Fokus und Tastatur"},regel:{zustaende:"Ein Element zeigt jeden Zustand über einen festen Kanal, damit sich Zustände nicht verdecken. Die Kontur gehört der Auswahl, dem Überfahren und der anderen Person, und es gewinnt genau eine: ausgewählt vor anderer Person vor überfahren. Status, Sichtbarkeit und Umfeld kommen immer zusätzlich dazu. Der Akzent steht nur für Auswahl und Überfahren.",auswahl:"Es gibt genau eine Auswahl für das ganze Fenster. Struktur, Modell, Eigenschaften und Chat lesen sie und ändern sie nur über dieselben Befehle. Ein Klick wählt, Umschalt fügt hinzu, Strg schaltet um, ein Klick ins Leere hebt auf. Die Eigenschaften zeigen bei mehreren nur das Gemeinsame.","struktur-zeile":"Eine Zeile zeigt Symbol, Name, Status und das Auge, alles immer sichtbar. Die gewählte Zeile trägt die Akzentfläche, überfahren trägt die leise Fläche. Ein Doppelklick oder Enter macht das Element aktiv. Zeilen lassen sich zum Umhängen ziehen.",auge:"Das Auge ist in jeder Zeile immer sichtbar und nicht erst beim Überfahren. Es blendet nur für diese Person aus; der Export bleibt davon unberührt. Alles einblenden holt alles zurück. Die Sichtbarkeit ist Ansicht und kein Schritt im Verlauf.",kontextmenue:"Das Kontextmenü entsteht aus dem Befehlsregister und ist in Struktur und Modell für dieselbe Auswahl gleich. Es ist nach Familien gruppiert, jede Gruppe zeigt höchstens zwölf Einträge, Unwesentliches steht hinter „Mehr …“. Innerhalb einer Gruppe gilt der Rang. Kürzel stehen neben dem Eintrag.",kontextaktionen:"Die Leiste über dem Gewählten zeigt die ersten fünf Einträge des Kontextmenüs nach Rang, keine eigene Liste. Sie ersetzt die Werkzeugleiste. Zahlen stehen nie hier, sondern in den Eigenschaften.",dropdown:"Ein Dropdown der Menüleiste zeigt alle Befehle seiner Familie in Untergruppen mit je höchstens zwölf Einträgen. Der Inhalt kommt aus dem Register, nicht von Hand. Nicht passende Einträge sind grau. Das Kürzel steht neben jedem Eintrag.",suche:"Die Suche findet Befehle und Inhalte in einem Feld und öffnet mit Strg und K. Ergebnisse kommen aus dem Befehlsregister und zeigen ihr Kürzel. Pfeiltasten wählen, Enter führt aus, Esc schließt. Befehle ohne anderen Ort, etwa die Hilfe, findet man nur hier.",wertfeld:"Jede Zahl steht als Größe mit Einheit in einem Wertfeld. Man tippt den Wert, auch mit Einheit oder einer einfachen Formel, und übernimmt mit Enter; Esc stellt den alten Wert wieder her. Während des Tippens ändert sich das Modell live. Eine unlesbare Eingabe zeigt einen Befund am Feld.",griff:"Am gewählten Element steht ein Griff für seine Länge, zum Beispiel die Dicke. Beim Ziehen springt der Wert in ganzen Millimetern, die Zahl steht am Zeiger. Tippt man dabei Ziffern, gilt dieser genaue Wert. Loslassen oder Enter übernimmt, Esc bricht ab.","ziehen-ablegen":"Eine Zeile lässt sich auf eine andere ziehen, um sie umzuhängen. Ein erlaubtes Ziel trägt die Akzentfläche, ein nicht erlaubtes die Fehlerfläche, und der Grund steht in der Rückmeldezeile. Teile und Baugruppen dürfen in eine Baugruppe, Schritte bleiben in ihrem Teil. Esc bricht das Ziehen ab, dann ändert sich nichts.",statusanzeige:"Ein Status erscheint immer als Farbe, Symbol und Wort zusammen. Er steht an der Zeile in der Struktur und am Element im Modell. Rechnet, fehlerhaft und pausiert sind die drei Zustände. Ein Fehler eines Elements legt nie das ganze Modell lahm.",befund:"Ein Befund sagt, was los ist, wo es ist und wie man es behebt. Er steht im Panel Befunde, bei einer falschen Eingabe auch am Wertfeld. Die Korrektur ist ein Knopf, zum Beispiel „Letzten gültigen Wert setzen“. Alle anderen Elemente bleiben bedienbar.",rueckmeldung:"Bestätigungen und Hinweise stehen leise in der schmalen Zeile ganz unten. Es gibt keine Dialoge und keine Meldungen an anderen Orten. Der Text sagt knapp, was geschehen ist, ohne Ausrufezeichen. Verworfenes lässt sich mit Rückgängig zurückholen.",entscheidungskarte:"Jede Änderung der KI erscheint als Karte mit Vorschau, nie direkt. Die Karte nennt, was sich ändert, mit Wert vorher und nachher. Übernehmen ist die eine Hauptaktion und trägt den Akzent. Erst nach dem Übernehmen steht derselbe Befehl im Verlauf, mit der Quelle KI.",pfad:"Der Pfad zeigt, wo man gerade arbeitet: von der Wurzel bis zum aktiven Element. Ein Klick auf ein Glied geht dorthin zurück, ein Klick auf die Wurzel verlässt das aktive Element. Das letzte Glied ist hervorgehoben. Fertig und Esc führen auf demselben Weg heraus.","dokument-reiter":"Die Reiter über dem Modell sind Dokumente, nichts anderes. Es gibt keine Befehlsreiter und keine Reiter in Reitern. Der gewählte Reiter ist hervorgehoben. Arbeitet eine andere Person in einem Reiter, zeigt er ein kleines Personensymbol.",ansichtsleiste:"Die Ansichtsleiste im Modell enthält Einpassen, Auf Auswahl zoomen, Isolieren, Alles einblenden, Projektion und Darstellung. Weitere Ansichten und das Speichern einer Ansicht stehen im Menü am Rand der Leiste. Alles hier ist Ansicht und ändert nie den Graphen. Eine gespeicherte Ansicht wird ausdrücklich als Element abgelegt.","fokus-tastatur":"Jede Zone ist per Tab oder F6 erreichbar, und der Fokus ist als Ring in der Akzentfarbe sichtbar. Esc schließt immer genau eine Ebene. Es gibt höchstens fünfzehn Kürzel, und alle stehen im Befehlsregister und neben dem Befehl im Menü. Nichts ist nur mit der Maus erreichbar."},zustand:{hover:"Überfahren",ausgewaehlt:"Ausgewählt",andere:"Von anderen bearbeitet",aktiv:"Aktiv",gedimmt:"Umfeld des aktiven Elements",ausgeblendet:"Ausgeblendet",fehlerhaft:"Fehlerhaft",pausiert:"Pausiert",rechnet:"Rechnet"},bsp:{"auswahl-struktur":"Struktur mit zwei gewählten Zeilen","auswahl-eigenschaften":"Eigenschaften mit „gemischt“","auswahl-chat":"Chat-Kontext","auge-an":"Sichtbar","auge-aus":"Ausgeblendet",kontextmenue:"Kontextmenü auf einem Schritt","ein-element":"Ein Element gewählt",mehrere:"Mehrere Elemente gewählt",suche:"Suche mit Eingabe „ver“",wert:"Wertfeld",gemischt:"Unterschiedliche Werte",fehler:"Unlesbare Eingabe",griff:"Griff mit Zahl am Zeiger","ablegen-ok":"Erlaubtes Ziel","ablegen-nein":"Nicht erlaubtes Ziel",rueckmeldung:"Leise Zeile",karte:"Vorschlag der KI (simuliert)",pfad:"Aktives Teil in einer Baugruppe","pfad-wurzel":"Nichts aktiv",reiter:"Zwei Dokumente",ansichtsleiste:"Ansichtsleiste",fokus:"Zeile mit Fokusring",kuerzel:"Alle Kürzel"}},Dv={element:{anlegen:"Neu anlegen",duplizieren:"Duplizieren",umbenennen:"Umbenennen",verwerfen:"Verwerfen",zurueckholen:"Zurückholen","wert-setzen":"Wert setzen","parameter-anlegen":"Parameter anlegen",pausieren:"Berechnung pausieren",fortsetzen:"Berechnung fortsetzen",ausblenden:"Ausblenden",einblenden:"Einblenden",umhaengen:"Umhängen (Ziel wählen)",aktivieren:"Aktivieren",verlassen:"Aktives Element verlassen"},dokument:{oeffnen:"Öffnen",schliessen:"Dokument schließen",wechseln:"Dokument wechseln"},wurzel:{setzen:"Wurzel der Struktur wählen"},einstellungen:{oeffnen:"Einstellungen öffnen"},projekt:{teilen:"Projekt teilen",einladen:"Person einladen"},bearbeiten:{rueckgaengig:"Rückgängig",wiederholen:"Wiederholen",einfuegen:"Einfügen"},auswahl:{duplizieren:"Auswahl duplizieren",verwerfen:"Auswahl verwerfen",alles:"Alles auswählen",aufheben:"Auswahl aufheben",umkehren:"Auswahl umkehren",setzen:"Auswählen",hinzufuegen:"Zur Auswahl hinzufügen",umschalten:"Auswahl umschalten",aehnliche:"Ähnliche auswählen",kantenschleife:"Kantenschleife auswählen",ausblenden:"Auswahl ausblenden"},ansicht:{einpassen:"Alles einpassen","auf-auswahl":"Auf Auswahl zoomen",projektion:"Perspektive oder Orthogonal",vorne:"Ansicht von vorne",oben:"Ansicht von oben",isometrisch:"Isometrische Ansicht",schnitt:"Schnittansicht",isolieren:"Isolieren","alles-einblenden":"Alles einblenden",verworfenes:"Verworfenes zeigen",ergebnis:"Ansicht Ergebnis","alle-entwuerfe":"Ansicht Alle Entwürfe",speichern:"Ansicht speichern",anwenden:"Gespeicherte Ansicht anwenden"},darstellung:{wechseln:"Darstellung wechseln"},sichtbarkeit:{"nur-dieses":"Nur dieses zeigen","farbe-setzen":"Anzeigefarbe setzen"},fenster:{struktur:"Struktur ein- oder ausblenden",panel:"Panel ein- oder ausblenden",rechts:"Rechte Seitenleiste ein- oder ausblenden","naechste-zone":"Nächste Zone",teilen:"Fenster teilen (zwei Teile nebeneinander)"},suche:{oeffnen:"Befehlssuche öffnen"},thema:{umschalten:"Hell oder Dunkel"},einstellung:{navigationsprofil:"Navigationsprofil wählen"},katalog:{oeffnen:"Katalog öffnen"},hilfe:{"befehle-zeigen":"Alle Befehle zeigen",einfuehrung:"Einführung starten"},baugruppe:{anlegen:"Baugruppe anlegen","instanz-anlegen":"Instanz einer Komponente anlegen","variante-waehlen":"Variante wählen","kollision-pruefen":"Kollision prüfen",fixieren:"Teil fixieren","komponente-anlegen":"Komponente aus Teil anlegen"},verbindung:{anlegen:"Verbindung anlegen","verbindungspunkt-setzen":"Verbindungspunkt setzen",bewegen:"Innerhalb der Freiheitsgrade bewegen"},simulation:{lager:"Lager setzen (simuliert)",kraft:"Kraft setzen (simuliert)",ergebnis:"Ergebnis zeigen (simuliert)"},chat:{senden:"Nachricht senden",uebernehmen:"Vorschlag übernehmen",verwerfen:"Vorschlag verwerfen"},task:{wechseln:"Aufgabe wechseln"}},Iv={zone:sv,menue:av,task:ov,simuliert:lv,suche:cv,familie:uv,untergruppe:hv,struktur:dv,modell:fv,aktiv:pv,pfad:mv,ansichtsleiste:gv,anwesenheit:vv,befund:_v,status:xv,panel:bv,wert:Sv,eigenschaften:Mv,gruppe:yv,feld:wv,projektion:Ev,darstellung:Av,profil:Tv,name:Rv,chat:Cv,rueck:Pv,dnd:kv,katalog:Lv,befehl:Dv},Nv={menueleiste:"Menu bar",taskleiste:"Task bar",struktur:"Structure",modell:"Model",eigenschaften:"Properties",chat:"Chat",panel:"Panel",rueckmeldung:"Feedback"},zv={start:"Start",folgt:"soon",mehr:"More …"},Uv={modellieren:"Modeling",simulation:"Simulation (simulated)",shop:"Shop (soon)"},Fv="simulated",Ov={platzhalter:"Search commands and content",befehle:"Commands",inhalte:"Content",nichts:"Nothing found"},Bv={Datei:"File",Bearbeiten:"Edit",Auswahl:"Selection",Ansicht:"View",Sichtbarkeit:"Visibility","Ansicht speichern":"Saved views",Fenster:"Window",Hilfe:"Help",Baugruppe:"Assembly",Simulation:"Simulation",Chat:"Chat"},Vv={Neu:"New",Öffnen:"Open",Projekt:"Project",Verlauf:"History",Element:"Element",Werte:"Values",Berechnung:"Calculation",Auswahl:"Selection",Befehle:"Set selection",Regeln:"By rule",Zonen:"Zones",Suche:"Search",Fenster:"Window",Einstellungen:"Settings",Hierarchie:"Hierarchy",Verbinden:"Connect",Studie:"Study",Blick:"View angle",Darstellung:"Display",Stand:"State",Sichtbarkeit:"Visibility",Gespeichert:"Saved",Hilfe:"Help",Chat:"Chat",Weitere:"More"},Hv={titel:"Structure",wurzel:"Root",leer:"Nothing here yet. Create your first part.","leer-simulation":"No study yet. Simulation is a placeholder and simulated.",verworfen:"discarded"},Gv={leer:"The model is empty."},Wv={fertig:"Done"},Xv={titel:"Path"},qv={titel:"View",mehr:"More views"},Yv={person:"Test person B",kuerzel:"B"},$v={"zustand-unbekannt":"State unknown",korrektur:"Set last valid value","bohrung-zu-gross":"The diameter {wert} is too large; below {grenze} the hole is valid.","steg-ohne-hoehe":"The rib needs a height above {grenze}."},Zv={fehlerhaft:"faulty",pausiert:"paused",rechnet:"calculating"},Kv={befunde:"Findings","keine-befunde":"No findings. Everything is up to date."},Jv={fehler:{"nicht-lesbar":"Value not readable. Example: 12 mm",dimension:"Wrong unit for this field",teilung:"Division by zero is not possible"}},Qv={gemischt:"mixed","n-elemente":"{n} elements","umbenennen-hinweis":"Double-click to rename"},jv={masse:"Dimensions",material:"Material",ergebnis:"Result",ansicht:"View"},e_={laenge:"Length",breite:"Width",dicke:"Thickness",hoehe:"Height",eckradius:"Corner radius",durchmesser:"Diameter",wand:"Wall",material:"Material",dichte:"Density",abmessungen:"Size",volumen:"Volume","masse-wert":"Mass",projektion:"Projection",darstellung:"Display"},t_={orthogonal:"orthographic",perspektivisch:"perspective"},n_={koerper:"Solid",kanten:"Edges",durchsicht:"See-through"},i_={standard:"Default",solidworks:"like Onshape/SolidWorks"},r_={kopie:"copy",ansicht:"View",schnitt:"Section"},s_={titel:"Chat",zu:"to:","n-elemente":"{n} elements",platzhalter:"Question or task …",hinweis:"For example: rib 40 mm high",uebernehmen:"Accept",verwerfen:"Discard",beispiel:{frage:"The rib should become 40 mm high."},antwort:{vorschlag:"I propose this change. Have a look at the preview.",unklar:"I did not understand. Try: rib 40 mm high, copy of the rib or discard the rib.",erledigt:"Done. You can take it back with undo.",verworfen:"The proposal is discarded."},vorschlag:{wert:"{element}: {feld} to {nachher}",duplizieren:"Duplicate {element}",verwerfen:"Discard {element}",anlegen:"Create a new element",begruendung:"Simulated proposal; it applies only after you accept."}},a_={folgt:"{befehl} comes in a later stage.",angelegt:"{name} created",dupliziert:"{name} created",umbenannt:"Renamed to {name}",verworfen:"{name} discarded; bring it back with undo or restore",zurueckgeholt:"{name} restored","wert-gesetzt":"Value of {name} changed",umgehaengt:"{name} now sits in {ziel}","ansicht-gespeichert":"{name} saved",rueckgaengig:"Last step undone",wiederholt:"Step restored",befund:"Finding at {name}; the other elements stay usable","ziel-waehlen":"Choose the target in the structure.","auswahl-ziel":"Pick elements in the model or the structure.","isolieren-ziel":"Select what you want to isolate first."},o_={"kein-ziel":"Nothing can be dropped here.","nur-teile":"Only parts and assemblies can be moved; steps stay in their part.","eigener-nachfahre":"An element cannot go into itself or into its own part.","kein-behaelter":"A part cannot hold other elements; choose an assembly.","schon-darin":"The element is already there."},l_={titel:"Component catalog",einleitung:"Each component is shown here exactly as it is built in the prototype. Whoever builds a new screen uses these pages as the yardstick.",zurueck:"Back to overview",ueberschrift:{regel:"Rule",bezug:"Reference",befehle:"Commands",tokens:"Tokens"},hell:"Light",dunkel:"Dark",bezug:{muster:"Pattern “{name}” from the pattern catalog.",kandidat:"Candidate “{name}”, not yet a pattern."},baustein:{zustaende:"Element states",auswahl:"Selection","struktur-zeile":"Structure row",auge:"Eye",kontextmenue:"Context menu",kontextaktionen:"Context actions",dropdown:"Dropdown",suche:"Search",wertfeld:"Value field",griff:"Handle","ziehen-ablegen":"Drag and drop",statusanzeige:"Status display",befund:"Finding",rueckmeldung:"Feedback",entscheidungskarte:"Decision card",pfad:"Path","dokument-reiter":"Document tab",ansichtsleiste:"View bar","fokus-tastatur":"Focus and keyboard"},regel:{zustaende:"An element shows every state through a fixed channel so states never hide each other. The outline belongs to selection, hovering and another person, and exactly one wins: selected before other person before hovered. Status, visibility and surroundings always come on top. The accent stands only for selection and hovering.",auswahl:"There is exactly one selection for the whole window. Structure, model, properties and chat read it and change it only through the same commands. A click selects, Shift adds, Ctrl toggles, a click into empty space clears. With several elements the properties show only what they share.","struktur-zeile":"A row shows icon, name, status and the eye, all always visible. The selected row carries the accent surface, hovering carries the quiet surface. A double-click or Enter makes the element active. Rows can be dragged to move them.",auge:"The eye is always visible in every row, not only on hover. It hides only for this person; export stays untouched. Show everything brings everything back. Visibility is view and not a step in the history.",kontextmenue:"The context menu is generated from the command register and is the same in structure and model for the same selection. It is grouped by family, each group shows at most twelve entries, minor ones sit behind “More …”. Within a group the rank applies. Shortcuts stand next to the entry.",kontextaktionen:"The bar above the selection shows the first five entries of the context menu by rank, not a list of its own. It replaces the toolbar. Numbers never appear here but in the properties.",dropdown:"A dropdown of the menu bar shows all commands of its family in subgroups with at most twelve entries each. The content comes from the register, not by hand. Entries that do not fit are grey. The shortcut stands next to each entry.",suche:"Search finds commands and content in one field and opens with Ctrl and K. Results come from the command register and show their shortcut. Arrow keys choose, Enter runs, Esc closes. Commands without another place, such as help, are found only here.",wertfeld:"Every number stands as a quantity with a unit in a value field. You type the value, also with a unit or a simple formula, and accept with Enter; Esc restores the old value. While typing the model changes live. An unreadable entry shows a finding at the field.",griff:"On the selected element there is a handle for its length, for example the thickness. While dragging the value jumps in whole millimetres, the number stands at the pointer. Typing digits then sets that exact value. Releasing or Enter accepts, Esc cancels.","ziehen-ablegen":"A row can be dragged onto another to move it. A permitted target carries the accent surface, a forbidden one the error surface, and the reason appears in the feedback line. Parts and assemblies may go into an assembly, steps stay in their part. Esc cancels the drag, then nothing changes.",statusanzeige:"A status always appears as colour, icon and word together. It stands at the row in the structure and at the element in the model. Calculating, faulty and paused are the three states. A fault in one element never paralyses the whole model.",befund:"A finding says what is wrong, where, and how to fix it. It stands in the findings panel, and for a wrong entry also at the value field. The correction is a button, for example “Set last valid value”. All other elements stay usable.",rueckmeldung:"Confirmations and hints stand quietly in the narrow line at the very bottom. There are no dialogs and no messages anywhere else. The text says briefly what happened, without exclamation marks. Discarded items can be brought back with undo.",entscheidungskarte:"Every change by the AI appears as a card with a preview, never directly. The card says what changes, with the value before and after. Accept is the one main action and carries the accent. Only after accepting does the same command appear in the history, with the source AI.",pfad:"The path shows where you are working: from the root to the active element. A click on a link goes back there, a click on the root leaves the active element. The last link is emphasised. Done and Esc lead out the same way.","dokument-reiter":"The tabs above the model are documents, nothing else. There are no command tabs and no tabs within tabs. The chosen tab is emphasised. If another person works in a tab, it shows a small person icon.",ansichtsleiste:"The view bar in the model contains fit, zoom to selection, isolate, show everything, projection and display. More views and saving a view are in the menu at the edge of the bar. Everything here is view and never changes the graph. A saved view is stored explicitly as an element.","fokus-tastatur":"Every zone is reachable by Tab or F6, and focus is visible as a ring in the accent colour. Esc always closes exactly one level. There are at most fifteen shortcuts, and all stand in the command register and next to the command in the menu. Nothing is reachable by mouse alone."},zustand:{hover:"Hovered",ausgewaehlt:"Selected",andere:"Edited by others",aktiv:"Active",gedimmt:"Surroundings of the active element",ausgeblendet:"Hidden",fehlerhaft:"Faulty",pausiert:"Paused",rechnet:"Calculating"},bsp:{"auswahl-struktur":"Structure with two selected rows","auswahl-eigenschaften":"Properties with “mixed”","auswahl-chat":"Chat context","auge-an":"Visible","auge-aus":"Hidden",kontextmenue:"Context menu on a step","ein-element":"One element selected",mehrere:"Several elements selected",suche:"Search with input “ver”",wert:"Value field",gemischt:"Different values",fehler:"Unreadable entry",griff:"Handle with number at the pointer","ablegen-ok":"Permitted target","ablegen-nein":"Forbidden target",rueckmeldung:"Quiet line",karte:"AI proposal (simulated)",pfad:"Active part in an assembly","pfad-wurzel":"Nothing active",reiter:"Two documents",ansichtsleiste:"View bar",fokus:"Row with focus ring",kuerzel:"All shortcuts"}},c_={element:{anlegen:"Create new",duplizieren:"Duplicate",umbenennen:"Rename",verwerfen:"Discard",zurueckholen:"Restore","wert-setzen":"Set value","parameter-anlegen":"Create parameter",pausieren:"Pause calculation",fortsetzen:"Resume calculation",ausblenden:"Hide",einblenden:"Show",umhaengen:"Move (choose target)",aktivieren:"Activate",verlassen:"Leave active element"},dokument:{oeffnen:"Open",schliessen:"Close document",wechseln:"Switch document"},wurzel:{setzen:"Choose root of the structure"},einstellungen:{oeffnen:"Open settings"},projekt:{teilen:"Share project",einladen:"Invite person"},bearbeiten:{rueckgaengig:"Undo",wiederholen:"Redo",einfuegen:"Paste"},auswahl:{duplizieren:"Duplicate selection",verwerfen:"Discard selection",alles:"Select all",aufheben:"Clear selection",umkehren:"Invert selection",setzen:"Select",hinzufuegen:"Add to selection",umschalten:"Toggle selection",aehnliche:"Select similar",kantenschleife:"Select edge loop",ausblenden:"Hide selection"},ansicht:{einpassen:"Fit all","auf-auswahl":"Zoom to selection",projektion:"Perspective or orthographic",vorne:"Front view",oben:"Top view",isometrisch:"Isometric view",schnitt:"Section view",isolieren:"Isolate","alles-einblenden":"Show everything",verworfenes:"Show discarded",ergebnis:"Result view","alle-entwuerfe":"All drafts view",speichern:"Save view",anwenden:"Apply saved view"},darstellung:{wechseln:"Change display"},sichtbarkeit:{"nur-dieses":"Show only this","farbe-setzen":"Set display color"},fenster:{struktur:"Show or hide structure",panel:"Show or hide panel",rechts:"Show or hide right sidebar","naechste-zone":"Next zone",teilen:"Split window"},suche:{oeffnen:"Open command search"},thema:{umschalten:"Light or dark"},einstellung:{navigationsprofil:"Choose navigation profile"},katalog:{oeffnen:"Open catalog"},hilfe:{"befehle-zeigen":"Show all commands",einfuehrung:"Start introduction"},baugruppe:{anlegen:"Create assembly","instanz-anlegen":"Create instance of a component","variante-waehlen":"Choose variant","kollision-pruefen":"Check collision",fixieren:"Fix part","komponente-anlegen":"Create component from part"},verbindung:{anlegen:"Create connection","verbindungspunkt-setzen":"Set connection point",bewegen:"Move within degrees of freedom"},simulation:{lager:"Add support",kraft:"Add force",ergebnis:"Show result"},chat:{senden:"Send message",uebernehmen:"Accept proposal",verwerfen:"Reject proposal"},task:{wechseln:"Switch task"}},u_={zone:Nv,menue:zv,task:Uv,simuliert:Fv,suche:Ov,familie:Bv,untergruppe:Vv,struktur:Hv,modell:Gv,aktiv:Wv,pfad:Xv,ansichtsleiste:qv,anwesenheit:Yv,befund:$v,status:Zv,panel:Kv,wert:Jv,eigenschaften:Qv,gruppe:jv,feld:e_,projektion:t_,darstellung:n_,profil:i_,name:r_,chat:s_,rueck:a_,dnd:o_,katalog:l_,befehl:c_};function h_(n){const e=new URLSearchParams(n).get("sprache");return e==="en"||e==="schluessel"?e:"de"}function d_(n,e){const t=n[e];if(typeof t=="string")return t;let i=n;for(const r of e.split(".")){if(typeof i!="object")return;i=i[r]}return typeof i=="string"?i:void 0}function f_(n){return(e,t)=>{if(n==="schluessel")return e;const r=d_(n==="en"?u_:Iv,e)??e;return t?r.replace(/\{(\w+)\}/g,(s,a)=>String(t[a]??"")):r}}function Fi(n,e){const t=typeof navigator<"u"&&/Mac|iPhone|iPad/.test(navigator.userAgent),i=n.split("+"),r=i[i.length-1]??"",s=i.slice(0,-1);if(t){const o={Mod:"⌘",Umschalt:"⇧",Shift:"⇧",Alt:"⌥"};return s.map(l=>o[l]??l).join("")+r}const a={Mod:e==="en"?"Ctrl":"Strg",Umschalt:e==="en"?"Shift":"Umschalt",Shift:e==="en"?"Shift":"Umschalt",Alt:"Alt"};return[...s.map(o=>a[o]??o),r].join("+")}/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p_={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pu=([n,e,t])=>{const i=document.createElementNS("http://www.w3.org/2000/svg",n);return Object.keys(e).forEach(r=>{i.setAttribute(r,String(e[r]))}),t?.length&&t.forEach(r=>{const s=pu(r);i.appendChild(s)}),i},m_=(n,e={})=>{const i={...p_,...e};return pu(["svg",i,n])};/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g_=[["path",{d:"m5 12 7-7 7 7"}],["path",{d:"M12 19V5"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v_=[["path",{d:"M12 5v16"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const __=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x_=[["path",{d:"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"}],["path",{d:"m7 16.5-4.74-2.85"}],["path",{d:"m7 16.5 5-3"}],["path",{d:"M7 16.5v5.17"}],["path",{d:"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"}],["path",{d:"m17 16.5-5-3"}],["path",{d:"m17 16.5 4.74-2.85"}],["path",{d:"M17 16.5v5.17"}],["path",{d:"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"}],["path",{d:"M12 8 7.26 5.15"}],["path",{d:"m12 8 4.74-2.85"}],["path",{d:"M12 13.5V8"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b_=[["path",{d:"M20 6 9 17l-5-5"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S_=[["path",{d:"m6 9 6 6 6-6"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M_=[["path",{d:"m9 18 6-6-6-6"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y_=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w_=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"12",cy:"12",r:"10"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E_=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"10",x2:"10",y1:"15",y2:"9"}],["line",{x1:"14",x2:"14",y1:"15",y2:"9"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A_=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T_=[["path",{d:"M10 22v-8"}],["path",{d:"M2.336 8.89 10 14l11.715-7.029"}],["path",{d:"M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R_=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C_=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P_=[["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k_=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L_=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D_=[["path",{d:"M12 2v4"}],["path",{d:"m16.2 7.8 2.9-2.9"}],["path",{d:"M18 12h4"}],["path",{d:"m16.2 16.2 2.9 2.9"}],["path",{d:"M12 18v4"}],["path",{d:"m4.9 19.1 2.9-2.9"}],["path",{d:"M2 12h4"}],["path",{d:"m4.9 4.9 2.9 2.9"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I_=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N_=[["path",{d:"M4 5h16"}],["path",{d:"M4 12h16"}],["path",{d:"M4 19h16"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z_=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 15h18"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U_=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 3v18"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F_=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M15 3v18"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O_=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B_=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V_=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H_=[["path",{d:"m15 14 5-5-5-5"}],["path",{d:"M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G_=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W_=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X_=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{d:"M20 2v4"}],["path",{d:"M22 4h-4"}],["circle",{cx:"4",cy:"20",r:"2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q_=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y_=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $_=[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z_=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K_=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]],J_="http://www.w3.org/2000/svg",Q_=new Set(["svg","path","line","rect","circle","polygon","polyline","g","text"]);function z(n,e={},...t){const i=Q_.has(n)?document.createElementNS(J_,n):document.createElement(n);for(const[r,s]of Object.entries(e))s==null||s===!1||(r==="class"?i.setAttribute("class",String(s)):i.setAttribute(r,s===!0?"":String(s)));n==="input"&&e.value!==void 0&&(i.value=String(e.value));for(const r of t)r===null||r===!1||r===void 0||i.append(typeof r=="string"?document.createTextNode(r):r);return i}const j_={"arrow-up":g_,"book-open":v_,box:__,boxes:x_,check:b_,"chevron-down":S_,"chevron-right":M_,"circle-alert":y_,"circle-dot":w_,"circle-pause":E_,copy:A_,cuboid:T_,eye:C_,"eye-off":R_,focus:P_,"folder-open":k_,layers:L_,loader:D_,maximize:I_,menu:N_,"panel-bottom":z_,"panel-left":U_,"panel-right":F_,pencil:O_,play:B_,plus:V_,"redo-2":H_,search:G_,settings:W_,sparkles:X_,square:q_,"trash-2":Y_,"undo-2":$_,user:Z_,x:K_};function _t(n,e=16){const t=m_(j_[n],{width:e,height:e,"stroke-width":2,"aria-hidden":"true"}),i=z("span",{class:"symbol","data-icon":n});return i.append(t),i}const er=n=>n instanceof Element?n.getAttribute("data-key")??null:null;function ex(n,e){return n.nodeType!==e.nodeType?!1:n instanceof Element&&e instanceof Element?n.nodeName===e.nodeName&&er(n)===er(e):!0}function tx(n,e){for(const t of[...n.attributes])t.name!=="data-editiert"&&!e.hasAttribute(t.name)&&n.removeAttribute(t.name);for(const t of[...e.attributes])n.getAttribute(t.name)!==t.value&&n.setAttribute(t.name,t.value)}function jr(n,e){if(n instanceof Text&&e instanceof Text){n.nodeValue!==e.nodeValue&&(n.nodeValue=e.nodeValue);return}if(!(n instanceof Element)||!(e instanceof Element))return;if(tx(n,e),n instanceof HTMLInputElement&&e instanceof HTMLInputElement){!(document.activeElement===n&&n.hasAttribute("data-editiert"))&&n.value!==e.value&&(n.value=e.value);return}const t=new Set,i=[...n.childNodes],r=new Map;for(const o of i){const l=er(o);l!==null&&r.set(l,o)}let s=0;const a=[...e.childNodes];for(const[o,l]of a.entries()){const c=er(l);let u;if(c!==null)u=r.get(c);else for(;s<i.length;){const h=i[s];if(s+=1,!t.has(h)&&er(h)===null&&ex(h,l)){u=h;break}}if(u){t.add(u),jr(u,l);const h=n.childNodes[o];h!==u&&n.insertBefore(u,h??null)}else{const h=n.childNodes[o];n.insertBefore(l,h??null),t.add(l)}}for(const o of[...n.childNodes])t.has(o)||n.removeChild(o)}const nx=8,ix=12;function rx(n,e){const t=e.trim().toLowerCase(),i=s=>n.t(s.titel).toLowerCase();return t?n.register.filter(s=>i(s).includes(t)).sort((s,a)=>{const o=i(s).startsWith(t)?0:1,l=i(a).startsWith(t)?0:1;return o-l||i(s).length-i(a).length||s.rang-a.rang}):[...n.register].sort((s,a)=>s.rang-a.rang)}function mu(n){const e=rx(n,n.suche.text);return n.suche.alle?e:e.slice(0,n.suche.text.trim()?ix:nx)}function gu(n){const e=mu(n),t=n.suche.text.trim().toLowerCase(),i=t?At(n.dokument()).filter(s=>s.id!==n.dokument().id&&s.meta.name.toLowerCase().includes(t)).slice(0,4):[],r=Math.min(n.suche.index,Math.max(0,e.length-1));return z("div",{class:"popup suche-popup",role:"listbox","data-overlay":"suche","data-ort":"suche","data-weg":"suche","data-muster":"Suche"},z("input",{type:"text",class:"suche-eingabe","data-suchfeld":"","data-editiert":"",value:n.suche.text,placeholder:n.t("suche.platzhalter"),"aria-label":n.t("suche.platzhalter"),autocomplete:"off"}),z("div",{class:"ergebnisse","data-text":n.suche.text},z("div",{class:"gruppenkopf"},n.t("suche.befehle")),...e.map((s,a)=>z("button",{type:"button",role:"option",class:"eintrag","data-befehl":s.id,"data-key":`s-${s.id}`,"aria-selected":a===r?"true":"false","data-akzent":a===r?"auswahl":null,"data-folgt":s.folgt?"true":null,tabindex:"-1"},z("span",{class:"titel"},n.t(s.titel)),s.folgt?z("span",{class:"folgt"},n.t("menue.folgt")):null,s.kuerzel?z("kbd",{},Fi(s.kuerzel,n.sprache)):null)),e.length===0&&i.length===0?z("div",{class:"leer","data-key":"keine"},n.t("suche.nichts")):null,i.length?z("div",{class:"gruppenkopf","data-key":"kopf-inhalte"},n.t("suche.inhalte")):null,...i.map(s=>z("button",{type:"button",role:"option",class:"eintrag","data-suche-element":s.id,"data-key":`e-${s.id}`,"aria-selected":"false",tabindex:"-1"},z("span",{class:"titel"},s.meta.name)))))}const Ki=Object.keys(fu),vu="cee-prototyp-graph";class _u{constructor(e,t,i,r=Li,s=ws()){this.t=e,this.sprache=t,this.tempo=i,this.register=r,this.projekt=s,this.dok=s.content[0]?.id??""}projekt;dok;protokoll=[];verlaeufe=new Map;vorschau=null;auswahl=[];hover=null;aktiv=null;isoliert=null;ausgeblendet=new Set;verworfenesZeigen=!1;darstellung="koerper";projektionsart="orthogonal";profil=Ki[0]??"";zonen={struktur:!0,panel:!1,rechts:!0};task="modellieren";thema="hell";menue=null;kontextMenue=null;suche={offen:!1,text:"",index:0,alle:!1,fokussiert:!1};umbenennen=null;umbenennenFokussiert=!1;umhaengenModus=null;fokusZone=null;rueckmeldung=null;unbekannterZustand=!1;zustandName="";eingabenWegMerken="menue";tastenfokus=!1;griff=null;dnd=null;status=new Map;rechenzeitMs=0;andere={aktiv:!1,dok:"halter",element:"steg"};chat={nachrichten:[],eingabe:"",vorschlag:null};katalogOffen=null;szene=null;lauscher=[];rendernLaeuft=!1;beiRendern(e){this.lauscher.push(e)}rendern(){this.rendernLaeuft||(this.rendernLaeuft=!0,queueMicrotask(()=>{this.rendernLaeuft=!1;for(const e of this.lauscher)e()}))}rendernSofort(){for(const e of this.lauscher)e()}dokument(){return this.projekt.content.find(e=>e.id===this.dok)??this.projekt.content[0]}angezeigtesDokument(){const e=this.dokument();if(!this.vorschau)return e;const t=cn(e),i=bt(t,this.vorschau.id);return i&&(i.params[this.vorschau.name]=this.vorschau.wert),t}find(e){return bt(this.dokument(),e)}name(e){return this.find(e)?.meta.name??e}modell(){return cn(this.projekt)}wurzel(){return this.dokument()}verlauf(){let e=this.verlaeufe.get(this.dok);return e||(e={zurueck:[],vor:[]},this.verlaeufe.set(this.dok,e)),e}verlaufLaenge(){return this.verlauf().zurueck.length}kannRueckgaengig=()=>this.verlauf().zurueck.length>0;kannWiederholen=()=>this.verlauf().vor.length>0;speichern(){try{window.localStorage.setItem(vu,JSON.stringify(this.projekt))}catch{}}aendern(e){const t=this.dokument(),i=cn(t);if(e(i),JSON.stringify(i)===JSON.stringify(t))return!1;const r=this.verlauf();return r.zurueck.push(cn(t)),r.vor=[],this.projekt.content=this.projekt.content.map(s=>s.id===t.id?i:s),this.speichern(),!0}ersetzeDokument(e){this.projekt.content=this.projekt.content.map(t=>t.id===e.id?e:t),this.speichern()}auswahlIds(){return[...new Set(this.auswahl.map(e=>e.element_id))]}bereichElement(){return(this.aktiv?this.find(this.aktiv):void 0)??this.dokument()}zielFuerTreffer(e){const t=this.bereichElement(),i=Fn(t,e);if(!i.length)return null;if(i.length===1)return t.content.length?null:t.id;const r=i.slice(1);return t.type==="teil"?r[0].id:(r.find(a=>a.type==="teil")??r[0]).id}waehlbareIds(){const e=this.bereichElement();return(e.type==="teil"||e.content.every(i=>i.type!=="teil")?e.content:e.content.flatMap(i=>i.type==="baugruppe"?At(i).filter(r=>r.type==="teil"):[i])).filter(i=>!Ht(i)&&!this.istAusgeblendet(i.id)).map(i=>i.id)}istAusgeblendet(e){return this.ausgeblendet.has(e)?!0:Fn(this.dokument(),e).slice(0,-1).some(i=>this.ausgeblendet.has(i.id))}setzeAuswahl(e){this.auswahl=e,this.rendern()}waehle(e,t,i){const r=i?{element_id:e,teil:i}:{element_id:e},s=a=>a.element_id===e&&JSON.stringify(a.teil)===JSON.stringify(i);t==="setzen"?this.auswahl=[r]:t==="hinzufuegen"?this.auswahl.some(s)||(this.auswahl=[...this.auswahl,r]):this.auswahl.some(s)?this.auswahl=this.auswahl.filter(a=>!s(a)):this.auswahl=[...this.auswahl,r],this.rendern()}auswahlart(){const e=this.auswahlIds();if(!e.length)return"keine";if(e.length>1)return"mehrfach";if(this.auswahl.some(i=>i.teil?.art==="kante"))return"kante";const t=this.find(e[0]);return t?Ht(t)?"verworfen":t.type==="view"?"ansicht":t.type==="teil"?"teil":t.type==="baugruppe"?"baugruppe":"schritt":"keine"}gewaehlteElemente(){return this.auswahlIds().map(e=>this.find(e)).filter(e=>!!e)}befunde(){return ms(this.dokument())}istFehlerhaft(e){return this.befunde().some(t=>t.elementId===e)}zustaende(e){const t=this.find(e);if(!t)return[];const i=[],r=this.auswahlIds().includes(e);r&&i.push("ausgewaehlt"),this.andereElemente().includes(e)&&!r&&i.push("andere"),this.hover===e&&!r&&!this.andereElemente().includes(e)&&i.push("hover"),this.aktiv===e?i.push("aktiv"):this.istGedimmt(e)&&i.push("gedimmt"),this.istAusgeblendet(e)&&i.push("ausgeblendet"),Ht(t)&&i.push("verworfen"),this.istFehlerhaft(e)&&i.push("fehlerhaft");const s=this.status.get(e);return(t.meta.pausiert===!0||s==="pausiert")&&i.push("pausiert"),s==="rechnet"&&i.push("rechnet"),i}andereElemente(){return this.andere.aktiv&&this.dok===this.andere.dok&&this.find(this.andere.element)?[this.andere.element]:[]}istGedimmt(e){if(this.isoliert)return!new Set(this.isoliert.flatMap(s=>this.mitNachfahren(s))).has(e);if(!this.aktiv)return!1;const t=new Set(this.mitNachfahren(this.aktiv)),i=Fn(this.dokument(),this.aktiv).map(r=>r.id);return!t.has(e)&&!i.includes(e)}mitNachfahren(e){const t=this.find(e);return t?[t.id,...ki(t).map(i=>i.id)]:[]}darstellungVon(e,t){if(!this.find(e))return null;const r=this.zustaende(e),s=[],a=(l,c,u,h=null,d=null)=>s.push({zustand:l,kanal:c,token:u,strichart:h,breite:d}),o={modell:{hover:"akzent",ausgewaehlt:"akzent",andere:"linie-stark"},struktur:{hover:"flaeche-2",ausgewaehlt:"akzent-flaeche",andere:"text-2"},chat:{hover:"flaeche-2",ausgewaehlt:"akzent-flaeche",andere:"text-2"},pfad:{hover:"flaeche-2",ausgewaehlt:"akzent-flaeche",andere:"text-2"}};for(const l of r)l==="hover"&&a("hover","Kontur",o[t].hover,t==="modell"?"durchgezogen":null,t==="modell"?1:null),l==="ausgewaehlt"&&(a("ausgewaehlt","Kontur",o[t].ausgewaehlt,t==="modell"?"durchgezogen":null,t==="modell"?2:null),t==="struktur"&&a("ausgewaehlt","Kontur","text")),l==="andere"&&a("andere","Kontur",o[t].andere,t==="modell"?"gestrichelt":null,t==="modell"?2:null),l==="aktiv"&&a("aktiv","Umfeld",t==="modell"?"text-3":"schrift.schnitt.halbfett"),l==="gedimmt"&&a("gedimmt","Umfeld","text-3"),l==="ausgeblendet"&&a("ausgeblendet","Sichtbarkeit","text-3"),l==="fehlerhaft"&&a("fehlerhaft","Status","fehler"),l==="pausiert"&&a("pausiert","Status","text-2"),l==="rechnet"&&a("rechnet","Status","text-2");return{zustaende:r,kanaele:s}}pfadGlieder(){const e=this.aktiv??this.dokument().id,t=Fn(this.dokument(),e);return t.length?t:[this.dokument()]}zeilen(){const e=[],t=(i,r)=>{for(const s of i.content)Ht(s)&&!this.verworfenesZeigen||(e.push({element:s,ebene:r}),t(s,r+1))};return t(this.angezeigtesDokument(),0),e}versteckteIds(){const e=new Set;for(const t of At(this.dokument()))(Ht(t)||this.istAusgeblendet(t.id))&&e.add(t.id);if(this.isoliert){const t=new Set(this.isoliert.flatMap(i=>this.mitNachfahren(i)));for(const i of At(this.dokument()))t.has(i.id)||e.add(i.id)}return e}gedimmteIds(){const e=new Set;if(!this.aktiv)return e;for(const t of At(this.dokument()))this.istGedimmt(t.id)&&e.add(t.id);return e}blasseIds(){const e=new Set;for(const t of At(this.dokument()))if(this.istFehlerhaft(t.id)||t.meta.pausiert===!0)for(const i of this.mitNachfahren(t.id))e.add(i);return e}teilErgebnis(){const e=this.angezeigtesDokument(),t=this.aktiv?bt(e,this.aktiv):void 0,r=[...t?Fn(e,t.id):[]].reverse().find(s=>s.type==="teil");return On(r??e)}huelle(e){const t=this.find(e);return t?lc(t,On(this.angezeigtesDokument()).koerper):null}wirkungen=new Map;registriere(e,t){this.wirkungen.set(e,t)}befehl(e){return this.register.find(t=>t.id===e)}ausfuehren(e,t={},i="menue",r="mensch"){const s=this.befehl(e),a=this.wirkungen.get(e);if(this.menue=null,this.kontextMenue=null,!s||!a||s.folgt)return this.meldung("rueck.folgt",{befehl:s?this.t(s.titel):e}),this.rendern(),!1;const o=a(t,i,r);return this.rendern(),o!==!1}protokolliere(e,t,i,r){this.protokoll.push({befehl:e,parameter:t,quelle:r,weg:i})}meldung(e,t){this.rueckmeldung={schluessel:e,werte:t}}wertSetzen(e,t,i,r,s="mensch"){const a=this.befunde().length,o=this.aendern(l=>{const c=bt(l,e);c&&(c.params[t]=i)});return this.vorschau=null,o&&(this.protokolliere("element.wert-setzen",{element:e,name:t,wert:i},r,s),this.meldung("rueck.wert-gesetzt",{name:this.name(e)}),this.nachWertAenderung(e,a)),o}nachWertAenderung(e,t){this.befunde().length>t&&(this.zonen.panel=!0,this.meldung("rueck.befund",{name:this.name(e)})),this.rechenzeitMs>0&&(this.status.set(e,"rechnet"),setTimeout(()=>{this.status.get(e)==="rechnet"&&this.status.delete(e),this.rendern()},this.rechenzeitMs))}letzterGueltigerWert(e){for(const t of[...this.verlauf().zurueck].reverse()){const i=bt(t,e.elementId);if(i&&!ms(t).some(r=>r.elementId===e.elementId))return qe(i.params[e.parameter])}return hu[e.elementId]?.[e.parameter]??e.grenze}rueckgaengig(e,t="mensch"){const i=this.verlauf(),r=i.zurueck.pop();return this.protokolliere("bearbeiten.rueckgaengig",{},e,t),r?(i.vor.push(cn(this.dokument())),this.ersetzeDokument(r),this.auswahlBereinigen(),this.meldung("rueck.rueckgaengig"),!0):!1}wiederholen(e,t="mensch"){const i=this.verlauf(),r=i.vor.pop();return this.protokolliere("bearbeiten.wiederholen",{},e,t),r?(i.zurueck.push(cn(this.dokument())),this.ersetzeDokument(r),this.auswahlBereinigen(),this.meldung("rueck.wiederholt"),!0):!1}auswahlBereinigen(){this.auswahl=this.auswahl.filter(e=>this.find(e.element_id)),this.aktiv&&!this.find(this.aktiv)&&(this.aktiv=null)}wechsleDokument(e){!this.projekt.content.some(t=>t.id===e)||e===this.dok||(this.dok=e,this.auswahl=[],this.aktiv=null,this.isoliert=null,this.hover=null,this.vorschau=null,this.einpassenNoetig=!0,this.rendern())}neuesElement(e){let t="";return this.aendern(i=>{const r=e==="baugruppe"?"Baugruppe":"Teil",s=At(i).filter(o=>o.type===e).length+1;t=uu(i,`${e}-${s}`);const a={id:t,type:e,params:e==="teil"?{material:"PLA",lage_x:{value:0,unit:"mm"}}:{},content:[],meta:{name:`${r} ${s}`}};this.einfuegeStelle(i).content.push(a)}),t}einfuegeStelle(e){return(this.aktiv?bt(e,this.aktiv):void 0)??e}ablegenPruefen(e,t){const i=this.dokument(),r=this.find(e),s=t===i.id?i:this.find(t);return!r||!s?{erlaubt:!1,grund:"dnd.kein-ziel"}:r.type!=="teil"&&r.type!=="baugruppe"?{erlaubt:!1,grund:"dnd.nur-teile"}:s.id===r.id||ki(r).some(a=>a.id===s.id)?{erlaubt:!1,grund:"dnd.eigener-nachfahre"}:s.type!=="baugruppe"?{erlaubt:!1,grund:"dnd.kein-behaelter"}:ps(i,r.id)?.id===s.id?{erlaubt:!1,grund:"dnd.schon-darin"}:{erlaubt:!0}}fokusEigenschaften=!1;offenesSchliessen=null;kontextOeffnen=null;dndAbbrechen=null;zeigerPos={x:0,y:0};feldBefund=null;einpassenNoetig=!0;kanteBei(e,t,i){const r=this.find(e),s=r?this.huelle(e):null;if(!r||!s||!this.szene||r.content.length>0||r.type==="teil"||r.type==="baugruppe")return null;let a=null;for(const o of this.szene.kantenVon(e,s)){const l=o.bis.x-o.von.x,c=o.bis.y-o.von.y,u=l*l+c*c||1,h=Math.max(0,Math.min(1,((t-o.von.x)*l+(i-o.von.y)*c)/u)),d=Math.hypot(t-(o.von.x+h*l),i-(o.von.y+h*c));d<=8&&(!a||d<a.d)&&(a={adresse:o.adresse,d})}return a?{art:"kante",adresse:a.adresse}:null}griffUebernehmen(){const e=this.griff;if(!e)return;const t=e.eingabe!==""?Number(e.eingabe):e.wert;e.aktiv=!1,this.vorschau=null,e.wert=t,e.eingabe="",t>0&&t!==e.start&&this.wertSetzen(e.id,e.name,{value:t,unit:"mm"},"griff"),e.sichtbarBis=performance.now()+700,setTimeout(()=>{this.griff=null,this.rendern()},700),this.rendern()}griffAbbrechen(){this.vorschau=null,this.griff=null,this.rendern()}suchTreffer(){return mu(this)}geisterKoerper(){const e=this.chat.vorschlag;if(!e)return[];const t=cn(this.dokument());for(const r of e.befehle){if(r.id!=="element.wert-setzen")continue;const s=bt(t,String(r.parameter.element));s&&(s.params[String(r.parameter.name)]=r.parameter.wert)}const i=new Set(At(t).filter(r=>JSON.stringify(r.params)!==JSON.stringify(this.find(r.id)?.params)).map(r=>r.id));return On(t).koerper.filter(r=>i.has(r.elementId))}anwendbar(e){const t=this.gewaehlteElemente(),i=r=>t.some(r);switch(e.id){case"bearbeiten.rueckgaengig":return this.kannRueckgaengig();case"bearbeiten.wiederholen":return this.kannWiederholen();case"element.umbenennen":return t.length===1;case"element.duplizieren":case"element.wert-setzen":case"auswahl.duplizieren":return t.length>0;case"element.verwerfen":case"auswahl.verwerfen":return i(r=>!Ht(r));case"element.zurueckholen":return i(r=>Ht(r));case"element.ausblenden":case"auswahl.ausblenden":return i(r=>!this.istAusgeblendet(r.id));case"element.einblenden":return i(r=>this.istAusgeblendet(r.id));case"element.pausieren":return i(r=>r.meta.pausiert!==!0);case"element.fortsetzen":return i(r=>r.meta.pausiert===!0);case"element.aktivieren":return t.length===1&&t[0]?.id!==this.aktiv;case"element.verlassen":return this.aktiv!==null;case"element.umhaengen":return t.length===1&&(t[0]?.type==="teil"||t[0]?.type==="baugruppe");case"ansicht.alles-einblenden":return this.ausgeblendet.size>0||this.isoliert!==null;case"ansicht.anwenden":return t.length===1&&t[0]?.type==="view";case"auswahl.aufheben":return t.length>0;default:return!0}}naechsteZone(e=!1){const i=["menueleiste","taskleiste","struktur","modell","eigenschaften","chat","panel","rueckmeldung"].filter(o=>{const l=document.querySelector(`[data-zone="${o}"]`);return!!l&&l.getBoundingClientRect().width>0&&getComputedStyle(l).visibility!=="hidden"});if(!i.length)return;const r=this.fokusZone?i.indexOf(this.fokusZone):-1,a=i[(r+(e?-1:1)+i.length)%i.length];this.fokusZone=a,document.querySelector(`[data-zone="${a}"]`)?.focus(),this.tastenfokus=!0}huelleAlle(){const e=this.versteckteIds(),t=On(this.angezeigtesDokument()).koerper.filter(i=>!e.has(i.elementId)&&i.art!=="skizze");return sx(t)}huelleAuswahl(){const e=On(this.angezeigtesDokument()).koerper,t=this.auswahlIds().map(i=>this.find(i)?lc(this.find(i),e):null).filter(i=>!!i);return t.length?xu(t):null}setzeKamera(e){this.szene?.nach({azimut:e.azimut,hoehe:e.hoehe,abstand:e.abstand,ziel:new D(e.ziel.x,e.ziel.y,e.ziel.z)},0)}elternId(e){return ps(this.dokument(),e)?.id??null}}function xu(n){const e=[1/0,1/0,1/0],t=[-1/0,-1/0,-1/0];for(const i of n)for(let r=0;r<3;r++)e[r]=Math.min(e[r],i.min[r]),t[r]=Math.max(t[r],i.max[r]);return{min:e,max:t}}function sx(n){return n.length?xu(n.map(e=>({min:e.min,max:e.max}))):null}function ax(n){const e=[...n].sort((s,a)=>s.x-a.x||s.y-a.y);if(e.length<=2)return e;const t=(s,a,o)=>(a.x-s.x)*(o.y-s.y)-(a.y-s.y)*(o.x-s.x),i=[];for(const s of e){for(;i.length>=2&&t(i[i.length-2],i[i.length-1],s)<=0;)i.pop();i.push(s)}const r=[];for(const s of[...e].reverse()){for(;r.length>=2&&t(r[r.length-2],r[r.length-1],s)<=0;)r.pop();r.push(s)}return[...i.slice(0,-1),...r.slice(0,-1)]}function gs(n){const e=n.map(s=>s.x),t=n.map(s=>s.y),i=Math.min(...e),r=Math.min(...t);return{x:i,y:r,breite:Math.max(...e)-i,hoehe:Math.max(...t)-r}}function ox(n,e,t=!0){const i=[],r=n.length;for(let s=0;s<(t?r:r-1);s++){const a=n[s],o=n[(s+1)%r],l=Math.hypot(o.x-a.x,o.y-a.y),c=Math.max(1,Math.floor(l/e));for(let u=0;u<c;u++)i.push({x:a.x+(o.x-a.x)*u/c,y:a.y+(o.y-a.y)*u/c})}return i}const bi={"farbe.hell.grund":"#F5F7F9","farbe.hell.flaeche":"#FDFDFE","farbe.hell.flaeche-2":"#EEF0F3","farbe.hell.linie":"#DDE0E3","farbe.hell.linie-stark":"#C8CBCE","farbe.hell.text":"#1B2025","farbe.hell.text-2":"#595E64","farbe.hell.text-3":"#82878C","farbe.hell.akzent":"#3A69AD","farbe.hell.akzent-flaeche":"#DFECFF","farbe.hell.auf-akzent":"#FFFFFF","farbe.hell.viewport":"#E6E8EA","farbe.hell.erfolg":"#227849","farbe.hell.erfolg-flaeche":"#DAF3E1","farbe.hell.warnung":"#CD9130","farbe.hell.warnung-text":"#7E5403","farbe.hell.warnung-flaeche":"#FAE9CE","farbe.hell.fehler":"#C13C36","farbe.hell.fehler-flaeche":"#FFE0DB","farbe.dunkel.grund":"#0D1012","farbe.dunkel.flaeche":"#15171A","farbe.dunkel.flaeche-2":"#1E2124","farbe.dunkel.linie":"#2B2E32","farbe.dunkel.linie-stark":"#3A3D41","farbe.dunkel.text":"#E6E8EA","farbe.dunkel.text-2":"#A1A5A9","farbe.dunkel.text-3":"#777B7F","farbe.dunkel.akzent":"#79A6E9","farbe.dunkel.akzent-flaeche":"#1E2E47","farbe.dunkel.auf-akzent":"#0D1012","farbe.dunkel.viewport":"#1B1D20","farbe.dunkel.erfolg":"#60BB83","farbe.dunkel.erfolg-flaeche":"#12301E","farbe.dunkel.warnung":"#EBB25F","farbe.dunkel.warnung-text":"#EBB25F","farbe.dunkel.warnung-flaeche":"#3C2A0E","farbe.dunkel.fehler":"#ED756A","farbe.dunkel.fehler-flaeche":"#3E1F1B","achse.x":"#DB423C","achse.y":"#3BA946","achse.z":"#2B7AD6","schrift.familie.ui":"Inter, system-ui, sans-serif","schrift.familie.mono":'"JetBrains Mono", ui-monospace, monospace',"schrift.merkmale":'"tnum" 1, "cv05" 1',"schrift.schnitt.normal":"400","schrift.schnitt.mittel":"500","schrift.schnitt.halbfett":"600","schrift.groesse.klein":"12px","schrift.groesse.basis":"13px","schrift.groesse.gross":"14px","schrift.groesse.titel":"16px","schrift.groesse.ueberschrift":"20px","schrift.groesse.anzeige":"24px","schrift.zeilenhoehe":"1.45","schrift.groesse-tablet.basis":"15px","abstand.1":"4px","abstand.2":"8px","abstand.3":"12px","abstand.4":"16px","abstand.5":"24px","abstand.6":"32px","radius.klein":"4px","radius.mittel":"6px","radius.gross":"8px","radius.karte":"12px","linie.breite":"1px","bedienflaeche.desktop":"28px","bedienflaeche.tablet":"44px","bewegung.kurz":"120ms","bewegung.mittel":"200ms","bewegung.kurve":"cubic-bezier(0.2, 0, 0, 1)","symbol.satz":"Lucide"},ua=30,ha=.35,lx=.6,cx=30;class ux{constructor(e){this.zone=e,this.canvas=document.createElement("canvas"),this.canvas.dataset.modell="",this.canvas.className="leinwand",e.prepend(this.canvas),this.renderer=new V0({canvas:this.canvas,antialias:!0,alpha:!1,powerPreference:"low-power"}),this.renderer.setPixelRatio(1),this.scene.add(this.gruppe),this.scene.add(this.licht.umgebung,this.licht.gerichtet,this.licht.gegen),this.setThema("hell"),new ResizeObserver(()=>this.groesseAnpassen()).observe(e),this.groesseAnpassen()}canvas;renderer;scene=new Fh;persp=new $t(ua,1,10,2e4);ortho=new Ss(-1,1,1,-1,-2e4,2e4);gruppe=new Qn;licht={umgebung:new Bd,gerichtet:new kl,gegen:new kl};objekte=[];zeichnung=null;thema="hell";angefordert=!1;tween=null;lausche=[];bboxCache=new Map;kamera={azimut:-35,hoehe:28,abstand:380,ziel:new D(0,0,14)};projektion="orthogonal";tempo=1;beiAenderung(e){this.lausche.push(e)}melde(){for(const e of this.lausche)e()}lichter(){return[{art:"umgebung",intensitaet:this.licht.umgebung.intensity},{art:"gerichtet",intensitaet:this.licht.gerichtet.intensity},{art:"gegen",intensitaet:this.licht.gegen.intensity}]}setThema(e){this.thema=e,this.renderer.setClearColor(new Ye(bi[`farbe.${e}.viewport`])),this.licht.umgebung.intensity=e==="hell"?1.15:1.25,this.licht.gerichtet.intensity=e==="hell"?1.7:2.1,this.licht.gegen.intensity=e==="hell"?.5:.7,this.licht.gerichtet.position.set(-1,-2,3),this.licht.gegen.position.set(2,1,1),this.zeichnung&&this.zeichne(this.zeichnung),this.anfordern()}groesseAnpassen(){const e=this.zone.getBoundingClientRect(),t=Math.max(1,Math.round(e.width)),i=Math.max(1,Math.round(e.height));this.renderer.setSize(t,i,!1),this.canvas.style.width=`${t}px`,this.canvas.style.height=`${i}px`,this.persp.aspect=t/i,this.persp.updateProjectionMatrix(),this.anfordern(),this.melde()}flaecheBreite(){return this.canvas.clientWidth||1}flaecheHoehe(){return this.canvas.clientHeight||1}halbeHoehe(e=this.kamera.abstand){return e*Math.tan(ua*Math.PI/360)}pxProMm(){return this.flaecheHoehe()/(2*this.halbeHoehe())}kameraAnwenden(){const e=this.kamera,t=e.azimut*Math.PI/180,i=e.hoehe*Math.PI/180,r=new D(Math.sin(t)*Math.cos(i),-Math.cos(t)*Math.cos(i),Math.sin(i)),s=this.projektion==="orthogonal"?this.ortho:this.persp;if(s.up.set(0,0,1),Math.abs(e.hoehe)>89.5&&s.up.set(Math.sin(t)*-1,Math.cos(t),0),s.position.copy(e.ziel).addScaledVector(r,e.abstand),s.lookAt(e.ziel),this.projektion==="orthogonal"){const a=this.halbeHoehe(),o=a*(this.flaecheBreite()/this.flaecheHoehe());this.ortho.left=-o,this.ortho.right=o,this.ortho.top=a,this.ortho.bottom=-a,this.ortho.updateProjectionMatrix()}return s.updateMatrixWorld(!0),s}aktuelleKamera(){return this.kameraAnwenden()}drehen(e,t){this.tween=null,this.kamera.azimut+=e,this.kamera.hoehe=Math.max(-89,Math.min(89,this.kamera.hoehe+t)),this.geaendert()}schieben(e,t){this.tween=null;const i=this.kameraAnwenden(),r=new D().setFromMatrixColumn(i.matrixWorld,0),s=new D().setFromMatrixColumn(i.matrixWorld,1),a=1/this.pxProMm();this.kamera.ziel.addScaledVector(r,-e*a).addScaledVector(s,t*a),this.geaendert()}zoomen(e,t,i){this.tween=null;const r=t!==void 0&&i!==void 0?this.aufZielEbene(t,i):null;if(this.kamera.abstand=Math.max(40,Math.min(4e3,this.kamera.abstand/e)),r&&t!==void 0&&i!==void 0){this.kameraAnwenden();const s=this.aufZielEbene(t,i);s&&this.kamera.ziel.add(r.sub(s))}this.geaendert()}aufZielEbene(e,t){const i=this.kameraAnwenden(),r=this.canvas.getBoundingClientRect(),s=new de((e-r.left)/r.width*2-1,-((t-r.top)/r.height)*2+1),a=new Dl;a.setFromCamera(s,i);const o=new D;i.getWorldDirection(o);const l=new yn().setFromNormalAndCoplanarPoint(o,this.kamera.ziel);return a.ray.intersectPlane(l,new D)}geaendert(){this.anfordern(),this.melde()}nach(e,t){const i={...this.kamera,ziel:this.kamera.ziel.clone()},r={azimut:e.azimut??i.azimut,hoehe:e.hoehe??i.hoehe,abstand:e.abstand??i.abstand,ziel:e.ziel?e.ziel.clone():i.ziel.clone()};if(t<=0||this.tempo===0){this.kamera=r,this.tween=null,this.geaendert();return}this.tween={start:performance.now(),ende:performance.now()+t,von:i,nach:r},this.anfordern()}passeEin(e,t=200,i=.72){if(!e)return;const r=new D((e.min[0]+e.max[0])/2,(e.min[1]+e.max[1])/2,(e.min[2]+e.max[2])/2),s={...this.kamera,ziel:r.clone()},a=this.kamera;this.kamera=s;const o=this.kameraAnwenden(),l=new D().setFromMatrixColumn(o.matrixWorld,0),c=new D().setFromMatrixColumn(o.matrixWorld,1);let u=0,h=0;for(const C of[e.min[0],e.max[0]])for(const S of[e.min[1],e.max[1]])for(const w of[e.min[2],e.max[2]]){const E=new D(C,S,w).sub(r);u=Math.max(u,Math.abs(E.dot(l))),h=Math.max(h,Math.abs(E.dot(c)))}this.kamera=a;const d=this.zone.getBoundingClientRect(),f=Math.min(d.width,d.height),m=2*u/(i*f),x=2*h/(i*f),R=Math.max(m,x,.01)*d.height/2/Math.tan(ua*Math.PI/360);this.nach({ziel:r,abstand:R},t)}koerperFarbe(){return new Ye(this.thema==="hell"?bi["farbe.hell.flaeche"]:bi["farbe.dunkel.text-3"])}geometrie(e){const[t,i,r]=e.min,[s,a,o]=e.max,l=new D((t+s)/2,(i+a)/2,(r+o)/2);switch(e.art){case"quader":{const c=new ni(s-t,a-i,o-r);return c.translate(l.x,l.y,l.z),[c]}case"platte":{const c=e.platte;if(!c)return[];const u=da(c.laenge,c.breite,c.eckradius);for(const d of c.loecher){const f=new ds;f.absarc(d.x-l.x,d.y-l.y,c.lochD/2,0,Math.PI*2,!0),u.holes.push(f)}const h=new fs(u,{depth:c.dicke,bevelEnabled:!1,curveSegments:12});return h.translate(l.x,l.y,r),[h]}case"schale":{const c=e.wand??2,u=da(s-t,a-i,0),h=new ds;h.moveTo(-(s-t)/2+c,-(a-i)/2+c),h.lineTo(-(s-t)/2+c,(a-i)/2-c),h.lineTo((s-t)/2-c,(a-i)/2-c),h.lineTo((s-t)/2-c,-(a-i)/2+c),h.closePath(),u.holes.push(h);const d=new fs(u,{depth:o-r-c,bevelEnabled:!1});d.translate(l.x,l.y,r+c);const f=new ni(s-t,a-i,c);return f.translate(l.x,l.y,r+c/2),[d,f]}case"rohr":{const c=e.rohr;if(!c)return[];const u=new Lo(c.d/2,c.d/2,o-r,24,1,!0);return u.rotateX(Math.PI/2),u.translate(c.x,c.y,l.z),[u]}default:return[]}}zeichne(e){this.zeichnung=e,this.bboxCache.clear();for(const s of this.objekte)this.gruppe.remove(s.gruppe);this.objekte=[];const t=this.koerperFarbe(),i=new Ye(bi[this.thema==="hell"?"farbe.hell.text":"farbe.dunkel.text"]),r=new Ye(bi[this.thema==="hell"?"farbe.hell.text-3":"farbe.dunkel.text-3"]);for(const s of e.koerper){if(e.versteckt.has(s.elementId))continue;const a=new Qn,o={elementId:s.elementId,gruppe:a,flaechen:[],kanten:[],skizze:s.art==="skizze"},l=e.gedimmt.has(s.elementId),c=e.blass.has(s.elementId);if(s.art==="skizze"&&s.platte){const h=da(s.platte.laenge,s.platte.breite,s.platte.eckradius).getPoints(8).map(m=>new D(m.x,m.y,.05)),d=new Ot().setFromPoints([...h,h[0]]),f=new Bc(d,new so({color:r,transparent:!0,opacity:l?ha:1}));f.position.set((s.min[0]+s.max[0])/2,(s.min[1]+s.max[1])/2,0),a.add(f),this.gruppe.add(a),this.objekte.push(o);continue}for(const u of this.geometrie(s)){const h=l?ha:c?lx:e.darstellung==="durchsicht"?.3:1,d=new Nd({color:t,flatShading:!0,side:s.art==="rohr"?en:Bn,transparent:h<1,opacity:h,depthWrite:e.darstellung!=="durchsicht",colorWrite:e.darstellung!=="kanten",polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}),f=new rn(u,d);f.userData.elementId=s.elementId,f.userData.pickbar=!l,a.add(f),o.flaechen.push(f);const m=new $h(new Kh(u,cx),new so({color:l?r:i,transparent:l,opacity:l?ha:1}));a.add(m),o.kanten.push(m)}this.gruppe.add(a),this.objekte.push(o)}for(const s of e.geister){const a=new Qn;for(const o of this.geometrie(s)){const l=new rn(o,new Po({color:new Ye(bi[`farbe.${this.thema}.akzent`]),transparent:!0,opacity:.35,depthWrite:!1,side:en}));a.add(l)}this.gruppe.add(a),this.objekte.push({elementId:`${s.elementId}~geist`,gruppe:a,flaechen:[],kanten:[],skizze:!1})}this.anfordern(),this.melde()}zuNdc(e,t){const i=this.canvas.getBoundingClientRect();return new de((e-i.left)/i.width*2-1,-((t-i.top)/i.height)*2+1)}trefferBei(e,t){const i=this.kameraAnwenden(),r=new Dl;r.setFromCamera(this.zuNdc(e,t),i),this.gruppe.updateMatrixWorld(!0);const s=this.objekte.flatMap(o=>o.flaechen).filter(o=>o.userData.pickbar),a=r.intersectObjects(s,!1)[0];return a?{elementId:String(a.object.userData.elementId),punkt:a.point.clone(),normale:a.face?a.face.normal.clone():new D}:null}projiziere(e){const t=this.kameraAnwenden(),i=(e instanceof D?e.clone():new D(e[0],e[1],e[2])).project(t),r=this.canvas.getBoundingClientRect();return{x:r.left+(i.x+1)/2*r.width,y:r.top+(1-i.y)/2*r.height}}eckenProjiziert(e){const t=[];for(const i of[e.min[0],e.max[0]])for(const r of[e.min[1],e.max[1]])for(const s of[e.min[2],e.max[2]])t.push(this.projiziere([i,r,s]));return t}kantenVon(e,t){const i=(s,a,o)=>[s==="l"?t.min[0]:t.max[0],a==="v"?t.min[1]:t.max[1],o==="u"?t.min[2]:t.max[2]],r=[];for(const s of["o","u"]){const a=s==="o"?"oben":"unten";r.push([`${a}-vorn`,i("l","v",s),i("r","v",s)]),r.push([`${a}-hinten`,i("l","h",s),i("r","h",s)]),r.push([`${a}-links`,i("l","v",s),i("l","h",s)]),r.push([`${a}-rechts`,i("r","v",s),i("r","h",s)])}for(const s of["l","r"])for(const a of["v","h"])r.push([`${a==="v"?"vorn":"hinten"}-${s==="l"?"links":"rechts"}`,i(s,a,"u"),i(s,a,"o")]);return r.map(([s,a,o])=>{const l=this.projiziere(a),c=this.projiziere(o);return{adresse:`${e}/k/${s}`,elementId:e,name:s,von:l,bis:c,mitte:{x:(l.x+c.x)/2,y:(l.y+c.y)/2}}})}gezeichnet(){return[...new Set(this.objekte.map(e=>e.elementId).filter(e=>!e.includes("~")))]}hatKoerper(){return this.objekte.length>0}anfordern(){this.angefordert||(this.angefordert=!0,requestAnimationFrame(()=>{this.angefordert=!1,this.rahmen()}))}rahmen(){if(this.tween){const e=this.tween,t=performance.now(),i=Math.min(1,(t-e.start)/(e.ende-e.start)),r=i<.5?2*i*i:1-(-2*i+2)**2/2;this.kamera={azimut:e.von.azimut+(e.nach.azimut-e.von.azimut)*r,hoehe:e.von.hoehe+(e.nach.hoehe-e.von.hoehe)*r,abstand:e.von.abstand+(e.nach.abstand-e.von.abstand)*r,ziel:e.von.ziel.clone().lerp(e.nach.ziel,r)},i>=1?this.tween=null:this.anfordern(),this.melde()}this.jetztRendern()}jetztRendern(){const e=this.kameraAnwenden();this.renderer.render(this.scene,e)}setProjektion(e){this.projektion=e,this.geaendert()}}function da(n,e,t){const i=new Yc,r=-n/2,s=-e/2;return t<=0?(i.moveTo(r,s),i.lineTo(r+n,s),i.lineTo(r+n,s+e),i.lineTo(r,s+e),i.closePath(),i):(i.moveTo(r+t,s),i.lineTo(r+n-t,s),i.absarc(r+n-t,s+t,t,-Math.PI/2,0,!1),i.lineTo(r+n,s+e-t),i.absarc(r+n-t,s+e-t,t,0,Math.PI/2,!1),i.lineTo(r+t,s+e),i.absarc(r+t,s+e-t,t,Math.PI/2,Math.PI,!1),i.lineTo(r,s+t),i.absarc(r+t,s+t,t,Math.PI,Math.PI*1.5,!1),i)}function No(n){const e=n.gewaehlteElemente();let t;if(e.length>1)t=z("span",{class:"chip","data-chip":""},n.t("chat.n-elemente",{n:e.length}));else{const i=e[0]??(n.aktiv?n.find(n.aktiv):void 0)??n.dokument(),r=e[0]?n.zustaende(i.id):[];t=z("span",{class:"chip","data-chip":"","data-id":i.id,"data-zustand":r.join(" ")||null,"data-akzent":r.includes("ausgewaehlt")?"auswahl":null},i.meta.name)}return z("div",{class:"kontext","data-chat-kontext":"","data-key":"kontext"},z("span",{class:"zu"},n.t("chat.zu"))," ",t)}function bu(n){const e=n.chat.vorschlag;return e?z("div",{class:"karte","data-muster":"Entscheidungskarte","data-quelle":"ki","data-akzent":"ki","data-key":"karte"},z("div",{class:"karte-kopf"},_t("sparkles",14),z("span",{class:"simuliert"},n.t("simuliert"))),z("div",{class:"karte-titel"},e.titel),z("div",{class:"karte-text"},e.begruendung),...e.werte.map((t,i)=>z("div",{class:"karte-wert","data-key":`w-${i}`},z("span",{class:"feld"},t.feld),z("span",{class:"vorher"},t.vorher),_t("chevron-right",12),z("span",{class:"nachher"},t.nachher))),z("div",{class:"karte-knoepfe"},z("button",{type:"button",class:"knopf","data-befehl":"chat.verwerfen"},n.t("chat.verwerfen")),z("button",{type:"button",class:"knopf haupt","data-befehl":"chat.uebernehmen","data-hauptaktion":"","data-akzent":"hauptaktion"},n.t("chat.uebernehmen")))):null}function hx(n){return[z("div",{class:"zonenkopf","data-key":"kopf"},z("h2",{},n.t("chat.titel")),z("span",{class:"simuliert"},n.t("simuliert"))),No(n),z("div",{class:"nachrichten",role:"log","data-key":"nachrichten"},...n.chat.nachrichten.length?n.chat.nachrichten.map((e,t)=>z("div",{class:`nachricht ${e.von}`,"data-key":`n-${t}`},e.schluessel?n.t(e.schluessel,e.werte):e.text)):[z("p",{class:"hinweis","data-key":"hinweis"},n.t("chat.hinweis"))],bu(n)),z("div",{class:"eingabezeile","data-key":"eingabe"},z("input",{type:"text",class:"chat-eingabe","data-chat-eingabe":"","data-befehl":"chat.senden",placeholder:n.t("chat.platzhalter"),"aria-label":n.t("chat.platzhalter"),value:n.chat.eingabe,autocomplete:"off"}),z("button",{type:"button",class:"schalter","data-befehl":"chat.senden","data-chat-senden":"","aria-label":n.t("befehl.chat.senden"),title:n.t("befehl.chat.senden")},_t("arrow-up")))]}const Su={mm:1,cm:10,m:1e3},dx={n:1,kn:1e3},fx=new Set(["kg","g"]),cc=(n,e)=>n??e;class px{constructor(e,t){this.text=e,this.standardFaktor=t}pos=0;blank(){for(;this.text[this.pos]===" ";)this.pos+=1}naechstes(){return this.blank(),this.text[this.pos]??""}fertig(){return this.naechstes()===""}ausdruck(){let e=this.produkt();for(;;){const t=this.naechstes();if(t!=="+"&&t!=="-")return e;this.pos+=1;const i=this.produkt();if(e.dim!==null&&i.dim!==null&&e.dim!==i.dim)throw new Mi("wert.fehler.dimension");e={wert:t==="+"?e.wert+i.wert:e.wert-i.wert,dim:cc(e.dim,i.dim)}}}produkt(){let e=this.faktor();for(;;){const t=this.naechstes();if(t!=="*"&&t!=="/")return e;this.pos+=1;const i=this.faktor();if(t==="/"){if(i.wert===0)throw new Mi("wert.fehler.teilung");e={wert:e.wert/i.wert,dim:e.dim}}else e={wert:e.wert*i.wert,dim:cc(e.dim,i.dim)}}}faktor(){const e=this.naechstes();if(e==="-"){this.pos+=1;const t=this.faktor();return{wert:-t.wert,dim:t.dim}}if(e==="("){this.pos+=1;const t=this.ausdruck();if(this.naechstes()!==")")throw new Mi("wert.fehler.nicht-lesbar");return this.pos+=1,t}return this.zahl()}zahl(){this.blank();const e=this.text.slice(this.pos),t=/^(\d+(?:[.,]\d+)?|[.,]\d+)\s*([a-zA-Z]*)/.exec(e);if(!t||t[1]===void 0)throw new Mi("wert.fehler.nicht-lesbar");this.pos+=t[0].length;const i=Number(t[1].replace(",",".")),r=(t[2]??"").toLowerCase();if(r==="")return{wert:i*this.standardFaktor,dim:null};const s=Su[r];if(s!==void 0)return{wert:i*s,dim:"laenge"};const a=dx[r];if(a!==void 0)return{wert:i*a,dim:"kraft"};if(fx.has(r))return{wert:i*(r==="kg"?1e3:1),dim:"masse"};throw new Mi("wert.fehler.nicht-lesbar")}}class Mi extends Error{constructor(e){super(e),this.schluessel=e}}function uc(n,e="mm",t="laenge"){const i=new px(n.replace(/×/g,"*").replace(/−/g,"-").trim(),t==="kraft"?1:Su[e]??1);try{const r=i.ausdruck();return i.fertig()?r.dim!==null&&r.dim!==t?{ok:!1,fehler:"wert.fehler.dimension"}:Number.isFinite(r.wert)?{ok:!0,groesse:{value:Math.round(r.wert*1e6)/1e6,unit:t==="kraft"?"N":"mm"}}:{ok:!1,fehler:"wert.fehler.nicht-lesbar"}:{ok:!1,fehler:"wert.fehler.nicht-lesbar"}}catch(r){if(r instanceof Mi)return{ok:!1,fehler:r.schluessel};throw r}}function mx(n,e="de"){const t=String(Math.round(n.value*100)/100);return`${e==="de"?t.replace(".",","):t} ${n.unit}`}const zo=(n,e,t)=>{const i=(Math.round(n*10**e)/10**e).toFixed(e);return t==="en"?i:i.replace(".",",")},gx=n=>n==="en"?"en":"de";function po(n,e){return mx(n,gx(e))}const vx=(n,e)=>`${zo(n/1e3,2,e)} cm³`,_x=(n,e)=>`${zo(n,2,e)} g`;function xx(n,e){const t=i=>zo(i,1,e).replace(/[.,]0$/,"");return`${t(n[0])} × ${t(n[1])} × ${t(n[2])} mm`}const bx={extrusion:["laenge","breite","dicke","hoehe","eckradius"],schale:["laenge","breite","hoehe","wand"],skizze:["laenge","breite","eckradius"],bohrung:["durchmesser"]};function hc(n,e){const i=[...Fn(n.dokument(),e.id)].reverse().find(r=>typeof r.params.material=="string");return String(e.params.material??i?.params.material??"PLA")}function Mu(n,e){const t=n.sprache;if(e.type==="teil"||e.type==="baugruppe"||e.type==="projekt"){const r=On(e.id===n.dokument().id?n.angezeigtesDokument():e),s=[{key:"masse",felder:[{key:"abmessungen",param:null,text:xx(r.abmessungen_mm,t),editierbar:!1}]}];return(e.type==="teil"||r.volumen_mm3>0)&&(s.push({key:"material",felder:[{key:"material",param:null,text:hc(n,e),editierbar:!1}]}),s.push({key:"ergebnis",felder:[{key:"volumen",param:null,text:vx(r.volumen_mm3,t),editierbar:!1},{key:"masse-wert",param:null,text:_x(r.masse_g,t),editierbar:!1}]})),s}if(e.type==="view")return[{key:"ansicht",felder:[{key:"projektion",param:null,text:n.t(`projektion.${String(e.params.projektion)}`),editierbar:!1},{key:"darstellung",param:null,text:n.t(`darstellung.${String(e.params.darstellung)}`),editierbar:!1}]}];const i=[];for(const r of bx[e.type]??[])e.params[r]!==void 0&&i.push({key:r,param:r,text:po(e.params[r],t),editierbar:!0});return[{key:"masse",felder:i},{key:"material",felder:[{key:"material",param:null,text:hc(n,e),editierbar:!1}]}]}function Sx(n,e){const t=e.map(a=>Mu(n,a)),i=new Set,r=t[0]??[],s=[];for(const a of r){const o=[];for(const l of a.felder){const c=t.map(h=>h.flatMap(d=>d.felder).find(d=>d.key===l.key));if(c.some(h=>!h))continue;const u=c.every(h=>h?.text===l.text);u||i.add(l.key),o.push({...l,text:u?l.text:n.t("eigenschaften.gemischt")})}o.length&&s.push({key:a.key,felder:o})}return{gruppen:s,gemischt:i}}function es(n,e,t,i){const r=n.feldBefund?.feld===e.key?n.feldBefund:null;return z("div",{class:"feld","data-feld":e.key,"data-key":e.key},z("label",{},n.t(`feld.${e.key}`)),e.editierbar?z("input",{type:"text",class:"wertfeld","data-muster":"Wertfeld","data-feld-eingabe":e.key,"data-param":e.param,"data-elemente":t.join(","),"data-gemischt":i?"true":null,"aria-label":n.t(`feld.${e.key}`),value:e.text,autocomplete:"off"}):z("span",{class:"wert","data-wert-text":""},e.text),r?z("div",{class:"befund am-feld","data-muster":"Befund","data-schwere":"warnung"},n.t(r.schluessel)):null)}function yu(n){const e=n.gewaehlteElemente(),t=a=>z("div",{class:"zonenkopf","data-key":"kopf"},typeof a=="string"?z("h2",{},a):a);if(e.length>1){const{gruppen:a,gemischt:o}=Sx(n,e),l=e.map(c=>c.id);return[t(n.t("eigenschaften.n-elemente",{n:e.length})),...a.map(c=>dc(n,c,l,o))]}const i=e[0]??(n.aktiv?n.find(n.aktiv):void 0)??n.dokument(),s=n.umbenennen?.id===i.id?z("input",{type:"text",class:"titel-eingabe","data-umbenennen":i.id,"data-editiert":"",value:i.meta.name,"aria-label":n.t("befehl.element.umbenennen")}):z("h2",{"data-name-feld":i.id,title:n.t("eigenschaften.umbenennen-hinweis")},i.meta.name);return[t(s),Ht(i)?z("div",{class:"hinweis","data-key":"verworfen"},n.t("struktur.verworfen")):null,...Mu(n,i).map(a=>dc(n,a,[i.id],new Set))].filter(a=>!!a)}function dc(n,e,t,i){return z("section",{class:"gruppe","data-gruppe":e.key,"data-key":`g-${e.key}`},z("h3",{},n.t(`gruppe.${e.key}`)),...e.felder.map(r=>es(n,r,t,i.has(r.key))))}function mo(n,e,t={}){const i=n.anwendbar(e);return z("button",{type:"button",role:"menuitem",class:"eintrag","data-befehl":e.id,"data-par":t.par?JSON.stringify(t.par):null,"data-mehr":t.mehr?"true":null,"aria-disabled":!i||e.folgt?"true":null,"data-folgt":e.folgt?"true":null,tabindex:"-1"},z("span",{class:"titel"},n.t(e.titel)),e.folgt?z("span",{class:"folgt"},n.t("menue.folgt")):null,e.kuerzel?z("kbd",{},Fi(e.kuerzel,n.sprache)):null)}function Di(n,e){return ev(n.register,e).map(t=>z("div",{role:"group",class:"untergruppe","data-untergruppe":t.name,"data-key":`ug-${t.name}`},z("div",{class:"gruppenkopf"},n.t(`untergruppe.${t.name.replace(/ \d+$/,"")}`)),...t.eintraege.map(i=>mo(n,i))))}function hr(n,e,t="menue",i=""){return z("div",{role:"menu",class:`popup ${i}`.trim(),"data-overlay":"menue","data-ort":n,"data-weg":t},...e)}function wu(n){const e=n.kontextMenue;return e?z("div",{role:"menu",class:"popup kontextmenue","data-overlay":"kontextmenue","data-ort":"kontextmenue","data-weg":"kontextmenue","data-art":e.art,style:`left:${Math.round(e.x)}px;top:${Math.round(e.y)}px`},...e.gruppen.map(t=>{const i=e.mehr.has(t.familie),r=t.eintraege.filter(a=>!a.mehr),s=t.eintraege.filter(a=>a.mehr);return z("div",{role:"group",class:"untergruppe","data-gruppe":t.familie,"data-key":`gr-${t.familie}`},z("div",{class:"gruppenkopf"},n.t(`familie.${t.familie}`)),...r.map(a=>mo(n,a.befehl)),s.length?z("button",{type:"button",class:"eintrag mehr-knopf","data-mehr-toggle":t.familie,"aria-expanded":i?"true":"false",tabindex:"-1"},n.t("menue.mehr")):null,s.length?z("div",{class:"mehr",hidden:i?null:"","data-key":`mehr-${t.familie}`},...s.map(a=>mo(n,a.befehl,{mehr:!0}))):null)})):null}const Mx={modellieren:["Bearbeiten","Auswahl","Baugruppe","Fenster"],simulation:["Simulation"]};function fc(n,e,t,i){const r=n.menue===e;return z("div",{class:"menue-eintrag","data-key":e},z("button",{type:"button",class:"menue-knopf","data-menue-trigger":e,"aria-haspopup":"menu","aria-expanded":r?"true":"false",tabindex:"-1"},t),r?hr(i,Di(n,e.replace("dropdown:","").replace("start","Datei"))):null)}function fa(n,e,t,i){const r=n.befehl(e);return z("button",{type:"button",class:"schalter","data-befehl":e,"aria-pressed":i?"true":"false",title:r?`${n.t(r.titel)}${r.kuerzel?` (${Fi(r.kuerzel,n.sprache)})`:""}`:e,"aria-label":r?n.t(r.titel):e},_t(t))}function pc(n,e,t,i){const r=n.befehl(e);return z("button",{type:"button",class:"schalter mit-kuerzel","data-befehl":e,"aria-disabled":i?null:"true",title:r?n.t(r.titel):e,"aria-label":r?n.t(r.titel):e},_t(t),r?.kuerzel?z("kbd",{},Fi(r.kuerzel,n.sprache)):null)}function yx(n){const e=n.befehl("suche.oeffnen");return[fc(n,"start",n.t("menue.start"),"start-menue"),...Mx[n.task].map(t=>fc(n,`dropdown:${t}`,n.t(`familie.${t}`),t==="Fenster"?"menueleiste":`dropdown-${t.toLowerCase()}`)),z("div",{class:"platz"}),z("div",{class:"menue-eintrag suche-eintrag","data-key":"suche"},z("button",{type:"button",class:"suchfeld","data-befehl":"suche.oeffnen","aria-expanded":n.suche.offen?"true":"false",tabindex:"-1"},_t("search"),z("span",{class:"platzhalter"},n.t("suche.platzhalter")),e?.kuerzel?z("kbd",{},Fi(e.kuerzel,n.sprache)):null),n.suche.offen?gu(n):null),pc(n,"bearbeiten.rueckgaengig","undo-2",n.kannRueckgaengig()),pc(n,"bearbeiten.wiederholen","redo-2",n.kannWiederholen()),z("div",{class:"schalter-gruppe",role:"group","data-key":"schalter"},fa(n,"fenster.struktur","panel-left",n.zonen.struktur),fa(n,"fenster.panel","panel-bottom",n.zonen.panel),fa(n,"fenster.rechts","panel-right",n.zonen.rechts))]}const wx={teil:"box",baugruppe:"boxes",extrusion:"layers",schale:"layers",skizze:"pencil",bohrung:"circle-dot",view:"focus"};function Eu(n,e){const t=n.zustaende(e);return t.includes("fehlerhaft")?{zustand:"fehlerhaft",symbol:"circle-alert",token:"fehler"}:t.includes("rechnet")?{zustand:"rechnet",symbol:"loader",token:"text-2"}:t.includes("pausiert")?{zustand:"pausiert",symbol:"circle-pause",token:"text-2"}:null}function tr(n,e,t){return z("span",{class:"status","data-muster":"Statusanzeige","data-zustand":e.zustand,"data-status-token":e.token,"data-element":t,role:"status"},_t(e.symbol,14),z("span",{class:"wort"},n.t(`status.${e.zustand}`)))}function Ei(n,e,t,i){const r=n.zustaende(e.id),s=n.auswahlIds().includes(e.id),a=n.istAusgeblendet(e.id),o=Eu(n,e.id),l=r.includes("andere");return z("div",{role:"treeitem",class:"zeile","data-key":e.id,"data-id":e.id,"data-ebene":String(t),"data-zustand":r.join(" ")||null,"data-akzent":s?"auswahl":r.includes("hover")?"ueberfahren":n.dnd?.ziel===e.id&&n.dnd.erlaubt?"auswahl":null,"aria-selected":s?"true":"false","aria-level":String(t+1),"aria-current":n.aktiv===e.id?"true":null,"data-ziel":n.dnd?.ziel===e.id?n.dnd.erlaubt?"erlaubt":"verboten":null,style:`--ebene:${t}`,tabindex:i===0?"0":"-1"},_t(wx[e.type]??"square",14),z("span",{class:"name"},e.meta.name),o?tr(n,o,e.id):null,l?z("span",{class:"person",title:n.t("anwesenheit.person")},n.t("anwesenheit.kuerzel")):null,z("button",{type:"button",class:"auge","data-befehl":a?"element.einblenden":"element.ausblenden","data-par":JSON.stringify({element:e.id}),"data-weg":"struktur","data-ort":"auge","aria-label":n.t(a?"befehl.element.einblenden":"befehl.element.ausblenden"),"aria-pressed":a?"true":"false",tabindex:"-1"},_t(a?"eye-off":"eye",14)),Ht(e)?z("span",{class:"verworfen-marke"},n.t("struktur.verworfen")):null)}function ts(n){const e=n.zeilen(),t=n.dokument(),i=z("div",{class:"zonenkopf","data-key":"kopf"},z("h2",{},n.t("struktur.titel")),z("div",{class:"menue-eintrag","data-key":"sichtbarkeit"},z("button",{type:"button",class:"schalter","data-menue-trigger":"sichtbarkeit","aria-haspopup":"menu","aria-expanded":n.menue==="sichtbarkeit"?"true":"false",title:n.t("familie.Sichtbarkeit"),"aria-label":n.t("familie.Sichtbarkeit")},_t("eye")),n.menue==="sichtbarkeit"?hr("auge",Di(n,Ex)):null));if(n.task==="simulation")return[i,z("div",{class:"leer","data-muster":"Leerer Zustand","data-key":"leer"},z("p",{},n.t("struktur.leer-simulation")))];const r=z("div",{class:"wurzel","data-key":"wurzel","data-wurzel":t.id,"data-akzent":n.dnd?.ziel===t.id&&n.dnd.erlaubt?"auswahl":null,"data-ziel":n.dnd?.ziel===t.id?n.dnd.erlaubt?"erlaubt":"verboten":null},z("span",{class:"beschriftung"},n.t("struktur.wurzel")),z("span",{class:"name"},t.meta.name));return e.length?[i,r,z("div",{role:"tree",class:"baum","data-key":"baum","aria-label":n.t("struktur.titel")},...e.map((s,a)=>Ei(n,s.element,s.ebene,a)))]:[i,r,z("div",{class:"leer","data-muster":"Leerer Zustand","data-key":"leer"},z("p",{},n.t("struktur.leer")),n.unbekannterZustand?z("div",{class:"befund","data-muster":"Befund","data-schwere":"warnung"},n.t("befund.zustand-unbekannt")):null,z("button",{type:"button",class:"knopf haupt","data-befehl":"element.anlegen","data-par":JSON.stringify({typ:"teil"}),"data-hauptaktion":"","data-akzent":"hauptaktion"},n.t("befehl.element.anlegen")))]}const Ex="Sichtbarkeit",Au={"element.duplizieren":"copy","auswahl.duplizieren":"copy","element.umbenennen":"pencil","element.verwerfen":"trash-2","auswahl.verwerfen":"trash-2","element.ausblenden":"eye-off","auswahl.ausblenden":"eye-off","element.einblenden":"eye","ansicht.auf-auswahl":"focus","ansicht.einpassen":"maximize","ansicht.isolieren":"cuboid","ansicht.alles-einblenden":"eye","ansicht.projektion":"box","darstellung.wechseln":"layers","element.zurueckholen":"undo-2","element.aktivieren":"maximize","element.wert-setzen":"pencil"};function dr(n,e){const t=n.huelle(e);return!t||!n.szene?null:ax(n.szene.eckenProjiziert(t))}function Ax(n){if(n.type==="extrusion"||n.type==="schale"){if(n.params.dicke!==void 0)return"dicke";if(n.params.hoehe!==void 0)return"hoehe"}return null}const Tx=(n,e,t)=>{const i=e%2===1?.5:0;return{x:Math.round(n.x-t.x)+i,y:Math.round(n.y-t.y)+i}};function Tu(n,e){const t=new Set([...n.auswahlIds(),...n.andereElemente(),...n.hover?[n.hover]:[]]),i=[];for(const r of t){if(n.istAusgeblendet(r))continue;const a=n.darstellungVon(r,"modell")?.kanaele.find(c=>c.kanal==="Kontur"),o=dr(n,r);if(!a||!o||o.length<3)continue;const l=a.breite??1;i.push({id:r,polygon:o.map(c=>Tx(c,l,e)),token:a.token,breite:l,strichart:a.strichart??"durchgezogen",zustand:a.zustand})}return i}function Rx(n,e){const t=n.szene?.canvas.getBoundingClientRect();if(!t)return[];const i=Tu(n,{x:t.left,y:t.top}).find(a=>a.id===e);if(!i)return[];const r=i.breite%2===1?.5:0,s=i.polygon.map(a=>({x:a.x-r+t.left,y:a.y-r+t.top}));return ox(s,4).map(a=>({x:Math.round(a.x),y:Math.round(a.y)}))}function Cx(n,e,t,i){const r=Tu(n,e),s=Px(n,e);return z("svg",{class:"konturen",width:String(t),height:String(i),viewBox:`0 0 ${t} ${i}`,"aria-hidden":"true","shape-rendering":"crispEdges"},...r.map(a=>z("path",{"data-key":`kontur-${a.id}`,class:`kontur ${a.zustand}`,d:`M ${a.polygon.map(o=>`${o.x} ${o.y}`).join(" L ")} Z`,fill:"none","stroke-width":String(a.breite),"stroke-dasharray":a.strichart==="gestrichelt"?"6 4":null,"data-kontur-id":a.id,"data-kontur-token":a.token,"data-kontur-breite":String(a.breite),"data-kontur-strichart":a.strichart,"data-zustand":a.zustand,style:`stroke: var(--farbe-${a.token})`})),...s)}function Px(n,e){const t=[];for(const i of n.auswahl){if(i.teil?.art!=="kante")continue;const r=n.huelle(i.element_id);if(!r||!n.szene)continue;const s=n.szene.kantenVon(i.element_id,r).find(a=>a.adresse===i.teil?.adresse);s&&t.push(z("line",{"data-key":`kante-${s.adresse}`,x1:String(Math.round(s.von.x-e.x)),y1:String(Math.round(s.von.y-e.y)),x2:String(Math.round(s.bis.x-e.x)),y2:String(Math.round(s.bis.y-e.y)),"stroke-width":"3","data-kante":i.teil.adresse,style:"stroke: var(--farbe-akzent)"}))}return t}function Ru(n){return z("div",{class:"reiterzeile",role:"tablist","data-chrome":"","data-key":"reiter"},...n.projekt.content.map(e=>z("button",{type:"button",role:"tab",class:"reiter","data-key":`tab-${e.id}`,"data-befehl":"dokument.wechseln","data-par":JSON.stringify({dok:e.id}),"aria-selected":e.id===n.dok?"true":"false",tabindex:"-1"},e.meta.name,n.andere.aktiv&&n.andere.dok===e.id?z("span",{class:"person-marke","data-zustand":"andere",title:n.t("anwesenheit.person")},_t("user",12)):null)))}function vs(n){const e=n.pfadGlieder(),t=n.dokument(),i=[];return e.forEach((r,s)=>{const a=s===e.length-1,o=r.id===t.id,l=n.zustaende(r.id);s>0&&i.push(z("span",{class:"trenner","data-key":`t-${r.id}`},_t("chevron-right",12))),i.push(z("button",{type:"button",class:"glied","data-key":`g-${r.id}`,"data-id":r.id,"data-befehl":o?"element.verlassen":"element.aktivieren","data-par":JSON.stringify({element:r.id}),"data-zustand":l.join(" ")||null,"data-akzent":l.includes("ausgewaehlt")?"auswahl":null,"aria-current":a?"location":null,tabindex:"-1"},r.meta.name))}),z("nav",{class:"pfad","data-muster-kandidat":"Pfad","data-chrome":"","data-key":"pfad","aria-label":n.t("pfad.titel")},...i)}const kx=["ansicht.einpassen","ansicht.auf-auswahl","ansicht.isolieren","ansicht.alles-einblenden","ansicht.projektion","darstellung.wechseln"];function Cu(n){const e=kx.map(t=>n.befehl(t)).filter(t=>!!t);return z("div",{class:"ansichtsleiste",role:"toolbar","data-muster-kandidat":"Ansichtsleiste","data-chrome":"","data-ort":"ansichtsleiste","data-key":"ansichtsleiste","aria-label":n.t("ansichtsleiste.titel")},...e.map(t=>z("button",{type:"button",class:"schalter","data-befehl":t.id,"data-key":`al-${t.id}`,"aria-disabled":n.anwendbar(t)?null:"true","aria-pressed":t.id==="ansicht.isolieren"?n.isoliert?"true":"false":null,title:n.t(t.titel),"aria-label":n.t(t.titel)},_t(Au[t.id]??"square"))),z("div",{class:"menue-eintrag","data-key":"mehr"},z("button",{type:"button",class:"schalter","data-menue-trigger":"ansicht","aria-haspopup":"menu","aria-expanded":n.menue==="ansicht"?"true":"false",title:n.t("ansichtsleiste.mehr"),"aria-label":n.t("ansichtsleiste.mehr")},_t("chevron-down")),n.menue==="ansicht"?hr("ansichtsleiste",[...Di(n,"Ansicht"),...Di(n,"Ansicht speichern")],"menue","nach-oben"):null))}function Lx(n,e,t){const i=n.auswahlart();if(i==="keine"||n.dnd||n.griff)return null;const r=ur(n.register,i,h=>n.anwendbar(h)),s=fo(r);if(!s.length)return null;const o=n.auswahlIds().map(h=>dr(n,h)).filter(h=>!!h).flat();if(!o.length)return null;const l=gs(o),c=Math.min(Math.max(l.x+l.breite/2-e.x,110),t-110),u=Math.max(l.y-e.y-46,84);return go(n,s,`left:${Math.round(c)}px;top:${Math.round(u)}px`)}function go(n,e,t){return z("div",{class:"kontextaktionen",role:"toolbar","data-muster":"Kontextaktionen","data-chrome":"","data-weg":"kontextaktion","data-key":"kontextaktionen",style:t},...e.map(i=>z("button",{type:"button",class:"schalter","data-befehl":i.id,"data-key":`ka-${i.id}`,title:n.t(i.titel),"aria-label":n.t(i.titel)},_t(Au[i.id]??"square"))))}function Dx(n,e){if(n.auswahlIds().length!==1)return null;const t=n.find(n.auswahlIds()[0]);if(!t||!n.szene||n.istAusgeblendet(t.id))return null;const i=Ax(t),r=n.huelle(t.id);if(!i||!r)return null;const s=n.szene.projiziere([(r.min[0]+r.max[0])/2,(r.min[1]+r.max[1])/2,r.max[2]]);return z("div",{class:"griff",role:"slider",tabindex:"-1","data-griff":t.id,"data-griff-name":i,"data-muster-kandidat":"Griff","data-chrome":"","data-akzent":"auswahl","aria-label":n.t(`feld.${i}`),"aria-valuenow":String(qe(t.params[i])),"data-key":"griff",style:`left:${Math.round(s.x-e.x)}px;top:${Math.round(s.y-e.y-22)}px`},_t("arrow-up",14))}function Ix(n,e){const t=[];for(const[r,s]of n.zeilen().entries()){const a=Eu(n,s.element.id);if(!a||n.istAusgeblendet(s.element.id))continue;const o=dr(n,s.element.id);if(!o)continue;const l=gs(o);t.push(z("div",{class:"modell-status","data-chrome":"","data-key":`ms-${s.element.id}`,style:`left:${Math.round(l.x-e.x)}px;top:${Math.round(l.y-e.y-22)}px`},tr(n,a,s.element.id)))}const i=n.andereElemente()[0];if(i){const r=dr(n,i);if(r){const s=gs(r);t.push(z("div",{class:"namensschild","data-chrome":"","data-key":"namensschild","data-person":"",style:`left:${Math.round(s.x-e.x)}px;top:${Math.round(s.y-e.y-44)}px`},n.t("anwesenheit.person")),z("div",{class:"fremder-zeiger","data-chrome":"","data-key":"fremder-zeiger","data-zeiger":"",style:`left:${Math.round(s.x+s.breite*.75-e.x)}px;top:${Math.round(s.y+s.hoehe*.55-e.y)}px`},_t("user",14),z("span",{class:"name"},n.t("anwesenheit.person")),z("span",{class:"simuliert"},n.t("simuliert"))))}}return t}function Nx(n,e){const t=n.griff;if(!t)return null;const i=t.eingabe!==""?t.eingabe:String(Math.round(t.wert));return z("div",{class:"zeigerzahl","data-zeigerzahl":"","data-chrome":"","data-key":"zeigerzahl",style:`left:${Math.round(t.zeiger.x-e.x+14)}px;top:${Math.round(t.zeiger.y-e.y-28)}px`},`${i} mm`)}function zx(n){const t=n.szene?.canvas.getBoundingClientRect(),i={x:t?.left??0,y:t?.top??0},r=Math.round(t?.width??0),s=Math.round(t?.height??0),a=n.dokument().content.length===0;return[Cx(n,i,r,s),Ru(n),vs(n),n.aktiv?z("button",{type:"button",class:"knopf haupt fertig","data-chrome":"","data-befehl":"element.verlassen","data-hauptaktion":"","data-akzent":"hauptaktion","data-key":"fertig"},n.t("aktiv.fertig")):null,a?z("div",{class:"leer mitte","data-muster":"Leerer Zustand","data-key":"leer-modell"},z("p",{},n.t("modell.leer"))):null,Lx(n,i,r),Dx(n,i),...Ix(n,i),Nx(n,i),Cu(n)]}function Pu(n){const e=n.befunde();return[z("div",{class:"zonenkopf","data-key":"kopf"},z("h2",{},n.t("panel.befunde")),z("button",{type:"button",class:"schalter","data-befehl":"fenster.panel","aria-label":n.t("befehl.fenster.panel"),title:n.t("befehl.fenster.panel")},_t("x",14))),e.length?z("div",{class:"befunde","data-key":"liste"},...e.map(t=>{const i=n.letzterGueltigerWert(t);return z("div",{class:"befund","data-muster":"Befund","data-schwere":"fehler","data-element":t.elementId,"data-key":`b-${t.elementId}`},z("span",{class:"schwere"},_t("circle-alert",14),z("span",{class:"wort"},n.t("status.fehlerhaft"))),z("span",{class:"ort"},n.name(t.elementId)),z("span",{class:"text"},n.t(t.schluessel,{wert:`${t.wert} mm`,grenze:`${t.grenze} mm`})),z("button",{type:"button",class:"knopf","data-befehl":"element.wert-setzen","data-weg":"befund","data-par":JSON.stringify({element:t.elementId,name:t.parameter,wert:{value:i,unit:"mm"}})},n.t("befund.korrektur")))})):z("div",{class:"leer","data-muster":"Leerer Zustand","data-key":"leer"},z("p",{},n.t("panel.keine-befunde")))]}function ku(n){const e=n.rueckmeldung;return e?[z("span",{class:"rueckmeldung-text","data-muster":"Rueckmeldung",role:"status","data-key":"text"},n.t(e.schluessel,e.werte))]:[]}function mc(n,e,t){const i=n.task===e;return z("button",{type:"button",class:"task","data-befehl":"task.wechseln","data-par":JSON.stringify({task:e}),"aria-pressed":i?"true":"false","aria-current":i?"true":null,title:n.t(`task.${e}`),"aria-label":n.t(`task.${e}`)},_t(t,20))}function Ux(n){return[z("div",{class:"tasks",role:"group","data-key":"tasks"},mc(n,"modellieren","box"),mc(n,"simulation","play")),z("div",{class:"unten","data-key":"unten"},z("button",{type:"button",class:"task","aria-disabled":"true",title:n.t("task.shop"),"aria-label":n.t("task.shop")},_t("layers",20)))]}class Fx{constructor(e,t){this.wurzel=e,this.app=t;const i=(s,a,o={})=>{const l=z(a,{"data-zone":s,tabindex:"0","aria-label":t.t(`zone.${s}`),...o});return this.zonen[s]=l,l};this.rahmen=z("div",{class:"fenster"});const r=z("div",{class:"rechts-spalte"});r.append(i("eigenschaften","section",{"data-weg":"eigenschaften"}),i("chat","section",{"data-weg":"chat"})),this.rahmen.append(i("menueleiste","header",{role:"menubar"}),i("taskleiste","nav"),i("struktur","aside",{"data-weg":"struktur"}),i("modell","main"),r,i("panel","section",{"data-weg":"menue"}),i("rueckmeldung","footer")),this.zonen.menueleiste.dataset.weg="menue",this.chrome=z("div",{class:"chrome"}),this.overlay=z("div",{class:"ueberlagerung"}),this.zonen.modell.append(this.chrome),this.wurzel.replaceChildren(this.rahmen,this.overlay),this.szene=new ux(this.zonen.modell),this.szene.tempo=t.tempo,t.szene=this.szene,this.szene.beiAenderung(()=>this.chromeNeu()),t.beiRendern(()=>this.rendern())}rahmen;zonen={};chrome;overlay;zeichenSignatur="";klassen="";szene;chromeGeplant=!1;chromeNeu(){this.chromeGeplant||(this.chromeGeplant=!0,requestAnimationFrame(()=>{this.chromeGeplant=!1,this.chromeZeichnen()}))}chromeZeichnen(){const e=z("div",{class:"chrome"},...zx(this.app).filter(t=>!!t));jr(this.chrome,e)}zone(e,t){const i=z("div",{},...t.filter(r=>!!r));jr(this.zonen[e],this.mitAttributen(this.zonen[e],i))}mitAttributen(e,t){for(const i of[...e.attributes])t.setAttribute(i.name,i.value);return t}rendern(){const e=this.app,t=e.zonen,i=[t.struktur?"":"ohne-struktur",t.rechts?"":"ohne-rechts",t.panel?"mit-panel":""].filter(Boolean).join(" ");i!==this.klassen&&(this.klassen=i,this.rahmen.className=`fenster ${i}`.trim(),this.szene.groesseAnpassen()),this.szene.projektion!==e.projektionsart&&this.szene.setProjektion(e.projektionsart),document.documentElement.dataset.thema=e.thema,this.rahmen.dataset.task=e.task,this.zone("menueleiste",yx(e)),this.zone("taskleiste",Ux(e)),this.zone("struktur",ts(e)),this.zone("eigenschaften",yu(e)),this.zone("chat",hx(e)),this.zone("panel",t.panel?Pu(e):[]),this.zone("rueckmeldung",ku(e)),this.zeichneSzene(),this.chromeZeichnen(),this.ueberlagerung(),this.fokusSetzen()}fokusSetzen(){const e=this.app,t=document.activeElement;if(e.suche.offen){const i=this.rahmen.querySelector("[data-suchfeld]");i&&t!==i&&!e.suche.fokussiert&&(e.suche.fokussiert=!0,i.focus())}else e.suche.fokussiert=!1;if(e.umbenennen){const i=this.rahmen.querySelector("[data-umbenennen]");i&&t!==i&&!e.umbenennenFokussiert&&(e.umbenennenFokussiert=!0,i.focus(),i.select())}else e.umbenennenFokussiert=!1;e.fokusEigenschaften&&(e.fokusEigenschaften=!1,this.rahmen.querySelector("[data-feld-eingabe]")?.focus())}zeichneSzene(){const e=this.app,t=e.angezeigtesDokument(),i=On(t),r=e.versteckteIds(),s=e.gedimmteIds(),a=e.blasseIds(),o=e.geisterKoerper(),l=JSON.stringify([t,[...r],[...s],[...a],e.darstellung,e.thema,o]);l!==this.zeichenSignatur&&(this.zeichenSignatur=l,this.szene.zeichne({koerper:i.koerper,darstellung:e.darstellung,versteckt:r,gedimmt:s,blass:a,geister:o}),e.einpassenNoetig&&(e.einpassenNoetig=!1,this.einpassenSofort()))}einpassenSofort(){this.szene.groesseAnpassen(),this.szene.passeEin(this.app.huelleAlle(),0)}neuesDokument(){this.zeichenSignatur=""}ueberlagerung(){const e=this.app,t=[],i=wu(e);if(i&&t.push(i),e.dnd){const r=e.find(e.dnd.id);t.push(z("div",{class:"zieh-vorschau","data-overlay":"ziehen","data-muster-kandidat":"Ziehen & Ablegen","data-key":"ziehen",style:`left:${Math.round(e.dnd.x+14)}px;top:${Math.round(e.dnd.y+14)}px`},r?.meta.name??""))}jr(this.overlay,z("div",{class:"ueberlagerung"},...t))}}const Ox=[[/\bsteg\b|\brib\b|\bweb\b/,"steg"],[/grundplatte|base ?plate|\bbase\b/,"grundplatte"],[/bohrung|\bholes?\b/,"bohrungen"],[/deckel|\blid\b/,"deckel"],[/gehäuse|gehaeuse|\bhousing\b/,"gehaeuse"]],Bx=[[/dick|thick/,"dicke"],[/hoch|höher|hoeher|höhe|hoehe|tall|high|height/,"hoehe"],[/lang|länge|laenge|long|length/,"laenge"],[/breit|wide|width/,"breite"],[/durchmesser|diameter|ø/,"durchmesser"],[/radius|rund|round/,"eckradius"]];function Vx(n,e){for(const[t,i]of Ox)if(t.test(e))return n.find(i);return n.gewaehlteElemente()[0]}function Hx(n){return["dicke","hoehe","durchmesser"].find(e=>n.params[e]!==void 0)}function Uo(n,e,t,i){const r=po(e.params[t],n.sprache),s=po(ct(i),n.sprache);return{titel:n.t("chat.vorschlag.wert",{element:e.meta.name,feld:n.t(`feld.${t}`),nachher:s}),begruendung:n.t("chat.vorschlag.begruendung"),werte:[{feld:n.t(`feld.${t}`),vorher:r,nachher:s}],befehle:[{id:"element.wert-setzen",parameter:{element:e.id,name:t,wert:ct(i)}}],ziel:e.id}}function pa(n,e,t,i,r){return{titel:n.t(e,{element:t?.meta.name??""}),begruendung:n.t("chat.vorschlag.begruendung"),werte:[],befehle:[{id:i,parameter:r}],ziel:t?.id??""}}function Gx(n,e){const t=e.toLowerCase(),i=Vx(n,t),r=/(\d+(?:[.,]\d+)?)\s*(mm|cm|m)\b/.exec(t);if(r&&i){const s={mm:1,cm:10,m:1e3}[r[2]],a=Number(r[1].replace(",","."))*s,o=Bx.find(([l])=>l.test(t))?.[1]??Hx(i);if(o&&i.params[o]!==void 0)return Uo(n,i,o,a)}if(/dupliz|kopie|kopier|copy|clone/.test(t)&&i)return pa(n,"chat.vorschlag.duplizieren",i,"element.duplizieren",{element:i.id});if(/verwirf|wirf .*weg|entfern|lösch|loesch|discard|remove|delete/.test(t)&&i)return pa(n,"chat.vorschlag.verwerfen",i,"element.verwerfen",{element:i.id});if(/\banlegen\b|leg .*an|neues|neue |create|new /.test(t)){const s=/baugruppe|assembly/.test(t)?"baugruppe":"teil";return pa(n,"chat.vorschlag.anlegen",void 0,"element.anlegen",{typ:s})}return null}function Wx(n){n.registriere("chat.senden",e=>{const t=(typeof e.text=="string"?e.text:n.chat.eingabe).trim();if(!t)return!1;n.chat.nachrichten.push({von:"person",text:t}),n.chat.eingabe="";const i=Gx(n,t);i?(n.chat.vorschlag=i,n.chat.nachrichten.push({von:"ki",text:"",schluessel:"chat.antwort.vorschlag"})):(n.chat.vorschlag=null,n.chat.nachrichten.push({von:"ki",text:"",schluessel:"chat.antwort.unklar"}))}),n.registriere("chat.uebernehmen",()=>{const e=n.chat.vorschlag;if(!e)return!1;n.chat.vorschlag=null;for(const t of e.befehle)n.ausfuehren(t.id,t.parameter,"chat","ki");n.chat.nachrichten.push({von:"ki",text:"",schluessel:"chat.antwort.erledigt"})}),n.registriere("chat.verwerfen",()=>{n.chat.vorschlag=null,n.chat.nachrichten.push({von:"ki",text:"",schluessel:"chat.antwort.verworfen"})})}const it=(n,...e)=>z("figure",{class:"beispiel","data-key":n},z("figcaption",{},n),...e.filter(t=>!!t)),ma=(n,e,t)=>JSON.stringify(n.darstellungVon(e,t)?.kanaele??[]),Lu=[{zustand:"hover",element:"steg",darstellungen:["modell","struktur"],einrichten:n=>n.hover="steg"},{zustand:"ausgewaehlt",element:"grundplatte",darstellungen:["modell","struktur","chat"],einrichten:n=>n.setzeAuswahl([{element_id:"grundplatte"}])},{zustand:"andere",element:"steg",darstellungen:["modell","struktur"],einrichten:n=>n.andere={aktiv:!0,dok:"halter",element:"steg"}},{zustand:"aktiv",element:"gehaeuse",doku:!0,darstellungen:["modell","struktur","pfad"],einrichten:n=>{n.dok="sensorgehaeuse",n.aktiv="gehaeuse"}},{zustand:"gedimmt",element:"deckel",doku:!0,darstellungen:["modell","struktur"],einrichten:n=>{n.dok="sensorgehaeuse",n.aktiv="gehaeuse"}},{zustand:"ausgeblendet",element:"skizze",darstellungen:["modell","struktur"],einrichten:n=>n.ausgeblendet.add("skizze")},{zustand:"fehlerhaft",element:"bohrungen",darstellungen:["modell","struktur"],einrichten:n=>{const e=bt(n.dokument(),"bohrungen");e&&(e.params.durchmesser=ct(55))}},{zustand:"pausiert",element:"steg",darstellungen:["modell","struktur"],einrichten:n=>{const e=bt(n.dokument(),"steg");e&&(e.meta.pausiert=!0)}},{zustand:"rechnet",element:"grundplatte",darstellungen:["modell","struktur"],einrichten:n=>n.status.set("grundplatte","rechnet")}];function Xx(n,e){const t=n.darstellungVon(e,"modell")?.kanaele.find(s=>s.kanal==="Kontur"),i=t?.breite??1,r=n.darstellungVon(e,"modell")?.kanaele??[];return z("span",{class:"modell-probe","data-kanaele":JSON.stringify(r),"data-id":e,style:"display:inline-flex;gap:8px;align-items:center"},z("svg",{width:"72",height:"36",viewBox:"0 0 72 36"},z("rect",{x:"6",y:"6",width:"60",height:"24",fill:"none","stroke-width":String(i),"stroke-dasharray":t?.strichart==="gestrichelt"?"6 4":null,style:`stroke: var(--farbe-${t?.token??"linie"})`,opacity:n.zustaende(e).includes("ausgeblendet")?"0.35":null})))}function qx(n){return Lu.map(e=>{const t=n.app(e.einrichten),i=t.find(e.element);if(!i)return z("span",{});const r=e.darstellungen.map(s=>s==="modell"?z("div",{class:"teil"},Xx(t,e.element)):s==="struktur"?z("div",{class:"teil baum","data-kanaele":ma(t,e.element,"struktur")},Ei(t,i,0,0)):s==="chat"?z("div",{class:"teil","data-kanaele":ma(t,e.element,"chat")},No(t)):z("div",{class:"teil","data-kanaele":ma(t,e.element,"pfad")},vs(t)));return it(n.t(`katalog.zustand.${e.zustand}`),z("div",{class:"zeile-bsp"},...r))})}const Yx=["schritt"];function $x(n,e){const t=ur(n.register,e,i=>n.anwendbar(i));return n.kontextMenue={x:0,y:0,art:e,gruppen:t,mehr:new Set(["Bearbeiten"])},wu(n)}const Fo=[{id:"zustaende",bezug:{art:"kandidat",name:"Elementzustände"},adrs:[65,61],befehle:["auswahl.setzen","element.ausblenden","element.verwerfen"],tokens:["akzent","akzent-flaeche","flaeche-2","linie-stark","text-2","text-3","fehler","fehler-flaeche"],beispiele:qx},{id:"auswahl",bezug:{art:"muster",name:"Auswahl im Modell"},adrs:[65,58],befehle:["auswahl.setzen","auswahl.alles","auswahl.aufheben"],tokens:["akzent","akzent-flaeche"],beispiele:n=>{const e=n.app(t=>t.setzeAuswahl([{element_id:"grundplatte"},{element_id:"steg"}]));return[it(n.t("katalog.bsp.auswahl-struktur"),z("div",{class:"baum"},...ts(e))),it(n.t("katalog.bsp.auswahl-eigenschaften"),z("div",{},...yu(e))),it(n.t("katalog.bsp.auswahl-chat"),No(e))]}},{id:"struktur-zeile",bezug:{art:"kandidat",name:"Struktur-Zeile"},adrs:[65],befehle:["element.aktivieren","element.ausblenden","element.umbenennen"],tokens:["flaeche-2","akzent-flaeche","text","text-3","fehler"],beispiele:n=>Lu.filter(e=>["hover","ausgewaehlt","ausgeblendet","fehlerhaft","rechnet"].includes(e.zustand)).map(e=>{const t=n.app(e.einrichten),i=t.find(e.element);return it(n.t(`katalog.zustand.${e.zustand}`),i?z("div",{class:"baum"},Ei(t,i,0,0)):null)})},{id:"auge",bezug:{art:"kandidat",name:"Auge"},adrs:[65,15],befehle:["element.ausblenden","element.einblenden","ansicht.alles-einblenden"],tokens:["text-2","text-3","flaeche-2"],beispiele:n=>{const e=n.app(),t=n.app(i=>i.ausgeblendet.add("steg"));return[it(n.t("katalog.bsp.auge-an"),z("div",{class:"baum"},Ei(e,e.find("steg"),0,0))),it(n.t("katalog.bsp.auge-aus"),z("div",{class:"baum"},Ei(t,t.find("steg"),0,0)))]}},{id:"kontextmenue",bezug:{art:"kandidat",name:"Kontextmenü"},adrs:[65,45],befehle:["element.duplizieren","element.umbenennen","element.verwerfen","ansicht.auf-auswahl"],tokens:["flaeche","linie-stark","flaeche-2","text-3"],beispiele:n=>Yx.map(e=>{const t=n.app(r=>r.setzeAuswahl([{element_id:"grundplatte"}])),i=$x(t,e);return it(n.t("katalog.bsp.kontextmenue"),i)})},{id:"kontextaktionen",bezug:{art:"muster",name:"Kontextaktionen"},adrs:[65,63],befehle:["element.duplizieren","element.umbenennen","element.verwerfen","element.ausblenden","ansicht.auf-auswahl"],tokens:["flaeche","linie-stark","flaeche-2"],beispiele:n=>{const e=n.app(s=>s.setzeAuswahl([{element_id:"grundplatte"}])),t=fo(ur(e.register,"schritt",s=>e.anwendbar(s))),i=n.app(s=>s.setzeAuswahl([{element_id:"grundplatte"},{element_id:"steg"}])),r=fo(ur(i.register,"mehrfach",s=>i.anwendbar(s)));return[it(n.t("katalog.bsp.ein-element"),go(e,t,null)),it(n.t("katalog.bsp.mehrere"),go(i,r,null))]}},{id:"dropdown",bezug:{art:"kandidat",name:"Dropdown"},adrs:[65,60],befehle:["bearbeiten.rueckgaengig","element.duplizieren","auswahl.alles","element.umhaengen"],tokens:["flaeche","linie-stark","flaeche-2","text-3"],beispiele:n=>{const e=n.app();return[it(n.t("familie.Bearbeiten"),hr("dropdown-bearbeiten",Di(e,"Bearbeiten"))),it(n.t("familie.Baugruppe"),hr("dropdown-baugruppe",Di(e,"Baugruppe")))]}},{id:"suche",bezug:{art:"muster",name:"Suche"},adrs:[45,52],befehle:["suche.oeffnen","katalog.oeffnen"],tokens:["flaeche","linie-stark","akzent-flaeche"],beispiele:n=>{const e=n.app(t=>t.suche={offen:!0,text:"ver",index:0,alle:!1,fokussiert:!0});return[it(n.t("katalog.bsp.suche"),gu(e))]}},{id:"wertfeld",bezug:{art:"muster",name:"Wertfeld"},adrs:[44,57],befehle:["element.wert-setzen"],tokens:["flaeche-2","linie","linie-stark"],beispiele:n=>{const e=n.app(),t={key:"laenge",param:"laenge",text:"80 mm",editierbar:!0},i={...t,text:n.t("eigenschaften.gemischt")},r=n.app(s=>s.feldBefund={feld:"laenge",schluessel:"wert.fehler.nicht-lesbar"});return[it(n.t("katalog.bsp.wert"),es(e,t,["grundplatte"],!1)),it(n.t("katalog.bsp.gemischt"),es(e,i,["grundplatte","steg"],!0)),it(n.t("katalog.bsp.fehler"),es(r,{...t,text:"abc"},["grundplatte"],!1))]}},{id:"griff",bezug:{art:"kandidat",name:"Griff"},adrs:[44,65],befehle:["element.wert-setzen"],tokens:["akzent","flaeche","linie-stark"],beispiele:n=>[it(n.t("katalog.bsp.griff"),z("div",{class:"zeile-bsp"},z("div",{class:"griff","data-akzent":"auswahl"},_t("arrow-up",14)),z("div",{class:"zeigerzahl"},"12 mm")))]},{id:"ziehen-ablegen",bezug:{art:"kandidat",name:"Ziehen & Ablegen"},adrs:[65,51],befehle:["element.umhaengen"],tokens:["akzent-flaeche","fehler-flaeche","flaeche"],beispiele:n=>{const e=(r,s,a)=>{r.dok="sensorgehaeuse",r.dnd={id:s==="gehaeuse"?"baugruppe-1":"deckel",x:0,y:0,ziel:s,erlaubt:a}},t=n.app(r=>e(r,"baugruppe-1",!0)),i=n.app(r=>e(r,"gehaeuse",!1));return[it(n.t("katalog.bsp.ablegen-ok"),z("div",{class:"baum"},...ts(t))),it(n.t("katalog.bsp.ablegen-nein"),z("div",{class:"baum"},...ts(i)))]}},{id:"statusanzeige",bezug:{art:"muster",name:"Statusanzeige"},adrs:[50,61],befehle:["element.pausieren","element.fortsetzen"],tokens:["fehler","text-2"],beispiele:n=>{const e=n.app();return[it(n.t("status.rechnet"),tr(e,{zustand:"rechnet",symbol:"loader",token:"text-2"},"grundplatte")),it(n.t("status.fehlerhaft"),tr(e,{zustand:"fehlerhaft",symbol:"circle-alert",token:"fehler"},"bohrungen")),it(n.t("status.pausiert"),tr(e,{zustand:"pausiert",symbol:"circle-pause",token:"text-2"},"steg"))]}},{id:"befund",bezug:{art:"muster",name:"Befund"},adrs:[50,61],befehle:["element.wert-setzen","fenster.panel"],tokens:["fehler","fehler-flaeche","warnung-flaeche"],beispiele:n=>{const e=n.app(t=>{const i=bt(t.dokument(),"bohrungen");i&&(i.params.durchmesser=ct(55))});return[it(n.t("panel.befunde"),z("div",{},...Pu(e)))]}},{id:"rueckmeldung",bezug:{art:"muster",name:"Rückmeldung"},adrs:[50,61],befehle:["bearbeiten.rueckgaengig"],tokens:["text-2","flaeche"],beispiele:n=>{const e=n.app(t=>t.meldung("rueck.verworfen",{name:"Steg"}));return[it(n.t("katalog.bsp.rueckmeldung"),z("div",{class:"leise"},...ku(e)))]}},{id:"entscheidungskarte",bezug:{art:"muster",name:"Entscheidungskarte"},adrs:[21,61],befehle:["chat.uebernehmen","chat.verwerfen"],tokens:["akzent","flaeche","linie-stark"],beispiele:n=>{const e=n.app(t=>{const i=bt(t.dokument(),"steg");i&&(t.chat.vorschlag=Uo(t,i,"hoehe",40))});return[it(n.t("katalog.bsp.karte"),bu(e))]}},{id:"pfad",bezug:{art:"kandidat",name:"Pfad"},adrs:[65],befehle:["element.aktivieren","element.verlassen"],tokens:["text-2","text","flaeche-2"],beispiele:n=>{const e=n.app(t=>{t.dok="sensorgehaeuse",t.aktiv="gehaeuse"});return[it(n.t("katalog.bsp.pfad"),vs(e)),it(n.t("katalog.bsp.pfad-wurzel"),vs(n.app()))]}},{id:"dokument-reiter",bezug:{art:"kandidat",name:"Dokument-Reiter"},adrs:[65],befehle:["dokument.wechseln"],tokens:["flaeche","flaeche-2","text-2"],beispiele:n=>[it(n.t("katalog.bsp.reiter"),Ru(n.app()))]},{id:"ansichtsleiste",bezug:{art:"kandidat",name:"Ansichtsleiste"},adrs:[65,60],befehle:["ansicht.einpassen","ansicht.auf-auswahl","ansicht.isolieren","ansicht.projektion","darstellung.wechseln"],tokens:["flaeche","linie","flaeche-2"],beispiele:n=>[it(n.t("katalog.bsp.ansichtsleiste"),Cu(n.app()))]},{id:"fokus-tastatur",bezug:{art:"kandidat",name:"Fokus und Tastatur"},adrs:[60,65],befehle:["suche.oeffnen","bearbeiten.rueckgaengig","fenster.naechste-zone"],tokens:["akzent","text-2"],beispiele:n=>{const e=n.app(),t=e.find("steg"),i=Li.filter(r=>r.kuerzel);return[it(n.t("katalog.bsp.fokus"),z("div",{class:"baum"},t?Ei(e,t,0,0):null)),it(n.t("katalog.bsp.kuerzel"),z("ul",{class:"kuerzel-liste"},...i.map(r=>z("li",{"data-key":r.id},z("span",{},n.t(r.titel)),z("kbd",{},Fi(r.kuerzel,n.sprache))))))]}}];Fo.map(n=>n.id);function Zx(n,e,t){n.replaceChildren(z("div",{class:"katalog","data-katalog":"uebersicht"},z("h1",{},e("katalog.titel")),z("p",{},e("katalog.einleitung")),z("div",{class:"katalog-raster"},...Fo.map(i=>z("a",{class:"katalog-karte",href:`?katalog=${i.id}&thema=${t}`,"data-katalog-link":i.id},z("h2",{},e(`katalog.baustein.${i.id}`)))))))}function Kx(n,e,t,i,r){const s=l=>({t,sprache:i,thema:l,app:c=>{const u=new _u(t,i,0,Li,ws());return u.thema=l,c?.(u),u}}),a=l=>z("div",{"data-bild":l,"data-thema":l,class:"bild"},z("h3",{},t(`katalog.${l}`)),...e.beispiele(s(l))),o=e.befehle.map(l=>Li.find(c=>c.id===l)).filter(l=>!!l);n.replaceChildren(z("div",{class:"katalog","data-katalog":"seite","data-baustein":e.id,"data-muster-kandidat":e.bezug.art==="kandidat"?e.bezug.name:null},z("a",{href:`?katalog&thema=${r}`,class:"zurueck"},t("katalog.zurueck")),z("h1",{},t(`katalog.baustein.${e.id}`)),z("section",{},z("h2",{},t("katalog.ueberschrift.regel")),z("p",{"data-regel":"","data-schluessel":`katalog.regel.${e.id}`},t(`katalog.regel.${e.id}`))),z("section",{},z("h2",{},t("katalog.ueberschrift.bezug")),z("p",{"data-bezug":"","data-art":e.bezug.art,"data-name":e.bezug.name,"data-adrs":JSON.stringify(e.adrs)},e.bezug.art==="muster"?t("katalog.bezug.muster",{name:e.bezug.name}):t("katalog.bezug.kandidat",{name:e.bezug.name})," ",e.adrs.map(l=>`ADR-${String(l).padStart(3,"0")}`).join(", "))),z("section",{},z("h2",{},t("katalog.ueberschrift.befehle")),z("ul",{},...o.map(l=>z("li",{"data-befehl-id":l.id},t(l.titel))))),z("section",{},z("h2",{},t("katalog.ueberschrift.tokens")),z("p",{"data-tokens":""},e.tokens.join(", "))),z("section",{class:"katalog-bild"},a("hell"),a("dunkel"))))}async function Jx(n,e,t,i,r){const s=Fo.find(a=>a.id===e);s?Kx(n,s,t,i,r):Zx(n,t,r),await document.fonts.ready,document.documentElement.dataset.bereit="1"}const gc=fu;function ns(n,e){return(gc[n]??Object.values(gc)[0])?.[e]??{}}function Qx(n,e,t){const i=ns(n,e);for(const r of["verschieben","drehen","zoomen"])for(const s of i[r]??[])if(s.taste===t.taste&&!!s.umschalt===t.umschalt&&!!s.strg===t.strg)return r;return null}const jx=n=>n!==0&&(Math.abs(n)%100===0||Math.abs(n)%120===0);function eb(n,e){if(e.ctrlKey)return(ns(n,"trackpad").zoomen??[]).some(s=>s.spreizen)?"zoomen":null;if(e.deltaX===0&&jx(e.deltaY))return(ns(n,"maus").zoomen??[]).some(s=>s.rad)?"zoomen":null;const i=ns(n,"trackpad"),r=e.shiftKey;for(const s of["verschieben","drehen"])if((i[s]??[]).some(a=>a.wischen&&!!a.umschalt===r))return s;return null}function tb(n,e){const t=n.huelle(e);if(!t||!n.szene)return{x:0,y:-1};const i=(t.min[0]+t.max[0])/2,r=(t.min[1]+t.max[1])/2,s=n.szene.projiziere([i,r,t.max[2]]),a=n.szene.projiziere([i,r,t.max[2]+1]);return{x:a.x-s.x,y:a.y-s.y}}const ga=4;function nb(n){try{return JSON.parse(n.dataset.par??"{}")}catch{return{}}}function ib(n){return n.closest("[data-weg]")?.dataset.weg??"menue"}function rb(n,e){const t=document.getElementById("app"),i=e.zonen.modell,r=e.zonen.struktur;let s=!1;const a=M=>{const y=n.find(M)?.type==="view";n.ausfuehren(y?"ansicht.anwenden":"element.aktivieren",{element:M},"struktur")},o=()=>{let M=!1;return n.menue&&(n.menue=null,M=!0),n.kontextMenue&&(n.kontextMenue=null,M=!0),n.suche.offen&&(n.suche.offen=!1,M=!0),M&&n.rendern(),M};n.offenesSchliessen=o,t.addEventListener("click",M=>{const y=M.target;if(s){s=!1;return}const G=y.closest("[data-menue-trigger]");if(G){const he=G.dataset.menueTrigger;n.kontextMenue=null,n.suche.offen=!1,n.menue=n.menue===he?null:he,n.rendern();return}const O=y.closest("[data-mehr-toggle]");if(O&&n.kontextMenue){const he=O.dataset.mehrToggle;n.kontextMenue.mehr.has(he)?n.kontextMenue.mehr.delete(he):n.kontextMenue.mehr.add(he),n.rendern();return}const $=y.closest("[data-suche-element]");if($){n.suche.offen=!1,n.waehle($.dataset.sucheElement,"setzen");return}const K=y.closest("[data-befehl]");if(K&&!(K instanceof HTMLInputElement)){if(K.getAttribute("aria-disabled")==="true"&&K.dataset.folgt!=="true")return;n.ausfuehren(K.dataset.befehl,nb(K),ib(K));return}const ye=y.closest('[role="treeitem"]');if(ye){const he=ye.dataset.id;if(n.umhaengenModus){n.ausfuehren("element.umhaengen",{element:n.umhaengenModus,ziel:he},"struktur");return}n.offenesSchliessen?.(),n.waehle(he,M.shiftKey?"hinzufuegen":M.ctrlKey||M.metaKey?"umschalten":"setzen"),ye.focus();return}if(y.closest('[data-zone="struktur"]')&&!y.closest(".zonenkopf, .wurzel, .popup, [data-muster]")){n.setzeAuswahl([]);return}if(y.closest('[data-zone="modell"]')&&!y.closest("[data-chrome], .griff, .popup")){l(M);return}y.closest(".popup, .suche-eintrag, .menue-eintrag")||o()});function l(M){o();const y=n.szene?.trefferBei(M.clientX,M.clientY),G=M.shiftKey?"hinzufuegen":M.ctrlKey||M.metaKey?"umschalten":"setzen";if(!y){G==="setzen"&&n.setzeAuswahl([]);return}const O=n.zielFuerTreffer(y.elementId);if(!O){G==="setzen"&&n.setzeAuswahl([]);return}const $=n.kanteBei(O,M.clientX,M.clientY);n.waehle(O,G,$??void 0),i.focus({preventScroll:!0})}t.addEventListener("dblclick",M=>{const y=M.target,G=y.closest('[role="treeitem"]');if(G&&!y.closest("button")){a(G.dataset.id);return}const O=y.closest("[data-name-feld]");if(O){n.ausfuehren("element.umbenennen",{element:O.dataset.nameFeld},"eigenschaften");return}if(y.closest('[data-zone="modell"]')&&!y.closest("[data-chrome], .griff, .popup")){const $=n.szene?.trefferBei(M.clientX,M.clientY),K=$?n.zielFuerTreffer($.elementId):null;K&&n.ausfuehren("element.aktivieren",{element:K},"menue")}});function c(M,y){const G=n.auswahlart(),O=ur(n.register,G,ye=>n.anwendbar(ye));n.menue=null,n.suche.offen=!1;const $=260,K=420;n.kontextMenue={x:Math.max(4,Math.min(M,window.innerWidth-$-4)),y:Math.max(4,Math.min(y,window.innerHeight-K-4)),art:G,gruppen:O,mehr:new Set},n.rendern()}n.kontextOeffnen=c;let u=!1,h=null;function d(M,y){const G=n.szene?.trefferBei(M,y),O=G?n.zielFuerTreffer(G.elementId):null;if(O){const $=n.kanteBei(O,M,y),K=Fn(n.dokument(),G?.elementId??O).map(he=>he.id);(!n.auswahl.some(he=>K.includes(he.element_id))||$)&&n.waehle(O,"setzen",$??void 0)}else n.setzeAuswahl([]);c(M,y)}t.addEventListener("contextmenu",M=>{const y=M.target,G=y.closest('[role="treeitem"]');if(G){M.preventDefault();const O=G.dataset.id;n.auswahlIds().includes(O)||n.waehle(O,"setzen"),c(M.clientX,M.clientY);return}if(y.closest('[data-zone="struktur"]')&&!y.closest(".popup")){M.preventDefault(),n.setzeAuswahl([]),c(M.clientX,M.clientY);return}if(y.closest('[data-zone="modell"]')&&!y.closest("[data-chrome], .popup")){if(M.preventDefault(),u){h={x:M.clientX,y:M.clientY};return}if(m.bewegt)return;d(M.clientX,M.clientY);return}y.closest(".popup")&&M.preventDefault()});let f=null;const m={art:null,x:0,y:0,startX:0,startY:0,bewegt:!1,pointerId:-1},x=new Map;let g=null;const p=M=>{n.hover!==M&&(n.hover=M,n.rendern())};t.addEventListener("pointerdown",M=>{const y=M.target,G=y.closest(".griff");if(G&&M.button===0){P(M,G);return}const O=y.closest('[role="treeitem"]');if(O&&M.button===0&&!y.closest("button, input")){f={id:O.dataset.id,x:M.clientX,y:M.clientY};return}if(y.closest('[data-zone="modell"]')&&!y.closest("[data-chrome], .popup")){if(M.pointerType==="touch"){x.set(M.pointerId,{x:M.clientX,y:M.clientY}),g=R(),m.art=x.size===1?"drehen":null,m.x=M.clientX,m.y=M.clientY,m.startX=M.clientX,m.startY=M.clientY,m.bewegt=!1;return}const $=Qx(n.profil,"maus",{taste:M.button,umschalt:M.shiftKey,strg:M.ctrlKey||M.metaKey});m.art=$==="drehen"||$==="verschieben"?$:null,m.x=M.clientX,m.y=M.clientY,m.startX=M.clientX,m.startY=M.clientY,m.bewegt=!1,m.pointerId=M.pointerId,u=M.button===2,m.art&&M.button!==0&&M.preventDefault()}});function R(){const M=[...x.values()];if(M.length<2)return null;const[y,G]=M;return{cx:(y.x+G.x)/2,cy:(y.y+G.y)/2,d:Math.hypot(y.x-G.x,y.y-G.y)}}window.addEventListener("pointermove",M=>{if(n.zeigerPos={x:M.clientX,y:M.clientY},n.griff?.aktiv){_(M);return}if(f&&!n.dnd&&Math.hypot(M.clientX-f.x,M.clientY-f.y)>ga&&(n.dnd={id:f.id,x:M.clientX,y:M.clientY,ziel:null,erlaubt:null}),n.dnd){S(M);return}if(M.pointerType==="touch"&&x.has(M.pointerId)){x.set(M.pointerId,{x:M.clientX,y:M.clientY}),C(M);return}if(m.art&&M.buttons){const G=M.clientX-m.x,O=M.clientY-m.y;if(m.x=M.clientX,m.y=M.clientY,Math.hypot(M.clientX-m.startX,M.clientY-m.startY)>ga&&(m.bewegt=!0),!m.bewegt)return;m.art==="drehen"?n.szene?.drehen(-G*.4,O*.4):n.szene?.schieben(G,O);return}const y=M.target;if(!M.buttons){const G=y.closest('[role="treeitem"]');if(G)return p(G.dataset.id);if(y.closest('[data-zone="modell"]')&&!y.closest("[data-chrome], .popup")){const O=n.szene?.trefferBei(M.clientX,M.clientY);return p(O?n.zielFuerTreffer(O.elementId):null)}p(null)}});function C(M){if(x.size===1){const G=M.clientX-m.x,O=M.clientY-m.y;m.x=M.clientX,m.y=M.clientY,Math.hypot(M.clientX-m.startX,M.clientY-m.startY)>ga*2&&(m.bewegt=!0),m.bewegt&&m.art==="drehen"&&n.szene?.drehen(-G*.4,O*.4);return}const y=R();y&&g&&(n.szene?.schieben(y.cx-g.cx,y.cy-g.cy),g.d>0&&y.d>0&&Math.abs(y.d-g.d)>.5&&n.szene?.zoomen(y.d/g.d,y.cx,y.cy)),g=y,m.bewegt=!0}window.addEventListener("pointerup",M=>{if(u&&M.pointerType!=="touch"){u=!1;const y=h;h=null,y&&!m.bewegt&&d(y.x,y.y)}if(M.pointerType==="touch"&&(x.delete(M.pointerId),g=R(),x.size||(m.art=null)),n.griff?.aktiv){T();return}if(n.dnd){w();return}f&&(f=null),m.art&&M.pointerId===m.pointerId&&(m.art=null,setTimeout(()=>{m.bewegt=!1},0))}),t.addEventListener("pointerleave",()=>p(null)),r.addEventListener("pointerleave",()=>p(null));function S(M){const y=n.dnd;if(!y)return;y.x=M.clientX,y.y=M.clientY;const O=document.elementFromPoint(M.clientX,M.clientY)?.closest('[role="treeitem"], [data-wurzel]'),$=O?.dataset.id??O?.dataset.wurzel??null;if($&&$!==y.id){const K=n.ablegenPruefen(y.id,$);y.ziel=$,y.erlaubt=K.erlaubt,y.grund=K.grund,K.grund&&n.meldung(K.grund)}else y.ziel=null,y.erlaubt=null;n.rendern()}function w(){const M=n.dnd;f=null,M&&(n.dnd=null,s=!0,setTimeout(()=>{s=!1},0),M.ziel&&M.erlaubt?n.ausfuehren("element.umhaengen",{element:M.id,ziel:M.ziel},"struktur"):n.rendern())}n.dndAbbrechen=()=>n.dnd?(n.dnd=null,f=null,n.rendern(),!0):!1;let E=null;function P(M,y){const G=y.dataset.griff,O=y.dataset.griffName,$=n.find(G);if(!$)return;M.preventDefault();const K=tb(n,G);E={vx:K.x,vy:K.y,x0:M.clientX,y0:M.clientY};const ye=qe($.params[O]);n.griff={id:G,name:O,start:ye,wert:ye,eingabe:"",zeiger:{x:M.clientX,y:M.clientY},sichtbarBis:null,aktiv:!0},n.rendern()}function _(M){const y=n.griff;if(!y||!E)return;y.zeiger={x:M.clientX,y:M.clientY};const G=E.vx**2+E.vy**2||1,O=((M.clientX-E.x0)*E.vx+(M.clientY-E.y0)*E.vy)/G;y.wert=Math.max(1,Math.round(y.start+O)),y.eingabe="",n.vorschau={id:y.id,name:y.name,wert:{value:y.wert,unit:"mm"}},n.rendern()}function T(){n.griff&&n.griffUebernehmen()}i.addEventListener("wheel",M=>{if(M.target.closest("[data-chrome], .popup"))return;M.preventDefault();const y=eb(n.profil,M);if(y==="zoomen"){const G=Math.exp(-M.deltaY*(M.ctrlKey?.01:.002));n.szene?.zoomen(G,M.clientX,M.clientY)}else y==="verschieben"?n.szene?.schieben(-M.deltaX,-M.deltaY):y==="drehen"&&n.szene?.drehen(-M.deltaX*.4,M.deltaY*.4)},{passive:!1}),t.addEventListener("focusin",M=>{const y=M.target;y instanceof HTMLInputElement&&y.dataset.feldEingabe&&(y.setAttribute("data-editiert",""),y.select());const G=y.closest("[data-zone]");G&&(n.fokusZone=G.dataset.zone??null)}),t.addEventListener("focusout",M=>{const y=M.target;y instanceof HTMLInputElement&&y.dataset.feldEingabe?(y.removeAttribute("data-editiert"),I(y,!1)):y instanceof HTMLInputElement&&y.dataset.umbenennen&&(y.removeAttribute("data-editiert"),n.umbenennen&&y.value.trim()&&y.value.trim()!==n.name(y.dataset.umbenennen)?B(y):n.umbenennen&&(n.umbenennen=null,n.rendern()))}),t.addEventListener("input",M=>{const y=M.target;y.dataset.feldEingabe?k(y):y.dataset.suchfeld!==void 0?(n.suche.text=y.value,n.suche.index=0,n.suche.alle=!1,n.rendern()):y.dataset.chatEingabe!==void 0&&(n.chat.eingabe=y.value)});function k(M){const y=(M.dataset.elemente??"").split(",").filter(Boolean),G=M.dataset.param,O=uc(M.value);if(!O.ok){n.feldBefund={feld:M.dataset.feldEingabe,schluessel:O.fehler},n.vorschau=null,n.rendern();return}n.feldBefund=null,y.length===1&&(n.vorschau={id:y[0],name:G,wert:O.groesse}),n.rendern()}function I(M,y){const G=(M.dataset.elemente??"").split(",").filter(Boolean),O=M.dataset.param,$=uc(M.value);if(!$.ok){n.feldBefund={feld:M.dataset.feldEingabe,schluessel:$.fehler},y||(n.vorschau=null,n.feldBefund=null),n.rendern();return}n.feldBefund=null,n.vorschau=null,n.ausfuehren("element.wert-setzen",G.length===1?{element:G[0],name:O,wert:$.groesse}:{elemente:G,name:O,wert:$.groesse},"eigenschaften")}function B(M){const y=n.umbenennen?.weg??"eigenschaften";n.ausfuehren("element.umbenennen",{element:M.dataset.umbenennen,name:M.value},y)}t.addEventListener("keydown",M=>{const y=M.target;if(y instanceof HTMLInputElement&&y.dataset.feldEingabe){M.key==="Enter"?(M.preventDefault(),I(y,!0),y.blur()):M.key==="Escape"&&(M.preventDefault(),M.stopPropagation(),n.vorschau=null,n.feldBefund=null,y.removeAttribute("data-editiert"),y.blur(),n.rendern());return}if(y instanceof HTMLInputElement&&y.dataset.umbenennen){M.key==="Enter"?(M.preventDefault(),y.removeAttribute("data-editiert"),y.value.trim()?B(y):(n.umbenennen=null,n.rendern()),e.zonen.eigenschaften.focus()):M.key==="Escape"&&(M.preventDefault(),M.stopPropagation(),y.removeAttribute("data-editiert"),n.umbenennen=null,n.rendern(),e.zonen.eigenschaften.focus());return}if(y instanceof HTMLInputElement&&y.dataset.suchfeld!==void 0){q(M);return}if(y instanceof HTMLInputElement&&y.dataset.chatEingabe!==void 0){M.key==="Enter"&&(M.preventDefault(),n.ausfuehren("chat.senden",{text:y.value},"chat"));return}F(M),H(M)});function q(M){const y=n.suchTreffer().length;if(M.key==="ArrowDown")M.preventDefault(),n.suche.index=Math.min(y-1,n.suche.index+1),n.rendern();else if(M.key==="ArrowUp")M.preventDefault(),n.suche.index=Math.max(0,n.suche.index-1),n.rendern();else if(M.key==="Enter"){M.preventDefault();const G=n.suchTreffer()[n.suche.index];n.suche.offen=!1,G?n.ausfuehren(G.id,{},"suche"):n.rendern()}}function F(M){const y=M.target.closest(".popup");if(!y||!["ArrowDown","ArrowUp"].includes(M.key))return;const G=[...y.querySelectorAll(".eintrag:not([hidden] *)")].filter(K=>K.offsetParent!==null),O=G.indexOf(M.target),$=G[(O+(M.key==="ArrowDown"?1:-1)+G.length)%G.length];$&&(M.preventDefault(),$.focus())}function H(M){const y=M.target.closest('[role="treeitem"]');if(!y)return;const G=[...r.querySelectorAll('[role="treeitem"]')],O=G.indexOf(y);if(M.key==="ArrowDown"||M.key==="ArrowUp"){M.preventDefault();const $=G[Math.max(0,Math.min(G.length-1,O+(M.key==="ArrowDown"?1:-1)))];for(const K of G)K.tabIndex=-1;$&&($.tabIndex=0,$.focus())}else M.key==="Enter"?(M.preventDefault(),a(y.dataset.id)):M.key===" "&&(M.preventDefault(),n.waehle(y.dataset.id,M.shiftKey?"hinzufuegen":M.ctrlKey||M.metaKey?"umschalten":"setzen"))}}function sb(n){const e=n.split("+"),t=(e[e.length-1]??"").toLowerCase(),i=new Set(e.slice(0,-1).map(r=>r.toLowerCase()));return{mod:i.has("mod"),umschalt:i.has("umschalt")||i.has("shift"),alt:i.has("alt"),taste:t}}const ab=new Set(["delete","backspace"]);function ob(n,e){const t=e.ctrlKey||e.metaKey;return n.mod!==t||n.umschalt!==e.shiftKey||n.alt!==e.altKey?!1:n.taste==="entf"?ab.has(e.key.toLowerCase()):/^f\d+$/.test(n.taste)?e.key.toLowerCase()===n.taste:n.taste.length===1&&e.code===`Key${n.taste.toUpperCase()}`||e.key.toLowerCase()===n.taste}function lb(n,e){for(const t of n)if(t.kuerzel&&ob(sb(t.kuerzel),e))return t;return null}function cb(n){window.addEventListener("keydown",e=>{const t=e.target,i=t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t?.isContentEditable===!0;if(n.tastenfokus=!0,n.griff?.aktiv){if(/^\d$/.test(e.key))n.griff.eingabe+=e.key,n.griff.wert=Number(n.griff.eingabe),n.vorschau={id:n.griff.id,name:n.griff.name,wert:{value:n.griff.wert,unit:"mm"}},n.rendern();else if(e.key==="Backspace")n.griff.eingabe=n.griff.eingabe.slice(0,-1),n.rendern();else if(e.key==="Enter")n.griffUebernehmen();else if(e.key==="Escape")n.griffAbbrechen();else return;e.preventDefault(),e.stopPropagation();return}if(e.key==="Escape"){if(n.offenesSchliessen?.()){e.preventDefault();return}if(n.dndAbbrechen?.()){e.preventDefault();return}if(n.umhaengenModus){n.umhaengenModus=null,n.rendern();return}if(n.chat.vorschlag&&t?.closest('[data-zone="chat"]')){n.chat.vorschlag=null,n.rendern();return}if(n.auswahl.length){n.setzeAuswahl([]);return}if(n.aktiv){n.ausfuehren("element.verlassen",{},"kuerzel");return}return}const r=t instanceof HTMLInputElement&&t.hasAttribute("data-feld-eingabe"),s=lb(n.register,e);if(!s)return;const a=e.ctrlKey||e.metaKey;if(!(i&&!a&&!/^f\d+$/i.test(s.kuerzel??""))&&!(i&&a&&(s.id==="auswahl.alles"||s.id==="element.duplizieren"))&&!(i&&r&&(s.id==="bearbeiten.rueckgaengig"||s.id==="bearbeiten.wiederholen"))&&!(i&&t instanceof HTMLInputElement&&t.dataset.suchfeld!==void 0&&a&&s.id!=="suche.oeffnen")){if(e.preventDefault(),s.id==="fenster.naechste-zone"){n.naechsteZone(e.shiftKey);return}if(s.id==="suche.oeffnen"){n.ausfuehren("suche.oeffnen",{},"kuerzel");return}n.anwendbar(s)&&n.ausfuehren(s.id,{},"kuerzel")}},!0)}const va=["koerper","kanten","durchsicht"];function $n(n,e){return typeof e.element=="string"?[e.element]:Array.isArray(e.elemente)?e.elemente.map(String):n.auswahlIds()}function ub(n,e){const t=cn(e),i=new Set(At(n).map(a=>a.id)),r=a=>{let o=2,l=`${a}-${o}`;for(;i.has(l);)l=`${a}-${o+=1}`;return i.add(l),l},s=a=>{a.id=r(a.id.replace(/-\d+$/,""));for(const o of a.content)s(o)};return s(t),t}const hb=n=>String.fromCharCode(65+n%26);function db(n){const e=n.registriere.bind(n),t=n.t;e("element.anlegen",(l,c,u)=>{const h=typeof l.typ=="string"?l.typ:"teil",d=n.neuesElement(h);n.protokolliere("element.anlegen",{typ:h},c,u),n.auswahl=[{element_id:d}],n.meldung("rueck.angelegt",{name:n.name(d)})}),e("baugruppe.anlegen",(l,c,u)=>{const h=n.neuesElement("baugruppe");n.protokolliere("baugruppe.anlegen",{},c,u),n.auswahl=[{element_id:h}],n.meldung("rueck.angelegt",{name:n.name(h)})}),e("element.umbenennen",(l,c,u)=>{const h=typeof l.element=="string"?l.element:n.auswahlIds()[0];if(!h||typeof l.element!="string"&&n.auswahlIds().length!==1)return!1;if(typeof l.name!="string"){n.umbenennen={id:h,weg:c},n.auswahl=[{element_id:h}];return}const d=l.name.trim();if(n.umbenennen=null,!d)return!1;const f=n.aendern(m=>{const x=bt(m,h);x&&(x.meta.name=d)});return f&&(n.protokolliere("element.umbenennen",{element:h,name:d},c,u),n.meldung("rueck.umbenannt",{name:d})),f});const i=l=>(c,u,h)=>{const d=$n(n,c),f=[],m=n.aendern(x=>{for(const g of d){const p=bt(x,g),R=p?ps(x,g):void 0;if(!p||!R)continue;const C=ub(x,p);if(C.meta.name=`${p.meta.name} ${t("name.kopie")}`,C.params.lage_y!==void 0||C.params.breite!==void 0){const S=C.params.breite?qe(C.params.breite)+6:20;C.params.lage_y={value:qe(C.params.lage_y)+S,unit:"mm"}}else C.params.lage_x!==void 0&&(C.params.lage_x={value:qe(C.params.lage_x)+100,unit:"mm"});R.content.splice(R.content.indexOf(p)+1,0,C),f.push(C.id)}});return m&&(n.protokolliere(l,d.length===1?{element:d[0]}:{elemente:d},u,h),n.auswahl=f.map(x=>({element_id:x})),n.meldung("rueck.dupliziert",{name:n.name(f[0]??"")})),m};e("element.duplizieren",i("element.duplizieren")),e("auswahl.duplizieren",i("auswahl.duplizieren"));const r=l=>(c,u,h)=>{const d=$n(n,c).filter(x=>n.find(x)&&!Ht(n.find(x)));if(!d.length)return!1;const f=d.map(x=>n.name(x)),m=n.aendern(x=>{for(const g of d){const p=bt(x,g);p&&(p.meta.verworfen=!0)}});return m&&(n.protokolliere(l,d.length===1?{element:d[0]}:{elemente:d},u,h),n.auswahl=n.auswahl.filter(x=>!d.includes(x.element_id)),n.aktiv&&d.includes(n.aktiv)&&(n.aktiv=null),n.meldung("rueck.verworfen",{name:f[0]??""})),m};e("element.verwerfen",r("element.verwerfen")),e("auswahl.verwerfen",r("auswahl.verwerfen")),e("element.zurueckholen",(l,c,u)=>{const h=$n(n,l),d=n.aendern(f=>{for(const m of h){const x=bt(f,m);x&&delete x.meta.verworfen}});return d&&(n.protokolliere("element.zurueckholen",{element:h[0]},c,u),n.meldung("rueck.zurueckgeholt",{name:n.name(h[0]??"")})),d}),e("element.wert-setzen",(l,c,u)=>{const h=typeof l.element=="string"?l.element:n.auswahlIds()[0];return!h||typeof l.name!="string"||!l.wert?(n.fokusEigenschaften=!0,!1):n.wertSetzen(h,l.name,l.wert,c,u)});const s=l=>(c,u,h)=>{const d=$n(n,c),f=n.aendern(m=>{for(const x of d){const g=bt(m,x);g&&(l?g.meta.pausiert=!0:delete g.meta.pausiert)}});return f&&n.protokolliere(l?"element.pausieren":"element.fortsetzen",{element:d[0]},u,h),f};e("element.pausieren",s(!0)),e("element.fortsetzen",s(!1)),e("element.umhaengen",(l,c,u)=>{const h=typeof l.element=="string"?l.element:n.auswahlIds()[0];if(!h)return!1;if(typeof l.ziel!="string"){n.umhaengenModus=h,n.meldung("rueck.ziel-waehlen");return}const d=l.ziel;n.umhaengenModus=null;const f=n.ablegenPruefen(h,d);if(!f.erlaubt)return n.meldung(f.grund??"dnd.kein-ziel"),!1;const m=n.aendern(x=>{const g=bt(x,h),p=g?ps(x,h):void 0,R=d===x.id?x:bt(x,d);!g||!p||!R||(p.content.splice(p.content.indexOf(g),1),R.content.push(g))});return m&&(n.protokolliere("element.umhaengen",{element:h,ziel:d},c,u),n.meldung("rueck.umgehaengt",{name:n.name(h),ziel:n.name(d)})),m}),e("ansicht.speichern",(l,c,u)=>{const h=n.szene?.kamera;if(!h)return!1;const d=At(n.dokument()).filter(g=>g.type==="view").length,f=`${t("name.ansicht")}: ${t("name.schnitt")} ${hb(d)}`;let m="";const x=n.aendern(g=>{m=uu(g,"ansicht");const p={id:m,type:"view",params:{azimut:{value:h.azimut,unit:"°"},hoehe:{value:h.hoehe,unit:"°"},abstand:{value:h.abstand,unit:"mm"},ziel_x:{value:h.ziel.x,unit:"mm"},ziel_y:{value:h.ziel.y,unit:"mm"},ziel_z:{value:h.ziel.z,unit:"mm"},projektion:n.projektionsart,darstellung:n.darstellung,auswahl:cn(n.auswahl),ausgeblendet:[...n.ausgeblendet]},content:[],meta:{name:f}};g.content.push(p)});return x&&(n.protokolliere("ansicht.speichern",{name:f},c,u),n.meldung("rueck.ansicht-gespeichert",{name:f})),x}),e("bearbeiten.rueckgaengig",(l,c,u)=>{n.rueckgaengig(c,u)}),e("bearbeiten.wiederholen",(l,c,u)=>{n.wiederholen(c,u)}),e("auswahl.alles",()=>{n.setzeAuswahl(n.waehlbareIds().map(l=>({element_id:l})))}),e("auswahl.aufheben",()=>n.setzeAuswahl([])),e("auswahl.umkehren",()=>{const l=new Set(n.auswahlIds());n.setzeAuswahl(n.waehlbareIds().filter(c=>!l.has(c)).map(c=>({element_id:c})))});const a=l=>c=>{const u=Array.isArray(c.elemente)?c.elemente.map(String):[];if(!u.length)return n.meldung("rueck.auswahl-ziel"),!1;u.forEach((h,d)=>n.waehle(h,l==="setzen"&&d>0?"hinzufuegen":l))};e("auswahl.setzen",a("setzen")),e("auswahl.hinzufuegen",a("hinzufuegen")),e("auswahl.umschalten",a("umschalten")),e("element.ausblenden",l=>{for(const c of $n(n,l))n.ausgeblendet.add(c)}),e("auswahl.ausblenden",l=>{for(const c of $n(n,l))n.ausgeblendet.add(c)}),e("element.einblenden",l=>{for(const c of $n(n,l))n.ausgeblendet.delete(c)}),e("ansicht.alles-einblenden",()=>{n.ausgeblendet.clear(),n.isoliert=null}),e("ansicht.verworfenes",()=>{n.verworfenesZeigen=!n.verworfenesZeigen}),e("ansicht.isolieren",()=>{n.isoliert?n.isoliert=null:n.auswahlIds().length?n.isoliert=n.auswahlIds():n.meldung("rueck.isolieren-ziel")}),e("element.aktivieren",l=>{const c=typeof l.element=="string"?l.element:n.auswahlIds()[0],u=c?n.find(c):void 0;if(!u)return!1;n.aktiv=u.id,n.auswahl=[]}),e("element.verlassen",()=>{n.aktiv=null}),e("ansicht.einpassen",()=>n.szene?.passeEin(n.huelleAlle(),200*n.tempo)),e("ansicht.auf-auswahl",()=>{const l=n.huelleAuswahl();n.szene?.passeEin(l??n.huelleAlle(),200*n.tempo)}),e("ansicht.projektion",()=>{n.projektionsart=n.projektionsart==="orthogonal"?"perspektivisch":"orthogonal",n.szene?.setProjektion(n.projektionsart)}),e("darstellung.wechseln",()=>{const l=va.indexOf(n.darstellung);n.darstellung=va[(l+1)%va.length]??"koerper"});const o=(l,c)=>()=>n.szene?.nach({azimut:l,hoehe:c},200*n.tempo);e("ansicht.vorne",o(0,0)),e("ansicht.oben",o(0,89)),e("ansicht.isometrisch",o(-35,28)),e("ansicht.anwenden",l=>{const c=typeof l.element=="string"?l.element:n.auswahlIds()[0],u=c?n.find(c):void 0;if(!u||u.type!=="view"||!n.szene)return!1;const h=u.params;n.projektionsart=h.projektion==="perspektivisch"?"perspektivisch":"orthogonal",n.szene.setProjektion(n.projektionsart),n.darstellung=h.darstellung==="kanten"||h.darstellung==="durchsicht"?h.darstellung:"koerper",n.ausgeblendet=new Set(h.ausgeblendet??[]),n.auswahl=cn(h.auswahl??[]),n.setzeKamera({azimut:qe(h.azimut),hoehe:qe(h.hoehe),abstand:qe(h.abstand),ziel:{x:qe(h.ziel_x),y:qe(h.ziel_y),z:qe(h.ziel_z)}})}),e("fenster.struktur",()=>{n.zonen.struktur=!n.zonen.struktur}),e("fenster.panel",()=>{n.zonen.panel=!n.zonen.panel}),e("fenster.rechts",()=>{n.zonen.rechts=!n.zonen.rechts}),e("fenster.naechste-zone",()=>n.naechsteZone()),e("suche.oeffnen",()=>{n.suche={offen:!0,text:"",index:0,alle:!1,fokussiert:!1}}),e("hilfe.befehle-zeigen",()=>{n.suche={offen:!0,text:"",index:0,alle:!0,fokussiert:!1}}),e("thema.umschalten",()=>{n.thema=n.thema==="hell"?"dunkel":"hell",document.documentElement.dataset.thema=n.thema,n.szene?.setThema(n.thema)}),e("einstellung.navigationsprofil",l=>{const c=typeof l.profil=="string"&&Ki.includes(l.profil)?l.profil:void 0,u=Ki.indexOf(n.profil);n.profil=c??Ki[(u+1)%Ki.length]??n.profil}),e("katalog.oeffnen",l=>{n.katalogOffen=typeof l.baustein=="string"?l.baustein:""}),e("task.wechseln",l=>{n.task=l.task==="simulation"?"simulation":"modellieren"}),e("dokument.wechseln",l=>{typeof l.dok=="string"&&n.wechsleDokument(l.dok)})}const fb=["leer","halter","auswahl","mehrfach","zustaende","aktiv","isoliert","kontextmenue","menue","ziehen","ablegen","ablegen-verboten","ausgeblendet","verworfen","rechnet","befund","andere","chat","suche","fokus","perspektive","kanten"],Zn=(n,...e)=>{n.auswahl=e.map(t=>({element_id:t}))};function vc(n){const e=bt(n.dokument(),"bohrungen");e&&(e.params.durchmesser=ct(55))}function pb(n,e){if(!fb.includes(n))return e.projekt=rc(),e.dok="teil-1",e.unbekannterZustand=!0,{gezeigt:"leer"};e.projekt=n==="leer"?rc():ws(),e.dok=e.projekt.content[0]?.id??"";const i=n;let r;switch(i){case"leer":case"halter":break;case"auswahl":Zn(e,"grundplatte");break;case"mehrfach":Zn(e,"grundplatte","steg");break;case"zustaende":vc(e),Zn(e,"grundplatte"),e.hover="steg",e.ausgeblendet.add("skizze"),e.andere={aktiv:!0,dok:"sensorgehaeuse",element:"deckel"};break;case"aktiv":e.dok="sensorgehaeuse",e.aktiv="gehaeuse";break;case"isoliert":e.isoliert=["steg"],Zn(e,"steg");break;case"kontextmenue":Zn(e,"grundplatte"),r=()=>{const s=e.szene?.projiziere([0,0,8]);e.kontextOeffnen?.(s?.x??600,s?.y??400)};break;case"menue":e.menue="dropdown:Bearbeiten";break;case"ziehen":Zn(e,"grundplatte"),r=()=>{const s=e.huelle("grundplatte"),a=s&&e.szene?e.szene.projiziere([0,0,s.max[2]]):{x:600,y:300};e.griff={id:"grundplatte",name:"dicke",start:8,wert:11,eingabe:"",zeiger:{x:a.x,y:a.y-60},sichtbarBis:null,aktiv:!1},e.vorschau={id:"grundplatte",name:"dicke",wert:ct(11)},e.rendernSofort()};break;case"ablegen":case"ablegen-verboten":{e.dok="sensorgehaeuse";const s=i==="ablegen-verboten";r=()=>{const a=s?"gehaeuse":"baugruppe-1",l=document.querySelector(`[role="treeitem"][data-id="${a}"]`)?.getBoundingClientRect(),c=s?"baugruppe-1":"deckel",u=e.ablegenPruefen(c,a);e.dnd={id:c,x:(l?.left??100)+60,y:(l?.top??100)+(l?.height??24)/2,ziel:a,erlaubt:u.erlaubt,grund:u.grund},u.grund&&e.meldung(u.grund),e.rendernSofort()};break}case"ausgeblendet":e.ausgeblendet.add("steg");break;case"verworfen":{const s=bt(e.dokument(),"bohrungen");s&&(s.meta.verworfen=!0),e.verworfenesZeigen=!0;break}case"rechnet":e.status.set("grundplatte","rechnet");break;case"befund":vc(e),e.zonen.panel=!0;break;case"andere":e.andere={aktiv:!0,dok:"halter",element:"steg"};break;case"chat":{Zn(e,"steg");const s=bt(e.dokument(),"steg");e.chat.nachrichten=[{von:"person",text:"",schluessel:"chat.beispiel.frage"},{von:"ki",text:"",schluessel:"chat.antwort.vorschlag"}],s&&(e.chat.vorschlag=Uo(e,s,"hoehe",40));break}case"suche":e.suche={offen:!0,text:"ver",index:0,alle:!1,fokussiert:!1};break;case"fokus":r=()=>{const s=document.querySelector('[role="treeitem"][data-id="steg"]');if(s){for(const a of document.querySelectorAll('[role="treeitem"]'))a.tabIndex=-1;s.tabIndex=0,s.setAttribute("data-fokus",""),s.focus()}};break;case"perspektive":e.projektionsart="perspektivisch";break;case"kanten":e.darstellung="kanten";break}return{gezeigt:i,danach:r}}const jn=new URLSearchParams(window.location.search),is=jn.get("thema")==="dunkel"?"dunkel":"hell",rs=h_(window.location.search),mb=jn.get("tempo")==="0"?0:1;document.documentElement.dataset.thema=is;document.documentElement.lang=rs==="en"?"en":"de";async function gb(){const n=jn.get("register");if(!n)return Li;try{const e=await fetch(n);return Q0(await e.json())}catch{return Li}}function vb(){try{const n=window.localStorage.getItem(vu);if(!n)return null;const e=JSON.parse(n);return e&&Array.isArray(e.content)&&e.content.length?e:null}catch{return null}}function _b(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0).toString(16).padStart(8,"0")}const xb=n=>JSON.stringify(n,(e,t)=>t&&typeof t=="object"&&!Array.isArray(t)?Object.fromEntries(Object.entries(t).sort(([i],[r])=>i.localeCompare(r))):t);async function bb(){const n=document.getElementById("app"),e=await gb(),t=f_(rs);if(jn.has("katalog")){await Jx(n,jn.get("katalog")??"",t,rs,is);return}const i=jn.get("zustand"),r=i===null?vb():null,s=new _u(t,rs,mb,e,r??ws());s.thema=is,s.rechenzeitMs=Number(jn.get("rechenzeit")??0)||0,db(s),Wx(s);let a="halter",o;if(i!==null){const f=pb(i,s);a=f.gezeigt,o=f.danach}const l=new Fx(n,s);l.szene.setThema(is),rb(s,l),cb(s),s.rendernSofort(),l.einpassenSofort(),s.rendernSofort(),o?.(),s.rendernSofort();const c=()=>s.dokument(),u=()=>{const f=s.szene?.kamera;return{azimut_grad:f?.azimut??0,hoehe_grad:f?.hoehe??0,abstand_mm:f?.abstand??0,ziel:{x:f?.ziel.x??0,y:f?.ziel.y??0,z:f?.ziel.z??0}}},h=f=>{const m=dr(s,f);if(!m)return null;const x=gs(m),g=new Set(s.mitNachfahren(f)),p=[],R=Math.max(10,Math.sqrt(x.breite*x.hoehe/300));for(let w=x.y;w<x.y+x.hoehe;w+=R)for(let E=x.x;E<x.x+x.breite;E+=R){const P=s.szene?.trefferBei(E,w);if(!P||!g.has(P.elementId))continue;const _=s.zielFuerTreffer(P.elementId);if(_!==f&&!g.has(_??"")||s.kanteBei(P.elementId,E,w))continue;(s.szene?.kantenVon(P.elementId,s.huelle(P.elementId)??{min:[0,0,0],max:[0,0,0]})??[]).some(k=>{const I=k.bis.x-k.von.x,B=k.bis.y-k.von.y,q=I*I+B*B||1,F=Math.max(0,Math.min(1,((E-k.von.x)*I+(w-k.von.y)*B)/q));return Math.hypot(E-(k.von.x+F*I),w-(k.von.y+F*B))<14})||p.push({x:Math.round(E),y:Math.round(w)})}const C=s.huelle(f),S=C&&s.szene?s.szene.kantenVon(f,C):[];return{huellbox:x,huelle:m,treffer:p,kanten:S.map(w=>({id:w.adresse,name:w.name,mitte:w.mitte,von:w.von,bis:w.bis}))}};Object.defineProperty(window,"__cee",{value:Object.freeze({bereit:!0,zustand:a,modell:()=>s.modell(),modellHash:()=>_b(xb(s.projekt)),auswahl:()=>s.auswahl.map(f=>({...f})),protokoll:()=>s.protokoll.map(f=>({...f})),befehle:()=>s.register.map(f=>({id:f.id,kuerzel:f.kuerzel??null,titel:f.titel,titel_text:s.t(f.titel),rang:f.rang,familie:f.familie})),teil:()=>{const f=s.teilErgebnis();return{abmessungen_mm:[...f.abmessungen_mm],volumen_mm3:f.volumen_mm3,masse_g:f.masse_g}},ansicht:()=>({aktiv:s.aktiv,pfad:s.pfadGlieder().map(f=>f.meta.name),ausgeblendet:[...s.ausgeblendet],isoliert:s.isoliert?[...s.isoliert]:[],darstellung:s.darstellung,projektion:s.projektionsart,profil:s.profil,kamera:u(),projektion_von:h,kontur_punkte:f=>Rx(s,f)}),zustaende:f=>{const m=s.zeilen().some(S=>S.element.id===f),x=new Set(s.mitNachfahren(f)),g=On(s.angezeigtesDokument()).koerper.some(S=>x.has(S.elementId)),p=s.istAusgeblendet(f),R=s.auswahlIds().length===1&&s.auswahlIds()[0]===f,C=s.pfadGlieder().some(S=>S.id===f);return{modell:g||p?s.darstellungVon(f,"modell"):null,struktur:m?s.darstellungVon(f,"struktur"):null,chat:R?s.darstellungVon(f,"chat"):null,pfad:C?s.darstellungVon(f,"pfad"):null}},einstellung:()=>({navigationsprofil:s.profil}),verlauf:()=>s.verlaufLaenge(),gezeichnet:()=>s.szene?.gezeichnet()??[],flaeche_bei:(f,m)=>{const x=s.szene?.trefferBei(f,m);return x?{erzeuger_id:x.elementId,ziel_id:s.zielFuerTreffer(x.elementId)}:null},elemente:()=>At(c()).map(f=>f.id)})}),Object.defineProperty(window,"__ceeEingabe",{value:Object.freeze({ansicht:f=>{s.szene?.drehen(f.ry??0,f.rx??0),(f.tx||f.ty)&&s.szene?.schieben(f.tx??0,f.ty??0),f.tz&&s.szene?.zoomen(Math.exp((f.tz??0)*.01))}})}),await document.fonts.ready,await new Promise(f=>requestAnimationFrame(()=>requestAnimationFrame(()=>f()))),s.rendernSofort(),document.documentElement.dataset.bereit="1"}bb();
