/**
 * Created by olegz on 21-May-17.
 */
const _ = require('lodash');
const joint = require('rappid');
const g = joint.g;

/*! Rappid v2.0.0 - HTML5 Diagramming Framework

 Copyright (c) 2015 client IO

 2016-09-20


 This Source Code Form is subject to the terms of the Rappid Academic License
 , v. 1.0. If a copy of the Rappid License was not distributed with this
 file, You can obtain one at http://jointjs.com/license/rappid_academic_v1.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/


joint.layout = joint.layout || {};

export const gridLayout = {

  layout: function(graphOrCells, opt) {

    let elements;

    if (graphOrCells instanceof joint.dia.Graph) {
      elements = graphOrCells.getElements();
    } else {
      elements = graphOrCells;
    }

    // This is not needed anymore.
    graphOrCells = null;
    // Default value = empty object
    opt = opt || {};



    // number of columns
    let columns = opt.columns || 1;

    // shift the element horizontally by a given amount
    let dx = opt.dx || 0;

    // shift the element vertically by a given amount
    let dy = opt.dy || 0;

    // width of a column
    let columnWidth = opt.columnWidth || this._maxDim(elements, 'width') + dx;

    // height of a row
    let rowHeight = opt.rowHeight ||  this._maxDim(elements, 'height') + dy;

    // position the elements in the centre of a grid cell
    let centre = _.isUndefined(opt.centre) || opt.centre !== false;

    // resize the elements to fit a grid cell & preserves ratio
    let resizeToFit = !!opt.resizeToFit;

    let marginX = opt.marginX || 0;
    let marginY = opt.marginY || 0;

    // Wrap all graph changes into a batch.
    // graph.startBatch('layout');

    // iterate the elements and position them accordingly
    _.each(elements, function(element, index) {

      let cx = 0;
      let cy = 0;
      let elementSize = element.get('size');

      if (resizeToFit) {

        let elementWidth = columnWidth - 2 * dx;
        let elementHeight = rowHeight - 2 * dy;

        let calcElHeight = elementSize.height * (elementSize.width ? elementWidth / elementSize.width : 1);
        let calcElWidth = elementSize.width * (elementSize.height ? elementHeight / elementSize.height : 1);

        if (calcElHeight > rowHeight) {

          elementWidth = calcElWidth;
        } else {
          elementHeight = calcElHeight;
        }

        elementSize = { width: elementWidth, height: elementHeight };
        element.set('size', elementSize);
      }

      if (centre) {
        cx = (columnWidth - elementSize.width) / 2;
        cy = (rowHeight - elementSize.height) / 2;
      }

      cx += marginX;
      cy += marginY;

      element.set('position', {
        x: (index % columns) * columnWidth + dx + cx,
        y: Math.floor(index / columns) * rowHeight + dy + cy
      });
    });

    // graph.stopBatch('layout');
  },

  // find maximal dimension (width/height) in an array of the elements
  _maxDim: function(elements, dimension) {

    return _.reduce(elements, function(max, el) { return Math.max(el.get('size')[dimension], max); }, 0);
  }
};
