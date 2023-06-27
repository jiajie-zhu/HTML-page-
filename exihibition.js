const serverUrl = 'http://127.0.0.1:3000/'
async function displayPortfolio (artistId) {
  const response = await fetch(serverUrl + 'artworks/by/author/' + artistId)
  if (response.ok) {
    const collect = await response.json()
    console.log(collect)
    const portfolioDisplayRow = document.getElementById('portfolio-display-row')
    portfolioDisplayRow.innerHTML = ''
    for (let i = 0; i < collect.length; ++i) {
      const displayTpl = document.getElementById('pic-img-tpl')
      const img = displayTpl.content.querySelector('.card-img-top')
      img.src = collect[i].url
      portfolioDisplayRow.appendChild(document.importNode(displayTpl.content.querySelector('.col-md-4'), true))
    }
  } else {
    alert('fail to fetch artworks')
  }
}

async function displayArtist () {
  const response = await fetch(serverUrl + 'artists')
  if (response.ok) {
    const artists = await response.json()
    const carouselInner = document.getElementById('carouselArtistsInner')
    for (let i = 0; i < artists.length; ++i) {
      const itemTpl = document.querySelector('#artist-profile-tpl')
      const avatar = itemTpl.content.querySelector('.artist-avatar')
      avatar.src = artists[i].avatar
      const name = itemTpl.content.querySelector('.artist-name')
      name.textContent = artists[i].name
      const bio = itemTpl.content.querySelector('.artist-bio')
      bio.textContent = artists[i].bio
      const div = itemTpl.content.querySelector('.carousel-item')
      div.dataset.authorId = artists[i].id
      const item = document.importNode(itemTpl.content, true)
      carouselInner.appendChild(item)
    }

    if (artists.length > 0) {
      const item = carouselInner.children[0]
      item.classList.add('active')
      displayPortfolio(artists[0].id)
    }

    // now do something with the result
  } else {
    alert(response.status)
  }
}

displayArtist()
const carousel = document.getElementById('carouselArtists')
carousel.addEventListener('slid.bs.carousel', event => {
  const targetItem = event.relatedTarget
  console.log('current_id: ' + targetItem.dataset.authorId)
  displayPortfolio(targetItem.dataset.authorId)
})
