<template>
  <div >
   現在 {{ usersCount }} 筆
  </div>
</template>
<script>
export default {
  data: () => ({
    usersCount: ""
  }),
async beforeMount(){
  const usersDataRef = this.$fire.firestore.collection('usersData').doc('doc')
      if (usersDataRef == null){ return }
      usersDataRef.get()
       .then((usersDataDoc)=>{
         this.usersCount = usersDataDoc.data().usersCount
       })
  }
}
</script>
