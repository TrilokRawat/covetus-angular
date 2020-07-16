import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  product = [];
  constructor(private route: ActivatedRoute, private api : ApiService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // this.queryParam = params['val'];
      console.log(params);
      this.getProduct(params)
    });
  }

  getProduct(params) {
    this.api.getData('api/product?cat_id='+ params['cat']).subscribe(res => {
      console.log(res);
      if(res['error'] == false) {
        this.product = res['data']
      } else {
        this.product = [];
      }
    }),(err) => {
      this.product = [];
      alert('something went wrong please try again later')
    } 
  }

  goto(item){
    this.router.navigate(['productsDetail'], { queryParams: { pro: item._id } });

  }

}
