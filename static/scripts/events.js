const input = document.querySelector('#search-input')
const form = document.querySelector('#search-form')

const searchParams = new URLSearchParams(window.location.search)
const search = searchParams.get('search') ?? ''

input.value = search

function renderEventCard({ id, title, description, odds_value, bet_count }) {
  return `
    <a class="no-decoration" href="/event?id=${id}">
      <li class="scrollable-section__item">
        <div class="card event-card">
          <div class="card__title">${title}</div>
          <div class="card__description">${description}</div>

          <div class="event-card__info">
            <div class="event-card__info-text">${parseFloat(odds_value).toFixed(2)}</div>
            <div class="event-card__separator"></div>
            <div class="event-card__info-text">${bet_count} bets</div>
          </div>
        </div>
      </li>
    </a>
  `
}

form.addEventListener('submi')