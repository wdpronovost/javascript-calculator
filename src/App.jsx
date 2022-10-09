import './App.css'
import { useState, useEffect } from 'react'

// console.log(parseFloat(eval('(80*-2)/7').toFixed(4)))

export default function App() {
  const [expressionString, setExpressionString] = useState('')
  const [display, setDisplay] = useState('0')
  const [userInput, setUserInput] = useState('')

  const handleClick = (e) => {
    // console.log(`value coming in: ${e.target.value}`);
    // console.log(`current expressionString: ${expressionString}`)
    // console.log(`display: ${display}`)
    // console.log(`current expression length: ${expressionString.length}`)
    // console.log(`userInput: ${userInput}`)
    setUserInput('digit')
    let currentValue = e.target.value;
    console.log(typeof currentValue)
    let firstCharOfDisplay = display[0];
    let expectedLength = expressionString.length + (userInput === 'operator' ? 0 : display.length + 1)
    console.log(`expectedLength: ${expectedLength}`)
    if (userInput === 'eval') {
      setDisplay(currentValue)
    } else if (userInput === 'operator' && expressionString <= 28) {
      // console.log(`in operator and less length`)
      setDisplay(e.target.value)
    } else if (expressionString.length === 30 && userInput === 'operator') {
      // console.log(`should be changing last operator to equals`)
      setExpressionString(expressionString.slice(0, expressionString.length - 1) + '=')
    } else if (
      (expressionString.length > 29) ||
      (display.length == 9 && userInput === 'digit') ||
      (firstCharOfDisplay === '0' && currentValue === '0') ||
      (currentValue === '.' && display.indexOf(".") !== -1)
    ) {
      // console.log(`in do nothing check`)
      return;
    } else if (firstCharOfDisplay === '0' && currentValue === '.') {
      // console.log(`in decimal entry`)
      setDisplay(display + currentValue)
    } else if (firstCharOfDisplay !== '0' && userInput !== 'operator') {
      // console.log(`in allow build number`)
      setDisplay(display + currentValue)
    } else {
      // console.log('in the else check')
      setDisplay(currentValue)
    }
  }

  const handleAllClear = () => {
    console.log(`all clear`)
    setUserInput('')
    setExpressionString('')
    setDisplay('0')
  }

  const handleClear = () => {
    setUserInput('')
    if (display === '0') {
      return;
    } else {
      setDisplay("0")
    }
  }

  const handlePosNeg = () => {
    console.log(`posNeg: ${display}`)
    if (display[0] === '-') {
      setDisplay(display.slice(1))
    } else {
      setDisplay('-' + display)
    }
  }

  const handleOperator = (e) => {
    e.target.value === '=' ? setUserInput('eval') : setUserInput('operator')
    if (e.target.value === '=') {
      setExpressionString(expressionString + display + e.target.value)
    } else if (e.target.value === '=') {
      setExpressionString(display)
    }else if (!expressionString && display === '0') {
      return;
    } else if (!expressionString && display !== '0') {
      setExpressionString(display + e.target.value)
    } else if (userInput === 'operator') {
      setExpressionString(expressionString.slice(0, expressionString.length - 1) + e.target.value)
    } else {
      setExpressionString(expressionString + display + e.target.value)
    }
  }

  useEffect(() => {
    if (expressionString.charAt(expressionString.length -1) === '=') {
      console.log(`express to eval: ${expressionString}`)
      setDisplay(eval(expressionString.slice(0, -1)))
      setExpressionString('')
      setUserInput('eval')
    }
  }, [expressionString])


  return (
    <main>
      <div id={'calculator'}>
        <div className={'feedbackDisplay'}>
          <div className={'formulaDisplay'}>{expressionString}</div>
          <div id={'display'} className={'input'}>{display}</div>
        </div>
        <button id={'allclear'} onClick={handleAllClear} className={'allclear'}>AC</button>
        <button id={'clear'} onClick={handleClear} value={'c'} className={'clear'}>C</button>
        <button id={'posneg'} onClick={handlePosNeg} value={'-'} className={'posneg'}>&#177;</button>
        <button id={'divide'} onClick={handleOperator} value={'/'} className={'operator'}>&#247;</button>
        <button id={'seven'} onClick={handleClick} value={'7'} className={'digit'}>7</button>
        <button id={'eight'} onClick={handleClick} value={'8'} className={'digit'}>8</button>
        <button id={'nine'} onClick={handleClick} value={'9'} className={'digit'}>9</button>
        <button id={'multiply'} onClick={handleOperator} value={'*'} className={'operator'}>&#215;</button>
        <button id={'four'} onClick={handleClick} value={'4'} className={'digit'}>4</button>
        <button id={'five'} onClick={handleClick} value={'5'} className={'digit'}>5</button>
        <button id={'six'} onClick={handleClick} value={'6'} className={'digit'}>6</button>
        <button id={'subtract'} onClick={handleOperator} value={'-'} className={'operator'}>&#8722;</button>
        <button id={'one'} onClick={handleClick} value={'1'} className={'digit'}>1</button>
        <button id={'two'} onClick={handleClick} value={'2'} className={'digit'}>2</button>
        <button id={'three'} onClick={handleClick} value={'3'} className={'digit'}>3</button>
        <button id={'add'} onClick={handleOperator} value={'+'} className={'operator'}>&#43;</button>
        <button id={'zero'} onClick={handleClick} value={'0'} className={'digit'}>0</button>
        <button id={'decimal'} onClick={handleClick} value={'.'} className={'decimal'}>&#8901;</button>
        <button id={'equals'} onClick={handleOperator} value={'='} className={'operator'}>&#61;</button>
      </div>
      <p id={'copyright'}>Designed and Coded by <br /> WDPronovost</p>
    </main>
  )
}
