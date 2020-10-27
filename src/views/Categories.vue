<template>
<div class="container-fluid">
    <div class="card mt-3">
        <div class="card-header text-left bg-light ">
            <span class="text-left font-weight-bold">Category List</span>
            <button class="btn btn-sm btn-primary float-right" data-toggle="modal" data-target="#categoryModal" @click="OpenCategoryModaltoAdd()"><i class="fa fa-plus"><span class="ml-1">Add Category</span></i></button>

        </div>
        <div class="card-body text-left font-14">
            <table class="table  table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,ind) in categories" :key="ind">
                        <td>{{item.categoryName}}</td>
                        <td>{{item.description}}</td>
                        <td>
                            <button class="btn btn-success btn-sm" data-toggle="modal" data-target="#categoryModal" @click="OpenCategoryModaltoEdit(item)">
                                Edit
                            </button>
                            <button class="btn btn-danger btn-sm  ml-2" @click="DeleteCategory(ind)">
                                Delete
                            </button>

                        </td>
                    </tr>
                    <!-- <tr>
                        <td>Web Developer</td>
                        <td>Web Developer</td>
                        <td>
                            <button class="btn btn-success btn-sm ">Edit </button>
                            <button class="btn btn-danger btn-sm  ml-2">
                                Delete
                            </button>

                        </td>
                    </tr>
                    <tr>
                        <td>Android Developer</td>
                        <td>Android Developer</td>
                        <td>
                            <button class="btn btn-success btn-sm ">Edit </button>
                            <button class="btn btn-danger btn-sm  ml-2">
                                Delete
                            </button>

                        </td>
                    </tr> -->
                </tbody>
            </table>

        </div>

    </div>
    <CategoryModal @OnSubmitCategoryModal="OnSubmitCategoryModal" />
</div>
</template>

<script>
import CategoryModal from '@/modals/CategoryModal.vue';
export default {
    name: 'Categories',
    components: {
        CategoryModal
    },
    data() {
        return {

            categories: [],
            modalTitle: '',

        }
    },

    mounted() {
        this.GetCategories();

    },
    
    methods: {
        GetCategories() {
            let categoriesSession = this.$session.get("categories");
            if (categoriesSession != undefined) this.categories = categoriesSession;
            else {
                this.categories.push({
                    categoryId: 1,
                    categoryName: 'Web Developer',
                    description: 'Web Developer'
                }, {
                    categoryId: 2,
                    categoryName: 'Android Developer',
                    description: 'Android Developer'
                },
                 {
                    categoryId: 3,
                    categoryName: 'Software Developer',
                    description: 'Software Developer'
                });
                this.$session.set(
                    "categories",
                    this.categories
                );
            }
        },

       
        OpenCategoryModaltoAdd() {
            
            this.modalTitle = "Create Category";
            this.$root.$emit('OpenCategoryModal', this.modalTitle,this.categories);
        },
        OpenCategoryModaltoEdit(editItem) {
             this.modalTitle = "Edit Category";
            this.$root.$emit('OpenCategoryModal',  this.modalTitle,this.categories,editItem);

        },
        DeleteCategory(index) {
            this.categories.splice(index, 1);
            this.$session.set(
                "categories",
                this.categories
            );
        },
        OnSubmitCategoryModal(categoryModel) {
            

        },
    },

}
</script>
