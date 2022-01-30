(function() {
  console.log('!!!')

  var dataAttr = 'data-gtm-track'

  document.body.addEventListener('contextmenu', e => {
    e.preventDefault()
    return false
  })

  document.body.addEventListener('mousedown', e => {
    if (e.button === 2) {
      for (let node = e.target; node; node = node.parentNode) {
        let trackAttr = node.getAttribute ? node.getAttribute(dataAttr):null

        if (trackAttr) {
          console.log(`${dataAttr}="${trackAttr}"`)
          return
        }
      }
    }
  })

})()