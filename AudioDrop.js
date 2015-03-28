function AudioDrop(options) {
  var self = this;

  var elements = [],
      callback = null,
      recurse  = true,
      dragging = false
  ;

  if(!options.context) {
    return console.error('Please supply AudioDrop with a `context` option.');
  }
  if(!options.elements) {
    return console.error('Please supply AudioDrop with an `elements` option.');
  }
  if(!options.callback) {
    return console.error('Please supply AudioDrop with a `callback` option.');
  }

  if(!Array.isArray(options.elements)) {
    options.elements = [options.elements];
  }

  // ==========================================
  // Event Binding
  // ==========================================

  // create events for each element passed in
  options.elements.forEach( function(element) {
    element.addEventListener('dragover', dragOver, false);
    element.addEventListener('dragend', dragEnd, false);
    element.addEventListener('drop', drop, false);
  });

  // ==========================================
  // Events
  // ==========================================

  function drop(e) {
    e.stopPropagation();
    e.preventDefault();
    // turn off global dragging flag
    dragging = false;
    // start looping to find audio files & folders
    var droppedFiles = Array.prototype.slice.call(e.dataTransfer.files);
    droppedFiles.forEach( function(file) {
      if(isSupportedFormat(file.type)) {
        decodeBuffer(file);
      }
    });
    return false;
  }

  function dragOver(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function dragEnd(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  // ==========================================
  // Audio
  // ==========================================

  function decodeBuffer(file) {
    var fileReader = new FileReader();

    fileReader.onload = function(fileEvent) {
      var data = fileEvent.target.result;
      options.context.decodeAudioData(data, function(buffer) {
        options.callback(buffer, file);
      }, function(e) {
        console.error('There was an error decoding ' + file.name);
      });
    };

    fileReader.readAsArrayBuffer(file);
  }

  function isSupportedFormat(type) {
    return type.indexOf('audio') > -1;
  }
}

AudioDrop.isValidVariableName = function(str) {
  return !str.match(/^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|null|this|true|void|with|break|catch|class|const|false|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof|undefined)$/);
};