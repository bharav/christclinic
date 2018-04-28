import { IWebPartContext } from "@microsoft/sp-webpart-base";
import pnp, {
    ConsoleListener, Logger, LogLevel, SearchQuery,CamlQuery,
    SearchQueryBuilder, SearchResults, SearchResult, setup, Web, Sort, SortDirection
} from "sp-pnp-js";
import ISpecialistRequestData from "./ISpecialistRequestData";

class SpecialistRequestData implements ISpecialistRequestData {
  private _listName:string;
  private _context:IWebPartContext;
  private _data:any[]=[];
  private _label:any[]=[];
  private _bkcolor:any[]=[];
  public set listName(value: string) { this._listName = value; }
  public get listName(): string { return this._listName; }

  public constructor(webPartContext: IWebPartContext,listName:string) {
        this._context = webPartContext;
        this.listName = listName;
        pnp.setup({
            spfxContext:webPartContext
        });
    }

    public getdata(startDate:Date, endDate:Date):Promise<any>{
        let list = pnp.sp.web.lists.getByTitle(this.listName);
        const q: CamlQuery = {
            ViewXml: "<View><Query><Where><And><Gt><FieldRef Name='Created' /><Value IncludeTimeValue='FALSE' Type='DateTime'>"+startDate.toISOString()+"</Value></Gt><Leq><FieldRef Name='Created' /><Value IncludeTimeValue='FALSE' Type='DateTime'>"+endDate.toISOString()+"</Value></Leq></And></Where></Query></View>",
        };
        return list.getItemsByCAMLQuery(q).then(response=>{
            let formatedData = this.getDataforChart(response);
            return formatedData;
        });
    }
    public getDataforChart(data:any) {
        data.map((item,key)=>{
            if(this._label.length===0){
                this._label.push(item.Speciality);
                this._data.push(1);
                this._bkcolor.push(this.getRandomColor());
            }
            else{
                let index = this._label.indexOf(item.Speciality);
                if(index>=0){
                    this._data[index]+=1;
                }
                else{
                    this._label.push(item.Speciality);
                    this._data.push(1);
                    this._bkcolor.push(this.getRandomColor());
                }
            }
        });
        const chartdata = {
            labels:this._label,
            legend: {
                position: 'bottom'
              },
            datasets: [{
                data: this._data,
                backgroundColor:this._bkcolor
            }]
        };
        return chartdata;
    }
    private getRandomColor() {
        let letters:string = '0123456789ABCDEF';
        let color:string = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
}

export default SpecialistRequestData;