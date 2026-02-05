import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './shared/component.firebase/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rxjsSubjectHttp';

  private authService = inject(AuthService)

  isLoading : boolean = false

  ngOnInit(): void {
    this.authService.spinnerStstudObs$
        .subscribe(res => {
            this.isLoading = res
        })
  }

}
