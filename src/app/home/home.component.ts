import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  category = [];
  constructor(private api : ApiService,private router: Router, private route: ActivatedRoute) {}

   ngOnInit(): void {
    this.getToken();
  }

  getToken() {
    this.api.postData('getToken', {id: 'test'}).subscribe(res => {
      if(res['error'] == false) {
        localStorage.setItem('token', res['token']);     
        this.getAllCat();
      }
    }),(err) => {
      alert('Something went wrong please try again latter');
      this.category = [];
    }
  } 

  getAllCat() {
    let token = localStorage.getItem('token')
    this.api.getData('api/product/category').subscribe(res => {
      if(res['error'] == false) {
        this.category = res['data'];
      }
    }),(err) => {
      alert('Something went wrong please try again latter');
      this.category = [];
    }
  }

  goto(item) {
    this.router.navigate(['products'], { queryParams: { cat: item._id } });
  }


}
