import './App.css';
import data from './data.json'
import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';

function App() {

  const [basket, setBasket] = useState([])

  useEffect(()=>{
    fetch(data)
  }, [])

  const addToBasket = (drink) => {
    setBasket([...basket, drink])
  }
  const totalBasket = (basket) => {
    return basket.map((item) => {
    return item.price
   }).reduce((prev, curr) => prev + curr, 0)
   .toFixed(2)
   
  }
  const removeFromBasket = (drink) => {
    const removed= basket.filter(i => i !== drink)
    setBasket(removed)
  }

  return (
    <div className="App">
        <div className="Title">
            {
              data.map(item => {
                return (
                  <>
                  <h1>  <Typewriter 
                  options={{
                    cursor: "",
                    deleteSpeed: 500,
                  }}
                    onInit={(typewriter) => {
                      typewriter
                      .typeString(`${item.shopName}`)
                      .pauseFor(2000)
                      .deleteAll()
                      .typeString(`${item.shopName}`)
                      .start()
                    }}
                  /></h1>
                  <h4>{item.address}</h4> 
                  <a><h5>{item.phone}</h5></a>
                  </>
                )
              })
            }
        </div>
        <div className= "menu_and_basket">
        <div className="menu">
        {
          data[0].prices.map((item, index) => {
            return (
              <>
              <div className="drink">
              <h5 key={index}>{item.drink} - £{item.price}
              <btn onClick={() => addToBasket(item)}> Drank</btn></h5>
              </div>
              </>
            );
          })
        }
        </div>
        <div className="basket">
        <div className="order_title">
         <h5>Your Order</h5>
          </div>
         <div className="order_list">
         {
          basket.map((item, index) => {
            return (
              <>
              <h6 key={index}>{item.drink} - £{item.price} <btn onClick={() => removeFromBasket(item)}> x</btn></h6>
              </>
            )
          })
        }
         </div>
        
        {
         basket.length === 0 ? null : 
         <h4>total : £{totalBasket(basket)}</h4>
         }
        </div>
        </div>
    </div>
  );
}

export default App;
