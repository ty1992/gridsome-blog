<template>
  <Layout>
    <div style="min-height: 600px" v-loading="loading">
      <el-card shadow="never" style="min-height: 400px" v-if="blog.id">
        <div slot="header">
          <span>{{ blog.updated_at }} 更新</span>
        </div>
        <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
          发布 {{ blog.created_at }} <br />
          更新 {{ blog.updated_at }}
        </div>
        <div
          style="
            font-size: 1.1rem;
            line-height: 1.5;
            color: #303133;
            border-bottom: 1px solid #e4e7ed;
            padding: 5px 0px 5px 0px;
          "
        >
          <pre style="font-family: '微软雅黑'">{{ blog.description }}</pre>
        </div>
        <div
          v-html="content"
          class="markdown-body"
          style="padding-top: 20px"
        ></div>
      </el-card>
      <el-card
        shadow="never"
        style="
          margin-bottom: 20px;
          padding: 20px 0px 20px 0px;
          text-align: center;
        "
        v-else
      >
        <font style="font-size: 30px; color: #dddddd">
          <b>没有更新 ╮(๑•́ ₃•̀๑)╭</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>

<page-query>
query{
  allBlog(order: ASC,limit: 1){
     edges{
      node{
        id,
        created_at,
        updated_at,
        description,
        content
      }
    }
  }
}
</page-query>

<script>
import { getContent } from "@/api/index";
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt();
export default {
  data() {
    return {
      loading: false,
      content: ''
    };
  },
  computed: {
    blog() {
      return this.$page.allBlog.edges[0].node || {};
    },
  },
  created() {
    this.contentFn();
  },
  methods: {
    async contentFn() {
      let content = "";
      if (this.blog.content) {
        content = await getContent(this.blog.content);
      }
      this.content = md.render(content);
    },
  },
};
</script>

