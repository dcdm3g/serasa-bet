import { validate } from './utils/validate.js'
import { isEmail } from './utils/is-email.js'
import { isPassword } from './utils/is-password.js'

const form = document.querySelector('.form')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const result = validate({
    email: [isEmail],
    password: [isPassword],
  })

  if (!result.success) {
    return
  }

  fetch('https://aula-pi.onrender.com/login', {
    method: 'POST',
    body: JSON.stringify({ email: result.email, password: result.password })
  })
})