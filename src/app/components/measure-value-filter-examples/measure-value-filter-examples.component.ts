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
  selector: 'app-measure-value-filter-examples',
  templateUrl: './measure-value-filter-examples.component.html',
  styleUrls: ['./measure-value-filter-examples.component.css']
})

export class MeasureValueFilterExamplesComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  filters: any[];
  public tableRoomData: string;
  public all: string;
  public greater: string;
  public bewteen: string;
  isActive: boolean;

  totalSales = [LdmExt.FranchisedSales];
  locationResort = [Ldm.LocationName.Default];
  greaterThanFilter = newMeasureValueFilter(LdmExt.FranchisedSales, "GREATER_THAN", 7000000);
  betweenFilter = newMeasureValueFilter(LdmExt.FranchisedSales, "BETWEEN", 5000000, 8000000);

  // totalSales = Model.measure(franchisedSalesIdentifier).localIdentifier('franchisedSales').title("Franchised Sales");
  // locationResort = Model.attribute(locationNameDisplayFormIdentifier);
  // attributes = [Model.attribute(locationNameDisplayFormIdentifier).localIdentifier("locationName")];
  // greaterThanFilter = Model.measureValueFilter('franchisedSales').condition("GREATER_THAN", {
  //   value: 7000000,
  // });

  // betweenFilter = Model.measureValueFilter('franchisedSales').condition("BETWEEN", {
  //   from: 5000000,
  //   to: 8000000,
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
    const node = document.getElementById(this.all);
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
    const node = document.getElementById(this.greater);
    invariant(node, `Node greaterButton not found!`);
    return node;
  }

  protected getButtonGreaterThan(): PresetButton {
    const { isActive, } = this.state;
    return {
      isActive: isActive,
      label: "Franchise sales greater than 7,000,000",
      appliedFilters: this.onClick
    };
  }

  protected renderGraterThan() {
    ReactDOM.render(React.createElement(this.ButtonGreaterThan, this.getButtonGreaterThan()), this.getButtonGreater());
    this.renderPivotTable([]);
  }

  // Create button between filter//
  onClickBetWeen = () => {
    this.state = {
      isActive: !this.state.isActive,
    };
    this.renderPivotTable([this.betweenFilter]);
  }

  ButtonBetweenFilter = ({ label, isActive }) => {
    return React.createElement("button", {
      'className': `gd-button gd-button-secondary ${isActive ? "is-active" : ""} s-filter-button`,
      onClick: this.onClickBetWeen
    }, label);
  };

  protected getButtonBewteen() {
    const node = document.getElementById(this.bewteen);
    invariant(node, `Node bewteenButton not found!`);
    return node;
  }

  protected getButtonBetweenProps(): PresetButton {
    const { isActive, } = this.state;
    return {
      isActive: isActive,
      label: "Franchise sales between 5,000,000 and 8,000,000",
      appliedFilters: this.onClick
    };
  }

  protected renderFilterBetween() {
    ReactDOM.render(React.createElement(this.ButtonBetweenFilter, this.getButtonBetweenProps()), this.getButtonBewteen());
    this.renderPivotTable([]);
  }

  //render Pivot Table//
  protected getTableDataNode() {
    const node = document.getElementById(this.tableRoomData);
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
    this.tableRoomData = uuid.v4();
    this.all = uuid.v4();
    this.bewteen = uuid.v4();
    this.greater = uuid.v4();
  }

  ngOnChanges() {
    this.renderGraterThan();
    this.renderFilterBetween();
    this.renderFilterAll();
  }

  ngAfterViewInit() {
    this.renderGraterThan();
    this.renderFilterBetween();
    this.renderFilterAll();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    //ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }
}
