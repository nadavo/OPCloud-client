
const _ = require('lodash');
const joint = require('rappid');
const g = joint.g;

export const basicDefinitions = {

  createShape(shapeName){
    return {
      fill: '#DCDCDC',
      stroke: (shapeName == 'rect') ? '#006400' : ((shapeName == 'ellipse') ? '#00008B' : '#808000'),
      'stroke-width': 2,
      filter: (shapeName == 'state') ? null : {name: 'dropShadow', args: {dx: 3, dy: 3, blur: 0, color: 'grey'}},
      width: 100,
      height: 50,
      rx: (shapeName == 'ellipse') ? 40 : (shapeName == 'state') ? 20 : null,
      ry: (shapeName == 'ellipse') ? 40 : (shapeName == 'state') ? 20 : null,
      cx: (shapeName == 'ellipse') ? 40 : null,
      cy: (shapeName == 'ellipse') ? 40 : null
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
  },

  defineState(x=0, y=0) {
    return {
      type: 'opm.StateNorm',
        position: { x: x - 20, y: y - 50},
        size: { width: 50, height: 25},
          attrs: {
          rect: this.createShape('state'),
          text: { text: 'state', fill: 'black'}
        }
    };
  }
};
