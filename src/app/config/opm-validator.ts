const joint = require('rappid');

export function opmRuleSet(validator, graph) {
  validator.validate(
    "change:target change:source",
    function (err, command, next) {
      if (command.data.type === 'opm.Link') {
        const link = graph.getCell(command.data.id);
        //console.log(link.getSourceElement());
        if ((null === link.getTargetElement())) {
          console.log('in if');
          return next('A link must connect to a target element!');
        }
        else if(link.getTargetElement().id == link.getSourceElement().get('parent')){
          return next('A state cannot be connected to his object!');
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
