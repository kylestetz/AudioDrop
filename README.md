# AudioDrop

<img src="https://github.com/kylestetz/AudioDrop/blob/master/audiodrop.png" width="90" height="75" align="left" />

`AudioDrop` is a utility that enables drag-and-drop loading of Audio Buffers. Simply specify an element to be designated as a drop zone and provide a callback that determines how to handle the newly-created audio buffer.

*For use with the Web Audio API*: If you're looking for a general drag-and-drop utility you may want to check out [dropzone](http://www.dropzonejs.com/). Audiodrop makes use of the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) to decode audio files into [`AudioBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer) objects.

## API

#### `AudioDrop(options)`

Call `AudioDrop` with an options object. Required options are `context`, `elements`, and `drop`.

```javascript
AudioDrop({

  // the web audio context (required)
  context: myAudioContext,

  // a DOM Element or an array of DOM Elements (required)
  elements: document.querySelector('#dropzone'),

  // the callback to handle each file (required)
  drop: function(buffer, file) {
    window[file.name] = buffer;
    console.log('Added the buffer ' + file.name + ' to the window.');
  },

  // DOM Events

  // called when there is a file being dragged into the dropzone
  dragEnter: function(e) { },

  // called repeatedly while a file is being dragged on the dropzone
  dragOver: function(e) { },

  // called when there is a file being dragged out of the dropzone
  dragLeave: function(e) { },
})
```

#### `AudioDrop.isValidVariableName(String)`

A convenience function for determining whether or not a string, if turned into a variable name, would violate a reserved keyword. This is useful if you are planning to attach the variable to the `window`, as in the example below.

## Examples

#### Attach the audio buffer to the window.

```javascript
AudioDrop({
  context: new AudioContext(),
  elements: window.document.body,
  drop: function(buffer, file) {
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
```

-----------------------

`AudioDrop` was created for [`Lissajous`](https://github.com/kylestetz/lissajous).