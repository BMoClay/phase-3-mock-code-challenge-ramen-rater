const ramenMenuDiv = document.querySelector("#ramen-menu")
let ramenDetailDiv = document.querySelector("#ramen-detail")

ramenMenuDiv.addEventListener("click", e => {
    console.log(e.target)
    
})

const renderRamens = (ramen) => {
    let ramenImg = document.createElement("img")
    ramenImg.src = ramen.image
    ramenImg.dataset.id = ramen.id
  
    ramenMenuDiv.append(ramenImg)
}

const getRamens = () => {
    fetch("http://localhost:3000/ramens")
    .then(r => r.json())
    .then((ramenArray) => {
        ramenArray.forEach(ramen => {
            renderRamens(ramen)
        })
    })
}

getRamens()