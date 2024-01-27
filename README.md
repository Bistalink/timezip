# timezip
A simple archive tool for backup files and folders

<p align="center">
  <img src="./timezip.png">
</p>

## What is this?
This tools allows you to archive some specific file or folder into a zip file and name it with timestamp.

Suitable for backup file and folder. 

This tool was originally made to backup save data of multiplayer game servers but would be helpful in other situations as well (ex. when you want to backup some progress regularly but your app does not suport it)

It's also a good idea to use Task Scheduler in Windows or cron in Linux to make backups on a regular basis! :)

## Usage
Firstly download or build binary file and place it into destination folder where you want to store archive files.

Then run timezip with path to your target file or directory which you want to backup:

```
./timezip [target file/dir]
```

By default, your zip file will be written in the same place where timezip binary exists but you can change it by specifing new destination after target path:

```
./timezip [target file/dir] [output dir (optional)]
```

## Build
It is always simple to just download and use pre-built binary but you can build your own from source code.

Download source and run ```npm install -D``` to install all dependencies to get ready.

Run ```npm run package``` to build, and package.

## Note
This tools is powered by Node.js and uses pkg as packaging tool.

## Disclaimer & License
This tool is licensed under MIT License. While you can use it freely and modify the source or binraries as you want, I am not responsible for any damage caused by the use of this software.

Bug reports and suggestions are always welcomed! :D