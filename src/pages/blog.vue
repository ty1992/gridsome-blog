<template>
  <Layout>
    <div style="min-height: 600px">

      <div v-if="blogs && blogs.length > 0">
        <el-card
          shadow="hover"
          v-for="({ node: item }, index) in blogs"
          :key="'p' + index"
          style="margin-bottom: 20px"
        >
          <div slot="header">
            <el-row>
              <el-col :span="16">
                <span>
                  <a style="text-decoration: none; cursor: pointer">
                    <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
                    {{ item.description }}
                  </a>
                </span>
              </el-col>
            </el-row>
          </div>
          <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
            最近更新 {{ item.updated_at }}
          </div>
          <div
            style="
              font-size: 1.1rem;
              line-height: 1.5;
              color: #303133;
              padding: 10px 0px 0px 0px;
            "
          >
            {{ item.description }}
          </div>
        </el-card>
        <div style="text-align: center"></div>
      </div>

      <el-card
        shadow="never"
        style="
          margin-bottom: 20px;
          padding: 20px 0px 20px 0px;
          text-align: center;
        "
        v-if="!blogs || blogs.length == 0"
      >
        <font style="font-size: 30px; color: #dddddd">
          <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>

<page-query>
query {
  allBlog{
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
export default {
  data() {
    return {
      
    };
  },
  computed: {
    blogs(){
      let blogs = [];
      try{
        blogs = this.$page.allBlog.edges
      }catch(err){

      };
      return blogs
    }
  }
};
</script>