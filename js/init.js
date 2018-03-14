$(function () {
  $('.lngSelect').on('change', function() {
    if(this.value === 'en') {
      window.location.href = '?lng=' + this.value
    }else{
      window.location.href = 'https://old.elementh.io?lng=' + this.value
    }
  })
  $('#close_navigation, #to_intro, #to_rating, #to_partners, #to_rewards, #to_mvp, #to_roadmap, #to_meetus, #to_faq, #to_contacts, #to_team, #to_advisors, #to_features, #to_cases, #to_dapps, #to_mission').on('click', function () {
    if ($(window).width() < 768) {
      $('header, section, footer').removeClass('disnone');
    }
    $('nav').removeClass('active');
  });
  $('#open_navigation').on('click', function () {
    if ($(window).width() < 768) {
      $('header, section, footer').addClass('disnone');
    }
  });

  for (var i = 1; i < 15; i++) {
    $('#team_text_open_' + i).on('click', function () {
      var teamTextOpen = $(this).data('teamTextOpen')
      $('#team_text_' + teamTextOpen).addClass('active');
      $('#team_text_open_' + teamTextOpen).addClass('disnone');
      $('#team_text_close_' + teamTextOpen).removeClass('disnone');
    });
    $('#team_text_close_' + i).on('click', function () {
      var teamTextClose = $(this).data('teamTextClose')
      $('#team_text_' + teamTextClose).removeClass('active');
      $('#team_text_close_' + teamTextClose).addClass('disnone');
      $('#team_text_open_' + teamTextClose).removeClass('disnone');
    });
  }

  for (var i = 1; i < 15; i++) {
    $('#advisors_text_open_' + i).on('click', function () {
      var advisorsTextOpen = $(this).data('advisorsTextOpen')
      $('#advisors_text_' + advisorsTextOpen).addClass('active');
      $('#advisors_text_open_' + advisorsTextOpen).addClass('disnone');
      $('#advisors_text_close_' + advisorsTextOpen).removeClass('disnone');
    });
    $('#advisors_text_close_' + i).on('click', function () {
      var advisorsTextClose = $(this).data('advisorsTextClose')
      $('#advisors_text_' + advisorsTextClose).removeClass('active');
      $('#advisors_text_close_' + advisorsTextClose).addClass('disnone');
      $('#advisors_text_open_' + advisorsTextClose).removeClass('disnone');
    });
  }

  $('#to_intro').on('click', function () {
    document.getElementById('intro').scrollIntoView();
  });
  $('#to_rating').on('click', function () {
    document.getElementById('rating').scrollIntoView();
  });
  $('#to_partners').on('click', function () {
    document.getElementById('partners').scrollIntoView();
  });
  $('#to_rewards').on('click', function () {
    document.getElementById('rewards').scrollIntoView();
  });
  $('#to_mvp').on('click', function () {
    document.getElementById('mvp').scrollIntoView();
  });
  $('#to_roadmap').on('click', function () {
    document.getElementById('roadmap').scrollIntoView();
  });
  $('#to_team').on('click', function () {
    document.getElementById('team').scrollIntoView();
  });
  $('#to_advisors').on('click', function () {
    document.getElementById('advisors').scrollIntoView();
  });
  $('#to_features').on('click', function () {
    document.getElementById('features').scrollIntoView();
  });
  $('#to_cases').on('click', function () {
    document.getElementById('cases').scrollIntoView();
  });
  $('#to_dapps').on('click', function () {
    document.getElementById('dapps').scrollIntoView();
  });
  $('#to_mission').on('click', function () {
    document.getElementById('mission').scrollIntoView();
  });
  $('#to_contacts').on('click', function () {
    document.getElementById('contacts').scrollIntoView();
  });
  $('#to_meetus').on('click', function () {
    document.getElementById('meetus').scrollIntoView();
  });
  $('#to_faq').on('click', function () {
    document.getElementById('faq').scrollIntoView();
  });

  $('#open_navigation').on('click', function () {
    $('nav').addClass('active');
  });

  $('#success').on('click', function () {
    $('#success').removeClass('active');
  });
  $('#cancel').on('click', function () {
    $('#wlmodal').removeClass('active');
  });

  $('#tabs_list_contribute, #tabs_list_bounty, #tabs_list_airdrop, #tabs_list_referral, #tabs_list_profile').on('click', function () {
    $('#tabs_list_contribute').removeClass('active')
    $('#tabs_list_bounty').removeClass('active')
    $('#tabs_list_airdrop').removeClass('active')
    $('#tabs_list_referral').removeClass('active')
    $('#tabs_list_profile').removeClass('active')
    $('#tabs_container_contribute').removeClass('disblock')
    $('#tabs_container_bounty').removeClass('disblock')
    $('#tabs_container_airdrop').removeClass('disblock')
    $('#tabs_container_referral').removeClass('disblock')
    $('#tabs_container_profile').removeClass('disblock')
  })
  $('#tabs_list_contribute').on('click', function () {
    $('#tabs_list_contribute').addClass('active')
    $('#tabs_container_contribute').addClass('disblock')
  })
  $('#tabs_list_bounty').on('click', function () {
    $('#tabs_list_bounty').addClass('active')
    $('#tabs_container_bounty').addClass('disblock')
  })
  $('#tabs_list_airdrop').on('click', function () {
    $('#tabs_list_airdrop').addClass('active')
    $('#tabs_container_airdrop').addClass('disblock')
  })
  $('#tabs_list_referral').on('click', function () {
    $('#tabs_list_referral').addClass('active')
    $('#tabs_container_referral').addClass('disblock')
  })
  $('#tabs_list_profile').on('click', function () {
    $('#tabs_list_profile').addClass('active')
    $('#tabs_container_profile').addClass('disblock')
  })

  $(document).on("scroll", onScroll);

  function onScroll (event) {
    var scrollPos = $(document).scrollTop() + document.documentElement.clientHeight / 4;
    $('nav ul li').each(function () {
      var currLink = $(this);
      if (currLink.attr('id')) {
        var refElement = $('#' + currLink.attr('id').replace('to_', ''));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
          $('nav ul li').removeClass('active');
          currLink.addClass("active");
        }
        else {
          currLink.removeClass("active");
        }
      }
    });
  }

})