
var converRates = {
  idr:{ // from IDR to
    usd: 0.000067,
    bdt: 0.0056,
  },
  usd:{
    idr: 14909.05,
    bdt: 83.58,
  },
  bdt:{
    idr: 178.31,
    usd: 0.012,
  },
}


$( document ).ready(function() {

    // convert from IDR
    $('#idr').keyup(function() {
        var input = $(this).val();
        var num = getNumber(input);
        if(input && input!=num){
          $('#idr').val(num);
        }
        $('#usd').val(covert('idr','usd', input));
        $('#bdt').val(covert('idr','bdt', input));
    });

    // convert from BDT
    $('#bdt').keyup(function() {
        var input = $(this).val();
        var num = getNumber(input);
        if(input && input!=num){
          $('#bdt').val(num);
        }
        $('#usd').val(covert('bdt','usd', input));
        $('#idr').val(covert('bdt','idr', input));
    });

    // convert from USD
    $('#usd').keyup(function() {
        var input = $(this).val();
        var num = getNumber(input);
        if(input && input!=num){
          $('#usd').val(num);
        }
        $('#bdt').val(covert('usd','bdt', input));
        $('#idr').val(covert('usd','idr', input));
    });


});

function getNumber(input){
  if(typeof input == 'number') return input;
  if(typeof input != 'string') return 0;
  return Number(input.replace(/[^0-9\.]/g,''));
}

function covert(from, to, input){
  var n = Number(converRates[from][to]*getNumber(input));
  return parseFloat(n).toFixed(2);
}


// function onIDRchange(){
//   var idr = document.getElementById('idr').val();
//   console.log('idr', idr);
//   clearError(idr);
// }


function showError(error){

  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);
  setTimeout(clearError, 5000);
}

function clearError(){
  document.querySelector('.alert').remove();
}
