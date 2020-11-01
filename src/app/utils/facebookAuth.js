export const facebookAuth = (authCheck) => {
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');

  window.fbAsyncInit = function () {
    window.FB.init({
      appId: '358432648571666',
      cookie: false,
      xfbml: true,
      version: 'v2.7',
    });

    authCheck();
  };
};
