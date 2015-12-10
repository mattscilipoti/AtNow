// code is not DRY, need to refactor methods in this object
var userView = {

  // need function where if upvoted clicked or downvote, object is added to user
  currentUser: {},

  currentUserVotesArray: [],
  // maybe something that toggles login
  showLogin: function(){
    $(".login").on("click", function(){
      $(".form-names").css("display", "none");
      $("form").toggle();
      $('form').attr('action', '/login');
      $("h2").html("Log In");
    });
  },
  showSignup: function(){
    $(".signup").on("click", function(){
      $(".form-names").css("display", "inline");
      $("form").toggle();
      $("h2").html("Sign Up");
      $('form').attr('action', '/signup');
    });
  },
  logOut: function(){
    $(".logout").on("click", function(){
      User.logOut();
    });
  },
  submitForm: function(){
    var self = this;
    $("form").submit(function(evt){
      if($('form').attr('action') == '/signup'){
        User.post();
      }
      else{
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
    var user = User.fetch().then(function(user){
      self.currentUser = user;
    });
  },
  clickAccountInfo: function(){
    var self = this;
    var uservotes = $(".account");
    var allvotesdiv = $(".allvotesdiv");
    uservotes.on("click", function(){
      if(allvotesdiv.children().length > 0){
        $(".allvotesdiv").empty();
        allvotesdiv.toggle();
      }
      else{
        userView.userVotes();
        self.allVotesdiv();
      }
    });
  },
  allVotesdiv: function(){
    var self = this;
    if(!jQuery.isEmptyObject(self.currentUser)){
      if(self.currentUser.hasOwnProperty("twitter")){
        self.grabTwitterUserVotesInfo();
      }
      else{
        self.grabLocalUserVotesInfo();
      }
    }
  },
  grabTwitterUserVotesInfo: function(){
    var self = this;
    var userDiv = $(".userdiv");
    var username = self.currentUser.twitter.displayName;
    self.grabUserVotes(username);
  },
  grabUserVotes:function(emailOrUserName){
    var self = this;
    self.currentUserVotesArray = self.currentUser.votes;
    var votesTotal = self.currentUserVotesArray.length;
    self.appendUserInformation(votesTotal, emailOrUserName);
    if(votesTotal > 0){
      var sortedVotes = userView.currentUserVotesArray.sort(userView.sortFunction);
      userView.addVotesToUserInfo(sortedVotes);
    }
  },
  grabLocalUserVotesInfo: function(){
    var self = this;
    var userDiv = $(".userdiv");
    var email = self.currentUser.local.email;
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
    console.log("FUNCTION BEING CALLEDDDDD");
    var allvotesdiv = $(".allvotesdiv");
    for(var i = 0; i < 10; i++){
      if(sortedVotes[i].vote){
        var dates = $("<p>" + sortedVotes[i].createdAt + ", " + sortedVotes[i].name + "</p>");
        allvotesdiv.append(dates);
      }
    }
  },
  sortFunction: function(a,b){
    console.log("SORT BEING CALLED")
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
