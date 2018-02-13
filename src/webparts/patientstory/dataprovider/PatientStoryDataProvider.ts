import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { Text, JsonUtilities, UrlUtilities } from "@microsoft/sp-core-library";
import ISearchDataProvider from "../../../common/dataproviders/ISearchDataProvider";
import SharePointDataProvider from "../../../common/dataproviders/SearchDataProvider";
import pnp, {
    ConsoleListener, Logger, LogLevel, SearchQuery,
    SearchQueryBuilder, SearchResults, SearchResult, setup, Web, Sort, SortDirection
} from "sp-pnp-js";
import { ISearchResults, IRefinementFilter } from "../../../common/models/ISearchResult";
import IPatientStoryDataProvider from "./IPatientStoryDataProvider";

class PatientStoryDataProvider implements IPatientStoryDataProvider {
    private _searchQueryText: string;
    private _selectedProperties: string;
    private _commondataprovider: ISearchDataProvider;
    private _data: any[];
    public set Data(value: any[]) { this._data = value; }
    public get Data(): any[] { return this._data; }
    public set searchQueryText(value: string) { this._searchQueryText = value; }
    public get searchQueryText(): string { return this._searchQueryText; }
    public set selectedProperties(value: string) { this._selectedProperties = value; }
    public get selectedProperties(): string { return this._selectedProperties; }
    public constructor(webPartContext: IWebPartContext) {
        this._commondataprovider = new SharePointDataProvider(webPartContext);
    }

    /**
     * Fetch Real data for Top Story Carousal
     */
    public getdataforPatientStory(): Promise<any> {
        let data: SearchResult[];
        let searchRefinement: IRefinementFilter[] = [];
        let sort: Sort[];
        sort = [{
            Property: "LastModifiedTime",
            Direction: SortDirection.Descending
        }];
        this._commondataprovider.resultsCount = 1;
        this._commondataprovider.selectedProperties = this._selectedProperties.split(",");
        return this._commondataprovider.search(this.searchQueryText).then((searchresults: ISearchResults) => {
            this.Data = this.formatresultasneeded(searchresults);
                return this.Data;
            });
    }

    /**
     * Formatting Real data for Top Story Carousal
     */
    private formatresultasneeded(newsdatas: ISearchResults):any {
        debugger;
        var _localdata: any = [];
        if (newsdatas !== null) {
            newsdatas.RelevantResults.forEach((data, index) => {
                    _localdata.push({
                        "original": data.PublishingPageImageOWSIMGEX.split("src")[1].substr(2).split('"')[0],
                        "description": data.Title.length>50? data.Title.substr(0,300)+"...":data.Title,
                        "path":data.Path
                    });
            });
        }
        return _localdata.length>0?_localdata[0]:{};
    }
}

export default PatientStoryDataProvider;

