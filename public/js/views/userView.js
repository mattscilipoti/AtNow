// code is not DRY, need to refactor methods in this object
var userView = {

  // need function where if upvoted clicked or downvote, object is added to user
  currentUser: {},

  currentUserVotesArray: [],
  // maybe something that toggles login
  showLogin: function(){
    $(".login").on("click", function(){
      $("form").toggle();
      $('form').attr('action', '/login');
      $("h2").html("Log In");
    });
  },
  showSignup: function(){
    $(".signup").on("click", function(){
      $("form").toggle();
      $("h2").html("Sign Up");
      $('form').attr('action', '/signup');
    });
  },
  logOut: function(){
    $(".logout").on("click", function(){
      $('form').attr('action', '#');
      User.logOut();
      $(".allvotesdiv").empty();
    });
  },
  submitForm: function(){
    var self = this;
    $("form").submit(function(evt){
      if($('form').attr('action') == '/signup'){
        User.post();
      }
      else if($('form').attr('action') == '/login'){
        User.postLogin();
      }
      evt.preventDefault();
      self.userVotes();
      $("form").css("display", "none");
    });
  },
  toggleLoginDisplays: function(){
    $(".login").toggle();
    $(".signup").toggle();
  },
  toggleLogoutDisplays: function(){
    $(".logout").toggle();
  },
  userVotes: function(){
    var self = this;
    self.currentUser = currentUser;
    console.log(jQuery.isEmptyObject(currentUser));
    if(jQuery.isEmptyObject(currentUser)){
      var user = User.fetch().then(function(user){
        currentUser = user;
      });
    }
  },
  clickAccountInfo: function(){
    var self = this;
    var account = $(".account");
    var allvotesdiv = $(".allvotesdiv");
    account.on("click", function(){
      console.log('clicked account');
      if(allvotesdiv.children().length > 0){
        allvotesdiv.toggle();
      }
      else{
        allvotesdiv.show();
        userView.userVotes();
        self.allVotesdiv();
      }
    });
  },
  allVotesdiv: function(){
    var self = this;
    if(!jQuery.isEmptyObject(currentUser)){
      if(currentUser.hasOwnProperty("twitter")){
        self.grabTwitterUserVotesInfo();
      }
      else{
        self.grabLocalUserVotesInfo();
      }
    }
  },
  grabTwitterUserVotesInfo: function(){
    var self = this;
    var username = currentUser.twitter.displayName;
    self.grabUserVotes(username);
  },
  grabUserVotes:function(emailOrUserName){
    var self = this;
    self.currentUserVotesArray = currentUser.votes;
    var votesTotal = self.currentUserVotesArray.length;
    self.appendUserInformation(votesTotal, emailOrUserName);
    if(votesTotal > 0){
      var sortedVotes = userView.currentUserVotesArray.sort(userView.sortFunction);
      userView.addVotesToUserInfo(sortedVotes);
    }
  },
  grabLocalUserVotesInfo: function(){
    var self = this;
    var email = currentUser.local.email;
    self.grabUserVotes(email);
  },
  appendUserInformation: function(votesTotal, emailOrUserName){
    var allvotesdiv = $(".allvotesdiv");
    allvotesdiv.css("display", "inline");
    var showEmailOrUsername = $("<h3>Account: " + emailOrUserName + "</h3>");
    var showVotes = $("<h4>Total Votes: " + votesTotal +"</h4>");
    allvotesdiv.append(showEmailOrUsername);
    showEmailOrUsername.append(showVotes);
    allvotesdiv.append("<h4>UpVotes:</h4>");
  },
  addVotesToUserInfo: function(sortedVotes){
    var allvotesdiv = $(".allvotesdiv");
    for(var i = 0; i < sortedVotes.length; i++){
      // if(sortedVotes[i].vote){
      var formattedTime = moment(sortedVotes[i].createdAt).format("MMM Do YYYY");
      var voteType = sortedVotes[i].vote ? 'upvote' : 'downvote';
      var dates = $("<p>" + formattedTime + " - " + sortedVotes[i].name + ' - ' + voteType + "</p>");
      allvotesdiv.append(dates);
      // }
    }
  },
  sortFunction: function(a,b){
    var dateA = new Date(a.createdAt).getTime();
    var dateB = new Date(b.createdAt).getTime();
    return dateA < dateB ? 1 : -1;
  }
};




// we can use something like this to check if fields have value:
// checkIfValid: function(){
//   var formDivs = $(".form-group input");
//   for(var i = 0; i < formDivs.length; i++){
//
//     if(!formDivs.eq(i).val()){
//       console.log("Your missing a field");
//       return false;
//     }
//     else{
//       console.log("true");
//       return true;
//     }
//   }
// }
