<template>
  <div>
    <form class="form-signup" @submit.prevent="createUser">
      <label for="signup-email" class="label">メールアドレス</label>
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
      <button type="submit" class="button-submit">署名用リンクを送信</button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
    randomPassword:""
  }),
  methods: {
    async createUser() {
      const continueUrl = process.env.baseUrl + `/signature-edit/?email=${this.email}`
      const actionCodeSettings = {
        url: continueUrl,
        handleCodeInApp: true
      }
      this.$toast.info("少々お待ちください")
      
      // まだアカウントが存在していない場合
        //アカウントを作成する
      this.randomPassword = Math.random().toString(30).slice(2)
      this.$fire.auth.createUserWithEmailAndPassword(
        this.email,
        this.randomPassword
      ).then((user)=> {})
        // ユーザー名を設定する
      
      // 存在していた場合はそのまま
      // サインインリンクを送信する
      await this.$fire.auth.sendSignInLinkToEmail(this.email, actionCodeSettings)
      this.$toast.success('メールを送信しました。メール内のリンクからログインしてください')
      this.$router.push(`/signature?accountCreated=1`)
    
      console.log(error)
      this.$toast.error(error.message)
      }
    }
  }
}
</script>
