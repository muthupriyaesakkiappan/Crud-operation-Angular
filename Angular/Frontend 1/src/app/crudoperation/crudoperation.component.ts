import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-crudoperation',
  templateUrl: './crudoperation.component.html',
  styleUrls: ['./crudoperation.component.css']
})
export class CrudoperationComponent {
 
  Recipes : any[] = [];
  isEditFormLoaded = false;
  isAddCustomerLoaded=false;
  isUpdateFormActive = false;
  isViewDetails = true;
  isViewFormLoaded = false;
  sno:string ="";
  recipe_name: string ="";
  ingredients: string ="";
  instructions: string ="";

  constructor(private http: HttpClient )
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
    this.http.get("http://localhost:3308/getdetails")
    .subscribe((resultData: any)=>
    {
        console.log(resultData.data);
        this.Recipes = resultData.data;
    });
  }

  setView(data: any){
    this.isUpdateFormActive=true;
    this.isViewFormLoaded=true;
    this.isViewDetails=false;
    this.isEditFormLoaded=false;
    this.recipe_name = data.recipe_name;
    this.ingredients = data.ingredients;
    this.instructions= data.instructions;
    this.sno = data.sno;
  }
  view(){
  
    this.http.get("http://localhost:3308"+"/"+ this.sno)
    .subscribe((resultData: any)=>
    {
      console.log(resultData);
      alert(resultData);
    });
  }

  setDelete(data: any)
  {
    this.http.delete("http://localhost:3308/delete"+"/"+ data.sno)
    .subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Recipe Deleted");
        this.getAllRecipes();
    });
  }

  save()
  {
    if(this.sno == '')
    {
        this.register();
        this.isUpdateFormActive=false;
    }
      else
      {
       this.UpdateRecords();
       this.isUpdateFormActive=false;
      }      
 
  }

  setUpdate(data: any)
  {
    this.isUpdateFormActive=true;
    this.isEditFormLoaded=true;
    this.isViewDetails=false;
    this.isViewFormLoaded=false;
    this.recipe_name = data.recipe_name;
    this.ingredients = data.ingredients;
    this.instructions = data.instructions;
    this.sno = data.sno;
    
  }
 
  UpdateRecords()             //edit
  {
    let bodyData =
    {
      
      "recipe_name" : this.recipe_name,
      "ingredients" : this.ingredients,
      "instructions" : this.instructions,
    };
    
    this.http.put("http://localhost:3308/update"+ "/"+ this.sno,bodyData)
    .subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Recipe Details Updated")
        this.getAllRecipes();
      
    });
  }


  register()
  {
     if (this. recipe_name=== '' || this.recipe_name === 'null') {
      alert("Enter Valid name")
  } else if (this.ingredients === '' || this.ingredients === 'null') {
      alert("Enter ingredients")
  } else if (this.instructions === '' || this.instructions === 'null') {
      alert("Enter instruction")
  } 
      
  else{
    let bodyData = {
      "recipe_name" : this.recipe_name,
      "ingredients" : this.ingredients,
      "instructions" : this.instructions,
    };
    this.http.post("http://localhost:3308/add",bodyData).subscribe((resultData: any)=>
    {
      console.log(resultData);
      alert("recipe Register Successfully");
      this.getAllRecipes();
    });
  }
  }
  addNewRecipes()
  {
    this.isUpdateFormActive=true;
    this.isViewDetails=false;
    this.isViewFormLoaded=false;
    this.isAddCustomerLoaded=true;
    this.isEditFormLoaded=false;
    this.recipe_name="";
    this.ingredients="";
    this.instructions="";
  }
  home(){
    this.isUpdateFormActive=false;
    this.isViewDetails=true;
    this.isViewFormLoaded=false;
    this.isAddCustomerLoaded=false;
    this.isEditFormLoaded=false;
  }

}
  

