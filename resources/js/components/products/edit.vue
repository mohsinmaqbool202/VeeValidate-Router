<template>
    <div class="container">
        <h2 class="text-center">Update Product</h2>
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
                    <button type="button" class="btn btn-primary" @click="updateProduct()"> Update </button>
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
        created() {
            this.editProduct(this.$route.params.productId);
        },
        methods: {
            editProduct(productId) {
                this.axios.get(`http://127.0.0.1:8000/api/products/${productId}`)
                   .then((res) => {
                       this.product = res.data;
                   });
            },
            updateProduct() {
                this.$validator.validateAll().then((result) => {
                    if(result){
                        this.axios
                            .patch(`http://127.0.0.1:8000/api/products/${this.$route.params.productId}`, this.product)
                            .then((res) => {
                                this.$router.push({ name: 'ProductIndex' });
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