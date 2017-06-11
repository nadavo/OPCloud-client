import * as common from "../../common/commonFunctions";

export const textWrapping = {

  updateCell(cell, x, y, cornerX, cornerY){
    cell.set({
      position: { x: x, y: y },
      size: { width: cornerX - x, height: cornerY - y }
    });
  },

  getTextWidth(text, fontSize, fontWeight, fontFamily){
    return common.width(text, {
      family: fontFamily,
      size: fontSize,
      weight: fontWeight
    });
  },

  getTextHeight(text, fontSize, fontWeight, fontFamily){
    return common.height(text, {
      family: fontFamily,
      size: fontSize,
      weight: fontWeight
    }).height;
  },

  getParagraphWidth(text, cell){
    var size;
    var textArray = text.split('\n');
    var maxLineWidth = 0;
    for(var i=0; i<textArray.length; i++) {
      var textWidth = this.getTextWidth(textArray[i], cell.attributes.attrs.text['font-size'], cell.attributes.attrs.text['font-weight'], cell.attributes.attrs.text['font-family']);
      if(textWidth > maxLineWidth)
        maxLineWidth = textWidth;
    }
    return maxLineWidth;
  },

  getParagraphHeight(text,cell){
    var textArray = text.split('\n');
    var textHeight = this.getTextHeight(textArray[0], cell.attributes.attrs.text['font-size'], cell.attributes.attrs.text['font-weight'], cell.attributes.attrs.text['font-family']);
    return textArray.length * textHeight;
  },

  wrapTextAfterSizeChange(cell){
    var textString = cell.attributes.attrs.text.text;
    textString = textString.replace(/(\n\s*\n)|\n/g, "$1 ");  //remove line seperators
    textString = textString.replace(/ +(?= )/g,''); //replace multiple white spaces with a single one
    var cellWidth = cell.get('size').width;
    textString = common.joint.util.breakText(textString, {width: cellWidth}, {'font-size': cell.attributes.attrs.text['font-size']}); //break the text
    //units have to be bellow the object's name
    if(textString.includes('[') && !textString.includes('\n[')){
      textString = textString.replace('[', '\n[');
      if(textString.includes('[\n')){
        textString = textString.replace('[\n', '[');
      }
    }
    if(textString != cell.attributes.attrs.text.text)  cell.attr({text: {text: textString}});
  },

  startWrapping(paper, cell){
    if (!cell.get('originalSize')) cell.set('originalSize', cell.get('size')); //store original/default size
    if (!cell.get('originalPosition')) cell.set('originalPosition', cell.get('position')); //store original/default size
    var textString = cell.attributes.attrs.text.text;
    var textWidth = this.getParagraphWidth(textString, cell);
    var textHeight = this.getParagraphHeight(textString, cell);
    var cellWidth = cell.get('size').width;
    var cellHeight = cell.get('size').height;
    var updateSize = false;   //flag for deciding if the size need to be updated
    var textForUpdating = textString;
    var newText = textString.replace(/(\n\s*\n)|\n/g, "$1 ");  //remove line seperators
    if((textWidth < cellWidth) && (textHeight < cellHeight)) {
     newText = common.joint.util.breakText(textString, {width: cellWidth/1.1}, {'font-size': cell.attributes.attrs.text['font-size']}); //break the text
      var newTextWidth = this.getParagraphWidth(newText, cell);
      var newTextHeight = this.getParagraphHeight(newText, cell);
      while ((newTextWidth < (cellWidth/1.1)) && (newTextHeight < (cellHeight/1.1)) && (cellHeight/1.1 >= 50) && (cellWidth/1.1 >=90)) {
        cellWidth = cellWidth/1.1;
        cellHeight = cellHeight/1.1;
        updateSize = true;
        textForUpdating = newText;
        newText = textString.replace(/(\n\s*\n)|\n/g, "$1 ");
        newText = common.joint.util.breakText(textString, {width: cellWidth/1.1}, {'font-size': cell.attributes.attrs.text['font-size']}); //break the text
        newTextWidth = this.getParagraphWidth(newText, cell);
        newTextHeight = this.getParagraphHeight(newText, cell);
      }
    }
    else {
      newText = common.joint.util.breakText(newText, {width: cellWidth}, {'font-size': cell.attributes.attrs.text['font-size']}); //break the text
      var newTextWidth = this.getParagraphWidth(newText, cell);
      var newTextHeight = this.getParagraphHeight(newText, cell);
      textForUpdating = newText;

      while ((newTextWidth > cellWidth) || (newTextHeight > cellHeight)) {
        cellWidth = 1.1*cellWidth;
        cellHeight = 1.1*cellHeight;
        newText = textString.replace(/(\n\s*\n)|\n/g, "$1 ");
        newText = common.joint.util.breakText(newText, {width: cellWidth}, {'font-size': cell.attributes.attrs.text['font-size']}); //break the text
        var newTextWidth = this.getParagraphWidth(newText, cell);
        var newTextHeight = this.getParagraphHeight(newText, cell);
        if ((newTextWidth <= cellWidth) && (newTextHeight <= cellHeight)) {
          updateSize = true;
          textForUpdating = newText;
        }
      }
    }
    //units have to be bellow the object's name
    if(textForUpdating.includes('[') && !textForUpdating.includes('\n[')){
      textForUpdating = textForUpdating.replace('[', '\n[');
      if(textForUpdating.includes('[\n')){
        textForUpdating = textForUpdating.replace('[\n', '[');
      }
      if(this.getParagraphHeight(textForUpdating, cell) > cellHeight)
        cellHeight = this.getParagraphHeight(textForUpdating, cell);
    }
    if(updateSize){
      var newY = cell.get('position').y - (cellHeight - cell.get('size').height)/2;
      var newCornerY = newY+cellHeight;
      var newX = cell.get('position').x - (cellWidth - cell.get('size').width)/2;
      var newCornerX = newX+cellWidth;
      this.updateCell(cell, newX, newY, newCornerX, newCornerY);
    }
    if (textForUpdating != textString) {
      cell.attr({text: {text: textForUpdating}});
    }
  }
};
