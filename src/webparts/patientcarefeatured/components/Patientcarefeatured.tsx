import * as React from "react";
import styles from "./Patientcarefeatured.module.scss";
import { IPatientcarefeaturedProps } from "./IPatientcarefeaturedProps";
import { escape } from "@microsoft/sp-lodash-subset";
import IFeaturedDataProvider from "../dataprovider/IFeaturedDataProvider";
import ImageGallery from "react-image-gallery";
import "../../../../node_modules/react-image-gallery/build/image-gallery.css";
export interface IPatientcarefeaturedState {
  FeaturedData: any[];
  currentDataIndex:number;
}

export default class Patientcarefeatured extends React.Component<IPatientcarefeaturedProps,IPatientcarefeaturedState> {
  private _dataProvider: IFeaturedDataProvider;
  constructor(props: IPatientcarefeaturedProps) {
    super(props);
    this.state = {
      FeaturedData: [],
      currentDataIndex:0
    };
  }

  /*/*Sending the web part properties (top news API text,regional news API text,
    Count, View more link) to display the top news & regional news content to the page*/
    public componentDidMount(): void {
      this.props.dataprovider.selectedProperties = `Title,PublishingPageImageOWSIMGEX,LastModifiedTime,ListItem,Path`;
      this.props.dataprovider.featuredQueryText = this.props.searchQuery;
      this.props.dataprovider.Count = 3;
      this.props.dataprovider.getdataforFeatured().then((data:any[]) => {
        this.setState({
          FeaturedData: data
        });
      });
    }
    private _onSlide = (currentDataIndex: number) => {
      this.setState({
        currentDataIndex: currentDataIndex
      });
    }
  public render(): React.ReactElement<IPatientcarefeaturedProps> {
    return (
      <div className={ styles.patientcarefeatured }>
       <div className="cardImageComponent">
          <ImageGallery
            onSlide={this._onSlide.bind(this)}
            items={this.state.FeaturedData}
            thumbnailTitle
            startIndex={this.state.currentDataIndex}
            showPlayButton={false}
            showFullscreenButton={false}
            useBrowserFullscreen={true}
            showThumbnails={false}
            lazyLoad={true}
          />
          </div>
      </div>
    );
  }
}
