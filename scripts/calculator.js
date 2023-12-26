const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector(".keys");
const display = document.querySelector('.display_area');
const calculate = (n1, operator, n2) =>{
  console.log(n1 + operator + n2)
    let result = ''
    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)
    if (operator === 'add') {
        result = firstNum + secondNum
      } else if (operator === 'subtract') {
        result = firstNum - secondNum
      } else if (operator === 'multiply') {
        result = firstNum * secondNum
      } else if (operator === 'divide') {
        result = firstNum / secondNum
      }
      
      return result
}
const getKeyType = (key)=>{
  const{action} = key.dataset
  if(!action) return 'number'
  if(
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) return 'operator'
  return action
}
const createResultString = (key, displayedNum,state)=>{
  const keyContent = key.textContent
  const {action} = key.dataset
  const{
    firstValue,
    modValue,
    operator,
    previousKeyType
  } = state
  const keyType = getKeyType(key)
  if(keyType === 'number'){
    return displayedNum === '0' || previousKeyType ==='operator' || previousKeyType === 'calculate' ?keyContent : displayedNum + keyContent
  }
  if(keyType === 'decimal'){
    if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
      return '0.'
    }
    else{
      if (!displayedNum.includes('.')){
        return displayedNum + '.'
      }
    }
  }
  if(keyType === 'operator'){
    const firstValue = calculator.dataset.firstValue
    const operator = calculator.dataset.operator
    return firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate' ?  calculate(firstValue,operator,displayedNum): displayedNum
  }
  if(keyType === 'clear') return 0
  if(keyType === 'calculate'){
    let firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    let secondValue = displayedNum;
    calculator.dataset.secondValue = secondValue
    if(firstValue){
      return previousKeyType === 'calculate'
      ? calculate(displayedNum,operator, modValue)
      :calculate(firstValue,operator, displayedNum)
    }
    else{
      return displayedNum
    }
  }
}
const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
  const keyType = getKeyType(key)
  const {
    firstValue,
    operator,
    modValue,
    previousKeyType
  } = calculator.dataset
  calculator.dataset.previousKeyType = keyType
  if (keyType === 'number') {
  }
  if (keyType === 'decimal') { /* ... */ }
  if (keyType === 'operator') {
    calculator.dataset.operator = key.dataset.action
    calculator.dataset.firstValue = firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate'
    ? calculatedValue
    : displayedNum}
  if (keyType === 'clear') {
    if(key.textContent === 'AC'){
      calculator.dataset.firstValue =''
      calculator.dataset.modtValue =''
      calculator.dataset.operator =''
      calculator.dataset.secondValue =''
      calculator.dataset.previousKeyType =''
  }
}
  if (keyType === 'calculate') {
    calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
    ? modValue
    : displayedNum
  }
}
const updateVisualState = (key, calculator) => {
  const keyType = getKeyType(key)
  Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
  if (keyType === 'operator') key.classList.add('is-depressed')
  if (keyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC'
  if (keyType !== 'clear') {
    const clearButton = calculator.querySelector('[data-action=clear]')
    clearButton.textContent = 'CE'
  }
}
keys.addEventListener('click', e => {
  if (e.target.matches('button')){
      
  const key = e.target
  const displayedNum = display.textContent
  const resultString = createResultString(key, displayedNum, calculator.dataset)
  
  display.textContent = resultString
  
  // Pass in necessary values
  updateCalculatorState(key, calculator, resultString, displayedNum)
  updateVisualState(key, calculator)
  }
})