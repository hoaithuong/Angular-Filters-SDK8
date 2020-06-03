import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
// import { AttributeFilter, Model } from '@gooddata/react-components';
import { VisualizationInput } from '@gooddata/typings';

import { AttributeFilter } from "@gooddata/sdk-ui-filters";
import { attributeIdentifier,  newPositiveAttributeFilter } from "@gooddata/sdk-model";
import { Ldm, LdmExt } from "../../../ldm";
import { workspace } from "../../../utils/fixtures";
import bearFactory, { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";
const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());


let self: any;

interface AttributeFilterProps {
  identifier: any;
  fullscreenOnMobile: boolean;
  onApply: any;
  backend: any;
  workspace: any;
  titleWithSelection: boolean;
}

interface AttributeFilterDefinitionProps {
  filter: any;
  fullscreenOnMobile: boolean;
  onApply: any;
  backend: any;
  workspace: any;
}

interface AttributeFilterOnApplyWithFilterDefinitionProps {
  filter: any;
  fullscreenOnMobile: boolean;
  onApplyWithFilterDefinition: any;
  backend: any;
  workspace: any;
  onApply: any;
}

@Component({
  selector: 'app-attribute-filter',
  templateUrl: './attribute-filter.component.html',
})

export class AttributeFilterComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  public rootDomID: string;
  public rootFilterByURI: string;
  public rootFilterDefinition: string;
  public rootOnApplyWithFilterDefinition: string;

  filter = newPositiveAttributeFilter(Ldm.EmployeeName.Default, ['Abbie Adams']);

  onApply(...params) {
    // tslint:disable-next-line:no-console
    console.log("AttributeFilterComponentExample onApply", ...params);
  }

  onApplyWithFilterDefinition = filter => {
    self.message = null;
    console.log('NewAttributeFilterComponent onApplyWithFilterDefinition', filter);
    const isPositiveFilter = VisualizationInput.isPositiveAttributeFilter(filter);
    const inType = isPositiveFilter ? 'in' : 'notIn';
    const filterItems = isPositiveFilter
      ? filter.newPositiveAttributeFilter[inType]
      : filter.newNegativeAttributeFilter[inType];
    if (!filterItems.length && isPositiveFilter) {
      self.message = 'The filter must have at least one item selected';
    } else {
      self.filters = [filter];
    }
  }

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getRootFilterDefinition() {
    const node = document.getElementById(this.rootFilterDefinition);
    invariant(node, `Node rootFilterDefinition not found!`);
    return node;
  }


  protected getRootOnApplyWithFilterDefinition() {
    const node = document.getElementById(this.rootOnApplyWithFilterDefinition);
    invariant(node, `Node rootOnApplyWithFilterDefinition not found!`);
    return node;
  }

  protected getProps(): AttributeFilterProps {
    return {
      workspace: workspace,
      backend: backend,
      identifier: attributeIdentifier(Ldm.EmployeeName.Default),
      onApply: this.onApply,
      fullscreenOnMobile: false,
      titleWithSelection: true,
    };
  }

  // attributefilter is not use attributeuri in SDK8

  protected getFilterDefinition(): AttributeFilterDefinitionProps {
    return {
      workspace: workspace,
      backend: backend,
      filter: this.filter,
      onApply: this.onApply,
      fullscreenOnMobile: false,
    };
  }

  protected getOnApplyWithFilterDefinition(): AttributeFilterOnApplyWithFilterDefinitionProps {
    return {
      workspace: workspace,
      backend: backend,
      filter: this.filter,
      onApplyWithFilterDefinition: this.onApplyWithFilterDefinition,
      fullscreenOnMobile: false,
      onApply: this.onApply,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  private isMounted2(): boolean {
    return !!this.rootFilterDefinition;
  }

  private isMounted3(): boolean {
    return !!this.rootOnApplyWithFilterDefinition;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(AttributeFilter, this.getProps()), this.getRootDomNode());
    }
  }

  protected renderFilterDefinition() {
    if (this.isMounted2()) {
      ReactDOM.render(React.createElement(AttributeFilter, this.getFilterDefinition()), this.getRootFilterDefinition());
    }
  }

  protected renderAttributeFilterApplyWithFilterDefinition() {
    if (this.isMounted3()) {
      // tslint:disable-next-line: max-line-length
      ReactDOM.render(React.createElement(AttributeFilter, this.getOnApplyWithFilterDefinition()), this.getRootOnApplyWithFilterDefinition());
    }
  }

  ngOnInit() {
    self = this;
    this.rootDomID = uuid.v4();
    this.rootFilterByURI = uuid.v4();
    this.rootFilterDefinition = uuid.v4();
    this.rootOnApplyWithFilterDefinition = uuid.v4();
  }

  ngOnChanges() {
    this.render();
    this.renderFilterDefinition();
    this.renderAttributeFilterApplyWithFilterDefinition();
  }

  ngAfterViewInit() {
    this.render();
    this.renderFilterDefinition();
    this.renderAttributeFilterApplyWithFilterDefinition();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}
