'use client'
import React, { ChangeEvent, useEffect, useReducer, useState } from 'react'
import moon from '../assets/Path.png'
import axios from 'axios'
import Link from 'next/link'
import useCounter from '@/zustant/countres'
import { DarkThemeToggle, Flowbite } from 'flowbite-react'
import { dir } from 'console'
const HomePAge = () => {
  const {getIdVal,idval,regions,getReaginCounters} = useCounter();
  let [loading,setLoading]=useState(true)
  let [datas,setDatas]=useState<any>([])
  let [search,setSearch]=useState<any>('')
  let [seracounter,setsC]=useState<{}[]>([])
  let [sect,setsect]=useState('')
  let [allcount,setAllcount]=useState<any>([])
  let [isdark,setIsdark]=useState(true)
  let dat=[]
  let axiosdata=async()=>{
    try {
      let res=await axios.get('https://restcountries.com/v3.1/all')
      let data=await res.data
      setDatas(data)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }
  let bd=document.querySelector('body')
  let reducer=(state:any,action:any)=>{
      if (action.type==='DARK') {
       return bd?.setAttribute('class','dark')
      }
      if (action.type==='LIGHT') {
        return bd?.setAttribute('class','light')
      }
  }
  let [state,dispatch]=useReducer<any>(reducer,bd)
  let serchfunc=async ()=>{
    setLoading(true)
    let newarr=await datas.filter((e:any)=>e.name.common.toLowerCase().includes(search.toLowerCase()))
    setsC(newarr)
    setLoading(false)
  }
  let func=(id:string)=>{
    getIdVal(id)
  }

useEffect(()=>{
  axiosdata()
  console.log(idval);
  
},[])
let func3=async(names:string)=>{
    if (sect!=='') {
      getReaginCounters(names)
      console.log(regions)
      setAllcount(regions)
      setDatas(regions)
    }else{
      null
    }
}

useEffect(()=>{
  serchfunc()
},[search])
useEffect(()=>{
  func3(sect)
  console.log(sect);
  console.log(regions);
},[sect])


  return (
    <>
     <nav className='bg-[#2B3844]'>
        <div className="container">
          <div className="navbar w-full h-[80px] flex justify-between items-center text-white">
              <h1 className='text-[24px] font-extrabold'>Where in the world?</h1>
              <button className='flex justify-between items-center w-[108px]'>
              <i className='bx bxs-moon' ></i> 
                <p>Darh Mode</p>
                {/* <Flowbite>
                  <DarkThemeToggle />
                </Flowbite> */}
              </button>
          </div>
        </div>
      </nav> 
      <div className='container'>
        <div className='w-full flex justify-between items-center h-[56px] mt-[48px]'>
            <input onChange={(e:ChangeEvent<HTMLInputElement>):void=>setSearch(e.target.value)} className='bg-[#2B3844] h-full w-[480px] pl-[74px] rounded-md' type="search" placeholder='Search for a country...' />

            <select onChange={(e):void=>setsect(e.target.value)} className='bg-[#2B3844] w-[200px] h-[56px] pl-[24px]  pr-[24px] rounded-md' name="" id="">
              <option value="">Filter by Region</option>
              <option value="africa">Africa</option>
              <option value="america">America</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="oceania">Oceania</option>
            </select>
        </div>
      </div>

      <section className='w-full mt-[48px]'>
        
          <div className="container">
            <div  className='w-full flex flex-wrap gap-[70px]'>
              <div className={loading ? ' w-full flex justify-center flex-col items-center':'hidden'}>
              <div className="spinner"></div>
              <h1>Loading..</h1>
              </div>
              {
               search? null:
               <>
                {
                   datas.map((e:any,i:number)=>(
                    <Link onClick={()=>func(e.name.common)} href='/detail' className='w-[264px] flex flex-col cursor-grabbing' key={i}>
                        <img className='w-[264px] h-[160px] rounded-md' src={e.flags.png} alt="alt" />
                          <div className='w-full p-[24px] bg-[#2B3844] dark:text-white'>
                            <h2 className='text-[18px] mb-[16px]'>{e.name.common}</h2>
                            <p className='text-[12px] flex mb-[8px] items-center gap-x-2 text-slate-500'><p className='text-[#FFFFFF] text-[14px]'>Population:</p>{e.population}</p>
                            <p className='text-[12px] flex mb-[8px] items-center gap-x-2 text-slate-500'><p className='text-[#FFFFFF] text-[14px]'>Region:</p>{e.region}</p>
                            <p className='text-[12px] flex mb-[8px] items-center gap-x-2 text-slate-500'><p className='text-[#FFFFFF] text-[14px]'>Capital:</p>{e.capital}</p>
                          </div>
                    </Link>
                  ))
                }
               </>
              }
              {
                search? 
                <>
                  {
                     seracounter.map((e:any,i:number)=>(
                      <Link onClick={()=>func(e.name.common)} href='/detail' className='w-[264px] flex flex-col cursor-grabbing' key={i}>
                          <img className='w-[264px] h-[160px] rounded-md' src={e.flags.png} alt="alt" />
                            <div className='w-full p-[24px] bg-[#2B3844] dark:text-white'>
                              <h2 className='text-[18px] mb-[16px]'>{e.name.common}</h2>
                              <p className='text-[12px] flex mb-[8px] items-center gap-x-2 text-slate-500'><p className='text-[#FFFFFF] text-[14px]'>Population:</p>{e.population}</p>
                              <p className='text-[12px] flex mb-[8px] items-center gap-x-2 text-slate-500'><p className='text-[#FFFFFF] text-[14px]'>Region:</p>{e.region}</p>
                              <p className='text-[12px] flex mb-[8px] items-center gap-x-2 text-slate-500'><p className='text-[#FFFFFF] text-[14px]'>Capital:</p>{e.capital}</p>
                            </div>
                      </Link>
                    ))
                  }
                </>:
                null
              }
            </div>
          </div>
      </section>
    </>
  )
}

export default HomePAge
