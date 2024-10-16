import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // URL de votre serveur

  constructor(private http: HttpClient) {}

  // Fonction pour se connecter
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/connexion`, { email, password });
  }

  // Stocker le token après la connexion
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // fonction pour récupérer l'utilisateur connecté
  getUser(){
   const token = this.getToken();
   if (!token) {
      return null;
    }
    const user = this.decodeToken(token);
    console.log(user);
    return user;
  }

  getUserWithClub(): Observable<any> {
    const userId = this.getCurrentUserId(); // méthode pour obtenir l'ID de l'utilisateur
    return this.http.get(`/api/users/${userId}`); // Assurez-vous d'avoir une API qui retourne l'utilisateur avec les détails du club
  }


  //fonction pour récupérer le token
  getToken() {
    return localStorage.getItem('token');
  }

  // fonction pour décoder le token
  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decoded = window.atob(payload);
    return JSON.parse(decoded);
  }

  // Nouvelle fonction pour récupérer l'ID de l'utilisateur connecté
getCurrentUserId(): string | null {
  const user = this.getUser();
  return user ? user.id : null; // Renvoie l'ID de l'utilisateur ou null si non connecté
}

// Nouvelle fonction pour se déconnecter
logout(): void {
  localStorage.removeItem('token'); // Supprime le token
}


}


