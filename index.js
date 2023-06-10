

const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const phone = document.getElementById('phone')
const email= document.getElementById('email')
const jobType = document.getElementById('jobType')
const jobSource = document.getElementById('jobSource')
const jobDescription = document.getElementById('jobDescription')
const address = document.getElementById('address')
const city = document.getElementById('city')
const state = document.getElementById('state')
const zipCode = document.getElementById('zipCode')
const area = document.getElementById('area')
const date= document.getElementById('date')
const startTime = document.getElementById('startTime')
const endTime= document.getElementById('endTime')
const testSelect = document.getElementById('testSelect')


let jobTypeCode ='71f3531b98b38a95739884ef2f74f02e53b59ca8'
    let jobSourceCode = '996917a92e0ce4a01f34b1eac513832cc77fe84e'
    let areaCode = 'a3890e758d6870018e6f1424617b033f6160683c'
    let OTCode = '2b975015db472468c33c3203e891d2628bebc2e3'
    let HTCode = '55baffbf3d1be3304330dde41a74e5d74f194f97'
    let startTimeCode = '94b4cdc9ada7836bbfb14de7799cc7ff5c3fe838'
    let endTimeCode = 'ba46d70c89ef8783274bee01b6e1e8679bc58d6c'
    let CTCode = 'b08b34cb4647f769e7bc0c482e0cae42d6566c3d'
    let ATCode = 'c0cff3f3497711db4fda6d84879fd6ab2e85246b'
    let MTCode = 'a37d163b360087a98adba377cbc88282fa9eed2c'
    let TTCode = 'a6b9372b781697a81911af01b6f737b3cb4f23c7'
    let tagsCode = 'de02d3ae65d2b5a0a1da670a642cedfdf4cfe95a'
    let dateCode = '45ba9285142ff9d94ce032ff8bfabbf0b4b2dd49'
    let jobCommentCode = 'f259d9c95035b6f83945e9c71187684ae3f98b22'
    let addressCode = 'f6a67fbad1c00114217ed4e04745a833cb2a8e40'



form = document.getElementById('form')
btn = document.getElementById('btn')
ending = document.querySelector('.ending')


async function fetchData(){
    let r = await fetch('https://api.pipedrive.com/v1/persons/1?api_token=296fc1e6fd251093569c353c19518178f3adc27e')
    let result = await r.json()
    console.log(result)
}

fetchData()

function choosedArea(){
  let curArea;
  switch(area.value){
      case 'Tampa': 
          curArea = {
            [TTCode]:testSelect.value,
            [CTCode]:'',
            [ATCode]:'',
            [MTCode]:'',
            [OTCode]:'',
            [HTCode]:''
          }
          break
      case 'Miami':
          curArea = {
            [TTCode]:'',
            [CTCode]:'',
            [ATCode]:'',
            [MTCode]:testSelect.value,
            [OTCode]:'',
            [HTCode]:''
          }
          break
      case  "Orlando":
          curArea = {
            [TTCode]:'',
            [CTCode]:'',
            [ATCode]:'',
            [MTCode]:'',
            [OTCode]:testSelect.value,
            [HTCode]:''
          }
          break
      case "Houston":
          curArea = {
            [TTCode]:'',
            [CTCode]:'',
            [ATCode]:'',
            [MTCode]:'',
            [OTCode]:'',
            [HTCode]:testSelect.value
          }
          break
      case "Charlotte":
          curArea = {
            [TTCode]:'',
            [CTCode]:testSelect.value,
            [ATCode]:'',
            [MTCode]:'',
            [OTCode]:'',
            [HTCode]:''
          }
          break
      case "Austin":
          curArea = {
            [TTCode]:'',
            [CTCode]:'',
            [ATCode]:testSelect.value,
            [MTCode]:'',
            [OTCode]:'',
            [HTCode]:''
          }
          break
    }
    return curArea
}

function mainData(){
  let data = {[jobTypeCode] : jobType.value,
    [jobCommentCode]: jobDescription.value,
    [areaCode]:area.value,
    [dateCode]:date.value,
    [endTimeCode]:endTime.value,
    [startTimeCode]:startTime.value,
    [jobSourceCode]:jobSource.value,
    [addressCode]:`${address.value}, ${city.value}, ${state.value} ${zipCode.value}`
    }
  return data
}

function personData(){
  let data = {
      'name':`${firstName.value} ${lastName.value}`,
      'first_name': firstName.value,
      'last_name': lastName.value,
      'email': email.value,
      'phone': phone.value
    }
  return data
}

const putData = async ( ) =>{
      let curArea = choosedArea()
      let req = mainData()
      let personUpdate = personData()
             
      const response = await fetch('https://api.pipedrive.com/v1/deals/1?api_token=296fc1e6fd251093569c353c19518178f3adc27e', {
      method: 'PUT', 
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
      });

      const response2 = await fetch('https://api.pipedrive.com/v1/deals/1?api_token=296fc1e6fd251093569c353c19518178f3adc27e', {
      method: 'PUT', 
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(curArea)
      });

      const response3 = await fetch('https://api.pipedrive.com/v1/persons/1?api_token=296fc1e6fd251093569c353c19518178f3adc27e', {
      method: 'PUT', 
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(personUpdate)
      });

      const data = await response.json( );
      const data2 = await response2.json( );
      const data3 = await response3.json( );

};



form.addEventListener('submit',(e)=>{
    e.preventDefault()
    putData()
    form.classList.add('hide')
    ending.classList.remove('hide')
})

const link = document.getElementById('link')
link.addEventListener('click',()=>{
    form.classList.remove('hide')
    ending.classList.add('hide')
})