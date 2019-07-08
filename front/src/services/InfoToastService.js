import Materialize from "materialize-css";

export default {
  mail: {
    resetPassword: () => {
      Materialize.toast({
        html: "An email to reset your password has been sent",
        displayLength: 1400,
        classes: "rounded info-toast"
      });
    }
  },
  auth: {
    changedPassword: () => {
      Materialize.toast({
        html: "password has been changed",
        displayLength: 1200,
        classes: "rounded info-toast"
      });
    }
  }
};
