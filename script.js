const orders = [
  {
    name: "김철수",
    phone: "010-1111",
    time: "18:00",
    items: [
      {menu:"후라이드 치킨", qty:2},
      {menu:"콜라", qty:1}
    ],
    notes: "배달 / 카드결제"
  },
  {
    name: "박영희",
    phone: "010-2222",
    time: "19:00",
    items: [
      {menu:"양념 치킨", qty:1}
    ],
    notes: "포장"
  }
]

const container = document.getElementById("orders")

orders.forEach(order => {

  let items = order.items
    .map(i => `${i.menu} x${i.qty}`)
    .join("<br>")

  container.innerHTML += `
    <div class="order">
      <h3>${order.time}</h3>
      <p>${order.name} ${order.phone}</p>
      <p>${items}</p>
      <p>${order.notes}</p>
    </div>
  `
})
