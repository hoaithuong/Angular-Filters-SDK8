import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
// import { PivotTable, Model } from '@gooddata/react-components';
import { projectId, locationNameDisplayFormIdentifier, franchisedSalesIdentifier } from '../../../utils/fixtures';

import { PivotTable } from "@gooddata/sdk-ui-pivot";
import { newMeasureValueFilter, measureIdentifier, idRef } from "@gooddata/sdk-model";
import { Ldm, LdmExt } from "../../../ldm";
import { newPositiveAttributeFilter, newNegativeAttributeFilter } from "@gooddata/sdk-model";
import { workspace } from "../../../utils/fixtures";
import bearFactory, { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";
const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());


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
  selector: 'app-measure-value-filter-formatted-in-percent',
  templateUrl: './measure-value-filter-formatted-in-percent.component.html',
  styleUrls: ['./measure-value-filter-formatted-in-percent.component.css']
})
export class MeasureValueFilterFormattedInPercentComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  tableRoomDataFormattedInPercent: string;
  allFormattedInPercent: string;
  greaterFormattedInPercent: string;
  isActive: boolean;
  filters: any[];

  totalSales = [LdmExt.FranchisedSalesAsPercent];
  locationResort = [Ldm.LocationName.Default];
  greaterThanFilter = newMeasureValueFilter(LdmExt.FranchisedSalesAsPercent, "GREATER_THAN", 7000000);

  // totalSales = Model.measure(franchisedSalesIdentifier).localIdentifier('franchisedSales').format('#,##0%').title("Franchised Sales");
  // locationResort = Model.attribute(locationNameDisplayFormIdentifier);
  // greaterThanFilter = Model.measureValueFilter('franchisedSales').condition("GREATER_THAN", {
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
    const node = document.getElementById(this.allFormattedInPercent);
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
    const node = document.getElementById(this.greaterFormattedInPercent);
    invariant(node, `Node greaterButton not found!`);
    return node;
  }

  protected getButtonGreaterThan(): PresetButton {
    const { isActive, } = this.state;
    return {
      isActive: isActive,
      label: "Franchise sales greater than 700,000,000%",
      appliedFilters: this.onClick
    };
  }

  protected renderGreaterThan() {
    ReactDOM.render(React.createElement(this.ButtonGreaterThan, this.getButtonGreaterThan()), this.getButtonGreater());
    this.renderPivotTable([]);
  }

  //render Pivot Table//
  protected getTableDataNode() {
    const node = document.getElementById(this.tableRoomDataFormattedInPercent);
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
    this.tableRoomDataFormattedInPercent = uuid.v4();
    this.allFormattedInPercent = uuid.v4();
    this.greaterFormattedInPercent = uuid.v4();
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
