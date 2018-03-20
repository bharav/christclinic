import * as React from 'react';
import styles from './EducationInstructorList.module.scss';
import { IEducationInstructorListProps } from './IEducationInstructorListProps';
import { escape } from '@microsoft/sp-lodash-subset';
import EducationListDataProvider from "../data/EduInstructorDataProvider";
import IEducationListDataProvider from "../data/IEduInstructorDataProvider";
export interface IEducationInstructorListState {
  instructerlist: any[];
  pagenumber:number;
}

export default class EducationInstructorList extends React.Component<IEducationInstructorListProps, IEducationInstructorListState> {
  private _dataProvider: IEducationListDataProvider;
  constructor(props: IEducationInstructorListProps) {
    super(props);
    this._dataProvider = new EducationListDataProvider(this.props.webpartContext,this.props.listName);
    this.state = {
      instructerlist: [],
      pagenumber:0
    };
  }
  public componentDidMount(): void {
    this._dataProvider.getdataforInstructorList(1).then(data=>{
        this.setState({
             instructerlist:data.value,
             pagenumber:1
        });
    });
  }
  public render(): React.ReactElement<IEducationInstructorListProps> {
    return (
      <div className={ styles.educationInstructorList }>
      {
        this.props.listName!=="" && this.props.listName!==undefined?
        <ul className="list-WP-img">{this.state.instructerlist.map((instructer,key)=>{
          return(<li><img src={instructer.Picture.Url+"?width=90"} />
          <p>{instructer.Title}</p>
          <span>{instructer.AboutProvider.length>150?instructer.AboutProvider.substring(0, 150)+"...":instructer.AboutProvider}</span></li>);
        })}</ul>:<span>Please set the list name</span>
      }
      </div>
    );
  }
}
