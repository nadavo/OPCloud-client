const joint = require('rappid');

export function addState (evt, x, y) {

  var options = this.options;

  console.log(this)

  this.startBatch();


  var fatherObject = this.options.cellView.model;

  var defaultState = new joint.shapes.opm.StateNorm({
    /*type: 'opm.StateNorm',*/
    position: { x: x - 20, y: y - 50 },
    size: { width: 50, height: 25 },
    attrs: {
      rect: { fill: '#DCDCDC', rx: 20, ry: 20, 'stroke-width': 2, stroke: '#808000' },
      text: { text: 'State', fill: 'black' }
    }
  });


  fatherObject.embed(defaultState);

  options.graph.addCells([fatherObject, defaultState]);

  options.graph.on('change:position', function (cell) {

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
  });


}