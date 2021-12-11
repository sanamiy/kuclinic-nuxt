<template>
<div>
    <form class="form-signin" @submit.prevent="signInUser">
      <div>
      <label for="signin-email" class="label">メールアドレス</label>
      <input
        id="signin-email"
        v-model="email"
        class="input-gray"
        type="email"
        pattern=".+@.+\.kyoto-u\.ac\.jp"
        placeholder=".kyoto-u.ac.jp"
        autocomplete="email"
        required
      />
      </div>
      <div>
      <label for="signin-password" class="label">パスワード</label>
      <input
        id="signin-password"
        v-model="password"
        class="input-gray"
        type="password"
        minlength="8"
        required
      />
      </div>

      <button type="submit" class="button-submit">ログイン</button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    uid: ""
  }),
  methods: {
    signInUser() {
      this.$fire.auth
        .signInWithEmailAndPassword(
          this.email,
          this.password
        )
        .then((user) => {
          if (user.emailVerified == false){
            this.$toast.warn("送信済みのメールよりアドレスを認証してください")
          }
          this.$toast.clear()
          this.$toast.success('ログインしました')
          this.$router.push('/user')
          
        })
        .catch((error) => {
          this.$toast.error(error.message)
        })
    },
  },
}
</script>

