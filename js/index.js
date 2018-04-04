$('.form').find('input, textarea').on('keyup blur focus', function (e) {

  var $this = $(this),
    label = $this.prev('label');

  if (e.type === 'keyup') {
    if ($this.val() === '') {
      label.removeClass('active highlight');
    } else {
      label.addClass('active highlight');
    }
  } else if (e.type === 'blur') {
    if ($this.val() === '') {
      label.removeClass('active highlight');
    } else {
      label.removeClass('highlight');
    }
  } else if (e.type === 'focus') {

    if ($this.val() === '') {
      label.removeClass('highlight');
    }
    else if ($this.val() !== '') {
      label.addClass('highlight');
    }
  }

});

$('.tab a').on('click', function (e) {

  e.preventDefault();

  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');

  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();

  $(target).fadeIn(600);

});

$('#btn-login').click(function () {
  console.log('login')
  console.log($('#login-email').val())
  console.log($('#login-password').val())
  var jqxhr = $.post("http://18.217.120.229:8080/login", {
    email: $('#login-email').val(),
    password: $('#login-password').val()
  },
  function (data, status) {
    console.log(data)
    if (data.success) {
      $(location).attr('href', '/main.html')
    }
    else{
      alert(data.msg)
    }
  });
});

$('#btn-signup').click(function () {
  var jqxhr = $.post("http://18.217.120.229:8080/signup", {
    email: $('#signup-email').val(),
    password: $('#signup-password').val(),
    first_name: $('#signup-first-name').val(),
    last_name: $('#signup-last-name').val()
  },
  function (data, status) {
    if (data.success) {
      alert(data.msg)
    } else {
      alert(data.msg)
    }
  });
});