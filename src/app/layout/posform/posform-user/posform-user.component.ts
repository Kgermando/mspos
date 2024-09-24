import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { IUser } from '../../user/models/user.model';

@Component({
  selector: 'app-posform-user',
  templateUrl: './posform-user.component.html',
  styleUrl: './posform-user.component.scss'
})
export class PosformUserComponent implements OnInit {
  @Input() id_user!: number;

  dataItem!: IUser;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.get(this.id_user).subscribe(res => {
      this.dataItem = res.data;
    });
  }

}
