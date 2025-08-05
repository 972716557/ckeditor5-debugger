### 全局安装 yalc

```
npm install -g yalc
```

或

```
yarn global add yalc
```

### 全局安装 nodemon

```
npm install -g nodemon
```

### ckeidtor5 项目

```
yalc publish
```

### ckeditor-test 项目

```
yalc add ckeditor5 --link
```

### 更新主项目依赖

```
在组件库中更新后，主项目自动更新（若使用 `yalc push`）

或手动更新指定包

yalc update ckeditor5
```

### 移除本地依赖

```
yalc remove ckeditor5 // 移除单个包
yalc remove --all  // 移除所有 yalc 依赖并还原
```
