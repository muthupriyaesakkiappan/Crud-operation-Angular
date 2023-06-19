import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
RecipesDetails : any[] = [];
isViewDetails = true;

 sno:string ="";
  image: string="";
  recipe_name: string ="";
  constructor(
    private http: HttpClient) 

  {
    this.getAllRecipes();
    console.log("constructor");
  }
 
  ngOnInit(): void {
    console.log("ngOnInit");
  }
  
  getAllRecipes()
  {
    this.isViewDetails=true;
    this.http.get("http://localhost:3308/homedetails")
    .subscribe((resultData: any)=>
    {
        console.log(resultData.data);
        this.RecipesDetails  = resultData.data;
    });
  }
  searchText='';
}