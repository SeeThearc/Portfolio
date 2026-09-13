import { createContext, useContext, useState, useEffect } from 'react'
// Theme constants and hook intentionally share their small provider module.
// eslint-disable-next-line react-refresh/only-export-components
export const THEMES = {
 blue: { id:'blue', name:'Blue hour', preview:['#213c76','#a8bcec','#c693b7'] },
 green: { id:'green', name:'Tidal', preview:['#124952','#80c5ba','#e0bd8d'] },
 dusk: { id:'dusk', name:'Afterglow', preview:['#59375f','#d39ab5','#e9b28b'] },
}
const ThemeContext = createContext(null)
export function ThemeProvider({children}) {
 const [theme,setTheme]=useState(()=>{try{return localStorage.getItem('ipad-appearance-v2')||'blue'}catch{return 'blue'}})
 useEffect(()=>{document.documentElement.dataset.theme=theme;try{localStorage.setItem('ipad-appearance-v2',theme)}catch{/* Appearance still works without storage. */}},[theme])
 return <ThemeContext.Provider value={{theme,setTheme,themes:THEMES}}>{children}</ThemeContext.Provider>
}
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(){return useContext(ThemeContext)}
