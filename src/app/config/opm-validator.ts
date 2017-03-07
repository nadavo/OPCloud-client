const joint = require('rappid');

export function opmRuleSet(validator, graph) {
  validator.validate(
    "change:target change:source",
    function (err, command, next) {
      if (command.data.type === 'opm.Link') {
        const link = graph.getCell(command.data.id);
        //console.log(link.getSourceElement());
        if (null === link.getTargetElement()) {
          return next('A link must connect to a target element!');
        }
        else {

          // OPL is updated in the OPL widget

          /*$("opl").empty();

          var target = link.getTargetElement().attributes.attrs.text.text;
          var source = link.getSourceElement().attributes.attrs.text.text;

          if (link.getTargetElement().attributes.type == 'opm.Object') {
            graph.OPL = graph.OPL + "<BR>" + source + " yields " + target + "<BR>";
          }
          else {
            graph.OPL = graph.OPL + "<BR>" + target + " consumes " + source + "<BR>";
          }
          //console.log(target + " link to " + source);

          if (target == 'Googling' &&
            link.getTargetElement().attributes.type == 'opm.Process' &&
            link.getSourceElement().attributes.type == 'opm.Object') {
            graph.OPL = graph.OPL + "<BR>" + target + " " + "\'" + source + "\'" + " for you " + "<BR>";
            var url = "https://lmgtfy.com/?q=" + source;
            window.open(url);
          }

          if (source == 'Gladiator' && target == 'Entertaining' && link.getTargetElement().attributes.type == 'opm.Process' && link.getSourceElement().attributes.type == 'opm.Object') {
            graph.OPL = graph.OPL + "<BR>" + source + " is " + target + "!!!!!!!" + "<BR>";
            window.open('https://www.youtube.com/embed/FsqJFIJ5lLs?autoplay=1');
          }
          document.getElementById("opl").innerHTML = graph.OPL;*/

          // graph.updateJSON();

          // $("#header ul").empty();
          //$("#items ol").append('<li>$target is linked to $source</li>');
          //console.log('Link ' + link.id + ' was created!');
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
