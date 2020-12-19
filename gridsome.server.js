// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`


const axios = require('axios');

const ajax = url => {
  return new Promise(async (resolve, reject) => {
    try {
      //'https://api.github.com/users/ty1992'
      const res = await axios.get(url);
      return resolve(res.data)
    } catch (err) {
      return reject(err);
    }
  })
}


module.exports = function (api) {
  api.loadSource(async ({
    addCollection
  }) => {
    const authors = addCollection('Author');
    const blogs = addCollection('Blog');
    const followers = addCollection('Follower');
    const followings = addCollection('Following');
    const projects = addCollection('project');

    try {
      const res = await ajax('https://api.github.com/users/ty1992');
      authors.addNode(res);
    } catch (err) {}

    try {
      const res = await ajax('https://api.github.com/users/ty1992/gists');
      res.forEach(item => {
        blogs.addNode({
          id: item.id,
          created_at: item.created_at,
          updated_at: item.updated_at,
          description: item.description,
          content: (item.files.content && item.files.content.raw_url) || ''
        })
      })
    } catch (err) {}

    try {
       // 关注
      const res = await ajax('https://api.github.com/users/ty1992/following')
      res.forEach(item => {
        followings.addNode(item)
      })
    } catch (error) {

    }

    try {
      // 粉丝
      const res = await ajax('https://api.github.com/users/ty1992/followers')
      res.forEach(item => {
        followers.addNode(item)
      })
    } catch (error) {
      
    }

    try {
      const res = await ajax('https://api.github.com/users/ty1992/repos')
      res.forEach(item => {
        projects.addNode(item)
      })
    } catch (error) {
      
    }

    // follower(followers)
    // following(followings)
  })
}