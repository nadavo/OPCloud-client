/**
 * OPM Shapes Library for JointJS
 * Developed by:
 * Nadav Oved, Aviv Sugarman, Oleg Zendel, Itamar Shafran and Or Keren
 * for the OPCloud Project
 */

const _ = require('lodash')
const joint = require('rappid');
const g = joint.g;
import './joint-shapes.config.ts';

export const opmShapes = {

  //OPM Links definitions
  Link: joint.dia.Link.extend({
    defaults: _.defaultsDeep({
      type: 'opm.Link',
      source: g.point(50, 100),
      target: g.point(100, 150),
      attrs: {
        fill: '#f2f2f2',
        '.marker-target': {
          fill: '#f2f2f2',
          d: 'M 8,33 L -12,25 L 8,17 L0,25 L 8,33 M 0,25 L 10,25',
          'stroke-width': 2

        },
        '.connection': { 'stroke-width': 2 },
        '.marker-source': { fill: '#f2f2f2', 'stroke-width': 2 }
      },
      labels: [
        { position: 0.5, attrs: { text: { text: '' } } }
      ]
    }, joint.dia.Link.prototype.defaults)
  }),

  InstrumentLink: joint.dia.Link.extend({
    defaults: _.defaultsDeep({
      type: 'opm.InstrumentLink',
      source: g.point(50, 100),
      target: g.point(100, 150),
      attrs: {
        fill: '#f2f2f2',
        '.marker-target': {
          fill: '#f2f2f2',
          d: 'M 10 10 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0',
          'stroke-width': 2
        },
        '.connection': { 'stroke-width': 2 }
      }
    }, joint.dia.Link.prototype.defaults)
  }),

  AgentLink: joint.dia.Link.extend({
    defaults: _.defaultsDeep({
      type: 'opm.AgentLink',
      source: g.point(50, 100),
      target: g.point(100, 150),
      attrs: {
        fill: '#000000',
        '.marker-target': {
          fill: '#000000',
          d: 'M 10 10 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0',
          'stroke-width': 2
        },
        '.connection': { 'stroke-width': 2 }
      }
    }, joint.dia.Link.prototype.defaults)
  }),

  //OPM generic shape building block
  Generic: joint.dia.Element.extend({

    defaults: _.defaultsDeep({

      type: 'opm.Generic',
      attrs: {
        '.': { fill: '#ffffff', stroke: 'none' }
      }

    }, joint.dia.Element.prototype.defaults)
  }),
  Object: null,
  Process: null
};

//OPM shapes definitions
opmShapes.Object = opmShapes.Generic.extend({

  markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>',

  defaults: _.defaultsDeep({

    type: 'opm.Object',
    size: { width: 100, height: 50 },
    attrs: {
      'rect': {
        width: 100,
        height: 60,
        fill: '#DCDCDC',
        stroke: '#006400',
        'stroke-width': 2,
        filter: { name: 'dropShadow', args: { dx: 6, dy: 6, blur: 0, color: 'grey' } }
      },
      'text': {
        fill: 'black',
        text: 'Object',
        'font-size': 14,
        'ref-x': .5,
        'ref-y': .5,
        'text-anchor': 'middle',
        'y-alignment': 'middle',
        'font-family': 'Arial, helvetica, sans-serif',
        'font-weight': 600
      }
    }

  }, joint.shapes.basic.Generic.prototype.defaults)
});

opmShapes.Process = opmShapes.Generic.extend({

  markup: '<g class="rotatable"><g class="scalable"><ellipse/></g><text/></g>',

  defaults: _.defaultsDeep({

    type: 'opm.Process',
    size: { width: 100, height: 50 },
    attrs: {
      'ellipse': {
        fill: '#DCDCDC',
        stroke: '#00008B',
        'stroke-width': 2,
        rx: 30,
        ry: 20,
        cx: 30,
        cy: 20,
        filter: { name: 'dropShadow', args: { dx: 6, dy: 6, blur: 0, color: 'grey' } }
      },
      'text': {
        fill: 'black',
        text: 'Process',
        'font-size': 14,
        'ref-x': .5,
        'ref-y': .5,
        'text-anchor': 'middle',
        'y-alignment': 'middle',
        'font-family': 'Arial, helvetica, sans-serif',
        'font-weight': 600
      }

    }
  }, joint.shapes.basic.Generic.prototype.defaults)
});

joint.shapes.opm = opmShapes;

