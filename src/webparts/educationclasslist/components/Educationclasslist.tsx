import * as React from 'react';
import styles from './Educationclasslist.module.scss';
import { IEducationclasslistProps } from './IEducationclasslistProps';
import { escape } from '@microsoft/sp-lodash-subset';
import EducationListDataProvider from "../data/EducationListDataProvider";
import IEducationListDataProvider from "../data/IEducationListDataProvider";
export interface IEducationclasslistState {
  educationlist: any[];
  classtype:string;
  pagenumber:number;
}

export default class Educationclasslist extends React.Component<IEducationclasslistProps, IEducationclasslistState> {
  private _dataProvider: IEducationListDataProvider;
  constructor(props: IEducationclasslistProps) {
    super(props);
    this._dataProvider = new EducationListDataProvider(this.props.webpartContext,this.props.listName);
    this.state = {
      educationlist: [],
      classtype:"",
      pagenumber:0
    };
  }
  public componentDidMount(): void {
    this._dataProvider.getdataforEducationList(this.props.classType.split("#")[0],1).then(data=>{
        this.setState({
            educationlist:data.value,
            classtype:this.props.classType.split("#")[0],
            pagenumber:1
        });
    });
  }
  private changeclasstype=(e: React.FormEvent<HTMLSelectElement>):void=> {
    let selectedclasstype:string = e.currentTarget.value;
    this._dataProvider.getdataforEducationList(selectedclasstype,1).then(data=>{
      this.setState({
        educationlist:data.value,
        classtype:selectedclasstype,
        pagenumber:1
    });
    });
      
  }

  public render(): React.ReactElement<IEducationclasslistProps> {
    const showsetparametermsg:any=<span>Please set class type properties</span>;
    return (
      <div className={ styles.educationclasslist }>
      {this.props.classType==="" || this.props.classType===undefined?
          showsetparametermsg:
                <div>
                  <select className="form-control" value={this.state.classtype} onChange={e => this.changeclasstype(e)}>
                    {this.props.classType.split('#').map((classtypeoption,key)=>{
                    return(<option value={classtypeoption}>{classtypeoption}</option>);
                    })}
                    </select>
                    <div>
                      {
                        this.state.educationlist.map((edulist,index)=> {
                          return(<div className={styles.items}>
                            <label>{edulist.Title}</label>
                            <p><label>Description:</label> {edulist.Description}</p>
                           <p><label>Location:</label> {edulist.Location}</p>
                          </div>);
                      })
                      }
                  </div>
            </div>
      }
      </div>
    );
  }
}
