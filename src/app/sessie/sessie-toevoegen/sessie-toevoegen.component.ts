import {Component, OnInit, Output, Input, ViewEncapsulation, EventEmitter} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SessieDataService} from '../sessie-data.service';
import {Session} from '../../models/session.model';
import {HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {Sessionmap} from '../../models/sessionmap.model';

export class SessieErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sessie-toevoegen',
  templateUrl: './sessie-toevoegen.component.html',
  styleUrls: ['./sessie-toevoegen.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SessieToevoegenComponent implements OnInit {
  @Output() public disable = new EventEmitter();
  @Output() public addSession = new EventEmitter();
  @Input() public sessionmap: Sessionmap;


  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = {percentage: 0};
  public newSession: FormGroup;
  public matcher = new SessieErrorStateMatcher();

  color = 'primary';
  mode = 'determinate';

  constructor(private _fb: FormBuilder, private _sessionDataService: SessieDataService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.newSession = this._fb.group({
        title: ['', [Validators.maxLength(50), Validators.required ]],
        description: ['', [Validators.maxLength(100), Validators.required ]]
      }
    );
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    console.log(event.target.files)
  }

  onSubmit() {
    if (this.newSession.valid) {
      this.progress.percentage = 0;
      this.currentFileUpload = this.selectedFiles.item(0);

      let session = new Session(this.newSession.value.title, this.sessionmap.sessions.items.length, "",this.newSession.value.description ,this.currentFileUpload);
      this.saveSession(session);
    }
    else {
      this.snackBar.open('Vul alle velden correct in, aub', '',
        {
          duration: 3000,
        });
    }
  }

  saveSession(session: Session) {
    this._sessionDataService.addNewSession(session, this.sessionmap.id).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          let session = Session.fromJSON(event.body);
          this.addSession.emit(session);
          this.snackBar.open('Sessie succesvol toegevoegd!', '', {
            duration: 3000,
          });
        }

      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(`Error ${error.status} while adding new sessie: ${error.error}`, '', {
          duration: 3000,
        });
      }
    );
  }

  setDisable() {
    this.newSession.reset();
    this.disable.emit();
  }
}
