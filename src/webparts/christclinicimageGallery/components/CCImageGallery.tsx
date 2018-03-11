import * as React from 'react';
import styles from './CCImageGallery.module.scss';
import { ICCImageGalleryProps } from './ICCImageGalleryProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ImageGallery  from "react-image-gallery";
import ICCImageGalleryDataProvider from "../data/ICCImageGalleryDataProvider";
import "../../../../node_modules/react-image-gallery/build/image-gallery.css";
export interface ICCImageGalleryState {
  CarousalData: any[];
}

export default class CCImageGallery extends React.Component<ICCImageGalleryProps, ICCImageGalleryState> {
  private _dataProvider: ICCImageGalleryDataProvider;
  constructor(props: ICCImageGalleryProps) {
    super(props);
    this.state = {
      CarousalData: []
    };
  }

  /*/*Sending the web part properties (top news API text,regional news API text,
    Count, View more link) to display the top news & regional news content to the page*/
    public componentDidMount(): void {
      this.props.dataprovider.selectedProperties = `Title,PictureURL,Path`;
      this.props.dataprovider.searchQueryText = this.props.searchQuery;
      this.props.dataprovider.getdataforImageGallery().then((data:any[]) =>{
        if(data.length>0){
          this.setState({
            CarousalData: data
          });
        }
        else{
          this.setState({
            CarousalData: []
          });
        }
       
      });
    }
  public render(): React.ReactElement<ICCImageGalleryProps> {
    return (
      <div  className="ccimagelibrary" >
        <div>
          <ImageGallery           
          items={this.state.CarousalData}
          slideInterval={2000}
          autoPlay={true}
          showPlayButton={false}
          showThumbnails={false}
          showFullscreenButton={false}
          showBullets={false}
          />
        </div>
        <div><a className="ccimglibuploadbtn" href={this.props.uploadurl}>Upload Image</a></div>
    </div>
    );
  }
}
