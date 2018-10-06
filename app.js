
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

var priceList = [
  {
    description: "Snorkelling in Kuta",
    price: '100000', // in IDR
  },
  {
    description: "Rafting",
    price: '400000',
  },
  {
    description: "Car per hour",
    price: '50000',
  },
  {
    description: "Nasi goreng, Nasi Ayam etc",
    price: '30000-60000',
  },
  {
    description: "Hotel boy tips",
    price: '20000-35000',
  },
  {
    description: "Singer tips",
    price: '35000-70000',
  },
];


$( document ).ready(function() {

    // convert from IDR
    $('#idr').keyup(function() {
        var input = $(this).val();
        var num = getNumber(input);
        if(input && input!=num){
          $('#idr').val(num);
        }
        $('#usd').val(convert('idr','usd', input));
        $('#bdt').val(convert('idr','bdt', input));
    });

    // convert from BDT
    $('#bdt').keyup(function() {
        var input = $(this).val();
        var num = getNumber(input);
        if(input && input!=num){
          $('#bdt').val(num);
        }
        $('#usd').val(convert('bdt','usd', input));
        $('#idr').val(convert('bdt','idr', input));
    });

    // convert from USD
    $('#usd').keyup(function() {
        var input = $(this).val();
        var num = getNumber(input);
        if(input && input!=num){
          $('#usd').val(num);
        }
        $('#bdt').val(convert('usd','bdt', input));
        $('#idr').val(convert('usd','idr', input));
    });

    $('#btn-price-list').click(function() {
        $('#calculator').hide();
        $('#price-list').slideDown();
    });

    $('#btn-calculator').click(function() {
        $('#price-list').hide();
        $('#calculator').slideDown();
    });

    // generate the table
    (function(){
      let tableString = "";
      for(let item of priceList){
        let priceArray = item.price.split('-');
        let priceOne = priceArray[0];
        let priceTwo = priceArray[1];
        let bdPrice = parseInt(convert('idr','bdt',priceOne)).toLocaleString();
        let usPrice = convert('idr','usd',priceOne).toLocaleString();

        if(priceTwo){
          bdPrice = bdPrice + ' - ' + parseInt(convert('idr','bdt',priceTwo)).toLocaleString();
          usPrice = usPrice + ' - ' + convert('idr','usd',priceTwo).toLocaleString();
        }

        let row = '<tr><td class="t-description" scope="col">'+item.description+'</td>'
                  +'<td class="t-price" scope="col">'+item.price.toLocaleString()+'</td>'
                  +'<td class="t-price" scope="col">'+bdPrice+'</td>'
                  +'<td class="t-price" scope="col">'+usPrice+'</td>'
                  +'</tr>';
        tableString = tableString+row;
      }
      $('.price-table-body').html(tableString);
    })();


});


function getNumber(input){
  if(typeof input == 'number') return input;
  if(typeof input != 'string') return 0;
  return Number(input.replace(/[^0-9\.]/g,''));
}

function convert(from, to, input){
  var n = Number(converRates[from][to]*getNumber(input));
  n = parseFloat(n).toFixed(2);
  if(n == 0.0) return 0;
  return n;
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
