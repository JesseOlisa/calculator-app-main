/*FOR THEME STYLE CHANGE STARTS*/
let themeStyle = document.getElementsByClassName('theme-number');
let themeControl = document.getElementById('theme-control');

for (let i=0; i < themeStyle.length; i++) {
    themeStyle[i].addEventListener('click',  function(){
		let theme = this.dataset.theme
		setTheme(theme)
    })
}

function setTheme(theme) {
    if (theme == 'theme-1') {
        themeControl.href = './css/default.css'
    }
    if (theme == 'theme-2') {
        themeControl.href = './css/theme-2.css'
    }
    if (theme == 'theme-3') {
        themeControl.href = './css/theme-3.css'
    }
}/*FOR THEME STYLE CHANGE ENDS*/

/*JS FOR CALCULATOR STARTS*/

//VARIABLE DECLARATION
let resultDisplay = document.getElementById('result');
let number = document.getElementsByClassName('number');
let decimalPoint = document.getElementById('.');
let operator = document.getElementsByClassName('operator');
let valueHistory = null;
let operatorhistory = null;


//FUNCTIONS
function getInputValueStr() {
    return resultDisplay.innerText.split(',').join(''); //this function fixes the tolocalstring comma issue
}

const getInputvalueNum = () => {
    return parseFloat(getInputValueStr());
}

const setStrAsDecimal = (strvalue) => {
    if(strvalue[strvalue.length - 1] === '.') {
        resultDisplay.innerText += '.';
        return;
    }
    const [wholenumber, decimalnumber] = strvalue.split('.');
    if(decimalnumber) {
        resultDisplay.innerText = parseFloat(wholenumber).toLocaleString() + '.' + decimalnumber;
    }
    else {
        resultDisplay.innerText = parseFloat(wholenumber).toLocaleString();
    }  
}

const printInputNumber = (numStr) => { //this function prints number into the display area
    let currentNumStr = getInputValueStr();
    setStrAsDecimal(currentNumStr + numStr);
}

const operationResult = () => {
    let currentStrNum = getInputvalueNum();
    let valueHistoryToNum = parseFloat(valueHistory);
    let newValueNum;
    if (operatorhistory === '+') {
        newValueNum = valueHistoryToNum + currentStrNum;
    }
    else if (operatorhistory === '-') {
        newValueNum = valueHistoryToNum - currentStrNum; 
    }
    else if (operatorhistory === '*') {
        newValueNum = valueHistoryToNum * currentStrNum; 
    }
    else if (operatorhistory === '/') {
        newValueNum = valueHistoryToNum / currentStrNum; 
    }

    return newValueNum.toString();
}
const operationClick = (operator) => {
    let currentNumStr = getInputValueStr();
    
    if(!valueHistory) { //tihs takes in the current value and operation into the value history or operator history
        valueHistory = currentNumStr;
        operatorhistory = operator;
        setStrAsDecimal('0');
        return;
    }
    valueHistory = operationResult();
    operatorhistory = operator;
    setStrAsDecimal('0');
}


//ADD EVENT LISTENERS FOR NUMBERS AND DECIMALS

//event listener when number is clicked
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function () {
        printInputNumber(this.id);
    })
}

//event listener when decimal is clicked
decimalPoint.addEventListener('click', () => {
    let currentNumStr = getInputValueStr();

    if (!currentNumStr.includes('.')) {
        setStrAsDecimal(currentNumStr + '.');
        /*resultDisplay.innerText = currentNumStr + '.'; //this add decimal point the existing input value*/
    };
})

//ADD EVENT LISTENER TO OPERATORS 
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {
        if(this.id == 'reset') {
            resultDisplay.innerText = "";
            valueHistory = null;
            operatorhistory = null;
        }
        else if(this.id == 'del') {
            let currentNumStr = getInputvalueNum().toString();
            if(currentNumStr.length > 1) {
                currentNumStr = currentNumStr.substring(0, currentNumStr.length -1);
                setStrAsDecimal(currentNumStr);
            }
            else {
                setStrAsDecimal('0');
            }
        }
        else if(this.id =='+' || this.id =='-' || this.id =='*' || this.id =='/'){
            operationClick(this.id);

        }
        else {
            if(valueHistory) {
                setStrAsDecimal(operationResult());
                valueHistory = null;
                operatorhistory = null;
            }
        }
    })
        
}
/*JS FOR CALCULATOR ENDS*/

