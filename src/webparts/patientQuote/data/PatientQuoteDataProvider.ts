import { IWebPartContext } from "@microsoft/sp-webpart-base";
import pnp, {
    ConsoleListener, Logger, LogLevel, SearchQuery,
    SearchQueryBuilder, SearchResults, SearchResult, setup, Web, Sort, SortDirection
} from "sp-pnp-js";
import IPatientQuoteDataProvider from "./IPatientQuoteDataProvider";

class PatientQuoteDataProvider implements IPatientQuoteDataProvider {
    private _listName: string;
    private _context:IWebPartContext;
    public set listName(value: string) { this._listName = value; }
    public get listName(): string { return this._listName; }
    public constructor(webPartContext: IWebPartContext,listName:string) {
        this._context = webPartContext;
        this.listName = listName;
        pnp.setup({
            spfxContext:webPartContext
        });
    }

    /**
     * Fetch Real data for Top Story Carousal
     */
    public getdata(): Promise<any> {
        let list = pnp.sp.web.lists.getByTitle(this.listName);
        return list.items.getAll().then(response=>{
            return response;
        });
    }

}

export default PatientQuoteDataProvider;

