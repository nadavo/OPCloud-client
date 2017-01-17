export class ModelObject {
  name: string;
  modelData: any;

  constructor(name: string, modelData: any) {
    this.name = name;
    this.modelData = modelData;
  }

  saveModel(newName, newModel) {
    this.name = newName;
    this.modelData = newModel;
  }

}