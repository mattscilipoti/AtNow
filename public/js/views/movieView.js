var MovieView = function(movie) {
  this.movie = movie;
  this.$el = $("<div class='movie movie-style'></div>");
};

MovieView.prototype = {
  render: function(){
    var self = this;
    var timeLeft = moment(self.movie.time).diff(moment(),'minutes');
    var timeClass = timeLeft > 15 ? 'green' : 'red';
    self.$el.append('<span class="' + timeClass + '">in ' + timeLeft + 'min</span>');
    self.$el.append('<span>' + self.movie.title + ' ' + moment(self.movie.time).format('h:mm A') + '</span>');
    self.$el.append('<a href="' + self.movie.url + '">' + self.movie.theater + "</a>");
    $('.movie-container').append(self.$el);
  },
};

MovieView.toggle = function(){
    $('.movie-container').toggle();
};
