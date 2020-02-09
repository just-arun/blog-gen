/* eslint-disable no-trailing-spaces */
const headerLinks = document.querySelectorAll('.nav-links');
headerLinks.forEach((item) => {
  if (window.location.pathname.indexOf(item.getAttribute('data-href')) !== -1) {
    item.classList.add('active');
  } else {
    item.classList.remove('active');
  }
});
