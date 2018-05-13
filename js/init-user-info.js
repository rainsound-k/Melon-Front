function initUserInfo () {
  var token = getCookie('token');
  if (token) {
    axios({
      url: 'http://localhost:8000/api/members/info/',
      method: 'get',
      headers: {
        Authorization: 'Token' + ' ' + token
      }
    }).then(function (response) {
      // response.data는 User객체
      // 받은 User객체를 사용해서 setUserInfo함수 실행, UI변경
      setUserInfo(response.data);
    }).catch(function (error) {
      console.log(error.response);
    });
  }
}

function setUserInfo (user) {
  // 유저정보를 표시할 요소에 텍스트를 채움
  $('#user-info').text(user.username + ' (으)로 로그인 중');
  // 이후 해당 요소의 'none'클래스 속성을 삭제
  $('#user-info').removeClass('none');
  // form#login에 'none'클래스 추가
  $('form#login').addClass('none');
}
