(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Fo="186",Uh=0,xl=1,Fh=2,rs=1,Oh=2,Qi=3,Xn=0,Ht=1,en=2,Cn=0,nr=1,bl=2,Sl=3,yl=4,Bh=5,Ai=100,Vh=101,Hh=102,Gh=103,Wh=104,Xh=200,$h=201,qh=202,Yh=203,nu=204,iu=205,Kh=206,Zh=207,Jh=208,Qh=209,jh=210,ed=211,td=212,nd=213,id=214,Na=0,Ua=1,Fa=2,hr=3,Oa=4,Ba=5,Va=6,Ha=7,Oo=0,rd=1,sd=2,xn=0,ru=1,su=2,au=3,ou=4,lu=5,cu=6,uu=7,hu=300,ri=301,Di=302,Vs=303,Hs=304,zs=306,Ga=1e3,Rn=1001,Wa=1002,Pt=1003,ad=1004,Tr=1005,Ut=1006,Gs=1007,ti=1008,qt=1009,du=1010,fu=1011,dr=1012,Bo=1013,bn=1014,vn=1015,Sn=1016,Vo=1017,Ho=1018,fr=1020,mu=35902,pu=35899,gu=1021,vu=1022,ln=1023,Ln=1026,ni=1027,_u=1028,Go=1029,si=1030,Wo=1031,Xo=1033,ss=33776,as=33777,os=33778,ls=33779,Xa=35840,$a=35841,qa=35842,Ya=35843,Ka=36196,Za=37492,Ja=37496,Qa=37488,ja=37489,vs=37490,eo=37491,to=37808,no=37809,io=37810,ro=37811,so=37812,ao=37813,oo=37814,lo=37815,co=37816,uo=37817,ho=37818,fo=37819,mo=37820,po=37821,go=36492,vo=36494,_o=36495,xo=36283,bo=36284,_s=36285,So=36286,od=3200,yo=0,ld=1,Hn="",Qt="srgb",xs="srgb-linear",bs="linear",lt="srgb",Ws=7680,cd=519,ud=512,hd=513,dd=514,$o=515,fd=516,md=517,qo=518,pd=519,gd=35044,Ml="300 es",_n=2e3,mr=2001;function vd(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ss(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function _d(){const n=Ss("canvas");return n.style.display="block",n}const wl={};function El(...n){const e="THREE."+n.shift();console.log(e,...n)}function xu(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Fe(...n){n=xu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function et(...n){n=xu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function zi(...n){const e=n.join(" ");e in wl||(wl[e]=!0,Fe(...n))}function xd(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const bd={[Na]:Ua,[Fa]:Va,[Oa]:Ha,[hr]:Ba,[Ua]:Na,[Va]:Fa,[Ha]:Oa,[Ba]:hr};class li{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Dt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],cs=Math.PI/180,Mo=180/Math.PI;function Bi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Dt[n&255]+Dt[n>>8&255]+Dt[n>>16&255]+Dt[n>>24&255]+"-"+Dt[e&255]+Dt[e>>8&255]+"-"+Dt[e>>16&15|64]+Dt[e>>24&255]+"-"+Dt[t&63|128]+Dt[t>>8&255]+"-"+Dt[t>>16&255]+Dt[t>>24&255]+Dt[i&255]+Dt[i>>8&255]+Dt[i>>16&255]+Dt[i>>24&255]).toLowerCase()}function Qe(n,e,t){return Math.max(e,Math.min(t,n))}function Sd(n,e){return(n%e+e)%e}function Xs(n,e,t){return(1-t)*n+t*e}function Wi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Vt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class de{static{de.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Vi{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],d=i[r+2],f=i[r+3],u=s[a+0],h=s[a+1],m=s[a+2],_=s[a+3];if(f!==_||l!==u||c!==h||d!==m){let g=l*u+c*h+d*m+f*_;g<0&&(u=-u,h=-h,m=-m,_=-_,g=-g);let p=1-o;if(g<.9995){const w=Math.acos(g),T=Math.sin(w);p=Math.sin(p*w)/T,o=Math.sin(o*w)/T,l=l*p+u*o,c=c*p+h*o,d=d*p+m*o,f=f*p+_*o}else{l=l*p+u*o,c=c*p+h*o,d=d*p+m*o,f=f*p+_*o;const w=1/Math.sqrt(l*l+c*c+d*d+f*f);l*=w,c*=w,d*=w,f*=w}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],d=i[r+3],f=s[a],u=s[a+1],h=s[a+2],m=s[a+3];return e[t]=o*m+d*f+l*h-c*u,e[t+1]=l*m+d*u+c*f-o*h,e[t+2]=c*m+d*h+o*u-l*f,e[t+3]=d*m-o*f-l*u-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(r/2),f=o(s/2),u=l(i/2),h=l(r/2),m=l(s/2);switch(a){case"XYZ":this._x=u*d*f+c*h*m,this._y=c*h*f-u*d*m,this._z=c*d*m+u*h*f,this._w=c*d*f-u*h*m;break;case"YXZ":this._x=u*d*f+c*h*m,this._y=c*h*f-u*d*m,this._z=c*d*m-u*h*f,this._w=c*d*f+u*h*m;break;case"ZXY":this._x=u*d*f-c*h*m,this._y=c*h*f+u*d*m,this._z=c*d*m+u*h*f,this._w=c*d*f-u*h*m;break;case"ZYX":this._x=u*d*f-c*h*m,this._y=c*h*f+u*d*m,this._z=c*d*m-u*h*f,this._w=c*d*f+u*h*m;break;case"YZX":this._x=u*d*f+c*h*m,this._y=c*h*f+u*d*m,this._z=c*d*m-u*h*f,this._w=c*d*f-u*h*m;break;case"XZY":this._x=u*d*f-c*h*m,this._y=c*h*f-u*d*m,this._z=c*d*m+u*h*f,this._w=c*d*f+u*h*m;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],f=t[10],u=i+o+f;if(u>0){const h=.5/Math.sqrt(u+1);this._w=.25/h,this._x=(d-l)*h,this._y=(s-c)*h,this._z=(a-r)*h}else if(i>o&&i>f){const h=2*Math.sqrt(1+i-o-f);this._w=(d-l)/h,this._x=.25*h,this._y=(r+a)/h,this._z=(s+c)/h}else if(o>f){const h=2*Math.sqrt(1+o-i-f);this._w=(s-c)/h,this._x=(r+a)/h,this._y=.25*h,this._z=(l+d)/h}else{const h=2*Math.sqrt(1+f-i-o);this._w=(a-r)/h,this._x=(s+c)/h,this._y=(l+d)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+a*o+r*c-s*l,this._y=r*d+a*l+s*o-i*c,this._z=s*d+a*c+i*l-r*o,this._w=a*d-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{static{L.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Al.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Al.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),d=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+l*c+a*f-o*d,this.y=i+l*d+o*c-s*f,this.z=r+l*f+s*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return $s.copy(this).projectOnVector(e),this.sub($s)}reflect(e){return this.sub($s.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const $s=new L,Al=new Vi;class He{static{He.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=t,d[4]=s,d[5]=l,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],d=i[4],f=i[7],u=i[2],h=i[5],m=i[8],_=r[0],g=r[3],p=r[6],w=r[1],T=r[4],S=r[7],M=r[2],E=r[5],C=r[8];return s[0]=a*_+o*w+l*M,s[3]=a*g+o*T+l*E,s[6]=a*p+o*S+l*C,s[1]=c*_+d*w+f*M,s[4]=c*g+d*T+f*E,s[7]=c*p+d*S+f*C,s[2]=u*_+h*w+m*M,s[5]=u*g+h*T+m*E,s[8]=u*p+h*S+m*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-i*s*d+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],f=d*a-o*c,u=o*l-d*s,h=c*s-a*l,m=t*f+i*u+r*h;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=f*_,e[1]=(r*c-d*i)*_,e[2]=(o*i-r*a)*_,e[3]=u*_,e[4]=(d*t-r*l)*_,e[5]=(r*s-o*t)*_,e[6]=h*_,e[7]=(i*l-c*t)*_,e[8]=(a*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return zi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(qs.makeScale(e,t)),this}rotate(e){return zi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(qs.makeRotation(-e)),this}translate(e,t){return zi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(qs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const qs=new He,Tl=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kl=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function yd(){const n={enabled:!0,workingColorSpace:xs,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===lt&&(r.r=Pn(r.r),r.g=Pn(r.g),r.b=Pn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===lt&&(r.r=Li(r.r),r.g=Li(r.g),r.b=Li(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Hn?bs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return zi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return zi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[xs]:{primaries:e,whitePoint:i,transfer:bs,toXYZ:Tl,fromXYZ:kl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Qt},outputColorSpaceConfig:{drawingBufferColorSpace:Qt}},[Qt]:{primaries:e,whitePoint:i,transfer:lt,toXYZ:Tl,fromXYZ:kl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Qt}}}),n}const je=yd();function Pn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Li(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let fi;class Md{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{fi===void 0&&(fi=Ss("canvas")),fi.width=e.width,fi.height=e.height;const r=fi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=fi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ss("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Pn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Pn(t[i]/255)*255):t[i]=Pn(t[i]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let wd=0;class Yo{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:wd++}),this.uuid=Bi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ys(r[a].image)):s.push(Ys(r[a]))}else s=Ys(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Ys(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Md.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let Ed=0;const Ks=new L;class Bt extends li{constructor(e=Bt.DEFAULT_IMAGE,t=Bt.DEFAULT_MAPPING,i=Rn,r=Rn,s=Ut,a=ti,o=ln,l=qt,c=Bt.DEFAULT_ANISOTROPY,d=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ed++}),this.uuid=Bi(),this.name="",this.source=new Yo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ks).x}get height(){return this.source.getSize(Ks).y}get depth(){return this.source.getSize(Ks).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==hu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ga:e.x=e.x-Math.floor(e.x);break;case Rn:e.x=e.x<0?0:1;break;case Wa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ga:e.y=e.y-Math.floor(e.y);break;case Rn:e.y=e.y<0?0:1;break;case Wa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=hu;Bt.DEFAULT_ANISOTROPY=1;class xt{static{xt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],d=l[4],f=l[8],u=l[1],h=l[5],m=l[9],_=l[2],g=l[6],p=l[10];if(Math.abs(d-u)<.01&&Math.abs(f-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(d+u)<.1&&Math.abs(f+_)<.1&&Math.abs(m+g)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(c+1)/2,S=(h+1)/2,M=(p+1)/2,E=(d+u)/4,C=(f+_)/4,x=(m+g)/4;return T>S&&T>M?T<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(T),r=E/i,s=C/i):S>M?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=E/r,s=x/r):M<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(M),i=C/s,r=x/s),this.set(i,r,s,t),this}let w=Math.sqrt((g-m)*(g-m)+(f-_)*(f-_)+(u-d)*(u-d));return Math.abs(w)<.001&&(w=1),this.x=(g-m)/w,this.y=(f-_)/w,this.z=(u-d)/w,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this.w=Qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this.w=Qe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ad extends li{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ut,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Bt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ut,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Yo(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cn extends Ad{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class bu extends Bt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Td extends Bt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class ft{static{ft.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,l,c,d,f,u,h,m,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,d,f,u,h,m,_,g)}set(e,t,i,r,s,a,o,l,c,d,f,u,h,m,_,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=f,p[14]=u,p[3]=h,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ft().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/mi.setFromMatrixColumn(e,0).length(),s=1/mi.setFromMatrixColumn(e,1).length(),a=1/mi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const u=a*d,h=a*f,m=o*d,_=o*f;t[0]=l*d,t[4]=-l*f,t[8]=c,t[1]=h+m*c,t[5]=u-_*c,t[9]=-o*l,t[2]=_-u*c,t[6]=m+h*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*d,h=l*f,m=c*d,_=c*f;t[0]=u+_*o,t[4]=m*o-h,t[8]=a*c,t[1]=a*f,t[5]=a*d,t[9]=-o,t[2]=h*o-m,t[6]=_+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*d,h=l*f,m=c*d,_=c*f;t[0]=u-_*o,t[4]=-a*f,t[8]=m+h*o,t[1]=h+m*o,t[5]=a*d,t[9]=_-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*d,h=a*f,m=o*d,_=o*f;t[0]=l*d,t[4]=m*c-h,t[8]=u*c+_,t[1]=l*f,t[5]=_*c+u,t[9]=h*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,h=a*c,m=o*l,_=o*c;t[0]=l*d,t[4]=_-u*f,t[8]=m*f+h,t[1]=f,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=h*f+m,t[10]=u-_*f}else if(e.order==="XZY"){const u=a*l,h=a*c,m=o*l,_=o*c;t[0]=l*d,t[4]=-f,t[8]=c*d,t[1]=u*f+_,t[5]=a*d,t[9]=h*f-m,t[2]=m*f-h,t[6]=o*d,t[10]=_*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kd,e,Rd)}lookAt(e,t,i){const r=this.elements;return Gt.subVectors(e,t),Gt.lengthSq()===0&&(Gt.z=1),Gt.normalize(),Un.crossVectors(i,Gt),Un.lengthSq()===0&&(Math.abs(i.z)===1?Gt.x+=1e-4:Gt.z+=1e-4,Gt.normalize(),Un.crossVectors(i,Gt)),Un.normalize(),kr.crossVectors(Gt,Un),r[0]=Un.x,r[4]=kr.x,r[8]=Gt.x,r[1]=Un.y,r[5]=kr.y,r[9]=Gt.y,r[2]=Un.z,r[6]=kr.z,r[10]=Gt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],d=i[1],f=i[5],u=i[9],h=i[13],m=i[2],_=i[6],g=i[10],p=i[14],w=i[3],T=i[7],S=i[11],M=i[15],E=r[0],C=r[4],x=r[8],k=r[12],z=r[1],N=r[5],B=r[9],$=r[13],O=r[2],H=r[6],Q=r[10],b=r[14],R=r[3],I=r[7],G=r[11],Y=r[15];return s[0]=a*E+o*z+l*O+c*R,s[4]=a*C+o*N+l*H+c*I,s[8]=a*x+o*B+l*Q+c*G,s[12]=a*k+o*$+l*b+c*Y,s[1]=d*E+f*z+u*O+h*R,s[5]=d*C+f*N+u*H+h*I,s[9]=d*x+f*B+u*Q+h*G,s[13]=d*k+f*$+u*b+h*Y,s[2]=m*E+_*z+g*O+p*R,s[6]=m*C+_*N+g*H+p*I,s[10]=m*x+_*B+g*Q+p*G,s[14]=m*k+_*$+g*b+p*Y,s[3]=w*E+T*z+S*O+M*R,s[7]=w*C+T*N+S*H+M*I,s[11]=w*x+T*B+S*Q+M*G,s[15]=w*k+T*$+S*b+M*Y,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],f=e[6],u=e[10],h=e[14],m=e[3],_=e[7],g=e[11],p=e[15],w=l*h-c*u,T=o*h-c*f,S=o*u-l*f,M=a*h-c*d,E=a*u-l*d,C=a*f-o*d;return t*(_*w-g*T+p*S)-i*(m*w-g*M+p*E)+r*(m*T-_*M+p*C)-s*(m*S-_*E+g*C)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],d=e[10];return t*(a*d-o*c)-i*(s*d-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],f=e[9],u=e[10],h=e[11],m=e[12],_=e[13],g=e[14],p=e[15],w=t*o-i*a,T=t*l-r*a,S=t*c-s*a,M=i*l-r*o,E=i*c-s*o,C=r*c-s*l,x=d*_-f*m,k=d*g-u*m,z=d*p-h*m,N=f*g-u*_,B=f*p-h*_,$=u*p-h*g,O=w*$-T*B+S*N+M*z-E*k+C*x;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/O;return e[0]=(o*$-l*B+c*N)*H,e[1]=(r*B-i*$-s*N)*H,e[2]=(_*C-g*E+p*M)*H,e[3]=(u*E-f*C-h*M)*H,e[4]=(l*z-a*$-c*k)*H,e[5]=(t*$-r*z+s*k)*H,e[6]=(g*S-m*C-p*T)*H,e[7]=(d*C-u*S+h*T)*H,e[8]=(a*B-o*z+c*x)*H,e[9]=(i*z-t*B-s*x)*H,e[10]=(m*E-_*S+p*w)*H,e[11]=(f*S-d*E-h*w)*H,e[12]=(o*k-a*N-l*x)*H,e[13]=(t*N-i*k+r*x)*H,e[14]=(_*T-m*M-g*w)*H,e[15]=(d*M-f*T+u*w)*H,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,d=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,d*o+i,d*l-r*a,0,c*l-r*o,d*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,d=a+a,f=o+o,u=s*c,h=s*d,m=s*f,_=a*d,g=a*f,p=o*f,w=l*c,T=l*d,S=l*f,M=i.x,E=i.y,C=i.z;return r[0]=(1-(_+p))*M,r[1]=(h+S)*M,r[2]=(m-T)*M,r[3]=0,r[4]=(h-S)*E,r[5]=(1-(u+p))*E,r[6]=(g+w)*E,r[7]=0,r[8]=(m+T)*C,r[9]=(g-w)*C,r[10]=(1-(u+_))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=mi.set(r[0],r[1],r[2]).length();const o=mi.set(r[4],r[5],r[6]).length(),l=mi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),sn.copy(this);const c=1/a,d=1/o,f=1/l;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=d,sn.elements[5]*=d,sn.elements[6]*=d,sn.elements[8]*=f,sn.elements[9]*=f,sn.elements[10]*=f,t.setFromRotationMatrix(sn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=_n,l=!1){const c=this.elements,d=2*s/(t-e),f=2*s/(i-r),u=(t+e)/(t-e),h=(i+r)/(i-r);let m,_;if(l)m=s/(a-s),_=a*s/(a-s);else if(o===_n)m=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===mr)m=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=_n,l=!1){const c=this.elements,d=2/(t-e),f=2/(i-r),u=-(t+e)/(t-e),h=-(i+r)/(i-r);let m,_;if(l)m=1/(a-s),_=a/(a-s);else if(o===_n)m=-2/(a-s),_=-(a+s)/(a-s);else if(o===mr)m=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const mi=new L,sn=new ft,kd=new L(0,0,0),Rd=new L(1,1,1),Un=new L,kr=new L,Gt=new L,Rl=new ft,Cl=new Vi;class $n{constructor(e=0,t=0,i=0,r=$n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],d=r[9],f=r[2],u=r[6],h=r[10];switch(t){case"XYZ":this._y=Math.asin(Qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,h),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,h),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Qe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,h),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Rl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Cl.setFromEuler(this),this.setFromQuaternion(Cl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$n.DEFAULT_ORDER="XYZ";let Ko=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Cd=0;const Pl=new L,pi=new Vi,wn=new ft,Rr=new L,Xi=new L,Pd=new L,zd=new Vi,zl=new L(1,0,0),Ll=new L(0,1,0),Dl=new L(0,0,1),Il={type:"added"},Ld={type:"removed"},gi={type:"childadded",child:null},Zs={type:"childremoved",child:null};class Ct extends li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cd++}),this.uuid=Bi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ct.DEFAULT_UP.clone();const e=new L,t=new $n,i=new Vi,r=new L(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ft},normalMatrix:{value:new He}}),this.matrix=new ft,this.matrixWorld=new ft,this.matrixAutoUpdate=Ct.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ko,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return pi.setFromAxisAngle(e,t),this.quaternion.multiply(pi),this}rotateOnWorldAxis(e,t){return pi.setFromAxisAngle(e,t),this.quaternion.premultiply(pi),this}rotateX(e){return this.rotateOnAxis(zl,e)}rotateY(e){return this.rotateOnAxis(Ll,e)}rotateZ(e){return this.rotateOnAxis(Dl,e)}translateOnAxis(e,t){return Pl.copy(e).applyQuaternion(this.quaternion),this.position.add(Pl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zl,e)}translateY(e){return this.translateOnAxis(Ll,e)}translateZ(e){return this.translateOnAxis(Dl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(wn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Rr.copy(e):Rr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Xi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wn.lookAt(Xi,Rr,this.up):wn.lookAt(Rr,Xi,this.up),this.quaternion.setFromRotationMatrix(wn),r&&(wn.extractRotation(r.matrixWorld),pi.setFromRotationMatrix(wn),this.quaternion.premultiply(pi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Il),gi.child=e,this.dispatchEvent(gi),gi.child=null):et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ld),Zs.child=e,this.dispatchEvent(Zs),Zs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),wn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),wn.multiply(e.parent.matrixWorld)),e.applyMatrix4(wn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Il),gi.child=e,this.dispatchEvent(gi),gi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xi,e,Pd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xi,zd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),f=a(e.shapes),u=a(e.skeletons),h=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),h.length>0&&(i.animations=h),m.length>0&&(i.nodes=m)}return i.object=r,i;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Ct.DEFAULT_UP=new L(0,1,0);Ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class mn extends Ct{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Dd={type:"move"};class Js{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,i),p=this._getHandJoint(c,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const d=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=d.position.distanceTo(f.position),h=.02,m=.005;c.inputState.pinching&&u>h+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=h-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Dd)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new mn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Su={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fn={h:0,s:0,l:0},Cr={h:0,s:0,l:0};function Qs(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ge{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=je.workingColorSpace){return this.r=e,this.g=t,this.b=i,je.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=je.workingColorSpace){if(e=Sd(e,1),t=Qe(t,0,1),i=Qe(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Qs(a,s,e+1/3),this.g=Qs(a,s,e),this.b=Qs(a,s,e-1/3)}return je.colorSpaceToWorking(this,r),this}setStyle(e,t=Qt){function i(s){s!==void 0&&parseFloat(s)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qt){const i=Su[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pn(e.r),this.g=Pn(e.g),this.b=Pn(e.b),this}copyLinearToSRGB(e){return this.r=Li(e.r),this.g=Li(e.g),this.b=Li(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qt){return je.workingToColorSpace(It.copy(this),e),Math.round(Qe(It.r*255,0,255))*65536+Math.round(Qe(It.g*255,0,255))*256+Math.round(Qe(It.b*255,0,255))}getHexString(e=Qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.workingToColorSpace(It.copy(this),t);const i=It.r,r=It.g,s=It.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=d<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=je.workingColorSpace){return je.workingToColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=Qt){je.workingToColorSpace(It.copy(this),e);const t=It.r,i=It.g,r=It.b;return e!==Qt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Fn),this.setHSL(Fn.h+e,Fn.s+t,Fn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Fn),e.getHSL(Cr);const i=Xs(Fn.h,Cr.h,t),r=Xs(Fn.s,Cr.s,t),s=Xs(Fn.l,Cr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new Ge;Ge.NAMES=Su;class Id extends Ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $n,this.environmentIntensity=1,this.environmentRotation=new $n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const an=new L,En=new L,js=new L,An=new L,vi=new L,_i=new L,Nl=new L,ea=new L,ta=new L,na=new L,ia=new xt,ra=new xt,sa=new xt;class tn{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),an.subVectors(e,t),r.cross(an);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){an.subVectors(r,t),En.subVectors(i,t),js.subVectors(e,t);const a=an.dot(an),o=an.dot(En),l=an.dot(js),c=En.dot(En),d=En.dot(js),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const u=1/f,h=(c*l-o*d)*u,m=(a*d-o*l)*u;return s.set(1-h-m,m,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,An)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,An.x),l.addScaledVector(a,An.y),l.addScaledVector(o,An.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return ia.setScalar(0),ra.setScalar(0),sa.setScalar(0),ia.fromBufferAttribute(e,t),ra.fromBufferAttribute(e,i),sa.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ia,s.x),a.addScaledVector(ra,s.y),a.addScaledVector(sa,s.z),a}static isFrontFacing(e,t,i,r){return an.subVectors(i,t),En.subVectors(e,t),an.cross(En).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return an.subVectors(this.c,this.b),En.subVectors(this.a,this.b),an.cross(En).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return tn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return tn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;vi.subVectors(r,i),_i.subVectors(s,i),ea.subVectors(e,i);const l=vi.dot(ea),c=_i.dot(ea);if(l<=0&&c<=0)return t.copy(i);ta.subVectors(e,r);const d=vi.dot(ta),f=_i.dot(ta);if(d>=0&&f<=d)return t.copy(r);const u=l*f-d*c;if(u<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(i).addScaledVector(vi,a);na.subVectors(e,s);const h=vi.dot(na),m=_i.dot(na);if(m>=0&&h<=m)return t.copy(s);const _=h*c-l*m;if(_<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(_i,o);const g=d*m-h*f;if(g<=0&&f-d>=0&&h-m>=0)return Nl.subVectors(s,r),o=(f-d)/(f-d+(h-m)),t.copy(r).addScaledVector(Nl,o);const p=1/(g+_+u);return a=_*p,o=u*p,t.copy(i).addScaledVector(vi,a).addScaledVector(_i,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Mr{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(on.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(on.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=on.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,on):on.fromBufferAttribute(s,a),on.applyMatrix4(e.matrixWorld),this.expandByPoint(on);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Pr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Pr.copy(i.boundingBox)),Pr.applyMatrix4(e.matrixWorld),this.union(Pr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,on),on.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($i),zr.subVectors(this.max,$i),xi.subVectors(e.a,$i),bi.subVectors(e.b,$i),Si.subVectors(e.c,$i),On.subVectors(bi,xi),Bn.subVectors(Si,bi),Yn.subVectors(xi,Si);let t=[0,-On.z,On.y,0,-Bn.z,Bn.y,0,-Yn.z,Yn.y,On.z,0,-On.x,Bn.z,0,-Bn.x,Yn.z,0,-Yn.x,-On.y,On.x,0,-Bn.y,Bn.x,0,-Yn.y,Yn.x,0];return!aa(t,xi,bi,Si,zr)||(t=[1,0,0,0,1,0,0,0,1],!aa(t,xi,bi,Si,zr))?!1:(Lr.crossVectors(On,Bn),t=[Lr.x,Lr.y,Lr.z],aa(t,xi,bi,Si,zr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,on).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(on).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Tn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Tn=[new L,new L,new L,new L,new L,new L,new L,new L],on=new L,Pr=new Mr,xi=new L,bi=new L,Si=new L,On=new L,Bn=new L,Yn=new L,$i=new L,zr=new L,Lr=new L,Kn=new L;function aa(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Kn.fromArray(n,s);const o=r.x*Math.abs(Kn.x)+r.y*Math.abs(Kn.y)+r.z*Math.abs(Kn.z),l=e.dot(Kn),c=t.dot(Kn),d=i.dot(Kn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Et=new L,Dr=new de;let Nd=0;class zn extends li{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Nd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=gd,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Dr.fromBufferAttribute(this,t),Dr.applyMatrix3(e),this.setXY(t,Dr.x,Dr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Wi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Vt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),i=Vt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),i=Vt(i,this.array),r=Vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),i=Vt(i,this.array),r=Vt(r,this.array),s=Vt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class yu extends zn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Mu extends zn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class zt extends zn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Ud=new Mr,qi=new L,oa=new L;class wr{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Ud.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qi.subVectors(e,this.center);const t=qi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(qi,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(oa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qi.copy(e.center).add(oa)),this.expandByPoint(qi.copy(e.center).sub(oa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Fd=0;const Kt=new ft,la=new Ct,yi=new L,Wt=new Mr,Yi=new Mr,Rt=new L;class At extends li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=Bi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vd(e)?Mu:yu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new He().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Kt.makeRotationFromQuaternion(e),this.applyMatrix4(Kt),this}rotateX(e){return Kt.makeRotationX(e),this.applyMatrix4(Kt),this}rotateY(e){return Kt.makeRotationY(e),this.applyMatrix4(Kt),this}rotateZ(e){return Kt.makeRotationZ(e),this.applyMatrix4(Kt),this}translate(e,t,i){return Kt.makeTranslation(e,t,i),this.applyMatrix4(Kt),this}scale(e,t,i){return Kt.makeScale(e,t,i),this.applyMatrix4(Kt),this}lookAt(e){return la.lookAt(e),la.updateMatrix(),this.applyMatrix4(la.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yi).negate(),this.translate(yi.x,yi.y,yi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new zt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Wt.setFromBufferAttribute(s),this.morphTargetsRelative?(Rt.addVectors(this.boundingBox.min,Wt.min),this.boundingBox.expandByPoint(Rt),Rt.addVectors(this.boundingBox.max,Wt.max),this.boundingBox.expandByPoint(Rt)):(this.boundingBox.expandByPoint(Wt.min),this.boundingBox.expandByPoint(Wt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(Wt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Yi.setFromBufferAttribute(o),this.morphTargetsRelative?(Rt.addVectors(Wt.min,Yi.min),Wt.expandByPoint(Rt),Rt.addVectors(Wt.max,Yi.max),Wt.expandByPoint(Rt)):(Wt.expandByPoint(Yi.min),Wt.expandByPoint(Yi.max))}Wt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Rt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Rt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Rt.fromBufferAttribute(o,c),l&&(yi.fromBufferAttribute(e,c),Rt.add(yi)),r=Math.max(r,i.distanceToSquared(Rt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new zn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new L,l[x]=new L;const c=new L,d=new L,f=new L,u=new de,h=new de,m=new de,_=new L,g=new L;function p(x,k,z){c.fromBufferAttribute(i,x),d.fromBufferAttribute(i,k),f.fromBufferAttribute(i,z),u.fromBufferAttribute(s,x),h.fromBufferAttribute(s,k),m.fromBufferAttribute(s,z),d.sub(c),f.sub(c),h.sub(u),m.sub(u);const N=1/(h.x*m.y-m.x*h.y);isFinite(N)&&(_.copy(d).multiplyScalar(m.y).addScaledVector(f,-h.y).multiplyScalar(N),g.copy(f).multiplyScalar(h.x).addScaledVector(d,-m.x).multiplyScalar(N),o[x].add(_),o[k].add(_),o[z].add(_),l[x].add(g),l[k].add(g),l[z].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let x=0,k=w.length;x<k;++x){const z=w[x],N=z.start,B=z.count;for(let $=N,O=N+B;$<O;$+=3)p(e.getX($+0),e.getX($+1),e.getX($+2))}const T=new L,S=new L,M=new L,E=new L;function C(x){M.fromBufferAttribute(r,x),E.copy(M);const k=o[x];T.copy(k),T.sub(M.multiplyScalar(M.dot(k))).normalize(),S.crossVectors(E,k);const N=S.dot(l[x])<0?-1:1;a.setXYZW(x,T.x,T.y,T.z,N)}for(let x=0,k=w.length;x<k;++x){const z=w[x],N=z.start,B=z.count;for(let $=N,O=N+B;$<O;$+=3)C(e.getX($+0)),C(e.getX($+1)),C(e.getX($+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new zn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,h=i.count;u<h;u++)i.setXYZ(u,0,0,0);const r=new L,s=new L,a=new L,o=new L,l=new L,c=new L,d=new L,f=new L;if(e)for(let u=0,h=e.count;u<h;u+=3){const m=e.getX(u+0),_=e.getX(u+1),g=e.getX(u+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),d.subVectors(a,s),f.subVectors(r,s),d.cross(f),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,g),o.add(d),l.add(d),c.add(d),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,h=t.count;u<h;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,s),f.subVectors(r,s),d.cross(f),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Rt.fromBufferAttribute(e,t),Rt.normalize(),e.setXYZ(t,Rt.x,Rt.y,Rt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,f=o.normalized,u=new c.constructor(l.length*d);let h=0,m=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?h=l[_]*o.data.stride+o.offset:h=l[_]*d;for(let p=0;p<d;p++)u[m++]=c[h++]}return new zn(u,d,f)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new At,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,f=c.length;d<f;d++){const u=c[d],h=e(u,i);l.push(h)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let f=0,u=c.length;f<u;f++){const h=c[f];d.push(h.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(t))}const s=e.morphAttributes;for(const c in s){const d=[],f=s[c];for(let u=0,h=f.length;u<h;u++)d.push(f[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ca=new L,Od=new L,Bd=new He;class pn{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=ca.subVectors(i,t).cross(Od.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(ca),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Bd.getNormalMatrix(e),r=this.coplanarPoint(ca).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Vd=0;class ci extends li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=Bi(),this.name="",this.type="Material",this.blending=nr,this.side=Xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nu,this.blendDst=iu,this.blendEquation=Ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ge(0,0,0),this.blendAlpha=0,this.depthFunc=hr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ws,this.stencilZFail=Ws,this.stencilZPass=Ws,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ge().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new pn().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new de().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new de().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const kn=new L,ua=new L,Ir=new L,Nr=new L;class Ls{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(kn.copy(this.origin).addScaledVector(this.direction,t),kn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){ua.copy(e).add(t).multiplyScalar(.5),Ir.copy(t).sub(e).normalize(),Nr.copy(this.origin).sub(ua);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Ir),o=Nr.dot(this.direction),l=-Nr.dot(Ir),c=Nr.lengthSq(),d=Math.abs(1-a*a);let f,u,h,m;if(d>0)if(f=a*l-o,u=a*o-l,m=s*d,f>=0)if(u>=-m)if(u<=m){const _=1/d;f*=_,u*=_,h=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=s,f=Math.max(0,-(a*u+o)),h=-f*f+u*(u+2*l)+c;else u=-s,f=Math.max(0,-(a*u+o)),h=-f*f+u*(u+2*l)+c;else u<=-m?(f=Math.max(0,-(-a*s+o)),u=f>0?-s:Math.min(Math.max(-s,-l),s),h=-f*f+u*(u+2*l)+c):u<=m?(f=0,u=Math.min(Math.max(-s,-l),s),h=u*(u+2*l)+c):(f=Math.max(0,-(a*s+o)),u=f>0?s:Math.min(Math.max(-s,-l),s),h=-f*f+u*(u+2*l)+c);else u=a>0?-s:s,f=Math.max(0,-(a*u+o)),h=-f*f+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(ua).addScaledVector(Ir,u),h}intersectSphere(e,t){if(e.radius<0)return null;kn.subVectors(e.center,this.origin);const i=kn.dot(this.direction),r=kn.dot(kn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),d>=0?(s=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-u.z)*f,l=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,l=(e.min.z-u.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,kn)!==null}intersectTriangle(e,t,i,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,d=o.z,f=e.x-a.x,u=e.y-a.y,h=e.z-a.z,m=t.x-a.x,_=t.y-a.y,g=t.z-a.z,p=i.x-a.x,w=i.y-a.y,T=i.z-a.z,S=Math.abs(l),M=Math.abs(c),E=Math.abs(d);let C,x,k,z,N,B,$,O,H,Q,b,R;if(S>=M&&S>=E?(k=l,B=f,H=m,R=p,l>=0?(C=c,x=d,z=u,N=h,$=_,O=g,Q=w,b=T):(C=d,x=c,z=h,N=u,$=g,O=_,Q=T,b=w)):M>=E?(k=c,B=u,H=_,R=w,c>=0?(C=d,x=l,z=h,N=f,$=g,O=m,Q=T,b=p):(C=l,x=d,z=f,N=h,$=m,O=g,Q=p,b=T)):(k=d,B=h,H=g,R=T,d>=0?(C=l,x=c,z=f,N=u,$=m,O=_,Q=p,b=w):(C=c,x=l,z=u,N=f,$=_,O=m,Q=w,b=p)),k===0)return null;const I=C/k,G=x/k,Y=1/k,le=z-I*B,xe=N-G*B,Xe=$-I*H,Ke=O-G*H,tt=Q-I*R,j=b-G*R,ne=tt*Ke-j*Xe,be=le*j-xe*tt,Ue=Xe*xe-Ke*le;if(r){if(ne<0||be<0||Ue<0)return null}else if((ne<0||be<0||Ue<0)&&(ne>0||be>0||Ue>0))return null;const we=ne+be+Ue;if(we===0)return null;const Oe=Y*(ne*B+be*H+Ue*R);return(we>0?Oe<0:Oe>0)?null:this.at(Oe/we,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ys extends ci{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=Oo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ul=new ft,Zn=new Ls,Ur=new wr,Fl=new L,Fr=new L,Or=new L,Br=new L,ha=new L,Vr=new L,Ol=new L,Hr=new L;class nn extends Ct{constructor(e=new At,t=new ys){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Vr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],f=s[l];d!==0&&(ha.fromBufferAttribute(f,e),a?Vr.addScaledVector(ha,d):Vr.addScaledVector(ha.sub(t),d))}t.add(Vr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ur.copy(i.boundingSphere),Ur.applyMatrix4(s),Zn.copy(e.ray).recast(e.near),!(Ur.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(Ur,Fl)===null||Zn.origin.distanceToSquared(Fl)>(e.far-e.near)**2))&&(Ul.copy(s).invert(),Zn.copy(e.ray).applyMatrix4(Ul),!(i.boundingBox!==null&&Zn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Zn)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,f=s.attributes.normal,u=s.groups,h=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=u.length;m<_;m++){const g=u[m],p=a[g.materialIndex],w=Math.max(g.start,h.start),T=Math.min(o.count,Math.min(g.start+g.count,h.start+h.count));for(let S=w,M=T;S<M;S+=3){const E=o.getX(S),C=o.getX(S+1),x=o.getX(S+2);r=Gr(this,p,e,i,c,d,f,E,C,x),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const m=Math.max(0,h.start),_=Math.min(o.count,h.start+h.count);for(let g=m,p=_;g<p;g+=3){const w=o.getX(g),T=o.getX(g+1),S=o.getX(g+2);r=Gr(this,a,e,i,c,d,f,w,T,S),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=u.length;m<_;m++){const g=u[m],p=a[g.materialIndex],w=Math.max(g.start,h.start),T=Math.min(l.count,Math.min(g.start+g.count,h.start+h.count));for(let S=w,M=T;S<M;S+=3){const E=S,C=S+1,x=S+2;r=Gr(this,p,e,i,c,d,f,E,C,x),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const m=Math.max(0,h.start),_=Math.min(l.count,h.start+h.count);for(let g=m,p=_;g<p;g+=3){const w=g,T=g+1,S=g+2;r=Gr(this,a,e,i,c,d,f,w,T,S),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function Hd(n,e,t,i,r,s,a,o){let l;if(e.side===Ht?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Xn,o),l===null)return null;Hr.copy(o),Hr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Hr);return c<t.near||c>t.far?null:{distance:c,point:Hr.clone(),object:n}}function Gr(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,Fr),n.getVertexPosition(l,Or),n.getVertexPosition(c,Br);const d=Hd(n,e,t,i,Fr,Or,Br,Ol);if(d){const f=new L;tn.getBarycoord(Ol,Fr,Or,Br,f),r&&(d.uv=tn.getInterpolatedAttribute(r,o,l,c,f,new de)),s&&(d.uv1=tn.getInterpolatedAttribute(s,o,l,c,f,new de)),a&&(d.normal=tn.getInterpolatedAttribute(a,o,l,c,f,new L),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new L,materialIndex:0};tn.getNormal(Fr,Or,Br,u.normal),d.face=u,d.barycoord=f}return d}class Gd extends Bt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Pt,d=Pt,f,u){super(null,a,o,l,c,d,r,s,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Jn=new wr,Wd=new de(.5,.5),Wr=new L;class Zo{constructor(e=new pn,t=new pn,i=new pn,r=new pn,s=new pn,a=new pn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=_n,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],d=s[4],f=s[5],u=s[6],h=s[7],m=s[8],_=s[9],g=s[10],p=s[11],w=s[12],T=s[13],S=s[14],M=s[15];if(r[0].setComponents(c-a,h-d,p-m,M-w).normalize(),r[1].setComponents(c+a,h+d,p+m,M+w).normalize(),r[2].setComponents(c+o,h+f,p+_,M+T).normalize(),r[3].setComponents(c-o,h-f,p-_,M-T).normalize(),i)r[4].setComponents(l,u,g,S).normalize(),r[5].setComponents(c-l,h-u,p-g,M-S).normalize();else if(r[4].setComponents(c-l,h-u,p-g,M-S).normalize(),t===_n)r[5].setComponents(c+l,h+u,p+g,M+S).normalize();else if(t===mr)r[5].setComponents(l,u,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Jn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Jn)}intersectsSprite(e){Jn.center.set(0,0,0);const t=Wd.distanceTo(e.center);return Jn.radius=.7071067811865476+t,Jn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Jn)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Wr.x=r.normal.x>0?e.max.x:e.min.x,Wr.y=r.normal.y>0?e.max.y:e.min.y,Wr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Wr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ti extends ci{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ms=new L,ws=new L,Bl=new ft,Ki=new Ls,Xr=new wr,da=new L,Vl=new L;class ir extends Ct{constructor(e=new At,t=new Ti){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Ms.fromBufferAttribute(t,r-1),ws.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Ms.distanceTo(ws);e.setAttribute("lineDistance",new zt(i,1))}else Fe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Xr.copy(i.boundingSphere),Xr.applyMatrix4(r),Xr.radius+=s,e.ray.intersectsSphere(Xr)===!1)return;Bl.copy(r).invert(),Ki.copy(e.ray).applyMatrix4(Bl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const h=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let _=h,g=m-1;_<g;_+=c){const p=d.getX(_),w=d.getX(_+1),T=$r(this,e,Ki,l,p,w,_);T&&t.push(T)}if(this.isLineLoop){const _=d.getX(m-1),g=d.getX(h),p=$r(this,e,Ki,l,_,g,m-1);p&&t.push(p)}}else{const h=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=h,g=m-1;_<g;_+=c){const p=$r(this,e,Ki,l,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=$r(this,e,Ki,l,m-1,h,m-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function $r(n,e,t,i,r,s,a){const o=n.geometry.attributes.position;if(Ms.fromBufferAttribute(o,r),ws.fromBufferAttribute(o,s),t.distanceSqToSegment(Ms,ws,da,Vl)>i)return;da.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(da);if(!(c<e.near||c>e.far))return{distance:c,point:Vl.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Hl=new L,Gl=new L;class Xd extends ir{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Hl.fromBufferAttribute(t,r),Gl.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Hl.distanceTo(Gl);e.setAttribute("lineDistance",new zt(i,1))}else Fe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class $d extends ir{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class wo extends ci{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ge(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Wl=new ft,Eo=new Ls,qr=new wr,Yr=new L;class Xl extends Ct{constructor(e=new At,t=new wo){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),qr.copy(i.boundingSphere),qr.applyMatrix4(r),qr.radius+=s,e.ray.intersectsSphere(qr)===!1)return;Wl.copy(r).invert(),Eo.copy(e.ray).applyMatrix4(Wl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,f=i.attributes.position;if(c!==null){const u=Math.max(0,a.start),h=Math.min(c.count,a.start+a.count);for(let m=u,_=h;m<_;m++){const g=c.getX(m);Yr.fromBufferAttribute(f,g),$l(Yr,g,l,r,e,t,this)}}else{const u=Math.max(0,a.start),h=Math.min(f.count,a.start+a.count);for(let m=u,_=h;m<_;m++)Yr.fromBufferAttribute(f,m),$l(Yr,m,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function $l(n,e,t,i,r,s,a){const o=Eo.distanceSqToPoint(n);if(o<t){const l=new L;Eo.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class wu extends Bt{constructor(e=[],t=ri,i,r,s,a,o,l,c,d){super(e,t,i,r,s,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class pr extends Bt{constructor(e,t,i=bn,r,s,a,o=Pt,l=Pt,c,d=Ln,f=1){if(d!==Ln&&d!==ni)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:f};super(u,r,s,a,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Yo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class qd extends pr{constructor(e,t=bn,i=ri,r,s,a=Pt,o=Pt,l,c=Ln){const d={width:e,height:e,depth:1},f=[d,d,d,d,d,d];super(e,e,t,i,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Eu extends Bt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ai extends At{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],d=[],f=[];let u=0,h=0;m("z","y","x",-1,-1,i,t,e,a,s,0),m("z","y","x",1,-1,i,t,-e,a,s,1),m("x","z","y",1,1,e,i,t,r,a,2),m("x","z","y",1,-1,e,i,-t,r,a,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new zt(c,3)),this.setAttribute("normal",new zt(d,3)),this.setAttribute("uv",new zt(f,2));function m(_,g,p,w,T,S,M,E,C,x,k){const z=S/C,N=M/x,B=S/2,$=M/2,O=E/2,H=C+1,Q=x+1;let b=0,R=0;const I=new L;for(let G=0;G<Q;G++){const Y=G*N-$;for(let le=0;le<H;le++){const xe=le*z-B;I[_]=xe*w,I[g]=Y*T,I[p]=O,c.push(I.x,I.y,I.z),I[_]=0,I[g]=0,I[p]=E>0?1:-1,d.push(I.x,I.y,I.z),f.push(le/C),f.push(1-G/x),b+=1}}for(let G=0;G<x;G++)for(let Y=0;Y<C;Y++){const le=u+Y+H*G,xe=u+Y+H*(G+1),Xe=u+(Y+1)+H*(G+1),Ke=u+(Y+1)+H*G;l.push(le,xe,Ke),l.push(xe,Xe,Ke),R+=6}o.addGroup(h,R,k),h+=R,u+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ai(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Jo extends At{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const d=[],f=[],u=[],h=[];let m=0;const _=[],g=i/2;let p=0;w(),a===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(d),this.setAttribute("position",new zt(f,3)),this.setAttribute("normal",new zt(u,3)),this.setAttribute("uv",new zt(h,2));function w(){const S=new L,M=new L;let E=0;const C=(t-e)/i;for(let x=0;x<=s;x++){const k=[],z=x/s,N=z*(t-e)+e;for(let B=0;B<=r;B++){const $=B/r,O=$*l+o,H=Math.sin(O),Q=Math.cos(O);M.x=N*H,M.y=-z*i+g,M.z=N*Q,f.push(M.x,M.y,M.z),S.set(H,C,Q).normalize(),u.push(S.x,S.y,S.z),h.push($,1-z),k.push(m++)}_.push(k)}for(let x=0;x<r;x++)for(let k=0;k<s;k++){const z=_[k][x],N=_[k+1][x],B=_[k+1][x+1],$=_[k][x+1];(e>0||k!==0)&&(d.push(z,N,$),E+=3),(t>0||k!==s-1)&&(d.push(N,B,$),E+=3)}c.addGroup(p,E,0),p+=E}function T(S){const M=m,E=new de,C=new L;let x=0;const k=S===!0?e:t,z=S===!0?1:-1;for(let B=1;B<=r;B++)f.push(0,g*z,0),u.push(0,z,0),h.push(.5,.5),m++;const N=m;for(let B=0;B<=r;B++){const O=B/r*l+o,H=Math.cos(O),Q=Math.sin(O);C.x=k*Q,C.y=g*z,C.z=k*H,f.push(C.x,C.y,C.z),u.push(0,z,0),E.x=H*.5+.5,E.y=Q*.5*z+.5,h.push(E.x,E.y),m++}for(let B=0;B<r;B++){const $=M+B,O=N+B;S===!0?d.push(O,O+1,$):d.push(O+1,O,$),x+=3}c.addGroup(p,x,S===!0?1:2),p+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jo(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const Kr=new L,Zr=new L,fa=new L,Jr=new tn;class Yd extends At{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(cs*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],d=["a","b","c"],f=new Array(3),u={},h=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);const{a:_,b:g,c:p}=Jr;if(_.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),Jr.getNormal(fa),f[0]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,f[1]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,f[2]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let w=0;w<3;w++){const T=(w+1)%3,S=f[w],M=f[T],E=Jr[d[w]],C=Jr[d[T]],x=`${S}_${M}`,k=`${M}_${S}`;k in u&&u[k]?(fa.dot(u[k].normal)<=s&&(h.push(E.x,E.y,E.z),h.push(C.x,C.y,C.z)),u[k]=null):x in u||(u[x]={index0:c[w],index1:c[T],normal:fa.clone()})}}for(const m in u)if(u[m]){const{index0:_,index1:g}=u[m];Kr.fromBufferAttribute(o,_),Zr.fromBufferAttribute(o,g),h.push(Kr.x,Kr.y,Kr.z),h.push(Zr.x,Zr.y,Zr.z)}this.setAttribute("position",new zt(h,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Mn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Fe("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const s=i.length;let a;t?a=t:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const d=i[r],u=i[r+1]-d,h=(a-d)/u;return(r+h)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new de:new L);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new L,r=[],s=[],a=[],o=new L,l=new ft;for(let h=0;h<=e;h++){const m=h/e;r[h]=this.getTangentAt(m,new L)}s[0]=new L,a[0]=new L;let c=Number.MAX_VALUE;const d=Math.abs(r[0].x),f=Math.abs(r[0].y),u=Math.abs(r[0].z);d<=c&&(c=d,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),u<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let h=1;h<=e;h++){if(s[h]=s[h-1].clone(),a[h]=a[h-1].clone(),o.crossVectors(r[h-1],r[h]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(Qe(r[h-1].dot(r[h]),-1,1));s[h].applyMatrix4(l.makeRotationAxis(o,m))}a[h].crossVectors(r[h],s[h])}if(t===!0){let h=Math.acos(Qe(s[0].dot(s[e]),-1,1));h/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(h=-h);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],h*m)),a[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Qo extends Mn{constructor(e=0,t=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new de){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const d=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=l-this.aX,h=c-this.aY;l=u*d-h*f+this.aX,c=u*f+h*d+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Kd extends Qo{constructor(e,t,i,r,s,a){super(e,t,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function jo(){let n=0,e=0,t=0,i=0;function r(s,a,o,l){n=s,e=o,t=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,d,f){let u=(a-s)/c-(o-s)/(c+d)+(o-a)/d,h=(o-a)/d-(l-a)/(d+f)+(l-o)/f;u*=d,h*=d,r(a,o,u,h)},calc:function(s){const a=s*s,o=a*s;return n+e*s+t*a+i*o}}}const ql=new L,Yl=new L,ma=new jo,pa=new jo,ga=new jo;class Zd extends Mn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new L){const i=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,d;this.closed||o>0?c=r[(o-1)%s]:(Yl.subVectors(r[0],r[1]).add(r[0]),c=Yl);const f=r[o%s],u=r[(o+1)%s];if(this.closed||o+2<s?d=r[(o+2)%s]:(ql.subVectors(r[s-1],r[s-2]).add(r[s-1]),d=ql),this.curveType==="centripetal"||this.curveType==="chordal"){const h=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(f),h),_=Math.pow(f.distanceToSquared(u),h),g=Math.pow(u.distanceToSquared(d),h);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),ma.initNonuniformCatmullRom(c.x,f.x,u.x,d.x,m,_,g),pa.initNonuniformCatmullRom(c.y,f.y,u.y,d.y,m,_,g),ga.initNonuniformCatmullRom(c.z,f.z,u.z,d.z,m,_,g)}else this.curveType==="catmullrom"&&(ma.initCatmullRom(c.x,f.x,u.x,d.x,this.tension),pa.initCatmullRom(c.y,f.y,u.y,d.y,this.tension),ga.initCatmullRom(c.z,f.z,u.z,d.z,this.tension));return i.set(ma.calc(l),pa.calc(l),ga.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new L().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Kl(n,e,t,i,r){const s=(i-e)*.5,a=(r-t)*.5,o=n*n,l=n*o;return(2*t-2*i+s+a)*l+(-3*t+3*i-2*s-a)*o+s*n+t}function Jd(n,e){const t=1-n;return t*t*e}function Qd(n,e){return 2*(1-n)*n*e}function jd(n,e){return n*n*e}function rr(n,e,t,i){return Jd(n,e)+Qd(n,t)+jd(n,i)}function ef(n,e){const t=1-n;return t*t*t*e}function tf(n,e){const t=1-n;return 3*t*t*n*e}function nf(n,e){return 3*(1-n)*n*n*e}function rf(n,e){return n*n*n*e}function sr(n,e,t,i,r){return ef(n,e)+tf(n,t)+nf(n,i)+rf(n,r)}class Au extends Mn{constructor(e=new de,t=new de,i=new de,r=new de){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new de){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(sr(e,r.x,s.x,a.x,o.x),sr(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class sf extends Mn{constructor(e=new L,t=new L,i=new L,r=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new L){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(sr(e,r.x,s.x,a.x,o.x),sr(e,r.y,s.y,a.y,o.y),sr(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Tu extends Mn{constructor(e=new de,t=new de){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new de){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new de){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class af extends Mn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ku extends Mn{constructor(e=new de,t=new de,i=new de){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new de){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(rr(e,r.x,s.x,a.x),rr(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class of extends Mn{constructor(e=new L,t=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new L){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(rr(e,r.x,s.x,a.x),rr(e,r.y,s.y,a.y),rr(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ru extends Mn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new de){const i=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],d=r[a>r.length-2?r.length-1:a+1],f=r[a>r.length-3?r.length-1:a+2];return i.set(Kl(o,l.x,c.x,d.x,f.x),Kl(o,l.y,c.y,d.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new de().fromArray(r))}return this}}var Ao=Object.freeze({__proto__:null,ArcCurve:Kd,CatmullRomCurve3:Zd,CubicBezierCurve:Au,CubicBezierCurve3:sf,EllipseCurve:Qo,LineCurve:Tu,LineCurve3:af,QuadraticBezierCurve:ku,QuadraticBezierCurve3:of,SplineCurve:Ru});class lf extends Mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ao[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const d=l[c];i&&i.equals(d)||(t.push(d),i=d)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new Ao[r.type]().fromJSON(r))}return this}}class Es extends lf{constructor(e){super(),this.type="Path",this.currentPoint=new de,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Tu(this.currentPoint.clone(),new de(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new ku(this.currentPoint.clone(),new de(e,t),new de(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,a){const o=new Au(this.currentPoint.clone(),new de(e,t),new de(i,r),new de(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Ru(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,r,s,a),this}absarc(e,t,i,r,s,a){return this.absellipse(e,t,i,i,r,s,a),this}ellipse(e,t,i,r,s,a,o,l){const c=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(e+c,t+d,i,r,s,a,o,l),this}absellipse(e,t,i,r,s,a,o,l){const c=new Qo(e,t,i,r,s,a,o,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const d=c.getPoint(1);return this.currentPoint.copy(d),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Cu extends Es{constructor(e){super(e),this.uuid=Bi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(new Es().fromJSON(r))}return this}}function cf(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=Pu(n,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(i&&(s=mf(n,e,s,t)),n.length>80*t){o=n[0],l=n[1];let d=o,f=l;for(let u=t;u<r;u+=t){const h=n[u],m=n[u+1];h<o&&(o=h),m<l&&(l=m),h>d&&(d=h),m>f&&(f=m)}c=Math.max(d-o,f-l),c=c!==0?32767/c:0}return gr(s,a,t,o,l,c,0),a}function Pu(n,e,t,i,r){let s;if(r===Ef(n,e,t,i)>0)for(let a=e;a<t;a+=i)s=Zl(a/i|0,n[a],n[a+1],s);else for(let a=t-i;a>=e;a-=i)s=Zl(a/i|0,n[a],n[a+1],s);return s&&Ii(s,s.next)&&(_r(s),s=s.next),s}function oi(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Ii(t,t.next)||bt(t.prev,t,t.next)===0)){if(_r(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function gr(n,e,t,i,r,s,a){if(!n)return;!a&&s&&xf(n,i,r,s);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?hf(n,i,r,s):uf(n)){e.push(l.i,n.i,c.i),_r(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=df(oi(n),e),gr(n,e,t,i,r,s,2)):a===2&&ff(n,e,t,i,r,s):gr(oi(n),e,t,i,r,s,1);break}}}function uf(n){const e=n.prev,t=n,i=n.next;if(bt(e,t,i)>=0)return!1;const r=e.x,s=t.x,a=i.x,o=e.y,l=t.y,c=i.y,d=Math.min(r,s,a),f=Math.min(o,l,c),u=Math.max(r,s,a),h=Math.max(o,l,c);let m=i.next;for(;m!==e;){if(m.x>=d&&m.x<=u&&m.y>=f&&m.y<=h&&ji(r,o,s,l,a,c,m.x,m.y)&&bt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function hf(n,e,t,i){const r=n.prev,s=n,a=n.next;if(bt(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,d=r.y,f=s.y,u=a.y,h=Math.min(o,l,c),m=Math.min(d,f,u),_=Math.max(o,l,c),g=Math.max(d,f,u),p=To(h,m,e,t,i),w=To(_,g,e,t,i);let T=n.prevZ,S=n.nextZ;for(;T&&T.z>=p&&S&&S.z<=w;){if(T.x>=h&&T.x<=_&&T.y>=m&&T.y<=g&&T!==r&&T!==a&&ji(o,d,l,f,c,u,T.x,T.y)&&bt(T.prev,T,T.next)>=0||(T=T.prevZ,S.x>=h&&S.x<=_&&S.y>=m&&S.y<=g&&S!==r&&S!==a&&ji(o,d,l,f,c,u,S.x,S.y)&&bt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;T&&T.z>=p;){if(T.x>=h&&T.x<=_&&T.y>=m&&T.y<=g&&T!==r&&T!==a&&ji(o,d,l,f,c,u,T.x,T.y)&&bt(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;S&&S.z<=w;){if(S.x>=h&&S.x<=_&&S.y>=m&&S.y<=g&&S!==r&&S!==a&&ji(o,d,l,f,c,u,S.x,S.y)&&bt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function df(n,e){let t=n;do{const i=t.prev,r=t.next.next;!Ii(i,r)&&Lu(i,t,t.next,r)&&vr(i,r)&&vr(r,i)&&(e.push(i.i,t.i,r.i),_r(t),_r(t.next),t=n=r),t=t.next}while(t!==n);return oi(t)}function ff(n,e,t,i,r,s){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&yf(a,o)){let l=Du(a,o);a=oi(a,a.next),l=oi(l,l.next),gr(a,e,t,i,r,s,0),gr(l,e,t,i,r,s,0);return}o=o.next}a=a.next}while(a!==n)}function mf(n,e,t,i){const r=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*i,l=s<a-1?e[s+1]*i:n.length,c=Pu(n,o,l,i,!1);c===c.next&&(c.steiner=!0),r.push(Sf(c))}r.sort(pf);for(let s=0;s<r.length;s++)t=gf(r[s],t);return t}function pf(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function gf(n,e){const t=vf(n,e);if(!t)return e;const i=Du(t,n);return oi(i,i.next),oi(t,t.next)}function vf(n,e){let t=e;const i=n.x,r=n.y;let s=-1/0,a;if(Ii(n,t))return t;do{if(Ii(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const f=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=i&&f>s&&(s=f,a=t.x<t.next.x?t:t.next,f===i))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let d=1/0;t=a;do{if(i>=t.x&&t.x>=l&&i!==t.x&&zu(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){const f=Math.abs(r-t.y)/(i-t.x);vr(t,n)&&(f<d||f===d&&(t.x>a.x||t.x===a.x&&_f(a,t)))&&(a=t,d=f)}t=t.next}while(t!==o);return a}function _f(n,e){return bt(n.prev,n,e.prev)<0&&bt(e.next,n,n.next)<0}function xf(n,e,t,i){let r=n;do r.z===0&&(r.z=To(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,bf(r)}function bf(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let a=i,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(r=i,i=i.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=a}s.nextZ=null,t*=2}while(e>1);return n}function To(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Sf(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function zu(n,e,t,i,r,s,a,o){return(r-a)*(e-o)>=(n-a)*(s-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(i-o)}function ji(n,e,t,i,r,s,a,o){return!(n===a&&e===o)&&zu(n,e,t,i,r,s,a,o)}function yf(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Mf(n,e)&&(vr(n,e)&&vr(e,n)&&wf(n,e)&&(bt(n.prev,n,e.prev)||bt(n,e.prev,e))||Ii(n,e)&&bt(n.prev,n,n.next)>0&&bt(e.prev,e,e.next)>0)}function bt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Ii(n,e){return n.x===e.x&&n.y===e.y}function Lu(n,e,t,i){const r=jr(bt(n,e,t)),s=jr(bt(n,e,i)),a=jr(bt(t,i,n)),o=jr(bt(t,i,e));return!!(r!==s&&a!==o||r===0&&Qr(n,t,e)||s===0&&Qr(n,i,e)||a===0&&Qr(t,n,i)||o===0&&Qr(t,e,i))}function Qr(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function jr(n){return n>0?1:n<0?-1:0}function Mf(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&Lu(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function vr(n,e){return bt(n.prev,n,n.next)<0?bt(n,e,n.next)>=0&&bt(n,n.prev,e)>=0:bt(n,e,n.prev)<0||bt(n,n.next,e)<0}function wf(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Du(n,e){const t=ko(n.i,n.x,n.y),i=ko(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function Zl(n,e,t,i){const r=ko(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function _r(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function ko(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Ef(n,e,t,i){let r=0;for(let s=e,a=t-i;s<t;s+=i)r+=(n[a]-n[s])*(n[s+1]+n[a+1]),a=s;return r}class Af{static triangulate(e,t,i=2){return cf(e,t,i)}}class Ri{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return Ri.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];Jl(e),Ql(i,e);let a=e.length;t.forEach(Jl);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,Ql(i,t[l]);const o=Af.triangulate(i,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function Jl(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Ql(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class As extends At{constructor(e=new Cu([new de(.5,.5),new de(-.5,.5),new de(-.5,-.5),new de(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new zt(r,3)),this.setAttribute("uv",new zt(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,d=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,h=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:h-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,w=t.UVGenerator!==void 0?t.UVGenerator:Tf;let T,S=!1,M,E,C,x;if(p){T=p.getSpacedPoints(d),S=!0,u=!1;const ie=p.isCatmullRomCurve3?p.closed:!1;M=p.computeFrenetFrames(d,ie),E=new L,C=new L,x=new L}u||(g=0,h=0,m=0,_=0);const k=o.extractPoints(c);let z=k.shape;const N=k.holes;if(!Ri.isClockWise(z)){z=z.reverse();for(let ie=0,se=N.length;ie<se;ie++){const ae=N[ie];Ri.isClockWise(ae)&&(N[ie]=ae.reverse())}}function $(ie){const ae=10000000000000001e-36;let oe=ie[0];for(let he=1;he<=ie.length;he++){const Ie=he%ie.length,De=ie[Ie],Be=De.x-oe.x,Ve=De.y-oe.y,D=Be*Be+Ve*Ve,rt=Math.max(Math.abs(De.x),Math.abs(De.y),Math.abs(oe.x),Math.abs(oe.y)),Ze=ae*rt*rt;if(D<=Ze){ie.splice(Ie,1),he--;continue}oe=De}}$(z),N.forEach($);const O=N.length,H=z;for(let ie=0;ie<O;ie++){const se=N[ie];z=z.concat(se)}function Q(ie,se,ae){return se||et("ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector(se,ae)}const b=z.length;function R(ie,se,ae){let oe,he,Ie;const De=ie.x-se.x,Be=ie.y-se.y,Ve=ae.x-ie.x,D=ae.y-ie.y,rt=De*De+Be*Be,Ze=De*D-Be*Ve;if(Math.abs(Ze)>Number.EPSILON){const A=Math.sqrt(rt),v=Math.sqrt(Ve*Ve+D*D),V=se.x-Be/A,q=se.y+De/A,Z=ae.x-D/v,ce=ae.y+Ve/v,ue=((Z-V)*D-(ce-q)*Ve)/(De*D-Be*Ve);oe=V+De*ue-ie.x,he=q+Be*ue-ie.y;const J=oe*oe+he*he;if(J<=2)return new de(oe,he);Ie=Math.sqrt(J/2)}else{let A=!1;De>Number.EPSILON?Ve>Number.EPSILON&&(A=!0):De<-Number.EPSILON?Ve<-Number.EPSILON&&(A=!0):Math.sign(Be)===Math.sign(D)&&(A=!0),A?(oe=-Be,he=De,Ie=Math.sqrt(rt)):(oe=De,he=Be,Ie=Math.sqrt(rt/2))}return new de(oe/Ie,he/Ie)}const I=[];for(let ie=0,se=H.length,ae=se-1,oe=ie+1;ie<se;ie++,ae++,oe++)ae===se&&(ae=0),oe===se&&(oe=0),I[ie]=R(H[ie],H[ae],H[oe]);const G=[];let Y,le=I.concat();for(let ie=0,se=O;ie<se;ie++){const ae=N[ie];Y=[];for(let oe=0,he=ae.length,Ie=he-1,De=oe+1;oe<he;oe++,Ie++,De++)Ie===he&&(Ie=0),De===he&&(De=0),Y[oe]=R(ae[oe],ae[Ie],ae[De]);G.push(Y),le=le.concat(Y)}let xe;if(g===0)xe=Ri.triangulateShape(H,N);else{const ie=[],se=[];for(let ae=0;ae<g;ae++){const oe=ae/g,he=h*Math.cos(oe*Math.PI/2),Ie=m*Math.sin(oe*Math.PI/2)+_;for(let De=0,Be=H.length;De<Be;De++){const Ve=Q(H[De],I[De],Ie);be(Ve.x,Ve.y,-he),oe===0&&ie.push(Ve)}for(let De=0,Be=O;De<Be;De++){const Ve=N[De];Y=G[De];const D=[];for(let rt=0,Ze=Ve.length;rt<Ze;rt++){const A=Q(Ve[rt],Y[rt],Ie);be(A.x,A.y,-he),oe===0&&D.push(A)}oe===0&&se.push(D)}}xe=Ri.triangulateShape(ie,se)}const Xe=xe.length,Ke=m+_;for(let ie=0;ie<b;ie++){const se=u?Q(z[ie],le[ie],Ke):z[ie];S?(C.copy(M.normals[0]).multiplyScalar(se.x),E.copy(M.binormals[0]).multiplyScalar(se.y),x.copy(T[0]).add(C).add(E),be(x.x,x.y,x.z)):be(se.x,se.y,0)}for(let ie=1;ie<=d;ie++)for(let se=0;se<b;se++){const ae=u?Q(z[se],le[se],Ke):z[se];S?(C.copy(M.normals[ie]).multiplyScalar(ae.x),E.copy(M.binormals[ie]).multiplyScalar(ae.y),x.copy(T[ie]).add(C).add(E),be(x.x,x.y,x.z)):be(ae.x,ae.y,f/d*ie)}for(let ie=g-1;ie>=0;ie--){const se=ie/g,ae=h*Math.cos(se*Math.PI/2),oe=m*Math.sin(se*Math.PI/2)+_;for(let he=0,Ie=H.length;he<Ie;he++){const De=Q(H[he],I[he],oe);be(De.x,De.y,f+ae)}for(let he=0,Ie=N.length;he<Ie;he++){const De=N[he];Y=G[he];for(let Be=0,Ve=De.length;Be<Ve;Be++){const D=Q(De[Be],Y[Be],oe);S?be(D.x,D.y+T[d-1].y,T[d-1].x+ae):be(D.x,D.y,f+ae)}}}tt(),j();function tt(){const ie=r.length/3;if(u){let se=0,ae=b*se;for(let oe=0;oe<Xe;oe++){const he=xe[oe];Ue(he[2]+ae,he[1]+ae,he[0]+ae)}se=d+g*2,ae=b*se;for(let oe=0;oe<Xe;oe++){const he=xe[oe];Ue(he[0]+ae,he[1]+ae,he[2]+ae)}}else{for(let se=0;se<Xe;se++){const ae=xe[se];Ue(ae[2],ae[1],ae[0])}for(let se=0;se<Xe;se++){const ae=xe[se];Ue(ae[0]+b*d,ae[1]+b*d,ae[2]+b*d)}}i.addGroup(ie,r.length/3-ie,0)}function j(){const ie=r.length/3;let se=0;ne(H,se),se+=H.length;for(let ae=0,oe=N.length;ae<oe;ae++){const he=N[ae];ne(he,se),se+=he.length}i.addGroup(ie,r.length/3-ie,1)}function ne(ie,se){let ae=ie.length;for(;--ae>=0;){const oe=ae;let he=ae-1;he<0&&(he=ie.length-1);for(let Ie=0,De=d+g*2;Ie<De;Ie++){const Be=b*Ie,Ve=b*(Ie+1),D=se+oe+Be,rt=se+he+Be,Ze=se+he+Ve,A=se+oe+Ve;we(D,rt,Ze,A)}}}function be(ie,se,ae){l.push(ie),l.push(se),l.push(ae)}function Ue(ie,se,ae){Oe(ie),Oe(se),Oe(ae);const oe=r.length/3,he=w.generateTopUV(i,r,oe-3,oe-2,oe-1);ot(he[0]),ot(he[1]),ot(he[2])}function we(ie,se,ae,oe){Oe(ie),Oe(se),Oe(oe),Oe(se),Oe(ae),Oe(oe);const he=r.length/3,Ie=w.generateSideWallUV(i,r,he-6,he-3,he-2,he-1);ot(Ie[0]),ot(Ie[1]),ot(Ie[3]),ot(Ie[1]),ot(Ie[2]),ot(Ie[3])}function Oe(ie){r.push(l[ie*3+0]),r.push(l[ie*3+1]),r.push(l[ie*3+2])}function ot(ie){s.push(ie.x),s.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return kf(t,i,e)}static fromJSON(e,t){const i=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];i.push(o)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Ao[r.type]().fromJSON(r)),new As(i,e.options)}}const Tf={generateTopUV:function(n,e,t,i,r){const s=e[t*3],a=e[t*3+1],o=e[i*3],l=e[i*3+1],c=e[r*3],d=e[r*3+1];return[new de(s,a),new de(o,l),new de(c,d)]},generateSideWallUV:function(n,e,t,i,r,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[i*3],d=e[i*3+1],f=e[i*3+2],u=e[r*3],h=e[r*3+1],m=e[r*3+2],_=e[s*3],g=e[s*3+1],p=e[s*3+2];return Math.abs(o-d)<Math.abs(a-c)?[new de(a,1-l),new de(c,1-f),new de(u,1-m),new de(_,1-p)]:[new de(o,1-l),new de(d,1-f),new de(h,1-m),new de(g,1-p)]}};function kf(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){const s=n[i];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Ds extends At{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,d=l+1,f=e/o,u=t/l,h=[],m=[],_=[],g=[];for(let p=0;p<d;p++){const w=p*u-a;for(let T=0;T<c;T++){const S=T*f-s;m.push(S,-w,0),_.push(0,0,1),g.push(T/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<o;w++){const T=w+c*p,S=w+c*(p+1),M=w+1+c*(p+1),E=w+1+c*p;h.push(T,S,E),h.push(S,M,E)}this.setIndex(h),this.setAttribute("position",new zt(m,3)),this.setAttribute("normal",new zt(_,3)),this.setAttribute("uv",new zt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ds(e.width,e.height,e.widthSegments,e.heightSegments)}}function Ni(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(jl(r))r.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(jl(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Ot(n){const e={};for(let t=0;t<n.length;t++){const i=Ni(n[t]);for(const r in i)e[r]=i[r]}return e}function jl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Rf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Iu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const Cf={clone:Ni,merge:Ot};var Pf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yn extends ci{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pf,this.fragmentShader=zf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ni(e.uniforms),this.uniformsGroups=Rf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Ge().setHex(r.value);break;case"v2":this.uniforms[i].value=new de().fromArray(r.value);break;case"v3":this.uniforms[i].value=new L().fromArray(r.value);break;case"v4":this.uniforms[i].value=new xt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new He().fromArray(r.value);break;case"m4":this.uniforms[i].value=new ft().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Lf extends yn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Df extends ci{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yo,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=Oo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class If extends ci{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=od,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Nf extends ci{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Nu extends Ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ge(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const va=new ft,ec=new L,tc=new L;class Uf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.mapType=qt,this.map=null,this.mapPass=null,this.matrix=new ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zo,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;ec.setFromMatrixPosition(e.matrixWorld),t.position.copy(ec),tc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(tc),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){va.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(va,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===mr||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(va)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const es=new L,ts=new Vi,dn=new L;class Uu extends Ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ft,this.projectionMatrix=new ft,this.projectionMatrixInverse=new ft,this.coordinateSystem=_n,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(es,ts,dn),dn.x===1&&dn.y===1&&dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(es,ts,dn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(es,ts,dn),dn.x===1&&dn.y===1&&dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(es,ts,dn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Vn=new L,nc=new de,ic=new de;class jt extends Uu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Mo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(cs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Mo*2*Math.atan(Math.tan(cs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Vn.x,Vn.y).multiplyScalar(-e/Vn.z),Vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Vn.x,Vn.y).multiplyScalar(-e/Vn.z)}getViewSize(e,t){return this.getViewBounds(e,nc,ic),t.subVectors(ic,nc)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(cs*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Is extends Uu{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Ff extends Uf{constructor(){super(new Is(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class rc extends Nu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.shadow=new Ff}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Of extends Nu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Mi=-90,wi=1;class Bf extends Ct{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new jt(Mi,wi,e,t);r.layers=this.layers,this.add(r);const s=new jt(Mi,wi,e,t);s.layers=this.layers,this.add(s);const a=new jt(Mi,wi,e,t);a.layers=this.layers,this.add(a);const o=new jt(Mi,wi,e,t);o.layers=this.layers,this.add(o);const l=new jt(Mi,wi,e,t);l.layers=this.layers,this.add(l);const c=new jt(Mi,wi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===_n)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===mr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,d]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(f,u,h),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class Vf extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const sc=new ft;class _a{constructor(e,t,i=0,r=1/0){this.ray=new Ls(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Ko,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):et("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return sc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(sc),this}intersectObject(e,t=!0,i=[]){return Ro(e,this,i,t),i.sort(ac),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Ro(e[r],this,i,t);return i.sort(ac),i}}function ac(n,e){return n.distance-e.distance}function Ro(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)Ro(s[a],e,t,!0)}}class Fu{static{Fu.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}function oc(n,e,t,i){const r=Hf(i);switch(t){case gu:return n*e;case _u:return n*e/r.components*r.byteLength;case Go:return n*e/r.components*r.byteLength;case si:return n*e*2/r.components*r.byteLength;case Wo:return n*e*2/r.components*r.byteLength;case vu:return n*e*3/r.components*r.byteLength;case ln:return n*e*4/r.components*r.byteLength;case Xo:return n*e*4/r.components*r.byteLength;case ss:case as:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case os:case ls:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case $a:case Ya:return Math.max(n,16)*Math.max(e,8)/4;case Xa:case qa:return Math.max(n,8)*Math.max(e,8)/2;case Ka:case Za:case Qa:case ja:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ja:case vs:case eo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case to:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case no:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case io:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ro:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case so:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case ao:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case oo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case lo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case co:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case uo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ho:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case fo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case mo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case po:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case go:case vo:case _o:return Math.ceil(n/4)*Math.ceil(e/4)*16;case xo:case bo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case _s:case So:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Hf(n){switch(n){case qt:case du:return{byteLength:1,components:1};case dr:case fu:case Sn:return{byteLength:2,components:1};case Vo:case Ho:return{byteLength:2,components:4};case bn:case Bo:case vn:return{byteLength:4,components:1};case mu:case pu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fo}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ou(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Gf(n){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,f=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,d),o.onUploadCallback();let h;if(c instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=n.SHORT;else if(c instanceof Uint32Array)h=n.UNSIGNED_INT;else if(c instanceof Int32Array)h=n.INT;else if(c instanceof Int8Array)h=n.BYTE;else if(c instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const d=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,d);else{f.sort((h,m)=>h.start-m.start);let u=0;for(let h=1;h<f.length;h++){const m=f[u],_=f[h];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++u,f[u]=_)}f.length=u+1;for(let h=0,m=f.length;h<m;h++){const _=f[h];n.bufferSubData(c,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Wf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xf=`#ifdef USE_ALPHAHASH
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
#endif`,$f=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Kf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Zf=`#ifdef USE_AOMAP
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
#endif`,Jf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qf=`#ifdef USE_BATCHING
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
#endif`,jf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,em=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,tm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,im=`#ifdef USE_IRIDESCENCE
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
#endif`,rm=`#ifdef USE_BUMPMAP
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
#endif`,sm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,am=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,om=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,lm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,um=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,hm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,dm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,fm=`#define PI 3.141592653589793
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
} // validated`,mm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,pm=`vec3 transformedNormal = objectNormal;
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
#endif`,gm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_m=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Sm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ym=`#ifdef USE_ENVMAP
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
#endif`,Mm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,wm=`#ifdef USE_ENVMAP
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
#endif`,Em=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Am=`#ifdef USE_ENVMAP
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
#endif`,Tm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,km=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Rm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Cm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Pm=`#ifdef USE_GRADIENTMAP
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
}`,zm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Lm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Dm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Im=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Nm=`#ifdef USE_ENVMAP
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
#endif`,Um=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Om=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Bm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vm=`PhysicalMaterial material;
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
#endif`,Hm=`uniform sampler2D dfgLUT;
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
}`,Gm=`
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
#endif`,Wm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Xm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$m=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,qm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ym=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Km=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ep=`#if defined( USE_POINTS_UV )
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
#endif`,tp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,np=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ip=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,rp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ap=`#ifdef USE_MORPHTARGETS
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
#endif`,op=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,cp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,up=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,fp=`#ifdef USE_NORMALMAP
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
#endif`,mp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_p=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,bp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,yp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,wp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ep=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ap=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Tp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Rp=`float getShadowMask() {
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
}`,Cp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Pp=`#ifdef USE_SKINNING
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
#endif`,zp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Lp=`#ifdef USE_SKINNING
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
#endif`,Dp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ip=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Np=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Up=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Fp=`#ifdef USE_TRANSMISSION
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
#endif`,Op=`#ifdef USE_TRANSMISSION
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
#endif`,Bp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Wp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xp=`uniform sampler2D t2D;
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
}`,qp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Yp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zp=`#include <common>
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
}`,Jp=`#if DEPTH_PACKING == 3200
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
}`,Qp=`#define DISTANCE
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
}`,jp=`#define DISTANCE
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
}`,eg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ng=`uniform float scale;
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
}`,ig=`uniform vec3 diffuse;
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
}`,rg=`#include <common>
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
}`,sg=`uniform vec3 diffuse;
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
}`,ag=`#define LAMBERT
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
}`,og=`#define LAMBERT
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
}`,lg=`#define MATCAP
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
}`,cg=`#define MATCAP
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
}`,ug=`#define NORMAL
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
}`,hg=`#define NORMAL
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
}`,dg=`#define PHONG
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
}`,fg=`#define PHONG
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
}`,mg=`#define STANDARD
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
}`,pg=`#define STANDARD
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
}`,gg=`#define TOON
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
}`,vg=`#define TOON
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
}`,_g=`uniform float size;
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
}`,xg=`uniform vec3 diffuse;
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
}`,bg=`#include <common>
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
}`,Sg=`uniform vec3 color;
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
}`,yg=`uniform float rotation;
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
}`,Mg=`uniform vec3 diffuse;
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
}`,qe={alphahash_fragment:Wf,alphahash_pars_fragment:Xf,alphamap_fragment:$f,alphamap_pars_fragment:qf,alphatest_fragment:Yf,alphatest_pars_fragment:Kf,aomap_fragment:Zf,aomap_pars_fragment:Jf,batching_pars_vertex:Qf,batching_vertex:jf,begin_vertex:em,beginnormal_vertex:tm,bsdfs:nm,iridescence_fragment:im,bumpmap_pars_fragment:rm,clipping_planes_fragment:sm,clipping_planes_pars_fragment:am,clipping_planes_pars_vertex:om,clipping_planes_vertex:lm,color_fragment:cm,color_pars_fragment:um,color_pars_vertex:hm,color_vertex:dm,common:fm,cube_uv_reflection_fragment:mm,defaultnormal_vertex:pm,displacementmap_pars_vertex:gm,displacementmap_vertex:vm,emissivemap_fragment:_m,emissivemap_pars_fragment:xm,colorspace_fragment:bm,colorspace_pars_fragment:Sm,envmap_fragment:ym,envmap_common_pars_fragment:Mm,envmap_pars_fragment:wm,envmap_pars_vertex:Em,envmap_physical_pars_fragment:Nm,envmap_vertex:Am,fog_vertex:Tm,fog_pars_vertex:km,fog_fragment:Rm,fog_pars_fragment:Cm,gradientmap_pars_fragment:Pm,lightmap_pars_fragment:zm,lights_lambert_fragment:Lm,lights_lambert_pars_fragment:Dm,lights_pars_begin:Im,lights_toon_fragment:Um,lights_toon_pars_fragment:Fm,lights_phong_fragment:Om,lights_phong_pars_fragment:Bm,lights_physical_fragment:Vm,lights_physical_pars_fragment:Hm,lights_fragment_begin:Gm,lights_fragment_maps:Wm,lights_fragment_end:Xm,lightprobes_pars_fragment:$m,logdepthbuf_fragment:qm,logdepthbuf_pars_fragment:Ym,logdepthbuf_pars_vertex:Km,logdepthbuf_vertex:Zm,map_fragment:Jm,map_pars_fragment:Qm,map_particle_fragment:jm,map_particle_pars_fragment:ep,metalnessmap_fragment:tp,metalnessmap_pars_fragment:np,morphinstance_vertex:ip,morphcolor_vertex:rp,morphnormal_vertex:sp,morphtarget_pars_vertex:ap,morphtarget_vertex:op,normal_fragment_begin:lp,normal_fragment_maps:cp,normal_pars_fragment:up,normal_pars_vertex:hp,normal_vertex:dp,normalmap_pars_fragment:fp,clearcoat_normal_fragment_begin:mp,clearcoat_normal_fragment_maps:pp,clearcoat_pars_fragment:gp,iridescence_pars_fragment:vp,opaque_fragment:_p,packing:xp,premultiplied_alpha_fragment:bp,project_vertex:Sp,dithering_fragment:yp,dithering_pars_fragment:Mp,roughnessmap_fragment:wp,roughnessmap_pars_fragment:Ep,shadowmap_pars_fragment:Ap,shadowmap_pars_vertex:Tp,shadowmap_vertex:kp,shadowmask_pars_fragment:Rp,skinbase_vertex:Cp,skinning_pars_vertex:Pp,skinning_vertex:zp,skinnormal_vertex:Lp,specularmap_fragment:Dp,specularmap_pars_fragment:Ip,tonemapping_fragment:Np,tonemapping_pars_fragment:Up,transmission_fragment:Fp,transmission_pars_fragment:Op,uv_pars_fragment:Bp,uv_pars_vertex:Vp,uv_vertex:Hp,worldpos_vertex:Gp,background_vert:Wp,background_frag:Xp,backgroundCube_vert:$p,backgroundCube_frag:qp,cube_vert:Yp,cube_frag:Kp,depth_vert:Zp,depth_frag:Jp,distance_vert:Qp,distance_frag:jp,equirect_vert:eg,equirect_frag:tg,linedashed_vert:ng,linedashed_frag:ig,meshbasic_vert:rg,meshbasic_frag:sg,meshlambert_vert:ag,meshlambert_frag:og,meshmatcap_vert:lg,meshmatcap_frag:cg,meshnormal_vert:ug,meshnormal_frag:hg,meshphong_vert:dg,meshphong_frag:fg,meshphysical_vert:mg,meshphysical_frag:pg,meshtoon_vert:gg,meshtoon_frag:vg,points_vert:_g,points_frag:xg,shadow_vert:bg,shadow_frag:Sg,sprite_vert:yg,sprite_frag:Mg},_e={common:{diffuse:{value:new Ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Ge(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},gn={basic:{uniforms:Ot([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:Ot([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Ge(0)},envMapIntensity:{value:1}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:Ot([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Ge(0)},specular:{value:new Ge(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:Ot([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:Ot([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Ge(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:Ot([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:Ot([_e.points,_e.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:Ot([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:Ot([_e.common,_e.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:Ot([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:Ot([_e.sprite,_e.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distance:{uniforms:Ot([_e.common,_e.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distance_vert,fragmentShader:qe.distance_frag},shadow:{uniforms:Ot([_e.lights,_e.fog,{color:{value:new Ge(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};gn.physical={uniforms:Ot([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Ge(0)},specularColor:{value:new Ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const ns={r:0,b:0,g:0},wg=new ft,Bu=new He;Bu.set(-1,0,0,0,1,0,0,0,1);function Eg(n,e,t,i,r,s){const a=new Ge(0);let o=r===!0?0:1,l,c,d=null,f=0,u=null;function h(w){let T=w.isScene===!0?w.background:null;if(T&&T.isTexture){const S=w.backgroundBlurriness>0;T=e.get(T,S)}return T}function m(w){let T=!1;const S=h(w);S===null?g(a,o):S&&S.isColor&&(g(S,1),T=!0);const M=n.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,s):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(w,T){const S=h(T);S&&(S.isCubeTexture||S.mapping===zs)?(c===void 0&&(c=new nn(new ai(1,1,1),new yn({name:"BackgroundCubeMaterial",uniforms:Ni(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(wg.makeRotationFromEuler(T.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Bu),c.material.toneMapped=je.getTransfer(S.colorSpace)!==lt,(d!==S||f!==S.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,d=S,f=S.version,u=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new nn(new Ds(2,2),new yn({name:"BackgroundMaterial",uniforms:Ni(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=je.getTransfer(S.colorSpace)!==lt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||f!==S.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,d=S,f=S.version,u=n.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function g(w,T){w.getRGB(ns,Iu(n)),t.buffers.color.setClear(ns.r,ns.g,ns.b,T,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,T=1){a.set(w),o=T,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(w){o=w,g(a,o)},render:m,addToRenderList:_,dispose:p}}function Ag(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,a=!1;function o(N,B,$,O,H){let Q=!1;const b=f(N,O,$,B);s!==b&&(s=b,c(s.object)),Q=h(N,O,$,H),Q&&m(N,O,$,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(Q||a)&&(a=!1,S(N,B,$,O),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return n.createVertexArray()}function c(N){return n.bindVertexArray(N)}function d(N){return n.deleteVertexArray(N)}function f(N,B,$,O){const H=O.wireframe===!0;let Q=i[B.id];Q===void 0&&(Q={},i[B.id]=Q);const b=N.isInstancedMesh===!0?N.id:0;let R=Q[b];R===void 0&&(R={},Q[b]=R);let I=R[$.id];I===void 0&&(I={},R[$.id]=I);let G=I[H];return G===void 0&&(G=u(l()),I[H]=G),G}function u(N){const B=[],$=[],O=[];for(let H=0;H<t;H++)B[H]=0,$[H]=0,O[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:$,attributeDivisors:O,object:N,attributes:{},index:null}}function h(N,B,$,O){const H=s.attributes,Q=B.attributes;let b=0;const R=$.getAttributes();for(const I in R)if(R[I].location>=0){const Y=H[I];let le=Q[I];if(le===void 0&&(I==="instanceMatrix"&&N.instanceMatrix&&(le=N.instanceMatrix),I==="instanceColor"&&N.instanceColor&&(le=N.instanceColor)),Y===void 0||Y.attribute!==le||le&&Y.data!==le.data)return!0;b++}return s.attributesNum!==b||s.index!==O}function m(N,B,$,O){const H={},Q=B.attributes;let b=0;const R=$.getAttributes();for(const I in R)if(R[I].location>=0){let Y=Q[I];Y===void 0&&(I==="instanceMatrix"&&N.instanceMatrix&&(Y=N.instanceMatrix),I==="instanceColor"&&N.instanceColor&&(Y=N.instanceColor));const le={};le.attribute=Y,Y&&Y.data&&(le.data=Y.data),H[I]=le,b++}s.attributes=H,s.attributesNum=b,s.index=O}function _(){const N=s.newAttributes;for(let B=0,$=N.length;B<$;B++)N[B]=0}function g(N){p(N,0)}function p(N,B){const $=s.newAttributes,O=s.enabledAttributes,H=s.attributeDivisors;$[N]=1,O[N]===0&&(n.enableVertexAttribArray(N),O[N]=1),H[N]!==B&&(n.vertexAttribDivisor(N,B),H[N]=B)}function w(){const N=s.newAttributes,B=s.enabledAttributes;for(let $=0,O=B.length;$<O;$++)B[$]!==N[$]&&(n.disableVertexAttribArray($),B[$]=0)}function T(N,B,$,O,H,Q,b){b===!0?n.vertexAttribIPointer(N,B,$,H,Q):n.vertexAttribPointer(N,B,$,O,H,Q)}function S(N,B,$,O){_();const H=O.attributes,Q=$.getAttributes(),b=B.defaultAttributeValues;for(const R in Q){const I=Q[R];if(I.location>=0){let G=H[R];if(G===void 0&&(R==="instanceMatrix"&&N.instanceMatrix&&(G=N.instanceMatrix),R==="instanceColor"&&N.instanceColor&&(G=N.instanceColor)),G!==void 0){const Y=G.normalized,le=G.itemSize,xe=e.get(G);if(xe===void 0)continue;const Xe=xe.buffer,Ke=xe.type,tt=xe.bytesPerElement,j=Ke===n.INT||Ke===n.UNSIGNED_INT||G.gpuType===Bo;if(G.isInterleavedBufferAttribute){const ne=G.data,be=ne.stride,Ue=G.offset;if(ne.isInstancedInterleavedBuffer){for(let we=0;we<I.locationSize;we++)p(I.location+we,ne.meshPerAttribute);N.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let we=0;we<I.locationSize;we++)g(I.location+we);n.bindBuffer(n.ARRAY_BUFFER,Xe);for(let we=0;we<I.locationSize;we++)T(I.location+we,le/I.locationSize,Ke,Y,be*tt,(Ue+le/I.locationSize*we)*tt,j)}else{if(G.isInstancedBufferAttribute){for(let ne=0;ne<I.locationSize;ne++)p(I.location+ne,G.meshPerAttribute);N.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let ne=0;ne<I.locationSize;ne++)g(I.location+ne);n.bindBuffer(n.ARRAY_BUFFER,Xe);for(let ne=0;ne<I.locationSize;ne++)T(I.location+ne,le/I.locationSize,Ke,Y,le*tt,le/I.locationSize*ne*tt,j)}}else if(b!==void 0){const Y=b[R];if(Y!==void 0)switch(Y.length){case 2:n.vertexAttrib2fv(I.location,Y);break;case 3:n.vertexAttrib3fv(I.location,Y);break;case 4:n.vertexAttrib4fv(I.location,Y);break;default:n.vertexAttrib1fv(I.location,Y)}}}}w()}function M(){k();for(const N in i){const B=i[N];for(const $ in B){const O=B[$];for(const H in O){const Q=O[H];for(const b in Q)d(Q[b].object),delete Q[b];delete O[H]}}delete i[N]}}function E(N){if(i[N.id]===void 0)return;const B=i[N.id];for(const $ in B){const O=B[$];for(const H in O){const Q=O[H];for(const b in Q)d(Q[b].object),delete Q[b];delete O[H]}}delete i[N.id]}function C(N){for(const B in i){const $=i[B];for(const O in $){const H=$[O];if(H[N.id]===void 0)continue;const Q=H[N.id];for(const b in Q)d(Q[b].object),delete Q[b];delete H[N.id]}}}function x(N){for(const B in i){const $=i[B],O=N.isInstancedMesh===!0?N.id:0,H=$[O];if(H!==void 0){for(const Q in H){const b=H[Q];for(const R in b)d(b[R].object),delete b[R];delete H[Q]}delete $[O],Object.keys($).length===0&&delete i[B]}}}function k(){z(),a=!0,s!==r&&(s=r,c(s.object))}function z(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:k,resetDefaultState:z,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:g,disableUnusedAttributes:w}}function Tg(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,d){d!==0&&(n.drawArraysInstanced(i,l,c,d),t.update(c,i,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let u=0;for(let h=0;h<d;h++)u+=c[h];t.update(u,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function kg(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==ln&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const x=C===Sn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==qt&&C!==vn&&!x&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(Fe("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),M=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:h,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:w,maxVaryings:T,maxFragmentUniforms:S,maxSamples:M,samples:E}}function Rg(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new pn,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const h=f.length!==0||u||i!==0||r;return r=u,i=f.length,h},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,u){t=d(f,u,0)},this.setState=function(f,u,h){const m=f.clippingPlanes,_=f.clipIntersection,g=f.clipShadows,p=n.get(f);if(!r||m===null||m.length===0||s&&!g)s?d(null):c();else{const w=s?0:i,T=w*4;let S=p.clippingState||null;l.value=S,S=d(m,u,T,h);for(let M=0;M!==T;++M)S[M]=t[M];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(f,u,h,m){const _=f!==null?f.length:0;let g=null;if(_!==0){if(g=l.value,m!==!0||g===null){const p=h+_*4,w=u.matrixWorldInverse;o.getNormalMatrix(w),(g===null||g.length<p)&&(g=new Float32Array(p));for(let T=0,S=h;T!==_;++T,S+=4)a.copy(f[T]).applyMatrix4(w,o),a.normal.toArray(g,S),g[S+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}const Ci=4,Cg=6,Pg=20,zg=256,Zi=new Is,lc=new Ge;let xa=null,ba=0,Sa=0,ya=!1;const Lg=new L,Qn=new L;class cc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=Lg}=s;xa=this._renderer.getRenderTarget(),ba=this._renderer.getActiveCubeFace(),Sa=this._renderer.getActiveMipmapLevel(),ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=dc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(xa,ba,Sa),this._renderer.xr.enabled=ya,e.scissorTest=!1,Ei(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ri||e.mapping===Di?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),xa=this._renderer.getRenderTarget(),ba=this._renderer.getActiveCubeFace(),Sa=this._renderer.getActiveMipmapLevel(),ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ut,minFilter:Ut,generateMipmaps:!1,type:Sn,format:ln,colorSpace:xs,depthBuffer:!1},r=uc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uc(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Dg(s)),this._blurMaterial=Ng(s,e,t),this._ggxMaterial=Ig(s,e,t)}return r}_compileMaterial(e){const t=new nn(new At,e);this._renderer.compile(t,Zi)}_sceneToCubeUV(e,t,i,r,s){const l=new jt(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,h=f.toneMapping;f.getClearColor(lc),f.toneMapping=xn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new nn(new ai,new ys({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,g=_.material;let p=!1;const w=e.background;w?w.isColor&&(g.color.copy(w),e.background=null,p=!0):(g.color.copy(lc),p=!0);for(let T=0;T<6;T++){const S=T%3;S===0?(l.up.set(0,c[T],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+d[T],s.y,s.z)):S===1?(l.up.set(0,0,c[T]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+d[T],s.z)):(l.up.set(0,c[T],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+d[T]));const M=this._cubeSize;Ei(r,S*M,T>2?M:0,M,M),f.setRenderTarget(r),p&&f.render(_,l),f.render(e,l)}f.toneMapping=h,f.autoClear=u,e.background=w}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===ri||e.mapping===Di;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=dc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Ei(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Zi)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-d*d),u=c*1.25,h=f*u,{_lodMax:m}=this,_=this._sizeLods[i],g=3*_*(i>m-Ci?i-m+Ci:0),p=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=m-t,Ei(s,g,p,3*_,2*_),r.setRenderTarget(s),r.render(o,Zi),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-i,Ei(e,g,p,3*_,2*_),r.setRenderTarget(e),r.render(o,Zi)}_blur(e,t,i,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,t,i,r,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;const d=this._sizeLods[r],f=3*d*(r>this._lodMax-Ci?r-this._lodMax+Ci:0),u=4*(this._cubeSize-d);Ei(t,f,u,3*d,2*d),a.setRenderTarget(t),a.render(l,Zi)}}function Dg(n){const e=[],t=[];let i=n;const r=n-Ci+1+Cg;for(let s=0;s<r;s++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),l=-o,c=1+o,d=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,u=6,h=3,m=new Float32Array(h*u*f),_=new Float32Array(h*u*f);for(let p=0;p<f;p++){const w=p%3*2/3-1,T=p>2?0:-1,S=[w,T,0,w+2/3,T,0,w+2/3,T+1,0,w,T,0,w+2/3,T+1,0,w,T+1,0];m.set(S,h*u*p);for(let M=0;M<u;M++){const E=d[M*2]*2-1,C=d[M*2+1]*2-1;p===0?Qn.set(1,C,E):p===1?Qn.set(-E,1,-C):p===2?Qn.set(-E,C,1):p===3?Qn.set(-1,C,-E):p===4?Qn.set(-E,-1,C):Qn.set(E,C,-1),Qn.toArray(_,(p*u+M)*h)}}const g=new At;g.setAttribute("position",new zn(m,h)),g.setAttribute("outputDirection",new zn(_,h)),t.push(new nn(g,null)),i>Ci&&i--}return{lodMeshes:t,sizeLods:e}}function uc(n,e,t){const i=new cn(n,e,t);return i.texture.mapping=zs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ei(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Ig(n,e,t){return new yn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:zg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ns(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Ng(n,e,t){return new yn({name:"SphericalGaussianBlur",defines:{SAMPLES:Pg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ns(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function hc(){return new yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ns(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function dc(){return new yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ns(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Ns(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Vu extends cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new wu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ai(5,5,5),s=new yn({name:"CubemapFromEquirect",uniforms:Ni(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ht,blending:Cn});s.uniforms.tEquirect.value=t;const a=new nn(r,s),o=t.minFilter;return t.minFilter===ti&&(t.minFilter=Ut),new Bf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function Ug(n){let e=new WeakMap,t=new WeakMap,i=null;function r(u,h=!1){return u==null?null:h?a(u):s(u)}function s(u){if(u&&u.isTexture){const h=u.mapping;if(h===Vs||h===Hs)if(e.has(u)){const m=e.get(u).texture;return o(m,u.mapping)}else{const m=u.image;if(m&&m.height>0){const _=new Vu(m.height);return _.fromEquirectangularTexture(n,u),e.set(u,_),u.addEventListener("dispose",c),o(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const h=u.mapping,m=h===Vs||h===Hs,_=h===ri||h===Di;if(m||_){let g=t.get(u);const p=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new cc(n)),g=m?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{const w=u.image;return m&&w&&w.height>0||_&&w&&l(w)?(i===null&&(i=new cc(n)),g=m?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",d),g.texture):null}}}return u}function o(u,h){return h===Vs?u.mapping=ri:h===Hs&&(u.mapping=Di),u}function l(u){let h=0;const m=6;for(let _=0;_<m;_++)u[_]!==void 0&&h++;return h===m}function c(u){const h=u.target;h.removeEventListener("dispose",c);const m=e.get(h);m!==void 0&&(e.delete(h),m.dispose())}function d(u){const h=u.target;h.removeEventListener("dispose",d);const m=t.get(h);m!==void 0&&(t.delete(h),m.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function Fg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&zi("WebGLRenderer: "+i+" extension not supported."),r}}}function Og(n,e,t,i){const r={},s=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete r[u.id];const h=s.get(u);h&&(e.remove(h),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function l(f){const u=f.attributes;for(const h in u)e.update(u[h],n.ARRAY_BUFFER)}function c(f){const u=[],h=f.index,m=f.attributes.position;let _=0;if(m===void 0)return;if(h!==null){const w=h.array;_=h.version;for(let T=0,S=w.length;T<S;T+=3){const M=w[T+0],E=w[T+1],C=w[T+2];u.push(M,E,E,C,C,M)}}else{const w=m.array;_=m.version;for(let T=0,S=w.length/3-1;T<S;T+=3){const M=T+0,E=T+1,C=T+2;u.push(M,E,E,C,C,M)}}const g=new(m.count>=65535?Mu:yu)(u,1);g.version=_;const p=s.get(f);p&&e.remove(p),s.set(f,g)}function d(f){const u=s.get(f);if(u){const h=f.index;h!==null&&u.version<h.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:d}}function Bg(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,u){n.drawElements(i,u,s,f*a),t.update(u,i,1)}function c(f,u,h){h!==0&&(n.drawElementsInstanced(i,u,s,f*a,h),t.update(u,i,h))}function d(f,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,f,0,h);let _=0;for(let g=0;g<h;g++)_+=u[g];t.update(_,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function Vg(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:et("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Hg(n,e,t){const i=new WeakMap,r=new xt;function s(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==f){let z=function(){x.dispose(),i.delete(o),o.removeEventListener("dispose",z)};var h=z;u!==void 0&&u.texture.dispose();const m=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],w=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let S=0;m===!0&&(S=1),_===!0&&(S=2),g===!0&&(S=3);let M=o.attributes.position.count*S,E=1;M>e.maxTextureSize&&(E=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const C=new Float32Array(M*E*4*f),x=new bu(C,M,E,f);x.type=vn,x.needsUpdate=!0;const k=S*4;for(let N=0;N<f;N++){const B=p[N],$=w[N],O=T[N],H=M*E*4*N;for(let Q=0;Q<B.count;Q++){const b=Q*k;m===!0&&(r.fromBufferAttribute(B,Q),C[H+b+0]=r.x,C[H+b+1]=r.y,C[H+b+2]=r.z,C[H+b+3]=0),_===!0&&(r.fromBufferAttribute($,Q),C[H+b+4]=r.x,C[H+b+5]=r.y,C[H+b+6]=r.z,C[H+b+7]=0),g===!0&&(r.fromBufferAttribute(O,Q),C[H+b+8]=r.x,C[H+b+9]=r.y,C[H+b+10]=r.z,C[H+b+11]=O.itemSize===4?r.w:1)}}u={count:f,texture:x,size:new de(M,E)},i.set(o,u),o.addEventListener("dispose",z)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const _=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function Gg(n,e,t,i,r){let s=new WeakMap;function a(c){const d=r.render.frame,f=c.geometry,u=e.get(c,f);if(s.get(u)!==d&&(e.update(u),s.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==d&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,d))),c.isSkinnedMesh){const h=c.skeleton;s.get(h)!==d&&(h.update(),s.set(h,d))}return u}function o(){s=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const Wg={[ru]:"LINEAR_TONE_MAPPING",[su]:"REINHARD_TONE_MAPPING",[au]:"CINEON_TONE_MAPPING",[ou]:"ACES_FILMIC_TONE_MAPPING",[cu]:"AGX_TONE_MAPPING",[uu]:"NEUTRAL_TONE_MAPPING",[lu]:"CUSTOM_TONE_MAPPING"};function Xg(n,e,t,i,r,s){const a=new cn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new At;c.setAttribute("position",new zt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new zt([0,2,0,0,2,0],2));const d=new Lf({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new nn(c,d),u=new Is(-1,1,1,-1,0,1);let h=null,m=null,_=!1,g,p=null,w=[],T=!1;this.setSize=function(S,M){a.setSize(S,M),o!==null&&o.setSize(S,M),l!==null&&l.setSize(S,M);for(let E=0;E<w.length;E++){const C=w[E];C.setSize&&C.setSize(S,M)}},this.setEffects=function(S){w=S,T=w.length>0&&w[0].isRenderPass===!0;const M=a.width,E=a.height;w.length>0&&o===null&&(o=new cn(M,E,{type:Sn,depthBuffer:!1,stencilBuffer:!1}),l=new cn(M,E,{type:Sn,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<w.length;C++){const x=w[C];x.setSize&&x.setSize(M,E)}},this.begin=function(S,M){if(_||S.toneMapping===xn&&w.length===0)return!1;if(p=M,M!==null){const E=M.width,C=M.height;(a.width!==E||a.height!==C)&&this.setSize(E,C)}return T===!1&&S.setRenderTarget(a),g=S.toneMapping,S.toneMapping=xn,!0},this.hasRenderPass=function(){return T},this.end=function(S,M){S.toneMapping=g,_=!0;let E=a,C=o;for(let x=0;x<w.length;x++){const k=w[x];k.enabled!==!1&&(k.render(S,C,E,M),k.needsSwap!==!1&&(E=C,C=C===o?l:o))}if(h!==S.outputColorSpace||m!==S.toneMapping){h=S.outputColorSpace,m=S.toneMapping,d.defines={},je.getTransfer(h)===lt&&(d.defines.SRGB_TRANSFER="");const x=Wg[m];x&&(d.defines[x]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=E.texture,S.setRenderTarget(p),S.render(f,u),p=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),d.dispose()}}const Hu=new Bt,Co=new pr(1,1),Gu=new bu,Wu=new Td,Xu=new wu,fc=[],mc=[],pc=new Float32Array(16),gc=new Float32Array(9),vc=new Float32Array(4);function Hi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=fc[r];if(s===void 0&&(s=new Float32Array(r),fc[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Tt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function kt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Us(n,e){let t=mc[e];t===void 0&&(t=new Int32Array(e),mc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function $g(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function qg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2fv(this.addr,e),kt(t,e)}}function Yg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Tt(t,e))return;n.uniform3fv(this.addr,e),kt(t,e)}}function Kg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4fv(this.addr,e),kt(t,e)}}function Zg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),kt(t,e)}else{if(Tt(t,i))return;vc.set(i),n.uniformMatrix2fv(this.addr,!1,vc),kt(t,i)}}function Jg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),kt(t,e)}else{if(Tt(t,i))return;gc.set(i),n.uniformMatrix3fv(this.addr,!1,gc),kt(t,i)}}function Qg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),kt(t,e)}else{if(Tt(t,i))return;pc.set(i),n.uniformMatrix4fv(this.addr,!1,pc),kt(t,i)}}function jg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function e0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2iv(this.addr,e),kt(t,e)}}function t0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;n.uniform3iv(this.addr,e),kt(t,e)}}function n0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4iv(this.addr,e),kt(t,e)}}function i0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function r0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2uiv(this.addr,e),kt(t,e)}}function s0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;n.uniform3uiv(this.addr,e),kt(t,e)}}function a0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4uiv(this.addr,e),kt(t,e)}}function o0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Co.compareFunction=t.isReversedDepthBuffer()?qo:$o,s=Co):s=Hu,t.setTexture2D(e||s,r)}function l0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Wu,r)}function c0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Xu,r)}function u0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Gu,r)}function h0(n){switch(n){case 5126:return $g;case 35664:return qg;case 35665:return Yg;case 35666:return Kg;case 35674:return Zg;case 35675:return Jg;case 35676:return Qg;case 5124:case 35670:return jg;case 35667:case 35671:return e0;case 35668:case 35672:return t0;case 35669:case 35673:return n0;case 5125:return i0;case 36294:return r0;case 36295:return s0;case 36296:return a0;case 35678:case 36198:case 36298:case 36306:case 35682:return o0;case 35679:case 36299:case 36307:return l0;case 35680:case 36300:case 36308:case 36293:return c0;case 36289:case 36303:case 36311:case 36292:return u0}}function d0(n,e){n.uniform1fv(this.addr,e)}function f0(n,e){const t=Hi(e,this.size,2);n.uniform2fv(this.addr,t)}function m0(n,e){const t=Hi(e,this.size,3);n.uniform3fv(this.addr,t)}function p0(n,e){const t=Hi(e,this.size,4);n.uniform4fv(this.addr,t)}function g0(n,e){const t=Hi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function v0(n,e){const t=Hi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function _0(n,e){const t=Hi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function x0(n,e){n.uniform1iv(this.addr,e)}function b0(n,e){n.uniform2iv(this.addr,e)}function S0(n,e){n.uniform3iv(this.addr,e)}function y0(n,e){n.uniform4iv(this.addr,e)}function M0(n,e){n.uniform1uiv(this.addr,e)}function w0(n,e){n.uniform2uiv(this.addr,e)}function E0(n,e){n.uniform3uiv(this.addr,e)}function A0(n,e){n.uniform4uiv(this.addr,e)}function T0(n,e,t){const i=this.cache,r=e.length,s=Us(t,r);Tt(i,s)||(n.uniform1iv(this.addr,s),kt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=Co:a=Hu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function k0(n,e,t){const i=this.cache,r=e.length,s=Us(t,r);Tt(i,s)||(n.uniform1iv(this.addr,s),kt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Wu,s[a])}function R0(n,e,t){const i=this.cache,r=e.length,s=Us(t,r);Tt(i,s)||(n.uniform1iv(this.addr,s),kt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Xu,s[a])}function C0(n,e,t){const i=this.cache,r=e.length,s=Us(t,r);Tt(i,s)||(n.uniform1iv(this.addr,s),kt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Gu,s[a])}function P0(n){switch(n){case 5126:return d0;case 35664:return f0;case 35665:return m0;case 35666:return p0;case 35674:return g0;case 35675:return v0;case 35676:return _0;case 5124:case 35670:return x0;case 35667:case 35671:return b0;case 35668:case 35672:return S0;case 35669:case 35673:return y0;case 5125:return M0;case 36294:return w0;case 36295:return E0;case 36296:return A0;case 35678:case 36198:case 36298:case 36306:case 35682:return T0;case 35679:case 36299:case 36307:return k0;case 35680:case 36300:case 36308:case 36293:return R0;case 36289:case 36303:case 36311:case 36292:return C0}}class z0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=h0(t.type)}}class L0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=P0(t.type)}}class D0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Ma=/(\w+)(\])?(\[|\.)?/g;function _c(n,e){n.seq.push(e),n.map[e.id]=e}function I0(n,e,t){const i=n.name,r=i.length;for(Ma.lastIndex=0;;){const s=Ma.exec(i),a=Ma.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){_c(t,c===void 0?new z0(o,n,e):new L0(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new D0(o),_c(t,f)),t=f}}}class us{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);I0(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function xc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const N0=37297;let U0=0;function F0(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const bc=new He;function O0(n){je._getMatrix(bc,je.workingColorSpace,n);const e=`mat3( ${bc.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(n)){case bs:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Sc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+F0(n.getShaderSource(e),o)}else return s}function B0(n,e){const t=O0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const V0={[ru]:"Linear",[su]:"Reinhard",[au]:"Cineon",[ou]:"ACESFilmic",[cu]:"AgX",[uu]:"Neutral",[lu]:"Custom"};function H0(n,e){const t=V0[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const is=new L;function G0(){je.getLuminanceCoefficients(is);const n=is.x.toFixed(4),e=is.y.toFixed(4),t=is.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function W0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(er).join(`
`)}function X0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function $0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function er(n){return n!==""}function yc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Mc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const q0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Po(n){return n.replace(q0,K0)}const Y0=new Map;function K0(n,e){let t=qe[e];if(t===void 0){const i=Y0.get(e);if(i!==void 0)t=qe[i],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Po(t)}const Z0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wc(n){return n.replace(Z0,J0)}function J0(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ec(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const Q0={[rs]:"SHADOWMAP_TYPE_PCF",[Qi]:"SHADOWMAP_TYPE_VSM"};function j0(n){return Q0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const ev={[ri]:"ENVMAP_TYPE_CUBE",[Di]:"ENVMAP_TYPE_CUBE",[zs]:"ENVMAP_TYPE_CUBE_UV"};function tv(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":ev[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const nv={[Di]:"ENVMAP_MODE_REFRACTION"};function iv(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":nv[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const rv={[Oo]:"ENVMAP_BLENDING_MULTIPLY",[rd]:"ENVMAP_BLENDING_MIX",[sd]:"ENVMAP_BLENDING_ADD"};function sv(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":rv[n.combine]||"ENVMAP_BLENDING_NONE"}function av(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function ov(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=j0(t),c=tv(t),d=iv(t),f=sv(t),u=av(t),h=W0(t),m=X0(s),_=r.createProgram();let g,p,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(er).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(er).join(`
`),p.length>0&&(p+=`
`)):(g=[Ec(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(er).join(`
`),p=[Ec(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==xn?"#define TONE_MAPPING":"",t.toneMapping!==xn?qe.tonemapping_pars_fragment:"",t.toneMapping!==xn?H0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,B0("linearToOutputTexel",t.outputColorSpace),G0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(er).join(`
`)),a=Po(a),a=yc(a,t),a=Mc(a,t),o=Po(o),o=yc(o,t),o=Mc(o,t),a=wc(a),o=wc(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,g=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Ml?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ml?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const T=w+g+a,S=w+p+o,M=xc(r,r.VERTEX_SHADER,T),E=xc(r,r.FRAGMENT_SHADER,S);r.attachShader(_,M),r.attachShader(_,E),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function C(N){if(n.debug.checkShaderErrors){const B=r.getProgramInfoLog(_)||"",$=r.getShaderInfoLog(M)||"",O=r.getShaderInfoLog(E)||"",H=B.trim(),Q=$.trim(),b=O.trim();let R=!0,I=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(R=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,M,E);else{const G=Sc(r,M,"vertex"),Y=Sc(r,E,"fragment");et("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+H+`
`+G+`
`+Y)}else H!==""?Fe("WebGLProgram: Program Info Log:",H):(Q===""||b==="")&&(I=!1);I&&(N.diagnostics={runnable:R,programLog:H,vertexShader:{log:Q,prefix:g},fragmentShader:{log:b,prefix:p}})}r.deleteShader(M),r.deleteShader(E),x=new us(r,_),k=$0(r,_)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let k;this.getAttributes=function(){return k===void 0&&C(this),k};let z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=r.getProgramParameter(_,N0)),z},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=U0++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=M,this.fragmentShader=E,this}let lv=0;class cv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new uv(e),t.set(e,i)),i}}class uv{constructor(e){this.id=lv++,this.code=e,this.usedTimes=0}}function hv(n){return n===si||n===vs||n===_s}function dv(n,e,t,i,r,s){const a=new Ko,o=new cv,l=new Set,c=[],d=new Map,f=i.logarithmicDepthBuffer;let u=i.precision;const h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return l.add(x),x===0?"uv":`uv${x}`}function _(x,k,z,N,B,$){const O=N.fog,H=B.geometry,Q=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?N.environment:null,b=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,R=e.get(x.envMap||Q,b),I=R&&R.mapping===zs?R.image.height:null,G=h[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&Fe("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const Y=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,le=Y!==void 0?Y.length:0;let xe=0;H.morphAttributes.position!==void 0&&(xe=1),H.morphAttributes.normal!==void 0&&(xe=2),H.morphAttributes.color!==void 0&&(xe=3);let Xe,Ke,tt,j;if(G){const mt=gn[G];Xe=mt.vertexShader,Ke=mt.fragmentShader}else{Xe=x.vertexShader,Ke=x.fragmentShader;const mt=o.getVertexShaderStage(x),st=o.getFragmentShaderStage(x);o.update(x,mt,st),tt=mt.id,j=st.id}const ne=n.getRenderTarget(),be=n.state.buffers.depth.getReversed(),Ue=B.isInstancedMesh===!0,we=B.isBatchedMesh===!0,Oe=!!x.map,ot=!!x.matcap,ie=!!R,se=!!x.aoMap,ae=!!x.lightMap,oe=!!x.bumpMap&&x.wireframe===!1,he=!!x.normalMap,Ie=!!x.displacementMap,De=!!x.emissiveMap,Be=!!x.metalnessMap,Ve=!!x.roughnessMap,D=x.anisotropy>0,rt=x.clearcoat>0,Ze=x.dispersion>0,A=x.retroreflectivity>0,v=x.iridescence>0,V=x.sheen>0,q=x.transmission>0,Z=D&&!!x.anisotropyMap,ce=rt&&!!x.clearcoatMap,ue=rt&&!!x.clearcoatNormalMap,J=rt&&!!x.clearcoatRoughnessMap,te=v&&!!x.iridescenceMap,fe=v&&!!x.iridescenceThicknessMap,Pe=V&&!!x.sheenColorMap,ve=V&&!!x.sheenRoughnessMap,me=!!x.specularMap,ze=!!x.specularColorMap,Ne=!!x.specularIntensityMap,We=q&&!!x.transmissionMap,F=q&&!!x.thicknessMap,pe=!!x.gradientMap,ee=!!x.alphaMap,ge=x.alphaTest>0,Me=!!x.alphaHash,re=!!x.extensions;let Le=xn;x.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Le=n.toneMapping);const Re={shaderID:G,shaderType:x.type,shaderName:x.name,vertexShader:Xe,fragmentShader:Ke,defines:x.defines,customVertexShaderID:tt,customFragmentShaderID:j,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:we,batchingColor:we&&B._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&B.instanceColor!==null,instancingMorph:Ue&&B.morphTexture!==null,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:je.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Oe,matcap:ot,envMap:ie,envMapMode:ie&&R.mapping,envMapCubeUVHeight:I,aoMap:se,lightMap:ae,bumpMap:oe,normalMap:he,displacementMap:Ie,emissiveMap:De,normalMapObjectSpace:he&&x.normalMapType===ld,normalMapTangentSpace:he&&x.normalMapType===yo,packedNormalMap:he&&x.normalMapType===yo&&hv(x.normalMap.format),metalnessMap:Be,roughnessMap:Ve,anisotropy:D,anisotropyMap:Z,clearcoat:rt,clearcoatMap:ce,clearcoatNormalMap:ue,clearcoatRoughnessMap:J,dispersion:Ze,retroreflection:A,iridescence:v,iridescenceMap:te,iridescenceThicknessMap:fe,sheen:V,sheenColorMap:Pe,sheenRoughnessMap:ve,specularMap:me,specularColorMap:ze,specularIntensityMap:Ne,transmission:q,transmissionMap:We,thicknessMap:F,gradientMap:pe,opaque:x.transparent===!1&&x.blending===nr&&x.alphaToCoverage===!1,alphaMap:ee,alphaTest:ge,alphaHash:Me,combine:x.combine,mapUv:Oe&&m(x.map.channel),aoMapUv:se&&m(x.aoMap.channel),lightMapUv:ae&&m(x.lightMap.channel),bumpMapUv:oe&&m(x.bumpMap.channel),normalMapUv:he&&m(x.normalMap.channel),displacementMapUv:Ie&&m(x.displacementMap.channel),emissiveMapUv:De&&m(x.emissiveMap.channel),metalnessMapUv:Be&&m(x.metalnessMap.channel),roughnessMapUv:Ve&&m(x.roughnessMap.channel),anisotropyMapUv:Z&&m(x.anisotropyMap.channel),clearcoatMapUv:ce&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:ue&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:ve&&m(x.sheenRoughnessMap.channel),specularMapUv:me&&m(x.specularMap.channel),specularColorMapUv:ze&&m(x.specularColorMap.channel),specularIntensityMapUv:Ne&&m(x.specularIntensityMap.channel),transmissionMapUv:We&&m(x.transmissionMap.channel),thicknessMapUv:F&&m(x.thicknessMap.channel),alphaMapUv:ee&&m(x.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(he||D),vertexNormals:!!H.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!H.attributes.uv&&(Oe||ee),fog:!!O,useFog:x.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||H.attributes.normal===void 0&&he===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:be,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:xe,numSunLights:k.sun.length,numDirLights:k.directional.length,numPointLights:k.point.length,numSpotLights:k.spot.length,numSpotLightMaps:k.spotLightMap.length,numRectAreaLights:k.rectArea.length,numHemiLights:k.hemi.length,numSunLightShadows:k.sunShadowMap.length,numDirLightShadows:k.directionalShadowMap.length,numPointLightShadows:k.pointShadowMap.length,numSpotLightShadows:k.spotShadowMap.length,numSpotLightShadowsWithMaps:k.numSpotLightShadowsWithMaps,numLightProbes:k.numLightProbes,numLightProbeGrids:$.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&z.length>0,shadowMapType:n.shadowMap.type,toneMapping:Le,decodeVideoTexture:Oe&&x.map.isVideoTexture===!0&&je.getTransfer(x.map.colorSpace)===lt,decodeVideoTextureEmissive:De&&x.emissiveMap.isVideoTexture===!0&&je.getTransfer(x.emissiveMap.colorSpace)===lt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===en,flipSided:x.side===Ht,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:re&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&x.extensions.multiDraw===!0||we)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Re.vertexUv1s=l.has(1),Re.vertexUv2s=l.has(2),Re.vertexUv3s=l.has(3),l.clear(),Re}function g(x){const k=[];if(x.shaderID?k.push(x.shaderID):(k.push(x.customVertexShaderID),k.push(x.customFragmentShaderID)),x.defines!==void 0)for(const z in x.defines)k.push(z),k.push(x.defines[z]);return x.isRawShaderMaterial===!1&&(p(k,x),w(k,x),k.push(n.outputColorSpace)),k.push(x.customProgramCacheKey),k.join()}function p(x,k){x.push(k.precision),x.push(k.outputColorSpace),x.push(k.envMapMode),x.push(k.envMapCubeUVHeight),x.push(k.mapUv),x.push(k.alphaMapUv),x.push(k.lightMapUv),x.push(k.aoMapUv),x.push(k.bumpMapUv),x.push(k.normalMapUv),x.push(k.displacementMapUv),x.push(k.emissiveMapUv),x.push(k.metalnessMapUv),x.push(k.roughnessMapUv),x.push(k.anisotropyMapUv),x.push(k.clearcoatMapUv),x.push(k.clearcoatNormalMapUv),x.push(k.clearcoatRoughnessMapUv),x.push(k.iridescenceMapUv),x.push(k.iridescenceThicknessMapUv),x.push(k.sheenColorMapUv),x.push(k.sheenRoughnessMapUv),x.push(k.specularMapUv),x.push(k.specularColorMapUv),x.push(k.specularIntensityMapUv),x.push(k.transmissionMapUv),x.push(k.thicknessMapUv),x.push(k.combine),x.push(k.fogExp2),x.push(k.sizeAttenuation),x.push(k.morphTargetsCount),x.push(k.morphAttributeCount),x.push(k.numSunLights),x.push(k.numDirLights),x.push(k.numPointLights),x.push(k.numSpotLights),x.push(k.numSpotLightMaps),x.push(k.numHemiLights),x.push(k.numRectAreaLights),x.push(k.numSunLightShadows),x.push(k.numDirLightShadows),x.push(k.numPointLightShadows),x.push(k.numSpotLightShadows),x.push(k.numSpotLightShadowsWithMaps),x.push(k.numLightProbes),x.push(k.shadowMapType),x.push(k.toneMapping),x.push(k.numClippingPlanes),x.push(k.numClipIntersection),x.push(k.depthPacking)}function w(x,k){a.disableAll(),k.instancing&&a.enable(0),k.instancingColor&&a.enable(1),k.instancingMorph&&a.enable(2),k.matcap&&a.enable(3),k.envMap&&a.enable(4),k.normalMapObjectSpace&&a.enable(5),k.normalMapTangentSpace&&a.enable(6),k.clearcoat&&a.enable(7),k.iridescence&&a.enable(8),k.alphaTest&&a.enable(9),k.vertexColors&&a.enable(10),k.vertexAlphas&&a.enable(11),k.vertexUv1s&&a.enable(12),k.vertexUv2s&&a.enable(13),k.vertexUv3s&&a.enable(14),k.vertexTangents&&a.enable(15),k.anisotropy&&a.enable(16),k.alphaHash&&a.enable(17),k.batching&&a.enable(18),k.dispersion&&a.enable(19),k.retroreflection&&a.enable(24),k.batchingColor&&a.enable(20),k.gradientMap&&a.enable(21),k.packedNormalMap&&a.enable(22),k.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),k.fog&&a.enable(0),k.useFog&&a.enable(1),k.flatShading&&a.enable(2),k.logarithmicDepthBuffer&&a.enable(3),k.reversedDepthBuffer&&a.enable(4),k.skinning&&a.enable(5),k.morphTargets&&a.enable(6),k.morphNormals&&a.enable(7),k.morphColors&&a.enable(8),k.premultipliedAlpha&&a.enable(9),k.shadowMapEnabled&&a.enable(10),k.doubleSided&&a.enable(11),k.flipSided&&a.enable(12),k.useDepthPacking&&a.enable(13),k.dithering&&a.enable(14),k.transmission&&a.enable(15),k.sheen&&a.enable(16),k.opaque&&a.enable(17),k.pointsUvs&&a.enable(18),k.decodeVideoTexture&&a.enable(19),k.decodeVideoTextureEmissive&&a.enable(20),k.alphaToCoverage&&a.enable(21),k.numLightProbeGrids>0&&a.enable(22),k.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function T(x){const k=h[x.type];let z;if(k){const N=gn[k];z=Cf.clone(N.uniforms)}else z=x.uniforms;return z}function S(x,k){let z=d.get(k);return z!==void 0?++z.usedTimes:(z=new ov(n,k,x,r),c.push(z),d.set(k,z)),z}function M(x){if(--x.usedTimes===0){const k=c.indexOf(x);c[k]=c[c.length-1],c.pop(),d.delete(x.cacheKey),x.destroy()}}function E(x){o.remove(x)}function C(){o.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:T,acquireProgram:S,releaseProgram:M,releaseShaderCache:E,programs:c,dispose:C}}function fv(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function mv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Ac(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Tc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(u){let h=0;return u.isInstancedMesh&&(h+=2),u.isSkinnedMesh&&(h+=1),h}function o(u,h,m,_,g,p){let w=n[e];return w===void 0?(w={id:u.id,object:u,geometry:h,material:m,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:g,group:p},n[e]=w):(w.id=u.id,w.object=u,w.geometry=h,w.material=m,w.materialVariant=a(u),w.groupOrder=_,w.renderOrder=u.renderOrder,w.z=g,w.group=p),e++,w}function l(u,h,m,_,g,p,w){w.reversedDepth===!0&&(g=-g);const T=o(u,h,m,_,g,p);m.transmission>0?i.push(T):m.transparent===!0?r.push(T):t.push(T)}function c(u,h,m,_,g,p){const w=o(u,h,m,_,g,p);m.transmission>0?i.unshift(w):m.transparent===!0?r.unshift(w):t.unshift(w)}function d(u,h){t.length>1&&t.sort(u||mv),i.length>1&&i.sort(h||Ac),r.length>1&&r.sort(h||Ac)}function f(){for(let u=e,h=n.length;u<h;u++){const m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:f,sort:d}}function pv(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Tc,n.set(i,[a])):r>=s.length?(a=new Tc,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function gv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new L,color:new Ge};break;case"SpotLight":t={position:new L,direction:new L,color:new Ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ge,groundColor:new Ge};break;case"RectAreaLight":t={color:new Ge,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function vv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let _v=0;function xv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function bv(n){const e=new gv,t=vv(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const r=new L,s=new ft,a=new ft;function o(c){let d=0,f=0,u=0;for(let B=0;B<9;B++)i.probe[B].set(0,0,0);let h=0,m=0,_=0,g=0,p=0,w=0,T=0,S=0,M=0,E=0,C=0,x=0,k=0,z=0;c.sort(xv);for(let B=0,$=c.length;B<$;B++){const O=c[B],H=O.color,Q=O.intensity,b=O.distance;let R=null;if(O.shadow&&O.shadow.map&&(O.shadow.map.texture.format===si?R=O.shadow.map.texture:R=O.shadow.map.depthTexture||O.shadow.map.texture),O.isAmbientLight)d+=H.r*Q,f+=H.g*Q,u+=H.b*Q;else if(O.isLightProbe){for(let I=0;I<9;I++)i.probe[I].addScaledVector(O.sh.coefficients[I],Q);z++}else if(O.isSunLight){const I=e.get(O);if(I.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const G=O.shadow,Y=t.get(O);Y.shadowIntensity=G.intensity,Y.shadowBias=G.bias,Y.shadowNormalBias=G.normalBias,Y.shadowRadius=G.radius,Y.shadowMapSize.copy(G.mapSize).multiply(G.getFrameExtents()),i.sunShadow[m]=Y,i.sunShadowMap[m]=R;const le=G.getViewportCount();for(let xe=0;xe<le;xe++)i.sunShadowMatrix[_+xe]=G.getMatrix(xe),i.sunShadowCascade[_+xe]=G._cascadeData[xe];_+=le,m++}i.sun[h]=I,h++}else if(O.isDirectionalLight){const I=e.get(O);if(I.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const G=O.shadow,Y=t.get(O);Y.shadowIntensity=G.intensity,Y.shadowBias=G.bias,Y.shadowNormalBias=G.normalBias,Y.shadowRadius=G.radius,Y.shadowMapSize=G.mapSize,i.directionalShadow[g]=Y,i.directionalShadowMap[g]=R,i.directionalShadowMatrix[g]=O.shadow.matrix,M++}i.directional[g]=I,g++}else if(O.isSpotLight){const I=e.get(O);I.position.setFromMatrixPosition(O.matrixWorld),I.color.copy(H).multiplyScalar(Q),I.distance=b,I.coneCos=Math.cos(O.angle),I.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),I.decay=O.decay,i.spot[w]=I;const G=O.shadow;if(O.map&&(i.spotLightMap[x]=O.map,x++,G.updateMatrices(O),O.castShadow&&k++),i.spotLightMatrix[w]=G.matrix,O.castShadow){const Y=t.get(O);Y.shadowIntensity=G.intensity,Y.shadowBias=G.bias,Y.shadowNormalBias=G.normalBias,Y.shadowRadius=G.radius,Y.shadowMapSize=G.mapSize,i.spotShadow[w]=Y,i.spotShadowMap[w]=R,C++}w++}else if(O.isRectAreaLight){const I=e.get(O);I.color.copy(H).multiplyScalar(Q),I.halfWidth.set(O.width*.5,0,0),I.halfHeight.set(0,O.height*.5,0),i.rectArea[T]=I,T++}else if(O.isPointLight){const I=e.get(O);if(I.color.copy(O.color).multiplyScalar(O.intensity),I.distance=O.distance,I.decay=O.decay,O.castShadow){const G=O.shadow,Y=t.get(O);Y.shadowIntensity=G.intensity,Y.shadowBias=G.bias,Y.shadowNormalBias=G.normalBias,Y.shadowRadius=G.radius,Y.shadowMapSize=G.mapSize,Y.shadowCameraNear=G.camera.near,Y.shadowCameraFar=G.camera.far,i.pointShadow[p]=Y,i.pointShadowMap[p]=R,i.pointShadowMatrix[p]=O.shadow.matrix,E++}i.point[p]=I,p++}else if(O.isHemisphereLight){const I=e.get(O);I.skyColor.copy(O.color).multiplyScalar(Q),I.groundColor.copy(O.groundColor).multiplyScalar(Q),i.hemi[S]=I,S++}}T>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_e.LTC_FLOAT_1,i.rectAreaLTC2=_e.LTC_FLOAT_2):(i.rectAreaLTC1=_e.LTC_HALF_1,i.rectAreaLTC2=_e.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=u;const N=i.hash;(N.sunLength!==h||N.directionalLength!==g||N.pointLength!==p||N.spotLength!==w||N.rectAreaLength!==T||N.hemiLength!==S||N.numSunShadows!==m||N.numDirectionalShadows!==M||N.numPointShadows!==E||N.numSpotShadows!==C||N.numSpotMaps!==x||N.numLightProbes!==z)&&(i.sun.length=h,i.directional.length=g,i.spot.length=w,i.rectArea.length=T,i.point.length=p,i.hemi.length=S,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=_,i.sunShadowCascade.length=_,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.directionalShadowMatrix.length=M,i.pointShadow.length=E,i.pointShadowMap.length=E,i.pointShadowMatrix.length=E,i.spotShadow.length=C,i.spotShadowMap.length=C,i.spotLightMatrix.length=C+x-k,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=k,i.numLightProbes=z,N.sunLength=h,N.directionalLength=g,N.pointLength=p,N.spotLength=w,N.rectAreaLength=T,N.hemiLength=S,N.numSunShadows=m,N.numDirectionalShadows=M,N.numPointShadows=E,N.numSpotShadows=C,N.numSpotMaps=x,N.numLightProbes=z,i.version=_v++)}function l(c,d){let f=0,u=0,h=0,m=0,_=0,g=0;const p=d.matrixWorldInverse;for(let w=0,T=c.length;w<T;w++){const S=c[w];if(S.isSunLight){const M=i.sun[f];M.direction.setFromMatrixPosition(S.matrixWorld),M.direction.transformDirection(p),f++}else if(S.isDirectionalLight){const M=i.directional[u];M.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(p),u++}else if(S.isSpotLight){const M=i.spot[m];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(p),m++}else if(S.isRectAreaLight){const M=i.rectArea[_];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(p),a.identity(),s.copy(S.matrixWorld),s.premultiply(p),a.extractRotation(s),M.halfWidth.set(S.width*.5,0,0),M.halfHeight.set(0,S.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),_++}else if(S.isPointLight){const M=i.point[h];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(p),h++}else if(S.isHemisphereLight){const M=i.hemi[g];M.direction.setFromMatrixPosition(S.matrixWorld),M.direction.transformDirection(p),g++}}}return{setup:o,setupView:l,state:i}}function kc(n){const e=new bv(n),t=[],i=[],r=[];function s(u){f.camera=u,t.length=0,i.length=0,r.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function l(u){r.push(u)}function c(){e.setup(t)}function d(u){e.setupView(t,u)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Sv(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new kc(n),e.set(r,[o])):s>=a.length?(o=new kc(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const yv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Mv=`uniform sampler2D shadow_pass;
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
}`,wv=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],Ev=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],Rc=new ft,Ji=new L,wa=new L;function Av(n,e,t){let i=new Zo;const r=new de,s=new de,a=new xt,o=new If,l=new Nf,c={},d=t.maxTextureSize,f={[Xn]:Ht,[Ht]:Xn,[en]:en},u=new yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:yv,fragmentShader:Mv}),h=u.clone();h.defines.HORIZONTAL_PASS=1;const m=new At;m.setAttribute("position",new zn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new nn(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=rs;let p=this.type;this.render=function(E,C,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;this.type===Oh&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=rs);const k=n.getRenderTarget(),z=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),B=n.state;B.setBlending(Cn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const $=p!==this.type;$&&C.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(H=>H.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,H=E.length;O<H;O++){const Q=E[O],b=Q.shadow;if(b===void 0){Fe("WebGLShadowMap:",Q,"has no shadow.");continue}if(b.autoUpdate===!1&&b.needsUpdate===!1)continue;r.copy(b.mapSize);const R=b.getFrameExtents();r.multiply(R),s.copy(b.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/R.x),r.x=s.x*R.x,b.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/R.y),r.y=s.y*R.y,b.mapSize.y=s.y));const I=n.state.buffers.depth.getReversed();if(b.camera._reversedDepth=I,b.map===null||$===!0){if(b.map!==null&&(b.map.depthTexture!==null&&(b.map.depthTexture.dispose(),b.map.depthTexture=null),b.map.dispose()),this.type===Qi){if(Q.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}b.map=new cn(r.x,r.y,{format:si,type:Sn,minFilter:Ut,magFilter:Ut,generateMipmaps:!1}),b.map.texture.name=Q.name+".shadowMap",b.map.depthTexture=new pr(r.x,r.y,vn),b.map.depthTexture.name=Q.name+".shadowMapDepth",b.map.depthTexture.format=Ln,b.map.depthTexture.compareFunction=null,b.map.depthTexture.minFilter=Pt,b.map.depthTexture.magFilter=Pt}else Q.isPointLight?(b.map=new Vu(r.x),b.map.depthTexture=new qd(r.x,bn)):(b.map=new cn(r.x,r.y),b.map.depthTexture=new pr(r.x,r.y,bn)),b.map.depthTexture.name=Q.name+".shadowMap",b.map.depthTexture.format=Ln,this.type===rs?(b.map.depthTexture.compareFunction=I?qo:$o,b.map.depthTexture.minFilter=Ut,b.map.depthTexture.magFilter=Ut):(b.map.depthTexture.compareFunction=null,b.map.depthTexture.minFilter=Pt,b.map.depthTexture.magFilter=Pt);b.camera.updateProjectionMatrix()}b.map.isWebGLCubeRenderTarget!==!0&&(b.map.width!==r.x||b.map.height!==r.y)&&b.map.setSize(r.x,r.y);const G=b.map.isWebGLCubeRenderTarget?6:b.getViewportCount();Q.isPointLight!==!0&&b.updateMatrices(Q,x);for(let Y=0;Y<G;Y++){const le=b.getCamera(Y);if(Q.isPointLight){const xe=b.camera,Xe=b.matrix,Ke=Q.distance||xe.far;Ke!==xe.far&&(xe.far=Ke,xe.updateProjectionMatrix()),Ji.setFromMatrixPosition(Q.matrixWorld),xe.position.copy(Ji),wa.copy(xe.position),wa.add(wv[Y]),xe.up.copy(Ev[Y]),xe.lookAt(wa),xe.updateMatrixWorld(),Xe.makeTranslation(-Ji.x,-Ji.y,-Ji.z),Rc.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),b._frustum.setFromProjectionMatrix(Rc,xe.coordinateSystem,xe.reversedDepth)}if(b.map.isWebGLCubeRenderTarget)n.setRenderTarget(b.map,Y),n.clear();else{Y===0&&(n.setRenderTarget(b.map),n.clear());const xe=b.getViewport(Y);a.set(s.x*xe.x,s.y*xe.y,s.x*xe.z,s.y*xe.w),B.viewport(a)}i=b.getFrustum(Y),S(C,x,le,Q,this.type)}b.isPointLightShadow!==!0&&this.type===Qi&&w(b,x),b.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(k,z,N)};function w(E,C){const x=e.update(_);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,h.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,h.needsUpdate=!0),E.mapPass===null?E.mapPass=new cn(r.x,r.y,{format:si,type:Sn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(C,null,x,u,_,null),h.uniforms.shadow_pass.value=E.mapPass.texture,h.uniforms.resolution.value.set(E.map.width,E.map.height),h.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(C,null,x,h,_,null)}function T(E,C,x,k){let z=null;const N=x.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(N!==void 0)z=N;else if(z=x.isPointLight===!0?l:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const B=z.uuid,$=C.uuid;let O=c[B];O===void 0&&(O={},c[B]=O);let H=O[$];H===void 0&&(H=z.clone(),O[$]=H,C.addEventListener("dispose",M)),z=H}if(z.visible=C.visible,z.wireframe=C.wireframe,k===Qi?z.side=C.shadowSide!==null?C.shadowSide:C.side:z.side=C.shadowSide!==null?C.shadowSide:f[C.side],z.alphaMap=C.alphaMap,z.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,z.map=C.map,z.clipShadows=C.clipShadows,z.clippingPlanes=C.clippingPlanes,z.clipIntersection=C.clipIntersection,z.displacementMap=C.displacementMap,z.displacementScale=C.displacementScale,z.displacementBias=C.displacementBias,z.wireframeLinewidth=C.wireframeLinewidth,z.linewidth=C.linewidth,x.isPointLight===!0&&z.isMeshDistanceMaterial===!0){const B=n.properties.get(z);B.light=x}return z}function S(E,C,x,k,z){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&z===Qi)&&(!E.frustumCulled||E.intersectsFrustum(i))){E.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,E.matrixWorld);const $=e.update(E),O=E.material;if(Array.isArray(O)){const H=$.groups;for(let Q=0,b=H.length;Q<b;Q++){const R=H[Q],I=O[R.materialIndex];if(I&&I.visible){const G=T(E,I,k,z);E.onBeforeShadow(n,E,C,x,$,G,R),n.renderBufferDirect(x,null,$,G,E,R),E.onAfterShadow(n,E,C,x,$,G,R)}}}else if(O.visible){const H=T(E,O,k,z);E.onBeforeShadow(n,E,C,x,$,H,null),n.renderBufferDirect(x,null,$,H,E,null),E.onAfterShadow(n,E,C,x,$,H,null)}}const B=E.children;for(let $=0,O=B.length;$<O;$++)S(B[$],C,x,k,z)}function M(E){E.target.removeEventListener("dispose",M);for(const x in c){const k=c[x],z=E.target.uuid;z in k&&(k[z].dispose(),delete k[z])}}}function Tv(n,e){function t(){let F=!1;const pe=new xt;let ee=null;const ge=new xt(0,0,0,0);return{setMask:function(Me){ee!==Me&&!F&&(n.colorMask(Me,Me,Me,Me),ee=Me)},setLocked:function(Me){F=Me},setClear:function(Me,re,Le,Re,mt){mt===!0&&(Me*=Re,re*=Re,Le*=Re),pe.set(Me,re,Le,Re),ge.equals(pe)===!1&&(n.clearColor(Me,re,Le,Re),ge.copy(pe))},reset:function(){F=!1,ee=null,ge.set(-1,0,0,0)}}}function i(){let F=!1,pe=!1,ee=null,ge=null,Me=null;return{setReversed:function(re){if(pe!==re){const Le=e.get("EXT_clip_control");re?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),pe=re;const Re=Me;Me=null,this.setClear(Re)}},getReversed:function(){return pe},setTest:function(re){re?ne(n.DEPTH_TEST):be(n.DEPTH_TEST)},setMask:function(re){ee!==re&&!F&&(n.depthMask(re),ee=re)},setFunc:function(re){if(pe&&(re=bd[re]),ge!==re){switch(re){case Na:n.depthFunc(n.NEVER);break;case Ua:n.depthFunc(n.ALWAYS);break;case Fa:n.depthFunc(n.LESS);break;case hr:n.depthFunc(n.LEQUAL);break;case Oa:n.depthFunc(n.EQUAL);break;case Ba:n.depthFunc(n.GEQUAL);break;case Va:n.depthFunc(n.GREATER);break;case Ha:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ge=re}},setLocked:function(re){F=re},setClear:function(re){Me!==re&&(Me=re,pe&&(re=1-re),n.clearDepth(re))},reset:function(){F=!1,ee=null,ge=null,Me=null,pe=!1}}}function r(){let F=!1,pe=null,ee=null,ge=null,Me=null,re=null,Le=null,Re=null,mt=null;return{setTest:function(st){F||(st?ne(n.STENCIL_TEST):be(n.STENCIL_TEST))},setMask:function(st){pe!==st&&!F&&(n.stencilMask(st),pe=st)},setFunc:function(st,rn,un){(ee!==st||ge!==rn||Me!==un)&&(n.stencilFunc(st,rn,un),ee=st,ge=rn,Me=un)},setOp:function(st,rn,un){(re!==st||Le!==rn||Re!==un)&&(n.stencilOp(st,rn,un),re=st,Le=rn,Re=un)},setLocked:function(st){F=st},setClear:function(st){mt!==st&&(n.clearStencil(st),mt=st)},reset:function(){F=!1,pe=null,ee=null,ge=null,Me=null,re=null,Le=null,Re=null,mt=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let d={},f={},u={},h=new WeakMap,m=[],_=null,g=!1,p=null,w=null,T=null,S=null,M=null,E=null,C=null,x=new Ge(0,0,0),k=0,z=!1,N=null,B=null,$=null,O=null,H=null;const Q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let b=!1,R=0;const I=n.getParameter(n.VERSION);I.indexOf("WebGL")!==-1?(R=parseFloat(/^WebGL (\d)/.exec(I)[1]),b=R>=1):I.indexOf("OpenGL ES")!==-1&&(R=parseFloat(/^OpenGL ES (\d)/.exec(I)[1]),b=R>=2);let G=null,Y={};const le=n.getParameter(n.SCISSOR_BOX),xe=n.getParameter(n.VIEWPORT),Xe=new xt().fromArray(le),Ke=new xt().fromArray(xe);function tt(F,pe,ee,ge){const Me=new Uint8Array(4),re=n.createTexture();n.bindTexture(F,re),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Le=0;Le<ee;Le++)F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?n.texImage3D(pe,0,n.RGBA,1,1,ge,0,n.RGBA,n.UNSIGNED_BYTE,Me):n.texImage2D(pe+Le,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Me);return re}const j={};j[n.TEXTURE_2D]=tt(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=tt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=tt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=tt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(n.DEPTH_TEST),a.setFunc(hr),oe(!1),he(xl),ne(n.CULL_FACE),se(Cn);function ne(F){d[F]!==!0&&(n.enable(F),d[F]=!0)}function be(F){d[F]!==!1&&(n.disable(F),d[F]=!1)}function Ue(F,pe){return u[F]!==pe?(n.bindFramebuffer(F,pe),u[F]=pe,F===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=pe),F===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=pe),!0):!1}function we(F,pe){let ee=m,ge=!1;if(F){ee=h.get(pe),ee===void 0&&(ee=[],h.set(pe,ee));const Me=F.textures;if(ee.length!==Me.length||ee[0]!==n.COLOR_ATTACHMENT0){for(let re=0,Le=Me.length;re<Le;re++)ee[re]=n.COLOR_ATTACHMENT0+re;ee.length=Me.length,ge=!0}}else ee[0]!==n.BACK&&(ee[0]=n.BACK,ge=!0);ge&&n.drawBuffers(ee)}function Oe(F){return _!==F?(n.useProgram(F),_=F,!0):!1}const ot={[Ai]:n.FUNC_ADD,[Vh]:n.FUNC_SUBTRACT,[Hh]:n.FUNC_REVERSE_SUBTRACT};ot[Gh]=n.MIN,ot[Wh]=n.MAX;const ie={[Xh]:n.ZERO,[$h]:n.ONE,[qh]:n.SRC_COLOR,[nu]:n.SRC_ALPHA,[jh]:n.SRC_ALPHA_SATURATE,[Jh]:n.DST_COLOR,[Kh]:n.DST_ALPHA,[Yh]:n.ONE_MINUS_SRC_COLOR,[iu]:n.ONE_MINUS_SRC_ALPHA,[Qh]:n.ONE_MINUS_DST_COLOR,[Zh]:n.ONE_MINUS_DST_ALPHA,[ed]:n.CONSTANT_COLOR,[td]:n.ONE_MINUS_CONSTANT_COLOR,[nd]:n.CONSTANT_ALPHA,[id]:n.ONE_MINUS_CONSTANT_ALPHA};function se(F,pe,ee,ge,Me,re,Le,Re,mt,st){if(F===Cn){g===!0&&(be(n.BLEND),g=!1);return}if(g===!1&&(ne(n.BLEND),g=!0),F!==Bh){if(F!==p||st!==z){if((w!==Ai||M!==Ai)&&(n.blendEquation(n.FUNC_ADD),w=Ai,M=Ai),st)switch(F){case nr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case bl:n.blendFunc(n.ONE,n.ONE);break;case Sl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case yl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:et("WebGLState: Invalid blending: ",F);break}else switch(F){case nr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case bl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Sl:et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case yl:et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:et("WebGLState: Invalid blending: ",F);break}T=null,S=null,E=null,C=null,x.set(0,0,0),k=0,p=F,z=st}return}Me=Me||pe,re=re||ee,Le=Le||ge,(pe!==w||Me!==M)&&(n.blendEquationSeparate(ot[pe],ot[Me]),w=pe,M=Me),(ee!==T||ge!==S||re!==E||Le!==C)&&(n.blendFuncSeparate(ie[ee],ie[ge],ie[re],ie[Le]),T=ee,S=ge,E=re,C=Le),(Re.equals(x)===!1||mt!==k)&&(n.blendColor(Re.r,Re.g,Re.b,mt),x.copy(Re),k=mt),p=F,z=!1}function ae(F,pe){F.side===en?be(n.CULL_FACE):ne(n.CULL_FACE);let ee=F.side===Ht;pe&&(ee=!ee),oe(ee),F.blending===nr&&F.transparent===!1?se(Cn):se(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),s.setMask(F.colorWrite);const ge=F.stencilWrite;o.setTest(ge),ge&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),De(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):be(n.SAMPLE_ALPHA_TO_COVERAGE)}function oe(F){N!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),N=F)}function he(F){F!==Uh?(ne(n.CULL_FACE),F!==B&&(F===xl?n.cullFace(n.BACK):F===Fh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):be(n.CULL_FACE),B=F}function Ie(F){F!==$&&(b&&n.lineWidth(F),$=F)}function De(F,pe,ee){F?(ne(n.POLYGON_OFFSET_FILL),(O!==pe||H!==ee)&&(O=pe,H=ee,a.getReversed()&&(pe=-pe),n.polygonOffset(pe,ee))):be(n.POLYGON_OFFSET_FILL)}function Be(F){F?ne(n.SCISSOR_TEST):be(n.SCISSOR_TEST)}function Ve(F){F===void 0&&(F=n.TEXTURE0+Q-1),G!==F&&(n.activeTexture(F),G=F)}function D(F,pe,ee){ee===void 0&&(G===null?ee=n.TEXTURE0+Q-1:ee=G);let ge=Y[ee];ge===void 0&&(ge={type:void 0,texture:void 0},Y[ee]=ge),(ge.type!==F||ge.texture!==pe)&&(G!==ee&&(n.activeTexture(ee),G=ee),n.bindTexture(F,pe||j[F]),ge.type=F,ge.texture=pe)}function rt(){const F=Y[G];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function Ze(){try{n.compressedTexImage2D(...arguments)}catch(F){et("WebGLState:",F)}}function A(){try{n.compressedTexImage3D(...arguments)}catch(F){et("WebGLState:",F)}}function v(){try{n.texSubImage2D(...arguments)}catch(F){et("WebGLState:",F)}}function V(){try{n.texSubImage3D(...arguments)}catch(F){et("WebGLState:",F)}}function q(){try{n.compressedTexSubImage2D(...arguments)}catch(F){et("WebGLState:",F)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(F){et("WebGLState:",F)}}function ce(){try{n.texStorage2D(...arguments)}catch(F){et("WebGLState:",F)}}function ue(){try{n.texStorage3D(...arguments)}catch(F){et("WebGLState:",F)}}function J(){try{n.texImage2D(...arguments)}catch(F){et("WebGLState:",F)}}function te(){try{n.texImage3D(...arguments)}catch(F){et("WebGLState:",F)}}function fe(F){return f[F]!==void 0?f[F]:n.getParameter(F)}function Pe(F,pe){f[F]!==pe&&(n.pixelStorei(F,pe),f[F]=pe)}function ve(F){Xe.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),Xe.copy(F))}function me(F){Ke.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),Ke.copy(F))}function ze(F,pe){let ee=c.get(pe);ee===void 0&&(ee=new WeakMap,c.set(pe,ee));let ge=ee.get(F);ge===void 0&&(ge=n.getUniformBlockIndex(pe,F.name),ee.set(F,ge))}function Ne(F,pe){const ge=c.get(pe).get(F);l.get(pe)!==ge&&(n.uniformBlockBinding(pe,ge,F.__bindingPointIndex),l.set(pe,ge))}function We(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},f={},G=null,Y={},u={},h=new WeakMap,m=[],_=null,g=!1,p=null,w=null,T=null,S=null,M=null,E=null,C=null,x=new Ge(0,0,0),k=0,z=!1,N=null,B=null,$=null,O=null,H=null,Xe.set(0,0,n.canvas.width,n.canvas.height),Ke.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ne,disable:be,bindFramebuffer:Ue,drawBuffers:we,useProgram:Oe,setBlending:se,setMaterial:ae,setFlipSided:oe,setCullFace:he,setLineWidth:Ie,setPolygonOffset:De,setScissorTest:Be,activeTexture:Ve,bindTexture:D,unbindTexture:rt,compressedTexImage2D:Ze,compressedTexImage3D:A,texImage2D:J,texImage3D:te,pixelStorei:Pe,getParameter:fe,updateUBOMapping:ze,uniformBlockBinding:Ne,texStorage2D:ce,texStorage3D:ue,texSubImage2D:v,texSubImage3D:V,compressedTexSubImage2D:q,compressedTexSubImage3D:Z,scissor:ve,viewport:me,reset:We}}function kv(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new de,d=new WeakMap,f=new Set;let u;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,v){return m?new OffscreenCanvas(A,v):Ss("canvas")}function g(A,v,V){let q=1;const Z=Ze(A);if((Z.width>V||Z.height>V)&&(q=V/Math.max(Z.width,Z.height)),q<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const ce=Math.floor(q*Z.width),ue=Math.floor(q*Z.height);u===void 0&&(u=_(ce,ue));const J=v?_(ce,ue):u;return J.width=ce,J.height=ue,J.getContext("2d").drawImage(A,0,0,ce,ue),Fe("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+ce+"x"+ue+")."),J}else return"data"in A&&Fe("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),A;return A}function p(A){return A.generateMipmaps}function w(A){n.generateMipmap(A)}function T(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(A,v,V,q,Z,ce=!1){if(A!==null){if(n[A]!==void 0)return n[A];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ue;q&&(ue=e.get("EXT_texture_norm16"),ue||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=v;if(v===n.RED&&(V===n.FLOAT&&(J=n.R32F),V===n.HALF_FLOAT&&(J=n.R16F),V===n.UNSIGNED_BYTE&&(J=n.R8),V===n.UNSIGNED_SHORT&&ue&&(J=ue.R16_EXT),V===n.SHORT&&ue&&(J=ue.R16_SNORM_EXT)),v===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(J=n.R8UI),V===n.UNSIGNED_SHORT&&(J=n.R16UI),V===n.UNSIGNED_INT&&(J=n.R32UI),V===n.BYTE&&(J=n.R8I),V===n.SHORT&&(J=n.R16I),V===n.INT&&(J=n.R32I)),v===n.RG&&(V===n.FLOAT&&(J=n.RG32F),V===n.HALF_FLOAT&&(J=n.RG16F),V===n.UNSIGNED_BYTE&&(J=n.RG8),V===n.UNSIGNED_SHORT&&ue&&(J=ue.RG16_EXT),V===n.SHORT&&ue&&(J=ue.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(J=n.RG8UI),V===n.UNSIGNED_SHORT&&(J=n.RG16UI),V===n.UNSIGNED_INT&&(J=n.RG32UI),V===n.BYTE&&(J=n.RG8I),V===n.SHORT&&(J=n.RG16I),V===n.INT&&(J=n.RG32I)),v===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(J=n.RGB8UI),V===n.UNSIGNED_SHORT&&(J=n.RGB16UI),V===n.UNSIGNED_INT&&(J=n.RGB32UI),V===n.BYTE&&(J=n.RGB8I),V===n.SHORT&&(J=n.RGB16I),V===n.INT&&(J=n.RGB32I)),v===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(J=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(J=n.RGBA16UI),V===n.UNSIGNED_INT&&(J=n.RGBA32UI),V===n.BYTE&&(J=n.RGBA8I),V===n.SHORT&&(J=n.RGBA16I),V===n.INT&&(J=n.RGBA32I)),v===n.RGB&&(V===n.UNSIGNED_SHORT&&ue&&(J=ue.RGB16_EXT),V===n.SHORT&&ue&&(J=ue.RGB16_SNORM_EXT),V===n.UNSIGNED_INT_5_9_9_9_REV&&(J=n.RGB9_E5),V===n.UNSIGNED_INT_10F_11F_11F_REV&&(J=n.R11F_G11F_B10F)),v===n.RGBA){const te=ce?bs:je.getTransfer(Z);V===n.FLOAT&&(J=n.RGBA32F),V===n.HALF_FLOAT&&(J=n.RGBA16F),V===n.UNSIGNED_BYTE&&(J=te===lt?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT&&ue&&(J=ue.RGBA16_EXT),V===n.SHORT&&ue&&(J=ue.RGBA16_SNORM_EXT),V===n.UNSIGNED_SHORT_4_4_4_4&&(J=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(J=n.RGB5_A1)}return(J===n.R16F||J===n.R32F||J===n.RG16F||J===n.RG32F||J===n.RGBA16F||J===n.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function M(A,v){let V;return A?v===null||v===bn||v===fr?V=n.DEPTH24_STENCIL8:v===vn?V=n.DEPTH32F_STENCIL8:v===dr&&(V=n.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===bn||v===fr?V=n.DEPTH_COMPONENT24:v===vn?V=n.DEPTH_COMPONENT32F:v===dr&&(V=n.DEPTH_COMPONENT16),V}function E(A,v){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Pt&&A.minFilter!==Ut?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function C(A){const v=A.target;v.removeEventListener("dispose",C),k(v),v.isVideoTexture&&d.delete(v),v.isHTMLTexture&&f.delete(v)}function x(A){const v=A.target;v.removeEventListener("dispose",x),N(v)}function k(A){const v=i.get(A);if(v.__webglInit===void 0)return;const V=A.source,q=h.get(V);if(q){const Z=q[v.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&z(A),Object.keys(q).length===0&&h.delete(V)}i.remove(A)}function z(A){const v=i.get(A);n.deleteTexture(v.__webglTexture);const V=A.source,q=h.get(V);delete q[v.__cacheKey],a.memory.textures--}function N(A){const v=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let Z=0;Z<v.__webglFramebuffer[q].length;Z++)n.deleteFramebuffer(v.__webglFramebuffer[q][Z]);else n.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)n.deleteFramebuffer(v.__webglFramebuffer[q]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const V=A.textures;for(let q=0,Z=V.length;q<Z;q++){const ce=i.get(V[q]);ce.__webglTexture&&(n.deleteTexture(ce.__webglTexture),a.memory.textures--),i.remove(V[q])}i.remove(A)}let B=0;function $(){B=0}function O(){return B}function H(A){B=A}function Q(){const A=B;return A>=r.maxTextures&&Fe("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+r.maxTextures),B+=1,A}function b(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function R(A,v){const V=i.get(A);if(A.isVideoTexture&&D(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&V.__version!==A.version){const q=A.image;if(q===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{be(V,A,v);return}}else A.isExternalTexture&&(V.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+v)}function I(A,v){const V=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){be(V,A,v);return}else A.isExternalTexture&&(V.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+v)}function G(A,v){const V=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){be(V,A,v);return}t.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+v)}function Y(A,v){const V=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&V.__version!==A.version){Ue(V,A,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+v)}const le={[Ga]:n.REPEAT,[Rn]:n.CLAMP_TO_EDGE,[Wa]:n.MIRRORED_REPEAT},xe={[Pt]:n.NEAREST,[ad]:n.NEAREST_MIPMAP_NEAREST,[Tr]:n.NEAREST_MIPMAP_LINEAR,[Ut]:n.LINEAR,[Gs]:n.LINEAR_MIPMAP_NEAREST,[ti]:n.LINEAR_MIPMAP_LINEAR},Xe={[ud]:n.NEVER,[pd]:n.ALWAYS,[hd]:n.LESS,[$o]:n.LEQUAL,[dd]:n.EQUAL,[qo]:n.GEQUAL,[fd]:n.GREATER,[md]:n.NOTEQUAL};function Ke(A,v){if(v.type===vn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Ut||v.magFilter===Gs||v.magFilter===Tr||v.magFilter===ti||v.minFilter===Ut||v.minFilter===Gs||v.minFilter===Tr||v.minFilter===ti)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,le[v.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,le[v.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,le[v.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,xe[v.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,xe[v.minFilter]),v.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,Xe[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Pt||v.minFilter!==Tr&&v.minFilter!==ti||v.type===vn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function tt(A,v){let V=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",C));const q=v.source;let Z=h.get(q);Z===void 0&&(Z={},h.set(q,Z));const ce=b(v);if(ce!==A.__cacheKey){Z[ce]===void 0&&(Z[ce]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,V=!0),Z[ce].usedTimes++;const ue=Z[A.__cacheKey];ue!==void 0&&(Z[A.__cacheKey].usedTimes--,ue.usedTimes===0&&z(v)),A.__cacheKey=ce,A.__webglTexture=Z[ce].texture}return V}function j(A,v,V){return Math.floor(Math.floor(A/V)/v)}function ne(A,v,V,q){const ce=A.updateRanges;if(ce.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,V,q,v.data);else{ce.sort((Pe,ve)=>Pe.start-ve.start);let ue=0;for(let Pe=1;Pe<ce.length;Pe++){const ve=ce[ue],me=ce[Pe],ze=ve.start+ve.count,Ne=j(me.start,v.width,4),We=j(ve.start,v.width,4);me.start<=ze+1&&Ne===We&&j(me.start+me.count-1,v.width,4)===Ne?ve.count=Math.max(ve.count,me.start+me.count-ve.start):(++ue,ce[ue]=me)}ce.length=ue+1;const J=t.getParameter(n.UNPACK_ROW_LENGTH),te=t.getParameter(n.UNPACK_SKIP_PIXELS),fe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let Pe=0,ve=ce.length;Pe<ve;Pe++){const me=ce[Pe],ze=Math.floor(me.start/4),Ne=Math.ceil(me.count/4),We=ze%v.width,F=Math.floor(ze/v.width),pe=Ne,ee=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,We),t.pixelStorei(n.UNPACK_SKIP_ROWS,F),t.texSubImage2D(n.TEXTURE_2D,0,We,F,pe,ee,V,q,v.data)}A.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,J),t.pixelStorei(n.UNPACK_SKIP_PIXELS,te),t.pixelStorei(n.UNPACK_SKIP_ROWS,fe)}}function be(A,v,V){let q=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=n.TEXTURE_3D);const Z=tt(A,v),ce=v.source;t.bindTexture(q,A.__webglTexture,n.TEXTURE0+V);const ue=i.get(ce);if(ce.version!==ue.__version||Z===!0){if(t.activeTexture(n.TEXTURE0+V),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const ee=je.getPrimaries(je.workingColorSpace),ge=v.colorSpace===Hn?null:je.getPrimaries(v.colorSpace),Me=v.colorSpace===Hn||ee===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let te=g(v.image,!1,r.maxTextureSize);te=rt(v,te);const fe=s.convert(v.format,v.colorSpace),Pe=s.convert(v.type);let ve=S(v.internalFormat,fe,Pe,v.normalized,v.colorSpace,v.isVideoTexture);Ke(q,v);let me;const ze=v.mipmaps,Ne=v.isVideoTexture!==!0,We=ue.__version===void 0||Z===!0,F=ce.dataReady,pe=E(v,te);if(v.isDepthTexture)ve=M(v.format===ni,v.type),We&&(Ne?t.texStorage2D(n.TEXTURE_2D,1,ve,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,ve,te.width,te.height,0,fe,Pe,null));else if(v.isDataTexture)if(ze.length>0){Ne&&We&&t.texStorage2D(n.TEXTURE_2D,pe,ve,ze[0].width,ze[0].height);for(let ee=0,ge=ze.length;ee<ge;ee++)me=ze[ee],Ne?F&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,me.width,me.height,fe,Pe,me.data):t.texImage2D(n.TEXTURE_2D,ee,ve,me.width,me.height,0,fe,Pe,me.data);v.generateMipmaps=!1}else Ne?(We&&t.texStorage2D(n.TEXTURE_2D,pe,ve,te.width,te.height),F&&ne(v,te,fe,Pe)):t.texImage2D(n.TEXTURE_2D,0,ve,te.width,te.height,0,fe,Pe,te.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ne&&We&&t.texStorage3D(n.TEXTURE_2D_ARRAY,pe,ve,ze[0].width,ze[0].height,te.depth);for(let ee=0,ge=ze.length;ee<ge;ee++)if(me=ze[ee],v.format!==ln)if(fe!==null)if(Ne){if(F)if(v.layerUpdates.size>0){const Me=oc(me.width,me.height,v.format,v.type);for(const re of v.layerUpdates){const Le=me.data.subarray(re*Me/me.data.BYTES_PER_ELEMENT,(re+1)*Me/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,re,me.width,me.height,1,fe,Le)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,me.width,me.height,te.depth,fe,me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,ve,me.width,me.height,te.depth,0,me.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?F&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,me.width,me.height,te.depth,fe,Pe,me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,ve,me.width,me.height,te.depth,0,fe,Pe,me.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{Ne&&We&&t.texStorage2D(n.TEXTURE_2D,pe,ve,ze[0].width,ze[0].height);for(let ee=0,ge=ze.length;ee<ge;ee++)me=ze[ee],v.format!==ln?fe!==null?Ne?F&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,me.width,me.height,fe,me.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,ve,me.width,me.height,0,me.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?F&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,me.width,me.height,fe,Pe,me.data):t.texImage2D(n.TEXTURE_2D,ee,ve,me.width,me.height,0,fe,Pe,me.data)}else if(v.isDataArrayTexture)if(Ne){if(We&&t.texStorage3D(n.TEXTURE_2D_ARRAY,pe,ve,te.width,te.height,te.depth),F)if(v.layerUpdates.size>0){const ee=oc(te.width,te.height,v.format,v.type);for(const ge of v.layerUpdates){const Me=te.data.subarray(ge*ee/te.data.BYTES_PER_ELEMENT,(ge+1)*ee/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ge,te.width,te.height,1,fe,Pe,Me)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,fe,Pe,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ve,te.width,te.height,te.depth,0,fe,Pe,te.data);else if(v.isData3DTexture)Ne?(We&&t.texStorage3D(n.TEXTURE_3D,pe,ve,te.width,te.height,te.depth),F&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,fe,Pe,te.data)):t.texImage3D(n.TEXTURE_3D,0,ve,te.width,te.height,te.depth,0,fe,Pe,te.data);else if(v.isFramebufferTexture){if(We)if(Ne)t.texStorage2D(n.TEXTURE_2D,pe,ve,te.width,te.height);else{let ee=te.width,ge=te.height;for(let Me=0;Me<pe;Me++)t.texImage2D(n.TEXTURE_2D,Me,ve,ee,ge,0,fe,Pe,null),ee>>=1,ge>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const ee=n.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),te.parentNode!==ee){ee.appendChild(te),f.add(v),ee.onpaint=ge=>{const Me=ge.changedElements;for(const re of f)Me.includes(re.image)&&(re.needsUpdate=!0)},ee.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,te);else{const Me=n.RGBA,re=n.RGBA,Le=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Me,re,Le,te)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ze.length>0){if(Ne&&We){const ee=Ze(ze[0]);t.texStorage2D(n.TEXTURE_2D,pe,ve,ee.width,ee.height)}for(let ee=0,ge=ze.length;ee<ge;ee++)me=ze[ee],Ne?F&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,fe,Pe,me):t.texImage2D(n.TEXTURE_2D,ee,ve,fe,Pe,me);v.generateMipmaps=!1}else if(Ne){if(We){const ee=Ze(te);t.texStorage2D(n.TEXTURE_2D,pe,ve,ee.width,ee.height)}F&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe,Pe,te)}else t.texImage2D(n.TEXTURE_2D,0,ve,fe,Pe,te);p(v)&&w(q),ue.__version=ce.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function Ue(A,v,V){if(v.image.length!==6)return;const q=tt(A,v),Z=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+V);const ce=i.get(Z);if(Z.version!==ce.__version||q===!0){t.activeTexture(n.TEXTURE0+V);const ue=je.getPrimaries(je.workingColorSpace),J=v.colorSpace===Hn?null:je.getPrimaries(v.colorSpace),te=v.colorSpace===Hn||ue===J?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const fe=v.isCompressedTexture||v.image[0].isCompressedTexture,Pe=v.image[0]&&v.image[0].isDataTexture,ve=[];for(let re=0;re<6;re++)!fe&&!Pe?ve[re]=g(v.image[re],!0,r.maxCubemapSize):ve[re]=Pe?v.image[re].image:v.image[re],ve[re]=rt(v,ve[re]);const me=ve[0],ze=s.convert(v.format,v.colorSpace),Ne=s.convert(v.type),We=S(v.internalFormat,ze,Ne,v.normalized,v.colorSpace),F=v.isVideoTexture!==!0,pe=ce.__version===void 0||q===!0,ee=Z.dataReady;let ge=E(v,me);Ke(n.TEXTURE_CUBE_MAP,v);let Me;if(fe){F&&pe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,We,me.width,me.height);for(let re=0;re<6;re++){Me=ve[re].mipmaps;for(let Le=0;Le<Me.length;Le++){const Re=Me[Le];v.format!==ln?ze!==null?F?ee&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,0,0,Re.width,Re.height,ze,Re.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,We,Re.width,Re.height,0,Re.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,0,0,Re.width,Re.height,ze,Ne,Re.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,We,Re.width,Re.height,0,ze,Ne,Re.data)}}}else{if(Me=v.mipmaps,F&&pe){Me.length>0&&ge++;const re=Ze(ve[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,We,re.width,re.height)}for(let re=0;re<6;re++)if(Pe){F?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,ve[re].width,ve[re].height,ze,Ne,ve[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,We,ve[re].width,ve[re].height,0,ze,Ne,ve[re].data);for(let Le=0;Le<Me.length;Le++){const mt=Me[Le].image[re].image;F?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,0,0,mt.width,mt.height,ze,Ne,mt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,We,mt.width,mt.height,0,ze,Ne,mt.data)}}else{F?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,ze,Ne,ve[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,We,ze,Ne,ve[re]);for(let Le=0;Le<Me.length;Le++){const Re=Me[Le];F?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,0,0,ze,Ne,Re.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,We,ze,Ne,Re.image[re])}}}p(v)&&w(n.TEXTURE_CUBE_MAP),ce.__version=Z.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function we(A,v,V,q,Z,ce){const ue=s.convert(V.format,V.colorSpace),J=s.convert(V.type),te=S(V.internalFormat,ue,J,V.normalized,V.colorSpace),fe=i.get(v),Pe=i.get(V);if(Pe.__renderTarget=v,!fe.__hasExternalTextures){const ve=Math.max(1,v.width>>ce),me=Math.max(1,v.height>>ce);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,ce,te,ve,me,v.depth,0,ue,J,null):t.texImage2D(Z,ce,te,ve,me,0,ue,J,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),Ve(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,Z,Pe.__webglTexture,0,Be(v)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,Z,Pe.__webglTexture,ce),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Oe(A,v,V){if(n.bindRenderbuffer(n.RENDERBUFFER,A),v.depthBuffer){const q=v.depthTexture,Z=q&&q.isDepthTexture?q.type:null,ce=M(v.stencilBuffer,Z),ue=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ve(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Be(v),ce,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,Be(v),ce,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ce,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ue,n.RENDERBUFFER,A)}else{const q=v.textures;for(let Z=0;Z<q.length;Z++){const ce=q[Z],ue=s.convert(ce.format,ce.colorSpace),J=s.convert(ce.type),te=S(ce.internalFormat,ue,J,ce.normalized,ce.colorSpace);Ve(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Be(v),te,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,Be(v),te,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,te,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ot(A,v,V){const q=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=i.get(v.depthTexture);if(Z.__renderTarget=v,(!Z.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),q){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,v.depthTexture.addEventListener("dispose",C)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Ke(n.TEXTURE_CUBE_MAP,v.depthTexture);const fe=s.convert(v.depthTexture.format),Pe=s.convert(v.depthTexture.type);let ve;v.depthTexture.format===Ln?ve=n.DEPTH_COMPONENT24:v.depthTexture.format===ni&&(ve=n.DEPTH24_STENCIL8);for(let me=0;me<6;me++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,ve,v.width,v.height,0,fe,Pe,null)}}else R(v.depthTexture,0);const ce=Z.__webglTexture,ue=Be(v),J=q?n.TEXTURE_CUBE_MAP_POSITIVE_X+V:n.TEXTURE_2D,te=v.depthTexture.format===ni?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===Ln)Ve(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,J,ce,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,te,J,ce,0);else if(v.depthTexture.format===ni)Ve(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,J,ce,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,te,J,ce,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ie(A){const v=i.get(A),V=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const q=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){const Z=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",Z)};q.addEventListener("dispose",Z),v.__depthDisposeCallback=Z}v.__boundDepthTexture=q}if(A.depthTexture&&!v.__autoAllocateDepthBuffer)if(V)for(let q=0;q<6;q++)ot(v.__webglFramebuffer[q],A,q);else{const q=A.texture.mipmaps;q&&q.length>0?ot(v.__webglFramebuffer[0],A,0):ot(v.__webglFramebuffer,A,0)}else if(V){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=n.createRenderbuffer(),Oe(v.__webglDepthbuffer[q],A,!1);else{const Z=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=v.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,ce)}}else{const q=A.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Oe(v.__webglDepthbuffer,A,!1);else{const Z=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,ce)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function se(A,v,V){const q=i.get(A);v!==void 0&&we(q.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&ie(A)}function ae(A){const v=A.texture,V=i.get(A),q=i.get(v);A.addEventListener("dispose",x);const Z=A.textures,ce=A.isWebGLCubeRenderTarget===!0,ue=Z.length>1;if(ue||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=v.version,a.memory.textures++),ce){V.__webglFramebuffer=[];for(let J=0;J<6;J++)if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer[J]=[];for(let te=0;te<v.mipmaps.length;te++)V.__webglFramebuffer[J][te]=n.createFramebuffer()}else V.__webglFramebuffer[J]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer=[];for(let J=0;J<v.mipmaps.length;J++)V.__webglFramebuffer[J]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(ue)for(let J=0,te=Z.length;J<te;J++){const fe=i.get(Z[J]);fe.__webglTexture===void 0&&(fe.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&Ve(A)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let J=0;J<Z.length;J++){const te=Z[J];V.__webglColorRenderbuffer[J]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[J]);const fe=s.convert(te.format,te.colorSpace),Pe=s.convert(te.type),ve=S(te.internalFormat,fe,Pe,te.normalized,te.colorSpace,A.isXRRenderTarget===!0),me=Be(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,me,ve,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+J,n.RENDERBUFFER,V.__webglColorRenderbuffer[J])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),Oe(V.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ce){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),Ke(n.TEXTURE_CUBE_MAP,v);for(let J=0;J<6;J++)if(v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)we(V.__webglFramebuffer[J][te],A,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,te);else we(V.__webglFramebuffer[J],A,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);p(v)&&w(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let J=0,te=Z.length;J<te;J++){const fe=Z[J],Pe=i.get(fe);let ve=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ve=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ve,Pe.__webglTexture),Ke(ve,fe),we(V.__webglFramebuffer,A,fe,n.COLOR_ATTACHMENT0+J,ve,0),p(fe)&&w(ve)}t.unbindTexture()}else{let J=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(J=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(J,q.__webglTexture),Ke(J,v),v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)we(V.__webglFramebuffer[te],A,v,n.COLOR_ATTACHMENT0,J,te);else we(V.__webglFramebuffer,A,v,n.COLOR_ATTACHMENT0,J,0);p(v)&&w(J),t.unbindTexture()}A.depthBuffer&&ie(A)}function oe(A){const v=A.textures;for(let V=0,q=v.length;V<q;V++){const Z=v[V];if(p(Z)){const ce=T(A),ue=i.get(Z).__webglTexture;t.bindTexture(ce,ue),w(ce),t.unbindTexture()}}}const he=[],Ie=[];function De(A){if(A.samples>0){if(Ve(A)===!1){const v=A.textures,V=A.width,q=A.height;let Z=n.COLOR_BUFFER_BIT;const ce=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=i.get(A),J=v.length>1;if(J)for(let fe=0;fe<v.length;fe++)t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const te=A.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let fe=0;fe<v.length;fe++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),J){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ue.__webglColorRenderbuffer[fe]);const Pe=i.get(v[fe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Pe,0)}n.blitFramebuffer(0,0,V,q,0,0,V,q,Z,n.NEAREST),l===!0&&(he.length=0,Ie.length=0,he.push(n.COLOR_ATTACHMENT0+fe),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(he.push(ce),Ie.push(ce),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ie)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,he))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),J)for(let fe=0;fe<v.length;fe++){t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,ue.__webglColorRenderbuffer[fe]);const Pe=i.get(v[fe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,Pe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){const v=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function Be(A){return Math.min(r.maxSamples,A.samples)}function Ve(A){const v=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function D(A){const v=a.render.frame;d.get(A)!==v&&(d.set(A,v),A.update())}function rt(A,v){const V=A.colorSpace,q=A.format,Z=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||V!==xs&&V!==Hn&&(je.getTransfer(V)===lt?(q!==ln||Z!==qt)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):et("WebGLTextures: Unsupported texture color space:",V)),v}function Ze(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=Q,this.resetTextureUnits=$,this.getTextureUnits=O,this.setTextureUnits=H,this.setTexture2D=R,this.setTexture2DArray=I,this.setTexture3D=G,this.setTextureCube=Y,this.rebindTextures=se,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=oe,this.updateMultisampleRenderTarget=De,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=we,this.useMultisampledRTT=Ve,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Rv(n,e){function t(i,r=Hn){let s;const a=je.getTransfer(r);if(i===qt)return n.UNSIGNED_BYTE;if(i===Vo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ho)return n.UNSIGNED_SHORT_5_5_5_1;if(i===mu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===pu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===du)return n.BYTE;if(i===fu)return n.SHORT;if(i===dr)return n.UNSIGNED_SHORT;if(i===Bo)return n.INT;if(i===bn)return n.UNSIGNED_INT;if(i===vn)return n.FLOAT;if(i===Sn)return n.HALF_FLOAT;if(i===gu)return n.ALPHA;if(i===vu)return n.RGB;if(i===ln)return n.RGBA;if(i===Ln)return n.DEPTH_COMPONENT;if(i===ni)return n.DEPTH_STENCIL;if(i===_u)return n.RED;if(i===Go)return n.RED_INTEGER;if(i===si)return n.RG;if(i===Wo)return n.RG_INTEGER;if(i===Xo)return n.RGBA_INTEGER;if(i===ss||i===as||i===os||i===ls)if(a===lt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ss)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===as)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===os)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ls)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ss)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===as)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===os)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ls)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Xa||i===$a||i===qa||i===Ya)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Xa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===$a)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===qa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ya)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ka||i===Za||i===Ja||i===Qa||i===ja||i===vs||i===eo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ka||i===Za)return a===lt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ja)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Qa)return s.COMPRESSED_R11_EAC;if(i===ja)return s.COMPRESSED_SIGNED_R11_EAC;if(i===vs)return s.COMPRESSED_RG11_EAC;if(i===eo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===to||i===no||i===io||i===ro||i===so||i===ao||i===oo||i===lo||i===co||i===uo||i===ho||i===fo||i===mo||i===po)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===to)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===no)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===io)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ro)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===so)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ao)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===oo)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===lo)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===co)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===uo)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ho)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===fo)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===mo)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===po)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===go||i===vo||i===_o)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===go)return a===lt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===vo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===_o)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===xo||i===bo||i===_s||i===So)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===xo)return s.COMPRESSED_RED_RGTC1_EXT;if(i===bo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===_s)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===So)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===fr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Cv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Pv=`
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

}`;class zv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Eu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new yn({vertexShader:Cv,fragmentShader:Pv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new nn(new Ds(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Lv extends li{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,d=null,f=null,u=null,h=null,m=null;const _=typeof XRWebGLBinding<"u",g=new zv,p={},w=t.getContextAttributes();let T=null,S=null;const M=[],E=[],C=new de;let x=null,k=null;const z=new jt;z.viewport=new xt;const N=new jt;N.viewport=new xt;const B=[z,N],$=new Vf;let O=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ne=M[j];return ne===void 0&&(ne=new Js,M[j]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(j){let ne=M[j];return ne===void 0&&(ne=new Js,M[j]=ne),ne.getGripSpace()},this.getHand=function(j){let ne=M[j];return ne===void 0&&(ne=new Js,M[j]=ne),ne.getHandSpace()};function Q(j){const ne=E.indexOf(j.inputSource);if(ne===-1)return;const be=M[ne];be!==void 0&&(be.update(j.inputSource,j.frame,c||a),be.dispatchEvent({type:j.type,data:j.inputSource}))}function b(){r.removeEventListener("select",Q),r.removeEventListener("selectstart",Q),r.removeEventListener("selectend",Q),r.removeEventListener("squeeze",Q),r.removeEventListener("squeezestart",Q),r.removeEventListener("squeezeend",Q),r.removeEventListener("end",b),r.removeEventListener("inputsourceschange",R);for(let j=0;j<M.length;j++){const ne=E[j];ne!==null&&(E[j]=null,M[j].disconnect(ne))}O=null,H=null,g.reset();for(const j in p)delete p[j];if(e.setRenderTarget(T),h=null,u=null,f=null,r=null,S=null,tt.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(C.width,C.height,!1),k!==null){const j=k.camera;j.fov=k.fov,j.zoom=k.zoom,j.updateProjectionMatrix(),k=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return u!==null?u:h},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(T=e.getRenderTarget(),r.addEventListener("select",Q),r.addEventListener("selectstart",Q),r.addEventListener("selectend",Q),r.addEventListener("squeeze",Q),r.addEventListener("squeezestart",Q),r.addEventListener("squeezeend",Q),r.addEventListener("end",b),r.addEventListener("inputsourceschange",R),w.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let be=null,Ue=null,we=null;w.depth&&(we=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,be=w.stencil?ni:Ln,Ue=w.stencil?fr:bn);const Oe={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:s};f=this.getBinding(),u=f.createProjectionLayer(Oe),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),S=new cn(u.textureWidth,u.textureHeight,{format:ln,type:qt,depthTexture:new pr(u.textureWidth,u.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,be),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const be={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,be),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),S=new cn(h.framebufferWidth,h.framebufferHeight,{format:ln,type:qt,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),tt.setContext(r),tt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function R(j){for(let ne=0;ne<j.removed.length;ne++){const be=j.removed[ne],Ue=E.indexOf(be);Ue>=0&&(E[Ue]=null,M[Ue].disconnect(be))}for(let ne=0;ne<j.added.length;ne++){const be=j.added[ne];let Ue=E.indexOf(be);if(Ue===-1){for(let Oe=0;Oe<M.length;Oe++)if(Oe>=E.length){E.push(be),Ue=Oe;break}else if(E[Oe]===null){E[Oe]=be,Ue=Oe;break}if(Ue===-1)break}const we=M[Ue];we&&we.connect(be)}}const I=new L,G=new L;function Y(j,ne,be){I.setFromMatrixPosition(ne.matrixWorld),G.setFromMatrixPosition(be.matrixWorld);const Ue=I.distanceTo(G),we=ne.projectionMatrix.elements,Oe=be.projectionMatrix.elements,ot=we[14]/(we[10]-1),ie=we[14]/(we[10]+1),se=(we[9]+1)/we[5],ae=(we[9]-1)/we[5],oe=(we[8]-1)/we[0],he=(Oe[8]+1)/Oe[0],Ie=ot*oe,De=ot*he,Be=Ue/(-oe+he),Ve=Be*-oe;if(ne.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Ve),j.translateZ(Be),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),we[10]===-1)j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const D=ot+Be,rt=ie+Be,Ze=Ie-Ve,A=De+(Ue-Ve),v=se*ie/rt*D,V=ae*ie/rt*D;j.projectionMatrix.makePerspective(Ze,A,v,V,D,rt),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function le(j,ne){ne===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ne.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let ne=j.near,be=j.far;g.texture!==null&&(g.depthNear>0&&(ne=g.depthNear),g.depthFar>0&&(be=g.depthFar)),$.near=N.near=z.near=ne,$.far=N.far=z.far=be,(O!==$.near||H!==$.far)&&(r.updateRenderState({depthNear:$.near,depthFar:$.far}),O=$.near,H=$.far),$.layers.mask=j.layers.mask|6,z.layers.mask=$.layers.mask&-5,N.layers.mask=$.layers.mask&-3;const Ue=j.parent,we=$.cameras;le($,Ue);for(let Oe=0;Oe<we.length;Oe++)le(we[Oe],Ue);we.length===2?Y($,z,N):$.projectionMatrix.copy(z.projectionMatrix),k===null&&j.isPerspectiveCamera&&(k={camera:j,fov:j.fov,zoom:j.zoom}),xe(j,$,Ue)};function xe(j,ne,be){be===null?j.matrix.copy(ne.matrixWorld):(j.matrix.copy(be.matrixWorld),j.matrix.invert(),j.matrix.multiply(ne.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Mo*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return $},this.getFoveation=function(){if(!(u===null&&h===null))return l},this.setFoveation=function(j){l=j,u!==null&&(u.fixedFoveation=j),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh($)},this.getCameraTexture=function(j){return p[j]};let Xe=null;function Ke(j,ne){if(d=ne.getViewerPose(c||a),m=ne,d!==null){const be=d.views;h!==null&&(e.setRenderTargetFramebuffer(S,h.framebuffer),e.setRenderTarget(S));let Ue=!1;be.length!==$.cameras.length&&($.cameras.length=0,Ue=!0);for(let ie=0;ie<be.length;ie++){const se=be[ie];let ae=null;if(h!==null)ae=h.getViewport(se);else{const he=f.getViewSubImage(u,se);ae=he.viewport,ie===0&&(e.setRenderTargetTextures(S,he.colorTexture,he.depthStencilTexture),e.setRenderTarget(S))}let oe=B[ie];oe===void 0&&(oe=new jt,oe.layers.enable(ie),oe.viewport=new xt,B[ie]=oe),oe.matrix.fromArray(se.transform.matrix),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.projectionMatrix.fromArray(se.projectionMatrix),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert(),oe.viewport.set(ae.x,ae.y,ae.width,ae.height),ie===0&&($.matrix.copy(oe.matrix),$.matrix.decompose($.position,$.quaternion,$.scale)),Ue===!0&&$.cameras.push(oe)}const we=r.enabledFeatures;if(we&&we.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){f=i.getBinding();const ie=f.getDepthInformation(be[0]);ie&&ie.isValid&&ie.texture&&g.init(ie,r.renderState)}if(we&&we.includes("camera-access")&&_){e.state.unbindTexture(),f=i.getBinding();for(let ie=0;ie<be.length;ie++){const se=be[ie].camera;if(se){let ae=p[se];ae||(ae=new Eu,p[se]=ae);const oe=f.getCameraImage(se);ae.sourceTexture=oe}}}}for(let be=0;be<M.length;be++){const Ue=E[be],we=M[be];Ue!==null&&we!==void 0&&we.update(Ue,ne,c||a)}Xe&&Xe(j,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),m=null}const tt=new Ou;tt.setAnimationLoop(Ke),this.setAnimationLoop=function(j){Xe=j},this.dispose=function(){}}}const Dv=new ft,$u=new He;$u.set(-1,0,0,0,1,0,0,0,1);function Iv(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,Iu(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,w,T,S){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(g,p):p.isMeshLambertMaterial?(s(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(g,p),f(g,p)):p.isMeshPhongMaterial?(s(g,p),d(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(g,p),u(g,p),p.isMeshPhysicalMaterial&&h(g,p,S)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),_(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,w,T):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Ht&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Ht&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const w=e.get(p),T=w.envMap,S=w.envMapRotation;T&&(g.envMap.value=T,g.envMapRotation.value.setFromMatrix4(Dv.makeRotationFromEuler(S)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply($u),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,w,T){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*w,g.scale.value=T*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function d(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function h(g,p,w){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ht&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=w.texture,g.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const w=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(w.matrixWorld),g.nearDistance.value=w.shadow.camera.near,g.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Nv(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,M){const E=M.program;i.uniformBlockBinding(S,E)}function c(S,M){let E=r[S.id];E===void 0&&(g(S),E=d(S),r[S.id]=E,S.addEventListener("dispose",w));const C=M.program;i.updateUBOMapping(S,C);const x=e.render.frame;s[S.id]!==x&&(u(S),s[S.id]=x)}function d(S){const M=f();S.__bindingPointIndex=M;const E=n.createBuffer(),C=S.__size,x=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,C,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,E),E}function f(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){const M=r[S.id],E=S.uniforms,C=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let x=0,k=E.length;x<k;x++){const z=E[x];if(Array.isArray(z))for(let N=0,B=z.length;N<B;N++)h(z[N],x,N,C);else h(z,x,0,C)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(S,M,E,C){if(_(S,M,E,C)===!0){const x=S.__offset,k=S.value;if(Array.isArray(k)){let z=0;for(let N=0;N<k.length;N++){const B=k[N],$=p(B);m(B,S.__data,z),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(z+=$.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(k,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,S.__data)}}function m(S,M,E){typeof S=="number"||typeof S=="boolean"?M[0]=S:S.isMatrix3?(M[0]=S.elements[0],M[1]=S.elements[1],M[2]=S.elements[2],M[3]=0,M[4]=S.elements[3],M[5]=S.elements[4],M[6]=S.elements[5],M[7]=0,M[8]=S.elements[6],M[9]=S.elements[7],M[10]=S.elements[8],M[11]=0):ArrayBuffer.isView(S)?M.set(new S.constructor(S.buffer,S.byteOffset,M.length)):S.toArray(M,E)}function _(S,M,E,C){const x=S.value,k=M+"_"+E;if(C[k]===void 0)return typeof x=="number"||typeof x=="boolean"?C[k]=x:ArrayBuffer.isView(x)?C[k]=x.slice():C[k]=x.clone(),!0;{const z=C[k];if(typeof x=="number"||typeof x=="boolean"){if(z!==x)return C[k]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(z.equals(x)===!1)return z.copy(x),!0}}return!1}function g(S){const M=S.uniforms;let E=0;const C=16;for(let k=0,z=M.length;k<z;k++){const N=Array.isArray(M[k])?M[k]:[M[k]];for(let B=0,$=N.length;B<$;B++){const O=N[B],H=Array.isArray(O.value)?O.value:[O.value];for(let Q=0,b=H.length;Q<b;Q++){const R=H[Q],I=p(R),G=E%C,Y=G%I.boundary,le=G+Y;E+=Y,le!==0&&C-le<I.storage&&(E+=C-le),O.__data=new Float32Array(I.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=E,E+=I.storage}}}const x=E%C;return x>0&&(E+=C-x),S.__size=E,S.__cache={},this}function p(S){const M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(M.boundary=16,M.storage=S.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",S),M}function w(S){const M=S.target;M.removeEventListener("dispose",w);const E=a.indexOf(M.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function T(){for(const S in r)n.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:l,update:c,dispose:T}}const Uv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let fn=null;function Fv(){return fn===null&&(fn=new Gd(Uv,16,16,si,Sn),fn.name="DFG_LUT",fn.minFilter=Ut,fn.magFilter=Ut,fn.wrapS=Rn,fn.wrapT=Rn,fn.generateMipmaps=!1,fn.needsUpdate=!0),fn}class Ov{constructor(e={}){const{canvas:t=_d(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:h=qt}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const _=h,g=new Set([Xo,Wo,Go]),p=new Set([qt,bn,dr,fr,Vo,Ho]),w=new Uint32Array(4),T=new Int32Array(4),S=new L;let M=null,E=null;const C=[],x=[];let k=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const z=this;let N=!1,B=null,$=null,O=null,H=null;this._outputColorSpace=Qt;let Q=0,b=0,R=null,I=-1,G=null;const Y=new xt,le=new xt;let xe=null;const Xe=new Ge(0);let Ke=0,tt=t.width,j=t.height,ne=1,be=null,Ue=null;const we=new xt(0,0,tt,j),Oe=new xt(0,0,tt,j);let ot=!1;const ie=new Zo;let se=!1,ae=!1;const oe=new ft,he=new L,Ie=new xt,De={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Be=!1;function Ve(){return R===null?ne:1}let D=i;function rt(y,U){return t.getContext(y,U)}let Ze,A,v,V,q,Z,ce,ue,J,te,fe,Pe,ve,me,ze,Ne,We,F,pe,ee,ge,Me,re;try{const y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Fo}`),t.addEventListener("webglcontextlost",mt,!1),t.addEventListener("webglcontextrestored",st,!1),t.addEventListener("webglcontextcreationerror",rn,!1),D===null){const U="webgl2";if(D=rt(U,y),D===null)throw rt(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Le()}catch(y){throw t.removeEventListener("webglcontextlost",mt,!1),t.removeEventListener("webglcontextrestored",st,!1),t.removeEventListener("webglcontextcreationerror",rn,!1),et("WebGLRenderer: "+y.message),y}function Le(){Ze=new Fg(D),Ze.init(),ge=new Rv(D,Ze),A=new kg(D,Ze,e,ge),v=new Tv(D,Ze),A.reversedDepthBuffer&&u&&v.buffers.depth.setReversed(!0),$=D.createFramebuffer(),O=D.createFramebuffer(),H=D.createFramebuffer(),V=new Vg(D),q=new fv,Z=new kv(D,Ze,v,q,A,ge,V),ce=new Ug(z),ue=new Gf(D),Me=new Ag(D,ue),J=new Og(D,ue,V,Me),te=new Gg(D,J,ue,Me,V),F=new Hg(D,A,Z),ze=new Rg(q),fe=new dv(z,ce,Ze,A,Me,ze),Pe=new Iv(z,q),ve=new pv,me=new Sv(Ze),We=new Eg(z,ce,v,te,m,l),Ne=new Av(z,te,A),re=new Nv(D,V,A,v),pe=new Tg(D,Ze,V),ee=new Bg(D,Ze,V),V.programs=fe.programs,z.capabilities=A,z.extensions=Ze,z.properties=q,z.renderLists=ve,z.shadowMap=Ne,z.state=v,z.info=V}_!==qt&&(k=new Xg(_,t.width,t.height,o,r,s));const Re=new Lv(z,D);this.xr=Re,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const y=Ze.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Ze.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(y){y!==void 0&&(ne=y,this.setSize(tt,j,!1))},this.getSize=function(y){return y.set(tt,j)},this.setSize=function(y,U,K=!0){if(Re.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}tt=y,j=U,t.width=Math.floor(y*ne),t.height=Math.floor(U*ne),K===!0&&(t.style.width=y+"px",t.style.height=U+"px"),k!==null&&k.setSize(t.width,t.height),this.setViewport(0,0,y,U)},this.getDrawingBufferSize=function(y){return y.set(tt*ne,j*ne).floor()},this.setDrawingBufferSize=function(y,U,K){tt=y,j=U,ne=K,t.width=Math.floor(y*K),t.height=Math.floor(U*K),this.setViewport(0,0,y,U)},this.setEffects=function(y){if(_===qt){et("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let U=0;U<y.length;U++)if(y[U].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}k.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(Y)},this.getViewport=function(y){return y.copy(we)},this.setViewport=function(y,U,K,W){y.isVector4?we.set(y.x,y.y,y.z,y.w):we.set(y,U,K,W),v.viewport(Y.copy(we).multiplyScalar(ne).round())},this.getScissor=function(y){return y.copy(Oe)},this.setScissor=function(y,U,K,W){y.isVector4?Oe.set(y.x,y.y,y.z,y.w):Oe.set(y,U,K,W),v.scissor(le.copy(Oe).multiplyScalar(ne).round())},this.getScissorTest=function(){return ot},this.setScissorTest=function(y){v.setScissorTest(ot=y)},this.setOpaqueSort=function(y){be=y},this.setTransparentSort=function(y){Ue=y},this.getClearColor=function(y){return y.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor(...arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha(...arguments)},this.clear=function(y=!0,U=!0,K=!0){let W=0;if(y){let X=!1;if(R!==null){const ye=R.texture.format;X=g.has(ye)}if(X){const ye=R.texture.type,Ae=p.has(ye),Se=We.getClearColor(),Te=We.getClearAlpha(),Ce=Se.r,$e=Se.g,Je=Se.b;Ae?(w[0]=Ce,w[1]=$e,w[2]=Je,w[3]=Te,D.clearBufferuiv(D.COLOR,0,w)):(T[0]=Ce,T[1]=$e,T[2]=Je,T[3]=Te,D.clearBufferiv(D.COLOR,0,T))}else W|=D.COLOR_BUFFER_BIT}U&&(W|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(W|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&D.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),B=y},this.dispose=function(){t.removeEventListener("webglcontextlost",mt,!1),t.removeEventListener("webglcontextrestored",st,!1),t.removeEventListener("webglcontextcreationerror",rn,!1),We.dispose(),ve.dispose(),me.dispose(),q.dispose(),ce.dispose(),te.dispose(),Me.dispose(),re.dispose(),fe.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",ul),Re.removeEventListener("sessionend",hl),qn.stop()};function mt(y){y.preventDefault(),El("WebGLRenderer: Context Lost."),N=!0}function st(){El("WebGLRenderer: Context Restored."),N=!1;const y=V.autoReset,U=Ne.enabled,K=Ne.autoUpdate,W=Ne.needsUpdate,X=Ne.type;Le(),V.autoReset=y,Ne.enabled=U,Ne.autoUpdate=K,Ne.needsUpdate=W,Ne.type=X}function rn(y){et("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function un(y){const U=y.target;U.removeEventListener("dispose",un),Ch(U)}function Ch(y){Ph(y),q.remove(y)}function Ph(y){const U=q.get(y).programs;U!==void 0&&(U.forEach(function(K){fe.releaseProgram(K)}),y.isShaderMaterial&&fe.releaseShaderCache(y))}this.renderBufferDirect=function(y,U,K,W,X,ye){U===null&&(U=De);const Ae=X.isMesh&&X.matrixWorld.determinantAffine()<0,Se=Dh(y,U,K,W,X);v.setMaterial(W,Ae);let Te=K.index,Ce=1;if(W.wireframe===!0){if(Te=J.getWireframeAttribute(K),Te===void 0)return;Ce=2}const $e=K.drawRange,Je=K.attributes.position;let ke=$e.start*Ce,at=($e.start+$e.count)*Ce;ye!==null&&(ke=Math.max(ke,ye.start*Ce),at=Math.min(at,(ye.start+ye.count)*Ce)),Te!==null?(ke=Math.max(ke,0),at=Math.min(at,Te.count)):Je!=null&&(ke=Math.max(ke,0),at=Math.min(at,Je.count));const wt=at-ke;if(wt<0||wt===1/0)return;Me.setup(X,W,Se,K,Te);let gt,dt=pe;if(Te!==null&&(gt=ue.get(Te),dt=ee,dt.setIndex(gt)),X.isMesh)W.wireframe===!0?(v.setLineWidth(W.wireframeLinewidth*Ve()),dt.setMode(D.LINES)):dt.setMode(D.TRIANGLES);else if(X.isLine){let Lt=W.linewidth;Lt===void 0&&(Lt=1),v.setLineWidth(Lt*Ve()),X.isLineSegments?dt.setMode(D.LINES):X.isLineLoop?dt.setMode(D.LINE_LOOP):dt.setMode(D.LINE_STRIP)}else X.isPoints?dt.setMode(D.POINTS):X.isSprite&&dt.setMode(D.TRIANGLES);if(X.isBatchedMesh)if(Ze.get("WEBGL_multi_draw"))dt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Lt=X._multiDrawStarts,Ee=X._multiDrawCounts,Ft=X._multiDrawCount,nt=Te?ue.get(Te).bytesPerElement:1,Yt=q.get(W).currentProgram.getUniforms();for(let hn=0;hn<Ft;hn++)Yt.setValue(D,"_gl_DrawID",hn),dt.render(Lt[hn]/nt,Ee[hn])}else if(X.isInstancedMesh)dt.renderInstances(ke,wt,X.count);else if(K.isInstancedBufferGeometry){const Lt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Ee=Math.min(K.instanceCount,Lt);dt.renderInstances(ke,wt,Ee)}else dt.render(ke,wt)};function cl(y,U,K,W){B!==null&&y.isNodeMaterial&&B.setObject(W,y),se===!0&&ze.setState(y,K,!1),y.transparent===!0&&y.side===en&&y.forceSinglePass===!1?(y.side=Ht,y.needsUpdate=!0,Ar(y,U,W),y.side=Xn,y.needsUpdate=!0,Ar(y,U,W),y.side=en):Ar(y,U,W)}this.compile=function(y,U,K=null){K===null&&(K=y),B!==null&&B.renderStart(y,U,K),E=me.get(K),E.init(U),x.push(E),K.traverseVisible(function(X){X.isLight&&X.layers.test(U.layers)&&(E.pushLight(X),X.castShadow&&E.pushShadow(X))}),y!==K&&y.traverseVisible(function(X){X.isLight&&X.layers.test(U.layers)&&(E.pushLight(X),X.castShadow&&E.pushShadow(X))}),E.setupLights(),B!==null&&B.updateLights(E.state.lightsArray),ae=this.localClippingEnabled,se=ze.init(this.clippingPlanes,ae),se===!0&&ze.setGlobalState(this.clippingPlanes,U),B!==null&&Ne.render(E.state.shadowsArray,K,U);const W=new Set;return y.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const ye=X.material;if(ye)if(Array.isArray(ye))for(let Ae=0;Ae<ye.length;Ae++){const Se=ye[Ae];cl(Se,K,U,X),W.add(Se)}else cl(ye,K,U,X),W.add(ye)}),E=x.pop(),B!==null&&B.renderEnd(),W},this.compileAsync=function(y,U,K=null){const W=this.compile(y,U,K);return new Promise(X=>{function ye(){if(W.forEach(function(Ae){const Te=q.get(Ae).currentProgram;(Te===void 0||Te.isReady())&&W.delete(Ae)}),W.size===0){X(y);return}setTimeout(ye,10)}Ze.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let Os=null;function zh(y){Os&&Os(y)}function ul(){qn.stop()}function hl(){qn.start()}const qn=new Ou;qn.setAnimationLoop(zh),typeof self<"u"&&qn.setContext(self),this.setAnimationLoop=function(y){Os=y,Re.setAnimationLoop(y),y===null?qn.stop():qn.start()},Re.addEventListener("sessionstart",ul),Re.addEventListener("sessionend",hl),this.render=function(y,U){if(U!==void 0&&U.isCamera!==!0){et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;B!==null&&B.renderStart(y,U);const K=Re.enabled===!0&&Re.isPresenting===!0,W=k!==null&&(R===null||K)&&k.begin(z,R);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(k===null||k.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(U),U=Re.getCamera()),y.isScene===!0&&y.onBeforeRender(z,y,U,R),E=me.get(y,x.length),E.init(U),E.state.textureUnits=Z.getTextureUnits(),x.push(E),oe.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),ie.setFromProjectionMatrix(oe,_n,U.reversedDepth),ae=this.localClippingEnabled,se=ze.init(this.clippingPlanes,ae),M=ve.get(y,C.length),M.init(),C.push(M),Re.enabled===!0&&Re.isPresenting===!0){const Ae=z.xr.getDepthSensingMesh();Ae!==null&&Bs(Ae,U,-1/0,z.sortObjects)}Bs(y,U,0,z.sortObjects),M.finish(),B!==null&&B.updateLights(E.state.lightsArray),z.sortObjects===!0&&M.sort(be,Ue),Be=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,Be&&We.addToRenderList(M,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),se===!0&&ze.beginShadows();const X=E.state.shadowsArray;if(Ne.render(X,y,U),se===!0&&ze.endShadows(),(W&&k.hasRenderPass())===!1){const Ae=M.opaque,Se=M.transmissive;if(E.setupLights(),U.isArrayCamera){const Te=U.cameras;if(Se.length>0)for(let Ce=0,$e=Te.length;Ce<$e;Ce++){const Je=Te[Ce];fl(Ae,Se,y,Je)}Be&&We.render(y);for(let Ce=0,$e=Te.length;Ce<$e;Ce++){const Je=Te[Ce];dl(M,y,Je,Je.viewport)}}else Se.length>0&&fl(Ae,Se,y,U),Be&&We.render(y),dl(M,y,U)}R!==null&&b===0&&(Z.updateMultisampleRenderTarget(R),Z.updateRenderTargetMipmap(R)),W&&k.end(z),y.isScene===!0&&y.onAfterRender(z,y,U),Me.resetDefaultState(),I=-1,G=null,x.pop(),x.length>0?(E=x[x.length-1],Z.setTextureUnits(E.state.textureUnits),se===!0&&ze.setGlobalState(z.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?M=C[C.length-1]:M=null,B!==null&&B.renderEnd()};function Bs(y,U,K,W){if(y.visible===!1)return;if(y.layers.test(U.layers)){if(y.isGroup)K=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(U);else if(y.isLightProbeGrid)E.pushLightProbeGrid(y);else if(y.isLight)E.pushLight(y),y.castShadow&&E.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||y.intersectsFrustum(ie)){W&&Ie.setFromMatrixPosition(y.matrixWorld).applyMatrix4(oe);const Ae=te.update(y),Se=y.material;Se.visible&&M.push(y,Ae,Se,K,Ie.z,null,U)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||y.intersectsFrustum(ie))){const Ae=te.update(y),Se=y.material;if(W&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Ie.copy(y.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Ie.copy(Ae.boundingSphere.center)),Ie.applyMatrix4(y.matrixWorld).applyMatrix4(oe)),Array.isArray(Se)){const Te=Ae.groups;for(let Ce=0,$e=Te.length;Ce<$e;Ce++){const Je=Te[Ce],ke=Se[Je.materialIndex];ke&&ke.visible&&M.push(y,Ae,ke,K,Ie.z,Je,U)}}else Se.visible&&M.push(y,Ae,Se,K,Ie.z,null,U)}}const ye=y.children;for(let Ae=0,Se=ye.length;Ae<Se;Ae++)Bs(ye[Ae],U,K,W)}function dl(y,U,K,W){const{opaque:X,transmissive:ye,transparent:Ae}=y;E.setupLightsView(K),se===!0&&ze.setGlobalState(z.clippingPlanes,K),W&&v.viewport(Y.copy(W)),X.length>0&&Er(X,U,K),ye.length>0&&Er(ye,U,K),Ae.length>0&&Er(Ae,U,K),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function fl(y,U,K,W){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[W.id]===void 0){const ke=Ze.has("EXT_color_buffer_half_float")||Ze.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[W.id]=new cn(1,1,{generateMipmaps:!0,type:ke?Sn:qt,minFilter:ti,samples:Math.max(4,A.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:je.workingColorSpace})}const ye=E.state.transmissionRenderTarget[W.id],Ae=W.viewport||Y;ye.setSize(Ae.z*z.transmissionResolutionScale,Ae.w*z.transmissionResolutionScale);const Se=z.getRenderTarget(),Te=z.getActiveCubeFace(),Ce=z.getActiveMipmapLevel();z.setRenderTarget(ye),z.getClearColor(Xe),Ke=z.getClearAlpha(),Ke<1&&z.setClearColor(16777215,.5),z.clear(),Be&&We.render(K);const $e=z.toneMapping;z.toneMapping=xn;const Je=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),E.setupLightsView(W),se===!0&&ze.setGlobalState(z.clippingPlanes,W),Er(y,K,W),Z.updateMultisampleRenderTarget(ye),Z.updateRenderTargetMipmap(ye),Ze.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let at=0,wt=U.length;at<wt;at++){const gt=U[at],{object:dt,geometry:Lt,material:Ee,group:Ft}=gt;if(Ee.side===en&&dt.layers.test(W.layers)){const nt=Ee.side;Ee.side=Ht,Ee.needsUpdate=!0,ml(dt,K,W,Lt,Ee,Ft),Ee.side=nt,Ee.needsUpdate=!0,ke=!0}}ke===!0&&(Z.updateMultisampleRenderTarget(ye),Z.updateRenderTargetMipmap(ye))}z.setRenderTarget(Se,Te,Ce),z.setClearColor(Xe,Ke),Je!==void 0&&(W.viewport=Je),z.toneMapping=$e}function Er(y,U,K){const W=U.isScene===!0?U.overrideMaterial:null;for(let X=0,ye=y.length;X<ye;X++){const Ae=y[X],{object:Se,geometry:Te,group:Ce}=Ae;let $e=Ae.material;$e.allowOverride===!0&&W!==null&&($e=W),Se.layers.test(K.layers)&&ml(Se,U,K,Te,$e,Ce)}}function ml(y,U,K,W,X,ye){B!==null&&X.isNodeMaterial&&B.setObject(y,X),y.onBeforeRender(z,U,K,W,X,ye),y.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),X.onBeforeRender(z,U,K,W,y,ye),X.transparent===!0&&X.side===en&&X.forceSinglePass===!1?(X.side=Ht,X.needsUpdate=!0,z.renderBufferDirect(K,U,W,X,y,ye),X.side=Xn,X.needsUpdate=!0,z.renderBufferDirect(K,U,W,X,y,ye),X.side=en):z.renderBufferDirect(K,U,W,X,y,ye),y.onAfterRender(z,U,K,W,X,ye)}function Ar(y,U,K){U.isScene!==!0&&(U=De);const W=q.get(y),X=E.state.lights,ye=E.state.shadowsArray,Ae=X.state.version,Se=fe.getParameters(y,X.state,ye,U,K,E.state.lightProbeGridArray),Te=fe.getProgramCacheKey(Se);let Ce=W.programs;W.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?U.environment:null,W.fog=U.fog;const $e=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;W.envMap=ce.get(y.envMap||W.environment,$e),W.envMapRotation=W.environment!==null&&y.envMap===null?U.environmentRotation:y.envMapRotation,Ce===void 0&&(y.addEventListener("dispose",un),Ce=new Map,W.programs=Ce);let Je=Ce.get(Te);if(Je!==void 0){if(W.currentProgram===Je&&W.lightsStateVersion===Ae)return gl(y,Se),Je}else Se.uniforms=fe.getUniforms(y),B!==null&&y.isNodeMaterial&&B.build(y,K,Se),y.onBeforeCompile(Se,z),Je=fe.acquireProgram(Se,Te),Ce.set(Te,Je),W.uniforms=Se.uniforms;const ke=W.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(ke.clippingPlanes=ze.uniform),gl(y,Se),W.needsLights=Nh(y),W.lightsStateVersion=Ae,W.needsLights&&(ke.ambientLightColor.value=X.state.ambient,ke.lightProbe.value=X.state.probe,ke.sunLights.value=X.state.sun,ke.sunLightShadows.value=X.state.sunShadow,ke.directionalLights.value=X.state.directional,ke.directionalLightShadows.value=X.state.directionalShadow,ke.spotLights.value=X.state.spot,ke.spotLightShadows.value=X.state.spotShadow,ke.rectAreaLights.value=X.state.rectArea,ke.ltc_1.value=X.state.rectAreaLTC1,ke.ltc_2.value=X.state.rectAreaLTC2,ke.pointLights.value=X.state.point,ke.pointLightShadows.value=X.state.pointShadow,ke.hemisphereLights.value=X.state.hemi,ke.sunShadowMatrix.value=X.state.sunShadowMatrix,ke.sunShadowCascade.value=X.state.sunShadowCascade,ke.directionalShadowMatrix.value=X.state.directionalShadowMatrix,ke.spotLightMatrix.value=X.state.spotLightMatrix,ke.spotLightMap.value=X.state.spotLightMap,ke.pointShadowMatrix.value=X.state.pointShadowMatrix),W.lightProbeGrid=E.state.lightProbeGridArray.length>0,W.currentProgram=Je,W.uniformsList=null,Je}function pl(y){if(y.uniformsList===null){const U=y.currentProgram.getUniforms();y.uniformsList=us.seqWithValue(U.seq,y.uniforms)}return y.uniformsList}function gl(y,U){const K=q.get(y);K.outputColorSpace=U.outputColorSpace,K.batching=U.batching,K.batchingColor=U.batchingColor,K.instancing=U.instancing,K.instancingColor=U.instancingColor,K.instancingMorph=U.instancingMorph,K.skinning=U.skinning,K.morphTargets=U.morphTargets,K.morphNormals=U.morphNormals,K.morphColors=U.morphColors,K.morphTargetsCount=U.morphTargetsCount,K.numClippingPlanes=U.numClippingPlanes,K.numIntersection=U.numClipIntersection,K.vertexAlphas=U.vertexAlphas,K.vertexTangents=U.vertexTangents,K.toneMapping=U.toneMapping}function Lh(y,U){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;S.setFromMatrixPosition(U.matrixWorld);for(let K=0,W=y.length;K<W;K++){const X=y[K];if(X.texture!==null&&X.boundingBox.containsPoint(S))return X}return null}function Dh(y,U,K,W,X){U.isScene!==!0&&(U=De),Z.resetTextureUnits();const ye=U.fog,Ae=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?U.environment:null,Se=R===null?z.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:je.workingColorSpace,Te=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Ce=ce.get(W.envMap||Ae,Te),$e=W.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Je=!!K.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),ke=!!K.morphAttributes.position,at=!!K.morphAttributes.normal,wt=!!K.morphAttributes.color;let gt=xn;W.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(gt=z.toneMapping);const dt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Lt=dt!==void 0?dt.length:0,Ee=q.get(W),Ft=E.state.lights;if(se===!0&&(ae===!0||y!==G)){const pt=y===G&&W.id===I;ze.setState(W,y,pt)}let nt=!1;W.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Ft.state.version||Ee.outputColorSpace!==Se||X.isBatchedMesh&&Ee.batching===!1||!X.isBatchedMesh&&Ee.batching===!0||X.isBatchedMesh&&Ee.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&Ee.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&Ee.instancing===!1||!X.isInstancedMesh&&Ee.instancing===!0||X.isSkinnedMesh&&Ee.skinning===!1||!X.isSkinnedMesh&&Ee.skinning===!0||X.isInstancedMesh&&Ee.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ee.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ee.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ee.instancingMorph===!1&&X.morphTexture!==null||Ee.envMap!==Ce||W.fog===!0&&Ee.fog!==ye||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ze.numPlanes||Ee.numIntersection!==ze.numIntersection)||Ee.vertexAlphas!==$e||Ee.vertexTangents!==Je||Ee.morphTargets!==ke||Ee.morphNormals!==at||Ee.morphColors!==wt||Ee.toneMapping!==gt||Ee.morphTargetsCount!==Lt||!!Ee.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(nt=!0):(nt=!0,Ee.__version=W.version);let Yt=Ee.currentProgram;nt===!0&&(Yt=Ar(W,U,X),B&&W.isNodeMaterial&&B.onUpdateProgram(W,Yt,Ee));let hn=!1,Dn=!1,hi=!1;const ht=Yt.getUniforms(),yt=Ee.uniforms;if(v.useProgram(Yt.program)&&(hn=!0,Dn=!0,hi=!0),W.id!==I&&(I=W.id,Dn=!0),Ee.needsLights){const pt=Lh(E.state.lightProbeGridArray,X);Ee.lightProbeGrid!==pt&&(Ee.lightProbeGrid=pt,Dn=!0)}if(hn||G!==y){v.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ht.setValue(D,"projectionMatrix",y.projectionMatrix),ht.setValue(D,"viewMatrix",y.matrixWorldInverse);const Nn=ht.map.cameraPosition;Nn!==void 0&&Nn.setValue(D,he.setFromMatrixPosition(y.matrixWorld)),A.logarithmicDepthBuffer&&ht.setValue(D,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ht.setValue(D,"isOrthographic",y.isOrthographicCamera===!0),G!==y&&(G=y,Dn=!0,hi=!0)}if(Ee.needsLights&&(Ft.state.sunShadowMap.length>0&&ht.setValue(D,"sunShadowMap",Ft.state.sunShadowMap,Z),Ft.state.directionalShadowMap.length>0&&ht.setValue(D,"directionalShadowMap",Ft.state.directionalShadowMap,Z),Ft.state.spotShadowMap.length>0&&ht.setValue(D,"spotShadowMap",Ft.state.spotShadowMap,Z),Ft.state.pointShadowMap.length>0&&ht.setValue(D,"pointShadowMap",Ft.state.pointShadowMap,Z)),X.isSkinnedMesh){ht.setOptional(D,X,"bindMatrix"),ht.setOptional(D,X,"bindMatrixInverse");const pt=X.skeleton;pt&&(pt.boneTexture===null&&pt.computeBoneTexture(),ht.setValue(D,"boneTexture",pt.boneTexture,Z))}X.isBatchedMesh&&(ht.setOptional(D,X,"batchingTexture"),ht.setValue(D,"batchingTexture",X._matricesTexture,Z),ht.setOptional(D,X,"batchingIdTexture"),ht.setValue(D,"batchingIdTexture",X._indirectTexture,Z),ht.setOptional(D,X,"batchingColorTexture"),X._colorsTexture!==null&&ht.setValue(D,"batchingColorTexture",X._colorsTexture,Z));const In=K.morphAttributes;if((In.position!==void 0||In.normal!==void 0||In.color!==void 0)&&F.update(X,K,Yt),(Dn||Ee.receiveShadow!==X.receiveShadow)&&(Ee.receiveShadow=X.receiveShadow,ht.setValue(D,"receiveShadow",X.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&U.environment!==null&&(yt.envMapIntensity.value=U.environmentIntensity),yt.dfgLUT!==void 0&&(yt.dfgLUT.value=Fv()),Dn){if(ht.setValue(D,"toneMappingExposure",z.toneMappingExposure),Ee.needsLights&&Ih(yt,hi),ye&&W.fog===!0&&Pe.refreshFogUniforms(yt,ye),Pe.refreshMaterialUniforms(yt,W,ne,j,E.state.transmissionRenderTarget[y.id]),Ee.needsLights&&Ee.lightProbeGrid){const pt=Ee.lightProbeGrid;yt.probesSH.value=pt.texture,yt.probesMin.value.copy(pt.boundingBox.min),yt.probesMax.value.copy(pt.boundingBox.max),yt.probesResolution.value.copy(pt.resolution)}us.upload(D,pl(Ee),yt,Z)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(us.upload(D,pl(Ee),yt,Z),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ht.setValue(D,"center",X.center),ht.setValue(D,"modelViewMatrix",X.modelViewMatrix),ht.setValue(D,"normalMatrix",X.normalMatrix),ht.setValue(D,"modelMatrix",X.matrixWorld),W.uniformsGroups!==void 0){const pt=W.uniformsGroups;for(let Nn=0,di=pt.length;Nn<di;Nn++){const _l=pt[Nn];re.update(_l,Yt),re.bind(_l,Yt)}}return Yt}function Ih(y,U){y.ambientLightColor.needsUpdate=U,y.lightProbe.needsUpdate=U,y.sunLights.needsUpdate=U,y.sunLightShadows.needsUpdate=U,y.directionalLights.needsUpdate=U,y.directionalLightShadows.needsUpdate=U,y.pointLights.needsUpdate=U,y.pointLightShadows.needsUpdate=U,y.spotLights.needsUpdate=U,y.spotLightShadows.needsUpdate=U,y.rectAreaLights.needsUpdate=U,y.hemisphereLights.needsUpdate=U}function Nh(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return Q},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(y,U,K){const W=q.get(y);W.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),q.get(y.texture).__webglTexture=U,q.get(y.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:K,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,U){const K=q.get(y);K.__webglFramebuffer=U,K.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(y,U=0,K=0){R=y,Q=U,b=K;let W=null,X=!1,ye=!1;if(y){const Se=q.get(y);if(Se.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(D.FRAMEBUFFER,Se.__webglFramebuffer),Y.copy(y.viewport),le.copy(y.scissor),xe=y.scissorTest,v.viewport(Y),v.scissor(le),v.setScissorTest(xe),I=-1;return}else if(Se.__webglFramebuffer===void 0)Z.setupRenderTarget(y);else if(Se.__hasExternalTextures)Z.rebindTextures(y,q.get(y.texture).__webglTexture,q.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const $e=y.depthTexture;if(Se.__boundDepthTexture!==$e){if($e!==null&&q.has($e)&&(y.width!==$e.image.width||y.height!==$e.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(y)}}const Te=y.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(ye=!0);const Ce=q.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ce[U])?W=Ce[U][K]:W=Ce[U],X=!0):y.samples>0&&Z.useMultisampledRTT(y)===!1?W=q.get(y).__webglMultisampledFramebuffer:Array.isArray(Ce)?W=Ce[K]:W=Ce,Y.copy(y.viewport),le.copy(y.scissor),xe=y.scissorTest}else Y.copy(we).multiplyScalar(ne).floor(),le.copy(Oe).multiplyScalar(ne).floor(),xe=ot;if(K!==0&&(W=$),v.bindFramebuffer(D.FRAMEBUFFER,W)&&v.drawBuffers(y,W),v.viewport(Y),v.scissor(le),v.setScissorTest(xe),X){const Se=q.get(y.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,Se.__webglTexture,K)}else if(ye){const Se=U;for(let Te=0;Te<y.textures.length;Te++){const Ce=q.get(y.textures[Te]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Te,Ce.__webglTexture,K,Se)}}else if(y!==null&&K!==0){const Se=q.get(y.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Se.__webglTexture,K)}I=-1};function vl(y){const U=q.get(y);return(U.__readFormat!==y.format||U.__readType!==y.type)&&(U.__readFormat=y.format,U.__readType=y.type,U.__formatReadable=A.textureFormatReadable(y.format),U.__typeReadable=A.textureTypeReadable(y.type)),U}this.readRenderTargetPixels=function(y,U,K,W,X,ye,Ae,Se=0){if(!(y&&y.isWebGLRenderTarget)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=q.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Ae!==void 0&&(Te=Te[Ae]),Te){v.bindFramebuffer(D.FRAMEBUFFER,Te);try{const Ce=y.textures[Se],$e=Ce.format,Je=Ce.type;y.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Se);const ke=vl(Ce);if(ke.__formatReadable===!1){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(ke.__typeReadable===!1){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=y.width-W&&K>=0&&K<=y.height-X&&D.readPixels(U,K,W,X,ge.convert($e),ge.convert(Je),ye)}finally{const Ce=R!==null?q.get(R).__webglFramebuffer:null;v.bindFramebuffer(D.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(y,U,K,W,X,ye,Ae,Se=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=q.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Ae!==void 0&&(Te=Te[Ae]),Te)if(U>=0&&U<=y.width-W&&K>=0&&K<=y.height-X){v.bindFramebuffer(D.FRAMEBUFFER,Te);const Ce=y.textures[Se],$e=Ce.format,Je=Ce.type;y.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Se);const ke=vl(Ce);if(ke.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(ke.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const at=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,at),D.bufferData(D.PIXEL_PACK_BUFFER,ye.byteLength,D.STREAM_READ),D.readPixels(U,K,W,X,ge.convert($e),ge.convert(Je),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);const wt=R!==null?q.get(R).__webglFramebuffer:null;v.bindFramebuffer(D.FRAMEBUFFER,wt);const gt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await xd(D,gt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,at),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ye),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(at),D.deleteSync(gt),ye}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,U=null,K=0){const W=Math.pow(2,-K),X=Math.floor(y.image.width*W),ye=Math.floor(y.image.height*W),Ae=U!==null?U.x:0,Se=U!==null?U.y:0;Z.setTexture2D(y,0),D.copyTexSubImage2D(D.TEXTURE_2D,K,0,0,Ae,Se,X,ye),v.unbindTexture()},this.copyTextureToTexture=function(y,U,K=null,W=null,X=0,ye=0){let Ae,Se,Te,Ce,$e,Je,ke,at,wt;const gt=y.isCompressedTexture?y.mipmaps[ye]:y.image;if(K!==null)Ae=K.max.x-K.min.x,Se=K.max.y-K.min.y,Te=K.isBox3?K.max.z-K.min.z:1,Ce=K.min.x,$e=K.min.y,Je=K.isBox3?K.min.z:0;else{const yt=Math.pow(2,-X);Ae=Math.floor(gt.width*yt),Se=Math.floor(gt.height*yt),y.isDataArrayTexture?Te=gt.depth:y.isData3DTexture?Te=Math.floor(gt.depth*yt):Te=1,Ce=0,$e=0,Je=0}W!==null?(ke=W.x,at=W.y,wt=W.z):(ke=0,at=0,wt=0);const dt=ge.convert(U.format),Lt=ge.convert(U.type);let Ee;U.isData3DTexture?(Z.setTexture3D(U,0),Ee=D.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Z.setTexture2DArray(U,0),Ee=D.TEXTURE_2D_ARRAY):(Z.setTexture2D(U,0),Ee=D.TEXTURE_2D),v.activeTexture(D.TEXTURE0),v.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),v.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),v.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const Ft=v.getParameter(D.UNPACK_ROW_LENGTH),nt=v.getParameter(D.UNPACK_IMAGE_HEIGHT),Yt=v.getParameter(D.UNPACK_SKIP_PIXELS),hn=v.getParameter(D.UNPACK_SKIP_ROWS),Dn=v.getParameter(D.UNPACK_SKIP_IMAGES);v.pixelStorei(D.UNPACK_ROW_LENGTH,gt.width),v.pixelStorei(D.UNPACK_IMAGE_HEIGHT,gt.height),v.pixelStorei(D.UNPACK_SKIP_PIXELS,Ce),v.pixelStorei(D.UNPACK_SKIP_ROWS,$e),v.pixelStorei(D.UNPACK_SKIP_IMAGES,Je);const hi=y.isDataArrayTexture||y.isData3DTexture,ht=U.isDataArrayTexture||U.isData3DTexture;if(y.isDepthTexture){const yt=q.get(y),In=q.get(U),pt=q.get(yt.__renderTarget),Nn=q.get(In.__renderTarget);v.bindFramebuffer(D.READ_FRAMEBUFFER,pt.__webglFramebuffer),v.bindFramebuffer(D.DRAW_FRAMEBUFFER,Nn.__webglFramebuffer);for(let di=0;di<Te;di++)hi&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,q.get(y).__webglTexture,X,Je+di),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,q.get(U).__webglTexture,ye,wt+di)),D.blitFramebuffer(Ce,$e,Ae,Se,ke,at,Ae,Se,D.DEPTH_BUFFER_BIT,D.NEAREST);v.bindFramebuffer(D.READ_FRAMEBUFFER,null),v.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(X!==0||y.isRenderTargetTexture||q.has(y)){const yt=q.get(y),In=q.get(U);v.bindFramebuffer(D.READ_FRAMEBUFFER,O),v.bindFramebuffer(D.DRAW_FRAMEBUFFER,H);for(let pt=0;pt<Te;pt++)hi?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,yt.__webglTexture,X,Je+pt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,yt.__webglTexture,X),ht?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,In.__webglTexture,ye,wt+pt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,In.__webglTexture,ye),X!==0?D.blitFramebuffer(Ce,$e,Ae,Se,ke,at,Ae,Se,D.COLOR_BUFFER_BIT,D.NEAREST):ht?D.copyTexSubImage3D(Ee,ye,ke,at,wt+pt,Ce,$e,Ae,Se):D.copyTexSubImage2D(Ee,ye,ke,at,Ce,$e,Ae,Se);v.bindFramebuffer(D.READ_FRAMEBUFFER,null),v.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else ht?y.isDataTexture||y.isData3DTexture?D.texSubImage3D(Ee,ye,ke,at,wt,Ae,Se,Te,dt,Lt,gt.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(Ee,ye,ke,at,wt,Ae,Se,Te,dt,gt.data):D.texSubImage3D(Ee,ye,ke,at,wt,Ae,Se,Te,dt,Lt,gt):y.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,ye,ke,at,Ae,Se,dt,Lt,gt.data):y.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,ye,ke,at,gt.width,gt.height,dt,gt.data):D.texSubImage2D(D.TEXTURE_2D,ye,ke,at,Ae,Se,dt,Lt,gt);v.pixelStorei(D.UNPACK_ROW_LENGTH,Ft),v.pixelStorei(D.UNPACK_IMAGE_HEIGHT,nt),v.pixelStorei(D.UNPACK_SKIP_PIXELS,Yt),v.pixelStorei(D.UNPACK_SKIP_ROWS,hn),v.pixelStorei(D.UNPACK_SKIP_IMAGES,Dn),ye===0&&U.generateMipmaps&&D.generateMipmap(Ee),v.unbindTexture()},this.initRenderTarget=function(y){q.get(y).__webglFramebuffer===void 0&&Z.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Z.setTextureCube(y,0):y.isData3DTexture?Z.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Z.setTexture2DArray(y,0):Z.setTexture2D(y,0),v.unbindTexture()},this.resetState=function(){Q=0,b=0,R=null,v.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}const ct=n=>({value:n,unit:"mm"});function $t(n,e,t,i={},r=[]){return{id:n,type:e,params:i,content:r,meta:{name:t}}}const Xt=n=>JSON.parse(JSON.stringify(n));function Ui(n){return n.content.flatMap(e=>[e,...Ui(e)])}const vt=n=>[n,...Ui(n)];function ut(n,e){return vt(n).find(t=>t.id===e)}function Ts(n,e){return vt(n).find(t=>t.content.some(i=>i.id===e))}function Gn(n,e){if(n.id===e)return[n];for(const t of n.content){const i=Gn(t,e);if(i.length)return[n,...i]}return[]}const St=n=>n.meta.verworfen===!0,Ye=n=>n&&typeof n=="object"?n.value:0;function qu(n,e){const t=new Set(vt(n).map(r=>r.id));if(!t.has(e))return e;let i=2;for(;t.has(`${e}-${i}`);)i+=1;return`${e}-${i}`}const Yu={bohrungen:{durchmesser:6},steg:{hoehe:30}};function Bv(){return $t("halter","teil","Halter",{material:"PLA"},[$t("skizze","skizze","Skizze",{ebene:"XY",laenge:ct(80),breite:ct(50),eckradius:ct(3)}),$t("grundplatte","extrusion","Grundplatte",{laenge:ct(80),breite:ct(50),dicke:ct(8),eckradius:ct(3)}),$t("steg","extrusion","Steg",{laenge:ct(60),breite:ct(10),hoehe:ct(30),lage_y:ct(20)}),$t("bohrungen","bohrung","Bohrungen",{durchmesser:ct(6),abstand_x:ct(25),lage_y:ct(-7.5)})])}function Vv(){return $t("sensorgehaeuse","baugruppe","Sensorgehäuse",{},[$t("baugruppe-1","baugruppe","Baugruppe 1",{},[$t("gehaeuse","teil","Gehäuse",{material:"PLA",lage_x:ct(0)},[$t("schale","schale","Schale",{laenge:ct(80),breite:ct(50),hoehe:ct(30),wand:ct(2)})])]),$t("deckel","teil","Deckel",{material:"PLA",lage_x:ct(100)},[$t("platte","extrusion","Platte",{laenge:ct(80),breite:ct(50),hoehe:ct(4)})])])}const Hv=()=>$t("teil-1","teil","Teil 1",{material:"PLA"},[]),Ku=n=>$t("projekt","projekt","Projekt",{},n),Fs=()=>Ku([Bv(),Vv()]),Cc=()=>Ku([Hv()]),Gv=.00124,Wv=1-Math.PI/4,Pc=50,zc=n=>!!n&&!St(n);function ks(n){const e=[];for(const t of vt(n))St(t)||(t.type==="bohrung"&&Ye(t.params.durchmesser)>=Pc&&e.push({elementId:t.id,schluessel:"befund.bohrung-zu-gross",parameter:"durchmesser",wert:Ye(t.params.durchmesser),grenze:Pc}),t.id==="steg"&&Ye(t.params.hoehe)<=0&&e.push({elementId:t.id,schluessel:"befund.steg-ohne-hoehe",parameter:"hoehe",wert:Ye(t.params.hoehe),grenze:0}));return e}function Lc(n,e,t){return t.has(n.id)?Yu[n.id]?.[e]??Ye(n.params[e]):Ye(n.params[e])}function Xv(n,e,t,i){const r=Ye(n.params.laenge),s=Ye(n.params.breite),a=Ye(n.params.lage_y);return{min:[e[0]-r/2,e[1]+a-s/2,e[2]+t],max:[e[0]+r/2,e[1]+a+s/2,e[2]+t+i]}}function Wn(n){const e=new Set(ks(n).map(d=>d.elementId)),t=[];let i=0;const r=d=>[Ye(d.params.lage_x),Ye(d.params.lage_y),0];function s(d,f){const u=d.content.filter(m=>zc(m));let h=0;for(const m of u)if(m.type==="skizze"){const _=Ye(m.params.laenge),g=Ye(m.params.breite);t.push({elementId:m.id,art:"skizze",min:[f[0]-_/2,f[1]-g/2,0],max:[f[0]+_/2,f[1]+g/2,0],platte:{laenge:_,breite:g,dicke:0,eckradius:Ye(m.params.eckradius),loecher:[],lochD:0}})}for(const m of u)if(m.type==="extrusion"&&m.params.dicke!==void 0){const _=m.id==="grundplatte",g=Ye(m.params.dicke),p=Ye(m.params.laenge),w=Ye(m.params.breite),T=Ye(m.params.eckradius),S=f[1]+Ye(m.params.lage_y);_&&(h=g);const M=_?u.find(z=>z.type==="bohrung"):void 0,E=M?Lc(M,"durchmesser",e):0,C=M?Ye(M.params.abstand_x):0,x=M?Ye(M.params.lage_y):0,k=M?[{x:f[0]+C,y:S+x},{x:f[0]-C,y:S+x}]:[];if(t.push({elementId:m.id,art:"platte",min:[f[0]-p/2,S-w/2,f[2]],max:[f[0]+p/2,S+w/2,f[2]+g],platte:{laenge:p,breite:w,dicke:g,eckradius:T,loecher:k,lochD:E}}),i+=(p*w-4*T*T*Wv)*g,M){i-=k.length*Math.PI*(E/2)**2*g;for(const z of k)t.push({elementId:M.id,art:"rohr",min:[z.x-E/2,z.y-E/2,f[2]],max:[z.x+E/2,z.y+E/2,f[2]+g],rohr:{x:z.x,y:z.y,d:E}})}}for(const m of u)if(m.type==="extrusion"&&m.params.dicke===void 0){const _=m.params.hoehe!==void 0?Lc(m,"hoehe",e):0,g=Xv(m,f,h,_);t.push({elementId:m.id,art:"quader",min:g.min,max:g.max}),i+=Ye(m.params.laenge)*Ye(m.params.breite)*_}else if(m.type==="schale"){const _=Ye(m.params.laenge),g=Ye(m.params.breite),p=Ye(m.params.hoehe),w=Ye(m.params.wand);t.push({elementId:m.id,art:"schale",min:[f[0]-_/2,f[1]-g/2,f[2]],max:[f[0]+_/2,f[1]+g/2,f[2]+p],wand:w}),i+=_*g*p-(_-2*w)*(g-2*w)*(p-w)}}const a=vt(n).filter(d=>d.type==="teil"&&zc(d)),o=new Set;for(const d of a)$v(n,d)||(o.add(d.id),s(d,r(d)));const l=[0,0,0],c=t.filter(d=>d.art!=="skizze"&&d.art!=="rohr");if(c.length)for(let d=0;d<3;d++)l[d]=Math.max(...c.map(f=>f.max[d]))-Math.min(...c.map(f=>f.min[d]));return{koerper:t,volumen_mm3:i,masse_g:i*Gv,abmessungen_mm:l,befunde:ks(n)}}function $v(n,e){for(const t of vt(n))if(St(t)&&Ui(t).some(i=>i.id===e.id))return!0;return!1}function Dc(n,e){const t=new Set([n.id,...Ui(n).map(o=>o.id)]),i=e.filter(o=>t.has(o.elementId)&&o.art!=="skizze"),r=i.length?i:e.filter(o=>t.has(o.elementId));if(!r.length)return null;const s=[1/0,1/0,1/0],a=[-1/0,-1/0,-1/0];for(const o of r)for(let l=0;l<3;l++)s[l]=Math.min(s[l],o.min[l]),a[l]=Math.max(a[l],o.max[l]);return{min:s,max:a}}const qv=JSON.parse('[{"id":"element.anlegen","familie":"Datei","titel":"befehl.element.anlegen","parameter":{"typ":{"typ":"wahl"}},"bezug":"keine","rang":101,"wesentlich":true,"untergruppe":"Neu","kontext":true},{"id":"dokument.oeffnen","familie":"Datei","titel":"befehl.dokument.oeffnen","parameter":{},"bezug":"keine","rang":102,"wesentlich":true,"untergruppe":"Öffnen","folgt":true},{"id":"wurzel.setzen","familie":"Datei","titel":"befehl.wurzel.setzen","parameter":{},"bezug":"element","rang":103,"wesentlich":true,"untergruppe":"Öffnen","folgt":true},{"id":"einstellungen.oeffnen","familie":"Datei","titel":"befehl.einstellungen.oeffnen","parameter":{},"bezug":"keine","rang":104,"wesentlich":true,"untergruppe":"Projekt","folgt":true},{"id":"dokument.schliessen","familie":"Datei","titel":"befehl.dokument.schliessen","parameter":{},"bezug":"keine","rang":105,"wesentlich":false,"untergruppe":"Öffnen","folgt":true},{"id":"projekt.teilen","familie":"Datei","titel":"befehl.projekt.teilen","parameter":{},"bezug":"keine","rang":106,"wesentlich":false,"untergruppe":"Projekt","folgt":true},{"id":"projekt.einladen","familie":"Datei","titel":"befehl.projekt.einladen","parameter":{},"bezug":"keine","rang":107,"wesentlich":false,"untergruppe":"Projekt","folgt":true},{"id":"bearbeiten.rueckgaengig","familie":"Bearbeiten","titel":"befehl.bearbeiten.rueckgaengig","parameter":{},"bezug":"keine","rang":108,"wesentlich":true,"untergruppe":"Verlauf","kuerzel":"Mod+Z","kontext":true},{"id":"bearbeiten.wiederholen","familie":"Bearbeiten","titel":"befehl.bearbeiten.wiederholen","parameter":{},"bezug":"keine","rang":109,"wesentlich":true,"untergruppe":"Verlauf","kuerzel":"Mod+Umschalt+Z","kontext":true},{"id":"element.duplizieren","handlung":"duplizieren","familie":"Bearbeiten","titel":"befehl.element.duplizieren","parameter":{},"bezug":"element","rang":1,"wesentlich":true,"untergruppe":"Element","kuerzel":"Mod+D"},{"id":"element.umbenennen","familie":"Bearbeiten","titel":"befehl.element.umbenennen","parameter":{"name":{"typ":"text"}},"bezug":"element","rang":2,"wesentlich":true,"untergruppe":"Element","kuerzel":"F2"},{"id":"element.verwerfen","handlung":"verwerfen","familie":"Bearbeiten","titel":"befehl.element.verwerfen","parameter":{"element":{"typ":"element","pflicht":true}},"bezug":"element","rang":3,"wesentlich":true,"untergruppe":"Element","kuerzel":"Entf","ki":true},{"id":"auswahl.duplizieren","handlung":"duplizieren","familie":"Bearbeiten","titel":"befehl.auswahl.duplizieren","parameter":{},"bezug":"mehrfach","rang":12,"wesentlich":true,"untergruppe":"Element"},{"id":"auswahl.verwerfen","handlung":"verwerfen","familie":"Bearbeiten","titel":"befehl.auswahl.verwerfen","parameter":{},"bezug":"mehrfach","rang":13,"wesentlich":true,"untergruppe":"Element"},{"id":"element.zurueckholen","familie":"Bearbeiten","titel":"befehl.element.zurueckholen","parameter":{},"bezug":"verworfen","rang":7,"wesentlich":true,"untergruppe":"Element"},{"id":"element.wert-setzen","familie":"Bearbeiten","titel":"befehl.element.wert-setzen","parameter":{"element":{"typ":"referenz"},"name":{"typ":"text"},"wert":{"dimension":"laenge","einheit":"mm"}},"bezug":"element","rang":11,"wesentlich":true,"untergruppe":"Werte"},{"id":"element.parameter-anlegen","familie":"Bearbeiten","titel":"befehl.element.parameter-anlegen","parameter":{},"bezug":"element","rang":117,"wesentlich":false,"untergruppe":"Werte","folgt":true},{"id":"bearbeiten.einfuegen","familie":"Bearbeiten","titel":"befehl.bearbeiten.einfuegen","parameter":{},"bezug":"keine","rang":118,"wesentlich":false,"untergruppe":"Element","folgt":true},{"id":"element.pausieren","familie":"Bearbeiten","titel":"befehl.element.pausieren","parameter":{},"bezug":"element","rang":119,"wesentlich":false,"untergruppe":"Berechnung"},{"id":"element.fortsetzen","familie":"Bearbeiten","titel":"befehl.element.fortsetzen","parameter":{},"bezug":"element","rang":120,"wesentlich":false,"untergruppe":"Berechnung"},{"id":"auswahl.alles","familie":"Auswahl","titel":"befehl.auswahl.alles","parameter":{},"bezug":"keine","rang":121,"wesentlich":true,"untergruppe":"Auswahl","kuerzel":"Mod+A","kontext":true},{"id":"auswahl.aufheben","familie":"Auswahl","titel":"befehl.auswahl.aufheben","parameter":{},"bezug":"mehrfach","rang":122,"wesentlich":true,"untergruppe":"Auswahl"},{"id":"auswahl.umkehren","familie":"Auswahl","titel":"befehl.auswahl.umkehren","parameter":{},"bezug":"keine","rang":123,"wesentlich":false,"untergruppe":"Auswahl","kontext":true},{"id":"auswahl.setzen","familie":"Auswahl","titel":"befehl.auswahl.setzen","parameter":{"elemente":{"typ":"referenz"}},"bezug":"keine","rang":124,"wesentlich":false,"untergruppe":"Befehle","folgt":true},{"id":"auswahl.hinzufuegen","familie":"Auswahl","titel":"befehl.auswahl.hinzufuegen","parameter":{"elemente":{"typ":"referenz"}},"bezug":"keine","rang":125,"wesentlich":false,"untergruppe":"Befehle","folgt":true},{"id":"auswahl.umschalten","familie":"Auswahl","titel":"befehl.auswahl.umschalten","parameter":{"elemente":{"typ":"referenz"}},"bezug":"keine","rang":126,"wesentlich":false,"untergruppe":"Befehle","folgt":true},{"id":"auswahl.aehnliche","familie":"Auswahl","titel":"befehl.auswahl.aehnliche","parameter":{},"bezug":"element","rang":127,"wesentlich":false,"untergruppe":"Regeln","folgt":true},{"id":"auswahl.kantenschleife","familie":"Auswahl","titel":"befehl.auswahl.kantenschleife","parameter":{},"bezug":"kante","rang":128,"wesentlich":false,"untergruppe":"Regeln","folgt":true},{"id":"ansicht.einpassen","familie":"Ansicht","titel":"befehl.ansicht.einpassen","parameter":{},"bezug":"keine","rang":129,"wesentlich":true,"untergruppe":"Blick","kontext":true},{"id":"ansicht.auf-auswahl","familie":"Ansicht","titel":"befehl.ansicht.auf-auswahl","parameter":{},"bezug":"keine","rang":5,"wesentlich":true,"untergruppe":"Blick","kuerzel":"F","kontext":true},{"id":"ansicht.projektion","familie":"Ansicht","titel":"befehl.ansicht.projektion","parameter":{},"bezug":"keine","rang":131,"wesentlich":true,"untergruppe":"Blick","kontext":true},{"id":"ansicht.vorne","familie":"Ansicht","titel":"befehl.ansicht.vorne","parameter":{},"bezug":"keine","rang":132,"wesentlich":false,"untergruppe":"Blick"},{"id":"ansicht.oben","familie":"Ansicht","titel":"befehl.ansicht.oben","parameter":{},"bezug":"keine","rang":133,"wesentlich":false,"untergruppe":"Blick"},{"id":"ansicht.isometrisch","familie":"Ansicht","titel":"befehl.ansicht.isometrisch","parameter":{},"bezug":"keine","rang":134,"wesentlich":false,"untergruppe":"Blick"},{"id":"ansicht.schnitt","familie":"Ansicht","titel":"befehl.ansicht.schnitt","parameter":{},"bezug":"keine","rang":135,"wesentlich":false,"untergruppe":"Blick","folgt":true},{"id":"darstellung.wechseln","familie":"Ansicht","titel":"befehl.darstellung.wechseln","parameter":{},"bezug":"keine","rang":136,"wesentlich":true,"untergruppe":"Darstellung","kuerzel":"W","kontext":true},{"id":"ansicht.isolieren","familie":"Ansicht","titel":"befehl.ansicht.isolieren","parameter":{},"bezug":"keine","rang":137,"wesentlich":true,"untergruppe":"Darstellung","kontext":true},{"id":"ansicht.alles-einblenden","familie":"Ansicht","titel":"befehl.ansicht.alles-einblenden","parameter":{},"bezug":"keine","rang":138,"wesentlich":true,"untergruppe":"Darstellung","kuerzel":"Alt+H","kontext":true},{"id":"ansicht.verworfenes","familie":"Ansicht","titel":"befehl.ansicht.verworfenes","parameter":{},"bezug":"keine","rang":139,"wesentlich":false,"untergruppe":"Darstellung"},{"id":"ansicht.ergebnis","familie":"Ansicht","titel":"befehl.ansicht.ergebnis","parameter":{},"bezug":"keine","rang":140,"wesentlich":false,"untergruppe":"Stand","folgt":true},{"id":"ansicht.alle-entwuerfe","familie":"Ansicht","titel":"befehl.ansicht.alle-entwuerfe","parameter":{},"bezug":"keine","rang":141,"wesentlich":false,"untergruppe":"Stand","folgt":true},{"id":"element.ausblenden","handlung":"ausblenden","familie":"Sichtbarkeit","titel":"befehl.element.ausblenden","parameter":{"element":{"typ":"element","pflicht":true}},"bezug":"element","rang":4,"wesentlich":true,"untergruppe":"Sichtbarkeit","kuerzel":"H","ki":true},{"id":"element.einblenden","familie":"Sichtbarkeit","titel":"befehl.element.einblenden","parameter":{},"bezug":"element","rang":8,"wesentlich":true,"untergruppe":"Sichtbarkeit"},{"id":"auswahl.ausblenden","handlung":"ausblenden","familie":"Sichtbarkeit","titel":"befehl.auswahl.ausblenden","parameter":{},"bezug":"mehrfach","rang":14,"wesentlich":true,"untergruppe":"Sichtbarkeit"},{"id":"sichtbarkeit.nur-dieses","familie":"Sichtbarkeit","titel":"befehl.sichtbarkeit.nur-dieses","parameter":{},"bezug":"element","rang":145,"wesentlich":false,"untergruppe":"Sichtbarkeit","folgt":true},{"id":"sichtbarkeit.farbe-setzen","familie":"Sichtbarkeit","titel":"befehl.sichtbarkeit.farbe-setzen","parameter":{},"bezug":"element","rang":146,"wesentlich":false,"untergruppe":"Sichtbarkeit","folgt":true},{"id":"ansicht.speichern","familie":"Ansicht speichern","titel":"befehl.ansicht.speichern","parameter":{"name":{"typ":"text"}},"bezug":"keine","rang":147,"wesentlich":false,"untergruppe":"Gespeichert","kontext":true},{"id":"ansicht.anwenden","familie":"Ansicht speichern","titel":"befehl.ansicht.anwenden","parameter":{},"bezug":"ansicht","rang":9,"wesentlich":true,"untergruppe":"Gespeichert"},{"id":"fenster.struktur","familie":"Fenster","titel":"befehl.fenster.struktur","parameter":{},"bezug":"keine","rang":149,"wesentlich":true,"untergruppe":"Zonen","kuerzel":"Mod+B"},{"id":"fenster.panel","familie":"Fenster","titel":"befehl.fenster.panel","parameter":{},"bezug":"keine","rang":150,"wesentlich":true,"untergruppe":"Zonen","kuerzel":"Mod+J"},{"id":"fenster.rechts","familie":"Fenster","titel":"befehl.fenster.rechts","parameter":{},"bezug":"keine","rang":151,"wesentlich":true,"untergruppe":"Zonen","kuerzel":"Mod+Alt+B"},{"id":"fenster.naechste-zone","familie":"Fenster","titel":"befehl.fenster.naechste-zone","parameter":{},"bezug":"keine","rang":152,"wesentlich":false,"untergruppe":"Zonen","kuerzel":"F6"},{"id":"suche.oeffnen","familie":"Fenster","titel":"befehl.suche.oeffnen","parameter":{},"bezug":"keine","rang":153,"wesentlich":true,"untergruppe":"Suche","kuerzel":"Mod+K"},{"id":"fenster.teilen","familie":"Fenster","titel":"befehl.fenster.teilen","parameter":{},"bezug":"keine","rang":154,"wesentlich":false,"untergruppe":"Fenster","folgt":true},{"id":"thema.umschalten","familie":"Fenster","titel":"befehl.thema.umschalten","parameter":{},"bezug":"keine","rang":155,"wesentlich":false,"untergruppe":"Einstellungen"},{"id":"einstellung.navigationsprofil","familie":"Fenster","titel":"befehl.einstellung.navigationsprofil","parameter":{"profil":{"typ":"wahl"}},"bezug":"keine","rang":156,"wesentlich":false,"untergruppe":"Einstellungen"},{"id":"katalog.oeffnen","familie":"Hilfe","titel":"befehl.katalog.oeffnen","parameter":{},"bezug":"keine","rang":157,"wesentlich":false,"untergruppe":"Hilfe"},{"id":"hilfe.befehle-zeigen","familie":"Hilfe","titel":"befehl.hilfe.befehle-zeigen","parameter":{},"bezug":"keine","rang":158,"wesentlich":false,"untergruppe":"Hilfe"},{"id":"hilfe.einfuehrung","familie":"Hilfe","titel":"befehl.hilfe.einfuehrung","parameter":{},"bezug":"keine","rang":159,"wesentlich":false,"untergruppe":"Hilfe","folgt":true},{"id":"element.umhaengen","familie":"Baugruppe","titel":"befehl.element.umhaengen","parameter":{"ziel":{"typ":"referenz"}},"bezug":"teil","rang":10,"wesentlich":true,"untergruppe":"Hierarchie"},{"id":"element.aktivieren","familie":"Baugruppe","titel":"befehl.element.aktivieren","parameter":{},"bezug":"teil","rang":6,"wesentlich":true,"untergruppe":"Hierarchie"},{"id":"element.verlassen","familie":"Baugruppe","titel":"befehl.element.verlassen","parameter":{},"bezug":"keine","rang":162,"wesentlich":true,"untergruppe":"Hierarchie","kontext":true},{"id":"baugruppe.anlegen","familie":"Baugruppe","titel":"befehl.baugruppe.anlegen","parameter":{},"bezug":"keine","rang":163,"wesentlich":false,"untergruppe":"Hierarchie","kontext":true},{"id":"baugruppe.instanz-anlegen","familie":"Baugruppe","titel":"befehl.baugruppe.instanz-anlegen","parameter":{},"bezug":"baugruppe","rang":164,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"baugruppe.variante-waehlen","familie":"Baugruppe","titel":"befehl.baugruppe.variante-waehlen","parameter":{},"bezug":"baugruppe","rang":165,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"verbindung.anlegen","familie":"Baugruppe","titel":"befehl.verbindung.anlegen","parameter":{},"bezug":"baugruppe","rang":166,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"verbindung.verbindungspunkt-setzen","familie":"Baugruppe","titel":"befehl.verbindung.verbindungspunkt-setzen","parameter":{},"bezug":"baugruppe","rang":167,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"verbindung.bewegen","familie":"Baugruppe","titel":"befehl.verbindung.bewegen","parameter":{},"bezug":"baugruppe","rang":168,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"baugruppe.kollision-pruefen","familie":"Baugruppe","titel":"befehl.baugruppe.kollision-pruefen","parameter":{},"bezug":"baugruppe","rang":169,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"baugruppe.fixieren","familie":"Baugruppe","titel":"befehl.baugruppe.fixieren","parameter":{},"bezug":"teil","rang":170,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"baugruppe.komponente-anlegen","familie":"Baugruppe","titel":"befehl.baugruppe.komponente-anlegen","parameter":{},"bezug":"teil","rang":171,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"simulation.lager","familie":"Simulation","titel":"befehl.simulation.lager","parameter":{},"bezug":"keine","rang":172,"wesentlich":true,"untergruppe":"Studie","folgt":true},{"id":"simulation.kraft","familie":"Simulation","titel":"befehl.simulation.kraft","parameter":{},"bezug":"keine","rang":173,"wesentlich":true,"untergruppe":"Studie","folgt":true},{"id":"simulation.ergebnis","familie":"Simulation","titel":"befehl.simulation.ergebnis","parameter":{},"bezug":"keine","rang":174,"wesentlich":true,"untergruppe":"Studie","folgt":true},{"id":"chat.senden","familie":"Chat","titel":"befehl.chat.senden","parameter":{},"bezug":"keine","rang":175,"wesentlich":true,"untergruppe":"Chat"},{"id":"chat.uebernehmen","familie":"Chat","titel":"befehl.chat.uebernehmen","parameter":{},"bezug":"keine","rang":176,"wesentlich":true,"untergruppe":"Chat"},{"id":"chat.verwerfen","familie":"Chat","titel":"befehl.chat.verwerfen","parameter":{},"bezug":"keine","rang":177,"wesentlich":true,"untergruppe":"Chat"},{"id":"ki.anbieter-waehlen","familie":"Chat","titel":"befehl.ki.anbieter-waehlen","parameter":{"id":{"typ":"text"}},"bezug":"keine","rang":177.5,"wesentlich":false,"untergruppe":"Chat"},{"id":"task.wechseln","familie":"Fenster","titel":"befehl.task.wechseln","parameter":{},"bezug":"keine","rang":178,"wesentlich":false,"untergruppe":"Zonen"},{"id":"dokument.wechseln","familie":"Fenster","titel":"befehl.dokument.wechseln","parameter":{},"bezug":"keine","rang":179,"wesentlich":false,"untergruppe":"Zonen"},{"id":"referenz.koordinatensystem","familie":"Referenz","titel":"befehl.referenz.koordinatensystem","parameter":{"x":{"dimension":"length","einheit":"mm"},"y":{"dimension":"length","einheit":"mm"},"z":{"dimension":"length","einheit":"mm"},"rx":{"dimension":"angle","einheit":"deg"},"ry":{"dimension":"angle","einheit":"deg"},"rz":{"dimension":"angle","einheit":"deg"},"parent":{"typ":"referenz","ausgang":"frame"},"name":{"typ":"text"}},"bezug":"keine","rang":0.5,"wesentlich":true,"untergruppe":"Koordinatensystem","ki":true},{"id":"referenz.punkt","familie":"Referenz","titel":"befehl.referenz.punkt","parameter":{"x":{"dimension":"length","einheit":"mm"},"y":{"dimension":"length","einheit":"mm"},"z":{"dimension":"length","einheit":"mm"},"frame":{"typ":"referenz","ausgang":"frame"},"name":{"typ":"text"}},"bezug":"keine","rang":0.6,"wesentlich":true,"untergruppe":"Punkt","ki":true},{"id":"referenz.punkt-relativ","familie":"Referenz","titel":"befehl.referenz.punkt-relativ","parameter":{"ref":{"typ":"referenz","ausgang":"point","pflicht":true},"x":{"dimension":"length","einheit":"mm"},"y":{"dimension":"length","einheit":"mm"},"z":{"dimension":"length","einheit":"mm"},"name":{"typ":"text"}},"bezug":"punkt","rang":0.1,"wesentlich":true,"untergruppe":"Punkt","ki":true},{"id":"referenz.gerade","familie":"Referenz","titel":"befehl.referenz.gerade","parameter":{"a":{"typ":"referenz","ausgang":"point","pflicht":true},"b":{"typ":"referenz","ausgang":"point","pflicht":true},"name":{"typ":"text"}},"bezug":"punkte","rang":0.2,"wesentlich":true,"untergruppe":"Linie","ki":true},{"id":"referenz.halbgerade","familie":"Referenz","titel":"befehl.referenz.halbgerade","parameter":{"a":{"typ":"referenz","ausgang":"point","pflicht":true},"b":{"typ":"referenz","ausgang":"point","pflicht":true},"name":{"typ":"text"}},"bezug":"punkte","rang":0.3,"wesentlich":false,"untergruppe":"Linie","ki":true},{"id":"referenz.strecke","familie":"Referenz","titel":"befehl.referenz.strecke","parameter":{"a":{"typ":"referenz","ausgang":"point","pflicht":true},"b":{"typ":"referenz","ausgang":"point","pflicht":true},"name":{"typ":"text"}},"bezug":"punkte","rang":0.4,"wesentlich":true,"untergruppe":"Linie","ki":true}]'),Yv={befehle:qv},ar=12,Kv=["Bearbeiten","Auswahl","Baugruppe","Sichtbarkeit","Ansicht","Ansicht speichern","Datei","Fenster","Hilfe","Simulation","Chat","Referenz"],Zv={Datei:"start-menue",Bearbeiten:"dropdown",Auswahl:"dropdown",Baugruppe:"dropdown",Simulation:"dropdown",Referenz:"dropdown",Ansicht:"ansichtsleiste","Ansicht speichern":"ansichtsleiste",Sichtbarkeit:"auge",Fenster:"menueleiste"};function Jv(n){if(n.folgt)return["suche-folgt"];const e=["suche","alle-befehle"],t=Zv[n.familie];return t&&e.push(t),!Ju(n)&&(n.bezug!=="keine"||n.kontext)&&e.push("kontextmenue"),e}const Fi=Yv.befehle;function Qv(n){return(Array.isArray(n)?n:n.befehle??[]).map((t,i)=>({id:String(t.id),familie:t.familie??"Hilfe",titel:t.titel??String(t.id),parameter:t.parameter??{},bezug:t.bezug??"keine",rang:t.rang??1e3+i,wesentlich:t.wesentlich??!1,kuerzel:t.kuerzel,untergruppe:t.untergruppe,kontext:t.kontext,folgt:t.folgt,handlung:t.handlung,ki:t.ki}))}const Zu={keine:new Set(["keine"]),schritt:new Set(["keine","element"]),teil:new Set(["keine","element","teil"]),baugruppe:new Set(["keine","element","baugruppe"]),kante:new Set(["keine","kante"]),mehrfach:new Set(["keine","mehrfach"]),verworfen:new Set(["keine","element","verworfen"]),ansicht:new Set(["keine","element","ansicht"]),punkt:new Set(["keine","element","punkt"]),punkte:new Set(["keine","mehrfach","punkte"])};function jv(n,e){const t=new Map;for(const r of n.filter(s=>s.familie===e)){const s=r.untergruppe??"Weitere";t.set(s,[...t.get(s)??[],r])}const i=[];for(const[r,s]of t)for(let a=0;a<s.length;a+=ar)i.push({name:a===0?r:`${r} ${Math.floor(a/ar)+1}`,eintraege:s.slice(a,a+ar)});return i}const Ic=8,e_=new Set(["bearbeiten.rueckgaengig","bearbeiten.wiederholen","fenster.struktur","fenster.panel","fenster.rechts","suche.oeffnen"]),t_=["ansicht.einpassen","ansicht.auf-auswahl","ansicht.isolieren","ansicht.alles-einblenden","ansicht.projektion","darstellung.wechseln"],n_=new Set(["Ansicht","Fenster"]),i_=new Set(["bearbeiten.rueckgaengig","bearbeiten.wiederholen"]),Ju=n=>n_.has(n.familie)||i_.has(n.id);function r_(n,e,t){if(!e.handlung)return!0;const i=n.filter(s=>s.handlung===e.handlung&&!s.folgt);return(i.find(s=>Zu[t].has(s.bezug))??i.find(s=>s.bezug==="element")??e)===e}function Nc(n,e){const t=[...new Set([...Kv,...n.map(r=>r.familie)])],i=[];for(const r of t){const s=n.filter(a=>a.familie===r);for(let a=0;a<s.length;a+=e?ar:s.length||1)i.push({familie:r,eintraege:s.slice(a,a+(e?ar:s.length))})}return i.filter(r=>r.eintraege.length)}function xr(n,e,t=()=>!0){const i=n.filter(r=>!r.folgt&&!Ju(r)&&Zu[e].has(r.bezug)&&(r.bezug!=="keine"||r.kontext)&&t(r)).sort((r,s)=>r.rang-s.rang);return{kandidaten:i,sichtbar:Nc(i.slice(0,Ic),!1),mehr:Nc(i.slice(Ic),!0)}}const s_=5;function zo(n){return n.kandidaten.slice(0,s_)}const a_={titel:"profil.standard",maus:{drehen:[{taste:2}],verschieben:[{taste:1},{taste:2,umschalt:!0}],zoomen:[{rad:!0}]},trackpad:{drehen:[{wischen:!0}],verschieben:[{wischen:!0,umschalt:!0}],zoomen:[{spreizen:!0}]},touch:{drehen:[{finger:1}],verschieben:[{finger:2,ziehen:!0}],zoomen:[{finger:2,spreizen:!0}]}},o_={titel:"profil.solidworks",maus:{drehen:[{taste:1}],verschieben:[{taste:1,strg:!0}],zoomen:[{rad:!0}]},trackpad:{drehen:[{wischen:!0}],verschieben:[{wischen:!0,umschalt:!0}],zoomen:[{spreizen:!0}]},touch:{drehen:[{finger:1}],verschieben:[{finger:2,ziehen:!0}],zoomen:[{finger:2,spreizen:!0}]}},Qu={standard:a_,solidworks:o_},or={frame:{frame:"frame",origin:"point",x:"line",y:"line",z:"line",xy:"plane",yz:"plane",zx:"plane"},point:{point:"point"},axis:{line:"line"},plane:{plane:"plane"},line:{line:"line"},ray:{ray:"ray",start:"point"},segment:{segment:"segment",start:"point",end:"point"}},l_={frame:{x:"length",y:"length",z:"length",rx:"angle",ry:"angle",rz:"angle"},point:{x:"length",y:"length",z:"length"}},br=n=>n in or,Uc=1e4,c_=100,u_=50,Ea=6,Mt=n=>!Array.isArray(n)||n.length!==3?null:n.map(e=>Number(e.value)),Zt=(n,e,t=1)=>[n[0]+e[0]*t,n[1]+e[1]*t,n[2]+e[2]*t],h_=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Aa=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],d_=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],ju=n=>JSON.stringify(n,(e,t)=>t&&typeof t=="object"&&!Array.isArray(t)?Object.fromEntries(Object.entries(t).sort(([i],[r])=>i<r?-1:i>r?1:0)):t);function el(n){return{id:n.id,type:n.type,inputs:{...n.inputs??{}},params:n.params,outputs:{...or[n.type]??{}},content:n.content.filter(e=>br(e.type)).map(el),meta:n.meta}}function Gi(n){const e=[],t=i=>{for(const r of i.content)br(r.type)?e.push(r):t(r)};return t(n),e}const eh=n=>ju(n.map(el));async function th(n){const e={schema_version:1,elements:JSON.parse(n)};try{const i=await(await fetch("kernel",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json();return i.befunde?.some(r=>r.code==="kernel_unavailable")?null:i}catch{return null}}function Fc(n){if(!n)return null;if(n.type==="point")return Mt(n.position);const e={};for(const t of["origin","direction","start","end","normal","x_direction"]){const i=Mt(n[t]);i&&(e[t]=i)}return e}class f_{constructor(e){this.app=e}ergebnis=null;geister=[];vorrat=new Map;vormerken(e,t){this.vorrat.set(e,t),this.vorrat.size>8&&this.vorrat.delete(this.vorrat.keys().next().value)}ergebnisSchluessel="";laeuft="";nummer=0;bruecke=null;brueckeFrage=null;nichtErreichbar=null;modus=null;feldFokus=null;einpassen=!1;graph(){return Gi(this.app.dokument())}aktiv(){return this.graph().length>0}schluessel(){return ju(this.graph().map(el))}anstossen(){if(!this.aktiv())return;const e=this.schluessel();if(e===this.ergebnisSchluessel||e===this.laeuft||this.nichtErreichbar?.schluessel===e)return;const t=this.vorrat.get(e);if(t){this.nummer+=1,this.laeuft="",this.ergebnis=t,this.ergebnisSchluessel=e,this.nichtErreichbar=null,this.app.rendern();return}this.laeuft=e;const i=this.nummer+=1;this.rechnen(e,i)}bereit(){if(!this.aktiv())return!0;const e=this.schluessel();return e===this.ergebnisSchluessel||this.nichtErreichbar?.schluessel===e}brueckeDa(){return this.bruecke!==null?Promise.resolve(this.bruecke):(this.brueckeFrage??=fetch("kernel-status.json",{cache:"no-store"}).then(e=>e.ok?e.json():{bruecke:!1}).then(e=>this.bruecke=e.bruecke===!0).catch(()=>this.bruecke=!1),this.brueckeFrage)}async rechnen(e,t){let i=null,r="";if(await this.brueckeDa()?(i=await th(e),i||(r="Worker")):r="keine Brücke",t===this.nummer){if(this.laeuft="",i){const s=this.befundZahl(i)>this.befundZahl(this.ergebnis);this.ergebnis=i,this.ergebnisSchluessel=e,this.nichtErreichbar=null,s&&(this.app.zonen.panel=!0)}else this.nichtErreichbar={schluessel:e,text:r},this.app.zonen.panel=!0;this.app.rendern()}}befundZahl(e){return e?e.results.filter(t=>t.state==="fehlerhaft").length:0}resultat(e){return this.ergebnis?.results.find(t=>t.id===e)}befunde(){if(!this.aktiv())return[];const e=[],t=new Set(vt(this.app.dokument()).map(i=>i.id));if(this.nichtErreichbar&&this.nichtErreichbar.schluessel===this.schluessel()){const i=this.graph().filter(s=>!St(s)),r=i[i.length-1];return r&&e.push({elementId:r.id,code:"kernel_unavailable",schluessel:"kernel.befund.kernel_unavailable",text:this.app.t("kernel.befund.kernel_unavailable")}),e}if(this.ergebnisSchluessel!==this.schluessel()&&!this.ergebnis)return e;for(const i of this.ergebnis?.results??[]){if(i.state!=="fehlerhaft"||!t.has(i.id))continue;const r=ut(this.app.dokument(),i.id);if(!(!r||St(r)))for(const s of i.befunde)e.push({elementId:i.id,code:s.code,schluessel:`kernel.befund.${s.code}`,text:this.app.t(`kernel.befund.${s.code}`,{bezug:s.bezug?this.app.name(s.bezug):""})})}return e}haupt(e){const t=this.resultat(e.id);if(!t||t.state!=="aktuell")return null;const i={frame:"origin",axis:"line",plane:"plane"}[e.type]??e.type;return t.outputs[i]??null}artVon(e){return{frame:"koordinatensystem",point:"punkt",axis:"achse",plane:"ebene"}[e.type]??"linie"}lage(e){const t=this.haupt(e);if(!t)return null;if(t.type==="point")return Mt(t.position);const i={};for(const r of["origin","direction","start","end","normal","x_direction"]){const s=Mt(t[r]);s&&(i[r]=s)}return i}szene(){if(!this.ergebnis)return[];const e=new Set(this.ergebnis.results.map(i=>i.id)),t=[];for(const i of vt(this.app.dokument()))!br(i.type)||St(i)||!e.has(i.id)||this.verworfenerVorfahre(i.id)||t.push({element:i.id,art:this.artVon(i),sichtbar:!this.app.istAusgeblendet(i.id)&&!this.app.versteckteIds().has(i.id),lage_mm:this.lage(i)});return t}verworfenerVorfahre(e){const t=this.app.dokument(),i=[],r=s=>{if(s.id===e)return!0;for(const a of s.content){if(i.push(a),r(a))return!0;i.pop()}return!1};return r(t),i.slice(0,-1).some(St)}zeichnung(){const e=new Set(this.app.auswahlIds()),t=[];for(const i of this.szene()){if(!i.sichtbar||!i.lage_mm)continue;const r=ut(this.app.dokument(),i.element),s=this.geometrie(r);s&&t.push({element:i.element,art:i.art,punkte:s,token:this.token(r),gewaehlt:e.has(i.element),fehlerhaft:this.app.istFehlerhaft(i.element)})}return t}geisterZeichnung(){return this.geister.map(e=>({element:`${e.element}~geist`,art:e.punkte.length===1?"punkt":"linie",punkte:e.punkte,token:"akzent",gewaehlt:!1,fehlerhaft:!1,geist:!0}))}token(e){if(e.type==="axis"){const t=String(e.inputs?.of??"").split(".")[1];if(t==="x"||t==="y"||t==="z")return`achse.${t}`}return"text"}geometrie(e){const t=this.haupt(e);if(!t)return null;if(t.type==="point"){const i=Mt(t.position);return i?[i]:null}if(t.type==="segment"){const i=Mt(t.start),r=Mt(t.end);return i&&r?[i,r]:null}if(t.type==="line"||t.type==="ray"){const i=Mt(t.origin),r=Mt(t.direction);return!i||!r?null:e.type==="axis"?[i,Zt(i,r,c_)]:[t.type==="ray"?i:Zt(i,r,-Uc),Zt(i,r,Uc)]}if(t.type==="plane"){const i=Mt(t.origin),r=Mt(t.normal),s=Mt(t.x_direction);if(!i||!r||!s)return null;const a=h_(r,s),o=u_;return[Zt(Zt(i,s,-o),a,-o),Zt(Zt(i,s,o),a,-o),Zt(Zt(i,s,o),a,o),Zt(Zt(i,s,-o),a,o)]}return null}huelle(){const e=[];for(const r of this.zeichnung()){const s=ut(this.app.dokument(),r.element);if(s&&(s.type==="line"||s.type==="ray")){const a=this.haupt(s),o=a?Mt(a.origin):null;o&&e.push(o)}else e.push(...r.punkte)}if(!e.length)return null;const t=[1/0,1/0,1/0],i=[-1/0,-1/0,-1/0];for(const r of e)for(let s=0;s<3;s++)t[s]=Math.min(t[s],r[s]),i[s]=Math.max(i[s],r[s]);return{min:t,max:i}}bildschirm(e,t){const i=ut(this.app.dokument(),e),r=this.app.szene;if(!i||!r)return null;const s=this.geometrie(i);if(!s||!s.length)return null;let a=s[0];if(i.type==="plane")a=t==="ecke"?s[2]:this.mitte(s);else if(i.type==="segment"||i.type==="axis")a=t==="mitte"||!t?this.mitte(s):s[0],i.type==="segment"&&!t&&(a=this.mitte(s));else if(i.type==="line"||i.type==="ray"){const o=this.haupt(i);a=(o?Mt(o.origin):null)??a}return r.projiziere(a)}mitte(e){const t=[0,0,0];for(const i of e)for(let r=0;r<3;r++)t[r]=t[r]+i[r]/e.length;return t}treffer(e,t,i){const r=this.app.szene;if(!r)return null;let s=null;for(const a of this.zeichnung()){const o=ut(this.app.dokument(),a.element);if(i&&o.type!==i||a.art==="koordinatensystem")continue;const l=a.punkte.map(f=>r.projiziere(f));let c=1/0,d=1;if(a.art==="punkt")d=0,c=Math.hypot(e-(l[0]?.x??0),t-(l[0]?.y??0));else if(a.art==="ebene"){d=2;for(let f=0;f<l.length;f++)c=Math.min(c,Oc(e,t,l[f],l[(f+1)%l.length]));c>Ea&&m_(e,t,l)&&(c=Ea-.01)}else c=Oc(e,t,l[0],l[1]);c>Ea||(!s||d<s.rang||d===s.rang&&c<s.d)&&(s={id:a.element,rang:d,d:c})}return s?.id??null}huelleBildschirm(e){const t=ut(this.app.dokument(),e),i=this.app.szene;if(!t||!i||!br(t.type))return null;let r=this.geometrie(t);if(t.type==="frame"){const a=this.haupt(t),o=a?Mt(a.position):null;r=o?[o]:null}if(!r)return null;if(t.type==="line"||t.type==="ray"){const a=this.haupt(t),o=a?Mt(a.origin):null,l=a?Mt(a.direction):null;o&&l&&(r=[o,Zt(o,l,60)])}const s=6;return r.flatMap(a=>{const o=i.projiziere(a);return[{x:o.x-s,y:o.y-s},{x:o.x+s,y:o.y-s},{x:o.x+s,y:o.y+s},{x:o.x-s,y:o.y+s}]})}abbrechen(){return this.modus?(this.modus=null,this.app.meldung("rueck.draht.abgebrochen"),this.app.rendern(),!0):!1}klick(e,t,i){if(this.modus?.art==="punkt")return this.punktAusKlick(e,t)&&(this.modus=null),!0;if(this.modus?.art==="linie"){const s=this.treffer(e,t,"point");if(!s)return!0;const a=this.modus;return a.punkte=[...a.punkte,s],a.punkte.length>=2?(this.modus=null,this.linieAnlegen(a.typ,a.punkte[0],a.punkte[1],"menue")):this.app.meldung("rueck.draht.zweiter-punkt"),this.app.rendern(),!0}if(!this.aktiv())return!1;const r=this.treffer(e,t);return r?(this.app.waehle(r,i),!0):!1}kontext(e,t){if(!this.aktiv())return!1;const i=this.treffer(e,t);return i?(this.app.auswahlIds().includes(i)||this.app.waehle(i,"setzen"),!0):!1}zielFrame(){const e=this.app.gewaehlteElemente().filter(i=>i.type==="frame"&&!St(i));if(e.length===1)return e[0];const t=vt(this.app.dokument()).filter(i=>i.type==="frame"&&!St(i)&&this.resultat(i.id)?.state==="aktuell");return t[t.length-1]??null}frameLage(e){const t=e?this.resultat(e.id)?.outputs.frame:void 0,i=t?Mt(t.origin):null,r=t?Mt(t.x):null,s=t?Mt(t.y):null,a=t?Mt(t.z):null;return i&&r&&s&&a?{t:i,x:r,y:s,z:a}:{t:[0,0,0],x:[1,0,0],y:[0,1,0],z:[0,0,1]}}punktAusKlick(e,t){const i=this.zielFrame(),r=this.frameLage(i),s=this.app.szene?.aufEbene(e,t,r.t,r.z);if(!s)return null;const a=d_(s,r.t),o=[Aa(a,r.x),Aa(a,r.y),Aa(a,r.z)],l=c=>Math.round(c*1e6)/1e6;return this.punktAnlegen(i?{frame:`${i.id}.frame`}:{},{x:l(o[0]),y:l(o[1]),z:0},"menue")}freieId(e){const t=new Set(vt(this.app.projekt).map(r=>r.id));let i=1;for(;t.has(`${e}${i}`);)i+=1;return`${e}${i}`}einfuegeStelle(e){return(this.app.aktiv?ut(e,this.app.aktiv):void 0)??e}neu(e,t,i,r={},s={},a=[]){return{id:e,type:t,inputs:s,params:r,content:a,meta:{name:i}}}koordinatensystemAnlegen(e,t="mensch",i){const r=this.app.t,s=this.app.gewaehlteElemente(),a=i?i.parent?.split(".")[0]??null:s.length===1&&s[0]?.type==="frame"?s[0].id:null,o=this.freieId("K"),l=o.slice(1),c=h=>({value:h,unit:"mm"}),d=h=>({value:h,unit:"deg"}),f=[this.neu(`${o}-ursprung`,"point",r("draht.kind.ursprung"),{x:c(0),y:c(0),z:c(0)},{frame:`${o}.frame`}),...["x","y","z"].map(h=>this.neu(`${o}-${h}`,"axis",r(`draht.kind.${h}`),{},{of:`${o}.${h}`})),...["xy","yz","zx"].map(h=>this.neu(`${o}-${h}`,"plane",r(`draht.kind.${h}`),{},{of:`${o}.${h}`}))],u=this.neu(o,"frame",i?.name||r("draht.name.koordinatensystem",{n:l}),{x:c(0),y:c(0),z:c(0),rx:d(0),ry:d(0),rz:d(0),...i?.params??{}},a?{parent:`${a}.frame`}:{},f);return this.app.aendern(h=>this.einfuegeStelle(h).content.push(u)),this.app.protokolliere("referenz.koordinatensystem",{element:o,...a?{parent:a}:{}},e,t),this.app.auswahl=[{element_id:o}],this.app.meldung("rueck.angelegt",{name:u.meta.name}),o}punktAnlegen(e,t,i,r="mensch",s,a="referenz.punkt"){const o=this.freieId("P"),l=d=>typeof d=="number"?{value:d,unit:"mm"}:d,c=this.neu(o,"point",s||this.app.t("draht.name.punkt",{n:o.slice(1)}),{x:l(t.x),y:l(t.y),z:l(t.z)},e);return this.app.aendern(d=>this.einfuegeStelle(d).content.push(c)),this.app.protokolliere(a,{element:o,...e},i,r),this.app.auswahl=[{element_id:o}],this.app.meldung("rueck.angelegt",{name:c.meta.name}),o}linieAnlegen(e,t,i,r,s="mensch",a){const o={line:"G",ray:"H",segment:"S"}[e]??"L",l=this.freieId(o),c=f=>f.includes(".")?f:`${f}.point`,d=this.neu(l,e,a||this.app.t(`draht.name.${e}`,{n:l.slice(1)}),{},{a:c(t),b:c(i)});return this.app.aendern(f=>this.einfuegeStelle(f).content.push(d)),this.app.protokolliere(`referenz.${{line:"gerade",ray:"halbgerade",segment:"strecke"}[e]}`,{element:l,a:t.split(".")[0],b:i.split(".")[0]},r,s),this.app.meldung("rueck.angelegt",{name:d.meta.name}),l}gewaehltePunkte(){return this.app.auswahlIds().filter(e=>{const t=this.app.find(e);return!!t&&t.type==="point"&&!St(t)})}}function Oc(n,e,t,i){const r=i.x-t.x,s=i.y-t.y,a=r*r+s*s||1,o=Math.max(0,Math.min(1,((n-t.x)*r+(e-t.y)*s)/a));return Math.hypot(n-(t.x+o*r),e-(t.y+o*s))}function m_(n,e,t){let i=!1;for(let r=0,s=t.length-1;r<t.length;s=r++){const a=t[r],o=t[s];a.y>e!=o.y>e&&n<(o.x-a.x)*(e-a.y)/(o.y-a.y)+a.x&&(i=!i)}return i}function tl(n,e){const t=n.trim().replace(/\s+/g," ").match(/^([+-]?\d+(?:[.,]\d+)?(?:e[+-]?\d+)?)\s*(mm|cm|m|°|deg|rad)?$/i);if(!t)return null;const i=Number(t[1].replace(",","."));if(!Number.isFinite(i))return null;const r=(t[2]??"").toLowerCase(),s=r==="°"?"deg":r||(e==="length"?"mm":"deg"),a=["mm","cm","m"].includes(s);return e==="length"!==a?null:{value:i,unit:s}}function p_(n,e){if(!n)return"";const t=e==="de"?String(n.value).replace(".",","):String(n.value);return n.unit==="deg"?`${t}°`:`${t} ${n.unit}`}const g_={menueleiste:"Menüleiste",taskleiste:"Taskleiste",struktur:"Struktur",modell:"Modell",eigenschaften:"Eigenschaften",chat:"Chat",panel:"Panel",rueckmeldung:"Rückmeldung"},v_={start:"Start",folgt:"folgt",mehr:"Mehr …"},__={modellieren:"Modellieren",simulation:"Simulation (simuliert)",shop:"Shop (folgt)"},x_="simuliert",b_={platzhalter:"Befehle und Inhalte suchen",befehle:"Befehle",inhalte:"Inhalte","folgt-spaeter":"Folgt später","alle-zeigen":"Alle zeigen",nichts:"Nichts gefunden"},S_={Datei:"Datei",Bearbeiten:"Bearbeiten",Auswahl:"Auswahl",Ansicht:"Ansicht",Sichtbarkeit:"Sichtbarkeit","Ansicht speichern":"Gespeicherte Ansichten",Fenster:"Fenster",Hilfe:"Hilfe",Baugruppe:"Baugruppe",Simulation:"Simulation",Chat:"Chat",Referenz:"Referenz"},y_={Neu:"Neu",Öffnen:"Öffnen",Projekt:"Projekt",Verlauf:"Verlauf",Element:"Element",Werte:"Werte",Berechnung:"Berechnung",Auswahl:"Auswahl",Befehle:"Auswahl setzen",Regeln:"Nach Regel",Zonen:"Zonen",Suche:"Suche",Fenster:"Fenster",Einstellungen:"Einstellungen",Hierarchie:"Hierarchie",Verbinden:"Verbinden",Studie:"Studie",Blick:"Blick",Darstellung:"Darstellung",Stand:"Stand",Sichtbarkeit:"Sichtbarkeit",Gespeichert:"Gespeichert",Hilfe:"Hilfe",Chat:"Chat",Weitere:"Weitere",Koordinatensystem:"Koordinatensystem",Punkt:"Punkt",Linie:"Linie"},M_={titel:"Struktur",wurzel:"Wurzel",leer:"Noch nichts da. Lege dein erstes Teil an.","leer-simulation":"Noch keine Studie. Die Simulation ist ein Platzhalter und simuliert.",verworfen:"verworfen"},w_={leer:"Das Modell ist leer."},E_={fertig:"Fertig"},A_={titel:"Pfad"},T_={titel:"Ansicht",mehr:"Mehr Ansichten"},k_={person:"Testperson B",kuerzel:"B"},R_={"zustand-unbekannt":"Zustand unbekannt",korrektur:"Letzten gültigen Wert setzen","bohrung-zu-gross":"Der Durchmesser {wert} ist zu groß; unter {grenze} ist die Bohrung gültig.","steg-ohne-hoehe":"Der Steg braucht eine Höhe über {grenze}."},C_={fehlerhaft:"fehlerhaft",pausiert:"pausiert",rechnet:"rechnet"},P_={befunde:"Befunde","keine-befunde":"Keine Befunde. Alles ist aktuell."},z_={fehler:{"nicht-lesbar":"Wert nicht lesbar. Beispiel: 12 mm",dimension:"Falsche Einheit für dieses Feld",teilung:"Teilen durch null geht nicht"}},L_={gemischt:"gemischt","n-elemente":"{n} Elemente","umbenennen-hinweis":"Doppelklick zum Umbenennen"},D_={masse:"Maße",material:"Material",ergebnis:"Ergebnis",ansicht:"Ansicht",lage:"Lage"},I_={laenge:"Länge",breite:"Breite",dicke:"Dicke",hoehe:"Höhe",eckradius:"Eckradius",durchmesser:"Durchmesser",wand:"Wand",material:"Material",dichte:"Dichte",abmessungen:"Abmessungen",volumen:"Volumen","masse-wert":"Masse",projektion:"Projektion",darstellung:"Darstellung",x:"x",y:"y",z:"z",rx:"Drehung x",ry:"Drehung y",rz:"Drehung z"},N_={orthogonal:"orthogonal",perspektivisch:"perspektivisch"},U_={koerper:"Körper",kanten:"Kanten",durchsicht:"Durchsicht"},F_={standard:"Standard",solidworks:"wie Onshape/SolidWorks"},O_={kopie:"Kopie",ansicht:"Ansicht",schnitt:"Schnitt"},B_={titel:"Chat",zu:"zu:","n-elemente":"{n} Elemente",platzhalter:"Frage oder Auftrag …",hinweis:"Zum Beispiel: Steg 40 mm hoch",uebernehmen:"Übernehmen",verwerfen:"Verwerfen",beispiel:{frage:"Der Steg soll 40 mm hoch werden."},antwort:{vorschlag:"Ich schlage diese Änderung vor. Schau dir die Vorschau an.",unklar:"Das habe ich nicht verstanden. Versuche: Steg 40 mm hoch, Kopie vom Steg oder Steg verwerfen.",erledigt:"Erledigt. Du kannst es mit Rückgängig zurücknehmen.",verworfen:"Der Vorschlag ist verworfen."},vorschlag:{wert:"{element}: {feld} auf {nachher}",duplizieren:"{element} duplizieren",verwerfen:"{element} verwerfen",anlegen:"Neues Element anlegen",begruendung:"Simulierter Vorschlag; erst nach dem Übernehmen gilt er."}},V_={folgt:"{befehl} folgt in einer späteren Stufe.",angelegt:"{name} angelegt",dupliziert:"{name} angelegt",umbenannt:"Umbenannt in {name}",verworfen:"{name} verworfen; mit Rückgängig oder Zurückholen wieder da",zurueckgeholt:"{name} zurückgeholt","wert-gesetzt":"Wert an {name} geändert",umgehaengt:"{name} liegt jetzt in {ziel}","ansicht-gespeichert":"{name} gespeichert",rueckgaengig:"Letzten Schritt zurückgenommen",wiederholt:"Schritt wiederhergestellt",befund:"Befund bei {name}; die anderen Elemente bleiben bedienbar","ziel-waehlen":"Wähle in der Struktur das Ziel.","auswahl-ziel":"Wähle Elemente im Modell oder in der Struktur.","isolieren-ziel":"Wähle zuerst, was du isolieren willst.",draht:{"punkt-klicken":"Ins Modell klicken, um den Punkt zu setzen","zwei-punkte":"Zwei Punkte wählen","zweiter-punkt":"Zweiten Punkt wählen","einen-punkt":"Einen Punkt wählen",abgebrochen:"Abgebrochen","esc-abbrechen":"zum Abbrechen"}},H_={"kein-ziel":"Hier kann nichts abgelegt werden.","nur-teile":"Nur Teile und Baugruppen lassen sich umhängen, Schritte bleiben in ihrem Teil.","eigener-nachfahre":"Ein Element kann nicht in sich selbst oder in sein eigenes Teil.","kein-behaelter":"Ein Teil nimmt keine anderen Elemente auf; wähle eine Baugruppe.","schon-darin":"Das Element liegt schon dort."},G_={titel:"Bausteinkatalog",einleitung:"Jeder Baustein ist hier so zu sehen, wie er im Prototyp wirklich gebaut ist. Wer eine neue Oberfläche baut, nimmt diese Seiten als Maßstab.",zurueck:"Zur Übersicht",ueberschrift:{regel:"Regel",bezug:"Bezug",befehle:"Befehle",tokens:"Tokens"},hell:"Hell",dunkel:"Dunkel",bezug:{muster:"Muster „{name}“ aus dem Musterkatalog.",kandidat:"Kandidat „{name}“, noch kein Muster."},baustein:{zustaende:"Elementzustände",auswahl:"Auswahl","struktur-zeile":"Struktur-Zeile",auge:"Auge",kontextmenue:"Kontextmenü",kontextaktionen:"Kontextaktionen",dropdown:"Dropdown",suche:"Suche",wertfeld:"Wertfeld",griff:"Griff","ziehen-ablegen":"Ziehen und Ablegen",statusanzeige:"Statusanzeige",befund:"Befund",rueckmeldung:"Rückmeldung",entscheidungskarte:"Entscheidungskarte",pfad:"Pfad","dokument-reiter":"Dokument-Reiter",ansichtsleiste:"Ansichtsleiste","fokus-tastatur":"Fokus und Tastatur"},regel:{zustaende:"Ein Element zeigt jeden Zustand über einen festen Kanal, damit sich Zustände nicht verdecken. Die Kontur gehört der Auswahl, dem Überfahren und der anderen Person, und es gewinnt genau eine: ausgewählt vor anderer Person vor überfahren. Status, Sichtbarkeit und Umfeld kommen immer zusätzlich dazu. Der Akzent steht nur für Auswahl und Überfahren.",auswahl:"Es gibt genau eine Auswahl für das ganze Fenster. Struktur, Modell, Eigenschaften und Chat lesen sie und ändern sie nur über dieselben Befehle. Ein Klick wählt, Umschalt fügt hinzu, Strg schaltet um, ein Klick ins Leere hebt auf. Die Eigenschaften zeigen bei mehreren nur das Gemeinsame.","struktur-zeile":"Eine Zeile zeigt Symbol, Name, Status und das Auge, alles immer sichtbar. Die gewählte Zeile trägt die Akzentfläche, überfahren trägt die leise Fläche. Ein Doppelklick oder Enter macht das Element aktiv. Zeilen lassen sich zum Umhängen ziehen.",auge:"Das Auge ist in jeder Zeile immer sichtbar und nicht erst beim Überfahren. Es blendet nur für diese Person aus; der Export bleibt davon unberührt. Alles einblenden holt alles zurück. Die Sichtbarkeit ist Ansicht und kein Schritt im Verlauf.",kontextmenue:"Das Kontextmenü entsteht aus dem Befehlsregister und ist in Struktur und Modell für dieselbe Auswahl gleich. Es ist nach Familien gruppiert, jede Gruppe zeigt höchstens zwölf Einträge, Unwesentliches steht hinter „Mehr …“. Innerhalb einer Gruppe gilt der Rang. Kürzel stehen neben dem Eintrag.",kontextaktionen:"Die Leiste über dem Gewählten zeigt die ersten fünf Einträge des Kontextmenüs nach Rang, keine eigene Liste. Sie ersetzt die Werkzeugleiste. Zahlen stehen nie hier, sondern in den Eigenschaften.",dropdown:"Ein Dropdown der Menüleiste zeigt alle Befehle seiner Familie in Untergruppen mit je höchstens zwölf Einträgen. Der Inhalt kommt aus dem Register, nicht von Hand. Nicht passende Einträge sind grau. Das Kürzel steht neben jedem Eintrag.",suche:"Die Suche findet Befehle und Inhalte in einem Feld und öffnet mit Strg und K. Ergebnisse kommen aus dem Befehlsregister und zeigen ihr Kürzel. Pfeiltasten wählen, Enter führt aus, Esc schließt. Befehle ohne anderen Ort, etwa die Hilfe, findet man nur hier.",wertfeld:"Jede Zahl steht als Größe mit Einheit in einem Wertfeld. Man tippt den Wert, auch mit Einheit oder einer einfachen Formel, und übernimmt mit Enter; Esc stellt den alten Wert wieder her. Während des Tippens ändert sich das Modell live. Eine unlesbare Eingabe zeigt einen Befund am Feld.",griff:"Am gewählten Element steht ein Griff für seine Länge, zum Beispiel die Dicke. Beim Ziehen springt der Wert in ganzen Millimetern, die Zahl steht am Zeiger. Tippt man dabei Ziffern, gilt dieser genaue Wert. Loslassen oder Enter übernimmt, Esc bricht ab.","ziehen-ablegen":"Eine Zeile lässt sich auf eine andere ziehen, um sie umzuhängen. Ein erlaubtes Ziel trägt die Akzentfläche, ein nicht erlaubtes die Fehlerfläche, und der Grund steht in der Rückmeldezeile. Teile und Baugruppen dürfen in eine Baugruppe, Schritte bleiben in ihrem Teil. Esc bricht das Ziehen ab, dann ändert sich nichts.",statusanzeige:"Ein Status erscheint immer als Farbe, Symbol und Wort zusammen. Er steht an der Zeile in der Struktur und am Element im Modell. Rechnet, fehlerhaft und pausiert sind die drei Zustände. Ein Fehler eines Elements legt nie das ganze Modell lahm.",befund:"Ein Befund sagt, was los ist, wo es ist und wie man es behebt. Er steht im Panel Befunde, bei einer falschen Eingabe auch am Wertfeld. Die Korrektur ist ein Knopf, zum Beispiel „Letzten gültigen Wert setzen“. Alle anderen Elemente bleiben bedienbar.",rueckmeldung:"Bestätigungen und Hinweise stehen leise in der schmalen Zeile ganz unten. Es gibt keine Dialoge und keine Meldungen an anderen Orten. Der Text sagt knapp, was geschehen ist, ohne Ausrufezeichen. Verworfenes lässt sich mit Rückgängig zurückholen.",entscheidungskarte:"Jede Änderung der KI erscheint als Karte mit Vorschau, nie direkt. Die Karte nennt, was sich ändert, mit Wert vorher und nachher. Übernehmen ist die eine Hauptaktion und trägt den Akzent. Erst nach dem Übernehmen steht derselbe Befehl im Verlauf, mit der Quelle KI.",pfad:"Der Pfad zeigt, wo man gerade arbeitet: von der Wurzel bis zum aktiven Element. Ein Klick auf ein Glied geht dorthin zurück, ein Klick auf die Wurzel verlässt das aktive Element. Das letzte Glied ist hervorgehoben. Fertig und Esc führen auf demselben Weg heraus.","dokument-reiter":"Die Reiter über dem Modell sind Dokumente, nichts anderes. Es gibt keine Befehlsreiter und keine Reiter in Reitern. Der gewählte Reiter ist hervorgehoben. Arbeitet eine andere Person in einem Reiter, zeigt er ein kleines Personensymbol.",ansichtsleiste:"Die Ansichtsleiste im Modell enthält Einpassen, Auf Auswahl zoomen, Isolieren, Alles einblenden, Projektion und Darstellung. Weitere Ansichten und das Speichern einer Ansicht stehen im Menü am Rand der Leiste. Alles hier ist Ansicht und ändert nie den Graphen. Eine gespeicherte Ansicht wird ausdrücklich als Element abgelegt.","fokus-tastatur":"Jede Zone ist per Tab oder F6 erreichbar, und der Fokus ist als Ring in der Akzentfarbe sichtbar. Esc schließt immer genau eine Ebene. Es gibt höchstens fünfzehn Kürzel, und alle stehen im Befehlsregister und neben dem Befehl im Menü. Nichts ist nur mit der Maus erreichbar."},zustand:{hover:"Überfahren",ausgewaehlt:"Ausgewählt",andere:"Von anderen bearbeitet",aktiv:"Aktiv",gedimmt:"Umfeld des aktiven Elements",ausgeblendet:"Ausgeblendet",fehlerhaft:"Fehlerhaft",pausiert:"Pausiert",rechnet:"Rechnet"},bsp:{"auswahl-struktur":"Struktur mit zwei gewählten Zeilen","auswahl-eigenschaften":"Eigenschaften mit „gemischt“","auswahl-chat":"Chat-Kontext","auge-an":"Sichtbar","auge-aus":"Ausgeblendet",kontextmenue:"Kontextmenü auf einem Schritt","ein-element":"Ein Element gewählt",mehrere:"Mehrere Elemente gewählt",suche:"Suche mit Eingabe „ver“",wert:"Wertfeld",gemischt:"Unterschiedliche Werte",fehler:"Unlesbare Eingabe",griff:"Griff mit Zahl am Zeiger","ablegen-ok":"Erlaubtes Ziel","ablegen-nein":"Nicht erlaubtes Ziel",rueckmeldung:"Leise Zeile",karte:"Vorschlag der KI (simuliert)",pfad:"Aktives Teil in einer Baugruppe","pfad-wurzel":"Nichts aktiv",reiter:"Zwei Dokumente",ansichtsleiste:"Ansichtsleiste",fokus:"Zeile mit Fokusring",kuerzel:"Alle Kürzel"}},W_={element:{anlegen:"Neu anlegen",duplizieren:"Duplizieren",umbenennen:"Umbenennen",verwerfen:"Verwerfen",zurueckholen:"Zurückholen","wert-setzen":"Wert setzen","parameter-anlegen":"Parameter anlegen",pausieren:"Berechnung pausieren",fortsetzen:"Berechnung fortsetzen",ausblenden:"Ausblenden",einblenden:"Einblenden",umhaengen:"Umhängen (Ziel wählen)",aktivieren:"Aktivieren",verlassen:"Aktives Element verlassen"},dokument:{oeffnen:"Öffnen",schliessen:"Dokument schließen",wechseln:"Dokument wechseln"},wurzel:{setzen:"Wurzel der Struktur wählen"},einstellungen:{oeffnen:"Einstellungen öffnen"},projekt:{teilen:"Projekt teilen",einladen:"Person einladen"},bearbeiten:{rueckgaengig:"Rückgängig",wiederholen:"Wiederholen",einfuegen:"Einfügen"},auswahl:{duplizieren:"Auswahl duplizieren",verwerfen:"Auswahl verwerfen",alles:"Alles auswählen",aufheben:"Auswahl aufheben",umkehren:"Auswahl umkehren",setzen:"Auswählen",hinzufuegen:"Zur Auswahl hinzufügen",umschalten:"Auswahl umschalten",aehnliche:"Ähnliche auswählen",kantenschleife:"Kantenschleife auswählen",ausblenden:"Auswahl ausblenden"},ansicht:{einpassen:"Alles einpassen","auf-auswahl":"Auf Auswahl zoomen",projektion:"Perspektive oder Orthogonal",vorne:"Ansicht von vorne",oben:"Ansicht von oben",isometrisch:"Isometrische Ansicht",schnitt:"Schnittansicht",isolieren:"Isolieren","alles-einblenden":"Alles einblenden",verworfenes:"Verworfenes zeigen",ergebnis:"Ansicht Ergebnis","alle-entwuerfe":"Ansicht Alle Entwürfe",speichern:"Ansicht speichern",anwenden:"Gespeicherte Ansicht anwenden"},darstellung:{wechseln:"Darstellung wechseln"},sichtbarkeit:{"nur-dieses":"Nur dieses zeigen","farbe-setzen":"Anzeigefarbe setzen"},fenster:{struktur:"Struktur ein- oder ausblenden",panel:"Panel ein- oder ausblenden",rechts:"Rechte Seitenleiste ein- oder ausblenden","naechste-zone":"Nächste Zone",teilen:"Fenster teilen (zwei Teile nebeneinander)"},suche:{oeffnen:"Befehlssuche öffnen"},thema:{umschalten:"Hell oder Dunkel"},einstellung:{navigationsprofil:"Navigationsprofil wählen"},katalog:{oeffnen:"Katalog öffnen"},hilfe:{"befehle-zeigen":"Alle Befehle zeigen",einfuehrung:"Einführung starten"},baugruppe:{anlegen:"Baugruppe anlegen","instanz-anlegen":"Instanz einer Komponente anlegen","variante-waehlen":"Variante wählen","kollision-pruefen":"Kollision prüfen",fixieren:"Teil fixieren","komponente-anlegen":"Komponente aus Teil anlegen"},verbindung:{anlegen:"Verbindung anlegen","verbindungspunkt-setzen":"Verbindungspunkt setzen",bewegen:"Innerhalb der Freiheitsgrade bewegen"},simulation:{lager:"Lager setzen (simuliert)",kraft:"Kraft setzen (simuliert)",ergebnis:"Ergebnis zeigen (simuliert)"},chat:{senden:"Nachricht senden",uebernehmen:"Vorschlag übernehmen",verwerfen:"Vorschlag verwerfen"},task:{wechseln:"Aufgabe wechseln"},referenz:{koordinatensystem:"Koordinatensystem setzen",punkt:"Punkt setzen","punkt-relativ":"Punkt relativ setzen",gerade:"Gerade durch zwei Punkte",halbgerade:"Halbgerade durch zwei Punkte",strecke:"Strecke durch zwei Punkte"},ki:{"anbieter-waehlen":"KI-Anbieter wählen"}},X_={kind:{ursprung:"Ursprung",x:"X-Achse",y:"Y-Achse",z:"Z-Achse",xy:"XY-Ebene",yz:"YZ-Ebene",zx:"ZX-Ebene"},name:{koordinatensystem:"Koordinatensystem {n}",punkt:"Punkt {n}",line:"Gerade {n}",ray:"Halbgerade {n}",segment:"Strecke {n}"},"keine-lage":"Lage aus dem Geometriekern"},$_={befund:{input_missing:"Bezug fehlt: Eingang auf ein vorhandenes Element setzen",input_discarded:"Bezug {bezug} ist verworfen: zurückholen oder neuen Bezug wählen",input_type:"Bezug hat den falschen Typ: passendes Element wählen",input_failed:"Bezug {bezug} ist fehlerhaft: zuerst {bezug} reparieren",degenerate:"Die beiden Punkte liegen aufeinander: Punkte auseinanderziehen",unit:"Falsche Einheit: Länge in mm, Winkel in Grad eingeben",unknown_type:"Unbekannter Elementtyp",kernel_error:"Fehler im Geometriekern",protocol:"Nachricht an den Geometriekern ungültig",kernel_unavailable:"Geometrie-Dienst nicht erreichbar"}},q_={werkzeug:{referenz:{koordinatensystem:'Koordinatensystem anlegen: Ursprung x, y, z und Drehung rx, ry, rz (um die Achsen), optional in einem anderen Koordinatensystem (parent). Beispiel: {"x": "100 mm", "rz": "30 deg"}',punkt:'Punkt auf Koordinaten setzen (fehlende Werte sind 0 mm), optional im Koordinatensystem frame. Beispiel: {"x": "10 mm", "y": "20 mm", "z": "0 mm"}',"punkt-relativ":'Punkt mit Versatz x, y, z zu einem vorhandenen Punkt ref setzen; er folgt diesem Punkt. Beispiel: {"ref": "P1.point", "z": "25 mm"}',gerade:'Unendliche Gerade durch zwei verschiedene Punkte a und b. Beispiel: {"a": "P1.point", "b": "P2.point"}',halbgerade:'Halbgerade, die in Punkt a beginnt und durch Punkt b läuft. Beispiel: {"a": "P1.point", "b": "P2.point"}',strecke:'Strecke von Punkt a nach Punkt b. Beispiel: {"a": "P1.point", "b": "P2.point"}'},element:{ausblenden:'Element im Modell ausblenden (bleibt erhalten). Beispiel: {"element": "G1"}',verwerfen:'Element verwerfen (Rückgängig holt es zurück, nichts wird gelöscht). Beispiel: {"element": "S1"}'}},kopf:{regel:"Satzerkennung – ohne Modell, bleibt auf diesem Rechner",lokal:"{modell} – bleibt auf diesem Rechner",extern:"{modell} – geht an {host}"},uebersicht:{kopf:'Modellübersicht (je Zeile: ID Typ "ID" (Name) Parameter Bezüge):',leer:"(noch keine Elemente)"},antwort:{vorschlag:"Hier ist mein Vorschlag. Im Modell siehst du die Vorschau; erst Übernehmen ändert etwas.",unklar:"Das habe ich nicht verstanden. Versuche zum Beispiel: „Punkt bei 10, 20, 5 mm“, „Rechteck 100 × 60 mm in der XY-Ebene mit Punkt 40 mm darüber“, „Koordinatensystem bei x 100 mm, um 30° um z gedreht“ oder „Strecke von Punkt 1 nach Punkt 2“.",zeitlimit:"Es kam keine Antwort vom Modell (Zeitlimit). Nichts wurde geändert.",fehler:"Das Modell ist gerade nicht erreichbar ({fehler}). Nichts wurde geändert.",grenze:"Ich habe nach 20 Schritten aufgehört; die Karte zeigt das Bisherige.",teilweise:"Übernommen; {n} Schritte ließen sich nicht mehr ausführen.","nicht-verfuegbar":"Dieser Anbieter ist nicht eingerichtet ({befund}); es bleibt bei der Satzerkennung."},karte:{neu:"{n} neu",verworfen:"{n} verworfen",ausgeblendet:"{n} ausgeblendet"},status:{offen:"Vorschlag",uebernommen:"übernommen",verworfen:"verworfen"},hinweis:"Zum Beispiel: Punkt bei 10, 20, 5 mm",denkt:"Ich arbeite daran …"},nh={zone:g_,menue:v_,task:__,simuliert:x_,suche:b_,familie:S_,untergruppe:y_,struktur:M_,modell:w_,aktiv:E_,pfad:A_,ansichtsleiste:T_,anwesenheit:k_,befund:R_,status:C_,panel:P_,wert:z_,eigenschaften:L_,gruppe:D_,feld:I_,projektion:N_,darstellung:U_,profil:F_,name:O_,chat:B_,rueck:V_,dnd:H_,katalog:G_,befehl:W_,draht:X_,kernel:$_,ki:q_},ih="^[+-]?\\d+(?:[.,]\\d+)?\\s?(?:mm|cm|m)$",rh="^[+-]?\\d+(?:[.,]\\d+)?\\s?(?:deg|°|rad)$",Bc="^[A-Za-z0-9_-]+(?:\\.[a-z]+)?$",nl=n=>n.replace(/[.-]/g,"_");function Y_(n){let e=nh.ki.werkzeug;for(const t of n.split("."))e=e?.[t];return typeof e=="string"?e:n}function K_(n,e){return e.dimension==="length"?{type:"string",pattern:ih,description:'Länge mit Einheit, z. B. "40 mm"'}:e.dimension==="angle"?{type:"string",pattern:rh,description:'Winkel mit Einheit, z. B. "30 deg"'}:e.typ==="referenz"?{type:"string",pattern:Bc,description:`Bezug <Element-ID>.${e.ausgang??"point"} aus der Modellübersicht, z. B. "P1.${e.ausgang??"point"}"`}:e.typ==="element"?{type:"string",pattern:Bc,description:"Element-ID aus der Modellübersicht"}:{type:"string",description:n==="name"?"Anzeigename (optional)":n}}const sh=n=>n.parameter;function il(n){return n.filter(e=>e.ki===!0&&e.familie!=="Freigabe").map(e=>{const t=sh(e),i=Object.fromEntries(Object.entries(t).map(([s,a])=>[s,K_(s,a)])),r=Object.entries(t).filter(([,s])=>s.pflicht).map(([s])=>s);return{name:nl(e.id),befehl:e.id,description:Y_(e.id),inputSchema:{type:"object",properties:i,required:r,additionalProperties:!1}}})}const Nt=(n,e,t,i=null)=>({ok:!1,code:n,message:e,element_id:i,hint:t}),Lo=n=>{const e=Math.round(n*1e6)/1e6;return String(Object.is(e,-0)?0:e)};function Z_(n,e){return!Array.isArray(n)||n.length!==3?null:n.map(t=>{const i=Number(t.value);return e?`${Lo(i)} ${e}`:Lo(i)})}function J_(n){const e={},t=[["position","mm"],["origin","mm"],["start","mm"],["end","mm"],["direction",""],["normal",""],["x",""],["y",""],["z",""]];for(const[r,s]of t){const a=Z_(n[r],s);a&&(e[r]=a)}const i=n.length;return i&&typeof i.value=="number"&&(e.length=`${Lo(i.value)} mm`),e}const ah={frame:"frame",point:"point",line:"line",ray:"ray",segment:"segment",axis:"line",plane:"plane"};function Q_(n,e){const t=e?.results.find(a=>a.id===n.id),i=ah[n.type]??n.type,r=t?.outputs[i],s={ok:!0,element:n.id,name:n.meta.name,typ:n.type};return r&&(s.ausgaenge={[i]:J_(r)}),s}const oh=n=>new Map(vt(n).map(e=>[e.id,e]));function j_(n,e,t,i){const[r,s]=t.split("."),a=oh(n).get(r);if(!a||St(a))return Nt("input_missing",`${e}: Element ${r} gibt es nicht.`,"Nimm eine Element-ID aus der Modellübersicht oder aus einem früheren Werkzeugergebnis.",r);const o=s??(i in(or[a.type]??{})?i:ah[a.type]),l=or[a.type]?.[o??""];return l?l!==i?Nt("input_type",`${e}: ${r}.${o} ist ein ${l}, verlangt ist ${i}.`,`Nimm einen Ausgang vom Typ ${i}, z. B. "<ID>.${i}".`,r):`${r}.${o}`:Nt("input_type",`${e}: ${r} (${a.type}) hat keinen Ausgang ${o}.`,`Ausgänge von ${r}: ${Object.keys(or[a.type]??{}).join(", ")}.`,r)}function ex(n,e,t){const i=sh(n),r=nl(n.id);if(!e||typeof e!="object"||Array.isArray(e))return Nt("invalid_arguments",`${r}: Argumente müssen ein JSON-Objekt sein.`,`Erlaubt: ${Object.keys(i).join(", ")}.`);const s=e,a=Object.keys(s).filter(c=>!(c in i));if(a.length)return Nt("invalid_arguments",`${r}: unbekannte Argumente ${a.join(", ")}.`,`Erlaubt: ${Object.keys(i).join(", ")}.`);const o=Object.entries(i).filter(([c,d])=>d.pflicht&&(s[c]===void 0||s[c]==="")).map(([c])=>c);if(o.length)return Nt("invalid_arguments",`${r}: Pflichtargument ${o.join(", ")} fehlt.`,`Gib ${o.join(", ")} als Bezug aus der Modellübersicht an.`);const l={};for(const[c,d]of Object.entries(i)){const f=s[c];if(d.dimension){const u=d.dimension,h=u==="length"?'"40 mm"':'"30 deg"';if(f===void 0){l[c]={value:0,unit:d.einheit??(u==="length"?"mm":"deg")};continue}const m=typeof f=="number"?String(f):f;if(typeof m!="string")return Nt("invalid_arguments",`${r}: ${c} muss ein Text sein.`,`z. B. ${h}`);const _=m.trim(),p=new RegExp(u==="length"?ih:rh,"i").test(_)?tl(_,u):null;if(!p)return Nt("unit",`${r}: ${c} = "${_}" ist keine ${u==="length"?"Länge":"Winkel"} mit Einheit.`,`Schreibe die Zahl mit Einheit, z. B. ${h}.`);l[c]=p;continue}if(f!==void 0){if(typeof f!="string")return Nt("invalid_arguments",`${r}: ${c} muss ein Text sein.`,'z. B. "P1.point"');if(d.typ==="referenz"){const u=j_(t,c,f.trim(),d.ausgang??"point");if(typeof u!="string")return u;l[c]=u}else if(d.typ==="element"){const u=f.trim().split(".")[0];if(!oh(t).get(u))return Nt("input_missing",`${r}: Element ${u} gibt es nicht.`,"Nimm eine Element-ID aus der Modellübersicht.",u);l[c]=u}else l[c]=f}}return typeof l.a=="string"&&l.a===l.b?Nt("degenerate",`${r}: a und b sind derselbe Punkt.`,"Eine Linie braucht zwei verschiedene Punkte; lege bei Bedarf zuerst einen zweiten Punkt an.",String(l.a).split(".")[0]??null):l}const tx=n=>!!n&&typeof n=="object"&&n.ok===!1&&"code"in n,Vc=n=>new Set(Gi(n).map(e=>e.id));async function nx(n,e,t,i){const r=n.register.find(p=>p.ki===!0&&nl(p.id)===t),s=il(n.register).map(p=>p.name);if(!r)return{entwurf:e,ergebnis:Nt("unknown_tool",`Werkzeug ${t} gibt es nicht.`,`Verfügbar: ${s.join(", ")}.`)};const a=ex(r,i,e.dok);if(tx(a))return{entwurf:e,ergebnis:a};const o=a,l=Vc(e.dok),c=n.imEntwurf(e.dok,()=>n.ausfuehren(r.id,o,"chat","ki"));if(!c.wert)return{entwurf:e,ergebnis:Nt("invalid_arguments",`${t}: der Befehl hatte keine Wirkung.`,"Prüfe die Argumente gegen die Beschreibung des Werkzeugs.")};const d=[...Vc(c.dok)].filter(p=>!l.has(p)),f=d[0]??(typeof o.element=="string"?o.element:void 0),u=c.dok,h=[...new Set([...e.ausgeblendet,...c.ausgeblendet])];let m=e.ergebnis;if(d.length){if(m=await th(eh(Gi(u))),!m)return{entwurf:e,ergebnis:Nt("kernel_unavailable","Der Geometriekern ist gerade nicht erreichbar.","Versuche es gleich noch einmal.")};const p=m.results.find(w=>w.id===d[0]);if(p&&p.state==="fehlerhaft"){const w=p.befunde[0];return{entwurf:e,ergebnis:Nt(w?.code??"degenerate",`${t}: ${w?.text??w?.code??"Befund des Geometriekerns"}.`,"Das Element ließ sich so nicht berechnen; ändere die Argumente (z. B. verschiedene Punkte).",d[0]??null)}}}const _=f?ut(u,f):void 0;if(!_)return{entwurf:e,ergebnis:Nt("invalid_arguments",`${t}: kein Ergebnis.`,"Prüfe die Argumente.")};const g=Q_(_,m);return r.id==="element.verwerfen"&&(delete g.ausgaenge,g.verworfen=!0),r.id==="element.ausblenden"&&(delete g.ausgaenge,g.ausgeblendet=!0),{entwurf:{dok:u,ausgeblendet:h,ergebnis:m},ergebnis:g,ausfuehrung:{befehl:r.id,parameter:o,element:_.id,angelegt:d.length>0}}}const Ta=20,Hc=6e3,ix=()=>({bruecke:!1,aktiv:"regel",anbieter:[],karten:[],beschaeftigt:!1,bereitMs:null});async function Rs(n,e){return await(await fetch(n,{method:e===void 0?"GET":"POST",headers:e===void 0?{}:{"Content-Type":"application/json"},body:e===void 0?void 0:JSON.stringify(e),cache:"no-store"})).json()}async function rx(n){try{if(!(await Rs("kernel-status.json")).ki)return;const t=await Rs("ki/anbieter");n.ki.bruecke=!0,n.ki.aktiv=t.aktiv,n.ki.anbieter=t.anbieter}catch{}n.rendern()}function lh(n){const e=n.ki.anbieter.find(t=>t.id===n.ki.aktiv);return!e||e.id==="regel"?n.t("ki.kopf.regel"):e.ziel==="lokal"?n.t("ki.kopf.lokal",{modell:e.modell??e.id}):n.t("ki.kopf.extern",{modell:e.modell??e.id,host:e.ziel})}async function sx(n,e){n.ki.beschaeftigt=!0,n.rendern();try{const t=await Rs("ki/anbieter",{id:e});if(n.ki.aktiv=t.aktiv,n.ki.anbieter=t.anbieter,t.aktiv!==e){const i=t.anbieter.find(r=>r.id===e);n.chat.nachrichten.push({von:"ki",text:n.t("ki.antwort.nicht-verfuegbar",{befund:ax(i?.befund)})})}}catch{}finally{n.ki.beschaeftigt=!1,n.rendern()}}const ax=n=>typeof n=="string"?n:n&&typeof n=="object"?String(n.code):"";function ox(n){return n?`${n.value} ${n.unit}`:""}function lx(n){const e=[],t=Gi(n.dokument()),i=o=>{const l=[`${o.id} ${o.type} "${o.id}" (${o.meta.name})`];for(const[c,d]of Object.entries(o.params??{}))l.push(`${c}=${ox(d)}`);for(const[c,d]of Object.entries(o.inputs??{}))l.push(`${c}=${String(d)}`);return n.istAusgeblendet(o.id)&&l.push("[ausgeblendet]"),St(o)&&l.push("[verworfen]"),l.join(" ")};for(const o of t)e.push(i(o));let r=e;const s=n.t("ki.uebersicht.kopf");if(r.join(`
`).length>Hc){const o=new Set(n.auswahlIds());r=[...t.filter(c=>o.has(c.id)||c.type==="frame").map(i)];for(const c of[...e].reverse()){if([...r,c].join(`
`).length>Hc)break;r.includes(c)||r.push(c)}}const a=n.auswahlIds();return[s,...r.length?r:[n.t("ki.uebersicht.leer")],`zu: ${a.length?a.join(", "):"–"}`].join(`
`)}const cx=(n,e)=>{if(Array.isArray(e))return[e];if(n==="segment"&&e.start&&e.end)return[e.start,e.end];if((n==="line"||n==="ray")&&e.origin&&e.direction){const t=e.origin,i=e.direction,r=s=>[t[0]+i[0]*s,t[1]+i[1]*s,t[2]+i[2]*s];return[n==="ray"?t:r(-1e4),r(1e4)]}return e.origin?[e.origin]:[]};function ux(n,e,t){const i=[],r=new Map(vt(n).map(s=>[s.id,s]));for(const s of t){const a=r.get(s),o=e?.results.find(u=>u.id===s);if(!a||!o||o.state!=="aktuell")continue;const l={frame:"frame"}[a.type]??a.type,c=o.outputs[l],d=a.type==="frame"?Fc(o.outputs.frame):Fc(c);if(!d)continue;const f=a.type==="frame"&&!Array.isArray(d)?d.origin??[0,0,0]:d;i.push({element:s,art:a.type,lage_mm:f,punkte:cx(a.type,f)})}return i}function rl(n){n.draht.geister=n.ki.karten.filter(e=>e.offen).flatMap(e=>e.geister)}function lr(n,e){n.chat.nachrichten.push({von:"ki",text:e})}async function hx(n,e,t){const i=performance.now();n.ki.beschaeftigt=!0,n.rendern();const r=[{rolle:"system",text:lx(n)},{rolle:"mensch",text:e}],s=il(n.register);let a={dok:Xt(n.dokument()),ausgeblendet:[],ergebnis:n.draht.ergebnis};const o=[],l=[];let c=n.ki.aktiv,d="",f="",u=!0;try{for(;o.length<Ta;){let p;try{p=await Rs("ki/schritt",{nachrichten:r,werkzeuge:s})}catch{p={anbieter:c,aufrufe:[],fehler:"bruecke"}}if(c=p.anbieter??c,p.fehler){f=p.fehler==="zeitlimit"?n.t("ki.antwort.zeitlimit"):n.t("ki.antwort.fehler",{fehler:p.fehler});break}if(!p.aufrufe?.length){d=p.text??"",u=p.erkannt!==!1;break}const w=p.aufrufe.slice(0,Ta-o.length);r.push({rolle:"ki",text:p.text,aufrufe:w});for(const T of w){const S=await nx(n,a,T.werkzeug,T.argumente);a=S.entwurf,S.ausfuehrung&&l.push(S.ausfuehrung),o.push({werkzeug:T.werkzeug,argumente:T.argumente,ergebnis:S.ergebnis}),r.push({rolle:"werkzeug",aufruf_id:T.id,ergebnis:S.ergebnis})}o.length>=Ta&&(d=n.t("ki.antwort.grenze"))}}finally{n.ki.beschaeftigt=!1}if(!l.length){if(f)lr(n,f);else if(!(!u&&t()))if(!u||!d)lr(n,n.t("ki.antwort.unklar"));else{const p=o.map(w=>w.ergebnis).filter(w=>!w.ok).map(w=>w.message);lr(n,[d,...p].filter(Boolean).join(" "))}n.ki.bereitMs=Math.round(performance.now()-i),n.rendern();return}const h=l.filter(p=>p.angelegt).map(p=>p.element),m=l.filter(p=>p.befehl==="element.verwerfen").map(p=>p.element),_=Object.fromEntries(vt(a.dok).filter(p=>[...h,...m,...a.ausgeblendet].includes(p.id)).map(p=>[p.id,p.meta.name]));a.ergebnis&&n.draht.vormerken(eh(Gi(a.dok)),a.ergebnis);const g={nr:n.ki.karten.length+1,titel:e.length>90?`${e.slice(0,88)} …`:e,begruendung:d||f||n.t("ki.antwort.vorschlag"),anbieter:c,aufrufe:o,neu:h,verworfen:m,ausgeblendet:a.ausgeblendet,befunde:o.map(p=>p.ergebnis).filter(p=>!p.ok).map(p=>({code:p.code,message:p.message,element_id:p.element_id})),offen:!0,status:"offen",namen:_,ausfuehrungen:l,geister:ux(a.dok,a.ergebnis,h)};n.ki.karten.push(g),rl(n),n.chat.nachrichten.push({von:"ki",text:f||n.t("ki.antwort.vorschlag"),karte:g.nr}),n.ki.bereitMs=Math.round(performance.now()-i),n.rendern()}function Gc(n,e){const t=n.ki.karten.filter(i=>i.offen);return typeof e=="number"?t.find(i=>i.nr===e):t[t.length-1]}function dx(n,e){const t=new Map,i=a=>{if(typeof a!="string")return a;const[o,l]=a.split("."),c=t.get(o);return c?l?`${c}.${l}`:c:a},r=()=>new Set(Gi(n.dokument()).map(a=>a.id)),s=[];n.kiAnbieter=e.anbieter;try{n.einSchritt(()=>{for(const a of e.ausfuehrungen){const o=Object.fromEntries(Object.entries(a.parameter).map(([d,f])=>[d,i(f)])),l=r();if(n.ausfuehren(a.befehl,o,"chat","ki")||s.push(a.element),a.angelegt){const d=[...r()].find(f=>!l.has(f));d&&t.set(a.element,d)}}})}finally{n.kiAnbieter=null}e.offen=!1,e.status="uebernommen",rl(n),lr(n,s.length?n.t("ki.antwort.teilweise",{n:s.length}):n.t("chat.antwort.erledigt"))}function fx(n,e){e.offen=!1,e.status="verworfen",rl(n),lr(n,n.t("chat.antwort.verworfen"))}const mx={menueleiste:"Menu bar",taskleiste:"Task bar",struktur:"Structure",modell:"Model",eigenschaften:"Properties",chat:"Chat",panel:"Panel",rueckmeldung:"Feedback"},px={start:"Start",folgt:"soon",mehr:"More …"},gx={modellieren:"Modeling",simulation:"Simulation (simulated)",shop:"Shop (soon)"},vx="simulated",_x={platzhalter:"Search commands and content",befehle:"Commands",inhalte:"Content","folgt-spaeter":"Coming later","alle-zeigen":"Show all",nichts:"Nothing found"},xx={Datei:"File",Bearbeiten:"Edit",Auswahl:"Selection",Ansicht:"View",Sichtbarkeit:"Visibility","Ansicht speichern":"Saved views",Fenster:"Window",Hilfe:"Help",Baugruppe:"Assembly",Simulation:"Simulation",Chat:"Chat",Referenz:"Reference"},bx={Neu:"New",Öffnen:"Open",Projekt:"Project",Verlauf:"History",Element:"Element",Werte:"Values",Berechnung:"Calculation",Auswahl:"Selection",Befehle:"Set selection",Regeln:"By rule",Zonen:"Zones",Suche:"Search",Fenster:"Window",Einstellungen:"Settings",Hierarchie:"Hierarchy",Verbinden:"Connect",Studie:"Study",Blick:"View angle",Darstellung:"Display",Stand:"State",Sichtbarkeit:"Visibility",Gespeichert:"Saved",Hilfe:"Help",Chat:"Chat",Weitere:"More",Koordinatensystem:"Coordinate system",Punkt:"Point",Linie:"Line"},Sx={titel:"Structure",wurzel:"Root",leer:"Nothing here yet. Create your first part.","leer-simulation":"No study yet. Simulation is a placeholder and simulated.",verworfen:"discarded"},yx={leer:"The model is empty."},Mx={fertig:"Done"},wx={titel:"Path"},Ex={titel:"View",mehr:"More views"},Ax={person:"Test person B",kuerzel:"B"},Tx={"zustand-unbekannt":"State unknown",korrektur:"Set last valid value","bohrung-zu-gross":"The diameter {wert} is too large; below {grenze} the hole is valid.","steg-ohne-hoehe":"The rib needs a height above {grenze}."},kx={fehlerhaft:"faulty",pausiert:"paused",rechnet:"calculating"},Rx={befunde:"Findings","keine-befunde":"No findings. Everything is up to date."},Cx={fehler:{"nicht-lesbar":"Value not readable. Example: 12 mm",dimension:"Wrong unit for this field",teilung:"Division by zero is not possible"}},Px={gemischt:"mixed","n-elemente":"{n} elements","umbenennen-hinweis":"Double-click to rename"},zx={masse:"Dimensions",material:"Material",ergebnis:"Result",ansicht:"View",lage:"Position"},Lx={laenge:"Length",breite:"Width",dicke:"Thickness",hoehe:"Height",eckradius:"Corner radius",durchmesser:"Diameter",wand:"Wall",material:"Material",dichte:"Density",abmessungen:"Size",volumen:"Volume","masse-wert":"Mass",projektion:"Projection",darstellung:"Display",x:"x",y:"y",z:"z",rx:"Rotation x",ry:"Rotation y",rz:"Rotation z"},Dx={orthogonal:"orthographic",perspektivisch:"perspective"},Ix={koerper:"Solid",kanten:"Edges",durchsicht:"See-through"},Nx={standard:"Default",solidworks:"like Onshape/SolidWorks"},Ux={kopie:"copy",ansicht:"View",schnitt:"Section"},Fx={titel:"Chat",zu:"to:","n-elemente":"{n} elements",platzhalter:"Question or task …",hinweis:"For example: rib 40 mm high",uebernehmen:"Accept",verwerfen:"Discard",beispiel:{frage:"The rib should become 40 mm high."},antwort:{vorschlag:"I propose this change. Have a look at the preview.",unklar:"I did not understand. Try: rib 40 mm high, copy of the rib or discard the rib.",erledigt:"Done. You can take it back with undo.",verworfen:"The proposal is discarded."},vorschlag:{wert:"{element}: {feld} to {nachher}",duplizieren:"Duplicate {element}",verwerfen:"Discard {element}",anlegen:"Create a new element",begruendung:"Simulated proposal; it applies only after you accept."}},Ox={folgt:"{befehl} comes in a later stage.",angelegt:"{name} created",dupliziert:"{name} created",umbenannt:"Renamed to {name}",verworfen:"{name} discarded; bring it back with undo or restore",zurueckgeholt:"{name} restored","wert-gesetzt":"Value of {name} changed",umgehaengt:"{name} now sits in {ziel}","ansicht-gespeichert":"{name} saved",rueckgaengig:"Last step undone",wiederholt:"Step restored",befund:"Finding at {name}; the other elements stay usable","ziel-waehlen":"Choose the target in the structure.","auswahl-ziel":"Pick elements in the model or the structure.","isolieren-ziel":"Select what you want to isolate first.",draht:{"punkt-klicken":"Click into the model to set the point","zwei-punkte":"Select two points","zweiter-punkt":"Select the second point","einen-punkt":"Select one point",abgebrochen:"Cancelled","esc-abbrechen":"to cancel"}},Bx={"kein-ziel":"Nothing can be dropped here.","nur-teile":"Only parts and assemblies can be moved; steps stay in their part.","eigener-nachfahre":"An element cannot go into itself or into its own part.","kein-behaelter":"A part cannot hold other elements; choose an assembly.","schon-darin":"The element is already there."},Vx={titel:"Component catalog",einleitung:"Each component is shown here exactly as it is built in the prototype. Whoever builds a new screen uses these pages as the yardstick.",zurueck:"Back to overview",ueberschrift:{regel:"Rule",bezug:"Reference",befehle:"Commands",tokens:"Tokens"},hell:"Light",dunkel:"Dark",bezug:{muster:"Pattern “{name}” from the pattern catalog.",kandidat:"Candidate “{name}”, not yet a pattern."},baustein:{zustaende:"Element states",auswahl:"Selection","struktur-zeile":"Structure row",auge:"Eye",kontextmenue:"Context menu",kontextaktionen:"Context actions",dropdown:"Dropdown",suche:"Search",wertfeld:"Value field",griff:"Handle","ziehen-ablegen":"Drag and drop",statusanzeige:"Status display",befund:"Finding",rueckmeldung:"Feedback",entscheidungskarte:"Decision card",pfad:"Path","dokument-reiter":"Document tab",ansichtsleiste:"View bar","fokus-tastatur":"Focus and keyboard"},regel:{zustaende:"An element shows every state through a fixed channel so states never hide each other. The outline belongs to selection, hovering and another person, and exactly one wins: selected before other person before hovered. Status, visibility and surroundings always come on top. The accent stands only for selection and hovering.",auswahl:"There is exactly one selection for the whole window. Structure, model, properties and chat read it and change it only through the same commands. A click selects, Shift adds, Ctrl toggles, a click into empty space clears. With several elements the properties show only what they share.","struktur-zeile":"A row shows icon, name, status and the eye, all always visible. The selected row carries the accent surface, hovering carries the quiet surface. A double-click or Enter makes the element active. Rows can be dragged to move them.",auge:"The eye is always visible in every row, not only on hover. It hides only for this person; export stays untouched. Show everything brings everything back. Visibility is view and not a step in the history.",kontextmenue:"The context menu is generated from the command register and is the same in structure and model for the same selection. It is grouped by family, each group shows at most twelve entries, minor ones sit behind “More …”. Within a group the rank applies. Shortcuts stand next to the entry.",kontextaktionen:"The bar above the selection shows the first five entries of the context menu by rank, not a list of its own. It replaces the toolbar. Numbers never appear here but in the properties.",dropdown:"A dropdown of the menu bar shows all commands of its family in subgroups with at most twelve entries each. The content comes from the register, not by hand. Entries that do not fit are grey. The shortcut stands next to each entry.",suche:"Search finds commands and content in one field and opens with Ctrl and K. Results come from the command register and show their shortcut. Arrow keys choose, Enter runs, Esc closes. Commands without another place, such as help, are found only here.",wertfeld:"Every number stands as a quantity with a unit in a value field. You type the value, also with a unit or a simple formula, and accept with Enter; Esc restores the old value. While typing the model changes live. An unreadable entry shows a finding at the field.",griff:"On the selected element there is a handle for its length, for example the thickness. While dragging the value jumps in whole millimetres, the number stands at the pointer. Typing digits then sets that exact value. Releasing or Enter accepts, Esc cancels.","ziehen-ablegen":"A row can be dragged onto another to move it. A permitted target carries the accent surface, a forbidden one the error surface, and the reason appears in the feedback line. Parts and assemblies may go into an assembly, steps stay in their part. Esc cancels the drag, then nothing changes.",statusanzeige:"A status always appears as colour, icon and word together. It stands at the row in the structure and at the element in the model. Calculating, faulty and paused are the three states. A fault in one element never paralyses the whole model.",befund:"A finding says what is wrong, where, and how to fix it. It stands in the findings panel, and for a wrong entry also at the value field. The correction is a button, for example “Set last valid value”. All other elements stay usable.",rueckmeldung:"Confirmations and hints stand quietly in the narrow line at the very bottom. There are no dialogs and no messages anywhere else. The text says briefly what happened, without exclamation marks. Discarded items can be brought back with undo.",entscheidungskarte:"Every change by the AI appears as a card with a preview, never directly. The card says what changes, with the value before and after. Accept is the one main action and carries the accent. Only after accepting does the same command appear in the history, with the source AI.",pfad:"The path shows where you are working: from the root to the active element. A click on a link goes back there, a click on the root leaves the active element. The last link is emphasised. Done and Esc lead out the same way.","dokument-reiter":"The tabs above the model are documents, nothing else. There are no command tabs and no tabs within tabs. The chosen tab is emphasised. If another person works in a tab, it shows a small person icon.",ansichtsleiste:"The view bar in the model contains fit, zoom to selection, isolate, show everything, projection and display. More views and saving a view are in the menu at the edge of the bar. Everything here is view and never changes the graph. A saved view is stored explicitly as an element.","fokus-tastatur":"Every zone is reachable by Tab or F6, and focus is visible as a ring in the accent colour. Esc always closes exactly one level. There are at most fifteen shortcuts, and all stand in the command register and next to the command in the menu. Nothing is reachable by mouse alone."},zustand:{hover:"Hovered",ausgewaehlt:"Selected",andere:"Edited by others",aktiv:"Active",gedimmt:"Surroundings of the active element",ausgeblendet:"Hidden",fehlerhaft:"Faulty",pausiert:"Paused",rechnet:"Calculating"},bsp:{"auswahl-struktur":"Structure with two selected rows","auswahl-eigenschaften":"Properties with “mixed”","auswahl-chat":"Chat context","auge-an":"Visible","auge-aus":"Hidden",kontextmenue:"Context menu on a step","ein-element":"One element selected",mehrere:"Several elements selected",suche:"Search with input “ver”",wert:"Value field",gemischt:"Different values",fehler:"Unreadable entry",griff:"Handle with number at the pointer","ablegen-ok":"Permitted target","ablegen-nein":"Forbidden target",rueckmeldung:"Quiet line",karte:"AI proposal (simulated)",pfad:"Active part in an assembly","pfad-wurzel":"Nothing active",reiter:"Two documents",ansichtsleiste:"View bar",fokus:"Row with focus ring",kuerzel:"All shortcuts"}},Hx={element:{anlegen:"Create new",duplizieren:"Duplicate",umbenennen:"Rename",verwerfen:"Discard",zurueckholen:"Restore","wert-setzen":"Set value","parameter-anlegen":"Create parameter",pausieren:"Pause calculation",fortsetzen:"Resume calculation",ausblenden:"Hide",einblenden:"Show",umhaengen:"Move (choose target)",aktivieren:"Activate",verlassen:"Leave active element"},dokument:{oeffnen:"Open",schliessen:"Close document",wechseln:"Switch document"},wurzel:{setzen:"Choose root of the structure"},einstellungen:{oeffnen:"Open settings"},projekt:{teilen:"Share project",einladen:"Invite person"},bearbeiten:{rueckgaengig:"Undo",wiederholen:"Redo",einfuegen:"Paste"},auswahl:{duplizieren:"Duplicate selection",verwerfen:"Discard selection",alles:"Select all",aufheben:"Clear selection",umkehren:"Invert selection",setzen:"Select",hinzufuegen:"Add to selection",umschalten:"Toggle selection",aehnliche:"Select similar",kantenschleife:"Select edge loop",ausblenden:"Hide selection"},ansicht:{einpassen:"Fit all","auf-auswahl":"Zoom to selection",projektion:"Perspective or orthographic",vorne:"Front view",oben:"Top view",isometrisch:"Isometric view",schnitt:"Section view",isolieren:"Isolate","alles-einblenden":"Show everything",verworfenes:"Show discarded",ergebnis:"Result view","alle-entwuerfe":"All drafts view",speichern:"Save view",anwenden:"Apply saved view"},darstellung:{wechseln:"Change display"},sichtbarkeit:{"nur-dieses":"Show only this","farbe-setzen":"Set display color"},fenster:{struktur:"Show or hide structure",panel:"Show or hide panel",rechts:"Show or hide right sidebar","naechste-zone":"Next zone",teilen:"Split window"},suche:{oeffnen:"Open command search"},thema:{umschalten:"Light or dark"},einstellung:{navigationsprofil:"Choose navigation profile"},katalog:{oeffnen:"Open catalog"},hilfe:{"befehle-zeigen":"Show all commands",einfuehrung:"Start introduction"},baugruppe:{anlegen:"Create assembly","instanz-anlegen":"Create instance of a component","variante-waehlen":"Choose variant","kollision-pruefen":"Check collision",fixieren:"Fix part","komponente-anlegen":"Create component from part"},verbindung:{anlegen:"Create connection","verbindungspunkt-setzen":"Set connection point",bewegen:"Move within degrees of freedom"},simulation:{lager:"Add support",kraft:"Add force",ergebnis:"Show result"},chat:{senden:"Send message",uebernehmen:"Accept proposal",verwerfen:"Reject proposal"},task:{wechseln:"Switch task"},referenz:{koordinatensystem:"Set coordinate system",punkt:"Set point","punkt-relativ":"Set point relative",gerade:"Line through two points",halbgerade:"Ray through two points",strecke:"Segment through two points"},ki:{"anbieter-waehlen":"Choose AI provider"}},Gx={kind:{ursprung:"Origin",x:"X axis",y:"Y axis",z:"Z axis",xy:"XY plane",yz:"YZ plane",zx:"ZX plane"},name:{koordinatensystem:"Coordinate system {n}",punkt:"Point {n}",line:"Line {n}",ray:"Ray {n}",segment:"Segment {n}"},"keine-lage":"Position from the geometry kernel"},Wx={befund:{input_missing:"Reference missing: point the input to an existing element",input_discarded:"Reference {bezug} is discarded: restore it or choose another",input_type:"Reference has the wrong type: choose a matching element",input_failed:"Reference {bezug} has an error: fix {bezug} first",degenerate:"Both points coincide: move them apart",unit:"Wrong unit: enter lengths in mm, angles in degrees",unknown_type:"Unknown element type",kernel_error:"Error in the geometry kernel",protocol:"Invalid message to the geometry kernel",kernel_unavailable:"Geometry service unavailable"}},Xx={werkzeug:{referenz:{koordinatensystem:'Create a coordinate system: origin x, y, z and rotation rx, ry, rz. Example: {"x": "100 mm", "rz": "30 deg"}',punkt:'Place a point at coordinates. Example: {"x": "10 mm", "y": "20 mm", "z": "0 mm"}',"punkt-relativ":'Place a point offset from point ref. Example: {"ref": "P1.point", "z": "25 mm"}',gerade:'Infinite line through points a and b. Example: {"a": "P1.point", "b": "P2.point"}',halbgerade:'Ray starting at a through b. Example: {"a": "P1.point", "b": "P2.point"}',strecke:'Segment from a to b. Example: {"a": "P1.point", "b": "P2.point"}'},element:{ausblenden:'Hide an element. Example: {"element": "G1"}',verwerfen:'Discard an element (undo brings it back). Example: {"element": "S1"}'}},kopf:{regel:"Sentence recognition – no model, stays on this computer",lokal:"{modell} – stays on this computer",extern:"{modell} – goes to {host}"},uebersicht:{kopf:'Model overview (per line: ID type "ID" (name) parameters references):',leer:"(no elements yet)"},antwort:{vorschlag:"Here is my proposal. The model shows a preview; only Apply changes anything.",unklar:"I did not understand that. Try for example: „Punkt bei 10, 20, 5 mm“, „Rechteck 100 × 60 mm in der XY-Ebene mit Punkt 40 mm darüber“, „Koordinatensystem bei x 100 mm, um 30° um z gedreht“.",zeitlimit:"No answer from the model (time limit). Nothing was changed.",fehler:"The model cannot be reached ({fehler}). Nothing was changed.",grenze:"I stopped after 20 steps; the card shows what was done so far.",teilweise:"Applied; {n} steps could not be carried out any more.","nicht-verfuegbar":"This provider is not set up ({befund}); sentence recognition stays active."},karte:{neu:"{n} new",verworfen:"{n} discarded",ausgeblendet:"{n} hidden"},status:{offen:"Proposal",uebernommen:"applied",verworfen:"discarded"},hinweis:"For example: Punkt bei 10, 20, 5 mm",denkt:"Working on it …"},$x={zone:mx,menue:px,task:gx,simuliert:vx,suche:_x,familie:xx,untergruppe:bx,struktur:Sx,modell:yx,aktiv:Mx,pfad:wx,ansichtsleiste:Ex,anwesenheit:Ax,befund:Tx,status:kx,panel:Rx,wert:Cx,eigenschaften:Px,gruppe:zx,feld:Lx,projektion:Dx,darstellung:Ix,profil:Nx,name:Ux,chat:Fx,rueck:Ox,dnd:Bx,katalog:Vx,befehl:Hx,draht:Gx,kernel:Wx,ki:Xx};function qx(n){const e=new URLSearchParams(n).get("sprache");return e==="en"||e==="schluessel"?e:"de"}function Yx(n,e){const t=n[e];if(typeof t=="string")return t;let i=n;for(const r of e.split(".")){if(typeof i!="object")return;i=i[r]}return typeof i=="string"?i:void 0}function Kx(n){return(e,t)=>{if(n==="schluessel")return e;const r=Yx(n==="en"?$x:nh,e)??e;return t?r.replace(/\{(\w+)\}/g,(s,a)=>String(t[a]??"")):r}}function ui(n,e){const t=typeof navigator<"u"&&/Mac|iPhone|iPad/.test(navigator.userAgent),i=n.split("+"),r=i[i.length-1]??"",s=i.slice(0,-1);if(t){const o={Mod:"⌘",Umschalt:"⇧",Shift:"⇧",Alt:"⌥"};return s.map(l=>o[l]??l).join("")+r}const a={Mod:e==="en"?"Ctrl":"Strg",Umschalt:e==="en"?"Shift":"Umschalt",Shift:e==="en"?"Shift":"Umschalt",Alt:"Alt"};return[...s.map(o=>a[o]??o),r].join("+")}/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zx={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ch=([n,e,t])=>{const i=document.createElementNS("http://www.w3.org/2000/svg",n);return Object.keys(e).forEach(r=>{i.setAttribute(r,String(e[r]))}),t?.length&&t.forEach(r=>{const s=ch(r);i.appendChild(s)}),i},Jx=(n,e={})=>{const i={...Zx,...e};return ch(["svg",i,n])};/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qx=[["path",{d:"m5 12 7-7 7 7"}],["path",{d:"M12 19V5"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jx=[["path",{d:"M12 5v16"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eb=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tb=[["path",{d:"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"}],["path",{d:"m7 16.5-4.74-2.85"}],["path",{d:"m7 16.5 5-3"}],["path",{d:"M7 16.5v5.17"}],["path",{d:"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"}],["path",{d:"m17 16.5-5-3"}],["path",{d:"m17 16.5 4.74-2.85"}],["path",{d:"M17 16.5v5.17"}],["path",{d:"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"}],["path",{d:"M12 8 7.26 5.15"}],["path",{d:"m12 8 4.74-2.85"}],["path",{d:"M12 13.5V8"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nb=[["path",{d:"M20 6 9 17l-5-5"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ib=[["path",{d:"m6 9 6 6 6-6"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rb=[["path",{d:"m9 18 6-6-6-6"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sb=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ab=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"12",cy:"12",r:"10"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ob=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"10",x2:"10",y1:"15",y2:"9"}],["line",{x1:"14",x2:"14",y1:"15",y2:"9"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lb=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cb=[["path",{d:"M10 22v-8"}],["path",{d:"M2.336 8.89 10 14l11.715-7.029"}],["path",{d:"M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ub=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hb=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const db=[["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fb=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mb=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pb=[["path",{d:"M12 2v4"}],["path",{d:"m16.2 7.8 2.9-2.9"}],["path",{d:"M18 12h4"}],["path",{d:"m16.2 16.2 2.9 2.9"}],["path",{d:"M12 18v4"}],["path",{d:"m4.9 19.1 2.9-2.9"}],["path",{d:"M2 12h4"}],["path",{d:"m4.9 4.9 2.9 2.9"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gb=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vb=[["path",{d:"M4 5h16"}],["path",{d:"M4 12h16"}],["path",{d:"M4 19h16"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _b=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 15h18"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xb=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 3v18"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bb=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M15 3v18"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sb=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yb=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mb=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wb=[["path",{d:"m15 14 5-5-5-5"}],["path",{d:"M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Eb=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ab=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tb=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{d:"M20 2v4"}],["path",{d:"M22 4h-4"}],["circle",{cx:"4",cy:"20",r:"2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kb=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rb=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cb=[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pb=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zb=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]],Lb="http://www.w3.org/2000/svg",Db=new Set(["svg","path","line","rect","circle","polygon","polyline","g","text"]);function P(n,e={},...t){const i=Db.has(n)?document.createElementNS(Lb,n):document.createElement(n);for(const[r,s]of Object.entries(e))s==null||s===!1||(r==="class"?i.setAttribute("class",String(s)):i.setAttribute(r,s===!0?"":String(s)));n==="input"&&e.value!==void 0&&(i.value=String(e.value));for(const r of t)r===null||r===!1||r===void 0||i.append(typeof r=="string"?document.createTextNode(r):r);return i}const Ib={"arrow-up":Qx,"book-open":jx,box:eb,boxes:tb,check:nb,"chevron-down":ib,"chevron-right":rb,"circle-alert":sb,"circle-dot":ab,"circle-pause":ob,copy:lb,cuboid:cb,eye:hb,"eye-off":ub,focus:db,"folder-open":fb,layers:mb,loader:pb,maximize:gb,menu:vb,"panel-bottom":_b,"panel-left":xb,"panel-right":bb,pencil:Sb,play:yb,plus:Mb,"redo-2":wb,search:Eb,settings:Ab,sparkles:Tb,square:kb,"trash-2":Rb,"undo-2":Cb,user:Pb,x:zb};function _t(n,e=16){const t=Jx(Ib[n],{width:e,height:e,"stroke-width":2,"aria-hidden":"true"}),i=P("span",{class:"symbol","data-icon":n});return i.append(t),i}const cr=n=>n instanceof Element?n.getAttribute("data-key")??null:null;function Nb(n,e){return n.nodeType!==e.nodeType?!1:n instanceof Element&&e instanceof Element?n.nodeName===e.nodeName&&cr(n)===cr(e):!0}function Ub(n,e){for(const t of[...n.attributes])t.name!=="data-editiert"&&!e.hasAttribute(t.name)&&n.removeAttribute(t.name);for(const t of[...e.attributes])n.getAttribute(t.name)!==t.value&&n.setAttribute(t.name,t.value)}function hs(n,e){if(n instanceof Text&&e instanceof Text){n.nodeValue!==e.nodeValue&&(n.nodeValue=e.nodeValue);return}if(!(n instanceof Element)||!(e instanceof Element))return;if(Ub(n,e),n instanceof HTMLInputElement&&e instanceof HTMLInputElement){!(document.activeElement===n&&n.hasAttribute("data-editiert"))&&n.value!==e.value&&(n.value=e.value);return}const t=new Set,i=[...n.childNodes],r=new Map;for(const o of i){const l=cr(o);l!==null&&r.set(l,o)}let s=0;const a=[...e.childNodes];for(const[o,l]of a.entries()){const c=cr(l);let d;if(c!==null)d=r.get(c);else for(;s<i.length;){const f=i[s];if(s+=1,!t.has(f)&&cr(f)===null&&Nb(f,l)){d=f;break}}if(d){t.add(d),hs(d,l);const f=n.childNodes[o];f!==d&&n.insertBefore(d,f??null)}else{const f=n.childNodes[o];n.insertBefore(l,f??null),t.add(l)}}for(const o of[...n.childNodes])t.has(o)||n.removeChild(o)}const Fb=8,Ob=12,Bb=3;function uh(n,e,t){const i=e.trim().toLowerCase(),r=a=>n.t(a.titel).toLowerCase(),s=n.register.filter(a=>!!a.folgt===t);return i?s.filter(a=>r(a).includes(i)).sort((a,o)=>{const l=r(a).startsWith(i)?0:1,c=r(o).startsWith(i)?0:1;return l-c||r(a).length-r(o).length||a.rang-o.rang}):s.sort((a,o)=>a.rang-o.rang)}function Vb(n,e){return uh(n,e,!1)}function Hb(n,e){return e.trim()||n.suche.alle?uh(n,e,!0):[]}function hh(n){const e=Vb(n,n.suche.text);return n.suche.alle?e:e.slice(0,n.suche.text.trim()?Ob:Fb)}function dh(n,e,t){return P("button",{type:"button",role:"option",class:"eintrag","data-befehl":e.id,"data-key":`s-${e.id}`,"aria-selected":t?"true":"false","data-akzent":t?"auswahl":null,"data-folgt":e.folgt?"true":null,tabindex:"-1"},P("span",{class:"titel"},n.t(e.titel)),e.folgt?P("span",{class:"folgt"},n.t("menue.folgt")):null,e.kuerzel?P("kbd",{},ui(e.kuerzel,n.sprache)):null)}function Gb(n,e){const t=n.t("suche.folgt-spaeter"),i=n.suche.alle&&!n.suche.text.trim(),r=n.sucheFolgtAlle||i?e:e.slice(0,Bb),s=r.map(o=>dh(n,o,!1)),a=r.length<e.length?P("button",{type:"button",class:"eintrag","data-suche-folgt-alle":"",tabindex:"-1"},P("span",{class:"titel"},n.t("suche.alle-zeigen"))):null;return i?P("details",{"data-gruppe":t,"data-key":"g-folgt","data-folgt-spaeter":""},P("summary",{class:"gruppenkopf"},t),...s):P("div",{"data-gruppe":t,"data-key":"g-folgt","data-folgt-spaeter":""},P("div",{class:"gruppenkopf"},t),...s,a)}function fh(n){const e=hh(n),t=Hb(n,n.suche.text),i=n.suche.text.trim().toLowerCase(),r=i?vt(n.dokument()).filter(a=>a.id!==n.dokument().id&&a.meta.name.toLowerCase().includes(i)).slice(0,4):[],s=Math.min(n.suche.index,Math.max(0,e.length-1));return P("div",{class:"popup suche-popup",role:"listbox","data-overlay":"suche","data-ort":"suche","data-weg":"suche","data-muster":"Suche"},P("input",{type:"text",class:"suche-eingabe","data-suchfeld":"","data-editiert":"",value:n.suche.text,placeholder:n.t("suche.platzhalter"),"aria-label":n.t("suche.platzhalter"),autocomplete:"off"}),P("div",{class:"ergebnisse","data-text":n.suche.text},e.length?P("div",{"data-gruppe":n.t("suche.befehle"),"data-key":"g-befehle"},P("div",{class:"gruppenkopf"},n.t("suche.befehle")),...e.map((a,o)=>dh(n,a,o===s))):null,e.length===0&&r.length===0&&t.length===0?P("div",{class:"leer","data-key":"keine"},n.t("suche.nichts")):null,r.length?P("div",{class:"gruppenkopf","data-key":"kopf-inhalte"},n.t("suche.inhalte")):null,...r.map(a=>P("button",{type:"button",role:"option",class:"eintrag","data-suche-element":a.id,"data-key":`e-${a.id}`,"aria-selected":"false",tabindex:"-1"},P("span",{class:"titel"},a.meta.name))),t.length?Gb(n,t):null))}const tr=Object.keys(Qu),mh="cee-prototyp-graph";class ph{constructor(e,t,i,r=Fi,s=Fs()){this.t=e,this.sprache=t,this.tempo=i,this.register=r,this.projekt=s,this.dok=s.content[0]?.id??""}projekt;dok;protokoll=[];sucheFolgtAlle=!1;ausgeloest=[];verlaeufe=new Map;vorschau=null;auswahl=[];hover=null;aktiv=null;isoliert=null;ausgeblendet=new Set;verworfenesZeigen=!1;darstellung="koerper";projektionsart="orthogonal";profil=tr[0]??"";zonen={struktur:!0,panel:!1,rechts:!0};task="modellieren";thema="hell";menue=null;kontextMenue=null;suche={offen:!1,text:"",index:0,alle:!1,fokussiert:!1};umbenennen=null;umbenennenFokussiert=!1;umhaengenModus=null;fokusZone=null;rueckmeldung=null;unbekannterZustand=!1;zustandName="";eingabenWegMerken="menue";tastenfokus=!1;griff=null;dnd=null;status=new Map;rechenzeitMs=0;andere={aktiv:!1,dok:"halter",element:"steg"};chat={nachrichten:[],eingabe:"",vorschlag:null};ki=ix();katalogOffen=null;szene=null;draht=new f_(this);lauscher=[];rendernLaeuft=!1;beiRendern(e){this.lauscher.push(e)}rendern(){this.rendernLaeuft||(this.rendernLaeuft=!0,queueMicrotask(()=>{this.rendernLaeuft=!1;for(const e of this.lauscher)e()}))}rendernSofort(){for(const e of this.lauscher)e()}dokument(){return this.projekt.content.find(e=>e.id===this.dok)??this.projekt.content[0]}angezeigtesDokument(){const e=this.dokument();if(!this.vorschau)return e;const t=Xt(e),i=ut(t,this.vorschau.id);return i&&(i.params[this.vorschau.name]=this.vorschau.wert),t}find(e){return ut(this.dokument(),e)}name(e){return this.find(e)?.meta.name??e}modell(){return Xt(this.projekt)}wurzel(){return this.dokument()}verlauf(){let e=this.verlaeufe.get(this.dok);return e||(e={zurueck:[],vor:[]},this.verlaeufe.set(this.dok,e)),e}verlaufLaenge(){return this.verlauf().zurueck.length}kannRueckgaengig=()=>this.verlauf().zurueck.length>0;kannWiederholen=()=>this.verlauf().vor.length>0;imEntwurfLauf=!1;kiAnbieter=null;imEntwurf(e,t){const i=this.projekt.content,r=this.verlaeufe.get(this.dok),s={protokoll:this.protokoll.length,ausgeloest:this.ausgeloest.length,auswahl:this.auswahl,ausgeblendet:new Set(this.ausgeblendet),rueckmeldung:this.rueckmeldung,aktiv:this.aktiv,modus:this.draht.modus,feldFokus:this.draht.feldFokus,menue:this.menue,kontextMenue:this.kontextMenue},a=this.dokument().id;this.projekt.content=i.map(o=>o.id===a?Xt(e):o),this.verlaeufe.set(this.dok,{zurueck:[],vor:[]}),this.imEntwurfLauf=!0;try{const o=t(),l=[...this.ausgeblendet].filter(c=>!s.ausgeblendet.has(c));return{dok:Xt(this.dokument()),ausgeblendet:l,wert:o}}finally{this.imEntwurfLauf=!1,this.projekt.content=i,r?this.verlaeufe.set(this.dok,r):this.verlaeufe.delete(this.dok),this.protokoll.length=s.protokoll,this.ausgeloest.length=s.ausgeloest,this.auswahl=s.auswahl,this.ausgeblendet=s.ausgeblendet,this.rueckmeldung=s.rueckmeldung,this.aktiv=s.aktiv,this.draht.modus=s.modus,this.draht.feldFokus=s.feldFokus,this.menue=s.menue,this.kontextMenue=s.kontextMenue}}einSchritt(e){const t=this.verlauf(),i=t.zurueck.length;try{e()}finally{t.zurueck.length>i+1&&t.zurueck.splice(i+1)}}speichern(){if(!this.imEntwurfLauf)try{window.localStorage.setItem(mh,JSON.stringify(this.projekt))}catch{}}aendern(e){const t=this.dokument(),i=Xt(t);if(e(i),JSON.stringify(i)===JSON.stringify(t))return!1;const r=this.verlauf();return r.zurueck.push(Xt(t)),r.vor=[],this.projekt.content=this.projekt.content.map(s=>s.id===t.id?i:s),this.speichern(),!0}ersetzeDokument(e){this.projekt.content=this.projekt.content.map(t=>t.id===e.id?e:t),this.speichern()}auswahlIds(){return[...new Set(this.auswahl.map(e=>e.element_id))]}bereichElement(){return(this.aktiv?this.find(this.aktiv):void 0)??this.dokument()}zielFuerTreffer(e){const t=this.bereichElement(),i=Gn(t,e);if(!i.length)return null;if(i.length===1)return t.content.length?null:t.id;const r=i.slice(1);return t.type==="teil"?r[0].id:(r.find(a=>a.type==="teil")??r[0]).id}waehlbareIds(){const e=this.bereichElement();return(e.type==="teil"||e.content.every(i=>i.type!=="teil")?e.content:e.content.flatMap(i=>i.type==="baugruppe"?vt(i).filter(r=>r.type==="teil"):[i])).filter(i=>!St(i)&&!this.istAusgeblendet(i.id)).map(i=>i.id)}istAusgeblendet(e){return this.ausgeblendet.has(e)?!0:Gn(this.dokument(),e).slice(0,-1).some(i=>this.ausgeblendet.has(i.id))}setzeAuswahl(e){this.auswahl=e,this.rendern()}waehle(e,t,i){const r=i?{element_id:e,teil:i}:{element_id:e},s=a=>a.element_id===e&&JSON.stringify(a.teil)===JSON.stringify(i);t==="setzen"?this.auswahl=[r]:t==="hinzufuegen"?this.auswahl.some(s)||(this.auswahl=[...this.auswahl,r]):this.auswahl.some(s)?this.auswahl=this.auswahl.filter(a=>!s(a)):this.auswahl=[...this.auswahl,r],this.rendern()}auswahlart(){const e=this.auswahlIds();if(!e.length)return"keine";if(e.length===2&&this.draht.gewaehltePunkte().length===2)return"punkte";if(e.length>1)return"mehrfach";if(this.auswahl.some(i=>i.teil?.art==="kante"))return"kante";const t=this.find(e[0]);return t?St(t)?"verworfen":t.type==="view"?"ansicht":t.type==="point"?"punkt":t.type==="teil"?"teil":t.type==="baugruppe"?"baugruppe":"schritt":"keine"}gewaehlteElemente(){return this.auswahlIds().map(e=>this.find(e)).filter(e=>!!e)}befunde(){const e=this.draht.befunde().map(t=>({elementId:t.elementId,schluessel:t.schluessel,parameter:"",wert:0,grenze:0,code:t.code,text:t.text}));return[...ks(this.dokument()),...e]}istFehlerhaft(e){return this.befunde().some(t=>t.elementId===e)}zustaende(e){const t=this.find(e);if(!t)return[];const i=[],r=this.auswahlIds().includes(e);r&&i.push("ausgewaehlt"),this.andereElemente().includes(e)&&!r&&i.push("andere"),this.hover===e&&!r&&!this.andereElemente().includes(e)&&i.push("hover"),this.aktiv===e?i.push("aktiv"):this.istGedimmt(e)&&i.push("gedimmt"),this.istAusgeblendet(e)&&i.push("ausgeblendet"),St(t)&&i.push("verworfen"),this.istFehlerhaft(e)&&i.push("fehlerhaft");const s=this.status.get(e);return(t.meta.pausiert===!0||s==="pausiert")&&i.push("pausiert"),s==="rechnet"&&i.push("rechnet"),i}andereElemente(){return this.andere.aktiv&&this.dok===this.andere.dok&&this.find(this.andere.element)?[this.andere.element]:[]}istGedimmt(e){if(this.isoliert)return!new Set(this.isoliert.flatMap(s=>this.mitNachfahren(s))).has(e);if(!this.aktiv)return!1;const t=new Set(this.mitNachfahren(this.aktiv)),i=Gn(this.dokument(),this.aktiv).map(r=>r.id);return!t.has(e)&&!i.includes(e)}mitNachfahren(e){const t=this.find(e);return t?[t.id,...Ui(t).map(i=>i.id)]:[]}darstellungVon(e,t){if(!this.find(e))return null;const r=this.zustaende(e),s=[],a=(l,c,d,f=null,u=null)=>s.push({zustand:l,kanal:c,token:d,strichart:f,breite:u}),o={modell:{hover:"akzent",ausgewaehlt:"akzent",andere:"linie-stark"},struktur:{hover:"flaeche-2",ausgewaehlt:"akzent-flaeche",andere:"text-2"},chat:{hover:"flaeche-2",ausgewaehlt:"akzent-flaeche",andere:"text-2"},pfad:{hover:"flaeche-2",ausgewaehlt:"akzent-flaeche",andere:"text-2"}};for(const l of r)l==="hover"&&a("hover","Kontur",o[t].hover,t==="modell"?"durchgezogen":null,t==="modell"?1:null),l==="ausgewaehlt"&&(a("ausgewaehlt","Kontur",o[t].ausgewaehlt,t==="modell"?"durchgezogen":null,t==="modell"?2:null),t==="struktur"&&a("ausgewaehlt","Kontur","text")),l==="andere"&&a("andere","Kontur",o[t].andere,t==="modell"?"gestrichelt":null,t==="modell"?2:null),l==="aktiv"&&a("aktiv","Umfeld",t==="modell"?"text-3":"schrift.schnitt.halbfett"),l==="gedimmt"&&a("gedimmt","Umfeld","text-3"),l==="ausgeblendet"&&a("ausgeblendet","Sichtbarkeit","text-3"),l==="fehlerhaft"&&a("fehlerhaft","Status","fehler"),l==="pausiert"&&a("pausiert","Status","text-2"),l==="rechnet"&&a("rechnet","Status","text-2");return{zustaende:r,kanaele:s}}pfadGlieder(){const e=this.aktiv??this.dokument().id,t=Gn(this.dokument(),e);return t.length?t:[this.dokument()]}zeilen(){const e=[],t=(i,r)=>{for(const s of i.content)St(s)&&!this.verworfenesZeigen||(e.push({element:s,ebene:r}),t(s,r+1))};return t(this.angezeigtesDokument(),0),e}versteckteIds(){const e=new Set;for(const t of vt(this.dokument()))(St(t)||this.istAusgeblendet(t.id))&&e.add(t.id);if(this.isoliert){const t=new Set(this.isoliert.flatMap(i=>this.mitNachfahren(i)));for(const i of vt(this.dokument()))t.has(i.id)||e.add(i.id)}return e}gedimmteIds(){const e=new Set;if(!this.aktiv)return e;for(const t of vt(this.dokument()))this.istGedimmt(t.id)&&e.add(t.id);return e}blasseIds(){const e=new Set;for(const t of vt(this.dokument()))if(this.istFehlerhaft(t.id)||t.meta.pausiert===!0)for(const i of this.mitNachfahren(t.id))e.add(i);return e}teilErgebnis(){const e=this.angezeigtesDokument(),t=this.aktiv?ut(e,this.aktiv):void 0,r=[...t?Gn(e,t.id):[]].reverse().find(s=>s.type==="teil");return Wn(r??e)}huelle(e){const t=this.find(e);return t?Dc(t,Wn(this.angezeigtesDokument()).koerper):null}wirkungen=new Map;registriere(e,t){this.wirkungen.set(e,t)}befehl(e){return this.register.find(t=>t.id===e)}ausfuehren(e,t={},i="menue",r="mensch"){const s=this.befehl(e),a=this.wirkungen.get(e);if(this.menue=null,this.kontextMenue=null,!s||!a||s.folgt)return this.ausgeloest.push({befehl:e,weg:i,wirkung:!1}),this.meldung("rueck.folgt",{befehl:s?this.t(s.titel):e}),this.rendern(),!1;const o=a(t,i,r);return this.ausgeloest.push({befehl:e,weg:i,wirkung:o!==!1}),this.rendern(),o!==!1}protokolliere(e,t,i,r){const s={befehl:e,parameter:t,quelle:r,weg:i};r==="ki"&&this.kiAnbieter&&(s.anbieter=this.kiAnbieter,s.ausgeloest_von="mensch"),this.protokoll.push(s)}meldung(e,t){this.rueckmeldung={schluessel:e,werte:t}}wertSetzen(e,t,i,r,s="mensch"){const a=this.befunde().length,o=this.aendern(l=>{const c=ut(l,e);c&&(c.params[t]=i)});return this.vorschau=null,o&&(this.protokolliere("element.wert-setzen",{element:e,name:t,wert:i},r,s),this.meldung("rueck.wert-gesetzt",{name:this.name(e)}),this.nachWertAenderung(e,a)),o}nachWertAenderung(e,t){this.befunde().length>t&&(this.zonen.panel=!0,this.meldung("rueck.befund",{name:this.name(e)})),this.rechenzeitMs>0&&(this.status.set(e,"rechnet"),setTimeout(()=>{this.status.get(e)==="rechnet"&&this.status.delete(e),this.rendern()},this.rechenzeitMs))}letzterGueltigerWert(e){for(const t of[...this.verlauf().zurueck].reverse()){const i=ut(t,e.elementId);if(i&&!ks(t).some(r=>r.elementId===e.elementId))return Ye(i.params[e.parameter])}return Yu[e.elementId]?.[e.parameter]??e.grenze}rueckgaengig(e,t="mensch"){const i=this.verlauf(),r=i.zurueck.pop();return this.protokolliere("bearbeiten.rueckgaengig",{},e,t),r?(i.vor.push(Xt(this.dokument())),this.ersetzeDokument(r),this.auswahlBereinigen(),this.meldung("rueck.rueckgaengig"),!0):!1}wiederholen(e,t="mensch"){const i=this.verlauf(),r=i.vor.pop();return this.protokolliere("bearbeiten.wiederholen",{},e,t),r?(i.zurueck.push(Xt(this.dokument())),this.ersetzeDokument(r),this.auswahlBereinigen(),this.meldung("rueck.wiederholt"),!0):!1}auswahlBereinigen(){this.auswahl=this.auswahl.filter(e=>this.find(e.element_id)),this.aktiv&&!this.find(this.aktiv)&&(this.aktiv=null)}wechsleDokument(e){!this.projekt.content.some(t=>t.id===e)||e===this.dok||(this.dok=e,this.auswahl=[],this.aktiv=null,this.isoliert=null,this.hover=null,this.vorschau=null,this.einpassenNoetig=!0,this.rendern())}neuesElement(e){let t="";return this.aendern(i=>{const r=e==="baugruppe"?"Baugruppe":"Teil",s=vt(i).filter(o=>o.type===e).length+1;t=qu(i,`${e}-${s}`);const a={id:t,type:e,params:e==="teil"?{material:"PLA",lage_x:{value:0,unit:"mm"}}:{},content:[],meta:{name:`${r} ${s}`}};this.einfuegeStelle(i).content.push(a)}),t}einfuegeStelle(e){return(this.aktiv?ut(e,this.aktiv):void 0)??e}ablegenPruefen(e,t){const i=this.dokument(),r=this.find(e),s=t===i.id?i:this.find(t);return!r||!s?{erlaubt:!1,grund:"dnd.kein-ziel"}:r.type!=="teil"&&r.type!=="baugruppe"?{erlaubt:!1,grund:"dnd.nur-teile"}:s.id===r.id||Ui(r).some(a=>a.id===s.id)?{erlaubt:!1,grund:"dnd.eigener-nachfahre"}:s.type!=="baugruppe"?{erlaubt:!1,grund:"dnd.kein-behaelter"}:Ts(i,r.id)?.id===s.id?{erlaubt:!1,grund:"dnd.schon-darin"}:{erlaubt:!0}}fokusEigenschaften=!1;offenesSchliessen=null;kontextOeffnen=null;dndAbbrechen=null;zeigerPos={x:0,y:0};feldBefund=null;einpassenNoetig=!0;kanteBei(e,t,i){const r=this.find(e),s=r?this.huelle(e):null;if(!r||!s||!this.szene||r.content.length>0||r.type==="teil"||r.type==="baugruppe")return null;let a=null;for(const o of this.szene.kantenVon(e,s)){const l=o.bis.x-o.von.x,c=o.bis.y-o.von.y,d=l*l+c*c||1,f=Math.max(0,Math.min(1,((t-o.von.x)*l+(i-o.von.y)*c)/d)),u=Math.hypot(t-(o.von.x+f*l),i-(o.von.y+f*c));u<=8&&(!a||u<a.d)&&(a={adresse:o.adresse,d:u})}return a?{art:"kante",adresse:a.adresse}:null}griffUebernehmen(){const e=this.griff;if(!e)return;const t=e.eingabe!==""?Number(e.eingabe):e.wert;e.aktiv=!1,this.vorschau=null,e.wert=t,e.eingabe="",t>0&&t!==e.start&&this.wertSetzen(e.id,e.name,{value:t,unit:"mm"},"griff"),e.sichtbarBis=performance.now()+700,setTimeout(()=>{this.griff=null,this.rendern()},700),this.rendern()}griffAbbrechen(){this.vorschau=null,this.griff=null,this.rendern()}suchTreffer(){return hh(this)}geisterKoerper(){const e=this.chat.vorschlag;if(!e)return[];const t=Xt(this.dokument());for(const r of e.befehle){if(r.id!=="element.wert-setzen")continue;const s=ut(t,String(r.parameter.element));s&&(s.params[String(r.parameter.name)]=r.parameter.wert)}const i=new Set(vt(t).filter(r=>JSON.stringify(r.params)!==JSON.stringify(this.find(r.id)?.params)).map(r=>r.id));return Wn(t).koerper.filter(r=>i.has(r.elementId))}anwendbar(e){const t=this.gewaehlteElemente(),i=r=>t.some(r);switch(e.id){case"bearbeiten.rueckgaengig":return this.kannRueckgaengig();case"bearbeiten.wiederholen":return this.kannWiederholen();case"element.umbenennen":return t.length===1;case"referenz.punkt-relativ":return this.draht.gewaehltePunkte().length===1&&t.length===1;case"element.duplizieren":case"element.wert-setzen":case"auswahl.duplizieren":return t.length>0;case"element.verwerfen":case"auswahl.verwerfen":return i(r=>!St(r));case"element.zurueckholen":return i(r=>St(r));case"element.ausblenden":case"auswahl.ausblenden":return i(r=>!this.istAusgeblendet(r.id));case"element.einblenden":return i(r=>this.istAusgeblendet(r.id));case"element.pausieren":return i(r=>r.meta.pausiert!==!0);case"element.fortsetzen":return i(r=>r.meta.pausiert===!0);case"element.aktivieren":return t.length===1&&t[0]?.id!==this.aktiv;case"element.verlassen":return this.aktiv!==null;case"element.umhaengen":return t.length===1&&(t[0]?.type==="teil"||t[0]?.type==="baugruppe");case"ansicht.alles-einblenden":return this.ausgeblendet.size>0||this.isoliert!==null;case"ansicht.anwenden":return t.length===1&&t[0]?.type==="view";case"auswahl.aufheben":return t.length>0;default:return!0}}naechsteZone(e=!1){const i=["menueleiste","taskleiste","struktur","modell","eigenschaften","chat","panel","rueckmeldung"].filter(o=>{const l=document.querySelector(`[data-zone="${o}"]`);return!!l&&l.getBoundingClientRect().width>0&&getComputedStyle(l).visibility!=="hidden"});if(!i.length)return;const r=this.fokusZone?i.indexOf(this.fokusZone):-1,a=i[(r+(e?-1:1)+i.length)%i.length];this.fokusZone=a,document.querySelector(`[data-zone="${a}"]`)?.focus(),this.tastenfokus=!0}huelleAlle(){const e=this.versteckteIds(),t=Wn(this.angezeigtesDokument()).koerper.filter(s=>!e.has(s.elementId)&&s.art!=="skizze"),i=this.draht.huelle(),r=Wb(t);return i?r?Do([r,i]):i:r}huelleAuswahl(){const e=Wn(this.angezeigtesDokument()).koerper,t=this.auswahlIds().map(i=>this.find(i)?Dc(this.find(i),e):null).filter(i=>!!i);return t.length?Do(t):null}setzeKamera(e){this.szene?.nach({azimut:e.azimut,hoehe:e.hoehe,abstand:e.abstand,ziel:new L(e.ziel.x,e.ziel.y,e.ziel.z)},0)}elternId(e){return Ts(this.dokument(),e)?.id??null}}function Do(n){const e=[1/0,1/0,1/0],t=[-1/0,-1/0,-1/0];for(const i of n)for(let r=0;r<3;r++)e[r]=Math.min(e[r],i.min[r]),t[r]=Math.max(t[r],i.max[r]);return{min:e,max:t}}function Wb(n){return n.length?Do(n.map(e=>({min:e.min,max:e.max}))):null}function Wc(n){const e=[...n].sort((s,a)=>s.x-a.x||s.y-a.y);if(e.length<=2)return e;const t=(s,a,o)=>(a.x-s.x)*(o.y-s.y)-(a.y-s.y)*(o.x-s.x),i=[];for(const s of e){for(;i.length>=2&&t(i[i.length-2],i[i.length-1],s)<=0;)i.pop();i.push(s)}const r=[];for(const s of[...e].reverse()){for(;r.length>=2&&t(r[r.length-2],r[r.length-1],s)<=0;)r.pop();r.push(s)}return[...i.slice(0,-1),...r.slice(0,-1)]}function Cs(n){const e=n.map(s=>s.x),t=n.map(s=>s.y),i=Math.min(...e),r=Math.min(...t);return{x:i,y:r,breite:Math.max(...e)-i,hoehe:Math.max(...t)-r}}function Xb(n,e,t=!0){const i=[],r=n.length;for(let s=0;s<(t?r:r-1);s++){const a=n[s],o=n[(s+1)%r],l=Math.hypot(o.x-a.x,o.y-a.y),c=Math.max(1,Math.floor(l/e));for(let d=0;d<c;d++)i.push({x:a.x+(o.x-a.x)*d/c,y:a.y+(o.y-a.y)*d/c})}return i}const Jt={"farbe.hell.grund":"#F5F7F9","farbe.hell.flaeche":"#FDFDFE","farbe.hell.flaeche-2":"#EEF0F3","farbe.hell.linie":"#DDE0E3","farbe.hell.linie-stark":"#C8CBCE","farbe.hell.text":"#1B2025","farbe.hell.text-2":"#595E64","farbe.hell.text-3":"#82878C","farbe.hell.akzent":"#3A69AD","farbe.hell.akzent-flaeche":"#DFECFF","farbe.hell.auf-akzent":"#FFFFFF","farbe.hell.viewport":"#E6E8EA","farbe.hell.erfolg":"#227849","farbe.hell.erfolg-flaeche":"#DAF3E1","farbe.hell.warnung":"#CD9130","farbe.hell.warnung-text":"#7E5403","farbe.hell.warnung-flaeche":"#FAE9CE","farbe.hell.fehler":"#C13C36","farbe.hell.fehler-flaeche":"#FFE0DB","farbe.dunkel.grund":"#0D1012","farbe.dunkel.flaeche":"#15171A","farbe.dunkel.flaeche-2":"#1E2124","farbe.dunkel.linie":"#2B2E32","farbe.dunkel.linie-stark":"#3A3D41","farbe.dunkel.text":"#E6E8EA","farbe.dunkel.text-2":"#A1A5A9","farbe.dunkel.text-3":"#777B7F","farbe.dunkel.akzent":"#79A6E9","farbe.dunkel.akzent-flaeche":"#1E2E47","farbe.dunkel.auf-akzent":"#0D1012","farbe.dunkel.viewport":"#1B1D20","farbe.dunkel.erfolg":"#60BB83","farbe.dunkel.erfolg-flaeche":"#12301E","farbe.dunkel.warnung":"#EBB25F","farbe.dunkel.warnung-text":"#EBB25F","farbe.dunkel.warnung-flaeche":"#3C2A0E","farbe.dunkel.fehler":"#ED756A","farbe.dunkel.fehler-flaeche":"#3E1F1B","achse.x":"#DB423C","achse.y":"#3BA946","achse.z":"#2B7AD6","schrift.familie.ui":"Inter, system-ui, sans-serif","schrift.familie.mono":'"JetBrains Mono", ui-monospace, monospace',"schrift.merkmale":'"tnum" 1, "cv05" 1',"schrift.schnitt.normal":"400","schrift.schnitt.mittel":"500","schrift.schnitt.halbfett":"600","schrift.groesse.klein":"12px","schrift.groesse.basis":"13px","schrift.groesse.gross":"14px","schrift.groesse.titel":"16px","schrift.groesse.ueberschrift":"20px","schrift.groesse.anzeige":"24px","schrift.zeilenhoehe":"1.45","schrift.groesse-tablet.basis":"15px","abstand.1":"4px","abstand.2":"8px","abstand.3":"12px","abstand.4":"16px","abstand.5":"24px","abstand.6":"32px","radius.klein":"4px","radius.mittel":"6px","radius.gross":"8px","radius.karte":"12px","linie.breite":"1px","bedienflaeche.desktop":"28px","bedienflaeche.tablet":"44px","bewegung.kurz":"120ms","bewegung.mittel":"200ms","bewegung.kurve":"cubic-bezier(0.2, 0, 0, 1)","symbol.satz":"Lucide"},ka=30,Ra=.35,$b=.6,qb=30;class Yb{constructor(e){this.zone=e,this.canvas=document.createElement("canvas"),this.canvas.dataset.modell="",this.canvas.className="leinwand",e.prepend(this.canvas),this.renderer=new Ov({canvas:this.canvas,antialias:!0,alpha:!1,powerPreference:"low-power"}),this.renderer.setPixelRatio(1),this.scene.add(this.gruppe),this.scene.add(this.draht),this.weltAchsen=this.globaleAchsen(),this.weltAchsen.visible=!1,this.scene.add(this.weltAchsen),this.scene.add(this.licht.umgebung,this.licht.gerichtet,this.licht.gegen),this.setThema("hell"),new ResizeObserver(()=>this.groesseAnpassen()).observe(e),this.groesseAnpassen()}canvas;renderer;scene=new Id;persp=new jt(ka,1,10,2e4);ortho=new Is(-1,1,1,-1,-2e4,2e4);gruppe=new mn;draht=new mn;licht={umgebung:new Of,gerichtet:new rc,gegen:new rc};objekte=[];zeichnung=null;thema="hell";angefordert=!1;tween=null;lausche=[];bboxCache=new Map;kamera={azimut:-35,hoehe:28,abstand:380,ziel:new L(0,0,14)};projektion="orthogonal";tempo=1;beiAenderung(e){this.lausche.push(e)}melde(){for(const e of this.lausche)e()}lichter(){return[{art:"umgebung",intensitaet:this.licht.umgebung.intensity},{art:"gerichtet",intensitaet:this.licht.gerichtet.intensity},{art:"gegen",intensitaet:this.licht.gegen.intensity}]}setThema(e){this.thema=e,this.renderer.setClearColor(new Ge(Jt[`farbe.${e}.viewport`])),this.licht.umgebung.intensity=e==="hell"?1.15:1.25,this.licht.gerichtet.intensity=e==="hell"?1.7:2.1,this.licht.gegen.intensity=e==="hell"?.5:.7,this.licht.gerichtet.position.set(-1,-2,3),this.licht.gegen.position.set(2,1,1),this.zeichnung&&this.zeichne(this.zeichnung),this.anfordern()}groesseAnpassen(){const e=this.zone.getBoundingClientRect(),t=Math.max(1,Math.round(e.width)),i=Math.max(1,Math.round(e.height));this.renderer.setSize(t,i,!1),this.canvas.style.width=`${t}px`,this.canvas.style.height=`${i}px`,this.persp.aspect=t/i,this.persp.updateProjectionMatrix(),this.anfordern(),this.melde()}flaecheBreite(){return this.canvas.clientWidth||1}flaecheHoehe(){return this.canvas.clientHeight||1}halbeHoehe(e=this.kamera.abstand){return e*Math.tan(ka*Math.PI/360)}pxProMm(){return this.flaecheHoehe()/(2*this.halbeHoehe())}kameraAnwenden(){const e=this.kamera,t=e.azimut*Math.PI/180,i=e.hoehe*Math.PI/180,r=new L(Math.sin(t)*Math.cos(i),-Math.cos(t)*Math.cos(i),Math.sin(i)),s=this.projektion==="orthogonal"?this.ortho:this.persp;if(s.up.set(0,0,1),Math.abs(e.hoehe)>89.5&&s.up.set(Math.sin(t)*-1,Math.cos(t),0),s.position.copy(e.ziel).addScaledVector(r,e.abstand),s.lookAt(e.ziel),this.projektion==="orthogonal"){const a=this.halbeHoehe(),o=a*(this.flaecheBreite()/this.flaecheHoehe());this.ortho.left=-o,this.ortho.right=o,this.ortho.top=a,this.ortho.bottom=-a,this.ortho.updateProjectionMatrix()}return s.updateMatrixWorld(!0),s}aktuelleKamera(){return this.kameraAnwenden()}drehen(e,t){this.tween=null,this.kamera.azimut+=e,this.kamera.hoehe=Math.max(-89,Math.min(89,this.kamera.hoehe+t)),this.geaendert()}schieben(e,t){this.tween=null;const i=this.kameraAnwenden(),r=new L().setFromMatrixColumn(i.matrixWorld,0),s=new L().setFromMatrixColumn(i.matrixWorld,1),a=1/this.pxProMm();this.kamera.ziel.addScaledVector(r,-e*a).addScaledVector(s,t*a),this.geaendert()}zoomen(e,t,i){this.tween=null;const r=t!==void 0&&i!==void 0?this.aufZielEbene(t,i):null;if(this.kamera.abstand=Math.max(40,Math.min(4e3,this.kamera.abstand/e)),r&&t!==void 0&&i!==void 0){this.kameraAnwenden();const s=this.aufZielEbene(t,i);s&&this.kamera.ziel.add(r.sub(s))}this.geaendert()}aufZielEbene(e,t){const i=this.kameraAnwenden(),r=this.canvas.getBoundingClientRect(),s=new de((e-r.left)/r.width*2-1,-((t-r.top)/r.height)*2+1),a=new _a;a.setFromCamera(s,i);const o=new L;i.getWorldDirection(o);const l=new pn().setFromNormalAndCoplanarPoint(o,this.kamera.ziel);return a.ray.intersectPlane(l,new L)}geaendert(){this.anfordern(),this.melde()}nach(e,t){const i={...this.kamera,ziel:this.kamera.ziel.clone()},r={azimut:e.azimut??i.azimut,hoehe:e.hoehe??i.hoehe,abstand:e.abstand??i.abstand,ziel:e.ziel?e.ziel.clone():i.ziel.clone()};if(t<=0||this.tempo===0){this.kamera=r,this.tween=null,this.geaendert();return}this.tween={start:performance.now(),ende:performance.now()+t,von:i,nach:r},this.anfordern()}passeEin(e,t=200,i=.72){if(!e)return;const r=new L((e.min[0]+e.max[0])/2,(e.min[1]+e.max[1])/2,(e.min[2]+e.max[2])/2),s={...this.kamera,ziel:r.clone()},a=this.kamera;this.kamera=s;const o=this.kameraAnwenden(),l=new L().setFromMatrixColumn(o.matrixWorld,0),c=new L().setFromMatrixColumn(o.matrixWorld,1);let d=0,f=0;for(const T of[e.min[0],e.max[0]])for(const S of[e.min[1],e.max[1]])for(const M of[e.min[2],e.max[2]]){const E=new L(T,S,M).sub(r);d=Math.max(d,Math.abs(E.dot(l))),f=Math.max(f,Math.abs(E.dot(c)))}this.kamera=a;const u=this.zone.getBoundingClientRect(),h=Math.min(u.width,u.height),m=2*d/(i*h),_=2*f/(i*h),w=Math.max(m,_,.01)*u.height/2/Math.tan(ka*Math.PI/360);this.nach({ziel:r,abstand:w},t)}koerperFarbe(){return new Ge(this.thema==="hell"?Jt["farbe.hell.flaeche"]:Jt["farbe.dunkel.text-3"])}geometrie(e){const[t,i,r]=e.min,[s,a,o]=e.max,l=new L((t+s)/2,(i+a)/2,(r+o)/2);switch(e.art){case"quader":{const c=new ai(s-t,a-i,o-r);return c.translate(l.x,l.y,l.z),[c]}case"platte":{const c=e.platte;if(!c)return[];const d=Ca(c.laenge,c.breite,c.eckradius);for(const u of c.loecher){const h=new Es;h.absarc(u.x-l.x,u.y-l.y,c.lochD/2,0,Math.PI*2,!0),d.holes.push(h)}const f=new As(d,{depth:c.dicke,bevelEnabled:!1,curveSegments:12});return f.translate(l.x,l.y,r),[f]}case"schale":{const c=e.wand??2,d=Ca(s-t,a-i,0),f=new Es;f.moveTo(-(s-t)/2+c,-(a-i)/2+c),f.lineTo(-(s-t)/2+c,(a-i)/2-c),f.lineTo((s-t)/2-c,(a-i)/2-c),f.lineTo((s-t)/2-c,-(a-i)/2+c),f.closePath(),d.holes.push(f);const u=new As(d,{depth:o-r-c,bevelEnabled:!1});u.translate(l.x,l.y,r+c);const h=new ai(s-t,a-i,c);return h.translate(l.x,l.y,r+c/2),[u,h]}case"rohr":{const c=e.rohr;if(!c)return[];const d=new Jo(c.d/2,c.d/2,o-r,24,1,!0);return d.rotateX(Math.PI/2),d.translate(c.x,c.y,l.z),[d]}default:return[]}}zeichne(e){this.zeichnung=e,this.bboxCache.clear();for(const s of this.objekte)this.gruppe.remove(s.gruppe);this.objekte=[];const t=this.koerperFarbe(),i=new Ge(Jt[this.thema==="hell"?"farbe.hell.text":"farbe.dunkel.text"]),r=new Ge(Jt[this.thema==="hell"?"farbe.hell.text-3":"farbe.dunkel.text-3"]);for(const s of e.koerper){if(e.versteckt.has(s.elementId))continue;const a=new mn,o={elementId:s.elementId,gruppe:a,flaechen:[],kanten:[],skizze:s.art==="skizze"},l=e.gedimmt.has(s.elementId),c=e.blass.has(s.elementId);if(s.art==="skizze"&&s.platte){const f=Ca(s.platte.laenge,s.platte.breite,s.platte.eckradius).getPoints(8).map(m=>new L(m.x,m.y,.05)),u=new At().setFromPoints([...f,f[0]]),h=new ir(u,new Ti({color:r,transparent:!0,opacity:l?Ra:1}));h.position.set((s.min[0]+s.max[0])/2,(s.min[1]+s.max[1])/2,0),a.add(h),this.gruppe.add(a),this.objekte.push(o);continue}for(const d of this.geometrie(s)){const f=l?Ra:c?$b:e.darstellung==="durchsicht"?.3:1,u=new Df({color:t,flatShading:!0,side:s.art==="rohr"?en:Xn,transparent:f<1,opacity:f,depthWrite:e.darstellung!=="durchsicht",colorWrite:e.darstellung!=="kanten",polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}),h=new nn(d,u);h.userData.elementId=s.elementId,h.userData.pickbar=!l,a.add(h),o.flaechen.push(h);const m=new Xd(new Yd(d,qb),new Ti({color:l?r:i,transparent:l,opacity:l?Ra:1}));a.add(m),o.kanten.push(m)}this.gruppe.add(a),this.objekte.push(o)}for(const s of e.geister){const a=new mn;for(const o of this.geometrie(s)){const l=new nn(o,new ys({color:new Ge(Jt[`farbe.${this.thema}.akzent`]),transparent:!0,opacity:.35,depthWrite:!1,side:en}));a.add(l)}this.gruppe.add(a),this.objekte.push({elementId:`${s.elementId}~geist`,gruppe:a,flaechen:[],kanten:[],skizze:!1})}this.anfordern(),this.melde()}weltAchsen;zeigeWeltachsen(e){this.weltAchsen.visible!==e&&(this.weltAchsen.visible=e,this.anfordern())}globaleAchsen(){const e=new mn,t=80,i=[["achse.x",[t,0,0]],["achse.y",[0,t,0]],["achse.z",[0,0,t]]];for(const[r,s]of i){const a=new ir(new At().setFromPoints([new L(0,0,0),new L(...s)]),new Ti({color:new Ge(Jt[r]),transparent:!0,opacity:.55,depthTest:!1}));a.renderOrder=0,e.add(a)}return e}zeichneDraht(e){for(const i of[...this.draht.children])this.draht.remove(i),i.traverse(r=>{const s=r;s.geometry?.dispose(),s.material?.dispose?.()});const t=i=>new Ge(i.gewaehlt||i.geist?Jt[`farbe.${this.thema}.akzent`]:i.fehlerhaft?Jt[`farbe.${this.thema}.fehler`]:i.token.startsWith("achse.")?Jt[i.token]:Jt[`farbe.${this.thema}.text`]);for(const i of e){if(i.art==="koordinatensystem")continue;const r=i.punkte.map(a=>new L(a[0],a[1],a[2])),s=new mn;if(s.userData.elementId=i.element,i.art==="punkt"){const a=new At().setFromPoints(r),o=new Xl(a,new wo({color:new Ge(Jt[`farbe.${this.thema}.flaeche`]),size:9,sizeAttenuation:!1})),l=new Xl(a,new wo({color:t(i),size:6,sizeAttenuation:!1}));o.renderOrder=1,l.renderOrder=2;for(const c of[o,l])c.material.depthTest=!1;s.add(o,l)}else if(i.art==="ebene"){const a=new nn(new At().setFromPoints([r[0],r[1],r[2],r[0],r[2],r[3]]),new ys({color:t(i),transparent:!0,opacity:.15,depthWrite:!1,side:en})),o=new $d(new At().setFromPoints(r),new Ti({color:t(i)}));s.add(a,o)}else s.add(new ir(new At().setFromPoints(r),new Ti({color:t(i),linewidth:1.5})));i.geist&&s.traverse(a=>{const o=a.material;o&&(o.transparent=!0,o.opacity=.55)}),this.draht.add(s)}this.anfordern(),this.melde()}aufEbene(e,t,i,r){const s=this.kameraAnwenden(),a=new _a;a.setFromCamera(this.zuNdc(e,t),s);const o=new pn().setFromNormalAndCoplanarPoint(new L(r[0],r[1],r[2]).normalize(),new L(i[0],i[1],i[2])),l=a.ray.intersectPlane(o,new L);return l?[l.x,l.y,l.z]:null}zuNdc(e,t){const i=this.canvas.getBoundingClientRect();return new de((e-i.left)/i.width*2-1,-((t-i.top)/i.height)*2+1)}trefferBei(e,t){const i=this.kameraAnwenden(),r=new _a;r.setFromCamera(this.zuNdc(e,t),i),this.gruppe.updateMatrixWorld(!0);const s=this.objekte.flatMap(o=>o.flaechen).filter(o=>o.userData.pickbar),a=r.intersectObjects(s,!1)[0];return a?{elementId:String(a.object.userData.elementId),punkt:a.point.clone(),normale:a.face?a.face.normal.clone():new L}:null}projiziere(e){const t=this.kameraAnwenden(),i=(e instanceof L?e.clone():new L(e[0],e[1],e[2])).project(t),r=this.canvas.getBoundingClientRect();return{x:r.left+(i.x+1)/2*r.width,y:r.top+(1-i.y)/2*r.height}}eckenProjiziert(e){const t=[];for(const i of[e.min[0],e.max[0]])for(const r of[e.min[1],e.max[1]])for(const s of[e.min[2],e.max[2]])t.push(this.projiziere([i,r,s]));return t}kantenVon(e,t){const i=(s,a,o)=>[s==="l"?t.min[0]:t.max[0],a==="v"?t.min[1]:t.max[1],o==="u"?t.min[2]:t.max[2]],r=[];for(const s of["o","u"]){const a=s==="o"?"oben":"unten";r.push([`${a}-vorn`,i("l","v",s),i("r","v",s)]),r.push([`${a}-hinten`,i("l","h",s),i("r","h",s)]),r.push([`${a}-links`,i("l","v",s),i("l","h",s)]),r.push([`${a}-rechts`,i("r","v",s),i("r","h",s)])}for(const s of["l","r"])for(const a of["v","h"])r.push([`${a==="v"?"vorn":"hinten"}-${s==="l"?"links":"rechts"}`,i(s,a,"u"),i(s,a,"o")]);return r.map(([s,a,o])=>{const l=this.projiziere(a),c=this.projiziere(o);return{adresse:`${e}/k/${s}`,elementId:e,name:s,von:l,bis:c,mitte:{x:(l.x+c.x)/2,y:(l.y+c.y)/2}}})}gezeichnet(){return[...new Set(this.objekte.map(e=>e.elementId).filter(e=>!e.includes("~")))]}hatKoerper(){return this.objekte.length>0}anfordern(){this.angefordert||(this.angefordert=!0,requestAnimationFrame(()=>{this.angefordert=!1,this.rahmen()}))}rahmen(){if(this.tween){const e=this.tween,t=performance.now(),i=Math.min(1,(t-e.start)/(e.ende-e.start)),r=i<.5?2*i*i:1-(-2*i+2)**2/2;this.kamera={azimut:e.von.azimut+(e.nach.azimut-e.von.azimut)*r,hoehe:e.von.hoehe+(e.nach.hoehe-e.von.hoehe)*r,abstand:e.von.abstand+(e.nach.abstand-e.von.abstand)*r,ziel:e.von.ziel.clone().lerp(e.nach.ziel,r)},i>=1?this.tween=null:this.anfordern(),this.melde()}this.jetztRendern()}jetztRendern(){const e=this.kameraAnwenden();this.renderer.render(this.scene,e)}setProjektion(e){this.projektion=e,this.geaendert()}}function Ca(n,e,t){const i=new Cu,r=-n/2,s=-e/2;return t<=0?(i.moveTo(r,s),i.lineTo(r+n,s),i.lineTo(r+n,s+e),i.lineTo(r,s+e),i.closePath(),i):(i.moveTo(r+t,s),i.lineTo(r+n-t,s),i.absarc(r+n-t,s+t,t,-Math.PI/2,0,!1),i.lineTo(r+n,s+e-t),i.absarc(r+n-t,s+e-t,t,0,Math.PI/2,!1),i.lineTo(r+t,s+e),i.absarc(r+t,s+e-t,t,Math.PI/2,Math.PI,!1),i.lineTo(r,s+t),i.absarc(r+t,s+t,t,Math.PI,Math.PI*1.5,!1),i)}function sl(n){const e=n.gewaehlteElemente();let t;if(e.length>1)t=P("span",{class:"chip","data-chip":""},n.t("chat.n-elemente",{n:e.length}));else{const i=e[0]??(n.aktiv?n.find(n.aktiv):void 0)??n.dokument(),r=e[0]?n.zustaende(i.id):[];t=P("span",{class:"chip","data-chip":"","data-id":i.id,"data-zustand":r.join(" ")||null,"data-akzent":r.includes("ausgewaehlt")?"auswahl":null},i.meta.name)}return P("div",{class:"kontext","data-chat-kontext":"","data-key":"kontext"},P("span",{class:"zu"},n.t("chat.zu"))," ",t)}function gh(n){const e=n.chat.vorschlag;return e?P("div",{class:"karte","data-muster":"Entscheidungskarte","data-quelle":"ki","data-akzent":"ki","data-key":"karte"},P("div",{class:"karte-kopf"},_t("sparkles",14),P("span",{class:"simuliert"},n.t("simuliert"))),P("div",{class:"karte-titel"},e.titel),P("div",{class:"karte-text"},e.begruendung),...e.werte.map((t,i)=>P("div",{class:"karte-wert","data-key":`w-${i}`},P("span",{class:"feld"},t.feld),P("span",{class:"vorher"},t.vorher),_t("chevron-right",12),P("span",{class:"nachher"},t.nachher))),P("div",{class:"karte-knoepfe"},P("button",{type:"button",class:"knopf","data-befehl":"chat.verwerfen"},n.t("chat.verwerfen")),P("button",{type:"button",class:"knopf haupt","data-befehl":"chat.uebernehmen","data-hauptaktion":"","data-akzent":"hauptaktion"},n.t("chat.uebernehmen")))):null}function Kb(n,e){const t=(i,r)=>r.length?P("div",{class:"karte-wert","data-key":`${i}`,"data-ki-aenderung":i},P("span",{class:"feld"},n.t(`ki.karte.${i}`,{n:r.length})),P("span",{class:"nachher"},r.map(s=>e.namen[s]??s).join(", "))):null;return P("div",{class:`karte${e.offen?"":" erledigt"}`,"data-muster":"Entscheidungskarte","data-quelle":"ki","data-akzent":e.offen?"ki":null,"data-key":`ki-karte-${e.nr}`,"data-ki-karte":String(e.nr),"data-status":e.status},P("div",{class:"karte-kopf"},_t("sparkles",14),P("span",{class:"simuliert"},n.t(`ki.status.${e.status}`))),P("div",{class:"karte-titel"},e.titel),P("div",{class:"karte-text"},e.begruendung),t("neu",e.neu),t("verworfen",e.verworfen),t("ausgeblendet",e.ausgeblendet),...e.befunde.map((i,r)=>P("div",{class:"karte-text befund","data-key":`b-${r}`,"data-muster":"Befund"},i.message)),e.offen?P("div",{class:"karte-knoepfe"},P("button",{type:"button",class:"knopf","data-befehl":"chat.verwerfen"},n.t("chat.verwerfen")),P("button",{type:"button",class:"knopf haupt","data-befehl":"chat.uebernehmen","data-hauptaktion":"","data-akzent":"hauptaktion"},n.t("chat.uebernehmen"))):null)}function Zb(n){return[P("div",{class:"zonenkopf","data-key":"kopf"},P("h2",{},n.t("chat.titel")),n.ki.bruecke?P("span",{class:"simuliert","data-ki-kopf":""},lh(n)):P("span",{class:"simuliert"},n.t("simuliert"))),sl(n),P("div",{class:"nachrichten",role:"log","data-key":"nachrichten"},...n.chat.nachrichten.length?n.chat.nachrichten.flatMap((e,t)=>{const i=e.karte?n.ki.karten.find(s=>s.nr===e.karte):void 0,r=P("div",{class:`nachricht ${e.von}`,"data-key":`n-${t}`},e.schluessel?n.t(e.schluessel,e.werte):e.text);return i?[r,Kb(n,i)]:[r]}):[P("p",{class:"hinweis","data-key":"hinweis"},n.t(n.ki.bruecke?"ki.hinweis":"chat.hinweis"))],n.ki.beschaeftigt?P("p",{class:"hinweis","data-key":"denkt","data-ki-denkt":""},n.t("ki.denkt")):null,gh(n)),P("div",{class:"eingabezeile","data-key":"eingabe"},P("input",{type:"text",class:"chat-eingabe","data-chat-eingabe":"","data-befehl":"chat.senden",placeholder:n.t("chat.platzhalter"),"aria-label":n.t("chat.platzhalter"),value:n.chat.eingabe,autocomplete:"off"}),P("button",{type:"button",class:"schalter","data-befehl":"chat.senden","data-chat-senden":"","aria-label":n.t("befehl.chat.senden"),title:n.t("befehl.chat.senden")},_t("arrow-up")))]}const vh={mm:1,cm:10,m:1e3},Jb={n:1,kn:1e3},Qb=new Set(["kg","g"]),Xc=(n,e)=>n??e;class jb{constructor(e,t){this.text=e,this.standardFaktor=t}pos=0;blank(){for(;this.text[this.pos]===" ";)this.pos+=1}naechstes(){return this.blank(),this.text[this.pos]??""}fertig(){return this.naechstes()===""}ausdruck(){let e=this.produkt();for(;;){const t=this.naechstes();if(t!=="+"&&t!=="-")return e;this.pos+=1;const i=this.produkt();if(e.dim!==null&&i.dim!==null&&e.dim!==i.dim)throw new ki("wert.fehler.dimension");e={wert:t==="+"?e.wert+i.wert:e.wert-i.wert,dim:Xc(e.dim,i.dim)}}}produkt(){let e=this.faktor();for(;;){const t=this.naechstes();if(t!=="*"&&t!=="/")return e;this.pos+=1;const i=this.faktor();if(t==="/"){if(i.wert===0)throw new ki("wert.fehler.teilung");e={wert:e.wert/i.wert,dim:e.dim}}else e={wert:e.wert*i.wert,dim:Xc(e.dim,i.dim)}}}faktor(){const e=this.naechstes();if(e==="-"){this.pos+=1;const t=this.faktor();return{wert:-t.wert,dim:t.dim}}if(e==="("){this.pos+=1;const t=this.ausdruck();if(this.naechstes()!==")")throw new ki("wert.fehler.nicht-lesbar");return this.pos+=1,t}return this.zahl()}zahl(){this.blank();const e=this.text.slice(this.pos),t=/^(\d+(?:[.,]\d+)?|[.,]\d+)\s*([a-zA-Z]*)/.exec(e);if(!t||t[1]===void 0)throw new ki("wert.fehler.nicht-lesbar");this.pos+=t[0].length;const i=Number(t[1].replace(",",".")),r=(t[2]??"").toLowerCase();if(r==="")return{wert:i*this.standardFaktor,dim:null};const s=vh[r];if(s!==void 0)return{wert:i*s,dim:"laenge"};const a=Jb[r];if(a!==void 0)return{wert:i*a,dim:"kraft"};if(Qb.has(r))return{wert:i*(r==="kg"?1e3:1),dim:"masse"};throw new ki("wert.fehler.nicht-lesbar")}}class ki extends Error{constructor(e){super(e),this.schluessel=e}}function $c(n,e="mm",t="laenge"){const i=new jb(n.replace(/×/g,"*").replace(/−/g,"-").trim(),t==="kraft"?1:vh[e]??1);try{const r=i.ausdruck();return i.fertig()?r.dim!==null&&r.dim!==t?{ok:!1,fehler:"wert.fehler.dimension"}:Number.isFinite(r.wert)?{ok:!0,groesse:{value:Math.round(r.wert*1e6)/1e6,unit:t==="kraft"?"N":"mm"}}:{ok:!1,fehler:"wert.fehler.nicht-lesbar"}:{ok:!1,fehler:"wert.fehler.nicht-lesbar"}}catch(r){if(r instanceof ki)return{ok:!1,fehler:r.schluessel};throw r}}function eS(n,e="de"){const t=String(Math.round(n.value*100)/100);return`${e==="de"?t.replace(".",","):t} ${n.unit}`}const al=(n,e,t)=>{const i=(Math.round(n*10**e)/10**e).toFixed(e);return t==="en"?i:i.replace(".",",")},tS=n=>n==="en"?"en":"de";function Io(n,e){return eS(n,tS(e))}const nS=(n,e)=>`${al(n/1e3,2,e)} cm³`,iS=(n,e)=>`${al(n,2,e)} g`;function rS(n,e){const t=i=>al(i,1,e).replace(/[.,]0$/,"");return`${t(n[0])} × ${t(n[1])} × ${t(n[2])} mm`}const sS={extrusion:["laenge","breite","dicke","hoehe","eckradius"],schale:["laenge","breite","hoehe","wand"],skizze:["laenge","breite","eckradius"],bohrung:["durchmesser"]};function qc(n,e){const i=[...Gn(n.dokument(),e.id)].reverse().find(r=>typeof r.params.material=="string");return String(e.params.material??i?.params.material??"PLA")}function _h(n,e){const t=n.sprache;if(e.type==="teil"||e.type==="baugruppe"||e.type==="projekt"){const r=Wn(e.id===n.dokument().id?n.angezeigtesDokument():e),s=[{key:"masse",felder:[{key:"abmessungen",param:null,text:rS(r.abmessungen_mm,t),editierbar:!1}]}];return(e.type==="teil"||r.volumen_mm3>0)&&(s.push({key:"material",felder:[{key:"material",param:null,text:qc(n,e),editierbar:!1}]}),s.push({key:"ergebnis",felder:[{key:"volumen",param:null,text:nS(r.volumen_mm3,t),editierbar:!1},{key:"masse-wert",param:null,text:iS(r.masse_g,t),editierbar:!1}]})),s}if(e.type==="view")return[{key:"ansicht",felder:[{key:"projektion",param:null,text:n.t(`projektion.${String(e.params.projektion)}`),editierbar:!1},{key:"darstellung",param:null,text:n.t(`darstellung.${String(e.params.darstellung)}`),editierbar:!1}]}];if(br(e.type)){const r=Object.entries(l_[e.type]??{}).map(([s,a])=>({key:s,param:s,text:p_(e.params[s],t),editierbar:!0,dim:a}));return r.length?[{key:"lage",felder:r}]:[]}const i=[];for(const r of sS[e.type]??[])e.params[r]!==void 0&&i.push({key:r,param:r,text:Io(e.params[r],t),editierbar:!0});return[{key:"masse",felder:i},{key:"material",felder:[{key:"material",param:null,text:qc(n,e),editierbar:!1}]}]}function aS(n,e){const t=e.map(a=>_h(n,a)),i=new Set,r=t[0]??[],s=[];for(const a of r){const o=[];for(const l of a.felder){const c=t.map(f=>f.flatMap(u=>u.felder).find(u=>u.key===l.key));if(c.some(f=>!f))continue;const d=c.every(f=>f?.text===l.text);d||i.add(l.key),o.push({...l,text:d?l.text:n.t("eigenschaften.gemischt")})}o.length&&s.push({key:a.key,felder:o})}return{gruppen:s,gemischt:i}}function ds(n,e,t,i){const r=n.feldBefund?.feld===e.key?n.feldBefund:null;return P("div",{class:"feld","data-feld":e.key,"data-key":e.key},P("label",{},n.t(`feld.${e.key}`)),e.editierbar?P("input",{type:"text",class:"wertfeld","data-muster":"Wertfeld","data-feld-eingabe":e.key,"data-param":e.param,"data-dim":e.dim??null,"data-elemente":t.join(","),"data-gemischt":i?"true":null,"aria-label":n.t(`feld.${e.key}`),value:e.text,autocomplete:"off"}):P("span",{class:"wert","data-wert-text":""},e.text),r?P("div",{class:"befund am-feld","data-muster":"Befund","data-schwere":"warnung"},n.t(r.schluessel)):null)}function xh(n){const e=n.gewaehlteElemente(),t=a=>P("div",{class:"zonenkopf","data-key":"kopf"},typeof a=="string"?P("h2",{},a):a);if(e.length>1){const{gruppen:a,gemischt:o}=aS(n,e),l=e.map(c=>c.id);return[t(n.t("eigenschaften.n-elemente",{n:e.length})),...a.map(c=>Yc(n,c,l,o))]}const i=e[0]??(n.aktiv?n.find(n.aktiv):void 0)??n.dokument(),s=n.umbenennen?.id===i.id?P("input",{type:"text",class:"titel-eingabe","data-umbenennen":i.id,"data-editiert":"",value:i.meta.name,"aria-label":n.t("befehl.element.umbenennen")}):P("h2",{"data-name-feld":i.id,title:n.t("eigenschaften.umbenennen-hinweis")},i.meta.name);return[t(s),St(i)?P("div",{class:"hinweis","data-key":"verworfen"},n.t("struktur.verworfen")):null,..._h(n,i).map(a=>Yc(n,a,[i.id],new Set))].filter(a=>!!a)}function Yc(n,e,t,i){return P("section",{class:"gruppe","data-gruppe":e.key,"data-key":`g-${e.key}`},P("h3",{},n.t(`gruppe.${e.key}`)),...e.felder.map(r=>ds(n,r,t,i.has(r.key))))}function No(n,e,t={}){const i=n.anwendbar(e);return P("button",{type:"button",role:"menuitem",class:"eintrag","data-befehl":e.id,"data-par":t.par?JSON.stringify(t.par):null,"data-mehr":t.mehr?"true":null,"aria-disabled":!i||e.folgt?"true":null,"data-folgt":e.folgt?"true":null,tabindex:"-1"},P("span",{class:"titel"},n.t(e.titel)),e.folgt?P("span",{class:"folgt"},n.t("menue.folgt")):null,e.kuerzel?P("kbd",{},ui(e.kuerzel,n.sprache)):null)}function Oi(n,e,t=new Set){const i=n.auswahlart(),r=n.register.filter(s=>!s.folgt&&!t.has(s.id)&&r_(n.register,s,i));return jv(r,e).map(s=>P("div",{role:"group",class:"untergruppe","data-untergruppe":s.name,"data-key":`ug-${s.name}`},P("div",{class:"gruppenkopf"},n.t(`untergruppe.${s.name.replace(/ \d+$/,"")}`)),...s.eintraege.map(a=>No(n,a))))}function Sr(n,e,t="menue",i=""){return P("div",{role:"menu",class:`popup ${i}`.trim(),"data-overlay":"menue","data-ort":n,"data-weg":t},...e)}function bh(n){const e=n.kontextMenue;if(!e)return null;const{sichtbar:t,mehr:i}=e.menue;return P("div",{role:"menu",class:"popup kontextmenue","data-overlay":"kontextmenue","data-ort":"kontextmenue","data-weg":"kontextmenue","data-art":e.art,style:`left:${Math.round(e.x)}px;top:${Math.round(e.y)}px`},...t.flatMap((r,s)=>[s>0?P("div",{role:"separator",class:"linie","data-key":`l-${r.familie}`}):null,P("div",{role:"group",class:"untergruppe","data-gruppe":r.familie,"data-key":`gr-${r.familie}`},...r.eintraege.map(a=>No(n,a)))]),i.length?P("button",{type:"button",role:"menuitem",class:"eintrag mehr-knopf","data-mehr-toggle":"","data-key":"mehr","aria-haspopup":"menu","aria-expanded":e.mehrOffen?"true":"false",tabindex:"-1"},P("span",{class:"titel"},n.t("menue.mehr"))):null,e.mehrOffen&&i.length?P("div",{role:"menu",class:`popup kontextmenue-mehr${e.x>window.innerWidth-560?" nach-links":""}`,"data-ort":"kontextmenue-mehr","data-key":"mehr-ebene"},...i.map(r=>P("div",{role:"group",class:"untergruppe","data-gruppe":r.familie,"data-key":`mg-${r.familie}-${r.eintraege[0]?.id??""}`},P("div",{class:"gruppenkopf"},n.t(`familie.${r.familie}`)),...r.eintraege.map(s=>No(n,s,{mehr:!0}))))):null)}const oS={modellieren:["Bearbeiten","Auswahl","Baugruppe","Referenz","Fenster"],simulation:["Simulation"]};function Kc(n,e,t,i){const r=n.menue===e;return P("div",{class:"menue-eintrag","data-key":e},P("button",{type:"button",class:"menue-knopf","data-menue-trigger":e,"aria-haspopup":"menu","aria-expanded":r?"true":"false",tabindex:"-1"},t),r?Sr(i,Oi(n,e.replace("dropdown:","").replace("start","Datei"),e_)):null)}function Pa(n,e,t,i){const r=n.befehl(e);return P("button",{type:"button",class:"schalter","data-befehl":e,"aria-pressed":i?"true":"false",title:r?`${n.t(r.titel)}${r.kuerzel?` (${ui(r.kuerzel,n.sprache)})`:""}`:e,"aria-label":r?n.t(r.titel):e},_t(t))}function Zc(n,e,t,i){const r=n.befehl(e);return P("button",{type:"button",class:"schalter mit-kuerzel","data-befehl":e,"aria-disabled":i?null:"true",title:r?n.t(r.titel):e,"aria-label":r?n.t(r.titel):e},_t(t),r?.kuerzel?P("kbd",{},ui(r.kuerzel,n.sprache)):null)}function lS(n){const e=n.befehl("suche.oeffnen");return[Kc(n,"start",n.t("menue.start"),"start-menue"),...oS[n.task].filter(t=>n.register.some(i=>i.familie===t&&!i.folgt)).map(t=>Kc(n,`dropdown:${t}`,n.t(`familie.${t}`),t==="Fenster"?"menueleiste":`dropdown-${t.toLowerCase()}`)),P("div",{class:"platz"}),P("div",{class:"menue-eintrag suche-eintrag","data-key":"suche"},P("button",{type:"button",class:"suchfeld","data-befehl":"suche.oeffnen","aria-expanded":n.suche.offen?"true":"false",tabindex:"-1"},_t("search"),P("span",{class:"platzhalter"},n.t("suche.platzhalter")),e?.kuerzel?P("kbd",{},ui(e.kuerzel,n.sprache)):null),n.suche.offen?fh(n):null),Zc(n,"bearbeiten.rueckgaengig","undo-2",n.kannRueckgaengig()),Zc(n,"bearbeiten.wiederholen","redo-2",n.kannWiederholen()),P("div",{class:"schalter-gruppe",role:"group","data-key":"schalter"},Pa(n,"fenster.struktur","panel-left",n.zonen.struktur),Pa(n,"fenster.panel","panel-bottom",n.zonen.panel),Pa(n,"fenster.rechts","panel-right",n.zonen.rechts))]}const cS={teil:"box",baugruppe:"boxes",extrusion:"layers",schale:"layers",skizze:"pencil",bohrung:"circle-dot",view:"focus"};function Sh(n,e){const t=n.zustaende(e);return t.includes("fehlerhaft")?{zustand:"fehlerhaft",symbol:"circle-alert",token:"fehler"}:t.includes("rechnet")?{zustand:"rechnet",symbol:"loader",token:"text-2"}:t.includes("pausiert")?{zustand:"pausiert",symbol:"circle-pause",token:"text-2"}:null}function ur(n,e,t){return P("span",{class:"status","data-muster":"Statusanzeige","data-zustand":e.zustand,"data-status-token":e.token,"data-element":t,role:"status"},_t(e.symbol,14),P("span",{class:"wort"},n.t(`status.${e.zustand}`)))}function Pi(n,e,t,i){const r=n.zustaende(e.id),s=n.auswahlIds().includes(e.id),a=n.istAusgeblendet(e.id),o=Sh(n,e.id),l=r.includes("andere");return P("div",{role:"treeitem",class:"zeile","data-key":e.id,"data-id":e.id,"data-ebene":String(t),"data-zustand":r.join(" ")||null,"data-akzent":s?"auswahl":r.includes("hover")?"ueberfahren":n.dnd?.ziel===e.id&&n.dnd.erlaubt?"auswahl":null,"aria-selected":s?"true":"false","aria-level":String(t+1),"aria-current":n.aktiv===e.id?"true":null,"data-ziel":n.dnd?.ziel===e.id?n.dnd.erlaubt?"erlaubt":"verboten":null,style:`--ebene:${t}`,tabindex:i===0?"0":"-1"},_t(cS[e.type]??"square",14),P("span",{class:"name"},e.meta.name),o?ur(n,o,e.id):null,l?P("span",{class:"person",title:n.t("anwesenheit.person")},n.t("anwesenheit.kuerzel")):null,P("button",{type:"button",class:"auge","data-befehl":a?"element.einblenden":"element.ausblenden","data-par":JSON.stringify({element:e.id}),"data-weg":"struktur","data-ort":"auge","aria-label":n.t(a?"befehl.element.einblenden":"befehl.element.ausblenden"),"aria-pressed":a?"true":"false",tabindex:"-1"},_t(a?"eye-off":"eye",14)),St(e)?P("span",{class:"verworfen-marke"},n.t("struktur.verworfen")):null)}function fs(n){const e=n.zeilen(),t=n.dokument(),i=P("div",{class:"zonenkopf","data-key":"kopf"},P("h2",{},n.t("struktur.titel")),P("div",{class:"menue-eintrag","data-key":"sichtbarkeit"},P("button",{type:"button",class:"schalter","data-menue-trigger":"sichtbarkeit","aria-haspopup":"menu","aria-expanded":n.menue==="sichtbarkeit"?"true":"false",title:n.t("familie.Sichtbarkeit"),"aria-label":n.t("familie.Sichtbarkeit")},_t("eye")),n.menue==="sichtbarkeit"?Sr("auge",Oi(n,uS)):null));if(n.task==="simulation")return[i,P("div",{class:"leer","data-muster":"Leerer Zustand","data-key":"leer"},P("p",{},n.t("struktur.leer-simulation")))];const r=P("div",{class:"wurzel","data-key":"wurzel","data-wurzel":t.id,"data-akzent":n.dnd?.ziel===t.id&&n.dnd.erlaubt?"auswahl":null,"data-ziel":n.dnd?.ziel===t.id?n.dnd.erlaubt?"erlaubt":"verboten":null},P("span",{class:"beschriftung"},n.t("struktur.wurzel")),P("span",{class:"name"},t.meta.name));return e.length?[i,r,P("div",{role:"tree",class:"baum","data-key":"baum","aria-label":n.t("struktur.titel")},...e.map((s,a)=>Pi(n,s.element,s.ebene,a)))]:[i,r,P("div",{class:"leer","data-muster":"Leerer Zustand","data-key":"leer"},P("p",{},n.t("struktur.leer")),n.unbekannterZustand?P("div",{class:"befund","data-muster":"Befund","data-schwere":"warnung"},n.t("befund.zustand-unbekannt")):null,P("button",{type:"button",class:"knopf haupt","data-befehl":"element.anlegen","data-par":JSON.stringify({typ:"teil"}),"data-hauptaktion":"","data-akzent":"hauptaktion"},n.t("befehl.element.anlegen")))]}const uS="Sichtbarkeit",yh={"element.duplizieren":"copy","auswahl.duplizieren":"copy","element.umbenennen":"pencil","element.verwerfen":"trash-2","auswahl.verwerfen":"trash-2","element.ausblenden":"eye-off","auswahl.ausblenden":"eye-off","element.einblenden":"eye","ansicht.auf-auswahl":"focus","ansicht.einpassen":"maximize","ansicht.isolieren":"cuboid","ansicht.alles-einblenden":"eye","ansicht.projektion":"box","darstellung.wechseln":"layers","element.zurueckholen":"undo-2","element.aktivieren":"maximize","element.wert-setzen":"pencil"};function yr(n,e){const t=n.draht.huelleBildschirm(e);if(t)return Wc(t);const i=n.huelle(e);return!i||!n.szene?null:Wc(n.szene.eckenProjiziert(i))}function hS(n){if(n.type==="extrusion"||n.type==="schale"){if(n.params.dicke!==void 0)return"dicke";if(n.params.hoehe!==void 0)return"hoehe"}return null}const dS=(n,e,t)=>{const i=e%2===1?.5:0;return{x:Math.round(n.x-t.x)+i,y:Math.round(n.y-t.y)+i}};function Mh(n,e){const t=new Set([...n.auswahlIds(),...n.andereElemente(),...n.hover?[n.hover]:[]]),i=[];for(const r of t){if(n.istAusgeblendet(r))continue;const a=n.darstellungVon(r,"modell")?.kanaele.find(c=>c.kanal==="Kontur"),o=yr(n,r);if(!a||!o||o.length<3)continue;const l=a.breite??1;i.push({id:r,polygon:o.map(c=>dS(c,l,e)),token:a.token,breite:l,strichart:a.strichart??"durchgezogen",zustand:a.zustand})}return i}function fS(n,e){const t=n.szene?.canvas.getBoundingClientRect();if(!t)return[];const i=Mh(n,{x:t.left,y:t.top}).find(a=>a.id===e);if(!i)return[];const r=i.breite%2===1?.5:0,s=i.polygon.map(a=>({x:a.x-r+t.left,y:a.y-r+t.top}));return Xb(s,4).map(a=>({x:Math.round(a.x),y:Math.round(a.y)}))}function mS(n,e,t,i){const r=Mh(n,e),s=pS(n,e);return P("svg",{class:"konturen",width:String(t),height:String(i),viewBox:`0 0 ${t} ${i}`,"aria-hidden":"true","shape-rendering":"crispEdges"},...r.map(a=>P("path",{"data-key":`kontur-${a.id}`,class:`kontur ${a.zustand}`,d:`M ${a.polygon.map(o=>`${o.x} ${o.y}`).join(" L ")} Z`,fill:"none","stroke-width":String(a.breite),"stroke-dasharray":a.strichart==="gestrichelt"?"6 4":null,"data-kontur-id":a.id,"data-kontur-token":a.token,"data-kontur-breite":String(a.breite),"data-kontur-strichart":a.strichart,"data-zustand":a.zustand,style:`stroke: var(--farbe-${a.token})`})),...s)}function pS(n,e){const t=[];for(const i of n.auswahl){if(i.teil?.art!=="kante")continue;const r=n.huelle(i.element_id);if(!r||!n.szene)continue;const s=n.szene.kantenVon(i.element_id,r).find(a=>a.adresse===i.teil?.adresse);s&&t.push(P("line",{"data-key":`kante-${s.adresse}`,x1:String(Math.round(s.von.x-e.x)),y1:String(Math.round(s.von.y-e.y)),x2:String(Math.round(s.bis.x-e.x)),y2:String(Math.round(s.bis.y-e.y)),"stroke-width":"3","data-kante":i.teil.adresse,style:"stroke: var(--farbe-akzent)"}))}return t}function wh(n){return P("div",{class:"reiterzeile",role:"tablist","data-chrome":"","data-key":"reiter"},...n.projekt.content.map(e=>P("button",{type:"button",role:"tab",class:"reiter","data-key":`tab-${e.id}`,"data-befehl":"dokument.wechseln","data-par":JSON.stringify({dok:e.id}),"aria-selected":e.id===n.dok?"true":"false",tabindex:"-1"},e.meta.name,n.andere.aktiv&&n.andere.dok===e.id?P("span",{class:"person-marke","data-zustand":"andere",title:n.t("anwesenheit.person")},_t("user",12)):null)))}function Ps(n){const e=n.pfadGlieder(),t=n.dokument(),i=[];return e.forEach((r,s)=>{const a=s===e.length-1,o=r.id===t.id,l=n.zustaende(r.id);s>0&&i.push(P("span",{class:"trenner","data-key":`t-${r.id}`},_t("chevron-right",12))),i.push(P("button",{type:"button",class:"glied","data-key":`g-${r.id}`,"data-id":r.id,"data-befehl":o?"element.verlassen":"element.aktivieren","data-par":JSON.stringify({element:r.id}),"data-zustand":l.join(" ")||null,"data-akzent":l.includes("ausgewaehlt")?"auswahl":null,"aria-current":a?"location":null,tabindex:"-1"},r.meta.name))}),P("nav",{class:"pfad","data-muster-kandidat":"Pfad","data-chrome":"","data-key":"pfad","aria-label":n.t("pfad.titel")},...i)}const Eh=t_,Jc=new Set(Eh);function Ah(n){const e=Eh.map(t=>n.befehl(t)).filter(t=>!!t);return P("div",{class:"ansichtsleiste",role:"toolbar","data-muster-kandidat":"Ansichtsleiste","data-chrome":"","data-ort":"ansichtsleiste","data-key":"ansichtsleiste","aria-label":n.t("ansichtsleiste.titel")},...e.map(t=>P("button",{type:"button",class:"schalter","data-befehl":t.id,"data-key":`al-${t.id}`,"aria-disabled":n.anwendbar(t)?null:"true","aria-pressed":t.id==="ansicht.isolieren"?n.isoliert?"true":"false":null,title:`${n.t(t.titel)}${t.kuerzel?` (${ui(t.kuerzel,n.sprache)})`:""}`,"aria-label":n.t(t.titel)},_t(yh[t.id]??"square"))),P("div",{class:"menue-eintrag","data-key":"mehr"},P("button",{type:"button",class:"schalter","data-menue-trigger":"ansicht","aria-haspopup":"menu","aria-expanded":n.menue==="ansicht"?"true":"false",title:n.t("ansichtsleiste.mehr"),"aria-label":n.t("ansichtsleiste.mehr")},_t("chevron-down")),n.menue==="ansicht"?Sr("ansichtsleiste",[...Oi(n,"Ansicht",Jc),...Oi(n,"Ansicht speichern",Jc)],"menue","nach-oben"):null))}function gS(n,e,t){const i=n.auswahlart();if(i==="keine"||n.dnd||n.griff)return null;const r=zo(xr(n.register,i,f=>n.anwendbar(f)));if(!r.length)return null;const a=n.auswahlIds().map(f=>yr(n,f)).filter(f=>!!f).flat();if(!a.length)return null;const o=Cs(a),l=Math.min(Math.max(o.x+o.breite/2-e.x,110),t-110),d=i==="punkt"||i==="punkte"||n.draht.aktiv()?Math.min(o.y+o.hoehe-e.y+14,2e3):Math.max(o.y-e.y-46,84);return Uo(n,r,`left:${Math.round(l)}px;top:${Math.round(d)}px`)}function Uo(n,e,t){return P("div",{class:"kontextaktionen",role:"toolbar","data-muster":"Kontextaktionen","data-chrome":"","data-weg":"kontextaktion","data-key":"kontextaktionen",style:t},...e.map(i=>P("button",{type:"button",class:"schalter","data-befehl":i.id,"data-key":`ka-${i.id}`,title:n.t(i.titel),"aria-label":n.t(i.titel)},_t(yh[i.id]??"square"))))}function vS(n,e){if(n.auswahlIds().length!==1)return null;const t=n.find(n.auswahlIds()[0]);if(!t||!n.szene||n.istAusgeblendet(t.id))return null;const i=hS(t),r=n.huelle(t.id);if(!i||!r)return null;const s=n.szene.projiziere([(r.min[0]+r.max[0])/2,(r.min[1]+r.max[1])/2,r.max[2]]);return P("div",{class:"griff",role:"slider",tabindex:"-1","data-griff":t.id,"data-griff-name":i,"data-muster-kandidat":"Griff","data-chrome":"","data-akzent":"auswahl","aria-label":n.t(`feld.${i}`),"aria-valuenow":String(Ye(t.params[i])),"data-key":"griff",style:`left:${Math.round(s.x-e.x)}px;top:${Math.round(s.y-e.y-22)}px`},_t("arrow-up",14))}function _S(n,e){const t=[];for(const[r,s]of n.zeilen().entries()){const a=Sh(n,s.element.id);if(!a||n.istAusgeblendet(s.element.id))continue;const o=yr(n,s.element.id);if(!o)continue;const l=Cs(o);t.push(P("div",{class:"modell-status","data-chrome":"","data-key":`ms-${s.element.id}`,style:`left:${Math.round(l.x-e.x)}px;top:${Math.round(l.y-e.y-22)}px`},ur(n,a,s.element.id)))}const i=n.andereElemente()[0];if(i){const r=yr(n,i);if(r){const s=Cs(r);t.push(P("div",{class:"namensschild","data-chrome":"","data-key":"namensschild","data-person":"",style:`left:${Math.round(s.x-e.x)}px;top:${Math.round(s.y-e.y-44)}px`},n.t("anwesenheit.person")),P("div",{class:"fremder-zeiger","data-chrome":"","data-key":"fremder-zeiger","data-zeiger":"",style:`left:${Math.round(s.x+s.breite*.75-e.x)}px;top:${Math.round(s.y+s.hoehe*.55-e.y)}px`},_t("user",14),P("span",{class:"name"},n.t("anwesenheit.person")),P("span",{class:"simuliert"},n.t("simuliert"))))}}return t}function xS(n,e){const t=n.griff;if(!t)return null;const i=t.eingabe!==""?t.eingabe:String(Math.round(t.wert));return P("div",{class:"zeigerzahl","data-zeigerzahl":"","data-chrome":"","data-key":"zeigerzahl",style:`left:${Math.round(t.zeiger.x-e.x+14)}px;top:${Math.round(t.zeiger.y-e.y-28)}px`},`${i} mm`)}function bS(n){const e=n.draht.modus;if(!e)return null;const t=e.art==="punkt"?"rueck.draht.punkt-klicken":e.punkte.length===0?"rueck.draht.zwei-punkte":"rueck.draht.zweiter-punkt";return P("div",{class:"befehls-hinweis",role:"status","data-muster":"Rueckmeldung","data-key":"befehls-hinweis"},P("span",{class:"befehls-hinweis-text"},n.t(t)),P("kbd",{class:"befehls-hinweis-taste"},"Esc"),P("span",{class:"befehls-hinweis-abbruch"},n.t("rueck.draht.esc-abbrechen")))}function SS(n){const t=n.szene?.canvas.getBoundingClientRect(),i={x:t?.left??0,y:t?.top??0},r=Math.round(t?.width??0),s=Math.round(t?.height??0),a=n.dokument().content.length===0;return[mS(n,i,r,s),wh(n),Ps(n),n.aktiv?P("button",{type:"button",class:"knopf haupt fertig","data-chrome":"","data-befehl":"element.verlassen","data-hauptaktion":"","data-akzent":"hauptaktion","data-key":"fertig"},n.t("aktiv.fertig")):null,a?P("div",{class:"leer mitte","data-muster":"Leerer Zustand","data-key":"leer-modell"},P("p",{},n.t("modell.leer"))):null,bS(n),gS(n,i,r),vS(n,i),..._S(n,i),xS(n,i),Ah(n)]}function Th(n){const e=n.befunde();return[P("div",{class:"zonenkopf","data-key":"kopf"},P("h2",{},n.t("panel.befunde")),P("button",{type:"button",class:"schalter","data-befehl":"fenster.panel","aria-label":n.t("befehl.fenster.panel"),title:n.t("befehl.fenster.panel")},_t("x",14))),e.length?P("div",{class:"befunde","data-key":"liste"},...e.map(t=>{if(t.code)return P("div",{class:"befund","data-muster":"Befund","data-schwere":"fehler","data-element":t.elementId,"data-code":t.code,"data-key":`k-${t.elementId}-${t.code}`},P("span",{class:"schwere"},_t("circle-alert",14),P("span",{class:"wort"},n.t("status.fehlerhaft"))),P("span",{class:"ort"},n.name(t.elementId)),P("span",{class:"text"},t.text??n.t(t.schluessel)));const i=n.letzterGueltigerWert(t);return P("div",{class:"befund","data-muster":"Befund","data-schwere":"fehler","data-element":t.elementId,"data-key":`b-${t.elementId}`},P("span",{class:"schwere"},_t("circle-alert",14),P("span",{class:"wort"},n.t("status.fehlerhaft"))),P("span",{class:"ort"},n.name(t.elementId)),P("span",{class:"text"},n.t(t.schluessel,{wert:`${t.wert} mm`,grenze:`${t.grenze} mm`})),P("button",{type:"button",class:"knopf","data-befehl":"element.wert-setzen","data-weg":"befund","data-par":JSON.stringify({element:t.elementId,name:t.parameter,wert:{value:i,unit:"mm"}})},n.t("befund.korrektur")))})):P("div",{class:"leer","data-muster":"Leerer Zustand","data-key":"leer"},P("p",{},n.t("panel.keine-befunde")))]}function kh(n){const e=n.rueckmeldung;return e?[P("span",{class:"rueckmeldung-text","data-muster":"Rueckmeldung",role:"status","data-key":"text"},n.t(e.schluessel,e.werte))]:[]}function Qc(n,e,t){const i=n.task===e;return P("button",{type:"button",class:"task","data-befehl":"task.wechseln","data-par":JSON.stringify({task:e}),"aria-pressed":i?"true":"false","aria-current":i?"true":null,title:n.t(`task.${e}`),"aria-label":n.t(`task.${e}`)},_t(t,20))}function yS(n){return[P("div",{class:"tasks",role:"group","data-key":"tasks"},Qc(n,"modellieren","box"),Qc(n,"simulation","play")),P("div",{class:"unten","data-key":"unten"},P("button",{type:"button",class:"task","aria-disabled":"true",title:n.t("task.shop"),"aria-label":n.t("task.shop")},_t("layers",20)))]}class MS{constructor(e,t){this.wurzel=e,this.app=t;const i=(s,a,o={})=>{const l=P(a,{"data-zone":s,tabindex:"0","aria-label":t.t(`zone.${s}`),...o});return this.zonen[s]=l,l};this.rahmen=P("div",{class:"fenster"});const r=P("div",{class:"rechts-spalte"});r.append(i("eigenschaften","section",{"data-weg":"eigenschaften"}),i("chat","section",{"data-weg":"chat"})),this.rahmen.append(i("menueleiste","header",{role:"menubar"}),i("taskleiste","nav"),i("struktur","aside",{"data-weg":"struktur"}),i("modell","main"),r,i("panel","section",{"data-weg":"menue"}),i("rueckmeldung","footer")),this.zonen.menueleiste.dataset.weg="menue",this.chrome=P("div",{class:"chrome"}),this.overlay=P("div",{class:"ueberlagerung"}),this.zonen.modell.append(this.chrome),this.wurzel.replaceChildren(this.rahmen,this.overlay),this.szene=new Yb(this.zonen.modell),this.szene.tempo=t.tempo,t.szene=this.szene,this.szene.beiAenderung(()=>this.chromeNeu()),t.beiRendern(()=>this.rendern())}rahmen;zonen={};chrome;overlay;zeichenSignatur="";klassen="";szene;chromeGeplant=!1;chromeNeu(){this.chromeGeplant||(this.chromeGeplant=!0,requestAnimationFrame(()=>{this.chromeGeplant=!1,this.chromeZeichnen()}))}chromeZeichnen(){const e=P("div",{class:"chrome"},...SS(this.app).filter(t=>!!t));hs(this.chrome,e)}zone(e,t){const i=P("div",{},...t.filter(r=>!!r));hs(this.zonen[e],this.mitAttributen(this.zonen[e],i))}mitAttributen(e,t){for(const i of[...e.attributes])t.setAttribute(i.name,i.value);return t}rendern(){const e=this.app,t=e.zonen,i=[t.struktur?"":"ohne-struktur",t.rechts?"":"ohne-rechts",t.panel?"mit-panel":""].filter(Boolean).join(" ");i!==this.klassen&&(this.klassen=i,this.rahmen.className=`fenster ${i}`.trim(),this.szene.groesseAnpassen()),this.szene.projektion!==e.projektionsart&&this.szene.setProjektion(e.projektionsart),document.documentElement.dataset.thema=e.thema,this.rahmen.dataset.task=e.task,this.zone("menueleiste",lS(e)),this.zone("taskleiste",yS(e)),this.zone("struktur",fs(e)),this.zone("eigenschaften",xh(e)),this.zone("chat",Zb(e)),this.chatAnsEnde(),this.zone("panel",t.panel?Th(e):[]),this.zone("rueckmeldung",kh(e)),this.zeichneSzene(),this.chromeZeichnen(),this.ueberlagerung(),this.fokusSetzen()}fokusSetzen(){const e=this.app,t=document.activeElement;if(e.suche.offen){const r=this.rahmen.querySelector("[data-suchfeld]");r&&t!==r&&!e.suche.fokussiert&&(e.suche.fokussiert=!0,r.focus())}else e.suche.fokussiert=!1;if(e.umbenennen){const r=this.rahmen.querySelector("[data-umbenennen]");r&&t!==r&&!e.umbenennenFokussiert&&(e.umbenennenFokussiert=!0,r.focus(),r.select())}else e.umbenennenFokussiert=!1;const i=e.kontextMenue;if(i?.fokus){const r=i.fokus==="mehr"?"[data-mehr-toggle]":".kontextmenue-mehr [data-befehl]";i.fokus=void 0,document.querySelector(`.kontextmenue ${r}, ${r}`)?.focus()}e.fokusEigenschaften&&(e.fokusEigenschaften=!1,this.rahmen.querySelector("[data-feld-eingabe]")?.focus())}zeichneSzene(){const e=this.app,t=e.angezeigtesDokument(),i=Wn(t),r=e.versteckteIds(),s=e.gedimmteIds(),a=e.blasseIds(),o=e.geisterKoerper(),l=JSON.stringify([t,[...r],[...s],[...a],e.darstellung,e.thema,o]);this.zeichneDraht(),l!==this.zeichenSignatur&&(this.zeichenSignatur=l,this.szene.zeichne({koerper:i.koerper,darstellung:e.darstellung,versteckt:r,gedimmt:s,blass:a,geister:o}),e.einpassenNoetig&&(e.einpassenNoetig=!1,this.einpassenSofort()))}chatStand="";chatAnsEnde(){const e=this.app.ki,t=`${this.app.chat.nachrichten.length}/${e.karten.length}/${e.beschaeftigt}`;if(t===this.chatStand)return;this.chatStand=t;const i=this.rahmen.querySelector('[data-zone="chat"] .nachrichten');i&&(i.scrollTop=i.scrollHeight)}drahtSignatur="";zeichneDraht(){const e=this.app.draht;this.szene.zeigeWeltachsen(this.app.dok==="drahtmodell"),e.anstossen();const t=e.zeichnung(),i=e.geisterZeichnung(),r=JSON.stringify([t,i,this.app.thema]);if(r!==this.drahtSignatur&&(this.drahtSignatur=r,this.szene.zeichneDraht([...t,...i]),e.einpassen&&t.length&&(e.einpassen=!1,this.einpassenSofort())),e.feldFokus){const s=this.rahmen.querySelector(`[data-feld-eingabe="${e.feldFokus}"]`);e.feldFokus=null,s?.focus()}}einpassenSofort(){this.szene.groesseAnpassen(),this.szene.passeEin(this.app.huelleAlle(),0)}neuesDokument(){this.zeichenSignatur=""}ueberlagerung(){const e=this.app,t=[],i=bh(e);if(i&&t.push(i),e.dnd){const r=e.find(e.dnd.id);t.push(P("div",{class:"zieh-vorschau","data-overlay":"ziehen","data-muster-kandidat":"Ziehen & Ablegen","data-key":"ziehen",style:`left:${Math.round(e.dnd.x+14)}px;top:${Math.round(e.dnd.y+14)}px`},r?.meta.name??""))}hs(this.overlay,P("div",{class:"ueberlagerung"},...t))}}const wS=[[/\bsteg\b|\brib\b|\bweb\b/,"steg"],[/grundplatte|base ?plate|\bbase\b/,"grundplatte"],[/bohrung|\bholes?\b/,"bohrungen"],[/deckel|\blid\b/,"deckel"],[/gehäuse|gehaeuse|\bhousing\b/,"gehaeuse"]],ES=[[/dick|thick/,"dicke"],[/hoch|höher|hoeher|höhe|hoehe|tall|high|height/,"hoehe"],[/lang|länge|laenge|long|length/,"laenge"],[/breit|wide|width/,"breite"],[/durchmesser|diameter|ø/,"durchmesser"],[/radius|rund|round/,"eckradius"]];function AS(n,e){for(const[t,i]of wS)if(t.test(e))return n.find(i);return n.gewaehlteElemente()[0]}function TS(n){return["dicke","hoehe","durchmesser"].find(e=>n.params[e]!==void 0)}function ol(n,e,t,i){const r=Io(e.params[t],n.sprache),s=Io(ct(i),n.sprache);return{titel:n.t("chat.vorschlag.wert",{element:e.meta.name,feld:n.t(`feld.${t}`),nachher:s}),begruendung:n.t("chat.vorschlag.begruendung"),werte:[{feld:n.t(`feld.${t}`),vorher:r,nachher:s}],befehle:[{id:"element.wert-setzen",parameter:{element:e.id,name:t,wert:ct(i)}}],ziel:e.id}}function za(n,e,t,i,r){return{titel:n.t(e,{element:t?.meta.name??""}),begruendung:n.t("chat.vorschlag.begruendung"),werte:[],befehle:[{id:i,parameter:r}],ziel:t?.id??""}}function jc(n,e){const t=e.toLowerCase(),i=AS(n,t),r=/(\d+(?:[.,]\d+)?)\s*(mm|cm|m)\b/.exec(t);if(r&&i){const s={mm:1,cm:10,m:1e3}[r[2]],a=Number(r[1].replace(",","."))*s,o=ES.find(([l])=>l.test(t))?.[1]??TS(i);if(o&&i.params[o]!==void 0)return ol(n,i,o,a)}if(/dupliz|kopie|kopier|copy|clone/.test(t)&&i)return za(n,"chat.vorschlag.duplizieren",i,"element.duplizieren",{element:i.id});if(/verwirf|wirf .*weg|entfern|lösch|loesch|discard|remove|delete/.test(t)&&i)return za(n,"chat.vorschlag.verwerfen",i,"element.verwerfen",{element:i.id});if(/\banlegen\b|leg .*an|neues|neue |create|new /.test(t)){const s=/baugruppe|assembly/.test(t)?"baugruppe":"teil";return za(n,"chat.vorschlag.anlegen",void 0,"element.anlegen",{typ:s})}return null}function kS(n){n.registriere("chat.senden",e=>{const t=(typeof e.text=="string"?e.text:n.chat.eingabe).trim();if(!t||n.ki.beschaeftigt)return!1;if(n.chat.nachrichten.push({von:"person",text:t}),n.chat.eingabe="",n.ki.bruecke){hx(n,t,()=>{const r=jc(n,t);return r?(n.chat.vorschlag=r,n.chat.nachrichten.push({von:"ki",text:"",schluessel:"chat.antwort.vorschlag"}),!0):!1});return}const i=jc(n,t);i?(n.chat.vorschlag=i,n.chat.nachrichten.push({von:"ki",text:"",schluessel:"chat.antwort.vorschlag"})):(n.chat.vorschlag=null,n.chat.nachrichten.push({von:"ki",text:"",schluessel:"chat.antwort.unklar"}))}),n.registriere("chat.uebernehmen",e=>{const t=Gc(n,e.karte);if(t)return dx(n,t);const i=n.chat.vorschlag;if(!i)return!1;n.chat.vorschlag=null;for(const r of i.befehle)n.ausfuehren(r.id,r.parameter,"chat","ki");n.chat.nachrichten.push({von:"ki",text:"",schluessel:"chat.antwort.erledigt"})}),n.registriere("chat.verwerfen",e=>{const t=Gc(n,e.karte);if(t)return fx(n,t);n.chat.vorschlag=null,n.chat.nachrichten.push({von:"ki",text:"",schluessel:"chat.antwort.verworfen"})}),n.registriere("ki.anbieter-waehlen",e=>{if(!n.ki.bruecke)return!1;const t=typeof e.id=="string"?e.id:n.ki.anbieter.find(i=>i.verfuegbar&&i.id!==n.ki.aktiv)?.id??"regel";sx(n,t)})}const it=(n,...e)=>P("figure",{class:"beispiel","data-key":n},P("figcaption",{},n),...e.filter(t=>!!t)),La=(n,e,t)=>JSON.stringify(n.darstellungVon(e,t)?.kanaele??[]),Rh=[{zustand:"hover",element:"steg",darstellungen:["modell","struktur"],einrichten:n=>n.hover="steg"},{zustand:"ausgewaehlt",element:"grundplatte",darstellungen:["modell","struktur","chat"],einrichten:n=>n.setzeAuswahl([{element_id:"grundplatte"}])},{zustand:"andere",element:"steg",darstellungen:["modell","struktur"],einrichten:n=>n.andere={aktiv:!0,dok:"halter",element:"steg"}},{zustand:"aktiv",element:"gehaeuse",doku:!0,darstellungen:["modell","struktur","pfad"],einrichten:n=>{n.dok="sensorgehaeuse",n.aktiv="gehaeuse"}},{zustand:"gedimmt",element:"deckel",doku:!0,darstellungen:["modell","struktur"],einrichten:n=>{n.dok="sensorgehaeuse",n.aktiv="gehaeuse"}},{zustand:"ausgeblendet",element:"skizze",darstellungen:["modell","struktur"],einrichten:n=>n.ausgeblendet.add("skizze")},{zustand:"fehlerhaft",element:"bohrungen",darstellungen:["modell","struktur"],einrichten:n=>{const e=ut(n.dokument(),"bohrungen");e&&(e.params.durchmesser=ct(55))}},{zustand:"pausiert",element:"steg",darstellungen:["modell","struktur"],einrichten:n=>{const e=ut(n.dokument(),"steg");e&&(e.meta.pausiert=!0)}},{zustand:"rechnet",element:"grundplatte",darstellungen:["modell","struktur"],einrichten:n=>n.status.set("grundplatte","rechnet")}];function RS(n,e){const t=n.darstellungVon(e,"modell")?.kanaele.find(s=>s.kanal==="Kontur"),i=t?.breite??1,r=n.darstellungVon(e,"modell")?.kanaele??[];return P("span",{class:"modell-probe","data-kanaele":JSON.stringify(r),"data-id":e,style:"display:inline-flex;gap:8px;align-items:center"},P("svg",{width:"72",height:"36",viewBox:"0 0 72 36"},P("rect",{x:"6",y:"6",width:"60",height:"24",fill:"none","stroke-width":String(i),"stroke-dasharray":t?.strichart==="gestrichelt"?"6 4":null,style:`stroke: var(--farbe-${t?.token??"linie"})`,opacity:n.zustaende(e).includes("ausgeblendet")?"0.35":null})))}function CS(n){return Rh.map(e=>{const t=n.app(e.einrichten),i=t.find(e.element);if(!i)return P("span",{});const r=e.darstellungen.map(s=>s==="modell"?P("div",{class:"teil"},RS(t,e.element)):s==="struktur"?P("div",{class:"teil baum","data-kanaele":La(t,e.element,"struktur")},Pi(t,i,0,0)):s==="chat"?P("div",{class:"teil","data-kanaele":La(t,e.element,"chat")},sl(t)):P("div",{class:"teil","data-kanaele":La(t,e.element,"pfad")},Ps(t)));return it(n.t(`katalog.zustand.${e.zustand}`),P("div",{class:"zeile-bsp"},...r))})}const PS=["schritt"];function zS(n,e){const t=xr(n.register,e,i=>n.anwendbar(i));return n.kontextMenue={x:0,y:0,art:e,menue:t,mehrOffen:!1},bh(n)}const ll=[{id:"zustaende",bezug:{art:"kandidat",name:"Elementzustände"},adrs:[65,61],befehle:["auswahl.setzen","element.ausblenden","element.verwerfen"],tokens:["akzent","akzent-flaeche","flaeche-2","linie-stark","text-2","text-3","fehler","fehler-flaeche"],beispiele:CS},{id:"auswahl",bezug:{art:"muster",name:"Auswahl im Modell"},adrs:[65,58],befehle:["auswahl.setzen","auswahl.alles","auswahl.aufheben"],tokens:["akzent","akzent-flaeche"],beispiele:n=>{const e=n.app(t=>t.setzeAuswahl([{element_id:"grundplatte"},{element_id:"steg"}]));return[it(n.t("katalog.bsp.auswahl-struktur"),P("div",{class:"baum"},...fs(e))),it(n.t("katalog.bsp.auswahl-eigenschaften"),P("div",{},...xh(e))),it(n.t("katalog.bsp.auswahl-chat"),sl(e))]}},{id:"struktur-zeile",bezug:{art:"kandidat",name:"Struktur-Zeile"},adrs:[65],befehle:["element.aktivieren","element.ausblenden","element.umbenennen"],tokens:["flaeche-2","akzent-flaeche","text","text-3","fehler"],beispiele:n=>Rh.filter(e=>["hover","ausgewaehlt","ausgeblendet","fehlerhaft","rechnet"].includes(e.zustand)).map(e=>{const t=n.app(e.einrichten),i=t.find(e.element);return it(n.t(`katalog.zustand.${e.zustand}`),i?P("div",{class:"baum"},Pi(t,i,0,0)):null)})},{id:"auge",bezug:{art:"kandidat",name:"Auge"},adrs:[65,15],befehle:["element.ausblenden","element.einblenden","ansicht.alles-einblenden"],tokens:["text-2","text-3","flaeche-2"],beispiele:n=>{const e=n.app(),t=n.app(i=>i.ausgeblendet.add("steg"));return[it(n.t("katalog.bsp.auge-an"),P("div",{class:"baum"},Pi(e,e.find("steg"),0,0))),it(n.t("katalog.bsp.auge-aus"),P("div",{class:"baum"},Pi(t,t.find("steg"),0,0)))]}},{id:"kontextmenue",bezug:{art:"kandidat",name:"Kontextmenü"},adrs:[65,45],befehle:["element.duplizieren","element.umbenennen","element.verwerfen","ansicht.auf-auswahl"],tokens:["flaeche","linie-stark","flaeche-2","text-3"],beispiele:n=>PS.map(e=>{const t=n.app(r=>r.setzeAuswahl([{element_id:"grundplatte"}])),i=zS(t,e);return it(n.t("katalog.bsp.kontextmenue"),i)})},{id:"kontextaktionen",bezug:{art:"muster",name:"Kontextaktionen"},adrs:[65,63],befehle:["element.duplizieren","element.umbenennen","element.verwerfen","element.ausblenden","ansicht.auf-auswahl"],tokens:["flaeche","linie-stark","flaeche-2"],beispiele:n=>{const e=n.app(s=>s.setzeAuswahl([{element_id:"grundplatte"}])),t=zo(xr(e.register,"schritt",s=>e.anwendbar(s))),i=n.app(s=>s.setzeAuswahl([{element_id:"grundplatte"},{element_id:"steg"}])),r=zo(xr(i.register,"mehrfach",s=>i.anwendbar(s)));return[it(n.t("katalog.bsp.ein-element"),Uo(e,t,null)),it(n.t("katalog.bsp.mehrere"),Uo(i,r,null))]}},{id:"dropdown",bezug:{art:"kandidat",name:"Dropdown"},adrs:[65,60],befehle:["bearbeiten.rueckgaengig","element.duplizieren","auswahl.alles","element.umhaengen"],tokens:["flaeche","linie-stark","flaeche-2","text-3"],beispiele:n=>{const e=n.app();return[it(n.t("familie.Bearbeiten"),Sr("dropdown-bearbeiten",Oi(e,"Bearbeiten"))),it(n.t("familie.Baugruppe"),Sr("dropdown-baugruppe",Oi(e,"Baugruppe")))]}},{id:"suche",bezug:{art:"muster",name:"Suche"},adrs:[45,52],befehle:["suche.oeffnen","katalog.oeffnen"],tokens:["flaeche","linie-stark","akzent-flaeche"],beispiele:n=>{const e=n.app(t=>t.suche={offen:!0,text:"ver",index:0,alle:!1,fokussiert:!0});return[it(n.t("katalog.bsp.suche"),fh(e))]}},{id:"wertfeld",bezug:{art:"muster",name:"Wertfeld"},adrs:[44,57],befehle:["element.wert-setzen"],tokens:["flaeche-2","linie","linie-stark"],beispiele:n=>{const e=n.app(),t={key:"laenge",param:"laenge",text:"80 mm",editierbar:!0},i={...t,text:n.t("eigenschaften.gemischt")},r=n.app(s=>s.feldBefund={feld:"laenge",schluessel:"wert.fehler.nicht-lesbar"});return[it(n.t("katalog.bsp.wert"),ds(e,t,["grundplatte"],!1)),it(n.t("katalog.bsp.gemischt"),ds(e,i,["grundplatte","steg"],!0)),it(n.t("katalog.bsp.fehler"),ds(r,{...t,text:"abc"},["grundplatte"],!1))]}},{id:"griff",bezug:{art:"kandidat",name:"Griff"},adrs:[44,65],befehle:["element.wert-setzen"],tokens:["akzent","flaeche","linie-stark"],beispiele:n=>[it(n.t("katalog.bsp.griff"),P("div",{class:"zeile-bsp"},P("div",{class:"griff","data-akzent":"auswahl"},_t("arrow-up",14)),P("div",{class:"zeigerzahl"},"12 mm")))]},{id:"ziehen-ablegen",bezug:{art:"kandidat",name:"Ziehen & Ablegen"},adrs:[65,51],befehle:["element.umhaengen"],tokens:["akzent-flaeche","fehler-flaeche","flaeche"],beispiele:n=>{const e=(r,s,a)=>{r.dok="sensorgehaeuse",r.dnd={id:s==="gehaeuse"?"baugruppe-1":"deckel",x:0,y:0,ziel:s,erlaubt:a}},t=n.app(r=>e(r,"baugruppe-1",!0)),i=n.app(r=>e(r,"gehaeuse",!1));return[it(n.t("katalog.bsp.ablegen-ok"),P("div",{class:"baum"},...fs(t))),it(n.t("katalog.bsp.ablegen-nein"),P("div",{class:"baum"},...fs(i)))]}},{id:"statusanzeige",bezug:{art:"muster",name:"Statusanzeige"},adrs:[50,61],befehle:["element.pausieren","element.fortsetzen"],tokens:["fehler","text-2"],beispiele:n=>{const e=n.app();return[it(n.t("status.rechnet"),ur(e,{zustand:"rechnet",symbol:"loader",token:"text-2"},"grundplatte")),it(n.t("status.fehlerhaft"),ur(e,{zustand:"fehlerhaft",symbol:"circle-alert",token:"fehler"},"bohrungen")),it(n.t("status.pausiert"),ur(e,{zustand:"pausiert",symbol:"circle-pause",token:"text-2"},"steg"))]}},{id:"befund",bezug:{art:"muster",name:"Befund"},adrs:[50,61],befehle:["element.wert-setzen","fenster.panel"],tokens:["fehler","fehler-flaeche","warnung-flaeche"],beispiele:n=>{const e=n.app(t=>{const i=ut(t.dokument(),"bohrungen");i&&(i.params.durchmesser=ct(55))});return[it(n.t("panel.befunde"),P("div",{},...Th(e)))]}},{id:"rueckmeldung",bezug:{art:"muster",name:"Rückmeldung"},adrs:[50,61],befehle:["bearbeiten.rueckgaengig"],tokens:["text-2","flaeche"],beispiele:n=>{const e=n.app(t=>t.meldung("rueck.verworfen",{name:"Steg"}));return[it(n.t("katalog.bsp.rueckmeldung"),P("div",{class:"leise"},...kh(e)))]}},{id:"entscheidungskarte",bezug:{art:"muster",name:"Entscheidungskarte"},adrs:[21,61],befehle:["chat.uebernehmen","chat.verwerfen"],tokens:["akzent","flaeche","linie-stark"],beispiele:n=>{const e=n.app(t=>{const i=ut(t.dokument(),"steg");i&&(t.chat.vorschlag=ol(t,i,"hoehe",40))});return[it(n.t("katalog.bsp.karte"),gh(e))]}},{id:"pfad",bezug:{art:"kandidat",name:"Pfad"},adrs:[65],befehle:["element.aktivieren","element.verlassen"],tokens:["text-2","text","flaeche-2"],beispiele:n=>{const e=n.app(t=>{t.dok="sensorgehaeuse",t.aktiv="gehaeuse"});return[it(n.t("katalog.bsp.pfad"),Ps(e)),it(n.t("katalog.bsp.pfad-wurzel"),Ps(n.app()))]}},{id:"dokument-reiter",bezug:{art:"kandidat",name:"Dokument-Reiter"},adrs:[65],befehle:["dokument.wechseln"],tokens:["flaeche","flaeche-2","text-2"],beispiele:n=>[it(n.t("katalog.bsp.reiter"),wh(n.app()))]},{id:"ansichtsleiste",bezug:{art:"kandidat",name:"Ansichtsleiste"},adrs:[65,60],befehle:["ansicht.einpassen","ansicht.auf-auswahl","ansicht.isolieren","ansicht.projektion","darstellung.wechseln"],tokens:["flaeche","linie","flaeche-2"],beispiele:n=>[it(n.t("katalog.bsp.ansichtsleiste"),Ah(n.app()))]},{id:"fokus-tastatur",bezug:{art:"kandidat",name:"Fokus und Tastatur"},adrs:[60,65],befehle:["suche.oeffnen","bearbeiten.rueckgaengig","fenster.naechste-zone"],tokens:["akzent","text-2"],beispiele:n=>{const e=n.app(),t=e.find("steg"),i=Fi.filter(r=>r.kuerzel);return[it(n.t("katalog.bsp.fokus"),P("div",{class:"baum"},t?Pi(e,t,0,0):null)),it(n.t("katalog.bsp.kuerzel"),P("ul",{class:"kuerzel-liste"},...i.map(r=>P("li",{"data-key":r.id},P("span",{},n.t(r.titel)),P("kbd",{},ui(r.kuerzel,n.sprache))))))]}}];ll.map(n=>n.id);function LS(n,e,t){n.replaceChildren(P("div",{class:"katalog","data-katalog":"uebersicht"},P("h1",{},e("katalog.titel")),P("p",{},e("katalog.einleitung")),P("div",{class:"katalog-raster"},...ll.map(i=>P("a",{class:"katalog-karte",href:`?katalog=${i.id}&thema=${t}`,"data-katalog-link":i.id},P("h2",{},e(`katalog.baustein.${i.id}`)))))))}function DS(n,e,t,i,r){const s=l=>({t,sprache:i,thema:l,app:c=>{const d=new ph(t,i,0,Fi,Fs());return d.thema=l,c?.(d),d}}),a=l=>P("div",{"data-bild":l,"data-thema":l,class:"bild"},P("h3",{},t(`katalog.${l}`)),...e.beispiele(s(l))),o=e.befehle.map(l=>Fi.find(c=>c.id===l)).filter(l=>!!l);n.replaceChildren(P("div",{class:"katalog","data-katalog":"seite","data-baustein":e.id,"data-muster-kandidat":e.bezug.art==="kandidat"?e.bezug.name:null},P("a",{href:`?katalog&thema=${r}`,class:"zurueck"},t("katalog.zurueck")),P("h1",{},t(`katalog.baustein.${e.id}`)),P("section",{},P("h2",{},t("katalog.ueberschrift.regel")),P("p",{"data-regel":"","data-schluessel":`katalog.regel.${e.id}`},t(`katalog.regel.${e.id}`))),P("section",{},P("h2",{},t("katalog.ueberschrift.bezug")),P("p",{"data-bezug":"","data-art":e.bezug.art,"data-name":e.bezug.name,"data-adrs":JSON.stringify(e.adrs)},e.bezug.art==="muster"?t("katalog.bezug.muster",{name:e.bezug.name}):t("katalog.bezug.kandidat",{name:e.bezug.name})," ",e.adrs.map(l=>`ADR-${String(l).padStart(3,"0")}`).join(", "))),P("section",{},P("h2",{},t("katalog.ueberschrift.befehle")),P("ul",{},...o.map(l=>P("li",{"data-befehl-id":l.id},t(l.titel))))),P("section",{},P("h2",{},t("katalog.ueberschrift.tokens")),P("p",{"data-tokens":""},e.tokens.join(", "))),P("section",{class:"katalog-bild"},a("hell"),a("dunkel"))))}async function IS(n,e,t,i,r){const s=ll.find(a=>a.id===e);s?DS(n,s,t,i,r):LS(n,t,r),await document.fonts.ready,document.documentElement.dataset.bereit="1"}const eu=Qu;function ms(n,e){return(eu[n]??Object.values(eu)[0])?.[e]??{}}function NS(n,e,t){const i=ms(n,e);for(const r of["verschieben","drehen","zoomen"])for(const s of i[r]??[])if(s.taste===t.taste&&!!s.umschalt===t.umschalt&&!!s.strg===t.strg)return r;return null}const US=n=>n!==0&&(Math.abs(n)%100===0||Math.abs(n)%120===0);function FS(n,e){if(e.ctrlKey)return(ms(n,"trackpad").zoomen??[]).some(s=>s.spreizen)?"zoomen":null;if(e.deltaX===0&&US(e.deltaY))return(ms(n,"maus").zoomen??[]).some(s=>s.rad)?"zoomen":null;const i=ms(n,"trackpad"),r=e.shiftKey;for(const s of["verschieben","drehen"])if((i[s]??[]).some(a=>a.wischen&&!!a.umschalt===r))return s;return null}function OS(n,e){const t=n.huelle(e);if(!t||!n.szene)return{x:0,y:-1};const i=(t.min[0]+t.max[0])/2,r=(t.min[1]+t.max[1])/2,s=n.szene.projiziere([i,r,t.max[2]]),a=n.szene.projiziere([i,r,t.max[2]+1]);return{x:a.x-s.x,y:a.y-s.y}}const Da=4;function BS(n){try{return JSON.parse(n.dataset.par??"{}")}catch{return{}}}function VS(n){return n.closest("[data-weg]")?.dataset.weg??"menue"}function HS(n,e){const t=document.getElementById("app"),i=e.zonen.modell,r=e.zonen.struktur;let s=!1;const a=b=>{const R=n.find(b)?.type==="view";n.ausfuehren(R?"ansicht.anwenden":"element.aktivieren",{element:b},"struktur")},o=()=>{let b=!1;return n.kontextMenue?.mehrOffen?(n.kontextMenue.mehrOffen=!1,n.kontextMenue.fokus="mehr",n.rendern(),!0):(n.menue&&(n.menue=null,b=!0),n.kontextMenue&&(n.kontextMenue=null,b=!0),n.suche.offen&&(n.suche.offen=!1,b=!0),b&&n.rendern(),b)};n.offenesSchliessen=o,t.addEventListener("click",b=>{const R=b.target;if(s){s=!1;return}const I=R.closest("[data-menue-trigger]");if(I){const Xe=I.dataset.menueTrigger;n.kontextMenue=null,n.suche.offen=!1,n.menue=n.menue===Xe?null:Xe,n.rendern();return}if(R.closest("[data-mehr-toggle]")&&n.kontextMenue){n.kontextMenue.mehrOffen=!n.kontextMenue.mehrOffen,n.kontextMenue.fokus=n.kontextMenue.mehrOffen?"zweite-ebene":"mehr",n.rendern();return}if(R.closest("[data-suche-folgt-alle]")){n.sucheFolgtAlle=!0,n.rendern();return}const Y=R.closest("[data-suche-element]");if(Y){n.suche.offen=!1,n.waehle(Y.dataset.sucheElement,"setzen");return}const le=R.closest("[data-befehl]");if(le&&!(le instanceof HTMLInputElement)){if(le.getAttribute("aria-disabled")==="true"&&le.dataset.folgt!=="true")return;n.ausfuehren(le.dataset.befehl,BS(le),VS(le));return}const xe=R.closest('[role="treeitem"]');if(xe){const Xe=xe.dataset.id;if(n.umhaengenModus){n.ausfuehren("element.umhaengen",{element:n.umhaengenModus,ziel:Xe},"struktur");return}n.offenesSchliessen?.(),n.waehle(Xe,b.shiftKey?"hinzufuegen":b.ctrlKey||b.metaKey?"umschalten":"setzen"),xe.focus();return}if(R.closest('[data-zone="struktur"]')&&!R.closest(".zonenkopf, .wurzel, .popup, [data-muster]")){n.setzeAuswahl([]);return}if(R.closest('[data-zone="modell"]')&&!R.closest("[data-chrome], .griff, .popup")){l(b);return}R.closest(".popup, .suche-eintrag, .menue-eintrag")||o()});function l(b){o();const R=b.shiftKey?"hinzufuegen":b.ctrlKey||b.metaKey?"umschalten":"setzen";if(n.draht.klick(b.clientX,b.clientY,R)){i.focus({preventScroll:!0}),n.rendern();return}const I=n.szene?.trefferBei(b.clientX,b.clientY);if(!I){R==="setzen"&&n.setzeAuswahl([]);return}const G=n.zielFuerTreffer(I.elementId);if(!G){R==="setzen"&&n.setzeAuswahl([]);return}const Y=n.kanteBei(G,b.clientX,b.clientY);n.waehle(G,R,Y??void 0),i.focus({preventScroll:!0})}t.addEventListener("dblclick",b=>{const R=b.target,I=R.closest('[role="treeitem"]');if(I&&!R.closest("button")){a(I.dataset.id);return}const G=R.closest("[data-name-feld]");if(G){n.ausfuehren("element.umbenennen",{element:G.dataset.nameFeld},"eigenschaften");return}if(R.closest('[data-zone="modell"]')&&!R.closest("[data-chrome], .griff, .popup")){const Y=n.szene?.trefferBei(b.clientX,b.clientY),le=Y?n.zielFuerTreffer(Y.elementId):null;le&&n.ausfuehren("element.aktivieren",{element:le},"menue")}});function c(b,R){const I=n.auswahlart(),G=xr(n.register,I,xe=>n.anwendbar(xe));n.menue=null,n.suche.offen=!1;const Y=260,le=420;n.kontextMenue={x:Math.max(4,Math.min(b,window.innerWidth-Y-4)),y:Math.max(4,Math.min(R,window.innerHeight-le-4)),art:I,menue:G,mehrOffen:!1},n.rendern()}n.kontextOeffnen=c;let d=!1,f=null;function u(b,R){if(n.draht.kontext(b,R)){c(b,R);return}const I=n.szene?.trefferBei(b,R),G=I?n.zielFuerTreffer(I.elementId):null;if(G){const Y=n.kanteBei(G,b,R),le=Gn(n.dokument(),I?.elementId??G).map(Xe=>Xe.id);(!n.auswahl.some(Xe=>le.includes(Xe.element_id))||Y)&&n.waehle(G,"setzen",Y??void 0)}else n.setzeAuswahl([]);c(b,R)}t.addEventListener("contextmenu",b=>{const R=b.target,I=R.closest('[role="treeitem"]');if(I){b.preventDefault();const G=I.dataset.id;n.auswahlIds().includes(G)||n.waehle(G,"setzen"),c(b.clientX,b.clientY);return}if(R.closest('[data-zone="struktur"]')&&!R.closest(".popup")){b.preventDefault(),n.setzeAuswahl([]),c(b.clientX,b.clientY);return}if(R.closest('[data-zone="modell"]')&&!R.closest("[data-chrome], .popup")){if(b.preventDefault(),d){f={x:b.clientX,y:b.clientY};return}if(m.bewegt)return;u(b.clientX,b.clientY);return}R.closest(".popup")&&b.preventDefault()});let h=null;const m={art:null,x:0,y:0,startX:0,startY:0,bewegt:!1,pointerId:-1},_=new Map;let g=null;const p=b=>{n.hover!==b&&(n.hover=b,n.rendern())};t.addEventListener("pointerdown",b=>{const R=b.target,I=R.closest(".griff");if(I&&b.button===0){C(b,I);return}const G=R.closest('[role="treeitem"]');if(G&&b.button===0&&!R.closest("button, input")){h={id:G.dataset.id,x:b.clientX,y:b.clientY};return}if(R.closest('[data-zone="modell"]')&&!R.closest("[data-chrome], .popup")){if(b.pointerType==="touch"){_.set(b.pointerId,{x:b.clientX,y:b.clientY}),g=w(),m.art=_.size===1?"drehen":null,m.x=b.clientX,m.y=b.clientY,m.startX=b.clientX,m.startY=b.clientY,m.bewegt=!1;return}const Y=NS(n.profil,"maus",{taste:b.button,umschalt:b.shiftKey,strg:b.ctrlKey||b.metaKey});m.art=Y==="drehen"||Y==="verschieben"?Y:null,m.x=b.clientX,m.y=b.clientY,m.startX=b.clientX,m.startY=b.clientY,m.bewegt=!1,m.pointerId=b.pointerId,d=b.button===2,m.art&&b.button!==0&&b.preventDefault()}});function w(){const b=[..._.values()];if(b.length<2)return null;const[R,I]=b;return{cx:(R.x+I.x)/2,cy:(R.y+I.y)/2,d:Math.hypot(R.x-I.x,R.y-I.y)}}window.addEventListener("pointermove",b=>{if(n.zeigerPos={x:b.clientX,y:b.clientY},n.griff?.aktiv){x(b);return}if(h&&!n.dnd&&Math.hypot(b.clientX-h.x,b.clientY-h.y)>Da&&(n.dnd={id:h.id,x:b.clientX,y:b.clientY,ziel:null,erlaubt:null}),n.dnd){S(b);return}if(b.pointerType==="touch"&&_.has(b.pointerId)){_.set(b.pointerId,{x:b.clientX,y:b.clientY}),T(b);return}if(m.art&&b.buttons){const I=b.clientX-m.x,G=b.clientY-m.y;if(m.x=b.clientX,m.y=b.clientY,Math.hypot(b.clientX-m.startX,b.clientY-m.startY)>Da&&(m.bewegt=!0),!m.bewegt)return;m.art==="drehen"?n.szene?.drehen(-I*.4,G*.4):n.szene?.schieben(I,G);return}const R=b.target;if(!b.buttons){const I=R.closest('[role="treeitem"]');if(I)return p(I.dataset.id);if(R.closest('[data-zone="modell"]')&&!R.closest("[data-chrome], .popup")){const G=n.szene?.trefferBei(b.clientX,b.clientY);return p(G?n.zielFuerTreffer(G.elementId):null)}p(null)}});function T(b){if(_.size===1){const I=b.clientX-m.x,G=b.clientY-m.y;m.x=b.clientX,m.y=b.clientY,Math.hypot(b.clientX-m.startX,b.clientY-m.startY)>Da*2&&(m.bewegt=!0),m.bewegt&&m.art==="drehen"&&n.szene?.drehen(-I*.4,G*.4);return}const R=w();R&&g&&(n.szene?.schieben(R.cx-g.cx,R.cy-g.cy),g.d>0&&R.d>0&&Math.abs(R.d-g.d)>.5&&n.szene?.zoomen(R.d/g.d,R.cx,R.cy)),g=R,m.bewegt=!0}window.addEventListener("pointerup",b=>{if(d&&b.pointerType!=="touch"){d=!1;const R=f;f=null,R&&!m.bewegt&&u(R.x,R.y)}if(b.pointerType==="touch"&&(_.delete(b.pointerId),g=w(),_.size||(m.art=null)),n.griff?.aktiv){k();return}if(n.dnd){M();return}h&&(h=null),m.art&&b.pointerId===m.pointerId&&(m.art=null,setTimeout(()=>{m.bewegt=!1},0))}),t.addEventListener("pointerleave",()=>p(null)),r.addEventListener("pointerleave",()=>p(null));function S(b){const R=n.dnd;if(!R)return;R.x=b.clientX,R.y=b.clientY;const G=document.elementFromPoint(b.clientX,b.clientY)?.closest('[role="treeitem"], [data-wurzel]'),Y=G?.dataset.id??G?.dataset.wurzel??null;if(Y&&Y!==R.id){const le=n.ablegenPruefen(R.id,Y);R.ziel=Y,R.erlaubt=le.erlaubt,R.grund=le.grund,le.grund&&n.meldung(le.grund)}else R.ziel=null,R.erlaubt=null;n.rendern()}function M(){const b=n.dnd;h=null,b&&(n.dnd=null,s=!0,setTimeout(()=>{s=!1},0),b.ziel&&b.erlaubt?n.ausfuehren("element.umhaengen",{element:b.id,ziel:b.ziel},"struktur"):n.rendern())}n.dndAbbrechen=()=>n.dnd?(n.dnd=null,h=null,n.rendern(),!0):!1;let E=null;function C(b,R){const I=R.dataset.griff,G=R.dataset.griffName,Y=n.find(I);if(!Y)return;b.preventDefault();const le=OS(n,I);E={vx:le.x,vy:le.y,x0:b.clientX,y0:b.clientY};const xe=Ye(Y.params[G]);n.griff={id:I,name:G,start:xe,wert:xe,eingabe:"",zeiger:{x:b.clientX,y:b.clientY},sichtbarBis:null,aktiv:!0},n.rendern()}function x(b){const R=n.griff;if(!R||!E)return;R.zeiger={x:b.clientX,y:b.clientY};const I=E.vx**2+E.vy**2||1,G=((b.clientX-E.x0)*E.vx+(b.clientY-E.y0)*E.vy)/I;R.wert=Math.max(1,Math.round(R.start+G)),R.eingabe="",n.vorschau={id:R.id,name:R.name,wert:{value:R.wert,unit:"mm"}},n.rendern()}function k(){n.griff&&n.griffUebernehmen()}i.addEventListener("wheel",b=>{if(b.target.closest("[data-chrome], .popup"))return;b.preventDefault();const R=FS(n.profil,b);if(R==="zoomen"){const I=Math.exp(-b.deltaY*(b.ctrlKey?.01:.002));n.szene?.zoomen(I,b.clientX,b.clientY)}else R==="verschieben"?n.szene?.schieben(-b.deltaX,-b.deltaY):R==="drehen"&&n.szene?.drehen(-b.deltaX*.4,b.deltaY*.4)},{passive:!1}),t.addEventListener("focusin",b=>{const R=b.target;R instanceof HTMLInputElement&&R.dataset.feldEingabe&&(R.setAttribute("data-editiert",""),R.select());const I=R.closest("[data-zone]");I&&(n.fokusZone=I.dataset.zone??null)}),t.addEventListener("focusout",b=>{const R=b.target;R instanceof HTMLInputElement&&R.dataset.feldEingabe?(R.removeAttribute("data-editiert"),B(R,!1)):R instanceof HTMLInputElement&&R.dataset.umbenennen&&(R.removeAttribute("data-editiert"),n.umbenennen&&R.value.trim()&&R.value.trim()!==n.name(R.dataset.umbenennen)?$(R):n.umbenennen&&(n.umbenennen=null,n.rendern()))}),t.addEventListener("input",b=>{const R=b.target;R.dataset.feldEingabe?N(R):R.dataset.suchfeld!==void 0?(n.suche.text=R.value,n.suche.index=0,n.suche.alle=!1,n.sucheFolgtAlle=!1,n.rendern()):R.dataset.chatEingabe!==void 0&&(n.chat.eingabe=R.value)});function z(b){return tl(b.value,b.dataset.dim)}function N(b){const R=(b.dataset.elemente??"").split(",").filter(Boolean),I=b.dataset.param;if(b.dataset.dim){n.feldBefund=z(b)?null:{feld:b.dataset.feldEingabe,schluessel:"wert.fehler.nicht-lesbar"},n.rendern();return}const G=$c(b.value);if(!G.ok){n.feldBefund={feld:b.dataset.feldEingabe,schluessel:G.fehler},n.vorschau=null,n.rendern();return}n.feldBefund=null,R.length===1&&(n.vorschau={id:R[0],name:I,wert:G.groesse}),n.rendern()}function B(b,R){const I=(b.dataset.elemente??"").split(",").filter(Boolean),G=b.dataset.param;if(b.dataset.dim){const le=z(b);if(!le){n.feldBefund=R?{feld:b.dataset.feldEingabe,schluessel:"wert.fehler.nicht-lesbar"}:null,n.rendern();return}n.feldBefund=null,n.ausfuehren("element.wert-setzen",I.length===1?{element:I[0],name:G,wert:le}:{elemente:I,name:G,wert:le},"eigenschaften");return}const Y=$c(b.value);if(!Y.ok){n.feldBefund={feld:b.dataset.feldEingabe,schluessel:Y.fehler},R||(n.vorschau=null,n.feldBefund=null),n.rendern();return}n.feldBefund=null,n.vorschau=null,n.ausfuehren("element.wert-setzen",I.length===1?{element:I[0],name:G,wert:Y.groesse}:{elemente:I,name:G,wert:Y.groesse},"eigenschaften")}function $(b){const R=n.umbenennen?.weg??"eigenschaften";n.ausfuehren("element.umbenennen",{element:b.dataset.umbenennen,name:b.value},R)}t.addEventListener("keydown",b=>{const R=b.target;if(R instanceof HTMLInputElement&&R.dataset.feldEingabe){b.key==="Enter"?(b.preventDefault(),B(R,!0),R.blur()):b.key==="Escape"&&(b.preventDefault(),b.stopPropagation(),n.vorschau=null,n.feldBefund=null,R.removeAttribute("data-editiert"),R.blur(),n.rendern());return}if(R instanceof HTMLInputElement&&R.dataset.umbenennen){b.key==="Enter"?(b.preventDefault(),R.removeAttribute("data-editiert"),R.value.trim()?$(R):(n.umbenennen=null,n.rendern()),e.zonen.eigenschaften.focus()):b.key==="Escape"&&(b.preventDefault(),b.stopPropagation(),R.removeAttribute("data-editiert"),n.umbenennen=null,n.rendern(),e.zonen.eigenschaften.focus());return}if(R instanceof HTMLInputElement&&R.dataset.suchfeld!==void 0){O(b);return}if(R instanceof HTMLInputElement&&R.dataset.chatEingabe!==void 0){b.key==="Enter"&&(b.preventDefault(),n.ausfuehren("chat.senden",{text:R.value},"chat"));return}H(b),Q(b)});function O(b){const R=n.suchTreffer().length;if(b.key==="ArrowDown")b.preventDefault(),n.suche.index=Math.min(R-1,n.suche.index+1),n.rendern();else if(b.key==="ArrowUp")b.preventDefault(),n.suche.index=Math.max(0,n.suche.index-1),n.rendern();else if(b.key==="Enter"){b.preventDefault();const I=n.suchTreffer()[n.suche.index];n.suche.offen=!1,I?n.ausfuehren(I.id,{},"suche"):n.rendern()}}function H(b){const R=b.target.closest(".popup");if(!R||!["ArrowDown","ArrowUp"].includes(b.key))return;const I=[...R.querySelectorAll(".eintrag:not([hidden] *)")].filter(le=>le.offsetParent!==null),G=I.indexOf(b.target),Y=I[(G+(b.key==="ArrowDown"?1:-1)+I.length)%I.length];Y&&(b.preventDefault(),Y.focus())}function Q(b){const R=b.target.closest('[role="treeitem"]');if(!R)return;const I=[...r.querySelectorAll('[role="treeitem"]')],G=I.indexOf(R);if(b.key==="ArrowDown"||b.key==="ArrowUp"){b.preventDefault();const Y=I[Math.max(0,Math.min(I.length-1,G+(b.key==="ArrowDown"?1:-1)))];for(const le of I)le.tabIndex=-1;Y&&(Y.tabIndex=0,Y.focus())}else b.key==="Enter"?(b.preventDefault(),a(R.dataset.id)):b.key===" "&&(b.preventDefault(),n.waehle(R.dataset.id,b.shiftKey?"hinzufuegen":b.ctrlKey||b.metaKey?"umschalten":"setzen"))}}function GS(n){const e=n.split("+"),t=(e[e.length-1]??"").toLowerCase(),i=new Set(e.slice(0,-1).map(r=>r.toLowerCase()));return{mod:i.has("mod"),umschalt:i.has("umschalt")||i.has("shift"),alt:i.has("alt"),taste:t}}const WS=new Set(["delete","backspace"]);function XS(n,e){const t=e.ctrlKey||e.metaKey;return n.mod!==t||n.umschalt!==e.shiftKey||n.alt!==e.altKey?!1:n.taste==="entf"?WS.has(e.key.toLowerCase()):/^f\d+$/.test(n.taste)?e.key.toLowerCase()===n.taste:n.taste.length===1&&e.code===`Key${n.taste.toUpperCase()}`||e.key.toLowerCase()===n.taste}function $S(n,e){for(const t of n)if(t.kuerzel&&XS(GS(t.kuerzel),e))return t;return null}function qS(n){window.addEventListener("keydown",e=>{const t=e.target,i=t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t?.isContentEditable===!0;if(n.tastenfokus=!0,n.griff?.aktiv){if(/^\d$/.test(e.key))n.griff.eingabe+=e.key,n.griff.wert=Number(n.griff.eingabe),n.vorschau={id:n.griff.id,name:n.griff.name,wert:{value:n.griff.wert,unit:"mm"}},n.rendern();else if(e.key==="Backspace")n.griff.eingabe=n.griff.eingabe.slice(0,-1),n.rendern();else if(e.key==="Enter")n.griffUebernehmen();else if(e.key==="Escape")n.griffAbbrechen();else return;e.preventDefault(),e.stopPropagation();return}const r=n.kontextMenue;if(r&&["ArrowDown","ArrowUp","ArrowRight","ArrowLeft"].includes(e.key)){const l=document.activeElement,c=!!l?.closest(".kontextmenue-mehr");if(e.key==="ArrowLeft"){if(!c)return;r.mehrOffen=!1,r.fokus="mehr"}else if(e.key==="ArrowRight"){if(!l?.hasAttribute("data-mehr-toggle")||r.mehrOffen)return;r.mehrOffen=!0,r.fokus="zweite-ebene"}else{const d=[...document.querySelectorAll(c?".kontextmenue-mehr [data-befehl]":'.kontextmenue > [role="group"] [data-befehl], .kontextmenue > [data-mehr-toggle]')];if(!d.length)return;const f=l?d.indexOf(l):-1,u=e.key==="ArrowDown"?1:-1,h=f<0?u>0?0:d.length-1:f+u;d[(h+d.length)%d.length]?.focus(),e.preventDefault();return}e.preventDefault(),n.rendern();return}if(e.key==="Escape"){if(n.offenesSchliessen?.()){e.preventDefault();return}if(n.draht.abbrechen()){e.preventDefault();return}if(n.dndAbbrechen?.()){e.preventDefault();return}if(n.umhaengenModus){n.umhaengenModus=null,n.rendern();return}if(n.chat.vorschlag&&t?.closest('[data-zone="chat"]')){n.chat.vorschlag=null,n.rendern();return}if(n.auswahl.length){n.setzeAuswahl([]);return}if(n.aktiv){n.ausfuehren("element.verlassen",{},"kuerzel");return}return}const s=t instanceof HTMLInputElement&&t.hasAttribute("data-feld-eingabe"),a=$S(n.register,e);if(!a)return;const o=e.ctrlKey||e.metaKey;if(!(i&&!o&&!/^f\d+$/i.test(a.kuerzel??""))&&!(i&&o&&(a.id==="auswahl.alles"||a.id==="element.duplizieren"))&&!(i&&s&&(a.id==="bearbeiten.rueckgaengig"||a.id==="bearbeiten.wiederholen"))&&!(i&&t instanceof HTMLInputElement&&t.dataset.suchfeld!==void 0&&o&&a.id!=="suche.oeffnen")){if(e.preventDefault(),a.id==="fenster.naechste-zone"){n.naechsteZone(e.shiftKey);return}if(a.id==="suche.oeffnen"){n.ausfuehren("suche.oeffnen",{},"kuerzel");return}n.anwendbar(a)&&n.ausfuehren(a.id,{},"kuerzel")}},!0)}const Ia=["koerper","kanten","durchsicht"];function jn(n,e){return typeof e.element=="string"?[e.element]:Array.isArray(e.elemente)?e.elemente.map(String):n.auswahlIds()}function YS(n,e){const t=Xt(e),i=new Set(vt(n).map(a=>a.id)),r=a=>{let o=2,l=`${a}-${o}`;for(;i.has(l);)l=`${a}-${o+=1}`;return i.add(l),l},s=a=>{a.id=r(a.id.replace(/-\d+$/,""));for(const o of a.content)s(o)};return s(t),t}const KS=n=>String.fromCharCode(65+n%26);function ZS(n){const e=n.registriere.bind(n),t=n.t;e("element.anlegen",(u,h,m)=>{const _=typeof u.typ=="string"?u.typ:"teil",g=n.neuesElement(_);n.protokolliere("element.anlegen",{typ:_},h,m),n.auswahl=[{element_id:g}],n.meldung("rueck.angelegt",{name:n.name(g)})}),e("baugruppe.anlegen",(u,h,m)=>{const _=n.neuesElement("baugruppe");n.protokolliere("baugruppe.anlegen",{},h,m),n.auswahl=[{element_id:_}],n.meldung("rueck.angelegt",{name:n.name(_)})}),e("element.umbenennen",(u,h,m)=>{const _=typeof u.element=="string"?u.element:n.auswahlIds()[0];if(!_||typeof u.element!="string"&&n.auswahlIds().length!==1)return!1;if(typeof u.name!="string"){n.umbenennen={id:_,weg:h},n.auswahl=[{element_id:_}];return}const g=u.name.trim();if(n.umbenennen=null,!g)return!1;const p=n.aendern(w=>{const T=ut(w,_);T&&(T.meta.name=g)});return p&&(n.protokolliere("element.umbenennen",{element:_,name:g},h,m),n.meldung("rueck.umbenannt",{name:g})),p});const i=u=>(h,m,_)=>{const g=jn(n,h),p=[],w=n.aendern(T=>{for(const S of g){const M=ut(T,S),E=M?Ts(T,S):void 0;if(!M||!E)continue;const C=YS(T,M);if(C.meta.name=`${M.meta.name} ${t("name.kopie")}`,C.params.lage_y!==void 0||C.params.breite!==void 0){const x=C.params.breite?Ye(C.params.breite)+6:20;C.params.lage_y={value:Ye(C.params.lage_y)+x,unit:"mm"}}else C.params.lage_x!==void 0&&(C.params.lage_x={value:Ye(C.params.lage_x)+100,unit:"mm"});E.content.splice(E.content.indexOf(M)+1,0,C),p.push(C.id)}});return w&&(n.protokolliere(u,g.length===1?{element:g[0]}:{elemente:g},m,_),n.auswahl=p.map(T=>({element_id:T})),n.meldung("rueck.dupliziert",{name:n.name(p[0]??"")})),w};e("element.duplizieren",i("element.duplizieren")),e("auswahl.duplizieren",i("auswahl.duplizieren"));const r=u=>(h,m,_)=>{const g=jn(n,h).filter(T=>n.find(T)&&!St(n.find(T)));if(!g.length)return!1;const p=g.map(T=>n.name(T)),w=n.aendern(T=>{for(const S of g){const M=ut(T,S);M&&(M.meta.verworfen=!0)}});return w&&(n.protokolliere(u,g.length===1?{element:g[0]}:{elemente:g},m,_),n.auswahl=n.auswahl.filter(T=>!g.includes(T.element_id)),n.aktiv&&g.includes(n.aktiv)&&(n.aktiv=null),n.meldung("rueck.verworfen",{name:p[0]??""})),w};e("element.verwerfen",r("element.verwerfen")),e("auswahl.verwerfen",r("auswahl.verwerfen")),e("element.zurueckholen",(u,h,m)=>{const _=jn(n,u),g=n.aendern(p=>{for(const w of _){const T=ut(p,w);T&&delete T.meta.verworfen}});return g&&(n.protokolliere("element.zurueckholen",{element:_[0]},h,m),n.meldung("rueck.zurueckgeholt",{name:n.name(_[0]??"")})),g}),e("element.wert-setzen",(u,h,m)=>{const _=typeof u.element=="string"?u.element:n.auswahlIds()[0];if(!_||typeof u.name!="string"||!u.wert){n.fokusEigenschaften=!0;return}return n.wertSetzen(_,u.name,u.wert,h,m)});const s=u=>(h,m,_)=>{const g=jn(n,h),p=n.aendern(w=>{for(const T of g){const S=ut(w,T);S&&(u?S.meta.pausiert=!0:delete S.meta.pausiert)}});return p&&n.protokolliere(u?"element.pausieren":"element.fortsetzen",{element:g[0]},m,_),p};e("element.pausieren",s(!0)),e("element.fortsetzen",s(!1)),e("element.umhaengen",(u,h,m)=>{const _=typeof u.element=="string"?u.element:n.auswahlIds()[0];if(!_)return!1;if(typeof u.ziel!="string"){n.umhaengenModus=_,n.meldung("rueck.ziel-waehlen");return}const g=u.ziel;n.umhaengenModus=null;const p=n.ablegenPruefen(_,g);if(!p.erlaubt)return n.meldung(p.grund??"dnd.kein-ziel"),!1;const w=n.aendern(T=>{const S=ut(T,_),M=S?Ts(T,_):void 0,E=g===T.id?T:ut(T,g);!S||!M||!E||(M.content.splice(M.content.indexOf(S),1),E.content.push(S))});return w&&(n.protokolliere("element.umhaengen",{element:_,ziel:g},h,m),n.meldung("rueck.umgehaengt",{name:n.name(_),ziel:n.name(g)})),w}),e("ansicht.speichern",(u,h,m)=>{const _=n.szene?.kamera;if(!_)return!1;const g=vt(n.dokument()).filter(S=>S.type==="view").length,p=`${t("name.ansicht")}: ${t("name.schnitt")} ${KS(g)}`;let w="";const T=n.aendern(S=>{w=qu(S,"ansicht");const M={id:w,type:"view",params:{azimut:{value:_.azimut,unit:"°"},hoehe:{value:_.hoehe,unit:"°"},abstand:{value:_.abstand,unit:"mm"},ziel_x:{value:_.ziel.x,unit:"mm"},ziel_y:{value:_.ziel.y,unit:"mm"},ziel_z:{value:_.ziel.z,unit:"mm"},projektion:n.projektionsart,darstellung:n.darstellung,auswahl:Xt(n.auswahl),ausgeblendet:[...n.ausgeblendet]},content:[],meta:{name:p}};S.content.push(M)});return T&&(n.protokolliere("ansicht.speichern",{name:p},h,m),n.meldung("rueck.ansicht-gespeichert",{name:p})),T}),e("bearbeiten.rueckgaengig",(u,h,m)=>{n.rueckgaengig(h,m)}),e("bearbeiten.wiederholen",(u,h,m)=>{n.wiederholen(h,m)}),e("auswahl.alles",()=>{n.setzeAuswahl(n.waehlbareIds().map(u=>({element_id:u})))}),e("auswahl.aufheben",()=>n.setzeAuswahl([])),e("auswahl.umkehren",()=>{const u=new Set(n.auswahlIds());n.setzeAuswahl(n.waehlbareIds().filter(h=>!u.has(h)).map(h=>({element_id:h})))});const a=u=>h=>{const m=Array.isArray(h.elemente)?h.elemente.map(String):[];if(!m.length)return n.meldung("rueck.auswahl-ziel"),!1;m.forEach((_,g)=>n.waehle(_,u==="setzen"&&g>0?"hinzufuegen":u))};e("auswahl.setzen",a("setzen")),e("auswahl.hinzufuegen",a("hinzufuegen")),e("auswahl.umschalten",a("umschalten")),e("element.ausblenden",u=>{for(const h of jn(n,u))n.ausgeblendet.add(h)}),e("auswahl.ausblenden",u=>{for(const h of jn(n,u))n.ausgeblendet.add(h)}),e("element.einblenden",u=>{for(const h of jn(n,u))n.ausgeblendet.delete(h)}),e("ansicht.alles-einblenden",()=>{n.ausgeblendet.clear(),n.isoliert=null}),e("ansicht.verworfenes",()=>{n.verworfenesZeigen=!n.verworfenesZeigen}),e("ansicht.isolieren",()=>{n.isoliert?n.isoliert=null:n.auswahlIds().length?n.isoliert=n.auswahlIds():n.meldung("rueck.isolieren-ziel")}),e("element.aktivieren",u=>{const h=typeof u.element=="string"?u.element:n.auswahlIds()[0],m=h?n.find(h):void 0;if(!m)return!1;n.aktiv=m.id,n.auswahl=[]}),e("element.verlassen",()=>{n.aktiv=null}),e("ansicht.einpassen",()=>n.szene?.passeEin(n.huelleAlle(),200*n.tempo)),e("ansicht.auf-auswahl",()=>{const u=n.huelleAuswahl();n.szene?.passeEin(u??n.huelleAlle(),200*n.tempo)}),e("ansicht.projektion",()=>{n.projektionsart=n.projektionsart==="orthogonal"?"perspektivisch":"orthogonal",n.szene?.setProjektion(n.projektionsart)}),e("darstellung.wechseln",()=>{const u=Ia.indexOf(n.darstellung);n.darstellung=Ia[(u+1)%Ia.length]??"koerper"});const o=(u,h)=>()=>n.szene?.nach({azimut:u,hoehe:h},200*n.tempo);e("ansicht.vorne",o(0,0)),e("ansicht.oben",o(0,89)),e("ansicht.isometrisch",o(-35,28)),e("ansicht.anwenden",u=>{const h=typeof u.element=="string"?u.element:n.auswahlIds()[0],m=h?n.find(h):void 0;if(!m||m.type!=="view"||!n.szene)return!1;const _=m.params;n.projektionsart=_.projektion==="perspektivisch"?"perspektivisch":"orthogonal",n.szene.setProjektion(n.projektionsart),n.darstellung=_.darstellung==="kanten"||_.darstellung==="durchsicht"?_.darstellung:"koerper",n.ausgeblendet=new Set(_.ausgeblendet??[]),n.auswahl=Xt(_.auswahl??[]),n.setzeKamera({azimut:Ye(_.azimut),hoehe:Ye(_.hoehe),abstand:Ye(_.abstand),ziel:{x:Ye(_.ziel_x),y:Ye(_.ziel_y),z:Ye(_.ziel_z)}})}),e("fenster.struktur",()=>{n.zonen.struktur=!n.zonen.struktur}),e("fenster.panel",()=>{n.zonen.panel=!n.zonen.panel}),e("fenster.rechts",()=>{n.zonen.rechts=!n.zonen.rechts}),e("fenster.naechste-zone",()=>n.naechsteZone()),e("suche.oeffnen",()=>{n.suche={offen:!0,text:"",index:0,alle:!1,fokussiert:!1}}),e("hilfe.befehle-zeigen",()=>{n.suche={offen:!0,text:"",index:0,alle:!0,fokussiert:!1}}),e("thema.umschalten",()=>{n.thema=n.thema==="hell"?"dunkel":"hell",document.documentElement.dataset.thema=n.thema,n.szene?.setThema(n.thema)}),e("einstellung.navigationsprofil",u=>{const h=typeof u.profil=="string"&&tr.includes(u.profil)?u.profil:void 0,m=tr.indexOf(n.profil);n.profil=h??tr[(m+1)%tr.length]??n.profil}),e("katalog.oeffnen",u=>{n.katalogOffen=typeof u.baustein=="string"?u.baustein:""}),e("task.wechseln",u=>{n.task=u.task==="simulation"?"simulation":"modellieren"}),e("dokument.wechseln",u=>{typeof u.dok=="string"&&n.wechsleDokument(u.dok)});const l=n.draht,c=(u,...h)=>h.some(m=>u[m]!==void 0),d=(u,h)=>u&&typeof u=="object"&&"value"in u?u:(typeof u=="string"?tl(u,h):null)??{value:0,unit:h==="length"?"mm":"deg"},f=u=>typeof u=="string"&&u.trim()?u.trim():void 0;e("referenz.koordinatensystem",(u,h,m)=>{if(l.modus=null,c(u,"x","y","z","rx","ry","rz","parent","name")){const _={};for(const g of["x","y","z"])_[g]=d(u[g],"length");for(const g of["rx","ry","rz"])_[g]=d(u[g],"angle");l.koordinatensystemAnlegen(h,m,{params:_,parent:f(u.parent),name:f(u.name)});return}l.koordinatensystemAnlegen(h,m)}),e("referenz.punkt",(u,h,m)=>{if(c(u,"x","y","z","frame","name")){l.modus=null;const _=f(u.frame);l.punktAnlegen(_?{frame:_}:{},{x:d(u.x,"length"),y:d(u.y,"length"),z:d(u.z,"length")},h,m,f(u.name));return}l.modus={art:"punkt"},n.meldung("rueck.draht.punkt-klicken")}),e("referenz.punkt-relativ",(u,h,m)=>{if(l.modus=null,typeof u.ref=="string"){l.punktAnlegen({ref:u.ref.includes(".")?u.ref:`${u.ref}.point`},{x:d(u.x,"length"),y:d(u.y,"length"),z:d(u.z,"length")},h,m,f(u.name),"referenz.punkt-relativ");return}const _=typeof u.element=="string"?u.element:l.gewaehltePunkte()[0];if(!_||n.find(_)?.type!=="point")return n.meldung("rueck.draht.einen-punkt"),!1;l.punktAnlegen({ref:`${_}.point`},{x:0,y:0,z:0},h,m),l.feldFokus="x"});for(const[u,h]of[["referenz.gerade","line"],["referenz.halbgerade","ray"],["referenz.strecke","segment"]])e(u,(m,_,g)=>{if(typeof m.a=="string"&&typeof m.b=="string"){l.modus=null,l.linieAnlegen(h,m.a,m.b,_,g,f(m.name));return}const p=l.gewaehltePunkte();if(p.length===2&&n.auswahlIds().length===2){l.modus=null,l.linieAnlegen(h,p[0],p[1],_,g);return}l.modus={art:"linie",typ:h,punkte:[]},n.meldung("rueck.draht.zwei-punkte")})}const JS=[{id:"K1",type:"frame",inputs:{},params:{x:{value:100,unit:"mm"},y:{value:0,unit:"mm"},z:{value:0,unit:"mm"},rx:{value:0,unit:"deg"},ry:{value:0,unit:"deg"},rz:{value:30,unit:"deg"}},outputs:{frame:"frame",origin:"point",x:"line",y:"line",z:"line",xy:"plane",yz:"plane",zx:"plane"},content:[{id:"K1-ursprung",type:"point",inputs:{frame:"K1.frame"},params:{x:{value:0,unit:"mm"},y:{value:0,unit:"mm"},z:{value:0,unit:"mm"}},outputs:{point:"point"},content:[],meta:{name:"Ursprung"}},{id:"K1-x",type:"axis",inputs:{of:"K1.x"},params:{},outputs:{line:"line"},content:[],meta:{name:"X-Achse"}},{id:"K1-y",type:"axis",inputs:{of:"K1.y"},params:{},outputs:{line:"line"},content:[],meta:{name:"Y-Achse"}},{id:"K1-z",type:"axis",inputs:{of:"K1.z"},params:{},outputs:{line:"line"},content:[],meta:{name:"Z-Achse"}},{id:"K1-xy",type:"plane",inputs:{of:"K1.xy"},params:{},outputs:{plane:"plane"},content:[],meta:{name:"XY-Ebene"}},{id:"K1-yz",type:"plane",inputs:{of:"K1.yz"},params:{},outputs:{plane:"plane"},content:[],meta:{name:"YZ-Ebene"}},{id:"K1-zx",type:"plane",inputs:{of:"K1.zx"},params:{},outputs:{plane:"plane"},content:[],meta:{name:"ZX-Ebene"}}],meta:{name:"Koordinatensystem 1"}},{id:"P1",type:"point",inputs:{},params:{x:{value:10,unit:"mm"},y:{value:20,unit:"mm"},z:{value:0,unit:"mm"}},outputs:{point:"point"},content:[],meta:{name:"Punkt 1"}},{id:"P2",type:"point",inputs:{frame:"K1.frame"},params:{x:{value:50,unit:"mm"},y:{value:0,unit:"mm"},z:{value:0,unit:"mm"}},outputs:{point:"point"},content:[],meta:{name:"Punkt 2"}},{id:"P3",type:"point",inputs:{ref:"P1.point"},params:{x:{value:0,unit:"mm"},y:{value:0,unit:"mm"},z:{value:25,unit:"mm"}},outputs:{point:"point"},content:[],meta:{name:"Punkt 3"}},{id:"S1",type:"segment",inputs:{a:"P1.point",b:"P2.point"},params:{},outputs:{segment:"segment",start:"point",end:"point"},content:[],meta:{name:"Strecke 1"}},{id:"G1",type:"line",inputs:{a:"P1.point",b:"P3.point"},params:{},outputs:{line:"line"},content:[],meta:{name:"Gerade 1"}},{id:"H1",type:"ray",inputs:{a:"K1.origin",b:"P2.point"},params:{},outputs:{ray:"ray",start:"point"},content:[],meta:{name:"Halbgerade 1"}}],QS={elements:JS},jS=["drahtmodell-leer","drahtmodell-beispiel"];function ey(n){return{id:"projekt",type:"projekt",params:{},content:[{id:"drahtmodell",type:"teil",params:{},content:n,meta:{name:"Drahtmodell"}}],meta:{name:"Projekt"}}}const ty=["leer","halter","auswahl","mehrfach","zustaende","aktiv","isoliert","kontextmenue","menue","ziehen","ablegen","ablegen-verboten","ausgeblendet","verworfen","rechnet","befund","andere","chat","suche","fokus","perspektive","kanten"],ei=(n,...e)=>{n.auswahl=e.map(t=>({element_id:t}))};function tu(n){const e=ut(n.dokument(),"bohrungen");e&&(e.params.durchmesser=ct(55))}function ny(n,e){if(jS.includes(n)){const s=n==="drahtmodell-beispiel"?JSON.parse(JSON.stringify(QS.elements)):[];return e.projekt=ey(s),e.dok="drahtmodell",e.draht.einpassen=s.length>0,{gezeigt:n}}if(!ty.includes(n))return e.projekt=Cc(),e.dok="teil-1",e.unbekannterZustand=!0,{gezeigt:"leer"};e.projekt=n==="leer"?Cc():Fs(),e.dok=e.projekt.content[0]?.id??"";const i=n;let r;switch(i){case"leer":case"halter":break;case"auswahl":ei(e,"grundplatte");break;case"mehrfach":ei(e,"grundplatte","steg");break;case"zustaende":tu(e),ei(e,"grundplatte"),e.hover="steg",e.ausgeblendet.add("skizze"),e.andere={aktiv:!0,dok:"sensorgehaeuse",element:"deckel"};break;case"aktiv":e.dok="sensorgehaeuse",e.aktiv="gehaeuse";break;case"isoliert":e.isoliert=["steg"],ei(e,"steg");break;case"kontextmenue":ei(e,"grundplatte"),r=()=>{const s=e.szene?.projiziere([0,0,8]);e.kontextOeffnen?.(s?.x??600,s?.y??400)};break;case"menue":e.menue="dropdown:Bearbeiten";break;case"ziehen":ei(e,"grundplatte"),r=()=>{const s=e.huelle("grundplatte"),a=s&&e.szene?e.szene.projiziere([0,0,s.max[2]]):{x:600,y:300};e.griff={id:"grundplatte",name:"dicke",start:8,wert:11,eingabe:"",zeiger:{x:a.x,y:a.y-60},sichtbarBis:null,aktiv:!1},e.vorschau={id:"grundplatte",name:"dicke",wert:ct(11)},e.rendernSofort()};break;case"ablegen":case"ablegen-verboten":{e.dok="sensorgehaeuse";const s=i==="ablegen-verboten";r=()=>{const a=s?"gehaeuse":"baugruppe-1",l=document.querySelector(`[role="treeitem"][data-id="${a}"]`)?.getBoundingClientRect(),c=s?"baugruppe-1":"deckel",d=e.ablegenPruefen(c,a);e.dnd={id:c,x:(l?.left??100)+60,y:(l?.top??100)+(l?.height??24)/2,ziel:a,erlaubt:d.erlaubt,grund:d.grund},d.grund&&e.meldung(d.grund),e.rendernSofort()};break}case"ausgeblendet":e.ausgeblendet.add("steg");break;case"verworfen":{const s=ut(e.dokument(),"bohrungen");s&&(s.meta.verworfen=!0),e.verworfenesZeigen=!0;break}case"rechnet":e.status.set("grundplatte","rechnet");break;case"befund":tu(e),e.zonen.panel=!0;break;case"andere":e.andere={aktiv:!0,dok:"halter",element:"steg"};break;case"chat":{ei(e,"steg");const s=ut(e.dokument(),"steg");e.chat.nachrichten=[{von:"person",text:"",schluessel:"chat.beispiel.frage"},{von:"ki",text:"",schluessel:"chat.antwort.vorschlag"}],s&&(e.chat.vorschlag=ol(e,s,"hoehe",40));break}case"suche":e.suche={offen:!0,text:"ver",index:0,alle:!1,fokussiert:!1};break;case"fokus":r=()=>{const s=document.querySelector('[role="treeitem"][data-id="steg"]');if(s){for(const a of document.querySelectorAll('[role="treeitem"]'))a.tabIndex=-1;s.tabIndex=0,s.setAttribute("data-fokus",""),s.focus()}};break;case"perspektive":e.projektionsart="perspektivisch";break;case"kanten":e.darstellung="kanten";break}return{gezeigt:i,danach:r}}const ii=new URLSearchParams(window.location.search),ps=ii.get("thema")==="dunkel"?"dunkel":"hell",gs=qx(window.location.search),iy=ii.get("tempo")==="0"?0:1;document.documentElement.dataset.thema=ps;document.documentElement.lang=gs==="en"?"en":"de";async function ry(){const n=ii.get("register");if(!n)return Fi;try{const e=await fetch(n);return Qv(await e.json())}catch{return Fi}}function sy(){try{const n=window.localStorage.getItem(mh);if(!n)return null;const e=JSON.parse(n);return e&&Array.isArray(e.content)&&e.content.length?e:null}catch{return null}}function ay(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0).toString(16).padStart(8,"0")}const oy=n=>JSON.stringify(n,(e,t)=>t&&typeof t=="object"&&!Array.isArray(t)?Object.fromEntries(Object.entries(t).sort(([i],[r])=>i.localeCompare(r))):t);async function ly(){const n=document.getElementById("app"),e=await ry(),t=Kx(gs);if(ii.has("katalog")){await IS(n,ii.get("katalog")??"",t,gs,ps);return}const i=ii.get("zustand"),r=i===null?sy():null,s=new ph(t,gs,iy,e,r??Fs());s.thema=ps,s.rechenzeitMs=Number(ii.get("rechenzeit")??0)||0,ZS(s),kS(s);let a="halter",o;if(i!==null){const h=ny(i,s);a=h.gezeigt,o=h.danach}s.dok==="drahtmodell"&&await rx(s);const l=new MS(n,s);l.szene.setThema(ps),HS(s,l),qS(s),s.rendernSofort(),l.einpassenSofort(),s.rendernSofort(),o?.(),s.rendernSofort();const c=()=>s.dokument(),d=()=>{const h=s.szene?.kamera;return{azimut_grad:h?.azimut??0,hoehe_grad:h?.hoehe??0,abstand_mm:h?.abstand??0,ziel:{x:h?.ziel.x??0,y:h?.ziel.y??0,z:h?.ziel.z??0}}},f=h=>{const m=yr(s,h);if(!m)return null;const _=Cs(m),g=new Set(s.mitNachfahren(h)),p=[],w=Math.max(10,Math.sqrt(_.breite*_.hoehe/300));for(let M=_.y;M<_.y+_.hoehe;M+=w)for(let E=_.x;E<_.x+_.breite;E+=w){const C=s.szene?.trefferBei(E,M);if(!C||!g.has(C.elementId))continue;const x=s.zielFuerTreffer(C.elementId);if(x!==h&&!g.has(x??"")||s.kanteBei(C.elementId,E,M))continue;(s.szene?.kantenVon(C.elementId,s.huelle(C.elementId)??{min:[0,0,0],max:[0,0,0]})??[]).some(z=>{const N=z.bis.x-z.von.x,B=z.bis.y-z.von.y,$=N*N+B*B||1,O=Math.max(0,Math.min(1,((E-z.von.x)*N+(M-z.von.y)*B)/$));return Math.hypot(E-(z.von.x+O*N),M-(z.von.y+O*B))<14})||p.push({x:Math.round(E),y:Math.round(M)})}const T=s.huelle(h),S=T&&s.szene?s.szene.kantenVon(h,T):[];return{huellbox:_,huelle:m,treffer:p,kanten:S.map(M=>({id:M.adresse,name:M.name,mitte:M.mitte,von:M.von,bis:M.bis}))}};Object.defineProperty(window,"__cee",{value:Object.freeze({bereit:!0,zustand:a,modell:()=>s.modell(),modellHash:()=>ay(oy(s.projekt)),auswahl:()=>s.auswahl.map(h=>({...h})),protokoll:()=>s.protokoll.map(h=>({...h})),befehle:()=>s.register.map(h=>({id:h.id,kuerzel:h.kuerzel??null,titel:h.titel,titel_text:s.t(h.titel),rang:h.rang,familie:h.familie,handlung:h.handlung??null,wirkung:h.folgt!==!0,orte:Jv(h)})),ausgeloest:()=>s.ausgeloest.map(h=>({...h})),teil:()=>{const h=s.teilErgebnis();return{abmessungen_mm:[...h.abmessungen_mm],volumen_mm3:h.volumen_mm3,masse_g:h.masse_g}},ansicht:()=>({aktiv:s.aktiv,pfad:s.pfadGlieder().map(h=>h.meta.name),ausgeblendet:[...s.ausgeblendet],isoliert:s.isoliert?[...s.isoliert]:[],darstellung:s.darstellung,projektion:s.projektionsart,profil:s.profil,kamera:d(),projektion_von:f,kontur_punkte:h=>fS(s,h)}),zustaende:h=>{const m=s.zeilen().some(S=>S.element.id===h),_=new Set(s.mitNachfahren(h)),g=Wn(s.angezeigtesDokument()).koerper.some(S=>_.has(S.elementId)),p=s.istAusgeblendet(h),w=s.auswahlIds().length===1&&s.auswahlIds()[0]===h,T=s.pfadGlieder().some(S=>S.id===h);return{modell:g||p?s.darstellungVon(h,"modell"):null,struktur:m?s.darstellungVon(h,"struktur"):null,chat:w?s.darstellungVon(h,"chat"):null,pfad:T?s.darstellungVon(h,"pfad"):null}},einstellung:()=>({navigationsprofil:s.profil}),verlauf:()=>s.verlaufLaenge(),gezeichnet:()=>s.szene?.gezeichnet()??[],flaeche_bei:(h,m)=>{const _=s.szene?.trefferBei(h,m);return _?{erzeuger_id:_.elementId,ziel_id:s.zielFuerTreffer(_.elementId)}:null},elemente:()=>vt(c()).map(h=>h.id),draht:()=>({bereit:s.draht.bereit(),graph:JSON.parse(JSON.stringify(c().content)),ergebnis:s.draht.ergebnis?JSON.parse(JSON.stringify(s.draht.ergebnis)):null,szene:s.draht.szene(),befunde:s.befunde().filter(h=>h.code).map(h=>({element:h.elementId,code:h.code,ort:"panel",text:h.text})),modus:s.draht.modus?s.draht.modus.art:null}),draht_bildschirm:(h,m)=>s.draht.bildschirm(h,m),draht_befehl:(h,m)=>s.ausfuehren(h,m,"menue"),draht_projiziere:h=>s.szene?.projiziere(h)??null,ki_werkzeuge:()=>il(s.register),ki:()=>({bruecke:s.ki.bruecke,beschaeftigt:s.ki.beschaeftigt,aktiv:s.ki.aktiv,bereit_ms:s.ki.bereitMs,kopf:s.ki.bruecke?lh(s):s.t("simuliert"),nachrichten:s.chat.nachrichten.map(h=>({rolle:h.von==="person"?"mensch":"ki",text:h.schluessel?s.t(h.schluessel,h.werte):h.text,...h.karte?{karte:h.karte}:{}})),karten:s.ki.karten.map(h=>({nr:h.nr,titel:h.titel,begruendung:h.begruendung,anbieter:h.anbieter,aufrufe:h.aufrufe,neu:h.neu,verworfen:h.verworfen,ausgeblendet:h.ausgeblendet,befunde:h.befunde,offen:h.offen,status:h.status,aktionen:h.offen?[{befehl:"chat.uebernehmen",haupt:!0},{befehl:"chat.verwerfen",haupt:!1}]:[]})),geister:s.draht.geister.map(h=>({element:h.element,art:h.art,lage_mm:Array.isArray(h.lage_mm)?h.lage_mm:{start:h.lage_mm.start,end:h.lage_mm.end,...h.lage_mm}})),verlauf:s.protokoll.map(h=>({befehl:h.befehl,urheber:h.quelle,...h.anbieter?{anbieter:h.anbieter,ausgeloest_von:h.ausgeloest_von}:{}}))}),draht_einpassen:h=>{const m=s.huelleAlle(),_=[m?.min,m?.max,h].filter(w=>!!w);if(!_.length)return;const g=[0,1,2].map(w=>Math.min(..._.map(T=>T[w]))),p=[0,1,2].map(w=>Math.max(..._.map(T=>T[w])));s.szene?.passeEin({min:g,max:p},0),s.rendernSofort()}})}),Object.defineProperty(window,"__ceeEingabe",{value:Object.freeze({ansicht:h=>{s.szene?.drehen(h.ry??0,h.rx??0),(h.tx||h.ty)&&s.szene?.schieben(h.tx??0,h.ty??0),h.tz&&s.szene?.zoomen(Math.exp((h.tz??0)*.01))}})}),await document.fonts.ready,await new Promise(h=>requestAnimationFrame(()=>requestAnimationFrame(()=>h()))),s.rendernSofort(),document.documentElement.dataset.bereit="1"}ly();
