/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(() => {
  const $tweetsContainer = $('#all-tweets');

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweet of tweets) {
      $tweetsContainer.append(createTweetElement(tweet));
    }
  };

  const createTweetElement = (tweet) => {
    const $avatar = $('<img>').attr("src", tweet.user.avatars);
    const $fullname = $('<span>').text(tweet.user.name).addClass("tweet-fullname");
    const $tweetAvatarDiv = $('<div>').addClass("tweet-avatar-name");
    $tweetAvatarDiv.append($avatar, $fullname);

    const $username = $('<span>').text(tweet.user.handle).addClass("tweet-username");
    const $tweetHeader = $('<header>').addClass("tweet-header");
    $tweetHeader.append($tweetAvatarDiv, $username);

    const $tweetContent = $('<div>').text(tweet.content.text).addClass("tweet-content");

    const $tweetTime = $('<span>').text(timeago.format(tweet.created_at)).addClass("tweet-time");

    const $flagIcon = $('<i>').addClass("fa-solid fa-flag");
    const $retweetIcon = $('<i>').addClass("fa-solid fa-retweet");
    const $heartIcon = $('<i>').addClass("fa-solid fa-heart");
    const $tweetButtons = $('<div>').addClass("tweet-buttons");
    $tweetButtons.append($flagIcon, $retweetIcon, $heartIcon);

    const $tweetFooter = $('<footer>').addClass("tweet-footer");
    $tweetFooter.append($tweetTime, $tweetButtons);

    const $tweetElement = $('<article>');

    $tweetElement.append($tweetHeader, $tweetContent, $tweetFooter);

    return $tweetElement;
  };

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).then((tweets) => {
      $tweetsContainer.empty();
      tweets.sort((a,b) => (a.created_at < b.created_at) ? 1 : ((b.created_at < a.created_at) ? -1 : 0));
      renderTweets(tweets);
    });
  };

  $("#post-tweet").submit(function(event) {
    event.preventDefault();
    $(".tweet-input-error").slideUp(100);
    const tweetLength = $("#tweet-text").val().length;
    if (tweetLength === 0) {
      $(".tweet-input-error.empty").slideDown(250);
    } else if (tweetLength > 140) {
      $(".tweet-input-error.too-long").slideDown(250);
    } else {
      const formData = $(this).serialize();
      this.reset();
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: formData
      }).then(() => {
        loadTweets();
      });
    }
  });

  loadTweets();

});