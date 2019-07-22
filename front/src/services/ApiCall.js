import axios from "axios";

export default {
  user: {
    getUserFromUsername: username =>
      axios.get(`/users/profile/${username}`).then(res => res.data.data),
    updateUserField: (id, field, data) =>
      axios
        .post(`/users/update/${id}/${field}`, { data: data })
        .then(res => res.data)
  }
};
