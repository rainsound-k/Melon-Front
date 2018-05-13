function getAuthToken (username, password) {
  axios({
    url: 'http://localhost:8000/api/members/auth-token/',
    method: 'post',
    data: {
      username: username,
      password: password
    }
  }).then(function (response) {
    var token = response.data.token;
    var user = response.data.user;
    setCookie('token', token, 7);
    setUserInfo(user);
  }).catch(function (error) {
    console.log(error);
    console.log(error.response);
  });
}

$('form#login').submit(function (event) {
  // form내부의 input요소들의 값 가져오기
  var username = $('#input-username').val();
  var password = $('#input-password').val();

  // Token을 가져오는 함수 실행
  getAuthToken(username, password);

  // form내부의 input요소들을 비워줌
  $('#input-username').val('');
  $('#input-password').val('');

  // form이 원래 해야하는 동작(이 경우 post요청)을 막음
  event.preventDefault();
});
