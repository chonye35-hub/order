function showManual(){

  const box = document.getElementById("manualBox")

  if(box.style.display==="none"){
    box.style.display="block"
  }else{
    box.style.display="none"
  }
}

async function transcribeAudio(){

  const file = document.getElementById("audioFile").files[0]

  if(!file){
    alert("파일 선택하세요")
    return
  }

  const formData = new FormData()
  formData.append("audio", file)

  const res = await fetch("/transcribe",{
    method:"POST",
    body:formData
  })

  const data = await res.json()

  document.getElementById("result").textContent =
    JSON.stringify(data,null,2)
}

async function sendManual(){

  const text = document.getElementById("manualText").value

  if(!text){
    alert("텍스트 입력")
    return
  }

  const res = await fetch("/parse-order",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({text})
  })

  const data = await res.json()

  document.getElementById("result").textContent =
    JSON.stringify(data,null,2)
}

