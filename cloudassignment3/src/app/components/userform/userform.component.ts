import { Component, OnInit } from "@angular/core";
import { UserserviceService } from "../../services/userService/userservice.service";
import { employee } from "../../employee";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-userform",
  templateUrl: "./userform.component.html",
  styleUrls: ["./userform.component.css"],
})
export class UserformComponent implements OnInit {
  public emp: employee;
  readonlyParam;

  constructor(
    private userService: UserserviceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.readonlyParam = false;
    this.emp = this.userService.getter();
    if(!this.emp.id){
      this.readonlyParam = false
    } else {
      this.readonlyParam = true
    }
  }

  processForm() {
    this.userService.addOrEditEmp(this.emp).subscribe(
      (emp) => {
        console.log(emp);
        this.router.navigate(["/"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.router.navigate(["/"]);
  }
}
