/* TODO 
Define Retweet Button on Click and update Retweet button and count. done!
update makeTweets to show if a tweet is a retweet. done!
Define Reply Button on Click and update UI (add new tweet of type retweet and prepend to screen?). Done!
Update makeTweets to show if a tweet is a reply. Done!
Define edit tweet on click and update UI (change tweet body on server. CHange.text of #bodyid);
update makeTweets to show if a tweet has been edited?
Define delete tweet on click and update UI (remove id from screen)
*/
let isRetweetGlobal = false;
let isReplyGlobal = false;
let isEditGlobal = false;
$(function() {
  const $form = $('#login-form');
  const $message = $('#message');

  $form.submit(function(e) {
    e.preventDefault();

    $message.html('');

    const data = $form.serializeArray().reduce((o, x) => {
      o[x.name] = x.value;
      return o;
    }, {});
    
    $.ajax({
      url: 'https://comp426fa19.cs.unc.edu/sessions/login', //'https://comp426fa19.cs.unc.edu/sessions/login',
      type: 'POST',
      data,
      xhrFields: {
          withCredentials: true,
      },
    }).then(() => {
      $message.html('<span class="has-text-success">Success! You are now logged in.</span>');
      tearDown();
      buildUp();
    }).catch(() => {
      $message.html('<span class="has-text-danger">Something went wrong and you were not logged in. Check your email and password and your internet connection.</span>');
    });
  });
});

let tearDown = () => {
  $("#login").detach();
  console.log("Tore down login form!");
}

let buildUp = async () => {
  console.log("Building Up");
  $("body").append("<section class='section has-background-black'> <div class='content has-text-centered'> <h1 class='title has-text-info is-family-secondary'>David's Twitter</h1> <button id='createNewTweetButton' class='button is-success'>Add Tweet</button> <textarea class='textarea is-success is-small' placeholder='Write Your Tweet Body Here (<280 chars)'></textarea> <button id='submitTweet' class='button is-primary'>Submit Tweet</button> </div> </section> <section class='container'></section>");
  $(".textarea").hide();
  $("#submitTweet").hide();
  let tweets = await axios({
    method: 'get',
    url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
    withCredentials: true,
  });

  console.log(tweets.data);
  console.log("tweets.length = " + tweets.data.length);
  tweets = tweets.data;

  for(let i = 0; i < tweets.length; i++) {
    // make a tween and append the tweet to the container.
    $(".container").append(makeTweet(tweets[i].author, tweets[i].id, tweets[i].body, tweets[i].likeCount, tweets[i].retweetCount, tweets[i].isMine, tweets[i].isLiked));
  }


  // define click handlers:
  defineClickHandlers();
}

let makeTweet = (name, id, body, likeCount, retweetCount, isUsers, isLiked, tweetData) => {
  let parentTweet = "";
  if(tweetData != undefined) {
    if(tweetData.type == "reply") {
      parentTweet = "<h6>Replying to: @" + tweetData.parent.author + ", @" + tweetData.parent.author + " said: " + tweetData.parent.body + "</h6>";
    } else if(tweetData.type == "retweet") {
      parentTweet = "<h6>@" + tweetData.parent.author + " said: " + tweetData.parent.body + "</h6>";
    }
  }
  
  let tweetString = "";
  let likeButtonText = "Like Button";
  if(isLiked){
    likeButtonText = "LIKED";
  }
  tweetString = "<div id ='" + id +"' class='notification is-danger'> <h5 class='title has-text-weight-bold'>" + name + "</h5> <h5 id='body" + id + "' class='subtitle has-text-white has-text-weight-bold'>"+ parentTweet + body + "</h5> <div class='tabs is-medium is-centered'> <ul> <li><button id='likeButton" + id + "' class='button is-dark likeButton'>" + likeButtonText +"</button></li> <li><div id='likeCount" + id + "'>" + likeCount + " Likes</div></li>  <li><button id='retweetButton" + id + "'class='button is-black retweetButton'>Retweet Button</button></li> </li><li><div id='retweetCount" + id + "'>" + retweetCount + " Retweets</div></li> <li><button id='replyButton" + id + "' class='button is-link replyButton'>Reply Button</button>";
  if(isUsers) {
    tweetString+= "<li><button id='editTweetButton" + id + "' class='button editTweetButton'>Edit Tweet</button></li>  <li><button id='deleteTweetButton" + id + "' class='button is-warning deleteTweetButton'>Delete Tweet</button></li>"
  }
  tweetString+="</ul> </div> </div>"

  return tweetString;
  
};

let addTweet = async (textOfTweet, parentID) => {
  // add a new tweet to the server and render the returned tweet on the screen.
  let tweet;
  

  if(!isRetweetGlobal && !isReplyGlobal && !isEditGlobal) {
    console.log("tweet is normal new tweet");
    tweet = await axios({
      method: 'post',
      url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
      withCredentials: true,
      data: {
        body: "" + textOfTweet
      },
    });

    $(".container").prepend(makeTweet(tweet.data.author, tweet.data.id, tweet.data.body, tweet.data.likeCount, tweet.data.retweetCount, tweet.data.isMine, tweet.data.isLiked));
    
  }  

  if(isEditGlobal) {
    // Edit Tweet
    console.log("Tweet is an editTweet");
    tweet = await axios({
      method: 'put',
      url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + parentID,
      withCredentials: true,
      data: {
        body: "" + textOfTweet
      },
    });

    $("#" + parentID).remove();

    $(".container").prepend(makeTweet(tweet.data.author, tweet.data.id, tweet.data.body, tweet.data.likeCount, tweet.data.retweetCount, tweet.data.isMine, tweet.data.isLiked, tweet.data));

  }

  if(isRetweetGlobal) {
    console.log("Tweet is a retweet!");
    tweet = await axios({
      method: 'post',
      url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
      withCredentials: true,
      data: {
        "type": "retweet",
        "parent": parentID,
        "body": "" + textOfTweet
      },
    });

    $(".container").prepend(makeTweet(tweet.data.author, tweet.data.id, tweet.data.body, tweet.data.likeCount, tweet.data.retweetCount, tweet.data.isMine, tweet.data.isLiked, tweet.data));
    let retweetCount = tweet.data.parent.retweetCount;

    // retweetCount++;
    $("#retweetCount" + tweet.data.parent.id).text("" + retweetCount + " Retweets");
  }

  if(isReplyGlobal) {
    console.log("Tweet is a reply!");
    tweet = await axios({
      method: 'post',
      url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
      withCredentials: true,
      data: {
        "type": "reply",
        "parent": parentID,
        "body": "" + textOfTweet
      },
    });

    $(".container").prepend(makeTweet(tweet.data.author, tweet.data.id, tweet.data.body, tweet.data.likeCount, tweet.data.retweetCount, tweet.data.isMine, tweet.data.isLiked, tweet.data));
    isReplyGlobal = false;
    isRetweetGlobal = false;
    isEditGlobal = false;
  }
  


  // defineClickHandlers();


}

// on click handlers:
let defineClickHandlers = () => {
  $("body").on("click","#createNewTweetButton", () => {
    // function body:
    isReplyGlobal = false;
    isRetweetGlobal = false;
    isEditGlobal = false;
    console.log("Create Button Clicked.")
    $(".textarea").show();
  $("#submitTweet").show();
    
  });

  $("body").on("click","#submitTweet",  async () => {
    // get input from text area. Call addTweet with that data. Display tweet. Hide text area and submit tweet
    let dataFromInput = $(".textarea").val();
    console.log("Submit New Tweet Clicked. Tweet Body is: " + dataFromInput);
    if(dataFromInput.length > 280) {
      // tweet is too long.
      alert("Tweet is too long, cannot post Tweet! Tweet is: " + dataFromInput.length + " characters long. Tweet needs to be less than or equal to 280 characters.");
      return;
    }
    let tweet = await addTweet(dataFromInput);
    console.log("Tweet Created!");
    $(".textarea").val('');
    
    $(".textarea").hide();
  $("#submitTweet").hide();
  });

  $("body").on("click",".retweetButton", async (e) => {
    isRetweetGlobal = true;
    isReplyGlobal = false;
    isEditGlobal = false;
    let tweetID = e.target.parentNode.parentNode.parentNode.parentNode.id;
    console.log("Retweet Button Clicked. Tweet ID = " + tweetID);

    //open up dialog to retweet:
    $("#"+tweetID).append("<textarea id='inputBox'class='textarea is-success is-small retweetTextArea' placeholder='Write Your Tweet Body Here (<280 chars)'></textarea> <button id='submitInputButton' class='button is-primary'>Submit Tweet</button>")
    // <textarea class='textarea is-success is-small' placeholder='Write Your Tweet Body Here (<280 chars)'></textarea>
    // <button id='retweetTweet' class='button is-primary'>Submit Tweet</button>
    // defineClickHandlers();
    

  });
  $("body").on("click",".replyButton", async (e) => {
    isRetweetGlobal = false;
    isReplyGlobal = true;
    isEditGlobal = false;
    let tweetID = e.target.parentNode.parentNode.parentNode.parentNode.id;
    console.log("Retweet Button Clicked. Tweet ID = " + tweetID);

    //open up dialog to retweet:
    $("#"+tweetID).append("<textarea id='inputBox'class='textarea is-success is-small retweetTextArea' placeholder='Write Your Tweet Body Here (<280 chars)'></textarea> <button id='submitInputButton' class='button is-primary'>Submit Tweet</button>")
    // <textarea class='textarea is-success is-small' placeholder='Write Your Tweet Body Here (<280 chars)'></textarea>
    // <button id='retweetTweet' class='button is-primary'>Submit Tweet</button>
    // defineClickHandlers();
    

  });

  $("body").on("click",".deleteTweetButton", async (e) => {
    isRetweetGlobal = false;
    isReplyGlobal = false;
    isEditGlobal = false;
    let tweetID = e.target.parentNode.parentNode.parentNode.parentNode.id;
    console.log("Delete Button Clicked. Tweet ID = " + tweetID);

    let tweet = await axios({
      method: 'delete',
      url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + tweetID,
      withCredentials: true,
    });

    $("#" + tweetID).remove();

    return;
    

  });

  $("body").on("click",".editTweetButton", async (e) => {
    isRetweetGlobal = false;
    isReplyGlobal = false;
    isEditGlobal = true;
    let tweetID = e.target.parentNode.parentNode.parentNode.parentNode.id;
    console.log("Edit Button Clicked. Tweet ID = " + tweetID);

    let tweet = await axios({
      method: 'get',
      url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + tweetID,
      withCredentials: true,
    });

    //open up dialog to retweet:
    $("#"+tweetID).append("<textarea id='inputBox'class='textarea is-success is-small retweetTextArea' placeholder='Write Your Tweet Body Here (<280 chars)'>" + tweet.data.body+ "</textarea> <button id='submitInputButton' class='button is-primary'>Submit Tweet</button>")
    // <textarea class='textarea is-success is-small' placeholder='Write Your Tweet Body Here (<280 chars)'></textarea>
    // <button id='retweetTweet' class='button is-primary'>Submit Tweet</button>
    // defineClickHandlers();
    

  });

  $("body").on("click","#submitInputButton", async (e) => {
    // get input from text area. Call addTweet with that data. Display tweet. Hide text area and submit tweet
    
    let dataFromInput = $("#inputBox").val();
    console.log("Data from input is: "+ dataFromInput);
    let tweetID = e.target.parentNode.id;
    console.log("submitInputButton clicked, id is: " + tweetID);
    if(dataFromInput.length > 280) {
      // tweet is too long.
      alert("Tweet is too long, cannot post Tweet! Tweet is: " + dataFromInput.length + " characters long. Tweet needs to be less than or equal to 280 characters.");
      return;
    }
    let tweet = await addTweet(dataFromInput, tweetID);
    
    console.log("Tweet Created!");
    $(".textarea").val('');
    
    $("#inputBox").remove();
    $("#submitInputButton").remove();

    
  });

  $("body").on("click",".likeButton", async (e) => {
    let tweetID = e.target.parentNode.parentNode.parentNode.parentNode.id;
    console.log("Like Button Clicked. Tweet ID = " + tweetID);
    // check if tweet is liked or not:
    let tweet = await axios({
      method: 'get',
      url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + tweetID,
      withCredentials: true,
    });

    let likeCount = tweet.data.likeCount;


    if(!tweet.data.isLiked) {
      console.log("This tweet is unliked by us. We are liking it now. ")
      let like = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + tweetID + '/like',
        withCredentials: true,
      });
      $("#likeButton" + tweetID).text("LIKED");
      likeCount++;
      $("#likeCount" + tweetID).text("" + likeCount + " Likes");
      // get value of like count. Update that. Need to make the number it's own div or br tag?
    } else {
      // unlike
      console.log("We have liked this tweet. Unliking it now.");
      let unLike = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + tweetID + '/unlike',
        withCredentials: true,
      });

      $("#likeButton" + tweetID).text("Like Button");
      likeCount--;
      $("#likeCount" + tweetID).text("" + likeCount + " Likes");

    }
    
  });

  

  

} // end of click handlers
