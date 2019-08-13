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
    createUserTag: (user_id, tag_id) =>
      axios
        .post(`/users/create/user_tag/${user_id}`, { tag_id: tag_id })
        .then(res => res.data),
    deleteUserTag: (user_id, tag_id) =>
      axios
        .post(`/users/delete/user_tag/${user_id}`, { tag_id: tag_id })
        .then(res => res.data),
    updateUserPicture: (user_id, data) =>
      axios
        .post(`/users/update/user_picture/${user_id}`, { data: data })
        .then(res => res.data),
    deleteUserPicture: (user_id, data) =>
      axios
        .post(`/users/delete/user_picture/${user_id}`, { data: data })
        .then(res => res.data),
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
