$(document).ready(function() {
  $("#right").on("click", function() {
    var position = $("table").position();
    $("table").animate({
      left: position.left - 200
    }, 800);
  });
});
$("#left").on("click", function() {
  var position = $("table").position();
  $("table").animate({
    left: position.left + 200
  }, 800);
});
