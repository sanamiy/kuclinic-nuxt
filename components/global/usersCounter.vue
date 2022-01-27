<template>
  
</template>
<script>
export default {
async beforeMount(){
const userRef = this.$fire.firestore.collection('users').doc(user.uid)
      if (userRef == null){ return }
}
}
</script>
