import * as React from 'react';
import './image-gallery.css';
import styles from './HomePageNews.module.scss';
import { IHomePageNewsProps } from './IHomePageNewsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import INewsDataProvider from "../dataprovider/INewsDataProvider";
import ImageGallery from "react-image-gallery";
export interface IHomePageNewsState {
  NewsCarousalData: any[];
  layout:string;
}

export default class HomePageNews extends React.Component<IHomePageNewsProps, IHomePageNewsState> {
  private _dataProvider: INewsDataProvider;
  constructor(props: IHomePageNewsProps) {
    super(props);
    this.state = {
      NewsCarousalData: [],
      layout:this.props.layout
    };
  }

  /*/*Sending the web part properties (top news API text,regional news API text,
    Count, View more link) to display the top news & regional news content to the page*/
    public componentDidMount(): void {
      this.props.dataprovider.selectedProperties = `Title,PublishingPageImageOWSIMGEX,LastModifiedTime,ListItem`;
      this.props.dataprovider.newSearchQueryText = this.props.newssearchquery;
      this.props.dataprovider.newsCount = this.props.newscount;
      this.props.dataprovider.getdataforCarousal().then((data:any[]) =>{
        this.setState({
          NewsCarousalData: data,
          layout:this.props.layout
        });
      });
    }
  public render(): React.ReactElement<IHomePageNewsProps> {
    const imageGalleryClass:string=this.state.layout==="Verticle"?"carousel-leftthumbnail":"mc-topNews-component";
    const thumbnailPosition:string=this.state.layout==="Verticle"?"right":"bottom";
    return (
      <div>
        <div className={imageGalleryClass}>
          <ImageGallery
          items={this.state.NewsCarousalData}
          slideInterval={2000}
          autoPlay={false}
          showPlayButton={false}
          showFullscreenButton={false}
          thumbnailPosition={thumbnailPosition} />
        </div>
      </div>
    );
  }
}
