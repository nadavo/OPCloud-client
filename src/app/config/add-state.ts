import {basicDefinitions} from "./basicDefinitions";
const joint = require('rappid');
const _ = require('lodash');

//Return true if the object contains a state which exceeds it (with a padding of 15p)
function updateObject(fatherCell){
  var leftSideX = fatherCell.get('originalPosition').x;
  var topSideY = fatherCell.get('originalPosition').y;
  var rightSideX = fatherCell.get('originalPosition').x + fatherCell.get('originalSize').width;
  var bottomSideY = fatherCell.get('originalPosition').y + fatherCell.get('originalSize').height;

  _.each(fatherCell.getEmbeddedCells(), function(child) {
    var childBbox = child.getBBox();
    //Updating the new size of the object to have margins of at least 15p so that the state will not touch the object
    if (childBbox.x <= (leftSideX+15)) { leftSideX = childBbox.x-15; }
    if (childBbox.y <= (topSideY+15)) { topSideY = childBbox.y-15; }
    if (childBbox.corner().x >= rightSideX-15) { rightSideX = childBbox.corner().x+15; }
    if (childBbox.corner().y >= bottomSideY-15) { bottomSideY = childBbox.corner().y+15; }
  });
  fatherCell.set({
    position: { x: leftSideX, y: topSideY },
    size: { width: rightSideX - leftSideX, height: bottomSideY - topSideY }});
}

export function addState (evt, x, y) {

  var options = this.options;

  //this.startBatch();


  var fatherObject = options.cellView.model;

  var defaultState = new joint.shapes.opm.StateNorm(basicDefinitions.defineState(x,y));

  fatherObject.embed(defaultState);     //makes the state stay in the bounds of the object

  options.graph.addCells([fatherObject, defaultState]);


  options.graph.on('change:position change:size', function(cell) {
    cell.set('originalSize', cell.get('size'));
    cell.set('originalPosition', cell.get('position'));
    var parentId = cell.get('parent');
    if (!parentId) return;

    var parent = options.graph.getCell(parentId);
    if (!parent.get('originalPosition')) parent.set('originalPosition', parent.get('position'));
    if (!parent.get('originalSize')) parent.set('originalSize', parent.get('size'));
    updateObject(parent);
  });

  //Function is triggered when changing the size of an object. It is not allowed to resize it so that one of the
  //contained states will exceed the object
  options.graph.on('change:position change:size', function(cell) {
    //Occures only if the object contains atleast one state
    if (cell.get('embeds') && cell.get('embeds').length) {
      //Store object's original size to a special property so that we can shrink it back when changing state's position
      cell.set('originalSize', cell.get('size'));
      cell.set('originalPosition', cell.get('position'));
    }
    else
      return;
    updateObject(cell);
   });
}
