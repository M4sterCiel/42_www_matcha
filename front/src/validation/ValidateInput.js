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
          usernameError: "Username is invalid (use constters and numbers)",
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
      }
      return {
        emailError: "",
        emailValid: true
      };
    },
    // Checking password format is valid
    password: value => {
      let pwdHasLowercase = false;
      let pwdHasUppercase = false;
      let pwdHasNumber = false;
      let pwdHasMinLen = false;

      if (/[a-z]/.test(value)) {
        pwdHasLowercase = true;
      } else {
        pwdHasLowercase = false;
      }
      if (/[A-Z]/g.test(value)) {
        pwdHasUppercase = true;
      } else {
        pwdHasUppercase = false;
      }
      if (/[0-9]/g.test(value)) {
        pwdHasNumber = true;
      } else {
        pwdHasNumber = false;
      }
      if (value.length >= 8) {
        pwdHasMinLen = true;
      } else {
        pwdHasMinLen = false;
      }

      if (pwdHasLowercase && pwdHasUppercase && pwdHasNumber && pwdHasMinLen) {
        return {
          passwordCharsReq: {
            pwdHasLowercase: pwdHasLowercase,
            pwdHasUppercase: pwdHasUppercase,
            pwdHasNumber: pwdHasNumber,
            pwdHasMinLen: pwdHasMinLen
          },
          pwd1Valid: true
        };
      } else {
        return {
          passwordCharsReq: {
            pwdHasLowercase: pwdHasLowercase,
            pwdHasUppercase: pwdHasUppercase,
            pwdHasNumber: pwdHasNumber,
            pwdHasMinLen: pwdHasMinLen
          },
          pwd1Valid: false
        };
      }
    }
  }
};
