function selectList() {
    const dropDown = document.querySelector('#dropdown-options');
    const arrow = document.querySelector('#arrow')
    const closeModal = document.querySelector('.products')
    arrow.addEventListener("click", () => {
        dropDown.classList.toggle('on')
        arrow.classList.toggle('fa-caret-up')
        closeModal.addEventListener("click", () => {
          
          dropDown.classList.remove('on')
          arrow.classList.remove('fa-caret-up')
        })
        
    })
  }
  
  selectList()

  function sideProductList() {
    const sideList = document.querySelector('#side-list');
    const market = document.querySelector('#market')
    const closeModal = document.querySelector('.products')
    market.addEventListener("click", () => {
        sideList.classList.toggle('view')
        closeModal.addEventListener("click", () => {
          
          sideList.classList.remove('view')
        })
        
    })
  }
  
  sideProductList()