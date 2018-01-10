import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { Text, JsonUtilities, UrlUtilities } from "@microsoft/sp-core-library";
import ISearchDataProvider from "../../../common/dataproviders/ISearchDataProvider";
import SharePointDataProvider from "../../../common/dataproviders/SearchDataProvider";
import pnp, {
    ConsoleListener, Logger, LogLevel, SearchQuery,
    SearchQueryBuilder, SearchResults, SearchResult, setup, Web, Sort, SortDirection
} from "sp-pnp-js";
import { ISearchResults, IRefinementFilter } from "../../../common/models/ISearchResult";
import INewsDataProvider from "./INewsDataProvider";

class NewsDataProvider implements INewsDataProvider {
    private _NewsSearchQueryText: string;
    private _selectedProperties: string;
    private _commondataprovider: ISearchDataProvider;
    private _carousalData: any[];
    private _newscount: number;
    public set carousalData(value: any[]) { this._carousalData = value; }
    public get carousalData(): any[] { return this._carousalData; }
    public set newSearchQueryText(value: string) { this._NewsSearchQueryText = value; }
    public get newSearchQueryText(): string { return this._NewsSearchQueryText; }
    public set selectedProperties(value: string) { this._selectedProperties = value; }
    public get selectedProperties(): string { return this._selectedProperties; }
    public get newsCount(): number { return this._newscount; }
    public set newsCount(value: number) { this._newscount = value; }
    public constructor(webPartContext: IWebPartContext) {
        this._commondataprovider = new SharePointDataProvider(webPartContext);
    }

    /**
     * Fetch Real data for Top Story Carousal
     */
    public getdataforCarousal(): Promise<any[]> {
        let newsdata: SearchResult[];
        let searchRefinement: IRefinementFilter[] = [];
        let sort: Sort[];
        sort = [{
            Property: "LastModifiedTime",
            Direction: SortDirection.Descending
        }];
        this._commondataprovider.resultsCount = this.newsCount;
        this._commondataprovider.selectedProperties = this._selectedProperties.split(",");
        return this._commondataprovider.search(this._NewsSearchQueryText).then((searchresults: ISearchResults) => {
            this.carousalData = this.formatresultasneeded(searchresults);
                return this.carousalData;
            });
    }

    /**
     * Formatting Real data for Top Story Carousal
     */
    private formatresultasneeded(newsdatas: ISearchResults):any[] {
        var _localdata: any = [];
        if (newsdatas !== null) {
            newsdatas.RelevantResults.forEach((newsdata, index) => {
                if (_localdata.length < this.newsCount) {
                    _localdata.push({
                        "original": newsdata.PublishingPageImageOWSIMGEX.split("src")[1].substr(2).split('"')[0],
                        "thumbnail": newsdata.PublishingPageImageOWSIMGEX.split("src")[1].substr(2).split('"')[0],
                        "thumbnailLabel": newsdata.Title
                    });
                }
            });
        }
        return _localdata;
    }
}

export default NewsDataProvider;

