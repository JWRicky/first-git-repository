var exec = require('child_process').exec;
var os 	= require('os-utils');

exec('powershell -Command "(Get-WmiObject Win32_Processor).Name"', function(err,sysout,syserr) {
    var cpuid1 = document.getElementById('cpu-list1');
    cpuid1.textContent = "Name: " + sysout;
});

exec('powershell -Command "(Get-WmiObject Win32_Processor).MaxClockSpeed"', function(err,sysout,syserr) {
  var cpuid2 = document.getElementById('cpu-list2');
  cpuid2.textContent = "MaxClockSpeed: " + sysout + "MHz";
});

exec('powershell -Command "(Get-WmiObject Win32_Processor).NumberOfCores"', function(err,sysout,syserr) {
  var cpuid3 = document.getElementById('cpu-list3');
  cpuid3.textContent =  sysout + "Cores";
});

exec('powershell -Command "(Get-WmiObject Win32_Processor).NumberOfLogicalProcessors"', function(err,sysout,syserr) {
  var cpuid4 = document.getElementById('cpu-list4');
  cpuid4.textContent =  sysout + "Threads";
});

exec('powershell -Command "(Get-WmiObject Win32_DisplayConfiguration).DeviceName"', function(err,sysout,syserr) {
  var gpuid1 = document.getElementById('gpu-list1');
  gpuid1.textContent =  "Name: " + sysout;
});

exec('powershell -Command "(Get-WmiObject Win32_VideoController) |%{ $_.AdapterRAM}| Measure-Object -Sum | %{ ($_.sum /1024/1024/1024).toString()}"', function(err,sysout,syserr) {
  var gpuid2 = document.getElementById('gpu-list2');
  gpuid2.textContent =  "VRAM :" + sysout + "GB";
});

setInterval(function(){
  os.cpuUsage(function(utilOfValue){
    var cpuUtil = utilOfValue*1000;
    var fixedCpuUtil = cpuUtil.toFixed();
    var id5 = document.getElementById('cpu-list5');
    id5.textContent = "Util: " + fixedCpuUtil + "%";
  });
}, 3000);
