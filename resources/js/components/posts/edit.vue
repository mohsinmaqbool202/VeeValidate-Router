<template>
    <div class="container">
        <h2 class="text-center">Update Post</h2>
        <div class="row">
            <div class="col-md-12">
                <router-link :to="{ name: 'PostIndex' }" class="btn btn-primary btn-sm float-right mb-2">Back</router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form>
                    <div class="form-group">
                        <label>Title</label>
                        <input 
                                type="text" 
                                class="form-control" 
                                name="title" 
                                v-model="post.title" 
                                v-validate="'required'"
                                :class="{error: errors.first('title')}" />
                        <span class="text-danger">{{ errors.first('title') }}</span>
                    </div>
                    <div class="form-group">
                        <label>Text</label>
                        <textarea 
                            type="text" 
                            rows="3"
                            name="text" 
                            class="form-control" 
                            v-model="post.text"
                            v-validate="'required'"
                            :class="{error: errors.first('text')}">
                        </textarea>
                        <span class="text-danger">{{ errors.first('text') }}</span>
                    </div>
                    <button type="button" class="btn btn-primary" @click="updatePost()"> Update </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                post: {},
                error_title: '',
                error_text: ''
            }
        }, 
        mounted() {
            this.editPost(this.$route.params.postId);
        },
        methods: {
            clearErr(input) {
                this[input] = '';
            },
            editPost(postId) {
                this.axios.get(`http://127.0.0.1:8000/api/posts/${postId}`)
                   .then((res) => {
                       this.post = res.data;
                   });
            },
            updatePost() {
                this.$validator.validateAll().then((result) => {
                    if(result){
                        this.axios
                            .patch(`http://127.0.0.1:8000/api/posts/${this.$route.params.postId}`, this.post)
                            .then((res) => {
                                this.$router.replace({ name: 'PostIndex' });
                            })
                            .catch(err => {
                                console.log(err);
                            })
                            .finally(() => this.loading = false)
                    }      
                }); 
            }
        } 
    }
</script>
