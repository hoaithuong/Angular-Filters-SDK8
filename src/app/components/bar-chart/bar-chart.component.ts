import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';

import { BarChart, Model } from '@gooddata/react-components';
import {
  projectId,
  totalSalesIdentifier,
  locationResortIdentifier,
  franchiseFeesAdRoyaltyIdentifier
} from "../../../utils/fixtures";

interface BarChartBucketProps {
  measures: any[];
  viewBy?: any[];
  stackBy?: any;
  filters?: any[];
  sortBy?: any[];
  config?: any;
}

interface BarChartProps {
  projectId: any;
}

@Component({
  selector: 'app-bar-chart',
  template: '<div class="bar-chart" style="height:500px" [id]="rootDomID"></div>',
})

export class BarChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  measures = [
    Model.measure(totalSalesIdentifier)
      .format("#,##0")
      .alias("$ Total Sales"),
    Model.measure(franchiseFeesAdRoyaltyIdentifier)
      .alias("Franchise Fee")
      .format("$#,##0.00")]

  viewBy = [Model.attribute(locationResortIdentifier)]

  filterLocationResort = [Model.positiveAttributeFilter(locationResortIdentifier, ["Irving", "Montgomery", "San Jose", "Deerfield Beach"], true)]

  config = {
    dataLabels: {
      visible: 'auto'
    },
    legend: {
      enabled: true,
      position: 'top',
    },
    separators: {
      thousand: ',',
      decimal: '.'
    },
    stackMeasures: true,
    stackMeasuresToPercent: true
  }

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): BarChartProps | BarChartBucketProps {
    return {
      projectId: projectId,
      measures: this.measures,
      viewBy: this.viewBy,
      filters: this.filterLocationResort,
      config: this.config
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(BarChart, this.getProps()), this.getRootDomNode());
    }
  }

  ngOnInit() {
    this.rootDomID = uuid.v1();
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
