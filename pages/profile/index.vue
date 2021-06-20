<template>
  <div id="profile-page" class="container">
    <main> 
      <div id="main_content">
        <div class="main_content">
            <div id="name_img">
              <div id="title">{{ profile.title }}</div>
              <div id="img"><img :src="profile.image.url"></div>
            </div>
            <div id="description" v-html="profile.description"></div>
            <div id="carrer" v-html="profile.carrer"></div>
            <div id="programing">
                <h3>{{profile.skill.title}}</h3>
                <div class='skill_detail' v-html="profile.skill.skill"></div>
            </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    head: {
      title: 'プロフィール | フロントエンド うえむーのプロトタイプサイト | NU-Prototype',
      meta: [
        { hid: 'description', name: 'description', content: 'フロントエンド うえむーのプロトタイプサイトのプロフィールページです。' }
      ]
    },
    data() {
      return {
        data: {}
      };
    },
    async asyncData({ params }) {
      const { data } = await axios.get(
        `https://nu-base-template.microcms.io/api/v1/profile`,
        {
          headers: { 'X-API-KEY': process.env.API_KEY }
        }
      );
      return {
        profile: data
      }
    }
}
</script>