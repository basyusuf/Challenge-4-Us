export interface IServiceResponse {
    statusCode:number;
    message?:string | string[];
    data?:any;
    error?:any;
}
export class ServiceResponse implements IServiceResponse {
    statusCode:number;
    message?:string | string[];
    data?:any;
    error?:any;
    constructor(responseData:IServiceResponse){
        this.statusCode = responseData.statusCode;
        if(responseData.message){
            this.message = responseData.message;
        }
        if(responseData.error){
            this.error = responseData.error;
        }
        if(responseData.data){
            this.data = responseData.data;
        }
        return this;
    }
}