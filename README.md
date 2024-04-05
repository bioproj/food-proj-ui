

<h1 align="center">基于云计算和生成式AI的生信数据挖掘系统</h1>



<div align="center">
  <a href="https://bioinfo.online/pipline/index.html">	<img src="https://bioinfo.online/logo.svg"  style="    width: 10rem;"></a>
</div>

<a href="https://github.com/WinmezzZ/react-antd-admin/blob/master/LICENSE">
  <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
</a>

## ✨ 介绍

+ 📜 项目介绍: <http://bioinfo.online/pipline/index.html>
+ 🌐 项目预览: <http://yun.bioinfo.online>
+ 💡项目贡献: <https://bioinfo.online/articleList/20242274568.html>

## 快速使用
#### 第一步
打开：<http://yun.bioinfo.online>
> 注：为保证数据的安全，这里前端项目会访问本地localhost的api服务，因此需要第二步，在本的运行后端服务
#### 第二步
在本地运行以下命名，启动后端服务
> 注：需要安装docker
```
  # 创建网络
  docker network create pipeline
  # 启动mongo数据库
  docker run --rm -d \
    --name mongo \
    --network pipeline \
    --hostname mongo \
    -p 27018:27017 \
    registry.cn-hangzhou.aliyuncs.com/wybioinfo/mongo
  # 启动后端程序
  docker run --rm \
    --name service-pipeline \
    --network pipeline \
    -e MONGO_HOST=mongo \
    -e MONGO_PORT=27017 \
    -e MONGO_DB=pipeline_db \ 
    -p 30001:30001 \
    registry.cn-hangzhou.aliyuncs.com/wybioinfo/service-pipeline-boot-1.0.jar
```



## 开发
+ 测试代理是否正常： <http://localhost:8889/pipeline/hello>

