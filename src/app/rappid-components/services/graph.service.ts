import { Injectable } from '@angular/core';
import { ModelObject } from '../../services/storage/model-object.class';
import { ModelStorageInterface } from '../../services/storage/model-storage.interface';
const joint = require('rappid');
const rootId="SD";
const firebaseKeyEncode = require('firebase-key-encode');


@Injectable()
export class GraphService {
  graph;
  graphLinks;
  currentGraphId;
  modelObject;
  modelStorage;
  private JSON;
  private JSON_string;
  private modelToSync;
  // private OPL;
  // private modelName;


  constructor(modelStorage: ModelStorageInterface) {
    this.modelStorage = modelStorage;
    this.graph = new joint.dia.Graph;
    this.JSON = this.graph.toJSON();
    localStorage.setItem(rootId, JSON.stringify(this.graph.toJSON()));
    this.currentGraphId = rootId;
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

  }

  getGraph(name?: string) {

    return name ? this.loadGraph(name) : this.graph;
  }

  saveGraph(modelName) {
    debugger;
    console.log('inside saveModel func')
    // TODO: work on this.graph.modelObject - might be JSON
    this.modelObject.saveModelParam(modelName, firebaseKeyEncode.deepEncode(this.JSON));
    this.modelStorage.save(this.modelObject);
  }

  loadGraph(name) {
    debugger;
    this.modelStorage.get(name).then((res) => {
      debugger;
      this.modelObject = res;
      this.graph.fromJSON(firebaseKeyEncode.deepDecode(this.modelObject.modelData));
    });
  }

  updateJSON() {
    this.JSON = this.graph.toJSON();
  //  this.JSON_string = JSON.stringify(this.JSON);
    // TODO: should add OPL sync to the DB
    // this.modelToSync = { graph: this.JSON_string };
    if (this.modelObject.name !== null) {
       // update DB
      console.log('go to FB');
      this.modelStorage.save(this.modelObject);
      this.saveGraph(this.modelObject.name); //DM
    }
    else {
      localStorage.setItem(this.modelObject.name, this.modelToSync);
    }
  }

//   this.fireDB.ref('/models/' + this.modelName).on('value', function (snapshot) {
//   getModel(snapshot.val());
// });

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

  getGraphById(ElementId: string) {
    this.graph.fromJSON(JSON.parse(localStorage.getItem(ElementId)));
  }

  removeGraphById(ElementId: string,ParentId: string) {
     this.changeGraphModel(ParentId);
    localStorage.removeItem(ElementId);
  }

  graphSetUpdate(ElementId: string) {
    localStorage.setItem(this.currentGraphId, JSON.stringify(this.graph.toJSON()));
    var newGraph = new joint.dia.Graph;
    this.copyConntectedGraphElements(newGraph,ElementId);
    newGraph=newGraph.toJSON();
    localStorage.setItem(ElementId, JSON.stringify(newGraph));
    this.graph.fromJSON(newGraph);
    this.currentGraphId = ElementId;
  }

  //star

  private copyConntectedGraphElements(newGraph,elementId)
  {
    let gCell=this.graph.getCell(elementId);
    let connctedCells=this.graph.getNeighbors(gCell);
    newGraph.addCells(connctedCells);
    this.graphLinks = this.graph.getConnectedLinks(gCell);
  }

  changeGraphModel(elementId) {
    if (elementId == this.currentGraphId)
      return 0;
    localStorage.setItem(this.currentGraphId, JSON.stringify(this.graph.toJSON()));
    this.graph.fromJSON(JSON.parse(localStorage.getItem(elementId)));
    this.currentGraphId = elementId;
  }


}
