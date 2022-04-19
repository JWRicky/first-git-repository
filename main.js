const {app, BrowserWindow, shell} = require('electron');
const path = require('path');
const express = require('express');

let mainWindow;

const createWindow = ()=> {

 mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: false,
    enableRemoteModule: true,
    contextIsolation: true,
    preload: path.join(__dirname, "preload.js")
  },
});

mainWindow.loadFile("index.html");

mainWindow.on("closed", ()=>{
  mainWindow = null;
});

};

app.whenReady().then(()=>{
  createWindow();

  app.on("activate", ()=>{
    if(BrowserWindow.getAllWindows().length === 0){
      createWindow();
    }
  });
});

app.on("window-all-closed", ()=>{
  if(process.platform !== "darwin"){
    app.quit();
  }
});
