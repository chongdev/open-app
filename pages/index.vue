<template>
  <div>
    <div class="inner">
      <div>Code: {{ code }}</div>
      <div>isAndroid: {{ isAndroid ? 1 : 0 }}</div>

      <br />

      <div class="my-5" v-if="deeplink">
        <a ref="linkOpen" :href="deeplink" class="btn" @click.prevent="openApp"
          >Open App</a
        >
      </div>


      <div class="my-5" v-if="SSOLoginUrl">
        <a ref="linkOpen" :href="SSOLoginUrl" class="btn" @click.prevent="SSOLogin"
          >SSO Login</a
        >
      </div>


      <div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  created() {
    
  },
  data() {
    return {
      isApple: false,
      autoOpenUrl: false,
      code: "",
      deeplink: "smartsales://",
      REDIR: '',
      isAndroid: false,
      state: 'state',
      baseUrl: 'https://smartids-uat.cpf.co.th',
      redirect_uri: 'https://smartsales-test-app.herokuapp.com',
      client_id: 'IOHI1TY1uFO_tmQ79eNjVA',
      SSOLoginUrl: '',
    };
  },

  mounted(){

    this.isAndroid = navigator.userAgent.indexOf("Android") > 0;
    this.getAutoOpenUrl();

    // set SSOLogin
    this.SSOLoginUrl = `${this.baseUrl}/ids-portal/authorize?response_type=code&client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&scope=openid profile&state=${this.state}`;
  },

  methods: {
    getAutoOpenUrl() {
      // let PARAMS = this.queryStringToDict();
      // let DEEP_LINK = PARAMS["deep_link"];
      // var hash = DEEP_LINK ? DEEP_LINK : getHash();

      this.code = this.$route.query.code;
      this.REDIR = this.$route.query.redir;

      if (this.code) {

        this.getToken();
        // this.url = `smartsales://auth-sso?code=${this.code}`;

        if( this.isAndroid ){
          // window.location.replace(this.url);
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

    getToken(){

      console.log('getToken....');


      let config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic SU9ISTFUWTF1Rk9fdG1RNzllTmpWQTppWEhXWFlYS084bTBoLV9sUmlHQmIzVFNBcy1MMEtncU54WVkxQ1U0aS1n',
        }
      }

      this.$axios.post(`${this.baseUrl}/ids-portal/token`, {
        grant_type: "authorization_code",
        code: this.code,
        redirect_uri: this.redirect_uri
      }, config).then(response=>{
        
        console.log(response);
        let res = response.data;

      }).catch(err => {
        console.error(err)
      })
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

    SSOLogin(){
      location.replace(this.SSOLoginUrl); 
    }
  },
};
</script>