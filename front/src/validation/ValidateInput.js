export default {
  user: {
    // Checking firstname format is valid
    firstname: value => {
      const firstnameRegex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]*-?[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]*$/;

      if (/\s/.test(value)) {
        return {
          firstnameError: "Firstname cannot contain spaces",
          firstnameValid: false
        };
      } else if (!value.match(firstnameRegex)) {
        return {
          firstnameError: "Firstname is invalid",
          firstnameValid: false
        };
      } else if (value === "") {
        return {
          firstnameError: "Firstname cannot be empty",
          firstnameValid: false
        };
      } 
      return {
        firstnameError: "",
        firstnameValid: true
      };
    },
    // Checking lastname format is valid
    lastname: value => {
      const lastnameRegex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]*-?[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]*$/;

      if (/\s/.test(value)) {
        return {
          lastnameError: "Lastname cannot contain spaces",
          lastnameValid: false
        };
      } else if (!value.match(lastnameRegex)) {
        return {
          lastnameError: "Lastname is invalid",
          lastnameValid: false
        };
      } else if (value === "") {
        return {
          lastnameError: "Lastname cannot be empty",
          lastnameValid: false
        };
      } 
      return {
        lastnameError: "",
        lastnameValid: true
      };
    },
    // Checking username format is valid
    username: value => {
      const usernameRegex = /^[a-zA-Z0-9]*-?[a-zA-Z0-9]*$/;

      if (/\s/.test(value)) {
        return {
          usernameError: "Username cannot contain spaces",
          usernameValid: false
        };
      } else if (!value.match(usernameRegex)) {
        return {
          usernameError: "Username is invalid (use letters and numbers)",
          usernameValid: false
        };
      } else if (value.length > 30) {
        return {
          usernameError: "Username is too long (must be equal or less than 30)",
          usernameValid: false
        };
      } else if (value === "") {
        return {
          usernameError: "Username cannot be empty",
          usernameValid: false
        };
      } 
      return {
        usernameError: "",
        usernameValid: true
      };
    },
    // Checking email format is valid
    email: value => {
      const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;

      if (/\s/.test(value)) {
        return {
          emailError: "Email cannot contain spaces",
          emailValid: false
        };
      } else if (!value.match(emailRegex)) {
        return {
          emailError: "Email is invalid (example@email.com)",
          emailValid: false
        };
      } else if (value.length > 30) {
        return {
          emailError: "Email is too long (must be equal or less than 30)",
          emailValid: false
        };
      } else if (value === "") {
        return {
          emailError: "Email cannot be empty",
          emailValid: false
        };
      } 
      return {
        emailError: "",
        emailValid: true
      };
    }
  }
};
