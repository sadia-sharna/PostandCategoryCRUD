<template>
<div class="container-fluid">
    <div class="card mt-3">
        <div class="card-header text-left bg-light ">
            <span class="text-left font-weight-bold">Post List</span>
            <button class="btn btn-sm btn-primary float-right" data-toggle="modal" data-target="#postModal" @click="OpenPostModaltoAdd()"><i class="fa fa-plus"><span class="ml-1">Add Post</span></i></button>

        </div>
        <div class="card-body text-left font-14">
            <table class="table  table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Categories</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,ind) in posts" :key="ind">
                        <td>{{item.title}}</td>
                        <td>{{item.description}}</td>
                        <td><span v-for="(categories, ind) in item.categories" :key="ind">{{categories.categoryName}},</span></td>
                        <td>
                            <button class="btn btn-success btn-sm" data-toggle="modal" data-target="#postModal" @click="OpenPostModaltoEdit(item)">
                                Edit
                            </button>
                            <button class="btn btn-danger btn-sm  ml-2" @click="DeletePost(ind)">
                                Delete
                            </button>

                        </td>
                    </tr>

                </tbody>
            </table>

        </div>

    </div>
    <PostModal @OnSubmitPostModal="OnSubmitPostModal" />
</div>
</template>

<script>
import PostModal from '@/modals/PostModal.vue';
import $ from 'jquery';

export default {
    name: 'Posts',
    components: {
        PostModal
    },
    data() {
        return {

            postModel: {
                title: 'Need talnted developer',
                description: 'Engineer',
                categories: 'Software Engineer, Web Development',
            },
            modalTitle: '',
            posts: [],

        }
    },
    mounted() {
        this.GetPosts();
    },
   
    methods: {
        GetPosts() {
            let postssSession = this.$session.get("posts");
            if (postssSession != undefined) this.posts = postssSession;
            else {
                this.posts.push({
                    postId: 1,
                    title:'Web Developer',
                    description: 'Need an Experienced Web Developer',
                    categories: [{
                            categoryId: 1,
                            categoryName: 'Web Developer',
                            description: 'Web Developer'
                        },
                        {
                            categoryId: 3,
                            categoryName: 'Software Developer',
                            description: 'Software Developer'
                        }
                    ],
                }, {
                    postId: 2,
                    title:'Sr. Android Developer',
                    description: 'Need a Talented Android Developer',
                    categories: [{
                        categoryId: 2,
                        categoryName: 'Android Developer',
                        description: 'Android Developer'
                    }],
                });
                this.$session.set(
                    "posts",
                    this.posts
                );
            }
        },
      
        OpenPostModaltoAdd() {
            this.modalTitle = "Create Post";
            this.$root.$emit('OpenPostModal', this.modalTitle,this.posts);
        },
        OpenPostModaltoEdit(editItem) {
            this.modalTitle = "Edit Post";
            this.$root.$emit('OpenPostModal', this.modalTitle,this.posts,editItem);

        },
        DeletePost(index){
            this.posts.splice(index,1);
            this.$session.set(
                "posts",
                this.posts
            );
        },

        OnSubmitPostModal(postModel) {
       
        },
    },

}
</script>
