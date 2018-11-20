export function formatThousands(num) {
    num = parseFloat(num);
    if (isNaN(num) || !isFinite(num)) {
      return '-';
    }
  
    let decimals = num % 1;
    if (decimals !== 0) {
      decimals = parseFloat(decimals.toFixed(2));
      decimals = (`${decimals}`).substr(decimals < 0 ? 2 : 1);
    } else {
      decimals = '';
    }
  
    let integer = parseInt(num, 10);
    const str = `${integer}`;
    const arr = str.split('').reverse();
    const formatArr = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (i !== 0 && i % 3 === 0) {
        formatArr.push(',');
      }
      formatArr.push(arr[i]);
    }
    integer = formatArr.reverse().join('');
  
    return `${integer}${decimals}`;
  }
  
  export function formatDecimals(num) {
    num = parseFloat(num);
    if (isNaN(num) || !isFinite(num)) {
      return '-';
    }
    return parseFloat(num.toFixed(2));
  }
  