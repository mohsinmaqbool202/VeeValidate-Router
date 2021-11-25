<template>
    <div class="container">
        <h2 class="text-center">Category List</h2>
        <div class="row">
            <div class="col-md-12">
                <router-link :to="{ name: 'CategoryCreate' }" class="btn btn-primary btn-sm float-right mb-2">Add Category</router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <table class="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th width="50%;" class="text-center">Name</th>
                        <th class="text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(category, key) of categories" :key="category.id">
                            <td>{{ key+1 }}</td>
                            <td class="text-center">{{ category.name }}</td>
                            <td class="text-center">
                                <router-link class="btn btn-success btn-sm" :to="{ name: 'CategoryEdit', params: { catId: category.id }}">Edit</router-link>
                                <button class="btn btn-danger btn-sm" @click="deleteCategory(category.id)">Delete</button>
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
                categories: {}
            }
        },
        created() {
            this.getCategories();
        },
        methods: {
            getCategories() {
              this.axios.get('http://127.0.0.1:8000/api/categories')
                  .then(response => {
                    this.categories = response.data;
                  });
            },
            deleteCategory(productId) {
                this.axios
                    .delete(`http://127.0.0.1:8000/api/categories/${catId}`)
                    .then(response => {
                        let i = this.categories.map(data => data.id).indexOf(catId);
                        this.categories.splice(i, 1)
                    });
            }
        }
    }
</script>