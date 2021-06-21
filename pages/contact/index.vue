<template>
  <div id="inquiry-page">
    <main> 
      <div id="main_content">
          <div class="main_content l-main">
            <h2 class="card-title"><span>Contact</span></h2>
            <div class="lead">
              <p>技術・メンターに関するお問い合わせをお受けしておリます。お気軽にお問い合わせください。</p>
              <p>内容によってはご返答できない場合がございます。あらかじめご了承くださいませ。</p>
            </div>
            <ContactForm />
          </div>
          <div class="l-side">
            <l-menu />
          </div>
      </div>
    </main>
    <ContactConfirm />
  </div>
</template>

<script>
import ContactForm from '~/components/ContactForm.vue';
import ContactConfirm from '~/components/ContactConfirm.vue';
import LMenu from '~/components/layouts/menu';
export default {
  components: {ContactForm, ContactConfirm, LMenu },
  head: {
    title: 'お問い合わせ | フロントエンド うえむーのプロトタイプサイト | NU-Prototype',
    meta: [
      { hid: 'description', name: 'description', content: 'フロントエンド うえむーのプロトタイプサイトのお問い合わせページです。' }
    ]
  }
}
</script>