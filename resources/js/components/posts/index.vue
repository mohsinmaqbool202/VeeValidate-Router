<template>
	 <div class="container">
        <h2 class="text-center">Post List</h2>
        <div class="row">
            <div class="col-md-12">
                <router-link :to="{ name: 'PostCreate' }" class="btn btn-primary btn-sm float-right mb-2">Add Post</router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <table class="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Text</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(post, key) of posts" :key="post.id">
                            <td>{{ key+1 }}</td>
                            <td>{{ post.title }}</td>
                            <td>{{ post.text }}</td>
                            <td>
                                <router-link class="btn btn-success btn-sm" :to="{ name: 'PostEdit', params: { postId: post.id }}">Edit</router-link>
                                <button class="btn btn-danger btn-sm" @click="deletePost(post.id)">Delete</button>
                            </td>
                            <td>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				posts: {}
			}
		},
		created() {
            console.log(this.$route);
			this.getPosts();
		},
		methods: {
			getPosts() {
				this.axios.get('http://127.0.0.1:8000/api/posts')
					.then(response => {
						this.posts = response.data;
					});
			},
			deletePost(postId) {
                this.axios
                    .delete(`http://127.0.0.1:8000/api/posts/${postId}`)
                    .then(response => {
                        let i = this.posts.map(data => data.id).indexOf(postId);
                        this.posts.splice(i, 1)
                    });
            }
		}
	}
</script>