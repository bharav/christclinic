import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { Text, JsonUtilities, UrlUtilities } from "@microsoft/sp-core-library";
import ISearchDataProvider from "../../../common/dataproviders/ISearchDataProvider";
import SharePointDataProvider from "../../../common/dataproviders/SearchDataProvider";
import pnp, {
    ConsoleListener, Logger, LogLevel, SearchQuery,
    SearchQueryBuilder, SearchResults, SearchResult, setup, Web, Sort, SortDirection
} from "sp-pnp-js";
import { ISearchResults, IRefinementFilter } from "../../../common/models/ISearchResult";
import IPatientCareNewsDataProvider from "./IPatientCareNewsDataProvider";

class PatientCareNewsDataProvider implements IPatientCareNewsDataProvider {
    private _searchQueryText: string;
    private _selectedProperties: string;
    private _commondataprovider: ISearchDataProvider;
    private _data: any[];
    private _count: number;
    public set Data(value: any[]) { this._data = value; }
    public get Data(): any[] { return this._data; }
    public set searchQueryText(value: string) { this._searchQueryText = value; }
    public get searchQueryText(): string { return this._searchQueryText; }
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
    public getdataforNews(): Promise<any[]> {
        let data: SearchResult[];
        let searchRefinement: IRefinementFilter[] = [];
        let sort: Sort[];
        sort = [{
            Property: "LastModifiedTime",
            Direction: SortDirection.Descending
        }];
        this._commondataprovider.resultsCount = this._count;
        this._commondataprovider.selectedProperties = this._selectedProperties.split(",");
        return this._commondataprovider.search(this.searchQueryText).then((searchresults: ISearchResults) => {
            this.Data = this.formatresultasneeded(searchresults);
                return this.Data;
            });
    }

    /**
     * Formatting Real data for Top Story Carousal
     */
    private formatresultasneeded(newsdatas: ISearchResults):any[] {
        var _localdata: any = [];
        if (newsdatas !== null) {
            newsdatas.RelevantResults.forEach((data, index) => {
                    _localdata.push({
                        "title":data.title,
                        "path":data.path
                    });
            });
        }
        return _localdata;
    }
}

export default PatientCareNewsDataProvider;

