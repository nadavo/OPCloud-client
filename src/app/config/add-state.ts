import {basicDefinitions} from "./basicDefinitions";
const joint = require('rappid');
const _ = require('lodash');

export function addState (evt, x, y) {

  var options = this.options;

  //this.startBatch();


  var fatherObject = options.cellView.model;

  var defaultState = new joint.shapes.opm.StateNorm(basicDefinitions.defineState(x,y));

  fatherObject.embed(defaultState);     //makes the state stay in the bounds of the object

  options.graph.addCells([fatherObject, defaultState]);

  //Function is triggered when changing the size of a state. It is not allowed to resize it to exceed the object.
  options.graph.on('change:size', function (cell) {
    var parentId = cell.get('parent');
    if (!parentId) return;

    var parent = options.graph.getCell(parentId); // The object that contains the state
    var parentBbox = parent.getBBox();            //The box of the object
    var cellBbox = cell.getBBox();                //The box of the state

    //If there is a corner of the state outside of the object
    if (!parentBbox.containsPoint(cellBbox.origin()) || !parentBbox.containsPoint(cellBbox.topRight()) ||
        !parentBbox.containsPoint(cellBbox.corner()) || !parentBbox.containsPoint(cellBbox.bottomLeft())) {
      cell.set('size', cell.previous('size'));      // Revert the child size
    }
  });

  //Function is triggered when changing the size of an object. It is not allowed to resize it so that one of the
  //contained states will exceed the object
  options.graph.on('change:size', function(cell, newPosition, opt) {
    if (opt.skipParentHandler) return;

    //Occures only if the object contains atleast one state
    if (cell.get('embeds') && cell.get('embeds').length) {
      //Store object's original size to a special property so that we can shrink it back when changing state's position
      cell.set('originalSize', cell.get('size'));

      //The box of the object
      var cellBbox = cell.getBBox();
      var childIds = cell.get('embeds');
      if (!childIds) return;

      for(var i=0; i<childIds.length; i++)
      {
        var child = options.graph.getCell(childIds[i]);
        var childBbox = child.getBBox();
        if (!cellBbox.containsPoint(childBbox.origin()) ||
          !cellBbox.containsPoint(childBbox.topRight()) ||
          !cellBbox.containsPoint(childBbox.corner()) ||
          !cellBbox.containsPoint(childBbox.bottomLeft())) {
          // One of the four corners of the child is not inside the parent area.
          // Revert the child position.
          cell.set('size', cell.previous('size'));
        }
      }
    }
  });

  //Function is triggered when changing the position of a state. It is not allowed to exceed the object.
  options.graph.on('change:position', function(cell, newPosition, opt) {
    if (opt.skipParentHandler) return;

    if (cell.get('embeds') && cell.get('embeds').length) {
      // If we're manipulating a parent element, let's store
      // it's original position to a special property so that
      // we can shrink the parent element back while manipulating
      // its children.
      cell.set('originalPosition', cell.get('position'));
    }

    var parentId = cell.get('parent'); //The id of the object
    if (!parentId) return;

    var parent = options.graph.getCell(parentId); //The object that contains the state
    var parentBbox = parent.getBBox();

    //Update the original size and position values of the object if it is empty
    if (!parent.get('originalPosition')) parent.set('originalPosition', parent.get('position'));
    if (!parent.get('originalSize')) parent.set('originalSize', parent.get('size'));

    var originalPosition = parent.get('originalPosition');
    var originalSize = parent.get('originalSize');

    var newX = originalPosition.x;
    var newY = originalPosition.y;
    var newCornerX = originalPosition.x + originalSize.width;
    var newCornerY = originalPosition.y + originalSize.height;

    //For each state in the object, if its position exceeds the object, then the object gets bigger to contain that state
    _.each(parent.getEmbeddedCells(), function(child) {

      var childBbox = child.getBBox();

      if (childBbox.x < newX) { newX = childBbox.x; }
      if (childBbox.y < newY) { newY = childBbox.y; }
      if (childBbox.corner().x > newCornerX) { newCornerX = childBbox.corner().x; }
      if (childBbox.corner().y > newCornerY) { newCornerY = childBbox.corner().y; }
    });

    // Note that we also pass a flag so that we know we shouldn't adjust the
    // `originalPosition` and `originalSize` in our handlers as a reaction
    // on the following `set()` call.
    parent.set({
      position: { x: newX, y: newY },
      size: { width: newCornerX - newX, height: newCornerY - newY }
    }, { skipParentHandler: true });
  });
}
