const _ = require('lodash')
const joint = require('rappid');

export const jointShapes = {
  CircularModel: null,
  RectangularModel: null,
  Link: null
};

jointShapes.CircularModel = joint.shapes.devs.Model.extend({

  defaults: _.defaultsDeep({
    type: 'app.CircularModel',
    ports: {
      groups: {
        'in': {
          attrs: {
            '.port-body': {
              fill: '#61549C',
              'stroke-width': 0
            },
            '.port-label': {
              'font-size': 11,
              fill: '#61549C',
              'font-weight': 800
            }
          },
          position: {
            name: 'ellipse',
            args: {
              startAngle: 0,
              step: 30
            }
          },
          label: {
            position: {
              name: 'radial',
              args: null
            }
          }
        },
        'out': {
          attrs: {
            '.port-body': {
              fill: '#61549C',
              'stroke-width': 0
            },
            '.port-label': {
              'font-size': 11,
              fill: '#61549C',
              'font-weight': 800
            }
          },
          position: {
            name: 'ellipse',
            args: {
              startAngle: 180,
              step: 30
            }
          },
          label: {
            position: {
              name: 'radial',
              args: null
            }
          }
        }
      }
    }

  }, joint.shapes.devs.Model.prototype.defaults)
});

jointShapes.RectangularModel = joint.shapes.devs.Model.extend({

  defaults: _.defaultsDeep({
    type: 'app.RectangularModel',
    ports: {
      groups: {
        'in': {
          attrs: {
            '.port-body': {
              fill: '#61549C',
              'stroke-width': 0
            },
            '.port-label': {
              'font-size': 11,
              fill: '#61549C',
              'font-weight': 800
            }
          },
          label: {
            position: {
              name: 'left',
              args: {
                y: 0
              }
            }
          }
        },
        'out': {
          attrs: {
            '.port-body': {
              fill: '#61549C',
              'stroke-width': 0
            },
            '.port-label': {
              'font-size': 11,
              fill: '#61549C',
              'font-weight': 800
            }
          },
          label: {
            position: {
              name: 'right',
              args: {
                y: 0
              }
            }
          }
        }
      }
    }
  }, joint.shapes.devs.Model.prototype.defaults)
});

jointShapes.Link = joint.dia.Link.extend({

  defaults: _.defaultsDeep({
    type: 'app.Link',
    router: {
      name: 'normal'
    },
    connector: {
      name: 'normal'
    },
    attrs: {
      '.tool-options': {
        'data-tooltip-class-name': 'small',
        'data-tooltip': 'Click to open Inspector for this link',
        'data-tooltip-position': 'left'
      },
      '.marker-source': {
        d: 'M 10 0 L 0 5 L 10 10 z',
        stroke: 'transparent',
        fill: '#222138',
        transform: 'scale(0.001)'
      },
      '.marker-target': {
        d: 'M 10 0 L 0 5 L 10 10 z',
        stroke: 'transparent',
        fill: '#222138',
        transform: 'scale(1)'
      },
      '.connection': {
        stroke: '#222138',
        'stroke-dasharray': '0',
        'stroke-width': 1
      }
    }
  }, joint.dia.Link.prototype.defaults)
});

