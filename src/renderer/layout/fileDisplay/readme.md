1、树型结构
2、id属性
3、id自增，自增到一定程度收回或者一直自增，溢出？？（2^31 = 21 4748 3648）
JavaScript 里的数字是采用 IEEE 754 标准的 64 位双精度浮点数，JS 中能精准表示的最大整数是 Math.pow(2, 53)，十进制即 9007 1992 5474 0992。一年共3153 6000秒，足够使用
4、记录文件状态结构
open
close => children深度均为一级，只有子节点
close&keep => children深度二级起步，存在孙节点，

expand
reduce

数据实现的有序多叉树，数组元素为json对象

renderer删除或移动文件等 => js操作文件 => watch被调用 => main更新多叉树 => 数据反馈到renderer中
renderer展开数据 => 反馈展开状态到main中，同步更新状态
非本程序导致文件变化 => main watch更新多叉树 => 反馈至renderer中

vue 自带数据diff算法，不用自己进行diff数据
