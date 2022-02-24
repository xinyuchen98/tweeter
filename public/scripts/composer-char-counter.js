/* eslint-disable no-undef */
$(document).ready(function() {
  // Handles new tweet input field
  $("#tweet-text").on('input', function() {
    // Length limit of a single tweet
    const lengthLimit = 140;
    const inputLength = $(this).val().length;

    // Find the counter
    const counter = $('#counter');

    if (inputLength > lengthLimit) {
      // Display the counter in red if input length exceeds the length limit
      counter.css('color', '#ff0000');
    } else {
      // Display the counter in grey if input length is within the length limit
      counter.css('color', '#545149');
    }

    // Display the number of characters remaining
    counter.text(lengthLimit - inputLength);
  });
});