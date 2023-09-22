import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { UserDTO } from '../models/DTOs/user-dto';
import { decrypt } from '../util/crypt';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService extends Dexie {

  constructor() {
    super('DexieDB');

    this.version(1).stores({
      users: '++id, name, lastname, username, email, password'
    });
    
    this.open().then(data => console.log("DB abierto")).catch(err => console.log(err.message));
  }

  addUser(user: UserDTO) {
    this.table('users').add({
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      password: user.password
    }).then(() => console.log("user added")).catch((error) => console.log("Error adding user: ", error));
  }

  async getUser(userName: string, password: string) { 
    const $userFound = await this.table('users')
              .where('username')
              .equalsIgnoreCase(userName)
              .first().catch((error) => console.log("Error getting user: ", error));
    if($userFound){
      const decryptedPassword = decrypt<string>($userFound.password);
      if (decryptedPassword != null){
        if(decryptedPassword == password){
          console.log("user found and authenticate");
          return $userFound;
        }
      }
    }
    return null;
  }
}
