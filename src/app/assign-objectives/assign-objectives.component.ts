import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GlobalComponent } from 'src/global-component';
import { LocalstorageService, UserStakeholder } from '../localstorage.service';
import { UserService } from '../user.service';
import { StakeholderViewPopUpComponent } from './../stakeholder-view-pop-up/stakeholder-view-pop-up.component';
import { StakeholderDeletePopUpComponent } from './../stakeholder-delete-pop-up/stakeholder-delete-pop-up.component';
import { AssignPriorityViewPopUpComponent } from './../assign-priority-view-pop-up/assign-priority-view-pop-up.component';
import { AssignPriorityDeletePopUpComponent } from './../assign-priority-delete-pop-up/assign-priority-delete-pop-up.component';

@Component({
  selector: 'app-assign-objectives',
  templateUrl: './assign-objectives.component.html',
  styleUrls: ['./assign-objectives.component.css']
})
export class AssignObjectivesComponent implements OnInit {


  constructor(public router: Router, public dialog: MatDialog, public storageService: LocalstorageService, public userService: UserService) {
    this.CurrentUser = this.storageService.GetCurrentuesr;
  }
  CurrentUser: any = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [];
  resultsLength = 0;
  isLoading: boolean = false;
  isView: Boolean = false;
  pageSize: number = 2;
  isEdit: boolean = false;
  public data: MatTableDataSource<UserStakeholder>;
  isAdmin:boolean=false;


  ngOnInit(): void {
    
    this.displayedColumns=['objectiveName','stakeholderName', 'priority', 'Edit', 'View', 'Delete'];
    this.isLoading = true;
    let url="";
    if(this.storageService.GetUserType.userType=='Admin'){
      this.isAdmin=true;
      url = GlobalComponent.apiUrl + "admin/getPriority";
      this.userService.Awake(url).subscribe(
        (r: any) => {
  
          this.data = r.responseBody;
          this.resultsLength = r.length;
          console.log(this.data);
          this.isLoading = false;
          this.data = new MatTableDataSource(r.responseBody);
          this.data.paginator = this.paginator;
          this.data.sort = this.sort;
  
        }
      )

    }else{

    this.displayedColumns=['objectiveName', 'priority', 'Edit', 'View', 'Delete'];

    this.isAdmin=false;
    url = GlobalComponent.apiUrl + "priority/getPriority";
    let body = {
      stakeholderId: this.storageService.GetUserStakeholder.id
    };
    console.log(body);
    this.userService.getData(url, body).subscribe(
      (r: any) => {

        this.data = r.responseBody;
        this.resultsLength = r.length;
        console.log(this.data);
        this.isLoading = false;
        this.data = new MatTableDataSource(r.responseBody);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;

      }
    )
  }
  }

  goBack(){
    if (this.isAdmin) {
      this.router.navigate(['/adminmain'])
    }else{
      this.router.navigate(['/stakeholdersUser'])
    }
  }

  viewData(data: any) {

    
    this.storageService.SetAssignPriority = data.row;
    console.log(this.storageService.GetAssignPriority);

    let ViewDialogRef = this.dialog.open(AssignPriorityViewPopUpComponent, {
      data: data
    })
    ViewDialogRef.afterOpened().subscribe(r => {
      r = data;
      //console.log(r);
    })


  }

  onDelete(data: any) {

    console.log(data);

    let DeleteDialogRef = this.dialog.open(AssignPriorityDeletePopUpComponent, {
      data: null
    })
    DeleteDialogRef.afterClosed().subscribe(r => {
      if (r) {
        this.isLoading = true;
        let url = GlobalComponent.apiUrl + 'priority/deletePriority';
        console.log('id: ', data.row.id);
        let body = {
          id: data.row.id
        }
        this.userService.DeleteAccount(url, body).subscribe(
          (r: any) => {
            console.log(r),
              this.ngOnInit();
          },
          (e: any) => {
            console.log(e);
          }
        )
      }
    })

  }
  
  goToAssignObjective(data:any){
      this.storageService.SetUserStakeholder = data.row;
      console.log(this.storageService.GetUserStakeholder);
      console.log(this.storageService.GetCurrentuesr);
      console.log(this.storageService.GetUserObjective);
  }

  onEdit(data: any) {
    let priority={
      id:data.row.id,
      name:data.row.objectiveName,
      priority:data.row.priority
    }
    this.storageService.SetAssignPriority=priority;
    // console.log(priority);
    // console.log(this.storageService.GetUserStakeholder);
    this.router.navigate(['/updatePriority']);

  }

  changeView() {
    if (this.isView) {
      this.isView = false;
      console.log(this.isView);

    } else {
      this.isView = true;
      console.log(this.isView);

    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

}
