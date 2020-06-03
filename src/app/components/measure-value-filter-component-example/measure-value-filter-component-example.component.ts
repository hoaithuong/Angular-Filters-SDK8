import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
// import { PivotTable, Model, MeasureValueFilter } from '@gooddata/react-components';

import { MeasureValueFilter } from "@gooddata/sdk-ui-filters";
import { PivotTable } from "@gooddata/sdk-ui-pivot";
import { newMeasureValueFilter, measureIdentifier, idRef } from "@gooddata/sdk-model";
import { measureLocalId } from "@gooddata/sdk-model";
import { Ldm, LdmExt } from "../../../ldm";
import { workspace } from "../../../utils/fixtures";
import bearFactory, { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";
const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());


export interface PivotTableBucketProps {
  backend: any;
  workspace: any;
  measures: any[];
  rows?: any[];
  filters?: any[];
}

export interface MeasureValueFilterProps {
  backend: any;
  workspace: any;
  onApply: any;
  filter: any;
  buttonTitle: string;
  measureIdentifier: any;
}

@Component({
  selector: 'app-measure-value-filter-component-example',
  templateUrl: './measure-value-filter-component-example.component.html',
  styleUrls: ['./measure-value-filter-component-example.component.css']
})

export class MeasureValueFilterComponentExampleComponent implements OnInit {
  public rootDomID: string;
  public rootDomIDData: string;
  ref: React.RefObject<any>;
  filters: any[];
  filterValue: any;

  measureTitle = "Franchised Sales";
  totalSales = [LdmExt.FranchisedSales];
  locationResort = [Ldm.LocationName.Default];

  // locationResort = Model.attribute(locationNameDisplayFormIdentifier);
  // totalSales = [Model.measure(franchisedSalesIdentifier)
    // .localIdentifier('franchisedSalesIdentifier')
    // .format("#,##0")
    // .title("Franchised Sales")];
  // defaultMeasureValueFilter = Model.measureValueFilter('franchisedSalesIdentifier')

  state = {
    filters: [],
  };

  onApply = filter => {
    this.filters = [filter];
    this.filterValue = filter;
    this.state = {
      filters: []
    }
    this.render();
    // this.renderPivotTable([filter]);
  };

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getTableDataNode() {
    const node = document.getElementById(this.rootDomIDData);
    invariant(node, `Node '${this.rootDomIDData} not found!`);
    return node;
  }

  protected getMeasureValueProps(): MeasureValueFilterProps {
    const { filters } = this.state;
    return {
      workspace: workspace,
      backend: backend,
      filter: this.filterValue ? this.filterValue : filters[0],
      onApply: this.onApply,
      buttonTitle: this.measureTitle,
      measureIdentifier: measureLocalId(LdmExt.FranchisedSales)
    };
  }

  protected getPivotTableProps(filters): PivotTableBucketProps {
    // const { filters } = this.state;
    return {
      workspace: workspace,
      backend: backend,
      measures: this.totalSales,
      rows: this.locationResort,
      filters: filters,
    };
  }

  protected render() {
    this.renderFilterValue();
    this.renderPivotTable(this.filters);
  }

  public renderFilterValue() {
    ReactDOM.render(React.createElement(MeasureValueFilter, this.getMeasureValueProps()), this.getRootDomNode());
  }

  public renderPivotTable(filters) {
    ReactDOM.render(React.createElement(PivotTable, this.getPivotTableProps(filters)), this.getTableDataNode());
  }

  ngOnInit() {
    this.rootDomID = uuid.v4();
    this.rootDomIDData = uuid.v4();
    this.ref = React.createRef();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    this.render();
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    //ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }
  
}
