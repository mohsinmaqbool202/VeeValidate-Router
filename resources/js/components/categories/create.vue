<template>
    <div class="container">
        <h2 class="text-center">Create Category</h2>
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
                    <button type="button" class="btn btn-primary" @click="createCategory()">Create</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                category: {}
            }
        },
        methods: {
            createCategory() {
                this.$validator.validateAll().then((result) => {
                    if(result){
                        this.axios.post('http://127.0.0.1:8000/api/categories', this.category)
                            .then(response => (
                                this.$router.push({ name: 'CategoryIndex' })
                            ))
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