import { Injectable, Inject } from '@angular/core';
import { ModelStorageInterface } from './model-storage.interface';
import { ModelObject } from './model-object.class';
import { FirebaseObjectObservable, AngularFire, FirebaseApp } from 'angularfire2';
const firebaseKeyEncode = require('firebase-key-encode');

@Injectable()
export class ModelFbStorageService extends ModelStorageInterface {
  models = [];
  fbModels;
  fbCurrentModel: FirebaseObjectObservable<any>;

  constructor(private af: AngularFire, @Inject(FirebaseApp) private fb: any) {
    super();
    this.fbModels = af.database.object('/modelnames');
  }

  get(modelName: string): any {
    let ref = this.fb.database().ref(`/models/${modelName}`);
    return ref.once('value')
      .then((snapshot) => {
        return new ModelObject(modelName, snapshot.val());
      });
  }

  listen(modelName: string, graph): any {
    let ref = this.fb.database().ref(`/models/${modelName}`);
    ref.on('value', function (snapshot) {
      var json = snapshot.val();
      firebaseKeyEncode.deepDecode(json)
      graph.fromJSON(json);
    });
  }

  getAndListen(modelName: string, graph): any {
    var newValue = this.get(modelName);
    this.listen(modelName, graph);
    return newValue;
  }

  save(modelObject: ModelObject): any {
    this.fbModels.update({ [modelObject.name]: true });
    this.fbCurrentModel = this.af.database.object(`/models/${modelObject.name}`);
    this.fbCurrentModel.set(modelObject.modelData);
  }

  getModels(): Array<string> {
    let ref = this.fb.database().ref('/modelnames');
    return ref.once('value')
      .then((snapshot) => {
        return this.models = Object.keys(snapshot.val());
      });
  }
}
