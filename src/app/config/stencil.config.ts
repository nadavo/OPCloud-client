import { opmShapes } from './opm-shapes.config';
const joint = require('rappid');

export const stencilConfig = {

  groups: {
    opm: { index: 1, label: 'OPM' }
  },

  shapes: {
    opm: [
      new opmShapes.Process,
      new opmShapes.Object
    ]
  }
}
