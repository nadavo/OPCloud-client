/**
 * Created by olegz on 03-Jun-17.
 */
import {basicDefinitions} from "./basicDefinitions";
import * as common from "../common/commonFunctions";
import {gridLayout} from "./gridLayout"
const joint = require('rappid');




export function arrangeStates () {
  let options = this.options;
  let fatherObject = options.cellView.model;
  let embeddedStates = fatherObject.getEmbeddedCells();
  let maxWidth = null;
  let maxHeight = null;
  if (embeddedStates.length) {
    debugger;
    common._.each(embeddedStates, function(child) {
      if (child.getBBox().width > maxWidth) maxWidth = child.getBBox().width;
      if (child.getBBox().height > maxHeight) maxHeight = child.getBBox().height;
    });
    common._.each(embeddedStates, function(child) {
      debugger;
      let originalW = child.getBBox().width;
      let originalH = child.getBBox().height;
      if (originalW * 2 > maxWidth) {child.set({size: {height: originalH, width: maxWidth}})};
      if (originalH * 2 > maxHeight) {child.set({size: { height:maxHeight, width: originalW}})};
      common.CommonFunctions.updateObjectSize(child);
    });

    gridLayout.layout(embeddedStates, {
      columns: embeddedStates.length,
      columnWidth: maxWidth + 5,
      rowHeight: maxHeight,
      marginY: ((fatherObject.getBBox().y + fatherObject.getBBox().height) - common.paddingObject) - maxHeight,
      marginX: (fatherObject.getBBox().x + fatherObject.getBBox().width * 0.5) - 0.5 * (maxWidth + 5) * fatherObject.get('embeds').length,
    });
  }
}
