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
    randomPassword:"",
    newEmail: true
  }),
  methods: {
    async createUser() {
      const continueUrl = process.env.baseUrl + `/signature-edit/?email=${this.email}`
      const actionCodeSettings = {
        url: continueUrl,
        handleCodeInApp: true
      }
      this.$toast.info("少々お待ちください")

      //アカウントが既に存在するかどうか確認する
      const providers = await this.$fire.auth.fetchSignInMethodsForEmail(this.email);
      if (providers.findIndex(p => p === this.$fire.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) !== -1) {
        this.$toast.info("既に登録されたメールアドレスです");
        newEmail = false
        return;
      } 
       // まだアカウントが存在していない場合アカウントを作成する
      this.randomPassword = Math.random().toString(30).slice(2)
      this.$fire.auth.createUserWithEmailAndPassword(
        this.email,
        this.randomPassword
        // ユーザー名を設定する
        ).then((user)=> {
          user.updateProfile({
            displayName: "署名にご協力くださる皆"
          })
        }).catch((error)=>{
          this.$toast.error(error)
        })
      // 存在していた場合はそのままサインインリンクを送信する
      this.$fire.auth.sendSignInLinkToEmail(this.email, actionCodeSettings)
      .then((res)=>{
          this.$toast.success('メールを送信しました。メール内のリンクからログインしてください')
          this.$router.push(`/signature?accountCreated=1`)
      })
      .catch(( )=>{
        console.log(error)
        this.$toast.error(error.message)
      })
    }
  }
}

</script>
