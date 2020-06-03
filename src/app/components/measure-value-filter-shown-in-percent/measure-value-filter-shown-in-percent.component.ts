import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
// import { PivotTable, Model } from '@gooddata/react-components';

import { PivotTable } from "@gooddata/sdk-ui-pivot";
import { Ldm, LdmExt } from "../../../ldm";
import { newMeasureValueFilter } from "@gooddata/sdk-model";
import { newPositiveAttributeFilter, newNegativeAttributeFilter } from "@gooddata/sdk-model";
import { workspace } from "../../../utils/fixtures";
import bearFactory, { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";
const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());

import { projectId, locationNameDisplayFormIdentifier, franchisedSalesIdentifier }
  from '../../../utils/fixtures';

export interface PivotTableBucketProps {
  backend: any;
  workspace: any;
  measures?: any[];
  rows?: any[];
  columns?: any[];
  filters?: any[];
}

export interface PresetButton {
  isActive: boolean;
  label: any;
  appliedFilters: any;
}

@Component({
  selector: 'app-measure-value-filter-shown-in-percent',
  templateUrl: './measure-value-filter-shown-in-percent.component.html',
  styleUrls: ['./measure-value-filter-shown-in-percent.component.css']
})

export class MeasureValueFilterShownInPercentComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  tableRoomDataShownInPercent: string;
  allDataShownInPercent: string;
  greaterDataShownInPercent: string;
  isActive: boolean;
  filters: any[];

  totalSales = [LdmExt.FranchisedSales, LdmExt.FranchisedSalesWithRatio];
  locationResort = [LdmExt.LocationName];
  greaterThanFilter = newMeasureValueFilter(LdmExt.FranchisedSalesWithRatio, "GREATER_THAN", 7000000);

  // totalSales = Model.measure(franchisedSalesIdentifier).localIdentifier('franchisedSales').title("Franchised Sales");
  // totalSalesRatio = Model.measure(franchisedSalesIdentifier).localIdentifier('franchisedSalesRatio').title("Franchised Sales %").ratio();
  // locationResort = Model.attribute(locationNameDisplayFormIdentifier);
  // greaterThanFilter = Model.measureValueFilter('franchisedSalesRatio').condition("GREATER_THAN", {
  //   value: 7000000,
  // });

  state = {
    isActive: false,
  };

  // create button filter all//
  onClick = () => {
    this.state = {
      isActive: !this.state.isActive,
    };
    this.renderPivotTable(this.filters);
  }

  ButtonFilterAll = ({ label, isActive }) => {
    return React.createElement("button", {
      'className': `gd-button gd-button-secondary ${isActive ? "is-active" : ""} s-filter-button`,
      onClick: this.onClick
    }, label);
  };

  protected getButtonAll() {
    const node = document.getElementById(this.allDataShownInPercent);
    invariant(node, `Node all button not found!`);
    return node;
  }

  protected getButtonFilterALL(): PresetButton {
    const { isActive, } = this.state;
    return {
      isActive: isActive,
      label: "All franchise sales",
      appliedFilters: this.onClick
    };
  }

  protected renderFilterAll() {
    ReactDOM.render(React.createElement(this.ButtonFilterAll, this.getButtonFilterALL()), this.getButtonAll());
    this.renderPivotTable([]);
  }

  // Create button greater than filter//
  onClickGreaterThan = () => {
    this.state = {
      isActive: !this.state.isActive,
    };
    this.renderPivotTable([this.greaterThanFilter]);
  }

  ButtonGreaterThan = ({ label, isActive }) => {
    return React.createElement("button", {
      'className': `gd-button gd-button-secondary ${isActive ? "is-active" : ""} s-filter-button`,
      onClick: this.onClickGreaterThan
    }, label);
  };

  protected getButtonGreater() {
    const node = document.getElementById(this.greaterDataShownInPercent);
    invariant(node, `Node greaterButton not found!`);
    return node;
  }

  protected getButtonGreaterThan(): PresetButton {
    const { isActive, } = this.state;
    return {
      isActive: isActive,
      label: "Franchise sales greater than 7,000,000 (shown in %)",
      appliedFilters: this.onClick
    };
  }

  protected renderGreaterThan() {
    ReactDOM.render(React.createElement(this.ButtonGreaterThan, this.getButtonGreaterThan()), this.getButtonGreater());
    this.renderPivotTable([]);
  }

  //render Pivot Table//
  protected getTableDataNode() {
    const node = document.getElementById(this.tableRoomDataShownInPercent);
    invariant(node, `Node tableRoomData not found!`);
    return node;
  }

  protected getPivotTableProps(filters): PivotTableBucketProps {
    return {
      workspace: workspace,
      backend: backend,
      measures: this.totalSales,
      rows: this.locationResort,
      filters: filters
    };
  }

  public renderPivotTable(filter) {
    ReactDOM.render(React.createElement(PivotTable, this.getPivotTableProps(filter)), this.getTableDataNode());
  }

  ngOnInit() {
    this.tableRoomDataShownInPercent = uuid.v4();
    this.allDataShownInPercent = uuid.v4();
    this.greaterDataShownInPercent = uuid.v4();
  }

  ngOnChanges() {
    this.renderGreaterThan();
    this.renderFilterAll();
  }

  ngAfterViewInit() {
    this.renderGreaterThan();
    this.renderFilterAll();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    //ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}
