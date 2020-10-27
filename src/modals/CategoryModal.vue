<template>
<div class="modal fade" id="categoryModal" tabindex="-1" role="dialog" aria-labelledby="categoryModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="categoryModal">{{title}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">

                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Name</label>
                    <input type="text" class="form-control" id="Category-name" v-model="categoryModel.categoryName">
                </div>
                <div class="form-group">
                    <label for="message-text" class="col-form-label">Description</label>
                    <textarea class="form-control" id="Description" v-model="categoryModel.description"></textarea>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="SubmitCategory()">Save</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery';
export default {
    name: 'CategoryModal',
    data() {
        return {
            categoryModel: {},
            title: '',
            categories: [],
        }
    },

    mounted() {
        this.$root.$on('OpenCategoryModal', (title, categories, categoryModel) => {

            this.title = title;
            this.categories = categories;

            if (title == "Create Category") {

                this.categoryModel = {};
            } else if (title == "Edit Category") {
                this.categoryModel = categoryModel;
            }

        });

    },
    computed: {

        latestCategoryId() {
            if (this.categories.length > 0) return this.categories[this.categories.length - 1].categoryId;
            return 0;

        },
    },
    methods: {
        SubmitCategory(event) {
            if (this.title == "Create Category") this.CreateCategory();
            else if (this.title == "Edit Category") this.EditCategory();

        },

        CreateCategory() {
            if ((this.categoryModel.categoryName != "" && this.categoryModel.categoryName != null) || (this.categoryModel.description != "" && this.categoryModel.description != null)) {
                let findCategory = this.categories.find(x => x.categoryName == this.categoryModel.categoryName && x.description == this.categoryModel.description);
                if (!findCategory) {
                    this.categoryModel.categoryId = this.latestCategoryId + 1;
                    this.categories.push(this.categoryModel);
                    $('#categoryModal').modal('hide');
                    this.$session.set(
                        "categories",
                        this.categories
                    );
                    this.$emit('OnSubmitCategoryModal', this.categoryModel);
                } else {
                    alert("Category already exists!");
                }

            } else {
                alert("Please Fill up the fields.");
            }
        },
        EditCategory() {
            let findCategory = this.categories.find(x => x.categoryId == this.categoryModel.categoryId);
            if (findCategory) {
                findCategory.categoryName = this.categoryModel.categoryName;
                findCategory.description = this.categoryModel.description;
                $('#categoryModal').modal('hide');
                this.$session.set(
                    "categories",
                    this.categories
                );
                this.$emit('OnSubmitCategoryModal', this.categoryModel);
            } else {
                alert("Can not find the Category.");
            }

        },
    },

}
</script>
