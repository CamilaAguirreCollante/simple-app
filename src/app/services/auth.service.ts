import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { UserDTO } from '../models/DTOs/user-dto';
import { decrypt } from '../util/crypt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated: boolean = false;

  constructor(private DBService: DatabaseService) { }

  addUser(user: UserDTO) {
    this.DBService.table('users').add({
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      password: user.password, 
      session: false
    }).then(() => console.log("user added")).catch((error) => console.log("Error adding user: ", error));
  }

  async signIn(userName: string, password: string) { 
    const $userFound = await this.DBService.table('users')
              .where('username')
              .equalsIgnoreCase(userName)
              .first().catch((error) => console.log("Error getting user: ", error));
    if($userFound){
      const decryptedPassword = decrypt<string>($userFound.password);
      if (decryptedPassword != null){
        if(decryptedPassword == password){
          console.log("user found and authenticate");
          this.DBService.table('users')
                        .update($userFound.id, {session: true});
          this.authenticated = true;
          return $userFound;
        }
      }
    }
    return null;
  }

  //signOut(id: number){
  signOut(){
    // this.DBService.table('users')
    //                     .update(id, {session: false});
    this.authenticated = false;
  }

  isAuthenticated(){
    return this.authenticated;
  }

}
