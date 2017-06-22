import { Injectable } from '@angular/core';
import {Node} from '../models/node.model';
import { GraphService } from '../rappid-components/services/graph.service';

import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/Rx';

import * as _ from 'lodash';

const { find } = _;
const rootId="SD";


@Injectable()
export class TreeViewService {
  nodes: Node[] = [];
  private nodesSubject: BehaviorSubject<Node[]> = new BehaviorSubject<Node[]>(this.nodes);
  parentNode: any;



  constructor(private graphService: GraphService) {

     this.parentNode = new Node({
       className: 'root-class',
       expanded: true,
       children: [],
       id: rootId,
       name: rootId,
       parent: rootId,
     });
    this.nodes.push(this.parentNode);
  }


  getNodes(): Observable<Node[]>{
    return this.nodesSubject.asObservable();
  }

  insertNode(cellModelRef)
  {
    let element_id=cellModelRef.id;
    let parent_id=cellModelRef.get('parent')?cellModelRef.get('parent'):rootId;
    let parentNode=this.getNodeById(parent_id);
    var newNode = new Node({
      className: 'root-class',
      expanded: true,
      children: [],
      id: element_id,
      name: 'SD',
      parent: parentNode,
    });
    this.graphService.graphSetUpdate(element_id);
    parentNode.addChildren(newNode);
    console.log('the nodes');
    console.log(this.nodes);
    this.nodesSubject.next(this.nodes);
  }




  removeNode(nodeId){

    let node=this.getNodeById(nodeId);
    this.removeNodeFromTree(this.nodes[0],nodeId,this);
    if (node!=null){
      console.log(node.parent.id);
      this.graphService.removeGraphById(nodeId,node.parent.id);
    }

    this.nodesSubject.next(this.nodes);
  }

  removeNodeFromTree(parent, childNameToRemove,_this){
  parent.children = parent.children
    .filter(function(child){ return child.id !== childNameToRemove})
    .map(function(child){ return _this.removeNodeFromTree(child, childNameToRemove)});
  return parent;
  }



  getNodeById(id) {
    if (id==rootId)
      return this.nodes[0];
    const idStr = id.toString();
    return this.getNodeBy((node) => node.id.toString() === idStr);
  }

  getNodeBy(predicate, startNode = this.nodes[0]) {
    startNode = startNode;

    if (!startNode.children) return null;
    const found = find(startNode.children, predicate);
    if (found) { // found in children
      return found;
    } else { // look in children's children
      for (let child of startNode.children) {
        const foundInChildren = this.getNodeBy(predicate, child);
        if (foundInChildren) return foundInChildren;
      }
    }
  }


}

