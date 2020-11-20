function selectList() {
    const dropDown = document.querySelector('#dropdown-options');
    const arrow = document.querySelector('#arrow')
    arrow.addEventListener("click", () => {
        dropDown.classList.toggle('on')
        arrow.classList.toggle('fa-caret-up')
        
    })
  }
  
  selectList()

  function sideProductList() {
    const sideList = document.querySelector('#side-list');
    const market = document.querySelector('#market')
    market.addEventListener("click", () => {
        sideList.classList.toggle('view')
        
        
    })
  }
  
  sideProductList()