import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroepenDataService } from '../groepen-data.service';
import { Group } from '../../models/group.model';
import { Sessionmap } from '../../models/sessionmap.model';
import { EMPTY_ARRAY } from '@angular/core/src/render3/definition';

@Component({
  selector: 'app-groep',
  templateUrl: './groep.component.html',
  styleUrls: ['./groep.component.css']
})
export class GroepComponent implements OnInit {
  @Input() public group: Group;
  @Input() public sesmaps:Sessionmap[];
  @Output() public deleteGroup = new EventEmitter<Group>();
  @Output() public modifyGroup = new EventEmitter<Group>();
  sessiemapnaam:string;

  constructor(private _groupDataService:GroepenDataService) {

   }

  ngOnInit() {
    /*
    //console.log(this.group);
    //console.log(this.sesmaps);

    this.sesmaps.forEach(element => {
      //console.log("in de for");
      if(this.group.sessionmap_id == element._id){
        //console.log("in de if");
        this.sessiemapnaam = element.titleCourse;
        //console.log("sessiemapnaam1:" + this.sessiemapnaam);
        //console.log('sessiemapnaam2:' + element.titleCourse);
        //console.log("einde if");
      }
    }); */
    
    /*
    if(this.group != null && this.sesmaps.length > 0){
      this.printSessiemappen();
      console.log("niet leeg");
    }
    else{
      console.log("leeg");
    } */
  }
/*
  printSessiemappen(){
    this.sesmaps.forEach(element => {
      //console.log("in de for");
      if(this.group.sessionmap_id == element._id){
        //console.log("in de if");
        this.sessiemapnaam = element.titleCourse;
        //console.log("sessiemapnaam1:" + this.sessiemapnaam);
        //console.log('sessiemapnaam2:' + element.titleCourse);
        //console.log("einde if");
      }
    });
  } */

  removeGroup(){
    this.deleteGroup.emit(this.group);
  }

  editGroup(){
    this.modifyGroup.emit(this.group);
  }
}
