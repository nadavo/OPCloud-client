import { Injectable } from '@angular/core';
import { ModelObject } from '../../services/storage/model-object.class';
import { ModelStorageInterface } from '../../services/storage/model-storage.interface';
const joint = require('rappid');


@Injectable()
export class GraphService {
  graph;
  modelObject;
  modelStorage;
  private JSON;
  private JSON_string;
  private modelToSync;
  private OPL;
  private modelName;


  constructor(modelStorage: ModelStorageInterface) {
    this.modelStorage = modelStorage;
    this.graph = new joint.dia.Graph;
    // this.initializeDatabase();
    // TODO: change:position emits on mousemove, find a better event - when drag stopped
    this.graph.on(`add 
                  remove 
                  change:position 
                  change:attrs 
                  change:size 
                  change:angle`,
      () => this.updateJSON());
     this.modelObject = new ModelObject(null, null);
    // this.modelName = this.modelObject.name;
  }

  getGraph(name?: string) {

    return name ? this.loadGraph(name) : this.graph;
  }

  saveGraph(modelName) {
    debugger;
    console.log('inside saveModel func')
    this.modelObject.saveModelParam(modelName, this.graph.toJSON());
    this.modelStorage.save(this.modelObject);
  }

  loadGraph(name) {
    this.modelStorage.get(name).then((res) => {
      this.modelObject = res;
      this.graph.fromJSON(this.modelObject.modelData);
    });
  }

  updateJSON() {
    this.JSON = this.graph.toJSON();
    this.JSON_string = JSON.stringify(this.JSON);
    this.modelToSync = { graph: this.JSON_string, opl: this.OPL };
    console.log(this.modelName)
    if (this.modelName !== null) {
       // update DB
      console.log(this.modelName)
      console.log('go to FB');
      // this.modelStorage.save(this.modelToSync);
    }
    else {
      localStorage.setItem(this.modelName, this.modelToSync);
    }
  }

   /*
   _.bind(this.graph.updateModel, this.graph);
   this.graph.listen = function () {
   function getModel(model) {
   if (app.graph.myChangeLock) {
   //console.log('my change');
   app.graph.myChangeLock = false;
   return;
   }
   app.graph.JSON_string = model.graph;
   app.graph.JSON = JSON.parse(app.graph.JSON_string);
   app.graph.fromJSON(JSON.parse(app.graph.JSON_string));
   app.graph.OPL = model.opl;
   document.getElementById("opl").innerHTML = app.graph.OPL;
   };
   if (this.modelName !== 'undefined') {
   this.fireDB.ref('/models/' + this.modelName).on('value', function (snapshot) {
   getModel(snapshot.val());
   });
   }
   };
   _.bind(this.graph.listen, this.graph);
   this.graph.listen();
   }*/

}
