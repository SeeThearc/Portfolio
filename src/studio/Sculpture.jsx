import { useEffect, useRef } from 'react'

// Project a 3D torus knot onto a canvas; no external rendering dependency.
export default function Sculpture({ paused, variant }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let width = 0, height = 0, frame, phase = .3, visible = true
    const pointer = { x: 0, y: 0 }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const points = []
    for (let i = 0; i < 260; i++) {
      const t = i / 260 * Math.PI * 2
      const p = variant === 1 ? 3 : 2, q = variant === 1 ? 2 : 3
      const center = a => [(2 + .64 * Math.cos(q*a))*Math.cos(p*a), (2 + .64*Math.cos(q*a))*Math.sin(p*a), .9*Math.sin(q*a)]
      const c = center(t), next = center(t + .001)
      const tangent = next.map((v,j) => v-c[j]); const length = Math.hypot(...tangent)
      const n = [-tangent[1]/length, tangent[0]/length, 0]; const nl = Math.hypot(...n)
      for(let j=0;j<3;j++) n[j]/=nl
      const b = [tangent[1]*n[2]-tangent[2]*n[1],tangent[2]*n[0]-tangent[0]*n[2],tangent[0]*n[1]-tangent[1]*n[0]].map(v=>v/length)
      for(let j=0;j<22;j++) {
        const a=j/22*Math.PI*2
        points.push(c.map((v,k)=>v+.39*(n[k]*Math.cos(a)+b[k]*Math.sin(a))))
      }
    }
    function render() {
      if (!width || !height) return
      ctx.clearRect(0,0,width,height)
      const ax=.8+pointer.y*.5, ay=phase+pointer.x*.6
      const scale=Math.min(width/7.6,height/7.5)
      const projected=points.map(([x,y,z])=> {
        const ry=y*Math.cos(ax)-z*Math.sin(ax), rz=y*Math.sin(ax)+z*Math.cos(ax)
        const rx=x*Math.cos(ay)+rz*Math.sin(ay), depth=-x*Math.sin(ay)+rz*Math.cos(ay)
        const perspective=8/(8-depth)
        return [width/2+rx*scale*perspective,height/2+ry*scale*perspective,depth,perspective]
      }).sort((a,b)=>a[2]-b[2])
      for(const [x,y,z,p] of projected) {
        const light=(z+3.4)/6.8
        ctx.fillStyle=`hsl(${15+light*9} 88% ${24+light*37}%)`
        ctx.beginPath(); ctx.arc(x,y,Math.max(.8,scale*.024*p),0,Math.PI*2); ctx.fill()
      }
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width; height = entry.contentRect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr; canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); render()
    })
    let last=0
    function animate(time) {
      if(visible && !paused && !reduced.matches && time-last>30) { phase+=.006; render(); last=time }
      frame=requestAnimationFrame(animate)
    }
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting})
    observer.observe(canvas); resize.observe(canvas)
    frame=requestAnimationFrame(animate)
    const move=e=> {const r=canvas.getBoundingClientRect(); pointer.x=(e.clientX-r.left)/r.width-.5; pointer.y=(e.clientY-r.top)/r.height-.5; render()}
    canvas.addEventListener('pointermove',move)
    return ()=>{cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); canvas.removeEventListener('pointermove',move)}
  }, [paused, variant])
  return <canvas ref={canvasRef} className="sculpture-canvas" aria-label="Interactive orange 3D torus knot. Move your pointer to change its perspective." role="img" />
}
