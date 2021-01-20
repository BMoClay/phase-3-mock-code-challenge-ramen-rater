const ramenMenuDiv = document.querySelector("#ramen-menu")
let ramenDetailDiv = document.querySelector("#ramen-detail")
let ramenRatingForm = document.querySelector("#ramen-rating")

const renderRamen = (ramen) => {
    ramenDetailDiv.innerHTML = `
    <img class="detail-image" src="${ramen.image}" alt="${ramen.name}" />
    <h2 class="name">${ramen.name}</h2>
    <h3 class="restaurant">${ramen.restaurant}</h3>
    `
    ramenRatingForm.dataset.id = ramen.id
    console.log(ramenRatingForm)
    ramenRatingForm.innerHTML = `
    <label for="{rating}">Rating: </label>
    <input type="text" name="rating" id="rating" value="${ramen.rating}" />
    <label for="comment">Comment: </label>
    <textarea name="comment" id="comment">${ramen.comment}</textarea>
    <input type="submit" value="Update" />
    `
}

ramenMenuDiv.addEventListener("click", e => {
    let id = e.target.dataset.id
    getRamen(id)
})

const renderRamens = (ramen) => {
    let ramenImg = document.createElement("img")
    ramenImg.src = ramen.image
    ramenImg.dataset.id = ramen.id
  
    ramenMenuDiv.append(ramenImg)
}

const getRamen = (id) => {
    fetch(`http://localhost:3000/ramens/${id}`)
    .then(r => r.json())
    .then((ramenObj) => {
            renderRamen(ramenObj)
        })
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