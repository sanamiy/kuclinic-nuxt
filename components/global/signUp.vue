<template>
  <div>
    <form class="form-signup" @submit.prevent="createUser">
      <div>
      <label for="signup-email" class="label">学内メールアドレス</label>
      <input
        id="signup-email"
        v-model="email"
        class="input-gray"
        type="email"
        pattern=".+@(.+\.|)kyoto-u\.ac\.jp"
        placeholder="kyoto-u.ac.jp"
        autocomplete="email"
        required
      />
      </div>

      <div>
      <label for="signup-password1" class="label">パスワード(8文字以上)</label>
      <input
        id="signup-password1"
        v-model="password1"
        class="input-gray"
        type="password"
        minlength="8"
        required
      />
      </div>

      <div>
      <label for="signup-password2" class="label">パスワード確認</label>
      <input
        id="signup-password2"
        v-model="password2"
        class="input-gray"
        type="password"
        minlength="8"
        required
      />
      </div>

      <button type="submit" class="button-submit">アカウント作成</button>
    </form>
    </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password1: "",
    password2: "",
  }),
  methods: {
    async createUser() {
      if (this.password1 !== this.password2) {
        this.$toast.error("パスワードが一致しません")
        return
      }
      const continueUrl = process.env.baseUrl + '/signature'
      const actionCodeSettings = {
        url: continueUrl,
        handleCodeInApp: false,
      }
      try {
        this.$toast.info("少々お待ちください")
        await this.$fire.auth
          .createUserWithEmailAndPassword(
            this.email,
            this.password1
          )
        const {user} = await this.$fire.auth.signInWithEmailAndPassword(this.email, this.password1)
        await user.updateProfile({displayName: '署名にご協力いただく皆'})
        await user.sendEmailVerification(actionCodeSettings)
        this.$toast.clear()
        this.$toast.success('アカウント登録メールを送信しました')
        this.$router.push('/signature')
      } catch (error){
        this.$toast.error(error.message)
      }
    }
  }
}
</script>
