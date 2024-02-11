import React, { useState, useEffect } from "react";
import { server } from "../main";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProgressBar from "@ramonak/react-progress-bar";
import ChartComponent from "./ChartComponent";
function CoinDetails() {
  let [coin, setCoin] = useState();
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(false);
  let [page, setPage] = useState(false);
  let [selected, setSelected] = useState('');
  let [days, setDays] = useState('24h');
  let [chartArray, setChartArray] = useState([]);
  let [currency, setCurrency] = useState("pkr");
  let currencySymbol = currency == 'pkr' ? 'Rs' : '$'
  let dayBtns = ['24h', '7d','14d', '30d','60d', '200d', '365d', 'max']
  
  let params = useParams();
  useEffect(() => {
    const fetchAsync = async () => {
      // setLoading(true)
      try {
        let { data } = await axios.get(`${server}/coins/${params.id}`);
        let { data:chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
    
        setChartArray(chartData.prices)
        setCoin(data);
     
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
      }
    };
    fetchAsync();
  }, [params.id, currency, days]);
  function selectedBtn(btn){
    setSelected(btn)
    setDays(btn)
    setLoading(true) // it will be false automatically when in the functions
  }
  function handleCurrencyChange(event) {
    setCurrency(event.target.id);
  }
  return (
    <div className="container-fluid d-flex flex-column align-items-center">
      {loading && <div>loading...</div>}

      {!loading && (
        <section className="mt-2">
          <input
            type="radio"
            id="pkr"
            checked={currency === "pkr"}
            onChange={handleCurrencyChange}
            name="currency"
          />
          <label htmlFor="pkr" className="me-5 ms-2">
            PKR
          </label>
          <input
            type="radio"
            id="usd"
            onChange={handleCurrencyChange}
            checked={currency === "usd"}
            name="currency"
          />
          <label htmlFor="usd" className="ms-2 ">
            USD $
          </label>
        </section>
        
      )}
      {
        !loading && (
          <section className="d-flex gap-2 my-3 flex-wrap">
            {
              dayBtns.map((item, index)=>{
                return <div onClick={()=>selectedBtn(item)} className={`btn btn-${selected === item ?  'dark' : 'light'}`} key={item}>{item}</div>
              })
            }
          </section>
        )
      }
      {
        !loading && (
          <div className="col-12 col-lg-9 col-md-10 col-sm-11">
            <ChartComponent arr={chartArray} days={days} currency={currency} />
          </div>
        )
      }
      {!loading && (
        <div className="mt-5 col-12 col-lg-6 col-md-8 col-sm-10 text-center">
          last update on : {Date(coin.last_updated).split("G")[0]}
          <section className="d-flex flex-column text-start">
            <img
              src={coin.image.large}
              height="90"
              width="90"
              alt={coin.name}
            />
            <div className="stat mt-3 mb-5">
              <div className="name fw-bold fs-5">{coin.name}</div>
              <div className="number fw-bold fs-6 text-success my-3">
                {coin.market_data.ath[currency]}{" "}
                {currency === "pkr" ? "pkr" : "$"}
              </div>
              <div className="name">
                <i
                  className={`me-2 fa-solid fa-caret-${
                    coin.market_data.price_change_24h_in_currency[currency] > 0
                      ? "up text-success"
                      : "down text-danger"
                  }`}
                ></i>
                {coin.market_data.price_change_24h_in_currency[currency]}%
              </div>
              <div className="rank btn btn-dark mt-2">#{coin.market_cap_rank}</div> 
              <div className="mt-3 ">
              <ProgressBar 
                completed={((coin.market_data.low_24h[currency] / coin.market_data.high_24h[currency]) * 100).toFixed(1)}
                customLabel={((coin.market_data.low_24h[currency] / coin.market_data.high_24h[currency]) * 100).toFixed(1) + '%'}
                bgColor="black"
                padding="1"  
                fontSize='8'
                animateOnRender
                labelColor="white"
                />  
               <section className="badges-section d-flex justify-content-between mt-3">
                 <div className="py-1 fs10 px-4 bg-danger rounded-3 text-white">
                  {currency == 'pkr' ? 'Rs ' : '$ '}
                  {coin.market_data.low_24h[currency]}
                </div>
                <div className="rangeOF"></div>
                 <div className="py-1 fs10 px-4 bg-success rounded-3 text-white">
                 {currency == 'pkr' ? 'Rs ' : '$ '}
                  {coin.market_data.high_24h[currency]}</div>
                </section> 
              </div> 
              <div className="mt-4 d-flex justify-content-between">
                 <div className="fw-bold">Max-Supply</div>
                 <div>{coin.market_data.max_supply != null ?coin.market_data.max_supply : 'N/A' }</div>  
              </div>  
              <div className="mt-1 d-flex justify-content-between">
                 <div className="fw-bold">Circulating-Supply</div>
                 <div>{coin.market_data.circulating_supply}</div>  
              </div>  
              <div className="mt-1 d-flex justify-content-between">
                 <div className="fw-bold">Market Cap</div>
                 <div>{`${currency == 'pkr' ? 'Rs ' : '$ '}`+coin.market_data.market_cap[currency]}</div>  
              </div>  
              <div className="mt-1 d-flex justify-content-between">
                 <div className="fw-bold">All time low</div>
                 <div>{`${currency == 'pkr' ? 'Rs ' : '$ '}`+coin.market_data.atl[currency]}</div>  
              </div>  
              <div className="mt-1 d-flex justify-content-between">
                 <div className="fw-bold">All time High</div>
                 <div>{`${currency == 'pkr' ? 'Rs ' : '$ '}`+coin.market_data.ath[currency]}</div>  
              </div>  
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default CoinDetails;
