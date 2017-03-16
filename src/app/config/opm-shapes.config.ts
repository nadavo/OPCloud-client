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
import { basicDefinitions } from './basicDefinitions';
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

  Object: joint.dia.Element.extend(basicDefinitions.defineShape('rect')),
  Process: joint.dia.Element.extend(basicDefinitions.defineShape('ellipse'))
};

joint.shapes.opm = opmShapes;

