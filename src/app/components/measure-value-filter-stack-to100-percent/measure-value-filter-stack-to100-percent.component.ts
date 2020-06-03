import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
// import { BarChart, Model } from '@gooddata/react-components';

import { BarChart } from "@gooddata/sdk-ui-charts";
import { newMeasureValueFilter, measureIdentifier, idRef } from "@gooddata/sdk-model";
import { Ldm, LdmExt } from "../../../ldm";
import { newPositiveAttributeFilter, newNegativeAttributeFilter } from "@gooddata/sdk-model";
import { workspace } from "../../../utils/fixtures";
import bearFactory, { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";
const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());


export interface BarChartBucketProps {
  backend: any;
  workspace: any;
  measures: any[];
  viewBy?: any[];
  config?: any;
  filters?: any[];
}

export interface PresetButton {
  isActive: boolean;
  label: any;
  appliedFilters: any;
}

@Component({
  selector: 'app-measure-value-filter-stack-to100-percent',
  templateUrl: './measure-value-filter-stack-to100-percent.component.html',
  styleUrls: ['./measure-value-filter-stack-to100-percent.component.css']
})

export class MeasureValueFilterStackTo100PercentComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  barChartDataStacktoPercent: string;
  allStacktoPercent: string;
  greaterStacktoPercent: string;
  isActive: boolean;
  filters: any[];

  measures = [LdmExt.TotalSales2, LdmExt.numberOfChecks];
  locationResort = [Ldm.LocationName.Default];
  greaterThanFilter = newMeasureValueFilter(idRef(measureIdentifier(LdmExt.TotalSales2)), "GREATER_THAN", 7000000);

  // totalSales = Model.measure(totalSalesIdentifier).localIdentifier('totalSales').title("Total Sales");
  // numOfChecks = Model.measure(numberOfChecksIdentifier).localIdentifier('numOfChecks').title("Number of Checks");
  // measures = [this.totalSales, this.numOfChecks];
  // locationResort = Model.attribute(locationNameDisplayFormIdentifier);
  // greaterThanFilter = Model.measureValueFilter('totalSales').condition("GREATER_THAN", {
  //   value: 7000000,
  // });

  state = {
    isActive: false,
  };

  config = {
    stackMeasuresToPercent: true,
    dataLabels: {
      visible: true,
    },
  }

  // create button filter all//
  onClick = () => {
    this.state = {
      isActive: !this.state.isActive,
    };
    this.renderPivotTable(this.filters);
  }

  protected renderButtonFilter({ label, isActive }) {
    return React.createElement("button", {
      'className': `gd-button gd-button-secondary ${isActive ? "is-active" : ""} s-filter-button`,
      onClick: this.onClick
    }, label);

  }

  ButtonFilterAll = ({ label, isActive }) => {
    return React.createElement("button", {
      'className': `gd-button gd-button-secondary ${isActive ? "is-active" : ""} s-filter-button`,
      onClick: this.onClick
    }, label);
  };

  protected getButtonAll() {
    const node = document.getElementById(this.allStacktoPercent);
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
    const node = document.getElementById(this.greaterStacktoPercent);
    invariant(node, `Node greaterButton not found!`);
    return node;
  }

  protected getButtonGreaterThan(): PresetButton {
    const { isActive, } = this.state;
    return {
      isActive: isActive,
      label: "Total sales greater than 7,000,000 (stacked to 100%)",
      appliedFilters: this.onClick
    };
  }

  protected renderGreaterThan() {
    ReactDOM.render(React.createElement(this.ButtonGreaterThan, this.getButtonGreaterThan()), this.getButtonGreater());
    this.renderPivotTable([]);
  }

  //render Pivot Table//
  protected getBarChartNode() {
    const node = document.getElementById(this.barChartDataStacktoPercent);
    invariant(node, `Node tableRoomData not found!`);
    return node;
  }

  protected getBarChartProps(filters): BarChartBucketProps {
    return {
      workspace: workspace,
      backend: backend,
      measures: this.measures,
      viewBy: this.locationResort,
      config: this.config,
      filters: filters,
    };
  }

  public renderPivotTable(filter) {
    ReactDOM.render(React.createElement(BarChart, this.getBarChartProps(filter)), this.getBarChartNode());
  }

  ngOnInit() {
    this.barChartDataStacktoPercent = uuid.v4();
    this.allStacktoPercent = uuid.v4();
    this.greaterStacktoPercent = uuid.v4();
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

