$(document).ready(function () {
  $("a").on("click", function (e) {
    if (this.hash !== "") {
      e.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });

  //swiper.js
  var swiper = new Swiper(".swiper-container", {
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
  });
});

$(".customerLink").click(function (e) {
  e.preventDefault();
  $.get("customerForm.html", function (data) {
    $("body").html(data);
  });
});

$(".serviceLink").click(function (e) {
  e.preventDefault();

  $.get("serviceForm.html", function (data) {
    $("body").html(data);
  });
});

$(".placeLink").click(function (e) {
  e.preventDefault();

  $.get("placeForm.html", function (data) {
    $("body").html(data);
  });
});
