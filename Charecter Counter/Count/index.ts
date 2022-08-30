import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { TextControl, ITextControl } from './Extensions/TextControl'
export class Count implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    /**
     * Empty constructor.
     */
    private value: string
    private container: HTMLDivElement
    private notifyOutputChanged: () => void
    constructor() {

    }
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this.container = container
        this.notifyOutputChanged = notifyOutputChanged
    }
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const props: ITextControl = {
            context: context,
            labelText: context.parameters.fieldValue.raw!.toString() ?? '',
            maxLimit: context.parameters.fieldValue.attributes?.MaxLength ?? 100,
            notifyOutputChanged: (newValue) => {
                if (newValue) {
                    this.value = newValue;
                    this.notifyOutputChanged();
                }              
            },

        }
        ReactDOM.render(
            React.createElement(TextControl, props),
            this.container
        )
    }

    public getOutputs(): IOutputs {
        return { fieldValue: this.value };
    }

    public destroy(): void {
        ReactDOM.unmountComponentAtNode(this.container)
    }
}
