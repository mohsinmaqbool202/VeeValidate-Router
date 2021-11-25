<template>
    <div class="container">
        <h2 class="text-center">Update Category</h2>
        <div class="row">
            <div class="col-md-12">
                <router-link :to="{ name: 'CategoryIndex' }" class="btn btn-primary btn-sm float-right mb-2">Back</router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form>
                    <div class="form-group">
                        <label>Name</label>
                        <input 
                                type="text" 
                                class="form-control" 
                                name="name" 
                                v-model="category.name" 
                                v-validate="'required'"
                                :class="{error: errors.first('name')}" />
                        <span class="text-danger">{{ errors.first('name') }}</span>
                    </div>
                    <button type="button" class="btn btn-primary" @click="updateCategory()">Update</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                category: {},
                error_name: ''
            }
        },
        created() {
            this.editCategory(this.$route.params.catId);
        },
        methods: {
            editCategory(catId) {
                this.axios.get(`http://127.0.0.1:8000/api/categories/${catId}`)
                   .then((res) => {
                       this.category = res.data;
                   });
            },
            updateCategory() {
                this.$validator.validateAll().then((result) => {
                    if(result){
                        this.axios
                            .patch(`http://127.0.0.1:8000/api/categories/${this.$route.params.catId}`, this.category)
                            .then((res) => {
                                this.$router.push({ name: 'CategoryIndex' });
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }

                });
            }
        }
    }
</script>