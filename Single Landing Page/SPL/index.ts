import * as React from "react";
import * as ReactDOM from "react-dom";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;
import { DetailsListGrid } from "./Extensions/DetailsGrid";
import { SLPControl, ISlpProps } from './Extensions/SingleLandingPageControl'
import { Link, Text } from '@fluentui/react';
export class SPL implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _container: any
    constructor() {
    }
    private _slpProps: ISlpProps;
    private _context:any;


    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this._container = container
       // this._slpProps.context = context;
        this._context=context;
    }
    public updateView(context: ComponentFramework.Context<IInputs>): void {       
        this._slpProps={
            context :this._context
        }
        ReactDOM.render(React.createElement(SLPControl, this._slpProps), this._container);
    }

    public getOutputs(): IOutputs {
        return {};
    }


    public destroy(): void {
        ReactDOM.unmountComponentAtNode(this._container);
    }
}


