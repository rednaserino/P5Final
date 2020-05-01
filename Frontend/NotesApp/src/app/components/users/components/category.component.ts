import { Component, OnInit, Input } from "@angular/core";
import { categories } from "../types/categories";
import { Category } from "../types/category";

@Component({
  selector: "notes-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  @Input()
  category: Category;
  categories = categories;
  constructor() {}

  ngOnInit() {}
}
