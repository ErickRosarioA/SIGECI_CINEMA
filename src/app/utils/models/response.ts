export interface IResponseModel<T> {
    succeded: boolean
    warnings: string[]
    identity: number
    dataList: T[]
    singleData: T
  }
  
export class IErrorResponse{
    public StatusCode?: number;
    public Message?: string;
    public Details: ErrorDetails[];

    constructor() {
        this.Details = [];
    }
}

interface ErrorDetails {
    Title: string;
    Message: string;
}

