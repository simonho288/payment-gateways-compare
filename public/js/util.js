// Info source: https://developer.paypal.com/docs/classic/paypal-payments-standard/integration-guide/formbasics/
function genPayPalMarkup(items, isDebug, currency, customId, paypalAccount, urls) {
  console.assert(items && (items instanceof Array));
  console.assert(currency);
  console.assert(customId);
  console.assert(paypalAccount);
  console.assert(urls && urls.cancel && urls.success && urls.notify);

  var account = paypalAccount;
  if (isDebug)
    account = 'go-facilitator@simonho.net';
  var urlBase = document.baseURI.substring(0, document.baseURI.lastIndexOf('/')) + '/';

  var paypalUrl = isDebug
    ? 'https://www.sandbox.paypal.com/cgi-bin/webscr'
    : 'https://www.paypal.com/cgi-bin/webscr';
  var notifyUrl = urls.notify;
  var str = '';
  str += '<form method="post" action="' + paypalUrl + '">';
  str += '<input type="hidden" name="charset" value="utf-8">';
  str += '<input type="hidden" name="cmd" value="_cart">';
  str += '<input type="hidden" name="upload" value="1">';
  str += '<input type="hidden" name="business" value="' + account + '">';
  str += '<input type="hidden" name="currency_code" value="' + currency + '">';
  str += '<input type="hidden" name="custom" value="' + customId + '">'; // custom is Order ID
  str += '<input type="hidden" name="notify_url" value="' + notifyUrl + '">';
  str += '<input type="hidden" name="cancel_return" value="' + urls.cancel + '">';
  str += '<input type="hidden" name="return" value="' + urls.success + '">';

  var count = 1;
  var itemsString = "";

  for (var i = 0; i < items.length; ++i) {
    var item = items[i]
    console.assert(item.name);
    console.assert(item.qty);
    console.assert(item.price);
    console.assert(item.itemId);
    var count = i + 1;
    str += '<input type="hidden" name="item_name_' + count + '" value="' + item.name + '">';
    str += '<input type="hidden" name="quantity_' + count + '" value ="' + item.qty + '">';
    str += '<input type="hidden" name="amount_' + count + '" value="' + item.price + '">';
    str += '<input type="hidden" name="item_number_' + count + '" value="' + item.itemId + '">';
  }

  str += '</form>';

  return str;
}
