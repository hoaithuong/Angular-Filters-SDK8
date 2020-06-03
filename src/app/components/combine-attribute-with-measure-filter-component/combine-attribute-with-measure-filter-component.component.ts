import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';

import { ErrorComponent } from "@gooddata/sdk-ui";
import { AttributeFilter } from "@gooddata/sdk-ui-filters";
import { MeasureValueFilter } from "@gooddata/sdk-ui-filters";
import { measureLocalId } from "@gooddata/sdk-model";
import { PivotTable } from "@gooddata/sdk-ui-pivot";
import { attributeIdentifier, isPositiveAttributeFilter, isAttributeElementsByRef, IPositiveAttributeFilter, INegativeAttributeFilter, IAttributeFilter } from "@gooddata/sdk-model";
import { Ldm, LdmExt } from "../../../ldm";
import { newPositiveAttributeFilter, newNegativeAttributeFilter } from "@gooddata/sdk-model";
import { workspace } from "../../../utils/fixtures";
import bearFactory, { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";
const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());

import { VisualizationInput } from '@gooddata/typings';

let self: any;

interface NewAttributeFilterProps {
  fullscreenOnMobile: boolean;
  onApplyWithFilterDefinition?: any;
  filter: any;
  locale?: any;
  backend: any;
  workspace: any;
  onApply: any;
}

export interface MeasureValueFilterProps {
  backend: any;
  workspace: any;
  onApply: any;
  filter: any;
  buttonTitle: string;
  measureIdentifier: any;
}

export interface PivotTableBucketProps {
  measures: any[];
  rows?: any[];
  columns?: any[];
  filters?: any[];
  sortBy?: any[];
  locale?: any;
  backend: any;
  workspace: any;
}

export interface ErrorProps {
  code?: string;
  icon?: string;
  message: string;
  description?: string;
  className?: string;
  style?: object;
  width?: any;
  height?: any;
}

@Component({
  selector: 'app-combine-attribute-with-measure-filter-component',
  templateUrl: './combine-attribute-with-measure-filter-component.component.html',
  styleUrls: ['./combine-attribute-with-measure-filter-component.component.css']
})
export class CombineAttributeWithMeasureFilterComponentComponent implements OnInit {
  state = {
    filters: [],
  };
  message: string;
  ref: React.RefObject<any>;
  rows =[
      Ldm.LocationName.Default,
      Ldm.LocationResort,
      Ldm.MenuCategory,
    ]
  filter = newPositiveAttributeFilter(Ldm.MenuCategory, ['Coffee', 'Entrees', 'Desserts']);
  measureTitle = "Franchised Sales";
  totalSales = [LdmExt.FranchisedSales];
  // locationResort = [Ldm.LocationName.Default];

  filters: any[];
  filterValue: any;
  public rootDomID: string;
  public rootDomMeasureID: string;

  public pivotTableRoomDataID: string;

  onApplyMeasure = filter => {
    this.filters = [filter];
    this.filterValue = filter;
    this.state = {
      filters: []
    }
    this.render();
    // this.renderPivotTable([filter]);
  };

  onApply(filter: IAttributeFilter) {
    // tslint:disable-next-line:no-console
    console.log("AttributeFilterExample onApply", filter);
    self.message = null;
    if (isPositiveAttributeFilter(filter)) {
      self.filters = self.filterPositiveAttribute(filter);
    } else {
      self.filters = self.filterNegativeAttribute(filter);
    }
    self.renderPivotTable(self.filters);
  }

  public filterPositiveAttribute(filter: IPositiveAttributeFilter) {
    let filters;
    const {
        positiveAttributeFilter,
        positiveAttributeFilter: { displayForm },
    } = filter;
    const inElements = filter.positiveAttributeFilter.in;
    const checkLengthOfFilter = isAttributeElementsByRef(positiveAttributeFilter.in)
        ? positiveAttributeFilter.in.uris.length !== 0
        : positiveAttributeFilter.in.values.length !== 0;

    console.log(checkLengthOfFilter);
    if (checkLengthOfFilter) {
        filters = [
            {
                positiveAttributeFilter: {
                    displayForm,
                    in: inElements,
                },
            },
        ];
    } else {
      self.message = 'The filter must have at least one item selected';
    }
    return filters;
  }

  public filterNegativeAttribute(filter: INegativeAttributeFilter) {
    let filters;
        const {
            negativeAttributeFilter: { notIn, displayForm },
        } = filter;
        const checkLengthOfFilter = isAttributeElementsByRef(notIn)
            ? notIn.uris.length !== 0
            : notIn.values.length !== 0;

        if (checkLengthOfFilter) {
            filters = [
                {
                    negativeAttributeFilter: {
                        displayForm,
                        notIn,
                    },
                },
            ];
        }
    return filters;
  }

  onLoadingChanged(...params) {
    // tslint:disable-next-line: no-console
    console.info('NewAttributeFilterComponent onLoadingChanged', ...params);
  }

  onError(...params) {
    // tslint:disable-next-line: no-console
    console.info('NewAttributeFilterComponent onLoadingChanged', ...params);
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
    self.renderPivotTable([filter]);
  }

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getRootMeasureDomNode() {
    const node = document.getElementById(this.rootDomMeasureID);
    invariant(node, `Node '${this.rootDomMeasureID} not found!`);
    return node;
  }

  protected getLineDataNode() {
    const node = document.getElementById(this.pivotTableRoomDataID);
    invariant(node, `Node ${this.pivotTableRoomDataID} not found!`);
    return node;
  }

  protected getAttributeProps(): NewAttributeFilterProps {
    return {
      workspace: workspace,
      backend: backend,
      fullscreenOnMobile: false,
      onApply: this.onApply,
      filter: this.filter
    };
  }

  protected getMeasureValueProps(): MeasureValueFilterProps {
    const { filters } = this.state;
    return {
      workspace: workspace,
      backend: backend,
      filter: this.filterValue ? this.filterValue : filters[0],
      onApply: this.onApplyMeasure,
      buttonTitle: this.measureTitle,
      measureIdentifier: measureLocalId(LdmExt.FranchisedSales)
    };
  }

  protected getPivotTableProps(filters): PivotTableBucketProps {
    return {
      workspace: workspace,
      backend: backend,
      measures: this.totalSales,
      rows: this.rows,
      filters: filters
    };
  }

  protected getErrorProps(): ErrorProps {
    return {
      message: this.message,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(
        React.createElement(AttributeFilter, this.getAttributeProps()), this.getRootDomNode());
        // this.onApply(this.filter);
    }
    this.renderFilterValue();
    this.renderPivotTable(this.filters);
  }

  public renderFilterValue() {
    ReactDOM.render(React.createElement(MeasureValueFilter, this.getMeasureValueProps()), this.getRootMeasureDomNode());
  }

  public renderPivotTable(filters) {
    if (this.message) {
      ReactDOM.render(React.createElement(ErrorComponent, this.getErrorProps()), this.getLineDataNode());
    } else {
      ReactDOM.render(React.createElement(PivotTable, this.getPivotTableProps(filters)), this.getLineDataNode());
    }
  }

  ngOnInit() {
    self = this;
    this.rootDomID = uuid.v4();
    this.rootDomMeasureID = uuid.v4();
    this.pivotTableRoomDataID = uuid.v4();
    this.ref = React.createRef();
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

