import * as React from 'react';
import { ITextFieldStyleProps, ITextFieldStyles, TextField } from '@fluentui/react/lib/TextField';
import { IInputs } from "../generated/ManifestTypes";

export interface ITextControl {
    labelText: string,
    maxLimit: number,
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: (newValue: string | undefined) => void
}

export class TextControl extends React.Component<ITextControl, { value: string }>{
    constructor(props: ITextControl) {
        super(props);
        this.state = {
            value: this.props.labelText
        };
    }

    private getStyle = () => {
        return {
            borderColor: "transparent",
            borderStyle: "solid",
            borderWidth: "1px",
            boxSizing: "border-box",
            color: "#000000",
            fontSize: "1.00rem",
            fontWeight: 600,
            height: "2.50rem",
            lineHeight: "2.50rem",
            marginLeft: "0px",
            marginRight: "0px",
            paddingBottom: "0px",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
            paddingTop: "0px",
            textOverflow: "ellipsis",
            width: "100%",
            selectors: {
                ':hover': {
                    backgroundColor: "#FFFFFF",
                    borderColor: "#666666",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    boxSizing: "border-box",
                    color: "#000000",
                    fontSize: "1.00rem",
                    fontWeight: 400,
                    height: "2.50rem",
                    lineHeight: "2.50rem",
                    marginLeft: "0px",
                    marginRight: "0px",
                    paddingBottom: "0px",
                    paddingLeft: "0.5rem",
                    paddingRight: "0.5rem",
                    paddingTop: "0px",
                    textOverflow: "ellipsis",
                    width: "100%"
                }
            }
        }

    }
    private onChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
        if (!newValue) {

            this.setState({
                value: ''
            })
            this.props.notifyOutputChanged('')
        }
        else {
            this.setState({
                value: newValue
            });
            this.props.notifyOutputChanged(newValue);

        }
    }
    render() {
        const description = `${this.state.value.length}/ ${this.props.maxLimit} remaining`;
        const textFieldStyle = (props: ITextFieldStyleProps): Partial<ITextFieldStyles> => ({
            ...(props.disabled ? {
                fieldGroup: {
                    border: "none"
                },
                field: {
                    fontWeight: 600,
                    color: "rgb(51, 51, 51)",
                    backgroundColor: "transparent",
                    ":hover": {
                        backgroundColor: "rgb(226, 226, 226)"
                    }
                }
            } : props.focused ? {
                fieldGroup: {
                    border: "none",
                    ":after": {
                        border: "none"
                    }
                },
                field: {
                    border: "1px solid rgb(102, 102, 102)"
                }
            } : {
                fieldGroup: {
                    borderColor: "transparent",
                    ":after": {
                        border: "none"
                    },
                    ":hover": {
                        borderColor: "rgb(102, 102, 102)",
                    }
                },
                field: {
                    fontWeight: 600,
                    ":hover": {
                        fontWeight: 400
                    }
                }
            })
        });
         
        return (
            <>
                <TextField
                    // label={this.props.labelText}
                    description={description}
                    onChange={this.onChange}
                    value={this.state.value ? this.state.value : ''}
                    styles={textFieldStyle}

                />
            </>
        )
    }
}