<template>
  <a @click="signout">ログアウト</a>
</template>
<script>
export default{
  methods: {
    async signout() {
      await this.$fire.auth.signOut()
      this.$toast.success('ログアウトしました')
      this.$router.push('/signature')
    }
  }
}
</script>