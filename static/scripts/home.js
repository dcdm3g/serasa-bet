
const eventsClosingSoonList = document.querySelector('#events-closing-soon')
const mostBetEventsList = document.querySelector('#most-bet-events')

function renderEventCard({ title, description, odds_value, bet_count }) {
  return `
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
  `
}

fetch('http://localhost:5000/events/overview', {
  method: 'GET',
  credentials: 'include',
})
.then((response) => response.json())
.then((data) => {
  eventsClosingSoonList.innerHTML = data.events_closing_soon.reduce(
    (acc, cur) => {
      return acc + renderEventCard(cur)
    },
    ''
  )

  mostBetEventsList.innerHTML = data.most_bet_events.reduce(
    (acc, cur) => {
      return acc + renderEventCard(cur)
    },
    ''
  )
})