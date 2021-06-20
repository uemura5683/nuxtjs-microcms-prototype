if (process.browser) {

  let html                  = document.documentElement,
      body                  = document.body,
      headers               = document.getElementsByClassName( 'header' ),
      footers               = document.getElementsByClassName( 'footer' ),
      overlay               = document.getElementsByClassName( 'overlay' ),
      scrollTop             = 0, 
      top_page              = document.getElementById( 'top-page' ),
      top_animation_bg      = document.getElementById( 'animaton_bg' ),
      top_page_flag         = top_page != null ? true : false;

   // スクロールトップ
  let scrollTo = function ( dom, to, duration ) {
      if ( duration <= 0 ) {
          return;
      }
      var diff = to - dom.scrollTop
        , pert = diff / duration * 5
      setTimeout( function () {
          dom.scrollTop = dom.scrollTop + pert;
          if ( dom.scrollTop === to ) {
              return;
          }
          scrollTo( dom, to, duration - 5 );
      }, 5 );
  };    

  //　スクロール
  if ( footers[0] ) {
      let pagetop   = footers[0].querySelector( '.pagetop' )
        , duration  = 240;
      let
      gototopper = function ( event ) {
          event.preventDefault();
          scrollTo( body, 0, duration );
          scrollTo( html, 0, duration );
      }
      pagetop.addEventListener( 'click', gototopper, false );
    }

  // ハンバーガーメニュー
  if ( headers[0] || overlay[0] ) {
    let menu_btn   = headers[0].querySelector( '.menu_btn' );
    let
    humberger = function ( event ) {
        event.preventDefault();
        if( body.classList.contains('active') ) {
          body.classList.remove('active');
        } else {
          body.classList.add('active');
        }
    }
    menu_btn.addEventListener( 'click', humberger, false );
    overlay[0].addEventListener( 'click', humberger, false );
  }

  if( top_page_flag ) {
    var webStorage = function() {
      if( sessionStorage.getItem ('access' ) ) {
        top_animation_bg.classList.add( 'access' );
      } else {
        sessionStorage.setItem( 'access', 0 );
      }
    }
    webStorage();
  }
}