document.addEventListener("DOMContentLoaded", function(event) {

  var context = new AudioContext();

  // ==================================================
  // SIMPLE TEST
  // ==================================================

  AudioDrop({
    context: context,
    elements: document.querySelector('#simple-test'),

    drop: function(buffer, file) {
      var name = file.name.replace(/\.[^/.]+$/, "");
      if( AudioDrop.isValidVariableName(name) ) {
        window[name] = buffer;
        console.log('simple test: Added the variable "' + name + '" to the window.');
      } else {
        window[name + '-sample'] = buffer;
        console.log('simple test: Added the variable window["' + name + '-sample"] to the window.');
      }
    },

    dragEnter: function(e) {
      console.log('simple test: dragEnter');
    },
    dragOver: function(e) {
      console.log('simple test: dragOver');
    },
    dragLeave: function(e) {
      console.log('simple test: dragLeave');
    }
  });

  // ==================================================
  // ADVANCED TEST
  // ==================================================

  var advancedDropzone = document.querySelector('#advanced-test');

  AudioDrop({
    context: context,
    elements: advancedDropzone,

    drop: function(buffer, file) {
      advancedDropzone.className = advancedDropzone.className.replace(' over', '');
      var name = file.name.replace(/\.[^/.]+$/, "");
      if( AudioDrop.isValidVariableName(name) ) {
        window[name] = buffer;
        console.log('advanced test: Added the variable "' + name + '" to the window.');
      } else {
        window[name + '-sample'] = buffer;
        console.log('advanced test: Added the variable window["' + name + '-sample"] to the window.');
      }
    },

    dragEnter: function(e) {
      advancedDropzone.className += ' over';
    },
    dragLeave: function(e) {
      advancedDropzone.className = advancedDropzone.className.replace(' over', '');
    }
  });

});