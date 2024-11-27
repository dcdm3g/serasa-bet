import { validate } from './utils/validate.js'
import { isEmail } from './utils/is-email.js'
import { isNotEmpty } from './utils/is-not-empty.js'

const form = document.querySelector('.form')
const button = document.querySelector('.button')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const result = validate({
    email: [isEmail],
    password: [isNotEmpty],
  })

  if (!result.success) {
    return
  }

  button.innerHTML = 
    '<img class="animate-spin" width="16" height="16" src="/static/assets/loader-circle.svg" />'

  fetch('https://aula-pi.onrender.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      email: result.data.email, 
      password: result.data.password 
    })
  })
  .then((res) => res.json())
  .then(() => window.location.href = '/')
  .catch(() => {
    button.innerHTML = 'Login'
    alert('Uh oh! There was an error on our side. Please try again later.')
  })
})