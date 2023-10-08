export class errorException extends Error {
    public message:string;
    public code: number;
    constructor(message:string ,code : number) {
        super(message);
        this.message = message;
        this.code = code;
    }
    
};