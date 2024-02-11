import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../main'
import Card from './Card'
import ErrorComponent from './ErrorComponent'
import CoinCard from './CoinCard'
function Coin() {
  let [coin, setCoin] = useState([])
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState(false)
  let [page, setPage] = useState(false)
  let [currency, setCurrency] = useState('pkr')
  // let [btnArr, setBtnArr] = useState([])
  function changePage(p){
    setPage(p);
    setLoading(true);
  }
  // let btns = new Array(132).fill(1)
  let count = []
  for(let i = 1; i <= 132; i++){
    count.push(i)
  }
  useEffect(()=>{
      const fetchAsync = async () =>{
        // setLoading(true)
       try {
        let {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
        setCoin(data)
        console.log(data)
        setLoading(false)
       } catch (error) {
        setLoading(false)
        setError(true)
        console.log(error)
       }
      }
      fetchAsync()
      
  },[currency,page])
  function handleCurrencyChange(event){
    setCurrency(event.target.id);
  }
  // if(error ) return <ErrorComponent />
    return (
      <div className='container'>
           <section className='mt-2'> 
              <input type="radio" id="pkr" checked={currency === 'pkr'} onChange={handleCurrencyChange}  name="currency"/>
              <label htmlFor="pkr" className='me-5 ms-2'>PKR</label>
              <input type="radio" id="usd" onChange={handleCurrencyChange} checked={currency === 'usd'} name="currency"/>
              <label htmlFor="usd" className='ms-2 '>USD $</label>   
            </section>
        {
          loading && !error ? (
            <div>loading...</div>
          ):(
            
            <section className='col-12 mt-5 d-flex flex-wrap justify-content-between gap-lg-2'>
            
             { 
              coin.map((item,index)=>{
                return <CoinCard key={item.id} data={item} currency={currency} />
                })
              }
            </section>
            
          )
          
        }
       <section className='overflow-auto d-flex flex-nowrap gap-2 mt-5 '>
       {
          !loading && 
          count.map((item, index)=>{
          return  <button onClick={()=>changePage(item)} key={index} type='button' className="btn btn-dark">{item}</button>
          })
        }
       </section>
  
      </div>
    )
  }
  


export default Coin