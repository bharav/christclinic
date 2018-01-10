declare interface IHomePageNewsStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel:string;
  SearchQueryTextFieldLabel:string;
  NewsCountFieldLabel:string;
  LayoutFieldName:string;
  LayoutChoice1:string;
  LayoutChoice2:string;
}

declare module 'homePageNewsStrings' {
  const strings: IHomePageNewsStrings;
  export = strings;
}
