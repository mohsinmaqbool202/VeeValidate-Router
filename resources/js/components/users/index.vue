<template>
    <div class="container">
        <h2 class="text-center">Users List</h2>
        <div class="row">
            <div class="col-md-12">
                <router-link :to="{ name: 'UserCreate' }" class="btn btn-primary btn-sm float-right mb-2">Add User</router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <table class="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, key) of users" :key="user.id">
                            <td>{{ key+1 }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>
                                <router-link class="btn btn-success btn-sm" :to="{ name: 'UserEdit', params: { userId: user.id }}">Edit</router-link>
                                <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">Delete</button>
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
                users: {}
            }
        },
        created() {
            this.getUsers();
        },
        methods: {
            getUsers() {
                this.axios
                    .get('http://127.0.0.1:8000/api/users')
                    .then(response =>{
                        this.users = response.data.users;
                    });
            },
            deleteUser(userId) {
                this.axios
                    .delete(`http://127.0.0.1:8000/api/users/${userId}`)
                    .then(response =>{
                        let i = this.users.map(data => data.id).indexOf(userId);
                        this.users.splice(i, 1);
                    })
                    .catch(err => console.log(err));
            }
        }
    }
</script>