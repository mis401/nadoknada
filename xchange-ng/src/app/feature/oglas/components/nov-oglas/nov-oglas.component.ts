import { Component, OnInit } from '@angular/core';
import { Oglas } from '../../models/oglas.model';
import { Kategorija } from '../../models/kategorija.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OglasService } from '../../services/oglas.service';
import { selectUser } from 'src/app/feature/user/state/user.selector';
import { take } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { AuthToken } from 'src/app/feature/user/models/authtoken.model';
import { JWT } from 'src/app/feature/user/models/jwt.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nov-oglas',
  templateUrl: './nov-oglas.component.html',
  styleUrls: ['./nov-oglas.component.scss']
})
export class NovOglasComponent implements OnInit {
  oglas : Oglas = {
    id: '',
    naziv: '',
    kvalitet: '',
    brojPoseta: 0,
    opis: '',
    datumKreiranja: new Date(),
    ponuda: '',
    stanjeOglasa: 'aktivan',
    aktivanOglas: true,
    resenOglas: false,
    obrisanOglas: false,
    datumResavanja: new Date(),
    datumBrisanja: new Date(),
    razlogBrisanja: '',
    kreiraoKorisnikId: '',
    kategorijaIds: [],
    slike: [],
    slikaURL: '',
  } 
  slika: string | null = null;
  user: string = '';
  kategorije: Kategorija[] = [];
  constructor(private store: Store<AppState>, 
    private service: OglasService, 
    public formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.store.select(selectUser).pipe(take(1)).subscribe({
      next: (user) => {
        this.user = user;
      }
    })
    this.service.vratiSveKategorije().subscribe({
      next: (kat) => {
        this.kategorije = [...kat];
      }
    })
  }


  

  oglasForm: FormGroup = this.formBuilder.group({
    naziv_oglasa: ['', Validators.required],
    opis_oglasa: ['', Validators.required],
    ponuda: ['', Validators.required],
    grad: ['', Validators.required],
    kvalitet: ['', Validators.required],
    kategorija: [[], Validators.required],
    tip_oglasa: ['', Validators.required],
  })
  
  uploadForm: FormGroup = this.formBuilder.group({
    slika: ['', Validators.required]
  })

  onSubmit(){
    this.oglas.naziv=this.oglasForm.get('naziv_oglasa')?.value;
    this.oglas.opis=this.oglasForm.get('opis_oglasa')?.value;
    this.oglas.ponuda=this.oglasForm.get('ponuda')?.value;
    this.oglas.kvalitet=this.oglasForm.get('kvalitet')?.value;
    this.oglas.kategorijaIds = this.oglasForm.get('kategorija')?.value;
    this.oglas.slike = this.uploadForm.get('slika')?.value;
    this.oglas.kreiraoKorisnikId = jwt_decode<JWT>(this.user).sub;
    console.log("sace okine");
    const formData = new FormData();
    formData.append('file', this.selectedFile!);
    formData.append('naziv', this.oglas.naziv);
    formData.append('opis', this.oglas.opis);
    formData.append('ponuda', this.oglas.ponuda);
    formData.append('kvalitet', this.oglas.kvalitet);
    formData.append('slike', "['']");
    formData.append('kategorijeIds', this.oglas.kategorijaIds?.toString()!);
    formData.append('kreiraoKorisnikId', jwt_decode<JWT>(this.user).sub);
    console.log(formData);
    this.service.dodajOglas(formData).subscribe({
      next: (oglas) => {
        console.log(oglas);
        if(oglas != null && oglas.id != null && oglas.id != ''){
          this.router.navigate(['/oglasi', oglas.id]);
        }
        else{
          alert("Greska pri dodavanju oglasa");
        }
      }
    })
  }//DA LI MOZE DA POSALJE VISE KATEGORIJA I PRIMI VISE KATEGORIJA  

  selectedFile: File | null = null;
  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log(file);
    this.selectedFile = event.target.files[0];
    if(this.uploadForm.get('slika') != null){
      this.uploadForm.get('slika')!.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.slika = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }
}
