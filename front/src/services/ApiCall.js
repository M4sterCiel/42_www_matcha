import axios from "axios";

export default {
  user: {
    getUserFromUsername: username =>
      axios.get(`/users/profile/${username}`).then(res => res.data.data),
    updateUserField: (id, field, data) =>
      axios
        .post(`/users/update/${id}/${field}`, { data: data })
        .then(res => res.data),
    updateUserData: (id, data) =>
      axios.post(`/users/update/${id}`, { data: data }).then(res => res.data),
    verifyPasswordWithId: (id, password) =>
      axios
        .post(`/users/verify/${id}/password`, { password: password })
        .then(res => res.data),
    updatePasswordWithId: (id, password) =>
      axios
        .post(`/users/update/${id}/password`, { password: password })
        .then(res => res.data)
  }
};
