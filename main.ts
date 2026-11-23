import{mkdirSync as MD,readdirSync as RD,readFileSync as RF,writeFileSync as WF}from'node:fs';
import{join as JN}from'node:path';
const SP="000101401010012022023033021021021021021021021011021021021011021021021021021021200210210200000011020010010001010";
const NT=[8,15,3,5,2,4],BS=[0,16,32,48,64,80],IM=new Int32Array(256).fill(-1),PO=new Int32Array(256),PU=new Int32Array(256);
{let i=0;for(let g=0;g<6;g++)for(let k=0;k<NT[g];k++){const s=SP.substr(i*3,3),o=BS[g]+k;IM[o]=+s[0];PO[o]=+s[1];PU[o]=+s[2];i++;}}
const TE=new TextEncoder();
function run(p,inp){
const n=p.length,D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
let sp=0,cp=0,ol=0,ip=0,pc=0,st=0;
const E=e=>[o.slice(0,ol),e];
for(;;){
if(st==1e6)return E(10);
if(pc<0||pc>=n)return E(9);
const op=p[pc],im=IM[op];
if(im<0)return E(5);
const po=PO[op],pu=PU[op];
if(pc+im>=n)return E(9);
st++;
const nx=pc+1+im;
if(sp<po)return E(2);
if(sp-po+pu>256)return E(3);
pc=nx;
switch(op){
case 0:return E(0);
case 1:D[sp++]=(p[nx-1]<<24)>>24;break;
case 2:D[sp++]=p[nx-4]|(p[nx-3]<<8)|(p[nx-2]<<16)|(p[nx-1]<<24);break;
case 3:sp--;break;
case 4:D[sp]=D[sp-1];sp++;break;
case 5:{const t=D[sp-1];D[sp-1]=D[sp-2];D[sp-2]=t;}break;
case 6:D[sp]=D[sp-2];sp++;break;
case 7:{const a=D[sp-3];D[sp-3]=D[sp-2];D[sp-2]=D[sp-1];D[sp-1]=a;}break;
case 0x17:D[sp-1]=-D[sp-1]|0;break;
case 0x1b:D[sp-1]=~D[sp-1];break;
case 0x10:case 0x11:case 0x12:case 0x13:case 0x14:case 0x15:case 0x16:
case 0x18:case 0x19:case 0x1a:case 0x1c:case 0x1d:case 0x1e:
case 0x20:case 0x21:case 0x22:{
const b=D[sp-1],a=D[sp-2];let r;
switch(op){
case 0x10:r=a+b|0;break;
case 0x11:r=a-b|0;break;
case 0x12:r=Math.imul(a,b);break;
case 0x13:if(!b)return E(4);r=a==-2147483648&&b==-1?a:a/b|0;break;
case 0x14:if(!b)return E(4);r=b==-1?0:a%b|0;break;
case 0x15:if(!b)return E(4);r=Math.floor((a>>>0)/(b>>>0))|0;break;
case 0x16:if(!b)return E(4);r=(a>>>0)%(b>>>0)|0;break;
case 0x18:r=a&b;break;
case 0x19:r=a|b;break;
case 0x1a:r=a^b;break;
case 0x1c:r=a<<(b&31);break;
case 0x1d:r=a>>(b&31);break;
case 0x1e:r=(a>>>(b&31))|0;break;
case 0x20:r=a==b?1:0;break;
case 0x21:r=a<b?1:0;break;
case 0x22:r=(a>>>0)<(b>>>0)?1:0;break;
}
sp-=2;D[sp++]=r;
}break;
case 0x30:case 0x31:case 0x32:{
const rel=((p[nx-2]|(p[nx-1]<<8))<<16)>>16;
let k=1;
if(op!=0x30){const v=D[--sp];k=op==0x31?v==0:v!=0;}
if(k)pc=nx+rel;
}break;
case 0x33:if(cp==64)return E(7);C[cp++]=nx;pc=p[nx-2]|(p[nx-1]<<8);break;
case 0x34:if(!cp)return E(8);pc=C[--cp];break;
case 0x40:{const a=D[sp-1];if(a<0||a>255)return E(6);D[sp-1]=M[a];}break;
case 0x41:{const a=D[sp-1],v=D[sp-2];if(a<0||a>255)return E(6);sp-=2;M[a]=v;}break;
case 0x50:{const b=TE.encode(''+D[sp-1]);if(ol+b.length>65536)return E(11);sp--;o.set(b,ol);ol+=b.length;}break;
case 0x51:if(ol+1>65536)return E(11);o[ol++]=D[--sp]&255;break;
case 0x52:D[sp++]=ip<inp.length?inp[ip++]:-1;break;
case 0x53:return E(D[--sp]&255);
}
}
}
const ID=process.env.MAKEFUN_INPUT_DIR??'/input',OD=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const d of RD(ID).sort()){const[a,b]=run(RF(JN(ID,d,'program.bin')),RF(JN(ID,d,'input.bin')));MD(JN(OD,d),{recursive:true});WF(JN(OD,d,'stdout.bin'),a);WF(JN(OD,d,'exit.txt'),''+b);}
