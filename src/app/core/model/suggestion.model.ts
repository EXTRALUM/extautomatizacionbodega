export class SuggestionModel {

  DocumentoToCheck: string;
  DocumentoType: string;
  DocumentoResponse: string;
  UserId: string;

  constructor() {
    this.DocumentoToCheck = '';
    this.DocumentoType = '';
    this.DocumentoResponse = '';
    this.UserId = '';
  }
}
