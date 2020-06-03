import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';

import { AreaChart } from "@gooddata/sdk-ui-charts";
import { LdmExt } from "../../../ldm";
import { workspace } from "../../../utils/fixtures";
import bearFactory, { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";
const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());

interface AreaChartBucketProps {
  measures: any[];
  viewBy?: any;
  backend: any;
  workspace: any;
}

@Component({
  selector: 'app-area-chart',
  template: '<div class="area-chart" style="height:500px" [id]="rootDomID"></div>',
})

export class AreaChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  
  measures = [
    LdmExt.FranchiseFees,
    LdmExt.FranchiseFeesAdRoyalty,
    LdmExt.FranchiseFeesInitialFranchiseFee,
    LdmExt.FranchiseFeesOngoingRoyalty,
  ]; 
  config = {
    stackMeasuresToPercent: true,
    colors: ['rgb(195, 49, 73)', 'rgb(168, 194, 86)', 'rgb(213, 214, 0)', 'rgb(65, 69, 195)'],
    dataLabels: {
      visible: 'auto',
    },
    legend: {
      enabled: true, 
      position: 'top', 
    },
    separators: {
      thousand: ',',
      decimal: '.'
    },
  }

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): AreaChartBucketProps {
    return {
      measures: this.measures,
      viewBy: LdmExt.monthDate,
      backend: backend,
      workspace: workspace
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(AreaChart, this.getProps()), this.getRootDomNode());
    }
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
