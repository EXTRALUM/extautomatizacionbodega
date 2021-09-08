export class ValidationModel {
    ValidationType: number;
    ValidationValue: string;
    ValidationReference: string
    ValidationResponse: string;

    constructor() {
      this.ValidationReference = '';
      this.ValidationResponse = '';
      this.ValidationType = 0;
      this.ValidationValue = ''
    }
}
