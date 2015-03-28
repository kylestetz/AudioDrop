document.addEventListener("DOMContentLoaded", function(event) {

  AudioDrop({
    context: new AudioContext(),
    elements: window.document.body,
    callback: function(buffer, file) {
      var name = file.name.replace(/\.[^/.]+$/, "");
      if( AudioDrop.isValidVariableName(name) ) {
        window[name] = buffer;
        console.log('Added the variable "' + name + '"" to the window.');
      } else {
        window[name + '-sample'] = buffer;
        console.log('Added the variable window["' + name + '-sample"] to the window.');
      }
    }
  });

});