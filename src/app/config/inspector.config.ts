import { inspectorShapes } from './inspectorShapes';

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
  }
};
