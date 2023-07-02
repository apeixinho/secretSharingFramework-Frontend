import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { SecretShare } from '../model/secretshare.model';
import { SecretsharingService } from '../service/secretsharing.service';
import { SecretSharingValidators } from '../validators/secret-sharing-validators';

@Component({
  selector: 'split-secret',
  templateUrl: './split-secret.component.html',
  styleUrls: ['./split-secret.component.css'],
})
export class SplitSecretComponent implements OnInit {

  splitFormGroup: FormGroup;

  splitShares: SecretShare[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private secretSharingService: SecretsharingService
  ) {}

  ngOnInit(): void {
    this.splitFormGroup = this.formBuilder.group({
      splitRequest: this.formBuilder.group({
        threshold: new FormControl('', [
          Validators.required,
          Validators.min(1),
          Validators.max(300),
        ]),

        totalShares: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.max(300),
        ]),

        secret: new FormControl('', [
          Validators.required,
          SecretSharingValidators.notOnlyWhitespace,
        ]),
      }),
    });
  }

  get threshold() {
    return this.splitFormGroup.get('splitRequest.threshold');
  }

  get totalShares() {
    return this.splitFormGroup.get('splitRequest.totalShares');
  }
  get secret() {
    return this.splitFormGroup.get('splitRequest.secret');
  }

  splitSecret() {
    if (this.splitFormGroup.invalid) {
      this.splitFormGroup.markAllAsTouched();
    } else {
      const k: number = this.splitFormGroup.get(
        'splitRequest.threshold'
      )?.value;
      const n: number = this.splitFormGroup.get(
        'splitRequest.totalShares'
      )?.value;
      const secret: String = this.splitFormGroup.get(
        'splitRequest.secret'
      )?.value;

      this.secretSharingService.splitSecret(k, n, secret).subscribe((data) => {
        this.splitShares = data;
        // console.log('Secret Shares (Split) = ' + JSON.stringify(data));
        if (this.splitShares){
          this.secretSharingService.emitData(this.splitShares);
        }
      });
    }
  }
}
