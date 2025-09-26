async function renderShows() {
    const response = await fetch('/shows')
    const data = await response.json()

    const mainContent = document.getElementById('main-content')

    if (data) {
        data.map(show => {
            const card = document.createElement('div')
            card.classList.add('card')

            const topContainer = document.createElement('div')
            topContainer.classList.add('top-container')
            topContainer.style.backgroundImage = `url(${show.image})`

            const bottomContainer = document.createElement('div')
            bottomContainer.classList.add('bottom-container')

            const eventName = document.createElement('h3')
            eventName.textContent = show.eventName
            bottomContainer.appendChild(eventName)

            const artists = document.createElement('p')
            artists.textContent = show.artists.length > 1 ? `${show.artists.slice(0, -1).join(", ")} and ${show.artists.slice(-1)}` : show.artists.join("")
            bottomContainer.appendChild(artists)


            const ticketPrice = document.createElement('p')
            ticketPrice.textContent = "Price: " + show.ticketPrice
            bottomContainer.appendChild(ticketPrice)

            const link = document.createElement('a')
            link.textContent = 'Read More ->'
            link.setAttribute('role', 'button')
            link.href = `/shows/${show.id}`
            bottomContainer.appendChild(link)

            card.appendChild(topContainer)
            card.appendChild(bottomContainer)

            mainContent.appendChild(card)
        
        })
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No Shows Available 😞'
        mainContent.appendChild(message)
    }
}

const requestedUrl = window.location.href.split('/').pop()
if (requestedUrl && (isNaN(parseInt(requestedUrl)) || (parseInt(requestedUrl) < 1 || parseInt(requestedUrl) > 6))) {
    window.location.href = '../404.html'
} else {
    renderShows()
}


async function renderShow() {
    const requestedID = parseInt(window.location.href.split('/').pop())
    const response = await fetch('/shows')
    const data = await response.json()

    const showContent = document.getElementById('show-content')
    let show
    show = data.find(show => show.id === requestedID)

    if (show) {
        document.getElementById('image').src = show.image
        document.getElementById('name').textContent = show.eventName
        document.getElementById('artists').textContent = show.artists.length > 1
                ? `Artists: ${show.artists.slice(0, -1).join(", ")} and ${show.artists.slice(-1)}`
                : `Artist: ${show.artists.join("")}`
        document.getElementById('price').textContent = 'Price: ' + show.ticketPrice
        document.getElementById('time').textContent = 'Time: ' + show.dateTime
        document.getElementById('venue').textContent = 'Venue: ' + show.venue
        document.getElementById('genre').textContent = 'Genre: ' + show.genre
        document.title = `StageScout - ${show.eventName}`
    } else {
        const message = document.createElement('h2')
        message.textContent = 'No Shows Available 😞'
        showContent.appendChild(message)
    }
}

renderShow()