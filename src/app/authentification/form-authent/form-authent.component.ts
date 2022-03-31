import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-form-authent',
  templateUrl: './form-authent.component.html',
  styleUrls: ['./form-authent.component.scss']
})
export class FormAuthentComponent implements OnInit {


  hide=true;
  returnUrl?: string;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }
  checkoutForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }



  onSubmit(): void {
        if (this.checkoutForm.invalid) {
            return;
        }
        this.userService.login(this.checkoutForm.value.username, this.checkoutForm.value.password).subscribe(res=>{


          this.userService.setWithExpiry("token",res,res.expires_in);
          this.router.navigate(['/team']);
        });
  }
}
