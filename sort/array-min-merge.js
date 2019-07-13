//输入一个正整数数组，把数组里的所有数字拼接起来排成一个数，打印能拼接出得所有数字中最小的一个
//例如输入数组{3，32，321}，则打印出这三个数字能排成的最小数字为321323。
function PrintMinNumber(numbers){
    numbers.sort((a,b)=>{
        var c1 = a + ''+ b;
        var c2 = b + '' + a;
        return c1 > c2;
    });
    return numbers.join('');
}