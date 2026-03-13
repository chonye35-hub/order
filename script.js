let orders = JSON.parse(localStorage.getItem("orders") || "{}")

async function parseOrder(){

 const text = document.getElementById("inputText").value

 if(!text){
  alert("주문 입력")
  return
 }

 const apiKey = "여기에_API_KEY"

 const menuList = `
메뉴 목록:
후라이드 치킨
양념 치킨
간장 치킨
콜라
사이다
감자튀김
`

 const prompt = `
다음 주문을 JSON으로 정리해줘.

${menuList}

형식:
{
 "name":"",
 "items":[{"menu":"","qty":0}],
 "time":"HH:MM",
 "delivery":true/false,
 "notes":""
}

주문:
${text}
`

 const res = await fetch("https://api.openai.com/v1/chat/completions",{

  method:"POST",

  headers:{
   "Content-Type":"application/json",
   "Authorization":"Bearer " + apiKey
  },

  body:JSON.stringify({

   model:"gpt-4.1-mini",

   messages:[
    {role:"user",content:prompt}
   ]

  })

 })

 const data = await res.json()

 const result = data.choices[0].message.content

 const order = JSON.parse(result)

 saveOrder(order)
}

function saveOrder(order){

 const today = new Date().toISOString().split("T")[0]

 if(!orders[today]){
  orders[today] = []
 }

 orders[today].push(order)

 localStorage.setItem("orders", JSON.stringify(orders))

 document.getElementById("datePicker").value = today

 loadOrders()
}

function loadOrders(){

 const date = document.getElementById("datePicker").value

 if(!date) return

 const d = new Date(date)

 const weekday = ["일","월","화","수","목","금","토"]

 const title =
 `${d.getMonth()+1}월 ${d.getDate()}일 ${weekday[d.getDay()]}요일 주문`

 document.getElementById("orderTitle").innerText = title

 const container = document.getElementById("orders")

 container.innerHTML=""

 let list = orders[date] || []

 list.sort((a,b)=> a.time.localeCompare(b.time))

 list.forEach(o=>{

  let items = o.items
   .map(i => `${i.menu} x${i.qty}`)
   .join("<br>")

  container.innerHTML += `
   <div class="order">
    <b>${o.time}</b><br>
    ${o.name}<br>
    ${items}<br>
    ${o.delivery ? "배달" : "포장"}<br>
    ${o.notes}
   </div>
  `
 })
}
