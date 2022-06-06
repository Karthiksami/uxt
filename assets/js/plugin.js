if(document.location.origin=='http://localhost:8080') {
	
  var url = 'http://localhost:8080/';
} else {
  var url = 'http://localhost:8080/';
}

//var url = '//ezzysales.com/reactjswidget/';
//console.log('lotest',document.location.origin);
var url = 'http://localhost:8080/';
var loadScript = function(src) {
  var tag = document.createElement('script');
  tag.async = false;
  tag.src = src;
  //document.body.appendChild(tag);
  document.getElementsByTagName("head")[0].appendChild(tag);
}

var loadStyle = function(src) {
  var tag = document.createElement('link');
  tag.rel = 'stylesheet';
  tag.type = 'text/css';
  tag.href = src;
  document.getElementsByTagName("head")[0].appendChild(tag);
}

loadStyle('//fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300;700&family=Oswald:wght@300;400;500;600;700&display=swap');
//loadStyle('//fonts.googleapis.com/css?family=Raleway:300,300i,400,400i,500,500i,600,600i,700,700i');
loadStyle('//unpkg.com/malihu-custom-scrollbar-plugin@3.1.5/jquery.mCustomScrollbar.css');
loadStyle(url+'assets/css/style.css');
loadStyle(url+'assets/css/slick.css');
loadStyle(url+'assets/css/swiper-bundle.css');
loadStyle('//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css');
loadScript('//cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js');
loadScript('//unpkg.com/malihu-custom-scrollbar-plugin@3.1.5/jquery.mCustomScrollbar.js');

if(document.location.origin !='http://localhost:8080') {
	loadScript(url+'assets/js/main.js');
}


