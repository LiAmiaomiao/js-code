/*
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
*/
var twoSum = function(nums, target) {
  let map = new Map();
  for(let i = 0; i < nums.length; i++) {
    let dif = target - nums[i]
    if(map.has(dif)){
      return [map.get(dif), i]
    }
    map.set(nums[i], i)
  }
}