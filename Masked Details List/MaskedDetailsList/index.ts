import {IInputs, IOutputs} from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {DatasetLayout} from './Extensions/MaskedDetailsList'
export class MaskedDetailsList implements ComponentFramework.StandardControl<IInputs, IOutputs> {


    private _container:HTMLDivElement;
   
    constructor()
    {

    }

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this._container=container
        
    }


  
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        let appProps={
            pcfContext:context
        }
        ReactDom.render(React.createElement(DatasetLayout,appProps),this._container);
       
    }

   
    public getOutputs(): IOutputs
    {
        return {};
    }

  
    public destroy(): void
    {
        ReactDom.unmountComponentAtNode(this._container);
        
    }

}
