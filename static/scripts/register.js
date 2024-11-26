const dateOfBirth = document.querySelector('#date-of-birth')

dateOfBirth.addEventListener('keypress', (e) => {
  if (e.keyCode < 47 || e.keyCode > 57) {
    e.preventDefault()
  }

  const len = dateOfBirth.value.length
    
  if (len !== 1 || len !== 3) {
    if (e.keyCode == 47) {
      e.preventDefault()
    }
  }
    
  if(len === 2 || len === 5) {
    dateOfBirth.value += '/'
  }
})
