module.exports = {
  apps: [
    {
      name: "api-access-4bimec",
      script: "yarn dev",
      watch: true,
      ignore_wacth:['node_modules'],
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
