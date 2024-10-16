import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface RegisterForm {
  phoneNumber: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  level: string;
  ranking: string | null;
}


@Injectable({
  providedIn: 'root',
})
export class FormService {
  // Initialisation d'un BehaviorSubject avec un objet RegisterForm vide
  private formSubject = new BehaviorSubject<RegisterForm>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    level: '',
    ranking: '',
  });

  // Observable pour les autres composants
  form$ = this.formSubject.asObservable();

  // Méthode pour mettre à jour une partie du formulaire
  updateForm(partialForm: Partial<RegisterForm>) {
    const currentForm = this.formSubject.value;
    this.formSubject.next({ ...currentForm, ...partialForm });
  }

  // Méthode pour obtenir les données actuelles du formulaire
  getFormData(): RegisterForm {
    return this.formSubject.value;
  }
}
