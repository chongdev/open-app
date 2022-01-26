<template>
  <div>
    <div class="inner">
      <div class="my-5">
        <a href="smartsales://" @click.prevent="openApp" class="btn">smartsales://</a>
      </div>
      <div class="my-5">
        <a href="smartsales://auth-sso" @click.prevent="openApp" class="btn">smartsales://auth-sso</a>
      </div>

      <div class="my-5">
        <a href="https://smartsales/" @click.prevent="openApp" class="btn">https://smartsales/</a>
      </div>

      <div class="my-5">
        <a href="https://smartsales/auth-sso" @click.prevent="openApp" class="btn"
          >https://smartsales/auth-sso</a
        >
      </div>

      <div class="my-5">
        <a href="https://smartsales.com" class="btn" @click.prevent="openApp"
          >https://smartsales.com</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",

  data() {
    return {
      isApple: false,
      autoOpenUrl: false,
    };
  },

  methods: {
    openApp( evt ) {

      let url = evt.target.href;
      console.log( url );

      // this.autoOpenUrl = 

      location.replace(url);
      // if (this.isApple) {

      // }
    },

  },
};
</script>