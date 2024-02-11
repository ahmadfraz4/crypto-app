import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../main'
import Card from './Card'
import ErrorComponent from './ErrorComponent'
function Exchanges() {
  let [exchanges, setExchange] = useState([])
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState(false)
  useEffect(()=>{
  
      const fetchAsync = async () =>{
        // setLoading(true)
       try {
        let {data} = await axios.get(`${server}/exchanges?per_page=100`)
        setExchange(data)
        // console.log(data)
        setLoading(false)
       } catch (error) {
        setLoading(false)
        setError(true)
        console.log(error)
       }
      }
      fetchAsync()
   
  },[])
  if(error ) return <ErrorComponent />
    return (
      <div className='container'>
       
        {
          loading && !error ? (
            <div>loading...</div>
          ):(
           
            <section className='col-12 mt-5 d-flex flex-wrap justify-content-between gap-lg-2'>
             { 
              exchanges.map((item,index)=>{
                return <Card key={item.id} data={item} />
                })
              }
            </section>
          )
        }
  
      </div>
    )
  }
  


export default Exchanges