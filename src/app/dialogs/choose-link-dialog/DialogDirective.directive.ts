import {Directive, ComponentFactoryResolver, ComponentFactory, ComponentRef} from '@angular/core';

import {ViewContainerRef} from '@angular/core';
import {DialogComponent} from './Dialog.component';

@Directive({
  selector: '[dialogdirective]'
})
export class DialogDirective {
  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  createDialog(dialogComponent: { new(): DialogComponent }): ComponentRef<DialogComponent> {
    this.viewContainer.clear();

    let dialogComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(dialogComponent);
    let dialogComponentRef = this.viewContainer.createComponent(dialogComponentFactory);

    dialogComponentRef.instance.close.subscribe(() => {
      dialogComponentRef.destroy();
    });


    return dialogComponentRef;
  }
}
