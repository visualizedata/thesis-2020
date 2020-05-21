$(document).ready(function() {
  $('.dropdown ul>li').click(function(){
    $('#text').click(function(){
      $(this).toggleClass('cb-active');
    });
    $('.dropdown ul>li').each(function(){
      $(this).removeClass('drop-selected');
    });
    $(this).toggleClass('drop-selected');
    $('.dropdown>label:first-child').css({
      '-webkit-transform': 'scale(0.0)',
      'transform': 'scale(0.0)',
      'position':'absolute'}); $('.dropdown>span').text($(this).attr("val"))
  });
});