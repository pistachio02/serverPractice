module.exports = {
    auth: require('./users/Auth'),
    register: require('./users/Register'),
    login: require('./users/LogIn'),
    logout: require('./users/LogOut'),
    kakaogooglelogin: require('./users/KakaoGoogleLogIn'),
    // ( ++++++++++++++++++++ 띄어놓기 띄어놓기 띄어놓기 ++++++++++++++++++++ )
    healing: require('./healings/Healing'),
    // ( ++++++++++++++++++++ 띄어놓기 띄어놓기 띄어놓기 ++++++++++++++++++++ )
    posts: require('./boards/BoardList'),
    post: require('./boards/Board'),
    comments: require('./boards/CommentList'),
    addComment: require('./boards/CommentAdd'),
    deleteComment: require('./boards/CommentDelete'),
    addPost: require('./boards/BoardAddUpdate'),
    deletePost: require('./boards/BoardDelete'),
    // ( ++++++++++++++++++++ 띄어놓기 띄어놓기 띄어놓기 ++++++++++++++++++++ )
    updateUserInfo: require('./myPages/UpdateUserInfo'),
    unRegister: require('./myPages/UnRegister'),
    zzim: require('./myPages/zzimList'),
    addZzim: require('./myPages/addZzim'),
    deleteZzim: require('./myPages/deleteZzim'),
    myPosts: require('./myPages/myPost'),
};