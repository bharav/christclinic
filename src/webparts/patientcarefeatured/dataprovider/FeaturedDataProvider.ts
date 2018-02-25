import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { Text, JsonUtilities, UrlUtilities } from "@microsoft/sp-core-library";
import ISearchDataProvider from "../../../common/dataproviders/ISearchDataProvider";
import SharePointDataProvider from "../../../common/dataproviders/SearchDataProvider";
import pnp, {
    ConsoleListener, Logger, LogLevel, SearchQuery,
    SearchQueryBuilder, SearchResults, SearchResult, setup, Web, Sort, SortDirection
} from "sp-pnp-js";
import { ISearchResults, IRefinementFilter } from "../../../common/models/ISearchResult";
import IFeaturedDataProvider from "./IFeaturedDataProvider";

class FeaturedDataProvider implements IFeaturedDataProvider {
    private _featureQueryText: string;
    private _selectedProperties: string;
    private _commondataprovider: ISearchDataProvider;
    private _featuredData: any[];
    private _count: number;
    public set featuredData(value: any[]) { this._featuredData = value; }
    public get featuredData(): any[] { return this._featuredData; }
    public set featuredQueryText(value: string) { this._featureQueryText = value; }
    public get featuredQueryText(): string { return this._featureQueryText; }
    public set selectedProperties(value: string) { this._selectedProperties = value; }
    public get selectedProperties(): string { return this._selectedProperties; }
    public get Count(): number { return this._count; }
    public set Count(value: number) { this._count = value; }
    public constructor(webPartContext: IWebPartContext) {
        this._commondataprovider = new SharePointDataProvider(webPartContext);
    }

    /**
     * Fetch Real data for Top Story Carousal
     */
    public getdataforFeatured(): Promise<any[]> {
        let data: SearchResult[];
        let searchRefinement: IRefinementFilter[] = [];
        let sort: Sort[];
        sort = [{
            Property: "LastModifiedTime",
            Direction: SortDirection.Descending
        }];
        this._commondataprovider.resultsCount = this._count;
        this._commondataprovider.selectedProperties = this._selectedProperties.split(",");
        return this._commondataprovider.search(this.featuredQueryText).then((searchresults: ISearchResults) => {
            this.featuredData = this.formatresultasneeded(searchresults);
                return this.featuredData;
            });
    }

    /**
     * Formatting Real data for Top Story Carousal
     */
    private formatresultasneeded(featureddata: ISearchResults):any[] {
        var _localdata: any = [];
        if (featureddata !== null) {
            featureddata.RelevantResults.forEach((data, index) => {
                    _localdata.push({
                        "original": data.PublishingPageImageOWSIMGEX.split("src")[1].substr(2).split('"')[0],
                        "description": data.Title.length>50? data.Title.substr(0,50)+"...":data.Title,
                        "path":data.Path
                    });
            });
        }
        return _localdata;
    }
}

export default FeaturedDataProvider;

