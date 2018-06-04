<?php 
header("content-type:text/html; charset= utf-8");
// 读取json文件  string
$jsonStr = file_get_contents("info/data.json");
// 转化为 php数组 array 去除json格式其他影响
$totalArr = json_decode(trim($jsonStr,chr(239).chr(187).chr(191)),true);
// 从数组中 随机获取10个值
$randomKeys=array_rand($totalArr,10);
//准备一个新的数组
$newArr=array();
for($i=0;$i<count($randomKeys);$i++){
//获取索引数组中的每一个key
$key=$randomKeys[$i];
//使用key从总数组中获取key对应的值
$obj=$totalArr[$key];
//丢到一个新的数组中
$newArr[$i]=$obj;//数组的长度随着我们的索引值更改而改变
}
// 将这10个值 转化为json格式的字符串 发回给浏览器
$newArr=json_encode($newArr);
echo$newArr;
?>