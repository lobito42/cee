(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ro="186",Su=0,Uo=1,bu=2,Fr=1,Mu=2,Hi=3,On=0,zt=1,jt=2,wn=0,qi=1,zo=2,Fo=3,Oo=4,yu=5,Si=100,wu=101,Eu=102,Au=103,Tu=104,Ru=200,Cu=201,Pu=202,Lu=203,sc=204,ac=205,Du=206,Iu=207,ku=208,Nu=209,Uu=210,zu=211,Fu=212,Ou=213,Bu=214,sa=0,aa=1,oa=2,Ki=3,la=4,ca=5,ua=6,ha=7,so=0,Vu=1,Hu=2,fn=0,oc=1,lc=2,cc=3,uc=4,hc=5,fc=6,dc=7,pc=300,jn=301,Ai=302,ms=303,gs=304,os=306,fa=1e3,yn=1001,da=1002,At=1003,Gu=1004,cr=1005,Dt=1006,_s=1007,Zn=1008,Gt=1009,mc=1010,gc=1011,Ji=1012,ao=1013,dn=1014,un=1015,pn=1016,oo=1017,lo=1018,Qi=1020,_c=35902,vc=35899,xc=1021,Sc=1022,en=1023,Tn=1026,Kn=1027,bc=1028,co=1029,ei=1030,uo=1031,ho=1033,Or=33776,Br=33777,Vr=33778,Hr=33779,pa=35840,ma=35841,ga=35842,_a=35843,va=36196,xa=37492,Sa=37496,ba=37488,Ma=37489,$r=37490,ya=37491,wa=37808,Ea=37809,Aa=37810,Ta=37811,Ra=37812,Ca=37813,Pa=37814,La=37815,Da=37816,Ia=37817,ka=37818,Na=37819,Ua=37820,za=37821,Fa=36492,Oa=36494,Ba=36495,Va=36283,Ha=36284,Zr=36285,Ga=36286,Wu=3200,Wa=0,Xu=1,Un="",qt="srgb",Kr="srgb-linear",Jr="linear",ot="srgb",vs=7680,qu=519,Yu=512,$u=513,Zu=514,fo=515,Ku=516,Ju=517,po=518,Qu=519,ju=35044,Bo="300 es",hn=2e3,ji=2001;function eh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Qr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function th(){const n=Qr("canvas");return n.style.display="block",n}const Vo={};function Ho(...n){const e="THREE."+n.shift();console.log(e,...n)}function Mc(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Fe(...n){n=Mc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function je(...n){n=Mc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function wi(...n){const e=n.join(" ");e in Vo||(Vo[e]=!0,Fe(...n))}function nh(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const ih={[sa]:aa,[oa]:ua,[la]:ha,[Ki]:ca,[aa]:sa,[ua]:oa,[ha]:la,[ca]:Ki};class ii{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Gr=Math.PI/180,Xa=180/Math.PI;function Pi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Pt[n&255]+Pt[n>>8&255]+Pt[n>>16&255]+Pt[n>>24&255]+"-"+Pt[e&255]+Pt[e>>8&255]+"-"+Pt[e>>16&15|64]+Pt[e>>24&255]+"-"+Pt[t&63|128]+Pt[t>>8&255]+"-"+Pt[t>>16&255]+Pt[t>>24&255]+Pt[i&255]+Pt[i>>8&255]+Pt[i>>16&255]+Pt[i>>24&255]).toLowerCase()}function Je(n,e,t){return Math.max(e,Math.min(t,n))}function rh(n,e){return(n%e+e)%e}function xs(n,e,t){return(1-t)*n+t*e}function ki(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ut(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class fe{static{fe.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Li{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3],f=s[a+0],d=s[a+1],m=s[a+2],x=s[a+3];if(h!==x||l!==f||c!==d||u!==m){let g=l*f+c*d+u*m+h*x;g<0&&(f=-f,d=-d,m=-m,x=-x,g=-g);let p=1-o;if(g<.9995){const R=Math.acos(g),C=Math.sin(R);p=Math.sin(p*R)/C,o=Math.sin(o*R)/C,l=l*p+f*o,c=c*p+d*o,u=u*p+m*o,h=h*p+x*o}else{l=l*p+f*o,c=c*p+d*o,u=u*p+m*o,h=h*p+x*o;const R=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=R,c*=R,u*=R,h*=R}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[a],f=s[a+1],d=s[a+2],m=s[a+3];return e[t]=o*m+u*h+l*d-c*f,e[t+1]=l*m+u*f+c*h-o*d,e[t+2]=c*m+u*d+o*f-l*h,e[t+3]=u*m-o*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),h=o(s/2),f=l(i/2),d=l(r/2),m=l(s/2);switch(a){case"XYZ":this._x=f*u*h+c*d*m,this._y=c*d*h-f*u*m,this._z=c*u*m+f*d*h,this._w=c*u*h-f*d*m;break;case"YXZ":this._x=f*u*h+c*d*m,this._y=c*d*h-f*u*m,this._z=c*u*m-f*d*h,this._w=c*u*h+f*d*m;break;case"ZXY":this._x=f*u*h-c*d*m,this._y=c*d*h+f*u*m,this._z=c*u*m+f*d*h,this._w=c*u*h-f*d*m;break;case"ZYX":this._x=f*u*h-c*d*m,this._y=c*d*h+f*u*m,this._z=c*u*m-f*d*h,this._w=c*u*h+f*d*m;break;case"YZX":this._x=f*u*h+c*d*m,this._y=c*d*h+f*u*m,this._z=c*u*m-f*d*h,this._w=c*u*h-f*d*m;break;case"XZY":this._x=f*u*h-c*d*m,this._y=c*d*h-f*u*m,this._z=c*u*m+f*d*h,this._w=c*u*h+f*d*m;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=i+o+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(a-r)*d}else if(i>o&&i>h){const d=2*Math.sqrt(1+i-o-h);this._w=(u-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+c)/d}else if(o>h){const d=2*Math.sqrt(1+o-i-h);this._w=(s-c)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-i-o);this._w=(a-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{static{I.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Go.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Go.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+l*c+a*h-o*u,this.y=i+l*u+o*c-s*h,this.z=r+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ss.copy(this).projectOnVector(e),this.sub(Ss)}reflect(e){return this.sub(Ss.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ss=new I,Go=new Li;class He{static{He.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],d=i[5],m=i[8],x=r[0],g=r[3],p=r[6],R=r[1],C=r[4],M=r[7],w=r[2],E=r[5],P=r[8];return s[0]=a*x+o*R+l*w,s[3]=a*g+o*C+l*E,s[6]=a*p+o*M+l*P,s[1]=c*x+u*R+h*w,s[4]=c*g+u*C+h*E,s[7]=c*p+u*M+h*P,s[2]=f*x+d*R+m*w,s[5]=f*g+d*C+m*E,s[8]=f*p+d*M+m*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,f=o*l-u*s,d=c*s-a*l,m=t*h+i*f+r*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return e[0]=h*x,e[1]=(r*c-u*i)*x,e[2]=(o*i-r*a)*x,e[3]=f*x,e[4]=(u*t-r*l)*x,e[5]=(r*s-o*t)*x,e[6]=d*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return wi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(bs.makeScale(e,t)),this}rotate(e){return wi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(bs.makeRotation(-e)),this}translate(e,t){return wi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(bs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const bs=new He,Wo=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xo=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sh(){const n={enabled:!0,workingColorSpace:Kr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ot&&(r.r=En(r.r),r.g=En(r.g),r.b=En(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ot&&(r.r=Ei(r.r),r.g=Ei(r.g),r.b=Ei(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Un?Jr:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return wi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return wi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Kr]:{primaries:e,whitePoint:i,transfer:Jr,toXYZ:Wo,fromXYZ:Xo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:qt},outputColorSpaceConfig:{drawingBufferColorSpace:qt}},[qt]:{primaries:e,whitePoint:i,transfer:ot,toXYZ:Wo,fromXYZ:Xo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:qt}}}),n}const Qe=sh();function En(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ei(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ai;class ah{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ai===void 0&&(ai=Qr("canvas")),ai.width=e.width,ai.height=e.height;const r=ai.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=ai}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Qr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=En(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(En(t[i]/255)*255):t[i]=En(t[i]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let oh=0;class mo{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:oh++}),this.uuid=Pi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ms(r[a].image)):s.push(Ms(r[a]))}else s=Ms(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Ms(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ah.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let lh=0;const ys=new I;class Nt extends ii{constructor(e=Nt.DEFAULT_IMAGE,t=Nt.DEFAULT_MAPPING,i=yn,r=yn,s=Dt,a=Zn,o=en,l=Gt,c=Nt.DEFAULT_ANISOTROPY,u=Un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lh++}),this.uuid=Pi(),this.name="",this.source=new mo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new fe(0,0),this.repeat=new fe(1,1),this.center=new fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ys).x}get height(){return this.source.getSize(ys).y}get depth(){return this.source.getSize(ys).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==pc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case fa:e.x=e.x-Math.floor(e.x);break;case yn:e.x=e.x<0?0:1;break;case da:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case fa:e.y=e.y-Math.floor(e.y);break;case yn:e.y=e.y<0?0:1;break;case da:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Nt.DEFAULT_IMAGE=null;Nt.DEFAULT_MAPPING=pc;Nt.DEFAULT_ANISOTROPY=1;class mt{static{mt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const C=(c+1)/2,M=(d+1)/2,w=(p+1)/2,E=(u+f)/4,P=(h+x)/4,v=(m+g)/4;return C>M&&C>w?C<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(C),r=E/i,s=P/i):M>w?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=E/r,s=v/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=P/s,r=v/s),this.set(i,r,s,t),this}let R=Math.sqrt((g-m)*(g-m)+(h-x)*(h-x)+(f-u)*(f-u));return Math.abs(R)<.001&&(R=1),this.x=(g-m)/R,this.y=(h-x)/R,this.z=(f-u)/R,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ch extends ii{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Nt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Dt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new mo(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class tn extends ch{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class yc extends Nt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=At,this.minFilter=At,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class uh extends Nt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=At,this.minFilter=At,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class dt{static{dt.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,l,c,u,h,f,d,m,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,h,f,d,m,x,g)}set(e,t,i,r,s,a,o,l,c,u,h,f,d,m,x,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new dt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/oi.setFromMatrixColumn(e,0).length(),s=1/oi.setFromMatrixColumn(e,1).length(),a=1/oi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=a*u,d=a*h,m=o*u,x=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+m*c,t[5]=f-x*c,t[9]=-o*l,t[2]=x-f*c,t[6]=m+d*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,d=l*h,m=c*u,x=c*h;t[0]=f+x*o,t[4]=m*o-d,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=d*o-m,t[6]=x+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,d=l*h,m=c*u,x=c*h;t[0]=f-x*o,t[4]=-a*h,t[8]=m+d*o,t[1]=d+m*o,t[5]=a*u,t[9]=x-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,d=a*h,m=o*u,x=o*h;t[0]=l*u,t[4]=m*c-d,t[8]=f*c+x,t[1]=l*h,t[5]=x*c+f,t[9]=d*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,d=a*c,m=o*l,x=o*c;t[0]=l*u,t[4]=x-f*h,t[8]=m*h+d,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=d*h+m,t[10]=f-x*h}else if(e.order==="XZY"){const f=a*l,d=a*c,m=o*l,x=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+x,t[5]=a*u,t[9]=d*h-m,t[2]=m*h-d,t[6]=o*u,t[10]=x*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(hh,e,fh)}lookAt(e,t,i){const r=this.elements;return Ot.subVectors(e,t),Ot.lengthSq()===0&&(Ot.z=1),Ot.normalize(),Ln.crossVectors(i,Ot),Ln.lengthSq()===0&&(Math.abs(i.z)===1?Ot.x+=1e-4:Ot.z+=1e-4,Ot.normalize(),Ln.crossVectors(i,Ot)),Ln.normalize(),ur.crossVectors(Ot,Ln),r[0]=Ln.x,r[4]=ur.x,r[8]=Ot.x,r[1]=Ln.y,r[5]=ur.y,r[9]=Ot.y,r[2]=Ln.z,r[6]=ur.z,r[10]=Ot.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],d=i[13],m=i[2],x=i[6],g=i[10],p=i[14],R=i[3],C=i[7],M=i[11],w=i[15],E=r[0],P=r[4],v=r[8],T=r[12],L=r[1],k=r[5],O=r[9],X=r[13],z=r[2],V=r[6],b=r[10],y=r[14],H=r[3],F=r[7],Y=r[11],K=r[15];return s[0]=a*E+o*L+l*z+c*H,s[4]=a*P+o*k+l*V+c*F,s[8]=a*v+o*O+l*b+c*Y,s[12]=a*T+o*X+l*y+c*K,s[1]=u*E+h*L+f*z+d*H,s[5]=u*P+h*k+f*V+d*F,s[9]=u*v+h*O+f*b+d*Y,s[13]=u*T+h*X+f*y+d*K,s[2]=m*E+x*L+g*z+p*H,s[6]=m*P+x*k+g*V+p*F,s[10]=m*v+x*O+g*b+p*Y,s[14]=m*T+x*X+g*y+p*K,s[3]=R*E+C*L+M*z+w*H,s[7]=R*P+C*k+M*V+w*F,s[11]=R*v+C*O+M*b+w*Y,s[15]=R*T+C*X+M*y+w*K,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],m=e[3],x=e[7],g=e[11],p=e[15],R=l*d-c*f,C=o*d-c*h,M=o*f-l*h,w=a*d-c*u,E=a*f-l*u,P=a*h-o*u;return t*(x*R-g*C+p*M)-i*(m*R-g*w+p*E)+r*(m*C-x*w+p*P)-s*(m*M-x*E+g*P)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(s*u-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],m=e[12],x=e[13],g=e[14],p=e[15],R=t*o-i*a,C=t*l-r*a,M=t*c-s*a,w=i*l-r*o,E=i*c-s*o,P=r*c-s*l,v=u*x-h*m,T=u*g-f*m,L=u*p-d*m,k=h*g-f*x,O=h*p-d*x,X=f*p-d*g,z=R*X-C*O+M*k+w*L-E*T+P*v;if(z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const V=1/z;return e[0]=(o*X-l*O+c*k)*V,e[1]=(r*O-i*X-s*k)*V,e[2]=(x*P-g*E+p*w)*V,e[3]=(f*E-h*P-d*w)*V,e[4]=(l*L-a*X-c*T)*V,e[5]=(t*X-r*L+s*T)*V,e[6]=(g*M-m*P-p*C)*V,e[7]=(u*P-f*M+d*C)*V,e[8]=(a*O-o*L+c*v)*V,e[9]=(i*L-t*O-s*v)*V,e[10]=(m*E-x*M+p*R)*V,e[11]=(h*M-u*E-d*R)*V,e[12]=(o*T-a*k-l*v)*V,e[13]=(t*k-i*T+r*v)*V,e[14]=(x*C-m*w-g*R)*V,e[15]=(u*w-h*C+f*R)*V,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,f=s*c,d=s*u,m=s*h,x=a*u,g=a*h,p=o*h,R=l*c,C=l*u,M=l*h,w=i.x,E=i.y,P=i.z;return r[0]=(1-(x+p))*w,r[1]=(d+M)*w,r[2]=(m-C)*w,r[3]=0,r[4]=(d-M)*E,r[5]=(1-(f+p))*E,r[6]=(g+R)*E,r[7]=0,r[8]=(m+C)*P,r[9]=(g-R)*P,r[10]=(1-(f+x))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=oi.set(r[0],r[1],r[2]).length();const o=oi.set(r[4],r[5],r[6]).length(),l=oi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Kt.copy(this);const c=1/a,u=1/o,h=1/l;return Kt.elements[0]*=c,Kt.elements[1]*=c,Kt.elements[2]*=c,Kt.elements[4]*=u,Kt.elements[5]*=u,Kt.elements[6]*=u,Kt.elements[8]*=h,Kt.elements[9]*=h,Kt.elements[10]*=h,t.setFromRotationMatrix(Kt),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=hn,l=!1){const c=this.elements,u=2*s/(t-e),h=2*s/(i-r),f=(t+e)/(t-e),d=(i+r)/(i-r);let m,x;if(l)m=s/(a-s),x=a*s/(a-s);else if(o===hn)m=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===ji)m=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=hn,l=!1){const c=this.elements,u=2/(t-e),h=2/(i-r),f=-(t+e)/(t-e),d=-(i+r)/(i-r);let m,x;if(l)m=1/(a-s),x=a/(a-s);else if(o===hn)m=-2/(a-s),x=-(a+s)/(a-s);else if(o===ji)m=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const oi=new I,Kt=new dt,hh=new I(0,0,0),fh=new I(1,1,1),Ln=new I,ur=new I,Ot=new I,qo=new dt,Yo=new Li;class Bn{constructor(e=0,t=0,i=0,r=Bn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return qo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(qo,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Yo.setFromEuler(this),this.setFromQuaternion(Yo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Bn.DEFAULT_ORDER="XYZ";let go=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},dh=0;const $o=new I,li=new Li,_n=new dt,hr=new I,Ni=new I,ph=new I,mh=new Li,Zo=new I(1,0,0),Ko=new I(0,1,0),Jo=new I(0,0,1),Qo={type:"added"},gh={type:"removed"},ci={type:"childadded",child:null},ws={type:"childremoved",child:null};class Tt extends ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dh++}),this.uuid=Pi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Tt.DEFAULT_UP.clone();const e=new I,t=new Bn,i=new Li,r=new I(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new dt},normalMatrix:{value:new He}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=Tt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new go,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return li.setFromAxisAngle(e,t),this.quaternion.multiply(li),this}rotateOnWorldAxis(e,t){return li.setFromAxisAngle(e,t),this.quaternion.premultiply(li),this}rotateX(e){return this.rotateOnAxis(Zo,e)}rotateY(e){return this.rotateOnAxis(Ko,e)}rotateZ(e){return this.rotateOnAxis(Jo,e)}translateOnAxis(e,t){return $o.copy(e).applyQuaternion(this.quaternion),this.position.add($o.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Zo,e)}translateY(e){return this.translateOnAxis(Ko,e)}translateZ(e){return this.translateOnAxis(Jo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_n.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?hr.copy(e):hr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ni.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_n.lookAt(Ni,hr,this.up):_n.lookAt(hr,Ni,this.up),this.quaternion.setFromRotationMatrix(_n),r&&(_n.extractRotation(r.matrixWorld),li.setFromRotationMatrix(_n),this.quaternion.premultiply(li.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Qo),ci.child=e,this.dispatchEvent(ci),ci.child=null):je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gh),ws.child=e,this.dispatchEvent(ws),ws.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_n.multiply(e.parent.matrixWorld)),e.applyMatrix4(_n),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Qo),ci.child=e,this.dispatchEvent(ci),ci.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ni,e,ph),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ni,mh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),d=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),m.length>0&&(i.nodes=m)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Tt.DEFAULT_UP=new I(0,1,0);Tt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Jn extends Tt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _h={type:"move"};class Es{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const g=t.getJointPose(x,i),p=this._getHandJoint(c,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,m=.005;c.inputState.pinching&&f>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(_h)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Jn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const wc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Dn={h:0,s:0,l:0},fr={h:0,s:0,l:0};function As(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ye{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Qe.workingColorSpace){if(e=rh(e,1),t=Je(t,0,1),i=Je(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=As(a,s,e+1/3),this.g=As(a,s,e),this.b=As(a,s,e-1/3)}return Qe.colorSpaceToWorking(this,r),this}setStyle(e,t=qt){function i(s){s!==void 0&&parseFloat(s)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){const i=wc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=En(e.r),this.g=En(e.g),this.b=En(e.b),this}copyLinearToSRGB(e){return this.r=Ei(e.r),this.g=Ei(e.g),this.b=Ei(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return Qe.workingToColorSpace(Lt.copy(this),e),Math.round(Je(Lt.r*255,0,255))*65536+Math.round(Je(Lt.g*255,0,255))*256+Math.round(Je(Lt.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(Lt.copy(this),t);const i=Lt.r,r=Lt.g,s=Lt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(Lt.copy(this),t),e.r=Lt.r,e.g=Lt.g,e.b=Lt.b,e}getStyle(e=qt){Qe.workingToColorSpace(Lt.copy(this),e);const t=Lt.r,i=Lt.g,r=Lt.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Dn),this.setHSL(Dn.h+e,Dn.s+t,Dn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Dn),e.getHSL(fr);const i=xs(Dn.h,fr.h,t),r=xs(Dn.s,fr.s,t),s=xs(Dn.l,fr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Lt=new Ye;Ye.NAMES=wc;class vh extends Tt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Bn,this.environmentIntensity=1,this.environmentRotation=new Bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Jt=new I,vn=new I,Ts=new I,xn=new I,ui=new I,hi=new I,jo=new I,Rs=new I,Cs=new I,Ps=new I,Ls=new mt,Ds=new mt,Is=new mt;class $t{constructor(e=new I,t=new I,i=new I){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Jt.subVectors(e,t),r.cross(Jt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Jt.subVectors(r,t),vn.subVectors(i,t),Ts.subVectors(e,t);const a=Jt.dot(Jt),o=Jt.dot(vn),l=Jt.dot(Ts),c=vn.dot(vn),u=vn.dot(Ts),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(c*l-o*u)*f,m=(a*u-o*l)*f;return s.set(1-d-m,m,d)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,xn)===null?!1:xn.x>=0&&xn.y>=0&&xn.x+xn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,xn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,xn.x),l.addScaledVector(a,xn.y),l.addScaledVector(o,xn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Ls.setScalar(0),Ds.setScalar(0),Is.setScalar(0),Ls.fromBufferAttribute(e,t),Ds.fromBufferAttribute(e,i),Is.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ls,s.x),a.addScaledVector(Ds,s.y),a.addScaledVector(Is,s.z),a}static isFrontFacing(e,t,i,r){return Jt.subVectors(i,t),vn.subVectors(e,t),Jt.cross(vn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jt.subVectors(this.c,this.b),vn.subVectors(this.a,this.b),Jt.cross(vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return $t.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return $t.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return $t.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return $t.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return $t.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;ui.subVectors(r,i),hi.subVectors(s,i),Rs.subVectors(e,i);const l=ui.dot(Rs),c=hi.dot(Rs);if(l<=0&&c<=0)return t.copy(i);Cs.subVectors(e,r);const u=ui.dot(Cs),h=hi.dot(Cs);if(u>=0&&h<=u)return t.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(ui,a);Ps.subVectors(e,s);const d=ui.dot(Ps),m=hi.dot(Ps);if(m>=0&&d<=m)return t.copy(s);const x=d*c-l*m;if(x<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(hi,o);const g=u*m-d*h;if(g<=0&&h-u>=0&&d-m>=0)return jo.subVectors(s,r),o=(h-u)/(h-u+(d-m)),t.copy(r).addScaledVector(jo,o);const p=1/(g+x+f);return a=x*p,o=f*p,t.copy(i).addScaledVector(ui,a).addScaledVector(hi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class sr{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Qt):Qt.fromBufferAttribute(s,a),Qt.applyMatrix4(e.matrixWorld),this.expandByPoint(Qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),dr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),dr.copy(i.boundingBox)),dr.applyMatrix4(e.matrixWorld),this.union(dr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qt),Qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ui),pr.subVectors(this.max,Ui),fi.subVectors(e.a,Ui),di.subVectors(e.b,Ui),pi.subVectors(e.c,Ui),In.subVectors(di,fi),kn.subVectors(pi,di),Hn.subVectors(fi,pi);let t=[0,-In.z,In.y,0,-kn.z,kn.y,0,-Hn.z,Hn.y,In.z,0,-In.x,kn.z,0,-kn.x,Hn.z,0,-Hn.x,-In.y,In.x,0,-kn.y,kn.x,0,-Hn.y,Hn.x,0];return!ks(t,fi,di,pi,pr)||(t=[1,0,0,0,1,0,0,0,1],!ks(t,fi,di,pi,pr))?!1:(mr.crossVectors(In,kn),t=[mr.x,mr.y,mr.z],ks(t,fi,di,pi,pr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Sn=[new I,new I,new I,new I,new I,new I,new I,new I],Qt=new I,dr=new sr,fi=new I,di=new I,pi=new I,In=new I,kn=new I,Hn=new I,Ui=new I,pr=new I,mr=new I,Gn=new I;function ks(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Gn.fromArray(n,s);const o=r.x*Math.abs(Gn.x)+r.y*Math.abs(Gn.y)+r.z*Math.abs(Gn.z),l=e.dot(Gn),c=t.dot(Gn),u=i.dot(Gn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const St=new I,gr=new fe;let xh=0;class An extends ii{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ju,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)gr.fromBufferAttribute(this,t),gr.applyMatrix3(e),this.setXY(t,gr.x,gr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyMatrix3(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyMatrix4(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyNormalMatrix(e),this.setXYZ(t,St.x,St.y,St.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.transformDirection(e),this.setXYZ(t,St.x,St.y,St.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ki(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ut(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ki(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ki(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ki(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ki(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),i=Ut(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),i=Ut(i,this.array),r=Ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),i=Ut(i,this.array),r=Ut(r,this.array),s=Ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Ec extends An{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Ac extends An{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Rt extends An{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Sh=new sr,zi=new I,Ns=new I;class ls{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Sh.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zi.subVectors(e,this.center);const t=zi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(zi,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ns.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(zi.copy(e.center).add(Ns)),this.expandByPoint(zi.copy(e.center).sub(Ns))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let bh=0;const Xt=new dt,Us=new Tt,mi=new I,Bt=new sr,Fi=new sr,yt=new I;class Ft extends ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bh++}),this.uuid=Pi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(eh(e)?Ac:Ec)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new He().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Xt.makeRotationFromQuaternion(e),this.applyMatrix4(Xt),this}rotateX(e){return Xt.makeRotationX(e),this.applyMatrix4(Xt),this}rotateY(e){return Xt.makeRotationY(e),this.applyMatrix4(Xt),this}rotateZ(e){return Xt.makeRotationZ(e),this.applyMatrix4(Xt),this}translate(e,t,i){return Xt.makeTranslation(e,t,i),this.applyMatrix4(Xt),this}scale(e,t,i){return Xt.makeScale(e,t,i),this.applyMatrix4(Xt),this}lookAt(e){return Us.lookAt(e),Us.updateMatrix(),this.applyMatrix4(Us.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(mi).negate(),this.translate(mi.x,mi.y,mi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Rt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Bt.setFromBufferAttribute(s),this.morphTargetsRelative?(yt.addVectors(this.boundingBox.min,Bt.min),this.boundingBox.expandByPoint(yt),yt.addVectors(this.boundingBox.max,Bt.max),this.boundingBox.expandByPoint(yt)):(this.boundingBox.expandByPoint(Bt.min),this.boundingBox.expandByPoint(Bt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ls);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const i=this.boundingSphere.center;if(Bt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Fi.setFromBufferAttribute(o),this.morphTargetsRelative?(yt.addVectors(Bt.min,Fi.min),Bt.expandByPoint(yt),yt.addVectors(Bt.max,Fi.max),Bt.expandByPoint(yt)):(Bt.expandByPoint(Fi.min),Bt.expandByPoint(Fi.max))}Bt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)yt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(yt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)yt.fromBufferAttribute(o,c),l&&(mi.fromBufferAttribute(e,c),yt.add(mi)),r=Math.max(r,i.distanceToSquared(yt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new An(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let v=0;v<i.count;v++)o[v]=new I,l[v]=new I;const c=new I,u=new I,h=new I,f=new fe,d=new fe,m=new fe,x=new I,g=new I;function p(v,T,L){c.fromBufferAttribute(i,v),u.fromBufferAttribute(i,T),h.fromBufferAttribute(i,L),f.fromBufferAttribute(s,v),d.fromBufferAttribute(s,T),m.fromBufferAttribute(s,L),u.sub(c),h.sub(c),d.sub(f),m.sub(f);const k=1/(d.x*m.y-m.x*d.y);isFinite(k)&&(x.copy(u).multiplyScalar(m.y).addScaledVector(h,-d.y).multiplyScalar(k),g.copy(h).multiplyScalar(d.x).addScaledVector(u,-m.x).multiplyScalar(k),o[v].add(x),o[T].add(x),o[L].add(x),l[v].add(g),l[T].add(g),l[L].add(g))}let R=this.groups;R.length===0&&(R=[{start:0,count:e.count}]);for(let v=0,T=R.length;v<T;++v){const L=R[v],k=L.start,O=L.count;for(let X=k,z=k+O;X<z;X+=3)p(e.getX(X+0),e.getX(X+1),e.getX(X+2))}const C=new I,M=new I,w=new I,E=new I;function P(v){w.fromBufferAttribute(r,v),E.copy(w);const T=o[v];C.copy(T),C.sub(w.multiplyScalar(w.dot(T))).normalize(),M.crossVectors(E,T);const k=M.dot(l[v])<0?-1:1;a.setXYZW(v,C.x,C.y,C.z,k)}for(let v=0,T=R.length;v<T;++v){const L=R[v],k=L.start,O=L.count;for(let X=k,z=k+O;X<z;X+=3)P(e.getX(X+0)),P(e.getX(X+1)),P(e.getX(X+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new An(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const r=new I,s=new I,a=new I,o=new I,l=new I,c=new I,u=new I,h=new I;if(e)for(let f=0,d=e.count;f<d;f+=3){const m=e.getX(f+0),x=e.getX(f+1),g=e.getX(f+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),o.add(u),l.add(u),c.add(u),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)yt.fromBufferAttribute(e,t),yt.normalize(),e.setXYZ(t,yt.x,yt.y,yt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u);let d=0,m=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?d=l[x]*o.data.stride+o.offset:d=l[x]*u;for(let p=0;p<u;p++)f[m++]=c[d++]}return new An(f,u,h)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ft,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=e(f,i);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const zs=new I,Mh=new I,yh=new He;class Mn{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=zs.subVectors(i,t).cross(Mh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(zs),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||yh.getNormalMatrix(e),r=this.coplanarPoint(zs).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let wh=0;class Di extends ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wh++}),this.uuid=Pi(),this.name="",this.type="Material",this.blending=qi,this.side=On,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sc,this.blendDst=ac,this.blendEquation=Si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=Ki,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vs,this.stencilZFail=vs,this.stencilZPass=vs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ye().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Mn().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new fe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new fe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const bn=new I,Fs=new I,_r=new I,vr=new I;class _o{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=bn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(bn.copy(this.origin).addScaledVector(this.direction,t),bn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Fs.copy(e).add(t).multiplyScalar(.5),_r.copy(t).sub(e).normalize(),vr.copy(this.origin).sub(Fs);const s=e.distanceTo(t)*.5,a=-this.direction.dot(_r),o=vr.dot(this.direction),l=-vr.dot(_r),c=vr.lengthSq(),u=Math.abs(1-a*a);let h,f,d,m;if(u>0)if(h=a*l-o,f=a*o-l,m=s*u,h>=0)if(f>=-m)if(f<=m){const x=1/u;h*=x,f*=x,d=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;else f<=-m?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c):f<=m?(h=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Fs).addScaledVector(_r,f),d}intersectSphere(e,t){if(e.radius<0)return null;bn.subVectors(e.center,this.origin);const i=bn.dot(this.direction),r=bn.dot(bn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,bn)!==null}intersectTriangle(e,t,i,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,h=e.x-a.x,f=e.y-a.y,d=e.z-a.z,m=t.x-a.x,x=t.y-a.y,g=t.z-a.z,p=i.x-a.x,R=i.y-a.y,C=i.z-a.z,M=Math.abs(l),w=Math.abs(c),E=Math.abs(u);let P,v,T,L,k,O,X,z,V,b,y,H;if(M>=w&&M>=E?(T=l,O=h,V=m,H=p,l>=0?(P=c,v=u,L=f,k=d,X=x,z=g,b=R,y=C):(P=u,v=c,L=d,k=f,X=g,z=x,b=C,y=R)):w>=E?(T=c,O=f,V=x,H=R,c>=0?(P=u,v=l,L=d,k=h,X=g,z=m,b=C,y=p):(P=l,v=u,L=h,k=d,X=m,z=g,b=p,y=C)):(T=u,O=d,V=g,H=C,u>=0?(P=l,v=c,L=h,k=f,X=m,z=x,b=p,y=R):(P=c,v=l,L=f,k=h,X=x,z=m,b=R,y=p)),T===0)return null;const F=P/T,Y=v/T,K=1/T,ye=L-F*O,he=k-Y*O,nt=X-F*V,$e=z-Y*V,et=b-F*H,j=y-Y*H,ne=et*$e-j*nt,xe=ye*j-he*et,ze=nt*he-$e*ye;if(r){if(ne<0||xe<0||ze<0)return null}else if((ne<0||xe<0||ze<0)&&(ne>0||xe>0||ze>0))return null;const we=ne+xe+ze;if(we===0)return null;const Oe=K*(ne*O+xe*V+ze*H);return(we>0?Oe<0:Oe>0)?null:this.at(Oe/we,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vo extends Di{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.combine=so,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const el=new dt,Wn=new _o,xr=new ls,tl=new I,Sr=new I,br=new I,Mr=new I,Os=new I,yr=new I,nl=new I,wr=new I;class nn extends Tt{constructor(e=new Ft,t=new vo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){yr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(Os.fromBufferAttribute(h,e),a?yr.addScaledVector(Os,u):yr.addScaledVector(Os.sub(t),u))}t.add(yr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),xr.copy(i.boundingSphere),xr.applyMatrix4(s),Wn.copy(e.ray).recast(e.near),!(xr.containsPoint(Wn.origin)===!1&&(Wn.intersectSphere(xr,tl)===null||Wn.origin.distanceToSquared(tl)>(e.far-e.near)**2))&&(el.copy(s).invert(),Wn.copy(e.ray).applyMatrix4(el),!(i.boundingBox!==null&&Wn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Wn)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,x=f.length;m<x;m++){const g=f[m],p=a[g.materialIndex],R=Math.max(g.start,d.start),C=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let M=R,w=C;M<w;M+=3){const E=o.getX(M),P=o.getX(M+1),v=o.getX(M+2);r=Er(this,p,e,i,c,u,h,E,P,v),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const m=Math.max(0,d.start),x=Math.min(o.count,d.start+d.count);for(let g=m,p=x;g<p;g+=3){const R=o.getX(g),C=o.getX(g+1),M=o.getX(g+2);r=Er(this,a,e,i,c,u,h,R,C,M),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,x=f.length;m<x;m++){const g=f[m],p=a[g.materialIndex],R=Math.max(g.start,d.start),C=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let M=R,w=C;M<w;M+=3){const E=M,P=M+1,v=M+2;r=Er(this,p,e,i,c,u,h,E,P,v),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const m=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let g=m,p=x;g<p;g+=3){const R=g,C=g+1,M=g+2;r=Er(this,a,e,i,c,u,h,R,C,M),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function Eh(n,e,t,i,r,s,a,o){let l;if(e.side===zt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===On,o),l===null)return null;wr.copy(o),wr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(wr);return c<t.near||c>t.far?null:{distance:c,point:wr.clone(),object:n}}function Er(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,Sr),n.getVertexPosition(l,br),n.getVertexPosition(c,Mr);const u=Eh(n,e,t,i,Sr,br,Mr,nl);if(u){const h=new I;$t.getBarycoord(nl,Sr,br,Mr,h),r&&(u.uv=$t.getInterpolatedAttribute(r,o,l,c,h,new fe)),s&&(u.uv1=$t.getInterpolatedAttribute(s,o,l,c,h,new fe)),a&&(u.normal=$t.getInterpolatedAttribute(a,o,l,c,h,new I),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new I,materialIndex:0};$t.getNormal(Sr,br,Mr,f.normal),u.face=f,u.barycoord=h}return u}class Ah extends Nt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=At,u=At,h,f){super(null,a,o,l,c,u,r,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Xn=new ls,Th=new fe(.5,.5),Ar=new I;class xo{constructor(e=new Mn,t=new Mn,i=new Mn,r=new Mn,s=new Mn,a=new Mn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=hn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],h=s[5],f=s[6],d=s[7],m=s[8],x=s[9],g=s[10],p=s[11],R=s[12],C=s[13],M=s[14],w=s[15];if(r[0].setComponents(c-a,d-u,p-m,w-R).normalize(),r[1].setComponents(c+a,d+u,p+m,w+R).normalize(),r[2].setComponents(c+o,d+h,p+x,w+C).normalize(),r[3].setComponents(c-o,d-h,p-x,w-C).normalize(),i)r[4].setComponents(l,f,g,M).normalize(),r[5].setComponents(c-l,d-f,p-g,w-M).normalize();else if(r[4].setComponents(c-l,d-f,p-g,w-M).normalize(),t===hn)r[5].setComponents(c+l,d+f,p+g,w+M).normalize();else if(t===ji)r[5].setComponents(l,f,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xn)}intersectsSprite(e){Xn.center.set(0,0,0);const t=Th.distanceTo(e.center);return Xn.radius=.7071067811865476+t,Xn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xn)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ar.x=r.normal.x>0?e.max.x:e.min.x,Ar.y=r.normal.y>0?e.max.y:e.min.y,Ar.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ar)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class qa extends Di{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const jr=new I,es=new I,il=new dt,Oi=new _o,Tr=new ls,Bs=new I,rl=new I;class Tc extends Tt{constructor(e=new Ft,t=new qa){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)jr.fromBufferAttribute(t,r-1),es.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=jr.distanceTo(es);e.setAttribute("lineDistance",new Rt(i,1))}else Fe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Tr.copy(i.boundingSphere),Tr.applyMatrix4(r),Tr.radius+=s,e.ray.intersectsSphere(Tr)===!1)return;il.copy(r).invert(),Oi.copy(e.ray).applyMatrix4(il);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const d=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let x=d,g=m-1;x<g;x+=c){const p=u.getX(x),R=u.getX(x+1),C=Rr(this,e,Oi,l,p,R,x);C&&t.push(C)}if(this.isLineLoop){const x=u.getX(m-1),g=u.getX(d),p=Rr(this,e,Oi,l,x,g,m-1);p&&t.push(p)}}else{const d=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let x=d,g=m-1;x<g;x+=c){const p=Rr(this,e,Oi,l,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){const x=Rr(this,e,Oi,l,m-1,d,m-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Rr(n,e,t,i,r,s,a){const o=n.geometry.attributes.position;if(jr.fromBufferAttribute(o,r),es.fromBufferAttribute(o,s),t.distanceSqToSegment(jr,es,Bs,rl)>i)return;Bs.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Bs);if(!(c<e.near||c>e.far))return{distance:c,point:rl.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const sl=new I,al=new I;class Rh extends Tc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)sl.fromBufferAttribute(t,r),al.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+sl.distanceTo(al);e.setAttribute("lineDistance",new Rt(i,1))}else Fe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Rc extends Nt{constructor(e=[],t=jn,i,r,s,a,o,l,c,u){super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class er extends Nt{constructor(e,t,i=dn,r,s,a,o=At,l=At,c,u=Tn,h=1){if(u!==Tn&&u!==Kn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:h};super(f,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new mo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Ch extends er{constructor(e,t=dn,i=jn,r,s,a=At,o=At,l,c=Tn){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Cc extends Nt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ti extends Ft{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let f=0,d=0;m("z","y","x",-1,-1,i,t,e,a,s,0),m("z","y","x",1,-1,i,t,-e,a,s,1),m("x","z","y",1,1,e,i,t,r,a,2),m("x","z","y",1,-1,e,i,-t,r,a,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Rt(c,3)),this.setAttribute("normal",new Rt(u,3)),this.setAttribute("uv",new Rt(h,2));function m(x,g,p,R,C,M,w,E,P,v,T){const L=M/P,k=w/v,O=M/2,X=w/2,z=E/2,V=P+1,b=v+1;let y=0,H=0;const F=new I;for(let Y=0;Y<b;Y++){const K=Y*k-X;for(let ye=0;ye<V;ye++){const he=ye*L-O;F[x]=he*R,F[g]=K*C,F[p]=z,c.push(F.x,F.y,F.z),F[x]=0,F[g]=0,F[p]=E>0?1:-1,u.push(F.x,F.y,F.z),h.push(ye/P),h.push(1-Y/v),y+=1}}for(let Y=0;Y<v;Y++)for(let K=0;K<P;K++){const ye=f+K+V*Y,he=f+K+V*(Y+1),nt=f+(K+1)+V*(Y+1),$e=f+(K+1)+V*Y;l.push(ye,he,$e),l.push(he,nt,$e),H+=6}o.addGroup(d,H,T),d+=H,f+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ti(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class So extends Ft{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],f=[],d=[];let m=0;const x=[],g=i/2;let p=0;R(),a===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(u),this.setAttribute("position",new Rt(h,3)),this.setAttribute("normal",new Rt(f,3)),this.setAttribute("uv",new Rt(d,2));function R(){const M=new I,w=new I;let E=0;const P=(t-e)/i;for(let v=0;v<=s;v++){const T=[],L=v/s,k=L*(t-e)+e;for(let O=0;O<=r;O++){const X=O/r,z=X*l+o,V=Math.sin(z),b=Math.cos(z);w.x=k*V,w.y=-L*i+g,w.z=k*b,h.push(w.x,w.y,w.z),M.set(V,P,b).normalize(),f.push(M.x,M.y,M.z),d.push(X,1-L),T.push(m++)}x.push(T)}for(let v=0;v<r;v++)for(let T=0;T<s;T++){const L=x[T][v],k=x[T+1][v],O=x[T+1][v+1],X=x[T][v+1];(e>0||T!==0)&&(u.push(L,k,X),E+=3),(t>0||T!==s-1)&&(u.push(k,O,X),E+=3)}c.addGroup(p,E,0),p+=E}function C(M){const w=m,E=new fe,P=new I;let v=0;const T=M===!0?e:t,L=M===!0?1:-1;for(let O=1;O<=r;O++)h.push(0,g*L,0),f.push(0,L,0),d.push(.5,.5),m++;const k=m;for(let O=0;O<=r;O++){const z=O/r*l+o,V=Math.cos(z),b=Math.sin(z);P.x=T*b,P.y=g*L,P.z=T*V,h.push(P.x,P.y,P.z),f.push(0,L,0),E.x=V*.5+.5,E.y=b*.5*L+.5,d.push(E.x,E.y),m++}for(let O=0;O<r;O++){const X=w+O,z=k+O;M===!0?u.push(z,z+1,X):u.push(z+1,z,X),v+=3}c.addGroup(p,v,M===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new So(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const Cr=new I,Pr=new I,Vs=new I,Lr=new $t;class Ph extends Ft{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(Gr*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),f={},d=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);const{a:x,b:g,c:p}=Lr;if(x.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),Lr.getNormal(Vs),h[0]=`${Math.round(x.x*r)},${Math.round(x.y*r)},${Math.round(x.z*r)}`,h[1]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,h[2]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let R=0;R<3;R++){const C=(R+1)%3,M=h[R],w=h[C],E=Lr[u[R]],P=Lr[u[C]],v=`${M}_${w}`,T=`${w}_${M}`;T in f&&f[T]?(Vs.dot(f[T].normal)<=s&&(d.push(E.x,E.y,E.z),d.push(P.x,P.y,P.z)),f[T]=null):v in f||(f[v]={index0:c[R],index1:c[C],normal:Vs.clone()})}}for(const m in f)if(f[m]){const{index0:x,index1:g}=f[m];Cr.fromBufferAttribute(o,x),Pr.fromBufferAttribute(o,g),d.push(Cr.x,Cr.y,Cr.z),d.push(Pr.x,Pr.y,Pr.z)}this.setAttribute("position",new Rt(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class gn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Fe("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const s=i.length;let a;t?a=t:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const u=i[r],f=i[r+1]-u,d=(a-u)/f;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new fe:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new I,r=[],s=[],a=[],o=new I,l=new dt;for(let d=0;d<=e;d++){const m=d/e;r[d]=this.getTangentAt(m,new I)}s[0]=new I,a[0]=new I;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),f=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),f<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(r[d-1],r[d]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(Je(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(o,m))}a[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(Je(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],d*m)),a[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class bo extends gn{constructor(e=0,t=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new fe){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Lh extends bo{constructor(e,t,i,r,s,a){super(e,t,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Mo(){let n=0,e=0,t=0,i=0;function r(s,a,o,l){n=s,e=o,t=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,h){let f=(a-s)/c-(o-s)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+h)+(l-o)/h;f*=u,d*=u,r(a,o,f,d)},calc:function(s){const a=s*s,o=a*s;return n+e*s+t*a+i*o}}}const ol=new I,ll=new I,Hs=new Mo,Gs=new Mo,Ws=new Mo;class Dh extends gn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new I){const i=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(ll.subVectors(r[0],r[1]).add(r[0]),c=ll);const h=r[o%s],f=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(ol.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=ol),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(h),d),x=Math.pow(h.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(u),d);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),Hs.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,m,x,g),Gs.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,m,x,g),Ws.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,m,x,g)}else this.curveType==="catmullrom"&&(Hs.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),Gs.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),Ws.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return i.set(Hs.calc(l),Gs.calc(l),Ws.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new I().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function cl(n,e,t,i,r){const s=(i-e)*.5,a=(r-t)*.5,o=n*n,l=n*o;return(2*t-2*i+s+a)*l+(-3*t+3*i-2*s-a)*o+s*n+t}function Ih(n,e){const t=1-n;return t*t*e}function kh(n,e){return 2*(1-n)*n*e}function Nh(n,e){return n*n*e}function Yi(n,e,t,i){return Ih(n,e)+kh(n,t)+Nh(n,i)}function Uh(n,e){const t=1-n;return t*t*t*e}function zh(n,e){const t=1-n;return 3*t*t*n*e}function Fh(n,e){return 3*(1-n)*n*n*e}function Oh(n,e){return n*n*n*e}function $i(n,e,t,i,r){return Uh(n,e)+zh(n,t)+Fh(n,i)+Oh(n,r)}class Pc extends gn{constructor(e=new fe,t=new fe,i=new fe,r=new fe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new fe){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set($i(e,r.x,s.x,a.x,o.x),$i(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Bh extends gn{constructor(e=new I,t=new I,i=new I,r=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new I){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set($i(e,r.x,s.x,a.x,o.x),$i(e,r.y,s.y,a.y,o.y),$i(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Lc extends gn{constructor(e=new fe,t=new fe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new fe){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new fe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vh extends gn{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Dc extends gn{constructor(e=new fe,t=new fe,i=new fe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new fe){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(Yi(e,r.x,s.x,a.x),Yi(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Hh extends gn{constructor(e=new I,t=new I,i=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new I){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(Yi(e,r.x,s.x,a.x),Yi(e,r.y,s.y,a.y),Yi(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ic extends gn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new fe){const i=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],u=r[a>r.length-2?r.length-1:a+1],h=r[a>r.length-3?r.length-1:a+2];return i.set(cl(o,l.x,c.x,u.x,h.x),cl(o,l.y,c.y,u.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new fe().fromArray(r))}return this}}var Ya=Object.freeze({__proto__:null,ArcCurve:Lh,CatmullRomCurve3:Dh,CubicBezierCurve:Pc,CubicBezierCurve3:Bh,EllipseCurve:bo,LineCurve:Lc,LineCurve3:Vh,QuadraticBezierCurve:Dc,QuadraticBezierCurve3:Hh,SplineCurve:Ic});class Gh extends gn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ya[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new Ya[r.type]().fromJSON(r))}return this}}class ts extends Gh{constructor(e){super(),this.type="Path",this.currentPoint=new fe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Lc(this.currentPoint.clone(),new fe(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new Dc(this.currentPoint.clone(),new fe(e,t),new fe(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,a){const o=new Pc(this.currentPoint.clone(),new fe(e,t),new fe(i,r),new fe(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Ic(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,r,s,a),this}absarc(e,t,i,r,s,a){return this.absellipse(e,t,i,i,r,s,a),this}ellipse(e,t,i,r,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,r,s,a,o,l),this}absellipse(e,t,i,r,s,a,o,l){const c=new bo(e,t,i,r,s,a,o,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class kc extends ts{constructor(e){super(e),this.uuid=Pi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(new ts().fromJSON(r))}return this}}function Wh(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=Nc(n,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(i&&(s=Zh(n,e,s,t)),n.length>80*t){o=n[0],l=n[1];let u=o,h=l;for(let f=t;f<r;f+=t){const d=n[f],m=n[f+1];d<o&&(o=d),m<l&&(l=m),d>u&&(u=d),m>h&&(h=m)}c=Math.max(u-o,h-l),c=c!==0?32767/c:0}return tr(s,a,t,o,l,c,0),a}function Nc(n,e,t,i,r){let s;if(r===of(n,e,t,i)>0)for(let a=e;a<t;a+=i)s=ul(a/i|0,n[a],n[a+1],s);else for(let a=t-i;a>=e;a-=i)s=ul(a/i|0,n[a],n[a+1],s);return s&&Ti(s,s.next)&&(ir(s),s=s.next),s}function ni(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Ti(t,t.next)||gt(t.prev,t,t.next)===0)){if(ir(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function tr(n,e,t,i,r,s,a){if(!n)return;!a&&s&&ef(n,i,r,s);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?qh(n,i,r,s):Xh(n)){e.push(l.i,n.i,c.i),ir(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=Yh(ni(n),e),tr(n,e,t,i,r,s,2)):a===2&&$h(n,e,t,i,r,s):tr(ni(n),e,t,i,r,s,1);break}}}function Xh(n){const e=n.prev,t=n,i=n.next;if(gt(e,t,i)>=0)return!1;const r=e.x,s=t.x,a=i.x,o=e.y,l=t.y,c=i.y,u=Math.min(r,s,a),h=Math.min(o,l,c),f=Math.max(r,s,a),d=Math.max(o,l,c);let m=i.next;for(;m!==e;){if(m.x>=u&&m.x<=f&&m.y>=h&&m.y<=d&&Gi(r,o,s,l,a,c,m.x,m.y)&&gt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function qh(n,e,t,i){const r=n.prev,s=n,a=n.next;if(gt(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,u=r.y,h=s.y,f=a.y,d=Math.min(o,l,c),m=Math.min(u,h,f),x=Math.max(o,l,c),g=Math.max(u,h,f),p=$a(d,m,e,t,i),R=$a(x,g,e,t,i);let C=n.prevZ,M=n.nextZ;for(;C&&C.z>=p&&M&&M.z<=R;){if(C.x>=d&&C.x<=x&&C.y>=m&&C.y<=g&&C!==r&&C!==a&&Gi(o,u,l,h,c,f,C.x,C.y)&&gt(C.prev,C,C.next)>=0||(C=C.prevZ,M.x>=d&&M.x<=x&&M.y>=m&&M.y<=g&&M!==r&&M!==a&&Gi(o,u,l,h,c,f,M.x,M.y)&&gt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;C&&C.z>=p;){if(C.x>=d&&C.x<=x&&C.y>=m&&C.y<=g&&C!==r&&C!==a&&Gi(o,u,l,h,c,f,C.x,C.y)&&gt(C.prev,C,C.next)>=0)return!1;C=C.prevZ}for(;M&&M.z<=R;){if(M.x>=d&&M.x<=x&&M.y>=m&&M.y<=g&&M!==r&&M!==a&&Gi(o,u,l,h,c,f,M.x,M.y)&&gt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Yh(n,e){let t=n;do{const i=t.prev,r=t.next.next;!Ti(i,r)&&zc(i,t,t.next,r)&&nr(i,r)&&nr(r,i)&&(e.push(i.i,t.i,r.i),ir(t),ir(t.next),t=n=r),t=t.next}while(t!==n);return ni(t)}function $h(n,e,t,i,r,s){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&rf(a,o)){let l=Fc(a,o);a=ni(a,a.next),l=ni(l,l.next),tr(a,e,t,i,r,s,0),tr(l,e,t,i,r,s,0);return}o=o.next}a=a.next}while(a!==n)}function Zh(n,e,t,i){const r=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*i,l=s<a-1?e[s+1]*i:n.length,c=Nc(n,o,l,i,!1);c===c.next&&(c.steiner=!0),r.push(nf(c))}r.sort(Kh);for(let s=0;s<r.length;s++)t=Jh(r[s],t);return t}function Kh(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function Jh(n,e){const t=Qh(n,e);if(!t)return e;const i=Fc(t,n);return ni(i,i.next),ni(t,t.next)}function Qh(n,e){let t=e;const i=n.x,r=n.y;let s=-1/0,a;if(Ti(n,t))return t;do{if(Ti(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const h=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=i&&h>s&&(s=h,a=t.x<t.next.x?t:t.next,h===i))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(i>=t.x&&t.x>=l&&i!==t.x&&Uc(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){const h=Math.abs(r-t.y)/(i-t.x);nr(t,n)&&(h<u||h===u&&(t.x>a.x||t.x===a.x&&jh(a,t)))&&(a=t,u=h)}t=t.next}while(t!==o);return a}function jh(n,e){return gt(n.prev,n,e.prev)<0&&gt(e.next,n,n.next)<0}function ef(n,e,t,i){let r=n;do r.z===0&&(r.z=$a(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,tf(r)}function tf(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let a=i,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(r=i,i=i.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=a}s.nextZ=null,t*=2}while(e>1);return n}function $a(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function nf(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Uc(n,e,t,i,r,s,a,o){return(r-a)*(e-o)>=(n-a)*(s-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(i-o)}function Gi(n,e,t,i,r,s,a,o){return!(n===a&&e===o)&&Uc(n,e,t,i,r,s,a,o)}function rf(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!sf(n,e)&&(nr(n,e)&&nr(e,n)&&af(n,e)&&(gt(n.prev,n,e.prev)||gt(n,e.prev,e))||Ti(n,e)&&gt(n.prev,n,n.next)>0&&gt(e.prev,e,e.next)>0)}function gt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Ti(n,e){return n.x===e.x&&n.y===e.y}function zc(n,e,t,i){const r=Ir(gt(n,e,t)),s=Ir(gt(n,e,i)),a=Ir(gt(t,i,n)),o=Ir(gt(t,i,e));return!!(r!==s&&a!==o||r===0&&Dr(n,t,e)||s===0&&Dr(n,i,e)||a===0&&Dr(t,n,i)||o===0&&Dr(t,e,i))}function Dr(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Ir(n){return n>0?1:n<0?-1:0}function sf(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&zc(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function nr(n,e){return gt(n.prev,n,n.next)<0?gt(n,e,n.next)>=0&&gt(n,n.prev,e)>=0:gt(n,e,n.prev)<0||gt(n,n.next,e)<0}function af(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Fc(n,e){const t=Za(n.i,n.x,n.y),i=Za(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function ul(n,e,t,i){const r=Za(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function ir(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Za(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function of(n,e,t,i){let r=0;for(let s=e,a=t-i;s<t;s+=i)r+=(n[a]-n[s])*(n[s+1]+n[a+1]),a=s;return r}class lf{static triangulate(e,t,i=2){return Wh(e,t,i)}}class Mi{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return Mi.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];hl(e),fl(i,e);let a=e.length;t.forEach(hl);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,fl(i,t[l]);const o=lf.triangulate(i,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function hl(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function fl(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class ns extends Ft{constructor(e=new kc([new fe(.5,.5),new fe(-.5,.5),new fe(-.5,-.5),new fe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new Rt(r,3)),this.setAttribute("uv",new Rt(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:d-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,R=t.UVGenerator!==void 0?t.UVGenerator:cf;let C,M=!1,w,E,P,v;if(p){C=p.getSpacedPoints(u),M=!0,f=!1;const ie=p.isCatmullRomCurve3?p.closed:!1;w=p.computeFrenetFrames(u,ie),E=new I,P=new I,v=new I}f||(g=0,d=0,m=0,x=0);const T=o.extractPoints(c);let L=T.shape;const k=T.holes;if(!Mi.isClockWise(L)){L=L.reverse();for(let ie=0,se=k.length;ie<se;ie++){const ae=k[ie];Mi.isClockWise(ae)&&(k[ie]=ae.reverse())}}function X(ie){const ae=10000000000000001e-36;let oe=ie[0];for(let ue=1;ue<=ie.length;ue++){const Ne=ue%ie.length,ke=ie[Ne],Be=ke.x-oe.x,Ve=ke.y-oe.y,D=Be*Be+Ve*Ve,it=Math.max(Math.abs(ke.x),Math.abs(ke.y),Math.abs(oe.x),Math.abs(oe.y)),Ze=ae*it*it;if(D<=Ze){ie.splice(Ne,1),ue--;continue}oe=ke}}X(L),k.forEach(X);const z=k.length,V=L;for(let ie=0;ie<z;ie++){const se=k[ie];L=L.concat(se)}function b(ie,se,ae){return se||je("ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector(se,ae)}const y=L.length;function H(ie,se,ae){let oe,ue,Ne;const ke=ie.x-se.x,Be=ie.y-se.y,Ve=ae.x-ie.x,D=ae.y-ie.y,it=ke*ke+Be*Be,Ze=ke*D-Be*Ve;if(Math.abs(Ze)>Number.EPSILON){const A=Math.sqrt(it),_=Math.sqrt(Ve*Ve+D*D),B=se.x-Be/A,q=se.y+ke/A,J=ae.x-D/_,le=ae.y+Ve/_,ce=((J-B)*D-(le-q)*Ve)/(ke*D-Be*Ve);oe=B+ke*ce-ie.x,ue=q+Be*ce-ie.y;const Q=oe*oe+ue*ue;if(Q<=2)return new fe(oe,ue);Ne=Math.sqrt(Q/2)}else{let A=!1;ke>Number.EPSILON?Ve>Number.EPSILON&&(A=!0):ke<-Number.EPSILON?Ve<-Number.EPSILON&&(A=!0):Math.sign(Be)===Math.sign(D)&&(A=!0),A?(oe=-Be,ue=ke,Ne=Math.sqrt(it)):(oe=ke,ue=Be,Ne=Math.sqrt(it/2))}return new fe(oe/Ne,ue/Ne)}const F=[];for(let ie=0,se=V.length,ae=se-1,oe=ie+1;ie<se;ie++,ae++,oe++)ae===se&&(ae=0),oe===se&&(oe=0),F[ie]=H(V[ie],V[ae],V[oe]);const Y=[];let K,ye=F.concat();for(let ie=0,se=z;ie<se;ie++){const ae=k[ie];K=[];for(let oe=0,ue=ae.length,Ne=ue-1,ke=oe+1;oe<ue;oe++,Ne++,ke++)Ne===ue&&(Ne=0),ke===ue&&(ke=0),K[oe]=H(ae[oe],ae[Ne],ae[ke]);Y.push(K),ye=ye.concat(K)}let he;if(g===0)he=Mi.triangulateShape(V,k);else{const ie=[],se=[];for(let ae=0;ae<g;ae++){const oe=ae/g,ue=d*Math.cos(oe*Math.PI/2),Ne=m*Math.sin(oe*Math.PI/2)+x;for(let ke=0,Be=V.length;ke<Be;ke++){const Ve=b(V[ke],F[ke],Ne);xe(Ve.x,Ve.y,-ue),oe===0&&ie.push(Ve)}for(let ke=0,Be=z;ke<Be;ke++){const Ve=k[ke];K=Y[ke];const D=[];for(let it=0,Ze=Ve.length;it<Ze;it++){const A=b(Ve[it],K[it],Ne);xe(A.x,A.y,-ue),oe===0&&D.push(A)}oe===0&&se.push(D)}}he=Mi.triangulateShape(ie,se)}const nt=he.length,$e=m+x;for(let ie=0;ie<y;ie++){const se=f?b(L[ie],ye[ie],$e):L[ie];M?(P.copy(w.normals[0]).multiplyScalar(se.x),E.copy(w.binormals[0]).multiplyScalar(se.y),v.copy(C[0]).add(P).add(E),xe(v.x,v.y,v.z)):xe(se.x,se.y,0)}for(let ie=1;ie<=u;ie++)for(let se=0;se<y;se++){const ae=f?b(L[se],ye[se],$e):L[se];M?(P.copy(w.normals[ie]).multiplyScalar(ae.x),E.copy(w.binormals[ie]).multiplyScalar(ae.y),v.copy(C[ie]).add(P).add(E),xe(v.x,v.y,v.z)):xe(ae.x,ae.y,h/u*ie)}for(let ie=g-1;ie>=0;ie--){const se=ie/g,ae=d*Math.cos(se*Math.PI/2),oe=m*Math.sin(se*Math.PI/2)+x;for(let ue=0,Ne=V.length;ue<Ne;ue++){const ke=b(V[ue],F[ue],oe);xe(ke.x,ke.y,h+ae)}for(let ue=0,Ne=k.length;ue<Ne;ue++){const ke=k[ue];K=Y[ue];for(let Be=0,Ve=ke.length;Be<Ve;Be++){const D=b(ke[Be],K[Be],oe);M?xe(D.x,D.y+C[u-1].y,C[u-1].x+ae):xe(D.x,D.y,h+ae)}}}et(),j();function et(){const ie=r.length/3;if(f){let se=0,ae=y*se;for(let oe=0;oe<nt;oe++){const ue=he[oe];ze(ue[2]+ae,ue[1]+ae,ue[0]+ae)}se=u+g*2,ae=y*se;for(let oe=0;oe<nt;oe++){const ue=he[oe];ze(ue[0]+ae,ue[1]+ae,ue[2]+ae)}}else{for(let se=0;se<nt;se++){const ae=he[se];ze(ae[2],ae[1],ae[0])}for(let se=0;se<nt;se++){const ae=he[se];ze(ae[0]+y*u,ae[1]+y*u,ae[2]+y*u)}}i.addGroup(ie,r.length/3-ie,0)}function j(){const ie=r.length/3;let se=0;ne(V,se),se+=V.length;for(let ae=0,oe=k.length;ae<oe;ae++){const ue=k[ae];ne(ue,se),se+=ue.length}i.addGroup(ie,r.length/3-ie,1)}function ne(ie,se){let ae=ie.length;for(;--ae>=0;){const oe=ae;let ue=ae-1;ue<0&&(ue=ie.length-1);for(let Ne=0,ke=u+g*2;Ne<ke;Ne++){const Be=y*Ne,Ve=y*(Ne+1),D=se+oe+Be,it=se+ue+Be,Ze=se+ue+Ve,A=se+oe+Ve;we(D,it,Ze,A)}}}function xe(ie,se,ae){l.push(ie),l.push(se),l.push(ae)}function ze(ie,se,ae){Oe(ie),Oe(se),Oe(ae);const oe=r.length/3,ue=R.generateTopUV(i,r,oe-3,oe-2,oe-1);at(ue[0]),at(ue[1]),at(ue[2])}function we(ie,se,ae,oe){Oe(ie),Oe(se),Oe(oe),Oe(se),Oe(ae),Oe(oe);const ue=r.length/3,Ne=R.generateSideWallUV(i,r,ue-6,ue-3,ue-2,ue-1);at(Ne[0]),at(Ne[1]),at(Ne[3]),at(Ne[1]),at(Ne[2]),at(Ne[3])}function Oe(ie){r.push(l[ie*3+0]),r.push(l[ie*3+1]),r.push(l[ie*3+2])}function at(ie){s.push(ie.x),s.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return uf(t,i,e)}static fromJSON(e,t){const i=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];i.push(o)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Ya[r.type]().fromJSON(r)),new ns(i,e.options)}}const cf={generateTopUV:function(n,e,t,i,r){const s=e[t*3],a=e[t*3+1],o=e[i*3],l=e[i*3+1],c=e[r*3],u=e[r*3+1];return[new fe(s,a),new fe(o,l),new fe(c,u)]},generateSideWallUV:function(n,e,t,i,r,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[i*3],u=e[i*3+1],h=e[i*3+2],f=e[r*3],d=e[r*3+1],m=e[r*3+2],x=e[s*3],g=e[s*3+1],p=e[s*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new fe(a,1-l),new fe(c,1-h),new fe(f,1-m),new fe(x,1-p)]:[new fe(o,1-l),new fe(u,1-h),new fe(d,1-m),new fe(g,1-p)]}};function uf(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){const s=n[i];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class cs extends Ft{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,h=e/o,f=t/l,d=[],m=[],x=[],g=[];for(let p=0;p<u;p++){const R=p*f-a;for(let C=0;C<c;C++){const M=C*h-s;m.push(M,-R,0),x.push(0,0,1),g.push(C/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let R=0;R<o;R++){const C=R+c*p,M=R+c*(p+1),w=R+1+c*(p+1),E=R+1+c*p;d.push(C,M,E),d.push(M,w,E)}this.setIndex(d),this.setAttribute("position",new Rt(m,3)),this.setAttribute("normal",new Rt(x,3)),this.setAttribute("uv",new Rt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cs(e.width,e.height,e.widthSegments,e.heightSegments)}}function Ri(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(dl(r))r.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(dl(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function kt(n){const e={};for(let t=0;t<n.length;t++){const i=Ri(n[t]);for(const r in i)e[r]=i[r]}return e}function dl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function hf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Oc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const ff={clone:Ri,merge:kt};var df=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,pf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class mn extends Di{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=df,this.fragmentShader=pf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ri(e.uniforms),this.uniformsGroups=hf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Ye().setHex(r.value);break;case"v2":this.uniforms[i].value=new fe().fromArray(r.value);break;case"v3":this.uniforms[i].value=new I().fromArray(r.value);break;case"v4":this.uniforms[i].value=new mt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new He().fromArray(r.value);break;case"m4":this.uniforms[i].value=new dt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class mf extends mn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class gf extends Di{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wa,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.combine=so,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _f extends Di{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class vf extends Di{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Bc extends Tt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Xs=new dt,pl=new I,ml=new I;class xf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new fe(512,512),this.mapType=Gt,this.map=null,this.mapPass=null,this.matrix=new dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xo,this._frameExtents=new fe(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;pl.setFromMatrixPosition(e.matrixWorld),t.position.copy(pl),ml.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ml),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){Xs.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Xs,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===ji||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Xs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const kr=new I,Nr=new Li,an=new I;class Vc extends Tt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=hn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(kr,Nr,an),an.x===1&&an.y===1&&an.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(kr,Nr,an.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(kr,Nr,an),an.x===1&&an.y===1&&an.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(kr,Nr,an.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Nn=new I,gl=new fe,_l=new fe;class Yt extends Vc{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Xa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Gr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Xa*2*Math.atan(Math.tan(Gr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Nn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Nn.x,Nn.y).multiplyScalar(-e/Nn.z),Nn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Nn.x,Nn.y).multiplyScalar(-e/Nn.z)}getViewSize(e,t){return this.getViewBounds(e,gl,_l),t.subVectors(_l,gl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Gr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class us extends Vc{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Sf extends xf{constructor(){super(new us(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class vl extends Bc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.target=new Tt,this.shadow=new Sf}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class bf extends Bc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const gi=-90,_i=1;class Mf extends Tt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Yt(gi,_i,e,t);r.layers=this.layers,this.add(r);const s=new Yt(gi,_i,e,t);s.layers=this.layers,this.add(s);const a=new Yt(gi,_i,e,t);a.layers=this.layers,this.add(a);const o=new Yt(gi,_i,e,t);o.layers=this.layers,this.add(o);const l=new Yt(gi,_i,e,t);l.layers=this.layers,this.add(l);const c=new Yt(gi,_i,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===hn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ji)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class yf extends Yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const xl=new dt;class Sl{constructor(e,t,i=0,r=1/0){this.ray=new _o(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new go,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):je("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return xl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(xl),this}intersectObject(e,t=!0,i=[]){return Ka(e,this,i,t),i.sort(bl),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Ka(e[r],this,i,t);return i.sort(bl),i}}function bl(n,e){return n.distance-e.distance}function Ka(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)Ka(s[a],e,t,!0)}}class Hc{static{Hc.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}function Ml(n,e,t,i){const r=wf(i);switch(t){case xc:return n*e;case bc:return n*e/r.components*r.byteLength;case co:return n*e/r.components*r.byteLength;case ei:return n*e*2/r.components*r.byteLength;case uo:return n*e*2/r.components*r.byteLength;case Sc:return n*e*3/r.components*r.byteLength;case en:return n*e*4/r.components*r.byteLength;case ho:return n*e*4/r.components*r.byteLength;case Or:case Br:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Vr:case Hr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ma:case _a:return Math.max(n,16)*Math.max(e,8)/4;case pa:case ga:return Math.max(n,8)*Math.max(e,8)/2;case va:case xa:case ba:case Ma:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Sa:case $r:case ya:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case wa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ea:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Aa:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ta:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ra:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ca:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Pa:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case La:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Da:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ia:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ka:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Na:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ua:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case za:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Fa:case Oa:case Ba:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Va:case Ha:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Zr:case Ga:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function wf(n){switch(n){case Gt:case mc:return{byteLength:1,components:1};case Ji:case gc:case pn:return{byteLength:2,components:1};case oo:case lo:return{byteLength:2,components:4};case dn:case ao:case un:return{byteLength:4,components:1};case _c:case vc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ro}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ro);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Gc(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Ef(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,o),h.length===0)n.bufferSubData(c,0,u);else{h.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<h.length;d++){const m=h[f],x=h[d];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++f,h[f]=x)}h.length=f+1;for(let d=0,m=h.length;d<m;d++){const x=h[d];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Af=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Tf=`#ifdef USE_ALPHAHASH
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
#endif`,Rf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Cf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Df=`#ifdef USE_AOMAP
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
#endif`,If=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kf=`#ifdef USE_BATCHING
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
#endif`,Nf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Uf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ff=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Of=`#ifdef USE_IRIDESCENCE
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
#endif`,Bf=`#ifdef USE_BUMPMAP
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
#endif`,Vf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Hf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,qf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Yf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,$f=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Zf=`#define PI 3.141592653589793
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
} // validated`,Kf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Jf=`vec3 transformedNormal = objectNormal;
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
#endif`,Qf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ed=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,td=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,nd="gl_FragColor = linearToOutputTexel( gl_FragColor );",id=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rd=`#ifdef USE_ENVMAP
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
#endif`,sd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ad=`#ifdef USE_ENVMAP
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
#endif`,od=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ld=`#ifdef USE_ENVMAP
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
#endif`,cd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ud=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dd=`#ifdef USE_GRADIENTMAP
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
}`,pd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,md=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_d=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,vd=`#ifdef USE_ENVMAP
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
#endif`,xd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Sd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Md=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yd=`PhysicalMaterial material;
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
#endif`,wd=`uniform sampler2D dfgLUT;
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
}`,Ed=`
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
#endif`,Ad=`#if defined( RE_IndirectDiffuse )
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
#endif`,Td=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Rd=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Cd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ld=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Id=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Nd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ud=`#if defined( USE_POINTS_UV )
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
#endif`,zd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Od=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Bd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hd=`#ifdef USE_MORPHTARGETS
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
#endif`,Gd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Xd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,qd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$d=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Zd=`#ifdef USE_NORMALMAP
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
#endif`,Kd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Jd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ep=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,tp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,np=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ip=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ap=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,op=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,up=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,hp=`float getShadowMask() {
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
}`,fp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,dp=`#ifdef USE_SKINNING
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
#endif`,pp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mp=`#ifdef USE_SKINNING
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
#endif`,gp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_p=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Sp=`#ifdef USE_TRANSMISSION
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
#endif`,bp=`#ifdef USE_TRANSMISSION
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
#endif`,Mp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ep=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ap=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tp=`uniform sampler2D t2D;
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
}`,Rp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dp=`#include <common>
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
}`,Ip=`#if DEPTH_PACKING == 3200
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
}`,kp=`#define DISTANCE
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
}`,Np=`#define DISTANCE
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
}`,Up=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fp=`uniform float scale;
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
}`,Op=`uniform vec3 diffuse;
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
}`,Bp=`#include <common>
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
}`,Vp=`uniform vec3 diffuse;
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
}`,Hp=`#define LAMBERT
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
}`,Gp=`#define LAMBERT
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
}`,Wp=`#define MATCAP
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
}`,Xp=`#define MATCAP
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
}`,qp=`#define NORMAL
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
}`,Yp=`#define NORMAL
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
}`,$p=`#define PHONG
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
}`,Zp=`#define PHONG
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
}`,Kp=`#define STANDARD
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
}`,Jp=`#define STANDARD
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
}`,Qp=`#define TOON
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
}`,jp=`#define TOON
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
}`,em=`uniform float size;
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
}`,tm=`uniform vec3 diffuse;
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
}`,nm=`#include <common>
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
}`,im=`uniform vec3 color;
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
}`,rm=`uniform float rotation;
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
}`,sm=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:Af,alphahash_pars_fragment:Tf,alphamap_fragment:Rf,alphamap_pars_fragment:Cf,alphatest_fragment:Pf,alphatest_pars_fragment:Lf,aomap_fragment:Df,aomap_pars_fragment:If,batching_pars_vertex:kf,batching_vertex:Nf,begin_vertex:Uf,beginnormal_vertex:zf,bsdfs:Ff,iridescence_fragment:Of,bumpmap_pars_fragment:Bf,clipping_planes_fragment:Vf,clipping_planes_pars_fragment:Hf,clipping_planes_pars_vertex:Gf,clipping_planes_vertex:Wf,color_fragment:Xf,color_pars_fragment:qf,color_pars_vertex:Yf,color_vertex:$f,common:Zf,cube_uv_reflection_fragment:Kf,defaultnormal_vertex:Jf,displacementmap_pars_vertex:Qf,displacementmap_vertex:jf,emissivemap_fragment:ed,emissivemap_pars_fragment:td,colorspace_fragment:nd,colorspace_pars_fragment:id,envmap_fragment:rd,envmap_common_pars_fragment:sd,envmap_pars_fragment:ad,envmap_pars_vertex:od,envmap_physical_pars_fragment:vd,envmap_vertex:ld,fog_vertex:cd,fog_pars_vertex:ud,fog_fragment:hd,fog_pars_fragment:fd,gradientmap_pars_fragment:dd,lightmap_pars_fragment:pd,lights_lambert_fragment:md,lights_lambert_pars_fragment:gd,lights_pars_begin:_d,lights_toon_fragment:xd,lights_toon_pars_fragment:Sd,lights_phong_fragment:bd,lights_phong_pars_fragment:Md,lights_physical_fragment:yd,lights_physical_pars_fragment:wd,lights_fragment_begin:Ed,lights_fragment_maps:Ad,lights_fragment_end:Td,lightprobes_pars_fragment:Rd,logdepthbuf_fragment:Cd,logdepthbuf_pars_fragment:Pd,logdepthbuf_pars_vertex:Ld,logdepthbuf_vertex:Dd,map_fragment:Id,map_pars_fragment:kd,map_particle_fragment:Nd,map_particle_pars_fragment:Ud,metalnessmap_fragment:zd,metalnessmap_pars_fragment:Fd,morphinstance_vertex:Od,morphcolor_vertex:Bd,morphnormal_vertex:Vd,morphtarget_pars_vertex:Hd,morphtarget_vertex:Gd,normal_fragment_begin:Wd,normal_fragment_maps:Xd,normal_pars_fragment:qd,normal_pars_vertex:Yd,normal_vertex:$d,normalmap_pars_fragment:Zd,clearcoat_normal_fragment_begin:Kd,clearcoat_normal_fragment_maps:Jd,clearcoat_pars_fragment:Qd,iridescence_pars_fragment:jd,opaque_fragment:ep,packing:tp,premultiplied_alpha_fragment:np,project_vertex:ip,dithering_fragment:rp,dithering_pars_fragment:sp,roughnessmap_fragment:ap,roughnessmap_pars_fragment:op,shadowmap_pars_fragment:lp,shadowmap_pars_vertex:cp,shadowmap_vertex:up,shadowmask_pars_fragment:hp,skinbase_vertex:fp,skinning_pars_vertex:dp,skinning_vertex:pp,skinnormal_vertex:mp,specularmap_fragment:gp,specularmap_pars_fragment:_p,tonemapping_fragment:vp,tonemapping_pars_fragment:xp,transmission_fragment:Sp,transmission_pars_fragment:bp,uv_pars_fragment:Mp,uv_pars_vertex:yp,uv_vertex:wp,worldpos_vertex:Ep,background_vert:Ap,background_frag:Tp,backgroundCube_vert:Rp,backgroundCube_frag:Cp,cube_vert:Pp,cube_frag:Lp,depth_vert:Dp,depth_frag:Ip,distance_vert:kp,distance_frag:Np,equirect_vert:Up,equirect_frag:zp,linedashed_vert:Fp,linedashed_frag:Op,meshbasic_vert:Bp,meshbasic_frag:Vp,meshlambert_vert:Hp,meshlambert_frag:Gp,meshmatcap_vert:Wp,meshmatcap_frag:Xp,meshnormal_vert:qp,meshnormal_frag:Yp,meshphong_vert:$p,meshphong_frag:Zp,meshphysical_vert:Kp,meshphysical_frag:Jp,meshtoon_vert:Qp,meshtoon_frag:jp,points_vert:em,points_frag:tm,shadow_vert:nm,shadow_frag:im,sprite_vert:rm,sprite_frag:sm},ve={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},cn={basic:{uniforms:kt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:kt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new Ye(0)},envMapIntensity:{value:1}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:kt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:kt([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:kt([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:kt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:kt([ve.points,ve.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:kt([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:kt([ve.common,ve.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:kt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:kt([ve.sprite,ve.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distance:{uniforms:kt([ve.common,ve.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distance_vert,fragmentShader:Xe.distance_frag},shadow:{uniforms:kt([ve.lights,ve.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};cn.physical={uniforms:kt([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Ur={r:0,b:0,g:0},am=new dt,Wc=new He;Wc.set(-1,0,0,0,1,0,0,0,1);function om(n,e,t,i,r,s){const a=new Ye(0);let o=r===!0?0:1,l,c,u=null,h=0,f=null;function d(R){let C=R.isScene===!0?R.background:null;if(C&&C.isTexture){const M=R.backgroundBlurriness>0;C=e.get(C,M)}return C}function m(R){let C=!1;const M=d(R);M===null?g(a,o):M&&M.isColor&&(g(M,1),C=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(R,C){const M=d(C);M&&(M.isCubeTexture||M.mapping===os)?(c===void 0&&(c=new nn(new ti(1,1,1),new mn({name:"BackgroundCubeMaterial",uniforms:Ri(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(am.makeRotationFromEuler(C.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Wc),c.material.toneMapped=Qe.getTransfer(M.colorSpace)!==ot,(u!==M||h!==M.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=M,h=M.version,f=n.toneMapping),c.layers.enableAll(),R.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new nn(new cs(2,2),new mn({name:"BackgroundMaterial",uniforms:Ri(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=Qe.getTransfer(M.colorSpace)!==ot,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||h!==M.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=M,h=M.version,f=n.toneMapping),l.layers.enableAll(),R.unshift(l,l.geometry,l.material,0,0,null))}function g(R,C){R.getRGB(Ur,Oc(n)),t.buffers.color.setClear(Ur.r,Ur.g,Ur.b,C,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(R,C=1){a.set(R),o=C,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(R){o=R,g(a,o)},render:m,addToRenderList:x,dispose:p}}function lm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,a=!1;function o(k,O,X,z,V){let b=!1;const y=h(k,z,X,O);s!==y&&(s=y,c(s.object)),b=d(k,z,X,V),b&&m(k,z,X,V),V!==null&&e.update(V,n.ELEMENT_ARRAY_BUFFER),(b||a)&&(a=!1,M(k,O,X,z),V!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return n.createVertexArray()}function c(k){return n.bindVertexArray(k)}function u(k){return n.deleteVertexArray(k)}function h(k,O,X,z){const V=z.wireframe===!0;let b=i[O.id];b===void 0&&(b={},i[O.id]=b);const y=k.isInstancedMesh===!0?k.id:0;let H=b[y];H===void 0&&(H={},b[y]=H);let F=H[X.id];F===void 0&&(F={},H[X.id]=F);let Y=F[V];return Y===void 0&&(Y=f(l()),F[V]=Y),Y}function f(k){const O=[],X=[],z=[];for(let V=0;V<t;V++)O[V]=0,X[V]=0,z[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:X,attributeDivisors:z,object:k,attributes:{},index:null}}function d(k,O,X,z){const V=s.attributes,b=O.attributes;let y=0;const H=X.getAttributes();for(const F in H)if(H[F].location>=0){const K=V[F];let ye=b[F];if(ye===void 0&&(F==="instanceMatrix"&&k.instanceMatrix&&(ye=k.instanceMatrix),F==="instanceColor"&&k.instanceColor&&(ye=k.instanceColor)),K===void 0||K.attribute!==ye||ye&&K.data!==ye.data)return!0;y++}return s.attributesNum!==y||s.index!==z}function m(k,O,X,z){const V={},b=O.attributes;let y=0;const H=X.getAttributes();for(const F in H)if(H[F].location>=0){let K=b[F];K===void 0&&(F==="instanceMatrix"&&k.instanceMatrix&&(K=k.instanceMatrix),F==="instanceColor"&&k.instanceColor&&(K=k.instanceColor));const ye={};ye.attribute=K,K&&K.data&&(ye.data=K.data),V[F]=ye,y++}s.attributes=V,s.attributesNum=y,s.index=z}function x(){const k=s.newAttributes;for(let O=0,X=k.length;O<X;O++)k[O]=0}function g(k){p(k,0)}function p(k,O){const X=s.newAttributes,z=s.enabledAttributes,V=s.attributeDivisors;X[k]=1,z[k]===0&&(n.enableVertexAttribArray(k),z[k]=1),V[k]!==O&&(n.vertexAttribDivisor(k,O),V[k]=O)}function R(){const k=s.newAttributes,O=s.enabledAttributes;for(let X=0,z=O.length;X<z;X++)O[X]!==k[X]&&(n.disableVertexAttribArray(X),O[X]=0)}function C(k,O,X,z,V,b,y){y===!0?n.vertexAttribIPointer(k,O,X,V,b):n.vertexAttribPointer(k,O,X,z,V,b)}function M(k,O,X,z){x();const V=z.attributes,b=X.getAttributes(),y=O.defaultAttributeValues;for(const H in b){const F=b[H];if(F.location>=0){let Y=V[H];if(Y===void 0&&(H==="instanceMatrix"&&k.instanceMatrix&&(Y=k.instanceMatrix),H==="instanceColor"&&k.instanceColor&&(Y=k.instanceColor)),Y!==void 0){const K=Y.normalized,ye=Y.itemSize,he=e.get(Y);if(he===void 0)continue;const nt=he.buffer,$e=he.type,et=he.bytesPerElement,j=$e===n.INT||$e===n.UNSIGNED_INT||Y.gpuType===ao;if(Y.isInterleavedBufferAttribute){const ne=Y.data,xe=ne.stride,ze=Y.offset;if(ne.isInstancedInterleavedBuffer){for(let we=0;we<F.locationSize;we++)p(F.location+we,ne.meshPerAttribute);k.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let we=0;we<F.locationSize;we++)g(F.location+we);n.bindBuffer(n.ARRAY_BUFFER,nt);for(let we=0;we<F.locationSize;we++)C(F.location+we,ye/F.locationSize,$e,K,xe*et,(ze+ye/F.locationSize*we)*et,j)}else{if(Y.isInstancedBufferAttribute){for(let ne=0;ne<F.locationSize;ne++)p(F.location+ne,Y.meshPerAttribute);k.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ne=0;ne<F.locationSize;ne++)g(F.location+ne);n.bindBuffer(n.ARRAY_BUFFER,nt);for(let ne=0;ne<F.locationSize;ne++)C(F.location+ne,ye/F.locationSize,$e,K,ye*et,ye/F.locationSize*ne*et,j)}}else if(y!==void 0){const K=y[H];if(K!==void 0)switch(K.length){case 2:n.vertexAttrib2fv(F.location,K);break;case 3:n.vertexAttrib3fv(F.location,K);break;case 4:n.vertexAttrib4fv(F.location,K);break;default:n.vertexAttrib1fv(F.location,K)}}}}R()}function w(){T();for(const k in i){const O=i[k];for(const X in O){const z=O[X];for(const V in z){const b=z[V];for(const y in b)u(b[y].object),delete b[y];delete z[V]}}delete i[k]}}function E(k){if(i[k.id]===void 0)return;const O=i[k.id];for(const X in O){const z=O[X];for(const V in z){const b=z[V];for(const y in b)u(b[y].object),delete b[y];delete z[V]}}delete i[k.id]}function P(k){for(const O in i){const X=i[O];for(const z in X){const V=X[z];if(V[k.id]===void 0)continue;const b=V[k.id];for(const y in b)u(b[y].object),delete b[y];delete V[k.id]}}}function v(k){for(const O in i){const X=i[O],z=k.isInstancedMesh===!0?k.id:0,V=X[z];if(V!==void 0){for(const b in V){const y=V[b];for(const H in y)u(y[H].object),delete y[H];delete V[b]}delete X[z],Object.keys(X).length===0&&delete i[O]}}}function T(){L(),a=!0,s!==r&&(s=r,c(s.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:T,resetDefaultState:L,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:v,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:g,disableUnusedAttributes:R}}function cm(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let f=0;for(let d=0;d<u;d++)f+=c[d];t.update(f,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function um(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==en&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const v=P===pn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Gt&&P!==un&&!v&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Fe("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),R=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),C=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:R,maxVaryings:C,maxFragmentUniforms:M,maxSamples:w,samples:E}}function hm(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Mn,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||i!==0||r;return r=f,i=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const m=h.clippingPlanes,x=h.clipIntersection,g=h.clipShadows,p=n.get(h);if(!r||m===null||m.length===0||s&&!g)s?u(null):c();else{const R=s?0:i,C=R*4;let M=p.clippingState||null;l.value=M,M=u(m,f,C,d);for(let w=0;w!==C;++w)M[w]=t[w];p.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=R}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,d,m){const x=h!==null?h.length:0;let g=null;if(x!==0){if(g=l.value,m!==!0||g===null){const p=d+x*4,R=f.matrixWorldInverse;o.getNormalMatrix(R),(g===null||g.length<p)&&(g=new Float32Array(p));for(let C=0,M=d;C!==x;++C,M+=4)a.copy(h[C]).applyMatrix4(R,o),a.normal.toArray(g,M),g[M+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}const yi=4,fm=6,dm=20,pm=256,Bi=new us,yl=new Ye;let qs=null,Ys=0,$s=0,Zs=!1;const mm=new I,qn=new I;class wl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=mm}=s;qs=this._renderer.getRenderTarget(),Ys=this._renderer.getActiveCubeFace(),$s=this._renderer.getActiveMipmapLevel(),Zs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Al(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(qs,Ys,$s),this._renderer.xr.enabled=Zs,e.scissorTest=!1,vi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===jn||e.mapping===Ai?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),qs=this._renderer.getRenderTarget(),Ys=this._renderer.getActiveCubeFace(),$s=this._renderer.getActiveMipmapLevel(),Zs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:pn,format:en,colorSpace:Kr,depthBuffer:!1},r=El(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=El(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=gm(s)),this._blurMaterial=vm(s,e,t),this._ggxMaterial=_m(s,e,t)}return r}_compileMaterial(e){const t=new nn(new Ft,e);this._renderer.compile(t,Bi)}_sceneToCubeUV(e,t,i,r,s){const l=new Yt(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(yl),h.toneMapping=fn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new nn(new ti,new vo({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let p=!1;const R=e.background;R?R.isColor&&(g.color.copy(R),e.background=null,p=!0):(g.color.copy(yl),p=!0);for(let C=0;C<6;C++){const M=C%3;M===0?(l.up.set(0,c[C],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[C],s.y,s.z)):M===1?(l.up.set(0,0,c[C]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[C],s.z)):(l.up.set(0,c[C],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[C]));const w=this._cubeSize;vi(r,M*w,C>2?w:0,w,w),h.setRenderTarget(r),p&&h.render(x,l),h.render(e,l)}h.toneMapping=d,h.autoClear=f,e.background=R}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===jn||e.mapping===Ai;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Al());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;vi(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Bi)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),f=c*1.25,d=h*f,{_lodMax:m}=this,x=this._sizeLods[i],g=3*x*(i>m-yi?i-m+yi:0),p=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=m-t,vi(s,g,p,3*x,2*x),r.setRenderTarget(s),r.render(o,Bi),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-i,vi(e,g,p,3*x,2*x),r.setRenderTarget(e),r.render(o,Bi)}_blur(e,t,i,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,t,i,r,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;const u=this._sizeLods[r],h=3*u*(r>this._lodMax-yi?r-this._lodMax+yi:0),f=4*(this._cubeSize-u);vi(t,h,f,3*u,2*u),a.setRenderTarget(t),a.render(l,Bi)}}function gm(n){const e=[],t=[];let i=n;const r=n-yi+1+fm;for(let s=0;s<r;s++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],h=6,f=6,d=3,m=new Float32Array(d*f*h),x=new Float32Array(d*f*h);for(let p=0;p<h;p++){const R=p%3*2/3-1,C=p>2?0:-1,M=[R,C,0,R+2/3,C,0,R+2/3,C+1,0,R,C,0,R+2/3,C+1,0,R,C+1,0];m.set(M,d*f*p);for(let w=0;w<f;w++){const E=u[w*2]*2-1,P=u[w*2+1]*2-1;p===0?qn.set(1,P,E):p===1?qn.set(-E,1,-P):p===2?qn.set(-E,P,1):p===3?qn.set(-1,P,-E):p===4?qn.set(-E,-1,P):qn.set(E,P,-1),qn.toArray(x,(p*f+w)*d)}}const g=new Ft;g.setAttribute("position",new An(m,d)),g.setAttribute("outputDirection",new An(x,d)),t.push(new nn(g,null)),i>yi&&i--}return{lodMeshes:t,sizeLods:e}}function El(n,e,t){const i=new tn(n,e,t);return i.texture.mapping=os,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function vi(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function _m(n,e,t){return new mn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:pm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:hs(),fragmentShader:`

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
		`,blending:wn,depthTest:!1,depthWrite:!1})}function vm(n,e,t){return new mn({name:"SphericalGaussianBlur",defines:{SAMPLES:dm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:hs(),fragmentShader:`

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
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Al(){return new mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:hs(),fragmentShader:`

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
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Tl(){return new mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function hs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Xc extends tn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Rc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ti(5,5,5),s=new mn({name:"CubemapFromEquirect",uniforms:Ri(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:zt,blending:wn});s.uniforms.tEquirect.value=t;const a=new nn(r,s),o=t.minFilter;return t.minFilter===Zn&&(t.minFilter=Dt),new Mf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function xm(n){let e=new WeakMap,t=new WeakMap,i=null;function r(f,d=!1){return f==null?null:d?a(f):s(f)}function s(f){if(f&&f.isTexture){const d=f.mapping;if(d===ms||d===gs)if(e.has(f)){const m=e.get(f).texture;return o(m,f.mapping)}else{const m=f.image;if(m&&m.height>0){const x=new Xc(m.height);return x.fromEquirectangularTexture(n,f),e.set(f,x),f.addEventListener("dispose",c),o(x.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const d=f.mapping,m=d===ms||d===gs,x=d===jn||d===Ai;if(m||x){let g=t.get(f);const p=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return i===null&&(i=new wl(n)),g=m?i.fromEquirectangular(f,g):i.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{const R=f.image;return m&&R&&R.height>0||x&&R&&l(R)?(i===null&&(i=new wl(n)),g=m?i.fromEquirectangular(f):i.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",u),g.texture):null}}}return f}function o(f,d){return d===ms?f.mapping=jn:d===gs&&(f.mapping=Ai),f}function l(f){let d=0;const m=6;for(let x=0;x<m;x++)f[x]!==void 0&&d++;return d===m}function c(f){const d=f.target;d.removeEventListener("dispose",c);const m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function u(f){const d=f.target;d.removeEventListener("dispose",u);const m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function Sm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&wi("WebGLRenderer: "+i+" extension not supported."),r}}}function bm(n,e,t,i){const r={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const m in f.attributes)e.remove(f.attributes[m]);f.removeEventListener("dispose",a),delete r[f.id];const d=s.get(f);d&&(e.remove(d),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const d in f)e.update(f[d],n.ARRAY_BUFFER)}function c(h){const f=[],d=h.index,m=h.attributes.position;let x=0;if(m===void 0)return;if(d!==null){const R=d.array;x=d.version;for(let C=0,M=R.length;C<M;C+=3){const w=R[C+0],E=R[C+1],P=R[C+2];f.push(w,E,E,P,P,w)}}else{const R=m.array;x=m.version;for(let C=0,M=R.length/3-1;C<M;C+=3){const w=C+0,E=C+1,P=C+2;f.push(w,E,E,P,P,w)}}const g=new(m.count>=65535?Ac:Ec)(f,1);g.version=x;const p=s.get(h);p&&e.remove(p),s.set(h,g)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Mm(n,e,t){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,f){n.drawElements(i,f,s,h*a),t.update(f,i,1)}function c(h,f,d){d!==0&&(n.drawElementsInstanced(i,f,s,h*a,d),t.update(f,i,d))}function u(h,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,h,0,d);let x=0;for(let g=0;g<d;g++)x+=f[g];t.update(x,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function ym(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:je("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function wm(n,e,t){const i=new WeakMap,r=new mt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(o);if(f===void 0||f.count!==h){let L=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",L)};var d=L;f!==void 0&&f.texture.dispose();const m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],R=o.morphAttributes.normal||[],C=o.morphAttributes.color||[];let M=0;m===!0&&(M=1),x===!0&&(M=2),g===!0&&(M=3);let w=o.attributes.position.count*M,E=1;w>e.maxTextureSize&&(E=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const P=new Float32Array(w*E*4*h),v=new yc(P,w,E,h);v.type=un,v.needsUpdate=!0;const T=M*4;for(let k=0;k<h;k++){const O=p[k],X=R[k],z=C[k],V=w*E*4*k;for(let b=0;b<O.count;b++){const y=b*T;m===!0&&(r.fromBufferAttribute(O,b),P[V+y+0]=r.x,P[V+y+1]=r.y,P[V+y+2]=r.z,P[V+y+3]=0),x===!0&&(r.fromBufferAttribute(X,b),P[V+y+4]=r.x,P[V+y+5]=r.y,P[V+y+6]=r.z,P[V+y+7]=0),g===!0&&(r.fromBufferAttribute(z,b),P[V+y+8]=r.x,P[V+y+9]=r.y,P[V+y+10]=r.z,P[V+y+11]=z.itemSize===4?r.w:1)}}f={count:h,texture:v,size:new fe(w,E)},i.set(o,f),o.addEventListener("dispose",L)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const x=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function Em(n,e,t,i,r){let s=new WeakMap;function a(c){const u=r.render.frame,h=c.geometry,f=e.get(c,h);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return f}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const Am={[oc]:"LINEAR_TONE_MAPPING",[lc]:"REINHARD_TONE_MAPPING",[cc]:"CINEON_TONE_MAPPING",[uc]:"ACES_FILMIC_TONE_MAPPING",[fc]:"AGX_TONE_MAPPING",[dc]:"NEUTRAL_TONE_MAPPING",[hc]:"CUSTOM_TONE_MAPPING"};function Tm(n,e,t,i,r,s){const a=new tn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new Ft;c.setAttribute("position",new Rt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Rt([0,2,0,0,2,0],2));const u=new mf({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new nn(c,u),f=new us(-1,1,1,-1,0,1);let d=null,m=null,x=!1,g,p=null,R=[],C=!1;this.setSize=function(M,w){a.setSize(M,w),o!==null&&o.setSize(M,w),l!==null&&l.setSize(M,w);for(let E=0;E<R.length;E++){const P=R[E];P.setSize&&P.setSize(M,w)}},this.setEffects=function(M){R=M,C=R.length>0&&R[0].isRenderPass===!0;const w=a.width,E=a.height;R.length>0&&o===null&&(o=new tn(w,E,{type:pn,depthBuffer:!1,stencilBuffer:!1}),l=new tn(w,E,{type:pn,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<R.length;P++){const v=R[P];v.setSize&&v.setSize(w,E)}},this.begin=function(M,w){if(x||M.toneMapping===fn&&R.length===0)return!1;if(p=w,w!==null){const E=w.width,P=w.height;(a.width!==E||a.height!==P)&&this.setSize(E,P)}return C===!1&&M.setRenderTarget(a),g=M.toneMapping,M.toneMapping=fn,!0},this.hasRenderPass=function(){return C},this.end=function(M,w){M.toneMapping=g,x=!0;let E=a,P=o;for(let v=0;v<R.length;v++){const T=R[v];T.enabled!==!1&&(T.render(M,P,E,w),T.needsSwap!==!1&&(E=P,P=P===o?l:o))}if(d!==M.outputColorSpace||m!==M.toneMapping){d=M.outputColorSpace,m=M.toneMapping,u.defines={},Qe.getTransfer(d)===ot&&(u.defines.SRGB_TRANSFER="");const v=Am[m];v&&(u.defines[v]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=E.texture,M.setRenderTarget(p),M.render(h,f),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const qc=new Nt,Ja=new er(1,1),Yc=new yc,$c=new uh,Zc=new Rc,Rl=[],Cl=[],Pl=new Float32Array(16),Ll=new Float32Array(9),Dl=new Float32Array(4);function Ii(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Rl[r];if(s===void 0&&(s=new Float32Array(r),Rl[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function bt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Mt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function fs(n,e){let t=Cl[e];t===void 0&&(t=new Int32Array(e),Cl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Rm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Cm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;n.uniform2fv(this.addr,e),Mt(t,e)}}function Pm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;n.uniform3fv(this.addr,e),Mt(t,e)}}function Lm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;n.uniform4fv(this.addr,e),Mt(t,e)}}function Dm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Mt(t,e)}else{if(bt(t,i))return;Dl.set(i),n.uniformMatrix2fv(this.addr,!1,Dl),Mt(t,i)}}function Im(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Mt(t,e)}else{if(bt(t,i))return;Ll.set(i),n.uniformMatrix3fv(this.addr,!1,Ll),Mt(t,i)}}function km(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Mt(t,e)}else{if(bt(t,i))return;Pl.set(i),n.uniformMatrix4fv(this.addr,!1,Pl),Mt(t,i)}}function Nm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Um(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;n.uniform2iv(this.addr,e),Mt(t,e)}}function zm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;n.uniform3iv(this.addr,e),Mt(t,e)}}function Fm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;n.uniform4iv(this.addr,e),Mt(t,e)}}function Om(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Bm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;n.uniform2uiv(this.addr,e),Mt(t,e)}}function Vm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;n.uniform3uiv(this.addr,e),Mt(t,e)}}function Hm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;n.uniform4uiv(this.addr,e),Mt(t,e)}}function Gm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Ja.compareFunction=t.isReversedDepthBuffer()?po:fo,s=Ja):s=qc,t.setTexture2D(e||s,r)}function Wm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||$c,r)}function Xm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Zc,r)}function qm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Yc,r)}function Ym(n){switch(n){case 5126:return Rm;case 35664:return Cm;case 35665:return Pm;case 35666:return Lm;case 35674:return Dm;case 35675:return Im;case 35676:return km;case 5124:case 35670:return Nm;case 35667:case 35671:return Um;case 35668:case 35672:return zm;case 35669:case 35673:return Fm;case 5125:return Om;case 36294:return Bm;case 36295:return Vm;case 36296:return Hm;case 35678:case 36198:case 36298:case 36306:case 35682:return Gm;case 35679:case 36299:case 36307:return Wm;case 35680:case 36300:case 36308:case 36293:return Xm;case 36289:case 36303:case 36311:case 36292:return qm}}function $m(n,e){n.uniform1fv(this.addr,e)}function Zm(n,e){const t=Ii(e,this.size,2);n.uniform2fv(this.addr,t)}function Km(n,e){const t=Ii(e,this.size,3);n.uniform3fv(this.addr,t)}function Jm(n,e){const t=Ii(e,this.size,4);n.uniform4fv(this.addr,t)}function Qm(n,e){const t=Ii(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function jm(n,e){const t=Ii(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function eg(n,e){const t=Ii(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function tg(n,e){n.uniform1iv(this.addr,e)}function ng(n,e){n.uniform2iv(this.addr,e)}function ig(n,e){n.uniform3iv(this.addr,e)}function rg(n,e){n.uniform4iv(this.addr,e)}function sg(n,e){n.uniform1uiv(this.addr,e)}function ag(n,e){n.uniform2uiv(this.addr,e)}function og(n,e){n.uniform3uiv(this.addr,e)}function lg(n,e){n.uniform4uiv(this.addr,e)}function cg(n,e,t){const i=this.cache,r=e.length,s=fs(t,r);bt(i,s)||(n.uniform1iv(this.addr,s),Mt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=Ja:a=qc;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function ug(n,e,t){const i=this.cache,r=e.length,s=fs(t,r);bt(i,s)||(n.uniform1iv(this.addr,s),Mt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||$c,s[a])}function hg(n,e,t){const i=this.cache,r=e.length,s=fs(t,r);bt(i,s)||(n.uniform1iv(this.addr,s),Mt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Zc,s[a])}function fg(n,e,t){const i=this.cache,r=e.length,s=fs(t,r);bt(i,s)||(n.uniform1iv(this.addr,s),Mt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Yc,s[a])}function dg(n){switch(n){case 5126:return $m;case 35664:return Zm;case 35665:return Km;case 35666:return Jm;case 35674:return Qm;case 35675:return jm;case 35676:return eg;case 5124:case 35670:return tg;case 35667:case 35671:return ng;case 35668:case 35672:return ig;case 35669:case 35673:return rg;case 5125:return sg;case 36294:return ag;case 36295:return og;case 36296:return lg;case 35678:case 36198:case 36298:case 36306:case 35682:return cg;case 35679:case 36299:case 36307:return ug;case 35680:case 36300:case 36308:case 36293:return hg;case 36289:case 36303:case 36311:case 36292:return fg}}class pg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Ym(t.type)}}class mg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=dg(t.type)}}class gg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Ks=/(\w+)(\])?(\[|\.)?/g;function Il(n,e){n.seq.push(e),n.map[e.id]=e}function _g(n,e,t){const i=n.name,r=i.length;for(Ks.lastIndex=0;;){const s=Ks.exec(i),a=Ks.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Il(t,c===void 0?new pg(o,n,e):new mg(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new gg(o),Il(t,h)),t=h}}}class Wr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);_g(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function kl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const vg=37297;let xg=0;function Sg(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Nl=new He;function bg(n){Qe._getMatrix(Nl,Qe.workingColorSpace,n);const e=`mat3( ${Nl.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(n)){case Jr:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Ul(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Sg(n.getShaderSource(e),o)}else return s}function Mg(n,e){const t=bg(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const yg={[oc]:"Linear",[lc]:"Reinhard",[cc]:"Cineon",[uc]:"ACESFilmic",[fc]:"AgX",[dc]:"Neutral",[hc]:"Custom"};function wg(n,e){const t=yg[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const zr=new I;function Eg(){Qe.getLuminanceCoefficients(zr);const n=zr.x.toFixed(4),e=zr.y.toFixed(4),t=zr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ag(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Wi).join(`
`)}function Tg(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Rg(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Wi(n){return n!==""}function zl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Fl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Cg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qa(n){return n.replace(Cg,Lg)}const Pg=new Map;function Lg(n,e){let t=Xe[e];if(t===void 0){const i=Pg.get(e);if(i!==void 0)t=Xe[i],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Qa(t)}const Dg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ol(n){return n.replace(Dg,Ig)}function Ig(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Bl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const kg={[Fr]:"SHADOWMAP_TYPE_PCF",[Hi]:"SHADOWMAP_TYPE_VSM"};function Ng(n){return kg[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Ug={[jn]:"ENVMAP_TYPE_CUBE",[Ai]:"ENVMAP_TYPE_CUBE",[os]:"ENVMAP_TYPE_CUBE_UV"};function zg(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Ug[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Fg={[Ai]:"ENVMAP_MODE_REFRACTION"};function Og(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Fg[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Bg={[so]:"ENVMAP_BLENDING_MULTIPLY",[Vu]:"ENVMAP_BLENDING_MIX",[Hu]:"ENVMAP_BLENDING_ADD"};function Vg(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Bg[n.combine]||"ENVMAP_BLENDING_NONE"}function Hg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Gg(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Ng(t),c=zg(t),u=Og(t),h=Vg(t),f=Hg(t),d=Ag(t),m=Tg(s),x=r.createProgram();let g,p,R=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Wi).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Wi).join(`
`),p.length>0&&(p+=`
`)):(g=[Bl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wi).join(`
`),p=[Bl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==fn?"#define TONE_MAPPING":"",t.toneMapping!==fn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==fn?wg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,Mg("linearToOutputTexel",t.outputColorSpace),Eg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Wi).join(`
`)),a=Qa(a),a=zl(a,t),a=Fl(a,t),o=Qa(o),o=zl(o,t),o=Fl(o,t),a=Ol(a),o=Ol(o),t.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Bo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Bo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const C=R+g+a,M=R+p+o,w=kl(r,r.VERTEX_SHADER,C),E=kl(r,r.FRAGMENT_SHADER,M);r.attachShader(x,w),r.attachShader(x,E),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function P(k){if(n.debug.checkShaderErrors){const O=r.getProgramInfoLog(x)||"",X=r.getShaderInfoLog(w)||"",z=r.getShaderInfoLog(E)||"",V=O.trim(),b=X.trim(),y=z.trim();let H=!0,F=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,w,E);else{const Y=Ul(r,w,"vertex"),K=Ul(r,E,"fragment");je("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+V+`
`+Y+`
`+K)}else V!==""?Fe("WebGLProgram: Program Info Log:",V):(b===""||y==="")&&(F=!1);F&&(k.diagnostics={runnable:H,programLog:V,vertexShader:{log:b,prefix:g},fragmentShader:{log:y,prefix:p}})}r.deleteShader(w),r.deleteShader(E),v=new Wr(r,x),T=Rg(r,x)}let v;this.getUniforms=function(){return v===void 0&&P(this),v};let T;this.getAttributes=function(){return T===void 0&&P(this),T};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(x,vg)),L},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=xg++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=E,this}let Wg=0;class Xg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new qg(e),t.set(e,i)),i}}class qg{constructor(e){this.id=Wg++,this.code=e,this.usedTimes=0}}function Yg(n){return n===ei||n===$r||n===Zr}function $g(n,e,t,i,r,s){const a=new go,o=new Xg,l=new Set,c=[],u=new Map,h=i.logarithmicDepthBuffer;let f=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(v){return l.add(v),v===0?"uv":`uv${v}`}function x(v,T,L,k,O,X){const z=k.fog,V=O.geometry,b=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?k.environment:null,y=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,H=e.get(v.envMap||b,y),F=H&&H.mapping===os?H.image.height:null,Y=d[v.type];v.precision!==null&&(f=i.getMaxPrecision(v.precision),f!==v.precision&&Fe("WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const K=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ye=K!==void 0?K.length:0;let he=0;V.morphAttributes.position!==void 0&&(he=1),V.morphAttributes.normal!==void 0&&(he=2),V.morphAttributes.color!==void 0&&(he=3);let nt,$e,et,j;if(Y){const ht=cn[Y];nt=ht.vertexShader,$e=ht.fragmentShader}else{nt=v.vertexShader,$e=v.fragmentShader;const ht=o.getVertexShaderStage(v),rt=o.getFragmentShaderStage(v);o.update(v,ht,rt),et=ht.id,j=rt.id}const ne=n.getRenderTarget(),xe=n.state.buffers.depth.getReversed(),ze=O.isInstancedMesh===!0,we=O.isBatchedMesh===!0,Oe=!!v.map,at=!!v.matcap,ie=!!H,se=!!v.aoMap,ae=!!v.lightMap,oe=!!v.bumpMap&&v.wireframe===!1,ue=!!v.normalMap,Ne=!!v.displacementMap,ke=!!v.emissiveMap,Be=!!v.metalnessMap,Ve=!!v.roughnessMap,D=v.anisotropy>0,it=v.clearcoat>0,Ze=v.dispersion>0,A=v.retroreflectivity>0,_=v.iridescence>0,B=v.sheen>0,q=v.transmission>0,J=D&&!!v.anisotropyMap,le=it&&!!v.clearcoatMap,ce=it&&!!v.clearcoatNormalMap,Q=it&&!!v.clearcoatRoughnessMap,te=_&&!!v.iridescenceMap,de=_&&!!v.iridescenceThicknessMap,Le=B&&!!v.sheenColorMap,_e=B&&!!v.sheenRoughnessMap,pe=!!v.specularMap,De=!!v.specularColorMap,Ue=!!v.specularIntensityMap,Ge=q&&!!v.transmissionMap,U=q&&!!v.thicknessMap,me=!!v.gradientMap,ee=!!v.alphaMap,ge=v.alphaTest>0,Me=!!v.alphaHash,re=!!v.extensions;let Ie=fn;v.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Ie=n.toneMapping);const Ce={shaderID:Y,shaderType:v.type,shaderName:v.name,vertexShader:nt,fragmentShader:$e,defines:v.defines,customVertexShaderID:et,customFragmentShaderID:j,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:we,batchingColor:we&&O._colorsTexture!==null,instancing:ze,instancingColor:ze&&O.instanceColor!==null,instancingMorph:ze&&O.morphTexture!==null,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Qe.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Oe,matcap:at,envMap:ie,envMapMode:ie&&H.mapping,envMapCubeUVHeight:F,aoMap:se,lightMap:ae,bumpMap:oe,normalMap:ue,displacementMap:Ne,emissiveMap:ke,normalMapObjectSpace:ue&&v.normalMapType===Xu,normalMapTangentSpace:ue&&v.normalMapType===Wa,packedNormalMap:ue&&v.normalMapType===Wa&&Yg(v.normalMap.format),metalnessMap:Be,roughnessMap:Ve,anisotropy:D,anisotropyMap:J,clearcoat:it,clearcoatMap:le,clearcoatNormalMap:ce,clearcoatRoughnessMap:Q,dispersion:Ze,retroreflection:A,iridescence:_,iridescenceMap:te,iridescenceThicknessMap:de,sheen:B,sheenColorMap:Le,sheenRoughnessMap:_e,specularMap:pe,specularColorMap:De,specularIntensityMap:Ue,transmission:q,transmissionMap:Ge,thicknessMap:U,gradientMap:me,opaque:v.transparent===!1&&v.blending===qi&&v.alphaToCoverage===!1,alphaMap:ee,alphaTest:ge,alphaHash:Me,combine:v.combine,mapUv:Oe&&m(v.map.channel),aoMapUv:se&&m(v.aoMap.channel),lightMapUv:ae&&m(v.lightMap.channel),bumpMapUv:oe&&m(v.bumpMap.channel),normalMapUv:ue&&m(v.normalMap.channel),displacementMapUv:Ne&&m(v.displacementMap.channel),emissiveMapUv:ke&&m(v.emissiveMap.channel),metalnessMapUv:Be&&m(v.metalnessMap.channel),roughnessMapUv:Ve&&m(v.roughnessMap.channel),anisotropyMapUv:J&&m(v.anisotropyMap.channel),clearcoatMapUv:le&&m(v.clearcoatMap.channel),clearcoatNormalMapUv:ce&&m(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&m(v.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&m(v.iridescenceMap.channel),iridescenceThicknessMapUv:de&&m(v.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&m(v.sheenColorMap.channel),sheenRoughnessMapUv:_e&&m(v.sheenRoughnessMap.channel),specularMapUv:pe&&m(v.specularMap.channel),specularColorMapUv:De&&m(v.specularColorMap.channel),specularIntensityMapUv:Ue&&m(v.specularIntensityMap.channel),transmissionMapUv:Ge&&m(v.transmissionMap.channel),thicknessMapUv:U&&m(v.thicknessMap.channel),alphaMapUv:ee&&m(v.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(ue||D),vertexNormals:!!V.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!V.attributes.uv&&(Oe||ee),fog:!!z,useFog:v.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||V.attributes.normal===void 0&&ue===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:xe,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:he,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:X.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ie,decodeVideoTexture:Oe&&v.map.isVideoTexture===!0&&Qe.getTransfer(v.map.colorSpace)===ot,decodeVideoTextureEmissive:ke&&v.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(v.emissiveMap.colorSpace)===ot,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===jt,flipSided:v.side===zt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:re&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&v.extensions.multiDraw===!0||we)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ce.vertexUv1s=l.has(1),Ce.vertexUv2s=l.has(2),Ce.vertexUv3s=l.has(3),l.clear(),Ce}function g(v){const T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(const L in v.defines)T.push(L),T.push(v.defines[L]);return v.isRawShaderMaterial===!1&&(p(T,v),R(T,v),T.push(n.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function p(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numSunLights),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numSunLightShadows),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function R(v,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function C(v){const T=d[v.type];let L;if(T){const k=cn[T];L=ff.clone(k.uniforms)}else L=v.uniforms;return L}function M(v,T){let L=u.get(T);return L!==void 0?++L.usedTimes:(L=new Gg(n,T,v,r),c.push(L),u.set(T,L)),L}function w(v){if(--v.usedTimes===0){const T=c.indexOf(v);c[T]=c[c.length-1],c.pop(),u.delete(v.cacheKey),v.destroy()}}function E(v){o.remove(v)}function P(){o.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:C,acquireProgram:M,releaseProgram:w,releaseShaderCache:E,programs:c,dispose:P}}function Zg(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function Kg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Vl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Hl(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function o(f,d,m,x,g,p){let R=n[e];return R===void 0?(R={id:f.id,object:f,geometry:d,material:m,materialVariant:a(f),groupOrder:x,renderOrder:f.renderOrder,z:g,group:p},n[e]=R):(R.id=f.id,R.object=f,R.geometry=d,R.material=m,R.materialVariant=a(f),R.groupOrder=x,R.renderOrder=f.renderOrder,R.z=g,R.group=p),e++,R}function l(f,d,m,x,g,p,R){R.reversedDepth===!0&&(g=-g);const C=o(f,d,m,x,g,p);m.transmission>0?i.push(C):m.transparent===!0?r.push(C):t.push(C)}function c(f,d,m,x,g,p){const R=o(f,d,m,x,g,p);m.transmission>0?i.unshift(R):m.transparent===!0?r.unshift(R):t.unshift(R)}function u(f,d){t.length>1&&t.sort(f||Kg),i.length>1&&i.sort(d||Vl),r.length>1&&r.sort(d||Vl)}function h(){for(let f=e,d=n.length;f<d;f++){const m=n[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:h,sort:u}}function Jg(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Hl,n.set(i,[a])):r>=s.length?(a=new Hl,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Qg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new I,color:new Ye};break;case"SpotLight":t={position:new I,direction:new I,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new I,halfWidth:new I,halfHeight:new I};break}return n[e.id]=t,t}}}function jg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let e0=0;function t0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function n0(n){const e=new Qg,t=jg(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new I);const r=new I,s=new dt,a=new dt;function o(c){let u=0,h=0,f=0;for(let O=0;O<9;O++)i.probe[O].set(0,0,0);let d=0,m=0,x=0,g=0,p=0,R=0,C=0,M=0,w=0,E=0,P=0,v=0,T=0,L=0;c.sort(t0);for(let O=0,X=c.length;O<X;O++){const z=c[O],V=z.color,b=z.intensity,y=z.distance;let H=null;if(z.shadow&&z.shadow.map&&(z.shadow.map.texture.format===ei?H=z.shadow.map.texture:H=z.shadow.map.depthTexture||z.shadow.map.texture),z.isAmbientLight)u+=V.r*b,h+=V.g*b,f+=V.b*b;else if(z.isLightProbe){for(let F=0;F<9;F++)i.probe[F].addScaledVector(z.sh.coefficients[F],b);L++}else if(z.isSunLight){const F=e.get(z);if(F.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){const Y=z.shadow,K=t.get(z);K.shadowIntensity=Y.intensity,K.shadowBias=Y.bias,K.shadowNormalBias=Y.normalBias,K.shadowRadius=Y.radius,K.shadowMapSize.copy(Y.mapSize).multiply(Y.getFrameExtents()),i.sunShadow[m]=K,i.sunShadowMap[m]=H;const ye=Y.getViewportCount();for(let he=0;he<ye;he++)i.sunShadowMatrix[x+he]=Y.getMatrix(he),i.sunShadowCascade[x+he]=Y._cascadeData[he];x+=ye,m++}i.sun[d]=F,d++}else if(z.isDirectionalLight){const F=e.get(z);if(F.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){const Y=z.shadow,K=t.get(z);K.shadowIntensity=Y.intensity,K.shadowBias=Y.bias,K.shadowNormalBias=Y.normalBias,K.shadowRadius=Y.radius,K.shadowMapSize=Y.mapSize,i.directionalShadow[g]=K,i.directionalShadowMap[g]=H,i.directionalShadowMatrix[g]=z.shadow.matrix,w++}i.directional[g]=F,g++}else if(z.isSpotLight){const F=e.get(z);F.position.setFromMatrixPosition(z.matrixWorld),F.color.copy(V).multiplyScalar(b),F.distance=y,F.coneCos=Math.cos(z.angle),F.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),F.decay=z.decay,i.spot[R]=F;const Y=z.shadow;if(z.map&&(i.spotLightMap[v]=z.map,v++,Y.updateMatrices(z),z.castShadow&&T++),i.spotLightMatrix[R]=Y.matrix,z.castShadow){const K=t.get(z);K.shadowIntensity=Y.intensity,K.shadowBias=Y.bias,K.shadowNormalBias=Y.normalBias,K.shadowRadius=Y.radius,K.shadowMapSize=Y.mapSize,i.spotShadow[R]=K,i.spotShadowMap[R]=H,P++}R++}else if(z.isRectAreaLight){const F=e.get(z);F.color.copy(V).multiplyScalar(b),F.halfWidth.set(z.width*.5,0,0),F.halfHeight.set(0,z.height*.5,0),i.rectArea[C]=F,C++}else if(z.isPointLight){const F=e.get(z);if(F.color.copy(z.color).multiplyScalar(z.intensity),F.distance=z.distance,F.decay=z.decay,z.castShadow){const Y=z.shadow,K=t.get(z);K.shadowIntensity=Y.intensity,K.shadowBias=Y.bias,K.shadowNormalBias=Y.normalBias,K.shadowRadius=Y.radius,K.shadowMapSize=Y.mapSize,K.shadowCameraNear=Y.camera.near,K.shadowCameraFar=Y.camera.far,i.pointShadow[p]=K,i.pointShadowMap[p]=H,i.pointShadowMatrix[p]=z.shadow.matrix,E++}i.point[p]=F,p++}else if(z.isHemisphereLight){const F=e.get(z);F.skyColor.copy(z.color).multiplyScalar(b),F.groundColor.copy(z.groundColor).multiplyScalar(b),i.hemi[M]=F,M++}}C>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ve.LTC_FLOAT_1,i.rectAreaLTC2=ve.LTC_FLOAT_2):(i.rectAreaLTC1=ve.LTC_HALF_1,i.rectAreaLTC2=ve.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const k=i.hash;(k.sunLength!==d||k.directionalLength!==g||k.pointLength!==p||k.spotLength!==R||k.rectAreaLength!==C||k.hemiLength!==M||k.numSunShadows!==m||k.numDirectionalShadows!==w||k.numPointShadows!==E||k.numSpotShadows!==P||k.numSpotMaps!==v||k.numLightProbes!==L)&&(i.sun.length=d,i.directional.length=g,i.spot.length=R,i.rectArea.length=C,i.point.length=p,i.hemi.length=M,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=E,i.pointShadowMap.length=E,i.pointShadowMatrix.length=E,i.spotShadow.length=P,i.spotShadowMap.length=P,i.spotLightMatrix.length=P+v-T,i.spotLightMap.length=v,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=L,k.sunLength=d,k.directionalLength=g,k.pointLength=p,k.spotLength=R,k.rectAreaLength=C,k.hemiLength=M,k.numSunShadows=m,k.numDirectionalShadows=w,k.numPointShadows=E,k.numSpotShadows=P,k.numSpotMaps=v,k.numLightProbes=L,i.version=e0++)}function l(c,u){let h=0,f=0,d=0,m=0,x=0,g=0;const p=u.matrixWorldInverse;for(let R=0,C=c.length;R<C;R++){const M=c[R];if(M.isSunLight){const w=i.sun[h];w.direction.setFromMatrixPosition(M.matrixWorld),w.direction.transformDirection(p),h++}else if(M.isDirectionalLight){const w=i.directional[f];w.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(p),f++}else if(M.isSpotLight){const w=i.spot[m];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(p),w.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(p),m++}else if(M.isRectAreaLight){const w=i.rectArea[x];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(p),a.identity(),s.copy(M.matrixWorld),s.premultiply(p),a.extractRotation(s),w.halfWidth.set(M.width*.5,0,0),w.halfHeight.set(0,M.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),x++}else if(M.isPointLight){const w=i.point[d];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(p),d++}else if(M.isHemisphereLight){const w=i.hemi[g];w.direction.setFromMatrixPosition(M.matrixWorld),w.direction.transformDirection(p),g++}}}return{setup:o,setupView:l,state:i}}function Gl(n){const e=new n0(n),t=[],i=[],r=[];function s(f){h.camera=f,t.length=0,i.length=0,r.length=0}function a(f){t.push(f)}function o(f){i.push(f)}function l(f){r.push(f)}function c(){e.setup(t)}function u(f){e.setupView(t,f)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function i0(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Gl(n),e.set(r,[o])):s>=a.length?(o=new Gl(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const r0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,s0=`uniform sampler2D shadow_pass;
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
}`,a0=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],o0=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],Wl=new dt,Vi=new I,Js=new I;function l0(n,e,t){let i=new xo;const r=new fe,s=new fe,a=new mt,o=new _f,l=new vf,c={},u=t.maxTextureSize,h={[On]:zt,[zt]:On,[jt]:jt},f=new mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new fe},radius:{value:4}},vertexShader:r0,fragmentShader:s0}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const m=new Ft;m.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new nn(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fr;let p=this.type;this.render=function(E,P,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;this.type===Mu&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Fr);const T=n.getRenderTarget(),L=n.getActiveCubeFace(),k=n.getActiveMipmapLevel(),O=n.state;O.setBlending(wn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const X=p!==this.type;X&&P.traverse(function(z){z.material&&(Array.isArray(z.material)?z.material.forEach(V=>V.needsUpdate=!0):z.material.needsUpdate=!0)});for(let z=0,V=E.length;z<V;z++){const b=E[z],y=b.shadow;if(y===void 0){Fe("WebGLShadowMap:",b,"has no shadow.");continue}if(y.autoUpdate===!1&&y.needsUpdate===!1)continue;r.copy(y.mapSize);const H=y.getFrameExtents();r.multiply(H),s.copy(y.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/H.x),r.x=s.x*H.x,y.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/H.y),r.y=s.y*H.y,y.mapSize.y=s.y));const F=n.state.buffers.depth.getReversed();if(y.camera._reversedDepth=F,y.map===null||X===!0){if(y.map!==null&&(y.map.depthTexture!==null&&(y.map.depthTexture.dispose(),y.map.depthTexture=null),y.map.dispose()),this.type===Hi){if(b.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}y.map=new tn(r.x,r.y,{format:ei,type:pn,minFilter:Dt,magFilter:Dt,generateMipmaps:!1}),y.map.texture.name=b.name+".shadowMap",y.map.depthTexture=new er(r.x,r.y,un),y.map.depthTexture.name=b.name+".shadowMapDepth",y.map.depthTexture.format=Tn,y.map.depthTexture.compareFunction=null,y.map.depthTexture.minFilter=At,y.map.depthTexture.magFilter=At}else b.isPointLight?(y.map=new Xc(r.x),y.map.depthTexture=new Ch(r.x,dn)):(y.map=new tn(r.x,r.y),y.map.depthTexture=new er(r.x,r.y,dn)),y.map.depthTexture.name=b.name+".shadowMap",y.map.depthTexture.format=Tn,this.type===Fr?(y.map.depthTexture.compareFunction=F?po:fo,y.map.depthTexture.minFilter=Dt,y.map.depthTexture.magFilter=Dt):(y.map.depthTexture.compareFunction=null,y.map.depthTexture.minFilter=At,y.map.depthTexture.magFilter=At);y.camera.updateProjectionMatrix()}y.map.isWebGLCubeRenderTarget!==!0&&(y.map.width!==r.x||y.map.height!==r.y)&&y.map.setSize(r.x,r.y);const Y=y.map.isWebGLCubeRenderTarget?6:y.getViewportCount();b.isPointLight!==!0&&y.updateMatrices(b,v);for(let K=0;K<Y;K++){const ye=y.getCamera(K);if(b.isPointLight){const he=y.camera,nt=y.matrix,$e=b.distance||he.far;$e!==he.far&&(he.far=$e,he.updateProjectionMatrix()),Vi.setFromMatrixPosition(b.matrixWorld),he.position.copy(Vi),Js.copy(he.position),Js.add(a0[K]),he.up.copy(o0[K]),he.lookAt(Js),he.updateMatrixWorld(),nt.makeTranslation(-Vi.x,-Vi.y,-Vi.z),Wl.multiplyMatrices(he.projectionMatrix,he.matrixWorldInverse),y._frustum.setFromProjectionMatrix(Wl,he.coordinateSystem,he.reversedDepth)}if(y.map.isWebGLCubeRenderTarget)n.setRenderTarget(y.map,K),n.clear();else{K===0&&(n.setRenderTarget(y.map),n.clear());const he=y.getViewport(K);a.set(s.x*he.x,s.y*he.y,s.x*he.z,s.y*he.w),O.viewport(a)}i=y.getFrustum(K),M(P,v,ye,b,this.type)}y.isPointLightShadow!==!0&&this.type===Hi&&R(y,v),y.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(T,L,k)};function R(E,P){const v=e.update(x);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null?E.mapPass=new tn(r.x,r.y,{format:ei,type:pn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),f.uniforms.shadow_pass.value=E.map.depthTexture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(P,null,v,f,x,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(P,null,v,d,x,null)}function C(E,P,v,T){let L=null;const k=v.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(k!==void 0)L=k;else if(L=v.isPointLight===!0?l:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const O=L.uuid,X=P.uuid;let z=c[O];z===void 0&&(z={},c[O]=z);let V=z[X];V===void 0&&(V=L.clone(),z[X]=V,P.addEventListener("dispose",w)),L=V}if(L.visible=P.visible,L.wireframe=P.wireframe,T===Hi?L.side=P.shadowSide!==null?P.shadowSide:P.side:L.side=P.shadowSide!==null?P.shadowSide:h[P.side],L.alphaMap=P.alphaMap,L.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,L.map=P.map,L.clipShadows=P.clipShadows,L.clippingPlanes=P.clippingPlanes,L.clipIntersection=P.clipIntersection,L.displacementMap=P.displacementMap,L.displacementScale=P.displacementScale,L.displacementBias=P.displacementBias,L.wireframeLinewidth=P.wireframeLinewidth,L.linewidth=P.linewidth,v.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const O=n.properties.get(L);O.light=v}return L}function M(E,P,v,T,L){if(E.visible===!1)return;if(E.layers.test(P.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&L===Hi)&&(!E.frustumCulled||E.intersectsFrustum(i))){E.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,E.matrixWorld);const X=e.update(E),z=E.material;if(Array.isArray(z)){const V=X.groups;for(let b=0,y=V.length;b<y;b++){const H=V[b],F=z[H.materialIndex];if(F&&F.visible){const Y=C(E,F,T,L);E.onBeforeShadow(n,E,P,v,X,Y,H),n.renderBufferDirect(v,null,X,Y,E,H),E.onAfterShadow(n,E,P,v,X,Y,H)}}}else if(z.visible){const V=C(E,z,T,L);E.onBeforeShadow(n,E,P,v,X,V,null),n.renderBufferDirect(v,null,X,V,E,null),E.onAfterShadow(n,E,P,v,X,V,null)}}const O=E.children;for(let X=0,z=O.length;X<z;X++)M(O[X],P,v,T,L)}function w(E){E.target.removeEventListener("dispose",w);for(const v in c){const T=c[v],L=E.target.uuid;L in T&&(T[L].dispose(),delete T[L])}}}function c0(n,e){function t(){let U=!1;const me=new mt;let ee=null;const ge=new mt(0,0,0,0);return{setMask:function(Me){ee!==Me&&!U&&(n.colorMask(Me,Me,Me,Me),ee=Me)},setLocked:function(Me){U=Me},setClear:function(Me,re,Ie,Ce,ht){ht===!0&&(Me*=Ce,re*=Ce,Ie*=Ce),me.set(Me,re,Ie,Ce),ge.equals(me)===!1&&(n.clearColor(Me,re,Ie,Ce),ge.copy(me))},reset:function(){U=!1,ee=null,ge.set(-1,0,0,0)}}}function i(){let U=!1,me=!1,ee=null,ge=null,Me=null;return{setReversed:function(re){if(me!==re){const Ie=e.get("EXT_clip_control");re?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),me=re;const Ce=Me;Me=null,this.setClear(Ce)}},getReversed:function(){return me},setTest:function(re){re?ne(n.DEPTH_TEST):xe(n.DEPTH_TEST)},setMask:function(re){ee!==re&&!U&&(n.depthMask(re),ee=re)},setFunc:function(re){if(me&&(re=ih[re]),ge!==re){switch(re){case sa:n.depthFunc(n.NEVER);break;case aa:n.depthFunc(n.ALWAYS);break;case oa:n.depthFunc(n.LESS);break;case Ki:n.depthFunc(n.LEQUAL);break;case la:n.depthFunc(n.EQUAL);break;case ca:n.depthFunc(n.GEQUAL);break;case ua:n.depthFunc(n.GREATER);break;case ha:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ge=re}},setLocked:function(re){U=re},setClear:function(re){Me!==re&&(Me=re,me&&(re=1-re),n.clearDepth(re))},reset:function(){U=!1,ee=null,ge=null,Me=null,me=!1}}}function r(){let U=!1,me=null,ee=null,ge=null,Me=null,re=null,Ie=null,Ce=null,ht=null;return{setTest:function(rt){U||(rt?ne(n.STENCIL_TEST):xe(n.STENCIL_TEST))},setMask:function(rt){me!==rt&&!U&&(n.stencilMask(rt),me=rt)},setFunc:function(rt,Zt,rn){(ee!==rt||ge!==Zt||Me!==rn)&&(n.stencilFunc(rt,Zt,rn),ee=rt,ge=Zt,Me=rn)},setOp:function(rt,Zt,rn){(re!==rt||Ie!==Zt||Ce!==rn)&&(n.stencilOp(rt,Zt,rn),re=rt,Ie=Zt,Ce=rn)},setLocked:function(rt){U=rt},setClear:function(rt){ht!==rt&&(n.clearStencil(rt),ht=rt)},reset:function(){U=!1,me=null,ee=null,ge=null,Me=null,re=null,Ie=null,Ce=null,ht=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},h={},f={},d=new WeakMap,m=[],x=null,g=!1,p=null,R=null,C=null,M=null,w=null,E=null,P=null,v=new Ye(0,0,0),T=0,L=!1,k=null,O=null,X=null,z=null,V=null;const b=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let y=!1,H=0;const F=n.getParameter(n.VERSION);F.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(F)[1]),y=H>=1):F.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),y=H>=2);let Y=null,K={};const ye=n.getParameter(n.SCISSOR_BOX),he=n.getParameter(n.VIEWPORT),nt=new mt().fromArray(ye),$e=new mt().fromArray(he);function et(U,me,ee,ge){const Me=new Uint8Array(4),re=n.createTexture();n.bindTexture(U,re),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ie=0;Ie<ee;Ie++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(me,0,n.RGBA,1,1,ge,0,n.RGBA,n.UNSIGNED_BYTE,Me):n.texImage2D(me+Ie,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Me);return re}const j={};j[n.TEXTURE_2D]=et(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=et(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=et(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=et(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(n.DEPTH_TEST),a.setFunc(Ki),oe(!1),ue(Uo),ne(n.CULL_FACE),se(wn);function ne(U){u[U]!==!0&&(n.enable(U),u[U]=!0)}function xe(U){u[U]!==!1&&(n.disable(U),u[U]=!1)}function ze(U,me){return f[U]!==me?(n.bindFramebuffer(U,me),f[U]=me,U===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=me),U===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=me),!0):!1}function we(U,me){let ee=m,ge=!1;if(U){ee=d.get(me),ee===void 0&&(ee=[],d.set(me,ee));const Me=U.textures;if(ee.length!==Me.length||ee[0]!==n.COLOR_ATTACHMENT0){for(let re=0,Ie=Me.length;re<Ie;re++)ee[re]=n.COLOR_ATTACHMENT0+re;ee.length=Me.length,ge=!0}}else ee[0]!==n.BACK&&(ee[0]=n.BACK,ge=!0);ge&&n.drawBuffers(ee)}function Oe(U){return x!==U?(n.useProgram(U),x=U,!0):!1}const at={[Si]:n.FUNC_ADD,[wu]:n.FUNC_SUBTRACT,[Eu]:n.FUNC_REVERSE_SUBTRACT};at[Au]=n.MIN,at[Tu]=n.MAX;const ie={[Ru]:n.ZERO,[Cu]:n.ONE,[Pu]:n.SRC_COLOR,[sc]:n.SRC_ALPHA,[Uu]:n.SRC_ALPHA_SATURATE,[ku]:n.DST_COLOR,[Du]:n.DST_ALPHA,[Lu]:n.ONE_MINUS_SRC_COLOR,[ac]:n.ONE_MINUS_SRC_ALPHA,[Nu]:n.ONE_MINUS_DST_COLOR,[Iu]:n.ONE_MINUS_DST_ALPHA,[zu]:n.CONSTANT_COLOR,[Fu]:n.ONE_MINUS_CONSTANT_COLOR,[Ou]:n.CONSTANT_ALPHA,[Bu]:n.ONE_MINUS_CONSTANT_ALPHA};function se(U,me,ee,ge,Me,re,Ie,Ce,ht,rt){if(U===wn){g===!0&&(xe(n.BLEND),g=!1);return}if(g===!1&&(ne(n.BLEND),g=!0),U!==yu){if(U!==p||rt!==L){if((R!==Si||w!==Si)&&(n.blendEquation(n.FUNC_ADD),R=Si,w=Si),rt)switch(U){case qi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case zo:n.blendFunc(n.ONE,n.ONE);break;case Fo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Oo:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:je("WebGLState: Invalid blending: ",U);break}else switch(U){case qi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case zo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Fo:je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Oo:je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:je("WebGLState: Invalid blending: ",U);break}C=null,M=null,E=null,P=null,v.set(0,0,0),T=0,p=U,L=rt}return}Me=Me||me,re=re||ee,Ie=Ie||ge,(me!==R||Me!==w)&&(n.blendEquationSeparate(at[me],at[Me]),R=me,w=Me),(ee!==C||ge!==M||re!==E||Ie!==P)&&(n.blendFuncSeparate(ie[ee],ie[ge],ie[re],ie[Ie]),C=ee,M=ge,E=re,P=Ie),(Ce.equals(v)===!1||ht!==T)&&(n.blendColor(Ce.r,Ce.g,Ce.b,ht),v.copy(Ce),T=ht),p=U,L=!1}function ae(U,me){U.side===jt?xe(n.CULL_FACE):ne(n.CULL_FACE);let ee=U.side===zt;me&&(ee=!ee),oe(ee),U.blending===qi&&U.transparent===!1?se(wn):se(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),s.setMask(U.colorWrite);const ge=U.stencilWrite;o.setTest(ge),ge&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),ke(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):xe(n.SAMPLE_ALPHA_TO_COVERAGE)}function oe(U){k!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),k=U)}function ue(U){U!==Su?(ne(n.CULL_FACE),U!==O&&(U===Uo?n.cullFace(n.BACK):U===bu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):xe(n.CULL_FACE),O=U}function Ne(U){U!==X&&(y&&n.lineWidth(U),X=U)}function ke(U,me,ee){U?(ne(n.POLYGON_OFFSET_FILL),(z!==me||V!==ee)&&(z=me,V=ee,a.getReversed()&&(me=-me),n.polygonOffset(me,ee))):xe(n.POLYGON_OFFSET_FILL)}function Be(U){U?ne(n.SCISSOR_TEST):xe(n.SCISSOR_TEST)}function Ve(U){U===void 0&&(U=n.TEXTURE0+b-1),Y!==U&&(n.activeTexture(U),Y=U)}function D(U,me,ee){ee===void 0&&(Y===null?ee=n.TEXTURE0+b-1:ee=Y);let ge=K[ee];ge===void 0&&(ge={type:void 0,texture:void 0},K[ee]=ge),(ge.type!==U||ge.texture!==me)&&(Y!==ee&&(n.activeTexture(ee),Y=ee),n.bindTexture(U,me||j[U]),ge.type=U,ge.texture=me)}function it(){const U=K[Y];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Ze(){try{n.compressedTexImage2D(...arguments)}catch(U){je("WebGLState:",U)}}function A(){try{n.compressedTexImage3D(...arguments)}catch(U){je("WebGLState:",U)}}function _(){try{n.texSubImage2D(...arguments)}catch(U){je("WebGLState:",U)}}function B(){try{n.texSubImage3D(...arguments)}catch(U){je("WebGLState:",U)}}function q(){try{n.compressedTexSubImage2D(...arguments)}catch(U){je("WebGLState:",U)}}function J(){try{n.compressedTexSubImage3D(...arguments)}catch(U){je("WebGLState:",U)}}function le(){try{n.texStorage2D(...arguments)}catch(U){je("WebGLState:",U)}}function ce(){try{n.texStorage3D(...arguments)}catch(U){je("WebGLState:",U)}}function Q(){try{n.texImage2D(...arguments)}catch(U){je("WebGLState:",U)}}function te(){try{n.texImage3D(...arguments)}catch(U){je("WebGLState:",U)}}function de(U){return h[U]!==void 0?h[U]:n.getParameter(U)}function Le(U,me){h[U]!==me&&(n.pixelStorei(U,me),h[U]=me)}function _e(U){nt.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),nt.copy(U))}function pe(U){$e.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),$e.copy(U))}function De(U,me){let ee=c.get(me);ee===void 0&&(ee=new WeakMap,c.set(me,ee));let ge=ee.get(U);ge===void 0&&(ge=n.getUniformBlockIndex(me,U.name),ee.set(U,ge))}function Ue(U,me){const ge=c.get(me).get(U);l.get(me)!==ge&&(n.uniformBlockBinding(me,ge,U.__bindingPointIndex),l.set(me,ge))}function Ge(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},h={},Y=null,K={},f={},d=new WeakMap,m=[],x=null,g=!1,p=null,R=null,C=null,M=null,w=null,E=null,P=null,v=new Ye(0,0,0),T=0,L=!1,k=null,O=null,X=null,z=null,V=null,nt.set(0,0,n.canvas.width,n.canvas.height),$e.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ne,disable:xe,bindFramebuffer:ze,drawBuffers:we,useProgram:Oe,setBlending:se,setMaterial:ae,setFlipSided:oe,setCullFace:ue,setLineWidth:Ne,setPolygonOffset:ke,setScissorTest:Be,activeTexture:Ve,bindTexture:D,unbindTexture:it,compressedTexImage2D:Ze,compressedTexImage3D:A,texImage2D:Q,texImage3D:te,pixelStorei:Le,getParameter:de,updateUBOMapping:De,uniformBlockBinding:Ue,texStorage2D:le,texStorage3D:ce,texSubImage2D:_,texSubImage3D:B,compressedTexSubImage2D:q,compressedTexSubImage3D:J,scissor:_e,viewport:pe,reset:Ge}}function u0(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new fe,u=new WeakMap,h=new Set;let f;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,_){return m?new OffscreenCanvas(A,_):Qr("canvas")}function g(A,_,B){let q=1;const J=Ze(A);if((J.width>B||J.height>B)&&(q=B/Math.max(J.width,J.height)),q<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const le=Math.floor(q*J.width),ce=Math.floor(q*J.height);f===void 0&&(f=x(le,ce));const Q=_?x(le,ce):f;return Q.width=le,Q.height=ce,Q.getContext("2d").drawImage(A,0,0,le,ce),Fe("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+le+"x"+ce+")."),Q}else return"data"in A&&Fe("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),A;return A}function p(A){return A.generateMipmaps}function R(A){n.generateMipmap(A)}function C(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(A,_,B,q,J,le=!1){if(A!==null){if(n[A]!==void 0)return n[A];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ce;q&&(ce=e.get("EXT_texture_norm16"),ce||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=_;if(_===n.RED&&(B===n.FLOAT&&(Q=n.R32F),B===n.HALF_FLOAT&&(Q=n.R16F),B===n.UNSIGNED_BYTE&&(Q=n.R8),B===n.UNSIGNED_SHORT&&ce&&(Q=ce.R16_EXT),B===n.SHORT&&ce&&(Q=ce.R16_SNORM_EXT)),_===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(Q=n.R8UI),B===n.UNSIGNED_SHORT&&(Q=n.R16UI),B===n.UNSIGNED_INT&&(Q=n.R32UI),B===n.BYTE&&(Q=n.R8I),B===n.SHORT&&(Q=n.R16I),B===n.INT&&(Q=n.R32I)),_===n.RG&&(B===n.FLOAT&&(Q=n.RG32F),B===n.HALF_FLOAT&&(Q=n.RG16F),B===n.UNSIGNED_BYTE&&(Q=n.RG8),B===n.UNSIGNED_SHORT&&ce&&(Q=ce.RG16_EXT),B===n.SHORT&&ce&&(Q=ce.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(Q=n.RG8UI),B===n.UNSIGNED_SHORT&&(Q=n.RG16UI),B===n.UNSIGNED_INT&&(Q=n.RG32UI),B===n.BYTE&&(Q=n.RG8I),B===n.SHORT&&(Q=n.RG16I),B===n.INT&&(Q=n.RG32I)),_===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),B===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),B===n.UNSIGNED_INT&&(Q=n.RGB32UI),B===n.BYTE&&(Q=n.RGB8I),B===n.SHORT&&(Q=n.RGB16I),B===n.INT&&(Q=n.RGB32I)),_===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),B===n.UNSIGNED_INT&&(Q=n.RGBA32UI),B===n.BYTE&&(Q=n.RGBA8I),B===n.SHORT&&(Q=n.RGBA16I),B===n.INT&&(Q=n.RGBA32I)),_===n.RGB&&(B===n.UNSIGNED_SHORT&&ce&&(Q=ce.RGB16_EXT),B===n.SHORT&&ce&&(Q=ce.RGB16_SNORM_EXT),B===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),_===n.RGBA){const te=le?Jr:Qe.getTransfer(J);B===n.FLOAT&&(Q=n.RGBA32F),B===n.HALF_FLOAT&&(Q=n.RGBA16F),B===n.UNSIGNED_BYTE&&(Q=te===ot?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT&&ce&&(Q=ce.RGBA16_EXT),B===n.SHORT&&ce&&(Q=ce.RGBA16_SNORM_EXT),B===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function w(A,_){let B;return A?_===null||_===dn||_===Qi?B=n.DEPTH24_STENCIL8:_===un?B=n.DEPTH32F_STENCIL8:_===Ji&&(B=n.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===dn||_===Qi?B=n.DEPTH_COMPONENT24:_===un?B=n.DEPTH_COMPONENT32F:_===Ji&&(B=n.DEPTH_COMPONENT16),B}function E(A,_){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==At&&A.minFilter!==Dt?Math.log2(Math.max(_.width,_.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?_.mipmaps.length:1}function P(A){const _=A.target;_.removeEventListener("dispose",P),T(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&h.delete(_)}function v(A){const _=A.target;_.removeEventListener("dispose",v),k(_)}function T(A){const _=i.get(A);if(_.__webglInit===void 0)return;const B=A.source,q=d.get(B);if(q){const J=q[_.__cacheKey];J.usedTimes--,J.usedTimes===0&&L(A),Object.keys(q).length===0&&d.delete(B)}i.remove(A)}function L(A){const _=i.get(A);n.deleteTexture(_.__webglTexture);const B=A.source,q=d.get(B);delete q[_.__cacheKey],a.memory.textures--}function k(A){const _=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(_.__webglFramebuffer[q]))for(let J=0;J<_.__webglFramebuffer[q].length;J++)n.deleteFramebuffer(_.__webglFramebuffer[q][J]);else n.deleteFramebuffer(_.__webglFramebuffer[q]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[q])}else{if(Array.isArray(_.__webglFramebuffer))for(let q=0;q<_.__webglFramebuffer.length;q++)n.deleteFramebuffer(_.__webglFramebuffer[q]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let q=0;q<_.__webglColorRenderbuffer.length;q++)_.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const B=A.textures;for(let q=0,J=B.length;q<J;q++){const le=i.get(B[q]);le.__webglTexture&&(n.deleteTexture(le.__webglTexture),a.memory.textures--),i.remove(B[q])}i.remove(A)}let O=0;function X(){O=0}function z(){return O}function V(A){O=A}function b(){const A=O;return A>=r.maxTextures&&Fe("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+r.maxTextures),O+=1,A}function y(A){const _=[];return _.push(A.wrapS),_.push(A.wrapT),_.push(A.wrapR||0),_.push(A.magFilter),_.push(A.minFilter),_.push(A.anisotropy),_.push(A.internalFormat),_.push(A.format),_.push(A.type),_.push(A.generateMipmaps),_.push(A.premultiplyAlpha),_.push(A.flipY),_.push(A.unpackAlignment),_.push(A.colorSpace),_.join()}function H(A,_){const B=i.get(A);if(A.isVideoTexture&&D(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&B.__version!==A.version){const q=A.image;if(q===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{xe(B,A,_);return}}else A.isExternalTexture&&(B.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+_)}function F(A,_){const B=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){xe(B,A,_);return}else A.isExternalTexture&&(B.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+_)}function Y(A,_){const B=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){xe(B,A,_);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+_)}function K(A,_){const B=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&B.__version!==A.version){ze(B,A,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+_)}const ye={[fa]:n.REPEAT,[yn]:n.CLAMP_TO_EDGE,[da]:n.MIRRORED_REPEAT},he={[At]:n.NEAREST,[Gu]:n.NEAREST_MIPMAP_NEAREST,[cr]:n.NEAREST_MIPMAP_LINEAR,[Dt]:n.LINEAR,[_s]:n.LINEAR_MIPMAP_NEAREST,[Zn]:n.LINEAR_MIPMAP_LINEAR},nt={[Yu]:n.NEVER,[Qu]:n.ALWAYS,[$u]:n.LESS,[fo]:n.LEQUAL,[Zu]:n.EQUAL,[po]:n.GEQUAL,[Ku]:n.GREATER,[Ju]:n.NOTEQUAL};function $e(A,_){if(_.type===un&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Dt||_.magFilter===_s||_.magFilter===cr||_.magFilter===Zn||_.minFilter===Dt||_.minFilter===_s||_.minFilter===cr||_.minFilter===Zn)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,ye[_.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,ye[_.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,ye[_.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,he[_.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,he[_.minFilter]),_.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,nt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===At||_.minFilter!==cr&&_.minFilter!==Zn||_.type===un&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function et(A,_){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,_.addEventListener("dispose",P));const q=_.source;let J=d.get(q);J===void 0&&(J={},d.set(q,J));const le=y(_);if(le!==A.__cacheKey){J[le]===void 0&&(J[le]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),J[le].usedTimes++;const ce=J[A.__cacheKey];ce!==void 0&&(J[A.__cacheKey].usedTimes--,ce.usedTimes===0&&L(_)),A.__cacheKey=le,A.__webglTexture=J[le].texture}return B}function j(A,_,B){return Math.floor(Math.floor(A/B)/_)}function ne(A,_,B,q){const le=A.updateRanges;if(le.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,B,q,_.data);else{le.sort((Le,_e)=>Le.start-_e.start);let ce=0;for(let Le=1;Le<le.length;Le++){const _e=le[ce],pe=le[Le],De=_e.start+_e.count,Ue=j(pe.start,_.width,4),Ge=j(_e.start,_.width,4);pe.start<=De+1&&Ue===Ge&&j(pe.start+pe.count-1,_.width,4)===Ue?_e.count=Math.max(_e.count,pe.start+pe.count-_e.start):(++ce,le[ce]=pe)}le.length=ce+1;const Q=t.getParameter(n.UNPACK_ROW_LENGTH),te=t.getParameter(n.UNPACK_SKIP_PIXELS),de=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let Le=0,_e=le.length;Le<_e;Le++){const pe=le[Le],De=Math.floor(pe.start/4),Ue=Math.ceil(pe.count/4),Ge=De%_.width,U=Math.floor(De/_.width),me=Ue,ee=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ge),t.pixelStorei(n.UNPACK_SKIP_ROWS,U),t.texSubImage2D(n.TEXTURE_2D,0,Ge,U,me,ee,B,q,_.data)}A.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Q),t.pixelStorei(n.UNPACK_SKIP_PIXELS,te),t.pixelStorei(n.UNPACK_SKIP_ROWS,de)}}function xe(A,_,B){let q=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(q=n.TEXTURE_3D);const J=et(A,_),le=_.source;t.bindTexture(q,A.__webglTexture,n.TEXTURE0+B);const ce=i.get(le);if(le.version!==ce.__version||J===!0){if(t.activeTexture(n.TEXTURE0+B),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const ee=Qe.getPrimaries(Qe.workingColorSpace),ge=_.colorSpace===Un?null:Qe.getPrimaries(_.colorSpace),Me=_.colorSpace===Un||ee===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let te=g(_.image,!1,r.maxTextureSize);te=it(_,te);const de=s.convert(_.format,_.colorSpace),Le=s.convert(_.type);let _e=M(_.internalFormat,de,Le,_.normalized,_.colorSpace,_.isVideoTexture);$e(q,_);let pe;const De=_.mipmaps,Ue=_.isVideoTexture!==!0,Ge=ce.__version===void 0||J===!0,U=le.dataReady,me=E(_,te);if(_.isDepthTexture)_e=w(_.format===Kn,_.type),Ge&&(Ue?t.texStorage2D(n.TEXTURE_2D,1,_e,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,_e,te.width,te.height,0,de,Le,null));else if(_.isDataTexture)if(De.length>0){Ue&&Ge&&t.texStorage2D(n.TEXTURE_2D,me,_e,De[0].width,De[0].height);for(let ee=0,ge=De.length;ee<ge;ee++)pe=De[ee],Ue?U&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,pe.width,pe.height,de,Le,pe.data):t.texImage2D(n.TEXTURE_2D,ee,_e,pe.width,pe.height,0,de,Le,pe.data);_.generateMipmaps=!1}else Ue?(Ge&&t.texStorage2D(n.TEXTURE_2D,me,_e,te.width,te.height),U&&ne(_,te,de,Le)):t.texImage2D(n.TEXTURE_2D,0,_e,te.width,te.height,0,de,Le,te.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ue&&Ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,_e,De[0].width,De[0].height,te.depth);for(let ee=0,ge=De.length;ee<ge;ee++)if(pe=De[ee],_.format!==en)if(de!==null)if(Ue){if(U)if(_.layerUpdates.size>0){const Me=Ml(pe.width,pe.height,_.format,_.type);for(const re of _.layerUpdates){const Ie=pe.data.subarray(re*Me/pe.data.BYTES_PER_ELEMENT,(re+1)*Me/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,re,pe.width,pe.height,1,de,Ie)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,pe.width,pe.height,te.depth,de,pe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,_e,pe.width,pe.height,te.depth,0,pe.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?U&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,pe.width,pe.height,te.depth,de,Le,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,_e,pe.width,pe.height,te.depth,0,de,Le,pe.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Ue&&Ge&&t.texStorage2D(n.TEXTURE_2D,me,_e,De[0].width,De[0].height);for(let ee=0,ge=De.length;ee<ge;ee++)pe=De[ee],_.format!==en?de!==null?Ue?U&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,pe.width,pe.height,de,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,_e,pe.width,pe.height,0,pe.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?U&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,pe.width,pe.height,de,Le,pe.data):t.texImage2D(n.TEXTURE_2D,ee,_e,pe.width,pe.height,0,de,Le,pe.data)}else if(_.isDataArrayTexture)if(Ue){if(Ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,_e,te.width,te.height,te.depth),U)if(_.layerUpdates.size>0){const ee=Ml(te.width,te.height,_.format,_.type);for(const ge of _.layerUpdates){const Me=te.data.subarray(ge*ee/te.data.BYTES_PER_ELEMENT,(ge+1)*ee/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ge,te.width,te.height,1,de,Le,Me)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,de,Le,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,_e,te.width,te.height,te.depth,0,de,Le,te.data);else if(_.isData3DTexture)Ue?(Ge&&t.texStorage3D(n.TEXTURE_3D,me,_e,te.width,te.height,te.depth),U&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,de,Le,te.data)):t.texImage3D(n.TEXTURE_3D,0,_e,te.width,te.height,te.depth,0,de,Le,te.data);else if(_.isFramebufferTexture){if(Ge)if(Ue)t.texStorage2D(n.TEXTURE_2D,me,_e,te.width,te.height);else{let ee=te.width,ge=te.height;for(let Me=0;Me<me;Me++)t.texImage2D(n.TEXTURE_2D,Me,_e,ee,ge,0,de,Le,null),ee>>=1,ge>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const ee=n.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),te.parentNode!==ee){ee.appendChild(te),h.add(_),ee.onpaint=ge=>{const Me=ge.changedElements;for(const re of h)Me.includes(re.image)&&(re.needsUpdate=!0)},ee.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,te);else{const Me=n.RGBA,re=n.RGBA,Ie=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Me,re,Ie,te)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(De.length>0){if(Ue&&Ge){const ee=Ze(De[0]);t.texStorage2D(n.TEXTURE_2D,me,_e,ee.width,ee.height)}for(let ee=0,ge=De.length;ee<ge;ee++)pe=De[ee],Ue?U&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,de,Le,pe):t.texImage2D(n.TEXTURE_2D,ee,_e,de,Le,pe);_.generateMipmaps=!1}else if(Ue){if(Ge){const ee=Ze(te);t.texStorage2D(n.TEXTURE_2D,me,_e,ee.width,ee.height)}U&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,de,Le,te)}else t.texImage2D(n.TEXTURE_2D,0,_e,de,Le,te);p(_)&&R(q),ce.__version=le.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function ze(A,_,B){if(_.image.length!==6)return;const q=et(A,_),J=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+B);const le=i.get(J);if(J.version!==le.__version||q===!0){t.activeTexture(n.TEXTURE0+B);const ce=Qe.getPrimaries(Qe.workingColorSpace),Q=_.colorSpace===Un?null:Qe.getPrimaries(_.colorSpace),te=_.colorSpace===Un||ce===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const de=_.isCompressedTexture||_.image[0].isCompressedTexture,Le=_.image[0]&&_.image[0].isDataTexture,_e=[];for(let re=0;re<6;re++)!de&&!Le?_e[re]=g(_.image[re],!0,r.maxCubemapSize):_e[re]=Le?_.image[re].image:_.image[re],_e[re]=it(_,_e[re]);const pe=_e[0],De=s.convert(_.format,_.colorSpace),Ue=s.convert(_.type),Ge=M(_.internalFormat,De,Ue,_.normalized,_.colorSpace),U=_.isVideoTexture!==!0,me=le.__version===void 0||q===!0,ee=J.dataReady;let ge=E(_,pe);$e(n.TEXTURE_CUBE_MAP,_);let Me;if(de){U&&me&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,Ge,pe.width,pe.height);for(let re=0;re<6;re++){Me=_e[re].mipmaps;for(let Ie=0;Ie<Me.length;Ie++){const Ce=Me[Ie];_.format!==en?De!==null?U?ee&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie,0,0,Ce.width,Ce.height,De,Ce.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie,Ge,Ce.width,Ce.height,0,Ce.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie,0,0,Ce.width,Ce.height,De,Ue,Ce.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie,Ge,Ce.width,Ce.height,0,De,Ue,Ce.data)}}}else{if(Me=_.mipmaps,U&&me){Me.length>0&&ge++;const re=Ze(_e[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,Ge,re.width,re.height)}for(let re=0;re<6;re++)if(Le){U?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,_e[re].width,_e[re].height,De,Ue,_e[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ge,_e[re].width,_e[re].height,0,De,Ue,_e[re].data);for(let Ie=0;Ie<Me.length;Ie++){const ht=Me[Ie].image[re].image;U?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie+1,0,0,ht.width,ht.height,De,Ue,ht.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie+1,Ge,ht.width,ht.height,0,De,Ue,ht.data)}}else{U?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,De,Ue,_e[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ge,De,Ue,_e[re]);for(let Ie=0;Ie<Me.length;Ie++){const Ce=Me[Ie];U?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie+1,0,0,De,Ue,Ce.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie+1,Ge,De,Ue,Ce.image[re])}}}p(_)&&R(n.TEXTURE_CUBE_MAP),le.__version=J.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function we(A,_,B,q,J,le){const ce=s.convert(B.format,B.colorSpace),Q=s.convert(B.type),te=M(B.internalFormat,ce,Q,B.normalized,B.colorSpace),de=i.get(_),Le=i.get(B);if(Le.__renderTarget=_,!de.__hasExternalTextures){const _e=Math.max(1,_.width>>le),pe=Math.max(1,_.height>>le);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,le,te,_e,pe,_.depth,0,ce,Q,null):t.texImage2D(J,le,te,_e,pe,0,ce,Q,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),Ve(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,J,Le.__webglTexture,0,Be(_)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,J,Le.__webglTexture,le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Oe(A,_,B){if(n.bindRenderbuffer(n.RENDERBUFFER,A),_.depthBuffer){const q=_.depthTexture,J=q&&q.isDepthTexture?q.type:null,le=w(_.stencilBuffer,J),ce=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ve(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Be(_),le,_.width,_.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,Be(_),le,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,le,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ce,n.RENDERBUFFER,A)}else{const q=_.textures;for(let J=0;J<q.length;J++){const le=q[J],ce=s.convert(le.format,le.colorSpace),Q=s.convert(le.type),te=M(le.internalFormat,ce,Q,le.normalized,le.colorSpace);Ve(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Be(_),te,_.width,_.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,Be(_),te,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,te,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function at(A,_,B){const q=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const J=i.get(_.depthTexture);if(J.__renderTarget=_,(!J.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q){if(J.__webglInit===void 0&&(J.__webglInit=!0,_.depthTexture.addEventListener("dispose",P)),J.__webglTexture===void 0){J.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),$e(n.TEXTURE_CUBE_MAP,_.depthTexture);const de=s.convert(_.depthTexture.format),Le=s.convert(_.depthTexture.type);let _e;_.depthTexture.format===Tn?_e=n.DEPTH_COMPONENT24:_.depthTexture.format===Kn&&(_e=n.DEPTH24_STENCIL8);for(let pe=0;pe<6;pe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,_e,_.width,_.height,0,de,Le,null)}}else H(_.depthTexture,0);const le=J.__webglTexture,ce=Be(_),Q=q?n.TEXTURE_CUBE_MAP_POSITIVE_X+B:n.TEXTURE_2D,te=_.depthTexture.format===Kn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Tn)Ve(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,Q,le,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,te,Q,le,0);else if(_.depthTexture.format===Kn)Ve(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,Q,le,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,te,Q,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ie(A){const _=i.get(A),B=A.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==A.depthTexture){const q=A.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),q){const J=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,q.removeEventListener("dispose",J)};q.addEventListener("dispose",J),_.__depthDisposeCallback=J}_.__boundDepthTexture=q}if(A.depthTexture&&!_.__autoAllocateDepthBuffer)if(B)for(let q=0;q<6;q++)at(_.__webglFramebuffer[q],A,q);else{const q=A.texture.mipmaps;q&&q.length>0?at(_.__webglFramebuffer[0],A,0):at(_.__webglFramebuffer,A,0)}else if(B){_.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[q]),_.__webglDepthbuffer[q]===void 0)_.__webglDepthbuffer[q]=n.createRenderbuffer(),Oe(_.__webglDepthbuffer[q],A,!1);else{const J=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=_.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,le)}}else{const q=A.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Oe(_.__webglDepthbuffer,A,!1);else{const J=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,le)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function se(A,_,B){const q=i.get(A);_!==void 0&&we(q.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&ie(A)}function ae(A){const _=A.texture,B=i.get(A),q=i.get(_);A.addEventListener("dispose",v);const J=A.textures,le=A.isWebGLCubeRenderTarget===!0,ce=J.length>1;if(ce||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=_.version,a.memory.textures++),le){B.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[Q]=[];for(let te=0;te<_.mipmaps.length;te++)B.__webglFramebuffer[Q][te]=n.createFramebuffer()}else B.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let Q=0;Q<_.mipmaps.length;Q++)B.__webglFramebuffer[Q]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(ce)for(let Q=0,te=J.length;Q<te;Q++){const de=i.get(J[Q]);de.__webglTexture===void 0&&(de.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&Ve(A)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Q=0;Q<J.length;Q++){const te=J[Q];B.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[Q]);const de=s.convert(te.format,te.colorSpace),Le=s.convert(te.type),_e=M(te.internalFormat,de,Le,te.normalized,te.colorSpace,A.isXRRenderTarget===!0),pe=Be(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,pe,_e,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,B.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),Oe(B.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(le){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),$e(n.TEXTURE_CUBE_MAP,_);for(let Q=0;Q<6;Q++)if(_.mipmaps&&_.mipmaps.length>0)for(let te=0;te<_.mipmaps.length;te++)we(B.__webglFramebuffer[Q][te],A,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,te);else we(B.__webglFramebuffer[Q],A,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);p(_)&&R(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let Q=0,te=J.length;Q<te;Q++){const de=J[Q],Le=i.get(de);let _e=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(_e=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(_e,Le.__webglTexture),$e(_e,de),we(B.__webglFramebuffer,A,de,n.COLOR_ATTACHMENT0+Q,_e,0),p(de)&&R(_e)}t.unbindTexture()}else{let Q=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Q=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Q,q.__webglTexture),$e(Q,_),_.mipmaps&&_.mipmaps.length>0)for(let te=0;te<_.mipmaps.length;te++)we(B.__webglFramebuffer[te],A,_,n.COLOR_ATTACHMENT0,Q,te);else we(B.__webglFramebuffer,A,_,n.COLOR_ATTACHMENT0,Q,0);p(_)&&R(Q),t.unbindTexture()}A.depthBuffer&&ie(A)}function oe(A){const _=A.textures;for(let B=0,q=_.length;B<q;B++){const J=_[B];if(p(J)){const le=C(A),ce=i.get(J).__webglTexture;t.bindTexture(le,ce),R(le),t.unbindTexture()}}}const ue=[],Ne=[];function ke(A){if(A.samples>0){if(Ve(A)===!1){const _=A.textures,B=A.width,q=A.height;let J=n.COLOR_BUFFER_BIT;const le=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=i.get(A),Q=_.length>1;if(Q)for(let de=0;de<_.length;de++)t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);const te=A.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let de=0;de<_.length;de++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ce.__webglColorRenderbuffer[de]);const Le=i.get(_[de]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Le,0)}n.blitFramebuffer(0,0,B,q,0,0,B,q,J,n.NEAREST),l===!0&&(ue.length=0,Ne.length=0,ue.push(n.COLOR_ATTACHMENT0+de),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(ue.push(le),Ne.push(le),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ne)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ue))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let de=0;de<_.length;de++){t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,ce.__webglColorRenderbuffer[de]);const Le=i.get(_[de]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,Le,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){const _=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function Be(A){return Math.min(r.maxSamples,A.samples)}function Ve(A){const _=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function D(A){const _=a.render.frame;u.get(A)!==_&&(u.set(A,_),A.update())}function it(A,_){const B=A.colorSpace,q=A.format,J=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==Kr&&B!==Un&&(Qe.getTransfer(B)===ot?(q!==en||J!==Gt)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):je("WebGLTextures: Unsupported texture color space:",B)),_}function Ze(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=b,this.resetTextureUnits=X,this.getTextureUnits=z,this.setTextureUnits=V,this.setTexture2D=H,this.setTexture2DArray=F,this.setTexture3D=Y,this.setTextureCube=K,this.rebindTextures=se,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=oe,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=we,this.useMultisampledRTT=Ve,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function h0(n,e){function t(i,r=Un){let s;const a=Qe.getTransfer(r);if(i===Gt)return n.UNSIGNED_BYTE;if(i===oo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===lo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===_c)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===vc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===mc)return n.BYTE;if(i===gc)return n.SHORT;if(i===Ji)return n.UNSIGNED_SHORT;if(i===ao)return n.INT;if(i===dn)return n.UNSIGNED_INT;if(i===un)return n.FLOAT;if(i===pn)return n.HALF_FLOAT;if(i===xc)return n.ALPHA;if(i===Sc)return n.RGB;if(i===en)return n.RGBA;if(i===Tn)return n.DEPTH_COMPONENT;if(i===Kn)return n.DEPTH_STENCIL;if(i===bc)return n.RED;if(i===co)return n.RED_INTEGER;if(i===ei)return n.RG;if(i===uo)return n.RG_INTEGER;if(i===ho)return n.RGBA_INTEGER;if(i===Or||i===Br||i===Vr||i===Hr)if(a===ot)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Or)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Br)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Vr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Hr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Or)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Br)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Vr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Hr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===pa||i===ma||i===ga||i===_a)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===pa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ma)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ga)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===_a)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===va||i===xa||i===Sa||i===ba||i===Ma||i===$r||i===ya)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===va||i===xa)return a===ot?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Sa)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===ba)return s.COMPRESSED_R11_EAC;if(i===Ma)return s.COMPRESSED_SIGNED_R11_EAC;if(i===$r)return s.COMPRESSED_RG11_EAC;if(i===ya)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===wa||i===Ea||i===Aa||i===Ta||i===Ra||i===Ca||i===Pa||i===La||i===Da||i===Ia||i===ka||i===Na||i===Ua||i===za)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===wa)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ea)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Aa)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ta)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ra)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ca)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Pa)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===La)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Da)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ia)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ka)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Na)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ua)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===za)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Fa||i===Oa||i===Ba)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Fa)return a===ot?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Oa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ba)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Va||i===Ha||i===Zr||i===Ga)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Va)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ha)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Zr)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ga)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Qi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const f0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,d0=`
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

}`;class p0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Cc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new mn({vertexShader:f0,fragmentShader:d0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new nn(new cs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class m0 extends ii{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,m=null;const x=typeof XRWebGLBinding<"u",g=new p0,p={},R=t.getContextAttributes();let C=null,M=null;const w=[],E=[],P=new fe;let v=null,T=null;const L=new Yt;L.viewport=new mt;const k=new Yt;k.viewport=new mt;const O=[L,k],X=new yf;let z=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ne=w[j];return ne===void 0&&(ne=new Es,w[j]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(j){let ne=w[j];return ne===void 0&&(ne=new Es,w[j]=ne),ne.getGripSpace()},this.getHand=function(j){let ne=w[j];return ne===void 0&&(ne=new Es,w[j]=ne),ne.getHandSpace()};function b(j){const ne=E.indexOf(j.inputSource);if(ne===-1)return;const xe=w[ne];xe!==void 0&&(xe.update(j.inputSource,j.frame,c||a),xe.dispatchEvent({type:j.type,data:j.inputSource}))}function y(){r.removeEventListener("select",b),r.removeEventListener("selectstart",b),r.removeEventListener("selectend",b),r.removeEventListener("squeeze",b),r.removeEventListener("squeezestart",b),r.removeEventListener("squeezeend",b),r.removeEventListener("end",y),r.removeEventListener("inputsourceschange",H);for(let j=0;j<w.length;j++){const ne=E[j];ne!==null&&(E[j]=null,w[j].disconnect(ne))}z=null,V=null,g.reset();for(const j in p)delete p[j];if(e.setRenderTarget(C),d=null,f=null,h=null,r=null,M=null,et.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(P.width,P.height,!1),T!==null){const j=T.camera;j.fov=T.fov,j.zoom=T.zoom,j.updateProjectionMatrix(),T=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&x&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(C=e.getRenderTarget(),r.addEventListener("select",b),r.addEventListener("selectstart",b),r.addEventListener("selectend",b),r.addEventListener("squeeze",b),r.addEventListener("squeezestart",b),r.addEventListener("squeezeend",b),r.addEventListener("end",y),r.addEventListener("inputsourceschange",H),R.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let xe=null,ze=null,we=null;R.depth&&(we=R.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,xe=R.stencil?Kn:Tn,ze=R.stencil?Qi:dn);const Oe={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:s};h=this.getBinding(),f=h.createProjectionLayer(Oe),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),M=new tn(f.textureWidth,f.textureHeight,{format:en,type:Gt,depthTexture:new er(f.textureWidth,f.textureHeight,ze,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:R.stencil,colorSpace:e.outputColorSpace,samples:R.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const xe={antialias:R.antialias,alpha:!0,depth:R.depth,stencil:R.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,xe),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new tn(d.framebufferWidth,d.framebufferHeight,{format:en,type:Gt,colorSpace:e.outputColorSpace,stencilBuffer:R.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),et.setContext(r),et.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function H(j){for(let ne=0;ne<j.removed.length;ne++){const xe=j.removed[ne],ze=E.indexOf(xe);ze>=0&&(E[ze]=null,w[ze].disconnect(xe))}for(let ne=0;ne<j.added.length;ne++){const xe=j.added[ne];let ze=E.indexOf(xe);if(ze===-1){for(let Oe=0;Oe<w.length;Oe++)if(Oe>=E.length){E.push(xe),ze=Oe;break}else if(E[Oe]===null){E[Oe]=xe,ze=Oe;break}if(ze===-1)break}const we=w[ze];we&&we.connect(xe)}}const F=new I,Y=new I;function K(j,ne,xe){F.setFromMatrixPosition(ne.matrixWorld),Y.setFromMatrixPosition(xe.matrixWorld);const ze=F.distanceTo(Y),we=ne.projectionMatrix.elements,Oe=xe.projectionMatrix.elements,at=we[14]/(we[10]-1),ie=we[14]/(we[10]+1),se=(we[9]+1)/we[5],ae=(we[9]-1)/we[5],oe=(we[8]-1)/we[0],ue=(Oe[8]+1)/Oe[0],Ne=at*oe,ke=at*ue,Be=ze/(-oe+ue),Ve=Be*-oe;if(ne.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Ve),j.translateZ(Be),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),we[10]===-1)j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const D=at+Be,it=ie+Be,Ze=Ne-Ve,A=ke+(ze-Ve),_=se*ie/it*D,B=ae*ie/it*D;j.projectionMatrix.makePerspective(Ze,A,_,B,D,it),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ye(j,ne){ne===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ne.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let ne=j.near,xe=j.far;g.texture!==null&&(g.depthNear>0&&(ne=g.depthNear),g.depthFar>0&&(xe=g.depthFar)),X.near=k.near=L.near=ne,X.far=k.far=L.far=xe,(z!==X.near||V!==X.far)&&(r.updateRenderState({depthNear:X.near,depthFar:X.far}),z=X.near,V=X.far),X.layers.mask=j.layers.mask|6,L.layers.mask=X.layers.mask&-5,k.layers.mask=X.layers.mask&-3;const ze=j.parent,we=X.cameras;ye(X,ze);for(let Oe=0;Oe<we.length;Oe++)ye(we[Oe],ze);we.length===2?K(X,L,k):X.projectionMatrix.copy(L.projectionMatrix),T===null&&j.isPerspectiveCamera&&(T={camera:j,fov:j.fov,zoom:j.zoom}),he(j,X,ze)};function he(j,ne,xe){xe===null?j.matrix.copy(ne.matrixWorld):(j.matrix.copy(xe.matrixWorld),j.matrix.invert(),j.matrix.multiply(ne.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Xa*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(j){l=j,f!==null&&(f.fixedFoveation=j),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(X)},this.getCameraTexture=function(j){return p[j]};let nt=null;function $e(j,ne){if(u=ne.getViewerPose(c||a),m=ne,u!==null){const xe=u.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let ze=!1;xe.length!==X.cameras.length&&(X.cameras.length=0,ze=!0);for(let ie=0;ie<xe.length;ie++){const se=xe[ie];let ae=null;if(d!==null)ae=d.getViewport(se);else{const ue=h.getViewSubImage(f,se);ae=ue.viewport,ie===0&&(e.setRenderTargetTextures(M,ue.colorTexture,ue.depthStencilTexture),e.setRenderTarget(M))}let oe=O[ie];oe===void 0&&(oe=new Yt,oe.layers.enable(ie),oe.viewport=new mt,O[ie]=oe),oe.matrix.fromArray(se.transform.matrix),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.projectionMatrix.fromArray(se.projectionMatrix),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert(),oe.viewport.set(ae.x,ae.y,ae.width,ae.height),ie===0&&(X.matrix.copy(oe.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),ze===!0&&X.cameras.push(oe)}const we=r.enabledFeatures;if(we&&we.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){h=i.getBinding();const ie=h.getDepthInformation(xe[0]);ie&&ie.isValid&&ie.texture&&g.init(ie,r.renderState)}if(we&&we.includes("camera-access")&&x){e.state.unbindTexture(),h=i.getBinding();for(let ie=0;ie<xe.length;ie++){const se=xe[ie].camera;if(se){let ae=p[se];ae||(ae=new Cc,p[se]=ae);const oe=h.getCameraImage(se);ae.sourceTexture=oe}}}}for(let xe=0;xe<w.length;xe++){const ze=E[xe],we=w[xe];ze!==null&&we!==void 0&&we.update(ze,ne,c||a)}nt&&nt(j,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),m=null}const et=new Gc;et.setAnimationLoop($e),this.setAnimationLoop=function(j){nt=j},this.dispose=function(){}}}const g0=new dt,Kc=new He;Kc.set(-1,0,0,0,1,0,0,0,1);function _0(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,Oc(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,R,C,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(g,p):p.isMeshLambertMaterial?(s(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(g,p),h(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,M)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),x(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,R,C):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===zt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===zt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const R=e.get(p),C=R.envMap,M=R.envMapRotation;C&&(g.envMap.value=C,g.envMapRotation.value.setFromMatrix4(g0.makeRotationFromEuler(M)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Kc),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,R,C){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*R,g.scale.value=C*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,R){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===zt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=R.texture,g.transmissionSamplerSize.value.set(R.width,R.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){const R=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(R.matrixWorld),g.nearDistance.value=R.shadow.camera.near,g.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function v0(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,w){const E=w.program;i.uniformBlockBinding(M,E)}function c(M,w){let E=r[M.id];E===void 0&&(g(M),E=u(M),r[M.id]=E,M.addEventListener("dispose",R));const P=w.program;i.updateUBOMapping(M,P);const v=e.render.frame;s[M.id]!==v&&(f(M),s[M.id]=v)}function u(M){const w=h();M.__bindingPointIndex=w;const E=n.createBuffer(),P=M.__size,v=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,P,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,E),E}function h(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const w=r[M.id],E=M.uniforms,P=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let v=0,T=E.length;v<T;v++){const L=E[v];if(Array.isArray(L))for(let k=0,O=L.length;k<O;k++)d(L[k],v,k,P);else d(L,v,0,P)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(M,w,E,P){if(x(M,w,E,P)===!0){const v=M.__offset,T=M.value;if(Array.isArray(T)){let L=0;for(let k=0;k<T.length;k++){const O=T[k],X=p(O);m(O,M.__data,L),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(L+=X.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(T,M.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,M.__data)}}function m(M,w,E){typeof M=="number"||typeof M=="boolean"?w[0]=M:M.isMatrix3?(w[0]=M.elements[0],w[1]=M.elements[1],w[2]=M.elements[2],w[3]=0,w[4]=M.elements[3],w[5]=M.elements[4],w[6]=M.elements[5],w[7]=0,w[8]=M.elements[6],w[9]=M.elements[7],w[10]=M.elements[8],w[11]=0):ArrayBuffer.isView(M)?w.set(new M.constructor(M.buffer,M.byteOffset,w.length)):M.toArray(w,E)}function x(M,w,E,P){const v=M.value,T=w+"_"+E;if(P[T]===void 0)return typeof v=="number"||typeof v=="boolean"?P[T]=v:ArrayBuffer.isView(v)?P[T]=v.slice():P[T]=v.clone(),!0;{const L=P[T];if(typeof v=="number"||typeof v=="boolean"){if(L!==v)return P[T]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(L.equals(v)===!1)return L.copy(v),!0}}return!1}function g(M){const w=M.uniforms;let E=0;const P=16;for(let T=0,L=w.length;T<L;T++){const k=Array.isArray(w[T])?w[T]:[w[T]];for(let O=0,X=k.length;O<X;O++){const z=k[O],V=Array.isArray(z.value)?z.value:[z.value];for(let b=0,y=V.length;b<y;b++){const H=V[b],F=p(H),Y=E%P,K=Y%F.boundary,ye=Y+K;E+=K,ye!==0&&P-ye<F.storage&&(E+=P-ye),z.__data=new Float32Array(F.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=E,E+=F.storage}}}const v=E%P;return v>0&&(E+=P-v),M.__size=E,M.__cache={},this}function p(M){const w={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=48,w.storage=48):M.isMatrix4?(w.boundary=64,w.storage=64):M.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(w.boundary=16,w.storage=M.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",M),w}function R(M){const w=M.target;w.removeEventListener("dispose",R);const E=a.indexOf(w.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function C(){for(const M in r)n.deleteBuffer(r[M]);a=[],r={},s={}}return{bind:l,update:c,dispose:C}}const x0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let on=null;function S0(){return on===null&&(on=new Ah(x0,16,16,ei,pn),on.name="DFG_LUT",on.minFilter=Dt,on.magFilter=Dt,on.wrapS=yn,on.wrapT=yn,on.generateMipmaps=!1,on.needsUpdate=!0),on}class b0{constructor(e={}){const{canvas:t=th(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1,outputBufferType:d=Gt}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const x=d,g=new Set([ho,uo,co]),p=new Set([Gt,dn,Ji,Qi,oo,lo]),R=new Uint32Array(4),C=new Int32Array(4),M=new I;let w=null,E=null;const P=[],v=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=fn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let k=!1,O=null,X=null,z=null,V=null;this._outputColorSpace=qt;let b=0,y=0,H=null,F=-1,Y=null;const K=new mt,ye=new mt;let he=null;const nt=new Ye(0);let $e=0,et=t.width,j=t.height,ne=1,xe=null,ze=null;const we=new mt(0,0,et,j),Oe=new mt(0,0,et,j);let at=!1;const ie=new xo;let se=!1,ae=!1;const oe=new dt,ue=new I,Ne=new mt,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Be=!1;function Ve(){return H===null?ne:1}let D=i;function it(S,N){return t.getContext(S,N)}let Ze,A,_,B,q,J,le,ce,Q,te,de,Le,_e,pe,De,Ue,Ge,U,me,ee,ge,Me,re;try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ro}`),t.addEventListener("webglcontextlost",ht,!1),t.addEventListener("webglcontextrestored",rt,!1),t.addEventListener("webglcontextcreationerror",Zt,!1),D===null){const N="webgl2";if(D=it(N,S),D===null)throw it(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ie()}catch(S){throw t.removeEventListener("webglcontextlost",ht,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Zt,!1),je("WebGLRenderer: "+S.message),S}function Ie(){Ze=new Sm(D),Ze.init(),ge=new h0(D,Ze),A=new um(D,Ze,e,ge),_=new c0(D,Ze),A.reversedDepthBuffer&&f&&_.buffers.depth.setReversed(!0),X=D.createFramebuffer(),z=D.createFramebuffer(),V=D.createFramebuffer(),B=new ym(D),q=new Zg,J=new u0(D,Ze,_,q,A,ge,B),le=new xm(L),ce=new Ef(D),Me=new lm(D,ce),Q=new bm(D,ce,B,Me),te=new Em(D,Q,ce,Me,B),U=new wm(D,A,J),De=new hm(q),de=new $g(L,le,Ze,A,Me,De),Le=new _0(L,q),_e=new Jg,pe=new i0(Ze),Ge=new om(L,le,_,te,m,l),Ue=new l0(L,te,A),re=new v0(D,B,A,_),me=new cm(D,Ze,B),ee=new Mm(D,Ze,B),B.programs=de.programs,L.capabilities=A,L.extensions=Ze,L.properties=q,L.renderLists=_e,L.shadowMap=Ue,L.state=_,L.info=B}x!==Gt&&(T=new Tm(x,t.width,t.height,o,r,s));const Ce=new m0(L,D);this.xr=Ce,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const S=Ze.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Ze.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(S){S!==void 0&&(ne=S,this.setSize(et,j,!1))},this.getSize=function(S){return S.set(et,j)},this.setSize=function(S,N,$=!0){if(Ce.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}et=S,j=N,t.width=Math.floor(S*ne),t.height=Math.floor(N*ne),$===!0&&(t.style.width=S+"px",t.style.height=N+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(et*ne,j*ne).floor()},this.setDrawingBufferSize=function(S,N,$){et=S,j=N,ne=$,t.width=Math.floor(S*$),t.height=Math.floor(N*$),this.setViewport(0,0,S,N)},this.setEffects=function(S){if(x===Gt){je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let N=0;N<S.length;N++)if(S[N].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(K)},this.getViewport=function(S){return S.copy(we)},this.setViewport=function(S,N,$,G){S.isVector4?we.set(S.x,S.y,S.z,S.w):we.set(S,N,$,G),_.viewport(K.copy(we).multiplyScalar(ne).round())},this.getScissor=function(S){return S.copy(Oe)},this.setScissor=function(S,N,$,G){S.isVector4?Oe.set(S.x,S.y,S.z,S.w):Oe.set(S,N,$,G),_.scissor(ye.copy(Oe).multiplyScalar(ne).round())},this.getScissorTest=function(){return at},this.setScissorTest=function(S){_.setScissorTest(at=S)},this.setOpaqueSort=function(S){xe=S},this.setTransparentSort=function(S){ze=S},this.getClearColor=function(S){return S.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor(...arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha(...arguments)},this.clear=function(S=!0,N=!0,$=!0){let G=0;if(S){let W=!1;if(H!==null){const be=H.texture.format;W=g.has(be)}if(W){const be=H.texture.type,Ae=p.has(be),Se=Ge.getClearColor(),Te=Ge.getClearAlpha(),Pe=Se.r,We=Se.g,Ke=Se.b;Ae?(R[0]=Pe,R[1]=We,R[2]=Ke,R[3]=Te,D.clearBufferuiv(D.COLOR,0,R)):(C[0]=Pe,C[1]=We,C[2]=Ke,C[3]=Te,D.clearBufferiv(D.COLOR,0,C))}else G|=D.COLOR_BUFFER_BIT}N&&(G|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(G|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&D.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),O=S},this.dispose=function(){t.removeEventListener("webglcontextlost",ht,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Zt,!1),Ge.dispose(),_e.dispose(),pe.dispose(),q.dispose(),le.dispose(),te.dispose(),Me.dispose(),re.dispose(),de.dispose(),Ce.dispose(),Ce.removeEventListener("sessionstart",To),Ce.removeEventListener("sessionend",Ro),Vn.stop()};function ht(S){S.preventDefault(),Ho("WebGLRenderer: Context Lost."),k=!0}function rt(){Ho("WebGLRenderer: Context Restored."),k=!1;const S=B.autoReset,N=Ue.enabled,$=Ue.autoUpdate,G=Ue.needsUpdate,W=Ue.type;Ie(),B.autoReset=S,Ue.enabled=N,Ue.autoUpdate=$,Ue.needsUpdate=G,Ue.type=W}function Zt(S){je("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function rn(S){const N=S.target;N.removeEventListener("dispose",rn),du(N)}function du(S){pu(S),q.remove(S)}function pu(S){const N=q.get(S).programs;N!==void 0&&(N.forEach(function($){de.releaseProgram($)}),S.isShaderMaterial&&de.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,$,G,W,be){N===null&&(N=ke);const Ae=W.isMesh&&W.matrixWorld.determinantAffine()<0,Se=_u(S,N,$,G,W);_.setMaterial(G,Ae);let Te=$.index,Pe=1;if(G.wireframe===!0){if(Te=Q.getWireframeAttribute($),Te===void 0)return;Pe=2}const We=$.drawRange,Ke=$.attributes.position;let Re=We.start*Pe,st=(We.start+We.count)*Pe;be!==null&&(Re=Math.max(Re,be.start*Pe),st=Math.min(st,(be.start+be.count)*Pe)),Te!==null?(Re=Math.max(Re,0),st=Math.min(st,Te.count)):Ke!=null&&(Re=Math.max(Re,0),st=Math.min(st,Ke.count));const xt=st-Re;if(xt<0||xt===1/0)return;Me.setup(W,G,Se,$,Te);let pt,ct=me;if(Te!==null&&(pt=ce.get(Te),ct=ee,ct.setIndex(pt)),W.isMesh)G.wireframe===!0?(_.setLineWidth(G.wireframeLinewidth*Ve()),ct.setMode(D.LINES)):ct.setMode(D.TRIANGLES);else if(W.isLine){let Ct=G.linewidth;Ct===void 0&&(Ct=1),_.setLineWidth(Ct*Ve()),W.isLineSegments?ct.setMode(D.LINES):W.isLineLoop?ct.setMode(D.LINE_LOOP):ct.setMode(D.LINE_STRIP)}else W.isPoints?ct.setMode(D.POINTS):W.isSprite&&ct.setMode(D.TRIANGLES);if(W.isBatchedMesh)if(Ze.get("WEBGL_multi_draw"))ct.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Ct=W._multiDrawStarts,Ee=W._multiDrawCounts,It=W._multiDrawCount,tt=Te?ce.get(Te).bytesPerElement:1,Wt=q.get(G).currentProgram.getUniforms();for(let sn=0;sn<It;sn++)Wt.setValue(D,"_gl_DrawID",sn),ct.render(Ct[sn]/tt,Ee[sn])}else if(W.isInstancedMesh)ct.renderInstances(Re,xt,W.count);else if($.isInstancedBufferGeometry){const Ct=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Ee=Math.min($.instanceCount,Ct);ct.renderInstances(Re,xt,Ee)}else ct.render(Re,xt)};function Ao(S,N,$,G){O!==null&&S.isNodeMaterial&&O.setObject(G,S),se===!0&&De.setState(S,$,!1),S.transparent===!0&&S.side===jt&&S.forceSinglePass===!1?(S.side=zt,S.needsUpdate=!0,lr(S,N,G),S.side=On,S.needsUpdate=!0,lr(S,N,G),S.side=jt):lr(S,N,G)}this.compile=function(S,N,$=null){$===null&&($=S),O!==null&&O.renderStart(S,N,$),E=pe.get($),E.init(N),v.push(E),$.traverseVisible(function(W){W.isLight&&W.layers.test(N.layers)&&(E.pushLight(W),W.castShadow&&E.pushShadow(W))}),S!==$&&S.traverseVisible(function(W){W.isLight&&W.layers.test(N.layers)&&(E.pushLight(W),W.castShadow&&E.pushShadow(W))}),E.setupLights(),O!==null&&O.updateLights(E.state.lightsArray),ae=this.localClippingEnabled,se=De.init(this.clippingPlanes,ae),se===!0&&De.setGlobalState(this.clippingPlanes,N),O!==null&&Ue.render(E.state.shadowsArray,$,N);const G=new Set;return S.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const be=W.material;if(be)if(Array.isArray(be))for(let Ae=0;Ae<be.length;Ae++){const Se=be[Ae];Ao(Se,$,N,W),G.add(Se)}else Ao(be,$,N,W),G.add(be)}),E=v.pop(),O!==null&&O.renderEnd(),G},this.compileAsync=function(S,N,$=null){const G=this.compile(S,N,$);return new Promise(W=>{function be(){if(G.forEach(function(Ae){const Te=q.get(Ae).currentProgram;(Te===void 0||Te.isReady())&&G.delete(Ae)}),G.size===0){W(S);return}setTimeout(be,10)}Ze.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let ds=null;function mu(S){ds&&ds(S)}function To(){Vn.stop()}function Ro(){Vn.start()}const Vn=new Gc;Vn.setAnimationLoop(mu),typeof self<"u"&&Vn.setContext(self),this.setAnimationLoop=function(S){ds=S,Ce.setAnimationLoop(S),S===null?Vn.stop():Vn.start()},Ce.addEventListener("sessionstart",To),Ce.addEventListener("sessionend",Ro),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;O!==null&&O.renderStart(S,N);const $=Ce.enabled===!0&&Ce.isPresenting===!0,G=T!==null&&(H===null||$)&&T.begin(L,H);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Ce.enabled===!0&&Ce.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Ce.cameraAutoUpdate===!0&&Ce.updateCamera(N),N=Ce.getCamera()),S.isScene===!0&&S.onBeforeRender(L,S,N,H),E=pe.get(S,v.length),E.init(N),E.state.textureUnits=J.getTextureUnits(),v.push(E),oe.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),ie.setFromProjectionMatrix(oe,hn,N.reversedDepth),ae=this.localClippingEnabled,se=De.init(this.clippingPlanes,ae),w=_e.get(S,P.length),w.init(),P.push(w),Ce.enabled===!0&&Ce.isPresenting===!0){const Ae=L.xr.getDepthSensingMesh();Ae!==null&&ps(Ae,N,-1/0,L.sortObjects)}ps(S,N,0,L.sortObjects),w.finish(),O!==null&&O.updateLights(E.state.lightsArray),L.sortObjects===!0&&w.sort(xe,ze),Be=Ce.enabled===!1||Ce.isPresenting===!1||Ce.hasDepthSensing()===!1,Be&&Ge.addToRenderList(w,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),se===!0&&De.beginShadows();const W=E.state.shadowsArray;if(Ue.render(W,S,N),se===!0&&De.endShadows(),(G&&T.hasRenderPass())===!1){const Ae=w.opaque,Se=w.transmissive;if(E.setupLights(),N.isArrayCamera){const Te=N.cameras;if(Se.length>0)for(let Pe=0,We=Te.length;Pe<We;Pe++){const Ke=Te[Pe];Po(Ae,Se,S,Ke)}Be&&Ge.render(S);for(let Pe=0,We=Te.length;Pe<We;Pe++){const Ke=Te[Pe];Co(w,S,Ke,Ke.viewport)}}else Se.length>0&&Po(Ae,Se,S,N),Be&&Ge.render(S),Co(w,S,N)}H!==null&&y===0&&(J.updateMultisampleRenderTarget(H),J.updateRenderTargetMipmap(H)),G&&T.end(L),S.isScene===!0&&S.onAfterRender(L,S,N),Me.resetDefaultState(),F=-1,Y=null,v.pop(),v.length>0?(E=v[v.length-1],J.setTextureUnits(E.state.textureUnits),se===!0&&De.setGlobalState(L.clippingPlanes,E.state.camera)):E=null,P.pop(),P.length>0?w=P[P.length-1]:w=null,O!==null&&O.renderEnd()};function ps(S,N,$,G){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)$=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLightProbeGrid)E.pushLightProbeGrid(S);else if(S.isLight)E.pushLight(S),S.castShadow&&E.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||S.intersectsFrustum(ie)){G&&Ne.setFromMatrixPosition(S.matrixWorld).applyMatrix4(oe);const Ae=te.update(S),Se=S.material;Se.visible&&w.push(S,Ae,Se,$,Ne.z,null,N)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||S.intersectsFrustum(ie))){const Ae=te.update(S),Se=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ne.copy(S.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Ne.copy(Ae.boundingSphere.center)),Ne.applyMatrix4(S.matrixWorld).applyMatrix4(oe)),Array.isArray(Se)){const Te=Ae.groups;for(let Pe=0,We=Te.length;Pe<We;Pe++){const Ke=Te[Pe],Re=Se[Ke.materialIndex];Re&&Re.visible&&w.push(S,Ae,Re,$,Ne.z,Ke,N)}}else Se.visible&&w.push(S,Ae,Se,$,Ne.z,null,N)}}const be=S.children;for(let Ae=0,Se=be.length;Ae<Se;Ae++)ps(be[Ae],N,$,G)}function Co(S,N,$,G){const{opaque:W,transmissive:be,transparent:Ae}=S;E.setupLightsView($),se===!0&&De.setGlobalState(L.clippingPlanes,$),G&&_.viewport(K.copy(G)),W.length>0&&or(W,N,$),be.length>0&&or(be,N,$),Ae.length>0&&or(Ae,N,$),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Po(S,N,$,G){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[G.id]===void 0){const Re=Ze.has("EXT_color_buffer_half_float")||Ze.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[G.id]=new tn(1,1,{generateMipmaps:!0,type:Re?pn:Gt,minFilter:Zn,samples:Math.max(4,A.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Qe.workingColorSpace})}const be=E.state.transmissionRenderTarget[G.id],Ae=G.viewport||K;be.setSize(Ae.z*L.transmissionResolutionScale,Ae.w*L.transmissionResolutionScale);const Se=L.getRenderTarget(),Te=L.getActiveCubeFace(),Pe=L.getActiveMipmapLevel();L.setRenderTarget(be),L.getClearColor(nt),$e=L.getClearAlpha(),$e<1&&L.setClearColor(16777215,.5),L.clear(),Be&&Ge.render($);const We=L.toneMapping;L.toneMapping=fn;const Ke=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),E.setupLightsView(G),se===!0&&De.setGlobalState(L.clippingPlanes,G),or(S,$,G),J.updateMultisampleRenderTarget(be),J.updateRenderTargetMipmap(be),Ze.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let st=0,xt=N.length;st<xt;st++){const pt=N[st],{object:ct,geometry:Ct,material:Ee,group:It}=pt;if(Ee.side===jt&&ct.layers.test(G.layers)){const tt=Ee.side;Ee.side=zt,Ee.needsUpdate=!0,Lo(ct,$,G,Ct,Ee,It),Ee.side=tt,Ee.needsUpdate=!0,Re=!0}}Re===!0&&(J.updateMultisampleRenderTarget(be),J.updateRenderTargetMipmap(be))}L.setRenderTarget(Se,Te,Pe),L.setClearColor(nt,$e),Ke!==void 0&&(G.viewport=Ke),L.toneMapping=We}function or(S,N,$){const G=N.isScene===!0?N.overrideMaterial:null;for(let W=0,be=S.length;W<be;W++){const Ae=S[W],{object:Se,geometry:Te,group:Pe}=Ae;let We=Ae.material;We.allowOverride===!0&&G!==null&&(We=G),Se.layers.test($.layers)&&Lo(Se,N,$,Te,We,Pe)}}function Lo(S,N,$,G,W,be){O!==null&&W.isNodeMaterial&&O.setObject(S,W),S.onBeforeRender(L,N,$,G,W,be),S.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),W.onBeforeRender(L,N,$,G,S,be),W.transparent===!0&&W.side===jt&&W.forceSinglePass===!1?(W.side=zt,W.needsUpdate=!0,L.renderBufferDirect($,N,G,W,S,be),W.side=On,W.needsUpdate=!0,L.renderBufferDirect($,N,G,W,S,be),W.side=jt):L.renderBufferDirect($,N,G,W,S,be),S.onAfterRender(L,N,$,G,W,be)}function lr(S,N,$){N.isScene!==!0&&(N=ke);const G=q.get(S),W=E.state.lights,be=E.state.shadowsArray,Ae=W.state.version,Se=de.getParameters(S,W.state,be,N,$,E.state.lightProbeGridArray),Te=de.getProgramCacheKey(Se);let Pe=G.programs;G.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?N.environment:null,G.fog=N.fog;const We=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;G.envMap=le.get(S.envMap||G.environment,We),G.envMapRotation=G.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,Pe===void 0&&(S.addEventListener("dispose",rn),Pe=new Map,G.programs=Pe);let Ke=Pe.get(Te);if(Ke!==void 0){if(G.currentProgram===Ke&&G.lightsStateVersion===Ae)return Io(S,Se),Ke}else Se.uniforms=de.getUniforms(S),O!==null&&S.isNodeMaterial&&O.build(S,$,Se),S.onBeforeCompile(Se,L),Ke=de.acquireProgram(Se,Te),Pe.set(Te,Ke),G.uniforms=Se.uniforms;const Re=G.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Re.clippingPlanes=De.uniform),Io(S,Se),G.needsLights=xu(S),G.lightsStateVersion=Ae,G.needsLights&&(Re.ambientLightColor.value=W.state.ambient,Re.lightProbe.value=W.state.probe,Re.sunLights.value=W.state.sun,Re.sunLightShadows.value=W.state.sunShadow,Re.directionalLights.value=W.state.directional,Re.directionalLightShadows.value=W.state.directionalShadow,Re.spotLights.value=W.state.spot,Re.spotLightShadows.value=W.state.spotShadow,Re.rectAreaLights.value=W.state.rectArea,Re.ltc_1.value=W.state.rectAreaLTC1,Re.ltc_2.value=W.state.rectAreaLTC2,Re.pointLights.value=W.state.point,Re.pointLightShadows.value=W.state.pointShadow,Re.hemisphereLights.value=W.state.hemi,Re.sunShadowMatrix.value=W.state.sunShadowMatrix,Re.sunShadowCascade.value=W.state.sunShadowCascade,Re.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Re.spotLightMatrix.value=W.state.spotLightMatrix,Re.spotLightMap.value=W.state.spotLightMap,Re.pointShadowMatrix.value=W.state.pointShadowMatrix),G.lightProbeGrid=E.state.lightProbeGridArray.length>0,G.currentProgram=Ke,G.uniformsList=null,Ke}function Do(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=Wr.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function Io(S,N){const $=q.get(S);$.outputColorSpace=N.outputColorSpace,$.batching=N.batching,$.batchingColor=N.batchingColor,$.instancing=N.instancing,$.instancingColor=N.instancingColor,$.instancingMorph=N.instancingMorph,$.skinning=N.skinning,$.morphTargets=N.morphTargets,$.morphNormals=N.morphNormals,$.morphColors=N.morphColors,$.morphTargetsCount=N.morphTargetsCount,$.numClippingPlanes=N.numClippingPlanes,$.numIntersection=N.numClipIntersection,$.vertexAlphas=N.vertexAlphas,$.vertexTangents=N.vertexTangents,$.toneMapping=N.toneMapping}function gu(S,N){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;M.setFromMatrixPosition(N.matrixWorld);for(let $=0,G=S.length;$<G;$++){const W=S[$];if(W.texture!==null&&W.boundingBox.containsPoint(M))return W}return null}function _u(S,N,$,G,W){N.isScene!==!0&&(N=ke),J.resetTextureUnits();const be=N.fog,Ae=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?N.environment:null,Se=H===null?L.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:Qe.workingColorSpace,Te=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Pe=le.get(G.envMap||Ae,Te),We=G.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Ke=!!$.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Re=!!$.morphAttributes.position,st=!!$.morphAttributes.normal,xt=!!$.morphAttributes.color;let pt=fn;G.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(pt=L.toneMapping);const ct=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Ct=ct!==void 0?ct.length:0,Ee=q.get(G),It=E.state.lights;if(se===!0&&(ae===!0||S!==Y)){const ft=S===Y&&G.id===F;De.setState(G,S,ft)}let tt=!1;G.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==It.state.version||Ee.outputColorSpace!==Se||W.isBatchedMesh&&Ee.batching===!1||!W.isBatchedMesh&&Ee.batching===!0||W.isBatchedMesh&&Ee.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&Ee.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&Ee.instancing===!1||!W.isInstancedMesh&&Ee.instancing===!0||W.isSkinnedMesh&&Ee.skinning===!1||!W.isSkinnedMesh&&Ee.skinning===!0||W.isInstancedMesh&&Ee.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ee.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ee.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ee.instancingMorph===!1&&W.morphTexture!==null||Ee.envMap!==Pe||G.fog===!0&&Ee.fog!==be||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==De.numPlanes||Ee.numIntersection!==De.numIntersection)||Ee.vertexAlphas!==We||Ee.vertexTangents!==Ke||Ee.morphTargets!==Re||Ee.morphNormals!==st||Ee.morphColors!==xt||Ee.toneMapping!==pt||Ee.morphTargetsCount!==Ct||!!Ee.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(tt=!0):(tt=!0,Ee.__version=G.version);let Wt=Ee.currentProgram;tt===!0&&(Wt=lr(G,N,W),O&&G.isNodeMaterial&&O.onUpdateProgram(G,Wt,Ee));let sn=!1,Rn=!1,ri=!1;const lt=Wt.getUniforms(),_t=Ee.uniforms;if(_.useProgram(Wt.program)&&(sn=!0,Rn=!0,ri=!0),G.id!==F&&(F=G.id,Rn=!0),Ee.needsLights){const ft=gu(E.state.lightProbeGridArray,W);Ee.lightProbeGrid!==ft&&(Ee.lightProbeGrid=ft,Rn=!0)}if(sn||Y!==S){_.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),lt.setValue(D,"projectionMatrix",S.projectionMatrix),lt.setValue(D,"viewMatrix",S.matrixWorldInverse);const Pn=lt.map.cameraPosition;Pn!==void 0&&Pn.setValue(D,ue.setFromMatrixPosition(S.matrixWorld)),A.logarithmicDepthBuffer&&lt.setValue(D,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&lt.setValue(D,"isOrthographic",S.isOrthographicCamera===!0),Y!==S&&(Y=S,Rn=!0,ri=!0)}if(Ee.needsLights&&(It.state.sunShadowMap.length>0&&lt.setValue(D,"sunShadowMap",It.state.sunShadowMap,J),It.state.directionalShadowMap.length>0&&lt.setValue(D,"directionalShadowMap",It.state.directionalShadowMap,J),It.state.spotShadowMap.length>0&&lt.setValue(D,"spotShadowMap",It.state.spotShadowMap,J),It.state.pointShadowMap.length>0&&lt.setValue(D,"pointShadowMap",It.state.pointShadowMap,J)),W.isSkinnedMesh){lt.setOptional(D,W,"bindMatrix"),lt.setOptional(D,W,"bindMatrixInverse");const ft=W.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),lt.setValue(D,"boneTexture",ft.boneTexture,J))}W.isBatchedMesh&&(lt.setOptional(D,W,"batchingTexture"),lt.setValue(D,"batchingTexture",W._matricesTexture,J),lt.setOptional(D,W,"batchingIdTexture"),lt.setValue(D,"batchingIdTexture",W._indirectTexture,J),lt.setOptional(D,W,"batchingColorTexture"),W._colorsTexture!==null&&lt.setValue(D,"batchingColorTexture",W._colorsTexture,J));const Cn=$.morphAttributes;if((Cn.position!==void 0||Cn.normal!==void 0||Cn.color!==void 0)&&U.update(W,$,Wt),(Rn||Ee.receiveShadow!==W.receiveShadow)&&(Ee.receiveShadow=W.receiveShadow,lt.setValue(D,"receiveShadow",W.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&N.environment!==null&&(_t.envMapIntensity.value=N.environmentIntensity),_t.dfgLUT!==void 0&&(_t.dfgLUT.value=S0()),Rn){if(lt.setValue(D,"toneMappingExposure",L.toneMappingExposure),Ee.needsLights&&vu(_t,ri),be&&G.fog===!0&&Le.refreshFogUniforms(_t,be),Le.refreshMaterialUniforms(_t,G,ne,j,E.state.transmissionRenderTarget[S.id]),Ee.needsLights&&Ee.lightProbeGrid){const ft=Ee.lightProbeGrid;_t.probesSH.value=ft.texture,_t.probesMin.value.copy(ft.boundingBox.min),_t.probesMax.value.copy(ft.boundingBox.max),_t.probesResolution.value.copy(ft.resolution)}Wr.upload(D,Do(Ee),_t,J)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Wr.upload(D,Do(Ee),_t,J),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&lt.setValue(D,"center",W.center),lt.setValue(D,"modelViewMatrix",W.modelViewMatrix),lt.setValue(D,"normalMatrix",W.normalMatrix),lt.setValue(D,"modelMatrix",W.matrixWorld),G.uniformsGroups!==void 0){const ft=G.uniformsGroups;for(let Pn=0,si=ft.length;Pn<si;Pn++){const No=ft[Pn];re.update(No,Wt),re.bind(No,Wt)}}return Wt}function vu(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.sunLights.needsUpdate=N,S.sunLightShadows.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function xu(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(S,N,$){const G=q.get(S);G.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),q.get(S.texture).__webglTexture=N,q.get(S.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:$,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,N){const $=q.get(S);$.__webglFramebuffer=N,$.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(S,N=0,$=0){H=S,b=N,y=$;let G=null,W=!1,be=!1;if(S){const Se=q.get(S);if(Se.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(D.FRAMEBUFFER,Se.__webglFramebuffer),K.copy(S.viewport),ye.copy(S.scissor),he=S.scissorTest,_.viewport(K),_.scissor(ye),_.setScissorTest(he),F=-1;return}else if(Se.__webglFramebuffer===void 0)J.setupRenderTarget(S);else if(Se.__hasExternalTextures)J.rebindTextures(S,q.get(S.texture).__webglTexture,q.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const We=S.depthTexture;if(Se.__boundDepthTexture!==We){if(We!==null&&q.has(We)&&(S.width!==We.image.width||S.height!==We.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(S)}}const Te=S.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(be=!0);const Pe=q.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Pe[N])?G=Pe[N][$]:G=Pe[N],W=!0):S.samples>0&&J.useMultisampledRTT(S)===!1?G=q.get(S).__webglMultisampledFramebuffer:Array.isArray(Pe)?G=Pe[$]:G=Pe,K.copy(S.viewport),ye.copy(S.scissor),he=S.scissorTest}else K.copy(we).multiplyScalar(ne).floor(),ye.copy(Oe).multiplyScalar(ne).floor(),he=at;if($!==0&&(G=X),_.bindFramebuffer(D.FRAMEBUFFER,G)&&_.drawBuffers(S,G),_.viewport(K),_.scissor(ye),_.setScissorTest(he),W){const Se=q.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+N,Se.__webglTexture,$)}else if(be){const Se=N;for(let Te=0;Te<S.textures.length;Te++){const Pe=q.get(S.textures[Te]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Te,Pe.__webglTexture,$,Se)}}else if(S!==null&&$!==0){const Se=q.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Se.__webglTexture,$)}F=-1};function ko(S){const N=q.get(S);return(N.__readFormat!==S.format||N.__readType!==S.type)&&(N.__readFormat=S.format,N.__readType=S.type,N.__formatReadable=A.textureFormatReadable(S.format),N.__typeReadable=A.textureTypeReadable(S.type)),N}this.readRenderTargetPixels=function(S,N,$,G,W,be,Ae,Se=0){if(!(S&&S.isWebGLRenderTarget)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=q.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Ae!==void 0&&(Te=Te[Ae]),Te){_.bindFramebuffer(D.FRAMEBUFFER,Te);try{const Pe=S.textures[Se],We=Pe.format,Ke=Pe.type;S.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Se);const Re=ko(Pe);if(Re.__formatReadable===!1){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Re.__typeReadable===!1){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-G&&$>=0&&$<=S.height-W&&D.readPixels(N,$,G,W,ge.convert(We),ge.convert(Ke),be)}finally{const Pe=H!==null?q.get(H).__webglFramebuffer:null;_.bindFramebuffer(D.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(S,N,$,G,W,be,Ae,Se=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=q.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Ae!==void 0&&(Te=Te[Ae]),Te)if(N>=0&&N<=S.width-G&&$>=0&&$<=S.height-W){_.bindFramebuffer(D.FRAMEBUFFER,Te);const Pe=S.textures[Se],We=Pe.format,Ke=Pe.type;S.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Se);const Re=ko(Pe);if(Re.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Re.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const st=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,st),D.bufferData(D.PIXEL_PACK_BUFFER,be.byteLength,D.STREAM_READ),D.readPixels(N,$,G,W,ge.convert(We),ge.convert(Ke),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);const xt=H!==null?q.get(H).__webglFramebuffer:null;_.bindFramebuffer(D.FRAMEBUFFER,xt);const pt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await nh(D,pt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,st),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,be),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(st),D.deleteSync(pt),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,N=null,$=0){const G=Math.pow(2,-$),W=Math.floor(S.image.width*G),be=Math.floor(S.image.height*G),Ae=N!==null?N.x:0,Se=N!==null?N.y:0;J.setTexture2D(S,0),D.copyTexSubImage2D(D.TEXTURE_2D,$,0,0,Ae,Se,W,be),_.unbindTexture()},this.copyTextureToTexture=function(S,N,$=null,G=null,W=0,be=0){let Ae,Se,Te,Pe,We,Ke,Re,st,xt;const pt=S.isCompressedTexture?S.mipmaps[be]:S.image;if($!==null)Ae=$.max.x-$.min.x,Se=$.max.y-$.min.y,Te=$.isBox3?$.max.z-$.min.z:1,Pe=$.min.x,We=$.min.y,Ke=$.isBox3?$.min.z:0;else{const _t=Math.pow(2,-W);Ae=Math.floor(pt.width*_t),Se=Math.floor(pt.height*_t),S.isDataArrayTexture?Te=pt.depth:S.isData3DTexture?Te=Math.floor(pt.depth*_t):Te=1,Pe=0,We=0,Ke=0}G!==null?(Re=G.x,st=G.y,xt=G.z):(Re=0,st=0,xt=0);const ct=ge.convert(N.format),Ct=ge.convert(N.type);let Ee;N.isData3DTexture?(J.setTexture3D(N,0),Ee=D.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(J.setTexture2DArray(N,0),Ee=D.TEXTURE_2D_ARRAY):(J.setTexture2D(N,0),Ee=D.TEXTURE_2D),_.activeTexture(D.TEXTURE0),_.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,N.flipY),_.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),_.pixelStorei(D.UNPACK_ALIGNMENT,N.unpackAlignment);const It=_.getParameter(D.UNPACK_ROW_LENGTH),tt=_.getParameter(D.UNPACK_IMAGE_HEIGHT),Wt=_.getParameter(D.UNPACK_SKIP_PIXELS),sn=_.getParameter(D.UNPACK_SKIP_ROWS),Rn=_.getParameter(D.UNPACK_SKIP_IMAGES);_.pixelStorei(D.UNPACK_ROW_LENGTH,pt.width),_.pixelStorei(D.UNPACK_IMAGE_HEIGHT,pt.height),_.pixelStorei(D.UNPACK_SKIP_PIXELS,Pe),_.pixelStorei(D.UNPACK_SKIP_ROWS,We),_.pixelStorei(D.UNPACK_SKIP_IMAGES,Ke);const ri=S.isDataArrayTexture||S.isData3DTexture,lt=N.isDataArrayTexture||N.isData3DTexture;if(S.isDepthTexture){const _t=q.get(S),Cn=q.get(N),ft=q.get(_t.__renderTarget),Pn=q.get(Cn.__renderTarget);_.bindFramebuffer(D.READ_FRAMEBUFFER,ft.__webglFramebuffer),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,Pn.__webglFramebuffer);for(let si=0;si<Te;si++)ri&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,q.get(S).__webglTexture,W,Ke+si),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,q.get(N).__webglTexture,be,xt+si)),D.blitFramebuffer(Pe,We,Ae,Se,Re,st,Ae,Se,D.DEPTH_BUFFER_BIT,D.NEAREST);_.bindFramebuffer(D.READ_FRAMEBUFFER,null),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(W!==0||S.isRenderTargetTexture||q.has(S)){const _t=q.get(S),Cn=q.get(N);_.bindFramebuffer(D.READ_FRAMEBUFFER,z),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,V);for(let ft=0;ft<Te;ft++)ri?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,_t.__webglTexture,W,Ke+ft):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,_t.__webglTexture,W),lt?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Cn.__webglTexture,be,xt+ft):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Cn.__webglTexture,be),W!==0?D.blitFramebuffer(Pe,We,Ae,Se,Re,st,Ae,Se,D.COLOR_BUFFER_BIT,D.NEAREST):lt?D.copyTexSubImage3D(Ee,be,Re,st,xt+ft,Pe,We,Ae,Se):D.copyTexSubImage2D(Ee,be,Re,st,Pe,We,Ae,Se);_.bindFramebuffer(D.READ_FRAMEBUFFER,null),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else lt?S.isDataTexture||S.isData3DTexture?D.texSubImage3D(Ee,be,Re,st,xt,Ae,Se,Te,ct,Ct,pt.data):N.isCompressedArrayTexture?D.compressedTexSubImage3D(Ee,be,Re,st,xt,Ae,Se,Te,ct,pt.data):D.texSubImage3D(Ee,be,Re,st,xt,Ae,Se,Te,ct,Ct,pt):S.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,be,Re,st,Ae,Se,ct,Ct,pt.data):S.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,be,Re,st,pt.width,pt.height,ct,pt.data):D.texSubImage2D(D.TEXTURE_2D,be,Re,st,Ae,Se,ct,Ct,pt);_.pixelStorei(D.UNPACK_ROW_LENGTH,It),_.pixelStorei(D.UNPACK_IMAGE_HEIGHT,tt),_.pixelStorei(D.UNPACK_SKIP_PIXELS,Wt),_.pixelStorei(D.UNPACK_SKIP_ROWS,sn),_.pixelStorei(D.UNPACK_SKIP_IMAGES,Rn),be===0&&N.generateMipmaps&&D.generateMipmap(Ee),_.unbindTexture()},this.initRenderTarget=function(S){q.get(S).__webglFramebuffer===void 0&&J.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?J.setTextureCube(S,0):S.isData3DTexture?J.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?J.setTexture2DArray(S,0):J.setTexture2D(S,0),_.unbindTexture()},this.resetState=function(){b=0,y=0,H=null,_.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}const ut=n=>({value:n,unit:"mm"});function Ht(n,e,t,i={},r=[]){return{id:n,type:e,params:i,content:r,meta:{name:t}}}const ln=n=>JSON.parse(JSON.stringify(n));function Ci(n){return n.content.flatMap(e=>[e,...Ci(e)])}const wt=n=>[n,...Ci(n)];function Et(n,e){return wt(n).find(t=>t.id===e)}function is(n,e){return wt(n).find(t=>t.content.some(i=>i.id===e))}function zn(n,e){if(n.id===e)return[n];for(const t of n.content){const i=zn(t,e);if(i.length)return[n,...i]}return[]}const Vt=n=>n.meta.verworfen===!0,qe=n=>n&&typeof n=="object"?n.value:0;function Jc(n,e){const t=new Set(wt(n).map(r=>r.id));if(!t.has(e))return e;let i=2;for(;t.has(`${e}-${i}`);)i+=1;return`${e}-${i}`}const Qc={bohrungen:{durchmesser:6},steg:{hoehe:30}};function M0(){return Ht("halter","teil","Halter",{material:"PLA"},[Ht("skizze","skizze","Skizze",{ebene:"XY",laenge:ut(80),breite:ut(50),eckradius:ut(3)}),Ht("grundplatte","extrusion","Grundplatte",{laenge:ut(80),breite:ut(50),dicke:ut(8),eckradius:ut(3)}),Ht("steg","extrusion","Steg",{laenge:ut(60),breite:ut(10),hoehe:ut(30),lage_y:ut(20)}),Ht("bohrungen","bohrung","Bohrungen",{durchmesser:ut(6),abstand_x:ut(25),lage_y:ut(-7.5)})])}function y0(){return Ht("sensorgehaeuse","baugruppe","Sensorgehäuse",{},[Ht("baugruppe-1","baugruppe","Baugruppe 1",{},[Ht("gehaeuse","teil","Gehäuse",{material:"PLA",lage_x:ut(0)},[Ht("schale","schale","Schale",{laenge:ut(80),breite:ut(50),hoehe:ut(30),wand:ut(2)})])]),Ht("deckel","teil","Deckel",{material:"PLA",lage_x:ut(100)},[Ht("platte","extrusion","Platte",{laenge:ut(80),breite:ut(50),hoehe:ut(4)})])])}const w0=()=>Ht("teil-1","teil","Teil 1",{material:"PLA"},[]),jc=n=>Ht("projekt","projekt","Projekt",{},n),yo=()=>jc([M0(),y0()]),Xl=()=>jc([w0()]),E0=.00124,A0=1-Math.PI/4,ql=50,Yl=n=>!!n&&!Vt(n);function rs(n){const e=[];for(const t of wt(n))Vt(t)||(t.type==="bohrung"&&qe(t.params.durchmesser)>=ql&&e.push({elementId:t.id,schluessel:"befund.bohrung-zu-gross",parameter:"durchmesser",wert:qe(t.params.durchmesser),grenze:ql}),t.id==="steg"&&qe(t.params.hoehe)<=0&&e.push({elementId:t.id,schluessel:"befund.steg-ohne-hoehe",parameter:"hoehe",wert:qe(t.params.hoehe),grenze:0}));return e}function $l(n,e,t){return t.has(n.id)?Qc[n.id]?.[e]??qe(n.params[e]):qe(n.params[e])}function T0(n,e,t,i){const r=qe(n.params.laenge),s=qe(n.params.breite),a=qe(n.params.lage_y);return{min:[e[0]-r/2,e[1]+a-s/2,e[2]+t],max:[e[0]+r/2,e[1]+a+s/2,e[2]+t+i]}}function Fn(n){const e=new Set(rs(n).map(u=>u.elementId)),t=[];let i=0;const r=u=>[qe(u.params.lage_x),qe(u.params.lage_y),0];function s(u,h){const f=u.content.filter(m=>Yl(m));let d=0;for(const m of f)if(m.type==="skizze"){const x=qe(m.params.laenge),g=qe(m.params.breite);t.push({elementId:m.id,art:"skizze",min:[h[0]-x/2,h[1]-g/2,0],max:[h[0]+x/2,h[1]+g/2,0],platte:{laenge:x,breite:g,dicke:0,eckradius:qe(m.params.eckradius),loecher:[],lochD:0}})}for(const m of f)if(m.type==="extrusion"&&m.params.dicke!==void 0){const x=m.id==="grundplatte",g=qe(m.params.dicke),p=qe(m.params.laenge),R=qe(m.params.breite),C=qe(m.params.eckradius),M=h[1]+qe(m.params.lage_y);x&&(d=g);const w=x?f.find(L=>L.type==="bohrung"):void 0,E=w?$l(w,"durchmesser",e):0,P=w?qe(w.params.abstand_x):0,v=w?qe(w.params.lage_y):0,T=w?[{x:h[0]+P,y:M+v},{x:h[0]-P,y:M+v}]:[];if(t.push({elementId:m.id,art:"platte",min:[h[0]-p/2,M-R/2,h[2]],max:[h[0]+p/2,M+R/2,h[2]+g],platte:{laenge:p,breite:R,dicke:g,eckradius:C,loecher:T,lochD:E}}),i+=(p*R-4*C*C*A0)*g,w){i-=T.length*Math.PI*(E/2)**2*g;for(const L of T)t.push({elementId:w.id,art:"rohr",min:[L.x-E/2,L.y-E/2,h[2]],max:[L.x+E/2,L.y+E/2,h[2]+g],rohr:{x:L.x,y:L.y,d:E}})}}for(const m of f)if(m.type==="extrusion"&&m.params.dicke===void 0){const x=m.params.hoehe!==void 0?$l(m,"hoehe",e):0,g=T0(m,h,d,x);t.push({elementId:m.id,art:"quader",min:g.min,max:g.max}),i+=qe(m.params.laenge)*qe(m.params.breite)*x}else if(m.type==="schale"){const x=qe(m.params.laenge),g=qe(m.params.breite),p=qe(m.params.hoehe),R=qe(m.params.wand);t.push({elementId:m.id,art:"schale",min:[h[0]-x/2,h[1]-g/2,h[2]],max:[h[0]+x/2,h[1]+g/2,h[2]+p],wand:R}),i+=x*g*p-(x-2*R)*(g-2*R)*(p-R)}}const a=wt(n).filter(u=>u.type==="teil"&&Yl(u)),o=new Set;for(const u of a)R0(n,u)||(o.add(u.id),s(u,r(u)));const l=[0,0,0],c=t.filter(u=>u.art!=="skizze"&&u.art!=="rohr");if(c.length)for(let u=0;u<3;u++)l[u]=Math.max(...c.map(h=>h.max[u]))-Math.min(...c.map(h=>h.min[u]));return{koerper:t,volumen_mm3:i,masse_g:i*E0,abmessungen_mm:l,befunde:rs(n)}}function R0(n,e){for(const t of wt(n))if(Vt(t)&&Ci(t).some(i=>i.id===e.id))return!0;return!1}function Zl(n,e){const t=new Set([n.id,...Ci(n).map(o=>o.id)]),i=e.filter(o=>t.has(o.elementId)&&o.art!=="skizze"),r=i.length?i:e.filter(o=>t.has(o.elementId));if(!r.length)return null;const s=[1/0,1/0,1/0],a=[-1/0,-1/0,-1/0];for(const o of r)for(let l=0;l<3;l++)s[l]=Math.min(s[l],o.min[l]),a[l]=Math.max(a[l],o.max[l]);return{min:s,max:a}}const C0=JSON.parse('[{"id":"element.anlegen","familie":"Datei","titel":"befehl.element.anlegen","parameter":{"typ":{"typ":"wahl"}},"bezug":"keine","rang":101,"wesentlich":true,"untergruppe":"Neu","kontext":true},{"id":"dokument.oeffnen","familie":"Datei","titel":"befehl.dokument.oeffnen","parameter":{},"bezug":"keine","rang":102,"wesentlich":true,"untergruppe":"Öffnen","folgt":true},{"id":"wurzel.setzen","familie":"Datei","titel":"befehl.wurzel.setzen","parameter":{},"bezug":"element","rang":103,"wesentlich":true,"untergruppe":"Öffnen","folgt":true},{"id":"einstellungen.oeffnen","familie":"Datei","titel":"befehl.einstellungen.oeffnen","parameter":{},"bezug":"keine","rang":104,"wesentlich":true,"untergruppe":"Projekt","folgt":true},{"id":"dokument.schliessen","familie":"Datei","titel":"befehl.dokument.schliessen","parameter":{},"bezug":"keine","rang":105,"wesentlich":false,"untergruppe":"Öffnen","folgt":true},{"id":"projekt.teilen","familie":"Datei","titel":"befehl.projekt.teilen","parameter":{},"bezug":"keine","rang":106,"wesentlich":false,"untergruppe":"Projekt","folgt":true},{"id":"projekt.einladen","familie":"Datei","titel":"befehl.projekt.einladen","parameter":{},"bezug":"keine","rang":107,"wesentlich":false,"untergruppe":"Projekt","folgt":true},{"id":"bearbeiten.rueckgaengig","familie":"Bearbeiten","titel":"befehl.bearbeiten.rueckgaengig","parameter":{},"bezug":"keine","rang":108,"wesentlich":true,"untergruppe":"Verlauf","kuerzel":"Mod+Z","kontext":true},{"id":"bearbeiten.wiederholen","familie":"Bearbeiten","titel":"befehl.bearbeiten.wiederholen","parameter":{},"bezug":"keine","rang":109,"wesentlich":true,"untergruppe":"Verlauf","kuerzel":"Mod+Umschalt+Z","kontext":true},{"id":"element.duplizieren","familie":"Bearbeiten","titel":"befehl.element.duplizieren","parameter":{},"bezug":"element","rang":1,"wesentlich":true,"untergruppe":"Element","kuerzel":"Mod+D"},{"id":"element.umbenennen","familie":"Bearbeiten","titel":"befehl.element.umbenennen","parameter":{"name":{"typ":"text"}},"bezug":"element","rang":2,"wesentlich":true,"untergruppe":"Element","kuerzel":"F2"},{"id":"element.verwerfen","familie":"Bearbeiten","titel":"befehl.element.verwerfen","parameter":{},"bezug":"element","rang":3,"wesentlich":true,"untergruppe":"Element","kuerzel":"Entf"},{"id":"auswahl.duplizieren","familie":"Bearbeiten","titel":"befehl.auswahl.duplizieren","parameter":{},"bezug":"mehrfach","rang":12,"wesentlich":true,"untergruppe":"Element"},{"id":"auswahl.verwerfen","familie":"Bearbeiten","titel":"befehl.auswahl.verwerfen","parameter":{},"bezug":"mehrfach","rang":13,"wesentlich":true,"untergruppe":"Element"},{"id":"element.zurueckholen","familie":"Bearbeiten","titel":"befehl.element.zurueckholen","parameter":{},"bezug":"verworfen","rang":7,"wesentlich":true,"untergruppe":"Element"},{"id":"element.wert-setzen","familie":"Bearbeiten","titel":"befehl.element.wert-setzen","parameter":{"element":{"typ":"referenz"},"name":{"typ":"text"},"wert":{"dimension":"laenge","einheit":"mm"}},"bezug":"element","rang":11,"wesentlich":true,"untergruppe":"Werte"},{"id":"element.parameter-anlegen","familie":"Bearbeiten","titel":"befehl.element.parameter-anlegen","parameter":{},"bezug":"element","rang":117,"wesentlich":false,"untergruppe":"Werte","folgt":true},{"id":"bearbeiten.einfuegen","familie":"Bearbeiten","titel":"befehl.bearbeiten.einfuegen","parameter":{},"bezug":"keine","rang":118,"wesentlich":false,"untergruppe":"Element","folgt":true},{"id":"element.pausieren","familie":"Bearbeiten","titel":"befehl.element.pausieren","parameter":{},"bezug":"element","rang":119,"wesentlich":false,"untergruppe":"Berechnung"},{"id":"element.fortsetzen","familie":"Bearbeiten","titel":"befehl.element.fortsetzen","parameter":{},"bezug":"element","rang":120,"wesentlich":false,"untergruppe":"Berechnung"},{"id":"auswahl.alles","familie":"Auswahl","titel":"befehl.auswahl.alles","parameter":{},"bezug":"keine","rang":121,"wesentlich":true,"untergruppe":"Auswahl","kuerzel":"Mod+A","kontext":true},{"id":"auswahl.aufheben","familie":"Auswahl","titel":"befehl.auswahl.aufheben","parameter":{},"bezug":"mehrfach","rang":122,"wesentlich":true,"untergruppe":"Auswahl"},{"id":"auswahl.umkehren","familie":"Auswahl","titel":"befehl.auswahl.umkehren","parameter":{},"bezug":"keine","rang":123,"wesentlich":false,"untergruppe":"Auswahl","kontext":true},{"id":"auswahl.setzen","familie":"Auswahl","titel":"befehl.auswahl.setzen","parameter":{"elemente":{"typ":"referenz"}},"bezug":"keine","rang":124,"wesentlich":false,"untergruppe":"Befehle","folgt":true},{"id":"auswahl.hinzufuegen","familie":"Auswahl","titel":"befehl.auswahl.hinzufuegen","parameter":{"elemente":{"typ":"referenz"}},"bezug":"keine","rang":125,"wesentlich":false,"untergruppe":"Befehle","folgt":true},{"id":"auswahl.umschalten","familie":"Auswahl","titel":"befehl.auswahl.umschalten","parameter":{"elemente":{"typ":"referenz"}},"bezug":"keine","rang":126,"wesentlich":false,"untergruppe":"Befehle","folgt":true},{"id":"auswahl.aehnliche","familie":"Auswahl","titel":"befehl.auswahl.aehnliche","parameter":{},"bezug":"element","rang":127,"wesentlich":false,"untergruppe":"Regeln","folgt":true},{"id":"auswahl.kantenschleife","familie":"Auswahl","titel":"befehl.auswahl.kantenschleife","parameter":{},"bezug":"kante","rang":128,"wesentlich":false,"untergruppe":"Regeln","folgt":true},{"id":"ansicht.einpassen","familie":"Ansicht","titel":"befehl.ansicht.einpassen","parameter":{},"bezug":"keine","rang":129,"wesentlich":true,"untergruppe":"Blick","kontext":true},{"id":"ansicht.auf-auswahl","familie":"Ansicht","titel":"befehl.ansicht.auf-auswahl","parameter":{},"bezug":"keine","rang":5,"wesentlich":true,"untergruppe":"Blick","kuerzel":"F","kontext":true},{"id":"ansicht.projektion","familie":"Ansicht","titel":"befehl.ansicht.projektion","parameter":{},"bezug":"keine","rang":131,"wesentlich":true,"untergruppe":"Blick","kontext":true},{"id":"ansicht.vorne","familie":"Ansicht","titel":"befehl.ansicht.vorne","parameter":{},"bezug":"keine","rang":132,"wesentlich":false,"untergruppe":"Blick"},{"id":"ansicht.oben","familie":"Ansicht","titel":"befehl.ansicht.oben","parameter":{},"bezug":"keine","rang":133,"wesentlich":false,"untergruppe":"Blick"},{"id":"ansicht.isometrisch","familie":"Ansicht","titel":"befehl.ansicht.isometrisch","parameter":{},"bezug":"keine","rang":134,"wesentlich":false,"untergruppe":"Blick"},{"id":"ansicht.schnitt","familie":"Ansicht","titel":"befehl.ansicht.schnitt","parameter":{},"bezug":"keine","rang":135,"wesentlich":false,"untergruppe":"Blick","folgt":true},{"id":"darstellung.wechseln","familie":"Ansicht","titel":"befehl.darstellung.wechseln","parameter":{},"bezug":"keine","rang":136,"wesentlich":true,"untergruppe":"Darstellung","kuerzel":"W","kontext":true},{"id":"ansicht.isolieren","familie":"Ansicht","titel":"befehl.ansicht.isolieren","parameter":{},"bezug":"keine","rang":137,"wesentlich":true,"untergruppe":"Darstellung","kontext":true},{"id":"ansicht.alles-einblenden","familie":"Ansicht","titel":"befehl.ansicht.alles-einblenden","parameter":{},"bezug":"keine","rang":138,"wesentlich":true,"untergruppe":"Darstellung","kuerzel":"Alt+H","kontext":true},{"id":"ansicht.verworfenes","familie":"Ansicht","titel":"befehl.ansicht.verworfenes","parameter":{},"bezug":"keine","rang":139,"wesentlich":false,"untergruppe":"Darstellung"},{"id":"ansicht.ergebnis","familie":"Ansicht","titel":"befehl.ansicht.ergebnis","parameter":{},"bezug":"keine","rang":140,"wesentlich":false,"untergruppe":"Stand","folgt":true},{"id":"ansicht.alle-entwuerfe","familie":"Ansicht","titel":"befehl.ansicht.alle-entwuerfe","parameter":{},"bezug":"keine","rang":141,"wesentlich":false,"untergruppe":"Stand","folgt":true},{"id":"element.ausblenden","familie":"Sichtbarkeit","titel":"befehl.element.ausblenden","parameter":{},"bezug":"element","rang":4,"wesentlich":true,"untergruppe":"Sichtbarkeit","kuerzel":"H"},{"id":"element.einblenden","familie":"Sichtbarkeit","titel":"befehl.element.einblenden","parameter":{},"bezug":"element","rang":8,"wesentlich":true,"untergruppe":"Sichtbarkeit"},{"id":"auswahl.ausblenden","familie":"Sichtbarkeit","titel":"befehl.auswahl.ausblenden","parameter":{},"bezug":"mehrfach","rang":14,"wesentlich":true,"untergruppe":"Sichtbarkeit"},{"id":"sichtbarkeit.nur-dieses","familie":"Sichtbarkeit","titel":"befehl.sichtbarkeit.nur-dieses","parameter":{},"bezug":"element","rang":145,"wesentlich":false,"untergruppe":"Sichtbarkeit","folgt":true},{"id":"sichtbarkeit.farbe-setzen","familie":"Sichtbarkeit","titel":"befehl.sichtbarkeit.farbe-setzen","parameter":{},"bezug":"element","rang":146,"wesentlich":false,"untergruppe":"Sichtbarkeit","folgt":true},{"id":"ansicht.speichern","familie":"Ansicht speichern","titel":"befehl.ansicht.speichern","parameter":{"name":{"typ":"text"}},"bezug":"keine","rang":147,"wesentlich":false,"untergruppe":"Gespeichert","kontext":true},{"id":"ansicht.anwenden","familie":"Ansicht speichern","titel":"befehl.ansicht.anwenden","parameter":{},"bezug":"ansicht","rang":9,"wesentlich":true,"untergruppe":"Gespeichert"},{"id":"fenster.struktur","familie":"Fenster","titel":"befehl.fenster.struktur","parameter":{},"bezug":"keine","rang":149,"wesentlich":true,"untergruppe":"Zonen","kuerzel":"Mod+B"},{"id":"fenster.panel","familie":"Fenster","titel":"befehl.fenster.panel","parameter":{},"bezug":"keine","rang":150,"wesentlich":true,"untergruppe":"Zonen","kuerzel":"Mod+J"},{"id":"fenster.rechts","familie":"Fenster","titel":"befehl.fenster.rechts","parameter":{},"bezug":"keine","rang":151,"wesentlich":true,"untergruppe":"Zonen","kuerzel":"Mod+Alt+B"},{"id":"fenster.naechste-zone","familie":"Fenster","titel":"befehl.fenster.naechste-zone","parameter":{},"bezug":"keine","rang":152,"wesentlich":false,"untergruppe":"Zonen","kuerzel":"F6"},{"id":"suche.oeffnen","familie":"Fenster","titel":"befehl.suche.oeffnen","parameter":{},"bezug":"keine","rang":153,"wesentlich":true,"untergruppe":"Suche","kuerzel":"Mod+K"},{"id":"fenster.teilen","familie":"Fenster","titel":"befehl.fenster.teilen","parameter":{},"bezug":"keine","rang":154,"wesentlich":false,"untergruppe":"Fenster","folgt":true},{"id":"thema.umschalten","familie":"Fenster","titel":"befehl.thema.umschalten","parameter":{},"bezug":"keine","rang":155,"wesentlich":false,"untergruppe":"Einstellungen"},{"id":"einstellung.navigationsprofil","familie":"Fenster","titel":"befehl.einstellung.navigationsprofil","parameter":{"profil":{"typ":"wahl"}},"bezug":"keine","rang":156,"wesentlich":false,"untergruppe":"Einstellungen"},{"id":"katalog.oeffnen","familie":"Hilfe","titel":"befehl.katalog.oeffnen","parameter":{},"bezug":"keine","rang":157,"wesentlich":false,"untergruppe":"Hilfe"},{"id":"hilfe.befehle-zeigen","familie":"Hilfe","titel":"befehl.hilfe.befehle-zeigen","parameter":{},"bezug":"keine","rang":158,"wesentlich":false,"untergruppe":"Hilfe"},{"id":"hilfe.einfuehrung","familie":"Hilfe","titel":"befehl.hilfe.einfuehrung","parameter":{},"bezug":"keine","rang":159,"wesentlich":false,"untergruppe":"Hilfe","folgt":true},{"id":"element.umhaengen","familie":"Baugruppe","titel":"befehl.element.umhaengen","parameter":{"ziel":{"typ":"referenz"}},"bezug":"teil","rang":10,"wesentlich":true,"untergruppe":"Hierarchie"},{"id":"element.aktivieren","familie":"Baugruppe","titel":"befehl.element.aktivieren","parameter":{},"bezug":"teil","rang":6,"wesentlich":true,"untergruppe":"Hierarchie"},{"id":"element.verlassen","familie":"Baugruppe","titel":"befehl.element.verlassen","parameter":{},"bezug":"keine","rang":162,"wesentlich":true,"untergruppe":"Hierarchie","kontext":true},{"id":"baugruppe.anlegen","familie":"Baugruppe","titel":"befehl.baugruppe.anlegen","parameter":{},"bezug":"keine","rang":163,"wesentlich":false,"untergruppe":"Hierarchie","kontext":true},{"id":"baugruppe.instanz-anlegen","familie":"Baugruppe","titel":"befehl.baugruppe.instanz-anlegen","parameter":{},"bezug":"baugruppe","rang":164,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"baugruppe.variante-waehlen","familie":"Baugruppe","titel":"befehl.baugruppe.variante-waehlen","parameter":{},"bezug":"baugruppe","rang":165,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"verbindung.anlegen","familie":"Baugruppe","titel":"befehl.verbindung.anlegen","parameter":{},"bezug":"baugruppe","rang":166,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"verbindung.verbindungspunkt-setzen","familie":"Baugruppe","titel":"befehl.verbindung.verbindungspunkt-setzen","parameter":{},"bezug":"baugruppe","rang":167,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"verbindung.bewegen","familie":"Baugruppe","titel":"befehl.verbindung.bewegen","parameter":{},"bezug":"baugruppe","rang":168,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"baugruppe.kollision-pruefen","familie":"Baugruppe","titel":"befehl.baugruppe.kollision-pruefen","parameter":{},"bezug":"baugruppe","rang":169,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"baugruppe.fixieren","familie":"Baugruppe","titel":"befehl.baugruppe.fixieren","parameter":{},"bezug":"teil","rang":170,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"baugruppe.komponente-anlegen","familie":"Baugruppe","titel":"befehl.baugruppe.komponente-anlegen","parameter":{},"bezug":"teil","rang":171,"wesentlich":false,"untergruppe":"Verbinden","folgt":true},{"id":"simulation.lager","familie":"Simulation","titel":"befehl.simulation.lager","parameter":{},"bezug":"keine","rang":172,"wesentlich":true,"untergruppe":"Studie","folgt":true},{"id":"simulation.kraft","familie":"Simulation","titel":"befehl.simulation.kraft","parameter":{},"bezug":"keine","rang":173,"wesentlich":true,"untergruppe":"Studie","folgt":true},{"id":"simulation.ergebnis","familie":"Simulation","titel":"befehl.simulation.ergebnis","parameter":{},"bezug":"keine","rang":174,"wesentlich":true,"untergruppe":"Studie","folgt":true},{"id":"chat.senden","familie":"Chat","titel":"befehl.chat.senden","parameter":{},"bezug":"keine","rang":175,"wesentlich":true,"untergruppe":"Chat"},{"id":"chat.uebernehmen","familie":"Chat","titel":"befehl.chat.uebernehmen","parameter":{},"bezug":"keine","rang":176,"wesentlich":true,"untergruppe":"Chat"},{"id":"chat.verwerfen","familie":"Chat","titel":"befehl.chat.verwerfen","parameter":{},"bezug":"keine","rang":177,"wesentlich":true,"untergruppe":"Chat"},{"id":"task.wechseln","familie":"Fenster","titel":"befehl.task.wechseln","parameter":{},"bezug":"keine","rang":178,"wesentlich":false,"untergruppe":"Zonen"},{"id":"dokument.wechseln","familie":"Fenster","titel":"befehl.dokument.wechseln","parameter":{},"bezug":"keine","rang":179,"wesentlich":false,"untergruppe":"Zonen"}]'),P0={befehle:C0},Xr=12,L0=["Bearbeiten","Auswahl","Baugruppe","Sichtbarkeit","Ansicht","Ansicht speichern","Datei","Fenster","Hilfe","Simulation","Chat"],ja=P0.befehle;function D0(n){return(Array.isArray(n)?n:n.befehle??[]).map((t,i)=>({id:String(t.id),familie:t.familie??"Hilfe",titel:t.titel??String(t.id),parameter:t.parameter??{},bezug:t.bezug??"keine",rang:t.rang??1e3+i,wesentlich:t.wesentlich??!1,kuerzel:t.kuerzel,untergruppe:t.untergruppe,kontext:t.kontext,folgt:t.folgt}))}const I0={keine:new Set(["keine"]),schritt:new Set(["keine","element"]),teil:new Set(["keine","element","teil"]),baugruppe:new Set(["keine","element","baugruppe"]),kante:new Set(["keine","kante"]),mehrfach:new Set(["keine","mehrfach"]),verworfen:new Set(["keine","element","verworfen"]),ansicht:new Set(["keine","element","ansicht"])};function k0(n,e){const t=new Map;for(const r of n.filter(s=>s.familie===e)){const s=r.untergruppe??"Weitere";t.set(s,[...t.get(s)??[],r])}const i=[];for(const[r,s]of t)for(let a=0;a<s.length;a+=Xr)i.push({name:a===0?r:`${r} ${Math.floor(a/Xr)+1}`,eintraege:s.slice(a,a+Xr)});return i}function eu(n,e,t=()=>!0){const i=n.filter(a=>I0[e].has(a.bezug)&&(a.bezug!=="keine"||a.kontext)&&t(a)),r=[...new Set([...L0,...i.map(a=>a.familie)])],s=[];for(const a of r){const o=i.filter(u=>u.familie===a).sort((u,h)=>u.rang-h.rang).slice(0,Xr);if(!o.length)continue;const l=o.filter(u=>u.wesentlich),c=o.filter(u=>!u.wesentlich);s.push({familie:a,eintraege:[...l.map(u=>({befehl:u,mehr:!1})),...c.map(u=>({befehl:u,mehr:!0}))]})}return s}function N0(n){return n.flatMap(e=>e.eintraege.map(t=>t.befehl)).sort((e,t)=>e.rang-t.rang)}const U0=5;function z0(n){return N0(n).slice(0,U0)}const F0={titel:"profil.standard",maus:{drehen:[{taste:2}],verschieben:[{taste:1},{taste:2,umschalt:!0}],zoomen:[{rad:!0}]},trackpad:{drehen:[{wischen:!0}],verschieben:[{wischen:!0,umschalt:!0}],zoomen:[{spreizen:!0}]},touch:{drehen:[{finger:1}],verschieben:[{finger:2,ziehen:!0}],zoomen:[{finger:2,spreizen:!0}]}},O0={titel:"profil.solidworks",maus:{drehen:[{taste:1}],verschieben:[{taste:1,strg:!0}],zoomen:[{rad:!0}]},trackpad:{drehen:[{wischen:!0}],verschieben:[{wischen:!0,umschalt:!0}],zoomen:[{spreizen:!0}]},touch:{drehen:[{finger:1}],verschieben:[{finger:2,ziehen:!0}],zoomen:[{finger:2,spreizen:!0}]}},tu={standard:F0,solidworks:O0},B0={menueleiste:"Menüleiste",taskleiste:"Taskleiste",struktur:"Struktur",modell:"Modell",eigenschaften:"Eigenschaften",chat:"Chat",panel:"Panel",rueckmeldung:"Rückmeldung"},V0={start:"Start",folgt:"folgt",mehr:"Mehr …"},H0={modellieren:"Modellieren",simulation:"Simulation (simuliert)",shop:"Shop (folgt)"},G0="simuliert",W0={platzhalter:"Befehle und Inhalte suchen",befehle:"Befehle",inhalte:"Inhalte",nichts:"Nichts gefunden"},X0={Datei:"Datei",Bearbeiten:"Bearbeiten",Auswahl:"Auswahl",Ansicht:"Ansicht",Sichtbarkeit:"Sichtbarkeit","Ansicht speichern":"Gespeicherte Ansichten",Fenster:"Fenster",Hilfe:"Hilfe",Baugruppe:"Baugruppe",Simulation:"Simulation",Chat:"Chat"},q0={Neu:"Neu",Öffnen:"Öffnen",Projekt:"Projekt",Verlauf:"Verlauf",Element:"Element",Werte:"Werte",Berechnung:"Berechnung",Auswahl:"Auswahl",Befehle:"Auswahl setzen",Regeln:"Nach Regel",Zonen:"Zonen",Suche:"Suche",Fenster:"Fenster",Einstellungen:"Einstellungen",Hierarchie:"Hierarchie",Verbinden:"Verbinden",Studie:"Studie",Blick:"Blick",Darstellung:"Darstellung",Stand:"Stand",Sichtbarkeit:"Sichtbarkeit",Gespeichert:"Gespeichert",Hilfe:"Hilfe",Chat:"Chat",Weitere:"Weitere"},Y0={titel:"Struktur",wurzel:"Wurzel",leer:"Noch nichts da. Lege dein erstes Teil an.","leer-simulation":"Noch keine Studie. Die Simulation ist ein Platzhalter und simuliert.",verworfen:"verworfen"},$0={leer:"Das Modell ist leer."},Z0={fertig:"Fertig"},K0={titel:"Pfad"},J0={titel:"Ansicht",mehr:"Mehr Ansichten"},Q0={person:"Testperson B",kuerzel:"B"},j0={"zustand-unbekannt":"Zustand unbekannt",korrektur:"Letzten gültigen Wert setzen","bohrung-zu-gross":"Der Durchmesser {wert} ist zu groß; unter {grenze} ist die Bohrung gültig.","steg-ohne-hoehe":"Der Steg braucht eine Höhe über {grenze}."},e_={fehlerhaft:"fehlerhaft",pausiert:"pausiert",rechnet:"rechnet"},t_={befunde:"Befunde","keine-befunde":"Keine Befunde. Alles ist aktuell."},n_={fehler:{"nicht-lesbar":"Wert nicht lesbar. Beispiel: 12 mm",dimension:"Falsche Einheit für dieses Feld",teilung:"Teilen durch null geht nicht"}},i_={gemischt:"gemischt","n-elemente":"{n} Elemente","umbenennen-hinweis":"Doppelklick zum Umbenennen"},r_={masse:"Maße",material:"Material",ergebnis:"Ergebnis",ansicht:"Ansicht"},s_={laenge:"Länge",breite:"Breite",dicke:"Dicke",hoehe:"Höhe",eckradius:"Eckradius",durchmesser:"Durchmesser",wand:"Wand",material:"Material",dichte:"Dichte",abmessungen:"Abmessungen",volumen:"Volumen","masse-wert":"Masse",projektion:"Projektion",darstellung:"Darstellung"},a_={orthogonal:"orthogonal",perspektivisch:"perspektivisch"},o_={koerper:"Körper",kanten:"Kanten",durchsicht:"Durchsicht"},l_={standard:"Standard",solidworks:"wie Onshape/SolidWorks"},c_={kopie:"Kopie",ansicht:"Ansicht",schnitt:"Schnitt"},u_={titel:"Chat",zu:"zu:","n-elemente":"{n} Elemente",platzhalter:"Frage oder Auftrag …",hinweis:"Zum Beispiel: Steg 40 mm hoch",uebernehmen:"Übernehmen",verwerfen:"Verwerfen",beispiel:{frage:"Der Steg soll 40 mm hoch werden."},antwort:{vorschlag:"Ich schlage diese Änderung vor. Schau dir die Vorschau an.",unklar:"Das habe ich nicht verstanden. Versuche: Steg 40 mm hoch, Kopie vom Steg oder Steg verwerfen.",erledigt:"Erledigt. Du kannst es mit Rückgängig zurücknehmen.",verworfen:"Der Vorschlag ist verworfen."},vorschlag:{wert:"{element}: {feld} auf {nachher}",duplizieren:"{element} duplizieren",verwerfen:"{element} verwerfen",anlegen:"Neues Element anlegen",begruendung:"Simulierter Vorschlag; erst nach dem Übernehmen gilt er."}},h_={folgt:"{befehl} folgt in einer späteren Stufe.",angelegt:"{name} angelegt",dupliziert:"{name} angelegt",umbenannt:"Umbenannt in {name}",verworfen:"{name} verworfen; mit Rückgängig oder Zurückholen wieder da",zurueckgeholt:"{name} zurückgeholt","wert-gesetzt":"Wert an {name} geändert",umgehaengt:"{name} liegt jetzt in {ziel}","ansicht-gespeichert":"{name} gespeichert",rueckgaengig:"Letzten Schritt zurückgenommen",wiederholt:"Schritt wiederhergestellt",befund:"Befund bei {name}; die anderen Elemente bleiben bedienbar","ziel-waehlen":"Wähle in der Struktur das Ziel.","auswahl-ziel":"Wähle Elemente im Modell oder in der Struktur.","isolieren-ziel":"Wähle zuerst, was du isolieren willst."},f_={"kein-ziel":"Hier kann nichts abgelegt werden.","nur-teile":"Nur Teile und Baugruppen lassen sich umhängen, Schritte bleiben in ihrem Teil.","eigener-nachfahre":"Ein Element kann nicht in sich selbst oder in sein eigenes Teil.","kein-behaelter":"Ein Teil nimmt keine anderen Elemente auf; wähle eine Baugruppe.","schon-darin":"Das Element liegt schon dort."},d_={titel:"Bausteinkatalog"},p_={element:{anlegen:"Neu anlegen",duplizieren:"Duplizieren",umbenennen:"Umbenennen",verwerfen:"Verwerfen",zurueckholen:"Zurückholen","wert-setzen":"Wert setzen","parameter-anlegen":"Parameter anlegen",pausieren:"Berechnung pausieren",fortsetzen:"Berechnung fortsetzen",ausblenden:"Ausblenden",einblenden:"Einblenden",umhaengen:"Umhängen (Ziel wählen)",aktivieren:"Aktivieren",verlassen:"Aktives Element verlassen"},dokument:{oeffnen:"Öffnen",schliessen:"Dokument schließen",wechseln:"Dokument wechseln"},wurzel:{setzen:"Wurzel der Struktur wählen"},einstellungen:{oeffnen:"Einstellungen öffnen"},projekt:{teilen:"Projekt teilen",einladen:"Person einladen"},bearbeiten:{rueckgaengig:"Rückgängig",wiederholen:"Wiederholen",einfuegen:"Einfügen"},auswahl:{duplizieren:"Auswahl duplizieren",verwerfen:"Auswahl verwerfen",alles:"Alles auswählen",aufheben:"Auswahl aufheben",umkehren:"Auswahl umkehren",setzen:"Auswählen",hinzufuegen:"Zur Auswahl hinzufügen",umschalten:"Auswahl umschalten",aehnliche:"Ähnliche auswählen",kantenschleife:"Kantenschleife auswählen",ausblenden:"Auswahl ausblenden"},ansicht:{einpassen:"Alles einpassen","auf-auswahl":"Auf Auswahl zoomen",projektion:"Perspektive oder Orthogonal",vorne:"Ansicht von vorne",oben:"Ansicht von oben",isometrisch:"Isometrische Ansicht",schnitt:"Schnittansicht",isolieren:"Isolieren","alles-einblenden":"Alles einblenden",verworfenes:"Verworfenes zeigen",ergebnis:"Ansicht Ergebnis","alle-entwuerfe":"Ansicht Alle Entwürfe",speichern:"Ansicht speichern",anwenden:"Gespeicherte Ansicht anwenden"},darstellung:{wechseln:"Darstellung wechseln"},sichtbarkeit:{"nur-dieses":"Nur dieses zeigen","farbe-setzen":"Anzeigefarbe setzen"},fenster:{struktur:"Struktur ein- oder ausblenden",panel:"Panel ein- oder ausblenden",rechts:"Rechte Seitenleiste ein- oder ausblenden","naechste-zone":"Nächste Zone",teilen:"Fenster teilen (zwei Teile nebeneinander)"},suche:{oeffnen:"Befehlssuche öffnen"},thema:{umschalten:"Hell oder Dunkel"},einstellung:{navigationsprofil:"Navigationsprofil wählen"},katalog:{oeffnen:"Katalog öffnen"},hilfe:{"befehle-zeigen":"Alle Befehle zeigen",einfuehrung:"Einführung starten"},baugruppe:{anlegen:"Baugruppe anlegen","instanz-anlegen":"Instanz einer Komponente anlegen","variante-waehlen":"Variante wählen","kollision-pruefen":"Kollision prüfen",fixieren:"Teil fixieren","komponente-anlegen":"Komponente aus Teil anlegen"},verbindung:{anlegen:"Verbindung anlegen","verbindungspunkt-setzen":"Verbindungspunkt setzen",bewegen:"Innerhalb der Freiheitsgrade bewegen"},simulation:{lager:"Lager setzen (simuliert)",kraft:"Kraft setzen (simuliert)",ergebnis:"Ergebnis zeigen (simuliert)"},chat:{senden:"Nachricht senden",uebernehmen:"Vorschlag übernehmen",verwerfen:"Vorschlag verwerfen"},task:{wechseln:"Aufgabe wechseln"}},m_={zone:B0,menue:V0,task:H0,simuliert:G0,suche:W0,familie:X0,untergruppe:q0,struktur:Y0,modell:$0,aktiv:Z0,pfad:K0,ansichtsleiste:J0,anwesenheit:Q0,befund:j0,status:e_,panel:t_,wert:n_,eigenschaften:i_,gruppe:r_,feld:s_,projektion:a_,darstellung:o_,profil:l_,name:c_,chat:u_,rueck:h_,dnd:f_,katalog:d_,befehl:p_},g_={menueleiste:"Menu bar",taskleiste:"Task bar",struktur:"Structure",modell:"Model",eigenschaften:"Properties",chat:"Chat",panel:"Panel",rueckmeldung:"Feedback"},__={start:"Start",folgt:"soon",mehr:"More …"},v_={modellieren:"Modeling",simulation:"Simulation (simulated)",shop:"Shop (soon)"},x_="simulated",S_={platzhalter:"Search commands and content",befehle:"Commands",inhalte:"Content",nichts:"Nothing found"},b_={Datei:"File",Bearbeiten:"Edit",Auswahl:"Selection",Ansicht:"View",Sichtbarkeit:"Visibility","Ansicht speichern":"Saved views",Fenster:"Window",Hilfe:"Help",Baugruppe:"Assembly",Simulation:"Simulation",Chat:"Chat"},M_={Neu:"New",Öffnen:"Open",Projekt:"Project",Verlauf:"History",Element:"Element",Werte:"Values",Berechnung:"Calculation",Auswahl:"Selection",Befehle:"Set selection",Regeln:"By rule",Zonen:"Zones",Suche:"Search",Fenster:"Window",Einstellungen:"Settings",Hierarchie:"Hierarchy",Verbinden:"Connect",Studie:"Study",Blick:"View angle",Darstellung:"Display",Stand:"State",Sichtbarkeit:"Visibility",Gespeichert:"Saved",Hilfe:"Help",Chat:"Chat",Weitere:"More"},y_={titel:"Structure",wurzel:"Root",leer:"Nothing here yet. Create your first part.","leer-simulation":"No study yet. Simulation is a placeholder and simulated.",verworfen:"discarded"},w_={leer:"The model is empty."},E_={fertig:"Done"},A_={titel:"Path"},T_={titel:"View",mehr:"More views"},R_={person:"Test person B",kuerzel:"B"},C_={"zustand-unbekannt":"State unknown",korrektur:"Set last valid value","bohrung-zu-gross":"The diameter {wert} is too large; below {grenze} the hole is valid.","steg-ohne-hoehe":"The rib needs a height above {grenze}."},P_={fehlerhaft:"faulty",pausiert:"paused",rechnet:"calculating"},L_={befunde:"Findings","keine-befunde":"No findings. Everything is up to date."},D_={fehler:{"nicht-lesbar":"Value not readable. Example: 12 mm",dimension:"Wrong unit for this field",teilung:"Division by zero is not possible"}},I_={gemischt:"mixed","n-elemente":"{n} elements","umbenennen-hinweis":"Double-click to rename"},k_={masse:"Dimensions",material:"Material",ergebnis:"Result",ansicht:"View"},N_={laenge:"Length",breite:"Width",dicke:"Thickness",hoehe:"Height",eckradius:"Corner radius",durchmesser:"Diameter",wand:"Wall",material:"Material",dichte:"Density",abmessungen:"Size",volumen:"Volume","masse-wert":"Mass",projektion:"Projection",darstellung:"Display"},U_={orthogonal:"orthographic",perspektivisch:"perspective"},z_={koerper:"Solid",kanten:"Edges",durchsicht:"See-through"},F_={standard:"Default",solidworks:"like Onshape/SolidWorks"},O_={kopie:"copy",ansicht:"View",schnitt:"Section"},B_={titel:"Chat",zu:"to:","n-elemente":"{n} elements",platzhalter:"Question or task …",hinweis:"For example: rib 40 mm high",uebernehmen:"Accept",verwerfen:"Discard",beispiel:{frage:"The rib should become 40 mm high."},antwort:{vorschlag:"I propose this change. Have a look at the preview.",unklar:"I did not understand. Try: rib 40 mm high, copy of the rib or discard the rib.",erledigt:"Done. You can take it back with undo.",verworfen:"The proposal is discarded."},vorschlag:{wert:"{element}: {feld} to {nachher}",duplizieren:"Duplicate {element}",verwerfen:"Discard {element}",anlegen:"Create a new element",begruendung:"Simulated proposal; it applies only after you accept."}},V_={folgt:"{befehl} comes in a later stage.",angelegt:"{name} created",dupliziert:"{name} created",umbenannt:"Renamed to {name}",verworfen:"{name} discarded; bring it back with undo or restore",zurueckgeholt:"{name} restored","wert-gesetzt":"Value of {name} changed",umgehaengt:"{name} now sits in {ziel}","ansicht-gespeichert":"{name} saved",rueckgaengig:"Last step undone",wiederholt:"Step restored",befund:"Finding at {name}; the other elements stay usable","ziel-waehlen":"Choose the target in the structure.","auswahl-ziel":"Pick elements in the model or the structure.","isolieren-ziel":"Select what you want to isolate first."},H_={"kein-ziel":"Nothing can be dropped here.","nur-teile":"Only parts and assemblies can be moved; steps stay in their part.","eigener-nachfahre":"An element cannot go into itself or into its own part.","kein-behaelter":"A part cannot hold other elements; choose an assembly.","schon-darin":"The element is already there."},G_={titel:"Component catalog"},W_={element:{anlegen:"Create new",duplizieren:"Duplicate",umbenennen:"Rename",verwerfen:"Discard",zurueckholen:"Restore","wert-setzen":"Set value","parameter-anlegen":"Create parameter",pausieren:"Pause calculation",fortsetzen:"Resume calculation",ausblenden:"Hide",einblenden:"Show",umhaengen:"Move (choose target)",aktivieren:"Activate",verlassen:"Leave active element"},dokument:{oeffnen:"Open",schliessen:"Close document",wechseln:"Switch document"},wurzel:{setzen:"Choose root of the structure"},einstellungen:{oeffnen:"Open settings"},projekt:{teilen:"Share project",einladen:"Invite person"},bearbeiten:{rueckgaengig:"Undo",wiederholen:"Redo",einfuegen:"Paste"},auswahl:{duplizieren:"Duplicate selection",verwerfen:"Discard selection",alles:"Select all",aufheben:"Clear selection",umkehren:"Invert selection",setzen:"Select",hinzufuegen:"Add to selection",umschalten:"Toggle selection",aehnliche:"Select similar",kantenschleife:"Select edge loop",ausblenden:"Hide selection"},ansicht:{einpassen:"Fit all","auf-auswahl":"Zoom to selection",projektion:"Perspective or orthographic",vorne:"Front view",oben:"Top view",isometrisch:"Isometric view",schnitt:"Section view",isolieren:"Isolate","alles-einblenden":"Show everything",verworfenes:"Show discarded",ergebnis:"Result view","alle-entwuerfe":"All drafts view",speichern:"Save view",anwenden:"Apply saved view"},darstellung:{wechseln:"Change display"},sichtbarkeit:{"nur-dieses":"Show only this","farbe-setzen":"Set display color"},fenster:{struktur:"Show or hide structure",panel:"Show or hide panel",rechts:"Show or hide right sidebar","naechste-zone":"Next zone",teilen:"Split window"},suche:{oeffnen:"Open command search"},thema:{umschalten:"Light or dark"},einstellung:{navigationsprofil:"Choose navigation profile"},katalog:{oeffnen:"Open catalog"},hilfe:{"befehle-zeigen":"Show all commands",einfuehrung:"Start introduction"},baugruppe:{anlegen:"Create assembly","instanz-anlegen":"Create instance of a component","variante-waehlen":"Choose variant","kollision-pruefen":"Check collision",fixieren:"Fix part","komponente-anlegen":"Create component from part"},verbindung:{anlegen:"Create connection","verbindungspunkt-setzen":"Set connection point",bewegen:"Move within degrees of freedom"},simulation:{lager:"Add support",kraft:"Add force",ergebnis:"Show result"},chat:{senden:"Send message",uebernehmen:"Accept proposal",verwerfen:"Reject proposal"},task:{wechseln:"Switch task"}},X_={zone:g_,menue:__,task:v_,simuliert:x_,suche:S_,familie:b_,untergruppe:M_,struktur:y_,modell:w_,aktiv:E_,pfad:A_,ansichtsleiste:T_,anwesenheit:R_,befund:C_,status:P_,panel:L_,wert:D_,eigenschaften:I_,gruppe:k_,feld:N_,projektion:U_,darstellung:z_,profil:F_,name:O_,chat:B_,rueck:V_,dnd:H_,katalog:G_,befehl:W_};function q_(n){const e=new URLSearchParams(n).get("sprache");return e==="en"||e==="schluessel"?e:"de"}function Y_(n,e){const t=n[e];if(typeof t=="string")return t;let i=n;for(const r of e.split(".")){if(typeof i!="object")return;i=i[r]}return typeof i=="string"?i:void 0}function $_(n){return(e,t)=>{if(n==="schluessel")return e;const r=Y_(n==="en"?X_:m_,e)??e;return t?r.replace(/\{(\w+)\}/g,(s,a)=>String(t[a]??"")):r}}function ar(n,e){const t=typeof navigator<"u"&&/Mac|iPhone|iPad/.test(navigator.userAgent),i=n.split("+"),r=i[i.length-1]??"",s=i.slice(0,-1);if(t){const o={Mod:"⌘",Umschalt:"⇧",Shift:"⇧",Alt:"⌥"};return s.map(l=>o[l]??l).join("")+r}const a={Mod:e==="en"?"Ctrl":"Strg",Umschalt:e==="en"?"Shift":"Umschalt",Shift:e==="en"?"Shift":"Umschalt",Alt:"Alt"};return[...s.map(o=>a[o]??o),r].join("+")}/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z_={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nu=([n,e,t])=>{const i=document.createElementNS("http://www.w3.org/2000/svg",n);return Object.keys(e).forEach(r=>{i.setAttribute(r,String(e[r]))}),t?.length&&t.forEach(r=>{const s=nu(r);i.appendChild(s)}),i},K_=(n,e={})=>{const i={...Z_,...e};return nu(["svg",i,n])};/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J_=[["path",{d:"m5 12 7-7 7 7"}],["path",{d:"M12 19V5"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q_=[["path",{d:"M12 5v16"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j_=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ev=[["path",{d:"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"}],["path",{d:"m7 16.5-4.74-2.85"}],["path",{d:"m7 16.5 5-3"}],["path",{d:"M7 16.5v5.17"}],["path",{d:"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"}],["path",{d:"m17 16.5-5-3"}],["path",{d:"m17 16.5 4.74-2.85"}],["path",{d:"M17 16.5v5.17"}],["path",{d:"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"}],["path",{d:"M12 8 7.26 5.15"}],["path",{d:"m12 8 4.74-2.85"}],["path",{d:"M12 13.5V8"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tv=[["path",{d:"M20 6 9 17l-5-5"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nv=[["path",{d:"m6 9 6 6 6-6"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iv=[["path",{d:"m9 18 6-6-6-6"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rv=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sv=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"12",cy:"12",r:"10"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const av=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"10",x2:"10",y1:"15",y2:"9"}],["line",{x1:"14",x2:"14",y1:"15",y2:"9"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ov=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lv=[["path",{d:"M10 22v-8"}],["path",{d:"M2.336 8.89 10 14l11.715-7.029"}],["path",{d:"M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cv=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uv=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hv=[["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fv=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dv=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pv=[["path",{d:"M12 2v4"}],["path",{d:"m16.2 7.8 2.9-2.9"}],["path",{d:"M18 12h4"}],["path",{d:"m16.2 16.2 2.9 2.9"}],["path",{d:"M12 18v4"}],["path",{d:"m4.9 19.1 2.9-2.9"}],["path",{d:"M2 12h4"}],["path",{d:"m4.9 4.9 2.9 2.9"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mv=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gv=[["path",{d:"M4 5h16"}],["path",{d:"M4 12h16"}],["path",{d:"M4 19h16"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _v=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 15h18"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vv=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 3v18"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xv=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M15 3v18"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sv=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bv=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mv=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yv=[["path",{d:"m15 14 5-5-5-5"}],["path",{d:"M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wv=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ev=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Av=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{d:"M20 2v4"}],["path",{d:"M22 4h-4"}],["circle",{cx:"4",cy:"20",r:"2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tv=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rv=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cv=[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pv=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];/**
 * @license lucide v1.60.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lv=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]],Dv="http://www.w3.org/2000/svg",Iv=new Set(["svg","path","line","rect","circle","polygon","polyline","g","text"]);function Z(n,e={},...t){const i=Iv.has(n)?document.createElementNS(Dv,n):document.createElement(n);for(const[r,s]of Object.entries(e))s==null||s===!1||(r==="class"?i.setAttribute("class",String(s)):i.setAttribute(r,s===!0?"":String(s)));n==="input"&&e.value!==void 0&&(i.value=String(e.value));for(const r of t)r===null||r===!1||r===void 0||i.append(typeof r=="string"?document.createTextNode(r):r);return i}const kv={"arrow-up":J_,"book-open":Q_,box:j_,boxes:ev,check:tv,"chevron-down":nv,"chevron-right":iv,"circle-alert":rv,"circle-dot":sv,"circle-pause":av,copy:ov,cuboid:lv,eye:uv,"eye-off":cv,focus:hv,"folder-open":fv,layers:dv,loader:pv,maximize:mv,menu:gv,"panel-bottom":_v,"panel-left":vv,"panel-right":xv,pencil:Sv,play:bv,plus:Mv,"redo-2":yv,search:wv,settings:Ev,sparkles:Av,square:Tv,"trash-2":Rv,"undo-2":Cv,user:Pv,x:Lv};function vt(n,e=16){const t=K_(kv[n],{width:e,height:e,"stroke-width":2,"aria-hidden":"true"}),i=Z("span",{class:"symbol","data-icon":n});return i.append(t),i}const Zi=n=>n instanceof Element?n.getAttribute("data-key")??null:null;function Nv(n,e){return n.nodeType!==e.nodeType?!1:n instanceof Element&&e instanceof Element?n.nodeName===e.nodeName&&Zi(n)===Zi(e):!0}function Uv(n,e){for(const t of[...n.attributes])t.name!=="data-editiert"&&!e.hasAttribute(t.name)&&n.removeAttribute(t.name);for(const t of[...e.attributes])n.getAttribute(t.name)!==t.value&&n.setAttribute(t.name,t.value)}function qr(n,e){if(n instanceof Text&&e instanceof Text){n.nodeValue!==e.nodeValue&&(n.nodeValue=e.nodeValue);return}if(!(n instanceof Element)||!(e instanceof Element))return;if(Uv(n,e),n instanceof HTMLInputElement&&e instanceof HTMLInputElement){!(document.activeElement===n&&n.hasAttribute("data-editiert"))&&n.value!==e.value&&(n.value=e.value);return}const t=new Set,i=[...n.childNodes],r=new Map;for(const o of i){const l=Zi(o);l!==null&&r.set(l,o)}let s=0;const a=[...e.childNodes];for(const[o,l]of a.entries()){const c=Zi(l);let u;if(c!==null)u=r.get(c);else for(;s<i.length;){const h=i[s];if(s+=1,!t.has(h)&&Zi(h)===null&&Nv(h,l)){u=h;break}}if(u){t.add(u),qr(u,l);const h=n.childNodes[o];h!==u&&n.insertBefore(u,h??null)}else{const h=n.childNodes[o];n.insertBefore(l,h??null),t.add(l)}}for(const o of[...n.childNodes])t.has(o)||n.removeChild(o)}const zv=8,Fv=12;function Ov(n,e){const t=e.trim().toLowerCase(),i=s=>n.t(s.titel).toLowerCase();return t?n.register.filter(s=>i(s).includes(t)).sort((s,a)=>{const o=i(s).startsWith(t)?0:1,l=i(a).startsWith(t)?0:1;return o-l||i(s).length-i(a).length||s.rang-a.rang}):[...n.register].sort((s,a)=>s.rang-a.rang)}function iu(n){const e=Ov(n,n.suche.text);return n.suche.alle?e:e.slice(0,n.suche.text.trim()?Fv:zv)}function Bv(n){const e=iu(n),t=n.suche.text.trim().toLowerCase(),i=t?wt(n.dokument()).filter(s=>s.id!==n.dokument().id&&s.meta.name.toLowerCase().includes(t)).slice(0,4):[],r=Math.min(n.suche.index,Math.max(0,e.length-1));return Z("div",{class:"popup suche-popup",role:"listbox","data-overlay":"suche","data-ort":"suche","data-weg":"suche","data-muster":"Suche"},Z("input",{type:"text",class:"suche-eingabe","data-suchfeld":"","data-editiert":"",value:n.suche.text,placeholder:n.t("suche.platzhalter"),"aria-label":n.t("suche.platzhalter"),autocomplete:"off"}),Z("div",{class:"ergebnisse"},Z("div",{class:"gruppenkopf"},n.t("suche.befehle")),...e.map((s,a)=>Z("button",{type:"button",role:"option",class:"eintrag","data-befehl":s.id,"data-key":`s-${s.id}`,"aria-selected":a===r?"true":"false","data-akzent":a===r?"auswahl":null,"data-folgt":s.folgt?"true":null,tabindex:"-1"},Z("span",{class:"titel"},n.t(s.titel)),s.folgt?Z("span",{class:"folgt"},n.t("menue.folgt")):null,s.kuerzel?Z("kbd",{},ar(s.kuerzel,n.sprache)):null)),e.length===0&&i.length===0?Z("div",{class:"leer","data-key":"keine"},n.t("suche.nichts")):null,i.length?Z("div",{class:"gruppenkopf","data-key":"kopf-inhalte"},n.t("suche.inhalte")):null,...i.map(s=>Z("button",{type:"button",role:"option",class:"eintrag","data-suche-element":s.id,"data-key":`e-${s.id}`,"aria-selected":"false",tabindex:"-1"},Z("span",{class:"titel"},s.meta.name)))))}const Xi=Object.keys(tu),ru="cee-prototyp-graph";class Vv{constructor(e,t,i,r=ja,s=yo()){this.t=e,this.sprache=t,this.tempo=i,this.register=r,this.projekt=s,this.dok=s.content[0]?.id??""}projekt;dok;protokoll=[];verlaeufe=new Map;vorschau=null;auswahl=[];hover=null;aktiv=null;isoliert=null;ausgeblendet=new Set;verworfenesZeigen=!1;darstellung="koerper";projektionsart="orthogonal";profil=Xi[0]??"";zonen={struktur:!0,panel:!1,rechts:!0};task="modellieren";thema="hell";menue=null;kontextMenue=null;suche={offen:!1,text:"",index:0,alle:!1,fokussiert:!1};umbenennen=null;umbenennenFokussiert=!1;umhaengenModus=null;fokusZone=null;rueckmeldung=null;unbekannterZustand=!1;zustandName="";eingabenWegMerken="menue";tastenfokus=!1;griff=null;dnd=null;status=new Map;rechenzeitMs=0;andere={aktiv:!1,dok:"halter",element:"steg"};chat={nachrichten:[],eingabe:"",vorschlag:null};katalogOffen=null;szene=null;lauscher=[];rendernLaeuft=!1;beiRendern(e){this.lauscher.push(e)}rendern(){this.rendernLaeuft||(this.rendernLaeuft=!0,queueMicrotask(()=>{this.rendernLaeuft=!1;for(const e of this.lauscher)e()}))}rendernSofort(){for(const e of this.lauscher)e()}dokument(){return this.projekt.content.find(e=>e.id===this.dok)??this.projekt.content[0]}angezeigtesDokument(){const e=this.dokument();if(!this.vorschau)return e;const t=ln(e),i=Et(t,this.vorschau.id);return i&&(i.params[this.vorschau.name]=this.vorschau.wert),t}find(e){return Et(this.dokument(),e)}name(e){return this.find(e)?.meta.name??e}modell(){return ln(this.projekt)}wurzel(){return this.dokument()}verlauf(){let e=this.verlaeufe.get(this.dok);return e||(e={zurueck:[],vor:[]},this.verlaeufe.set(this.dok,e)),e}verlaufLaenge(){return this.verlauf().zurueck.length}kannRueckgaengig=()=>this.verlauf().zurueck.length>0;kannWiederholen=()=>this.verlauf().vor.length>0;speichern(){try{window.localStorage.setItem(ru,JSON.stringify(this.projekt))}catch{}}aendern(e){const t=this.dokument(),i=ln(t);if(e(i),JSON.stringify(i)===JSON.stringify(t))return!1;const r=this.verlauf();return r.zurueck.push(ln(t)),r.vor=[],this.projekt.content=this.projekt.content.map(s=>s.id===t.id?i:s),this.speichern(),!0}ersetzeDokument(e){this.projekt.content=this.projekt.content.map(t=>t.id===e.id?e:t),this.speichern()}auswahlIds(){return[...new Set(this.auswahl.map(e=>e.element_id))]}bereichElement(){return(this.aktiv?this.find(this.aktiv):void 0)??this.dokument()}zielFuerTreffer(e){const t=this.bereichElement(),i=zn(t,e);if(!i.length)return null;if(i.length===1)return t.content.length?null:t.id;const r=i.slice(1);return t.type==="teil"?r[0].id:(r.find(a=>a.type==="teil")??r[0]).id}waehlbareIds(){const e=this.bereichElement();return(e.type==="teil"||e.content.every(i=>i.type!=="teil")?e.content:e.content.flatMap(i=>i.type==="baugruppe"?wt(i).filter(r=>r.type==="teil"):[i])).filter(i=>!Vt(i)&&!this.istAusgeblendet(i.id)).map(i=>i.id)}istAusgeblendet(e){return this.ausgeblendet.has(e)?!0:zn(this.dokument(),e).slice(0,-1).some(i=>this.ausgeblendet.has(i.id))}setzeAuswahl(e){this.auswahl=e,this.rendern()}waehle(e,t,i){const r=i?{element_id:e,teil:i}:{element_id:e},s=a=>a.element_id===e&&JSON.stringify(a.teil)===JSON.stringify(i);t==="setzen"?this.auswahl=[r]:t==="hinzufuegen"?this.auswahl.some(s)||(this.auswahl=[...this.auswahl,r]):this.auswahl.some(s)?this.auswahl=this.auswahl.filter(a=>!s(a)):this.auswahl=[...this.auswahl,r],this.rendern()}auswahlart(){const e=this.auswahlIds();if(!e.length)return"keine";if(e.length>1)return"mehrfach";if(this.auswahl.some(i=>i.teil?.art==="kante"))return"kante";const t=this.find(e[0]);return t?Vt(t)?"verworfen":t.type==="view"?"ansicht":t.type==="teil"?"teil":t.type==="baugruppe"?"baugruppe":"schritt":"keine"}gewaehlteElemente(){return this.auswahlIds().map(e=>this.find(e)).filter(e=>!!e)}befunde(){return rs(this.dokument())}istFehlerhaft(e){return this.befunde().some(t=>t.elementId===e)}zustaende(e){const t=this.find(e);if(!t)return[];const i=[],r=this.auswahlIds().includes(e);r&&i.push("ausgewaehlt"),this.andereElemente().includes(e)&&!r&&i.push("andere"),this.hover===e&&!r&&!this.andereElemente().includes(e)&&i.push("hover"),this.aktiv===e?i.push("aktiv"):this.istGedimmt(e)&&i.push("gedimmt"),this.istAusgeblendet(e)&&i.push("ausgeblendet"),Vt(t)&&i.push("verworfen"),this.istFehlerhaft(e)&&i.push("fehlerhaft");const s=this.status.get(e);return(t.meta.pausiert===!0||s==="pausiert")&&i.push("pausiert"),s==="rechnet"&&i.push("rechnet"),i}andereElemente(){return this.andere.aktiv&&this.dok===this.andere.dok&&this.find(this.andere.element)?[this.andere.element]:[]}istGedimmt(e){if(this.isoliert)return!new Set(this.isoliert.flatMap(s=>this.mitNachfahren(s))).has(e);if(!this.aktiv)return!1;const t=new Set(this.mitNachfahren(this.aktiv)),i=zn(this.dokument(),this.aktiv).map(r=>r.id);return!t.has(e)&&!i.includes(e)}mitNachfahren(e){const t=this.find(e);return t?[t.id,...Ci(t).map(i=>i.id)]:[]}darstellungVon(e,t){if(!this.find(e))return null;const r=this.zustaende(e),s=[],a=(l,c,u,h=null,f=null)=>s.push({zustand:l,kanal:c,token:u,strichart:h,breite:f}),o={modell:{hover:"akzent",ausgewaehlt:"akzent",andere:"linie-stark"},struktur:{hover:"flaeche-2",ausgewaehlt:"akzent-flaeche",andere:"text-2"},chat:{hover:"flaeche-2",ausgewaehlt:"akzent-flaeche",andere:"text-2"},pfad:{hover:"flaeche-2",ausgewaehlt:"akzent-flaeche",andere:"text-2"}};for(const l of r)l==="hover"&&a("hover","Kontur",o[t].hover,t==="modell"?"durchgezogen":null,t==="modell"?1:null),l==="ausgewaehlt"&&(a("ausgewaehlt","Kontur",o[t].ausgewaehlt,t==="modell"?"durchgezogen":null,t==="modell"?2:null),t==="struktur"&&a("ausgewaehlt","Kontur","text")),l==="andere"&&a("andere","Kontur",o[t].andere,t==="modell"?"gestrichelt":null,t==="modell"?2:null),l==="aktiv"&&a("aktiv","Umfeld",t==="modell"?"text-3":"schrift.schnitt.halbfett"),l==="gedimmt"&&a("gedimmt","Umfeld","text-3"),l==="ausgeblendet"&&a("ausgeblendet","Sichtbarkeit","text-3"),l==="fehlerhaft"&&a("fehlerhaft","Status","fehler"),l==="pausiert"&&a("pausiert","Status","text-2"),l==="rechnet"&&a("rechnet","Status","text-2");return{zustaende:r,kanaele:s}}pfadGlieder(){const e=this.aktiv??this.dokument().id,t=zn(this.dokument(),e);return t.length?t:[this.dokument()]}zeilen(){const e=[],t=(i,r)=>{for(const s of i.content)Vt(s)&&!this.verworfenesZeigen||(e.push({element:s,ebene:r}),t(s,r+1))};return t(this.angezeigtesDokument(),0),e}versteckteIds(){const e=new Set;for(const t of wt(this.dokument()))(Vt(t)||this.istAusgeblendet(t.id))&&e.add(t.id);if(this.isoliert){const t=new Set(this.isoliert.flatMap(i=>this.mitNachfahren(i)));for(const i of wt(this.dokument()))t.has(i.id)||e.add(i.id)}return e}gedimmteIds(){const e=new Set;if(!this.aktiv)return e;for(const t of wt(this.dokument()))this.istGedimmt(t.id)&&e.add(t.id);return e}blasseIds(){const e=new Set;for(const t of wt(this.dokument()))if(this.istFehlerhaft(t.id)||t.meta.pausiert===!0)for(const i of this.mitNachfahren(t.id))e.add(i);return e}teilErgebnis(){const e=this.angezeigtesDokument(),t=this.aktiv?Et(e,this.aktiv):void 0,r=[...t?zn(e,t.id):[]].reverse().find(s=>s.type==="teil");return Fn(r??e)}huelle(e){const t=this.find(e);return t?Zl(t,Fn(this.angezeigtesDokument()).koerper):null}wirkungen=new Map;registriere(e,t){this.wirkungen.set(e,t)}befehl(e){return this.register.find(t=>t.id===e)}ausfuehren(e,t={},i="menue",r="mensch"){const s=this.befehl(e),a=this.wirkungen.get(e);if(this.menue=null,this.kontextMenue=null,!s||!a||s.folgt)return this.meldung("rueck.folgt",{befehl:s?this.t(s.titel):e}),this.rendern(),!1;const o=a(t,i,r);return this.rendern(),o!==!1}protokolliere(e,t,i,r){this.protokoll.push({befehl:e,parameter:t,quelle:r,weg:i})}meldung(e,t){this.rueckmeldung={schluessel:e,werte:t}}wertSetzen(e,t,i,r,s="mensch"){const a=this.befunde().length,o=this.aendern(l=>{const c=Et(l,e);c&&(c.params[t]=i)});return this.vorschau=null,o&&(this.protokolliere("element.wert-setzen",{element:e,name:t,wert:i},r,s),this.meldung("rueck.wert-gesetzt",{name:this.name(e)}),this.nachWertAenderung(e,a)),o}nachWertAenderung(e,t){this.befunde().length>t&&(this.zonen.panel=!0,this.meldung("rueck.befund",{name:this.name(e)})),this.rechenzeitMs>0&&(this.status.set(e,"rechnet"),setTimeout(()=>{this.status.get(e)==="rechnet"&&this.status.delete(e),this.rendern()},this.rechenzeitMs))}letzterGueltigerWert(e){for(const t of[...this.verlauf().zurueck].reverse()){const i=Et(t,e.elementId);if(i&&!rs(t).some(r=>r.elementId===e.elementId))return qe(i.params[e.parameter])}return Qc[e.elementId]?.[e.parameter]??e.grenze}rueckgaengig(e,t="mensch"){const i=this.verlauf(),r=i.zurueck.pop();return this.protokolliere("bearbeiten.rueckgaengig",{},e,t),r?(i.vor.push(ln(this.dokument())),this.ersetzeDokument(r),this.auswahlBereinigen(),this.meldung("rueck.rueckgaengig"),!0):!1}wiederholen(e,t="mensch"){const i=this.verlauf(),r=i.vor.pop();return this.protokolliere("bearbeiten.wiederholen",{},e,t),r?(i.zurueck.push(ln(this.dokument())),this.ersetzeDokument(r),this.auswahlBereinigen(),this.meldung("rueck.wiederholt"),!0):!1}auswahlBereinigen(){this.auswahl=this.auswahl.filter(e=>this.find(e.element_id)),this.aktiv&&!this.find(this.aktiv)&&(this.aktiv=null)}wechsleDokument(e){!this.projekt.content.some(t=>t.id===e)||e===this.dok||(this.dok=e,this.auswahl=[],this.aktiv=null,this.isoliert=null,this.hover=null,this.vorschau=null,this.einpassenNoetig=!0,this.rendern())}neuesElement(e){let t="";return this.aendern(i=>{const r=e==="baugruppe"?"Baugruppe":"Teil",s=wt(i).filter(o=>o.type===e).length+1;t=Jc(i,`${e}-${s}`);const a={id:t,type:e,params:e==="teil"?{material:"PLA",lage_x:{value:0,unit:"mm"}}:{},content:[],meta:{name:`${r} ${s}`}};this.einfuegeStelle(i).content.push(a)}),t}einfuegeStelle(e){return(this.aktiv?Et(e,this.aktiv):void 0)??e}ablegenPruefen(e,t){const i=this.dokument(),r=this.find(e),s=t===i.id?i:this.find(t);return!r||!s?{erlaubt:!1,grund:"dnd.kein-ziel"}:r.type!=="teil"&&r.type!=="baugruppe"?{erlaubt:!1,grund:"dnd.nur-teile"}:s.id===r.id||Ci(r).some(a=>a.id===s.id)?{erlaubt:!1,grund:"dnd.eigener-nachfahre"}:s.type!=="baugruppe"?{erlaubt:!1,grund:"dnd.kein-behaelter"}:is(i,r.id)?.id===s.id?{erlaubt:!1,grund:"dnd.schon-darin"}:{erlaubt:!0}}fokusEigenschaften=!1;offenesSchliessen=null;kontextOeffnen=null;dndAbbrechen=null;zeigerPos={x:0,y:0};feldBefund=null;einpassenNoetig=!0;kanteBei(e,t,i){const r=this.find(e),s=r?this.huelle(e):null;if(!r||!s||!this.szene||r.content.length>0||r.type==="teil"||r.type==="baugruppe")return null;let a=null;for(const o of this.szene.kantenVon(e,s)){const l=o.bis.x-o.von.x,c=o.bis.y-o.von.y,u=l*l+c*c||1,h=Math.max(0,Math.min(1,((t-o.von.x)*l+(i-o.von.y)*c)/u)),f=Math.hypot(t-(o.von.x+h*l),i-(o.von.y+h*c));f<=8&&(!a||f<a.d)&&(a={adresse:o.adresse,d:f})}return a?{art:"kante",adresse:a.adresse}:null}griffUebernehmen(){const e=this.griff;if(!e)return;const t=e.eingabe!==""?Number(e.eingabe):e.wert;e.aktiv=!1,this.vorschau=null,e.wert=t,e.eingabe="",t>0&&t!==e.start&&this.wertSetzen(e.id,e.name,{value:t,unit:"mm"},"griff"),e.sichtbarBis=performance.now()+700,setTimeout(()=>{this.griff=null,this.rendern()},700),this.rendern()}griffAbbrechen(){this.vorschau=null,this.griff=null,this.rendern()}suchTreffer(){return iu(this)}geisterKoerper(){const e=this.chat.vorschlag;if(!e)return[];const t=ln(this.dokument());for(const r of e.befehle){if(r.id!=="element.wert-setzen")continue;const s=Et(t,String(r.parameter.element));s&&(s.params[String(r.parameter.name)]=r.parameter.wert)}const i=new Set(wt(t).filter(r=>JSON.stringify(r.params)!==JSON.stringify(this.find(r.id)?.params)).map(r=>r.id));return Fn(t).koerper.filter(r=>i.has(r.elementId))}anwendbar(e){const t=this.gewaehlteElemente(),i=r=>t.some(r);switch(e.id){case"bearbeiten.rueckgaengig":return this.kannRueckgaengig();case"bearbeiten.wiederholen":return this.kannWiederholen();case"element.umbenennen":return t.length===1;case"element.duplizieren":case"element.wert-setzen":case"auswahl.duplizieren":return t.length>0;case"element.verwerfen":case"auswahl.verwerfen":return i(r=>!Vt(r));case"element.zurueckholen":return i(r=>Vt(r));case"element.ausblenden":case"auswahl.ausblenden":return i(r=>!this.istAusgeblendet(r.id));case"element.einblenden":return i(r=>this.istAusgeblendet(r.id));case"element.pausieren":return i(r=>r.meta.pausiert!==!0);case"element.fortsetzen":return i(r=>r.meta.pausiert===!0);case"element.aktivieren":return t.length===1&&t[0]?.id!==this.aktiv;case"element.verlassen":return this.aktiv!==null;case"element.umhaengen":return t.length===1&&(t[0]?.type==="teil"||t[0]?.type==="baugruppe");case"ansicht.alles-einblenden":return this.ausgeblendet.size>0||this.isoliert!==null;case"ansicht.anwenden":return t.length===1&&t[0]?.type==="view";case"auswahl.aufheben":return t.length>0;default:return!0}}naechsteZone(e=!1){const i=["menueleiste","taskleiste","struktur","modell","eigenschaften","chat","panel","rueckmeldung"].filter(o=>{const l=document.querySelector(`[data-zone="${o}"]`);return!!l&&l.getBoundingClientRect().width>0&&getComputedStyle(l).visibility!=="hidden"});if(!i.length)return;const r=this.fokusZone?i.indexOf(this.fokusZone):-1,a=i[(r+(e?-1:1)+i.length)%i.length];this.fokusZone=a,document.querySelector(`[data-zone="${a}"]`)?.focus(),this.tastenfokus=!0}huelleAlle(){const e=this.versteckteIds(),t=Fn(this.angezeigtesDokument()).koerper.filter(i=>!e.has(i.elementId)&&i.art!=="skizze");return Hv(t)}huelleAuswahl(){const e=Fn(this.angezeigtesDokument()).koerper,t=this.auswahlIds().map(i=>this.find(i)?Zl(this.find(i),e):null).filter(i=>!!i);return t.length?su(t):null}setzeKamera(e){this.szene?.nach({azimut:e.azimut,hoehe:e.hoehe,abstand:e.abstand,ziel:new I(e.ziel.x,e.ziel.y,e.ziel.z)},0)}elternId(e){return is(this.dokument(),e)?.id??null}}function su(n){const e=[1/0,1/0,1/0],t=[-1/0,-1/0,-1/0];for(const i of n)for(let r=0;r<3;r++)e[r]=Math.min(e[r],i.min[r]),t[r]=Math.max(t[r],i.max[r]);return{min:e,max:t}}function Hv(n){return n.length?su(n.map(e=>({min:e.min,max:e.max}))):null}function Gv(n){const e=[...n].sort((s,a)=>s.x-a.x||s.y-a.y);if(e.length<=2)return e;const t=(s,a,o)=>(a.x-s.x)*(o.y-s.y)-(a.y-s.y)*(o.x-s.x),i=[];for(const s of e){for(;i.length>=2&&t(i[i.length-2],i[i.length-1],s)<=0;)i.pop();i.push(s)}const r=[];for(const s of[...e].reverse()){for(;r.length>=2&&t(r[r.length-2],r[r.length-1],s)<=0;)r.pop();r.push(s)}return[...i.slice(0,-1),...r.slice(0,-1)]}function ss(n){const e=n.map(s=>s.x),t=n.map(s=>s.y),i=Math.min(...e),r=Math.min(...t);return{x:i,y:r,breite:Math.max(...e)-i,hoehe:Math.max(...t)-r}}function Wv(n,e,t=!0){const i=[],r=n.length;for(let s=0;s<(t?r:r-1);s++){const a=n[s],o=n[(s+1)%r],l=Math.hypot(o.x-a.x,o.y-a.y),c=Math.max(1,Math.floor(l/e));for(let u=0;u<c;u++)i.push({x:a.x+(o.x-a.x)*u/c,y:a.y+(o.y-a.y)*u/c})}return i}const xi={"farbe.hell.grund":"#F5F7F9","farbe.hell.flaeche":"#FDFDFE","farbe.hell.flaeche-2":"#EEF0F3","farbe.hell.linie":"#DDE0E3","farbe.hell.linie-stark":"#C8CBCE","farbe.hell.text":"#1B2025","farbe.hell.text-2":"#595E64","farbe.hell.text-3":"#82878C","farbe.hell.akzent":"#3A69AD","farbe.hell.akzent-flaeche":"#DFECFF","farbe.hell.auf-akzent":"#FFFFFF","farbe.hell.viewport":"#E6E8EA","farbe.hell.erfolg":"#227849","farbe.hell.erfolg-flaeche":"#DAF3E1","farbe.hell.warnung":"#CD9130","farbe.hell.warnung-text":"#7E5403","farbe.hell.warnung-flaeche":"#FAE9CE","farbe.hell.fehler":"#C13C36","farbe.hell.fehler-flaeche":"#FFE0DB","farbe.dunkel.grund":"#0D1012","farbe.dunkel.flaeche":"#15171A","farbe.dunkel.flaeche-2":"#1E2124","farbe.dunkel.linie":"#2B2E32","farbe.dunkel.linie-stark":"#3A3D41","farbe.dunkel.text":"#E6E8EA","farbe.dunkel.text-2":"#A1A5A9","farbe.dunkel.text-3":"#777B7F","farbe.dunkel.akzent":"#79A6E9","farbe.dunkel.akzent-flaeche":"#1E2E47","farbe.dunkel.auf-akzent":"#0D1012","farbe.dunkel.viewport":"#1B1D20","farbe.dunkel.erfolg":"#60BB83","farbe.dunkel.erfolg-flaeche":"#12301E","farbe.dunkel.warnung":"#EBB25F","farbe.dunkel.warnung-text":"#EBB25F","farbe.dunkel.warnung-flaeche":"#3C2A0E","farbe.dunkel.fehler":"#ED756A","farbe.dunkel.fehler-flaeche":"#3E1F1B","achse.x":"#DB423C","achse.y":"#3BA946","achse.z":"#2B7AD6","schrift.familie.ui":"Inter, system-ui, sans-serif","schrift.familie.mono":'"JetBrains Mono", ui-monospace, monospace',"schrift.merkmale":'"tnum" 1, "cv05" 1',"schrift.schnitt.normal":"400","schrift.schnitt.mittel":"500","schrift.schnitt.halbfett":"600","schrift.groesse.klein":"12px","schrift.groesse.basis":"13px","schrift.groesse.gross":"14px","schrift.groesse.titel":"16px","schrift.groesse.ueberschrift":"20px","schrift.groesse.anzeige":"24px","schrift.zeilenhoehe":"1.45","schrift.groesse-tablet.basis":"15px","abstand.1":"4px","abstand.2":"8px","abstand.3":"12px","abstand.4":"16px","abstand.5":"24px","abstand.6":"32px","radius.klein":"4px","radius.mittel":"6px","radius.gross":"8px","radius.karte":"12px","linie.breite":"1px","bedienflaeche.desktop":"28px","bedienflaeche.tablet":"44px","bewegung.kurz":"120ms","bewegung.mittel":"200ms","bewegung.kurve":"cubic-bezier(0.2, 0, 0, 1)","symbol.satz":"Lucide"},Qs=30,js=.35,Xv=.6,qv=30;class Yv{constructor(e){this.zone=e,this.canvas=document.createElement("canvas"),this.canvas.dataset.modell="",this.canvas.className="leinwand",e.prepend(this.canvas),this.renderer=new b0({canvas:this.canvas,antialias:!0,alpha:!1,powerPreference:"low-power"}),this.renderer.setPixelRatio(1),this.scene.add(this.gruppe),this.scene.add(this.licht.umgebung,this.licht.gerichtet,this.licht.gegen),this.setThema("hell"),new ResizeObserver(()=>this.groesseAnpassen()).observe(e),this.groesseAnpassen()}canvas;renderer;scene=new vh;persp=new Yt(Qs,1,10,2e4);ortho=new us(-1,1,1,-1,-2e4,2e4);gruppe=new Jn;licht={umgebung:new bf,gerichtet:new vl,gegen:new vl};objekte=[];zeichnung=null;thema="hell";angefordert=!1;tween=null;lausche=[];bboxCache=new Map;kamera={azimut:-35,hoehe:28,abstand:380,ziel:new I(0,0,14)};projektion="orthogonal";tempo=1;beiAenderung(e){this.lausche.push(e)}melde(){for(const e of this.lausche)e()}lichter(){return[{art:"umgebung",intensitaet:this.licht.umgebung.intensity},{art:"gerichtet",intensitaet:this.licht.gerichtet.intensity},{art:"gegen",intensitaet:this.licht.gegen.intensity}]}setThema(e){this.thema=e,this.renderer.setClearColor(new Ye(xi[`farbe.${e}.viewport`])),this.licht.umgebung.intensity=e==="hell"?1.15:1.25,this.licht.gerichtet.intensity=e==="hell"?1.7:2.1,this.licht.gegen.intensity=e==="hell"?.5:.7,this.licht.gerichtet.position.set(-1,-2,3),this.licht.gegen.position.set(2,1,1),this.zeichnung&&this.zeichne(this.zeichnung),this.anfordern()}groesseAnpassen(){const e=this.zone.getBoundingClientRect(),t=Math.max(1,Math.round(e.width)),i=Math.max(1,Math.round(e.height));this.renderer.setSize(t,i,!1),this.canvas.style.width=`${t}px`,this.canvas.style.height=`${i}px`,this.persp.aspect=t/i,this.persp.updateProjectionMatrix(),this.anfordern(),this.melde()}flaecheBreite(){return this.canvas.clientWidth||1}flaecheHoehe(){return this.canvas.clientHeight||1}halbeHoehe(e=this.kamera.abstand){return e*Math.tan(Qs*Math.PI/360)}pxProMm(){return this.flaecheHoehe()/(2*this.halbeHoehe())}kameraAnwenden(){const e=this.kamera,t=e.azimut*Math.PI/180,i=e.hoehe*Math.PI/180,r=new I(Math.sin(t)*Math.cos(i),-Math.cos(t)*Math.cos(i),Math.sin(i)),s=this.projektion==="orthogonal"?this.ortho:this.persp;if(s.up.set(0,0,1),Math.abs(e.hoehe)>89.5&&s.up.set(Math.sin(t)*-1,Math.cos(t),0),s.position.copy(e.ziel).addScaledVector(r,e.abstand),s.lookAt(e.ziel),this.projektion==="orthogonal"){const a=this.halbeHoehe(),o=a*(this.flaecheBreite()/this.flaecheHoehe());this.ortho.left=-o,this.ortho.right=o,this.ortho.top=a,this.ortho.bottom=-a,this.ortho.updateProjectionMatrix()}return s.updateMatrixWorld(!0),s}aktuelleKamera(){return this.kameraAnwenden()}drehen(e,t){this.tween=null,this.kamera.azimut+=e,this.kamera.hoehe=Math.max(-89,Math.min(89,this.kamera.hoehe+t)),this.geaendert()}schieben(e,t){this.tween=null;const i=this.kameraAnwenden(),r=new I().setFromMatrixColumn(i.matrixWorld,0),s=new I().setFromMatrixColumn(i.matrixWorld,1),a=1/this.pxProMm();this.kamera.ziel.addScaledVector(r,-e*a).addScaledVector(s,t*a),this.geaendert()}zoomen(e,t,i){this.tween=null;const r=t!==void 0&&i!==void 0?this.aufZielEbene(t,i):null;if(this.kamera.abstand=Math.max(40,Math.min(4e3,this.kamera.abstand/e)),r&&t!==void 0&&i!==void 0){this.kameraAnwenden();const s=this.aufZielEbene(t,i);s&&this.kamera.ziel.add(r.sub(s))}this.geaendert()}aufZielEbene(e,t){const i=this.kameraAnwenden(),r=this.canvas.getBoundingClientRect(),s=new fe((e-r.left)/r.width*2-1,-((t-r.top)/r.height)*2+1),a=new Sl;a.setFromCamera(s,i);const o=new I;i.getWorldDirection(o);const l=new Mn().setFromNormalAndCoplanarPoint(o,this.kamera.ziel);return a.ray.intersectPlane(l,new I)}geaendert(){this.anfordern(),this.melde()}nach(e,t){const i={...this.kamera,ziel:this.kamera.ziel.clone()},r={azimut:e.azimut??i.azimut,hoehe:e.hoehe??i.hoehe,abstand:e.abstand??i.abstand,ziel:e.ziel?e.ziel.clone():i.ziel.clone()};if(t<=0||this.tempo===0){this.kamera=r,this.tween=null,this.geaendert();return}this.tween={start:performance.now(),ende:performance.now()+t,von:i,nach:r},this.anfordern()}passeEin(e,t=200,i=.72){if(!e)return;const r=new I((e.min[0]+e.max[0])/2,(e.min[1]+e.max[1])/2,(e.min[2]+e.max[2])/2),s={...this.kamera,ziel:r.clone()},a=this.kamera;this.kamera=s;const o=this.kameraAnwenden(),l=new I().setFromMatrixColumn(o.matrixWorld,0),c=new I().setFromMatrixColumn(o.matrixWorld,1);let u=0,h=0;for(const C of[e.min[0],e.max[0]])for(const M of[e.min[1],e.max[1]])for(const w of[e.min[2],e.max[2]]){const E=new I(C,M,w).sub(r);u=Math.max(u,Math.abs(E.dot(l))),h=Math.max(h,Math.abs(E.dot(c)))}this.kamera=a;const f=this.zone.getBoundingClientRect(),d=Math.min(f.width,f.height),m=2*u/(i*d),x=2*h/(i*d),R=Math.max(m,x,.01)*f.height/2/Math.tan(Qs*Math.PI/360);this.nach({ziel:r,abstand:R},t)}koerperFarbe(){return new Ye(this.thema==="hell"?xi["farbe.hell.flaeche"]:xi["farbe.dunkel.text-3"])}geometrie(e){const[t,i,r]=e.min,[s,a,o]=e.max,l=new I((t+s)/2,(i+a)/2,(r+o)/2);switch(e.art){case"quader":{const c=new ti(s-t,a-i,o-r);return c.translate(l.x,l.y,l.z),[c]}case"platte":{const c=e.platte;if(!c)return[];const u=ea(c.laenge,c.breite,c.eckradius);for(const f of c.loecher){const d=new ts;d.absarc(f.x-l.x,f.y-l.y,c.lochD/2,0,Math.PI*2,!0),u.holes.push(d)}const h=new ns(u,{depth:c.dicke,bevelEnabled:!1,curveSegments:12});return h.translate(l.x,l.y,r),[h]}case"schale":{const c=e.wand??2,u=ea(s-t,a-i,0),h=new ts;h.moveTo(-(s-t)/2+c,-(a-i)/2+c),h.lineTo(-(s-t)/2+c,(a-i)/2-c),h.lineTo((s-t)/2-c,(a-i)/2-c),h.lineTo((s-t)/2-c,-(a-i)/2+c),h.closePath(),u.holes.push(h);const f=new ns(u,{depth:o-r-c,bevelEnabled:!1});f.translate(l.x,l.y,r+c);const d=new ti(s-t,a-i,c);return d.translate(l.x,l.y,r+c/2),[f,d]}case"rohr":{const c=e.rohr;if(!c)return[];const u=new So(c.d/2,c.d/2,o-r,24,1,!0);return u.rotateX(Math.PI/2),u.translate(c.x,c.y,l.z),[u]}default:return[]}}zeichne(e){this.zeichnung=e,this.bboxCache.clear();for(const s of this.objekte)this.gruppe.remove(s.gruppe);this.objekte=[];const t=this.koerperFarbe(),i=new Ye(xi[this.thema==="hell"?"farbe.hell.text":"farbe.dunkel.text"]),r=new Ye(xi[this.thema==="hell"?"farbe.hell.text-3":"farbe.dunkel.text-3"]);for(const s of e.koerper){if(e.versteckt.has(s.elementId))continue;const a=new Jn,o={elementId:s.elementId,gruppe:a,flaechen:[],kanten:[],skizze:s.art==="skizze"},l=e.gedimmt.has(s.elementId),c=e.blass.has(s.elementId);if(s.art==="skizze"&&s.platte){const h=ea(s.platte.laenge,s.platte.breite,s.platte.eckradius).getPoints(8).map(m=>new I(m.x,m.y,.05)),f=new Ft().setFromPoints([...h,h[0]]),d=new Tc(f,new qa({color:r,transparent:!0,opacity:l?js:1}));d.position.set((s.min[0]+s.max[0])/2,(s.min[1]+s.max[1])/2,0),a.add(d),this.gruppe.add(a),this.objekte.push(o);continue}for(const u of this.geometrie(s)){const h=l?js:c?Xv:e.darstellung==="durchsicht"?.3:1,f=new gf({color:t,flatShading:!0,side:s.art==="rohr"?jt:On,transparent:h<1,opacity:h,depthWrite:e.darstellung!=="durchsicht",colorWrite:e.darstellung!=="kanten",polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}),d=new nn(u,f);d.userData.elementId=s.elementId,d.userData.pickbar=!l,a.add(d),o.flaechen.push(d);const m=new Rh(new Ph(u,qv),new qa({color:l?r:i,transparent:l,opacity:l?js:1}));a.add(m),o.kanten.push(m)}this.gruppe.add(a),this.objekte.push(o)}for(const s of e.geister){const a=new Jn;for(const o of this.geometrie(s)){const l=new nn(o,new vo({color:new Ye(xi[`farbe.${this.thema}.akzent`]),transparent:!0,opacity:.35,depthWrite:!1,side:jt}));a.add(l)}this.gruppe.add(a),this.objekte.push({elementId:`${s.elementId}~geist`,gruppe:a,flaechen:[],kanten:[],skizze:!1})}this.anfordern(),this.melde()}zuNdc(e,t){const i=this.canvas.getBoundingClientRect();return new fe((e-i.left)/i.width*2-1,-((t-i.top)/i.height)*2+1)}trefferBei(e,t){const i=this.kameraAnwenden(),r=new Sl;r.setFromCamera(this.zuNdc(e,t),i),this.gruppe.updateMatrixWorld(!0);const s=this.objekte.flatMap(o=>o.flaechen).filter(o=>o.userData.pickbar),a=r.intersectObjects(s,!1)[0];return a?{elementId:String(a.object.userData.elementId),punkt:a.point.clone(),normale:a.face?a.face.normal.clone():new I}:null}projiziere(e){const t=this.kameraAnwenden(),i=(e instanceof I?e.clone():new I(e[0],e[1],e[2])).project(t),r=this.canvas.getBoundingClientRect();return{x:r.left+(i.x+1)/2*r.width,y:r.top+(1-i.y)/2*r.height}}eckenProjiziert(e){const t=[];for(const i of[e.min[0],e.max[0]])for(const r of[e.min[1],e.max[1]])for(const s of[e.min[2],e.max[2]])t.push(this.projiziere([i,r,s]));return t}kantenVon(e,t){const i=(s,a,o)=>[s==="l"?t.min[0]:t.max[0],a==="v"?t.min[1]:t.max[1],o==="u"?t.min[2]:t.max[2]],r=[];for(const s of["o","u"]){const a=s==="o"?"oben":"unten";r.push([`${a}-vorn`,i("l","v",s),i("r","v",s)]),r.push([`${a}-hinten`,i("l","h",s),i("r","h",s)]),r.push([`${a}-links`,i("l","v",s),i("l","h",s)]),r.push([`${a}-rechts`,i("r","v",s),i("r","h",s)])}for(const s of["l","r"])for(const a of["v","h"])r.push([`${a==="v"?"vorn":"hinten"}-${s==="l"?"links":"rechts"}`,i(s,a,"u"),i(s,a,"o")]);return r.map(([s,a,o])=>{const l=this.projiziere(a),c=this.projiziere(o);return{adresse:`${e}/k/${s}`,elementId:e,name:s,von:l,bis:c,mitte:{x:(l.x+c.x)/2,y:(l.y+c.y)/2}}})}gezeichnet(){return[...new Set(this.objekte.map(e=>e.elementId).filter(e=>!e.includes("~")))]}hatKoerper(){return this.objekte.length>0}anfordern(){this.angefordert||(this.angefordert=!0,requestAnimationFrame(()=>{this.angefordert=!1,this.rahmen()}))}rahmen(){if(this.tween){const e=this.tween,t=performance.now(),i=Math.min(1,(t-e.start)/(e.ende-e.start)),r=i<.5?2*i*i:1-(-2*i+2)**2/2;this.kamera={azimut:e.von.azimut+(e.nach.azimut-e.von.azimut)*r,hoehe:e.von.hoehe+(e.nach.hoehe-e.von.hoehe)*r,abstand:e.von.abstand+(e.nach.abstand-e.von.abstand)*r,ziel:e.von.ziel.clone().lerp(e.nach.ziel,r)},i>=1?this.tween=null:this.anfordern(),this.melde()}this.jetztRendern()}jetztRendern(){const e=this.kameraAnwenden();this.renderer.render(this.scene,e)}setProjektion(e){this.projektion=e,this.geaendert()}}function ea(n,e,t){const i=new kc,r=-n/2,s=-e/2;return t<=0?(i.moveTo(r,s),i.lineTo(r+n,s),i.lineTo(r+n,s+e),i.lineTo(r,s+e),i.closePath(),i):(i.moveTo(r+t,s),i.lineTo(r+n-t,s),i.absarc(r+n-t,s+t,t,-Math.PI/2,0,!1),i.lineTo(r+n,s+e-t),i.absarc(r+n-t,s+e-t,t,0,Math.PI/2,!1),i.lineTo(r+t,s+e),i.absarc(r+t,s+e-t,t,Math.PI/2,Math.PI,!1),i.lineTo(r,s+t),i.absarc(r+t,s+t,t,Math.PI,Math.PI*1.5,!1),i)}function $v(n){const e=n.gewaehlteElemente();let t;if(e.length>1)t=Z("span",{class:"chip","data-chip":""},n.t("chat.n-elemente",{n:e.length}));else{const i=e[0]??(n.aktiv?n.find(n.aktiv):void 0)??n.dokument(),r=e[0]?n.zustaende(i.id):[];t=Z("span",{class:"chip","data-chip":"","data-id":i.id,"data-zustand":r.join(" ")||null,"data-akzent":r.includes("ausgewaehlt")?"auswahl":null},i.meta.name)}return Z("div",{class:"kontext","data-chat-kontext":"","data-key":"kontext"},Z("span",{class:"zu"},n.t("chat.zu"))," ",t)}function Zv(n){const e=n.chat.vorschlag;return e?Z("div",{class:"karte","data-muster":"Entscheidungskarte","data-quelle":"ki","data-akzent":"ki","data-key":"karte"},Z("div",{class:"karte-kopf"},vt("sparkles",14),Z("span",{class:"simuliert"},n.t("simuliert"))),Z("div",{class:"karte-titel"},e.titel),Z("div",{class:"karte-text"},e.begruendung),...e.werte.map((t,i)=>Z("div",{class:"karte-wert","data-key":`w-${i}`},Z("span",{class:"feld"},t.feld),Z("span",{class:"vorher"},t.vorher),vt("chevron-right",12),Z("span",{class:"nachher"},t.nachher))),Z("div",{class:"karte-knoepfe"},Z("button",{type:"button",class:"knopf","data-befehl":"chat.verwerfen"},n.t("chat.verwerfen")),Z("button",{type:"button",class:"knopf haupt","data-befehl":"chat.uebernehmen","data-hauptaktion":"","data-akzent":"hauptaktion"},n.t("chat.uebernehmen")))):null}function Kv(n){return[Z("div",{class:"zonenkopf","data-key":"kopf"},Z("h2",{},n.t("chat.titel")),Z("span",{class:"simuliert"},n.t("simuliert"))),$v(n),Z("div",{class:"nachrichten",role:"log","data-key":"nachrichten"},...n.chat.nachrichten.length?n.chat.nachrichten.map((e,t)=>Z("div",{class:`nachricht ${e.von}`,"data-key":`n-${t}`},e.schluessel?n.t(e.schluessel,e.werte):e.text)):[Z("p",{class:"hinweis","data-key":"hinweis"},n.t("chat.hinweis"))],Zv(n)),Z("div",{class:"eingabezeile","data-key":"eingabe"},Z("input",{type:"text",class:"chat-eingabe","data-chat-eingabe":"","data-befehl":"chat.senden",placeholder:n.t("chat.platzhalter"),"aria-label":n.t("chat.platzhalter"),value:n.chat.eingabe,autocomplete:"off"}),Z("button",{type:"button",class:"schalter","data-befehl":"chat.senden","data-chat-senden":"","aria-label":n.t("befehl.chat.senden"),title:n.t("befehl.chat.senden")},vt("arrow-up")))]}const au={mm:1,cm:10,m:1e3},Jv={n:1,kn:1e3},Qv=new Set(["kg","g"]),Kl=(n,e)=>n??e;class jv{constructor(e,t){this.text=e,this.standardFaktor=t}pos=0;blank(){for(;this.text[this.pos]===" ";)this.pos+=1}naechstes(){return this.blank(),this.text[this.pos]??""}fertig(){return this.naechstes()===""}ausdruck(){let e=this.produkt();for(;;){const t=this.naechstes();if(t!=="+"&&t!=="-")return e;this.pos+=1;const i=this.produkt();if(e.dim!==null&&i.dim!==null&&e.dim!==i.dim)throw new bi("wert.fehler.dimension");e={wert:t==="+"?e.wert+i.wert:e.wert-i.wert,dim:Kl(e.dim,i.dim)}}}produkt(){let e=this.faktor();for(;;){const t=this.naechstes();if(t!=="*"&&t!=="/")return e;this.pos+=1;const i=this.faktor();if(t==="/"){if(i.wert===0)throw new bi("wert.fehler.teilung");e={wert:e.wert/i.wert,dim:e.dim}}else e={wert:e.wert*i.wert,dim:Kl(e.dim,i.dim)}}}faktor(){const e=this.naechstes();if(e==="-"){this.pos+=1;const t=this.faktor();return{wert:-t.wert,dim:t.dim}}if(e==="("){this.pos+=1;const t=this.ausdruck();if(this.naechstes()!==")")throw new bi("wert.fehler.nicht-lesbar");return this.pos+=1,t}return this.zahl()}zahl(){this.blank();const e=this.text.slice(this.pos),t=/^(\d+(?:[.,]\d+)?|[.,]\d+)\s*([a-zA-Z]*)/.exec(e);if(!t||t[1]===void 0)throw new bi("wert.fehler.nicht-lesbar");this.pos+=t[0].length;const i=Number(t[1].replace(",",".")),r=(t[2]??"").toLowerCase();if(r==="")return{wert:i*this.standardFaktor,dim:null};const s=au[r];if(s!==void 0)return{wert:i*s,dim:"laenge"};const a=Jv[r];if(a!==void 0)return{wert:i*a,dim:"kraft"};if(Qv.has(r))return{wert:i*(r==="kg"?1e3:1),dim:"masse"};throw new bi("wert.fehler.nicht-lesbar")}}class bi extends Error{constructor(e){super(e),this.schluessel=e}}function Jl(n,e="mm",t="laenge"){const i=new jv(n.replace(/×/g,"*").replace(/−/g,"-").trim(),t==="kraft"?1:au[e]??1);try{const r=i.ausdruck();return i.fertig()?r.dim!==null&&r.dim!==t?{ok:!1,fehler:"wert.fehler.dimension"}:Number.isFinite(r.wert)?{ok:!0,groesse:{value:Math.round(r.wert*1e6)/1e6,unit:t==="kraft"?"N":"mm"}}:{ok:!1,fehler:"wert.fehler.nicht-lesbar"}:{ok:!1,fehler:"wert.fehler.nicht-lesbar"}}catch(r){if(r instanceof bi)return{ok:!1,fehler:r.schluessel};throw r}}function ex(n,e="de"){const t=String(Math.round(n.value*100)/100);return`${e==="de"?t.replace(".",","):t} ${n.unit}`}const wo=(n,e,t)=>{const i=(Math.round(n*10**e)/10**e).toFixed(e);return t==="en"?i:i.replace(".",",")},tx=n=>n==="en"?"en":"de";function eo(n,e){return ex(n,tx(e))}const nx=(n,e)=>`${wo(n/1e3,2,e)} cm³`,ix=(n,e)=>`${wo(n,2,e)} g`;function rx(n,e){const t=i=>wo(i,1,e).replace(/[.,]0$/,"");return`${t(n[0])} × ${t(n[1])} × ${t(n[2])} mm`}const sx={extrusion:["laenge","breite","dicke","hoehe","eckradius"],schale:["laenge","breite","hoehe","wand"],skizze:["laenge","breite","eckradius"],bohrung:["durchmesser"]};function Ql(n,e){const i=[...zn(n.dokument(),e.id)].reverse().find(r=>typeof r.params.material=="string");return String(e.params.material??i?.params.material??"PLA")}function ou(n,e){const t=n.sprache;if(e.type==="teil"||e.type==="baugruppe"||e.type==="projekt"){const r=Fn(e.id===n.dokument().id?n.angezeigtesDokument():e),s=[{key:"masse",felder:[{key:"abmessungen",param:null,text:rx(r.abmessungen_mm,t),editierbar:!1}]}];return(e.type==="teil"||r.volumen_mm3>0)&&(s.push({key:"material",felder:[{key:"material",param:null,text:Ql(n,e),editierbar:!1}]}),s.push({key:"ergebnis",felder:[{key:"volumen",param:null,text:nx(r.volumen_mm3,t),editierbar:!1},{key:"masse-wert",param:null,text:ix(r.masse_g,t),editierbar:!1}]})),s}if(e.type==="view")return[{key:"ansicht",felder:[{key:"projektion",param:null,text:n.t(`projektion.${String(e.params.projektion)}`),editierbar:!1},{key:"darstellung",param:null,text:n.t(`darstellung.${String(e.params.darstellung)}`),editierbar:!1}]}];const i=[];for(const r of sx[e.type]??[])e.params[r]!==void 0&&i.push({key:r,param:r,text:eo(e.params[r],t),editierbar:!0});return[{key:"masse",felder:i},{key:"material",felder:[{key:"material",param:null,text:Ql(n,e),editierbar:!1}]}]}function ax(n,e){const t=e.map(a=>ou(n,a)),i=new Set,r=t[0]??[],s=[];for(const a of r){const o=[];for(const l of a.felder){const c=t.map(h=>h.flatMap(f=>f.felder).find(f=>f.key===l.key));if(c.some(h=>!h))continue;const u=c.every(h=>h?.text===l.text);u||i.add(l.key),o.push({...l,text:u?l.text:n.t("eigenschaften.gemischt")})}o.length&&s.push({key:a.key,felder:o})}return{gruppen:s,gemischt:i}}function ox(n,e,t,i){const r=n.feldBefund?.feld===e.key?n.feldBefund:null;return Z("div",{class:"feld","data-feld":e.key,"data-key":e.key},Z("label",{},n.t(`feld.${e.key}`)),e.editierbar?Z("input",{type:"text",class:"wertfeld","data-muster":"Wertfeld","data-feld-eingabe":e.key,"data-param":e.param,"data-elemente":t.join(","),"data-gemischt":i?"true":null,"aria-label":n.t(`feld.${e.key}`),value:e.text,autocomplete:"off"}):Z("span",{class:"wert","data-wert-text":""},e.text),r?Z("div",{class:"befund am-feld","data-muster":"Befund","data-schwere":"warnung"},n.t(r.schluessel)):null)}function lx(n){const e=n.gewaehlteElemente(),t=a=>Z("div",{class:"zonenkopf","data-key":"kopf"},typeof a=="string"?Z("h2",{},a):a);if(e.length>1){const{gruppen:a,gemischt:o}=ax(n,e),l=e.map(c=>c.id);return[t(n.t("eigenschaften.n-elemente",{n:e.length})),...a.map(c=>jl(n,c,l,o))]}const i=e[0]??(n.aktiv?n.find(n.aktiv):void 0)??n.dokument(),s=n.umbenennen?.id===i.id?Z("input",{type:"text",class:"titel-eingabe","data-umbenennen":i.id,"data-editiert":"",value:i.meta.name,"aria-label":n.t("befehl.element.umbenennen")}):Z("h2",{"data-name-feld":i.id,title:n.t("eigenschaften.umbenennen-hinweis")},i.meta.name);return[t(s),Vt(i)?Z("div",{class:"hinweis","data-key":"verworfen"},n.t("struktur.verworfen")):null,...ou(n,i).map(a=>jl(n,a,[i.id],new Set))].filter(a=>!!a)}function jl(n,e,t,i){return Z("section",{class:"gruppe","data-gruppe":e.key,"data-key":`g-${e.key}`},Z("h3",{},n.t(`gruppe.${e.key}`)),...e.felder.map(r=>ox(n,r,t,i.has(r.key))))}function to(n,e,t={}){const i=n.anwendbar(e);return Z("button",{type:"button",role:"menuitem",class:"eintrag","data-befehl":e.id,"data-par":t.par?JSON.stringify(t.par):null,"data-mehr":t.mehr?"true":null,"aria-disabled":!i||e.folgt?"true":null,"data-folgt":e.folgt?"true":null,tabindex:"-1"},Z("span",{class:"titel"},n.t(e.titel)),e.folgt?Z("span",{class:"folgt"},n.t("menue.folgt")):null,e.kuerzel?Z("kbd",{},ar(e.kuerzel,n.sprache)):null)}function as(n,e){return k0(n.register,e).map(t=>Z("div",{role:"group",class:"untergruppe","data-untergruppe":t.name,"data-key":`ug-${t.name}`},Z("div",{class:"gruppenkopf"},n.t(`untergruppe.${t.name.replace(/ \d+$/,"")}`)),...t.eintraege.map(i=>to(n,i))))}function Eo(n,e,t="menue",i=""){return Z("div",{role:"menu",class:`popup ${i}`.trim(),"data-overlay":"menue","data-ort":n,"data-weg":t},...e)}function cx(n){const e=n.kontextMenue;return e?Z("div",{role:"menu",class:"popup kontextmenue","data-overlay":"kontextmenue","data-ort":"kontextmenue","data-weg":"kontextmenue","data-art":e.art,style:`left:${Math.round(e.x)}px;top:${Math.round(e.y)}px`},...e.gruppen.map(t=>{const i=e.mehr.has(t.familie),r=t.eintraege.filter(a=>!a.mehr),s=t.eintraege.filter(a=>a.mehr);return Z("div",{role:"group",class:"untergruppe","data-gruppe":t.familie,"data-key":`gr-${t.familie}`},Z("div",{class:"gruppenkopf"},n.t(`familie.${t.familie}`)),...r.map(a=>to(n,a.befehl)),s.length?Z("button",{type:"button",class:"eintrag mehr-knopf","data-mehr-toggle":t.familie,"aria-expanded":i?"true":"false",tabindex:"-1"},n.t("menue.mehr")):null,s.length?Z("div",{class:"mehr",hidden:i?null:"","data-key":`mehr-${t.familie}`},...s.map(a=>to(n,a.befehl,{mehr:!0}))):null)})):null}const ux={modellieren:["Bearbeiten","Auswahl","Baugruppe","Fenster"],simulation:["Simulation"]};function ec(n,e,t,i){const r=n.menue===e;return Z("div",{class:"menue-eintrag","data-key":e},Z("button",{type:"button",class:"menue-knopf","data-menue-trigger":e,"aria-haspopup":"menu","aria-expanded":r?"true":"false",tabindex:"-1"},t),r?Eo(i,as(n,e.replace("dropdown:","").replace("start","Datei"))):null)}function ta(n,e,t,i){const r=n.befehl(e);return Z("button",{type:"button",class:"schalter","data-befehl":e,"aria-pressed":i?"true":"false",title:r?`${n.t(r.titel)}${r.kuerzel?` (${ar(r.kuerzel,n.sprache)})`:""}`:e,"aria-label":r?n.t(r.titel):e},vt(t))}function tc(n,e,t,i){const r=n.befehl(e);return Z("button",{type:"button",class:"schalter mit-kuerzel","data-befehl":e,"aria-disabled":i?null:"true",title:r?n.t(r.titel):e,"aria-label":r?n.t(r.titel):e},vt(t),r?.kuerzel?Z("kbd",{},ar(r.kuerzel,n.sprache)):null)}function hx(n){const e=n.befehl("suche.oeffnen");return[ec(n,"start",n.t("menue.start"),"start-menue"),...ux[n.task].map(t=>ec(n,`dropdown:${t}`,n.t(`familie.${t}`),t==="Fenster"?"menueleiste":`dropdown-${t.toLowerCase()}`)),Z("div",{class:"platz"}),Z("div",{class:"menue-eintrag suche-eintrag","data-key":"suche"},Z("button",{type:"button",class:"suchfeld","data-befehl":"suche.oeffnen","aria-expanded":n.suche.offen?"true":"false",tabindex:"-1"},vt("search"),Z("span",{class:"platzhalter"},n.t("suche.platzhalter")),e?.kuerzel?Z("kbd",{},ar(e.kuerzel,n.sprache)):null),n.suche.offen?Bv(n):null),tc(n,"bearbeiten.rueckgaengig","undo-2",n.kannRueckgaengig()),tc(n,"bearbeiten.wiederholen","redo-2",n.kannWiederholen()),Z("div",{class:"schalter-gruppe",role:"group","data-key":"schalter"},ta(n,"fenster.struktur","panel-left",n.zonen.struktur),ta(n,"fenster.panel","panel-bottom",n.zonen.panel),ta(n,"fenster.rechts","panel-right",n.zonen.rechts))]}const fx={teil:"box",baugruppe:"boxes",extrusion:"layers",schale:"layers",skizze:"pencil",bohrung:"circle-dot",view:"focus"};function lu(n,e){const t=n.zustaende(e);return t.includes("fehlerhaft")?{zustand:"fehlerhaft",symbol:"circle-alert",token:"fehler"}:t.includes("rechnet")?{zustand:"rechnet",symbol:"loader",token:"text-2"}:t.includes("pausiert")?{zustand:"pausiert",symbol:"circle-pause",token:"text-2"}:null}function cu(n,e,t){return Z("span",{class:"status","data-muster":"Statusanzeige","data-zustand":e.zustand,"data-status-token":e.token,"data-element":t,role:"status"},vt(e.symbol,14),Z("span",{class:"wort"},n.t(`status.${e.zustand}`)))}function dx(n,e,t,i){const r=n.zustaende(e.id),s=n.auswahlIds().includes(e.id),a=n.istAusgeblendet(e.id),o=lu(n,e.id),l=r.includes("andere");return Z("div",{role:"treeitem",class:"zeile","data-key":e.id,"data-id":e.id,"data-ebene":String(t),"data-zustand":r.join(" ")||null,"data-akzent":s?"auswahl":r.includes("hover")?"ueberfahren":n.dnd?.ziel===e.id&&n.dnd.erlaubt?"auswahl":null,"aria-selected":s?"true":"false","aria-level":String(t+1),"aria-current":n.aktiv===e.id?"true":null,"data-ziel":n.dnd?.ziel===e.id?n.dnd.erlaubt?"erlaubt":"verboten":null,style:`--ebene:${t}`,tabindex:i===0?"0":"-1"},vt(fx[e.type]??"square",14),Z("span",{class:"name"},e.meta.name),o?cu(n,o,e.id):null,l?Z("span",{class:"person",title:n.t("anwesenheit.person")},n.t("anwesenheit.kuerzel")):null,Z("button",{type:"button",class:"auge","data-befehl":a?"element.einblenden":"element.ausblenden","data-par":JSON.stringify({element:e.id}),"data-weg":"struktur","data-ort":"auge","aria-label":n.t(a?"befehl.element.einblenden":"befehl.element.ausblenden"),"aria-pressed":a?"true":"false",tabindex:"-1"},vt(a?"eye-off":"eye",14)),Vt(e)?Z("span",{class:"verworfen-marke"},n.t("struktur.verworfen")):null)}function px(n){const e=n.zeilen(),t=n.dokument(),i=Z("div",{class:"zonenkopf","data-key":"kopf"},Z("h2",{},n.t("struktur.titel")),Z("div",{class:"menue-eintrag","data-key":"sichtbarkeit"},Z("button",{type:"button",class:"schalter","data-menue-trigger":"sichtbarkeit","aria-haspopup":"menu","aria-expanded":n.menue==="sichtbarkeit"?"true":"false",title:n.t("familie.Sichtbarkeit"),"aria-label":n.t("familie.Sichtbarkeit")},vt("eye")),n.menue==="sichtbarkeit"?Eo("auge",as(n,mx)):null));if(n.task==="simulation")return[i,Z("div",{class:"leer","data-muster":"Leerer Zustand","data-key":"leer"},Z("p",{},n.t("struktur.leer-simulation")))];const r=Z("div",{class:"wurzel","data-key":"wurzel","data-wurzel":t.id,"data-akzent":n.dnd?.ziel===t.id&&n.dnd.erlaubt?"auswahl":null,"data-ziel":n.dnd?.ziel===t.id?n.dnd.erlaubt?"erlaubt":"verboten":null},Z("span",{class:"beschriftung"},n.t("struktur.wurzel")),Z("span",{class:"name"},t.meta.name));return e.length?[i,r,Z("div",{role:"tree",class:"baum","data-key":"baum","aria-label":n.t("struktur.titel")},...e.map((s,a)=>dx(n,s.element,s.ebene,a)))]:[i,r,Z("div",{class:"leer","data-muster":"Leerer Zustand","data-key":"leer"},Z("p",{},n.t("struktur.leer")),n.unbekannterZustand?Z("div",{class:"befund","data-muster":"Befund","data-schwere":"warnung"},n.t("befund.zustand-unbekannt")):null,Z("button",{type:"button",class:"knopf haupt","data-befehl":"element.anlegen","data-par":JSON.stringify({typ:"teil"}),"data-hauptaktion":"","data-akzent":"hauptaktion"},n.t("befehl.element.anlegen")))]}const mx="Sichtbarkeit",uu={"element.duplizieren":"copy","auswahl.duplizieren":"copy","element.umbenennen":"pencil","element.verwerfen":"trash-2","auswahl.verwerfen":"trash-2","element.ausblenden":"eye-off","auswahl.ausblenden":"eye-off","element.einblenden":"eye","ansicht.auf-auswahl":"focus","ansicht.einpassen":"maximize","ansicht.isolieren":"cuboid","ansicht.alles-einblenden":"eye","ansicht.projektion":"box","darstellung.wechseln":"layers","element.zurueckholen":"undo-2","element.aktivieren":"maximize","element.wert-setzen":"pencil"};function rr(n,e){const t=n.huelle(e);return!t||!n.szene?null:Gv(n.szene.eckenProjiziert(t))}function gx(n){if(n.type==="extrusion"||n.type==="schale"){if(n.params.dicke!==void 0)return"dicke";if(n.params.hoehe!==void 0)return"hoehe"}return null}const _x=(n,e,t)=>{const i=e%2===1?.5:0;return{x:Math.round(n.x-t.x)+i,y:Math.round(n.y-t.y)+i}};function hu(n,e){const t=new Set([...n.auswahlIds(),...n.andereElemente(),...n.hover?[n.hover]:[]]),i=[];for(const r of t){if(n.istAusgeblendet(r))continue;const a=n.darstellungVon(r,"modell")?.kanaele.find(c=>c.kanal==="Kontur"),o=rr(n,r);if(!a||!o||o.length<3)continue;const l=a.breite??1;i.push({id:r,polygon:o.map(c=>_x(c,l,e)),token:a.token,breite:l,strichart:a.strichart??"durchgezogen",zustand:a.zustand})}return i}function vx(n,e){const t=n.szene?.canvas.getBoundingClientRect();if(!t)return[];const i=hu(n,{x:t.left,y:t.top}).find(a=>a.id===e);if(!i)return[];const r=i.breite%2===1?.5:0,s=i.polygon.map(a=>({x:a.x-r+t.left,y:a.y-r+t.top}));return Wv(s,4).map(a=>({x:Math.round(a.x),y:Math.round(a.y)}))}function xx(n,e,t,i){const r=hu(n,e),s=Sx(n,e);return Z("svg",{class:"konturen",width:String(t),height:String(i),viewBox:`0 0 ${t} ${i}`,"aria-hidden":"true","shape-rendering":"crispEdges"},...r.map(a=>Z("path",{"data-key":`kontur-${a.id}`,class:`kontur ${a.zustand}`,d:`M ${a.polygon.map(o=>`${o.x} ${o.y}`).join(" L ")} Z`,fill:"none","stroke-width":String(a.breite),"stroke-dasharray":a.strichart==="gestrichelt"?"6 4":null,"data-kontur-id":a.id,"data-kontur-token":a.token,"data-kontur-breite":String(a.breite),"data-kontur-strichart":a.strichart,"data-zustand":a.zustand,style:`stroke: var(--farbe-${a.token})`})),...s)}function Sx(n,e){const t=[];for(const i of n.auswahl){if(i.teil?.art!=="kante")continue;const r=n.huelle(i.element_id);if(!r||!n.szene)continue;const s=n.szene.kantenVon(i.element_id,r).find(a=>a.adresse===i.teil?.adresse);s&&t.push(Z("line",{"data-key":`kante-${s.adresse}`,x1:String(Math.round(s.von.x-e.x)),y1:String(Math.round(s.von.y-e.y)),x2:String(Math.round(s.bis.x-e.x)),y2:String(Math.round(s.bis.y-e.y)),"stroke-width":"3","data-kante":i.teil.adresse,style:"stroke: var(--farbe-akzent)"}))}return t}function bx(n){return Z("div",{class:"reiterzeile",role:"tablist","data-chrome":"","data-key":"reiter"},...n.projekt.content.map(e=>Z("button",{type:"button",role:"tab",class:"reiter","data-key":`tab-${e.id}`,"data-befehl":"dokument.wechseln","data-par":JSON.stringify({dok:e.id}),"aria-selected":e.id===n.dok?"true":"false",tabindex:"-1"},e.meta.name,n.andere.aktiv&&n.andere.dok===e.id?Z("span",{class:"person-marke","data-zustand":"andere",title:n.t("anwesenheit.person")},vt("user",12)):null)))}function Mx(n){const e=n.pfadGlieder(),t=n.dokument(),i=[];return e.forEach((r,s)=>{const a=s===e.length-1,o=r.id===t.id,l=n.zustaende(r.id);s>0&&i.push(Z("span",{class:"trenner","data-key":`t-${r.id}`},vt("chevron-right",12))),i.push(Z("button",{type:"button",class:"glied","data-key":`g-${r.id}`,"data-id":r.id,"data-befehl":o?"element.verlassen":"element.aktivieren","data-par":JSON.stringify({element:r.id}),"data-zustand":l.join(" ")||null,"data-akzent":l.includes("ausgewaehlt")?"auswahl":null,"aria-current":a?"location":null,tabindex:"-1"},r.meta.name))}),Z("nav",{class:"pfad","data-muster-kandidat":"Pfad","data-chrome":"","data-key":"pfad","aria-label":n.t("pfad.titel")},...i)}const yx=["ansicht.einpassen","ansicht.auf-auswahl","ansicht.isolieren","ansicht.alles-einblenden","ansicht.projektion","darstellung.wechseln"];function wx(n){const e=yx.map(t=>n.befehl(t)).filter(t=>!!t);return Z("div",{class:"ansichtsleiste",role:"toolbar","data-muster-kandidat":"Ansichtsleiste","data-chrome":"","data-ort":"ansichtsleiste","data-key":"ansichtsleiste","aria-label":n.t("ansichtsleiste.titel")},...e.map(t=>Z("button",{type:"button",class:"schalter","data-befehl":t.id,"data-key":`al-${t.id}`,"aria-disabled":n.anwendbar(t)?null:"true","aria-pressed":t.id==="ansicht.isolieren"?n.isoliert?"true":"false":null,title:n.t(t.titel),"aria-label":n.t(t.titel)},vt(uu[t.id]??"square"))),Z("div",{class:"menue-eintrag","data-key":"mehr"},Z("button",{type:"button",class:"schalter","data-menue-trigger":"ansicht","aria-haspopup":"menu","aria-expanded":n.menue==="ansicht"?"true":"false",title:n.t("ansichtsleiste.mehr"),"aria-label":n.t("ansichtsleiste.mehr")},vt("chevron-down")),n.menue==="ansicht"?Eo("ansichtsleiste",[...as(n,"Ansicht"),...as(n,"Ansicht speichern")],"menue","nach-oben"):null))}function Ex(n,e,t){const i=n.auswahlart();if(i==="keine"||n.dnd||n.griff)return null;const r=eu(n.register,i,h=>n.anwendbar(h)),s=z0(r);if(!s.length)return null;const o=n.auswahlIds().map(h=>rr(n,h)).filter(h=>!!h).flat();if(!o.length)return null;const l=ss(o),c=Math.min(Math.max(l.x+l.breite/2-e.x,110),t-110),u=Math.max(l.y-e.y-46,84);return Z("div",{class:"kontextaktionen",role:"toolbar","data-muster":"Kontextaktionen","data-chrome":"","data-weg":"kontextaktion","data-key":"kontextaktionen",style:`left:${Math.round(c)}px;top:${Math.round(u)}px`},...s.map(h=>Z("button",{type:"button",class:"schalter","data-befehl":h.id,"data-key":`ka-${h.id}`,title:n.t(h.titel),"aria-label":n.t(h.titel)},vt(uu[h.id]??"square"))))}function Ax(n,e){if(n.auswahlIds().length!==1)return null;const t=n.find(n.auswahlIds()[0]);if(!t||!n.szene||n.istAusgeblendet(t.id))return null;const i=gx(t),r=n.huelle(t.id);if(!i||!r)return null;const s=n.szene.projiziere([(r.min[0]+r.max[0])/2,(r.min[1]+r.max[1])/2,r.max[2]]);return Z("div",{class:"griff",role:"slider",tabindex:"-1","data-griff":t.id,"data-griff-name":i,"data-muster-kandidat":"Griff","data-chrome":"","data-akzent":"auswahl","aria-label":n.t(`feld.${i}`),"aria-valuenow":String(qe(t.params[i])),"data-key":"griff",style:`left:${Math.round(s.x-e.x)}px;top:${Math.round(s.y-e.y-22)}px`},vt("arrow-up",14))}function Tx(n,e){const t=[];for(const[r,s]of n.zeilen().entries()){const a=lu(n,s.element.id);if(!a||n.istAusgeblendet(s.element.id))continue;const o=rr(n,s.element.id);if(!o)continue;const l=ss(o);t.push(Z("div",{class:"modell-status","data-chrome":"","data-key":`ms-${s.element.id}`,style:`left:${Math.round(l.x-e.x)}px;top:${Math.round(l.y-e.y-22)}px`},cu(n,a,s.element.id)))}const i=n.andereElemente()[0];if(i){const r=rr(n,i);if(r){const s=ss(r);t.push(Z("div",{class:"namensschild","data-chrome":"","data-key":"namensschild","data-person":"",style:`left:${Math.round(s.x-e.x)}px;top:${Math.round(s.y-e.y-44)}px`},n.t("anwesenheit.person")),Z("div",{class:"fremder-zeiger","data-chrome":"","data-key":"fremder-zeiger","data-zeiger":"",style:`left:${Math.round(s.x+s.breite*.75-e.x)}px;top:${Math.round(s.y+s.hoehe*.55-e.y)}px`},vt("user",14),Z("span",{class:"name"},n.t("anwesenheit.person")),Z("span",{class:"simuliert"},n.t("simuliert"))))}}return t}function Rx(n,e){const t=n.griff;if(!t)return null;const i=t.eingabe!==""?t.eingabe:String(Math.round(t.wert));return Z("div",{class:"zeigerzahl","data-zeigerzahl":"","data-chrome":"","data-key":"zeigerzahl",style:`left:${Math.round(t.zeiger.x-e.x+14)}px;top:${Math.round(t.zeiger.y-e.y-28)}px`},`${i} mm`)}function Cx(n){const t=n.szene?.canvas.getBoundingClientRect(),i={x:t?.left??0,y:t?.top??0},r=Math.round(t?.width??0),s=Math.round(t?.height??0),a=n.dokument().content.length===0;return[xx(n,i,r,s),bx(n),Mx(n),n.aktiv?Z("button",{type:"button",class:"knopf haupt fertig","data-chrome":"","data-befehl":"element.verlassen","data-hauptaktion":"","data-akzent":"hauptaktion","data-key":"fertig"},n.t("aktiv.fertig")):null,a?Z("div",{class:"leer mitte","data-muster":"Leerer Zustand","data-key":"leer-modell"},Z("p",{},n.t("modell.leer"))):null,Ex(n,i,r),Ax(n,i),...Tx(n,i),Rx(n,i),wx(n)]}function Px(n){const e=n.befunde();return[Z("div",{class:"zonenkopf","data-key":"kopf"},Z("h2",{},n.t("panel.befunde")),Z("button",{type:"button",class:"schalter","data-befehl":"fenster.panel","aria-label":n.t("befehl.fenster.panel"),title:n.t("befehl.fenster.panel")},vt("x",14))),e.length?Z("div",{class:"befunde","data-key":"liste"},...e.map(t=>{const i=n.letzterGueltigerWert(t);return Z("div",{class:"befund","data-muster":"Befund","data-schwere":"fehler","data-element":t.elementId,"data-key":`b-${t.elementId}`},Z("span",{class:"schwere"},vt("circle-alert",14),Z("span",{class:"wort"},n.t("status.fehlerhaft"))),Z("span",{class:"ort"},n.name(t.elementId)),Z("span",{class:"text"},n.t(t.schluessel,{wert:`${t.wert} mm`,grenze:`${t.grenze} mm`})),Z("button",{type:"button",class:"knopf","data-befehl":"element.wert-setzen","data-weg":"befund","data-par":JSON.stringify({element:t.elementId,name:t.parameter,wert:{value:i,unit:"mm"}})},n.t("befund.korrektur")))})):Z("div",{class:"leer","data-muster":"Leerer Zustand","data-key":"leer"},Z("p",{},n.t("panel.keine-befunde")))]}function Lx(n){const e=n.rueckmeldung;return e?[Z("span",{class:"rueckmeldung-text","data-muster":"Rueckmeldung",role:"status","data-key":"text"},n.t(e.schluessel,e.werte))]:[]}function nc(n,e,t){const i=n.task===e;return Z("button",{type:"button",class:"task","data-befehl":"task.wechseln","data-par":JSON.stringify({task:e}),"aria-pressed":i?"true":"false","aria-current":i?"true":null,title:n.t(`task.${e}`),"aria-label":n.t(`task.${e}`)},vt(t,20))}function Dx(n){return[Z("div",{class:"tasks",role:"group","data-key":"tasks"},nc(n,"modellieren","box"),nc(n,"simulation","play")),Z("div",{class:"unten","data-key":"unten"},Z("button",{type:"button",class:"task","aria-disabled":"true",title:n.t("task.shop"),"aria-label":n.t("task.shop")},vt("layers",20)))]}class Ix{constructor(e,t){this.wurzel=e,this.app=t;const i=(s,a,o={})=>{const l=Z(a,{"data-zone":s,tabindex:"0","aria-label":t.t(`zone.${s}`),...o});return this.zonen[s]=l,l};this.rahmen=Z("div",{class:"fenster"});const r=Z("div",{class:"rechts-spalte"});r.append(i("eigenschaften","section",{"data-weg":"eigenschaften"}),i("chat","section",{"data-weg":"chat"})),this.rahmen.append(i("menueleiste","header",{role:"menubar"}),i("taskleiste","nav"),i("struktur","aside",{"data-weg":"struktur"}),i("modell","main"),r,i("panel","section",{"data-weg":"menue"}),i("rueckmeldung","footer")),this.zonen.menueleiste.dataset.weg="menue",this.chrome=Z("div",{class:"chrome"}),this.overlay=Z("div",{class:"ueberlagerung"}),this.zonen.modell.append(this.chrome),this.wurzel.replaceChildren(this.rahmen,this.overlay),this.szene=new Yv(this.zonen.modell),this.szene.tempo=t.tempo,t.szene=this.szene,this.szene.beiAenderung(()=>this.chromeNeu()),t.beiRendern(()=>this.rendern())}rahmen;zonen={};chrome;overlay;zeichenSignatur="";klassen="";szene;chromeGeplant=!1;chromeNeu(){this.chromeGeplant||(this.chromeGeplant=!0,requestAnimationFrame(()=>{this.chromeGeplant=!1,this.chromeZeichnen()}))}chromeZeichnen(){const e=Z("div",{class:"chrome"},...Cx(this.app).filter(t=>!!t));qr(this.chrome,e)}zone(e,t){const i=Z("div",{},...t.filter(r=>!!r));qr(this.zonen[e],this.mitAttributen(this.zonen[e],i))}mitAttributen(e,t){for(const i of[...e.attributes])t.setAttribute(i.name,i.value);return t}rendern(){const e=this.app,t=e.zonen,i=[t.struktur?"":"ohne-struktur",t.rechts?"":"ohne-rechts",t.panel?"mit-panel":""].filter(Boolean).join(" ");i!==this.klassen&&(this.klassen=i,this.rahmen.className=`fenster ${i}`.trim(),this.szene.groesseAnpassen()),this.szene.projektion!==e.projektionsart&&this.szene.setProjektion(e.projektionsart),document.documentElement.dataset.thema=e.thema,this.rahmen.dataset.task=e.task,this.zone("menueleiste",hx(e)),this.zone("taskleiste",Dx(e)),this.zone("struktur",px(e)),this.zone("eigenschaften",lx(e)),this.zone("chat",Kv(e)),this.zone("panel",t.panel?Px(e):[]),this.zone("rueckmeldung",Lx(e)),this.zeichneSzene(),this.chromeZeichnen(),this.ueberlagerung(),this.fokusSetzen()}fokusSetzen(){const e=this.app,t=document.activeElement;if(e.suche.offen){const i=this.rahmen.querySelector("[data-suchfeld]");i&&t!==i&&!e.suche.fokussiert&&(e.suche.fokussiert=!0,i.focus())}else e.suche.fokussiert=!1;if(e.umbenennen){const i=this.rahmen.querySelector("[data-umbenennen]");i&&t!==i&&!e.umbenennenFokussiert&&(e.umbenennenFokussiert=!0,i.focus(),i.select())}else e.umbenennenFokussiert=!1;e.fokusEigenschaften&&(e.fokusEigenschaften=!1,this.rahmen.querySelector("[data-feld-eingabe]")?.focus())}zeichneSzene(){const e=this.app,t=e.angezeigtesDokument(),i=Fn(t),r=e.versteckteIds(),s=e.gedimmteIds(),a=e.blasseIds(),o=e.geisterKoerper(),l=JSON.stringify([t,[...r],[...s],[...a],e.darstellung,e.thema,o]);l!==this.zeichenSignatur&&(this.zeichenSignatur=l,this.szene.zeichne({koerper:i.koerper,darstellung:e.darstellung,versteckt:r,gedimmt:s,blass:a,geister:o}),e.einpassenNoetig&&(e.einpassenNoetig=!1,this.einpassenSofort()))}einpassenSofort(){this.szene.groesseAnpassen(),this.szene.passeEin(this.app.huelleAlle(),0)}neuesDokument(){this.zeichenSignatur=""}ueberlagerung(){const e=this.app,t=[],i=cx(e);if(i&&t.push(i),e.dnd){const r=e.find(e.dnd.id);t.push(Z("div",{class:"zieh-vorschau","data-overlay":"ziehen","data-muster-kandidat":"Ziehen & Ablegen","data-key":"ziehen",style:`left:${Math.round(e.dnd.x+14)}px;top:${Math.round(e.dnd.y+14)}px`},r?.meta.name??""))}qr(this.overlay,Z("div",{class:"ueberlagerung"},...t))}}async function kx(n,e,t){n.textContent=t("katalog.titel"),document.documentElement.dataset.bereit="1"}const ic=tu;function Yr(n,e){return(ic[n]??Object.values(ic)[0])?.[e]??{}}function Nx(n,e,t){const i=Yr(n,e);for(const r of["verschieben","drehen","zoomen"])for(const s of i[r]??[])if(s.taste===t.taste&&!!s.umschalt===t.umschalt&&!!s.strg===t.strg)return r;return null}const Ux=n=>n!==0&&(Math.abs(n)%100===0||Math.abs(n)%120===0);function zx(n,e){if(e.ctrlKey)return(Yr(n,"trackpad").zoomen??[]).some(s=>s.spreizen)?"zoomen":null;if(e.deltaX===0&&Ux(e.deltaY))return(Yr(n,"maus").zoomen??[]).some(s=>s.rad)?"zoomen":null;const i=Yr(n,"trackpad"),r=e.shiftKey;for(const s of["verschieben","drehen"])if((i[s]??[]).some(a=>a.wischen&&!!a.umschalt===r))return s;return null}function Fx(n,e){const t=n.huelle(e);if(!t||!n.szene)return{x:0,y:-1};const i=(t.min[0]+t.max[0])/2,r=(t.min[1]+t.max[1])/2,s=n.szene.projiziere([i,r,t.max[2]]),a=n.szene.projiziere([i,r,t.max[2]+1]);return{x:a.x-s.x,y:a.y-s.y}}const na=4;function Ox(n){try{return JSON.parse(n.dataset.par??"{}")}catch{return{}}}function Bx(n){return n.closest("[data-weg]")?.dataset.weg??"menue"}function Vx(n,e){const t=document.getElementById("app"),i=e.zonen.modell,r=e.zonen.struktur;let s=!1;const a=b=>{const y=n.find(b)?.type==="view";n.ausfuehren(y?"ansicht.anwenden":"element.aktivieren",{element:b},"struktur")},o=()=>{let b=!1;return n.menue&&(n.menue=null,b=!0),n.kontextMenue&&(n.kontextMenue=null,b=!0),n.suche.offen&&(n.suche.offen=!1,b=!0),b&&n.rendern(),b};n.offenesSchliessen=o,t.addEventListener("click",b=>{const y=b.target;if(s){s=!1;return}const H=y.closest("[data-menue-trigger]");if(H){const he=H.dataset.menueTrigger;n.kontextMenue=null,n.suche.offen=!1,n.menue=n.menue===he?null:he,n.rendern();return}const F=y.closest("[data-mehr-toggle]");if(F&&n.kontextMenue){const he=F.dataset.mehrToggle;n.kontextMenue.mehr.has(he)?n.kontextMenue.mehr.delete(he):n.kontextMenue.mehr.add(he),n.rendern();return}const Y=y.closest("[data-suche-element]");if(Y){n.suche.offen=!1,n.waehle(Y.dataset.sucheElement,"setzen");return}const K=y.closest("[data-befehl]");if(K&&!(K instanceof HTMLInputElement)){if(K.getAttribute("aria-disabled")==="true"&&K.dataset.folgt!=="true")return;n.ausfuehren(K.dataset.befehl,Ox(K),Bx(K));return}const ye=y.closest('[role="treeitem"]');if(ye){const he=ye.dataset.id;if(n.umhaengenModus){n.ausfuehren("element.umhaengen",{element:n.umhaengenModus,ziel:he},"struktur");return}n.offenesSchliessen?.(),n.waehle(he,b.shiftKey?"hinzufuegen":b.ctrlKey||b.metaKey?"umschalten":"setzen"),ye.focus();return}if(y.closest('[data-zone="struktur"]')&&!y.closest(".zonenkopf, .wurzel, .popup, [data-muster]")){n.setzeAuswahl([]);return}if(y.closest('[data-zone="modell"]')&&!y.closest("[data-chrome], .griff, .popup")){l(b);return}y.closest(".popup, .suche-eintrag, .menue-eintrag")||o()});function l(b){o();const y=n.szene?.trefferBei(b.clientX,b.clientY),H=b.shiftKey?"hinzufuegen":b.ctrlKey||b.metaKey?"umschalten":"setzen";if(!y){H==="setzen"&&n.setzeAuswahl([]);return}const F=n.zielFuerTreffer(y.elementId);if(!F){H==="setzen"&&n.setzeAuswahl([]);return}const Y=n.kanteBei(F,b.clientX,b.clientY);n.waehle(F,H,Y??void 0),i.focus({preventScroll:!0})}t.addEventListener("dblclick",b=>{const y=b.target,H=y.closest('[role="treeitem"]');if(H&&!y.closest("button")){a(H.dataset.id);return}const F=y.closest("[data-name-feld]");if(F){n.ausfuehren("element.umbenennen",{element:F.dataset.nameFeld},"eigenschaften");return}if(y.closest('[data-zone="modell"]')&&!y.closest("[data-chrome], .griff, .popup")){const Y=n.szene?.trefferBei(b.clientX,b.clientY),K=Y?n.zielFuerTreffer(Y.elementId):null;K&&n.ausfuehren("element.aktivieren",{element:K},"menue")}});function c(b,y){const H=n.auswahlart(),F=eu(n.register,H,ye=>n.anwendbar(ye));n.menue=null,n.suche.offen=!1;const Y=260,K=420;n.kontextMenue={x:Math.max(4,Math.min(b,window.innerWidth-Y-4)),y:Math.max(4,Math.min(y,window.innerHeight-K-4)),art:H,gruppen:F,mehr:new Set},n.rendern()}n.kontextOeffnen=c;let u=!1,h=null;function f(b,y){const H=n.szene?.trefferBei(b,y),F=H?n.zielFuerTreffer(H.elementId):null;if(F){const Y=n.kanteBei(F,b,y),K=zn(n.dokument(),H?.elementId??F).map(he=>he.id);(!n.auswahl.some(he=>K.includes(he.element_id))||Y)&&n.waehle(F,"setzen",Y??void 0)}else n.setzeAuswahl([]);c(b,y)}t.addEventListener("contextmenu",b=>{const y=b.target,H=y.closest('[role="treeitem"]');if(H){b.preventDefault();const F=H.dataset.id;n.auswahlIds().includes(F)||n.waehle(F,"setzen"),c(b.clientX,b.clientY);return}if(y.closest('[data-zone="struktur"]')&&!y.closest(".popup")){b.preventDefault(),n.setzeAuswahl([]),c(b.clientX,b.clientY);return}if(y.closest('[data-zone="modell"]')&&!y.closest("[data-chrome], .popup")){if(b.preventDefault(),u){h={x:b.clientX,y:b.clientY};return}if(m.bewegt)return;f(b.clientX,b.clientY);return}y.closest(".popup")&&b.preventDefault()});let d=null;const m={art:null,x:0,y:0,startX:0,startY:0,bewegt:!1,pointerId:-1},x=new Map;let g=null;const p=b=>{n.hover!==b&&(n.hover=b,n.rendern())};t.addEventListener("pointerdown",b=>{const y=b.target,H=y.closest(".griff");if(H&&b.button===0){P(b,H);return}const F=y.closest('[role="treeitem"]');if(F&&b.button===0&&!y.closest("button, input")){d={id:F.dataset.id,x:b.clientX,y:b.clientY};return}if(y.closest('[data-zone="modell"]')&&!y.closest("[data-chrome], .popup")){if(b.pointerType==="touch"){x.set(b.pointerId,{x:b.clientX,y:b.clientY}),g=R(),m.art=x.size===1?"drehen":null,m.x=b.clientX,m.y=b.clientY,m.startX=b.clientX,m.startY=b.clientY,m.bewegt=!1;return}const Y=Nx(n.profil,"maus",{taste:b.button,umschalt:b.shiftKey,strg:b.ctrlKey||b.metaKey});m.art=Y==="drehen"||Y==="verschieben"?Y:null,m.x=b.clientX,m.y=b.clientY,m.startX=b.clientX,m.startY=b.clientY,m.bewegt=!1,m.pointerId=b.pointerId,u=b.button===2,m.art&&b.button!==0&&b.preventDefault()}});function R(){const b=[...x.values()];if(b.length<2)return null;const[y,H]=b;return{cx:(y.x+H.x)/2,cy:(y.y+H.y)/2,d:Math.hypot(y.x-H.x,y.y-H.y)}}window.addEventListener("pointermove",b=>{if(n.zeigerPos={x:b.clientX,y:b.clientY},n.griff?.aktiv){v(b);return}if(d&&!n.dnd&&Math.hypot(b.clientX-d.x,b.clientY-d.y)>na&&(n.dnd={id:d.id,x:b.clientX,y:b.clientY,ziel:null,erlaubt:null}),n.dnd){M(b);return}if(b.pointerType==="touch"&&x.has(b.pointerId)){x.set(b.pointerId,{x:b.clientX,y:b.clientY}),C(b);return}if(m.art&&b.buttons){const H=b.clientX-m.x,F=b.clientY-m.y;if(m.x=b.clientX,m.y=b.clientY,Math.hypot(b.clientX-m.startX,b.clientY-m.startY)>na&&(m.bewegt=!0),!m.bewegt)return;m.art==="drehen"?n.szene?.drehen(-H*.4,F*.4):n.szene?.schieben(H,F);return}const y=b.target;if(!b.buttons){const H=y.closest('[role="treeitem"]');if(H)return p(H.dataset.id);if(y.closest('[data-zone="modell"]')&&!y.closest("[data-chrome], .popup")){const F=n.szene?.trefferBei(b.clientX,b.clientY);return p(F?n.zielFuerTreffer(F.elementId):null)}p(null)}});function C(b){if(x.size===1){const H=b.clientX-m.x,F=b.clientY-m.y;m.x=b.clientX,m.y=b.clientY,Math.hypot(b.clientX-m.startX,b.clientY-m.startY)>na*2&&(m.bewegt=!0),m.bewegt&&m.art==="drehen"&&n.szene?.drehen(-H*.4,F*.4);return}const y=R();y&&g&&(n.szene?.schieben(y.cx-g.cx,y.cy-g.cy),g.d>0&&y.d>0&&Math.abs(y.d-g.d)>.5&&n.szene?.zoomen(y.d/g.d,y.cx,y.cy)),g=y,m.bewegt=!0}window.addEventListener("pointerup",b=>{if(u&&b.pointerType!=="touch"){u=!1;const y=h;h=null,y&&!m.bewegt&&f(y.x,y.y)}if(b.pointerType==="touch"&&(x.delete(b.pointerId),g=R(),x.size||(m.art=null)),n.griff?.aktiv){T();return}if(n.dnd){w();return}d&&(d=null),m.art&&b.pointerId===m.pointerId&&(m.art=null,setTimeout(()=>{m.bewegt=!1},0))}),t.addEventListener("pointerleave",()=>p(null)),r.addEventListener("pointerleave",()=>p(null));function M(b){const y=n.dnd;if(!y)return;y.x=b.clientX,y.y=b.clientY;const F=document.elementFromPoint(b.clientX,b.clientY)?.closest('[role="treeitem"], [data-wurzel]'),Y=F?.dataset.id??F?.dataset.wurzel??null;if(Y&&Y!==y.id){const K=n.ablegenPruefen(y.id,Y);y.ziel=Y,y.erlaubt=K.erlaubt,y.grund=K.grund,K.grund&&n.meldung(K.grund)}else y.ziel=null,y.erlaubt=null;n.rendern()}function w(){const b=n.dnd;d=null,b&&(n.dnd=null,s=!0,setTimeout(()=>{s=!1},0),b.ziel&&b.erlaubt?n.ausfuehren("element.umhaengen",{element:b.id,ziel:b.ziel},"struktur"):n.rendern())}n.dndAbbrechen=()=>n.dnd?(n.dnd=null,d=null,n.rendern(),!0):!1;let E=null;function P(b,y){const H=y.dataset.griff,F=y.dataset.griffName,Y=n.find(H);if(!Y)return;b.preventDefault();const K=Fx(n,H);E={vx:K.x,vy:K.y,x0:b.clientX,y0:b.clientY};const ye=qe(Y.params[F]);n.griff={id:H,name:F,start:ye,wert:ye,eingabe:"",zeiger:{x:b.clientX,y:b.clientY},sichtbarBis:null,aktiv:!0},n.rendern()}function v(b){const y=n.griff;if(!y||!E)return;y.zeiger={x:b.clientX,y:b.clientY};const H=E.vx**2+E.vy**2||1,F=((b.clientX-E.x0)*E.vx+(b.clientY-E.y0)*E.vy)/H;y.wert=Math.max(1,Math.round(y.start+F)),y.eingabe="",n.vorschau={id:y.id,name:y.name,wert:{value:y.wert,unit:"mm"}},n.rendern()}function T(){n.griff&&n.griffUebernehmen()}i.addEventListener("wheel",b=>{if(b.target.closest("[data-chrome], .popup"))return;b.preventDefault();const y=zx(n.profil,b);if(y==="zoomen"){const H=Math.exp(-b.deltaY*(b.ctrlKey?.01:.002));n.szene?.zoomen(H,b.clientX,b.clientY)}else y==="verschieben"?n.szene?.schieben(-b.deltaX,-b.deltaY):y==="drehen"&&n.szene?.drehen(-b.deltaX*.4,b.deltaY*.4)},{passive:!1}),t.addEventListener("focusin",b=>{const y=b.target;y instanceof HTMLInputElement&&y.dataset.feldEingabe&&(y.setAttribute("data-editiert",""),y.select());const H=y.closest("[data-zone]");H&&(n.fokusZone=H.dataset.zone??null)}),t.addEventListener("focusout",b=>{const y=b.target;y instanceof HTMLInputElement&&y.dataset.feldEingabe?(y.removeAttribute("data-editiert"),k(y,!1)):y instanceof HTMLInputElement&&y.dataset.umbenennen&&(y.removeAttribute("data-editiert"),n.umbenennen&&y.value.trim()&&y.value.trim()!==n.name(y.dataset.umbenennen)?O(y):n.umbenennen&&(n.umbenennen=null,n.rendern()))}),t.addEventListener("input",b=>{const y=b.target;y.dataset.feldEingabe?L(y):y.dataset.suchfeld!==void 0?(n.suche.text=y.value,n.suche.index=0,n.suche.alle=!1,n.rendern()):y.dataset.chatEingabe!==void 0&&(n.chat.eingabe=y.value)});function L(b){const y=(b.dataset.elemente??"").split(",").filter(Boolean),H=b.dataset.param,F=Jl(b.value);if(!F.ok){n.feldBefund={feld:b.dataset.feldEingabe,schluessel:F.fehler},n.vorschau=null,n.rendern();return}n.feldBefund=null,y.length===1&&(n.vorschau={id:y[0],name:H,wert:F.groesse}),n.rendern()}function k(b,y){const H=(b.dataset.elemente??"").split(",").filter(Boolean),F=b.dataset.param,Y=Jl(b.value);if(!Y.ok){n.feldBefund={feld:b.dataset.feldEingabe,schluessel:Y.fehler},y||(n.vorschau=null,n.feldBefund=null),n.rendern();return}n.feldBefund=null,n.vorschau=null,n.ausfuehren("element.wert-setzen",H.length===1?{element:H[0],name:F,wert:Y.groesse}:{elemente:H,name:F,wert:Y.groesse},"eigenschaften")}function O(b){const y=n.umbenennen?.weg??"eigenschaften";n.ausfuehren("element.umbenennen",{element:b.dataset.umbenennen,name:b.value},y)}t.addEventListener("keydown",b=>{const y=b.target;if(y instanceof HTMLInputElement&&y.dataset.feldEingabe){b.key==="Enter"?(b.preventDefault(),k(y,!0),y.blur()):b.key==="Escape"&&(b.preventDefault(),b.stopPropagation(),n.vorschau=null,n.feldBefund=null,y.removeAttribute("data-editiert"),y.blur(),n.rendern());return}if(y instanceof HTMLInputElement&&y.dataset.umbenennen){b.key==="Enter"?(b.preventDefault(),y.removeAttribute("data-editiert"),y.value.trim()?O(y):(n.umbenennen=null,n.rendern()),e.zonen.eigenschaften.focus()):b.key==="Escape"&&(b.preventDefault(),b.stopPropagation(),y.removeAttribute("data-editiert"),n.umbenennen=null,n.rendern(),e.zonen.eigenschaften.focus());return}if(y instanceof HTMLInputElement&&y.dataset.suchfeld!==void 0){X(b);return}if(y instanceof HTMLInputElement&&y.dataset.chatEingabe!==void 0){b.key==="Enter"&&(b.preventDefault(),n.ausfuehren("chat.senden",{text:y.value},"chat"));return}z(b),V(b)});function X(b){const y=n.suchTreffer().length;if(b.key==="ArrowDown")b.preventDefault(),n.suche.index=Math.min(y-1,n.suche.index+1),n.rendern();else if(b.key==="ArrowUp")b.preventDefault(),n.suche.index=Math.max(0,n.suche.index-1),n.rendern();else if(b.key==="Enter"){b.preventDefault();const H=n.suchTreffer()[n.suche.index];n.suche.offen=!1,H?n.ausfuehren(H.id,{},"suche"):n.rendern()}}function z(b){const y=b.target.closest(".popup");if(!y||!["ArrowDown","ArrowUp"].includes(b.key))return;const H=[...y.querySelectorAll(".eintrag:not([hidden] *)")].filter(K=>K.offsetParent!==null),F=H.indexOf(b.target),Y=H[(F+(b.key==="ArrowDown"?1:-1)+H.length)%H.length];Y&&(b.preventDefault(),Y.focus())}function V(b){const y=b.target.closest('[role="treeitem"]');if(!y)return;const H=[...r.querySelectorAll('[role="treeitem"]')],F=H.indexOf(y);if(b.key==="ArrowDown"||b.key==="ArrowUp"){b.preventDefault();const Y=H[Math.max(0,Math.min(H.length-1,F+(b.key==="ArrowDown"?1:-1)))];for(const K of H)K.tabIndex=-1;Y&&(Y.tabIndex=0,Y.focus())}else b.key==="Enter"?(b.preventDefault(),a(y.dataset.id)):b.key===" "&&(b.preventDefault(),n.waehle(y.dataset.id,b.shiftKey?"hinzufuegen":b.ctrlKey||b.metaKey?"umschalten":"setzen"))}}function Hx(n){const e=n.split("+"),t=(e[e.length-1]??"").toLowerCase(),i=new Set(e.slice(0,-1).map(r=>r.toLowerCase()));return{mod:i.has("mod"),umschalt:i.has("umschalt")||i.has("shift"),alt:i.has("alt"),taste:t}}const Gx=new Set(["delete","backspace"]);function Wx(n,e){const t=e.ctrlKey||e.metaKey;return n.mod!==t||n.umschalt!==e.shiftKey||n.alt!==e.altKey?!1:n.taste==="entf"?Gx.has(e.key.toLowerCase()):/^f\d+$/.test(n.taste)?e.key.toLowerCase()===n.taste:n.taste.length===1&&e.code===`Key${n.taste.toUpperCase()}`||e.key.toLowerCase()===n.taste}function Xx(n,e){for(const t of n)if(t.kuerzel&&Wx(Hx(t.kuerzel),e))return t;return null}function qx(n){window.addEventListener("keydown",e=>{const t=e.target,i=t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t?.isContentEditable===!0;if(n.tastenfokus=!0,n.griff?.aktiv){if(/^\d$/.test(e.key))n.griff.eingabe+=e.key,n.griff.wert=Number(n.griff.eingabe),n.vorschau={id:n.griff.id,name:n.griff.name,wert:{value:n.griff.wert,unit:"mm"}},n.rendern();else if(e.key==="Backspace")n.griff.eingabe=n.griff.eingabe.slice(0,-1),n.rendern();else if(e.key==="Enter")n.griffUebernehmen();else if(e.key==="Escape")n.griffAbbrechen();else return;e.preventDefault(),e.stopPropagation();return}if(e.key==="Escape"){if(n.offenesSchliessen?.()){e.preventDefault();return}if(n.dndAbbrechen?.()){e.preventDefault();return}if(n.umhaengenModus){n.umhaengenModus=null,n.rendern();return}if(n.chat.vorschlag&&t?.closest('[data-zone="chat"]')){n.chat.vorschlag=null,n.rendern();return}if(n.auswahl.length){n.setzeAuswahl([]);return}if(n.aktiv){n.ausfuehren("element.verlassen",{},"kuerzel");return}return}const r=t instanceof HTMLInputElement&&t.hasAttribute("data-feld-eingabe"),s=Xx(n.register,e);if(!s)return;const a=e.ctrlKey||e.metaKey;if(!(i&&!a&&!/^f\d+$/i.test(s.kuerzel??""))&&!(i&&a&&(s.id==="auswahl.alles"||s.id==="element.duplizieren"))&&!(i&&r&&(s.id==="bearbeiten.rueckgaengig"||s.id==="bearbeiten.wiederholen"))&&!(i&&t instanceof HTMLInputElement&&t.dataset.suchfeld!==void 0&&a&&s.id!=="suche.oeffnen")){if(e.preventDefault(),s.id==="fenster.naechste-zone"){n.naechsteZone(e.shiftKey);return}if(s.id==="suche.oeffnen"){n.ausfuehren("suche.oeffnen",{},"kuerzel");return}n.anwendbar(s)&&n.ausfuehren(s.id,{},"kuerzel")}},!0)}const ia=["koerper","kanten","durchsicht"];function Yn(n,e){return typeof e.element=="string"?[e.element]:Array.isArray(e.elemente)?e.elemente.map(String):n.auswahlIds()}function Yx(n,e){const t=ln(e),i=new Set(wt(n).map(a=>a.id)),r=a=>{let o=2,l=`${a}-${o}`;for(;i.has(l);)l=`${a}-${o+=1}`;return i.add(l),l},s=a=>{a.id=r(a.id.replace(/-\d+$/,""));for(const o of a.content)s(o)};return s(t),t}const $x=n=>String.fromCharCode(65+n%26);function Zx(n){const e=n.registriere.bind(n),t=n.t;e("element.anlegen",(l,c,u)=>{const h=typeof l.typ=="string"?l.typ:"teil",f=n.neuesElement(h);n.protokolliere("element.anlegen",{typ:h},c,u),n.auswahl=[{element_id:f}],n.meldung("rueck.angelegt",{name:n.name(f)})}),e("baugruppe.anlegen",(l,c,u)=>{const h=n.neuesElement("baugruppe");n.protokolliere("baugruppe.anlegen",{},c,u),n.auswahl=[{element_id:h}],n.meldung("rueck.angelegt",{name:n.name(h)})}),e("element.umbenennen",(l,c,u)=>{const h=typeof l.element=="string"?l.element:n.auswahlIds()[0];if(!h||typeof l.element!="string"&&n.auswahlIds().length!==1)return!1;if(typeof l.name!="string"){n.umbenennen={id:h,weg:c},n.auswahl=[{element_id:h}];return}const f=l.name.trim();if(n.umbenennen=null,!f)return!1;const d=n.aendern(m=>{const x=Et(m,h);x&&(x.meta.name=f)});return d&&(n.protokolliere("element.umbenennen",{element:h,name:f},c,u),n.meldung("rueck.umbenannt",{name:f})),d});const i=l=>(c,u,h)=>{const f=Yn(n,c),d=[],m=n.aendern(x=>{for(const g of f){const p=Et(x,g),R=p?is(x,g):void 0;if(!p||!R)continue;const C=Yx(x,p);if(C.meta.name=`${p.meta.name} ${t("name.kopie")}`,C.params.lage_y!==void 0||C.params.breite!==void 0){const M=C.params.breite?qe(C.params.breite)+6:20;C.params.lage_y={value:qe(C.params.lage_y)+M,unit:"mm"}}else C.params.lage_x!==void 0&&(C.params.lage_x={value:qe(C.params.lage_x)+100,unit:"mm"});R.content.splice(R.content.indexOf(p)+1,0,C),d.push(C.id)}});return m&&(n.protokolliere(l,f.length===1?{element:f[0]}:{elemente:f},u,h),n.auswahl=d.map(x=>({element_id:x})),n.meldung("rueck.dupliziert",{name:n.name(d[0]??"")})),m};e("element.duplizieren",i("element.duplizieren")),e("auswahl.duplizieren",i("auswahl.duplizieren"));const r=l=>(c,u,h)=>{const f=Yn(n,c).filter(x=>n.find(x)&&!Vt(n.find(x)));if(!f.length)return!1;const d=f.map(x=>n.name(x)),m=n.aendern(x=>{for(const g of f){const p=Et(x,g);p&&(p.meta.verworfen=!0)}});return m&&(n.protokolliere(l,f.length===1?{element:f[0]}:{elemente:f},u,h),n.auswahl=n.auswahl.filter(x=>!f.includes(x.element_id)),n.aktiv&&f.includes(n.aktiv)&&(n.aktiv=null),n.meldung("rueck.verworfen",{name:d[0]??""})),m};e("element.verwerfen",r("element.verwerfen")),e("auswahl.verwerfen",r("auswahl.verwerfen")),e("element.zurueckholen",(l,c,u)=>{const h=Yn(n,l),f=n.aendern(d=>{for(const m of h){const x=Et(d,m);x&&delete x.meta.verworfen}});return f&&(n.protokolliere("element.zurueckholen",{element:h[0]},c,u),n.meldung("rueck.zurueckgeholt",{name:n.name(h[0]??"")})),f}),e("element.wert-setzen",(l,c,u)=>{const h=typeof l.element=="string"?l.element:n.auswahlIds()[0];return!h||typeof l.name!="string"||!l.wert?(n.fokusEigenschaften=!0,!1):n.wertSetzen(h,l.name,l.wert,c,u)});const s=l=>(c,u,h)=>{const f=Yn(n,c),d=n.aendern(m=>{for(const x of f){const g=Et(m,x);g&&(l?g.meta.pausiert=!0:delete g.meta.pausiert)}});return d&&n.protokolliere(l?"element.pausieren":"element.fortsetzen",{element:f[0]},u,h),d};e("element.pausieren",s(!0)),e("element.fortsetzen",s(!1)),e("element.umhaengen",(l,c,u)=>{const h=typeof l.element=="string"?l.element:n.auswahlIds()[0];if(!h)return!1;if(typeof l.ziel!="string"){n.umhaengenModus=h,n.meldung("rueck.ziel-waehlen");return}const f=l.ziel;n.umhaengenModus=null;const d=n.ablegenPruefen(h,f);if(!d.erlaubt)return n.meldung(d.grund??"dnd.kein-ziel"),!1;const m=n.aendern(x=>{const g=Et(x,h),p=g?is(x,h):void 0,R=f===x.id?x:Et(x,f);!g||!p||!R||(p.content.splice(p.content.indexOf(g),1),R.content.push(g))});return m&&(n.protokolliere("element.umhaengen",{element:h,ziel:f},c,u),n.meldung("rueck.umgehaengt",{name:n.name(h),ziel:n.name(f)})),m}),e("ansicht.speichern",(l,c,u)=>{const h=n.szene?.kamera;if(!h)return!1;const f=wt(n.dokument()).filter(g=>g.type==="view").length,d=`${t("name.ansicht")}: ${t("name.schnitt")} ${$x(f)}`;let m="";const x=n.aendern(g=>{m=Jc(g,"ansicht");const p={id:m,type:"view",params:{azimut:{value:h.azimut,unit:"°"},hoehe:{value:h.hoehe,unit:"°"},abstand:{value:h.abstand,unit:"mm"},ziel_x:{value:h.ziel.x,unit:"mm"},ziel_y:{value:h.ziel.y,unit:"mm"},ziel_z:{value:h.ziel.z,unit:"mm"},projektion:n.projektionsart,darstellung:n.darstellung,auswahl:ln(n.auswahl),ausgeblendet:[...n.ausgeblendet]},content:[],meta:{name:d}};g.content.push(p)});return x&&(n.protokolliere("ansicht.speichern",{name:d},c,u),n.meldung("rueck.ansicht-gespeichert",{name:d})),x}),e("bearbeiten.rueckgaengig",(l,c,u)=>{n.rueckgaengig(c,u)}),e("bearbeiten.wiederholen",(l,c,u)=>{n.wiederholen(c,u)}),e("auswahl.alles",()=>{n.setzeAuswahl(n.waehlbareIds().map(l=>({element_id:l})))}),e("auswahl.aufheben",()=>n.setzeAuswahl([])),e("auswahl.umkehren",()=>{const l=new Set(n.auswahlIds());n.setzeAuswahl(n.waehlbareIds().filter(c=>!l.has(c)).map(c=>({element_id:c})))});const a=l=>c=>{const u=Array.isArray(c.elemente)?c.elemente.map(String):[];if(!u.length)return n.meldung("rueck.auswahl-ziel"),!1;u.forEach((h,f)=>n.waehle(h,l==="setzen"&&f>0?"hinzufuegen":l))};e("auswahl.setzen",a("setzen")),e("auswahl.hinzufuegen",a("hinzufuegen")),e("auswahl.umschalten",a("umschalten")),e("element.ausblenden",l=>{for(const c of Yn(n,l))n.ausgeblendet.add(c)}),e("auswahl.ausblenden",l=>{for(const c of Yn(n,l))n.ausgeblendet.add(c)}),e("element.einblenden",l=>{for(const c of Yn(n,l))n.ausgeblendet.delete(c)}),e("ansicht.alles-einblenden",()=>{n.ausgeblendet.clear(),n.isoliert=null}),e("ansicht.verworfenes",()=>{n.verworfenesZeigen=!n.verworfenesZeigen}),e("ansicht.isolieren",()=>{n.isoliert?n.isoliert=null:n.auswahlIds().length?n.isoliert=n.auswahlIds():n.meldung("rueck.isolieren-ziel")}),e("element.aktivieren",l=>{const c=typeof l.element=="string"?l.element:n.auswahlIds()[0],u=c?n.find(c):void 0;if(!u)return!1;n.aktiv=u.id,n.auswahl=[]}),e("element.verlassen",()=>{n.aktiv=null}),e("ansicht.einpassen",()=>n.szene?.passeEin(n.huelleAlle(),200*n.tempo)),e("ansicht.auf-auswahl",()=>{const l=n.huelleAuswahl();n.szene?.passeEin(l??n.huelleAlle(),200*n.tempo)}),e("ansicht.projektion",()=>{n.projektionsart=n.projektionsart==="orthogonal"?"perspektivisch":"orthogonal",n.szene?.setProjektion(n.projektionsart)}),e("darstellung.wechseln",()=>{const l=ia.indexOf(n.darstellung);n.darstellung=ia[(l+1)%ia.length]??"koerper"});const o=(l,c)=>()=>n.szene?.nach({azimut:l,hoehe:c},200*n.tempo);e("ansicht.vorne",o(0,0)),e("ansicht.oben",o(0,89)),e("ansicht.isometrisch",o(-35,28)),e("ansicht.anwenden",l=>{const c=typeof l.element=="string"?l.element:n.auswahlIds()[0],u=c?n.find(c):void 0;if(!u||u.type!=="view"||!n.szene)return!1;const h=u.params;n.projektionsart=h.projektion==="perspektivisch"?"perspektivisch":"orthogonal",n.szene.setProjektion(n.projektionsart),n.darstellung=h.darstellung==="kanten"||h.darstellung==="durchsicht"?h.darstellung:"koerper",n.ausgeblendet=new Set(h.ausgeblendet??[]),n.auswahl=ln(h.auswahl??[]),n.setzeKamera({azimut:qe(h.azimut),hoehe:qe(h.hoehe),abstand:qe(h.abstand),ziel:{x:qe(h.ziel_x),y:qe(h.ziel_y),z:qe(h.ziel_z)}})}),e("fenster.struktur",()=>{n.zonen.struktur=!n.zonen.struktur}),e("fenster.panel",()=>{n.zonen.panel=!n.zonen.panel}),e("fenster.rechts",()=>{n.zonen.rechts=!n.zonen.rechts}),e("fenster.naechste-zone",()=>n.naechsteZone()),e("suche.oeffnen",()=>{n.suche={offen:!0,text:"",index:0,alle:!1,fokussiert:!1}}),e("hilfe.befehle-zeigen",()=>{n.suche={offen:!0,text:"",index:0,alle:!0,fokussiert:!1}}),e("thema.umschalten",()=>{n.thema=n.thema==="hell"?"dunkel":"hell",document.documentElement.dataset.thema=n.thema,n.szene?.setThema(n.thema)}),e("einstellung.navigationsprofil",l=>{const c=typeof l.profil=="string"&&Xi.includes(l.profil)?l.profil:void 0,u=Xi.indexOf(n.profil);n.profil=c??Xi[(u+1)%Xi.length]??n.profil}),e("katalog.oeffnen",l=>{n.katalogOffen=typeof l.baustein=="string"?l.baustein:""}),e("task.wechseln",l=>{n.task=l.task==="simulation"?"simulation":"modellieren"}),e("dokument.wechseln",l=>{typeof l.dok=="string"&&n.wechsleDokument(l.dok)})}const Kx=[[/\bsteg\b|\brib\b|\bweb\b/,"steg"],[/grundplatte|base ?plate|\bbase\b/,"grundplatte"],[/bohrung|\bholes?\b/,"bohrungen"],[/deckel|\blid\b/,"deckel"],[/gehäuse|gehaeuse|\bhousing\b/,"gehaeuse"]],Jx=[[/dick|thick/,"dicke"],[/hoch|höher|hoeher|höhe|hoehe|tall|high|height/,"hoehe"],[/lang|länge|laenge|long|length/,"laenge"],[/breit|wide|width/,"breite"],[/durchmesser|diameter|ø/,"durchmesser"],[/radius|rund|round/,"eckradius"]];function Qx(n,e){for(const[t,i]of Kx)if(t.test(e))return n.find(i);return n.gewaehlteElemente()[0]}function jx(n){return["dicke","hoehe","durchmesser"].find(e=>n.params[e]!==void 0)}function fu(n,e,t,i){const r=eo(e.params[t],n.sprache),s=eo(ut(i),n.sprache);return{titel:n.t("chat.vorschlag.wert",{element:e.meta.name,feld:n.t(`feld.${t}`),nachher:s}),begruendung:n.t("chat.vorschlag.begruendung"),werte:[{feld:n.t(`feld.${t}`),vorher:r,nachher:s}],befehle:[{id:"element.wert-setzen",parameter:{element:e.id,name:t,wert:ut(i)}}],ziel:e.id}}function ra(n,e,t,i,r){return{titel:n.t(e,{element:t?.meta.name??""}),begruendung:n.t("chat.vorschlag.begruendung"),werte:[],befehle:[{id:i,parameter:r}],ziel:t?.id??""}}function eS(n,e){const t=e.toLowerCase(),i=Qx(n,t),r=/(\d+(?:[.,]\d+)?)\s*(mm|cm|m)\b/.exec(t);if(r&&i){const s={mm:1,cm:10,m:1e3}[r[2]],a=Number(r[1].replace(",","."))*s,o=Jx.find(([l])=>l.test(t))?.[1]??jx(i);if(o&&i.params[o]!==void 0)return fu(n,i,o,a)}if(/dupliz|kopie|kopier|copy|clone/.test(t)&&i)return ra(n,"chat.vorschlag.duplizieren",i,"element.duplizieren",{element:i.id});if(/verwirf|wirf .*weg|entfern|lösch|loesch|discard|remove|delete/.test(t)&&i)return ra(n,"chat.vorschlag.verwerfen",i,"element.verwerfen",{element:i.id});if(/\banlegen\b|leg .*an|neues|neue |create|new /.test(t)){const s=/baugruppe|assembly/.test(t)?"baugruppe":"teil";return ra(n,"chat.vorschlag.anlegen",void 0,"element.anlegen",{typ:s})}return null}function tS(n){n.registriere("chat.senden",e=>{const t=(typeof e.text=="string"?e.text:n.chat.eingabe).trim();if(!t)return!1;n.chat.nachrichten.push({von:"person",text:t}),n.chat.eingabe="";const i=eS(n,t);i?(n.chat.vorschlag=i,n.chat.nachrichten.push({von:"ki",text:"",schluessel:"chat.antwort.vorschlag"})):(n.chat.vorschlag=null,n.chat.nachrichten.push({von:"ki",text:"",schluessel:"chat.antwort.unklar"}))}),n.registriere("chat.uebernehmen",()=>{const e=n.chat.vorschlag;if(!e)return!1;n.chat.vorschlag=null;for(const t of e.befehle)n.ausfuehren(t.id,t.parameter,"chat","ki");n.chat.nachrichten.push({von:"ki",text:"",schluessel:"chat.antwort.erledigt"})}),n.registriere("chat.verwerfen",()=>{n.chat.vorschlag=null,n.chat.nachrichten.push({von:"ki",text:"",schluessel:"chat.antwort.verworfen"})})}const nS=["leer","halter","auswahl","mehrfach","zustaende","aktiv","isoliert","kontextmenue","menue","ziehen","ablegen","ablegen-verboten","ausgeblendet","verworfen","rechnet","befund","andere","chat","suche","fokus","perspektive","kanten"],$n=(n,...e)=>{n.auswahl=e.map(t=>({element_id:t}))};function rc(n){const e=Et(n.dokument(),"bohrungen");e&&(e.params.durchmesser=ut(55))}function iS(n,e){if(!nS.includes(n))return e.projekt=Xl(),e.dok="teil-1",e.unbekannterZustand=!0,{gezeigt:"leer"};e.projekt=n==="leer"?Xl():yo(),e.dok=e.projekt.content[0]?.id??"";const i=n;let r;switch(i){case"leer":case"halter":break;case"auswahl":$n(e,"grundplatte");break;case"mehrfach":$n(e,"grundplatte","steg");break;case"zustaende":rc(e),$n(e,"grundplatte"),e.hover="steg",e.ausgeblendet.add("skizze"),e.andere={aktiv:!0,dok:"sensorgehaeuse",element:"deckel"};break;case"aktiv":e.dok="sensorgehaeuse",e.aktiv="gehaeuse";break;case"isoliert":e.isoliert=["steg"],$n(e,"steg");break;case"kontextmenue":$n(e,"grundplatte"),r=()=>{const s=e.szene?.projiziere([0,0,8]);e.kontextOeffnen?.(s?.x??600,s?.y??400)};break;case"menue":e.menue="dropdown:Bearbeiten";break;case"ziehen":$n(e,"grundplatte"),r=()=>{const s=e.huelle("grundplatte"),a=s&&e.szene?e.szene.projiziere([0,0,s.max[2]]):{x:600,y:300};e.griff={id:"grundplatte",name:"dicke",start:8,wert:11,eingabe:"",zeiger:{x:a.x,y:a.y-60},sichtbarBis:null,aktiv:!1},e.vorschau={id:"grundplatte",name:"dicke",wert:ut(11)},e.rendernSofort()};break;case"ablegen":case"ablegen-verboten":{e.dok="sensorgehaeuse";const s=i==="ablegen-verboten";r=()=>{const a=s?"gehaeuse":"baugruppe-1",l=document.querySelector(`[role="treeitem"][data-id="${a}"]`)?.getBoundingClientRect(),c=s?"baugruppe-1":"deckel",u=e.ablegenPruefen(c,a);e.dnd={id:c,x:(l?.left??100)+60,y:(l?.top??100)+(l?.height??24)/2,ziel:a,erlaubt:u.erlaubt,grund:u.grund},u.grund&&e.meldung(u.grund),e.rendernSofort()};break}case"ausgeblendet":e.ausgeblendet.add("steg");break;case"verworfen":{const s=Et(e.dokument(),"bohrungen");s&&(s.meta.verworfen=!0),e.verworfenesZeigen=!0;break}case"rechnet":e.status.set("grundplatte","rechnet");break;case"befund":rc(e),e.zonen.panel=!0;break;case"andere":e.andere={aktiv:!0,dok:"halter",element:"steg"};break;case"chat":{$n(e,"steg");const s=Et(e.dokument(),"steg");e.chat.nachrichten=[{von:"person",text:"",schluessel:"chat.beispiel.frage"},{von:"ki",text:"",schluessel:"chat.antwort.vorschlag"}],s&&(e.chat.vorschlag=fu(e,s,"hoehe",40));break}case"suche":e.suche={offen:!0,text:"ver",index:0,alle:!1,fokussiert:!1};break;case"fokus":r=()=>{const s=document.querySelector('[role="treeitem"][data-id="steg"]');if(s){for(const a of document.querySelectorAll('[role="treeitem"]'))a.tabIndex=-1;s.tabIndex=0,s.setAttribute("data-fokus",""),s.focus()}};break;case"perspektive":e.projektionsart="perspektivisch";break;case"kanten":e.darstellung="kanten";break}return{gezeigt:i,danach:r}}const Qn=new URLSearchParams(window.location.search),no=Qn.get("thema")==="dunkel"?"dunkel":"hell",io=q_(window.location.search),rS=Qn.get("tempo")==="0"?0:1;document.documentElement.dataset.thema=no;document.documentElement.lang=io==="en"?"en":"de";async function sS(){const n=Qn.get("register");if(!n)return ja;try{const e=await fetch(n);return D0(await e.json())}catch{return ja}}function aS(){try{const n=window.localStorage.getItem(ru);if(!n)return null;const e=JSON.parse(n);return e&&Array.isArray(e.content)&&e.content.length?e:null}catch{return null}}function oS(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0).toString(16).padStart(8,"0")}const lS=n=>JSON.stringify(n,(e,t)=>t&&typeof t=="object"&&!Array.isArray(t)?Object.fromEntries(Object.entries(t).sort(([i],[r])=>i.localeCompare(r))):t);async function cS(){const n=document.getElementById("app"),e=await sS(),t=$_(io);if(Qn.has("katalog")){await kx(n,Qn.get("katalog")??"",t);return}const i=Qn.get("zustand"),r=i===null?aS():null,s=new Vv(t,io,rS,e,r??yo());s.thema=no,s.rechenzeitMs=Number(Qn.get("rechenzeit")??0)||0,Zx(s),tS(s);let a="halter",o;if(i!==null){const d=iS(i,s);a=d.gezeigt,o=d.danach}const l=new Ix(n,s);l.szene.setThema(no),Vx(s,l),qx(s),s.rendernSofort(),l.einpassenSofort(),s.rendernSofort(),o?.(),s.rendernSofort();const c=()=>s.dokument(),u=()=>{const d=s.szene?.kamera;return{azimut_grad:d?.azimut??0,hoehe_grad:d?.hoehe??0,abstand_mm:d?.abstand??0,ziel:{x:d?.ziel.x??0,y:d?.ziel.y??0,z:d?.ziel.z??0}}},h=d=>{const m=rr(s,d);if(!m)return null;const x=ss(m),g=new Set(s.mitNachfahren(d)),p=[],R=Math.max(10,Math.sqrt(x.breite*x.hoehe/300));for(let w=x.y;w<x.y+x.hoehe;w+=R)for(let E=x.x;E<x.x+x.breite;E+=R){const P=s.szene?.trefferBei(E,w);if(!P||!g.has(P.elementId))continue;const v=s.zielFuerTreffer(P.elementId);if(v!==d&&!g.has(v??"")||s.kanteBei(P.elementId,E,w))continue;(s.szene?.kantenVon(P.elementId,s.huelle(P.elementId)??{min:[0,0,0],max:[0,0,0]})??[]).some(L=>{const k=L.bis.x-L.von.x,O=L.bis.y-L.von.y,X=k*k+O*O||1,z=Math.max(0,Math.min(1,((E-L.von.x)*k+(w-L.von.y)*O)/X));return Math.hypot(E-(L.von.x+z*k),w-(L.von.y+z*O))<14})||p.push({x:Math.round(E),y:Math.round(w)})}const C=s.huelle(d),M=C&&s.szene?s.szene.kantenVon(d,C):[];return{huellbox:x,huelle:m,treffer:p,kanten:M.map(w=>({id:w.adresse,name:w.name,mitte:w.mitte,von:w.von,bis:w.bis}))}};Object.defineProperty(window,"__cee",{value:Object.freeze({bereit:!0,zustand:a,modell:()=>s.modell(),modellHash:()=>oS(lS(s.projekt)),auswahl:()=>s.auswahl.map(d=>({...d})),protokoll:()=>s.protokoll.map(d=>({...d})),befehle:()=>s.register.map(d=>({id:d.id,kuerzel:d.kuerzel??null,titel:d.titel,titel_text:s.t(d.titel),rang:d.rang,familie:d.familie})),teil:()=>{const d=s.teilErgebnis();return{abmessungen_mm:[...d.abmessungen_mm],volumen_mm3:d.volumen_mm3,masse_g:d.masse_g}},ansicht:()=>({aktiv:s.aktiv,pfad:s.pfadGlieder().map(d=>d.meta.name),ausgeblendet:[...s.ausgeblendet],isoliert:s.isoliert?[...s.isoliert]:[],darstellung:s.darstellung,projektion:s.projektionsart,profil:s.profil,kamera:u(),projektion_von:h,kontur_punkte:d=>vx(s,d)}),zustaende:d=>{const m=s.zeilen().some(C=>C.element.id===d),x=Fn(s.angezeigtesDokument()).koerper.some(C=>C.elementId===d),g=s.istAusgeblendet(d),p=s.auswahlIds().length===1&&s.auswahlIds()[0]===d,R=s.pfadGlieder().some(C=>C.id===d);return{modell:x||g?s.darstellungVon(d,"modell"):null,struktur:m?s.darstellungVon(d,"struktur"):null,chat:p?s.darstellungVon(d,"chat"):null,pfad:R?s.darstellungVon(d,"pfad"):null}},einstellung:()=>({navigationsprofil:s.profil}),verlauf:()=>s.verlaufLaenge(),gezeichnet:()=>s.szene?.gezeichnet()??[],flaeche_bei:(d,m)=>{const x=s.szene?.trefferBei(d,m);return x?{erzeuger_id:x.elementId,ziel_id:s.zielFuerTreffer(x.elementId)}:null},elemente:()=>wt(c()).map(d=>d.id)})}),Object.defineProperty(window,"__ceeEingabe",{value:Object.freeze({ansicht:d=>{s.szene?.drehen(d.ry??0,d.rx??0),(d.tx||d.ty)&&s.szene?.schieben(d.tx??0,d.ty??0),d.tz&&s.szene?.zoomen(Math.exp((d.tz??0)*.01))}})}),await document.fonts.ready,await new Promise(d=>requestAnimationFrame(()=>requestAnimationFrame(()=>d()))),s.rendernSofort(),document.documentElement.dataset.bereit="1"}cS();
