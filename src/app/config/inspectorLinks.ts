import { selectOptions } from './selectOptions';
import {CommonFunctions} from "../common/commonFunctions";

export const inspectorLinks = {
  //From this point defined  the groups that all the inspector parameters are grouped by.
  groupsDefinition: {
    marker: CommonFunctions.createGroup('Marker', 1),
    labels: CommonFunctions.createGroup('Labels', 2)
  },

  linkDefinition: {
    '.marker-source': CommonFunctions.createSelection('select-box', selectOptions.SourceLinkType, 'source link type', 'Marker', 1),
    '.marker-target': CommonFunctions.createSelection('select-box', selectOptions.DestLinkType, 'destination link type', 'Marker', 2),
  },

  labelDefinition: [{
    position: CommonFunctions.createSelection('select-box', selectOptions.labelPosition, 'Position', 'Labels', 4),
    attrs: {
      text: {
        text: {
          group: 'Labels',
          type: 'text',
          label: 'text',
          index: 3
        }
      }
    }
  }]
};
