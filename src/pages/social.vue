<template>
  <Layout>
    <div>
      <el-card
        shadow="never"
        style="
          min-height: 400px;
          margin-bottom: 20px;
          padding: 0px 0px 20px 0px;
        "
      >
        <el-tabs v-model="activeTab" type="card">
          <el-tab-pane
            :label="'粉丝 ' + followers.length"
            name="followers"
            style="padding: 5px"
          >
            <div>
              <div v-if="followers.length">
                <el-row style="min-height: 200px">
                  <el-col
                    :span="8"
                    v-for="({ node: item }, index) in followers"
                    :key="'followers' + index"
                    style="padding: 10px"
                  >
                    <el-card
                      shadow="hover"
                      style="font-size: 13px; color: #606266; line-height: 20px"
                    >
                      <i class="el-icon-star-off"></i>&emsp;
                      <span style="text-decoration: none; cursor: pointer">{{
                        item.login
                      }}</span>
                      <br />
                      <i class="el-icon-message"></i>&emsp;
                      <a
                        :href="item.html_url"
                        target="_blank"
                        style="text-decoration: none; cursor: pointer"
                        >TA的主页</a
                      >
                      <br />
                      <img
                        :src="item.avatar_url"
                        style="width: 100%; border-radius: 5px; margin-top: 5px"
                      />
                    </el-card>
                  </el-col>
                </el-row>
                <div style="text-align: center; margin-top: 10px"></div>
              </div>
              <div
                style="
                  min-height: 300px;
                  margin-bottom: 20px;
                  padding: 20px 0px 20px 0px;
                  text-align: center;
                "
                v-else
              >
                <font style="font-size: 30px; color: #dddddd">
                  <b>(￢_￢) 没有一个粉丝</b>
                </font>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane
            :label="'关注 ' + followings.length"
            name="following"
            style="padding: 5px"
          >
            <div>
              <div v-if="followings.length">
                <el-row style="min-height: 200px">
                  <el-col
                    :span="8"
                    v-for="({ node: item }, index) in followings"
                    :key="'following' + index"
                    style="padding: 10px"
                  >
                    <el-card
                      shadow="hover"
                      style="font-size: 13px; color: #606266; line-height: 20px"
                    >
                      <i class="el-icon-star-off"></i>&emsp;
                      <span style="text-decoration: none; cursor: pointer">{{
                        item.login
                      }}</span>
                      <br />
                      <i class="el-icon-message"></i>&emsp;
                      <a
                        :href="item.html_url"
                        target="_blank"
                        style="text-decoration: none; cursor: pointer"
                        >TA的主页</a
                      >
                      <br />
                      <img
                        :src="item.avatar_url"
                        style="width: 100%; border-radius: 5px; margin-top: 5px"
                      />
                    </el-card>
                  </el-col>
                </el-row>
                <div style="text-align: center; margin-top: 10px"></div>
              </div>
              <div
                style="
                  min-height: 300px;
                  margin-bottom: 20px;
                  padding: 20px 0px 20px 0px;
                  text-align: center;
                "
                v-else
              >
                <font style="font-size: 30px; color: #dddddd">
                  <b>(￢_￢) 还没有关注一个人</b>
                </font>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </Layout>
</template>

<page-query>
query {
  allFollower{
     edges{
      node{
        id,
        avatar_url,
        html_url,
        login
      }
    }
  },
  allFollowing{
     edges{
      node{
        id,
        avatar_url,
        html_url,
        login
      }
    }
  }
}
</page-query>

<script>
export default {
  data() {
    return {
      activeTab: "followers",
    };
  },
  computed: {
    followers(){
      return this.$page.allFollower.edges
    },
    followings(){
      return this.$page.allFollowing.edges
    },
  }
};
</script>