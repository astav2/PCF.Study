import * as React from 'react';
import { IInputs } from '../generated/ManifestTypes';
import parse from 'html-react-parser';
export interface IDataGridProps {
    context?: ComponentFramework.Context<IInputs>,
    getTaskDetails: () => Promise<TaskDetails[]>
}

export interface TaskDetails {
    subject: string;
    startdate: string;
    duedate: string;
}
export class DataGrid extends React.Component<IDataGridProps, any>{
    /**
     *
     */
    constructor(props: IDataGridProps) {
        super(props);
        this.state = {
            rerender:true
        }
        //this.populateData= this.populateData.bind(this);
        this.populateHeaderData=this.populateHeaderData.bind(this);
        this.populateRowData=this.populateRowData.bind(this);
    }

    componentDidMount(): void {
        this.populateData();
    }
    render(): React.ReactNode {

        console.log('inside render method');
        var rows=this.state.rows;
        return (<>
        <div style={{ textAlign:'center',border:' 3px solid green;'}}>My Task List</div>
            <div id="data-table">
                <table id="html-data-table">
                    {/* <tr>
                        <th>Subject</th>
                        <th>StartDate</th>
                        <th>DueDate</th>                        
                    </tr>
                    {/* {
                        rows
                    } */} */}
                </table>
            </div>
        </>);
    }

    private async populateData() {
        try {
            let taskDetails: TaskDetails[] = await this.props.getTaskDetails();
            const mytable = document.getElementById("html-data-table");
            console.log('populate data called');
            let taskRows: string = '';
            taskDetails.forEach(taskDetail => {
                 let newRow = document.createElement("tr");
                taskRows += `<tr>`
                Object.values(taskDetail).forEach((value) => {
                    let cell = document.createElement("td");
                    cell.innerText = value;
                    newRow.appendChild(cell);
                    taskRows += `<td>${value} </td>`
                });
                taskRows += `</tr>`;
                 mytable!.appendChild(newRow);
            });
            console.log(taskRows);
            this.setState({
                rows: taskRows
            }
            );
        }
        catch (err) {
            console.log(err);
        }

    }

    private populateHeaderData(headers:IheaderData)
    {
        const mytable = document.getElementById("html-data-table");
        let headerRow = document.createElement("tr");
        headers.headerColumns.forEach(columnName => {
            let td=document.createElement('th');
            td.innerHTML=columnName;
            headerRow.appendChild(td);
        });
        mytable?.appendChild(headerRow);
        this.setState({
            rerender:!this.state.rerender
        })
    }
    private populateRowData(rows:ITasks)
    {
        const mytable = document.getElementById("html-data-table");
        let item = document.createElement("tr");
        rows.tasks.forEach(task=>{
            Object.values(task).forEach((value) => {
                let cell = document.createElement("td");
                cell.innerText = value;
                item.appendChild(cell);               
            });
        })
        mytable?.appendChild(item);
        this.setState({
            rerender:!this.state.rerender
        })
    }
}

export interface IheaderData{
    headerColumns:string[]|['id','title','description','regarding','regardingURL','dueDateTime','recordUrl']
}

export interface ITasks{
   tasks:ITask[]
}
export interface ITask
{
    id:string,
    title:string,
    description:string,
    regarding:string,
    regardingURL:string,
    dueDateTime:Date,
    recordUrl:string
}