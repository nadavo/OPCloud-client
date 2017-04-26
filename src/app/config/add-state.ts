import {basicDefinitions} from "./basicDefinitions";
const joint = require('rappid');

export function addState (evt, x, y) {

  var options = this.options;

  //this.startBatch();


  var fatherObject = options.cellView.model;

  var defaultState = new joint.shapes.opm.StateNorm(basicDefinitions.defineState(x,y));

  fatherObject.embed(defaultState);     //makes the state stay in the bounds of the object

  options.graph.addCells([fatherObject, defaultState]);

  //Function is triggered when changing the position or the size of the state. It is not allowed to move it out of the object.
  options.graph.on('change:position  change:size', function (cell) {

    var parentId = cell.get('parent');
    if (!parentId) return;

    var parent = options.graph.getCell(parentId);
    var parentBbox = parent.getBBox();
    var cellBbox = cell.getBBox();

    if (parentBbox.containsPoint(cellBbox.origin()) &&
      parentBbox.containsPoint(cellBbox.topRight()) &&
      parentBbox.containsPoint(cellBbox.corner()) &&
      parentBbox.containsPoint(cellBbox.bottomLeft())) {

      // All the four corners of the child are inside
      // the parent area.
      return;
    }
    // Revert the child position.
    cell.set('position', cell.previous('position'));
    cell.set('size', cell.previous('size'));
  });
}
