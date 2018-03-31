import {IWebPartContext} from "@microsoft/sp-webpart-base";

export interface IAcceptOrRejectEventProps {
  listname: string;
  webpartcontext:IWebPartContext;
}
