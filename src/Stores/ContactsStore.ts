import { makeAutoObservable } from "mobx"

import { IDataGetDto, IDataPostDto } from "../Interfaces/IContactsDto";

import Server from "../Server";

class ContactsStore {

    public data: IDataGetDto[] = [];

    public unsortedData: IDataGetDto[] = [];

    public dataById: IDataGetDto | null = null;

    public isShowModal = false;

    public isShowDialogDelete = false;

    public isShowDialogEdit = false;

    public currentId = "";

    public lastId = 0;

    constructor() {
        makeAutoObservable (this);
      }

    public async getDataFromServer(search: string = ""): Promise<IDataGetDto[]> {
        const data: IDataGetDto[] = await Server.getFromServer({search: search})

        this.data = data;
        this.unsortedData = data;

        this.lastId = Math.max(...data.map(item => Number(item.id)))

        return data;
    }

    public async getDataFromServerById(id: string): Promise<IDataGetDto> {
        const data: IDataGetDto = await Server.getFromServer({id: id})

        this.dataById = data;
        return data;
    }

    public sortData(name: string, sorted: string) {
        const sortData = this.data.slice();
        let param: "name" | "id" | "createdAt" | "updatedAt" = "name";

        switch (name) {
            case "name": {
                param = name;
                break;
            }
            case "id": {
                param = name;
                break;
            }
            case "createdAt": {
                param = name;
                break;
            }
            case "updatedAt": {
                param = name;
                break;
            }
        }

        switch (sorted) {
            case "": {
                this.data = sortData.sort((a,b) => (a[param] > b[param]) ? 1 : ((b[param] > a[param]) ? -1 : 0))
                break;
            }
            case "asc": {
                this.data = sortData.sort((a,b) => (a[param] < b[param]) ? 1 : ((b[param] < a[param]) ? -1 : 0))
                break;
            }
            case "desc": {
                this.data = this.unsortedData;
                break;
            }
        }
        
    }

    public postItem(id: string, userInfo: IDataPostDto) {
        Server.postToServer(id, userInfo);
        this.getDataFromServer()
    }

    public putItem(id: string, userInfo: IDataPostDto) {
        Server.patchToServer(id, userInfo);
        this.getDataFromServer()
    }

    public removeItemById(id: string) {
        Server.deleteFromServer(id);
        this.getDataFromServer()
    }

    public deInit() {
        this.data = []
    }

    public openDialogDelete = (id: string) => {
        this.currentId = id;
        this.isShowDialogDelete = true;
        this.isShowModal = true;
    }

    public closeDialogDelete = () => {
        this.isShowDialogDelete = false;
        this.isShowModal = false;
    }
    
    public openDialogEdit = (id: string | null) => {
        this.currentId = id ?? "";
        this.isShowDialogEdit = true;
        this.isShowModal = true;
    }

    public closeDialogEdit = () => {
        this.isShowDialogEdit = false;
        this.isShowModal = false;
    }
}

export default new ContactsStore();