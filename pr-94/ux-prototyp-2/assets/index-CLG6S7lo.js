(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Co="186",uh=0,al=1,hh=2,jr=1,dh=2,Zi=3,Wn=0,Vt=1,Jt=2,kn=0,er=1,ol=2,ll=3,cl=4,fh=5,Ei=100,ph=101,mh=102,gh=103,vh=104,_h=200,xh=201,bh=202,Sh=203,Nc=204,Uc=205,yh=206,Mh=207,wh=208,Eh=209,Ah=210,Th=211,Rh=212,kh=213,Ch=214,Ca=0,Pa=1,La=2,ar=3,Da=4,za=5,Ia=6,Na=7,Po=0,Ph=1,Lh=2,vn=0,Fc=1,Oc=2,Bc=3,Vc=4,Hc=5,Gc=6,Wc=7,Xc=300,ii=301,Li=302,Ns=303,Us=304,Ts=306,Ua=1e3,Rn=1001,Fa=1002,Pt=1003,Dh=1004,yr=1005,Nt=1006,Fs=1007,ei=1008,Xt=1009,$c=1010,qc=1011,or=1012,Lo=1013,_n=1014,mn=1015,xn=1016,Do=1017,zo=1018,lr=1020,Yc=35902,Zc=35899,Kc=1021,Jc=1022,sn=1023,Ln=1026,ti=1027,Qc=1028,Io=1029,ri=1030,No=1031,Uo=1033,es=33776,ts=33777,ns=33778,is=33779,Oa=35840,Ba=35841,Va=35842,Ha=35843,Ga=36196,Wa=37492,Xa=37496,$a=37488,qa=37489,ds=37490,Ya=37491,Za=37808,Ka=37809,Ja=37810,Qa=37811,ja=37812,eo=37813,to=37814,no=37815,io=37816,ro=37817,so=37818,ao=37819,oo=37820,lo=37821,co=36492,uo=36494,ho=36495,fo=36283,po=36284,fs=36285,mo=36286,zh=3200,go=0,Ih=1,Vn="",Zt="srgb",ps="srgb-linear",ms="linear",lt="srgb",Os=7680,Nh=519,Uh=512,Fh=513,Oh=514,Fo=515,Bh=516,Vh=517,Oo=518,Hh=519,Gh=35044,ul="300 es",gn=2e3,cr=2001;function Wh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function gs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Xh(){const n=gs("canvas");return n.style.display="block",n}const hl={};function dl(...n){const e="THREE."+n.shift();console.log(e,...n)}function jc(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Fe(...n){n=jc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function et(...n){n=jc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Ci(...n){const e=n.join(" ");e in hl||(hl[e]=!0,Fe(...n))}function $h(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const qh={[Ca]:Pa,[La]:Ia,[Da]:Na,[ar]:za,[Pa]:Ca,[Ia]:La,[Na]:Da,[za]:ar};class oi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],rs=Math.PI/180,vo=180/Math.PI;function Fi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(zt[n&255]+zt[n>>8&255]+zt[n>>16&255]+zt[n>>24&255]+"-"+zt[e&255]+zt[e>>8&255]+"-"+zt[e>>16&15|64]+zt[e>>24&255]+"-"+zt[t&63|128]+zt[t>>8&255]+"-"+zt[t>>16&255]+zt[t>>24&255]+zt[i&255]+zt[i>>8&255]+zt[i>>16&255]+zt[i>>24&255]).toLowerCase()}function Qe(n,e,t){return Math.max(e,Math.min(t,n))}function Yh(n,e){return(n%e+e)%e}function Bs(n,e,t){return(1-t)*n+t*e}function Vi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class de{static{de.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Oi{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3],h=s[a+0],d=s[a+1],p=s[a+2],b=s[a+3];if(f!==b||l!==h||c!==d||u!==p){let m=l*h+c*d+u*p+f*b;m<0&&(h=-h,d=-d,p=-p,b=-b,m=-m);let g=1-o;if(m<.9995){const E=Math.acos(m),k=Math.sin(E);g=Math.sin(g*E)/k,o=Math.sin(o*E)/k,l=l*g+h*o,c=c*g+d*o,u=u*g+p*o,f=f*g+b*o}else{l=l*g+h*o,c=c*g+d*o,u=u*g+p*o,f=f*g+b*o;const E=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=E,c*=E,u*=E,f*=E}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[a],h=s[a+1],d=s[a+2],p=s[a+3];return e[t]=o*p+u*f+l*d-c*h,e[t+1]=l*p+u*h+c*f-o*d,e[t+2]=c*p+u*d+o*h-l*f,e[t+3]=u*p-o*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),f=o(s/2),h=l(i/2),d=l(r/2),p=l(s/2);switch(a){case"XYZ":this._x=h*u*f+c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f-h*d*p;break;case"YXZ":this._x=h*u*f+c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f+h*d*p;break;case"ZXY":this._x=h*u*f-c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f-h*d*p;break;case"ZYX":this._x=h*u*f-c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f+h*d*p;break;case"YZX":this._x=h*u*f+c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f-h*d*p;break;case"XZY":this._x=h*u*f-c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f+h*d*p;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=i+o+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(a-r)*d}else if(i>o&&i>f){const d=2*Math.sqrt(1+i-o-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+c)/d}else if(o>f){const d=2*Math.sqrt(1+o-i-f);this._w=(s-c)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-i-o);this._w=(a-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{static{z.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+l*c+a*f-o*u,this.y=i+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Vs.copy(this).projectOnVector(e),this.sub(Vs)}reflect(e){return this.sub(Vs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Vs=new z,fl=new Oi;class He{static{He.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],d=i[5],p=i[8],b=r[0],m=r[3],g=r[6],E=r[1],k=r[4],y=r[7],M=r[2],w=r[5],C=r[8];return s[0]=a*b+o*E+l*M,s[3]=a*m+o*k+l*w,s[6]=a*g+o*y+l*C,s[1]=c*b+u*E+f*M,s[4]=c*m+u*k+f*w,s[7]=c*g+u*y+f*C,s[2]=h*b+d*E+p*M,s[5]=h*m+d*k+p*w,s[8]=h*g+d*y+p*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,h=o*l-u*s,d=c*s-a*l,p=t*f+i*h+r*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/p;return e[0]=f*b,e[1]=(r*c-u*i)*b,e[2]=(o*i-r*a)*b,e[3]=h*b,e[4]=(u*t-r*l)*b,e[5]=(r*s-o*t)*b,e[6]=d*b,e[7]=(i*l-c*t)*b,e[8]=(a*t-i*s)*b,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Ci("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Hs.makeScale(e,t)),this}rotate(e){return Ci("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Hs.makeRotation(-e)),this}translate(e,t){return Ci("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Hs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Hs=new He,pl=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ml=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zh(){const n={enabled:!0,workingColorSpace:ps,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===lt&&(r.r=Cn(r.r),r.g=Cn(r.g),r.b=Cn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===lt&&(r.r=Pi(r.r),r.g=Pi(r.g),r.b=Pi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Vn?ms:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ci("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ci("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ps]:{primaries:e,whitePoint:i,transfer:ms,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Zt},outputColorSpaceConfig:{drawingBufferColorSpace:Zt}},[Zt]:{primaries:e,whitePoint:i,transfer:lt,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Zt}}}),n}const je=Zh();function Cn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Pi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let di;class Kh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{di===void 0&&(di=gs("canvas")),di.width=e.width,di.height=e.height;const r=di.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=di}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=gs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Cn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Cn(t[i]/255)*255):t[i]=Cn(t[i]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Jh=0;class Bo{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Jh++}),this.uuid=Fi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Gs(r[a].image)):s.push(Gs(r[a]))}else s=Gs(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Gs(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Kh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let Qh=0;const Ws=new z;class Ot extends oi{constructor(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,i=Rn,r=Rn,s=Nt,a=ei,o=sn,l=Xt,c=Ot.DEFAULT_ANISOTROPY,u=Vn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qh++}),this.uuid=Fi(),this.name="",this.source=new Bo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ws).x}get height(){return this.source.getSize(Ws).y}get depth(){return this.source.getSize(Ws).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Xc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ua:e.x=e.x-Math.floor(e.x);break;case Rn:e.x=e.x<0?0:1;break;case Fa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ua:e.y=e.y-Math.floor(e.y);break;case Rn:e.y=e.y<0?0:1;break;case Fa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=Xc;Ot.DEFAULT_ANISOTROPY=1;class vt{static{vt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],p=l[9],b=l[2],m=l[6],g=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-b)<.01&&Math.abs(p-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+b)<.1&&Math.abs(p+m)<.1&&Math.abs(c+d+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const k=(c+1)/2,y=(d+1)/2,M=(g+1)/2,w=(u+h)/4,C=(f+b)/4,_=(p+m)/4;return k>y&&k>M?k<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(k),r=w/i,s=C/i):y>M?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=w/r,s=_/r):M<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(M),i=C/s,r=_/s),this.set(i,r,s,t),this}let E=Math.sqrt((m-p)*(m-p)+(f-b)*(f-b)+(h-u)*(h-u));return Math.abs(E)<.001&&(E=1),this.x=(m-p)/E,this.y=(f-b)/E,this.z=(h-u)/E,this.w=Math.acos((c+d+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this.w=Qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this.w=Qe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class jh extends oi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Ot(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Nt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Bo(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class an extends jh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class eu extends Ot{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ed extends Ot{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class ft{static{ft.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,l,c,u,f,h,d,p,b,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,f,h,d,p,b,m)}set(e,t,i,r,s,a,o,l,c,u,f,h,d,p,b,m){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=u,g[10]=f,g[14]=h,g[3]=d,g[7]=p,g[11]=b,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ft().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/fi.setFromMatrixColumn(e,0).length(),s=1/fi.setFromMatrixColumn(e,1).length(),a=1/fi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=a*u,d=a*f,p=o*u,b=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+p*c,t[5]=h-b*c,t[9]=-o*l,t[2]=b-h*c,t[6]=p+d*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,d=l*f,p=c*u,b=c*f;t[0]=h+b*o,t[4]=p*o-d,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=d*o-p,t[6]=b+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,d=l*f,p=c*u,b=c*f;t[0]=h-b*o,t[4]=-a*f,t[8]=p+d*o,t[1]=d+p*o,t[5]=a*u,t[9]=b-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,d=a*f,p=o*u,b=o*f;t[0]=l*u,t[4]=p*c-d,t[8]=h*c+b,t[1]=l*f,t[5]=b*c+h,t[9]=d*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,d=a*c,p=o*l,b=o*c;t[0]=l*u,t[4]=b-h*f,t[8]=p*f+d,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=d*f+p,t[10]=h-b*f}else if(e.order==="XZY"){const h=a*l,d=a*c,p=o*l,b=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+b,t[5]=a*u,t[9]=d*f-p,t[2]=p*f-d,t[6]=o*u,t[10]=b*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(td,e,nd)}lookAt(e,t,i){const r=this.elements;return Ht.subVectors(e,t),Ht.lengthSq()===0&&(Ht.z=1),Ht.normalize(),Nn.crossVectors(i,Ht),Nn.lengthSq()===0&&(Math.abs(i.z)===1?Ht.x+=1e-4:Ht.z+=1e-4,Ht.normalize(),Nn.crossVectors(i,Ht)),Nn.normalize(),Mr.crossVectors(Ht,Nn),r[0]=Nn.x,r[4]=Mr.x,r[8]=Ht.x,r[1]=Nn.y,r[5]=Mr.y,r[9]=Ht.y,r[2]=Nn.z,r[6]=Mr.z,r[10]=Ht.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],d=i[13],p=i[2],b=i[6],m=i[10],g=i[14],E=i[3],k=i[7],y=i[11],M=i[15],w=r[0],C=r[4],_=r[8],T=r[12],P=r[1],N=r[5],B=r[9],$=r[13],O=r[2],H=r[6],Q=r[10],x=r[14],R=r[3],I=r[7],G=r[11],Y=r[15];return s[0]=a*w+o*P+l*O+c*R,s[4]=a*C+o*N+l*H+c*I,s[8]=a*_+o*B+l*Q+c*G,s[12]=a*T+o*$+l*x+c*Y,s[1]=u*w+f*P+h*O+d*R,s[5]=u*C+f*N+h*H+d*I,s[9]=u*_+f*B+h*Q+d*G,s[13]=u*T+f*$+h*x+d*Y,s[2]=p*w+b*P+m*O+g*R,s[6]=p*C+b*N+m*H+g*I,s[10]=p*_+b*B+m*Q+g*G,s[14]=p*T+b*$+m*x+g*Y,s[3]=E*w+k*P+y*O+M*R,s[7]=E*C+k*N+y*H+M*I,s[11]=E*_+k*B+y*Q+M*G,s[15]=E*T+k*$+y*x+M*Y,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],p=e[3],b=e[7],m=e[11],g=e[15],E=l*d-c*h,k=o*d-c*f,y=o*h-l*f,M=a*d-c*u,w=a*h-l*u,C=a*f-o*u;return t*(b*E-m*k+g*y)-i*(p*E-m*M+g*w)+r*(p*k-b*M+g*C)-s*(p*y-b*w+m*C)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(s*u-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],p=e[12],b=e[13],m=e[14],g=e[15],E=t*o-i*a,k=t*l-r*a,y=t*c-s*a,M=i*l-r*o,w=i*c-s*o,C=r*c-s*l,_=u*b-f*p,T=u*m-h*p,P=u*g-d*p,N=f*m-h*b,B=f*g-d*b,$=h*g-d*m,O=E*$-k*B+y*N+M*P-w*T+C*_;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/O;return e[0]=(o*$-l*B+c*N)*H,e[1]=(r*B-i*$-s*N)*H,e[2]=(b*C-m*w+g*M)*H,e[3]=(h*w-f*C-d*M)*H,e[4]=(l*P-a*$-c*T)*H,e[5]=(t*$-r*P+s*T)*H,e[6]=(m*y-p*C-g*k)*H,e[7]=(u*C-h*y+d*k)*H,e[8]=(a*B-o*P+c*_)*H,e[9]=(i*P-t*B-s*_)*H,e[10]=(p*w-b*y+g*E)*H,e[11]=(f*y-u*w-d*E)*H,e[12]=(o*T-a*N-l*_)*H,e[13]=(t*N-i*T+r*_)*H,e[14]=(b*k-p*M-m*E)*H,e[15]=(u*M-f*k+h*E)*H,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,h=s*c,d=s*u,p=s*f,b=a*u,m=a*f,g=o*f,E=l*c,k=l*u,y=l*f,M=i.x,w=i.y,C=i.z;return r[0]=(1-(b+g))*M,r[1]=(d+y)*M,r[2]=(p-k)*M,r[3]=0,r[4]=(d-y)*w,r[5]=(1-(h+g))*w,r[6]=(m+E)*w,r[7]=0,r[8]=(p+k)*C,r[9]=(m-E)*C,r[10]=(1-(h+b))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=fi.set(r[0],r[1],r[2]).length();const o=fi.set(r[4],r[5],r[6]).length(),l=fi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),tn.copy(this);const c=1/a,u=1/o,f=1/l;return tn.elements[0]*=c,tn.elements[1]*=c,tn.elements[2]*=c,tn.elements[4]*=u,tn.elements[5]*=u,tn.elements[6]*=u,tn.elements[8]*=f,tn.elements[9]*=f,tn.elements[10]*=f,t.setFromRotationMatrix(tn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=gn,l=!1){const c=this.elements,u=2*s/(t-e),f=2*s/(i-r),h=(t+e)/(t-e),d=(i+r)/(i-r);let p,b;if(l)p=s/(a-s),b=a*s/(a-s);else if(o===gn)p=-(a+s)/(a-s),b=-2*a*s/(a-s);else if(o===cr)p=-a/(a-s),b=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=gn,l=!1){const c=this.elements,u=2/(t-e),f=2/(i-r),h=-(t+e)/(t-e),d=-(i+r)/(i-r);let p,b;if(l)p=1/(a-s),b=a/(a-s);else if(o===gn)p=-2/(a-s),b=-(a+s)/(a-s);else if(o===cr)p=-1/(a-s),b=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const fi=new z,tn=new ft,td=new z(0,0,0),nd=new z(1,1,1),Nn=new z,Mr=new z,Ht=new z,gl=new ft,vl=new Oi;class Xn{constructor(e=0,t=0,i=0,r=Xn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(Qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Qe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return gl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return vl.setFromEuler(this),this.setFromQuaternion(vl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Xn.DEFAULT_ORDER="XYZ";let Vo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},id=0;const _l=new z,pi=new Oi,yn=new ft,wr=new z,Hi=new z,rd=new z,sd=new Oi,xl=new z(1,0,0),bl=new z(0,1,0),Sl=new z(0,0,1),yl={type:"added"},ad={type:"removed"},mi={type:"childadded",child:null},Xs={type:"childremoved",child:null};class Ct extends oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:id++}),this.uuid=Fi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ct.DEFAULT_UP.clone();const e=new z,t=new Xn,i=new Oi,r=new z(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ft},normalMatrix:{value:new He}}),this.matrix=new ft,this.matrixWorld=new ft,this.matrixAutoUpdate=Ct.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return pi.setFromAxisAngle(e,t),this.quaternion.multiply(pi),this}rotateOnWorldAxis(e,t){return pi.setFromAxisAngle(e,t),this.quaternion.premultiply(pi),this}rotateX(e){return this.rotateOnAxis(xl,e)}rotateY(e){return this.rotateOnAxis(bl,e)}rotateZ(e){return this.rotateOnAxis(Sl,e)}translateOnAxis(e,t){return _l.copy(e).applyQuaternion(this.quaternion),this.position.add(_l.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xl,e)}translateY(e){return this.translateOnAxis(bl,e)}translateZ(e){return this.translateOnAxis(Sl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?wr.copy(e):wr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Hi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(Hi,wr,this.up):yn.lookAt(wr,Hi,this.up),this.quaternion.setFromRotationMatrix(yn),r&&(yn.extractRotation(r.matrixWorld),pi.setFromRotationMatrix(yn),this.quaternion.premultiply(pi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yl),mi.child=e,this.dispatchEvent(mi),mi.child=null):et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ad),Xs.child=e,this.dispatchEvent(Xs),Xs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yl),mi.child=e,this.dispatchEvent(mi),mi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,e,rd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,sd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),d=a(e.animations),p=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),p.length>0&&(i.nodes=p)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Ct.DEFAULT_UP=new z(0,1,0);Ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Tn extends Ct{constructor(){super(),this.isGroup=!0,this.type="Group"}}const od={type:"move"};class $s{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const b of e.hand.values()){const m=t.getJointPose(b,i),g=this._getHandJoint(c,b);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,p=.005;c.inputState.pinching&&h>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(od)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Tn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const tu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Un={h:0,s:0,l:0},Er={h:0,s:0,l:0};function qs(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Xe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=je.workingColorSpace){return this.r=e,this.g=t,this.b=i,je.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=je.workingColorSpace){if(e=Yh(e,1),t=Qe(t,0,1),i=Qe(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=qs(a,s,e+1/3),this.g=qs(a,s,e),this.b=qs(a,s,e-1/3)}return je.colorSpaceToWorking(this,r),this}setStyle(e,t=Zt){function i(s){s!==void 0&&parseFloat(s)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Zt){const i=tu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Cn(e.r),this.g=Cn(e.g),this.b=Cn(e.b),this}copyLinearToSRGB(e){return this.r=Pi(e.r),this.g=Pi(e.g),this.b=Pi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Zt){return je.workingToColorSpace(It.copy(this),e),Math.round(Qe(It.r*255,0,255))*65536+Math.round(Qe(It.g*255,0,255))*256+Math.round(Qe(It.b*255,0,255))}getHexString(e=Zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.workingToColorSpace(It.copy(this),t);const i=It.r,r=It.g,s=It.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=je.workingColorSpace){return je.workingToColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=Zt){je.workingToColorSpace(It.copy(this),e);const t=It.r,i=It.g,r=It.b;return e!==Zt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Un),this.setHSL(Un.h+e,Un.s+t,Un.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Un),e.getHSL(Er);const i=Bs(Un.h,Er.h,t),r=Bs(Un.s,Er.s,t),s=Bs(Un.l,Er.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new Xe;Xe.NAMES=tu;class ld extends Ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xn,this.environmentIntensity=1,this.environmentRotation=new Xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const nn=new z,Mn=new z,Ys=new z,wn=new z,gi=new z,vi=new z,Ml=new z,Zs=new z,Ks=new z,Js=new z,Qs=new vt,js=new vt,ea=new vt;class Qt{constructor(e=new z,t=new z,i=new z){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),nn.subVectors(e,t),r.cross(nn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){nn.subVectors(r,t),Mn.subVectors(i,t),Ys.subVectors(e,t);const a=nn.dot(nn),o=nn.dot(Mn),l=nn.dot(Ys),c=Mn.dot(Mn),u=Mn.dot(Ys),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(c*l-o*u)*h,p=(a*u-o*l)*h;return s.set(1-d-p,p,d)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,wn)===null?!1:wn.x>=0&&wn.y>=0&&wn.x+wn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,wn.x),l.addScaledVector(a,wn.y),l.addScaledVector(o,wn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Qs.setScalar(0),js.setScalar(0),ea.setScalar(0),Qs.fromBufferAttribute(e,t),js.fromBufferAttribute(e,i),ea.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Qs,s.x),a.addScaledVector(js,s.y),a.addScaledVector(ea,s.z),a}static isFrontFacing(e,t,i,r){return nn.subVectors(i,t),Mn.subVectors(e,t),nn.cross(Mn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return nn.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),nn.cross(Mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Qt.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Qt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;gi.subVectors(r,i),vi.subVectors(s,i),Zs.subVectors(e,i);const l=gi.dot(Zs),c=vi.dot(Zs);if(l<=0&&c<=0)return t.copy(i);Ks.subVectors(e,r);const u=gi.dot(Ks),f=vi.dot(Ks);if(u>=0&&f<=u)return t.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(gi,a);Js.subVectors(e,s);const d=gi.dot(Js),p=vi.dot(Js);if(p>=0&&d<=p)return t.copy(s);const b=d*c-l*p;if(b<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(i).addScaledVector(vi,o);const m=u*p-d*f;if(m<=0&&f-u>=0&&d-p>=0)return Ml.subVectors(s,r),o=(f-u)/(f-u+(d-p)),t.copy(r).addScaledVector(Ml,o);const g=1/(m+b+h);return a=b*g,o=h*g,t.copy(i).addScaledVector(gi,a).addScaledVector(vi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class _r{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(rn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(rn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=rn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,rn):rn.fromBufferAttribute(s,a),rn.applyMatrix4(e.matrixWorld),this.expandByPoint(rn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ar.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ar.copy(i.boundingBox)),Ar.applyMatrix4(e.matrixWorld),this.union(Ar)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,rn),rn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Gi),Tr.subVectors(this.max,Gi),_i.subVectors(e.a,Gi),xi.subVectors(e.b,Gi),bi.subVectors(e.c,Gi),Fn.subVectors(xi,_i),On.subVectors(bi,xi),qn.subVectors(_i,bi);let t=[0,-Fn.z,Fn.y,0,-On.z,On.y,0,-qn.z,qn.y,Fn.z,0,-Fn.x,On.z,0,-On.x,qn.z,0,-qn.x,-Fn.y,Fn.x,0,-On.y,On.x,0,-qn.y,qn.x,0];return!ta(t,_i,xi,bi,Tr)||(t=[1,0,0,0,1,0,0,0,1],!ta(t,_i,xi,bi,Tr))?!1:(Rr.crossVectors(Fn,On),t=[Rr.x,Rr.y,Rr.z],ta(t,_i,xi,bi,Tr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,rn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(rn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(En[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),En[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),En[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),En[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),En[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),En[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),En[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),En[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(En),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const En=[new z,new z,new z,new z,new z,new z,new z,new z],rn=new z,Ar=new _r,_i=new z,xi=new z,bi=new z,Fn=new z,On=new z,qn=new z,Gi=new z,Tr=new z,Rr=new z,Yn=new z;function ta(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Yn.fromArray(n,s);const o=r.x*Math.abs(Yn.x)+r.y*Math.abs(Yn.y)+r.z*Math.abs(Yn.z),l=e.dot(Yn),c=t.dot(Yn),u=i.dot(Yn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Mt=new z,kr=new de;let cd=0;class Pn extends oi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:cd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Gh,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)kr.fromBufferAttribute(this,t),kr.applyMatrix3(e),this.setXY(t,kr.x,kr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Vi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Vi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Vi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Vi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Vi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array),r=Bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array),r=Bt(r,this.array),s=Bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class nu extends Pn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class iu extends Pn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Lt extends Pn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const ud=new _r,Wi=new z,na=new z;class xr{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):ud.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Wi.subVectors(e,this.center);const t=Wi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Wi,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(na.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Wi.copy(e.center).add(na)),this.expandByPoint(Wi.copy(e.center).sub(na))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let hd=0;const qt=new ft,ia=new Ct,Si=new z,Gt=new _r,Xi=new _r,kt=new z;class At extends oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=Fi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wh(e)?iu:nu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new He().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return qt.makeRotationFromQuaternion(e),this.applyMatrix4(qt),this}rotateX(e){return qt.makeRotationX(e),this.applyMatrix4(qt),this}rotateY(e){return qt.makeRotationY(e),this.applyMatrix4(qt),this}rotateZ(e){return qt.makeRotationZ(e),this.applyMatrix4(qt),this}translate(e,t,i){return qt.makeTranslation(e,t,i),this.applyMatrix4(qt),this}scale(e,t,i){return qt.makeScale(e,t,i),this.applyMatrix4(qt),this}lookAt(e){return ia.lookAt(e),ia.updateMatrix(),this.applyMatrix4(ia.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Si).negate(),this.translate(Si.x,Si.y,Si.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Lt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _r);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Gt.setFromBufferAttribute(s),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,Gt.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,Gt.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(Gt.min),this.boundingBox.expandByPoint(Gt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const i=this.boundingSphere.center;if(Gt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Xi.setFromBufferAttribute(o),this.morphTargetsRelative?(kt.addVectors(Gt.min,Xi.min),Gt.expandByPoint(kt),kt.addVectors(Gt.max,Xi.max),Gt.expandByPoint(kt)):(Gt.expandByPoint(Xi.min),Gt.expandByPoint(Xi.max))}Gt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)kt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(kt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)kt.fromBufferAttribute(o,c),l&&(Si.fromBufferAttribute(e,c),kt.add(Si)),r=Math.max(r,i.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Pn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<i.count;_++)o[_]=new z,l[_]=new z;const c=new z,u=new z,f=new z,h=new de,d=new de,p=new de,b=new z,m=new z;function g(_,T,P){c.fromBufferAttribute(i,_),u.fromBufferAttribute(i,T),f.fromBufferAttribute(i,P),h.fromBufferAttribute(s,_),d.fromBufferAttribute(s,T),p.fromBufferAttribute(s,P),u.sub(c),f.sub(c),d.sub(h),p.sub(h);const N=1/(d.x*p.y-p.x*d.y);isFinite(N)&&(b.copy(u).multiplyScalar(p.y).addScaledVector(f,-d.y).multiplyScalar(N),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-p.x).multiplyScalar(N),o[_].add(b),o[T].add(b),o[P].add(b),l[_].add(m),l[T].add(m),l[P].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let _=0,T=E.length;_<T;++_){const P=E[_],N=P.start,B=P.count;for(let $=N,O=N+B;$<O;$+=3)g(e.getX($+0),e.getX($+1),e.getX($+2))}const k=new z,y=new z,M=new z,w=new z;function C(_){M.fromBufferAttribute(r,_),w.copy(M);const T=o[_];k.copy(T),k.sub(M.multiplyScalar(M.dot(T))).normalize(),y.crossVectors(w,T);const N=y.dot(l[_])<0?-1:1;a.setXYZW(_,k.x,k.y,k.z,N)}for(let _=0,T=E.length;_<T;++_){const P=E[_],N=P.start,B=P.count;for(let $=N,O=N+B;$<O;$+=3)C(e.getX($+0)),C(e.getX($+1)),C(e.getX($+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Pn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const r=new z,s=new z,a=new z,o=new z,l=new z,c=new z,u=new z,f=new z;if(e)for(let h=0,d=e.count;h<d;h+=3){const p=e.getX(h+0),b=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,b),a.fromBufferAttribute(t,m),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let d=0,p=0;for(let b=0,m=l.length;b<m;b++){o.isInterleavedBufferAttribute?d=l[b]*o.data.stride+o.offset:d=l[b]*u;for(let g=0;g<u;g++)h[p++]=c[d++]}return new Pn(h,u,f)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new At,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=e(h,i);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ra=new z,dd=new z,fd=new He;class fn{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=ra.subVectors(i,t).cross(dd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(ra),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||fd.getNormalMatrix(e),r=this.coplanarPoint(ra).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let pd=0;class li extends oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pd++}),this.uuid=Fi(),this.name="",this.type="Material",this.blending=er,this.side=Wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Nc,this.blendDst=Uc,this.blendEquation=Ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=ar,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Os,this.stencilZFail=Os,this.stencilZPass=Os,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Xe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new fn().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new de().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new de().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const An=new z,sa=new z,Cr=new z,Pr=new z;class Rs{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,An)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=An.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(An.copy(this.origin).addScaledVector(this.direction,t),An.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){sa.copy(e).add(t).multiplyScalar(.5),Cr.copy(t).sub(e).normalize(),Pr.copy(this.origin).sub(sa);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Cr),o=Pr.dot(this.direction),l=-Pr.dot(Cr),c=Pr.lengthSq(),u=Math.abs(1-a*a);let f,h,d,p;if(u>0)if(f=a*l-o,h=a*o-l,p=s*u,f>=0)if(h>=-p)if(h<=p){const b=1/u;f*=b,h*=b,d=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h<=-p?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=p?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(sa).addScaledVector(Cr,h),d}intersectSphere(e,t){if(e.radius<0)return null;An.subVectors(e.center,this.origin);const i=An.dot(this.direction),r=An.dot(An)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,An)!==null}intersectTriangle(e,t,i,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,f=e.x-a.x,h=e.y-a.y,d=e.z-a.z,p=t.x-a.x,b=t.y-a.y,m=t.z-a.z,g=i.x-a.x,E=i.y-a.y,k=i.z-a.z,y=Math.abs(l),M=Math.abs(c),w=Math.abs(u);let C,_,T,P,N,B,$,O,H,Q,x,R;if(y>=M&&y>=w?(T=l,B=f,H=p,R=g,l>=0?(C=c,_=u,P=h,N=d,$=b,O=m,Q=E,x=k):(C=u,_=c,P=d,N=h,$=m,O=b,Q=k,x=E)):M>=w?(T=c,B=h,H=b,R=E,c>=0?(C=u,_=l,P=d,N=f,$=m,O=p,Q=k,x=g):(C=l,_=u,P=f,N=d,$=p,O=m,Q=g,x=k)):(T=u,B=d,H=m,R=k,u>=0?(C=l,_=c,P=f,N=h,$=p,O=b,Q=g,x=E):(C=c,_=l,P=h,N=f,$=b,O=p,Q=E,x=g)),T===0)return null;const I=C/T,G=_/T,Y=1/T,le=P-I*B,xe=N-G*B,We=$-I*H,Ze=O-G*H,tt=Q-I*R,j=x-G*R,ne=tt*Ze-j*We,be=le*j-xe*tt,Ue=We*xe-Ze*le;if(r){if(ne<0||be<0||Ue<0)return null}else if((ne<0||be<0||Ue<0)&&(ne>0||be>0||Ue>0))return null;const we=ne+be+Ue;if(we===0)return null;const Oe=Y*(ne*B+be*H+Ue*R);return(we>0?Oe<0:Oe>0)?null:this.at(Oe/we,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vs extends li{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.combine=Po,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wl=new ft,Zn=new Rs,Lr=new xr,El=new z,Dr=new z,zr=new z,Ir=new z,aa=new z,Nr=new z,Al=new z,Ur=new z;class jt extends Ct{constructor(e=new At,t=new vs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Nr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(aa.fromBufferAttribute(f,e),a?Nr.addScaledVector(aa,u):Nr.addScaledVector(aa.sub(t),u))}t.add(Nr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Lr.copy(i.boundingSphere),Lr.applyMatrix4(s),Zn.copy(e.ray).recast(e.near),!(Lr.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(Lr,El)===null||Zn.origin.distanceToSquared(El)>(e.far-e.near)**2))&&(wl.copy(s).invert(),Zn.copy(e.ray).applyMatrix4(wl),!(i.boundingBox!==null&&Zn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Zn)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,b=h.length;p<b;p++){const m=h[p],g=a[m.materialIndex],E=Math.max(m.start,d.start),k=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let y=E,M=k;y<M;y+=3){const w=o.getX(y),C=o.getX(y+1),_=o.getX(y+2);r=Fr(this,g,e,i,c,u,f,w,C,_),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const p=Math.max(0,d.start),b=Math.min(o.count,d.start+d.count);for(let m=p,g=b;m<g;m+=3){const E=o.getX(m),k=o.getX(m+1),y=o.getX(m+2);r=Fr(this,a,e,i,c,u,f,E,k,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,b=h.length;p<b;p++){const m=h[p],g=a[m.materialIndex],E=Math.max(m.start,d.start),k=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let y=E,M=k;y<M;y+=3){const w=y,C=y+1,_=y+2;r=Fr(this,g,e,i,c,u,f,w,C,_),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const p=Math.max(0,d.start),b=Math.min(l.count,d.start+d.count);for(let m=p,g=b;m<g;m+=3){const E=m,k=m+1,y=m+2;r=Fr(this,a,e,i,c,u,f,E,k,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function md(n,e,t,i,r,s,a,o){let l;if(e.side===Vt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Wn,o),l===null)return null;Ur.copy(o),Ur.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ur);return c<t.near||c>t.far?null:{distance:c,point:Ur.clone(),object:n}}function Fr(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,Dr),n.getVertexPosition(l,zr),n.getVertexPosition(c,Ir);const u=md(n,e,t,i,Dr,zr,Ir,Al);if(u){const f=new z;Qt.getBarycoord(Al,Dr,zr,Ir,f),r&&(u.uv=Qt.getInterpolatedAttribute(r,o,l,c,f,new de)),s&&(u.uv1=Qt.getInterpolatedAttribute(s,o,l,c,f,new de)),a&&(u.normal=Qt.getInterpolatedAttribute(a,o,l,c,f,new z),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new z,materialIndex:0};Qt.getNormal(Dr,zr,Ir,h.normal),u.face=h,u.barycoord=f}return u}class gd extends Ot{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Pt,u=Pt,f,h){super(null,a,o,l,c,u,r,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Kn=new xr,vd=new de(.5,.5),Or=new z;class Ho{constructor(e=new fn,t=new fn,i=new fn,r=new fn,s=new fn,a=new fn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=gn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],f=s[5],h=s[6],d=s[7],p=s[8],b=s[9],m=s[10],g=s[11],E=s[12],k=s[13],y=s[14],M=s[15];if(r[0].setComponents(c-a,d-u,g-p,M-E).normalize(),r[1].setComponents(c+a,d+u,g+p,M+E).normalize(),r[2].setComponents(c+o,d+f,g+b,M+k).normalize(),r[3].setComponents(c-o,d-f,g-b,M-k).normalize(),i)r[4].setComponents(l,h,m,y).normalize(),r[5].setComponents(c-l,d-h,g-m,M-y).normalize();else if(r[4].setComponents(c-l,d-h,g-m,M-y).normalize(),t===gn)r[5].setComponents(c+l,d+h,g+m,M+y).normalize();else if(t===cr)r[5].setComponents(l,h,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kn)}intersectsSprite(e){Kn.center.set(0,0,0);const t=vd.distanceTo(e.center);return Kn.radius=.7071067811865476+t,Kn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kn)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Or.x=r.normal.x>0?e.max.x:e.min.x,Or.y=r.normal.y>0?e.max.y:e.min.y,Or.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Or)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ki extends li{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const _s=new z,xs=new z,Tl=new ft,$i=new Rs,Br=new xr,oa=new z,Rl=new z;class bs extends Ct{constructor(e=new At,t=new Ki){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)_s.fromBufferAttribute(t,r-1),xs.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=_s.distanceTo(xs);e.setAttribute("lineDistance",new Lt(i,1))}else Fe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Br.copy(i.boundingSphere),Br.applyMatrix4(r),Br.radius+=s,e.ray.intersectsSphere(Br)===!1)return;Tl.copy(r).invert(),$i.copy(e.ray).applyMatrix4(Tl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let b=d,m=p-1;b<m;b+=c){const g=u.getX(b),E=u.getX(b+1),k=Vr(this,e,$i,l,g,E,b);k&&t.push(k)}if(this.isLineLoop){const b=u.getX(p-1),m=u.getX(d),g=Vr(this,e,$i,l,b,m,p-1);g&&t.push(g)}}else{const d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let b=d,m=p-1;b<m;b+=c){const g=Vr(this,e,$i,l,b,b+1,b);g&&t.push(g)}if(this.isLineLoop){const b=Vr(this,e,$i,l,p-1,d,p-1);b&&t.push(b)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Vr(n,e,t,i,r,s,a){const o=n.geometry.attributes.position;if(_s.fromBufferAttribute(o,r),xs.fromBufferAttribute(o,s),t.distanceSqToSegment(_s,xs,oa,Rl)>i)return;oa.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(oa);if(!(c<e.near||c>e.far))return{distance:c,point:Rl.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const kl=new z,Cl=new z;class _d extends bs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)kl.fromBufferAttribute(t,r),Cl.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+kl.distanceTo(Cl);e.setAttribute("lineDistance",new Lt(i,1))}else Fe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class xd extends bs{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class ru extends li{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Pl=new ft,_o=new Rs,Hr=new xr,Gr=new z;class bd extends Ct{constructor(e=new At,t=new ru){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Hr.copy(i.boundingSphere),Hr.applyMatrix4(r),Hr.radius+=s,e.ray.intersectsSphere(Hr)===!1)return;Pl.copy(r).invert(),_o.copy(e.ray).applyMatrix4(Pl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,f=i.attributes.position;if(c!==null){const h=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let p=h,b=d;p<b;p++){const m=c.getX(p);Gr.fromBufferAttribute(f,m),Ll(Gr,m,l,r,e,t,this)}}else{const h=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let p=h,b=d;p<b;p++)Gr.fromBufferAttribute(f,p),Ll(Gr,p,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ll(n,e,t,i,r,s,a){const o=_o.distanceSqToPoint(n);if(o<t){const l=new z;_o.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class su extends Ot{constructor(e=[],t=ii,i,r,s,a,o,l,c,u){super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ur extends Ot{constructor(e,t,i=_n,r,s,a,o=Pt,l=Pt,c,u=Ln,f=1){if(u!==Ln&&u!==ti)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Bo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Sd extends ur{constructor(e,t=_n,i=ii,r,s,a=Pt,o=Pt,l,c=Ln){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class au extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class si extends At{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let h=0,d=0;p("z","y","x",-1,-1,i,t,e,a,s,0),p("z","y","x",1,-1,i,t,-e,a,s,1),p("x","z","y",1,1,e,i,t,r,a,2),p("x","z","y",1,-1,e,i,-t,r,a,3),p("x","y","z",1,-1,e,t,i,r,s,4),p("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Lt(c,3)),this.setAttribute("normal",new Lt(u,3)),this.setAttribute("uv",new Lt(f,2));function p(b,m,g,E,k,y,M,w,C,_,T){const P=y/C,N=M/_,B=y/2,$=M/2,O=w/2,H=C+1,Q=_+1;let x=0,R=0;const I=new z;for(let G=0;G<Q;G++){const Y=G*N-$;for(let le=0;le<H;le++){const xe=le*P-B;I[b]=xe*E,I[m]=Y*k,I[g]=O,c.push(I.x,I.y,I.z),I[b]=0,I[m]=0,I[g]=w>0?1:-1,u.push(I.x,I.y,I.z),f.push(le/C),f.push(1-G/_),x+=1}}for(let G=0;G<_;G++)for(let Y=0;Y<C;Y++){const le=h+Y+H*G,xe=h+Y+H*(G+1),We=h+(Y+1)+H*(G+1),Ze=h+(Y+1)+H*G;l.push(le,xe,Ze),l.push(xe,We,Ze),R+=6}o.addGroup(d,R,T),d+=R,h+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new si(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Go extends At{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],f=[],h=[],d=[];let p=0;const b=[],m=i/2;let g=0;E(),a===!1&&(e>0&&k(!0),t>0&&k(!1)),this.setIndex(u),this.setAttribute("position",new Lt(f,3)),this.setAttribute("normal",new Lt(h,3)),this.setAttribute("uv",new Lt(d,2));function E(){const y=new z,M=new z;let w=0;const C=(t-e)/i;for(let _=0;_<=s;_++){const T=[],P=_/s,N=P*(t-e)+e;for(let B=0;B<=r;B++){const $=B/r,O=$*l+o,H=Math.sin(O),Q=Math.cos(O);M.x=N*H,M.y=-P*i+m,M.z=N*Q,f.push(M.x,M.y,M.z),y.set(H,C,Q).normalize(),h.push(y.x,y.y,y.z),d.push($,1-P),T.push(p++)}b.push(T)}for(let _=0;_<r;_++)for(let T=0;T<s;T++){const P=b[T][_],N=b[T+1][_],B=b[T+1][_+1],$=b[T][_+1];(e>0||T!==0)&&(u.push(P,N,$),w+=3),(t>0||T!==s-1)&&(u.push(N,B,$),w+=3)}c.addGroup(g,w,0),g+=w}function k(y){const M=p,w=new de,C=new z;let _=0;const T=y===!0?e:t,P=y===!0?1:-1;for(let B=1;B<=r;B++)f.push(0,m*P,0),h.push(0,P,0),d.push(.5,.5),p++;const N=p;for(let B=0;B<=r;B++){const O=B/r*l+o,H=Math.cos(O),Q=Math.sin(O);C.x=T*Q,C.y=m*P,C.z=T*H,f.push(C.x,C.y,C.z),h.push(0,P,0),w.x=H*.5+.5,w.y=Q*.5*P+.5,d.push(w.x,w.y),p++}for(let B=0;B<r;B++){const $=M+B,O=N+B;y===!0?u.push(O,O+1,$):u.push(O+1,O,$),_+=3}c.addGroup(g,_,y===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Go(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const Wr=new z,Xr=new z,la=new z,$r=new Qt;class yd extends At{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(rs*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],f=new Array(3),h={},d=[];for(let p=0;p<l;p+=3){a?(c[0]=a.getX(p),c[1]=a.getX(p+1),c[2]=a.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);const{a:b,b:m,c:g}=$r;if(b.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),g.fromBufferAttribute(o,c[2]),$r.getNormal(la),f[0]=`${Math.round(b.x*r)},${Math.round(b.y*r)},${Math.round(b.z*r)}`,f[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,f[2]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let E=0;E<3;E++){const k=(E+1)%3,y=f[E],M=f[k],w=$r[u[E]],C=$r[u[k]],_=`${y}_${M}`,T=`${M}_${y}`;T in h&&h[T]?(la.dot(h[T].normal)<=s&&(d.push(w.x,w.y,w.z),d.push(C.x,C.y,C.z)),h[T]=null):_ in h||(h[_]={index0:c[E],index1:c[k],normal:la.clone()})}}for(const p in h)if(h[p]){const{index0:b,index1:m}=h[p];Wr.fromBufferAttribute(o,b),Xr.fromBufferAttribute(o,m),d.push(Wr.x,Wr.y,Wr.z),d.push(Xr.x,Xr.y,Xr.z)}this.setAttribute("position",new Lt(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Sn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Fe("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const s=i.length;let a;t?a=t:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const u=i[r],h=i[r+1]-u,d=(a-u)/h;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new de:new z);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new z,r=[],s=[],a=[],o=new z,l=new ft;for(let d=0;d<=e;d++){const p=d/e;r[d]=this.getTangentAt(p,new z)}s[0]=new z,a[0]=new z;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),f=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),h<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(r[d-1],r[d]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(Qe(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(o,p))}a[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(Qe(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(r[p],d*p)),a[p].crossVectors(r[p],s[p])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Wo extends Sn{constructor(e=0,t=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new de){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=l-this.aX,d=c-this.aY;l=h*u-d*f+this.aX,c=h*f+d*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Md extends Wo{constructor(e,t,i,r,s,a){super(e,t,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Xo(){let n=0,e=0,t=0,i=0;function r(s,a,o,l){n=s,e=o,t=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,f){let h=(a-s)/c-(o-s)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+f)+(l-o)/f;h*=u,d*=u,r(a,o,h,d)},calc:function(s){const a=s*s,o=a*s;return n+e*s+t*a+i*o}}}const Dl=new z,zl=new z,ca=new Xo,ua=new Xo,ha=new Xo;class wd extends Sn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new z){const i=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(zl.subVectors(r[0],r[1]).add(r[0]),c=zl);const f=r[o%s],h=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(Dl.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Dl),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(f),d),b=Math.pow(f.distanceToSquared(h),d),m=Math.pow(h.distanceToSquared(u),d);b<1e-4&&(b=1),p<1e-4&&(p=b),m<1e-4&&(m=b),ca.initNonuniformCatmullRom(c.x,f.x,h.x,u.x,p,b,m),ua.initNonuniformCatmullRom(c.y,f.y,h.y,u.y,p,b,m),ha.initNonuniformCatmullRom(c.z,f.z,h.z,u.z,p,b,m)}else this.curveType==="catmullrom"&&(ca.initCatmullRom(c.x,f.x,h.x,u.x,this.tension),ua.initCatmullRom(c.y,f.y,h.y,u.y,this.tension),ha.initCatmullRom(c.z,f.z,h.z,u.z,this.tension));return i.set(ca.calc(l),ua.calc(l),ha.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new z().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Il(n,e,t,i,r){const s=(i-e)*.5,a=(r-t)*.5,o=n*n,l=n*o;return(2*t-2*i+s+a)*l+(-3*t+3*i-2*s-a)*o+s*n+t}function Ed(n,e){const t=1-n;return t*t*e}function Ad(n,e){return 2*(1-n)*n*e}function Td(n,e){return n*n*e}function tr(n,e,t,i){return Ed(n,e)+Ad(n,t)+Td(n,i)}function Rd(n,e){const t=1-n;return t*t*t*e}function kd(n,e){const t=1-n;return 3*t*t*n*e}function Cd(n,e){return 3*(1-n)*n*n*e}function Pd(n,e){return n*n*n*e}function nr(n,e,t,i,r){return Rd(n,e)+kd(n,t)+Cd(n,i)+Pd(n,r)}class ou extends Sn{constructor(e=new de,t=new de,i=new de,r=new de){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new de){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(nr(e,r.x,s.x,a.x,o.x),nr(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ld extends Sn{constructor(e=new z,t=new z,i=new z,r=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new z){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(nr(e,r.x,s.x,a.x,o.x),nr(e,r.y,s.y,a.y,o.y),nr(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class lu extends Sn{constructor(e=new de,t=new de){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new de){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new de){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Dd extends Sn{constructor(e=new z,t=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new z){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class cu extends Sn{constructor(e=new de,t=new de,i=new de){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new de){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(tr(e,r.x,s.x,a.x),tr(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class zd extends Sn{constructor(e=new z,t=new z,i=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new z){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(tr(e,r.x,s.x,a.x),tr(e,r.y,s.y,a.y),tr(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class uu extends Sn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new de){const i=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],u=r[a>r.length-2?r.length-1:a+1],f=r[a>r.length-3?r.length-1:a+2];return i.set(Il(o,l.x,c.x,u.x,f.x),Il(o,l.y,c.y,u.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new de().fromArray(r))}return this}}var xo=Object.freeze({__proto__:null,ArcCurve:Md,CatmullRomCurve3:wd,CubicBezierCurve:ou,CubicBezierCurve3:Ld,EllipseCurve:Wo,LineCurve:lu,LineCurve3:Dd,QuadraticBezierCurve:cu,QuadraticBezierCurve3:zd,SplineCurve:uu});class Id extends Sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new xo[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new xo[r.type]().fromJSON(r))}return this}}class Ss extends Id{constructor(e){super(),this.type="Path",this.currentPoint=new de,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new lu(this.currentPoint.clone(),new de(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new cu(this.currentPoint.clone(),new de(e,t),new de(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,a){const o=new ou(this.currentPoint.clone(),new de(e,t),new de(i,r),new de(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new uu(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,r,s,a),this}absarc(e,t,i,r,s,a){return this.absellipse(e,t,i,i,r,s,a),this}ellipse(e,t,i,r,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,r,s,a,o,l),this}absellipse(e,t,i,r,s,a,o,l){const c=new Wo(e,t,i,r,s,a,o,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class hu extends Ss{constructor(e){super(e),this.uuid=Fi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(new Ss().fromJSON(r))}return this}}function Nd(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=du(n,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(i&&(s=Vd(n,e,s,t)),n.length>80*t){o=n[0],l=n[1];let u=o,f=l;for(let h=t;h<r;h+=t){const d=n[h],p=n[h+1];d<o&&(o=d),p<l&&(l=p),d>u&&(u=d),p>f&&(f=p)}c=Math.max(u-o,f-l),c=c!==0?32767/c:0}return hr(s,a,t,o,l,c,0),a}function du(n,e,t,i,r){let s;if(r===Qd(n,e,t,i)>0)for(let a=e;a<t;a+=i)s=Nl(a/i|0,n[a],n[a+1],s);else for(let a=t-i;a>=e;a-=i)s=Nl(a/i|0,n[a],n[a+1],s);return s&&Di(s,s.next)&&(fr(s),s=s.next),s}function ai(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Di(t,t.next)||_t(t.prev,t,t.next)===0)){if(fr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function hr(n,e,t,i,r,s,a){if(!n)return;!a&&s&&$d(n,i,r,s);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?Fd(n,i,r,s):Ud(n)){e.push(l.i,n.i,c.i),fr(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=Od(ai(n),e),hr(n,e,t,i,r,s,2)):a===2&&Bd(n,e,t,i,r,s):hr(ai(n),e,t,i,r,s,1);break}}}function Ud(n){const e=n.prev,t=n,i=n.next;if(_t(e,t,i)>=0)return!1;const r=e.x,s=t.x,a=i.x,o=e.y,l=t.y,c=i.y,u=Math.min(r,s,a),f=Math.min(o,l,c),h=Math.max(r,s,a),d=Math.max(o,l,c);let p=i.next;for(;p!==e;){if(p.x>=u&&p.x<=h&&p.y>=f&&p.y<=d&&Ji(r,o,s,l,a,c,p.x,p.y)&&_t(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Fd(n,e,t,i){const r=n.prev,s=n,a=n.next;if(_t(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,u=r.y,f=s.y,h=a.y,d=Math.min(o,l,c),p=Math.min(u,f,h),b=Math.max(o,l,c),m=Math.max(u,f,h),g=bo(d,p,e,t,i),E=bo(b,m,e,t,i);let k=n.prevZ,y=n.nextZ;for(;k&&k.z>=g&&y&&y.z<=E;){if(k.x>=d&&k.x<=b&&k.y>=p&&k.y<=m&&k!==r&&k!==a&&Ji(o,u,l,f,c,h,k.x,k.y)&&_t(k.prev,k,k.next)>=0||(k=k.prevZ,y.x>=d&&y.x<=b&&y.y>=p&&y.y<=m&&y!==r&&y!==a&&Ji(o,u,l,f,c,h,y.x,y.y)&&_t(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;k&&k.z>=g;){if(k.x>=d&&k.x<=b&&k.y>=p&&k.y<=m&&k!==r&&k!==a&&Ji(o,u,l,f,c,h,k.x,k.y)&&_t(k.prev,k,k.next)>=0)return!1;k=k.prevZ}for(;y&&y.z<=E;){if(y.x>=d&&y.x<=b&&y.y>=p&&y.y<=m&&y!==r&&y!==a&&Ji(o,u,l,f,c,h,y.x,y.y)&&_t(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Od(n,e){let t=n;do{const i=t.prev,r=t.next.next;!Di(i,r)&&pu(i,t,t.next,r)&&dr(i,r)&&dr(r,i)&&(e.push(i.i,t.i,r.i),fr(t),fr(t.next),t=n=r),t=t.next}while(t!==n);return ai(t)}function Bd(n,e,t,i,r,s){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Zd(a,o)){let l=mu(a,o);a=ai(a,a.next),l=ai(l,l.next),hr(a,e,t,i,r,s,0),hr(l,e,t,i,r,s,0);return}o=o.next}a=a.next}while(a!==n)}function Vd(n,e,t,i){const r=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*i,l=s<a-1?e[s+1]*i:n.length,c=du(n,o,l,i,!1);c===c.next&&(c.steiner=!0),r.push(Yd(c))}r.sort(Hd);for(let s=0;s<r.length;s++)t=Gd(r[s],t);return t}function Hd(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function Gd(n,e){const t=Wd(n,e);if(!t)return e;const i=mu(t,n);return ai(i,i.next),ai(t,t.next)}function Wd(n,e){let t=e;const i=n.x,r=n.y;let s=-1/0,a;if(Di(n,t))return t;do{if(Di(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const f=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=i&&f>s&&(s=f,a=t.x<t.next.x?t:t.next,f===i))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(i>=t.x&&t.x>=l&&i!==t.x&&fu(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){const f=Math.abs(r-t.y)/(i-t.x);dr(t,n)&&(f<u||f===u&&(t.x>a.x||t.x===a.x&&Xd(a,t)))&&(a=t,u=f)}t=t.next}while(t!==o);return a}function Xd(n,e){return _t(n.prev,n,e.prev)<0&&_t(e.next,n,n.next)<0}function $d(n,e,t,i){let r=n;do r.z===0&&(r.z=bo(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,qd(r)}function qd(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let a=i,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(r=i,i=i.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=a}s.nextZ=null,t*=2}while(e>1);return n}function bo(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Yd(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function fu(n,e,t,i,r,s,a,o){return(r-a)*(e-o)>=(n-a)*(s-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(i-o)}function Ji(n,e,t,i,r,s,a,o){return!(n===a&&e===o)&&fu(n,e,t,i,r,s,a,o)}function Zd(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Kd(n,e)&&(dr(n,e)&&dr(e,n)&&Jd(n,e)&&(_t(n.prev,n,e.prev)||_t(n,e.prev,e))||Di(n,e)&&_t(n.prev,n,n.next)>0&&_t(e.prev,e,e.next)>0)}function _t(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Di(n,e){return n.x===e.x&&n.y===e.y}function pu(n,e,t,i){const r=Yr(_t(n,e,t)),s=Yr(_t(n,e,i)),a=Yr(_t(t,i,n)),o=Yr(_t(t,i,e));return!!(r!==s&&a!==o||r===0&&qr(n,t,e)||s===0&&qr(n,i,e)||a===0&&qr(t,n,i)||o===0&&qr(t,e,i))}function qr(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Yr(n){return n>0?1:n<0?-1:0}function Kd(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&pu(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function dr(n,e){return _t(n.prev,n,n.next)<0?_t(n,e,n.next)>=0&&_t(n,n.prev,e)>=0:_t(n,e,n.prev)<0||_t(n,n.next,e)<0}function Jd(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function mu(n,e){const t=So(n.i,n.x,n.y),i=So(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function Nl(n,e,t,i){const r=So(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function fr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function So(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Qd(n,e,t,i){let r=0;for(let s=e,a=t-i;s<t;s+=i)r+=(n[a]-n[s])*(n[s+1]+n[a+1]),a=s;return r}class jd{static triangulate(e,t,i=2){return Nd(e,t,i)}}class Ti{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return Ti.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];Ul(e),Fl(i,e);let a=e.length;t.forEach(Ul);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,Fl(i,t[l]);const o=jd.triangulate(i,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function Ul(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Fl(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class ys extends At{constructor(e=new hu([new de(.5,.5),new de(-.5,.5),new de(-.5,-.5),new de(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new Lt(r,3)),this.setAttribute("uv",new Lt(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:d-.1,b=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const g=t.extrudePath,E=t.UVGenerator!==void 0?t.UVGenerator:ef;let k,y=!1,M,w,C,_;if(g){k=g.getSpacedPoints(u),y=!0,h=!1;const ie=g.isCatmullRomCurve3?g.closed:!1;M=g.computeFrenetFrames(u,ie),w=new z,C=new z,_=new z}h||(m=0,d=0,p=0,b=0);const T=o.extractPoints(c);let P=T.shape;const N=T.holes;if(!Ti.isClockWise(P)){P=P.reverse();for(let ie=0,se=N.length;ie<se;ie++){const ae=N[ie];Ti.isClockWise(ae)&&(N[ie]=ae.reverse())}}function $(ie){const ae=10000000000000001e-36;let oe=ie[0];for(let he=1;he<=ie.length;he++){const Ie=he%ie.length,ze=ie[Ie],Be=ze.x-oe.x,Ve=ze.y-oe.y,D=Be*Be+Ve*Ve,rt=Math.max(Math.abs(ze.x),Math.abs(ze.y),Math.abs(oe.x),Math.abs(oe.y)),Ke=ae*rt*rt;if(D<=Ke){ie.splice(Ie,1),he--;continue}oe=ze}}$(P),N.forEach($);const O=N.length,H=P;for(let ie=0;ie<O;ie++){const se=N[ie];P=P.concat(se)}function Q(ie,se,ae){return se||et("ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector(se,ae)}const x=P.length;function R(ie,se,ae){let oe,he,Ie;const ze=ie.x-se.x,Be=ie.y-se.y,Ve=ae.x-ie.x,D=ae.y-ie.y,rt=ze*ze+Be*Be,Ke=ze*D-Be*Ve;if(Math.abs(Ke)>Number.EPSILON){const A=Math.sqrt(rt),v=Math.sqrt(Ve*Ve+D*D),V=se.x-Be/A,q=se.y+ze/A,K=ae.x-D/v,ce=ae.y+Ve/v,ue=((K-V)*D-(ce-q)*Ve)/(ze*D-Be*Ve);oe=V+ze*ue-ie.x,he=q+Be*ue-ie.y;const J=oe*oe+he*he;if(J<=2)return new de(oe,he);Ie=Math.sqrt(J/2)}else{let A=!1;ze>Number.EPSILON?Ve>Number.EPSILON&&(A=!0):ze<-Number.EPSILON?Ve<-Number.EPSILON&&(A=!0):Math.sign(Be)===Math.sign(D)&&(A=!0),A?(oe=-Be,he=ze,Ie=Math.sqrt(rt)):(oe=ze,he=Be,Ie=Math.sqrt(rt/2))}return new de(oe/Ie,he/Ie)}const I=[];for(let ie=0,se=H.length,ae=se-1,oe=ie+1;ie<se;ie++,ae++,oe++)ae===se&&(ae=0),oe===se&&(oe=0),I[ie]=R(H[ie],H[ae],H[oe]);const G=[];let Y,le=I.concat();for(let ie=0,se=O;ie<se;ie++){const ae=N[ie];Y=[];for(let oe=0,he=ae.length,Ie=he-1,ze=oe+1;oe<he;oe++,Ie++,ze++)Ie===he&&(Ie=0),ze===he&&(ze=0),Y[oe]=R(ae[oe],ae[Ie],ae[ze]);G.push(Y),le=le.concat(Y)}let xe;if(m===0)xe=Ti.triangulateShape(H,N);else{const ie=[],se=[];for(let ae=0;ae<m;ae++){const oe=ae/m,he=d*Math.cos(oe*Math.PI/2),Ie=p*Math.sin(oe*Math.PI/2)+b;for(let ze=0,Be=H.length;ze<Be;ze++){const Ve=Q(H[ze],I[ze],Ie);be(Ve.x,Ve.y,-he),oe===0&&ie.push(Ve)}for(let ze=0,Be=O;ze<Be;ze++){const Ve=N[ze];Y=G[ze];const D=[];for(let rt=0,Ke=Ve.length;rt<Ke;rt++){const A=Q(Ve[rt],Y[rt],Ie);be(A.x,A.y,-he),oe===0&&D.push(A)}oe===0&&se.push(D)}}xe=Ti.triangulateShape(ie,se)}const We=xe.length,Ze=p+b;for(let ie=0;ie<x;ie++){const se=h?Q(P[ie],le[ie],Ze):P[ie];y?(C.copy(M.normals[0]).multiplyScalar(se.x),w.copy(M.binormals[0]).multiplyScalar(se.y),_.copy(k[0]).add(C).add(w),be(_.x,_.y,_.z)):be(se.x,se.y,0)}for(let ie=1;ie<=u;ie++)for(let se=0;se<x;se++){const ae=h?Q(P[se],le[se],Ze):P[se];y?(C.copy(M.normals[ie]).multiplyScalar(ae.x),w.copy(M.binormals[ie]).multiplyScalar(ae.y),_.copy(k[ie]).add(C).add(w),be(_.x,_.y,_.z)):be(ae.x,ae.y,f/u*ie)}for(let ie=m-1;ie>=0;ie--){const se=ie/m,ae=d*Math.cos(se*Math.PI/2),oe=p*Math.sin(se*Math.PI/2)+b;for(let he=0,Ie=H.length;he<Ie;he++){const ze=Q(H[he],I[he],oe);be(ze.x,ze.y,f+ae)}for(let he=0,Ie=N.length;he<Ie;he++){const ze=N[he];Y=G[he];for(let Be=0,Ve=ze.length;Be<Ve;Be++){const D=Q(ze[Be],Y[Be],oe);y?be(D.x,D.y+k[u-1].y,k[u-1].x+ae):be(D.x,D.y,f+ae)}}}tt(),j();function tt(){const ie=r.length/3;if(h){let se=0,ae=x*se;for(let oe=0;oe<We;oe++){const he=xe[oe];Ue(he[2]+ae,he[1]+ae,he[0]+ae)}se=u+m*2,ae=x*se;for(let oe=0;oe<We;oe++){const he=xe[oe];Ue(he[0]+ae,he[1]+ae,he[2]+ae)}}else{for(let se=0;se<We;se++){const ae=xe[se];Ue(ae[2],ae[1],ae[0])}for(let se=0;se<We;se++){const ae=xe[se];Ue(ae[0]+x*u,ae[1]+x*u,ae[2]+x*u)}}i.addGroup(ie,r.length/3-ie,0)}function j(){const ie=r.length/3;let se=0;ne(H,se),se+=H.length;for(let ae=0,oe=N.length;ae<oe;ae++){const he=N[ae];ne(he,se),se+=he.length}i.addGroup(ie,r.length/3-ie,1)}function ne(ie,se){let ae=ie.length;for(;--ae>=0;){const oe=ae;let he=ae-1;he<0&&(he=ie.length-1);for(let Ie=0,ze=u+m*2;Ie<ze;Ie++){const Be=x*Ie,Ve=x*(Ie+1),D=se+oe+Be,rt=se+he+Be,Ke=se+he+Ve,A=se+oe+Ve;we(D,rt,Ke,A)}}}function be(ie,se,ae){l.push(ie),l.push(se),l.push(ae)}function Ue(ie,se,ae){Oe(ie),Oe(se),Oe(ae);const oe=r.length/3,he=E.generateTopUV(i,r,oe-3,oe-2,oe-1);ot(he[0]),ot(he[1]),ot(he[2])}function we(ie,se,ae,oe){Oe(ie),Oe(se),Oe(oe),Oe(se),Oe(ae),Oe(oe);const he=r.length/3,Ie=E.generateSideWallUV(i,r,he-6,he-3,he-2,he-1);ot(Ie[0]),ot(Ie[1]),ot(Ie[3]),ot(Ie[1]),ot(Ie[2]),ot(Ie[3])}function Oe(ie){r.push(l[ie*3+0]),r.push(l[ie*3+1]),r.push(l[ie*3+2])}function ot(ie){s.push(ie.x),s.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return tf(t,i,e)}static fromJSON(e,t){const i=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];i.push(o)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new xo[r.type]().fromJSON(r)),new ys(i,e.options)}}const ef={generateTopUV:function(n,e,t,i,r){const s=e[t*3],a=e[t*3+1],o=e[i*3],l=e[i*3+1],c=e[r*3],u=e[r*3+1];return[new de(s,a),new de(o,l),new de(c,u)]},generateSideWallUV:function(n,e,t,i,r,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[i*3],u=e[i*3+1],f=e[i*3+2],h=e[r*3],d=e[r*3+1],p=e[r*3+2],b=e[s*3],m=e[s*3+1],g=e[s*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new de(a,1-l),new de(c,1-f),new de(h,1-p),new de(b,1-g)]:[new de(o,1-l),new de(u,1-f),new de(d,1-p),new de(m,1-g)]}};function tf(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){const s=n[i];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class ks extends At{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,f=e/o,h=t/l,d=[],p=[],b=[],m=[];for(let g=0;g<u;g++){const E=g*h-a;for(let k=0;k<c;k++){const y=k*f-s;p.push(y,-E,0),b.push(0,0,1),m.push(k/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let E=0;E<o;E++){const k=E+c*g,y=E+c*(g+1),M=E+1+c*(g+1),w=E+1+c*g;d.push(k,y,w),d.push(y,M,w)}this.setIndex(d),this.setAttribute("position",new Lt(p,3)),this.setAttribute("normal",new Lt(b,3)),this.setAttribute("uv",new Lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ks(e.width,e.height,e.widthSegments,e.heightSegments)}}function zi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(Ol(r))r.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Ol(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Ft(n){const e={};for(let t=0;t<n.length;t++){const i=zi(n[t]);for(const r in i)e[r]=i[r]}return e}function Ol(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function nf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function gu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const rf={clone:zi,merge:Ft};var sf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,af=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bn extends li{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sf,this.fragmentShader=af,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zi(e.uniforms),this.uniformsGroups=nf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Xe().setHex(r.value);break;case"v2":this.uniforms[i].value=new de().fromArray(r.value);break;case"v3":this.uniforms[i].value=new z().fromArray(r.value);break;case"v4":this.uniforms[i].value=new vt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new He().fromArray(r.value);break;case"m4":this.uniforms[i].value=new ft().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class of extends bn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class lf extends li{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=go,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.combine=Po,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class cf extends li{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=zh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class uf extends li{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class vu extends Ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const da=new ft,Bl=new z,Vl=new z;class hf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.mapType=Xt,this.map=null,this.mapPass=null,this.matrix=new ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ho,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new vt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Bl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bl),Vl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Vl),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){da.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(da,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===cr||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(da)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Zr=new z,Kr=new Oi,cn=new z;class _u extends Ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ft,this.projectionMatrix=new ft,this.projectionMatrixInverse=new ft,this.coordinateSystem=gn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Zr,Kr,cn),cn.x===1&&cn.y===1&&cn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zr,Kr,cn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Zr,Kr,cn),cn.x===1&&cn.y===1&&cn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zr,Kr,cn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Bn=new z,Hl=new de,Gl=new de;class Kt extends _u{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=vo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(rs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vo*2*Math.atan(Math.tan(rs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z),Bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z)}getViewSize(e,t){return this.getViewBounds(e,Hl,Gl),t.subVectors(Gl,Hl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(rs*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Cs extends _u{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class df extends hf{constructor(){super(new Cs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wl extends vu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.shadow=new df}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class ff extends vu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const yi=-90,Mi=1;class pf extends Ct{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Kt(yi,Mi,e,t);r.layers=this.layers,this.add(r);const s=new Kt(yi,Mi,e,t);s.layers=this.layers,this.add(s);const a=new Kt(yi,Mi,e,t);a.layers=this.layers,this.add(a);const o=new Kt(yi,Mi,e,t);o.layers=this.layers,this.add(o);const l=new Kt(yi,Mi,e,t);l.layers=this.layers,this.add(l);const c=new Kt(yi,Mi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===gn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===cr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=b,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class mf extends Kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Xl=new ft;class fa{constructor(e,t,i=0,r=1/0){this.ray=new Rs(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Vo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):et("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Xl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Xl),this}intersectObject(e,t=!0,i=[]){return yo(e,this,i,t),i.sort($l),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)yo(e[r],this,i,t);return i.sort($l),i}}function $l(n,e){return n.distance-e.distance}function yo(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)yo(s[a],e,t,!0)}}class xu{static{xu.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}function ql(n,e,t,i){const r=gf(i);switch(t){case Kc:return n*e;case Qc:return n*e/r.components*r.byteLength;case Io:return n*e/r.components*r.byteLength;case ri:return n*e*2/r.components*r.byteLength;case No:return n*e*2/r.components*r.byteLength;case Jc:return n*e*3/r.components*r.byteLength;case sn:return n*e*4/r.components*r.byteLength;case Uo:return n*e*4/r.components*r.byteLength;case es:case ts:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ns:case is:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ba:case Ha:return Math.max(n,16)*Math.max(e,8)/4;case Oa:case Va:return Math.max(n,8)*Math.max(e,8)/2;case Ga:case Wa:case $a:case qa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Xa:case ds:case Ya:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Za:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ka:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ja:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Qa:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case ja:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case eo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case to:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case no:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case io:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ro:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case so:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ao:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case oo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case lo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case co:case uo:case ho:return Math.ceil(n/4)*Math.ceil(e/4)*16;case fo:case po:return Math.ceil(n/4)*Math.ceil(e/4)*8;case fs:case mo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function gf(n){switch(n){case Xt:case $c:return{byteLength:1,components:1};case or:case qc:case xn:return{byteLength:2,components:1};case Do:case zo:return{byteLength:2,components:4};case _n:case Lo:case mn:return{byteLength:4,components:1};case Yc:case Zc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Co}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Co);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function bu(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function vf(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,u);else{f.sort((d,p)=>d.start-p.start);let h=0;for(let d=1;d<f.length;d++){const p=f[h],b=f[d];b.start<=p.start+p.count+1?p.count=Math.max(p.count,b.start+b.count-p.start):(++h,f[h]=b)}f.length=h+1;for(let d=0,p=f.length;d<p;d++){const b=f[d];n.bufferSubData(c,b.start*u.BYTES_PER_ELEMENT,u,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var _f=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xf=`#ifdef USE_ALPHAHASH
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
#endif`,bf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Sf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Mf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wf=`#ifdef USE_AOMAP
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
#endif`,Ef=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Af=`#ifdef USE_BATCHING
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
#endif`,Tf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Rf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Cf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Pf=`#ifdef USE_IRIDESCENCE
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
#endif`,Lf=`#ifdef USE_BUMPMAP
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
#endif`,Df=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,zf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,If=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Nf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Uf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ff=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Of=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Bf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Vf=`#define PI 3.141592653589793
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
} // validated`,Hf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Gf=`vec3 transformedNormal = objectNormal;
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
#endif`,Wf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$f=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Kf=`#ifdef USE_ENVMAP
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
#endif`,Jf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Qf=`#ifdef USE_ENVMAP
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
#endif`,jf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ep=`#ifdef USE_ENVMAP
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
#endif`,tp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,np=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ip=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,rp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sp=`#ifdef USE_GRADIENTMAP
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
}`,ap=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,op=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,up=`#ifdef USE_ENVMAP
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
#endif`,hp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mp=`PhysicalMaterial material;
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
#endif`,gp=`uniform sampler2D dfgLUT;
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
}`,vp=`
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
#endif`,_p=`#if defined( RE_IndirectDiffuse )
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
#endif`,xp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Sp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ep=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ap=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Tp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Rp=`#if defined( USE_POINTS_UV )
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
#endif`,kp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Lp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zp=`#ifdef USE_MORPHTARGETS
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
#endif`,Ip=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Np=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Up=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Op=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Vp=`#ifdef USE_NORMALMAP
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
#endif`,Hp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Wp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$p=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Yp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Kp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Jp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Qp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,em=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,nm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,im=`float getShadowMask() {
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
}`,rm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sm=`#ifdef USE_SKINNING
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
#endif`,am=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,om=`#ifdef USE_SKINNING
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
#endif`,lm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,um=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,dm=`#ifdef USE_TRANSMISSION
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
#endif`,fm=`#ifdef USE_TRANSMISSION
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
#endif`,pm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _m=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xm=`uniform sampler2D t2D;
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
}`,bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wm=`#include <common>
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
}`,Em=`#if DEPTH_PACKING == 3200
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
}`,Am=`#define DISTANCE
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
}`,Tm=`#define DISTANCE
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
}`,Rm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,km=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cm=`uniform float scale;
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
}`,Pm=`uniform vec3 diffuse;
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
}`,Lm=`#include <common>
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
}`,Dm=`uniform vec3 diffuse;
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
}`,zm=`#define LAMBERT
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
}`,Im=`#define LAMBERT
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
}`,Nm=`#define MATCAP
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
}`,Um=`#define MATCAP
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
}`,Fm=`#define NORMAL
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
}`,Om=`#define NORMAL
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
}`,Bm=`#define PHONG
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
}`,Vm=`#define PHONG
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
}`,Hm=`#define STANDARD
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
}`,Gm=`#define STANDARD
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
}`,Wm=`#define TOON
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
}`,Xm=`#define TOON
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
}`,$m=`uniform float size;
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
}`,qm=`uniform vec3 diffuse;
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
}`,Ym=`#include <common>
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
}`,Zm=`uniform vec3 color;
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
}`,Km=`uniform float rotation;
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
}`,Jm=`uniform vec3 diffuse;
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
}`,qe={alphahash_fragment:_f,alphahash_pars_fragment:xf,alphamap_fragment:bf,alphamap_pars_fragment:Sf,alphatest_fragment:yf,alphatest_pars_fragment:Mf,aomap_fragment:wf,aomap_pars_fragment:Ef,batching_pars_vertex:Af,batching_vertex:Tf,begin_vertex:Rf,beginnormal_vertex:kf,bsdfs:Cf,iridescence_fragment:Pf,bumpmap_pars_fragment:Lf,clipping_planes_fragment:Df,clipping_planes_pars_fragment:zf,clipping_planes_pars_vertex:If,clipping_planes_vertex:Nf,color_fragment:Uf,color_pars_fragment:Ff,color_pars_vertex:Of,color_vertex:Bf,common:Vf,cube_uv_reflection_fragment:Hf,defaultnormal_vertex:Gf,displacementmap_pars_vertex:Wf,displacementmap_vertex:Xf,emissivemap_fragment:$f,emissivemap_pars_fragment:qf,colorspace_fragment:Yf,colorspace_pars_fragment:Zf,envmap_fragment:Kf,envmap_common_pars_fragment:Jf,envmap_pars_fragment:Qf,envmap_pars_vertex:jf,envmap_physical_pars_fragment:up,envmap_vertex:ep,fog_vertex:tp,fog_pars_vertex:np,fog_fragment:ip,fog_pars_fragment:rp,gradientmap_pars_fragment:sp,lightmap_pars_fragment:ap,lights_lambert_fragment:op,lights_lambert_pars_fragment:lp,lights_pars_begin:cp,lights_toon_fragment:hp,lights_toon_pars_fragment:dp,lights_phong_fragment:fp,lights_phong_pars_fragment:pp,lights_physical_fragment:mp,lights_physical_pars_fragment:gp,lights_fragment_begin:vp,lights_fragment_maps:_p,lights_fragment_end:xp,lightprobes_pars_fragment:bp,logdepthbuf_fragment:Sp,logdepthbuf_pars_fragment:yp,logdepthbuf_pars_vertex:Mp,logdepthbuf_vertex:wp,map_fragment:Ep,map_pars_fragment:Ap,map_particle_fragment:Tp,map_particle_pars_fragment:Rp,metalnessmap_fragment:kp,metalnessmap_pars_fragment:Cp,morphinstance_vertex:Pp,morphcolor_vertex:Lp,morphnormal_vertex:Dp,morphtarget_pars_vertex:zp,morphtarget_vertex:Ip,normal_fragment_begin:Np,normal_fragment_maps:Up,normal_pars_fragment:Fp,normal_pars_vertex:Op,normal_vertex:Bp,normalmap_pars_fragment:Vp,clearcoat_normal_fragment_begin:Hp,clearcoat_normal_fragment_maps:Gp,clearcoat_pars_fragment:Wp,iridescence_pars_fragment:Xp,opaque_fragment:$p,packing:qp,premultiplied_alpha_fragment:Yp,project_vertex:Zp,dithering_fragment:Kp,dithering_pars_fragment:Jp,roughnessmap_fragment:Qp,roughnessmap_pars_fragment:jp,shadowmap_pars_fragment:em,shadowmap_pars_vertex:tm,shadowmap_vertex:nm,shadowmask_pars_fragment:im,skinbase_vertex:rm,skinning_pars_vertex:sm,skinning_vertex:am,skinnormal_vertex:om,specularmap_fragment:lm,specularmap_pars_fragment:cm,tonemapping_fragment:um,tonemapping_pars_fragment:hm,transmission_fragment:dm,transmission_pars_fragment:fm,uv_pars_fragment:pm,uv_pars_vertex:mm,uv_vertex:gm,worldpos_vertex:vm,background_vert:_m,background_frag:xm,backgroundCube_vert:bm,backgroundCube_frag:Sm,cube_vert:ym,cube_frag:Mm,depth_vert:wm,depth_frag:Em,distance_vert:Am,distance_frag:Tm,equirect_vert:Rm,equirect_frag:km,linedashed_vert:Cm,linedashed_frag:Pm,meshbasic_vert:Lm,meshbasic_frag:Dm,meshlambert_vert:zm,meshlambert_frag:Im,meshmatcap_vert:Nm,meshmatcap_frag:Um,meshnormal_vert:Fm,meshnormal_frag:Om,meshphong_vert:Bm,meshphong_frag:Vm,meshphysical_vert:Hm,meshphysical_frag:Gm,meshtoon_vert:Wm,meshtoon_frag:Xm,points_vert:$m,points_frag:qm,shadow_vert:Ym,shadow_frag:Zm,sprite_vert:Km,sprite_frag:Jm},_e={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new z},probesMax:{value:new z},probesResolution:{value:new z}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},pn={basic:{uniforms:Ft([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:Ft([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Xe(0)},envMapIntensity:{value:1}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:Ft([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:Ft([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:Ft([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Xe(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:Ft([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:Ft([_e.points,_e.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:Ft([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:Ft([_e.common,_e.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:Ft([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:Ft([_e.sprite,_e.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distance:{uniforms:Ft([_e.common,_e.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distance_vert,fragmentShader:qe.distance_frag},shadow:{uniforms:Ft([_e.lights,_e.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};pn.physical={uniforms:Ft([pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const Jr={r:0,b:0,g:0},Qm=new ft,Su=new He;Su.set(-1,0,0,0,1,0,0,0,1);function jm(n,e,t,i,r,s){const a=new Xe(0);let o=r===!0?0:1,l,c,u=null,f=0,h=null;function d(E){let k=E.isScene===!0?E.background:null;if(k&&k.isTexture){const y=E.backgroundBlurriness>0;k=e.get(k,y)}return k}function p(E){let k=!1;const y=d(E);y===null?m(a,o):y&&y.isColor&&(m(y,1),k=!0);const M=n.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,s):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||k)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function b(E,k){const y=d(k);y&&(y.isCubeTexture||y.mapping===Ts)?(c===void 0&&(c=new jt(new si(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:zi(pn.backgroundCube.uniforms),vertexShader:pn.backgroundCube.vertexShader,fragmentShader:pn.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=k.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=k.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Qm.makeRotationFromEuler(k.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Su),c.material.toneMapped=je.getTransfer(y.colorSpace)!==lt,(u!==y||f!==y.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=y,f=y.version,h=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new jt(new ks(2,2),new bn({name:"BackgroundMaterial",uniforms:zi(pn.background.uniforms),vertexShader:pn.background.vertexShader,fragmentShader:pn.background.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=k.backgroundIntensity,l.material.toneMapped=je.getTransfer(y.colorSpace)!==lt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=y,f=y.version,h=n.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function m(E,k){E.getRGB(Jr,gu(n)),t.buffers.color.setClear(Jr.r,Jr.g,Jr.b,k,s)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,k=1){a.set(E),o=k,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(E){o=E,m(a,o)},render:p,addToRenderList:b,dispose:g}}function eg(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(N,B,$,O,H){let Q=!1;const x=f(N,O,$,B);s!==x&&(s=x,c(s.object)),Q=d(N,O,$,H),Q&&p(N,O,$,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(Q||a)&&(a=!1,y(N,B,$,O),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return n.createVertexArray()}function c(N){return n.bindVertexArray(N)}function u(N){return n.deleteVertexArray(N)}function f(N,B,$,O){const H=O.wireframe===!0;let Q=i[B.id];Q===void 0&&(Q={},i[B.id]=Q);const x=N.isInstancedMesh===!0?N.id:0;let R=Q[x];R===void 0&&(R={},Q[x]=R);let I=R[$.id];I===void 0&&(I={},R[$.id]=I);let G=I[H];return G===void 0&&(G=h(l()),I[H]=G),G}function h(N){const B=[],$=[],O=[];for(let H=0;H<t;H++)B[H]=0,$[H]=0,O[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:$,attributeDivisors:O,object:N,attributes:{},index:null}}function d(N,B,$,O){const H=s.attributes,Q=B.attributes;let x=0;const R=$.getAttributes();for(const I in R)if(R[I].location>=0){const Y=H[I];let le=Q[I];if(le===void 0&&(I==="instanceMatrix"&&N.instanceMatrix&&(le=N.instanceMatrix),I==="instanceColor"&&N.instanceColor&&(le=N.instanceColor)),Y===void 0||Y.attribute!==le||le&&Y.data!==le.data)return!0;x++}return s.attributesNum!==x||s.index!==O}function p(N,B,$,O){const H={},Q=B.attributes;let x=0;const R=$.getAttributes();for(const I in R)if(R[I].location>=0){let Y=Q[I];Y===void 0&&(I==="instanceMatrix"&&N.instanceMatrix&&(Y=N.instanceMatrix),I==="instanceColor"&&N.instanceColor&&(Y=N.instanceColor));const le={};le.attribute=Y,Y&&Y.data&&(le.data=Y.data),H[I]=le,x++}s.attributes=H,s.attributesNum=x,s.index=O}function b(){const N=s.newAttributes;for(let B=0,$=N.length;B<$;B++)N[B]=0}function m(N){g(N,0)}function g(N,B){const $=s.newAttributes,O=s.enabledAttributes,H=s.attributeDivisors;$[N]=1,O[N]===0&&(n.enableVertexAttribArray(N),O[N]=1),H[N]!==B&&(n.vertexAttribDivisor(N,B),H[N]=B)}function E(){const N=s.newAttributes,B=s.enabledAttributes;for(let $=0,O=B.length;$<O;$++)B[$]!==N[$]&&(n.disableVertexAttribArray($),B[$]=0)}function k(N,B,$,O,H,Q,x){x===!0?n.vertexAttribIPointer(N,B,$,H,Q):n.vertexAttribPointer(N,B,$,O,H,Q)}function y(N,B,$,O){b();const H=O.attributes,Q=$.getAttributes(),x=B.defaultAttributeValues;for(const R in Q){const I=Q[R];if(I.location>=0){let G=H[R];if(G===void 0&&(R==="instanceMatrix"&&N.instanceMatrix&&(G=N.instanceMatrix),R==="instanceColor"&&N.instanceColor&&(G=N.instanceColor)),G!==void 0){const Y=G.normalized,le=G.itemSize,xe=e.get(G);if(xe===void 0)continue;const We=xe.buffer,Ze=xe.type,tt=xe.bytesPerElement,j=Ze===n.INT||Ze===n.UNSIGNED_INT||G.gpuType===Lo;if(G.isInterleavedBufferAttribute){const ne=G.data,be=ne.stride,Ue=G.offset;if(ne.isInstancedInterleavedBuffer){for(let we=0;we<I.locationSize;we++)g(I.location+we,ne.meshPerAttribute);N.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let we=0;we<I.locationSize;we++)m(I.location+we);n.bindBuffer(n.ARRAY_BUFFER,We);for(let we=0;we<I.locationSize;we++)k(I.location+we,le/I.locationSize,Ze,Y,be*tt,(Ue+le/I.locationSize*we)*tt,j)}else{if(G.isInstancedBufferAttribute){for(let ne=0;ne<I.locationSize;ne++)g(I.location+ne,G.meshPerAttribute);N.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let ne=0;ne<I.locationSize;ne++)m(I.location+ne);n.bindBuffer(n.ARRAY_BUFFER,We);for(let ne=0;ne<I.locationSize;ne++)k(I.location+ne,le/I.locationSize,Ze,Y,le*tt,le/I.locationSize*ne*tt,j)}}else if(x!==void 0){const Y=x[R];if(Y!==void 0)switch(Y.length){case 2:n.vertexAttrib2fv(I.location,Y);break;case 3:n.vertexAttrib3fv(I.location,Y);break;case 4:n.vertexAttrib4fv(I.location,Y);break;default:n.vertexAttrib1fv(I.location,Y)}}}}E()}function M(){T();for(const N in i){const B=i[N];for(const $ in B){const O=B[$];for(const H in O){const Q=O[H];for(const x in Q)u(Q[x].object),delete Q[x];delete O[H]}}delete i[N]}}function w(N){if(i[N.id]===void 0)return;const B=i[N.id];for(const $ in B){const O=B[$];for(const H in O){const Q=O[H];for(const x in Q)u(Q[x].object),delete Q[x];delete O[H]}}delete i[N.id]}function C(N){for(const B in i){const $=i[B];for(const O in $){const H=$[O];if(H[N.id]===void 0)continue;const Q=H[N.id];for(const x in Q)u(Q[x].object),delete Q[x];delete H[N.id]}}}function _(N){for(const B in i){const $=i[B],O=N.isInstancedMesh===!0?N.id:0,H=$[O];if(H!==void 0){for(const Q in H){const x=H[Q];for(const R in x)u(x[R].object),delete x[R];delete H[Q]}delete $[O],Object.keys($).length===0&&delete i[B]}}}function T(){P(),a=!0,s!==r&&(s=r,c(s.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:T,resetDefaultState:P,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfObject:_,releaseStatesOfProgram:C,initAttributes:b,enableAttribute:m,disableUnusedAttributes:E}}function tg(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let d=0;d<u;d++)h+=c[d];t.update(h,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function ng(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==sn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const _=C===xn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Xt&&C!==mn&&!_&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Fe("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),k=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),M=n.getParameter(n.MAX_SAMPLES),w=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:p,maxTextureSize:b,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:E,maxVaryings:k,maxFragmentUniforms:y,maxSamples:M,samples:w}}function ig(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new fn,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||r;return r=h,i=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const p=f.clippingPlanes,b=f.clipIntersection,m=f.clipShadows,g=n.get(f);if(!r||p===null||p.length===0||s&&!m)s?u(null):c();else{const E=s?0:i,k=E*4;let y=g.clippingState||null;l.value=y,y=u(p,h,k,d);for(let M=0;M!==k;++M)y[M]=t[M];g.clippingState=y,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,d,p){const b=f!==null?f.length:0;let m=null;if(b!==0){if(m=l.value,p!==!0||m===null){const g=d+b*4,E=h.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<g)&&(m=new Float32Array(g));for(let k=0,y=d;k!==b;++k,y+=4)a.copy(f[k]).applyMatrix4(E,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}const Ri=4,rg=6,sg=20,ag=256,qi=new Cs,Yl=new Xe;let pa=null,ma=0,ga=0,va=!1;const og=new z,Jn=new z;class Zl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=og}=s;pa=this._renderer.getRenderTarget(),ma=this._renderer.getActiveCubeFace(),ga=this._renderer.getActiveMipmapLevel(),va=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ql(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Jl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(pa,ma,ga),this._renderer.xr.enabled=va,e.scissorTest=!1,wi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ii||e.mapping===Li?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),pa=this._renderer.getRenderTarget(),ma=this._renderer.getActiveCubeFace(),ga=this._renderer.getActiveMipmapLevel(),va=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Nt,minFilter:Nt,generateMipmaps:!1,type:xn,format:sn,colorSpace:ps,depthBuffer:!1},r=Kl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Kl(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=lg(s)),this._blurMaterial=ug(s,e,t),this._ggxMaterial=cg(s,e,t)}return r}_compileMaterial(e){const t=new jt(new At,e);this._renderer.compile(t,qi)}_sceneToCubeUV(e,t,i,r,s){const l=new Kt(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(Yl),f.toneMapping=vn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new jt(new si,new vs({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1})));const b=this._backgroundBox,m=b.material;let g=!1;const E=e.background;E?E.isColor&&(m.color.copy(E),e.background=null,g=!0):(m.color.copy(Yl),g=!0);for(let k=0;k<6;k++){const y=k%3;y===0?(l.up.set(0,c[k],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[k],s.y,s.z)):y===1?(l.up.set(0,0,c[k]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[k],s.z)):(l.up.set(0,c[k],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[k]));const M=this._cubeSize;wi(r,y*M,k>2?M:0,M,M),f.setRenderTarget(r),g&&f.render(b,l),f.render(e,l)}f.toneMapping=d,f.autoClear=h,e.background=E}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===ii||e.mapping===Li;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ql()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Jl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;wi(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,qi)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=c*1.25,d=f*h,{_lodMax:p}=this,b=this._sizeLods[i],m=3*b*(i>p-Ri?i-p+Ri:0),g=4*(this._cubeSize-b);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=p-t,wi(s,m,g,3*b,2*b),r.setRenderTarget(s),r.render(o,qi),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-i,wi(e,m,g,3*b,2*b),r.setRenderTarget(e),r.render(o,qi)}_blur(e,t,i,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,t,i,r,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;const u=this._sizeLods[r],f=3*u*(r>this._lodMax-Ri?r-this._lodMax+Ri:0),h=4*(this._cubeSize-u);wi(t,f,h,3*u,2*u),a.setRenderTarget(t),a.render(l,qi)}}function lg(n){const e=[],t=[];let i=n;const r=n-Ri+1+rg;for(let s=0;s<r;s++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,h=6,d=3,p=new Float32Array(d*h*f),b=new Float32Array(d*h*f);for(let g=0;g<f;g++){const E=g%3*2/3-1,k=g>2?0:-1,y=[E,k,0,E+2/3,k,0,E+2/3,k+1,0,E,k,0,E+2/3,k+1,0,E,k+1,0];p.set(y,d*h*g);for(let M=0;M<h;M++){const w=u[M*2]*2-1,C=u[M*2+1]*2-1;g===0?Jn.set(1,C,w):g===1?Jn.set(-w,1,-C):g===2?Jn.set(-w,C,1):g===3?Jn.set(-1,C,-w):g===4?Jn.set(-w,-1,C):Jn.set(w,C,-1),Jn.toArray(b,(g*h+M)*d)}}const m=new At;m.setAttribute("position",new Pn(p,d)),m.setAttribute("outputDirection",new Pn(b,d)),t.push(new jt(m,null)),i>Ri&&i--}return{lodMeshes:t,sizeLods:e}}function Kl(n,e,t){const i=new an(n,e,t);return i.texture.mapping=Ts,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function wi(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function cg(n,e,t){return new bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ag,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ps(),fragmentShader:`

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
		`,blending:kn,depthTest:!1,depthWrite:!1})}function ug(n,e,t){return new bn({name:"SphericalGaussianBlur",defines:{SAMPLES:sg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ps(),fragmentShader:`

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
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Jl(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ps(),fragmentShader:`

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
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Ql(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ps(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Ps(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class yu extends an{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new su(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new si(5,5,5),s=new bn({name:"CubemapFromEquirect",uniforms:zi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Vt,blending:kn});s.uniforms.tEquirect.value=t;const a=new jt(r,s),o=t.minFilter;return t.minFilter===ei&&(t.minFilter=Nt),new pf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function hg(n){let e=new WeakMap,t=new WeakMap,i=null;function r(h,d=!1){return h==null?null:d?a(h):s(h)}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===Ns||d===Us)if(e.has(h)){const p=e.get(h).texture;return o(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const b=new yu(p.height);return b.fromEquirectangularTexture(n,h),e.set(h,b),h.addEventListener("dispose",c),o(b.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const d=h.mapping,p=d===Ns||d===Us,b=d===ii||d===Li;if(p||b){let m=t.get(h);const g=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==g)return i===null&&(i=new Zl(n)),m=p?i.fromEquirectangular(h,m):i.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{const E=h.image;return p&&E&&E.height>0||b&&E&&l(E)?(i===null&&(i=new Zl(n)),m=p?i.fromEquirectangular(h):i.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,d){return d===Ns?h.mapping=ii:d===Us&&(h.mapping=Li),h}function l(h){let d=0;const p=6;for(let b=0;b<p;b++)h[b]!==void 0&&d++;return d===p}function c(h){const d=h.target;d.removeEventListener("dispose",c);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function u(h){const d=h.target;d.removeEventListener("dispose",u);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function dg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Ci("WebGLRenderer: "+i+" extension not supported."),r}}}function fg(n,e,t,i){const r={},s=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const p in h.attributes)e.remove(h.attributes[p]);h.removeEventListener("dispose",a),delete r[h.id];const d=s.get(h);d&&(e.remove(d),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const d in h)e.update(h[d],n.ARRAY_BUFFER)}function c(f){const h=[],d=f.index,p=f.attributes.position;let b=0;if(p===void 0)return;if(d!==null){const E=d.array;b=d.version;for(let k=0,y=E.length;k<y;k+=3){const M=E[k+0],w=E[k+1],C=E[k+2];h.push(M,w,w,C,C,M)}}else{const E=p.array;b=p.version;for(let k=0,y=E.length/3-1;k<y;k+=3){const M=k+0,w=k+1,C=k+2;h.push(M,w,w,C,C,M)}}const m=new(p.count>=65535?iu:nu)(h,1);m.version=b;const g=s.get(f);g&&e.remove(g),s.set(f,m)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function pg(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,h){n.drawElements(i,h,s,f*a),t.update(h,i,1)}function c(f,h,d){d!==0&&(n.drawElementsInstanced(i,h,s,f*a,d),t.update(h,i,d))}function u(f,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,f,0,d);let b=0;for(let m=0;m<d;m++)b+=h[m];t.update(b,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function mg(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:et("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function gg(n,e,t){const i=new WeakMap,r=new vt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==f){let P=function(){_.dispose(),i.delete(o),o.removeEventListener("dispose",P)};var d=P;h!==void 0&&h.texture.dispose();const p=o.morphAttributes.position!==void 0,b=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],k=o.morphAttributes.color||[];let y=0;p===!0&&(y=1),b===!0&&(y=2),m===!0&&(y=3);let M=o.attributes.position.count*y,w=1;M>e.maxTextureSize&&(w=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const C=new Float32Array(M*w*4*f),_=new eu(C,M,w,f);_.type=mn,_.needsUpdate=!0;const T=y*4;for(let N=0;N<f;N++){const B=g[N],$=E[N],O=k[N],H=M*w*4*N;for(let Q=0;Q<B.count;Q++){const x=Q*T;p===!0&&(r.fromBufferAttribute(B,Q),C[H+x+0]=r.x,C[H+x+1]=r.y,C[H+x+2]=r.z,C[H+x+3]=0),b===!0&&(r.fromBufferAttribute($,Q),C[H+x+4]=r.x,C[H+x+5]=r.y,C[H+x+6]=r.z,C[H+x+7]=0),m===!0&&(r.fromBufferAttribute(O,Q),C[H+x+8]=r.x,C[H+x+9]=r.y,C[H+x+10]=r.z,C[H+x+11]=O.itemSize===4?r.w:1)}}h={count:f,texture:_,size:new de(M,w)},i.set(o,h),o.addEventListener("dispose",P)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let m=0;m<c.length;m++)p+=c[m];const b=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",b),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function vg(n,e,t,i,r){let s=new WeakMap;function a(c){const u=r.render.frame,f=c.geometry,h=e.get(c,f);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return h}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const _g={[Fc]:"LINEAR_TONE_MAPPING",[Oc]:"REINHARD_TONE_MAPPING",[Bc]:"CINEON_TONE_MAPPING",[Vc]:"ACES_FILMIC_TONE_MAPPING",[Gc]:"AGX_TONE_MAPPING",[Wc]:"NEUTRAL_TONE_MAPPING",[Hc]:"CUSTOM_TONE_MAPPING"};function xg(n,e,t,i,r,s){const a=new an(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new At;c.setAttribute("position",new Lt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Lt([0,2,0,0,2,0],2));const u=new of({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new jt(c,u),h=new Cs(-1,1,1,-1,0,1);let d=null,p=null,b=!1,m,g=null,E=[],k=!1;this.setSize=function(y,M){a.setSize(y,M),o!==null&&o.setSize(y,M),l!==null&&l.setSize(y,M);for(let w=0;w<E.length;w++){const C=E[w];C.setSize&&C.setSize(y,M)}},this.setEffects=function(y){E=y,k=E.length>0&&E[0].isRenderPass===!0;const M=a.width,w=a.height;E.length>0&&o===null&&(o=new an(M,w,{type:xn,depthBuffer:!1,stencilBuffer:!1}),l=new an(M,w,{type:xn,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<E.length;C++){const _=E[C];_.setSize&&_.setSize(M,w)}},this.begin=function(y,M){if(b||y.toneMapping===vn&&E.length===0)return!1;if(g=M,M!==null){const w=M.width,C=M.height;(a.width!==w||a.height!==C)&&this.setSize(w,C)}return k===!1&&y.setRenderTarget(a),m=y.toneMapping,y.toneMapping=vn,!0},this.hasRenderPass=function(){return k},this.end=function(y,M){y.toneMapping=m,b=!0;let w=a,C=o;for(let _=0;_<E.length;_++){const T=E[_];T.enabled!==!1&&(T.render(y,C,w,M),T.needsSwap!==!1&&(w=C,C=C===o?l:o))}if(d!==y.outputColorSpace||p!==y.toneMapping){d=y.outputColorSpace,p=y.toneMapping,u.defines={},je.getTransfer(d)===lt&&(u.defines.SRGB_TRANSFER="");const _=_g[p];_&&(u.defines[_]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=w.texture,y.setRenderTarget(g),y.render(f,h),g=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const Mu=new Ot,Mo=new ur(1,1),wu=new eu,Eu=new ed,Au=new su,jl=[],ec=[],tc=new Float32Array(16),nc=new Float32Array(9),ic=new Float32Array(4);function Bi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=jl[r];if(s===void 0&&(s=new Float32Array(r),jl[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Tt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Rt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ls(n,e){let t=ec[e];t===void 0&&(t=new Int32Array(e),ec[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function bg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Sg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2fv(this.addr,e),Rt(t,e)}}function yg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Tt(t,e))return;n.uniform3fv(this.addr,e),Rt(t,e)}}function Mg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4fv(this.addr,e),Rt(t,e)}}function wg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(Tt(t,i))return;ic.set(i),n.uniformMatrix2fv(this.addr,!1,ic),Rt(t,i)}}function Eg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(Tt(t,i))return;nc.set(i),n.uniformMatrix3fv(this.addr,!1,nc),Rt(t,i)}}function Ag(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(Tt(t,i))return;tc.set(i),n.uniformMatrix4fv(this.addr,!1,tc),Rt(t,i)}}function Tg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Rg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2iv(this.addr,e),Rt(t,e)}}function kg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;n.uniform3iv(this.addr,e),Rt(t,e)}}function Cg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4iv(this.addr,e),Rt(t,e)}}function Pg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Lg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2uiv(this.addr,e),Rt(t,e)}}function Dg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;n.uniform3uiv(this.addr,e),Rt(t,e)}}function zg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4uiv(this.addr,e),Rt(t,e)}}function Ig(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Mo.compareFunction=t.isReversedDepthBuffer()?Oo:Fo,s=Mo):s=Mu,t.setTexture2D(e||s,r)}function Ng(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Eu,r)}function Ug(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Au,r)}function Fg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||wu,r)}function Og(n){switch(n){case 5126:return bg;case 35664:return Sg;case 35665:return yg;case 35666:return Mg;case 35674:return wg;case 35675:return Eg;case 35676:return Ag;case 5124:case 35670:return Tg;case 35667:case 35671:return Rg;case 35668:case 35672:return kg;case 35669:case 35673:return Cg;case 5125:return Pg;case 36294:return Lg;case 36295:return Dg;case 36296:return zg;case 35678:case 36198:case 36298:case 36306:case 35682:return Ig;case 35679:case 36299:case 36307:return Ng;case 35680:case 36300:case 36308:case 36293:return Ug;case 36289:case 36303:case 36311:case 36292:return Fg}}function Bg(n,e){n.uniform1fv(this.addr,e)}function Vg(n,e){const t=Bi(e,this.size,2);n.uniform2fv(this.addr,t)}function Hg(n,e){const t=Bi(e,this.size,3);n.uniform3fv(this.addr,t)}function Gg(n,e){const t=Bi(e,this.size,4);n.uniform4fv(this.addr,t)}function Wg(n,e){const t=Bi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Xg(n,e){const t=Bi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function $g(n,e){const t=Bi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function qg(n,e){n.uniform1iv(this.addr,e)}function Yg(n,e){n.uniform2iv(this.addr,e)}function Zg(n,e){n.uniform3iv(this.addr,e)}function Kg(n,e){n.uniform4iv(this.addr,e)}function Jg(n,e){n.uniform1uiv(this.addr,e)}function Qg(n,e){n.uniform2uiv(this.addr,e)}function jg(n,e){n.uniform3uiv(this.addr,e)}function e0(n,e){n.uniform4uiv(this.addr,e)}function t0(n,e,t){const i=this.cache,r=e.length,s=Ls(t,r);Tt(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=Mo:a=Mu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function n0(n,e,t){const i=this.cache,r=e.length,s=Ls(t,r);Tt(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Eu,s[a])}function i0(n,e,t){const i=this.cache,r=e.length,s=Ls(t,r);Tt(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Au,s[a])}function r0(n,e,t){const i=this.cache,r=e.length,s=Ls(t,r);Tt(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||wu,s[a])}function s0(n){switch(n){case 5126:return Bg;case 35664:return Vg;case 35665:return Hg;case 35666:return Gg;case 35674:return Wg;case 35675:return Xg;case 35676:return $g;case 5124:case 35670:return qg;case 35667:case 35671:return Yg;case 35668:case 35672:return Zg;case 35669:case 35673:return Kg;case 5125:return Jg;case 36294:return Qg;case 36295:return jg;case 36296:return e0;case 35678:case 36198:case 36298:case 36306:case 35682:return t0;case 35679:case 36299:case 36307:return n0;case 35680:case 36300:case 36308:case 36293:return i0;case 36289:case 36303:case 36311:case 36292:return r0}}class a0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Og(t.type)}}class o0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=s0(t.type)}}class l0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const _a=/(\w+)(\])?(\[|\.)?/g;function rc(n,e){n.seq.push(e),n.map[e.id]=e}function c0(n,e,t){const i=n.name,r=i.length;for(_a.lastIndex=0;;){const s=_a.exec(i),a=_a.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){rc(t,c===void 0?new a0(o,n,e):new o0(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new l0(o),rc(t,f)),t=f}}}class ss{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);c0(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function sc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const u0=37297;let h0=0;function d0(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const ac=new He;function f0(n){je._getMatrix(ac,je.workingColorSpace,n);const e=`mat3( ${ac.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(n)){case ms:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function oc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+d0(n.getShaderSource(e),o)}else return s}function p0(n,e){const t=f0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const m0={[Fc]:"Linear",[Oc]:"Reinhard",[Bc]:"Cineon",[Vc]:"ACESFilmic",[Gc]:"AgX",[Wc]:"Neutral",[Hc]:"Custom"};function g0(n,e){const t=m0[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Qr=new z;function v0(){je.getLuminanceCoefficients(Qr);const n=Qr.x.toFixed(4),e=Qr.y.toFixed(4),t=Qr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qi).join(`
`)}function x0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function b0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Qi(n){return n!==""}function lc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function cc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const S0=/^[ \t]*#include +<([\w\d./]+)>/gm;function wo(n){return n.replace(S0,M0)}const y0=new Map;function M0(n,e){let t=qe[e];if(t===void 0){const i=y0.get(e);if(i!==void 0)t=qe[i],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return wo(t)}const w0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function uc(n){return n.replace(w0,E0)}function E0(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function hc(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const A0={[jr]:"SHADOWMAP_TYPE_PCF",[Zi]:"SHADOWMAP_TYPE_VSM"};function T0(n){return A0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const R0={[ii]:"ENVMAP_TYPE_CUBE",[Li]:"ENVMAP_TYPE_CUBE",[Ts]:"ENVMAP_TYPE_CUBE_UV"};function k0(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":R0[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const C0={[Li]:"ENVMAP_MODE_REFRACTION"};function P0(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":C0[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const L0={[Po]:"ENVMAP_BLENDING_MULTIPLY",[Ph]:"ENVMAP_BLENDING_MIX",[Lh]:"ENVMAP_BLENDING_ADD"};function D0(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":L0[n.combine]||"ENVMAP_BLENDING_NONE"}function z0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function I0(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=T0(t),c=k0(t),u=P0(t),f=D0(t),h=z0(t),d=_0(t),p=x0(s),b=r.createProgram();let m,g,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Qi).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Qi).join(`
`),g.length>0&&(g+=`
`)):(m=[hc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qi).join(`
`),g=[hc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==vn?"#define TONE_MAPPING":"",t.toneMapping!==vn?qe.tonemapping_pars_fragment:"",t.toneMapping!==vn?g0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,p0("linearToOutputTexel",t.outputColorSpace),v0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qi).join(`
`)),a=wo(a),a=lc(a,t),a=cc(a,t),o=wo(o),o=lc(o,t),o=cc(o,t),a=uc(a),o=uc(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===ul?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ul?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const k=E+m+a,y=E+g+o,M=sc(r,r.VERTEX_SHADER,k),w=sc(r,r.FRAGMENT_SHADER,y);r.attachShader(b,M),r.attachShader(b,w),t.index0AttributeName!==void 0?r.bindAttribLocation(b,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(b,0,"position"),r.linkProgram(b);function C(N){if(n.debug.checkShaderErrors){const B=r.getProgramInfoLog(b)||"",$=r.getShaderInfoLog(M)||"",O=r.getShaderInfoLog(w)||"",H=B.trim(),Q=$.trim(),x=O.trim();let R=!0,I=!0;if(r.getProgramParameter(b,r.LINK_STATUS)===!1)if(R=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,b,M,w);else{const G=oc(r,M,"vertex"),Y=oc(r,w,"fragment");et("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(b,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+H+`
`+G+`
`+Y)}else H!==""?Fe("WebGLProgram: Program Info Log:",H):(Q===""||x==="")&&(I=!1);I&&(N.diagnostics={runnable:R,programLog:H,vertexShader:{log:Q,prefix:m},fragmentShader:{log:x,prefix:g}})}r.deleteShader(M),r.deleteShader(w),_=new ss(r,b),T=b0(r,b)}let _;this.getUniforms=function(){return _===void 0&&C(this),_};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(b,u0)),P},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=h0++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=M,this.fragmentShader=w,this}let N0=0;class U0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new F0(e),t.set(e,i)),i}}class F0{constructor(e){this.id=N0++,this.code=e,this.usedTimes=0}}function O0(n){return n===ri||n===ds||n===fs}function B0(n,e,t,i,r,s){const a=new Vo,o=new U0,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return l.add(_),_===0?"uv":`uv${_}`}function b(_,T,P,N,B,$){const O=N.fog,H=B.geometry,Q=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?N.environment:null,x=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,R=e.get(_.envMap||Q,x),I=R&&R.mapping===Ts?R.image.height:null,G=d[_.type];_.precision!==null&&(h=i.getMaxPrecision(_.precision),h!==_.precision&&Fe("WebGLProgram.getParameters:",_.precision,"not supported, using",h,"instead."));const Y=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,le=Y!==void 0?Y.length:0;let xe=0;H.morphAttributes.position!==void 0&&(xe=1),H.morphAttributes.normal!==void 0&&(xe=2),H.morphAttributes.color!==void 0&&(xe=3);let We,Ze,tt,j;if(G){const pt=pn[G];We=pt.vertexShader,Ze=pt.fragmentShader}else{We=_.vertexShader,Ze=_.fragmentShader;const pt=o.getVertexShaderStage(_),st=o.getFragmentShaderStage(_);o.update(_,pt,st),tt=pt.id,j=st.id}const ne=n.getRenderTarget(),be=n.state.buffers.depth.getReversed(),Ue=B.isInstancedMesh===!0,we=B.isBatchedMesh===!0,Oe=!!_.map,ot=!!_.matcap,ie=!!R,se=!!_.aoMap,ae=!!_.lightMap,oe=!!_.bumpMap&&_.wireframe===!1,he=!!_.normalMap,Ie=!!_.displacementMap,ze=!!_.emissiveMap,Be=!!_.metalnessMap,Ve=!!_.roughnessMap,D=_.anisotropy>0,rt=_.clearcoat>0,Ke=_.dispersion>0,A=_.retroreflectivity>0,v=_.iridescence>0,V=_.sheen>0,q=_.transmission>0,K=D&&!!_.anisotropyMap,ce=rt&&!!_.clearcoatMap,ue=rt&&!!_.clearcoatNormalMap,J=rt&&!!_.clearcoatRoughnessMap,te=v&&!!_.iridescenceMap,fe=v&&!!_.iridescenceThicknessMap,Pe=V&&!!_.sheenColorMap,ve=V&&!!_.sheenRoughnessMap,pe=!!_.specularMap,Le=!!_.specularColorMap,Ne=!!_.specularIntensityMap,Ge=q&&!!_.transmissionMap,F=q&&!!_.thicknessMap,me=!!_.gradientMap,ee=!!_.alphaMap,ge=_.alphaTest>0,Me=!!_.alphaHash,re=!!_.extensions;let De=vn;_.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(De=n.toneMapping);const ke={shaderID:G,shaderType:_.type,shaderName:_.name,vertexShader:We,fragmentShader:Ze,defines:_.defines,customVertexShaderID:tt,customFragmentShaderID:j,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:h,batching:we,batchingColor:we&&B._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&B.instanceColor!==null,instancingMorph:Ue&&B.morphTexture!==null,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:je.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Oe,matcap:ot,envMap:ie,envMapMode:ie&&R.mapping,envMapCubeUVHeight:I,aoMap:se,lightMap:ae,bumpMap:oe,normalMap:he,displacementMap:Ie,emissiveMap:ze,normalMapObjectSpace:he&&_.normalMapType===Ih,normalMapTangentSpace:he&&_.normalMapType===go,packedNormalMap:he&&_.normalMapType===go&&O0(_.normalMap.format),metalnessMap:Be,roughnessMap:Ve,anisotropy:D,anisotropyMap:K,clearcoat:rt,clearcoatMap:ce,clearcoatNormalMap:ue,clearcoatRoughnessMap:J,dispersion:Ke,retroreflection:A,iridescence:v,iridescenceMap:te,iridescenceThicknessMap:fe,sheen:V,sheenColorMap:Pe,sheenRoughnessMap:ve,specularMap:pe,specularColorMap:Le,specularIntensityMap:Ne,transmission:q,transmissionMap:Ge,thicknessMap:F,gradientMap:me,opaque:_.transparent===!1&&_.blending===er&&_.alphaToCoverage===!1,alphaMap:ee,alphaTest:ge,alphaHash:Me,combine:_.combine,mapUv:Oe&&p(_.map.channel),aoMapUv:se&&p(_.aoMap.channel),lightMapUv:ae&&p(_.lightMap.channel),bumpMapUv:oe&&p(_.bumpMap.channel),normalMapUv:he&&p(_.normalMap.channel),displacementMapUv:Ie&&p(_.displacementMap.channel),emissiveMapUv:ze&&p(_.emissiveMap.channel),metalnessMapUv:Be&&p(_.metalnessMap.channel),roughnessMapUv:Ve&&p(_.roughnessMap.channel),anisotropyMapUv:K&&p(_.anisotropyMap.channel),clearcoatMapUv:ce&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:ue&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:ve&&p(_.sheenRoughnessMap.channel),specularMapUv:pe&&p(_.specularMap.channel),specularColorMapUv:Le&&p(_.specularColorMap.channel),specularIntensityMapUv:Ne&&p(_.specularIntensityMap.channel),transmissionMapUv:Ge&&p(_.transmissionMap.channel),thicknessMapUv:F&&p(_.thicknessMap.channel),alphaMapUv:ee&&p(_.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(he||D),vertexNormals:!!H.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!H.attributes.uv&&(Oe||ee),fog:!!O,useFog:_.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||H.attributes.normal===void 0&&he===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:be,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:xe,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:$.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:De,decodeVideoTexture:Oe&&_.map.isVideoTexture===!0&&je.getTransfer(_.map.colorSpace)===lt,decodeVideoTextureEmissive:ze&&_.emissiveMap.isVideoTexture===!0&&je.getTransfer(_.emissiveMap.colorSpace)===lt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Jt,flipSided:_.side===Vt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:re&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&_.extensions.multiDraw===!0||we)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return ke.vertexUv1s=l.has(1),ke.vertexUv2s=l.has(2),ke.vertexUv3s=l.has(3),l.clear(),ke}function m(_){const T=[];if(_.shaderID?T.push(_.shaderID):(T.push(_.customVertexShaderID),T.push(_.customFragmentShaderID)),_.defines!==void 0)for(const P in _.defines)T.push(P),T.push(_.defines[P]);return _.isRawShaderMaterial===!1&&(g(T,_),E(T,_),T.push(n.outputColorSpace)),T.push(_.customProgramCacheKey),T.join()}function g(_,T){_.push(T.precision),_.push(T.outputColorSpace),_.push(T.envMapMode),_.push(T.envMapCubeUVHeight),_.push(T.mapUv),_.push(T.alphaMapUv),_.push(T.lightMapUv),_.push(T.aoMapUv),_.push(T.bumpMapUv),_.push(T.normalMapUv),_.push(T.displacementMapUv),_.push(T.emissiveMapUv),_.push(T.metalnessMapUv),_.push(T.roughnessMapUv),_.push(T.anisotropyMapUv),_.push(T.clearcoatMapUv),_.push(T.clearcoatNormalMapUv),_.push(T.clearcoatRoughnessMapUv),_.push(T.iridescenceMapUv),_.push(T.iridescenceThicknessMapUv),_.push(T.sheenColorMapUv),_.push(T.sheenRoughnessMapUv),_.push(T.specularMapUv),_.push(T.specularColorMapUv),_.push(T.specularIntensityMapUv),_.push(T.transmissionMapUv),_.push(T.thicknessMapUv),_.push(T.combine),_.push(T.fogExp2),_.push(T.sizeAttenuation),_.push(T.morphTargetsCount),_.push(T.morphAttributeCount),_.push(T.numSunLights),_.push(T.numDirLights),_.push(T.numPointLights),_.push(T.numSpotLights),_.push(T.numSpotLightMaps),_.push(T.numHemiLights),_.push(T.numRectAreaLights),_.push(T.numSunLightShadows),_.push(T.numDirLightShadows),_.push(T.numPointLightShadows),_.push(T.numSpotLightShadows),_.push(T.numSpotLightShadowsWithMaps),_.push(T.numLightProbes),_.push(T.shadowMapType),_.push(T.toneMapping),_.push(T.numClippingPlanes),_.push(T.numClipIntersection),_.push(T.depthPacking)}function E(_,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function k(_){const T=d[_.type];let P;if(T){const N=pn[T];P=rf.clone(N.uniforms)}else P=_.uniforms;return P}function y(_,T){let P=u.get(T);return P!==void 0?++P.usedTimes:(P=new I0(n,T,_,r),c.push(P),u.set(T,P)),P}function M(_){if(--_.usedTimes===0){const T=c.indexOf(_);c[T]=c[c.length-1],c.pop(),u.delete(_.cacheKey),_.destroy()}}function w(_){o.remove(_)}function C(){o.dispose()}return{getParameters:b,getProgramCacheKey:m,getUniforms:k,acquireProgram:y,releaseProgram:M,releaseShaderCache:w,programs:c,dispose:C}}function V0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function H0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function dc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function fc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function o(h,d,p,b,m,g){let E=n[e];return E===void 0?(E={id:h.id,object:h,geometry:d,material:p,materialVariant:a(h),groupOrder:b,renderOrder:h.renderOrder,z:m,group:g},n[e]=E):(E.id=h.id,E.object=h,E.geometry=d,E.material=p,E.materialVariant=a(h),E.groupOrder=b,E.renderOrder=h.renderOrder,E.z=m,E.group=g),e++,E}function l(h,d,p,b,m,g,E){E.reversedDepth===!0&&(m=-m);const k=o(h,d,p,b,m,g);p.transmission>0?i.push(k):p.transparent===!0?r.push(k):t.push(k)}function c(h,d,p,b,m,g){const E=o(h,d,p,b,m,g);p.transmission>0?i.unshift(E):p.transparent===!0?r.unshift(E):t.unshift(E)}function u(h,d){t.length>1&&t.sort(h||H0),i.length>1&&i.sort(d||dc),r.length>1&&r.sort(d||dc)}function f(){for(let h=e,d=n.length;h<d;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:f,sort:u}}function G0(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new fc,n.set(i,[a])):r>=s.length?(a=new fc,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function W0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new z,color:new Xe};break;case"SpotLight":t={position:new z,direction:new z,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new z,halfWidth:new z,halfHeight:new z};break}return n[e.id]=t,t}}}function X0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let $0=0;function q0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Y0(n){const e=new W0,t=X0(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new z);const r=new z,s=new ft,a=new ft;function o(c){let u=0,f=0,h=0;for(let B=0;B<9;B++)i.probe[B].set(0,0,0);let d=0,p=0,b=0,m=0,g=0,E=0,k=0,y=0,M=0,w=0,C=0,_=0,T=0,P=0;c.sort(q0);for(let B=0,$=c.length;B<$;B++){const O=c[B],H=O.color,Q=O.intensity,x=O.distance;let R=null;if(O.shadow&&O.shadow.map&&(O.shadow.map.texture.format===ri?R=O.shadow.map.texture:R=O.shadow.map.depthTexture||O.shadow.map.texture),O.isAmbientLight)u+=H.r*Q,f+=H.g*Q,h+=H.b*Q;else if(O.isLightProbe){for(let I=0;I<9;I++)i.probe[I].addScaledVector(O.sh.coefficients[I],Q);P++}else if(O.isSunLight){const I=e.get(O);if(I.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const G=O.shadow,Y=t.get(O);Y.shadowIntensity=G.intensity,Y.shadowBias=G.bias,Y.shadowNormalBias=G.normalBias,Y.shadowRadius=G.radius,Y.shadowMapSize.copy(G.mapSize).multiply(G.getFrameExtents()),i.sunShadow[p]=Y,i.sunShadowMap[p]=R;const le=G.getViewportCount();for(let xe=0;xe<le;xe++)i.sunShadowMatrix[b+xe]=G.getMatrix(xe),i.sunShadowCascade[b+xe]=G._cascadeData[xe];b+=le,p++}i.sun[d]=I,d++}else if(O.isDirectionalLight){const I=e.get(O);if(I.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const G=O.shadow,Y=t.get(O);Y.shadowIntensity=G.intensity,Y.shadowBias=G.bias,Y.shadowNormalBias=G.normalBias,Y.shadowRadius=G.radius,Y.shadowMapSize=G.mapSize,i.directionalShadow[m]=Y,i.directionalShadowMap[m]=R,i.directionalShadowMatrix[m]=O.shadow.matrix,M++}i.directional[m]=I,m++}else if(O.isSpotLight){const I=e.get(O);I.position.setFromMatrixPosition(O.matrixWorld),I.color.copy(H).multiplyScalar(Q),I.distance=x,I.coneCos=Math.cos(O.angle),I.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),I.decay=O.decay,i.spot[E]=I;const G=O.shadow;if(O.map&&(i.spotLightMap[_]=O.map,_++,G.updateMatrices(O),O.castShadow&&T++),i.spotLightMatrix[E]=G.matrix,O.castShadow){const Y=t.get(O);Y.shadowIntensity=G.intensity,Y.shadowBias=G.bias,Y.shadowNormalBias=G.normalBias,Y.shadowRadius=G.radius,Y.shadowMapSize=G.mapSize,i.spotShadow[E]=Y,i.spotShadowMap[E]=R,C++}E++}else if(O.isRectAreaLight){const I=e.get(O);I.color.copy(H).multiplyScalar(Q),I.halfWidth.set(O.width*.5,0,0),I.halfHeight.set(0,O.height*.5,0),i.rectArea[k]=I,k++}else if(O.isPointLight){const I=e.get(O);if(I.color.copy(O.color).multiplyScalar(O.intensity),I.distance=O.distance,I.decay=O.decay,O.castShadow){const G=O.shadow,Y=t.get(O);Y.shadowIntensity=G.intensity,Y.shadowBias=G.bias,Y.shadowNormalBias=G.normalBias,Y.shadowRadius=G.radius,Y.shadowMapSize=G.mapSize,Y.shadowCameraNear=G.camera.near,Y.shadowCameraFar=G.camera.far,i.pointShadow[g]=Y,i.pointShadowMap[g]=R,i.pointShadowMatrix[g]=O.shadow.matrix,w++}i.point[g]=I,g++}else if(O.isHemisphereLight){const I=e.get(O);I.skyColor.copy(O.color).multiplyScalar(Q),I.groundColor.copy(O.groundColor).multiplyScalar(Q),i.hemi[y]=I,y++}}k>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_e.LTC_FLOAT_1,i.rectAreaLTC2=_e.LTC_FLOAT_2):(i.rectAreaLTC1=_e.LTC_HALF_1,i.rectAreaLTC2=_e.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const N=i.hash;(N.sunLength!==d||N.directionalLength!==m||N.pointLength!==g||N.spotLength!==E||N.rectAreaLength!==k||N.hemiLength!==y||N.numSunShadows!==p||N.numDirectionalShadows!==M||N.numPointShadows!==w||N.numSpotShadows!==C||N.numSpotMaps!==_||N.numLightProbes!==P)&&(i.sun.length=d,i.directional.length=m,i.spot.length=E,i.rectArea.length=k,i.point.length=g,i.hemi.length=y,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=b,i.sunShadowCascade.length=b,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.directionalShadowMatrix.length=M,i.pointShadow.length=w,i.pointShadowMap.length=w,i.pointShadowMatrix.length=w,i.spotShadow.length=C,i.spotShadowMap.length=C,i.spotLightMatrix.length=C+_-T,i.spotLightMap.length=_,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=P,N.sunLength=d,N.directionalLength=m,N.pointLength=g,N.spotLength=E,N.rectAreaLength=k,N.hemiLength=y,N.numSunShadows=p,N.numDirectionalShadows=M,N.numPointShadows=w,N.numSpotShadows=C,N.numSpotMaps=_,N.numLightProbes=P,i.version=$0++)}function l(c,u){let f=0,h=0,d=0,p=0,b=0,m=0;const g=u.matrixWorldInverse;for(let E=0,k=c.length;E<k;E++){const y=c[E];if(y.isSunLight){const M=i.sun[f];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(g),f++}else if(y.isDirectionalLight){const M=i.directional[h];M.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(g),h++}else if(y.isSpotLight){const M=i.spot[p];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(g),p++}else if(y.isRectAreaLight){const M=i.rectArea[b];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(g),a.identity(),s.copy(y.matrixWorld),s.premultiply(g),a.extractRotation(s),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),b++}else if(y.isPointLight){const M=i.point[d];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(g),d++}else if(y.isHemisphereLight){const M=i.hemi[m];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(g),m++}}}return{setup:o,setupView:l,state:i}}function pc(n){const e=new Y0(n),t=[],i=[],r=[];function s(h){f.camera=h,t.length=0,i.length=0,r.length=0}function a(h){t.push(h)}function o(h){i.push(h)}function l(h){r.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Z0(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new pc(n),e.set(r,[o])):s>=a.length?(o=new pc(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const K0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,J0=`uniform sampler2D shadow_pass;
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
}`,Q0=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],j0=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],mc=new ft,Yi=new z,xa=new z;function ev(n,e,t){let i=new Ho;const r=new de,s=new de,a=new vt,o=new cf,l=new uf,c={},u=t.maxTextureSize,f={[Wn]:Vt,[Vt]:Wn,[Jt]:Jt},h=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:K0,fragmentShader:J0}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const p=new At;p.setAttribute("position",new Pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new jt(p,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=jr;let g=this.type;this.render=function(w,C,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===dh&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=jr);const T=n.getRenderTarget(),P=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),B=n.state;B.setBlending(kn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const $=g!==this.type;$&&C.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(H=>H.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,H=w.length;O<H;O++){const Q=w[O],x=Q.shadow;if(x===void 0){Fe("WebGLShadowMap:",Q,"has no shadow.");continue}if(x.autoUpdate===!1&&x.needsUpdate===!1)continue;r.copy(x.mapSize);const R=x.getFrameExtents();r.multiply(R),s.copy(x.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/R.x),r.x=s.x*R.x,x.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/R.y),r.y=s.y*R.y,x.mapSize.y=s.y));const I=n.state.buffers.depth.getReversed();if(x.camera._reversedDepth=I,x.map===null||$===!0){if(x.map!==null&&(x.map.depthTexture!==null&&(x.map.depthTexture.dispose(),x.map.depthTexture=null),x.map.dispose()),this.type===Zi){if(Q.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}x.map=new an(r.x,r.y,{format:ri,type:xn,minFilter:Nt,magFilter:Nt,generateMipmaps:!1}),x.map.texture.name=Q.name+".shadowMap",x.map.depthTexture=new ur(r.x,r.y,mn),x.map.depthTexture.name=Q.name+".shadowMapDepth",x.map.depthTexture.format=Ln,x.map.depthTexture.compareFunction=null,x.map.depthTexture.minFilter=Pt,x.map.depthTexture.magFilter=Pt}else Q.isPointLight?(x.map=new yu(r.x),x.map.depthTexture=new Sd(r.x,_n)):(x.map=new an(r.x,r.y),x.map.depthTexture=new ur(r.x,r.y,_n)),x.map.depthTexture.name=Q.name+".shadowMap",x.map.depthTexture.format=Ln,this.type===jr?(x.map.depthTexture.compareFunction=I?Oo:Fo,x.map.depthTexture.minFilter=Nt,x.map.depthTexture.magFilter=Nt):(x.map.depthTexture.compareFunction=null,x.map.depthTexture.minFilter=Pt,x.map.depthTexture.magFilter=Pt);x.camera.updateProjectionMatrix()}x.map.isWebGLCubeRenderTarget!==!0&&(x.map.width!==r.x||x.map.height!==r.y)&&x.map.setSize(r.x,r.y);const G=x.map.isWebGLCubeRenderTarget?6:x.getViewportCount();Q.isPointLight!==!0&&x.updateMatrices(Q,_);for(let Y=0;Y<G;Y++){const le=x.getCamera(Y);if(Q.isPointLight){const xe=x.camera,We=x.matrix,Ze=Q.distance||xe.far;Ze!==xe.far&&(xe.far=Ze,xe.updateProjectionMatrix()),Yi.setFromMatrixPosition(Q.matrixWorld),xe.position.copy(Yi),xa.copy(xe.position),xa.add(Q0[Y]),xe.up.copy(j0[Y]),xe.lookAt(xa),xe.updateMatrixWorld(),We.makeTranslation(-Yi.x,-Yi.y,-Yi.z),mc.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),x._frustum.setFromProjectionMatrix(mc,xe.coordinateSystem,xe.reversedDepth)}if(x.map.isWebGLCubeRenderTarget)n.setRenderTarget(x.map,Y),n.clear();else{Y===0&&(n.setRenderTarget(x.map),n.clear());const xe=x.getViewport(Y);a.set(s.x*xe.x,s.y*xe.y,s.x*xe.z,s.y*xe.w),B.viewport(a)}i=x.getFrustum(Y),y(C,_,le,Q,this.type)}x.isPointLightShadow!==!0&&this.type===Zi&&E(x,_),x.needsUpdate=!1}g=this.type,m.needsUpdate=!1,n.setRenderTarget(T,P,N)};function E(w,C){const _=e.update(b);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null?w.mapPass=new an(r.x,r.y,{format:ri,type:xn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),h.uniforms.shadow_pass.value=w.map.depthTexture,h.uniforms.resolution.value.set(w.map.width,w.map.height),h.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(C,null,_,h,b,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value.set(w.map.width,w.map.height),d.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(C,null,_,d,b,null)}function k(w,C,_,T){let P=null;const N=_.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(N!==void 0)P=N;else if(P=_.isPointLight===!0?l:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const B=P.uuid,$=C.uuid;let O=c[B];O===void 0&&(O={},c[B]=O);let H=O[$];H===void 0&&(H=P.clone(),O[$]=H,C.addEventListener("dispose",M)),P=H}if(P.visible=C.visible,P.wireframe=C.wireframe,T===Zi?P.side=C.shadowSide!==null?C.shadowSide:C.side:P.side=C.shadowSide!==null?C.shadowSide:f[C.side],P.alphaMap=C.alphaMap,P.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,P.map=C.map,P.clipShadows=C.clipShadows,P.clippingPlanes=C.clippingPlanes,P.clipIntersection=C.clipIntersection,P.displacementMap=C.displacementMap,P.displacementScale=C.displacementScale,P.displacementBias=C.displacementBias,P.wireframeLinewidth=C.wireframeLinewidth,P.linewidth=C.linewidth,_.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const B=n.properties.get(P);B.light=_}return P}function y(w,C,_,T,P){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&P===Zi)&&(!w.frustumCulled||w.intersectsFrustum(i))){w.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,w.matrixWorld);const $=e.update(w),O=w.material;if(Array.isArray(O)){const H=$.groups;for(let Q=0,x=H.length;Q<x;Q++){const R=H[Q],I=O[R.materialIndex];if(I&&I.visible){const G=k(w,I,T,P);w.onBeforeShadow(n,w,C,_,$,G,R),n.renderBufferDirect(_,null,$,G,w,R),w.onAfterShadow(n,w,C,_,$,G,R)}}}else if(O.visible){const H=k(w,O,T,P);w.onBeforeShadow(n,w,C,_,$,H,null),n.renderBufferDirect(_,null,$,H,w,null),w.onAfterShadow(n,w,C,_,$,H,null)}}const B=w.children;for(let $=0,O=B.length;$<O;$++)y(B[$],C,_,T,P)}function M(w){w.target.removeEventListener("dispose",M);for(const _ in c){const T=c[_],P=w.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function tv(n,e){function t(){let F=!1;const me=new vt;let ee=null;const ge=new vt(0,0,0,0);return{setMask:function(Me){ee!==Me&&!F&&(n.colorMask(Me,Me,Me,Me),ee=Me)},setLocked:function(Me){F=Me},setClear:function(Me,re,De,ke,pt){pt===!0&&(Me*=ke,re*=ke,De*=ke),me.set(Me,re,De,ke),ge.equals(me)===!1&&(n.clearColor(Me,re,De,ke),ge.copy(me))},reset:function(){F=!1,ee=null,ge.set(-1,0,0,0)}}}function i(){let F=!1,me=!1,ee=null,ge=null,Me=null;return{setReversed:function(re){if(me!==re){const De=e.get("EXT_clip_control");re?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),me=re;const ke=Me;Me=null,this.setClear(ke)}},getReversed:function(){return me},setTest:function(re){re?ne(n.DEPTH_TEST):be(n.DEPTH_TEST)},setMask:function(re){ee!==re&&!F&&(n.depthMask(re),ee=re)},setFunc:function(re){if(me&&(re=qh[re]),ge!==re){switch(re){case Ca:n.depthFunc(n.NEVER);break;case Pa:n.depthFunc(n.ALWAYS);break;case La:n.depthFunc(n.LESS);break;case ar:n.depthFunc(n.LEQUAL);break;case Da:n.depthFunc(n.EQUAL);break;case za:n.depthFunc(n.GEQUAL);break;case Ia:n.depthFunc(n.GREATER);break;case Na:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ge=re}},setLocked:function(re){F=re},setClear:function(re){Me!==re&&(Me=re,me&&(re=1-re),n.clearDepth(re))},reset:function(){F=!1,ee=null,ge=null,Me=null,me=!1}}}function r(){let F=!1,me=null,ee=null,ge=null,Me=null,re=null,De=null,ke=null,pt=null;return{setTest:function(st){F||(st?ne(n.STENCIL_TEST):be(n.STENCIL_TEST))},setMask:function(st){me!==st&&!F&&(n.stencilMask(st),me=st)},setFunc:function(st,en,on){(ee!==st||ge!==en||Me!==on)&&(n.stencilFunc(st,en,on),ee=st,ge=en,Me=on)},setOp:function(st,en,on){(re!==st||De!==en||ke!==on)&&(n.stencilOp(st,en,on),re=st,De=en,ke=on)},setLocked:function(st){F=st},setClear:function(st){pt!==st&&(n.clearStencil(st),pt=st)},reset:function(){F=!1,me=null,ee=null,ge=null,Me=null,re=null,De=null,ke=null,pt=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},f={},h={},d=new WeakMap,p=[],b=null,m=!1,g=null,E=null,k=null,y=null,M=null,w=null,C=null,_=new Xe(0,0,0),T=0,P=!1,N=null,B=null,$=null,O=null,H=null;const Q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let x=!1,R=0;const I=n.getParameter(n.VERSION);I.indexOf("WebGL")!==-1?(R=parseFloat(/^WebGL (\d)/.exec(I)[1]),x=R>=1):I.indexOf("OpenGL ES")!==-1&&(R=parseFloat(/^OpenGL ES (\d)/.exec(I)[1]),x=R>=2);let G=null,Y={};const le=n.getParameter(n.SCISSOR_BOX),xe=n.getParameter(n.VIEWPORT),We=new vt().fromArray(le),Ze=new vt().fromArray(xe);function tt(F,me,ee,ge){const Me=new Uint8Array(4),re=n.createTexture();n.bindTexture(F,re),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let De=0;De<ee;De++)F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?n.texImage3D(me,0,n.RGBA,1,1,ge,0,n.RGBA,n.UNSIGNED_BYTE,Me):n.texImage2D(me+De,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Me);return re}const j={};j[n.TEXTURE_2D]=tt(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=tt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=tt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=tt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(n.DEPTH_TEST),a.setFunc(ar),oe(!1),he(al),ne(n.CULL_FACE),se(kn);function ne(F){u[F]!==!0&&(n.enable(F),u[F]=!0)}function be(F){u[F]!==!1&&(n.disable(F),u[F]=!1)}function Ue(F,me){return h[F]!==me?(n.bindFramebuffer(F,me),h[F]=me,F===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=me),F===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=me),!0):!1}function we(F,me){let ee=p,ge=!1;if(F){ee=d.get(me),ee===void 0&&(ee=[],d.set(me,ee));const Me=F.textures;if(ee.length!==Me.length||ee[0]!==n.COLOR_ATTACHMENT0){for(let re=0,De=Me.length;re<De;re++)ee[re]=n.COLOR_ATTACHMENT0+re;ee.length=Me.length,ge=!0}}else ee[0]!==n.BACK&&(ee[0]=n.BACK,ge=!0);ge&&n.drawBuffers(ee)}function Oe(F){return b!==F?(n.useProgram(F),b=F,!0):!1}const ot={[Ei]:n.FUNC_ADD,[ph]:n.FUNC_SUBTRACT,[mh]:n.FUNC_REVERSE_SUBTRACT};ot[gh]=n.MIN,ot[vh]=n.MAX;const ie={[_h]:n.ZERO,[xh]:n.ONE,[bh]:n.SRC_COLOR,[Nc]:n.SRC_ALPHA,[Ah]:n.SRC_ALPHA_SATURATE,[wh]:n.DST_COLOR,[yh]:n.DST_ALPHA,[Sh]:n.ONE_MINUS_SRC_COLOR,[Uc]:n.ONE_MINUS_SRC_ALPHA,[Eh]:n.ONE_MINUS_DST_COLOR,[Mh]:n.ONE_MINUS_DST_ALPHA,[Th]:n.CONSTANT_COLOR,[Rh]:n.ONE_MINUS_CONSTANT_COLOR,[kh]:n.CONSTANT_ALPHA,[Ch]:n.ONE_MINUS_CONSTANT_ALPHA};function se(F,me,ee,ge,Me,re,De,ke,pt,st){if(F===kn){m===!0&&(be(n.BLEND),m=!1);return}if(m===!1&&(ne(n.BLEND),m=!0),F!==fh){if(F!==g||st!==P){if((E!==Ei||M!==Ei)&&(n.blendEquation(n.FUNC_ADD),E=Ei,M=Ei),st)switch(F){case er:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ol:n.blendFunc(n.ONE,n.ONE);break;case ll:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case cl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:et("WebGLState: Invalid blending: ",F);break}else switch(F){case er:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ol:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ll:et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case cl:et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:et("WebGLState: Invalid blending: ",F);break}k=null,y=null,w=null,C=null,_.set(0,0,0),T=0,g=F,P=st}return}Me=Me||me,re=re||ee,De=De||ge,(me!==E||Me!==M)&&(n.blendEquationSeparate(ot[me],ot[Me]),E=me,M=Me),(ee!==k||ge!==y||re!==w||De!==C)&&(n.blendFuncSeparate(ie[ee],ie[ge],ie[re],ie[De]),k=ee,y=ge,w=re,C=De),(ke.equals(_)===!1||pt!==T)&&(n.blendColor(ke.r,ke.g,ke.b,pt),_.copy(ke),T=pt),g=F,P=!1}function ae(F,me){F.side===Jt?be(n.CULL_FACE):ne(n.CULL_FACE);let ee=F.side===Vt;me&&(ee=!ee),oe(ee),F.blending===er&&F.transparent===!1?se(kn):se(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),s.setMask(F.colorWrite);const ge=F.stencilWrite;o.setTest(ge),ge&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),ze(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):be(n.SAMPLE_ALPHA_TO_COVERAGE)}function oe(F){N!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),N=F)}function he(F){F!==uh?(ne(n.CULL_FACE),F!==B&&(F===al?n.cullFace(n.BACK):F===hh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):be(n.CULL_FACE),B=F}function Ie(F){F!==$&&(x&&n.lineWidth(F),$=F)}function ze(F,me,ee){F?(ne(n.POLYGON_OFFSET_FILL),(O!==me||H!==ee)&&(O=me,H=ee,a.getReversed()&&(me=-me),n.polygonOffset(me,ee))):be(n.POLYGON_OFFSET_FILL)}function Be(F){F?ne(n.SCISSOR_TEST):be(n.SCISSOR_TEST)}function Ve(F){F===void 0&&(F=n.TEXTURE0+Q-1),G!==F&&(n.activeTexture(F),G=F)}function D(F,me,ee){ee===void 0&&(G===null?ee=n.TEXTURE0+Q-1:ee=G);let ge=Y[ee];ge===void 0&&(ge={type:void 0,texture:void 0},Y[ee]=ge),(ge.type!==F||ge.texture!==me)&&(G!==ee&&(n.activeTexture(ee),G=ee),n.bindTexture(F,me||j[F]),ge.type=F,ge.texture=me)}function rt(){const F=Y[G];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function Ke(){try{n.compressedTexImage2D(...arguments)}catch(F){et("WebGLState:",F)}}function A(){try{n.compressedTexImage3D(...arguments)}catch(F){et("WebGLState:",F)}}function v(){try{n.texSubImage2D(...arguments)}catch(F){et("WebGLState:",F)}}function V(){try{n.texSubImage3D(...arguments)}catch(F){et("WebGLState:",F)}}function q(){try{n.compressedTexSubImage2D(...arguments)}catch(F){et("WebGLState:",F)}}function K(){try{n.compressedTexSubImage3D(...arguments)}catch(F){et("WebGLState:",F)}}function ce(){try{n.texStorage2D(...arguments)}catch(F){et("WebGLState:",F)}}function ue(){try{n.texStorage3D(...arguments)}catch(F){et("WebGLState:",F)}}function J(){try{n.texImage2D(...arguments)}catch(F){et("WebGLState:",F)}}function te(){try{n.texImage3D(...arguments)}catch(F){et("WebGLState:",F)}}function fe(F){return f[F]!==void 0?f[F]:n.getParameter(F)}function Pe(F,me){f[F]!==me&&(n.pixelStorei(F,me),f[F]=me)}function ve(F){We.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),We.copy(F))}function pe(F){Ze.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),Ze.copy(F))}function Le(F,me){let ee=c.get(me);ee===void 0&&(ee=new WeakMap,c.set(me,ee));let ge=ee.get(F);ge===void 0&&(ge=n.getUniformBlockIndex(me,F.name),ee.set(F,ge))}function Ne(F,me){const ge=c.get(me).get(F);l.get(me)!==ge&&(n.uniformBlockBinding(me,ge,F.__bindingPointIndex),l.set(me,ge))}function Ge(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},G=null,Y={},h={},d=new WeakMap,p=[],b=null,m=!1,g=null,E=null,k=null,y=null,M=null,w=null,C=null,_=new Xe(0,0,0),T=0,P=!1,N=null,B=null,$=null,O=null,H=null,We.set(0,0,n.canvas.width,n.canvas.height),Ze.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ne,disable:be,bindFramebuffer:Ue,drawBuffers:we,useProgram:Oe,setBlending:se,setMaterial:ae,setFlipSided:oe,setCullFace:he,setLineWidth:Ie,setPolygonOffset:ze,setScissorTest:Be,activeTexture:Ve,bindTexture:D,unbindTexture:rt,compressedTexImage2D:Ke,compressedTexImage3D:A,texImage2D:J,texImage3D:te,pixelStorei:Pe,getParameter:fe,updateUBOMapping:Le,uniformBlockBinding:Ne,texStorage2D:ce,texStorage3D:ue,texSubImage2D:v,texSubImage3D:V,compressedTexSubImage2D:q,compressedTexSubImage3D:K,scissor:ve,viewport:pe,reset:Ge}}function nv(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new de,u=new WeakMap,f=new Set;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(A,v){return p?new OffscreenCanvas(A,v):gs("canvas")}function m(A,v,V){let q=1;const K=Ke(A);if((K.width>V||K.height>V)&&(q=V/Math.max(K.width,K.height)),q<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const ce=Math.floor(q*K.width),ue=Math.floor(q*K.height);h===void 0&&(h=b(ce,ue));const J=v?b(ce,ue):h;return J.width=ce,J.height=ue,J.getContext("2d").drawImage(A,0,0,ce,ue),Fe("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+ce+"x"+ue+")."),J}else return"data"in A&&Fe("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),A;return A}function g(A){return A.generateMipmaps}function E(A){n.generateMipmap(A)}function k(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(A,v,V,q,K,ce=!1){if(A!==null){if(n[A]!==void 0)return n[A];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ue;q&&(ue=e.get("EXT_texture_norm16"),ue||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=v;if(v===n.RED&&(V===n.FLOAT&&(J=n.R32F),V===n.HALF_FLOAT&&(J=n.R16F),V===n.UNSIGNED_BYTE&&(J=n.R8),V===n.UNSIGNED_SHORT&&ue&&(J=ue.R16_EXT),V===n.SHORT&&ue&&(J=ue.R16_SNORM_EXT)),v===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(J=n.R8UI),V===n.UNSIGNED_SHORT&&(J=n.R16UI),V===n.UNSIGNED_INT&&(J=n.R32UI),V===n.BYTE&&(J=n.R8I),V===n.SHORT&&(J=n.R16I),V===n.INT&&(J=n.R32I)),v===n.RG&&(V===n.FLOAT&&(J=n.RG32F),V===n.HALF_FLOAT&&(J=n.RG16F),V===n.UNSIGNED_BYTE&&(J=n.RG8),V===n.UNSIGNED_SHORT&&ue&&(J=ue.RG16_EXT),V===n.SHORT&&ue&&(J=ue.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(J=n.RG8UI),V===n.UNSIGNED_SHORT&&(J=n.RG16UI),V===n.UNSIGNED_INT&&(J=n.RG32UI),V===n.BYTE&&(J=n.RG8I),V===n.SHORT&&(J=n.RG16I),V===n.INT&&(J=n.RG32I)),v===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(J=n.RGB8UI),V===n.UNSIGNED_SHORT&&(J=n.RGB16UI),V===n.UNSIGNED_INT&&(J=n.RGB32UI),V===n.BYTE&&(J=n.RGB8I),V===n.SHORT&&(J=n.RGB16I),V===n.INT&&(J=n.RGB32I)),v===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(J=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(J=n.RGBA16UI),V===n.UNSIGNED_INT&&(J=n.RGBA32UI),V===n.BYTE&&(J=n.RGBA8I),V===n.SHORT&&(J=n.RGBA16I),V===n.INT&&(J=n.RGBA32I)),v===n.RGB&&(V===n.UNSIGNED_SHORT&&ue&&(J=ue.RGB16_EXT),V===n.SHORT&&ue&&(J=ue.RGB16_SNORM_EXT),V===n.UNSIGNED_INT_5_9_9_9_REV&&(J=n.RGB9_E5),V===n.UNSIGNED_INT_10F_11F_11F_REV&&(J=n.R11F_G11F_B10F)),v===n.RGBA){const te=ce?ms:je.getTransfer(K);V===n.FLOAT&&(J=n.RGBA32F),V===n.HALF_FLOAT&&(J=n.RGBA16F),V===n.UNSIGNED_BYTE&&(J=te===lt?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT&&ue&&(J=ue.RGBA16_EXT),V===n.SHORT&&ue&&(J=ue.RGBA16_SNORM_EXT),V===n.UNSIGNED_SHORT_4_4_4_4&&(J=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(J=n.RGB5_A1)}return(J===n.R16F||J===n.R32F||J===n.RG16F||J===n.RG32F||J===n.RGBA16F||J===n.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function M(A,v){let V;return A?v===null||v===_n||v===lr?V=n.DEPTH24_STENCIL8:v===mn?V=n.DEPTH32F_STENCIL8:v===or&&(V=n.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===_n||v===lr?V=n.DEPTH_COMPONENT24:v===mn?V=n.DEPTH_COMPONENT32F:v===or&&(V=n.DEPTH_COMPONENT16),V}function w(A,v){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==Pt&&A.minFilter!==Nt?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function C(A){const v=A.target;v.removeEventListener("dispose",C),T(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&f.delete(v)}function _(A){const v=A.target;v.removeEventListener("dispose",_),N(v)}function T(A){const v=i.get(A);if(v.__webglInit===void 0)return;const V=A.source,q=d.get(V);if(q){const K=q[v.__cacheKey];K.usedTimes--,K.usedTimes===0&&P(A),Object.keys(q).length===0&&d.delete(V)}i.remove(A)}function P(A){const v=i.get(A);n.deleteTexture(v.__webglTexture);const V=A.source,q=d.get(V);delete q[v.__cacheKey],a.memory.textures--}function N(A){const v=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let K=0;K<v.__webglFramebuffer[q].length;K++)n.deleteFramebuffer(v.__webglFramebuffer[q][K]);else n.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)n.deleteFramebuffer(v.__webglFramebuffer[q]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const V=A.textures;for(let q=0,K=V.length;q<K;q++){const ce=i.get(V[q]);ce.__webglTexture&&(n.deleteTexture(ce.__webglTexture),a.memory.textures--),i.remove(V[q])}i.remove(A)}let B=0;function $(){B=0}function O(){return B}function H(A){B=A}function Q(){const A=B;return A>=r.maxTextures&&Fe("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+r.maxTextures),B+=1,A}function x(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function R(A,v){const V=i.get(A);if(A.isVideoTexture&&D(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&V.__version!==A.version){const q=A.image;if(q===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{be(V,A,v);return}}else A.isExternalTexture&&(V.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+v)}function I(A,v){const V=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){be(V,A,v);return}else A.isExternalTexture&&(V.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+v)}function G(A,v){const V=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){be(V,A,v);return}t.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+v)}function Y(A,v){const V=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&V.__version!==A.version){Ue(V,A,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+v)}const le={[Ua]:n.REPEAT,[Rn]:n.CLAMP_TO_EDGE,[Fa]:n.MIRRORED_REPEAT},xe={[Pt]:n.NEAREST,[Dh]:n.NEAREST_MIPMAP_NEAREST,[yr]:n.NEAREST_MIPMAP_LINEAR,[Nt]:n.LINEAR,[Fs]:n.LINEAR_MIPMAP_NEAREST,[ei]:n.LINEAR_MIPMAP_LINEAR},We={[Uh]:n.NEVER,[Hh]:n.ALWAYS,[Fh]:n.LESS,[Fo]:n.LEQUAL,[Oh]:n.EQUAL,[Oo]:n.GEQUAL,[Bh]:n.GREATER,[Vh]:n.NOTEQUAL};function Ze(A,v){if(v.type===mn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Nt||v.magFilter===Fs||v.magFilter===yr||v.magFilter===ei||v.minFilter===Nt||v.minFilter===Fs||v.minFilter===yr||v.minFilter===ei)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,le[v.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,le[v.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,le[v.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,xe[v.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,xe[v.minFilter]),v.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,We[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Pt||v.minFilter!==yr&&v.minFilter!==ei||v.type===mn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function tt(A,v){let V=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",C));const q=v.source;let K=d.get(q);K===void 0&&(K={},d.set(q,K));const ce=x(v);if(ce!==A.__cacheKey){K[ce]===void 0&&(K[ce]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,V=!0),K[ce].usedTimes++;const ue=K[A.__cacheKey];ue!==void 0&&(K[A.__cacheKey].usedTimes--,ue.usedTimes===0&&P(v)),A.__cacheKey=ce,A.__webglTexture=K[ce].texture}return V}function j(A,v,V){return Math.floor(Math.floor(A/V)/v)}function ne(A,v,V,q){const ce=A.updateRanges;if(ce.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,V,q,v.data);else{ce.sort((Pe,ve)=>Pe.start-ve.start);let ue=0;for(let Pe=1;Pe<ce.length;Pe++){const ve=ce[ue],pe=ce[Pe],Le=ve.start+ve.count,Ne=j(pe.start,v.width,4),Ge=j(ve.start,v.width,4);pe.start<=Le+1&&Ne===Ge&&j(pe.start+pe.count-1,v.width,4)===Ne?ve.count=Math.max(ve.count,pe.start+pe.count-ve.start):(++ue,ce[ue]=pe)}ce.length=ue+1;const J=t.getParameter(n.UNPACK_ROW_LENGTH),te=t.getParameter(n.UNPACK_SKIP_PIXELS),fe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let Pe=0,ve=ce.length;Pe<ve;Pe++){const pe=ce[Pe],Le=Math.floor(pe.start/4),Ne=Math.ceil(pe.count/4),Ge=Le%v.width,F=Math.floor(Le/v.width),me=Ne,ee=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ge),t.pixelStorei(n.UNPACK_SKIP_ROWS,F),t.texSubImage2D(n.TEXTURE_2D,0,Ge,F,me,ee,V,q,v.data)}A.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,J),t.pixelStorei(n.UNPACK_SKIP_PIXELS,te),t.pixelStorei(n.UNPACK_SKIP_ROWS,fe)}}function be(A,v,V){let q=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=n.TEXTURE_3D);const K=tt(A,v),ce=v.source;t.bindTexture(q,A.__webglTexture,n.TEXTURE0+V);const ue=i.get(ce);if(ce.version!==ue.__version||K===!0){if(t.activeTexture(n.TEXTURE0+V),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const ee=je.getPrimaries(je.workingColorSpace),ge=v.colorSpace===Vn?null:je.getPrimaries(v.colorSpace),Me=v.colorSpace===Vn||ee===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let te=m(v.image,!1,r.maxTextureSize);te=rt(v,te);const fe=s.convert(v.format,v.colorSpace),Pe=s.convert(v.type);let ve=y(v.internalFormat,fe,Pe,v.normalized,v.colorSpace,v.isVideoTexture);Ze(q,v);let pe;const Le=v.mipmaps,Ne=v.isVideoTexture!==!0,Ge=ue.__version===void 0||K===!0,F=ce.dataReady,me=w(v,te);if(v.isDepthTexture)ve=M(v.format===ti,v.type),Ge&&(Ne?t.texStorage2D(n.TEXTURE_2D,1,ve,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,ve,te.width,te.height,0,fe,Pe,null));else if(v.isDataTexture)if(Le.length>0){Ne&&Ge&&t.texStorage2D(n.TEXTURE_2D,me,ve,Le[0].width,Le[0].height);for(let ee=0,ge=Le.length;ee<ge;ee++)pe=Le[ee],Ne?F&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,pe.width,pe.height,fe,Pe,pe.data):t.texImage2D(n.TEXTURE_2D,ee,ve,pe.width,pe.height,0,fe,Pe,pe.data);v.generateMipmaps=!1}else Ne?(Ge&&t.texStorage2D(n.TEXTURE_2D,me,ve,te.width,te.height),F&&ne(v,te,fe,Pe)):t.texImage2D(n.TEXTURE_2D,0,ve,te.width,te.height,0,fe,Pe,te.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ne&&Ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,ve,Le[0].width,Le[0].height,te.depth);for(let ee=0,ge=Le.length;ee<ge;ee++)if(pe=Le[ee],v.format!==sn)if(fe!==null)if(Ne){if(F)if(v.layerUpdates.size>0){const Me=ql(pe.width,pe.height,v.format,v.type);for(const re of v.layerUpdates){const De=pe.data.subarray(re*Me/pe.data.BYTES_PER_ELEMENT,(re+1)*Me/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,re,pe.width,pe.height,1,fe,De)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,pe.width,pe.height,te.depth,fe,pe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,ve,pe.width,pe.height,te.depth,0,pe.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?F&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,pe.width,pe.height,te.depth,fe,Pe,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,ve,pe.width,pe.height,te.depth,0,fe,Pe,pe.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{Ne&&Ge&&t.texStorage2D(n.TEXTURE_2D,me,ve,Le[0].width,Le[0].height);for(let ee=0,ge=Le.length;ee<ge;ee++)pe=Le[ee],v.format!==sn?fe!==null?Ne?F&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,pe.width,pe.height,fe,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,ve,pe.width,pe.height,0,pe.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?F&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,pe.width,pe.height,fe,Pe,pe.data):t.texImage2D(n.TEXTURE_2D,ee,ve,pe.width,pe.height,0,fe,Pe,pe.data)}else if(v.isDataArrayTexture)if(Ne){if(Ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,ve,te.width,te.height,te.depth),F)if(v.layerUpdates.size>0){const ee=ql(te.width,te.height,v.format,v.type);for(const ge of v.layerUpdates){const Me=te.data.subarray(ge*ee/te.data.BYTES_PER_ELEMENT,(ge+1)*ee/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ge,te.width,te.height,1,fe,Pe,Me)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,fe,Pe,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ve,te.width,te.height,te.depth,0,fe,Pe,te.data);else if(v.isData3DTexture)Ne?(Ge&&t.texStorage3D(n.TEXTURE_3D,me,ve,te.width,te.height,te.depth),F&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,fe,Pe,te.data)):t.texImage3D(n.TEXTURE_3D,0,ve,te.width,te.height,te.depth,0,fe,Pe,te.data);else if(v.isFramebufferTexture){if(Ge)if(Ne)t.texStorage2D(n.TEXTURE_2D,me,ve,te.width,te.height);else{let ee=te.width,ge=te.height;for(let Me=0;Me<me;Me++)t.texImage2D(n.TEXTURE_2D,Me,ve,ee,ge,0,fe,Pe,null),ee>>=1,ge>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const ee=n.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),te.parentNode!==ee){ee.appendChild(te),f.add(v),ee.onpaint=ge=>{const Me=ge.changedElements;for(const re of f)Me.includes(re.image)&&(re.needsUpdate=!0)},ee.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,te);else{const Me=n.RGBA,re=n.RGBA,De=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Me,re,De,te)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Le.length>0){if(Ne&&Ge){const ee=Ke(Le[0]);t.texStorage2D(n.TEXTURE_2D,me,ve,ee.width,ee.height)}for(let ee=0,ge=Le.length;ee<ge;ee++)pe=Le[ee],Ne?F&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,fe,Pe,pe):t.texImage2D(n.TEXTURE_2D,ee,ve,fe,Pe,pe);v.generateMipmaps=!1}else if(Ne){if(Ge){const ee=Ke(te);t.texStorage2D(n.TEXTURE_2D,me,ve,ee.width,ee.height)}F&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe,Pe,te)}else t.texImage2D(n.TEXTURE_2D,0,ve,fe,Pe,te);g(v)&&E(q),ue.__version=ce.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function Ue(A,v,V){if(v.image.length!==6)return;const q=tt(A,v),K=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+V);const ce=i.get(K);if(K.version!==ce.__version||q===!0){t.activeTexture(n.TEXTURE0+V);const ue=je.getPrimaries(je.workingColorSpace),J=v.colorSpace===Vn?null:je.getPrimaries(v.colorSpace),te=v.colorSpace===Vn||ue===J?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const fe=v.isCompressedTexture||v.image[0].isCompressedTexture,Pe=v.image[0]&&v.image[0].isDataTexture,ve=[];for(let re=0;re<6;re++)!fe&&!Pe?ve[re]=m(v.image[re],!0,r.maxCubemapSize):ve[re]=Pe?v.image[re].image:v.image[re],ve[re]=rt(v,ve[re]);const pe=ve[0],Le=s.convert(v.format,v.colorSpace),Ne=s.convert(v.type),Ge=y(v.internalFormat,Le,Ne,v.normalized,v.colorSpace),F=v.isVideoTexture!==!0,me=ce.__version===void 0||q===!0,ee=K.dataReady;let ge=w(v,pe);Ze(n.TEXTURE_CUBE_MAP,v);let Me;if(fe){F&&me&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,Ge,pe.width,pe.height);for(let re=0;re<6;re++){Me=ve[re].mipmaps;for(let De=0;De<Me.length;De++){const ke=Me[De];v.format!==sn?Le!==null?F?ee&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De,0,0,ke.width,ke.height,Le,ke.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De,Ge,ke.width,ke.height,0,ke.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De,0,0,ke.width,ke.height,Le,Ne,ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De,Ge,ke.width,ke.height,0,Le,Ne,ke.data)}}}else{if(Me=v.mipmaps,F&&me){Me.length>0&&ge++;const re=Ke(ve[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,Ge,re.width,re.height)}for(let re=0;re<6;re++)if(Pe){F?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,ve[re].width,ve[re].height,Le,Ne,ve[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ge,ve[re].width,ve[re].height,0,Le,Ne,ve[re].data);for(let De=0;De<Me.length;De++){const pt=Me[De].image[re].image;F?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De+1,0,0,pt.width,pt.height,Le,Ne,pt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De+1,Ge,pt.width,pt.height,0,Le,Ne,pt.data)}}else{F?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Le,Ne,ve[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ge,Le,Ne,ve[re]);for(let De=0;De<Me.length;De++){const ke=Me[De];F?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De+1,0,0,Le,Ne,ke.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De+1,Ge,Le,Ne,ke.image[re])}}}g(v)&&E(n.TEXTURE_CUBE_MAP),ce.__version=K.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function we(A,v,V,q,K,ce){const ue=s.convert(V.format,V.colorSpace),J=s.convert(V.type),te=y(V.internalFormat,ue,J,V.normalized,V.colorSpace),fe=i.get(v),Pe=i.get(V);if(Pe.__renderTarget=v,!fe.__hasExternalTextures){const ve=Math.max(1,v.width>>ce),pe=Math.max(1,v.height>>ce);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?t.texImage3D(K,ce,te,ve,pe,v.depth,0,ue,J,null):t.texImage2D(K,ce,te,ve,pe,0,ue,J,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),Ve(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,K,Pe.__webglTexture,0,Be(v)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,K,Pe.__webglTexture,ce),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Oe(A,v,V){if(n.bindRenderbuffer(n.RENDERBUFFER,A),v.depthBuffer){const q=v.depthTexture,K=q&&q.isDepthTexture?q.type:null,ce=M(v.stencilBuffer,K),ue=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ve(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Be(v),ce,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,Be(v),ce,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ce,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ue,n.RENDERBUFFER,A)}else{const q=v.textures;for(let K=0;K<q.length;K++){const ce=q[K],ue=s.convert(ce.format,ce.colorSpace),J=s.convert(ce.type),te=y(ce.internalFormat,ue,J,ce.normalized,ce.colorSpace);Ve(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Be(v),te,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,Be(v),te,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,te,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ot(A,v,V){const q=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const K=i.get(v.depthTexture);if(K.__renderTarget=v,(!K.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),q){if(K.__webglInit===void 0&&(K.__webglInit=!0,v.depthTexture.addEventListener("dispose",C)),K.__webglTexture===void 0){K.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),Ze(n.TEXTURE_CUBE_MAP,v.depthTexture);const fe=s.convert(v.depthTexture.format),Pe=s.convert(v.depthTexture.type);let ve;v.depthTexture.format===Ln?ve=n.DEPTH_COMPONENT24:v.depthTexture.format===ti&&(ve=n.DEPTH24_STENCIL8);for(let pe=0;pe<6;pe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,ve,v.width,v.height,0,fe,Pe,null)}}else R(v.depthTexture,0);const ce=K.__webglTexture,ue=Be(v),J=q?n.TEXTURE_CUBE_MAP_POSITIVE_X+V:n.TEXTURE_2D,te=v.depthTexture.format===ti?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===Ln)Ve(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,J,ce,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,te,J,ce,0);else if(v.depthTexture.format===ti)Ve(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,J,ce,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,te,J,ce,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ie(A){const v=i.get(A),V=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const q=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){const K=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",K)};q.addEventListener("dispose",K),v.__depthDisposeCallback=K}v.__boundDepthTexture=q}if(A.depthTexture&&!v.__autoAllocateDepthBuffer)if(V)for(let q=0;q<6;q++)ot(v.__webglFramebuffer[q],A,q);else{const q=A.texture.mipmaps;q&&q.length>0?ot(v.__webglFramebuffer[0],A,0):ot(v.__webglFramebuffer,A,0)}else if(V){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=n.createRenderbuffer(),Oe(v.__webglDepthbuffer[q],A,!1);else{const K=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=v.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,ce)}}else{const q=A.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Oe(v.__webglDepthbuffer,A,!1);else{const K=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,ce)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function se(A,v,V){const q=i.get(A);v!==void 0&&we(q.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&ie(A)}function ae(A){const v=A.texture,V=i.get(A),q=i.get(v);A.addEventListener("dispose",_);const K=A.textures,ce=A.isWebGLCubeRenderTarget===!0,ue=K.length>1;if(ue||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=v.version,a.memory.textures++),ce){V.__webglFramebuffer=[];for(let J=0;J<6;J++)if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer[J]=[];for(let te=0;te<v.mipmaps.length;te++)V.__webglFramebuffer[J][te]=n.createFramebuffer()}else V.__webglFramebuffer[J]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer=[];for(let J=0;J<v.mipmaps.length;J++)V.__webglFramebuffer[J]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(ue)for(let J=0,te=K.length;J<te;J++){const fe=i.get(K[J]);fe.__webglTexture===void 0&&(fe.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&Ve(A)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let J=0;J<K.length;J++){const te=K[J];V.__webglColorRenderbuffer[J]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[J]);const fe=s.convert(te.format,te.colorSpace),Pe=s.convert(te.type),ve=y(te.internalFormat,fe,Pe,te.normalized,te.colorSpace,A.isXRRenderTarget===!0),pe=Be(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,pe,ve,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+J,n.RENDERBUFFER,V.__webglColorRenderbuffer[J])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),Oe(V.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ce){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),Ze(n.TEXTURE_CUBE_MAP,v);for(let J=0;J<6;J++)if(v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)we(V.__webglFramebuffer[J][te],A,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,te);else we(V.__webglFramebuffer[J],A,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);g(v)&&E(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let J=0,te=K.length;J<te;J++){const fe=K[J],Pe=i.get(fe);let ve=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ve=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ve,Pe.__webglTexture),Ze(ve,fe),we(V.__webglFramebuffer,A,fe,n.COLOR_ATTACHMENT0+J,ve,0),g(fe)&&E(ve)}t.unbindTexture()}else{let J=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(J=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(J,q.__webglTexture),Ze(J,v),v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)we(V.__webglFramebuffer[te],A,v,n.COLOR_ATTACHMENT0,J,te);else we(V.__webglFramebuffer,A,v,n.COLOR_ATTACHMENT0,J,0);g(v)&&E(J),t.unbindTexture()}A.depthBuffer&&ie(A)}function oe(A){const v=A.textures;for(let V=0,q=v.length;V<q;V++){const K=v[V];if(g(K)){const ce=k(A),ue=i.get(K).__webglTexture;t.bindTexture(ce,ue),E(ce),t.unbindTexture()}}}const he=[],Ie=[];function ze(A){if(A.samples>0){if(Ve(A)===!1){const v=A.textures,V=A.width,q=A.height;let K=n.COLOR_BUFFER_BIT;const ce=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=i.get(A),J=v.length>1;if(J)for(let fe=0;fe<v.length;fe++)t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const te=A.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let fe=0;fe<v.length;fe++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),J){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ue.__webglColorRenderbuffer[fe]);const Pe=i.get(v[fe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Pe,0)}n.blitFramebuffer(0,0,V,q,0,0,V,q,K,n.NEAREST),l===!0&&(he.length=0,Ie.length=0,he.push(n.COLOR_ATTACHMENT0+fe),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(he.push(ce),Ie.push(ce),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ie)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,he))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),J)for(let fe=0;fe<v.length;fe++){t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,ue.__webglColorRenderbuffer[fe]);const Pe=i.get(v[fe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,Pe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){const v=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function Be(A){return Math.min(r.maxSamples,A.samples)}function Ve(A){const v=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function D(A){const v=a.render.frame;u.get(A)!==v&&(u.set(A,v),A.update())}function rt(A,v){const V=A.colorSpace,q=A.format,K=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||V!==ps&&V!==Vn&&(je.getTransfer(V)===lt?(q!==sn||K!==Xt)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):et("WebGLTextures: Unsupported texture color space:",V)),v}function Ke(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=Q,this.resetTextureUnits=$,this.getTextureUnits=O,this.setTextureUnits=H,this.setTexture2D=R,this.setTexture2DArray=I,this.setTexture3D=G,this.setTextureCube=Y,this.rebindTextures=se,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=oe,this.updateMultisampleRenderTarget=ze,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=we,this.useMultisampledRTT=Ve,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function iv(n,e){function t(i,r=Vn){let s;const a=je.getTransfer(r);if(i===Xt)return n.UNSIGNED_BYTE;if(i===Do)return n.UNSIGNED_SHORT_4_4_4_4;if(i===zo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Yc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Zc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===$c)return n.BYTE;if(i===qc)return n.SHORT;if(i===or)return n.UNSIGNED_SHORT;if(i===Lo)return n.INT;if(i===_n)return n.UNSIGNED_INT;if(i===mn)return n.FLOAT;if(i===xn)return n.HALF_FLOAT;if(i===Kc)return n.ALPHA;if(i===Jc)return n.RGB;if(i===sn)return n.RGBA;if(i===Ln)return n.DEPTH_COMPONENT;if(i===ti)return n.DEPTH_STENCIL;if(i===Qc)return n.RED;if(i===Io)return n.RED_INTEGER;if(i===ri)return n.RG;if(i===No)return n.RG_INTEGER;if(i===Uo)return n.RGBA_INTEGER;if(i===es||i===ts||i===ns||i===is)if(a===lt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===es)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ts)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ns)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===is)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===es)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ts)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ns)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===is)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Oa||i===Ba||i===Va||i===Ha)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Oa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ba)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Va)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ha)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ga||i===Wa||i===Xa||i===$a||i===qa||i===ds||i===Ya)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ga||i===Wa)return a===lt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Xa)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===$a)return s.COMPRESSED_R11_EAC;if(i===qa)return s.COMPRESSED_SIGNED_R11_EAC;if(i===ds)return s.COMPRESSED_RG11_EAC;if(i===Ya)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Za||i===Ka||i===Ja||i===Qa||i===ja||i===eo||i===to||i===no||i===io||i===ro||i===so||i===ao||i===oo||i===lo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Za)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ka)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ja)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Qa)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ja)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===eo)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===to)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===no)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===io)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ro)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===so)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ao)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===oo)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===lo)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===co||i===uo||i===ho)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===co)return a===lt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===uo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ho)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===fo||i===po||i===fs||i===mo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===fo)return s.COMPRESSED_RED_RGTC1_EXT;if(i===po)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===fs)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===mo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===lr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const rv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sv=`
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

}`;class av{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new au(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new bn({vertexShader:rv,fragmentShader:sv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new jt(new ks(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ov extends oi{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,p=null;const b=typeof XRWebGLBinding<"u",m=new av,g={},E=t.getContextAttributes();let k=null,y=null;const M=[],w=[],C=new de;let _=null,T=null;const P=new Kt;P.viewport=new vt;const N=new Kt;N.viewport=new vt;const B=[P,N],$=new mf;let O=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ne=M[j];return ne===void 0&&(ne=new $s,M[j]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(j){let ne=M[j];return ne===void 0&&(ne=new $s,M[j]=ne),ne.getGripSpace()},this.getHand=function(j){let ne=M[j];return ne===void 0&&(ne=new $s,M[j]=ne),ne.getHandSpace()};function Q(j){const ne=w.indexOf(j.inputSource);if(ne===-1)return;const be=M[ne];be!==void 0&&(be.update(j.inputSource,j.frame,c||a),be.dispatchEvent({type:j.type,data:j.inputSource}))}function x(){r.removeEventListener("select",Q),r.removeEventListener("selectstart",Q),r.removeEventListener("selectend",Q),r.removeEventListener("squeeze",Q),r.removeEventListener("squeezestart",Q),r.removeEventListener("squeezeend",Q),r.removeEventListener("end",x),r.removeEventListener("inputsourceschange",R);for(let j=0;j<M.length;j++){const ne=w[j];ne!==null&&(w[j]=null,M[j].disconnect(ne))}O=null,H=null,m.reset();for(const j in g)delete g[j];if(e.setRenderTarget(k),d=null,h=null,f=null,r=null,y=null,tt.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(C.width,C.height,!1),T!==null){const j=T.camera;j.fov=T.fov,j.zoom=T.zoom,j.updateProjectionMatrix(),T=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&b&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(k=e.getRenderTarget(),r.addEventListener("select",Q),r.addEventListener("selectstart",Q),r.addEventListener("selectend",Q),r.addEventListener("squeeze",Q),r.addEventListener("squeezestart",Q),r.addEventListener("squeezeend",Q),r.addEventListener("end",x),r.addEventListener("inputsourceschange",R),E.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(C),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let be=null,Ue=null,we=null;E.depth&&(we=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,be=E.stencil?ti:Ln,Ue=E.stencil?lr:_n);const Oe={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(Oe),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new an(h.textureWidth,h.textureHeight,{format:sn,type:Xt,depthTexture:new ur(h.textureWidth,h.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,be),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const be={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,be),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new an(d.framebufferWidth,d.framebufferHeight,{format:sn,type:Xt,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),tt.setContext(r),tt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function R(j){for(let ne=0;ne<j.removed.length;ne++){const be=j.removed[ne],Ue=w.indexOf(be);Ue>=0&&(w[Ue]=null,M[Ue].disconnect(be))}for(let ne=0;ne<j.added.length;ne++){const be=j.added[ne];let Ue=w.indexOf(be);if(Ue===-1){for(let Oe=0;Oe<M.length;Oe++)if(Oe>=w.length){w.push(be),Ue=Oe;break}else if(w[Oe]===null){w[Oe]=be,Ue=Oe;break}if(Ue===-1)break}const we=M[Ue];we&&we.connect(be)}}const I=new z,G=new z;function Y(j,ne,be){I.setFromMatrixPosition(ne.matrixWorld),G.setFromMatrixPosition(be.matrixWorld);const Ue=I.distanceTo(G),we=ne.projectionMatrix.elements,Oe=be.projectionMatrix.elements,ot=we[14]/(we[10]-1),ie=we[14]/(we[10]+1),se=(we[9]+1)/we[5],ae=(we[9]-1)/we[5],oe=(we[8]-1)/we[0],he=(Oe[8]+1)/Oe[0],Ie=ot*oe,ze=ot*he,Be=Ue/(-oe+he),Ve=Be*-oe;if(ne.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Ve),j.translateZ(Be),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),we[10]===-1)j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const D=ot+Be,rt=ie+Be,Ke=Ie-Ve,A=ze+(Ue-Ve),v=se*ie/rt*D,V=ae*ie/rt*D;j.projectionMatrix.makePerspective(Ke,A,v,V,D,rt),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function le(j,ne){ne===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ne.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let ne=j.near,be=j.far;m.texture!==null&&(m.depthNear>0&&(ne=m.depthNear),m.depthFar>0&&(be=m.depthFar)),$.near=N.near=P.near=ne,$.far=N.far=P.far=be,(O!==$.near||H!==$.far)&&(r.updateRenderState({depthNear:$.near,depthFar:$.far}),O=$.near,H=$.far),$.layers.mask=j.layers.mask|6,P.layers.mask=$.layers.mask&-5,N.layers.mask=$.layers.mask&-3;const Ue=j.parent,we=$.cameras;le($,Ue);for(let Oe=0;Oe<we.length;Oe++)le(we[Oe],Ue);we.length===2?Y($,P,N):$.projectionMatrix.copy(P.projectionMatrix),T===null&&j.isPerspectiveCamera&&(T={camera:j,fov:j.fov,zoom:j.zoom}),xe(j,$,Ue)};function xe(j,ne,be){be===null?j.matrix.copy(ne.matrixWorld):(j.matrix.copy(be.matrixWorld),j.matrix.invert(),j.matrix.multiply(ne.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=vo*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return $},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(j){l=j,h!==null&&(h.fixedFoveation=j),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh($)},this.getCameraTexture=function(j){return g[j]};let We=null;function Ze(j,ne){if(u=ne.getViewerPose(c||a),p=ne,u!==null){const be=u.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let Ue=!1;be.length!==$.cameras.length&&($.cameras.length=0,Ue=!0);for(let ie=0;ie<be.length;ie++){const se=be[ie];let ae=null;if(d!==null)ae=d.getViewport(se);else{const he=f.getViewSubImage(h,se);ae=he.viewport,ie===0&&(e.setRenderTargetTextures(y,he.colorTexture,he.depthStencilTexture),e.setRenderTarget(y))}let oe=B[ie];oe===void 0&&(oe=new Kt,oe.layers.enable(ie),oe.viewport=new vt,B[ie]=oe),oe.matrix.fromArray(se.transform.matrix),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.projectionMatrix.fromArray(se.projectionMatrix),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert(),oe.viewport.set(ae.x,ae.y,ae.width,ae.height),ie===0&&($.matrix.copy(oe.matrix),$.matrix.decompose($.position,$.quaternion,$.scale)),Ue===!0&&$.cameras.push(oe)}const we=r.enabledFeatures;if(we&&we.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&b){f=i.getBinding();const ie=f.getDepthInformation(be[0]);ie&&ie.isValid&&ie.texture&&m.init(ie,r.renderState)}if(we&&we.includes("camera-access")&&b){e.state.unbindTexture(),f=i.getBinding();for(let ie=0;ie<be.length;ie++){const se=be[ie].camera;if(se){let ae=g[se];ae||(ae=new au,g[se]=ae);const oe=f.getCameraImage(se);ae.sourceTexture=oe}}}}for(let be=0;be<M.length;be++){const Ue=w[be],we=M[be];Ue!==null&&we!==void 0&&we.update(Ue,ne,c||a)}We&&We(j,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),p=null}const tt=new bu;tt.setAnimationLoop(Ze),this.setAnimationLoop=function(j){We=j},this.dispose=function(){}}}const lv=new ft,Tu=new He;Tu.set(-1,0,0,0,1,0,0,0,1);function cv(n,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,gu(n)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function r(m,g,E,k,y){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?s(m,g):g.isMeshLambertMaterial?(s(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(m,g),f(m,g)):g.isMeshPhongMaterial?(s(m,g),u(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(m,g),h(m,g),g.isMeshPhysicalMaterial&&d(m,g,y)):g.isMeshMatcapMaterial?(s(m,g),p(m,g)):g.isMeshDepthMaterial?s(m,g):g.isMeshDistanceMaterial?(s(m,g),b(m,g)):g.isMeshNormalMaterial?s(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,E,k):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Vt&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Vt&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const E=e.get(g),k=E.envMap,y=E.envMapRotation;k&&(m.envMap.value=k,m.envMapRotation.value.setFromMatrix4(lv.makeRotationFromEuler(y)).transpose(),k.isCubeTexture&&k.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Tu),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,E,k){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*E,m.scale.value=k*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function f(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function h(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,E){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Vt&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function b(m,g){const E=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function uv(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,M){const w=M.program;i.uniformBlockBinding(y,w)}function c(y,M){let w=r[y.id];w===void 0&&(m(y),w=u(y),r[y.id]=w,y.addEventListener("dispose",E));const C=M.program;i.updateUBOMapping(y,C);const _=e.render.frame;s[y.id]!==_&&(h(y),s[y.id]=_)}function u(y){const M=f();y.__bindingPointIndex=M;const w=n.createBuffer(),C=y.__size,_=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,C,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,w),w}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){const M=r[y.id],w=y.uniforms,C=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let _=0,T=w.length;_<T;_++){const P=w[_];if(Array.isArray(P))for(let N=0,B=P.length;N<B;N++)d(P[N],_,N,C);else d(P,_,0,C)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(y,M,w,C){if(b(y,M,w,C)===!0){const _=y.__offset,T=y.value;if(Array.isArray(T)){let P=0;for(let N=0;N<T.length;N++){const B=T[N],$=g(B);p(B,y.__data,P),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(P+=$.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(T,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,y.__data)}}function p(y,M,w){typeof y=="number"||typeof y=="boolean"?M[0]=y:y.isMatrix3?(M[0]=y.elements[0],M[1]=y.elements[1],M[2]=y.elements[2],M[3]=0,M[4]=y.elements[3],M[5]=y.elements[4],M[6]=y.elements[5],M[7]=0,M[8]=y.elements[6],M[9]=y.elements[7],M[10]=y.elements[8],M[11]=0):ArrayBuffer.isView(y)?M.set(new y.constructor(y.buffer,y.byteOffset,M.length)):y.toArray(M,w)}function b(y,M,w,C){const _=y.value,T=M+"_"+w;if(C[T]===void 0)return typeof _=="number"||typeof _=="boolean"?C[T]=_:ArrayBuffer.isView(_)?C[T]=_.slice():C[T]=_.clone(),!0;{const P=C[T];if(typeof _=="number"||typeof _=="boolean"){if(P!==_)return C[T]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(P.equals(_)===!1)return P.copy(_),!0}}return!1}function m(y){const M=y.uniforms;let w=0;const C=16;for(let T=0,P=M.length;T<P;T++){const N=Array.isArray(M[T])?M[T]:[M[T]];for(let B=0,$=N.length;B<$;B++){const O=N[B],H=Array.isArray(O.value)?O.value:[O.value];for(let Q=0,x=H.length;Q<x;Q++){const R=H[Q],I=g(R),G=w%C,Y=G%I.boundary,le=G+Y;w+=Y,le!==0&&C-le<I.storage&&(w+=C-le),O.__data=new Float32Array(I.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=w,w+=I.storage}}}const _=w%C;return _>0&&(w+=C-_),y.__size=w,y.__cache={},this}function g(y){const M={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(M.boundary=4,M.storage=4):y.isVector2?(M.boundary=8,M.storage=8):y.isVector3||y.isColor?(M.boundary=16,M.storage=12):y.isVector4?(M.boundary=16,M.storage=16):y.isMatrix3?(M.boundary=48,M.storage=48):y.isMatrix4?(M.boundary=64,M.storage=64):y.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(M.boundary=16,M.storage=y.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",y),M}function E(y){const M=y.target;M.removeEventListener("dispose",E);const w=a.indexOf(M.__bindingPointIndex);a.splice(w,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function k(){for(const y in r)n.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:l,update:c,dispose:k}}const hv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let un=null;function dv(){return un===null&&(un=new gd(hv,16,16,ri,xn),un.name="DFG_LUT",un.minFilter=Nt,un.magFilter=Nt,un.wrapS=Rn,un.wrapT=Rn,un.generateMipmaps=!1,un.needsUpdate=!0),un}class fv{constructor(e={}){const{canvas:t=Xh(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=Xt}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const b=d,m=new Set([Uo,No,Io]),g=new Set([Xt,_n,or,lr,Do,zo]),E=new Uint32Array(4),k=new Int32Array(4),y=new z;let M=null,w=null;const C=[],_=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=vn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let N=!1,B=null,$=null,O=null,H=null;this._outputColorSpace=Zt;let Q=0,x=0,R=null,I=-1,G=null;const Y=new vt,le=new vt;let xe=null;const We=new Xe(0);let Ze=0,tt=t.width,j=t.height,ne=1,be=null,Ue=null;const we=new vt(0,0,tt,j),Oe=new vt(0,0,tt,j);let ot=!1;const ie=new Ho;let se=!1,ae=!1;const oe=new ft,he=new z,Ie=new vt,ze={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Be=!1;function Ve(){return R===null?ne:1}let D=i;function rt(S,U){return t.getContext(S,U)}let Ke,A,v,V,q,K,ce,ue,J,te,fe,Pe,ve,pe,Le,Ne,Ge,F,me,ee,ge,Me,re;try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Co}`),t.addEventListener("webglcontextlost",pt,!1),t.addEventListener("webglcontextrestored",st,!1),t.addEventListener("webglcontextcreationerror",en,!1),D===null){const U="webgl2";if(D=rt(U,S),D===null)throw rt(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}De()}catch(S){throw t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",st,!1),t.removeEventListener("webglcontextcreationerror",en,!1),et("WebGLRenderer: "+S.message),S}function De(){Ke=new dg(D),Ke.init(),ge=new iv(D,Ke),A=new ng(D,Ke,e,ge),v=new tv(D,Ke),A.reversedDepthBuffer&&h&&v.buffers.depth.setReversed(!0),$=D.createFramebuffer(),O=D.createFramebuffer(),H=D.createFramebuffer(),V=new mg(D),q=new V0,K=new nv(D,Ke,v,q,A,ge,V),ce=new hg(P),ue=new vf(D),Me=new eg(D,ue),J=new fg(D,ue,V,Me),te=new vg(D,J,ue,Me,V),F=new gg(D,A,K),Le=new ig(q),fe=new B0(P,ce,Ke,A,Me,Le),Pe=new cv(P,q),ve=new G0,pe=new Z0(Ke),Ge=new jm(P,ce,v,te,p,l),Ne=new ev(P,te,A),re=new uv(D,V,A,v),me=new tg(D,Ke,V),ee=new pg(D,Ke,V),V.programs=fe.programs,P.capabilities=A,P.extensions=Ke,P.properties=q,P.renderLists=ve,P.shadowMap=Ne,P.state=v,P.info=V}b!==Xt&&(T=new xg(b,t.width,t.height,o,r,s));const ke=new ov(P,D);this.xr=ke,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const S=Ke.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Ke.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(S){S!==void 0&&(ne=S,this.setSize(tt,j,!1))},this.getSize=function(S){return S.set(tt,j)},this.setSize=function(S,U,Z=!0){if(ke.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}tt=S,j=U,t.width=Math.floor(S*ne),t.height=Math.floor(U*ne),Z===!0&&(t.style.width=S+"px",t.style.height=U+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(tt*ne,j*ne).floor()},this.setDrawingBufferSize=function(S,U,Z){tt=S,j=U,ne=Z,t.width=Math.floor(S*Z),t.height=Math.floor(U*Z),this.setViewport(0,0,S,U)},this.setEffects=function(S){if(b===Xt){et("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let U=0;U<S.length;U++)if(S[U].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(Y)},this.getViewport=function(S){return S.copy(we)},this.setViewport=function(S,U,Z,W){S.isVector4?we.set(S.x,S.y,S.z,S.w):we.set(S,U,Z,W),v.viewport(Y.copy(we).multiplyScalar(ne).round())},this.getScissor=function(S){return S.copy(Oe)},this.setScissor=function(S,U,Z,W){S.isVector4?Oe.set(S.x,S.y,S.z,S.w):Oe.set(S,U,Z,W),v.scissor(le.copy(Oe).multiplyScalar(ne).round())},this.getScissorTest=function(){return ot},this.setScissorTest=function(S){v.setScissorTest(ot=S)},this.setOpaqueSort=function(S){be=S},this.setTransparentSort=function(S){Ue=S},this.getClearColor=function(S){return S.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor(...arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha(...arguments)},this.clear=function(S=!0,U=!0,Z=!0){let W=0;if(S){let X=!1;if(R!==null){const ye=R.texture.format;X=m.has(ye)}if(X){const ye=R.texture.type,Ae=g.has(ye),Se=Ge.getClearColor(),Te=Ge.getClearAlpha(),Ce=Se.r,$e=Se.g,Je=Se.b;Ae?(E[0]=Ce,E[1]=$e,E[2]=Je,E[3]=Te,D.clearBufferuiv(D.COLOR,0,E)):(k[0]=Ce,k[1]=$e,k[2]=Je,k[3]=Te,D.clearBufferiv(D.COLOR,0,k))}else W|=D.COLOR_BUFFER_BIT}U&&(W|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(W|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&D.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),B=S},this.dispose=function(){t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",st,!1),t.removeEventListener("webglcontextcreationerror",en,!1),Ge.dispose(),ve.dispose(),pe.dispose(),q.dispose(),ce.dispose(),te.dispose(),Me.dispose(),re.dispose(),fe.dispose(),ke.dispose(),ke.removeEventListener("sessionstart",Jo),ke.removeEventListener("sessionend",Qo),$n.stop()};function pt(S){S.preventDefault(),dl("WebGLRenderer: Context Lost."),N=!0}function st(){dl("WebGLRenderer: Context Restored."),N=!1;const S=V.autoReset,U=Ne.enabled,Z=Ne.autoUpdate,W=Ne.needsUpdate,X=Ne.type;De(),V.autoReset=S,Ne.enabled=U,Ne.autoUpdate=Z,Ne.needsUpdate=W,Ne.type=X}function en(S){et("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function on(S){const U=S.target;U.removeEventListener("dispose",on),ih(U)}function ih(S){rh(S),q.remove(S)}function rh(S){const U=q.get(S).programs;U!==void 0&&(U.forEach(function(Z){fe.releaseProgram(Z)}),S.isShaderMaterial&&fe.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,Z,W,X,ye){U===null&&(U=ze);const Ae=X.isMesh&&X.matrixWorld.determinantAffine()<0,Se=oh(S,U,Z,W,X);v.setMaterial(W,Ae);let Te=Z.index,Ce=1;if(W.wireframe===!0){if(Te=J.getWireframeAttribute(Z),Te===void 0)return;Ce=2}const $e=Z.drawRange,Je=Z.attributes.position;let Re=$e.start*Ce,at=($e.start+$e.count)*Ce;ye!==null&&(Re=Math.max(Re,ye.start*Ce),at=Math.min(at,(ye.start+ye.count)*Ce)),Te!==null?(Re=Math.max(Re,0),at=Math.min(at,Te.count)):Je!=null&&(Re=Math.max(Re,0),at=Math.min(at,Je.count));const yt=at-Re;if(yt<0||yt===1/0)return;Me.setup(X,W,Se,Z,Te);let gt,dt=me;if(Te!==null&&(gt=ue.get(Te),dt=ee,dt.setIndex(gt)),X.isMesh)W.wireframe===!0?(v.setLineWidth(W.wireframeLinewidth*Ve()),dt.setMode(D.LINES)):dt.setMode(D.TRIANGLES);else if(X.isLine){let Dt=W.linewidth;Dt===void 0&&(Dt=1),v.setLineWidth(Dt*Ve()),X.isLineSegments?dt.setMode(D.LINES):X.isLineLoop?dt.setMode(D.LINE_LOOP):dt.setMode(D.LINE_STRIP)}else X.isPoints?dt.setMode(D.POINTS):X.isSprite&&dt.setMode(D.TRIANGLES);if(X.isBatchedMesh)if(Ke.get("WEBGL_multi_draw"))dt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Dt=X._multiDrawStarts,Ee=X._multiDrawCounts,Ut=X._multiDrawCount,nt=Te?ue.get(Te).bytesPerElement:1,$t=q.get(W).currentProgram.getUniforms();for(let ln=0;ln<Ut;ln++)$t.setValue(D,"_gl_DrawID",ln),dt.render(Dt[ln]/nt,Ee[ln])}else if(X.isInstancedMesh)dt.renderInstances(Re,yt,X.count);else if(Z.isInstancedBufferGeometry){const Dt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Ee=Math.min(Z.instanceCount,Dt);dt.renderInstances(Re,yt,Ee)}else dt.render(Re,yt)};function Ko(S,U,Z,W){B!==null&&S.isNodeMaterial&&B.setObject(W,S),se===!0&&Le.setState(S,Z,!1),S.transparent===!0&&S.side===Jt&&S.forceSinglePass===!1?(S.side=Vt,S.needsUpdate=!0,Sr(S,U,W),S.side=Wn,S.needsUpdate=!0,Sr(S,U,W),S.side=Jt):Sr(S,U,W)}this.compile=function(S,U,Z=null){Z===null&&(Z=S),B!==null&&B.renderStart(S,U,Z),w=pe.get(Z),w.init(U),_.push(w),Z.traverseVisible(function(X){X.isLight&&X.layers.test(U.layers)&&(w.pushLight(X),X.castShadow&&w.pushShadow(X))}),S!==Z&&S.traverseVisible(function(X){X.isLight&&X.layers.test(U.layers)&&(w.pushLight(X),X.castShadow&&w.pushShadow(X))}),w.setupLights(),B!==null&&B.updateLights(w.state.lightsArray),ae=this.localClippingEnabled,se=Le.init(this.clippingPlanes,ae),se===!0&&Le.setGlobalState(this.clippingPlanes,U),B!==null&&Ne.render(w.state.shadowsArray,Z,U);const W=new Set;return S.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const ye=X.material;if(ye)if(Array.isArray(ye))for(let Ae=0;Ae<ye.length;Ae++){const Se=ye[Ae];Ko(Se,Z,U,X),W.add(Se)}else Ko(ye,Z,U,X),W.add(ye)}),w=_.pop(),B!==null&&B.renderEnd(),W},this.compileAsync=function(S,U,Z=null){const W=this.compile(S,U,Z);return new Promise(X=>{function ye(){if(W.forEach(function(Ae){const Te=q.get(Ae).currentProgram;(Te===void 0||Te.isReady())&&W.delete(Ae)}),W.size===0){X(S);return}setTimeout(ye,10)}Ke.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let zs=null;function sh(S){zs&&zs(S)}function Jo(){$n.stop()}function Qo(){$n.start()}const $n=new bu;$n.setAnimationLoop(sh),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(S){zs=S,ke.setAnimationLoop(S),S===null?$n.stop():$n.start()},ke.addEventListener("sessionstart",Jo),ke.addEventListener("sessionend",Qo),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;B!==null&&B.renderStart(S,U);const Z=ke.enabled===!0&&ke.isPresenting===!0,W=T!==null&&(R===null||Z)&&T.begin(P,R);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),ke.enabled===!0&&ke.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(ke.cameraAutoUpdate===!0&&ke.updateCamera(U),U=ke.getCamera()),S.isScene===!0&&S.onBeforeRender(P,S,U,R),w=pe.get(S,_.length),w.init(U),w.state.textureUnits=K.getTextureUnits(),_.push(w),oe.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),ie.setFromProjectionMatrix(oe,gn,U.reversedDepth),ae=this.localClippingEnabled,se=Le.init(this.clippingPlanes,ae),M=ve.get(S,C.length),M.init(),C.push(M),ke.enabled===!0&&ke.isPresenting===!0){const Ae=P.xr.getDepthSensingMesh();Ae!==null&&Is(Ae,U,-1/0,P.sortObjects)}Is(S,U,0,P.sortObjects),M.finish(),B!==null&&B.updateLights(w.state.lightsArray),P.sortObjects===!0&&M.sort(be,Ue),Be=ke.enabled===!1||ke.isPresenting===!1||ke.hasDepthSensing()===!1,Be&&Ge.addToRenderList(M,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),se===!0&&Le.beginShadows();const X=w.state.shadowsArray;if(Ne.render(X,S,U),se===!0&&Le.endShadows(),(W&&T.hasRenderPass())===!1){const Ae=M.opaque,Se=M.transmissive;if(w.setupLights(),U.isArrayCamera){const Te=U.cameras;if(Se.length>0)for(let Ce=0,$e=Te.length;Ce<$e;Ce++){const Je=Te[Ce];el(Ae,Se,S,Je)}Be&&Ge.render(S);for(let Ce=0,$e=Te.length;Ce<$e;Ce++){const Je=Te[Ce];jo(M,S,Je,Je.viewport)}}else Se.length>0&&el(Ae,Se,S,U),Be&&Ge.render(S),jo(M,S,U)}R!==null&&x===0&&(K.updateMultisampleRenderTarget(R),K.updateRenderTargetMipmap(R)),W&&T.end(P),S.isScene===!0&&S.onAfterRender(P,S,U),Me.resetDefaultState(),I=-1,G=null,_.pop(),_.length>0?(w=_[_.length-1],K.setTextureUnits(w.state.textureUnits),se===!0&&Le.setGlobalState(P.clippingPlanes,w.state.camera)):w=null,C.pop(),C.length>0?M=C[C.length-1]:M=null,B!==null&&B.renderEnd()};function Is(S,U,Z,W){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)Z=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLightProbeGrid)w.pushLightProbeGrid(S);else if(S.isLight)w.pushLight(S),S.castShadow&&w.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||S.intersectsFrustum(ie)){W&&Ie.setFromMatrixPosition(S.matrixWorld).applyMatrix4(oe);const Ae=te.update(S),Se=S.material;Se.visible&&M.push(S,Ae,Se,Z,Ie.z,null,U)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||S.intersectsFrustum(ie))){const Ae=te.update(S),Se=S.material;if(W&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ie.copy(S.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Ie.copy(Ae.boundingSphere.center)),Ie.applyMatrix4(S.matrixWorld).applyMatrix4(oe)),Array.isArray(Se)){const Te=Ae.groups;for(let Ce=0,$e=Te.length;Ce<$e;Ce++){const Je=Te[Ce],Re=Se[Je.materialIndex];Re&&Re.visible&&M.push(S,Ae,Re,Z,Ie.z,Je,U)}}else Se.visible&&M.push(S,Ae,Se,Z,Ie.z,null,U)}}const ye=S.children;for(let Ae=0,Se=ye.length;Ae<Se;Ae++)Is(ye[Ae],U,Z,W)}function jo(S,U,Z,W){const{opaque:X,transmissive:ye,transparent:Ae}=S;w.setupLightsView(Z),se===!0&&Le.setGlobalState(P.clippingPlanes,Z),W&&v.viewport(Y.copy(W)),X.length>0&&br(X,U,Z),ye.length>0&&br(ye,U,Z),Ae.length>0&&br(Ae,U,Z),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function el(S,U,Z,W){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[W.id]===void 0){const Re=Ke.has("EXT_color_buffer_half_float")||Ke.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[W.id]=new an(1,1,{generateMipmaps:!0,type:Re?xn:Xt,minFilter:ei,samples:Math.max(4,A.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:je.workingColorSpace})}const ye=w.state.transmissionRenderTarget[W.id],Ae=W.viewport||Y;ye.setSize(Ae.z*P.transmissionResolutionScale,Ae.w*P.transmissionResolutionScale);const Se=P.getRenderTarget(),Te=P.getActiveCubeFace(),Ce=P.getActiveMipmapLevel();P.setRenderTarget(ye),P.getClearColor(We),Ze=P.getClearAlpha(),Ze<1&&P.setClearColor(16777215,.5),P.clear(),Be&&Ge.render(Z);const $e=P.toneMapping;P.toneMapping=vn;const Je=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),w.setupLightsView(W),se===!0&&Le.setGlobalState(P.clippingPlanes,W),br(S,Z,W),K.updateMultisampleRenderTarget(ye),K.updateRenderTargetMipmap(ye),Ke.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let at=0,yt=U.length;at<yt;at++){const gt=U[at],{object:dt,geometry:Dt,material:Ee,group:Ut}=gt;if(Ee.side===Jt&&dt.layers.test(W.layers)){const nt=Ee.side;Ee.side=Vt,Ee.needsUpdate=!0,tl(dt,Z,W,Dt,Ee,Ut),Ee.side=nt,Ee.needsUpdate=!0,Re=!0}}Re===!0&&(K.updateMultisampleRenderTarget(ye),K.updateRenderTargetMipmap(ye))}P.setRenderTarget(Se,Te,Ce),P.setClearColor(We,Ze),Je!==void 0&&(W.viewport=Je),P.toneMapping=$e}function br(S,U,Z){const W=U.isScene===!0?U.overrideMaterial:null;for(let X=0,ye=S.length;X<ye;X++){const Ae=S[X],{object:Se,geometry:Te,group:Ce}=Ae;let $e=Ae.material;$e.allowOverride===!0&&W!==null&&($e=W),Se.layers.test(Z.layers)&&tl(Se,U,Z,Te,$e,Ce)}}function tl(S,U,Z,W,X,ye){B!==null&&X.isNodeMaterial&&B.setObject(S,X),S.onBeforeRender(P,U,Z,W,X,ye),S.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),X.onBeforeRender(P,U,Z,W,S,ye),X.transparent===!0&&X.side===Jt&&X.forceSinglePass===!1?(X.side=Vt,X.needsUpdate=!0,P.renderBufferDirect(Z,U,W,X,S,ye),X.side=Wn,X.needsUpdate=!0,P.renderBufferDirect(Z,U,W,X,S,ye),X.side=Jt):P.renderBufferDirect(Z,U,W,X,S,ye),S.onAfterRender(P,U,Z,W,X,ye)}function Sr(S,U,Z){U.isScene!==!0&&(U=ze);const W=q.get(S),X=w.state.lights,ye=w.state.shadowsArray,Ae=X.state.version,Se=fe.getParameters(S,X.state,ye,U,Z,w.state.lightProbeGridArray),Te=fe.getProgramCacheKey(Se);let Ce=W.programs;W.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?U.environment:null,W.fog=U.fog;const $e=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;W.envMap=ce.get(S.envMap||W.environment,$e),W.envMapRotation=W.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,Ce===void 0&&(S.addEventListener("dispose",on),Ce=new Map,W.programs=Ce);let Je=Ce.get(Te);if(Je!==void 0){if(W.currentProgram===Je&&W.lightsStateVersion===Ae)return il(S,Se),Je}else Se.uniforms=fe.getUniforms(S),B!==null&&S.isNodeMaterial&&B.build(S,Z,Se),S.onBeforeCompile(Se,P),Je=fe.acquireProgram(Se,Te),Ce.set(Te,Je),W.uniforms=Se.uniforms;const Re=W.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Re.clippingPlanes=Le.uniform),il(S,Se),W.needsLights=ch(S),W.lightsStateVersion=Ae,W.needsLights&&(Re.ambientLightColor.value=X.state.ambient,Re.lightProbe.value=X.state.probe,Re.sunLights.value=X.state.sun,Re.sunLightShadows.value=X.state.sunShadow,Re.directionalLights.value=X.state.directional,Re.directionalLightShadows.value=X.state.directionalShadow,Re.spotLights.value=X.state.spot,Re.spotLightShadows.value=X.state.spotShadow,Re.rectAreaLights.value=X.state.rectArea,Re.ltc_1.value=X.state.rectAreaLTC1,Re.ltc_2.value=X.state.rectAreaLTC2,Re.pointLights.value=X.state.point,Re.pointLightShadows.value=X.state.pointShadow,Re.hemisphereLights.value=X.state.hemi,Re.sunShadowMatrix.value=X.state.sunShadowMatrix,Re.sunShadowCascade.value=X.state.sunShadowCascade,Re.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Re.spotLightMatrix.value=X.state.spotLightMatrix,Re.spotLightMap.value=X.state.spotLightMap,Re.pointShadowMatrix.value=X.state.pointShadowMatrix),W.lightProbeGrid=w.state.lightProbeGridArray.length>0,W.currentProgram=Je,W.uniformsList=null,Je}function nl(S){if(S.uniformsList===null){const U=S.currentProgram.getUniforms();S.uniformsList=ss.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function il(S,U){const Z=q.get(S);Z.outputColorSpace=U.outputColorSpace,Z.batching=U.batching,Z.batchingColor=U.batchingColor,Z.instancing=U.instancing,Z.instancingColor=U.instancingColor,Z.instancingMorph=U.instancingMorph,Z.skinning=U.skinning,Z.morphTargets=U.morphTargets,Z.morphNormals=U.morphNormals,Z.morphColors=U.morphColors,Z.morphTargetsCount=U.morphTargetsCount,Z.numClippingPlanes=U.numClippingPlanes,Z.numIntersection=U.numClipIntersection,Z.vertexAlphas=U.vertexAlphas,Z.vertexTangents=U.vertexTangents,Z.toneMapping=U.toneMapping}function ah(S,U){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;y.setFromMatrixPosition(U.matrixWorld);for(let Z=0,W=S.length;Z<W;Z++){const X=S[Z];if(X.texture!==null&&X.boundingBox.containsPoint(y))return X}return null}function oh(S,U,Z,W,X){U.isScene!==!0&&(U=ze),K.resetTextureUnits();const ye=U.fog,Ae=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?U.environment:null,Se=R===null?P.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:je.workingColorSpace,Te=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Ce=ce.get(W.envMap||Ae,Te),$e=W.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Je=!!Z.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Re=!!Z.morphAttributes.position,at=!!Z.morphAttributes.normal,yt=!!Z.morphAttributes.color;let gt=vn;W.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(gt=P.toneMapping);const dt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Dt=dt!==void 0?dt.length:0,Ee=q.get(W),Ut=w.state.lights;if(se===!0&&(ae===!0||S!==G)){const mt=S===G&&W.id===I;Le.setState(W,S,mt)}let nt=!1;W.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Ut.state.version||Ee.outputColorSpace!==Se||X.isBatchedMesh&&Ee.batching===!1||!X.isBatchedMesh&&Ee.batching===!0||X.isBatchedMesh&&Ee.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&Ee.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&Ee.instancing===!1||!X.isInstancedMesh&&Ee.instancing===!0||X.isSkinnedMesh&&Ee.skinning===!1||!X.isSkinnedMesh&&Ee.skinning===!0||X.isInstancedMesh&&Ee.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ee.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ee.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ee.instancingMorph===!1&&X.morphTexture!==null||Ee.envMap!==Ce||W.fog===!0&&Ee.fog!==ye||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==Le.numPlanes||Ee.numIntersection!==Le.numIntersection)||Ee.vertexAlphas!==$e||Ee.vertexTangents!==Je||Ee.morphTargets!==Re||Ee.morphNormals!==at||Ee.morphColors!==yt||Ee.toneMapping!==gt||Ee.morphTargetsCount!==Dt||!!Ee.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(nt=!0):(nt=!0,Ee.__version=W.version);let $t=Ee.currentProgram;nt===!0&&($t=Sr(W,U,X),B&&W.isNodeMaterial&&B.onUpdateProgram(W,$t,Ee));let ln=!1,Dn=!1,ui=!1;const ut=$t.getUniforms(),bt=Ee.uniforms;if(v.useProgram($t.program)&&(ln=!0,Dn=!0,ui=!0),W.id!==I&&(I=W.id,Dn=!0),Ee.needsLights){const mt=ah(w.state.lightProbeGridArray,X);Ee.lightProbeGrid!==mt&&(Ee.lightProbeGrid=mt,Dn=!0)}if(ln||G!==S){v.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ut.setValue(D,"projectionMatrix",S.projectionMatrix),ut.setValue(D,"viewMatrix",S.matrixWorldInverse);const In=ut.map.cameraPosition;In!==void 0&&In.setValue(D,he.setFromMatrixPosition(S.matrixWorld)),A.logarithmicDepthBuffer&&ut.setValue(D,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ut.setValue(D,"isOrthographic",S.isOrthographicCamera===!0),G!==S&&(G=S,Dn=!0,ui=!0)}if(Ee.needsLights&&(Ut.state.sunShadowMap.length>0&&ut.setValue(D,"sunShadowMap",Ut.state.sunShadowMap,K),Ut.state.directionalShadowMap.length>0&&ut.setValue(D,"directionalShadowMap",Ut.state.directionalShadowMap,K),Ut.state.spotShadowMap.length>0&&ut.setValue(D,"spotShadowMap",Ut.state.spotShadowMap,K),Ut.state.pointShadowMap.length>0&&ut.setValue(D,"pointShadowMap",Ut.state.pointShadowMap,K)),X.isSkinnedMesh){ut.setOptional(D,X,"bindMatrix"),ut.setOptional(D,X,"bindMatrixInverse");const mt=X.skeleton;mt&&(mt.boneTexture===null&&mt.computeBoneTexture(),ut.setValue(D,"boneTexture",mt.boneTexture,K))}X.isBatchedMesh&&(ut.setOptional(D,X,"batchingTexture"),ut.setValue(D,"batchingTexture",X._matricesTexture,K),ut.setOptional(D,X,"batchingIdTexture"),ut.setValue(D,"batchingIdTexture",X._indirectTexture,K),ut.setOptional(D,X,"batchingColorTexture"),X._colorsTexture!==null&&ut.setValue(D,"batchingColorTexture",X._colorsTexture,K));const zn=Z.morphAttributes;if((zn.position!==void 0||zn.normal!==void 0||zn.color!==void 0)&&F.update(X,Z,$t),(Dn||Ee.receiveShadow!==X.receiveShadow)&&(Ee.receiveShadow=X.receiveShadow,ut.setValue(D,"receiveShadow",X.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&U.environment!==null&&(bt.envMapIntensity.value=U.environmentIntensity),bt.dfgLUT!==void 0&&(bt.dfgLUT.value=dv()),Dn){if(ut.setValue(D,"toneMappingExposure",P.toneMappingExposure),Ee.needsLights&&lh(bt,ui),ye&&W.fog===!0&&Pe.refreshFogUniforms(bt,ye),Pe.refreshMaterialUniforms(bt,W,ne,j,w.state.transmissionRenderTarget[S.id]),Ee.needsLights&&Ee.lightProbeGrid){const mt=Ee.lightProbeGrid;bt.probesSH.value=mt.texture,bt.probesMin.value.copy(mt.boundingBox.min),bt.probesMax.value.copy(mt.boundingBox.max),bt.probesResolution.value.copy(mt.resolution)}ss.upload(D,nl(Ee),bt,K)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(ss.upload(D,nl(Ee),bt,K),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ut.setValue(D,"center",X.center),ut.setValue(D,"modelViewMatrix",X.modelViewMatrix),ut.setValue(D,"normalMatrix",X.normalMatrix),ut.setValue(D,"modelMatrix",X.matrixWorld),W.uniformsGroups!==void 0){const mt=W.uniformsGroups;for(let In=0,hi=mt.length;In<hi;In++){const sl=mt[In];re.update(sl,$t),re.bind(sl,$t)}}return $t}function lh(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.sunLights.needsUpdate=U,S.sunLightShadows.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function ch(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return Q},this.getActiveMipmapLevel=function(){return x},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(S,U,Z){const W=q.get(S);W.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),q.get(S.texture).__webglTexture=U,q.get(S.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:Z,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,U){const Z=q.get(S);Z.__webglFramebuffer=U,Z.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(S,U=0,Z=0){R=S,Q=U,x=Z;let W=null,X=!1,ye=!1;if(S){const Se=q.get(S);if(Se.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(D.FRAMEBUFFER,Se.__webglFramebuffer),Y.copy(S.viewport),le.copy(S.scissor),xe=S.scissorTest,v.viewport(Y),v.scissor(le),v.setScissorTest(xe),I=-1;return}else if(Se.__webglFramebuffer===void 0)K.setupRenderTarget(S);else if(Se.__hasExternalTextures)K.rebindTextures(S,q.get(S.texture).__webglTexture,q.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const $e=S.depthTexture;if(Se.__boundDepthTexture!==$e){if($e!==null&&q.has($e)&&(S.width!==$e.image.width||S.height!==$e.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(S)}}const Te=S.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(ye=!0);const Ce=q.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ce[U])?W=Ce[U][Z]:W=Ce[U],X=!0):S.samples>0&&K.useMultisampledRTT(S)===!1?W=q.get(S).__webglMultisampledFramebuffer:Array.isArray(Ce)?W=Ce[Z]:W=Ce,Y.copy(S.viewport),le.copy(S.scissor),xe=S.scissorTest}else Y.copy(we).multiplyScalar(ne).floor(),le.copy(Oe).multiplyScalar(ne).floor(),xe=ot;if(Z!==0&&(W=$),v.bindFramebuffer(D.FRAMEBUFFER,W)&&v.drawBuffers(S,W),v.viewport(Y),v.scissor(le),v.setScissorTest(xe),X){const Se=q.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,Se.__webglTexture,Z)}else if(ye){const Se=U;for(let Te=0;Te<S.textures.length;Te++){const Ce=q.get(S.textures[Te]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Te,Ce.__webglTexture,Z,Se)}}else if(S!==null&&Z!==0){const Se=q.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Se.__webglTexture,Z)}I=-1};function rl(S){const U=q.get(S);return(U.__readFormat!==S.format||U.__readType!==S.type)&&(U.__readFormat=S.format,U.__readType=S.type,U.__formatReadable=A.textureFormatReadable(S.format),U.__typeReadable=A.textureTypeReadable(S.type)),U}this.readRenderTargetPixels=function(S,U,Z,W,X,ye,Ae,Se=0){if(!(S&&S.isWebGLRenderTarget)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=q.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Ae!==void 0&&(Te=Te[Ae]),Te){v.bindFramebuffer(D.FRAMEBUFFER,Te);try{const Ce=S.textures[Se],$e=Ce.format,Je=Ce.type;S.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Se);const Re=rl(Ce);if(Re.__formatReadable===!1){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Re.__typeReadable===!1){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-W&&Z>=0&&Z<=S.height-X&&D.readPixels(U,Z,W,X,ge.convert($e),ge.convert(Je),ye)}finally{const Ce=R!==null?q.get(R).__webglFramebuffer:null;v.bindFramebuffer(D.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(S,U,Z,W,X,ye,Ae,Se=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=q.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Ae!==void 0&&(Te=Te[Ae]),Te)if(U>=0&&U<=S.width-W&&Z>=0&&Z<=S.height-X){v.bindFramebuffer(D.FRAMEBUFFER,Te);const Ce=S.textures[Se],$e=Ce.format,Je=Ce.type;S.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Se);const Re=rl(Ce);if(Re.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Re.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const at=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,at),D.bufferData(D.PIXEL_PACK_BUFFER,ye.byteLength,D.STREAM_READ),D.readPixels(U,Z,W,X,ge.convert($e),ge.convert(Je),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);const yt=R!==null?q.get(R).__webglFramebuffer:null;v.bindFramebuffer(D.FRAMEBUFFER,yt);const gt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await $h(D,gt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,at),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ye),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(at),D.deleteSync(gt),ye}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,U=null,Z=0){const W=Math.pow(2,-Z),X=Math.floor(S.image.width*W),ye=Math.floor(S.image.height*W),Ae=U!==null?U.x:0,Se=U!==null?U.y:0;K.setTexture2D(S,0),D.copyTexSubImage2D(D.TEXTURE_2D,Z,0,0,Ae,Se,X,ye),v.unbindTexture()},this.copyTextureToTexture=function(S,U,Z=null,W=null,X=0,ye=0){let Ae,Se,Te,Ce,$e,Je,Re,at,yt;const gt=S.isCompressedTexture?S.mipmaps[ye]:S.image;if(Z!==null)Ae=Z.max.x-Z.min.x,Se=Z.max.y-Z.min.y,Te=Z.isBox3?Z.max.z-Z.min.z:1,Ce=Z.min.x,$e=Z.min.y,Je=Z.isBox3?Z.min.z:0;else{const bt=Math.pow(2,-X);Ae=Math.floor(gt.width*bt),Se=Math.floor(gt.height*bt),S.isDataArrayTexture?Te=gt.depth:S.isData3DTexture?Te=Math.floor(gt.depth*bt):Te=1,Ce=0,$e=0,Je=0}W!==null?(Re=W.x,at=W.y,yt=W.z):(Re=0,at=0,yt=0);const dt=ge.convert(U.format),Dt=ge.convert(U.type);let Ee;U.isData3DTexture?(K.setTexture3D(U,0),Ee=D.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(K.setTexture2DArray(U,0),Ee=D.TEXTURE_2D_ARRAY):(K.setTexture2D(U,0),Ee=D.TEXTURE_2D),v.activeTexture(D.TEXTURE0),v.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),v.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),v.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const Ut=v.getParameter(D.UNPACK_ROW_LENGTH),nt=v.getParameter(D.UNPACK_IMAGE_HEIGHT),$t=v.getParameter(D.UNPACK_SKIP_PIXELS),ln=v.getParameter(D.UNPACK_SKIP_ROWS),Dn=v.getParameter(D.UNPACK_SKIP_IMAGES);v.pixelStorei(D.UNPACK_ROW_LENGTH,gt.width),v.pixelStorei(D.UNPACK_IMAGE_HEIGHT,gt.height),v.pixelStorei(D.UNPACK_SKIP_PIXELS,Ce),v.pixelStorei(D.UNPACK_SKIP_ROWS,$e),v.pixelStorei(D.UNPACK_SKIP_IMAGES,Je);const ui=S.isDataArrayTexture||S.isData3DTexture,ut=U.isDataArrayTexture||U.isData3DTexture;if(S.isDepthTexture){const bt=q.get(S),zn=q.get(U),mt=q.get(bt.__renderTarget),In=q.get(zn.__renderTarget);v.bindFramebuffer(D.READ_FRAMEBUFFER,mt.__webglFramebuffer),v.bindFramebuffer(D.DRAW_FRAMEBUFFER,In.__webglFramebuffer);for(let hi=0;hi<Te;hi++)ui&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,q.get(S).__webglTexture,X,Je+hi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,q.get(U).__webglTexture,ye,yt+hi)),D.blitFramebuffer(Ce,$e,Ae,Se,Re,at,Ae,Se,D.DEPTH_BUFFER_BIT,D.NEAREST);v.bindFramebuffer(D.READ_FRAMEBUFFER,null),v.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(X!==0||S.isRenderTargetTexture||q.has(S)){const bt=q.get(S),zn=q.get(U);v.bindFramebuffer(D.READ_FRAMEBUFFER,O),v.bindFramebuffer(D.DRAW_FRAMEBUFFER,H);for(let mt=0;mt<Te;mt++)ui?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,bt.__webglTexture,X,Je+mt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,bt.__webglTexture,X),ut?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,zn.__webglTexture,ye,yt+mt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,zn.__webglTexture,ye),X!==0?D.blitFramebuffer(Ce,$e,Ae,Se,Re,at,Ae,Se,D.COLOR_BUFFER_BIT,D.NEAREST):ut?D.copyTexSubImage3D(Ee,ye,Re,at,yt+mt,Ce,$e,Ae,Se):D.copyTexSubImage2D(Ee,ye,Re,at,Ce,$e,Ae,Se);v.bindFramebuffer(D.READ_FRAMEBUFFER,null),v.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else ut?S.isDataTexture||S.isData3DTexture?D.texSubImage3D(Ee,ye,Re,at,yt,Ae,Se,Te,dt,Dt,gt.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(Ee,ye,Re,at,yt,Ae,Se,Te,dt,gt.data):D.texSubImage3D(Ee,ye,Re,at,yt,Ae,Se,Te,dt,Dt,gt):S.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,ye,Re,at,Ae,Se,dt,Dt,gt.data):S.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,ye,Re,at,gt.width,gt.height,dt,gt.data):D.texSubImage2D(D.TEXTURE_2D,ye,Re,at,Ae,Se,dt,Dt,gt);v.pixelStorei(D.UNPACK_ROW_LENGTH,Ut),v.pixelStorei(D.UNPACK_IMAGE_HEIGHT,nt),v.pixelStorei(D.UNPACK_SKIP_PIXELS,$t),v.pixelStorei(D.UNPACK_SKIP_ROWS,ln),v.pixelStorei(D.UNPACK_SKIP_IMAGES,Dn),ye===0&&U.generateMipmaps&&D.generateMipmap(Ee),v.unbindTexture()},this.initRenderTarget=function(S){q.get(S).__webglFramebuffer===void 0&&K.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?K.setTextureCube(S,0):S.isData3DTexture?K.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?K.setTexture2DArray(S,0):K.setTexture2D(S,0),v.unbindTexture()},this.resetState=function(){Q=0,x=0,R=null,v.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}const ct=n=>({value:n,unit:"mm"});function Wt(n,e,t,i={},r=[]){return{id:n,type:e,params:i,content:r,meta:{name:t}}}const dn=n=>JSON.parse(JSON.stringify(n));function Ii(n){return n.content.flatMap(e=>[e,...Ii(e)])}const St=n=>[n,...Ii(n)];function ht(n,e){return St(n).find(t=>t.id===e)}function Ms(n,e){return St(n).find(t=>t.content.some(i=>i.id===e))}function Hn(n,e){if(n.id===e)return[n];for(const t of n.content){const i=Hn(t,e);if(i.length)return[n,...i]}return[]}const wt=n=>n.meta.verworfen===!0,Ye=n=>n&&typeof n=="object"?n.value:0;function Ru(n,e){const t=new Set(St(n).map(r=>r.id));if(!t.has(e))return e;let i=2;for(;t.has(`${e}-${i}`);)i+=1;return`${e}-${i}`}const ku={bohrungen:{durchmesser:6},steg:{hoehe:30}};function pv(){return Wt("halter","teil","Halter",{material:"PLA"},[Wt("skizze","skizze","Skizze",{ebene:"XY",laenge:ct(80),breite:ct(50),eckradius:ct(3)}),Wt("grundplatte","extrusion","Grundplatte",{laenge:ct(80),breite:ct(50),dicke:ct(8),eckradius:ct(3)}),Wt("steg","extrusion","Steg",{laenge:ct(60),breite:ct(10),hoehe:ct(30),lage_y:ct(20)}),Wt("bohrungen","bohrung","Bohrungen",{durchmesser:ct(6),abstand_x:ct(25),lage_y:ct(-7.5)})])}function mv(){return Wt("sensorgehaeuse","baugruppe","Sensorgehäuse",{},[Wt("baugruppe-1","baugruppe","Baugruppe 1",{},[Wt("gehaeuse","teil","Gehäuse",{material:"PLA",lage_x:ct(0)},[Wt("schale","schale","Schale",{laenge:ct(80),breite:ct(50),hoehe:ct(30),wand:ct(2)})])]),Wt("deckel","teil","Deckel",{material:"PLA",lage_x:ct(100)},[Wt("platte","extrusion","Platte",{laenge:ct(80),breite:ct(50),hoehe:ct(4)})])])}const gv=()=>Wt("teil-1","teil","Teil 1",{material:"PLA"},[]),Cu=n=>Wt("projekt","projekt","Projekt",{},n),Ds=()=>Cu([pv(),mv()]),gc=()=>Cu([gv()]),vv=.00124,_v=1-Math.PI/4,vc=50,_c=n=>!!n&&!wt(n);function ws(n){const e=[];for(const t of St(n))wt(t)||(t.type==="bohrung"&&Ye(t.params.durchmesser)>=vc&&e.push({elementId:t.id,schluessel:"befund.bohrung-zu-gross",parameter:"durchmesser",wert:Ye(t.params.durchmesser),grenze:vc}),t.id==="steg"&&Ye(t.params.hoehe)<=0&&e.push({elementId:t.id,schluessel:"befund.steg-ohne-hoehe",parameter:"hoehe",wert:Ye(t.params.hoehe),grenze:0}));return e}function xc(n,e,t){return t.has(n.id)?ku[n.id]?.[e]??Ye(n.params[e]):Ye(n.params[e])}function xv(n,e,t,i){const r=Ye(n.params.laenge),s=Ye(n.params.breite),a=Ye(n.params.lage_y);return{min:[e[0]-r/2,e[1]+a-s/2,e[2]+t],max:[e[0]+r/2,e[1]+a+s/2,e[2]+t+i]}}function Gn(n){const e=new Set(ws(n).map(u=>u.elementId)),t=[];let i=0;const r=u=>[Ye(u.params.lage_x),Ye(u.params.lage_y),0];function s(u,f){const h=u.content.filter(p=>_c(p));let d=0;for(const p of h)if(p.type==="skizze"){const b=Ye(p.params.laenge),m=Ye(p.params.breite);t.push({elementId:p.id,art:"skizze",min:[f[0]-b/2,f[1]-m/2,0],max:[f[0]+b/2,f[1]+m/2,0],platte:{laenge:b,breite:m,dicke:0,eckradius:Ye(p.params.eckradius),loecher:[],lochD:0}})}for(const p of h)if(p.type==="extrusion"&&p.params.dicke!==void 0){const b=p.id==="grundplatte",m=Ye(p.params.dicke),g=Ye(p.params.laenge),E=Ye(p.params.breite),k=Ye(p.params.eckradius),y=f[1]+Ye(p.params.lage_y);b&&(d=m);const M=b?h.find(P=>P.type==="bohrung"):void 0,w=M?xc(M,"durchmesser",e):0,C=M?Ye(M.params.abstand_x):0,_=M?Ye(M.params.lage_y):0,T=M?[{x:f[0]+C,y:y+_},{x:f[0]-C,y:y+_}]:[];if(t.push({elementId:p.id,art:"platte",min:[f[0]-g/2,y-E/2,f[2]],max:[f[0]+g/2,y+E/2,f[2]+m],platte:{laenge:g,breite:E,dicke:m,eckradius:k,loecher:T,lochD:w}}),i+=(g*E-4*k*k*_v)*m,M){i-=T.length*Math.PI*(w/2)**2*m;for(const P of T)t.push({elementId:M.id,art:"rohr",min:[P.x-w/2,P.y-w/2,f[2]],max:[P.x+w/2,P.y+w/2,f[2]+m],rohr:{x:P.x,y:P.y,d:w}})}}for(const p of h)if(p.type==="extrusion"&&p.params.dicke===void 0){const b=p.params.hoehe!==void 0?xc(p,"hoehe",e):0,m=xv(p,f,d,b);t.push({elementId:p.id,art:"quader",min:m.min,max:m.max}),i+=Ye(p.params.laenge)*Ye(p.params.breite)*b}else if(p.type==="schale"){const b=Ye(p.params.laenge),m=Ye(p.params.breite),g=Ye(p.params.hoehe),E=Ye(p.params.wand);t.push({elementId:p.id,art:"schale",min:[f[0]-b/2,f[1]-m/2,f[2]],max:[f[0]+b/2,f[1]+m/2,f[2]+g],wand:E}),i+=b*m*g-(b-2*E)*(m-2*E)*(g-E)}}const a=St(n).filter(u=>u.type==="teil"&&_c(u)),o=new Set;for(const u of a)bv(n,u)||(o.add(u.id),s(u,r(u)));const l=[0,0,0],c=t.filter(u=>u.art!=="skizze"&&u.art!=="rohr");if(c.length)for(let u=0;u<3;u++)l[u]=Math.max(...c.map(f=>f.max[u]))-Math.min(...c.map(f=>f.min[u]));return{koerper:t,volumen_mm3:i,masse_g:i*vv,abmessungen_mm:l,befunde:ws(n)}}function bv(n,e){for(const t of St(n))if(wt(t)&&Ii(t).some(i=>i.id===e.id))return!0;return!1}function bc(n,e){const t=new Set([n.id,...Ii(n).map(o=>o.id)]),i=e.filter(o=>t.has(o.elementId)&&o.art!=="skizze"),r=i.length?i:e.filter(o=>t.has(o.elementId));if(!r.length)return null;const s=[1/0,1/0,1/0],a=[-1/0,-1/0,-1/0];for(const o of r)for(let l=0;l<3;l++)s[l]=Math.min(s[l],o.min[l]),a[l]=Math.max(a[l],o.max[l]);return{min:s,max:a}}const Sv=JSON.parse('[{"id":"element.anlegen","familie":"Datei","titel":"befehl.element.anlegen","parameter":{"typ":{"typ":"wahl"}},"bezug":"keine","rang":101,"wesentlich":true,"untergruppe":"Neu","kontext":true},{"id":"dokument.oeffnen","familie":"Datei","titel":"befehl.dokument.oeffnen","parameter":{},"bezug":"keine","rang":102,"wesentlich":true,"untergruppe":"Öffnen","folgt":true},{"id":"wurzel.setzen","familie":"Datei","titel":"befehl.wurzel.setzen","parameter":{},"bezug":"element","rang":103,"wesentlich":true,"untergruppe":"Öffnen","folgt":true},{"id":"einstellungen.oeffnen","familie":"Datei","titel":"befehl.einstellungen.oeffnen","parameter":{},"bezug":"keine","rang":104,"wesentlich":true,"untergruppe":"Projekt","folgt":true},{"id":"dokument.schliessen","familie":"Datei","titel":"befehl.dokument.schliessen","parameter":{},"bezug":"keine","rang":105,"wesentlich":false,"untergruppe":"Öffnen","folgt":true},{"id":"projekt.teilen","familie":"Datei","titel":"befehl.projekt.teilen","parameter":{},"bezug":"keine","rang":106,"wesentlich":false,"untergruppe":"Projekt","folgt":true},{"id":"projekt.einladen","familie":"Datei","titel":"befehl.projekt.einladen","parameter":{},"bezug":"keine","rang":107,"wesentlich":false,"untergruppe":"Projekt","folgt":true},{"id":"bearbeiten.rueckgaengig","familie":"Bearbeiten","titel":"befehl.bearbeiten.rueckgaengig","parameter":{},"bezug":"keine","rang":108,"wesentlich":true,"untergruppe":"Verlauf","kuerzel":"Mod+Z","kontext":true},{"id":"bearbeiten.wiederholen","familie":"Bearbeiten","titel":"befehl.bearbeiten.wiederholen","parameter":{},"bezug":"keine","rang":109,"wesentlich":true,"untergruppe":"Verlauf","kuerzel":"Mod+Umschalt+Z","kontext":true},{"id":"element.duplizieren","handlung":"duplizieren","familie":"Bearbeiten","titel":"befehl.element.duplizieren","parameter":{},"bezug":"element","rang":1,"wesentlich":true,"untergruppe":"Element","kuerzel":"Mod+D"},{"id":"element.umbenennen","familie":"Bearbeiten","titel":"befehl.element.umbenennen","parameter":{"name":{"typ":"text"}},"bezug":"element","rang":2,"wesentlich":true,"untergruppe":"Element","kuerzel":"F2"},{"id":"element.verwerfen","handlung":"verwerfen","familie":"Bearbeiten","titel":"befehl.element.verwerfen","parameter":{},"bezug":"element","rang":3,"wesentlich":true,"untergruppe":"Element","kuerzel":"Entf"},{"id":"auswahl.duplizieren","handlung":"duplizieren","familie":"Bearbeiten","titel":"befehl.auswahl.duplizieren","parameter":{},"bezug":"mehrfach","rang":12,"wesentlich":true,"untergruppe":"Element"},{"id":"auswahl.verwerfen","handlung":"verwerfen","familie":"Bearbeiten","titel":"befehl.auswahl.verwerfen","parameter":{},"bezug":"mehrfach","rang":13,"wesentlich":true,"untergruppe":"Element"},{"id":"element.zurueckholen","familie":"Bearbeiten","titel":"befehl.element.zurueckholen","parameter":{},"bezug":"verworfen","rang":7,"wesentlich":true,"untergruppe":"Element"},{"id":"element.wert-setzen","familie":"Bearbeiten","titel":"befehl.element.wert-setzen","parameter":{"element":{"typ":"referenz"},"name":{"typ":"text"},"wert":{"dimension":"laenge","einheit":"mm"}},"bezug":"element","rang":11,"wesentlich":true,"untergruppe":"Werte"},{"id":"element.parameter-anlegen","familie":"Bearbeiten","titel":"befehl.element.parameter-anlegen","parameter":{},"bezug":"element","rang":117,"wesentlich":false,"untergruppe":"Werte","folgt":true},{"id":"bearbeiten.einfuegen","familie":"Bearbeiten","titel":"befehl.bearbeiten.einfuegen","parameter":{},"bezug":"keine","rang":118,"wesentlich":false,"untergruppe":"Element","folgt":true},{"id":"element.pausieren","familie":"Bearbeiten","titel":"befehl.element.pausieren","parameter":{},"bezug":"element","rang":119,"wesentlich":false,"untergruppe":"Berechnung"},{"id":"element.fortsetzen","familie":"Bearbeiten","titel":"befehl.element.fortsetzen","parameter":{},"bezug":"element","rang":120,"wesentlich":false,"untergruppe":"Berechnung"},{"id":"auswahl.alles","familie":"Auswahl","titel":"befehl.auswahl.alles","parameter":{},"bezug":"keine","rang":121,"wesentlich":true,"untergruppe":"Auswahl","kuerzel":"Mod+A","kontext":true},{"id":"auswahl.aufheben","familie":"Auswahl","titel":"befehl.auswahl.aufheben","parameter":{},"bezug":"mehrfach","rang":122,"wesentlich":true,"untergruppe":"Auswahl"},{"id":"auswahl.umkehren","familie":"Auswahl","titel":"befehl.auswahl.umkehren","parameter":{},"bezug":"keine","rang":123,"wesentlich":false,"untergruppe":"Auswahl","kontext":true},{"id":"auswahl.setzen","familie":"Auswahl","titel":"befehl.auswahl.setzen","parameter":{"elemente":{"typ":"referenz"}},"bezug":"keine","rang":124,"wesentlich":false,"untergruppe":"Befehle","folgt":true},{"id":"auswahl.hinzufuegen","familie":"Auswahl","titel":"befehl.auswahl.hinzufuegen","parameter":{"elemente":{"typ":"referenz"}},"bezug":"keine","rang":125,"wesentlich":false,"untergruppe":"Befehle","folgt":true},{"id":"auswahl.umschalten","familie":"Auswahl","titel":"befehl.auswahl.umschalten","parameter":{"elemente":{"typ":"referenz"}},"bezug":"keine","rang":126,"wesentlich":false,"untergruppe":"Befehle","folgt":true},{"id":"auswahl.aehnliche","familie":"Auswahl","titel":"befehl.auswahl.aehnliche","parameter":{},"bezug":"element","rang":127,"wesentlich":false,"untergruppe":"Regeln","folgt":true},{"id":"auswahl.kantenschleife","familie":"Auswahl","titel":"befehl.auswahl.kantenschleife","parameter":{},"bezug":"kante","rang":128,"wesentlich":false,"untergruppe":"Regeln","folgt":true},{"id":"ansicht.einpassen","familie":"Ansicht","titel":"befehl.ansicht.einpassen","parameter":{},"bezug":"keine","rang":129,"wesentlich":true,"untergruppe":"Blick","kontext":true},{"id":"ansicht.auf-auswahl","familie":"Ansicht","titel":"befehl.ansicht.auf-auswahl","parameter":{},"bezug":"keine","rang":5,"wesentlich":true,"untergruppe":"Blick","kuerzel":"F","kontext":true},{"id":"ansicht.projektion","familie":"Ansicht","titel":"befehl.ansicht.projektion","parameter":{},"bezug":"keine","rang":131,"wesentlich":true,"untergruppe":"Blick","kontext":true},{"id":"ansicht.vorne","familie":"Ansicht","titel":"befehl.ansicht.vorne","parameter":{},"bezug":"keine","rang":132,"wesentlich":false,"untergruppe":"Blick"},{"id":"ansicht.oben","familie":"Ansicht","titel":"befehl.ansicht.oben","parameter":{},"bezug":"keine","rang":133,"wesentlich":false,"untergruppe":"Blick"},{"id":"ansicht.isometrisch","familie":"Ansicht","titel":"befehl.ansicht.isometrisch","parameter":{},"bezug":"keine","rang":134,"wesentlich":false,"untergruppe":"Blick"},{"id":"ansicht.schnitt","familie":"Ansicht","titel":"befehl.ansicht.schnitt","parameter":{},"bezug":"keine","rang":135,"wesentlich":false,"untergruppe":"Blick","folgt":true},{"id":"darstellung.wechseln","familie":"Ansicht","titel":"befehl.darstellung.wechseln","parameter":{},"bezug":"keine","rang":136,"wesentlich":true,"untergruppe":"Darstellung","kuerzel":"W","kontext":true},{"id":"ansicht.isolieren","familie":"Ansicht","titel":"befehl.ansicht.isolieren","parameter":{},"bezug":"keine","rang":137,"wesentlich":true,"untergruppe":"Darstellung","kontext":true},{"id":"ansicht.alles-einblenden","familie":"Ansicht","titel":"befehl.ansicht.alles-einblenden","parameter":{},"bezug":"keine","rang":138,"wesentlich":true,"untergruppe":"Darstellung","kuerzel":"Alt+H","kontext":true},{"id":"ansicht.verworfenes","familie":"Ansicht","titel":"befehl.ansicht.verworfenes","parameter":{},"bezug":"keine","rang":139,"wesentlich":false,"untergruppe":"Darstellung"},{"id":"ansicht.ergebnis","familie":"Ansicht","titel":"befehl.ansicht.ergebnis","parameter":{},"bezug":"keine","rang":140,"wesentlich":false,"untergruppe":"Stand","folgt":true},{"id":"ansicht.alle-entwuerfe","familie":"Ansicht","titel":"befehl.ansicht.alle-entwuerfe","parameter":{},"bezug":"keine","rang":141,"wesentlich":false,"untergruppe":"Stand","folgt":true},{"id":"element.ausblenden","handlung":"ausblenden","familie":"Sichtbarkeit","titel":"befehl.element.ausblenden","parameter":{},"bezug":"element","rang":4,"wesentlich":true,"untergruppe":"Sichtbarkeit","kuerzel":"H"},{"id":"element.einblenden","familie":"Sichtbarkeit","titel":"befehl.element.einblenden","parameter":{},"bezug":"element","rang":8,"wesentlich":true,"untergruppe":"Sichtbarkeit"},{"id":"auswahl.ausblenden","handlung":"ausblenden","familie":"Sichtbarkeit","titel":"befehl.auswahl.ausblenden","parameter":{},"bezug":"mehrfach","rang":14,"wesentlich":true,"untergruppe":"Sichtbarkeit"},{"id":"sichtbarkeit.nur-dieses","familie":"Sichtbarkeit","titel":"befehl.sichtbarkeit.nur-dieses","parameter":{},"bezug":"element","rang":145,"wesentlich":false,"untergruppe":"Sichtbarkeit","folgt":true},{"id":"sichtbarkeit.farbe-setzen","familie":"Sichtbarkeit","titel":"befehl.sichtbarkeit.farbe-setzen","parameter":{},"bezug":"element","rang":146,"wesentlich":false,"untergruppe":"Sichtbarkeit","folgt":true},{"id":"ansicht.speichern","familie":"Ansicht speichern","titel":"befehl.ansicht.speichern","parameter":{"name":{"typ":"text"}},"bezug":"keine","rang":147,"wesentlich":false,"untergruppe":"Gespeichert","kontext":true},{"id":"ansicht.anwenden","familie":"Ansicht speichern","titel":"befehl.ansicht.anwenden","parameter":{},"bezug":"ansicht","rang":9,"wesentlich":true,"untergruppe":"Gespeichert"},{"id":"fenster.struktur","familie":"Fenster","titel":"befehl.fenster.struktur","parameter":{},"bezug":"keine","rang":149,"wesentlich":true,"untergruppe":"Zonen","kuerzel":"Mod+B"},{"id":"fenster.panel","familie":"Fenster","titel":"befehl.fenster.panel","parameter":{},"bezug":"keine","rang":150,"wesentlich":true,"untergruppe":"Zonen","kuerzel":"Mod+J"},{"id":"fenster.rechts","familie":"Fenster","titel":"befehl.fenster.rechts","parameter":{},"bezug":"keine","rang":151,"wesentlich":true,"untergruppe":"Zonen","kuerzel":"Mod+Alt+B"},{"id":"fenster.naechste-zone","familie":"Fenster","titel":"befehl.fenster.naechste-zone","parameter":{},"bezug":"keine","rang":152,"wesentlich":false,"untergruppe":"Zonen","kuerzel":"F6"},{"id":"suche.oeffnen","familie":"Fenster","titel":"befehl.suche.oeffnen","parameter":{},"bezug":"keine","rang":153,"wesentlich":true,"untergruppe":"Suche","kuerzel":"Mod+K"},{"id":"fenster.teilen","familie":"Fenster","titel":"befehl.fenster.teilen","parameter":{},"bezug":"keine","rang":154,"wesentlich":false,"untergruppe":"Fenster","folgt":true},{"id":"thema.umschalten","familie":"Fenster","titel":"befehl.thema.umschalten","parameter":{},"bezug":"keine","rang":155,"wesentlich":false,"untergruppe":"Einstellungen"},{"id":"einstellung.navigationsprofil","familie":"Fenster","titel":"befehl.einstellung.navigationsprofil","parameter":{"profil":{"typ":"wahl"}},"bezug":"keine","rang":156,"wesentlich":false,"untergruppe":"Einstellungen"},{"id":"katalog.oeffnen","familie":"Hilfe","titel":"befehl.katalog.oeffnen","parameter":{},"bezug":"keine","rang":157,"wesentlich":false,"untergruppe":"Hilfe"},{"id":"hilfe.befehle-zeigen","familie":"Hilfe","titel":"befehl.hilfe.befehle-zeigen","parameter":{},"bezug":"keine","rang":158,"wesentlich":false,"untergruppe":"Hilfe"},{"id":"hilfe.einfuehrung","familie":"Hilfe","titel":"befehl.hilfe.einfuehrung","parameter":{},"bezug":"keine","rang":159,"wesentlich":false,"untergruppe":"Hilfe","folgt":true},{"id":"element.umhaengen","familie":"Baugruppe","titel":"befehl.element.umhaengen","parameter":{"ziel":{"typ":"referenz"}},"bezug":"teil","rang":10,"wesentlich":true,"untergruppe":"Hierarchie"},{"id":"element.aktivieren","familie":"Baugruppe","titel":"befehl.element.aktivieren","parameter":{},"bezug":"teil","rang":6,"wesentlich":true,"untergruppe":"Hierarchie"},{"id":"element.verlassen","familie":"Baugruppe","titel":"befehl.element.verlassen","parameter":{},"bezug":"keine","rang":162,"wesentlich":true,"untergruppe":"Hierarchie","kontext":true},{"id":"baugruppe.anlegen","familie":"Baugruppe","titel":"befehl.baugruppe.anlegen","parameter":{},"bezug":"keine","rang":163,"wesentlich":false,"untergruppe":"Hierarchie","kontext":true},{"id":"baugruppe.instanz-anlegen","familie":"Baugruppe","titel":"befehl.baugruppe.instanz-anlegen","parameter":{},"bezug":"baugruppe","rang":164,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"baugruppe.variante-waehlen","familie":"Baugruppe","titel":"befehl.baugruppe.variante-waehlen","parameter":{},"bezug":"baugruppe","rang":165,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"verbindung.anlegen","familie":"Baugruppe","titel":"befehl.verbindung.anlegen","parameter":{},"bezug":"baugruppe","rang":166,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"verbindung.verbindungspunkt-setzen","familie":"Baugruppe","titel":"befehl.verbindung.verbindungspunkt-setzen","parameter":{},"bezug":"baugruppe","rang":167,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"verbindung.bewegen","familie":"Baugruppe","titel":"befehl.verbindung.bewegen","parameter":{},"bezug":"baugruppe","rang":168,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"baugruppe.kollision-pruefen","familie":"Baugruppe","titel":"befehl.baugruppe.kollision-pruefen","parameter":{},"bezug":"baugruppe","rang":169,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"baugruppe.fixieren","familie":"Baugruppe","titel":"befehl.baugruppe.fixieren","parameter":{},"bezug":"teil","rang":170,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"baugruppe.komponente-anlegen","familie":"Baugruppe","titel":"befehl.baugruppe.komponente-anlegen","parameter":{},"bezug":"teil","rang":171,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"simulation.lager","familie":"Simulation","titel":"befehl.simulation.lager","parameter":{},"bezug":"keine","rang":172,"wesentlich":true,"untergruppe":"Studie","folgt":true},{"id":"simulation.kraft","familie":"Simulation","titel":"befehl.simulation.kraft","parameter":{},"bezug":"keine","rang":173,"wesentlich":true,"untergruppe":"Studie","folgt":true},{"id":"simulation.ergebnis","familie":"Simulation","titel":"befehl.simulation.ergebnis","parameter":{},"bezug":"keine","rang":174,"wesentlich":true,"untergruppe":"Studie","folgt":true},{"id":"chat.senden","familie":"Chat","titel":"befehl.chat.senden","parameter":{},"bezug":"keine","rang":175,"wesentlich":true,"untergruppe":"Chat"},{"id":"chat.uebernehmen","familie":"Chat","titel":"befehl.chat.uebernehmen","parameter":{},"bezug":"keine","rang":176,"wesentlich":true,"untergruppe":"Chat"},{"id":"chat.verwerfen","familie":"Chat","titel":"befehl.chat.verwerfen","parameter":{},"bezug":"keine","rang":177,"wesentlich":true,"untergruppe":"Chat"},{"id":"task.wechseln","familie":"Fenster","titel":"befehl.task.wechseln","parameter":{},"bezug":"keine","rang":178,"wesentlich":false,"untergruppe":"Zonen"},{"id":"dokument.wechseln","familie":"Fenster","titel":"befehl.dokument.wechseln","parameter":{},"bezug":"keine","rang":179,"wesentlich":false,"untergruppe":"Zonen"},{"id":"referenz.koordinatensystem","familie":"Referenz","titel":"befehl.referenz.koordinatensystem","parameter":{},"bezug":"keine","rang":0.5,"wesentlich":true,"untergruppe":"Koordinatensystem"},{"id":"referenz.punkt","familie":"Referenz","titel":"befehl.referenz.punkt","parameter":{},"bezug":"keine","rang":0.6,"wesentlich":true,"untergruppe":"Punkt"},{"id":"referenz.punkt-relativ","familie":"Referenz","titel":"befehl.referenz.punkt-relativ","parameter":{},"bezug":"punkt","rang":0.1,"wesentlich":true,"untergruppe":"Punkt"},{"id":"referenz.gerade","familie":"Referenz","titel":"befehl.referenz.gerade","parameter":{},"bezug":"punkte","rang":0.2,"wesentlich":true,"untergruppe":"Linie"},{"id":"referenz.halbgerade","familie":"Referenz","titel":"befehl.referenz.halbgerade","parameter":{},"bezug":"punkte","rang":0.3,"wesentlich":false,"untergruppe":"Linie"},{"id":"referenz.strecke","familie":"Referenz","titel":"befehl.referenz.strecke","parameter":{},"bezug":"punkte","rang":0.4,"wesentlich":true,"untergruppe":"Linie"}]'),yv={befehle:Sv},ir=12,Mv=["Bearbeiten","Auswahl","Baugruppe","Sichtbarkeit","Ansicht","Ansicht speichern","Datei","Fenster","Hilfe","Simulation","Chat","Referenz"],wv={Datei:"start-menue",Bearbeiten:"dropdown",Auswahl:"dropdown",Baugruppe:"dropdown",Simulation:"dropdown",Referenz:"dropdown",Ansicht:"ansichtsleiste","Ansicht speichern":"ansichtsleiste",Sichtbarkeit:"auge",Fenster:"menueleiste"};function Ev(n){if(n.folgt)return["suche-folgt"];const e=["suche","alle-befehle"],t=wv[n.familie];return t&&e.push(t),!Lu(n)&&(n.bezug!=="keine"||n.kontext)&&e.push("kontextmenue"),e}const Ni=yv.befehle;function Av(n){return(Array.isArray(n)?n:n.befehle??[]).map((t,i)=>({id:String(t.id),familie:t.familie??"Hilfe",titel:t.titel??String(t.id),parameter:t.parameter??{},bezug:t.bezug??"keine",rang:t.rang??1e3+i,wesentlich:t.wesentlich??!1,kuerzel:t.kuerzel,untergruppe:t.untergruppe,kontext:t.kontext,folgt:t.folgt,handlung:t.handlung}))}const Pu={keine:new Set(["keine"]),schritt:new Set(["keine","element"]),teil:new Set(["keine","element","teil"]),baugruppe:new Set(["keine","element","baugruppe"]),kante:new Set(["keine","kante"]),mehrfach:new Set(["keine","mehrfach"]),verworfen:new Set(["keine","element","verworfen"]),ansicht:new Set(["keine","element","ansicht"]),punkt:new Set(["keine","element","punkt"]),punkte:new Set(["keine","mehrfach","punkte"])};function Tv(n,e){const t=new Map;for(const r of n.filter(s=>s.familie===e)){const s=r.untergruppe??"Weitere";t.set(s,[...t.get(s)??[],r])}const i=[];for(const[r,s]of t)for(let a=0;a<s.length;a+=ir)i.push({name:a===0?r:`${r} ${Math.floor(a/ir)+1}`,eintraege:s.slice(a,a+ir)});return i}const Sc=8,Rv=new Set(["bearbeiten.rueckgaengig","bearbeiten.wiederholen","fenster.struktur","fenster.panel","fenster.rechts","suche.oeffnen"]),kv=["ansicht.einpassen","ansicht.auf-auswahl","ansicht.isolieren","ansicht.alles-einblenden","ansicht.projektion","darstellung.wechseln"],Cv=new Set(["Ansicht","Fenster"]),Pv=new Set(["bearbeiten.rueckgaengig","bearbeiten.wiederholen"]),Lu=n=>Cv.has(n.familie)||Pv.has(n.id);function Lv(n,e,t){if(!e.handlung)return!0;const i=n.filter(s=>s.handlung===e.handlung&&!s.folgt);return(i.find(s=>Pu[t].has(s.bezug))??i.find(s=>s.bezug==="element")??e)===e}function yc(n,e){const t=[...new Set([...Mv,...n.map(r=>r.familie)])],i=[];for(const r of t){const s=n.filter(a=>a.familie===r);for(let a=0;a<s.length;a+=e?ir:s.length||1)i.push({familie:r,eintraege:s.slice(a,a+(e?ir:s.length))})}return i.filter(r=>r.eintraege.length)}function pr(n,e,t=()=>!0){const i=n.filter(r=>!r.folgt&&!Lu(r)&&Pu[e].has(r.bezug)&&(r.bezug!=="keine"||r.kontext)&&t(r)).sort((r,s)=>r.rang-s.rang);return{kandidaten:i,sichtbar:yc(i.slice(0,Sc),!1),mehr:yc(i.slice(Sc),!0)}}const Dv=5;function Eo(n){return n.kandidaten.slice(0,Dv)}const zv={titel:"profil.standard",maus:{drehen:[{taste:2}],verschieben:[{taste:1},{taste:2,umschalt:!0}],zoomen:[{rad:!0}]},trackpad:{drehen:[{wischen:!0}],verschieben:[{wischen:!0,umschalt:!0}],zoomen:[{spreizen:!0}]},touch:{drehen:[{finger:1}],verschieben:[{finger:2,ziehen:!0}],zoomen:[{finger:2,spreizen:!0}]}},Iv={titel:"profil.solidworks",maus:{drehen:[{taste:1}],verschieben:[{taste:1,strg:!0}],zoomen:[{rad:!0}]},trackpad:{drehen:[{wischen:!0}],verschieben:[{wischen:!0,umschalt:!0}],zoomen:[{spreizen:!0}]},touch:{drehen:[{finger:1}],verschieben:[{finger:2,ziehen:!0}],zoomen:[{finger:2,spreizen:!0}]}},Du={standard:zv,solidworks:Iv},zu={frame:{frame:"frame",origin:"point",x:"line",y:"line",z:"line",xy:"plane",yz:"plane",zx:"plane"},point:{point:"point"},axis:{line:"line"},plane:{plane:"plane"},line:{line:"line"},ray:{ray:"ray",start:"point"},segment:{segment:"segment",start:"point",end:"point"}},Nv={frame:{x:"length",y:"length",z:"length",rx:"angle",ry:"angle",rz:"angle"},point:{x:"length",y:"length",z:"length"}},mr=n=>n in zu,Mc=1e4,Uv=100,Fv=50,ba=6,Et=n=>!Array.isArray(n)||n.length!==3?null:n.map(e=>Number(e.value)),Yt=(n,e,t=1)=>[n[0]+e[0]*t,n[1]+e[1]*t,n[2]+e[2]*t],Ov=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Sa=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],Bv=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],Vv=n=>JSON.stringify(n,(e,t)=>t&&typeof t=="object"&&!Array.isArray(t)?Object.fromEntries(Object.entries(t).sort(([i],[r])=>i<r?-1:i>r?1:0)):t);function Iu(n){return{id:n.id,type:n.type,inputs:{...n.inputs??{}},params:n.params,outputs:{...zu[n.type]??{}},content:n.content.filter(e=>mr(e.type)).map(Iu),meta:n.meta}}function Hv(n){const e=[],t=i=>{for(const r of i.content)mr(r.type)?e.push(r):t(r)};return t(n),e}class Gv{constructor(e){this.app=e}ergebnis=null;ergebnisSchluessel="";laeuft="";nummer=0;bruecke=null;brueckeFrage=null;nichtErreichbar=null;modus=null;feldFokus=null;einpassen=!1;graph(){return Hv(this.app.dokument())}aktiv(){return this.graph().length>0}schluessel(){return Vv(this.graph().map(Iu))}anstossen(){if(!this.aktiv())return;const e=this.schluessel();if(e===this.ergebnisSchluessel||e===this.laeuft||this.nichtErreichbar?.schluessel===e)return;this.laeuft=e;const t=this.nummer+=1;this.rechnen(e,t)}bereit(){if(!this.aktiv())return!0;const e=this.schluessel();return e===this.ergebnisSchluessel||this.nichtErreichbar?.schluessel===e}brueckeDa(){return this.bruecke!==null?Promise.resolve(this.bruecke):(this.brueckeFrage??=fetch("kernel-status.json",{cache:"no-store"}).then(e=>e.ok?e.json():{bruecke:!1}).then(e=>this.bruecke=e.bruecke===!0).catch(()=>this.bruecke=!1),this.brueckeFrage)}async rechnen(e,t){const i={schema_version:1,elements:JSON.parse(e)};let r=null,s="";if(!await this.brueckeDa())s="keine Brücke";else try{const o=await(await fetch("kernel",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})).json();o.befunde?.some(l=>l.code==="kernel_unavailable")?s="Worker":r=o}catch(a){s=String(a)}if(t===this.nummer){if(this.laeuft="",r){const a=this.befundZahl(r)>this.befundZahl(this.ergebnis);this.ergebnis=r,this.ergebnisSchluessel=e,this.nichtErreichbar=null,a&&(this.app.zonen.panel=!0)}else this.nichtErreichbar={schluessel:e,text:s},this.app.zonen.panel=!0;this.app.rendern()}}befundZahl(e){return e?e.results.filter(t=>t.state==="fehlerhaft").length:0}resultat(e){return this.ergebnis?.results.find(t=>t.id===e)}befunde(){if(!this.aktiv())return[];const e=[],t=new Set(St(this.app.dokument()).map(i=>i.id));if(this.nichtErreichbar&&this.nichtErreichbar.schluessel===this.schluessel()){const i=this.graph().filter(s=>!wt(s)),r=i[i.length-1];return r&&e.push({elementId:r.id,code:"kernel_unavailable",schluessel:"kernel.befund.kernel_unavailable",text:this.app.t("kernel.befund.kernel_unavailable")}),e}if(this.ergebnisSchluessel!==this.schluessel()&&!this.ergebnis)return e;for(const i of this.ergebnis?.results??[]){if(i.state!=="fehlerhaft"||!t.has(i.id))continue;const r=ht(this.app.dokument(),i.id);if(!(!r||wt(r)))for(const s of i.befunde)e.push({elementId:i.id,code:s.code,schluessel:`kernel.befund.${s.code}`,text:this.app.t(`kernel.befund.${s.code}`,{bezug:s.bezug?this.app.name(s.bezug):""})})}return e}haupt(e){const t=this.resultat(e.id);if(!t||t.state!=="aktuell")return null;const i={frame:"origin",axis:"line",plane:"plane"}[e.type]??e.type;return t.outputs[i]??null}artVon(e){return{frame:"koordinatensystem",point:"punkt",axis:"achse",plane:"ebene"}[e.type]??"linie"}lage(e){const t=this.haupt(e);if(!t)return null;if(t.type==="point")return Et(t.position);const i={};for(const r of["origin","direction","start","end","normal","x_direction"]){const s=Et(t[r]);s&&(i[r]=s)}return i}szene(){if(!this.ergebnis)return[];const e=new Set(this.ergebnis.results.map(i=>i.id)),t=[];for(const i of St(this.app.dokument()))!mr(i.type)||wt(i)||!e.has(i.id)||this.verworfenerVorfahre(i.id)||t.push({element:i.id,art:this.artVon(i),sichtbar:!this.app.istAusgeblendet(i.id)&&!this.app.versteckteIds().has(i.id),lage_mm:this.lage(i)});return t}verworfenerVorfahre(e){const t=this.app.dokument(),i=[],r=s=>{if(s.id===e)return!0;for(const a of s.content){if(i.push(a),r(a))return!0;i.pop()}return!1};return r(t),i.slice(0,-1).some(wt)}zeichnung(){const e=new Set(this.app.auswahlIds()),t=[];for(const i of this.szene()){if(!i.sichtbar||!i.lage_mm)continue;const r=ht(this.app.dokument(),i.element),s=this.geometrie(r);s&&t.push({element:i.element,art:i.art,punkte:s,token:this.token(r),gewaehlt:e.has(i.element),fehlerhaft:this.app.istFehlerhaft(i.element)})}return t}token(e){if(e.type==="axis"){const t=String(e.inputs?.of??"").split(".")[1];if(t==="x"||t==="y"||t==="z")return`achse.${t}`}return"text"}geometrie(e){const t=this.haupt(e);if(!t)return null;if(t.type==="point"){const i=Et(t.position);return i?[i]:null}if(t.type==="segment"){const i=Et(t.start),r=Et(t.end);return i&&r?[i,r]:null}if(t.type==="line"||t.type==="ray"){const i=Et(t.origin),r=Et(t.direction);return!i||!r?null:e.type==="axis"?[i,Yt(i,r,Uv)]:[t.type==="ray"?i:Yt(i,r,-Mc),Yt(i,r,Mc)]}if(t.type==="plane"){const i=Et(t.origin),r=Et(t.normal),s=Et(t.x_direction);if(!i||!r||!s)return null;const a=Ov(r,s),o=Fv;return[Yt(Yt(i,s,-o),a,-o),Yt(Yt(i,s,o),a,-o),Yt(Yt(i,s,o),a,o),Yt(Yt(i,s,-o),a,o)]}return null}huelle(){const e=[];for(const r of this.zeichnung()){const s=ht(this.app.dokument(),r.element);if(s&&(s.type==="line"||s.type==="ray")){const a=this.haupt(s),o=a?Et(a.origin):null;o&&e.push(o)}else e.push(...r.punkte)}if(!e.length)return null;const t=[1/0,1/0,1/0],i=[-1/0,-1/0,-1/0];for(const r of e)for(let s=0;s<3;s++)t[s]=Math.min(t[s],r[s]),i[s]=Math.max(i[s],r[s]);return{min:t,max:i}}bildschirm(e,t){const i=ht(this.app.dokument(),e),r=this.app.szene;if(!i||!r)return null;const s=this.geometrie(i);if(!s||!s.length)return null;let a=s[0];if(i.type==="plane")a=t==="ecke"?s[2]:this.mitte(s);else if(i.type==="segment"||i.type==="axis")a=t==="mitte"||!t?this.mitte(s):s[0],i.type==="segment"&&!t&&(a=this.mitte(s));else if(i.type==="line"||i.type==="ray"){const o=this.haupt(i);a=(o?Et(o.origin):null)??a}return r.projiziere(a)}mitte(e){const t=[0,0,0];for(const i of e)for(let r=0;r<3;r++)t[r]=t[r]+i[r]/e.length;return t}treffer(e,t,i){const r=this.app.szene;if(!r)return null;let s=null;for(const a of this.zeichnung()){const o=ht(this.app.dokument(),a.element);if(i&&o.type!==i||a.art==="koordinatensystem")continue;const l=a.punkte.map(f=>r.projiziere(f));let c=1/0,u=1;if(a.art==="punkt")u=0,c=Math.hypot(e-(l[0]?.x??0),t-(l[0]?.y??0));else if(a.art==="ebene"){u=2;for(let f=0;f<l.length;f++)c=Math.min(c,wc(e,t,l[f],l[(f+1)%l.length]));c>ba&&Wv(e,t,l)&&(c=ba-.01)}else c=wc(e,t,l[0],l[1]);c>ba||(!s||u<s.rang||u===s.rang&&c<s.d)&&(s={id:a.element,rang:u,d:c})}return s?.id??null}huelleBildschirm(e){const t=ht(this.app.dokument(),e),i=this.app.szene;if(!t||!i||!mr(t.type))return null;let r=this.geometrie(t);if(t.type==="frame"){const a=this.haupt(t),o=a?Et(a.position):null;r=o?[o]:null}if(!r)return null;if(t.type==="line"||t.type==="ray"){const a=this.haupt(t),o=a?Et(a.origin):null,l=a?Et(a.direction):null;o&&l&&(r=[o,Yt(o,l,60)])}const s=6;return r.flatMap(a=>{const o=i.projiziere(a);return[{x:o.x-s,y:o.y-s},{x:o.x+s,y:o.y-s},{x:o.x+s,y:o.y+s},{x:o.x-s,y:o.y+s}]})}abbrechen(){return this.modus?(this.modus=null,this.app.meldung("rueck.draht.abgebrochen"),this.app.rendern(),!0):!1}klick(e,t,i){if(this.modus?.art==="punkt")return this.punktAusKlick(e,t)&&(this.modus=null),!0;if(this.modus?.art==="linie"){const s=this.treffer(e,t,"point");if(!s)return!0;const a=this.modus;return a.punkte=[...a.punkte,s],a.punkte.length>=2?(this.modus=null,this.linieAnlegen(a.typ,a.punkte[0],a.punkte[1],"menue")):this.app.meldung("rueck.draht.zweiter-punkt"),this.app.rendern(),!0}if(!this.aktiv())return!1;const r=this.treffer(e,t);return r?(this.app.waehle(r,i),!0):!1}kontext(e,t){if(!this.aktiv())return!1;const i=this.treffer(e,t);return i?(this.app.auswahlIds().includes(i)||this.app.waehle(i,"setzen"),!0):!1}zielFrame(){const e=this.app.gewaehlteElemente().filter(i=>i.type==="frame"&&!wt(i));if(e.length===1)return e[0];const t=St(this.app.dokument()).filter(i=>i.type==="frame"&&!wt(i)&&this.resultat(i.id)?.state==="aktuell");return t[t.length-1]??null}frameLage(e){const t=e?this.resultat(e.id)?.outputs.frame:void 0,i=t?Et(t.origin):null,r=t?Et(t.x):null,s=t?Et(t.y):null,a=t?Et(t.z):null;return i&&r&&s&&a?{t:i,x:r,y:s,z:a}:{t:[0,0,0],x:[1,0,0],y:[0,1,0],z:[0,0,1]}}punktAusKlick(e,t){const i=this.zielFrame(),r=this.frameLage(i),s=this.app.szene?.aufEbene(e,t,r.t,r.z);if(!s)return null;const a=Bv(s,r.t),o=[Sa(a,r.x),Sa(a,r.y),Sa(a,r.z)],l=c=>Math.round(c*1e6)/1e6;return this.punktAnlegen(i?{frame:`${i.id}.frame`}:{},{x:l(o[0]),y:l(o[1]),z:0},"menue")}freieId(e){const t=new Set(St(this.app.projekt).map(r=>r.id));let i=1;for(;t.has(`${e}${i}`);)i+=1;return`${e}${i}`}einfuegeStelle(e){return(this.app.aktiv?ht(e,this.app.aktiv):void 0)??e}neu(e,t,i,r={},s={},a=[]){return{id:e,type:t,inputs:s,params:r,content:a,meta:{name:i}}}koordinatensystemAnlegen(e){const t=this.app.t,i=this.app.gewaehlteElemente(),r=i.length===1&&i[0]?.type==="frame"?i[0].id:null,s=this.freieId("K"),a=s.slice(1),o=f=>({value:f,unit:"mm"}),l=f=>({value:f,unit:"deg"}),c=[this.neu(`${s}-ursprung`,"point",t("draht.kind.ursprung"),{x:o(0),y:o(0),z:o(0)},{frame:`${s}.frame`}),...["x","y","z"].map(f=>this.neu(`${s}-${f}`,"axis",t(`draht.kind.${f}`),{},{of:`${s}.${f}`})),...["xy","yz","zx"].map(f=>this.neu(`${s}-${f}`,"plane",t(`draht.kind.${f}`),{},{of:`${s}.${f}`}))],u=this.neu(s,"frame",t("draht.name.koordinatensystem",{n:a}),{x:o(0),y:o(0),z:o(0),rx:l(0),ry:l(0),rz:l(0)},r?{parent:`${r}.frame`}:{},c);return this.app.aendern(f=>this.einfuegeStelle(f).content.push(u)),this.app.protokolliere("referenz.koordinatensystem",r?{parent:r}:{},e,"mensch"),this.app.auswahl=[{element_id:s}],this.app.meldung("rueck.angelegt",{name:u.meta.name}),s}punktAnlegen(e,t,i){const r=this.freieId("P"),s=o=>({value:o,unit:"mm"}),a=this.neu(r,"point",this.app.t("draht.name.punkt",{n:r.slice(1)}),{x:s(t.x),y:s(t.y),z:s(t.z)},e);return this.app.aendern(o=>this.einfuegeStelle(o).content.push(a)),this.app.protokolliere("referenz.punkt",{element:r,...e},i,"mensch"),this.app.auswahl=[{element_id:r}],this.app.meldung("rueck.angelegt",{name:a.meta.name}),r}linieAnlegen(e,t,i,r){const s={line:"G",ray:"H",segment:"S"}[e]??"L",a=this.freieId(s),o=this.neu(a,e,this.app.t(`draht.name.${e}`,{n:a.slice(1)}),{},{a:`${t}.point`,b:`${i}.point`});return this.app.aendern(l=>this.einfuegeStelle(l).content.push(o)),this.app.protokolliere(`referenz.${{line:"gerade",ray:"halbgerade",segment:"strecke"}[e]}`,{a:t,b:i},r,"mensch"),this.app.meldung("rueck.angelegt",{name:o.meta.name}),a}gewaehltePunkte(){return this.app.auswahlIds().filter(e=>{const t=this.app.find(e);return!!t&&t.type==="point"&&!wt(t)})}}function wc(n,e,t,i){const r=i.x-t.x,s=i.y-t.y,a=r*r+s*s||1,o=Math.max(0,Math.min(1,((n-t.x)*r+(e-t.y)*s)/a));return Math.hypot(n-(t.x+o*r),e-(t.y+o*s))}function Wv(n,e,t){let i=!1;for(let r=0,s=t.length-1;r<t.length;s=r++){const a=t[r],o=t[s];a.y>e!=o.y>e&&n<(o.x-a.x)*(e-a.y)/(o.y-a.y)+a.x&&(i=!i)}return i}function Xv(n,e){const t=n.trim().replace(/\s+/g," ").match(/^([+-]?\d+(?:[.,]\d+)?(?:e[+-]?\d+)?)\s*(mm|cm|m|°|deg|rad)?$/i);if(!t)return null;const i=Number(t[1].replace(",","."));if(!Number.isFinite(i))return null;const r=(t[2]??"").toLowerCase(),s=r==="°"?"deg":r||(e==="length"?"mm":"deg"),a=["mm","cm","m"].includes(s);return e==="length"!==a?null:{value:i,unit:s}}function $v(n,e){if(!n)return"";const t=e==="de"?String(n.value).replace(".",","):String(n.value);return n.unit==="deg"?`${t}°`:`${t} ${n.unit}`}const qv={menueleiste:"Menüleiste",taskleiste:"Taskleiste",struktur:"Struktur",modell:"Modell",eigenschaften:"Eigenschaften",chat:"Chat",panel:"Panel",rueckmeldung:"Rückmeldung"},Yv={start:"Start",folgt:"folgt",mehr:"Mehr …"},Zv={modellieren:"Modellieren",simulation:"Simulation (simuliert)",shop:"Shop (folgt)"},Kv="simuliert",Jv={platzhalter:"Befehle und Inhalte suchen",befehle:"Befehle",inhalte:"Inhalte","folgt-spaeter":"Folgt später","alle-zeigen":"Alle zeigen",nichts:"Nichts gefunden"},Qv={Datei:"Datei",Bearbeiten:"Bearbeiten",Auswahl:"Auswahl",Ansicht:"Ansicht",Sichtbarkeit:"Sichtbarkeit","Ansicht speichern":"Gespeicherte Ansichten",Fenster:"Fenster",Hilfe:"Hilfe",Baugruppe:"Baugruppe",Simulation:"Simulation",Chat:"Chat",Referenz:"Referenz"},jv={Neu:"Neu",Öffnen:"Öffnen",Projekt:"Projekt",Verlauf:"Verlauf",Element:"Element",Werte:"Werte",Berechnung:"Berechnung",Auswahl:"Auswahl",Befehle:"Auswahl setzen",Regeln:"Nach Regel",Zonen:"Zonen",Suche:"Suche",Fenster:"Fenster",Einstellungen:"Einstellungen",Hierarchie:"Hierarchie",Verbinden:"Verbinden",Studie:"Studie",Blick:"Blick",Darstellung:"Darstellung",Stand:"Stand",Sichtbarkeit:"Sichtbarkeit",Gespeichert:"Gespeichert",Hilfe:"Hilfe",Chat:"Chat",Weitere:"Weitere",Koordinatensystem:"Koordinatensystem",Punkt:"Punkt",Linie:"Linie"},e_={titel:"Struktur",wurzel:"Wurzel",leer:"Noch nichts da. Lege dein erstes Teil an.","leer-simulation":"Noch keine Studie. Die Simulation ist ein Platzhalter und simuliert.",verworfen:"verworfen"},t_={leer:"Das Modell ist leer."},n_={fertig:"Fertig"},i_={titel:"Pfad"},r_={titel:"Ansicht",mehr:"Mehr Ansichten"},s_={person:"Testperson B",kuerzel:"B"},a_={"zustand-unbekannt":"Zustand unbekannt",korrektur:"Letzten gültigen Wert setzen","bohrung-zu-gross":"Der Durchmesser {wert} ist zu groß; unter {grenze} ist die Bohrung gültig.","steg-ohne-hoehe":"Der Steg braucht eine Höhe über {grenze}."},o_={fehlerhaft:"fehlerhaft",pausiert:"pausiert",rechnet:"rechnet"},l_={befunde:"Befunde","keine-befunde":"Keine Befunde. Alles ist aktuell."},c_={fehler:{"nicht-lesbar":"Wert nicht lesbar. Beispiel: 12 mm",dimension:"Falsche Einheit für dieses Feld",teilung:"Teilen durch null geht nicht"}},u_={gemischt:"gemischt","n-elemente":"{n} Elemente","umbenennen-hinweis":"Doppelklick zum Umbenennen"},h_={masse:"Maße",material:"Material",ergebnis:"Ergebnis",ansicht:"Ansicht",lage:"Lage"},d_={laenge:"Länge",breite:"Breite",dicke:"Dicke",hoehe:"Höhe",eckradius:"Eckradius",durchmesser:"Durchmesser",wand:"Wand",material:"Material",dichte:"Dichte",abmessungen:"Abmessungen",volumen:"Volumen","masse-wert":"Masse",projektion:"Projektion",darstellung:"Darstellung",x:"x",y:"y",z:"z",rx:"Drehung x",ry:"Drehung y",rz:"Drehung z"},f_={orthogonal:"orthogonal",perspektivisch:"perspektivisch"},p_={koerper:"Körper",kanten:"Kanten",durchsicht:"Durchsicht"},m_={standard:"Standard",solidworks:"wie Onshape/SolidWorks"},g_={kopie:"Kopie",ansicht:"Ansicht",schnitt:"Schnitt"},v_={titel:"Chat",zu:"zu:","n-elemente":"{n} Elemente",platzhalter:"Frage oder Auftrag …",hinweis:"Zum Beispiel: Steg 40 mm hoch",uebernehmen:"Übernehmen",verwerfen:"Verwerfen",beispiel:{frage:"Der Steg soll 40 mm hoch werden."},antwort:{vorschlag:"Ich schlage diese Änderung vor. Schau dir die Vorschau an.",unklar:"Das habe ich nicht verstanden. Versuche: Steg 40 mm hoch, Kopie vom Steg oder Steg verwerfen.",erledigt:"Erledigt. Du kannst es mit Rückgängig zurücknehmen.",verworfen:"Der Vorschlag ist verworfen."},vorschlag:{wert:"{element}: {feld} auf {nachher}",duplizieren:"{element} duplizieren",verwerfen:"{element} verwerfen",anlegen:"Neues Element anlegen",begruendung:"Simulierter Vorschlag; erst nach dem Übernehmen gilt er."}},__={folgt:"{befehl} folgt in einer späteren Stufe.",angelegt:"{name} angelegt",dupliziert:"{name} angelegt",umbenannt:"Umbenannt in {name}",verworfen:"{name} verworfen; mit Rückgängig oder Zurückholen wieder da",zurueckgeholt:"{name} zurückgeholt","wert-gesetzt":"Wert an {name} geändert",umgehaengt:"{name} liegt jetzt in {ziel}","ansicht-gespeichert":"{name} gespeichert",rueckgaengig:"Letzten Schritt zurückgenommen",wiederholt:"Schritt wiederhergestellt",befund:"Befund bei {name}; die anderen Elemente bleiben bedienbar","ziel-waehlen":"Wähle in der Struktur das Ziel.","auswahl-ziel":"Wähle Elemente im Modell oder in der Struktur.","isolieren-ziel":"Wähle zuerst, was du isolieren willst.",draht:{"punkt-klicken":"Ins Modell klicken, um den Punkt zu setzen","zwei-punkte":"Zwei Punkte wählen","zweiter-punkt":"Zweiten Punkt wählen","einen-punkt":"Einen Punkt wählen",abgebrochen:"Abgebrochen"}},x_={"kein-ziel":"Hier kann nichts abgelegt werden.","nur-teile":"Nur Teile und Baugruppen lassen sich umhängen, Schritte bleiben in ihrem Teil.","eigener-nachfahre":"Ein Element kann nicht in sich selbst oder in sein eigenes Teil.","kein-behaelter":"Ein Teil nimmt keine anderen Elemente auf; wähle eine Baugruppe.","schon-darin":"Das Element liegt schon dort."},b_={titel:"Bausteinkatalog",einleitung:"Jeder Baustein ist hier so zu sehen, wie er im Prototyp wirklich gebaut ist. Wer eine neue Oberfläche baut, nimmt diese Seiten als Maßstab.",zurueck:"Zur Übersicht",ueberschrift:{regel:"Regel",bezug:"Bezug",befehle:"Befehle",tokens:"Tokens"},hell:"Hell",dunkel:"Dunkel",bezug:{muster:"Muster „{name}“ aus dem Musterkatalog.",kandidat:"Kandidat „{name}“, noch kein Muster."},baustein:{zustaende:"Elementzustände",auswahl:"Auswahl","struktur-zeile":"Struktur-Zeile",auge:"Auge",kontextmenue:"Kontextmenü",kontextaktionen:"Kontextaktionen",dropdown:"Dropdown",suche:"Suche",wertfeld:"Wertfeld",griff:"Griff","ziehen-ablegen":"Ziehen und Ablegen",statusanzeige:"Statusanzeige",befund:"Befund",rueckmeldung:"Rückmeldung",entscheidungskarte:"Entscheidungskarte",pfad:"Pfad","dokument-reiter":"Dokument-Reiter",ansichtsleiste:"Ansichtsleiste","fokus-tastatur":"Fokus und Tastatur"},regel:{zustaende:"Ein Element zeigt jeden Zustand über einen festen Kanal, damit sich Zustände nicht verdecken. Die Kontur gehört der Auswahl, dem Überfahren und der anderen Person, und es gewinnt genau eine: ausgewählt vor anderer Person vor überfahren. Status, Sichtbarkeit und Umfeld kommen immer zusätzlich dazu. Der Akzent steht nur für Auswahl und Überfahren.",auswahl:"Es gibt genau eine Auswahl für das ganze Fenster. Struktur, Modell, Eigenschaften und Chat lesen sie und ändern sie nur über dieselben Befehle. Ein Klick wählt, Umschalt fügt hinzu, Strg schaltet um, ein Klick ins Leere hebt auf. Die Eigenschaften zeigen bei mehreren nur das Gemeinsame.","struktur-zeile":"Eine Zeile zeigt Symbol, Name, Status und das Auge, alles immer sichtbar. Die gewählte Zeile trägt die Akzentfläche, überfahren trägt die leise Fläche. Ein Doppelklick oder Enter macht das Element aktiv. Zeilen lassen sich zum Umhängen ziehen.",auge:"Das Auge ist in jeder Zeile immer sichtbar und nicht erst beim Überfahren. Es blendet nur für diese Person aus; der Export bleibt davon unberührt. Alles einblenden holt alles zurück. Die Sichtbarkeit ist Ansicht und kein Schritt im Verlauf.",kontextmenue:"Das Kontextmenü entsteht aus dem Befehlsregister und ist in Struktur und Modell für dieselbe Auswahl gleich. Es ist nach Familien gruppiert, jede Gruppe zeigt höchstens zwölf Einträge, Unwesentliches steht hinter „Mehr …“. Innerhalb einer Gruppe gilt der Rang. Kürzel stehen neben dem Eintrag.",kontextaktionen:"Die Leiste über dem Gewählten zeigt die ersten fünf Einträge des Kontextmenüs nach Rang, keine eigene Liste. Sie ersetzt die Werkzeugleiste. Zahlen stehen nie hier, sondern in den Eigenschaften.",dropdown:"Ein Dropdown der Menüleiste zeigt alle Befehle seiner Familie in Untergruppen mit je höchstens zwölf Einträgen. Der Inhalt kommt aus dem Register, nicht von Hand. Nicht passende Einträge sind grau. Das Kürzel steht neben jedem Eintrag.",suche:"Die Suche findet Befehle und Inhalte in einem Feld und öffnet mit Strg und K. Ergebnisse kommen aus dem Befehlsregister und zeigen ihr Kürzel. Pfeiltasten wählen, Enter führt aus, Esc schließt. Befehle ohne anderen Ort, etwa die Hilfe, findet man nur hier.",wertfeld:"Jede Zahl steht als Größe mit Einheit in einem Wertfeld. Man tippt den Wert, auch mit Einheit oder einer einfachen Formel, und übernimmt mit Enter; Esc stellt den alten Wert wieder her. Während des Tippens ändert sich das Modell live. Eine unlesbare Eingabe zeigt einen Befund am Feld.",griff:"Am gewählten Element steht ein Griff für seine Länge, zum Beispiel die Dicke. Beim Ziehen springt der Wert in ganzen Millimetern, die Zahl steht am Zeiger. Tippt man dabei Ziffern, gilt dieser genaue Wert. Loslassen oder Enter übernimmt, Esc bricht ab.","ziehen-ablegen":"Eine Zeile lässt sich auf eine andere ziehen, um sie umzuhängen. Ein erlaubtes Ziel trägt die Akzentfläche, ein nicht erlaubtes die Fehlerfläche, und der Grund steht in der Rückmeldezeile. Teile und Baugruppen dürfen in eine Baugruppe, Schritte bleiben in ihrem Teil. Esc bricht das Ziehen ab, dann ändert sich nichts.",statusanzeige:"Ein Status erscheint immer als Farbe, Symbol und Wort zusammen. Er steht an der Zeile in der Struktur und am Element im Modell. Rechnet, fehlerhaft und pausiert sind die drei Zustände. Ein Fehler eines Elements legt nie das ganze Modell lahm.",befund:"Ein Befund sagt, was los ist, wo es ist und wie man es behebt. Er steht im Panel Befunde, bei einer falschen Eingabe auch am Wertfeld. Die Korrektur ist ein Knopf, zum Beispiel „Letzten gültigen Wert setzen“. Alle anderen Elemente bleiben bedienbar.",rueckmeldung:"Bestätigungen und Hinweise stehen leise in der schmalen Zeile ganz unten. Es gibt keine Dialoge und keine Meldungen an anderen Orten. Der Text sagt knapp, was geschehen ist, ohne Ausrufezeichen. Verworfenes lässt sich mit Rückgängig zurückholen.",entscheidungskarte:"Jede Änderung der KI erscheint als Karte mit Vorschau, nie direkt. Die Karte nennt, was sich ändert, mit Wert vorher und nachher. Übernehmen ist die eine Hauptaktion und trägt den Akzent. Erst nach dem Übernehmen steht derselbe Befehl im Verlauf, mit der Quelle KI.",pfad:"Der Pfad zeigt, wo man gerade arbeitet: von der Wurzel bis zum aktiven Element. Ein Klick auf ein Glied geht dorthin zurück, ein Klick auf die Wurzel verlässt das aktive Element. Das letzte Glied ist hervorgehoben. Fertig und Esc führen auf demselben Weg heraus.","dokument-reiter":"Die Reiter über dem Modell sind Dokumente, nichts anderes. Es gibt keine Befehlsreiter und keine Reiter in Reitern. Der gewählte Reiter ist hervorgehoben. Arbeitet eine andere Person in einem Reiter, zeigt er ein kleines Personensymbol.",ansichtsleiste:"Die Ansichtsleiste im Modell enthält Einpassen, Auf Auswahl zoomen, Isolieren, Alles einblenden, Projektion und Darstellung. Weitere Ansichten und das Speichern einer Ansicht stehen im Menü am Rand der Leiste. Alles hier ist Ansicht und ändert nie den Graphen. Eine gespeicherte Ansicht wird ausdrücklich als Element abgelegt.","fokus-tastatur":"Jede Zone ist per Tab oder F6 erreichbar, und der Fokus ist als Ring in der Akzentfarbe sichtbar. Esc schließt immer genau eine Ebene. Es gibt höchstens fünfzehn Kürzel, und alle stehen im Befehlsregister und neben dem Befehl im Menü. Nichts ist nur mit der Maus erreichbar."},zustand:{hover:"Überfahren",ausgewaehlt:"Ausgewählt",andere:"Von anderen bearbeitet",aktiv:"Aktiv",gedimmt:"Umfeld des aktiven Elements",ausgeblendet:"Ausgeblendet",fehlerhaft:"Fehlerhaft",pausiert:"Pausiert",rechnet:"Rechnet"},bsp:{"auswahl-struktur":"Struktur mit zwei gewählten Zeilen","auswahl-eigenschaften":"Eigenschaften mit „gemischt“","auswahl-chat":"Chat-Kontext","auge-an":"Sichtbar","auge-aus":"Ausgeblendet",kontextmenue:"Kontextmenü auf einem Schritt","ein-element":"Ein Element gewählt",mehrere:"Mehrere Elemente gewählt",suche:"Suche mit Eingabe „ver“",wert:"Wertfeld",gemischt:"Unterschiedliche Werte",fehler:"Unlesbare Eingabe",griff:"Griff mit Zahl am Zeiger","ablegen-ok":"Erlaubtes Ziel","ablegen-nein":"Nicht erlaubtes Ziel",rueckmeldung:"Leise Zeile",karte:"Vorschlag der KI (simuliert)",pfad:"Aktives Teil in einer Baugruppe","pfad-wurzel":"Nichts aktiv",reiter:"Zwei Dokumente",ansichtsleiste:"Ansichtsleiste",fokus:"Zeile mit Fokusring",kuerzel:"Alle Kürzel"}},S_={element:{anlegen:"Neu anlegen",duplizieren:"Duplizieren",umbenennen:"Umbenennen",verwerfen:"Verwerfen",zurueckholen:"Zurückholen","wert-setzen":"Wert setzen","parameter-anlegen":"Parameter anlegen",pausieren:"Berechnung pausieren",fortsetzen:"Berechnung fortsetzen",ausblenden:"Ausblenden",einblenden:"Einblenden",umhaengen:"Umhängen (Ziel wählen)",aktivieren:"Aktivieren",verlassen:"Aktives Element verlassen"},dokument:{oeffnen:"Öffnen",schliessen:"Dokument schließen",wechseln:"Dokument wechseln"},wurzel:{setzen:"Wurzel der Struktur wählen"},einstellungen:{oeffnen:"Einstellungen öffnen"},projekt:{teilen:"Projekt teilen",einladen:"Person einladen"},bearbeiten:{rueckgaengig:"Rückgängig",wiederholen:"Wiederholen",einfuegen:"Einfügen"},auswahl:{duplizieren:"Auswahl duplizieren",verwerfen:"Auswahl verwerfen",alles:"Alles auswählen",aufheben:"Auswahl aufheben",umkehren:"Auswahl umkehren",setzen:"Auswählen",hinzufuegen:"Zur Auswahl hinzufügen",umschalten:"Auswahl umschalten",aehnliche:"Ähnliche auswählen",kantenschleife:"Kantenschleife auswählen",ausblenden:"Auswahl ausblenden"},ansicht:{einpassen:"Alles einpassen","auf-auswahl":"Auf Auswahl zoomen",projektion:"Perspektive oder Orthogonal",vorne:"Ansicht von vorne",oben:"Ansicht von oben",isometrisch:"Isometrische Ansicht",schnitt:"Schnittansicht",isolieren:"Isolieren","alles-einblenden":"Alles einblenden",verworfenes:"Verworfenes zeigen",ergebnis:"Ansicht Ergebnis","alle-entwuerfe":"Ansicht Alle Entwürfe",speichern:"Ansicht speichern",anwenden:"Gespeicherte Ansicht anwenden"},darstellung:{wechseln:"Darstellung wechseln"},sichtbarkeit:{"nur-dieses":"Nur dieses zeigen","farbe-setzen":"Anzeigefarbe setzen"},fenster:{struktur:"Struktur ein- oder ausblenden",panel:"Panel ein- oder ausblenden",rechts:"Rechte Seitenleiste ein- oder ausblenden","naechste-zone":"Nächste Zone",teilen:"Fenster teilen (zwei Teile nebeneinander)"},suche:{oeffnen:"Befehlssuche öffnen"},thema:{umschalten:"Hell oder Dunkel"},einstellung:{navigationsprofil:"Navigationsprofil wählen"},katalog:{oeffnen:"Katalog öffnen"},hilfe:{"befehle-zeigen":"Alle Befehle zeigen",einfuehrung:"Einführung starten"},baugruppe:{anlegen:"Baugruppe anlegen","instanz-anlegen":"Instanz einer Komponente anlegen","variante-waehlen":"Variante wählen","kollision-pruefen":"Kollision prüfen",fixieren:"Teil fixieren","komponente-anlegen":"Komponente aus Teil anlegen"},verbindung:{anlegen:"Verbindung anlegen","verbindungspunkt-setzen":"Verbindungspunkt setzen",bewegen:"Innerhalb der Freiheitsgrade bewegen"},simulation:{lager:"Lager setzen (simuliert)",kraft:"Kraft setzen (simuliert)",ergebnis:"Ergebnis zeigen (simuliert)"},chat:{senden:"Nachricht senden",uebernehmen:"Vorschlag übernehmen",verwerfen:"Vorschlag verwerfen"},task:{wechseln:"Aufgabe wechseln"},referenz:{koordinatensystem:"Koordinatensystem setzen",punkt:"Punkt setzen","punkt-relativ":"Punkt relativ setzen",gerade:"Gerade durch zwei Punkte",halbgerade:"Halbgerade durch zwei Punkte",strecke:"Strecke durch zwei Punkte"}},y_={kind:{ursprung:"Ursprung",x:"X-Achse",y:"Y-Achse",z:"Z-Achse",xy:"XY-Ebene",yz:"YZ-Ebene",zx:"ZX-Ebene"},name:{koordinatensystem:"Koordinatensystem {n}",punkt:"Punkt {n}",line:"Gerade {n}",ray:"Halbgerade {n}",segment:"Strecke {n}"},"keine-lage":"Lage aus dem Geometriekern"},M_={befund:{input_missing:"Bezug fehlt: Eingang auf ein vorhandenes Element setzen",input_discarded:"Bezug {bezug} ist verworfen: zurückholen oder neuen Bezug wählen",input_type:"Bezug hat den falschen Typ: passendes Element wählen",input_failed:"Bezug {bezug} ist fehlerhaft: zuerst {bezug} reparieren",degenerate:"Die beiden Punkte liegen aufeinander: Punkte auseinanderziehen",unit:"Falsche Einheit: Länge in mm, Winkel in Grad eingeben",unknown_type:"Unbekannter Elementtyp",kernel_error:"Fehler im Geometriekern",protocol:"Nachricht an den Geometriekern ungültig",kernel_unavailable:"Geometrie-Dienst nicht erreichbar"}},w_={zone:qv,menue:Yv,task:Zv,simuliert:Kv,suche:Jv,familie:Qv,untergruppe:jv,struktur:e_,modell:t_,aktiv:n_,pfad:i_,ansichtsleiste:r_,anwesenheit:s_,befund:a_,status:o_,panel:l_,wert:c_,eigenschaften:u_,gruppe:h_,feld:d_,projektion:f_,darstellung:p_,profil:m_,name:g_,chat:v_,rueck:__,dnd:x_,katalog:b_,befehl:S_,draht:y_,kernel:M_},E_={menueleiste:"Menu bar",taskleiste:"Task bar",struktur:"Structure",modell:"Model",eigenschaften:"Properties",chat:"Chat",panel:"Panel",rueckmeldung:"Feedback"},A_={start:"Start",folgt:"soon",mehr:"More …"},T_={modellieren:"Modeling",simulation:"Simulation (simulated)",shop:"Shop (soon)"},R_="simulated",k_={platzhalter:"Search commands and content",befehle:"Commands",inhalte:"Content","folgt-spaeter":"Coming later","alle-zeigen":"Show all",nichts:"Nothing found"},C_={Datei:"File",Bearbeiten:"Edit",Auswahl:"Selection",Ansicht:"View",Sichtbarkeit:"Visibility","Ansicht speichern":"Saved views",Fenster:"Window",Hilfe:"Help",Baugruppe:"Assembly",Simulation:"Simulation",Chat:"Chat",Referenz:"Reference"},P_={Neu:"New",Öffnen:"Open",Projekt:"Project",Verlauf:"History",Element:"Element",Werte:"Values",Berechnung:"Calculation",Auswahl:"Selection",Befehle:"Set selection",Regeln:"By rule",Zonen:"Zones",Suche:"Search",Fenster:"Window",Einstellungen:"Settings",Hierarchie:"Hierarchy",Verbinden:"Connect",Studie:"Study",Blick:"View angle",Darstellung:"Display",Stand:"State",Sichtbarkeit:"Visibility",Gespeichert:"Saved",Hilfe:"Help",Chat:"Chat",Weitere:"More",Koordinatensystem:"Coordinate system",Punkt:"Point",Linie:"Line"},L_={titel:"Structure",wurzel:"Root",leer:"Nothing here yet. Create your first part.","leer-simulation":"No study yet. Simulation is a placeholder and simulated.",verworfen:"discarded"},D_={leer:"The model is empty."},z_={fertig:"Done"},I_={titel:"Path"},N_={titel:"View",mehr:"More views"},U_={person:"Test person B",kuerzel:"B"},F_={"zustand-unbekannt":"State unknown",korrektur:"Set last valid value","bohrung-zu-gross":"The diameter {wert} is too large; below {grenze} the hole is valid.","steg-ohne-hoehe":"The rib needs a height above {grenze}."},O_={fehlerhaft:"faulty",pausiert:"paused",rechnet:"calculating"},B_={befunde:"Findings","keine-befunde":"No findings. Everything is up to date."},V_={fehler:{"nicht-lesbar":"Value not readable. Example: 12 mm",dimension:"Wrong unit for this field",teilung:"Division by zero is not possible"}},H_={gemischt:"mixed","n-elemente":"{n} elements","umbenennen-hinweis":"Double-click to rename"},G_={masse:"Dimensions",material:"Material",ergebnis:"Result",ansicht:"View",lage:"Position"},W_={laenge:"Length",breite:"Width",dicke:"Thickness",hoehe:"Height",eckradius:"Corner radius",durchmesser:"Diameter",wand:"Wall",material:"Material",dichte:"Density",abmessungen:"Size",volumen:"Volume","masse-wert":"Mass",projektion:"Projection",darstellung:"Display",x:"x",y:"y",z:"z",rx:"Rotation x",ry:"Rotation y",rz:"Rotation z"},X_={orthogonal:"orthographic",perspektivisch:"perspective"},$_={koerper:"Solid",kanten:"Edges",durchsicht:"See-through"},q_={standard:"Default",solidworks:"like Onshape/SolidWorks"},Y_={kopie:"copy",ansicht:"View",schnitt:"Section"},Z_={titel:"Chat",zu:"to:","n-elemente":"{n} elements",platzhalter:"Question or task …",hinweis:"For example: rib 40 mm high",uebernehmen:"Accept",verwerfen:"Discard",beispiel:{frage:"The rib should become 40 mm high."},antwort:{vorschlag:"I propose this change. Have a look at the preview.",unklar:"I did not understand. Try: rib 40 mm high, copy of the rib or discard the rib.",erledigt:"Done. You can take it back with undo.",verworfen:"The proposal is discarded."},vorschlag:{wert:"{element}: {feld} to {nachher}",duplizieren:"Duplicate {element}",verwerfen:"Discard {element}",anlegen:"Create a new element",begruendung:"Simulated proposal; it applies only after you accept."}},K_={folgt:"{befehl} comes in a later stage.",angelegt:"{name} created",dupliziert:"{name} created",umbenannt:"Renamed to {name}",verworfen:"{name} discarded; bring it back with undo or restore",zurueckgeholt:"{name} restored","wert-gesetzt":"Value of {name} changed",umgehaengt:"{name} now sits in {ziel}","ansicht-gespeichert":"{name} saved",rueckgaengig:"Last step undone",wiederholt:"Step restored",befund:"Finding at {name}; the other elements stay usable","ziel-waehlen":"Choose the target in the structure.","auswahl-ziel":"Pick elements in the model or the structure.","isolieren-ziel":"Select what you want to isolate first.",draht:{"punkt-klicken":"Click into the model to set the point","zwei-punkte":"Select two points","zweiter-punkt":"Select the second point","einen-punkt":"Select one point",abgebrochen:"Cancelled"}},J_={"kein-ziel":"Nothing can be dropped here.","nur-teile":"Only parts and assemblies can be moved; steps stay in their part.","eigener-nachfahre":"An element cannot go into itself or into its own part.","kein-behaelter":"A part cannot hold other elements; choose an assembly.","schon-darin":"The element is already there."},Q_={titel:"Component catalog",einleitung:"Each component is shown here exactly as it is built in the prototype. Whoever builds a new screen uses these pages as the yardstick.",zurueck:"Back to overview",ueberschrift:{regel:"Rule",bezug:"Reference",befehle:"Commands",tokens:"Tokens"},hell:"Light",dunkel:"Dark",bezug:{muster:"Pattern “{name}” from the pattern catalog.",kandidat:"Candidate “{name}”, not yet a pattern."},baustein:{zustaende:"Element states",auswahl:"Selection","struktur-zeile":"Structure row",auge:"Eye",kontextmenue:"Context menu",kontextaktionen:"Context actions",dropdown:"Dropdown",suche:"Search",wertfeld:"Value field",griff:"Handle","ziehen-ablegen":"Drag and drop",statusanzeige:"Status display",befund:"Finding",rueckmeldung:"Feedback",entscheidungskarte:"Decision card",pfad:"Path","dokument-reiter":"Document tab",ansichtsleiste:"View bar","fokus-tastatur":"Focus and keyboard"},regel:{zustaende:"An element shows every state through a fixed channel so states never hide each other. The outline belongs to selection, hovering and another person, and exactly one wins: selected before other person before hovered. Status, visibility and surroundings always come on top. The accent stands only for selection and hovering.",auswahl:"There is exactly one selection for the whole window. Structure, model, properties and chat read it and change it only through the same commands. A click selects, Shift adds, Ctrl toggles, a click into empty space clears. With several elements the properties show only what they share.","struktur-zeile":"A row shows icon, name, status and the eye, all always visible. The selected row carries the accent surface, hovering carries the quiet surface. A double-click or Enter makes the element active. Rows can be dragged to move them.",auge:"The eye is always visible in every row, not only on hover. It hides only for this person; export stays untouched. Show everything brings everything back. Visibility is view and not a step in the history.",kontextmenue:"The context menu is generated from the command register and is the same in structure and model for the same selection. It is grouped by family, each group shows at most twelve entries, minor ones sit behind “More …”. Within a group the rank applies. Shortcuts stand next to the entry.",kontextaktionen:"The bar above the selection shows the first five entries of the context menu by rank, not a list of its own. It replaces the toolbar. Numbers never appear here but in the properties.",dropdown:"A dropdown of the menu bar shows all commands of its family in subgroups with at most twelve entries each. The content comes from the register, not by hand. Entries that do not fit are grey. The shortcut stands next to each entry.",suche:"Search finds commands and content in one field and opens with Ctrl and K. Results come from the command register and show their shortcut. Arrow keys choose, Enter runs, Esc closes. Commands without another place, such as help, are found only here.",wertfeld:"Every number stands as a quantity with a unit in a value field. You type the value, also with a unit or a simple formula, and accept with Enter; Esc restores the old value. While typing the model changes live. An unreadable entry shows a finding at the field.",griff:"On the selected element there is a handle for its length, for example the thickness. While dragging the value jumps in whole millimetres, the number stands at the pointer. Typing digits then sets that exact value. Releasing or Enter accepts, Esc cancels.","ziehen-ablegen":"A row can be dragged onto another to move it. A permitted target carries the accent surface, a forbidden one the error surface, and the reason appears in the feedback line. Parts and assemblies may go into an assembly, steps stay in their part. Esc cancels the drag, then nothing changes.",statusanzeige:"A status always appears as colour, icon and word together. It stands at the row in the structure and at the element in the model. Calculating, faulty and paused are the three states. A fault in one element never paralyses the whole model.",befund:"A finding says what is wrong, where, and how to fix it. It stands in the findings panel, and for a wrong entry also at the value field. The correction is a button, for example “Set last valid value”. All other elements stay usable.",rueckmeldung:"Confirmations and hints stand quietly in the narrow line at the very bottom. There are no dialogs and no messages anywhere else. The text says briefly what happened, without exclamation marks. Discarded items can be brought back with undo.",entscheidungskarte:"Every change by the AI appears as a card with a preview, never directly. The card says what changes, with the value before and after. Accept is the one main action and carries the accent. Only after accepting does the same command appear in the history, with the source AI.",pfad:"The path shows where you are working: from the root to the active element. A click on a link goes back there, a click on the root leaves the active element. The last link is emphasised. Done and Esc lead out the same way.","dokument-reiter":"The tabs above the model are documents, nothing else. There are no command tabs and no tabs within tabs. The chosen tab is emphasised. If another person works in a tab, it shows a small person icon.",ansichtsleiste:"The view bar in the model contains fit, zoom to selection, isolate, show everything, projection and display. More views and saving a view are in the menu at the edge of the bar. Everything here is view and never changes the graph. A saved view is stored explicitly as an element.","fokus-tastatur":"Every zone is reachable by Tab or F6, and focus is visible as a ring in the accent colour. Esc always closes exactly one level. There are at most fifteen shortcuts, and all stand in the command register and next to the command in the menu. Nothing is reachable by mouse alone."},zustand:{hover:"Hovered",ausgewaehlt:"Selected",andere:"Edited by others",aktiv:"Active",gedimmt:"Surroundings of the active element",ausgeblendet:"Hidden",fehlerhaft:"Faulty",pausiert:"Paused",rechnet:"Calculating"},bsp:{"auswahl-struktur":"Structure with two selected rows","auswahl-eigenschaften":"Properties with “mixed”","auswahl-chat":"Chat context","auge-an":"Visible","auge-aus":"Hidden",kontextmenue:"Context menu on a step","ein-element":"One element selected",mehrere:"Several elements selected",suche:"Search with input “ver”",wert:"Value field",gemischt:"Different values",fehler:"Unreadable entry",griff:"Handle with number at the pointer","ablegen-ok":"Permitted target","ablegen-nein":"Forbidden target",rueckmeldung:"Quiet line",karte:"AI proposal (simulated)",pfad:"Active part in an assembly","pfad-wurzel":"Nothing active",reiter:"Two documents",ansichtsleiste:"View bar",fokus:"Row with focus ring",kuerzel:"All shortcuts"}},j_={element:{anlegen:"Create new",duplizieren:"Duplicate",umbenennen:"Rename",verwerfen:"Discard",zurueckholen:"Restore","wert-setzen":"Set value","parameter-anlegen":"Create parameter",pausieren:"Pause calculation",fortsetzen:"Resume calculation",ausblenden:"Hide",einblenden:"Show",umhaengen:"Move (choose target)",aktivieren:"Activate",verlassen:"Leave active element"},dokument:{oeffnen:"Open",schliessen:"Close document",wechseln:"Switch document"},wurzel:{setzen:"Choose root of the structure"},einstellungen:{oeffnen:"Open settings"},projekt:{teilen:"Share project",einladen:"Invite person"},bearbeiten:{rueckgaengig:"Undo",wiederholen:"Redo",einfuegen:"Paste"},auswahl:{duplizieren:"Duplicate selection",verwerfen:"Discard selection",alles:"Select all",aufheben:"Clear selection",umkehren:"Invert selection",setzen:"Select",hinzufuegen:"Add to selection",umschalten:"Toggle selection",aehnliche:"Select similar",kantenschleife:"Select edge loop",ausblenden:"Hide selection"},ansicht:{einpassen:"Fit all","auf-auswahl":"Zoom to selection",projektion:"Perspective or orthographic",vorne:"Front view",oben:"Top view",isometrisch:"Isometric view",schnitt:"Section view",isolieren:"Isolate","alles-einblenden":"Show everything",verworfenes:"Show discarded",ergebnis:"Result view","alle-entwuerfe":"All drafts view",speichern:"Save view",anwenden:"Apply saved view"},darstellung:{wechseln:"Change display"},sichtbarkeit:{"nur-dieses":"Show only this","farbe-setzen":"Set display color"},fenster:{struktur:"Show or hide structure",panel:"Show or hide panel",rechts:"Show or hide right sidebar","naechste-zone":"Next zone",teilen:"Split window"},suche:{oeffnen:"Open command search"},thema:{umschalten:"Light or dark"},einstellung:{navigationsprofil:"Choose navigation profile"},katalog:{oeffnen:"Open catalog"},hilfe:{"befehle-zeigen":"Show all commands",einfuehrung:"Start introduction"},baugruppe:{anlegen:"Create assembly","instanz-anlegen":"Create instance of a component","variante-waehlen":"Choose variant","kollision-pruefen":"Check collision",fixieren:"Fix part","komponente-anlegen":"Create component from part"},verbindung:{anlegen:"Create connection","verbindungspunkt-setzen":"Set connection point",bewegen:"Move within degrees of freedom"},simulation:{lager:"Add support",kraft:"Add force",ergebnis:"Show result"},chat:{senden:"Send message",uebernehmen:"Accept proposal",verwerfen:"Reject proposal"},task:{wechseln:"Switch task"},referenz:{koordinatensystem:"Set coordinate system",punkt:"Set point","punkt-relativ":"Set point relative",gerade:"Line through two points",halbgerade:"Ray through two points",strecke:"Segment through two points"}},ex={kind:{ursprung:"Origin",x:"X axis",y:"Y axis",z:"Z axis",xy:"XY plane",yz:"YZ plane",zx:"ZX plane"},name:{koordinatensystem:"Coordinate system {n}",punkt:"Point {n}",line:"Line {n}",ray:"Ray {n}",segment:"Segment {n}"},"keine-lage":"Position from the geometry kernel"},tx={befund:{input_missing:"Reference missing: point the input to an existing element",input_discarded:"Reference {bezug} is discarded: restore it or choose another",input_type:"Reference has the wrong type: choose a matching element",input_failed:"Reference {bezug} has an error: fix {bezug} first",degenerate:"Both points coincide: move them apart",unit:"Wrong unit: enter lengths in mm, angles in degrees",unknown_type:"Unknown element type",kernel_error:"Error in the geometry kernel",protocol:"Invalid message to the geometry kernel",kernel_unavailable:"Geometry service unavailable"}},nx={zone:E_,menue:A_,task:T_,simuliert:R_,suche:k_,familie:C_,untergruppe:P_,struktur:L_,modell:D_,aktiv:z_,pfad:I_,ansichtsleiste:N_,anwesenheit:U_,befund:F_,status:O_,panel:B_,wert:V_,eigenschaften:H_,gruppe:G_,feld:W_,projektion:X_,darstellung:$_,profil:q_,name:Y_,chat:Z_,rueck:K_,dnd:J_,katalog:Q_,befehl:j_,draht:ex,kernel:tx};function ix(n){const e=new URLSearchParams(n).get("sprache");return e==="en"||e==="schluessel"?e:"de"}function rx(n,e){const t=n[e];if(typeof t=="string")return t;let i=n;for(const r of e.split(".")){if(typeof i!="object")return;i=i[r]}return typeof i=="string"?i:void 0}function sx(n){return(e,t)=>{if(n==="schluessel")return e;const r=rx(n==="en"?nx:w_,e)??e;return t?r.replace(/\{(\w+)\}/g,(s,a)=>String(t[a]??"")):r}}function ci(n,e){const t=typeof navigator<"u"&&/Mac|iPhone|iPad/.test(navigator.userAgent),i=n.split("+"),r=i[i.length-1]??"",s=i.slice(0,-1);if(t){const o={Mod:"⌘",Umschalt:"⇧",Shift:"⇧",Alt:"⌥"};return s.map(l=>o[l]??l).join("")+r}const a={Mod:e==="en"?"Ctrl":"Strg",Umschalt:e==="en"?"Shift":"Umschalt",Shift:e==="en"?"Shift":"Umschalt",Alt:"Alt"};return[...s.map(o=>a[o]??o),r].join("+")}/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ax={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nu=([n,e,t])=>{const i=document.createElementNS("http://www.w3.org/2000/svg",n);return Object.keys(e).forEach(r=>{i.setAttribute(r,String(e[r]))}),t?.length&&t.forEach(r=>{const s=Nu(r);i.appendChild(s)}),i},ox=(n,e={})=>{const i={...ax,...e};return Nu(["svg",i,n])};/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lx=[["path",{d:"m5 12 7-7 7 7"}],["path",{d:"M12 19V5"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cx=[["path",{d:"M12 5v16"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ux=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hx=[["path",{d:"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"}],["path",{d:"m7 16.5-4.74-2.85"}],["path",{d:"m7 16.5 5-3"}],["path",{d:"M7 16.5v5.17"}],["path",{d:"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"}],["path",{d:"m17 16.5-5-3"}],["path",{d:"m17 16.5 4.74-2.85"}],["path",{d:"M17 16.5v5.17"}],["path",{d:"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"}],["path",{d:"M12 8 7.26 5.15"}],["path",{d:"m12 8 4.74-2.85"}],["path",{d:"M12 13.5V8"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dx=[["path",{d:"M20 6 9 17l-5-5"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fx=[["path",{d:"m6 9 6 6 6-6"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const px=[["path",{d:"m9 18 6-6-6-6"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mx=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gx=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"12",cy:"12",r:"10"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vx=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"10",x2:"10",y1:"15",y2:"9"}],["line",{x1:"14",x2:"14",y1:"15",y2:"9"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _x=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xx=[["path",{d:"M10 22v-8"}],["path",{d:"M2.336 8.89 10 14l11.715-7.029"}],["path",{d:"M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bx=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sx=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yx=[["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mx=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wx=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ex=[["path",{d:"M12 2v4"}],["path",{d:"m16.2 7.8 2.9-2.9"}],["path",{d:"M18 12h4"}],["path",{d:"m16.2 16.2 2.9 2.9"}],["path",{d:"M12 18v4"}],["path",{d:"m4.9 19.1 2.9-2.9"}],["path",{d:"M2 12h4"}],["path",{d:"m4.9 4.9 2.9 2.9"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ax=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tx=[["path",{d:"M4 5h16"}],["path",{d:"M4 12h16"}],["path",{d:"M4 19h16"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rx=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 15h18"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kx=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 3v18"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cx=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M15 3v18"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Px=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lx=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dx=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zx=[["path",{d:"m15 14 5-5-5-5"}],["path",{d:"M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ix=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nx=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ux=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{d:"M20 2v4"}],["path",{d:"M22 4h-4"}],["circle",{cx:"4",cy:"20",r:"2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fx=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ox=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bx=[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vx=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hx=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]],Gx="http://www.w3.org/2000/svg",Wx=new Set(["svg","path","line","rect","circle","polygon","polyline","g","text"]);function L(n,e={},...t){const i=Wx.has(n)?document.createElementNS(Gx,n):document.createElement(n);for(const[r,s]of Object.entries(e))s==null||s===!1||(r==="class"?i.setAttribute("class",String(s)):i.setAttribute(r,s===!0?"":String(s)));n==="input"&&e.value!==void 0&&(i.value=String(e.value));for(const r of t)r===null||r===!1||r===void 0||i.append(typeof r=="string"?document.createTextNode(r):r);return i}const Xx={"arrow-up":lx,"book-open":cx,box:ux,boxes:hx,check:dx,"chevron-down":fx,"chevron-right":px,"circle-alert":mx,"circle-dot":gx,"circle-pause":vx,copy:_x,cuboid:xx,eye:Sx,"eye-off":bx,focus:yx,"folder-open":Mx,layers:wx,loader:Ex,maximize:Ax,menu:Tx,"panel-bottom":Rx,"panel-left":kx,"panel-right":Cx,pencil:Px,play:Lx,plus:Dx,"redo-2":zx,search:Ix,settings:Nx,sparkles:Ux,square:Fx,"trash-2":Ox,"undo-2":Bx,user:Vx,x:Hx};function xt(n,e=16){const t=ox(Xx[n],{width:e,height:e,"stroke-width":2,"aria-hidden":"true"}),i=L("span",{class:"symbol","data-icon":n});return i.append(t),i}const rr=n=>n instanceof Element?n.getAttribute("data-key")??null:null;function $x(n,e){return n.nodeType!==e.nodeType?!1:n instanceof Element&&e instanceof Element?n.nodeName===e.nodeName&&rr(n)===rr(e):!0}function qx(n,e){for(const t of[...n.attributes])t.name!=="data-editiert"&&!e.hasAttribute(t.name)&&n.removeAttribute(t.name);for(const t of[...e.attributes])n.getAttribute(t.name)!==t.value&&n.setAttribute(t.name,t.value)}function as(n,e){if(n instanceof Text&&e instanceof Text){n.nodeValue!==e.nodeValue&&(n.nodeValue=e.nodeValue);return}if(!(n instanceof Element)||!(e instanceof Element))return;if(qx(n,e),n instanceof HTMLInputElement&&e instanceof HTMLInputElement){!(document.activeElement===n&&n.hasAttribute("data-editiert"))&&n.value!==e.value&&(n.value=e.value);return}const t=new Set,i=[...n.childNodes],r=new Map;for(const o of i){const l=rr(o);l!==null&&r.set(l,o)}let s=0;const a=[...e.childNodes];for(const[o,l]of a.entries()){const c=rr(l);let u;if(c!==null)u=r.get(c);else for(;s<i.length;){const f=i[s];if(s+=1,!t.has(f)&&rr(f)===null&&$x(f,l)){u=f;break}}if(u){t.add(u),as(u,l);const f=n.childNodes[o];f!==u&&n.insertBefore(u,f??null)}else{const f=n.childNodes[o];n.insertBefore(l,f??null),t.add(l)}}for(const o of[...n.childNodes])t.has(o)||n.removeChild(o)}const Yx=8,Zx=12,Kx=3;function Uu(n,e,t){const i=e.trim().toLowerCase(),r=a=>n.t(a.titel).toLowerCase(),s=n.register.filter(a=>!!a.folgt===t);return i?s.filter(a=>r(a).includes(i)).sort((a,o)=>{const l=r(a).startsWith(i)?0:1,c=r(o).startsWith(i)?0:1;return l-c||r(a).length-r(o).length||a.rang-o.rang}):s.sort((a,o)=>a.rang-o.rang)}function Jx(n,e){return Uu(n,e,!1)}function Qx(n,e){return e.trim()||n.suche.alle?Uu(n,e,!0):[]}function Fu(n){const e=Jx(n,n.suche.text);return n.suche.alle?e:e.slice(0,n.suche.text.trim()?Zx:Yx)}function Ou(n,e,t){return L("button",{type:"button",role:"option",class:"eintrag","data-befehl":e.id,"data-key":`s-${e.id}`,"aria-selected":t?"true":"false","data-akzent":t?"auswahl":null,"data-folgt":e.folgt?"true":null,tabindex:"-1"},L("span",{class:"titel"},n.t(e.titel)),e.folgt?L("span",{class:"folgt"},n.t("menue.folgt")):null,e.kuerzel?L("kbd",{},ci(e.kuerzel,n.sprache)):null)}function jx(n,e){const t=n.t("suche.folgt-spaeter"),i=n.suche.alle&&!n.suche.text.trim(),r=n.sucheFolgtAlle||i?e:e.slice(0,Kx),s=r.map(o=>Ou(n,o,!1)),a=r.length<e.length?L("button",{type:"button",class:"eintrag","data-suche-folgt-alle":"",tabindex:"-1"},L("span",{class:"titel"},n.t("suche.alle-zeigen"))):null;return i?L("details",{"data-gruppe":t,"data-key":"g-folgt","data-folgt-spaeter":""},L("summary",{class:"gruppenkopf"},t),...s):L("div",{"data-gruppe":t,"data-key":"g-folgt","data-folgt-spaeter":""},L("div",{class:"gruppenkopf"},t),...s,a)}function Bu(n){const e=Fu(n),t=Qx(n,n.suche.text),i=n.suche.text.trim().toLowerCase(),r=i?St(n.dokument()).filter(a=>a.id!==n.dokument().id&&a.meta.name.toLowerCase().includes(i)).slice(0,4):[],s=Math.min(n.suche.index,Math.max(0,e.length-1));return L("div",{class:"popup suche-popup",role:"listbox","data-overlay":"suche","data-ort":"suche","data-weg":"suche","data-muster":"Suche"},L("input",{type:"text",class:"suche-eingabe","data-suchfeld":"","data-editiert":"",value:n.suche.text,placeholder:n.t("suche.platzhalter"),"aria-label":n.t("suche.platzhalter"),autocomplete:"off"}),L("div",{class:"ergebnisse","data-text":n.suche.text},e.length?L("div",{"data-gruppe":n.t("suche.befehle"),"data-key":"g-befehle"},L("div",{class:"gruppenkopf"},n.t("suche.befehle")),...e.map((a,o)=>Ou(n,a,o===s))):null,e.length===0&&r.length===0&&t.length===0?L("div",{class:"leer","data-key":"keine"},n.t("suche.nichts")):null,r.length?L("div",{class:"gruppenkopf","data-key":"kopf-inhalte"},n.t("suche.inhalte")):null,...r.map(a=>L("button",{type:"button",role:"option",class:"eintrag","data-suche-element":a.id,"data-key":`e-${a.id}`,"aria-selected":"false",tabindex:"-1"},L("span",{class:"titel"},a.meta.name))),t.length?jx(n,t):null))}const ji=Object.keys(Du),Vu="cee-prototyp-graph";class Hu{constructor(e,t,i,r=Ni,s=Ds()){this.t=e,this.sprache=t,this.tempo=i,this.register=r,this.projekt=s,this.dok=s.content[0]?.id??""}projekt;dok;protokoll=[];sucheFolgtAlle=!1;ausgeloest=[];verlaeufe=new Map;vorschau=null;auswahl=[];hover=null;aktiv=null;isoliert=null;ausgeblendet=new Set;verworfenesZeigen=!1;darstellung="koerper";projektionsart="orthogonal";profil=ji[0]??"";zonen={struktur:!0,panel:!1,rechts:!0};task="modellieren";thema="hell";menue=null;kontextMenue=null;suche={offen:!1,text:"",index:0,alle:!1,fokussiert:!1};umbenennen=null;umbenennenFokussiert=!1;umhaengenModus=null;fokusZone=null;rueckmeldung=null;unbekannterZustand=!1;zustandName="";eingabenWegMerken="menue";tastenfokus=!1;griff=null;dnd=null;status=new Map;rechenzeitMs=0;andere={aktiv:!1,dok:"halter",element:"steg"};chat={nachrichten:[],eingabe:"",vorschlag:null};katalogOffen=null;szene=null;draht=new Gv(this);lauscher=[];rendernLaeuft=!1;beiRendern(e){this.lauscher.push(e)}rendern(){this.rendernLaeuft||(this.rendernLaeuft=!0,queueMicrotask(()=>{this.rendernLaeuft=!1;for(const e of this.lauscher)e()}))}rendernSofort(){for(const e of this.lauscher)e()}dokument(){return this.projekt.content.find(e=>e.id===this.dok)??this.projekt.content[0]}angezeigtesDokument(){const e=this.dokument();if(!this.vorschau)return e;const t=dn(e),i=ht(t,this.vorschau.id);return i&&(i.params[this.vorschau.name]=this.vorschau.wert),t}find(e){return ht(this.dokument(),e)}name(e){return this.find(e)?.meta.name??e}modell(){return dn(this.projekt)}wurzel(){return this.dokument()}verlauf(){let e=this.verlaeufe.get(this.dok);return e||(e={zurueck:[],vor:[]},this.verlaeufe.set(this.dok,e)),e}verlaufLaenge(){return this.verlauf().zurueck.length}kannRueckgaengig=()=>this.verlauf().zurueck.length>0;kannWiederholen=()=>this.verlauf().vor.length>0;speichern(){try{window.localStorage.setItem(Vu,JSON.stringify(this.projekt))}catch{}}aendern(e){const t=this.dokument(),i=dn(t);if(e(i),JSON.stringify(i)===JSON.stringify(t))return!1;const r=this.verlauf();return r.zurueck.push(dn(t)),r.vor=[],this.projekt.content=this.projekt.content.map(s=>s.id===t.id?i:s),this.speichern(),!0}ersetzeDokument(e){this.projekt.content=this.projekt.content.map(t=>t.id===e.id?e:t),this.speichern()}auswahlIds(){return[...new Set(this.auswahl.map(e=>e.element_id))]}bereichElement(){return(this.aktiv?this.find(this.aktiv):void 0)??this.dokument()}zielFuerTreffer(e){const t=this.bereichElement(),i=Hn(t,e);if(!i.length)return null;if(i.length===1)return t.content.length?null:t.id;const r=i.slice(1);return t.type==="teil"?r[0].id:(r.find(a=>a.type==="teil")??r[0]).id}waehlbareIds(){const e=this.bereichElement();return(e.type==="teil"||e.content.every(i=>i.type!=="teil")?e.content:e.content.flatMap(i=>i.type==="baugruppe"?St(i).filter(r=>r.type==="teil"):[i])).filter(i=>!wt(i)&&!this.istAusgeblendet(i.id)).map(i=>i.id)}istAusgeblendet(e){return this.ausgeblendet.has(e)?!0:Hn(this.dokument(),e).slice(0,-1).some(i=>this.ausgeblendet.has(i.id))}setzeAuswahl(e){this.auswahl=e,this.rendern()}waehle(e,t,i){const r=i?{element_id:e,teil:i}:{element_id:e},s=a=>a.element_id===e&&JSON.stringify(a.teil)===JSON.stringify(i);t==="setzen"?this.auswahl=[r]:t==="hinzufuegen"?this.auswahl.some(s)||(this.auswahl=[...this.auswahl,r]):this.auswahl.some(s)?this.auswahl=this.auswahl.filter(a=>!s(a)):this.auswahl=[...this.auswahl,r],this.rendern()}auswahlart(){const e=this.auswahlIds();if(!e.length)return"keine";if(e.length===2&&this.draht.gewaehltePunkte().length===2)return"punkte";if(e.length>1)return"mehrfach";if(this.auswahl.some(i=>i.teil?.art==="kante"))return"kante";const t=this.find(e[0]);return t?wt(t)?"verworfen":t.type==="view"?"ansicht":t.type==="point"?"punkt":t.type==="teil"?"teil":t.type==="baugruppe"?"baugruppe":"schritt":"keine"}gewaehlteElemente(){return this.auswahlIds().map(e=>this.find(e)).filter(e=>!!e)}befunde(){const e=this.draht.befunde().map(t=>({elementId:t.elementId,schluessel:t.schluessel,parameter:"",wert:0,grenze:0,code:t.code,text:t.text}));return[...ws(this.dokument()),...e]}istFehlerhaft(e){return this.befunde().some(t=>t.elementId===e)}zustaende(e){const t=this.find(e);if(!t)return[];const i=[],r=this.auswahlIds().includes(e);r&&i.push("ausgewaehlt"),this.andereElemente().includes(e)&&!r&&i.push("andere"),this.hover===e&&!r&&!this.andereElemente().includes(e)&&i.push("hover"),this.aktiv===e?i.push("aktiv"):this.istGedimmt(e)&&i.push("gedimmt"),this.istAusgeblendet(e)&&i.push("ausgeblendet"),wt(t)&&i.push("verworfen"),this.istFehlerhaft(e)&&i.push("fehlerhaft");const s=this.status.get(e);return(t.meta.pausiert===!0||s==="pausiert")&&i.push("pausiert"),s==="rechnet"&&i.push("rechnet"),i}andereElemente(){return this.andere.aktiv&&this.dok===this.andere.dok&&this.find(this.andere.element)?[this.andere.element]:[]}istGedimmt(e){if(this.isoliert)return!new Set(this.isoliert.flatMap(s=>this.mitNachfahren(s))).has(e);if(!this.aktiv)return!1;const t=new Set(this.mitNachfahren(this.aktiv)),i=Hn(this.dokument(),this.aktiv).map(r=>r.id);return!t.has(e)&&!i.includes(e)}mitNachfahren(e){const t=this.find(e);return t?[t.id,...Ii(t).map(i=>i.id)]:[]}darstellungVon(e,t){if(!this.find(e))return null;const r=this.zustaende(e),s=[],a=(l,c,u,f=null,h=null)=>s.push({zustand:l,kanal:c,token:u,strichart:f,breite:h}),o={modell:{hover:"akzent",ausgewaehlt:"akzent",andere:"linie-stark"},struktur:{hover:"flaeche-2",ausgewaehlt:"akzent-flaeche",andere:"text-2"},chat:{hover:"flaeche-2",ausgewaehlt:"akzent-flaeche",andere:"text-2"},pfad:{hover:"flaeche-2",ausgewaehlt:"akzent-flaeche",andere:"text-2"}};for(const l of r)l==="hover"&&a("hover","Kontur",o[t].hover,t==="modell"?"durchgezogen":null,t==="modell"?1:null),l==="ausgewaehlt"&&(a("ausgewaehlt","Kontur",o[t].ausgewaehlt,t==="modell"?"durchgezogen":null,t==="modell"?2:null),t==="struktur"&&a("ausgewaehlt","Kontur","text")),l==="andere"&&a("andere","Kontur",o[t].andere,t==="modell"?"gestrichelt":null,t==="modell"?2:null),l==="aktiv"&&a("aktiv","Umfeld",t==="modell"?"text-3":"schrift.schnitt.halbfett"),l==="gedimmt"&&a("gedimmt","Umfeld","text-3"),l==="ausgeblendet"&&a("ausgeblendet","Sichtbarkeit","text-3"),l==="fehlerhaft"&&a("fehlerhaft","Status","fehler"),l==="pausiert"&&a("pausiert","Status","text-2"),l==="rechnet"&&a("rechnet","Status","text-2");return{zustaende:r,kanaele:s}}pfadGlieder(){const e=this.aktiv??this.dokument().id,t=Hn(this.dokument(),e);return t.length?t:[this.dokument()]}zeilen(){const e=[],t=(i,r)=>{for(const s of i.content)wt(s)&&!this.verworfenesZeigen||(e.push({element:s,ebene:r}),t(s,r+1))};return t(this.angezeigtesDokument(),0),e}versteckteIds(){const e=new Set;for(const t of St(this.dokument()))(wt(t)||this.istAusgeblendet(t.id))&&e.add(t.id);if(this.isoliert){const t=new Set(this.isoliert.flatMap(i=>this.mitNachfahren(i)));for(const i of St(this.dokument()))t.has(i.id)||e.add(i.id)}return e}gedimmteIds(){const e=new Set;if(!this.aktiv)return e;for(const t of St(this.dokument()))this.istGedimmt(t.id)&&e.add(t.id);return e}blasseIds(){const e=new Set;for(const t of St(this.dokument()))if(this.istFehlerhaft(t.id)||t.meta.pausiert===!0)for(const i of this.mitNachfahren(t.id))e.add(i);return e}teilErgebnis(){const e=this.angezeigtesDokument(),t=this.aktiv?ht(e,this.aktiv):void 0,r=[...t?Hn(e,t.id):[]].reverse().find(s=>s.type==="teil");return Gn(r??e)}huelle(e){const t=this.find(e);return t?bc(t,Gn(this.angezeigtesDokument()).koerper):null}wirkungen=new Map;registriere(e,t){this.wirkungen.set(e,t)}befehl(e){return this.register.find(t=>t.id===e)}ausfuehren(e,t={},i="menue",r="mensch"){const s=this.befehl(e),a=this.wirkungen.get(e);if(this.menue=null,this.kontextMenue=null,!s||!a||s.folgt)return this.ausgeloest.push({befehl:e,weg:i,wirkung:!1}),this.meldung("rueck.folgt",{befehl:s?this.t(s.titel):e}),this.rendern(),!1;const o=a(t,i,r);return this.ausgeloest.push({befehl:e,weg:i,wirkung:o!==!1}),this.rendern(),o!==!1}protokolliere(e,t,i,r){this.protokoll.push({befehl:e,parameter:t,quelle:r,weg:i})}meldung(e,t){this.rueckmeldung={schluessel:e,werte:t}}wertSetzen(e,t,i,r,s="mensch"){const a=this.befunde().length,o=this.aendern(l=>{const c=ht(l,e);c&&(c.params[t]=i)});return this.vorschau=null,o&&(this.protokolliere("element.wert-setzen",{element:e,name:t,wert:i},r,s),this.meldung("rueck.wert-gesetzt",{name:this.name(e)}),this.nachWertAenderung(e,a)),o}nachWertAenderung(e,t){this.befunde().length>t&&(this.zonen.panel=!0,this.meldung("rueck.befund",{name:this.name(e)})),this.rechenzeitMs>0&&(this.status.set(e,"rechnet"),setTimeout(()=>{this.status.get(e)==="rechnet"&&this.status.delete(e),this.rendern()},this.rechenzeitMs))}letzterGueltigerWert(e){for(const t of[...this.verlauf().zurueck].reverse()){const i=ht(t,e.elementId);if(i&&!ws(t).some(r=>r.elementId===e.elementId))return Ye(i.params[e.parameter])}return ku[e.elementId]?.[e.parameter]??e.grenze}rueckgaengig(e,t="mensch"){const i=this.verlauf(),r=i.zurueck.pop();return this.protokolliere("bearbeiten.rueckgaengig",{},e,t),r?(i.vor.push(dn(this.dokument())),this.ersetzeDokument(r),this.auswahlBereinigen(),this.meldung("rueck.rueckgaengig"),!0):!1}wiederholen(e,t="mensch"){const i=this.verlauf(),r=i.vor.pop();return this.protokolliere("bearbeiten.wiederholen",{},e,t),r?(i.zurueck.push(dn(this.dokument())),this.ersetzeDokument(r),this.auswahlBereinigen(),this.meldung("rueck.wiederholt"),!0):!1}auswahlBereinigen(){this.auswahl=this.auswahl.filter(e=>this.find(e.element_id)),this.aktiv&&!this.find(this.aktiv)&&(this.aktiv=null)}wechsleDokument(e){!this.projekt.content.some(t=>t.id===e)||e===this.dok||(this.dok=e,this.auswahl=[],this.aktiv=null,this.isoliert=null,this.hover=null,this.vorschau=null,this.einpassenNoetig=!0,this.rendern())}neuesElement(e){let t="";return this.aendern(i=>{const r=e==="baugruppe"?"Baugruppe":"Teil",s=St(i).filter(o=>o.type===e).length+1;t=Ru(i,`${e}-${s}`);const a={id:t,type:e,params:e==="teil"?{material:"PLA",lage_x:{value:0,unit:"mm"}}:{},content:[],meta:{name:`${r} ${s}`}};this.einfuegeStelle(i).content.push(a)}),t}einfuegeStelle(e){return(this.aktiv?ht(e,this.aktiv):void 0)??e}ablegenPruefen(e,t){const i=this.dokument(),r=this.find(e),s=t===i.id?i:this.find(t);return!r||!s?{erlaubt:!1,grund:"dnd.kein-ziel"}:r.type!=="teil"&&r.type!=="baugruppe"?{erlaubt:!1,grund:"dnd.nur-teile"}:s.id===r.id||Ii(r).some(a=>a.id===s.id)?{erlaubt:!1,grund:"dnd.eigener-nachfahre"}:s.type!=="baugruppe"?{erlaubt:!1,grund:"dnd.kein-behaelter"}:Ms(i,r.id)?.id===s.id?{erlaubt:!1,grund:"dnd.schon-darin"}:{erlaubt:!0}}fokusEigenschaften=!1;offenesSchliessen=null;kontextOeffnen=null;dndAbbrechen=null;zeigerPos={x:0,y:0};feldBefund=null;einpassenNoetig=!0;kanteBei(e,t,i){const r=this.find(e),s=r?this.huelle(e):null;if(!r||!s||!this.szene||r.content.length>0||r.type==="teil"||r.type==="baugruppe")return null;let a=null;for(const o of this.szene.kantenVon(e,s)){const l=o.bis.x-o.von.x,c=o.bis.y-o.von.y,u=l*l+c*c||1,f=Math.max(0,Math.min(1,((t-o.von.x)*l+(i-o.von.y)*c)/u)),h=Math.hypot(t-(o.von.x+f*l),i-(o.von.y+f*c));h<=8&&(!a||h<a.d)&&(a={adresse:o.adresse,d:h})}return a?{art:"kante",adresse:a.adresse}:null}griffUebernehmen(){const e=this.griff;if(!e)return;const t=e.eingabe!==""?Number(e.eingabe):e.wert;e.aktiv=!1,this.vorschau=null,e.wert=t,e.eingabe="",t>0&&t!==e.start&&this.wertSetzen(e.id,e.name,{value:t,unit:"mm"},"griff"),e.sichtbarBis=performance.now()+700,setTimeout(()=>{this.griff=null,this.rendern()},700),this.rendern()}griffAbbrechen(){this.vorschau=null,this.griff=null,this.rendern()}suchTreffer(){return Fu(this)}geisterKoerper(){const e=this.chat.vorschlag;if(!e)return[];const t=dn(this.dokument());for(const r of e.befehle){if(r.id!=="element.wert-setzen")continue;const s=ht(t,String(r.parameter.element));s&&(s.params[String(r.parameter.name)]=r.parameter.wert)}const i=new Set(St(t).filter(r=>JSON.stringify(r.params)!==JSON.stringify(this.find(r.id)?.params)).map(r=>r.id));return Gn(t).koerper.filter(r=>i.has(r.elementId))}anwendbar(e){const t=this.gewaehlteElemente(),i=r=>t.some(r);switch(e.id){case"bearbeiten.rueckgaengig":return this.kannRueckgaengig();case"bearbeiten.wiederholen":return this.kannWiederholen();case"element.umbenennen":return t.length===1;case"referenz.punkt-relativ":return this.draht.gewaehltePunkte().length===1&&t.length===1;case"element.duplizieren":case"element.wert-setzen":case"auswahl.duplizieren":return t.length>0;case"element.verwerfen":case"auswahl.verwerfen":return i(r=>!wt(r));case"element.zurueckholen":return i(r=>wt(r));case"element.ausblenden":case"auswahl.ausblenden":return i(r=>!this.istAusgeblendet(r.id));case"element.einblenden":return i(r=>this.istAusgeblendet(r.id));case"element.pausieren":return i(r=>r.meta.pausiert!==!0);case"element.fortsetzen":return i(r=>r.meta.pausiert===!0);case"element.aktivieren":return t.length===1&&t[0]?.id!==this.aktiv;case"element.verlassen":return this.aktiv!==null;case"element.umhaengen":return t.length===1&&(t[0]?.type==="teil"||t[0]?.type==="baugruppe");case"ansicht.alles-einblenden":return this.ausgeblendet.size>0||this.isoliert!==null;case"ansicht.anwenden":return t.length===1&&t[0]?.type==="view";case"auswahl.aufheben":return t.length>0;default:return!0}}naechsteZone(e=!1){const i=["menueleiste","taskleiste","struktur","modell","eigenschaften","chat","panel","rueckmeldung"].filter(o=>{const l=document.querySelector(`[data-zone="${o}"]`);return!!l&&l.getBoundingClientRect().width>0&&getComputedStyle(l).visibility!=="hidden"});if(!i.length)return;const r=this.fokusZone?i.indexOf(this.fokusZone):-1,a=i[(r+(e?-1:1)+i.length)%i.length];this.fokusZone=a,document.querySelector(`[data-zone="${a}"]`)?.focus(),this.tastenfokus=!0}huelleAlle(){const e=this.versteckteIds(),t=Gn(this.angezeigtesDokument()).koerper.filter(s=>!e.has(s.elementId)&&s.art!=="skizze"),i=this.draht.huelle(),r=eb(t);return i?r?Ao([r,i]):i:r}huelleAuswahl(){const e=Gn(this.angezeigtesDokument()).koerper,t=this.auswahlIds().map(i=>this.find(i)?bc(this.find(i),e):null).filter(i=>!!i);return t.length?Ao(t):null}setzeKamera(e){this.szene?.nach({azimut:e.azimut,hoehe:e.hoehe,abstand:e.abstand,ziel:new z(e.ziel.x,e.ziel.y,e.ziel.z)},0)}elternId(e){return Ms(this.dokument(),e)?.id??null}}function Ao(n){const e=[1/0,1/0,1/0],t=[-1/0,-1/0,-1/0];for(const i of n)for(let r=0;r<3;r++)e[r]=Math.min(e[r],i.min[r]),t[r]=Math.max(t[r],i.max[r]);return{min:e,max:t}}function eb(n){return n.length?Ao(n.map(e=>({min:e.min,max:e.max}))):null}function Ec(n){const e=[...n].sort((s,a)=>s.x-a.x||s.y-a.y);if(e.length<=2)return e;const t=(s,a,o)=>(a.x-s.x)*(o.y-s.y)-(a.y-s.y)*(o.x-s.x),i=[];for(const s of e){for(;i.length>=2&&t(i[i.length-2],i[i.length-1],s)<=0;)i.pop();i.push(s)}const r=[];for(const s of[...e].reverse()){for(;r.length>=2&&t(r[r.length-2],r[r.length-1],s)<=0;)r.pop();r.push(s)}return[...i.slice(0,-1),...r.slice(0,-1)]}function Es(n){const e=n.map(s=>s.x),t=n.map(s=>s.y),i=Math.min(...e),r=Math.min(...t);return{x:i,y:r,breite:Math.max(...e)-i,hoehe:Math.max(...t)-r}}function tb(n,e,t=!0){const i=[],r=n.length;for(let s=0;s<(t?r:r-1);s++){const a=n[s],o=n[(s+1)%r],l=Math.hypot(o.x-a.x,o.y-a.y),c=Math.max(1,Math.floor(l/e));for(let u=0;u<c;u++)i.push({x:a.x+(o.x-a.x)*u/c,y:a.y+(o.y-a.y)*u/c})}return i}const hn={"farbe.hell.grund":"#F5F7F9","farbe.hell.flaeche":"#FDFDFE","farbe.hell.flaeche-2":"#EEF0F3","farbe.hell.linie":"#DDE0E3","farbe.hell.linie-stark":"#C8CBCE","farbe.hell.text":"#1B2025","farbe.hell.text-2":"#595E64","farbe.hell.text-3":"#82878C","farbe.hell.akzent":"#3A69AD","farbe.hell.akzent-flaeche":"#DFECFF","farbe.hell.auf-akzent":"#FFFFFF","farbe.hell.viewport":"#E6E8EA","farbe.hell.erfolg":"#227849","farbe.hell.erfolg-flaeche":"#DAF3E1","farbe.hell.warnung":"#CD9130","farbe.hell.warnung-text":"#7E5403","farbe.hell.warnung-flaeche":"#FAE9CE","farbe.hell.fehler":"#C13C36","farbe.hell.fehler-flaeche":"#FFE0DB","farbe.dunkel.grund":"#0D1012","farbe.dunkel.flaeche":"#15171A","farbe.dunkel.flaeche-2":"#1E2124","farbe.dunkel.linie":"#2B2E32","farbe.dunkel.linie-stark":"#3A3D41","farbe.dunkel.text":"#E6E8EA","farbe.dunkel.text-2":"#A1A5A9","farbe.dunkel.text-3":"#777B7F","farbe.dunkel.akzent":"#79A6E9","farbe.dunkel.akzent-flaeche":"#1E2E47","farbe.dunkel.auf-akzent":"#0D1012","farbe.dunkel.viewport":"#1B1D20","farbe.dunkel.erfolg":"#60BB83","farbe.dunkel.erfolg-flaeche":"#12301E","farbe.dunkel.warnung":"#EBB25F","farbe.dunkel.warnung-text":"#EBB25F","farbe.dunkel.warnung-flaeche":"#3C2A0E","farbe.dunkel.fehler":"#ED756A","farbe.dunkel.fehler-flaeche":"#3E1F1B","achse.x":"#DB423C","achse.y":"#3BA946","achse.z":"#2B7AD6","schrift.familie.ui":"Inter, system-ui, sans-serif","schrift.familie.mono":'"JetBrains Mono", ui-monospace, monospace',"schrift.merkmale":'"tnum" 1, "cv05" 1',"schrift.schnitt.normal":"400","schrift.schnitt.mittel":"500","schrift.schnitt.halbfett":"600","schrift.groesse.klein":"12px","schrift.groesse.basis":"13px","schrift.groesse.gross":"14px","schrift.groesse.titel":"16px","schrift.groesse.ueberschrift":"20px","schrift.groesse.anzeige":"24px","schrift.zeilenhoehe":"1.45","schrift.groesse-tablet.basis":"15px","abstand.1":"4px","abstand.2":"8px","abstand.3":"12px","abstand.4":"16px","abstand.5":"24px","abstand.6":"32px","radius.klein":"4px","radius.mittel":"6px","radius.gross":"8px","radius.karte":"12px","linie.breite":"1px","bedienflaeche.desktop":"28px","bedienflaeche.tablet":"44px","bewegung.kurz":"120ms","bewegung.mittel":"200ms","bewegung.kurve":"cubic-bezier(0.2, 0, 0, 1)","symbol.satz":"Lucide"},ya=30,Ma=.35,nb=.6,ib=30;class rb{constructor(e){this.zone=e,this.canvas=document.createElement("canvas"),this.canvas.dataset.modell="",this.canvas.className="leinwand",e.prepend(this.canvas),this.renderer=new fv({canvas:this.canvas,antialias:!0,alpha:!1,powerPreference:"low-power"}),this.renderer.setPixelRatio(1),this.scene.add(this.gruppe),this.scene.add(this.draht),this.scene.add(this.licht.umgebung,this.licht.gerichtet,this.licht.gegen),this.setThema("hell"),new ResizeObserver(()=>this.groesseAnpassen()).observe(e),this.groesseAnpassen()}canvas;renderer;scene=new ld;persp=new Kt(ya,1,10,2e4);ortho=new Cs(-1,1,1,-1,-2e4,2e4);gruppe=new Tn;draht=new Tn;licht={umgebung:new ff,gerichtet:new Wl,gegen:new Wl};objekte=[];zeichnung=null;thema="hell";angefordert=!1;tween=null;lausche=[];bboxCache=new Map;kamera={azimut:-35,hoehe:28,abstand:380,ziel:new z(0,0,14)};projektion="orthogonal";tempo=1;beiAenderung(e){this.lausche.push(e)}melde(){for(const e of this.lausche)e()}lichter(){return[{art:"umgebung",intensitaet:this.licht.umgebung.intensity},{art:"gerichtet",intensitaet:this.licht.gerichtet.intensity},{art:"gegen",intensitaet:this.licht.gegen.intensity}]}setThema(e){this.thema=e,this.renderer.setClearColor(new Xe(hn[`farbe.${e}.viewport`])),this.licht.umgebung.intensity=e==="hell"?1.15:1.25,this.licht.gerichtet.intensity=e==="hell"?1.7:2.1,this.licht.gegen.intensity=e==="hell"?.5:.7,this.licht.gerichtet.position.set(-1,-2,3),this.licht.gegen.position.set(2,1,1),this.zeichnung&&this.zeichne(this.zeichnung),this.anfordern()}groesseAnpassen(){const e=this.zone.getBoundingClientRect(),t=Math.max(1,Math.round(e.width)),i=Math.max(1,Math.round(e.height));this.renderer.setSize(t,i,!1),this.canvas.style.width=`${t}px`,this.canvas.style.height=`${i}px`,this.persp.aspect=t/i,this.persp.updateProjectionMatrix(),this.anfordern(),this.melde()}flaecheBreite(){return this.canvas.clientWidth||1}flaecheHoehe(){return this.canvas.clientHeight||1}halbeHoehe(e=this.kamera.abstand){return e*Math.tan(ya*Math.PI/360)}pxProMm(){return this.flaecheHoehe()/(2*this.halbeHoehe())}kameraAnwenden(){const e=this.kamera,t=e.azimut*Math.PI/180,i=e.hoehe*Math.PI/180,r=new z(Math.sin(t)*Math.cos(i),-Math.cos(t)*Math.cos(i),Math.sin(i)),s=this.projektion==="orthogonal"?this.ortho:this.persp;if(s.up.set(0,0,1),Math.abs(e.hoehe)>89.5&&s.up.set(Math.sin(t)*-1,Math.cos(t),0),s.position.copy(e.ziel).addScaledVector(r,e.abstand),s.lookAt(e.ziel),this.projektion==="orthogonal"){const a=this.halbeHoehe(),o=a*(this.flaecheBreite()/this.flaecheHoehe());this.ortho.left=-o,this.ortho.right=o,this.ortho.top=a,this.ortho.bottom=-a,this.ortho.updateProjectionMatrix()}return s.updateMatrixWorld(!0),s}aktuelleKamera(){return this.kameraAnwenden()}drehen(e,t){this.tween=null,this.kamera.azimut+=e,this.kamera.hoehe=Math.max(-89,Math.min(89,this.kamera.hoehe+t)),this.geaendert()}schieben(e,t){this.tween=null;const i=this.kameraAnwenden(),r=new z().setFromMatrixColumn(i.matrixWorld,0),s=new z().setFromMatrixColumn(i.matrixWorld,1),a=1/this.pxProMm();this.kamera.ziel.addScaledVector(r,-e*a).addScaledVector(s,t*a),this.geaendert()}zoomen(e,t,i){this.tween=null;const r=t!==void 0&&i!==void 0?this.aufZielEbene(t,i):null;if(this.kamera.abstand=Math.max(40,Math.min(4e3,this.kamera.abstand/e)),r&&t!==void 0&&i!==void 0){this.kameraAnwenden();const s=this.aufZielEbene(t,i);s&&this.kamera.ziel.add(r.sub(s))}this.geaendert()}aufZielEbene(e,t){const i=this.kameraAnwenden(),r=this.canvas.getBoundingClientRect(),s=new de((e-r.left)/r.width*2-1,-((t-r.top)/r.height)*2+1),a=new fa;a.setFromCamera(s,i);const o=new z;i.getWorldDirection(o);const l=new fn().setFromNormalAndCoplanarPoint(o,this.kamera.ziel);return a.ray.intersectPlane(l,new z)}geaendert(){this.anfordern(),this.melde()}nach(e,t){const i={...this.kamera,ziel:this.kamera.ziel.clone()},r={azimut:e.azimut??i.azimut,hoehe:e.hoehe??i.hoehe,abstand:e.abstand??i.abstand,ziel:e.ziel?e.ziel.clone():i.ziel.clone()};if(t<=0||this.tempo===0){this.kamera=r,this.tween=null,this.geaendert();return}this.tween={start:performance.now(),ende:performance.now()+t,von:i,nach:r},this.anfordern()}passeEin(e,t=200,i=.72){if(!e)return;const r=new z((e.min[0]+e.max[0])/2,(e.min[1]+e.max[1])/2,(e.min[2]+e.max[2])/2),s={...this.kamera,ziel:r.clone()},a=this.kamera;this.kamera=s;const o=this.kameraAnwenden(),l=new z().setFromMatrixColumn(o.matrixWorld,0),c=new z().setFromMatrixColumn(o.matrixWorld,1);let u=0,f=0;for(const k of[e.min[0],e.max[0]])for(const y of[e.min[1],e.max[1]])for(const M of[e.min[2],e.max[2]]){const w=new z(k,y,M).sub(r);u=Math.max(u,Math.abs(w.dot(l))),f=Math.max(f,Math.abs(w.dot(c)))}this.kamera=a;const h=this.zone.getBoundingClientRect(),d=Math.min(h.width,h.height),p=2*u/(i*d),b=2*f/(i*d),E=Math.max(p,b,.01)*h.height/2/Math.tan(ya*Math.PI/360);this.nach({ziel:r,abstand:E},t)}koerperFarbe(){return new Xe(this.thema==="hell"?hn["farbe.hell.flaeche"]:hn["farbe.dunkel.text-3"])}geometrie(e){const[t,i,r]=e.min,[s,a,o]=e.max,l=new z((t+s)/2,(i+a)/2,(r+o)/2);switch(e.art){case"quader":{const c=new si(s-t,a-i,o-r);return c.translate(l.x,l.y,l.z),[c]}case"platte":{const c=e.platte;if(!c)return[];const u=wa(c.laenge,c.breite,c.eckradius);for(const h of c.loecher){const d=new Ss;d.absarc(h.x-l.x,h.y-l.y,c.lochD/2,0,Math.PI*2,!0),u.holes.push(d)}const f=new ys(u,{depth:c.dicke,bevelEnabled:!1,curveSegments:12});return f.translate(l.x,l.y,r),[f]}case"schale":{const c=e.wand??2,u=wa(s-t,a-i,0),f=new Ss;f.moveTo(-(s-t)/2+c,-(a-i)/2+c),f.lineTo(-(s-t)/2+c,(a-i)/2-c),f.lineTo((s-t)/2-c,(a-i)/2-c),f.lineTo((s-t)/2-c,-(a-i)/2+c),f.closePath(),u.holes.push(f);const h=new ys(u,{depth:o-r-c,bevelEnabled:!1});h.translate(l.x,l.y,r+c);const d=new si(s-t,a-i,c);return d.translate(l.x,l.y,r+c/2),[h,d]}case"rohr":{const c=e.rohr;if(!c)return[];const u=new Go(c.d/2,c.d/2,o-r,24,1,!0);return u.rotateX(Math.PI/2),u.translate(c.x,c.y,l.z),[u]}default:return[]}}zeichne(e){this.zeichnung=e,this.bboxCache.clear();for(const s of this.objekte)this.gruppe.remove(s.gruppe);this.objekte=[];const t=this.koerperFarbe(),i=new Xe(hn[this.thema==="hell"?"farbe.hell.text":"farbe.dunkel.text"]),r=new Xe(hn[this.thema==="hell"?"farbe.hell.text-3":"farbe.dunkel.text-3"]);for(const s of e.koerper){if(e.versteckt.has(s.elementId))continue;const a=new Tn,o={elementId:s.elementId,gruppe:a,flaechen:[],kanten:[],skizze:s.art==="skizze"},l=e.gedimmt.has(s.elementId),c=e.blass.has(s.elementId);if(s.art==="skizze"&&s.platte){const f=wa(s.platte.laenge,s.platte.breite,s.platte.eckradius).getPoints(8).map(p=>new z(p.x,p.y,.05)),h=new At().setFromPoints([...f,f[0]]),d=new bs(h,new Ki({color:r,transparent:!0,opacity:l?Ma:1}));d.position.set((s.min[0]+s.max[0])/2,(s.min[1]+s.max[1])/2,0),a.add(d),this.gruppe.add(a),this.objekte.push(o);continue}for(const u of this.geometrie(s)){const f=l?Ma:c?nb:e.darstellung==="durchsicht"?.3:1,h=new lf({color:t,flatShading:!0,side:s.art==="rohr"?Jt:Wn,transparent:f<1,opacity:f,depthWrite:e.darstellung!=="durchsicht",colorWrite:e.darstellung!=="kanten",polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}),d=new jt(u,h);d.userData.elementId=s.elementId,d.userData.pickbar=!l,a.add(d),o.flaechen.push(d);const p=new _d(new yd(u,ib),new Ki({color:l?r:i,transparent:l,opacity:l?Ma:1}));a.add(p),o.kanten.push(p)}this.gruppe.add(a),this.objekte.push(o)}for(const s of e.geister){const a=new Tn;for(const o of this.geometrie(s)){const l=new jt(o,new vs({color:new Xe(hn[`farbe.${this.thema}.akzent`]),transparent:!0,opacity:.35,depthWrite:!1,side:Jt}));a.add(l)}this.gruppe.add(a),this.objekte.push({elementId:`${s.elementId}~geist`,gruppe:a,flaechen:[],kanten:[],skizze:!1})}this.anfordern(),this.melde()}zeichneDraht(e){for(const i of[...this.draht.children])this.draht.remove(i),i.traverse(r=>{const s=r;s.geometry?.dispose(),s.material?.dispose?.()});const t=i=>new Xe(i.gewaehlt?hn[`farbe.${this.thema}.akzent`]:i.fehlerhaft?hn[`farbe.${this.thema}.fehler`]:i.token.startsWith("achse.")?hn[i.token]:hn[`farbe.${this.thema}.text`]);for(const i of e){if(i.art==="koordinatensystem")continue;const r=i.punkte.map(a=>new z(a[0],a[1],a[2])),s=new Tn;if(s.userData.elementId=i.element,i.art==="punkt"){const a=new bd(new At().setFromPoints(r),new ru({color:t(i),size:6,sizeAttenuation:!1}));s.add(a)}else if(i.art==="ebene"){const a=new jt(new At().setFromPoints([r[0],r[1],r[2],r[0],r[2],r[3]]),new vs({color:t(i),transparent:!0,opacity:.15,depthWrite:!1,side:Jt})),o=new xd(new At().setFromPoints(r),new Ki({color:t(i)}));s.add(a,o)}else s.add(new bs(new At().setFromPoints(r),new Ki({color:t(i),linewidth:1.5})));this.draht.add(s)}this.anfordern(),this.melde()}aufEbene(e,t,i,r){const s=this.kameraAnwenden(),a=new fa;a.setFromCamera(this.zuNdc(e,t),s);const o=new fn().setFromNormalAndCoplanarPoint(new z(r[0],r[1],r[2]).normalize(),new z(i[0],i[1],i[2])),l=a.ray.intersectPlane(o,new z);return l?[l.x,l.y,l.z]:null}zuNdc(e,t){const i=this.canvas.getBoundingClientRect();return new de((e-i.left)/i.width*2-1,-((t-i.top)/i.height)*2+1)}trefferBei(e,t){const i=this.kameraAnwenden(),r=new fa;r.setFromCamera(this.zuNdc(e,t),i),this.gruppe.updateMatrixWorld(!0);const s=this.objekte.flatMap(o=>o.flaechen).filter(o=>o.userData.pickbar),a=r.intersectObjects(s,!1)[0];return a?{elementId:String(a.object.userData.elementId),punkt:a.point.clone(),normale:a.face?a.face.normal.clone():new z}:null}projiziere(e){const t=this.kameraAnwenden(),i=(e instanceof z?e.clone():new z(e[0],e[1],e[2])).project(t),r=this.canvas.getBoundingClientRect();return{x:r.left+(i.x+1)/2*r.width,y:r.top+(1-i.y)/2*r.height}}eckenProjiziert(e){const t=[];for(const i of[e.min[0],e.max[0]])for(const r of[e.min[1],e.max[1]])for(const s of[e.min[2],e.max[2]])t.push(this.projiziere([i,r,s]));return t}kantenVon(e,t){const i=(s,a,o)=>[s==="l"?t.min[0]:t.max[0],a==="v"?t.min[1]:t.max[1],o==="u"?t.min[2]:t.max[2]],r=[];for(const s of["o","u"]){const a=s==="o"?"oben":"unten";r.push([`${a}-vorn`,i("l","v",s),i("r","v",s)]),r.push([`${a}-hinten`,i("l","h",s),i("r","h",s)]),r.push([`${a}-links`,i("l","v",s),i("l","h",s)]),r.push([`${a}-rechts`,i("r","v",s),i("r","h",s)])}for(const s of["l","r"])for(const a of["v","h"])r.push([`${a==="v"?"vorn":"hinten"}-${s==="l"?"links":"rechts"}`,i(s,a,"u"),i(s,a,"o")]);return r.map(([s,a,o])=>{const l=this.projiziere(a),c=this.projiziere(o);return{adresse:`${e}/k/${s}`,elementId:e,name:s,von:l,bis:c,mitte:{x:(l.x+c.x)/2,y:(l.y+c.y)/2}}})}gezeichnet(){return[...new Set(this.objekte.map(e=>e.elementId).filter(e=>!e.includes("~")))]}hatKoerper(){return this.objekte.length>0}anfordern(){this.angefordert||(this.angefordert=!0,requestAnimationFrame(()=>{this.angefordert=!1,this.rahmen()}))}rahmen(){if(this.tween){const e=this.tween,t=performance.now(),i=Math.min(1,(t-e.start)/(e.ende-e.start)),r=i<.5?2*i*i:1-(-2*i+2)**2/2;this.kamera={azimut:e.von.azimut+(e.nach.azimut-e.von.azimut)*r,hoehe:e.von.hoehe+(e.nach.hoehe-e.von.hoehe)*r,abstand:e.von.abstand+(e.nach.abstand-e.von.abstand)*r,ziel:e.von.ziel.clone().lerp(e.nach.ziel,r)},i>=1?this.tween=null:this.anfordern(),this.melde()}this.jetztRendern()}jetztRendern(){const e=this.kameraAnwenden();this.renderer.render(this.scene,e)}setProjektion(e){this.projektion=e,this.geaendert()}}function wa(n,e,t){const i=new hu,r=-n/2,s=-e/2;return t<=0?(i.moveTo(r,s),i.lineTo(r+n,s),i.lineTo(r+n,s+e),i.lineTo(r,s+e),i.closePath(),i):(i.moveTo(r+t,s),i.lineTo(r+n-t,s),i.absarc(r+n-t,s+t,t,-Math.PI/2,0,!1),i.lineTo(r+n,s+e-t),i.absarc(r+n-t,s+e-t,t,0,Math.PI/2,!1),i.lineTo(r+t,s+e),i.absarc(r+t,s+e-t,t,Math.PI/2,Math.PI,!1),i.lineTo(r,s+t),i.absarc(r+t,s+t,t,Math.PI,Math.PI*1.5,!1),i)}function $o(n){const e=n.gewaehlteElemente();let t;if(e.length>1)t=L("span",{class:"chip","data-chip":""},n.t("chat.n-elemente",{n:e.length}));else{const i=e[0]??(n.aktiv?n.find(n.aktiv):void 0)??n.dokument(),r=e[0]?n.zustaende(i.id):[];t=L("span",{class:"chip","data-chip":"","data-id":i.id,"data-zustand":r.join(" ")||null,"data-akzent":r.includes("ausgewaehlt")?"auswahl":null},i.meta.name)}return L("div",{class:"kontext","data-chat-kontext":"","data-key":"kontext"},L("span",{class:"zu"},n.t("chat.zu"))," ",t)}function Gu(n){const e=n.chat.vorschlag;return e?L("div",{class:"karte","data-muster":"Entscheidungskarte","data-quelle":"ki","data-akzent":"ki","data-key":"karte"},L("div",{class:"karte-kopf"},xt("sparkles",14),L("span",{class:"simuliert"},n.t("simuliert"))),L("div",{class:"karte-titel"},e.titel),L("div",{class:"karte-text"},e.begruendung),...e.werte.map((t,i)=>L("div",{class:"karte-wert","data-key":`w-${i}`},L("span",{class:"feld"},t.feld),L("span",{class:"vorher"},t.vorher),xt("chevron-right",12),L("span",{class:"nachher"},t.nachher))),L("div",{class:"karte-knoepfe"},L("button",{type:"button",class:"knopf","data-befehl":"chat.verwerfen"},n.t("chat.verwerfen")),L("button",{type:"button",class:"knopf haupt","data-befehl":"chat.uebernehmen","data-hauptaktion":"","data-akzent":"hauptaktion"},n.t("chat.uebernehmen")))):null}function sb(n){return[L("div",{class:"zonenkopf","data-key":"kopf"},L("h2",{},n.t("chat.titel")),L("span",{class:"simuliert"},n.t("simuliert"))),$o(n),L("div",{class:"nachrichten",role:"log","data-key":"nachrichten"},...n.chat.nachrichten.length?n.chat.nachrichten.map((e,t)=>L("div",{class:`nachricht ${e.von}`,"data-key":`n-${t}`},e.schluessel?n.t(e.schluessel,e.werte):e.text)):[L("p",{class:"hinweis","data-key":"hinweis"},n.t("chat.hinweis"))],Gu(n)),L("div",{class:"eingabezeile","data-key":"eingabe"},L("input",{type:"text",class:"chat-eingabe","data-chat-eingabe":"","data-befehl":"chat.senden",placeholder:n.t("chat.platzhalter"),"aria-label":n.t("chat.platzhalter"),value:n.chat.eingabe,autocomplete:"off"}),L("button",{type:"button",class:"schalter","data-befehl":"chat.senden","data-chat-senden":"","aria-label":n.t("befehl.chat.senden"),title:n.t("befehl.chat.senden")},xt("arrow-up")))]}const Wu={mm:1,cm:10,m:1e3},ab={n:1,kn:1e3},ob=new Set(["kg","g"]),Ac=(n,e)=>n??e;class lb{constructor(e,t){this.text=e,this.standardFaktor=t}pos=0;blank(){for(;this.text[this.pos]===" ";)this.pos+=1}naechstes(){return this.blank(),this.text[this.pos]??""}fertig(){return this.naechstes()===""}ausdruck(){let e=this.produkt();for(;;){const t=this.naechstes();if(t!=="+"&&t!=="-")return e;this.pos+=1;const i=this.produkt();if(e.dim!==null&&i.dim!==null&&e.dim!==i.dim)throw new Ai("wert.fehler.dimension");e={wert:t==="+"?e.wert+i.wert:e.wert-i.wert,dim:Ac(e.dim,i.dim)}}}produkt(){let e=this.faktor();for(;;){const t=this.naechstes();if(t!=="*"&&t!=="/")return e;this.pos+=1;const i=this.faktor();if(t==="/"){if(i.wert===0)throw new Ai("wert.fehler.teilung");e={wert:e.wert/i.wert,dim:e.dim}}else e={wert:e.wert*i.wert,dim:Ac(e.dim,i.dim)}}}faktor(){const e=this.naechstes();if(e==="-"){this.pos+=1;const t=this.faktor();return{wert:-t.wert,dim:t.dim}}if(e==="("){this.pos+=1;const t=this.ausdruck();if(this.naechstes()!==")")throw new Ai("wert.fehler.nicht-lesbar");return this.pos+=1,t}return this.zahl()}zahl(){this.blank();const e=this.text.slice(this.pos),t=/^(\d+(?:[.,]\d+)?|[.,]\d+)\s*([a-zA-Z]*)/.exec(e);if(!t||t[1]===void 0)throw new Ai("wert.fehler.nicht-lesbar");this.pos+=t[0].length;const i=Number(t[1].replace(",",".")),r=(t[2]??"").toLowerCase();if(r==="")return{wert:i*this.standardFaktor,dim:null};const s=Wu[r];if(s!==void 0)return{wert:i*s,dim:"laenge"};const a=ab[r];if(a!==void 0)return{wert:i*a,dim:"kraft"};if(ob.has(r))return{wert:i*(r==="kg"?1e3:1),dim:"masse"};throw new Ai("wert.fehler.nicht-lesbar")}}class Ai extends Error{constructor(e){super(e),this.schluessel=e}}function Tc(n,e="mm",t="laenge"){const i=new lb(n.replace(/×/g,"*").replace(/−/g,"-").trim(),t==="kraft"?1:Wu[e]??1);try{const r=i.ausdruck();return i.fertig()?r.dim!==null&&r.dim!==t?{ok:!1,fehler:"wert.fehler.dimension"}:Number.isFinite(r.wert)?{ok:!0,groesse:{value:Math.round(r.wert*1e6)/1e6,unit:t==="kraft"?"N":"mm"}}:{ok:!1,fehler:"wert.fehler.nicht-lesbar"}:{ok:!1,fehler:"wert.fehler.nicht-lesbar"}}catch(r){if(r instanceof Ai)return{ok:!1,fehler:r.schluessel};throw r}}function cb(n,e="de"){const t=String(Math.round(n.value*100)/100);return`${e==="de"?t.replace(".",","):t} ${n.unit}`}const qo=(n,e,t)=>{const i=(Math.round(n*10**e)/10**e).toFixed(e);return t==="en"?i:i.replace(".",",")},ub=n=>n==="en"?"en":"de";function To(n,e){return cb(n,ub(e))}const hb=(n,e)=>`${qo(n/1e3,2,e)} cm³`,db=(n,e)=>`${qo(n,2,e)} g`;function fb(n,e){const t=i=>qo(i,1,e).replace(/[.,]0$/,"");return`${t(n[0])} × ${t(n[1])} × ${t(n[2])} mm`}const pb={extrusion:["laenge","breite","dicke","hoehe","eckradius"],schale:["laenge","breite","hoehe","wand"],skizze:["laenge","breite","eckradius"],bohrung:["durchmesser"]};function Rc(n,e){const i=[...Hn(n.dokument(),e.id)].reverse().find(r=>typeof r.params.material=="string");return String(e.params.material??i?.params.material??"PLA")}function Xu(n,e){const t=n.sprache;if(e.type==="teil"||e.type==="baugruppe"||e.type==="projekt"){const r=Gn(e.id===n.dokument().id?n.angezeigtesDokument():e),s=[{key:"masse",felder:[{key:"abmessungen",param:null,text:fb(r.abmessungen_mm,t),editierbar:!1}]}];return(e.type==="teil"||r.volumen_mm3>0)&&(s.push({key:"material",felder:[{key:"material",param:null,text:Rc(n,e),editierbar:!1}]}),s.push({key:"ergebnis",felder:[{key:"volumen",param:null,text:hb(r.volumen_mm3,t),editierbar:!1},{key:"masse-wert",param:null,text:db(r.masse_g,t),editierbar:!1}]})),s}if(e.type==="view")return[{key:"ansicht",felder:[{key:"projektion",param:null,text:n.t(`projektion.${String(e.params.projektion)}`),editierbar:!1},{key:"darstellung",param:null,text:n.t(`darstellung.${String(e.params.darstellung)}`),editierbar:!1}]}];if(mr(e.type)){const r=Object.entries(Nv[e.type]??{}).map(([s,a])=>({key:s,param:s,text:$v(e.params[s],t),editierbar:!0,dim:a}));return r.length?[{key:"lage",felder:r}]:[]}const i=[];for(const r of pb[e.type]??[])e.params[r]!==void 0&&i.push({key:r,param:r,text:To(e.params[r],t),editierbar:!0});return[{key:"masse",felder:i},{key:"material",felder:[{key:"material",param:null,text:Rc(n,e),editierbar:!1}]}]}function mb(n,e){const t=e.map(a=>Xu(n,a)),i=new Set,r=t[0]??[],s=[];for(const a of r){const o=[];for(const l of a.felder){const c=t.map(f=>f.flatMap(h=>h.felder).find(h=>h.key===l.key));if(c.some(f=>!f))continue;const u=c.every(f=>f?.text===l.text);u||i.add(l.key),o.push({...l,text:u?l.text:n.t("eigenschaften.gemischt")})}o.length&&s.push({key:a.key,felder:o})}return{gruppen:s,gemischt:i}}function os(n,e,t,i){const r=n.feldBefund?.feld===e.key?n.feldBefund:null;return L("div",{class:"feld","data-feld":e.key,"data-key":e.key},L("label",{},n.t(`feld.${e.key}`)),e.editierbar?L("input",{type:"text",class:"wertfeld","data-muster":"Wertfeld","data-feld-eingabe":e.key,"data-param":e.param,"data-dim":e.dim??null,"data-elemente":t.join(","),"data-gemischt":i?"true":null,"aria-label":n.t(`feld.${e.key}`),value:e.text,autocomplete:"off"}):L("span",{class:"wert","data-wert-text":""},e.text),r?L("div",{class:"befund am-feld","data-muster":"Befund","data-schwere":"warnung"},n.t(r.schluessel)):null)}function $u(n){const e=n.gewaehlteElemente(),t=a=>L("div",{class:"zonenkopf","data-key":"kopf"},typeof a=="string"?L("h2",{},a):a);if(e.length>1){const{gruppen:a,gemischt:o}=mb(n,e),l=e.map(c=>c.id);return[t(n.t("eigenschaften.n-elemente",{n:e.length})),...a.map(c=>kc(n,c,l,o))]}const i=e[0]??(n.aktiv?n.find(n.aktiv):void 0)??n.dokument(),s=n.umbenennen?.id===i.id?L("input",{type:"text",class:"titel-eingabe","data-umbenennen":i.id,"data-editiert":"",value:i.meta.name,"aria-label":n.t("befehl.element.umbenennen")}):L("h2",{"data-name-feld":i.id,title:n.t("eigenschaften.umbenennen-hinweis")},i.meta.name);return[t(s),wt(i)?L("div",{class:"hinweis","data-key":"verworfen"},n.t("struktur.verworfen")):null,...Xu(n,i).map(a=>kc(n,a,[i.id],new Set))].filter(a=>!!a)}function kc(n,e,t,i){return L("section",{class:"gruppe","data-gruppe":e.key,"data-key":`g-${e.key}`},L("h3",{},n.t(`gruppe.${e.key}`)),...e.felder.map(r=>os(n,r,t,i.has(r.key))))}function Ro(n,e,t={}){const i=n.anwendbar(e);return L("button",{type:"button",role:"menuitem",class:"eintrag","data-befehl":e.id,"data-par":t.par?JSON.stringify(t.par):null,"data-mehr":t.mehr?"true":null,"aria-disabled":!i||e.folgt?"true":null,"data-folgt":e.folgt?"true":null,tabindex:"-1"},L("span",{class:"titel"},n.t(e.titel)),e.folgt?L("span",{class:"folgt"},n.t("menue.folgt")):null,e.kuerzel?L("kbd",{},ci(e.kuerzel,n.sprache)):null)}function Ui(n,e,t=new Set){const i=n.auswahlart(),r=n.register.filter(s=>!s.folgt&&!t.has(s.id)&&Lv(n.register,s,i));return Tv(r,e).map(s=>L("div",{role:"group",class:"untergruppe","data-untergruppe":s.name,"data-key":`ug-${s.name}`},L("div",{class:"gruppenkopf"},n.t(`untergruppe.${s.name.replace(/ \d+$/,"")}`)),...s.eintraege.map(a=>Ro(n,a))))}function gr(n,e,t="menue",i=""){return L("div",{role:"menu",class:`popup ${i}`.trim(),"data-overlay":"menue","data-ort":n,"data-weg":t},...e)}function qu(n){const e=n.kontextMenue;if(!e)return null;const{sichtbar:t,mehr:i}=e.menue;return L("div",{role:"menu",class:"popup kontextmenue","data-overlay":"kontextmenue","data-ort":"kontextmenue","data-weg":"kontextmenue","data-art":e.art,style:`left:${Math.round(e.x)}px;top:${Math.round(e.y)}px`},...t.flatMap((r,s)=>[s>0?L("div",{role:"separator",class:"linie","data-key":`l-${r.familie}`}):null,L("div",{role:"group",class:"untergruppe","data-gruppe":r.familie,"data-key":`gr-${r.familie}`},...r.eintraege.map(a=>Ro(n,a)))]),i.length?L("button",{type:"button",role:"menuitem",class:"eintrag mehr-knopf","data-mehr-toggle":"","data-key":"mehr","aria-haspopup":"menu","aria-expanded":e.mehrOffen?"true":"false",tabindex:"-1"},L("span",{class:"titel"},n.t("menue.mehr"))):null,e.mehrOffen&&i.length?L("div",{role:"menu",class:`popup kontextmenue-mehr${e.x>window.innerWidth-560?" nach-links":""}`,"data-ort":"kontextmenue-mehr","data-key":"mehr-ebene"},...i.map(r=>L("div",{role:"group",class:"untergruppe","data-gruppe":r.familie,"data-key":`mg-${r.familie}-${r.eintraege[0]?.id??""}`},L("div",{class:"gruppenkopf"},n.t(`familie.${r.familie}`)),...r.eintraege.map(s=>Ro(n,s,{mehr:!0}))))):null)}const gb={modellieren:["Bearbeiten","Auswahl","Baugruppe","Referenz","Fenster"],simulation:["Simulation"]};function Cc(n,e,t,i){const r=n.menue===e;return L("div",{class:"menue-eintrag","data-key":e},L("button",{type:"button",class:"menue-knopf","data-menue-trigger":e,"aria-haspopup":"menu","aria-expanded":r?"true":"false",tabindex:"-1"},t),r?gr(i,Ui(n,e.replace("dropdown:","").replace("start","Datei"),Rv)):null)}function Ea(n,e,t,i){const r=n.befehl(e);return L("button",{type:"button",class:"schalter","data-befehl":e,"aria-pressed":i?"true":"false",title:r?`${n.t(r.titel)}${r.kuerzel?` (${ci(r.kuerzel,n.sprache)})`:""}`:e,"aria-label":r?n.t(r.titel):e},xt(t))}function Pc(n,e,t,i){const r=n.befehl(e);return L("button",{type:"button",class:"schalter mit-kuerzel","data-befehl":e,"aria-disabled":i?null:"true",title:r?n.t(r.titel):e,"aria-label":r?n.t(r.titel):e},xt(t),r?.kuerzel?L("kbd",{},ci(r.kuerzel,n.sprache)):null)}function vb(n){const e=n.befehl("suche.oeffnen");return[Cc(n,"start",n.t("menue.start"),"start-menue"),...gb[n.task].filter(t=>n.register.some(i=>i.familie===t&&!i.folgt)).map(t=>Cc(n,`dropdown:${t}`,n.t(`familie.${t}`),t==="Fenster"?"menueleiste":`dropdown-${t.toLowerCase()}`)),L("div",{class:"platz"}),L("div",{class:"menue-eintrag suche-eintrag","data-key":"suche"},L("button",{type:"button",class:"suchfeld","data-befehl":"suche.oeffnen","aria-expanded":n.suche.offen?"true":"false",tabindex:"-1"},xt("search"),L("span",{class:"platzhalter"},n.t("suche.platzhalter")),e?.kuerzel?L("kbd",{},ci(e.kuerzel,n.sprache)):null),n.suche.offen?Bu(n):null),Pc(n,"bearbeiten.rueckgaengig","undo-2",n.kannRueckgaengig()),Pc(n,"bearbeiten.wiederholen","redo-2",n.kannWiederholen()),L("div",{class:"schalter-gruppe",role:"group","data-key":"schalter"},Ea(n,"fenster.struktur","panel-left",n.zonen.struktur),Ea(n,"fenster.panel","panel-bottom",n.zonen.panel),Ea(n,"fenster.rechts","panel-right",n.zonen.rechts))]}const _b={teil:"box",baugruppe:"boxes",extrusion:"layers",schale:"layers",skizze:"pencil",bohrung:"circle-dot",view:"focus"};function Yu(n,e){const t=n.zustaende(e);return t.includes("fehlerhaft")?{zustand:"fehlerhaft",symbol:"circle-alert",token:"fehler"}:t.includes("rechnet")?{zustand:"rechnet",symbol:"loader",token:"text-2"}:t.includes("pausiert")?{zustand:"pausiert",symbol:"circle-pause",token:"text-2"}:null}function sr(n,e,t){return L("span",{class:"status","data-muster":"Statusanzeige","data-zustand":e.zustand,"data-status-token":e.token,"data-element":t,role:"status"},xt(e.symbol,14),L("span",{class:"wort"},n.t(`status.${e.zustand}`)))}function ki(n,e,t,i){const r=n.zustaende(e.id),s=n.auswahlIds().includes(e.id),a=n.istAusgeblendet(e.id),o=Yu(n,e.id),l=r.includes("andere");return L("div",{role:"treeitem",class:"zeile","data-key":e.id,"data-id":e.id,"data-ebene":String(t),"data-zustand":r.join(" ")||null,"data-akzent":s?"auswahl":r.includes("hover")?"ueberfahren":n.dnd?.ziel===e.id&&n.dnd.erlaubt?"auswahl":null,"aria-selected":s?"true":"false","aria-level":String(t+1),"aria-current":n.aktiv===e.id?"true":null,"data-ziel":n.dnd?.ziel===e.id?n.dnd.erlaubt?"erlaubt":"verboten":null,style:`--ebene:${t}`,tabindex:i===0?"0":"-1"},xt(_b[e.type]??"square",14),L("span",{class:"name"},e.meta.name),o?sr(n,o,e.id):null,l?L("span",{class:"person",title:n.t("anwesenheit.person")},n.t("anwesenheit.kuerzel")):null,L("button",{type:"button",class:"auge","data-befehl":a?"element.einblenden":"element.ausblenden","data-par":JSON.stringify({element:e.id}),"data-weg":"struktur","data-ort":"auge","aria-label":n.t(a?"befehl.element.einblenden":"befehl.element.ausblenden"),"aria-pressed":a?"true":"false",tabindex:"-1"},xt(a?"eye-off":"eye",14)),wt(e)?L("span",{class:"verworfen-marke"},n.t("struktur.verworfen")):null)}function ls(n){const e=n.zeilen(),t=n.dokument(),i=L("div",{class:"zonenkopf","data-key":"kopf"},L("h2",{},n.t("struktur.titel")),L("div",{class:"menue-eintrag","data-key":"sichtbarkeit"},L("button",{type:"button",class:"schalter","data-menue-trigger":"sichtbarkeit","aria-haspopup":"menu","aria-expanded":n.menue==="sichtbarkeit"?"true":"false",title:n.t("familie.Sichtbarkeit"),"aria-label":n.t("familie.Sichtbarkeit")},xt("eye")),n.menue==="sichtbarkeit"?gr("auge",Ui(n,xb)):null));if(n.task==="simulation")return[i,L("div",{class:"leer","data-muster":"Leerer Zustand","data-key":"leer"},L("p",{},n.t("struktur.leer-simulation")))];const r=L("div",{class:"wurzel","data-key":"wurzel","data-wurzel":t.id,"data-akzent":n.dnd?.ziel===t.id&&n.dnd.erlaubt?"auswahl":null,"data-ziel":n.dnd?.ziel===t.id?n.dnd.erlaubt?"erlaubt":"verboten":null},L("span",{class:"beschriftung"},n.t("struktur.wurzel")),L("span",{class:"name"},t.meta.name));return e.length?[i,r,L("div",{role:"tree",class:"baum","data-key":"baum","aria-label":n.t("struktur.titel")},...e.map((s,a)=>ki(n,s.element,s.ebene,a)))]:[i,r,L("div",{class:"leer","data-muster":"Leerer Zustand","data-key":"leer"},L("p",{},n.t("struktur.leer")),n.unbekannterZustand?L("div",{class:"befund","data-muster":"Befund","data-schwere":"warnung"},n.t("befund.zustand-unbekannt")):null,L("button",{type:"button",class:"knopf haupt","data-befehl":"element.anlegen","data-par":JSON.stringify({typ:"teil"}),"data-hauptaktion":"","data-akzent":"hauptaktion"},n.t("befehl.element.anlegen")))]}const xb="Sichtbarkeit",Zu={"element.duplizieren":"copy","auswahl.duplizieren":"copy","element.umbenennen":"pencil","element.verwerfen":"trash-2","auswahl.verwerfen":"trash-2","element.ausblenden":"eye-off","auswahl.ausblenden":"eye-off","element.einblenden":"eye","ansicht.auf-auswahl":"focus","ansicht.einpassen":"maximize","ansicht.isolieren":"cuboid","ansicht.alles-einblenden":"eye","ansicht.projektion":"box","darstellung.wechseln":"layers","element.zurueckholen":"undo-2","element.aktivieren":"maximize","element.wert-setzen":"pencil"};function vr(n,e){const t=n.draht.huelleBildschirm(e);if(t)return Ec(t);const i=n.huelle(e);return!i||!n.szene?null:Ec(n.szene.eckenProjiziert(i))}function bb(n){if(n.type==="extrusion"||n.type==="schale"){if(n.params.dicke!==void 0)return"dicke";if(n.params.hoehe!==void 0)return"hoehe"}return null}const Sb=(n,e,t)=>{const i=e%2===1?.5:0;return{x:Math.round(n.x-t.x)+i,y:Math.round(n.y-t.y)+i}};function Ku(n,e){const t=new Set([...n.auswahlIds(),...n.andereElemente(),...n.hover?[n.hover]:[]]),i=[];for(const r of t){if(n.istAusgeblendet(r))continue;const a=n.darstellungVon(r,"modell")?.kanaele.find(c=>c.kanal==="Kontur"),o=vr(n,r);if(!a||!o||o.length<3)continue;const l=a.breite??1;i.push({id:r,polygon:o.map(c=>Sb(c,l,e)),token:a.token,breite:l,strichart:a.strichart??"durchgezogen",zustand:a.zustand})}return i}function yb(n,e){const t=n.szene?.canvas.getBoundingClientRect();if(!t)return[];const i=Ku(n,{x:t.left,y:t.top}).find(a=>a.id===e);if(!i)return[];const r=i.breite%2===1?.5:0,s=i.polygon.map(a=>({x:a.x-r+t.left,y:a.y-r+t.top}));return tb(s,4).map(a=>({x:Math.round(a.x),y:Math.round(a.y)}))}function Mb(n,e,t,i){const r=Ku(n,e),s=wb(n,e);return L("svg",{class:"konturen",width:String(t),height:String(i),viewBox:`0 0 ${t} ${i}`,"aria-hidden":"true","shape-rendering":"crispEdges"},...r.map(a=>L("path",{"data-key":`kontur-${a.id}`,class:`kontur ${a.zustand}`,d:`M ${a.polygon.map(o=>`${o.x} ${o.y}`).join(" L ")} Z`,fill:"none","stroke-width":String(a.breite),"stroke-dasharray":a.strichart==="gestrichelt"?"6 4":null,"data-kontur-id":a.id,"data-kontur-token":a.token,"data-kontur-breite":String(a.breite),"data-kontur-strichart":a.strichart,"data-zustand":a.zustand,style:`stroke: var(--farbe-${a.token})`})),...s)}function wb(n,e){const t=[];for(const i of n.auswahl){if(i.teil?.art!=="kante")continue;const r=n.huelle(i.element_id);if(!r||!n.szene)continue;const s=n.szene.kantenVon(i.element_id,r).find(a=>a.adresse===i.teil?.adresse);s&&t.push(L("line",{"data-key":`kante-${s.adresse}`,x1:String(Math.round(s.von.x-e.x)),y1:String(Math.round(s.von.y-e.y)),x2:String(Math.round(s.bis.x-e.x)),y2:String(Math.round(s.bis.y-e.y)),"stroke-width":"3","data-kante":i.teil.adresse,style:"stroke: var(--farbe-akzent)"}))}return t}function Ju(n){return L("div",{class:"reiterzeile",role:"tablist","data-chrome":"","data-key":"reiter"},...n.projekt.content.map(e=>L("button",{type:"button",role:"tab",class:"reiter","data-key":`tab-${e.id}`,"data-befehl":"dokument.wechseln","data-par":JSON.stringify({dok:e.id}),"aria-selected":e.id===n.dok?"true":"false",tabindex:"-1"},e.meta.name,n.andere.aktiv&&n.andere.dok===e.id?L("span",{class:"person-marke","data-zustand":"andere",title:n.t("anwesenheit.person")},xt("user",12)):null)))}function As(n){const e=n.pfadGlieder(),t=n.dokument(),i=[];return e.forEach((r,s)=>{const a=s===e.length-1,o=r.id===t.id,l=n.zustaende(r.id);s>0&&i.push(L("span",{class:"trenner","data-key":`t-${r.id}`},xt("chevron-right",12))),i.push(L("button",{type:"button",class:"glied","data-key":`g-${r.id}`,"data-id":r.id,"data-befehl":o?"element.verlassen":"element.aktivieren","data-par":JSON.stringify({element:r.id}),"data-zustand":l.join(" ")||null,"data-akzent":l.includes("ausgewaehlt")?"auswahl":null,"aria-current":a?"location":null,tabindex:"-1"},r.meta.name))}),L("nav",{class:"pfad","data-muster-kandidat":"Pfad","data-chrome":"","data-key":"pfad","aria-label":n.t("pfad.titel")},...i)}const Qu=kv,Lc=new Set(Qu);function ju(n){const e=Qu.map(t=>n.befehl(t)).filter(t=>!!t);return L("div",{class:"ansichtsleiste",role:"toolbar","data-muster-kandidat":"Ansichtsleiste","data-chrome":"","data-ort":"ansichtsleiste","data-key":"ansichtsleiste","aria-label":n.t("ansichtsleiste.titel")},...e.map(t=>L("button",{type:"button",class:"schalter","data-befehl":t.id,"data-key":`al-${t.id}`,"aria-disabled":n.anwendbar(t)?null:"true","aria-pressed":t.id==="ansicht.isolieren"?n.isoliert?"true":"false":null,title:`${n.t(t.titel)}${t.kuerzel?` (${ci(t.kuerzel,n.sprache)})`:""}`,"aria-label":n.t(t.titel)},xt(Zu[t.id]??"square"))),L("div",{class:"menue-eintrag","data-key":"mehr"},L("button",{type:"button",class:"schalter","data-menue-trigger":"ansicht","aria-haspopup":"menu","aria-expanded":n.menue==="ansicht"?"true":"false",title:n.t("ansichtsleiste.mehr"),"aria-label":n.t("ansichtsleiste.mehr")},xt("chevron-down")),n.menue==="ansicht"?gr("ansichtsleiste",[...Ui(n,"Ansicht",Lc),...Ui(n,"Ansicht speichern",Lc)],"menue","nach-oben"):null))}function Eb(n,e,t){const i=n.auswahlart();if(i==="keine"||n.dnd||n.griff)return null;const r=Eo(pr(n.register,i,f=>n.anwendbar(f)));if(!r.length)return null;const a=n.auswahlIds().map(f=>vr(n,f)).filter(f=>!!f).flat();if(!a.length)return null;const o=Es(a),l=Math.min(Math.max(o.x+o.breite/2-e.x,110),t-110),u=i==="punkt"||i==="punkte"||n.draht.aktiv()?Math.min(o.y+o.hoehe-e.y+14,2e3):Math.max(o.y-e.y-46,84);return ko(n,r,`left:${Math.round(l)}px;top:${Math.round(u)}px`)}function ko(n,e,t){return L("div",{class:"kontextaktionen",role:"toolbar","data-muster":"Kontextaktionen","data-chrome":"","data-weg":"kontextaktion","data-key":"kontextaktionen",style:t},...e.map(i=>L("button",{type:"button",class:"schalter","data-befehl":i.id,"data-key":`ka-${i.id}`,title:n.t(i.titel),"aria-label":n.t(i.titel)},xt(Zu[i.id]??"square"))))}function Ab(n,e){if(n.auswahlIds().length!==1)return null;const t=n.find(n.auswahlIds()[0]);if(!t||!n.szene||n.istAusgeblendet(t.id))return null;const i=bb(t),r=n.huelle(t.id);if(!i||!r)return null;const s=n.szene.projiziere([(r.min[0]+r.max[0])/2,(r.min[1]+r.max[1])/2,r.max[2]]);return L("div",{class:"griff",role:"slider",tabindex:"-1","data-griff":t.id,"data-griff-name":i,"data-muster-kandidat":"Griff","data-chrome":"","data-akzent":"auswahl","aria-label":n.t(`feld.${i}`),"aria-valuenow":String(Ye(t.params[i])),"data-key":"griff",style:`left:${Math.round(s.x-e.x)}px;top:${Math.round(s.y-e.y-22)}px`},xt("arrow-up",14))}function Tb(n,e){const t=[];for(const[r,s]of n.zeilen().entries()){const a=Yu(n,s.element.id);if(!a||n.istAusgeblendet(s.element.id))continue;const o=vr(n,s.element.id);if(!o)continue;const l=Es(o);t.push(L("div",{class:"modell-status","data-chrome":"","data-key":`ms-${s.element.id}`,style:`left:${Math.round(l.x-e.x)}px;top:${Math.round(l.y-e.y-22)}px`},sr(n,a,s.element.id)))}const i=n.andereElemente()[0];if(i){const r=vr(n,i);if(r){const s=Es(r);t.push(L("div",{class:"namensschild","data-chrome":"","data-key":"namensschild","data-person":"",style:`left:${Math.round(s.x-e.x)}px;top:${Math.round(s.y-e.y-44)}px`},n.t("anwesenheit.person")),L("div",{class:"fremder-zeiger","data-chrome":"","data-key":"fremder-zeiger","data-zeiger":"",style:`left:${Math.round(s.x+s.breite*.75-e.x)}px;top:${Math.round(s.y+s.hoehe*.55-e.y)}px`},xt("user",14),L("span",{class:"name"},n.t("anwesenheit.person")),L("span",{class:"simuliert"},n.t("simuliert"))))}}return t}function Rb(n,e){const t=n.griff;if(!t)return null;const i=t.eingabe!==""?t.eingabe:String(Math.round(t.wert));return L("div",{class:"zeigerzahl","data-zeigerzahl":"","data-chrome":"","data-key":"zeigerzahl",style:`left:${Math.round(t.zeiger.x-e.x+14)}px;top:${Math.round(t.zeiger.y-e.y-28)}px`},`${i} mm`)}function kb(n){const t=n.szene?.canvas.getBoundingClientRect(),i={x:t?.left??0,y:t?.top??0},r=Math.round(t?.width??0),s=Math.round(t?.height??0),a=n.dokument().content.length===0;return[Mb(n,i,r,s),Ju(n),As(n),n.aktiv?L("button",{type:"button",class:"knopf haupt fertig","data-chrome":"","data-befehl":"element.verlassen","data-hauptaktion":"","data-akzent":"hauptaktion","data-key":"fertig"},n.t("aktiv.fertig")):null,a?L("div",{class:"leer mitte","data-muster":"Leerer Zustand","data-key":"leer-modell"},L("p",{},n.t("modell.leer"))):null,Eb(n,i,r),Ab(n,i),...Tb(n,i),Rb(n,i),ju(n)]}function eh(n){const e=n.befunde();return[L("div",{class:"zonenkopf","data-key":"kopf"},L("h2",{},n.t("panel.befunde")),L("button",{type:"button",class:"schalter","data-befehl":"fenster.panel","aria-label":n.t("befehl.fenster.panel"),title:n.t("befehl.fenster.panel")},xt("x",14))),e.length?L("div",{class:"befunde","data-key":"liste"},...e.map(t=>{if(t.code)return L("div",{class:"befund","data-muster":"Befund","data-schwere":"fehler","data-element":t.elementId,"data-code":t.code,"data-key":`k-${t.elementId}-${t.code}`},L("span",{class:"schwere"},xt("circle-alert",14),L("span",{class:"wort"},n.t("status.fehlerhaft"))),L("span",{class:"ort"},n.name(t.elementId)),L("span",{class:"text"},t.text??n.t(t.schluessel)));const i=n.letzterGueltigerWert(t);return L("div",{class:"befund","data-muster":"Befund","data-schwere":"fehler","data-element":t.elementId,"data-key":`b-${t.elementId}`},L("span",{class:"schwere"},xt("circle-alert",14),L("span",{class:"wort"},n.t("status.fehlerhaft"))),L("span",{class:"ort"},n.name(t.elementId)),L("span",{class:"text"},n.t(t.schluessel,{wert:`${t.wert} mm`,grenze:`${t.grenze} mm`})),L("button",{type:"button",class:"knopf","data-befehl":"element.wert-setzen","data-weg":"befund","data-par":JSON.stringify({element:t.elementId,name:t.parameter,wert:{value:i,unit:"mm"}})},n.t("befund.korrektur")))})):L("div",{class:"leer","data-muster":"Leerer Zustand","data-key":"leer"},L("p",{},n.t("panel.keine-befunde")))]}function th(n){const e=n.rueckmeldung;return e?[L("span",{class:"rueckmeldung-text","data-muster":"Rueckmeldung",role:"status","data-key":"text"},n.t(e.schluessel,e.werte))]:[]}function Dc(n,e,t){const i=n.task===e;return L("button",{type:"button",class:"task","data-befehl":"task.wechseln","data-par":JSON.stringify({task:e}),"aria-pressed":i?"true":"false","aria-current":i?"true":null,title:n.t(`task.${e}`),"aria-label":n.t(`task.${e}`)},xt(t,20))}function Cb(n){return[L("div",{class:"tasks",role:"group","data-key":"tasks"},Dc(n,"modellieren","box"),Dc(n,"simulation","play")),L("div",{class:"unten","data-key":"unten"},L("button",{type:"button",class:"task","aria-disabled":"true",title:n.t("task.shop"),"aria-label":n.t("task.shop")},xt("layers",20)))]}class Pb{constructor(e,t){this.wurzel=e,this.app=t;const i=(s,a,o={})=>{const l=L(a,{"data-zone":s,tabindex:"0","aria-label":t.t(`zone.${s}`),...o});return this.zonen[s]=l,l};this.rahmen=L("div",{class:"fenster"});const r=L("div",{class:"rechts-spalte"});r.append(i("eigenschaften","section",{"data-weg":"eigenschaften"}),i("chat","section",{"data-weg":"chat"})),this.rahmen.append(i("menueleiste","header",{role:"menubar"}),i("taskleiste","nav"),i("struktur","aside",{"data-weg":"struktur"}),i("modell","main"),r,i("panel","section",{"data-weg":"menue"}),i("rueckmeldung","footer")),this.zonen.menueleiste.dataset.weg="menue",this.chrome=L("div",{class:"chrome"}),this.overlay=L("div",{class:"ueberlagerung"}),this.zonen.modell.append(this.chrome),this.wurzel.replaceChildren(this.rahmen,this.overlay),this.szene=new rb(this.zonen.modell),this.szene.tempo=t.tempo,t.szene=this.szene,this.szene.beiAenderung(()=>this.chromeNeu()),t.beiRendern(()=>this.rendern())}rahmen;zonen={};chrome;overlay;zeichenSignatur="";klassen="";szene;chromeGeplant=!1;chromeNeu(){this.chromeGeplant||(this.chromeGeplant=!0,requestAnimationFrame(()=>{this.chromeGeplant=!1,this.chromeZeichnen()}))}chromeZeichnen(){const e=L("div",{class:"chrome"},...kb(this.app).filter(t=>!!t));as(this.chrome,e)}zone(e,t){const i=L("div",{},...t.filter(r=>!!r));as(this.zonen[e],this.mitAttributen(this.zonen[e],i))}mitAttributen(e,t){for(const i of[...e.attributes])t.setAttribute(i.name,i.value);return t}rendern(){const e=this.app,t=e.zonen,i=[t.struktur?"":"ohne-struktur",t.rechts?"":"ohne-rechts",t.panel?"mit-panel":""].filter(Boolean).join(" ");i!==this.klassen&&(this.klassen=i,this.rahmen.className=`fenster ${i}`.trim(),this.szene.groesseAnpassen()),this.szene.projektion!==e.projektionsart&&this.szene.setProjektion(e.projektionsart),document.documentElement.dataset.thema=e.thema,this.rahmen.dataset.task=e.task,this.zone("menueleiste",vb(e)),this.zone("taskleiste",Cb(e)),this.zone("struktur",ls(e)),this.zone("eigenschaften",$u(e)),this.zone("chat",sb(e)),this.zone("panel",t.panel?eh(e):[]),this.zone("rueckmeldung",th(e)),this.zeichneSzene(),this.chromeZeichnen(),this.ueberlagerung(),this.fokusSetzen()}fokusSetzen(){const e=this.app,t=document.activeElement;if(e.suche.offen){const r=this.rahmen.querySelector("[data-suchfeld]");r&&t!==r&&!e.suche.fokussiert&&(e.suche.fokussiert=!0,r.focus())}else e.suche.fokussiert=!1;if(e.umbenennen){const r=this.rahmen.querySelector("[data-umbenennen]");r&&t!==r&&!e.umbenennenFokussiert&&(e.umbenennenFokussiert=!0,r.focus(),r.select())}else e.umbenennenFokussiert=!1;const i=e.kontextMenue;if(i?.fokus){const r=i.fokus==="mehr"?"[data-mehr-toggle]":".kontextmenue-mehr [data-befehl]";i.fokus=void 0,document.querySelector(`.kontextmenue ${r}, ${r}`)?.focus()}e.fokusEigenschaften&&(e.fokusEigenschaften=!1,this.rahmen.querySelector("[data-feld-eingabe]")?.focus())}zeichneSzene(){const e=this.app,t=e.angezeigtesDokument(),i=Gn(t),r=e.versteckteIds(),s=e.gedimmteIds(),a=e.blasseIds(),o=e.geisterKoerper(),l=JSON.stringify([t,[...r],[...s],[...a],e.darstellung,e.thema,o]);this.zeichneDraht(),l!==this.zeichenSignatur&&(this.zeichenSignatur=l,this.szene.zeichne({koerper:i.koerper,darstellung:e.darstellung,versteckt:r,gedimmt:s,blass:a,geister:o}),e.einpassenNoetig&&(e.einpassenNoetig=!1,this.einpassenSofort()))}drahtSignatur="";zeichneDraht(){const e=this.app.draht;e.anstossen();const t=e.zeichnung(),i=JSON.stringify([t,this.app.thema]);if(i!==this.drahtSignatur&&(this.drahtSignatur=i,this.szene.zeichneDraht(t),e.einpassen&&t.length&&(e.einpassen=!1,this.einpassenSofort())),e.feldFokus){const r=this.rahmen.querySelector(`[data-feld-eingabe="${e.feldFokus}"]`);e.feldFokus=null,r?.focus()}}einpassenSofort(){this.szene.groesseAnpassen(),this.szene.passeEin(this.app.huelleAlle(),0)}neuesDokument(){this.zeichenSignatur=""}ueberlagerung(){const e=this.app,t=[],i=qu(e);if(i&&t.push(i),e.dnd){const r=e.find(e.dnd.id);t.push(L("div",{class:"zieh-vorschau","data-overlay":"ziehen","data-muster-kandidat":"Ziehen & Ablegen","data-key":"ziehen",style:`left:${Math.round(e.dnd.x+14)}px;top:${Math.round(e.dnd.y+14)}px`},r?.meta.name??""))}as(this.overlay,L("div",{class:"ueberlagerung"},...t))}}const Lb=[[/\bsteg\b|\brib\b|\bweb\b/,"steg"],[/grundplatte|base ?plate|\bbase\b/,"grundplatte"],[/bohrung|\bholes?\b/,"bohrungen"],[/deckel|\blid\b/,"deckel"],[/gehäuse|gehaeuse|\bhousing\b/,"gehaeuse"]],Db=[[/dick|thick/,"dicke"],[/hoch|höher|hoeher|höhe|hoehe|tall|high|height/,"hoehe"],[/lang|länge|laenge|long|length/,"laenge"],[/breit|wide|width/,"breite"],[/durchmesser|diameter|ø/,"durchmesser"],[/radius|rund|round/,"eckradius"]];function zb(n,e){for(const[t,i]of Lb)if(t.test(e))return n.find(i);return n.gewaehlteElemente()[0]}function Ib(n){return["dicke","hoehe","durchmesser"].find(e=>n.params[e]!==void 0)}function Yo(n,e,t,i){const r=To(e.params[t],n.sprache),s=To(ct(i),n.sprache);return{titel:n.t("chat.vorschlag.wert",{element:e.meta.name,feld:n.t(`feld.${t}`),nachher:s}),begruendung:n.t("chat.vorschlag.begruendung"),werte:[{feld:n.t(`feld.${t}`),vorher:r,nachher:s}],befehle:[{id:"element.wert-setzen",parameter:{element:e.id,name:t,wert:ct(i)}}],ziel:e.id}}function Aa(n,e,t,i,r){return{titel:n.t(e,{element:t?.meta.name??""}),begruendung:n.t("chat.vorschlag.begruendung"),werte:[],befehle:[{id:i,parameter:r}],ziel:t?.id??""}}function Nb(n,e){const t=e.toLowerCase(),i=zb(n,t),r=/(\d+(?:[.,]\d+)?)\s*(mm|cm|m)\b/.exec(t);if(r&&i){const s={mm:1,cm:10,m:1e3}[r[2]],a=Number(r[1].replace(",","."))*s,o=Db.find(([l])=>l.test(t))?.[1]??Ib(i);if(o&&i.params[o]!==void 0)return Yo(n,i,o,a)}if(/dupliz|kopie|kopier|copy|clone/.test(t)&&i)return Aa(n,"chat.vorschlag.duplizieren",i,"element.duplizieren",{element:i.id});if(/verwirf|wirf .*weg|entfern|lösch|loesch|discard|remove|delete/.test(t)&&i)return Aa(n,"chat.vorschlag.verwerfen",i,"element.verwerfen",{element:i.id});if(/\banlegen\b|leg .*an|neues|neue |create|new /.test(t)){const s=/baugruppe|assembly/.test(t)?"baugruppe":"teil";return Aa(n,"chat.vorschlag.anlegen",void 0,"element.anlegen",{typ:s})}return null}function Ub(n){n.registriere("chat.senden",e=>{const t=(typeof e.text=="string"?e.text:n.chat.eingabe).trim();if(!t)return!1;n.chat.nachrichten.push({von:"person",text:t}),n.chat.eingabe="";const i=Nb(n,t);i?(n.chat.vorschlag=i,n.chat.nachrichten.push({von:"ki",text:"",schluessel:"chat.antwort.vorschlag"})):(n.chat.vorschlag=null,n.chat.nachrichten.push({von:"ki",text:"",schluessel:"chat.antwort.unklar"}))}),n.registriere("chat.uebernehmen",()=>{const e=n.chat.vorschlag;if(!e)return!1;n.chat.vorschlag=null;for(const t of e.befehle)n.ausfuehren(t.id,t.parameter,"chat","ki");n.chat.nachrichten.push({von:"ki",text:"",schluessel:"chat.antwort.erledigt"})}),n.registriere("chat.verwerfen",()=>{n.chat.vorschlag=null,n.chat.nachrichten.push({von:"ki",text:"",schluessel:"chat.antwort.verworfen"})})}const it=(n,...e)=>L("figure",{class:"beispiel","data-key":n},L("figcaption",{},n),...e.filter(t=>!!t)),Ta=(n,e,t)=>JSON.stringify(n.darstellungVon(e,t)?.kanaele??[]),nh=[{zustand:"hover",element:"steg",darstellungen:["modell","struktur"],einrichten:n=>n.hover="steg"},{zustand:"ausgewaehlt",element:"grundplatte",darstellungen:["modell","struktur","chat"],einrichten:n=>n.setzeAuswahl([{element_id:"grundplatte"}])},{zustand:"andere",element:"steg",darstellungen:["modell","struktur"],einrichten:n=>n.andere={aktiv:!0,dok:"halter",element:"steg"}},{zustand:"aktiv",element:"gehaeuse",doku:!0,darstellungen:["modell","struktur","pfad"],einrichten:n=>{n.dok="sensorgehaeuse",n.aktiv="gehaeuse"}},{zustand:"gedimmt",element:"deckel",doku:!0,darstellungen:["modell","struktur"],einrichten:n=>{n.dok="sensorgehaeuse",n.aktiv="gehaeuse"}},{zustand:"ausgeblendet",element:"skizze",darstellungen:["modell","struktur"],einrichten:n=>n.ausgeblendet.add("skizze")},{zustand:"fehlerhaft",element:"bohrungen",darstellungen:["modell","struktur"],einrichten:n=>{const e=ht(n.dokument(),"bohrungen");e&&(e.params.durchmesser=ct(55))}},{zustand:"pausiert",element:"steg",darstellungen:["modell","struktur"],einrichten:n=>{const e=ht(n.dokument(),"steg");e&&(e.meta.pausiert=!0)}},{zustand:"rechnet",element:"grundplatte",darstellungen:["modell","struktur"],einrichten:n=>n.status.set("grundplatte","rechnet")}];function Fb(n,e){const t=n.darstellungVon(e,"modell")?.kanaele.find(s=>s.kanal==="Kontur"),i=t?.breite??1,r=n.darstellungVon(e,"modell")?.kanaele??[];return L("span",{class:"modell-probe","data-kanaele":JSON.stringify(r),"data-id":e,style:"display:inline-flex;gap:8px;align-items:center"},L("svg",{width:"72",height:"36",viewBox:"0 0 72 36"},L("rect",{x:"6",y:"6",width:"60",height:"24",fill:"none","stroke-width":String(i),"stroke-dasharray":t?.strichart==="gestrichelt"?"6 4":null,style:`stroke: var(--farbe-${t?.token??"linie"})`,opacity:n.zustaende(e).includes("ausgeblendet")?"0.35":null})))}function Ob(n){return nh.map(e=>{const t=n.app(e.einrichten),i=t.find(e.element);if(!i)return L("span",{});const r=e.darstellungen.map(s=>s==="modell"?L("div",{class:"teil"},Fb(t,e.element)):s==="struktur"?L("div",{class:"teil baum","data-kanaele":Ta(t,e.element,"struktur")},ki(t,i,0,0)):s==="chat"?L("div",{class:"teil","data-kanaele":Ta(t,e.element,"chat")},$o(t)):L("div",{class:"teil","data-kanaele":Ta(t,e.element,"pfad")},As(t)));return it(n.t(`katalog.zustand.${e.zustand}`),L("div",{class:"zeile-bsp"},...r))})}const Bb=["schritt"];function Vb(n,e){const t=pr(n.register,e,i=>n.anwendbar(i));return n.kontextMenue={x:0,y:0,art:e,menue:t,mehrOffen:!1},qu(n)}const Zo=[{id:"zustaende",bezug:{art:"kandidat",name:"Elementzustände"},adrs:[65,61],befehle:["auswahl.setzen","element.ausblenden","element.verwerfen"],tokens:["akzent","akzent-flaeche","flaeche-2","linie-stark","text-2","text-3","fehler","fehler-flaeche"],beispiele:Ob},{id:"auswahl",bezug:{art:"muster",name:"Auswahl im Modell"},adrs:[65,58],befehle:["auswahl.setzen","auswahl.alles","auswahl.aufheben"],tokens:["akzent","akzent-flaeche"],beispiele:n=>{const e=n.app(t=>t.setzeAuswahl([{element_id:"grundplatte"},{element_id:"steg"}]));return[it(n.t("katalog.bsp.auswahl-struktur"),L("div",{class:"baum"},...ls(e))),it(n.t("katalog.bsp.auswahl-eigenschaften"),L("div",{},...$u(e))),it(n.t("katalog.bsp.auswahl-chat"),$o(e))]}},{id:"struktur-zeile",bezug:{art:"kandidat",name:"Struktur-Zeile"},adrs:[65],befehle:["element.aktivieren","element.ausblenden","element.umbenennen"],tokens:["flaeche-2","akzent-flaeche","text","text-3","fehler"],beispiele:n=>nh.filter(e=>["hover","ausgewaehlt","ausgeblendet","fehlerhaft","rechnet"].includes(e.zustand)).map(e=>{const t=n.app(e.einrichten),i=t.find(e.element);return it(n.t(`katalog.zustand.${e.zustand}`),i?L("div",{class:"baum"},ki(t,i,0,0)):null)})},{id:"auge",bezug:{art:"kandidat",name:"Auge"},adrs:[65,15],befehle:["element.ausblenden","element.einblenden","ansicht.alles-einblenden"],tokens:["text-2","text-3","flaeche-2"],beispiele:n=>{const e=n.app(),t=n.app(i=>i.ausgeblendet.add("steg"));return[it(n.t("katalog.bsp.auge-an"),L("div",{class:"baum"},ki(e,e.find("steg"),0,0))),it(n.t("katalog.bsp.auge-aus"),L("div",{class:"baum"},ki(t,t.find("steg"),0,0)))]}},{id:"kontextmenue",bezug:{art:"kandidat",name:"Kontextmenü"},adrs:[65,45],befehle:["element.duplizieren","element.umbenennen","element.verwerfen","ansicht.auf-auswahl"],tokens:["flaeche","linie-stark","flaeche-2","text-3"],beispiele:n=>Bb.map(e=>{const t=n.app(r=>r.setzeAuswahl([{element_id:"grundplatte"}])),i=Vb(t,e);return it(n.t("katalog.bsp.kontextmenue"),i)})},{id:"kontextaktionen",bezug:{art:"muster",name:"Kontextaktionen"},adrs:[65,63],befehle:["element.duplizieren","element.umbenennen","element.verwerfen","element.ausblenden","ansicht.auf-auswahl"],tokens:["flaeche","linie-stark","flaeche-2"],beispiele:n=>{const e=n.app(s=>s.setzeAuswahl([{element_id:"grundplatte"}])),t=Eo(pr(e.register,"schritt",s=>e.anwendbar(s))),i=n.app(s=>s.setzeAuswahl([{element_id:"grundplatte"},{element_id:"steg"}])),r=Eo(pr(i.register,"mehrfach",s=>i.anwendbar(s)));return[it(n.t("katalog.bsp.ein-element"),ko(e,t,null)),it(n.t("katalog.bsp.mehrere"),ko(i,r,null))]}},{id:"dropdown",bezug:{art:"kandidat",name:"Dropdown"},adrs:[65,60],befehle:["bearbeiten.rueckgaengig","element.duplizieren","auswahl.alles","element.umhaengen"],tokens:["flaeche","linie-stark","flaeche-2","text-3"],beispiele:n=>{const e=n.app();return[it(n.t("familie.Bearbeiten"),gr("dropdown-bearbeiten",Ui(e,"Bearbeiten"))),it(n.t("familie.Baugruppe"),gr("dropdown-baugruppe",Ui(e,"Baugruppe")))]}},{id:"suche",bezug:{art:"muster",name:"Suche"},adrs:[45,52],befehle:["suche.oeffnen","katalog.oeffnen"],tokens:["flaeche","linie-stark","akzent-flaeche"],beispiele:n=>{const e=n.app(t=>t.suche={offen:!0,text:"ver",index:0,alle:!1,fokussiert:!0});return[it(n.t("katalog.bsp.suche"),Bu(e))]}},{id:"wertfeld",bezug:{art:"muster",name:"Wertfeld"},adrs:[44,57],befehle:["element.wert-setzen"],tokens:["flaeche-2","linie","linie-stark"],beispiele:n=>{const e=n.app(),t={key:"laenge",param:"laenge",text:"80 mm",editierbar:!0},i={...t,text:n.t("eigenschaften.gemischt")},r=n.app(s=>s.feldBefund={feld:"laenge",schluessel:"wert.fehler.nicht-lesbar"});return[it(n.t("katalog.bsp.wert"),os(e,t,["grundplatte"],!1)),it(n.t("katalog.bsp.gemischt"),os(e,i,["grundplatte","steg"],!0)),it(n.t("katalog.bsp.fehler"),os(r,{...t,text:"abc"},["grundplatte"],!1))]}},{id:"griff",bezug:{art:"kandidat",name:"Griff"},adrs:[44,65],befehle:["element.wert-setzen"],tokens:["akzent","flaeche","linie-stark"],beispiele:n=>[it(n.t("katalog.bsp.griff"),L("div",{class:"zeile-bsp"},L("div",{class:"griff","data-akzent":"auswahl"},xt("arrow-up",14)),L("div",{class:"zeigerzahl"},"12 mm")))]},{id:"ziehen-ablegen",bezug:{art:"kandidat",name:"Ziehen & Ablegen"},adrs:[65,51],befehle:["element.umhaengen"],tokens:["akzent-flaeche","fehler-flaeche","flaeche"],beispiele:n=>{const e=(r,s,a)=>{r.dok="sensorgehaeuse",r.dnd={id:s==="gehaeuse"?"baugruppe-1":"deckel",x:0,y:0,ziel:s,erlaubt:a}},t=n.app(r=>e(r,"baugruppe-1",!0)),i=n.app(r=>e(r,"gehaeuse",!1));return[it(n.t("katalog.bsp.ablegen-ok"),L("div",{class:"baum"},...ls(t))),it(n.t("katalog.bsp.ablegen-nein"),L("div",{class:"baum"},...ls(i)))]}},{id:"statusanzeige",bezug:{art:"muster",name:"Statusanzeige"},adrs:[50,61],befehle:["element.pausieren","element.fortsetzen"],tokens:["fehler","text-2"],beispiele:n=>{const e=n.app();return[it(n.t("status.rechnet"),sr(e,{zustand:"rechnet",symbol:"loader",token:"text-2"},"grundplatte")),it(n.t("status.fehlerhaft"),sr(e,{zustand:"fehlerhaft",symbol:"circle-alert",token:"fehler"},"bohrungen")),it(n.t("status.pausiert"),sr(e,{zustand:"pausiert",symbol:"circle-pause",token:"text-2"},"steg"))]}},{id:"befund",bezug:{art:"muster",name:"Befund"},adrs:[50,61],befehle:["element.wert-setzen","fenster.panel"],tokens:["fehler","fehler-flaeche","warnung-flaeche"],beispiele:n=>{const e=n.app(t=>{const i=ht(t.dokument(),"bohrungen");i&&(i.params.durchmesser=ct(55))});return[it(n.t("panel.befunde"),L("div",{},...eh(e)))]}},{id:"rueckmeldung",bezug:{art:"muster",name:"Rückmeldung"},adrs:[50,61],befehle:["bearbeiten.rueckgaengig"],tokens:["text-2","flaeche"],beispiele:n=>{const e=n.app(t=>t.meldung("rueck.verworfen",{name:"Steg"}));return[it(n.t("katalog.bsp.rueckmeldung"),L("div",{class:"leise"},...th(e)))]}},{id:"entscheidungskarte",bezug:{art:"muster",name:"Entscheidungskarte"},adrs:[21,61],befehle:["chat.uebernehmen","chat.verwerfen"],tokens:["akzent","flaeche","linie-stark"],beispiele:n=>{const e=n.app(t=>{const i=ht(t.dokument(),"steg");i&&(t.chat.vorschlag=Yo(t,i,"hoehe",40))});return[it(n.t("katalog.bsp.karte"),Gu(e))]}},{id:"pfad",bezug:{art:"kandidat",name:"Pfad"},adrs:[65],befehle:["element.aktivieren","element.verlassen"],tokens:["text-2","text","flaeche-2"],beispiele:n=>{const e=n.app(t=>{t.dok="sensorgehaeuse",t.aktiv="gehaeuse"});return[it(n.t("katalog.bsp.pfad"),As(e)),it(n.t("katalog.bsp.pfad-wurzel"),As(n.app()))]}},{id:"dokument-reiter",bezug:{art:"kandidat",name:"Dokument-Reiter"},adrs:[65],befehle:["dokument.wechseln"],tokens:["flaeche","flaeche-2","text-2"],beispiele:n=>[it(n.t("katalog.bsp.reiter"),Ju(n.app()))]},{id:"ansichtsleiste",bezug:{art:"kandidat",name:"Ansichtsleiste"},adrs:[65,60],befehle:["ansicht.einpassen","ansicht.auf-auswahl","ansicht.isolieren","ansicht.projektion","darstellung.wechseln"],tokens:["flaeche","linie","flaeche-2"],beispiele:n=>[it(n.t("katalog.bsp.ansichtsleiste"),ju(n.app()))]},{id:"fokus-tastatur",bezug:{art:"kandidat",name:"Fokus und Tastatur"},adrs:[60,65],befehle:["suche.oeffnen","bearbeiten.rueckgaengig","fenster.naechste-zone"],tokens:["akzent","text-2"],beispiele:n=>{const e=n.app(),t=e.find("steg"),i=Ni.filter(r=>r.kuerzel);return[it(n.t("katalog.bsp.fokus"),L("div",{class:"baum"},t?ki(e,t,0,0):null)),it(n.t("katalog.bsp.kuerzel"),L("ul",{class:"kuerzel-liste"},...i.map(r=>L("li",{"data-key":r.id},L("span",{},n.t(r.titel)),L("kbd",{},ci(r.kuerzel,n.sprache))))))]}}];Zo.map(n=>n.id);function Hb(n,e,t){n.replaceChildren(L("div",{class:"katalog","data-katalog":"uebersicht"},L("h1",{},e("katalog.titel")),L("p",{},e("katalog.einleitung")),L("div",{class:"katalog-raster"},...Zo.map(i=>L("a",{class:"katalog-karte",href:`?katalog=${i.id}&thema=${t}`,"data-katalog-link":i.id},L("h2",{},e(`katalog.baustein.${i.id}`)))))))}function Gb(n,e,t,i,r){const s=l=>({t,sprache:i,thema:l,app:c=>{const u=new Hu(t,i,0,Ni,Ds());return u.thema=l,c?.(u),u}}),a=l=>L("div",{"data-bild":l,"data-thema":l,class:"bild"},L("h3",{},t(`katalog.${l}`)),...e.beispiele(s(l))),o=e.befehle.map(l=>Ni.find(c=>c.id===l)).filter(l=>!!l);n.replaceChildren(L("div",{class:"katalog","data-katalog":"seite","data-baustein":e.id,"data-muster-kandidat":e.bezug.art==="kandidat"?e.bezug.name:null},L("a",{href:`?katalog&thema=${r}`,class:"zurueck"},t("katalog.zurueck")),L("h1",{},t(`katalog.baustein.${e.id}`)),L("section",{},L("h2",{},t("katalog.ueberschrift.regel")),L("p",{"data-regel":"","data-schluessel":`katalog.regel.${e.id}`},t(`katalog.regel.${e.id}`))),L("section",{},L("h2",{},t("katalog.ueberschrift.bezug")),L("p",{"data-bezug":"","data-art":e.bezug.art,"data-name":e.bezug.name,"data-adrs":JSON.stringify(e.adrs)},e.bezug.art==="muster"?t("katalog.bezug.muster",{name:e.bezug.name}):t("katalog.bezug.kandidat",{name:e.bezug.name})," ",e.adrs.map(l=>`ADR-${String(l).padStart(3,"0")}`).join(", "))),L("section",{},L("h2",{},t("katalog.ueberschrift.befehle")),L("ul",{},...o.map(l=>L("li",{"data-befehl-id":l.id},t(l.titel))))),L("section",{},L("h2",{},t("katalog.ueberschrift.tokens")),L("p",{"data-tokens":""},e.tokens.join(", "))),L("section",{class:"katalog-bild"},a("hell"),a("dunkel"))))}async function Wb(n,e,t,i,r){const s=Zo.find(a=>a.id===e);s?Gb(n,s,t,i,r):Hb(n,t,r),await document.fonts.ready,document.documentElement.dataset.bereit="1"}const zc=Du;function cs(n,e){return(zc[n]??Object.values(zc)[0])?.[e]??{}}function Xb(n,e,t){const i=cs(n,e);for(const r of["verschieben","drehen","zoomen"])for(const s of i[r]??[])if(s.taste===t.taste&&!!s.umschalt===t.umschalt&&!!s.strg===t.strg)return r;return null}const $b=n=>n!==0&&(Math.abs(n)%100===0||Math.abs(n)%120===0);function qb(n,e){if(e.ctrlKey)return(cs(n,"trackpad").zoomen??[]).some(s=>s.spreizen)?"zoomen":null;if(e.deltaX===0&&$b(e.deltaY))return(cs(n,"maus").zoomen??[]).some(s=>s.rad)?"zoomen":null;const i=cs(n,"trackpad"),r=e.shiftKey;for(const s of["verschieben","drehen"])if((i[s]??[]).some(a=>a.wischen&&!!a.umschalt===r))return s;return null}function Yb(n,e){const t=n.huelle(e);if(!t||!n.szene)return{x:0,y:-1};const i=(t.min[0]+t.max[0])/2,r=(t.min[1]+t.max[1])/2,s=n.szene.projiziere([i,r,t.max[2]]),a=n.szene.projiziere([i,r,t.max[2]+1]);return{x:a.x-s.x,y:a.y-s.y}}const Ra=4;function Zb(n){try{return JSON.parse(n.dataset.par??"{}")}catch{return{}}}function Kb(n){return n.closest("[data-weg]")?.dataset.weg??"menue"}function Jb(n,e){const t=document.getElementById("app"),i=e.zonen.modell,r=e.zonen.struktur;let s=!1;const a=x=>{const R=n.find(x)?.type==="view";n.ausfuehren(R?"ansicht.anwenden":"element.aktivieren",{element:x},"struktur")},o=()=>{let x=!1;return n.kontextMenue?.mehrOffen?(n.kontextMenue.mehrOffen=!1,n.kontextMenue.fokus="mehr",n.rendern(),!0):(n.menue&&(n.menue=null,x=!0),n.kontextMenue&&(n.kontextMenue=null,x=!0),n.suche.offen&&(n.suche.offen=!1,x=!0),x&&n.rendern(),x)};n.offenesSchliessen=o,t.addEventListener("click",x=>{const R=x.target;if(s){s=!1;return}const I=R.closest("[data-menue-trigger]");if(I){const We=I.dataset.menueTrigger;n.kontextMenue=null,n.suche.offen=!1,n.menue=n.menue===We?null:We,n.rendern();return}if(R.closest("[data-mehr-toggle]")&&n.kontextMenue){n.kontextMenue.mehrOffen=!n.kontextMenue.mehrOffen,n.kontextMenue.fokus=n.kontextMenue.mehrOffen?"zweite-ebene":"mehr",n.rendern();return}if(R.closest("[data-suche-folgt-alle]")){n.sucheFolgtAlle=!0,n.rendern();return}const Y=R.closest("[data-suche-element]");if(Y){n.suche.offen=!1,n.waehle(Y.dataset.sucheElement,"setzen");return}const le=R.closest("[data-befehl]");if(le&&!(le instanceof HTMLInputElement)){if(le.getAttribute("aria-disabled")==="true"&&le.dataset.folgt!=="true")return;n.ausfuehren(le.dataset.befehl,Zb(le),Kb(le));return}const xe=R.closest('[role="treeitem"]');if(xe){const We=xe.dataset.id;if(n.umhaengenModus){n.ausfuehren("element.umhaengen",{element:n.umhaengenModus,ziel:We},"struktur");return}n.offenesSchliessen?.(),n.waehle(We,x.shiftKey?"hinzufuegen":x.ctrlKey||x.metaKey?"umschalten":"setzen"),xe.focus();return}if(R.closest('[data-zone="struktur"]')&&!R.closest(".zonenkopf, .wurzel, .popup, [data-muster]")){n.setzeAuswahl([]);return}if(R.closest('[data-zone="modell"]')&&!R.closest("[data-chrome], .griff, .popup")){l(x);return}R.closest(".popup, .suche-eintrag, .menue-eintrag")||o()});function l(x){o();const R=x.shiftKey?"hinzufuegen":x.ctrlKey||x.metaKey?"umschalten":"setzen";if(n.draht.klick(x.clientX,x.clientY,R)){i.focus({preventScroll:!0}),n.rendern();return}const I=n.szene?.trefferBei(x.clientX,x.clientY);if(!I){R==="setzen"&&n.setzeAuswahl([]);return}const G=n.zielFuerTreffer(I.elementId);if(!G){R==="setzen"&&n.setzeAuswahl([]);return}const Y=n.kanteBei(G,x.clientX,x.clientY);n.waehle(G,R,Y??void 0),i.focus({preventScroll:!0})}t.addEventListener("dblclick",x=>{const R=x.target,I=R.closest('[role="treeitem"]');if(I&&!R.closest("button")){a(I.dataset.id);return}const G=R.closest("[data-name-feld]");if(G){n.ausfuehren("element.umbenennen",{element:G.dataset.nameFeld},"eigenschaften");return}if(R.closest('[data-zone="modell"]')&&!R.closest("[data-chrome], .griff, .popup")){const Y=n.szene?.trefferBei(x.clientX,x.clientY),le=Y?n.zielFuerTreffer(Y.elementId):null;le&&n.ausfuehren("element.aktivieren",{element:le},"menue")}});function c(x,R){const I=n.auswahlart(),G=pr(n.register,I,xe=>n.anwendbar(xe));n.menue=null,n.suche.offen=!1;const Y=260,le=420;n.kontextMenue={x:Math.max(4,Math.min(x,window.innerWidth-Y-4)),y:Math.max(4,Math.min(R,window.innerHeight-le-4)),art:I,menue:G,mehrOffen:!1},n.rendern()}n.kontextOeffnen=c;let u=!1,f=null;function h(x,R){if(n.draht.kontext(x,R)){c(x,R);return}const I=n.szene?.trefferBei(x,R),G=I?n.zielFuerTreffer(I.elementId):null;if(G){const Y=n.kanteBei(G,x,R),le=Hn(n.dokument(),I?.elementId??G).map(We=>We.id);(!n.auswahl.some(We=>le.includes(We.element_id))||Y)&&n.waehle(G,"setzen",Y??void 0)}else n.setzeAuswahl([]);c(x,R)}t.addEventListener("contextmenu",x=>{const R=x.target,I=R.closest('[role="treeitem"]');if(I){x.preventDefault();const G=I.dataset.id;n.auswahlIds().includes(G)||n.waehle(G,"setzen"),c(x.clientX,x.clientY);return}if(R.closest('[data-zone="struktur"]')&&!R.closest(".popup")){x.preventDefault(),n.setzeAuswahl([]),c(x.clientX,x.clientY);return}if(R.closest('[data-zone="modell"]')&&!R.closest("[data-chrome], .popup")){if(x.preventDefault(),u){f={x:x.clientX,y:x.clientY};return}if(p.bewegt)return;h(x.clientX,x.clientY);return}R.closest(".popup")&&x.preventDefault()});let d=null;const p={art:null,x:0,y:0,startX:0,startY:0,bewegt:!1,pointerId:-1},b=new Map;let m=null;const g=x=>{n.hover!==x&&(n.hover=x,n.rendern())};t.addEventListener("pointerdown",x=>{const R=x.target,I=R.closest(".griff");if(I&&x.button===0){C(x,I);return}const G=R.closest('[role="treeitem"]');if(G&&x.button===0&&!R.closest("button, input")){d={id:G.dataset.id,x:x.clientX,y:x.clientY};return}if(R.closest('[data-zone="modell"]')&&!R.closest("[data-chrome], .popup")){if(x.pointerType==="touch"){b.set(x.pointerId,{x:x.clientX,y:x.clientY}),m=E(),p.art=b.size===1?"drehen":null,p.x=x.clientX,p.y=x.clientY,p.startX=x.clientX,p.startY=x.clientY,p.bewegt=!1;return}const Y=Xb(n.profil,"maus",{taste:x.button,umschalt:x.shiftKey,strg:x.ctrlKey||x.metaKey});p.art=Y==="drehen"||Y==="verschieben"?Y:null,p.x=x.clientX,p.y=x.clientY,p.startX=x.clientX,p.startY=x.clientY,p.bewegt=!1,p.pointerId=x.pointerId,u=x.button===2,p.art&&x.button!==0&&x.preventDefault()}});function E(){const x=[...b.values()];if(x.length<2)return null;const[R,I]=x;return{cx:(R.x+I.x)/2,cy:(R.y+I.y)/2,d:Math.hypot(R.x-I.x,R.y-I.y)}}window.addEventListener("pointermove",x=>{if(n.zeigerPos={x:x.clientX,y:x.clientY},n.griff?.aktiv){_(x);return}if(d&&!n.dnd&&Math.hypot(x.clientX-d.x,x.clientY-d.y)>Ra&&(n.dnd={id:d.id,x:x.clientX,y:x.clientY,ziel:null,erlaubt:null}),n.dnd){y(x);return}if(x.pointerType==="touch"&&b.has(x.pointerId)){b.set(x.pointerId,{x:x.clientX,y:x.clientY}),k(x);return}if(p.art&&x.buttons){const I=x.clientX-p.x,G=x.clientY-p.y;if(p.x=x.clientX,p.y=x.clientY,Math.hypot(x.clientX-p.startX,x.clientY-p.startY)>Ra&&(p.bewegt=!0),!p.bewegt)return;p.art==="drehen"?n.szene?.drehen(-I*.4,G*.4):n.szene?.schieben(I,G);return}const R=x.target;if(!x.buttons){const I=R.closest('[role="treeitem"]');if(I)return g(I.dataset.id);if(R.closest('[data-zone="modell"]')&&!R.closest("[data-chrome], .popup")){const G=n.szene?.trefferBei(x.clientX,x.clientY);return g(G?n.zielFuerTreffer(G.elementId):null)}g(null)}});function k(x){if(b.size===1){const I=x.clientX-p.x,G=x.clientY-p.y;p.x=x.clientX,p.y=x.clientY,Math.hypot(x.clientX-p.startX,x.clientY-p.startY)>Ra*2&&(p.bewegt=!0),p.bewegt&&p.art==="drehen"&&n.szene?.drehen(-I*.4,G*.4);return}const R=E();R&&m&&(n.szene?.schieben(R.cx-m.cx,R.cy-m.cy),m.d>0&&R.d>0&&Math.abs(R.d-m.d)>.5&&n.szene?.zoomen(R.d/m.d,R.cx,R.cy)),m=R,p.bewegt=!0}window.addEventListener("pointerup",x=>{if(u&&x.pointerType!=="touch"){u=!1;const R=f;f=null,R&&!p.bewegt&&h(R.x,R.y)}if(x.pointerType==="touch"&&(b.delete(x.pointerId),m=E(),b.size||(p.art=null)),n.griff?.aktiv){T();return}if(n.dnd){M();return}d&&(d=null),p.art&&x.pointerId===p.pointerId&&(p.art=null,setTimeout(()=>{p.bewegt=!1},0))}),t.addEventListener("pointerleave",()=>g(null)),r.addEventListener("pointerleave",()=>g(null));function y(x){const R=n.dnd;if(!R)return;R.x=x.clientX,R.y=x.clientY;const G=document.elementFromPoint(x.clientX,x.clientY)?.closest('[role="treeitem"], [data-wurzel]'),Y=G?.dataset.id??G?.dataset.wurzel??null;if(Y&&Y!==R.id){const le=n.ablegenPruefen(R.id,Y);R.ziel=Y,R.erlaubt=le.erlaubt,R.grund=le.grund,le.grund&&n.meldung(le.grund)}else R.ziel=null,R.erlaubt=null;n.rendern()}function M(){const x=n.dnd;d=null,x&&(n.dnd=null,s=!0,setTimeout(()=>{s=!1},0),x.ziel&&x.erlaubt?n.ausfuehren("element.umhaengen",{element:x.id,ziel:x.ziel},"struktur"):n.rendern())}n.dndAbbrechen=()=>n.dnd?(n.dnd=null,d=null,n.rendern(),!0):!1;let w=null;function C(x,R){const I=R.dataset.griff,G=R.dataset.griffName,Y=n.find(I);if(!Y)return;x.preventDefault();const le=Yb(n,I);w={vx:le.x,vy:le.y,x0:x.clientX,y0:x.clientY};const xe=Ye(Y.params[G]);n.griff={id:I,name:G,start:xe,wert:xe,eingabe:"",zeiger:{x:x.clientX,y:x.clientY},sichtbarBis:null,aktiv:!0},n.rendern()}function _(x){const R=n.griff;if(!R||!w)return;R.zeiger={x:x.clientX,y:x.clientY};const I=w.vx**2+w.vy**2||1,G=((x.clientX-w.x0)*w.vx+(x.clientY-w.y0)*w.vy)/I;R.wert=Math.max(1,Math.round(R.start+G)),R.eingabe="",n.vorschau={id:R.id,name:R.name,wert:{value:R.wert,unit:"mm"}},n.rendern()}function T(){n.griff&&n.griffUebernehmen()}i.addEventListener("wheel",x=>{if(x.target.closest("[data-chrome], .popup"))return;x.preventDefault();const R=qb(n.profil,x);if(R==="zoomen"){const I=Math.exp(-x.deltaY*(x.ctrlKey?.01:.002));n.szene?.zoomen(I,x.clientX,x.clientY)}else R==="verschieben"?n.szene?.schieben(-x.deltaX,-x.deltaY):R==="drehen"&&n.szene?.drehen(-x.deltaX*.4,x.deltaY*.4)},{passive:!1}),t.addEventListener("focusin",x=>{const R=x.target;R instanceof HTMLInputElement&&R.dataset.feldEingabe&&(R.setAttribute("data-editiert",""),R.select());const I=R.closest("[data-zone]");I&&(n.fokusZone=I.dataset.zone??null)}),t.addEventListener("focusout",x=>{const R=x.target;R instanceof HTMLInputElement&&R.dataset.feldEingabe?(R.removeAttribute("data-editiert"),B(R,!1)):R instanceof HTMLInputElement&&R.dataset.umbenennen&&(R.removeAttribute("data-editiert"),n.umbenennen&&R.value.trim()&&R.value.trim()!==n.name(R.dataset.umbenennen)?$(R):n.umbenennen&&(n.umbenennen=null,n.rendern()))}),t.addEventListener("input",x=>{const R=x.target;R.dataset.feldEingabe?N(R):R.dataset.suchfeld!==void 0?(n.suche.text=R.value,n.suche.index=0,n.suche.alle=!1,n.sucheFolgtAlle=!1,n.rendern()):R.dataset.chatEingabe!==void 0&&(n.chat.eingabe=R.value)});function P(x){return Xv(x.value,x.dataset.dim)}function N(x){const R=(x.dataset.elemente??"").split(",").filter(Boolean),I=x.dataset.param;if(x.dataset.dim){n.feldBefund=P(x)?null:{feld:x.dataset.feldEingabe,schluessel:"wert.fehler.nicht-lesbar"},n.rendern();return}const G=Tc(x.value);if(!G.ok){n.feldBefund={feld:x.dataset.feldEingabe,schluessel:G.fehler},n.vorschau=null,n.rendern();return}n.feldBefund=null,R.length===1&&(n.vorschau={id:R[0],name:I,wert:G.groesse}),n.rendern()}function B(x,R){const I=(x.dataset.elemente??"").split(",").filter(Boolean),G=x.dataset.param;if(x.dataset.dim){const le=P(x);if(!le){n.feldBefund=R?{feld:x.dataset.feldEingabe,schluessel:"wert.fehler.nicht-lesbar"}:null,n.rendern();return}n.feldBefund=null,n.ausfuehren("element.wert-setzen",I.length===1?{element:I[0],name:G,wert:le}:{elemente:I,name:G,wert:le},"eigenschaften");return}const Y=Tc(x.value);if(!Y.ok){n.feldBefund={feld:x.dataset.feldEingabe,schluessel:Y.fehler},R||(n.vorschau=null,n.feldBefund=null),n.rendern();return}n.feldBefund=null,n.vorschau=null,n.ausfuehren("element.wert-setzen",I.length===1?{element:I[0],name:G,wert:Y.groesse}:{elemente:I,name:G,wert:Y.groesse},"eigenschaften")}function $(x){const R=n.umbenennen?.weg??"eigenschaften";n.ausfuehren("element.umbenennen",{element:x.dataset.umbenennen,name:x.value},R)}t.addEventListener("keydown",x=>{const R=x.target;if(R instanceof HTMLInputElement&&R.dataset.feldEingabe){x.key==="Enter"?(x.preventDefault(),B(R,!0),R.blur()):x.key==="Escape"&&(x.preventDefault(),x.stopPropagation(),n.vorschau=null,n.feldBefund=null,R.removeAttribute("data-editiert"),R.blur(),n.rendern());return}if(R instanceof HTMLInputElement&&R.dataset.umbenennen){x.key==="Enter"?(x.preventDefault(),R.removeAttribute("data-editiert"),R.value.trim()?$(R):(n.umbenennen=null,n.rendern()),e.zonen.eigenschaften.focus()):x.key==="Escape"&&(x.preventDefault(),x.stopPropagation(),R.removeAttribute("data-editiert"),n.umbenennen=null,n.rendern(),e.zonen.eigenschaften.focus());return}if(R instanceof HTMLInputElement&&R.dataset.suchfeld!==void 0){O(x);return}if(R instanceof HTMLInputElement&&R.dataset.chatEingabe!==void 0){x.key==="Enter"&&(x.preventDefault(),n.ausfuehren("chat.senden",{text:R.value},"chat"));return}H(x),Q(x)});function O(x){const R=n.suchTreffer().length;if(x.key==="ArrowDown")x.preventDefault(),n.suche.index=Math.min(R-1,n.suche.index+1),n.rendern();else if(x.key==="ArrowUp")x.preventDefault(),n.suche.index=Math.max(0,n.suche.index-1),n.rendern();else if(x.key==="Enter"){x.preventDefault();const I=n.suchTreffer()[n.suche.index];n.suche.offen=!1,I?n.ausfuehren(I.id,{},"suche"):n.rendern()}}function H(x){const R=x.target.closest(".popup");if(!R||!["ArrowDown","ArrowUp"].includes(x.key))return;const I=[...R.querySelectorAll(".eintrag:not([hidden] *)")].filter(le=>le.offsetParent!==null),G=I.indexOf(x.target),Y=I[(G+(x.key==="ArrowDown"?1:-1)+I.length)%I.length];Y&&(x.preventDefault(),Y.focus())}function Q(x){const R=x.target.closest('[role="treeitem"]');if(!R)return;const I=[...r.querySelectorAll('[role="treeitem"]')],G=I.indexOf(R);if(x.key==="ArrowDown"||x.key==="ArrowUp"){x.preventDefault();const Y=I[Math.max(0,Math.min(I.length-1,G+(x.key==="ArrowDown"?1:-1)))];for(const le of I)le.tabIndex=-1;Y&&(Y.tabIndex=0,Y.focus())}else x.key==="Enter"?(x.preventDefault(),a(R.dataset.id)):x.key===" "&&(x.preventDefault(),n.waehle(R.dataset.id,x.shiftKey?"hinzufuegen":x.ctrlKey||x.metaKey?"umschalten":"setzen"))}}function Qb(n){const e=n.split("+"),t=(e[e.length-1]??"").toLowerCase(),i=new Set(e.slice(0,-1).map(r=>r.toLowerCase()));return{mod:i.has("mod"),umschalt:i.has("umschalt")||i.has("shift"),alt:i.has("alt"),taste:t}}const jb=new Set(["delete","backspace"]);function eS(n,e){const t=e.ctrlKey||e.metaKey;return n.mod!==t||n.umschalt!==e.shiftKey||n.alt!==e.altKey?!1:n.taste==="entf"?jb.has(e.key.toLowerCase()):/^f\d+$/.test(n.taste)?e.key.toLowerCase()===n.taste:n.taste.length===1&&e.code===`Key${n.taste.toUpperCase()}`||e.key.toLowerCase()===n.taste}function tS(n,e){for(const t of n)if(t.kuerzel&&eS(Qb(t.kuerzel),e))return t;return null}function nS(n){window.addEventListener("keydown",e=>{const t=e.target,i=t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t?.isContentEditable===!0;if(n.tastenfokus=!0,n.griff?.aktiv){if(/^\d$/.test(e.key))n.griff.eingabe+=e.key,n.griff.wert=Number(n.griff.eingabe),n.vorschau={id:n.griff.id,name:n.griff.name,wert:{value:n.griff.wert,unit:"mm"}},n.rendern();else if(e.key==="Backspace")n.griff.eingabe=n.griff.eingabe.slice(0,-1),n.rendern();else if(e.key==="Enter")n.griffUebernehmen();else if(e.key==="Escape")n.griffAbbrechen();else return;e.preventDefault(),e.stopPropagation();return}const r=n.kontextMenue;if(r&&["ArrowDown","ArrowUp","ArrowRight","ArrowLeft"].includes(e.key)){const l=document.activeElement,c=!!l?.closest(".kontextmenue-mehr");if(e.key==="ArrowLeft"){if(!c)return;r.mehrOffen=!1,r.fokus="mehr"}else if(e.key==="ArrowRight"){if(!l?.hasAttribute("data-mehr-toggle")||r.mehrOffen)return;r.mehrOffen=!0,r.fokus="zweite-ebene"}else{const u=[...document.querySelectorAll(c?".kontextmenue-mehr [data-befehl]":'.kontextmenue > [role="group"] [data-befehl], .kontextmenue > [data-mehr-toggle]')];if(!u.length)return;const f=l?u.indexOf(l):-1,h=e.key==="ArrowDown"?1:-1,d=f<0?h>0?0:u.length-1:f+h;u[(d+u.length)%u.length]?.focus(),e.preventDefault();return}e.preventDefault(),n.rendern();return}if(e.key==="Escape"){if(n.offenesSchliessen?.()){e.preventDefault();return}if(n.draht.abbrechen()){e.preventDefault();return}if(n.dndAbbrechen?.()){e.preventDefault();return}if(n.umhaengenModus){n.umhaengenModus=null,n.rendern();return}if(n.chat.vorschlag&&t?.closest('[data-zone="chat"]')){n.chat.vorschlag=null,n.rendern();return}if(n.auswahl.length){n.setzeAuswahl([]);return}if(n.aktiv){n.ausfuehren("element.verlassen",{},"kuerzel");return}return}const s=t instanceof HTMLInputElement&&t.hasAttribute("data-feld-eingabe"),a=tS(n.register,e);if(!a)return;const o=e.ctrlKey||e.metaKey;if(!(i&&!o&&!/^f\d+$/i.test(a.kuerzel??""))&&!(i&&o&&(a.id==="auswahl.alles"||a.id==="element.duplizieren"))&&!(i&&s&&(a.id==="bearbeiten.rueckgaengig"||a.id==="bearbeiten.wiederholen"))&&!(i&&t instanceof HTMLInputElement&&t.dataset.suchfeld!==void 0&&o&&a.id!=="suche.oeffnen")){if(e.preventDefault(),a.id==="fenster.naechste-zone"){n.naechsteZone(e.shiftKey);return}if(a.id==="suche.oeffnen"){n.ausfuehren("suche.oeffnen",{},"kuerzel");return}n.anwendbar(a)&&n.ausfuehren(a.id,{},"kuerzel")}},!0)}const ka=["koerper","kanten","durchsicht"];function Qn(n,e){return typeof e.element=="string"?[e.element]:Array.isArray(e.elemente)?e.elemente.map(String):n.auswahlIds()}function iS(n,e){const t=dn(e),i=new Set(St(n).map(a=>a.id)),r=a=>{let o=2,l=`${a}-${o}`;for(;i.has(l);)l=`${a}-${o+=1}`;return i.add(l),l},s=a=>{a.id=r(a.id.replace(/-\d+$/,""));for(const o of a.content)s(o)};return s(t),t}const rS=n=>String.fromCharCode(65+n%26);function sS(n){const e=n.registriere.bind(n),t=n.t;e("element.anlegen",(c,u,f)=>{const h=typeof c.typ=="string"?c.typ:"teil",d=n.neuesElement(h);n.protokolliere("element.anlegen",{typ:h},u,f),n.auswahl=[{element_id:d}],n.meldung("rueck.angelegt",{name:n.name(d)})}),e("baugruppe.anlegen",(c,u,f)=>{const h=n.neuesElement("baugruppe");n.protokolliere("baugruppe.anlegen",{},u,f),n.auswahl=[{element_id:h}],n.meldung("rueck.angelegt",{name:n.name(h)})}),e("element.umbenennen",(c,u,f)=>{const h=typeof c.element=="string"?c.element:n.auswahlIds()[0];if(!h||typeof c.element!="string"&&n.auswahlIds().length!==1)return!1;if(typeof c.name!="string"){n.umbenennen={id:h,weg:u},n.auswahl=[{element_id:h}];return}const d=c.name.trim();if(n.umbenennen=null,!d)return!1;const p=n.aendern(b=>{const m=ht(b,h);m&&(m.meta.name=d)});return p&&(n.protokolliere("element.umbenennen",{element:h,name:d},u,f),n.meldung("rueck.umbenannt",{name:d})),p});const i=c=>(u,f,h)=>{const d=Qn(n,u),p=[],b=n.aendern(m=>{for(const g of d){const E=ht(m,g),k=E?Ms(m,g):void 0;if(!E||!k)continue;const y=iS(m,E);if(y.meta.name=`${E.meta.name} ${t("name.kopie")}`,y.params.lage_y!==void 0||y.params.breite!==void 0){const M=y.params.breite?Ye(y.params.breite)+6:20;y.params.lage_y={value:Ye(y.params.lage_y)+M,unit:"mm"}}else y.params.lage_x!==void 0&&(y.params.lage_x={value:Ye(y.params.lage_x)+100,unit:"mm"});k.content.splice(k.content.indexOf(E)+1,0,y),p.push(y.id)}});return b&&(n.protokolliere(c,d.length===1?{element:d[0]}:{elemente:d},f,h),n.auswahl=p.map(m=>({element_id:m})),n.meldung("rueck.dupliziert",{name:n.name(p[0]??"")})),b};e("element.duplizieren",i("element.duplizieren")),e("auswahl.duplizieren",i("auswahl.duplizieren"));const r=c=>(u,f,h)=>{const d=Qn(n,u).filter(m=>n.find(m)&&!wt(n.find(m)));if(!d.length)return!1;const p=d.map(m=>n.name(m)),b=n.aendern(m=>{for(const g of d){const E=ht(m,g);E&&(E.meta.verworfen=!0)}});return b&&(n.protokolliere(c,d.length===1?{element:d[0]}:{elemente:d},f,h),n.auswahl=n.auswahl.filter(m=>!d.includes(m.element_id)),n.aktiv&&d.includes(n.aktiv)&&(n.aktiv=null),n.meldung("rueck.verworfen",{name:p[0]??""})),b};e("element.verwerfen",r("element.verwerfen")),e("auswahl.verwerfen",r("auswahl.verwerfen")),e("element.zurueckholen",(c,u,f)=>{const h=Qn(n,c),d=n.aendern(p=>{for(const b of h){const m=ht(p,b);m&&delete m.meta.verworfen}});return d&&(n.protokolliere("element.zurueckholen",{element:h[0]},u,f),n.meldung("rueck.zurueckgeholt",{name:n.name(h[0]??"")})),d}),e("element.wert-setzen",(c,u,f)=>{const h=typeof c.element=="string"?c.element:n.auswahlIds()[0];if(!h||typeof c.name!="string"||!c.wert){n.fokusEigenschaften=!0;return}return n.wertSetzen(h,c.name,c.wert,u,f)});const s=c=>(u,f,h)=>{const d=Qn(n,u),p=n.aendern(b=>{for(const m of d){const g=ht(b,m);g&&(c?g.meta.pausiert=!0:delete g.meta.pausiert)}});return p&&n.protokolliere(c?"element.pausieren":"element.fortsetzen",{element:d[0]},f,h),p};e("element.pausieren",s(!0)),e("element.fortsetzen",s(!1)),e("element.umhaengen",(c,u,f)=>{const h=typeof c.element=="string"?c.element:n.auswahlIds()[0];if(!h)return!1;if(typeof c.ziel!="string"){n.umhaengenModus=h,n.meldung("rueck.ziel-waehlen");return}const d=c.ziel;n.umhaengenModus=null;const p=n.ablegenPruefen(h,d);if(!p.erlaubt)return n.meldung(p.grund??"dnd.kein-ziel"),!1;const b=n.aendern(m=>{const g=ht(m,h),E=g?Ms(m,h):void 0,k=d===m.id?m:ht(m,d);!g||!E||!k||(E.content.splice(E.content.indexOf(g),1),k.content.push(g))});return b&&(n.protokolliere("element.umhaengen",{element:h,ziel:d},u,f),n.meldung("rueck.umgehaengt",{name:n.name(h),ziel:n.name(d)})),b}),e("ansicht.speichern",(c,u,f)=>{const h=n.szene?.kamera;if(!h)return!1;const d=St(n.dokument()).filter(g=>g.type==="view").length,p=`${t("name.ansicht")}: ${t("name.schnitt")} ${rS(d)}`;let b="";const m=n.aendern(g=>{b=Ru(g,"ansicht");const E={id:b,type:"view",params:{azimut:{value:h.azimut,unit:"°"},hoehe:{value:h.hoehe,unit:"°"},abstand:{value:h.abstand,unit:"mm"},ziel_x:{value:h.ziel.x,unit:"mm"},ziel_y:{value:h.ziel.y,unit:"mm"},ziel_z:{value:h.ziel.z,unit:"mm"},projektion:n.projektionsart,darstellung:n.darstellung,auswahl:dn(n.auswahl),ausgeblendet:[...n.ausgeblendet]},content:[],meta:{name:p}};g.content.push(E)});return m&&(n.protokolliere("ansicht.speichern",{name:p},u,f),n.meldung("rueck.ansicht-gespeichert",{name:p})),m}),e("bearbeiten.rueckgaengig",(c,u,f)=>{n.rueckgaengig(u,f)}),e("bearbeiten.wiederholen",(c,u,f)=>{n.wiederholen(u,f)}),e("auswahl.alles",()=>{n.setzeAuswahl(n.waehlbareIds().map(c=>({element_id:c})))}),e("auswahl.aufheben",()=>n.setzeAuswahl([])),e("auswahl.umkehren",()=>{const c=new Set(n.auswahlIds());n.setzeAuswahl(n.waehlbareIds().filter(u=>!c.has(u)).map(u=>({element_id:u})))});const a=c=>u=>{const f=Array.isArray(u.elemente)?u.elemente.map(String):[];if(!f.length)return n.meldung("rueck.auswahl-ziel"),!1;f.forEach((h,d)=>n.waehle(h,c==="setzen"&&d>0?"hinzufuegen":c))};e("auswahl.setzen",a("setzen")),e("auswahl.hinzufuegen",a("hinzufuegen")),e("auswahl.umschalten",a("umschalten")),e("element.ausblenden",c=>{for(const u of Qn(n,c))n.ausgeblendet.add(u)}),e("auswahl.ausblenden",c=>{for(const u of Qn(n,c))n.ausgeblendet.add(u)}),e("element.einblenden",c=>{for(const u of Qn(n,c))n.ausgeblendet.delete(u)}),e("ansicht.alles-einblenden",()=>{n.ausgeblendet.clear(),n.isoliert=null}),e("ansicht.verworfenes",()=>{n.verworfenesZeigen=!n.verworfenesZeigen}),e("ansicht.isolieren",()=>{n.isoliert?n.isoliert=null:n.auswahlIds().length?n.isoliert=n.auswahlIds():n.meldung("rueck.isolieren-ziel")}),e("element.aktivieren",c=>{const u=typeof c.element=="string"?c.element:n.auswahlIds()[0],f=u?n.find(u):void 0;if(!f)return!1;n.aktiv=f.id,n.auswahl=[]}),e("element.verlassen",()=>{n.aktiv=null}),e("ansicht.einpassen",()=>n.szene?.passeEin(n.huelleAlle(),200*n.tempo)),e("ansicht.auf-auswahl",()=>{const c=n.huelleAuswahl();n.szene?.passeEin(c??n.huelleAlle(),200*n.tempo)}),e("ansicht.projektion",()=>{n.projektionsart=n.projektionsart==="orthogonal"?"perspektivisch":"orthogonal",n.szene?.setProjektion(n.projektionsart)}),e("darstellung.wechseln",()=>{const c=ka.indexOf(n.darstellung);n.darstellung=ka[(c+1)%ka.length]??"koerper"});const o=(c,u)=>()=>n.szene?.nach({azimut:c,hoehe:u},200*n.tempo);e("ansicht.vorne",o(0,0)),e("ansicht.oben",o(0,89)),e("ansicht.isometrisch",o(-35,28)),e("ansicht.anwenden",c=>{const u=typeof c.element=="string"?c.element:n.auswahlIds()[0],f=u?n.find(u):void 0;if(!f||f.type!=="view"||!n.szene)return!1;const h=f.params;n.projektionsart=h.projektion==="perspektivisch"?"perspektivisch":"orthogonal",n.szene.setProjektion(n.projektionsart),n.darstellung=h.darstellung==="kanten"||h.darstellung==="durchsicht"?h.darstellung:"koerper",n.ausgeblendet=new Set(h.ausgeblendet??[]),n.auswahl=dn(h.auswahl??[]),n.setzeKamera({azimut:Ye(h.azimut),hoehe:Ye(h.hoehe),abstand:Ye(h.abstand),ziel:{x:Ye(h.ziel_x),y:Ye(h.ziel_y),z:Ye(h.ziel_z)}})}),e("fenster.struktur",()=>{n.zonen.struktur=!n.zonen.struktur}),e("fenster.panel",()=>{n.zonen.panel=!n.zonen.panel}),e("fenster.rechts",()=>{n.zonen.rechts=!n.zonen.rechts}),e("fenster.naechste-zone",()=>n.naechsteZone()),e("suche.oeffnen",()=>{n.suche={offen:!0,text:"",index:0,alle:!1,fokussiert:!1}}),e("hilfe.befehle-zeigen",()=>{n.suche={offen:!0,text:"",index:0,alle:!0,fokussiert:!1}}),e("thema.umschalten",()=>{n.thema=n.thema==="hell"?"dunkel":"hell",document.documentElement.dataset.thema=n.thema,n.szene?.setThema(n.thema)}),e("einstellung.navigationsprofil",c=>{const u=typeof c.profil=="string"&&ji.includes(c.profil)?c.profil:void 0,f=ji.indexOf(n.profil);n.profil=u??ji[(f+1)%ji.length]??n.profil}),e("katalog.oeffnen",c=>{n.katalogOffen=typeof c.baustein=="string"?c.baustein:""}),e("task.wechseln",c=>{n.task=c.task==="simulation"?"simulation":"modellieren"}),e("dokument.wechseln",c=>{typeof c.dok=="string"&&n.wechsleDokument(c.dok)});const l=n.draht;e("referenz.koordinatensystem",(c,u)=>{l.modus=null,l.koordinatensystemAnlegen(u)}),e("referenz.punkt",()=>{l.modus={art:"punkt"},n.meldung("rueck.draht.punkt-klicken")}),e("referenz.punkt-relativ",(c,u)=>{l.modus=null;const f=typeof c.element=="string"?c.element:l.gewaehltePunkte()[0];if(!f||n.find(f)?.type!=="point")return n.meldung("rueck.draht.einen-punkt"),!1;l.punktAnlegen({ref:`${f}.point`},{x:0,y:0,z:0},u),l.feldFokus="x"});for(const[c,u]of[["referenz.gerade","line"],["referenz.halbgerade","ray"],["referenz.strecke","segment"]])e(c,(f,h)=>{const d=l.gewaehltePunkte();if(d.length===2&&n.auswahlIds().length===2){l.modus=null,l.linieAnlegen(u,d[0],d[1],h);return}l.modus={art:"linie",typ:u,punkte:[]},n.meldung("rueck.draht.zwei-punkte")})}const aS=[{id:"K1",type:"frame",inputs:{},params:{x:{value:100,unit:"mm"},y:{value:0,unit:"mm"},z:{value:0,unit:"mm"},rx:{value:0,unit:"deg"},ry:{value:0,unit:"deg"},rz:{value:30,unit:"deg"}},outputs:{frame:"frame",origin:"point",x:"line",y:"line",z:"line",xy:"plane",yz:"plane",zx:"plane"},content:[{id:"K1-ursprung",type:"point",inputs:{frame:"K1.frame"},params:{x:{value:0,unit:"mm"},y:{value:0,unit:"mm"},z:{value:0,unit:"mm"}},outputs:{point:"point"},content:[],meta:{name:"Ursprung"}},{id:"K1-x",type:"axis",inputs:{of:"K1.x"},params:{},outputs:{line:"line"},content:[],meta:{name:"X-Achse"}},{id:"K1-y",type:"axis",inputs:{of:"K1.y"},params:{},outputs:{line:"line"},content:[],meta:{name:"Y-Achse"}},{id:"K1-z",type:"axis",inputs:{of:"K1.z"},params:{},outputs:{line:"line"},content:[],meta:{name:"Z-Achse"}},{id:"K1-xy",type:"plane",inputs:{of:"K1.xy"},params:{},outputs:{plane:"plane"},content:[],meta:{name:"XY-Ebene"}},{id:"K1-yz",type:"plane",inputs:{of:"K1.yz"},params:{},outputs:{plane:"plane"},content:[],meta:{name:"YZ-Ebene"}},{id:"K1-zx",type:"plane",inputs:{of:"K1.zx"},params:{},outputs:{plane:"plane"},content:[],meta:{name:"ZX-Ebene"}}],meta:{name:"Koordinatensystem 1"}},{id:"P1",type:"point",inputs:{},params:{x:{value:10,unit:"mm"},y:{value:20,unit:"mm"},z:{value:0,unit:"mm"}},outputs:{point:"point"},content:[],meta:{name:"Punkt 1"}},{id:"P2",type:"point",inputs:{frame:"K1.frame"},params:{x:{value:50,unit:"mm"},y:{value:0,unit:"mm"},z:{value:0,unit:"mm"}},outputs:{point:"point"},content:[],meta:{name:"Punkt 2"}},{id:"P3",type:"point",inputs:{ref:"P1.point"},params:{x:{value:0,unit:"mm"},y:{value:0,unit:"mm"},z:{value:25,unit:"mm"}},outputs:{point:"point"},content:[],meta:{name:"Punkt 3"}},{id:"S1",type:"segment",inputs:{a:"P1.point",b:"P2.point"},params:{},outputs:{segment:"segment",start:"point",end:"point"},content:[],meta:{name:"Strecke 1"}},{id:"G1",type:"line",inputs:{a:"P1.point",b:"P3.point"},params:{},outputs:{line:"line"},content:[],meta:{name:"Gerade 1"}},{id:"H1",type:"ray",inputs:{a:"K1.origin",b:"P2.point"},params:{},outputs:{ray:"ray",start:"point"},content:[],meta:{name:"Halbgerade 1"}}],oS={elements:aS},lS=["drahtmodell-leer","drahtmodell-beispiel"];function cS(n){return{id:"projekt",type:"projekt",params:{},content:[{id:"drahtmodell",type:"teil",params:{},content:n,meta:{name:"Drahtmodell"}}],meta:{name:"Projekt"}}}const uS=["leer","halter","auswahl","mehrfach","zustaende","aktiv","isoliert","kontextmenue","menue","ziehen","ablegen","ablegen-verboten","ausgeblendet","verworfen","rechnet","befund","andere","chat","suche","fokus","perspektive","kanten"],jn=(n,...e)=>{n.auswahl=e.map(t=>({element_id:t}))};function Ic(n){const e=ht(n.dokument(),"bohrungen");e&&(e.params.durchmesser=ct(55))}function hS(n,e){if(lS.includes(n)){const s=n==="drahtmodell-beispiel"?JSON.parse(JSON.stringify(oS.elements)):[];return e.projekt=cS(s),e.dok="drahtmodell",e.draht.einpassen=s.length>0,{gezeigt:n}}if(!uS.includes(n))return e.projekt=gc(),e.dok="teil-1",e.unbekannterZustand=!0,{gezeigt:"leer"};e.projekt=n==="leer"?gc():Ds(),e.dok=e.projekt.content[0]?.id??"";const i=n;let r;switch(i){case"leer":case"halter":break;case"auswahl":jn(e,"grundplatte");break;case"mehrfach":jn(e,"grundplatte","steg");break;case"zustaende":Ic(e),jn(e,"grundplatte"),e.hover="steg",e.ausgeblendet.add("skizze"),e.andere={aktiv:!0,dok:"sensorgehaeuse",element:"deckel"};break;case"aktiv":e.dok="sensorgehaeuse",e.aktiv="gehaeuse";break;case"isoliert":e.isoliert=["steg"],jn(e,"steg");break;case"kontextmenue":jn(e,"grundplatte"),r=()=>{const s=e.szene?.projiziere([0,0,8]);e.kontextOeffnen?.(s?.x??600,s?.y??400)};break;case"menue":e.menue="dropdown:Bearbeiten";break;case"ziehen":jn(e,"grundplatte"),r=()=>{const s=e.huelle("grundplatte"),a=s&&e.szene?e.szene.projiziere([0,0,s.max[2]]):{x:600,y:300};e.griff={id:"grundplatte",name:"dicke",start:8,wert:11,eingabe:"",zeiger:{x:a.x,y:a.y-60},sichtbarBis:null,aktiv:!1},e.vorschau={id:"grundplatte",name:"dicke",wert:ct(11)},e.rendernSofort()};break;case"ablegen":case"ablegen-verboten":{e.dok="sensorgehaeuse";const s=i==="ablegen-verboten";r=()=>{const a=s?"gehaeuse":"baugruppe-1",l=document.querySelector(`[role="treeitem"][data-id="${a}"]`)?.getBoundingClientRect(),c=s?"baugruppe-1":"deckel",u=e.ablegenPruefen(c,a);e.dnd={id:c,x:(l?.left??100)+60,y:(l?.top??100)+(l?.height??24)/2,ziel:a,erlaubt:u.erlaubt,grund:u.grund},u.grund&&e.meldung(u.grund),e.rendernSofort()};break}case"ausgeblendet":e.ausgeblendet.add("steg");break;case"verworfen":{const s=ht(e.dokument(),"bohrungen");s&&(s.meta.verworfen=!0),e.verworfenesZeigen=!0;break}case"rechnet":e.status.set("grundplatte","rechnet");break;case"befund":Ic(e),e.zonen.panel=!0;break;case"andere":e.andere={aktiv:!0,dok:"halter",element:"steg"};break;case"chat":{jn(e,"steg");const s=ht(e.dokument(),"steg");e.chat.nachrichten=[{von:"person",text:"",schluessel:"chat.beispiel.frage"},{von:"ki",text:"",schluessel:"chat.antwort.vorschlag"}],s&&(e.chat.vorschlag=Yo(e,s,"hoehe",40));break}case"suche":e.suche={offen:!0,text:"ver",index:0,alle:!1,fokussiert:!1};break;case"fokus":r=()=>{const s=document.querySelector('[role="treeitem"][data-id="steg"]');if(s){for(const a of document.querySelectorAll('[role="treeitem"]'))a.tabIndex=-1;s.tabIndex=0,s.setAttribute("data-fokus",""),s.focus()}};break;case"perspektive":e.projektionsart="perspektivisch";break;case"kanten":e.darstellung="kanten";break}return{gezeigt:i,danach:r}}const ni=new URLSearchParams(window.location.search),us=ni.get("thema")==="dunkel"?"dunkel":"hell",hs=ix(window.location.search),dS=ni.get("tempo")==="0"?0:1;document.documentElement.dataset.thema=us;document.documentElement.lang=hs==="en"?"en":"de";async function fS(){const n=ni.get("register");if(!n)return Ni;try{const e=await fetch(n);return Av(await e.json())}catch{return Ni}}function pS(){try{const n=window.localStorage.getItem(Vu);if(!n)return null;const e=JSON.parse(n);return e&&Array.isArray(e.content)&&e.content.length?e:null}catch{return null}}function mS(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0).toString(16).padStart(8,"0")}const gS=n=>JSON.stringify(n,(e,t)=>t&&typeof t=="object"&&!Array.isArray(t)?Object.fromEntries(Object.entries(t).sort(([i],[r])=>i.localeCompare(r))):t);async function vS(){const n=document.getElementById("app"),e=await fS(),t=sx(hs);if(ni.has("katalog")){await Wb(n,ni.get("katalog")??"",t,hs,us);return}const i=ni.get("zustand"),r=i===null?pS():null,s=new Hu(t,hs,dS,e,r??Ds());s.thema=us,s.rechenzeitMs=Number(ni.get("rechenzeit")??0)||0,sS(s),Ub(s);let a="halter",o;if(i!==null){const d=hS(i,s);a=d.gezeigt,o=d.danach}const l=new Pb(n,s);l.szene.setThema(us),Jb(s,l),nS(s),s.rendernSofort(),l.einpassenSofort(),s.rendernSofort(),o?.(),s.rendernSofort();const c=()=>s.dokument(),u=()=>{const d=s.szene?.kamera;return{azimut_grad:d?.azimut??0,hoehe_grad:d?.hoehe??0,abstand_mm:d?.abstand??0,ziel:{x:d?.ziel.x??0,y:d?.ziel.y??0,z:d?.ziel.z??0}}},f=d=>{const p=vr(s,d);if(!p)return null;const b=Es(p),m=new Set(s.mitNachfahren(d)),g=[],E=Math.max(10,Math.sqrt(b.breite*b.hoehe/300));for(let M=b.y;M<b.y+b.hoehe;M+=E)for(let w=b.x;w<b.x+b.breite;w+=E){const C=s.szene?.trefferBei(w,M);if(!C||!m.has(C.elementId))continue;const _=s.zielFuerTreffer(C.elementId);if(_!==d&&!m.has(_??"")||s.kanteBei(C.elementId,w,M))continue;(s.szene?.kantenVon(C.elementId,s.huelle(C.elementId)??{min:[0,0,0],max:[0,0,0]})??[]).some(P=>{const N=P.bis.x-P.von.x,B=P.bis.y-P.von.y,$=N*N+B*B||1,O=Math.max(0,Math.min(1,((w-P.von.x)*N+(M-P.von.y)*B)/$));return Math.hypot(w-(P.von.x+O*N),M-(P.von.y+O*B))<14})||g.push({x:Math.round(w),y:Math.round(M)})}const k=s.huelle(d),y=k&&s.szene?s.szene.kantenVon(d,k):[];return{huellbox:b,huelle:p,treffer:g,kanten:y.map(M=>({id:M.adresse,name:M.name,mitte:M.mitte,von:M.von,bis:M.bis}))}};Object.defineProperty(window,"__cee",{value:Object.freeze({bereit:!0,zustand:a,modell:()=>s.modell(),modellHash:()=>mS(gS(s.projekt)),auswahl:()=>s.auswahl.map(d=>({...d})),protokoll:()=>s.protokoll.map(d=>({...d})),befehle:()=>s.register.map(d=>({id:d.id,kuerzel:d.kuerzel??null,titel:d.titel,titel_text:s.t(d.titel),rang:d.rang,familie:d.familie,handlung:d.handlung??null,wirkung:d.folgt!==!0,orte:Ev(d)})),ausgeloest:()=>s.ausgeloest.map(d=>({...d})),teil:()=>{const d=s.teilErgebnis();return{abmessungen_mm:[...d.abmessungen_mm],volumen_mm3:d.volumen_mm3,masse_g:d.masse_g}},ansicht:()=>({aktiv:s.aktiv,pfad:s.pfadGlieder().map(d=>d.meta.name),ausgeblendet:[...s.ausgeblendet],isoliert:s.isoliert?[...s.isoliert]:[],darstellung:s.darstellung,projektion:s.projektionsart,profil:s.profil,kamera:u(),projektion_von:f,kontur_punkte:d=>yb(s,d)}),zustaende:d=>{const p=s.zeilen().some(y=>y.element.id===d),b=new Set(s.mitNachfahren(d)),m=Gn(s.angezeigtesDokument()).koerper.some(y=>b.has(y.elementId)),g=s.istAusgeblendet(d),E=s.auswahlIds().length===1&&s.auswahlIds()[0]===d,k=s.pfadGlieder().some(y=>y.id===d);return{modell:m||g?s.darstellungVon(d,"modell"):null,struktur:p?s.darstellungVon(d,"struktur"):null,chat:E?s.darstellungVon(d,"chat"):null,pfad:k?s.darstellungVon(d,"pfad"):null}},einstellung:()=>({navigationsprofil:s.profil}),verlauf:()=>s.verlaufLaenge(),gezeichnet:()=>s.szene?.gezeichnet()??[],flaeche_bei:(d,p)=>{const b=s.szene?.trefferBei(d,p);return b?{erzeuger_id:b.elementId,ziel_id:s.zielFuerTreffer(b.elementId)}:null},elemente:()=>St(c()).map(d=>d.id),draht:()=>({bereit:s.draht.bereit(),graph:JSON.parse(JSON.stringify(c().content)),ergebnis:s.draht.ergebnis?JSON.parse(JSON.stringify(s.draht.ergebnis)):null,szene:s.draht.szene(),befunde:s.befunde().filter(d=>d.code).map(d=>({element:d.elementId,code:d.code,ort:"panel",text:d.text})),modus:s.draht.modus?s.draht.modus.art:null}),draht_bildschirm:(d,p)=>s.draht.bildschirm(d,p),draht_befehl:(d,p)=>s.ausfuehren(d,p,"menue"),draht_projiziere:d=>s.szene?.projiziere(d)??null,draht_einpassen:d=>{const p=s.huelleAlle(),b=[p?.min,p?.max,d].filter(E=>!!E);if(!b.length)return;const m=[0,1,2].map(E=>Math.min(...b.map(k=>k[E]))),g=[0,1,2].map(E=>Math.max(...b.map(k=>k[E])));s.szene?.passeEin({min:m,max:g},0),s.rendernSofort()}})}),Object.defineProperty(window,"__ceeEingabe",{value:Object.freeze({ansicht:d=>{s.szene?.drehen(d.ry??0,d.rx??0),(d.tx||d.ty)&&s.szene?.schieben(d.tx??0,d.ty??0),d.tz&&s.szene?.zoomen(Math.exp((d.tz??0)*.01))}})}),await document.fonts.ready,await new Promise(d=>requestAnimationFrame(()=>requestAnimationFrame(()=>d()))),s.rendernSofort(),document.documentElement.dataset.bereit="1"}vS();
