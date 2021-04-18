declare interface ILoginResult {
  data: any;
  meta: any;
}

declare interface IUserInfoResult {
  data: IUser;
  meta: any;
}

declare interface IPatientsResult {
  data: Array<IPatient>;
  meta: any;
}
