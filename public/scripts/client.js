/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
  const $tweetsContainer = $('#all-tweets');

  // Loops through tweets
  // Calls createTweetElement for each tweet
  // Takes return value and appends it to the tweets container
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $tweetsContainer.append(createTweetElement(tweet));
    }
  };

  // Creates a single tweeter block
  const createTweetElement = (tweet) => {
    const $avatar = $('<img>').attr("src", tweet.user.avatars);
    const $fullname = $('<span>').text(tweet.user.name).addClass("tweet-fullname");
    const $tweetAvatarDiv = $('<div>').addClass("tweet-avatar-name");
    $tweetAvatarDiv.append($avatar, $fullname);

    const $username = $('<span>').text(tweet.user.handle).addClass("tweet-username");

    const $tweetHeader = $('<header>').addClass("tweet-header");

    // Adds elements to header
    $tweetHeader.append($tweetAvatarDiv, $username);

    // Tweeter content
    const $tweetContent = $('<div>').text(tweet.content.text).addClass("tweet-content");

    // Changes time display with timeago
    const $tweetTime = $('<span>').text(timeago.format(tweet.created_at)).addClass("tweet-time");

    const $flagIcon = $('<i>').addClass("fa-solid fa-flag");
    const $retweetIcon = $('<i>').addClass("fa-solid fa-retweet");
    const $heartIcon = $('<i>').addClass("fa-solid fa-heart");
    const $tweetButtons = $('<div>').addClass("tweet-buttons");
    $tweetButtons.append($flagIcon, $retweetIcon, $heartIcon);

    const $tweetFooter = $('<footer>').addClass("tweet-footer");

    // Adds elements to footer
    $tweetFooter.append($tweetTime, $tweetButtons);

    // Pointer to the outer-most element of a single tweeter block
    const $tweetElement = $('<article>');

    // Put all parts together
    $tweetElement.append($tweetHeader, $tweetContent, $tweetFooter);

    return $tweetElement;
  };

  // Get all tweets
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).then((tweets) => {
      // Clears all tweets displayed for reloading
      $tweetsContainer.empty();

      // Sorts the tweets by time created
      tweets.sort((a,b) => (a.created_at < b.created_at) ? 1 : ((b.created_at < a.created_at) ? -1 : 0));

      // Display the tweets with renderTweets
      renderTweets(tweets);
    });
  };

  // Handles new tweet submission
  $("#post-tweet").submit(function(event) {
    event.preventDefault();

    // Slides up previously displayed error messages (if there are any)
    $(".tweet-input-error").slideUp(100);

    // Get the length of the input
    const tweetLength = $("#tweet-text").val().length;

    // Handles input errors
    // Empty tweet
    if (tweetLength === 0) {
      $(".tweet-input-error.empty").slideDown(250);

    // Too long tweet
    } else if (tweetLength > 140) {
      $(".tweet-input-error.too-long").slideDown(250);

    // Normal case
    } else {
      const formData = $(this).serialize();
      this.reset();
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: formData
      }).then(() => {
        // Reload all tweets
        loadTweets();
      });
    }
  });

  // Load all tweets
  loadTweets();

});