const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')

const title = document.querySelector('#event-title')
const description = document.querySelector('#event-description')
const date = document.querySelector('#date')
const oddsValue = document.querySelector('#odds-value')
const bettingStartDate = document.querySelector('#betting-start-date')
const bettingEndDate = document.querySelector('#betting-end-date')

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function formatGMT(gmt) {
  const date = new Date(gmt)

  return date.getDate() 
    + ' ' + months[date.getMonth()] 
    + ' ' + date.getFullYear()
}

fetch('http://localhost:5000/events/' + id, {
  method: 'GET',
  credentials: 'include',
})
.then((response) => {
  if (!response.ok) {
    // window.location.href = '/'
  }

  return response.json()
}).then((data) => {
  console.log(data)

  title.innerText = data.title
  description.innerText = data.description
  date.innerText = formatGMT(data.event_date),
  oddsValue.innerText = parseFloat(data.odds_value).toFixed(2)
  bettingStartDate.innerText = formatGMT(data.betting_start_date)
  bettingEndDate.innerText = formatGMT(data.betting_end_date)
})