const options = {

  colorPalette: [
    //{ content: 'transparent', icon: 'assets/transparent-icon.png' },
    { content: '#f6f6f6' },
    { content: '#dcd7d7' },
    { content: '#8f8f8f' },
    { content: '#c6c7e2' },
    { content: '#feb663' },
    { content: '#fe854f' },
    { content: '#b75d32' },
    { content: '#31d0c6' },
    { content: '#7c68fc' },
    { content: '#61549C' },
    { content: '#6a6c8a' },
    { content: '#4b4a67' },
    { content: '#3c4260' },
    { content: '#33334e' },
    { content: '#222138' },
    { content: '#DCDCDC' },
    { content: '#006400' },
    { content: '#00008B' },
    { content: 'black' },
    { content: 'grey' },
    { content: '#f2f2f2' }
  ],

  strokeStyle: [
    { value: '0', content: 'Systemic' },
    { value: '10,5', content: 'Environmental' }
  ],

  PhysInfObj: [
    { content: 'Physical', value: 'url(#dropShadowv-51979730529)' },
    { content: 'Informatical', value: 'null' },
  ],

  PhysInfProc: [
    { content: 'Physical', value: 'url(#dropShadowv-5-1994481503)' },
    { content: 'Informatical', value: 'null' },
  ],

  arrowheadType: [
    { value: 'M 8,33 L -12,25 L 8,17 L0,25 L 8,33 M 0,25 L 10,25', content: 'Consumption Link' },
    { value: 'M 0 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 10,0 L 25,0', content: 'Instrument Link' },
    { value: 'M 0 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 10,0 L 25,0', content: 'Agent Link' }
  ],

  SourceLinkType: [
    { value: { d: '' }, content: 'None' },
    {
      value: { fill: '#f2f2f2', d: 'M 8,33 L -12,25 L 8,17 L0,25 L 8,33 M 0,25 L 10,25', 'stroke-width': 2 },
      content: 'Consumption Link'
    }
  ],

  DestLinkType: [
    {
      value: { fill: '#f2f2f2', d: 'M 8,33 L -12,25 L 8,17 L0,25 L 8,33 M 0,25 L 10,25', 'stroke-width': 2 },
      content: 'Consumption Link'
    },
    {
      value: { fill: '#f2f2f2', d: 'M 0 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 10,0 L 25,0', 'stroke-width': 2 },
      content: 'Instrument Link'
    },
    {
      value: { fill: '#000000', d: 'M 0 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 10,0 L 25,0', 'stroke-width': 2 },
      content: 'Agent Link'
    }
  ],

  labelPosition: [
    { value: 30, content: 'Close to source' },
    { value: 0.5, content: 'In the middle' },
    { value: -30, content: 'Close to target' },
  ]
};

export const inspectorConfig = {
  'opm.Link': {
    inputs: {
      attrs: {
        '.marker-source': {
          type: 'select-box',
          options: options.SourceLinkType,
          defaultValue: { d: '' },
          group: 'marker-source',
          label: 'Link Type',
          index: 1,
        },
        '.marker-target': {
          type: 'select-box',
          options: options.DestLinkType,
          group: 'marker-target',
          label: 'Link Type',
          index: 1,
        }
      },
      labels: {
        type: 'list',
        group: 'labels',
        label: 'Labels',
        attrs: {
          label: {
            'data-tooltip': 'Set (possibly multiple) labels for the link',
            'data-tooltip-position': 'right',
            'data-tooltip-position-selector': '.joint-inspector'
          }
        },
        item: {
          type: 'object',
          properties: {
            attrs: {
              text: {
                text: {
                  type: 'text',
                  label: 'text',
                  defaultValue: 'label',
                  index: 1,
                  attrs: {
                    label: {
                      'data-tooltip': 'Set text of the label',
                      'data-tooltip-position': 'right',
                      'data-tooltip-position-selector': '.joint-inspector'
                    }
                  }
                }
              }
            },
            position: {
              type: 'select-box',
              options: options.labelPosition,
              defaultValue: 0.5,
              label: 'Position',
              index: 2,
              attrs: {
                label: {
                  'data-tooltip': 'Position the label relative to the source of the link',
                  'data-tooltip-position': 'right',
                  'data-tooltip-position-selector': '.joint-inspector'
                }
              }
            }
          }
        }
      }
    },
    groups: {
      'marker-source': {
        label: 'Source marker',
        index: 1
      },
      'marker-target': {
        label: 'Target marker',
        index: 2
      },
      labels: {
        label: 'Labels',
        index: 3
      }
    }
  },
  'opm.StateNorm': {
    inputs: {
      attrs: {
        text: {
          text: {
            type: 'content-editable',
            label: 'Text',
            group: 'text',
            index: 1
          },
          fill: {
            type: 'color-palette',
            options: options.colorPalette,
            label: 'Fill',
            group: 'text',
            when: { ne: { 'attrs/text/text': '' } },
            index: 2
          }
        },
        rect: {
          'stroke-width': {
            type: 'range',
            min: 0,
            max: 30,
            step: 1,
            defaultValue: 1,
            unit: 'px',
            label: 'Outline thickness',
            group: 'presentation',
            when: { ne: { 'attrs/rect/stroke': 'transparent' } },
            index: 3
          },
          'stroke-dasharray': {
            type: 'select',
            options: options.strokeStyle,
            label: 'Affiliation',
            group: 'presentation',
            index: 4
          }
        }
      }
    },
    groups: {
      presentation: {
        label: 'Presentation',
        index: 1
      },
      text: {
        label: 'Text',
        index: 2
      }
    }
  },
  'opm.Object': {
    inputs: {
      attrs: {
        text: {
          text: {
            type: 'content-editable',
            label: 'Text',
            group: 'text',
            index: 1
          },
          fill: {
            type: 'color-palette',
            options: options.colorPalette,
            label: 'Fill',
            group: 'text',
            when: { ne: { 'attrs/text/text': '' } },
            index: 5
          }
        },
        rect: {
          fill: {
            type: 'color-palette',
            options: options.colorPalette,
            label: 'Fill',
            group: 'presentation',
            index: 1
          },
          stroke: {
            type: 'color-palette',
            options: options.colorPalette,
            label: 'Outline',
            group: 'presentation',
            index: 2
          },
          'filter': {
            type: 'select',
            label: 'Essence',
            options: options.PhysInfObj,
            group: 'presentation',
            index: 3,
          },
          'stroke-dasharray': {
            type: 'select',
            options: options.strokeStyle,
            label: 'Affiliation',
            group: 'presentation',
            when: {
              and: [
                { ne: { 'attrs/rect/stroke': 'transparent' } },
                { ne: { 'attrs/rect/stroke-width': 0 } }
              ]
            },
            index: 4
          }
        }
      }
    },
    groups: {
      presentation: {
        label: 'Properties',
        index: 1
      },
      text: {
        label: 'Text',
        index: 2
      }
    }
  },
  'opm.Process': {
    inputs: {
      attrs: {
        text: {
          text: {
            type: 'content-editable',
            label: 'Text',
            group: 'text',
            index: 1
          },
          fill: {
            type: 'color-palette',
            options: options.colorPalette,
            label: 'Fill',
            group: 'text',
            when: { ne: { 'attrs/text/text': '' } },
            index: 5
          }
        },
        'ellipse': {
          fill: {
            type: 'color-palette',
            options: options.colorPalette,
            label: 'Fill',
            group: 'presentation',
            index: 1
          },
          stroke: {
            type: 'color-palette',
            options: options.colorPalette,
            label: 'Outline',
            group: 'presentation',
            index: 2
          },
          'filter': {
            type: 'select',
            label: 'Essence',
            options: options.PhysInfProc,
            group: 'presentation',
            index: 4
          },
          'stroke-dasharray': {
            type: 'select',
            options: options.strokeStyle,
            label: 'Affiliation',
            group: 'presentation',
            when: {
              and: [
                { ne: { 'attrs/circle/stroke': 'transparent' } },
                { ne: { 'attrs/circle/stroke-width': 0 } }
              ]
            },
            index: 5
          }
        }
      }
    },
    groups: {
      presentation: {
        label: 'Properties',
        index: 1
      },
      text: {
        label: 'Text',
        index: 2
      }
    }
  },
};
