<template>
  <Layout>
    <div style="min-height: 600px">
      <div v-if="projects && projects.length > 0">
        <el-card
          shadow="hover"
          v-for="({ node: item }, index) in projects"
          :key="'pro' + index"
          style="margin-bottom: 20px"
        >
          <div slot="header">
            <el-row>
              <el-col :span="12">
                <span>
                  <a
                    style="text-decoration: none; cursor: pointer"
                    @click="goGithub(item.html_url)"
                  >
                    <i class="el-icon-service"></i>&nbsp;&nbsp; {{ item.name }}
                  </a>
                </span>
              </el-col>
              <el-col :span="12">
                <div style="text-align: right">
                  <el-button
                    @click="goGithub(item.html_url)"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-back"
                    >前往GitHub</el-button
                  >
                </div>
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
          <div
            style="font-size: 1.1rem; color: #303133; padding: 10px 0px 0px 0px"
          >
            <el-row>
              <el-col :span="12" style="padding-top: 5px">
                <el-tooltip
                  effect="dark"
                  :content="'star ' + item.stargazers_count"
                  placement="bottom"
                >
                  <i
                    class="el-icon-star-off"
                    style="margin: 0px 5px 0px 0px"
                  ></i>
                </el-tooltip>
                {{ item.stargazers_count }}
                <el-tooltip
                  effect="dark"
                  :content="'watch ' + item.watchers_count"
                  placement="bottom"
                >
                  <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{ item.watchers_count }}
                <el-tooltip
                  effect="dark"
                  :content="'fork ' + item.forks_count"
                  placement="bottom"
                >
                  <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{ item.forks_count }}
              </el-col>
              <el-col :span="12" style="text-align: right">
                <el-tag size="small" type="danger" v-if="item.license">{{
                  item.license.name
                }}</el-tag>
                <el-tag size="small" type="success" v-if="item.language">{{ item.language }}</el-tag>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>

      <el-card
        shadow="never"
        style="
          margin-bottom: 20px;
          padding: 20px 0px 20px 0px;
          text-align: center;
        "
        v-if="!projects || projects.length == 0"
      >
        <font style="font-size: 30px; color: #dddddd">
          <b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>

<page-query>
query {
  allProject{
     edges{
      node{
        name,
        html_url,
        forks_count,
        watchers_count,
        stargazers_count,
        language,
        description,
        license{
          name
        },
        updated_at
      }
    }
  }
}
</page-query>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    projects(){
      return this.$page.allProject.edges
    }
  },
  methods: {
    goGithub(url){
      window.open(url, '__black')
    }
  }
};
</script>