// Array of colors
const colors = [
  "rgb(128, 0, 128)", // "purple"
  "rgb(255, 165, 0)", // "orange",
  "rgb(119, 136, 153)", // "LightSlateGrey",
  "rgb(85, 107, 47)", // "DarkOliveGreen",
  "rgb(60, 179, 113)", //"MediumSeaGreen",
  "rgb(106, 90, 205)", // "SlateBlue",
  "rgb(255, 20, 147)", // "DeepPink",
  "rgb(75, 0, 130)", // "Indigo",
  "rgb(100, 149, 237)", //"CornflowerBlue",
  "rgb(220, 20, 60)" //"Crimson"
];


$(document).ready(function() {
     
  getColor();
  getQuote();
  
  $("#new-quote").click(function() { 
    getColor();
    getQuote();
  });
  
}); // end of document.ready


function getColor() {
  
  // get the current color
  const currentColor = $('body').css('background-color');
  
  // generate a random number to pick that color from the array of colors BUT check that it's different from the current one
  let color = "";
  do {
    // generate a random number to pick the color at that index
    const colorIndex = 1 + Math.floor(Math.random() * colors.length);
  
    // select the color at that index (minus 1 to stay in range of the array)
    color = colors[colorIndex - 1];
  }
  while (color == currentColor);
  
  // Apply the selected color to elements
  $('body').animate({'background-color': color}, 1000);
  $('#quote-box').animate({'color': color}, 1000);
  $('#tweet-quote').animate({'background-color': color}, 1000);
  $('#new-quote').animate({'background-color': color}, 1000);
}


function getQuote() {
  
  // get the current quote
  // trim is used to remove the extra space at the beggining of the string
  const currentQuote = $('#text').text().trim();  
  // get the quotes
  $.getJSON("https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json", function(result){
    const jsonQuotes = result;
    
    // pick a random quote
    const quoteIndex = 1 + Math.floor(Math.random() * jsonQuotes["quotes"].length);
    const quote = jsonQuotes["quotes"][quoteIndex - 1];
    
    // fill the card with the quote and the author
    // checking if it's first load or not  
    if(currentQuote == '') {
      $('#text').html('<i class="fas fa-quote-left"></i>&nbsp' + quote["quote"]);
      $('#text').fadeIn();

      $('#author').text('- ' + quote["author"]);
      $('#author').fadeIn();
    }
    else {
      
      $('#text').animate({opacity: 0}, 500, function () {
        $('#text').html('<i class="fas fa-quote-left"></i>&nbsp' + quote["quote"]);
        $('#text').animate({opacity: 1}, 500);
      });
      
      $('#author').animate({opacity: 0}, 500, function () {
        $('#author').text('- ' + quote["author"]);
        $('#author').animate({opacity: 1}, 500);
      });
      
    }

    // configure the twtitter button
    $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + quote["quote"] + '" - ' + quote["author"]))
  });
  
}
