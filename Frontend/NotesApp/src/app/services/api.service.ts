import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getUsers = () => {
    return [
      {
        id: 1,
        name: "Igor",
        notes: [
          "Take a walk",
          "X-marks the spot",
          "The square roots of 16 are 4 & -4"
        ]
      },
      {
        id: 2,
        name: "Wolfie",
        notes: [
          "Take a walk",
          "X-marks the spot",
          "The square roots of 16 are 4 & -4"
        ]
      },
      {
        id: 3,
        name: "Roeland",
        notes: [
          "Take a walk",
          "X-marks the spot",
          "The square roots of 16 are 4 & -4"
        ]
      },
      {
        id: 4,
        name: "Nick",
        notes: [
          "Take a walk",
          "X-marks the spot",
          "The square roots of 16 are 4 & -4"
        ]
      },
      {
        id: 5,
        name: "Susky",
        notes: [
          "Take a walk",
          "X-marks the spot",
          "The square roots of 16 are 4 & -4"
        ]
      }
    ];

    // return this.http.get("https://jouw-glitch-url/users");
  };

  getUserById(
    id: number
  ): Observable<{ id: number; name: string; notes: Array<any> }> {
    return new Observable(subscriber => {
      subscriber.next({
        id: 1,
        name: "Susan",
        notes: [
          "Take a walk",
          "X-marks the spot",
          "The square roots of 16 are 4 & -4"
        ]
      });
      subscriber.complete();
    });
  }

  deleteUserById(id: number): void {
    // let delete$ = this.http.delete(`${this.usersApiPath}/${id}`);
    // delete$.subscribe(r => {
    //   console.log(r);
    //   this.router.navigateByUrl('/users');
    // });
  }

  addUser(user: { name: string }) {}
  addNote(note: { note: string }) {}
}
