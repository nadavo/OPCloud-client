
const _ = require('lodash');
const joint = require('rappid');
const g = joint.g;

export const basicDefinitions = {

  createShape(shapeName){
    return {
      fill: '#DCDCDC',
      stroke: (shapeName == 'ellipse') ? '#00008B' : '#006400',
      'stroke-width': 2,
      filter: {name: 'dropShadow', args: {dx: 6, dy: 6, blur: 0, color: 'grey'}},
      width: (shapeName == 'rect') ? 100 : null,
      height: (shapeName == 'rect') ? 60 : null,
      rx: (shapeName == 'ellipse') ? 30 : null,
      ry: (shapeName == 'ellipse') ? 20 : null,
      cx: (shapeName == 'ellipse') ? 30 : null,
      cy: (shapeName == 'ellipse') ? 20 : null
    };
  },

  createText(shapeName){
    return {
      text: (shapeName == 'rect') ? 'Object' : 'Process',
      fill: 'black',
      'font-size': 14,
      'ref-x': .5,
      'ref-y': .5,
      'text-anchor': 'middle',
      'y-alignment': 'middle',
      'font-family': 'Arial, helvetica, sans-serif',
      'font-weight': 600
    }
  },

  defineShape(shapeName){
    var shape = {
      markup: `<g class="rotatable"><g class="scalable"><${shapeName}/></g><text/></g>`,
      defaults: _.defaultsDeep({
        type: (shapeName == 'rect') ? 'opm.Object' : 'opm.Process',
        size: {width: 100, height: 50},
        attrs: {
          [shapeName]: this.createShape(shapeName),
          'text': this.createText(shapeName)
        }
      }, joint.shapes.basic.Generic.prototype.defaults)
    };
    return shape;
  },

    defineLink(linkName){
    return {
      defaults: _.defaultsDeep({
        type: 'opm.Link',
        attrs: {'.connection': { 'stroke-width': 2, 'stroke-dasharray': '8 5' }},
        labels: [{ position: 0.5, attrs: { text: { text: '' } } }]
      }, joint.dia.Link.prototype.defaults)
    };
  }
};
