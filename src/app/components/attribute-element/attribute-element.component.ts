import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
// import { AttributeElements } from '@gooddata/react-components';
import { employeeNameIdentifier, projectId } from '../../../utils/fixtures';

import { AttributeElements } from "@gooddata/sdk-ui-filters";
import { attributeDisplayFormRef } from "@gooddata/sdk-model";
import { Ldm } from "../../../ldm";
import { workspace } from "../../../utils/fixtures";
import bearFactory, { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";
const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());


interface AttributeElement {
  title: any;
  uri: any;
  backend?: any;
  workspace?: any;
}

export class AttributeFilterItem extends React.Component<AttributeElement> {
  onChange(uri) {
    return event => console.log("AttributeFilterItem onChange", uri, event.target.value === "on");
  };

  render() {
    const { title, uri } = this.props;
    return (
      React.createElement("label", {
        className: "gd-list-item s-attribute-filter-list-item",
        style: {
          display: "inline-flex"
        }
      }, React.createElement("input", {
        type: "checkbox",
        className: "gd-input-checkbox",
        onChange: this.onChange(uri)
      }), React.createElement("span", null, title)));

  };
}

@Component({
  selector: 'app-attribute-element',
  templateUrl: './attribute-element.component.html',
})

export class AttributeElementComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  public rootDomID: string;
  isLoading: any;
  offset: any;
  count: any;
  totalCount: any;
  nextOffset: any;
  loadMore: any;
  validElements: any[];
  disabled: boolean = this.isLoading || this.offset + this.count === this.totalCount;
  

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  buildAttributeFilterItem(item) {
    const { title, uri } = item;

    return React.createElement(AttributeFilterItem, {
      key: uri,
      uri: uri,
      title: title
    });
  }
  
  render() {
    ReactDOM.render(React.createElement(AttributeElements, 
      {
        displayForm: attributeDisplayFormRef(Ldm.EmployeeName.Default),
        backend: backend,
        workspace: workspace,
        limit: 20,
      }, ({ validElements, loadMore, isLoading, error }) => {
        const { offset = null, items = null, totalCount = null } = validElements ? validElements : {};

      console.log(validElements);
      if (error) {
        return React.createElement("div", null, error);
      }
      const count = items ? items.length : undefined;

      return this.loadMore = loadMore,
        this.isLoading = isLoading.toString(),
        this.offset = offset,
        this.count = count,
        this.totalCount = totalCount,
        this.nextOffset = offset + count,
        React.createElement("div", null,
          React.createElement("div", null, validElements ? validElements.items.map(this.buildAttributeFilterItem) : null),
          validElements ? React.createElement("pre", null, JSON.stringify(validElements, null, "  ")) : null)

    }), this.getRootDomNode())
  }

  ngOnInit() {
    this.rootDomID = uuid.v4();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}
