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
    cell.attributes.attrs.manuallyResized = true;
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
  }
};
