import {basicDefinitions} from "./basicDefinitions";
import * as common from "../common/commonFunctions";
import {gridLayout} from "./gridLayout"
const joint = require('rappid');
let objectChangedSize = false;

function saveValues(cell, parent){
  cell.set('originalSize', cell.get('size'));
  cell.set('originalPosition', cell.get('position'));
  if (parent){
    if (!parent.get('originalPosition')) parent.set('originalPosition', parent.get('position'));
    if (!parent.get('originalSize')) parent.set('originalSize', parent.get('size'));
  }
}

export function addState () {
  let options = this.options;
  debugger;
  let fatherObject = options.cellView.model;
  let defaultState = new joint.shapes.opm.StateNorm(basicDefinitions.defineState());
  fatherObject.embed(defaultState);     //makes the state stay in the bounds of the object
  options.graph.addCells([fatherObject, defaultState]);
  let embeddedStates = fatherObject.getEmbeddedCells();

  //Placing the new state. By default it is outside the object.
  let xNewState = fatherObject.getBBox().center().x - basicDefinitions.stateWidth/2;
  let yNewState = fatherObject.getBBox().y + fatherObject.getBBox().height - basicDefinitions.stateHeight - common.paddingObject;
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
  if (fatherObject.get('embeds').length > 1) {
    gridLayout.layout(embeddedStates, {
      columns: fatherObject.get('embeds').length,
      columnWidth: defaultState.getBBox().width * 1.2,
      rowHeight: defaultState.height,
      marginY: (fatherObject.getBBox().y + fatherObject.getBBox().height) - common.paddingObject * 3,
      marginX: (fatherObject.getBBox().x + fatherObject.getBBox().width * 0.5) - 0.5 * basicDefinitions.stateWidth * fatherObject.get('embeds').length
    });
  }

  //https://resources.jointjs.com/docs/jointjs/v1.1/joint.html#dia.Element.events
  options.graph.on('change:position', function(cell) {
    let parentId = cell.get('parent');
    let parent = options.graph.getCell(parentId);
    saveValues(cell, parent);
    if (parentId){        //State case
      common.CommonFunctions.updateObjectSize(parent);
    }
    else if (cell.get('embeds') && cell.get('embeds').length){  //Object case
      if(objectChangedSize) {
        common.CommonFunctions.updateObjectSize(cell);
        objectChangedSize = false;
      }
    }
  });

  options.graph.on('change:size', function(cell) {
    let parentId = cell.get('parent');
    let parent = options.graph.getCell(parentId);
    saveValues(cell, parent);
    if (parentId){        //State case
      common.CommonFunctions.updateObjectSize(parent);
    }
    else if (cell.get('embeds') && cell.get('embeds').length){  //Object case
      objectChangedSize = true;
      common.CommonFunctions.updateObjectSize(cell);
    }
  });
}
