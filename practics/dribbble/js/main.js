var dribblesTemplateEl = document.getElementById("dribbles");
var dribblesTemplateSource = dribblesTemplateEl.innerHTML;

Handlebars.registerHelper("formatNumber", function (number){
 var tmp = (number + "").split("").reverse();

 return tmp.map(function(el, i){
  if (((i+1) % 3) == 0 && i+1 != tmp.length) {
   return "," + el;
  }
  return el;
 }).reverse().join("");

});

var dribblesTemplate = Handlebars.compile(dribblesTemplateSource);



var HTMLSource = dribblesTemplate(data);

var result = document.createElement("div");
result.innerHTML = HTMLSource;

dribblesTemplateEl.parentNode.replaceChild(result, dribblesTemplateEl);


