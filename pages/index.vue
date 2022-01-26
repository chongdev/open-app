<template>
  <div>
    <div class="inner">
      <div class="my-5">
        <a href="smartsales://" @click.prevent="openApp" class="btn"
          >smartsales://</a
        >
      </div>
      <div class="my-5">
        <a href="smartsales://auth-sso" @click.prevent="openApp" class="btn"
          >smartsales://auth-sso</a
        >
      </div>

      <div class="my-5">
        <a href="https://smartsales/" @click.prevent="openApp" class="btn"
          >https://smartsales/</a
        >
      </div>

      <div class="my-5">
        <a
          href="https://smartsales/auth-sso"
          @click.prevent="openApp"
          class="btn"
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
    openApp(evt) {
      let PARAMS = this.queryStringToDict();
      let DEEP_LINK = PARAMS["deep_link"];

      let hash = DEEP_LINK ? DEEP_LINK : this.getHash();

      let url = evt.target.href;


      if( hash ){

      }
      console.log(url, hash);

      // this.autoOpenUrl =

      location.replace(url);
      // if (this.isApple) {

      // }
    },

    queryStringToDict() {
      var ret = {};
      var q = window.location.search;
      if (!q || q.length < 3) return ret;
      q = q.substr(1).split("&");
      for (var i = 0; i < q.length; i++) {
        var pair = q[i].split("=");
        ret[pair[0]] = decodeURIComponent(pair[1]);
      }
      return ret;
    },

    getHash() {
      var hash = location.hash;
      if (hash != null && hash != "") {
        return hash.substr(1);
      }
    },
  },
};
</script>