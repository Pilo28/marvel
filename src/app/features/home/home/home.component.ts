import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import md5 from 'md5';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  homeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.homeForm = this.fb.group({
      publicKey: ['',[Validators.required, Validators.minLength(6)]],
      privateKey: ['', [Validators.required, Validators.minLength(6)]],
      timestamp: [Date.now()]
    });
  }

  onSubmit(): void {
    if (this.homeForm.valid) {
    const { publicKey, privateKey, timestamp } = this.homeForm.value;
    const hash = md5(timestamp + privateKey + publicKey);
    localStorage.setItem('authHash', hash);
    localStorage.setItem('publicKey', publicKey);
    localStorage.setItem('timestamp', timestamp.toString());
    alert('Hash generado y guardado en el storage');
  }
  }
}
