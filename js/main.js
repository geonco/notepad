// 흑백 전환 기능
$('.main-bg-btn').click(() => {
    if ($('.main-bg-btn').html() == 'Dark🔄️') {
        $('.main-bg-btn').html('White🔄️');
        $('.body-bg').css('background', 'white');
    }
    else {
        $('.main-bg-btn').html('Dark🔄️');
        $('.body-bg').css('background', 'black');
    }
});

// 회원가입 버튼 눌렀을 때
$('.main-bg-register').click(function () {
    $('.register').css('visibility', 'visible');
    $('.register').css('opacity', '1');
    $('.black-bg').css('visibility', 'visible');
    $('.black-bg').css('opacity', '1');
});

// 닫기 버튼 눌렀을 때
$('.close').click(function () {
    $('.register').css('visibility', 'hidden');
    $('.register').css('opacity', '0');
    $('.black-bg').css('visibility', 'hidden');
    $('.black-bg').css('opacity', '0');
});


// 로그인 버튼 눌렀을 때
$('.login').click((e) => {
    logIn(e);
});

// 로그인 창에서 엔터 눌렀을 때
$('.main-bg-login').keypress(function (e) {
    if (e.keyCode === 13) {
        logIn(e);
    }
});


// 아이디, 비번 어레이 생성
let idArray = [];
let pwArray = [];


// 껐다 켜도 데이터 남아있을 수 있도록 설정
idArray = JSON.parse(localStorage.getItem('id'));
pwArray = JSON.parse(localStorage.getItem('pw'));
console.log(idArray, pwArray);


// 회원가입 등록 눌렀을 때
$('.regi').click(function () {

    if (/^[a-z|A-Z]+$/.test($('.regi-id').val()) == false) {    // 아이디 정규식 검증
        alert('아이디는 알파벳만 가능합니다.');
    }
    if (/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/.test($('.regi-pw').val()) == false) { // 비번 정규식 검증
        alert('비밀번호는 숫자와 영어 다 있어야 합니다.')
    }

    // local 비어있고 && id, pw 정규식 true일 때
    if (localStorage.getItem('id') == null) {
        if (/^[a-z|A-Z]+$/.test($('.regi-id').val()) == true && /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/.test($('.regi-pw').val()) == true) {
            alert('등록되었습니다');

            localStorage.setItem('id', JSON.stringify([$('.regi-id').val()]));
            localStorage.setItem('pw', JSON.stringify([$('.regi-pw').val()]));

            $('.register').css('visibility', 'hidden');
            $('.register').css('opacity', '0');
            $('.black-bg').css('visibility', 'hidden');
            $('.black-bg').css('opacity', '0');

            return 0;
        }
    }
    // local이 비어있지 않고 && id, pw 정규식 true이고 && id, pw가 둘 중에 하나라도 없을 때
    else {
        if (/^[a-z|A-Z]+$/.test($('.regi-id').val()) == true && /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/.test($('.regi-pw').val()) == true && ((JSON.parse(localStorage.getItem('id')).includes($('.regi-id').val()) == false) || (JSON.parse(localStorage.getItem('pw')).includes($('.regi-pw').val()) == false))) {

            alert('등록되었습니다');

            idArray = JSON.parse(localStorage.getItem('id'));
            pwArray = JSON.parse(localStorage.getItem('pw'));

            idArray.push($('.regi-id').val());
            pwArray.push($('.regi-pw').val());

            localStorage.setItem('id', JSON.stringify(idArray));
            localStorage.setItem('pw', JSON.stringify(pwArray));

            $('.register').css('visibility', 'hidden');
            $('.register').css('opacity', '0');
            $('.black-bg').css('visibility', 'hidden');
            $('.black-bg').css('opacity', '0');

            return 0;
        }
    }

    // 이미 존재하는 계정일 때
    if (localStorage.getItem('id') != null) {
        if (JSON.parse(localStorage.getItem('id')).includes($('.regi-id').val()) && JSON.parse(localStorage.getItem('pw')).includes($('.regi-pw').val())) {
            alert('이미 존재하는 계정입니다.');
        }
    }

});


// 로그인 함수
function logIn(e) {

    let id = JSON.parse(localStorage.getItem('id'));
    let pw = JSON.parse(localStorage.getItem('pw'));

    // 저장되어 있는 아이디가 하나도 없을 때
    if (id == null) {
        alert('다시 입력하세요.');
        e.preventDefault(); // 폼 전송 금지
    }

    // 저장되어 있는 아이디가 하나 이상 있을 때
    else {

        // 아이디나 비번 둘 중 하나 이상 틀렸을 때
        if (id.includes($('.id-input').val()) == false || pw.includes($('.pw-input').val()) == false) {
            alert('다시 입력하세요.');
            e.preventDefault(); // 폼 전송 금지
        }

        // 아이디 비번 둘 다 있는데 index 번호가 다를 때
        else if (id.indexOf($('.id-input').val()) != pw.indexOf($('.pw-input').val())){
            alert('다시 입력하세요.');
            e.preventDefault(); // 폼 전송 금지
        }

        // 아이디 비번 둘 다 있고 index 번호도 같을 때
        else if (id.indexOf($('.id-input').val()) == pw.indexOf($('.pw-input').val())) {
            alert('로그인 성공');
            window.location.href = 'index2.html';   // 다른 페이지로 이동
        }
    }
}

//  입력한 개수만큼 메모장 생성 
$('.memo-count').on('input', function () {

    $('.row').html(''); // 전부 비우고 시작

    // 입력한 숫자가 1이상일 때
    if ($('.memo-count').val() >= 1) {
        for (var i = 0; i < $('.memo-count').val(); i++) {
            var template = `<div class="col-sm-6">
            <textarea class="memo-input"></textarea>
            </div>`
            template = template.replace('<div class="col-sm-6">', `<div class="col-sm-6" data-id="${i}">`); // data-id 활용
            $('.row').append(template); // 포스트잇 생성

            // localStorage에 저장된 텍스트 불러오기
            let localText = localStorage.getItem(`${i}`);
            localText = JSON.parse(localText);
            $('.memo-input').eq(i).val(localText);  // 메모장 val값 변경
        }
    }

    // 메모장에 텍스트 입력 시 localStorage에 저장
    $('.memo-input').on('input', function (e) {

        // data-id:key, text:value로 저장
        let dataId = $(e.target).parent().data('id');
        let textVal = $(e.target).val();

        console.log(dataId, textVal);
        localStorage.setItem(`${dataId}`, JSON.stringify(`${textVal}`));    // localStorage에 text 저장
    });
});

window.onload = function() {

    // 페이지 로드 시 실행할 코드 작성
    if (window.location.href.includes("index2.html")) {
        for (var i = 0; i < localStorage.length-2; i++) {
            var template = `<div class="col-sm-6">
            <textarea class="memo-input"></textarea>
            </div>`
            template = template.replace('<div class="col-sm-6">', `<div class="col-sm-6" data-id="${i}">`); // data-id 활용
            $('.row').append(template); // 포스트잇 생성

            // localStorage에 저장된 텍스트 불러오기
            let localText = localStorage.getItem(`${i}`);
            localText = JSON.parse(localText);
            $('.memo-input').eq(i).val(localText);  // 메모장 val값 변경
        }
    }
};