import { opmShapes } from './opm-shapes.config';
const joint = require('rappid');

export const stencilConfig = {

  groups: {
    opm: { index: 1, label: 'OPM' }
    /*basic: { index: 2, label: 'Basic shapes' },
     fsa: { index: 3, label: 'State machine' },
     pn: { index: 4, label: 'Petri nets' },
     erd: { index: 5, label: 'Entity-relationship' },
     uml: { index: 6, label: 'UML' },
     org: { index: 7, label: 'ORG' }*/
  },

  shapes: {
    opm: [
      new opmShapes.Process,
      new opmShapes.Object
    ]
  }
}
