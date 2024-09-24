import { Component } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { InscriptionStep1Component } from '../step1-credential/step1-credential.component';
import { InscriptionStep2Component } from '../step2-credendial/step2-credential.component';
import { InscriptionStep3Component } from '../step3-credendial/step3-credential.component';
import { BackButtonComponent } from '../../button/back-button/back-button.component';
import { Step0HomeLoginComponent } from '../step0-home-login/step0-home-login.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignUpService } from '../../../service/on-sign-up.service';





@Component({
  selector: 'app-inscription-main',
  standalone: true,
  imports:[InscriptionStep1Component, ProgressBarComponent,
    InscriptionStep2Component, BackButtonComponent,
    Step0HomeLoginComponent, InscriptionStep3Component, CommonModule],
  templateUrl: './inscription-main.component.html',
  styleUrl: './inscription-main.component.css'



})
export class InscriptionMainComponent {

  email: string = ''; // Déclaration des propriétés
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  level: string = '';
  ranking: string = '';

  isStep1Valid = false; // Variable to track if step 1 is valid
  isStep2Valid = false; // Variable to track if step 2 is valid
  isStep3Valid = false; // Variable to track if step 3 is valid
  currentStep = 1;

  constructor(private router: Router,  private signUpService: SignUpService) {}

 // Method to control the 'Next' button state
canProceed(): boolean {
  if (this.currentStep === 1) {
    return this.isStep1Valid; // Validation du Step 1
  } else if (this.currentStep === 2) {
    return this.isStep2Valid; // Validation du Step 2
  }
  else if (this.currentStep === 3) {
    return this.isStep3Valid; // Validation du Step 3
  }

  return true
}
// Method to move to the next step
nextStep() {
  if (this.currentStep < 3 && this.canProceed()) {
    this.currentStep++;
  }
}

  // redirect to home-login page if the user is on the first step
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    } else {
      this.router.navigate(['/home-login']);
    }
  }

    // This method will be called by child component to update step 1 validity
    updateStep1Validity(isValid: boolean) {
      this.isStep1Valid = isValid;
    }

    // This method will be called by child component to update step 2 validity
    updateStep2Validity(isValid: boolean) {
    this.isStep2Valid = isValid;
    }

     // This method will be called by child component to update step 3 validity
    updateStep3Validity(isValid: boolean) {
      this.isStep3Valid = isValid;
    }

    register() {
      const formData = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        level: this.level,
        ranking: this.ranking
      };

      this.signUpService.saveToMongo(formData).subscribe({
        next: (response) => {
          console.log('Inscription réussie:', response);
          // Rediriger ou informer l'utilisateur
          this.router.navigate(['/home-login']); // Redirection vers la page de connexion
        },
        error: (error) => {
          console.error('Erreur lors de l\'inscription:', error);
          // Afficher un message d'erreur à l'utilisateur
        }
      });
}
}
