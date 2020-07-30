/**
 * Created by Administrator on 2016/12/9.
 */

window.onload=(function () {
    //var a=confirm('1111');
    var arrval=prompt("请输入一组数字用逗号隔开："," ");
    var arr=new Array();
    arr=arrval.split(',');
    var val=prompt("请输入要删除的数据"," ");
    var count=-1;
    for(var i=0;i<arr.length;i++){
        if(arr[i]==val){
            // arr.delete(i,1);
            delete arr[i];
            count=i;
            i--;
        }
    }
    document.getElementById('txt_lastarr').innerHTML="输入数组:"+arrval+"\n输入删除数据:"+val+"\n结果:"+arr;
    var val2=prompt("请插入数据："," ");
    for(var i=0;i<arr.length;i++){
        if(arr[i]==undefined && i==count){
            arr[i]=val2;
        }
    }
    document.getElementById('txt_lastarr').innerHTML=document.getElementById('txt_lastarr').innerHTML+'插入结果：'+arr;

})