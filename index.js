module.exports = (api, projectOptions) => {
    console.log(projectOptions);
    api.registerCommand('dev', args => {
      console.log(args);
    })
}
