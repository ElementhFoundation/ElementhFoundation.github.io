var countDownDate = 1522540800000
var btcWalllet = null
var balance = 0
var user = null
var crowdAddresses = null

if (window.top !== window.self) {
  document.write = "";
  window.top.location = window.self.location;
  setTimeout(function () {
    document.body.innerHTML = '';
  }, 1);
  window.self.onload = function (evt) {
    document.body.innerHTML = '';
  };
}

$(function () {
  var hash = window.location.hash.substr(1)
  if (hash) {
    if (hash === 'emailVerified') {
      $('#emailVerified').removeClass('disnone')
      $('#emailVerified').append('<img height="1" width="1" style="display:none" src="https://matchico.com/track-investor/87c734a9-5afb-487d-9355-6bad7f725c30/signup.gif"/>')
      $('#emailVerified').append('<!-- Reddit Conversion Pixel --> <script>var i=new Image();i.src="https://alb.reddit.com/snoo.gif?q=CAAHAAABAAoACQAAAAEHsCU6AA==&s=HHUkLOGwK4RVah69HdhkQ7g5rR0_Cf0mSb0oOKK9eBw=";</script><noscript><img height="1" width="1" style="display:none" src="https://alb.reddit.com/snoo.gif?q=CAAHAAABAAoACQAAAAEHsCU6AA==&s=HHUkLOGwK4RVah69HdhkQ7g5rR0_Cf0mSb0oOKK9eBw="/></noscript><!-- DO NOT MODIFY --> <!-- End Reddit Conversion Pixel -->')

      if (typeof yaCounter46855911 !== 'undefined') {
        yaCounter46855911.reachGoal('verifyEmail')
      }
    }
    if (hash.toLowerCase() === 'ico') {
      $('#tabs_container_profile').removeClass('disblock')
      $('#tabs_list_profile').removeClass('active')
      $('#tabs_list_contribute').addClass('active')
      $('#tabs_container_contribute').addClass('disblock')
    }
  }

  getInit(function (err, data) {
    crowdAddresses = data.address
    user = data.profile
    if (user && user.wallet_eth) {
      getBalance(crowdAddresses.tokenAddress, user.wallet_eth, function (err, data) {
        balance = data
        init()
      })
    } else {
      init()
    }
  })

});

function updateSmartConrtactData () {
  getCap(function (err, cap) {
    if (err) {
      setTimeout(updateSmartConrtactData, 10000)
    }
    else if (cap) {
      $('#hardcap_data').html(cap + ' ETH')

      getCollected(function (err, collected) {
        if (collected) {
          $('#balance_data').html(collected + ' ETH')
          $('#percent_number').html(Math.round(collected / cap * 100) + '%')
          $('#percent_line').width(Math.round(collected / cap * 100) + '%')
        }
        setTimeout(updateSmartConrtactData, 10000)
      })
    }
  })
}

function checkLoginState () {
  FB.getLoginStatus(function (response) {
    if (response.authResponse && response.authResponse.accessToken) {
      authFacebook(response.authResponse.accessToken, function (err, data) {
        if (err) {
          $('.error').html(err).removeClass('disnone')
        } else {
          var redirect = getParameterByName("redirect")
          if (redirect) {
            window.location.href = redirect
          } else {
            window.location.href = "/profile"
          }
        }
      })
    }
  })
}

function updateProgressBar () {
  getICOStat(function (err, data) {
    if (data.totalRaised >= 10000) {
      if (!$('#progress_line_softcap').hasClass('check')) {
        $('#progress_line_softcap').addClass('check')
      }
    }
    $('#progress_line_current').animate({
      width: (Number(data.totalRaised) / 30000 * 100) + "%"
    }, 300)
    $('#nowETH').html(data.totalRaisedETH + ' ETH')
    $('#nowBTC').html(data.totalRaisedBTC + ' BTC')
    $('#total').html(data.totalRaised + ' ETH')
  })
}

function init () {

  if ($('#timer').length) {
    var curDate = new Date().getTime();
    updateProgressBar()
    if (curDate < countDownDate) {
      $('#timerTitle').html('ICO starts in:')
      //$('#preico').removeClass('disnone')
    } else {
      countDownDate = null;
      //$('#timerTitle').html('ICO coming soon')
    }

    if (countDownDate) {
      var x = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (hours < 10) {
          hours = '0' + hours
        }
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        if (seconds < 10) {
          seconds = '0' + seconds
        }
        // Display the result in the element with id="demo"

        $('#timer').html(days + "d " + hours + ":" + minutes + ":" + seconds)
        // If the count down is finished, write some text
        if (distance <= 1) {

          $('#timerTitle').html('ICO ends in:')
          countDownDate = 1525132800000;
          //clearInterval(x)
          $('#progressbar_div').removeClass('disnone')
        }
      }, 1000);

      setInterval(function () {
        updateProgressBar()
      }, 10000)
    }
  }

  if ($('.userblock').length) {
    if (user) {
      $('.userblockR').removeClass('disnone')
    } else {
      $('.userblockU').removeClass('disnone')
    }
  }
  var profile_tabs = $('#profile_tabs')
  if (profile_tabs.length) {
    if (user) {
      getReferralsInfo(function (err, data) {
        if (data && data.total && data.total.bonus) {
          $('#user_referral_balance').html(data.total.bonus + ' ETH')
        }
      })
      if (user.verified) {
        if (typeof yaCounter46855911 !== 'undefined') {
          yaCounter46855911.setUserID(user.id)
          yaCounter46855911.userParams({
            country: user.country,
            wallet_btc: user.wallet_btc,
            wallet_eth: user.wallet_eth,
            referral: user.referral
          })
        }
        $('#user_transaction_balance').html(user.eee_balance)

        if(parseFloat(user.eee_balance)){
          $('#transaction_balance_withdraw').removeClass('disnone')
        }

        var questionnaire_form = $('#questionnaire_form')
        if (questionnaire_form.length) {
          questionnaire_form.submit(function (e) {
            e.preventDefault();
            questionnaire_form.find('.error').addClass('disnone')
            questionnaire_form.find(':input[type="submit"]').prop('disabled', true)
            setInfo($(this).serialize(), function (err, data) {
              if (err) {
                questionnaire_form.find('.error').html(err).removeClass('disnone')
                questionnaire_form.find(':input[type="submit"]').prop('disabled', false)
              } else {
                $('#questionnaire').addClass('disnone')
              }
            })
          })
        }
        if (!user.quiz) {
          $('#questionnaire').removeClass('disnone')
        }
        $('#airdrop_check').on('click', function () {
          $('#loading').removeClass('disnone')
          checkAirdrop(function (err, data) {
            $('#loading').addClass('disnone')
            if (data.airdrop) {
              $('#user_referral_airdrop_count').html(data.referralAirdropCount)
              $('#airdrop_yes').removeClass('disnone')
              $('#airdrop_check').addClass('disnone')
              $('#how_to_airdrop').addClass('disnone')
              if (typeof yaCounter46855911 !== 'undefined') {
                yaCounter46855911.reachGoal('airdropYes')
              }
            } else {
              $('#airdrop_no').removeClass('disnone')
            }
          })
        })
        $('#contribute_prefund').on('click', function () {
          $('#contribute_prefund').addClass('disnone')
          $('#prefund_block').removeClass('disnone')
          if (typeof yaCounter46855911 !== 'undefined') {
            yaCounter46855911.reachGoal('prefund')
          }
        })
        profile_tabs.removeClass('disnone')
        $('#user_username').html(user.username)
        $('#user_email').html(user.email)
        $('#user_telegram').html(user.telegram_username)
        $('#user_wallet_btc').html(user.wallet_btc)
        $('#user_wallet_eth').html(user.wallet_eth)
        $('#user_country').html(user.country)
        $('#unique_referral_link_input').val(user.partnerUrl)
        $('#unique_airdrop_link_input').val(user.partnerUrl)
        $('#user_referral_count').html(user.referralCount)
        $('#user_referral_airdrop_count').html(user.referralAirdropCount)
        $('#airdrop_join_telegram').attr("href", user.telegram_secret)
        $('#prefund_link_input').val(crowdAddresses.prefund)

        if (user.referralAirdropCount > 0) {
          $('#user_referral_airdrop_count').html(user.referralAirdropCount)
          $('#airdrop_yes').removeClass('disnone')
          $('#airdrop_check').addClass('disnone')
          $('#how_to_airdrop').addClass('disnone')
        }
        new Clipboard('#unique_referral_link_copy').on('success', function (e) {
          $('#unique_referral_link_copy').addClass('disnone')
          $('#unique_referral_link_copied').addClass('disblock')
        });

        new Clipboard('#unique_airdrop_link_copy').on('success', function (e) {
          $('#unique_airdrop_link_copy').addClass('disnone')
          $('#unique_airdrop_link_copied').addClass('disblock')
        });

        new Clipboard('#prefund_link_copy').on('success', function (e) {
          $('#prefund_link_copy').addClass('disnone')
          $('#prefund_link_copied').addClass('disblock')
        });
      } else {
        if (user.email) {
          $('#verification').removeClass('disnone')
        } else {
          $('#addemail_div').removeClass('disnone')
          var user_email_edit_form = $('#user_email_edit_form')
          user_email_edit_form.submit(function (e) {
            user_email_edit_form.find(':input[type="submit"]').prop('disabled', true)
            e.preventDefault();
            user_email_edit_form.find('.error').addClass('disnone')
            setEmail(user_email_edit_form.serialize(), function (err, data) {
              if (err) {
                user_email_edit_form.find('.error').html(err).removeClass('disnone')
                user_email_edit_form.find(':input[type="submit"]').prop('disabled', false)
              } else {
                window.location.href = "/profile"
              }
            })
          })
        }
      }
    } else {
      window.location.href = "/signup"
    }
  }

  $('#address_eth_div').html(crowdAddresses.eth)
  $('#address_eth_form').val(crowdAddresses.eth)
  $('#address_btc_div').html(crowdAddresses.btc)
  $('#address_btc_form').val(crowdAddresses.btc)

  btcWalllet = crowdAddresses.btc

  if ($('#preico').length) {
    initContract(crowdAddresses.eth)
    updateSmartConrtactData()
  }
  if ($('#eth_qrcode').length) {
    new QRCode(document.getElementById("eth_qrcode"),
      {
        text: 'ethereum:' + crowdAddresses.eth,
        width: 128,
        height: 128,
        correctLevel: QRCode.CorrectLevel.H
      })
    new QRCode(document.getElementById("btc_qrcode"), {
      text: 'bitcoin:' + crowdAddresses.btc,
      width: 128,
      height: 128,
      correctLevel: QRCode.CorrectLevel.H
    })
  }

  $('#sbmt').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: 'https://apimail.ahoolee.io/api/subscribe',
      type: 'post',
      data: $('#sbmt').serialize()
    });
  });

  $('input[name=currency]:radio').change(function () {

    if ($('input[name=currency]:checked').val() == 'eth') {
      $('#input_btc').removeClass('disblock').addClass('disnone');
    }

    if ($('input[name=currency]:checked').val() == 'btc') {
      $('#input_btc').addClass('disblock').removeClass('disnone');
    }
  })
  if ($('#gasprice').length) {
    $.ajax({
      url: 'https://ethgasstation.info/json/ethgasAPI.json',
      dataType: 'json',
      success: function (data) {
        $('#gasprice').html(Math.round(data.average / 10))
      }
    });
  }

  $('#get_eee_btc').on('click', function () {
    $('#wallet_btc_ok').removeClass('disnone')
    if (typeof yaCounter46855911 !== 'undefined') {
      yaCounter46855911.reachGoal('getBTC')
    }
  })

  $('#wallet_btc_ok_close').on('click', function () {
    $('#wallet_btc_ok').addClass('disnone')
  })

  $('#get_eee_eth').on('click', function () {
    $('#wallet_eth_ok').removeClass('disnone')
    if (typeof yaCounter46855911 !== 'undefined') {
      yaCounter46855911.reachGoal('getEEE')
    }
  })

  $('#wallet_eth_ok_close').on('click', function () {
    $('#wallet_eth_ok').addClass('disnone')
  })

  $('#transaction_balance_gettoken').on('click', function () {
    $('#transaction_invoice').removeClass('disnone')
  })


  var transaction_invoice_send = $('#transaction_invoice_send')
  var transaction_invoice_confirm = $('#transaction_invoice_confirm')

  $('#invoice_confirm_back').on('click', function (e) {
    e.preventDefault()
    transaction_invoice_send.find(':input[type="submit"]').prop('disabled', false)
    transaction_invoice_send.removeClass('disnone')
    transaction_invoice_confirm.addClass('disnone')
    $('#transaction_invoice_confirm_title').removeClass('active')
  })

  new Clipboard('#ico_link_input_copy').on('success', function (e) {
    $('#ico_link_input_copy').addClass('disnone')
    $('#ico_link_input_copied').addClass('disblock')
  });


  $('#transaction_balance_withdraw').on('click', function () {
    $('#transaction_withdraw').removeClass('disnone')
  })

  var transaction_withdraw_send = $('#transaction_withdraw_send')
  var transaction_withdraw_confirm = $('#transaction_withdraw_confirm')

  $('#withdraw_confirm_back').on('click', function (e) {
    e.preventDefault()
    transaction_withdraw_send.find(':input[type="submit"]').prop('disabled', false)
    transaction_withdraw_send.removeClass('disnone')
    transaction_withdraw_confirm.addClass('disnone')
    $('#transaction_invoice_confirm_title').removeClass('active')
  })

  if(user && user.tfa){
    $('#ga2fa_div').removeClass('disnone')
  }else{
    $('#twofa_enable_form').removeClass('disnone')
  }

  if (transaction_invoice_send.length) {
    getEventsList(function (err, data) {
      if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
          var obj = null
          var newClass = null
          if (data[i].event_type === 'invoice') {
            obj = $("#invoice_tmpl").clone()
            obj.attr("id", 'i' + data[i].id)
            obj.find('.ico_link_input').val(data[i].wallet).attr("id", 'ili' + data[i].id)
            obj.find('.copy').data('clipboard-target', '#ili' + data[i].id).attr("data-clipboard-target", '#ili' + data[i].id).attr("id", 'copy_' + data[i].id)
            newClass = 'new'
            if(data[i].status === 1){
              newClass = 'payed'
            } else if(data[i].status === 2){
              newClass = 'partially_payed'
            } else if(data[i].status === 3){
              newClass = 'expired'
            }
            obj.find('.transaction_row_status').addClass(newClass)
            obj.find('.transaction_row_description_address').html(data[i].wallet)
          } else {
            obj = $("#transaction_tmpl").clone()
            obj.attr("id", 't' + data[i].id)
            obj.find('.transaction_row_description_address.from').html(data[i].from)
            obj.find('.transaction_row_description_address.to').html(data[i].to)
            obj.find('.transaction_row_number').html(data[i].type).addClass(data[i].type)
            newClass = 'pending'
            if(data[i].status === 1){
              newClass = 'confirmed'
            } else if(data[i].status === 2){
              newClass = 'cancelled'
            } else if(data[i].status === 3){
              newClass = 'declined'
            }
            obj.find('.transaction_row_status').addClass(newClass)
          }

          if (parseFloat(data[i].amount) >= 0) {
            obj.find('.transaction_row_amount.green').html(data[i].amount + ' ' + data[i].currency)
          } else {
            obj.find('.transaction_row_amount.red').html(data[i].amount + ' ' + data[i].currency)
          }
          obj.find('.transaction_row_description_amount').html(data[i].amount + ' ' + data[i].currency)
          obj.find('.transaction_row_date').html(data[i].created_at.date)
          obj.find('.transaction_info_body').html(data[i].id)
          obj.appendTo("#transaction_history").removeClass('disnone')
          if (data[i].event_type === 'invoice') {
            obj.find('.qrcode_transaction_container').attr("id", 'qr' + data[i].id)
            new QRCode(document.getElementById('qr' + data[i].id), {
              text: data[i].link,
              width: 220,
              height: 220,
              correctLevel: QRCode.CorrectLevel.H
            })
            new Clipboard('#copy_' + data[i].id).on('success', function (e) {
              $('#' + e.trigger.id).addClass('disnone').parent().children('.copied').addClass('disblock')
            })
          }
        }
      }
    })
    transaction_invoice_send.submit(function (e) {
      transaction_invoice_send.find(':input[type="submit"]').prop('disabled', true)
      e.preventDefault();
      $('#invoice_confirm_amount').html($('#invoice_send_amount').val() + $('#invoice_send_currency').val())
      transaction_invoice_send.addClass('disnone')
      transaction_invoice_confirm.removeClass('disnone')
      $('#transaction_invoice_confirm_title').addClass('active')
    })

    transaction_withdraw_send.submit(function (e) {
      transaction_withdraw_send.find(':input[type="submit"]').prop('disabled', true)
      e.preventDefault();
      $('#withdraw_confirm_address').html($('#withdraw_send_address').val())
      $('#withdraw_confirm_amount').html($('#withdraw_send_amount').val() + ' EEE')
      transaction_withdraw_send.addClass('disnone')
      transaction_withdraw_confirm.removeClass('disnone')

      $('#transaction_withdraw_confirm_title').addClass('active')
    })

    transaction_invoice_confirm.submit(function (e) {
      e.preventDefault()
      transaction_invoice_confirm.find(':input[type="submit"]').prop('disabled', true)
      createInvoice({
        currency: $('#invoice_send_currency').val(),
        amount: $('#invoice_send_amount').val()
      }, function (err, data) {
        transaction_invoice_confirm.find(':input[type="submit"]').prop('disabled', false)
        if (err) {
          transaction_invoice_confirm.find('.error').html(err).removeClass('disnone')
        } else {
          $('#transaction_invoice_invoice').removeClass('disnone')
          transaction_invoice_confirm.addClass('disnone')
          new QRCode(document.getElementById("qrcode_transaction_container"),
            {
              text: data.link,
              width: 220,
              height: 220,
              correctLevel: QRCode.CorrectLevel.H
            })

          $('#ico_link_input').val(data.wallet.address)

          $('#invoice_invoice_amount').html($('#invoice_send_amount').val() + $('#invoice_send_currency').val())
        }
      })
    })

    transaction_withdraw_confirm.submit(function (e) {
      e.preventDefault()
      transaction_withdraw_confirm.find(':input[type="submit"]').prop('disabled', true)
      createWithdraw({
        address: $('#withdraw_send_address').val(),
        amount: $('#withdraw_send_amount').val(),
        ga: $('#ga2fa_input').val()
      }, function (err, data) {
        transaction_withdraw_confirm.find(':input[type="submit"]').prop('disabled', false)
        if (err) {
          transaction_withdraw_confirm.find('.error').html(err).removeClass('disnone')
        } else {
          transaction_withdraw_confirm.addClass('disnone')
          $('#transaction_withdraw_withdraw').removeClass('disnone')
          $('#withdraw_withdraw_address').html(data.to)
          $('#withdraw_withdraw_amount').html(data.amount + ' ' + data.currency)
        }
      })
    })
  }

  var signup_form = $('#signup_form')
  if (signup_form.length) {
    if (user) {
      window.location.href = "/profile"
    }
    signup_form.submit(function (e) {
      signup_form.find(':input[type="submit"]').prop('disabled', true)
      e.preventDefault();
      signup_form.find('.error').addClass('disnone')
      signUp($(this).serialize(), function (err, data) {
        if (err) {
          signup_form.find('.error').html(err).removeClass('disnone')
          signup_form.find(':input[type="submit"]').prop('disabled', false)
        } else {
          if (typeof yaCounter46855911 !== 'undefined') {
            yaCounter46855911.reachGoal('signup')
          }

          var redirect = getParameterByName("redirect")
          if (redirect) {
            window.location.href = redirect
          } else {
            window.location.href = "/profile"
          }
        }
      })
    })
  }

  var signin_form = $('#signin_form')
  if (signin_form.length) {
    if (user) {
      window.location.href = "/profile"
    }
    signin_form.submit(function (e) {
      signin_form.find(':input[type="submit"]').prop('disabled', true)
      e.preventDefault();
      signin_form.find('.error').addClass('disnone')
      signIn($(this).serialize(), function (err, data) {
        if (err) {
          signin_form.find(':input[type="submit"]').prop('disabled', false)
          signin_form.find('.error').html(err).removeClass('disnone')
        } else {
          var redirect = getParameterByName("redirect")
          if (redirect) {
            window.location.href = redirect
          } else {
            window.location.href = "/profile"
          }
        }
      })
    })
  }

  var resend_form = $('#resend_form')
  if (resend_form.length) {
    resend_form.submit(function (e) {
      resend_form.find(':input[type="submit"]').prop('disabled', true)
      e.preventDefault();
      resend_form.find('.error').addClass('disnone')
      resend_form.find('.allok').addClass('disnone')
      sendVerification(function (err, data) {
        if (err) {
          resend_form.find('.error').html(err).removeClass('disnone')
        } else {
          resend_form.find('.allok').removeClass('disnone')
          resend_form.find(':input[type="submit"]').addClass('disnone').prop('disabled', false)
        }
      })
    })
  }

  var resetpass_form = $('#resetpass_form')
  if (resetpass_form.length) {
    resetpass_form.submit(function (e) {
      resetpass_form.find(':input[type="submit"]').prop('disabled', true)
      resetpass_form.find('.error').addClass('disnone')
      resetpass_form.find('.allok').addClass('disnone')
      e.preventDefault();
      sendRecovery($('#email').val(), function (err, data) {
        resetpass_form.find(':input[type="submit"]').prop('disabled', false)
        if (err) {
          resetpass_form.find('.error').html(err).removeClass('disnone')
        } else {
          resetpass_form.find('.allok').removeClass('disnone')
        }
      })
    })
  }
  $('.edit').on('click', function () {
    var parent = $(this).parent()
    $(this).addClass('disnone')
    parent.parent().find('span:first-child').addClass('disnone')
    parent.parent().find('form').removeClass('disnone')
    parent.parent().find('form').find('input').focus().val(parent.parent().find('span:first-child').html())
    parent.parent().find('.verify').addClass('disnone')
  })

  $('#twofa_enable_button').on('click', function () {
    initTFA(function (err, data) {
      $('#twofa_enable_button').parent().addClass('disnone')
      $('#twofa_qrcode').removeClass('disnone')
      $('#secret_2fa').html(data.secret)
      $('#qrcode_twofa_container').append("<img src='"+ data.url +"'/>")
    })
  })
  $('#user_twofa_form').submit(function (e) {
    e.preventDefault()
    enableTFA({
      code: $('#user_twofa_input').val()
    }, function (err, data) {
      if(err) {
        $('#user_twofa_form').find('.error').html(err).removeClass('disnone')
      }else{
        window.location.href = '/profile'
        location.reload()
      }
    })
  })
  $('.ajaxForm').submit(function (e) {
    e.preventDefault()
    var action = $(this).attr('action')
    var form = $(this)
    $('#loading').removeClass('disnone')
    window[action](form.serialize(), function (err, data) {
      $('#loading').addClass('disnone')
      if (err) {
        $('#error').removeClass('disnone')
        $('#error_msg').html(err)
      } else {
        user = data
        if (typeof yaCounter46855911 !== 'undefined') {
          yaCounter46855911.userParams({
            country: user.country,
            wallet_btc: user.wallet_btc,
            wallet_eth: user.wallet_eth,
            referral: user.referral
          })
        }
        form.addClass('disnone')
        form.parent().find('span:first-child').removeClass('disnone')
        form.parent().children('.edit').removeClass('disnone')
        form.parent().children('.verify').removeClass('disnone')
        form.parent().children('span:first-child').html(form.find('input').val())
      }
    })
  })

  $('#err_close').on('click', function () {
    $('#error').addClass('disnone')
  })

  $('.done').on('click', function () {
    $(this).closest('form').submit()
  })

  $('.cancel').on('click', function () {
    var closest = $(this).closest('form')
    closest.addClass('disnone')
    closest.parent().find('span:first-child').removeClass('disnone')
    closest.parent().children('.edit').removeClass('disnone')
    closest.parent().children('.verify').removeClass('disnone')
  })

  $('#logout_link').on('click', function () {
    signOut(function (err, data) {
      window.location.href = "/"
    })
  })

  $('#ignore_kyc_btn').on('click', function () {
    $('#ignore_kyc_div').removeClass('disnone')
  })

  $('#ignore_kyc_ok').on('click', function () {
    cancelKYC(function (err, data) {
      window.location.href = '/profile#ico'
      location.reload()
    })
  })

  $('#invoice_invoice_success').on('click', function () {
    window.location.href = '/profile#ico'
    location.reload()
  })

  $('#withdraw_withdraw_success').on('click', function () {
    window.location.href = '/profile#ico'
    location.reload()
  })


  var kyc_form = $('#kyc_form')
  if (kyc_form.length) {

    if (user && user.kyc == 0 && balance == 0) {
      getToken(function (err, token) {
        if (err) {
          //alert(err)
        } else {
          kyc_form.removeClass('disnone')
          kyc_form.submit(function (e) {
            kyc_form.addClass('disnone')
            e.preventDefault();
            var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
            var eventer = window[eventMethod];
            var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';
            $('#kyc').html('<iframe frameborder="0" width="100%" id="iframe" src="https://api.sumsub.com/idensic/index.html"></iframe>')
            $('#kyc').removeClass('disnone')
            var iframe = document.getElementById('iframe')
            eventer(messageEvent, function (e) {
              var data = e.message || e.data;
              if (!data.method) {
                return;
              }
              if (data.method == 'idCheck.onReady') {
                var conf = {
                  accessToken: token,
                  userId: user.id,
                  applicantId: user.applicant_id,
                  createApplicantPage: true,
                  requiredDocuments: "IDENTITY:PASSPORT,ID_CARD,DRIVERS;SELFIE:SELFIE;PROOF_OF_RESIDENCE:UTILITY_BILL",
                }
                conf.method = 'idCheck.init';
                iframe.contentWindow.postMessage(conf, '*');
              } else if (data.method == 'idCheck.onResize') {
                iframe.height = data.height;
                if ('width' in data) {
                  iframe.width = data.width;
                }
              } else if (data.method == 'idCheck.onCancel') {
              } else if (data.method == 'idCheck.onSuccess') {
              } else if (data.method == 'idCheck.onApplicantCreated') {
                setApplicant({applicantId: data.applicantId, token: token}, function (err, data) {

                })
              }
            }, false);
          })
        }
      })
    } else {

      $('#transaction').removeClass('disnone')
      $('#forAdopters').removeClass('disnone')
      if (balance > 0) {
        $('#howToWatchEEE').removeClass('disnone')
      }

      getPrefundTokens(function (err, data) {
        if (data) {
          $('#user_token_ico').html(data.total + ' EEE')
        }
      })
    }
  }
  var wallet_btc_sent_form = $('#wallet_btc_sent_form')
  if (wallet_btc_sent_form.length) {
    wallet_btc_sent_form.submit(function (e) {
      wallet_btc_sent_form.find(':input[type="submit"]').prop('disabled', true)
      wallet_btc_sent_form.find('.error').addClass('disnone')
      wallet_btc_sent_form.find('.allok').addClass('disnone')
      e.preventDefault();
      checkAddress(function (err, data) {
        wallet_btc_sent_form.find(':input[type="submit"]').prop('disabled', false)
        if (err) {
          wallet_btc_sent_form.find('.error').html(err).removeClass('disnone')
        } else {
          wallet_btc_sent_form.find('.allok').removeClass('disnone')
        }
      })
    })
  }

  $('#loading').addClass('disnone')
}