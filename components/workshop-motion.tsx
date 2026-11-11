'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

const ease = [.22, 1, .36, 1] as const;

export function AnimatedMetric({value}:{value:string}){
 const ref=useRef<HTMLSpanElement>(null),visible=useInView(ref,{once:true,amount:.6});
 const reduced=useReducedMotion();const target=Number(value.replace(/[^0-9.]/g,''));const prefix=value.startsWith('+')?'+':'';
 const [display,setDisplay]=useState(0);
 useEffect(()=>{
  if(reduced){setDisplay(target);return;}
  if(!visible)return;
  const controls=animate(0,target,{duration:1.25,ease,onUpdate:v=>setDisplay(Math.round(v))});
  return ()=>controls.stop();
 },[visible,reduced,target]);
 return <span ref={ref} className="animated-metric" aria-label={value}><span aria-hidden="true">{prefix}{display}</span></span>
}
