<template>
    <div class="container">
        <h2 class="text-center">Create User</h2>
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
                                v-validate="'required|email'"
                                :class="{error: errors.first('email')}" />
                        <span class="text-danger">{{ errors.first('email') }}</span>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input 
                                type="text" 
                                class="form-control" 
                                name="password" 
                                v-model="user.password" 
                                v-validate="'required'"
                                :class="{error: errors.first('password')}" />
                        <span class="text-danger">{{ errors.first('password') }}</span>
                    </div>
                    <button type="button" class="btn btn-primary" @click="createUser()">Create</button>
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
            }
        },
        methods: {
            createUser() {
                this.$validator.validateAll().then((result) => {
                    if(result){
                        this.axios
                        	.post('http://127.0.0.1:8000/api/users', this.user)
                            .then(response => (
                                this.$router.push({ name: 'UserIndex' })
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