<template>
  <div id="profile-page">
    <main> 
        <div id="main_content">
        <div class="l-side">
        <l-menu />
        </div>
        <div class="profile-page-inner l-main">
        <div id="name_img">
        <h2 id="title">{{ profile.title }}</h2>
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
    import axios from 'axios';
    import LMenu from '~/components/layouts/menu';
    export default {
        head: {
            title: 'プロフィール | フロントエンド うえむーのプロトタイプサイト | NU-Prototype',
            meta: [
                { hid: 'description', name: 'description', content: 'フロントエンド うえむーのプロトタイプサイトのプロフィールページです。' }
            ]
        },
        components: {
            LMenu
        },
        data() {
            return {
                posts: []
            }
        },
        async asyncData({ params }) {
        const { data } = await axios.get(
            `https://nu-base-template.microcms.io/api/v1/profile`,
            {
            headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }
            }
        );
        return {
            profile: data
        }
    }
}
</script>

<style lang="scss">
$white: #ffffff; $l_gray: #fafafa; $gray: #e5e5e5; $d_gray: #666666; $black: #000000; $fs-min: 10; $fs-max: 100;
#profile-page {
    main {
        width: 100%;
        margin: 0 auto;
        padding: 0;
        background-color: $white;
        #main_content {
            .profile-page-inner {
                margin: 0 auto;
                > * {
                    -webkit-justify-content: flex-start;
                            justify-content: flex-start;
                    -webkit-align-items: center;
                            align-items: center;
                    height: auto;
                    background: #fff;
                    position: relative;
                    display: flex;
                    flex-wrap: wrap;
                    padding: 1.5rem;
                    background-color: $l_gray;
                    &:nth-of-type(even) {
                        background-color: $d_gray;
                        h2, h3 {
                            border-bottom: 1px solid $gray !important;                         
                        }
                        h2, h3, p {
                            color : $gray !important;
                        }
                        ul {
                            li {
                                span {
                                    color: $gray;
                                    &[class*="star"] {
                                        border: 1px solid $gray !important;
                                        &::after {
                                            content: '';
                                            background-color:$gray !important;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                > #name_img {
                    justify-content: center;
                    -webkit-justify-content: center;
                }                
                #name_img {
                    #title {
                        margin: 0 1rem 0 0;
                        width: calc(50% - 1rem);
                        h2 {
                            font-size: 1.8rem;  
                            padding: 10px 0;
                            border-bottom: 1px solid $d_gray;
                            width: 100%;
                        }
                    }
                    #img {
                        width: 50%;
                        position: relative;
                        span {
                            width: 100%;
                            padding: 100% 0 0;
                            position: absolute;
                            background-size: 100%;
                            background-repeat: no-repeat;
                            border-radius: 50%;
                        }
                    }
                }
                #description, #carrer, #programing {
                    h2, h3 {
                        padding: 10px 0px;
                        margin: 10px auto;
                        border-bottom: 1px solid $d_gray;
                        width: 25%;
                    }
                    .skill_detail, p {
                        margin: 1rem 0 1rem 1.5rem;
                        width: calc( 75% - 1.5rem );
                    }
                    .skill_detail {
                        ul {
                            display: flex;
                            flex-wrap: wrap;
                            li {
                                margin: 1rem 0;
                                width: 47.5%;
                                &:nth-of-type( 2n - 1 ) {
                                    margin: 1rem 5% 1rem 0;
                                }
                                span {
                                    display: inline-block;
                                    width: 100%;
                                    &[class*="star"] {
                                        border: 1px solid $d_gray;
                                        padding: 3px;
                                        margin: 1rem 0 0;
                                        position: relative;
                                        &::after {
                                            content: '';
                                            background-color:$d_gray;
                                            height: 20px;
                                            position: relative;
                                            display: block;
                                            width: 100%;
                                        }
                                        @for $i from $fs-min through $fs-max {
                                            $width: percentage($i * 0.01);
                                            &.star#{$i} {
                                                &:after {
                                                    width: $width;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }    
                #carrer {
                    p {
                        margin: 1rem 0;
                        width: 100%;
                    }
                }    
            }
        }
    }
}

@media screen and (max-width: 767px) {
    #profile-page {
        padding: 0;
        main {
            padding: 0.5rem 0;
            #main_content {
                .profile-page-inner {
                    #name_img {
                        #title {
                            margin: 0;
                            padding: 0 0 1rem;
                        }
                        #img {
                            padding: 0;
                        }
                    }
                    #description, #carrer, #programing {
                        h2, h3 {
                            width: 100%;
                            padding: 0 0 10px;
                            margin: 0;
                        }
                        .skill_detail, p {
                            margin: 1rem 0;
                            width: 100%;
                        }
                        .skill_detail {
                            margin: 0;
                        }
                        li {
                            width: 100% !important;
                            margin: 1rem 0 !important;
                        }
                    }
                }
            }
        }
    }
}

#profile-page + .footer {
    position: fixed;
    left: 0;
    bottom: 0;
}
</style>