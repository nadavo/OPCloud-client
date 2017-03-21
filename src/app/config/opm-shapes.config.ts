/**
 * OPM Shapes Library for JointJS
 * Developed by:
 * Nadav Oved, Aviv Sugarman, Oleg Zendel, Itamar Shafran and Or Keren
 * for the OPCloud Project
 */

const joint = require('rappid');
import { basicDefinitions } from './basicDefinitions';
export const opmShapes = {
  //OPM Links definitions
  Link: joint.dia.Link.extend(basicDefinitions.defineLink('Link')),
  Object: joint.dia.Element.extend(basicDefinitions.defineShape('rect')),
  Process: joint.dia.Element.extend(basicDefinitions.defineShape('ellipse')),
  StateNorm: joint.shapes.basic.Rect.extend(basicDefinitions.defineState())
};

joint.shapes.opm = opmShapes;

