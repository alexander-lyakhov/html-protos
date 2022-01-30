(function() {
  console.log('!!!')

  document.body.addEventListener('contextmenu', e => {
    e.preventDefault()
    return false
  })

  document.body.addEventListener('mousedown', e => {
    console.log(e)
    if (e.button === 2) {
      console.log(123)
    }
  })

})()