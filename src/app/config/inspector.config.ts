import { inspectorShapes } from './inspectorShapes';
import { inspectorLinks } from './inspectorLinks';

export const inspectorConfig = {

  //object parameters
  'opm.Object': {
    inputs: {
      attrs: {
        rect: inspectorShapes.shapeDefinition,
        text: inspectorShapes.textDefinition
      }
    },
    groups: inspectorShapes.groupsDefinition
  },
  //process parameters
  'opm.Process': {
    inputs: {
      attrs: {
        'ellipse': inspectorShapes.shapeDefinition,
        text: inspectorShapes.textDefinition
      }
    },
    groups: inspectorShapes.groupsDefinition
  },
  //link parameters
  'opm.Link': {
    inputs: {
      attrs: inspectorLinks.linkDefinition,
      labels: inspectorLinks.labelDefinition
    },
    groups: inspectorLinks.groupsDefinition
  }
};
