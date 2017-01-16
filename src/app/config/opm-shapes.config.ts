/**
 * OPM Shapes Library for JointJS
 * Developed by:
 * Nadav Oved, Aviv Sugarman, Oleg Zendel, Itamar Shafran and Or Keren
 * for the OPCloud Project
 */

const _ = require('lodash');
const joint = require('rappid');
const g = joint.g;
import './joint-shapes.config.ts';


//OPM Links definitions
const Link = joint.dia.Link.extend({
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
    }
  }, joint.dia.Link.prototype.defaults)
});

const InstrumentLink = joint.dia.Link.extend({
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
});

const AgentLink = joint.dia.Link.extend({
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
});

//OPM generic shape building block
const Generic = joint.dia.Element.extend({

  defaults: _.defaultsDeep({

    type: 'opm.Generic',
    attrs: {
      '.': { fill: '#ffffff', stroke: 'none' }
    }

  }, joint.dia.Element.prototype.defaults)
});

//OPM shapes definitions
const Object = Generic.extend({

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

const Process = Generic.extend({
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

//INITIAL STATE
const StateInit = joint.shapes.basic.Rect.extend({
  defaults: {
    position: { x: 410, y: 170 },
    size: { width: 80, height: 40 },
    attrs: {
      rect: { fill: '#DCDCDC', rx: 20, ry: 20, 'stroke-width': 3, stroke: '#808000' },
      text: { text: 'pre-tested', fill: 'black' }
    }
  }
});

//regular opm physical systematic object
const PSObj = joint.shapes.basic.Rect.extend({
  defaults: _.defaultsDeep({
    type: 'OPM.Object',
    position: { x: 250, y: 200 },
    size: { width: 100, height: 50 },
    attrs: {
      rect: {
        fill: '#DCDCDC',
        stroke: '#006400',
        'stroke-width': 2,
        filter: { name: 'dropShadow', args: { dx: 6, dy: 6, blur: 0, color: 'grey' } }
      },
      text: {
        text: 'Object',
        fill: 'black', 'font-weight': 600
      }
    }
  }, joint.shapes.basic.Rect.prototype.defaults)
});

//informatical systemic object
const ISObj = joint.shapes.basic.Rect.extend({
  defaults: {
    position: { x: 750, y: 300 },
    size: { width: 100, height: 50 },
    attrs: {
      rect: { fill: '#DCDCDC', stroke: '#006400', 'stroke-width': 2 },
      text: { text: 'Object', fill: 'black', 'font-weight': 600 }
    }
  }
});

//informatical systemic process
const ISProc = joint.shapes.basic.Circle.extend({

  defaults: _.defaultsDeep({

    type: 'OPM.Process',
    size: { width: 6, height: 3 },
    attrs: {
      circle: {
        width: 50, height: 30, stroke: '#00008B', fill: '#DCDCDC', 'stroke-width': 2
      },
      text: { text: 'Process', fill: 'black', 'font-weight': 600 }
    }
  }, joint.shapes.basic.Circle.prototype.defaults)
});

//NORMAL STATE
const StateNorm = joint.shapes.basic.Rect.extend({
  markup: '<g class="rotatable"><g class="scalable"><rect id="outer" width="80" height="40"/></g><text/></g>',
  defaults: _.defaultsDeep({
    type: 'opm.StateNorm',
    position: { x: 250, y: 200 },
    size: { width: 100, height: 50 },
    attrs: {
      rect: {
        fill: '#DCDCDC',
        stroke: '#006400',
        'stroke-width': 2,
      },
      text: {
        text: 'BooB',
        fill: 'black', 'font-weight': 600
      }
    }
  }, joint.shapes.basic.Rect.prototype.defaults)
  /*defaults: {
   type:'opm.StateNorm',
   position: {x: 510, y: 170},
   size: {width: 80, height: 40},
   attrs: {
   rect: {fill: '#DCDCDC', rx: 40, ry: 20, 'stroke-width': 2, stroke: '#808000'},
   text: {text: 'being\ntested', fill: 'black', 'font-size': '10', 'ref-y':0.5, 'ref-x':0.5 ,'text-anchor': 'middle', 'y-alignment': 'middle'}
   }
   }*/
});

export const opmShapes = {
  Link,
  InstrumentLink,
  AgentLink,
  Generic,
  Object,
  Process,
  StateInit,
  PSObj,
  ISObj,
  ISProc,
  StateNorm,
};

joint.shapes.opm = opmShapes;

