import { useEffect, useState } from 'react'
import { InputBox } from './components'
import UseCurrencyInfo from "./Hooks/Usecurrencyinfo.js"

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [backgroundImage, setBackgroundImage] = useState("")
  
  const currencyInfo = UseCurrencyInfo(from)

  const options = Object.keys(currencyInfo)


  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }
  useEffect(() => {
    const backgroundImages = ["https://i.pinimg.com/originals/54/0a/9d/540a9d8b863b3601e4653f42cbe243c1.gif", 
    "https://i.makeagif.com/media/7-03-2021/hsY88c.gif", 
    "https://media.tenor.com/7ZuDgIvZtvgAAAAC/money-dollars.gif",
    "https://cdn.tech.eu/uploads/2022/04/money-611.gif",
    "https://assets-global.website-files.com/624c384f8381545e20dec7ac/62dfafc4531f944d9aae11f8_multicurrency-account-for-ecommerce-businesses.gif",
  "https://media1.giphy.com/media/13ln9K5TWkNTLa/giphy.gif"]
  
    const arrayIndex = Math.floor((Math.random() * backgroundImages.length )) 
    setBackgroundImage(backgroundImages[arrayIndex])
    console.log(arrayIndex)
  },[])
  
  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url(${backgroundImage})`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                       convert()
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChagne={(currency) => setFrom(currency)}
                            selectCurrency={from}
                            onAmountChange={(amount) => setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChagne={(currency) => setTo(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App
