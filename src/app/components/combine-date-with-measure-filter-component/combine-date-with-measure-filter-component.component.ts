import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';

import { DateFilter, DateFilterHelpers, ExtendedDateFilters } from "@gooddata/sdk-ui-filters";
import { MeasureValueFilter } from "@gooddata/sdk-ui-filters";
import { measureLocalId } from "@gooddata/sdk-model";
import { PivotTable } from "@gooddata/sdk-ui-pivot";
import { Ldm, LdmExt } from "../../../ldm";
import { workspace } from "../../../utils/fixtures";
import bearFactory, { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";
const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());

let self: any;

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
  backend: any;
  workspace: any;
  measures: any[];
  rows?: any;
  columns?: any;
  filters?: any[];
  sortBy?: any[];
}

const dateFrom = new Date();
dateFrom.setMonth(dateFrom.getMonth() - 1);
const availableGranularities = ['GDC.time.date', 'GDC.time.month', 'GDC.time.week_us', 'GDC.time.quarter', 'GDC.time.year'];

@Component({
  selector: 'app-combine-date-with-measure-filter-component',
  templateUrl: './combine-date-with-measure-filter-component.component.html',
  styleUrls: ['./combine-date-with-measure-filter-component.component.css']
})
export class CombineDateWithMeasureFilterComponentComponent implements OnInit {

  message: string;
  measureTitle = "Franchised Sales";
  totalSales = [LdmExt.FranchisedSales];
  rows = [Ldm.LocationName.Default, Ldm.DateYear];

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

  selectedFilterOption= this.defaultDateFilterOptions.allTime!;
  excludeCurrentPeriod= false;

  public rootDomID: string;
  public rootDomMeasureID: string;
  public PivotDomID: string;
  ref: React.RefObject<any>;
  filters: any[];
  filterValue: any;
  state = {
    filters: [],
  };

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

  onApplyMeasure = filter => {
    this.filters = [filter];
    this.filterValue = filter;
    this.state = {
      filters: []
    }
    this.render();
    // this.renderPivotTable([filter]);
  };

  onApply = (
    selectedFilterOption: ExtendedDateFilters.IAllTimeDateFilter,
    excludeCurrentPeriod: boolean,
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
      onApply: this.onApply,
    };
  }

  protected getMeasureRootDomNode() {
    const node = document.getElementById(this.rootDomMeasureID);
    invariant(node, `Node '${this.rootDomMeasureID} not found!`);
    return node;
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

  protected getPivotTableProps(): PivotTableBucketProps {
    return {
      workspace: workspace,
      backend: backend,
      measures: this.totalSales,
      rows: this.rows,
      filters: self.filters,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(
        React.createElement(DateFilter, this.getDateFilterProps()), this.getRootDomNode());
    }
    self.renderFilterValue();
    self.renderPivotTable();
  }

  public renderFilterValue() {
    ReactDOM.render(React.createElement(MeasureValueFilter, this.getMeasureValueProps()), this.getMeasureRootDomNode());
  }

  public renderPivotTable() {
    ReactDOM.render(React.createElement(PivotTable, this.getPivotTableProps()), this.getLineDataNode());
  }

  ngOnInit() {
    self = this;
    this.rootDomID = uuid.v4();
    this.rootDomMeasureID = uuid.v4();
    this.PivotDomID = uuid.v4();
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

