// 초기화시 실행
var pageNum = 1;
getArtists(pageNum);

// 더 보기 버튼 실행시
$('#btnMoreArtists').click(function () {
  clickMoreArtistsButton();
});
function clickMoreArtistsButton () {
  pageNum += 1;
  getArtists(pageNum);
}

function getArtists (pageNum) {
  axios({
    url: 'http://localhost:8000/api/artist/',
    method: 'get',
    params: {
      page: pageNum,
    }
  }).then(function (response) {
    var artistListElement = $('.artist-list')
    var artists = response.data.results;
    for (var i = 0; i < artists.length; i++) {
      var curArtist = artists[i];
      var curArtistItemElement = $('#artist-item-template').clone();
      curArtistItemElement.find('.artist-name').text(curArtist.name);
      curArtistItemElement.find('.artist-img-profile').attr('src', curArtist.img_profile);
      artistListElement.append(curArtistItemElement);
    }
    if (response.data.next == null) {
      $('#btnMoreArtists').css('display', 'none')
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}
