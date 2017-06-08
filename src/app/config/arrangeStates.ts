/**
 * Created by olegz on 03-Jun-17.
 */
import {basicDefinitions} from "./basicDefinitions";
import * as common from "../common/commonFunctions";
import {gridLayout} from "./gridLayout"
const joint = require('rappid');


export function arrangeStates(side) {
  let options = this.options;
  let fatherObject = options.cellView.model;
  let embeddedStates = fatherObject.getEmbeddedCells();
  let maxWidth = null;
  let maxHeight = null;
  // If the Object has any embedded states
  if (embeddedStates.length) {
    // Find the maximum Height and Width of all the states
    common._.each(embeddedStates, function (child) {
      if (child.getBBox().width > maxWidth) maxWidth = child.getBBox().width;
      if (child.getBBox().height > maxHeight) maxHeight = child.getBBox().height;
    });
    // Set the Height and Width fo every state
    common._.each(embeddedStates, function (child) {
      let originalW = child.getBBox().width;
      let originalH = child.getBBox().height;
      if (originalH != maxHeight && originalH * 2 > maxHeight) {
        child.set({size: {height: maxHeight, width: originalW}});
        originalH = maxHeight;
      }
      if (originalW != maxWidth && originalW * 2 > maxWidth)
        child.set({size: {height: originalH, width: maxWidth}});
    });
    if (side == 'top') {
      gridLayout.layout(embeddedStates, {
        columns: embeddedStates.length,
        columnWidth: maxWidth + 5,
        rowHeight: maxHeight,
        marginY: (fatherObject.getBBox().y + common.paddingObject),
        marginX: (fatherObject.getBBox().x + fatherObject.getBBox().width * 0.5) - 0.5 * (maxWidth + 5) * embeddedStates.length
      });
    }
    else if (side == 'bottom') {
      gridLayout.layout(embeddedStates, {
        columns: embeddedStates.length,
        columnWidth: maxWidth + 5,
        rowHeight: maxHeight,
        marginY: ((fatherObject.getBBox().y + fatherObject.getBBox().height) - common.paddingObject) - maxHeight,
        marginX: (fatherObject.getBBox().x + fatherObject.getBBox().width * 0.5) - 0.5 * (maxWidth + 5) * embeddedStates.length
      });
    }
    else if (side == 'left') {
      gridLayout.layout(embeddedStates, {
        columns: 1,
        rows: embeddedStates.length,
        columnWidth: maxWidth,
        rowHeight: maxHeight + 5,
        marginY: (fatherObject.getBBox().y + fatherObject.getBBox().height * 0.5) - 0.5 * (maxHeight + 5) * embeddedStates.length,
        marginX: ((fatherObject.getBBox().x + fatherObject.getBBox().width) - common.paddingObject) - maxWidth
      });
    }
    else if (side == 'right') {
      gridLayout.layout(embeddedStates, {
        columns: 1,
        rows: embeddedStates.length,
        columnWidth: maxWidth,
        rowHeight: maxHeight + 5,
        marginY: (fatherObject.getBBox().y + fatherObject.getBBox().height * 0.5) - 0.5 * (maxHeight + 5) * embeddedStates.length,
        marginX: fatherObject.getBBox().x + common.paddingObject
      });
    }
  }
}
