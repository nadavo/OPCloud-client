export const basicDefinitions = {

  shapeSize: {width: 100, height: 50},

  createShape(shapeName){
    var widthShape = (shapeName == 'rect') ? 100 : null;
    var heightShape = (shapeName == 'rect') ? 60 : null;
    var xShape = (shapeName == 'ellipse') ? 30 : null;
    var yShape = (shapeName == 'ellipse') ? 20 : null;
    var strokeColor = (shapeName == 'ellipse') ? '#00008B' : '#006400';

    return {
      fill: '#DCDCDC',
      stroke: strokeColor,
      'stroke-width': 2,
      filter: {name: 'dropShadow', args: {dx: 6, dy: 6, blur: 0, color: 'grey'}},
      width: widthShape,
      height: heightShape,
      rx: xShape,
      ry: yShape,
      cx: xShape,
      cy: yShape
    };
  },

  createText(shapeName){
    var textShape = (shapeName == 'rect') ? 'Object' : 'Process';

    return {
      text: textShape,
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

  createMarkup(shapeName){
    return `<g class="rotatable"><g class="scalable"><${shapeName}/></g><text/></g>`;
  },

  getTypeName(shapeName){
    if (shapeName == 'rect') return 'opm.Object';
    return 'opm.Process';
  },

  defineShape(shapeName){
    var shape = {
      markup: this.createMarkup(shapeName),

      defaults: require('lodash').defaultsDeep({
        type: this.getTypeName(shapeName),
        size: this.shapeSize,
        attrs: {
          [shapeName]: this.createShape(shapeName),
          'text': this.createText(shapeName)
        }
      }, require('rappid').shapes.basic.Generic.prototype.defaults)
    };
    return shape;
  }
};
