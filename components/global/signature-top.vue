<template>
<div>
    <li><a href="/signup">アカウント作成</a><span>✔︎</span></li>
    <li>メールボックス確認</li>
    <li><a href="/signin">ログイン</a></li>
    <li><a href="/signature-edit">署名</a></li>
</div>
</template>
<script>
export default {
  data: () => ({
    isLoggedIn: false,
    isVerified: false,
  }),
  async beforeMount(){
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user == null) { return }
      this.isLoggedIn = true
      if (user.emailVerified == false){ return }
      this.isVerified = true
    })}
}
</script>