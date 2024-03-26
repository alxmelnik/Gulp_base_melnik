(function () {
  
  let hamburger = document.querySelector(".header__hamburger");
  let modal = document.querySelector(".modal");
  let modalClose = document.querySelector(".modal__close");
  let modalItems = document.querySelectorAll(".modal__item");


  // console.log(modalItems);

  function noScroll() {
    window.scrollTo(0, 0);
  }

  hamburger.addEventListener("click", (e) => {
    modal.style.display = "flex";
    window.addEventListener('scroll', noScroll);
  })
  
  modalClose.addEventListener("click", (e) => {
    modal.style.display = "none";
    window.removeEventListener('scroll', noScroll);
  })


  modalItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      modal.style.display = "none";
      window.removeEventListener('scroll', noScroll);
    })
  });

})();