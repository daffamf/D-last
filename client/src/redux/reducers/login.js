const login = (state = [], action) => {
    switch (action.type) {
        case 'LOGIN_VIEW':
            return [
                {

                    email: action.email,
                    password: action.password,

                },
                ...state,
            ]

        case 'LOGIN_SUCCESS':
            const data = action.data.data[0]
            return state.map(item => {
                localStorage.setItem("token", action.data.token);
                localStorage.setItem("email", data.email);
                localStorage.setItem("nama", data.nama);
                localStorage.setItem("password", data.password);
                window.location.href = '/admin/dashboard'
                return item
            });

        case 'LOGIN_FAILURE':
            return state.map((item) => {
                item.status = false
                return item
            });
        default:
            return state
    }
}
export default login