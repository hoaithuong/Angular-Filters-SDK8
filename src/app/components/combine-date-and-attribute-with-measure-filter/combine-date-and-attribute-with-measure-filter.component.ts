import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';

import { ErrorComponent } from "@gooddata/sdk-ui";
import { AttributeFilter } from "@gooddata/sdk-ui-filters";
import { DateFilter, DateFilterHelpers, ExtendedDateFilters } from "@gooddata/sdk-ui-filters";
import { attributeIdentifier, isPositiveAttributeFilter, isAttributeElementsByRef, IPositiveAttributeFilter, INegativeAttributeFilter, IAttributeFilter } from "@gooddata/sdk-model";
import { newMeasureValueFilter } from "@gooddata/sdk-model";
import { newPositiveAttributeFilter, newNegativeAttributeFilter } from "@gooddata/sdk-model";
import { PivotTable } from "@gooddata/sdk-ui-pivot";
import { Ldm, LdmExt } from "../../../ldm";
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
  // onApplyAttributeFilter: any;
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

interface DateFilterExampleBucketProps {
  backend: any;
  workspace: any;
  filterOptions: any;
  availableGranularities: any;
  excludeCurrentPeriod: boolean;
  selectedFilterOption: any;
  dateFilterMode: any;
  customFilterName: string;
  onApply: any;
  // onApplyDateFilter: any;
}

export interface PivotTableBucketProps {
  backend: any;
  workspace: any;
  measures: any[];
  rows?: any;
  columns?: any;
  filters?: any[];
  sortBy?: any[];
}

export interface PresetButton {
  isActive: boolean;
  label: any;
  appliedFilters: any;
}

const dateFrom = new Date();
dateFrom.setMonth(dateFrom.getMonth() - 1);
const availableGranularities = ['GDC.time.date', 'GDC.time.month', 'GDC.time.week_us', 'GDC.time.quarter', 'GDC.time.year'];

@Component({
  selector: 'app-combine-date-and-attribute-with-measure-filter',
  templateUrl: './combine-date-and-attribute-with-measure-filter.component.html',
  styleUrls: ['./combine-date-and-attribute-with-measure-filter.component.css']
})
export class CombineDateAndAttributeWithMeasureFilterComponent implements OnInit {

  message: string;
  public all: string;
  public greater: string;
  public bewteen: string;
  isActive: boolean;
  filters: any[];
  filter = newPositiveAttributeFilter(Ldm.LocationName.Default, ['Irving', 'Montgomery']);

  // totalSales = [LdmExt.TotalSales1];
  locationResort = [Ldm.LocationName.Default, Ldm.DateYear];
  totalSales = [LdmExt.FranchisedSales];
  // locationResort = [Ldm.LocationName.Default];
  greaterThanFilter = newMeasureValueFilter(LdmExt.FranchisedSales, "GREATER_THAN", 2000000);
  betweenFilter = newMeasureValueFilter(LdmExt.FranchisedSales, "BETWEEN", 5000000, 8000000);

  defaultDateFilterOptions = {
    allTime: {
      localIdentifier: 'ALL_TIME',
      type: 'allTime',
      name: '',
      visible: true,
    },
    absoluteForm: {
      localIdentifier: 'ABSOLUTE_FORM',
      type: 'absoluteForm',
      from: dateFrom.toISOString().substr(0, 10), // 'YYYY-MM-DD'
      to: new Date().toISOString().substr(0, 10), // 'YYYY-MM-DD'
      name: '',
      visible: true,
    },
    absolutePreset: [
      {
        from: '2019-12-24',
        to: '2019-12-26',
        name: 'Christmas 2019',
        localIdentifier: 'christmas-2019',
        visible: true,
        type: 'absolutePreset',
      },
      {
        from: '2018-01-01',
        to: '2018-12-31',
        name: 'Year 2018',
        localIdentifier: 'year-2018',
        visible: true,
        type: 'absolutePreset',
      },
    ],
    relativeForm: {
      localIdentifier: 'RELATIVE_FORM',
      type: 'relativeForm',
      granularity: 'GDC.time.month',
      from: undefined,
      to: undefined,
      name: '',
      visible: true,
      availableGranularities,
    },
    relativePreset: {
      'GDC.time.date': [
        {
          from: -6,
          to: 0,
          granularity: 'GDC.time.date',
          localIdentifier: 'LAST_7_DAYS',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
        {
          from: -29,
          to: 0,
          granularity: 'GDC.time.date',
          localIdentifier: 'LAST_30_DAYS',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
        {
          from: -89,
          to: 0,
          granularity: 'GDC.time.date',
          localIdentifier: 'LAST_90_DAYS',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
      ],
      'GDC.time.week_us': [
        {
          from: 0,
          to: 0,
          granularity: 'GDC.time.week_us',
          localIdentifier: 'THIS_WEEK',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
        {
          from: -1,
          to: -1,
          granularity: 'GDC.time.week_us',
          localIdentifier: 'LAST_WEEK',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
        {
          from: -5,
          to: 0,
          granularity: 'GDC.time.week_us',
          localIdentifier: 'LAST_6_WEEKS',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
      ],
      'GDC.time.month': [
        {
          from: 0,
          to: 0,
          granularity: 'GDC.time.month',
          localIdentifier: 'THIS_MONTH',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
        {
          from: -1,
          to: -1,
          granularity: 'GDC.time.month',
          localIdentifier: 'LAST_MONTH',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
        {
          from: -11,
          to: 0,
          granularity: 'GDC.time.month',
          localIdentifier: 'LAST_12_MONTHS',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
      ],
      'GDC.time.quarter': [
        {
          from: 0,
          to: 0,
          granularity: 'GDC.time.quarter',
          localIdentifier: 'THIS_QUARTER',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
        {
          from: -1,
          to: -1,
          granularity: 'GDC.time.quarter',
          localIdentifier: 'LAST_QUARTER',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
        {
          from: -3,
          to: 0,
          granularity: 'GDC.time.quarter',
          localIdentifier: 'LAST_4_QUARTERS',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
      ],
      'GDC.time.year': [
        {
          from: 0,
          to: 0,
          granularity: 'GDC.time.year',
          localIdentifier: 'THIS_YEAR',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
        {
          from: -1,
          to: -1,
          granularity: 'GDC.time.year',
          localIdentifier: 'LAST_YEAR',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
      ],
    },
  };

  state = {
    isActive: false,
  };

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
      label: "Franchise sales greater than 5,000,000",
      appliedFilters: this.onClick
    };
  }

  protected renderGraterThan() {
    ReactDOM.render(React.createElement(this.ButtonGreaterThan, this.getButtonGreaterThan()), this.getButtonGreater());
    this.renderPivotTable([]);
  }

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

  selectedFilterOption= this.defaultDateFilterOptions.allTime!;
  excludeCurrentPeriod= false;

  public rootDomID: string;
  public PivotDomID: string;
  public rootAttributeDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node ${this.rootDomID} not found!`);
    return node;
  }

  protected getLineDataNode() {
    const node = document.getElementById(this.PivotDomID);
    invariant(node, `Node ${this.PivotDomID} not found!`);
    return node;
  }

  onApplyDateFilter = (
    selectedFilterOption: ExtendedDateFilters.IAllTimeDateFilter,
    excludeCurrentPeriod: boolean
) => {
  this.selectedFilterOption = selectedFilterOption;
  this.excludeCurrentPeriod = excludeCurrentPeriod;
  console.log(
    "DateFilterExample onApply",
    "selectedFilterOption:",
    selectedFilterOption,
    "excludeCurrentPeriod:",
    excludeCurrentPeriod,
  );

    const dateFilter = DateFilterHelpers.mapOptionToAfm(
      selectedFilterOption,
      { identifier: LdmExt.dateDatasetIdentifier },
      excludeCurrentPeriod,
    );
    self.filters = dateFilter ? [dateFilter] : [];
    self.render();
  }

  onApplyAttributeFilter(filter: IAttributeFilter) {
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

  protected getRootAttributeDomNode() {
    const node = document.getElementById(this.rootAttributeDomID);
    invariant(node, `Node '${this.rootAttributeDomID} not found!`);
    return node;
  }

  protected getAttributeProps(): NewAttributeFilterProps {
    return {
      workspace: workspace,
      backend: backend,
      fullscreenOnMobile: false,
      onApply: this.onApplyAttributeFilter,
      filter: this.filter,
    };
  }

  protected getErrorProps(): ErrorProps {
    return {
      message: this.message,
    };
  }

  protected getDateFilterProps(): DateFilterExampleBucketProps {
    return {
      workspace: workspace,
      backend: backend,
      excludeCurrentPeriod: this.excludeCurrentPeriod,
      selectedFilterOption: this.selectedFilterOption,
      filterOptions: this.defaultDateFilterOptions,
      availableGranularities: availableGranularities,
      customFilterName: 'Selected date range',
      dateFilterMode: 'active',
      onApply: this.onApplyDateFilter,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(
        React.createElement(DateFilter, this.getDateFilterProps()), this.getRootDomNode());
      ReactDOM.render(
        React.createElement(AttributeFilter, this.getAttributeProps()), this.getRootAttributeDomNode());
    }
    self.renderPivotTable(this.filters);
  }

  public renderPivotTable(filters) {
    if (this.message) {
      ReactDOM.render(React.createElement(ErrorComponent, this.getErrorProps()), this.getLineDataNode());
    } else {
      ReactDOM.render(React.createElement(PivotTable, this.getPivotTableProps(filters)), this.getLineDataNode());
    }
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

  ngOnInit() {
    self = this;
    this.rootDomID = uuid.v4();
    this.rootAttributeDomID = uuid.v4();
    this.PivotDomID = uuid.v4();
    this.all = uuid.v4();
    this.bewteen = uuid.v4();
    this.greater = uuid.v4();
  }

  ngOnChanges() {
    this.render();
    this.renderGraterThan();
    this.renderFilterBetween();
    this.renderFilterAll();
  }

  ngAfterViewInit() {
    this.render();
    this.renderGraterThan();
    this.renderFilterBetween();
    this.renderFilterAll();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}
