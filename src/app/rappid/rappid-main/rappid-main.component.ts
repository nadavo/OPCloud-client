import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GraphService } from '../services/graph.service';
import { haloConfig } from '../../config/halo.config';
import { toolbarConfig } from '../../config/toolbar.config';
import { opmShapes } from '../../config/opm-shapes.config';
import { opmRuleSet } from '../../config/opm-validator.config';
import { MdDialog } from '@angular/material';
import { ChooseLinkDialogComponent } from '../../dialogs/choose-link-dialog/choose-link-dialog.component';

const joint = require('rappid');

const $ = require('jquery')
// window.jQuery = $;
const _ = require('lodash')

@Component({
  selector: 'opcloud-rappid-main',
  template: `
    <div class="rappid-main rappid" #rappidContainer>
      <!--<opcloud-rappid-toolbar></opcloud-rappid-toolbar>-->
      <opcloud-rappid-stencil [graph]="graph" [paper]="paper" [paperScroller]="paperScroller"></opcloud-rappid-stencil>
      <opcloud-rappid-paper [paper]="paper" [paperScroller]="paperScroller"></opcloud-rappid-paper>
      <opcloud-rappid-inspector [cell]="cell"></opcloud-rappid-inspector>
      <div class="statusbar-container"></div>
    </div>
  `,
  styleUrls: ['./rappid-main.component.css']
})
export class RappidMainComponent implements OnInit {
  graph = null;
  paper;
  cell;
  commandManager;
  private snaplines;
  private paperScroller;
  private keyboard;
  private clipboard;
  private selection;
  private navigator;
  private toolbar;
  private validator;

  @ViewChild('rappidContainer', { read: ViewContainerRef }) rappidContainer;

  constructor(graphService:GraphService, private _dialog: MdDialog) {
    this.graph = graphService.getGraph();
  }

  ngOnInit() {
    this.initializePaper();
    this.initializeValidator();
    this.initializeSelection();
    this.initializeHaloAndInspector();
    this.initializeNavigator();
    this.initializeToolbar();
    this.initializeKeyboardShortcuts();
    this.initializeTooltips();
    this.handleAddLink();
  }

  handleAddLink() {
    this.graph.on('add', (cell) => {
      if (cell.attributes.type === 'opm.Link') {
        cell.on('change:target change:source', (link) => {
          if (link.attributes.source.id && link.attributes.target.id) {
            let dialogRef = this._dialog.open(ChooseLinkDialogComponent, {viewContainerRef: this.rappidContainer});
            dialogRef.componentInstance.newLink = link;
            dialogRef.componentInstance.linkSource = link.getSourceElement();
            dialogRef.componentInstance.linkTarget = link.getTargetElement();

            dialogRef.afterClosed().subscribe(result => {
              if (!!result) {
                console.log('chosen link: ', result);
              }
            });
          }
        });
      }
    });
  }

  initializePaper() {

    this.graph.on('add', (cell, collection, opt) => {
      if (opt.stencil) {
        this.cell = cell;
      }
    });

    this.commandManager = new joint.dia.CommandManager({ graph: this.graph });

    var paper = this.paper = new joint.dia.Paper({
      width: 1000,
      height: 1000,
      gridSize: 10,
      drawGrid: true,
      model: this.graph,
      defaultLink: new opmShapes.Link
    });

    paper.on('blank:mousewheel', _.partial(this.onMousewheel, null), this);
    paper.on('cell:mousewheel', this.onMousewheel, this);


    var paperScroller = this.paperScroller = new joint.ui.PaperScroller({
      paper: paper,
      autoResizePaper: true,
      cursor: 'grab'
    });

    /// $('.paper-container').append(paperScroller.el);
    paperScroller.render().center();
  }


  initializeValidator() {
    this.validator = new joint.dia.Validator({commandManager: this.commandManager});
    opmRuleSet(this.validator, this.graph);
  }

  initializeKeyboardShortcuts() {

    this.keyboard = new joint.ui.Keyboard();
    this.keyboard.on({

      'ctrl+c': function () {
        // Copy all selected elements and their associated links.
        this.clipboard.copyElements(this.selection.collection, this.graph);
      },

      'ctrl+v': function () {

        var pastedCells = this.clipboard.pasteCells(this.graph, {
          translate: { dx: 20, dy: 20 },
          useLocalStorage: true
        });

        var elements = _.filter(pastedCells, function (cell) {
          return cell.isElement();
        });

        // Make sure pasted elements get selected immediately. This makes the UX better as
        // the user can immediately manipulate the pasted elements.
        this.selection.collection.reset(elements);
      },

      'ctrl+x shift+delete': function () {
        this.clipboard.cutElements(this.selection.collection, this.graph);
      },

      'delete backspace': function (evt) {
        evt.preventDefault();
        this.graph.removeCells(this.selection.collection.toArray());
      },

      'ctrl+z': function () {
        this.commandManager.undo();
        this.selection.cancelSelection();
      },

      'ctrl+y': function () {
        this.commandManager.redo();
        this.selection.cancelSelection();
      },

      'ctrl+a': function () {
        this.selection.collection.reset(this.graph.getElements());
      },

      'ctrl+plus': function (evt) {
        evt.preventDefault();
        this.paperScroller.zoom(0.2, { max: 5, grid: 0.2 });
      },

      'ctrl+minus': function (evt) {
        evt.preventDefault();
        this.paperScroller.zoom(-0.2, { min: 0.2, grid: 0.2 });
      },

      'keydown:shift': function (evt) {
        this.paperScroller.setCursor('crosshair');
      },

      'keyup:shift': function () {
        this.paperScroller.setCursor('grab');
      }

    }, this);
  }


  initializeSelection() {

    this.clipboard = new joint.ui.Clipboard();
    this.selection = new joint.ui.Selection({ paper: this.paper });

    // Initiate selecting when the user grabs the blank area of the paper while the Shift key is pressed.
    // Otherwise, initiate paper pan.
    this.paper.on('blank:pointerdown', function (evt, x, y) {

      if (this.keyboard.isActive('shift', evt)) {
        this.selection.startSelecting(evt);
      } else {
        this.selection.cancelSelection();
        this.paperScroller.startPanning(evt, x, y);
      }

    }, this);

    this.paper.on('element:pointerdown', function (elementView, evt) {

      // Select an element if CTRL/Meta key is pressed while the element is clicked.
      if (this.keyboard.isActive('ctrl meta', evt)) {
        this.selection.collection.add(elementView.model);
      }

    }, this);

    this.selection.on('selection-box:pointerdown', function (elementView, evt) {

      // Unselect an element if the CTRL/Meta key is pressed while a selected element is clicked.
      if (this.keyboard.isActive('ctrl meta', evt)) {
        this.selection.collection.remove(elementView.model);
      }

    }, this);
  }


  initializeHaloAndInspector() {

    this.paper.on('element:pointerup link:options', function (cellView) {

      var cell = cellView.model;

      if (!this.selection.collection.contains(cell)) {

        if (cell.isElement()) {

          new joint.ui.FreeTransform({
            cellView: cellView,
            allowRotation: false,
            preserveAspectRatio: !!cell.get('preserveAspectRatio'),
            allowOrthogonalResize: cell.get('allowOrthogonalResize') !== false
          }).render();

          new joint.ui.Halo({
            cellView: cellView,
            handles: haloConfig.handles
          }).render();

          this.selection.collection.reset([]);
          this.selection.collection.add(cell, { silent: true });
        }

        this.cell = cell;
      }
    }, this);
  }


  initializeNavigator() {
    this.navigator = new joint.ui.Navigator({
      width: 240,
      height: 115,
      paperScroller: this.paperScroller,
      zoom: false
    });

    // $('.navigator-container').append(navigator.el);
    // navigator.render();
  }


  initializeToolbar() {

    var toolbar = this.toolbar = new joint.ui.Toolbar({
      groups: toolbarConfig.groups,
      tools: toolbarConfig.tools,
      references: {
        paperScroller: this.paperScroller,
        commandManager: this.commandManager
      }
    });

    toolbar.on({
      'svg:pointerclick': _.bind(this.openAsSVG, this),
      'png:pointerclick': _.bind(this.openAsPNG, this),
      'fullscreen:pointerclick': _.bind(joint.util.toggleFullScreen, joint.util, document.body),
      'to-front:pointerclick': _.bind(this.selection.collection.invoke, this.selection.collection, 'toFront'),
      'to-back:pointerclick': _.bind(this.selection.collection.invoke, this.selection.collection, 'toBack'),
      'layout:pointerclick': _.bind(this.layoutDirectedGraph, this),
      // 'snapline:change': _.bind(this.changeSnapLines, this),
      'clear:pointerclick': _.bind(this.graph.clear, this.graph),
      'print:pointerclick': _.bind(this.paper.print, this.paper),
      'grid-size:change': _.bind(this.paper.setGridSize, this.paper)
    });

    // $('.toolbar-container').append(toolbar.el);
    // toolbar.render();
  }


  changeSnapLines(checked) {

    /*if (checked) {
      this.snaplines.startListening();
      this.stencil.options.snaplines = this.snaplines;
    } else {
      this.snaplines.stopListening();
      this.stencil.options.snaplines = null;
    }*/
  }


  initializeTooltips() {

    new joint.ui.Tooltip({
      rootTarget: document.body,
      target: '[data-tooltip]',
      direction: 'auto',
      padding: 10
    });
  }

  openAsSVG() {

    this.paper.toSVG(function (svg) {
      new joint.ui.Lightbox({
        title: '(Right-click, and use "Save As" to save the diagram in SVG format)',
        image: 'data:image/svg+xml,' + encodeURIComponent(svg)
      }).open();
    }, { preserveDimensions: true, convertImagesToDataUris: true });
  }


  openAsPNG() {

    this.paper.toPNG(function (dataURL) {
      new joint.ui.Lightbox({
        title: '(Right-click, and use "Save As" to save the diagram in PNG format)',
        image: dataURL
      }).open();
    }, { padding: 10 });
  }


  onMousewheel(cellView, evt, x, y, delta) {

    if (this.keyboard.isActive('alt', evt)) {
      this.paperScroller.zoom(delta / 10, { min: 0.2, max: 5, ox: x, oy: y });
    }
  }


  layoutDirectedGraph() {

    joint.layout.DirectedGraph.layout(this.graph, {
      setLinkVertices: true,
      rankDir: 'TB',
      marginX: 100,
      marginY: 100
    });

    this.paperScroller.centerContent();
  }
}
