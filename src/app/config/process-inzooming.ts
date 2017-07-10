/**
 * Created by sameh14 on 4/26/2017.
 */
import {basicDefinitions} from "./basicDefinitions";
import * as common from "../common/commonFunctions";




const joint = require('rappid');
const initial_subprocess=3;
const Facotr=0.8;
const inzoomed_height=200;
const inzoomed_width=300;
const x_margin=70;
const y_margin=10;//height margin between subprocess
const childMargin=67;


export function processInzooming (evt, x, y,_this,cellRef,links) {



  var options = _this.options;
  var parentObject=cellRef;


  options.graph.addCell(parentObject);
  options.graph.addCells(links);

  parentObject.attributes.attrs.text = {
    'ref-y': .05,
    'ref-x': .5,
    'text-anchor': 'middle',
    'y-alignment': 'top'
  };


  //zoom out current elements in the paper
  var cells = options.graph.getElements();
  for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
    var cell = cells[cellIndex];
    var cellSize = cell.get('size');
    cell.resize(cellSize.width * Facotr, cellSize.height * Facotr);
  }

  //end of zoom out

  // resize the in-zoomed process
  parentObject.resize(inzoomed_height, inzoomed_width, options);

  //create the initial subprcoess
   let dy=y_margin;

  for (let i = 0; i < initial_subprocess; i++) {
    let yp = y + dy;
    let xp=x+childMargin;
    let defaultProcess = new joint.shapes.opm.Process(basicDefinitions.defineShape('ellipse'));
    defaultProcess.set('position', {x: xp, y: yp});
    parentObject.embed(defaultProcess);     //makes the state stay in the bounds of the object
    options.graph.addCells([parentObject, defaultProcess]);
    dy += x_margin;
    console.log('child object2'+JSON.stringify(defaultProcess));
  }

  common.CommonFunctions.updateObjectSize(parentObject);


  //parentObject.embeds
  let EmbeddedCells=parentObject.getEmbeddedCells();
  let first_process_id=EmbeddedCells[0].id;
  let last_process_id=EmbeddedCells[(initial_subprocess-1)].id;





   options.graph.getConnectedLinks(parentObject, { inbound: true }).forEach(function(link) {
   link.set('target', {id:first_process_id});
   });

   options.graph.getConnectedLinks(parentObject, { outbound: true}).forEach(function(link) {
   link.set('source', {id:last_process_id});
   });



  options.graph.on('change:position change:size', function (cell) {
    cell.set('originalSize', cell.get('size'));
    cell.set('originalPosition', cell.get('position'));
    var parentId = cell.get('parent');
    if (parentId) {
      var parent = options.graph.getCell(parentId);
      if (!parent.get('originalPosition')) parent.set('originalPosition', parent.get('position'));
      if (!parent.get('originalSize')) parent.set('originalSize', parent.get('size'));
      common.CommonFunctions.updateObjectSize(parent);
    }
    else if (cell.get('embeds') && cell.get('embeds').length) {
      common.CommonFunctions.updateObjectSize(cell);
    }

  });

}
