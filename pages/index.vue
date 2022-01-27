<template>
  <div>
    <div class="inner">
      <div>Code: {{ code }}</div>
      <div>isAndroid: {{ isAndroid ? 1 : 0 }}</div>

      <br />

      <!-- <div class="my-5">
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

      <div class="my-5">
        <a
          href="https://smartsales.com?code=1234"
          class="btn"
          @click.prevent="openApp"
          >https://smartsales.com?code=1234</a
        >
      </div> -->

      <div class="my-5" v-if="url">
        <a ref="linkOpen" :href="url" class="btn" @click.prevent="openApp"
          >Open App</a
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
      code: "",
      url: "smartsales://",
      REDIR: '',
      isAndroid: false,
    };
  },

  mounted(){

    this.isAndroid = navigator.userAgent.indexOf("Android") > 0;
    this.getAutoOpenUrl();
  },

  methods: {
    getAutoOpenUrl() {
      // let PARAMS = this.queryStringToDict();
      // let DEEP_LINK = PARAMS["deep_link"];
      // var hash = DEEP_LINK ? DEEP_LINK : getHash();

      this.code = this.$route.query.code;
      this.REDIR = this.$route.query.redir;

      if (this.code) {
        this.url = `smartsales://auth-sso?code=${this.code}`;

        if( this.isAndroid ){
          window.location.replace(this.url);
        }
        

        // if (this.REDIR) {
        //   setTimeout(() => {
        //     console.log("location.replace ==========>", this.REDIR);
            
        //     // window.location = this.url;
        //   }, 800);

        //   // location.replace( REDIR );
        // }
      }

      // return 'smartsales://auth-sso';
    },

    openAndroid(url, isFromClick) {
      var ua = navigator.userAgent;
      // 1. New Chrome and MiuiBrowser: cannot open App URL in new window any more.
      //    But they support graceful failure when app is not installed. So we can (and have to) safely do this.
      if (
        ua.match(/Chrome\/([4-9]\d+|\d{3,})/) ||
        ua.indexOf("MiuiBrowser/") > 0
      ) {
        window.location = url;
        optionalFallback(3000, isFromClick, 3000);
        return;
      }

      // 2. Old chrome and Android Browser: can open app in new window, and don't fail gracefully,
      //    So the following code avoids the non-graceful failure when app is not installed.
      //    Note: This may not work if this function isn't triggered by user action and popup is blocked in browser.
      var newWindow = window.open(url);

      setTimeout(function () {
        // Note: Must check newWindow availability because it could be null when opened from other apps such as FB or BeeTalk etc.
        if (newWindow && newWindow.window) {
          checkAndCloseWindow(newWindow);
        }
        optionalFallback(0, isFromClick, 3000);
      }, getAndroidDelayTimeForCloseWindow(ua));
    },
    openApp(evt) {
      let PARAMS = this.queryStringToDict();
      let DEEP_LINK = PARAMS["deep_link"];

      let hash = DEEP_LINK ? DEEP_LINK : this.getHash();

      let url = evt.target.href;

      if (hash) {
      }
      // console.log(url, hash);
      // location.replace(url);
      window.location.href = url;
      // if (this.isApple) {

      // }

      // window.opener.postMessage({
      //   'flutter-web-auth': window.location.href
      // }, window.location.origin);
      // window.close();
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