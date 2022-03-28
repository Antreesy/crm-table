export interface IContactsDto {
    type: string;
    value: string;
}

export interface IDataGetDto {
    id: string,
    createdAt: string,
    updatedAt: string,
    
    name: string,
    surname: string,
    lastName: string,
    
    contacts: IContactsDto[];
}

export interface IDataPostDto {
    createdAt: string,
    updatedAt: string,
    
    name: string,
    surname: string,
    lastName: string,
    
    contacts: IContactsDto[];
}

export interface IInformationDto {
    data: IDataGetDto[]
}