<template>
  <div id="inquiry-page" class="container mt-4 p-0">
    <main> 
      <div id="main_content" class="container d-block d-md-flex mt-4 p-0">
          <div class="main_content col-md-6  p-0 text-center">
            <h2 class="card-title">Contact</h2>
            <div class="lead">
              <p>技術・メンターに関するお問い合わせをお受けしておリます。お気軽にお問い合わせください。</p>
              <p>内容によってはご返答できない場合がございます。あらかじめご了承くださいませ。</p>
            </div>
            <ContactForm />
          </div>
      </div>
    </main>
    <ContactConfirm />
  </div>
</template>

<script>
import ContactForm from '~/components/ContactForm.vue';
import ContactConfirm from '~/components/ContactConfirm.vue';
export default {
  components: {ContactForm, ContactConfirm },
  head: {
    title: 'お問い合わせ | フロントエンド うえむーのプロトタイプサイト | NU-Prototype',
    meta: [
      { hid: 'description', name: 'description', content: 'フロントエンド うえむーのプロトタイプサイトのお問い合わせページです。' }
    ]
  }
}
</script>