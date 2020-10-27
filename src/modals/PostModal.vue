<template>
<div>
    <div class="modal fade" id="postModal" tabindex="-1" role="dialog" aria-labelledby="postModal" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="postModal">{{title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Title</label>
                        <input type="text" class="form-control" id="Category-name" v-model="postModel.title">
                    </div>
                    <div class="form-group">
                        <label>Post Category</label>
                        <div class='tag-input'>

                            <div v-for='(tag, ind) in postModel.categories' :key='ind' class='tag-input__tag'>
                                <span @click="RemoveSelectedCategory(ind)">x</span>
                                {{ tag.categoryName }}
                            </div>
                            <input type='text' placeholder="Enter a Tag" class='tag-input__text' v-model="searchCategory" @click="showMultiselectCategoriesDropdown = true" />
                        </div>
                        <ul class="list-group" style="overflow-y: scroll; max-height: 30vh;" v-if="showMultiselectCategoriesDropdown == true">
                            <a data-toggle="modal" data-target="#categoryModal" @click="OpenCategoryModaltoAdd()" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                <span>
                                    Create new
                                </span>

                            </a>
                            <a class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" 
                            v-for="(item, ind) in filteredCategories" :key="ind"
                            @click="SelectCategory(item);" 
                            :class="{ 'bg-green': IsCategorySelected(item)}">
                                <span>

                                    {{item.categoryName}}</span>
                            </a>

                        </ul>
                    </div>

                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Description</label>
                        <textarea class="form-control" id="Description" v-model="postModel.description"></textarea>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="SubmitPost()">Save</button>
                </div>
            </div>
        </div>

    </div>
    <CategoryModal @OnSubmitCategoryModal="OnSubmitCategoryModal" />
</div>
</template>

<script>
import CategoryModal from '@/modals/CategoryModal.vue';
import $ from 'jquery';

export default {
    name: 'PostModal',
    components: {
        CategoryModal
    },
    data() {
        return {
            categoryModel: {},
            postModel: {
                categories: [],
            },
            title: '',
            showMultiselectCategoriesDropdown: false,
            categories: [],
            posts: [],
            searchCategory: "",
        }
    },

    mounted() {
        this.$root.$on('OpenPostModal', (title, posts, postModel) => {
            if (title == "Edit Post") this.postModel = postModel;
            else if (title == "Create Post") {
                this.postModel = {
                    categories: []
                };
            }
            this.title = title;
            this.posts = posts;
            this.searchCategory="";
            this.showMultiselectCategoriesDropdown = false;

        });

        this.GetCategories();
    },
    computed: {

        latestPostId() {
            if (this.posts.length > 0) return this.posts[this.posts.length - 1].postId;
            return 0;

        },

        filteredCategories() {

            if (this.searchCategory.length > 0) {
                return this.categories.filter((item) => {
                    return item.categoryName.toLowerCase().includes(this.searchCategory.toLowerCase());
                });
            } else return this.categories;

        }

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
                });
                this.$session.set(
                    "categories",
                    this.categories
                );
            }
        },
        
        SelectCategory(selectedItem) {
            let findItem = this.postModel.categories.find(x => x.categoryId == selectedItem.categoryId);
            if (!findItem) {
                this.showMultiselectCategoriesDropdown = false;
                this.postModel.categories.push(selectedItem);

            }

        },
        RemoveSelectedCategory(index) {
            this.postModel.categories.splice(index, 1);

        },
        IsCategorySelected(categoryItem){
            let findItem = this.postModel.categories.find(x => x.categoryId == categoryItem.categoryId);
            if (findItem) {
                return true;
            }
            else return false;

        },
        SubmitPost(event) {

            if (this.title == "Create Post") this.CreatePost();

            else if (this.title == "Edit Post") this.EditPost();
        },
        CreatePost() {
            if ((this.postModel.title != "" && this.postModel.title != null) || (this.postModel.description != "" && this.postModel.description != null)) {

                let findPost = this.posts.find(x => x.title == this.postModel.title && x.description == this.postModel.description);
                if (!findPost) {
                    this.postModel.postId = this.latestPostId + 1;
                    this.posts.push(this.postModel);
                    this.$session.set(
                        "posts",
                        this.posts
                    );
                    $('#postModal').modal('hide');
                    this.$emit('OnSubmitPostModal', this.postModel);
                } else {
                    alert("Post already exists!");

                }
            } else {
                alert("Please Fill up at least one field.");
            }

        },
        EditPost() {
            let findPost = this.posts.find(x => x.postId == this.postModel.postId);
            if (findPost) {
                findPost.title = this.postModel.title;
                findPost.description = this.postModel.description;
                $('#postModal').modal('hide');
                this.$session.set(
                    "posts",
                    this.posts
                );
                $('#postModal').modal('hide');
                this.$emit('OnSubmitPostModal', this.postModel);
            } else {
                alert("Can not find the Category.");
            }

        },
        OpenCategoryModaltoAdd() {

            this.$root.$emit('OpenCategoryModal', "Create Category", this.categories);
        },
        OnSubmitCategoryModal(categoryModel) {

            this.postModel.categories.push(categoryModel);
            this.showMultiselectCategoriesDropdown = false;
        },

    },

}
</script>

<style scoped>
.tag-input {
    width: 100%;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-size: 0.9em;
    height: 50px;
    box-sizing: border-box;
    padding: 0 10px;
}

.tag-input__tag {
    height: 30px;
    float: left;
    margin-right: 10px;
    background-color: #eee;
    margin-top: 10px;
    line-height: 30px;
    padding: 0 5px;
    border-radius: 5px;
}

.tag-input__tag>span {
    cursor: pointer;
    opacity: 0.75;
}

.tag-input__text {
    border: none;
    outline: none;
    font-size: 0.9em;
    line-height: 50px;
    background: none;
}
.bg-green{
    background-color: #01D9AB;
}
</style>
