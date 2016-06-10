node使用mongoose CRUD

默认端口8000
http://localhost:8000

获取当前时间： /
获取所有user： /user
新增user： /user/add （默认name为lin+timestamp）
新增特定name的user： /user/add/:name
获取特定name的user： /user/get/:name  (正则，只获取第一个匹配的)
修改特定name的user： /user/update/:name (正则，只修改第一个匹配的)
删除特定name的user： /user/delete/:name (正则，只删除第一个匹配的)

  
