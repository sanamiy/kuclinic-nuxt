<template>
  <div>
    <h3> アカウント作成 </h3>
    <form class="form-signin" @submit.prevent="userLogin">
      <div>
      <label for="account-email" class="label">メールアドレス</label>
      <input
        id="account-email"
        v-model="email"
        class="input-gray"
        type="email"
        pattern=".+@.+\.kyoto-u\.ac\.jp"
        placeholder="@   .kyoto-u.ac.jp"
        required
      />
      </div>

      <div>
      <label for="account-password" class="label">パスワード</label>
      <input
        id="account-password"
        v-model="password1"
        class="input-gray"
        type="password"
        minlength="8"
        required
      />
      </div>

      <div>
      <label for="account-password" class="label">パスワード</label>
      <input
        id="account-password"
        v-model="password"
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
    password2: ""
  }),
}
</script>
<style scoped>
.title-text{
  font-size:  1.6em;
}
.input-gray {
  width: 20em;
  height: 2em;
  outline: none;
  border: none;
  box-sizing: border-box;
  border-radius: 0.4em;
  display: block;
  background-color: whitesmoke;
  padding: 0 0.6em;
  margin: 0.5em 0em 1em 0;
}
.input-gray::placeholder {
  color: silver;
}

.button-submit {
  display: block;
  height: 2em;
  border-radius: 0.4em;
  width: 9em;
  border: none;
  background: #5280ff;
  color: white;
}

form:invalid .button-submit {
  cursor: not-allowed;
  border: none;
  outline: none;
  background: lightgray;
}

</style>