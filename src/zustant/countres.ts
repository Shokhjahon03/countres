import { create } from 'zustand';
import axios from 'axios';
type counters ={
    idval:any,
    regions:[],
    getIdVal:(name:string)=>void,
    getReaginCounters:(name:string)=>void
}
let useCounter= create<counters>((set)=>({
    idval:[],
    regions:[],
    getIdVal:async (name:string)=>{
        try {
           let res= await axios.get(`https://restcountries.com/v3.1/name/${name}`)
           let dat= await res.data
           set(() => ({
            idval:dat
          }));
        } catch (error) {
           console.log(error); 
        }
    },
    getReaginCounters:async(name:string)=>{
        try {
            let res=await axios.get(`https://restcountries.com/v3.1/region/${name}`)
            let dat=await res.data
            set(() => ({
                regions:dat
              }));
        } catch (error) {
            console.log(error);
            
        }
    }
}))
export default useCounter;