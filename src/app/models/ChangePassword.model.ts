export class ChangePassword{

public userId:number;
public currentPassword:string;
public newPassword:string;

constructor(userId:number, currentPassword:string, newPassword:string){

this.userId=userId;
this.currentPassword=currentPassword;
this.newPassword=newPassword;

}


}