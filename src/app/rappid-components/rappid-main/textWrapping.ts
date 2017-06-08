import * as common from "../../common/commonFunctions";

export const textWrapping = {

  updateCell(cell, x, y, cornerX, cornerY){
    cell.set({
      position: { x: x, y: y },
      size: { width: cornerX - x, height: cornerY - y }
    });
  },

  updateDimensions(cell, textBox){
    var gapFromOriginalY = textBox.height + common.paddingObject * 2 - cell.get('originalSize').height;
    var gapFromOriginalX = textBox.width + common.paddingObject * 2 - cell.get('originalSize').width;
    if ((gapFromOriginalY > -1) || (gapFromOriginalX > -1)) {
      var newY = cell.get('originalPosition').y - gapFromOriginalY / 2;
      var newCornerY = newY + Math.max(cell.get('originalSize').height, (textBox.height + (common.paddingObject * 2)));
      var newX = cell.get('originalPosition').x - gapFromOriginalX / 2;
      var newCornerX = newX + Math.max(cell.get('originalSize').width, (textBox.width + (common.paddingObject * 2)));
      /* if(((newCornerY-newY)/(newCornerX-newX))>(5/9)){
       var widthNew = (newCornerY-newY)*9/5;
       newCornerX = newX + widthNew;
       }
       else if(((newCornerY-newY)/(newCornerX-newX))<(5/9)) {
       var heightNew = (newCornerX-newX)*5/9;
       newCornerY = newY + heightNew;
       }*/
      this.updateCell(cell, newX, newY, newCornerX, newCornerY);
      this.wrapText(cell);
    }
  },

  wrapText(cell){
    var currentText = cell.attributes.attrs.text.text;
    currentText = currentText.replace(/(\n\s*\n)|\n/g, "$1 ");  //remove line seperators
    var cellWidth = cell.get('size').width - common.paddingObject*2;
    var newText = common.joint.util.breakText(currentText, {width: cellWidth}, {'font-size': cell.attributes.attrs.text['font-size']}); //break the text
    cell.set('previousText', newText);
    //If needed wrapping
    if (newText && (newText != currentText)) { cell.attr({text: {text: newText}});}
  },

  startWrapping(paper, cell){
      if (!cell.get('originalSize')) cell.set('originalSize', cell.get('size')); //store original/default size
      if (!cell.get('originalPosition')) cell.set('originalPosition', cell.get('position')); //store original/default size
      var view = paper.findViewByModel(cell),
        text = view.$("text"), //get shape element
        bboxText = text[0].getClientRects()[0]; //text box dimensions
      if (!cell.get('previousText') || (cell.attributes.attrs.text.text != cell.get('previousText'))) {
        this.wrapText(cell);
      }
      else { this.updateDimensions(cell, bboxText); }
      }
};
