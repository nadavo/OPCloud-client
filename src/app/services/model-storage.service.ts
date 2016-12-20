import { Injectable } from '@angular/core';

const modelStorageName = 'OPCloud_Models';

@Injectable()
export class ModelStorageService {
  models;

  constructor() {
    this.models = JSON.parse(localStorage.getItem(modelStorageName)) || {};
  }

  get(modelName) {
    if (!this.models[modelName]) {
      alert('no model exists in this name');
      return;
    }
    return new ModelObject(modelName, this.models[modelName]);
  }

  save(modelObject: ModelObject) {
    this.models[modelObject.name] = modelObject.modelData;
    try {
      localStorage.setItem(modelStorageName, JSON.stringify(this.models));
      console.log(`model ${modelObject.name} was saved in localStorage`);
    } catch (e) {
      console.error('error while saving to localStorage', e);
    }
  }

}

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