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
        }
    },

    mounted() {
        this.$root.$on('OpenCategoryModaltoEdit', (categoryModel, title) => {
            this.categoryModel = categoryModel;
            this.title = title;

        });
        this.$root.$on('OpenCategoryModaltoAdd', (title) => {
            this.categoryModel = {},
                this.title = title;

        });
    },
    methods: {
        SubmitCategory(event) {
            $('#categoryModal').modal('hide');
            this.$emit('OnSubmitCategoryModal', this.categoryModel, this.title);
        },
    },

}
</script>
