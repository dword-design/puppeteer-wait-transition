export default handle =>
  handle.evaluate(
    el =>
      new Promise(resolve =>
        el.addEventListener('transitionend', () => resolve()),
      ),
  )
