import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LocalstorageService, UserObjective } from './../localstorage.service';
import { UserService } from './../user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalComponent } from './../../global-component';
import { ObjectiveViewPopUpComponent } from './../objective-view-pop-up/objective-view-pop-up.component';
import { ObjectiveDeletePopUpComponent } from './../objective-delete-pop-up/objective-delete-pop-up.component';

@Component({
  selector: 'app-admin-edit-objective',
  templateUrl: './admin-edit-objective.component.html',
  styleUrls: ['./admin-edit-objective.component.css']
})
export class AdminEditObjectiveComponent implements OnInit {


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
  public data: MatTableDataSource<UserObjective>;
  isCrudSet:boolean=false;


  ngOnInit(): void {
    this.isLoading = true;
    let url = "";
    if(
      this.storageService.GetCrudType.isCrudSet){url = GlobalComponent.apiUrl + "admin/getSetObjectivesStakeholders";
      this.displayedColumns=['name', 'description','Set Name','SetId', 'Edit', 'View', 'Delete'];
      this.isCrudSet=true;
    }
    else {
      url = GlobalComponent.apiUrl + "admin/getObjectivesStakeholders";
      this.displayedColumns=['name', 'description', 'Edit', 'View', 'Delete'];
      this.isCrudSet=false;
    }

    this.userService.getAdminData(url).subscribe(
      (r: any) => {

        this.data = r.getObjectivesResponseDTO.objectiveResponseDTOS;
        this.resultsLength = r.length;
        console.log(this.data);
        this.isLoading = false;
        this.data = new MatTableDataSource(r.getObjectivesResponseDTO.objectiveResponseDTOS);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;

      }
    )
  }

  viewData(data: any) {

    console.log(data.row);
    this.storageService.SetUserObjective = data;


    let ViewDialogRef = this.dialog.open(ObjectiveViewPopUpComponent, {
      data: data
    })
    ViewDialogRef.afterOpened().subscribe(r => {
      r = data;
      //console.log(r);
    })


  }

  onDelete(data: any) {

    console.log(data);

    let DeleteDialogRef = this.dialog.open(ObjectiveDeletePopUpComponent, {
      data: null
    })
    DeleteDialogRef.afterClosed().subscribe(r => {
      if (r) {
        this.isLoading = true;
        let url = GlobalComponent.apiUrl + 'admin/deleteStakeholderObjective';
        console.log('id: ', data.row.id);
        let body = {
          deleteType: "Objective",
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

  goToStakeholderObjective() {

    let addType = {
      addType: "Objective"
    }

    this.storageService.SetAdminAddType = addType;
    console.log(this.storageService.GetAdminAddType);
    this.router.navigate(['/adminAddStakeholderObjective']);
  }

  onEdit(data: any) {

    let setData = {
      updateType: 'Objective',
      id: data.row.id,
      name: data.row.name,
      description: data.row.description,
      setId:data.row.setId
    };
    console.log(setData);
    this.storageService.SetAdminUpdateType = setData;
    this.router.navigate(['/adminUpdateStakeholderObjective']);

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
