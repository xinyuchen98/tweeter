/* eslint-disable no-undef */
$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    const lengthLimit = 140;
    const inputLength = $(this).val().length;
    const form = $(this).closest('form');
    const counter = $(form).find('.counter');

    if (inputLength > lengthLimit) {
      counter.css('color', '#ff0000');
    } else {
      counter.css('color', '#545149');
    }
    counter.text(lengthLimit - inputLength);
  });
});