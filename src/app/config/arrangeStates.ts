/**
 * Created by olegz on 03-Jun-17.
 */
import * as common from "../common/commonFunctions";
import {gridLayout} from "./gridLayout";
const joint = require('rappid');

export function arrangeStates(side) {
  let options = this.options;
  let fatherObject = options.cellView.model;
  let text = options.paper.findViewByModel(fatherObject).$('text')[0];
  let embeddedStates = fatherObject.getEmbeddedCells();
  let maxWidth = null;
  let maxHeight = null;
  let overText = false;
  let textBBox = null;
  // Transform the textBoundBox into cell coordinates
  textBoundBox();
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
      //Change the attributes of the object - will be applied when rendered
      fatherObject.attributes.attrs.text["ref-y"] = '85%';
      fatherObject.attributes.attrs.statesArrange = 'top';
      // fatherObject.attributes.attrs.text["text-anchor"] = 'middle';
      this.options.cellView.render();
      textBoundBox();
      gridLayout.layout(embeddedStates, {
        columns: embeddedStates.length,
        columnWidth: maxWidth + 5,
        rowHeight: maxHeight,
        marginY: (fatherObject.getBBox().y + common.paddingObject),
        marginX: (fatherObject.getBBox().x + fatherObject.getBBox().width * 0.5) - 0.5 * (maxWidth + 5) * embeddedStates.length
      });
      common._.each(embeddedStates, function (child) {
        if (child.getBBox().containsPoint({
            'x': textBBox.x,
            'y': textBBox.y
          }) || child.getBBox().containsPoint({
            'x': textBBox.x + textBBox.width,
            'y': textBBox.y
          })) overText = true;
      });
      if (overText) {
        common._.each(embeddedStates, function (child) {
          child.set({position: {x: child.getBBox().x, y: textBBox.y - maxHeight * 1.5}});
        });
        overText = false;
      }
    }
    else if (side == 'bottom') {
      //Change the attributes of the object - will be applied when rendered
      fatherObject.attributes.attrs.text["ref-y"] = '15%';
      fatherObject.attributes.attrs.statesArrange = 'bottom';
      // fatherObject.attributes.attrs.text["text-anchor"] = 'middle';
      this.options.cellView.render();
      textBoundBox();
      gridLayout.layout(embeddedStates, {
        columns: embeddedStates.length,
        columnWidth: maxWidth + 5,
        rowHeight: maxHeight,
        marginY: ((fatherObject.getBBox().y + fatherObject.getBBox().height) - common.paddingObject) - maxHeight,
        marginX: (fatherObject.getBBox().x + fatherObject.getBBox().width * 0.5) - 0.5 * (maxWidth + 5) * embeddedStates.length
      });
      common._.each(embeddedStates, function (child) {
        if (child.getBBox().containsPoint({
            'x': textBBox.x,
            'y': textBBox.y + textBBox.height
          }) || child.getBBox().containsPoint({'x': textBBox.x + textBBox.width, 'y': textBBox.y + textBBox.height})) {
          overText = true;
        }
      });
      if (overText) {
        common._.each(embeddedStates, function (child) {
          child.set({position: {x: child.getBBox().x, y: textBBox.y + maxHeight * 1.5}});
        });
        overText = false;
      }
    }
    else if (side == 'left') {
      fatherObject.attributes.attrs.text["ref-y"] = '0.5';
      fatherObject.attributes.attrs.statesArrange = 'left';
      // fatherObject.attributes.attrs.text["text-anchor"] = 'end';
      this.options.cellView.render();
      textBoundBox();
      gridLayout.layout(embeddedStates, {
        columns: 1,
        rows: embeddedStates.length,
        columnWidth: maxWidth,
        rowHeight: maxHeight + 5,
        marginY: (fatherObject.getBBox().y + fatherObject.getBBox().height * 0.5) - 0.5 * (maxHeight + 5) * embeddedStates.length,
        marginX: ((fatherObject.getBBox().x + fatherObject.getBBox().width) - common.paddingObject) - maxWidth
      });
      common._.each(embeddedStates, function (child) {
        if (child.getBBox().containsPoint({
            'x': textBBox.x + textBBox.width,
            'y': textBBox.y
          }) || child.getBBox().containsPoint({'x': textBBox.x + textBBox.width, 'y': textBBox.y + textBBox.height}))
          overText = true;
      });
      if (overText) {
        common._.each(embeddedStates, function (child) {
          child.set({position: {x: textBBox.x + textBBox.width + maxWidth, y: child.getBBox().y}});
        });
        overText = false;
      }
    }
    else if (side == 'right') {
      fatherObject.attributes.attrs.text["ref-y"] = '0.5';
      fatherObject.attributes.attrs.statesArrange = 'right';
      // fatherObject.attributes.attrs.text["text-anchor"] = 'start';
      this.options.cellView.render();
      textBoundBox();
      gridLayout.layout(embeddedStates, {
        columns: 1,
        rows: embeddedStates.length,
        columnWidth: maxWidth,
        rowHeight: maxHeight + 5,
        marginY: (fatherObject.getBBox().y + fatherObject.getBBox().height * 0.5) - 0.5 * (maxHeight + 5) * embeddedStates.length,
        marginX: fatherObject.getBBox().x + common.paddingObject
      });
      common._.each(embeddedStates, function (child) {
        if ((child.getBBox().containsPoint({
            'x': textBBox.x,
            'y': textBBox.y
          }) || child.getBBox().containsPoint({
            'x': textBBox.x,
            'y': textBBox.y + textBBox.height
          }))) overText = true;
      });
      if (overText) {
        common._.each(embeddedStates, function (child) {
          child.set({position: {x: textBBox.x - textBBox.width - maxWidth, y: child.getBBox().y}});
        });
        overText = false;
      }
    }
  }
  // Transform the textBoundBox into cell coordinates
  function textBoundBox() {
    text = options.paper.findViewByModel(fatherObject).$('text')[0];
    textBBox = text.getBBox();
    textBBox.x = fatherObject.getBBox().x + fatherObject.getBBox().width * 0.5 + textBBox.x;
    textBBox.y = fatherObject.getBBox().y + fatherObject.getBBox().height * 0.45 + textBBox.y;
  }
}
