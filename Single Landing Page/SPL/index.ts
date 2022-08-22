import * as React from "react";
import * as ReactDOM from "react-dom";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;
import { DetailsListGrid } from "./Extensions/DetailsGrid";
import { Link, Text } from '@fluentui/react';
export class SPL implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _container: any
    constructor() {
    }

    
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this._container = container
    }
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        let functionName: string = "updateView";

        // all columns which are on views(Eg Active account)
        let columnsOnView = context.parameters.sampleDataSet.columns;
        let mappedcolumns = this.mapCRMColumnsToDetailsListColmns(columnsOnView);
        let pageRows = this.getAllPageRecords(columnsOnView, context.parameters.sampleDataSet)
        try {
            this.renderDatasetGrid(context, mappedcolumns, pageRows)
        } catch (error) {
            console.log(functionName + " " + error);
        }

    }

    public getOutputs(): IOutputs {
        return {};
    }


    public destroy(): void {
        ReactDOM.unmountComponentAtNode(this._container);
    }

    public renderDatasetGrid(context: ComponentFramework.Context<IInputs>, mappedcolumns: any, pageRows: any) {
        let functionName = 'renderDatasetGrid';
        let appProps: any
        try {
            // props to be passed to component.
            appProps = {
                mappedcolumns: mappedcolumns, // formatted columns for  details list
                pageRows: pageRows, // page records value
                pcfContext: context // pcf context
            };
            ReactDOM.render(React.createElement(DetailsListGrid, appProps), this._container);

        } catch (error) {
            console.log(functionName + "" + error);
        }
    }
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
                    minWidth: 150,
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
                minWidth: 150,
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

}


