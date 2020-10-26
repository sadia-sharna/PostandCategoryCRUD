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
                        <th scope="col">Category name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Software Engineer</td>
                        <td>Software Engineer</td>
                        <td>
                            <button class="btn btn-success btn-sm" data-toggle="modal" data-target="#categoryModal" @click="OpenCategoryModaltoEdit()">
                                Edit
                            </button>
                            <button class="btn btn-danger btn-sm  ml-2">
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
            
            categoryModel: {
                categoryName: 'Doctor',
                description: 'Doctor'
            },
            modalTitle: '',

        }
    },
    methods: {
        ChangeModalTitle(title) {

            this.modalTitle = title;

        },
        OpenCategoryModaltoAdd() {
            this.ChangeModalTitle("Create Category");
             this.$root.$emit('OpenCategoryModaltoAdd', this.modalTitle);
        },
        OpenCategoryModaltoEdit() {
            this.ChangeModalTitle("Edit Category");
            this.$root.$emit('OpenCategoryModaltoEdit', this.categoryModel, this.modalTitle);

        },
        OnSubmitCategoryModal(value) {
            this.comorbids = value;
        },
    },

}
</script>
