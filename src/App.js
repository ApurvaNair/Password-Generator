import React,{useCallback, useEffect, useRef, useState}from 'react'

function App() {
  const [length,setLength]=useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState('')
  
  const passref=useRef(null)

  const generatePassword= useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()_+"

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass+=str.charAt(char)
    }

    setPassword(pass)
  },[length,numberAllowed,charAllowed])
  
  useEffect(()=>{
    generatePassword()
  },[length,numberAllowed,charAllowed])

  const copyPasswordToClipboard =()=>{
     window.navigator.clipboard.writeText(password)
     passref.current?.select()
  }

  return (
    <div className='h-screen bg-gray-800 w-screen'>
    <div className='w-full max-w-md mx-auto shadow-none rounded-lg px-10 py-20 text-orange-500'>
    <h1 className='text-3xl font-bold mb-2 text-center'><br/>PASSWORD GENERATOR</h1><br/>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
    <input type='text' value={password} className='outline-none w-80 py-1 px-4' placeholder='Password' readOnly ref={passref}/>
    <button onClick={copyPasswordToClipboard}
    className='outline-none bg-blue-700 text-white px-5 py-1 shrink-0'>Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
     <div className='flex items-center gap-x-1'>
       <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>setLength(e.target.value)} name='' id=''/>
       <label htmlFor='length'>Length : {length}</label>
     </div>
     <div className='flex items-center gap-x-1'>
      <input type="checkbox" defaultChecked={numberAllowed} 
      onChange={()=>{
        setNumberAllowed((prev)=>!prev)
      }} name='' id='' />
      <label htmlFor='number'>Numbers</label>
     </div>
     <div className='flex items-center gap-x-1'>
      <input type="checkbox" defaultChecked={charAllowed} 
      onChange={()=>{
        setCharAllowed((prev)=>!prev)
      }} name='' id='' />
      <label htmlFor='charInput'>Character</label>
     </div>
    </div>
    </div>
    </div>
  )
}

export default App