/*示例：
  输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
  输出：7 -> 0 -> 8
  原因：342 + 465 = 807
 */
function ListNode(val){
  this.val = val;
  this.next = null
}
var addTwoNumbers = function(l1,l2) {
  let p1 = l1,
      p2 = l2,
      r = new ListNode(),
      p = r, //p和r指针指向同一个位置
      c = 0;
  while(p1||p2||c) {
    c += ((p1&&p1.val)||0) + ((p2&&p2.val)||0)
    let node = new ListNode(c/10)
    p.next = node
    p1 && (p1 = p1.next)
    p2 && (p2 = p2.next)
    p = p.next //让指针移动到当前位置
  } 
  return r.next   
}

