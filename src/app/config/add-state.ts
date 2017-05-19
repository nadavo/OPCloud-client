import {basicDefinitions} from "./basicDefinitions";
import * as common from "../common/commonFunctions";
const joint = require('rappid');

export function addState () {

  var options = this.options;
  //this.startBatch();
  var fatherObject = options.cellView.model;
  var defaultState = new joint.shapes.opm.StateNorm(basicDefinitions.defineState());
  fatherObject.embed(defaultState);     //makes the state stay in the bounds of the object
  options.graph.addCells([fatherObject, defaultState]);

  //Placing the new state. By default it is outside the object.
  var xNewState = fatherObject.getBBox().center().x - basicDefinitions.stateWidth/2;
  var yNewState = fatherObject.getBBox().y + fatherObject.getBBox().height - basicDefinitions.stateHeight - common.paddingObject;
  if (fatherObject.get('embeds') && fatherObject.get('embeds').length){
    common._.each(fatherObject.getEmbeddedCells(), function(child) {
      if (!fatherObject.getBBox().containsPoint(child.getBBox().origin()) ||
          !fatherObject.getBBox().containsPoint(child.getBBox().topRight()) ||
          !fatherObject.getBBox().containsPoint(child.getBBox().corner()) ||
          !fatherObject.getBBox().containsPoint(child.getBBox().bottomLeft())) {
        child.set({position: {x: xNewState, y: yNewState}});
      }
    });
  }

  options.graph.on('change:position change:size', function(cell) {
    cell.set('originalSize', cell.get('size'));
    cell.set('originalPosition', cell.get('position'));

    var parentId = cell.get('parent');
    if (parentId){
      var parent = options.graph.getCell(parentId);
      if (!parent.get('originalPosition')) parent.set('originalPosition', parent.get('position'));
      if (!parent.get('originalSize')) parent.set('originalSize', parent.get('size'));
      common.CommonFunctions.updateObjectSize(parent);
    }
    else if (cell.get('embeds') && cell.get('embeds').length){
      common.CommonFunctions.updateObjectSize(cell);
    }
  });
}
