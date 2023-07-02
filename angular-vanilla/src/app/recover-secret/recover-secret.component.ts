import { Component, Input, OnInit } from '@angular/core';
import { SecretShare } from '../model/secretshare.model';
import { SecretsharingService } from '../service/secretsharing.service';

@Component({
  selector: 'recover-secret',
  templateUrl: './recover-secret.component.html',
  styleUrls: ['./recover-secret.component.css']
})
export class RecoverSecretComponent implements OnInit  {

  recoverShares: SecretShare[] = [];
  displayedColumns: string[] = ['Index','Actions'];

  constructor(private secretSharingService: SecretsharingService) {}

  ngOnInit() {
    this.secretSharingService.subscriberToShares$.subscribe(data => {

      this.recoverShares = data;
      // console.log('Secret Shares (Recover)= ' + JSON.stringify(data));
    });
  }
}
