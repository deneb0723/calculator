// 각 버튼 상수 지정
const result = document.querySelector(".js-result");
const reset = document.querySelector(".js-reset");
const equals = document.querySelector(".js-equals");
// 숫자 버튼과 사칙연산은 array에
const numbers = Array.from(document.querySelectorAll(".js-number"));
const operations = Array.from(document.querySelectorAll(".js-operation"));

//첫번째 입력변수, 두번째 입력 변수, 사칙연산 변수 지정
let firstValue = "",
  firstDone,
  secondValue = "",
  secondDone,
  currentOperation;

///첫번째 입력 변수와 두번째 입력 변수를 10진수 정수로 변환,
//switch 조건문으로 + - * / 기능과 디폴트 값 지정 함수
function doOperation() {
  const intValueA = parseInt(firstValue, 10);
  const intValueB = parseInt(secondValue, 10);
  switch (currentOperation) {
    case "+":
      return intValueA + intValueB;
    case "-":
      return intValueA - intValueB;
    case "/":
      return intValueA / intValueB;
    case "*":
      return intValueA * intValueB;
    default:
      return;
  }
}

//js-number 클릭 이벤트 리스너 함수
//if문을 사용히여 firstValue의 값이 없다면 firstValue에 값을 입력
//그게 아니라면 secondValue에 값을 입력
function handleNumberClick(e) {
  const clickedNum = e.target.innerText;
  if (!firstDone) {
    firstValue = firstValue + clickedNum;
    result.innerHTML = firstValue;
  } else {
    secondValue = secondValue + clickedNum;
    result.innerHTML = secondValue;
    secondDone = true;
  }
}

//연속적으로 연산이 가능하도록 하는 함수
//doOperation의 결과값이 result 안에 들어감
//result값은 다시 firstValue가 됨
function calculate() {
  const operation = doOperation();
  result.innerHTML = operation;
  firstValue = operation;
  secondDone = false;
  secondValue = "";
}

//+ - / * 버튼 클릭 이벤트 리스너 함수
function handleOperationClick(e) {
  const clickedOperation = e.target.innerText;
  if (!firstDone) {
    firstDone = true;
  }
  if (firstDone && secondDone) {
    calculate();
  }
  currentOperation = clickedOperation;
}

//AC 버튼 클릭 이벤트 리스너 함수
function handleReset() {
  firstValue = "";
  secondValue = "";
  firstDone = false;
  secondDone = false;
  currentOperation = null;
  result.innerHTML = "0";
}

//= 버튼 클릭 이벤트 리스너 함수
function handleEqualsClick() {
  if (firstDone && secondDone) {
    calculate();
  }
}

//각각 버튼에 클릭시 이벤트 설정
numbers.forEach(function (number) {
  number.addEventListener("click", handleNumberClick);
});
operations.forEach(function (operation) {
  operation.addEventListener("click", handleOperationClick);
});
reset.addEventListener("click", handleReset);
equals.addEventListener("click", handleEqualsClick);
