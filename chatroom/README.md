# 实现匿名聊天
  1. 在客户端里连接上服务器
  2. 给发送按钮绑定点击事件，当点击此按钮的时候先获取文本框的内容，把文本框的内容发送到后台
    3. 后台服务器把此消息广播给所有的客户端。
    4. 所有的客户端收到消息后把此消息在ul列表里显示出来
# 实现具名聊天
    1. 当此用户第一次向服务器发消息的时候
    2. 服务器会判断此客户端的用户名是否设置过，如果没设置的话就把这个消息当成用户名，以后再发消息的话都会以这个作为用户名,如果设置过了就是正常发言
# 私聊
  1. 点击某个在线用户，点击后会在输入框里出现  @xxx yyy
  2. 服务收到私聊的请求后会找到xxx对应的客户端向他单个发消息


# start server
  node index



