<template>
  <div class="center">
      <h2>Press the button below to sign in using your Localtest.me account. </h2>
    <div class="my-5" id="text"><br>smartsales://success?code=1337</div>
    <div id="button"><a class="btn" href="foobar://success?code=1337">Sign in</a></div>

    <div class="my-5" id="text">smartsales.com://success?code=1337</div>
    <div id="button"><a class="btn" href="smartsales.com://success?code=1337">Sign in</a></div>


    <div class="my-5" id="text">https://smartsales.com?code=1337</div>
    <div id="button"><a class="btn" href="https://smartsales.com?code=1337">Sign in</a></div>
  </div>
</template>

<script>
export default {
  created() {
    this.getAutoOpenUrl();
  },

  methods: {
    getAutoOpenUrl() {},

    login(){

    }
  },
};
</script>

<style scoped>
.center{
    display: flex;
    text-align: center;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
    .btn{
        border: none;
    }
</style>