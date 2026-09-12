import { createContext, useContext, useEffect, useRef, useState } from 'react'
const SoundContext=createContext(null)
export function AudioProvider({children}){
 const [isMuted,setIsMuted]=useState(true),engine=useRef(null)
 useEffect(()=>()=>{engine.current?.close()},[])
 async function toggleMute(e){
  e?.stopPropagation();e?.preventDefault()
  try{
   if(!engine.current){
    const AudioEngine=window.AudioContext||window.webkitAudioContext
    if(!AudioEngine)return
    const ctx=new AudioEngine();engine.current=ctx
    const gain=ctx.createGain();gain.gain.value=.025;gain.connect(ctx.destination)
    ;[130.81,196,261.63,329.63].forEach((frequency,i)=>{const oscillator=ctx.createOscillator();oscillator.type='sine';oscillator.frequency.value=frequency;oscillator.detune.value=i%2?3:-3;oscillator.connect(gain);oscillator.start()})
   }
   if(isMuted){await engine.current.resume();setIsMuted(false)}else{await engine.current.suspend();setIsMuted(true)}
  }catch{setIsMuted(true)}
 }
 return <SoundContext.Provider value={{isMuted,toggleMute}}>{children}</SoundContext.Provider>
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAudio(){return useContext(SoundContext)}
