const joint = require('rappid');

export function opmRuleSet(validator, graph) {
  validator.validate(
    "change:target change:source",
    function (err, command, next) {
      if (command.data.type === 'opm.Link') {
        const link = graph.getCell(command.data.id);
        if ((null === link.getTargetElement())) {
          return next('A link must connect to a target element!');
        }
        else if(link.getTargetElement().id == link.getSourceElement().get('parent')){
          return next('A state cannot be connected to his object!');
        }
        if ((link.getSourceElement().attributes.type == 'opm.StateNorm') && (link.getTargetElement().attributes.type == 'opm.StateNorm')) {
          return next('A link cannot connect between two states!');
        }
        if(link.getSourceElement().id == link.getTargetElement().id){
          return next('An element cannot be connected to itself!');
        }
      }
      return next();
    },

    function (err, command, next) {
      const errorMessage = new joint.ui.FlashMessage({
        title: 'Validation Error!',
        type: 'alert',
        content: err
      });
      if (err) errorMessage.open();
      return next(err);
    })
}
