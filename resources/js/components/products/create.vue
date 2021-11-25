<template>
    <div class="container">
        <h2 class="text-center">Create product</h2>
        <div class="row">
            <div class="col-md-12">
                <router-link :to="{ name: 'ProductIndex' }" class="btn btn-primary btn-sm float-right mb-2">Back</router-link>
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
                                    v-model="product.name" 
                                    v-validate="'required'"
                                    :class="{error: errors.first('name')}" />
                            <span class="text-danger">{{ errors.first('name') }}</span>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea 
                                type="text" 
                                rows="3"
                                name="description" 
                                class="form-control" 
                                v-model="product.description"
                                v-validate="'required'"
                                :class="{error: errors.first('description')}">
                            </textarea>
                            <span class="text-danger">{{ errors.first('description') }}</span>
                        </div>
                        <div class="form-group">
                            <label>Price</label>
                            <input 
                                    type="text" 
                                    class="form-control" 
                                    name="price" 
                                    v-model="product.price" 
                                    v-validate="'required'"
                                    :class="{error: errors.first('price')}" />
                            <span class="text-danger">{{ errors.first('price') }}</span>
                        </div>
                        <button type="button" class="btn btn-primary" @click="createProduct()"> Create </button>
                    </form>
                </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                product: {},
            }
        },
        methods: {
            createProduct() {
                this.$validator.validateAll().then((result) => {
                    if(result){
                        this.axios.post('http://127.0.0.1:8000/api/products', this.product)
                            .then(response => (
                                this.$router.push({ name: 'ProductIndex' })
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