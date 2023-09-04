let select = document.querySelectorAll('.currency');
let btn = document.getElementById('btn');
let input = document.getElementById('input');
let alertlbl = document.querySelector('.alert-content')
// fetch the currency api and convert as json
fetch('https://api.frankfurter.app/currencies')
.then(res=>res.json())
// display the result of the json as dropdown
.then(res=>displayDropdown(res))

function displayDropdown(res){
  // converting the json res as an array
  let currencies = Object.entries(res)
  for(let i=0;i<currencies.length;i++){
    let opt = `<option value="${currencies[i][0]}">${currencies[i][0]}</option>`
    select[0].innerHTML += opt;
    select[1].innerHTML += opt;
  }
}

// action listener for convert button

btn.addEventListener('click',()=>{
  let currency1 = select[0].value
  let currency2 = select[1].value
  let inputVal = input.value
  if(currency1===currency2){
    alertlbl.innerText="Enter different currencies";
  }else{
    alertlbl.innerText="";
    convert(currency1,currency2,inputVal)
  }
});

function convert(currency1,currency2,inputVal){
  const host = 'api.frankfurter.app';
  fetch(`https://${host}/latest?amount=${inputVal}&from=${currency1}&to=${currency2}`)
  .then(resp => resp.json())
  .then((data) => {
    document.getElementById('result').value = Object.values(data.rates)[0]
  });
}