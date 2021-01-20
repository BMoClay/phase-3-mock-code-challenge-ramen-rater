const ramenMenuDiv = document.querySelector("#ramen-menu")
let ramenDetailDiv = document.querySelector("#ramen-detail")
let ramenRatingForm = document.querySelector("#ramen-rating")
const newRamenForm = document.querySelector("#new-ramen")

newRamenForm.addEventListener("submit", e => {
    e.preventDefault()
    let newName = e.target.name.value
    let newRestaurant = e.target.restaurant.value
    let newImage = e.target.image.value
    let newRating = e.target.rating.value
    let newComment = e.target["new-comment"].value
    let newRamenObj = {
        "name": newName,
        "restaurant": newRestaurant,
        "image": newImage,
        "rating": newRating,
        "comment": newComment
    }
   
    postNewRamen(newRamenObj)
})

const postNewRamen = (newRamenObj) => {
    fetch("http://localhost:3000/ramens", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRamenObj),
      })
    .then(r => r.json())
    .then((newRamenToDom) => {
            renderRamens(newRamenToDom)
        })
}

ramenRatingForm.addEventListener("submit", e => {
    e.preventDefault();
    let ratingId = e.target.dataset.id
    let newRating = e.target.rating.value
    let newComment = e.target.comment.value
    let updateObj = {
        "rating": newRating,
        "comment": newComment
    }
    updateRamen(updateObj, ratingId)
})

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
    let ramenDeleteH2 = document.createElement("h2")
    ramenDeleteH2.textContent = "X"
    ramenImg.append(ramenDeleteH2)
    console.log(ramenImg)
    ramenImg.src = ramen.image
    ramenImg.dataset.id = ramen.id
  
    ramenMenuDiv.append(ramenImg)
}

const updateRamen = (updateObj, ratingId) => {
    fetch(`http://localhost:3000/ramens/${ratingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateObj),
      })
    .then(r => r.json())
    .then((updatedRamenObj) => {
            renderRamen(updatedRamenObj)
        })
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