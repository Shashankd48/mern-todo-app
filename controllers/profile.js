exports.home = (req, res) => {
   res.status(200).json({
      message: "You are logged in ! 😊",
   });
};
