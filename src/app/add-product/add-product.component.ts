import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  category = [];
  productForm = new FormGroup({
    name: new FormControl(''),
    sku: new FormControl(''),
    category: new FormControl(''),
    color: new FormControl(''),
    origin: new FormControl(''),
    image: new FormControl(''),
  });
  submitted: boolean= false;
  imageData;
  image;
  message;
  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      sku: ['', Validators.required],
      category: ['', Validators.required],
      color: ['', Validators.required],
      origin: ['', Validators.required],
    });
    this.getAllCat();
  }

  onSaveProduct(data){
    this.message = '';
    if (this.productForm.invalid) {
      this.submitted = true;
      return false;
    }

    let obj  = Object.assign({}, data);
    obj['image'] = this.imageData ? this.imageData:'';
 
    console.log(obj);
    this.api.postData('api/product', obj).subscribe(res => {
      console.log(res);
      if(res['error'] == false){
        this.submitted= false;
        this.imageData = '';
        this.image= '';
        this.message = 'Product created sucessfully.';
        this.productForm.reset();
      } else {
        alert('Something went wrong please try again latter');
      }
    }),(err) => {
      alert('Something went wrong please try again latter');
console.log(err)    }
  }

  
  getAllCat() {
    let token = localStorage.getItem('token')
    this.api.getData('api/product/category').subscribe(res => {
      if(res['error'] == false) {
        this.category = res['data'];
        // console.log(this.category)
        // console.log(typeof this.category)
      }
    }),(err) => {
      alert('Something went wrong please try again latter');
      this.category = [];
    }
  }


  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);

        reader.onload = (e) => {
          // const obj = {
          //   base64_image: e.target['result'],

          // };
          this.imageData = e.target['result'];
      
        };
      }
    }
  }


}
