// this file extract tex expression in <img> tag, and insert back to original
// places rounded with tex context. And then Mathjax will render these equations.

function isTexImage(object) {
    var src = $(object).attr("src")
    return (src != undefined && src.startsWith("//zhihu.com/equation"))
}

function imgToTex() {
  var images = $('img');
  //var images = document.getElementsByTagName('img');

  var texImages = []
  var l = images.length;
  for (var i = 0; i < l; i++) {
    var object = images[i];
    if (isTexImage(object)) {
      texImages.push(object);
    }
  }

  texImages.forEach(function(object) {
    var tex = $(object).attr("alt")
    if (tex == undefined) {
      return;
    }
    if (tex.indexOf('=') > -1 && tex.length > 4 ) {
      // if contains '=', we put it in its own line
      for (var i = 0; i < 2; i++) {
        if (object.previousSibling.tagName == 'BR') {
          $(object.previousSibling).remove()
        }
        if (object.nextSibling.tagName == 'BR') {
          $(object.nextSibling).remove()
        }
      }
      $(object).replaceWith( " \\[" + tex + "\\] ")
    } else {
      // or just inline
      $(object).replaceWith( " \\(" + tex + "\\) ")
    }
  });

}

$(document).ready(function(){
  // change!
  imgToTex()
  // config mathjax
  var head = document.getElementsByTagName('head')[0];
  var js = document.createElement('script');
  js.setAttribute('type', 'text/x-mathjax-config');
  js.innerHTML = "MathJax.Hub.Config({SVG: { scale: 95 , linebreaks:{automatic: true}}  });";
  head.appendChild(js);
  // use mathjax
  var math_jax_src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_SVG";
  $.getScript(math_jax_src)
})
