import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
// import { DateFilter } from '@gooddata/react-components';

import { DateFilter, ExtendedDateFilters } from "@gooddata/sdk-ui-filters";
import { Ldm, LdmExt } from "../../../ldm";
import { workspace } from "../../../utils/fixtures";
import bearFactory, { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";
const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());

let self: any;

interface DateFilterBucketProps {
  filterOptions: any;
  availableGranularities: any;
  dateFilterMode: any;
  excludeCurrentPeriod: boolean;
  selectedFilterOption: any;
  onApply: any;
  backend: any;
  workspace: any;
}

interface IDateFilterComponentExampleState {
  selectedFilterOption: ExtendedDateFilters.DateFilterOption;
  excludeCurrentPeriod: boolean;
}

const dateFrom = new Date();
dateFrom.setMonth(dateFrom.getMonth() - 1);
const availableGranularities = ['GDC.time.date', 'GDC.time.week_us', 'GDC.time.month', 'GDC.time.quarter', 'GDC.time.year'];

@Component({
  selector: 'app-date-filter-config',
  template: '<div class="date-filter" style="height:50px; width:200px" [id]="rootDomID"></div>',
})

export class DateFilterConfigComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  defaultDateFilterOptions: ExtendedDateFilters.IDateFilterOptionsByType = {
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
      availableGranularities: [],
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
          from: -1,
          to: 0,
          granularity: 'GDC.time.week_us',
          localIdentifier: 'LAST_2_WEEKS',
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

  // selectedFilterOption = this.defaultDateFilterOptions.allTime;
  // excludeCurrentPeriod = false;
  selectedFilterOption= this.defaultDateFilterOptions.allTime!;
  excludeCurrentPeriod= false;

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
  self.render();
  }
  
  public rootDomID: string;
  public lineRoomData: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  // onOpen = () => {
  //   // tslint-disable-next-line no-console
  //   console.log('DateFilterExample onOpen');
  // }

  // onClose = () => {
  //   // tslint-disable-next-line no-console
  //   console.log('DateFilterExample onClose');
  // }

  // onApply = (selectedFilterOption, excludeCurrentPeriod) => {
  //   this.selectedFilterOption = selectedFilterOption;
  //   this.excludeCurrentPeriod = excludeCurrentPeriod;
  //   console.log(
  //     'DateFilterExample onApply',
  //     'selectedFilterOption:',
  //     selectedFilterOption,
  //     'excludeCurrentPeriod:',
  //     excludeCurrentPeriod,
  //   );
  //   self.render();
  // }

  // onCancel = () => {
  //   // tslint-disable-next-line no-console
  //   console.log('DateFilterExample onCancel');
  // }
  // protected getDateFilterState(): IDateFilterComponentExampleState {
  //   return {
  //     excludeCurrentPeriod: this.excludeCurrentPeriod,
  //     selectedFilterOption: this.selectedFilterOption,
  //   };
  // }

  protected getDateFilterProps(): DateFilterBucketProps {
    return {
      excludeCurrentPeriod: this.excludeCurrentPeriod,
      selectedFilterOption: this.selectedFilterOption,
      filterOptions: this.defaultDateFilterOptions,
      availableGranularities: availableGranularities,
      dateFilterMode: 'active',
      onApply: this.onApply,
      workspace: workspace,
      backend: backend,
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
  }

  ngOnInit() {
    self = this;
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
