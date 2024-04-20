
export interface Aspect {
    id:number;
    aspect: string;
    value: string
    time: string
}

export interface AspectResponse {
    items: Aspect[]
}

export interface AspectRequest {

}
