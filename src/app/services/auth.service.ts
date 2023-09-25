import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { UserDTO } from '../models/DTOs/user-dto';
import { decrypt } from '../util/crypt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated: boolean = false;

  currentUser: UserDTO = new UserDTO('', '', '', '', '');

  constructor(private DBService: DatabaseService) { }

  async checkEmail(email: string){
    const $existingUser = await this.DBService.table('users')
      .where("email")
      .equals(email)
      .first()
      .catch((error) => console.log("Error searching user by email: ", error));
    if($existingUser){
      return true;
    }
    return false;
  }

  async checkUserName(userName: string){
    const $existingUser = await this.DBService.table('users')
      .where("username")
      .equals(userName)
      .first()
      .catch((error) => console.log("Error searching user by userName: ", error));
    if($existingUser){
      return true;
    }
    return false;
  }

  async addUser(user: UserDTO) {
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
          await this.DBService.table('users')
          .update($userFound.id, {session: true})
          .then(() => console.log("session update"))
          .catch((error) => console.log("Error updating session user: ", error));
          this.authenticated = true;
          this.currentUser = $userFound;
          this.currentUser.id = $userFound.id;
          console.log("Usuario autenticado: ", this.currentUser);
          return $userFound;
        }
      }
    }
    return null;
  }

  signOut(){
    if(this.currentUser.id != null){
      this.DBService.table('users')
                          .update(this.currentUser.id, {session: false});
      this.authenticated = false;
      return true;
    }
    return false;
  }

  isAuthenticated(){
    return this.authenticated;
  }

}
