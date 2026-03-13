let orders = JSON.parse(localStorage.getItem("orders") || "{}")

function saveOrder(){

 const text = document.getElementById("inputText").value

 if(!text){
  alert("주문 입력")
  return
 }

 const today = new Date().toISOString().split("T")[0]

 if(!orders[today]){
  orders[today] = []
 }

 orders[today].push({
  time:new Date().toLocaleTimeString(),
  text:text
 })

 localStorage.setItem("orders", JSON.stringify(orders))

 document.getElementById("inputText").value=""

 alert("주문 저장됨")
}
function loadOrders(){

 const date = document.getElementById("datePicker").value

 const title = new Date(date)

 const weekday = ["일","월","화","수","목","금","토"]

 const text =
  `${title.getMonth()+1}월 ${title.getDate()}일 ${weekday[title.getDay()]}요일 주문`

 document.getElementById("orderTitle").innerText = text

 const container = document.getElementById("orders")

 container.innerHTML=""

 const list = orders[date] || []

 list.forEach(o=>{

  container.innerHTML += `
   <div class="order">
     <b>${o.time}</b><br>
     ${o.text}
   </div>
  `
 })
}
