requirejs.config({
    paths: {
      jquery: "https://code.jquery.com/jquery-3.5.1.slim.min",
      popper: "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min",
      bootstrap:"https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min"
    },
    shim : {
      'bootstrap': ['jquery','popper']
    }
  });

  require(['jquery'],x=>{
    loadCss(url);
  })
  var url="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css";
//   require(['bootstrap'],(b)=>{
//       console.log('bootstrap loaded!');
//   }); 
  
  function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}
  require(['popper'],function(p){
    window.Popper = p;
    require(["app/main"],function(app){
      window.mainApp = app;
    });
  }); 
// Start loading the main app file.
requirejs(['app/main']);