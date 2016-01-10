// this file extract tex expression in <img> tag, and insert back to original
// places rounded with tex context. And then Mathjax will render these equations.

function removeNode(object) {
    if (object != undefined) {
       object.parentNode.removeChild(object);
    }
}
function myLog(string) {
    console.log(string)
}

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
    $(object).replaceWith( " \\(" + tex + "\\) ")
  });

}

$(document).ready(function(){
  // change!
  imgToTex()
  // use mathjax
  var math_jax_src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_SVG";
  $.getScript(math_jax_src)
})
