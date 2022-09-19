import * as React from "react";
import { useState } from 'react';
import { IInputs, IOutputs } from "../generated/ManifestTypes";
import {DetailsListGrid} from './DetailsGrid';

import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

import { Link, Text } from '@fluentui/react';

export interface ISlpProps{
 context:ComponentFramework.Context<IInputs>
}

export class SLPControl extends React.Component<ISlpProps> {
    constructor(props: ISlpProps) {
        super(props);
        this.state={}
        let functionName: string = "updateView";
    }
    public context:ComponentFramework.Context<IInputs>;
    private appProps: any;
    // public renderDatasetGrid(context: ComponentFramework.Context<IInputs>, mappedcolumns: any, pageRows: any) {
    //     let functionName = 'renderDatasetGrid';
    //     let appProps: any
    //     try {
    //         // props to be passed to component.
    //         appProps = {
    //             mappedcolumns: mappedcolumns, // formatted columns for  details list
    //             pageRows: pageRows, // page records value
    //             pcfContext: context // pcf context
    //         };
    //        // ReactDOM.render(React.createElement(DetailsListGrid, appProps), this._container);

    //     } catch (error) {
    //         console.log(functionName + "" + error);
    //     }
    // }
    public getAllPageRecords(columnsOnView: DataSetInterfaces.Column[],
        gridParam: DataSet) {
        let functionName = 'loadPagingRecords';
        let pagingDataRows: any = [];
        let currentPageRecordsID = gridParam.sortedRecordIds;
        try {

            for (const pointer in currentPageRecordsID) {
                pagingDataRows[pointer] = {}
                pagingDataRows[pointer]["key"] = currentPageRecordsID[pointer];
                columnsOnView.forEach((columnItem: any, index) => {
                    pagingDataRows[pointer][columnItem.name] = gridParam.records[currentPageRecordsID[pointer]].getFormattedValue(columnItem.name);

                });

            }

        } catch (error) {

            console.log(functionName + "" + error);

        }
        return pagingDataRows;
    }
    public mapCRMColumnsToDetailsListColmns(columnsOnView: any): any {

        let functionName = 'mapCRMColumnsToDetailsListColmns';
        let mappedColumn = []
        try {
            // loop thorugh all columns
            for (const pointer in columnsOnView) {
                mappedColumn.push({
                    key: pointer,
                    name: columnsOnView[pointer].displayName,
                    fieldName: columnsOnView[pointer].name,
                    minWidth: 100,
                    maxWidth: 200,
                    isResizable: true,
                    onColumnClick: () => {
                        alert(`Column ${columnsOnView[pointer].displayName} clicked`);
                    },
                    data: "string",
                    onRender: (item: any) => {
                        return React.createElement('span', null, item[columnsOnView[pointer].name])
                    }
                })

            }
            mappedColumn.push({
                key: "expand",
                name: null,
                fieldName: "Expand",
                minWidth: 100,
                maxWidth: 200,
                isResizable: true,
                data: "string",
                // onRender: (item: any) => {
                //     return React.createElement('span', null, <Link>)
                // }
            })

        } catch (error) {
            console.log(functionName + " " + error);
        }
        return mappedColumn;

    }
    render(): React.ReactNode {        
        //all columns which are on views(Eg Active account)
        try {
            let columnsOnView = this.props.context.parameters.sampleDataSet.columns;
        let mappedcolumns = this.mapCRMColumnsToDetailsListColmns(columnsOnView);
        let pageRows = this.getAllPageRecords(columnsOnView, this.props.context.parameters.sampleDataSet)
        this.appProps = {
            mappedcolumns: mappedcolumns, // formatted columns for  details list
            pageRows: pageRows, // page records value
            pcfContext: this.props.context // pcf context
        };
        } catch (error) {
            console.log(error)
        }
        
      // this.renderDatasetGrid(this.context, mappedcolumns, pageRows)
        return(
            React.createElement(DetailsListGrid, this.appProps)
        );
    }

}