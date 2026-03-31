import { useState, useEffect } from 'react'

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(function() {
    function handle() { setWidth(window.innerWidth) }
    window.addEventListener('resize', handle)
    return function() { window.removeEventListener('resize', handle) }
  }, [])
  return width
}

export default useWindowWidth
