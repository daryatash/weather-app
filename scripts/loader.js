const loader = document.querySelector('.loader')

export const showLoader = () => {
  loader.hidden = false
}

export const hideLoader = () => {
  loader.hidden = true
}