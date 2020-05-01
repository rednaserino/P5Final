import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { categories } from "../components/users/types/categories";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  apiPath = environment.apiBaseUrl;
  users: Array<{ id: number; name: string }> = [];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Array<{ id: number; name: string }>> {
    return this.http.get(`${this.apiPath}/users`) as Observable<
      Array<{ id: number; name: string }>
    >;
  }

  addUser(name: string) {
    return this.http.post(`${this.apiPath}/users`, { name: name });
  }

  deleteUser(userId: number) {
    return this.http.delete(`${this.apiPath}/users?userId=${userId}`);
  }

  getUserById(
    id: number
  ): Observable<{ id: number; name: string; notes: Array<any> }> {
    return new Observable((subscriber) => {
      subscriber.next({
        id: 1,
        name: "Susan",
        notes: [
          "Take a walk",
          "X-marks the spot",
          "The square roots of 16 are 4 & -4",
        ],
      });
      subscriber.complete();
    });
  }

  getNotesByUserName(name: string) {
    return this.http.get(`${this.apiPath}/notes?name=${name}`);
  }

  addNote(userId: number, note: string, category: categories) {
    return this.http.post(`${this.apiPath}/notes`, {
      userId: userId,
      content: note,
      category: category,
    });
  }

  editNote(note: string, userId: number, noteId: number, category: categories) {
    return this.http.put(`${this.apiPath}/notes`, {
      noteId: noteId,
      userId: userId,
      content: note,
      category: category,
    });
  }

  deleteNote(userId: number, noteId: number) {
    return this.http.delete(
      `${this.apiPath}/notes?userId=${userId}&noteId=${noteId}`
    );
  }

  // addNote(name: string, note: string) {
  //   return this.http.get(
  //     `${this.apiPath}/addnote?name=${name}&content=${note}`
  //   );
  // }
}
