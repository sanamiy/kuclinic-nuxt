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
        pattern=".+@(.+\.kyoto-u\.ac\.jp|kyoto-u\.ac\.jp|kyoto-u\.jp)"
        placeholder="kyoto-u.ac.jp / kyoto-u.jp"
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
      const continueUrl = process.env.baseUrl + "/signature-edit"
      const actionCodeSettings = {
        url: continueUrl,
        handleCodeInApp: true,
        dynamicLinkDomain: 'links.ku-clinic-sonzoku.org'
      }
      try {
        this.$toast.info("少々お待ちください")
        await this.$fire.auth
          .createUserWithEmailAndPassword(
            this.email,
            this.password1
        )
        await this.$fire.auth.sendSignInLinkToEmail(this.email, actionCodeSettings)
        this.$toast.clear()
        this.$toast.success('メールを送信しました。メール内のリンクからログインしてください')
        this.$router.push('/signature-edit')
      } catch (error){
        this.$toast.error(error.message)
      }
    }
  }
}
</script>
