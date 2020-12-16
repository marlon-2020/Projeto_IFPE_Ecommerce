// MODAL script:1 à script:26
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems, options);
});

$(document).ready(function () {
  $(".modal").modal();
});

$(document).ready(function () {
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $(".modal-trigger").leanModal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: 0.5, // Opacity of modal background
    in_duration: 300, // Transition in duration
    out_duration: 200, // Transition out duration
    ready: function () {
      alert("Ready");
    }, // Callback for Modal open
    complete: function () {
      alert("Closed");
    }, // Callback for Modal close
  });
});

window.onload = function () {
  function selectList() {
    const dropDown = document.querySelector("#dropdown-options");
    const arrow = document.querySelector("#arrow");
    const closeModal = document.querySelector(".products");
    arrow.addEventListener("click", () => {
      dropDown.classList.toggle("on");
      arrow.classList.toggle("fa-caret-up");
      closeModal.addEventListener("click", () => {
        dropDown.classList.remove("on");
        arrow.classList.remove("fa-caret-up");
      });
    });
  }

  selectList();

  function sideProductList() {
    const sideList = document.querySelector("#side-list");
    const market = document.querySelector("#market");
    const closeModal = document.querySelector(".products");
    market.addEventListener("click", () => {
      sideList.classList.toggle("view");
      closeModal.addEventListener("click", () => {
        sideList.classList.remove("view");
      });
    });
  }
  sideProductList();
};
