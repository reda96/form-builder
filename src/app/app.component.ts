import { Component, OnInit } from '@angular/core';
import {  jsonForm } from '../assets/form';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'form-builder';
  jsonForm = jsonForm;
  currentBox = null;
  formBuilder = new FormGroup({});
  currentField ={
    type:"",
    id:"",
    currentFieldForm: new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(10)]),
    id:  new FormControl('', [Validators.required]),
    borderColor:  new FormControl(''),
    borderSize:  new FormControl(''),

    caption:  new FormControl(''),
    placeholder:  new FormControl(''),
    rows:  new FormControl(''),
    cols:  new FormControl(''),

  })
}
  ngOnInit(): void {
  
    
    this.fillForm(jsonForm, this.formBuilder);

    this.currentField.currentFieldForm.valueChanges.pipe(debounceTime(500)).subscribe((values)=> {
      // console.log(this.currentField.id,values.id);
      
      if(this.currentField.id==values.id)
      { 
        let itemIndex =jsonForm.findIndex(field => field.id == this.currentField.id);

        if(this.jsonForm[itemIndex].name && values.name)
          this.jsonForm[itemIndex].name = values.name;

        if(this.jsonForm[itemIndex].placeholder && values.placeholder)
          this.jsonForm[itemIndex].placeholder = values.placeholder;

        if(this.jsonForm[itemIndex].border.size && values.borderSize)
        this.jsonForm[itemIndex].border.size = values.borderSize;

        if(this.jsonForm[itemIndex].border.color && values.borderColor)
          this.jsonForm[itemIndex].border.color = values.borderColor;
       
        if(this.jsonForm[itemIndex].caption && values.caption)
          this.jsonForm[itemIndex].caption = values.caption;


        if(this.jsonForm[itemIndex].rows && values.rows)
          this.jsonForm[itemIndex].rows = +values.rows;

        if(this.jsonForm[itemIndex].cols && values.cols)
          this.jsonForm[itemIndex].cols = +values.cols;

        
      }
    });

    
  }
  fillForm(json:any[], formBuilder:FormGroup) {
  for(let i=0; i<json.length;i++)
   formBuilder.addControl(json[i].name, new FormControl('', Validators.required))

  }
  selectCurrentField(currentField:any) {
    //  console.log(currentField);
    this.currentField.type = currentField.type;
    this.currentField.id = currentField.id;
    const currentFieldForm =this.currentField.currentFieldForm as FormGroup;
    currentFieldForm.controls['name'].setValue(currentField.name);
    currentFieldForm.controls['id'].setValue(currentField.id);
    currentFieldForm.controls['borderColor'].setValue(currentField.border.color);
    currentFieldForm.controls['borderSize'].setValue(currentField.border.size);

    currentFieldForm.controls['caption']?.setValue(currentField.caption);
    currentFieldForm.controls['placeholder']?.setValue(currentField.placeholder);

    currentFieldForm.controls['rows']?.setValue(currentField.rows);
    currentFieldForm.controls['cols']?.setValue(currentField.cols);
   
    
  }



}
