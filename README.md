# AudioDrop

`AudioDrop` is a utility that enables drag-and-drop loading of Audio Buffers. Simply specify an element to be designated as a drop zone and provide a callback that determines how to handle the newly-created audio buffer.

*For use with the Web Audio API*: If you're looking for a general drag-and-drop utility you may want to check out [dropzone](http://www.dropzonejs.com/). Audiodrop makes use of the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) to decode audio files into [`AudioBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer) objects.

### API

#### `AudioDrop(element, callback)`
#### `AudioDrop(elements, callback)`

Pass a DOM element or an array of DOM elements, and a callback. The callback takes the arguments `buffer` (the decoded `AudioBuffer`) and `file` (the original file object from the load event).

```javascript
var element = document.querySelector('#dropzone');

AudioDrop(element, function(buffer, file) {
  // buffer is an AudioBuffer
  // file is the original file object
  window[file.name] = buffer;
  console.log('Added the buffer ' + file.name + ' to the window.');
});
```

The callback is called once for each file passed in. Folders will be automatically recursed through.

#### `AudioDrop(options)`

Call `AudioDrop` with an options argument if you want to do some additional configuration.

```javascript
AudioDrop({
  // a DOM Element or an array of DOM Elements
  elements: document.querySelector('#dropzone'),
  // Recurse through subfolders (default: true)
  recurse: true,
  // the callback to handle each file
  callback: function(buffer, file) {
    window[file.name] = buffer;
    console.log('Added the buffer ' + file.name + ' to the window.');
  }
})
```

-----------------------

`AudioDrop` was created for [`Lissajous`](https://github.com/kylestetz/lissajous).