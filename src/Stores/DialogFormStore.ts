import { makeAutoObservable, toJS } from "mobx"

import { IContactsDto, IDataGetDto, IDataPostDto } from "../Interfaces/IContactsDto";
import { IValidateFieldModel, IValidateRulesModel } from "../Interfaces/IValidateFormModel";
import Utils from "../Methods/Utils";

import ContactsStore from "./ContactsStore";

class DialogFormStore {

    public data: IDataGetDto[] = [];

    public id = "";

    public createdAt = "";

    public updatedAt = "";

    public name = "";

    public surname = "";

    public lastName = "";

    public contacts: IContactsDto[] = [];

    public isValid: boolean | null = null;

    public validField: IValidateFieldModel = {
        surname: null,
        name: null,
        lastName: null,
      };
    
      public validRules: IValidateRulesModel = {
        surname: ['required', 'length', 'name'],
        name: ['required', 'length', 'name'],
        lastName: ['required', 'length', 'name'],
      };

    constructor() {
        makeAutoObservable (this);
      }

    public async getDataFromServer(id: string): Promise<IDataGetDto> {
        const data: IDataGetDto = await ContactsStore.getDataFromServerById(id)

        this.id = data.id;
        this.name = data.name;
        this.surname = data.surname;
        this.lastName = data.lastName;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.contacts = data.contacts;
        this.validField = {
            surname: true,
            name: true,
            lastName: true,
          };
        return data;
    }

    public onChangeName = (value: string) => {
        this.name = value;
        this.validField.name = Utils.validateForm(this.validRules.name, value);
    };

    public onChangeSurname = (value: string) => {
        this.surname = value;
        this.validField.surname = Utils.validateForm(this.validRules.surname, value);
    };

    public onChangeLastName = (value: string) => {
        this.lastName = value;
        this.validField.lastName = Utils.validateForm(this.validRules.lastName, value);
    };

    public onChangeContactType = (index: number, type:string) => {
        this.contacts[index].type = type;
    };

    public onChangeContactValue = (index: number, value: string) => {
        this.contacts[index].value = value;
    };

    public onAddContact = () => {
        if (!this.contacts) this.contacts = [{type: 'phone', value: ''}];
        else this.contacts.push({type: 'phone', value: ''});
    };

    public onDeleteContact = (index: number) => {
        this.contacts.splice(index, 1);
    };

    public submitForm = () => {
        [this.validField, this.isValid] = Utils.checkValidity(this.validField);
        if (!this.isValid) return;

        this.updatedAt = new Date().toJSON();
        this.createdAt = (!this.id) ? new Date().toJSON() : this.createdAt;

        const userInfo: IDataPostDto = {
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            name: this.name,
            surname: this.surname,
            lastName: this.lastName,
            contacts: this.contacts,
        }

        if (!this.id) ContactsStore.postItem((ContactsStore.lastId+1).toString(), userInfo)
        else ContactsStore.putItem(this.id, userInfo)

        ContactsStore.closeDialogEdit();
    }

    public deInit() {
        this.id = "";
        this.createdAt = "";
        this.updatedAt = "";
        this.name = "";
        this.surname = "";
        this.lastName = "";
        this.contacts = [];
        this.validField = {
            surname: null,
            name: null,
            lastName: null,
        };
        this.isValid = null;
    }

    public openDialogDelete = () => {
    }
    

}

export default new DialogFormStore();