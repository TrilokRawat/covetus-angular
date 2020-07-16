import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
product;
  constructor(private route: ActivatedRoute, private api : ApiService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // this.queryParam = params['val'];
      console.log(params);
      this.getProduct(params)
    });
  }

  getProduct(params) {
    this.api.getData('api/product/'+ params['pro']).subscribe(res => {
      console.log(res);
      if(res['error'] == false) {
        this.product = res['data'][0];
      } else {
        this.product = undefined;
      }
    }),(err) => {
      this.product = undefined;
      alert('something went wrong please try again later')
    } 
  }
  

}
