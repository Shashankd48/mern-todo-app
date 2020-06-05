exports.home = (req, res) => {
   res.status(200).json({
      Home: "Page says everything is okay",
   });
};
exports.login = (req, res) => {
   res.status(200).json({
      Login: "Enter your details here...",
   });
};
