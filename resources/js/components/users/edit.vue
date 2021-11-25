<template>
    <div class="container">
        <h2 class="text-center">Update User</h2>
        <div class="row">
            <div class="col-md-12">
                <router-link :to="{ name: 'UserIndex' }" class="btn btn-primary btn-sm float-right mb-2">Back</router-link>
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
                            v-model="user.name" 
                            v-validate="'required'"
                            :class="{error: errors.first('name')}" />
                        <span class="text-danger">{{ errors.first('name') }}</span>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            name="email" 
                            v-model="user.email" 
                            v-validate="'required'"
                            :class="{error: errors.first('email')}" />
                        <span class="text-danger">{{ errors.first('email') }}</span>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            v-model="user.password"/>
                    </div>
                    <button type="button" class="btn btn-primary" @click="updateUser()">Update</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {},
                error_name: '',
                error_email: '',
                error_pass: ''
            }
        },
        created() {
            this.editUser(this.$route.params.userId);
        },
        methods: {
            clearErr(input) {
               this[input] = '';
            },
            editUser(productId) {
                this.axios.get(`http://127.0.0.1:8000/api/users/${productId}`)
                   .then((res) => {
                       this.user = res.data;
                   });
            },
            updateUser() {
                this.$validator.validateAll().then((result) => {
                    if(result){
                        this.axios
                            .patch(`http://127.0.0.1:8000/api/users/${this.$route.params.userId}`, this.user)
                            .then((res) => {
                                this.$router.push({ name: 'UserIndex' });
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